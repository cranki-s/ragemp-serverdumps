{
/* --------------------------------------------------------------------------------
 * jugador.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menú del jugador con todas sus opciones.
 *
 * -------------------------------------------------------------------------------- */

let usuariosCercanos = [];
let cantidad = -1;

let menuJUG = null;
let menuJUG_ACCIONES_Y_DOCUMENTACION = null;
let menuJUG_OBJETOS = null;
let menuJUG_TELEFONO = null;
let menuJUG_INFORMACION = null;
let menuJUG_PROPIEDAD = null;
let menuJUG_NEGOCIO = null;
let menuJUG_ROPA = null;
let MenuJugadoresCercanos = null;
let MenuPlanesTelefonia = null;
let MenuCajaNegocio = null;

// Evento menu
mp.events.add("jugador:mostrar_menu", function () {
    jugador_mostrar_menu();
});

// Eventos auxiliares
mp.events.add("evento_menunegocio_agregarllave_cantidad", function (args) {
    cantidad = args;
    mp.events.call("cantidad:mostrar", "evento_menunegocio_agregarllave_cantidad_precio", "Precio");
});

mp.events.add("evento_menunegocio_quitarllave_cantidad", function (args) {
    let llave = args;
    mp.events.callRemote("MENUNEGOCIO_quitarllave", llave);
});

mp.events.add("evento_menunegocio_agregarveh_cantidad", function (args) {
    let llave = args;
    mp.events.callRemote("MENUNEGOCIO_agregarveh", llave);
});

mp.events.add("evento_menunegocio_quitarveh_cantidad", function (args) {
    let llave = args;
    mp.events.callRemote("MENUNEGOCIO_quitarveh", llave);
});

mp.events.add("evento_menunegocio_agregarllave_cantidad_precio", function (args) {
    let precio = args;
    mp.events.callRemote("MENUNEGOCIO_agregarllave", cantidad, precio);
    cantidad = -1;
});

mp.events.add("evento_menujugador_metercaja_cantidad", function (args) {
    let cantidad = args;
    mp.events.callRemote("MENUNEGOCIO_caja", 1, cantidad);
});

mp.events.add("evento_menujugador_sacacaja_cantidad", function (args) {
    let cantidad = args;
    mp.events.callRemote("MENUNEGOCIO_caja", 2, cantidad);
});

// Funcion para mostrar el menu de jugador
function jugador_mostrar_menu() {

    menuJUG = crearMenu("Opciones", "Menú de opciones");
    menuJUG.AddItem(new UIMenuItem("Acciones", "Acciones que puedes realizar con tú personaje."));
    menuJUG.AddItem(new UIMenuItem("Objetos", "Acciones con objetos."));
    menuJUG.AddItem(new UIMenuItem("Teléfono", "Información sobre tú teléfono móvil."));
    menuJUG.AddItem(new UIMenuItem("Información", "Información sobre estadísticas de tu cuenta y personaje."));
    menuJUG.AddItem(new UIMenuItem("Propiedad", "Información sobre propiedad y vehículos."));
    menuJUG.AddItem(new UIMenuItem("Negocio", "Acciones sobre tú negocio."));
    menuJUG.AddItem(new UIMenuItem("Ropa", "Acciones sobre las prendas de tú personaje."));
    menuJUG.AddItem(new UIMenuItem("Corregir Voz", "¿No te escuchan los demas? Corrige los errores con la voz."));
    menuJUG.AddItem(new UIMenuItem("Corregir Dimensión", "¿No ves a nadie? Corrige los errores con tu dimensión."));
    menuJUG.AddItem(new UIMenuItem("Cerrar", "Cierras el menu actual."));

    menuJUG.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                menuJUG?.Close(true);
                jugador_menu_acciones_y_documentacion();
                break;
            case 1:
                menuJUG?.Close(true);
                jugador_menu_objetos();
                break;
            case 2:
                menuJUG?.Close(true);
                jugador_menu_telefono();
                break;
            case 3:
                menuJUG?.Close(true);
                jugador_menu_informacion();
                break;
            case 4:
                menuJUG?.Close(true);
                jugador_menu_propiedad_y_vehiculo();
                break;
            case 5:
                menuJUG?.Close(true);
                jugador_menu_negocios();
                break;
            case 6:
                menuJUG?.Close(true);
                jugador_menu_ropa();
                break;
            case 7:
                menuJUG?.Close();
                mp.events.callRemote("menu_restear_voz");
                break;
            case 8:
                menuJUG?.Close();
                mp.events.callRemote("menu_autofix");
                break;
            default:
                menuJUG?.Close();
                break;
        }
    });

    menuJUG.MenuClose.on(item => {
        menuJUG = null; 
    });
}

// Funcion para mostrar el menu de acciones
function jugador_menu_acciones_y_documentacion() {

    menuJUG_ACCIONES_Y_DOCUMENTACION = crearMenu("Acciones", "Acciones de nuestro personaje.");
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Tirar", "Tiras el objeto que tienes en la mano al suelo."));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Usar", "Usas el objeto que tienes en la mano. (Solo objetos consumibles)"));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Guardar", "Guardas en el inventario el objeto que tienes en la mano."));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Recoger", "Recoges el objeto más cercano que esté en el suelo."));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Ceder", "Cedes el objeto que tienes en la mano a otro jugador."));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Pagar", "Pagas dinero a otro jugador."));
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Dado", "Lanzas un dado y te saldrá un número aleatario."));
    //menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Identificaciones", "Muestras tus identificaciones a otro jugador.")); // No implementado
    menuJUG_ACCIONES_Y_DOCUMENTACION.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_ACCIONES_Y_DOCUMENTACION.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: case 1: case 2: case 3: case 5: case 6:
                mp.events.callRemote("MENUOPCIONES_ACCIONES", (index + 1));
                menuJUG_ACCIONES_Y_DOCUMENTACION?.Close();
                break;
            case 4:
                menuJUG_ACCIONES_Y_DOCUMENTACION?.Close(true);
                crearMenuCercanos("ceder");
                break;
            /*case 7:
                jugador_mostrar_menu();
                break;*/
            default:
                menuJUG_ACCIONES_Y_DOCUMENTACION?.Close(true);
                jugador_mostrar_menu();
                break;
        }
    });

    menuJUG_ACCIONES_Y_DOCUMENTACION.MenuClose.on(item => {
        menuJUG_ACCIONES_Y_DOCUMENTACION = null;
    });
}

// Funcion para mostrar el menu de acciones con un objeto
function jugador_menu_objetos() {

    menuJUG_OBJETOS = crearMenu("Objetos", "Opciones con los objetos.");
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Empaquetar", "Empaquetas una unidad. (No debe tener uso la unidad)"));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Empaquetar arma", "Empaquetas un arma. (Debes tener las municiones completas)"));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Sacar unidad", "Sacas una unidad de un paquete."));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Meter unidad", "Metes una unidad en un paquete."));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Meter arma", "Metes un arma en un paquete."));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Dividir paquete", "Divides un paquete."));
    menuJUG_OBJETOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_OBJETOS.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            mp.events.callRemote("MENUOPCIONES_OBJETOS", (index + 1));
        }else{
            menuJUG_OBJETOS?.Close(true);
            jugador_mostrar_menu();
        }
    });

    menuJUG_OBJETOS.MenuClose.on(item => {
        menuJUG_OBJETOS = null;
    });
}

// Funcion para mostrar el menu de opciones de telefono
function jugador_menu_telefono() {
    
    menuJUG_TELEFONO = crearMenu("Teléfono", "Opciones con el teléfono.");
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Altavoz", "Pones el altavoz. (Solo texto)"));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Contratar plan", "Contratas un plan para tu teléfono móvil."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Dar de baja un plan", "Retiras el plan actual que tengas contratado."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Mi plan", "Obtendrás la información del plan actual que posees."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Modo vibración", "Pondrás el teléfono en modo vibración."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Modo silencio", "Colocas el modo silencio a tú teléfono."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Apagar teléfono", "Apagas el teléfono móvil."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Encender teléfono", "Enciendes el teléfono móvil."));
    menuJUG_TELEFONO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_TELEFONO.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            if (index == 1) {
                menuJUG_TELEFONO?.Close(true);
                mostrarPlanesTelefono();
            }
            else {
                menuJUG_TELEFONO?.Close();
                mp.events.callRemote("MENUOPCIONES_TELEFONO", (index + 1));
            }
        }
        else {
            menuJUG_TELEFONO?.Close(true);
            jugador_mostrar_menu();
        }
    });

    menuJUG_TELEFONO.MenuClose.on(item => {
        menuJUG_TELEFONO = null;
    });
}

// Funcion para mostrar el menu de informacion
function jugador_menu_informacion() {

    menuJUG_INFORMACION = crearMenu("Información", "Información sobre nuestro personaje.");
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Stats", "Miras la información de tu cuenta, estadísticas, etc."));
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Mis propiedades", "Miras las llaves de propiedades propias y prestadas."));
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Mis negocios", "Miras las llaves de tus negocios y de los que perteneces como empleado."));
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Mis vehículos", "Miras las llaves de tus vehículos propios y prestados."));
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Información", "Obtendrás información de cualquier propiedad o vehículo. (/info)"));
    menuJUG_INFORMACION.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_INFORMACION.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            menuJUG_INFORMACION?.Close();
            mp.events.callRemote("MENUOPCIONES_INFORMACION", (index + 1));
        } else {
            menuJUG_INFORMACION?.Close(true);
            jugador_mostrar_menu();
        }

        
    });

    menuJUG_INFORMACION.MenuClose.on(item => {
        menuJUG_INFORMACION = null;
    });
}

// Funcion para mostrar el menu de opciones una propiedad y vehiculo
function jugador_menu_propiedad_y_vehiculo() {

    menuJUG_PROPIEDAD = crearMenu("Propiedad y vehiculo", "Opciones con las propiedades y vehiculos.");
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Vender propiedad a jugador", "Vendes tu propiedad a otro jugador.")); // Sin implementar
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Dar llave propiedad", "Cedes una copia de la llave de tu propiedad a otro jugador."));// Sin implementar
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Tirar llave propiedad", "Tiras las llaves prestadas que selecciones.")); // Sin implementar
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Garaje", "Vas al garaje de tu propiedad."));
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Situar inventario", "Sitúas el inventario de tu propiedad."));
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Vender vehiculo a jugador", "Vendes tu vehiculo a otro jugador.")); // Sin implementar
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Dar llave vehiculo", "Cedes una copia de la llave de tu vehiculo a otro jugador.")); // Sin implementar
    menuJUG_PROPIEDAD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_PROPIEDAD.ItemSelect.on((item, index) => {
        if (index < 5) {
            menuJUG_PROPIEDAD?.Close();
            mp.events.callRemote("MENUOPCIONES_PROPIEDAD", (index + 1));
        }else{
            menuJUG_PROPIEDAD?.Close(true);
            jugador_mostrar_menu();
        }

        
    });

    menuJUG_PROPIEDAD.MenuClose.on(item => {
        menuJUG_PROPIEDAD = null;
    });
}

// Funcion para mostrar las opciones de un negocio
function jugador_menu_negocios() {

    menuJUG_NEGOCIO = crearMenu("Negocio", "Opciones con las propiedades.");
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Comprar negocio", "Compras un negocio al estado."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Vender negocio", "Vendes tu negocio al estado."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Vender negocio a jugador", "Vendes tu negocio a otro jugador."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Caja negocio", "Revisas el dinero que hay en la caja de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Vaciar caja", "Sacas todo el dinero de la caja de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Actualizar nombre negocio", "Podrás actualizar el nuevo nombre a tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Abrir negocio", "Abres las puertas de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Cerrar negocio", "Cierras las puertas de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Estado fiesta", "Activas el estado fiesta en tú negocio. (Icono rosa en el GPS)"));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Invitar empleado", "Invitas a un jugador como empleado de tú negocio"));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Expulsar empleado", "Expulsas a un jugador como empleado de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Agregar llave", "Esta función es para compra/ventas e inmobiliarias."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Quitar llave", "Quitas las llaves del stock."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Agregar vehículo", "Agregas un vehículo a tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Quitar vehículo", "Quitas un vehículo del negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Empleados", "Te permite ver qué empleados están conectados."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Vehículos", "Te permite activar, desactivar y localizar vehículos de tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Stock", "Te permite mirar, modificar precios o pedir stock para tú negocio."));
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Seguridad", "Te pone de servicio como empleado de seguridad.")); //
    menuJUG_NEGOCIO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuJUG_NEGOCIO.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            switch (index) {
                case 3:
                    menuJUG_NEGOCIO?.Close(true);
                    mostrarCajaNegocio();
                    break;
                case 4:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.callRemote("MENUNEGOCIO_caja", 3, 0);
                    break;
                case 11:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.call("cantidad:mostrar", "evento_menunegocio_agregarllave_cantidad", "Llave");
                    break;
                case 12:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.call("cantidad:mostrar", "evento_menunegocio_quitarllave_cantidad", "Llave");
                    break;
                case 13:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.call("cantidad:mostrar", "evento_menunegocio_agregarveh_cantidad", "Llave");
                    break;
                case 14:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.call("cantidad:mostrar", "evento_menunegocio_quitarveh_cantidad", "Llave");
                    break;
                case 18:
                    menuJUG_NEGOCIO?.Close(true);
                    jugador_mostrar_menu();
                    break;
                default:
                    menuJUG_NEGOCIO?.Close();
                    mp.events.callRemote("MENUOPCIONES_NEGOCIO", (index + 1));
                    break;
            }
        }
        else {
            menuJUG_NEGOCIO?.Close(true);
            jugador_mostrar_menu();
        }
    });

    menuJUG_NEGOCIO.MenuClose.on(item => {
        menuJUG_NEGOCIO = null;
    });
}

// Funcion para mostrar el menu de opciones de ropa
function jugador_menu_ropa() {
    menuJUG_ROPA = crearMenu("Ropa", "Gestión de las prendas de tu personaje.");
    menuJUG_ROPA.AddItem(new UIMenuItem("Vestirse", "Te colocas todas las prendas"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Desnudarse", "Te quitas todas las prendas"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Quitar camiseta", "Te quitas la camiseta solamente"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Quitar zapatos", "Te quitas los zapatos solamente"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Quitar pantalones", "Te quitas los pantalones solamente"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Ropa de buceo", "Te colocas un traje de buceo"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Quitar miscelaneo", "Te quitas una prenda de tipo misceláneo"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Quitar accesorio", "Te quitas una prenda de tipo accesorio"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Alternar capucha", "Te subes o bajas la capucha"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Alternar guantes", "Te pones o te quitas los guantes"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Alternar visera", "Sube o baja la visera del casco"));
    menuJUG_ROPA.AddItem(new UIMenuItem("Volver", "Vuelves al menú anterior"));
    menuJUG_ROPA.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            menuJUG_ROPA?.Close();
            mp.events.callRemote("MENUOPCIONES_ROPA", (index + 1));
        }else{
            menuJUG_ROPA?.Close(true);
            jugador_mostrar_menu();
        }

        
    });

    menuJUG_ROPA.MenuClose.on(item => {
        menuJUG_ROPA = null;
    });
}

// Crea el menú de usuarios cercano
function crearMenuCercanos(opcionAnterior) {
    let menuAnterior = opcionAnterior;

    MenuJugadoresCercanos = crearMenu("Jugadores", "Menú de jugadores cercanos");

    usuariosCercanos = [];
    mp.players.forEachInStreamRange(function (player) {
        if (player != player_local) {
            if (calcDist(player_local.position, player.position) < 5.0) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador && jugador.oculto == false) {
                    let id = jugador.id_jugador;

                    let encontrado = false;
                    for (let i = 0, n = usuariosCercanos.length; i < n; i++) {
                        if (usuariosCercanos[i] == id) {
                            encontrado = true;
                        }
                    }

                    if (!encontrado) {
                        usuariosCercanos.push(id);
                        MenuJugadoresCercanos.AddItem(new UIMenuItem(obtenerNombreConocido(player), ""));
                    }
                }
            }
        }
    });

    MenuJugadoresCercanos.ItemSelect.on((item, index) => {
        switch (menuAnterior) {
            case "ceder":
                let idJugador = usuariosCercanos[index];
                mp.events.callRemote("MENUOPCIONES_ceder", idJugador);
                break;
            default:
                break;
        }

        MenuJugadoresCercanos?.Close();
    });

    MenuJugadoresCercanos.MenuClose.on(item => {
        usuariosCercanos = [];
        MenuJugadoresCercanos = null;
    });
}

function mostrarPlanesTelefono() {

    MenuPlanesTelefonia = crearMenu("Contratar plan", "Planes de telefonía mensuales");
    let plan1 = new UIMenuItem("Mensajes Gratis", "Dispón de mensajes gratuitos.");
    plan1.SetRightLabel("~g~100$/~w~mes");
    let plan2 = new UIMenuItem("Llamadas Gratis", "Dispón de llamadas gratuitas.");
    plan2.SetRightLabel("~g~115$/~w~mes");
    let plan3 = new UIMenuItem("Todo Gratis", "Dispón de mensajes y llamadas gratuitas.");
    plan3.SetRightLabel("~g~200$/~w~mes");

    MenuPlanesTelefonia.AddItem(plan1);
    MenuPlanesTelefonia.AddItem(plan2);
    MenuPlanesTelefonia.AddItem(plan3);
    MenuPlanesTelefonia.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    MenuPlanesTelefonia.ItemSelect.on((item, index) => {
        if (index < 3) {
            MenuPlanesTelefonia?.Close();
            mp.events.callRemote("MENUTELEFONO_plan", (index + 1));
        }else{
            MenuPlanesTelefonia?.Close(true);
            jugador_menu_telefono();
        }
    });

    MenuPlanesTelefonia.MenuClose.on(item => {
        MenuPlanesTelefonia = null;
    });
}

function mostrarCajaNegocio() {

    MenuCajaNegocio = crearMenu("Caja", "Caja del negocio");

    MenuCajaNegocio.AddItem(new UIMenuItem("Ver dinero", "Muestra la cantidad de dinero de la caja del negocio"));
    MenuCajaNegocio.AddItem(new UIMenuItem("Meter dinero", "Ingresa dinero en la caja del negocio"));
    MenuCajaNegocio.AddItem(new UIMenuItem("Sacar dinero", "Retira dinero de la caja del negocio"));
    MenuCajaNegocio.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    MenuCajaNegocio.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("MENUNEGOCIO_caja", 0, 0);
                break;
            case 1:
                mp.events.call("cantidad:mostrar", "evento_menujugador_metercaja_cantidad");
                break;
            case 2:
                mp.events.call("cantidad:mostrar", "evento_menujugador_sacacaja_cantidad");
                break;
            default:
                break;
        }

        MenuCajaNegocio?.Close();
    });

    MenuCajaNegocio.MenuClose.on(item => {
        MenuCajaNegocio = null;
    });
}

}