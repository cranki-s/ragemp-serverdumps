{
let animBrowser = null,
        chatOpened = false,
        animslot = -1,
        spamsafe = false;


mp.keys.bind(0x4e, true, function () { // X Key 
        if (mp.gui.cursor.visible || animBrowser != null || spamsafe) return;
        if (mp.players.local.getVariable("IsCefOpen") != undefined && mp.players.local.getVariable("IsCefOpen") == true) return;
        if (mp.players.local.getVariable("IsCefOpen") == true || animBrowser != null) return;
        spamsafe = true;
        animBrowser = mp.browsers.new("package://cef/animation/index.html");
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
                mp.events.callRemote("Server:Animation:requestAnimation");                  
        }, 50);
        setTimeout(() => {
                spamsafe = false;                    
        }, 1000);
});

mp.events.add("changeChatState", (state) => {
        chatOpened = state;
});

mp.events.add("Client:AnimationMenu:selectAnim", (slot) => {
        if (slot == -1){
                animslot = -1;
                return;
        }
        animslot = slot;
});

mp.keys.bind(0x4e, false, function () {
        if (animBrowser == null || !mp.gui.cursor.visible) return;
        if (animslot == 1){
                closeAnimBrowser();
                mp.gui.cursor.show(false,false);
                mp.events.callRemote("Server:Animation:selectrequest");

        } else {
                mp.events.callRemote("Server:AnimationMenu:selectAnim", animslot);
                closeAnimBrowser();
                mp.gui.cursor.show(false, false);

        }
    mp.events.callRemote("Server:Utilities:setCefState", false);
        animslot = -1;

});

//// select anim browser


function closeAnimBrowser() {
        if (animBrowser != null) {
                animBrowser.destroy();
                animBrowser = null;
        }
        mp.gui.cursor.show(false, false);
        mp.events.callRemote("Server:Utilities:setCefState", false);
}

mp.events.add("Client:Animations:update", (json) => {
        if (animBrowser == null) return;
        animBrowser.execute(`Animations('${json}')`);
    });

}