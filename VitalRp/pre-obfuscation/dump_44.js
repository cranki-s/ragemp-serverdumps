{
mp.events.add({
    "ShowFurnitureShop": (dealership, vehicle_list) => {

        DestroyHud();
        mp.game.cam.doScreenFadeOut(1000)


        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Builder/furniture/index.html");
        }
        mp.gui.cursor.visible = !0
        setTimeout(() => { mp.game.cam.doScreenFadeIn(1000) }, 2000)
    },
    "DisplayFurniture": (furModel) => {
        CreateFurniture(furModel.toLowerCase());
    },
    "click": (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
        if (upOrDown == "up") {
            if (holdToMove == true) {
                holdToMove = false;
                mp.gui.cursor.visible = true;
            }
        }
    },
    "activateCamera":() => {
        mp.gui.cursor.visible = false;
    },
    "closeFurniture": () => {
        DeleteObj();
        DestroyCamera();
        mp.events.call("Destroy_Character_Menu");
        ReactivateHud();
    },
    "BuyItemFromFurnitureStore": (model) => {

        mp.events.callRemote("BuyItemFromFurnitureStore", model);
    },
    "ActivateFurnitureCamera": () => {
        mp.gui.cursor.visible = false;
        holdToMove = true;
    }
});

let room = 0;
let furniture = null;
let holdToMove = false;
let firstOpen = false;
let pos = new mp.Vector3(2745.8323, 3489.258, 38.002144);
let furnitureCamera = null
let angleY = 0.0
let angleZ = 0.0
let radius = 6

function DeleteObj() {
    if (furniture != null) {
        furniture.destroy();
        furniture = null
    };
}


function DestroyCamera() {
    if (furnitureCamera != null) {
        furnitureCamera.setActive(!1);
        furnitureCamera.destroy();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        furnitureCamera = null;
        mp.game.invoke('0x31B73D1EA9F01DA2');
    }
}


async function CreateFurniture(furModel) {

    DeleteObj();

    if (furniture === null) {
        furniture = mp.objects.new(mp.game.joaat(furModel), pos,
            {
                rotation: new mp.Vector3 (0,0, 90),
                alpha: 255,
                dimension: mp.players.local.dimension
            });

    }
    while (!furniture.handle || furniture.handle === 0) await mp.game.waitAsync(100);
    furniture.placeOnGroundProperly();
    pos = furniture.getCoords(false);
    if (furnitureCamera === null) {
        CreateCamera();
        firstOpen = true;
    }
}

function ReactivateHud() {
    mp.events.call("show_radar");
    mp.events.call("showChat");
    mp.events.call("HideCarHUD");
    mp.events.call("initPhone");
    mp.events.call("show_player_hud", true);
}

function DestroyHud() {
    mp.events.call("show_player_hud", false);
    mp.events.call("hide_radar");
    mp.events.call("hideChat");
    mp.events.call("destroyPhone");
    mp.events.call("HideCarHUD");
}

function CreateCamera() {
    let gameCamRot = mp.game.cam.getGameplayCamRot(0);
    let furPos = pos;
    furnitureCamera = mp.cameras.new('DEFAULT_SCRIPTED_CAMERA', furPos, new mp.Vector3(0, 0, 0), mp.game.invokeFloat("0x65019750A0324133"));
    furnitureCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

};

function ProcessCamControls() {
    if (furniture === null) return;
    let furPos = pos;
    let newPos = ProcessNewPosition();
    mp.game.streaming.setFocusArea(newPos.x, newPos.y, newPos.z + 0.7, 0.0, 0.0, 0.0);
    furnitureCamera.setCoord(newPos.x, newPos.y, newPos.z);
    furnitureCamera.pointAtCoord(furPos.x, furPos.y, furPos.z + 0.7);
}

function ProcessNewPosition() {

    let mouseX = 0.0
    let mouseY = 0.0

    mp.game.controls.disableAllControlActions(2);

    mouseX = (mp.game.controls.getDisabledControlNormal(1, 1) * 1);
    mouseY = (mp.game.controls.getDisabledControlNormal(1, 2) * 1);

    angleZ = angleZ - mouseX;
    angleY = angleY + mouseY;
    if (angleY > 89.0) {
        angleY = 89.0
    } else if
        (angleY < -89.0) {
        angleY = -89.0
    }
    let furPos = pos;

    let behindCam = new mp.Vector3(0, 0, 0);
    behindCam.x = furPos.x + ((Math.cos(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.cos(angleZ))) / 2 * (radius + 0.5);
    behindCam.y = furPos.y + ((Math.sin(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.sin(angleZ))) / 2 * (radius + 0.5);
    behindCam.z = furPos.z + ((Math.sin(angleY))) * (radius + 0.5);

    let maxRadius = radius;

    const sizeofFurniture = mp.game.gameplay.getModelDimensions(furniture.model);
    let dist = mp.game.system.vdist(sizeofFurniture.max.x, sizeofFurniture.max.y, sizeofFurniture.max.z, sizeofFurniture.min.x, sizeofFurniture.min.y, sizeofFurniture.min.z);
    if (dist < 4) maxRadius = 4;
    else if (dist > 4 && dist < 7) maxRadius = 6;
    else maxRadius = 7.5

    let offset = new mp.Vector3(0, 0, 0);
    offset.x = ((Math.cos(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.cos(angleZ))) / 2 * maxRadius;
    offset.y = ((Math.sin(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.sin(angleZ))) / 2 * maxRadius;
    offset.z = ((Math.sin(angleY))) * maxRadius

    let position = new mp.Vector3(0, 0, 0);
    position.x = furPos.x + offset.x;
    position.y = furPos.y + offset.y;
    position.z = furPos.z + offset.z;

    if (position.z < (pos.z - 0.24)) position.z = (pos.z - 0.24);
    if (position.z > (pos.z + 7.11)) position.z = (pos.z + 7.11);




    return position;

}

mp.events.add('render', () => {
   if (furnitureCamera !== null && furnitureCamera.isActive() && furnitureCamera.isRendering() && holdToMove) {

        ProcessCamControls()
    }
    if (firstOpen) {
        ProcessCamControls();
        firstOpen = false;
    }
});
}