{
let radarWindow = null;

var radarSettings = {
    powerON: false,
    fwdXmit: false,
    bwdXmit: false,
    fwdFast: false,
    bwdFast: false,
    speedLimit: 0,
    locked: {
        fwdSpeed: 0,
        bwdSpeed: 0,
        fwdState: false,
        bwdState: false,
        bwdPlate: "",
        fwdPlate: "",
        bwdPlateType: 0,
        fwdPlateType: 0
    }
}

var radarData = {
    fwdPlate: "",
    fwdSpeed: 0,
    fwdPlateType: 0,
    fwdDir: 0,
    bwdPlate: "",
    bwdSpeed: 0,
    bwdPlateType: 0,
    bwdDir: 0,
}

var policeVehicles = ["buffalo5pol", "pbuffalo4", "unkamacho", "pdkamacho", "truscout", "nscoutpol", "poltaxi", "centurionlspd", "policeb2", "policeb1", "polvacca", "nscoutbcso", "nscoutlspd", "sheriff2", "sheriff2", "fibp3"];









function GetVehicleInDirectionSphere(entFrom, coordFrom, coordTo) {
    const vehicle = mp.raycasting.testCapsule(coordFrom, coordTo, 10.0, entFrom, 10);
    if (vehicle) { if (typeof (vehicle.entity) === 'number' && vehicle.entity !== 0 && mp.game.entity.isAnObject(vehicle.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(vehicle.entity); } }
    return vehicle;
}


let tickResp = 0;
let tick = 0;

mp.events.add('render', () => {
    if (mp.players.local.isInAnyVehicle(!1) && (mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle || mp.players.local.vehicle.getPedInSeat(-0) === mp.players.local.handle)) {
        if (radarWindow === null) {
            tickResp++;
            if (tickResp > 100) {
                vehicleDisplayName = mp.game.vehicle.getDisplayNameFromVehicleModel(mp.players.local.vehicle.model).toLowerCase();

                if (policeVehicles.includes(vehicleDisplayName)) {
                    radarWindow = mp.browsers.new("package://cef/Interfete/radar/radar.html");
                    if (mp.players.local.vehicle.hasVariable("radarSettings") && mp.players.local.vehicle.getVariable("radarSettings") != null) {
                        radarSavedSettings = JSON.parse(mp.players.local.vehicle.getVariable("radarSettings"));
                        radarSettings = radarSavedSettings;
                    }
                    else resetRadarSettings();
                    radarWindow.execute("updateRadarSettings('" + JSON.stringify(radarSettings) + "');");

                }
                tickResp = 0;
            }

        }
        else {
            if (radarSettings.powerON) {
                if (tick > 100) {
                    ManageVehicleRadar();
                    tick = 0;
                }
                else tick++;
            }
        }
    }

    else if (radarWindow !== null) {
        radarWindow.destroy();
        radarWindow = null;
        tickResp = 0;
    }

});


function GetEntityRelativeDirection(ownD, tarD) {
    let angleDiff = Math.abs((ownD - tarD + 180) % 360 - 180)

    if (angleDiff < 45) return 1;
    else if (angleDiff > 135) return 2;
}


function ManageVehicleRadar() {

    let vehicle = mp.players.local.vehicle;
    if (vehicle == null) return



    let vehicleHead = Math.round(vehicle.getHeading(), 0);

    if (radarSettings.fwdXmit) {
        let start = vehicle.getOffsetFromInWorldCoords(0, 5.0, 0.0)
        let offset = vehicle.getOffsetFromInWorldCoords(-2.5, 50.0, 0.0)


        let fwdVeh = GetVehicleInDirectionSphere(vehicle, start, offset)

        if (fwdVeh && fwdVeh.entity.type === 'vehicle') {
            if (fwdVeh.entity.handle !== mp.players.local.vehicle.handle) {
                radarData.fwdPlateType = fwdVeh.entity.getNumberPlateTextIndex();
                radarData.fwdPlate = fwdVeh.entity.getNumberPlateText();
                radarData.fwdSpeed = Math.round(fwdVeh.entity.getSpeed() * 3.6, 0);
                let targetHeading = Math.round(fwdVeh.entity.getHeading(), 0);
                radarData.fwdDir = GetEntityRelativeDirection(vehicleHead, targetHeading)
            }
            else {
                radarData.fwdSpeed = 0;
                radarData.fwdDir = 0;
            }
        }
        else {
            radarData.fwdSpeed = 0;
            radarData.fwdDir = 0;
        }
    }

    if (radarSettings.bwdXmit) {
        let start = vehicle.getOffsetFromInWorldCoords(0, -5.0, 0.0)
        let offset = vehicle.getOffsetFromInWorldCoords(-2.5, -50.0, 0.0)


        let bwdVeh = GetVehicleInDirectionSphere(vehicle, start, offset)

        if (bwdVeh && bwdVeh.entity.type === 'vehicle') {
            if (bwdVeh.entity.handle !== mp.players.local.vehicle.handle) {
                radarData.bwdPlateType = bwdVeh.entity.getNumberPlateTextIndex();
                radarData.bwdPlate = bwdVeh.entity.getNumberPlateText();
                radarData.bwdSpeed = Math.round(bwdVeh.entity.getSpeed() * 3.6, 0);
                let targetHeading = Math.round(bwdVeh.entity.getHeading(), 0);
                radarData.bwdDir = GetEntityRelativeDirection(vehicleHead, targetHeading)
            }
            else {
                radarData.bwdSpeed = 0;
                radarData.bwdDir = 0;
            }
        }
        else {
            radarData.bwdSpeed = 0;
            radarData.bwdDir = 0;
        }
    }
    if (radarWindow !== null) {

        radarWindow.execute("updateRadar('" + JSON.stringify(radarData) + "');");
    }
}

function saveRadartoVehicle() {
    mp.events.callRemote("SaveVehicleRadarData", mp.players.local.vehicle.remoteId, JSON.stringify(radarSettings));

}

function resetRadarSettings() {
    radarSettings.powerON = false;
    radarSettings.fwdXmit = false;
    radarSettings.bwdXmit = false;
    radarSettings.fwdFast = false;
    radarSettings.bwdFast = false;
    radarSettings.speedLimit = 0;
    radarSettings.locked.fwdState = false;
    radarSettings.locked.bwdState = false;
    radarSettings.locked.fwdSpeed = 0;
    radarSettings.locked.bwdSpeed = 0;
    radarSettings.locked.fwdPlate = "";
    radarSettings.locked.bwdPlate = "";
    radarSettings.locked.fwdPlateType = 0;
    radarSettings.locked.bwdPlateType = 0;
}

mp.events.add({
    "powerOn": (state) => {
        radarSettings.powerON = state;
        if (state === false) resetRadarSettings();
        saveRadartoVehicle();
    },
    "turnAntena": (antena, state) => {
        if (antena === "front") radarSettings.fwdXmit = state;
        if (antena === "rear") radarSettings.bwdXmit = state;
        saveRadartoVehicle()
    },
    "turnSpeedLock": (antena, state) => {
        if (antena === "front") radarSettings.fwdFast = state;
        if (antena === "rear") radarSettings.bwdFast = state;
        saveRadartoVehicle()
    },
    "setSpeedLimit": (value) => {
        radarSettings.speedLimit = value;
        saveRadartoVehicle()
    },
    "saveLockedSettings": (lockedSettings) => {
        lockedSet = JSON.parse(lockedSettings);
        radarSettings.locked.fwdState = lockedSet.front;
        radarSettings.locked.bwdState = lockedSet.rear;
        radarSettings.locked.fwdSpeed = lockedSet.frontSpeed;
        radarSettings.locked.bwdSpeed = lockedSet.rearSpeed;
        radarSettings.locked.fwdPlate = lockedSet.frontPlate;
        radarSettings.locked.bwdPlate = lockedSet.rearPlate;
        radarSettings.locked.fwdPlateType = lockedSet.frontPlateType;
        radarSettings.locked.bwdPlateType = lockedSet.rearPlateType;
        saveRadartoVehicle()
    },
    "syncSettings": () => {
        vehicle = mp.players.local.vehicle;
        radarSavedSettings = JSON.parse(vehicle.getVariable("radarSettings"));
        radarSettings = radarSavedSettings;
        if (radarWindow !== null) {
            radarWindow.execute("updateRadarSettings('" + JSON.stringify(radarSettings) + "');");
        }
    }
})


}