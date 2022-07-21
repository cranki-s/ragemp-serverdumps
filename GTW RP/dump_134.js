{
class Screenshot{
    constructor(){
        try{
            this.m_Stream = ""
            this.m_Requester = false
            this.m_Browser = mp.browsers.new("package://gtalife/AntiCheat/Screenshot.html")
            mp.events.add("Screenshot::OnChunk", this.Event_OnProcesScreenshot.bind(this))
            mp.events.add("Screenshot::OnRequest", this.Event_OnRequestScreenshot.bind(this))
            mp.events.add("Screenshot::OnShow", this.Event_OnReceiveScreenshot.bind(this))
            mp.keys.bind(0x73, true, this.Event_OnClearKey.bind(this))
        } catch(e){
            //mp.console.logInfo(e)
        }
    }

    Event_OnRequestScreenshot(){
        try{
            let time = mp.game.time.getLocalTime(1 , 1, 1, 1, 1, 1)
            let screenName = "gta-world-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".jpg"
            mp.gui.takeScreenshot(screenName, 0, 100, 0)

            let context = this
            setTimeout(function(){
                context.m_Browser.execute(`getData("${"http://screenshots/" + screenName}")`)
            }.bind(context), 10000)
        } catch(e){
            //mp.console.logInfo(e) 
        }
    }

    Event_OnProcesScreenshot(data, first, end, size){
        try{
            mp.events.callRemote("Admin::SendScreenshot", mp.players.local.name, data, first, end, size)
        } catch(e){
            //mp.console.logInfo(e)
        }
    }

    Event_OnReceiveScreenshot(name, data, first, end){
        try{
            if (first) this.m_Stream = ""

            this.m_Stream += data

            if (end) this.m_Browser.execute(`setData("${this.m_Stream}")`)
    
        } catch(e){
            mp.console.logInfo(e)
        }
    }

    Event_OnClearKey(){
        try{
            this.m_Browser.execute(`clear()`)
        } catch(e){
            mp.console.logInfo(e)
        }
    }
}

__Screenshot = new Screenshot()
}