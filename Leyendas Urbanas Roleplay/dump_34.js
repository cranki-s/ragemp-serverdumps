{
/* --------------------------------------------------------------------------------
 * telefono.js
 *
 * Autor: Doomer
 *
 * Descripción: Controlador del teléfono (CEF y transferencia de información entre
 * cliente-servidor)
 *
 * -------------------------------------------------------------------------------- */
// var global_telefono = require('/LURP/global');
var cef_telefono = require("./LURP/cef.js");

var telefono_cefId = -1;
var telefono = false;
// Registramos los eventos del cliente

var intervalo_timbre_llamada = null;
var intervalo_hora = null;

mp.events.add({
    // Evento disparado cuando un jugador quiere bloquear su chat
    "chat": function (parametro) {
        //if (navegador != null) {
            mp.gui.chat.activate(parametro);
        //}
    },
    // Evento disparado cuando un jugador quiere usar el teléfono
    "mostrar_telefono": function (parametro, numeroTelefono) { // Falta por añadir Negocios
        if (telefono_cefId < 0) {
            // Creamos el navegador y mostramos el teléfono
            telefono_cefId = cef_telefono.crearCef("package://LURP/cef/telefono/telefono.html", {
                puedeCerrar: true,
                mostrarCursor: true,
                sumarNumeroCefs: true
            });
            // global_telefono.abrirCef("package://LURP/cef/telefono/telefono.html", 0, false);
            telefono = true;
            if (parametro == true) {
                mp.gui.cursor.visible = true;
            }
            else {
                mp.gui.cursor.visible = false;
            }
            mp.game.audio.playSoundFrontend(-1, "Menu_Accept", "Phone_SoundSet_Default", true);

            if (numeroTelefono != undefined) {
                cef_telefono.ejecutarCef(telefono_cefId, `establecerNumero('`+numeroTelefono+`')`);
                // global_telefono.enviaraCef(`establecerNumero('`+numeroTelefono+`')`);
            }
            
            cef_telefono.ejecutarCef(telefono_cefId, `actualizar_tiempo('`+temperatura+`')`);
            // global_telefono.enviaraCef(`actualizar_tiempo('`+temperatura+`')`);

            actualizarHoraTelefono();

            if (intervalo_hora != null && intervalo_hora != undefined) {
                clearInterval(intervalo_hora);
            }
            intervalo_hora = setInterval(actualizarHoraTelefono, 30000); // Con 1 minuto hay demasiada diferencia de hora


            // Enviamos los negocios al teléfono para dibujarlos
            for (let i = 0, n = negocios.length; i < n; i++) {
                
                if (negocios[i].tipo == 13) {
                    cef_telefono.ejecutarCef(telefono_cefId, "agregarNegocio('" + negocios[i].nombre + "', '" + negocios[i].llave + "')"); 
                }
                
            }
            
            cef_telefono.ejecutarCef(telefono_cefId, "cargarApikey('" + /*global_telefono.*/apiKey + "', '" + _k + "')");
            cef_telefono.ejecutarCef(telefono_cefId, "cargarContactos()");
            cef_telefono.ejecutarCef(telefono_cefId, "openWs('" + wsBranch + "')");
            // global_telefono.enviaraCef("cargarApikey('" + global_telefono.apiKey + "')"); // global.js
            // global_telefono.enviaraCef("cargarContactos()"); // global.js
            // global_telefono.enviaraCef("cargarPjid('" + personaje_id + "')"); //global.js
        }
    },
    // Evento disparado cuando el jugador quiere cerrar el teléfono
    "cerrar_telefono": function () {
        logInfo("DEBUG TLF", "Cierre 1");
        cerrarTelefono();
    },
    // Evento disparado cuando el jugador quiere habilitar el cursor del teléfono
    "telefono_cursor": function () {
        // if (navegador != null) {
            if (telefono_cefId >= 0) {
                mp.gui.cursor.visible = true;
                mp.gui.chat.show(true);
            }
        // }
    },
    // Evento disparado cuando el jugador quiere ver sus SMS
    "mostrar_sms": function (array) {
        // if (navegador != null) {
        if (telefono_cefId >= 0) {
            var sms_array = JSON.parse(array);
            for (var i = 0; i < sms_array.length; i += 2) {
                cef_telefono.ejecutarCef(telefono_cefId, "agregarSms('" + sms_array[i] + "','" + sms_array[i + 1] + "')");
                // global_telefono.enviaraCef("agregarSms('" + sms_array[i] + "','" + sms_array[i + 1] + "')");
            }
            // Al acabar mostramos los SMS
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarMenuSms()");
            // global_telefono.enviaraCef("mostrarMenuSms()");
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver sus llamadas perdidas
    "mostrar_llamadas_perdidas": function (array) {
        // if (navegador != null) {
        if (telefono_cefId >= 0) {
            var llamadas_array = JSON.parse(array);
            for (var i = 0; i < llamadas_array.length; i += 2) {
                cef_telefono.ejecutarCef(telefono_cefId, "agregarLlamadaPerdida('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
                // global_telefono.enviaraCef("agregarLlamadaPerdida('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
            }   
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver sus llamadas realizadas
    "mostrar_llamadas_realizadas": function (array) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            var llamadas_array = JSON.parse(array);
            for (var i = 0; i < llamadas_array.length; i += 2) {
                cef_telefono.ejecutarCef(telefono_cefId, "agregarLlamadaRealizada('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
                // global_telefono.enviaraCef("agregarLlamadaRealizada('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
            }
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver sus llamadas recibidas
    "mostrar_llamadas_recibidas": function (array) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            var llamadas_array = JSON.parse(array);
            for (var i = 0; i < llamadas_array.length; i += 2) {
                cef_telefono.ejecutarCef(telefono_cefId, "agregarLlamadaRecibida('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
                // global_telefono.enviaraCef("agregarLlamadaRecibida('" + llamadas_array[i] + "','" + llamadas_array[i + 1] + "')");
            }
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver la información de una llamada
    "mostrar_info_llamada": function (idContacto, contacto, fecha) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarInfoLlamada('" + idContacto + "','" + contacto + "','" + fecha + "')");
        }
            // global_telefono.enviaraCef("mostrarInfoLlamada('" + idContacto + "','" + contacto + "','" + fecha + "')");
        // }
    },
    // Evento disparado cuando el jugador quiere ver sus contactos
    "mostrar_contactos": function (array) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            var contactos_array = JSON.parse(array);
            for (var i = 0; i < contactos_array.length; i += 2) {
                cef_telefono.ejecutarCef(telefono_cefId, `agregarContacto('` + contactos_array[i] + `','` + contactos_array[i + 1] + `')`);
                // global_telefono.enviaraCef(`agregarContacto('` + contactos_array[i] + `','` + contactos_array[i + 1] + `')`);
            }
            // Al acabar mostramos los SMS
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarMenuContactos()");
            // global_telefono.enviaraCef("mostrarMenuContactos()");
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver un SMS enviado
    "mostrar_mensaje_env": function (array) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            var sms_array = JSON.parse(array);
            cef_telefono.ejecutarCef(telefono_cefId, `mostrarMensajeEnviado('` + sms_array[0] + `','` + JSON.stringify(sms_array[1]).replace(new RegExp('"', 'g'), "") + `','` + sms_array[2] + "', '"+sms_array[3]+"')");
            // global_telefono.enviaraCef(`mostrarMensajeEnviado('` + sms_array[0] + `','` + JSON.stringify(sms_array[1]).replace(new RegExp('"', 'g'), "") + `','` + sms_array[2] + "', '"+sms_array[3]+"')");   
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver un SMS recibido
    "mostrar_mensaje_rec": function (array) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            var sms_array = JSON.parse(array);
            cef_telefono.ejecutarCef(telefono_cefId, `mostrarMensajeRecibido('` + sms_array[0] + `','` + JSON.stringify(sms_array[1]).replace(new RegExp('"', 'g'), "") + `','` + sms_array[2] + `','`+sms_array[3]+`')`);
            // global_telefono.enviaraCef(`mostrarMensajeRecibido('` + sms_array[0] + `','` + JSON.stringify(sms_array[1]).replace(new RegExp('"', 'g'), "") + `','` + sms_array[2] + `','`+sms_array[3]+`')`);   
        }
        // }
    },
    // Evento disparado cuando el jugador quiere ver la información de un contacto
    "mostrar_contacto": function (nombre, telefono, bloqueado) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, `mostrarInfoContacto('` + nombre + `','` + telefono + "', '"+ bloqueado +"')");
        }
            // global_telefono.enviaraCef(`mostrarInfoContacto('` + nombre + `','` + telefono + "', '"+ bloqueado +"')");
        // }
    },
    // Evento disparado cuando llega una actualización del tiempo actual (del juego)
    // El argumento 1 es el dia y mes actual
    // El argumento 2 es la hora
    "act_tiempo": function (fecha, hora) {
        // if (navegador !== null && telefono) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "establecerFechaHora('" + fecha + "','" + hora + "')");
        }
            // global_telefono.enviaraCef("establecerFechaHora('" + fecha + "','" + hora + "')");
        // }
    },
    // Evento que al ser disparado muestra el menú principal del teléfono
    "telefono_menu_principal": function () {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarMenuPrincipal()");
            // global_telefono.enviaraCef("mostrarMenuPrincipal()");
            mp.game.audio.stopSound(1);
        }
        // }
    },
    // Evento que al ser disparado muestra la interfaz de una llamada en curso (proceso de llamada)
    // El argumento es el nombre del contacto o número
    "llamada_encurso_llamando": function (parametro) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarLlamadaEnCursoLlamando('" + parametro + "')");
        }
            // global_telefono.enviaraCef("mostrarLlamadaEnCursoLlamando('" + parametro + "')");
            //API.startMusic("cliente/cef/telefono/media/llamada.mp3", true);
        // }
    },
    // Evento que al ser disparado muestra la interfaz de una llamada en curso (llamada entrante)
    // El argumento es el nombre del contacto o número	
    "llamada_encurso_entrante": function (parametro) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarLlamadaEnCursoEntrante('" + parametro + "')");

            if (intervalo_timbre_llamada != null && intervalo_timbre_llamada != undefined) {
                mp.events.call("sound:cancel");
                clearInterval(intervalo_timbre_llamada);
            }
            intervalo_timbre_llamada = setInterval(() => {
                mp.events.call("sound:play", "0x16D20687", false);
                //mp.game.audio.playSoundFrontend(1, "Hack_Success", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", true);
            }, 3600);
        }
            // global_telefono.enviaraCef("mostrarLlamadaEnCursoEntrante('" + parametro + "')");

        // }
    },
    // Evento que al ser disparado muestra la interfaz de una llamada en curso (en llamada ya)
    // El argumento es el nombre del contacto o número	
    "llamada_encurso_enllamada": function (parametro) {
        // if (navegador !== null) {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, "mostrarLlamadaEnCursoEnLlamada('" + parametro + "')");

            if (intervalo_timbre_llamada != null && intervalo_timbre_llamada != undefined) {
                mp.events.call("sound:cancel");
                clearInterval(intervalo_timbre_llamada);
                intervalo_timbre_llamada = null;
            }
        }
            // global_telefono.enviaraCef("mostrarLlamadaEnCursoEnLlamada('" + parametro + "')");
            //mp.game.audio.stopSound(1);
        // }
    },
    // Evento que al ser disparado activa el sonido del tono de llamada
    // "activar_tono_espera": function () {
    //     //mp.game.audio.playSoundFrontend(1, "dial_and_remote_ring", "Phone_SoundSet_Default", true);
    // },
    // // Evento que al ser disparado activa el sonido del tono de llamada
    // "activar_tono_llamada": function () {
    //     //mp.game.audio.playSoundFrontend(1, "remote_engaged", "Phone_SoundSet_Default", true);
    // },
    // // Evento que al ser disparado activa el sonido del tono de llamada (Doom)
    // "activar_tono_llamada2": function () {
    //     //API.startMusic("cliente/cef/telefono/media/tono2.mp3", true);
    // },
    // Evento que al ser disparado activa el sonido del tono de llamada
    "activar_tono_sms": function () {
        mp.game.audio.playSoundFrontend(1, "text_arrive_tone", "Phone_SoundSet_Default", true);
    },
    "tel:enc:bloqCont": (iv,  en) => {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, `enviarBloquearContacto('${iv}', '${en}')`);
        }
    },
    "tel:enc:editCont": (iv, en) => {
        if (telefono_cefId >= 0) {
            cef_telefono.ejecutarCef(telefono_cefId, `enviarEditarContacto('${iv}', '${en}')`);
        }
    }
});
// Al pulsar la tecla Escape ocultamos el cursor del teléfono
mp.keys.bind(0x1B, false, function () {
    //if(global_telefono.menuAbierto) return;
    // if (navegador != null && telefono) {
        if (telefono_cefId >= 0) {
            mp.gui.cursor.visible = false;
        }
        // global_telefono.CerrarCef();
    // }
});

function cerrarTelefono() {
    logInfo("DEBUG TLF", "Cierre 2-1: " + telefono);
    if (telefono == true) {
        telefono = false;

        let estaNadandoOBuceando = false;
        if (player_local.isSwimming() || player_local.isSwimmingUnderWater()) estaNadandoOBuceando = true; // Comprobamos si está nadando o buceando, y como lo esté ponemos la variable en true para luego desde el servidor evitar hacer varias cosas 

        mp.game.audio.stopSound(-1);

        mp.events.callRemote('cerrar_telefono', estaNadandoOBuceando);

        if (intervalo_timbre_llamada != null && intervalo_timbre_llamada != undefined) {
            mp.events.call("sound:cancel");
            clearInterval(intervalo_timbre_llamada);
            intervalo_timbre_llamada = null;
        }
        if (intervalo_hora != null && intervalo_hora != undefined) {
            clearInterval(intervalo_hora);
            intervalo_hora = null;
        }
        mp.game.audio.playSoundFrontend(-1, "Put_Away", "Phone_SoundSet_Michael", true);

        if (telefono_cefId >= 0) {
            cef_telefono.cerrarCef(telefono_cefId);
            telefono_cefId = -1;
        }

        logInfo("DEBUG TLF", "Cierre 2-2");
    }
}

// Evento disparado cuando se pide un taxi desde el móvil
mp.events.add("pedirTaxi", (mensaje_conductor) => {
    mp.events.callRemote("pedir_taxi", mensaje_conductor);
});

//Evento disparado cuando pides un mecanico desde el telefono
mp.events.add("pedirMecanico", (mensaje_mecanico) => {
    mp.events.callRemote("llamar_grua", 0, mensaje_mecanico);
});

// Evento disparado cuando se solicita el servicio de un negocio
mp.events.add("solicitarNegocio", (id, mensaje) => {
    mp.events.callRemote("solicitar_negocio", id, mensaje);
});

function actualizarHoraTelefono() {
    let hora_reloj = date_gta;
    if (hora_reloj) {
        hora_reloj.setHours(parseInt(date_gta.getHours()) - 1);
        cef_telefono.ejecutarCef(telefono_cefId, `establecerHora('`+hora_reloj.getHours()+":"+(hora_reloj.getMinutes() < 10 ? '0' : '') + hora_reloj.getMinutes()+`')`);
    }
    // global_telefono.enviaraCef(`establecerHora('`+hora_reloj.getHours()+":"+(hora_reloj.getMinutes() < 10 ? '0' : '') + hora_reloj.getMinutes()+`')`);
}

// Eventos de bloquear contactos del teléfono
// mp.events.add({
//     "bloquearContacto": (contacto_sqlid) => {
//         mp.events.callRemote("bloquear_contacto", contacto_sqlid);
//     },
//     "bloquear_contacto_resultado": (resultado) => {
//         global_telefono.enviaraCef("bloquearContactoResultado('" + resultado + "')");
//     }
// });

mp.events.add("enviarUbicacion", (nombreContacto) => {
    mp.events.callRemote("enviar_ubicacion", nombreContacto);
});

mp.events.add("mostrarUbicacion", (posx, posy) => {
    mp.events.call("mostrar_waypoint", new mp.Vector3(posx, posy, 1));
    mostrarAvisoMinimapa("telefono", "Teléfono", "Ubicación", "La ubicación se ha cargado en el mapa de tu teléfono");
    let parpadeo = setInterval(() => {
        mp.game.invoke("0xF2DD778C22B15BDA");
    }, 300);

    setTimeout(() => {
        clearInterval(parpadeo);
    }, 1000);
});

mp.events.add("obtenerCalle", (posx, posy) => {
    var position = new mp.Vector3(posx, posy, 1);
    var getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
    let zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
    let calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
    puntoCardinal = obtenerPuntoCardinal();
    if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName)
        calle += " / " + mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad);
    
    cef_telefono.ejecutarCef(telefono_cefId, "mostrarCalle('"+calle+"','"+zona+"')");
    // global_telefono.enviaraCef("mostrarCalle('"+calle+"','"+zona+"')");
});

mp.events.add("centralita:finalizarLlamada_ocupados", () => {
    mp.events.call("sound:play", "ocupados", () => {
        cef_telefono.ejecutarCef(telefono_cefId, `if (enLlamada911 && servicioSolicitado != null) { enLlamada911 = false; servicioSolicitado == null; }`);
        // global_telefono.enviaraCef(`if (enLlamada911 && servicioSolicitado != null) { enLlamada911 = false; servicioSolicitado == null; }`);
    });
});

mp.events.add({
    "llamar911": (parametro, numeroTelefono, negocios) => {
        //if (navegador == null) {
            // Creamos el navegador y mostramos el teléfono
        if (telefono_cefId < 0) {
                telefono_cefId = cef_telefono.crearCef("package://LURP/cef/telefono/telefono.html", {
                    puedeCerrar: true,
                    mostrarCursor: false
                });
            //}
            // global_telefono.abrirCef("package://LURP/cef/telefono/telefono.html", 0, false);
            telefono = true;
            if (parametro == true) {
                mp.gui.cursor.visible = true;
            }
            else {
                mp.gui.cursor.visible = false;
            }
            mp.game.audio.playSoundFrontend(-1, "Menu_Accept", "Phone_SoundSet_Default", true);

            if (numeroTelefono != undefined) {
                cef_telefono.ejecutarCef(telefono_cefId, `establecerNumero('`+numeroTelefono+`')`);
                // global_telefono.enviaraCef(`establecerNumero('`+numeroTelefono+`')`);
            }
            
            cef_telefono.ejecutarCef(telefono_cefId, `actualizar_tiempo('`+temperatura+`')`);
            // global_telefono.enviaraCef(`actualizar_tiempo('`+temperatura+`')`);

            actualizarHoraTelefono();

            if (intervalo_hora != null && intervalo_hora != undefined) {
                clearInterval(intervalo_hora);
            }
            intervalo_hora = setInterval(actualizarHoraTelefono, 30000); // Con 1 minuto hay demasiada diferencia de hora

            // Enviamos los negocios al teléfono para dibujarlos
            if(negocios != undefined)
            {  
                var negocios_array = JSON.parse(negocios);
                if(negocios_array.length > 0)
                {
                    for (let i = 0; i < negocios_array.length; i += 2) {
                        cef_telefono.ejecutarCef(telefono_cefId, "agregarNegocio('" + negocios_array[i] + "', '" + negocios_array[i + 1] + "')");
                        // global_telefono.enviaraCef("agregarNegocio('" + negocios_array[i] + "', '" + negocios_array[i + 1] + "')");
                    }
                }
            }

            cef_telefono.ejecutarCef(telefono_cefId, "llamar911()");
            // global_telefono.enviaraCef("llamar911()");
        }
    },
    "centralita:llamar911": (servicio) => {
        var position = mp.players.local.position;
        var getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        // Ya que el job de paramedicos es el 16
        if(servicio == 4){
            servicio = 16;
        }
        let json = {
            servicio: servicio,
            zona: zona,
            calle: calle,
        };
    
        mp.events.callRemote('llamar911', JSON.stringify(json));
    },
    "finalizarLlamada_ocupados": () => {
        setTimeout(() => {
            mp.events.call("sound:play", "ocupados", () => {
                cef_telefono.ejecutarCef(telefono_cefId, `if (enLlamada911 && servicioSolicitado != null) { enLlamada911 = false; servicioSolicitado = null; }`);
                // global_telefono.enviaraCef(`if (enLlamada911 && servicioSolicitado != null) { enLlamada911 = false; servicioSolicitado = null; }`);
            });
        }, 6000);
    },
    "centralita:mostrarPd": (num, x, y) => {
        cef_telefono.ejecutarCef(telefono_cefId, "cargarCentralitaPd('" + num + "','" + x + "','" + y + "')");
        // global_telefono.enviaraCef("cargarCentralitaPd('" + num + "','" + x + "','" + y + "')");
    },
    "centralita:registrarAviso": (tipo) => {
        mp.events.callRemote("centralita:registrarAviso", tipo);
    }
});

// Función que pide la información de los SMS enviados
mp.events.add('mostrarSmsEnviados', function () {
    mp.events.callRemote("mostrar_sms_env");
});
// Función que pide la información de los SMS recibidos
mp.events.add('mostrarSmsRecibidos', function () {
    mp.events.callRemote("mostrar_sms_rec");
});
// Función que pide la información de un mensaje
mp.events.add('mostrarMensaje', function (sqlid) {
    mp.events.callRemote("mostrar_mensaje", sqlid);
});
// Función que envía la información del mensaje a enviar al servidor
mp.events.add('enviarSms', function (destinatario, texto) {
    mp.events.callRemote("enviar_sms", destinatario, texto);
});
// Función que envía la información del mensaje a borrar al servidor
mp.events.add('borrarSms', function (id) {
    mp.events.callRemote("borrar_sms", id);
});
// Función que pide la lista de contactos
mp.events.add('mostrarContactos', function () {
    mp.events.callRemote("mostrar_contactos");
});
// Función que le avisa al servidor que el teléfono del jugador ha cargado (la interfaz)
mp.events.add('telefonoCargado', function () {
    mp.events.callRemote("telefono_cargado");
});
// Función que crea un contacto en la agenda de un jugador
mp.events.add('crearContacto', function (contacto, numero) {
    mp.events.callRemote("crear_contacto", contacto, numero);
});
// Función que borrar un contacto de la agenda del jugador
mp.events.add('borrarContacto', function (id) {
    mp.events.callRemote("borrar_contacto", id);
});
// Pide la información de un contacto en concreto para mostrársela al jugador
mp.events.add('mostrarContacto', function (id) {
    mp.events.callRemote("mostrar_contacto", id);
});
// Edita la información de un contacto
mp.events.add('editarContacto', function (id, nombre, telefono) {
    mp.events.callRemote("editar_contacto", id, nombre, telefono);
});
// Pide la información de las llamadas perdidas
mp.events.add('mostrarLlamadasPerdidas', function () {
    mp.events.callRemote("mostrar_llamadas_perdidas");
});
// Pide la información de las llamadas recibidas
mp.events.add('mostrarLlamadasRecibidas', function () {
    mp.events.callRemote("mostrar_llamadas_recibidas");
});
// Pide la información de las llamadas realizadas
mp.events.add('mostrarLlamadasRealizadas', function () {
    mp.events.callRemote("mostrar_llamadas_realizadas");
});
// Muestra la información de una llamada
mp.events.add('mostrarLlamada', function (id) {
    mp.events.callRemote("mostrar_info_llamada", id);
});
// Borra una llamada
mp.events.add('borrarLlamada', function (id) {
    mp.events.callRemote("borrar_llamada", id);
});
// Realiza una llamada
mp.events.add('realizarLlamada', function (contacto) {
    mp.events.callRemote("realizar_llamada", contacto);
});
// Cuelga una llamadaz
mp.events.add('colgarLlamada', function () {
    if (intervalo_timbre_llamada != null && intervalo_timbre_llamada != undefined) {
        mp.events.call("sound:cancel");
        clearInterval(intervalo_timbre_llamada);
        intervalo_timbre_llamada = null;
    }
    mp.events.callRemote("colgar_llamada");
});
// Contesta una llamada
mp.events.add('contestarLlamada', function () {
    mp.events.callRemote("contestar_llamada");
});
// Activa / desactiva el altavoz del teléfono
mp.events.add('telefonoAltavoz', function () {
    mp.events.callRemote("telefono_altavoz");
});
// Activa / desactiva el modo vibración del teléfono
mp.events.add('tlfModoVibracion', function () {
    mp.events.callRemote("telefono_vibracion");
});
// Activa / desactiva el modo silencio del teléfono
mp.events.add('tlfModoSilencio', function () {
    mp.events.callRemote("telefono_silencio");
});
// Apaga el teléfono
mp.events.add('tlfApagar', function () {
    mp.events.callRemote("telefono_apagar");
    cerrarTelefono();
});
// Reproduce un sonido
mp.events.add('reproducirSonido', function (nombre, set) {
    mp.game.audio.playSoundFrontend(-1, nombre, set, true);
});

var activarTelefono = function () {
    if (telefono_cefId < 0 && !telefono) {
        logInfo("DEBUG TLF", "Activado");
        mp.events.callRemote("mostrar_telefono");
    }
    else {
        logInfo("DEBUG TLF", "Activado - Contestar");
        mp.events.call("contestarLlamada");
    }
};

mp.events.add('render', function () {
    if (mp.game.controls.isControlPressed(0, 172)) { //INPUT_CELLPHONE_UP
        if (!mp.game.controls.isControlJustPressed(0, 172))return;
        if (estaChatAbierto) return;
        if (menuAbierto) return;
        if (campoTiroActivo) return;
        if (player_local.getHealth() <= 10) return;
        if (mp.game.invoke("0xB0034A223497FFCB")) return;
        if (estaMuerto) return;
        if (pesca_iniciada) return; // Durante la pesca no permitimos abrir el telefono
        if (encapuchar) return;
        if (temporero_enEscenario) return;
        if (federal_enTrabajoJardinero) return;
        if (federal_enTrabajoCartero) return;
        if (bloqueado) return;
        if (arrastrado || arrastrando || enmaletero) return;
        if (cantidad_cefs > 0 && !telefono) return;

        if (setFloodboton(1000, "FB42") == false) return;

        activarTelefono();
    }
    if (mp.game.controls.isControlReleased(0, 173)) { //INPUT_CELLPHONE_DOWN
        if (!mp.game.controls.isControlJustReleased(0, 173))return;
        if (estaChatAbierto) return;
        if (mp.game.invoke("0xB0034A223497FFCB")) return;
        if (estaMuerto) return;
        if (encapuchar) return;

        if (telefono_cefId >= 0 && telefono) {
            if (setFloodboton(1000, "FB43") == false) return;

            cerrarTelefono();
        }
    }
});

// Flecha hacia abajo para cerrar el telefono
mp.keys.bind(0x28, false, () => {
    if (!mp.gui.cursor.visible) return; // Solo queremos que funcione cuando el render no lo hace, osea con el cursor activo en pantalla
    if (estaChatAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaMuerto) return;
    if (encapuchar) return;

    if (telefono_cefId >= 0 && telefono) {
        if (setFloodboton(1000, "FB50") == false) return;

        cerrarTelefono();
    }
});

}