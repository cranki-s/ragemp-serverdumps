{
/* --------------------------------------------------------------------------------
 * autenticacion.js
 *
 * Autor: Kenshin
 *
 * Descripción: Registra el evento que el servidor invoca para mostrarle al usuario
 * la página de autenticación para ingresar las credenciales de su usuario y poder
 * conectarse al servidor de juego.
 *
 * -------------------------------------------------------------------------------- */

var floodbotonaut = 0;
var floodbotonpj = 0;
var nuevo = false;

var autenticacion_cefId = -1;
var navCarga = null;
var navAuth = null;

let camaraAuth = null;
let recordarLogin = false;
let autologin = false;
let launcher = false;


// Cargamos unos valores default por si no los tuviera
if(!mp.storage.data.options) {
    mp.storage.data.options = { 
        efectosAudio: true, 
        hudNivel: true,
        hudPremium: false, 
        hudStreamer: false,
        hudDinero: true, 
        hudAutobuses: true,
        hudTaxi: true, 
        hudRadio: true,
        hudHambre: true, 
        hudSed: true,
        hudId: true, 
        hudOrientacion: true,
        hudUbicacion: true, 
        hudInventario: true,
        hudTeclas: true,
        hudVehiculo: true,
        hudColorNativeUI: "Azul",
        nametags: true,
        nametagsIds: true,
        nametagsConocidos: true,
    };
    mp.storage.flush();
} else {
    // Si existen valores de opciones, y no tienen el valor contrario a su por defecto entonces forzamos por defecto
    // Por ejemplo si "efectosAudio" por defecto es true y ya tenemos almacenado que es true, null o undefined entonces le forzamos su por defecto que es true
    // Pero si tenemos almacenado que es false, entonces no lo tocamos y mantenemos false, que es la configuracion que ha escogido el usuario para esa opcion
    if (mp.storage.data.options.efectosAudio !== false){
        mp.storage.data.options.efectosAudio = true;
    }
    if (mp.storage.data.options.hudNivel !== false){
        mp.storage.data.options.hudNivel = true;
    }
    if (mp.storage.data.options.hudPremium !== true){
        mp.storage.data.options.hudPremium = false;
    }
    if (mp.storage.data.options.hudStreamer !== true){
        mp.storage.data.options.hudStreamer = false;
    }
    if (mp.storage.data.options.hudDinero !== false){
        mp.storage.data.options.hudDinero = true;
    }
    if (mp.storage.data.options.hudAutobuses !== false){
        mp.storage.data.options.hudAutobuses = true;
    }
    if (mp.storage.data.options.hudTaxi !== false){
        mp.storage.data.options.hudTaxi = true;
    }
    if (mp.storage.data.options.hudRadio !== false){
        mp.storage.data.options.hudRadio = true;
    }
    if (mp.storage.data.options.hudHambre !== false){
        mp.storage.data.options.hudHambre = true;
    }
    if (mp.storage.data.options.hudId !== false){
        mp.storage.data.options.hudId = true;
    }
    if (mp.storage.data.options.hudOrientacion !== false){
        mp.storage.data.options.hudOrientacion = true;
    }
    if (mp.storage.data.options.hudUbicacion !== false){
        mp.storage.data.options.hudUbicacion = true;
    }
    if (mp.storage.data.options.hudInventario !== false){
        mp.storage.data.options.hudInventario = true;
    }
    if (mp.storage.data.options.hudTeclas !== false){
        mp.storage.data.options.hudTeclas = true;
    }
    if (mp.storage.data.options.hudVehiculo !== false){
        mp.storage.data.options.hudVehiculo = true;
    }
    if (typeof mp.storage.data.options.hudColorNativeUI !== "string"){
        mp.storage.data.options.hudColorNativeUI = "Azul";
    }
    if (mp.storage.data.options.nametags !== false){
        mp.storage.data.options.nametags = true;
    }
    if (mp.storage.data.options.nametagsIds !== false){
        mp.storage.data.options.nametagsIds = true;
    }
    if (mp.storage.data.options.nametagsConocidos !== false){
        mp.storage.data.options.nametagsConocidos = true;
    }
    mp.storage.flush();
}

//Una vez recibimos la info iniciamos la carga de recursos
mp.events.add('_kp', (_array) => {
    let array = JSON.parse(_array);

    apiUrl = array[0];
    apiKey = array[1];
    _k = array[2];
    puerto = array[3];
    puerto = typeof puerto !== "number" ? parseInt(puerto) : puerto;

    if (autenticacion_cefId > 0) {
        ejecutarCef(autenticacion_cefId, `app.establecerPuerto(${puerto})`);
    } else {
        const _i = setInterval(() => {
            if (autenticacion_cefId > 0) {
                ejecutarCef(autenticacion_cefId, `app.establecerPuerto(${puerto})`);
                clearInterval(_i);
            }
        }, 10);
    }

    navCarga = mp.browsers.new("package://LURP/cef/autenticacion/carga.html");
    if (navCarga != null) {
        navCarga.execute(`datosEncrypt("${apiKey}", "${_k}", ${puerto})`);
        setTimeout(() => {
            navCarga.execute(`cargarRecursos()`);
        }, 10);
    }
});

//1865.045, -1754.456, 205.8218
mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
player_local.position = new mp.Vector3(-1042.305, -2745.344, 21.35939);
player_local.freezePosition(true);

mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU
mp.game.invoke("0x98215325A695E78A", false); // setMouseCursorVisibleInMenus

//Comprobamos el autologin
if (mp.storage.data.authcode) {
    
    navAuth = mp.browsers.new("package://LURP/cef/autenticacion/authcode.html");
    if (navAuth != null) {
        navAuth.execute(`obtenerHash("${mp.storage.data.authcode}")`);
    }

    autologin = true;
}
else
{
    if (mp.storage.data.autologin) {
        setTimeout(function () {
            mp.events.callRemote('autologin', mp.storage.data.autologin.hash);
        }, 1000);
        autologin = true;
    }
}

//Una vez recibido el hash de forma segura a traves del launcher
mp.events.add('autenticacion:autologin', (hash) => {
    setTimeout(function () {
        mp.events.callRemote('autologin2', hash);
    }, 1000);

    // if (navAuth && mp.browsers.exists(navAuth)) {
    //     navAuth.destroy();
    // }

    launcher = true;
});

//Una vez recibido el hash de forma segura a traves del launcher
mp.events.add('autenticacion:autologin:error', (hash) => {
    if (navAuth && mp.browsers.exists(navAuth)) {
        navAuth.destroy();
    }

    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "Ha ocurrido un error en el proceso de acceso automático, abortado intento.")`);
        ejecutarCef(autenticacion_cefId, `app.acceder()`);
    }

    delete mp.storage.data.authcode;
    mp.storage.flush();   

    autologin = false;
});

setTimeout(function () {
    if (autenticacion_cefId < 0) {
        autenticacion_cefId =  crearCef("package://LURP/cef/autenticacion/autenticacion.html", {
            mostrarCursor: true,
            puedeCerrar: false
        }, true);

        ejecutarCef(autenticacion_cefId, `app.establecerPuerto(${puerto})`);

        if(autologin)
        {
            ejecutarCef(autenticacion_cefId, `app.autologin()`);
        }
    }
}, 100);

//Registramos un usuario a traves del servidor, es algo que no compartio y nunca entendere el porque pero la mayoria de programadores me han obligado
mp.events.add('registrarUsuario', (usuario, correo, password, newsletter) => {
    mp.events.callRemote('registrar', correo, usuario, password, newsletter);
});

//Si el registro fue exitoso mostramos la puta pantalla de crear el personaje los huevos
mp.events.add('crear_personaje', () => {
    if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `app.crearPjSex()`);
    }
});
mp.events.add('registro:personaje', (nombre, apellido, edad, peso, altura, sexo) => {
    mp.events.callRemote('registro:personaje', nombre, apellido, edad, peso, altura, sexo);
});

mp.events.add('autenticarUsuario', (usuario, contrasena, recordar) => {
     
    recordarLogin = recordar;
    // Enviamos al servidor las credenciales para que compruebe si son correctas
    mp.events.callRemote('autenticacion', usuario, contrasena, recordar);
});
mp.events.add('autenticacion:recordar', (hash) => {
    mp.storage.data.autologin = { hash }; 
    mp.storage.flush();   
});
mp.events.add('twofactor', () => {
    if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `app.activarVerificacion()`);
    }
    else
    {
        autenticacion_cefId = crearCef("package://LURP/cef/autenticacion/autenticacion.html", {
            mostrarCursor: true,
            puedeCerrar: false
        });

        ejecutarCef(autenticacion_cefId, `app.activarVerificacion()`);
    }

    //abrirCef("package://LURP/cef/autenticacion/verificacion.html");
});
mp.events.add('verificacionfa', (codigo, recordar) => {
    // Enviamos al servidor las credenciales para que compruebe si son correctas
    mp.events.callRemote('twofactor', codigo, recordar, recordarLogin);    
});
mp.events.add('desconectarUsuario', () => {
    if (mp.storage.data?.autologin?.hash) {
        mp.events.callRemote('desconectar', mp.storage.data.autologin.hash);
    }
    
    delete mp.storage.data.autologin;
    mp.storage.flush();   
});
mp.events.add('limpiarAutologin', () => {
    delete mp.storage.data.authcode;
    mp.storage.flush();   
});
mp.events.add('personajes', (array) => {

    logueado = true;

    const personajes_array = JSON.parse(array);
    if (personajes_array === null) {
        if (existeCef(autenticacion_cefId)) {
            ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "Todavía no tienes ningún personaje creado. Crealos en el manager.")`);
        }
        return;
         
    }
    if (personajes_array.length === 0) {
        if (existeCef(autenticacion_cefId)) {
            ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "Todavía no tienes ningún personaje creado. Crealos en el manager.")`);
        }
        return;
    }

    if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {

        ejecutarCef(autenticacion_cefId, `app.limitePersonajes = ${personajes_array[0]}`);

        for (var i = 1; i < personajes_array.length; i += 5) {
             //personajes_array[i + 3] - genero 0 masculino 1 femenino
             //personajes_array[i + 4] - ck (esto es para mostrar los personajes que tengan el ck a 1 en un color obscurecido o en rojo indicandoles que han sufrido un CK) en formato bool

            ejecutarCef(autenticacion_cefId, `app.agregarPersonaje("${personajes_array[i]}", "${personajes_array[i + 1]}", "${personajes_array[i + 2]}", "${personajes_array[i + 3]}", ${personajes_array[i + 4]})`);
        }
        ejecutarCef(autenticacion_cefId, `app.activarPersonajes()`);
    }
    else
    {
        autenticacion_cefId = crearCef("package://LURP/cef/autenticacion/autenticacion.html", {
            mostrarCursor: true,
            puedeCerrar: false
        });

        for (var i = 0; i < personajes_array.length; i += 5) {
            //personajes_array[i + 3] - genero 0 masculino 1 femenino
            //personajes_array[i + 4] - ck (esto es para mostrar los personajes que tengan el ck a 1 en un color obscurecido o en rojo indicandoles que han sufrido un CK) en formato bool

            ejecutarCef(autenticacion_cefId, `app.agregarPersonaje("${personajes_array[i]}", "${personajes_array[i + 1]}", "${personajes_array[i + 2]}", "${personajes_array[i + 3]}", ${personajes_array[i + 4]})`);
       }
       ejecutarCef(autenticacion_cefId, `app.activarPersonajes()`);
    }
 });
 mp.events.add('personaje_elegido', (personaje_id, personalizado) => {
     

    //  if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
    //     cerrarCef(autenticacion_cefId, false);
    //     autenticacion_cefId = -1;
    // }
    
    if (personalizado == 1) {
        mp.events.callRemote('jugar_personaje', personaje_id);
    }
    else 
    {
        nuevo = true;

        if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
            cerrarCef(autenticacion_cefId, false, false, false);
            autenticacion_cefId = -1;
        }

        mp.events.callRemote('jugar_personaje', personaje_id);
    }
     
 });
 mp.events.add("autenticacion:carga:cerrar", () => {
    if (navCarga && mp.browsers.exists(navCarga)) {
        navCarga.destroy();
    }
 })
mp.events.add('error_registro', (error) => {
    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "${error}")`);
        ejecutarCef(autenticacion_cefId, `app.crearCuenta()`);
    }
});
mp.events.add('error_personaje', (error) => {
    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "${error}")`);
        ejecutarCef(autenticacion_cefId, `app.crearPjnoGenero()`);
    }
});
mp.events.add('autenticacion:noty', (type, error) => {
    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("${type}", 10000, "${error}")`);
    }
});
 mp.events.add('error_autologin', (error) => {
    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "${error}")`);
        ejecutarCef(autenticacion_cefId, `app.acceder()`);
    }
    delete mp.storage.data.autologin;
    mp.storage.flush();  
    
    autologin = false;
 });
 mp.events.add('error_autenticacion', (error) => {
    if (existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `sendNoty("danger", 10000, "${error}")`);
        ejecutarCef(autenticacion_cefId, `app.acceder()`);
    }
 });
 mp.events.add('autenticacion:claves', array => {
    var datos_array = JSON.parse(array);
    apiUrl = datos_array[0];
    apiKey = datos_array[1];
    _k = datos_array[2];
    personaje_id = datos_array[3];
 });
 mp.events.add('autenticacion:conectado', conectado);

function conectado(array) {

    logueado = true;
    
        /* 
    Me gustaría dar una explicación sobre esto.
    Según el ruso, es algo compartido, es decir, el juego soporta 102 entidades ENTRE JUGADORES Y PEDS. Por ello, se debe ajustar para que no supere
    esos 102. Esperemos que en el futuro esto se arregle y solo se deba tocar estos números. Hasta entonces, es lo más aconsejable dejarlo en 100 (dejamos 2 por si acaso,
    ya que si se invoca por nativo un Ped, ignora totalmente esto.).
    15-10-2021: El puto ruso no se para que coño hace mp.players.maxStreamed, porque no hace una puta mierda. Sacado en claro que si excede el numero de entidades sea con peds/jugadores, va a cargar por radio.
    Ya, a partir de aqui, sacamos en claro que los crasheos, finalmente, no son por entidades.
    */
    //mp.peds.maxStreamed = 100; // Limita el número de peds.

    if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
        ejecutarCef(autenticacion_cefId, `app.cargandoPersonaje()`);
    }

    let tiempoTimeout = 2000;
    mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

    if(!personalizando)
    {
        player_local.freezePosition(true);
        player_local.setInvincible(true);
        player_local.setVisible(false, false);
        tiempoTimeout = 15000;
    }else{
        personalizando = false;
        player_local.clearTasks();
    }

    try {
        // Sincronizamos los jugadores ya conectados
        mp.players.forEach(
            (player) => {
                if (player.hasVariable("JUGADOR")) {
                    let _v = player.getVariable("JUGADOR");
                    if (typeof _v === "string") {
                        let v = JSON.parse(_v);
                        mp.controladorJugadores._jugadores[player.id] = v;

                        if (v.objetos)
                            mp.controladorJugadores.objetos.establecerObjetos(player, v.objetos);
                    }
                }
                if(player.hasVariable("ANIMACION")) {
                    if (player.getVariable("ANIMACION"))
                        mp.controladorJugadores.sincronizarAnimacion(player);
                }
            }
        );

        // Sincronizamos los vehiculos ya creados
        mp.vehicles.forEach(vehiculo => {
            mp.controladorVehiculos.establecerPropiedades(vehiculo, true);
        });

        // Sincronizamos los objetos en el suelo
        mp.objects.forEach(objeto => {
            if (objeto.hasVariable("OBJETO")) {
                let d = objeto.getVariable("OBJETO");

                if (d) {
                    if (objetosSuelo.hasOwnProperty(objeto.id)) delete objetosSuelo[objeto.id];

                    if (objeto.labelSuelo && mp.labels.exists(objeto.labelSuelo)) {
                        objeto.labelSuelo.destroy();
                        objeto.labelSuelo = null;
                    }

                    try {
                        let valueJson = JSON.parse(d);
                        objetosSuelo[objeto.id] = { sqlid: (valueJson[0] ? valueJson[0] : -1), pos: objeto.position, dimension: objeto.dimension, nombre: (valueJson[1] ? valueJson[1] : "") };
                        objeto.notifyStreaming = true;
                    } catch (e) { }
                }
            }
        });

    } catch (e) {
        console.log("Error autenticacion " + e);
    }

    mp.gui.chat.show(true);
    if(tipoMapa != 2) mp.game.ui.displayRadar(true);
    mp.gui.chat.activate(true);

    const datos_array = JSON.parse(array);

    _NOSV = opciones.variables.NSV;
    id_pj = datos_array[0];
    nombre_usuario = datos_array[1];
    nombre_pj = datos_array[2];
    nivel_pj = datos_array[3];
    mp.events.call("establecer_hambre", datos_array[4]);
    mp.events.call("establecer_sed", datos_array[5]);

    puntosrol_positivos = datos_array[6];
    puntosrol_negativos = datos_array[7];
/*     apiUrl = datos_array[8];
    apiKey = datos_array[9]; */
    personaje_id = datos_array[8];
    wsBranch = datos_array[21];

    let datosHud = {
        premium: false,
        nivel: datos_array[3],
        dinero: datos_array[9],
        hambre: datos_array[4],
        sed: datos_array[5],
        id: datos_array[0],
        deservicio: datos_array[10],
        radio: datos_array[11],
        direccion: "",
        zona: "",
        calle: "",
    };

    mp.events.call("global:canalradio", datos_array[11]);
    mp.events.call("global:trabajos", datos_array[12]);
    mp.events.call("global:staff", datos_array[13]);
    //mp.events.call("cargar_multas", datos_array[16]);
    mp.events.call("cargar_inventario", datos_array[14]);
    mp.events.call("global:faccion", datos_array[15]);
    mp.events.call("act_dinero", datos_array[9]);
    mp.events.call("global:tiempopayday", datos_array[16]);
    mp.events.call("global:tiempoprision", datos_array[17]);
    /* _k = datos_array[25]; */
    //nivelAdmin = datos_array[18];
    mp.events.call("global:vikens", datos_array[18]);
    mp.events.call("global:jugador:negocios", datos_array[19]);
    mp.events.call("global:jugador:propiedades", datos_array[20]);   
    
    teclasExtra = datos_array[22];
    inventarioExtra = datos_array[23];

    cargarEstiloDeCaminar();

   if (mp.storage.data.personajes) {
       if (mp.storage.data.personajes[personaje_id]) {
           var tamano_chat = mp.storage.data.personajes[personaje_id].tamanoChat;
           var tiempo_chat = mp.storage.data.personajes[personaje_id].tiempoChat;
           mp.events.call("ajustarTiempoChat", tiempo_chat);
           mp.events.call("ajustarTamanoChat", tamano_chat);
           mostrar_texto_cabeza = mp.storage.data.personajes[personaje_id].textoCabeza;
           mostrar_texto_objetos = mp.storage.data.personajes[personaje_id].textoObjetos;
           tipoMapa = mp.storage.data.personajes[personaje_id].tipoMapa;
       }
       else {
           mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": null, };

           var tamano_chat = 12;
           var tiempo_chat = 40;
           mostrar_texto_cabeza = true;
           mostrar_texto_objetos = true;
       }
   }
   else
   {
      mp.storage.data.personajes = { personaje_id };
      mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": null, };

      var tamano_chat = 12;
      var tiempo_chat = 40;
      mostrar_texto_cabeza = true;
      mostrar_texto_objetos = true;
   }

   setTimeout(function () {
        cerrarCef(autenticacion_cefId, false);
        autenticacion_cefId = -1;

        blockGuion = false;

        player_local.freezePosition(false);
        mp.events.call("hud:mostrar_hud", JSON.stringify(datosHud));
        mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");        
            
        //Actualizamos los objetos que tenemos en la mano y teclas de accion rapidas
        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
        setTimeout(function () {
            mp.events.remove('autenticacion:conectado', conectado);
        }, 100);

        player_local.freezePosition(false);
        player_local.setInvincible(false);
        player_local.setVisible(true, false);

        mp.events.callRemote('autofix_spawn');
        mp.events.callRemote('jugador:visible', true);

        //Finalmente si tiene configuracion local la seteamos para ponerlo en su sitio deseado
        if (mp.storage.data.chat) {
            if (mp.storage.data.chat.position) {
                mp.events.call("chat:setPosition", mp.storage.data.chat.position.left, mp.storage.data.chat.position.top);
            }
            if (mp.storage.data.chat.size) {
                mp.events.call("chat:setSize", mp.storage.data.chat.size.width, mp.storage.data.chat.size.height);
            }
        }

        //Asignamos la configuracion personalizada guardada en local
        mp.events.call("hud:mostrar_ocultar", "hudNivel", mp.storage.data.options.hudNivel);
        mp.events.call("hud:mostrar_ocultar", "hudPremium", mp.storage.data.options.hudPremium);
        mp.events.call("hud:mostrar_ocultar", "hudStreamer", mp.storage.data.options.hudStreamer);
        mp.events.call("hud:mostrar_ocultar", "hudDinero", mp.storage.data.options.hudDinero);
        mp.events.call("hud:mostrar_ocultar", "hudAutobuses", mp.storage.data.options.hudAutobuses);
        mp.events.call("hud:mostrar_ocultar", "hudTaxi", mp.storage.data.options.hudTaxi);
        mp.events.call("hud:mostrar_ocultar", "hudRadio", mp.storage.data.options.hudRadio);
        mp.events.call("hud:mostrar_ocultar", "hudHambre", mp.storage.data.options.hudHambre);
        mp.events.call("hud:mostrar_ocultar", "hudSed", mp.storage.data.options.hudSed);
        mp.events.call("hud:mostrar_ocultar", "hudId", mp.storage.data.options.hudId);

        if (tipoMapa < 2) {
            mp.events.call("hud:mostrar_ocultar", "hudOrientacion", mp.storage.data.options.hudOrientacion);
            mp.events.call("hud:mostrar_ocultar", "hudUbicacion", mp.storage.data.options.hudUbicacion);
        }
        
        mp.events.call("hud:mostrar_ocultar", "hudInventario", mp.storage.data.options.hudInventario);
        mp.events.call("hud:mostrar_ocultar", "hudTeclas", mp.storage.data.options.hudTeclas);
        mp.events.call("hud:mostrar_ocultar", "hudVehiculo", mp.storage.data.options.hudVehiculo);
        mp.events.call("menu:hudColorNativeUI", mp.storage.data.options.hudColorNativeUI);

        if (tipoMapa === 0) {
            mp.game.ui.displayRadar(true);
            mp.game.ui.setRadarBigmapEnabled(false, true);
            mp.game.ui.setRadarZoom(0.0);
            mp.events.call("hud:minimapa:ancho", 0);
        } else if (tipoMapa === 1) {
            mp.game.ui.setRadarBigmapEnabled(true, false);
            mp.game.ui.setRadarZoom(0.0);
            mp.events.call("hud:minimapa:ancho", 1);
        } else {
            mp.game.ui.displayRadar(false);
            mp.events.call("hud:minimapa:ancho", 2);
            mp.events.call("hud:mostrar_ocultar", "hudOrientacion", false);
            mp.events.call("hud:mostrar_ocultar", "hudUbicacion", false);
        }

        mp.events.call("hud:cargar_multas", personaje_id);
        mp.events.call("hud:teclasExtra", teclasExtra);
        mp.events.call("hud:actualizar_inventario");
        
    }, tiempoTimeout);

   mp.storage.flush();

    if (mostrar_texto_objetos) {
       mp.objects.forEachInStreamRange(entity => {
           if (objetosSuelo.hasOwnProperty(entity.id) && !entity.labelSuelo) {
               entity.labelSuelo = mp.labels.new("~y~" + objetosSuelo[entity.id].nombre + "\n~g~[X]~w~ para recoger", entity.position, { los: false, font: 6, drawDistance: 1.5, color: [255, 255, 255, 255], dimension: entity.dimension });
           }
       });
    }

    /*if (mp.storage.data.intro == undefined) {
        if (camaraAuth != null) {
            camaraAuth.setActive(false);
            mp.game.cam.renderScriptCams(false, true, 0, true, true);
            camaraAuth.destroy();
            camaraAuth = null;
        }

        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);

        mp.events.call("startWelcomeCutscene", 0, nombre_pj);
        mp.storage.data.intro = true;
    }
    else
    {*/

        /* if (camaraAuth != null) {
            let camara2 = mp.cameras.new('default', new mp.Vector3(player_local.position.x, player_local.position.y, player_local.position.z + 5000), new mp.Vector3(-90, 0, player_local.heading), 40);


            camara2.setActiveWithInterp(camaraAuth.handle, 12000, 1, 1);
            setTimeout(() => {
                mp.game.cam.renderScriptCams(false, true, 3000, true, true);
            }, 12100);

            setTimeout(() => {
                if (camaraAuth != null) {
                    camaraAuth.setActive(false);
                    mp.game.cam.renderScriptCams(false, true, 0, true, true);
                    if (mp.cameras.exists(camaraAuth)) {
                       camaraAuth.destroy();
                       camaraAuth = null;
                    }                     
                }
                if (camara2 != null) {
                    camara2.setActive(false);
                    mp.game.cam.renderScriptCams(false, true, 0, true, true);
                    if (mp.cameras.exists(camara2))
                       camara2.destroy();
                }
            }, 20000);
        } */
    //}

   //mp.game.invoke("0x17695002FD8B2AE0", "PM_PAUSE_HDR", "Test", true);
   mp.game.gxt.set("PM_PAUSE_HDR", opciones.variables.nombreServidor);

    if (opciones.variables.voz)
        mp.voiceChat.muted = true;
    //Evitamos que entren con el tamaño del chat a 0 y no lo vean, si alguien lo pone a 0 se lo ajustamos al tamaño default.
    if (tamano_chat == 0)
        tamano_chat = 12;
    tamanoChat = tamano_chat;
    tiempoChat = tiempo_chat;
    setTimeout(() => {
        chatbox.execute(`tamanoChat('${tamano_chat}')`);
        chatbox.execute(`tiempoChat('${tiempo_chat}')`);
    }, 1000);

    player_local.removeHelmet(true);
    player_local.setHelmet(false);

    //mp.game.invoke("0x4A3DC7ECCC321032", player_local, 0.2);
    //mp.game.invoke("0xAE540335B4ABC4E2", player_local, 0.2);
   //  mp.game.invoke("0xCE07B9F7817AADA3", player_local, 1.0);
    //mp.game.invoke("0x4757F00BC6323CFE", mp.game.joaat("weapon_bullpuprifle"), 0.1);
    //mp.game.invoke("0x4757F00BC6323CFE", mp.game.joaat("weapon_pistol50"), 1.49);

    if(!launcher)
    {
        var descripcion = nombre_pj + " (" + nivel_pj + ")";
        mp.discord.update(opciones.variables.nombreDiscord, descripcion);
    }
    
    player_local.setConfigFlag(429, true);
    player_local.setConfigFlag(35, false); //CASCO MOTO

    var statNames = ["SP0_STAMINA", "SP0_STRENGTH", "SP0_LUNG_CAPACITY", "SP0_WHEELIE_ABILITY", "SP0_FLYING_ABILITY", "SP0_SHOOTING_ABILITY", "SP0_STEALTH_ABILITY"];
    for (var _i = 0, statNames_1 = statNames; _i < statNames_1.length; _i++) {
        var stat = statNames_1[_i];
        mp.game.stats.statSetInt(mp.game.joaat(stat), 100, false);
    }
    //Comisaria
    var phIntID = mp.game.interior.getInteriorAtCoords(440.84, -983.14, 30.69);
    mp.game.interior.refreshInterior(phIntID);
    if (!nuevo) {
       /*setTimeout(function () {
            mp.events.call('moveSkyCamera', player_local, 'down');    
       }, 5000);*/
    }

   mp.players.local.freezePosition(false);

   //setTimeout(function () {
   //    let a = mp.controladorJugadores._jugadores[player_local.id];
   //    if (a && a.ropa) {
   //        for (let i = 0; i < a.ropa.length; i++) {
   //            player_local.setComponentVariation(a.ropa[i].slot, a.ropa[i].dibujable, a.ropa[i].color, a.ropa[i].paleta);
   //        }
   //    }

   //    // if (jugadoresRadio) { // sistemas/voz.js
   //    //     mp.players.forEach(p => {
   //    //         if (p != mp.players.local) {
   //    //             let b = mp.controladorJugadores._jugadores[p.id];
   //    //             if (b) {
   //    //                 if (!jugadoresRadio.hasOwnProperty(b.radio))
   //    //                     jugadoresRadio[b.radio] = [];

   //    //                 let idx = jugadoresRadio[b.radio].indexOf(p);
   //    //                 if (idx < 0) {
   //    //                     jugadoresRadio[b.radio].push(p);
   //    //                 }
   //    //             }
   //    //         }
   //    //     });
   //    // }
   //}, 5000);
}

mp.events.add('cerrarAutentificacion', () => {
    if (autenticacion_cefId >= 0 && existeCef(autenticacion_cefId)) {
        cerrarCef(autenticacion_cefId, false);
        autenticacion_cefId = -1;
    }
});

let interiores_chunksCodigoEsperados = 0;
let interiores_codigoClienteRecibido = "";
let interiores_chunksCodigoRecibidos = 0;
mp.events.add('autenticacion:interiores', (chunk) => {
    if (interiores_chunksCodigoEsperados <= 0) {
        interiores_chunksCodigoEsperados = chunk;
    } else {
        interiores_chunksCodigoRecibidos++;
        interiores_codigoClienteRecibido += chunk;

        if (interiores_chunksCodigoRecibidos == interiores_chunksCodigoEsperados) {
            interiores = JSON.parse(interiores_codigoClienteRecibido);
        }
    }
});
 //mp.game.graphics.startScreenEffect('SwitchSceneMichael', 5000, false);
 //var effect = 'SwitchSceneMichael';
 //# sourceMappingURL=autenticacion.js.map

}