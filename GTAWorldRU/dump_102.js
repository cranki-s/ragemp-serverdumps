{
﻿require('./gtalife/BodyWeaponAttachment/Classes/Drawing.js');

class Visualizer{
    constructor(ui, settings){
        this.m_Drawer = new DrawingManager(this)
        this.m_VisualizePool = new Map()
        this.m_UserInterface = ui
        this.m_FocusEnabled = this.parseSetting(settings)
        this.hide()
        this.create()
    }


    parseSetting(setting){
        if (typeof setting === "undefined") return true
        let data = JSON.parse(setting)
        if (typeof data !== "object") return true
        if (typeof data["focus"] === "undefined") return true
        return data["focus"]
    }

    destructor(){
        this.m_Drawer.destructor()
        this.destroy()
        this.show()
        
    }

    hide(){
        getAttachmentSystem().destroyAll(mp.players.local)
    }

    create(){
        getLocalPlayerWeapons().forEach( weapon => {
            let data = this.getCore().get(weapon)

            if (!data) return 

            let model = getWeaponModel(weapon)
            if (!model) return

            let element = getAttachmentSystem().createElement(model, data.bone, data.offset, data.rotation, data.visible)
            if (!element) return

            if (typeof this.m_Focus !== "undefined")
                element.alpha = (this.m_Focus == weapon) ? (element.visible ? 255 : 0) : (element.visible ? 150 : 0)
            else 
                if (!element.visible) element.alpha = 0
            
            let attachment =  getAttachmentSystem().addLocal(mp.players.local, element)
            if (!attachment) return

            this.m_VisualizePool.set(weapon, attachment)

            this.createClip(weapon)
            this.createHolster(weapon)
        })
    }
    
    createClip(weapon){
        if (typeof WEAPON_DATA[weapon] === "undefined") return 

        let clip = getClipHash(WEAPON_DATA[weapon].name)
        if (!clip) return

        let data = this.getCore().get("CLIP_" + weapon)

        let model = getClipModel(clip)
        if (!model) return
        if (model == 0) return

        let element = getAttachmentSystem().createElement(model, data.bone, data.offset, data.rotation, data.visible)
        if (!element) return

        if (typeof this.m_Focus !== "undefined")
            element.alpha = (this.m_Focus == weapon) ? (element.visible ? 255 : 0) : (element.visible ? 150 : 0)
        else 
            if (!element.visible) element.alpha = 0
        
        let attachment =  getAttachmentSystem().addLocal(mp.players.local, element)
        if (!attachment) return

        this.m_VisualizePool.set("CLIP_" + weapon, attachment)
    }

        
    createHolster(weapon){
        if (typeof WEAPON_DATA[weapon] === "undefined") return 

   
        let group = getWeaponGroup(weapon)
        let holsters = getHolster(group)

        if (holsters){
            holsters.forEach(holster => {
              

                let model = parseInt(holster.hash)
                if (!model) return
                if (model == 0) return

                let data = this.getCore().get("HOLSTER_" + weapon + "*" + "0x" + model.toString(16).toUpperCase())

                let element = getAttachmentSystem().createElement(model.toString(), data.bone, data.offset, data.rotation, data.visible)
                if (!element) return
        
                if (typeof this.m_Focus !== "undefined")
                    element.alpha = (this.m_Focus == weapon) ? (element.visible ? 255 : 0) : (element.visible ? 150 : 0)
                else 
                    if (!element.visible) element.alpha = 0
                
                let attachment =  getAttachmentSystem().addLocal(mp.players.local, element)
                if (!attachment) return
                this.m_VisualizePool.set("HOLSTER_" + weapon + "*" + "0x" + model.toString(16).toUpperCase(), attachment)
            })
        }
    }



    refresh(){
        this.destroy()
        this.create()
    }
    
    update(weapon, data){
        if (typeof weapon === "undefined") return
        if (!this.m_VisualizePool.has(weapon)) return 
        if (typeof this.m_VisualizePool.get(weapon) === "undefined") return
        
        let attachment = this.m_VisualizePool.get(weapon) 
        if (typeof data === "undefined") return 


        attachment.offsetX = data.offset.x 
        attachment.offsetY = data.offset.y
        attachment.offsetZ = data.offset.z

        attachment.rotationX = data.rotation.x 
        attachment.rotationY = data.rotation.y
        attachment.rotationZ = data.rotation.z

        attachment.bone = data.bone 
        attachment.visible = data.visible 

        let oldAlpha = attachment.alpha
        attachment.alpha = attachment.visible ? 255 : 0

        
        this.m_VisualizePool.set(weapon, attachment)

        if (oldAlpha != attachment.alpha)
            getAttachmentSystem().create(mp.players.local, attachment.index)
        else
            getAttachmentSystem().update(mp.players.local, attachment)
    }

    destroy(){
        getAttachmentSystem().clearLocal(mp.players.local)
        this.m_VisualizePool.clear()
    }

    focus(weapon){
        if (!this.m_FocusEnabled){
            this.destroy() 
            this.m_Focus = undefined
            this.create()
            return
        } 

        this.destroy() 
        this.m_Focus = weapon
        this.create()
    }

    show(){
        getAttachmentSystem().createRemote(mp.players.local)
    }
    
    serialize(weapon){
        if (typeof weapon === "undefined") return false
        let attachment = this.m_VisualizePool.get(weapon)
        return {
            offset: {x : attachment.offsetX, y: attachment.offsetY, z: attachment.offsetZ},
            rotation: {x : attachment.rotationX, y: attachment.rotationY, z: attachment.rotationZ},
            visible: attachment.visible, 
            bone: attachment.bone, 
            weapon: weapon
        } 
    }

    save(weapon){
        if (!this.m_VisualizePool.has(weapon)) return this.error("Save failed: Invalid weapon!")
        if (!this.getCore().weapon(this.serialize(weapon))) return this.error("Save failed: Invalid Data!")
        this.info("Оружие сохранено!")
    }

    error(message){
        this.m_UserInterface.TriggerCEFEvent("OnError", message)
    }
    
    info(message){
        this.m_UserInterface.TriggerCEFEvent("OnMessage", message)
    }


    getCore(){
        return this.m_UserInterface.m_Core
    }

    getUI(){
        return this.m_UserInterface
    }

    Event_OnPulse(){
        this.m_VisualizePool.forEach((value, key) => {            
            this.update(key, value)
        })
    }

    Event_OnSelect(weapon){
        this.focus(weapon)   
    }
}

function VisualizerManager(userinterface, setting){
    return new Visualizer(userinterface, setting)
}

}