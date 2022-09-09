{
const coloresTuning = [
    "Negro metalizado",
    "Gris metalizado oscuro",
    "Negro metalizado ",
    "Plateado oscuro metalizado",
    "Plateado metalizado",
    "Azul plateado metalizado",
    "Gris metalizado",
    "Gris sombra metalizado",
    "Gris piedra metalizado",
    "Gris medianoche metalizado",
    "Negro metalizado ",
    "Gris antracita metalizado",
    "Negro mate",
    "Gris mate",
    "Gris claro mate",
    "Util negro",
    "Util negro poly",
    "Util plateado oscuro",
    "Util plateado",
    "Util negro metalizado",
    "Util gris sombra",
    "Negro desgastado",
    "Grafito desgastado",
    "Gris plateado desgastado",
    "Plateado desgastado",
    "Plateado azulado desgastado",
    "Gris sombra desgastado",
    "Rojo metalizado",
    "Rojo torino metalizado",
    "Rojo formula metalizado",
    "Rojo llama metalizado",
    "Rojo agraciado metalizado",
    "Rojo granate metalizado",
    "Rojo desértico metalizado",
    "Rojo cabernet metalizado",
    "Rojo caramelo metalizado",
    "Naranja atardecer metalizado",
    "Oro clásico metalizado",
    "Naranja metalizado",
    "Rojo mate",
    "Rojo oscuro mate",
    "Naranja mate",
    "Amarillo mate",
    "Util rojo",
    "Util rojo claro",
    "Util rojo granate",
    "Rojo desgastado",
    "Rojo dorado desgastado",
    "Rojo oscuro desgastado",
    "Verde oscuro metalizado",
    "Verde de carreras metaliado",
    "Verde del mar metalizado",
    "Verde oliva metalizado",
    "Verde metalizado",
    "Fosforito gasolina metalizado",
    "Verde lima metalizado",
    "Util verde oscuro",
    "Util verde",
    "Verde oscuro desgastado",
    "Verde desgastado",
    "Verde del mar desgastado",
    "Azul medianoche metalizado",
    "Azul oscuro metalizado",
    "Azul de sajonia metalizado",
    "Azul metalizado",
    "Azul marino metalizado",
    "Azul puerto metalizado",
    "Azul diamante metalizado",
    "Azul surfero metalizado",
    "Azul náutico metalizado",
    "Azul brillante metalizado",
    "Azul púrpura metalizado",
    "Azul spinnaker metalizado",
    "Azul ultra metalizado",
    "Azul brillante metalizado ",
    "Util azul oscuro",
    "Util azul medianoche",
    "Util azul",
    "Util azul espuma de mar",
    "Util azul relámpago",
    "Util azul Maui",
    "Util azul brillante",
    "Azul oscuro mate",
    "Azul mate",
    "Azul medianoche mate",
    "Azul oscuro desgastado",
    "Azul desgastado",
    "Azul claro desgastado",
    "Amarillo taxi metalizado",
    "Amarillo de carreras metalizado",
    "Bronce metalizado",
    "Amarillo pájaro metalizado",
    "Lima metalizado",
    "Champagne metalizado",
    "Beige pueblo metalizado",
    "Marfil oscuro metalizado",
    "Marrón chocolate metalizado",
    "Marrón dorado metalizado",
    "Marrón claro metalizado",
    "Beige paja metalizado",
    "Marrón musgo metalizado",
    "Marrón boston metalizado",
    "Marrón madera metalizado",
    "Marrón madera oscuro metalizado",
    "Naranja chocolate metalizado",
    "Arena de playa metalizado",
    "Arena tostada metalizado",
    "Crema metalizado",
    "Util marrón",
    "Util marrón medio",
    "Util marrón claro",
    "Blanco metalizado",
    "Blanco helado metalizado",
    "Beige miel metalizado",
    "Marrón desgastado",
    "Marrón oscuro desgastado",
    "Beige paja desgastado",
    "Acero cepillado",
    "Acero negro cepillado",
    "Aluminio cepillado",
    "Cromado",
    "Blanco desgastado",
    "Util blanco desgastado",
    "Naranja desgastado",
    "Naranja claro desgastado",
    "Verde Securicor metalizado",
    "Amarillo taxi desgastado",
    "Azul policía",
    "Verde mate",
    "Marrón mate",
    "Naranja desgastado",
    "Blanco mate",
    "Blanco desgastado",
    "Verde oliva militar desgastado",
    "Blanco puro",
    "Rosa caliente",
    "Rosa salmón",
    "Rojo bermellón metalizado",
    "Naranja",
    "Verde",
    "Azul",
    "Azul negro metalizado",
    "Púrpura negro metalizado",
    "Rojo negro metalizado",
    "Verde cazador",
    "Púrpura metalizado",
    "Azul oscuro metalizado",
    "Negro",
    "Prúpura mate",
    "Prúpura oscuro mate",
    "Rojo lava metalizado",
    "Verde del bosque mate",
    "Verde olive mate",
    "Marrón desértico mate",
    "Bronceado del desierto mate",
    "Verde del follaje mate",
    "Aleación por defecto",
    "Azul Epsilon",
    "Oro puro",
    "Oro pulido"
];

// EVENTOS

mp.events.add("menu_taller", function (datos) {
    menu_taller(datos)
});

mp.events.add("mecanico_confirmar_tuning", function (sprite, usuario, cambios, esMecanico, vehiculo) {
    mecanico_confirmar_tuning(sprite, usuario, cambios, esMecanico, vehiculo)
});

mp.events.add("mostrar_servicios_grua", function (datos) {
    mostrar_servicios_grua(datos)
});


// VARIABLES

var serviciosGrua = [];

var menuTaller = null;
var mecanicosTaller = null;

var finalizarMecanico = null;

var menuMatricula = null;

var usuariosID = [];

let esTallerMaquina = false;

var opcionSeleccionada;
var usuarioSeleccionado;

var resultadoSprite = {libreria: "", sprite: ""};
var negocio_id = 0;

var urlApi;
var apiKey;

// /taller CLIENTES
function menu_taller(datos) {
    usuariosID = []; // limpiamos la lista antes de hacer el subnormal y usarla con otras mierdas
    let datos_array = JSON.parse(datos);
    
    tipoSprite = datos_array[0];
    negocio_id = datos_array[1];
    urlApi = datos_array[2];
    apiKey = datos_array[3];
    esMecanico = datos_array[4];
    esTallerMaquina = datos_array[5];

    resultadoSprite = intEstilo(tipoSprite);

    menuTaller = crearMenu("Taller", "Elige una opción del taller", false, resultadoSprite.libreria, resultadoSprite.sprite);

    let repararMotor = new UIMenuItem("Reparar motor", "Reparar el motor del vehículo");
    menuTaller.AddItem(repararMotor);
    let repararChapa = new UIMenuItem("Reparar chapa", "Reparar la chapa del vehículo");
    menuTaller.AddItem(repararChapa);
    let repararRuedas = new UIMenuItem("Reparar ruedas", "Reparar las ruedas del vehículo");
    menuTaller.AddItem(repararRuedas);
    let cambiarCerradura = new UIMenuItem("Cambiar cerradura", "Cambiar la cerradura del vehículo");
    menuTaller.AddItem(cambiarCerradura);
    let diagnosis = new UIMenuItem("Diagnosis", "Inspecciona el vehículo");
    menuTaller.AddItem(diagnosis);
    let estiloMatricula = new UIMenuItem("Estilo matrícula", "Modifica el estilo de la matrícula del vehículo");
    menuTaller.AddItem(estiloMatricula);
    let pintar = new UIMenuItem("Pintar", "Pinta el vehículo");
    menuTaller.AddItem(pintar);
    let tuning = new UIMenuItem("Tuning", "Modifica el vehículo");
    menuTaller.AddItem(tuning);
    if (esMecanico) {
        let ropa = new UIMenuItem("Ropa", "Te pones/quitas tu mono de mecánico");
        menuTaller.AddItem(ropa);
        let deServicio = aplicarColores(new UIMenuItem("De servicio", "Entras o sales de servicio como mecánico"), "Verde");
        menuTaller.AddItem(deServicio);
    }

    if (player_local.vehicle)
    {
        mp.events.callRemote("vehiculo:actualizar_vida", player_local.vehicle.getBodyHealth());
    }

    menuTaller.ItemSelect.on((item, index) => {

        if (index < 8) {
            menuTaller?.Close(true);
            opcionSeleccionada = index;
            menu_elegir_mecanicos();
            return;
        }
        else if(index == 8 || index == 9){
            opcionSeleccionada = index;
            mp.events.callRemote("escoger_menu_taller", opcionSeleccionada, -1, 0, 0, -1, -1);
        }
        else
            opcionSeleccionada = -1;

        menuTaller?.Close();
        
    });

    menuTaller.MenuClose.on(item => {
        menuTaller = null;
    });
}

function menu_elegir_mecanicos() {
    mecanicosTaller = crearMenu("Mecánicos", "Elige un mecanico cercano", false, resultadoSprite.libreria, resultadoSprite.sprite);

    if (esTallerMaquina == true) {
        let jugador = mp.controladorJugadores._jugadores[player_local.id];
        if (jugador != undefined && jugador != null) {
            mecanicosTaller.AddItem(new UIMenuItem(jugador.nombre_personaje, ""));
            usuariosID.push(jugador.id_jugador);
        }
    }
    else {
        for (let i = 0; i < mp.players.streamed.length; i++) {
            const player = mp.players.streamed[i];
            if (calcDist(player.position, player_local.position) > 3.0) {
                continue;
            }
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador) {
                if (jugador.deservicio){
                    let listaTrabajos = jugador.trabajos;
                    for (tId of listaTrabajos) {
                        if (tId == 9) {
                            mecanicosTaller.AddItem(new UIMenuItem(obtenerNombreConocido(player), ""));
                            usuariosID.push(jugador.id_jugador);
                        }
                    }
                }
            }
        }
    }

    mecanicosTaller.ItemSelect.on((item, index) => {
        
        usuarioSeleccionado = usuariosID[index];
        if (opcionSeleccionada < 5) {
            if (player_local.vehicle){
                mecanicosTaller?.Close();
                mp.events.callRemote("escoger_menu_taller", opcionSeleccionada, usuarioSeleccionado, 0, 0, -1, -1);
            } 
            else mostrarAviso("danger", 5000, "No estás en un vehículo");
        }
        if (opcionSeleccionada == 5){
            if(player_local.vehicle){
                mecanicosTaller?.Close(true);
                mostrar_menu_matricula();
            } 
            else mostrarAviso("danger", 5000, "No estás en un vehículo");
        }
        if (opcionSeleccionada == 6){
            if(player_local.vehicle) {
                mecanicosTaller?.Close(true);
                mostrar_menu_pintura();
            } 
            else mostrarAviso("danger", 5000, "No estás en un vehículo");
        }
        if (opcionSeleccionada == 7) {
            mecanicosTaller?.Close();
            mp.events.call("iniciarTuning", usuarioSeleccionado, negocio_id, true, urlApi, apiKey);
        }
    });

    mecanicosTaller.MenuClose.on(item => {
        mecanicosTaller = null;
    });
}

function mecanico_confirmar_tuning(sprite, usuario, cambios, esMecanico, vehiculo) {

    tipoSprite = sprite;
    usuarioSeleccionado = usuario;

    let array_cambios = JSON.parse(cambios);
    let totalPrecio = 0;
    
    resultadoSprite = intEstilo(tipoSprite);
    finalizarMecanico = crearMenu("Cambios cliente", "", false, resultadoSprite.libreria, resultadoSprite.sprite);

    Object.entries(array_cambios).forEach(([key, c]) => {
        var item = new UIMenuItem(c.categoria + " (" + c.valor + ")", "Precio: " + parseInt(c.precio));
        item.SetRightBadge(BadgeStyle.Tick);
        finalizarMecanico.AddItem(item);
        totalPrecio = parseInt(totalPrecio) + parseInt(c.precio);
    });

    var item2 = null;
    if (esMecanico) item2 = aplicarColores(new UIMenuItem("Aceptar", "Aceptas y se aplican todos los cambios en el vehiculo."), "Verde");
    else item2 = aplicarColores(new UIMenuItem("Aceptar", "Aceptas y se aplican todos los cambios en el vehiculo, se te descontará el precio en tu cuenta bancaria."), "Verde");
    item2.SetRightLabel(totalPrecio + "$");
    finalizarMecanico.AddItem(item2);
    finalizarMecanico.AddItem(new UIMenuItem("Cancelar", "Cancelas el tuneo y no se aplican los cambios en el vehiculo."));

    finalizarMecanico.ItemSelect.on((item, index) => {
        if (item.Text == "Aceptar") {
            mp.events.callRemote("tuning_mecanico_aceptado", usuarioSeleccionado, JSON.stringify(array_cambios), vehiculo);
            mp.events.call("tuning:cerrar:preview");

            player_local.freezePosition(false);
            finalizarMecanico.setVisible(false);
            finalizarMecanico = null;
        }
        else if (item.Text == "Cancelar"){
            finalizarMecanico?.Close();
        }
    });

    finalizarMecanico.MenuClose.on(item => {
        finalizarMecanico = null;

        mp.events.callRemote("tuning_mecanico_cancelar", usuarioSeleccionado);
        mp.events.call("tuning:cerrar:preview");

        player_local.freezePosition(false);
    });
}

function mostrar_menu_matricula(){
    menuMatricula = crearMenu("Estilo matrícula", "", false, resultadoSprite.libreria, resultadoSprite.sprite);

    var estiloMatricula = player_local.vehicle.getPlateType();
    let reestablecerMatricula = true;
    var item = new UIMenuItem("Opcion 0", "");
    if (estiloMatricula == 0)
        item.SetRightBadge(BadgeStyle.Car);
    else
        item.SetRightLabel("500$");
    menuMatricula.AddItem(item);

    item = new UIMenuItem("Opcion 1", "");
    if (estiloMatricula == 1)
        item.SetRightBadge(BadgeStyle.Car);
    else
        item.SetRightLabel("500$");
    menuMatricula.AddItem(item);

    item = new UIMenuItem("Opcion 2", "");
    if (estiloMatricula == 2)
        item.SetRightBadge(BadgeStyle.Car);
    else
        item.SetRightLabel("500$");
    menuMatricula.AddItem(item);

    item = new UIMenuItem("Opcion 3", "");
    if (estiloMatricula == 3)
        item.SetRightBadge(BadgeStyle.Car);
    else
        item.SetRightLabel("500$");
    menuMatricula.AddItem(item);

    item = new UIMenuItem("Opcion 4", "");
    if (estiloMatricula == 4)
        item.SetRightBadge(BadgeStyle.Car);
    else
        item.SetRightLabel("500$");
    menuMatricula.AddItem(item);

    // item = new UIMenuItem("Opcion 5", ""); // Matrícula de Yakton
    // if (estiloMatricula == 5)
    //     item.SetRightBadge(BadgeStyle.Car);
    // else
    //     item.SetRightLabel("500$");
    // menuMatricula.AddItem(item);

    menuMatricula.IndexChange.on(index => {
        let i = parseInt(index);
        player_local.vehicle.setNumberPlateTextIndex(i);
    });

    menuMatricula.ItemSelect.on((item, index) => {
        reestablecerMatricula = false;
        menuMatricula?.Close();
        mp.events.callRemote("escoger_menu_mecanico_matricula", usuarioSeleccionado, index, 500, esTallerMaquina);
    });

    menuMatricula.MenuClose.on(item => {
        if(reestablecerMatricula && player_local.vehicle){
            player_local.vehicle.setNumberPlateTextIndex(estiloMatricula);
        }
        menuMatricula = null;
    });
}

function mostrar_menu_pintura(){

    let menuPintura = crearMenu("Pintar vehículo", "", false, resultadoSprite.libreria, resultadoSprite.sprite);
    let coloresCoche = { colorPrimary: 0, colorSecondary: 0};
    let coloresOriginales = { colorPrimary: 0, colorSecondary: 0};
    if(player_local.vehicle){
        coloresCoche = player_local.vehicle.getColours(0, 0);
        coloresOriginales = player_local.vehicle.getColours(0, 0);
    }
    let pintar = false;
    let coloresPrim;
    let coloresSec;
    let coloresDash;
    let coloresTrim;
    let colorIndex = [];
    for(let i = 0, n = coloresTuning.length; i < n; i++)
    {
        colorIndex.push(i.toString());
    }

    let colorPrimario = coloresTuning[coloresCoche.colorPrimary].toString();
    let colorSecundario = coloresTuning[coloresCoche.colorSecondary].toString();
    coloresPrim = new UIMenuListItem(colorPrimario, "Color primario de la carrocería", new ItemsCollection(colorIndex), coloresCoche.colorPrimary);
    coloresSec = new UIMenuListItem(colorSecundario, "Color secundario de la carrocería", new ItemsCollection(colorIndex), coloresCoche.colorSecondary);

    let colorDashActivo = 0;
    if (player_local.vehicle.propiedades && player_local.vehicle.propiedades.colorcuadro != -1) {
        colorDashActivo = player_local.vehicle.propiedades.colorcuadro;
        if (typeof colorDashActivo !== "number" || colorDashActivo < 0 || colorDashActivo > 159) {
            colorDashActivo = 0;
        }
    }

    let colorTrimActivo = 0;
    if (player_local.vehicle.propiedades && player_local.vehicle.propiedades.colorsalpicadero != -1) {
        colorTrimActivo = player_local.vehicle.propiedades.colorsalpicadero;
        if (typeof colorTrimActivo !== "number" || colorTrimActivo < 0 || colorTrimActivo > 159) {
            colorTrimActivo = 0;
        }
    }

    let colorDash = coloresTuning[colorDashActivo].toString();
    let colorTrim = coloresTuning[colorTrimActivo].toString();
    coloresTrim = new UIMenuListItem(colorTrim, "Color del interior", new ItemsCollection(colorIndex), colorTrimActivo);
    coloresDash = new UIMenuListItem(colorDash, "Color del cuadro de instrumentos", new ItemsCollection(colorIndex), colorDashActivo);

    menuPintura.AddItem(coloresPrim);
    menuPintura.AddItem(coloresSec);
    menuPintura.AddItem(coloresTrim);
    menuPintura.AddItem(coloresDash);
    menuPintura.AddItem(aplicarColores(new UIMenuItem("Aceptar", "Confirma los colores de pintura del vehículo"), "Verde"));
    menuPintura.AddItem(new UIMenuItem("Cancelar", "Cancela los cambios de pintura del vehículo"));

    menuPintura.ItemSelect.on((item, index) => {
        if (item.Text == "Aceptar") {
            pintar = true;
            if (player_local.vehicle) {
                let color3 = -1;
                if (player_local.vehicle.propiedades && player_local.vehicle.propiedades.colorsalpicadero != -1) {
                    color3 = player_local.vehicle.propiedades.colorsalpicadero;
                }
                if (color3 == colorTrimActivo) {
                    color3 = -1; // Para no cambiarle este color si no lo ha cambiado en el menu
                } else {
                    color3 = colorTrimActivo;
                }

                let color4 = -1;
                if (player_local.vehicle.propiedades && player_local.vehicle.propiedades.colorcuadro != -1) {
                    color4 = player_local.vehicle.propiedades.colorcuadro;
                }
                if (color4 == colorDashActivo) {
                    color4 = -1; // Para no cambiarle este color si no lo ha cambiado en el menu
                } else {
                    color4 = colorDashActivo;
                }

                mp.events.callRemote("escoger_menu_taller", opcionSeleccionada, usuarioSeleccionado, coloresCoche.colorPrimary, coloresCoche.colorSecondary, color3, color4);
            }
            menuPintura?.Close();
        } else if (item.Text == "Cancelar") {
            pintar = false;
            menuPintura?.Close();
        }
    });
    let priCol = -1;
    let secCol = -1;
    menuPintura.ListChange.on((UIMenuListItem, index) => {
        if (player_local.vehicle) {
            if (UIMenuListItem == coloresPrim) {
                priCol = parseInt(UIMenuListItem.SelectedValue);
                UIMenuListItem._text.caption = coloresTuning[priCol];
                if (secCol == -1) {
                    player_local.vehicle.setColours(parseInt(priCol), parseInt(coloresCoche.colorSecondary));
                    coloresCoche.colorPrimary = parseInt(priCol);
                }
                else {
                    player_local.vehicle.setColours(parseInt(priCol), parseInt(secCol));
                    coloresCoche.colorPrimary = parseInt(priCol);
                    coloresCoche.colorSecondary = parseInt(secCol);
                }
            }
            else if (UIMenuListItem == coloresSec) {
                secCol = parseInt(UIMenuListItem.SelectedValue);
                UIMenuListItem._text.caption = coloresTuning[secCol];
                if (priCol == -1) {
                    player_local.vehicle.setColours(parseInt(coloresCoche.colorPrimary), parseInt(secCol));
                    coloresCoche.colorSecondary = parseInt(secCol);
                }
                else {
                    player_local.vehicle.setColours(parseInt(priCol), parseInt(secCol));
                    coloresCoche.colorPrimary = parseInt(priCol);
                    coloresCoche.colorSecondary = parseInt(secCol);
                }
            }
            else if (UIMenuListItem == coloresTrim) {
                colorTrimActivo = parseInt(UIMenuListItem.SelectedValue);
                UIMenuListItem._text.caption = coloresTuning[colorTrimActivo];
                if (typeof player_local.vehicle.handle === "number" && player_local.vehicle.handle != 0) {
                    mp.game.invoke("0xF40DD601A65F7F19", player_local.vehicle.handle, colorTrimActivo);
                }
            }
            else if (UIMenuListItem == coloresDash) {
                colorDashActivo = parseInt(UIMenuListItem.SelectedValue);
                UIMenuListItem._text.caption = coloresTuning[colorDashActivo];
                if (typeof player_local.vehicle.handle === "number" && player_local.vehicle.handle != 0) {
                    mp.game.invoke("0x6089CDF6A57F326C", player_local.vehicle.handle, colorDashActivo);
                }
            }
        }
    });

    menuPintura.MenuClose.on(item => {
        if (player_local.vehicle) {
            // Si cancelan ponemos los colores antiguos
            if (!pintar) {
                player_local.vehicle.setColours(parseInt(coloresOriginales.colorPrimary), parseInt(coloresOriginales.colorSecondary));
                if (typeof player_local.vehicle.handle === "number" && player_local.vehicle.handle != 0) {
                    if ("number" === typeof player_local.vehicle.propiedades.colorsalpicadero) {
                        let originalSalpicadero = player_local.vehicle.propiedades.colorsalpicadero == -1 ? 0 : player_local.vehicle.propiedades.colorsalpicadero;
                        if (originalSalpicadero >= 0 && originalSalpicadero < 160) {
                            mp.game.invoke("0xF40DD601A65F7F19", player_local.vehicle.handle, originalSalpicadero);
                        }
                    }

                    if ("number" === typeof player_local.vehicle.propiedades.colorcuadro) {
                        let originalCuadro = player_local.vehicle.propiedades.colorcuadro == -1 ? 0 : player_local.vehicle.propiedades.colorcuadro;
                        if (originalCuadro >= 0 && originalCuadro < 160) {
                            mp.game.invoke("0x6089CDF6A57F326C", player_local.vehicle.handle, originalCuadro);
                        }
                    }
                }
            }
        }

        menuPintura = null;
    });
}

function mostrar_servicios_grua(datos){
    datos = JSON.parse(datos);
    if (datos.length <= 0){
        mostrarAviso("danger", 5000, "No hay avisos disponibles");
        return;
    }

    let menuGruas = crearMenu("Grúas", "Servicios disponibles");

    for(let i = 0; i < datos.length; i++){
        var item = new UIMenuItem(datos[i].matricula + " (" + datos[i].llave + ")", datos[i].modelo);
        serviciosGrua.push(datos[i].idServicio);
        menuGruas.AddItem(item);
    }

    menuGruas.ItemSelect.on((item, index) => {
        menuGruas?.Close();
        let indexElegido = serviciosGrua[index];
        mp.events.callRemote("escoger_servicio_grua", indexElegido);
    });

    menuGruas.MenuClose.on(item => {
        menuGruas = null;
    });
}

}