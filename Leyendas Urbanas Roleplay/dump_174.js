{
﻿/*
 * Descripcion: Contiene el menú de trabajo de autobusero
*/

let numero = 0;
let nombre = "";
let tipo = "";
let tarifa = 0;
let gananciasAcumuladas = 0;
let proximaParada = "";
let rutaParada = new mp.Vector3(0.0, 0.0, 0.0);

let menuAutobus = null;

// Evento menu
mp.events.add("mostrar_autobus", function (int_numero, str_nombre, str_tipo, int_tarifa, int_gananciasAcumuladas, str_proximaParada, vc3_rutaParada) {
    numero = int_numero;
    nombre = str_nombre;
    tipo = str_tipo;
    tarifa = int_tarifa;
    gananciasAcumuladas = int_gananciasAcumuladas;
    proximaParada = str_proximaParada;
    rutaParada = vc3_rutaParada;

    mostrar_autobus();
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_autobus() {
    menuAutobus = crearMenu("Autobus", "Trabajo autobus opciones disponibles");
    menuAutobus.AddItem(new UIMenuItem("Abrir puertas", "Abre las puertas de tu autobus."));
    menuAutobus.AddItem(new UIMenuItem("Cerrar puertas", "Cierra las puertas de tu autobus."));
    menuAutobus.AddItem(new UIMenuItem("Fin", "Termina la línea que estás haciendo, si no has llegado a completar la línea no cobraras ni recibirás habilidad."));
    menuAutobus.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer."));
    menuAutobus.AddItem(new UIMenuItem("Información de la linea", "~b~Numero: ~w~" + numero + "\n~b~Nombre: ~w~" + nombre + "\n~b~Tipo: ~w~" + tipo + "\n~b~Tarifa: ~g~$" + tarifa + "\n~b~Ganancias acumuladas: ~w~$" + gananciasAcumuladas + "\n~b~Próxima parada: ~w~" + proximaParada));
    menuAutobus.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuAutobus.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: case 1: case 2:
                mp.events.callRemote("menu_autobus", index);
                break;
            case 3:
                mp.game.ui.setNewWaypoint(rutaParada.x, rutaParada.y);
                break;
            default:
                break;
        }

        numero = 0;
        nombre = "";
        tipo = "";
        tarifa = 0;
        gananciasAcumuladas = 0;
        proximaParada = "";
        rutaParada = player_local.position;

        menuAutobus?.Close();
    });

    menuAutobus.MenuClose.on(() => {
        numero = 0;
        nombre = "";
        tipo = "";
        tarifa = 0;
        gananciasAcumuladas = 0;
        proximaParada = "";
        rutaParada = player_local.position;
        menuAutobus = null;
    });
}

}