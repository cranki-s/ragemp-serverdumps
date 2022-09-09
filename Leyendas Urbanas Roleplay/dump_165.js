{
let cayoPericoActivado = false;

let centroIsla = mp.colshapes.newSphere(4840.571, -5174.425, 2, 2000, 0);
var cercaIsla = false;

let blipCayo;

mp.events.add('misiones:cayoperico', function (estado) {
    cayoPericoActivado = estado;
});

mp.events.add('playerJoin', (player) => {
    if((mp.game.gameplay.getDistanceBetweenCoords(4840.571, -5174.425, 2, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false)) > 2000) {
        quitarCayoPerico();
    }
});
mp.events.add('playerEnterColshape', (shape) => {
    if(shape == centroIsla && cayoPericoActivado) {
        cercaIsla = true;
        cargarCayoPerico();
    }
});

mp.events.add('playerExitColshape', (shape) => {
    if(shape == centroIsla) {
        cercaIsla = false;
        quitarCayoPerico();
    }
});

function mostrarCayoPericoMapa(estado) { // Muestra Cayo Perico en el mapa normal al pulsar ESC.
    if (estado) {
        mp.events.add('render', miniMapaCayoPerico);
        if (blipCayo == null || blipCayo == undefined) { // Evita un error en el mapa que impide mover el raton por Cayo Perico. Este Blip no sale en la lista.
            blipCayo = mp.blips.new(407, new mp.Vector3(5943.5679611650485, -6272.114833599767, 2),
            {
                name: 'Cayo Perico',
                alpha: 0
            });
        };
    } else {
        mp.events.remove('render', miniMapaCayoPerico);
        if(blipCayo != null)
        {
            blipCayo.destroy();
            blipCayo = null;
        }
    }

}
function miniMapaCayoPerico() {
    mp.game.invoke('0xE81B7D2A3DAB2D81'); // SET_RADAR_AS_EXTERIOR_THIS_FRAME
    mp.game.ui.setRadarAsInteriorThisFrame(mp.game.joaat('h4_fake_islandx'), 4700.0, -5145.0, 0, 0);
}

function cargarCayoPerico() {
    mostrarCayoPericoMapa(true);
    mp.game.zone.setZoneEnabled(mp.game.zone.getZoneFromNameId("PrLog"), false); // Desactiva la nieve
    mp.game.invoke('0x5E1460624D194A38', true); // _SET_TOGGLE_MINIMAP_HEIST_ISLAND
    mp.game.invoke('0xF74B1FFA4A15FBEA', 1) // SET_GLOBAL_AI_PATH_NODES_TYPE
    mp.game.invoke('0x9A9D1BA639675CF1', 'HeistIsland', true); // SET_ISLAND_HOPPER_ENABLED
    mp.game.invoke('0x02C8E5B49848664E', 'Heist_Island_Peds', true); // SET_SCENARIO_GROUP_ENABLED
    mp.game.audio.setAudioFlag('PlayerOnDLCHeist4Island', true);
    mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", true, true);
    mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", false, true);
};

function quitarCayoPerico() {
    mostrarCayoPericoMapa(false);
    mp.game.zone.setZoneEnabled(mp.game.zone.getZoneFromNameId("PrLog"), true); // Activa la nieve de nuevo, tipo North Yankton
    mp.game.invoke('0x5E1460624D194A38', false); // _SET_TOGGLE_MINIMAP_HEIST_ISLAND
    mp.game.invoke('0xF74B1FFA4A15FBEA', 0) // SET_GLOBAL_AI_PATH_NODES_TYPE
    mp.game.invoke('0x9A9D1BA639675CF1', 'HeistIsland', false); // SET_ISLAND_HOPPER_ENABLED
    mp.game.invoke('0x02C8E5B49848664E', 'Heist_Island_Peds', false); // SET_SCENARIO_GROUP_ENABLED
    mp.game.audio.setAudioFlag('PlayerOnDLCHeist4Island', false);
    mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", false, false);
    mp.game.audio.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", false, false);
}

mp.events.add('mapa:cargarCayoPerico', cargarCayoPerico);
mp.events.add('mapa:quitarCayoPerico', quitarCayoPerico);
}