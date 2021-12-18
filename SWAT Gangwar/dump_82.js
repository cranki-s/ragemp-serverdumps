{
let clothesstorageBrowser = null;

mp.events.add("Client:ClothesStorage:create", (maskCount, torsoCount, LegCount, ShoesCount, AccessoriesCount, UndershirtCount, VestCount, TopCount, HatCount, GlassesCount) => {
    if (clothesstorageBrowser != null) return;
    clothesstorageBrowser = mp.browsers.new("package://cef/clothesstorage/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        clothesstorageBrowser.execute(`setLanguage('${language}');`);
        mp.gui.cursor.show(true, true);
        clothesstorageBrowser.execute(`setCount(${maskCount}, ${torsoCount}, ${LegCount}, ${ShoesCount}, ${AccessoriesCount}, ${UndershirtCount}, ${VestCount}, ${TopCount}, ${HatCount}, ${GlassesCount});`);
    }, 500);
});

mp.events.add("Client:ClothesStorage:requestClothesFromCategory", (category) => {
    mp.events.callRemote("Server:ClothesStorage:requestClothesFromCategory", category);
});

mp.events.add("Client:ClothesStorage:setClothes", (clothesId) => {
    mp.events.callRemote("Server:ClothesStorage:setClothes", clothesId);
});

mp.events.add("Client:ClothesStorage:setClothesContent", (json) => {
    if (clothesstorageBrowser == null) return;
    clothesstorageBrowser.execute(`setClothesContent('${json}');`);
});

mp.events.add("Client:ClothesStorage:destroy", () => {
    if (clothesstorageBrowser != null) {
        mp.gui.cursor.show(false, false);
        clothesstorageBrowser.destroy();
        clothesstorageBrowser = null;
    }
    mp.events.callRemote("Server:ClothesStorage:resetSkin");
});
}