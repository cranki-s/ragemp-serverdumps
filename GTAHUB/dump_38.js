{
/** TODO: Maybe in the future, need to sync phone in player hand. In client-side for GTA V is difficult.
 * Need a new form to sync for game.
 */

const PLAYER_LOCAL = mp.players.local;

const TYPES_SETTINGS = {

    "BINOCULAR" : {
        scaleform : "BINOCULARS",
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "SheriffStation",
            maxAngleLarge : 45,
            maxAngleWidth : 15,
            defaultZoom : 30,
            minZoom     : 40,
            maxZoom     : -3
        },
        disableUI: true,
        freezePosition: false
    },

    "WEAZEL": {
        scaleform : "breaking_news",
        camera: {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle: "default",
            maxAngleLarge : 45,
            maxAngleWidth : 15,
            defaultZoom : 30,
            minZoom     : 40,
            maxZoom     : 3
        },
        disableUI: true,
        freezePosition: false
    },

    "TV" : {
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "default",
            maxAngleLarge : 45,
            maxAngleWidth : 15,
            defaultZoom :   30,
            minZoom     :   40,
            maxZoom     :   3,
            currentFilter:  0,
            filters     : [
                "default",
                "Hint_cam",
                "Multipayer_spectatorCam"
            ]
        },
        disableUI: true,
        freezePosition: false
    },

    "SECURITY" : {
        scaleform : "security_camera",
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "default",
            maxAngleLarge : 45,
            maxAngleWidth : 15,
            defaultZoom : 30,
            minZoom     : 40,
            maxZoom     : 20
        },
        disableUI: true,
        freezePosition: true
    },

    "TELESCOPE" : {
        scaleform : "telescope",
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "telescope",
            maxAngleLarge : 45,
            maxAngleWidth : 25,
            defaultZoom : 30,
            minZoom     : 40,
            maxZoom     : -6
        },
        disableUI: true,
        freezePosition: true
    },

    "PHONE" : {
        selfie: false,
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "phone_cam",
            maxAngleLarge : 45,
            maxAngleWidth : 25,
            defaultZoom : 35,
            minZoom     : 40,
            maxZoom     : 30,
            offset      : new mp.Vector3(0.3, 0.2, 0.5),
            object      : null,
            phone       : null,
            currentFilter: 0,
            filters     : [
                'phone_cam',
                'phone_cam1',
                'phone_cam10',
                'phone_cam11',
                'phone_cam12',
                'phone_cam13',
                'phone_cam2',
                'phone_cam3',
                'phone_cam4',
                'phone_cam5',
                'phone_cam6',
                'phone_cam7',
                'phone_cam8',
                'phone_cam9'
            ]
        },
        disableUI: false,
        freezePosition: true,
    },

    "PHOTO" : {
        selfie: false,
        camera : {
            name : "DEFAULT_SCRIPTED_FLY_CAMERA",
            timecycle : "phone_cam",
            maxAngleLarge : 45,
            maxAngleWidth : 25,
            defaultZoom : 35,
            minZoom     : 40,
            maxZoom     : 10,
            offset      : new mp.Vector3(0.3, 0.2, 0.5),
            object      : null,
            currentFilter: 0,
            filters     : [
                'phone_cam',
                'phone_cam1',
                'phone_cam10',
                'phone_cam11',
                'phone_cam12',
                'phone_cam13',
                'phone_cam2',
                'phone_cam3',
                'phone_cam4',
                'phone_cam5',
                'phone_cam6',
                'phone_cam7',
                'phone_cam8',
                'phone_cam9'
            ]
        },
        disableUI: false,
        freezePosition: true,
    }
}

let inDisplay = false;
let SETTINGS = null;
let cam = null;
let camType = ""
let camRotationInitial = null;
let fromPos = null;
let lookAt = null;

mp.game.streaming.requestAnimDict("cellphone@self");
mp.game.streaming.requestAnimDict("cellphone@");

mp.rpc("item_camera:toggle", (type, posJson, lookAtJson) => {
    type = type.toUpperCase()

    // get settings according with type and search it in JSON TYPES_SETTINGS, if not found is none so delete current cam
    SETTINGS = TYPES_SETTINGS[type] || "NONE"

    // only toggle UI if the setting disable it or enable if the camera disable it
    if (SETTINGS.disableUI || !isHudToggled()) {
        toggleHud(!isHudToggled());
    }

    if (SETTINGS !== "NONE") {
        PLAYER_LOCAL.freezePosition(SETTINGS.freezePosition); // freeze player position

        // set cam properties
        if (posJson && lookAtJson) {
            try {
                fromPos = JSON.parse(posJson);
                lookAt = JSON.parse(lookAtJson);

                if (!fromPos.x && !fromPos.y && !fromPos.z && !lookAt.x && !lookAt.y && !lookAt.z) {
                    fromPos = PLAYER_LOCAL.position;
                    lookAt = null;
                }
            } catch {
                mp.console.logWarning(`cant parse special camera (type=${type},fromPos=${fromPos},lookAt=${lookAtJson})`);
                fromPos = PLAYER_LOCAL.position;
                lookAt = null;
            }
        } else {
            fromPos = PLAYER_LOCAL.position;
            lookAt = null;
        }

        camType = type;
        createCamera();
        mp.game.graphics.setTimecycleModifier(SETTINGS.camera.timecycle);
        mp.game.ui.displayHud(false);
        inDisplay = true;
    } else {
        inDisplay = false;
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
        mp.game.graphics.setTimecycleModifier("default");
        mp.game.ui.displayHud(true);
        PLAYER_LOCAL.freezePosition(false);
        if (mp.cameras.exists(cam)) cam.destroy();
        camType = "";
    }
});

mp.events.add("render", () => {
    if (inDisplay) {

        //DISABLES ACTIONS TO PLAYER
        mp.game.controls.disableControlAction(0, 200, true) //DISABLE ESC

        //CAMERA CURSOR FOLLOWING
        let x = mp.game.controls.getDisabledControlNormal(0, 220);
        let y = mp.game.controls.getDisabledControlNormal(0, 221);
        let rot = cam.getRot(2);

        let newZ = rot.z;
        let newX = rot.x;

        if (!SETTINGS.selfie) {
            // only can move rotation when not are in selfie mode
            newZ = rot.z + x * -10*(0.3);

            if (!lookAt) PLAYER_LOCAL.setRotation(camRotationInitial.x, camRotationInitial.y, newZ, 1, true);

            //SIDES TOP AND BOTTOM LIMIT
            if (rot.x + y * -10*(0.3) <= camRotationInitial.x + SETTINGS.camera.maxAngleWidth && rot.x + y * -10*(0.3) >= camRotationInitial.x - SETTINGS.camera.maxAngleWidth) {
                newX = rot.x + y * -10*(0.3);
            }
            cam.setRot(newX, rot.y, newZ, 2);

            // if cam type is phone but the object is not created, execute this
            if (camType === "PHONE" && !SETTINGS.camera.phone) {
                PLAYER_LOCAL.taskPlayAnim("cellphone@", "cellphone_photo_idle", 4.0, 4.0, -1, 18, 0.0, false, false, false);
                createPhone();
            }
        } else {
            // selfie system (rotation)
            let up = mp.game.controls.isControlPressed(0, 32) // INPUT_MOVE_UP_ONLY
            let down = mp.game.controls.isControlPressed(0, 33) // INPUT_MOVE_DOWN_ONLY
            let left = mp.game.controls.isControlPressed(0, 34) // INPUT_MOVE_LEFT_ONLY
            let right = mp.game.controls.isControlPressed(0, 35) // INPUT_MOVE_RIGHT_ONLY
            if (up) SETTINGS.camera.offset.z = SETTINGS.camera.offset.z + 0.005 >= 0.7 ? 0.7 : SETTINGS.camera.offset.z + 0.005
            if (down) SETTINGS.camera.offset.z = SETTINGS.camera.offset.z - 0.005 <= 0.3 ? 0.3 : SETTINGS.camera.offset.z - 0.005
            if (left) SETTINGS.camera.offset.x = SETTINGS.camera.offset.x + 0.005 >= 0.25 ? 0.25 : SETTINGS.camera.offset.x + 0.005
            if (right) SETTINGS.camera.offset.x = SETTINGS.camera.offset.x - 0.005 <= -0.3 ? -0.3 : SETTINGS.camera.offset.x - 0.005
            if (up || down || left || right) {
                // update camera position if player press any key
                cam.attachToPedBone(PLAYER_LOCAL.handle, 57005, SETTINGS.camera.offset.x, SETTINGS.camera.offset.y, SETTINGS.camera.offset.z, true);
                let camPos = cam.getCoord();
                if (SETTINGS.camera.object) SETTINGS.camera.object.slide(camPos.x, camPos.y, camPos.z, 1.0, 1.0, 1.0, false);
            }
        }

        //ZOOM
        let currentZoom = cam.getFov();
        if (mp.game.controls.isControlPressed(0, 241) && currentZoom > SETTINGS.camera.maxZoom) {
            currentZoom --;
        }
        if (mp.game.controls.isControlPressed(0, 242) && currentZoom < SETTINGS.camera.minZoom) {
            currentZoom ++;
        }
        cam.setFov(currentZoom);

        //SCALEFORM EFFECT
        if (SETTINGS.scaleform) {
            let scaleform = mp.game.graphics.requestScaleformMovie(SETTINGS.scaleform);
            mp.game.graphics.pushScaleformMovieFunction(scaleform, "SET_CAM_LOGO");
            mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
            mp.game.graphics.popScaleformMovieFunctionVoid();
            mp.game.graphics.drawScaleformMovieFullscreen(scaleform, 255, 255, 255, 255, true);
        }

        if (SETTINGS.camera.filters) {
            // Filters
            let arrowLeft = mp.game.controls.isControlJustPressed(3, 174) // INPUT_CELLPHONE_LEFT
            let arrowRight = mp.game.controls.isControlJustPressed(3, 175) // INPUT_CELLPHONE_RIGHT
            if (arrowLeft || arrowRight) {
                if (arrowLeft) SETTINGS.camera.currentFilter = SETTINGS.camera.currentFilter - 1 < 0 ? SETTINGS.camera.filters.length - 1 : SETTINGS.camera.currentFilter - 1
                else SETTINGS.camera.currentFilter = SETTINGS.camera.currentFilter + 1 > SETTINGS.camera.filters.length - 1 ? 0 : SETTINGS.camera.currentFilter + 1
                mp.game.graphics.setTimecycleModifier(SETTINGS.camera.filters[SETTINGS.camera.currentFilter]);
            }
        }

        if (SETTINGS.selfie !== undefined && camType === "PHONE") {

            let toggleSelfie = mp.game.controls.isControlJustPressed(3, 184); // INPUT_CELLPHONE_CAMERA_SELFIE
            if (toggleSelfie) {
                SETTINGS.selfie = !SETTINGS.selfie
                if (SETTINGS.selfie) {
                    destroyObjects();
                    PLAYER_LOCAL.taskPlayAnim("cellphone@self", "selfie_in", 4.0, 4.0, -1, 18, 0.0, true, true, true)
                    cam.attachToPedBone(PLAYER_LOCAL.handle, 57005, SETTINGS.camera.offset.x, SETTINGS.camera.offset.y, SETTINGS.camera.offset.z, true);
                    cam.pointAtPedBone(PLAYER_LOCAL.handle, 65068, 0, 0, 0, true);
                    createInvisibleObject();
                } else {
                    PLAYER_LOCAL.taskClearLookAt();
                    destroyObjects();
                    PLAYER_LOCAL.clearTasks();
                    if (mp.cameras.exists(cam)) cam.destroy();
                    createCamera();
                }
            }
        }

        //LOAD CAMERA (RENDER)
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
});

function createCamera() {
    cam = mp.cameras.new('DEFAULT_SCRIPTED_FLY_CAMERA', fromPos, PLAYER_LOCAL.getRotation(5), SETTINGS.camera.defaultZoom);
    camRotationInitial = PLAYER_LOCAL.getRotation(5);

    if (!lookAt) cam.attachTo(PLAYER_LOCAL.handle, 0, 0, 1.0, false);
    else cam.pointAtCoord(lookAt.x, lookAt.y, lookAt.z);
}

function createPhone() {
    if (SETTINGS.camera && mp.objects.exists(SETTINGS.camera.phone)) {
        SETTINGS.camera.phone.destroy()
    }

    let playerPos = PLAYER_LOCAL.position;
    playerPos.z -= 15; // create the object underground
    SETTINGS.camera.phone = mp.objects.new(mp.game.joaat("p_cs_cam_phone"), playerPos, {
        rotation: 0,
        alpha: 255,
        dimension: -1
    });

    setTimeout( () => {
            if (SETTINGS.camera && mp.objects.exists(SETTINGS.camera.phone)) {
                SETTINGS.camera.phone.attachTo(PLAYER_LOCAL.handle,
                    PLAYER_LOCAL.getBoneIndex(18905),
                    0.15, 0.05, 0.0,
                    -26, -148, -158,
                    false, false, false, false, 2, true)
            }
        }
        , 1000)
}

function destroyObjects() {
    if (SETTINGS.camera) {
        if (mp.objects.exists(SETTINGS.camera.phone)) {
            SETTINGS.camera.phone.destroy();
            SETTINGS.camera.phone = null;
        }
        if (mp.objects.exists(SETTINGS.camera.object)) {
            SETTINGS.camera.object.destroy();
            SETTINGS.camera.object = null;
        }
    }
}

/** This object is used to set task look at for player */
function createInvisibleObject() {
    let camPos = cam.getCoord();
    SETTINGS.camera.object = mp.objects.new(mp.game.joaat("p_cs_cam_phone"), camPos, {
        rotation: 0,
        alpha: 0,
        dimension: -1
    })

    setTimeout( () => {
        // need timeout to create item and player can execute task look at object
        if (SETTINGS.camera && mp.objects.exists(SETTINGS.camera.object)) {
            camPos = cam.getCoord();
            SETTINGS.camera.object.slide(camPos.x, camPos.y, camPos.z, 1.0, 1.0, 1.0, false);
            PLAYER_LOCAL.taskLookAt(SETTINGS.camera.object.handle, -1, 0, 0);
        }
    }, 1000)
}

// when player press BACKSPACE and have phone camera, disable it and open phone again
mp.keys.bind(0x08, false, () => {
    if (camType === "PHONE") {
        SETTINGS.selfie = false;
        destroyObjects();
        PLAYER_LOCAL.clearTasks();
        mp.events.call("item_camera:toggle", "NORMAL")
    }
})
}