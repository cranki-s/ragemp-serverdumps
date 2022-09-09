{
﻿/*
 * Descripcion: Contiene el menú de emisoras y radios
 */

let emisora_propiedad = false;
let emisora_negocio = false;
let emisora_vehiculo = false;
let emisora_staff = false;

let propietario_prop = false;
let propietario_neg = false;
let es_staff = false;
let staff = false;
let posicion_staff = new mp.Vector3(0.0, 0.0, 0.0);

let navegadorRadio = null;

let emisorasLista = []; // list jsonEmisora
let infoEmisoras = []; // list int

let emisora = null;
let emisoras = null;

// Eventos menus
mp.events.add("mostrar_emisoras", function (staff, args) {
    es_staff = staff;
    emisorasLista = JSON.parse(args);
    mostrar_emisoras();
});

mp.events.add("mostrar_radio", function (staff, prop, neg) {
    es_staff = staff;
    propietario_prop = prop;
    propietario_neg = neg;

    mostrar_radio();
});

// Eventos radio
mp.events.add("reproducir_radio", function (url) {
    reproducirRadio(url);
    emisora_propiedad = false;
    staff = false;
    emisora_negocio = false;
});

mp.events.add("reproducir_radio_admin", function (url, posicion = null) {
    reproducirRadioAdmin(url, 1);
    emisora_propiedad = false;
    staff = true;
    emisora_negocio = false;
    if (posicion != null) posicion_staff = posicion;
});

mp.events.add("reproducir_radio_prop", function (url) {
    reproducirRadio(url);
    emisora_propiedad = true;
    staff = false;
    emisora_negocio = false;
});

mp.events.add("reproducir_radio_neg", function (url) {
    reproducirRadio(url);
    emisora_propiedad = false;
    staff = false;
    emisora_negocio = true;
});

mp.events.add("cerrar_radio", function () {
    cerrarRadio();
    emisora_propiedad = false;
    staff = false;
    emisora_negocio = false;
});

mp.events.add("cerrar_radio_prop", function () {
    borrarRadio();
    emisora_propiedad = false;
    staff = false;
    emisora_negocio = false;
});

mp.events.add("cerrar_radio_neg", function () {
    borrarRadio();
    emisora_negocio = false;
    emisora_propiedad = false;
    staff = false;
});

mp.events.add("cerrar_radio_admin", function () {
    borrarFestival();
    staff = false;
    emisora_propiedad = false;
    emisora_negocio = false;
});

// Funcion para mostrar el menu de emisoras
function mostrar_emisoras() {
    if (emisorasLista == null || emisorasLista.length <= 0) {
        mostrarAviso("danger", 4000, "Error al cargar las emisoras");
        return;
    }

    if (staff == true && es_staff == false) {
        mostrarAviso("danger", 6000, "Estás escuchando una emisora puesta por el staff, debes salir del lugar para poder reproducir una tuya");
        return;
    }

    if (es_staff) {
        emisoras = crearMenu("Emisoras", "~o~[STAFF] ~w~Emisoras disponibles");
    }
    else {
        emisoras = crearMenu("Emisoras", "Emisoras disponibles");
    }

    infoEmisoras = [];
    for (let i = 0, n = emisorasLista.length; i < n; i++) {
        let emi = emisorasLista[i];
        emisoras.AddItem(new UIMenuItem(emi.nombre, ""));
        infoEmisoras.push(emi.id);
    }
    emisoras.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    emisoras.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            if (es_staff) {
                mp.events.callRemote("reproducir_emisora_admin", infoEmisoras[index]);
            }
            else {
                mp.events.callRemote("reproducir_emisoras", infoEmisoras[index]);
            }
        }

        emisoras?.Close();
    });

    emisoras.MenuClose.on(() => {
        emisoras = null;
    });
}

// Funcion para mostrar el menu de radio
function mostrar_radio() {
    if (es_staff) {
        emisora = crearMenu("Emisora", "~o~[STAFF] ~w~Opciones de la radio");
    }
    else {
        emisora = crearMenu("Emisora", "Opciones de la radio");
    }

    if (staff) {
        emisora.AddItem(new UIMenuItem("Subir volumen", "Sube el volumen del festival."));
        emisora.AddItem(new UIMenuItem("Bajar volumen", "Baja el volumen del festival."));
        if (es_staff) {
            emisora.AddItem(aplicarColores(new UIMenuItem("[STAFF] ~s~~h~Finalizar festival", "Cierra el festival actual para TODOS los usuarios."), "Naranja"));
        }
    }
    else {
        emisora.AddItem(new UIMenuItem("Reproducir", "Inicia la reproduccion de la radio"));
        emisora.AddItem(new UIMenuItem("Parar", "Para la reproduccion de la radio"));
        emisora.AddItem(new UIMenuItem("Subir volumen", "Sube el volumen de la radio"));
        emisora.AddItem(new UIMenuItem("Bajar volumen", "Baja el volumen de la radio"));
        emisora.AddItem(new UIMenuItem("Cerrar radio", "Cierra la reproduccion de la radio actual para todos los usuarios."));
    }
    emisora.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    emisora.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            switch (index) {
                case 0:
                    if (staff) {
                        subirvolumenRadio(0.1);
                    } else {
                        mp.events.call("radio:resumir");
                    }
                    break;
                case 1:
                    if (staff) {
                        bajarvolumenRadio(0.1);
                    } else {
                        mp.events.call("radio:stop");
                    }
                    break;
                case 2:
                    if (es_staff && staff) {
                        mp.events.callRemote("cerrar_emisora_admin", index);
                    } else {
                        subirvolumenRadio(0.1);
                    }
                    break;
                case 3:
                    bajarvolumenRadio(0.1);
                    break;
                case 4:
                    if (propietario_prop) {
                        mp.events.callRemote("cerrar_emisora_prop", index);
                    }
                    if (propietario_neg) {
                        mp.events.callRemote("cerrar_emisora_neg", index);
                    }
                    if (es_staff) {
                        mp.events.callRemote("cerrar_emisora_admin", index);
                    }

                    mp.events.call("radio:stop");
                    emisora?.Close();
                    break;
                default:
                    emisora?.Close();
                    break;
            }
        }
        else {
            emisora?.Close();
        }
    });

    emisora.MenuClose.on(() => {
        emisora = null;
    });
}

// Recibe string url
function reproducirRadio(url) {
    if (navegadorRadio != null) {
        mp.events.call("radio:stop");
        navegadorRadio = null;
    }

    navegadorRadio = true;

    mostrarAviso("info", 4500, "Puedes controlar el volumen de esta emisora con el comando / emisora");
    mp.events.call("variable_emisora_escogida", true);

    playRadioVol(url, 0.5);
}

// Recibe string url y double vol
function reproducirRadioAdmin(url, vol)
{
    if (navegadorRadio != null) {
        mp.events.call("festival:stop")
        navegadorRadio = null;
    }

    navegadorRadio = true;

    mostrarAviso("info", 4500, "Puedes controlar el volumen de este festival de manera local con el comando /emisora");

    playFestivalVol(url, 0.5);
}

function cerrarRadio() {
    if (navegadorRadio != null) {
        if (emisora_propiedad == true && propietario_prop == false) {
            mostrarAviso("danger", 4500, "La emisora solamente puede cerrarla el propietario de la propiedad");
            return;
        }

        if (emisora_negocio == true && propietario_neg == false) {
            mostrarAviso("danger", 4500, "La emisora solamente puede cerrarla el propietario del negocio");
            return;
        }

        if (emisora_vehiculo == true) {
            mostrarAviso("danger", 4500, "La emisora solamente puede cerrarla el propietario del vehículo");
            return;
        }

        if (staff == true) {
            mostrarAviso("danger", 4500, "La emisora solamente puede cerrarla alguien del Staff");
            return;
        }

        borrarRadio();
    }
}

function borrarRadio()
{
    if (navegadorRadio != null) {
        mp.events.call("radio:stop");
        navegadorRadio = null;
    }
}

function borrarFestival()
{
    if (navegadorRadio != null) {
        mp.events.call("festival:stop");
        navegadorRadio = null;
    }
}

// Recibe double volumen
function subirvolumenRadio(volumen)
{
    if (navegadorRadio != null) {
        if (staff) {
            mp.events.call("radio:volumen", 2, true, volumen);
        } else {
            mp.events.call("radio:volumen", 1, true, volumen);
        }
    }
}

// Recibe double volumen
function bajarvolumenRadio(volumen)
{
    if (navegadorRadio != null) {
        if (staff) {
            mp.events.call("radio:volumen", 2, false, volumen);
        } else {
            mp.events.call("radio:volumen", 1, false, volumen);
        }
    }
}

// Recibe string url y double vol
function playRadioVol(url, vol)
{
    if (navegadorRadio != null) {
        mp.events.call("radio:play", url, vol);
    }
}

// Recibe string url y double vol
function playFestivalVol(url, vol)
{
    if (navegadorRadio != null) {
        mp.events.call("festival:play", url, vol);
    }
}

/* Equivalente a TICK de C#
mp.events.add("render", function () {
    if (navegadorRadio != null)
    {
        if (staff)
        {
            if(posicion_staff != null) {
                //mp.events.call("festival:posicionarUsuario", player_local.position); // NO ACTIVAR - EN DESARROLLO Y NO FUNCIONA AUN
            }
        }
    }
});*/


/*mp.events.add("iniciarRadio", function () {
    iniciarRadio();
});

mp.events.add("pararRadio", function () {
    pararRadio();
});

// Aparentemente no tiene uso, no es llamado ni desde cliente ni desde sv
mp.events.add("subirvolumenRadio", function () {
    subirvolumenRadio(0.5);
});

// Aparentemente no tiene uso, no es llamado ni desde cliente ni desde sv
mp.events.add("bajarvolumenRadio", function () {
    bajarvolumenRadio(0.5);
});

// Aparentemente no tiene uso, no es llamado ni desde cliente ni desde sv
mp.events.add("cerrarRadio", function () {
    mp.events.call("variable_emisora_escogida", false);
    cerrarRadio();
});

function iniciarRadio()
{
    if (navegadorRadio != null) {
        navegadorRadio.execute('radio:play();');
    }
}

function pararRadio()
{
    if (navegadorRadio != null) {
        if (staff == true) {
            mostrarAviso("info", 5000, "Estás en un festival, no puedes pausar la reproducción. Utiliza 'Bajar volumen' para dejar de escuchar el festival.");
            return;
        }
        navegadorRadio.execute('radio:stop();');
    }
}*/

/* Evento sin uso, referencias comentadas SV-SIDE
mp.events.add("posicion_radio_admin", function (posicion) {
    mp.events.call("festival:posicionarEmisora", posicion.x, posicion.y, posicion.z);
});*/
}