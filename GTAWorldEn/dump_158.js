{
let RELOAD_CHECK_COOLDOWN = 2000

let Core = class{

    constructor(){
        this.m_Last = Date.now()
        this.m_Weapon = mp.players.local.weapon
        this.m_Count = 0
        mp.events.add("render", this.Event_OnRender.bind(this))
        mp.events.add("playerWeaponShot", this.Event_OnShot.bind(this))
    }

    Event_OnShot(){
        try{
            this.m_Count++
        } catch (exception){
            this.Error(exception, "Event_OnShot")
        }
    }


    Event_OnRender(){
        try{
            
            if (this.m_Weapon != mp.players.local.weapon) this.m_Count = 0
            this.m_Weapon = mp.players.local.weapon

            if (!mp.players.local.isReloading() || Date.now() - this.m_Last < RELOAD_CHECK_COOLDOWN) return 
            this.m_Last = Date.now()
            mp.events.callRemote("weapon_reload", this.m_Count)
            this.m_Count = 0
        } catch(exception){
            this.Error(exception, "Event_OnRender")
        }
    }

    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("Revolver@Exception: Print-Error", false, true)
        }
    }
}

new Core()
}