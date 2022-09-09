{
mp.events.add("mostrar_apartamentos", function (negocio_id, nombre, garaje, estaGaraje, apartamentos) {
    evento_mostrar_apartamentos(negocio_id, nombre, garaje, estaGaraje, apartamentos);
});

let menuApartamentos = null;

let negocioID = 0;
let apartamentos_array;
let nombreApartamentos;
let garajeApartamentos;
let propiedadElegida;
let apartamentos_json;
let estaEnGarajeAp;
let jugadorID;

function evento_mostrar_apartamentos(negocio_id, nombre, garaje, estaGaraje, apartamentos) {
    nombreApartamento = nombre;
    garajeApartamentos = garaje;
    estaEnGarajeAp = estaGaraje;
    apartamentos_json = apartamentos;
    apartamentos_array = JSON.parse(apartamentos);
    negocioID = negocio_id;

    menuApartamentos = crearMenu("Apartamentos", nombre);
    
    for (let i = 0; i < apartamentos_array.length; i++) {
        menuApartamentos.AddItem(new UIMenuItem(apartamentos_array[i].nombre, ""));
    }

    if(garajeApartamentos)
    {
        if(estaGaraje)
            menuApartamentos.AddItem(new UIMenuItem("Entrada edificio", "Acceso a la entrada principal del edificio"));
        else
            menuApartamentos.AddItem(new UIMenuItem("Garaje", "Acceso al garaje comunitario del edificio"));
    }
    
    menuApartamentos.ItemSelect.on((item, index) => {
        propiedadElegida = index;

        if(index + 1 > apartamentos_array.length)
        {
            menuApartamentos?.Close();
            mp.events.callRemote('garaje_apartamentos', negocioID);
        }
        else
        {
            menuApartamentos?.Close(true);
            evento_mostrar_apartamentos_opciones();
        }
    });

    menuApartamentos.MenuClose.on(item => {
        menuApartamentos = null;
    });
}

function evento_mostrar_apartamentos_opciones() {

    menuApartamentosOpciones = crearMenu("Apartamentos", nombreApartamento, true);
    
    menuApartamentosOpciones.AddItem(new UIMenuItem("Entrar", ""));
    if(apartamentos_array[propiedadElegida].tienellave) {
        menuApartamentosOpciones.AddItem(new UIMenuItem("Abrir", ""));
        menuApartamentosOpciones.AddItem(new UIMenuItem("Cerrar", ""));
    }
    if(apartamentos_array[propiedadElegida].venta) {
        menuApartamentosOpciones.AddItem(new UIMenuItem("Visitar", ""));
        var opcionMenu = new UIMenuItem("Comprar", "");
        opcionMenu.SetRightLabel("~g~$" + apartamentos_array[propiedadElegida].precio);
        menuApartamentosOpciones.AddItem(opcionMenu);
    }
    if(apartamentos_array[propiedadElegida].propietario) {
        var opcionMenu = new UIMenuItem("Vender", "");
        opcionMenu.SetRightLabel("~g~$" + (apartamentos_array[propiedadElegida].precio * 0.6));
        menuApartamentosOpciones.AddItem(opcionMenu);
        menuApartamentosOpciones.AddItem(new UIMenuItem("Vender a jugador", "Debera estar cerca de nosotros"));
    }

    menuApartamentosOpciones.ItemSelect.on((item, index) => {
        if(index == 0)
        {
            menuApartamentosOpciones.setVisible(false);
            menuApartamentosOpciones = null;
            mp.events.callRemote('entrar_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
            return;
        }
        if(index == 1)
        {
            if(apartamentos_array[propiedadElegida].tienellave) {
                menuApartamentosOpciones.setVisible(false);
                menuApartamentosOpciones = null;
                mp.events.callRemote('abrir_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
                return;
            }
            if(apartamentos_array[propiedadElegida].venta) {
                menuApartamentosOpciones.setVisible(false);
                menuApartamentosOpciones = null;
                mp.events.callRemote('visitar_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
                return;
            }
        }
        if(index == 2)
        {
            if(apartamentos_array[propiedadElegida].tienellave) {
                menuApartamentosOpciones.setVisible(false);
                menuApartamentosOpciones = null;
                mp.events.callRemote('cerrar_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
                return;
            }
            if(apartamentos_array[propiedadElegida].venta) {
                menuApartamentosOpciones.setVisible(false);
                menuApartamentosOpciones = null;
                mp.events.callRemote('comprar_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
                return;
            }
        }
        if(index == 3)
        {
            if(apartamentos_array[propiedadElegida].tienellave) {
                menuApartamentosOpciones.setVisible(false);
                menuApartamentosOpciones = null;
                mp.events.callRemote('vender_apartamento', negocioID, apartamentos_array[propiedadElegida].llave);
                return;
            }
        }
        if(index == 4)
        {
            if(apartamentos_array[propiedadElegida].tienellave) {
                menuApartamentosOpciones.setVisible(false, true);
                menuApartamentosOpciones = null;
                evento_mostrar_jugadores_cerca();
                return;
            }
        }
    });

    menuApartamentosOpciones.MenuClose.on(item => {
        evento_mostrar_apartamentos(negocioID, nombreApartamento, garajeApartamentos, estaEnGarajeAp, apartamentos_json);
        menuApartamentosOpciones = null;
    });
}

function evento_mostrar_jugadores_cerca() {
    var jugadores_proximos = [];

    menuApartamentosJugadores = crearMenu("Apartamentos", nombreApartamento);
    mp.players.forEachInStreamRange(function (players) {

        if (mp.controladorJugadores._jugadores[players.id]) {
            if (mp.controladorJugadores._jugadores[players.id].conectado) { // Conectado
                if (mp.controladorJugadores._jugadores[players.id].oculto == false) { // Oculto
                    var distance = mp.game.gameplay.getDistanceBetweenCoords(players.position.x, players.position.y, players.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);
                    if (distance <= 5.0 && players != player_local) {
                        menuApartamentosJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(players), ""));
                        jugadores_proximos.push(mp.controladorJugadores._jugadores[players.id].id_jugador);
                    }
                }
			}
        }
    });
    

    menuApartamentosJugadores.ItemSelect.on((item, index) => {
        menuApartamentosJugadores.setVisible(false);
        menuApartamentosJugadores = null;
        jugadorID = jugadores_proximos[index];
        mp.events.call("cantidad:mostrar", "enviarCantidad_apartamentos");
        return;
    });

    menuApartamentosJugadores.MenuClose.on(item => {
        evento_mostrar_apartamentos_opciones();
        menuApartamentosJugadores = null;
    });
}

mp.events.add("enviarCantidad_apartamentos", function(cantidad)
{
    mp.events.callRemote('vender_apartamento_jugador', negocioID, apartamentos_array[propiedadElegida].llave, jugadorID, cantidad);
});

}