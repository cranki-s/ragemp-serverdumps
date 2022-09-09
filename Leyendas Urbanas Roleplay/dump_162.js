{

var animUpdateIniciada = false;
var posInicial = null;

var camaras = [];

async function mostrarTexto(texto, duracion) {
	mp.game.gxt.set('DBR_METHHLP', texto);
	mp.game.ui.setTextComponentFormat('DBR_METHHLP');
    mp.game.ui.displayHelpTextFromStringLabel(0, false, true, duracion);
    await wait(duracion);
}

function fadeIn(tiempo) {
    mp.game.cam.doScreenFadeIn(tiempo);
}

function fadeOut(tiempo) {
    mp.game.cam.doScreenFadeOut(tiempo);
}

mp.events.add("animupdate:iniciar", () => {
    empezarAnimacion();
});

function alternarHud() {
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);

    // Ocultamos el body
    mp.events.call('hud:estado_hud_body', false);

    // Preparamos para mostrar solo las facciones al mostrar de nuevo el body
    mp.events.call('hud:ocultar_hud_excepto_elementos', ["factions"]);
}

function wait(ms) {
    return new Promise(res => crearTimeout(res, ms));
}

function entityExist(entity) {
    return new Promise((resolve, reject) => {
        if (!entity.doesExist()) {
            let int = setInterval(() => {
                if (entity.doesExist()) {
                    clearInterval(int);
                    resolve();
                }
            }, 100);
        } else {
            resolve()
        }
    });
}

function loadAnimationDict(animation) {
    return new Promise((resolve, reject) => {
        if (!entity.doesExist()) {
            let int = setInterval(() => {
                if (entity.doesExist()) {
                    clearInterval(int);
                    resolve();
                }
            }, 100);
        } else {
            resolve()
        }
    });
}

async function terminar(tiempo) {
    // alternarHud();
    fadeIn(200);

    animUpdateIniciada = false;
    
    if(tipoMapa != 2) mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.gui.chat.show(true);

    mp.events.call("hud:faccion", "", '', '');
    mp.events.call("hud:mostrar_faccion", false);
    mp.events.call('hud:estado_hud', true);

    player_local.setInvincible(false);
    player_local.setVisible(true, false);

    mp.events.remove("render", _renderAnim);

    player_local.position = posInicial;
    player_local.freezePosition(false);

    mp.events.callRemote("jugador:visible", true);

    mp.game.cam.renderScriptCams(false, true, tiempo, true, true);

    for (let c of camaras) {
        if (mp.cameras.exists(c)) {
            c.destroy();
            c = null;
        }
    }
    camaras.length = 0;
    mp.events.call('sound:cancel');
}

function crearCamara(posicion, rotacion, activa = false) {
    camara = mp.cameras.new("default", posicion, rotacion, 45);

    if (activa) {
        camara.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
    }
}

async function animacion(posicion1, rotacion1, posicion2, rotacion2, tiempo, fov = 45) {
    return new Promise(res => {
        player_local.position = posicion1;
        player_local.freezePosition(true);

        let cam1 = mp.cameras.new("default", posicion1, rotacion1, fov);
        let cam2 = mp.cameras.new("default", posicion2, rotacion2, fov);

        camaras.push(cam1);
        camaras.push(cam2);

        cam2.setActiveWithInterp(cam1.handle, tiempo, 0, 0);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);

        iniciado = true;
        crearTimeout(res, tiempo + 100);
    });
}

let b_mostrarTextoGrande = false;
let b_mostrarTextoPequeno = false;
let textoGrande = "";
let textoPequeno = "";
function _renderAnim() {
    if (b_mostrarTextoGrande) {
        mp.game.graphics.drawText(textoGrande, [0.5, 0.4], { 
            font: 4, 
            color: [255, 255, 255, 255], 
            scale: [1.2, 1.2], 
            outline: true
        });
    }

    if (b_mostrarTextoPequeno) {
        mp.game.graphics.drawText(textoPequeno, [0.5, 0.7], { 
            font: 4, 
            color: [255, 255, 255, 255], 
            scale: [0.8, 0.8], 
            outline: true
        });
    }
}

async function  mostrarTextoGrande(texto, tiempo) {
    textoGrande = texto;
    b_mostrarTextoGrande = true;
    await wait(tiempo);
    b_mostrarTextoGrande = false;
}

async function  mostrarTextoPequeno(texto, tiempo) {
    textoPequeno = texto;
    b_mostrarTextoPequeno = true;
    await wait(tiempo);
    b_mostrarTextoPequeno = false;
}

async function empezarAnimacion() {
    fadeOut(500);
    await wait(1000);

    animUpdateIniciada = true;
    mp.events.add("render", _renderAnim);
    mp.events.call('sound:play', 'liberty', false);

    alternarHud();
    player_local.setInvincible(true);
    player_local.setVisible(false, false);
    posInicial = player_local.position;

    // Camara inicial temporal
    let temp = mp.cameras.new("default", new mp.Vector3(191.0584, -953.8344, 50.8619), new mp.Vector3(-7.2744, 0, -35.0995), 45);
    temp.setActive(true);

    // INTRODUCCION

    animacion(new mp.Vector3(-1366.5317, -1381.684692, 23.30517), new mp.Vector3(-0.57, 0, -157.4299), new mp.Vector3(-1311.80126, -1509.4464, 23.30517), new mp.Vector3(-0.57, 0, -157.4299), 30000);    

    await wait(1500);
    fadeIn(500);

    await mostrarTextoGrande("Hola, " + nombre_usuario, 3000);
    await mostrarTextoGrande("Bienvenido de nuevo", 3000);
    await mostrarTextoGrande("Te presentamos The Stride, nuestra última actualización", 7000);
    await mostrarTextoGrande("Por favor, no te desconectes durante esta animación", 7000);

    let browser = mp.browsers.new("package://LURP/sistemas/animupdate/index.html");
    setTimeout(() => {
        browser.destroy();
    }, 3000);

    await wait(500);

    fadeOut(500);
    await wait(500);

    // TUNING COCHES Y MOTOS

    let v = mp.vehicles.new(
        mp.game.joaat('comet7'),
        new mp.Vector3(53.89776, -1130.3131, 28.9845),
        { numberPlate: 'LURP', heading: 39.671, dimension: mp.players.local.dimension }
    );

    let v2 = mp.vehicles.new(
        mp.game.joaat('bati'),
        new mp.Vector3(55.531376, -1128.543, 28.683825),
        { numberPlate: 'LURP', heading: 29.28395, dimension: mp.players.local.dimension }
    );

    animacion(new mp.Vector3(47.6156, -1127.5728, 29.42123), new mp.Vector3(-0.14253, 0, -112.6326),new mp.Vector3(56.7611, -1123.02624, 29.0425), new mp.Vector3(1.74722, 0, 156.4605), 15000);    

    await wait(1500);
    fadeIn(500);

    await mostrarTextoPequeno("Hemos añadido más opciones\nal tuning de vehículos", 5000);
    await mostrarTextoPequeno("Podrás personalizar el interior de tus coches,\ncomo el color del salpicadero", 6000);

    animacion(new mp.Vector3(58.4887, -1131.6425, 30.13232), new mp.Vector3(-14.8275, 0, 60.6339),new mp.Vector3(57.04885, -1126.9691, 29.422), new mp.Vector3(-15.0637, 0, 143.2684), 10000);    

    await mostrarTextoPequeno("Y no solo eso", 2500);
    await mostrarTextoPequeno("También tendrás más opciones para tus motos", 3000);
    await mostrarTextoPequeno("Llantas traseras, neumáticos, color... Tú pones los límites", 3000);

    fadeOut(500);
    await wait(500);

    if (mp.vehicles.exists(v)) {
        v.destroy();
        v = null;
    }

    if (mp.vehicles.exists(v2)) {
        v2.destroy();
        v2 = null;
    }

    // NEGOCIOS FAST REPAIR

    animacion(new mp.Vector3(-205.12617, -1413.8167, 52.2411), new mp.Vector3(-30.31847, 0, -6.0455), new mp.Vector3(-164.6894, -1381.9368, 52.2411), new mp.Vector3(-30.3184, 0, 79.8594), 15000);

    await wait(1500);
    fadeIn(500);

    await mostrarTextoPequeno("Nuevos talleres \"Fast Repair\"", 5000);
    await mostrarTextoPequeno("Se activan automáticamente si\nno hay más disponibles", 6000);

    fadeOut(500);
    await wait(500);

    // BOXEO

    let p = mp.peds.new(
        mp.game.joaat('u_m_y_babyd'),
        new mp.Vector3(-1277.1403, -1529.7908, 5.137),
        -103.218,
        mp.players.local.dimension
    );

    let p2 = mp.peds.new(
        mp.game.joaat('s_f_y_stripperlite'),
        new mp.Vector3(-1272.5135, -1531.0773, 5.13674),
        75.07,
        mp.players.local.dimension
    );

    animacion(new mp.Vector3(-1265.3582, -1523.54016, 8.1837), new mp.Vector3(-12.6261, 0, 111.6574), new mp.Vector3(-1269.0212, -1541.6104, 8.3325), new mp.Vector3(-13.1772, 0, 29.6883), 20000);

    await entityExist(p);

    if (!mp.game.streaming.hasAnimDictLoaded("mini@triathlon")) {
        mp.game.streaming.requestAnimDict("mini@triathlon");
        while (!mp.game.streaming.hasAnimDictLoaded("mini@triathlon")) await mp.game.waitAsync(0);
    }

    p.taskPlayAnim('mini@triathlon', 'idle_e', 8.0, 17, -1, 0, 0.0, false, false, false);

    await entityExist(p2);

    if (!mp.game.streaming.hasAnimDictLoaded("mini@triathlon")) {
        mp.game.streaming.requestAnimDict("mini@triathlon");
        while (!mp.game.streaming.hasAnimDictLoaded("mini@triathlon")) await mp.game.waitAsync(0);
    }

    p2.taskPlayAnim('mini@triathlon', 'idle_d', 8.0, 17, -1, 0, 0.0, false, false, false);

    await wait(1500);
    fadeIn(500);

    await mostrarTextoPequeno("¿Alguien ha dicho Boxeo?", 5000);
    await mostrarTextoPequeno("Entra al ring y pelea contra el resto", 5000);
    await mostrarTextoPequeno("Sin discriminación de género, claro...", 4000);

    fadeOut(500);
    await wait(500);

    if (mp.peds.exists(p)) {
        p.destroy();
        p = null;
    }

    if (mp.peds.exists(p2)) {
        p2.destroy();
        p2 = null;
    }

    // MEJORAS DE FACCIONES

    animacion(new mp.Vector3(-144.7972, -1504.96, 53.1973), new mp.Vector3(-2.68224, 0, 165.404), new mp.Vector3(-189.4259, -1692.5852, 46.3597), new mp.Vector3(-1.8554, 0, 167.1752), 30000);

    await wait(1500);
    fadeIn(500);

    mostrarTextoGrande("Mejoras de Facción", 25000);
    await mostrarTextoPequeno("Ahora tu facción podrá ganar Puntos de Respeto", 5000);
    await mostrarTextoPequeno("Haciendo misiones, defendiendo vuestro territorio, actividad semanal, graffitis...", 5000);
    await mostrarTextoPequeno("Las Mejoras os permitirán llevar vuestra facción al siguiente nivel", 5000);
    await mostrarTextoPequeno("Más traficantes, más miembros, más droga, robar, esposar, armas...", 4000);
    await mostrarTextoPequeno("Tú pones los límites", 5000);

    fadeOut(500);
    await wait(500);

    // CONOCIDOS

    animacion(new mp.Vector3(195.4506, -1030.27795, 77.5574), new mp.Vector3(-2.446, 0, 69.3023), new mp.Vector3(-113.9037, -913.404, 63.431), new mp.Vector3(-2.446, 0, 69.302), 30000);

    await wait(1500);
    fadeIn(500);

    mostrarTextoGrande("Sistema de Conocidos", 20000);
    await mostrarTextoPequeno("Ahora podrás llevar el control de las personas que conoces", 5000);
    await mostrarTextoPequeno("Acércate a ella y presiona la tecla U", 5000);
    await mostrarTextoPequeno("Podrás ver su nombre en el juego encima de su cabeza", 5000);
    await mostrarTextoPequeno("¿Metagaming? Ya no hay excusas", 5000);

    fadeOut(500);
    await wait(500);

    // INTERIORES

    animacion(new mp.Vector3(-300.519, 233.4159, 90.35), new mp.Vector3(-6.315, 0, 158.8459), new mp.Vector3(-288.616, 278.8080, 174.101), new mp.Vector3(-10.45, 0, 164.8), 20000);

    await wait(1500);
    fadeIn(500);

    mostrarTextoGrande("Cambios de Interiores", 15000);
    await mostrarTextoPequeno("¿Quieres cambiar el interior de tu negocio?", 5000);
    await mostrarTextoPequeno("Ahora puedes hacerlo", 5000);
    await mostrarTextoPequeno("Dirígete al manager y escoge uno de la lista disponible", 5000);

    fadeOut(500);
    await wait(500);

    // CAMBIOS VARIOS

    animacion(new mp.Vector3(254.2455, 342.322, 114.7), new mp.Vector3(-1.866, 0, -106.1916), new mp.Vector3(385.444, 308.7322, 113.9232), new mp.Vector3(-1.4416, 0, -108.2428), 20000);

    await wait(1500);
    fadeIn(500);

    await mostrarTextoPequeno("También hemos añadido algunos pequeños cambios", 4000);
    await mostrarTextoPequeno("Hemos habilitado las teclas de acceso\nrápido 5 y 6", 4000);
    await mostrarTextoPequeno("Junto a los huecos que estaban bloqueados del inventario", 4000);
    await mostrarTextoPequeno("Se pueden adquirir en el manager bajo suscripción", 4000);

    animacion(new mp.Vector3(391.3728, 298.699, 107.452), new mp.Vector3(-17.9377, 0, -140.5278), new mp.Vector3(389.9567, 280.516, 108.9012), new mp.Vector3(-24.866, 0, -47.889), 10000);

    await mostrarTextoPequeno("También puedes intentar rebuscar en la basura", 500);
    await mostrarTextoPequeno("También puedes intentar rebuscar en la basura.", 500);
    await mostrarTextoPequeno("También puedes intentar rebuscar en la basura..", 500);
    await mostrarTextoPequeno("También puedes intentar rebuscar en la basura...", 2000);
    await mostrarTextoPequeno("Quizás te encuentras algo interesante", 4000);

    fadeOut(500);
    await wait(500);

    animacion(new mp.Vector3(681.7194, -976.044, 388.331), new mp.Vector3(-15.51, 0, 82.7947), new mp.Vector3(638.2315, -225.0913, 450.126), new mp.Vector3(-16.265, 0, 131.645), 40_000);

    await wait(1000);
    fadeIn(500);

    await mostrarTextoGrande("¡" + nombre_usuario + "!", 3000);
    await mostrarTextoGrande("Nos encantaría saber qué opinas\nde esta actualización", 4000);
    await mostrarTextoGrande("¡Te leemos en nuestras redes sociales!", 3000);
    await mostrarTextoGrande("Esto solo ha sido un breve resumen\nNos es imposible explicarlo todo aquí", 4000);
    await mostrarTextoGrande("Visita nuestra página para más información", 4000);

    terminar(6000);
}
}