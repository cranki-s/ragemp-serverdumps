{

var camarasprision_camaraActiva = null;
var camarasprision_estado = false;

var nombrecamprision = "-";
var camarasprision_camaras = {
    1: {
        posicion: new mp.Vector3(1836.060302734375, 2603.110595703125, 51.572017669677734),
        rotacion: new mp.Vector3(-19.771713256835938, 0, -58.111732482910156),
        nombrecam: "ENTRADA VEHICULOS",
        camara: null
    },
    2: {
        posicion: new mp.Vector3(1834.6904296875, 2602.624267578125, 51.572017669677734),
        rotacion: new mp.Vector3(-14.95180606842041, 0, 89.52761840820312),
        nombrecam: "ENTRADA VEHICULOS 2",
        camara: null
    },
    3: {
        posicion: new mp.Vector3(1762.2744140625, 2572.7958984375, 49.00189971923828),
        rotacion: new mp.Vector3(-20.0871524810791, 0, -16.532323837280273),
        nombrecam: "GYM 1",
        camara: null
    },
    4: {
        posicion: new mp.Vector3(1769.4913330078125, 2575.229900390625, 48.9909782409668),
        rotacion: new mp.Vector3(-28.748437881469727, 0, 146.9638671875),
        nombrecam: "GYM 2",
        camara: null
    },
    5: {
        posicion: new mp.Vector3(1701.7188720703125, 2589.802001953125, 48.376956939697266),
        rotacion: new mp.Vector3(-15.46290397644043, 0, 107.91217803955078),
        nombrecam: "RECEPCION",
        camara: null
    },
    6: {
        posicion: new mp.Vector3(1788.3570556640625, 2573.13671875, 48.7983283996582),
        rotacion: new mp.Vector3(-19.26178550720215, 0, 104.79373931884766),
        nombrecam: "ENTRADA GYM",
        camara: null
    },
    7: {
        posicion: new mp.Vector3(1788.3570556640625, 2573.13671875, 48.7983283996582),
        rotacion: new mp.Vector3(-16.978281021118164, 0, -3.868421792984009),
        nombrecam: "ACCESO GYM",
        camara: null
    },
    8: {
        posicion: new mp.Vector3(1824.57080078125, 2473.564453125, 64.38072204589844),
        rotacion: new mp.Vector3(-13.830554962158203, 0, 10.342129707336426),
        nombrecam: "TORRE 1 - 1",
        camara: null
    },
    9: {
        posicion: new mp.Vector3(1825.546875, 2477.455810546875, 63.97365951538086),
        rotacion: new mp.Vector3(-7.68892828604125977, 0, 129.78977966308594),
        nombrecam: "TORRE 1 - 2",
        camara: null
    },
    10: {
        posicion: new mp.Vector3(1759.4801025390625, 2408.629150390625, 64.35601806640625),
        rotacion: new mp.Vector3(-10.3266935334851074, 0, -32.888465881347656),
        nombrecam: "TORRE 2 - 1",
        camara: null
    },
    11: {
        posicion: new mp.Vector3(1762.784423828125, 2411.673095703125, 64.563720703125),
        rotacion: new mp.Vector3(-19.342361450195312, 0, 110.21936798095703),
        nombrecam: "TORRE 2 - 2",
        camara: null
    },
    12: {
        posicion: new mp.Vector3(1656.1737060546875, 2393.83984375, 64.44381713867188),
        rotacion: new mp.Vector3(-17.68882179260254, 0, -68.8358154296875),
        nombrecam: "TORRE 3 - 1",
        camara: null
    },
    13: {
        posicion: new mp.Vector3(1661.0517578125, 2394.930419921875, 64.35989379882812),
        rotacion: new mp.Vector3(-16.232168197631836, 0, 81.12443542480469),
        nombrecam: "TORRE 3 - 2",
        camara: null
    },
    14: {
        posicion: new mp.Vector3(1538.7313232421875, 2471.083740234375, 64.5886001586914),
        rotacion: new mp.Vector3(-18.7123966217041, 0, -118.71634674072266),
        nombrecam: "TORRE 4 - 1",
        camara: null
    },
    15: {
        posicion: new mp.Vector3(1542.0113525390621, 2467.484619140625, 64.08238983154297),
        rotacion: new mp.Vector3(-196855525970459, 0, 44.00726318359375),
        nombrecam: "TORRE 4 - 2",
        camara: null
    },
    16: {
        posicion: new mp.Vector3(1761.3453369140625, 2578.49169921875, 48.819488525390625),
        rotacion: new mp.Vector3(-27.72487449645996, 0, -19.52623176574707),
        nombrecam: "PASILLO GYM - ALMACEN - 1",
        camara: null
    },
    17: {
        posicion: new mp.Vector3(1760.8433837890625, 2593.10546875, 48.90542221069336),
        rotacion: new mp.Vector3(-23.089500427246094, 0, -154.95741271972656),
        nombrecam: "PASILLO GYM - ALMACEN - 2",
        camara: null
    },
    18: {
        posicion: new mp.Vector3(1691.477294921875, 2612.111328125, 60.56013488769531),
        rotacion: new mp.Vector3(-41.55392074584961, 0, 179.57305908203125),
        nombrecam: "G3 - ACCESO ARCO",
        camara: null
    },
    19: {
        posicion: new mp.Vector3(1692.4736328125, 2583.796630859375, 48.44965362548828),
        rotacion: new mp.Vector3(-14.123589515686035, 0, 44.6487236022942),
        nombrecam: "G3 - ACCESO PUERTA",
        camara: null
    },
    20: {
        posicion: new mp.Vector3(1702.4500732521875, 2583.704833984375, 49.032814025878906),
        rotacion: new mp.Vector3(-22.78464698791504, 0, 121.09612274169922),
        nombrecam: "G3 - SALA DE DESCANSO",
        camara: null
    },
    21: {
        posicion: new mp.Vector3(1678.1233046875, 2572.92529296875, 52.6900749206543),
        rotacion: new mp.Vector3(-23.717189881836, 0, -123.68218231201172),
        nombrecam: "G3 - ESCALERAS DESPACHOS",
        camara: null
    },
    22: {
        posicion: new mp.Vector3(1599.7308349609375, 2558.691162109375, 55.24946594238281),
        rotacion: new mp.Vector3(-11.214972496032715, 0, -114.99713134765625),
        nombrecam: "PATIO",
        camara: null
    },
    23: {
        posicion: new mp.Vector3(1789.01123046875, 2591.209716796875, 49.06404495239258),
        rotacion: new mp.Vector3(-14.628443717956543, 0, 178.08460998535156),
        nombrecam: "PASILLO GYM",
        camara: null
    },
    24: {
        posicion: new mp.Vector3(1676.6805419921875, 2574.077880859375, 58.897640228271484),
        rotacion: new mp.Vector3(-35.439979553222656, 0, -58.80842590332031),
        nombrecam: "HELIPUERTO",
        camara: null
    },
    25: {
        posicion: new mp.Vector3(1779.60791015625, 2584.03759765625, 48.417449951171875),
        rotacion: new mp.Vector3(-23.72939109802246, 0, -129.9031219482422),
        nombrecam: "ENFERMERIA ENTRADA A2",
        camara: null
    },
    26: {
        posicion: new mp.Vector3(1786.7530517578125, 2593.70166015625, 48.36400604248047),
        rotacion: new mp.Vector3(-21.95777702331543, 0, -75.29702758789062),
        nombrecam: "ENTRADA CENTRAL UNIT A2",
        camara: null
    },
    27: {
        posicion: new mp.Vector3(1711.218505859375, 2594.677001953125, 53.79429626464844),
        rotacion: new mp.Vector3(-21.031579971313477, 0, 179.92112731933594),
        nombrecam: "PASILLO BLOQUE A",
        camara: null
    },
    28: {
        posicion: new mp.Vector3(1670.244873046875, 2595.279296875, 54.0961799621582),
        rotacion: new mp.Vector3(-27.84177017211914, 0, 179.63670349121034),
        nombrecam: "PASILLO BLOQUE B",
        camara: null
    },
    29: {
        posicion: new mp.Vector3(1696.52099609375, 2659.151611328125, 60.57936096191406),
        rotacion: new mp.Vector3(-19.492149353027344, 0, -63.25676345825195),
        nombrecam: "TORRE INTERIOR A - 1",
        camara: null
    },
    30: {
        posicion: new mp.Vector3(1695.1640625, 2644.150634765625, 60.79138946533203),
        rotacion: new mp.Vector3(-32.5629768371582, 0, -131.79864501953125),
        nombrecam: "TORRE INTERIOR A - 2",
        camara: null
    },
    31: {
        posicion: new mp.Vector3(1684.687255859375, 2644.934814453125, 59.98065948486328),
        rotacion: new mp.Vector3(-24.098356246948242, 0, 124.5768814086914),
        nombrecam: "TORRE INTERIOR A - 3",
        camara: null
    },
    32: {
        posicion: new mp.Vector3(1686.814208984375, 2660.796142578125, 60.665531158447266),
        rotacion: new mp.Vector3(-27.169160842895508, 0, 75.59880065917969),
        nombrecam: "TORRE INTERIOR A - 4",
        camara: null
    },
    33: {
        posicion: new mp.Vector3(1792.39990234375, 2547.342041015625, 51.36454391479492),
        rotacion: new mp.Vector3(-41.71806335449219, 0, -91.29930114746094),
        nombrecam: "PASILLO ENTRADA VEHICULOS",
        camara: null
    },
    34: {
        posicion: new mp.Vector3(1772.6729736328125, 2582.776123046875, 48.87723922729492),
        rotacion: new mp.Vector3(-29.680953979492188, 0, 91.94669342041016),
        nombrecam: "LAVANDERIA 2 - 1",
        camara: null
    },
    35: {
        posicion: new mp.Vector3(1767.700439453125, 2582.642333984375, 48.837520599365234),
        rotacion: new mp.Vector3(-32.40453338623047, 0, -99.91104888916016),
        nombrecam: "LAVANDERIA 2 - 2",
        camara: null
    },
    36: {
        posicion: new mp.Vector3(1771.0850830078125, 2590.189453125, 49.01853942871094),
        rotacion: new mp.Vector3(-30.104801177978516, 0, 84.6698989868164),
        nombrecam: "JARDINERIA - 1",
        camara: null
    },
    37: {
        posicion: new mp.Vector3(1766.2501220703125, 2590.25146484375, 48.744815826416016),
        rotacion: new mp.Vector3(-31.69158172607422, 0, -94.60506439208984),
        nombrecam: "JARDINERIA - 2",
        camara: null
    },
    38: {
        posicion: new mp.Vector3(1779.335693359375, 2596.46533203125, 48.2337646484375),
        rotacion: new mp.Vector3(-17.442733764648438, 0, -145.19375610351562),
        nombrecam: "VISITAS - 1",
        camara: null
    },
    39: {
        posicion: new mp.Vector3(1779.159423828125, 2588.883056640625, 48.33285140991211),
        rotacion: new mp.Vector3(-17.56085777282715, 0, -36.05907440185547),
        nombrecam: "VISITAS - 2",
        camara: null
    },
    40: {
        posicion: new mp.Vector3(1667.1981201171875, 2569.322998046875, 53.027645111083984),
        rotacion: new mp.Vector3(-25.19864273071289, 0, -77.20284271240234),
        nombrecam: "BLOQUE 9A",
        camara: null
    },
    41: {
        posicion: new mp.Vector3(1695.3935546875, 2528.673583984375, 60.744876861572266),
        rotacion: new mp.Vector3(-23.842302322387695, 0, -80.52093505859375),
        nombrecam: "TORRE INTERIOR B - 1",
        camara: null
    },
    42: {
        posicion: new mp.Vector3(1685.3968505859375, 2528.75341796875, 60.623985290527344),
        rotacion: new mp.Vector3(-39.55087661743164, 0, 149.6300048828125),
        nombrecam: "TORRE INTERIOR B - 2",
        camara: null
    },
    43: {
        posicion: new mp.Vector3(1686.409912109375, 2543.5986328125, 60.63637161254883),
        rotacion: new mp.Vector3(-32.0311393737793, 0, -86.00674438476562),
        nombrecam: "TORRE INTERIOR B - 3",
        camara: null
    },
    44: {
        posicion: new mp.Vector3(1695.187255859375, 2541.722900390625, 60.64078903198242),
        rotacion: new mp.Vector3(-49.62958526611328, 0, -36.05907440185547),
        nombrecam: "TORRE INTERIOR B - 4",
        camara: null
    },
    45: {
        posicion: new mp.Vector3(1535.6400146484375, 2583.3232421875, 64.17572784423828),
        rotacion: new mp.Vector3(-14.172858238220215, 0, 22.956958770751953),
        nombrecam: "TORRE 5 - 1",
        camara: null
    },
    46: {
        posicion: new mp.Vector3(1533.6412353515625, 2587.896240234375, 64.33008575439453),
        rotacion: new mp.Vector3(-27.125492095947266, 0, 176.14510108398438),
        nombrecam: "TORRE 5 - 2",
        camara: null
    },
    47: {
        posicion: new mp.Vector3(1568.8035888671875, 2677.763916015625, 64.0907974243164),
        rotacion: new mp.Vector3(-13.738869667053223, 0, -15.314560890197754),
        nombrecam: "TORRE 6 - 1",
        camara: null
    },
    48: {
        posicion: new mp.Vector3(1570.433837890625, 2683.52294921875, 64.4183349609375),
        rotacion: new mp.Vector3(-24.683752059936523, 0, 140.6684112548828),
        nombrecam: "TORRE 6 - 2",
        camara: null
    },
    49: {
        posicion: new mp.Vector3(1570.433837890625, 2683.52294921875, 64.4183349609375),
        rotacion: new mp.Vector3(-24.683752059936523, 0, 24.683752059936523),
        nombrecam: "TORRE 7 - 1",
        camara: null
    },
    50: {
        posicion: new mp.Vector3(1651.41845703125, 2759.934814453125, 64.71197509765625),
        rotacion: new mp.Vector3(-29.252134323120117, 0, 117.4427490234375),
        nombrecam: "TORRE 7 - 2",
        camara: null
    },
    51: {
        posicion: new mp.Vector3(1770.5465087890625, 2762.423828125, 64.27284240722656),
        rotacion: new mp.Vector3(-9.606583595275879, 0, -90.43367004394630),
        nombrecam: "TORRE 8 - 1",
        camara: null
    },
    52: {
        posicion: new mp.Vector3(1775.7095947265625, 2763.472900390625, 64.68380737304688),
        rotacion: new mp.Vector3(-32.441383361816406, 0, 64.25239562988281),
        nombrecam: "TORRE 8 - 2",
        camara: null
    },
    53: {
        posicion: new mp.Vector3(1847.5616455078125, 2701.80712890625, 64.64453887939453),
        rotacion: new mp.Vector3(-15.030902862548828, 0, -146.73240661621094),
        nombrecam: "TORRE 9 - 1",
        camara: null
    },
    54: {
        posicion: new mp.Vector3(1850.1168212890625, 2697.198974609375, 64.69671630859375),
        rotacion: new mp.Vector3(-29.645885467529297, 0, -0.3937290906906128),
        nombrecam: "TORRE 9 - 2",
        camara: null
    },
    55: {
        posicion: new mp.Vector3(1823.0113525390625, 2623.663818359375, 64.83282470703125),
        rotacion: new mp.Vector3(-12.745508193969727, 0, -165.00918579101562),
        nombrecam: "TORRE A - 1",
        camara: null
    },
    56: {
        posicion: new mp.Vector3(1824.8309326171875, 2618.5751953125, 64.58296966552734),
        rotacion: new mp.Vector3(-29.250661849975586, 0, -23.144886016845703),
        nombrecam: "TORRE A - 2",
        camara: null
    }
};

var efectoCamaraprision = null;
var nuevaCamara = null;

function camarasprision_establecerCamaraActiva(id) {
    if (camarasprision_camaraActiva != id) {
        if (camarasprision_camaraActiva && camarasprision_camaras[camarasprision_camaraActiva].camara) {
            camarasprision_camaras[camarasprision_camaraActiva].camara.setActive(false);
            if (mp.cameras.exists(camarasprision_camaras[camarasprision_camaraActiva].camara))
                camarasprision_camaras[camarasprision_camaraActiva].camara.destroy();
            camarasprision_camaras[camarasprision_camaraActiva].camara = null;
        }

        if (efectoCamaraprision != null) {
            efectoCamaraprision.dispose();
            efectoCamaraprision = null;
        }

        nuevaCamara = camarasprision_camaras[id];
        nuevaCamara.camara = mp.cameras.new("default", nuevaCamara.posicion, nuevaCamara.rotacion, 45);
        camarasprision_camaraActiva = id;

        camarasprision_camaras[camarasprision_camaraActiva].camara.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);

        if (efectoCamaraprision == null)
            efectoCamaraprision = new messageScaleform("SECURITY_CAM");

        mp.game.graphics.setTimecycleModifier("scanline_cam_cheap");
        mp.game.graphics.setTimecycleModifierStrength(2.0);

        efectoCamaraprision.callFunction("SET_DETAILS", camarasprision_camaras[camarasprision_camaraActiva].nombrecam);
        efectoCamaraprision.callFunction("SET_LOCATION", "PULSA RETROCESO PARA SALIR");
        efectoCamaraprision.callFunction("SET_TIME", mp.game.invoke("0x25223CA6B4D20B7F"));
        efectoCamaraprision.renderFullscreen();
    }
};

mp.events.add({
    "camarasprision:iniciar": (id) => {
        mp.events.call('estado_interfaz');
        camarasprision_establecerCamaraActiva(id);

        player_local.freezePosition(true);
        player_local.setInvincible(true);
        player_local.setVisible(false, false);
        player_local.setCollision(false, false);

        mp.events.add('render', render_camarasprision);
    },
    "camarasprision:detener": () => {
        mp.events.remove('render', render_camarasprision);

        mp.events.call('estado_interfaz');

        if (camarasprision_camaraActiva && camarasprision_camaras[camarasprision_camaraActiva].camara) {
            camarasprision_camaras[camarasprision_camaraActiva].camara.setActive(false);
            if (mp.cameras.exists(camarasprision_camaras[camarasprision_camaraActiva].camara))
                camarasprision_camaras[camarasprision_camaraActiva].camara.destroy();
            camarasprision_camaras[camarasprision_camaraActiva].camara = null;
            camarasprision_estado = false;
            camarasprision_camaraActiva = null;
        }

        if (efectoCamaraprision != null) {
            efectoCamaraprision.dispose();
            efectoCamaraprision = null;
        }

        player_local.freezePosition(false);
        player_local.setInvincible(false);
        player_local.setVisible(true, false);
        player_local.setCollision(true, false);

        mp.game.invoke("0x0F07E7745A236711");

        mp.game.cam.renderScriptCams(false, false, 100, true, true);
    }
});

function render_camarasprision() {
    if (efectoCamaraprision != null) efectoCamaraprision.renderFullscreen();
}

//Tecla Flecha Izquierda
mp.keys.bind(0x25, true, function () {
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camarasprision_camaraActiva && camarasprision_camaras[camarasprision_camaraActiva].camara) {
        let camaraprision_menos = camarasprision_camaraActiva - 1;
        if (camaraprision_menos != 0) {
            camarasprision_establecerCamaraActiva(camaraprision_menos);
        } else {
            return;
        }
    } else {
        return;
    }
});

//Tecla Flecha Derecha
mp.keys.bind(0x27, true, function () {
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camarasprision_camaraActiva && camarasprision_camaras[camarasprision_camaraActiva].camara) {
        let camaraprision_mas = camarasprision_camaraActiva + 1;
        if (camaraprision_mas != 57) {
            camarasprision_establecerCamaraActiva(camaraprision_mas);
        } else {
            return;
        }
    } else {
        return;
    }
});

//Tecla Retroceso
mp.keys.bind(0x08, true, function () {
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camarasprision_camaraActiva && camarasprision_camaras[camarasprision_camaraActiva].camara) {
        mp.events.call("camarasprision:detener");
    } else {
        return;
    }
});
}