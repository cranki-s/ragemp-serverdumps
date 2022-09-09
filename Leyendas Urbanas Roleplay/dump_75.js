{
let reconPlayer = null;
let reconInterval = null;
let reconmsgInterval = null;
let canRecheck = true;

mp.events.add({
  "recon:start": (player) => eventReconStart(player),
  "recon:stop": eventReconStop,
});

function eventReconStart(player) {
  reconPlayer = player;

  mp.players.local.freezePosition(true);
  mp.players.local.setInvincible(true);
  mp.players.local.setVisible(false, false);
  mp.players.local.setCollision(false, false);

  mp.events.add("render", renderRecon);

  if (mp.controladorJugadores._jugadores[reconPlayer.id]) {
    let jugador = mp.controladorJugadores._jugadores[reconPlayer.id];
    mostrarAviso("fixed", -1, "<span style='color:#00d667;'>" + jugador.nombre_usuario + "</span> / <span style='color:#00d667;'>" + reconPlayer.name + "</span> [<span style='color:#00d667;'>" + reconPlayer.remoteId + "</span>]");
  }

  
  // reconmsgInterval = setInterval(() => {
  //   mostrarAviso("big", 10000, "<h2>Jugadores cercanos:</h2>");
  // }, 10000);


  reconInterval = setInterval(() => {
    if (!reconPlayer || !canRecheck) return;

    if (canRecheck && reconPlayer.position.x == 0 && reconPlayer.position.y == 0 && reconPlayer.position.z == 0) {
      mp.console.logInfo(`[RECON] [${reconPlayer.position.x}, ${reconPlayer.position.Y}, ${reconPlayer.position.Z}]`, true, true);
      mp.events.callRemote("recon:recheck", reconPlayer);
      canRecheck = false;
      crearTimeout(() => canRecheck = true, 1000);
    } else {
      mp.players.local.position = new mp.Vector3(reconPlayer.position.x, reconPlayer.position.y, reconPlayer.position.z - 4);
    }

    // let jugadoresCercadonos = "";
    // let staffRecon = "";
    // mp.players.forEachInStreamRange(function (ply) {
    //   if (ply != player_local) {
    //       if (calcDist(player_local.position, ply.position) < 50.0) {
    //         let jugador = mp.controladorJugadores._jugadores[ply.id];
    //         if (jugador && jugador.oculto == false) {
    //             jugadoresCercadonos = jugadoresCercadonos + "<p>Usuario: "+ jugador.nombre_usuario +" / Personaje: " + ply.name + " [ID: " + ply.remoteId + "]</p>"
    //         }
    //         if (jugador && jugador.oculto == true) {
    //           staffRecon = staffRecon + "<p>Usuario: "+ jugador.nombre_usuario +" [ID: " + ply.remoteId + "]</p>"
    //         }
    //       }
    //   }
    // });

    // if(staffRecon.length > 0)
    // {
    //   mp.events.call("hud:texto_noti_grande", "<h2>Jugadores cercanos:</h2> " + jugadoresCercadonos + "<h2>Staff reconeando:</h2>" + staffRecon);
    // }
    // else
    // {
    //   mp.events.call("hud:texto_noti_grande", "<h2>Jugadores cercanos:</h2> " + jugadoresCercadonos);
    // }

  }, 500);
}

function eventReconStop() {
    mp.events.remove("render", renderRecon);

    if (reconmsgInterval != null) {
        clearInterval(reconmsgInterval);
        reconmsgInterval = null;
    }
    if (reconInterval != null)
    {
        clearInterval(reconInterval);
        reconInterval = null;
    }

    reconPlayer = null;

    mp.events.call("hud:cerrar_aviso_fijo");

    mp.players.local.freezePosition(false);
    mp.players.local.setInvincible(false);
    mp.players.local.setVisible(true, false);
    mp.players.local.setCollision(true, false);
}

function renderRecon() {
  if (!reconPlayer) return;
  mp.game.invoke("0x8BBACBF51DA047A8", reconPlayer.handle);
}
}