{
let NATIVES = {
    "ADD_ROPE" : 0xE832D760399EB220,
    "DELETE_ROPE" : 0x52B4829281364649,
}

class Rope{
    constructor(core, root, element, direction){
        this.m_Core = core
        this.m_Root = root 
        this.m_Element = element 
        this.m_Direction = direction

        this.CreateRope()
    }


    CreateRope(){
        this.m_Rope = mp.game.invoke(NATIVES.ADD_ROPE, 
                this.m_Root.position.x, this.m_Root.position.y, this.m_Root.position.z, 
                0, 0, 0,
                20.0, 4, 20.0, 1.0, 0.0, false, false, false, 5.0, false, null)
        
        mp.gui.chat.push(String(this.m_Rope))
    }

    Destroy(){
        mp.game.invoke(NATIVES.DELETE_ROPE, this.m_Rope)
    }

}


function __Rope(core, root, element, direction){
    return new Rope(core, root, element, direction)
}

}