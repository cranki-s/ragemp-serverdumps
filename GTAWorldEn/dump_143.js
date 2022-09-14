{
class Movement {
    constructor(){
        this.m_RestrictionFire = Date.now()

        mp.events.add("Movement::Check::EnteringVehicle", this.Event_IsInVehicle.bind(this))
        mp.events.add("Movement::Restrict::Firing", this.Event_RestrictFire.bind(this))
        mp.events.add("render", this.Event_OnPulse.bind(this))

        mp.game.streaming.requestClipSet = (name) => mp.game.invoke("0x3ACA4F727AC4606E", name)
        this.Event_Precise()

    }

    async Event_Precise(){
        while (true){
            this.Event_RestrictWhipping()
            await mp.game.waitAsync(0);
        }
    }

    Event_IsInVehicle(event){
        try{
            mp.events.callRemote(event, mp.players.local.isInAnyVehicle(true))
        } catch{}
    }

    Event_RestrictFire(ms){
        this.m_RestrictionFire = Date.now() + ms
    }

    Event_OnPulse(){
        try{
            if (Date.now() < this.m_RestrictionFire) mp.game.player.disableFiring(true)
        } catch {}
    }


    Event_RestrictWhipping(){
        try{
            if (!mp.game.weapon.isPedArmed(mp.players.local.handle, 6)) return
        
            mp.game.controls.disableControlAction(1, 140, true)
            mp.game.controls.disableControlAction(1, 141, true)
            mp.game.controls.disableControlAction(1, 142, true)
        } catch {
            
        }
    }
}

new Movement()
}