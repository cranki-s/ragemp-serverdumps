{
var weatherMenu = null;
lastInteract = 0,
    weatherMenuOpen = false,
    morning = false,
    day = false,
    night = false,

    function canInteract() {
        return lastInteract + 2000 < Date.now();
    }

mp.events.add("Client:Weather:create", () => {
    if (!canInteract) return;
    lastInteract = Date.now();
    if (weatherMenu == null) {
        if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
        weatherMenu = mp.browsers.new("package://cef/weatherMenu/index.html");
        let languageValue = mp.storage.data.language,
            language = "en";
        if (languageValue == undefined)
            language = "en";
        else language = languageValue;
        setTimeout(() => {
            weatherMenu.execute(`setLanguage('${language}');`);
        }, 50);
        mp.gui.chat.show(false)
        mp.gui.cursor.show(true, true);
        mp.events.callRemote("Server:Utilities:setCefState", true);
    }
});

mp.events.add("Client:Weather:close", () => {
    if (weatherMenu != null) {
        weatherMenu.destroy();
        weatherMenu = null;
    }
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true)
    mp.events.callRemote("Server:Utilities:setCefState", false);
});

mp.keys.bind(0x78, false, function() {
    if (!canInteract) return;
    lastInteract = Date.now();
    if (!weatherMenuOpen) mp.events.callRemote("Server:Weather:create");
    else mp.events.callRemote("Server:Weather:close");
    weatherMenuOpen = !weatherMenuOpen;
});

mp.events.add("render", () => {
    if (morning == true) {
        mp.game.time.setClockTime(06, 00, 00);
    }
    if (day == true) {
        mp.game.time.setClockTime(16, 00, 00);
    }
    if (night == true) {
        mp.game.time.setClockTime(22, 00, 00);
    } else {
        return;
    }
});

mp.events.add("setmorning", () => {
    morning = true;
    day = false;
    night = false;
});

mp.events.add("setday", () => {
    day = true;
    morning = false;
    night = false;
});

mp.events.add("setnight", () => {
    day = false;
    morning = false;
    night = true;
});

mp.events.add("SetWeather", (type) => {
    mp.game.gameplay.setWeatherTypeNow(type);
});
}