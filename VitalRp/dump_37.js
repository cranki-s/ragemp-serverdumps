{

let safeToGiveItem = false;
let safeToGiveItemTimeout = null;

mp.events.add({


   'reloadinventory': () => {
        if (safeToGiveItem || safeToGiveItemTimeout != null) return;
        safeToGiveItem = true;

        safeToGiveItemTimeout = setTimeout(() => {
            safeToGiveItem = false;
            safeToGiveItemTimeout = null;
        }, 200);
    },








    "removeItem": (storageId, cell, inventorytype) => {
        mp.events.callRemote("RemoveItem", storageId, cell, inventorytype)
    },
    "giveArmorItem": (item, storageId, cell, inventorytype, targetid) => {
        mp.events.callRemote("GiveArmorItem", item, storageId, cell, inventorytype, targetid)
    },
    "giveItem": (item, storageId, cell, inventorytype) => {
        if (safeToGiveItem) {
            mp.events.callRemote("GiveItem", item, storageId, cell, inventorytype)
        }
    },
    "updateItem": (amount, storageId, cell, inventorytype) => {
        mp.events.callRemote("UpdateItem", amount, storageId, cell, inventorytype, "")
    },
    "removeClothe": (storageId, cell, inventorytype) => {
        mp.events.callRemote("RemoveClothe", storageId, cell, inventorytype)
    },
    "equipClothe": (item, storageId, cell, inventorytype) => {
        mp.events.callRemote("EquipClothe", item, storageId, cell, inventorytype)
    },
    "removeIWeapon": (storageId, cell, inventorytype) => {
        mp.events.callRemote("RemoveWeapon", storageId, cell, inventorytype)
    },
    "equipWeapon": (item, storageId, cell, inventorytype) => {
        mp.events.callRemote("EquipWeapon", item, storageId, cell, inventorytype)
    },
    "ItemAction": (item, cell, storageId, storageType, action) => {
        mp.events.callRemote("ItemAction", item, cell, storageId, storageType, action)
    },
    "Display_Inventory": (inv) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.LoadInventory('" + inv + "');");
        mp.gui.cursor.visible = !0
    },
    "OpenBag": (id) => {
        mp.events.callRemote("OpenBagFromTarget", id);
    },
    "LoadPBag": (bagdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadPbag('" + bagdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadPInv": (itemdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadPInv('" + itemdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadPWep": (itemdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadPWep('" + itemdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadTWep": (itemdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadTWep('" + itemdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadTInv": (itemdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadTInv('" + itemdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "LoadTBag": (itemdetails) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("http://package2/Player/Inventory/index.html")
        }
        global.uiGlobal_Browsers.execute("app.loadTBag('" + itemdetails + "');");
        mp.gui.cursor.visible = !0
    },
    "CloseInvnetory": () => {
        mp.events.callRemote("CloseInventory");
    },
    "moveItem": (item, oldCell, oldStorageId, oldStorageType, newCell, newStorageId, newStorageType) => {
        mp.events.callRemote("moveInventoryItem", item, oldCell, oldStorageId, oldStorageType, newCell, newStorageId, newStorageType)
    },
})

}