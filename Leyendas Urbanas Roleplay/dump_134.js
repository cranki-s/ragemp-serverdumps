{
/* --------------------------------------------------------------------------------
 * ayuda.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menus con sus correspondienes sub-menus para el /ayuda
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_ayuda", function (json) {

    let array = JSON.parse(json);
    niveladmin = parseInt(array[0]);
    taxista = array[1];
    policia = array[2];
    sheriff = array[3];
    medico = array[4];
    camionero = array[5];
    basurero = array[6];
    mecanico = array[7];
    reportero = array[8];
    busdriver = array[9];
    pescador = array[10];
    cartero = array[11];
    reponedor = array[12];
    paramedico = array[13];

    mostrar_ayuda()
});

function mostrar_ayuda() {
    ayuda = crearMenu("Ayuda", "Menus de ayuda");
    ayuda.AddItem(new UIMenuItem("General", "Comandos relacionados con el funcionamiento general del servidor"));
    ayuda.AddItem(new UIMenuItem("Menu", "Información del menu"));
    ayuda.AddItem(new UIMenuItem("Chat", "Comandos para el chat del servidor, tanto IC como OOC"));
    ayuda.AddItem(new UIMenuItem("Telefono", "Comandos para manejar el telefono y sus planes de datos"));
    ayuda.AddItem(new UIMenuItem("Personaje", "Comandos generales del personaje"));
    ayuda.AddItem(new UIMenuItem("Objeto", "Comandos para la manipulacion de objetos"));
    ayuda.AddItem(new UIMenuItem("Coche", "Comandos para los coches en general"));
    ayuda.AddItem(new UIMenuItem("Faccion", "Comandos para el manejo de facciones"));
    ayuda.AddItem(new UIMenuItem("Trabajo", "Comandos para utilizar los trabajos"));
    ayuda.AddItem(new UIMenuItem("Habilidades", "Comandos relacionados con cada habilidad"));
    ayuda.AddItem(new UIMenuItem("Propiedad", "Comandos para gestionar tu vivienda o almacen"));
    ayuda.AddItem(new UIMenuItem("Negocio", "Comandos para gestionar tu negocio"));
    if (niveladmin > 0) {
        ayuda.AddItem(aplicarColores(new UIMenuItem("Testing", "Comandos administrativos, para realizar pruebas"), "Naranja"));
    }
    if (niveladmin > 0) {
        ayuda.AddItem(aplicarColores(new UIMenuItem("Staff", "Comandos administrativos, para Moderadores y Game Operators"), "Amarillo"));
    }
    if (niveladmin > 3) {
        ayuda.AddItem(aplicarColores(new UIMenuItem("Admin", "Comandos administrativos, solo para Game Operators"), "Rojo"));
    }

    ayuda.ItemSelect.on((item, index) => {
        ayuda?.Close(true);

        switch (index) {
            case 0:
                mostrar_ayuda_general();
                break;
            case 1:
                mostrar_ayuda_menu();
                break;
            case 2:
                mostrar_ayuda_chat();
                break;
            case 3:
                mostrar_ayuda_telefono();
                break;
            case 4:
                mostrar_ayuda_personaje();
                break;
            case 5:
                mostrar_ayuda_objeto();
                break;
            case 6:
                mostrar_ayuda_coche();
                break;
            case 7:
                mostrar_ayuda_faccion();
                break;
            case 8:
                mostrar_ayuda_trabajo();
                break;
            case 9:
                mostrar_ayuda_habilidad();
                break;
            case 10:
                mostrar_ayuda_propiedad();
                break;
            case 11:
                mostrar_ayuda_negocio();
                break;
            case 12:
                mostrar_ayuda_testing();
                break;
            case 13:
                mostrar_ayuda_staff();
                break;
            case 14:
                mostrar_ayuda_admin();
                break;
        }
    });

    ayuda.MenuClose.on(item => {
        ayuda = null;
    });
}

function mostrar_ayuda_general() {
    ayuda_general = crearMenu("General", "Comandos generales", true);
    ayuda_general.AddItem(new UIMenuItem("/id", "Muestra la informacion de la ID indicada"));
    ayuda_general.AddItem(new UIMenuItem("/duda", "Si tienes alguna duda puedes usar este comando y un miembro del Menus de ayuda te atendera (Si estuvieran disponibles)"));
    ayuda_general.AddItem(new UIMenuItem("/reportar", "Si tienes cualquier problema o debes resolver una disputa sobre una situacion de rol usa este comando para que un Game Operator te atienda (Si estuvieran disponibles)"));
    ayuda_general.AddItem(new UIMenuItem("/avisosadmin", "Listado de avisos admin envidos en el servidor"));
    ayuda_general.AddItem(new UIMenuItem("/autofix", "Para corregir tu estado actual si se detecta algún error (dimensiones, por ejemplo)"));
    ayuda_general.AddItem(new UIMenuItem("/advertencias", "Para consultas las advertencias que te hayan dado"));
    ayuda_general.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_general.ItemSelect.on((item, index) => {
        if (index == 6) {
            ayuda_general?.Close(true);
        }
    });

    ayuda_general.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_general = null;
    });
}

function mostrar_ayuda_menu() {
    ayuda_menu = crearMenu("Menu", "Menu", true);
    ayuda_menu.AddItem(new UIMenuItem("Información", "Puedes abrir el menú pulsando la tecla Alt. \nDesde el menú podrás ver tus estadísticas, tus vehículos, \ntu inventario y encontrar ayuda extra. \nTambien veras un apartado GPS donde se te marcaran los puntos de interés cercanos que elijas."));
    ayuda_menu.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_menu.ItemSelect.on((item, index) => {
        if (index == 1) {
            ayuda_menu?.Close(true);
        }
    });

    ayuda_menu.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_menu = null;
    });
}

function mostrar_ayuda_chat() {
    ayuda_chat = crearMenu("Chat", "Comandos de chat", true);
    ayuda_chat.AddItem(new UIMenuItem("/l", "Permite hablar por el chat local de voz normal"));
    ayuda_chat.AddItem(new UIMenuItem("/c", "Permite hablar en voz baja"));
    ayuda_chat.AddItem(new UIMenuItem("(/sus)urrar", "Permite susurrarle algo a otro jugador"));
    ayuda_chat.AddItem(new UIMenuItem("/gr", "Permite hablar, gritando"));
    ayuda_chat.AddItem(new UIMenuItem("/me", "Permite representar acciones de tu personaje en tercera persona"));
    ayuda_chat.AddItem(new UIMenuItem("/meb", "Permite representar acciones de tu personaje en tercera persona (distancia reducida)"));
    ayuda_chat.AddItem(new UIMenuItem("/ame", "Permite representar acción corta del personaje que se muestra encima de él"));
    ayuda_chat.AddItem(new UIMenuItem("/do", "Permite representar un suceso del entorno que te rodea"));
    ayuda_chat.AddItem(new UIMenuItem("/dob", "Permite representar un suceso del entorno que te rodea (distancia reducida)"));
    ayuda_chat.AddItem(new UIMenuItem("/b", "Permite enviar un mensaje fuera del personaje (OOC)"));
    ayuda_chat.AddItem(new UIMenuItem("/mp", "Permite enviar un mensaje privado fuera del personaje (OOC)"));
    ayuda_chat.AddItem(new UIMenuItem("/hmp", "Permite activar o desactivar el canal de mensajes privados"));
    ayuda_chat.AddItem(new UIMenuItem("/hnoticias", "Permite activar o desactivar el canal de noticias (IC)"));
    ayuda_chat.AddItem(new UIMenuItem("/hradio", "Permite apagar o encender tu radio"));
    ayuda_chat.AddItem(new UIMenuItem("/hfamilia", "Permite ocultar o mostrar tu chat de familia de tu facción"));
    //ayuda_chat.AddItem(new UIMenuItem("(/c)anal(p)rivado", "Permite hablar por un canal de charla privado abierto")); // No existe al parecer ni /acp
    ayuda_chat.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_chat.ItemSelect.on((item, index) => {
        if (index == 15) {
            ayuda_chat?.Close(true);
        }
    });

    ayuda_chat.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_chat = null;
    });
}

function mostrar_ayuda_telefono() {
    ayuda_telefono = crearMenu("Telefono", "Comandos del telefono", true);
    ayuda_telefono.AddItem(new UIMenuItem("/telefono", "Sacas el teléfono de tu bolsillo y lo miras"));
    ayuda_telefono.AddItem(new UIMenuItem("/cerrartelefono", "Guardas de nuevo el teléfono en tu bolsillo"));
    ayuda_telefono.AddItem(new UIMenuItem("/llamar", "Llamar al número de teléfono indicado"));
    ayuda_telefono.AddItem(new UIMenuItem("/colgar", "Colgar o terminar la llamada actual"));
    ayuda_telefono.AddItem(new UIMenuItem("/contestar", "Constar la llamada entrante"));
    ayuda_telefono.AddItem(new UIMenuItem("/altavoz", "Activa o desactiva el altavoz del teléfono"));
    ayuda_telefono.AddItem(new UIMenuItem("/la", "Hablar por el altavoz de un teléfono ajeno cercano a tí"));
    ayuda_telefono.AddItem(new UIMenuItem("/tc", "Muestra u oculta el cursor en la interfaz del teléfono"));
    ayuda_telefono.AddItem(new UIMenuItem("/contratarplan", "Contratar un plan de telefonía y datos"));
    ayuda_telefono.AddItem(new UIMenuItem("/darbajaplan", "Dar de baja el plan de telefonía y datos"));
    ayuda_telefono.AddItem(new UIMenuItem("/miplan", "Muestra información sobre el plan de telefonía contratado"));
    ayuda_telefono.AddItem(new UIMenuItem("/vibracion", "Activa o desactiva el modo vibración"));
    ayuda_telefono.AddItem(new UIMenuItem("/silencio", "Activa o desactiva el modo silencio"));
    ayuda_telefono.AddItem(new UIMenuItem("/apagartelefono", "Apaga el teléfono, no recibirás llamadas ni SMS"));
    ayuda_telefono.AddItem(new UIMenuItem("/encendertelefono", "Enciende el teléfono, recibirás llamadas y SMS"));
    ayuda_telefono.AddItem(new UIMenuItem("/tlfcontactos", "Consulta la información sobre los contactos de teléfono de un jugador"));
    ayuda_telefono.AddItem(new UIMenuItem("/tlfllamadas", "Consulta la información sobre las llamadas de teléfono de un jugador"));
    ayuda_telefono.AddItem(new UIMenuItem("/tlfsms", "Consulta la información sobre los SMS del teléfono de un jugador"));
    ayuda_telefono.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_telefono.ItemSelect.on((item, index) => {
        if (index == 18) {
            ayuda_telefono?.Close(true);
        }
    });

    ayuda_telefono.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_telefono = null;
    });
}

function mostrar_ayuda_personaje() {
    ayuda_personaje = crearMenu("Personaje", "Comandos de personaje", true);
    ayuda_personaje.AddItem(new UIMenuItem("/ceder", "Muestra tu inventario para ceder un objeto a otro jugador"));
    ayuda_personaje.AddItem(new UIMenuItem("/tirar", "Tira un objeto de un inventario"));
    ayuda_personaje.AddItem(new UIMenuItem("/guardar", "Guarda el objeto que tengas en la mano en tu inventario"));
    ayuda_personaje.AddItem(new UIMenuItem("/recoger", "Recoger un objeto del suelo"));
    ayuda_personaje.AddItem(new UIMenuItem("/revisar", "Revisar un objeto del suelo, sin cogerlo"));
    ayuda_personaje.AddItem(new UIMenuItem("/stats", "Muestra un resumen de las estadísticas y propiedades de tu personaje"));
    ayuda_personaje.AddItem(new UIMenuItem("/animaciones", "Listado de animaciones"));
    ayuda_personaje.AddItem(new UIMenuItem("/escenarios", "Listado de escenarios"));
    ayuda_personaje.AddItem(new UIMenuItem("/anim", "Para aplicar una animacion concreta a tu personaje"));
    ayuda_personaje.AddItem(new UIMenuItem("/animsinc", "Realizar animaciones sincronizadas entre jugadores"));
    // ayuda_personaje.AddItem(new UIMenuItem("/licencias", "Muestra tus licencias a tí mismo o a otro jugador"));
    // ayuda_personaje.AddItem(new UIMenuItem("/documentacion", "Muestra tu documentación a tí mismo o a otro jugador"));
    ayuda_personaje.AddItem(new UIMenuItem("/pagar", "Paga una cantidad especificada de tu dinero en mano a otro jugador"));
    ayuda_personaje.AddItem(new UIMenuItem("/aceptar", "Acepta un trato en curso, como la venta de un vehículo"));
    ayuda_personaje.AddItem(new UIMenuItem("/cancelar", "Cancela un trato en curso, como la venta de una propiedad"));
    ayuda_personaje.AddItem(new UIMenuItem("/puerta", "Abre o cierra las puertas con control remoto"));
    ayuda_personaje.AddItem(new UIMenuItem("/reaparecer", "Reaparecer en caso de haber muerto, siempre que haya pasado el tiempo"));
    ayuda_personaje.AddItem(new UIMenuItem("/mismultas", "Muestra una lista de tus multas pendientes, a pagar en los juzgados"));
    ayuda_personaje.AddItem(new UIMenuItem("/pagarmulta", "Pagar la multa especificada"));
    ayuda_personaje.AddItem(new UIMenuItem("/dado", "Lanzar un dado para establecer la probabilidad o jugar IC"));
    ayuda_personaje.AddItem(new UIMenuItem("/anuncios", "Muestra una lista de los anuncios IC publicados"));
    ayuda_personaje.AddItem(new UIMenuItem("/parada", "Muestra información sobre la parada de autobús en la que estés"));
    ayuda_personaje.AddItem(new UIMenuItem("/pasamontañas", "Ponerte un pasamontañas de la lista y ocultar tu identidad"));
    ayuda_personaje.AddItem(new UIMenuItem("/casco", "Ponerte un casco de la lista"));
    ayuda_personaje.AddItem(new UIMenuItem("/estadosanimo", "Establece el estado de ánimo de tu personaje según diferentes emociones faciales"));
    ayuda_personaje.AddItem(new UIMenuItem("/estadoscaminar", "Cambia el estilo de caminar de tu personaje, dependiendo de su genéro"));
    ayuda_personaje.AddItem(new UIMenuItem("/entrar", "Entra a una propiedad, también usable con la tecla Y"));
    ayuda_personaje.AddItem(new UIMenuItem("/salir", "Sale de una propiedad, también usable con la tecla Y"));
    ayuda_personaje.AddItem(new UIMenuItem("/miropa", "Muestra una lista de la ropa que llevas puesta y sus IDs"));
    ayuda_personaje.AddItem(new UIMenuItem("/condena", "Muestra el tiempo que te queda por cumplir de tu condena"));
    ayuda_personaje.AddItem(new UIMenuItem("/emisoras", "Muestra una lista de emisoras disponibles para escuchar"));
    ayuda_personaje.AddItem(new UIMenuItem("/emisora", "Muestra las opciones de una emisora que esta sonando"));
    ayuda_personaje.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_personaje.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_personaje?.Close(true);
        }
    });

    ayuda_personaje.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_personaje = null;
    });
}

function mostrar_ayuda_objeto() {
    ayuda_objeto = crearMenu("Objeto", "Comandos de objetos", true);
    ayuda_objeto.AddItem(new UIMenuItem("/empaquetar", "Crea un paquete de un objeto empaquetable"));
    ayuda_objeto.AddItem(new UIMenuItem("/empaquetararma", "Crea un paquete de armas empaquetables"));
    ayuda_objeto.AddItem(new UIMenuItem("/sacarunidad", "Sacar una unidad de un objeto empaquetado"));
    ayuda_objeto.AddItem(new UIMenuItem("/meterunidad", "Meter una unidad en el paquete"));
    ayuda_objeto.AddItem(new UIMenuItem("/meterarma", "Meter un arma en el paquete de armas"));
    ayuda_objeto.AddItem(new UIMenuItem("/dividirpaquete", "Dividir el paquete en más pequeños"));
    ayuda_objeto.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_objeto.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_objeto?.Close(true);
        }
    });

    ayuda_objeto.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_objeto = null;
    });
}

function mostrar_ayuda_coche() {
    ayuda_coche = crearMenu("Coche", "Comandos de coche", true);
    ayuda_coche.AddItem(new UIMenuItem("/(miveh)iculo", "Muestra información de los coches que tienes y su ubicación"));
    ayuda_coche.AddItem(new UIMenuItem("/(m)otor", "Enciende o apaga el motor"));
    ayuda_coche.AddItem(new UIMenuItem("/menucoche", "Abrímos un menú que nos permitirá ponernos el cinturón, limitador de velocidad, bloquear puertas, ventanillas..."));
    ayuda_coche.AddItem(new UIMenuItem("/capo", "Abre o cierra el capó (desde dentro del vehículo)"));
    ayuda_coche.AddItem(new UIMenuItem("/(mal)etero", "Abre o cierra el maletero (/mal cerrar)"));
    ayuda_coche.AddItem(new UIMenuItem("/bloqueo", "Abre o cierra las puertas del vehículo más cercano"));
    ayuda_coche.AddItem(new UIMenuItem("/estadomotor", "Muestra información sobre el estado del motor"));
    ayuda_coche.AddItem(new UIMenuItem("/resitecar", "Resitúa los vehículos cercanos"));
    ayuda_coche.AddItem(new UIMenuItem("/cinturon", "Abrocharse o desabrochar el cinturón de seguridad"));
    ayuda_coche.AddItem(new UIMenuItem("/darllaveveh", "Hace una copia de las llaves a otro jugador y se las entrega"));
    ayuda_coche.AddItem(new UIMenuItem("/tirarllaveveh", "Tirar una llave de vehículo prestada"));
    ayuda_coche.AddItem(new UIMenuItem("/venderveh", "Vender un vehículo de tu propiedad a otro jugador"));
    ayuda_coche.AddItem(new UIMenuItem("/usarlata", "Llenar el depósito con una lata de gasolina comprada en la tienda"));
    ayuda_coche.AddItem(new UIMenuItem("/(meg)afono", "Usar el megáfono de un vehículo"));
    ayuda_coche.AddItem(new UIMenuItem("/ventanilla1", "Bajas la ventanilla del piloto."));
    ayuda_coche.AddItem(new UIMenuItem("/ventanilla2", "Bajas la ventanilla del copiloto."));
    ayuda_coche.AddItem(new UIMenuItem("/ventanilla3", "Bajas la ventanilla de la parte trasera izquierda."));
    ayuda_coche.AddItem(new UIMenuItem("/ventanilla4", "Bajas la ventanilla de la parte trasera derecha."));
    ayuda_coche.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_coche.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_coche?.Close(true);
        }
    });

    ayuda_coche.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_coche = null;
    });
}

function mostrar_ayuda_faccion() {
    ayuda_faccion = crearMenu("Faccion", "Comandos de faccion", true);
    ayuda_faccion.AddItem(new UIMenuItem("/r", "Hablar por radio local del departamento"));
    ayuda_faccion.AddItem(new UIMenuItem("/d", "Hablar por radio entre departamentos"));
    ayuda_faccion.AddItem(new UIMenuItem("/cr", "Cambiar canal de radio local del departamento"));
    ayuda_faccion.AddItem(new UIMenuItem("/f", "Hablar por el canal de facción o familia (OOC)"));
    ayuda_faccion.AddItem(new UIMenuItem("/deservicio", "Entrar o salir de servicio, necesario para equipar items"));
    ayuda_faccion.AddItem(new UIMenuItem("/miembros", "Muestra un listado de miembros de la facción conectados actualmente"));
    ayuda_faccion.AddItem(new UIMenuItem("/invitar", "Invitar a un jugador a tu facción"));
    ayuda_faccion.AddItem(new UIMenuItem("/expulsarmiembro", "Expulsar a un miembro de tu facción"));
    ayuda_faccion.AddItem(new UIMenuItem("/abandonarfaccion", "Abandonas la facción en la que estés"));
    ayuda_faccion.AddItem(new UIMenuItem("/asignarrango", "Asigna un rango a un miembro de tu facción"));
    ayuda_faccion.AddItem(new UIMenuItem("/rangos", "Muestra un listado de los rangos disponibles para la facción"));
    ayuda_faccion.AddItem(new UIMenuItem("/hfamilia", "Activa o desactiva el canal de familia"));
    ayuda_faccion.AddItem(new UIMenuItem("/traficar", "Realiza un trafico de los objetos que tenga permitidos tu faccion"));
    ayuda_faccion.AddItem(new UIMenuItem("/recogerpedido", "Cuando te encuentras en el punto de recogida recoges la mercancia"));
    ayuda_faccion.AddItem(new UIMenuItem("/rutatrafico", "Te marca el punto de recogida y la ruta a el"));
    ayuda_faccion.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_faccion.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_faccion?.Close(true);
        }
    });

    ayuda_faccion.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_faccion = null;
    });
}

function mostrar_ayuda_trabajo() {
    ayuda_trabajo = crearMenu("Trabajo", "Opciones de trabajo", true);
    ayuda_trabajo.AddItem(new UIMenuItem("Taxista", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Policia", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Sheriff", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Medico", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Camionero", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Basurero", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Mecanico", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Reportero", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Autobusero", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Pescador", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Cartero", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Reponedor", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Paramédico", ""));
    ayuda_trabajo.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                if (taxista == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_taxista();
                }
                break;
            case 1:
                if (policia == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_policia();
                }
                break;
            case 2:
                if (sheriff == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_sheriff();
                }
                break;
            case 3:
                if (medico == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_medico();
                }
                break;
            case 4:
                if (camionero == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_camionero();
                }
                break;
            case 5:
                if (basurero == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_basurero();
                }
                break;
            case 6:
                if (mecanico == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_mecanico();
                }
                break;
            case 7:
                if (reportero == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_reportero();
                }
                break;
            case 8:
                if (busdriver == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_busdriver();
                }
                break;
            case 9:
                if (pescador == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_pescador();
                }
                break;
            case 10:
                if (cartero == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_cartero();
                }
                break;
            case 11:
                if (reponedor == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_reponedor();
                }
                break;
            case 12:
                if (paramedico == false) {
                    mostrarAviso("danger", 3000, 'No tienes permisos para ver este menu porque no tienes ese trabajo');
                    return;
                }
                else {
                    mostrar_ayuda_trabajo_paramedico();
                }
                break;
            default:
                ayuda_trabajo?.Close(true);
                return;
        }

        ayuda_trabajo.setVisible(false, true);
        ayuda_trabajo = null;
    });

    ayuda_trabajo.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_trabajo = null;
    });
}

function mostrar_ayuda_trabajo_taxista() {
    ayuda_trabajo_taxista = crearMenu("Taxista", "Comandos de taxista", true);
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/taxi", "Encender la luz del taxi"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/rt", "Hablar por la radio del taxi"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/llamadastaxi", "Muestra la centralita de llamadas de taxi"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/atendertaxi", "Atender una llamada de taxi"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/rutataxi", "Vuelve a mostrar la ruta de la llamada en el mapa"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/recogercliente", "Permite recoger a un cliente NPC"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/dejarcliente", "Permite dejar a tu cliente NPC"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("/cancelarllamada", "Permite anular una llamada que estabamos atendiendo"));
    ayuda_trabajo_taxista.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_taxista.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_taxista?.Close(true);
        }
    });

    ayuda_trabajo_taxista.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_taxista = null;
    });
}

function mostrar_ayuda_trabajo_policia() {
    ayuda_trabajo_policia = crearMenu("Policia", "Comandos de policia", true);
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/cachear", "Cachear a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/esposar", "Esposar a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/desesposar", "Desesposar a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/arrestar", "Arrestar a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/desarrestar", "Desarrestar a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/deposito", "Meter un vehículo al depósito"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/quitararmas", "Retirarle las armas a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/quitardrogas", "Retirarle las drogas a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/multar", "Multar a otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/multarf", "Multar a otro jugador. (Fuerza el cobro al aceptar)"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/dpi", "Añadir puntos de infracción a la licencia de conducción de otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/qpi", "Quitar puntos de infracción de la licencia de conducción de otro jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/centralita", "Ver las llamadas pendientes de la centralita"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/camaraheli", "Activar o desactivar la cámara del helicoptero de policía"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdmatricula", "Buscar información sobre la matrícula de un vehículo"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdinfopers", "Buscar información sobre una persona"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdinfoprop", "Buscar información sobre una propiedad"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdinfoneg", "Buscar información sobre un negocio"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdmultas", "Buscar información sobre las multas de una persona"));
    // ayuda_trabajo_policia.AddItem(new UIMenuItem("/pincho", "Colocar un pincho en el suelo"));
    // ayuda_trabajo_policia.AddItem(new UIMenuItem("/qpincho", "Borra un pincho colocado en el suelo"));
    // ayuda_trabajo_policia.AddItem(new UIMenuItem("/qpinchos", "Borra todos los pinchos colocados"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/(f)orzar(p)uerta", "Forzar la puerta de una propiedad o garaje"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/foco", "Enciende el foco del helicóptero de policía"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/ccs", "Comprobar cinturón de seguridad de un jugador"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/estadometro", "Abre o cierra la estacion de metro en la que te encuentras, tienes que estar encima del mensaje de estado."));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/pdtelefono", "Para averiguar el nombre del propietario de un teléfono"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/solicitargrua", "Solicitas una grua para retirar el vehículo indicado"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/anulargrua", "Anulas la peticion de grua para el vehículo indicado"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/huellas", "Permite ver la información cientifica de un objeto que tienes en la mano"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/placa", "Muestras tu placa a ti mismo o a otro usuario"));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("/forzarpuerta", "Coloca una carga explosiva en una puerta para abrirla, ya sea de negocio o propiedad."));
    ayuda_trabajo_policia.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_policia.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_policia?.Close(true);
        }
    });

    ayuda_trabajo_policia.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_policia = null;
    });
}

function mostrar_ayuda_trabajo_sheriff() {
    ayuda_trabajo_sheriff = crearMenu("Sheriff", "Comandos de sheriff", true);
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/cachear", "Cachear a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/esposar", "Esposar a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/desesposar", "Desesposar a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/arrestar", "Arrestar a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/desarrestar", "Desarrestar a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/deposito", "Meter un vehículo al depósito"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/quitararmas", "Retirarle las armas a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/quitardrogas", "Retirarle las drogas a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/multar", "Multar a otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/multarf", "Multar a otro jugador. (Fuerza el cobro al aceptar)"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/dpi", "Añadir puntos de infracción a la licencia de conducción de otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/qpi", "Quitar puntos de infracción de la licencia de conducción de otro jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/centralita", "Ver las llamadas pendientes de la centralita"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/camaraheli", "Activar o desactivar la cámara del helicoptero de policía"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdmatricula", "Buscar información sobre la matrícula de un vehículo"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdinfopers", "Buscar información sobre una persona"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdinfoprop", "Buscar información sobre una propiedad"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdinfoneg", "Buscar información sobre un negocio"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdmultas", "Buscar información sobre las multas de una persona"));
    // ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pincho", "Colocar un pincho en el suelo"));
    // ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/qpincho", "Borra un pincho colocado en el suelo"));
    // ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/qpinchos", "Borra todos los pinchos colocados"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/(f)orzar(p)uerta", "Forzar la puerta de una propiedad o garaje"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/foco", "Enciende el foco del helicóptero de policía"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/ccs", "Comprobar cinturón de seguridad de un jugador"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/estadometro", "Abre o cierra la estacion de metro en la que te encuentras, tienes que estar encima del mensaje de estado."));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/pdtelefono", "Para averiguar el nombre del propietario de un teléfono"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/solicitargrua", "Solicitas una grua para retirar el vehículo indicado"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/anulargrua", "Anulas la peticion de grua para el vehículo indicado"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/huellas", "Permite ver la información cientifica de un objeto que tienes en la mano"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/placa", "Muestras tu placa a ti mismo o a otro usuario"));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("/forzarpuerta", "Coloca una carga explosiva en una puerta para abrirla, ya sea de negocio o propiedad."));
    ayuda_trabajo_sheriff.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_sheriff.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_sheriff?.Close(true);
        }
    });

    ayuda_trabajo_sheriff.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_sheriff = null;
    });
}

function mostrar_ayuda_trabajo_medico() {
    ayuda_trabajo_medico = crearMenu("Medico", "Comandos de medico", true);
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/reanimar", "Reanimar a otro jugador con el botiquín en la mano"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/curar", "Curar a otro jugador con el botiquín en la mano"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/estadometro", "Abre o cierra la estacion de metro en la que te encuentras, tienes que estar encima del mensaje de estado."));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/sacarcamilla", "Saca una camilla de la ambulancia"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/soltarcamilla", "Soltar la camilla en el suelo"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/cogercamilla", "Recoges la camilla del suelo"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/guardarcamilla", "Mete una camilla de vuelta a la ambulancia"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/subirpaciente", "Sube al paciente en la camilla"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/metercamilla", "Mete la camilla y al paciente en la ambulancia "));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("/desintoxicar", "Desintoxic a un paciente de todas sus adicciones en el hospital"));
    ayuda_trabajo_medico.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_medico.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_medico?.Close(true);
        }
    });

    ayuda_trabajo_medico.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_medico = null;
    });
}

function mostrar_ayuda_trabajo_camionero() {
    ayuda_trabajo_camionero = crearMenu("Camionero", "Comandos de camionero", true);
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/repartos", "Consulta la lista de los repartos disponibles, indicando la llave de un negocio consultas la lista de repartos que el negocio tiene pendiente por recibir"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/mireparto", "Muestra información sobre tu reparto"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/cancelarreparto", "Cancela el reparto en curso"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/recogermercancia", "Recoge la mercancia del lugar de recogida"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/metermercancia", "Mete la mercancía en el vehículo de reparto"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/sacarmercancia", "Saca la mercancía del vehículo de reparto"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/entregarmercancia", "Entrega la mercancía en el lugar de destino"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/rutacamion", "Vuelve a marcar la ruta del reparto en el GPS"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/traertrailer", "Teleporta el trailer por si se pierde o desengancha"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/desenganchar", "Desengancha el traíler del camión"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("/rc", "Hablar por la radio de camioneros"));
    ayuda_trabajo_camionero.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_camionero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_camionero?.Close(true);
        }
    });

    ayuda_trabajo_camionero.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_camionero = null;
    });
}

function mostrar_ayuda_trabajo_basurero() {
    ayuda_trabajo_basurero = crearMenu("Basurero", "Comandos de basurero", true);
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/basurero", "Empezar un trabajo de basurero solo o con otros jugadores"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/rutabasurero", "Muestra la ruta actual del trabajo por si se pierde"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/recogerbasura", "Recoger la basura en un trabajo de basurero"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/meterbasura", "Meter la basura recogida en el camión"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/cancelarbasurero", "Cancelar el trabajo actual de basurero"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("/radiobasurero", "Hablar por la radio de los basureros"));
    ayuda_trabajo_basurero.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_basurero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_basurero?.Close(true);
        }
    });

    ayuda_trabajo_basurero.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_basurero = null;
    });
}

function mostrar_ayuda_trabajo_mecanico() {
    ayuda_trabajo_mecanico = crearMenu("Mecanico", "Comandos de mecanico", true);
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/repararmotor", "Reparar el motor un vehículo (dentro de un taller)"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/repararchapa", "Reparar la chapa de un vehículo (dentro de un taller)"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/repararruedas", "Reparar las ruedas de un vehículo"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/pintar", "Pintar un vehículo (dentro de un taller)"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/cambiarcerradura", "Cambiar la cerradura de un vehículo (dentro de un taller)"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/llamadasmecanico", "Muestra una lista de llamadas pendientes por atender"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/atendermecanico", "Atender una llamada"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/desenganchar", "Desenganchar el remolque del vehículo"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/monomecanico", "Ponerse o quitarse el mono de trabajo"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/grua", "Remolcar el vehiculo"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("/serviciosgrua", "Consulta los servicios de grua pendientes"));
    ayuda_trabajo_mecanico.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_mecanico.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_mecanico?.Close(true);
        }
    });

    ayuda_trabajo_mecanico.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_mecanico = null;
    });
}

function mostrar_ayuda_trabajo_reportero() {
    ayuda_trabajo_reportero = crearMenu("Reportero", "Comandos de reportero", true);
    ayuda_trabajo_reportero.AddItem(new UIMenuItem("/an", "Enviar un anuncio nuevo sin coste alguno"));
    ayuda_trabajo_reportero.AddItem(new UIMenuItem("/retransmitir", "Iniciar una nueva retransimisión"));
    ayuda_trabajo_reportero.AddItem(new UIMenuItem("(/tr)ansmitir", "Hablar en la retransmisión iniciada"));
    ayuda_trabajo_reportero.AddItem(new UIMenuItem("/finretransmision", "Finalizar la retransmisión en progreso"));
    ayuda_trabajo_reportero.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_reportero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_reportero?.Close(true);
        }
    });

    ayuda_trabajo_reportero.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_reportero = null;
    });
}

function mostrar_ayuda_trabajo_busdriver() {
    ayuda_trabajo_busdriver = crearMenu("Autobusero", "Comandos de autobusero", true);
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("/lineas", "Empezar a trabajar en una línea"));
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("/abrirbus", "Abrir las puertas del autobus"));
    //ayuda_trabajo_busdriver.AddItem(new UIMenuItem("/cerrarbus", "Cerrar las puertas del autobus"));
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("/finbus", "Finalizar el trabajo como conductor de autobuses"));
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("/rutabus", "Marca la ruta de la parada actual por si se pierde"));
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("(/r)adio(bus)", "Hablar por la radio con otros conductores de autobuses"));
    ayuda_trabajo_busdriver.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_busdriver.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_busdriver?.Close(true);
        }
    });

    ayuda_trabajo_busdriver.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_busdriver = null;
    });
}

function mostrar_ayuda_trabajo_pescador() {
    ayuda_trabajo_pescador = crearMenu("Pescador", "Comandos de pescador", true);
    ayuda_trabajo_pescador.AddItem(new UIMenuItem("/pescar", "Empezar a pescar o intentar pescar si ya se está pescando"));
    ayuda_trabajo_pescador.AddItem(new UIMenuItem("/descargarpescado", "Descargar el pescado recogido para obtener ganancias"));
    ayuda_trabajo_pescador.AddItem(new UIMenuItem("(/r)adio(p)esca", "Hablar por la radio con otros pescadores"));
    ayuda_trabajo_pescador.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_pescador.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_pescador?.Close(true);
        }
    });

    ayuda_trabajo_pescador.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_pescador = null;
    });
}

function mostrar_ayuda_trabajo_cartero() {
    ayuda_trabajo_cartero = crearMenu("Pescador", "Comandos de cartero", true);
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/cartero", "Empezar un nuevo trabajo como cartero"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/sacarpaquete", "Descargar el paquete para posteriormente entregarlo"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/meterpaquete", "Metes el paquete en el vehículo"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/entregarpaquete", "Entregar el paquete en la propiedad"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/micartero", "Muestra la ruta actual a la que hay que dirigirse"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("/fincartero", "Finalizar el trabajo como cartero"));
    ayuda_trabajo_cartero.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_cartero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_cartero?.Close(true);
        }
    });

    ayuda_trabajo_cartero.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_cartero = null;
    });
}

function mostrar_ayuda_trabajo_reponedor() {
    ayuda_trabajo_reponedor = crearMenu("Reponedor", "Comandos de reponedor", true);
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("/reponedor", "Empezar un nuevo trabajo como reponedor"));
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("/sacarmercancia", "Descargar el paquete para posteriormente entregarlo"));
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("/entregarpaquete", "Entregar el paquete en la propiedad"));
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("/miruta", "Muestra la ruta actual a la que hay que dirigirse"));
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("/finreponedor", "Finalizar el trabajo como reponedor"));
    ayuda_trabajo_reponedor.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_reponedor.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_reponedor?.Close(true);
        }
    });

    ayuda_trabajo_reponedor.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_reponedor = null;
    });
}

function mostrar_ayuda_trabajo_paramedico() {
    ayuda_trabajo_paramedico = crearMenu("Paramedico", "Comandos de paramedico", true);
    ayuda_trabajo_paramedico.AddItem(new UIMenuItem("/curar", "Curar a otro jugador con el botiquín en la mano"));
    ayuda_trabajo_paramedico.AddItem(new UIMenuItem("/reanimar", "Reanimar a otro jugador con el botiquín en la mano"));
    ayuda_trabajo_paramedico.AddItem(new UIMenuItem("/paramedico", "Inicias tu trabajo, si ya estas trabajando te muestra el menu del trabajo. \nDebe usarse dentro de una ambulancia."));
    ayuda_trabajo_paramedico.AddItem(new UIMenuItem("(/r)adio(p)a(r)amedico", "Habla por la radio con otros compañeros."));
    ayuda_trabajo_paramedico.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_trabajo_paramedico.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_trabajo_paramedico?.Close(true);
        }
    });

    ayuda_trabajo_paramedico.MenuClose.on(item => {
        mostrar_ayuda_trabajo();
        ayuda_trabajo_paramedico = null;
    });
}

function mostrar_ayuda_habilidad() {
    ayuda_habilidad = crearMenu("Habilidades", "Opciones de habilidades", true);
    ayuda_habilidad.AddItem(new UIMenuItem("Delincuente", ""));
    ayuda_habilidad.AddItem(new UIMenuItem("Pesca", ""));
    ayuda_habilidad.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_habilidad.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_ayuda_habilidad_delincuente();
                break;
            case 1:
                mostrar_ayuda_habilidad_pesca();
                break;
            default:
                ayuda_habilidad?.Close(true);
                return;
        }

        ayuda_habilidad.setVisible(false, true);
        ayuda_habilidad = null;
    });

    ayuda_habilidad.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_habilidad = null;
    });
}

function mostrar_ayuda_habilidad_delincuente() {
    ayuda_habilidad_delincuente = crearMenu("Delincuente", "Comandos de delincuente", true);
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/cachear", "Cachear a otro jugador"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/hurtar", "Hurtar objetos de negocios"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/forzarcerradura", "Para abrir una puerta cerrada de una propiedad o negocio, depende del tipo de puerta sera mas facil o dificil."));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("Forzar puerta", "Para abrir una puerta cerrada de un vehículo debes usar una palanca y golpear en la puerta del conductor o copolito para conseguir abrirlo."));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/puente", "Hacer un puente en el contacto de un vehículo para arrancarlo"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/entregarcoche", "Entregar un coche robado a uno de tus contactos a cambio de dinero"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/asaltocamion", "Asaltar el camión de un camionero para robarle mercancía"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/traficarnegro", "Traficar con ciertos productos en el mercado negro"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("/delincuentecd", "Consultar el tiempo restante para cometer otro delito"));
    ayuda_habilidad_delincuente.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_habilidad_delincuente.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_habilidad_delincuente?.Close(true);
        }
    });

    ayuda_habilidad_delincuente.MenuClose.on(item => {
        mostrar_ayuda_habilidad();
        ayuda_habilidad_delincuente = null;
    });
}

function mostrar_ayuda_habilidad_pesca() {
    ayuda_habilidad_pesca = crearMenu("Pesca", "Comandos de pesca", true);
    ayuda_habilidad_pesca.AddItem(new UIMenuItem("Información", "Para iniciar la pesca utiliza el comando ~b~/usar ~w~con una caña de pescar en la mano o, desde el inventario, pulsa el botón ~b~Usar~w~."));
    ayuda_habilidad_pesca.AddItem(new UIMenuItem("/fpesca", "Finaliza la sesión de pesca."));
    ayuda_habilidad_pesca.AddItem(new UIMenuItem("/pescaventa", "Abre el menú de un punto de venta de pesca."));
    ayuda_habilidad_pesca.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_habilidad_pesca.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_habilidad_pesca?.Close(true);
        }
    });

    ayuda_habilidad_pesca.MenuClose.on(item => {
        mostrar_ayuda_habilidad();
        ayuda_habilidad_pesca = null;
    });
}

function mostrar_ayuda_propiedad() {
    ayuda_propiedad = crearMenu("Propiedad", "Comandos de propiedades", true);
    ayuda_propiedad.AddItem(new UIMenuItem("/info", "Muestra información de la propiedad o negocio de tu ubicación"));
    ayuda_propiedad.AddItem(new UIMenuItem("/miprop", "Muestra un listado de tus propiedades o almacenes e indica su ubicación"));
    ayuda_propiedad.AddItem(new UIMenuItem("/visitar", "Visita brevemente una propiedad en venta o alquiler para ver su interior"));
    ayuda_propiedad.AddItem(new UIMenuItem("/comprarpropiedad", "Compra una propiedad disponible"));
    ayuda_propiedad.AddItem(new UIMenuItem("/venderpropiedad", "Vender una propiedad al estado por un porcentaje, pregunta antes de vender"));
    ayuda_propiedad.AddItem(new UIMenuItem("/venderpropiedadjug", "Vender una propiedad a un jugador por el precio indicado"));
    ayuda_propiedad.AddItem(new UIMenuItem("/alquilarpropiedad", "Alquila una propiedad disponible, cobra en cada payday"));
    ayuda_propiedad.AddItem(new UIMenuItem("/desalquilarpropiedad", "Cancela el contrato de alquiler de una propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/darllaveprop", "Hace una copia de la llave de la propiedad y se la presta a otro jugador"));
    ayuda_propiedad.AddItem(new UIMenuItem("/tirarllaveprop", "Tira una llave de la propiedad prestada"));
    ayuda_propiedad.AddItem(new UIMenuItem("/abrirprop", "Abre la puerta de la propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/cerrarprop", "Cierra la puerta de la propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/garaje", "Entrar al garaje desde dentro de la propiedad o ir a la propiedad desde el garaje"));
    ayuda_propiedad.AddItem(new UIMenuItem("/situarinvprop", "Situar la posición del armario o inventario de propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/invprop", "Ver y sacar objetos del inventario de una propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/ginvprop", "Guardar objetos en el inventario de la propiedad"));
    ayuda_propiedad.AddItem(new UIMenuItem("/huir", "Salir por una puerta alternativa de la propiedad, siempre que esté situada"));
    ayuda_propiedad.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_propiedad.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_propiedad?.Close(true);
        }
    });

    ayuda_propiedad.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_propiedad = null;
    });
}

function mostrar_ayuda_negocio() {
    ayuda_negocio = crearMenu("Negocio", "Comandos de negocios", true);
    ayuda_negocio.AddItem(new UIMenuItem("/info", "Muestra información sobre un negocio que esté en tu posición"));
    ayuda_negocio.AddItem(new UIMenuItem("/comprar", "Compra objetos del negocio en el mostrador"));
    ayuda_negocio.AddItem(new UIMenuItem("/comprarnegocio", "Comprar el negocio al estado"));
    ayuda_negocio.AddItem(new UIMenuItem("/vendernegocio", "Vender el negocio al estado, mostrando mensaje de confirmación"));
    ayuda_negocio.AddItem(new UIMenuItem("/vendernegociojug", "Vender el negocio a otro jugador"));
    ayuda_negocio.AddItem(new UIMenuItem("/cajanegocio", "Consultar o vaciar la caja de tu negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/minegocio", "Muestra el listado de negocios que tienes y su ubicación"));
    ayuda_negocio.AddItem(new UIMenuItem("/actualizarnombrenegocio", "Actualiza el nombre del negocio, se usa cuando es cambiando por el PCU"));
    ayuda_negocio.AddItem(new UIMenuItem("/abrirnegocio", "Abre el negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/cerrarnegocio", "Cierra el negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/estadofiesta", "Activa o desactiva si estamos haciendo una fiesta en el negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/invitarempleado", "Invitar a alguien a unirse a tu negocio como empleado"));
    ayuda_negocio.AddItem(new UIMenuItem("/expulsarempleado", "Expulsas a un empleado del negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/agregarllave", "Agregas una llave para que el negocio la venda"));
    ayuda_negocio.AddItem(new UIMenuItem("/quitarllave", "Quitas una llave que se vende en el negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/agregarveh", "Añades un vehículo al negocio que podran usar los empleados"));
    ayuda_negocio.AddItem(new UIMenuItem("/quitarveh", "Quitas un vehículo del negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/empleados", "Listado de todos los empleados de tu negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/vehiculos", "Listas los vehiculos que tiene tu negocio"));
    ayuda_negocio.AddItem(new UIMenuItem("/stock", "Comprueba el stock del negocio."));
    ayuda_negocio.AddItem(new UIMenuItem("/actualizarllave", "Actualiza precio llave del negocio."));
    ayuda_negocio.AddItem(new UIMenuItem("/porcentajeventa", "Porcentaje que se queda el empleado al realizar la venta."));
    ayuda_negocio.AddItem(new UIMenuItem("/porcentajecompra", "Porcentaje que se queda el empleado."));
    ayuda_negocio.AddItem(new UIMenuItem("/menuventa", "Menú de venta."));
    ayuda_negocio.AddItem(new UIMenuItem("/vtc", "Lista de llamadas."));
    ayuda_negocio.AddItem(new UIMenuItem("/atendervtc", "Atender el llamado."));
    ayuda_negocio.AddItem(new UIMenuItem("/rutavtc", "Ruta del llamado."));
    ayuda_negocio.AddItem(new UIMenuItem("/cancelarvtc", "Cancelar llamado."));
    ayuda_negocio.AddItem(new UIMenuItem("/donativo", "Dona dinero en una iglesia."));
    ayuda_negocio.AddItem(new UIMenuItem("/instalaralarma", "Instala una alarma en un vehiculo, propiedad o negocio."));
    ayuda_negocio.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_negocio.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_negocio?.Close(true);
        }
    });

    ayuda_negocio.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_negocio = null;
    });
}

function mostrar_ayuda_testing() {

    if (niveladmin == 0) {
        mp.gui.chat.push("!{red}No tienes permisos para ver este menu");

        mostrar_ayuda();
        return;
    }

    ayuda_Testing = crearMenu("~o~Testing", "Comandos de testing", true);
    ayuda_Testing.AddItem(new UIMenuItem("/savepos", "Guarda las coordenadas del punto en el que te encuentras situado en un log especial y te las muestra en la pantalla"));
    ayuda_Testing.AddItem(new UIMenuItem("/ropat", "Realiza pruebas con conjuntos de ropa"));
    ayuda_Testing.AddItem(new UIMenuItem("/propt", "Realiza pruebas con accesorios"));
    ayuda_Testing.AddItem(new UIMenuItem("/posgrua", "Posiciona el vehiculo encima de una grua o otro vehiculo que pueda llevarlo cargado, saca las coordenadas para luego indicarlas en el PCU"));
    ayuda_Testing.AddItem(new UIMenuItem("/posgruaquitar", "Quita el vehiculo que se encuentre pegado a otro vehiculo habiendo sido usado /posgrua"));
    ayuda_Testing.AddItem(new UIMenuItem("/posgruat", "Posiciona el vehiculo encima de un trailer o remolque enganchado por un vehiculo que pueda llevarlo cargado, saca las coordenadas para luego indicarlas en el PCU"));
    ayuda_Testing.AddItem(new UIMenuItem("/posgruaquitart", "Quita el vehiculo que se encuentre pegado a un trailer habiendo sido usado /posgrua"));
    ayuda_Testing.AddItem(new UIMenuItem("/maqt", "Realiza pruebas con el maquillaje"));
    ayuda_Testing.AddItem(new UIMenuItem("/asi", "Lista todos los mods Asi cargados en tu gtmp"));
    ayuda_Testing.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_Testing.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_Testing?.Close(true);
        }
    });

    ayuda_Testing.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_Testing = null;
    });
}

function mostrar_ayuda_staff() {

    if (niveladmin == 0) {
        mp.gui.chat.push("!{red}No tienes permisos para ver este menu");

        mostrar_ayuda();
        return;
    }

    ayuda_Staff = crearMenu("~y~Staff", "Comandos de staff", true);
    ayuda_Staff.AddItem(new UIMenuItem("/e", "Canal del equipo administrativo en general (OOC)"));
    ayuda_Staff.AddItem(new UIMenuItem("/dudas", "Lista todas las dudas"));
    ayuda_Staff.AddItem(new UIMenuItem("/atenderd", "Atiende una duda"));
    ayuda_Staff.AddItem(new UIMenuItem("/daradvertencia", "Añade una advertencia al usuario"));
    ayuda_Staff.AddItem(new UIMenuItem("/advertencias", "Inciando la ID o nombre de un personaje puedes ver todas sus advertencias"));
    ayuda_Staff.AddItem(new UIMenuItem("/hadmin", "Activa o desactiva el modo oculto administrativo y sus canales"));
    ayuda_Staff.AddItem(new UIMenuItem("/hdudas", "Activa o desactiva el canal de dudas"));
    //ayuda_Staff.AddItem(new UIMenuItem("/(a)brir(c)anal(p)rivado", "Abre un canal de charla privado con un jugador, si no indicas jugador se cierra")); // No existe al parecer ni /cp
    ayuda_Staff.AddItem(new UIMenuItem("/quienes", "Saber la ID de un jugador a partir de su número de extraño"));
    ayuda_Staff.AddItem(new UIMenuItem("/extraños", "Muestra una lista de los jugadores tapados y su ID"));
    ayuda_Staff.AddItem(new UIMenuItem("/estadometro", "Abre o cierra la estacion de metro en la que te encuentras, tienes que estar encima del mensaje de estado."));
    ayuda_Staff.AddItem(new UIMenuItem("/cerrarmetro", "Puedes cerrar el metro completamente o por cada sentido"));
    ayuda_Staff.AddItem(new UIMenuItem("/abrirmetro", "Puedes abrir el metro completamente o por cada sentido"));
    ayuda_Staff.AddItem(new UIMenuItem("/resitecar", "Resitua los vehiculos que se encuentran cerca de ti, no es necesario especificar llave"));
    ayuda_Staff.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_Staff.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_Staff?.Close(true);
        }
    });

    ayuda_Staff.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_Staff = null;
    });
}

function mostrar_ayuda_admin() {

    if (niveladmin < 4) {
        mp.gui.chat.push("!{red}No tienes permisos para ver este menu");

        mostrar_ayuda();
        return;
    }

    ayuda_Admin = crearMenu("~r~Admin", "Comandos de admin", true);
    ayuda_Admin.AddItem(new UIMenuItem("/am", "Mostrar un mensaje global en el servidor (Anuncio Administrativo)"));
    ayuda_Admin.AddItem(new UIMenuItem("/a", "Canal del equipo de Game Operators (OOC)"));
    ayuda_Admin.AddItem(new UIMenuItem("/e", "Canal del equipo administrativo en general (OOC)"));
    ayuda_Admin.AddItem(new UIMenuItem("/ajail", "Sancionar administrativamente a un jugador con jail OOC"));
    ayuda_Admin.AddItem(new UIMenuItem("/desajail", "Liberar a un jugador de su jail administrativo"));
    ayuda_Admin.AddItem(new UIMenuItem("/reportes", "Muestra unna lista de los reportes pendientes de atender"));
    ayuda_Admin.AddItem(new UIMenuItem("/dudas", "Muestra una lista de las dudas pendientes de atender"));
    ayuda_Admin.AddItem(new UIMenuItem("/atender", "Atiende un reporte, puedes dejar un mensaje"));
    ayuda_Admin.AddItem(new UIMenuItem("/atenderd", "Atiende una duda"));
    ayuda_Admin.AddItem(new UIMenuItem("/borrarreportes", "Borra la lista de reportes pendientes"));
    ayuda_Admin.AddItem(new UIMenuItem("/borrardudas", "Borra la lista de dudas pendientes"));
    ayuda_Admin.AddItem(new UIMenuItem("/dpr", "Añadir punto de rol positivo al jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/qpr", "Añadir punto de rol negativo al jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/daradvertencia", "Añade una advertencia al usuario")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/expulsar", "Expulsa (kickea) a un jugador del servidor"));
    ayuda_Admin.AddItem(new UIMenuItem("/bloquearusuario", "Bloquea a un jugador del servidor, incluyendo todos los personajes"));
    ayuda_Admin.AddItem(new UIMenuItem("/bloquearpersonaje", "Bloquea a un personaje del servidor"));
    ayuda_Admin.AddItem(new UIMenuItem("/bloquearck", "Bloquea al personaje por Character Kill"));
    ayuda_Admin.AddItem(new UIMenuItem("/recon", "Observar (reconear) a un jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/adminservicio", "Activa o desactiva el modo administrador"));
    ayuda_Admin.AddItem(new UIMenuItem("/ir", "Abre una lista de lugares para teleportarse")); // No olvidar borrar el menu admin al hacer clic en esta opción si es que queremos que se abra
    ayuda_Admin.AddItem(new UIMenuItem("/ira", "Teleportarse hacia la posición de un jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/traer", "Trae un jugador hasta nuestra posición"));
    ayuda_Admin.AddItem(new UIMenuItem("/tpp", "Teleportar al primer jugador a la posición del segundo"));
    ayuda_Admin.AddItem(new UIMenuItem("/tpv", "Teleportar a un jugador al vehículo indicado"));
    ayuda_Admin.AddItem(new UIMenuItem("/tvp", "Teleportar a un vehículo al jugador indicado"));
    ayuda_Admin.AddItem(new UIMenuItem("/tpneg", "Teleportarse hacia la entrada de un negocio"));
    ayuda_Admin.AddItem(new UIMenuItem("/tpprop", "Teleportarse hacia la entrada de una propiedad"));
    ayuda_Admin.AddItem(new UIMenuItem("/iracoche", "Teleportarse hacia un vehículo"));
    ayuda_Admin.AddItem(new UIMenuItem("/traercoche", "Traer un vehículo hasta nuestra posición"));
    ayuda_Admin.AddItem(new UIMenuItem("/activarveh", "Activar un vehículo inactivo, usar cuando esté invisible"));
    ayuda_Admin.AddItem(new UIMenuItem("/infocoche", "Muestra información sobre el vehículo, incluyendo la llave"));
    ayuda_Admin.AddItem(new UIMenuItem("/sethp", "Establecer la salud de un jugador, con -1 lo matamos"));
    ayuda_Admin.AddItem(new UIMenuItem("/setpj", "Modificar los atributos de un personaje"));
    ayuda_Admin.AddItem(new UIMenuItem("/setcar", "Modificar los atributos de un vehículo"));
    ayuda_Admin.AddItem(new UIMenuItem("/setdimension", "Establecer la dimensión de un jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/nomuerte", "Quitar el estado de muerte o revivir a un jugador"));
    ayuda_Admin.AddItem(new UIMenuItem("/nobug", "Recolocar al jugador en posición por defecto"));
    ayuda_Admin.AddItem(new UIMenuItem("/rsc", "Restablecer la posición de los vehículos de la facción indicada"));
    ayuda_Admin.AddItem(new UIMenuItem("/rsct", "Restablecer la posición de los vehículos del trabajo indicado"));
    ayuda_Admin.AddItem(new UIMenuItem("/rscv", "Restablecer la posición de un vehículo indicado"));
    ayuda_Admin.AddItem(new UIMenuItem("/cochesf", "Lista los coches asignados a una facción"));
    ayuda_Admin.AddItem(new UIMenuItem("/cochest", "Lista los coches asignados a un trabajo"));
    ayuda_Admin.AddItem(new UIMenuItem("/marca", "Establece un punto de interés para teleportarnos luego"));
    ayuda_Admin.AddItem(new UIMenuItem("/irmarca", "Teleportarse de vuelta al punto de interés"));
    ayuda_Admin.AddItem(new UIMenuItem("/limpiarchat", "Limpia el chat global, usar únicamente con fallos graves"));
    ayuda_Admin.AddItem(new UIMenuItem("/hadmin", "Activa o desactiva el modo oculto administrativo y sus canales"));
    ayuda_Admin.AddItem(new UIMenuItem("/hreportes", "Activa o desactiva el canal de reportes"));
    ayuda_Admin.AddItem(new UIMenuItem("/hdudas", "Activa o desactiva el canal de dudas"));
    //ayuda_Admin.AddItem(new UIMenuItem("/(a)brir(c)anal(p)rivado", "Abre un canal de charla privado con un jugador")); // No existe, como /cp
    ayuda_Admin.AddItem(new UIMenuItem("/mps", "Ver todos los mensajes privados de los jugadores"));
    ayuda_Admin.AddItem(new UIMenuItem("/darobjeto", "Crea un objeto con su ID en PCU y te lo entrega"));
    ayuda_Admin.AddItem(new UIMenuItem("/crearnegocio", "Permite crear negocios directamente desde el juego"));
    ayuda_Admin.AddItem(new UIMenuItem("/setneg", "Cambiar los atributos de un negocio y su configuración"));
    ayuda_Admin.AddItem(new UIMenuItem("/borrarnegocio", "Borrar un negocio que no se utilice"));
    ayuda_Admin.AddItem(new UIMenuItem("/rot", "Borrar objetos temporales del suelo antes de que pase el tiempo"));
    ayuda_Admin.AddItem(new UIMenuItem("/rotcerca", "Borra todos los objetos del suelo cerca de tí"));
    ayuda_Admin.AddItem(new UIMenuItem("/crearpropiedad", "Crear propiedades, almacen o vivienda"));
    ayuda_Admin.AddItem(new UIMenuItem("/setprop", "Configura los atributos de los almacenes o viviendas"));
    ayuda_Admin.AddItem(new UIMenuItem("/borrarpropiedad", "Borra una vivienda o almacén"));
    ayuda_Admin.AddItem(new UIMenuItem("/mapeos", "Mostrar una lista de los mapeos cargados del servidor"));
    ayuda_Admin.AddItem(new UIMenuItem("/cargarmapeo", "Cargar un mapeo de la lista /mapeos"));
    ayuda_Admin.AddItem(new UIMenuItem("/descargarmapeos", "Descarga un mapeo de la lista /mapeos"));
    ayuda_Admin.AddItem(new UIMenuItem("/reiniciar", "Programar un reinicio del servidor"));
    ayuda_Admin.AddItem(new UIMenuItem("/identidad", "Cambia el nombre visible de tu personaje (NPCs)"));
    ayuda_Admin.AddItem(new UIMenuItem("/quienes", "Saber la ID de un jugador a partir de su número de extraño")); // DESUSO, para eso está el /extraños que te muestra todos de un tirón
    ayuda_Admin.AddItem(new UIMenuItem("/extraños", "Muestra una lista de los jugadores tapados y su ID"));
    ayuda_Admin.AddItem(new UIMenuItem("/interiorenpos", "Muestra el ID del interior que esté en tu posición actual"));
    ayuda_Admin.AddItem(new UIMenuItem("/crearinterior", "")); //DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/setinterior", "")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/borrarinterior", "")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/setpropinterior", "")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/borrarpropinterior", "")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/propsinteriores", "")); // DESUSO
    ayuda_Admin.AddItem(new UIMenuItem("/setanim", "Crear una nueva animación o reemplazar otra existente"));
    ayuda_Admin.AddItem(new UIMenuItem("/setanimopc", "Modificar las opciones de una animación"));
    ayuda_Admin.AddItem(new UIMenuItem("/setanimnombre", "Modificar el nombre de una animación"));
    ayuda_Admin.AddItem(new UIMenuItem("/setanimdesc", "Modificar la descripción de una animación"));
    ayuda_Admin.AddItem(new UIMenuItem("/setanimcat", "Modificar la categoría de una animación"));
    ayuda_Admin.AddItem(new UIMenuItem("/dardinero", "Da dinero en la mano"));
    ayuda_Admin.AddItem(new UIMenuItem("/quitardinero", "Quita dinero de la mano"));
    ayuda_Admin.AddItem(new UIMenuItem("/transferirdinero", "Transfiere dinero a la cuenta de una faccion"));
    ayuda_Admin.AddItem(new UIMenuItem("/retirardinero", "Retiras dinero de la cuenta de una faccion"));
    ayuda_Admin.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ayuda_Admin.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            ayuda_Admin?.Close(true);
        }
    });

    ayuda_Admin.MenuClose.on(item => {
        mostrar_ayuda();
        ayuda_Admin = null;
    });
}

}