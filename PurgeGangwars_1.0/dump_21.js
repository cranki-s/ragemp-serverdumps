{
var jugadorEnDuelo = require('/cliente/index.js');
var dueloAlpha;
var totalTime = 5;
function empezarCuentaAtras() {
mp.game.ui.messages.showShard(`${totalTime - 1}`, "", "1", "0", time = 1000);
mp.game.audio.playSoundFrontend(1, "5s_To_Event_Start_Countdown", "GTAO_FM_Events_Soundset", true);
if(totalTime == 1){
mp.events.call('terminarCuentaAtras');
}else{
totalTime-=1;
setTimeout(function(){ empezarCuentaAtras(); }, 1000);
}
};
var dueloTimer;
let player = mp.players.local;
function startTimerDuelo(){
	if (player.dimension == dimensionDuelo) {
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("Has salido del area del duelo", `Vuelve a la ~y~zona~s~, tienes 5 segundos`, 6, false, false, 3000, false);
	dueloTimer = setTimeout(function(){
		mp.events.callRemote('killDueloPlayer', dimensionDuelo);
	}, 5000);
	}
};
function stopTimerDuelo(){
	clearTimeout(dueloTimer);
};

mp.events.add("playerEnterColshape", (shape) => {
	if (shape === colshapeDuelo) {
		stopTimerDuelo();
	}
});

mp.events.add("playerExitColshape", (shape) => {
	if (shape === colshapeDuelo) {
		startTimerDuelo();
	}	
});


mp.events.add('empezarCuentaAtras', () => {
	//Freeze the player.
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, true);
	totalTime = 6;
	empezarCuentaAtras();
});

mp.events.add('terminarCuentaAtras', () => {
	//Unfreeze the player.
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, false);
	mp.game.ui.messages.showShard(`GO`, "", "1", "0", time = 1000);
	mp.game.audio.playSoundFrontend(1, "Event_Start_Text", "GTAO_FM_Events_Soundset", true);
	setTimeout(function(){ mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, false); }, 500);
});
var colshapeDuelo;
var dimensionDuelo;
mp.events.add('cliente:jugadorEnDuelo', (dimension) => {
	dimensionDuelo = dimension;
	jugadorEnDuelo = true;
	dueloAlpha = 255;
	colshapeDuelo = mp.colshapes.newSphere(1023.1210327148438, -144.4520263671875, 80.26921081542969, 29, dimension);
	mp.markers.new(1, new mp.Vector3(1023.1210327148438, -144.4520263671875, 70), 57,
	{
	    color: [255, 255, 255, 155],
	    visible: true,
	    dimension: dimension
	});
});
mp.events.add('cliente:jugadorNoEnDuelo', () => {
	stopTimerDuelo();
	jugadorEnDuelo = false;
	dueloAlpha = 0;
});

var jugadorPuntos = 0;
var contrincantePuntos = 0;
var nombreContrincante;
mp.events.add('estadisticasDuelo', (puntosdeljugador, puntosdelcontrincante, nombredelcontrincante) => {
	mp.gui.chat.push(`Estadisticas recibidas: puntosdeljugador${puntosdeljugador}, puntosdelcontrincante${puntosdelcontrincante}`);
	if (puntosdeljugador == null) {
		jugadorPuntos = 0;
	} else {
		jugadorPuntos = puntosdeljugador;
	}
	if (puntosdelcontrincante == null) {
		contrincantePuntos = 0;
	} else {
		contrincantePuntos = puntosdelcontrincante;
	}
	nombreContrincante = nombredelcontrincante;
});

	mp.events.add('render', (player) => {
	mp.game.graphics.drawText(`Tú => ${jugadorPuntos}/5`, [0.4, 0.04], { 
		font: 0, 
		color: [255, 255, 255, dueloAlpha], 
		scale: [0.5, 0.5], 
		outline: true
	});


	mp.game.graphics.drawText(`${contrincantePuntos}/5 <= ${nombreContrincante}`, [0.6, 0.04], { 
		font: 0, 
		color: [255, 255, 255, dueloAlpha],
		scale: [0.5, 0.5], 
		outline: true
	});
});
}