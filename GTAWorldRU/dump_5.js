{
﻿class Ragdoll{
    constructor(){
        try{
            mp.events.add("Ragdoll::Apply", this.apply.bind(this))
            mp.events.add("Ragdoll::Restore", this.restore.bind(this))
            mp.events.add("render", this.pulse.bind(this))
            this.m_State = false
        } catch(e){
            mp.console.logInfo(e)
        }
    }

    apply(restart){
        try{
            if (!restart && mp.game.invoke("0x47E4E977581C5B55", mp.players.local.handle)) return false
            mp.players.local.setToRagdoll(-1, -1, 0, false, false, false)
            this.m_State = true
        } catch(e){
            mp.console.logInfo(e)
        }
    }

    pulse(){
        try{
            if (!this.m_State) return false 
            if (mp.game.invoke("0x47E4E977581C5B55", mp.players.local.handle)) return false 
            this.apply(true)
        } catch(e){
            mp.console.logInfo(e)
        }
    }

    restore(){
        try{
            mp.players.local.setToRagdoll(50, 50, 0, false, false, false)
            this.m_State = false
        } catch(e){
            mp.console.logInfo(e)
        }
    }

    
}

let __Ragdoll = new Ragdoll() // No static usage due to Win7
}Ì