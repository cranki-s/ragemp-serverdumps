{
/*
 * Autor: poleStar.
 * 
 * Descripción: Contiene los editores de objetos
 * 
 * 1.- FAST editor -> Editor rápido, orientado a sistemas como los conos
 * 2.- QUALITY editor -> Editor complejo, orientado a sistemas como amueblado de propiedades
 */

var actualObj = null; // Object entity being edited
var openEditor = false; // Defines if theres an active object editor
let furniture_cef = null; // Quality editor cef
let callBackEvent = null; // Contains the event that would be triggered when an editor saves its current object
let canSave = true; // Defines if the player can save the current object and execute the callback

let fastEditorInfo = null; // Contains { callback: string, hash: number, pos: vector3, rot: vector3 };

/**
 * Initial event to start editing an object
 * 
 * @param {number} quality Editor to use. 0 - Fast, 1 - Quality
 * @param {string} hash JSON that contains the object's hash
 * @param {string} callback String that contains the callback event name
 */
mp.events.add('startObjectEditor', (quality, hash, callback, zParam = null, distancia_adicional = null) => {
    if (typeof hash !== "string") return;
    if (typeof callback !== "string") return;

    let objectHash = JSON.parse(hash);
    callBackEvent = callback;

    if (quality == 1) {
        return;
    }
    else {
        let position = player_local.position;
        let direction = player_local.getForwardVector();
        let distanciaFinal = distancia_adicional == null ? 0.5 : 0.5 + distancia_adicional;
        let inFront = new mp.Vector3((direction.x * distanciaFinal) + (position.x), (direction.y * distanciaFinal) + (position.y), (direction.z * distanciaFinal) + (position.z - distanciaFinal));

        actualObj = mp.objects.new(objectHash, inFront,
            {
                rotation: new mp.Vector3(0.0, 0.0, 90.0),
                alpha: 0,
                dimension: player_local.dimension
            });

        let count = 0;
        let waitForObject = setInterval(() => {
            if (count >= 50) {
                mp.gui.chat.push("!{red}ERROR: !{white}No existe el objeto");

                clearInterval(waitForObject);
                waitForObject = null;
                return;
            }

            if (actualObj && mp.objects.exists(actualObj) && typeof actualObj.handle === "number" && actualObj.handle != 0 ) {
                let objZ = 0.0;
                let dimObj = mp.game.gameplay.getModelDimensions(objectHash);
                if (dimObj != undefined && dimObj != null) {
                    objZ = Math.abs(dimObj.min.z); // Dimension Z negativa del objeto
                    distanciaFinal = distanciaFinal + Math.abs(dimObj.min.y); // Dimension Y negativa del objeto, usada para separarlo del personaje
                }

                actualObj.setCollision(false, false);

                if (zParam != null) {
                    objZ += zParam;
                }

                fastEditorInfo = { hash: objectHash, callback: callback, positivo: (objectHash >= 0), pos: inFront, rot: new mp.Vector3(0.0, 0.0, 90.0), objdimension: objZ, zParam: zParam, distanciaFinal: distanciaFinal}
                fastEditor_start();

                clearInterval(waitForObject);
                waitForObject = null;
                return;
            }

            count++;
        }, 25);
	}
});

/* ---- FAST EDITOR ---- */
function fastEditor_start() {
    mp.gui.chat.push("!{white}Pulsa !{yellow}ENTER !{white}para confirmar, !{yellow}BACKSPACE !{white}para cancelar");

    openEditor = true;
    menuAbierto = true;

    mp.gui.cursor.visible = false;

    actualObj.setCollision(false, false);

    anularCamaraAFK(true);

    mp.events.add('render', fastEditor_render);
}

function fastEditor_finish(save) {
    mp.events.remove('render', fastEditor_render);

    if (save == true) {
        mp.events.callRemote(fastEditorInfo.callback, JSON.stringify(fastEditorInfo.hash), fastEditorInfo.positivo, fastEditorInfo.pos, fastEditorInfo.rot);
    }

    if (actualObj != null && mp.objects.exists(actualObj)) {
        actualObj.destroy();
        actualObj = null;
    }

    anularCamaraAFK(false);

    fastEditorInfo = null;
    openEditor = false;
    menuAbierto = false;
}

function fastEditor_render() {
    if (actualObj != null) {
        if (actualObj.getAlpha() != 204) actualObj.setAlpha(204);

        let position = player_local.position;
        let direction = player_local.getForwardVector();
        let dist_final = fastEditorInfo.distanciaFinal;
        let inFront = new mp.Vector3((direction.x * dist_final) + (position.x), (direction.y * dist_final) + (position.y), (direction.z * dist_final) + (position.z));

        // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
        let raycastPared = mp.raycasting.testPointToPoint(position, inFront, actualObj, 1);
        if (raycastPared != undefined) {
            canSave = false;

            limpiarHandleRaycast(raycastPared.entity);
        }
        else {
            canSave = true;
        }

        // Raycast desde la posicion frente al jugador hasta la misma posicion con altura 0.0
        let raycast = mp.raycasting.testPointToPoint(inFront, new mp.Vector3(inFront.x, inFront.y, inFront.z - 10.0), actualObj, 1); // Colision con mapa
        if (raycast) { // Ha tocado algo
            let entidad = raycast.entity;
            if (entidad != undefined && entidad != null) { // El resultado es válido
                let tipo = entidad.type;
                if (tipo == undefined || tipo == null) { // colision con mapa
                    inFront = new mp.Vector3(inFront.x, inFront.y, raycast.position.z + fastEditorInfo.objdimension);
                    limpiarHandleRaycast(entidad);
                }
            }
        }

        let rot = player_local.getRotation(2);

        actualObj.position = inFront;
        actualObj.rotation = rot;

        fastEditorInfo.pos = inFront;
        fastEditorInfo.rot = rot;
    }
}

// INTRO Key
mp.keys.bind(0x0D, true, () => {
    if (openEditor == false) return;
    if (actualObj == null) return;

    let testPos = actualObj.position;
    if (fastEditorInfo.zParam != null) {
        testPos.z = testPos.z + Math.abs(fastEditorInfo.zParam);
    }

    let raycast = mp.raycasting.testPointToPoint(player_local.position, testPos, null, 3); // Colision con mapa y vehiculos
    if (raycast) { // Ha tocado algo
        canSave = false;

        let entidad = raycast.entity;
        if (entidad != undefined && entidad != null) { // El resultado es válido
            let tipo = entidad.type;
            if (tipo == undefined || tipo == null) {
                limpiarHandleRaycast(entidad);
            }
        }
    }

    if (canSave == false) {
        mostrarAviso("danger", 4000, "No hay espacio suficiente para dejar el objeto");
    }
    else {
        fastEditor_finish(true);
    }
});

// BACKSPACE Key
mp.keys.bind(0x08, true, () => {
    if (openEditor == false) return;
    if (actualObj == null) return;

    fastEditor_finish(false);
});



/* ---- QUALITY EDITOR ---- */
/*
let scRes = mp.game.graphics.getScreenActiveResolution(0, 0);

const MOVE_SENSITIVTY = 50;
const ROT_SENSITIVITY = 800;

let selObj = null;
let oldPos;
let oldRot;
let mode = 'Move';
let mode2 = 'Ortogonal';
let curBtn;
let oldcursorPos = [0, 0];

let xbox;
let ybox;
let zbox;
let yzbox;
let zybox;
let xzbox;
let zxbox;
let xybox;
let yxbox;

let colision = false;

let auxMovement = 0.4; // Velocidad de la animación de las flechas


function qualityEditor_start(id_dinamica, hash) {

}

function qualityEditor_finish(id_unica, llave, hash, pos, rot) {

}

// Evento ejecutado en cada tick para dibujar lineas, cajas, textos y realizar el movimiento
function render_editor_objetos() {

}

// Evento que para selecionar el movimiento a realizar con el control por ratón
function click_editor_objetos(x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) {

}

// Funcion para cambiar el modo de movimiento movimiento/rotacion
function qualityEditor_switchMode() {
}

// Funcion para cambiar el modo de los ejes ortogonales/diagonales
function qualityEditor_changeMode() {
}

// Funcion para pegar un objeto al suelo desde su punto central
function groundObject() {

}

// Funcion para cancelar la edición, si el objeto es nuevo lo borra
function qualityEditor_cancel() {

}

// Funcion para guardar los cambios localmente
function qualityEditor_save() {

}*/

}