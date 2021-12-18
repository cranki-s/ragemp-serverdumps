{
let invBrowser = null,
    lastInteract = 0,
    groupTeamBlips = [];

function canInteract() {
    return lastInteract + 1000 < Date.now();
}

mp.keys.bind(0x49, true, function() {
    if (mp.gui.cursor.visible) return;
    if (invBrowser == null) {
        // Öffnen
        if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
        let languageValue = mp.storage.data.language,
            language = "en";
        if (languageValue == undefined)
            language = "en";
        else language = languageValue;
        invBrowser = mp.browsers.new("package://cef/inventory/index.html");
        setTimeout(() => {
            invBrowser.execute(`setLanguage('${language}');`);
        }, 50);

        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
        mp.events.callRemote("Server:Utilities:setCefState", true);
        mp.events.callRemote("Server:Inventory:requestItems");
    }
});

mp.events.add("Client:Inventory:updateItems", (inventoryJSON, selectedKit, kitJSON, versusMapJSON, isInGroup, groupInfoJSON, memberJson) => {
    if (invBrowser == null) return;
    invBrowser.execute(`setItems('${inventoryJSON}');`);
    invBrowser.execute(`setKits(${selectedKit} , '${kitJSON}');`);
    invBrowser.execute(`setGroupInfo(${isInGroup}, '${groupInfoJSON}', '${memberJson}');`);
    invBrowser.execute(`setVersusMaps('${versusMapJSON}');`);
});

mp.events.add("Client:Versus:sendInvite", (targetName, kitId, mapId) => {
    if (targetName == undefined || kitId == undefined || mapId == undefined || kitId <= 0 || mapId <= 0 || targetName.length <= 0) return;
    mp.events.callRemote("Server:Versus:sendInvite", targetName, parseInt(kitId), parseInt(mapId));
});

mp.events.add("Client:Inventory:onlyUpdateItems", (inventory) => {
    if (invBrowser == null) return;
    invBrowser.execute(`setItems('${inventory}');`);
});

mp.events.add("Client:Inventory:destroy", () => closeInventory());

mp.events.add("Client:Inventory:selectKit", (kitId) => {
    mp.events.callRemote("Server:Inventory:selectKit", parseInt(kitId));
});

mp.events.add("Client:Inventory:use", (itemName) => {
    mp.events.callRemote("Server:Inventory:use", itemName);
});

mp.events.add("Client:Inventory:drop", (itemName) => {
    mp.events.callRemote("Server:Inventory:drop", itemName);
});

// Gruppensystem
function deleteGroupBlips() {
    for (var blip in groupTeamBlips) {
        if (groupTeamBlips[blip] == null || groupTeamBlips[blip] == undefined) continue;
        groupTeamBlips[blip].destroy();
    }
    groupTeamBlips = [];
}

mp.events.add("Client:Groupsystem:setTeamBlips", (json) => {
    deleteGroupBlips();
    json = JSON.parse(json);
    for (var i in json) {
        groupTeamBlips.push(mp.blips.new(280, json[i].Position, {
            name: `Gruppenmitglied: ${json[i].Name}`,
            color: 12,
            shortRange: false,
            dimension: 0,
            scale: 0.75,
        }));
    }
});

mp.events.add("Client:Groupsystem:deleteGroupBlips", () => deleteGroupBlips());

mp.events.add("Client:Groupsystem:rankAction", (groupId, pName, action) => {
    mp.events.callRemote("Server:Groupsystem:rankAction", groupId, pName, action);
});

mp.events.add("Client:Groupsystem:kickPlayer", (groupId, pName) => {
    mp.events.callRemote("Server:Groupsystem:kickPlayer", groupId, pName);
});

mp.events.add("Client:Groupsystem:invitePlayer", (pName) => {
    mp.events.callRemote("Server:Groupsystem:invitePlayer", pName);
});

mp.events.add("Client:Groupsystem:createGroup", (name, tag) => {
    mp.events.callRemote("Server:Groupsystem:createGroup", name, tag);
});

exports = {
    deleteGroupBlips: function() {
        mp.gui.chat.push()
    },
};


function closeInventory() {
    if (invBrowser != null) {
        invBrowser.destroy();
        invBrowser = null;
    }
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    mp.events.callRemote("Server:Utilities:setCefState", false);
}
}