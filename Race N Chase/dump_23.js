{
function InitializeHotwireDOM(){
    HotwireDOM = mp.browsers.new("package://hotwire_game/index.html");
    HotwireDOM.active = false;
}

mp.events.add("StartHotwire", () => {
    HotwireDOM.execute(`generateHotwire();`); // restarts the minigame
    HotwireDOM.active = true;
    isHotwiring = true;
});
mp.events.add("StopHotwire", () => {
    HotwireDOM.active = false;
    isHotwiring = false;
});
mp.events.add("CS_HotwireResult", (success) => {
    isHotwiring = false;
    if(success){
        setTimeout(() => {
            HotwireDOM.active = false; // to let the sound fully play
        }, 500);
    }
    mp.events.callRemote("OnHotwireResult", success);
});
}