{
let clothesshopBrowser = null;

mp.events.add("Client:ClothesShop:create", (shopId, maskCount, torsoCount, LegCount, ShoesCount, AccessoriesCount, UndershirtCount, VestCount, TopCount, HatCount, GlassesCount) => {
    if (clothesshopBrowser != null) return;
    clothesshopBrowser = mp.browsers.new("package://cef/clothesshop/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        clothesshopBrowser.execute(`setLanguage('${language}');`);
        mp.gui.cursor.show(true, true);
        clothesshopBrowser.execute(`setCount(${shopId}, ${maskCount}, ${torsoCount}, ${LegCount}, ${ShoesCount}, ${AccessoriesCount}, ${UndershirtCount}, ${VestCount}, ${TopCount}, ${HatCount}, ${GlassesCount});`);
    }, 500);
});

mp.events.add("Client:ClothesShop:requestClothesFromCategory", (shopId, category) => {
    mp.events.callRemote("Server:ClothesShop:requestClothesFromCategory", shopId, category);
});

mp.events.add("Client:ClothesShop:tryClothes", (clothesId) => {
    mp.events.callRemote("Server:ClothesShop:tryClothes", clothesId);
});

mp.events.add("Client:ClothesShop:buyClothes", (clothesId) => {
    mp.events.callRemote("Server:ClothesShop:buyClothes", clothesId);
});

mp.events.add("Client:ClothesShop:setClothesContent", (json) => {
    if (clothesshopBrowser == null) return;
    clothesshopBrowser.execute(`setClothesContent('${json}');`);
});

mp.events.add("Client:ClothesShop:destroy", () => {
    if (clothesshopBrowser != null) {
        mp.gui.cursor.show(false, false);
        clothesshopBrowser.destroy();
        clothesshopBrowser = null;
    }
    mp.events.callRemote("Server:ClothesShop:resetSkin");
});
}