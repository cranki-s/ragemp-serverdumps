{
﻿global.openOutType = -1;
global.boardOpen = false;
let fracstock = -1;
mp.keys.bind(Keys.VK_I, false, function () {
	//NexusEvent.callRemote('console',localplayer.getVariable('InDeath') == true);
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;
    if (global.boardOpen)
        mp.events.call('board', 1);
    else
	{
		NexusEvent.callRemote('openInventory');
        mp.events.call('board', 0);		
	}
});

mp.keys.bind(Keys.VK_ESCAPE, false, function() {
    if (global.boardOpen) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('board', 1);
    }
});

function openBoard() {
	if(global.board == null) return;
//	NexusEvent.callRemote('console',global.menuCheck())
	if (global.menuCheck()) return;
    menuOpen();
	global.board.execute(`inventory.locale='${global.Language}'`);
	global.board.execute('inventory.active=true');
	mp.events.call('startScreenEffect', "MenuMGHeistIn", 1, true);
	mp.gui.cursor.visible = true;
	global.boardOpen = true;
}

function closeBoard() {
	if(global.board == null) return;
	mp.events.call('board', 8, false);
    mp.events.call('board', 13, false);
    menuClose();
	global.board.execute('inventory.active=false');
	mp.gui.cursor.visible = false;
    global.boardOpen = false;   
    mp.events.call('stopScreenEffect', "MenuMGHeistIn");
    global.board.execute(`inventory.contextMenuHandler()`);
    // Очищаем айтемы для трейда
    global.board.execute(`inventory.tradeReset()`);
    NexusEvent.callRemote('closeInventory');
}

mp.events.add('board', (act, data, slotsBag, slotsTrunk, slotsOther, addon) => {
    if (global.board == null) {
		global.board = mp.browsers.new('http://package/systems/player/inventory/FRONT/inventory.html');
		global.board.name = 'nexusbrowser';
		global.board.execute(`inventory.setKey(${JSON.stringify(global.cdnKey)})`);
	}
	switch(act) {
		case 0:
			openBoard();
			break;
        case 1:
			closeBoard();
			break;
        case 2:
			global.board.execute(`inventory.statsUpdate(${data})`);
			break;
		case 3:		   
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, 10, 13, 4, 12, 12, 10, 10, 'default')`);
			break;
		case 4:		   
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, 10, 13, 4, 12, 12, 10, 10, 'weapon')`);
			break;	
		case 5:		   
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, ${slotsBag}, 13, 4, 12, 12, 10, 10, 'bag')`);
			break;
		case 6:
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, 10, 13, 4, ${slotsTrunk}, 12, 10, 10, 'trunk')`);
			break;
		case 7:		   
			global.board.execute(`inventory.bagHandler(${data})`);
			break;
		case 8:		   
			global.board.execute(`inventory.trunkHandler(${data})`);
			break;
		case 9:		   
			global.board.execute(`inventory.statsBagUpdate(${data})`);
			break;	
		case 10:		   
			global.board.execute(`inventory.statsTrunkUpdate(${data})`);
			break;
		case 11: // Шкаф
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, 10, 13, 4, 12, ${slotsOther}, 10, 10, 'wardrobe', '${addon}')`);
			break;
        case 12: // Склад
			global.board.execute(`inventory.factoryUpdate(Object.values(${data}), 25, 10, 13, 4, 12, ${slotsOther}, 10, 10, 'warehouse', '${addon}')`);
            break;
        case 13:
            global.board.execute(`inventory.otherHandler(${data})`);
            break;
        case 14:
            global.board.execute(`inventory.statsOtherUpdate(${data})`);
            break;
		case 15:
			global.board.execute(`inventory.userInfo(${data})`);
			break;
        case 16:
            // Заполняет ячейки предметов которые отдает другой игрок			
            global.board.execute(`inventory.factoryUpdate(${data}, 25, 10, 13, 4, 12, 12, 10, 10, 'trade', 'take')`);
			global.board.execute(`inventory.$refs.inventoryTradeRef.checkboxReady = false`); // Так же забираем галочку готовности так как обновлен список айтемов
			global.board.execute(`inventory.$refs.inventoryTradeRef.inputMoneyTradeStatus = true`); // Так же активируем инпут
			global.board.execute(`inventory.$refs.inventoryTradeRef.readyHandler('first', false)`);
            break;
        case 17:
            // Отвечает за стрелку (Готов ли диругой игрок)
            // data.type accept -> first/second
            // data.action accept -> true/false
			data = JSON.parse(data);
            global.board.execute(`inventory.$refs.inventoryTradeRef.readyHandler('${data.type}', ${data.action})`);
            global.board.execute(`inventory.$refs.inventoryTradeRef.moneyGetAfterTrade = ${data.moneyGet}`);
            break;
        case 18:
            global.board.execute(`inventory.tradeHandler(${slotsBag}, '${data}')`);
			global.board.execute(`inventory.factoryUpdate(Object.values([]), 25, 10, 13, 4, 12, 12, 10, 10, 'trade', 'take')`);
			global.board.execute(`inventory.factoryUpdate(Object.values([]), 25, 10, 13, 4, 12, 12, 10, 10, 'trade', 'give')`);
			global.board.execute(`inventory.$refs.inventoryTradeRef.checkboxReady = false`);
            break;
		case 19:
            global.board.execute(`inventory.$refs.inventoryTradeRef.playerMoney = ${data}`);
            break;	
	}
});

 mp.events.add('console', (data) => {
 	NexusEvent.callRemote("console", data);
 });

mp.events.add('boardMove', (idItem, idSlot, newSlot, action, count) => {
	
	if (!count) count = -1;
	
	switch (action) {
	case 1:
		NexusEvent.callRemote('MoveSlots', idItem, idSlot, newSlot, count); // Перемещение в инвентаре
	    break;
	case 2:
		NexusEvent.callRemote('Inventory', 0, idSlot, 'use', newSlot); // Не ебу
		break;
	case 3:
		NexusEvent.callRemote('Perstoslot', idItem, idSlot, newSlot); // С персонажа в инвентарь
		break;		
	case 4:	    
		NexusEvent.callRemote('dropitem', idSlot, newSlot, count); // Дроп
		break;
	case 5:
		NexusEvent.callRemote('MoveSlotsBag', idItem, idSlot, newSlot, count); // Перемещение айтемов в сумке
		break;
	case 6:	    
		NexusEvent.callRemote('MoveFromWeapon', idItem, idSlot, newSlot); // Перемещение с быстрых слотов
		break;
	case 7:	    
		NexusEvent.callRemote('MoveToWeapon', idItem, idSlot, newSlot); // Перемещение в быстрые слоты
		break;			
	case 8:	    
		NexusEvent.callRemote('MoveFromBag', idItem, idSlot, newSlot); // Перемещение с сумки
		break;
	case 9:	    
		NexusEvent.callRemote('MoveToTrunk', idItem, idSlot, newSlot); // Перемещение в багажник
		break;	
	case 10:	    
		NexusEvent.callRemote('MoveFromTrunk', idItem, idSlot, newSlot); // Перемещение с багажника
		break;
	case 11:	    
		NexusEvent.callRemote('MoveSlotsTrunk', idItem, idSlot, newSlot, count); // Перемещение айтемов в багажнике
		break;
	case 12:	    
		NexusEvent.callRemote('MoveToBag', idItem, idSlot, newSlot); // Перемещение в сумку
		break;
	case 13:
		NexusEvent.callRemote('MoveToOther', idItem, idSlot, newSlot); // Перемещение айтемов в шкаф/багажник
		break;
	case 14:
		NexusEvent.callRemote('MoveFromOther', idItem, idSlot, newSlot); // Перемещение с шкафа/склада
		break;
	case 15:
		NexusEvent.callRemote('MoveSlotsOther', idItem, idSlot, newSlot, count); // Перемещение айтемов в шкафу/складу
		break;
	case 16:
		NexusEvent.callRemote('MoveToTrade', idItem); // Перемещение айтемов в трейд (Должно обновлять айтемы у другого чела) то есть должен вызивать 16 кейс с addon -> take
		break;
	case 17:
		NexusEvent.callRemote('MoveFromTrade', idItem); // Перемещение с трейда, для того чтобы изменились айтемы у другого игрока, так же 16 кейс addon -> take
		break;
    case 18:
        // idItem - прилетает статус true/false
        // idSlot - деньги который передает игрок
        NexusEvent.callRemote('ReadyStatus', idItem, idSlot);
        break;
	case 19:
		NexusEvent.callRemote('AcceptTrade', idItem);
		break;
	case 20:
		NexusEvent.callRemote('MoveSlotsWeapon', idItem, idSlot, newSlot); // Перемещение айтемов в быстрых слотах
		break;
	}
});

mp.events.add('boardClose', () => {
	closeBoard();
});

mp.events.add("playerQuit", (player, exitType, reason) => {
    if (global.board) {
        if (player.name === localplayer.name) {
            global.board.destroy();
            global.board = null;
        }
    }
});
}