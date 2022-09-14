{
require('./gtalife/VehicleSeats/Constants.js')
require('./gtalife/VehicleSeats/Utility.js')
require('./gtalife/VehicleSeats/Preview.js')

let NATIVES = {
    SET_PED_SHOOTS_AT_COORD : "0x867654CBC7606F2C",
}

let EXCEPTIONS = {}

class VehicleSeatManager{
    constructor(){
        this.m_Throttle = Date.now()
        this.m_Preview = __Preview(this)
        this.m_Resync = false
        this.m_ShootSync = false
        this.m_AttachmentData = {}
        this.m_Sitting = false

        mp.keys.bind(0x47, false, this.Event_OnTry.bind(this)) //G-Key
        mp.keys.bind(0x27, false, this.Event_SwitchSeat.bind(this, true)) //Right-Key
        mp.keys.bind(0x25, false, this.Event_SwitchSeat.bind(this, false)) //Left-Key
        mp.events.add("render", this.Event_OnRender.bind(this))
        mp.events.addDataHandler("VehicleSeat::AttachData", this.Event_OnAttachmentDataChange.bind(this))
        mp.events.add("entityStreamIn", this.Event_OnStreamIn.bind(this))
        mp.events.add("entityStreamOut", this.Event_OnStreamOut.bind(this))

        mp.events.add("VehicleSeat::ForceSeat", this.Event_RemoteForceSeat.bind(this))

        mp.events.add("playerWeaponShot", this.Event_OnWeaponShot.bind(this))
        mp.events.add("VehicleSeat::RemoteSyncShooting", this.Event_RemoteSyncShooting.bind(this))
    }

    Event_OnTry(){
        if (mp.players.local.vehicle || mp.gui.cursor.visible) return
        if (!mp.keys.isDown(0x10) && !this.HasData(mp.players.local)) return
        if (this.HasData(mp.players.local)) 
            this.Exit() 
        else 
            this.Enter()
    }

    Event_OnAttachmentDataChange(entity, value, old){
        try{
            if (!this.IsValidEntity(entity)) return
            this.Collision(entity, true)
            this.Update(entity, value)
            if (old && old.length > 0 && value.length == 0) {
                this.Detach(entity)
                if (entity == mp.players.local) this.SetToExit(old)
            }
            if (value.length > 0) this.Attach(entity)
            if (entity == mp.players.local) this.Animation()
        } catch(exception){
            this.Error(exception)
        }
    }

    Event_OnStreamIn(entity){   
        try{
            this.Update(entity)
            if (!this.HasData(entity)) return 
            this.Attach(entity)
        } catch(exception){
            this.Error(exception)
        }
    }

    Event_OnStreamOut(entity){
        try{
            if (this.HasData(entity)) this.Detach(entity)
            this.Delete(entity)
        } catch(exception){
            this.Error(exception)
        }
    }
    
    Event_OnRender(){
        try{
            mp.game.audio.setAudioFlag("DisableFlightMusic", true)
            this.Controls()
            for (let id in this.m_AttachmentData) {
                let entity = mp.players.atRemoteId(id)
                if(!this.IsValidEntity(entity)) continue
                this.Collision(entity, false)
                if (!this.CanAttach(entity)) continue 
                if (this.IsAttached(entity)) continue 
                this.Attach(entity)
            }  
            this.Resync()           
        } catch(exception){
            this.Error(exception)
        }
    }

    Event_SwitchSeat(direction){
        if (!this.CanSwitch()) return
        mp.events.callRemote("VehicleSeat::ShiftSeat", direction)
    }

    Event_OnWeaponShot(target){
        if (!this.HasData(mp.players.local)) return
        let attachment = this.Get(mp.players.local)
        if (!attachment) return  
        if (!this.IsSeatShootSync(attachment.index)) return 
        if (this.m_ShootSync && Date.now() - this.m_ShootSync < 200) return 
        mp.events.callRemote("VehicleSeat::SyncShooting", target)
        this.m_ShootSync = Date.now()
    }

    Event_RemoteForceSeat(model, vehicle, index){
        if (!GetSeatData(model)) return 
        if (!GetSeatData(model)[index]) return
        this.SetData(vehicle, GetSeatData(model)[index])
    }

    Event_RemoteSyncShooting(attacker, target){
        try{
            if (!attacker) return 
            if (attacker.handle == 0) return 
            if (!target) return 
            let origin = attacker.getBoneCoords(57005, 0, 0, 0)
            if (!origin) return
            mp.game.gameplay.shootSingleBulletBetweenCoords(origin.x, origin.y, origin.z, target.x, target.y, target.z, 0, true, 0x83BF0278, attacker.handle, true, false, 1)
        } catch(exception){
            this.Error(exception)
        }
    }

    Controls(){
        let state = this.Get(mp.players.local) || this.m_Sitting
        if (state){
            mp.game.controls.disableControlAction(0, GetControls("INPUT_VEH_ENTER"), true) 
            mp.game.controls.disableControlAction(0, GetControls("INPUT_JUMP"), true) 
        }
        mp.players.local.disablePassenger = state //Reset everytime to not have the variable persist between restarts

        let left = mp.game.controls.isControlPressed(0, GetControls("MOVE_LEFT")) 
        let right = mp.game.controls.isControlPressed(0, GetControls("MOVE_RIGHT")) 
        if (left) this.Heading(true)
        if (right) this.Heading(false)
    }

    Enter(){
        try{
            let vehicle = GetNearByVehicles(6) 
            if (!vehicle || vehicle.locked) return
            let seat = GetClosestSeat(vehicle)
            if(!seat) return 
            if (!this.SetData(vehicle, seat)) return 
            this.m_Sitting = true
            this.m_Resync = false
        } catch(exception){
            this.Error(exception)
        }
    }

    Exit(){
        try{
            this.ResetData()
            this.m_Sitting = false
            this.m_Resync = false
            mp.events.callRemote("VehicleSeat::RequestWeaponAttachments")
        } catch(exception){
            this.Error(exception)
        }
    }

    Animation(){
        try{
            if (!this.HasData(mp.players.local)) return 
            let attachment = this.Get(mp.players.local)
            if (!attachment) return
            mp.events.callRemote("VehicleSeat::SetAnimation", attachment.animation)
        } catch(exception){
            this.Error(exception)
        }
    }

    Detach(entity){
        try{
            if (!this.IsValidEntity(entity)) return
            entity.clearTasksImmediately()
            entity.detach(true, true)
        } catch(exception){
            this.Error(exception)
        }
    }

    Attach(entity){
        try{
            if (!this.IsValidEntity(entity)) return
            if (!this.HasData(entity)) return
            let attachment = this.Get(entity)
            if (!attachment) return
            let to = mp.vehicles.atRemoteId(attachment.to)
            if (!this.IsValidEntity(to)) return
            entity.attachTo(to.handle, 0,
                            attachment.position.x, attachment.position.y, attachment.position.z, 
                            attachment.rotation.x, attachment.rotation.y, attachment.rotation.z, 
                            true, false, false, false, 0, false)

        } catch(exception){
            this.Error(exception)
        }
    }

    Update(entity, value=false){
        try{
            if(!value) value = entity.getVariable("VehicleSeat::AttachData")
            if (value && value.length > 0){
                let attachment = this.Parse(value)
                if (attachment) this.m_AttachmentData[entity.remoteId] = attachment
            }
            else
                this.Delete(entity)
        } catch(exception){
            this.Error(exception)
        } 
    }

    Resync(){
        if (!this.HasData(mp.players.local)) return 
        if (!this.m_Resync || Date.now() - this.m_Resync < 500) return 
        let attachment = this.Get(mp.players.local)
        if (!attachment) return 

        let vehicle = mp.vehicles.atRemoteId(attachment.to) 
        if (!this.IsValidEntity(vehicle)) return 

        let serialize = [attachment.index, vehicle.remoteId, SerializeVectorF(attachment.position), SerializeVectorF(attachment.rotation), "@persist"].join(SEPARATOR())
        mp.events.callRemote("VehicleSeat::SetAttachment", serialize, vehicle)
        this.m_Resync = false       
    }

    Collision(entity, enable){
        if (!this.IsValidEntity(entity)) return
        if (!this.HasData(entity)) return
        let attachment = this.Get(entity)
        let to = mp.vehicles.atRemoteId(attachment.to)
        if (!this.IsValidEntity(to)) return
        entity.setNoCollision(to.handle, !enable)
        to.setNoCollision(entity.handle, !enable)
    }

    Heading(direction){
        if (!this.HasData(mp.players.local)) return
        let turn = direction ? 1 : -1 
        let attachment = this.Get(mp.players.local)
        if (!attachment) return 
        if (this.IsSeatStatic(attachment.index)) return
        let rotation = new mp.Vector3(attachment.rotation.x, attachment.rotation.y, NormalizeCircle(attachment.rotation.z + turn))
        this.m_AttachmentData[mp.players.local.remoteId] = {index: attachment.index, to: attachment.to, position: attachment.position, rotation: rotation, animation: attachment.animation}
        this.Attach(mp.players.local)
        this.m_Resync = Date.now()
    }

    SetToExit(data){
        let attachment = this.Parse(data)
        if (!attachment) return
        let vehicle = mp.vehicles.atRemoteId(attachment.to) 
        if (!this.IsValidEntity(vehicle)) return 
        if (!GetSeatData(vehicle.model)) return 
        if (!GetSeatData(vehicle.model)[attachment.index]) return 
        let seat = GetSeatData(vehicle.model)[attachment.index]
        let exit = vehicle.getOffsetFromInWorldCoords(seat.exit.x, seat.exit.y, seat.exit.z)
        if (!exit) return 
        mp.events.callRemote("VehicleSeat::SetToPosition", exit)
        mp.players.local.position = exit
    }

    SetData(vehicle, seat){
        try{
            if (!this.IsValidEntity(vehicle)) return false
            if (!seat) return false
            let serialize = [seat.index, vehicle.remoteId, SerializeVectorF(seat.position), SerializeVectorF(new mp.Vector3(seat.rotation.x, seat.rotation.y, seat.rotation.z)), (seat.animation ? seat.animation : "checkbody1")].join(SEPARATOR())
            mp.events.callRemote("VehicleSeat::SetAttachment", serialize, vehicle)
            return true
        } catch(exception){
            this.Error(exception)
        }
    }

    ResetData(){
        mp.events.callRemote("VehicleSeat::SetAttachment", "", null)
    }

    Parse(data){
        try{
            if (!data || data.length == 0) return null 
            let [index, remote, position, rotation, animation] = data.split(SEPARATOR())
            return {index: parseInt(index), to: parseInt(remote), position: ParseVectorF(position), rotation: ParseVectorF(rotation), animation: animation}
        } catch(exception){
            this.Error(exception)
        }
    }

    Error(exception){
        try{
            if (EXCEPTIONS[exception.message] && Date.now() - EXCEPTIONS[exception.message] < 1000 * 10) return 
            EXCEPTIONS[exception.message] = Date.now()
            mp.console.logError("Exception occured inside VehicleSeats@Main.", false, true)
            mp.console.logError(String(exception.message), true, true)
        } catch{

        }
    }

    IsValidEntity(entity){
        try{
            if (!entity || entity.handle == 0) return false 
            return true
        } catch(exception){
            this.Error(exception)
        }
    }

    IsSeatStatic(index){
        let vehicle = this.GetVehicle(mp.players.local)
        if (!vehicle) return false
        if (!GetSeatData(vehicle.model)) return false 
        if (!GetSeatData(vehicle.model)[index]) return false 
        return GetSeatData(vehicle.model)[index].static
    }

    IsSeatShootSync(index){
        let vehicle = this.GetVehicle(mp.players.local)
        if (!vehicle) return false
        if (!GetSeatData(vehicle.model)) return false 
        if (!GetSeatData(vehicle.model)[index]) return false 
        return GetSeatData(vehicle.model)[index].shooting
    }

    CanSwitch(){
        return (this.m_Sitting && !mp.gui.cursor.visible && !mp.players.local.vehicle)
    }

    CanAttach(entity){
        try{
            if (!this.HasData(entity)) return false 
            let attachment = this.Get(entity)
            if (!attachment) return false 
            if (!this.IsValidEntity(mp.vehicles.atRemoteId(attachment.to))) return false 
            if (!this.IsValidEntity(entity)) return false
            return true
        } catch(exception){
            this.Error(exception)
        }
    }

    IsAttached(entity){
        try{
            let attachment = this.Get(entity)
            if (!this.IsValidEntity(mp.vehicles.atRemoteId(attachment.to))) return
            return (entity.getAttachedTo() == mp.vehicles.atRemoteId(attachment.to).handle)
        } catch(exception){
            this.Error(exception)
        }
    }

    HasData(entity){
        return this.m_AttachmentData[entity.remoteId] 
    }

    Get(entity){
        return this.m_AttachmentData[entity.remoteId]
    }

    GetVehicle(entity){
        if (!this.HasData(entity)) return 
        let attachment = this.Get(entity) 
        if (!attachment) return 
        let vehicle = mp.vehicles.atRemoteId(attachment.to)
        if (!this.IsValidEntity(vehicle)) return
        return vehicle
    }

    Delete(entity){
        delete this.m_AttachmentData[entity.remoteId]
    }
}

__VehicleSeatManager = new VehicleSeatManager()
}