{
/*
 * Solucion al problema de la 1.1 de crear vehiculos en C# cliente. (Lo creaba y al instante la entidad dejaba de existir)
 * 
 * Este archivo se encarga solo de controlar la preview de vehiculos. 
 * En C# seguimos realizando todo el control de menus, indices, venta, compra...
 */

let vehiculoNuevo = null;
let timerRotacion = null;
const colores = [
    ["Negro metalizado", 0],
    ["Gris metalizado oscuro", 1],
    ["Negro metalizado 2", 2],
    ["Plateado oscuro metalizado", 3],
    ["Plateado metalizado", 4],
    ["Azul plateado metalizado", 5],
    ["Gris metalizado", 6],
    ["Gris sombra metalizado", 7],
    ["Gris piedra metalizado", 8],
    ["Gris medianoche metalizado", 9],
    ["Negro metalizado 3", 10],
    ["Gris antracita metalizado", 11],
    ["Negro mate", 12],
    ["Gris mate", 13],
    ["Gris claro mate", 14],
    ["Util negro", 15],
    ["Util negro poly", 16],
    ["Util plateado oscuro", 17],
    ["Util plateado", 18],
    ["Util negro metalizado", 19],
    ["Util gris sombra", 20],
    ["Negro desgastado", 21],
    ["Grafito desgastado", 22],
    ["Gris plateado desgastado", 23],
    ["Plateado desgastado", 24],
    ["Plateado azulado desgastado", 25],
    ["Gris sombra desgastado", 26],
    ["Rojo metalizado", 27],
    ["Rojo torino metalizado", 28],
    ["Rojo formula metalizado", 29],
    ["Rojo llama metalizado", 30],
    ["Rojo agraciado metalizado", 31],
    ["Rojo granate metalizado", 32],
    ["Rojo desértico metalizado", 33],
    ["Rojo cabernet metalizado", 34],
    ["Rojo caramelo metalizado", 35],
    ["Naranja atardecer metalizado", 36],
    ["Oro clásico metalizado", 37],
    ["Naranja metalizado", 38],
    ["Rojo mate", 39],
    ["Rojo oscuro mate", 40],
    ["Naranja mate", 41],
    ["Amarillo mate", 42],
    ["Util rojo", 43],
    ["Util rojo claro", 44],
    ["Util rojo granate", 45],
    ["Rojo desgastado", 46],
    ["Rojo dorado desgastado", 47],
    ["Rojo oscuro desgastado", 48],
    ["Verde oscuro metalizado", 49],
    ["Verde de carreras metaliado", 50],
    ["Verde del mar metalizado", 51],
    ["Verde oliva metalizado", 52],
    ["Verde metalizado", 53],
    ["Fosforito gasolina metalizado", 54],
    ["Verde lima metalizado", 55],
    ["Util verde oscuro", 56],
    ["Util verde", 57],
    ["Verde oscuro desgastado", 58],
    ["Verde desgastado", 59],
    ["Verde del mar desgastado", 60],
    ["Azul medianoche metalizado", 61],
    ["Azul oscuro metalizado", 62],
    ["Azul de sajonia metalizado", 63],
    ["Azul metalizado", 64],
    ["Azul marino metalizado", 65],
    ["Azul puerto metalizado", 66],
    ["Azul diamante metalizado", 67],
    ["Azul surfero metalizado", 68],
    ["Azul náutico metalizado", 69],
    ["Azul brillante metalizado", 70],
    ["Azul púrpura metalizado", 71],
    ["Azul spinnaker metalizado", 72],
    ["Azul ultra metalizado", 73],
    ["Azul brillante metalizado 2", 74],
    ["Util azul oscuro", 75],
    ["Util azul medianoche", 76],
    ["Util azul", 77],
    ["Util azul espuma de mar", 78],
    ["Util azul relámpago", 79],
    ["Util azul Maui", 80],
    ["Util azul brillante", 81],
    ["Azul oscuro mate", 82],
    ["Azul mate", 83],
    ["Azul medianoche mate", 84],
    ["Azul oscuro desgastado", 85],
    ["Azul desgastado", 86],
    ["Azul claro desgastado", 87],
    ["Amarillo taxi metalizado", 88],
    ["Amarillo de carreras metalizado", 89],
    ["Bronce metalizado", 90],
    ["Amarillo pájaro metalizado", 91],
    ["Lima metalizado", 92],
    ["Champagne metalizado", 93],
    ["Beige pueblo metalizado", 94],
    ["Marfil oscuro metalizado", 95],
    ["Marrón chocolate metalizado", 96],
    ["Marrón dorado metalizado", 97],
    ["Marrón claro metalizado", 98],
    ["Beige paja metalizado", 99],
    ["Marrón musgo metalizado", 100],
    ["Marrón boston metalizado", 101],
    ["Marrón madera metalizado", 102],
    ["Marrón madera oscuro metalizado", 103],
    ["Naranja chocolate metalizado", 104],
    ["Arena de playa metalizado", 105],
    ["Arena tostada metalizado", 106],
    ["Crema metalizado", 107],
    ["Util marrón", 108],
    ["Util marrón medio", 109],
    ["Util marrón claro", 110],
    ["Blanco metalizado", 111],
    ["Blanco helado metalizado", 112],
    ["Beige miel metalizado", 113],
    ["Marrón desgastado", 114],
    ["Marrón oscuro desgastado", 115],
    ["Beige paja desgastado", 116],
    ["Acero cepillado", 117],
    ["Acero negro cepillado", 118],
    ["Aluminio cepillado", 119],
    ["Cromado", 120],
    ["Blanco desgastado", 121],
    ["Util blanco desgastado", 122],
    ["Naranja desgastado", 123],
    ["Naranja claro desgastado", 124],
    ["Verde Securicor metalizado", 125],
    ["Amarillo taxi desgastado", 126],
    ["Azul policía", 127],
    ["Verde mate", 128],
    ["Marrón mate", 129],
    ["Naranja desgastado", 130],
    ["Blanco mate", 131],
    ["Blanco desgastado", 132],
    ["Verde oliva militar desgastado", 133],
    ["Blanco puro", 134],
    ["Rosa caliente", 135],
    ["Rosa salmón", 136],
    ["Rojo bermellón metalizado", 137],
    ["Naranja", 138],
    ["Verde", 139],
    ["Azul", 140],
    ["Azul negro metalizado", 141],
    ["Púrpura negro metalizado", 142],
    ["Rojo negro metalizado", 143],
    ["Verde cazador", 144],
    ["Púrpura metalizado", 145],
    ["Azul oscuro metalizado", 146],
    ["Negro", 147],
    ["Púrpura mate", 148],
    ["Púrpura oscuro mate", 149],
    ["Rojo lava metalizado", 150],
    ["Verde del bosque mate", 151],
    ["Verde olive mate", 152],
    ["Marrón desértico mate", 153],
    ["Bronceado del desierto mate", 154],
    ["Verde del follaje mate", 155],
    ["Aleación por defecto", 156],
    ["Azul Epsilon", 157],
    ["Oro puro", 158],
    ["Oro pulido", 159]
];

// Crea el vehículo
function crearCoche(hash, posicionEntrega, rotacionEntrega, dim) {
    vehiculoNuevo = mp.vehicles.new(hash, posicionEntrega, {
        heading: rotacionEntrega,
        numberPlate: '',
        alpha: 255,
        locked: false,
        engine: false,
        dimension: dim
    });
}

// Borra el vehículo actual
function borrarCoche() {
    if (vehiculoNuevo != null) {
        if (mp.vehicles.exists(vehiculoNuevo))
            vehiculoNuevo.destroy();
        vehiculoNuevo = null;
    }
}

// Aplica el color seleccionado
function cambiarColor(color1, color2) {
    if (vehiculoNuevo != null) {
        vehiculoNuevo.setColours(colores[color1][1], colores[color2][1]);
    }
}

// Aplica el color seleccionado
function cambiarColorDashboard(color) {
    if (vehiculoNuevo != null && typeof vehiculoNuevo.handle === "number" && vehiculoNuevo.handle != 0) {
        mp.game.invoke("0x6089CDF6A57F326C", vehiculoNuevo.handle, colores[color][1]);
    }
}

// Aplica el color seleccionado
function cambiarColorTrim(color) {
    if (vehiculoNuevo != null && typeof vehiculoNuevo.handle === "number" && vehiculoNuevo.handle != 0) {
        mp.game.invoke("0xF40DD601A65F7F19", vehiculoNuevo.handle, colores[color][1]);
    }
}

// Cambia livery (solo funciona con vehiculos de emergencias, solo esta en uso con "ambulance3")
function cambiarLivery(id) {
    if (vehiculoNuevo != null) {
        vehiculoNuevo.setLivery(id);
    }
}

// Crea una luz encima del coche para dejarlo bien iluminado
let renderLuzActivo = false;
function dibujarLuz(bool) {
    if (bool == false) {
        renderLuzActivo = true;
        mp.events.add("render", renderLuz);
    }
    else {
        renderLuzActivo = false;
        mp.events.remove("render", renderLuz);
    }
}

// Render que mantiene la luz del concesionario
function renderLuz() {
    if (posicionCamara != null && camaraCompra != null) {
        let direction = camaraCompra.getDirection();
        mp.game.graphics.drawSpotLightWithShadow(posicionCamara.x, posicionCamara.y, posicionCamara.z, direction.x, direction.y, direction.z, 255, 255, 255, 15.0, 2.0, 1.0, 50.0, 1.0, 1.0);
    }
}

// streamIn activado cuando se entra a la preview de un concesionario, deja el coche en el suelo tan pronto como es posible
async function streamInConcesionario(entity) {
    if (entity == vehiculoNuevo) {
        entity.freezePosition(true);
        entity.setOnGroundProperly(5.0); // No esta en la wiki pero los scripts decompilados muestran float 5.0 siempre como parametro
    }
}

function probandoVehiculoConce(activo) {
    if (activo == true) {
        player_local.setCanBeKnockedOffVehicle(1);
        player_local.setConfigFlag(32, false);
    }
    else {
        player_local.setCanBeKnockedOffVehicle(0);
        player_local.setConfigFlag(32, true);
        mp.events.remove("pruebaVehConce", probandoVehiculoConce);
    }
}

/*
 * Teclas
 */
// A (rotacion del vehiculo)
mp.keys.bind(0x41, true, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (vehiculoNuevo != null) {
        if (timerRotacion != null) {
            clearInterval(timerRotacion);
            timerRotacion = null;
        }
        timerRotacion = setInterval(function () {
            if (vehiculoNuevo != null) {
                vehiculoNuevo.setHeading(vehiculoNuevo.getHeading() - 1.0);
            }
            else {
                clearInterval(timerRotacion);
                timerRotacion = null;
            }
                
        }, 10);
    }
});
mp.keys.bind(0x41, false, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (vehiculoNuevo != null) {
        if (timerRotacion != null) {
            clearInterval(timerRotacion);
            timerRotacion = null;
        }
    }
});

//D (rotacion del vehiculo)
mp.keys.bind(0x44, true, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (vehiculoNuevo != null) {
        if (timerRotacion != null) {
            clearInterval(timerRotacion);
        }
        timerRotacion = setInterval(function () {
            if (vehiculoNuevo != null) {
                vehiculoNuevo.setHeading(vehiculoNuevo.getHeading() + 1.0);
            }
            else {
                clearInterval(timerRotacion);
                timerRotacion = null;
            }
        }, 10);
    }
});
mp.keys.bind(0x44, false, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (vehiculoNuevo != null) {
        if (timerRotacion != null) {
            clearInterval(timerRotacion);
            timerRotacion = null;
        }
    }
});


/*
 * Descripcion: Contiene el menú de concesionario
 */

let cochesMenuCompra = []; // list String
let cochesMenuVender = []; // list int
let modeloSeleccionado = "";
let nombreConce = "";
let posicionEntrega = new mp.Vector3(0.0, 0.0, 0.0);
let rotacionEntrega = new mp.Vector3(0.0, 0.0, 0.0);
let posicionCamara = new mp.Vector3(0.0, 0.0, 0.0);
let dimensionPreview = 0;

let camaraCompra = null;

let vehiculosConce = []; // array object
let vehiculos_propios = []; // array object

let Concesionario = null; // UIMenu
let Compra = null; // UIMenu
let Vender = null; // UIMenu
let OpcionesCompra = null; // UIMenu
let listaColoresPrim = null; // UIMenuListItem
let listaColoresSecun = null; // UIMenuListItem
let listaColoresTrim = null; // UIMenuListItem
let listaColoresDashboard = null; // UIMenuListItem

// Evento menu
mp.events.add("mostrar_concesionario", function (datos) {
    if (datos != null && typeof datos === "string") {
        let infoConcesionario = JSON.parse(datos);

        nombreConce = infoConcesionario[0];
        posicionEntrega = infoConcesionario[1];
        rotacionEntrega = infoConcesionario[2];
        dimensionPreview = infoConcesionario[3];
        posicionCamara = infoConcesionario[4];
        vehiculosConce = infoConcesionario[5];
        vehiculos_propios = infoConcesionario[6];

        mostrar_concesionario();
    }
});

// Funcion para mostrar el menu de avisos
function mostrar_concesionario() {
    Concesionario = crearMenuConDistancia(4, nombreConce, "Opciones concesionario", false, "shopui_title_ie_modgarage", "shopui_title_ie_modgarage");
    Concesionario.AddItem(new UIMenuItem("Comprar vehículo", "Compra un vehículo de los que este concesionario vende"));
    Concesionario.AddItem(new UIMenuItem("Vender vehículo", "Vende uno de tus vehículos propios"));
    Concesionario.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    Concesionario.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                aux = true;
                Concesionario?.Close(true);
                comprar_vehiculo();
                break;
            case 1:
                aux = true;
                Concesionario?.Close();
                vender_vehiculo();
                break;
            default:
                Concesionario?.Close();
                aux = false;
                break;
        }
    });

    Concesionario.MenuClose.on(() => {
        menu_con_distancia = null;

        if (!aux) {
            nombreConce = "";
            posicionEntrega = new mp.Vector3(0.0, 0.0, 0.0);
            rotacionEntrega = new mp.Vector3(0.0, 0.0, 0.0);
            dimensionPreview = 0;
            posicionCamara = new mp.Vector3(0.0, 0.0, 0.0);
            vehiculosConce = [];
            vehiculos_propios = [];
        }

        Concesionario = null;
    });
}

//Funcion que muestra el menu del concesionario
function comprar_vehiculo() {
    if (vehiculosConce.length <= 1) {
        mostrarAviso("danger", 5000, "Este concesionario no vende ningún vehículo");
        return;
    }

    mp.events.callRemote("compra_vehiculo", dimensionPreview);
    player_local.freezePosition(true);

    // Generamos las opciones según los vehículos que haya en el concesionario
    Compra = crearMenu(nombreConce, "Comprar vehículo", true, "shopui_title_ie_modgarage", "shopui_title_ie_modgarage");
    OpcionesCompra = crearMenu(nombreConce, "Personalización de colores", true, "shopui_title_ie_modgarage", "shopui_title_ie_modgarage");

    let colorIndex = [];
    for (let i = 0, n = colores.length; i < n; i++) {
        colorIndex.push(colores[i][0]);
    }
    listaColoresPrim = new UIMenuListItem("Primario", "Color primario de la carrocería", new ItemsCollection(colorIndex), 0);
    listaColoresSecun = new UIMenuListItem("Secundario", "Color secundario de la carrocería", new ItemsCollection(colorIndex), 0);
    listaColoresTrim = new UIMenuListItem("Interior", "Color del interior", new ItemsCollection(colorIndex), 0);
    listaColoresDashboard = new UIMenuListItem("Cuadro", "Color del cuadro de instrumentos", new ItemsCollection(colorIndex), 0);
    OpcionesCompra.AddItem(listaColoresPrim);
    OpcionesCompra.AddItem(listaColoresSecun);
    OpcionesCompra.AddItem(listaColoresTrim);
    OpcionesCompra.AddItem(listaColoresDashboard);
    OpcionesCompra.AddItem(aplicarColores(new UIMenuItem("Prueba", "Prueba el vehículo durante un corto periodo de tiempo"), "Amarillo"));
    OpcionesCompra.AddItem(aplicarColores(new UIMenuItem("Comprar", "Termina la compra del vehículo"), "Verde"));
    OpcionesCompra.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    cochesMenuCompra = [];
    for (let i = 1, n = vehiculosConce[0] * 3; i < n; i += 3)
    {
        let nombreReal = vehiculosConce[i];
        let precioVeh = vehiculosConce[i+1];
        let nombreModelo = vehiculosConce[i+2];

        let botVeh = new UIMenuItem(nombreReal, "");
        botVeh.SetRightLabel(precioVeh + " ~g~$");
        Compra.AddItem(botVeh);

        cochesMenuCompra.push(nombreModelo);
    }
    Compra.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    OpcionesCompra.setVisible(false, true);

    let modeloHash = mp.game.gameplay.getHashKey(cochesMenuCompra[0]);
    dibujarLuz(renderLuzActivo);
    mp.events.add("entityStreamIn", streamInConcesionario);
    crearCoche(modeloHash, posicionEntrega, rotacionEntrega, dimensionPreview);
    if (cochesMenuCompra[0] == "ambulance3") {
        cambiarLivery(2);
    }

    camaraCompra = mp.cameras.new("default", posicionCamara, new mp.Vector3(0.0, 0.0, rotacionEntrega.z + 2), 40);
    camaraCompra.pointAtCoord(posicionEntrega.x, posicionEntrega.y, posicionEntrega.z);
    camaraCompra.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    mostrarAviso("info", 7000, "Pulsando las teclas [A] y [D] puedes rotar el vehículo");

    OpcionesCompra.ListChange.on((UIMenuListItem, index) => {
        if (UIMenuListItem == listaColoresPrim || UIMenuListItem == listaColoresSecun) {
            cambiarColor(listaColoresPrim.Index, listaColoresSecun.Index);
        }
        else if (UIMenuListItem == listaColoresTrim) {
            cambiarColorTrim(listaColoresTrim.Index);
        }
        else if (UIMenuListItem == listaColoresDashboard) {
            cambiarColorDashboard(listaColoresDashboard.Index);
        }
    });

    let aux = false;
    OpcionesCompra.ItemSelect.on((item, index) => {
        if (item.Text == "Comprar") {
            mp.events.callRemote("fin_compra_vehiculo");
            mp.events.callRemote("comprar_vehiculo", modeloSeleccionado, listaColoresPrim.Index, listaColoresSecun.Index, listaColoresTrim.Index, listaColoresDashboard.Index);

            if (timerRotacion != null) {
                clearInterval(timerRotacion);
                timerRotacion = null;
            }

            mp.events.remove("entityStreamIn", streamInConcesionario);
            dibujarLuz(renderLuzActivo);
            borrarCoche();

            if (camaraCompra != null) {
                camaraCompra.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, true, false);
                camaraCompra.destroy();
                camaraCompra = null;
            }

            player_local.dimension = 0;
            player_local.freezePosition(false);

            aux = true;
            OpcionesCompra?.Close();
        } else if (item.Text == "Prueba") {
            mp.events.add("pruebaVehConce", probandoVehiculoConce);

            mp.events.callRemote("prueba_vehiculo", nombreConce, modeloSeleccionado, listaColoresPrim.Index, listaColoresSecun.Index, listaColoresTrim.Index, listaColoresDashboard.Index);

            if (timerRotacion != null) {
                clearInterval(timerRotacion);
                timerRotacion = null;
            }

            mp.events.remove("entityStreamIn", streamInConcesionario);
            dibujarLuz(renderLuzActivo);
            borrarCoche();

            if (camaraCompra != null) {
                camaraCompra.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, true, false);
                camaraCompra.destroy();
                camaraCompra = null;
            }

            player_local.freezePosition(false);

            aux = true;
            OpcionesCompra?.Close();
        } else if (item.Text == "Volver") {
            aux = false;
            OpcionesCompra?.Close(true);
        }
    });

    OpcionesCompra.MenuClose.on(() => {
        if (aux) {
            Compra?.Close();
        }
        else {
            Compra.setVisible(true, true);
        }
    });

    Compra.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            aux = false;
            Compra?.Close(true);
        }
        else {
            modeloSeleccionado = cochesMenuCompra[index];

            Compra.setVisible(false, true);
            OpcionesCompra.Open();
        }
    });

    Compra.IndexChange.on(newindex => {
        if (cochesMenuCompra[newindex] != undefined) { // Si la opción por la que pasa no es la de Cerrar
            borrarCoche();

            let modeloHash = mp.game.gameplay.getHashKey(cochesMenuCompra[newindex]);
            crearCoche(modeloHash, posicionEntrega, rotacionEntrega, dimensionPreview);
            if (cochesMenuCompra[newindex] == "ambulance3") {
                cambiarLivery(2);
            }
        }
    });

    Compra.MenuClose.on(() => {
        if (!aux) {
            mp.events.callRemote("fin_compra_vehiculo");

            if (camaraCompra != null) {
                camaraCompra.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, true, false);
                camaraCompra.destroy();
                camaraCompra = null;
            }

            if (timerRotacion != null) {
                clearInterval(timerRotacion);
                timerRotacion = null;
            }

            mp.events.remove("entityStreamIn", streamInConcesionario);
            dibujarLuz(renderLuzActivo);
            borrarCoche();

            player_local.dimension = 0;
            player_local.freezePosition(false);

            mostrar_concesionario();
        }

        OpcionesCompra = null;
        Compra = null;
    });
}

//Funcion que muestra el menu del concesionario
function vender_vehiculo() {
    if (!vehiculos_propios || vehiculos_propios.length <= 1) {
        mp.gui.chat.show(true);
        menuAbierto = false;
        mostrarAviso("danger", 5000, "No tienes ningún vehículo propio que vender");
        return;
    }

    Vender = crearMenu(nombreConce, "Vender vehículo", false, "shopui_title_ie_modgarage", "shopui_title_ie_modgarage");
    logInfo("CONCESIONARIO", "Venta total: " + vehiculos_propios[0]);

    let auxIndex = 0;
    cochesMenuVender = [];
    for (let i = 1, n = vehiculos_propios[0] * 3; i < n; i += 3)
    {
        let nombreReal = vehiculos_propios[i];
        let precioVeh = vehiculos_propios[i+1];
        let llave = vehiculos_propios[i+2];

        if (!nombreReal || !precioVeh || !llave) continue;

        logInfo("CONCESIONARIO", "Venta añadido:" + nombreReal + ", " + llave);

        let botVeh = new UIMenuItem(nombreReal, "Vende este vehículo al concesionario por la cantidad indicada.\nRecuerda que los concesionarios valoran el vehículo entre el 60% y el 10% de su valor original según los kilómetros que tenga.");
        botVeh.SetRightLabel(precioVeh + " ~g~$");
        Vender.AddItem(botVeh);

        cochesMenuVender.push(llave);

        auxIndex++;
    }
    Vender.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    Vender.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("venderveh", cochesMenuVender[index]);
        }

        let llaveVeh = cochesMenuVender[index] == undefined ? "cerrar" : cochesMenuVender[index];
        logInfo("CONCESIONARIO", "Venta: " + llaveVeh + "(" + index + "/" + auxIndex + ")");
        Vender?.Close();
    });

    Vender.MenuClose.on(() => {
        vehiculos_propios = [];
        cochesMenuVender = [];

        Vender = null;
    });
}

}