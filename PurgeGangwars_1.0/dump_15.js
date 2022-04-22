{
const NativeUI = require('/nativeui/index.js');
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
var hudAlpha = require('/cliente/index.js')

mp.events.add("closeCarSelector", () => {
	hudAlpha = 255;
	menuCarspawner.Close();
	mp.gui.chat.show(true);
});
mp.events.add("openCarSelector", () => {
	hudAlpha = 0;
	mp.gui.chat.show(false);
	//mp.events.call("cerrarMenuJugador")
	if (!menuCarspawner.Visible) menuCarspawner.Open();
});
const menuCarspawner = new Menu("", "Choose your vehicle!", new Point(1450, 250), spriteLibrary = "shopui_title_ie_modgarage", spriteName = "shopui_title_ie_modgarage");
	//Tulip
	menuCarspawner.AddItem(new UIMenuItem(
		"calico",
		"Sports Two Seater Car",
	));
	//Sanchez
	menuCarspawner.AddItem(new UIMenuItem(
		"jugular",
		"Sports Four Seat Car"
	));
	//Bison
	menuCarspawner.AddItem(new UIMenuItem(
		"neon",
		"Sports Four Seater Car"
	));
	//Voodoo
	menuCarspawner.AddItem(new UIMenuItem(
		"kamacho",
		"Four Seater Off Road Truck"
	));
	//Sultan Classic (500Kills)
	menuCarspawner.AddItem(new UIMenuItem(
		"toros (500Kills)",
		"4-seater Sports Suv, unlock it at 500 kills."
	));
	//Akluma (1000Kills)
	menuCarspawner.AddItem(new UIMenuItem(
		"hakuchou2 (1000Kills)",
		"Sports bike, unlock it at 1000 kills."
	));	
	//Rebla (1500kills)
	menuCarspawner.AddItem(new UIMenuItem(
		"t20 (1500Kills)",
		"Two Seater Super Car, unlock it at 1500 kills."
	));
	//Toros (3000kills)
	menuCarspawner.AddItem(new UIMenuItem(
		"italirsx (3000Kills)",
		"Two Seater Sports, unlock it at 3000 kills"
	));	
	//novak (3000kills)
	menuCarspawner.AddItem(new UIMenuItem(
		"italigto (3000Kills)",
		"Two Seater Sports, unlock it at 3999 kills"
	));	
	menuCarspawner.ItemSelect.on((item, index) => {
		let player = mp.players.local;
			switch (index) {
				case 0:
					if (player.vehicle) return;
					mp.events.callRemote('calicoSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);					
					break;
				case 1:
					if (player.vehicle) return;
					mp.events.callRemote('jugularSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);					
					break;
				case 2:
					if (player.vehicle) return;
					mp.events.callRemote('neonSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);					
					break;
				case 3:
					if (player.vehicle) return;
					mp.events.callRemote('kamachoSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);								
					break;
				case 4:
					if (player.vehicle) return;
					mp.events.callRemote('torosSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);					
					break;
				case 5:
					if (player.vehicle) return;
					mp.events.callRemote('hakuchou2Selected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);					
					break;					
				case 6:
					if (player.vehicle) return;
					mp.events.callRemote('t20Selected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);						
					break;
				case 7:
					if (player.vehicle) return;
					mp.events.callRemote('italirsxSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);						
					break;
				case 8:
					if (player.vehicle) return;
					mp.events.callRemote('italigtoSelected');
					menuCarspawner.Close();
					mp.gui.chat.show(true);						
					break;					
			};
	});


//Vamos a hacer los coches semi transparentes y que no se choquen al spawnearlos.
mp.events.add('entityStreamIn', (entity) => {
	if(entity.type == 'vehicle') {
		let collisionState = entity.getVariable("vehicle_collision");
		if(collisionState === false) {
			mp.players.forEach(player => {
				player.setNoCollision(entity.handle, false);
			})
			mp.vehicles.forEach(vehicle => {
				vehicle.setNoCollision(entity.handle, false);
			})
			entity.setAlpha(210)
		} else {
			mp.players.forEach(player => {
				player.setNoCollision(entity.handle, true);
			})
			mp.vehicles.forEach(vehicle => {
				vehicle.setNoCollision(entity.handle, true);
			})
			entity.setAlpha(255)
		}
	}
});
mp.events.addDataHandler('vehicle_collision', function (entity, value, oldValue) {
	if(value === false) {
		mp.players.forEach(player => {
			player.setNoCollision(entity.handle, false);
		})
		mp.vehicles.forEach(vehicle => {
			vehicle.setNoCollision(entity.handle, false);
		})
		entity.setAlpha(210)
	} else {
		mp.players.forEach(player => {
			player.setNoCollision(entity.handle, true);
		})
		mp.vehicles.forEach(vehicle => {
			vehicle.setNoCollision(entity.handle, true);
		})
		entity.setAlpha(255)
	}
})
}