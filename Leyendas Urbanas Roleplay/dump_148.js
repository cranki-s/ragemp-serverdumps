{
mp.events.add("mostrar_cartero", function (zona, total, ganancias) {
    evento_mostrar_cartero(zona, total, ganancias)
});
mp.events.add("trabajar_cartero", function () {
    evento_trabajar_cartero()
});
mp.events.add("trabajando_cartero", function (id) {
    if (id == 1)
        en_Trabajo_Cartero = true;
    if (id == 0) {
        en_Trabajo_Cartero = false;
        mp.events.call('borrar_marcador');
    }
});

let menuCartero = null;
let menuTrabajoCartero = null;
var en_Trabajo_Cartero = false;

function evento_mostrar_cartero(zona, total, ganancias) {

    menuCartero = crearMenu("Cartero", "Trabajo cartero opciones disponibles");
    menuCartero.AddItem(new UIMenuItem("Sacar paquete", "Sacas el paquete del vehículo."));
    menuCartero.AddItem(new UIMenuItem("Meter paquete", "Metes el paquete en el vehículo."));
    menuCartero.AddItem(new UIMenuItem("Entregar paquete", "Entregas el paquete a su dueño."));
    menuCartero.AddItem(new UIMenuItem("Fin", "Termina tu trabajo y recibe las ganancias que has acumulado."));
    menuCartero.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer."));
    menuCartero.AddItem(new UIMenuItem("Mi reparto", "Información de tu trabajo:\n~b~Zona: ~w~" + zona + "\n~b~Total: ~w~" + total + "\n~b~Ganancias: ~g~" + ganancias));

    menuCartero.ItemSelect.on((item, index) => {
        menuCartero?.Close();
        if (index != 5)
            mp.events.callRemote("menu_cartero", index);
    });

    menuCartero.MenuClose.on(item => {
        menuCartero = null;
    });
}

function evento_trabajar_cartero() {

    menuTrabajoCartero = crearMenuConDistancia(4, "Cartero", "Trabajo cartero opciones disponibles");
    menuTrabajoCartero.AddItem(new UIMenuItem("Distancia corta", "Repartos de distancia corta"));
    menuTrabajoCartero.AddItem(new UIMenuItem("Distancia media", "Repartos de distancia media"));
    menuTrabajoCartero.AddItem(new UIMenuItem("Distancia larga", "Repartos de distancia larga"));


    menuTrabajoCartero.ItemSelect.on((item, index) => {
        menuTrabajoCartero?.Close();

        if (index < 3)
            mp.events.callRemote("trabajo_cartero", index);
    });

    menuTrabajoCartero.MenuClose.on(item => {
        menu_con_distancia = null;
        menuTrabajoCartero = null;
    });
}
}