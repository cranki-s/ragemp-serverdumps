{
///* --------------------------------------------------------------------------------
// * menu.js
// *
// * Autor: Kenshin
// *
// * Descripción: Menu principal del usuario con todas las herramientas
// *
// * -------------------------------------------------------------------------------- */
var cef_menu = require("./LURP/cef.js");

var menu_cefId = -1;

mp.events.add({
    "localizarVehiculo": function (id) {
        mp.events.callRemote("mivehiculo", id);
    },
    "specPlayer": function (id) {
        mp.events.callRemote("reconear_evento", id);
    },
    "llamarGrua": function (id) {
        mp.events.callRemote("llamar_grua", id);
    },
    "venderVehiculoConce": function (id) {
        mp.events.callRemote("venderveh", id);
    },
    "venderVehiculoJugador": function (vehiculo, precio, jugador) {
        mp.events.callRemote("vendervehjug", vehiculo, precio, jugador);
    },
    "darllaveVehiculoJugador": function (vehiculo, jugador) {
        mp.events.callRemote("darllavevehjug", vehiculo, jugador);
    },
    "tirarllaveVehiculo": function (vehiculo) {
        mp.events.callRemote("tirarllaveveh", vehiculo);
    },
    "rutaGPS": function (nombre) {
        var x, y;
        if (nombre === "juzgados") {
            x = 236.1957;
            y = -410.9713;
        }
        if (nombre === "hospital_general") {
            x = -498.184;
            y = -335.741;
        }
        if (nombre === "central_bomberos") {
            x = 1179.161;
            y = -1461.453;
        }
        if (nombre === "comisaria_missionrow") {
            x = 433.9706;
            y = -982.0072;
        }
        if (nombre === "comisaria_lamesa") {
            x = 826.966;
            y = -1289.866;
        }
        if (nombre === "deposito") {
            x = 360.4384;
            y = -1584.372;
        }
        if (nombre === "autoescuela") {
            x = -704.2617;
            y = -1398.436;
        }
        if (nombre === "taxista") {
            x = 911.9117;
            y = -178.8322;
        }
        if (nombre === "basurero") {
            x = -355.1064;
            y = -1514.313;
        }
        if (nombre === "camionero") {
            x = 797.3534;
            y = -2988.584;
        }
        if (nombre === "autobusero") {
            x = -774.9046;
            y = -2632.354;
        }
        if (nombre === "pescador") {
            x = -339.3759;
            y = -2444.141;
        }
        if (nombre === "paramedico") {
            x = 162.407;
            y = -1119.554;
        }
        if (nombre === "cartero") {
            x = 78.63522;
            y = 111.5582;
        }
        if (nombre === "reponedor") {
            x = 814.0063;
            y = -1644.947;
        }

        if(!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)))
            mp.game.ui.setNewWaypoint(x, y);
    },
    "marcarUbicacionCercana": (_datos) => {
        let datos = (typeof _datos === "string" ? JSON.parse(_datos) : _datos);
        if (!datos || datos.length <= 0) return;

        let ud = new mp.Vector3(datos[0].posx, datos[0].posy, datos[0].posz);
        let di = calcDist(player_local.position, ud);
        for (let i = 0; i < datos.length; i++) {
            let dato = datos[i];
            let pos = new mp.Vector3(dato.posx, dato.posy, dato.posz);
            
            if (calcDist(player_local.position, pos) < di) {
                ud = pos;
                di = calcDist(player_local.position, pos);
            }
        }

        mp.events.call("cerrarMenu");
        mostrarAviso("info", 7000, "Se ha marcado la posición más cercana");
        mp.game.ui.setNewWaypoint(parseFloat(ud.x), parseFloat(ud.y));
    },
    "menu:recibirDatos": (datos) => {
        if (menu_cefId >= 0) {
            let datosMenu = typeof datos === "string" ? JSON.parse(datos) : datos;
 
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.horasJugadas = " + datosMenu.horasjugadas);
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.edad = " + datosMenu.edad);
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.nacionalidad = " + datosMenu.nacionalidad);
            cef_menu.ejecutarCef(menu_cefId, "app.d.dimensiones.propiedad = " + datosMenu.propiedad);
            cef_menu.ejecutarCef(menu_cefId, "app.d.dimensiones.negocio = " + datosMenu.negocio);
            cef_menu.ejecutarCef(menu_cefId, "cargarTrabajos('" + JSON.stringify(datosMenu.trabajos) + "')");
            cef_menu.ejecutarCef(menu_cefId, "app.cargarMisiones(" + personaje_id + ", " + faccion + ", " + JSON.stringify(datosMenu.negocios_propietario) + ")");
            cef_menu.ejecutarCef(menu_cefId, "app.d.statsLoaded = true");
        }
    },
    "menu:escucharEfectosAudio": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.efectosAudio = state; 
            mp.storage.flush();
        }
    },
    "menu:hudNivel": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudNivel = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudNivel", state);
        }
    },
    "menu:hudPremium": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudPremium = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudPremium", state);
        }
    },
    "menu:hudStreamer": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudStreamer = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudStreamer", state);
        }
    },
    "menu:hudDinero": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudDinero = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudDinero", state);
        }
    },
    "menu:hudAutobuses": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudAutobuses = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudAutobuses", state);
        }
    },
    "menu:hudTaxi": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudTaxi = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudTaxi", state);
        }
    },
    "menu:hudRadio": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudRadio = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudRadio", state);
        }
    },
    "menu:hudHambre": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudHambre = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudHambre", state);
        }
    },
    "menu:hudSed": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudSed = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudSed", state);
        }
    },
    "menu:hudId": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudId = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudId", state);
        }
    },

    "menu:hudOrientacion": (state) => {
        if(mp.storage.data.options && tipoMapa != 2)
        {
            mp.storage.data.options.hudOrientacion = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudOrientacion", state);
        }
    },
    "menu:hudUbicacion": (state) => {
        if(mp.storage.data.options && tipoMapa != 2)
        {
            mp.storage.data.options.hudUbicacion = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudUbicacion", state);
        }
    },
    "menu:hudInventario": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudInventario = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudInventario", state);
        }
    },
    "menu:hudTeclas": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudTeclas = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudTeclas", state);
        }
    },
    "menu:hudVehiculo": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.hudVehiculo = state; 
            mp.storage.flush();  
            mp.events.call("hud:mostrar_ocultar", "hudVehiculo", state);
        }
    },
    "menu:hudColorNativeUI": (newColor) => {
        colorPredeterminado(newColor);
    },
    "menu:nametags": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.nametags = state; 
            mp.storage.flush();
        }
    },
    "menu:nametagsIds": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.nametagsIds = state; 
            mp.storage.flush();
        }
    },
    "menu:nametagsConocidos": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.nametagsConocidos = state; 
            mp.storage.flush();
        }
    },
    "menu:graficos:bajo": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.grafics.low = state; 
            mp.storage.flush();
            mp.players.maxStreamed = 66;
            mp.vehicles.maxStreamed = 42;
            mp.objects.maxStreamed = 766;
        }
    },
    "menu:graficos:medio": (state) => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.grafics.mid = state; 
            mp.storage.flush();
            mp.players.maxStreamed = 100;
            mp.vehicles.maxStreamed = 64;
            mp.objects.maxStreamed = 1150;
        }
    },
    "menu:graficos:alto": () => {
        if(mp.storage.data.options)
        {
            mp.storage.data.options.grafics.big = state; 
            mp.storage.flush();
            mp.players.maxStreamed = 200;
            mp.vehicles.maxStreamed = 128;
            mp.objects.maxStreamed = 2300;
        }
    },
    "menu:mision:individual:empezar": (mision_id) => {
        mp.events.callRemote("jugador:misiones:individual:empezar", mision_id);
    },
    "menu:mision:faccion:empezar": (mision_id, faccion_id) => {
        mp.events.callRemote("jugador:misiones:faccion:empezar", mision_id, faccion_id);
    },
    "menu:mision:negocio:empezar": (mision_id, negocio_id) => {
        mp.events.callRemote("jugador:misiones:negocio:empezar", mision_id, negocio_id);
    },
    "menu:mision:individual:abandonar": (mision_id) => {
        mp.events.callRemote("jugador:misiones:individual:abandonar", mision_id);
    },
    "menu:mision:faccion:abandonar": (mision_id, faccion_id) => {
        mp.events.callRemote("jugador:misiones:faccion:abandonar", mision_id, faccion_id);
    },
    "menu:mision:negocio:abandonar": (mision_id, negocio_id) => {
        mp.events.callRemote("jugador:misiones:negocio:abandonar", mision_id, negocio_id);
    },
    "menu:mision:individual:sync": mision_id => {
        mp.events.callRemote("jugador:misiones:sync", mision_id, -1, -1);
    },
    "menu:mision:faccion:sync": (mision_id, faccion_id) => {
        mp.events.callRemote("jugador:misiones:sync", mision_id, faccion_id, -1);
    },
    "menu:mision:negocio:sync": (mision_id, negocio_id) => {
        mp.events.callRemote("jugador:misiones:sync", mision_id, -1, negocio_id);
    },
    "menu:faccion:invitar": (personaje_id) => {
        mp.events.callRemote("faccion:invitar", personaje_id);
    },
    "menu:faccion:expulsar": (personaje_id) => {
        mp.events.callRemote("faccion:expulsar", personaje_id);
    },
    "menu:faccion:mejora": (faccion_id, mejora) => {
        mp.events.callRemote("faccion:mejora", faccion_id, mejora);
    },
});

mp.events.add("cerrarMenu", () => {
    if (menu_cefId >= 0) {
        cef_menu.cerrarCef(menu_cefId);
    }
})

function mostrarmenu() {
    if (menu_cefId < 0) {       
        menu_cefId = cef_menu.crearCef("package://LURP/cef/menu/menu.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_menu.ejecutarCef(menu_cefId, "app.datosEncrypt('" + apiKey + "', '" + _k + "')");
        
        mp.events.callRemote("menu:obtenerDatos");

        cef_menu.ejecutarCef(menu_cefId, "app.d.cartera = '" + dinero + "'");
        // cef_menu.ejecutarCef(menu_cefId, "app.d.banco = '" + dinero_banco + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.puntosrol_positivos = '" + puntosrol_positivos + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.puntosrol_negativos = '" + puntosrol_negativos + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.nombre_usuario = '" + nombre_usuario + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.id_pj = '" + id_pj + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.personaje_id = '" + personaje_id + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.nombre_pj = '" + nombre_pj + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.vikens = '" + vikens + "'");


        if (opciones.variables.voz)
            cef_menu.ejecutarCef(menu_cefId, "app.d.voz = '" + opciones.variables.voz + "'");
            // global_menu.enviaraCef("app.d.voz = '" + opciones.variables.voz + "'");
            // global_menu.enviaraCef("app.creditos = '" + opciones.variables.creditos + "'");
        var climaActual = "fad fa-sun";
        switch (icono_clima) {
            case "clear-day":
                climaActual = "fad fa-sun";
                break;
            case "clear-night":
                climaActual = "fad fa-moon";
                break;
            case "rain":
                climaActual = "fad fa-cloud-rain";
                break;
            case "snow":
                climaActual = "fad fa-snowflake";
                break;
            case "sleet":
                climaActual = "fad fa-snowflake";
                break;
            case "wind":
                climaActual = "fad fa-wind";
                break;
            case "fog":
                climaActual = "fad fa-smog";
                break;
            case "cloudy":
                climaActual = "fad fa-cloud";
                break;
            case "partly-cloudy-day":
                climaActual = "fad fa-cloud-sun";
                break;
            case "partly-cloudy-night":
                climaActual = "fad fa-cloud-moon";
                break;
            case "cloud-snow":
                climaActual = "fad fa-cloud-snow";
                break;
            default:
                climaActual = "fad fa-sun";
                break;
        }

        cef_menu.ejecutarCef(menu_cefId, "app.d.clima = '" + climaActual + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.temperatura = '" + temperatura + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.propiedad_id = '" + propiedad_id + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.usuarios = '" + mp.players.length + "'");
        //mp.console.logInfo(`[Facciones] Total cargadas: ${facciones.length}`, true, true);
        //cef_menu.ejecutarCef(menu_cefId, "app.cargarFacciones('" + JSON.stringify(facciones) + "')");

/*         facciones.forEach(function (f) {
            let fac = {
                id: f.id,
                lider: f.lider,
                nombre: f.nombre,
                descripcion: "",
                nivel: f.nivel,
                validada: f.validada,
                verificada: f.verificada,
                tipo: f.tipo,
                color: f.color,
                imagen: f.imagen,
            };
            let json = JSON.stringify(fac);
            cef_menu.ejecutarCef(menu_cefId, "app.cargarFaccion('" + json + "')");
        }); */

        //mp.console.logInfo(`[Facciones] ${JSON.stringify(facciones)}`, true, true);
        cef_menu.ejecutarCef(menu_cefId, "app.cargarVehiculos('" + JSON.stringify(vehiculos) + "')");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarMultas('" + JSON.stringify(multas) + "')");
        if(adminservicio)
        {
            var jugadores = [];
            mp.players.forEach(function (players) {
                if (mp.controladorJugadores._jugadores[players.id]) {
                    if (mp.controladorJugadores._jugadores[players.id].conectado) { // Conectado
                        if (mp.controladorJugadores._jugadores[players.id].oculto == false) { // Oculto
                            var ply = null;
                            if (mp.controladorJugadores._jugadores[players.id].caratapada.estado == true) // Caratapada
                                ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, sqlid_pj: mp.controladorJugadores._jugadores[players.id].sqlid_personaje, nombre: obtenerNombreConocido(players), nivel: "0", usuario: "Oculto" };
                            else
                                ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, sqlid_pj: mp.controladorJugadores._jugadores[players.id].sqlid_personaje, nombre: obtenerNombreConocido(players), nivel: mp.controladorJugadores._jugadores[players.id].nivel_pj, usuario: mp.controladorJugadores._jugadores[players.id].nombre_usuario };

                            if (ply)
                                jugadores.push(ply);
                        }
                    }
                }
            });
            jugadores.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

    
            cef_menu.ejecutarCef(menu_cefId, "app.cargarJugadores('" + JSON.stringify(jugadores) + "')");
            cef_menu.ejecutarCef(menu_cefId, "app.d.players = true");
        }
        cef_menu.ejecutarCef(menu_cefId, "app.cargarFacciones()");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarCajeros()");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarCabinas()");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarTalleres()");

        var vehicle = player_local.vehicle;
        var jugadores = [];
        var jugadores_proximos = [];
        var pasajeros = [];
        var vehiculos_proximos = [];
        mp.players.forEach(function (players) {
            if (mp.controladorJugadores._jugadores[players.id]) {
                if (mp.controladorJugadores._jugadores[players.id].conectado) { // Conectado
                    if (mp.controladorJugadores._jugadores[players.id].oculto == false) { // Oculto
                        var ply = null;
                        if (mp.controladorJugadores._jugadores[players.id].caratapada.estado) // Caratapada
                            ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players), nivel: "0", usuario: "Oculto" };
                        else
                            ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players), nivel: mp.controladorJugadores._jugadores[players.id].nivel_pj, usuario: mp.controladorJugadores._jugadores[players.id].nombre_usuario };

                        if (ply)
                            jugadores.push(ply);

                        if (calcDist(players.position, player_local.position) <= 10.0 && players != player_local) {
                            let ply_prox = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players) };
                            jugadores_proximos.push(ply_prox);
                        }

                        if (vehicle) {
                            if (players.vehicle == player_local.vehicle && players != player_local) {
                                let ply_pasajeros = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players) };
                                pasajeros.push(ply_pasajeros);
                            }
                        }
                    }
                }
            }
        });

        for (let vehicle of mp.vehicles.streamed) {
            if (calcDist(vehicle.position, player_local.position) <= 4.0) {
                if (vehicle.propiedades) {
                    if (vehicle.propiedades.llave != undefined && vehicle.propiedades.nombre != undefined) {
                        var llave = vehicle.propiedades.llave;
                        var nombre = vehicle.propiedades.nombre;
                        var matricula = mp.game.invokeString("0x7CE1CCB9B293020E", vehicle.handle);
                        var veh_prox = { id: llave, title: nombre, number: matricula };
                        //var veh_prox = { id: llave, title: nombre, number: vehicle.getNumberPlateText() };
                        vehiculos_proximos.push(veh_prox);
                    }
                }
            }
        }

        cef_menu.ejecutarCef(menu_cefId, "app.cargarPersonajes('" + JSON.stringify(jugadores) + "')");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarJugadoresProx('" + JSON.stringify(jugadores_proximos) + "')");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarPasajeros('" + JSON.stringify(pasajeros) + "')");
        cef_menu.ejecutarCef(menu_cefId, "app.cargarVehiculosProx('" + JSON.stringify(vehiculos_proximos) + "')");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos1 = '" + opciones.variables.creditos1 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos2 = '" + opciones.variables.creditos2 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos3 = '" + opciones.variables.creditos3 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos4 = '" + opciones.variables.creditos4 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos5 = '" + opciones.variables.creditos5 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos6 = '" + opciones.variables.creditos6 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos7 = '" + opciones.variables.creditos7 + "'");
        cef_menu.ejecutarCef(menu_cefId, "app.d.creditos8 = '" + opciones.variables.creditos8 + "'");

        cef_menu.ejecutarCef(menu_cefId, "cambiarTiempoChat(" + tiempoChat + ")");
        cef_menu.ejecutarCef(menu_cefId, "cambiarTamanoChat(" + tamanoChat + ")");
        cef_menu.ejecutarCef(menu_cefId, "cambiarVerAme(" + mostrar_texto_cabeza + ")");
        cef_menu.ejecutarCef(menu_cefId, "cambiarVerTextoObjetos(" + mostrar_texto_objetos + ")");

        for (let i = 0, n = blips_guardados.length; i < n; i++) {
            switch (blips_guardados[i]) {
                case 3:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip1(" + true + ")");
                    break;
                case 4:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip2(" + true + ")");
                    break;
                case 5:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip3(" + true + ")");
                    break;
                case 6:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip4(" + true + ")");
                    break;
                case 9:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip5(" + true + ")");
                    break;
                case 12:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip6(" + true + ")");
                    break;
                case 15:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip7(" + true + ")");
                    break;
                case 16:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip8(" + true + ")");
                    break;
                case 18:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip9(" + true + ")");
                    break;
                case 22:
                    cef_menu.ejecutarCef(menu_cefId, "cambiarBlip10(" + true + ")");
                    break;
                default:
                    break;
            }
        }

        //Cargamos las opciones particulares de este pc
        if(mp.storage.data.options)
        {
            cef_menu.ejecutarCef(menu_cefId, "cambiarescucharEfectosAudio(" + mp.storage.data.options.efectosAudio + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudNivel(" + mp.storage.data.options.hudNivel + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudPremium(" + mp.storage.data.options.hudPremium + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudStreamer(" + mp.storage.data.options.hudStreamer + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudDinero(" + mp.storage.data.options.hudDinero + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudAutobuses(" + mp.storage.data.options.hudAutobuses + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudTaxi(" + mp.storage.data.options.hudTaxi + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudRadio(" + mp.storage.data.options.hudRadio + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudHambre(" + mp.storage.data.options.hudHambre + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudSed(" + mp.storage.data.options.hudSed + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudId(" + mp.storage.data.options.hudId + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudOrientacion(" + mp.storage.data.options.hudOrientacion + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudUbicacion(" + mp.storage.data.options.hudUbicacion + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudInventario(" + mp.storage.data.options.hudInventario + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudTeclas(" + mp.storage.data.options.hudTeclas + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudVehiculo(" + mp.storage.data.options.hudVehiculo + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarhudColorNativeUI('" + mp.storage.data.options.hudColorNativeUI + "')");
            cef_menu.ejecutarCef(menu_cefId, "cambiarNametags(" + mp.storage.data.options.nametags + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarNametagsIds(" + mp.storage.data.options.nametagsIds + ")");
            cef_menu.ejecutarCef(menu_cefId, "cambiarNametagsConocidos(" + mp.storage.data.options.nametagsConocidos + ")");
        }

        if (mp.controladorJugadores._jugadores[player_local.id]) {
            let jug = mp.controladorJugadores._jugadores[player_local.id];
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.sqlId = " + jug.sqlid_personaje);
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.nivel = " + jug.nivel_pj);
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.numeroTlf = " + jug.telefono);
            cef_menu.ejecutarCef(menu_cefId, "app.d.personaje.faccion = " + faccion);
            cef_menu.ejecutarCef(menu_cefId, "app.d.dimensiones.global = " + player_local.dimension);
            cef_menu.ejecutarCef(menu_cefId, "app.d.dimensiones.interior = " + en_interior);
            cef_menu.ejecutarCef(menu_cefId, "app.d.statsLoaded = true");
        }   
    }
}
//function listajugadores(jugadores) {
//    global_menu.enviaraCef(`app.jugadores = '${{ id: players.id, nombre: players.name }}'`);
//}
//# sourceMappingURL=menu.js.map
}