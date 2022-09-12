{
mp.events.add({
    "ShowDelearShip": (dealership,vehicle_list) => {
        //room = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle);
        //dealer = mp.game.interior.getInteriorAtCoords(317.37140000, - 1168.13400000, 33.63773000);
        DestroyHud();
        mp.game.cam.doScreenFadeOut(1000)
        pos = dealerPreviewPos[dealership];
        
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/DealershiUI/index.html")
        }
        if (dealership !== "Premium") {
            global.uiGlobal_Browsers.execute("app.showDealership('" + vehicle_list + "', false);");
        }
        else global.uiGlobal_Browsers.execute("app.showDealership('" + vehicle_list + "', true);");
        mp.gui.cursor.visible = !0
        setTimeout(() => { mp.game.cam.doScreenFadeIn(1000)}, 2000)
    },
    "DisplayCar": (carModel) => {
        CreateVehicle(carModel.toLowerCase());
        GetVehicleData(carModel.toLowerCase());
    },
    "click": (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
        if (upOrDown == "up") {
            if (holdToMove == true) {
                holdToMove = false;
                mp.gui.cursor.visible = true;
                global.uiGlobal_Browsers.execute("app.showText();");
            }
        }
    },
    "activateCamera"() {
        holdToMove = true;
        mp.gui.cursor.visible = false;
    },
    "setColor"(r, g, b) {
        if (veh != null) {
            rgb = [parseInt(r), parseInt(g), parseInt(b)]
            veh.setCustomPrimaryColour(parseInt(r), parseInt(g), parseInt(b));
            veh.setCustomSecondaryColour(parseInt(r), parseInt(g), parseInt(b));
        }
    },
    "closeDeaerlship"() {
        DeleteVeh();
        DestroyCamera();
        mp.events.call("Destroy_Character_Menu");
        ReactivateHud();
    },
    "buyCar"(model , r, g, b, premium) {
        mp.events.call("closeDeaerlship");
        mp.events.callRemote("BuyDealerCar", model, r, g, b, premium);
    }
});
let dealer = 0;
let room = 0;
let veh = null;
let holdToMove = false;
let firstOpen = false;
let rgb = [64, 191, 191]
let pos = null;
let carCamera = null
let angleY = 0.0
let angleZ = 0.0
let radius = 6

function DeleteVeh() {
    if (veh != null) {
        veh.destroy();
        veh = null
    };
}

function DestroyCamera() {
    if (carCamera) {
        carCamera.setActive(!1);
        carCamera.destroy();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        carCamera = null;
        mp.game.invoke('0x31B73D1EA9F01DA2');
    }
}


let dealerPreviewPos = {
    'Vapid': new mp.Vector3(-190.15034, -1173.4944, 13.943027),
    'Luxury': new mp.Vector3(-782.2957, -236.53955, 29.579832),
    'Premiumv2': new mp.Vector3(-1262.9532, -362.06955, 27.829514),
    'Benefactor': new mp.Vector3(-68.07846, 70.07225, 63.23137),
    'Sanders': new mp.Vector3(288.13553, -1158.2523, 21.766968),
    'SandyBikes': new mp.Vector3(1219.8912, 2732.676, 30.495064),
    'Paleto': new mp.Vector3(-243.50587, 6228.1157, 21.223396),
    'Premium': new mp.Vector3(-51.015816, -1099.5912, 18.093657)
}


function GetVehicleData(carModel) {
    let acc = (mp.game.vehicle.getVehicleModelAcceleration(mp.game.joaat(carModel))/0.4) * 100;
    let brake = (mp.game.vehicle.getVehicleModelMaxBraking(mp.game.joaat(carModel))/1.5) * 100;
    let speed = (mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(carModel))/61) * 100;
    let traction = (mp.game.vehicle.getVehicleModelMaxTraction(mp.game.joaat(carModel))/3.3) * 100;


    global.uiGlobal_Browsers.execute(`app.updateVehicleData(${acc}, ${brake}, ${speed}, ${traction});`);

}

function CreateVehicle(carModel) {

    //DeleteVeh();
    if (carCamera === null) {
        CreateCamera();
        firstOpen = true;
    }
    if (veh === null) {
        veh = mp.vehicles.new(mp.game.joaat(carModel), pos,
            {
                heading: -136.246,
                numberPlate: 'CARROOM',
                alpha: 255,
                color: [rgb, rgb],
                locked: true,
                engine: false,
                dimension: 0
            });

    }
    else veh.model = mp.game.joaat(carModel);
    setTimeout(() => {
        veh.setCustomPrimaryColour(rgb[0], rgb[1], rgb[2]);
        veh.setCustomSecondaryColour(rgb[0], rgb[1], rgb[2]);
        veh.setDirtLevel(0);
    }, 10)
}

function ReactivateHud(){
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
    let vehPos = pos;
    carCamera = mp.cameras.new('DEFAULT_SCRIPTED_CAMERA', vehPos, new mp.Vector3(0, 0, 0), mp.game.invokeFloat("0x65019750A0324133"));
    carCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

};

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


function ProcessCamControls() {
    if (veh === null) return;
    let vehPos = pos;
    let newPos = ProcessNewPosition();
    mp.game.streaming.setFocusArea(newPos.x, newPos.y, newPos.z + 0.7, 0.0, 0.0, 0.0);
    carCamera.setCoord(newPos.x, newPos.y, newPos.z);
    carCamera.pointAtCoord(vehPos.x, vehPos.y, vehPos.z + 0.7);
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
    let vehPos = pos;

    let behindCam = new mp.Vector3(0, 0, 0);
    behindCam.x = vehPos.x + ((Math.cos(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.cos(angleZ))) / 2 * (radius + 0.5);
    behindCam.y = vehPos.y + ((Math.sin(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.sin(angleZ))) / 2 * (radius + 0.5);
    behindCam.z = vehPos.z + ((Math.sin(angleY))) * (radius + 0.5);

    let maxRadius = radius;

    const sizeofVehicle = mp.game.gameplay.getModelDimensions(veh.model);
    let dist = mp.game.system.vdist(sizeofVehicle.max.x, sizeofVehicle.max.y, sizeofVehicle.max.z, sizeofVehicle.min.x, sizeofVehicle.min.y, sizeofVehicle.min.z);
    if (dist < 4) maxRadius = 4;
    else if (dist > 4 && dist < 7) maxRadius = 6;
    else maxRadius = 7.5

    let offset = new mp.Vector3(0, 0, 0);
    offset.x = ((Math.cos(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.cos(angleZ))) / 2 * maxRadius;
    offset.y = ((Math.sin(angleZ) * Math.cos(angleY)) + (Math.cos(angleY) * Math.sin(angleZ))) / 2 * maxRadius;
    offset.z = ((Math.sin(angleY))) * maxRadius

    let position = new mp.Vector3(0, 0, 0);
    position.x = vehPos.x + offset.x;
    position.y = vehPos.y + offset.y;
    position.z = vehPos.z + offset.z;

    if (position.z < (pos.z - 0.24)) position.z = (pos.z - 0.24);
    if (position.z > (pos.z + 7.11)) position.z = (pos.z + 7.11);
    



    return position;

}

mp.events.add('render', () => {
    if (carCamera !== null && carCamera.isActive() && carCamera.isRendering() && holdToMove) {

        ProcessCamControls()
    }
    if (firstOpen) {
        ProcessCamControls();
        firstOpen = false;
    }
});
}