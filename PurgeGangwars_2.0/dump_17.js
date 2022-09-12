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
var hudAlpha = require('/cliente/index.js');

const menuArena = new Menu("Arenas menu", "Arenas", new Point(1450, 250));

	menuArena.AddItem(new UIMenuItem(
		"Arena REVOLVER",
		"",
	));
	// menuArena.AddItem(new UIMenuItem(
	// 	"Arena BRAWL",
	// 	""
	// ));
	menuArena.AddItem(new UIMenuItem(
		"Arena Headshot",
		""
	));
	menuArena.AddItem(new UIMenuItem(
		"Arena Braddock",
		""
	));
	menuArena.AddItem(new UIMenuItem(
		"Arena Chili",
		""
	));
	menuArena.AddItem(new UIMenuItem(
		"FREEROAM",
		""
	));
	menuArena.ItemSelect.on((item, index) => {
		let player = mp.players.local;
			switch (index) {
				case 0:
					mp.events.callRemote('entrarArenaRevolver');
					menuArena.Close();
					break;
				case 1:
					mp.events.callRemote('entrarArenaHeadshot');
					menuArena.Close();
					break;
				case 2:
					mp.events.callRemote('entrarArenaBraddock');
					menuArena.Close();
					break;
				case 3:
					mp.events.callRemote('entrarArenaChili');
					menuArena.Close();
					break;
				case 4:
					mp.events.callRemote('joinFreeRoam');
					menuArena.Close();
					break;

			};
	});	




//Player Menu
const menuJugador = new Menu("Player menu", "Options", new Point(1450, 250));
	menuJugador.AddItem(new UIMenuItem(
		"Change teams",
		"Join another team!"
	));
	menuJugador.AddItem(new UIMenuItem(
		"Arenas",
		"Join an arena!"
	));	
	menuJugador.AddItem(new UIMenuItem(
		"Animations",
		"Choose an animation!"
	));
	menuJugador.AddItem(new UIMenuItem(
		"Cancel your animation.",
		""
	));
	menuJugador.AddItem(new UIMenuItem(
		"Commit suicide",
		"You will die in 5 seconds."
	));
	menuJugador.ItemSelect.on((item, index) => {
		let player = mp.players.local;
			switch (index) {
				case 0:
					if (mp.players.local.getHealth() < 0) return;
					mp.events.call('cerrarMenuJugador');
					mp.events.call('openTeamSelector');
					break;
				case 1:
					menuJugador.Close();
					menuArena.Open();	
					break;					
				case 2:
					menuJugador.Close();
					menuAnimaciones.Open();
					break;
				case 3:
					mp.events.call('cerrarMenuJugador');
					if (player.vehicle) return;
					mp.events.callRemote('stopAnimation');					
					break;
				case 4:
					mp.events.call('cerrarMenuJugador');
					setTimeout(function(){
						mp.events.callRemote('killPlayer');
					},5000)		
			};
	});
//Submenu Animaciones.

const menuAnimaciones = new Menu("Animations", "Choose an animation!", new Point(1450, 250));

	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 1",
		""
	));
	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 2",
		""
	));
	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 3",
		""
	));
	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 4",
		""
	));
	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 5",
		""
	));
	menuAnimaciones.AddItem(new UIMenuItem(
		"Sign 6",
		""
	));	
	menuAnimaciones.ItemSelect.on((item, index) => {
		let player = mp.players.local;
			switch (index) {
				case 0:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign1');
					break;
				case 1:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign2');	
					break;
				case 2:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign3');	
					break;
				case 3:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign4');			
					break;
				case 4:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign5');
					break;
				case 5:
					if (player.vehicle) return;
					mp.events.callRemote('playGangSign6');
					break;
			};
	});



mp.events.add("cerrarMenuJugador", () => {
	if (menuJugador.Visible) menuJugador.Close();
});

mp.events.add("cerrarMenuAnimaciones", () => {
	menuAnimaciones.Close();
});

mp.events.add("cerrarMenuOpciones", () => {
	menuOpciones.Close();
});

mp.keys.bind(0x71, false, () => {
	if (menuAnimaciones.Visible || mp.players.local.getVariable("freeroam")) return;
	if (!menuJugador.Visible) {
		menuJugador.Open();
	}
});


mp.keys.bind(0x72, false, () => {
    if (menuAnimaciones.Visible || !mp.players.local.getVariable("freeroam")) return;
	if (!menuArena.Visible) {
		menuArena.Open();
	}
})

}