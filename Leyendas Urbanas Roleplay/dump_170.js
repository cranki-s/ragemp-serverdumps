{
﻿/*
 * Autor: poleStar
 * 
 * 
 * Descripcion: Contiene el menu para seleccionar planta en los garajes con multiples plantas
*/

let menu_garaje = null;
let llave = null;

// Eventos menu
mp.events.add("menu_plantas_garaje", function (plantas, llave_prop) {
    llave = llave_prop;
    mostrar_menu_garaje(plantas);
});

// Funcion para mostrar el menu de jugador
function mostrar_menu_garaje(plantas) {

    menu_garaje = crearMenu("Ascensor Garaje", "Selecciona la planta");
    for (let i = 1; i <= plantas; i++) {
        menu_garaje.AddItem(new UIMenuItem("Planta " + i, ""));
    }
    menu_garaje.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menu_garaje.ItemSelect.on((item, index) => {
        if (index >= 0 && index < plantas) {
            let planta = index + 1;
            mp.events.callRemote("propiedades:entrar:planta", llave, planta);
        }
        menu_garaje?.Close();
    });

    menu_garaje.MenuClose.on(() => {
        menu_garaje = null;
    });
}

}