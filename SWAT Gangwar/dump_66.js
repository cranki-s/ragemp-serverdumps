{
var clothesBrowser = null;

mp.events.add("Client:ClothesViewer:Open", componentId => {
    if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
    if(clothesBrowser == null) {
        clothesBrowser = mp.browsers.new("package://cef/clothesViewer/index.html");
        clothesBrowser.execute(`openClothesViewer(${componentId})`);
        mp.gui.cursor.show(true, true);
        mp.events.callRemote("Server:Utilities:setCefState", true);
    }
});

mp.events.add("Client:ClothesViewer:Save", (clothName, component, drawable, texture, gender, price) => {
    if(clothesBrowser == null) return;
    mp.events.callRemote("Server:ClothesViewer:Save", clothName, component, drawable, texture, gender, price);
});

mp.events.add("Client:ClothesViewer:Close", () => {
    if(clothesBrowser == null) return;
    clothesBrowser.destroy();
    clothesBrowser = null;
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true)
    mp.events.callRemote("Server:Utilities:setCefState", false);
});

mp.events.add("Client:Clothes:setComponentVariation", (component, drawable, texture) => {
    if(clothesBrowser == null) return;
    mp.events.callRemote("Server:Clothes:setComponentVariation", component, drawable, texture);
});
}