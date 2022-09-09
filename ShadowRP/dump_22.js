{

const spmenu = new Menu("Spectate", "Spectate Menu", new Point(30, 500)); // Мы не выключаем чат, чтобы видеть переписку тех, за кем следим, поэтому двигаем саму табличку вниз
spmenu.Close();
spmenu.AddItem(new UIMenuListItem("Spectate", "Cambiar jugador por ID",  new ItemsCollection(["Previous", "Next"])));
spmenu.AddItem(new UIMenuItem("Refresh", "Actualización de seguimiento del jugador actual"));
spmenu.AddItem(new UIMenuItem("Unspectate", "Desactiva el modo Spectate"));


mp.events.add("spmode", (target, toggle) => {
	localplayer.freezePosition(toggle);
	if(toggle) {
		if (target && mp.players.exists(target)) {
			sptarget = target;
			spectating = true;
			localplayer.attachTo(target.handle,  -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
			spmenu.Open();
		} else mp.events.callRemote("UnSpectate");
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
			if(item.Index == 0) mp.events.callRemote("SpectateSelect", false);
			else mp.events.callRemote("SpectateSelect", true);
		}
	} else if (item instanceof UIMenuItem) {
		if(item.Text == "Refresh") mp.events.call("spmode", sptarget, true);
		else if(item.Text == "Unspectate") mp.events.callRemote("UnSpectate");
	}
});

spmenu.MenuClose.on(() => {
	if(spectating) spmenu.Open();
});

}