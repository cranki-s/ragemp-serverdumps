{
/* --------------------------------------------------------------------------------
 * detectores.js
 *
 * Autor: FerniMoon y Dries
 *
 * Descripcion: Eventos para obtener a los jugadores cercanos del detector
 * en el momento que detecta armas y le aplicamos el sonido en el ratio
 * que coloquemos.
 *
 * -------------------------------------------------------------------------------- */

//EVENTO PARA SABER JUGADORES CERCANOS AL DETECTOR FIJO
mp.events.add("jugCercanos_detectores_fijos", function () { jugCercanos_detectores_fijos() });

//EVENTO PARA SABER JUGADORES CERCANOS AL DETECTOR MOVILES
mp.events.add("jugCercanos_detectores_moviles", (detector_posicion) => { jugCercanos_detectores_moviles(detector_posicion); });

function jugCercanos_detectores_fijos() {

    let posDetector = [
        new mp.Vector3(2506.416, -422.4753, 94.58217), // esferaDetectorFIB1
        new mp.Vector3(2508.956, -420.0734, 94.58212), // esferaDetectorFIB2
        new mp.Vector3(2132.948, 2919.816, -61.79683), // esferaDetectorIAA
        new mp.Vector3(989.9298, 26.84043, 80.99026), // esferaDetectorCasino1
        new mp.Vector3(987.5753, 28.37582, 80.9903), // esferaDetectorCasino2
        new mp.Vector3(1840.801, 2594.19, 45.8909), // esferaDetectorFederal1
        new mp.Vector3(1690.612, 2583.901, 45.91151), // esferaDetectorFederal2
        new mp.Vector3(-567.2227, -131.20625, 37.954628), // esferaDetectorComisariRH1
        new mp.Vector3(-562.3712, -130.09283, 38.450157), // esferaDetectorComisariRH2
        new mp.Vector3(-557.9595, -127.51534, 37.954697), // esferaDetectorComisariRH3
        new mp.Vector3(-543.26276, -131.50978, 38.81331) // esferaDetectorComisariRH4
    ];

    let detector;

    for (let i = 0; i < posDetector.length; i++) {
        if (calcDist(player_local.position, posDetector[i]) <= 1.00) {
            detector = posDetector[i];
            break;
        }
    }

    if (!detector) return;

    let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, detector) < 10.00 && Math.abs(jug.position.z - detector.z) <= 3.0));

    for (let i = 0; i < jugsCerca.length; i++) {
        if (adminservicio) continue;
        let jugador = jugsCerca[i];
        mp.events.callRemote('jugCerca:detectores', jugador);
    }
}

function jugCercanos_detectores_moviles(detector_posicion) {

    if (!detector_posicion) return;

    let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, detector_posicion) < 10.00 && Math.abs(jug.position.z - detector_posicion.z) <= 3.0));

    for (let i = 0; i < jugsCerca.length; i++) {
        if (adminservicio) continue;
        let jugador = jugsCerca[i];
        mp.events.callRemote('jugCerca:detectores', jugador);
    }
}

mp.events.add("sonidoDetectorMetales", () => {
    mp.game.audio.playSoundFromCoord(-1, "Metal_Detector_Big_Guns", player_local.position.x, player_local.position.y, player_local.position.z, "dlc_ch_heist_finale_security_alarms_sounds", false, 0, false);
});

// PARA LOS DETECTORES SITUADOS EN FIB (TODO COMENTADO HASTA QUE SE HABILITEN LAS CINTAS, PARA QUE PONER EL TEXTLABEL SI LA CINTA NO FUNCIONA XD)
    // Entrada
/*mp.labels.new("Cinta transportadora\n~b~Pulsa la tecla ~y~E~b~ para visualizar los objetos en ella.", new mp.Vector3(2509.7695, -423.41818, 94.6), { los: true, font: 6, drawDistance: 1.2, color: [255, 255, 255, 255], dimension: 0 });*/
/*mp.markers.new(1, new mp.Vector3(2510.3264, -423.8923, 93.5), 0.3, { color: [240, 255, 255, 150], visible: true, dimension: 0 });*/
    // Salida
/*mp.labels.new("Cinta transportadora\n~b~Pulsa la tecla ~y~E~b~ para visualizar los objetos en ella.", new mp.Vector3(2506.4714, -420.0308, 94.6), { los: true, font: 6, drawDistance: 1.2, color: [255, 255, 255, 255], dimension: 0 });*/
/*mp.markers.new(1, new mp.Vector3(2505.9238, -419.55023, 93.5), 0.3, { color: [240, 255, 255, 150], visible: true, dimension: 0 });*/
}