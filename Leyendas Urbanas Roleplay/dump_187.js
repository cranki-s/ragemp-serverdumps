{
﻿/*
 * Descripcion: Contiene el menú de menuAutoescuela
 */

let menuAutoescuela = null;

// Evento menu
mp.events.add("mostrar_autoescuela", function () {
    mostrar_autoescuela();
});

// Funcion para mostrar el menu de la autoescuela
function mostrar_autoescuela() {

    menuAutoescuela = crearMenuConDistancia(4, "Autoescuela", "Examenes disponibles");
    let botLin = new UIMenuItem("Turismos", "Carnet o licencia que te permitira conducir legalmente cualquier turismo ");
    botLin.SetRightLabel("10.000 ~g~$");
    menuAutoescuela.AddItem(botLin);
    botLin = new UIMenuItem("Motocicletas", "Carnet o licencia que te permitira conducir legalmente cualquier motocicleta ");
    botLin.SetRightLabel("5.000 ~g~$");
    menuAutoescuela.AddItem(botLin);
    botLin = new UIMenuItem("Helicopteros", "Carnet o licencia que te permitira conducir legalmente cualquier helicoptero");
    botLin.SetRightLabel("500.000 ~g~$");
    menuAutoescuela.AddItem(botLin);
    botLin = new UIMenuItem("Barcos", "Carnet o licencia que te permitira conducir legalmente cualquier barco o lancha de recreo");
    botLin.SetRightLabel("200.000 ~g~$");
    menuAutoescuela.AddItem(botLin);
    menuAutoescuela.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));


    menuAutoescuela.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("escoger_test_autoescuela", index);
        }

        menuAutoescuela?.Close();
    });

    menuAutoescuela.MenuClose.on(() => {
        menu_con_distancia = null;
        menuAutoescuela = null;
    });
}

}