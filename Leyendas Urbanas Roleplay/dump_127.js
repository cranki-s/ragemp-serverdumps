{
let id_de_multa;
let importe_de_multa;

mp.events.add("mostrar_menu_multas", () => {

    if (multas.length <= 0)
    {
        return;
    }

    id_de_multa = null;
    importe_de_multa = null; 

    menuMultas = crearMenuConDistancia(4, 'Multas', 'Multas pendientes');
    for (let multa of multas) {
        menuMultas.AddItem(new UIMenuItem("Fecha: " + multa.fecha + ". Importe: ~o~" + multa.importe + "$~w~", "~y~[ID: " + multa.id + "]~w~ " + multa.razon.substring(0, 66) + (multa.razon.length > 66 ? "..." : ".")));
    }

    menuMultas.ItemSelect.on((item, index) => {
        menuMultas?.Close(true);

        id_de_multa = multas[index]["id"];
        importe_de_multa = multas[index]["importe"];

        mostrar_menu_pagarmulta();
    });

    menuMultas.MenuClose.on(item => {
        menu_con_distancia = null;
        menuMultas = null;
    });
});

function mostrar_menu_pagarmulta() {

    menu_Pagar_Multas = crearMenuConDistancia(4, "Pagar multa", "", true);
    menu_Pagar_Multas.AddItem(new UIMenuItem("Efectivo", "Vas a pagar ~o~" + importe_de_multa + "$~w~ por la multa seleccionada."));
    menu_Pagar_Multas.AddItem(new UIMenuItem("Tarjeta", "Vas a pagar ~o~" + importe_de_multa + "$~w~ por la multa seleccionada."));
    menu_Pagar_Multas.AddItem(new UIMenuItem("Cancelar", "Vuelves al menú de multas sin pagar la multa actual."));

    menu_Pagar_Multas.ItemSelect.on((item, index) => {
        menu_Pagar_Multas.setVisible(false);
        menu_con_distancia = null;
        menu_Pagar_Multas = null;

        switch (index) {
            case 0:
                if ((calcDist(player_local.position, new mp.Vector3(233.06003, -429.1491, 48.076775)) > 2.0) && (calcDist(player_local.position, new mp.Vector3(-151.9243, 6298.599, 31.48951)) > 2.0) && (calcDist(player_local.position, new mp.Vector3(1698.688, 3781.722, 34.76694)) > 2.0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago de la multa");
                    return;
                }
                mp.events.callRemote("multas:pagar_multa", id_de_multa, 0);
                if (multas.length == 1) {
                    mp.gui.chat.show(true);
                }
                break;
            case 1:
                if ((calcDist(player_local.position, new mp.Vector3(233.06003, -429.1491, 48.076775)) > 2.0) && (calcDist(player_local.position, new mp.Vector3(-151.9243, 6298.599, 31.48951)) > 2.0) && (calcDist(player_local.position, new mp.Vector3(1698.688, 3781.722, 34.76694)) > 2.0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago de la multa");
                    return;
                }
                mp.events.callRemote("multas:pagar_multa", id_de_multa, 1);
                if (multas.length == 1) {
                    mp.gui.chat.show(true);
                }
                break;
            case 2:
                mp.events.call("mostrar_menu_multas");
                break;

        }
    });

    menu_Pagar_Multas.MenuClose.on(item => {
        menu_con_distancia = null;
        menu_Pagar_Multas = null;
        mp.events.call("mostrar_menu_multas");
    });
}

}