{
/* --------------------------------------------------------------------------------
 * deposito.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu para pagar por los vehiculos que esten en el deposito
 *
 * -------------------------------------------------------------------------------- */
let llaveVeh;
let matriculaVeh;
let precioSacarVeh;
let modeloVeh;

let vehiculos;
let lugarDeposito;

let menuVehDeposito = null;
let menu_Pagar_vehDeposito = null;

mp.events.add("deposito:mostrar_menu_vehiculos_deposito", (vehiculos_string = "", lugar = -1) => {

    llaveVeh = null;
    matriculaVeh = null; 
    precioSacarVeh = null; 
    modeloVeh = null; 
    
    if (vehiculos_string != "") {
        vehiculos = JSON.parse(vehiculos_string);
    }
    if (lugar != -1) {
        lugarDeposito = lugar;
    }

    menuVehDeposito = crearMenuConDistancia(4, 'Vehiculos', 'Vehiculos en deposito');
    for (let vehiculo of vehiculos) {
        let tipoVeh = "";
        switch (vehiculo.tipo) {
            case 0:
                tipoVeh = "Propio";
                break;
            case 1:
                tipoVeh = "Facción";
                break;
           case 2:
                tipoVeh = "Negocio";
                break;

        }
        menuVehDepositoOpcionItem = new UIMenuItem("" + vehiculo.modelo + "", "Llave: " + vehiculo.llave + "\nMatricula: " + vehiculo.matricula + "\nVehiculo: " + tipoVeh);
        menuVehDepositoOpcionItem.SetRightLabel("~o~" + vehiculo.precio + "$");
        menuVehDeposito.AddItem(menuVehDepositoOpcionItem);
    }
    menuVehDeposito.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuVehDeposito.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            menuVehDeposito?.Close(true);

            llaveVeh = vehiculos[index]["llave"];
            matriculaVeh = vehiculos[index]["matricula"];
            precioSacarVeh = vehiculos[index]["precio"];
            modeloVeh = vehiculos[index]["modelo"];

            mostrar_menu_pagarvehdeposito();
        }
        else {
            menuVehDeposito?.Close();
        }
    });

    menuVehDeposito.MenuClose.on(item => {
        menu_con_distancia = null;
        menuVehDeposito = null;
    });
});

function mostrar_menu_pagarvehdeposito() {

    menu_Pagar_vehDeposito = crearMenuConDistancia(4, "Pagar", "¿Cómo desea realizar el pago?");
    menu_Pagar_vehDeposito.AddItem(new UIMenuItem("Efectivo", "Vas a pagar ~o~" + precioSacarVeh + "$~w~ para recuperar el vehículo " + modeloVeh + " (" + llaveVeh + ") con matricula " + matriculaVeh + "."));
    menu_Pagar_vehDeposito.AddItem(new UIMenuItem("Tarjeta", "Vas a pagar ~o~" + precioSacarVeh + "$~w~ para recuperar el vehículo " + modeloVeh + " (" + llaveVeh + ") con matricula " + matriculaVeh + "."));
    menu_Pagar_vehDeposito.AddItem(new UIMenuItem("Cancelar", "Vuelves al menú de vehiculos en deposito sin pagar la opción actual."));

    menu_Pagar_vehDeposito.ItemSelect.on((item, index) => {
        menu_Pagar_vehDeposito.setVisible(false);
        menu_con_distancia = null;
        menu_Pagar_vehDeposito = null;

        switch (index) {
            case 0:
                mp.events.callRemote("deposito:pagar_vehiculo_deposito", llaveVeh, precioSacarVeh, lugarDeposito, 0);
                break;
            case 1:
                mp.events.callRemote("deposito:pagar_vehiculo_deposito", llaveVeh, precioSacarVeh, lugarDeposito, 1);
                break;
            case 2:
                menu_Pagar_vehDeposito?.Close(true);
                break;

        }
    });

    menu_Pagar_vehDeposito.MenuClose.on(item => {
        menu_con_distancia = null;
        menu_Pagar_vehDeposito = null;
        mp.events.call("deposito:mostrar_menu_vehiculos_deposito");
    });
}

}