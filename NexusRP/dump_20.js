{

const spmenu = new Menu("Spectate", "Spectate Menu", new Point(30, 500)); // Мы не выключаем чат, чтобы видеть переписку тех, за кем следим, поэтому двигаем саму табличку вниз
spmenu.Close();
spmenu.AddItem(new UIMenuListItem("Spectate", "Переключение игрока по ID",  new ItemsCollection(["Previous", "Next"])));
spmenu.AddItem(new UIMenuItem("Refresh", "Обновить слежение за текущим игроком"));
spmenu.AddItem(new UIMenuItem("Unspectate", "Выключить режим наблюдателя"));


mp.events.add("spmode", (target, toggle) => {
	localplayer.freezePosition(toggle);
	if(toggle) {
		if (target && mp.players.exists(target)) {
			sptarget = target;
			spectating = true;
			localplayer.attachTo(target.handle,  -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
			spmenu.Open();
		} else Nexus.callRemote("UnSpectate");
	} else {
		sptarget = null;
		localplayer.detach(true, true);
		spectating = false;
		spmenu.Close();
	}
});
spmenu.ItemSelect.on(item => {
	if (item instanceof UIMenuListItem) {
		if(item.Text == "Spectate") {
			if(item.Index == 0) Nexus.callRemote("SpectateSelect", false);
			else Nexus.callRemote("SpectateSelect", true);
		}
	} else if (item instanceof UIMenuItem) {
		if(item.Text == "Refresh") mp.events.call("spmode", sptarget, true);
		else if(item.Text == "Unspectate") Nexus.callRemote("UnSpectate");
	}
});

spmenu.MenuClose.on(() => {
	if(spectating) spmenu.Open();
});

}