{
let tipoPartida = 0;
let airsoftInterval = null;
let contadorTiempo = 0

mp.events.add({
  "airsoft:player:start": (tipo, tiempo) => playerAirsoftStart(tipo, tiempo),
  "airsoft:player:stop": playerAirsoftStop,
  "airsoft:observer:start": (tipo, tiempo) => observerAirsoftStart(tipo, tiempo),
  "airsoft:observer:stop": observerAirsoftStop,
  "airsoft:infodeath": (muerto, asesino) => infoDeath(muerto, asesino),
});

function playerAirsoftStart(tipo, tiempo) {
  if (airsoftInterval != null) {
      clearInterval(airsoftInterval);
      airsoftInterval = null;
  }

  tipoPartida = tipo;

  startTimer(tiempo);

  let modo = "";
  switch(tipoPartida)
  {
    case 1:
      modo = "Aniquilación";
      break;
    case 2:
      modo = "Captura la bandera";
      break;
  }

  mp.game.ui.messages.showMidsizedShard("~g~COMIENZA LA PARTIDA~g~", modo, 2, false, false, 10000, false);
  mp.events.call("efectoShake", "DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
  mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 10000, false);
  mp.events.call("sound:play", "sonidoscaleform", false); 
}

function playerAirsoftStop() {

    if (airsoftInterval != null) {
        clearInterval(airsoftInterval);
        airsoftInterval = null;
    }

    tipoPartida = 0;

    mp.events.call("hud:cerrar_aviso_fijo");

    mp.players.local.freezePosition(false);
    mp.players.local.setInvincible(false);
    mp.players.local.setVisible(true, false);
    mp.players.local.setCollision(true, false);


    mp.events.call("borrar_marcador");
}


function observerAirsoftStart(tipo, tiempo) {
  
  if (airsoftInterval != null) {
      clearInterval(airsoftInterval);
      airsoftInterval = null;
  }

  startTimer(tiempo);
  tipoPartida = tipo;

  mp.players.local.freezePosition(true);
  mp.players.local.setInvincible(true);
  mp.players.local.setVisible(false, false);
  mp.players.local.setCollision(false, false);

}

function observerAirsoftStop() {

  if (airsoftInterval != null) {
      clearInterval(airsoftInterval);
      airsoftInterval = null;
  }

  tipoPartida = 0;
 
  mp.events.call("hud:cerrar_aviso_fijo");

  mp.players.local.freezePosition(false);
  mp.players.local.setInvincible(false);
  mp.players.local.setVisible(true, false);
  mp.players.local.setCollision(true, false);
}

function startTimer(duration) {
  var timer = duration, minutes, seconds;
  airsoftInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      mp.events.call("hud:aviso", JSON.stringify([5, -1, "<strong>" + minutes + ":" + seconds + "</strong>"]));

      if(minutes <= 0 && seconds <= 0)
      {
        mp.events.callRemote("airsoft:finalizar");
        if (airsoftInterval != null) {
            clearInterval(airsoftInterval);
            airsoftInterval = null;
        }
      }

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

function infoDeath(muerto, asesino) {
  mp.events.call("hud:aviso_minimapa", JSON.stringify([8, "Muerto " + muerto, "Airsoft", asesino + " mato a " + muerto, 5000]));
}


}