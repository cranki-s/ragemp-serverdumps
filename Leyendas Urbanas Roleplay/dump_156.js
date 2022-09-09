{
///* --------------------------------------------------------------------------------
// * cargadores.js
// *
// *
// *
// * Descripción: Funciones varias para hacer funcionar los cargadores
// *
// * -------------------------------------------------------------------------------- */

var recargando = false;
var armas_cefId = -1;
var cef_armas = require("./LURP/cef.js");
var armaActiva = {
    id: 0,
    tipoObjeto: 0,
    cantidad: 0,
    hash: 0,
    totalBalas: 0,
    tipoCargador: 0
}
var armaRatonEncima = {
    id: -1,
    tipoObjeto: -1,
    cantidad: -1
}
var armaAnterior = {
    id: 0,
    tipoObjeto: 0,
    cantidad: 0
}

// Funcion que se ejecuta cuando se confirma el cambio de arma desde
// el servidor, debe hacer el cambio con armaEnEsperaServidor
// y resetear las variables pertinentes
var callbackEnEsperaServidor = null;
const DELTA_PULSACION_TAB = 300;

let avisoHackEnviado = false;

async function guardarBalasCargador() {
    bloqueado = true;
    mp.events.add('render', bloquearacciones);
    let municionCargador = player_local.getAmmoInClip(armaActiva.hash);
    let municionMaximaCargador = mp.game.weapon.getWeaponClipSize(armaActiva.hash);
    let municionRecargar = municionMaximaCargador - municionCargador;
    if (municionRecargar == 0) {
        bloqueado = false;
        mostrarAviso("danger", 5000, "Tu cargador ya está completo, ¿para qué lo vas a recargar?");
        return;
    }
    let municion = municionEnInventario(municionRecargar);
    let municionFinalCargador = 0;
    let municionTotal;
    if (municion) {
        if (municion.cantidad < municionRecargar) {
            municionFinalCargador = municionCargador + municion.cantidad;
            municionTotal = player_local.getWeaponAmmo(armaActiva.hash) + municionMaximaCargador - municionFinalCargador;
            if (!player_local.vehicle) {
                if (municionTotal >= mp.game.weapon.getWeaponClipSize(armaActiva.hash)) {
                    player_local.setWeaponAmmo(armaActiva.hash, municionTotal);
                    for (let i = 0; i < 50 && recargando == true; i++) {
                        await mp.game.waitAsync(50);
                    }
                    player_local.taskSwapWeapon(true);
                }
                crearTimeout(() => {
                    player_local.setAmmoInClip(armaActiva.hash, municionFinalCargador);
                }, 250)
            } else {
                player_local.setAmmoInClip(armaActiva.hash, municionFinalCargador);
            }
            municionRecargar = municion.cantidad
        }
        if (player_local.vehicle) {
            if (municionCargador == 0) {
                let municion = municionFinalCargador == 0 ? municionRecargar : municionFinalCargador;
                crearTimeout(() => {
                    mp.events.callRemote("arma:dararmavehiculo", armaActiva.tipoObjeto, municion);
                }, 100)
            } else {
                player_local.setAmmoInClip(armaActiva.hash, parseInt(municionCargador + municion.cantidad));
            }
            if (bloqueado) {
                bloqueado = false;
                mp.events.remove('render', bloquearacciones);
            }
        }
        armaActiva.cantidad = parseInt(municionCargador + municionRecargar);
        armaActiva.totalBalas -= municionRecargar;
        mp.events.callRemote("actualizar_cargador", armaActiva.id, municion.id, municionRecargar, armaActiva.cantidad);
    } else {
        if (bloqueado) {
            bloqueado = false;
            mp.events.remove('render', bloquearacciones);
        }
    }
}
function sacarArmaCargador(municionCargador = 0) {
    recargando = true;
    if (player_local.vehicle) {
        armaActiva.hash = player_local.weapon;
        player_local.setWeaponAmmo(armaActiva.hash, municionCargador);
        player_local.taskSwapWeapon(true);
        contarBalasCargadores(armaActiva.tipoCargador);
    } else {
        let cargador = armaActiva.tipoCargador;
        let totalBalas = 0;
        armaActiva.hash = player_local.weapon;
        totalBalas = mp.game.weapon.getWeaponClipSize(armaActiva.hash)
        totalBalas += contarBalasCargadores(cargador);
        if (totalBalas > mp.game.weapon.getWeaponClipSize(armaActiva.hash)) {
            player_local.setWeaponAmmo(armaActiva.hash, totalBalas);
            player_local.taskSwapWeapon(true);
        } else {
            player_local.setWeaponAmmo(armaActiva.hash, municionCargador);
        }
        crearTimeout(() => {
            player_local.setAmmoInClip(armaActiva.hash, municionCargador);
            recargando = false;
        }, 250)
    }
    armaActiva.cantidad = municionCargador;
}

mp.events.add("al_sacar_arma", (municionCargador) => {
    sacarArmaCargador(municionCargador);
})

mp.events.add("al_recoger_arma", (id, tipoObjeto, municionCargador) => {
    armaActiva.id = id;
    armaActiva.tipoObjeto = tipoObjeto;
    armaActiva.cantidad = municionCargador;
    armaActiva.tipoCargador = listaArmas[armaActiva.tipoObjeto].tipoCargador;
    guardado = false;
    if (player_local.vehicle) {
        armaActiva.hash = player_local.weapon;
        player_local.taskSwapWeapon(true);
        contarBalasCargadores(armaActiva.tipoCargador);
    } else {
        let totalBalas = 0;
        armaActiva.hash = player_local.weapon;
        totalBalas = mp.game.weapon.getWeaponClipSize(armaActiva.hash)
        totalBalas += contarBalasCargadores(armaActiva.tipoCargador);
        if (totalBalas > mp.game.weapon.getWeaponClipSize(armaActiva.hash)) {
            player_local.setWeaponAmmo(armaActiva.hash, totalBalas);
            player_local.taskSwapWeapon(true);
        } else {
            player_local.setWeaponAmmo(armaActiva.hash, municionCargador);
        }
        crearTimeout(() => {
            player_local.setAmmoInClip(armaActiva.hash, municionCargador);
        }, 250)
    }
})

// cell indica la celda donde guardamos el arma (en caso que guardemos), por defecto 0
mp.events.add("ruletaarmas:elegirarma", (id, tipoObjeto, cantidad, cell = 0) => {
    if (armaActiva.id == id || estaMuerto) return;
    if (player_local.isRagdoll()) return;

    if (id != 0) {
        if (armaActiva.id == 0) {
            // Queremos equipar un arma viniendo de tener equipados los puños Unarmed
            // Peticion al servidor para sacar del INVENTARIO a la MANO el arma especificada
            // armaEnEsperaServidor = arma que queremos sacar
            // Si no es posible nos quedamos con los puños

            mostrarArma = false;
            sacarArma(tipoObjeto);
            if(holsterEquipado() && listaArmas[tipoObjeto].holster == true){
                // Peticion sacar el arma especificada
                callbackEnEsperaServidor = (resultado) => {
                    if (!resultado) {
                        guardarArma(true);
                        return;
                    }

                    mostrarArma = false;

                    armaAnterior.id = armaActiva.id;
                    armaAnterior.cantidad = armaActiva.cantidad;
                    armaAnterior.tipoObjeto = armaActiva.tipoObjeto;

                    armaActiva.tipoObjeto = tipoObjeto;
                    armaActiva.id = id;
                    armaActiva.cantidad = cantidad;

                    if (listaArmas[armaActiva.tipoObjeto] != undefined) armaActiva.tipoCargador = listaArmas[armaActiva.tipoObjeto].tipoCargador;

                    callbackEnEsperaServidor = null;
                };

                mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: id, cantidad: cantidad, guardar: false, celda: 0}));
            }else{
                mostrarOcultarArma().then(_ => {
                    // Peticion sacar el arma especificada
                    // EN CONFIRMACION
                    callbackEnEsperaServidor = (resultado) => {
                        if (!resultado) {
                            guardarArma(true);
                            return;
                        }

                        mostrarArma = false;

                        armaAnterior.id = armaActiva.id;
                        armaAnterior.cantidad = armaActiva.cantidad;
                        armaAnterior.tipoObjeto = armaActiva.tipoObjeto;

                        armaActiva.tipoObjeto = tipoObjeto;
                        armaActiva.id = id;
                        armaActiva.cantidad = cantidad;

                        if (listaArmas[armaActiva.tipoObjeto] != undefined) armaActiva.tipoCargador = listaArmas[armaActiva.tipoObjeto].tipoCargador;

                        callbackEnEsperaServidor = null;
                    };
                    mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: id, cantidad: cantidad, guardar: false, celda: 0}));
                })
            }
        } else {
            // Queremos equipar un arma viniendo de tener otro arma equipada != Unarmed
            // 1. Peticion al servidor para desequipar el arma que tenemos actualmente
            // armaEnEsperaServidor = puños Unarmed
            // Si no es posible nos quedamos con la actual y punto
            // 2. Si es posible, peticion al servidor para equipar el arma que queriamos equipar
            // armaEnEsperaServidor = arma que queremos sacar
            // Si no es posible nos quedamos unarmed con los puños

            // Guarda el arma anterior y saca la nueva
            guardarArma();
            let hash = armaActiva.hash;
            if (hash == null || hash == undefined || !hash) hash = player_local.weapon;
            mostrarArma = false;
            if (holsterEquipado() && listaArmas[tipoObjeto].holster == true) {
                let municion = player_local.getAmmoInClip(hash);

                // Desequipamos el arma actual
                callbackEnEsperaServidor = (resultado) => {
                    if (!resultado) {
                        sacarArma(armaActiva.tipoObjeto, true);
                        return;
                    }

                    let armaOriginal = {
                        id: armaActiva.id,
                        cantidad: armaActiva.cantidad, 
                        tipoObjeto: armaActiva.tipoObjeto
                    };

                    armaAnterior.id = armaActiva.id;
                    armaAnterior.cantidad = armaActiva.cantidad;
                    armaAnterior.tipoObjeto = armaActiva.tipoObjeto;
                    
                    armaActiva.tipoObjeto = 0;
                    armaActiva.id = 0;
                    armaActiva.totalBalas = 0;
                    armaActiva.tipoCargador = 0;

                    bloquearControles().then(_ => {
                        // Solicitamos sacar el nuevo arma
                        callbackEnEsperaServidor = (resultado) => {
                            if (!resultado) {
                                guardarArma(true);
                                return;
                            }

                            armaAnterior.id = armaOriginal.id;
                            armaAnterior.cantidad = armaOriginal.cantidad;
                            armaAnterior.tipoObjeto = armaOriginal.tipoObjeto;

                            armaActiva.tipoObjeto = tipoObjeto;
                            armaActiva.id = id;
                            armaActiva.cantidad = cantidad;

                            if (listaArmas[armaActiva.tipoObjeto] != undefined) armaActiva.tipoCargador = listaArmas[armaActiva.tipoObjeto].tipoCargador;
                            mostrarArma = false;

                            callbackEnEsperaServidor = null;
                        };
                        sacarArma(tipoObjeto);
                        mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: id, cantidad: cantidad, guardar: false, celda: 0}));
                    })
                };
                mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: armaActiva.id, cantidad: municion, guardar: true, celda: cell}));
            } else {
                mostrarOcultarArma().then(_ => {
                    let municion = player_local.getAmmoInClip(hash);

                    // Desequipamos el arma actual
                    callbackEnEsperaServidor = (resultado) => {
                        if (!resultado) {
                            sacarArma(armaActiva.tipoObjeto, true);
                            return;
                        }

                        mostrarArma = false;

                        let armaOriginal = {
                            id: armaActiva.id,
                            cantidad: armaActiva.cantidad, 
                            tipoObjeto: armaActiva.tipoObjeto
                        };

                        armaAnterior.id = armaActiva.id;
                        armaAnterior.cantidad = armaActiva.cantidad;
                        armaAnterior.tipoObjeto = armaActiva.tipoObjeto;

                        armaActiva.tipoObjeto = 0;
                        armaActiva.id = 0;
                        armaActiva.totalBalas = 0;
                        armaActiva.tipoCargador = 0;

                        bloquearControles().then(_ => {
                            // Solicitamos sacar el nuevo arma
                            callbackEnEsperaServidor = (resultado) => {
                                if (!resultado) {
                                    guardarArma(true);
                                    return;
                                }

                                armaAnterior.id = armaOriginal.id;
                                armaAnterior.cantidad = armaOriginal.cantidad;
                                armaAnterior.tipoObjeto = armaOriginal.tipoObjeto;

                                armaActiva.tipoObjeto = tipoObjeto;
                                armaActiva.id = id;
                                armaActiva.cantidad = cantidad;

                                if (listaArmas[armaActiva.tipoObjeto] != undefined) armaActiva.tipoCargador = listaArmas[armaActiva.tipoObjeto].tipoCargador;
                                mostrarArma = false;

                                callbackEnEsperaServidor = null;
                            };
                            sacarArma(tipoObjeto);
                            mostrarOcultarArma().then(_ => {
                                mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: id, cantidad: cantidad, guardar: false, celda: 0}));
                            })
                        })
                    };
                    mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: armaActiva.id, cantidad: municion, guardar: true, celda: cell}));
                })
            }
        }
    } else {
        // Queremos guardar el arma actual y dejar los puños Unarmed
        // Peticion al servidor para desequipar el arma actual
        // armaEnEsperaServidor = puños Unarmed
        // Si no es posible nos quedamos con la que tenemos equipada actualmente

        // Guarda el arma y deja los puños
        if (armaActiva.id == 0) return;
        guardarArma();
        mostrarArma = false;
        mostrarOcultarArma().then(_ => {
            let hash = armaActiva.hash;
            if (hash == null || hash == undefined || !hash) hash = player_local.weapon;
            let municion = player_local.getAmmoInClip(hash);

            callbackEnEsperaServidor = (resultado) => {
                // debemos puentear el resultado de este callback
                // al inventario por si hemos movido el arma con el inventario
                mp.events.call('inventario:onActionRequestCompletion', 'ruleta_armas_peticion.' + armaActiva.id, resultado);
                if (!resultado) {
                    sacarArma(armaActiva.tipoObjeto, true);
                    return;
                }

                armaAnterior.id = armaActiva.id;
                armaAnterior.cantidad = municion;
                armaAnterior.tipoObjeto = armaActiva.tipoObjeto;

                armaActiva.tipoObjeto = 0;
                armaActiva.id = 0;
                armaActiva.totalBalas = 0;
                armaActiva.tipoCargador = 0;

                callbackEnEsperaServidor = null;
            };
            mp.events.callRemote("ruletaarma:elegirarma", JSON.stringify({id: armaActiva.id, cantidad: municion, guardar: true, celda: cell}));
        })
    }
})

mp.events.add("ruletaarmas:confirmar_accion", resultado => {
    if (typeof callbackEnEsperaServidor === 'function')
        callbackEnEsperaServidor(resultado);
})

mp.events.add("ruletaarmas:ratonencima", (id, tipoObjeto, cantidad) => {
    armaRatonEncima.id = id;
    armaRatonEncima.tipoObjeto = tipoObjeto;
    armaRatonEncima.cantidad = cantidad;
})

mp.events.add("render", () => {
    mp.game.controls.disableControlAction(32, 37, true);
    mp.game.controls.disableControlAction(32, 99, true);
    mp.game.controls.disableControlAction(32, 100, true);
    mp.game.controls.disableControlAction(32, 115, true);
    mp.game.controls.disableControlAction(32, 116, true);
    mp.game.controls.disableControlAction(32, 157, true);
    mp.game.controls.disableControlAction(32, 158, true);
    mp.game.controls.disableControlAction(32, 159, true);
    mp.game.controls.disableControlAction(32, 160, true);
    mp.game.controls.disableControlAction(32, 161, true);
    mp.game.controls.disableControlAction(32, 162, true);
    mp.game.controls.disableControlAction(32, 163, true);
    mp.game.controls.disableControlAction(32, 164, true);
    mp.game.controls.disableControlAction(32, 165, true);
    mp.game.controls.disableControlAction(32, 261, true);
    mp.game.controls.disableControlAction(32, 262, true);
    mp.game.controls.disableControlAction(32, 192, true);
    mp.game.controls.disableControlAction(32, 204, true);
    mp.game.controls.disableControlAction(32, 211, true);
    mp.game.controls.disableControlAction(32, 349, true);
    //mp.game.controls.disableControlAction(32, 36, true); // Quita el modo sigilo del control

    if (armaActiva.id != 0) {
        if (player_local.isReloading()) {
            if (armaActiva.totalBalas == 0 && !avisoHackEnviado) {
                //mp.events.callRemote("antitrampas:enviarMensajeAdmin", "Recargando un arma sin balas en el cargador. Verificar antes de actuar.");
                avisoHackEnviado = true;
            }
            if (recargando == false && bloqueado == false) {
                bloqueado = true;
                mp.events.add('render', bloquearacciones);
                crearTimeout(() => {
                    recargando = true;
                    guardarBalasCargador();
                }, 200)
            }
        } else {
            if (recargando) {
                crearTimeout(() => {
                    bloqueado = false;
                    mp.events.remove('render', bloquearacciones);    
                    recargando = false;
                    avisoHackEnviado = false;
                }, 500)
            }
        }
    }

    // Comprobamos la pulsacion del tab para cambiar de arma
    // o abrir la ruleta
    // el cef debe estar cerrado
    if (armas_cefId < 0 && fechaPulsarTab > 0) {
        if (Date.now() - fechaPulsarTab > DELTA_PULSACION_TAB) {
            fechaPulsarTab = -1;
            armas_cefId = cef_armas.crearCef("package://LURP/cef/ruedaarmas/index.html", {
                mostrarCursor: false,
                puedeCerrar: false
            });
            mp.events.add("render", renderCamara);

            mp.game.invoke("0xFC695459D4D0E219", 0.489583, 0.4814814); // DOCUMENTACION AJAJJAJAJ (porcentaje en tanto por uno de la posicion respecto al 100%)
            crearTimeout(() => {
                if (armas_cefId > 0)
                    mp.gui.cursor.show(false, true);
            }, 100);
            cef_armas.ejecutarCef(armas_cefId, "cargarArmas('" + buscarArmasInventario() + "')");
        }
    }
})


function contarBalasCargadores(tipoCargador) {
    let totalBalas = 0;
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].tipoObjeto == tipoCargador) {
            if(enCasillaAccesoRapido(inventario[i].id)) totalBalas += inventario[i].cantidad; 
        }
    }
    if (listaArmas[armaActiva.tipoObjeto] != undefined){
        if (listaArmas[armaActiva.tipoObjeto].tipoCargador == tipoCargador) armaActiva.totalBalas = totalBalas;
    }
    return totalBalas;
}
// Tecla TAB
var fechaPulsarTab = -1;
mp.keys.bind(0x09, true, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (bloqueado) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;
    // if (setFloodboton(1000, "FB70") == false) return;
    if (armas_cefId < 0) {
        fechaPulsarTab = Date.now();
    }
});

mp.keys.bind(0x09, false, function () {
    if (bloqueado) return;
    if (modoBoxeo) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (fechaPulsarTab > 0) {
        const delta = Date.now() - fechaPulsarTab;
        if (delta <= DELTA_PULSACION_TAB) {
            if (armaActiva.id != 0 && !guardado) {
                if (setFloodboton(500, "FB70") == false) return;
                mp.events.call("ruletaarmas:elegirarma", 0, 0, 0);
            } else {
                if (armaAnterior.id != 0 && guardado) {
                    if (setFloodboton(500, "FB70") == false) return;
                    mp.events.call("ruletaarmas:elegirarma", armaAnterior.id, armaAnterior.tipoObjeto, armaAnterior.cantidad);
                }
            }
            fechaPulsarTab = -1;
            return;
        }
    }
    

    fechaPulsarTab = -1;
    if (armas_cefId >= 0) {
        if (armaRatonEncima.id != -1) {
            mp.events.call("ruletaarmas:elegirarma", armaRatonEncima.id, armaRatonEncima.tipoObjeto, armaRatonEncima.cantidad)
        }
        mp.events.remove("render", renderCamara);
        armaRatonEncima.id = -1;
        // mp.events.remove("render", renderCamara);
        cef_armas.cerrarCef(armas_cefId, false);
        mp.gui.cursor.show(false, false);
        armas_cefId = -1;
    }
});

function renderCamara() {
    mp.game.controls.disableControlAction(1, 1, true);
    mp.game.controls.disableControlAction(1, 2, true);
    mp.game.controls.disableControlAction(1, 3, true);
    mp.game.controls.disableControlAction(1, 4, true);
    mp.game.controls.disableControlAction(1, 5, true);
    mp.game.controls.disableControlAction(1, 6, true);
    mp.game.controls.disableControlAction(32, 24, true);
    mp.game.controls.disableControlAction(32, 257, true);
}

// Tecla R
mp.keys.bind(0x52, true, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (!player_local.vehicle) return;
    if (listaArmas[armaActiva.tipoObjeto] == undefined) return;
    if (listaArmas[armaActiva.tipoObjeto].tipoCargador == 0) return;
    if (setFloodboton(1000, "FB32") == false) return;

    guardarBalasCargador();
});

function buscarArmasInventario() {
    let totalArmas = [{
        id: 0,
        tipoObjeto: 0,
        nombre: "Desarmado",
        cantidad: 0,
        categoria: 0,
        imagen: "unarmed",
        balasCargadores: 0
    }];
    for (let i = 0; i < inventario.length; i++) {
        if (listaArmas[inventario[i].tipoObjeto] != undefined) {
            let activa = false;
            
            if (listaArmas[armaActiva.tipoObjeto] != undefined)
            {
                if (listaArmas[inventario[i].tipoObjeto].categoria == listaArmas[armaActiva.tipoObjeto].categoria) {
                    activa = true;
                }
            }
            
            let tipoObjetoI = inventario[i].tipoObjeto;
            let obj = {
                id: inventario[i].id,
                tipoObjeto: inventario[i].tipoObjeto,
                nombre: inventario[i].nombre,
                balasCargador: inventario[i].cantidad,
                categoria: listaArmas[tipoObjetoI].categoria,
                imagen: listaArmas[tipoObjetoI].imagen,
                balasCargadores: contarBalasCargadores(listaArmas[inventario[i].tipoObjeto].tipoCargador),
                activa: activa
            }
            if(inventario[i].id == armaActiva.id){
                totalArmas.unshift(obj);
            }else{
                totalArmas.push(obj);
            }
        }
    }
    return JSON.stringify(totalArmas);
}

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if (armaActiva.id == 0 && armaActiva.hash == 0) return;
    armaActiva.cantidad = player_local.getAmmoInClip(armaActiva.hash);
    if (listaArmas[armaActiva.tipoObjeto] == undefined) return;
    if (listaArmas[armaActiva.tipoObjeto].tipoCargador == 0) return;
    if (player_local.vehicle){
        if (player_local.getAmmoInClip(armaActiva.hash) <= 0) {
            recargando = true;
            guardarBalasCargador();
        }
    }else{
        if(player_local.getWeaponAmmo(armaActiva.hash) <= 0)
        {
            crearTimeout(() => {
                player_local.clearTasks();
            }, 500);
        }
    }
});

mp.events.add('refrescarArmas', () => {
    armaActiva.id = 0;
    armaActiva.tipoObjeto = 0;
    armaActiva.cantidad = 0;
    armaActiva.hash = 0;
    armaActiva.totalBalas = 0;
    armaActiva.tipoCargador = 0;
    guardado = true;
    bloqueado = false;
    mostrarArma = false;
})

function municionEnInventario(municionNecesaria) {
    if (inventario.length <= 0) {
        return null;
    }
    if(listaArmas[armaActiva.tipoObjeto] == undefined){
        return null;
    }
    let municionEnCargadores = []
    let cargadores = [];
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].tipoObjeto == listaArmas[armaActiva.tipoObjeto].tipoCargador) {
            if(enCasillaAccesoRapido(inventario[i].id))
            {
                cargadores.push(inventario[i]);
                municionEnCargadores.push(inventario[i].cantidad);
            } 
        }
    }
    municionEnCargadores.sort(function (a, b) {
        return a - b;
    });
    let closest = municionEnCargadores.sort((a, b) => Math.abs(municionNecesaria - a) - Math.abs(municionNecesaria - b))[0];

    for (let i = 0; i < cargadores.length; i++) {
        if (cargadores[i].cantidad == closest) {
            return cargadores[i];
        }
    }
    return null;
}

mp.events.add("tirar_cargador", (tipoObjeto, cantidad) => {
    if (tipoObjeto != armaActiva.tipoCargador) return;
    armaActiva.totalBalas -= cantidad;
    if (player_local.vehicle) return;
    player_local.setWeaponAmmo(armaActiva.hash, parseInt(player_local.getWeaponAmmo(armaActiva.hash) - cantidad));
})

mp.events.add("recoger_cargador", (tipoObjeto, cantidad) => {
    if (tipoObjeto != armaActiva.tipoCargador) return;
    armaActiva.totalBalas += cantidad;
    if (player_local.vehicle) return;
    player_local.setWeaponAmmo(armaActiva.hash, parseInt(player_local.getWeaponAmmo(armaActiva.hash) + cantidad));
})


const bloquearControles = () => {
    return new Promise(resolve => {
        let count = 0;
        const timer = setInterval(() => {
            count++;
            if (count == 10) bloqueado = false;
            if (bloqueado == false) {
                clearInterval(timer);
                resolve();
                count = 0;
            }
        }, 100)
    })
}

const mostrarOcultarArma = () => {
    return new Promise(resolve => {
        let count = 0;
        const timer = setInterval(() => {
            count++;
            if (count == 10) mostrarArma = true;
            if (mostrarArma == true) {
                mostrarArma = false;
                clearInterval(timer);
                resolve();
                count = 0;
            }
        }, 100)
    })
}

//  mp.events.add("playerCommand", (command) => {
//      const args = command.split(/[ ]+/);
//      const commandName = args[0];

//      args.shift();

//      if (commandName === "vars") {
//          mp.gui.chat.push("armaActiva: "+JSON.stringify(armaActiva));
//          mp.gui.chat.push("bloqueado: "+bloqueado);
//          mp.gui.chat.push("guardado: "+guardado);
//          mp.gui.chat.push("mostrarArma: "+mostrarArma);
//          mp.gui.chat.push("armaRatonEncima: "+JSON.stringify(armaRatonEncima));
//          mp.gui.chat.push("armaAnterior: "+JSON.stringify(armaAnterior));

//          mp.gui.chat.push("INFO" + armaActiva.id + " " + armaActiva.tipoObjeto + " " + armaActiva.cantidad + " " + armaActiva.hash + " " + armaActiva.totalBalas + " " + armaActiva.tipoCargador);
//      }
//  });
}