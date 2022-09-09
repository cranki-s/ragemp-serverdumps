{
/**
 * cef.js
 * 
 * Autor: Dries
 * 
 * Descripción: Controlador de CEFs
 */

var cefs = {};

exports.obtenerCefs = obtenerCefs;
function obtenerCefs() {
    return cefs;
}

/**
 * Crea un objeto browser (CEF) lo añade a nuestro sistema y lo muestra
 * @param {string} url 
 * @param {json} parametros 
 */
exports.crearCef = crearCef;
function crearCef(url, parametros=null, prepararCef=false) {
    let puedeCerrar = false;
    let mostrarCursor = false;
    let transicion = null;
    let sumarNumeroCefs = true;

    if (parametros != null) {
        puedeCerrar = parametros.puedeCerrar;
        mostrarCursor = parametros.mostrarCursor;
        if (parametros.sumarNumeroCefs != undefined && parametros.sumarNumeroCefs != null)
            sumarNumeroCefs = parametros.sumarNumeroCefs;
        if (parametros.transicion != undefined)
            transicion = parametros.transicion;
    }

    if (prepararCef) {
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
    }

    let browser = mp.browsers.new(url);
    let id = obtenerIdCefLibre();

    mp.gui.cursor.visible = mostrarCursor;

    if (transicion != null) {
        mp.game.graphics.transitionToBlurred(transicion);
    }

    if (sumarNumeroCefs) {
        cantidad_cefs++;
    }

    let objCef = {
        navegador: browser,
        puedeCerrar: puedeCerrar,
        url: url,
        sumarNumeroCefs: sumarNumeroCefs
    };

    cefs[id] = objCef;
    return id;
}

/**
 * Ejecuta el codigo del string 'codigo' en el cef con el id especificado
 * @param {int} id 
 * @param {string} codigo 
 */
exports.ejecutarCef = ejecutarCef;
function ejecutarCef(id, codigo) {
    if (existeCef(id)) {
        cefs[id].navegador.execute(codigo);
        return true;
    }

    return false;
}

/**
 * Devuelve un Id de cef libre para usar
 */
exports.obtenerIdCefLibre = obtenerIdCefLibre;
function obtenerIdCefLibre() {
    let id = 0;
    while (existeCef(id)) {
        id++;
    }

    return id;
}

/**
 * Devuelve si el cef con la id especificada está abierto
 * @param {int} id 
 */
exports.existeCef = existeCef;
function existeCef(id) {
    if (cefs[id] != undefined) {
        return true;
    }
    
    return false;
}

/**
 * Activa o desactiva un cef
 * @param {int} id 
 * @param {bool} estado 
 */
 exports.activarCef = activarCef;
 function activarCef(id, estado) {
     if (existeCef(id)) {
         cefs[id].navegador.active = estado;
         return true;
     }
 
     return false;
 }

/**
 * Cierra el cef (lo deja de mostrar) con la id especificada y devuelve el estado de la operacion
 * cerradoJugador indica si el cef es cerrado por el sistema o un jugador manualmente
 * @param {int} id 
 * @param {boolean} cerradoJugador 
 */
exports.cerrarCef = cerrarCef;
function cerrarCef(id, cerradoJugador=true, mostrarRadar=true, mostrarChat=true) {
    if (!existeCef(id)) {
        return false;
    } else {
        if (cerradoJugador && !cefs[id].puedeCerrar)
            return;

        if (mp.browsers.exists(cefs[id].navegador)) {
            cefs[id].navegador.destroy();
            cefs[id].navegador = null;
        }

        mp.gui.cursor.visible = false;
        mp.gui.chat.show(mostrarChat);
            
        mp.game.ui.displayHud(mostrarRadar);
        if(tipoMapa != 2) mp.game.ui.displayRadar(mostrarRadar);
        
        mp.game.graphics.transitionFromBlurred(1);

        if (cefs[id].sumarNumeroCefs) {
            cantidad_cefs--;
        }

        delete cefs[id];
        return true;
    }

    return false;
}

exports.obtenerCef = obtenerCef;
function obtenerCef(id) {
    if (id != undefined) {
        if (cefs[id] != undefined) {
            return cefs[id];
        }
    }

    return false;
}

//mp.events.add("playerCommand", (command) => {
//    const args = command.split(/[ ]+/);
//    const commandName = args[0];

//    args.shift();

//    if (commandName === "cefs") {
//        mp.gui.chat.push("Hay " + cantidad_cefs + " cefs abiertos.");
//    }
//});
}