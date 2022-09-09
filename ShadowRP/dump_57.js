{
﻿let elec = null;
let elecopened = false;
mp.gui.cursor.visible = false;
mp.gui.chat.show(true);

mp.events.add('addcandidate', function (Name) {
	try {
		elec.AddItem(new UIMenuItem(Name, "Кандидат"));
		elecopened = true;
		elec.Open();
		mp.gui.cursor.visible = false;
		mp.gui.chat.show(false);
	} catch { }
});

mp.events.add('openelem', (firstname) => {
	try {
		if(elec == null) {
			elec = new Menu("ВЫБОРЫ", "Numero de candidato: ", new Point(50, 50));
			elec.AddItem(new UIMenuItem(firstname, "Кандидат"));
			elec.Close();
			elec.ItemSelect.on(item => {
				if(new Date().getTime() - global.lastCheck < 100) return; 
				global.lastCheck = new Date().getTime();
				if (item instanceof UIMenuItem) {
					mp.events.callRemote("choosedelec", item.Text);
					mp.gui.cursor.visible = false;
					mp.gui.chat.show(true);
					elecopened = false;
					elec.Close();
				}
			});
			elec.MenuClose.on(() => {
				if(elecopened) elec.Open();
			});
		}
	} catch { }
});
}