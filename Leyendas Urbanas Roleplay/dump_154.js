{
mp.events.add("mostrar_cartero_federal", function (trabajosRestantes) {
    mostrar_cartero(trabajosRestantes)
});
mp.events.add("trabajar_cartero_federal", function () {
    trabajar_cartero()
});

var menucarterofed = null;
var menuTrabajoCarteroFed = null;

function mostrar_cartero(trabajosRestantes) {

    menucarterofed = crearMenu("Cartero", "Opciones trabajo de Cartero");
    menucarterofed.AddItem(new UIMenuItem("Informacion", "Te quedan ~b~" + trabajosRestantes + " ~w~zonas restantes. Si no acabas toda la ruta serás penalizado."));
    menucarterofed.AddItem(new UIMenuItem("Obtener ruta", "Volver a marcar el punto actual de la ruta."));
    menucarterofed.AddItem(new UIMenuItem("Cancelar ruta", "Cancela tu trabajo actual, no obtendrás ingresos y serás penalizado."));
    menucarterofed.AddItem(new UIMenuItem("Salir", "Cierra este menu."));

    menucarterofed.ItemSelect.on((item, index) => {
        menucarterofed?.Close();
        if (index == 1 || index == 2)
            mp.events.call("cartero:seleccionar_menu", index);
    });

    menucarterofed.MenuClose.on(item => {
        menucarterofed = null;
    });
}

function trabajar_cartero() {
    
    menuTrabajoCarteroFed = crearMenu("Cartero", "Inicia tu trabajo como Cartero");
    menuTrabajoCarteroFed.AddItem(new UIMenuItem("Comenzar a trabajar", "Comienza a trabajar de cartero."));

    menuTrabajoCarteroFed.ItemSelect.on((item, index) => {
        menuTrabajoCarteroFed?.Close();
        menuTrabajoCarteroFed = null;

        if (index == 0)
            mp.events.callRemote("trabajo_cartero_federal");
    });

    menuTrabajoCarteroFed.MenuClose.on(item => {
        menuTrabajoCarteroFed = null;
    });
}
}