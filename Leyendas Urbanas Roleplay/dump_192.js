{
﻿/*
 * Descripcion: Contiene el menú de compra en negocios
 */

let idNegocio = -1;
let infoStock = []; // list infoStock
let SQLIDobjeto = 0;
let textura = []; // array int
let tipo = 0;
let slot = 0;
let variacion = 0;
let tipoNegocio = 0;

let estilo_menu = { libreria: "texturas_menus", sprite: "textura_menu" };

let menuCompraNegocio = null;
let menuCompraNegocio_Componente = null;
let inmobiliariaConfirmacion = null;

// Eventos menus
mp.events.add("mostrar_menu_compra", function (llave, int_menucompra, tipo, args) {
    infoStock = JSON.parse(args);
    idNegocio = llave;
    estilo_menu = intEstilo(int_menucompra);
    tipoNegocio = tipo;
    mostrar_menu_compra();
});

mp.events.add("mostrar_menu_componente", function (int_SQLIDTipoObjeto, int_tipo, int_slot, int_variacion, int_maximo_texturas) {
    SQLIDobjeto = int_SQLIDTipoObjeto;
    tipo = int_tipo;
    slot = int_slot;
    variacion = int_variacion;

    mostrar_menu_componente(int_maximo_texturas);
});

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_menu_compra() {

    if (infoStock.length <= 0) {
        mostrarAviso("danger", 5000, "El negocio no tiene productos a la venta");
        return;
    }

    menuCompraNegocio = crearMenuConDistancia(4, "", "Comprar objeto", false, estilo_menu.libreria, estilo_menu.sprite);
    for (let i = 0, n = infoStock.length; i < n; i++) {
        let stock = infoStock[i];
        if (stock.cantidad <= 0) {
            let botObj = aplicarColores(new UIMenuItem(stock.nombreObjeto, ""), "Rojo");
            botObj.SetRightLabel(stock.precio + " $");
            menuCompraNegocio.AddItem(botObj);
        }
        else {
            let botObj = new UIMenuItem(stock.nombreObjeto, "");
            botObj.SetRightLabel(stock.precio + " ~g~$");
            menuCompraNegocio.AddItem(botObj);
        }
    }
    menuCompraNegocio.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));


    menuCompraNegocio.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuCompraNegocio?.Close();
        }
        else {
            //Si queremos que en el menu al seleccionar un objeto nos salga el menu de confirmar, ponemos un case con el tipo de negocio
            switch (tipoNegocio) {
                case 16:
                    menuCompraNegocio?.Close(true);
                    mostrarConfirmacion();
                    break;
                default:
                    menuCompraNegocio?.Close();
                    mp.events.callRemote("comprar_objeto_neg", idNegocio, infoStock[index].idObjeto, -1);
                    break;
            }
        }
    });

    menuCompraNegocio.MenuClose.on(() => {
        menu_con_distancia = null;

        menuCompraNegocio = null;
    });
}

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_menu_componente(max_texturas) {

    // Limpiamos el menú primero
    menuCompraNegocio_Componente = crearMenuConDistancia(4, "", "Personalizar componente", false, estilo_menu.libreria, estilo_menu.sprite);
    switch (tipo) {
        case 0:
            player_local.setComponentVariation(1, variacion, 0, 2);
            break;
        case 1:
            player_local.setPropIndex(slot, variacion, 0, false);
            break;
        default:
            break;
    }

    //Creamos el bucle de texturas hasta llegar al maximo para cada objeto
    let indexCerrar = 1;
    for (let i = 0, n = max_texturas; i <= n; i++)
    {
        menuCompraNegocio_Componente.AddItem(new UIMenuItem("Textura " + i, ""));
        indexCerrar++;
    }
    menuCompraNegocio_Componente.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCompraNegocio_Componente.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("comprar_objeto_neg", idNegocio, SQLIDobjeto, index);

            switch (tipo) {
                case 0:
                    //En principio solo vamos a tener mascaras pero quien sabe de normal el 0 es sin nada
                    player_local.setComponentVariation(1, 0, 0, 0);
                    break;
                case 1:
                    player_local.clearProp(slot);
                    break;
                default:
                    break;
            }
        }

        estilo_menu = { libreria: "texturas_menus", sprite: "textura_menu" };
        infoStock = [];
        menuCompraNegocio_Componente?.Close();
    });

    menuCompraNegocio_Componente.IndexChange.on(newindex => {
        if (newindex == indexCerrar) return;
        switch (tipo) {
            case 0:
                player_local.setComponentVariation(1, variacion, newindex, 2);
                break;
            case 1:
                player_local.setPropIndex(slot, variacion, newindex, false);
                break;
            default:
                break;
        }
    });

    menuCompraNegocio_Componente.MenuClose.on(() => {
        menu_con_distancia = null;

        switch (tipo) {
            case 0:
                //En principio solo vamos a tener mascaras pero quien sabe de normal el 0 es sin nada
                player_local.setComponentVariation(1, 0, 0, 0);
                break;
            case 1:
                player_local.clearProp(slot);
                break;
            default:
                break;
        }
        menuCompraNegocio_Componente = null;
    });
}

// Menu de confirmacion de compra en inmobiliarias
function mostrarConfirmacion() {

    inmobiliariaConfirmacion = crearMenuConDistancia(4, "¿Seguro?", "Confirma la acción para continuar");
    inmobiliariaConfirmacion.AddItem(aplicarColores(new UIMenuItem("Confirmar", ""), "Verde"));
    inmobiliariaConfirmacion.AddItem(new UIMenuItem("Cancelar", ""));

    inmobiliariaConfirmacion.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("comprar_objeto_neg", idNegocio, infoStock[index].idObjeto, -1);
                inmobiliariaConfirmacion?.Close();
                break;
            case 1:
                inmobiliariaConfirmacion?.Close(true);
                mostrar_menu_compra();
                break;
            default:
                inmobiliariaConfirmacion?.Close();
                break;
        }
    });

    inmobiliariaConfirmacion.MenuClose.on(() => {
        menu_con_distancia = null;
        inmobiliariaConfirmacion = null;
    });
}

}