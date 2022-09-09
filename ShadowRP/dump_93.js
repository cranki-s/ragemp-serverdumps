{
const NativeUI = require("src/libs/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;

var xmrCEF;
var xmrInterval;

mp.events.add("LoadXMR", (stations) => {
	
	
	if(!mp.browsers.exists(xmrCEF)) {
		xmrCEF = mp.browsers.new("http://package/browser/modules/xmr/cef/xmr.html");
	}
	
	if(!stations || stations == "undefined") return;
	
	try {
		stations = JSON.parse(stations);
	}
	catch (e) {
        mp.game.graphics.notify('RE:' + e.toString());
    }
	
	xmrCEF.execute("RemoveAllRadios();");
	
	for(let i = 0; i < stations.length; i++) {
		if(stations[i]) xmrCEF.execute("AddRadio("+i+", "+stations[i].x+", "+stations[i].y+", "+stations[i].z+", `"+stations[i].stream+"`, `"+stations[i].carid+"`);");
	}
	
	if(xmrInterval) clearInterval(xmrInterval);
	xmrInterval = setInterval(function() {
		let vid = 0;
		if(mp.players.local.vehicle) 
		{
			if (mp.players.local.vehicle.getVariable('vehicle_radio_id') != null)
			{
				vid = mp.players.local.vehicle.getVariable('vehicle_radio_id');
				
			}
		}
		
		let currMaxVol = 0.5;
		if(!mp.storage.data) mp.storage.data = {};
		mp.storage.flush();
		xmrCEF.execute("Update("+mp.players.local.position.x+", "+mp.players.local.position.y+", "+mp.players.local.position.z+", "+vid+", "+currMaxVol+");");
		//mp.gui.chat.push("Update("+mp.players.local.position.x+", "+mp.players.local.position.y+", "+mp.players.local.position.z+", "+vid+", "+currMaxVol+");");
	}, 100);
});

mp.events.add("RemoveRadio", (id) => {
	if(!mp.browsers.exists(xmrCEF)) {
		xmrCEF = mp.browsers.new("http://package/browser/modules/xmr/cef/xmr.html");
	}
	
	xmrCEF.execute("RemoveRadio("+id+");");
});

mp.events.add("AddRadio", (id, x, y, z, stream, carid) => {
	if(!mp.browsers.exists(xmrCEF)) {
		xmrCEF = mp.browsers.new("http://package/browser/modules/xmr/cef/xmr.html");
	}
	
	if(!stream) stream = "null";
	if(carid == 0) carid = 0;	
	xmrCEF.execute("AddRadio("+id+", "+x+", "+y+", "+z+", `"+stream+"`, "+carid+");");
	//mp.gui.chat.push("AddRadio("+id+", "+x+", "+y+", "+z+", `"+stream+"`, "+carid+");");

});

mp.events.add("EditRadio", (id, stream) => {
	if(!mp.browsers.exists(xmrCEF)) {
		xmrCEF = mp.browsers.new("http://package/browser/modules/xmr/cef/xmr.html");
	}
	
	xmrCEF.execute("ChangeStream("+id+", '"+stream+"');");
	
});

mp.events.add("render", () => {
	if(mp.players.local.vehicle) {
		mp.game.invoke("0x1B9C0099CB942AC6", mp.players.local.vehicle.handle, "OFF");
	}
});


// GUI

mp.events.add("SetStation", (stations) => {
	if(!stations || stations == "undefined") return;
	stations = JSON.parse(stations);
	if(!stations) {
		mp.gui.chat.push("There was an error getting stations.");
	} else {
		let categories = [];
		for(let i = 0; i < stations.length; i++) {
			if(!categories.includes(stations[i].Genre)) categories.push(stations[i].Genre);
		}
		
		let ui = new Menu("Set XMR Station", "Select a genre", new Point(50, screenRes.y * 0.3));
		let turnoff = new UIMenuItem("Turn Off", "Turn off the radio.");
		ui.AddItem(turnoff);
		
		for(let i = 0; i < categories.length; i++) {
			let btn = new UIMenuItem(categories[i], "View this genre");
			ui.AddItem(btn);
		}
		
		let cancel = new UIMenuItem("Cancel", "Close this menu.");
		
		ui.AddItem(cancel);
		
		ui.ItemSelect.on((item) => {
			if(item == turnoff) {
				mp.events.callRemote("TurnOffRadio");
			} else if(item == cancel) {
				ui.Close();
				ui = null;
			} else {
				ui.Close();
				let selection = new Menu("Set XMR Station", "Select a genre", new Point(50, screenRes.y * 0.3));
				for(let j = 0; j < stations.length; j++) {
					if(stations[j].Genre == item.Text) {
						let sel = new UIMenuItem(stations[j].Name, "View this genre");
						selection.AddItem(sel);
					}
				}
				let back = new UIMenuItem("Back", "Go back to genres");
				selection.AddItem(back);
				
				selection.ItemSelect.on((itm) => {
					if(itm == back) {
						selection.Close();
						selection = null;
						ui.Open();
					} else {
						mp.events.callRemote("SelectionRadioStationByName", itm.Text);
						mp.gui.chat.push("SelectionRadioStationByName", itm.Text);
					}
				});
			}
		})
	}
});
}