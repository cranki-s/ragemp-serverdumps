{
var inventoryCEF = null;

mp.keys.bind(0x73, false, function () { // F4 Key
	CloseInventorySystem()
});

mp.keys.bind(0x1B, false, function () { // Esc Key
	CloseInventorySystem()
});

mp.events.add('OPEN_CEF_INVENTORY', () => {
	if (!mp.browsers.exists(inventoryCEF))
	{
		inventoryCEF = mp.browsers.new("package://gtalife/inventory/ui/index.html");
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the inventory.");	
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('CLOSE_CEF_INVENTORY', () => {
    CloseInventorySystem();
});

function CloseInventorySystem(){
	if (mp.browsers.exists(inventoryCEF)) {
        mp.gui.cursor.show(false, false);
        inventoryCEF.destroy();
		mp.events.callRemote('Inventory::closed');
    }
}

var data = "";
mp.events.add('initializeInventoryPlayer', (data_recv, piece, load = false) => {
	if(piece == 0)
		data = "";

	data += data_recv;
	if(load)
		mp.events.call('loadInventoryPlayer');
});

mp.events.add('loadInventoryPlayer', () => {
	if (mp.browsers.exists(inventoryCEF)) {
		data = htmlEscapeData(data);
		//mp.gui.chat.push(data);
		inventoryCEF.execute(`trigger('loadInventoryPlayer', '${data}')`);
	}
});

mp.events.add('Inventory::loadClothingData', (data) => {
	if (mp.browsers.exists(inventoryCEF)) {
		//mp.gui.chat.push(data);
		inventoryCEF.execute(`trigger('loadClothingData', '${data}')`);
	}
});

mp.events.add('Inventory::loadWeaponData', (data) => {
	if (mp.browsers.exists(inventoryCEF)) {
		//mp.gui.chat.push(data);
		inventoryCEF.execute(`trigger('loadWeaponData', '${data}')`);
	}
});

mp.events.add('fetchClosestPlayers', (type) => {
	mp.events.callRemote('Inventory::fetchClosestPlayers', type);
});

mp.events.add('Inventory::sendClosestPlayers', (data) => {
	if (mp.browsers.exists(inventoryCEF)) {
		//mp.gui.chat.push(data);
		inventoryCEF.execute(`trigger('setClosestPlayers', '${data}')`);
	}
});

mp.events.add('Inventory::sendClosestPlayersShow', (data) => {
	if (mp.browsers.exists(inventoryCEF)) {
		//mp.gui.chat.push(data);
		inventoryCEF.execute(`trigger('setClosestPlayersShow', '${data}')`);
	}
});

mp.events.add('Inventory::setInactive', () => {
	if (mp.browsers.exists(inventoryCEF)) {
		inventoryCEF.execute(`trigger('setInactive', '{}')`);
	}
});

mp.events.add('inventoryDragDrop', e => {
	e = JSON.parse(e);
	//mp.gui.chat.push("e: "+JSON.stringify(e));
	mp.events.callRemote('Inventory::dragDrop', e.fromSecondary, e.toSecondary, e.toIndex, e.oldIndex, e.itemId, e.amount);
});

mp.events.add('showHideClothing', type => {
	mp.events.callRemote('Inventory::showHideClothing', type);
});

mp.events.add('giveItem', data => {
	data = JSON.parse(data);
	//mp.gui.chat.push(data);
	mp.events.callRemote('Inventory::giveItem', data.itemId, data.quantity, data.charId);
});

mp.events.add('showItem', data => {
	data = JSON.parse(data);
	//mp.gui.chat.push(data);
	mp.events.callRemote('Inventory::showItem', data.itemId, data.charId);
});

mp.events.add('dropItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::dropItem', data.itemId, data.quantity);
});

mp.events.add('stashItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::stashItem', data.itemId, data.amount, data.stashName);
});

mp.events.add('trashItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::trashItem', data.itemId, data.amount);
});

mp.events.add('useItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::useItem', data.itemId, data.secondary);
})

mp.events.add('secondUseItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::secondUseItem', data.itemId, data.secondary);
})

mp.events.add('thirdUseItem', data => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::thirdUseItem', data.itemId, data.secondary);
})

mp.events.add('inspectItem', itemId => {
	mp.events.callRemote('Inventory::inspectItem', itemId);
})

mp.events.add('inspectWeapon', index => {
	mp.events.callRemote('Inventory::inspectWeapon', index);
})

mp.events.add('unequipWeapon', index => {
	mp.events.callRemote('Inventory::unequipWeapon', index);
})

mp.events.add('detachComponent', (data) => {
	data = JSON.parse(data);
	mp.events.callRemote('Inventory::detachComponent', data.index, data.compindex);
})

mp.events.add('closeContainer', () => {
	mp.events.callRemote('Inventory::closedContainer');
})


function htmlEscapeData(str) {
    return String(str).replace(/'/g, "\\'");//.replace(/\\\\\\"/g, "\\\\\"");
}

}