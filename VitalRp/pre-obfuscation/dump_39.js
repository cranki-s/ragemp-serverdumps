{
mp.events.add({
    "Display_Player_Vehicles": (vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/MeniuMasiniP/index.html")
        }
        uiGlobal_Browsers.execute("app.loadVehicles('" + vehicle_list + "');");
        mp.gui.cursor.visible = !0
    },
    "Player_Vehicle_Track": (sqlId) => {
        mp.events.callRemote("TrackVehicle", sqlId)
    },
    "updateVehicleKeys": (id,keyholders) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/MeniuMasiniP/index.html")
        }
        uiGlobal_Browsers.execute("app.updateKeys(" + id + ",'" + keyholders + "');");
        mp.gui.cursor.visible = !0
    },
    "giveVKey": (vehid, playerid, name)=>{
        mp.events.callRemote("givevkey", vehid, playerid, name)
    },
    "removeVKey": (vehid, playersql) => {
        mp.events.callRemote("removevkey", vehid, playersql)
    },
});
}