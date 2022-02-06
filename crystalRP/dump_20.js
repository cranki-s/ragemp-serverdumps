{
﻿global.board = mp.browsers.new('package://cef/board.html');
global.openOutType = -1;

mp.keys.bind(Keys.VK_I, false, function () {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || global.match || localplayer.getVariable('attachToVehicleTrunk')) return;
    if (global.boardOpen)
        mp.events.call('board', 1);
    else
        mp.events.call('board', 0);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function() {

    if (global.boardOpen) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('board', 1);
    }
});

function openBoard() {

	if(board == null) return;
	if (global.menuCheck()) return;
    menuOpen();
	board.execute('board.active=true');
	global.boardOpen = true;
}

function closeBoard() {
	
	if(board == null) return;
    menuClose();
    board.execute('context.hide()');
	board.execute('board.active=false');
    board.execute('board.outside=false');
	board.execute("board.selectFastSlot=false");
    global.boardOpen = false;

    if (global.openOutType != -1) {
        mp.events.callRemote('closeInventory');
        global.openOutType = -1;
    }
}
// // //
// 0 - Open
// 1 - Close
// 2 - Statistics data
// 3 - Inventory data
// 4 - Outside data
// 5 - Outside on/off
// // //
var last
mp.events.add('board', (act, data, index, to) => {
    if (board === null)
        global.board = mp.browsers.new('package://cef/board.html');
    //mp.gui.chat.push(`act: ${act} | data: ${data}`);

	switch(act){
		case 0:
			openBoard();
			break;
        case 1:
			closeBoard();
			break;
        case 2:
			stats.execute(`tablet.stats=(${data})`);
			break;
		case 3:
			board.execute(`board.itemsSet(${index}, ${data})`);
			break;
		case 4:
			board.execute(`board.outSet(${data})`);
			break;
		case 5:
            board.execute(`board.outside=${data}`);
            global.openOutType = 0;
			break;
        case 6:
            board.execute(`board.itemUpd(${index},${data}, ${to})`);
        	break;
        case 11:
            global.openOutType = -1;
            closeBoard();
        	break;
	}
});



mp.events.add('boardCB', (act, type, index) => {
	if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();
	switch(act){
		case 1:
		mp.events.callRemote('Inventory', type, index, 'use');
		break;
		case 2:
		mp.events.callRemote('Inventory', type, index, 'transfer');
		break;
		case 3:
		mp.events.callRemote('Inventory', type, index, 'take');
		break;
		case 4:
		mp.events.callRemote('Inventory', type, index, 'drop');
		break;
	}
});

mp.events.add("useFastSlot", (e, a, o) => {
	(new Date).getTime() - global.lastCheck < 100 || (global.lastCheck = (new Date).getTime(), bindSlot = a > 0 ? a : o, a > 0 ? mp.events.call("bindSlotKey", e, a, !0) : o > 0 && mp.events.call("bindSlotKey", e, o, false))
});

mp.events.add("bindSlotKey", (e, a, o) => {
   let key;
   1 == a ? key = Keys.VK_1 : 2 == a ? key = Keys.VK_2 : 3 == a ? key = Keys.VK_3 : 4 == a ? key = Keys.VK_4 : 5 == a && (key = Keys.VK_5), o ? mp.keys.bind(key, false, (function() {
	   !loggedin || chatActive || (new Date).getTime() - global.lastCheck < 500 || global.menuOpened || mp.gui.cursor.visible || (mp.events.callRemote("UseFastSlot", e), global.lastCheck = (new Date).getTime())
   })) : mp.keys.unbind(key, false)
});

function getKey(index) {
   let key;
   switch (index)
   {
	   case 0:
		   key = Keys.VK_1
		   break;
	   case 1:
		   key = Keys.VK_2
		   break;
	   case 2:
		   key = Keys.VK_3
		   break;
	   case 3:
		   key = Keys.VK_4
		   break;
	   case 4:
		   key = Keys.VK_5
		   break;
   }
   return key;
}

var rebinds = [-1,-1,-1,-1,-1]

mp.events.add("bind", (slot, index) => {
   let key = getKey(index); 
   rebinds[index] = slot;
   var func = function() {
	   match || !loggedin || chatActive || (new Date).getTime() - global.lastCheck < 500 || global.menuOpened || mp.gui.cursor.visible || (mp.events.callRemote("UseFastSlot", rebinds[index]), global.lastCheck = (new Date).getTime())
   };
   mp.keys.bind(key, false, func);
});

mp.events.add("unbind", (index) => {
   let key = getKey(index);  
   rebinds[index] = -1;
   mp.keys.unbind(key, false);

});

// // //
mp.events.add("playerQuit", (player, exitType, reason) => {
    if (board !== null) {
        if (player.name === localplayer.name) {
            board.destroy();
            board = null;
        }
    }
});
}ᖺÕ