{
let trasherGame;
var trasherGameWindow = null;
var trasherGameOpened = false;
mp.events.add('TrashCollector.StartGame', (data) => {
    if (trasherGame == null) {
        trasherGame = mp.browsers.new('http://package/systems/jobs/trasher/FRONT/trasherGame.html');
        trasherGame.name = 'nexusbrowser';
    }
    var jsonTrasher = JSON.parse(data);
    trasherGame.execute(`trasherGame.locale='${global.Language}'`);
    trasherGame.execute(`trasherGame.timeTotal=${jsonTrasher["time"]}`);
    trasherGame.execute(`trasherGame.itemsTotal=${jsonTrasher["items"]}`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
});
mp.events.add('closeTrasherGame', (sucsess) => {
    global.menuOpened = false;
    mp.gui.cursor.visible = false;
    trasherGame.destroy();
    trasherGame = null;
	NexusEvent.callRemote('TrashCollector.EndGame',sucsess)
});
}