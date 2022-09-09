{
﻿/*
 * Descripcion: Contiene el menú de vehiculos de negocios
 */

let vehElegido = -1;
let llaveNegocio = -1;
let infoVehiculos = []; // list infoVehiculos

let vehiculosNeg = null;
let vehiculos_opciones = null;

// Eventos menus
mp.events.add("mostrar_vehiculos_negocio", function (llave, args) {
    llaveNegocio = llave;
    mostrar_vehiculos(args);
});

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrar_vehiculos(args = null) {

    if (args != null) infoVehiculos = JSON.parse(args);

    if (infoVehiculos.length <= 0)
    {
        mostrarAviso("danger", 5000, "No hay vehículos en el negocio");
        return;
    }

    vehiculosNeg = crearMenu("Vehículos", "Vehículos del negocio " + llaveNegocio);
    for(let i = 0, n = infoVehiculos.length; i < n ;i++)
    {
        let veh = infoVehiculos[i];
        if (veh.activo)
        {
            let botVeh = new UIMenuItem(veh.modelo, "~b~Matricula: ~w~" + veh.matricula + "\n~b~Precio: ~w~" + veh.precio + "\n~b~Kilometros: ~w~" + veh.kilometros + "\n~b~LLave: ~w~" + veh.llave);
            if(veh.estado == 2)
                botVeh.SetRightBadge(BadgeStyle.Lock);
            vehiculosNeg.AddItem(botVeh);
        }
        else
        {
            let botVeh = aplicarColores(new UIMenuItem(veh.modelo, "~b~Matricula: ~w~" + veh.matricula + "\n~b~Precio: ~w~" + veh.precio + "\n~b~Kilometros: ~w~" + veh.kilometros + "\n~b~LLave: ~w~" + veh.llave), "Rojo");
            if(veh.estado == 2)
                botVeh.SetRightBadge(BadgeStyle.Lock);
            vehiculosNeg.AddItem(botVeh);
        }
    }
    vehiculosNeg.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    vehiculosNeg.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            vehElegido = index;
            vehiculosNeg?.Close(true);
            mostrarMenuVehiculosOpciones();
        }
        else {
            aux = true;
            vehiculosNeg?.Close();
        }
    });

    vehiculosNeg.MenuClose.on(() => {
        if (aux){
            infoVehiculos = [];
            vehElegido = -1;
            llaveNegocio = -1;
        }

        vehiculosNeg = null;
    });
}

// Funcion para mostrar el menu de una casa (desde fuera)
function mostrarMenuVehiculosOpciones() {

    vehiculos_opciones = crearMenu("Vehículos", "Opciones con el vehículo");
    vehiculos_opciones.AddItem(new UIMenuItem("Activar", ""));
    vehiculos_opciones.AddItem(new UIMenuItem("Desactivar", ""));
    vehiculos_opciones.AddItem(new UIMenuItem("Localizar", ""));
    vehiculos_opciones.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    vehiculos_opciones.ItemSelect.on((item, index) => {
        switch(index)
        {
            case 0:
                if (infoVehiculos[vehElegido].estado == 2)
                {
                    mostrarAviso("danger", 5000, "El vehículo especificado está en el depósito de la policía");
                    aux = true;
                }
                else
                {
                    mp.events.callRemote("negocios:activarVeh", infoVehiculos[vehElegido].llave, llaveNegocio);
                }
                break;
            case 1:
                if (!infoVehiculos[vehElegido].activo)
                {
                    mostrarAviso("danger", 5000, "El vehículo especificado no se encuentra activo");
                    aux = true;
                }
                else
                {
                    mp.events.callRemote("negocios:ocultarVeh", infoVehiculos[vehElegido].llave, llaveNegocio);
                }
                break;
            case 2:
                if (!infoVehiculos[vehElegido].activo)
                {
                    mostrarAviso("danger", 5000, "El vehículo especificado no se encuentra activo");
                    aux = true;
                }
                else
                {
                    mp.events.callRemote("negocios:localizarVeh", infoVehiculos[vehElegido].llave, llaveNegocio);
                }
                break;
            case 3:
                aux = true;
                break;
            default:
                break;
        }

        vehiculos_opciones?.Close();
    });

    vehiculos_opciones.MenuClose.on(() => {
        if (!aux){
            infoVehiculos = [];
            vehElegido = -1;
            llaveNegocio = -1;
            vehiculos_opciones = null;
            return;
        }

        mostrar_vehiculos();
        vehiculos_opciones = null;
    });
}

}