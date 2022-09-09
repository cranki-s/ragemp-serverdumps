{
/*
    raycast.js
    Autor: poleStar

    Descripción: Contiene los menús relativos a las acciones del raycast
*/
let menu_jugador = null;
let menu_vehiculo = null;
let menu_trabajo = null;

// Variables menu jugador
let id_jug = null;
let limite = false;

// Eventos menús
mp.events.add("mostrar_menu_jugador_raycast", function (id, nivel, conocido) {
    mostrar_menu_jugador_raycast(id, nivel, conocido);
});

mp.events.add("mostrar_menu_coche_raycast", function (llave, nombre, matricula) {
    mostrar_menu_coche_raycast(llave, nombre, matricula);
});

mp.events.add("mostrar_menu_job_raycast", function (nombre_job) {
    mostrar_menu_job_raycast(nombre_job);
});

// Eventos funcionamiento interno
mp.events.add("menu_jugador_raycast_cantidad_pagar", function (cantidad) {
    if (!limite && cantidad != null && cantidad > 0) {
        limite = true;
        mp.events.callRemote("MENUOPCIONES_pagar", id_jug, cantidad);
    }
});

// Función para mostrar el menú de jugador
function mostrar_menu_jugador_raycast(id, nivel, conocido) {
    id_jug = id;

    menu_jugador = crearMenu("Jugador ID: ~o~" + id_jug, "ID: ~o~" + id_jug + " ~w~Nivel: ~o~" + nivel);
    let opcion_0 = null;
    if (conocido == false) {
        opcion_0 = new UIMenuItem("Conocer", "Manda un trato para conocer al jugador");
    }
    else {
        opcion_0 = aplicarColores(new UIMenuItem("Conocer", "Manda un trato para conocer al jugador"), "Gris");
        opcion_0.SetRightBadge(BadgeStyle.Lock);
    }
    let opcion_1 = new UIMenuItem("Revisar heridas", "Revisa las heridas del jugador");
    let opcion_2 = null;
    let objeto_mano = obtenerObjetoMano();
    if (objeto_mano == null) {
        opcion_2 = aplicarColores(new UIMenuItem("Ceder objeto en mano", "Cede el objeto en mano al jugador"), "Gris");
        opcion_2.SetRightBadge(BadgeStyle.Lock);
    }
    else {
        opcion_2 = new UIMenuItem("Ceder objeto en mano", "Cede el objeto en mano al jugador");
    }
    let opcion_3 = new UIMenuItem("Pagar", "Paga una cantidad al jugador");
    let opcion_4 = new UIMenuItem("Arrastrar", "Manda un trato para arrastrar a la otra persona");
    
    menu_jugador.AddItem(opcion_0);
    menu_jugador.AddItem(opcion_1);
    menu_jugador.AddItem(opcion_2);
    menu_jugador.AddItem(opcion_3);
    menu_jugador.AddItem(opcion_4);
    if (objeto_mano != null && (objeto_mano.tipoObjeto == 126 || objeto_mano.tipoObjeto == 461)) {
        let opcion_5 = new UIMenuItem("Curar", "Manda un trato para curar a la otra persona");
        menu_jugador.AddItem(opcion_5);
    }
    menu_jugador.AddItem(new UIMenuItem("Cerrar menú", "Cierra el menú"));

    menu_jugador.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar menú") {
            menu_jugador?.Close();
        } else {
            switch (index) {
                case 0:
                    if (conocido == false) {
                        mp.events.callRemote("nuevo:conocido", id);
                    }
                    else {
                        mostrarAviso("danger", 5000, "Ya conoces al otro jugador");
                    }
                    menu_jugador?.Close();
                    break;
                case 1:
                    let id_string = id_jug.toString();
                    mp.events.callRemote("raycast_heridas", id_string);
                    menu_jugador?.Close();
                    break;
                case 2:
                    if (objeto_mano != null) {
                        mp.events.callRemote("MENUOPCIONES_ceder", id_jug);
                        menu_jugador?.Close();
                    }
                    break;
                case 3:
                    limite = false;
                    mp.events.call("cantidad:mostrar", "menu_jugador_raycast_cantidad_pagar", "Cantidad");
                    menu_jugador?.Close();
                    break;
                case 4:
                    mp.events.callRemote("arrastrar_raycast", id_jug);
                    menu_jugador?.Close();
                    break;
                case 5:
                    mp.events.callRemote("curar_raycast", id_jug);
                    menu_jugador?.Close();
                    break;
                default:
                    menu_jugador?.Close();
                    break;
            }
        }
    });

    menu_jugador.MenuClose.on(() => {
        menu_jugador = null;
    });
}

// Función para mostrar el menú de vehículo
function mostrar_menu_coche_raycast(llave, nombre, matricula) {

    menu_vehiculo = crearMenu("Vehículo: ~o~" + llave.toString(), "~w~Información del vehículo: ~o~" + llave.toString());
    menu_vehiculo.AddItem(new UIMenuItem("Modelo", "Modelo: ~o~" + nombre));
    menu_vehiculo.AddItem(new UIMenuItem("Matrícula", "Matrícula: ~o~" + matricula));
    menu_vehiculo.AddItem(new UIMenuItem("Cerrar menú", "Cierra el menú"));

    menu_vehiculo.ItemSelect.on((item, index) => {
        menu_vehiculo?.Close();
    });

    menu_vehiculo.MenuClose.on(() => {
        menu_vehiculo = null;
    });
}

// Función para mostrar el menú de jobs
function mostrar_menu_job_raycast(nombre_job) {

    menu_trabajo = crearMenuConDistancia(4, "Trabajo " + nombre_job, "Opciones del trabajo");
    menu_trabajo.AddItem(new UIMenuItem("Obtener trabajo", "Obtén el trabajo para poder comenzar a trabajar"));
    menu_trabajo.AddItem(new UIMenuItem("Dejar trabajo", "Deja tu puesto de trabajo"));
    menu_trabajo.AddItem(new UIMenuItem("Cerrar menú", "Cierra el menú"));


    menu_trabajo.ItemSelect.on((item, index) => {
        var nombre_trabajo = nombre_job.toLowerCase();
        if (index == 0) {
            mp.events.callRemote("menu_raycast_trabajo", true, nombre_trabajo);
        }
        else if (index == 1) {
            mp.events.callRemote("menu_raycast_trabajo", false, nombre_trabajo);
        }
        menu_trabajo?.Close();
    });

    menu_trabajo.MenuClose.on(() => {
        menu_con_distancia = null;
        menu_trabajo = null;
    });
}
}