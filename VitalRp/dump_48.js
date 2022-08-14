{
let raycastMenuOn = false;
let raycastMenuItems = [];
let raycastMenuIndex = 0;
let miningRocks = [];



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


const getobjectToSitON = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;


    //startPosition.z -= 0.3;
    const target = mp.raycasting.testCapsule(startPosition, secondPoint, 0.5, mp.players.local, 17);
    if (target && target.entity !== 0 && target.entity.model) {
        return target;

    }

    else if (target && target.entity !== 0 && mp.game.invoke("0x7239B21A38F536BA", target.entity) && mp.game.invoke("0x8ACD366038D14505", target.entity) == 3) {
        let objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", target.entity, false)
        let door = null;
        let model = mp.game.invoke("0x9F47B058362C84B5", target.entity)

        if (doorDebug) {
            mp.game.object.setStateOfClosestDoorOfType(model, objpos.x, objpos.y, objpos.z, true, 0, !1)
            let doorState = mp.game.object.getStateOfClosestDoorOfType(model, objpos.x, objpos.y, objpos.z);
            if (doorState.locked) {
                drawTestText(`Type /savedoor (type) to save this door`);
                doorToSaveModel = model;
                doorToSavePosition = objpos;
            }
            else {
                doorToSaveModel = null;
                doorToSavePosition = null;
            }
        }
        else {
            //mp.game.object.setStateOfClosestDoorOfType(model, objpos.x, objpos.y, objpos.z, false, 0, !1)
            doorToSaveModel = null;
            doorToSavePosition = null;
        }

        return target;
    }
    else return null;
    //if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && mp.game.invoke("0x7239B21A38F536BA", target.entity) && mp.game.invoke("0x8ACD366038D14505", target.entity) == 3) { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
     
    /*let objpos = null;
    if (target && target.entity && target.entity !== 0 && mp.game.entity.isAnObject(target.entity)) {
        let hash = mp.game.invoke("0x9F47B058362C84B5", target.entity)
        let model = mp.game.streaming.getModelNameFromHash(hash);
        mp.game.graphics.drawLine(startPosition.x, startPosition.y, startPosition.z, secondPoint.x, secondPoint.y, secondPoint.z, 255, 255, 255, 255)
        drawTestText(`${hash}`)
    }
    if (target.entity) drawTestText(`${JSON.stringify(target.entity)}`)

    if (target && target.entity !== 0 && mp.game.entity.isAnObject(target.entity) && !target.entity.model) {
        objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", target.entity, false)
        if (mp.game.gameplay.getDistanceBetweenCoords(objpos.x, objpos.y, objpos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {
            return target;
        }
    }          
    else if (target && target.entity.model) {
        if (mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {
            if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && mp.game.entity.isAnObject(target.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
            return target;

        }
    }
    else return null;*/
}

let raycast = null;
let canSit = false;
let sitting = false;
let sitChairPos = null
let canPick = false;
let canOpenInv = false;
let canMine = false;


const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.005, scaleY = 0.01) => {
    const position = mp.game.graphics.world3dToScreen2d(pos);
    if (!position) return;
    mp.game.graphics.drawSprite(textureDict, textureName, position.x, position.y, scaleX, scaleY, 0, 0, 0, 0, 200);
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







mp.events.add({
    'render': () => {
        if (!mp.players.local.vehicle && !mp.gui.cursor.visible && !sitting) {
            raycast = getobjectToSitON();
            let objpos = null;
            if (raycast) {
                objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", raycast.entity, false)
                mp.game.invoke("0x9F47B058362C84B5", raycast.entity);
                if (raycast && seatHashes.includes(mp.game.invoke("0x9F47B058362C84B5", raycast.entity)) && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(objpos.x, objpos.y, objpos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 2) {
                    raycastMenuItems = [];
                    let text = "Sit";
                    canSit = true;
                    addRaycastMenuOption(text);
                    mp.game.graphics.drawText(displayRaycastMenu(), [objpos.x, objpos.y, objpos.z], {
                        font: 0,
                        color: [255, 255, 255, 255],
                        scale: [0.2, 0.2],
                        centre: true
                    });
                    raycastMenuOn = true;

                }
            }
            else {
                canSit = false;
            }


            if (raycast && raycast.entity.model && raycast.entity.hasVariable('droppedObject') && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 2) {
                canPick = true;
                raycastMenuItems = [];
                addRaycastMenuOption("Pick up");

                if (raycast.entity.hasVariable('bag')) {
                    addRaycastMenuOption("Open");
                }
                let text = `${raycast.entity.getVariable('droppedObject')}`
                text += displayRaycastMenu()

                mp.game.graphics.drawText(text, [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z + 0.3], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
                raycastMenuOn = true;
            }
            else {
                canPick = false
            }


            if (raycast && raycast.entity.model && raycast.entity.houseInv > 0 && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 2) {
                canOpenInv = true;
                raycastMenuItems = [];
                addRaycastMenuOption("Open Inventory");


                let text = ``;
                text += displayRaycastMenu()

                mp.game.graphics.drawText(text, [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z + 0.3], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
                raycastMenuOn = true;
            }
            else {
                canOpenInv = false
            }


            if (raycast && raycast.entity.model && raycast.entity.RockId && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 2) {
                canMine = true;
                raycastMenuItems = [];
                addRaycastMenuOption("Mine");


                let text = ``;
                text += displayRaycastMenu()

                mp.game.graphics.drawText(text, [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z + 0.3], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
                raycastMenuOn = true;
            }
            else {
                canMine = false
            }


            if (!canPick && !canSit && !canOpenInv && !canMine) {
                raycastMenuOn = false;
                resetRayCastMenu();
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
    },
    "SyncDroppedItems": () => {
        var objects = mp.objects.toArray();
        objects.forEach((object) => {
            object.notifyStreaming = true;
            if (object.handle) {
                
                if (object.hasVariable('droppedHandle')) {
                    object.placeOnGroundProperly();
                    mp.game.invoke("0x1A9205C1B9EE827F", object.handle, false, true);
                }
            }
        })
    },
    "CreateRock": (id, type, position) => {
        if (miningRocks[id]) return;
             let obj = mp.objects.new(mp.game.joaat(type), position, {
                rotation: new mp.Vector3(0, 0, 0),
                alpha: 255,
                dimension: 0
            });
            
            obj.RockId = id;
        obj.streamingRange = 500;
        obj.notifyStreaming = true;
        miningRocks[id] = obj;
        
        
    },
    "DestroyRock": (id) => {
        if (mp.objects.exists(miningRocks[id])) {
            miningRocks[id].destroy();
            miningRocks[id] = null;
        }
    }
});



var seats = [
    'prop_bench_01a',
    'prop_bench_01b',
    'prop_bench_01c',
    'prop_bench_02',
    'prop_bench_03',
    'prop_bench_04',
    'prop_bench_05',
    'prop_bench_06',
    'prop_bench_05',
    'prop_bench_08',
    'prop_bench_09',
    'prop_bench_10',
    'prop_bench_11',
    'prop_fib_3b_bench',
    'prop_ld_bench01',
    'prop_wait_bench_01',
    'hei_prop_heist_off_chair',
    'hei_prop_hei_skid_chair',
    'prop_chair_01a',
    'prop_chair_01b',
    'prop_chair_02',
    'prop_chair_03',
    'prop_chair_04a',
    'prop_chair_04b',
    'prop_chair_05',
    'prop_chair_06',
    'prop_chair_05',
    'prop_chair_08',
    'prop_chair_09',
    'prop_chair_10',
    'v_club_stagechair',
    'prop_chateau_chair_01',
    'prop_clown_chair',
    'prop_cs_office_chair',
    'prop_direct_chair_01',
    'prop_direct_chair_02',
    'prop_gc_chair02',
    'prop_off_chair_01',
    'prop_off_chair_03',
    'prop_off_chair_04',
    'prop_off_chair_04b',
    'prop_off_chair_04_s',
    'prop_off_chair_05',
    'prop_old_deck_chair',
    'prop_old_wood_chair',
    'prop_rock_chair_01',
    'prop_skid_chair_01',
    'prop_skid_chair_02',
    'prop_skid_chair_03',
    'prop_sol_chair',
    'prop_wheelchair_01',
    'prop_wheelchair_01_s',
    'p_armchair_01_s',
    'p_clb_officechair_s',
    'p_dinechair_01_s',
    'p_ilev_p_easychair_s',
    'p_soloffchair_s',
    'p_yacht_chair_01_s',
    'v_club_officechair',
    'v_corp_bk_chair3',
    'v_corp_cd_chair',
    'v_corp_offchair',
    'v_ilev_chair02_ped',
    'v_ilev_hd_chair',
    'v_ilev_p_easychair',
    'v_ret_gc_chair03',
    'prop_ld_farm_chair01',
    'prop_table_04_chr',
    'prop_table_05_chr',
    'prop_table_06_chr',
    'v_ilev_leath_chr',
    'prop_table_01_chr_a',
    'prop_table_01_chr_b',
    'prop_table_02_chr',
    'prop_table_03b_chr',
    'prop_table_03_chr',
    'prop_torture_ch_01',
    'v_ilev_fh_dineeamesa',
    'v_ilev_fh_kitchenstool',
    'v_ilev_tort_stool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'v_ilev_fh_kitchenstool',
    'hei_prop_yah_seat_01',
    'hei_prop_yah_seat_02',
    'hei_prop_yah_seat_03',
    'prop_waiting_seat_01',
    'prop_yacht_seat_01',
    'prop_yacht_seat_02',
    'prop_yacht_seat_03',
    'prop_hobo_seat_01',
    'prop_rub_couch01',
    'miss_rub_couch_01',
    'prop_ld_farm_couch01',
    'prop_ld_farm_couch02',
    'prop_rub_couch02',
    'prop_rub_couch03',
    'prop_rub_couch04',
    'p_lev_sofa_s',
    'p_res_sofa_l_s',
    'p_v_med_p_sofa_s',
    'p_yacht_sofa_01_s',
    'v_ilev_m_sofa',
    'v_res_tre_sofa_s',
    'v_tre_sofa_mess_a_s',
    'v_tre_sofa_mess_b_s',
    'v_tre_sofa_mess_c_s',
    'prop_roller_car_01',
    'prop_roller_car_02',
    'v_ret_gc_chair02',
    'v_serv_ct_chair02',
]

var seatHashes = [-1118419705,
    538002882,
-474978775,
    1224329141,
-377849416,
-70627249,
-470815620,
    -1254619912,
    508864775];

function getHashes() {
    seats.forEach((seat) => {
        seatHashes.push(mp.game.joaat(seat))
    });
}

getHashes();

doorToSaveModel = null;
doorToSavePosition = null;
let doorDebug = false;

/*mp.keys.bind(96, true, () => {

    doorDebug = !doorDebug;
    if(doorDebug) mp.gui.chat.push('Door debug is active!')
    else mp.gui.chat.push('Door debug is inactive!')
});*/

var startedSitting = false;

mp.keys.bind(69, true, async () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (sitting && !startedSitting) {
        
        if (sitChairPos) {
            let playerPos = mp.players.local.position;
            mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_ARMCHAIR', sitChairPos.x, sitChairPos.y, (playerPos.z - sitChairPos.z) / 2, 180.0, 2, true, false);
        }


        while (mp.players.local.isUsingScenario('PROP_HUMAN_SEAT_ARMCHAIR')) await mp.game.waitAsync(100);
        mp.players.local.clearTasks();
        sitting = false;
        sitChairPos = null;
    }

    else if (canSit && !sitting) {
        sitChairPos = mp.game.invokeVector3("0x3FEF770D40960D5A", raycast.entity, false)
        let playerPos = mp.players.local.position;
        let chairheading = mp.game.invokeFloat("0xE83D4F9BA2A38914", raycast.entity) + 180.0;
        if (sitChairPos.x === 0) return;
        mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_ARMCHAIR', sitChairPos.x, sitChairPos.y, sitChairPos.z + (playerPos.z - sitChairPos.z) / 2, chairheading, 0, true, false);
        sitting = true;
        startedSitting = true;
        setTimeout(() => {
            if (mp.players.local.getSpeed() > 0) {
                mp.players.local.clearTasks();
                mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_ARMCHAIR', sitChairPos.x, sitChairPos.y, sitChairPos.z + (playerPos.z - sitChairPos.z) / 2, chairheading + 180.0, 0, true, true);
                
            }
            startedSitting = false;
        }, 2500)
    }

    if (canPick) {
        switch (raycastMenuIndex) {
            case 0:
                mp.events.callRemote('PickUpItem', raycast.entity.getVariable("droppedId"));
                break;
            case 1:
                mp.events.callRemote('OpenDroppedBag', raycast.entity.getVariable("droppedId"));
                break
            default:
                return;

        }
    }

    if (canOpenInv) {
        mp.events.callRemote('OpenHouseInventory', raycast.entity.houseInv, raycast.entity.objId);
        
    }

    if (canMine) {
        mp.events.callRemote('MineRock', raycast.entity.RockId);
    }

});


mp.events.add('savedoorclient', (name, descript) => {
    if (doorDebug) {
        if (doorToSaveModel && doorToSavePosition) {
            mp.events.callRemote("savedoorindb", JSON.stringify(doorToSavePosition), JSON.stringify(doorToSaveModel), name, descript);
        }
        else mp.gui.chat.push("No door to save amigo")
    }
});




mp.events.addDataHandler('droppedObject', (entity, value, oldValue) => {
    if (value !== null) {
        entity.notifyStreaming = true;
        let awaitItem = setInterval(() => {
            if (entity.handle !== 0) {

                entity.placeOnGroundProperly();
                clearInterval(awaitItem);


            }
        }, 100);
    }
});


mp.events.addDataHandler('droppedHandle', (entity, value, oldValue) => {
    if (value !== null) {
        entity.notifyStreaming = true;
        let awaitItem = setInterval(() => {
            if (entity.handle !== 0) {
                
                entity.placeOnGroundProperly();
                entity.setCollision(false, false);
              
                clearInterval(awaitItem);
            }
        }, 100);
        
    }
});


mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === "object") {
        if (entity.hasVariable('droppedObject')) {


            let awaitItem = setInterval(() => {
                if (entity.handle !== 0) {
                    entity.placeOnGroundProperly();
                    clearInterval(awaitItem);
                }
            }, 1000);


        }
        if (entity.hasVariable('droppedHandle')) {


            let awaitItem = setInterval(() => {
                if (entity.handle !== 0 && !mp.game.invoke("0xCCF1E97BEFDAE480", entity.handle)) {
                    entity.placeOnGroundProperly();
                    mp.game.invoke("0x1A9205C1B9EE827F", entity.handle, false, false);
                    clearInterval(awaitItem);
                }
            }, 100);
        }
    }
    if (entity.type === "object" && entity.RockId) {
        entity.placeOnGroundProperly();

    }
});


function initObjects() {
    var objects = mp.objects.toArray();
    objects.forEach((object) => { 
        object.notifyStreaming = true;
    })
}



initObjects();



}