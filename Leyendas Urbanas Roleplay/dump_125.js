{
/*

    vehiculo.js

    Autor: Dries

    Descripción: Contiene el menú para las opciones del vehículo

*/
var tipo_vehiculo = -1;

var menu_vehiculo = null;
var menu_vehiculo_velocidad = null;

var limitadoresVelocidad = {};

var tieneEmisoraActiva = false;
var cruiseEnabled = false;
var cruiseSpeed = 0;

var menu_vehiculo_item_alpr = { Text: "", Description: "", RightLabel: "", }; // Variable para tener sincronizado en el menu si se activa o desactiva el ALPR (Basicamente por si 2 personas tienen abierto el menu de la K y uno desactiva el ALPR, que se le actualice al otro)

mp.events.add("mostrar_menu_coche", function () {
    mostrar_menu_coche();
});

mp.events.add("variable_emisora_escogida", (estado) => {
    tieneEmisoraActiva = estado;
});

function obtenerMaletero() {
    if (player_local.vehicle) { // Si está en un vehículo
        if (player_local.vehicle.propiedades != undefined) {
            let puertasJson = player_local.vehicle.propiedades.puertas;
            if (puertasJson != undefined) {
                if (puertasJson[2] == 2 || puertasJson[2] == 3) return true;
            }
        }
    }

    return false;
}

function esConductor(jugador) {
    if (jugador.vehicle) {
        return jugador.vehicle.getPedInSeat(-1) == jugador.handle;
    } else {
        return false;
    }
}

// Función para mostrar el menú principal
function mostrar_menu_coche() {

    menu_vehiculo = crearMenu("Vehículo", "Opciones del vehículo");

    var menu_vehiculo_item_motor;
    let estadoMotor = -1;
    if (player_local.vehicle != undefined) {
        if (player_local.vehicle.propiedades != undefined) {
            estadoMotor = player_local.vehicle.propiedades.motor;
        }
    }
    if (estadoMotor != -1) {
        if (estadoMotor) {
            menu_vehiculo_item_motor = new UIMenuItem("Apagar motor", "Enciende o apaga el motor del vehículo");
        } else {
            menu_vehiculo_item_motor = new UIMenuItem("Encender motor", "Enciende o apaga el motor del vehículo");
        }

        menu_vehiculo_item_motor.RightLabel = estadoMotor ? "~g~Encendido" : "~r~Apagado";
    }
    menu_vehiculo.AddItem(menu_vehiculo_item_motor);

    let puedeUsarALPR = false;
    if (player_local.vehicle != undefined)
    {
        if (player_local.vehicle.propiedades != undefined)
        {
            let trabajosDelVehiculo = player_local.vehicle.propiedades.trabajos;
            if (trabajosDelVehiculo.length > 0)
            {
                if ((trabajosDelVehiculo).includes(1) || (trabajosDelVehiculo).includes(2) || (trabajosDelVehiculo).includes(25))
                {
                    puedeUsarALPR = true;
                }
            }
        }
    }
    if (puedeUsarALPR)
    {
        if (player_local.vehicle != undefined)
        {
            if (player_local.vehicle.propiedades != undefined)
            {
                // Si no está en el asiento de piloto o copiloto, no le permitiremos activar o desactivar el ALPR
                if (player_local.vehicle.getPedInSeat(-1) != player_local.handle && player_local.vehicle.getPedInSeat(0) != player_local.handle)
                {
                    menu_vehiculo_item_alpr = aplicarColores(new UIMenuItem("Activar ALPR", "Solo puedes interactuar con el ALPR desde el asiento del piloto y/o copiloto"), "Rojo");
                    menu_vehiculo_item_alpr.SetRightBadge(BadgeStyle.Lock);
                    menu_vehiculo.AddItem(menu_vehiculo_item_alpr);
                }
                else
                {
                    let clase = player_local.vehicle.getClass();
                    if (clase == 16 || clase == 15 || clase == 14 || clase == 13 || clase == 8 || array_vehiculos_mod.includes(player_local.vehicle.model)) // No se permitirá usar ALPR en: Aviones, Helicopteros, Barcos, Bicicletas y Motocicletas
                    {
                        menu_vehiculo_item_alpr = aplicarColores(new UIMenuItem("Activar ALPR", "Este vehículo no tiene ALPR"), "Rojo");
                        menu_vehiculo_item_alpr.SetRightBadge(BadgeStyle.Lock);
                        menu_vehiculo.AddItem(menu_vehiculo_item_alpr);
                    }
                    else {
                        if (player_local.vehicle.propiedades.alpr) {
                            menu_vehiculo_item_alpr = new UIMenuItem("Desactivar ALPR", "Desactiva el ALPR del vehículo");
                        }
                        else {
                            menu_vehiculo_item_alpr = new UIMenuItem("Activar ALPR", "Activa el ALPR del vehículo");
                        }
                        menu_vehiculo_item_alpr.RightLabel= player_local.vehicle.propiedades.alpr ? "~g~Activado" : "~r~Desactivado";
                        menu_vehiculo.AddItem(menu_vehiculo_item_alpr);
                    }
                }
            }
        }    
    }

    var menu_vehiculo_item_conducir;
    var asiento = null;
    if (player_local.vehicle != undefined) {
        if (player_local.vehicle.isSeatFree(-1) == 1 && player_local.vehicle.getPedInSeat(0) == player_local.handle) {
            // Copiloto -> conductor
            menu_vehiculo_item_conducir = new UIMenuItem("Cambia al asiento de conductor", "Cambia del asiento de copiloto al asiento de conductor");
            asiento = -1;
        }
        else {
            menu_vehiculo_item_conducir = aplicarColores(new UIMenuItem("Cambia al asiento de conductor", "Cambia del asiento de copiloto al asiento de conductor"), "Gris");
            menu_vehiculo_item_conducir.SetRightBadge(BadgeStyle.Lock);
        }
    }
    else {
        menu_vehiculo_item_conducir = aplicarColores(new UIMenuItem("Cambia al asiento de conductor", "Cambia del asiento de copiloto al asiento de conductor"), "Gris");
        menu_vehiculo_item_conducir.SetRightBadge(BadgeStyle.Lock);
    }
    menu_vehiculo.AddItem(menu_vehiculo_item_conducir);

    if (cinturon)
        menu_vehiculo.AddItem(new UIMenuItem("Quitar cinturón de seguridad", "Coloca o quita el cinturón de seguridad"))
    else
        menu_vehiculo.AddItem(new UIMenuItem("Colocar cinturón de seguridad", "Coloca o quita el cinturón de seguridad"))
    menu_vehiculo.AddItem(new UIMenuItem("Abrir / Cerrar puertas", "Abre o cierra las puertas del vehículo"));

    let menu_vehiculo_item_limitador = new UIMenuItem("Establecer límite de velocidad", "Establece el límite de velocidad del vehículo");
    //menu_vehiculo_item_limitador.Enabled = false;

    menu_vehiculo.AddItem(menu_vehiculo_item_limitador);
    menu_vehiculo.AddItem(new UIMenuItem("Abrir maletero", "Abre el maletero desde el asiento"));
    menu_vehiculo.AddItem(new UIMenuItem("Abrir guantera", "Abre la guantera desde los asientos de delante"));
    menu_vehiculo.AddItem(new UIMenuItem("Abrir / Cerrar ventanillas", "Abre o cierra las ventanillas del vehículo"));

    menu_vehiculo.AddItem(new UIMenuItem("Emisoras", "Abre el menú de emisoras"));
    
    
    // Comprobaciones para añadir el piloto automático como última opción del menú
    if (player_local.vehicle !== undefined && player_local.vehicle != null) {
        if (esConductor(player_local)) { // Si no es el conductor no le enseñamos el piloto automatico
            for (let i = 0; i < array_vehiculos.length; i++) {
                if (array_vehiculos[i] == player_local.vehicle.model) {
                    tipo_vehiculo = 0;
                    if (autoPilotActivatedVeh == false)
                        menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Piloto automático vehículo", "Enciende el piloto automático del vehículo."), "Verde"));
                    else
                        menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Piloto automático vehículo", "Apaga el piloto automático del vehículo."), "Rojo"));
                    break;
                }
            }

            for (let i = 0; i < array_aeronaves.length; i++) {
                if (array_aeronaves[i] == player_local.vehicle.model) {
                    tipo_vehiculo = 1;
                    if (autoPilotActivated == false)
                        menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Piloto automático aeronave", "Enciende el piloto automático de la aeronave."), "Verde"));
                    else
                        menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Piloto automático aeronave", "Apaga el piloto automático de la aeronave."), "Rojo"));
                    break;
                }
            }

            let clase = player_local.vehicle.getClass();
            if (clase != 8 && clase != 9 && clase != 11 && clase != 13 && clase != 14 && clase != 15 && clase != 16 && clase != 21) {
                if (!cruiseEnabled) {
                    menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Modo crucero", "Activa el modo crucero del vehículo."), "Verde"));
                } else {
                    menu_vehiculo.AddItem(aplicarColores(new UIMenuItem("Modo crucero", "Desactiva el modo crucero del vehículo."), "Rojo"));
                }
            }
        }
    }

    menu_vehiculo.ItemSelect.on((item, index) => {
        if (!player_local.vehicle) {
            mostrarAviso("danger", 5000, "Debes estar en un vehículo");
            menu_vehiculo?.Close();
            return;
        }

        switch (item.Text)
        {
            case "Encender motor": case "Apagar motor":
                if (!esConductor(player_local)) {
                    mostrarAviso("danger", 5000, "No estás en el asiento del conductor");
                    menu_vehiculo?.Close();
                    break;
                }
                if (autoPilotActivatedVeh == true || autoPilotActivated == true) {
                    mostrarAviso("info", 5000, "No puedes apagar el motor con el piloto activado");
                    menu_vehiculo?.Close();
                    break;
                }
                mp.events.callRemote("encender_apagar_motor", true);
                menu_vehiculo?.Close();
                break;

            case "Activar ALPR": case "Desactivar ALPR":
                if (puedeUsarALPR) {
                    if (player_local.vehicle != undefined) {
                        if (player_local.vehicle.propiedades != undefined)
                        {
                            if (player_local.vehicle.getPedInSeat(-1) != player_local.handle && player_local.vehicle.getPedInSeat(0) != player_local.handle)
                            {
                                mostrarAviso("danger", 5000, "Solo puedes interactuar con el ALPR desde el asiento del piloto y/o copiloto");
                                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                menu_vehiculo?.Close();
                            }
                            else {
                                let clase = player_local.vehicle.getClass();
                                if (clase == 16 || clase == 15 || clase == 14 || clase == 13 || clase == 8 || array_vehiculos_mod.includes(player_local.vehicle.model)) // No se permitirá usar ALPR en: Aviones (16), Helicopteros (15), Barcos (14), Bicicletas (13) y Motocicletas (8)
                                {
                                    mostrarAviso("danger", 5000, "Este vehículo no tiene ALPR");
                                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                    menu_vehiculo?.Close();
                                }
                                else {
                                    if (setFloodboton(5000, "FB71") == false) {
                                        mostrarAviso("danger", 5000, "Debes esperar almenos 5 segundos entre activar y desactivar el ALPR");
                                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                        return;
                                    }
                                    if (player_local.vehicle.propiedades.alpr) {
                                        menu_vehiculo_item_alpr.Text = ("Activar ALPR");
                                        menu_vehiculo_item_alpr.Description = "Activa el ALPR del vehículo";
                                        menu_vehiculo_item_alpr.RightLabel = "~r~Desactivado";
                                    }
                                    else {
                                        menu_vehiculo_item_alpr.Text = ("Desactivar ALPR");
                                        menu_vehiculo_item_alpr.Description = "Desactiva el ALPR del vehículo";
                                        menu_vehiculo_item_alpr.RightLabel = "~g~Activado";
                                    }
                                    mp.events.callRemote("menu_alpr");
                                }
                            }                          
                        }
                    }
                }
                break;

            case "Cambia al asiento de conductor":
                if (asiento == -1) {
                    if (cinturon) {
                        mostrarAviso("info", 4000, "Tienes el cinturón puesto, quitatelo para poder cambiar de asiento");
                    }
                    else {
                        if (player_local.vehicle.isSeatFree(asiento) == 1) {
                            if ((asiento == -1) && (player_local.vehicle.getSpeed() * 3.6) > 50) { // Conductor - Copiloto
                                mostrarAviso("info", 4000, "No puedes cambiarte de asiento, el vehículo va demasiado rápido");
                                menu_vehiculo?.Close();
                                return;
                            }

                            player_local.taskShuffleToNextVehicleSeat(player_local.vehicle.handle);
                        }
                        else {
                            mostrarAviso("info", 4000, "El asiento está ocupado");
                        }
                    }
                }
                else {
                    mostrarAviso("info", 4000, "No puedes cambiarte de asiento");
                }
                menu_vehiculo?.Close();
                break;

            case "Quitar cinturón de seguridad": case "Colocar cinturón de seguridad":
                mp.events.callRemote("poner_quitar_cinturon");
                menu_vehiculo?.Close();
                break;

            case "Abrir / Cerrar puertas":
                menu_vehiculo?.Close(true);
                mostrar_menu_coche_puertas();
                break;

            case "Establecer límite de velocidad":
                if (!esConductor(player_local)) {
                    mostrarAviso("danger", 5000, "No estás en el asiento del conductor");
                    menu_vehiculo?.Close();
                    break;
                }
                if (limitador_autolavado == true) {
                    mostrarAviso("danger", 5000, "En este momento no puedes usar el limitador");
                    menu_vehiculo?.Close();
                    break;
                }
                if (!mp.game.vehicle.isThisModelABicycle(player_local.vehicle.getModel())) {
                    menu_vehiculo?.Close(true);
                    mostrar_menu_coche_limitador();
                    break;
                }
                else {
                    mostrarAviso("danger", 5000, "Tu vehículo no tiene limitador de velocidad");
                    menu_vehiculo?.Close();
                    break;
                }

            case "Abrir maletero":
                if (!esConductor(player_local)) {
                    mostrarAviso("danger", 5000, "No estás en el asiento del conductor");
                    menu_vehiculo?.Close();
                    return;
                }
                if (!mp.game.vehicle.isThisModelABicycle(player_local.vehicle.getModel())) {
                    if (obtenerMaletero()) {
                        mostrarAviso("danger", 5000, "El maletero ya está abierto. No puedes cerrarlo desde aquí");
                        menu_vehiculo?.Close();
                        break;
                    } else {
                        if (mp.game.vehicle.isThisModelABike(player_local.vehicle.getModel())) {
                            mp.gui.chat.push("!{green} Intentas abrir el maletero de tu vehículo");
                        }

                        mp.events.callRemote("mostrar_maletero", false, -1);
                        menu_vehiculo?.Close();
                        break;
                    }
                }
                else {
                    mostrarAviso("danger", 5000, "No puedes abrir el maletero desde tu asiento en este vehículo");
                    menu_vehiculo?.Close();
                    break;
                }

            case "Abrir guantera":
                let claseveh = player_local.vehicle.getClass();
                if (array_vehiculos_mod.includes(player_local.vehicle.model) || claseveh == 8) {
                    mostrarAviso("danger", 5000, "Este vehículo no tiene guantera");
                } else {
                    if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(0) == player_local.handle) {
                        let llave_guantera = player_local.vehicle.propiedades.llave;
                        mp.events.callRemote("mostrar_guantera", llave_guantera);
                        menu_vehiculo?.Close();
                        return;
                    }
                    else {
                        mostrarAviso("danger", 5000, "No puedes abrir la guantera desde tu asiento");
                    }
                }
                menu_vehiculo?.Close();
                break;

            case "Abrir / Cerrar ventanillas":
                menu_vehiculo?.Close(true);
                mostrar_menu_coche_ventanas();
                break;

            case "Emisoras":
                if (tieneEmisoraActiva)
                    mp.events.callRemote("emisoras_vehiculo", true);
                else
                    mp.events.callRemote("emisoras_vehiculo", false);
                menu_vehiculo?.Close();
                break;

            case "Piloto automático aeronave": case "Modo crucero": case "Piloto automático vehículo":
                if (item.Text == "Modo crucero")
                {
                    if (limitador_autolavado == true) {
                        mostrarAviso("danger", 5000, "En este momento no puedes usar el modo crucero");
                        menu_vehiculo?.Close();
                        break;
                    }

                    if (!cruiseEnabled) {
                        if (mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72)){ // Comprobación de frenos
                            mostrarAviso("danger", 5000, "No puedes activar el modo crucero mientras frenas");
                        }
                        else if (mp.game.controls.isControlPressed(32, 71)){// Comprobación de aceleración
                            mostrarAviso("danger", 5000, "No puedes activar el modo crucero mientras aceleras");
                        }
                        else if (player_local.vehicle.isInAir()){ // Comprobación si está en el aire
                            mostrarAviso("danger", 5000, "No puedes activar el modo crucero mientras estás en el aire");
                        }
                        else if (!player_local.vehicle.getIsEngineRunning()){
                            mostrarAviso("danger", 5000, "No puedes activar el modo crucero con el motor apagado");
                        }
                        else{
                            if (player_local.vehicle.getSpeed() > 0) {
                                cruiseEnabled = true;
                                cruiseSpeed = player_local.vehicle.getSpeed();
                                mostrarAviso("success", 5000, "Modo crucero activado");
                            } else {
                                mostrarAviso("danger", 5000, "No puedes activar el modo crucero si el vehículo está parado");
                            }
                        }
                    } else {
                        cruiseEnabled = false;
                        mostrarAviso("success", 5000, "Modo crucero desactivado");
                    }
                } else {
                    if (tipo_vehiculo == 0) { // Coche
                        if (limitador_autolavado == true) {
                            mostrarAviso("danger", 5000, "En este momento no puedes usar el piloto automático");
                            menu_vehiculo?.Close();
                            break;
                        }

                        if (autoPilotActivatedVeh == false) {
                            menu_vehiculo?.Close(true);
                            mostrar_menu_piloto_velocidad();
                        }
                        else {
                            mp.events.call("parar_pilotoautomatico_vehiculos"); // Lo paramos
                            menu_vehiculo?.Close();
                        }
                    }
                    else { // aeronave
                        if (autoPilotActivated == false) {
                            menu_vehiculo?.Close(true);
                            mostrar_menu_piloto_velocidad();
                        }
                        else {
                            mp.events.call("piloto_automatico_aeronaves"); // Lo paramos
                            menu_vehiculo?.Close();
                        }
                    }
                }
                break;
            default:
                menu_vehiculo?.Close();
                break;
        }
    });

    menu_vehiculo.MenuClose.on(() => {
        menu_vehiculo = null;
    });
}

// Submenús

// menú del limitador
function mostrar_menu_coche_limitador() {

    var menu_vehiculo_limitador = crearMenu("Limitador", "Velocidad límite del vehículo");
    menu_vehiculo_limitador.AddItem(new UIMenuItem("150 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("145 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("140 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("120 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("115 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("110 km/h", ""));
    menu_vehiculo_limitador.AddItem(new UIMenuItem("100 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("70 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("65 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("60 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("50 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("20 km/h", "")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("Eliminar limitador", "Elimina el limitador de velocidad")); 
    menu_vehiculo_limitador.AddItem(new UIMenuItem("Volver", "Volver al menú principal"));

    menu_vehiculo_limitador.ItemSelect.on((item, index) => {
        let mostrarTexto = false;

        switch (index) {
            case 0:
                if ((player_local.vehicle.getSpeed()*3.6) < 150) {
                    limitadorVelocidad = 150;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 1:
                if ((player_local.vehicle.getSpeed() * 3.6) < 145) {
                    limitadorVelocidad = 145;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 2:
                if ((player_local.vehicle.getSpeed() * 3.6) < 140) {
                    limitadorVelocidad = 140;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 3:
                if ((player_local.vehicle.getSpeed()*3.6) < 120) {
                    limitadorVelocidad = 120;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 4:
                if ((player_local.vehicle.getSpeed() * 3.6) < 115) {
                    limitadorVelocidad = 115;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 5:
                if ((player_local.vehicle.getSpeed() * 3.6) < 110) {
                    limitadorVelocidad = 110;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 6:
                if ((player_local.vehicle.getSpeed()*3.6) < 100) {
                    limitadorVelocidad = 100;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 7:
                if ((player_local.vehicle.getSpeed()*3.6) < 70) {
                    limitadorVelocidad = 70;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 8:
                if ((player_local.vehicle.getSpeed() * 3.6) < 65) {
                    limitadorVelocidad = 65;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 9:
                if ((player_local.vehicle.getSpeed() * 3.6) < 60) {
                    limitadorVelocidad = 60;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 10:
                if ((player_local.vehicle.getSpeed()*3.6) < 50) {
                    limitadorVelocidad = 50;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 11:
                if ((player_local.vehicle.getSpeed()*3.6) < 20) {
                    limitadorVelocidad = 20;
                    mostrarTexto = true;
                } else {
                    mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                    return;
                }
                break;
            case 12:
                if (limitadorVelocidad != 0) {
                    limitadorVelocidad = 0;
                    mostrarAviso("success", 5000, "Limitador de velocidad desactivado");
                    menu_vehiculo_limitador?.Close();
                } else {
                    mostrarAviso("danger", 5000, "No tienes un limitador activo");
                    return;
                }
                break;
            case 13:
                menu_vehiculo_limitador?.Close(true);
                mostrar_menu_coche();
                break;
        }

        if (limitadorVelocidad > 0) {
            //Mostrar el icono de limitador en el HUD.
            mp.events.call("hud:limitadorVelocidad:actualizar", limitadorVelocidad);
            limitadoresVelocidad[player_local.vehicle.id] = limitadorVelocidad;
            //mp.events.call("actualizar_limitadorvelocidad_hud", limitadorVelocidad);
        } else if (limitadorVelocidad == 0) {
            //Ocultar el icono de limitador en el HUD.
            mp.events.call("hud:limitadorVelocidad:ocultar");
            delete limitadoresVelocidad[player_local.vehicle.id];
            // mp.events.call("ocultar_limitadorvelocidad_hud");
        }

        if (mostrarTexto) {
            mostrarAviso("success", 5000, "Se ha limitado la velocidad del vehículo a " + limitadorVelocidad + " km/h");
        }
    });

    menu_vehiculo_limitador.MenuClose.on(() => {
        menu_vehiculo_limitador = null;
    });
}

// menú de las ventanas
function mostrar_menu_coche_ventanas() {

    var menu_vehiculo_ventana = crearMenu("Ventanas", "Ventanas del vehículo");

    let ventana_del_i = new UIMenuItem("Puerta delantera izquierda", "Abrir / Cerrar puerta");
    let ventana_del_d = new UIMenuItem("Puerta delantera derecha", "Abrir / Cerrar puerta");
    let ventana_tra_i = new UIMenuItem("Puerta trasera izquierda", "Abrir / Cerrar puerta");
    let ventana_tra_d = new UIMenuItem("Puerta trasera derecha", "Abrir / Cerrar puerta");

    menu_vehiculo_ventana.AddItem(ventana_del_i);
    menu_vehiculo_ventana.AddItem(ventana_del_d);
    menu_vehiculo_ventana.AddItem(ventana_tra_i);
    menu_vehiculo_ventana.AddItem(ventana_tra_d);
    menu_vehiculo_ventana.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    let ventanas = [ventana_del_i, ventana_del_d, ventana_tra_i, ventana_tra_d];

    if (!esConductor(player_local)) {
        for (let i = 0; i < 4; i++) {
            if (player_local.vehicle.getPedInSeat(i-1) != player_local.handle) {
                ventanas[i].SetRightBadge(BadgeStyle.Lock);
            }
        }
    }

    menu_vehiculo_ventana.ItemSelect.on((item, index) => {
        if (player_local.vehicle != null) {
            if (index < 4) {
                if (!esConductor(player_local)) {
                    if (player_local.vehicle.getPedInSeat(index-1) == player_local.handle) {
                        bajar_subir_ventanilla(index); // No debe tirar error por el propio antiflood... pero dejamos el return por buena práctica
                        return;
                    } else return;
                }

                bajar_subir_ventanilla(index);
            } else {
                menu_vehiculo_ventana?.Close(true);
                mostrar_menu_coche();
            }
        }
        else {
            menu_vehiculo_ventana?.Close();
        }
    });

    menu_vehiculo_ventana.MenuClose.on(() => {
        menu_vehiculo_ventana = null;
    });
}

function mostrar_menu_coche_puertas() {

    var menu_vehiculo_puertas = crearMenu("Puertas", "Puertas del vehículo");


    let puerta_del_i = new UIMenuItem("Puerta delantera izquierda", "Abrir / Cerrar puerta");
    let puerta_del_d = new UIMenuItem("Puerta delantera derecha", "Abrir / Cerrar puerta");
    let puerta_tra_i = new UIMenuItem("Puerta trasera izquierda", "Abrir / Cerrar puerta");
    let puerta_tra_d = new UIMenuItem("Puerta trasera derecha", "Abrir / Cerrar puerta");

    let puertas = [puerta_del_i, puerta_del_d, puerta_tra_i, puerta_tra_d]


    menu_vehiculo_puertas.AddItem(puerta_del_i);
    menu_vehiculo_puertas.AddItem(puerta_del_d);
    menu_vehiculo_puertas.AddItem(puerta_tra_i);
    menu_vehiculo_puertas.AddItem(puerta_tra_d);
    menu_vehiculo_puertas.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    if (!esConductor(player_local)) {
        for (let i = 0; i < 4; i++) {
            if (player_local.vehicle.getPedInSeat(i-1) != player_local.handle) {
                puertas[i].SetRightBadge(BadgeStyle.Lock);
            }
        }
    }

    menu_vehiculo_puertas.ItemSelect.on((item, index) => {
        if (player_local.vehicle != null) {
            if (index < 4) {
                if (!esConductor(player_local)) {
                    if (player_local.vehicle.getPedInSeat(index - 1) == player_local.handle) {
                        mp.events.callRemote("vehiculo_puertas", index);
                        return;
                    } else return;
                }
                mp.events.callRemote("vehiculo_puertas", index);
            } else {
                menu_vehiculo_puertas?.Close(true);
                mostrar_menu_coche();
            }
        }
        else {
            menu_vehiculo_puertas?.Close();
        }
    });

    menu_vehiculo_puertas.MenuClose.on(() => {
        menu_vehiculo_puertas = null;
    });
}

function mostrar_menu_piloto_velocidad() {

    menu_vehiculo_velocidad = crearMenu("Piloto automático", "Velocidad");

    if (tipo_vehiculo == 0) { // vehiculo
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("20 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("40 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("60 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("80 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("100 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("120 km/h", "Establece la velocidad máxima del piloto automático."));
    }
    else { // aeronave
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("100 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("120 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("140 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("160 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("180 km/h", "Establece la velocidad máxima del piloto automático."));
        menu_vehiculo_velocidad.AddItem(new UIMenuItem("200 km/h", "Establece la velocidad máxima del piloto automático."));
    }

    menu_vehiculo_velocidad.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    menu_vehiculo_velocidad.ItemSelect.on((item, index) => {
        if (player_local.vehicle != null) {
            if (tipo_vehiculo == 0) {// coche
                switch (index) {
                    case 0:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 20) {
                            limitadorVelocidad = 20;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 1:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 40) {
                            limitadorVelocidad = 40;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 2:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 60) {
                            limitadorVelocidad = 60;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 3:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 80) {
                            limitadorVelocidad = 80;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 4:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 100) {
                            limitadorVelocidad = 100;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 5:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 120) {
                            limitadorVelocidad = 120;
                            mp.events.call("piloto_automatico_vehiculos", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();

                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 6:
                        menu_vehiculo_velocidad?.Close(true);
                        mostrar_menu_coche();
                        break;
                }
            }
            else { // aeronave
                switch (index) {
                    case 0:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 100) {
                            limitadorVelocidad = 100;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 1:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 120) {
                            limitadorVelocidad = 120;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 2:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 140) {
                            limitadorVelocidad = 140;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 3:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 160) {
                            limitadorVelocidad = 160;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 4:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 180) {
                            limitadorVelocidad = 180;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 5:
                        if ((player_local.vehicle.getSpeed() * 3.6) < 200) {
                            limitadorVelocidad = 200;
                            mp.events.call("piloto_automatico_aeronaves", limitadorVelocidad);
                            menu_vehiculo_velocidad?.Close();
                        } else {
                            mostrarAviso("danger", 5000, "No puedes limitar ahora la velocidad, vas más rápido que la propia limitación");
                        }
                        break;
                    case 6:
                        menu_vehiculo_velocidad?.Close(true);
                        mostrar_menu_coche();
                        break;
                }
            }
        }
        else {
            menu_vehiculo_velocidad?.Close();
        }
    });

    menu_vehiculo_velocidad.MenuClose.on(() => {
        menu_vehiculo_velocidad = null;
    });
}

// Arrays que contienen los modelos con piloto automático
var array_aeronaves = [mp.game.joaat("shamal"), mp.game.joaat("nimbus"), mp.game.joaat("miljet"), mp.game.joaat("luxor"), mp.game.joaat("luxor2")];

var array_vehiculos = [mp.game.joaat("neon"), mp.game.joaat("tezeract"), mp.game.joaat("cyclone"), mp.game.joaat("imorgon"), mp.game.joaat("dilettante"), mp.game.joaat("adder"), mp.game.joaat("autarch"), mp.game.joaat("banshee2"), mp.game.joaat("toros"), mp.game.joaat("cheetah"), mp.game.joaat("entity2"), mp.game.joaat("entityxf"), mp.game.joaat("emerus"), mp.game.joaat("fmj"), mp.game.joaat("furia"), mp.game.joaat("gp1"), mp.game.joaat("infernus"), mp.game.joaat("italigtb"), mp.game.joaat("italigtb2"), mp.game.joaat("krieger"), mp.game.joaat("prototipo"), mp.game.joaat("reaper"), mp.game.joaat("s80"), mp.game.joaat("sc1"), mp.game.joaat("scramjet"), mp.game.joaat("sheava"), mp.game.joaat("t20"), mp.game.joaat("taipan"), mp.game.joaat("turismoR"), mp.game.joaat("tyrant"), mp.game.joaat("vacca"), mp.game.joaat("vagner"), mp.game.joaat("vigilante"), mp.game.joaat("visione"), mp.game.joaat("voltic2"), mp.game.joaat("xa21"), mp.game.joaat("zentorno"), mp.game.joaat("zorrusso"), mp.game.joaat("italiGTO"), mp.game.joaat("massacro"), mp.game.joaat("paragon"), mp.game.joaat("pariah"), mp.game.joaat("schlagen"), mp.game.joaat("cognoscenti"), mp.game.joaat("cogcabrio"), mp.game.joaat("windsor"), mp.game.joaat("f620"), mp.game.joaat("windsor2"), mp.game.joaat("raiden"), mp.game.joaat("voltic"), mp.game.joaat("khamelion"), mp.game.joaat("surge"), mp.game.joaat("growler"), mp.game.joaat("cinquemilla"), mp.game.joaat("deity"), mp.game.joaat("zeno"), mp.game.joaat("comet6"), mp.game.joaat("comet7")];

var array_vehiculos_mod = [mp.game.joaat("shinobi"), mp.game.joaat("reever"), mp.game.joaat("policeb1"), mp.game.joaat("policeb2"), mp.game.joaat("sheriffenduro"), mp.game.joaat("sheriffthrust"), mp.game.joaat("lspdb")]
}