{
﻿/*
 * Descripcion: Contiene el menú de trabajo de camionero
*/

let recogida = "";
let destino = "";
let mercancia = "";
let cantidadMercancia = 0;
let distancia = 0;
let ganancias = 0;
let camion = 0;
let trailer = 0;

let menuCamionero = null;

// Evento menu
mp.events.add("mostrar_camionero", function (str_recogida, str_destino, str_mercancia, int_cantidadMercancia, float_distancia, int_ganancias, llave_camion, llave_trailer) {
    recogida = str_recogida;
    destino = str_destino;
    mercancia = str_mercancia;
    cantidadMercancia = int_cantidadMercancia;
    distancia = float_distancia;
    ganancias = int_ganancias;
    camion = llave_camion;
    trailer = llave_trailer;

    mostrar_camionero();
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_camionero() {

    menuCamionero = crearMenu("Camionero", "Trabajo camionero opciones disponibles");
    menuCamionero.AddItem(new UIMenuItem("Traer trailer", "Si por algún motivo tu tráiler se ha desenganchado y desaparecido o ha acabado en un lugar inaccesible con esta opción volverá a tu posición."));
    menuCamionero.AddItem(new UIMenuItem("Cancelar reparto", "Cancelas el reparto actual que estas realizando, no recibirás dinero ni habilidad."));
    menuCamionero.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer."));
    if (trailer != 0)
        menuCamionero.AddItem(new UIMenuItem("Mi reparto", "Información del reparto:\n ~b~Origen: ~w~" + recogida + "\n~b~Destino: ~w~" + destino + "\n~b~Producto: ~w~" + mercancia + " (" + cantidadMercancia + " uds.)\n~b~Distancia: ~w~" + distancia + " mts\n~b~Ganancias: ~g~$" + ganancias + "\n~b~Camion: ~w~" + camion + "\n~b~Trailer: ~w~" + trailer));
    else
        menuCamionero.AddItem(new UIMenuItem("Mi reparto", "Información del reparto:\n ~b~Origen: ~w~" + recogida + "\n~b~Destino: ~w~" + destino + "\n~b~Producto: ~w~" + mercancia + " (" + cantidadMercancia + " uds.)\n~b~Distancia: ~w~" + distancia + " mts\n~b~Ganancias: ~g~$" + ganancias + "\n~b~Camion: ~w~" + camion));
    menuCamionero.AddItem(new UIMenuItem("Sacar mercancia", "Sacas la mercancía de tu vehículo."));
    menuCamionero.AddItem(new UIMenuItem("Meter mercancia", "Metes la mercancía en tu vehículo."));
    menuCamionero.AddItem(new UIMenuItem("Entregar mercancia", "Entregas la mercancía en el negocio."));
    menuCamionero.AddItem(new UIMenuItem("Recoger mercancia", "Recoges la mercancía del negocio."));
    menuCamionero.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCamionero.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuCamionero?.Close();
        }
        else if (index != 3) {
            if (setFloodboton(700, "FB74") == false) return;
            mp.events.callRemote("menu_camionero", index);
        }
    });

    menuCamionero.MenuClose.on(() => {
        recogida = "";
        destino = "";
        mercancia = "";
        cantidadMercancia = 0;
        distancia = 0;
        ganancias = 0;
        camion = 0;
        trailer = 0;
        menuCamionero = null;
    });
}

}