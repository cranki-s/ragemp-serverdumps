{
//Unused for now! 17/06/2021 - Strobe

function setWeapon(ped, weaponHash){
    return mp.game.invoke("0xADF692B254977C0C", ped.handle, parseInt(weaponHash) >> 0, 1)
}

function hasWeapon(ped, weaponHash){
	return mp.game.invoke("0x8DECB02F88F428BC", ped.handle, parseInt(weaponHash) >> 0, 0)
}

function setWeaponForceTest(ped, weaponHash){
	return mp.game.invoke("0xBF0FD6E56C964FCB", ped.handle, parseInt(weaponHash) >> 0, 0, 0, 1)
}


let TICK_RATE = 1000
class WeaponSync{
    constructor(){
        this.m_ShootSync = false
        mp.events.add("entityStreamIn", this.Event_OnStreamIn.bind(this))
        mp.events.add("WeaponSync::Driveby::SyncShot", this.Event_RemoteSyncShooting.bind(this))
        mp.events.add("playerWeaponShot", this.Event_OnWeaponShot.bind(this))

    }

    Event_OnStreamIn(entity){
        try{
            if (!entity || entity.type != "player") return false
            if (!entity.getVariable("Vehicle::Driveby::Weapon")) return false
            entity.clearTasksImmediately()
            entity.clearTasks()
            entity.taskReloadWeapon(true)
            let weapon = entity.getVariable("Vehicle::Driveby::Weapon")
            setWeapon(entity.handle, parseInt(weapon))
        } catch(exception){
            this.Error(exception, "Event_OnStreamIn")
        }
    }

    Event_OnWeaponShot(target){
        try{
            if (!mp.players.local.vehicle) return false
            if (this.m_ShootSync && Date.now() - this.m_ShootSync < 1000) return false
   
            mp.events.callRemoteUnreliable("Weapon::Vehicle::Fired",  parseInt(mp.players.local.weapon).toString())
            this.m_ShootSync = Date.now()
        } catch (exception){
            this.Error(exception, "Event_OnWeaponShot")
        }
    }

    Event_RemoteSyncShooting(attacker, weapon){
        try{
            if (!attacker || attacker.handle == 0 || attacker == mp.players.local) return false
            if (attacker.weapon == parseInt(weapon)) return false
            setWeapon(attacker, parseInt(weapon))
            attacker.taskReloadWeapon(true)
        } catch(exception){
            this.Error(exception, "Event_RemoteSyncShooting")
        }
    }
    
    Error(exception, where="main") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponSync@Exception: Print-Error", false, true)
        }
    }

}

new WeaponSync()
}