{
﻿let LAST_PUNCH = Date.now()

mp.events.add("render", () =>{
    if (camObj !== null && camObj.isActive() && camObj.isRendering()) return;

    if (mp.game.controls.isControlPressed(0, 25)) {
        mp.game.controls.disableControlAction(0, 22, true)
    }

    if (!mp.players.local.isInMeleeCombat() && (mp.players.local.isRunning() || mp.players.local.isSprinting())){
        mp.game.controls.disableControlAction(0, 140, true)
        mp.game.controls.disableControlAction(0, 141, true)
        mp.game.controls.disableControlAction(0, 142, true)
        mp.game.controls.disableControlAction(0, 24, true)
        return
    }

 
        if (typeof mp.players.local.isWheelActive != "undefined" && mp.players.local.isWheelActive) return
        if (typeof mp.players.local.blockWheelFrame != "undefined" && mp.players.local.blockWheelFrame) return
        //mp.game.controls.enableControlAction(0, 140, true)
        mp.game.controls.enableControlAction(0, 141, true)
        mp.game.controls.enableControlAction(0, 142, true)
        mp.game.controls.enableControlAction(0, 24, true)
    
    

    if (!mp.players.local.isInMeleeCombat()) return

 
    if ((Date.now() - LAST_PUNCH >= 1500) && (mp.game.controls.isControlPressed(0, 24) || mp.game.controls.isControlPressed(0, 140) 
    || mp.game.controls.isControlPressed(0, 141) || mp.game.controls.isControlPressed(0, 142)))
        LAST_PUNCH = Date.now()
})


}셗ï