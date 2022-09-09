{
﻿/*
 * Descripcion: Contiene el menú de stock en negocios
 */

let idNegocio = -1;
let stockElegido = {}; // infoStock
let infoStock = []; // list infoStock
let tipoNegocio = 0;

let estilo_menu = { libreria: "texturas_menus", sprite: "textura_menu" };

let menuStockNegocio = null;
let menuStockNegocio_Opciones = null;
let menuStockNegocio_Confirmar = null;
let menuStockNegocio_Vehiculos = null;

// Eventos menus
mp.events.add("mostrar_negocio_stock", function (llave, int_menucompra, args, tipo) {
    infoStock = JSON.parse(args);
    idNegocio = llave;
    estilo_menu = intEstilo(int_menucompra);
    tipoNegocio = tipo;
    stockElegido = null;
    mostrar_negocio_stock();
});

mp.events.add("enviarCantidad_stock", function (args) {
    let cantidad = args;

    mp.events.callRemote("negocios:actualizarprecio", idNegocio, stockElegido.idObjeto, cantidad);
});

mp.events.add("enviarCantidad_actualizarllave", function (args) {
    let cantidad = args;

    mp.events.callRemote("actualizarllave_menu", stockElegido.idObjeto, cantidad);
});

mp.events.add("enviarCantidad_pedido", function (args) {
    mostrarPedidoStock_Confirmar(args);
});

mp.events.add("cerrarCantidad_stock", function () {
    mostrarMenuStock_Opciones();
});

// Funcion para mostrar el menu stock de un negocio
function mostrar_negocio_stock() {

    if (infoStock.length <= 0) {
        mostrarAviso("danger", 4000, "No hay stock en el negocio");
        return;
    }

    menuStockNegocio = crearMenu("", "Stock", false, estilo_menu.libreria, estilo_menu.sprite);
    for (let i = 0, n = infoStock.length; i < n; i++) {
        let stock = infoStock[i];
        if (stock.cantidad <= 0) {
            let botObj = aplicarColores(new UIMenuItem(stock.nombreObjeto + " (" + stock.cantidad + ")", "El precio indicado es lo que el distribuidor cobra al negocio por unidad.\n Precio establecido en el negocio " + stock.precio), "Rojo");
            botObj.SetRightLabel(stock.precioDefault + " ~g~$");
            menuStockNegocio.AddItem(botObj);
        }
        else {
            let botObj = new UIMenuItem(stock.nombreObjeto + " (" + stock.cantidad + ")", "El precio indicado es lo que el distribuidor cobra al negocio por unidad.\n Precio establecido en el negocio " + stock.precio);
            botObj.SetRightLabel(stock.precioDefault + " ~g~$");
            menuStockNegocio.AddItem(botObj);
        }
    }
    menuStockNegocio.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    menuStockNegocio.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuStockNegocio?.Close();
        }
        else {
            if (tipoNegocio == 15) {
                aux = true;
                stockElegido = infoStock[index];
                mostrarCompraventa();
            }
            else if (tipoNegocio != 16 && tipoNegocio != 17) {
                aux = true;
                stockElegido = infoStock[index];
                mostrarMenuStock_Opciones();
            }

            menuStockNegocio?.Close(aux);
        }
    });

    menuStockNegocio.MenuClose.on(() => {
        if (!aux) {
            estilo_menu = { libreria: "texturas_menus", sprite: "textura_menu" };
            infoStock = [];
            tipoNegocio = 0;
            stockElegido = null;
        }
  
        menuStockNegocio = null;
    });
}

// Funcion para mostrar el menu "stock" de un compraventa
function mostrarCompraventa() {
    if (stockElegido == null) {
        mp.gui.chat.show(true);
        menuAbierto = false;
        mostrarAviso("danger", 5000, "Error, vuelve a elegir el producto de la lista");
        return;
    }

    menuStockNegocio_Vehiculos = crearMenu("Vehículo", "Opciones de vehículo", false, estilo_menu.libreria, estilo_menu.sprite);

    menuStockNegocio_Vehiculos.AddItem(new UIMenuItem("Activar vehículo", stockElegido.idObjeto.toString()));
    menuStockNegocio_Vehiculos.AddItem(new UIMenuItem("Ocultar vehículo", stockElegido.idObjeto.toString()));
    menuStockNegocio_Vehiculos.AddItem(new UIMenuItem("Localizar vehículo", stockElegido.idObjeto.toString()));
    menuStockNegocio_Vehiculos.AddItem(new UIMenuItem("Actualizar precio", "Modifica y actualiza el precio al que se vende el vehículo en el negocio"));
    menuStockNegocio_Vehiculos.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    menuStockNegocio_Vehiculos.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("negocios:activarLlave", stockElegido.idObjeto, idNegocio);
                break;
            case 1:
                mp.events.callRemote("negocios:ocultarLlave", stockElegido.idObjeto, idNegocio);
                break;
            case 2:
                mp.events.callRemote("negocios:localizarLlave", stockElegido.idObjeto, idNegocio);
                break;
            case 3:
                aux = true;
                mp.gui.cursor.visible = true;

                mp.events.call("cantidad:mostrar", "enviarCantidad_actualizarllave");
                break;
            default:
                break;
        }

        menuStockNegocio_Vehiculos?.Close(aux);
    });

    menuStockNegocio_Vehiculos.MenuClose.on(() => {
        if (!aux) {
            estilo_menu = { libreria: "texturas_menus", sprite: "textura_menu" };
            infoStock = [];
            stockElegido = null;
        }
        menuStockNegocio_Vehiculos = null;
    });
}

// Funcion para mostrar el menú de opciones del stock seleccionado
function mostrarMenuStock_Opciones() {
    if (stockElegido == null) {
        mp.gui.chat.show(true);
        menuAbierto = false;
        mostrarAviso("danger", 5000, "Error, vuelve a elegir el producto de la lista");
        return;
    }

    menuStockNegocio_Opciones = crearMenu("", "Opciones de " + stockElegido.nombreObjeto, false, estilo_menu.libreria, estilo_menu.sprite);

    let botObj = new UIMenuItem("Realizar pedido", "Elige la cantidad que quieres pedir, como máximo será 500.");
    menuStockNegocio_Opciones.AddItem(botObj);
    botObj = new UIMenuItem("Modificar precio", "Modifica el precio al que se vende el producto en el negocio, nunca podrá superar el doble del precio por defecto.");
    botObj.SetRightLabel(stockElegido.precio + " ~g~$");
    menuStockNegocio_Opciones.AddItem(botObj);
    menuStockNegocio_Opciones.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    menuStockNegocio_Opciones.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                aux = true;
                mp.gui.cursor.visible = true;

                mp.events.call("cantidad:mostrar", "enviarCantidad_pedido", "Unidades", false);
                break;
            case 1:
                aux = true;
                mp.gui.cursor.visible = true;

                mp.events.call("cantidad:mostrar", "enviarCantidad_stock");
                break;
            default:
                break;
        }

        menuStockNegocio_Opciones?.Close(aux);
    });

    menuStockNegocio_Opciones.MenuClose.on(() => {
        if (!aux) {
            stockElegido = null;
        }
        menuStockNegocio_Opciones = null;
    });
}

// Funcion para mostrar el menú de opciones del stock seleccionado
function mostrarPedidoStock_Confirmar(args) {
    let cantidad = args;

    if (cantidad <= 0) {
        mp.gui.chat.show(true);
        menuAbierto = false;
        stockElegido = null;
        mostrarAviso("danger", 5000, "Cantidad introducida no válida");
        return;
    }

    if (stockElegido == null) {
        mp.gui.chat.show(true);
        menuAbierto = false;
        mostrarAviso("danger", 5000, "Error, vuelve a elegir el producto de la lista");
        return;
    }

    let precioPedido = cantidad * stockElegido.precioDefault;

    menuStockNegocio_Confirmar = crearMenu("", "Confirmar pedido de " + stockElegido.nombreObjeto, false, estilo_menu.libreria, estilo_menu.sprite);

    let botObj = aplicarColores(new UIMenuItem("Confirmar pedido", "Realiza el pedido"), "Verde");
    botObj.SetRightLabel(precioPedido + " ~g~$");
    menuStockNegocio_Confirmar.AddItem(botObj);
    botObj = aplicarColores(new UIMenuItem("Cancelar pedido", "Cancela el pedido"), "Rojo");
    menuStockNegocio_Confirmar.AddItem(botObj);

    menuStockNegocio_Confirmar.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: // confirmar
                mp.events.callRemote("negocios:pedido", idNegocio, stockElegido.idObjeto, cantidad);
                break;
            default:
                break;
        }

        menuStockNegocio_Confirmar?.Close();
    });

    menuStockNegocio_Confirmar.MenuClose.on(() => {
        stockElegido = null;
        menuStockNegocio_Confirmar = null;
    });
}

}