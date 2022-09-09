{
﻿/*
 * Descripcion: Contiene el menú de props
 */

let adminProp = null;
let adminProp_ALTAVOCES = null;
let adminProp_ANIMALES = null;
let adminProp_ARCADE = null;
let adminProp_BARRILES = null;
let adminProp_BAUL = null;
let adminProp_CARTELES = null;
let adminProp_CAJAS = null;
let adminProp_CONSTRUCCION = null;
let adminProp_CUADROS = null;
let adminProp_DECORACION = null;
let adminProp_DEPORTE = null;
let adminProp_ESTATUAS = null;
let adminProp_EVENTOS = null;
let adminProp_FUEGO = null;
let adminProp_HERRAMIENTAS = null;
let adminProp_IGLESIA = null;
let adminProp_ILEGAL = null;
let adminProp_ILUMINACION = null;
let adminProp_INFORMATICA = null;
let adminProp_JUEGO = null;
let adminProp_MAQUINARIA = null;
let adminProp_MECANICO = null;
let adminProp_MESAS = null;
let adminProp_PAPELERAS = null;
let adminProp_PLAYA = null;
let adminProp_PODIUM = null;
let adminProp_PUESTOSAMBULANTES = null;
let adminProp_RAMPAS = null;
let adminProp_SILLAS = null;
let adminProp_SILLASDERUEDAS = null;
let adminProp_SILLONES = null;
let adminProp_SOFAS = null;
let adminProp_TABURETES = null;
let adminProp_TORTURA = null;
let adminProp_VEHICULOSROTOS = null;
let adminProp_VENDING = null;
let adminProp_OTROS = null;

let floodboton_props = 0;

// Evento menu
mp.events.add("mostrar_prop_admin", function () {
    mostrar_prop_admin();
});

function mostrar_prop_admin() {
    adminProp = crearMenu("Props", "Staff");
    adminProp.AddItem(new UIMenuItem("Altavoces", ""));
    adminProp.AddItem(new UIMenuItem("Animales", ""));
    adminProp.AddItem(new UIMenuItem("Arcade", ""));
    adminProp.AddItem(new UIMenuItem("Barriles", ""));
    adminProp.AddItem(new UIMenuItem("Baul", ""));
    adminProp.AddItem(new UIMenuItem("Carteles", ""));
    adminProp.AddItem(new UIMenuItem("Cajas", ""));
    adminProp.AddItem(new UIMenuItem("Construccion", ""));
    adminProp.AddItem(new UIMenuItem("Cuadros", ""));
    adminProp.AddItem(new UIMenuItem("Decoracion", ""));
    adminProp.AddItem(new UIMenuItem("Deporte", ""));
    adminProp.AddItem(new UIMenuItem("Estatuas", ""));
    adminProp.AddItem(new UIMenuItem("Eventos", ""));
    adminProp.AddItem(new UIMenuItem("Fuego", ""));
    adminProp.AddItem(new UIMenuItem("Herramientas", ""));
    adminProp.AddItem(new UIMenuItem("Iglesia", ""));
    adminProp.AddItem(new UIMenuItem("Ilegal", ""));
    adminProp.AddItem(new UIMenuItem("Iluminacion", ""));
    adminProp.AddItem(new UIMenuItem("Informatica", ""));
    adminProp.AddItem(new UIMenuItem("Juego", ""));
    adminProp.AddItem(new UIMenuItem("Maquinaria", ""));
    adminProp.AddItem(new UIMenuItem("Mecanico", ""));
    adminProp.AddItem(new UIMenuItem("Mesas", ""));
    adminProp.AddItem(new UIMenuItem("Papeleras", ""));
    adminProp.AddItem(new UIMenuItem("Playa", ""));
    adminProp.AddItem(new UIMenuItem("Podium", ""));
    adminProp.AddItem(new UIMenuItem("Puestos ambulantes", ""));
    adminProp.AddItem(new UIMenuItem("Rampas", ""));
    adminProp.AddItem(new UIMenuItem("Sillas", ""));
    adminProp.AddItem(new UIMenuItem("Sillas de rueda", ""));
    adminProp.AddItem(new UIMenuItem("Sillones", ""));
    adminProp.AddItem(new UIMenuItem("Sofas", ""));
    adminProp.AddItem(new UIMenuItem("Taburetes", ""));
    adminProp.AddItem(new UIMenuItem("Tortura", ""));
    adminProp.AddItem(new UIMenuItem("Vehiculos rotos", ""));
    adminProp.AddItem(new UIMenuItem("Vending", ""));
    adminProp.AddItem(new UIMenuItem("Otros", ""));
    adminProp.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    adminProp.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_prop_admin_altavoces();
                break;
            case 1:
                mostrar_prop_admin_animales();
                break;
            case 2:
                mostrar_prop_admin_arcade();
                break;
            case 3:
                mostrar_prop_admin_barriles();
                break;
            case 4:
                mostrar_prop_admin_baul();
                break;
            case 5:
                mostrar_prop_admin_carteles();
                break;
            case 6:
                mostrar_prop_admin_cajas();
                break;
            case 7:
                mostrar_prop_admin_construccion();
                break;
            case 8:
                mostrar_prop_admin_cuadros();
                break;
            case 9:
                mostrar_prop_admin_decoracion();
                break;
            case 10:
                mostrar_prop_admin_deporte();
                break;
            case 11:
                mostrar_prop_admin_estatuas();
                break;
            case 12:
                mostrar_prop_admin_eventos();
                break;
            case 13:
                mostrar_prop_admin_fuego();
                break;
            case 14:
                mostrar_prop_admin_herramientas();
                break;
            case 15:
                mostrar_prop_admin_iglesia();
                break;
            case 16:
                mostrar_prop_admin_ilegal();
                break;
            case 17:
                mostrar_prop_admin_iluminacion();
                break;
            case 18:
                mostrar_prop_admin_informatica();
                break;
            case 19:
                mostrar_prop_admin_juego();
                break;
            case 20:
                mostrar_prop_admin_maquinaria();
                break;
            case 21:
                mostrar_prop_admin_mecanico();
                break;
            case 22:
                mostrar_prop_admin_mesas();
                break;
            case 23:
                mostrar_prop_admin_papeleras();
                break;
            case 24:
                mostrar_prop_admin_playa();
                break;
            case 25:
                mostrar_prop_admin_podium();
                break;
            case 26:
                mostrar_prop_admin_puestosambulantes();
                break;
            case 27:
                mostrar_prop_admin_rampas();
                break;
            case 28:
                mostrar_prop_admin_sillas();
                break;
            case 29:
                mostrar_prop_admin_sillasderuedas();
                break;
            case 30:
                mostrar_prop_admin_sillones();
                break;
            case 31:
                mostrar_prop_admin_sofas();
                break;
            case 32:
                mostrar_prop_admin_taburetes();
                break;
            case 33:
                mostrar_prop_admin_tortura();
                break;
            case 34:
                mostrar_prop_admin_vehiculosrotos();
                break;
            case 35:
                mostrar_prop_admin_vending();
                break;
            case 36:
                mostrar_prop_admin_otros();
                break;
            default:
                adminProp?.Close();
                return;
        }

        adminProp?.Close(true);
    });

    adminProp.MenuClose.on(() => {
        adminProp = null;
    });
}

// Muestra el menú prop de altavoces
function mostrar_prop_admin_altavoces(){
    adminProp_ALTAVOCES = crearMenu("Altavoces", "Prop");
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 1", "Altavóz negro alargado"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 2", "Altavóz de madera mediano sin los bafles a la vista"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 3", "Altavóz de madera mediano con los bafles a la vista"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 4", "Altavóz de madera pequeño con los bafles a la vista amarillos"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 5", "Altavóz negro pequeño sin los bafles a la vista"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 6", "Altavóz negro mediano con ambas cosas"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 7", "Altavoces pequeños unos encima de otros de madera con un bafle cada uno."));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 8", "Altavóz de escenario compuesto por cuatro bafles"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 9", "Altavóz grande de escenario compuesto por dos bafles y agujeros de agarre a los lados, conectores en la parte trasera"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 10", "Altavóz mediano de escenario compuesto por dos bafles y agujeros de agarre a los lados, conectores en la parte trasera"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 11", "Altavóz pequeño de escenario compuerto por un bafle y agujeros de agarre a los aldos, conectores en la parte trasera "));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 12", "Altavóz de escenario encima de una carretilla metálica con cuatro ruedas"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 13", "Altavóz de escenario speaker"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Altavoz 14", "Altavóz de escenario profesional"));
    adminProp_ALTAVOCES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ALTAVOCES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 14) {
                mp.events.callRemote("adminProp_ALTAVOCES", index);
            }
            else if (index == 14) { // Volver
                
                adminProp_ALTAVOCES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_ALTAVOCES?.Close();
            }
        }
    });

    adminProp_ALTAVOCES.MenuClose.on(() => {
        adminProp_ALTAVOCES = null;
    });
}

// Muestra el menú prop de animales
function mostrar_prop_admin_animales(){
    adminProp_ANIMALES = crearMenu("Animales", "Prop");
    adminProp_ANIMALES.AddItem(new UIMenuItem("Jaula para perro abierta", "Jaula de hierro blanca abierta en mal estado"));
    adminProp_ANIMALES.AddItem(new UIMenuItem("Jaula para perro cerrada", "Jaula de hierro blanca cerrada en mal estado"));
    adminProp_ANIMALES.AddItem(new UIMenuItem("Caseta para perro", "Caseta de mascota con el pienso al lado"));
    adminProp_ANIMALES.AddItem(new UIMenuItem("Cama para perro 1", "cama de mascota"));
    adminProp_ANIMALES.AddItem(new UIMenuItem("Cama para perro 2", "cama de mascota"));
    adminProp_ANIMALES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ANIMALES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 5) {
                mp.events.callRemote("adminProp_ANIMALES", index);
            }
            else if (index == 5) { // Volver
                
                adminProp_ANIMALES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_ANIMALES?.Close();
            }
        }
    });

    adminProp_ANIMALES.MenuClose.on(() => {
        adminProp_ANIMALES = null;
    });
}

// Muestra el menú prop de arcade
function mostrar_prop_admin_arcade() {
    adminProp_ARCADE = crearMenu("Arcade", "Prop");
    adminProp_ARCADE.AddItem(new UIMenuItem("Mesa de billar verde", "Mesa de billar sin bolas con la base verde"));
    adminProp_ARCADE.AddItem(new UIMenuItem("Mesa de billar morada", "Mesa de billar sin bolas con la base morada"));
    adminProp_ARCADE.AddItem(new UIMenuItem("Mesa de air hockey", "Mesa de air hockey sin fichas con la base del campo"));
    adminProp_ARCADE.AddItem(new UIMenuItem("Maquina arcade", "Máquina arcade del juego QUB3D"));
    adminProp_ARCADE.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ARCADE.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 4) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_ARCADE", index);
            } else if (index == 4) { // Volver
                
                mostrar_prop_admin();
                adminProp_ARCADE?.Close(true);
            }
            else {
                adminProp_ARCADE?.Close();
            }
        }
    });

    adminProp_ARCADE.MenuClose.on(() => {
        adminProp_ARCADE = null;
    });
}

// Muestra el menú prop de barriles
function mostrar_prop_admin_barriles(){
    adminProp_BARRILES = crearMenu("Barriles", "Prop");
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de metal rojo", "Barril de metal sin tapa de color rojo y negro"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de metal azul", "Barril de metal con tapa de color azul y blanco"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de plastico azul", "Barril de plástico azul con tapa, parecido a un depósito de agua"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de gasolina naranja", "Barril de gasolina naranja de la marca RON"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de madera", "Barril de madera viñedo"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Barril de madera para destilar", "Mecanismo para destilar el alcohol a un cubo de metal"));
    adminProp_BARRILES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_BARRILES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 6) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_BARRILES", index);
            }
            else if (index == 6) { // Volver
                
                adminProp_BARRILES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_BARRILES?.Close();
            }
        }
    });

    adminProp_BARRILES.MenuClose.on(() => {
        adminProp_BARRILES = null;
    });
}

// Muestra el menú prop de baul
function mostrar_prop_admin_baul(){
    adminProp_BAUL = crearMenu("Baul", "Prop");
    adminProp_BAUL.AddItem(new UIMenuItem("Baul antiguo madera", "Cajita antigua pequeña con decoraciones"));
    adminProp_BAUL.AddItem(new UIMenuItem("Baul negro abierto", "Baúl de mimbre grande, abierto"));
    adminProp_BAUL.AddItem(new UIMenuItem("Baul negro cerrado", "Baúl de mimbre grande, cerrado"));
    adminProp_BAUL.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_BAUL.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 3) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_BAUL", index);
            }
            else if (index == 3) { // Volver
                
                adminProp_BAUL?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_BAUL?.Close();
            }
        }
    });

    adminProp_BAUL.MenuClose.on(() => {
        adminProp_BAUL = null;
    });
}

// Muestra el menú prop de carteles
function mostrar_prop_admin_carteles(){
    adminProp_CARTELES = crearMenu("Carteles", "Prop");
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel bike", "Cartel pequeño incitando al uso de la bici"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel guns", "Cartel pequeño del AmmuNation indicando la apertura de la tienda"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel ammu", "Cartel mediano del AmmuNation indicando la apertura de la tienda"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel salvavidas", "Caja metálica en el aire con un salvavidas dentro a la vista"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel frutero", "Cartel compuesto por cinco pequeñitos indicando la fruta que vende"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel obras 1", "Cartel pequeño con el fondo amarillo con el mensaje WATCH FOR STOPPED VEHICLES"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel obras 2", "Cartel grande con el fondo amarillo con el mensaje WATCH FOR STOPPED VEHICLES"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel obras 3", "Cartel grande con el fondo amarillo y un icono de una persona en obras"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal Licor", "Cartel de licor y descuentos inmenso a vista de todos, en mal estado"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal Gas", "Cartel de gasolina inmenso a vista de todos, en mal estado"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal flecha salida", "Flecha hacia la derecha inmensa a vista de todos, con luces rojas de noche"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal flecha azul", "Flecha hacia la derecha inmensa a vista de todos, con luces azules de noche"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal flecha azul con rueda", "Flecha hacia la derecha inmensa con un circulo detrás a vista de todos, luces azules de noche"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel publicidad ecola", "Cartel pequeño publicitando el consumo de la Ecola"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel protesta marihuana", "Cartel de madera hecho a mano solicitando la legalización de la marihuana"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel dynasty 1", "Cartel de venta de propiedad de compañia dynasty"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel dynasty 2", "Cartel de venta de propiedad de compañia dynasty"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel wolf 1", "Cartel de venta de propiedad de compañia wolf"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel wolf 2", "Cartel de venta de propiedad de compañia wolf"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel wolf 3", "Cartel de venta de propiedad de compañia wolf")); 
    adminProp_CARTELES.AddItem(new UIMenuItem("Cartel propiedad en venta", "Cartel de venta de propiedad"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Señal obras", "señar para señalizar obras"));
    adminProp_CARTELES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_CARTELES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 22) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_CARTELES", index);
            }
            else if (index == 22) { // Volver
                
                adminProp_CARTELES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_CARTELES?.Close();
            }
        }
    });

    adminProp_CARTELES.MenuClose.on(() => {
        adminProp_CARTELES = null;
    });
}

// Muestra el menú prop de cajas
function mostrar_prop_admin_cajas(){
    adminProp_CAJAS = crearMenu("Cajas", "Prop");
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja fuerte", "Caja fuerte blanca grande, con clave de conbinación "));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja fuerte 2", "Caja fuerte verde y negra mediana, sin clave de combinación"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja de madera", "Caja de madera de color blanca cerrada con un candado en mal estado"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja de madera de transporte", "Caja de madera muy pequeñita reforzada, cerrada con candado"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja de madera de transporte 2", "Caja de madera pequeña reforzada, cerrada con candado"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja de madera de transporte 3", "Caja de madera muy grande de la marca GoPostal"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja militar de transporte", "Caja de metal grande de color verde, reforzada y cerrada"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja militar de transporte 2", "Caja de metal parecido a un baúl de color verde, reforzada y cerrada"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Caja fuerte de oro", "Caja fuerte de oro blindada"));
    adminProp_CAJAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_CAJAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 9) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_CAJAS", index);
            }
            else if (index == 9) { // Volver
                
                adminProp_CAJAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_CAJAS?.Close();
            }
        }
    });

    adminProp_CAJAS.MenuClose.on(() => {
        adminProp_CAJAS = null;
    });
}

// Muestra el menú prop de construcion
function mostrar_prop_admin_construccion(){
    adminProp_CONSTRUCCION = crearMenu("Construccion", "Prop");
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Tuberias", "Catorce tuberias metálicas sujetas por un refuerzo de madera"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Mezcladora cemento", "Mezcladora de cemento hacia abajo de color naranja "));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Mezcladora cemento 2", "Mezcladora de cemento hacia arriba de color naranja con avisos de seguridad"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Palet de cemento", "Paquetes de cemento rojos y blancos uno encima de otros sujetos por un palé de madera azúl"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Palet de bloques", "Paquete de bloques de cimiento grises unos encima de otros sujetos por un palé de madera"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Generador", "Generador en muy mal estado abierto al motor"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Contenedor obra", "Contenedor de metal azul con cajas de cartón dentro"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Pila de leña", "Pila de leñas sujetadas por dos cuerdas grises alrededor"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Valla de obra 1", "Valla de obra metálica de color amarillo, plegable"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Valla de obra 2", "Valla de obra metálica de color amarillo"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Lámpara de construcción", "Lamparita amarilla, poca iluminación parecida a los mineros"));
    adminProp_CONSTRUCCION.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_CONSTRUCCION.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 11) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_CONSTRUCCION", index);
            }
            else if (index == 11) { // Volver
                
                adminProp_CONSTRUCCION?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_CONSTRUCCION?.Close();
            }
        }
    });

    adminProp_CONSTRUCCION.MenuClose.on(() => {
        adminProp_CONSTRUCCION = null;
    });
}

// Muestra el menú prop de cuadros
function mostrar_prop_admin_cuadros(){
    adminProp_CUADROS = crearMenu("Cuadros", "Prop");
    adminProp_CUADROS.AddItem(new UIMenuItem("Cuadro antiguo exposición", "Cuadro antiguo en el que se ve una persona dibujando estrellas en una pared con su sombra"));
    adminProp_CUADROS.AddItem(new UIMenuItem("Cuadro calaveras exposición", "Cuadro abstracto en buen estado, muchos colores"));
    adminProp_CUADROS.AddItem(new UIMenuItem("Cuadro buenavida exposición", "Cuadro en buen estado en el que se ve una persona vivir bien con mucho dinero"));
    adminProp_CUADROS.AddItem(new UIMenuItem("Cuadro tiburón exposición", "Cuadro parecido a una pecera, se ve como un tiburón le arranca las dos piernas a un nadador"));
    adminProp_CUADROS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_CUADROS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 4) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_CUADROS", index);
            }
            else if (index == 4) { // Volver
                
                adminProp_CUADROS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_CUADROS?.Close();
            }
        }
    });

    adminProp_CUADROS.MenuClose.on(() => {
        adminProp_CUADROS = null;
    });
}

// Muestra el menú prop de decoracion
function mostrar_prop_admin_decoracion(){
    adminProp_DECORACION = crearMenu("Decoración", "Prop");
    adminProp_DECORACION.AddItem(new UIMenuItem("Muñeco pinguino para navidad", "Muñeco de nieve con sombrero negro y una zanahoria de nariz"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Gnomo 1", "Un gnomo con el gorro rojo y con una caña de pescar en sus manos"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Gnomo 2", "Un gnomo con el gorro verde y con una linterna de mano en su mano derecha, apoyado en una piedra"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Gnomo 3", "Un gnomo con el gorro rojo, con las manos en el cuelo"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Estanteria libros", "Estanteria de libros sin portada de todos los colores"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Lampara fluorescente rosa", "Lámpara fluorescente grande de color rosa, alargada con bastante iluminación "));
    adminProp_DECORACION.AddItem(new UIMenuItem("Lampara flor", "Lámpara fluorescente de cesped muy alto de color blanco"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Atril", "Atril curvado de metal con soporte para dejar arriba cualquier objeto"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Calefactor terraza", "Calefactor antiguo de terraza parecido a un paragüas, funcionamiento con gasolina"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Arbol de navidad con base", "Arbol de navidad con una base de piedra, decoraciones incluídas"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Arbol botellas de champagne", "Pirámide con botellas de champagne separadas por bandejas de cristal"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Arbol plástico navidad", "Arbol de navidad pequeñito con varias bolas de cada color, uso decorativo"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Arbol plástico navidad 2", "Arbol de navidad metálico con una pequeña base, incluída la frase Merry Christmas"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Arbol plástico navidad diamante", "Arbol de navidad negro con un diamante de plástico arriba del todo"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Chroma key", "croma para reemplazar fondo verde en postproducción"));
    adminProp_DECORACION.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_DECORACION.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 15) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_DECORACION", index);
            }
            else if (index == 15) { // Volver
                
                adminProp_DECORACION?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_DECORACION?.Close();
            }
        }
    });

    adminProp_DECORACION.MenuClose.on(() => {
        adminProp_DECORACION = null;
    });
}

// Muestra el menú prop de deporte
function mostrar_prop_admin_deporte(){
    adminProp_DEPORTE = crearMenu("Deporte", "Prop");
    adminProp_DEPORTE.AddItem(new UIMenuItem("Porteria de futbol", "Porteria de futbol de toda la vida, los postes blancos y sin red"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Estera roja", "Esterilla de yoga roja pequeñita"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Estera negra/gris", "Esterilla de yoga negra pequeñita"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Estera azul", "Esterilla de yoga azul pequeñita"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Guante de boxeo", "Un guante de boxeo rojo hacia arriba en el suelo"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Mesa de ping pong", "Mesa de pingpong con la base de verde y la red en buen estado"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Porteria Futbol 2", "Porteria de futbol metálica inmensa con los colores de la bandera estadounidense "));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Valla deporte individual", "Una barra metálica en forma de H, uso para las dominadas individuales"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Valla deporte", "Una barra metálicas en forma de H, uso para las dominadas individuales"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Vallas deporte 2", "Dos barras altas en paralelo para poder entrenar los abdominales o el pecho"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Vallas deporte 3", "Dos barras bajas en paralelo para pode entrenar los abdominales o el pecho"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Barras deporte triple", "Tres barras en forma de H de diferentes alturas cada una"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Barras deporte triple", "Tres barras en forma de H de diferentes alturas cada una"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta individual", "Banco bajo de gimnasio con los soportes blancos metálicos"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta inclinada", "Banco bajo de gimnasio inclinado con los soportes blancos metálicos"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta pressbanca ", "Banco bajo de gimnasio para el press banca, con los soportes pero sin las pesas"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta piernas", "Banco bajo de gimnasio para entrenar las piernas"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta dominadas", "Instrumento de deporte para las dominadas de abajo arriba y de arriba abajo"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Banqueta bicicleta", "Banco bajo de gimnasio con los pedales de bicicleta delante "));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Cinta de correr", "Cinta de correr eléctrica de la marca Heat con pantalla"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Entrenamiento boxeo", "Soporte de una bolsa para golpear con los puños detenidamente"));
    adminProp_DEPORTE.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_DEPORTE.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 21) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_DEPORTE", index);
            }
            else if (index == 21) { // Volver
                
                adminProp_DEPORTE?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_DEPORTE?.Close();
            }
        }
    });

    adminProp_DEPORTE.MenuClose.on(() => {
        adminProp_DEPORTE = null;
    });
}

// Muestra el menú prop de estatuas
function mostrar_prop_admin_estatuas(){
    adminProp_ESTATUAS = crearMenu("Estatuas", "Prop");
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua hombre dab", "Estatua de piedra blanca parecido al discóbolo realizando un dab"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua mujer", "Estatua de piedra blanca de una mujer haciendo twerk con el vestido "));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua mujer 2", "Estatua de bronce de una mujer tocándose el pelo y mirando hacia adelante"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua perro", "Estatua de un perro en posición de cagar en el suelo"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua platanos de oro", "Estatua pequeña de dos platanos metálicos de color oro bailando"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua platanos blancos", "Estatua pequeña de dos platanos metálicos de color plata bailando"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua pantera blanca", "Estatua pequeñita de una pantera de piedra con soporte de una piedra"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua pantera gris", "Estatua pequeñita de una pantera de metal de color plata con soporte de una piedra"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua pantera bronce", "Estatua pequeñita de una pantera de metal de color oro con soporte de una piedra"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Estatua comida rapida", "Estatua de tamaño real con bebida y hamburguesa, parecida al muñeco de Michelin"));
    adminProp_ESTATUAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ESTATUAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 10) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_ESTATUAS", index);
            }
            else if (index == 10) { // Volver
                
                adminProp_ESTATUAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_ESTATUAS?.Close();
            }
        }
    });

    adminProp_ESTATUAS.MenuClose.on(() => {
        adminProp_ESTATUAS = null;
    });
}

// Muestra el menú prop de eventos
function mostrar_prop_admin_eventos(){
    adminProp_EVENTOS = crearMenu("Eventos", "Prop");
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas con publicidad beer", "Valla publicitaria de color cyan sobre la cerveza Logger Beer,"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas con publicidad Pißwasser", "Valla publicitaria con el fondo rojo sobre la cerveza Pißwasser"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas negras elegantes", "Valla metálica de color negro mate, sin publicidad"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas elegantes 2", "Valla para el uso de guiar un camino, con la cuerda roja, elegante"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas elegantes circulo", "Vallas en circulo para el uso de guiar un camino o cerrarlo, elegantes"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bolo elegante", "Un soporte de valla elegante con la cuerda roja sin cerrar, estado sin uso"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Meta/salida maraton", "Meta y salida de una maratón o carrera sujeta por dos soportes metálicos blancos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Meta/salida evento", "Meta y salida metálica de una carrera o maratón, contiene publicidad de Burger Shot y Sprunk"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Meta/salida evento hinchable", "Meta y salida de tela de color roja, contiene la publicidad de la bebida Ecola"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Punto de partida", "Inicio de un punto de carrera de metal, contiene publicidad de la marca de coches Obey"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Gradas para conciertos o partidos", "Gradas portatiles de metal con 16 plazas de asientos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Photocool", "Cartel de madera sujeto con soportes de madera para rueda de prensa o evento televisivo con publicidad del MazeBank"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bicerack", "Palo metálico azul en forma de U invertido para poder meter la rueda delantera de la bicicleta y atarla con el candado"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Ruedas para marcar circuito 1", "Cuatro juegos de pneumáticos de color blancos y rojos para poder marcar un circuito"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Ruedas para marcar circuito 2", "Dos juegos de pneumáticos de color blancos y rojos uno encima de otros, sin uso"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Valla roja cuadros circuito", "Valla con cuadrados rojos de plástico marcando el final de un circuito"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Valla roja doble cuadros circuito", "Hilera de vallas con cuadrados rojos de plástico marcando el final de un circuito"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Valla roja triple cuadros circuito", "Hilera de vallas con cuadrados rojos de plásticos marcando el final de un circuito"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Valla con publicidad", "Valla metálica con la publicidad de una serie llamada MeltDown con un hombre desesperado en medio"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Valla para campo", "Valla metálica grande, uso habitual para cerrar el terreno de animales"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Air dancer hinchable", "Muñeco hinchable amarillo y azul, en movimiento debido al aire con la frase Total Bender"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Flamingo para fiestas de lujo o tematicas", "Flamingo rosa decorativo en el aire sujeto por dos finos palos metálicos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Camara de television", "Cámara de televisión profesional HD LADO CONTRARIO"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Carpa verde", "Carpa verde montable, sujeta por cuatro soportes metálicos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Carpa azul", "Carpa azul montable, sujeta por cuatro soportes metálicos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Television movil", "Televisión colgada en un soporte metálico acompañado de más aparatos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Pizarra 1", "Pizarra con el fondo negro, colgada en la pared sin ningún soporte "));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Pizarra 2", "Pizarra con el fondo negro, con soportes negros metálicos y cuatro imanes pequeños arriba a la derecha"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Pizarra proyector", "Pizarra con el fondo blanco, con soportes metálicos para facilitar el uso del proyector"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Microfono 1", "Micrófono con soporte metálico negro LADO CONTRARIO"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Microfono 2", "Micrófono con soporte metálico gris, LADO DERECHO"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Arbol de navidad con regalos", "Arbol de navidad artificial con decoraciones y regalos de todos los colores debajo de el"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Moto de agua en remolque", "Carro para el coche con una moto de agua encima de color azul y naranja"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bandera evento playa 1", "Bandera muy alta con el fondo negro, contiene publicidad de SpeedoPhile"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bandera evento playa 2", "Bandera muy alta con el fondo negro, doblada debido al aire, contiene publicidad de SpeedoPhile"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bandera evento playa 3", "Bandera muy alta con el fondo verde, en movimiento debido al aire, contiene publicidad de clases particulares y de safaries"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bandera evento playa 4", "Bandera muy alta con el fondo negro, sin movmiento del aire, contiene publicidad de SpeedoPhile"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bolo impedir paso a vehículos", "Soporte metálico fijo impidiendo el paso a vehículos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Mesa DJ", "Mesa de DJ en funcionamiento con dos discord en curso"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Mesa mezcladora", "Mesa mezcladora, secuenciador programable de marca Panoramic, a la altura de la mesa de DJ"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Torre con semaforo", "Torre metálica con semáforo para uso de carrera en una salida, colores de la bandera negra y blanca, contiene publicidad de la marca de relojes Crowes"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Torre blanca y roja", "Torre metálica alta de señal, de color roja y negra"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Escena Fame of shame", "Fondo de una escena de Fame Or Shame, con un cartel sujeto por barras metálicas y varias estrellas con banderas de tela"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Mesa mixer", "Mesa mixer para deejays"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Vallas eventos", "Vallas para eventos privados"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Mesa DJ profesional", "Mesa de deejay profesional para eventos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Timbales", "Timbales para eventos o conciertos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Bateria", "Bateria para eventos o conciertos"));
    adminProp_EVENTOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_EVENTOS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 48) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_EVENTOS", index);
            }
            else if (index == 48) { // Volver
                
                adminProp_EVENTOS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_EVENTOS?.Close();
            }
        }
    });

    adminProp_EVENTOS.MenuClose.on(() => {
        adminProp_EVENTOS = null;
    });
}

// Muestra el menú prop de fuego
function mostrar_prop_admin_fuego(){
    adminProp_FUEGO = crearMenu("Fuego", "Prop");
    adminProp_FUEGO.AddItem(new UIMenuItem("Hoguera", "Hoguera pequeñita con troncos pequeños de madera"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Barbacoa 1", "Barbacoa industrial en buen estado, con bombona de gas debajo"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Barbacoa 2", "Barbacoa personal de cocina en buen estado"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Barbacoa 3", "Barbacoa de terraza hecha por ladrillos con dos parrilas en medio"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Barbacoa 4", "Barbacoa portatil con la tapa cerrada y los soportes con ruedas pequeñas de plástico"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Barbacoa 5", "Barbacoa movible de madera con la tapa abierta y una parrila grande, la bombona debajo de la parrilla"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Fuego 1", "Rol de incendios"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Fuego 2", "Rol de incendios"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Fuego 3", "Rol de incendios"));
    adminProp_FUEGO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_FUEGO.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 9) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_FUEGO", index);
            }
            else if (index == 9) { // Volver
                
                adminProp_FUEGO?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_FUEGO?.Close();
            }
        }
    });

    adminProp_FUEGO.MenuClose.on(() => {
        adminProp_FUEGO = null;
    });
}

// Muestra el menú prop de herramientas
function mostrar_prop_admin_herramientas(){
    adminProp_HERRAMIENTAS = crearMenu("Herramientas", "Prop");
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla roja", "Carretilla usada de color roja con restos de cemento dentro"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla gris", "Carretilla sin usar de color azul oscuro"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla para mercancia", "Carretilla roja de cuatro ruedas sin material encima"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla mercancia barriles", "Carretilla amarilla de cuatro ruedas pequeñas, dos barriles encima de color azul y blancos"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla mercancia paquetes", "Carretilla roja de cuatro ruedas, con tres cajas de cartón precintadas encima"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Carretilla mercancia cajas madera", "Carretilla roja de cuatro ruedas, con tres cajas de madera encima"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escaleras de pintor", "Escalera de pintor metálica ya plegada"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escaleras de pintor pequeña", "Escalera de pintor metálica pequeña, ya plegada y listo para el uso"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Banco de herramientas mecanica", "Caja de herramientas roja abierta, mostranto las herramientas que contiene dentro"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Generador de electricidad", "Generador de electricidad de color verde, hace un sonido constante de encendido"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Generador de luz", "Generador de electricidad con un foco de luz alto, da bastante electricidad"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Lampara suelo", "Lámpara del suelo con una luz suave y no muy molesta"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escalera para aviones 1", "Escalera para aviones comerciales de la marca FlyUs"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escalera para aviones 2", "Escalera amarilla para aviones sin ninguna publicidad"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escalera para aviones 3", "Escalera para aviones comerciales sin ninguna publicidad"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escalera para aviones 4", "Escalera metálica negra para aviones, sin ninguna publicidad"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Escalera para aviones 5", "Escalera metálica negra para aviones, plegada y sin uso"));
    adminProp_HERRAMIENTAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_HERRAMIENTAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 17) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_HERRAMIENTAS", index);
            }
            else if (index == 17) { // Volver
                
                adminProp_HERRAMIENTAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_HERRAMIENTAS?.Close();
            }
        }
    });

    adminProp_HERRAMIENTAS.MenuClose.on(() => {
        adminProp_HERRAMIENTAS = null;
    });
}

// Muestra el menú prop de iglesia
function mostrar_prop_admin_iglesia(){
    adminProp_IGLESIA = crearMenu("Iglesia", "Prop");
    adminProp_IGLESIA.AddItem(new UIMenuItem("Ataud de lujo", "Ataud de madera con detalles de color oro"));
    adminProp_IGLESIA.AddItem(new UIMenuItem("Ataud clase media", "Ataud de madera con detalles de metal"));
    adminProp_IGLESIA.AddItem(new UIMenuItem("Ataud clase baja", "Ataud de madera roto por arriba, con detalles en mal estado"));
    adminProp_IGLESIA.AddItem(new UIMenuItem("Recuerdo para difunto", "Flores y velas en el suelo con dos banderitas de Estados Unidos"));
    adminProp_IGLESIA.AddItem(new UIMenuItem("Recuerdo para difunto 2", "Flores y velas en el suelo, acompañadas de dos cruces de madera y un oso con un mensaje entre las manos"));
    adminProp_IGLESIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_IGLESIA.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 5) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_IGLESIA", index);
            }
            else if (index == 5) { // Volver
                
                adminProp_IGLESIA?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_IGLESIA?.Close();
            }
        }
    });

    adminProp_IGLESIA.MenuClose.on(() => {
        adminProp_IGLESIA = null;
    });
}

// Muestra el menú prop de ilegal
function mostrar_prop_admin_ilegal(){
    adminProp_ILEGAL = crearMenu("Ilegal", "Prop");
    adminProp_ILEGAL.AddItem(new UIMenuItem("Mesa marihuana", "Mesa metálica plegable con restos de marihuana y productos relacionado con ella"));
    adminProp_ILEGAL.AddItem(new UIMenuItem("Mesa cocaina", "Mesa metálica plegable con restos de cocaína y productos relacionado con ella"));
    adminProp_ILEGAL.AddItem(new UIMenuItem("Mesa metanfetamina", "Mesa metálica plegable con restos de metanfetamina y productos inflamables relacionado con ella"));
    adminProp_ILEGAL.AddItem(new UIMenuItem("Planta marihuana grande sin macetero", "Planta de marihuana a altura de una persona"));
    adminProp_ILEGAL.AddItem(new UIMenuItem("Planta marihuana mediana sin macetero", "Planta de marihuana a altura media de una persona"));
    adminProp_ILEGAL.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ILEGAL.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 5) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_ILEGAL", index);
            }
            else if (index == 5) { // Volver
                
                adminProp_ILEGAL?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_ILEGAL?.Close();
            }
        }
    });

    adminProp_ILEGAL.MenuClose.on(() => {
        adminProp_ILEGAL = null;
    });
}

// Muestra el menú prop de iluminacion
function mostrar_prop_admin_iluminacion(){
    adminProp_ILUMINACION = crearMenu("Iluminación", "Prop");
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco grabación 1", "Foco de grabación vertical con soporte de un palo metálico"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco grabación 2", "Foco de grabación horizontal con soporte de un palo metálico"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco estudio 1", "Un foco alto centrado a un punto sujeto por un soporte metálico "));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Focos estudio 2", "Cuatro focos altos centrados en un punto sujetos por un soporte metálico"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco estudio 3", "Un foco centrado en un paragüas para realizar fotografías con buena iluminación"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco trabajo 1", "Un foco de trabajo a la altura de una persona con un soporte amarillo"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco trabajo 2", "Dos focos de trabajo a altura alta con un soporte metálico y portable con las dos ruedas"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco trabajo 3", "Un foco alto en vertical con un soporte metálico amarillo"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco trabajo 4", "Un foco en vertical a altura media de una persona y sujeto por un soporte amarillo"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco trabajo 5", "Un foco de trabajo en el suelo, plegado con el soporte amarillo"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Caja focos", "Caja de electricidad para conectar los focos en él con múltiples enchufes"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco con tripode", "Un foco en vertical con un pequeño soporte a altura media de una persona"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Lampara con tripode", "Una lámpara circular y fina verticalmente, iluminación en 360 grados"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Lampara de torre", ""));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Luz de suelo azul", "Foco grande con luz azul, posición desde el suelo hacia arriba"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Luz de suelo amarilla", "Foco grande con luz amarilla, posición desde el suelo hacia arriba"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Luz de suelo rosa", "Foco grande con luz rosa, posición desde el suelo hacia arriba"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Foco estudio profesional", "Foco profesional para producciones"));
    adminProp_ILUMINACION.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_ILUMINACION.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 18) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_ILUMINACION", index);
            }
            else if (index == 18) { // Volver
                
                adminProp_ILUMINACION?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_ILUMINACION?.Close();
            }
        }
    });

    adminProp_ILUMINACION.MenuClose.on(() => {
        adminProp_ILUMINACION = null;
    });
}

// Muestra el menú prop de informatica
function mostrar_prop_admin_informatica()
{
    adminProp_INFORMATICA = crearMenu("Informática", "Prop");
    adminProp_INFORMATICA.AddItem(new UIMenuItem("Maquina de servidor", "Pequeña máquina de servidor encendida con los procesos ejecutados"));
    adminProp_INFORMATICA.AddItem(new UIMenuItem("Maquina de servidor 2", "Máquina de servidor mediana apagada, con varios discos duros"));
    adminProp_INFORMATICA.AddItem(new UIMenuItem("Maquina de servidor 3", "Máquina de servidor alta apagada, con varios discos duros"));
    adminProp_INFORMATICA.AddItem(new UIMenuItem("Maquina de servidor 4", "Máquina de servidor negra inmensa apagada "));
    adminProp_INFORMATICA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_INFORMATICA.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 4) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_INFORMATICA", index);
            }
            else if (index == 4) { // Volver
                
                adminProp_INFORMATICA?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_INFORMATICA?.Close();
            }
        }
    });

    adminProp_INFORMATICA.MenuClose.on(() => {
        adminProp_INFORMATICA = null;
    });
}

// Muestra el menú prop de juego
function mostrar_prop_admin_juego()
{
    adminProp_JUEGO = crearMenu("Juego", "Prop");
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa blackjack 1", "Mesa de blackjack sin asientos alrededor, con la máquina de cartas y la base verde"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa blackjack 2", "Mesa de blackjack con asientos alrededor, con la máquina de cartas y la base rosa"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Silla blackjack", "Asiento de cuero blanco elegante, colocar delante de la mesa de blackjack"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Carrito bebidas", "Carrito de bebidas metálico con cuatro ruedas, sin bebidas encima"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa ruleta 1", "Mesa de la ruleta con asientos de cuero blanco alrededor, la base de color verde"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa ruleta 2", "Mesa de la ruleta con asientos de cuero negro alrededor, la base de color rosa"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa poker 1", "Mesa de poker con asientos de cuero blanco alrededor, la base de color verde"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Mesa poker 2", "Mesa de poker con asientos de cuero negro alrededor, la base de color verde"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Tragaperras 1", "Máquina tragaperras rosa del casino sobre Fame Or Shame"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Tragaperras 2", "Máquina tragaperras rosa del casino sobre Fame Or Shame"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Tragaperras 3", "Máquina tragaperras roja del casino sobre Twilight Knife"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Tragaperras 4", "Máquina tragaperras verde del casino sobre Evacuator"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Papelera casino", "Papelera negra del casino con cigarrillos en la parte superior"));
    adminProp_JUEGO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_JUEGO.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 13) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_JUEGO", index);
            }
            else if (index == 13) { // Volver
                
                adminProp_JUEGO?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_JUEGO?.Close();
            }
        }
    });

    adminProp_JUEGO.MenuClose.on(() => {
        adminProp_JUEGO = null;
    });
}

// Muestra el menú prop de maquinaria
function mostrar_prop_admin_maquinaria()
{
    adminProp_MAQUINARIA = crearMenu("Maquinaria", "Prop");
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Soldadora", "Sopladora roja movible con el soplador en el suelo tirado "));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Compresor", "Compresor rojo vertical con un muelle amarillo metido"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Taladradora", "Taladradora industrial con un foco al lado, de la marca Kabel"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Gato de coche", "Gato de un coche rojo, LADO CONTRARIO"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Motor de elevación", "Máquina roja para elevar un motor con el gancho, de la marca PowerMetal"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Soporte de eje", "Soporte de eje para levantar una motocicleta dejándola encima"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Maquina de chips", "Máquina de chips industrial contínua con cadena de movimiento, de la marca Kabel "));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Secadora", "Secadora blanca, antigua y cerrada sin visión de la ropa"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Lavadora", "Lavadora blanca, antigua y cerrada sin visión de la ropa"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Picadora de carne", "Picadora de carne industrial, grande y con escaleras a los restos de carnes"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Compresor 2", "Comprensor horizontal movible de color azul, de la marca Pharte"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Compresor 3", "Máquina movible de color azul,  con pinzas a los lados"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Compresor 4", "Compresor vertical movible de color azul, de la marca Pharte"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Lavadora industria", "Lavadora industrial de color blanca con la tapa cerrada, de la marca Wiwang"));
    adminProp_MAQUINARIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_MAQUINARIA.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 14) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_MAQUINARIA", index);
            }
            else if (index == 14) { // Volver
                
                adminProp_MAQUINARIA?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_MAQUINARIA?.Close();
            }
        }
    });

    adminProp_MAQUINARIA.MenuClose.on(() => {
        adminProp_MAQUINARIA = null;
    });
}

// Muestra el menú prop de mecanico
function mostrar_prop_admin_mecanico()
{
    adminProp_MECANICO = crearMenu("Mecánico", "Prop");
    adminProp_MECANICO.AddItem(new UIMenuItem("Banco de herramientas alto", "Pequeña caja de herramientas roja auxiliar encima de un soporte movible con cuatro ruedas, de la marca PowerMetal"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Banco de herramientas mediano", "Mediana caja de herramientas roja auxiliar encima de un soporte movible con cuatro ruedas, de la marca PowerMetal"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Banco de herramientas rectangular", "Caja de herramientas roja auxiliar, encima de un soporte rectangular con cuatro ruedas, de la marca PowerMetal"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Motor de elevacion", "Máquina naranja para elevar un motor con el gancho, de la marca PowerMetal"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja de herramientas 2", "Caja de herramientas blanca y metálica, con la parte superior abierta y un cajón abierto, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas con ruedas", "Pequeña caja de herramientas blanca auxiliar encima de un soporte movible con cuatro ruedas, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas con ruedas 2", ""));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas blanca 1", "Caja de herramientas horizontal con la persiana a vista de las herramientas, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas blanca 2", "Caja de herramientas horizontal muy alargada, con varios cajones de herramientas abiertas, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas blanca 3", "Dos cajas de herramientas horizontal alargadas, una encima de otra con varios cajones de herramientas abiertas, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas negra 1", "Pequeña caja de herramientas de color negro, con la parte superior abierta y un cajón abierto, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas negra 2", "Caja de herramientas negra auxiliar encima de un soporte movible con cuatro ruedas, de la marca Fixup"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Caja herramientas negra 3", "Dos cajas de herramientas horizontal alargadas, un soporte movible con seis ruedas, de la marca Fixup "));
    adminProp_MECANICO.AddItem(new UIMenuItem("Carro de carga con nitrógeno", "Carro con tanques de gas"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Carro de carga ", "Carro de carga de tanques de gas vacío"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Tanque de bombonas de gas", "Tanque con bombonas de gas altas"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Tanque de bombonas de gas pequeñas", "Tanque con bombonas de gas pequeñas"));
    adminProp_MECANICO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_MECANICO.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 17) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_MECANICO", index);
            }
            else if (index == 17) { // Volver
                
                adminProp_MECANICO?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_MECANICO?.Close();
            }
        }
    });

    adminProp_MECANICO.MenuClose.on(() => {
        adminProp_MECANICO = null;
    });
}

// Muestra el menú prop de mesas
function mostrar_prop_admin_mesas()
{
    adminProp_MESAS = crearMenu("Mesas", "Prop");
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cutre", "Mesa casera con dos cachos de madera encima de un barril metálico de color azul y blanco"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa tablero", "Mesa grande no en muy buen estado, placa de metal encima de cuatro soportes metálicos amarillos"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa astronomia", "Mesa de plástico pequeñita con un mensaje solicitando la creencia de los horoscopos y los problemas que solucionan"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa legalizacion marihuana", "Mesa hecha a mano con un cacho de madera rectangular encima de dos cajas de fruta azules, con un cartel solicitando la legalización de la marihuana"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de inscripcion eventos", "Mesa de plástico blanca, con un cartel de tela delante indicando la inscripción del evento con publicidad a los lados"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa plastico rectangular", "Mesa de plástico blanca, con agujero en el centro para meter la sombrilla"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de plastico cuadrada", "Mesa de plástico blanca, sin agujero en el centro"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa terraza", "Mesa de terraza antigua con detalles en la base, con agujero en el centro para meter la sombrilla"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de mimbre claro", "Mesa de mimbre con la base circular, los soportes pequeños de mimbre"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de madera con cafe", "Mesa de madera cuadrada con cuatro soportes, un café y un vaso de cristal encima de la mesa"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de madera rectangular", "Mesa de madera del campo no en muy buen estado, sin asientos a los lados"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa alta bar", "Mesa de bar con una base metálica y un soporte metálico"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa venta pulseras", "Mesa de plástico blanca, con pulseras de todos los colores encima de ella"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa plástico con cafes", "Mesa roja y blanca con dos cafés encima de ella, sujeta con cuatro soportes de madera"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa con cervezas y tv", "Mesa rectangular de color marrón oscuro, una televisión apagada muy antigua acompañada de un plato utilizado y varias cervezas"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa con cervezas y platos", "Mesa rectangular de color marrón oscuro, un cenicero en el centro y varias cervezas con platos utilizados"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cuadrada patio", "Mesa individual cuadrada, de madera y con rejillas en la base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de picnic", "Mesa de madera rectangular, de campo con dos asientos a los lados"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa negra elegante", "Mesa rectangular con la base negra y los soportes metálicos"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de lujo", "Mesa con dos soportes a los lados, base metálica y muy limpia"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de cristal con champagne y cenicero", "Mesa rectangular con la base de cristal, dos copas de cristal con champagne y un mechero al lado de un cenicero"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de mimbre oscura pequeña", "Mesa individual cuadrada y baja, de mimbre y con cristal en la base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de mimbre oscura mediana", "Mesa de mimbre rectangular y baja, con un cristal en la base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de mimbre oscura grande", "Mesa de mimbre rectangular y alta, con un cristal en la base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de madera redonda", "Mesa de madera redonda con los soportes de madera, con un agujero en el centro para meter la sombrilla"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa con patas de metal", "Mesa metálica rectangular con la base de madera, los soportes a altura media"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa con proyector", "Mesa de madera vertical con tres baldas, un proyector colocado en la última balda"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa con cartas y cervezas", "Mesa de madera rectangular plegable, con cuatro cervezas acabadas y cartas de poker encima"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de lujo de cristal", "Mesa baja con los soportes metálicos cuadrados y la base de cristal transparente"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de lujo de cristal 2", "Mesa baja con los cuatro soportes metálicos y la base de cristal transparente"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de lujo de cristal 3", "Mesa baja con los cuatro soportes metálicos y la base de cristal transparente"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de madera salon", "Mesa baja con dos soportes metálicos a los lados y la base de madera saliente"));
    //adminProp_MESAS.AddItem(new UIMenuItem("Mesa de madera salon 2", "Mesa alargada de madera con ficheros y un calendario. COLOCAR EN UNA PARED")); // falla, no está en parte sv
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa blanca cocina", "Mesa de plástico blanco en forma de elipse sujeta por palos metálicos"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa yate cafe", "Mesa metálica de color marrón oscuro sin sillas alrededor con cinco rayas en medio"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa yate cafe 2", "Mesa metálica de color marrón oscuro y claro, sin sillas alrededor con un hueco de gancho debajo"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa yate", "Mesa metálica de color marrón oscuro y claro, con la base acolchada de color blanco"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa yate 2", "Mesa metálica circular de color marrón oscuro y claro, las patas en forma de X "));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa minerales", "Mesa circular baja de mármol de colores oscuros"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa minerales 2", "Mesa circular alta de mármol de colores oscuros"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa dorada disco", "Mesa circular sujeto por cuatro soportes metálicos negros, con un hueco del cilindro marrón claro"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de falsificaciones", "Mesa cuadrada sujeta con cuatro palos y dos palos en forma de x metálicos, incluída una balda auxiliar debajo"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa grow", "Mesa plegada rectangular, con la base de madera y los soportes metálicos"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa madera antigua", "Mesa antigua con la base de madera y los soportes con detalles"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa yate individual", "Mesa baja de mimbre gris con un cristal cuadrado de base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa madera cafe", "Mesa con bloque de madera hueco de por medio, con soporte gris metalico"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa patio lounge", "Mesa baja de madera con rejillas en la base"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de picnic 2", "Mesa de piedra rectangular con dos asientos a los lados, sujetos por soportes metálicos de color rojo"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de trabajo", "Mesa cuadrada de madera plegable con las patas de madera"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de trabajo 2", "Mesa rectangular de madera plegable con las patas de madera"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cuadrada blanca", "Mesa de plástico blanca sin un agujero en el centro para la sombrilla"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de contrucción", "Mesa desmontable con la base de madera rectangular y herramientas de construcción encima, un plano de construcción en medio de la mesa"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de contrucción 2", "Mesa desmontable con la base de madera rectangular y herramientas de construcción encima, sin plano de construcción en medio de la mesa"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de cabinete tv", "Mueble sin televisión encima con tres baldas de madera debajo y dos cajones a los lados"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cafe con sombrilla", "Mesa de madera cuadrada con una sombrilla rota y un soporte de peso debajo de la mesa"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cafe con sombrilla 2", "Mesa de madera circular con una sombrilla rota y un soporte de peso debajo de la mesa"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cafe con sombrilla 3", "Mesa de madera de campo con asientos a los lados y una sombrilla en el centro"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa cafe con sombrilla 4", "Mesa de plástico rectangular con una sombrilla en medio"));
    adminProp_MESAS.AddItem(new UIMenuItem("Mesa de trabajo cortapapeles", "Mesa de madera con una máquina azul con función de cortar papeles"));
    adminProp_MESAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_MESAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 58) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_MESAS", index);
            }
            else if (index == 58) { // Volver
                
                adminProp_MESAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_MESAS?.Close();
            }
        }
    });

    adminProp_MESAS.MenuClose.on(() => {
        adminProp_MESAS = null;
    });
}

// Muestra el menú prop de papeleras
function mostrar_prop_admin_papeleras()
{
    adminProp_PAPELERAS = crearMenu("Papeleras", "Prop");
    adminProp_PAPELERAS.AddItem(new UIMenuItem("Papelera calle", "Papelera metálica con la bolsa saliente y la tapa en forma circular"));
    adminProp_PAPELERAS.AddItem(new UIMenuItem("Papelera reciclaje azul", "Papelera de reciclaje de cartón para las botellas de cristal, con el agujero superior circular"));
    adminProp_PAPELERAS.AddItem(new UIMenuItem("Papelera reciclaje verde", "Papelera de reciclaje de cartón para el papel, con el agujero superior circular"));
    adminProp_PAPELERAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_PAPELERAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 3) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_PAPELERAS", index);
            }
            else if (index == 3) { // Volver
                
                adminProp_PAPELERAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_PAPELERAS?.Close();
            }
        }
    });

    adminProp_PAPELERAS.MenuClose.on(() => {
        adminProp_PAPELERAS = null;
    });
}

// Muestra el menú prop de playa
function mostrar_prop_admin_playa()
{
    adminProp_PLAYA = crearMenu("Playa", "Prop");
    adminProp_PLAYA.AddItem(new UIMenuItem("Castillo de arena", "Castillo de arena de cuatro torres"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Fortaleza de arena", "Castillo de arena con 16 torres y la bandera Escocia"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Torre de arena", "Torre de arena en mal estado con la bandera de Escocia"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Sombrilla blanca", "Sombrilla blanca sin peso abajo"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Sombrilla verde, azul y blanca", "Sombrila verde, azul y blanca sin peso abajo"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Sombrilla rosa y azul", "Sombrilla rosa, morado y azul claro, sin peso abajo"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Toalla de playa 1", "Toalla de playa de color blanca"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Toalla de playa 2", "Toalla de playa de color blanca"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Toalla azul enrrollada", "Toalla azul enrrollada en el suelo"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Colchoneta de playa azul", "Colchoneta hinchable de color azul con decoraciones blancas"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Colchoneta de playa rosa", "Colchoneta hinchable de color rosa sin decoraciones"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Nevera picnic", "Nevera con la tapa cerrada de color blanco y azul"));
    adminProp_PLAYA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_PLAYA.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 12) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_PLAYA", index);
            }
            else if (index == 12) { // Volver
                
                adminProp_PLAYA?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_PLAYA?.Close();
            }
        }
    });

    adminProp_PLAYA.MenuClose.on(() => {
        adminProp_PLAYA = null;
    });
}

// Muestra el menú prop de podium
function mostrar_prop_admin_podium()
{
    adminProp_PODIUM = crearMenu("Podium", "Prop");
    adminProp_PODIUM.AddItem(new UIMenuItem("Podium arena", "Podium casero hecho con neumáticos y bases de madera"));
    adminProp_PODIUM.AddItem(new UIMenuItem("Podium arena 2", "Podium profesional con leds y figuras en la base"));
    adminProp_PODIUM.AddItem(new UIMenuItem("Podium arena 3", "Podium casero hecho con bidones cortados y sombrillas a los lados"));
    adminProp_PODIUM.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_PODIUM.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 3) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_PODIUM", index);
            }
            else if (index == 3) { // Volver
                
                adminProp_PODIUM?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_PODIUM?.Close();
            }
        }
    });

    adminProp_PODIUM.MenuClose.on(() => {
        adminProp_PODIUM = null;
    });
}

// Muestra el menú prop de puestos ambulantes
function mostrar_prop_admin_puestosambulantes()
{
    adminProp_PUESTOSAMBULANTES = crearMenu("Puestos ambulantes", "Prop");
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Puesto ambulante mexicano rojo", "Puesto ambulante con cuatro ruedas de color rojo, promocionando Chihuahua Hotdogs"));
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Puesto ambulante simple negro", "Puesto ambulante con cuatro ruedas de color negro, sin promoción"));
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Puesto ambulante cafe", "Puesto ambulante retro con ruedas antiguas, venta de café"));
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Puesto ambulante simple", "Puesto ambulante retro con ruedas antiguas, vente neutra"));
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Puesto helados", "Barra de heladeria con cristal de por medio, fotografías de los helados y promoción de la Ecola"));
    adminProp_PUESTOSAMBULANTES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_PUESTOSAMBULANTES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 5) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_PUESTOSAMBULANTES", index);
            }
            else if (index == 5) { // Volver
                
                adminProp_PUESTOSAMBULANTES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_PUESTOSAMBULANTES?.Close();
            }
        }
    });

    adminProp_PUESTOSAMBULANTES.MenuClose.on(() => {
        adminProp_PUESTOSAMBULANTES = null;
    });
}

// Muestra el menú prop de rampas
function mostrar_prop_admin_rampas()
{
    adminProp_RAMPAS = crearMenu("Rampas", "Prop");
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de agua sprunk", "Rampa de suelo o agua con la publicidad de Sprunk Xtreme"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa metálica", "Rampa de suelo metálica de color marrón y gris, sin publicidad"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de madera 2", "Rampa de suelo poco elevada negra y blanca, la base de madera, sin publicidad"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de madera 3", "Rampa de suelo poco elevada negra y blanca, la base de madera, sin publicidad"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de madera 4", "Rampa de suelo elevado negra y blanca, la base de madera, sin publicidad"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de madera de agua", "Rampa hecha a mano elevada con un barril debajo"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de skate", "Rampa de skate marrón de la marca Curbcrawler con el acabao metalizado en la parte superior"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de skate 1", "Rampa de skate marrón con dos bajadas, una más alta que la otra"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Rampa de skate 2", "Dos rampas de skate marrones con una bajada pequeña y otra más elevada"));
    adminProp_RAMPAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_RAMPAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 9) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_RAMPAS", index);
            }
            else if (index == 9) { // Volver
                
                adminProp_RAMPAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_RAMPAS?.Close();
            }
        }
    });

    adminProp_RAMPAS.MenuClose.on(() => {
        adminProp_RAMPAS = null;
    });
}

// Muestra el menú prop de sillas
function mostrar_prop_admin_sillas()
{
    adminProp_SILLAS = crearMenu("Sillas", "Prop");
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina", "Silla de oficina con la tela negra y los reposabrazos metálicos a los lados, soporte metalico de la silla con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina 2", "Silla de oficina negra acolchada con los reposabrazos de plástico, soporte de plástico gris con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina 3", "Silla de oficina negra acolchada con los reposabrazos de plástico de color negro, soporte de plástico gris con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina 4", "Silla de oficina con los reposabrazos metálicos en suspensión, soporte de metal con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla movil regulable", "Silla de oficina simple sin reposabrazos con apoyapies en suspensión"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de pesca", "Silla de pesca con la tela de cuadros de color verde, blanco y negro"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de pesca verde", "Silla de pesca con la tela verde, sujeta por palos metálicos en forma de X"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de pesca azul", "Silla de pesca con la tela azul, sujeta por palos metálicos en forma de X"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de pesca de cuadros", "Silla de pesca con la tela de cuadros de color verde, blanco y negro"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca chill out", "Hamaca con la tela naranja y los reposabrazos de madera"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Tumbona", "Tumbona larga de mimbre de color gris con los reposabrazos altos de metal"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla con cojin", "Asiento de mimbre con un cojín de tela en la base de color verde y blanco"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Taburete", "Taburete circular de madera de madera, sujeto por cuatro soportes de madera y dos reposa piernas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Taburete cocina", "Taburete cuadrado de metal con la base acolchada de color gris, cuatro soportes metálicos y reposa piernas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de plastico azul", "Silla de plástico azul sin reposabrazos a los lados y sin acolchar, cuatro soportes metálicos de color negro"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de plastico terraza", "Silla de plástico blanca con reposabrazos de plastico y las patas de plástico"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza", "Silla de terraza cómoda con las bases acolchadas con tela blanca y los reposabrazos metálicos de color marrón"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de mimbre", "Silla de mimbre claro con la base acolchada de tela con el color blanco, sin reposabrazos a los lados"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera para interior", "Silla antigua con detalles en la madera, sin reposabrazos y con la base acolchada con rayas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera oscura baja", "Silla de madera oscura normal, con agujeros en la espalda y las patas de madera LADO DERECHO"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera baja con reposabrazos", "Silla de madera oscura normal, con reposabrazos a los lados y las patas de madera "));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oxidada de tortura", "Silla de madera podrida y con los reposabrazos finos, no esta en buen estado"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Banco merendero", "Banco de madera con dos soportes de madera a los lados del banco"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera clara", "Silla de madera clara, sin reposabrazos a los lados"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla con patas de metal", "Silla con la parte de atras y la base de tela blanca, con reposabrazos metálicos de color gris al igual que las patas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de aluminio", "Silla completamente de metal con reposabrazos"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de aluminio con madera", "Silla completamente de metal menos la base y la parte trasera de madera"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera para exterior", "Silla pequeña de madera oscura, sin reposabrazos a los lados"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de lujo para exteriores", "Silla de mimbre marrón oscura grande, con la base acolchada con un cojín de tela blanco"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca patio verde", "Hamaca con la tela verde en las bases y las patas metálicas, reposabrazos de madera"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca patio blanca", "Hamaca completamente de plástico, con los reposabrazos incluido"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca patio marrón y blanca", "Hamaca con las patas de madera clara y los reposabrazos, dos cojines en las bases de tela blanca"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla blanca 1", "Silla elegante con la base de plástico y las patas metálicas de color negro"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla blanca 2", "Silla elegante con la base de plástico y las patas metálicas de color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla marrón de espera", "Silla antigua acolchada con cuero de color marrón oscuro, patas metálicas de color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de espera de oficina", "Silla de espera de madera oscura, sin reposabrazos y con las patas metálicas de color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla color beis", "Silla de forma inusual de color beis, con reposabrazos grande incluida"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de terraza de madera", "Silla baja de madera, con la base acolchada con dos cojines de tela con el color gris, reposabrazos incluido"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla redonda", "Silla redonda acolchada con cuero toda la vuelta de color verde claro"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de espera de madera 1", "Silla de madera oscura con pequeños reposabrazos a los lados, cojín de cuero grande en la base de la silla de color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de espera de madera 2", "Silla de madera clara con pequeños reposabrazos a los lados, cojín de cuero pequeóo en la base de la silla"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla cómoda negra", "Silla de cuero en toda la vuelta con un pequeño cojín en el centro, en suspensión con un soporte metálico de suelo circular"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla amarilla", "Silla de plástico de color amarillo sin reposabrazos y con reposacabezas en la parte superior"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla negra de terraza", "Silla metálica gris, con reposabrazos y dos cojines medianos de cuero con el color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla negra redonda", "Silla baja en forma de elipse acolchada completamente de cuero negro, en suspensión con un soporte circular metálico"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de oficina sucia", "Silla de oficina utilizada con los reposabrazos acolchados de color gris, soporte metálico con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla antigua usada", "Silla antigua en mal estado, con las bases acolchadas con cuero marrón, cuatro patas metálicas hacia los lados"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla blanca clubhouse ", "Nueva silla blanca de plástico con reposabrazos de plástico y las patas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de oficina usada", "Silla de oficina negra en mal estado, arreglada con cinta aislante blanca"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla marihuana", "Silla de madera sin reposabrazos a los lados y con cuatro patas metálicas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla amarilla cocina", "Silla de cocina con la base de plástico de color lima, cuatro patas metálicas en forma de X"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla roja baja", "Silla elegante baja, acolchada con tela roja y con reposabrazos finos de tela roja, patas finas metálicas de color gris"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla colegio", "Silla de colegio sin reposabrazos, de madera oscura con las patas metálicas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza negra", "Silla con base de doble capa de tela de color negro, con reposabrazos metálicos al igual que las cuatro patas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla cocina azul ", "Silla de cocina con la base de plástico de color azul, cuatro patas metálicas en forma de X"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de madera vintage", "Silla de madera clara, muy baja con detalles en las patas, acolchada con dos cojines grandes de tela de punto"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla mimbre terraza", "Silla con la base de mimbre clara con los reposabrazos metálicos al igual que las cuatro patas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla mimbre terraza 2", "Silla antigua con la base pequeña de mimbre oscura sin reposabrazos a los lados, cuatro patas de madera oscura"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla blanca cocina", "Silla de cocina con la base de plástico de color blanco, cuatro patas metálicas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla plastico sucia", "Silla de plástico cutre, sucia y sin reposabrazos a los lados con las patas de plástico"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de mimbre verde", "Silla antigua con la base de mimbre verde y con los reposabrazos metálicos de color verde"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla antigua muy usada", "Silla con la pintura desgastada, con los reposabrazos metálicos y la base de madera sin cojín"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla plastico pizzeria", "Silla de mimbre de color rojo y blanco, con las patas de madera y los reposabrazos de mimbre verde"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla madera interior", "Silla de madera oscura sin reposabrazos con la base cuadrada sin cojín, cuatro patas de madera"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla azul plegada", "Silla plegada de color azul con las patas metálicas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de espera oficina", "Silla de madera acolchada con cuero de color marrón oscuro, reposabrazos metálicos a los lados"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de director", "Silla de director de madera plegable, base de tela verde con reposapiernas de madera y dos patas de madera en forma de X"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla naranja usada", "Silla de plástico naranja con la pintura desgastada sin acolchar y sin reposabrazos "));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina usada", "Silla de oficina a medida de altura acolchada con dos cojines de tela de punto grises, soporte de silla metálicos con cuatro ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla oficina usada 2", "Silla de oficina a medida de altura acolchada con dos cojines de tela de punto azules, soporte de silla metálicos con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla gris oficina", "Silla de oficina con la parte trasera más grande, acolchada con tela de punto gris, soporte de silla con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza clase media", "Silla de terraza con la base acolchada con cuero usado de color verde oscuro, con reposabrazos metálicos"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla muelle", "Silla de madera completamente en muy mal estado, base a punto de rompese, con reposabrazos"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla muelle antigua", "Silla de madera oscura completamente, con reposabrazos de madera y soporte de balancín de madera "));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza madera", "Silla de madera clara, con la base espaciosa y reposabrazos incluido"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza blanca chill", "Silla metálica con la base de tela blanca, reposabrazos metálicos con cuatro patas metálicos"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla terraza blanca chill 2", "Silla metálica con la base acolchada con dos cojines de tela de color blanco, reposabrazos de color marrón oscuro metálicos"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla de oficina roja", "Silla de oficina acolchada con tela de punto de color rojo, parte trasera movible y los soportes metálicos con cinco ruedas"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Silla negra oficina 2", "Silla de oficina  con la base acolchada de cuero negro y la parte trasera con reposacabezas incluida"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca de pesca", "Hamaca plegable de toda la vida con la base de tela de color verde con flores y los reposabrazos de plástico blanco"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca lounge blanca", "Hamaca tumbada completamente acolchada con dos cojines de tela blanca, movible con dos ruedas de madera en la parte superior"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Hamaca patio blanca", "Hamaca inclinada, acolchada con dos cojines de tela blanca y las patas con dos ruedas de madera en la parte superior"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Pupitre aprendizaje", "Silla de plástico con pupitre de madera delante, en suspensión con soporte metálico a la pared"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Pila de sillas plastico", "Tres sillas de plástico con reposabrazos una encima de otra"));
    adminProp_SILLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_SILLAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 84) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_SILLAS", index);
            }
            else if (index == 84) { // Volver
                
                adminProp_SILLAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_SILLAS?.Close();
            }
        }
    });

    adminProp_SILLAS.MenuClose.on(() => {
        adminProp_SILLAS = null;
    });
}

// Muestra el menú prop de sillas de ruedas
function mostrar_prop_admin_sillasderuedas()
{
    adminProp_SILLASDERUEDAS = crearMenu("Sillas de ruedas", "Prop");
    adminProp_SILLASDERUEDAS.AddItem(new UIMenuItem("Silla de ruedas 1", "Silla de ruedas medicinal con la base de tela negra y las ruedas a los lados, reposabrazos metálicos de color gris"));
    adminProp_SILLASDERUEDAS.AddItem(new UIMenuItem("Silla de ruedas 2", "Silla de ruedas medicinal con la base de tela negra y las ruedas a los lados, reposabrazos metálicos de color negro"));
    adminProp_SILLASDERUEDAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_SILLASDERUEDAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 2) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_SILLASDERUEDAS", index);
            }
            else if (index == 2) { // Volver
                
                adminProp_SILLASDERUEDAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_SILLASDERUEDAS?.Close();
            }
        }
    });

    adminProp_SILLASDERUEDAS.MenuClose.on(() => {
        adminProp_SILLASDERUEDAS = null;
    });
}

// Muestra el menú prop de sillones
function mostrar_prop_admin_sillones()
{
    adminProp_SILLONES = crearMenu("Sillones", "Prop");
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de lujo blanco", "Sillón de lujo acolchado completamente de cuero blanco con botones, patas cortas de madera"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de lujo negro", "Sillón de lujo acolchado completamente de cuero negro con botones, patas cortas de madera"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de oficina", "Sillón rectangular acolchado completamente con tela de punto de color gris, cuatro patas de madera"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon desgastado", "Sillón antiguo con el acolchado roto por algunas partes, de color verde oscuro"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de cuero", "Sillón en buen estado acolchado completamente con cuero gris y botones en la parte trasera, soporte de madera con cinco ruedas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de barbero", "Sillón de barbero en suspensión acolchado completamente con cuero y botones, reposapiernas en la parte inferior de la silla "));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon con cojin", "Sillón de mimbre de color gris con dos cojines de rayas de color verde y blanco"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon de espera", "Silla baja acolchado con cuero marrón oscuro, sin reposabrazos y con cuatro patas metálicas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon lounger puff negro", "Sillón inusual de color negro, base parecida a un bafle de un altavóz "));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon lounger puff azul", "Sillón inusual de color azul, base parecida a un bafle de un altavóz"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon rojo vino", "Sillón acolchado completamente de cuero con el color vino, cuatro patas cortas de madera"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon naranja usado", "Sillón bajo acolchado completamente de cuero con el color naranja, sin reposabrazos a los lados"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon comodo negro ", "Sillón de plástico negro con la base acolchada con dos pequeños cojines negros, en suspensión con soporte metálico circular"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon naranja", "Sillón acolchado completamente de tela naranja con reposabrazos, dos cojines includios en la base"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon naranja usado", "Sillón bajo acolchado completamente de cuero con el color naranja, sin reposabrazos,"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon naranja moderno", "Sillón de forma inusual de color naranja con reposabrazos a los lados y sin patas ni soporte"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon rojo vivo", "Sillón acolchado completamente con el cuero de color rojo lava, cuatro patas metálicas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon blanco moderno", "Sillón acolchado completamente con el cuero de color blanco, cuatro patas metálicas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon negro moderno", "Sillón de forma inusual de color negro con reposabrazos a los lados y sin patas ni soporte"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon azul cielo moderno", "Sillón acolchado completamente con el cuero de color azul cielo, cuatro patas metálicas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon yate blanco 1", "Sillón acolchado completamente con el cuero de color blanco, detalle de madera oscuro encima de las cuatro patas metálicas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon yate blanco 2", "Sillón de plástico blanco acolchado con un cojín grande de tela de color blanco, sin soporte ni patas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon antiguo", "Sillón antiguo cómodo y colorado, con detalles de figuras de rombos, dos cojines incluidos en la base"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon barbero 1", "Sillón de barbero en suspensión acolchado completamente con cuero y botones de color verde oscuro, reposapiernas en la parte inferior de la silla"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon barbero 2", "Sillón de barbero acolchado de tela azul, con reposabrazos acolchados de tela azul, sin reposapiernas en la parte inferior, en suspensión con soporte cuadrado metálico"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon clubhouse negro", "Sillón de tela negra completamente, base acolchada con tres cojines negros, patas cortas de color negro"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon rojo moderno", "Sillón inusual de color rojo, con reposabrazos y sin soportes ni patas"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon negro extraño", "Sillón con forma de U invertida, acolchado completamente con tela gris, pequeñas patas metálicas de color blanco"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon morado moderno", "Sillón acolchado de color morado completamente, con la base circular sin reposabrazos ni patas o soportes"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon antiguo sucio", "Sillón antiguo con telas encima del cojín de la base, reposabrazos acolchado con tela de punto gris"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon terraza amarillo", "Sillón de mimbre gris completamente con la base acolchada con dos cojines de tela de punto de color amarillo desgastado"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon tratamiento marron", "Sillón tumbado cómodo, acolchado completamente con cuero marrón oscuro, reposacabezas en la parte superior"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Sillon tratamiento negro", "Sillón tumbado cómodo, acolchado completamente con cuero negro, reposacabezas en la parte superior"));
    adminProp_SILLONES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_SILLONES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 33) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_SILLONES", index);
            }
            else if (index == 33) { // Volver
                
                adminProp_SILLONES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_SILLONES?.Close();
            }
        }
    });

    adminProp_SILLONES.MenuClose.on(() => {
        adminProp_SILLONES = null;
    });
}

// Muestra el menú prop de sofas
function mostrar_prop_admin_sofas()
{
    adminProp_SOFAS = crearMenu("Sofás", "Prop");
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa barato", "Sofá en muy mal estado, sin cojines en la base"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa dos personas roto", "Sofá acolchado completamente con tela de color azul, cojines desgastados por el centro"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa dos personas sucio", "Sofá acolchado completamente con tela de color azul, cojines sucios simplemente"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa con cojin dos personas", "Sofá de mimbre de color gris con la base acolchada con cuatro cojines de rayas con los colores verdes y blancos"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa cama deluxe", "Sofá cama con tres cojines de color azul y rojo, soporte metálico por la parte inferior"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Sofa cama deluxe con revista", "Sofá cama con tres cojines de color azul y rojo y revisa hot encima, soporte metálico por la parte inferior"));
    adminProp_SOFAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_SOFAS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 6) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_SOFAS", index);
            }
            else if (index == 6) { // Volver
                
                adminProp_SOFAS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_SOFAS?.Close();
            }
        }
    });

    adminProp_SOFAS.MenuClose.on(() => {
        adminProp_SOFAS = null;
    });
}
// Muestra el menú de taburetes
function mostrar_prop_admin_taburetes()
{
    adminProp_TABURETES = crearMenu("Taburetes", "Prop");
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete de madera", "Taburete de madera desgastada con la base circular y dos reposapiernas"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete negro bar", "Taburete metálico con la base circular acolchada con cojín de tela negro, cuatro patas metálicas"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete yate", "Taburete de plástico blanco con reposapiernas en la parte inferior, en suspenión debido al soporte metálico circular"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete yate 2", "Taburete con la base circular simplemente, cuatro pequeñitos cuadrados en la parte inferior"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete pub", "Taburete  con la base de madera oscura, cuatro patas metálicas de color negro"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete pub 2", "Taburete alto con la base acolchada de cuero negro, cuatro patas metálicas de color amarillo"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete sucio", "Taburete metálico desgastado de color blanco, cuatro patas metálicas"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete blanco", "Taburete con reposaespaldas acolchado y la base del mismo color, en suspensión debido al soporte circular del suelo"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete de madera bar", "Taburete de madera totalmente negro con cuatro patas"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete casino negro", "Taburete alto con la base acolchada con cuero negro, en suspensión con un palo metálico y un soporte en el suelo"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete de tela", "Taburete plegable con la base de tela de punto de color azul, dos patas de madera en forma de X"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete antiguo", "Taburete alto con madera podrida, cuatro patas de madera gris"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Taburete cocina", "Taburete alto con la base acolchada con tela negra, reposapiernas en la parte inferior y en suspensión debido a las cuatro patas metálicas"));
    adminProp_TABURETES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_TABURETES.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 13) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_TABURETES", index);
            }
            else if (index == 13) { // Volver
                
                adminProp_TABURETES?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_TABURETES?.Close();
            }
        }
    });

    adminProp_TABURETES.MenuClose.on(() => {
        adminProp_TABURETES = null;
    });
}


// Muestra el menú prop de tortura
function mostrar_prop_admin_tortura() {
    adminProp_TORTURA = crearMenu("Tortura", "Prop");
    adminProp_TORTURA.AddItem(new UIMenuItem("Cadaver 1", "Víctima tendida en el suelo con un disparo en la cabeza"));
    adminProp_TORTURA.AddItem(new UIMenuItem("Cadaver 2", "Víctima tendida en el suelo con el lado derecho de la cara desgarrada"));
    adminProp_TORTURA.AddItem(new UIMenuItem("Partes del cuerpo", "Partes de cuerpo humano tendidos en el suelo con sangre alrededor"));
    adminProp_TORTURA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_TORTURA.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 3) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_TORTURA", index);
            }
            else if (index == 3) { // Volver
                
                adminProp_TORTURA?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_TORTURA?.Close();
            }
        }
    });

    adminProp_TORTURA.MenuClose.on(() => {
        adminProp_TORTURA = null;
    });
}

// Muestra el menú prop de vehiculos rotos
function mostrar_prop_admin_vehiculosrotos()
{
    adminProp_VEHICULOSROTOS = crearMenu("Sillones", "Prop");
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Bici rota", "BMX de color azul sin la rueda delantera y la trasera pinchada"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Bici rota 2", "BMX de color roja sin el neumático y con la rueda trasera pinchada"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Moto rota", "Scooter de color azul destrozada y abandonada"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Autobus roto", "Parte de la cabina de un autobús quemado, sin neumáticos ni nada"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto", "Vehículo quedamos debido al tiempo sin ninguna parte del motor, solo volante"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto 2", "Vehículo quemado con restos de cristales en las ventanillas y en las lunas"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto 3", "Vehículo rojo aplastado con restos de cristales en el mismo sitio y con las ruedas aplastadas"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto 4", "Vehículo retro con la pintura desgastada de color blanco, sin ruedas y con el motor dentro del capó"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto 5", "Pickup con la rueda del piloto apoyada en la carroceria, con el capó cerrado y sin ruedas, calcinado"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Coche roto 6", "Futo con el maletero abierto y partes del motor en su sitio, todo calcinado sin restos de nada"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Furgoneta rota", "Furgoneta con la pintura desgastada de color azul oscura, con el capó abierto y con la vaca metálica encima"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Avion accidentado", "Jet accidentado con sonidos de ambiente y chispas saliendo de los cables, turbinas en su sitio con ambas alas partidas"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Helicoptero roto", "Un maverick sin un patin de aterrizaje, con media hélice y con los cristales en su sitio"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Ferrocarril roto", "Tranvia fuera de la vía en perfecto estado, colocar fuera de la via simulando accidente"));
    adminProp_VEHICULOSROTOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_VEHICULOSROTOS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 14) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_VEHICULOSROTOS", index);
            }
            else if (index == 14) { // Volver
                
                adminProp_VEHICULOSROTOS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_VEHICULOSROTOS?.Close();
            }
        }
    });

    adminProp_VEHICULOSROTOS.MenuClose.on(() => {
        adminProp_VEHICULOSROTOS = null;
    });
}

// Muestra el menú prop de vending
function mostrar_prop_admin_vending()
{
    adminProp_VENDING = crearMenu("Vending", "Prop");
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de bolas", "Máquina de chicles de todos los sabores, soporte azul con una tapa arriba para meter los chicles"));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de cafe", "Máquina de café marrón oscuro encendida del BeanMachine, con el mensaje Get The WAKE UP! "));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de refrescos 1", "Refrigerador con publicidad de Ecola y varios refrescos dentro como el Sprunk, Junk, Ecola, etc..."));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de refrescos 2", "Máquina expendedora roja encendida,  con la publicidad de Ecola y con stock de Sprunk y otros refrescos más... "));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de refrescos 3", "Máquina expendedora verde encendida, con la publicidad de Sprunk Xtreme y con stock de Ecola y otros refrescos más..."));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de refrescos 4", "Máquina expendedora azul encendida, con la publicidad de Junk The Quick Fix, con stock de energéticas y más..."));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de agua", "Máquina expendedora azul encendida, venta de botellas de la marca Rainé"));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de snack", "Máquina expendedora encendida, venta de snack y todo tipo de chuches"));
    adminProp_VENDING.AddItem(new UIMenuItem("Maquina de agua (oficina)", "Máquina de agua con opción de tenerla fria o caliente, bidón de agua de cinco litros boca abajo. De la marca Rainé"));
    adminProp_VENDING.AddItem(new UIMenuItem("Volver", "Vuelve al mená anterior"));

    adminProp_VENDING.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 9) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_VENDING", index);
            }
            else if (index == 9) { // Volver
                
                adminProp_VENDING?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_VENDING?.Close();
            }
        }
    });

    adminProp_VENDING.MenuClose.on(() => {
        adminProp_VENDING = null;
    });
}

// Muestra el menú prop de otros
function mostrar_prop_admin_otros()
{
    adminProp_OTROS = crearMenu("Vending", "Prop");
    adminProp_OTROS.AddItem(new UIMenuItem("Carrito limpieza", "Carrito de limpieza movible con productos de limpieza encima, cuatro ruedas en la parte inferior "));
    adminProp_OTROS.AddItem(new UIMenuItem("Carrito de compra", "Carrito de supermercado metálico, soporte con cuatro ruedas y de color azul"));
    adminProp_OTROS.AddItem(new UIMenuItem("Carrito de compra 2", "Carrito de supermercado metálico con hexágonos, soporte con cuatro ruedas y de color rojo y blanco"));
    adminProp_OTROS.AddItem(new UIMenuItem("Carrito vagabundo", "Carrito  de vagabundo de color azul con cajas de cartón y bolsas de balsura colgadas a los lados"));
    adminProp_OTROS.AddItem(new UIMenuItem("Carrito vagabundo 2", "Carrito de vagabundo de color rojo con cajas de cartón y colchones encima, varias bolsas del 24/7 colgadas a los lados"));
    adminProp_OTROS.AddItem(new UIMenuItem("Caseta vagabundo", "Caseta individual hecha por cuatro palos de madera, varias bolsas encima y un saco de dormir verde dentro"));
    adminProp_OTROS.AddItem(new UIMenuItem("Tienda de acampada", "Tienda de acampada de color azul cerrada, con una manta encima antigua de color marrón y negro"));
    adminProp_OTROS.AddItem(new UIMenuItem("Tienda de acampada 2", "Tienda de acampada de color verde cerrada, con una manta encima de color verde oscuro"));
    adminProp_OTROS.AddItem(new UIMenuItem("Tienda de acampada 3", "Tienda de acampada profesional de color blanco y cerrada, sin ninguna manta encima"));
    adminProp_OTROS.AddItem(new UIMenuItem("Telescopio", "Telescopio con trípode metálico de color negro"));
    adminProp_OTROS.AddItem(new UIMenuItem("Objetivo de alcance", "Punto de práctica de tiro al torso de una persona, colocar en el suelo"));
    adminProp_OTROS.AddItem(new UIMenuItem("Cubo de fregona", "Cubo de fregona con escurridor"));
    adminProp_OTROS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    adminProp_OTROS.ItemSelect.on((item, index) => {
        if (floodboton_props == 0) {
            floodboton_props = 1;
            crearTimeout(function () {
                floodboton_props = 0;
            }, 1500);
            if (index >= 0 && index < 12) {
                //Damos el prop del lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("adminProp_OTROS", index);
            }
            else if (index == 12) { // Volver
                
                adminProp_OTROS?.Close(true);
                mostrar_prop_admin();
            }
            else {
                adminProp_OTROS?.Close();
            }
        }
    });

    adminProp_OTROS.MenuClose.on(() => {
        adminProp_OTROS = null;
    });
}

}