{
mp.events.add("mostrar_limpiador", function (trabajosRestantes) {
    mostrar_limpiador(trabajosRestantes)
});
mp.events.add("trabajar_limpiador", function () { trabajar_limpiador() });

var menulimpiador = null;
var menuTrabajolimpiador = null;

function mostrar_limpiador(trabajosRestantes) {

    menulimpiador = crearMenu("Limpiador", "Opciones trabajo de Limpiador");
    menulimpiador.AddItem(new UIMenuItem("Informacion", "Te quedan ~b~" + trabajosRestantes + " ~w~zonas restantes. Si no acabas toda la ruta serás penalizado."));
    menulimpiador.AddItem(new UIMenuItem("Obtener ruta", "Volver a marcar el punto actual de la ruta."));
    menulimpiador.AddItem(new UIMenuItem("Cancelar ruta", "Cancela tu trabajo actual, no obtendrás ingresos y serás penalizado."));
    menulimpiador.AddItem(new UIMenuItem("Salir", "Cierra este menu."));


    menulimpiador.ItemSelect.on((item, index) => {
        menulimpiador?.Close();

        if (index == 1 || index == 2)
            mp.events.call("limpiador:seleccionar_menu", index);
    });

    menulimpiador.MenuClose.on(item => {
        menulimpiador = null;
    });
}

function trabajar_limpiador() {

    menuTrabajolimpiador = crearMenu("Limpiador", "Inicia tu trabajo como Limpiador");
    menuTrabajolimpiador.AddItem(new UIMenuItem("Comenzar a trabajar", "Comienza a trabajar de limpiador."));

    menuTrabajolimpiador.ItemSelect.on((item, index) => {
        menuTrabajolimpiador?.Close();
        menuTrabajolimpiador = null;

        if (index == 0)
            mp.events.callRemote("trabajo_limpiador");
    });

    menuTrabajolimpiador.MenuClose.on(item => {
        menuTrabajolimpiador = null;
    });
}
}