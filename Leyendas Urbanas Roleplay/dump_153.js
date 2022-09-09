{
mp.events.add("mostrar_jardinero", function (trabajosRestantes) {
    mostrar_jardinero(trabajosRestantes)
});
mp.events.add("trabajar_jardinero", function () {
    trabajar_jardinero()
});

var menujardinero = null;
var menuTrabajoJardinero = null;

function mostrar_jardinero(trabajosRestantes) {

    menujardinero = crearMenu("Jardinero", "Opciones trabajo de Jardinero");
    menujardinero.AddItem(new UIMenuItem("Informacion", "Te quedan ~b~" + trabajosRestantes + " ~w~zonas restantes. Si no acabas toda la ruta serás penalizado."));
    menujardinero.AddItem(new UIMenuItem("Obtener ruta", "Volver a marcar el punto actual de la ruta."));
    menujardinero.AddItem(new UIMenuItem("Cancelar ruta", "Cancela tu trabajo actual, no obtendrás ingresos y serás penalizado."));
    menujardinero.AddItem(new UIMenuItem("Salir", "Cierra este menu."));


    menujardinero.ItemSelect.on((item, index) => {
        menujardinero?.Close();
        menujardinero = null;

        if (index == 1 || index == 2)
            mp.events.call("jardinero:seleccionar_menu", index);
    });

    menujardinero.MenuClose.on(item => {
        menujardinero = null;
    });
}

function trabajar_jardinero() {

    menuTrabajoJardinero = crearMenu("Jardinero", "Inicia tu trabajo como Jardinero");
    menuTrabajoJardinero.AddItem(new UIMenuItem("Comenzar a trabajar", "Comienza a trabajar de jardinero."));


    menuTrabajoJardinero.ItemSelect.on((item, index) => {
        menuTrabajoJardinero?.Close();

        if (index == 0)
            mp.events.callRemote("trabajo_jardineria");
    });

    menuTrabajoJardinero.MenuClose.on(item => {
        menuTrabajoJardinero = null;
    });
}
}