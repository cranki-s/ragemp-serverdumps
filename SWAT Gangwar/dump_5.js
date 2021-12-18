{
let manageTeamBrowser = null;

mp.events.add("Client:TeamManage:openBrowser", (teamId, teamName, teamMemberJSON) => {
    if (manageTeamBrowser == null && teamId != null && teamId != null && teamMemberJSON != null) manageTeamBrowser = mp.browsers.new("package://cef/manageteam/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        manageTeamBrowser.execute(`setLanguage('${language}');`);
        manageTeamBrowser.execute(`setMembers(${teamId}, '${teamName}', '${teamMemberJSON}');`);
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:TeamManage:openInviteWindow", (teamId, teamName) => {
    if (manageTeamBrowser == null) manageTeamBrowser = mp.browsers.new("package://cef/manageteam/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        manageTeamBrowser.execute(`setLanguage('${language}');`);
        manageTeamBrowser.execute(`showInviteWindow(${teamId}, '${teamName}');`);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:Versus:acceptInvite", (inviterName, kitId, mapId) => {
    if (inviterName == undefined || inviterName.length <= 0 || kitId == undefined || kitId <= 0 || mapId == undefined || mapId <= 0) return;
    mp.events.callRemote("Server:Versus:acceptInvite", inviterName, parseInt(kitId), parseInt(mapId));
});

mp.events.add("Client:Versus:openInviteWindow", (inviterName, kitName, mapName, kitId, mapId) => {
    if (manageTeamBrowser == null) manageTeamBrowser = mp.browsers.new("package://cef/manageteam/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        manageTeamBrowser.execute(`setLanguage('${language}');`);
        manageTeamBrowser.execute(`showVersusInviteWindow('${inviterName}', '${kitName}', '${mapName}', ${kitId}, ${mapId});`);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:Groupsystem:openGroupInviteWindow", (groupId, groupName) => {
    if (manageTeamBrowser == null) manageTeamBrowser = mp.browsers.new("package://cef/manageteam/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        manageTeamBrowser.execute(`setLanguage('${language}');`);
        manageTeamBrowser.execute(`showGroupInviteWindow(${groupId}, '${groupName}');`);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:Groupsystem:doInviteAction", (action, groupId) => {
    if (action == undefined || groupId <= 0 || groupId == undefined) return;
    if (action != "accept" && action != "decline") return;
    mp.events.callRemote("Server:Groupsystem:doInviteAction", action, parseInt(groupId));
});

mp.events.add("Client:TeamManage:doInviteAction", (action, teamId) => {
    if (action == undefined || teamId <= 0 || teamId == undefined) return;
    if (action != "accept" && action != "decline") return;
    mp.events.callRemote("Server:TeamManage:doInviteAction", action, parseInt(teamId));
});

mp.events.add("Client:TeamManage:kickMember", (teamId, accountId) => {
    if (teamId <= 0 || accountId <= 0 || accountId == undefined || teamId == undefined) return;
    mp.events.callRemote("Server:TeamManage:kickMember", parseInt(teamId), parseInt(accountId));
});

mp.events.add("Client:TeamManage:inviteMember", (teamId, username) => {
    if (teamId <= 0 || username.length <= 0 || username == undefined || teamId == undefined) return;
    mp.events.callRemote("Server:TeamManage:inviteMember", parseInt(teamId), username);
});

mp.events.add("Client:TeamManage:destroyBrowser", () => {
    if (manageTeamBrowser != null) {
        mp.gui.cursor.show(false, false);
        manageTeamBrowser.destroy();
        manageTeamBrowser = null;
    }
    mp.gui.chat.activate(true);
});
}