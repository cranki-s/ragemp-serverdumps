{
let menuCentralita;
let menuAvisoInfo;
let llamadas = [];

mp.events.add("mostrar_centralita", (datos) => {
    mostrar_llamadas_centralita(datos);
})

function mostrar_llamadas_centralita(datos = null) {
    menuCentralita = crearMenu("Centralita", "");
    if(datos != null) llamadas = JSON.parse(datos);

    for (let i = 0; i < llamadas.length; i++) {
        menuCentralita.AddItem(new UIMenuItem(llamadas[i].nombreRemitente + " (" + llamadas[i].idLlamada + ")", ""));
    }

    menuCentralita.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCentralita.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuCentralita?.Close();
        }
        else {
            menuCentralita?.Close(true);
            mostrar_info_llamada(index);
        }
    });

    menuCentralita.MenuClose.on(() => {
        menuCentralita = null;
    });
}

function mostrar_info_llamada(llamadaElegida) {
    
    menuAvisoInfo = crearMenu("Centralita", "");

    let mensajeTipo = "Desconocido";
    switch (llamadas[llamadaElegida].tipo) {
        case 0:
            mensajeTipo = "Llamada telefónica";
            break;
        case 1:
            mensajeTipo = "Aviso herido";
            break;
        case 2:
            mensajeTipo = "Robo vehículo";
            break;
        case 3:
            mensajeTipo = "Hurto en negocio";
            break;
        case 4:
            mensajeTipo = "Robo en negocio";
            break;
    }

    menuAvisoInfo.AddItem(new UIMenuItem("Atender", "Atiendes la llamada"));
    menuAvisoInfo.AddItem(new UIMenuItem("Ruta", "Marca la ruta al aviso"));
    menuAvisoInfo.AddItem(new UIMenuItem("Información", "~b~Numero llamada: ~w~" + llamadas[llamadaElegida].idLlamada + "\n~b~Nombre del ciudadano: ~w~" + llamadas[llamadaElegida].nombreRemitente + "\n~b~Número de teléfono: ~w~" + llamadas[llamadaElegida].numeroRemitente + "\n~b~Tipo llamada: ~w~" + mensajeTipo + "\n~b~Mensaje: ~w~" + llamadas[llamadaElegida].mensaje));
    menuAvisoInfo.AddItem(new UIMenuItem("Volver", "Vuelves atrás para ver los avisos"));

    menuAvisoInfo.ItemSelect.on((item, index) => {
        if (index == 0) {
            mp.events.callRemote("centralita_atender", llamadas[llamadaElegida].idLlamada);
            menuAvisoInfo?.Close();
        }

        if (index == 1) {
            mp.events.callRemote("centralita_ruta", llamadas[llamadaElegida].idLlamada);
            menuAvisoInfo?.Close();
        }
        // Volver
        if (index == 3) {
            menuAvisoInfo?.Close(true);
            mostrar_llamadas_centralita();
        }
    });

    menuAvisoInfo.MenuClose.on(() => {
        menuAvisoInfo = null;
    });
}

}