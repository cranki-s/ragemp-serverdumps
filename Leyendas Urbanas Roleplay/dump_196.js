{
let pescaPrincipal;
let pescaVender;
let pescaComprar;
let pescaConfirmacion;
let tipo_pescado;

let stock;
let inventario;

mp.events.add("pesca:mostrar_menu_pesca", (stockPuntoVenta, inventarioVenta) => {
    mostrar_menu_pesca(stockPuntoVenta, inventarioVenta);
})

function mostrar_menu_pesca(stockPuntoVenta = null, inventarioVenta = null) {

    if (stockPuntoVenta != null && inventarioVenta != null) {
        stock = JSON.parse(stockPuntoVenta);
        inventario = JSON.parse(inventarioVenta);
    }
    pescaPrincipal = crearMenu("Pesca", "Punto de venta de pescado");

    pescaPrincipal.AddItem(new UIMenuItem("Vender pescado", "Vende el pescado que hayas conseguido."));
    pescaPrincipal.AddItem(new UIMenuItem("Comprar pescado", "Compra el pescado que hayan vendido."));
    pescaPrincipal.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual."));

    pescaPrincipal.ItemSelect.on((item, index) => {
        pescaPrincipal?.Close();
        switch (index) {
            case 0:
                mostrar_menu_vender();
                break;
            case 1:
                mostrar_menu_comprar();
                break;
            default:
                break;
        }
    });

    pescaPrincipal.MenuClose.on(() => {
        pescaPrincipal = null;
    });

}

function mostrar_menu_vender() {

    pescaVender = crearMenu("Vender pescado", "Vende el pescado que hayas conseguido");

    for (let i = 0; i < inventario.cantidad_grande; i++) {
        let item_pg = new UIMenuItem("Pescado Grande");
        item_pg.SetRightLabel("$" + stock.precio_venta_grande);
        pescaVender.AddItem(item_pg);
    }

    for (let i = 0; i < inventario.cantidad_mediano; i++) {
        let item_pm = new UIMenuItem("Pescado Mediano");
        item_pm.SetRightLabel("$" + stock.precio_venta_mediano);
        pescaVender.AddItem(item_pm);
    }

    for (let i = 0; i < inventario.cantidad_pequeño; i++) {
        let item_pp = new UIMenuItem("Pescado Pequeño");
        item_pp.SetRightLabel("$" + stock.precio_venta_pequeño);
        pescaVender.AddItem(item_pp);
    }

    pescaVender.AddItem(new UIMenuItem("Volver", "Volver al menú principal"));

    pescaVender.ItemSelect.on((item, index) => {
        pescaVender?.Close(true);
        if (item.Text == "Volver") {
            mostrar_menu_pesca();
        } else {
            if (item.Text.includes("Grande")) tipo_pescado = 2;
            else if (item.Text.includes("Mediano")) tipo_pescado = 1;
            else tipo_pescado = 0;
            mostrar_menu_confirmar(tipo_pescado, 1);
        }
    });

    pescaVender.MenuClose.on(() => {
        pescaVender = null;
    });
}

function mostrar_menu_comprar() {
    let descripcion = "Compra el pescado que hayan vendido.";

    if (stock.cantidad_grande <= 0 && stock.cantidad_mediano <= 0 && stock.cantidad_pequeño <= 0) {
        descripcion = "No hay pescado disponible para comprar.";
    }
    pescaComprar = crearMenu("Comprar pescado", descripcion);
    for (let i = 0; i < stock.cantidad_grande; i++) {
        let item_pg = new UIMenuItem("Pescado Grande");
        item_pg.SetRightLabel("$" + stock.precio_compra_grande);
        pescaComprar.AddItem(item_pg);
    }

    for (let i = 0; i < stock.cantidad_mediano; i++) {
        let item_pm = new UIMenuItem("Pescado Mediano");
        item_pm.SetRightLabel("$" + stock.precio_venta_mediano);
        pescaComprar.AddItem(item_pm);
    }

    for (let i = 0; i < stock.cantidad_pequeño; i++) {
        let item_pp = new UIMenuItem("Pescado Pequeño");
        item_pp.SetRightLabel("$" + stock.precio_venta_pequeño);
        pescaComprar.AddItem(item_pp);
    }

    pescaComprar.AddItem(new UIMenuItem("Volver", "Volver al menú principal"));

    pescaComprar.ItemSelect.on((item, index) => {
        pescaComprar?.Close();
        if (item.Text == "Volver") {
            mostrar_menu_pesca();
        } else {
            if (item.Text.includes("Grande")) tipo_pescado = 2;
            else if (item.Text.includes("Mediano")) tipo_pescado = 1;
            else tipo_pescado = 0;
            mostrar_menu_confirmar(tipo_pescado, 0);
        }
    });

    pescaComprar.MenuClose.on(() => {
        pescaComprar = null;
    });
}

function mostrar_menu_confirmar(tipo_pescado, accion) {
    pescaConfirmacion = crearMenu("¿Confirmar?", "~h~Confirma la acción");
    pescaConfirmacion.AddItem(new UIMenuItem("Sí", "Confirmar la" + (accion == 1 ? " venta " : " compra " + "del pescado.")));
    pescaConfirmacion.AddItem(new UIMenuItem("No", "Volver atrás"));
    pescaConfirmacion.ItemSelect.on((item, index) => {
        pescaConfirmacion?.Close();
        switch (index) {
            case 0:
                let opcion = (item.Description.includes("venta") ? 1 : 0);
                mp.events.callRemote("pesca:opcion_menu", opcion, tipo_pescado);
                break;
            case 1:
                mostrar_menu_pesca();
            break;
        }
    });

    pescaConfirmacion.MenuClose.on(() => {
        pescaConfirmacion = null;
    });
}

}