{
var ps4menu = null;
lastInteract = 0,
    isOpen = false

setInterval(() => {
    if (mp.game.gameplay.getProfileSetting(0) == 0 && isOpen == false || mp.game.gameplay.getProfileSetting(0) == 1 && isOpen == false || mp.game.gameplay.getProfileSetting(0) == 2 && isOpen == false) {
        showantips4();
    } else if (mp.game.gameplay.getProfileSetting(0) == 3 && isOpen == true) {
        closeantips4();
    }
}, 250);

function showantips4() {
    if (ps4menu == null) {
        if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
        ps4menu = mp.browsers.new("package://cef/anticontroller/index.html");
        let languageValue = mp.storage.data.language,
            language = "en";
        if (languageValue == undefined)
            language = "en";
        else language = languageValue;
        setTimeout(() => {
            ps4menu.execute(`setLanguage('${language}');`);
        }, 50);
        mp.players.local.freezePosition(true);
        mp.events.callRemote("Server:Utilities:setCefState", true);
        isOpen = true;
    }
};

function closeantips4() {
    if (ps4menu != null) {
        ps4menu.destroy();
        ps4menu = null;
    }
    mp.players.local.freezePosition(false);
    mp.events.callRemote("Server:Utilities:setCefState", false);
    isOpen = false;
};
}