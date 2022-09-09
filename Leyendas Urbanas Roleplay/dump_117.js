{
/* --------------------------------------------------------------------------------
 * boxeo.js
 *
 * Autor: Celeritas
 *
 * Descripción: Sistema de boxeo, funcionamiento por probabilidad en vez de por daño.
 *
 * -------------------------------------------------------------------------------- */


var probabilidadKO = 0.95; // Qué tan fácil es hacer un KO al rival. Recuerda que cuánto más bajo sea, más fácil es hacer un KO.
var probabilidadRecibirKO = 0; // Qué tan fácil es recibir un KO. Cuanto más alto, más fácil es recibir un KO. Esto se adiciona al resto.

var modoBoxeo = false; // Si está en true, el sistema de boxeo está activado. Si está en false, el sistema de boxeo está desactivado.

let poseDefensiva = false; // Si el usuario está en pose defensiva, nunca podrá recibir un impacto crítico. NO FUNCIONA.

// Parte de los eventos
mp.events.add('sistemas:boxeo:activar', (tipo) => {
    activarBoxeo(tipo);
});

mp.events.add('sistemas:boxeo:activar:gimnasio', () => {
    activarBoxeo(1);
});

mp.events.add('sistemas:boxeo:modificarProbabilidadKO', (probabilidad) => {
    probabilidadKO = probabilidad;
});

mp.events.add('sistemas:boxeo:reproducirSonidoEntidad', (id, sonido) => {
    // Reproduce un sonido desde una entidad

    var entidad = mp.players.atRemoteId(id);
    if (entidad) {
        mp.game.audio.playSoundFromEntity(1, "Beast_Die", entidad.handle, "APT_BvS_Soundset", true, 0); // TODO: Buscar un sonido, relacionarlo con la función.
    }
});

mp.events.add('sistemas:boxeo:recibirKO', () => {
    if (modoBoxeo && (Math.random() < probabilidadKO)) {
        mp.events.callRemote('sistemas:boxeo:reproducirSonidoEntidad', player_local); // Esto va al servidor.
        mp.events.call("hud:aviso_minimapa", JSON.stringify([13, "Derribado", "Boxeo", "Te han derribado.", 10000]));
        player_local.setToRagdoll(10000, (10000 * 2), 0, false, false, false);
        mp.events.call("efectoScreenfx", "DMT_flight", 10000, false);
    }
    });

mp.events.add("outgoingDamage", (sourceEntity, targetEntity, targetPlayer, weapon, boneIndex, damage) => {
        if (modoBoxeo) {
            if (Math.random() > probabilidadKO) {
                mp.events.callRemote('sistemas:boxeo:enviarKO', targetPlayer);
            }
            if (inocente) {
                mp.events.call("sound:play", "minecrafthit", false); 
            }
            return true;
        }
});

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    /*if(boneIndex == 20 && modoBoxeo && !poseDefensiva) {
        mp.events.call("efectoScreenfx", "DMT_flight", 2000, false);
        mp.events.call("hud:aviso_minimapa", JSON.stringify([13, "Impacto crítico", "Boxeo", "Has recibido un impacto crítico. Ahora es más fácil hacerte un KO.", 5000]));
        aumentarProbabilidadRecibirKO(0.05);
    }*/
});

function renderBoxeo() {
        if (modoBoxeo) {
            mp.game.controls.disableControlAction(32, 21, true); // Desactiva el Sprint, esto desactivará la metralleta.

        /*
        mp.game.controls.disableControlAction(32, 143, true); // Desactiva el esquivar de GTA, vamos a gestionar esto nosotros manualmente.

        if (modoBoxeo && mp.game.controls.isDisabledControlPressed(32, 143)) {
            mp.game.graphics.setTimecycleModifier("drug_flying_base");
            mp.game.graphics.setTimecycleModifierStrength(0.7);
        }

        if(mp.game.invoke('0xFDF3D97C674AFB66') != -1) {

            poseDefensiva = true;
        }

        if(!mp.game.controls.isDisabledControlPressed(32, 143)) {
            mp.game.invoke('0x0F07E7745A236711');
            poseDefensiva = false;
        }
        
        if(poseDefensiva) {
            mp.game.controls.disableControlAction(32, 24, true); // Desactivamos ataque básico
            mp.game.controls.disableControlAction(32, 140, true); // Desactivamos ataque ligero

        }*/
    }
    
};

function modificarProbabilidadKO(probabilidad) {
    probabilidadKO = probabilidad;
}

function aumentarProbabilidadRecibirKO(cantidad) {
    probabilidadRecibirKO += cantidad;
}

function reducirProbabilidadRecibirKO(cantidad) {
    probabilidadRecibirKO -= cantidad;
}

function activarBoxeo(tipo) { // Gracias Kenshin por las cosas para poner mensajitos UwU
    
        let modo = "";
        switch(tipo)
        {
            case 1:
                modo = "Amistoso"; // Amistoso utiliza el sistema de boxeo por probabilidad.
                mp.events.add('render', renderBoxeo);
                probabilidadKO = 0.95; // Un 5% de probabilidades de recibir un KO.
                mp.game.ui.messages.showMidsizedShard("~g~BOXEO~g~", modo, 2, false, false, 10000, false);
                modoBoxeo = true;
                break;
            case 2:
                modo = "Guantes"; // Usado cuando se utilizan unos guantes de boxeo
                mp.events.add('render', renderBoxeo);
                probabilidadKO = 0.95; // Un 5% de probabilidades de recibir un KO.
                modoBoxeo = true;
                mp.game.ui.messages.showMidsizedShard("~g~BOXEO~g~", modo, 2, false, false, 10000, false);
                mostrarAviso("success", 5000, "Pulsa RETROCESO para finalizar la sesión de Boxeo.");
                break;
            case 3:
                modo = "Velada"; // Usa probabilidades mucho más bajas para hacer el sistema más interesante.
                mp.events.add('render', renderBoxeo);
                probabilidadKO = 0.99; // Un 1% de probabilidades de recibir un KO.
                mp.game.ui.messages.showMidsizedShard("~g~BOXEO~g~", modo, 2, false, false, 10000, false);
                modoBoxeo = true;
                break;
            default:
                modo = "Desactivado"; // Desactiva el sistema de boxeo.
                modoBoxeo = false;
                mp.events.remove('render', renderBoxeo);
                break;
        }
        
        mp.events.call("efectoScreenfx", "DeathFlash", 5000, false);
        mp.events.call("sound:play", "boxeo", false); 
    
}


}