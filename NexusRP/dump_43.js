{
global.SellFishMenu;
mp.events.add('SellFishMenu:Create', () => {
	if (global.SellFishMenu == null) {
		global.SellFishMenu = mp.browsers.new('http://package/systems/jobs/fishSell/FRONT/sellfish.html');
		global.SellFishMenu.name = 'nexusbrowser';
		global.SellFishMenu.execute(`sellfish.locale='${global.Language}'`)
	}
});
mp.events.add('SellFishMenu:Execute', (data) => {
	if (global.SellFishMenu != null) {
		global.SellFishMenu.execute(data);
	}
});
mp.events.add('SellFishMenu:Destroy', () => {
	if (global.SellFishMenu != null) {
		global.SellFishMenu.destroy();
		global.SellFishMenu = null;
	}
});
mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (global.SellFishMenu != null) {
		mp.game.ui.setPauseMenuActive(false);
		mp.events.call('SellFishMenu:Close');
	}
});

}