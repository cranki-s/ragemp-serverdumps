{
﻿/*
 * Descripcion: Contiene el menú de repartos de camionero
*/

let idRepartos = [];
let repartos = [];
let idNegocios = [];

let menuRepartos_Principal = null;
let menuRepartos = null;
let menuRepartosNegocio = null;
let menuSeleccionNegocio = null;

// Eventos menus
mp.events.add("mostrar_repartos_camionero", function () {
    if (menuAbierto == false) mostrar_repartos_camionero();
});

mp.events.add("mostrar_repartos_negocio", function (args) {
    if (menuAbierto == false) mostrar_repartos_negocio(args);
});

mp.events.add("lista_repartos_camionero", function (args) {
    lista_repartos_camionero(args);
});

// Funcion para mostrar el menu de seleccion de tipo de reparto
function mostrar_repartos_camionero() {

    menuRepartos_Principal = crearMenuConDistancia(4, "Repartos", "Repartos disponibles");
    menuRepartos_Principal.AddItem(new UIMenuItem("Distribuidoras", "Repartos a negocios particulares"));
    menuRepartos_Principal.AddItem(new UIMenuItem("Fabricas", "Contratos de las fábricas de mercancías"));
    menuRepartos_Principal.AddItem(new UIMenuItem("Productoras", "Rutas de reparto estatales a fábricas productoras de materia prima"));
    let opcNegocios = null; 
    if (negociosJug && negociosJug.length > 0){
        opcNegocios = new UIMenuItem("Mis negocios", "Repartos disponibles de los negocios a los que tienes acceso");
    }
    else{
        opcNegocios = aplicarColores(new UIMenuItem("Mis negocios", "Repartos disponibles de los negocios a los que tienes acceso"), "Gris");
        opcNegocios.SetRightBadge(BadgeStyle.Lock);
    }
    menuRepartos_Principal.AddItem(opcNegocios);
    menuRepartos_Principal.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    let aux = false; // Define si se abre otro menu
    menuRepartos_Principal.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrarRepartos(3);
                break;
            case 1:
                mostrarRepartos(2);
                break;
            case 2:
                mostrarRepartos(1);
                break;
            case 3:
                if (negociosJug && negociosJug.length > 0){
                    cargarRepartosNegocios();
                    menuRepartos_Principal.setVisible(false, true);
                    menuRepartos_Principal = null;
                }
                else{
                    menuRepartos_Principal?.Close();
                }
                return;
            default:
                menuRepartos_Principal?.Close();
                return;
        }

        menuRepartos_Principal.setVisible(false, true);
        menuRepartos_Principal = null;
    });

    menuRepartos_Principal.MenuClose.on(() => {
        menu_con_distancia = null;
        repartos = [];
        idRepartos = [];
        menuRepartos_Principal = null;
    });
}

// Funcion para mostrar los repartos disponibles de un negocio
function mostrar_repartos_negocio(args) {

    menuRepartosNegocio = crearMenuConDistancia(4, "Repartos", "Repartos del negocio disponibles");

    let array = JSON.parse(args);

    idRepartos = [];
    let auxIndex = 0;
    for (let i = 0, n = array.length; i < n; i++) {
        idRepartos.push(array[i].id);

        let nombreRecogida = array[i].nombreRecogida;
        let nombreDestino = array[i].nombreDestino;
        let nombreProducto = array[i].nombreProducto;
        let cantidadProducto = array[i].cantidadMercancia;
        let ganancias = array[i].ganancias;
        let distancia = array[i].distancia;

        menuRepartosNegocio.AddItem(new UIMenuItem(nombreRecogida, "~b~Origen: ~w~" + nombreRecogida + "\n~b~Destino: ~w~" + nombreDestino + "\n~b~Producto: ~w~" + nombreProducto + "\n~b~Cantidad: ~w~" + cantidadProducto + " uds.\n~b~Distancia: ~w~" + distancia + " mts.\n~b~Ganancias: ~g~$" + ganancias));
        auxIndex++;
    }

    menuRepartosNegocio.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuRepartosNegocio.ItemSelect.on((item, index) => {
        if (idRepartos.length > 0 && auxIndex != index) {
            mp.events.callRemote("escoger_reparto_camionero", idRepartos[index]);
        }

        idRepartos = [];
        repartos = [];
        menuRepartosNegocio?.Close();
    });

    menuRepartosNegocio.MenuClose.on(() => {
        menu_con_distancia = null;
        idRepartos = [];
        repartos = [];
        menuRepartosNegocio = null;
    });
}

// Funcion para cargar la lista de repartos disponibles
function lista_repartos_camionero(args) {
    let array = JSON.parse(args);

    for (let i = 0, n = array.length; i < n; i++) {
        repartos.push({ id: array[i].id, nombreRecogida: array[i].nombreRecogida, nombreDestino: array[i].nombreDestino, nombreProducto: array[i].nombreProducto, cantidadMercancia: array[i].cantidadMercancia, ganancias: array[i].ganancias, distancia: array[i].distancia, tipo: array[i].tipo });
    }
}

// Funcion para mostrar los repartos disponibles de un tipo
function mostrarRepartos(tipo) {
    menuRepartos = crearMenuConDistancia(4, "Repartos", "Repartos disponibles");

    idRepartos = [];
    let notificar = true;
    let auxIndex = 0;
    for (let i = 0, n = repartos.length; i < n; i += 8) {
        if (repartos[i].tipo == tipo) {
            idRepartos.push(repartos[i].id);

            let nombreRecogida = repartos[i].nombreRecogida;
            let nombreDestino = repartos[i].nombreDestino;
            let nombreProducto = repartos[i].nombreProducto;
            let cantidadProducto = repartos[i].cantidadMercancia;
            let ganancias = repartos[i].ganancias;
            let distancia = repartos[i].distancia;

            menuRepartos.AddItem(new UIMenuItem(nombreRecogida, "~b~Origen: ~w~" + nombreRecogida + "\n~b~Destino: ~w~" + nombreDestino + "\n~b~Producto: ~w~" + nombreProducto + " (" + cantidadProducto + " uds.)\n~b~Distancia: ~w~" + distancia + " mts\n~b~Ganancias: ~g~$" + ganancias));
            notificar = false;
            auxIndex++;
        }
    }

    if (notificar) {
        menuRepartos.AddItem(new UIMenuItem("No tenemos ningun reparto disponible", "Todos nuestros repartos estan en ruta o no tienes la habilidad suficiente, vuelve a mirar pasado un tiempo"));
    }
    else {
        menuRepartos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));
    }

    menuRepartos.ItemSelect.on((item, index) => {
        if (idRepartos.length > 0 && auxIndex != index) { // Si hay lista de repartos y no ha seleccionado las opciones finales como volver
            mp.events.callRemote("escoger_reparto_camionero", idRepartos[index]);
            idRepartos = [];
            repartos = [];
            menuRepartos?.Close();
        }
        else {
            menuRepartos?.Close(true);
            mostrar_repartos_camionero();
        }
    });

    menuRepartos.MenuClose.on(() => {
        menu_con_distancia = null;
        menuRepartos = null;
    });
}

function cargarRepartosNegocios() {
    menuSeleccionNegocio = crearMenuConDistancia(4, "Repartos", "Negocios disponibles");

    idNegocios = [];
    let auxIndex = 0;
    if (negociosJug && negociosJug.length > 0){
        for(let i = 0, n = negociosJug.length; i < n; i++){
            for(let j = 0, m = negocios.length; j < m; j++){
                if (negocios[j] && negocios[j].llave == negociosJug[i]){
                    menuSeleccionNegocio.AddItem(new UIMenuItem(""+negocios[j].nombre, "Repartos disponibles del negocio " + negociosJug[i]));
                    idNegocios.push(negociosJug[i]);
                    auxIndex++;
                    break;
                }
            }
        }
    }
    else{
        menuSeleccionNegocio.AddItem(aplicarColores(new UIMenuItem("No hay negocios disponibles"), "Rojo"));
    }
    menuSeleccionNegocio.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuSeleccionNegocio.ItemSelect.on((item, index) => {
        if (item.Text == "Volver"){
            menuSeleccionNegocio?.Close(true);
            mostrar_repartos_camionero();
        }
        else{
            if (idNegocios.length > 0 && auxIndex != index) { // Si hay lista de repartos y no ha seleccionado las opciones finales como volver
                mp.events.callRemote("escoger_negocio_camionero", idNegocios[index]);
                menuSeleccionNegocio?.Close();
                idNegocios = [];
                repartos = [];
            }
            else{
                menuSeleccionNegocio?.Close(true);
                mostrar_repartos_camionero();
            }
        }
    });

    menuSeleccionNegocio.MenuClose.on(() => {
        menu_con_distancia = null;
        menuSeleccionNegocio = null;
    });
}

}