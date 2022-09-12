{

var criver = ["Vinewood Hills", "Baytree Canyon", "Land Act Dam", "Land Act Reservoir", "Tataviam Mountains", "Mirror Park"]
var clakes = ["Lago Zancudo", "Fort Zancudo", "Zancudo River", "Tongva Valley", "Alamo Sea", "Stab City", "Calafia Bridge", "Cassidy Creek", "Mount Chiliad", "Grapeseed", "Sandy Shores", "Raton Canyon", "Chiliad Mountain State Wilderness"]

let baits = [];
let bait = null;
let baitIndex = 0;
let baitUI = null;


let bannedMaterials = [1187676648, 1945073303, 1639053622, 3108646581, 765206029, 2128369009];
let waterHit = null;
let waterMarker = null;
let fishingDist = 5;
let fishCatched = false;
let fishCatchTimeOut = null;
let windingInterval = null;


let fishingFloats = [];
let fishingRopes = [];
let fishCaughtRope = [];
let fishes = [];
let fishInterval = [];
let fishhWinding = [];

let fishingData = {
    status: false,
    fishSpot: null,
    fishFloaterPosition: null,
    ropeWinding: false,
    fishCaught: {
        status: false,
        fishPosition: null,
    },
    winding: false,
    ropeLength: null
}


function ResetFishingData() {
    fishingData.fishingData = false;
    fishingData.fishPot = null;
    fishingData.fishFloaterPosition = null;
    fishingData.ropeWinding = false;
    fishingData.fishCaught.status = false;
    fishingData.fishCaught.fishPosition = null;
    fishingData.winding = false;
    fishingData.ropeLength = null;
}


mp.events.addDataHandler('fishingData', (entity, value, oldValue) => {
    if (entity.handle && entity.handle > 0 && value !== null) {


        if (value !== "stop") {
            let entityFishingData = JSON.parse(entity.getVariable("fishingData"));
            let id = entity.getVariable("character_sqlid");
            if (fishes[id] && entityFishingData.winding === true && fishingRopes[id]) {
                mp.game.invoke("0x1461C72C889E343E", fishingRopes[id].result);
            }
            if (entityFishingData.status === true && !fishingFloats[id]) {
                syncFishing(entity);
            }
            if (entityFishingData.fishCaught.status == true && !fishes[id] && fishingFloats[id]) {
                syncCaughtFish(entity);
            }
        }
        else {
            clearFishing(entity);
        }

    }
});


/*mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        if (entity.hasVariable("fishingData")) {
            let entityFishingData = JSON.parse(entity.getVariable("fishingData"));
            if (entityFishingData.status === true) {
                syncFishing(entity);
            }
            if (entityFishingData.fishCaught.status == true) {
                syncCaughtFish(entity);
                if (entityFishingData.ropeLength) {
                    mp.game.rope.ropeForceLength(fishingRopes[entity.getVariable("character_sqlid")].result, entityFishingData.ropeLength);
                }
            }
        }
    }
});*/


async function syncCaughtFish(entity) {
    let id = entity.getVariable("character_sqlid");
    if (fishes[id]) return;
    let windIt = false;
    if (fishingFloats[id]) {




        let pedPos = new mp.Vector3(fishingFloats[id].position.x, fishingFloats[id].position.y, fishingFloats[id].position.z - 0.3) // get position to create the fish
        fishes[id] = mp.peds.new(mp.game.joaat('a_c_fish'), pedPos, entity.getHeading() - 180, (streamPed) => streamPed.setAlpha(0), entity.dimension); // create fish
        mp.game.invoke("0x428CA6DBD1094446", fishingFloats[id].handle, true); // freeze the float
        if (mp.game.invoke("0xC024869A53992F34", fishes[id].handle)) windIt = true;
        setTimeout(() => {
            if (!fishes[id] || !fishingFloats[id]) return;
            //mp.game.invoke("0xAE99FB955581844A", fish.handle, 15000, 15000, 0, true, true, true); // set the fish ragdol
            mp.game.invoke('0x44395B87A17466E1') // loadtexture
            fishingFloats[id].position = fishingFloats[id].getCoords(false); // reinit the position
            let newPos = fishes[id].getOffsetFromInWorldCoords(0, 0.12, 0); // get fish mouth or head or whatever position
            let dist = distance = Math.abs(newPos.x - fishingFloats[id].position.x) + Math.abs(newPos.y - fishingFloats[id].position.y) + Math.abs(newPos.z - fishingFloats[id].position.z); // fish distance
            let rope = mp.game.rope.addRope(fishingFloats[id].position.x, fishingFloats[id].position.y, fishingFloats[id].position.z, 0, 0, 0, dist, 4, dist, 0.1, 0.5, false, false, false, 1.0, false, 0) // addRope
            mp.game.rope.attachEntitiesToRope(rope.result, fishingFloats[id].handle, fishes[id].handle, fishingFloats[id].position.x, fishingFloats[id].position.y, fishingFloats[id].position.z, newPos.x, newPos.y, newPos.z, dist, false, false, 0, 0) // attach rope from bobber to fish
            mp.game.invoke("0x428CA6DBD1094446", fishingFloats[id].handle, false); // unfreeze float
            mp.game.invoke("0x428CA6DBD1094446", fishes[id].handle, false); // unfreeze fish
            mp.game.invoke('0xAA8C46C452582702', rope.result); // rope physics
            fishCaughtRope[id] = rope;
            FishMove(id, entity);
            //mp.game.invoke("0xF8AE879D2DF8CC1D", fishingRopes[id].result);
            if (entity === mp.players.local) {
                tensionStarted = true;
                currentTension = 80
                if (baitUI) baitUI.execute("app.setfishingTension(" + currentTension + ");");
                timeCaught = Date.now();
            }
        }, 500)
    }
}

let timeCaught = null;

function syncFishing(entity) {
    let entityFishingData = JSON.parse(entity.getVariable("fishingData"));
    if (entityFishingData.status === true) {
        let id = entity.getVariable("character_sqlid");
        if (entityFishingData.fishSpot) startFishing(entity, id, entityFishingData.fishSpot);
    }
}



mp.events.add("entityStreamOut", (entity) => {
    if (entity.hasVariable("fishingData") && entity.getVariable("fishingData") !== "stop") {
        let entityFishingData = JSON.parse(entity.getVariable("fishingData"));
        if (entityFishingData.status === true) {
            clearFishing(entity);

        }
    }
});


function clearFishing(entity) {
    let id = entity.getVariable("character_sqlid");
    if (fishingRopes[id] && fishingFloats[id]) {
        mp.game.rope.detachRopeFromEntity(fishingRopes[id].result, fishingFloats[id].handle)
        mp.game.rope.deleteRope(fishingRopes[id]);
        fishingRopes[id] = null;
    }

    if (fishes[id] && fishCaughtRope[id]) {
        mp.game.rope.detachRopeFromEntity(fishCaughtRope[id].result, fishingFloats[id].handle)
        mp.game.rope.deleteRope(fishCaughtRope[id]);
        fishCaughtRope[id] = null;
    }
    if (mp.objects.exists(fishingFloats[id])) fishingFloats[id].destroy();
    fishingFloats[id] = null
    if (mp.peds.exists(fishes[id])) fishes[id].destroy();
    fishes[id] = null
    if (fishInterval[id]) {
        clearInterval(fishInterval[id]);
        fishInterval[id];
    }


    fishhWinding[id] = false;
    if (entity === mp.players.local) {
        if (resetBait) {
            if (baitUI) baitUI.execute("app.setBait('Hook');");
            bait = null;
        }
        else if (baitUI && bait) baitUI.execute("app.setBait('" + bait.name + "');");
        mp.events.callRemote("PlayFishingAnimations", "base", "amb@world_human_stand_fishing@base", 49);
        fishingRope = null;
        fishStarted = false;
        fishingFloat = null;
        fishingRod = null;
        fishCatched = false;
        tensionStarted = false;
        currentTension = null;
        ResetFishingData();
        if (baitUI) baitUI.execute("app.setfishingTension(-1);");
        mp.events.call("freezeEx", false);
        mp.events.call("freeze", false);
        if (fishCatchTimeOut) {
            clearTimeout(fishCatchTimeOut);
            fishCatchTimeOut = null;
        }
    }
}






async function startFishing(entity, id, fishSpot) {
    if (fishingFloats[id]) return;

    let rodId = mp.game.joaat("rod");
    fishingRod = mp.attachmentMngr.getObject(entity, rodId)

    fishingFloats[id] = mp.objects.new(mp.game.joaat("prop_tennis_ball"), fishSpot,
        {
            rotation: 0,
            alpha: 255,
            dimension: entity.dimension
        });
    fishingFloats[id].streamingRange = 500;
    fishingFloats[id].notifyStreaming = true;
    while (!fishingFloats && !fishingRod && !fishingFloats[id].handle && fishingFloats[id].handle === 0 && fishingRod.handle === 0) await mp.game.waitAsync(100);

    setTimeout(() => {
        if (!fishingFloats[id]) return;
        fishingFloats[id].setPhysicsParams(1.0, 1.2, 1.0, 1.0, 10, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0); // make it float
        if (!fishingRod) return; // to be checked after;
        let fishingRodTip = fishingRod.getOffsetFromInWorldCoords(0, 0, 2.4);
        let dist = Math.abs(fishingRodTip.x - fishingFloats[id].position.x) + Math.abs(fishingRodTip.y - fishingFloats[id].position.y) + Math.abs(fishingRodTip.z - fishingFloats[id].position.z); // calculate distance between float and road
        mp.game.invoke('0x9B9039DBF2D258C1') // load rope textures
        let rope = mp.game.rope.addRope(fishingRodTip.x, fishingRodTip.y, fishingRodTip.z, 0, 0, 0, dist, 5, dist, 0.1, 0.9, false, false, false, 1.0, false, 0) // addRope
        fishingFloats[id].setActivatePhysicsAsSoonAsItIsUnfrozen(true); // activate physics for float
        mp.game.invoke("0x428CA6DBD1094446", fishingFloats[id].handle, false); // unfreeaze float
        fishingRopes[id] = rope;
        mp.game.rope.attachEntitiesToRope(rope.result, fishingRod.handle, fishingFloats[id].handle, fishingRodTip.x, fishingRodTip.y, fishingRodTip.z, fishingFloats[id].position.x, fishingFloats[id].position.y, fishingFloats[id].position.z, dist, false, false, 0, 0) // attach rope
        mp.game.invoke('0xAA8C46C452582702', rope.result) // activate rope physics
    }, 500)
    //mp.events.callRemote("StartFishing"); // start fishing minigame

}





function GetWaterByProbeTest() {
    let water = null;


    let newPos = mp.players.local.getOffsetFromInWorldCoords(0.0, fishingDist, 0.0);
    let endPos = mp.players.local.getOffsetFromInWorldCoords(0.0, fishingDist, -25.0);
    const waterHit = mp.game.water.testProbeAgainstWater(newPos.x, newPos.y, newPos.z, endPos.x, endPos.y, endPos.z, true);



    if (waterHit) {
        const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(waterHit.x, waterHit.y, waterHit.z, 0, false);
        if (Math.abs(waterHit.z - getGroundZ) > 1) {
            //mp.game.graphics.drawLine(newPos.x, newPos.y, newPos.z, endPos.x, endPos.y, endPos.z, 255, 255, 255, 255);
            water = waterHit;
        }
    }
    return water;

}

const getWaterByRaycast = (range = 5.0) => {
    let water = null;
    let newPos = mp.players.local.getOffsetFromInWorldCoords(0.0, fishingDist, 0.0);
    let endPos = mp.players.local.getOffsetFromInWorldCoords(0.0, fishingDist, -25.0);

    const target = mp.raycasting.testCapsule(newPos, endPos, 0.1, mp.players.local, 1);
    if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && mp.game.entity.isAnObject(target.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
    if (target && !bannedMaterials.includes(target.material)) {
        //mp.gui.chat.push(`${target.material}`)
        const waterZ = mp.game.water.testVerticalProbeAgainstAllWater(target.position.x, target.position.y, mp.players.local.position.z, 1, 1);
        if (waterZ) {
            if (Math.abs(waterZ - target.position.z) > 0.5) {
                //mp.game.graphics.drawLine(newPos.x, newPos.y, newPos.z, endPos.x, endPos.y, endPos.z, 255, 255, 255, 255);
                water = new mp.Vector3(target.position.x, target.position.y, waterZ)
            }
        }
    }
    return water;
}

tensionStarted = false;
currentTension = 50;
resetBait = true;
fishtype = -1;

mp.events.add({
    'render': () => {


        if (fishCatched && tensionStarted) {
            if (mp.keys.isDown(69)) {
                currentTension = currentTension + (Math.random() * 1)
                if (currentTension > 100) {
                    clearFishing(mp.players.local);
                    if (baitUI) baitUI.execute("app.setfishingTension(-1);");
                    mp.events.callRemote("SetFishingData", "stop");
                }
                else if (baitUI) baitUI.execute("app.setfishingTension(" + currentTension + ");");
            }
            else if (!mp.keys.isDown(69)) {
                if (Date.now() - timeCaught < 1000) {
                    currentTension = currentTension - (Math.random() * 0.5)
                }
                else if (Date.now() - timeCaught < 2000) {
                    currentTension = currentTension - (Math.random() * 1)
                }
                else if (Date.now() - timeCaught < 3000) {
                    currentTension = currentTension - (Math.random() * 1.5)
                }
                else if (Date.now() - timeCaught > 3000) {
                    currentTension = currentTension - (Math.random() * 2)
                }


                if (currentTension < 0) {
                    clearFishing(mp.players.local);
                    if (baitUI) baitUI.execute("app.setfishingTension(-1);");
                    mp.events.callRemote("SetFishingData", "stop");
                }
                else if (baitUI) baitUI.execute("app.setfishingTension(" + currentTension + ");");
            }
        }



        if (mp.players.local.getVariable("PerformingAction") === "Fishing" && !false) {
            waterHit = GetWaterByProbeTest();
            if (waterHit) fishtype = 4;
            if (!waterHit) {
                waterFirstTest = getWaterByRaycast();
                let newPos = mp.players.local.getOffsetFromInWorldCoords(0.0, fishingDist, 0.0);
                zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(newPos.x, newPos.y, newPos.z));

                if (criver.includes(zoneName)) {
                    waterHit = waterFirstTest;
                    fishtype = 9;
                }
                else if (clakes.includes(zoneName)) {
                    waterHit = waterFirstTest;
                    fishtype = 0;
                }
                else fishtype = -1;


            }
            if (waterHit) {
                if (!waterMarker) waterMarker = mp.markers.new(3, waterHit, 0.2,
                    {
                        direction: new mp.Vector3(0, 0, 0),
                        rotation: new mp.Vector3(0, 180, 0),
                        color: [255, 0, 0, 255],
                        visible: true,
                        dimension: mp.players.local.dimension
                    });
                else if (mp.markers.exists(waterMarker)) {
                    markerPosition = new mp.Vector3(waterHit.x, waterHit.y, waterHit.z + 0.2)
                    waterMarker.position = markerPosition;
                }
            }


            if (!waterHit && mp.markers.exists(waterMarker)) {
                waterMarker.destroy();
                waterMarker = null;
            }



            if (waterHit && mp.game.controls.isDisabledControlJustPressed(0, 241)) {
                fishingDist++;
                if (fishingDist > 15) fishingDist = 15;
            }

            if (waterHit && mp.game.controls.isDisabledControlJustPressed(0, 242)) {
                fishingDist--;
                if (fishingDist < 3) fishingDist = 3;
            }
        }
        else if (waterMarker && mp.markers.exists(waterMarker)) {
            waterMarker.destroy();
            waterMarker = null;
        }
    },
    "destroyBaitUI": () => {
        if (baitUI) {
            baitUI.destroy();
            baitUI = null;
            bait = null;
        }
    },
    "Loadbaits": (baitsstr) => {
        if (!baitUI) baitUI = mp.browsers.new("package://cef/Interfaces/Jobs/FishingUI/Bait/index.html");
        let baitslist = JSON.parse(baitsstr)
        baits = [];
        resetbait = true;
        baitslist.forEach((baiter, index) => {
            baits.push(baiter);
            if (bait && baiter.name == bait.name) {
                resetbait = false;
            }
        })

    }

})

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

let fishingRope = null;
let fishStarted = false;
let fishingFloat = null;
let fishingRod = null;


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


mp.events.add("fishCatched", () => {
    if (fishStarted && !fishCatched) {
        fishCatched = true;
        fishingData.fishCaught.status = true;
        mp.events.callRemote("SetFishingData", JSON.stringify(fishingData))
        
    };
})


mp.keys.bind(69, true, async () => {
    if (!fishStarted && mp.players.local.getVariable("PerformingAction") === "Fishing" && bait) {
        if (!fishStarted && waterHit) {
            mp.game.streaming.requestAnimDict("mini@tennis");
            while (!mp.game.streaming.hasAnimDictLoaded("mini@tennis")) await mp.game.waitAsync(100);
            mp.events.callRemote("PlayFishingAnimations", 'forehand_ts_md_far', 'mini@tennis', 49);
            mp.events.callRemote("RemoveBait", bait.type)
            fishStarted = true;
            fishingData.status = true;
            fishingData.fishSpot = waterHit;
            mp.events.callRemote("SetFishingData", JSON.stringify(fishingData))
            mp.events.call("freezeEx", true);
            mp.events.call("freeze", true);
            setTimeout(() => {
                mp.events.callRemote("PlayFishingAnimations", "base", "amb@world_human_stand_fishing@base", 33);
            }, 700)
            let timer = Math.floor(Math.random() * (120000 - 60000 + 1) + 60000)
            fishCatchTimeOut = setTimeout(() => {
                if (fishStarted && !fishCatched) {
                    fishCatched = true;
                    fishingData.fishCaught.status = true;
                    mp.events.callRemote("SetFishingData", JSON.stringify(fishingData))
					mp.events.callRemote("SetFishCaught", true);
                }
                else fishCatchTimeOut = null;
            }, timer)
            return;
        }
    }

    if (fishCatched && fishingData.winding === false) {

        let id = mp.players.local.getVariable("character_sqlid");
        fishingData.winding = true;
        mp.events.callRemote("SetFishingData", JSON.stringify(fishingData));

        mp.events.callRemote("PlayFishingAnimations", "idle_a", "amb@world_human_stand_fishing@idle_a", 33);
        return;
    }

});







mp.keys.bind(81, false, () => {

    if (!fishStarted) {
        if (!bait) {
            bait = baits[baitIndex]
            if (baitUI) baitUI.execute("app.setBait('" + bait.name + "');");
        }
        else {
            baitIndex++;
            if (baitIndex == baits.length) baitIndex = 0;
            bait = baits[baitIndex]
            if (baitUI) baitUI.execute("app.setBait('" + bait.name + "');");
        }
    }
});



function FishMove(id, entity) {

    fishInterval[id] = setInterval(() => {
        if (fishes[id].handle) {

            if (mp.game.invoke("0xC024869A53992F34", fishes[id].handle)) {
                fishes[id].taskWanderInArea(fishes[id].position.x, fishes[id].position.y, fishes[id].position.z, 3, 0, 0)
            }
            if (entity.handle && fishingRopes[id]) {
                let ropeLength = mp.game.rope.getRopeLength(fishingRopes[id].result);
                if (ropeLength < 0.3) {


                    clearFishing(entity);
                    clearInterval(fishInterval[id]);
                    fishInterval[id] = null;
                    if (entity === mp.players.local) {
                        let random = Math.floor(Math.random() * (4 - 0 + 1) + 0)
                        if (fishtype === -1) return;
                        else mp.events.callRemote("RewardFish", fishtype + random)

                    }
                }
            }
            else {
                clearInterval(fishInterval[id]);
                fishInterval[id] = null;
            }
        }

    }, 1000)
}

}