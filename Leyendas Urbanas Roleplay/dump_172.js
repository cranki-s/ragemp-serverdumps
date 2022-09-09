{
let menuPed = null;
let menuFaccion = null;
let menuCompraPed = null;
let menuColocarPed = null;

mp.events.add("faccion:mostrar_menu_faccion", (puedeTraficar, hayPedActivo, puedeControlarPed) => {
    mostrar_menu_faccion(puedeTraficar, hayPedActivo, puedeControlarPed);
})

mp.events.add("faccion:menu_colocar_ped", (listaPeds, puedeCrearMas) => {
    listaPeds = typeof listaPeds === 'string' ? JSON.parse(listaPeds) : listaPeds;
    mostrar_menu_colocar_ped(listaPeds, puedeCrearMas);
})

mp.events.add("faccion:mostrar_menu_ped", (inventario, dinero, idPed) => {
    mostrar_menu_ped(inventario, dinero, idPed);
})

mp.events.add("faccion:mostrar_menu_compra_ped", (stock, idPed) => {
    mostrar_menu_compra_ped(stock, idPed);
})

function mostrar_menu_compra_ped(stock, idPed) {
    let infoStock = JSON.parse(stock);
    if (infoStock.length <= 0) {
        mostrarAviso("danger", 5000, "El ped no tiene productos a la venta");
        return;
    }

    menuCompraPed = crearMenuConDistancia(4, "Comprar", "Selecciona lo que quieres comprar");
    for (let i = 0, n = infoStock.length; i < n; i++) {
        let stock = infoStock[i];
        if (stock.cantidad <= 0) {
            let botObj = aplicarColores(new UIMenuItem(stock.nombreObjeto, ""), "Rojo");
            botObj.SetRightLabel(stock.precio + " $");
            menuCompraPed.AddItem(botObj);
        }
        else {
            let botObj = new UIMenuItem(stock.nombreObjeto + " (x" + stock.cantidad + ")", "");
            botObj.SetRightLabel(stock.precio + " ~g~$");
            menuCompraPed.AddItem(botObj);
        }
    }
    menuCompraPed.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuCompraPed.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuCompraPed?.Close();
        }
        else {
            menuCompraPed?.Close();
            mp.events.callRemote("faccion:comprar_obj_ped", idPed, infoStock[index].idObjeto, infoStock[index].precio);
        }
    });

    menuCompraPed.MenuClose.on(() => {
        menu_con_distancia = null;

        menuCompraPed = null;
    });
}

function mostrar_menu_colocar_ped(listaPeds, puedeCrearMas) {
    menuColocarPed = crearMenu("Traficantes", "Colocar o crear traficantes");

    let itemCrearNuevo = new UIMenuItem("Crear nuevo", "Crea un nuevo traficante en tu posicion actual.");

    if (!puedeCrearMas) {
        itemCrearNuevo.SetRightBadge(BadgeStyle.Lock);
        itemCrearNuevo.Description = "Ya has creado todos los traficantes disponibles para tu facción. Puedes comprar más slots en el manager.";
    }

    menuColocarPed.AddItem(itemCrearNuevo);

    for (let i = 0; i < listaPeds.length; i++) {
        const p = listaPeds[i];

        if (!p.activo) {
            menuColocarPed.AddItem(new UIMenuItem("Traficante #" + p.SQLID, "Selecciona esta opción para activar este traficante."));
        }
    }

    menuColocarPed.ItemSelect.on((item, idx) => {
        menuColocarPed?.Close();
        if (item.Text.includes("Traficante")) {
            let tId = item.Text.split("Traficante #")[1].trim();
            mp.events.callRemote("faccion:colocar_ped", parseInt(tId));
        } else {
            if (puedeCrearMas)
                mp.events.callRemote("faccion:crear_ped");
        }
    });

    menuColocarPed.MenuClose.on(() => {
        menuColocarPed = null;
    });
}

function mostrar_menu_faccion(puedeTraficar, hayPedActivo, puedeControlarPed){
    let idPed = -1;
    let faccionJug = faccion;
    for (const pedId in peds_facciones) {
        const ped = peds_facciones[pedId];
        if (ped.faccion_id == faccionJug) {
            if (calcDist(player_local.position, ped.posicion) <= 2.0) {
                idPed = ped.SQLID;
                break;
            }
        }
    }

    menuFaccion = crearMenu("Menú Facción", "Opciones de la facción");

    if (puedeControlarPed) {
        if(idPed >= 0) menuFaccion.AddItem(new UIMenuItem("Retirar camello", "Retira el ped mas cercano a tu posicion."));
        else menuFaccion.AddItem(new UIMenuItem("Colocar camello", "Coloca un ped disponible en tu posicion."));
    }

    if (puedeTraficar)
        menuFaccion.AddItem(new UIMenuItem("Traficar", "Selecciona tus items para pedir el traficar."));

    menuFaccion.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual."));

    menuFaccion.ItemSelect.on((item, index) => {
        menuFaccion?.Close();
        switch (index) {
            case 0:
                if (idPed >= 0) mp.events.callRemote("faccion:retirar_ped", idPed);
                else mp.events.callRemote("faccion:menu_colocar_ped");
                // else mp.events.callRemote("faccion:colocar_ped");
                break;
            case 1:
            case 2:
                break;
            default:
                break;
        }
    });

    menuFaccion.MenuClose.on(() => {
        menuFaccion = null;
    });
}

function mostrar_menu_ped(inventario, dinero, idPed){

    menuPed = crearMenu("Menú Camello", "Opciones del ped camello");

    menuPed.AddItem(new UIMenuItem("Inventario", "Muestra el inventario de droga que podrá vender."));
    menuPed.AddItem(new UIMenuItem("Retirar camello", "Retira al ped de su posicion, debes estar cerca."));
    let dineroItem = new UIMenuItem("Reclamar dinero", "Recoge el dinero que tiene el ped.");
    dineroItem.SetRightLabel(dinero + " ~g~$");
    menuPed.AddItem(dineroItem);
    menuPed.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual."));

    menuPed.ItemSelect.on((item, index) => {
        menuPed?.Close();
        switch (index) {
            case 0:
                mp.events.call("inventario:mostrar_ped", idPed, inventario);
                break;
            case 1:
                mp.events.callRemote("faccion:retirar_ped", idPed);
                break;
            case 2:
                mp.events.callRemote("faccion:dinero_ped", idPed);
                break;
            default:
                break;
        }
    });

    menuPed.MenuClose.on(() => {
        menuPed = null;
    });
}
}