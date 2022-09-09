{
/*
 * Autor: poleStar
 * 
 * 
 * Descripcion: Contiene el acceso a los menus de Animaciones, Animaciones Guardadas, Escenarios y Estilos de caminar
*/
let menu_f5 = null;

// Eventos menu
mp.events.add("mostrar_menu_f5", function () {
    mostrar_menu_f5();
});

// Funcion para mostrar el menu de jugador
function mostrar_menu_f5() {
    menu_f5 = crearMenu("Menú F5", "Menu global de animaciones");
    menu_f5.AddItem(new UIMenuItem("Animaciones guardadas", "Menú de animaciones guardadas"));
    menu_f5.AddItem(new UIMenuItem("Animaciones", "Menú de animaciones"));
    menu_f5.AddItem(new UIMenuItem("Escenarios", "Menú de escenarios"));
    menu_f5.AddItem(new UIMenuItem("Estilos de caminar", "Menú de estilos de caminar"));
    menu_f5.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menu_f5.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                menu_f5?.Close();
                mp.events.callRemote("mostrar_animaciones_jugador");
                break;
            case 1:
                menu_f5?.Close();
                mp.events.callRemote("mostrar_animaciones");
                break;
            case 2:
                menu_f5?.Close();
                mp.events.callRemote("mostrar_escenarios");
                break;
            case 3:
                if (player_local.getHealth() <= 66) {
                    mostrarAviso("danger", 3000, "No puedes usar esta opción estando herido");
                    return;
                } else {
                    mostrar_menu_categorias_estilos();
                    menu_f5?.Close(true);
				}
                break;
            default:
                menu_f5?.Close();
                break;
        }
    });

    menu_f5.MenuClose.on(() => {
        menu_f5 = null;
    });
}

}