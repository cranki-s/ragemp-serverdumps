{
﻿/*
 * Descripcion: Contiene el menú de hurtar
 */

let idNegocio = 0;
let infoStock = [];
let estilo = { libreria: "texturas_menus", sprite: "textura_menu" };

let menuHurtarNegocio = null;

// Evento menu
mp.events.add("menu_hurtar_negocio", function (llave_neg, tipo_menu_compra, datosNegocio) {
    idNegocio = llave_neg;
    estilo = intEstilo(tipo_menu_compra);

    menu_hurtar_negocio(datosNegocio);
});

// Funcion para mostrar el menu de hurtar objetos en el negocio
function menu_hurtar_negocio(args) {
    /* Argumentos:
     * 0: número de objetos que tiene el negocio
     * (1-2-3): nombre del tipo de objeto, SQLID del tipo de objeto, precio
     */

    menuHurtarNegocio = crearMenu("", "Hurtar objeto", false, estilo.libreria, estilo.sprite);
    infoStock = [];
    for (let i = 1; i < args[0] * 3; i += 3) {
        // Obtenemos los datos
        let nombreObj = args[i];
        let idObj = args[i+1];
        let precioObj = args[i+2];

        // Guardamos el ID del objeto para relacionarla con el nombre
        infoStock.push(idObj);

        // Agregamos el botón al menú
        var botObj = new UIMenuItem(nombreObj, "");
        botObj.SetRightLabel(precioObj + " ~g~$");
        menuHurtarNegocio.AddItem(botObj);
    }
    menuHurtarNegocio.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuHurtarNegocio.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar" && infoStock[index] != undefined) {
            mp.events.callRemote("hurtar_objeto_neg", idNegocio, infoStock[index], -1);
        }

        menuHurtarNegocio?.Close();
    });

    menuHurtarNegocio.MenuClose.on(() => {
        estilo = { libreria: "texturas_menus", sprite: "textura_menu" };
        infoStock = [];

        menuHurtarNegocio = null;
    });
}

}