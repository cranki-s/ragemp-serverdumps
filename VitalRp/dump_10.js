{
﻿global.localplayer = mp.players.local;
global.bodyCam = null;
global.bodyCamStart = new mp.Vector3(0, 0, 0);

function getCameraOffset(pos, angle, dist) {
    angle = angle * 0.0174533;
    pos.y = pos.y + dist * Math.sin(angle);
    pos.x = pos.x + dist * Math.cos(angle);
    return pos
}
var bodyCamValues = {
    "hair": {
        Angle: 0,
        Dist: 0.5,
        Height: 0.7
    },
    "beard": {
        Angle: 0,
        Dist: 0.5,
        Height: 0.7
    },
    "eyebrows": {
        Angle: 0,
        Dist: 0.5,
        Height: 0.7
    },
    "chesthair": {
        Angle: 0,
        Dist: 1,
        Height: 0.2
    },
    "lenses": {
        Angle: 0,
        Dist: 0.5,
        Height: 0.7
    },
    "torso": [{
        Angle: 0,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 0,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 0,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 180,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 180,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 180,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 180,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 305,
        Dist: 1,
        Height: 0.2
    }, {
        Angle: 55,
        Dist: 1,
        Height: 0.2
    },],
    "head": [{
        Angle: 0,
        Dist: 1,
        Height: 0.5
    }, {
        Angle: 305,
        Dist: 1,
        Height: 0.5
    }, {
        Angle: 55,
        Dist: 1,
        Height: 0.5
    }, {
        Angle: 180,
        Dist: 1,
        Height: 0.5
    }, {
        Angle: 0,
        Dist: 0.5,
        Height: 0.5
    }, {
        Angle: 0,
        Dist: 0.5,
        Height: 0.5
    },],
    "leftarm": [{
        Angle: 55,
        Dist: 1,
        Height: 0.0
    }, {
        Angle: 55,
        Dist: 1,
        Height: 0.1
    }, {
        Angle: 55,
        Dist: 1,
        Height: 0.1
    },],
    "rightarm": [{
        Angle: 305,
        Dist: 1,
        Height: 0.0
    }, {
        Angle: 305,
        Dist: 1,
        Height: 0.1
    }, {
        Angle: 305,
        Dist: 1,
        Height: 0.1
    },],
    "leftleg": [{
        Angle: 55,
        Dist: 1,
        Height: -0.6
    }, {
        Angle: 55,
        Dist: 1,
        Height: -0.6
    },],
    "rightleg": [{
        Angle: 305,
        Dist: 1,
        Height: -0.6
    }, {
        Angle: 305,
        Dist: 1,
        Height: -0.6
    },],
};
mp.events.add("ps_BodyCamera", () => {
    bodyCamStart = localplayer.position;
    var camValues = {
        Angle: localplayer.getRotation(2).z + 90,
        Dist: 2.6,
        Height: 0.0
    };
    var pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(!0);
    mp.game.cam.renderScriptCams(!0, !1, 500, !0, !1);
   
});
mp.events.add("ps_SetCamera", (id) => {
    var camValues = {
        Angle: 0,
        Dist: 1,
        Height: 0.2
    };
    switch (id) {
        case 0:
            {
                camValues = {
                    Angle: 0,
                    Dist: 2.6,
                    Height: 0.2
                };
                break
            }
        case 1:
            {
                camValues = {
                    Angle: 0,
                    Dist: 1,
                    Height: 0.5
                };
                break
            }
        case 2:
            {
                camValues = {
                    Angle: 0,
                    Dist: 0.5,
                    Height: 0.7
                };
                break
            }
        case 3:
            {
                camValues = {
                    Angle: 0,
                    Dist: 1,
                    Height: 0.2
                };
                break
            }
    }
    const camPos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), localplayer.getRotation(2).z + 90 + camValues.Angle, camValues.Dist);
    bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height)
});
mp.events.add("ps_DestroyCamera", () => {
    if (bodyCam == null) return;
    bodyCam.setActive(!1);
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(!1, !1, 3000, !0, !0);
    bodyCam = null
});
mp.events.add("playScenario", () => {
    mp.players.local.taskStartScenarioInPlace('WORLD_HUMAN_CONST_DRILL', 0, !1)
});
mp.events.add('screenFadeOut', function (duration) {
    mp.game.cam.doScreenFadeOut(duration)
});
mp.events.add('screenFadeIn', function (duration) {
    mp.game.cam.doScreenFadeIn(duration)
});
mp.events.add('enableInteriorProp', function (value, name) {
    mp.game.interior.enableInteriorProp(value, name);
    mp.game.interior.refreshInterior(value)
});
class HeadNotification {
    constructor(text) {
        this.resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
        this.text = text;
        this.startDuration = duration;
        this.alpha = 255;
        this.offset = 0;
        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler())
    }
    onUpdateHandler() {
        if (this.alpha <= 0) {
            return
        }
        mp.game.graphics.drawText(this.text, [0.5, 0.5 + this.offset], {
            font: 4,
            color: [255, 255, 255, this.alpha],
            scale: [0.5, 0.5],
            outline: !0
        });
        this.offset -= 0.0005;
        this.alpha -= 1
    }
}
mp.events.add("createNewHeadNotificationAdvanced", (notificationText) => {
    new HeadNotification(notificationText)
});
mp.events.add("ShowSignToCreator", (dimension) => {
    mp.players.local.mugshotboard.show("NOVO PERSONAGEM", "", "000000001", "LOS SANTOS POLICE DEPT", 1, dimension)
});
let Peds = [];
let PedAnimDic = [];
let PedAnimation = [];
mp.events.add({
    "Sync_PedCreate": (name, model, position, heading = 0, callback, dimension = mp.players.local) => {
        let ped = mp.peds.new(model, position, heading, (streamPed) => streamPed.setAlpha(0), dimension);
        Peds[name] = ped;

        //ped.taskStartScenarioInPlace("CODE_HUMAN_MEDIC_TIME_OF_DEATH", -1, !0)
    },
    "Sync_PlayAnim": (name, dict, anim) => {
        if (!name) return;
        let ped = Peds[name];
        //ped.taskPlayAnim(dict, anim, 8.0, 1, -1, 47, 0.0, !1, !1, !1);
        PedAnimDic[name] = dict;
        PedAnimation[name] = anim;
    },
    "Sync_PedRemove": (name) => {
        if (!name) return;
        Peds[name].destroy();
        delete Peds[name]
    },
    "Sync_PutPedInVehicle": (name, veh, seat) => {
        if (!name || !veh) return;
        let ped = Peds[name];
        ped.taskEnterVehicle(veh.handle, -1, seat, 2, 16, 0)
    }
});

/*mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "ped") {
        setTimeout(() => {
            loadAnimDict(PedAnimDic[entity.model], function () {
                entity.taskPlayAnim(PedAnimDic[name], PedAnimation[name], 1, 0, -1, 47, 1, !1, !1, !1)
            })
        }, 1000)
    }
});

function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
        if (mp.game.streaming.hasAnimDictLoaded(a)) {
            b();
            clearInterval(c);
        }
    }, 100)
}*/


mp.events.add("screen_cocaine", () => {
    mp.game.graphics.startScreenEffect("DrugsDrivingOut", 180000, !1);
    mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", 4)
});
mp.events.add("screen_cocaine_off", () => {
    mp.game.cam.stopGameplayCamShaking(!0)
});
mp.events.add("screen_weed", () => {
    mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 60000, !1)
});
mp.events.add("screen_steroid", () => {
    mp.game.graphics.startScreenEffect("ChopVision", 60000, !1)
});
mp.events.add("play_screen_effect", (effectName, duration, looped) => {
    mp.game.graphics.startScreenEffect(effectName, duration, looped)
});
mp.events.add("stop_screen_effect", (effectName) => {
    mp.game.graphics.stopScreenEffect(effectName)
});

}