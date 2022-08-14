{
mp.events.add({
    "openMDT": (name, rank, photos) => {
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Factions/PoliceMDT/index.html");
            global.uiGlobal_Browsers.execute("app.loadMainData('" + name + "', '" + rank + "', '" + photos + "');");
            global.mdt = true;
            mp.gui.cursor.visible = true;
        }
    },
    "ShowSearchResult": (profile) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.loadProfileData('" + profile + "');");
    },
    "searchInput": (type ,input) => {
        if(type === "player")
            mp.events.callRemote("mdtsearchbyname", input);
        else if (type === "plate")
            mp.events.callRemote("mdtsearchbyplate", input);
        else if (type === "guns")
            mp.events.callRemote("mdtsearchbyserial", input);
        else if (type === "reports")
            mp.events.callRemote("mdtsearchbyreports", input);
    },
    "mdtshowerrror": (text) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.showErrorMessage('" + text + "');");
    },
    "closeMdt": () => {
        if (global.uiGlobal_Browsers != undefined) {
            global.uiGlobal_Browsers.destroy();
            global.uiGlobal_Browsers = undefined
            global.mdt = false;
            mp.gui.cursor.visible = false;
            mp.events.callRemote("stopMdt")
        }

    },
    "addNewCharges": (charges, id, profile) => {
        mp.events.callRemote("addnewmdtcharges", charges, id, profile);
    },
    "removechargefrommdt": (chargeid , officer, infaction, removedBy, slqid, date, fine, time, profilename) => {
        mp.events.callRemote("removechargefrommdt", chargeid, officer, infaction, removedBy, slqid, date, fine, time, profilename);
    },
    "requestmdtchargehistory": (sqlid, id, bool, bool2) => {
        mp.events.callRemote("requestmdtchargehistory", sqlid, id, bool, bool2);
    },
    "requestfirearms": (sqlid, id, bool, bool2) => {
        mp.events.callRemote("requestfirearms", sqlid, id, bool, bool2);
    },
    "requestMDTReports": (id, go, first, name, tab) => {
        mp.events.callRemote("requestmdtreports", id, go, first, name, tab);
    },
    "requestMDTBolos": (id, go, first, name, tab) => {
        mp.events.callRemote("requestmdtbolos", id, go, first, name, tab);
    },
    "requestMDTWarrants": (id, go, first, status, tab) => {
        mp.events.callRemote("requestmdtwarrants", id, go, first, status, tab);
    },
    "requestMDTLogs": (id, go, first, tab) => {
        mp.events.callRemote("requestMDTLogs", id, go, first, tab);
    },
    "mdtbringhistorycharges": (list) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.bringHistory('" + list + "');");
    },
    "mdtbringfirearms": (list) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.bringFirearms('" + list + "');");
    },
    "mdtbringreports": (list, tab) => {
        if (global.mdt === true) 
        global.uiGlobal_Browsers.execute("app.bringReports('" + list + "', '" + tab + "');");
    },
    "mdtbringbolos": (list, tab) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.bringBolos('" + list + "', '" + tab + "');");
    },
    "mdtbringwarrants": (list, tab) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.bringWarrants('" + list + "', '" + tab + "');");
    },
    "mdtbringlogs": (list, tab) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.bringLogs('" + list + "', '" + tab + "');");
    },
    "ShowWeaponInfo": (list) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.loadWeaponData('" + list + "');");
    },
    "startPictureMode": (profile) => {
        mp.events.call("startMDTpictureMode", profile)
    },
    "fuckyourmompage":(name) =>{
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.fuckyourmompage('"+ name +"');");
     },
    "setProfilePicture": (id, url, user, profile) => {

        mp.events.callRemote("updateMDTMugshot", id, url, user, profile)
    },
    "mdtAddKnownOcc": (id, occ, user, profile) => {

        mp.events.callRemote("mdtAddKnownOcc", id, occ, user ,profile)
    },
    "updateGunStatus": (id, status, user, openslot, ownerId, name, serial) => {
        mp.events.callRemote("updateGunStatus", id, status, user, openslot, ownerId, name, serial)
    },
    "activateGunLicenseStatus": (sql, status, revoked, user, name) => {
        mp.events.callRemote("activateGunLicenseStatus", sql, status, revoked, user, name)
    },
    "revokeGunLicenseStatus": (sql, status, revoked, lastactive, user, profile) => {
        mp.events.callRemote("revokeGunLicenseStatus", sql, status, revoked, lastactive,user, profile)
    },
    "addnewmdtreport": (report) => {
        mp.events.callRemote("addnewmdtreport", report)
    },
    "addnewmdwarrant": (report) => {
        mp.events.callRemote("addnewmdwarrant", report)
    },
    "addnewbolo": (report) => {
        mp.events.callRemote("addnewmdbolo", report)
    },
    "requestBoloDelete": (report, user) => {
        mp.events.callRemote("requestBoloDelete", report, user)
    },
    "updateEditedReport": (report) => {
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.updateEditedRaport('" + report + "');");
    },
    "updateMDTGallery": (list) => {
        mp.events.callRemote("updateMDTGallery", list)
    },

})



}