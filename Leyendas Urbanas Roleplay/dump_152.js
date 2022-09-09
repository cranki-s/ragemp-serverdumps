{
mp.events.add("mostrar_lavanderia", function (trabajosRestantes) {
    mostrar_lavanderia(trabajosRestantes)
});
mp.events.add("trabajar_lavanderia", function () {
    trabajar_lavanderia()
});

var menuLavanderia = null;
var menuTrabajoLavanderia = null;

function mostrar_lavanderia(trabajosRestantes) {

    menuLavanderia = crearMenu("Lavanderia", "Opciones trabajo de Lavanderia");
    if (trabajosRestantes == -1)
        menuLavanderia.AddItem(new UIMenuItem("Informacion", "Tienes que ir a lavar la ropa en la lavandería."));
    else
        menuLavanderia.AddItem(new UIMenuItem("Informacion", "Te quedan ~b~" + trabajosRestantes + " ~w~zonas restantes. Si no acabas toda la ruta serás penalizado."));
    menuLavanderia.AddItem(new UIMenuItem("Obtener ruta", "Volver a marcar el punto actual de la ruta."));
    menuLavanderia.AddItem(new UIMenuItem("Cancelar ruta", "Cancela tu trabajo actual, no obtendrás ingresos y serás penalizado."));
    menuLavanderia.AddItem(new UIMenuItem("Salir", "Cierra este menu."));

    menuLavanderia.ItemSelect.on((item, index) => {
        menuLavanderia?.Close();

        if (index == 1 || index == 2)
            mp.events.call("lavanderia:seleccionar_menu", index);
    });

    menuLavanderia.MenuClose.on(item => {
        menuLavanderia = null;
    });
}

function trabajar_lavanderia() {

    menuTrabajoLavanderia = crearMenu("Lavanderia", "Inicia tu trabajo como lavandero");
    menuTrabajoLavanderia.AddItem(new UIMenuItem("Comenzar a trabajar", "Comienza a trabajar de lavandero."));

    menuTrabajoLavanderia.ItemSelect.on((item, index) => {
        menuTrabajoLavanderia?.Close();

        if (index == 0)
            mp.events.callRemote("trabajo_lavanderia");
    });

    menuTrabajoLavanderia.MenuClose.on(item => {
        menuTrabajoLavanderia = null;
    });
}
}