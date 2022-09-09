{

var camaras_camaraActiva = null;
var camaras_estado = false;

var nombrecam = "CASINO";
var camaras_camaras = {
    1: {
        posicion: new mp.Vector3(-2403.19384765625, 2284.06396484375, 51.80331039428711),
        rotacion: new mp.Vector3(-14.561699867248535, 0, 73.80071258544922),
        nombrecam: "BOXES/META",
        camara: null
    },
    2: {
        posicion: new mp.Vector3(-2546.9921875, 2329.60888671875, 36.96049118041992),
        rotacion: new mp.Vector3(-9.404143333435059, 0, -65.17461395263672),
        nombrecam: "PODIUM",
        camara: null
    },
    3: {
        posicion: new mp.Vector3(-2554.650146484375, 2294.5380859375, 35.64979934692383),
        rotacion: new mp.Vector3(-3.90132737159729, 0, -109.77925109863281),
        nombrecam: "SALIDA",
        camara: null
    },
    4: {
        posicion: new mp.Vector3(-2769.262939453135, 2247.798828125, 41.7088623046875),
        rotacion: new mp.Vector3(-13.262378692626953, 0, -70.44922637939453),
        nombrecam: "CURVA Nº1",
        camara: null
    },
    5: {
        posicion: new mp.Vector3(-3067.5078125, 1255.0682373046875, 35.943565368652344),
        rotacion: new mp.Vector3(-13.026107788085938, 0, 144.7050018310547),
        nombrecam: "CURVA Nº2",
        camara: null
    },
    6: {
        posicion: new mp.Vector3(-2701.983642578125, 1475.2322998046875, 122.76303100585938),
        rotacion: new mp.Vector3(-3.8922500610351562, 0, -52.970001220703125),
        nombrecam: "CURVA Nº3",
        camara: null
    },
    7: {
        posicion: new mp.Vector3(-2005.5079345703125, 2026.3052978515625, 203.63134765625),
        rotacion: new mp.Vector3(-7.917053699493408, 0, 118.96119689941406),
        nombrecam: "CURVA",
        camara: null
    },
    8: {
        posicion: new mp.Vector3(-1857.8853759765625, 2054.72314453125, 152.38177490234375),
        rotacion: new mp.Vector3(-19.482772827148438, 0, 167.66148376464844),
        nombrecam: "BAR VIÑEDOS",
        camara: null
    },
    9: {
        posicion: new mp.Vector3(-2127.613037109375, 2315.746337890625, 37.80724334716797),
        rotacion: new mp.Vector3(2.1322848892211914, 0, -121.58963012695312),
        nombrecam: "ÚLTIMA CURVA",
        camara: null
    }
};

var camaras_teclas = {
    0: 0x60,
    1: 0x61,
    2: 0x62,
    3: 0x63,
    4: 0x64,
    5: 0x65,
    6: 0x66,
    7: 0x67,
    8: 0x68,
    9: 0x69
};

var efectoCamara = null;

function camaras_establecerCamaraActiva(id) {
    if (camaras_camaraActiva != id) {
        if (camaras_camaraActiva && camaras_camaras[camaras_camaraActiva].camara) {
            camaras_camaras[camaras_camaraActiva].camara.setActive(false);
            if (mp.cameras.exists(camaras_camaras[camaras_camaraActiva].camara))
                camaras_camaras[camaras_camaraActiva].camara.destroy();
            camaras_camaras[camaras_camaraActiva].camara = null;
        }

        if (efectoCamara != null) {
            efectoCamara.dispose();
            efectoCamara = null;
        }

        if (id == 0) {
            mp.game.cam.renderScriptCams(false, false, 100, true, true);
            camaras_camaraActiva = null;

            if (efectoCamara != null) {
                efectoCamara.dispose();
                efectoCamara = null;
            }
            return;
        }

        let nuevaCamara = camaras_camaras[id];
        nuevaCamara.camara = mp.cameras.new("default", nuevaCamara.posicion, nuevaCamara.rotacion, 45);
        camaras_camaraActiva = id;
        mp.players.local.position = nuevaCamara.posicion;

        camaras_camaras[camaras_camaraActiva].camara.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);

        /*
        if (efectoCamara == null)
            efectoCamara = new messageScaleform("SECURITY_CAM");

        mp.game.graphics.setTimecycleModifier("scanline_cam_cheap");
        mp.game.graphics.setTimecycleModifierStrength(2.0);

        efectoCamara.callFunction("SET_DETAILS", camaras_camaras[camaras_camaraActiva].nombrecam);
        efectoCamara.callFunction("SET_LOCATION", "DIAMOND CASINO");
        efectoCamara.callFunction("SET_TIME", mp.game.invoke("0x25223CA6B4D20B7F"));
        efectoCamara.renderFullscreen();
        */
    }
}

function camaras_crearKeyBinds() {
    camaras_estado = true;
    for (let tecla in camaras_teclas) {
        mp.keys.bind(camaras_teclas[tecla], false, () => {
            if (!camaras_estado) return;
            camaras_establecerCamaraActiva(tecla);
        });
    }
}

var posicionInicial = null;
mp.events.add({
    "camaras:iniciar": () => {
        if (nivelAdmin < 1) return;
        camaras_crearKeyBinds();
        
        player_local.freezePosition(true);
        player_local.setInvincible(true);
        player_local.setVisible(false, false);
        player_local.setCollision(false, false);
        posicionInicial = mp.players.local.position;

        mp.events.add('render', render_camaras);
    },
    "camaras:detener": () => {
        if (nivelAdmin < 1) return;
        mp.events.remove('render', render_camaras);

        camaras_estado = false;
        camaras_camaraActiva = null;
        camaras_establecerCamaraActiva(camaras_camaraActiva);

        player_local.freezePosition(false);
        player_local.setInvincible(false);
        player_local.setVisible(true, false);
        player_local.setCollision(true, false);
        mp.players.local.position = posicionInicial;

        mp.game.invoke("0x0F07E7745A236711");
    }
});

function render_camaras() {
    if (efectoCamara != null)
        efectoCamara.renderFullscreen();
}
}