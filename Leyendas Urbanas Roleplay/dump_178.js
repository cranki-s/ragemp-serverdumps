{
﻿/*
 * Descripcion: Contiene el menú para iniciar el trabajo o menu de trabajo de reponedor
*/

let menuReponedor = null;
let menuTrabajoReponedor = null;

// Evento menu
mp.events.add("menu_reponedor", function (bool) {
    // bool indica si esta trabajando o si tenemos que abrir el menu para trabajar
    if (bool == true) {
        mostrar_reponedor();
    }
    else {
        trabajar_reponedor();
    }
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_reponedor() {

    menuReponedor = crearMenu("Reponedor", "Trabajo reponedor opciones disponibles");

    menuReponedor.AddItem(new UIMenuItem("Sacar bebidas", "Sacas el paquete con las bebidas a entregar."));
    menuReponedor.AddItem(new UIMenuItem("Meter bebidas", "Metes las bebidas dentro del vehículo de reparto."));
    menuReponedor.AddItem(new UIMenuItem("Entregar bebidas", "Entregas las bebidas y comienzas a reponer la máquina solicitada."));
    menuReponedor.AddItem(new UIMenuItem("Fin", "Termina tu trabajo y recibe las ganancias que has acumulado, recuerda ir a central y dejar allí la ruta actual."));
    menuReponedor.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer como reponedor."));
    menuReponedor.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuReponedor.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: case 1: case 2: case 3: case 4:
                mp.events.callRemote("menu_reponedor", index);
                break;
            default:
                break;
        }
        menuReponedor?.Close();
    });

    menuReponedor.MenuClose.on(() => {
        menuReponedor = null;
    });
}

// Funcion para mostrar el menu de seleccion de trabajo
function trabajar_reponedor() {

    menuTrabajoReponedor = crearMenuConDistancia(4, "Reponedor", "Trabajo reponedor opciones disponibles");

    menuTrabajoReponedor.AddItem(new UIMenuItem("Distancia corta", "Repartos a maquinas expendedoras en un ratio de longitud corto (distrito)"));
    menuTrabajoReponedor.AddItem(new UIMenuItem("Distancia media", "Repartos a maquinas expendedoras en un ratio de longitud media (distrito)"));
    menuTrabajoReponedor.AddItem(new UIMenuItem("Distancia larga", "Repartos a maquinas expendedoras en un ratio de longitud larga (distrito)"));

    menuTrabajoReponedor.ItemSelect.on((item, index) => {
        if (index < 3) {
            mp.events.callRemote("trabajo_reponedor", index);
        }
        menuTrabajoReponedor?.Close();
    });

    menuTrabajoReponedor.MenuClose.on(() => {
        menu_con_distancia = null;
        menuTrabajoReponedor = null;
    });
}

}