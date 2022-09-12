{
var jailCef = null;
var inJail = false;

mp.events.add("client:playerEnterJail", (reason) => {
	if(inJail) return;
	inJail = true;
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, true);
	jailCef = mp.browsers.new("package://jail/jail.html");
	//Primero limpiamos el contenido
	jailCef.execute(`document.getElementById("text").innerHTML = "";`)
	//Luego escribimos
	jailCef.execute(`document.getElementById("text").innerHTML = "${reason}";`)
	mp.game.ui.displayRadar(false);
  	mp.game.ui.displayHud(false);
  	mp.gui.chat.show(false);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 300);
});


mp.events.add("client:playerExitJail", () => {
	inJail = false;
	mp.game.ui.displayRadar(true);
  	mp.game.ui.displayHud(true);
	mp.gui.chat.show(true);
	if(jailCef) jailCef.destroy();
	mp.events.callRemote('respawnPlayer');
	mp.gui.cursor.show(false, false);
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, false);
});
}