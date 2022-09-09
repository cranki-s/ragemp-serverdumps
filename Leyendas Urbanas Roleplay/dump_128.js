{
let tipo;
let precioCobrar;
let nombreLicencia = "";

mp.events.add("ayuntamiento:mostrar_menu_general", () => {
    menuayunta = crearMenuConDistancia(4, 'Ayuntamiento', 'Opciones del ayuntamiento');
    menuOpcionItem = new UIMenuItem("Documentación (ID)", "Puedes comprar un documento de identidad (ID) con tus datos para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~1000$");
    menuayunta.AddItem(menuOpcionItem);
    menuOpcionItem = new UIMenuItem("Licencias vehículos", "Puedes comprar un carnet con las licencias de tus vehículos para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~5000$");
    menuayunta.AddItem(menuOpcionItem);
    menuOpcionItem = new UIMenuItem("Licencia de caza", "En el caso de tener emitida una licencia de caza puedes comprar el carnet para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~6000$");
    menuayunta.AddItem(menuOpcionItem);
    menuOpcionItem = new UIMenuItem("Licencia de pesca", "En el caso de tener emitida una licencia de pesca puedes comprar el carnet para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~6000$");
    menuayunta.AddItem(menuOpcionItem);
    menuOpcionItem = new UIMenuItem("Licencia de armas", "En el caso de tener emitida una licencia de armas puedes comprar el carnet para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~8000$");
    menuayunta.AddItem(menuOpcionItem);
    menuOpcionItem = new UIMenuItem("Licencia de seguridad", "En el caso de tener emitida una licencia de guardia de seguridad puedes comprar el carnet para presentarlo cuando te sea requerido.");
    menuOpcionItem.SetRightLabel("~o~8000$");
    menuayunta.AddItem(menuOpcionItem);
    menuayunta.AddItem(new UIMenuItem("Renovar licencias", "Renueva las licencias que tengas caducadas pagando unas tasas."));

    menuayunta.ItemSelect.on((item, index) => {
        menuayunta?.Close();

        precioCobrar = 0;
        switch (index) {
            case 0:
                {
                    nombreLicencia = "Documentación (ID)";
                    precioCobrar = 1000;
                    tipo = 1929;
                }
                break;
            case 1:
                {
                    nombreLicencia = "Licencias vehículos";
                    precioCobrar = 5000;
                    tipo = 1934;
                }
                break;
            case 2:
                {
                    nombreLicencia = "Licencia de caza";
                    precioCobrar = 6000;
                    tipo = 1935;
                }
                break;
            case 3:
                {
                    nombreLicencia = "Licencia de pesca";
                    precioCobrar = 6000;
                    tipo = 1937;
                }
                break;
            case 4:
                {
                    nombreLicencia = "Licencia de armas";
                    precioCobrar = 8000;
                    tipo = 1936;
                }
                break;
            case 5:
                {
                    nombreLicencia = "Licencia de seguridad";
                    precioCobrar = 8000;
                    tipo = 1938;
                }
                break;
            case 6:
                {
                    mp.events.callRemote("licencias:consultar_licencias_caducadas");
                }
                return;
        }

        if(index < 6)
        {
            mostrar_menu_pagarcarnets();
        }
    });

    menuayunta.MenuClose.on(item => {
        menu_con_distancia = null;
        menuayunta = null;
    });
});

function mostrar_menu_pagarcarnets() {
    menu_Pagar_carnets = crearMenuConDistancia(4, "Pagar carnet", "");
    menu_Pagar_carnets.AddItem(new UIMenuItem("Efectivo", "Vas a pagar ~o~" + precioCobrar + "$~w~ en concepto de tasas por emitir la " + nombreLicencia + "."));
    menu_Pagar_carnets.AddItem(new UIMenuItem("Tarjeta", "Vas a pagar ~o~" + precioCobrar + "$~w~ en concepto de tasas por emitir la " + nombreLicencia + "."));
    menu_Pagar_carnets.AddItem(new UIMenuItem("Cancelar", "Vuelves al menú del ayuntamiento sin emitir la " + nombreLicencia + "."));

    menu_Pagar_carnets.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                if ((calcDist(player_local.position, new mp.Vector3(-151.1248, 6302.993, 31.61087)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(-549.8019, -191.8376, 38.22483)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(1701.543, 3783.776, 34.76694)) > 2.0 && player_local.dimension == 0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago");
                    return;
                }
                mp.events.callRemote("ayuntamiento:pagar_carnet", tipo, precioCobrar, 0, nombreLicencia);
                break;
            case 1:
                if ((calcDist(player_local.position, new mp.Vector3(-151.1248, 6302.993, 31.61087)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(-549.8019, -191.8376, 38.22483)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(1701.543, 3783.776, 34.76694)) > 2.0 && player_local.dimension == 0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago");
                    return;
                }
                mp.events.callRemote("ayuntamiento:pagar_carnet", tipo, precioCobrar, 1, nombreLicencia);
                break;
            default:
                menu_Pagar_carnets?.Close(true);
                return;
        }

        menu_Pagar_carnets.setVisible(false);
        menu_con_distancia = null;
        menu_Pagar_carnets = null;
    });

    menu_Pagar_carnets.MenuClose.on(item => {
        menu_con_distancia = null;
        menu_Pagar_carnets = null;
        mp.events.call("ayuntamiento:mostrar_menu_general");
    });
}

}