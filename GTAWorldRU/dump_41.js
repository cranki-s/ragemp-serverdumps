{
﻿var playerList ﻿= null;
mp.events.add('showPlayerList', () => {
	if (!mp.browsers.exists(playerList))
	{
		playerList ﻿= mp.browsers.new﻿("package://gtalife/Playerlist/Playerlist.html");
		playerList.execute(`$(".onlineplayers" ).empty();`);
		mp.events.callRemote('LoadPlayersToPlayerList');
		mp.events.call('setTriggeringPlayerList', false);
	}
});

mp.events.add('hidePlayerList', () => {
	if (playerList != null && mp.browsers.exists(playerList))
	{
		playerList.destroy();
		mp.events.call('setTriggeringPlayerList', false);
	}
});

mp.events.add('addPlayerToPlayerList', (currentPlayers, id, name, ping, playerListArray) => {
	if (playerList != null && mp.browsers.exists(playerList))
	{
		playerList.execute(`$( '#onlinecount').text( '${currentPlayers}');`);
		playerList.execute(`$(".onlineplayers").append('<tr class="table-active"> <th scope="row">${id}</th> <td>${name}</td> <td>${ping}</td> </tr>');`);
		
		if(playerListArray != null && playerListArray.length > 0){
			PlayerLst = JSON.parse(playerListArray);
			for (var i = 0; i < PlayerLst.length; ++i)
			{
				playerList.execute(`$(".onlineplayers").append('<tr> <th scope="row">${PlayerLst[i].ID}</th> <td>${PlayerLst[i].Name}</td> <td>${PlayerLst[i].Ping}</td> </tr>');`);
			}
		}
		playerList.execute(`$('#PlayerList').show();`);
	}
});

mp.keys.bind(0x4F, true, (player) => {
	if (logged == 0 || chatopened  || cef_opened)
		return;
	mp.events.callRemote('playerlist_button');
});

mp.events.add('setTriggeringPlayerList', (toggle) => {
	mp.events.callRemote('SetTriggeringPlayerList', toggle);
});
}涧ʧ