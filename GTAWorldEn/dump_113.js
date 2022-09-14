{
require('./gtalife/WeaponSelection/CEF/js/Constants.js');
require("./gtalife/WeaponAttachment/AttachmentCustomizer/WeaponPreviewConstants.js")
require("./gtalife/WeaponAttachment/AttachmentCustomizer/WeaponPreviewModel.js")
require("./gtalife/WeaponAttachment/AttachmentCustomizer/WeaponPreviewUI.js")

let WeaponPreview = class{
    constructor(){
        try{
            this.m_Model = __WeaponPreviewModel(this)
            mp.events.add("render", this.Render.bind(this))
            mp.events.add("click", this.Click.bind(this)) 
            mp.events.add("WeaponPreview::OnReceive", this.Event_OnReceive.bind(this))
        } catch {

        }
    }

    Event_OnUserInterfaceClose(instance){
        if (this.m_Model) this.m_Model.Dispose()
        if (instance) instance.Dispose()
        this.m_UserInterface = undefined
        mp.events.callRemote("WeaponPreview::ResetData")
    }
    
    Event_OnReceive(json, restore=false){
        try{
            let data = JSON.parse(json)
            if (!data || typeof data != "object") return
            this.m_Data = {}
            
            if (!this.m_UserInterface) 
                this.m_UserInterface = __WeaponPreviewUI(this)
            
            this.m_UserInterface.Name(data.Name)
            if (!restore){
                this.m_Model.Create(parseInt(data.Hash), restore).Load(function(){
                    for (let index in data.Components){
                        
                        let component = data.Components[index]
                        if (parseInt(component.ItemId) == -1 && parseInt(data.ItemId) != -1 && !component.Attached) continue
                        if (BLACKLISTED_CATEGORY(String(component.Category).toLowerCase(), parseInt(data.ItemId) == -1) || BLACKLISTED_COMPONENT(String(component.Name).toLowerCase(), parseInt(data.ItemId) == -1)) continue
                        component.Attached ? this.m_Model.AddComponent(parseInt(component.Hash)) : false
                        if (!this.m_Data[String(component.Category).toLowerCase()]) this.m_Data[String(component.Category).toLowerCase()] = {}
                        this.m_Data[String(component.Category).toLowerCase()][this.ToHex(component.Hash)] = {name: component.Name, item: component.ItemId, checked: component.Attached, hash: parseInt(component.Hash)}
                      
                    }
                    this.m_UserInterface.Load(this.m_Data)
                }.bind(this))

                if (this.m_Model.m_Loaded) this.m_Model.m_OnLoadCallback()
                
            } else {
                this.m_Model.Load(function(){
                    for (let index in data.Components){
                        let component = data.Components[index]
                        if (parseInt(component.ItemId) == -1 && parseInt(data.ItemId) != -1 && !component.Attached) continue
                        if (BLACKLISTED_CATEGORY(String(component.Category).toLowerCase(), parseInt(data.ItemId) == -1) || BLACKLISTED_COMPONENT(String(component.Name).toLowerCase(), parseInt(data.ItemId) == -1)) continue
                        component.Attached && !this.m_Model.m_Components.has(parseInt(component.Hash)) ? this.m_Model.AddComponent(parseInt(component.Hash)) : false
                        !component.Attached && this.m_Model.m_Components.has(parseInt(component.Hash)) ? this.m_Model.RemoveComponent(parseInt(component.Hash)) : false
                        if (!this.m_Data[String(component.Category).toLowerCase()]) this.m_Data[String(component.Category).toLowerCase()] = {}
                        this.m_Data[String(component.Category).toLowerCase()][this.ToHex(component.Hash)] = {name: component.Name, item: component.ItemId, checked: component.Attached, hash: parseInt(component.Hash)}
                    }
                }.bind(this))

                if (this.m_Model.m_Loaded) this.m_Model.m_OnLoadCallback()

                this.m_UserInterface.Load(this.m_Data)
            }
        } catch(exception){
            this.Error(exception, "Event_OnReceive")
        }
    }

    ChangeComponent(hash, item, add){
        try{
            mp.events.callRemote("WeaponPreview::ChangeComponent", String(hash), add)
        } catch(exception){
            this.Error(exception, "ChangeComponent")
        }
    }

    Click(x, y, direction, side){
        try{
            this.m_Model.Click(x, y, direction, side)
        } catch (exception){
            this.Error(exception, "Click")
        }
    }

    Render(){
        try{
            this.m_Model.Render()
        } catch(exception){
            this.Error(exception, "Render")
        }
    }

    ToHex(input){
        try{
            if (!input) return false 
            return "0x" + (parseInt(input)).toString(16).toUpperCase();
        } catch(exception){
            this.Error(exception, "ToHex")
        } 
    }


    GetBrowser(){
        return this.m_Browser
    }

    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponAttachmentPreviewModel@Exception: Print-Error", false, true)
        }
    }

}

let Preview = new WeaponPreview()

mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();
		
	if (commandName === "pre"){
        Preview.m_Model.Create(0xFAD1F1C9).Load(function(){
            Preview.m_Model.AddComponent(0xC66B6542)
        }.bind(this))
    }
});

}