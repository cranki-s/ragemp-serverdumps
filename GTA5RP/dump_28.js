{
    const mp = global.mp;
    global.playerFriendsList = [];
    const localPlayer = mp.players.local;
    global.isPlayerFriend = function (a) {
        return global.isCharacterFriend(a.getVariable("characterId"))
    }, global.isCharacterFriend = function (a) {
        return !!(0 < global.adminLevel) || -1 != global.playerFriendsList.indexOf(a)
    }, global.playerFriendsReplaceString = function (a) {
        let b, c = /!\((.*?)\|(.*?)\|(.*?)\)/gm,
            d = [];
        for (; null !== (b = c.exec(a));) {
            b.index === c.lastIndex && c.lastIndex++;
            const a = parseInt(b[1]);
            0 < global.adminLevel || a == localPlayer.getVariable("characterId") || -1 != global.playerFriendsList.indexOf(a) ? d.push([b[0], b[3]]) : d.push([b[0], `Гражданин[${b[2]}]`])
        }
        for (let b of d) a = a.replace(b[0], b[1]);
        return a
    }, global.rpc.register("client_playerFriends_replaceStr", function (a) {
        return global.playerFriendsReplaceString(a)
    }), mp.events.add("client_playerFriends_addInit", function (a) {
        a = JSON.parse(a);
        for (let b of a) global.playerFriendsList.push(b)
    }), mp.events.add("client_playerFriends_add", function (a) {
        global.playerFriendsList.push(a)
    }), mp.events.add("client_playerFriends_remove", function (a) {
        const b = global.playerFriendsList.indexOf(a); - 1 != b && global.playerFriendsList.splice(b, 1)
    }), mp.events.add("client_playerFriends_clear", function () {
        global.playerFriendsList = []
    });
}