{
require('./gtalife/PoliceRadar/Vector.js')
require('./gtalife/PoliceRadar/Constants.js')
require('./gtalife/PoliceRadar/Ray.js')
require('./gtalife/PoliceRadar/Display.js')

let EXCEPTIONPRINT = false
let REMOTE_TRACK = [] // Prevent Remote Event Spam
let UPDATE_THROTTLE = Date.now() // Throttle Display Update
let UPDATE_RATE = 150
let LAST_REAR = Date.now()
let LAST_PATROL = 0
let LAST_AUDIO = Date.now()
let LAST_LIMIT = 0
let LAST_VISIBLE = false 
let PDVehicles = [];
PDVehicles.push(1947925897); // Bcat
PDVehicles.push(1811562607); // Umkcara
PDVehicles.push(3149195696); // Policeb1
PDVehicles.push(4260343491); // Policeb


class PoliceRadar{

    constructor(){
        this.m_Browser = false
        this.m_Active = false
        this.m_RayManager = RayManager(this)
        this.m_Display = DisplayManager(this)
        this.m_DomQueue = []
        mp.events.add("PoliceRadar::Toggle", this.Event_OnToggle.bind(this))
        mp.events.add("PoliceRadar::Sync", this.Event_OnSync.bind(this))
        mp.events.add("PoliceRadar::SetScale", this.Event_SetScale.bind(this))
        mp.events.add("PoliceRadar::SetPosition", this.Event_SetPosition.bind(this))
        mp.events.add("PoliceRadar::Reset", this.Event_Reset.bind(this))
        mp.events.add("PoliceRadar::InterFaceMedia", this.Event_SetInterface.bind(this))
        mp.events.add("PoliceRadar::NotifyLimit", this.Event_NotifyLimit.bind(this))
        mp.events.add("PoliceRadar::Volume", this.Event_SetVolume.bind(this))
        mp.events.add("PoliceRadar::Help", this.Event_ManualOpen.bind(this))
        mp.events.add("PoliceRadar::Visibility", this.Event_OnVisibility.bind(this))
        mp.events.add("PoliceRadar::CEF::Manual::Close", this.Event_ManualClose.bind(this))
        mp.events.add("playerEnterVehicle", this.Event_OnVehicleEnter.bind(this))
        mp.events.add("playerLeaveVehicle", this.Event_OnVehicleExit.bind(this))
        mp.events.add("browserDomReady", this.Event_OnDomReady.bind(this))
        mp.events.add("render", this.Event_OnPulse.bind(this))
    }

    Request(type, mode="", value=false){
        if (!mp.players.local.vehicle) return
        this.Call("PoliceRadar::Request", type, mode, value)
    }

    Call(...args){
        if (!REMOTE_TRACK[JSON.stringify(args)]) REMOTE_TRACK[JSON.stringify(args)] = Date.now()
        else if (Date.now() - REMOTE_TRACK[JSON.stringify(args)] < 128) return
        REMOTE_TRACK[JSON.stringify(args)] = Date.now()
        mp.events.callRemote(...args)
    }

    Setup(){
        try{
            if (this.Exists()) return
            this.m_Browser = mp.browsers.new("package://gtalife/PoliceRadar/CEF/main.html")

            if (mp.storage.data.radarPositionX && mp.storage.data.radarPositionX) this.m_Display.SetPosition(mp.storage.data.radarPositionX, mp.storage.data.radarPositionY)
            this.m_Display.SetScale(mp.storage.data.radarScale ? mp.storage.data.radarScale : 1)
            this.m_BrowserStarting = true
        } catch (e){
            this.Error(e, "Setup")
        }
    }

    Show(){
        try{
            this.Setup()
            this.m_Visible = true
            this.m_Display.Visible(true)
            this.Info()
            if (LAST_LIMIT > 0) mp.gui.chat.push("!{Orange}[RADAR] !{White}Auto-Limit is set to !{Orange}" + String(LAST_LIMIT) + " MP/H!")
            else mp.gui.chat.push("!{Orange}[RADAR] !{White}Auto-Limit is !{Orange}disabled!")

        } catch(e){
            this.Error(e, "Show")
        }
    }

    Hide(){
        try{
            if (!this.Exists()) return 
            this.m_Visible = false
            this.m_Display.Visible(false)
        } catch(e){
            this.Error(e, "Hide")
        }
    }
    
    Exists(){
        try{
            return typeof this.m_Browser !== "undefined" && mp.browsers.exists(this.m_Browser)
        } catch(e){
            this.Error(e, "Exists")
            return false
        }
    }

    Reset(){
        try{
            this.m_State = {
                m_Vehicles : [],
                m_Traces : 0,
            }
        } catch(e){
            this.Error(e,"Reset")
        }
    }

    Lock(ant, speed, direction, type){
        try{
            this.m_Display.SetSpeedLock(ant, speed, direction, type)
            this.Call("PoliceRadar::LockSpeed", ant, "lock", type, speed, direction)
        } catch(e){
            this.Error(e, "Lock")
        }
    }

    Unlock(ant, type){
        try{
            this.m_Display.ResetSpeedLock(ant, type)
            this.Call("PoliceRadar::LockSpeed", ant, "unlock", type, 0, 0)
        } catch(e){
            this.Error(e, "Unlock")
        }
    }

    RunRays(owner, vehicles){
        try{
            TRACES.forEach(trace =>{
                this.Ray(vehicles, owner, trace.startVec.x, trace.endVec.x, trace.endVec.y, trace.rayType)
            })
        } catch(e){
            this.Error(e, "RunRays")
        }
    }

    Ray(vehicles, owner, sX, eX, eY, rayType){
        try{
            let start =  owner.getOffsetFromInWorldCoords(sX, 0, 0) 
            let end = owner.getOffsetFromInWorldCoords(eX, eY, 0)
            let hits = this.GetHitVehicles(owner, vehicles, start, end)
            if (hits.length == 0) return
            let context = this
            hits.forEach( data => {
                data.rayType = rayType 
                context.m_State.m_Vehicles.push(data)
            })
        } catch(e){
            this.Error(e, "Ray")
        }
    }

    RearSafety(patrol, rear, distance){
        try{
            if (rear < 10 || (distance > rear * .5) || Date.now() - LAST_REAR < 9000) return 
            let last = LAST_PATROL 
            LAST_PATROL = patrol
            if (last != 0 || patrol == 0) return
            this.m_Display.PlaySound("rearSafety", mp.storage.data.radarVolume ? parseFloat(mp.storage.data.radarVolume) : 1)
            LAST_REAR = Date.now()
        } catch(e){
            this.Error(e, "RearSafety")
        }
    }

    Audio(speed, distance, type){
        try{
            if (speed == 0) return
            if (Date.now() - LAST_AUDIO < Math.max(900, 900 + (15 * distance) - (speed * 12))) return 
            LAST_AUDIO = Date.now()
            this.m_Display.PlaySound("front" , mp.storage.data.radarVolume ? parseFloat(mp.storage.data.radarVolume) : 1)
        } catch(e){
            this.Error(e, "Audio")
        }
    }

    Info(){
        mp.gui.chat.push("!{Orange}[RADAR]!{White} Use !{Yellow}/radar help!{White} to read the Manual! Available Commands:")
        mp.gui.chat.push("!{Orange}[RADAR]!{Yellow} /radar [Limit]!{White} - Sets an automatic Lock Limit, Use 0 To Disable!")
        mp.gui.chat.push("!{Orange}[RADAR]!{Yellow} /radar reset!{White} - Resets Position and Scale!")
        mp.gui.chat.push("!{Orange}[RADAR]!{Yellow} /radar volume [0-200]!{White} - Sets the Radar Audio Volume!")
        mp.gui.chat.push("!{Orange}[RADAR]!{Yellow} CTRL + Scroll!{White} To Resize The Radar, !{Yellow}Click & Drag!{White} To Move The Radar!")
    }

    VehiclesForAntenna(){
        try{
            let vehicles = {front : [], rear : []}
            let results = { front: [], rear : []}
            let antennas = ["front", "rear"]


            antennas.forEach(ant =>{
                if (this.m_Display.IsAntennaTransmitting(ant)){
                    this.m_State.m_Vehicles.forEach(data =>{
                        let pos = (data.position == 1 ? "front" : "rear" )
                        if ( ant === pos){
                            vehicles[ant].push(data)
                        }
                    })
                }
                vehicles[ant].sort(this.GetSort("strongest"))
            })        


            antennas.forEach(ant =>{
                let once = false
                if (!vehicles[ant][0]) return
                vehicles[ant].forEach(data => {
                    if (this.m_Display.IsVehicleForAntenna(ant, data.rayType)){
                        if (once) return
                        results[ant].push(data)
                        once = true
                    }
                })

                if (this.m_Display.IsFastEnabled()){
                    once = false
                    vehicles[ant].sort(this.GetSort("fastest"))
                    let temp = results[ant][0]
                    if (!temp) return
                    vehicles[ant].forEach(data =>{
                        if (this.m_Display.IsVehicleForAntenna( ant, data.rayType ) && data.vehicle != temp.vehicle && data.speed > temp.speed + 1.0 ){
                            if (once) return
                            results[ant].push(data)
                            once = true
                        }
                    })
                }
            })

            return { front : [results["front"][0], results["front"][1] ], rear : [ results["rear"][0], results["rear"][1] ] }
        } catch(e){
            this.Error(e, "VehiclesForAntenna")
        }
    }

    GetHitVehicles(owner, vehicles, start, end){
        try{
            let hits = []
            vehicles.forEach( vehicle => {
                let result = this.m_RayManager.ShootRay(owner, vehicle, start, end)
                
                if (result.hit) {

                    hits.push({
                        vehicle: vehicle, 
                        position: result.position, 
                        distance: result.distance, 
                        speed : result.speed, 
                        size : result.size, 
                    }) 
                } 

            })

            return hits
        } catch(e){
            this.Error(e, "GetHitVehicles")
            return []
        }
    }
    
    GetSort(sortType){
        if (sortType == "strongest")
            return function( a, b ){
                return a.distance < b.distance
            }
        else
            return function( a, b ){
                return a.speed > b.speed
            }
    }

    GetBrowser(){
        try{
            return this.m_Browser
        } catch(e){
            this.Error(e, "GetBrowser")
        }
    }

    Event_OnDomReady(browser){
        try{
            if (browser != this.GetBrowser()) return 
            this.m_BrowserStarting = false
            this.m_DomQueue.forEach(query =>{
                browser.execute(query)
            })
            this.m_DomQueue = []
        } catch(e){
            this.Error(e, "Event_OnDomReady")
        }
    }

    Event_NotifyLimit(limit){
        try{
            LAST_LIMIT = limit
        } catch(e){
            this.Error(e, "Event_NotifyLimit")
        }
    }

    Event_OnSync(vehicle, power, limit, front, rear){
        try{
            if (typeof vehicle == "undefined") return
            if (typeof front == "undefined") return 
            if (typeof rear == "undefined") return 

            this.Setup()

            this.m_Display.SetPower(power, true)

            front = JSON.parse(front)

            this.m_Display.SetXmit("front", front.xmit)
            this.m_Display.SetMode("front", front.same && !front.opp ? 1 : ((front.opp && !front.same) ? 2 : (!front.opp && !front.same) ? 0 : 3))

            rear = JSON.parse(rear)

            this.m_Display.SetXmit("rear", rear.xmit)
            this.m_Display.SetMode("rear", rear.same && !rear.opp ? 1 : ((rear.opp && !rear.same) ? 2 : (!rear.opp && !rear.same) ? 0 : 3))
            
            this.m_Display.SetLimit(limit)

            if (front.lockSpeedA == -1) this.m_Display.ResetSpeedLock("front", 1)
            else this.m_Display.SetSpeedLock("front", front.lockSpeedA, front.lockDirA, 1)

            if (front.lockSpeedB == -1) this.m_Display.ResetSpeedLock("front", 2)
            else this.m_Display.SetSpeedLock("front", front.lockSpeedB, front.lockDirB, 2)
            
            if (rear.lockSpeedA == -1) this.m_Display.ResetSpeedLock("rear", 1)
            else this.m_Display.SetSpeedLock("rear", rear.lockSpeedA, rear.lockDirA, 1)

            if (rear.lockSpeedB == -1) this.m_Display.ResetSpeedLock("rear", 2)
            else this.m_Display.SetSpeedLock("rear", rear.lockSpeedB, rear.lockDirB, 2)

        } catch(e){
            this.Error(e, "Event_OnSync")
        }
    }

    Event_OnToggle(){
        try{
            LAST_VISIBLE = !LAST_VISIBLE
            return this.m_Visible ? this.Hide() : this.Show() 
        } catch(e){
            this.Error(e, "Event_OnToggle")
        }
    }

    Event_OnVehicleEnter(vehicle){
        try{
           
        } catch(e){
            this.Error(e, "Event_OnVehicleEnter")
        }
    }
    
    Event_OnVehicleExit(){
        try{
            this.Hide()
        } catch(e){
            this.Error(e, "Event_OnVehicleExit")
        }
    }

    Event_OnPulse(){
        try{
            if (!this.Exists()) return
            this.Reset() 
     
            if (!this.m_Display.m_Power || this.m_Display.m_PoweringUp) return

            if (mp.players.local.vehicle && (mp.players.local.vehicle.getClass() == 18 || PDVehicles.includes(mp.players.local.vehicle.getModel()))){
                let data = {}
                this.RunRays(mp.players.local.vehicle, mp.vehicles)

                let patrolSpeed = this.m_Display.ConvertSpeed(mp.players.local.vehicle.getSpeed()) 
                this.m_Display.SetPatrolSpeed(patrolSpeed)

                let antennaResult = this.VehiclesForAntenna()

                data.antennas = {front : null, rear  : null}
                let antennas = ["front", "rear"]
                antennas.forEach(ant =>{
                    if (this.m_Display.IsAntennaTransmitting(ant)){
                        data.antennas[ant] = []

                        for (var i = 0; i < 2; i++){

                            if (mp.game.controls.isDisabledControlPressed(0, 25) && !mp.gui.cursor.visible && this.m_Display.IsSpeedLocked(ant, i+1))
                                this.Unlock(ant, i+1)

                            if (!this.m_Display.IsSpeedLocked(ant, i+1)) 
                                data.antennas[ant][i] = { speed : "   ", dir : 0 }
                            else{ 
                                let lock = this.m_Display.m_Antennas[ant].locked[i+1]
                                data.antennas[ant][i] = { speed : this.m_Display.ConvertSpeed(lock.speed, false), dir : lock.dir}
                            }

                            if ( antennaResult[ant][i] != undefined){
                                let target = antennaResult[ant][i].vehicle
                                if (target.doesExist()){

                                    data.antennas[ant][i].speed = this.m_Display.ConvertSpeed(target.getSpeed())
                                    data.antennas[ant][i].dir = this.m_Display.GetRelativeDirection(mp.players.local.vehicle.getHeading().toFixed(0), 
                                                                                                    target.getHeading().toFixed(0))

                                    if ((parseInt(patrolSpeed)) == 0) this.Audio( data.antennas[ant][i].speed, antennaResult[ant][i].distance, i==0 ? "" : "fast")
                                    if (this.m_Display.GetLimit() && !this.m_Display.IsSpeedLocked(ant, i+1))
                                        if (this.m_Display.GetLimit() > 0 && this.m_Display.GetLimit() < data.antennas[ant][i].speed) 
                                            this.Lock(ant, data.antennas[ant][i].speed, data.antennas[ant][i].dir, i+1)
                                    
                                    if (mp.game.controls.isDisabledControlPressed(0, 24) && !mp.gui.cursor.visible && !this.m_Display.IsSpeedLocked(ant, i+1))
                                        if (data.antennas[ant][i].speed > 0)
                                            this.Lock(ant, data.antennas[ant][i].speed, data.antennas[ant][i].dir, i+1)
                                    
                      

                                    if (this.m_Display.IsSpeedLocked(ant, i+1)){ 
                                        let lock = this.m_Display.m_Antennas[ant].locked[i+1]
                                        data.antennas[ant][i].speed = this.m_Display.ConvertSpeed(lock.speed, false)
                                        data.antennas[ant][i].dir = lock.dir
                                    }

                                    if (ant == "rear" && i == 0 && data.antennas[ant][i].dir == 1)
                                        this.RearSafety(parseInt(patrolSpeed), data.antennas[ant][i].speed, antennaResult[ant][i].distance)
                                }
                            }
                        }
                    } else {
                        data.antennas[ant] = []
                        data.antennas[ant][0] = { speed : "hLD", dir : 0 }
                        data.antennas[ant][1] = { speed : "hLD", dir : 0 }
                    }
                })
                if (Date.now() - UPDATE_THROTTLE < UPDATE_RATE) return 
                UPDATE_THROTTLE = Date.now()
                this.m_Display.Update(data.antennas)
                this.m_Display.CheckLock()
            } else {
                this.Hide()
            }
        } catch(e){
            this.Error(e, "Event_OnPulse")
        }
    }

    Event_SetScale(value){
        try{
            if (!value) return 
            if (!parseFloat(value)) return 
            if (parseFloat(value) < 0.25 || parseFloat(value) > 2.5) return

            mp.storage.data.radarScale = parseFloat(value) 
            mp.storage.flush()
            if (!this.Exists()) return 
            
            this.m_Display.SetScale(mp.storage.data.radarScale)
        } catch (e){
            this.Error(e, "Event_SetScale")
        }
    }

    Event_SetPosition(x, y){
        try{
            this.m_Display.Event_OnPosition(x, y)
        } catch (e){
            this.Error(e, "Event_SetPosition")
        }
    }

    Event_Reset(){
        try{
            this.Event_SetPosition(.5, .5)
            this.Event_SetScale(1)
        } catch(e){
            this.Error(e, "Event_Reset")
        }
    }

    Event_SetVolume(volume){
        try{
            if (!volume)
            volume = Math.min(Math.max(0, volume), 100)
            mp.storage.data.radarVolume = volume  / 100
            mp.storage.flush()  
        } catch(e){
            this.Error(e, "Event_SetVolume")
        }
    }
   
    Event_OnVisibility(){
        try{
            if (LAST_VISIBLE) this.Show()
        } catch(e){
            this.Error(e, "Event_OnVisibility")
        }  
    }

    Event_SetInterface(){
        this.m_Display.PlaySound("interface" , mp.storage.data.radarVolume ? parseFloat(mp.storage.data.radarVolume) : 1)    
    }

    Event_ManualClose(){
        try{
            if (!this.m_Help) return 
            this.m_Help.destroy()
            this.m_Help = undefined
            mp.gui.cursor.show(false, false)
            mp.gui.chat.show(true)
        } catch(e){
            this.Error(e, "Event_ManualClose")
        }
    }

    Event_ManualOpen(){
        try{
            if (this.m_Help) this.Event_ManualClose()
            this.m_Help = mp.browsers.new("package://gtalife/PoliceRadar/CEF/help.html")
            mp.gui.cursor.show(true, true)
            mp.gui.chat.show(false)
        } catch (e){
            this.Error(e, "Event_ManualOpen")
        }
    }

    Error(exception, where) {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("PoliceRadar@Exception: Print-Error", false, true)
        }
    }
}

new PoliceRadar() 




}