{
let WeaponPreviewUI = class {
    constructor(core){
        try{
            
            this.m_Core = core
            this.m_Browser =  mp.browsers.new("package://gtalife/WeaponAttachment/AttachmentCustomizer/CEF/Main.html")
            this.m_IsReady = false
            this.m_DomQueue = []
            this.m_DomReadyBind = this.Event_OnDomReady.bind(this)
            mp.events.add("browserDomReady", this.m_DomReadyBind)

            this.m_BlockBind = this.Event_OnBlockControl.bind(this)
            mp.events.add("WeaponPreview::CEF::ControlBlock", this.m_BlockBind)

            this.m_RenderBind = this.Event_OnRender.bind(this)
            mp.events.add("render", this.m_RenderBind)

            mp.events.call("toggle_display_gtaw", false)

            this.m_CloseBind = this.Event_OnClose.bind(this)
            mp.events.add("WeaponPreview::CEF::Close", this.m_CloseBind)

            this.m_ComponentBind = this.Event_OnSelectComponent.bind(this)
            mp.events.add("WeaponPreview::CEF::SelectComponent", this.m_ComponentBind)

            this.m_ViewBind = this.Event_OnViewHover.bind(this)
            mp.events.add("WeaponPreview::CEF::ViewHover", this.m_ViewBind)

        
            this.m_TurnBind = this.Event_OnTurnHover.bind(this)
            mp.events.add("WeaponPreview::CEF::TurnHover", this.m_TurnBind)

        } catch{

        }
    }

    Event_OnDomReady(browser){
        try{
            if (browser != this.m_Browser) return 
            this.m_IsReady = true
            this.m_DomQueue.forEach(query =>{
                browser.execute(query)
            })
        } catch(exception){
            this.Error(exception, "Event_OnDomReady")
        }
    }

    Event_OnBlockControl(state){
        try{
            if (!this.m_Core || !this.m_Core.m_Model) return
            this.m_Core.m_Model.m_Blocked = state
        } catch (exception){
            this.Error(exception, "Event_OnBlockControl")
        }
    }

    Event_OnSelectComponent(hash, item, checked){
        try{
            if (!this.m_Core || !this.m_Core.m_Model) return
            this.m_Core.ChangeComponent(hash, item, checked)
        } catch(exception){
            this.Error(exception, "Event_OnSelectComponent")
        }
    }

    Event_OnRender(){
        try{
            mp.gui.chat.show(false)
            mp.game.ui.displayRadar(false)
        } catch(exception){
            this.Error(exception, "Event_OnRender")
        }
    }

    Event_OnClose(){
        try{
            this.m_Core.Event_OnUserInterfaceClose(this)
        } catch(exception){
            this.Error(exception, "Event_OnClose")
        }
    }

    Event_OnViewHover(state){
        try{

        } catch (exception){
            this.Error(exception, "Event_OnViewHover")
        }
    }

    
    Event_OnTurnHover(state){
        try{
            if (!this.m_Core || !this.m_Core.m_Model) return
            this.m_Core.m_Model.Event_OnTurn(state)
        } catch (exception){
            this.Error(exception, "Event_OnTurnHover")
        }
    }

    Load(data){
        try{
            this.TriggerCEFEvent("OnLoad", data)
        } catch(exception){
            this.Error(exception, "Load")
        }
    }

    Name(title){
        try{
            this.TriggerCEFEvent("OnName", title)
        } catch(exception){
            this.Error(exception, "SetName")
        }
    }

    Dispose(){
        try{
            mp.events.remove("browserDomReady", this.m_DomReadyBind)
            mp.events.remove("WeaponPreview::CEF::ControlBlock", this.m_BlockBind)
            mp.events.remove("WeaponPreview::CEF::Close", this.m_CloseBind)
            mp.events.remove("WeaponPreview::CEF::SelectComponent", this.m_ComponentBind)
            mp.events.remove("render", this.m_RenderBind)
            mp.events.remove("WeaponPreview::CEF::ViewHover", this.m_ViewBind)
            mp.game.ui.displayRadar(true)
            mp.gui.chat.show(true)
            mp.events.call("toggle_display_gtaw", true)
            if (mp.browsers.exists(this.m_Browser)) this.m_Browser.destroy()
        } catch(exception){
            this.Error(exception, "Dispose")
        }
    }

    TriggerCEFEvent(name, ...args){
        let argumentsString = '';
        for (let arg of args) {
            switch (typeof arg) {
                case 'string': {
                    argumentsString += `'${arg}',`;
                    break;
                }
                case "number":
                case "boolean": {
                    argumentsString += `${arg},`;
                    break;
                }
                case "object": {
                    argumentsString += `${JSON.stringify(arg)},`;
                    break;
                }
            }
        }

        if (this.m_IsReady)
            this.m_Browser.execute(`__Core.OnEvent("${name}", ${argumentsString})`)
        else 
            this.m_DomQueue.push(`__Core.OnEvent("${name}", ${argumentsString})`) 
    }

    
    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponAttachmentPreviewUI@Exception: Print-Error", false, true)
        }
    }

} 

function __WeaponPreviewUI(core){
    return new WeaponPreviewUI(core)
}
}