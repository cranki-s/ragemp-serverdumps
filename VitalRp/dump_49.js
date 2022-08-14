{
let deadBodies = [];
let deadBodiesAnim = [];
let deadBodiesDict = [];
let deadBodiesFlag = [];
let deadBodiesFeatures = [];
let deadBodiesOutfits = [];
let deadBodiesTattoos = [];
let deadBodiesAttachments = [];
let deadBodiesPrimary = [];
let deadBodiesSecundary = [];
let deadBodiesMelee = [];
let deadBodiesAttached = [];
let deadBodiesInCar = [];
let deadBodySex = [];


mp.events.add({
    "Sync_DeadBodyCreate": (name, features, outfits, tattoos, attachments, sex, x, y, z, heading = 0, callback, dimension = mp.players.local.dimension, attached = false, incar = false) => {
        deadBodiesAttached[name] = attached;
        deadBodiesInCar[name] = incar;

        deadBodiesFeatures[name] = features;
        deadBodiesOutfits[name] = outfits;
        deadBodiesTattoos[name] = tattoos;
        deadBodiesAnim[name] = "corpse_search_exit_ped";
        deadBodiesDict[name] = "missarmenian2";
        deadBodiesFlag[name] = 1;
        deadBodiesAttachments[name] = attachments;
        
        deadBodySex[name] = sex;
        let pedPos = new mp.Vector3(x, y, z);
        let pedtype = "";

        if (deadBodySex[name] === 1) {
            pedtype = "mp_f_freemode_01";

        }
        else pedtype = "mp_m_freemode_01"
        let ped = mp.peds.new(mp.game.joaat(pedtype), pedPos, heading, dimension);
        deadBodies[name] = ped;
        deadBodies[name].Sql = name;
        deadBodies[name].attached = attached;
        deadBodies[name].incar = incar;

        if (deadBodies[name].handle > 0) {
            setTimeout(() => {
                if (deadBodies[name]) {
                    setFeature(name, deadBodiesFeatures[name])
                    setOutfits(name, deadBodiesOutfits[name])
                    setTattoos(name, deadBodiesTattoos[name])
                    setAttachements(name, deadBodiesAttachments[name])
                    loadAnimDict(deadBodiesDict[name], function () {
                        deadBodies[name].taskPlayAnim(deadBodiesDict[name], deadBodiesAnim[name], 1, 0, -1, deadBodiesFlag[name], 1, !1, !1, !1)
                    })
                }
            }, 200)
        }

    },
    "LoadDeadBodiesData": (id, features, outfits, tattoos, attachments, hash, attached, incar) => {
        deadBodiesAttached[id] = attached;
        deadBodiesInCar[id] = incar;
        deadBodiesFeatures[id] = features;
        deadBodiesOutfits[id] = outfits;
        deadBodiesTattoos[id] = tattoos;
        deadBodiesAttachments[id] = attachments;
        deadBodiesAnim[id] = "corpse_search_exit_ped";
        deadBodiesDict[id] = "missarmenian2";
        deadBodiesFlag[id] = 1;
    },
    "UpdateDeadBodyOutfit": (id, outfits) => {
        deadBodiesOutfits[id] = outfits;
        if (mp.peds.exists(deadBodies[id]) && deadBodies[id].handle > 0) {
            setTimeout(() => {
                setOutfits(id, deadBodiesOutfits[id])

            }, 200)
        }
    },
    "AttachDeadBodyWeapon": (id, name, cell, newAttach) => {
        deadBodiesAttachments[id] = newAttach;
        if (mp.peds.exists(deadBodies[id]) && deadBodies[id].handle > 0) {
            attachWeapon(id, name, cell);
        }
    },
    "DeAttachDeadBodyWeapon": (id, cell, newAttach) => {
        deadBodiesAttachments[id] = newAttach;
        if (mp.peds.exists(deadBodies[id]) && deadBodies[id].handle > 0) {
           deAttachWeapon(id, cell);
        }
    },
    "ReAttachDimmension": async function (id) {
        if (deadBodies[id]) deadBodies[id].destroy();
        mp.events.call("Sync_DeadBodyCreate", id, deadBodiesFeatures[id], deadBodiesOutfits[id], deadBodiesTattoos[id], deadBodiesAttachments[id], "", mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, heading = 0, "", mp.players.local.dimension, true);
        ReattachBody(id)
    } 

})

function waitForBody(e) {
    return new Promise((resolve, reject) => {
        let time = Date.now()
        let interval = setInterval(() => {
            if (e.handle) {
                clearInterval(interval)
                resolve(e)
            }

            if (Date.now() - time >= 5000) {
                clearInterval(interval)
                resolve(null)
            }
        }, 100)
    })
}

async function ReattachBody(id) {

    while (mp.peds.exists(deadBodies[id]) && !deadBodies[id].handle ) {
      //      await mp.game.waitAsync(1);
        }
        if (deadBodies[id]) {

            setFeature(id, deadBodiesFeatures[id])
            setOutfits(id, deadBodiesOutfits[id])
            setTattoos(id, deadBodiesTattoos[id])
            setAttachements(id, deadBodiesAttachments[id])

            deadBodies[id].stopAnimTask(deadBodiesDict[id], deadBodiesAnim[id], deadBodiesFlag[id])
            deadBodiesAnim[id] = "firemans_carry";
            deadBodiesDict[id] = "nm";
            deadBodiesFlag[id] = 33;
            loadAnimDict(deadBodiesDict[id], function () {
                deadBodies[id].taskPlayAnim(deadBodiesDict[id], deadBodiesAnim[id], 1, 0, -1, deadBodiesFlag[id], 1, !1, !1, !1)
            })
            loadTargetAttached(mp.players.local, deadBodies[id], function () {
                mp.game.invoke('0x6B9BBD38AB0796DF', deadBodies[id].handle, mp.players.local.handle, -1, 0.27, 0.15, 0.63, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
            })
        }
   }



mp.events.add("entityStreamIn", async function (entity)  {
    if (global.logged) {
        if (entity.type === "ped" && entity.Sql && deadBodiesAttached[entity.Sql] === false && deadBodiesInCar[entity.Sql] === false) {
            setTimeout(() => {
                if (mp.peds.exists(deadBodies[entity.Sql]) && deadBodies[entity.Sql].handle && deadBodies[entity.Sql].handle > 0) {
                    if (deadBodies[entity.Sql]) {
                        setFeature(entity.Sql, deadBodiesFeatures[entity.Sql])
                        setOutfits(entity.Sql, deadBodiesOutfits[entity.Sql])
                        setTattoos(entity.Sql, deadBodiesTattoos[entity.Sql])
                        setAttachements(entity.Sql, deadBodiesAttachments[entity.Sql])
                        loadAnimDict(deadBodiesDict[entity.Sql], function () {
                            entity.taskPlayAnim(deadBodiesDict[entity.Sql], deadBodiesAnim[entity.Sql], 1, 0, -1, deadBodiesFlag[entity.Sql], 1, !1, !1, !1)
                        })
                        mp.vehicles.forEach((vehicle) => {
                            if (vehicle.handle !== 0) {
                                vehicle.setNoCollision(entity.handle, false);
                                vehicle.setNoCollision(entity.handle, false);

                            }
                        });
                    }
                }
            }, 800)
        }
        if (entity.hasVariable("AttachedDeadBody") && entity.getVariable("AttachedDeadBody") !== "none" && deadBodiesAttached[entity.getVariable("AttachedDeadBody")] === true && deadBodiesInCar[entity.getVariable("AttachedDeadBody")] === false) {
            let id = entity.getVariable("AttachedDeadBody");
            if (!deadBodies[id]) {
                newDeadPos = entity.position;
                mp.events.call("Sync_DeadBodyCreate", id, deadBodiesFeatures[id], deadBodiesOutfits[id], deadBodiesTattoos[id], deadBodiesAttachments[id], deadBodySex[id], newDeadPos.x, newDeadPos.y, newDeadPos.z, heading = 0, "", entity.dimension, true);

                setTimeout(() => {
                    if (deadBodies[id]) {



                        deadBodies[id].stopAnimTask(deadBodiesDict[id], deadBodiesAnim[id], deadBodiesFlag[id])
                        deadBodiesAnim[id] = "firemans_carry";
                        deadBodiesDict[id] = "nm";
                        deadBodiesFlag[id] = 33;
                        loadAnimDict(deadBodiesDict[id], function () {
                            deadBodies[id].taskPlayAnim(deadBodiesDict[id], deadBodiesAnim[id], 1, 0, -1, deadBodiesFlag[id], 1, !1, !1, !1)
                        })
                        loadTargetAttached(entity, deadBodies[id], function () {
                            mp.game.invoke('0x6B9BBD38AB0796DF', deadBodies[id].handle, entity.handle, -1, 0.27, 0.15, 0.63, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
                        })
                    }
                    }, 1500)
            
            }
        }

        if (entity.type === "vehicle") {
            for (i = 0; i < 4; i++) {
                if (entity.hasVariable(`CarDeadBody${i}`) && entity.getVariable(`CarDeadBody${i}`) !== "none") {
                    let id = entity.getVariable(`CarDeadBody${i}`);
                    if (!deadBodies[id]) {
                        newDeadPos = entity.position;
                        mp.events.call("Sync_DeadBodyCreate", id, deadBodiesFeatures[id], deadBodiesOutfits[id], deadBodiesTattoos[id], deadBodiesAttachments[id], deadBodySex[id], newDeadPos.x, newDeadPos.y, newDeadPos.z, heading = 0, "", entity.dimension, false, true);



                            putBodyInCar(id, entity, (i-1)) 

                    }
                }

         
            }
        }

    }
});




mp.events.add("entityStreamOut", (entity) => {
    if (global.logged) {
        if (entity.type === "ped" && entity.Sql) {
            if (deadBodiesPrimary[entity.Sql]) {
                let obj = deadBodiesPrimary[entity.Sql];
                delete deadBodiesPrimary[entity.Sql];
                if (mp.objects.exists(obj)) {
                    obj.destroy();
                }
            }
            if (deadBodiesSecundary[entity.Sql]) {
                let obj = deadBodiesSecundary[entity.Sql];
                delete deadBodiesSecundary[entity.Sql];
                if (mp.objects.exists(obj)) {
                    obj.destroy();
                }
            }
            if (deadBodiesMelee[entity.Sql]) {
                let obj = deadBodiesMelee[entity.Sql];
                delete deadBodiesMelee[entity.Sql];
                if (mp.objects.exists(obj)) {
                    obj.destroy();
                }
            }
        }
        if (entity.hasVariable("AttachedDeadBody") && entity.getVariable("AttachedDeadBody") !== "none") {
            let id = entity.getVariable("AttachedDeadBody");
            if (deadBodies[id]) {
                if (mp.peds.exists(deadBodies[id])) {
                    deadBodies[id].destroy();
                    delete deadBodies[id];
                    deAttachWeapon(id, 0);
                    deAttachWeapon(id, 1);
                    deAttachWeapon(id, 2);

                }
            }
        }
        if (entity.type === "vehicle") {
            for (i = 0; i < 4; i++) {
                if (entity.hasVariable(`CarDeadBody${i}`) && entity.getVariable(`CarDeadBody${i}`) !== "none") {
                    let id = entity.getVariable(`CarDeadBody${i}`);

                    if (deadBodies[id]) {
                        if (mp.peds.exists(deadBodies[id])) {
                            deadBodies[id].destroy();
                            delete deadBodies[id];
                            deAttachWeapon(id, 0);
                            deAttachWeapon(id, 1);
                            deAttachWeapon(id, 2);
                        }
                    }
                }
            }
        }
     
    }
});

mp.events.addDataHandler('AttachedDeadBody', (entity, value, oldValue) => {
    if (entity.handle && value && entity.getVariable("AttachedDeadBody") !== "none") {
        let id = entity.getVariable("AttachedDeadBody");
        deadBodiesAttached[id] = true;
        deadBodiesInCar[id] = false;
        if (deadBodies[id] && deadBodies[id].handle > 0) {

            if (deadBodies[id].incar) {
                deadBodies[id].incar = false;
                let veh = deadBodies[id].getVehicleIsIn(true);
                deadBodies[id].taskLeaveVehicle(veh, 16);
            }

            deadBodiesAnim[id] = "firemans_carry";
            deadBodiesDict[id] = "nm";
            deadBodiesFlag[id] = 33;
            deadBodies[id].attached = true;
            
            loadAnimDict(deadBodiesDict[id], function () {
                deadBodies[id].taskPlayAnim(deadBodiesDict[id], deadBodiesAnim[id], 1, 0, -1, deadBodiesFlag[id], 1, !1, !1, !1)
            })

            loadTargetAttached(entity, deadBodies[id], function () {
                mp.game.invoke('0x6B9BBD38AB0796DF', deadBodies[id].handle, entity.handle, -1, 0.27, 0.15, 0.63, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
            })
        }
        else {
            if (mp.peds.exists(deadBodies[id])) {
                deadBodies[id].destroy();
                delete deadBodies[id];
                deAttachWeapon(id, 0);
                deAttachWeapon(id, 1);
                deAttachWeapon(id, 2);
            }
        }
    }
    else if (entity.handle && entity.getVariable("AttachedDeadBody") === "none") {
        let id = oldValue;
        if (deadBodies[id]) {

            if (mp.players.local === entity && deadBodies[id].incar === false && deadBodies[id].attached === true) {
                mp.events.callRemote("BodyDropped", id);

            }

            if (deadBodies[id].incar === false) {
                if (mp.peds.exists(deadBodies[id])) {
                    deAttachWeapon(id, 0);
                    deAttachWeapon(id, 1);
                    deAttachWeapon(id, 2);
                    deadBodies[id].destroy();
                    delete deadBodies[id];

                }
            }

        }
    }
});




async function putBodyInCar(id, entity, seat) {
    if (deadBodies[id] && deadBodies[id].handle > 0) {
        while (!deadBodies[id].handle) {
            await mp.game.waitAsync(1);
        }
        deadBodiesAttached[id] = false;
        deadBodiesInCar[id] = true;

        deadBodies[id].detach(true, true);
        deadBodies[id].stopAnimTask(deadBodiesDict[id], deadBodiesAnim[id], deadBodiesFlag[id])


        deadBodiesAnim[id] = "cockpit_dead_loop_pilot";
        deadBodiesDict[id] = "missmic3leadinout_mcs1";
        deadBodiesFlag[id] = 1;

        deadBodies[id].attached = false;
        deadBodies[id].incar = true;


        setTimeout(() => {
            deadBodies[id].taskWarpIntoVehicle(entity.handle, seat);
        }, 300)

        while (!mp.game.invoke("0x826AA586EDB9FEF8", deadBodies[id].handle)) {
            await mp.game.waitAsync(1);
        }

            loadAnimDict(deadBodiesDict[id], function () {
                deadBodies[id].taskPlayAnim(deadBodiesDict[id], deadBodiesAnim[id], 1, 0, -1, deadBodiesFlag[id], 1, !1, !1, !1)
            })


    }
    else {
        if (mp.peds.exists(deadBodies[id])) {
            deadBodies[id].destroy();
            delete deadBodies[id];
            deAttachWeapon(id, 0);
            deAttachWeapon(id, 1);
            deAttachWeapon(id, 2);
        }
    }


}


mp.events.addDataHandler('CarDeadBody0', (entity, value, oldValue) => {
    if (entity.handle && value && entity.getVariable("CarDeadBody0") !== "none") {
        let id = entity.getVariable("CarDeadBody0");
        putBodyInCar(id, entity, -1);
    }
});

mp.events.addDataHandler('CarDeadBody1', (entity, value, oldValue) => {
    if (entity.handle && value && entity.getVariable("CarDeadBody1") !== "none") {
        let id = entity.getVariable("CarDeadBody1");
        putBodyInCar(id, entity, 0);
    }
});

mp.events.addDataHandler('CarDeadBody2', (entity, value, oldValue) => {
    if (entity.handle && value && entity.getVariable("CarDeadBody2") !== "none") {
        let id = entity.getVariable("CarDeadBody2");
        putBodyInCar(id, entity, 1);
    }
});

mp.events.addDataHandler('CarDeadBody3', (entity, value, oldValue) => {
    if (entity.handle && value && entity.getVariable("CarDeadBody3") !== "none") {
        let id = entity.getVariable("CarDeadBody3");
        putBodyInCar(id, entity, 2);
    }
});



function loadTargetAttached(a, b, c) {
    if (b.getAttachedTo() == a.handle) return void c();
    let d = setInterval(function () {

        if (b.getAttachedTo() != a.handle) {
            c();
            clearInterval(d);
        }

    }, 100)
}



function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
        if (mp.game.streaming.hasAnimDictLoaded(a)) {
            b();
            clearInterval(c);
        }
    }, 100)
}




function setFeature(sql, features) {

    let newFeatures = JSON.parse(features)
    deadBodies[sql].setHeadBlendData(newFeatures.Parents.Mother, newFeatures.Parents.Father, 0, newFeatures.Parents.Mother, newFeatures.Parents.Father, 0, newFeatures.Parents.Similarity, newFeatures.Parents.SkinSimilarity, 0, true)
    deadBodies[sql].setComponentVariation(2, newFeatures.Hair.Hair, 0, 0);
    deadBodies[sql].setHairColor(newFeatures.Hair.Color, newFeatures.Hair.HighlightColor);
    deadBodies[sql].setEyeColor(newFeatures.EyeColor);
    for (var i = 0; i < newFeatures.Features.length; i++) {
        deadBodies[sql].setFaceFeature(i, newFeatures.Features[i]);
    }

    for (var i = 0; i < newFeatures.Appearance.length; i++) {
        deadBodies[sql].setHeadOverlay(i, newFeatures.Appearance[i].Value, newFeatures.Appearance[i].Opacity, newFeatures.Appearance[i].Color, 0);
        if (i == 1) deadBodies[sql].setHeadOverlayColor(1, 1, newFeatures.Appearance[1].Color, 255)
    }

}



function setOutfits(sql, outfits) {
    let newOutfits = JSON.parse(outfits)

    for (var i = 0; i < newOutfits.ComponentVariation.length; i++) {
        if (i != 0 && i != 2) {

            deadBodies[sql].setComponentVariation(i, newOutfits.ComponentVariation[i].Drawable, newOutfits.ComponentVariation[i].Texture, 0)

        }
    }

    for (var i = 0; i < newOutfits.PropVariation.length; i++) {
        if (i < 3) {
            if (newOutfits.PropVariation[i].Drawable === -1) deadBodies[sql].clearProp(i);
            else deadBodies[sql].setPropIndex(i, newOutfits.PropVariation[i].Drawable, newOutfits.PropVariation[i].Texture, true)
        }
        else if (i == 3) {
            if (newOutfits.PropVariation[i].Drawable === -1) deadBodies[sql].clearProp(6);
            else deadBodies[sql].setPropIndex(6, newOutfits.PropVariation[i].Drawable, newOutfits.PropVariation[i].Texture, true)
        }
        else if (i == 4) {
            if (newOutfits.PropVariation[i].Drawable === -1) deadBodies[sql].clearProp(7);
            else deadBodies[sql].setPropIndex(7, newOutfits.PropVariation[i].Drawable, newOutfits.PropVariation[i].Texture, true)
        }
    }

}

function setTattoos(sql, tattoos) {
    let newTattoos = JSON.parse(tattoos)
    newTattoos.forEach((tattoo) => {
        deadBodies[sql].setDecoration(mp.game.joaat(tattoo.library), mp.game.joaat(tattoo.hash));
    });
}

function setAttachements(sql, Attachments) {

    let attaches = JSON.parse(Attachments)
    let i = 0;
    attaches.forEach((name) => {
        if (name != "0") {
            attachWeapon(sql, name, i)
        }
        i++;
    })
}

function attachWeapon(sql, name, i) {
    let id = mp.game.joaat(name);
    let attData = mp.attachmentMngr.attachments[id]
    let object = mp.objects.new(attData.model, deadBodies[sql].position, {
        dimension: deadBodies[sql].dimension
    });

    object.streamingRange = 500;
    object.notifyStreaming = true;

    if (i === 0) deadBodiesPrimary[sql] = object;
    else if (i === 1) deadBodiesSecundary[sql] = object;
    else if (i === 2) deadBodiesMelee[sql] = object;


    setTimeout(() => {
        if (deadBodies[sql].handle) {
            object.attachTo(
                deadBodies[sql].handle, deadBodies[sql].getBoneIndex(attData.boneName),
                attData.offset.x, attData.offset.y, attData.offset.z,
                attData.rotation.x, attData.rotation.y, attData.rotation.z,
                false, false, false, false, 2, true
            );
        }
    }, 300);
}

function deAttachWeapon(sql, i) {

    if (i == 0 && deadBodiesPrimary[sql]) {
        let obj = deadBodiesPrimary[sql];
        delete deadBodiesPrimary[sql];
        if (mp.objects.exists(obj)) {
            obj.destroy();
        }
    }
    if (i == 1 && deadBodiesSecundary[sql]) {
        let obj = deadBodiesSecundary[sql];
        delete deadBodiesSecundary[sql];
        if (mp.objects.exists(obj)) {
            obj.destroy();
        }
    }

    if (i == 2 && deadBodiesMelee[sql]) {

        let obj = deadBodiesMelee[sql];
        delete deadBodiesMelee[sql];
        if (mp.objects.exists(obj)) {
            obj.destroy();
        }
    }
}

let raycastMenuOn = false;
let raycastMenuItems = [];
let raycastMenuIndex = 0;

let canInterract = false;
let raycast = null;

const addRaycastMenuOption = (text) => {
    raycastMenuItems.push(text);
}


const displayRaycastMenu = () => {
    var menuOption = "";
    raycastMenuItems.forEach((text, index) => {
        if (raycastMenuIndex === index) {
            menuOption += (`~n~ ~w~ ${text} [E]`)
        }
        else menuOption += `~n~ ~c~ ${text}`

    })
    return menuOption;
}


const resetRayCastMenu = () => {
    if (raycastMenuOn) return;
    raycastMenuIndex = 0;
    raycastMenuItems = [];

}

function drawTestText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}

const getPed = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;


    startPosition.z -= 0.3;
    const target = mp.raycasting.testCapsule(startPosition, secondPoint, 0.3, mp.players.local, 12); 
    if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && target.entity.type !== 'ped') { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
    if (target && target.entity) {
        let ped = mp.peds.atHandle(target.entity.handle)
        if (ped && ped.handle && ped.Sql) {
            let pedPos = ped.getCoords(false);
            if (mp.game.gameplay.getDistanceBetweenCoords(pedPos.x, pedPos.y, pedPos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {

                return ped;
            }
        }
    }
    else return null;
}

mp.events.add({
    'render': () => {
        if (!mp.players.local.vehicle && !mp.gui.cursor.visible) {
            raycast = getPed();
            let objpos = null;
            if (raycast) objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", raycast.handle, false)
            if (raycast && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(objpos.x, objpos.y, objpos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
                raycastMenuItems = [];
                let text = "Open Inventory";
                let text2 = "Carry Body";
                addRaycastMenuOption(text);
                addRaycastMenuOption(text2);
                mp.game.graphics.drawText(displayRaycastMenu(), [objpos.x, objpos.y, objpos.z + 0.3], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
                raycastMenuOn = true;
                canInterract = true;
            }
            else {
                canInterract = false;
            }


            if (!canInterract) {
                raycastMenuOn = false;
                resetRayCastMenu();
                raycast = null;
            }



            if (raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 241)) {

                let max = raycastMenuItems.length;
                raycastMenuIndex--;
                if (raycastMenuIndex < 0) raycastMenuIndex = max - 1;
            }

            if (raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 242)) {

                let max = raycastMenuItems.length;
                raycastMenuIndex++;
                if (raycastMenuIndex == max) raycastMenuIndex = 0;
            }

        }
    }
});

mp.keys.bind(69, true, () => {

    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (canInterract) {
        switch (raycastMenuIndex) {
            case 0:
                mp.events.callRemote('OpenDeadBodyInventory', raycast.Sql);
                break;
            case 1:
                mp.events.callRemote('AttachDeadBody', raycast.Sql);
                break
            default:
                return;

        }
    }
});
}