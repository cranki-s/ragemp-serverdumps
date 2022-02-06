{
const spmenu = new global.NativeMenu("Spectate", "Spectate Menu", new global.Point(30, 500)); // Мы не выключаем чат, чтобы видеть переписку тех, за кем следим, поэтому двигаем саму табличку вниз
spmenu.Close();
spmenu.AddItem(new UIMenuListItem("Spectate", "Переключение игрока по ID",  new ItemsCollection(["Previous", "Next"])));
spmenu.AddItem(new UIMenuItem("Refresh", "Обновить слежение за текущим игроком"));
spmenu.AddItem(new UIMenuItem("Unspectate", "Выключить режим наблюдателя"));


mp.events.add("spmode", (target, toggle) => {
	global.localplayer.freezePosition(toggle);
	if(toggle) {
		if (target && mp.players.exists(target)) {
			global.sptarget = target;
			global.spectating = true;
			global.localplayer.attachTo(target.handle,  -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
			spmenu.Open();
		} else mp.events.callRemote("UnSpectate");
	} else {
		global.sptarget = null;
		global.localplayer.detach(true, true);
		global.spectating = false;
		spmenu.Close();
	}
});

spmenu.ItemSelect.on(item => {
	if (item instanceof UIMenuListItem) {
		if(item.Text == "Spectate") {
			if(item.Index == 0) mp.events.callRemote("SpectateSelect", false);
			else mp.events.callRemote("SpectateSelect", true);
		}
	} else if (item instanceof UIMenuItem) {
		if(item.Text == "Refresh") mp.events.call("spmode", global.sptarget, true);
		else if(item.Text == "Unspectate") mp.events.callRemote("UnSpectate");
	}
});

spmenu.MenuClose.on(() => {
	if(global.spectating) spmenu.Open();
});

}