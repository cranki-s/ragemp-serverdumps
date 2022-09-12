{

let serviceUI = null;

mp.events.add({
    "Service_Remove": (id) => {
        mp.events.callRemote("Service_Remove_Server", id)
        mp.gui.cursor.visible = false;
    },
    "Service_Track": (id) => {
        mp.events.callRemote("Service_Track_Server", id)
        mp.gui.cursor.visible = false;
    },
    "Service_Locate": (id) => {
        mp.events.callRemote("Service_Locate_Server", id)
        mp.gui.cursor.visible = false;
    },
    "Service_Help": (faction, id) => {
        mp.events.callRemote("Service_Help_Server", faction , id)
        mp.gui.cursor.visible = false;
    },
    "Display_Calls": (name, arrjson) => {
        if (serviceUI === null) {
            serviceUI = mp.browsers.new("package://cef/Interfete/Services/index.html")
            arrjson = arrjson.replace(/'/g, "\\'");
            arrjson = arrjson.replace(/`/g, "\\`");
            serviceUI.execute("app.ShowServiceData(" + name + ", '" + arrjson + "');");
            mp.gui.cursor.visible = !0
            mp.events.callRemote("AddServiceUser")
        }
        else {
            serviceUI.destroy();
            serviceUI = null;
            mp.events.callRemote("RemoveServiceUser")
        }
    },
    "Refresh_Calls": (name, arrjson) => {
        if (serviceUI != null) {
            arrjson = arrjson.replace(/'/g, "\\'");
            arrjson = arrjson.replace(/`/g, "\\`");
            serviceUI.execute("app.ShowServiceData(" + name + ", '" + arrjson + "');");
        }
    }
})
}