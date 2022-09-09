{
mp.events.add("mostrar_oficinas", function (negocio_id, nombre, garaje, estaGaraje, oficinas) {
    evento_mostrar_oficinas(negocio_id, nombre, garaje, estaGaraje, oficinas);
});
let menuOficinas = null;

let negocioID = 0;
let oficinas_array;
let nombreOficinas;
let garajeOficinas;
let oficinaElegida;
let oficinas_json;
let estaEnGaraje;
let jugadorIDO;

function evento_mostrar_oficinas(negocio_id, nombre, garaje, estaGaraje, oficinas) {
    nombreOficinas = nombre;
    garajeOficinas = garaje;
    estaEnGaraje = estaGaraje;
    oficinas_json = oficinas;
    oficinas_array = JSON.parse(oficinas);
    negocioID = negocio_id;

    menuOficinas = crearMenu("Oficinas", nombre);
    
    for (let i = 0; i < oficinas_array.length; i++) {
        menuOficinas.AddItem(new UIMenuItem(oficinas_array[i].nombre, "Oficina " + oficinas_array[i].llave));
    }

    if(garajeOficinas)
    {
        if(estaGaraje)
            menuOficinas.AddItem(new UIMenuItem("Entrada edificio", "Acceso a la entrada principal del edificio"));
        else
            menuOficinas.AddItem(new UIMenuItem("Garaje", "Acceso al garaje comunitario del edificio"));
    }
    
    menuOficinas.ItemSelect.on((item, index) => {
        
        oficinaElegida = index;

        if(index + 1 > oficinas_array.length)
        {
            menuOficinas?.Close();
            mp.events.callRemote('garaje_oficinas', negocioID);
        }
        else
        {
            menuOficinas?.Close(true);
            evento_mostrar_oficinas_opciones();
        }
    });

    menuOficinas.MenuClose.on(item => {
        menuOficinas = null;
    });
}

function evento_mostrar_oficinas_opciones() {

    menuOficinasOpciones = crearMenu("Oficinas", nombreOficinas, true);
    
        menuOficinasOpciones.AddItem(new UIMenuItem("Entrar", ""));
        if(oficinas_array[oficinaElegida].tienellave) {
            menuOficinasOpciones.AddItem(new UIMenuItem("Abrir", ""));
            menuOficinasOpciones.AddItem(new UIMenuItem("Cerrar", ""));
            menuOficinasOpciones.AddItem(new UIMenuItem("Vehículos", ""));
            menuOficinasOpciones.AddItem(new UIMenuItem("Empleados", ""));
        }
        if(oficinas_array[oficinaElegida].venta) {
            var opcionMenu = new UIMenuItem("Comprar", "");
            opcionMenu.SetRightLabel("~g~$" + oficinas_array[oficinaElegida].precio);
            menuOficinasOpciones.AddItem(opcionMenu);
        }
        if(oficinas_array[oficinaElegida].propietario) {
            var opcionMenu = new UIMenuItem("Vender", "");
            opcionMenu.SetRightLabel("~g~$" + (oficinas_array[oficinaElegida].precio * 0.6));
            menuOficinasOpciones.AddItem(opcionMenu);
            menuOficinasOpciones.AddItem(new UIMenuItem("Vender a jugador", "Debera estar cerca de nosotros"));
        }

    
    menuOficinasOpciones.ItemSelect.on((item, index) => {
        if(index == 0)
        {
            menuOficinasOpciones.setVisible(false);
            menuOficinasOpciones = null;
            mp.events.callRemote('entrar_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
            return;
        }
        if(index == 1)
        {
            if(oficinas_array[oficinaElegida].tienellave) {
                menuOficinasOpciones.setVisible(false);
                menuOficinasOpciones = null;
                mp.events.callRemote('abrir_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
                return;
            }
            if(oficinas_array[oficinaElegida].venta) {
                menuOficinasOpciones.setVisible(false);
                menuOficinasOpciones = null;
                mp.events.callRemote('comprar_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
                return;
            }
        }
        if(index == 2)
        {
            menuOficinasOpciones.setVisible(false);
            menuOficinasOpciones = null;
            mp.events.callRemote('cerrar_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
            return;
        }
        if(index == 3)
        {
            if(oficinas_array[oficinaElegida].tienellave) {
                menuOficinasOpciones.setVisible(false);
                menuOficinasOpciones = null;
                mp.events.callRemote('vehiculos_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
                return;
            }
        }
        if(index == 4)
        {
            if(oficinas_array[oficinaElegida].tienellave) {
                menuOficinasOpciones.setVisible(false);
                menuOficinasOpciones = null;
                mp.events.callRemote('empleados_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
                return;
            }
        }
        if(index == 5)
        {
            if(oficinas_array[oficinaElegida].propietario) {
                menuOficinasOpciones.setVisible(false);
                menuOficinasOpciones = null;
                mp.events.callRemote('vender_oficinas', negocioID, oficinas_array[oficinaElegida].llave);
                return;
            }
        }
        if(index == 6)
        {
            if(oficinas_array[oficinaElegida].propietario) {
                menuOficinasOpciones.setVisible(false, true);
                menuOficinasOpciones = null;
                evento_mostrar_jugadores_cerca();
                return;
            }
        }
    });

    menuOficinasOpciones.MenuClose.on(item => {
        evento_mostrar_oficinas(negocioID, nombreOficinas, garajeOficinas, estaEnGaraje, oficinas_json);
        menuOficinasOpciones = null;
    });
}

function evento_mostrar_jugadores_cerca() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);

    var jugadores_proximos = [];

    menuOficinasJugadores = crearMenu("Oficinas", nombreOficinas, true);
    mp.players.forEachInStreamRange(function (players) {
        if (mp.controladorJugadores._jugadores[players.id]) {
            if (mp.controladorJugadores._jugadores[players.id].conectado) { // Conectado
                if (mp.controladorJugadores._jugadores[players.id].oculto == false) { // Oculto
                    var distance = mp.game.gameplay.getDistanceBetweenCoords(players.position.x, players.position.y, players.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);
                    if (distance <= 5.0 && players != player_local) {
                        menuOficinasJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(players), ""));
                        jugadores_proximos.push(mp.controladorJugadores._jugadores[players.id].id_jugador);
                    }
                }
			}
        }
    });
     

    menuOficinasJugadores.ItemSelect.on((item, index) => {
        menuOficinasJugadores.setVisible(false);
        menuOficinasJugadores = null;
        jugadorIDO = jugadores_proximos[index];
        mp.events.call("cantidad:mostrar", "enviarCantidad_oficinas");
        return;
    });

    menuOficinasJugadores.MenuClose.on(item => {
        evento_mostrar_oficinas_opciones();
        menuOficinasJugadores = null;
    });
}

mp.events.add("enviarCantidad_oficinas", function(cantidad)
{
    mp.events.callRemote('vender_oficina_jugador', negocioID, oficinas_array[oficinaElegida].llave, jugadorIDO, cantidad);
});

/*// Muestra el nombre de la oficina en la entrada de la misma, como GTA:O. Comentado porque está incompleto y tengo que pullear :D.

const officeRtName = "prop_ex_office_text";
const officeRtModel = mp.game.joaat("ex_prop_ex_office_text");
let officeName = "";
let officeScaleform;

mp.events.add("scaleform_oficina", function(nombre, estado)
{
    officeName = nombre;
    if(estado) {
        mp.events.add('render', mostrarNombreOficina);
    } else {
        mp.events.remove('render', mostrarNombreOficina);
    }
});

function mostrarNombreOficina() {

    mp.gui.chat.push('Esto1: ' + officeScaleform);

    if (officeScaleform === undefined) {
        officeScaleform = mp.game.graphics.requestScaleformMovie("ORGANISATION_NAME");
    }

    if (!mp.game.graphics.hasScaleformMovieLoaded(officeScaleform)) {
        return;
    }

    mp.game.graphics.callScaleformMovieMethod(officeScaleform, "SET_ORGANISATION_NAME");
    mp.game.graphics.pushScaleformMovieFunctionParameterString(officeName);

    mp.game.graphics.pushScaleformMovieFunctionParameterInt(-1);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(7);
    mp.game.graphics.popScaleformMovieFunctionVoid();

    if(!mp.game.ui.isNamedRendertargetRegistered(officeRtName)) {
        mp.game.ui.registerNamedRendertarget(officeRtName, false);
        mp.game.ui.linkNamedRendertarget(officeRtModel);
    }

    if (mp.game.ui.isNamedRendertargetLinked(officeRtModel)) {
        mp.game.ui.releaseNamedRendertarget(officeRtName);
    }
    const rtId = mp.game.ui.getNamedRendertargetRenderId(officeRtName);
    mp.game.ui.setTextRenderId(rtId);

    mp.game.graphics.drawScaleformMovie(officeScaleform, 0.196 * 2, 0.345 * 1.25, 0.46 * 2.0, 0.66 * 2.5, 255, 255, 255, 255, 1);
    mp.game.ui.setTextRenderId(mp.game.invoke('0x52F0982D7FD156B6'));
}

async function requestScaleform(scaleformName) {
    const handle = mp.game.graphics.requestScaleformMovie(scaleformName);

    while (!mp.game.graphics.hasScaleformMovieLoaded(handle)) {
        await mp.game.waitAsync(0);
    }

    return handle;
}*/
}