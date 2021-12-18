{
let gangwarBrowser = null;

mp.events.add("Client:Gangwar:Open", (gangwarname, currentteam) => {
    if (gangwarBrowser == null) {
        gangwarBrowser = mp.browsers.new("package://cef/gangwar/index.html");
        let languageValue = mp.storage.data.language,
            language = "en";
        if (languageValue == undefined)
            language = "en";
        else language = languageValue;
        mp.gui.cursor.show(true, true);
        gangwarBrowser.execute(`setLanguage('${language}');`);
        gangwarBrowser.execute(`setInfortmation('${gangwarname}', '${currentteam}');`);
    }
});

mp.events.add("Client:Gangwar:Close", () => {
    if (gangwarBrowser != null) {
        gangwarBrowser.destroy();
        gangwarBrowser = null;
    }
    mp.gui.cursor.show(false, false);
});

mp.events.add("Client:Gangwar:Start", () => {
    mp.events.callRemote("Server:Gangwar:Start")
    if (gangwarBrowser != null) {
        gangwarBrowser.destroy();
        gangwarBrowser = null;
    }
    mp.gui.cursor.show(false, false);
});
}