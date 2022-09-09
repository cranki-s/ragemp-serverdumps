{
﻿/*
 * Descripcion: Contiene el menú de animaciones
 */

let idCategorias = [];
let idAnimaciones = [];
let items_menu = []; // Contiene los UIMenuItem a añadir al menu

let animaciones = null;

// Evento menu
mp.events.add("lista_categorias", function (args) {
    cargar_categorias(args);
});

mp.events.add("lista_animaciones", function (args) {
    cargar_lista_animaciones(args);
});

// Funcion para mostrar el menu de animaciones o categorias
function menu_animaciones() {

    animaciones = crearMenu("Animaciones", "Animaciones disponibles");
    for (let i = 0, n = items_menu.length; i < n; i++) {
        animaciones.AddItem(items_menu[i]);
    }
    animaciones.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    animaciones.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            animaciones?.Close();
        }
        else {
            if (idAnimaciones.length == 0) {
                mp.events.callRemote("escoger_categoria", idCategorias[index]);
                animaciones?.Close();
            }
            else {
                mp.events.callRemote("escoger_animacion", idAnimaciones[index]);
            }
        }
    });

    animaciones.MenuClose.on(() => {
        idCategorias = [];
        idAnimaciones = [];
        items_menu = [];
        animaciones = null;
    });
}

function cargar_categorias(args)
{
    idCategorias = [];
    items_menu = [];

    let array = JSON.parse(args);

    for (let i = 0, n = array.length; i < n; i++)
    {
        // Obtenemos los datos
        let nombre_categoria = array[i];

        // Agregamos el botón al menú
        items_menu.push(new UIMenuItem(nombre_categoria.toUpperCase(), ""));

        // Guardamos el ID del objeto para relacionarla con el nombre
        idCategorias.push(nombre_categoria);
    }

    menu_animaciones();
}

function cargar_lista_animaciones(args)
{
    /* Argumentos:
     * 0: número de animaciones que hay en la categoria
     * Por cada animacion:
     * 1: ID de la animacion
     * 2: Nombre de la animacion
     * 3: Descripcion de la animacion
     */

    let array = JSON.parse(args);

    idAnimaciones = [];
    items_menu = [];
    for (let i = 1; i < array[0] * 3; i += 3)
    {
        // Obtenemos los datos
        let idAnim = array[i];
        let nombre = array[i+1];
        let descripcion = array[i+2];

        // Guardamos el ID del objeto para relacionarla con el nombre
        idAnimaciones.push(idAnim);

        // Agregamos el botón al menú
        items_menu.push(new UIMenuItem(nombre.toUpperCase(), descripcion));
    }

    menu_animaciones();
}

}