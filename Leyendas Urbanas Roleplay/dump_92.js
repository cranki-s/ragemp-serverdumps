{
/* --------------------------------------------------------------------------------
 * temporero.js
 *
 * Autor: Dries
 *
 * Descripción: Controlador del cliente del job de temporero
 * -------------------------------------------------------------------------------- */


var temporero_posicionesRuta = [];

var temporero_textlabelActiva = null;
var temporero_blipActivo = null;
var temporero_marcadorActivo = null;
var temporero_indiceRuta = -1;

var temporero_vehiculo = null;

var temporero_frutaRecogida = false;
var temporero_puedeUsarE = true;
var temporero_enEscenario = false;

mp.events.add("temporero:iniciar", (vehiculo, posiciones_str) => {
    temporero_posicionesRuta = (typeof posiciones_str === "string" ? JSON.parse(posiciones_str) : posiciones_str);
    temporero_posicionesRuta.pop();
    temporero_vehiculo = vehiculo;
    refrescarTemporero();

    mp.events.add("temporero:finalizar", () => {
        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva))
            temporero_textlabelActiva.destroy();

        if (temporero_blipActivo && mp.blips.exists(temporero_blipActivo))
            temporero_blipActivo.destroy();

        if (temporero_marcadorActivo && mp.markers.exists(temporero_marcadorActivo))
            temporero_marcadorActivo.destroy();

        temporero_indiceRuta = -1;
        temporero_posicionesRuta = [];
        temporero_textlabelActiva = temporero_blipActivo = temporero_marcadorActivo = temporero_vehiculo = null;
        temporero_frutaRecogida = temporero_enEscenario = false;
        temporero_puedeUsarE = true;
        mp.game.ui.setNewWaypoint(player_local.position.x, player_local.position.y);
        mp.events.call("borrar_ruta");
        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("temporero:fruta_recogida");
        mp.events.remove("temporero:fruta_entregada");
        mp.events.remove("temporero:insolacion");
        mp.events.remove("temporero:finalizar");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x4A, true, teclaJTemporero);
    });

    mp.events.add("temporero:fruta_recogida", () => {
        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva))
            temporero_textlabelActiva.destroy();

        if (temporero_blipActivo && mp.blips.exists(temporero_blipActivo))
            temporero_blipActivo.destroy();

        if (temporero_marcadorActivo && mp.markers.exists(temporero_marcadorActivo))
            temporero_marcadorActivo.destroy();

        temporero_textlabelActiva = temporero_blipActivo = temporero_marcadorActivo = null;

        temporero_puedeUsarE = false;
    });

    mp.events.add("temporero:fruta_entregada", () => {
        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva)) {
            temporero_textlabelActiva.destroy();
            temporero_textlabelActiva = null;
        }
        refrescarTemporero();

        temporero_puedeUsarE = true;
    });

    mp.events.add("temporero:insolacion", () => {
        temporero_enEscenario = true;
        mostrarAviso("info", 12000, "Acabas de sufrir una insolación, deberías colocarte a la sombra y echarte algo de agua por la cabeza y la cara, además de abrirte un poco la camisa");
        mp.events.call("screenfx_iniciar", "PPPurple");
        mp.events.call("efectoShake_iniciar", "FAMILY5_DRUG_TRIP_SHAKE", 1.5);

        crearTimeout(() => {
            temporero_enEscenario = false;
            mostrarAviso("info", 12000, "Te has recuperado de la insolación");
            mp.events.call("efectoShake_parar");
            mp.events.call("screenfx_parar");
        }, 60 * 1000);
    });

    mp.keys.bind(0x4A, true, teclaJTemporero);
});

function refrescarTemporero() {
    temporero_indiceRuta++;
    if (temporero_posicionesRuta[temporero_indiceRuta] == null) {
        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva))
            temporero_textlabelActiva.destroy();

        if (temporero_blipActivo && mp.blips.exists(temporero_blipActivo))
            temporero_blipActivo.destroy();

        if (temporero_marcadorActivo && mp.markers.exists(temporero_marcadorActivo))
            temporero_marcadorActivo.destroy();

        temporero_textlabelActiva = temporero_blipActivo = temporero_marcadorActivo = null;
    } else {
        temporero_textlabelActiva = mp.labels.new("Presiona la tecla ~g~[J]\n~w~para ~r~recoger~w~ la fruta", temporero_posicionesRuta[temporero_indiceRuta], {los:false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
        temporero_blipActivo = mp.blips.new(1, temporero_posicionesRuta[temporero_indiceRuta], { name: "Ruta temporero", scale: 1.0, color: 5});
        temporero_marcadorActivo = mp.markers.new(0, new mp.Vector3(temporero_posicionesRuta[temporero_indiceRuta].x, temporero_posicionesRuta[temporero_indiceRuta].y, temporero_posicionesRuta[temporero_indiceRuta].z+2.0), 1.5, {visible: true, color: [200, 247, 57, 180], dimension: 0});
        mp.game.ui.setNewWaypoint(temporero_posicionesRuta[temporero_indiceRuta].x, temporero_posicionesRuta[temporero_indiceRuta].y);
    }
}

// J
function teclaJTemporero() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) return;
    if (!temporero_puedeUsarE) return;
    if (!temporero_frutaRecogida && ((temporero_posicionesRuta[temporero_indiceRuta] == null) || (temporero_posicionesRuta[temporero_indiceRuta] != null && calcDist(temporero_posicionesRuta[temporero_indiceRuta], player_local.position) > 2.0))) return;
    if (temporero_frutaRecogida && calcDist(temporero_vehiculo.position, player_local.position) > 3.0) return;

    if (!temporero_frutaRecogida) {
        mp.events.callRemote("temporero_tecla_e", EstadosTemporero.RecogerFruta);
        temporero_enEscenario = true;

        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva))
            temporero_textlabelActiva.destroy();

        if (temporero_blipActivo && mp.blips.exists(temporero_blipActivo))
            temporero_blipActivo.destroy();

        if (temporero_marcadorActivo && mp.markers.exists(temporero_marcadorActivo))
            temporero_marcadorActivo.destroy();

        temporero_textlabelActiva = temporero_blipActivo = temporero_marcadorActivo = null;

        crearTimeout(() => {
            if (!temporero_vehiculo) return;
            temporero_enEscenario = false;
            mostrarAviso("success", 8000, "Has recogido la fruta. Ahora métela en el vehiculo");
            let pos = temporero_vehiculo.getWorldPositionOfBone(temporero_vehiculo.getBoneIndexByName("handle_dside_f"));
            temporero_textlabelActiva = mp.labels.new("Presiona la tecla ~g~[J]\n~w~para ~r~meter~w~ la fruta", pos, {los:false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
        }, 8000);
    } else {
        if (temporero_textlabelActiva && mp.labels.exists(temporero_textlabelActiva)) {
            temporero_textlabelActiva.destroy();
            temporero_textlabelActiva = null;
        }
        if (setFloodboton(1000, "FB44") == false) return;
        mp.events.callRemote("temporero_tecla_e", EstadosTemporero.MeterFruta);
        refrescarTemporero();
    }

    temporero_frutaRecogida = !temporero_frutaRecogida;
}

const EstadosTemporero = {
    RecogerFruta: 0,
    MeterFruta: 1
}
}