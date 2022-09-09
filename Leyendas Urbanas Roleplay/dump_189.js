{
﻿/*
 * Descripcion: Contiene el menú de avisos
 */

let avisoElegido = -1;
let avisos = [];

let menuAvisos = null;
let menuAvisos_info = null;

let usadoEnCamaraHeli = false;

// Evento menu
mp.events.add("mostrar_avisos", function (args) {
    if (en_camaraheli == true) {
        usadoEnCamaraHeli = true;
        mp.events.call("camara_heli");
    }
    else {
        usadoEnCamaraHeli = false;
    }

    if (!args || typeof args !== "string") {
        logError("mostrar_avisos", "1.- " + typeof args);
        return;
    }

    avisos = JSON.parse(args);

    mostrar_avisos();
});

// Funcion para mostrar el menu de avisos
function mostrar_avisos() {
    avisoElegido = -1;

    if (avisos.length <= 0) {
        mostrarAviso("info", 4000, "No tenemos ningun aviso activo");
        return;
    }

    menuAvisos = crearMenu("Avisos", "Avisos activos");
    for (let i = 0, n = avisos.length; i < n; i++) {
        let aviso = avisos[i];

        let colorZona = "";
        if (aviso.zona == 1) {
            colorZona = "~b~";
        }
        if (aviso.zona == 2) {
            colorZona = "~y~";
        }

        if (aviso.atendido == true) {
            let item = new UIMenuItem(colorZona + aviso.tipo + " (" + aviso.idAviso + ")", aviso.mensaje);
            item.SetRightBadge(BadgeStyle.Lock);
            menuAvisos.AddItem(item);
        }
        else {
            menuAvisos.AddItem(new UIMenuItem(colorZona + aviso.tipo + " (" + aviso.idAviso + ")", aviso.mensaje));
        }
    }
    menuAvisos.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false;
    menuAvisos.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            avisoElegido = index;

            if (avisos[avisoElegido] != undefined) {
                aux = true;
                menuAvisos?.Close(true);
                mostrar_avisos_info();
            } else {
                menuAvisos?.Close();
            }
        }
        else {
            menuAvisos?.Close();
        }
    });

    menuAvisos.MenuClose.on(() => {
        if (!aux) {
            if (usadoEnCamaraHeli == true) {
                mp.events.call("camara_heli");
                usadoEnCamaraHeli = false;
            }

            avisos = [];
            avisoElegido = -1;
        }
        menuAvisos = null;
    });
}

// Muestra mas informacion sobre el aviso elegido
function mostrar_avisos_info() {
    let nombreZona = "Desconocida";

    switch (avisos[avisoElegido].zona) {
        case 1:
            nombreZona = "LSPD";
            break;
        case 2:
            nombreZona = "LSSD";
            break;
        default:
            break;
    }

    menuAvisos_info = crearMenu("Avisos", "Opciones del aviso", true);
    menuAvisos_info.AddItem(new UIMenuItem("Atender", "Atiendes el aviso"));
    menuAvisos_info.AddItem(new UIMenuItem("Ruta", "Marca la ruta al aviso"));
    menuAvisos_info.AddItem(new UIMenuItem("Información", "~b~Numero aviso: ~w~" + avisos[avisoElegido].idAviso + "\n~b~Remitente: ~w~" + avisos[avisoElegido].nombreRemitente + "\n~b~Mensaje: ~w~" + avisos[avisoElegido].mensaje + "\n~b~Zona: ~w~" + nombreZona));
    menuAvisos_info.AddItem(new UIMenuItem("Eliminar", "Unicamente miembros de alto rango podran eliminar avisos"));
    menuAvisos_info.AddItem(new UIMenuItem("Quitar ruta", "Quita la marca o checkpoint que puedas tener activo"));
    menuAvisos_info.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAvisos_info.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("avisos_atender", avisos[avisoElegido].idAviso);
                break;
            case 1:
                mp.game.ui.setNewWaypoint(avisos[avisoElegido].ubicacion.x, avisos[avisoElegido].ubicacion.y);
                break;
            case 3:
                mp.events.callRemote("avisos_eliminar", avisos[avisoElegido].idAviso);
                break;
            case 4:
                mp.game.ui.setNewWaypoint(player_local.position.x, player_local.position.y);
                mp.events.call("borrar_ruta");
                break;
            default:
                break;
        }
        menuAvisos_info?.Close(true);
    });

    menuAvisos_info.MenuClose.on(() => {
        avisoElegido = -1;
        mostrar_avisos();
        menuAvisos_info = null;
    });
}

}