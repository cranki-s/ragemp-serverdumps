{
let tattoosshop = null;
const hud = require('./instructional_buttons/hudManager');
const buttonHud = new hud(-1, "#000000");

mp.events.add("Client:TattoosShop:CreateBrowser", () => {
    if (tattoosshop != null) return;
    mp.events.callRemote("Server:Utilities:setCefState", true);
    tattoosshop = mp.browsers.new("package://cef/tattoosshop/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        tattoosshop.execute(`setLanguage('${language}');`);
    }, 50);

    setTimeout(() => {
        mp.gui.cursor.show(true, true);
        if (language == "de")
            buttonHud.addButton("Cursor deaktiveren => Kamera bewegen", 169);
        else if (language == "en")
            buttonHud.addButton("Deactivate Cursor (F8) => Can move camera", 169);
        buttonHud.toggleHud(true);
    }, 900);
});

mp.events.add("Client:TattoosShop:SendRequestCategory", (json) => {
    if (tattoosshop == null || json == null) return;
    tattoosshop.execute(`loadTattoosFromJson('${json}');`);
});

mp.events.add("Client:TattooShop:RequestCategory", (category) => {
    if (category < 0) return;
    mp.events.callRemote("Server:TattoosShop:RequestCategory", category);
});

mp.events.add("Client:TattooShop:TryTattoo", (tattooId) => {
    mp.events.callRemote("Server:TattoosShop:TryTattoo", tattooId);
});

mp.events.add("Client:TattooShop:BuyTattoo", (tattooId) => {
    mp.events.callRemote("Server:TattoosShop:BuyTattoo", tattooId);
});

mp.events.add("Client:TattooShop:SaleTattoo", (tattooId) => {
    mp.events.callRemote("Server:TattoosShop:SaleTattoo", tattooId);
});

mp.events.add("Client:TattoosShop:setContent", (json) => {
    if (tattoosshop == null) return;
    tattoosshop.execute(`loadTattoosFromJson('${json}');`);
});

mp.events.add("Client:TattoosShop:CloseBrowser", () => {
    mp.events.callRemote("Server:TattooShop:Rest");
    closeTattoosShop();
});

function closeTattoosShop() {
    if (tattoosshop != null) {
        tattoosshop.destroy();
        tattoosshop = null;
    }
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    mp.events.callRemote("Server:Utilities:setCefState", false);
    buttonHud.removeButtons();

}
}