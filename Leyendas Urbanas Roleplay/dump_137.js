{
let tipo;
let puntos;
let precioCobrar;
let nombreLicencia = "";
let licencias;

mp.events.add("licencias:mostrar_menu_licencias_caducadas", (licencias_string = "") => {

    tipo = null;
    puntos = null; 

    if (licencias_string != "") {
        licencias = JSON.parse(licencias_string);
    }

    menulicencias = crearMenuConDistancia(4, 'Licencias', 'Licencias caducadas');
    for (let licencia of licencias) {
        let nombreDeLicencia = "";
        let string1 = "";
        let precioBase = "";
        switch (licencia.tipo) {
            case 1:
                {
                    nombreDeLicencia = "Turismos";
                    precio = 4000;
                    if (licencia.puntos == 1) {
                        precio = (precio * 2);
                        string1 = "Tienes 1 punto de infracción. El coste será doble del precio base"
                        precioBase = "(Precio base 4000$)";
                    }
                    if (licencia.puntos > 1) {
                        precio = (precio * licencia.puntos);
                        string1 = "Tienes " + licencia.puntos + " puntos de infracción. El coste será el precio base multiplicado por los puntos de infracción."
                        precioBase = "(Precio base 4000$)";
                    }
                }
                break;
            case 2:
                {
                    nombreDeLicencia = "Motocicletas";
                    precio = 2300;
                    if (licencia.puntos == 1) {
                        precio = (precio * 2);
                        string1 = "Tienes 1 punto de infracción. El coste será el doble del precio base"
                        precioBase = "(Precio base 2300$)";
                    }
                    if (licencia.puntos > 1) {
                        precio = (precio * licencia.puntos);
                        string1 = "Tienes " + licencia.puntos + " puntos de infracción. El coste será el precio base multiplicado por los puntos de infracción"
                        precioBase = "(Precio base 2300$)";
                    }
                }
                break;
            case 3:
                {
                    nombreDeLicencia = "Barcos";
                    precio = 80000;
                }
                break;
            case 4:
                {
                    nombreDeLicencia = "Helicópteros";
                    precio = 220000;
                }
                break;
            case 10:
                {
                    nombreDeLicencia = "Caza";
                    precio = 75000;
                }
                break;
            case 11:
                {
                    nombreDeLicencia = "Pesca";
                    precio = 50000;
                }
                break;
            case 12:
                {
                    nombreDeLicencia = "Armas tipo A";
                    precio = 50000;
                }
                break;
            case 13:
                {
                    nombreDeLicencia = "Armas tipo B";
                    precio = 125000;
                }
                break;
            case 14:
                {
                    nombreDeLicencia = "Armas tipo C";
                    precio = 250000;
                }
                break;
        }
        menuOpcionItem = new UIMenuItem("" + nombreDeLicencia + " " + precioBase + "", "" + string1 + "");
        menuOpcionItem.SetRightLabel("~o~" + precio + "$");
        menulicencias.AddItem(menuOpcionItem);
    }



    menulicencias.ItemSelect.on((item, index) => {
        menulicencias?.Close(true);

        tipo = licencias[index]["tipo"];
        puntos = licencias[index]["puntos"];
        precioCobrar = 0;
        switch (tipo) {
            case 1:
                {
                    nombreLicencia = "turismos";
                    precioCobrar = 4000;
                    if (puntos == 1) {
                        precioCobrar = (precioCobrar * 2);
                    }
                    if (puntos > 1) {
                        precioCobrar = (precioCobrar * puntos);
                    }
                }
                break;
            case 2:
                {
                    nombreLicencia = "motocicletas";
                    precioCobrar = 2300;
                    if (puntos == 1) {
                        precioCobrar = (precioCobrar * 2);
                    }
                    if (puntos > 1) {
                        precioCobrar = (precioCobrar * puntos);
                    }
                }
                break;
            case 3:
                {
                    nombreLicencia = "barcos";
                    precioCobrar = 80000;
                }
                break;
            case 4:
                {
                    nombreLicencia = "helicópteros";
                    precioCobrar = 220000;
                }
                break;
            case 10:
                {
                    nombreLicencia = "caza";
                    precioCobrar = 75000;
                }
                break;
            case 11:
                {
                    nombreLicencia = "pesca";
                    precioCobrar = 50000;
                }
                break;
            case 12:
                {
                    nombreLicencia = "armas tipo A";
                    precioCobrar = 50000;
                }
                break;
            case 13:
                {
                    nombreLicencia = "armas tipo B";
                    precioCobrar = 125000;
                }
                break;
            case 14:
                {
                    nombreLicencia = "armas tipo C";
                    precioCobrar = 250000;
                }
                break;
        }

        mostrar_menu_renovarlicencia();
    });

    menulicencias.MenuClose.on(item => {
        menu_con_distancia = null;
        menulicencias = null;
    });
});

function mostrar_menu_renovarlicencia() {

    menu_Pagar_licencias = crearMenuConDistancia(4, "Renovar licencia", "", true);
    menu_Pagar_licencias.AddItem(new UIMenuItem("Efectivo", "Vas a pagar ~o~" + precioCobrar + "$~w~ para renovar la licencia de " + nombreLicencia + "."));
    menu_Pagar_licencias.AddItem(new UIMenuItem("Tarjeta de crédito", "Vas a pagar ~o~" + precioCobrar + "$~w~ para renovar la licencia de " + nombreLicencia + "."));
    menu_Pagar_licencias.AddItem(new UIMenuItem("Cancelar", "Vuelves al menú de licencias sin renovar la licencia de " + nombreLicencia + "."));

    menu_Pagar_licencias.ItemSelect.on((item, index) => {
        menu_Pagar_licencias.setVisible(false);
        menu_con_distancia = null;
        menu_Pagar_licencias = null;

        switch (index) {
            case 0:
                mp.gui.chat.show(true);
                if ((calcDist(player_local.position, new mp.Vector3(-151.1248, 6302.993, 31.61087)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(-549.8019, -191.8376, 38.22483)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(1701.543, 3783.776, 34.76694)) > 2.0 && player_local.dimension == 0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago");
                    return;
                }
                mp.events.callRemote("licencias:pagar_renovar_licencia", tipo, precioCobrar, nombreLicencia, 0);
                break;
            case 1:
                mp.gui.chat.show(true);
                if ((calcDist(player_local.position, new mp.Vector3(-151.1248, 6302.993, 31.61087)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(-549.8019, -191.8376, 38.22483)) > 2.0 && player_local.dimension == 0) && (calcDist(player_local.position, new mp.Vector3(1701.543, 3783.776, 34.76694)) > 2.0 && player_local.dimension == 0)) {
                    mostrarAviso("danger", 6000, "Debes estar junto al mostrador para poder realizar el pago");
                    return;
                }
                mp.events.callRemote("licencias:pagar_renovar_licencia", tipo, precioCobrar, nombreLicencia, 1);
                break;
            case 2:
                mp.events.call("licencias:mostrar_menu_licencias_caducadas");
                break;

        }
    });

    menu_Pagar_licencias.MenuClose.on(item => {
        menu_con_distancia = null;

        menu_Pagar_licencias.setVisible(false);
        menu_Pagar_licencias = null;
        mp.events.call("licencias:mostrar_menu_licencias_caducadas");
    });
}

}