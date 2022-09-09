{
﻿/*
 * Descripcion: Contiene el menú de lineas de autobusero
*/

let idLineas = [];

let menuLineas = null;

// Evento menu
mp.events.add("mostrar_lineas_bus", function (json) {
    mostrar_lineas_bus(json);
});

// Funcion para mostrar el menu de lineas de autobusero
function mostrar_lineas_bus(json) {
    let array = JSON.parse(json);

    menuLineas = crearMenu("Lineas", "Rutas de autobus disponibles");

    /* Argumentos:
     * 0: número de repartos que hay disponibles
     * Por cada reparto:
     * 1: ID del reparto
     * 2: Nombre de la linea
     * 3: Tipo de la linea
     */
    idLineas = [];
    let count = array.length > 0 ? array[0] * 3 : 0;
    for (let i = 1; i < count; i += 3)
    {
        // Obtenemos los datos
        let idLinea = array[i];
        let nombre = array[i+1];
        let tipo = array[i+2];

        // Guardamos el ID del objeto para relacionarla con el nombre
        idLineas.push(idLinea);

        // Agregamos el botón al menú
        let botLin = new UIMenuItem(nombre, "Tipo: " + tipo);
        botLin.SetRightLabel("" + (idLinea + 1));
        menuLineas.AddItem(botLin);
    }

    menuLineas.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuLineas.ItemSelect.on((item, index) => {
        if (count != 0 && item.Text != "Cerrar") {
            mp.events.callRemote("escoger_linea_bus", idLineas[index]);
        }

        menuLineas?.Close();
    });

    menuLineas.MenuClose.on(() => {
        idLineas = [];
        menuLineas = null;
    });
}

}