{
mp.events.add("mostrar_minero", function (trabajosRestantes) {
    mostrar_minero(trabajosRestantes)
});
mp.events.add("trabajar_minero", function () { trabajar_minero() });

var menuMinero = null;
var menuTrabajoMinero = null;

function mostrar_minero(trabajosRestantes) {

    menuMinero = crearMenu("Minero", "Opciones trabajo de Minero");
    menuMinero.AddItem(new UIMenuItem("Informacion", "Te quedan ~b~" + trabajosRestantes + " ~w~restantes. Cuantos más trabajos realices, más dinero te ingresarán."));
    menuMinero.AddItem(new UIMenuItem("Vehiculo de trabajo", "Marca la posicion de tu vehículo de trabajo."));
    menuMinero.AddItem(new UIMenuItem("Finalizar ruta", "Marca la posición de entrega de los minerales para finalizar tu trabajo y obtener ingresos."));
    menuMinero.AddItem(new UIMenuItem("Cancelar ruta", "Cancela tu trabajo actual, pero no ganarás ingresos."));
    menuMinero.AddItem(new UIMenuItem("Salir", "Cierra este menú."));

    menuMinero.ItemSelect.on((item, index) => {
        menuMinero?.Close();

        if (index > 0 && index < 4)
            mp.events.call("minero:seleccionar_menu", index);
    });

    menuMinero.MenuClose.on(item => {
        menuMinero = null;
    });
}

function trabajar_minero() {

    menuTrabajoMinero = crearMenuConDistancia(4, "Minero", "Inicia tu trabajo como Minero");
    menuTrabajoMinero.AddItem(new UIMenuItem("Comenzar a trabajar", "Comienza a trabajar de minero."));

    menuTrabajoMinero.ItemSelect.on((item, index) => {
        menuTrabajoMinero?.Close();

        if (index == 0)
            mp.events.callRemote("trabajo_minero");
    });

    menuTrabajoMinero.MenuClose.on(item => {
        menu_con_distancia = null;

        menuTrabajoMinero = null;
    });
}
}