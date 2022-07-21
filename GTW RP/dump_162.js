{
let Core = class {

    constructor(){
        this.m_IsReady = false
        mp.events.add("Weapon::Names::Show", this.Event_OnReceive.bind(this))
        mp.events.add("Weapon::Names::Action", this.Event_OnAction.bind(this))
        mp.events.add("Weapon::Names::Close", this.Event_OnClose.bind(this))
        mp.events.add("Weapon::Names::Update", this.Event_OnUpdate.bind(this))
        mp.events.add("browserDomReady", this.Event_OnDomReady.bind(this))
        mp.events.add("render", this.Event_OnPulse.bind(this))
    }

    Dispose(){
        try{
            if (this.m_Browser && mp.browsers.exists(this.m_Browser)) this.m_Browser.destroy()
            this.m_DomQueue = []
            this.m_IsReady = false
            this.m_Browser = false
        } catch(exception){
            this.Error(exception, "Dispose")
        }
    }

    Event_OnReceive(data, weapon, admin){
        try{
            if (data.length == 0) return
            data = JSON.parse(data)
            this.Dispose()
            this.m_Browser = mp.browsers.new("package://gtalife/Weapon/Name/CEF/Main.html")
            mp.events.callRemote("cef_opened", true)
            mp.events.call("cef_opened_client", true)
            mp.gui.cursor.show(true, true)
            mp.gui.chat.show(false)
            mp.game.ui.displayRadar(false)
            mp.events.call("toggle_display_gtaw", false)
            this.TriggerCEFEvent("OnLoad", data, weapon, admin)
        } catch(exception){
            this.Error(exception, "Event_OnReceive")
        }
    }

    Event_OnUpdate(data, weapon, admin){
        if (!this.m_Browser) return this.Event_OnReceive(data)
        if (data.length == 0) return
        data = JSON.parse(data)
        this.TriggerCEFEvent("OnLoad", data, weapon, admin)
    }

    Event_OnAction(action, value){
        try{
            if (action == "add") mp.events.callRemote("Weapon::Name::Server::Add", value)
            if (action == "remove") mp.events.callRemote("Weapon::Name::Server::Remove", value)
            if (action == "apply") mp.events.callRemote("Weapon::Name::Server::Apply", value)
            
        } catch (exception){
            this.Error(exception, "Event_OnAction")
        }
    }
    
    Event_OnClose(){
        try{
            this.Dispose()
            mp.events.callRemote("cef_opened", false)
            mp.events.call("cef_opened_client", false)
            mp.gui.cursor.show(false, false)
            mp.game.ui.displayRadar(true)
            mp.gui.chat.show(true)
            mp.events.call("toggle_display_gtaw", true)
        } catch(exception){
            this.Error(exception, "Event_OnClose")
        }
    }

    Event_OnPulse(){
        try{
            if (this.m_Browser) mp.gui.cursor.show(true, true)
        } catch(exception){
            this.Error(exception, "Event_OnPulse")
        }
    }

    Event_OnDomReady(browser){
        try{
            if (browser != this.m_Browser) return 
            this.m_IsReady = true
            this.m_DomQueue.forEach(query =>{
                browser.execute(query)
            })
        } catch(Exception){
            this.Error(exception, "Event_OnDomReady")
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
            mp.console.logError("Weapon@Statistics: Print-Error", false, true)
        }
    }
}

new Core();
}