{
﻿/*
 * Descripcion: Contiene el menú de las casas
 */

let propiedad_SQLID = 0;
let propiedad_llave = 0;
let propiedad_propietario = 0;

let menuCasasCompra = null;
let menuCasasAlquiler = null;
let menuInteriorCasa = null;

// Eventos menus
mp.events.add("mostrar_casas_compra", function (llave, tiene_llave, es_propietario) {
    propiedad_SQLID = llave;
    propiedad_llave = tiene_llave;
    propiedad_propietario = es_propietario;

    mostrar_casa_compra();
});

mp.events.add("mostrar_casas_alquiler", function (llave, tiene_llave, es_propietario) {
    propiedad_SQLID = llave;
    propiedad_llave = tiene_llave;
    propiedad_propietario = es_propietario;

    mostrar_casa_alquiler(args);
});

mp.events.add("ocultar_casas", function () {
    if (menuCasasCompra != null) {
        menuCasasCompra?.Close();
    }

    if (menuCasasAlquiler != null) {
        menuCasasAlquiler?.Close();
    }
});

mp.events.add("mostrar_interior_casa", function (llave, es_propietario) {
    propiedad_SQLID = llave;
    propiedad_propietario = es_propietario;

    mostrar_interior_casa();
});

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_casa_compra(args) {

    menuCasasCompra = crearMenuConDistancia(4, "Propiedad Nº " + propiedad_SQLID, "Opciones de la propiedad");
    if (propiedad_llave == true) {
        menuCasasCompra.AddItem(new UIMenuItem("Abrir Propiedad", ""));
        menuCasasCompra.AddItem(new UIMenuItem("Cerrar Propiedad", ""));
        if (propiedad_propietario == true) menuCasasCompra.AddItem(aplicarColores(new UIMenuItem("Vender Propiedad", ""), "Naranja"));
        else menuCasasCompra.AddItem(aplicarColores(new UIMenuItem("Tirar llave", ""), "Naranja"));
    }
    else {
        menuCasasCompra.AddItem(aplicarColores(new UIMenuItem("Comprar Propiedad", ""), "Naranja"));
        menuCasasCompra.AddItem(new UIMenuItem("Alquilar Propiedad", ""));
        menuCasasCompra.AddItem(new UIMenuItem("Visitar Propiedad", ""));
    }
    menuCasasCompra.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCasasCompra.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("escoger_menu_casa_compra", index);
        }

        menuCasasCompra?.Close();
    });

    menuCasasCompra.MenuClose.on(() => {
        menu_con_distancia = null;
        menuCasasCompra = null;
    });
}

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_casa_alquiler() {
    menuCasasAlquiler = crearMenuConDistancia(4, "Propiedad Nº " + propiedad_SQLID, "Opciones de la propiedad");
    if (propiedad_llave == true) {
        menuCasasAlquiler.AddItem(new UIMenuItem("Abrir Propiedad", ""));
        menuCasasAlquiler.AddItem(new UIMenuItem("Cerrar Propiedad", ""));
        if (propiedad_propietario == true) menuCasasAlquiler.AddItem(aplicarColores(new UIMenuItem("Dejar alquiler", ""), "Naranja"));
        else menuCasasAlquiler.AddItem(aplicarColores(new UIMenuItem("Tirar llave", ""), "Naranja"));
    }
    else {
        menuCasasAlquiler.AddItem(new UIMenuItem("Alquilar Propiedad", ""));
        menuCasasAlquiler.AddItem(aplicarColores(new UIMenuItem("Comprar Propiedad", ""), "Naranja"));
        menuCasasAlquiler.AddItem(new UIMenuItem("Visitar Propiedad", ""));
    }
    menuCasasAlquiler.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCasasAlquiler.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("escoger_menu_casa_alquiler", index);
        }

        menuCasasAlquiler?.Close();
    });

    menuCasasAlquiler.MenuClose.on(() => {
        menu_con_distancia = null;

        menuCasasAlquiler = null;
    });
}

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_interior_casa() {
    menuInteriorCasa = crearMenu("Propiedad", "Opciones de la propiedad");
    menuInteriorCasa.AddItem(new UIMenuItem("Abrir Propiedad", ""));
    menuInteriorCasa.AddItem(new UIMenuItem("Cerrar Propiedad", ""));
    if (propiedad_propietario == true) menuInteriorCasa.AddItem(new UIMenuItem("Situar armario", "Establecer el armario o inventario de la propiedad"));
    menuInteriorCasa.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));
    menuInteriorCasa.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("escoger_menu_interior_casa", index);
        }

        menuInteriorCasa?.Close();
    });

    menuInteriorCasa.MenuClose.on(() => {
        menuInteriorCasa = null;
    });
}

}