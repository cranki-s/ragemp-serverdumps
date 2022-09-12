{
var kills = require('/cliente/index.js');
var deaths = require('/cliente/index.js');
var killstreak = require('/cliente/index.js');
var hudAlpha = require('/cliente/index.js');
var crips = require('/cliente/index.js');
var bloods = require('/cliente/index.js');
var families = require('/cliente/index.js');
var cartelSinaloa = require('/cliente/index.js');
var zetas = require('/cliente/index.js');
var marabunta = require('/cliente/index.js');
var arenaRevolver = require('/cliente/index.js');
var arenaBrawl = require('/cliente/index.js');
const playAudioSound = require('/cliente/index.js');
var chatOn = false;
let player = mp.players.local;
var teamsShowed = true;

mp.events.add("changeChatState", (state) => {
  chatOn = state;
})


mp.events.add("setHudStatus", status => {
  hudCef.active = status;
})

var hudCef = mp.browsers.new("package://hud/hud.html");
hudCef.active = false;
hudCef.execute(`document.getElementById('stats').style.display = 'none'`)

mp.events.add('showHudCef', () => {
  if(!hudCef) {
    hudCef = mp.browsers.new("package://hud/hud.html");
    hudCef.execute(`document.getElementById('equipos').style.display = 'none'`)
    teamsShowed = false;
  }
});
mp.events.add('hideHudCef', () => {
  if(hudCef) hudCef.destroy();
});

//Solicita al servidor las stats del jugador
mp.events.add('actualizarStats_cliente', (player) => {
    mp.events.callRemote('actualizarStats_cliente', player);
});
//Oculta/muestra el apartado de equipos del HUD
mp.events.add('hideHudGangs', () => {
  if(hudCef) {
    if(teamsShowed === true) {
      hudCef.execute(`document.getElementById('equipos').style.display = 'none'`)
      teamsShowed = false;
    }

  }
});
mp.events.add('showHudGangs', () => {
  if(hudCef) {
    if(teamsShowed === false) {
      hudCef.execute(`document.getElementById('equipos').style.display = 'block'`)
      teamsShowed = true;
    }
  }
});

//Hide/show STATS
mp.events.add('hideHudStats', () => {
  if(hudCef) {
    hudCef.execute(`document.getElementById('stats').style.display = 'none'`)
  }
});
mp.events.add('showHudStats', () => {
  if(hudCef) {
    hudCef.execute(`document.getElementById('stats').style.display = 'block'`)
  }
});
//Recibe del servidor las stats del jugador
mp.events.add('statsJugador', (playerKills, playerDeaths, playerKillstreak) => {
    kills = playerKills;
    deaths = playerDeaths;
    killstreak = playerKillstreak;
});
var crips = 0;
var bloods = 0;
var families = 0;
var marabunta = 0;
var arenaRevolver = 0;
var arenaBrawl = 0;
var arenaSniper = 0;
var arenaHS = 0;
var arenaChili = 0;
mp.events.add('actualizarJugadoresEquipos', (numeroCrips, numeroBloods, numeroFamilies, numeroCartelSinaloa, numeroZetas, numeroMarabunta, numeroArenaRevolver, numeroArenaBrawl, numeroArenaSniper, numeroArenaHeadshot, numeroArenaChili) => {
    crips = numeroCrips;
    bloods = numeroBloods;
    families = numeroFamilies;
    marabunta = numeroMarabunta;
    cartelSinaloa = numeroCartelSinaloa;
    zetas = numeroZetas;
    arenaRevolver = numeroArenaRevolver;
    arenaBrawl = numeroArenaBrawl;
    arenaSniper = numeroArenaSniper;
    arenaHS = numeroArenaHeadshot;
    arenaChili = numeroArenaChili;
});

var killAnnounceAlpha = 0;
var deathName;

mp.events.add('render', () => {

  if(hudCef) {
    hudCef.execute(`updateGangs(${crips}, ${bloods}, ${marabunta}, ${families}, ${cartelSinaloa}, ${zetas}, ${arenaRevolver}, ${arenaBrawl}, ${arenaSniper}, ${arenaHS}, ${arenaChili}, ${mp.players.length})`)
    hudCef.execute(`updateStats(${kills}, ${deaths}, ${killstreak})`)
  }
    
    mp.game.graphics.drawText(`You killed ${deathName}`, [0.5, 0.4], { 
      font: 2, 
      color: [255, 255, 255, killAnnounceAlpha], 
      scale: [0.5, 0.4], 
      outline: true
    });
});

mp.events.add('render', () =>
{
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
	{
        let vel1 = player.vehicle.getSpeed() * 3.6;
        let vel = (vel1).toFixed(0);
		mp.game.graphics.drawText(`${vel} KM H`, [0.5, 0.8], { 
		    font: 2, 
		    color: [255, 255, 255, hudAlpha], 
		    scale: [0.5, 0.5], 
		    outline: true
		});        
	}
});

var killAnnounceSetTimeOut;
mp.events.add('killSound', (name) => {
  clearTimeout(killAnnounceSetTimeOut)
  deathName = name;
  killAnnounceAlpha = 255;
  killAnnounceSetTimeOut = setTimeout(function() {
    killAnnounceAlpha = 0;
  }, 1500)
});

//KEYBIND 'K' DISPLAYS/CLOSES HUD GANGS
mp.keys.bind(0x4B, true, function() {
  if(chatOn) return;
  if(hudCef) {
    if (teamsShowed === true) {
      hudCef.execute(`document.getElementById('equipos').style.display = 'none'`)
      teamsShowed = false;
    } else if (teamsShowed === false){
      hudCef.execute(`document.getElementById('equipos').style.display = 'block'`)
      teamsShowed = true;
    }
  }
});
}