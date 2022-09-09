{
/*
    vending.js
    Autor: noyzxc

    Descripción: Contiene el menú de las máquinas de vending
*/
let menu_vending = null;
// Eventos menús
mp.events.add("mostrar_menu_vending", function (obj) {
    mostrar_menu_vending(obj);
});

// Función para mostrar el menú de jugador
function mostrar_menu_vending(obj) {
    menu_vending = crearMenuConDistancia(4, "Expendedora", "");
    let objetos = JSON.parse(obj);
    objetos.forEach(obj => {
        menuVendingItem = new UIMenuItem("" + obj.nombreObjeto + "");
        menuVendingItem.SetRightLabel("" + obj.precio + " ~g~$");
        menu_vending.AddItem(menuVendingItem);
    });
    menu_vending.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menu_vending.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("comprar_vending_machine", objetos[index].idObjeto, objetos[index].precio);
        }

        menu_vending?.Close();
    });

    menu_vending.MenuClose.on(() => {
        menu_con_distancia = null;
        menu_vending = null;
    });
}

}