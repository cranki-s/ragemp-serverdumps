{
let gwKitBrowser = null;

mp.events.add("Client:Gangwar:KitCreate", (items) => {
    if (gwKitBrowser != null) return;
    gwKitBrowser = mp.browsers.new("package://cef/gwselectkit/index.html");
    mp.events.call("Client:HUD:setVisible", false);
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        gwKitBrowser.execute(`setLanguage('${language}');`);
        gwKitBrowser.execute(`setItems('${items}');`);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:Gangwar:selectKit", (kitId, name) => {
    mp.events.callRemote("Server:Gangwar:SelectKit", parseInt(kitId), name);
});

mp.events.add("Client:Gangwar:KitListdestroy", () => {
    if (gwKitBrowser != null) {
        mp.gui.cursor.show(false, false);
        gwKitBrowser.destroy();
        gwKitBrowser = null;
    }
    mp.events.call("Client:HUD:setVisible", true);

});
}