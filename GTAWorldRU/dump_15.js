{
﻿function setWeaponRemote(ped, weaponHash){
    if (typeof weaponHash === "undefined") return
    if (typeof ped === "undefined") return
    if (ped == mp.players.local){
        mp.game.invoke("0xADF692B254977C0C", ped.handle, parseInt(weaponHash) >> 0, 1)
        return mp.game.invoke("0x72C1056D678BB7D8", parseInt(weaponHash) >> 0)
    }

    return mp.game.invoke("0xADF692B254977C0C", ped.handle, parseInt(weaponHash) >> 0, 1)
}

class WeaponAnimation{
    constructor(core){
        this.m_Core = core 

        this.m_InAnimation = false
        this.m_SwitchTimer = {}
        mp.events.add("WeaponAnimation::Switch", this.Event_OnWeaponSwitch.bind(this))
        mp.events.add("WeaponAnimation::Switch36", this.Event_OnWeaponSwitch36.bind(this))

        
        mp.events.add("entityStreamIn", this.Event_OnEntityStreamIn.bind(this))

        mp.events.add("render", this.Event_OnRender.bind(this))
    }

    Event_OnEntityStreamIn(entity){
        try{
            if (!entity || entity.handle == 0 || !entity.type || entity.type !== "player") return 
            let weapon = entity.getVariable("Player::Weapon")
            if (!weapon) return 
            weapon = "0x" + weapon.toString(16).toUpperCase()
            setWeaponRemote(entity, weapon)

        } catch(exception){
            this.exception(exception, "Event_OnEntityStreamIn")
        }
    }


    StartAnimation(client, data){
        try{
            if (client.vehicle) return setWeaponRemote(client, data.current)
            if (typeof client == "undefined") return
            if (!client.doesExist()) return
            if (typeof client.remoteId == "undefined") return

            let pos = client.getCoords(true)
            let rot = client.getHeading()
            let time = (data.police ? (data.block == "outro" ? 500 : 100) : (data.block == "outro" ? 1200 : 800) ) + (data.heavy ? (data.police ? 500 : 1500) : 0)
            this.m_InAnimation = mp.players.local == client
            mp.game.streaming.requestAnimDict(data.animation)
            if (data.police){
                if (!client.getVariable("VehicleSeat::IsAttached"))
                    client.taskPlayAnim(data.animation, data.block, (data.heavy ? 3.0 : 12.0), 8.0, time, 48, 0, false, false, false)
            }
            else{
                if (!client.getVariable("VehicleSeat::IsAttached"))
                    client.taskPlayAnimAdvanced(data.animation, data.block, pos.x, pos.y, pos.z, 0, 0, rot, (data.heavy ? 0.9 : 1.2), (data.heavy ? 1.0 : 1.2), time, 50, data.block == "intro" ? (data.heavy ? 0 : 0.225) : 0.125, 0, 0)
            }
            setWeaponRemote(client, data.old)

            this.m_SwitchTimer[client.remoteId] = setTimeout(function(){
                try{
                    let ___client = mp.players.atRemoteId(client.remoteId)
                    if (!___client.doesExist()) return
                    if (typeof ___client == "undefined") return
                    setWeaponRemote(___client, data.current)
                    setTimeout(function(){
                        try{
                            let __client = mp.players.atRemoteId(client.remoteId)
                            if (!__client.doesExist()) return
                            if (typeof __client == "undefined") return
                            if (__client == mp.players.local){
                                this.m_InAnimation = false
                                getSelection().m_BlockForFrame = null
                                delete this.m_SwitchTimer[client.remoteId]
                            }
                        } catch {
                            
                        }
                    }.bind(this), (!data.police && data.block == "intro") ? 250 : 50)
                } catch {

                }
            }.bind(this), time)
        } catch{
            this.exception(exception, "StartAnimation")
        }
    }

    Event_OnRender(){
        try{
            if (this.m_InAnimation){
                mp.game.player.disableFiring(true)
                mp.game.controls.disableControlAction(0, 24, true); 
                mp.game.controls.disableControlAction(0, 25, true); 
            }
        } catch(exception){
            this.exception(exception, "Event_OnRender")
        }
    }

    Event_OnWeaponSwitch(client, old, current, holster, police, heavy, melee){
        try{
            if (typeof client.remoteId == "undefined") return 
            if (!client.doesExist()) return 

            if (typeof old == "undefined") return
            if (typeof current == "undefined") return

            let animation = police ? "reaction@intimidation@cop@unarmed" : "reaction@intimidation@1h"
            let block = holster ? "outro" : (police ? "outro" : "intro")

            if (typeof this.m_SwitchTimer[client.remoteId] !== "undefined"){
                clearTimeout(this.m_SwitchTimer[client.remoteId])
                delete this.m_SwitchTimer[client.remoteId]
            }

            if (!melee) this.StartAnimation(client, {client : client, old : old, current : current, animation : animation, block : block, processed : false, police: police, heavy : heavy})
            else setWeaponRemote(client, current)
        } catch(exception){
            this.exception(exception, "Event_OnWeaponSwitch")
        }
    }

    Event_OnWeaponSwitch36(client, old, current, holster, police, heavy, melee){
        try{
            if (typeof old == "undefined") return
            if (typeof current == "undefined") return

            this.Event_OnWeaponSwitch(client, "0x" + parseInt(old, 36).toString(16).toUpperCase(), "0x" + parseInt(current, 36).toString(16).toUpperCase(), holster, police, heavy, melee)
    
        } catch(exception){
            this.exception(exception, "Event_OnWeaponSwitch36")
        }
    }


    
    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponAnimation@Exception: Print-Error", false, true)
        }
    }

}


function __WeaponAnimation(core){
    return new WeaponAnimation(core)
}

}셖ï