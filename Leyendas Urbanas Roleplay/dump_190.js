{
let menuPrincipal;
let menuAnimacionesGuardadas;
let menuOpcionesAnimacion;
let menuNuevaAnimacion;
let menuConfirmacion;
let animaciones = [];
let nombreNuevaAnimacion;
let multipjsNuevaAnimacion;
let descripcionNuevaAnimacion;
let animacionElegida = 0;

mp.events.add("mostrar_animaciones_jugador", (datos) => {
    evento_animaciones_jugador(datos);
})

mp.events.add("recibir_datos_animacion", (nombre, descripcion, unicoPj) => {
    evento_recibir_datos_animacion(nombre, descripcion, unicoPj);
})

function evento_animaciones_jugador(datos){
    menuPrincipal = crearMenu("Mis Animaciones", "Animaciones guardadas");
    animaciones = JSON.parse(datos);

    menuPrincipal.AddItem(new UIMenuItem("Animaciones guardadas", "Muestra tus animaciones guardadas"));
    menuPrincipal.AddItem(new UIMenuItem("Nueva animacion", "Guarda una nueva animacion"));
    menuPrincipal.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuPrincipal.ItemSelect.on((item, index) => {
        switch(index)
        {
            case 0:
                aux = true;
                menuPrincipal?.Close(true);
                mostrar_animaciones_guardadas();
                break;
            case 1:
                menuPrincipal?.Close();
                mp.events.call("animaciones:mostrar");
                break;
            default:
                menuPrincipal?.Close();
                break;
        }
    });

    menuPrincipal.MenuClose.on(() => {
        menuPrincipal = null;
    });
}

function mostrar_animaciones_guardadas(){
    menuAnimacionesGuardadas = crearMenu("Lista Animaciones", "Lista de animaciones guardadas");
    
    for(let i = 0; i < animaciones.length; i++)
    {
        menuAnimacionesGuardadas.AddItem(new UIMenuItem(animaciones[i].nombre, animaciones[i].descripcion));
    }
    menuAnimacionesGuardadas.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuAnimacionesGuardadas.ItemSelect.on((item, index) => {
        if (item.Text == "Cerrar") {
            menuAnimacionesGuardadas?.Close();
        }
        else {
            menuAnimacionesGuardadas?.Close(true);
            animacionElegida = index;
            mostrar_opciones_animacion();
        }
    });

    menuAnimacionesGuardadas.MenuClose.on(() => {
        menuAnimacionesGuardadas = null;
    });
}

function mostrar_opciones_animacion(){

    menuOpcionesAnimacion = crearMenu("Acciones Animación", "Acciones de la animación");
    menuOpcionesAnimacion.AddItem(new UIMenuItem("Reproducir", "Reproduce la animación"));
    menuOpcionesAnimacion.AddItem(new UIMenuItem("Eliminar", "Elimina la animación"));
    menuOpcionesAnimacion.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuOpcionesAnimacion.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                menuOpcionesAnimacion?.Close();
                mp.events.callRemote("escoger_animacion", animaciones[animacionElegida].idAnim);
                break;
            case 1:
                menuOpcionesAnimacion?.Close(true);
                mostrar_menu_confirmar_eliminar();
                break;
            default:
                menuOpcionesAnimacion?.Close();
                break;
        }
    });

    menuOpcionesAnimacion.MenuClose.on(() => {
        menuOpcionesAnimacion = null;
    });
}

function mostrar_menu_confirmar_eliminar(){
    menuConfirmacion = crearMenu("¿Seguro?", "Confirma para eliminar la animación guardada");
    menuConfirmacion.AddItem(new UIMenuItem("Confirmar", "Confirmas y se borra la animación de la lista"));
    menuConfirmacion.AddItem(new UIMenuItem("Cancelar", "Cancelas y no eliminas nada"));

    menuConfirmacion.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                menuConfirmacion?.Close();
                mp.events.callRemote("eliminar_animacion_jugador", animaciones[animacionElegida].id);
                break;
            case 1:
                menuConfirmacion?.Close(true);
                mostrar_opciones_animacion();
                break;
            default:
                break;
        }
    });

    menuConfirmacion.MenuClose.on(() => {
        menuConfirmacion = null;
    });
}

function evento_recibir_datos_animacion(nombre, descripcion, unicoPj){
    nombreNuevaAnimacion = new UIMenuItem("Nombre", "Nombre de la animación");
    nombreNuevaAnimacion.SetRightLabel(nombre);
    descripcionNuevaAnimacion = new UIMenuItem("Descripción", descripcion);
    multipjsNuevaAnimacion = new UIMenuCheckboxItem("Compartir entre personajes", !unicoPj, "Compartir entre todos los personajes o solo el actual");

    menuNuevaAnimacion = crearMenu("Nueva Animacion", "~h~Crea una nueva animacion");

    menuNuevaAnimacion.AddItem(nombreNuevaAnimacion);
    menuNuevaAnimacion.AddItem(descripcionNuevaAnimacion);
    menuNuevaAnimacion.AddItem(multipjsNuevaAnimacion);

    menuNuevaAnimacion.AddItem(new UIMenuItem("Confirmar", "Confirmar la seleccion y crear la animacion"));
    menuNuevaAnimacion.AddItem(new UIMenuItem("Salir", "Salir al menú principal"));

    menuNuevaAnimacion.ItemSelect.on((item, index) => {
        switch (index) {
            case 3:
                animacionElegida = 0;
                menuNuevaAnimacion?.Close();
                mp.events.callRemote("crear_animacion_jugador", nombre, descripcion, unicoPj);
                break;
            case 4:
                menuNuevaAnimacion?.Close(true);
                nombreNueva = "";
                descripcionNueva = "";
                unicoPjNueva = false;
                animacionElegida = 0;
                mostrar_animaciones_guardadas();
                break;
        }
    });

    menuNuevaAnimacion.MenuClose.on(() => {
        menuNuevaAnimacion = null;
    });
}
}