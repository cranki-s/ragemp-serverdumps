{
﻿class Keyboard {
    constructor(ui){
        
        this.m_UserInterface = ui

        this.m_RenderHook = this.Event_Render.bind(this) 
        mp.events.add("render", this.m_RenderHook)

        this.m_Rotation = false
        this.m_Active = false

    }

    destructor(){
        mp.events.remove("render", this.m_RenderHook)
    }

    Event_Render(){
        if (mp.game.controls.isDisabledControlPressed(0, 32)) this.forward()
        if (mp.game.controls.isDisabledControlPressed(0, 33)) this.backward()
        if (mp.game.controls.isDisabledControlPressed(0, 34)) this.left()
        if (mp.game.controls.isDisabledControlPressed(0, 35)) this.right()
        if (mp.game.controls.isDisabledControlPressed(0, 36)) this.down()
        if (mp.game.controls.isDisabledControlPressed(27, 61)) this.up()
        if (mp.game.controls.isDisabledControlJustPressed(0, 45)) this.rotate()
        
    }

    rotate(){
        this.m_Rotation = !this.m_Rotation
        this.getUI().TriggerCEFEvent("OnInput", "rotation", this.m_Rotation)
    }
    
    up(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-up" : "up")
    }

    down(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-down" : "down")
    }

    right(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-right" : "right")
    }

    left(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-left" : "left")
    }

    forward(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-forward" : "forward")
    }

    backward(){
        this.getUI().TriggerCEFEvent("OnInput", this.m_Rotation ? "r-backward" : "backward")
    }

    getUI(){
        return this.m_UserInterface
    }

}

function KeyboardManager(ui){
    return new Keyboard(ui)
}

}