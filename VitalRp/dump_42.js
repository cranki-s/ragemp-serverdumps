{
mp.events.add({
    "Preview_Clothes": (category, slot, id, texture, undershirtTexture) => {
        mp.events.callRemote("Preview_Clothes", category, slot, id, texture, undershirtTexture)
    },
    "Buy_Clothes": (category, slot, id, texture, undershirtTexture, price, type) => {
        mp.events.callRemote("Buy_Clothes", category, slot, id, texture, undershirtTexture, price, type)
    },
    "Get_Clothes": (category, slot, id, texture, undershirtTexture, price, type) => {
        mp.events.callRemote("Get_Clothes", category, slot, id, texture, undershirtTexture, price, type)
    },
    "Clothes_Menu_Destroy": () => {
        mp.events.callRemote("Clothes_Menu_Destroy")
    },
    "Display_Clothes": (clothes, storeType) => {

        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/ClothingUI/index.html")
        }
        global.uiGlobal_Browsers.execute("app.startTheThing('" + clothes + "', '" + storeType + "');");
        global.uiGlobal_Browsers.execute("app.GetPlayerRotation('" + localplayer.getRotation(2).z + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadVipOwnedClothes": (clothes) => {

        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/ClothingUI/index.html")
        }
        global.uiGlobal_Browsers.execute("app.addOwnedClothes('" + clothes + "');");

    },
    "LoadVipOwnedProps": (clothes) => {

        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/ClothingUI/index.html")
        }
        global.uiGlobal_Browsers.execute("app.addOwnedProps('" + clothes + "');");

    }
})

}