{
///* --------------------------------------------------------------------------------
// * menu.js
// *
// * Autor: Kenshin
// *
// * Descripción: Lista de inventario aparte del menu
// *
// * -------------------------------------------------------------------------------- */
var cef_inventario = require("./LURP/cef.js");

var inventario_cefId = -1;

let PedInventario = null;
let intervalPlayers = null;
let contenedor = null;
let maletero = null;
let maleteroNombre = "";
let guantera = null;
let guanteraNombre = "";
let taquilla = null;
let taquillaNombre = "";
let propiedad = null;
let idPedIlegal = null;
//invetory o invetory_old o invetory_new estos campos deben pasar siempre la ID de nuestro sistema indicando el lugar del inventario, actualmente:
//	-2 -> mano jugador, -1 -> suelo, 0 -> inventaro de un jugador, 1 -> inventario de un vehículo, 2 -> inventario propiedad, 3 -> accesorio puesto, 4 mascara puesta, 5 guantera, 6 gunrack, 7 incautado

// {
//     id: id,
//     cb: callback,
//     cefReqId: id
// }
var actionRequestPool = {};

mp.events.add(
   {
        "inventario:aviso": (array) => {  
            if (inventario_cefId >= 0) {
                let json_array = JSON.parse(array);
                if (json_array[0] <= 4) {
                    switch (json_array[0]) {
                        case 0:
                            mostrarAvisoInventario("success", json_array[1], json_array[2]);
                            break;
                        case 1:
                            mostrarAvisoInventario("danger", json_array[1], json_array[2]);
                            break;
                        case 2:
                            mostrarAvisoInventario("info", json_array[1], json_array[2]);
                            break;
                        case 3:
                            mostrarAvisoInventario("reward", json_array[1], json_array[2]);
                            break;
                        case 4:
                            mostrarAvisoInventario("admin", json_array[1], json_array[2]);
                            break;
                    }
                }
            }
            else
            {
                mp.events.call("hud:aviso", array);
            }
        },
        "inventario:addobjeto": (obj) => {
            if (inventario_cefId >= 0) {

                let index = null;
                
                if(obj.mano)
                {
                    index = "hand"; 
                }

                if(obj.mascara)
                {
                    index = "mask";
                } 
                
                if(obj.accesorio)
                {
                    switch(obj.slot)
                    {
                        case 0:
                            index = "hat";
                            break;
                        case 1:
                            index = "glass";
                            break;
                        case 2:
                            index = "ear";
                            break;
                        case 6:
                            index = "watch";
                            break;
                        case 7:
                            index = "wedding";
                            break;
                    }
                }
                
                if(index == null)
                {
                    index = obj.celdaInv;
                }

                let item = {
                    id: obj.id,
                    category: obj.categoria,
                    object: obj.tipoObjeto,
                    index: index,
                    amount: obj.cantidad,
                    name: obj.nombre,
                    component: obj.componente,
                    slot: obj.slot,
                };

                cef_inventario.ejecutarCef(inventario_cefId, "addItem('" + JSON.stringify(item).replace("'", "") + "')");
            }
        },
        "inventario:delobjeto": (id, extra) => {
            if (inventario_cefId >= 0) {
                if(extra)
                    cef_inventario.ejecutarCef(inventario_cefId, "delExtra(" + id + ")");
                else
                    cef_inventario.ejecutarCef(inventario_cefId, "delItem(" + id + ")");
            }
        },
        "inventario:mover_objeto": (inv_id, cell) => {
            const cefReqId = "inventario:mover_objeto." + inv_id;
            switch(cell)
            {
                case "hand":
                    regActionRequest({
                        id: "inventario_sacar." + inv_id,
                        cefReqId: cefReqId,
                    });
                    mp.events.callRemote("inventario_sacar", inv_id);
                    break;
                case "mask":
                    regActionRequest({
                        id: "inventario_mascara_poner." + inv_id,
                        cefReqId: cefReqId,
                        callback: resultado => {
                            if (resultado) {
                                setTimeout(() => {
                                    refreshPedInventario();
                                }, 500);
                            }
                        }
                    });
                    mp.events.callRemote("inventario_mascara_poner", inv_id);
                    break;
                case "hat":
                case "glass":
                case "ear":
                case "watch":
                case "wedding":
                    regActionRequest({
                        id: "inventario_accesorio_poner." + inv_id,
                        cefReqId: cefReqId,
                        callback: resultado => {
                            if (resultado) {
                                setTimeout(() => {
                                    refreshPedInventario();
                                }, 500);
                            }
                        }
                    });
                    mp.events.callRemote("inventario_accesorio_poner", inv_id);
                    break;
                default:
                    let mano = false;
                    let mascara = false;
                    let accesorio = false;
                    let arma = false;
                    for (let i = 0, n = inventario.length; i < n; i++) {
                        if (inventario[i].id == inv_id) {
                            if(inventario[i].mano)
                            {
                                mano = true;
                                if(inventario[i].categoria == 1) arma = true;
                            }
                            if(inventario[i].mascara)
                            {
                                mascara = true;
                            }
                            if(inventario[i].accesorio)
                            {
                                accesorio = true;
                            }
                            break;
                        }
                    }
                    
                    if(mano)
                    {
                        if (arma) {
                            // peticion inventario -> peticion ruleta -> confirmacion ruleta -> confirmacion inventario
                            // inventario_guardar.cell (inventario)
                            regActionRequest({
                                id: "ruleta_armas_peticion." + inv_id,
                                cefReqId: cefReqId
                            });

                            mp.events.call("ruletaarmas:elegirarma", 0, 0, 0, cell);
                        } else {
                            regActionRequest({
                                id: "inventario_guardar." + cell,
                                cefReqId: cefReqId,
                                callback: resultado => {
                                    if (resultado) {
                                        //ESTO DEBERIA IR EN LA CONFIRMACION PERO DE MIENTRAS LO PONGO AQUI
                                        for (let i = 0, n = inventario.length; i < n; i++) {
                                            if (inventario[i].id == inv_id) {
                                                inventario[i].celdaInv = cell;
                                                break;
                                            }
                                        }
                                    }
                                }
                            });

                            mp.events.callRemote("inventario_guardar", cell);
                        }

                        return;
                    }

                    if(mascara)
                    {
                        regActionRequest({
                            id: "inventario_mascara_quitar." + inv_id,
                            cefReqId: cefReqId,
                            callback: resultado => {
                                if (resultado) {
                                    setTimeout(() => {
                                        refreshPedInventario();
                                    }, 500);
                                }
                            }
                        });

                        mp.events.callRemote("inventario_mascara_quitar", inv_id);
                    }

                    if(accesorio)
                    {
                        regActionRequest({
                            id: "inventario_accesorio_quitar." + inv_id,
                            cefReqId: cefReqId,
                            callback: resultado => {
                                if (resultado) {
                                    setTimeout(() => {
                                        refreshPedInventario();
                                    }, 500);
                                }
                            }
                        });

                        mp.events.callRemote("inventario_accesorio_quitar", inv_id);
                        
                        // setTimeout(() => {
                        //     refreshPedInventario();
                        // }, 500);
                    }

                    regActionRequest({
                            id: "inventario_cambiar." + inv_id,
                            cefReqId: cefReqId,
                            callback: resultado => {
                                if (resultado) {

                                }
                            }
                        });

                    mp.events.callRemote("inventario_cambiar", inv_id, cell);
                    break;    
            }
        },
        "inventario:sacar_unidad_extra": (objeto) => {
            const cefReqId = "inventario:sacar_unidad_extra." + objeto;

            if(maletero != null)
            {
                regActionRequest({
                    id: "maletero_sacar_unidad." + objeto,
                    cefReqId: cefReqId
                });

                //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un maletero");
                    onActionRequestCompletion("maletero_sacar_unidad." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("maletero_sacar_unidad", maletero, objeto);
            }

            if (guantera != null)
            {
                regActionRequest({
                    id: "guantera_sacar_unidad." + objeto,
                    cefReqId: cefReqId
                });

                //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una guantera");
                    onActionRequestCompletion("guantera_sacar_unidad." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("guantera_sacar_unidad", guantera, objeto);
            }

            if(propiedad != null)
            {
                regActionRequest({
                    id: "propiedad_sacar_unidad." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una propiedad");
                    onActionRequestCompletion("propiedad_sacar_unidad." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("propiedad_sacar_unidad", objeto);
            }

            if (idPedIlegal != null) {
                regActionRequest({
                    id: "faccion_ped_sacar_item_unidad." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un ped");
                    onActionRequestCompletion("faccion_ped_sacar_item_unidad." + objeto, false);
                    return;
                }

                mp.events.callRemote("faccion:ped:sacar_item_unidad", idPedIlegal, objeto);
            }

            if(contenedor != null)
            {
                regActionRequest({
                    id: "contenedor_sacar_unidad." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un contenedor");
                    onActionRequestCompletion("contenedor_sacar_unidad." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("contenedor_sacar_unidad", contenedor, objeto);
            }

            if(taquilla != null)
            {
                regActionRequest({
                    id: "taquillas_sacar_unidad." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una taquilla");
                    onActionRequestCompletion("taquillas_sacar_unidad." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("taquillas_sacar_unidad", taquilla, objeto);
            }
        },

        "inventario:sacar_extra": (objeto, cell) => {
            const cefReqId = "inventario:sacar_extra." + objeto;
            if(maletero != null)
            {
                if (cell == "hand") {
                    regActionRequest({
                        id: "maletero_sacar_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un maletero")
                        onActionRequestCompletion("maletero_sacar_mano." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("maletero_sacar_mano", maletero, objeto, cell);
                } else {
                    regActionRequest({
                        id: "maletero_sacar." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un maletero")
                        onActionRequestCompletion("maletero_sacar." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("maletero_sacar", maletero, objeto, cell);
                }
            }

            if (guantera != null)
            {
                if (cell == "hand") {
                    regActionRequest({
                        id: "guantera_sacar_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un guantera")
                        onActionRequestCompletion("guantera_sacar_mano." + objeto, false);
                        return;
                    }

                    mp.events.callRemote("guantera_sacar_mano", guantera, objeto, cell);
                } else {
                    regActionRequest({
                        id: "guantera_sacar." + objeto,
                        cefReqId: cefReqId,
                    });
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un guantera")
                        onActionRequestCompletion("guantera_sacar." + objeto, false);
                        return;
                    }
                    mp.events.callRemote("guantera_sacar", guantera, objeto, cell);
                }
            }

            if(propiedad != null)
            {
                if(cell == "hand"){
                    regActionRequest({
                        id: "propiedad_sacar_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una propiedad");
                        onActionRequestCompletion("propiedad_sacar_mano." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("propiedad_sacar_mano", objeto);
                }else{
                    regActionRequest({
                        id: "propiedad_sacar." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una propiedad");
                        onActionRequestCompletion("propiedad_sacar." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("propiedad_sacar", objeto, cell);
                }
            }

            if (idPedIlegal != null) {
                if(cell == "hand") {
                    regActionRequest({
                        id: "faccion_ped_sacar_item_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Este objeto no se le puede dar al ped");
                        onActionRequestCompletion("faccion_ped_sacar_item_mano." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("faccion:ped:sacar_item_mano", idPedIlegal, objeto);
                }else{
                    regActionRequest({
                        id: "faccion_ped_sacar_item." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Este objeto no se le puede dar al ped");
                        onActionRequestCompletion("faccion_ped_sacar_item." + objeto, false);
                        return;
                    }
    
                    mp.events.callRemote("faccion:ped:sacar_item", idPedIlegal, objeto, cell);
                }
            }

            if (contenedor != null)
            {
                if (cell == "hand") {
                    regActionRequest({
                        id: "contenedor_sacar_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un contenedor")
                        onActionRequestCompletion("contenedor_sacar_mano." + objeto, false);
                        return;
                    }

                    mp.events.callRemote("contenedor_sacar_mano", contenedor, objeto, cell);
                } else {
                    regActionRequest({
                        id: "contenedor_sacar." + objeto,
                        cefReqId: cefReqId,
                    });
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un contenedor")
                        onActionRequestCompletion("contenedor_sacar." + objeto, false);
                        return;
                    }
                    mp.events.callRemote("contenedor_sacar", contenedor, objeto, cell);
                }
            }

            if (taquilla != null)
            {
                if (cell == "hand") {
                    regActionRequest({
                        id: "taquillas_sacar_mano." + objeto,
                        cefReqId: cefReqId,
                    });
    
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una taquilla")
                        onActionRequestCompletion("taquillas_sacar_mano." + objeto, false);
                        return;
                    }

                    mp.events.callRemote("taquillas_sacar_mano", taquilla, objeto, cell);
                } else {
                    regActionRequest({
                        id: "taquillas_sacar." + objeto,
                        cefReqId: cefReqId,
                    });
                    //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                    if(armaActiva.id == objeto){
                        mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una taquilla")
                        onActionRequestCompletion("taquillas_sacar." + objeto, false);
                        return;
                    }
                    mp.events.callRemote("taquillas_sacar", taquilla, objeto, cell);
                }
            }
        },
        "inventario:meter_extra": (objeto) => {
            const cefReqId = "inventario:meter_extra." + objeto;

            if(maletero != null)
            {
                regActionRequest({
                    id: "maletero_guardar." + objeto,
                    cefReqId: cefReqId,
                });

                //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un maletero");
                    onActionRequestCompletion("maletero_guardar." + objeto, false);
                    return;
                }
                mp.events.callRemote("maletero_guardar", maletero, objeto);
            }

            if(guantera != null)
            {
                regActionRequest({
                    id: "guantera_guardar." + objeto,
                    cefReqId: cefReqId,
                });

                //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un guantera");
                    onActionRequestCompletion("guantera_guardar." + objeto, false);
                    return;
                }
                mp.events.callRemote("guantera_guardar", guantera, objeto);
            }

            if(propiedad != null)
            {
                regActionRequest({
                    id: "propiedad_guardar." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una propiedad");
                    onActionRequestCompletion("propiedad_guardar." + objeto, false);
                    return;
                }
                mp.events.callRemote("propiedad_guardar", objeto);
            }

            if (idPedIlegal != null) {
                regActionRequest({
                    id: "faccion_ped_guardar_item." + objeto,
                    cefReqId: cefReqId,
                });

                if (armaActiva.id == objeto) {
                    mostrarAvisoInventario("danger", "5000", "No puedes darle este objeto al ped");
                    onActionRequestCompletion("faccion_ped_guardar_item." + objeto, false);
                    return;
                }
                
                mp.events.callRemote("faccion:ped:guardar_item", idPedIlegal, objeto);
            }

            if(contenedor != null)
            {
                regActionRequest({
                    id: "contenedor_guardar." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un contenedor");
                    onActionRequestCompletion("contenedor_guardar." + objeto, false);
                    return;
                }
                mp.events.callRemote("contenedor_guardar", contenedor, objeto);
            }

            if(taquilla != null)
            {
                regActionRequest({
                    id: "taquillas_guardar." + objeto,
                    cefReqId: cefReqId,
                });

                if(armaActiva.id == objeto){
                    mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una taquilla");
                    onActionRequestCompletion("taquillas_guardar." + objeto, false);
                    return;
                }
                mp.events.callRemote("taquillas_guardar", taquilla, objeto);
            }
        },
        "inventario:sacar_unidad": (objeto) => {
            const cefReqId = "inventario:sacar_unidad." + objeto;
            regActionRequest({
                id: "inventario_sacar_unidad." + objeto,
                cefReqId: cefReqId
            });
            mp.events.callRemote("inventario_sacar_unidad", objeto);
        },
        "empaquetar_objeto": function (id) {
            mp.events.callRemote("inventario_empaquetar", id);
        },
        "inventario:ceder_objeto": function (objeto, jugador) {
            const cefReqId = "inventario:ceder_objeto." + objeto;

            regActionRequest({
                id: "inventario_ceder_objeto." + objeto,
                cefReqId: cefReqId,
            });

            //Tengo dudas de si vamos a usarlo finalmente o no
            // aparentemente si mi pana :/
            if(armaActiva.id == objeto) {
                mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de cederla")
                onActionRequestCompletion("inventario_ceder_objeto." + objeto, false);
                return;
            }

            mp.events.callRemote("inventario_ceder_objeto", jugador, objeto);
        },
        "inventario:ceder_objeto_extra": function (objeto, jugador) {
            const cefReqId = "inventario:ceder_objeto_extra." + objeto;

            if(maletero != null)
            {
                regActionRequest({
                    id: "maletero_ceder_objeto." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("maletero_ceder_objeto", maletero, jugador, objeto);
            }

            if(guantera != null)
            {
                regActionRequest({
                    id: "guantera_ceder_objeto." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("guantera_ceder_objeto", guantera, jugador, objeto);
            } 
            
            if(propiedad != null)
            {
                regActionRequest({
                    id: "propiedad_ceder_objeto." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("propiedad_ceder_objeto", jugador, objeto);
            }

            if (idPedIlegal != null) {
                regActionRequest({
                    id: "faccion_ped_ceder_item." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("faccion:ped:ceder_item", idPedIlegal, jugador, objeto);
            }

            if(contenedor != null)
            {
                regActionRequest({
                    id: "contenedor_ceder_objeto." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("contenedor_ceder_objeto", contenedor, jugador, objeto);
            }

            if(taquilla != null)
            {
                regActionRequest({
                    id: "taquillas_ceder_objeto." + objeto,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("taquillas_ceder_objeto", taquilla, jugador, objeto);
            }
        },
        "meterobjetoMaletero": function (vehiculo, objeto) {
            //Cuando se abra el inventario deberiamos pasar este parametro para saber que arma esta en la mano, aunque puede que el propio array de objetos en su variable mano lo indique no se....
            if(armaActiva.id == objeto){
                mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en un maletero")
                return;
            }
            mp.events.callRemote("maletero_guardar", vehiculo, objeto);
        },
        "guardarPropiedad": function (objeto) {
            if(armaActiva.id == objeto){
                mostrarAvisoInventario("danger", "5000", "Guarda el arma antes de meterla en una propiedad")
                return;
            }
            mp.events.callRemote("propiedad_guardar", objeto);
        },
        "inventario:quitar_accesorio": function (objeto) {
            mp.events.callRemote("inventario_accesorio_quitar", objeto);
        },
        "inventario:quitar_mascara": function (objeto) {
            mp.events.callRemote("inventario_mascara_quitar", objeto);
        },
        "inventario:tirar_objeto": async (inv_id) => {
            const cefReqId = "inventario:tirar_objeto." + inv_id;

            let grados = 1.39626; // Radianes de rotacion segun el asiento ocupado
            let dimCorrecta = 0.2; // Ajuste a sumar segun el asiento ocupado
            if (player_local.vehicle) {
                let puedeTirar = puedeTirarObjeto();
                if (!puedeTirar.puede) {
                    if (puedeTirar.grados != 0) {
                        mostrarAvisoInventario("danger", 4000, "Tu puerta y ventanilla están cerradas");
                    }
                    else {
                        mostrarAvisoInventario("danger", 4000, "No puedes tirar objetos desde tu asiento");
                    }
                    return;
                }
                grados = puedeTirar.grados;
                dimCorrecta = puedeTirar.ajusteDim;
            }

            let modelo = null; // Modelo del objeto
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].id == inv_id) {
                    modelo = inventario[i].modeloTirar;
                    break;
                }
            }

            // Posicion y rotacion por defecto
            let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)
            let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
            let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

            // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
            if (modelo && modelo != -1 && modelo != 0) {
                let objeto = null; // Objeto temporal

                // Calculamos posicion "aleatoria" detras del jugador
                let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

                // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
                if (!mp.game.streaming.hasModelLoaded(modelo)) {
                    mp.game.streaming.requestModel(modelo);
                    let count = 0;
                    while (!mp.game.streaming.hasModelLoaded(modelo)) {
                        count++;
                        if (count >= 40) {
                            break;
                        }
                        await mp.game.waitAsync(10);
                    }
                }

                // Creamos el objeto temporal con alpha 0
                objeto = mp.objects.new(modelo, posDetras,
                    {
                        rotation: rotObj,
                        alpha: 0,
                        dimension: player_local.dimension
                    });

                // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
                let counter = 0;
                let intervalo_objeto = setInterval(() => {
                    if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                        clearInterval(intervalo_objeto);
                        intervalo_objeto = null;

                        position = player_local.getCoords(true);
                        position.z = position.z + 0.7; // Para permitir dejar objetos por encima de la cintura sin sobrepasar la altura del personaje
                        let direction = player_local.getForwardVector();

                        // Si esta en un vehiculo rotamos el punto de tirado los grados adecuados segun su asiento
                        if (player_local.vehicle) {
                            let dimCar = mp.game.gameplay.getModelDimensions(player_local.vehicle.model);
                            if (dimCar != undefined && dimCar != null) {
                                dimCorrecta += Math.abs(dimCar.max.x); // Dimension predefinida segun asiento + ancho maximo del vehiculo
                            }
                            else {
                                dimCorrecta += 0.5;
                            }

                            let directionAux = new mp.Vector3(direction.x * Math.cos(grados) - direction.y * Math.sin(grados), direction.x * Math.sin(grados) + direction.y * Math.cos(grados), direction.z);
                            var posEnfrente = new mp.Vector3((directionAux.x * dimCorrecta) + (position.x), (directionAux.y * dimCorrecta) + (position.y), (directionAux.z * dimCorrecta) + (position.z));

                            // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                            let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                            if (raycastPared != undefined) {
                                mostrarAvisoInventario("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                                limpiarHandleRaycast(raycastPared.entity);
                                return;
                            }
                        }
                        else {
                            let distTirar = 0.5;
                            if (player_local.hasVariable("ANIMACION")) {
                                let animTirar = player_local.getVariable("ANIMACION");
                                if (animTirar != null && animTirar[0] == 0 && animTirar[1] == "idle" && animTirar[2] == "anim@heists@box_carry@") {
                                    distTirar = 0.8;
                                }
                            }

                            var posEnfrente = new mp.Vector3((direction.x * distTirar) + (position.x), (direction.y * distTirar) + (position.y), (direction.z * distTirar) + (position.z));

                            // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                            let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                            if (raycastPared != undefined) {
                                mostrarAvisoInventario("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                                limpiarHandleRaycast(raycastPared.entity);
                                return;
                            }
                        }

                        // Como tiene espacio para tirar objeto le damos margen para calcular la altura final del objeto
                        posEnfrente.z = posEnfrente.z + 0.2;

                        // Raycast desde la posicion frente al jugador hasta la misma posicion con -1000 de altura
                        var raycast = mp.raycasting.testPointToPoint(posEnfrente, new mp.Vector3(posEnfrente.x, posEnfrente.y, posEnfrente.z - 1000.0), objeto, 19); // Colision con mapa, vehiculos y objetos
                        let tipoColision = -1;
                        let posColision = null;
                        if (raycast) { // Ha tocado algo
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                            let entidad = raycast.entity;
                            if (entidad != undefined && entidad != null) { // El resultado es válido
                                let tipo = entidad.type;
                                switch (tipo) {
                                    case 'vehicle': // colision con vehiculo
                                        tipoColision = 0;
                                        posColision = raycast.position;
                                        break;
                                    case 'object': // colision con objeto
                                        tipoColision = 1;
                                        posColision = raycast.position;
                                        break;
                                    default:
                                        if (tipo == undefined || tipo == null) { // colision con mapa
                                            tipoColision = 2;
                                            posColision = raycast.position;
                                            limpiarHandleRaycast(entidad);
                                        }
                                        break;
                                }
                            }
                        }
                        else {
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                        }

                        objeto.placeOnGroundProperly();
                        let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                        let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                        objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                        objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                        posObj = objeto.position;
                        rotObj = objeto.rotation;

                        // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                        if (tipoColision != -1) {
                            // Obtenemos altura del objeto por debajo de su eje
                            let dimZ = 0.0;
                            let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                            if (dimensiones != undefined && dimensiones != null) {
                                dimZ = Math.abs(dimensiones.min.z);
                            }

                            switch (tipoColision) {
                                case 0: // vehiculo
                                    posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                                    rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    break;
                                case 1: // objeto
                                    let aux1 = posColision.z - objeto.position.z;
                                    // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                                    if (aux1 > 0.1) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    }
                                    break;
                                case 2: // mapa
                                    let aux2 = posColision.z - objeto.position.z;
                                    // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                                    // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                                    if (aux2 > 0.2 || aux2 < -0.6) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        // Eliminamos el objeto temporal
                        objeto.destroy();

                        // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                        if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                            calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                            let posAux = player_local.getCoords(true);

                            posObj.x = posAux.x;
                            posObj.y = posAux.y;
                        }

                        regActionRequest({
                            id: "inventario_tirar." + inv_id,
                            cefReqId: cefReqId,
                        });

                        mp.events.callRemote("inventario_tirar", inv_id, posObj, rotObj);
                        return;
                    }
                    else {
                        counter++;
                        if (counter > 7) { // +- 75ms
                            clearInterval(intervalo_objeto);
                            intervalo_objeto = null;

                            // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                            if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                                calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                                let posAux = player_local.getCoords(true);

                                posObj.x = posAux.x;
                                posObj.y = posAux.y;
                            }

                            regActionRequest({
                                id: "inventario_tirar." + inv_id,
                                cefReqId: cefReqId,
                            });

                            mp.events.callRemote("inventario_tirar", inv_id, posObj, rotObj);
                            return;
                        }
                    }
                }, 10);
            }
            else {
                // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                    let posAux = player_local.getCoords(true);

                    posObj.x = posAux.x;
                    posObj.y = posAux.y;
                }

                regActionRequest({
                    id: "inventario_tirar." + inv_id,
                    cefReqId: cefReqId,
                });

                mp.events.callRemote("inventario_tirar", inv_id, posObj, rotObj);
            }
       },
       "inventario:tirar_objeto_extra": async (inv_id) => {
            const cefReqId = "inventario:tirar_objeto_extra." + inv_id;

            let grados = 1.39626; // Radianes de rotacion segun el asiento ocupado
            let dimCorrecta = 0.2; // Ajuste a sumar segun el asiento ocupado
            if (player_local.vehicle) {
                let puedeTirar = puedeTirarObjeto();
                if (!puedeTirar.puede) {
                    if (puedeTirar.grados != 0) {
                        mostrarAvisoInventario("danger", 4000, "Tu puerta y ventanilla están cerradas");
                    }
                    else {
                        mostrarAvisoInventario("danger", 4000, "No puedes tirar objetos desde tu asiento");
                    }
                    return;
                }
                grados = puedeTirar.grados;
                dimCorrecta = puedeTirar.ajusteDim;
            }

            let modelo = null; // Modelo del objeto
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].id == inv_id) {
                    modelo = inventario[i].modeloTirar;
                    break;
                }
            }

            // Posicion y rotacion por defecto
            let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)
            let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
            let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

            // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
            if (modelo && modelo != -1 && modelo != 0) {
                let objeto = null; // Objeto temporal

                // Calculamos posicion "aleatoria" detras del jugador
                let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

                // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
                if (!mp.game.streaming.hasModelLoaded(modelo)) {
                    mp.game.streaming.requestModel(modelo);
                    let count = 0;
                    while (!mp.game.streaming.hasModelLoaded(modelo)) {
                        count++;
                        if (count >= 40) {
                            break;
                        }
                        await mp.game.waitAsync(10);
                    }
                }

                // Creamos el objeto temporal con alpha 0
                objeto = mp.objects.new(modelo, posDetras,
                    {
                        rotation: rotObj,
                        alpha: 0,
                        dimension: player_local.dimension
                    });

                // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
                let counter = 0;
                let intervalo_objeto = setInterval(() => {
                    if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                        clearInterval(intervalo_objeto);
                        intervalo_objeto = null;

                        position = player_local.getCoords(true);
                        position.z = position.z + 0.7; // Para permitir dejar objetos por encima de la cintura sin sobrepasar la altura del personaje
                        let direction = player_local.getForwardVector();

                        // Si esta en un vehiculo rotamos el punto de tirado los grados adecuados segun su asiento
                        if (player_local.vehicle) {
                            let dimCar = mp.game.gameplay.getModelDimensions(player_local.vehicle.model);
                            if (dimCar != undefined && dimCar != null) {
                                dimCorrecta += Math.abs(dimCar.max.x); // Dimension predefinida segun asiento + ancho maximo del vehiculo
                            }
                            else {
                                dimCorrecta += 0.5;
                            }

                            let directionAux = new mp.Vector3(direction.x * Math.cos(grados) - direction.y * Math.sin(grados), direction.x * Math.sin(grados) + direction.y * Math.cos(grados), direction.z);
                            var posEnfrente = new mp.Vector3((directionAux.x * dimCorrecta) + (position.x), (directionAux.y * dimCorrecta) + (position.y), (directionAux.z * dimCorrecta) + (position.z));

                            // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                            let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                            if (raycastPared != undefined) {
                                mostrarAvisoInventario("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                                limpiarHandleRaycast(raycastPared.entity);
                                return;
                            }
                        }
                        else {
                            var posEnfrente = new mp.Vector3((direction.x * 0.5) + (position.x), (direction.y * 0.5) + (position.y), (direction.z * 0.5) + (position.z));

                            // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                            let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                            if (raycastPared != undefined) {
                                mostrarAvisoInventario("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                                limpiarHandleRaycast(raycastPared.entity);
                                return;
                            }
                        }

                        // Como tiene espacio para tirar objeto le damos margen para calcular la altura final del objeto
                        posEnfrente.z = posEnfrente.z + 0.2;

                        // Raycast desde la posicion frente al jugador hasta la misma posicion con -1000 de altura
                        var raycast = mp.raycasting.testPointToPoint(posEnfrente, new mp.Vector3(posEnfrente.x, posEnfrente.y, posEnfrente.z - 1000.0), objeto, 19); // Colision con mapa, vehiculos y objetos
                        let tipoColision = -1;
                        let posColision = null;
                        if (raycast) { // Ha tocado algo
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                            let entidad = raycast.entity;
                            if (entidad != undefined && entidad != null) { // El resultado es válido
                                let tipo = entidad.type;
                                switch (tipo) {
                                    case 'vehicle': // colision con vehiculo
                                        tipoColision = 0;
                                        posColision = raycast.position;
                                        break;
                                    case 'object': // colision con objeto
                                        tipoColision = 1;
                                        posColision = raycast.position;
                                        break;
                                    default:
                                        if (tipo == undefined || tipo == null) { // colision con mapa
                                            tipoColision = 2;
                                            posColision = raycast.position;
                                            limpiarHandleRaycast(entidad);
                                        }
                                        break;
                                }
                            }
                        }
                        else {
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                        }

                        objeto.placeOnGroundProperly();
                        let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                        let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                        objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                        objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                        posObj = objeto.position;
                        rotObj = objeto.rotation;

                        // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                        if (tipoColision != -1) {
                            // Obtenemos altura del objeto por debajo de su eje
                            let dimZ = 0.0;
                            let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                            if (dimensiones != undefined && dimensiones != null) {
                                dimZ = Math.abs(dimensiones.min.z);
                            }

                            switch (tipoColision) {
                                case 0: // vehiculo
                                    posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                                    rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    break;
                                case 1: // objeto
                                    let aux1 = posColision.z - objeto.position.z;
                                    // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                                    if (aux1 > 0.1) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    }
                                    break;
                                case 2: // mapa
                                    let aux2 = posColision.z - objeto.position.z;
                                    // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                                    // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                                    if (aux2 > 0.2 || aux2 < -0.6) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        // Eliminamos el objeto temporal
                        objeto.destroy();

                        // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                        if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                            calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                            let posAux = player_local.getCoords(true);

                            posObj.x = posAux.x;
                            posObj.y = posAux.y;
                        }

                        if(maletero != null)
                        {
                            regActionRequest({
                                id: "maletero_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("maletero_tirar", maletero, inv_id, posObj, rotObj);
                        }
                        else if (guantera != null)
                        {
                            regActionRequest({
                                id: "guantera_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("guantera_tirar", guantera, inv_id, posObj, rotObj);
                        }
                        else if(propiedad != null)
                        {
                            regActionRequest({
                                id: "propiedad_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("propiedad_tirar", inv_id, posObj, rotObj);
                        }
                        else if(idPedIlegal != null)
                        {
                            regActionRequest({
                                id: "ped_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("faccion:ped:tirar", idPedIlegal, inv_id, posObj, rotObj);
                        }
                        else if(contenedor != null)
                        {
                            regActionRequest({
                                id: "contenedor_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("contenedor_tirar", contenedor, inv_id, posObj, rotObj);
                        }
                        else if(taquilla != null)
                        {
                            regActionRequest({
                                id: "taquillas_tirar." + inv_id,
                                cefReqId: cefReqId
                            });
                            mp.events.callRemote("taquillas_tirar", taquilla, inv_id, posObj, rotObj);
                        }
                        return;
                    }
                    else {
                        counter++;
                        if (counter > 7) { // +- 75ms
                            clearInterval(intervalo_objeto);
                            intervalo_objeto = null;

                            // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                            if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                                calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                                let posAux = player_local.getCoords(true);

                                posObj.x = posAux.x;
                                posObj.y = posAux.y;
                            }
                            else if(maletero != null)
                            {
                                regActionRequest({
                                    id: "maletero_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("maletero_tirar", maletero, inv_id, posObj, rotObj);
                            }
                            else if (guantera != null) {
                                regActionRequest({
                                    id: "guantera_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("guantera_tirar", guantera, inv_id, posObj, rotObj);
                            }
                            else if(propiedad != null)
                            {
                                regActionRequest({
                                    id: "propiedad_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("propiedad_tirar", inv_id, posObj, rotObj);
                            }
                            else if(idPedIlegal != null)
                            {
                                regActionRequest({
                                    id: "ped_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("faccion:ped:tirar", idPedIlegal, inv_id, posObj, rotObj);
                            }
                            else if (contenedor != null) {
                                regActionRequest({
                                    id: "contenedor_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("contenedor_tirar", contenedor, inv_id, posObj, rotObj);
                            }
                            else if (taquilla != null) {
                                regActionRequest({
                                    id: "taquillas_tirar." + inv_id,
                                    cefReqId: cefReqId
                                });
                                mp.events.callRemote("taquillas_tirar", taquilla, inv_id, posObj, rotObj);
                            }
                            return;
                        }
                    }
                }, 10);
            }
            else {
                // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                    let posAux = player_local.getCoords(true);

                    posObj.x = posAux.x;
                    posObj.y = posAux.y;
                }

                if(maletero != null)
                {
                    regActionRequest({
                        id: "maletero_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("maletero_tirar", maletero, inv_id, posObj, rotObj);
                }
                else if (guantera != null) {
                    regActionRequest({
                        id: "guantera_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("guantera_tirar", guantera, inv_id, posObj, rotObj);
                }
                else if (propiedad != null)
                {
                    regActionRequest({
                        id: "propiedad_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("propiedad_tirar", inv_id, posObj, rotObj);
                }
                else if (idPedIlegal != null)
                {
                    regActionRequest({
                        id: "ped_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("faccion:ped:tirar", idPedIlegal, inv_id, posObj, rotObj);
                }
                else if (contenedor != null) {
                    regActionRequest({
                        id: "contenedor_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("contenedor_tirar", contenedor, inv_id, posObj, rotObj);
                }
                else if (taquilla != null) {
                    regActionRequest({
                        id: "taquillas_tirar." + inv_id,
                        cefReqId: cefReqId
                    });
                    mp.events.callRemote("taquillas_tirar", taquilla, inv_id, posObj, rotObj);
                }
                return;
            }
    },

    "inventario:regActionRequest": (accion, objetoId, ...args) => {
        logInfo('[client]  calling action ' + accion + ' with object ' + objetoId + ' and args ' + args);
        mp.events.call(accion, objetoId, ...args);
    },

    "inventario:onActionRequestCompletion": onActionRequestCompletion
   });

   function onActionRequestCompletion(id, result) {
        if (!actionRequestPool.hasOwnProperty(id)) return;
        const a = actionRequestPool[id];

        if (a.cefReqId && inventario_cefId >= 0) {
            cef_inventario.ejecutarCef(inventario_cefId, `onActionRequestCompletion('${a.cefReqId}', ${result})`);
        }

        if (typeof a.cb === "function") {
            logInfo('[client] completed action ' + id + ' -> ' + result.toString());
            a.cb(result);
        }

        delete actionRequestPool[id];
   }

function regActionRequest(reqObj) {
    if (actionRequestPool.hasOwnProperty(reqObj.id)) return;

    actionRequestPool[reqObj.id] = {
        id: reqObj.id,
        cb: reqObj.callback,
        cefReqId: reqObj.cefReqId
    };
}

mp.events.add("cerrarInventario", () => {
    if (inventario_cefId >= 0) {
        cef_inventario.cerrarCef(inventario_cefId);
        inventario_cefId = -1;

        desactivarMarkersInventario = false;
        mp.events.call("desactivarMarkersGymkhana", false);

        if(PedInventario != null)
        {
            mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU
            mp.game.invoke("0x44A0870B7E92D7C0", PedInventario, 0, false); // SET_ENTITY_ALPHA
            PedInventario = null;
        }

        mp.events.remove('render', renderInventario);

        mp.game.graphics.transitionFromBlurred(500);
        mp.game.ui.setFrontendActive(false);
        mp.game.invoke('0xF314CF4F0211894E', 117, 0, 0, 0, 186); // REPLACE_HUD_COLOUR_WITH_RGBA

        if(intervalPlayers != null)
        {
            clearInterval(intervalPlayers);
            intervalPlayers = null;
        }

        maletero = null;
        maleteroNombre = "";
        guantera = null;
        guanteraNombre = "";
        propiedad = null;
        contenedor = null;
        idPedIlegal = null;
        taquilla = null;
        taquillaNombre = "";

        //Actualizamos de continuo los objetos que tenemos en las teclas rapidas o mano
        mp.events.call("hud:actualizar_inventario");
        bloquearTeclas(false);
    }
});

mp.events.add("inventario:cerrarMaletero", () => {
    if (inventario_cefId >= 0) {
        if(maletero != null)
        {
            mp.events.callRemote("maletero_cerrar", maletero);
        }
        mp.events.call("cerrarInventario");
    }
});

let avisoEnviado = false;
function mostrarAvisoInventario(estilo, tiempo, mensaje) {
    if (inventario_cefId >= 0) {
        if (!mp.system.isFocused) {
        
            if (!avisoEnviado) {
                avisoEnviado = true;
                mp.system.notify({
                    title: opciones.variables.nombreDiscord,
                    text: "¡Tienes nuevas notificaciones en el inventario del juego!",
                    attribute: "LURP",
                    duration: 25,
                    silent: false
                });
                setTimeout(() => {
                    avisoEnviado = false;
                });
            }
        }
 
        cef_inventario.ejecutarCef(inventario_cefId, `sendNoty("${estilo}", ${tiempo}, "${mensaje}")`);
    }
}
exports.mostrarAvisoInventario = mostrarAvisoInventario;

async function refreshPedInventario() {
    if(PedInventario != null)
    {
        mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU

        let PlayerPed = mp.game.player.getPed();
    
        PedInventario = mp.game.invoke("0xEF29A16337FACADB", PlayerPed, 0, false, true); // CLONE_PED

        mp.game.invoke("0x239A3351AC1DA385", PedInventario, player_local.position.x, player_local.position.y, player_local.position.z - 50, false, false, false); // SET_ENTITY_COORDS_NO_OFFSET
        mp.game.invoke("0x428CA6DBD1094446", PedInventario, true); // FREEZE_ENTITY_POSITION //
        
        //mp.game.wait(10);
        await mp.game.waitAsync(10);
    
        mp.game.invoke("0xAC0BFBDC3BE00E14", PedInventario, 0); // GIVE_PED_TO_PAUSE_MENU
        mp.game.invoke("0xECF128344E9FF9F1", false); // SET_PAUSE_MENU_PED_SLEEP_STATE
        mp.game.invoke("0x3CA6050692BC61B0", true); // SET_PAUSE_MENU_PED_LIGHTING
    
        setTimeout(() => {
            mp.game.invoke("0xECF128344E9FF9F1", true); // SET_PAUSE_MENU_PED_SLEEP_STATE
        }, 1000);
    }
}

mp.events.add("mostrarinventario", (itemsExtra = null) => {
    mostrarinventario(itemsExtra);
});

async function mostrarinventario(itemsExtra = null) {
    if (inventario_cefId < 0) {
        bloquearTeclas(true);
        inventario_cefId = cef_inventario.crearCef("package://LURP/cef/inventario/inventario.html", {
            puedeCerrar: true,
            mostrarCursor: true
        }, true);

        cef_inventario.activarCef(inventario_cefId, false);

        desactivarMarkersInventario = true;
        mp.events.call("desactivarMarkersGymkhana", true);

        mp.game.graphics.transitionToBlurred(500);

        mp.events.add('render', renderInventario);

        intervalPlayers = setInterval(intervaloPlayers, 2000);

        mp.game.invoke('0xF314CF4F0211894E', 117, 0, 0, 0, 0); // REPLACE_HUD_COLOUR_WITH_RGBA
        mp.game.ui.setFrontendActive(true);
        /* const menuHash = mp.game.joaat('FE_MENU_VERSION_EMPTY_NO_BACKGROUND') >> 0;
        mp.game.ui.activateFrontendMenu(menuHash, true, -1); */
        mp.game.ui.activateFrontendMenu(
            mp.game.joaat("FE_MENU_VERSION_EMPTY_NO_BACKGROUND"),
            false,
            -1
        );
        
        mp.game.invoke("0x98215325A695E78A", false); // MOUSE
        //mp.game.wait(50);
        await mp.game.waitAsync(50);
        
        let IsFrontendReady = mp.game.invoke("0x3BAB9A4E4F2FF5C7"); // IS_FRONTEND_READY_FOR_CONTROL
        
        while (!IsFrontendReady) {
            IsFrontendReady = mp.game.invoke("0x3BAB9A4E4F2FF5C7");
            await mp.game.waitAsync(5);
        }
    
        //Al tener itmes extra es decir otro inventario, propiedad, vehiculo, contenedores de basura, taquillas, plantas, agujeros en el espacio tiempo 
        //no mostramos el ped ni los datos del inventario del jugador que por lo contrario si que se mostraria en una situacion normal.
        
        // TODO revisar eata mierda si no falla la
        // nativa estamos creando 2 peds cada vez que lo abrimos y en el 
        // mejor de los casos solo borramos el ultimo que creamos
        if(itemsExtra == null)
        {
            let PlayerPed = mp.game.player.getPed();
        
            // if (PedInventario == null) {
                PedInventario = mp.game.invoke("0xEF29A16337FACADB", PlayerPed, 0, false, true); // CLONE_PED
            // }

            mp.game.invoke("0x239A3351AC1DA385", PedInventario, player_local.position.x, player_local.position.y, player_local.position.z - 50, false, false, false); // SET_ENTITY_COORDS_NO_OFFSET
            mp.game.invoke("0x428CA6DBD1094446", PedInventario, true); // FREEZE_ENTITY_POSITION //
            
            //mp.game.wait(10);
            await mp.game.waitAsync(10);
        
            mp.game.invoke("0xAC0BFBDC3BE00E14", PedInventario, 0); // GIVE_PED_TO_PAUSE_MENU
            mp.game.invoke("0xECF128344E9FF9F1", false); // SET_PAUSE_MENU_PED_SLEEP_STATE
            mp.game.invoke("0x3CA6050692BC61B0", true); // SET_PAUSE_MENU_PED_LIGHTING
        
            setTimeout(() => {
                mp.game.invoke("0xECF128344E9FF9F1", true); // SET_PAUSE_MENU_PED_SLEEP_STATE
            }, 1000);

            refreshPedInventario();
        }
        
        cef_inventario.activarCef(inventario_cefId, true);
        cef_inventario.ejecutarCef(inventario_cefId, "setExtraKeyFast(" + teclasExtra + ")");
        cef_inventario.ejecutarCef(inventario_cefId, "setExtraSlots(" + inventarioExtra + ")");

        let items = [];
        let playerItems = [];
        for (let i = 0, n = inventario.length; i < n; i++) {

            if(!inventario[i].mano && !inventario[i].accesorio && !inventario[i].mascara)
            {    
                let obj = {
                    id: inventario[i].id,
                    category: inventario[i].categoria,
                    object: inventario[i].tipoObjeto,
                    index: inventario[i].celdaInv,
                    amount: inventario[i].cantidad,
                    name: inventario[i].nombre,
                    component: inventario[i].componente,
                    slot: inventario[i].slot,
                };
                items.push(obj);
            }

            if(inventario[i].mano)
            {
                let obj = {
                    id: inventario[i].id,
                    category: inventario[i].categoria,
                    object: inventario[i].tipoObjeto,
                    index: "hand",
                    amount: inventario[i].cantidad,
                    name: inventario[i].nombre,
                    component: inventario[i].componente,
                    slot: inventario[i].slot,
                };
                playerItems.push(obj);
            }

            if(itemsExtra == null)
            {
                if(inventario[i].mascara)
                {
                    let obj = {
                        id: inventario[i].id,
                        category: inventario[i].categoria,
                        object: inventario[i].tipoObjeto,
                        index: "mask",
                        amount: inventario[i].cantidad,
                        name: inventario[i].nombre,
                        componente: inventario[i].componente,
                        slot: inventario[i].slot,
                    };
                    playerItems.push(obj);
                }

                if(inventario[i].accesorio)
                {
                    let index = null;
                    switch(inventario[i].slot)
                    {
                        case 0:
                            index = "hat";
                            break;
                        case 1:
                            index = "glass";
                            break;
                        case 2:
                            index = "ear";
                            break;
                        case 6:
                            index = "watch";
                            break;
                        case 7:
                            index = "wedding";
                            break;
                    }
                    if(index != null)
                    {
                        let obj = {
                            id: inventario[i].id,
                            category: inventario[i].categoria,
                            object: inventario[i].tipoObjeto,
                            index: index,
                            amount: inventario[i].cantidad,
                            name: inventario[i].nombre,
                            component: inventario[i].componente,
                            slot: inventario[i].slot,
                        };
                        playerItems.push(obj);
                    }
                    else
                    {
                        //Por si hubiera un error lo mandamos como objeto normal
                        let obj = {
                            id: inventario[i].id,
                            category: inventario[i].categoria,
                            object: inventario[i].tipoObjeto,
                            index: inventario[i].celdaInv,
                            amount: inventario[i].cantidad,
                            name: inventario[i].nombre,
                            component: inventario[i].componente,
                            slot: inventario[i].slot,
                        };
                        items.push(obj);
                    }
                }
            }
        }


        let players = [];
        for (let player of mp.players.streamed) {
            if (calcDist(player.position, player_local.position) <= 2.0 && player != player_local) {
                if (mp.controladorJugadores._jugadores[player.id]) {
                    if (mp.controladorJugadores._jugadores[player.id].conectado) { // Conectado
                        if (mp.controladorJugadores._jugadores[player.id].oculto == false) { // Oculto
                            let ply_prox = { id: mp.controladorJugadores._jugadores[player.id].id_jugador, name: obtenerNombreConocido(player) };
                            players.push(ply_prox);
                        }
                    }
                }
            }
        }

        cef_inventario.ejecutarCef(inventario_cefId, "addPlayers('" + JSON.stringify(players) + "')");
        cef_inventario.ejecutarCef(inventario_cefId, "addItems('" + JSON.stringify(items).replace("'", "") + "')");

        cef_inventario.ejecutarCef(inventario_cefId, "addPlayerItems('" + JSON.stringify(playerItems).replace("'", "") + "')");

        if(contenedor != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('Contenedor (" + contenedor + ")', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
        }
        if(maletero != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('" + maleteroNombre + "', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
            cef_inventario.ejecutarCef(inventario_cefId, "showTrunk()");
        }
        if(guantera != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('" + guanteraNombre + "', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
        }
        if(propiedad != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('Armario propiedad (" + propiedad + ")', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
        }
        if(idPedIlegal != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('Inventario ped (" + idPedIlegal + ")', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
        }
        if(taquilla != null)
        {
            cef_inventario.ejecutarCef(inventario_cefId, "createExtras('Taquilla " + taquillaNombre + "', '" + JSON.stringify(itemsExtra).replace("'", "") + "')");
        }
    }
}

function renderInventario() {
    if(PedInventario != null)
    {
        mp.game.invoke("0xA53ED5520C07654A", PedInventario, player_local.handle, false);
    }

    mp.game.invoke("0x98215325A695E78A", false);
}

function intervaloPlayers() {
    if (inventario_cefId >= 0) {
        let players = [];
        for (let player of mp.players.streamed) {
            if (calcDist(player.position, player_local.position) <= 2.0 && player != player_local) {
                if (mp.controladorJugadores._jugadores[player.id]) {
                    if (mp.controladorJugadores._jugadores[player.id].conectado) { // Conectado
                        if (mp.controladorJugadores._jugadores[player.id].oculto == false) { // Oculto
                            let ply_prox = { id: mp.controladorJugadores._jugadores[player.id].id_jugador, name: obtenerNombreConocido(player) };
                            players.push(ply_prox);
                        }
                    }
                }
            }
        }

        cef_inventario.ejecutarCef(inventario_cefId, "addPlayers('" + JSON.stringify(players) + "')");
    }
}



//Tecla ESC
mp.keys.bind(0x1B, false, function () {
    if (inventario_cefId >= 0) {
        mp.events.call("cerrarInventario");
    }
});

//Teclas de accion
function tecla_accion(tecla) {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto)
        return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (bloqueado) return;
    if (setFloodboton(1000, "FB31") == false) return;
    if (campoTiroActivo) {
        mostrarAviso("danger", 2000, "No puedes hacer eso en este momento");
        return;
    }
    if(modoBoxeo) {
        mostrarAviso("danger", 2000, "No puedes hacer eso en este momento");
        return;
    }

    if (cantidad_cefs > 0) return;

    let objetoArma = null;
    for (let i = 0, n = inventario.length; i < n; i++) {
        if(!inventario[i].accesorio && !inventario[i].mascara)
        {
            if(inventario[i].celdaInv == tecla)
            {     
                if(inventario[i].categoria == 1)
                {
                    objetoArma = inventario[i];
                    break;
                }
            }
        }
    }

    if(objetoArma != null)
    {
        mp.events.call("ruletaarmas:elegirarma", objetoArma.id, objetoArma.tipoObjeto, objetoArma.cantidad);
        return;
    }

    let enUso = false;
    for (let i = 0, n = inventario.length; i < n; i++) {
        if(!inventario[i].accesorio && !inventario[i].mascara)
        {   
            if(inventario[i].celdaInv == tecla)
            {
                enUso = true;
                break;
            }
        }
    }

    if(enUso)
    {
        if (armaActiva.id != 0) {
            mp.events.call("ruletaarmas:elegirarma", 0, 0, 0);

            setTimeout(() => {
                mp.events.callRemote("inventario_tecla", tecla);

                mp.events.call("hud:actualizar_inventario");
                mp.events.call("hud:actualizar_inventario_mano");
            }, 1000);
            return;
        }

        let identico = false;
        let objeto_mano = obtenerObjetoMano();
        if (objeto_mano != null) {
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].celdaInv == tecla) {
                    if (inventario[i].id == objeto_mano.id) {
                        identico = true;
                        break;
                    }
                }
            }
        }


        if(identico)
        {
            return;
        }
      
        mp.events.callRemote("inventario_tecla", tecla);

        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
    }
    else
    {
        let totalInventario = 0;
        for (let i = 0, n = inventario.length; i < n; i++) {
            if(!inventario[i].mano && !inventario[i].accesorio && !inventario[i].mascara)
            {
                totalInventario++;
            }
        }

        if(totalInventario >= obtenerEspacioInventario())
        {
            mostrarAviso("danger", 2000, "Has alcanzado el maximo de objetos en tu inventario");
            return;
        }

        let objeto_mano = obtenerObjetoMano();
        if (objeto_mano != null)
        {
            let identico = false;
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].celdaInv == tecla) {
                    if (inventario[i].id == objeto_mano.id) {
                        identico = true;
                        break;
                    }
                }
            }

            if(identico)
            {
                return;
            }
            if (objeto_mano.categoria == 1 && player_local.weapon != 2725352035) mp.events.call("ruletaarmas:elegirarma", 0, 0, 0);
            else mp.events.callRemote("inventario_guardar", tecla);

            //Para los cambios de celda de un objeto
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].id == objeto_mano.id) {
                    inventario[i].celdaInv = tecla;
                    break;
                }
            }
    
            mp.events.call("hud:actualizar_inventario");
            mp.events.call("hud:actualizar_inventario_mano");
        }
    }
}

//Tecla 1
mp.keys.bind(0x31, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;
    tecla_accion(1);
});
//Tecla 2
mp.keys.bind(0x32, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;

    tecla_accion(2);
});
//Tecla 3
mp.keys.bind(0x33, false, function () {
    if (!logueado)  return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    tecla_accion(3);
});
//Tecla 4
mp.keys.bind(0x34, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;
    tecla_accion(4);
});
//Tecla 5
mp.keys.bind(0x35, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;
    if(teclasExtra)
    {
        tecla_accion(5);
    }
    else
    {
        mostrarAviso("info", 2000, "Este slot se desbloquea desde el apartado premium del manager con vikens");
    }
});
//Tecla 6
mp.keys.bind(0x36, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (mp.gui.cursor.visible) return;
    if (estaChatAbierto) return;
    if (cantidad_cefs > 0) return;
    if (modoBoxeo) return;
    if(teclasExtra)
    {
        tecla_accion(6);
    }
    else
    {
        mostrarAviso("info", 2000, "Este slot se desbloquea desde el apartado premium del manager con vikens");
    }
});

// mp.events.add("playerCommand", (command) => {
//     const args = command.split(/[ ]+/);
//     const commandName = args[0];

//     args.shift();

//     if (commandName === "inventario") {
//         // mp.gui.chat.push("INVENTARIO: "+JSON.stringify(inventario));
//         mp.gui.chat.push("OBJETO MANO: "+JSON.stringify(obtenerObjetoMano()));
//     }
// });


mp.events.add({
    "inventario:mostrar_contenedor": function (contenedor_id, array) {  

        contenedor = contenedor_id;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "inventario:mostrar_maletero": function (vehiculo_id, nombre, array) {  

        maletero = vehiculo_id;
        maleteroNombre = nombre;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "inventario:mostrar_guantera": function (vehiculo_id, nombre, array) {  

        guantera = vehiculo_id;
        guanteraNombre = nombre;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "inventario:mostrar_propiedad": function (propiedad_id, array) {  

        propiedad = propiedad_id;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "inventario:mostrar_ped": function (id, array) {  

        idPedIlegal = id;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "inventario:mostrar_taquilla": function (idTaquilla, nombre, array) {  

        taquilla = idTaquilla;
        taquillaNombre = nombre;

        let array_objetos = JSON.parse(array);
        let objetos = [];
        for (let i = 0, n = array_objetos.length; i < n; i+= 7) {
            let obj = {
                id: array_objetos[i],
                name: array_objetos[i + 1],
                amount: array_objetos[i + 2],
                object: array_objetos[i + 3],
                category: array_objetos[i + 4],
                component: array_objetos[i + 5],
                slot: array_objetos[i + 6],
            };
            objetos.push(obj);  
        }
        
        mostrarinventario(objetos);
    },
    "mostrar_inventario": function(){
        mostrarinventario();
    }
});
//# sourceMappingURL=inventario.js.map


}