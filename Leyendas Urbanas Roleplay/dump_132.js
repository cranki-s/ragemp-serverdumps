{
mp.events.add("mostrar_hoteles", function (negocio_id, nombre, garaje, estaGaraje, habitaciones) {
    evento_mostrar_hoteles(negocio_id, nombre, garaje, estaGaraje, habitaciones);
});
let menuHoteles = null;

let negocioID = 0;
let habitaciones_array;
let nombreHotel;
let garajeHoteles;
let propiedadElegida;
let habitaciones_json;
let estaEnGarajeHo;
let jugadorID;

function evento_mostrar_hoteles(negocio_id, nombre, garaje, estaGaraje, habitaciones) {
    nombreHotel = nombre;
    garajeHoteles = garaje;
    estaEnGarajeHo = estaGaraje;
    habitaciones_json = habitaciones;
    habitaciones_array = JSON.parse(habitaciones);
    negocioID = negocio_id;

    menuHoteles = crearMenu("Hotel", nombreHotel);
    
    for (let i = 0; i < habitaciones_array.length; i++) {
        menuHoteles.AddItem(new UIMenuItem(habitaciones_array[i].nombre, ""));
    }

    if(garajeHoteles)
    {
        if(estaGaraje)
            menuHoteles.AddItem(new UIMenuItem("Entrada hotel", "Acceso a la entrada principal del hotel"));
        else
            menuHoteles.AddItem(new UIMenuItem("Garaje", "Acceso al garaje del hotel"));
    }
    
    menuHoteles.ItemSelect.on((item, index) => {
        propiedadElegida = index;

        if(index + 1 > habitaciones_array.length)
        {
            menuHoteles?.Close();
            mp.events.callRemote('garaje_hotel', negocioID);
        }
        else
        {
            menuHoteles?.Close(true);
            evento_mostrar_hoteles_opciones();
        }
    });

    menuHoteles.MenuClose.on(item => {
        menuHoteles = null;
    });
}

function evento_mostrar_hoteles_opciones() {

    menuHotelesOpciones = crearMenu("Hotel", nombreHotel);
    
    menuHotelesOpciones.AddItem(new UIMenuItem("Entrar", ""));
    if(habitaciones_array[propiedadElegida].tienellave) {
        menuHotelesOpciones.AddItem(new UIMenuItem("Abrir", ""));
        menuHotelesOpciones.AddItem(new UIMenuItem("Cerrar", ""));
    }
    if(habitaciones_array[propiedadElegida].venta) {
        var opcionMenu = new UIMenuItem("Alquilar", "");
        opcionMenu.SetRightLabel("~g~$" + habitaciones_array[propiedadElegida].precio);
        menuHotelesOpciones.AddItem(opcionMenu);
    }
    if(habitaciones_array[propiedadElegida].propietario) {
        var opcionMenu = new UIMenuItem("Dejar habitación", "");
        opcionMenu.SetRightLabel("~g~$" + habitaciones_array[propiedadElegida].precio);
        menuHotelesOpciones.AddItem(opcionMenu);
    }  

    menuHotelesOpciones.ItemSelect.on((item, index) => {
        if(index == 0)
        {
            menuHotelesOpciones.setVisible(false);
            menuHotelesOpciones = null;
            mp.events.callRemote('entrar_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
            return;
        }
        if(index == 1)
        {
            if(habitaciones_array[propiedadElegida].tienellave) {
                menuHotelesOpciones.setVisible(false);
                menuHotelesOpciones = null;
                mp.events.callRemote('abrir_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
                return;
            }
            if(habitaciones_array[propiedadElegida].venta) {
                menuHotelesOpciones.setVisible(false);
                menuHotelesOpciones = null;
                mp.events.callRemote('comprar_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
                return;
            }
        }
        if(index == 2)
        {
            if(habitaciones_array[propiedadElegida].tienellave) {
                menuHotelesOpciones.setVisible(false);
                menuHotelesOpciones = null;
                mp.events.callRemote('cerrar_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
                return;
            }
            if(habitaciones_array[propiedadElegida].tienellave) {
                menuHotelesOpciones.setVisible(false);
                menuHotelesOpciones = null;
                mp.events.callRemote('vender_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
                return;
            }
        }
        if(index == 3)
        {
            if(habitaciones_array[propiedadElegida].tienellave) {
                menuHotelesOpciones.setVisible(false);
                menuHotelesOpciones = null;
                mp.events.callRemote('vender_habitacion', negocioID, habitaciones_array[propiedadElegida].llave);
                return;
            }
        }
    });

    menuHotelesOpciones.MenuClose.on(item => {
        evento_mostrar_hoteles(negocioID, nombreHotel, garajeHoteles, estaEnGarajeHo, habitaciones_json);
        menuHotelesOpciones = null;
    });
}

}