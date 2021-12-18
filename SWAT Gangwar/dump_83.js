{
var calendarBrowser = null,
boolWin = false;

mp.events.add("Client:Calendar:Open", (json) => {
    if(calendarBrowser == null) {
        mp.gui.cursor.show(true, true);
        mp.gui.chat.show(false);
        calendarBrowser = mp.browsers.new("package://cef/calendar/index.html");
        calendarBrowser.execute(`loadDays('${json}')`);
    }
});

mp.events.add("Client:Calendar:PopUp", (text) => {
    if(calendarBrowser == null) return;
        calendarBrowser.execute(`popup('${text}')`);
});

mp.events.add("Client:Calendar:Win", (day) =>{
    if(calendarBrowser == null || boolWin) return;
    boolWin = true;
    mp.events.callRemote("Server:Calendar:Win", parseInt(day));
});

mp.events.add("Client:Calendar:SendGift", (name) => {
    if(calendarBrowser == null) return;
    mp.events.callRemote("Server:Calendar:SendGift", name);
});

mp.events.add("Client:Calendar:Close", () => {
    if(calendarBrowser == null) return;
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    calendarBrowser.destroy();
    calendarBrowser = null;
    boolWin = false;
});


mp.events.add("Client:XMAS:EnterColeshape", () => {
    mp.game.gameplay.setWeatherTypeNowPersist("XMAS");
    //mp.game.gameplay.setWeatherTypeNow("SNOW");
    mp.game.time.setClockTime(23, 30, 0);
    playXMASMusik();
}); 


mp.events.add("Client:XMAS:LeaveColeshape", () => {
    stopXMASMusik();
    mp.game.gameplay.setWeatherTypeNowPersist("CLEAR");
    mp.game.gameplay.setWeatherTypeNow("CLEAR");
    mp.game.time.setClockTime(12, 30, 0);
}); 


var soundBrowser;

function playXMASMusik(){
    if (soundBrowser == null) {
        soundBrowser = mp.browsers.new('package://cef/Sound/index.html');
        soundBrowser.execute(`playSound("${1}")`);
    }
    
}

function stopXMASMusik() {
    if (soundBrowser != null) {
        soundBrowser.destroy();
        soundBrowser = null;
    }
}
}