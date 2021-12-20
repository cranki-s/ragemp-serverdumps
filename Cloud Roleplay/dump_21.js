{
class RemoteEvent {
    constructor(x, ...y) {
        this.eventname = x;
        this.arguments = y;
    }
    Get() {
        return [this.eventname, this.arguments];
    }
}

class Browser {
    constructor(x, y, z) {
        this.id = x;
        this.active = y;
        this.url = z;
    }
    Get() {
        return [this.id, this.active, this.url];
    }
}

class Execution {
    constructor() {
        this.LastRemoteCall = 0;
        this.LastRemoteEvent = null;
        this.LastBrowser = null;
        this.RemoteEventCounts = 0;
        this.RemoteEvent = mp.events.callRemote;
        this.AddEvent = mp.events.add;
    }
    HandleRemoteEvent(x, ...y) {
        this.RemoteEventCounts++;
        this.LastRemoteCall = Date.now;
        this.LastRemoteEvent = new RemoteEvent(x, ...y);

        this.RemoteEvent(x, ...y); // <= resend the original remote call to server
    }
    HandleBrowserEvent(browser) {
        this.LastBrowser = new Browser(browser.id, browser.active, browser.url);

        if (this.LastBrowser != null) {
            if (!this.LastBrowser.url.startsWith("package://cef/")) {
                this.ThrowDetection(99);
                this.ThrowMessage(`UNTRUSTED FILES`, `id(${this.LastBrowser.Get()[0]})`)
            }
        }
    }
    ThrowDetection(code) {
        this.HandleRemoteEvent("3195493654", code);
    }
    ThrowMessage(x, y) {
        mp.game.graphics.notify(`~r~[${x}]~w~ ${y}`);
        mp.events.callRemote("triggerdetection")
    }
}

var execution = new Execution();

//RAGE EVENTS
mp.events.callRemote = function(eventname, ...arguments) {
    execution.HandleRemoteEvent(eventname, ...arguments)
}

mp.events.add('browserCreated', (browser) => {
    execution.HandleBrowserEvent(browser);
});
}