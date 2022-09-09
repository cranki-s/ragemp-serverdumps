{
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rotator = require("RageServer/EntityRotator.js");
const bindKeys = {
    KEY_UP: 0x26,
    KEY_DOWN: 0x28,
    KEY_LEFT: 0x25,
    KEY_RIGHT: 0x27,
    KEY_SPACE: 0x20,
    KEY_PLUS: 0xBB,
    KEY_MINUS: 0xBD,
    KEY_DELETE: 0x2E,
    KEY_SAVE: 0x73,
    KEY_END: 0x23,
    KEY_PAGEUP: 0x21,
    KEY_PAGEDOWN: 0x22,
    KEY_BILD_UP: 10,
    KEY_BILD_DOWN: 11,
    KEY_BACKSPACE: 0x08,
    KEY_COMMA: 0xBC,
    KEY_ENTER: 0x0D,
    KEY_UNDO: 0x5A,
    KEY_REDO: 0x59,
    KEY_0: 0x30,
    KEY_1: 0x31,
    KEY_2: 0x32,
    KEY_3: 0x33,
    KEY_4: 0x34,
    KEY_5: 0x35,
    KEY_6: 0x36,
    KEY_7: 0x37,
    KEY_8: 0x38,
    KEY_9: 0x39,
    KEY_NUMPAD0: 0x60,
    KEY_NUMPAD1: 0x61,
    KEY_NUMPAD2: 0x62,
    KEY_NUMPAD3: 0x63,
    KEY_NUMPAD4: 0x64,
    KEY_NUMPAD5: 0x65,
    KEY_NUMPAD6: 0x66,
    KEY_NUMPAD7: 0x67,
    KEY_NUMPAD8: 0x68,
    KEY_NUMPAD9: 0x69,
    KEY_A: 0x41,
    KEY_B: 0x42,
    KEY_C: 0x43,
    KEY_D: 0x44,
    KEY_E: 0x45,
    KEY_F: 0x46,
    KEY_G: 0x47,
    KEY_H: 0x48,
    KEY_I: 0x49,
    KEY_J: 0x4A,
    KEY_K: 0x4B,
    KEY_L: 0x4C,
    KEY_M: 0x4D,
    KEY_N: 0x4E,
    KEY_O: 0x4F,
    KEY_P: 0x50,
    KEY_Q: 0x51,
    KEY_R: 0x52,
    KEY_S: 0x53,
    KEY_T: 0x54,
    KEY_U: 0x55,
    KEY_V: 0x56,
    KEY_W: 0x57,
    KEY_X: 0x58,
    KEY_Y: 0x59,
    KEY_Z: 0x5A,
    KEY_F1: 0x70,
    KEY_F2: 0x71,
    KEY_F3: 0x72,
    KEY_F4: 0x73,
    KEY_F5: 0x74,
    KEY_F6: 0x75,
    KEY_F7: 0x76,
    KEY_F8: 0x77,
    KEY_F9: 0x78,
    KEY_F10: 0x79,
    KEY_F11: 0x7A,
    KEY_F12: 0x7B,
    KEY_ESC: 0x1B,
    KEY_HMM2: 0xBF,
    KEY_HMM3: 0xC0,
    KEY_HMM4: 0xDB,
    KEY_BACKQUOTE: 220,
    KEY_SHIFT: 0x10,
    KEY_LSHIFT: 0xA0,
    KEY_RSHIFT: 0xA1,
    KEY_CAPSLOCK: 0x14,
    KEY_ALT: 0x12,
};
let BGWorker = null;
let HUD = null;
mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_LUNG_CAPACITY"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_WHEELIE_ABILITY"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_FLYING_ABILITY"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), 100, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STEALTH_ABILITY"), 100, false);
mp.game.invoke("0x9BAE5AD2508DF078", 0);
mp.game.player.setIgnoreLowPriorityShockingEvents(false);
let roundmapenable = false;
mp.events.add('render', () => {
    if (roundmapenable) {
        mp.game.graphics.pushScaleformMovieFunction(1, 'SETUP_HEALTH_ARMOUR');
        mp.game.graphics.pushScaleformMovieFunctionParameterInt(3);
        mp.game.graphics.popScaleformMovieFunctionVoid();
    }
});
mp.events.add('tsPlayAudioOgg', (sound, loop, vol) => {
    callHUD(BGWorker, ['playAudioOgg', sound, loop, vol]);
});
mp.events.add('tsPlayAudioOggURL', (url, loop, vol) => {
    callHUD(BGWorker, ['playAudioOggURL', url, loop, vol]);
});
mp.events.add('tsplayAudioInternal', (url, loop, vol) => {
    callHUD(BGWorker, ['playAudioInternal', url, loop, vol]);
});
mp.events.add('tsPlayAudioPrioURL', (url) => {
    callHUD(BGWorker, ['playAudioPrioURL', url]);
});
mp.events.add('stopSound', () => {
    callHUD(BGWorker, ['stopAudio']);
});
mp.events.add('tsNotify', (message, style, vol) => {
    callHUD(BGWorker, ['notify', message, style, vol]);
});
mp.events.add('noty', (type, layout, msg, time) => {
    callHUD(BGWorker, ['noty', type, layout, msg, time]);
});
mp.events.add('blinkNoty', (message, style, vol) => {
    mp.game.ui.notifications.show(message, true);
});
let session = "";
let useurl = "";
mp.events.add('init2', () => {
    const handle = mp.players.local.handle;
    const player = mp.players.atHandle(handle);
    mp.events.call("client:respawning");
    mp.game.ui.displayCash(false);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.nametags.enabled = false;
    mp.gui.cursor.show(true, true);
    mp.players.local.setHelmet(false);
    mp.game.graphics.transitionToBlurred(500);
    mp.loginCam = mp.cameras.new('default', new mp.Vector3(705, 1201, 700), new mp.Vector3(0, 0, 0), 40);
    mp.loginCam.pointAtCoord(400, -1000, 75);
    mp.loginCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, false, false);
    mp.players.local.freezePosition(true);
    if (HUD !== null) {
        HUD.active = false;
        HUD = null;
    }
    if (BGWorker !== null) {
        BGWorker.active = false;
        BGWorker = null;
    }
    BGWorker = mp.browsers.new("package://RageServer/html/Globals/bgworker.html");
    mp.blips.forEach(blip => {
        if (blip) {
            blip.destroy();
        }
    });
});
var today = new Date();
today.setHours(0, 0, 0, 0);
mp.events.add('init', () => {
    mp.events.call("client:respawning");
    mp.game.ui.displayCash(false);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.nametags.enabled = false;
    mp.gui.cursor.show(true, true);
    mp.players.local.setHelmet(false);
    mp.game.graphics.transitionToBlurred(500);
    mp.loginCam = mp.cameras.new('default', new mp.Vector3(705, 1201, 700), new mp.Vector3(0, 0, 0), 40);
    mp.loginCam.pointAtCoord(400, -1000, 75);
    mp.loginCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, false, false);
    mp.players.local.freezePosition(true);
    session = player.getVariable('ssSAge');
    useurl = player.getVariable('useurl');
    if (HUD !== null) {
        HUD.active = false;
        HUD = null;
    }
    if (BGWorker !== null) {
        BGWorker.active = false;
        BGWorker = null;
    }
    BGWorker = mp.browsers.new("package://RageServer/html/Globals/bgworker.html");
    setTimeout(() => {
        HUD = mp.browsers.new("package://RageServer/html/login/login.html");
    }, 150);
    mp.blips.forEach(blip => {
        if (blip) {
            blip.destroy();
        }
    });
});
mp.events.add('tsDestroy', (x, y, z, h) => {
    if (HUD !== null) {
        HUD.destroy();
        HUD = null;
    }
    if (sPhone !== null) {
        sPhone.destroy();
        sPhone = null;
    }
    mp.events.call("client:respawning");
    mp.game.streaming.requestCollisionAtCoord(x, y, z);
    mp.loginCam.pointAtCoord(x, y, z);
    mp.loginCam.setParams(x, y, 700, 0, 0, 0, 40, 2000, 1, 1, 2);
    mp.game.cam.renderScriptCams(false, true, 3500, true, false);
    mp.game.graphics.transitionFromBlurred(3600);
    mp.players.local.freezePosition(false);
    mp.players.local.heading = h;
    if (mp.loginCam !== null) {
        mp.loginCam.destroy(true);
        mp.loginCam = null;
    }
    mp.gui.cursor.show(false, false);
    if (menu.isVisible)
        menu.close();
    mp.game.ui.displayRadar(true);
    mp.players.local.hascharachter = true;
    mp.players.local.menuOpen = false;
    mp.players.local.openPage = false;
    session = player.getVariable('ssSAge');
    useurl = player.getVariable('useurl');
    mp.players.local.cid = player.getVariable('cid');
    if (sPhone !== null) {
        sPhone.active = false;
        sPhone.destroy();
        sPhone = null;
    }
    if (player.getVariable('sva') === '1') {
        sPhone = mp.browsers.new("https://smartphone.icbit.win/?cid=" + player.getVariable('cid') + "&sid=" + player.getVariable('sva') + "&t=" + session + "&d=" + player.getVariable('dd'));
    }
    else {
        sPhone = mp.browsers.new("https://tele.liberty-rp.de/?cid=" + player.getVariable('cid') + "&sid=" + player.getVariable('sva') + "&t=" + session + "&d=" + player.getVariable('dd'));
    }
    HUD = mp.browsers.new(`${useurl}/HUD/`);
});
mp.events.add('destroyGoEditor', () => __awaiter(void 0, void 0, void 0, function* () {
    if (HUD !== null) {
        HUD.active = false;
        HUD = null;
    }
    session = player.getVariable('ssSAge');
    useurl = player.getVariable('useurl');
    mp.game.graphics.transitionFromBlurred(1000);
    mp.gui.cursor.show(true, true);
    mp.gui.cursor.visible = true;
    if (menu.isVisible)
        menu.close();
    rotator.startent(mp.players.local);
    setTimeout(() => {
        HUD = mp.browsers.new(`${useurl}/HUD/pages/character/charactercreator.html`);
    }, 150);
    mp.game.streaming.requestAnimDict("missswitch");
}));
mp.events.add('destroyGoToChars', () => {
    if (HUD !== null) {
        HUD.active = false;
        HUD = null;
    }
    rotator.stop();
    mp.game.graphics.transitionToBlurred(1000);
    setTimeout(() => {
        mp.gui.cursor.show(false, false);
        mp.gui.cursor.visible = false;
    }, 150);
    mp.players.local.clearTasksImmediately();
});
mp.events.add('MausCursor', (data) => {
    const obj = JSON.parse(data);
    if (obj.maus) {
        mp.players.local.cursor = true;
        mp.gui.cursor.visible = true;
        mp.gui.cursor.show(true, true);
    }
    else {
        mp.players.local.cursor = false;
        mp.gui.cursor.visible = false;
        mp.gui.cursor.show(false, false);
    }
});
mp.events.add('playSoundset', (data) => {
    try {
        const obj = JSON.parse(data);
        mp.game.audio.playSound(-1, obj.Sound, obj.Set, !1, 0, !0);
    }
    catch (e) {
        mp.console.logError(e, true, true);
    }
});
mp.events.add('OpenPage', (page) => {
    callHUD(HUD, ['openPage', page]);
});
let freezed = false;
mp.events.add('Freeze', (state) => {
    mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, state);
    freezed = state;
});
const callHUD = (cef, arge) => {
    if (cef !== null) {
        if (cef) {
            let input = '';
            for (let i = 1; i < arge.length; i++) {
                if (input.length > 0) {
                    switch (typeof arge[i]) {
                        case 'string': {
                            input += `,'${arge[i]}' `;
                            break;
                        }
                        case 'number':
                        case 'boolean': {
                            input += `,${arge[i]} `;
                            break;
                        }
                        case 'object': {
                            input += `,${JSON.stringify(arge[i])} `;
                            break;
                        }
                    }
                }
                else {
                    input = `'${arge[i]}' `;
                }
            }
            cef.execute(`typeof window['${arge[0]}'] !== 'undefined' && window['${arge[0]}'](${input})`);
        }
    }
};
let ProgressCEF = null;
mp.events.add('TimeProgress', (text, time) => {
    if (ProgressCEF === null) {
        ProgressCEF = mp.browsers.new(`${useurl}/HUD/pages/progress/index.html`);
        if (ProgressCEF !== null) {
            ProgressCEF.execute("progress('" + text + "', " + time / 100 + ");");
        }
    }
});
mp.events.add("CloseTimeProgress", () => {
    if (ProgressCEF !== null) {
        ProgressCEF.active = false;
        ProgressCEF = null;
    }
});
let Browser = null;
let BigBrowser = null;
let Tablet = null;
let TabletLSMC = null;
let PinPad = null;
mp.events.add('pinPad', (url, state) => {
    if (!state) {
        if (PinPad !== null) {
            PinPad.active = false;
            PinPad = null;
            mp.players.local.cursor = false;
            mp.players.local.openPage = false;
            mp.gui.cursor.show(false, false);
        }
    }
    else {
        if (PinPad === null) {
            mp.players.local.cursor = true;
            mp.gui.cursor.show(true, true);
            PinPad = mp.browsers.new(`${url}`);
            mp.players.local.openPage = true;
        }
    }
});
mp.events.add('browser', (url) => {
    if (Browser === null) {
        mp.players.local.cursor = true;
        mp.gui.cursor.show(true, true);
        Browser = mp.browsers.new(`${url}?da=${player.getVariable('cid')}*.${session}AFCD${player.getVariable('sva')}`);
        mp.players.local.openPage = true;
    }
    else {
        Browser.active = false;
        Browser === null || Browser === void 0 ? void 0 : Browser.destroy();
        Browser = null;
        mp.players.local.cursor = false;
        mp.players.local.openPage = false;
        mp.gui.cursor.show(false, false);
    }
});
mp.events.add('startrotator', (ent) => {
    rotator.startent(ent);
});
mp.events.add('stoprotator', () => {
    rotator.stop();
});
mp.events.add('bigbrowser', (url, clean = false) => {
    if (url !== "") {
        if (BigBrowser !== null) {
            return;
        }
        if (mp.browsers.exists(BigBrowser)) {
            return;
        }
    }
    if (BigBrowser === null) {
        mp.players.local.cursor = true;
        if (!clean) {
            if (url.includes('?')) {
                BigBrowser = mp.browsers.new(`${url}&da=${player.getVariable('cid')}*.${session}AFCD${player.getVariable('sva')}`);
            }
            else {
                BigBrowser = mp.browsers.new(`${url}?da=${player.getVariable('cid')}*.${session}AFCD${player.getVariable('sva')}`);
            }
        }
        else {
            BigBrowser = mp.browsers.new(`${url}`);
        }
        mp.players.local.openPage = true;
        setTimeout(() => { mp.gui.cursor.show(true, true); }, 250);
    }
    else {
        BigBrowser.destroy();
        BigBrowser = null;
        mp.players.local.cursor = false;
        mp.players.local.openPage = false;
        mp.gui.cursor.show(false, false);
    }
});
mp.events.add('closedark', () => {
    mp.events.callRemote("closedark");
});
let Social = null;
mp.events.add('social', (url) => {
    if (Social === null) {
        mp.players.local.cursor = true;
        mp.gui.cursor.show(true, true);
        Social = mp.browsers.new(`${url}?da=${player.getVariable('cid')}*.${session}AFCD${player.getVariable('sva')}`);
        mp.players.local.openPage = true;
    }
    else {
        Social.active = false;
        Social = null;
        mp.players.local.cursor = false;
        mp.players.local.openPage = false;
        mp.gui.cursor.show(false, false);
    }
});
mp.events.add('maus', (state) => {
    if (state) {
        mp.gui.cursor.show(true, true);
        mp.players.local.cursor = true;
    }
    else {
        mp.gui.cursor.show(false, false);
        mp.players.local.cursor = false;
    }
});
mp.events.add('modal', (enable) => {
    mp.players.local.modalMenu = enable;
});
let WaitCEF = null;
mp.events.add('loading', (show) => {
    if (show) {
        if (WaitCEF === null) {
            WaitCEF = mp.browsers.new(`${useurl}/HUD/wait`);
        }
    }
    else {
        if (WaitCEF !== null) {
            WaitCEF.active = false;
            WaitCEF = null;
        }
    }
});
function distanceTo(vec1, vec2) {
    return Math.hypot(vec2.x - vec1.x, vec2.y - vec1.y, vec2.z - vec1.z);
}
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
mp.events.add('render', () => {
    if (mp.players.local.vehicle && mp.players.local.vehicle.getClass() === 18) {
        mp.game.controls.disableControlAction(27, 86, true);
    }
});
mp.keys.bind(bindKeys.KEY_E, false, function () {
    if (mp.players.local.vehicle && mp.players.local.vehicle.getClass() === 18 && mp.players.local.showPhone === false) {
        mp.events.callRemote('tsiren');
    }
});
function clothePreview(entity) {
    try {
        if (entity.type === "player" && entity.handle !== 0) {
            if (entity.getVariable("preview") === false || !JSON.parse(entity.getVariable("preview")))
                return;
            let input = '';
            switch (typeof entity.getVariable("preview")) {
                case 'string': {
                    input = `${entity.getVariable("preview")}`;
                    break;
                }
                case 'number':
                case 'boolean': {
                    input = `${entity.getVariable("preview")} `;
                    break;
                }
                case 'object': {
                    input = `${JSON.stringify(entity.getVariable("preview"))} `;
                    break;
                }
            }
            const clothes = JSON.parse(input);
            if (entity.isModel(1885233650) || entity.isModel(-1667301416) || entity.model === 2627665880 || entity.model === 1885233650) {
                if (clothes.Sync) {
                    if (clothes.S1Drawable !== -1)
                        entity.setComponentVariation(1, clothes.S1Drawable, clothes.S1Texture, 2);
                    if (clothes.S2Drawable !== -1)
                        entity.setComponentVariation(2, clothes.S2Drawable, clothes.S2Texture, 2);
                    if (clothes.S3Drawable !== -1)
                        entity.setComponentVariation(3, clothes.S3Drawable, clothes.S3Texture, 2);
                    if (clothes.S4Drawable !== -1)
                        entity.setComponentVariation(4, clothes.S4Drawable, clothes.S4Texture, 2);
                    if (clothes.S5Drawable !== -1)
                        entity.setComponentVariation(5, clothes.S5Drawable, clothes.S5Texture, 2);
                    if (clothes.S6Drawable !== -1)
                        entity.setComponentVariation(6, clothes.S6Drawable, clothes.S6Texture, 2);
                    if (clothes.S7Drawable !== -1)
                        entity.setComponentVariation(7, clothes.S7Drawable, clothes.S7Texture, 2);
                    if (clothes.S8Drawable !== -1)
                        entity.setComponentVariation(8, clothes.S8Drawable, clothes.S8Texture, 2);
                    if (clothes.S9Drawable !== -1)
                        entity.setComponentVariation(9, clothes.S9Drawable, clothes.S9Texture, 2);
                    if (clothes.S10Drawable !== -1)
                        entity.setComponentVariation(10, clothes.S10Drawable, clothes.S10Texture, 2);
                    if (clothes.S11Drawable !== -1)
                        entity.setComponentVariation(11, clothes.S11Drawable, clothes.S11Texture, 2);
                    if (clothes.PropS0Drawable !== -1) {
                        if (clothes.PropS0Attached) {
                            entity.setPropIndex(0, clothes.PropS0Drawable, clothes.PropS0Texture, true);
                        }
                        else {
                            entity.clearProp(0);
                        }
                    }
                    if (clothes.PropS1Drawable !== -1) {
                        if (clothes.PropS1Attached) {
                            entity.setPropIndex(1, clothes.PropS1Drawable, clothes.PropS1Texture, true);
                        }
                        else {
                            entity.clearProp(1);
                        }
                    }
                    if (clothes.PropS2Drawable !== -1) {
                        if (clothes.PropS2Attached) {
                            entity.setPropIndex(2, clothes.PropS2Drawable, clothes.PropS2Texture, true);
                        }
                        else {
                            entity.clearProp(2);
                        }
                    }
                    if (clothes.PropS6Drawable !== -1) {
                        if (clothes.PropS6Attached) {
                            entity.setPropIndex(6, clothes.PropS6Drawable, clothes.PropS6Texture, true);
                        }
                        else {
                            entity.clearProp(6);
                        }
                    }
                    if (clothes.PropS7Drawable !== -1) {
                        if (clothes.PropS7Attached) {
                            entity.setPropIndex(7, clothes.PropS7Drawable, clothes.PropS7Texture, true);
                        }
                        else {
                            entity.clearProp(7);
                        }
                    }
                }
            }
        }
    }
    catch (e) {
        mp.console.logError(e, true, true);
    }
}
mp.events.add('clothePreview', clothePreview);
let ticks = 0;
let volume = 0.0;
let _volume = 0.0;
let cwait = false;
let RadioCEF = null;
let ClubPosition = null;
let Clubs = [];
let Indoor = false;
let RoomKey = 0;
let Mute = false;
let MaxDist = 0;
let Destroy = false;
let iprog = null;
const MinVol = 0.02;
const MaxVol = 0.065;
const MinVolOut = 0.03;
const MaxVolOut = 0.06;
let Points = [];
mp.events.add("setClubs", d => {
    try {
        const clubs = JSON.parse(d);
        Points = [];
        if (clubs) {
            clubs.forEach(c => {
                Points.push({ x: c.Position_X, y: c.Position_Y, z: c.Position_Z, maxDist: c.MaxDist, id: c.ClubId });
            });
        }
    }
    catch (e) { }
});
mp.events.add("GetRoomKey", () => {
    const roomkey = mp.game.invoke(`0x47C2A06D4F5F424B`, mp.players.local.handle);
    mp.events.callRemote("SetRoomKey", roomkey);
});
function countDinstanceToCamera(obj = new mp.Vector3(375.21902, 276.0259, 92.39987)) {
    const x = mp.players.local.position.x;
    const y = mp.players.local.position.y;
    const z = mp.players.local.position.z;
    const distance = Math.sqrt((obj.x - x) * (obj.x - x) + (obj.y - y) * (obj.y - y) + (obj.z - z) * (obj.z - z));
    return distance;
}
function distance(point, p) {
    return Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2));
}
function clubtesting() {
    const Position = mp.players.local.position;
    if (!mp.players.local.vehicle) {
        if (RadioCEF === null || iprog !== null && RadioCEF !== null) {
            try {
                if (!Mute) {
                    const points = Points, closest = points.reduce((a, b) => distance(Position, a) < distance(Position, b) ? a : b);
                    MaxDist = closest.maxDist;
                    const distancec = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, closest.x, closest.y, closest.z, true);
                    if (distancec < MaxDist && !cwait && !Mute) {
                        mp.events.callRemote("getClubData", closest.id);
                        cwait = true;
                        MaxDist = closest.maxDist;
                        setTimeout(() => {
                            cwait = false;
                        }, 2500);
                    }
                }
            }
            catch (e) { }
        }
    }
    if (RadioCEF !== null) {
        if (ticks > 25) {
            const roomkey = mp.game.invoke(`0x47C2A06D4F5F424B`, mp.players.local.handle);
            if (roomkey !== 0 && Indoor && RoomKey === roomkey && !Mute) {
                const dist = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, ClubPosition.x, ClubPosition.y, ClubPosition.z, true);
                if (dist < MaxDist) {
                    const dd0 = (MaxVol / 100) * 1;
                    const dd = (dist / MaxDist) * 100;
                    const dd1 = 100 - dd;
                    volume = (dd1 * dd0);
                    if (volume > MaxVol) {
                        volume = MaxVol;
                    }
                    if (volume < MinVol) {
                        volume = MinVol;
                    }
                }
                else {
                    if (RadioCEF !== null && iprog === null && !Destroy) {
                        Destroy = true;
                        iprog = setTimeout(() => {
                            if (Destroy) {
                                setTimeout(() => {
                                    callHUD(RadioCEF, ['setRadioVolume', MinVol]);
                                    setTimeout(() => {
                                        callHUD(RadioCEF, ['setRadioVolume', 0.02]);
                                        setTimeout(() => {
                                            callHUD(RadioCEF, ['setRadioVolume', 0.01]);
                                            setTimeout(() => {
                                                if (RadioCEF !== null && Destroy) {
                                                    RadioCEF.active = false;
                                                    RadioCEF.destroy();
                                                    RadioCEF = null;
                                                    Destroy = false;
                                                    cwait = false;
                                                    if (iprog !== null) {
                                                        clearTimeout(iprog);
                                                        iprog = null;
                                                    }
                                                }
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }
                        }, 10);
                    }
                }
                if (_volume !== volume) {
                    if (RadioCEF !== null) {
                        callHUD(RadioCEF, ['setRadioVolume', volume]);
                    }
                    _volume = volume;
                }
            }
            else if (!Indoor && roomkey === 0 && !Mute) {
                const dist = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, ClubPosition.x, ClubPosition.y, ClubPosition.z, true);
                if (dist < (MaxDist + 1)) {
                    const dd0 = (MaxVolOut / 100) * 1;
                    const dd = (dist / MaxDist) * 100;
                    const dd1 = 100 - dd;
                    volume = (dd1 * dd0);
                    if (volume > MaxVolOut) {
                        volume = MaxVolOut;
                    }
                    if (volume < MinVolOut) {
                        volume = MinVolOut;
                    }
                }
                else {
                    if (RadioCEF !== null && iprog === null && !Destroy) {
                        Destroy = true;
                        let vd = MinVolOut;
                        iprog = setTimeout(() => {
                            if (Destroy) {
                                setTimeout(() => {
                                    callHUD(RadioCEF, ['setRadioVolume', vd]);
                                    setTimeout(() => {
                                        if (vd > 0)
                                            vd -= 0.01;
                                        callHUD(RadioCEF, ['setRadioVolume', vd]);
                                        setTimeout(() => {
                                            if (vd > 0)
                                                vd -= 0.01;
                                            callHUD(RadioCEF, ['setRadioVolume', vd]);
                                            setTimeout(() => {
                                                if (RadioCEF !== null && Destroy) {
                                                    RadioCEF.destroy();
                                                    RadioCEF = null;
                                                    Destroy = false;
                                                    cwait = false;
                                                    if (iprog !== null) {
                                                        clearTimeout(iprog);
                                                        iprog = null;
                                                    }
                                                }
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }
                        }, 5000);
                    }
                }
                if (_volume !== volume) {
                    if (RadioCEF !== null) {
                        callHUD(RadioCEF, ['setRadioVolume', volume]);
                    }
                    _volume = volume;
                }
            }
            else if (Indoor && RoomKey === 0 && roomkey !== 0 && !Mute) {
                const dist = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, ClubPosition.x, ClubPosition.y, ClubPosition.z, false);
                if (dist < (MaxDist + 1)) {
                    const dd0 = (MaxVol / 100) * 1;
                    const dd = (dist / MaxDist) * 100;
                    const dd1 = 100 - dd;
                    volume = (dd1 * dd0);
                    if (volume > MaxVol) {
                        volume = MaxVol;
                    }
                    if (volume < MinVol) {
                        volume = MinVol;
                    }
                }
                else {
                    if (RadioCEF !== null && iprog === null && !Destroy) {
                        Destroy = true;
                        iprog = setTimeout(() => {
                            if (Destroy) {
                                setTimeout(() => {
                                    callHUD(RadioCEF, ['setRadioVolume', MinVol]);
                                    setTimeout(() => {
                                        callHUD(RadioCEF, ['setRadioVolume', 0.02]);
                                        setTimeout(() => {
                                            callHUD(RadioCEF, ['setRadioVolume', 0.01]);
                                            setTimeout(() => {
                                                if (RadioCEF !== null && Destroy) {
                                                    RadioCEF.active = false;
                                                    RadioCEF.destroy();
                                                    RadioCEF = null;
                                                    Destroy = false;
                                                    cwait = false;
                                                    if (iprog !== null) {
                                                        clearTimeout(iprog);
                                                        iprog = null;
                                                    }
                                                }
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }
                        }, 5000);
                    }
                }
                if (_volume !== volume) {
                    if (RadioCEF !== null) {
                        callHUD(RadioCEF, ['setRadioVolume', volume]);
                    }
                    _volume = volume;
                }
            }
            else {
                if (RadioCEF !== null && iprog === null && !Destroy) {
                    Destroy = true;
                    let vd = MinVol;
                    if (Indoor && roomkey === 0 && RoomKey === 0) {
                        setTimeout(() => {
                            callHUD(RadioCEF, ['setRadioVolume', vd]);
                            setTimeout(() => {
                                if (vd > 0)
                                    vd -= 0.01;
                                callHUD(RadioCEF, ['setRadioVolume', vd]);
                                setTimeout(() => {
                                    if (vd > 0)
                                        vd -= 0.01;
                                    callHUD(RadioCEF, ['setRadioVolume', vd]);
                                    if (RadioCEF !== null && Destroy) {
                                        RadioCEF.destroy();
                                        RadioCEF = null;
                                        Destroy = false;
                                        cwait = false;
                                        if (iprog !== null) {
                                            clearTimeout(iprog);
                                            iprog = null;
                                        }
                                    }
                                }, 250);
                            }, 250);
                        }, 250);
                    }
                    else {
                        let ttt = 500;
                        if (roomkey !== 0)
                            ttt = 900;
                        iprog = setTimeout(() => {
                            if (Destroy) {
                                setTimeout(() => {
                                    callHUD(RadioCEF, ['setRadioVolume', vd]);
                                    setTimeout(() => {
                                        if (vd > 0)
                                            vd -= 0.01;
                                        callHUD(RadioCEF, ['setRadioVolume', vd]);
                                        setTimeout(() => {
                                            if (vd > 0)
                                                vd -= 0.01;
                                            callHUD(RadioCEF, ['setRadioVolume', vd]);
                                            setTimeout(() => {
                                                if (RadioCEF !== null && Destroy) {
                                                    RadioCEF.destroy();
                                                    RadioCEF = null;
                                                    Destroy = false;
                                                    cwait = false;
                                                    if (iprog !== null) {
                                                        clearTimeout(iprog);
                                                        iprog = null;
                                                    }
                                                }
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }
                        }, ttt);
                    }
                }
                if (_volume !== volume) {
                    _volume = volume;
                }
            }
            ticks = 0;
        }
        else {
            ticks++;
        }
    }
}
mp.events.add('render', clubtesting);
let lastStation = "";
mp.events.add('setClubData', (clubdata) => {
    try {
        const clubData = JSON.parse(clubdata);
        ClubPosition = new mp.Vector3(clubData.Position_X, clubData.Position_Y, clubData.Position_Z);
        Indoor = clubData.Indoor;
        RoomKey = clubData.RoomKey;
        const roomkey = mp.game.invoke(`0x47C2A06D4F5F424B`, mp.players.local.handle);
        if (RadioCEF !== null && roomkey === clubData.RoomKey || RadioCEF !== null && Indoor && roomkey !== 0 && RoomKey === 0) {
            Destroy = false;
            if (iprog !== null) {
                clearTimeout(iprog);
                iprog = null;
            }
            if (lastStation !== clubData.RadioStation) {
                lastStation = clubData.RadioStation;
                callHUD(RadioCEF, ['setRadioStation', clubData.RadioStation]);
            }
        }
        if (RadioCEF === null) {
            Destroy = false;
            if (RoomKey === 0 && Indoor && roomkey !== 0) {
                RadioCEF = mp.browsers.new('package://RageServer/radio/Radio.html');
                RadioCEF.active = false;
                lastStation = clubData.RadioStation;
                setTimeout(() => {
                    callHUD(RadioCEF, ['setRadioStation', clubData.RadioStation]);
                    callHUD(RadioCEF, ['setRadioVolume', 0.02]);
                }, 160);
            }
            else if (roomkey === clubData.RoomKey && RoomKey !== 0) {
                RadioCEF = mp.browsers.new('package://RageServer/radio/Radio.html');
                RadioCEF.active = false;
                lastStation = clubData.RadioStation;
                setTimeout(() => {
                    callHUD(RadioCEF, ['setRadioStation', clubData.RadioStation]);
                    callHUD(RadioCEF, ['setRadioVolume', 0.02]);
                }, 160);
            }
            else if (RoomKey === 0 && !Indoor && roomkey === 0) {
                RadioCEF = mp.browsers.new('package://RageServer/radio/Radio.html');
                RadioCEF.active = false;
                lastStation = clubData.RadioStation;
                setTimeout(() => {
                    callHUD(RadioCEF, ['setRadioStation', clubData.RadioStation]);
                    callHUD(RadioCEF, ['setRadioVolume', 0.02]);
                }, 160);
            }
        }
    }
    catch (e) {
        mp.game.graphics.notify("~r~Dj Konnte nicht initialisiert werden!");
        mp.gui.chat.push(e);
    }
});
mp.events.add("killRadio", () => {
    Clubs.splice(0, Clubs.length);
    if (RadioCEF !== null) {
        RadioCEF.active = false;
        RadioCEF.destroy();
        RadioCEF = null;
        volume = 0.0;
        _volume = 0.0;
        cwait = false;
        ClubPosition = null;
    }
});
mp.events.add('setDiscoMute', (state) => {
    Mute = state;
    if (Mute) {
        mp.events.remove('render', clubtesting);
        if (RadioCEF !== null) {
            RadioCEF.active = false;
            RadioCEF.destroy();
            RadioCEF = null;
            Destroy = false;
            cwait = false;
            if (iprog !== null) {
                clearTimeout(iprog);
                iprog = null;
            }
        }
    }
    else {
        mp.events.add('render', clubtesting);
    }
});
function getMinimapSize2() {
    let safezone = mp.game.graphics.getSafeZoneSize();
    let safezone_x = 1.0 / 20.0;
    let safezone_y = 1.0 / 20.0;
    let aspect_ratio = mp.game.graphics.getScreenAspectRatio(false);
    let { x: res_x, y: res_y } = mp.game.graphics.getScreenActiveResolution(0, 0);
    let xscale = 1.0 / res_x;
    let yscale = 1.0 / res_y;
    let Minimap;
    Minimap = {};
    Minimap.width = xscale * (res_x / (4 * aspect_ratio));
    Minimap.height = yscale * (res_y / 5.674);
    Minimap.left_x = xscale * (res_x * (safezone_x * ((Math.abs(safezone - 1.0)) * 10)));
    Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((Math.abs(safezone - 1.0)) * 10)));
    Minimap.right_x = Minimap.left_x + Minimap.width;
    Minimap.top_y = Minimap.bottom_y - Minimap.height;
    Minimap.x = Minimap.left_x;
    Minimap.y = Minimap.top_y;
    Minimap.xunit = xscale;
    Minimap.yunit = yscale;
    return Minimap;
}
const gr = mp.game.graphics;
const res = gr.getScreenResolution(0, 0);
const BarHeight = 0.171;
const BarWidth = 0.0015;
let Energie = 100;
let ui = getMinimapSize2();
let VoiceRangeHUD = 3;
let ProgressProzent = 0;
const ProgressBarWidth = 0.0020;
let RenderProgress = false;
let fromTop = (ui.y + ui.height / 2);
let fromLeft = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.005);
let fromLeftVoice = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.010);
let fromLeftProgress = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.015);
mp.events.add('DrawProgressBar', (sekunden) => {
    RenderProgress = true;
    ProgressProzent = 0;
    let dur = (sekunden * 1000), seq = fps, max = 100, chunk = max / dur * seq, loop = setInterval(function () {
        if (ProgressProzent < max) {
            ProgressProzent = (ProgressProzent + chunk);
        }
        else {
            if ((ProgressProzent >= max))
                RenderProgress = false;
            clearInterval(loop);
        }
    }, seq);
});
function DrawProgressBar() {
    if (!mp.players.local.hascharachter)
        return;
    let r = 0, g = 125, b = 255, a = 150;
    const ce = (0.00085 * ProgressProzent);
    const ne = ui.top_y + ui.height - ce;
    const fromTopProgress2 = ne;
    r = 0;
    g = 115;
    b = 255;
    a = 150;
    let fromLeftProgress2;
    switch (bigmapStatus) {
        case 2:
            fromLeftProgress2 = fromLeftProgress + 0.085;
            break;
        case 3:
            fromLeftProgress2 = fromLeftProgress + 0.085;
            break;
        default:
            fromLeftProgress2 = fromLeftProgress;
            break;
    }
    if (!hudVis) {
        fromLeftProgress2 = fromLeftProgress - 0.155;
    }
    mp.game.graphics.drawRect(fromLeftProgress2, fromTop, ProgressBarWidth, BarHeight, 0, 0, 0, 100);
    mp.game.graphics.drawRect(fromLeftProgress2, fromTopProgress2, ProgressBarWidth, (BarHeight / 100) * ProgressProzent, r, g, b, a);
}
let radiotalker = false;
let MuteVoice = false;
function DrawHudElemtBars() {
    if (!mp.players.local.hascharachter)
        return;
    let r = 0, g = 125, b = 255, a = 150;
    VoiceRangeHUD = parseInt(player.getVariable('VOICE_RANGE'), 10);
    MuteVoice = false;
    switch (VoiceRangeHUD) {
        case 1:
            VoiceRangeHUD = 20;
            r = 0;
            g = 255;
            b = 0;
            a = 150;
            break;
        case 3:
            VoiceRangeHUD = 40;
            r = 0;
            g = 155;
            b = 0;
            a = 150;
            break;
        case 8:
            VoiceRangeHUD = 60;
            r = 238;
            g = 238;
            b = 0;
            a = 150;
            break;
        case 15:
            VoiceRangeHUD = 80;
            r = 255;
            g = 185;
            b = 15;
            a = 150;
            break;
        case 20:
            VoiceRangeHUD = 100;
            r = 255;
            g = 0;
            b = 0;
            a = 150;
            break;
        default:
            MuteVoice = true;
            VoiceRangeHUD = 100;
            r = 255;
            g = 255;
            b = 255;
            a = 255;
            break;
    }
    if (radiotalker && !MuteVoice) {
        VoiceRangeHUD = 100;
        r = 255;
        g = 0;
        b = 0;
        a = 120;
    }
    const ce = (0.00085 * VoiceRangeHUD);
    const ne = ui.top_y + ui.height - ce;
    let fromTopVoice2 = ne;
    let fromLeftVoice2;
    switch (bigmapStatus) {
        case 2:
            fromLeftVoice2 = fromLeftVoice + 0.085;
            break;
        case 3:
            fromLeftVoice2 = fromLeftVoice + 0.085;
            break;
        default:
            fromLeftVoice2 = fromLeftVoice;
            break;
    }
    if (!hudVis) {
        if (mp.players.local.vehicle) {
            fromLeftVoice2 = fromLeftVoice - 0.145;
        }
        else {
            fromLeftVoice2 = fromLeftVoice - 0.155;
        }
    }
    mp.game.graphics.drawRect(fromLeftVoice2, fromTop, BarWidth, BarHeight, 0, 0, 0, 100);
    mp.game.graphics.drawRect(fromLeftVoice2, fromTopVoice2, BarWidth, (BarHeight / 100) * VoiceRangeHUD, r, g, b, a);
}
function DrawPlayerBars() {
    if (!mp.players.local.hascharachter)
        return;
    let r = 0, g = 125, b = 255, a = 150;
    Energie = parseInt(player.getVariable('CHAR_NEEDS'), 10);
    if (Energie > 100) {
        Energie = 100;
    }
    if (Energie < 0) {
        Energie = 0;
    }
    const ce = (0.00085 * Energie);
    const ne = ui.top_y + ui.height - ce;
    const fromTop2 = ne;
    if (Energie > 75) {
        r = 0;
        g = 255;
        b = 0;
        a = 150;
    }
    else if (Energie > 50 || Energie < 50) {
        r = 255;
        g = 165;
        b = 0;
        a = 150;
    }
    if (Energie < 10) {
        r = 255;
        g = 0;
        b = 0;
        a = 150;
    }
    let fromLeft2;
    switch (bigmapStatus) {
        case 2:
            fromLeft2 = fromLeft + 0.085;
            break;
        case 3:
            fromLeft2 = fromLeft + 0.085;
            break;
        default:
            fromLeft2 = fromLeft;
            break;
    }
    if (!hudVis) {
        if (mp.players.local.vehicle) {
            fromLeft2 = fromLeft - 0.145;
        }
        else {
            fromLeft2 = fromLeft - 0.155;
        }
    }
    mp.game.graphics.drawRect(fromLeft2, fromTop, BarWidth, BarHeight, 0, 0, 0, 100);
    mp.game.graphics.drawRect(fromLeft2, fromTop2, BarWidth, (BarHeight / 100) * Energie, r, g, b, a);
}
function render() {
    if (!mp.players.local.casino) {
        ui = getMinimapSize2();
        fromTop = (ui.y + ui.height / 2);
        fromLeft = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.005);
        fromLeftVoice = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.010);
        fromLeftProgress = ((ui.x + ui.width + (-4 * ui.xunit) / 2) + 0.015);
        if (hudVis && hudvisphase === 0) {
            DrawPlayerBars();
            DrawHudElemtBars();
        }
        else if (!hudVis && hudvisphase === 2) {
            DrawPlayerBars();
            DrawHudElemtBars();
        }
        if (RenderProgress) {
            DrawProgressBar();
        }
        const playerRadio = mp.players.local;
        if (typeof playerRadio.getVariable('isTakingRadioNow') !== 'undefined') {
            radiotalker = Boolean(playerRadio.getVariable('isTakingRadioNow'));
        }
    }
}
mp.events.add('render', render);
function DrawRect(x, y, width, height, r, g, b, a) {
    mp.game.graphics.drawRect(x, y, width, height, r, g, b, a);
}
function TankBar(prozent) {
    if (!mp.players.local.hascharachter)
        return;
    if (prozent > 100)
        prozent = 100;
    let r = 0, g = 125, b = 255, a = 150;
    const ce = (0.00085 * prozent);
    let ne = ui.top_y + ui.height - ce;
    let fromTopProgress2 = ne;
    r = 0;
    g = 180;
    b = 0;
    a = 150;
    if (prozent < 50) {
        r = 255;
        g = 128;
        b = 0;
        a = 150;
    }
    if (prozent < 5) {
        r = 220;
        g = 0;
        b = 0;
        a = 150;
    }
    const fromLeftProgress2 = 0.0045;
    mp.game.graphics.drawRect(fromLeftProgress2, fromTop, ProgressBarWidth, BarHeight, 0, 0, 0, 100);
    mp.game.graphics.drawRect(fromLeftProgress2, fromTopProgress2, ProgressBarWidth, (BarHeight / 100) * prozent, r, g, b, a);
}
const rectalpha = 100;
const salpha = 150;
mp.players.local.minigame = false;
function drawVehicleSpeed() {
    const vehicle = mp.players.local.vehicle;
    const graphics = mp.game.graphics;
    if (vehicle && !mp.players.local.minigame) {
        if (vehSeat === 0 || vehSeat === -1) {
            if (vehicle.getVariable("fuel") && vehicle.getVariable("maxfuel")) {
                let vfuel = vehicle.getVariable("fuel");
                const vmaxfuel = vehicle.getVariable("maxfuel");
                if (vfuel > vmaxfuel) {
                    vfuel = vmaxfuel;
                }
                if (vfuel < 0) {
                    vfuel = 0;
                }
                const TankProzent = (vfuel / vmaxfuel * 100);
                if (fuel !== TankProzent || fuel === 0) {
                    fuel = TankProzent;
                }
            }
            TankBar(Math.floor(fuel));
            const kmh = (vehicle.getSpeed() * 3.6).toFixed(0);
            if (!hudVis) {
                DrawRect(0.030, 0.975, 0.046, 0.03, 0, 0, 0, rectalpha);
                graphics.drawText("Km/h", [0.037, 0.965], {
                    font: 4,
                    color: [255, 255, 255, salpha],
                    scale: [0.4, 0.4],
                    outline: false,
                    centre: false
                });
                graphics.drawText(kmh, [0.016, 0.953], {
                    font: 4,
                    color: [255, 255, 255, salpha],
                    scale: [0.64, 0.64],
                    outline: false,
                    centre: false
                });
            }
            else {
                switch (bigmapStatus) {
                    case 2:
                        DrawRect(fromLeft / 2 + 0.128, fromTop + 0.046, 0.046, 0.03, 0, 0, 0, rectalpha);
                        graphics.drawText("Km/h", [fromLeft / 2 + 0.138, fromTop + 0.036], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.4, 0.4],
                            outline: false,
                            centre: false
                        });
                        graphics.drawText(kmh, [fromLeft / 2 + 0.118, fromTop + 0.026], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.64, 0.64],
                            outline: false,
                            centre: false
                        });
                        break;
                    case 3:
                        DrawRect(fromLeft / 2 + 0.134, fromTop + 0.046, 0.046, 0.03, 0, 0, 0, rectalpha);
                        graphics.drawText("Km/h", [0.135 + 0.085, 0.940], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.4, 0.4],
                            outline: false,
                            centre: false
                        });
                        graphics.drawText(kmh, [0.116 + 0.085, 0.928], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.64, 0.64],
                            outline: false,
                            centre: false
                        });
                        break;
                    default:
                        DrawRect(fromLeft / 2 + 0.0445, fromTop + 0.046, 0.046, 0.03, 0, 0, 0, rectalpha);
                        graphics.drawText("Km/h", [fromLeft / 2 + 0.053, fromTop + 0.036], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.4, 0.4],
                            outline: false,
                            centre: false
                        });
                        graphics.drawText(kmh, [fromLeft / 2 + 0.033, fromTop + 0.026], {
                            font: 4,
                            color: [255, 255, 255, salpha],
                            scale: [0.64, 0.64],
                            outline: false,
                            centre: false
                        });
                        break;
                }
            }
        }
    }
}
mp.events.add('render', drawVehicleSpeed);
const maxDistance = 50 * 50;
mp.events.add('render', (nametags) => {
    if (shownametags) {
        const graphics = mp.game.graphics;
        const screenRes = graphics.getScreenResolution(0, 0);
        nametags.forEach(nametag => {
            let [p, x, y, distance] = nametag;
            if (distance <= maxDistance) {
                let scale = (distance / maxDistance);
                if (scale < 0.6)
                    scale = 0.6;
                y -= scale * (0.005 * (screenRes.y / 1080));
                mp.game.graphics.drawText(p.getVariable('SCCN'), [x, y], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.3, 0.3],
                    centre: true,
                    outline: true
                });
            }
        });
    }
});
let activateNitro = false;
let vehiclesWithNitro = [];
function toggleNitro(state) {
    if (state) {
        activateNitro = true;
        mp.events.callRemote("NITRO_START");
    }
    else {
        activateNitro = false;
        mp.events.callRemote("NITRO_STOP");
    }
}
;
mp.events.add({
    'toggleNitroEffect': (state, v, mult = 50.0) => {
        if (state) {
            if (v && v.handle !== 0)
                vehiclesWithNitro.push(v);
            localPlayer.vehicle.setEnginePowerMultiplier(mult);
        }
        else {
            let indx = vehiclesWithNitro.indexOf(v);
            if (indx !== -1) {
                vehiclesWithNitro.splice(indx, 1);
            }
            localPlayer.vehicle.setEnginePowerMultiplier(1.0);
        }
    }
});
mp.keys.bind(bindKeys.KEY_Y, false, function () {
    if (!mp.players.local.vehicle)
        return;
    if (!activateNitro) {
        toggleNitro(true);
    }
    else if (activateNitro) {
        toggleNitro(false);
    }
});
let sca = mp.game.graphics.requestScaleformMovie("instructional_buttons");
let scaInst = 0;
function SCAStart() {
    scaInst = 0;
    mp.game.graphics.drawScaleformMovieFullscreen(sca, 0, 0, 0, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sca, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sca, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
function AddSCAButton(text, button) {
    mp.game.graphics.pushScaleformMovieFunction(sca, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scaInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scaInst++;
}
function SCAEnd(type) {
    mp.game.graphics.pushScaleformMovieFunction(sca, "DRAW_INSTRUCTIONAL_BUTTONS");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sca, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(65);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
let Neons = null;
mp.events.add('openNeonPage', (id, r, g, b) => {
    if (Neons === null) {
        Neons = mp.browsers.new(`${useurl}/HUD/pages/colorpicker/colorpicker.html`);
        setTimeout(() => {
            callHUD(Neons, ['defineVehicle', id]);
            callHUD(Neons, ['setColor', r, g, b]);
        }, 250);
        mp.gui.cursor.visible = true;
    }
});
mp.events.add('setPreviewNeon', (vid, r, g, b) => {
    mp.events.callRemote('TuningCB', "NeonPreview_" + vid + "_" + r + "_" + g + "_" + b);
});
mp.events.add('setNeon', (vid, r, g, b) => {
    mp.events.callRemote('TuningCB', "NeonSet_" + vid + "_" + r + "_" + g + "_" + b);
});
mp.events.add('closeNeonPage', () => {
    if (Neons !== null) {
        Neons.active = false;
        Neons = null;
        mp.gui.cursor.visible = false;
    }
});
mp.keys.bind(bindKeys.KEY_F4, false, function () {
    mp.events.callRemote('Key_Trigger', 'F4');
    if (mp.players.local.showPhone && !tabopp) {
        callHUD(sPhone, ['SetTabletOpen', 'open']);
        tabopp = true;
        mp.players.local.openPage = true;
    }
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.openPage ||
        mp.players.local.showPhone || isCuffed || mp.players.local.Prisoner ||
        mp.players.local.modalMenu || modal || mp.players.local.menuOpen || tabopp)
        return;
    if (!tabopp) {
        callHUD(sPhone, ['SetTabletOpen', 'open']);
        tabopp = true;
        if (!mp.players.local.cursor) {
            mp.gui.cursor.show(true, true);
            mp.players.local.cursor = true;
            mp.players.local.openPage = true;
        }
    }
});
mp.events.add("playerWeaponChange", (player, oldWeapon, newWeapon) => {
    return;
});
let start = Date.now();
let millis;
mp.events.add("PONG", () => {
    millis = Date.now() - start;
    mp.gui.chat.push(`${start} vs ${Date.now()} : ms = ${millis}`);
});
mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];
    args.shift();
    if (commandName === "ping") {
        start = Date.now();
        mp.gui.chat.push("Send Ping to Server at : " + start);
        mp.events.callRemote('ping');
    }
});
let ped = null;
let veh = null;
mp.game.invoke(`0x9F343285A00B4BB6`, mp.players.local, true);
mp.events.add('taxiride', (aposi, vehicle = null) => {
    if (ped !== null) {
        ped.destroy();
        ped = null;
    }
    const p = mp.players.local.position;
    const position = new mp.Vector3(p.x, p.y, p.z + 1.5);
    const position2 = new mp.Vector3(p.x, p.y, p.z);
    if (vehicle) {
        veh = mp.vehicles.atHandle(vehicle.handle);
    }
    else {
        veh = mp.vehicles.new(Number(mp.game.joaat('windsor2')), position, {
            heading: mp.players.local.heading,
            locked: false,
            engine: true,
            numberPlate: "DRIVER",
        });
        veh.setColours(147, 120);
    }
    ped = mp.peds.new(mp.game.joaat("s_m_y_blackops_01"), position2, 0, (streamPed) => {
        streamPed.setAlpha(255);
    }, 0);
    setTimeout(() => {
        ped.taskEnterVehicle(veh.handle, 5000, -1, 2.0, 16, 0);
        mp.players.local.taskEnterVehicle(veh.handle, 5000, 2, 2.0, 16, 0);
        setTimeout(() => {
            if (veh) {
                const drivingStyle = 786603;
                const speed = 50.0;
                const stopRange = 8.0;
                const x = aposi.x;
                const y = aposi.y;
                const z = aposi.z;
                const pedh = ped.handle;
                const vehh = veh.handle;
                ped.setDriverAbility(1.0);
                mp.game.invoke(`0xA731F608CA104E3C`, pedh, 0.0);
                ped.taskVehicleDriveToCoordLongrange(vehh, x, y, z, speed, drivingStyle, stopRange);
                ped.setDriveTaskDrivingStyle(drivingStyle);
                mp.game.invoke(`0x3B988190C0AA6C0B`, vehh, false);
                mp.game.invoke(`0xAD738C3085FE7E11`, veh, true);
                mp.game.invoke(`0xAD738C3085FE7E11`, ped, true);
            }
        }, 1000);
    }, 1000);
});
mp.events.add('taxiflight', (aposi, vehicle = null) => {
    if (ped !== null) {
        ped.destroy();
        ped = null;
    }
    const p = mp.players.local.position;
    const position = new mp.Vector3(p.x, p.y, p.z + 1.5);
    const position2 = new mp.Vector3(p.x, p.y, p.z);
    if (vehicle) {
        veh = mp.vehicles.atHandle(vehicle.handle);
    }
    else {
        veh = mp.vehicles.new(Number(mp.game.joaat('windsor2')), position, {
            heading: mp.players.local.heading,
            locked: false,
            engine: true,
            numberPlate: "DRIVER",
        });
        veh.setColours(147, 120);
    }
    ped = mp.peds.new(mp.game.joaat("s_m_y_blackops_01"), position2, 0, (streamPed) => {
        streamPed.setAlpha(0);
    }, 0);
    setTimeout(() => {
        ped.taskEnterVehicle(veh.handle, 5000, -1, 2.0, 16, 0);
        mp.players.local.taskEnterVehicle(veh.handle, 5000, 2, 2.0, 16, 0);
        setTimeout(() => {
            if (veh) {
                const drivingStyle = 786603;
                const speed = 50.0;
                const x = aposi.x;
                const y = aposi.y;
                const z = aposi.z;
                const pedh = ped.handle;
                const vehh = veh.handle;
                mp.game.invoke(`0xA731F608CA104E3C`, pedh, 0.0);
                ped.taskHeliMission(vehh, 0, 0, x, y, (z - 0.5), 9, speed, 5, -1, 10, 0, 5.0, 32);
                mp.game.invoke(`0x3B988190C0AA6C0B`, vehh, false);
            }
        }, 1000);
    }, 1000);
});
mp.events.add("TaxiDa", () => {
    setTimeout(() => {
        if (ped !== null) {
            ped.destroy();
            ped = null;
        }
    }, 500);
});
let lasthandle = null;
const drawModel = () => {
    try {
        const startPosition = mp.players.local.getBoneCoords(0, 0, 0, 0);
        const res = mp.game.graphics.getScreenActiveResolution(1, 1);
        const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2]);
        mp.game.ui.showHudComponentThisFrame(14);
        startPosition.z -= 0.3;
        const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, 16);
        if (lasthandle !== null) {
            if (lasthandle.handle !== null)
                mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
            else
                mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
            lasthandle = null;
        }
        if (target) {
            let handle = target.entity;
            let model = mp.game.invoke(Native.GET_ENTITY_MODEL, handle);
            if (model === 0 && target !== null) {
                handle = target.entity.handle;
                model = mp.game.invoke(Native.GET_ENTITY_MODEL, handle);
            }
            const type = mp.game.invoke(Native.GET_ENTITY_TYPE, handle);
            if (target.entity !== undefined && handle !== model && type !== 2) {
                if (target.entity.handle !== null) {
                    mp.game.invoke(`0x44A0870B7E92D7C0`, target.entity, 200, false);
                    lasthandle = target.entity.handle;
                }
                else {
                    mp.game.invoke(`0x44A0870B7E92D7C0`, target.entity, 200, false);
                    lasthandle = target.entity;
                }
                if (target.position !== undefined) {
                    if (mp.players.local.getVariable('Motel')) {
                        mp.game.controls.disableControlAction(0, 24, true);
                        if (mp.game.controls.isDisabledControlJustReleased(0, 24)) {
                            mp.events.callRemote("SetModelFromPoint", model, "f6");
                        }
                    }
                    lasthandle = handle;
                    if (!mp.players.local.getVariable('Motel')) {
                        const newZ = startPosition.z += 1.5;
                        mp.game.graphics.drawLine(startPosition.x, startPosition.y, newZ, target.position.x, target.position.y, target.position.z, 255, 0, 0, 255);
                    }
                    mp.game.graphics.drawText(`Model: ${model} Type: ${type}`, [target.position.x, target.position.y, target.position.z], {
                        font: 0,
                        color: [255, 255, 255, 255],
                        scale: [0.3, 0.3],
                        centre: true,
                        outline: true
                    });
                }
            }
            else {
                if (lasthandle !== null) {
                    if (lasthandle.handle !== null)
                        mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
                    else
                        mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
                    lasthandle = null;
                }
            }
        }
        else {
            if (lasthandle !== null) {
                if (lasthandle.handle !== null)
                    mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
                else
                    mp.game.invoke(Native.RESET_ENTITY_ALPHA, lasthandle);
                lasthandle = null;
            }
        }
    }
    catch (_a) {
    }
};
let time = new Date();
mp.events.add('render', () => {
    if (typeof mp.players.local.getVariable('ShowObjectData') !== 'undefined' && mp.players.local.getVariable('ShowObjectData')) {
        if (mp.players.local.getVariable('ShowObjectData')) {
            const roomkey = mp.game.invoke(`0x47C2A06D4F5F424B`, mp.players.local.handle);
            const target = mp.players.local;
            mp.game.graphics.drawText(`Roomkey: ${roomkey}`, [target.position.x, target.position.y, target.position.z -= 0.5], {
                font: 0,
                color: [255, 255, 255, 255],
                scale: [0.3, 0.3],
                centre: true,
                outline: true
            });
            drawModel();
        }
    }
    else {
        mp.game.ui.hideHudComponentThisFrame(14);
    }
    const dif = new Date().getTime() - time.getTime();
    const seconds = dif / 1000;
    const secondsclean = Math.abs(seconds);
    if (secondsclean > 25) {
        mp.game.invoke(`0xF4F2C0D4EE209E20`);
        time = new Date();
    }
});
mp.events.add('ShowHelpAllert', (text, loop = false, beep = true, duration = 5000) => {
    mp.game.ui.setTextComponentFormat('STRING');
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.displayHelpTextFromStringLabel(0, loop, beep, duration);
});
let wwaypoint;
mp.events.add("playerCreateWaypoint", (position) => {
    try {
        if (typeof position !== 'undefined' && position !== null)
            mp.events.callRemote("waypointset", position);
    }
    catch (e) { }
});
let attachtimercatch = null;
mp.events.add('attachTo', (handle, pos, rot, model, bone, offset) => {
    try {
        const foundObj = mp.game.object.getClosestObjectOfType(pos.x, pos.y, pos.z, 1, mp.game.joaat(model), false, true, true);
        const obj = mp.objects.atHandle(foundObj);
        let pla = mp.players.atHandle(handle.handle);
        if (pla == mp.players.local) {
        }
        obj.setCollision(false, true);
        let bonePos = null;
        switch (bone) {
            case "IK_Root":
                bone = pla.getBoneIndex(56604);
                bonePos = pla.getBoneCoords(56604, 0, 0, 0);
                break;
            case "IK_R_Hand":
                bone = pla.getBoneIndex(6286);
                bonePos = pla.getBoneCoords(6286, 0, 0, 0);
                break;
            case "IK_L_Hand":
                bone = pla.getBoneIndex(36029);
                bonePos = pla.getBoneCoords(36029, 0, 0, 0);
                break;
            case "SKEL_L_Hand":
                bone = pla.getBoneIndex(18905);
                bonePos = pla.getBoneCoords(18905, 0, 0, 0);
                break;
            case "PH_R_Hand":
                bone = pla.getBoneIndex(28422);
                bonePos = pla.getBoneCoords(28422, 0, 0, 0);
                break;
            case "SKEL_R_Hand":
                bone = pla.getBoneIndex(57005);
                bonePos = pla.getBoneCoords(57005, 0, 0, 0);
                break;
            case "PH_L_Hand":
                bone = pla.getBoneIndex(60309);
                bonePos = pla.getBoneCoords(60309, 0, 0, 0);
                break;
            case "FACIAL_facialRoot":
                bone = pla.getBoneIndex(65068);
                bonePos = pla.getBoneCoords(65068, 0, 0, 0);
                break;
            case "IK_Head":
                bone = pla.getBoneIndex(12844);
                bonePos = pla.getBoneCoords(12844, 0, 0, 0);
                break;
            default:
                bone = pla.getBoneIndex(0);
                bonePos = pla.getBoneCoords(0, 0, 0, 0);
                break;
        }
        let px = offset.x;
        let py = offset.y;
        let pz = offset.z;
        let rx = rot.x;
        let ry = rot.y;
        let rz = rot.z;
        try {
            obj.attachTo(pla.handle, bone, px, py, pz, rx, ry, rz, true, true, false, false, 0, true);
        }
        catch (_a) {
            px = 0;
            py = 0;
            pz = 0;
            obj.attachTo(pla.handle, bone, px, py, pz, rx, ry, rz, true, true, false, false, 0, true);
        }
    }
    catch (_b) {
    }
});
mp.events.add('attachObjTo', (handle, pos, rot, obj, bone, Offset) => {
    try {
        let pla = mp.players.atHandle(handle.handle);
        obj.setCollision(false, true);
        let bonePos = null;
        switch (bone) {
            case "IK_Root":
                bone = pla.getBoneIndex(56604);
                bonePos = pla.getBoneCoords(56604, 0, 0, 0);
                break;
            case "IK_R_Hand":
                bone = pla.getBoneIndex(6286);
                bonePos = pla.getBoneCoords(6286, 0, 0, 0);
                break;
            case "IK_L_Hand":
                bone = pla.getBoneIndex(36029);
                bonePos = pla.getBoneCoords(36029, 0, 0, 0);
                break;
            case "PH_R_Hand":
                bone = pla.getBoneIndex(28422);
                bonePos = pla.getBoneCoords(28422, 0, 0, 0);
                break;
            case "PH_L_Hand":
                bone = pla.getBoneIndex(60309);
                bonePos = pla.getBoneCoords(60309, 0, 0, 0);
                break;
            case "FACIAL_facialRoot":
                bone = pla.getBoneIndex(65068);
                bonePos = pla.getBoneCoords(65068, 0, 0, 0);
                break;
            case "IK_Head":
                bone = pla.getBoneIndex(12844);
                bonePos = pla.getBoneCoords(12844, 0, 0, 0);
                break;
            default:
                bone = pla.getBoneIndex(0);
                bonePos = pla.getBoneCoords(0, 0, 0, 0);
                break;
        }
        let px = 0.0;
        let py = 0.0;
        let pz = 0.0;
        let rx = rot.x;
        let ry = rot.y;
        let rz = rot.z;
        obj.attachTo(pla.handle, bone, px, py, pz, rx, ry, rz, true, true, false, false, 0, true);
    }
    catch (e) {
    }
});
mp.events.add('attachObjToPed', (handle, pedid, pos, rot, obj, bone, Offset) => {
    let ped = null;
    PedsArray.forEach(function (peda) {
        if (peda != null) {
            if (peda.pedid == pedid) {
                ped = peda;
            }
        }
    });
    obj.setCollision(false, true);
    let bonePos = null;
    switch (bone) {
        case "IK_Root":
            bone = ped.getBoneIndex(56604);
            bonePos = ped.getBoneCoords(56604, 0, 0, 0);
            break;
        case "IK_R_Hand":
            bone = ped.getBoneIndex(6286);
            bonePos = ped.getBoneCoords(6286, 0, 0, 0);
            break;
        case "IK_L_Hand":
            bone = ped.getBoneIndex(36029);
            bonePos = ped.getBoneCoords(36029, 0, 0, 0);
            break;
        case "PH_R_Hand":
            bone = ped.getBoneIndex(28422);
            bonePos = ped.getBoneCoords(28422, 0, 0, 0);
            break;
        case "PH_L_Hand":
            bone = ped.getBoneIndex(60309);
            bonePos = ped.getBoneCoords(60309, 0, 0, 0);
            break;
        case "FACIAL_facialRoot":
            bone = ped.getBoneIndex(65068);
            bonePos = ped.getBoneCoords(65068, 0, 0, 0);
            break;
        case "IK_Head":
            bone = ped.getBoneIndex(12844);
            bonePos = ped.getBoneCoords(12844, 0, 0, 0);
            break;
        default:
            bone = ped.getBoneIndex(0);
            bonePos = ped.getBoneCoords(0, 0, 0, 0);
            break;
    }
    let px = 0.0;
    let py = 0.0;
    let pz = 0.0;
    let rx = rot.x;
    let ry = rot.y;
    let rz = rot.z;
    obj.attachTo(ped.handle, bone, px, py, pz, rx, ry, rz, true, true, false, false, 0, true);
});
mp.events.add('attachToPed', (handle, pedid, pos, rot, model, bone) => {
    const foundObj = mp.game.object.getClosestObjectOfType(pos.x, pos.y, pos.z, 1, mp.game.joaat(model), false, true, true);
    if (foundObj !== 0) {
        let ped = null;
        const obj = mp.objects.atHandle(foundObj);
        PedsArray.forEach(function (peda) {
            if (peda !== null) {
                if (peda.pedid === pedid) {
                    ped = peda;
                }
            }
        });
        if (ped !== null) {
            obj.setCollision(false, true);
            let bonePos;
            switch (bone) {
                case "IK_Root":
                    bone = ped.getBoneIndex(56604);
                    bonePos = ped.getBoneCoords(56604, 0, 0, 0);
                    break;
                case "IK_R_Hand":
                    bone = ped.getBoneIndex(6286);
                    bonePos = ped.getBoneCoords(6286, 0, 0, 0);
                    break;
                case "IK_L_Hand":
                    bone = ped.getBoneIndex(36029);
                    bonePos = ped.getBoneCoords(36029, 0, 0, 0);
                    break;
                case "PH_R_Hand":
                    bone = ped.getBoneIndex(28422);
                    bonePos = ped.getBoneCoords(28422, 0, 0, 0);
                    break;
                case "PH_L_Hand":
                    bone = ped.getBoneIndex(60309);
                    bonePos = ped.getBoneCoords(60309, 0, 0, 0);
                    break;
                case "FACIAL_facialRoot":
                    bone = ped.getBoneIndex(65068);
                    bonePos = ped.getBoneCoords(65068, 0, 0, 0);
                    break;
                case "IK_Head":
                    bone = ped.getBoneIndex(12844);
                    bonePos = ped.getBoneCoords(12844, 0, 0, 0);
                    break;
                default:
                    bone = ped.getBoneIndex(0);
                    bonePos = ped.getBoneCoords(0, 0, 0, 0);
                    break;
            }
            const px = 0.0;
            const py = 0.0;
            const pz = 0.0;
            const bX = bonePos.X;
            const bY = bonePos.X;
            const bZ = bonePos.X;
            const rx = rot.x;
            const ry = rot.y;
            const rz = rot.z;
            obj.attachTo(ped.handle, bone, px, py, pz, rx, ry, rz, true, true, false, false, 0, true);
        }
    }
});
mp.events.add('detachObj', (ob) => {
    let obj;
    mp.objects.forEach(o => {
        if (o === ob) {
            obj = o;
        }
    });
    if (obj) {
        obj.detach(false, true);
    }
});
mp.events.add('getobjdata', (ob) => {
    let obj;
    mp.objects.forEach(o => {
        if (o === ob) {
            obj = o;
        }
    });
    if (obj) {
        mp.game.graphics.notify("Object Is: " + obj.handle);
    }
});
function getPlayerByHandle(handle) {
    const pla = mp.players.atHandle(handle);
    if (pla === undefined || pla === null) {
        return null;
    }
    return pla;
}
const pointing = {
    active: false,
    interval: null,
    lastSent: 0,
    start: function () {
        return __awaiter(this, void 0, void 0, function* () {
            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                mp.game.streaming.requestAnimDict("anim@mp_point");
                yield mp.game.waitAsync(0);
            }
            if (!this.active) {
                this.active = true;
                mp.game.invoke("0x0725A4CCFDED9A70", mp.players.local.handle, 0, 1, 1, 1);
                mp.players.local.setConfigFlag(36, true);
                mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                this.interval = setInterval(this.process.bind(this), 0);
            }
        });
    },
    stop: function () {
        if (this.active) {
            clearInterval(this.interval);
            this.interval = null;
            this.active = false;
            try {
                mp.game.invoke("0xD01015C7316AE176", mp.players.local.handle, "Stop");
                if (!mp.players.local.isInjured()) {
                    mp.players.local.clearTasks();
                }
                if (!mp.players.local.isInAnyVehicle(true)) {
                    mp.game.invoke("0x0725A4CCFDED9A70", mp.players.local.handle, 1, 1, 1, 1);
                }
                mp.players.local.setConfigFlag(36, false);
                mp.players.local.clearTasks();
            }
            catch (e) {
                mp.console.logError('Stop B say: ' + e, true, true);
            }
        }
    },
    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,
    getRelativePitch: function () {
        const camRot = this.gameplayCam.getRot(2);
        return camRot.x - mp.players.local.getPitch();
    },
    process: function () {
        if (this.active) {
            try {
                mp.game.invoke("0x921CE12C489C4C41", mp.players.local.handle);
                let camPitch = this.getRelativePitch();
                if (camPitch < -70.0) {
                    camPitch = -70.0;
                }
                else if (camPitch > 42.0) {
                    camPitch = 42.0;
                }
                camPitch = (camPitch + 70.0) / 112.0;
                let camHeading = mp.game.cam.getGameplayCamRelativeHeading();
                const cosCamHeading = mp.game.system.cos(camHeading);
                const sinCamHeading = mp.game.system.sin(camHeading);
                if (camHeading < -180.0) {
                    camHeading = -180.0;
                }
                else if (camHeading > 180.0) {
                    camHeading = 180.0;
                }
                camHeading = (camHeading + 180.0) / 360.0;
                const coords = mp.players.local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
                const blocked = (typeof mp.raycasting.testPointToPoint(new mp.Vector3(coords.x, coords.y, coords.z - 0.2), new mp.Vector3(coords.x, coords.y, coords.z + 0.2), mp.players.local.handle, 7) !== 'undefined');
                mp.game.invoke('0xD5BB4025AE449A4E', mp.players.local.handle, "Pitch", camPitch);
                mp.game.invoke('0xD5BB4025AE449A4E', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0);
                mp.game.invoke('0xB0A6CFD2C69C1088', mp.players.local.handle, "isBlocked", blocked);
                mp.game.invoke('0xB0A6CFD2C69C1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) === 4);
                if ((Date.now() - this.lastSent) > 150) {
                    this.lastSent = Date.now();
                    mp.events.callRemote("fpsync.update", camPitch, camHeading);
                }
            }
            catch (e) {
                mp.console.logError(e, true, true);
            }
        }
    }
};
mp.events.add("fpsync.update", (playerH, camPitch, camHeading) => {
    try {
        const netPlayer = getPlayerByHandle(parseInt(playerH.handle));
        if (netPlayer !== null) {
            if (netPlayer !== mp.players.local) {
                netPlayer.lastReceivedPointing = Date.now();
                if (!netPlayer.pointingInterval) {
                    netPlayer.pointingInterval = setInterval((function () {
                        if ((Date.now() - netPlayer.lastReceivedPointing) > 1000) {
                            clearInterval(netPlayer.pointingInterval);
                            netPlayer.lastReceivedPointing = undefined;
                            netPlayer.pointingInterval = undefined;
                            mp.game.invoke("0xD01015C7316AE176", netPlayer.handle, "Stop");
                            if (!netPlayer.isInAnyVehicle(true)) {
                                mp.game.invoke("0x0725A4CCFDED9A70", netPlayer.handle, 1, 1, 1, 1);
                            }
                            netPlayer.setConfigFlag(36, false);
                        }
                    }).bind(netPlayer), 500);
                    mp.game.invoke("0x0725A4CCFDED9A70", netPlayer.handle, 0, 1, 1, 1);
                    netPlayer.setConfigFlag(36, true);
                    netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                }
                mp.game.invoke('0xD5BB4025AE449A4E', netPlayer.handle, "Pitch", camPitch);
                mp.game.invoke('0xD5BB4025AE449A4E', netPlayer.handle, "Heading", camHeading * -1.0 + 1.0);
                mp.game.invoke('0xB0A6CFD2C69C1088', netPlayer.handle, "isBlocked", 0);
                mp.game.invoke('0xB0A6CFD2C69C1088', netPlayer.handle, "isFirstPerson", 0);
            }
        }
    }
    catch (e) {
        mp.console.logError(e, true, true);
    }
});
mp.keys.bind(0x42, true, () => {
    if (mp.players.local.getVariable('animationData'))
        return;
    if (atwork || mp.players.local.casino || mp.players.local.showPhone || isCuffed || !mp.players.local.hascharachter || mp.players.local.cursor || mp.players.local.modal)
        return;
    pointing.start();
});
mp.keys.bind(0x42, false, () => {
    if (mp.players.local.getVariable('animationData'))
        return;
    if (atwork || mp.players.local.casino || mp.players.local.showPhone || isCuffed || !mp.players.local.hascharachter || mp.players.local.cursor || mp.players.local.modal)
        return;
    pointing.stop();
});
let bigmapStatus = 1;
mp.game.ui.setRadarZoom(0.0);
mp.game.ui.setRadarBigmapEnabled(false, false);
mp.events.add('render', () => {
    if (!isUsingController()) {
        mp.game.controls.disableControlAction(0, 48, true);
        mp.game.controls.disableControlAction(0, 212, true);
        mp.game.controls.disableControlAction(0, 245, true);
        if (mp.game.controls.isDisabledControlJustPressed(0, 212)) {
            if (bigmapStatus === 0) {
                mp.game.ui.setRadarZoom(0.0);
                bigmapStatus = 1;
            }
            else if (bigmapStatus === 1) {
                mp.game.ui.setRadarBigmapEnabled(true, false);
                mp.game.ui.setRadarZoom(0.0);
                bigmapStatus = 2;
            }
            else {
                mp.game.ui.setRadarBigmapEnabled(false, false);
                mp.game.ui.setRadarZoom(0.0);
                bigmapStatus = 1;
            }
        }
    }
});
function isUsingController() {
    return !mp.game.controls.isInputDisabled(0);
}
mp.events.add('CamShake', (state, shaketype, intense) => {
    if (state) {
        mp.game.cam.shakeGameplayCam(shaketype, intense);
        mp.game.cam.stopCinematicCamShaking(true);
    }
    else {
        mp.game.cam.stopGameplayCamShaking(true);
    }
});
mp.events.add('ScreeEffect', (state, effect, time, loop) => {
    if (state)
        mp.game.graphics.startScreenEffect(effect, time, loop);
    else
        mp.game.graphics.stopScreenEffect(effect);
});
mp.events.add('tsCameraSelectFPS', (cam, rotate) => {
    const localplayer = mp.players.local;
    let camera = mp.cameras.new('gameplay');
    let pos = null;
    let rr = null;
    let vector = null;
    let rootbone;
    let head;
    let feet;
    if (lastHeading > 180)
        lastHeading = -180;
    if (lastHeading < -180)
        lastHeading = 180;
    const newAngle = 360.0 - ((lastHeading + 360.0) % 360.0);
    switch (cam) {
        case "rotate":
            switch (rotate) {
                case "1":
                    PlayerRotation += 25;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
                case "0":
                    PlayerRotation = newAngle;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
                case "-1":
                    PlayerRotation -= 25;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
            }
            break;
        case "front":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 47);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 8.5 * 0.3;
            vector.y = rr.y * 8.5 * 0.3;
            vector.z = rr.z * 7.5 * 0.3;
            rootbone = mp.players.local.getBoneCoords(0, 0, 0, 0);
            mp.players.local.cam.setCoord(rootbone.x - vector.x, rootbone.y - vector.y, rootbone.z - vector.z);
            mp.players.local.cam.pointAtCoord(rootbone.x, rootbone.y, rootbone.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "face":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 25);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 7 * 0.3;
            vector.y = rr.y * 7 * 0.3;
            vector.z = rr.z * 6 * 0.25;
            head = mp.players.local.getBoneCoords(12844, 0, 0, 0);
            mp.players.local.cam.setCoord(head.x - vector.x, head.y - vector.y, head.z - vector.z);
            mp.players.local.cam.pointAtCoord(head.x, head.y, head.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 2500, true, false);
            break;
        case "foot":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 30);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 6.5 * 0.3;
            vector.y = rr.y * 6.5 * 0.3;
            vector.z = rr.z * 5.5 * 0.3;
            feet = mp.players.local.getBoneCoords(65245, 0, 0, 0);
            mp.players.local.cam.setCoord(feet.x - vector.x, feet.y - vector.y, feet.z - vector.z);
            mp.players.local.cam.pointAtCoord(feet.x, feet.y, feet.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
    }
});
mp.events.add("playerReady", () => {
    const possibleActions = [
        "AR_knife_low_kick_far",
        "AR_knife_low_kick_close",
        "ACT_low_kick_close",
        "ACT_low_kick_far",
        "ACT_takedown_a",
        "ACT_takedown_heavy",
        "ACT_armed_takedown",
        "AR_stealth_kill_a",
        "AR_stealth_kill_knife",
        "ACT_stealth_kill_a",
        "ACT_stealth_kill_weapon",
        "ACT_stealth_kill_b",
        "ACT_stealth_kill_c",
        "ACT_stealth_kill_d",
        "ACT_stealth_kill_a_gardener"
    ];
    possibleActions.forEach(key => {
        const keyHash = mp.game.joaat(key);
        mp.game.invoke("0xA6A12939F16D85BE", keyHash >> 0, 0);
    });
    mp.players.local.setHelmet(false);
    mp.players.local.setProofs(false, true, true, false, false, true, true, true);
    mp.players.local.setSuffersCriticalHits(false);
});
mp.events.add('checkIsGrillStation', () => {
    ['prop_beach_fire', 'prop_hobo_stove_01'].forEach(model => {
        const playerPos = mp.players.local.position;
        const foundObject = mp.game.object.getClosestObjectOfType(playerPos.x, playerPos.y, playerPos.z, 1.5, mp.game.joaat(model), false, true, true);
        if (foundObject) {
            mp.events.callRemote("OpenGrillStation");
        }
    });
});
let idtimer = null;
mp.events.add('showidcard', (classname, type, name, bday) => {
    if (idtimer !== null) {
        clearTimeout(idtimer);
        idtimer = null;
    }
    if (idtimer === null) {
        callHUD(HUD, ['showIDcard', classname, type, name, bday]);
        idtimer = setTimeout(() => {
            callHUD(HUD, ['closePage']);
            idtimer = null;
        }, 15000);
    }
});
mp.events.add('clearHud', () => {
    if (idtimer !== null) {
        clearTimeout(idtimer);
        idtimer = null;
    }
    callHUD(HUD, ['closePage']);
});
const _SET_NOTIFICATION_COLOR_NEXT = "0x39BBF623FC803EAC";
const _SET_NOTIFICATION_BACKGROUND_COLOR = "0x92F0DA1E27DB96DC";
const maxStringLength = 99;
mp.events.add("notify_show", (message, flashing = true, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing)
        mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);
    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength)
        mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.drawNotification(flashing, true);
});
mp.game.ui.notifications = {
    show: (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("notify_show", message, flashing, textColor, bgColor, flashColor)
};
let PedsArray = new Array();
let DeadPeds = new Array();
mp.events.add('createPed', (pedHash, position, heading, dimension, id, charID) => __awaiter(void 0, void 0, void 0, function* () {
    let ped = mp.peds.new(pedHash, position, heading, (streamPed) => {
        streamPed.setAlpha(255);
    }, dimension);
    ped.pedid = id;
    ped.charID = charID;
    ped.freezePosition(true);
    if (id === 666) {
        DeadPeds.push(ped);
    }
    else {
        PedsArray.push(ped);
    }
}));
mp.events.add('createPedbyhash', (pedHash, position, heading, dimension, id, charID) => __awaiter(void 0, void 0, void 0, function* () {
    let ped = mp.peds.new(mp.game.joaat(pedHash), position, heading, (streamPed) => {
        streamPed.setAlpha(255);
    }, dimension);
    ped.pedid = id;
    ped.charID = charID;
    ped.freezePosition(true);
    if (id === 666) {
        DeadPeds.push(ped);
    }
    else {
        PedsArray.push(ped);
    }
}));
mp.events.add('removePed', (pedID) => {
    PedsArray.forEach(function (ped) {
        if (ped !== null) {
            if (ped.pedid === pedID) {
                ped.destroy();
                var index = PedsArray.indexOf(ped);
                if (index > -1) {
                    PedsArray.splice(index, 1);
                }
            }
        }
    });
});
mp.events.add('removeAllPeds', () => {
    deleteAllPeds();
});
mp.events.add('animatePed', (id, dict, animation, time, flag) => {
    PedsArray.forEach(function (ped) {
        if (ped !== null) {
            if (ped.pedid === id) {
                playani(ped, dict, animation, time, flag);
            }
        }
    });
});
mp.events.add('stoppedanim', (id) => {
    PedsArray.forEach(function (ped) {
        if (ped !== null) {
            if (ped.pedid === id) {
                stoppedanim(ped);
            }
        }
    });
});
mp.events.add('animatePedTest', (id) => {
    PedsArray.forEach(function (ped) {
        if (ped != null) {
            if (ped.pedid == id) {
                playaniTest(ped);
            }
        }
    });
});
mp.events.add('removedeadped', (charID) => {
    DeadPeds.forEach(function (ped) {
        if (ped != null) {
            if (ped.charID == charID) {
                ped.destroy();
                var index = DeadPeds.indexOf(ped);
                if (index > -1) {
                    DeadPeds.splice(index, 1);
                }
            }
        }
    });
});
mp.events.add('deadthpeds', () => {
    DeadPeds.forEach(function (ped) {
        if (ped != null) {
            playDead(ped);
        }
    });
});
function playani(ped, dict, animation, time, flag) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mp.game.streaming.hasAnimDictLoaded(dict)) {
            mp.game.streaming.requestAnimDict(dict);
            while (!mp.game.streaming.hasAnimDictLoaded(dict)) {
                yield mp.game.waitAsync(0);
            }
        }
        ped.taskPlayAnim(dict, animation, 2.0, -1.0, time, flag, 1, true, true, true);
    });
}
function stoppedanim(ped) {
    return __awaiter(this, void 0, void 0, function* () {
        ped.clearTasks();
    });
}
function playaniTest(ped) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mp.game.streaming.hasAnimDictLoaded("rcmnigel1c")) {
            mp.game.streaming.requestAnimDict("rcmnigel1c");
            while (!mp.game.streaming.hasAnimDictLoaded("rcmnigel1c")) {
                yield mp.game.waitAsync(0);
            }
        }
        ped.taskPlayAnim("rcmnigel1c", "hailing_whistle_waive_a", 2.0, -1.0, 3500, 17, 1, true, true, true);
    });
}
function playDead(ped) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mp.game.streaming.hasAnimDictLoaded("combat@death@from_writhe")) {
            mp.game.streaming.requestAnimDict("combat@death@from_writhe");
            while (!mp.game.streaming.hasAnimDictLoaded("combat@death@from_writhe")) {
                yield mp.game.waitAsync(0);
            }
        }
        ped.taskPlayAnim("combat@death@from_writhe", "death_b", 1.0, -1.0, -1, 2, 1, true, true, true);
    });
}
function deleteAllPeds() {
    PedsArray.forEach(function (ped) {
        if (ped != null) {
            ped.destroy();
        }
    });
    PedsArray = new Array();
}
mp.events.add('pictureNotify', (title, subtitle, char = "CHAR_DEFAULT", message, flashing = false, icon = 1) => {
    const Game = mp.game;
    const Misc = mp.game.graphics;
    const Client = mp.players.local;
    if (Game.gameplay.getProfileSetting(800)) {
        let msg;
        try {
            Misc.requestStreamedTextureDict(char, true);
        }
        catch (e) {
            Misc.requestStreamedTextureDict("CHAR_DEFAULT", true);
        }
        if (message.length > 99) {
            msg = message.match(/.{1,99}/g);
            msg.forEach(function (m, idx, arr) {
                if (idx == 0) {
                    Game.ui.setNotificationTextEntry("STRING");
                    Game.ui.addTextComponentSubstringWebsite(m);
                    Game.ui.setNotificationMessage(char, char, flashing, icon, title, subtitle);
                    Game.ui.drawNotification(false, true);
                }
                else {
                    mp.game.graphics.notify(m);
                }
            });
        }
        else {
            Game.ui.setNotificationTextEntry("STRING");
            Game.ui.addTextComponentSubstringWebsite(message);
            Game.ui.setNotificationMessage(char, char, flashing, icon, title, subtitle);
            Game.ui.drawNotification(false, true);
        }
    }
    ;
});
const messageScaleform = class BasicScaleform {
    constructor(scaleformName) {
        this.handle = mp.game.graphics.requestScaleformMovie(scaleformName);
        if (typeof this.handle === 'number')
            while (!mp.game.graphics.hasScaleformMovieLoaded(this.handle))
                mp.game.wait(0);
    }
    callFunction(functionName, ...args) {
        mp.game.graphics.pushScaleformMovieFunction(this.handle, functionName);
        args.forEach(arg => {
            switch (typeof arg) {
                case "string": {
                    mp.game.graphics.pushScaleformMovieFunctionParameterString(arg);
                    break;
                }
                case "boolean": {
                    mp.game.graphics.pushScaleformMovieFunctionParameterBool(arg);
                    break;
                }
                case "number": {
                    if (Number(arg) === arg && arg % 1 !== 0) {
                        mp.game.graphics.pushScaleformMovieFunctionParameterFloat(arg);
                    }
                    else {
                        mp.game.graphics.pushScaleformMovieFunctionParameterInt(arg);
                    }
                }
            }
        });
        mp.game.graphics.popScaleformMovieFunctionVoid();
    }
    renderFullscreen() {
        mp.game.graphics.drawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, false);
    }
    dispose() {
        mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this.handle);
    }
};
let bigMessageScaleform = null;
let bigMsgInit = 0;
let bigMsgDuration = 5000;
let bigMsgAnimatedOut = false;
let midsizedMessageScaleform = null;
let msgInit = 0;
let msgDuration = 5000;
let msgAnimatedOut = false;
let msgBgColor = 0;
mp.events.add("ShowWeaponPurchasedMessage", (title, weaponName, weaponHash, time = 5000) => {
    if (bigMessageScaleform == null)
        bigMessageScaleform = new messageScaleform("mp_big_message_freemode");
    bigMessageScaleform.callFunction("SHOW_WEAPON_PURCHASED", title, weaponName, weaponHash);
    bigMsgInit = Date.now();
    bigMsgDuration = time;
    bigMsgAnimatedOut = false;
});
mp.events.add("ShowPlaneMessage", (title, planeName, planeHash, time = 5000) => {
    if (bigMessageScaleform == null)
        bigMessageScaleform = new messageScaleform("mp_big_message_freemode");
    bigMessageScaleform.callFunction("SHOW_PLANE_MESSAGE", title, planeName, planeHash);
    bigMsgInit = Date.now();
    bigMsgDuration = time;
    bigMsgAnimatedOut = false;
});
mp.events.add("ShowShardMessage", (title, message, titleColor, bgColor, time = 5000) => {
    if (bigMessageScaleform == null)
        bigMessageScaleform = new messageScaleform("mp_big_message_freemode");
    bigMessageScaleform.callFunction("SHOW_SHARD_CENTERED_MP_MESSAGE", title, message, titleColor, bgColor);
    bigMsgInit = Date.now();
    bigMsgDuration = time;
    bigMsgAnimatedOut = false;
});
mp.events.add("ShowMidsizedMessage", (title, message, time = 5000) => {
    if (midsizedMessageScaleform == null)
        midsizedMessageScaleform = new messageScaleform("midsized_message");
    midsizedMessageScaleform.callFunction("SHOW_MIDSIZED_MESSAGE", title, message);
    msgInit = Date.now();
    msgDuration = time;
    msgAnimatedOut = false;
});
mp.events.add("ShowMidsizedShardMessage", (title, message, bgColor, useDarkerShard, condensed, time = 5000) => {
    if (midsizedMessageScaleform == null)
        midsizedMessageScaleform = new messageScaleform("midsized_message");
    midsizedMessageScaleform.callFunction("SHOW_SHARD_MIDSIZED_MESSAGE", title, message, bgColor, useDarkerShard, condensed);
    msgInit = Date.now();
    msgDuration = time;
    msgAnimatedOut = false;
    msgBgColor = bgColor;
});
mp.events.add('render', () => {
    if (bigMessageScaleform !== null) {
        bigMessageScaleform.renderFullscreen();
        if (bigMsgInit > 0 && Date.now() - bigMsgInit > bigMsgDuration) {
            if (!bigMsgAnimatedOut) {
                bigMessageScaleform.callFunction("TRANSITION_OUT");
                bigMsgAnimatedOut = true;
                bigMsgDuration += 750;
            }
            else {
                bigMsgInit = 0;
                bigMessageScaleform.dispose();
                bigMessageScaleform = null;
            }
        }
    }
    if (midsizedMessageScaleform !== null) {
        midsizedMessageScaleform.renderFullscreen();
        if (msgInit > 0 && Date.now() - msgInit > msgDuration) {
            if (!msgAnimatedOut) {
                midsizedMessageScaleform.callFunction("SHARD_ANIM_OUT", msgBgColor);
                msgAnimatedOut = true;
                msgDuration += 750;
            }
            else {
                msgInit = 0;
                midsizedMessageScaleform.dispose();
                midsizedMessageScaleform = null;
            }
        }
    }
});
mp.game.ui.messages = {
    showShard: (title, message, titleColor, bgColor, time = 5000) => mp.events.call("ShowShardMessage", title, message, titleColor, bgColor, time),
    showWeaponPurchased: (title, weaponName, weaponHash, time = 5000) => mp.events.call("ShowWeaponPurchasedMessage", title, weaponName, weaponHash, time),
    showPlane: (title, planeName, planeHash, time = 5000) => mp.events.call("ShowPlaneMessage", title, planeName, planeHash, time),
    showMidsized: (title, message, time = 5000) => mp.events.call("ShowMidsizedMessage", title, message, time),
    showMidsizedShard: (title, message, bgColor, useDarkerShard, condensed, time = 5000) => mp.events.call("ShowMidsizedShardMessage", title, message, bgColor, useDarkerShard, condensed, time)
};
mp.keys.bind(bindKeys.KEY_F12, false, function () {
    const lastHudState = hudVis;
    const lastphase = hudvisphase;
    hudVis = false;
    hudvisphase = 1;
    mp.game.ui.displayRadar(hudVis);
    setTimeout(() => {
        const date = new Date;
        const filename = date.toISOString().slice(0, 10).replace(/-/g, "-") + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".jpg";
        mp.game.graphics.notify("~g~Screenshot Erstellt");
        mp.gui.takeScreenshot(filename, 0, 100, 0);
        hudVis = lastHudState;
        hudvisphase = lastphase;
        mp.game.ui.displayRadar(lastHudState);
    }, 250);
});
mp.events.add('getallweapons', () => {
    const weapons = JSON.stringify(getAllWeapons());
    const wData = JSON.parse(weapons);
});
mp.events.add('getslot', (hashstring) => {
});
mp.events.add('getAmmobystring', (hashstring) => {
});
mp.events.add('getammo', (hash) => {
});
const localPlayer = mp.players.local;
const Slots = [0, 1148759288, 2008981611, -249849968, 1993361168, 1277010230, 932043479, 690654591, 1459198205, 195782970, -438797331, 896793492, 495159329, -1155528315, -515636489, -871913299, -1352759032, -542958961, 1682645887, -859470162, -2125426402, 2067210266, -538172856, 1783244476, 439844898, -24829327, 1949306232, -1941230881, -1033554448, 320513715, -695165975, -281028447, -686713772, 347509793, 1769089473, 189935548, 248801358, 386596758, -157212362, 436985596, -47957369, 575938238];
function getWeaponTypeInSlot(weaponSlot) {
    return mp.game.invoke('0xEFFED78E9011134D', localPlayer.handle, weaponSlot);
}
function getAmmoWeapon(weaponhash) {
    return mp.game.invoke('0x015A522136D7F951', localPlayer.handle, weaponhash);
}
function haveWeapon(weaponhashstring) {
    const gun = mp.game.joaat(`WEAPON_${weaponhashstring}`);
    return mp.game.invoke("0x8DECB02F88F428BC", mp.players.local.handle, gun, 0);
}
function getSlot(gun) {
    return mp.game.invoke("0x4215460B9B8B7FA0", gun);
}
function getAllWeapons() {
    const weapons = {};
    Slots.forEach(weaponSlot => {
        const weapon = getWeaponTypeInSlot(weaponSlot);
        if (weapon !== 0 && weapon !== -1569615261) {
            weapons[weapon] = { ammo: getAmmoWeapon(weapon) };
        }
    });
    return weapons;
}
mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
mp.game.audio.startAudioScene("MIC1_RADIO_DISABLE");
mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
mp.game.invoke(`0xB4F90FAF7670B16F`, false);
mp.game.invoke(`0x218DD44AAAC964FF`, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", true, 0);
mp.game.invoke(`0x218DD44AAAC964FF`, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", true, 0);
mp.game.invoke(`0x218DD44AAAC964FF`, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", true, 0);
mp.game.invoke(`0xBDA07E5950085E46`, 0, false, false);
mp.game.invoke(`0x1D6650420CEC9D3B`, "AZ_DISTANT_SASQUATCH", 0, 0);
mp.game.audio.setAudioFlag("LoadMPData", true);
mp.game.audio.setAudioFlag("DisableFlightMusic", true);
mp.game.audio.setAudioFlag("ActivateSwitchWheelAudio", false);
let serversettingonce = true;
const colour = { r: 171, g: 15, b: 173 };
let ServerName = "";
mp.events.add('discord', (name, state) => {
    mp.discord.update(name, state);
    ServerName = name;
    if (serversettingonce) {
        serversettingonce = false;
        mp.game.gxt.set('PM_PAUSE_HDR', name);
        mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255);
        mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255);
    }
});
mp.events.add('render', function () {
    var online = mp.players.length;
    if (online != mp.players.length) {
        online = mp.players.length;
        mp.game.gxt.set("PM_PAUSE_HDR", ServerName + " ~w~Online: ~g~" + `${online}`);
    }
    mp.game.gxt.set("PM_PAUSE_HDR", ServerName + " ~w~Online: ~g~" + `${online}`);
    mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255);
    mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255);
});
mp.events.add('doorManager', (p, Hash, PosX, PosY, PosZ, Locked, heading) => {
    mp.game.object.setStateOfClosestDoorOfType(Number(Hash), PosX, PosY, PosZ, Locked, heading, false);
});
mp.events.add('doorManagerNew', (Hash, PosX, PosY, PosZ, Locked, heading = 0) => {
    mp.game.object.doorControl(Number(Hash), PosX, PosY, PosZ, Locked, 0.0, 0.0, 0);
    if (heading !== 0) {
        mp.game.object.setStateOfClosestDoorOfType(Number(Hash), PosX, PosY, PosZ, Locked, heading, false);
    }
});
mp.events.add('freeHands', () => {
    try {
        const handle = mp.players.local.handle;
        const player = mp.players.atHandle(handle);
        player.weapon = 0xA2719263;
    }
    catch (_a) {
        return;
    }
});
let cpt = 0;
let fps = 0;
let healthwidth, speedwidth;
const graphics = mp.game.graphics;
let active = false;
setInterval(() => {
    fps = cpt;
    cpt = 0;
}, 1000);
function hud() {
    try {
        cpt++;
        if (hudVis) {
        }
        if (!player.getVariable("conid")) {
            mp.gui.chat.push("Bann bann bann");
            mp.events.callRemote("kick", "NoScId");
        }
    }
    catch (e) {
        mp.gui.chat.push(e);
    }
}
mp.events.add('AddToHud', () => {
    mp.events.add('render', hud);
    active = true;
});
const blockedClasses = [13, 14, 15, 16, 21];
mp.keys.bind(bindKeys.KEY_Y, false, () => {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.players.local.modalMenu || modal || mp.chatIsOpen || mp.players.local.openPage || mp.players.local.showPhone || mp.players.local.vehicle)
        return;
    mp.events.callRemote("toggleCrouch");
});
let PlayerRot = new mp.Vector3(0, 0, 0);
const cc = mp.cameras.new('gameplay');
mp.keys.bind(bindKeys.KEY_UP, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.game.ui.isPauseMenuActive())
        return;
    try {
        if (mp.players.local.Prisoner || mp.players.local.openPage && !tabopp || mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || atwork || isCuffed || mp.players.local.showPhone || menu.isVisible || menuPool[menuPool.length - 1].isVisible)
            return;
        mp.events.call('showPhone');
    }
    catch (e) {
        mp.console.logError(e, true, true);
    }
});
mp.keys.bind(bindKeys.KEY_DOWN, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.game.ui.isPauseMenuActive())
        return;
    if (!mp.players.local.showPhone)
        return;
    mp.events.callRemote('ShowPhone');
});
mp.keys.bind(bindKeys.KEY_F2, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle)
        return;
    mp.events.callRemote('Key_Trigger', 'F2');
});
let tabopp = false;
mp.keys.bind(bindKeys.KEY_T, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.openPage ||
        mp.players.local.showPhone || isCuffed || mp.players.local.Prisoner ||
        mp.players.local.modalMenu || modal || mp.players.local.menuOpen || tabopp)
        return;
    if (!mp.ChatToggle) {
        if (!tabopp) {
        }
    }
    else {
        mp.events.callRemote('Key_Trigger', 'T');
    }
});
mp.keys.bind(bindKeys.KEY_F3, false, function () {
    if (tabopp) {
        callHUD(sPhone, ['SetTabletOpen', 'close']);
        tabopp = false;
        mp.players.local.openPage = false;
        if (!mp.players.local.showPhone) {
            if (mp.players.local.cursor) {
                mp.gui.cursor.show(false, false);
                mp.players.local.cursor = false;
            }
        }
        return;
    }
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal)
        return;
    if (mp.players.local.vehicle) {
        if (mp.players.local.vehicle.getClass() === 18) {
            mp.events.callRemote('Key_Trigger', 'F3CopVeh');
        }
        else {
            mp.events.callRemote('Key_Trigger', 'F3Veh');
        }
    }
    else {
        mp.events.callRemote('Key_Trigger', 'F3');
    }
});
mp.players.local.modalMenu = false;
mp.keys.bind(bindKeys.KEY_BACKSPACE, false, function () {
    if (!mp.players.local.hascharachter)
        return;
    if (menuPool[menuPool.length - 1].isVisible && !modal) {
        if (menuPool.length > 2) {
            if (menuPool.length === 2) {
                menu.close();
            }
            if (menuPool.length === 3) {
                if (mp.players.local.modalMenu)
                    return;
            }
            MenuPool.removeSubMenu(menuPool[menuPool.length - 1]);
            menuPool.splice(-1, 1);
            if (menuPool.length === 2) {
                mp.events.callRemote('Key_Trigger', 'BackTuning');
            }
        }
        else {
            if (mp.players.local.modalMenu)
                return;
            menu.close();
        }
        mp.events.callRemote('Key_Trigger', 'Back');
    }
    mp.players.local.menuOpen = menuPool[menuPool.length - 1].isVisible;
});
let hudVis = true;
let hudvisphase = 0;
mp.keys.bind(bindKeys.KEY_F7, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal)
        return;
    callHUD(HUD, ['hudVis']);
    if (hudVis && hudvisphase === 0) {
        mp.game.ui.displayRadar(false);
        hudvisphase = 1;
        hudVis = false;
    }
    else if (!hudVis && hudvisphase === 1) {
        mp.game.ui.displayRadar(false);
        hudvisphase = 2;
        hudVis = false;
    }
    else {
        mp.game.ui.displayRadar(true);
        hudvisphase = 0;
        hudVis = true;
    }
});
mp.keys.bind(bindKeys.KEY_COMMA, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.vehicle || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'COM');
});
mp.keys.bind(bindKeys.KEY_F10, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu)
        return;
    if (!mp.players.local.cursor) {
        mp.gui.cursor.show(true, true);
        mp.players.local.cursor = true;
    }
    else {
        mp.gui.cursor.show(false, false);
        mp.players.local.cursor = false;
    }
});
mp.keys.bind(bindKeys.KEY_F8, false, function () {
    if (!mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal)
        return;
    mp.events.callRemote('Key_Trigger', 'F8');
});
mp.keys.bind(bindKeys.KEY_F6, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter)
        return;
    mp.events.callRemote('Key_Trigger', 'F6');
});
let f5timer = null;
mp.keys.bind(bindKeys.KEY_F5, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.players.local.vehicle || mp.players.local.getVariable('atwork'))
        return;
    if (sPhone !== null) {
        sPhone.active = false;
        sPhone.destroy();
        sPhone = null;
    }
    mp.gui.cursor.show(false, false);
    mp.events.callRemote("AnimationPlay", "stop");
    mp.events.callRemote("PhoneShowing", false);
    mp.players.local.cursor = false;
    mp.players.local.showPhone = false;
    mp.players.local.inputBlocked = true;
    mp.players.local.phonephase = false;
    phoneS = false;
    tabopp = false;
    mp.players.local.openPage = false;
    if (!mp.players.local.showPhone) {
        if (mp.players.local.cursor) {
            mp.gui.cursor.show(false, false);
            mp.players.local.cursor = false;
        }
    }
    if (player.getVariable('sva') === '1') {
        sPhone = mp.browsers.new("https://smartphone.icbit.win/?cid=" + player.getVariable('cid') + "&sid=" + player.getVariable('sva') + "&t=" + session + "&d=" + player.getVariable('dd'));
    }
    else {
        sPhone = mp.browsers.new("https://tele.liberty-rp.de/?cid=" + player.getVariable('cid') + "&sid=" + player.getVariable('sva') + "&t=" + session + "&d=" + player.getVariable('dd'));
    }
    if (f5timer === null) {
        f5timer = setTimeout(function () {
            mp.events.callRemote("destroyObj");
            player.clearTasksImmediately();
            clearTimeout(f5timer);
            f5timer = null;
        }, 500);
    }
    mp.events.callRemote("Key_Trigger", "F5");
});
mp.keys.bind(bindKeys.KEY_F9, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu)
        return;
    mp.events.callRemote('Key_Trigger', 'F9');
});
mp.keys.bind(bindKeys.KEY_E, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (mp.players.local.vehicle) {
        mp.events.callRemote('Key_Trigger', 'EVEH');
    }
    else {
        mp.events.callRemote('Key_Trigger', 'E');
    }
});
mp.keys.bind(bindKeys.KEY_R, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'R');
});
mp.keys.bind(bindKeys.KEY_H, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'H');
});
mp.keys.bind(bindKeys.KEY_I, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.openPage || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'I');
});
mp.keys.bind(bindKeys.KEY_M, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'M');
});
mp.keys.bind(bindKeys.KEY_N, true, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'N');
});
mp.keys.bind(bindKeys.KEY_N, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'N1');
});
mp.keys.bind(bindKeys.KEY_O, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (mp.players.local.vehicle) {
        mp.events.callRemote('Key_Trigger', 'OVEH');
    }
    else {
    }
});
mp.keys.bind(bindKeys.KEY_K, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
});
mp.keys.bind(bindKeys.KEY_U, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.cursor || mp.players.local.openPage)
        return;
});
mp.keys.bind(bindKeys.KEY_Z, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || isDriving || mp.players.local.cursor)
        return;
    mp.events.callRemote('Key_Trigger', 'Z');
});
mp.chatIsOpen = false;
mp.events.add('playerChat', (player, text) => {
    mp.chatIsOpen = false;
});
mp.events.add('playerCommand', (command) => {
    mp.chatIsOpen = false;
});
mp.keys.bind(0x0D, false, () => {
    mp.chatIsOpen = false;
});
mp.keys.bind(bindKeys.KEY_T, false, function () {
    if (!mp.ChatToggle)
        return;
    if (mp.chatIsOpen)
        return;
    if (mp.chatIsOpen === true) {
        mp.chatIsOpen = false;
    }
    else {
        mp.chatIsOpen = true;
    }
});
mp.keys.bind(bindKeys.KEY_9, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal)
        return;
    mp.events.callRemote('Key_Trigger', '9');
});
mp.keys.bind(bindKeys.KEY_X, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (mp.players.local.vehicle && mp.players.local.vehicle.getClass() === 18) {
        mp.events.callRemote('Key_Trigger', 'XVEH');
    }
    else {
        mp.events.callRemote('Key_Trigger', 'X');
    }
});
mp.keys.bind(bindKeys.KEY_Y, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.cursor || mp.players.local.vehicle)
        return;
    mp.events.callRemote('Key_Trigger', 'Y');
});
mp.keys.bind(bindKeys.KEY_NUMPAD0, false, function () {
    if (mp.players.local.casino)
        return;
    const vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) === mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) === -1) {
        mp.events.callRemote('Key_Trigger', 'NUM0VEH');
    }
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM0');
});
mp.keys.bind(bindKeys.KEY_NUMPAD1, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM1');
});
mp.keys.bind(bindKeys.KEY_NUMPAD2, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM2');
});
mp.keys.bind(bindKeys.KEY_NUMPAD3, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM3');
});
mp.keys.bind(bindKeys.KEY_NUMPAD4, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM4');
});
mp.keys.bind(bindKeys.KEY_NUMPAD5, false, function () {
    if (mp.players.local.casino)
        return;
    const vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) === mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) === -1) {
        mp.events.callRemote("ToggleNeons", null);
    }
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM5');
});
mp.keys.bind(bindKeys.KEY_NUMPAD6, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM6');
});
mp.keys.bind(bindKeys.KEY_NUMPAD7, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM7');
});
mp.keys.bind(bindKeys.KEY_NUMPAD8, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM8');
});
mp.keys.bind(bindKeys.KEY_NUMPAD9, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    mp.events.callRemote('Key_Trigger', 'NUM9');
});
function DisableControls(array) {
    const controls = mp.game.controls;
    for (const control of array) {
        controls.disableControlAction(0, control, true);
    }
}
function DisableHudElements(array) {
    for (const element of array) {
        mp.game.ui.hideHudComponentThisFrame(element);
    }
}
mp.events.add('removeObject', (pos, model) => {
    mp.game.entity.createModelHide(pos.x, pos.y, pos.z, 5, model, true);
});
mp.events.add('SetCol', (pos, model) => {
    if (!mp.players.local.hascharachter) {
        return;
    }
    const foundObj = mp.game.object.getClosestObjectOfType(pos.x, pos.y, pos.z, 0.5, Number(model), false, true, true);
    const obj = mp.objects.atHandle(foundObj);
    if (!obj)
        return;
    obj.setCollision(false, true);
    obj.setLodDist(65535);
});
mp.events.add('objectSync', (pos, model) => {
    if (!mp.players.local.hascharachter) {
        return;
    }
    const handle = mp.game.object.getClosestObjectOfType(pos.x, pos.y, pos.z, 2, Number(model), false, true, true);
    if (!handle)
        return;
    const entity = mp.objects.atHandle(handle);
    if (!entity)
        return;
    const collision = entity.getVariable("map_coll");
    if (collision) {
        entity.setCollision(Boolean(collision), false);
        entity.setLodDist(65535);
    }
    const freeze = entity.getVariable("map_freeze");
    if (freeze) {
        entity.freezePosition(Boolean(freeze));
    }
});
let letztesUpdate = new Date().getTime();
let Meter = 0;
let Verbrauch = 0;
let atwork = false;
let isDriving = false;
mp.players.local.isDeath = false;
mp.players.local.hascharachter = false;
let ProgressbarVisible = false;
const { x: resx, y: resy } = mp.game.graphics.getScreenActiveResolution(0, 0);
let BarStepSize = (0.50 / 100);
let StartUnit = 0;
let CurrentUnits = 0;
let MaxUnits = 100;
let LocalPlayer = mp.players.local;
let PercentPerUnit = 0;
let ProgressbarLabel = "";
let modal = false;
const controlKeyIndex = 58;
let canUseKeyForDriveSeat = false;
let preferMostInFrontSeat = false;
let maxDistanceForMostInFrontPref = 1.224;
let maxSpeedEntering = 5;
let allowSwitchingSeat = false;
let tacho, fuel;
const is2rad = false;
const isbus = false;
const isplane = false;
let inwater = false;
let parachute = -1;
let swim = false;
let isfalling = false;
let lastRange = 0;
let zzz = 0;
let Tempolimit = 0;
const seatBoneList = [
    'seat_dside_f',
    'seat_pside_f',
    'seat_dside_r',
    'seat_pside_r',
    'seat_dside_r1',
    'seat_pside_r1',
    'seat_dside_r2',
    'seat_pside_r2',
    'seat_dside_r3',
    'seat_pside_r3',
    'seat_dside_r4',
    'seat_pside_r4',
    'seat_dside_r5',
    'seat_pside_r5',
    'seat_dside_r6',
    'seat_pside_r6',
    'seat_dside_r7',
    'seat_pside_r7',
];
let isWraped = false;
let vehSeat;
let RadioSync;
let lastCuffUpdate = new Date().getTime();
let lastProofUpdate = new Date().getTime();
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    Tempolimit = 50;
    fuel = 150;
    if (typeof mp.players.local.getVariable('SCCN') === 'undefined') {
        mp.events.callRemote("kick", "Vehicle Enter");
    }
    if (typeof vehicle.getVariable('type') !== 'undefined' && vehicle.getVariable('type') !== 6) {
        if (!vehicle.getVariable('engine')) {
            vehicle.setEngineOn(false, false, false);
            mp.game.invoke(`0x8ABA6AF54B942B95`, vehicle.handle, true);
        }
        else {
            vehicle.setEngineOn(true, true, true);
            mp.game.invoke(`0x8ABA6AF54B942B95`, vehicle.handle, false);
        }
        if (vehicle.getVariable('radio') === "on") {
            mp.game.invoke(`0x3B988190C0AA6C0B`, vehicle.handle, true);
        }
        else {
            mp.game.invoke(`0x3B988190C0AA6C0B`, vehicle.handle, false);
        }
        vehSeat = seat;
    }
    localPlayer.setConfigFlag(35, false);
    if (vehicle.getEngineHealth() <= 1) {
        vehicle.setEngineOn(false, false, false);
        vehicle.setUndriveable(true);
    }
});
mp.events.add('setVehicleSpeed', (vehicle, speed) => {
    const MaxSpeed = (parseInt(speed, 10) / 3.6);
    vehicle.setMaxSpeed(MaxSpeed);
});
mp.events.add('playerLeaveVehicle', () => {
    if (typeof mp.players.local.getVariable('SCCN') === 'undefined' && mp.players.local.hascharachter) {
        mp.events.callRemote("kick", "Vehicle Exit");
    }
    const vehicle = mp.players.local.vehicle;
    if (vehicle) {
        if (typeof vehicle.getVariable('type') !== 'undefined' && vehicle.getVariable('type') !== 6) {
            if (!vehicle.getVariable('engine')) {
                vehicle.setEngineOn(false, false, true);
                vehicle.setUndriveable(true);
            }
            else {
                vehicle.setEngineOn(true, true, true);
                vehicle.setUndriveable(false);
            }
            if (vehicle.getEngineHealth() <= 1) {
                vehicle.setEngineOn(false, false, false);
                vehicle.setUndriveable(true);
            }
        }
    }
    vehSeat = null;
    mp.events.call('TaximeterOff');
    mp.players.local.buckle = false;
});
mp.events.add('setModal', (state, withMouse = false) => {
    modal = state;
    if (withMouse) {
        mp.gui.cursor.show(state, state);
    }
});
mp.events.add('hideTacho', () => {
    if (tacho !== false) {
        tacho = false;
    }
});
let ratiotocheck = "0.00";
let showtransR = "0:0";
mp.events.add('render', () => {
    mp.game.vehicle.setExperimentalAttachmentSyncEnabled(true);
    if (freezed) {
        mp.game.controls.disableControlAction(0, 32, true);
        mp.game.controls.disableControlAction(0, 71, true);
        mp.game.controls.disableControlAction(0, 77, true);
        mp.game.controls.disableControlAction(0, 87, true);
        mp.game.controls.disableControlAction(0, 129, true);
        mp.game.controls.disableControlAction(0, 136, true);
        mp.game.controls.disableControlAction(0, 150, true);
        mp.game.controls.disableControlAction(0, 232, true);
        mp.game.controls.disableControlAction(0, 232, true);
        mp.game.controls.disableControlAction(0, 8, true);
        mp.game.controls.disableControlAction(0, 31, true);
        mp.game.controls.disableControlAction(0, 33, true);
        mp.game.controls.disableControlAction(0, 72, true);
        mp.game.controls.disableControlAction(0, 78, true);
        mp.game.controls.disableControlAction(0, 88, true);
        mp.game.controls.disableControlAction(0, 130, true);
        mp.game.controls.disableControlAction(0, 139, true);
        mp.game.controls.disableControlAction(0, 149, true);
        mp.game.controls.disableControlAction(0, 151, true);
        mp.game.controls.disableControlAction(0, 196, true);
        mp.game.controls.disableControlAction(0, 219, true);
        mp.game.controls.disableControlAction(0, 233, true);
        mp.game.controls.disableControlAction(0, 34, true);
        mp.game.controls.disableControlAction(0, 63, true);
        mp.game.controls.disableControlAction(0, 89, true);
        mp.game.controls.disableControlAction(0, 133, true);
        mp.game.controls.disableControlAction(0, 147, true);
        mp.game.controls.disableControlAction(0, 234, true);
        mp.game.controls.disableControlAction(0, 9, true);
        mp.game.controls.disableControlAction(0, 30, true);
        mp.game.controls.disableControlAction(0, 35, true);
        mp.game.controls.disableControlAction(0, 59, true);
        mp.game.controls.disableControlAction(0, 64, true);
        mp.game.controls.disableControlAction(0, 90, true);
        mp.game.controls.disableControlAction(0, 134, true);
        mp.game.controls.disableControlAction(0, 146, true);
        mp.game.controls.disableControlAction(0, 148, true);
        mp.game.controls.disableControlAction(0, 195, true);
        mp.game.controls.disableControlAction(0, 218, true);
        mp.game.controls.disableControlAction(0, 235, true);
    }
    try {
        if (mp.players.local.hascharachter) {
            const ratio = mp.game.graphics.getScreenAspectRatio(false).toFixed(2);
            if (ratiotocheck !== ratio) {
                ratiotocheck = ratio;
                switch (ratio) {
                    case "1.50":
                        showtransR = "3:2";
                        break;
                    case "1.33":
                        showtransR = "4:3";
                        break;
                    case "1.67":
                        showtransR = "5:3";
                        break;
                    case "1.25":
                        showtransR = "5:4";
                        break;
                    case "1.78":
                        showtransR = "16:9";
                        break;
                    case "1.60":
                        showtransR = "16:10";
                        break;
                    case "1.89":
                        showtransR = "17:9";
                        break;
                    case "2.33":
                        showtransR = "21:9";
                        break;
                }
            }
            const controls = mp.game.controls;
            controls.useDefaultVehicleEntering = false;
            const player = mp.players.local;
            const Vehicle = mp.players.local.vehicle;
            if (player.isInWater() !== inwater) {
                inwater = player.isInWater();
                mp.events.callRemote('SetInWater', Boolean(inwater));
            }
            if (player.getParachuteState() !== parachute) {
                parachute = player.getParachuteState();
                if (parachute == 0 || parachute == 1 || parachute == 2) {
                    mp.events.callRemote('SetFalling', Boolean(true));
                }
                else {
                    mp.events.callRemote('SetFalling', Boolean(false));
                    mp.events.call('sleepAH', 15);
                }
            }
            if (player.isFalling() !== isfalling) {
                isfalling = player.isFalling();
                mp.events.callRemote('SetFalling', Boolean(isfalling));
            }
            if (swim !== player.isSwimming()) {
                swim = player.isSwimming();
                mp.events.callRemote('SetSwimming', Boolean(swim));
            }
            if (typeof player.getVariable('Knasti') !== 'undefined' && player.getVariable('Knasti') !== null) {
                if (player.getVariable("Knasti")) {
                    mp.players.local.Prisoner = true;
                }
                else {
                    mp.players.local.Prisoner = false;
                }
            }
            if (player.getVariable("atwork")) {
                if (atwork !== true) {
                    atwork = true;
                }
            }
            else {
                if (atwork !== false) {
                    atwork = false;
                }
            }
            var cuffed = mp.players.local.getVariable("cuffed");
            if (mp.keys.isDown(87) && cuffed && new Date().getTime() - lastCuffUpdate >= 3500) {
                mp.events.callRemote("cuffupdate");
                lastCuffUpdate = new Date().getTime();
            }
            if (mp.keys.isDown(87) && new Date().getTime() - lastProofUpdate >= 3500) {
                lastProofUpdate = new Date().getTime();
                mp.players.local.setHelmet(false);
                mp.players.local.setProofs(false, true, true, false, false, true, true, true);
            }
            if (!(mp.players.local.handle !== 0)) {
                mp.players.local.forceStreamingUpdate();
            }
            if (player.getVariable("VOICE_RANGE") >= 0) {
                if (lastRange !== parseInt(player.getVariable('VOICE_RANGE'))) {
                    lastRange = parseInt(player.getVariable('VOICE_RANGE'));
                }
            }
            mp.game.player.setHealthRechargeMultiplier(0.0);
            if (!mp.players.local.hascharachter || mp.players.local.isDeath || modal) {
                controls.disableAllControlActions(32);
            }
            controls.disableControlAction(0, controlKeyIndex, true);
            controls.disableControlAction(0, 23, true);
            if (controls.isDisabledControlJustPressed(0, controlKeyIndex)) {
                if (mp.players.local.modalMenu || modal || mp.players.local.cursor) {
                    return;
                }
                else {
                    if (player.getVariable('animationData') && !player.vehicle && !mp.players.local.showPhone && !isCuffed) {
                        mp.events.call('noty', 'error', 'topLeft', 'Das geht so nicht! Animation?', 5000);
                        return;
                    }
                    if (!mp.players.local.modalMenu || !modal || !mp.players.local.menuOpen || !tabopp)
                        mp.events.call('pressgkey');
                }
            }
            if (controls.isDisabledControlJustPressed(0, 23)) {
                if (mp.players.local.modalMenu || modal || mp.players.local.cursor) {
                    return;
                }
                else {
                    if (mp.players.local.buckle && buckle) {
                        mp.events.call('blinkNoty', "~r~Du bist angeschnallt");
                    }
                    else if (mp.players.local.buckle && !buckle) {
                    }
                    else {
                        if (!mp.players.local.modalMenu || !modal || !mp.players.local.menuOpen || !tabopp) {
                            if (player.getVariable('animationData') && !player.vehicle && !mp.players.local.showPhone && !isCuffed) {
                                mp.events.call('noty', 'error', 'topLeft', 'Das geht so nicht! Animation?', 5000);
                                return;
                            }
                            mp.events.call('pressfkey');
                        }
                    }
                }
            }
            if (player.getVariable('animationData')) {
                mp.game.controls.disableControlAction(0, 24, true);
            }
            if (Vehicle && typeof Vehicle.getVariable('type') === 'number') {
                if (Vehicle.getVariable('type') !== 6) {
                    if (Vehicle) {
                        if (!mp.game.vehicle.isThisModelABicycle(Vehicle.model)) {
                            if (!Vehicle.getIsEngineRunning()) {
                                controls.disableControlAction(0, 32, true);
                                controls.disableControlAction(0, 33, true);
                                controls.disableControlAction(0, 71, true);
                                controls.disableControlAction(0, 72, true);
                                controls.disableControlAction(0, 77, true);
                                controls.disableControlAction(0, 78, true);
                                controls.disableControlAction(0, 87, true);
                                controls.disableControlAction(0, 88, true);
                                controls.disableControlAction(0, 129, true);
                                controls.disableControlAction(0, 136, true);
                                controls.disableControlAction(0, 150, true);
                            }
                            ;
                        }
                        if (Vehicle.getVariable("health")) {
                            if (Vehicle.getEngineHealth() != Vehicle.getBodyHealth() && Vehicle.getVariable("health") != Vehicle.getEngineHealth()) {
                                Vehicle.setEngineHealth(Number(Vehicle.getBodyHealth()));
                            }
                        }
                        if (isDriving) {
                            if (vehSeat === -1) {
                                if (typeof Vehicle.getVariable('tempomat') !== 'undefined' && Vehicle.getVariable('tempomat') !== null) {
                                    if (Vehicle.getVariable('tempomat')) {
                                        if (Tempolimit !== Vehicle.getVariable('tempomatspeed')) {
                                            const aspeed = parseInt((Vehicle.getSpeed() * 3.6).toFixed(0), 10);
                                            const lspeed = parseInt(Vehicle.getVariable('tempomatspeed'), 10);
                                            if (aspeed <= lspeed) {
                                                Tempolimit = parseInt(Vehicle.getVariable('tempomatspeed'));
                                                mp.events.call('setVehicleSpeed', Vehicle, Tempolimit);
                                            }
                                        }
                                    }
                                    else {
                                        const maxx = 290;
                                        if (Tempolimit !== maxx) {
                                            Tempolimit = maxx;
                                            mp.events.call('setVehicleSpeed', Vehicle, (maxx * 3.6).toFixed(0));
                                        }
                                    }
                                }
                            }
                        }
                        if (vehSeat === 0 || vehSeat === -1) {
                            if (Vehicle.getSpeed() > 5) {
                                isDriving = true;
                            }
                            else {
                                isDriving = false;
                            }
                        }
                        else {
                            isDriving = false;
                        }
                    }
                    else {
                        isDriving = false;
                    }
                }
            }
        }
    }
    catch (e) {
        mp.gui.chat.push("Main Render Error " + e);
    }
});
function setPedCharacter(ent) {
    if (ent.type === "player" && ent.handle !== 0) {
        try {
            if (ent.getVariable('CharacterStyleData') && JSON.parse(ent.getVariable("CharacterStyleData"))) {
                try {
                    if (ent.isModel(1885233650) || ent.isModel(-1667301416) || ent.model === 2627665880 || ent.model === 1885233650) {
                        const character = JSON.parse(ent.getVariable("CharacterStyleData"));
                        if (character) {
                            ent.setComponentVariation(2, character.Hair, 0, 2);
                            ent.setHairColor(character.HairColor, character.HairHighlightColor);
                            ent.setEyeColor(character.EyeColor);
                            ent.setHeadBlendData(parseInt(character.Mother), parseInt(character.Father), 0, parseInt(character.Mother), parseInt(character.Father), 0, parseFloat(character.shapeMix), parseFloat(character.skinMix), 0, true);
                            ent.setFaceFeature(0, character.NoseWidth);
                            ent.setFaceFeature(1, character.NoseBottomWidth);
                            ent.setFaceFeature(2, character.NoseTipLength);
                            ent.setFaceFeature(3, character.NoseBridgeDepth);
                            ent.setFaceFeature(4, character.NoseTipHeight);
                            ent.setFaceFeature(5, character.NoseBroken);
                            ent.setFaceFeature(6, character.BrowHeight);
                            ent.setFaceFeature(7, character.BrowDepth);
                            ent.setFaceFeature(8, character.CheekboneHeight);
                            ent.setFaceFeature(9, character.CheekboneWidth);
                            ent.setFaceFeature(10, character.CheekDepth);
                            ent.setFaceFeature(11, character.EyeSize);
                            ent.setFaceFeature(12, character.LipThickness);
                            ent.setFaceFeature(13, character.JawWidth);
                            ent.setFaceFeature(14, character.JawShape);
                            ent.setFaceFeature(15, character.ChinHeight);
                            ent.setFaceFeature(16, character.ChinDepth);
                            ent.setFaceFeature(17, character.ChinWidth);
                            ent.setFaceFeature(18, character.ChinIndent);
                            ent.setFaceFeature(19, character.NeckWidth);
                            ent.setHeadOverlay(0, character.Blemishes, character.BlemishesOpacity, 0, 0);
                            ent.setHeadOverlay(1, character.Facialhair, character.FacialHairOpacity, character.BeardColor, 0);
                            ent.setHeadOverlay(2, character.Eyebrows, character.EyebrowsOpacity, character.EyebrowColor, 0);
                            ent.setHeadOverlay(3, character.Ageing, character.AgeingOpacity, 0, 0);
                            ent.setHeadOverlay(4, character.Makeup, character.MakeupOpacity, 0, 0);
                            ent.setHeadOverlay(5, character.Blush, character.BlushOpacity, character.BlushColor, 0);
                            ent.setHeadOverlay(6, parseInt(character.Complexion), parseFloat(character.ComplexionOpacity), 0, 0);
                            ent.setHeadOverlay(7, character.Sundamage, character.SunDamageOpacity, 0, 0);
                            ent.setHeadOverlay(8, character.Lipstick, character.LipstickOpacity, character.LipstickColor, 0);
                            ent.setHeadOverlay(9, character.Freckles, character.FrecklesOpacity, 0, 0);
                            ent.setHeadOverlay(10, character.Chesthair, character.ChestHairOpacity, character.ChesthairColor, 0);
                            ent.setHeadOverlayColor(1, 1, character.BeardColor, character.FacialHairOpacity);
                            ent.setHeadOverlayColor(2, 1, character.EyebrowColor, character.EyebrowsOpacity);
                            ent.setHeadOverlayColor(5, 2, character.BlushColor, character.BlushOpacity);
                            ent.setHeadOverlayColor(8, 2, character.LipstickColor, character.LipstickOpacity);
                            ent.setHeadOverlayColor(10, 1, character.ChestHairColor, character.ChestHairOpacity);
                        }
                    }
                }
                catch (e) {
                    mp.console.logError(e, true, true);
                }
            }
        }
        catch (e) {
            mp.gui.chat.push(e);
        }
    }
}
mp.events.add('refreshhard', (player) => {
    setPedCharacter(player);
    if (player.getVariable('CharacterStyleData')) {
        try {
            const character = JSON.parse(player.getVariable("CharacterStyleData"));
            if (!character)
                return;
        }
        catch (e) {
            mp.console.logError(e, true, true);
        }
    }
});
function setWalkingStyle(player, style) {
    try {
        if (!style) {
            player.resetMovementClipset(0.0);
        }
        else {
            if (!mp.game.streaming.hasClipSetLoaded(style)) {
                mp.game.streaming.requestClipSet(style);
                while (!mp.game.streaming.hasClipSetLoaded(style)) {
                    mp.game.wait(0);
                }
            }
            player.setMovementClipset(style, 0.0);
        }
    }
    catch (_a) {
        player.resetMovementClipset(0.0);
    }
}
mp.events.add('playerSpawn', (player) => {
    mp.players.forEachInStreamRange((players, id) => {
        if (players.handle !== player.handle) {
            setPedCharacter(players);
        }
    });
    mp.storage.flush();
});
const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.15;
const loadClipSet = (clipSetName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mp.game.streaming.hasClipSetLoaded(clipSetName)) {
        mp.game.streaming.requestClipSet(clipSetName);
    }
});
try {
    loadClipSet(movementClipSet);
    loadClipSet(strafeClipSet);
}
catch (_a) { }
function setCrouching(player, crouch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (crouch) {
                player.setMovementClipset(movementClipSet, clipSetSwitchTime);
                player.setStrafeClipset(strafeClipSet);
            }
            else {
                player.resetMovementClipset(clipSetSwitchTime);
                player.resetStrafeClipset();
            }
        }
        catch (_a) {
            player.resetMovementClipset(clipSetSwitchTime);
            player.resetStrafeClipset();
        }
    });
}
mp.events.addDataHandler('WalkingStyle', (entity, value) => {
    if (entity.type !== 'player')
        return;
    if (value === null)
        return;
    if (typeof value === 'undefined')
        return;
    setWalkingStyle(entity, value);
});
mp.events.addDataHandler('isCrouched', (entity, value = null) => {
    if (entity.type !== 'player')
        return;
    if (value === null)
        return;
    if (typeof value === 'undefined')
        return;
    setCrouching(entity, value);
});
mp.events.addDataHandler('CharacterStyleData', (entity, value = '') => {
    if (entity.type !== 'player')
        return;
    if (value === '')
        return;
    try {
        setPedCharacter(entity);
    }
    catch (_a) { }
});
mp.events.addDataHandler('engine', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof value === 'undefined')
        return;
    if (typeof entity.getVariable('engine') !== 'undefined') {
        if (!value) {
        }
        else {
        }
        if (typeof entity.getVariable('light') !== 'undefined' && entity.getVariable('light') !== null) {
            if (entity.getVariable("light")) {
                entity.setLights(Number(entity.getVariable("light")));
            }
            else {
                entity.setLights(0);
            }
        }
        mp.events.callRemote('enginestate', entity, value);
    }
});
mp.events.addDataHandler('light', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof value === 'undefined')
        return;
    if (typeof entity.getVariable('light') !== 'undefined') {
        entity.setLights(value);
    }
});
mp.events.addDataHandler('_light', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof entity.getVariable('_light') !== 'undefined') {
        entity.setLights(value);
    }
});
mp.events.addDataHandler('window', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (typeof entity.getVariable('window') !== 'undefined') {
        WindowDown(entity, value);
    }
});
mp.events.addDataHandler('color1', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof entity.getVariable('color2') !== 'undefined') {
        entity.setColours(value, entity.getVariable('color2'));
    }
});
mp.events.addDataHandler('color2', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof entity.getVariable('color1') !== 'undefined') {
        entity.setColours(entity.getVariable('color1'), value);
    }
});
mp.events.addDataHandler('trunk', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (typeof entity.getVariable('trunk') !== 'undefined') {
        switch (value) {
            case false:
                entity.setDoorOpen(5, true, true);
                break;
            case true:
                entity.setDoorShut(5, false);
                break;
        }
    }
});
mp.events.addDataHandler('bonnet', (entity, value) => {
    if (entity.type !== 'vehicle')
        return;
    if (value === null)
        return;
    if (typeof entity.getVariable('bonnet') !== 'undefined') {
        switch (value) {
            case false:
                entity.setDoorOpen(4, true, true);
                break;
            case true:
                entity.setDoorShut(4, false);
                break;
        }
    }
});
mp.events.addDataHandler("IndicatorRight", (entity, value) => {
    if (entity.type === "vehicle")
        entity.setIndicatorLights(0, (value === null) ? false : value);
});
mp.events.addDataHandler("IndicatorLeft", (entity, value) => {
    if (entity.type === "vehicle")
        entity.setIndicatorLights(1, (value === null) ? false : value);
});
function SetNeonState(veh, state) {
    try {
        const vehicle = mp.vehicles.atHandle(veh.handle);
        if (vehicle && vehicle !== null) {
            for (let idx = 0; idx < 4; idx++) {
                vehicle.setNeonLightEnabled(idx, state);
            }
        }
    }
    catch (e) {
        mp.gui.chat.push(e);
    }
}
function SetNeonStateResync(veh, state) {
    try {
        if (veh && veh !== null) {
            for (let idx = 0; idx < 4; idx++) {
                veh.setNeonLightEnabled(idx, state);
            }
        }
    }
    catch (e) {
        mp.gui.chat.push(e);
    }
}
mp.events.addDataHandler("Neons", (entity, value) => {
    if (entity.type === "vehicle")
        SetNeonState(entity, (value === null) ? false : value);
});
function WindowDown(veh, up) {
    let y = 0;
    for (y = 1; y < 5; y++) {
        if (up) {
            veh.rollDownWindow(y - 1);
        }
        else {
            veh.fixWindow(y - 1);
            veh.rollUpWindow(y - 1);
        }
    }
}
let light = [0, 2, 3];
let last = 0, newLight;
const FunktionKeys = [243, 344, 199, 36];
const controls = mp.game.controls;
mp.events.add('render', () => {
    try {
        if (mp.players.local.hascharachter) {
            DisableControls(FunktionKeys);
            controls.disableControlAction(2, 140, true);
            if (player.isShooting()) {
                mp.events.callRemote('shotwith');
            }
            if (player.vehicle) {
                switch (newLight) {
                    case 0:
                        controls.enableControlAction(0, 74, true);
                        break;
                    case 2:
                        controls.enableControlAction(0, 74, true);
                        break;
                    case 3:
                        controls.disableControlAction(0, 74, true);
                        break;
                    case 4:
                        controls.enableControlAction(0, 74, false);
                        break;
                    default:
                        controls.disableControlAction(0, 74, true);
                        break;
                }
                if (controls.isDisabledControlJustPressed(0, 74)) {
                    mp.events.callRemote('Key_Trigger', 'H');
                    newLight = player.vehicle.getVariable('light');
                }
            }
        }
    }
    catch (e) {
        return;
    }
});
let firstSync = true;
mp.events.add("WalkingStyleReset", () => {
    mp.players.local.resetMovementClipset(0.0);
});
mp.events.addDataHandler("silentMode", (entity, value) => {
    if (entity.type === "vehicle") {
        entity.setSirenSound(value);
    }
});
mp.events.addDataHandler("sirene", (entity, value) => {
    if (entity.type === "vehicle") {
        entity.setSiren(value);
    }
});
mp.events.add("entityStreamIn", (entity) => {
    if (mp.players.local.hascharachter) {
        if (mp.players.local.dimension === entity.dimension)
            try {
                if (entity.type === 'ped') {
                    if (entity.pedid === 666) {
                        playDead(entity);
                    }
                }
                if (entity.type === "object") {
                    const collision = entity.getVariable("coll");
                    if (collision !== null) {
                        entity.setCollision(Boolean(collision), false);
                    }
                    const freeze = entity.getVariable("freeze");
                    if (freeze !== null) {
                        entity.freezePosition(Boolean(freeze));
                    }
                }
                if (entity.type === 'player') {
                    if (entity.getVariable('WalkingStyle')) {
                        setWalkingStyle(entity, entity.getVariable('WalkingStyle'));
                    }
                    else {
                        entity.resetMovementClipset(0.0);
                    }
                    if (typeof entity.getVariable('CharacterStyleData') !== 'undefined') {
                        if (entity.getVariable('CharacterStyleData')) {
                            setPedCharacter(entity);
                        }
                    }
                    if (typeof entity.getVariable('animationData') !== 'undefined') {
                        try {
                            const data = JSON.parse(entity.getVariable('animationData'));
                            if (typeof parseInt(data["AnimationFlag"]) !== 'undefined') {
                                if (!mp.game.streaming.hasAnimDictLoaded(data["Dict"])) {
                                    mp.game.streaming.requestAnimDict(data["Dict"]);
                                }
                                if (firstSync) {
                                    setTimeout(() => {
                                        entity.taskPlayAnim(data["Dict"], data["Animation"], 1.0, -1.0, -1, parseInt(data["AnimationFlag"]), 1, true, true, true);
                                        firstSync = false;
                                    }, 500);
                                }
                                else {
                                    entity.taskPlayAnim(data["Dict"], data["Animation"], 1.0, -1.0, -1, parseInt(data["AnimationFlag"]), 1, true, true, true);
                                }
                            }
                        }
                        catch (e) {
                            mp.gui.chat.push(e);
                        }
                    }
                    if (entity.getVariable("isCrouched")) {
                        try {
                            setCrouching(entity, entity.getVariable("isCrouched"));
                        }
                        catch (_a) {
                            setCrouching(entity, false);
                        }
                    }
                    if (entity.getVariable('CreateItem')) {
                        mp.events.callRemote('SyncObjEntityIn', entity);
                    }
                }
                if (entity.type === 'vehicle') {
                    if (typeof entity.getVariable('engine') !== 'undefined' && entity.getVariable('engine') !== null) {
                        if (!entity.getVariable('engine')) {
                            if (entity.getVariable("light")) {
                                entity.setLights(Number(entity.getVariable("light")));
                            }
                            else {
                            }
                        }
                        else {
                            if (entity.getVariable("light")) {
                                entity.setLights(Number(entity.getVariable("light")));
                            }
                            else {
                            }
                        }
                    }
                    if (entity.getVariable("health")) {
                        if (entity.getEngineHealth() != entity.getVariable("health")) {
                            entity.setEngineHealth(Number(entity.getVariable("health")));
                            entity.setBodyHealth(Number(entity.getVariable("health")));
                        }
                    }
                    if (typeof entity.getVariable('light') !== 'undefined' && entity.getVariable('light') !== null) {
                        if (entity.getVariable("light")) {
                            entity.setLights(Number(entity.getVariable("light")));
                        }
                        else {
                        }
                    }
                    if (!entity.getVariable('Neons')) {
                        SetNeonStateResync(entity, false);
                    }
                    else {
                        SetNeonStateResync(entity, true);
                    }
                    if (entity.type === 'vehicle' && entity.getClass() === 18 && entity.hasVariable('silentMode'))
                        entity.getVariable('silentMode') ? entity.setSirenSound(true) : entity.setSirenSound(false);
                    if (entity.type === 'vehicle' && entity.getClass() === 18 && entity.hasVariable('sirene'))
                        entity.getVariable('sirene') ? entity.setSiren(true) : entity.setSiren(false);
                    if (typeof entity.getVariable('locked') !== 'undefined' && entity.getVariable('locked') !== null) {
                        switch (entity.getVariable('locked')) {
                            case false:
                                entity.locked = false;
                                break;
                            case true:
                                entity.locked = true;
                                break;
                        }
                    }
                    if (entity.hasVariable("IndicatorRight") && entity.hasVariable("IndicatorRight") !== null) {
                        entity.setIndicatorLights(0, entity.getVariable("IndicatorRight"));
                    }
                    if (entity.hasVariable("IndicatorLeft") && entity.hasVariable("IndicatorLeft") !== null) {
                        entity.setIndicatorLights(1, entity.getVariable("IndicatorLeft"));
                    }
                }
            }
            catch (e) {
                mp.gui.chat.push(e);
            }
    }
});
mp.events.add("updateDirt", (vehicle, lvl = 0) => {
    vehicle.setDirtLevel(lvl);
    vehicle.clearLastDamage();
});
let TempBlips = new Array();
let TempMarkers = new Array();
let JobBlips = new Array();
let JobMarker = new Array();
let Dispatches = new Array();
let TempDispatches = new Array();
let Areas = new Array();
let DefaultBlips = new Array();
mp.events.add('gotowaypoint', () => {
    teleport2();
});
mp.events.add('createWayPoint', (x, y) => {
    mp.game.ui.setNewWaypoint(x, y);
});
mp.events.add('createJobPoint', (position, color, type, r, g, b, a, blipid = 480, markerSet = true) => {
    const blip = mp.blips.new(blipid, position, {
        name: "Ziel",
        scale: 0.75,
        color: color,
        alpha: 255,
        shortRange: false,
        rotation: 0,
        dimension: 0
    });
    blip.setRouteColour(color);
    blip.setRoute(true);
    JobBlips.push(blip);
    if (markerSet) {
        const marker = mp.markers.new(type, position, 1, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [r, g, b, a],
            visible: true,
            dimension: -1
        });
        JobMarker.push(marker);
    }
});
mp.events.add('removeJobPoint', () => {
    deleteJobMarkers();
    deleteJobBlips();
});
mp.events.add('createBlipWayPointColor', (x, y, color) => {
    mp.game.ui.setNewWaypoint(x, y);
    const blip = mp.blips.new(0, new mp.Vector3(x, y, 0), {
        scale: 0.75,
        color: color,
        alpha: 255,
        shortRange: true,
        rotation: 0,
        dimension: 0
    });
    blip.setRouteColour(color);
    blip.setRoute(true);
    TempBlips.push(blip);
});
mp.events.add('createBlip', (x, y, color) => {
    const blip = mp.blips.new(0, new mp.Vector3(x, y, 0), {
        scale: 0.75,
        color: color,
        alpha: 255,
        shortRange: true,
        rotation: 0,
        dimension: 0
    });
    blip.setRouteColour(color);
    blip.setRoute(true);
    TempBlips.push(blip);
});
mp.events.add('cleanBlips', () => {
    deleteAllDefaultBlips();
});
mp.events.add('pushBlip', (sprite, position, Name, color, alpha) => {
    const blip = mp.blips.new(sprite, position, {
        name: Name,
        scale: 0.75,
        color: color,
        alpha: alpha,
        shortRange: true,
        rotation: 0,
        dimension: 0
    });
    DefaultBlips.push(blip);
    mp.gui.chat.push("BlipNaME: " + Name);
});
mp.events.add('removeblips', () => {
    deleteAllBlips();
});
mp.events.add('createMarker', (type, position, r, g, b, a) => {
    const marker = mp.markers.new(type, position, 1, {
        direction: new mp.Vector3(0, 0, 0),
        rotation: new mp.Vector3(0, 0, 0),
        color: [r, g, b, a],
        visible: true,
        dimension: -1
    });
    TempMarkers.push(marker);
});
let size = 3.0;
let markerActive = false;
mp.events.add('createMarkerS', (state, markersize) => {
    markerActive = state;
    size = markersize;
});
const newversion = typeof mp.game1 !== 'undefined';
mp.events.add('render', () => {
    const pos = mp.players.local.position;
    const vehicle = mp.players.local.vehicle;
    if (markerActive) {
        let newZ = pos.z - 0.90;
        if (vehicle)
            newZ = pos.z;
        if (newversion) {
            mp.game.graphics.drawMarker(1, pos.x, pos.y, newZ, 0, 0, 0, 0, 0, 180, size * 2, size * 2, 0.50, 72, 209, 204, 85, false, false, 2, false, null, null, false);
        }
        else {
            mp.game1.graphics.drawMarker(1, pos.x, pos.y, newZ, 0, 0, 0, 0, 0, 180, size * 2, size * 2, 0.50, 72, 209, 204, 85, false, false, 2, false, "", "", false);
        }
    }
});
mp.events.add('removemarkers', () => {
    deleteAllMarkers();
});
mp.events.add('addDispatch', (sprite, position, name, color, shortRange, dispatchid) => {
    let allready = false;
    Dispatches.forEach(function (blip) {
        if (blip != null) {
            if (blip.dispatchid == dispatchid) {
                allready = true;
            }
        }
    });
    if (allready)
        return;
    const blip = mp.blips.new(sprite, position, {
        name: name,
        scale: 0.85,
        color: color,
        alpha: 255,
        shortRange: shortRange,
        dimension: -1,
    });
    blip.dispatchid = dispatchid;
    Dispatches.push(blip);
});
mp.events.add('removeDispatch', (dispatchid) => {
    Dispatches.forEach(function (blip) {
        if (blip != null) {
            if (blip.dispatchid == dispatchid) {
                mp.game.ui.removeBlip(blip.handle);
                let index = Dispatches.indexOf(blip);
                if (index > -1) {
                    Dispatches.splice(index, 1);
                }
            }
        }
    });
});
mp.events.add('updateDispatch', (dispatchid) => {
    Dispatches.forEach(function (blip) {
        if (blip != null) {
            if (blip.dispatchid == dispatchid) {
                blip.color = 25;
            }
        }
    });
});
mp.events.add('addTempDispatch', (sprite, position, name, color, shortRange, dispatchid) => {
    TempDispatches.forEach(function (blip) {
        if (blip !== null) {
            if (blip.dispatchid === dispatchid) {
                mp.events.call('removeTempDispatch', dispatchid);
            }
        }
    });
    const blip = mp.blips.new(sprite, position, {
        name: name,
        scale: 0.85,
        color: color,
        alpha: 255,
        shortRange: shortRange,
        dimension: -1,
    });
    blip.dispatchid = dispatchid;
    TempDispatches.push(blip);
});
mp.events.add('removeTempDispatch', (dispatchid) => {
    TempDispatches.forEach(function (blip) {
        if (blip !== null) {
            if (blip.dispatchid === dispatchid) {
                mp.game.ui.removeBlip(blip.handle);
                const index = Dispatches.indexOf(blip);
                if (index > -1) {
                    TempDispatches.splice(index, 1);
                }
            }
        }
    });
});
mp.events.add('removeAllTempDispatches', () => {
    TempDispatches.forEach(function (blip) {
        if (blip !== null) {
            mp.game.ui.removeBlip(blip.handle);
        }
    });
});
mp.events.add('addArea', (sprite, position, radius, color, areaid) => {
    let allready = false;
    Areas.forEach(function (blip) {
        if (blip.blip != null) {
            if (blip.aid == areaid) {
                allready = true;
            }
        }
    });
    if (allready)
        return;
    let area = mp.game.ui.addBlipForRadius(position.x, position.y, position.z, radius);
    mp.game.invoke("0xDF735600A4696DAF", area, sprite);
    mp.game.invoke("0x03D7FB09E75D6B7E", area, color);
    mp.game.invoke("0x45FF974EEE1C8734", area, 100);
    Areas.push({ aid: areaid, blip: area });
});
mp.events.add('AddAreaW', (sprite, color, radius, factionid) => {
    const wp = getWaypointCoord();
    if (wp) {
        mp.events.callRemote('AddArea', wp.x, wp.y, wp.z, radius, factionid, sprite, color);
    }
    else {
        return mp.game.graphics.notify('Du musst zuerst einen Wegpunkt setzten!');
    }
});
mp.events.add('removeArea', (areaid) => {
    Areas.forEach(function (blip) {
        if (blip.blip !== null) {
            if (blip.aid === areaid) {
                mp.game.ui.removeBlip(blip.blip);
                const index = Areas.indexOf(blip);
                if (index > -1) {
                    Areas.splice(index, 1);
                }
            }
        }
    });
});
mp.events.add('removeAreas', () => {
    deleteAllAreas();
});
function deleteJobBlips() {
    JobBlips.forEach(function (blip) {
        if (blip != null) {
            blip.destroy();
        }
    });
    JobBlips = new Array();
}
function deleteJobMarkers() {
    JobMarker.forEach(function (marker) {
        if (marker != null) {
            marker.destroy();
        }
    });
    JobMarker = new Array();
}
function deleteAllMarkers() {
    TempMarkers.forEach(function (marker) {
        if (marker != null) {
            marker.destroy();
        }
    });
    TempMarkers = new Array();
}
function deleteAllAreas() {
    Areas.forEach(function (blip) {
        if (blip.blip != null) {
            mp.game.ui.removeBlip(blip.blip);
        }
    });
    Areas = new Array();
}
function deleteAllBlips() {
    TempBlips.forEach(function (blip) {
        if (blip != null) {
            blip.destroy();
        }
    });
    TempBlips = new Array();
}
function deleteAllDefaultBlips() {
    DefaultBlips.forEach(function (blip) {
        if (blip != null) {
            blip.destroy();
        }
    });
    DefaultBlips = new Array();
}
function getWaypointCoord() {
    try {
        const blip = mp.game.invoke('0x1BEDE233E6CD2A1F', 8);
        const blipExist = mp.game.invoke('0xA6DB27D19ECBB7DA', blip);
        if (blipExist) {
            return mp.game.ui.getBlipInfoIdCoord(blip);
        }
    }
    catch (e) {
        mp.gui.chat.push(e);
    }
    return null;
}
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}
function teleport2() {
    return __awaiter(this, void 0, void 0, function* () {
        const waypoint = getWaypointCoord();
        if (waypoint) {
            const lastpos = mp.players.local.position;
            const vehicle = mp.players.local.vehicle;
            let found, z;
            for (let newz = 950; newz >= 0; newz -= 25) {
                z = newz;
                if (newz % 2 != 0)
                    z = 950 - newz;
                mp.game.streaming.requestCollisionAtCoord(waypoint.x, waypoint.y, z);
                while (!mp.players.local.hasCollisionLoadedAround()) {
                    yield mp.game.waitAsync(0);
                }
                mp.players.local.position = new mp.Vector3(waypoint.x, waypoint.y, z);
                found = mp.game.gameplay.getGroundZFor3dCoord(waypoint.x, waypoint.y, z, 850, false);
                if (found) {
                    if (vehicle) {
                        mp.events.callRemote('teleporter', waypoint.x, waypoint.y, found);
                    }
                    else {
                        mp.events.callRemote('teleporter', waypoint.x, waypoint.y, found);
                    }
                    break;
                }
            }
            if (!found) {
                mp.game.graphics.notify("~r~Der Teleport Hat nicht Funktioniert, try Again with a other Waypoint");
                mp.players.local.position = new mp.Vector3(lastpos.x, lastpos.y, lastpos.z);
            }
            ;
        }
    });
}
mp.events.add('setWeather', (WeatherString) => {
    if (typeof mp.players.local.getVariable('intern') !== 'undefined' && mp.players.local.getVariable('intern') !== null) {
        if (mp.players.local.getVariable('intern') === true) {
            mp.game.gameplay.setWeatherTypeNow(WeatherString);
            mp.game.time.setClockTime(12, 15, 0);
        }
        else {
            mp.game.gameplay.setWeatherTypeOverTime(WeatherString, 30);
        }
    }
    else {
        mp.game.gameplay.setWeatherTypeOverTime(WeatherString, 30);
    }
});
mp.events.add('setWeatherN', (WeatherString) => {
    mp.game.gameplay.setWeatherTypePersist(WeatherString);
    mp.game.gameplay.setWeatherTypeNowPersist(WeatherString);
    mp.game.gameplay.setWeatherTypeNow(WeatherString);
});
mp.events.add('SetPlayerInteriorData', (type, hour, minute, weather) => {
    if (type === "interior") {
        mp.game.gameplay.setWeatherTypeNow(weather);
        mp.game.time.setClockTime(hour, minute, 0);
    }
    else {
        mp.game.gameplay.setWeatherTypeTransition(weather, weather, 0.0);
        mp.game.time.setClockTime(hour, minute, 0);
    }
});
mp.events.add('interiorPreload', (Position, time) => {
    mp.game.cam.doScreenFadeOut(0);
    mp.game.streaming.setFocusArea(Position.x, Position.y, Position.z, 0, 0, 0);
    setTimeout(() => {
        mp.game.invoke("0x31B73D1EA9F01DA2");
        mp.game.cam.doScreenFadeIn(500);
    }, time);
});
mp.keys.bind(bindKeys.KEY_E, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle)
        return;
    mp.events.callRemote('ev', "HouseInteract");
    mp.events.callRemote('ev', "HouseLeave");
});
mp.keys.bind(bindKeys.KEY_M, false, function () {
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || mp.players.local.vehicle)
        return;
    mp.events.callRemote('ev', "HouseMenu");
});
let Native = {
    SET_ENTITY_ALPHA: '0x44A0870B7E92D7C0',
    RESET_ENTITY_ALPHA: '0x9B1E824FFBB7027A',
    GET_ENTITY_MODEL: '0x9F47B058362C84B5',
    GET_ENTITY_TYPE: '0x8ACD366038D14505',
    GET_ENTITY_COORDS: '0x3FEF770D40960D5A',
    GET_ENTITY_ROTATION: '0xAFBD61CC738D9EB9',
    GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS: '0x1899F328B0E12848 ',
    GET_OFFSET_FROM_ENTITY_GIVEN_WORLD_COORDS: '0x2274BC1C4885E333',
};
const proxyNative = new Proxy(Native, {
    get: (target, name, receiver) => Native[name][0]
});
const objData = [
    "prop_vend_soda_02",
    "prop_vend_soda_01",
    "prop_vend_fags_01",
    "prop_watercooler",
    "prop_vend_coffe_01",
    "prop_vend_snak_01_tu",
    "prop_vend_snak_01",
    "prop_atm_01",
    "prop_atm_02",
    "prop_atm_03",
    "prop_fleeca_atm",
    "prop_gas_pump_1a",
    "prop_gas_pump_1d",
    "prop_gas_pump_1b",
    "prop_gas_pump_1c",
    "prop_gas_pump_old2",
    "prop_gas_pump_old3",
    "prop_vintage_pump",
    "prop_beach_parasol_01",
    "prop_beach_parasol_02",
    "prop_beach_parasol_03",
    "prop_beach_parasol_04",
    "prop_beach_parasol_05",
    "prop_beach_parasol_06",
    "prop_beach_parasol_07",
    "prop_beach_parasol_08",
    "prop_beach_parasol_10",
    "prop_cs_beachtowel_01",
    "prop_parasol_04",
    "prop_parasol_04b",
    "prop_parasol_04c",
    "prop_parasol_04e",
    "prop_parasol_bh_48",
    "prop_patio_lounger1b",
    "prop_patio_lounger_3",
    "prop_mp_cone_01",
    "prop_mp_cone_02",
    "prop_mp_cone_03",
    "prop_parking_sign_1",
    "prop_parking_sign_2",
    "prop_phonebox_05a",
    "prop_toolchest_01",
    "prop_patio_heater_01",
    "prop_wall_light_15a",
    "prop_worklight_02a",
    "prop_worklight_03a",
    "prop_worklight_03b",
    "prop_worklight_04b",
    "prop_worklight_04c",
    "prop_worklight_04d",
    "vfx_it1_07",
    "prop_06_sig1_d",
    "prop_air_conelight",
    "prop_barrier_work01a",
    "prop_barrier_work01b",
    "prop_barrier_work01c",
    "prop_barrier_work01d",
    "prop_barrier_work02a",
    "prop_barrier_work04a",
    "prop_barrier_work05",
    "prop_barrier_work06a",
    "prop_barrier_work06b",
    "prop_consign_01a",
    "prop_consign_02a",
    "prop_sign_road_01a",
    "prop_sign_road_01b",
    "prop_sign_road_02a",
    "prop_sign_road_03a",
    "prop_sign_road_03s",
    "prop_trafficdiv_01",
    "prop_trafficdiv_02",
    "lts_prop_lts_elecbox_24",
    "v_corp_hicksdoor"
];
let editorStart = false;
let editorState = 0;
let editorCamera = null;
let editorFocusObject = null;
let isFocusObjectAlreadyCreated = false;
let editorTransparencySelect = 200;
let editorObjects = [];
let undoEditorObjects = [];
let redoEditorObjects = [];
let controlModifier = false;
let shiftModifier = false;
let editorAxisWidth = 3;
let editorXAxisColor = [255, 0, 0, 255];
let editorYAxisColor = [0, 255, 0, 255];
let editorZAxisColor = [0, 0, 255, 255];
let editorXMovColor = [255, 0, 0, 255];
let editorYMovColor = [0, 255, 0, 255];
let editorZMovColor = [0, 0, 255, 255];
let editorXAxisMarkerObj = null;
let editorYAxisMarkerObj = null;
let editorZAxisMarkerObj = null;
let editorXMovMarkerObj = null;
let editorYMovMarkerObj = null;
let editorZMovMarkerObj = null;
let editorXAxisActive = false;
let editorYAxisActive = false;
let editorZAxisActive = false;
let editorXMovActive = false;
let editorYMovActive = false;
let editorZMovActive = false;
let editorAxisMemoryPosition = new mp.Vector3(0, 0, 0);
let IndexMem = 0;
let LODDist = 65535;
let ToggleArrowKeyMovement = true;
let AxisMem = 0;
let editorFocusObjectCollision = true;
let editorFocusObjectFreeze = true;
let editorDragMode = false;
let sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
let scInst = 0;
function AddInstructionalStart() {
    scInst = 0;
    mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
function AddInstructionalButton(text, button) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}
function AddInstructionalButtonCustom(text, button) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}
function AddInstructionalEnd(type) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(192);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(57);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(43);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(65);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
function GetCameraHitCoord() {
    let position = editorCamera.getCoord();
    let direction = editorCamera.getDirection();
    let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
    let dd = screen2dToWorld3d(position.x, position.y);
    let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local.handle, -1);
    if (hitData != undefined) {
        return dd;
    }
    return null;
}
function GetCameraHitCoordObjs(nonragemp = false) {
    return null;
    let position = editorCamera.getCoord();
    let direction = editorCamera.getDirection();
    let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
    let dd = screen2dToWorld3d(position.x, position.y);
    let hitData = null;
    hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local.handle, 16);
    if (hitData !== undefined) {
        if (!nonragemp) {
            if (IsObjectSpawned(hitData.entity) || IsAnAxisObject(hitData.entity))
                return hitData;
        }
        else {
            return dd;
        }
    }
    return null;
}
function IsAnAxisObject(obj) {
    if (obj === editorXAxisMarkerObj)
        return true;
    else if (obj === editorYAxisMarkerObj)
        return true;
    else if (obj === editorZAxisMarkerObj)
        return true;
    else if (obj === editorXMovMarkerObj)
        return true;
    else if (obj === editorYMovMarkerObj)
        return true;
    else if (obj === editorZMovMarkerObj)
        return true;
    return false;
}
function ObjectNotNull(obj) {
    if (obj === null)
        return false;
    if (!mp.objects.exists(obj))
        return false;
    return true;
}
function ClampValue(number, min, max) {
    return number <= min ? min : number >= max ? max : number;
}
function GetDotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
function GetVectorLength(v1) {
    return Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
}
function GetAngleBetweenTwoVectors(v1, v2) {
    return Math.acos(GetDotProduct(GetNormalizedVector(v1), GetNormalizedVector(v2)));
}
function DestroyAxisMarkerObjs() {
    if (ObjectNotNull(editorXAxisMarkerObj))
        editorXAxisMarkerObj.destroy();
    if (ObjectNotNull(editorYAxisMarkerObj))
        editorYAxisMarkerObj.destroy();
    if (ObjectNotNull(editorZAxisMarkerObj))
        editorZAxisMarkerObj.destroy();
    editorXAxisMarkerObj = null;
    editorYAxisMarkerObj = null;
    editorZAxisMarkerObj = null;
}
function CreateFocusObject(hash = null) {
    return __awaiter(this, void 0, void 0, function* () {
        DestroyFocusObject();
        if (hash == null) {
            let oldIndex = IndexMem;
            while (!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem]))) {
                if (IndexMem >= objData.length)
                    IndexMem = 0;
                IndexMem++;
            }
            if (oldIndex !== IndexMem) {
                mp.gui.chat.push("Index adjusted to " + IndexMem + " due to object error.");
            }
            mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem]));
            let i = 0;
            for (i = 0; i < 10; i++) {
                if (IndexMem + i < objData.length) {
                    mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem + i]));
                }
                if (IndexMem - i >= 0) {
                    mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem - i]));
                }
            }
            while (!mp.game.streaming.hasModelLoaded(mp.game.joaat(objData[IndexMem]))) {
                PrepareClientView();
                yield mp.game.waitAsync(0);
            }
            editorFocusObject = mp.objects.new(mp.game.joaat(objData[IndexMem]), mp.players.local.position);
            editorFocusObject.cmapcoll = true;
            editorFocusObject.cmapfreeze = true;
            editorFocusObject.setLodDist(LODDist);
            editorFocusObject.freezePosition(true);
            editorFocusObject.setCollision(false, false);
        }
        else {
            if (mp.game.streaming.isModelInCdimage(hash) && mp.game.streaming.isModelValid(hash)) {
                mp.game.streaming.requestModel(hash);
                while (!mp.game.streaming.hasModelLoaded(hash)) {
                    PrepareClientView();
                    yield mp.game.waitAsync(0);
                }
                editorFocusObject = mp.objects.new(hash, mp.players.local.position);
                editorFocusObject.cmapcoll = true;
                editorFocusObject.cmapfreeze = true;
                editorFocusObject.setLodDist(LODDist);
                editorFocusObject.freezePosition(true);
                editorFocusObject.setCollision(false, false);
            }
            else {
                mp.gui.chat.push("Invalid Hash");
            }
        }
    });
}
function DestroyFocusObject() {
    if (editorFocusObject != null) {
        if (mp.objects.exists(editorFocusObject))
            editorFocusObject.destroy();
    }
    editorFocusObject = null;
}
function IsObjectSpawned(obj) {
    if (obj == null)
        return false;
    let i = 0;
    for (i = 0; i < editorObjects.length; i++) {
        if (editorObjects[i] == obj)
            return true;
    }
    return false;
}
let timer = null;
clearInterval(timer);
function StartMapEditor() {
    editorCamera = mp.cameras.new('default', new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z), mp.game.cam.getGameplayCamRot(2), 45);
    editorCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    mp.players.local.freezePosition(true);
    mp.players.local.setInvincible(true);
    mp.players.local.setVisible(false, false);
    mp.players.local.setCollision(false, false);
    mp.events.callRemote('inv', true);
    editorAxisMemoryPosition = mp.players.local.position;
    editorState = 0;
}
function EndMapEditor() {
    clearInterval(timer);
    if (editorCamera !== null) {
        mp.players.local.position = editorCamera.getCoord();
        mp.players.local.setHeading(editorCamera.getRot(2).z);
        editorCamera.destroy(true);
        editorCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.freezePosition(false);
    mp.players.local.setInvincible(false);
    mp.players.local.setVisible(true, false);
    mp.players.local.setCollision(true, false);
    mp.events.callRemote('inv', false);
}
mp.events.add('StartEditor', () => {
    editorStart = !editorStart;
    if (chat)
        return;
    if (editorStart) {
        StartMapEditor();
    }
    else {
        EndMapEditor();
    }
});
let chat = false;
let timerStopped = true;
let chatTimr = null;
let memObj = null;
function PrepareClientView() {
    let disabledControls = [14, 15, 16, 17, 12, 13, 37, 261, 262, 241, 242];
    DisableControlActions(disabledControls);
    if (hudVis)
        mp.game.ui.showHudComponentThisFrame(14);
}
function DisableControlActions(array) {
    for (let control of array) {
        mp.game.controls.disableControlAction(0, control, true);
    }
}
function HideHudElements(array) {
    for (let element of array) {
        mp.game.ui.hideHudComponentThisFrame(element);
    }
}
mp.events.add('render', () => {
    if (!editorStart)
        return;
    if (chat)
        return;
    if (modal)
        return;
    PrepareClientView();
    if (mp.keys.isDown(17)) {
        controlModifier = true;
    }
    else {
        controlModifier = false;
    }
    if (mp.keys.isDown(16)) {
        shiftModifier = true;
    }
    else {
        shiftModifier = false;
    }
    const rot = editorCamera.getRot(2);
    const pos = editorCamera.getCoord();
    const hitData2 = GetCameraHitCoordObjs(true);
    let pp = new mp.Vector3(0, 0, 0);
    if (hitData2 !== null) {
        try {
            pp = hitData2.position;
        }
        catch (_a) {
        }
    }
    if (hudVis) {
        mp.game.graphics.drawText(`Cam Pos: x: ${round(pos.x, 3)} y: ${round(pos.y, 3)} z: ${round(pos.z, 3)}\nCam Rotation:  x: ${round(rot.x, 3)} y: ${round(rot.y, 3)} z: ${round(rot.z, 3)}`, [0.5, 0.005], {
            font: 7,
            color: [255, 255, 255, 200],
            scale: [0.35, 0.35],
            outline: true,
            centre: true
        });
    }
    if (editorState === 0) {
        mp.game.ui.setTextFont(7);
        mp.game.ui.setTextEntry2("STRING");
        if (memObj !== null) {
            let handle = memObj;
            let model = mp.game.invoke(Native.GET_ENTITY_MODEL, handle);
            if (model === 0 && memObj !== null) {
                handle = memObj.handle;
                model = mp.game.invoke(Native.GET_ENTITY_MODEL, handle);
            }
            let type = mp.game.invoke(Native.GET_ENTITY_TYPE, handle);
            let point = null;
            const hitData = GetCameraHitCoordObjs(true);
            if (hitData != null) {
                point = "x: ~b~" + round(hitData.position.x - 0.00005, 3) + " ~s~y:~b~ " + round(hitData.position.y - 0.00005, 3) + " ~s~z:~b~ " + round(hitData.position.z - 0.00005, 3) + "~s~";
            }
            if (model === handle) {
            }
            else {
                if (hudVis) {
                    mp.game.ui.addTextComponentSubstringPlayerName(" Model:~g~ " + model + "~s~ Punkt: " + point + " Type: ~r~" + type);
                }
            }
        }
        else {
            if (hudVis) {
            }
        }
        mp.game.ui.drawSubtitleTimed(1, true);
        let newObj = GetCameraHitCoordObjs(true);
        if (newObj == null) {
            if (memObj != null) {
                editorFocusObject = null;
                memObj = null;
            }
        }
        else {
            memObj = newObj.entity;
            if (memObj.handle != null) {
            }
            else {
            }
        }
    }
    else {
        if (editorFocusObject === null)
            CreateFocusObject();
        if (editorState == 1) {
            mp.game.ui.setTextFont(7);
            mp.game.ui.setTextEntry2("STRING");
            mp.game.ui.addTextComponentSubstringPlayerName("Index: " + IndexMem + " -> " + objData[IndexMem]);
            mp.game.ui.drawSubtitleTimed(1, true);
            let drawObj = GetCameraHitCoord();
            if (drawObj != null) {
                if (mp.game.controls.isDisabledControlJustReleased(0, 22)) {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + 90, 2, true);
                    AxisMem += 90;
                }
                if (mp.game.controls.isDisabledControlJustReleased(0, 24)) {
                    editorFocusObject.setCollision(true, false);
                    editorFocusObject.cmapcoll = editorFocusObjectCollision;
                    editorFocusObject.cmapfreeze = editorFocusObjectFreeze;
                    let pos = editorFocusObject.getCoords(true);
                    let rot = editorFocusObject.getRotation(2);
                    editorObjects.push(editorFocusObject);
                    editorFocusObjectCollision = true;
                    editorFocusObjectFreeze = true;
                    editorFocusObject = null;
                    CreateFocusObject();
                    AxisMem = 0;
                }
                let height = editorFocusObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
                drawObj.position.z += height / 2;
                editorFocusObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, drawObj.position.z, false, false, false);
                let curRot = editorFocusObject.getRotation(2);
                if (mp.game.controls.isControlPressed(0, 25)) {
                    editorFocusObject.placeOnGroundProperly();
                }
                else {
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z, 2, true);
                }
                editorAxisMemoryPosition = drawObj.position;
            }
        }
        else {
            let colvar = editorFocusObject.cmapcoll;
            let frzvar = editorFocusObject.cmapfreeze;
            AddInstructionalStart();
            AddInstructionalButtonCustom("Placeholder", "w_1337");
            AddInstructionalButtonCustom("Auswahl Mode", "t_1");
            if (colvar != null) {
                if (colvar)
                    AddInstructionalButtonCustom("Kollision: An", "t_C");
                else
                    AddInstructionalButtonCustom("Kollision: Aus", "t_C");
            }
            else {
                AddInstructionalButtonCustom("Kollision: An", "t_C");
            }
            if (frzvar != null) {
                if (frzvar)
                    AddInstructionalButtonCustom("Frozen: An", "t_F");
                else
                    AddInstructionalButtonCustom("Frozen: Aus", "t_F");
            }
            else {
                AddInstructionalButtonCustom("Frozen: An", "t_F");
            }
            if (ToggleArrowKeyMovement) {
                AddInstructionalButtonCustom("Nach Oben Bewegen", "w_P-Up");
                AddInstructionalButtonCustom("Nach unten Bewegen", "w_P-Down");
                AddInstructionalButton("Vorwärts Bewegen", 194);
                AddInstructionalButton("Rückwärts Bewegen", 195);
                AddInstructionalButton("Nach Links Bewegen", 196);
                AddInstructionalButton("Nach Rechts Bewegen", 197);
            }
            else {
                AddInstructionalButtonCustom("Rotate Aufwärts", "w_P-Up");
                AddInstructionalButtonCustom("Rotate Abwärts", "w_P-Down");
                AddInstructionalButton("Rotate Vorwärts", 194);
                AddInstructionalButton("Rotate Rückwärts", 195);
                AddInstructionalButton("Rotate Links", 196);
                AddInstructionalButton("Rotate Rechts", 197);
            }
            AddInstructionalButtonCustom("Pfeil Tasten Toggle", "w_Space");
            AddInstructionalEnd(1);
            if (ToggleArrowKeyMovement) {
            }
            else {
            }
            let drawObj = GetCameraHitCoordObjs();
            if (mp.game.controls.isControlPressed(0, 24)) {
                editorDragMode = true;
            }
            else if (mp.game.controls.isControlJustReleased(0, 24)) {
                editorDragMode = false;
            }
            if (!editorDragMode) {
                if (drawObj != null) {
                    if (drawObj.entity == editorXAxisMarkerObj) {
                        editorXAxisColor = [255, 255, 0, 255];
                        editorXAxisActive = true;
                        editorYAxisActive = false;
                        editorZAxisActive = false;
                        editorXMovActive = false;
                        editorYMovActive = false;
                        editorZMovActive = false;
                    }
                    else {
                        editorXAxisColor = [255, 0, 0, 255];
                        editorXAxisActive = false;
                    }
                    if (drawObj.entity == editorYAxisMarkerObj) {
                        editorYAxisColor = [255, 255, 0, 255];
                        editorXAxisActive = false;
                        editorYAxisActive = true;
                        editorZAxisActive = false;
                        editorXMovActive = false;
                        editorYMovActive = false;
                        editorZMovActive = false;
                    }
                    else {
                        editorYAxisColor = [0, 255, 0, 255];
                        editorYAxisActive = false;
                    }
                    if (drawObj.entity == editorZAxisMarkerObj) {
                        editorZAxisColor = [255, 255, 0, 255];
                        editorXAxisActive = false;
                        editorYAxisActive = false;
                        editorZAxisActive = true;
                        editorXMovActive = false;
                        editorYMovActive = false;
                        editorZMovActive = false;
                    }
                    else {
                        editorZAxisColor = [0, 0, 255, 255];
                        editorZAxisActive = false;
                    }
                    if (drawObj.entity == editorXMovMarkerObj) {
                        editorXMovColor = [255, 255, 0, 255];
                        editorXMovActive = true;
                        editorYMovActive = false;
                        editorZMovActive = false;
                        editorXAxisActive = false;
                        editorYAxisActive = false;
                        editorZAxisActive = false;
                    }
                    else {
                        editorXMovColor = [255, 0, 0, 255];
                        editorXMovActive = false;
                    }
                    if (drawObj.entity == editorYMovMarkerObj) {
                        editorYMovColor = [255, 255, 0, 255];
                        editorXMovActive = false;
                        editorYMovActive = true;
                        editorZMovActive = false;
                        editorXAxisActive = false;
                        editorYAxisActive = false;
                        editorZAxisActive = false;
                    }
                    else {
                        editorYMovColor = [0, 255, 0, 255];
                        editorYMovActive = false;
                    }
                    if (drawObj.entity == editorZMovMarkerObj) {
                        editorZMovColor = [255, 255, 0, 255];
                        editorXMovActive = false;
                        editorYMovActive = false;
                        editorZMovActive = true;
                        editorXAxisActive = false;
                        editorYAxisActive = false;
                        editorZAxisActive = false;
                    }
                    else {
                        editorZMovColor = [0, 0, 255, 255];
                        editorZMovActive = false;
                    }
                }
                else {
                    editorXMovActive = false;
                    editorYMovActive = false;
                    editorZMovActive = false;
                    editorXAxisActive = false;
                    editorYAxisActive = false;
                    editorZAxisActive = false;
                    editorXAxisColor = [255, 0, 0, 255];
                    editorYAxisColor = [0, 255, 0, 255];
                    editorZAxisColor = [0, 0, 255, 255];
                    editorXMovColor = [255, 0, 0, 255];
                    editorYMovColor = [0, 255, 0, 255];
                    editorZMovColor = [0, 0, 255, 255];
                }
            }
            else {
                if (ObjectNotNull(editorFocusObject)) {
                    let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
                    let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
                    if (editorXAxisActive) {
                        let curRot = editorFocusObject.getRotation(2);
                        editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + rightAxisX * 5, 2, true);
                        AxisMem += rightAxisX * 5;
                    }
                    else if (editorYAxisActive) {
                        let curRot = editorFocusObject.getRotation(2);
                        editorFocusObject.setRotation(curRot.x, curRot.y + rightAxisY * 5, curRot.z, 2, true);
                        editorYAxisMarkerObj.setRotation(0, 0, 0, 2, true);
                    }
                    else if (editorZAxisActive) {
                        let curRot = editorFocusObject.getRotation(1);
                        editorFocusObject.setRotation(curRot.x + rightAxisY * 5, curRot.y, curRot.z, 1, true);
                    }
                    else if (editorXMovActive) {
                        let objp = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                    }
                    else if (editorYMovActive) {
                        let objp = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                    }
                    else if (editorZMovActive) {
                        let objp = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if (angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110) {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                    }
                    else {
                        DestroyAxisMarkerObjs();
                        if (ObjectNotNull(editorFocusObject)) {
                            if (!IsObjectSpawned(editorFocusObject)) {
                                DestroyFocusObject();
                            }
                            else {
                                editorFocusObject.freezePosition(true);
                                editorFocusObject.setCollision(true, false);
                                editorFocusObject = null;
                            }
                        }
                        editorDragMode = false;
                        editorState = 0;
                        return;
                    }
                }
            }
        }
    }
    if (!editorDragMode) {
        let mult = 0.3;
        let mult2 = 1;
        if (shiftModifier) {
            mult = 3;
        }
        else if (controlModifier) {
            mult2 = 0.03;
        }
        let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
        let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
        let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
        let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
        let pos = editorCamera.getCoord();
        let rr = editorCamera.getDirection();
        let vector = new mp.Vector3(0, 0, 0);
        vector.x = rr.x * leftAxisY * mult * mult2;
        vector.y = rr.y * leftAxisY * mult * mult2;
        vector.z = rr.z * leftAxisY * mult * mult2;
        let upVector = new mp.Vector3(0, 0, 1);
        let rightVector = GetCrossProduct(GetNormalizedVector(rr), GetNormalizedVector(upVector));
        rightVector.x *= leftAxisX * mult * mult2;
        rightVector.y *= leftAxisX * mult * mult2;
        rightVector.z *= leftAxisX * mult * mult2;
        let upMovement = 0.0;
        if (mp.keys.isDown(69) && !chat)
            upMovement = 0.05 * mult;
        let downMovement = 0.0;
        if (mp.keys.isDown(81) && !chat)
            downMovement = 0.05 * mult;
        mp.players.local.position = new mp.Vector3(pos.x + vector.x, pos.y + vector.y, pos.z + vector.z);
        mp.players.local.heading = rr.z;
        editorCamera.setCoord(pos.x - vector.x + rightVector.x, pos.y - vector.y + rightVector.y, pos.z - vector.z + rightVector.z + upMovement - downMovement);
        editorCamera.setRot(rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);
    }
});
function round(num, scale) {
    if (!("" + num).includes("e")) {
        let cnum = parseFloat(num + "e+" + scale);
        return +(Math.round(cnum) + "e-" + scale);
    }
    else {
        const arr = ("" + num).split("e");
        let sig = "";
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        let mnum = parseFloat(+arr[0] + "e" + sig + (+arr[1] + scale));
        return +(Math.round(mnum) + "e-" + scale);
    }
}
let angleInRadians = 0;
function getNewCameraPosition(distance) {
    if (angleInRadians > 180)
        angleInRadians = -180;
    if (angleInRadians < -180)
        angleInRadians = 180;
    var newAngle = 360.0 - ((angleInRadians + 360.0) % 360.0);
    var x = mp.players.local.position.x + distance * Math.sin(newAngle * Math.PI / 180.0);
    var y = mp.players.local.position.y + distance * Math.cos(newAngle * Math.PI / 180.0);
    var newPos = new mp.Vector3(x, y, mp.players.local.position.z);
    return newPos;
}
function screen2dToWorld3d(absoluteX, absoluteY) {
    const camPos = editorCamera.getCoord();
    const { x: rX, y: rY } = processCoordinates(camPos.x, camPos.y);
    const target = s2w(camPos, rX, rY);
    const dir = sub(target, camPos);
    const from = add(camPos, mulNumber(dir, 1.1));
    const to = add(camPos, mulNumber(dir, 150));
    const ray = mp.raycasting.testPointToPoint(from, to, mp.players.local.handle, -1);
    return ray === undefined ? undefined : ray;
}
function s2w(camPos, relX, relY) {
    const camRot = editorCamera.getRot(0);
    const camForward = rotationToDirection(camRot);
    const rotUp = add(camRot, new mp.Vector3(10, 0, 0));
    const rotDown = add(camRot, new mp.Vector3(-10, 0, 0));
    const rotLeft = add(camRot, new mp.Vector3(0, 0, -10));
    const rotRight = add(camRot, new mp.Vector3(0, 0, 10));
    const camRight = sub(rotationToDirection(rotRight), rotationToDirection(rotLeft));
    const camUp = sub(rotationToDirection(rotUp), rotationToDirection(rotDown));
    const rollRad = -degToRad(camRot.y);
    const camRightRoll = sub(mulNumber(camRight, Math.cos(rollRad)), mulNumber(camUp, Math.sin(rollRad)));
    const camUpRoll = add(mulNumber(camRight, Math.sin(rollRad)), mulNumber(camUp, Math.cos(rollRad)));
    const point3D = add(add(add(camPos, mulNumber(camForward, 0.0)), camRightRoll), camUpRoll);
    const point2D = w2s(point3D);
    if (point2D === undefined) {
        return add(camPos, mulNumber(camForward, 1.0));
    }
    const point3DZero = add(camPos, mulNumber(camForward, 0.0));
    const point2DZero = w2s(point3DZero);
    if (point2DZero === undefined) {
        return add(camPos, mulNumber(camForward, 1.0));
    }
    const eps = 0.001;
    if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
        return add(camPos, mulNumber(camForward, 10.0));
    }
    const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    const point3Dret = add(add(add(camPos, mulNumber(camForward, 10.0)), mulNumber(camRightRoll, scaleX)), mulNumber(camUpRoll, scaleY));
    return point3Dret;
}
function processCoordinates(x, y) {
    const { x: screenX, y: screenY } = mp.game.graphics.getScreenActiveResolution(0, 0);
    let relativeX = (1 - ((x / screenX) * 1.0) * 2);
    let relativeY = (1 - ((y / screenY) * 1.0) * 2);
    if (relativeX > 0.0) {
        relativeX = -relativeX;
    }
    else {
        relativeX = Math.abs(relativeX);
    }
    if (relativeY > 0.0) {
        relativeY = -relativeY;
    }
    else {
        relativeY = Math.abs(relativeY);
    }
    return { x: relativeX, y: relativeY };
}
function w2s(position) {
    const result = mp.game.graphics.world3dToScreen2d(position.x, position.y, position.z);
    if (result === undefined) {
        return undefined;
    }
    return new mp.Vector3((result.x - 0.5) * 2, (result.y - 0.5) * 2, 0);
}
function rotationToDirection(rotation) {
    const z = degToRad(rotation.z);
    const x = degToRad(rotation.x);
    const num = Math.abs(Math.cos(x));
    return new mp.Vector3((-Math.sin(z) * num), (Math.cos(z) * num), Math.sin(x));
}
function degToRad(deg) {
    return deg * Math.PI / 180.0;
}
function add(vector1, vector2) {
    return new mp.Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
}
function sub(vector1, vector2) {
    return new mp.Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
}
function mulNumber(vector1, value) {
    return new mp.Vector3(vector1.x * value, vector1.y * value, vector1.z * value);
}
class DevSecTerrain {
    constructor() {
        this.player = null;
        this.warningcount = 0;
        this.lastmessage = 0;
        this.bounds = [];
        this.player = mp.players.local;
        this.bounds.push(new Array(2507.864, -490.08917));
        this.bounds.push(new Array(2527.9187, -482.56537));
        this.bounds.push(new Array(2576.14, -437.65698));
        this.bounds.push(new Array(2576.2537, -394.51404));
        this.bounds.push(new Array(2583.0554, -384.13425));
        this.bounds.push(new Array(2583.3005, -324.40994));
        this.bounds.push(new Array(2577.9707, -324.38443));
        this.bounds.push(new Array(2577.4814, -326.00183));
        this.bounds.push(new Array(2555.1157, -325.68872));
        this.bounds.push(new Array(2554.9487, -309.0664));
        this.bounds.push(new Array(2536.083, -308.84192));
        this.bounds.push(new Array(2536.1035, -305.87064));
        this.bounds.push(new Array(2528.7727, -303.43637));
        this.bounds.push(new Array(2485.7107, -304.07898));
        this.bounds.push(new Array(2472.634, -312.0745));
        this.bounds.push(new Array(2472.2563, -316.04236));
        this.bounds.push(new Array(2459.9246, -316.09402));
        this.bounds.push(new Array(2459.9382, -321.98016));
        this.bounds.push(new Array(2456.8162, -330.69177));
        this.bounds.push(new Array(2432.0403, -361.95743));
        this.bounds.push(new Array(2431.874, -415.83273));
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if (!this.player)
                return;
            if (!this.player.hascharachter)
                return;
            if (this.player.position.z < 90)
                return;
            const isInBounds = this.isPointInPolygon(this.player.position.x, this.player.position.y, this.bounds);
            if (isInBounds && this.warningcount < 11 && this.player.position.z < 160) {
                if (this.lastmessage <= 0) {
                    this.warningcount++;
                    mp.events.callRemote('devsectcheck', this.warningcount);
                    this.lastmessage = 4;
                }
                else {
                    if (this.lastmessage !== 0) {
                        this.lastmessage--;
                    }
                }
            }
            else if (!isInBounds && this.warningcount !== 0) {
                this.warningcount = 0;
                this.lastmessage = 0;
                mp.events.call('noty', 'success', 'topLeft', 'Du hast die Speerzone verlassen', 5000);
            }
            if (this.player.position.z > 160 && this.warningcount !== 0 && isInBounds) {
                this.warningcount = 0;
                this.lastmessage = 0;
                mp.events.call('noty', 'success', 'topLeft', 'Du hast die Speerzone verlassen', 5000);
            }
        }), 1000);
    }
    isPointInPolygon(x, y, polygon) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            return mp.gui.chat.push('Invalid latitude or longitude. Numbers are expected');
        }
        else if (!polygon || !Array.isArray(polygon)) {
            return mp.gui.chat.push('Invalid polygon. Array with locations expected');
        }
        else if (polygon.length === 0) {
            return mp.gui.chat.push('Invalid polygon. Non-empty Array expected');
        }
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0];
            const yi = polygon[i][1];
            const xj = polygon[j][0];
            const yj = polygon[j][1];
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    ;
}
const devsec = new DevSecTerrain();
mp.events.add("sc:check", (maxSpeed, id) => {
    mp.events.callRemote("sc:check", mp.players.local.vehicle.getSpeed() * 3.6, maxSpeed, id);
});
let crimeAreas = new Array();
let timeout;
mp.events.add('addcrime', (sprite, position, radius, color, areaid) => {
    let allready = false;
    crimeAreas.forEach(function (blip) {
        if (blip.blip != null) {
            if (blip.aid == areaid) {
                allready = true;
            }
        }
    });
    if (allready)
        return;
    if (!timeout) {
        let area = mp.game.ui.addBlipForRadius(position.x, position.y, position.z, radius);
        mp.game.invoke("0xDF735600A4696DAF", area, sprite);
        mp.game.invoke("0x03D7FB09E75D6B7E", area, color);
        mp.game.invoke("0x45FF974EEE1C8734", area, 175);
        crimeAreas.push({ aid: areaid, blip: area });
        timeout = setTimeout(() => {
            crimeAreas.forEach(function (blip) {
                if (blip.blip != null) {
                    mp.game.ui.removeBlip(blip.blip);
                }
            });
            crimeAreas = new Array();
            timeout = false;
        }, 60000);
    }
});
mp.events.add('GetGroundZ', () => {
    const position = mp.players.local.position;
    const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
    mp.events.callRemote("SvGetGroundZ", getGroundZ);
});
mp.events.add("playMetalDetectorAlarm", (position, isSmallWeapon) => {
    mp.game.audio.playSoundFromCoord(-1, isSmallWeapon ? "Metal_Detector_Small_Guns" : "Metal_Detector_Big_Guns", position.x, position.y, position.z, "dlc_ch_heist_finale_security_alarms_sounds", false, 0, false);
});
const STREAM_DISTANCE = 500.0;
const TIMER_TICK = 40;
let particles = new Map();
mp.events.add({
    'particleFx:setup': (data) => {
        let input = '';
        switch (typeof data) {
            case 'string': {
                input = `${data}`;
                break;
            }
            case 'number':
            case 'boolean': {
                input = `${data} `;
                break;
            }
            case 'object': {
                input = `${JSON.stringify(data)} `;
                break;
            }
            default:
                return;
        }
        const value = JSON.parse(input);
        value.forEach((entry) => {
            const id = entry.id;
            delete entry.id;
            particles.set(id, Object.assign({ sync: true }, entry));
        });
    },
    'particleFx:add': (id, data) => {
        let input = '';
        switch (typeof data) {
            case 'string': {
                input = `${data}`;
                break;
            }
            case 'number':
            case 'boolean': {
                input = `${data} `;
                break;
            }
            case 'object': {
                input = `${JSON.stringify(data)} `;
                break;
            }
            default:
                return;
        }
        const value = JSON.parse(input);
        particles.set(id, Object.assign({ sync: true }, value));
    },
    'particleFx:destroy': (id) => {
        const particle = particles.get(id);
        if (!particle)
            return;
        if (particle.fx) {
            mp.game.graphics.stopParticleFxLooped(particle.fx, false);
        }
        particles.delete(id);
    }
});
setInterval(() => {
    particles.forEach((entry, id) => {
        const entity = entry.entity !== null ? mp[entry.entity.type + 's'].atRemoteId(entry.entity.remoteId) : undefined;
        if (entry.entity !== null && !entity) {
            mp.events.callRemote('onParticleFxEntityDisconnect', id);
            mp.events.call('client.stop.particle.fx.lopped', id);
            return;
        }
        if (!entry.sync)
            return;
        const position = entity ? entity.getCoords(true) : entry.position;
        const dimension = entity ? entity.dimension : (entry.dimension || 0);
        const clientPosition = mp.players.local.position;
        const clientDimension = mp.players.local.dimension;
        const dist = mp.game.gameplay.getDistanceBetweenCoords(position.x, position.y, position.z, clientPosition.x, clientPosition.y, clientPosition.z, true);
        if ((dist <= STREAM_DISTANCE && dimension == clientDimension) && !entry.stream) {
            entry.stream = true;
            particles.set(id, entry);
            if (!entity) {
                mp.events.call('client.start.particle.fx.lopped.at.coord', id, entry.fxName, entry.effectName, entry.position, entry.rotation, entry.scale, entry.xAxis, entry.yAxis, entry.zAxis);
            }
            else {
                mp.events.call('client.particle.fx.lopped.on.entity', id, entity.handle, entry.fxName, entry.effectName, entry.offset, entry.rotation, entry.scale, entry.xAxis, entry.yAxis, entry.zAxis);
            }
            mp.events.callRemote('onPlayerParticleFxStreamIn', id);
        }
        else if ((dist >= STREAM_DISTANCE || dimension != clientDimension) && entry.stream) {
            entry.stream = false;
            particles.set(id, entry);
            mp.events.call('client.stop.particle.fx.lopped', id);
            mp.events.callRemote('onPlayerParticleFxStreamOut', id);
        }
    });
}, TIMER_TICK);
mp.events.add({
    'client.start.particle.fx.lopped.at.coord': (id, fxName, effectName, position, rotation, scale, xAxis, yAxis, zAxis) => {
        if (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
            mp.game.streaming.requestNamedPtfxAsset(fxName);
            while (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName))
                mp.game.wait(0);
        }
        mp.game.graphics.setPtfxAssetNextCall(fxName);
        const fx = mp.game.graphics.startParticleFxLoopedAtCoord(effectName, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, scale, xAxis, yAxis, zAxis, false);
        if (particles.has(id)) {
            particles.set(id, Object.assign({ fx }, particles.get(id)));
        }
        else
            particles.set(id, { fx });
    },
    'client.particle.fx.lopped.on.entity': (id, entity, fxName, effectName, offset, rotation, scale, xAxis, yAxis, zAxis) => {
        if (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
            mp.game.streaming.requestNamedPtfxAsset(fxName);
            while (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName))
                mp.game.wait(0);
        }
        mp.game.graphics.setPtfxAssetNextCall(fxName);
        const fx = mp.game.graphics.startParticleFxLoopedOnEntity(effectName, entity, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, scale, xAxis, yAxis, zAxis);
        if (particles.has(id)) {
            particles.set(id, Object.assign({ fx }, particles.get(id)));
        }
        else
            particles.set(id, { fx });
    },
    'client.stop.particle.fx.lopped': (id) => {
        if (!particles.has(id))
            return;
        const particle = particles.get(id);
        if (!particle || !particle.fx)
            return;
        mp.game.graphics.stopParticleFxLooped(particle.fx, false);
        if (particle.sync) {
            delete particle.fx;
            particles.set(id, particle);
        }
        else
            particles.delete(id);
    }
});
let localroomkey = -1;
mp.events.add('render', () => {
    if (mp.players.local.hascharachter) {
        const roomkey = mp.game.invoke(`0x47C2A06D4F5F424B`, mp.players.local.handle);
        if (roomkey != localroomkey || localroomkey === -1) {
            mp.events.callRemote('SetRoomKeyPlayer', roomkey);
            localroomkey = roomkey;
        }
        if (mp.game.ui.isPauseMenuActive()) {
            mp.game.invoke("0xE81B7D2A3DAB2D81");
            mp.game.ui.setRadarAsInteriorThisFrame(mp.game.joaat("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);
        }
    }
});
mp.events.add('setwatertype', (type) => {
    mp.game.invoke(`0x7E3F55ED251B76D3`, type);
    mp.gui.chat.push("Water Change to " + type);
});
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    try {
        vehicle.setDoorShut(0, false);
        vehicle.setDoorShut(1, false);
        vehicle.setDoorShut(2, false);
        vehicle.setDoorShut(3, false);
        vehicle.setDoorShut(6, false);
        vehicle.setDoorShut(7, false);
    }
    catch (_a) { }
});
mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    try {
        vehicle.setDoorShut(0, false);
        vehicle.setDoorShut(1, false);
        vehicle.setDoorShut(2, false);
        vehicle.setDoorShut(3, false);
        vehicle.setDoorShut(6, false);
        vehicle.setDoorShut(7, false);
    }
    catch (_a) { }
});
let entity = null;
let nearestObject = null;
let truckorderveh = null;
let VID = -1;
function getLookingAtEntity() {
    let startPosition = localplayer.getBoneCoords(0, 0, 0, 0);
    var resolution = mp.game.graphics.getScreenActiveResolution(1, 1);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([resolution.x / 2, resolution.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined)
        return null;
    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localplayer, (2 | 4 | 8 | 16));
    if (typeof result !== 'undefined') {
        if (typeof result.entity.type === 'undefined')
            return null;
        if (result.entity.type == 'object' && result.entity.getVariable('TYPE') == undefined)
            return null;
        let entPos = result.entity.position;
        let lPos = localplayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 6)
            return null;
        return result.entity;
    }
    return null;
}
function getNearestObjects() {
    var tempO = null;
    if (localplayer.isInAnyVehicle(false)) {
        var players = mp.players.toArray();
        players.forEach((player) => {
            var posL = localplayer.position;
            var posO = player.position;
            var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
            if (localplayer != player && localplayer.dimension === player.dimension && distance < 2) {
                if (tempO === null)
                    tempO = player;
                else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                    mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                    tempO = player;
            }
        });
    }
    else {
        var objects = mp.objects.toArray();
        objects.forEach((object) => {
            var posL = localplayer.position;
            var posO = object.position;
            var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
            if (object.getVariable('TYPE') != undefined && localplayer.dimension === object.dimension && distance < 3) {
                if (tempO === null)
                    tempO = object;
                else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                    mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                    tempO = object;
            }
        });
    }
    nearestObject = tempO;
}
mp.events.add('render', () => {
    try {
        if (!mp.players.local.vehicle) {
            if (!localplayer.isInAnyVehicle(false) && !localplayer.isDead()) {
                entity = getLookingAtEntity();
                if (entity != null && entity.getVariable('INVISIBLE') == true)
                    entity = null;
            }
            else {
                if (entity != nearestObject)
                    entity = null;
            }
            if (entity != null && !localplayer.isInAnyVehicle(false)) {
                if (truckorderveh == null || entity != truckorderveh) {
                    if (!entity.hasVariable("JOBVEH") && entity.getVariable("VID")) {
                        VID = entity.getVariable("VID");
                        if (shownametags) {
                            mp.game.graphics.drawText("Fahrzeug ID:" + entity.getVariable("VID"), [entity.position.x, entity.position.y, entity.position.z], {
                                font: 0,
                                color: [255, 255, 255, 185],
                                scale: [0.26, 0.26],
                                outline: true
                            });
                            mp.game.graphics.drawMarker(20, entity.position.x, entity.position.y, entity.position.z + 1.95, 0, 0, 0, 0, 180, 0, 1.0, 1.0, 1.0, 13, 230, 70, 120, true, false, 2, true, null, null, false);
                        }
                    }
                }
            }
        }
        if (nearestObject != null) {
            if (shownametags) {
                mp.game.graphics.drawText("[PlayerObject]", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.26, 0.26],
                    outline: true
                });
                mp.game.graphics.drawMarker(20, nearestObject.position.x, nearestObject.position.y, nearestObject.position.z, 0, 0, 0, 0, 180, 0, 1.0, 1.0, 1.0, 13, 230, 70, 120, true, false, 2, true, null, null, false);
            }
        }
    }
    catch (e) {
        mp.game.graphics.notify('ERROR:' + e.toString());
    }
});
mp.keys.bind(bindKeys.KEY_K, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (VID !== -1 && entity) {
        mp.events.callRemote('vehmenu', VID);
        VID = -1;
        entity = null;
    }
    else {
        var VEH = mp.players.local.vehicle;
        if (VEH && VEH.getVariable("VID")) {
            mp.events.callRemote('vehmenu', VEH.getVariable("VID"));
        }
    }
});
mp.keys.bind(bindKeys.KEY_O, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (VID !== -1 && entity) {
        mp.events.callRemote('vehtrunk', VID);
        VID = -1;
        entity = null;
    }
});
mp.keys.bind(bindKeys.KEY_U, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (VID !== -1 && entity) {
        mp.events.callRemote('vehkey', VID);
        VID = -1;
        entity = null;
    }
    else {
        var VEH = mp.players.local.vehicle;
        if (VEH && VEH.getVariable("VID")) {
            mp.events.callRemote('vehkey', VEH.getVariable("VID"));
        }
    }
});
mp.keys.bind(bindKeys.KEY_Q, false, function () {
    if (mp.players.local.casino)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.modalMenu || modal || atwork || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (mp.players.local.vehicle) {
        mp.events.callRemote('Key_Trigger', 'QVEH');
    }
});
mp.keys.bind(0x25, false, () => {
    const vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) === mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) === -1)
        mp.events.callRemote("toggleIndicator", 1);
});
mp.keys.bind(0x27, false, () => {
    const vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) === mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) === -1)
        mp.events.callRemote("toggleIndicator", 0);
});
mp.events.add('animatestart', () => __awaiter(void 0, void 0, void 0, function* () {
    localplayer.clearTasksImmediately();
    localplayer.setHeading(startangle);
    CamAngle = startangle;
    while (!mp.game.streaming.hasAnimDictLoaded("missswitch")) {
        mp.game.streaming.requestAnimDict("missswitch");
        yield mp.game.waitAsync(0);
    }
    mp.players.local.taskPlayAnim("missswitch", "base", 1.0, -1.0, -1, 2, 1, true, true, true);
    mp.game.audio.startAudioScene("DEATH_SCENE");
}));
mp.events.add('stopdeathaudio', () => {
    mp.game.invoke('0xDFE8422B3B94E688', 'DEATH_SCENE');
});
mp.events.add('chirurgcam', (cam, fresh, rotate) => {
    const handle = mp.players.local.handle;
    const localplayer = mp.players.local;
    const player = mp.players.atHandle(handle);
    const campos = new mp.Vector3(225.239, -994.399, -98.436);
    const camrot = new mp.Vector3(-1.365, 0, 92.619);
    if (fresh) {
        player.position = new mp.Vector3(221.02657, -994.5928, -98.99999);
        localplayer.setHeading(startangle);
        CamAngle = startangle;
        localplayer.clearTasksImmediately();
        setTimeout(() => {
            mp.events.call('animatestart');
        }, 100);
        fresh = false;
    }
    switch (cam) {
        case "rotate":
            switch (rotate) {
                case "1":
                    CamAngle += 15;
                    localplayer.setHeading(CamAngle);
                    break;
                case "0":
                    CamAngle = -287;
                    localplayer.setHeading(CamAngle);
                    break;
                case "-1":
                    CamAngle -= 15;
                    localplayer.setHeading(CamAngle);
                    break;
            }
            break;
        case "front":
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.frontCam = mp.cameras.new('default', campos, camrot, 35);
            mp.players.local.frontCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.frontCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "side":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.sideCam = mp.cameras.new('default', campos, camrot, 40);
            mp.players.local.sideCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.sideCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "sloped":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.slopedCam = mp.cameras.new('default', campos, camrot, 40);
            mp.players.local.slopedCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.slopedCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "face":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            mp.players.local.faceCam = mp.cameras.new('default', campos, camrot, 20);
            let rr = mp.players.local.faceCam.getDirection();
            let vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 7 * 0.3;
            vector.y = rr.y * 7 * 0.3;
            vector.z = rr.z * 6 * 0.25;
            var head = mp.players.local.getBoneCoords(12844, 0, 0, 0);
            mp.players.local.faceCam.setCoord(head.x - vector.x, head.y - vector.y, head.z - vector.z);
            mp.players.local.faceCam.pointAtCoord(head.x, head.y, head.z);
            mp.players.local.faceCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
    }
});
function DisableHUDStuffForLC() {
    const ElementsToDisable = [6, 7, 8, 9];
    DisableHudElements(ElementsToDisable);
}
function UpdateCharacterInfos() {
    mp.game.graphics.beginScaleformMovieMethodOnFrontend("SET_HEADING_DETAILS");
    mp.game.graphics.scaleformMovieMethodAddParamTextureNameString("CHARACTER_NAME_HERE");
    mp.game.graphics.scaleformMovieMethodAddParamTextureNameString("TIME HERE");
    mp.game.graphics.scaleformMovieMethodAddParamTextureNameString("MONEY HERE");
    mp.game.graphics.scaleformMovieMethodAddParamBool(false);
    mp.game.graphics.endScaleformMovieMethod();
}
mp.events.add("render", DisableHUDStuffForLC);
function syncipl() {
    mp.players.forEachInRange(mp.players.local.position, 30, (entity) => {
        if (entity != mp.players.local) {
            let playerRoom = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle);
            let playerInterior = mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle);
            let roomID = 0;
            let interiorID = 0;
            if (playerRoom != 0 || playerInterior != 0) {
                let targetRoom = mp.game.invoke("0x47C2A06D4F5F424B", entity.handle);
                let targetInterior = mp.game.invoke("0x2107BA504071A6BB", entity.handle);
                if (targetRoom != playerRoom || targetInterior != playerInterior) {
                    mp.game.invoke("0x52923C4710DD9907", entity.handle, interiorID, roomID);
                }
            }
        }
    });
}
mp.events.add('CircuitBreakerWIN', () => {
    if (mp.players.local.vehicle) {
        mp.events.callRemote('HackerChip', mp.players.local.vehicle, true);
    }
});
mp.events.add('CircuitBreakerLOSE', () => {
    if (mp.players.local.vehicle) {
        mp.events.callRemote('HackerChip', mp.players.local.vehicle, false);
    }
});
let NativeGrow = {
    GET_ENTITY_MODEL: '0x9F47B058362C84B5',
    GET_ENTITY_TYPE: '0x8ACD366038D14505',
};
mp.events.add('render', () => {
    growdetect();
});
let lasthandlegrow = null;
const growdetect = () => {
    try {
        const startPosition = mp.players.local.getBoneCoords(0, 0, 0, 0);
        let distance = 10;
        const camera = mp.cameras.new("gameplay");
        let position = camera.getCoord();
        let direction = camera.getDirection();
        const secondPoint = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
        startPosition.z -= 0.5;
        const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, 18);
        if (lasthandlegrow !== null) {
            lasthandlegrow = null;
        }
        if (target) {
            let handle = target.entity;
            let model = mp.game.invoke(NativeGrow.GET_ENTITY_MODEL, handle);
            if (model === 0 && target !== null) {
                handle = target.entity.handle;
                model = mp.game.invoke(NativeGrow.GET_ENTITY_MODEL, handle);
            }
            const type = mp.game.invoke(NativeGrow.GET_ENTITY_TYPE, handle);
            if (target.entity !== undefined && handle !== model && type !== 2) {
                if (target.entity.handle !== null) {
                    lasthandlegrow = target.entity.handle;
                }
                else {
                    lasthandlegrow = target.entity;
                }
                if (target.position !== undefined) {
                    lasthandlegrow = handle;
                    mp.game.controls.disableControlAction(0, 47, true);
                    if (mp.game.controls.isDisabledControlJustPressed(0, 47)) {
                        if (target.entity.type === "object") {
                            const plantid = target.entity.getVariable("plantid");
                            if (plantid) {
                                mp.events.callRemote("ShowPlantMenu", plantid);
                            }
                        }
                    }
                    if (target.entity.getVariable("plantid")) {
                        const pos = target.entity.position;
                        const rot = target.entity.getRotation(1);
                        mp.game.graphics.drawMarker(27, pos.x, pos.y, pos.z + 0.05, 0, 0, 0, rot.x, rot.y, rot.z, 1, 1, 1, 255, 0, 0, 200, false, false, 2, false, null, null, false);
                        mp.game.graphics.drawText(`Drücke [~g~G~s~]`, [pos.x, pos.y, pos.z + 1.3], {
                            font: 0,
                            color: [255, 255, 255, 255],
                            scale: [0.3, 0.3],
                            centre: true,
                            outline: true
                        });
                    }
                }
            }
            else {
                if (lasthandlegrow !== null) {
                    lasthandlegrow = null;
                }
            }
        }
        else {
            if (lasthandlegrow !== null) {
                lasthandlegrow = null;
            }
        }
    }
    catch (_a) {
    }
};
let Natives = {
    REQUEST_CLIPSET: '0x3ACA4F727AC4606E',
};
const proxyNatives = new Proxy(Natives, {
    get: (target, name, receiver) => Natives[name][0]
});
function setHeadlightsColor(vehicle, color) {
    if (typeof color !== "number" || isNaN(color) || color < 0 || color === 255) {
        vehicle.toggleMod(22, false);
        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
    }
    else {
        vehicle.toggleMod(22, true);
        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, color);
    }
}
mp.events.add('setHeadlightsColor', setHeadlightsColor);
let x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
let handles = null;
let lobj;
let bonet = "";
mp.events.add('PropTester', (hhh, prop = "prop_notepad_02", dict = "misslsdhsclipboard@base", anim = "base", flag = 33, bone = "") => {
    handles = hhh;
    bonet = bone;
    if (lobj) {
        lobj.destroy();
    }
    const object = mp.objects.new(mp.game.joaat(prop), mp.players.local.position, {
        rotation: new mp.Vector3(0, 0, mp.players.local.heading),
        alpha: 255,
        dimension: -1
    });
    lobj = object;
    mp.players.local.taskPlayAnim(dict, anim, 1.0, -1.0, -1, flag, 1, true, true, true);
    mp.events.call('closeMenu');
    menu = new MainMenu("PropAtach Tester", true);
    const sliderMenuItem = new SliderMenuItem("PosX", -360.0, 360.0, 0.01, 0, "PosX ", "MEDAL_SILVER");
    sliderMenuItem.addOnChangeEvent({
        trigger: data => {
            x = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItem);
    const sliderMenuItemy = new SliderMenuItem("PosY", -360.0, 360.0, 0.01, 0, "PosY ", "MEDAL_SILVER");
    sliderMenuItemy.addOnChangeEvent({
        trigger: data => {
            y = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItemy);
    const sliderMenuItemz = new SliderMenuItem("PosZ", -360.0, 360.0, 0.01, 0, "PosZ ", "MEDAL_SILVER");
    sliderMenuItemz.addOnChangeEvent({
        trigger: data => {
            z = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItemz);
    const sliderMenuItemrx = new SliderMenuItem("RotX", -360.0, 360.0, 1, 0, "RotX ", "MEDAL_GOLD");
    sliderMenuItemrx.addOnChangeEvent({
        trigger: data => {
            rx = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItemrx);
    const sliderMenuItemry = new SliderMenuItem("RotY", -360.0, 360.0, 1, 0, "RotY ", "MEDAL_GOLD");
    sliderMenuItemry.addOnChangeEvent({
        trigger: data => {
            ry = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItemry);
    const sliderMenuItemrz = new SliderMenuItem("RotZ", -360.0, 360.0, 1, 0, "RotZ ", "MEDAL_GOLD");
    sliderMenuItemrz.addOnChangeEvent({
        trigger: data => {
            rz = data;
            updatedatap();
        }
    });
    menu.add(sliderMenuItemrz);
    if (!menu.isVisible) {
        menu.open();
    }
    menuPool.push(menu);
});
function updatedatap() {
    mp.gui.chat.push("X: " + x + " Y: " + y + " Z: " + z + " RX: " + rx + " RY: " + ry + " RZ: " + rz);
    let bone = bonet;
    let pla = mp.players.atHandle(handles.handle);
    switch (bone) {
        case "IK_Root":
            bone = pla.getBoneIndex(56604);
            break;
        case "IK_R_Hand":
            bone = pla.getBoneIndex(6286);
            break;
        case "IK_L_Hand":
            bone = pla.getBoneIndex(36029);
            mp.game.graphics.notify("Left ");
            break;
        case "SKEL_L_Hand":
            bone = pla.getBoneIndex(18905);
            break;
        case "PH_R_Hand":
            bone = pla.getBoneIndex(28422);
            break;
        case "SKEL_R_Hand":
            bone = pla.getBoneIndex(57005);
            break;
        case "PH_L_Hand":
            bone = pla.getBoneIndex(60309);
            break;
        case "FACIAL_facialRoot":
            bone = pla.getBoneIndex(65068);
            break;
        case "IK_Head":
            bone = pla.getBoneIndex(12844);
            break;
    }
    lobj.attachTo(pla.handle, bone, x, y, z, rx, ry, rz, true, true, false, false, 0, true);
}
let isragdoll = false;
let ragdollloop = null;
function ragdolltoggle() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isragdoll) {
            isragdoll = true;
            const player = mp.players.local;
            player.setToRagdoll(1000, 1000, 0, true, true, true);
            ragdollloop = setInterval(() => {
                player.resetRagdollTimer();
            }, 900);
        }
        else {
            if (ragdollloop) {
                const player = mp.players.local;
                player.clearTasks();
                clearInterval(ragdollloop);
                ragdollloop = null;
                isragdoll = false;
            }
        }
    });
}
mp.events.add("ragdolli", () => {
    ragdolltoggle();
});
function RequestIpl(ipl) {
    mp.game.streaming.requestIpl(ipl);
}
function RemoveIpl(ipl) {
    mp.game.streaming.removeIpl(ipl);
}
function removeActionMode(id) {
    let player = mp.players.atRemoteId(id);
    if (mp.players.exists(player) && player.handle) {
        mp.game.invoke("0xD75ACCF5E0FB5367", player.handle, false, -1, "DEFAULT_ACTION");
    }
}
const NativesTow = {
    SET_TOW_TRUCK_CRANE_HEIGHT: '0xFE54B92A344583CA',
    ATTACH_VEHICLE_TO_TOW_TRUCK: '0x29A16F8D621C4508',
    DETACH_VEHICLE_FROM_TOW_TRUCK: '0xC2DB6B6708350ED8',
    DETACH_VEHICLE_FROM_ANY_TOW_TRUCK: '0xD0E9CE05A1E68CD8',
    IS_VEHICLE_ATTACHED_TO_TOW_TRUCK: '0x146DF9EC4C4B9FD4',
    GET_ENTITY_ATTACHED_TO_TOW_TRUCK: '0xEFEA18DCF10F8F75',
};
let lastCheck = Date.now() / 1000;
let lastAttachVehicle = undefined;
let lastVehiclePlayer = undefined;
const OnPlayerTowTruckStateChange = (...args) => {
    switch (args[0]) {
        case 'attach':
            {
                const vehicle = args[1];
                break;
            }
        case 'detach':
            {
                const vehicle = args[1];
                const result = args[2];
                break;
            }
        case 'deadOrDestroy':
            {
                const result = args[1] || args[2];
                break;
            }
        case 'exit':
            {
                const _lastVehiclePlayer = args[1];
                const _lastAttachVehicle = args[2];
                if (_lastAttachVehicle.doesExist() && !_lastAttachVehicle.isDead())
                    mp.game.invoke(NativesTow.DETACH_VEHICLE_FROM_TOW_TRUCK, _lastVehiclePlayer.handle, _lastAttachVehicle.handle);
                break;
            }
    }
};
const getEntityAttachedVehicle = () => {
    let findVeh = 0;
    mp.vehicles.forEachInStreamRange((vehicle) => {
        const v = mp.game.invoke(NativesTow.IS_VEHICLE_ATTACHED_TO_TOW_TRUCK, localPlayer.vehicle.handle, vehicle.handle);
        if (v)
            findVeh = vehicle;
    });
    return findVeh;
};
mp.events.add({
    'render': () => {
        if (Date.now() / 1000 > lastCheck + 5) {
            if (localPlayer.vehicle) {
                if (localPlayer.vehicle.model === parseInt(0xB12314E0) || localPlayer.vehicle.model === parseInt(0xE5A2D6C6)) {
                    lastVehiclePlayer = localPlayer.vehicle;
                    if (!lastAttachVehicle) {
                        const getEntityAttached = mp.game.invoke(NativesTow.GET_ENTITY_ATTACHED_TO_TOW_TRUCK, localPlayer.vehicle.handle);
                        if (getEntityAttached) {
                            lastAttachVehicle = getEntityAttachedVehicle();
                            OnPlayerTowTruckStateChange('attach', lastAttachVehicle);
                        }
                    }
                    else if (lastAttachVehicle && !lastAttachVehicle.doesExist() || lastAttachVehicle && lastAttachVehicle.isDead()) {
                        OnPlayerTowTruckStateChange('deadOrDestroy', lastAttachVehicle.doesExist(), lastAttachVehicle.isDead());
                        lastAttachVehicle = 0;
                    }
                    else {
                        const isVehicleAttached = mp.game.invoke(NativesTow.IS_VEHICLE_ATTACHED_TO_TOW_TRUCK, localPlayer.vehicle.handle, lastAttachVehicle.handle);
                        if (!isVehicleAttached) {
                            OnPlayerTowTruckStateChange('detach', lastAttachVehicle, isVehicleAttached);
                            lastAttachVehicle = undefined;
                        }
                    }
                }
            }
            else if (!localPlayer.vehicle && lastVehiclePlayer && lastAttachVehicle) {
                OnPlayerTowTruckStateChange('exit', lastVehiclePlayer, lastAttachVehicle);
                lastAttachVehicle = undefined;
                lastVehiclePlayer = undefined;
            }
            lastCheck = Date.now() / 1000;
        }
    }
});
const setTowTruckCraneHeight = (towTruck, height) => mp.game.invoke(NativesTow.SET_TOW_TRUCK_CRANE_HEIGHT, towTruck.handle, height);
const attachVehicleToTowTruck = (towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ) => mp.game.invoke(NativesTow.ATTACH_VEHICLE_TO_TOW_TRUCK, towTruck.handle, vehicle.handle, rear, hookOffsetX, hookOffsetY, hookOffsetZ);
mp.events.add('stopAnimation', () => {
    mp.players.local.clearTasks();
});
mp.events.add('clearTasksForAll', (handle) => {
    if (handle) {
        const player = mp.players.atHandle(handle.handle);
        try {
            player.clearTasks();
        }
        catch (e) {
            mp.gui.chat.push(e);
        }
    }
});
mp.events.add('lipsync', (handle, animDict, animName) => {
    if (handle) {
        const player = mp.players.atHandle(handle.handle);
        try {
            player.playFacialAnim(animName, animDict);
        }
        catch (e) {
            mp.gui.chat.push(e);
        }
    }
});
mp.events.add('requestDict', (dict) => {
    if (!mp.game.streaming.hasAnimDictLoaded(dict)) {
        mp.game.streaming.requestAnimDict(dict);
    }
});
mp.events.add('openatmNew', () => {
    if (mp.players.local.menuOpen || mp.players.local.showPhone)
        return;
    hudVis = false;
    mp.game.ui.displayRadar(false);
    mp.players.local.openPage = true;
});
mp.events.add('openatm', (kn, ks, verlauf, cash) => {
    if (mp.players.local.menuOpen || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    callHUD(HUD, ['openATM', "Loom", kn, ks, verlauf, cash]);
    mp.players.local.openPage = true;
});
mp.events.add('closeATM', () => {
    mp.events.callRemote("delColshape");
    mp.players.local.openPage = false;
    mp.events.call('browser');
    hudVis = true;
    callHUD(HUD, ['hudVis', true]);
    mp.game.ui.displayRadar(true);
});
mp.events.add('atmAction', (id, val1, val2, KtoNo, vzweck) => {
    mp.events.callRemote('atmAction', id, val1, val2, KtoNo, vzweck);
});
let barberCef = null;
let isActive = null;
mp.events.add('FrisurOpen', (barberData) => {
    if (mp.players.local.menuOpen || mp.players.local.showPhone || mp.players.local.openPage)
        return;
    if (!isActive) {
        isActive = true;
        rotator.startent(mp.players.local);
        callHUD(HUD, ['openBerber', barberData]);
        callHUD(HUD, ['hudVis', false]);
        mp.gui.cursor.show(true, true);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.show(false);
        mp.players.local.openPage = true;
    }
});
mp.events.add('BerberClose', () => {
    callHUD(HUD, ['closePage']);
    mp.events.callRemote("delColshape");
    mp.events.callRemote("resetClothesPreview");
    mp.events.callRemote("BerberEnd");
    rotator.stop();
    mp.game.cam.destroyAllCams(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.openPage = false;
    callHUD(HUD, ['hudVis', true]);
    mp.game.ui.displayRadar(true);
    isActive = false;
});
mp.events.add('BerberPreview', (data) => {
    mp.events.callRemote('BerberPreview', data);
});
mp.events.add('BerberBuy', (data, price) => {
    mp.events.callRemote('BerberBuy', data, price);
});
mp.players.local.slopedCam = null;
mp.players.local.sideCam = null;
mp.players.local.frontCam = null;
mp.players.local.faceCam = null;
let CamAngle = 0;
const startangle = 95;
mp.events.add('ani', () => {
    localplayer.clearTasksImmediately();
    localplayer.setHeading(startangle);
    CamAngle = startangle;
    mp.players.local.taskPlayAnim("missswitch", "base", 1.0, -1.0, -1, 2, 1, true, true, true);
    mp.game.audio.startAudioScene("DEATH_SCENE");
});
mp.events.add('tsCreatorSelectView', (cam, fresh, rotate) => {
    const handle = mp.players.local.handle;
    const localplayer = mp.players.local;
    const player = mp.players.atHandle(handle);
    const campos = new mp.Vector3(225.239, -994.399, -98.436);
    const camrot = new mp.Vector3(-1.365, 0, 92.619);
    if (fresh) {
        player.position = new mp.Vector3(221.02657, -994.5928, -98.99999);
        for (var i = 0; i < 20; i++)
            player.setFaceFeature(i, 0.0);
        localplayer.setHeading(startangle);
        CamAngle = startangle;
        localplayer.clearTasksImmediately();
        mp.events.callRemote("RemoteInitCharacter");
        setTimeout(() => {
            mp.events.call('ani');
        }, 250);
        fresh = false;
    }
    switch (cam) {
        case "rotate":
            switch (rotate) {
                case "1":
                    CamAngle += 15;
                    localplayer.setHeading(CamAngle);
                    break;
                case "0":
                    CamAngle = -287;
                    localplayer.setHeading(CamAngle);
                    break;
                case "-1":
                    CamAngle -= 15;
                    localplayer.setHeading(CamAngle);
                    break;
            }
            break;
        case "front":
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.frontCam = mp.cameras.new('default', campos, camrot, 35);
            mp.players.local.frontCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.frontCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "side":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.sideCam = mp.cameras.new('default', campos, camrot, 40);
            mp.players.local.sideCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.sideCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "sloped":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            if (mp.players.local.faceCam !== null) {
                mp.players.local.faceCam.destroy();
                mp.players.local.faceCam = null;
            }
            mp.players.local.slopedCam = mp.cameras.new('default', campos, camrot, 40);
            mp.players.local.slopedCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            mp.players.local.slopedCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "face":
            if (mp.players.local.frontCam !== null) {
                mp.players.local.frontCam.destroy();
                mp.players.local.frontCam = null;
            }
            if (mp.players.local.slopedCam !== null) {
                mp.players.local.slopedCam.destroy();
                mp.players.local.slopedCam = null;
            }
            if (mp.players.local.sideCam !== null) {
                mp.players.local.sideCam.destroy();
                mp.players.local.sideCam = null;
            }
            mp.players.local.faceCam = mp.cameras.new('default', campos, camrot, 20);
            let rr = mp.players.local.faceCam.getDirection();
            let vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 7 * 0.3;
            vector.y = rr.y * 7 * 0.3;
            vector.z = rr.z * 6 * 0.25;
            var head = mp.players.local.getBoneCoords(12844, 0, 0, 0);
            mp.players.local.faceCam.setCoord(head.x - vector.x, head.y - vector.y, head.z - vector.z);
            mp.players.local.faceCam.pointAtCoord(head.x, head.y, head.z);
            mp.players.local.faceCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
    }
});
mp.events.add('tsSubmit', (json) => {
    if (json !== null) {
        if (HUD !== null) {
            HUD.active = false;
            HUD = null;
        }
        mp.events.callRemote('RemoteCreateCharacter', json);
        if (mp.players.local.sideCam !== null) {
            mp.players.local.sideCam.destroy();
            mp.players.local.sideCam = null;
        }
        if (mp.players.local.slopedCam !== null) {
            mp.players.local.slopedCam.destroy();
            mp.players.local.slopedCam = null;
        }
        if (mp.players.local.faceCam !== null) {
            mp.players.local.faceCam.destroy();
            mp.players.local.faceCam = null;
        }
        if (mp.players.local.frontCam !== null) {
            mp.players.local.frontCam.destroy();
            mp.players.local.frontCam = null;
        }
        mp.game.invoke('0xDFE8422B3B94E688', 'DEATH_SCENE');
    }
});
mp.events.add('tsPreviewCharacter', (json) => {
    mp.events.callRemote('RemotePreviewCharacter', json);
});
mp.players.local.cam = null;
let PlayerRotation = 0;
let lastHeading = 0;
mp.events.add('openclothingstoren', () => {
    if (mp.players.local.menuOpen || mp.players.local.showPhone)
        return;
    callHUD(HUD, ['hudVis', false]);
    hudVis = false;
    mp.game.ui.displayRadar(false);
    rotator.startent(mp.players.local);
});
let freshc = true;
let shcam = null;
mp.events.add('openclothingstorennc', () => {
    if (HUD !== null) {
        HUD.active = false;
        HUD = null;
    }
    mp.game.graphics.transitionFromBlurred(1000);
    callHUD(HUD, ['hudVis', false]);
    hudVis = false;
    mp.game.ui.displayRadar(false);
    rotator.startent(mp.players.local);
    const handle = mp.players.local.handle;
    const localplayer = mp.players.local;
    const player = mp.players.atHandle(handle);
    const campos = new mp.Vector3(225.239, -994.399, -98.436);
    const camrot = new mp.Vector3(-1.365, 0, 92.619);
    if (freshc) {
        player.position = new mp.Vector3(221.02657, -994.5928, -98.99999);
        player.clearTasksImmediately();
        freshc = false;
    }
    shcam = mp.cameras.new('default', campos, camrot, 35);
    shcam.pointAtCoord(player.position.x, player.position.y, player.position.z);
    shcam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});
mp.events.add('closeShop', () => {
    rotator.stop();
    callHUD(HUD, ['closePage']);
    mp.events.callRemote("delColshape");
    mp.events.callRemote("resetClothesPreview");
    mp.game.cam.destroyAllCams(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.events.call('browser');
    hudVis = true;
    callHUD(HUD, ['hudVis', true]);
    mp.game.ui.displayRadar(true);
    freshc = false;
    if (shcam != null) {
        shcam.destroy();
        shcam = null;
    }
});
mp.events.add('closeShopReconnect', () => {
    rotator.stop();
    setTimeout(() => {
        mp.gui.cursor.show(false, false);
        mp.gui.cursor.visible = false;
    }, 50);
    callHUD(HUD, ['closePage']);
    mp.events.callRemote("delColshape");
    mp.events.callRemote("resetClothesPreview");
    mp.game.cam.destroyAllCams(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    Browser === null || Browser === void 0 ? void 0 : Browser.destroy();
    hudVis = true;
    callHUD(HUD, ['hudVis', true]);
    mp.game.ui.displayRadar(true);
    freshc = false;
    if (shcam != null) {
        shcam.destroy();
        shcam = null;
    }
    mp.events.callRemote('ShopKick');
});
mp.events.add('tsPreviewClothes', (json) => {
    mp.events.callRemote('RemotePreviewClothes', json);
});
mp.events.add('tsBuyClothes', (json) => {
    mp.events.callRemote('RemoteBuyClothes', json);
});
mp.events.add('tsBuyClothesSpawn', (json) => {
    mp.events.callRemote('RemoteBuyClothesSpawn', json);
});
mp.events.add('tsSelectViewClothesStore', (cam, rotate) => {
    const localplayer = mp.players.local;
    let camera = mp.cameras.new('gameplay');
    let pos = null;
    let rr = null;
    let vector = null;
    let upVector = null;
    let rightVector = null;
    if (lastHeading > 180)
        lastHeading = -180;
    if (lastHeading < -180)
        lastHeading = 180;
    let newAngle = 360.0 - ((lastHeading + 360.0) % 360.0);
    switch (cam) {
        case "rotate":
            switch (rotate) {
                case "1":
                    PlayerRotation += 25;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
                case "0":
                    PlayerRotation = newAngle;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
                case "-1":
                    PlayerRotation -= 25;
                    localplayer.setHeading(PlayerRotation);
                    localplayer.clearTasksImmediately();
                    break;
            }
            break;
        case "front":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 47);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 8.5 * 0.3;
            vector.y = rr.y * 8.5 * 0.3;
            vector.z = rr.z * 7.5 * 0.3;
            var rootbone = mp.players.local.getBoneCoords(0, 0, 0, 0);
            mp.players.local.cam.setCoord(rootbone.x - vector.x, rootbone.y - vector.y, rootbone.z - vector.z);
            mp.players.local.cam.pointAtCoord(rootbone.x, rootbone.y, rootbone.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
        case "face":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 25);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 7 * 0.3;
            vector.y = rr.y * 7 * 0.3;
            vector.z = rr.z * 6 * 0.25;
            var head = mp.players.local.getBoneCoords(12844, 0, 0, 0);
            mp.players.local.cam.setCoord(head.x - vector.x, head.y - vector.y, head.z - vector.z);
            mp.players.local.cam.pointAtCoord(head.x, head.y, head.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 2500, true, false);
            break;
        case "foot":
            mp.game.cam.destroyAllCams(true);
            camera = mp.cameras.new('gameplay');
            pos = camera.getCoord();
            rr = camera.getDirection();
            mp.players.local.cam = mp.cameras.new('default', pos, mp.game.cam.getGameplayCamRot(2), 30);
            vector = new mp.Vector3(0, 0, 0);
            vector.x = rr.x * 6.5 * 0.3;
            vector.y = rr.y * 6.5 * 0.3;
            vector.z = rr.z * 5.5 * 0.3;
            var feet = mp.players.local.getBoneCoords(65245, 0, 0, 0);
            mp.players.local.cam.setCoord(feet.x - vector.x, feet.y - vector.y, feet.z - vector.z);
            mp.players.local.cam.pointAtCoord(feet.x, feet.y, feet.z);
            mp.players.local.cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            break;
    }
});
function GetNormalizedVector(vector) {
    let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
}
function GetCrossProduct(v1, v2) {
    let vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
}
const GasPump = [
    'prop_gas_pump_1a',
    'prop_gas_pump_1d',
    'prop_gas_pump_1b',
    'prop_gas_pump_1c',
    'prop_gas_pump_old2',
    'prop_gas_pump_old3',
    'prop_vintage_pump'
];
mp.events.add('checkGasStation', () => {
    const playerPos = mp.players.local.position;
    GasPump.forEach(model => {
        const foundObject = mp.game.object.getClosestObjectOfType(playerPos.x, playerPos.y, playerPos.z, 2, mp.game.joaat(model), false, true, true);
        if (foundObject) {
            if (mp.players.local.vehicle)
                return;
            mp.events.callRemote("openGasStation");
        }
    });
});
mp.players.local.chatActive = false;
mp.events.add('setNameTag', (name) => {
    mp.players.local.name = name;
});
let shownametags = false;
mp.events.add('chatToggle', (status) => {
    mp.gui.chat.activate(status);
    mp.gui.chat.show(status);
    mp.players.local.chatActive = status;
    if (!mp.ChatToggle) {
        mp.ChatToggle = status;
        shownametags = status;
    }
    else {
        mp.ChatToggle = status;
        shownametags = status;
    }
});
mp.events.add('mapToggle', (status) => {
    mp.game.ui.displayRadar(status);
});
mp.events.add('iaa', (status) => {
    for (let i = 0; i <= 16; i++) {
        if (mp.game.graphics.getLightsState(i) != status)
            mp.game.graphics.setLightsState(i, status);
    }
});
mp.events.add('iaastop', () => {
    for (let i = 0; i <= 16; i++) {
        if (mp.game.graphics.getLightsState(i) != false)
            mp.game.graphics.setLightsState(i, false);
    }
    mp.game.graphics.resetLightsState();
});
mp.events.add('light', (id, state) => {
    mp.gui.chat.push("Licht status " + id + ":" + mp.game.graphics.getLightsState(id));
    mp.game.graphics.setLightsState(id, state);
});
var party = false;
const handle = mp.players.local.handle;
const player = mp.players.atHandle(handle);
const charId = player.getVariable('charId');
mp.events.add('refreshint', function (position) {
    let indId = mp.game.interior.getInteriorAtCoords(position.x, position.y, position.z);
    mp.game.interior.refreshInterior(indId);
});
mp.events.add('getIntAtCoord', (position) => {
    const indId = mp.game.interior.getInteriorAtCoords(position.x, position.y, position.z);
    mp.events.callRemote('interiorid', indId);
});
mp.events.add('loadipl', (ipl) => {
    let was = mp.game.invoke(`0x812595A0644CE1DE`, ipl);
    mp.gui.chat.push("Present -> " + was);
    mp.game.invoke(`0x6E0C692677008888`, 1);
    mp.game.streaming.requestIpl(ipl);
});
mp.events.add('removeipl', (ipl) => {
    let was = mp.game.invoke(`0x812595A0644CE1DE`, ipl);
    mp.gui.chat.push("Present -> " + was);
    mp.game.invoke(`0x6E0C692677008888`, 1);
    mp.game.streaming.removeIpl(ipl);
});
mp.events.add('enableEntitySet', (position, entitiSet) => {
    const indId = mp.game.interior.getInteriorAtCoords(position.x, position.y, position.z);
    mp.game.interior.enableInteriorProp(indId, entitiSet);
    mp.game.interior.refreshInterior(indId);
});
mp.events.add('enableprop', (id, prop) => {
    mp.game.interior.enableInteriorProp(id, prop);
    mp.game.interior.refreshInterior(id);
});
mp.events.add('disableprop', (id, prop) => {
    mp.game.interior.disableInteriorProp(id, prop);
    mp.game.interior.refreshInterior(id);
});
let isCuffed = false;
mp.events.add('Client_Cuffed', (state) => {
    isCuffed = state;
});
const isCuffedControls = [12, 13, 14, 15, 16, 17, 24, 25, 47, 58, 59, 63, 66, 68, 69, 70, 86, 89, 90, 91, 92, 107, 108, 109, 110, 111, 112, 114, 140, 141, 142, 257, 263, 264, 331];
const inVehControlls = [75];
function CriminalisPoliceVehicle(vehicle) {
    const model = vehicle.model;
    switch (model) {
        case 2046537925:
        case -1627000575:
        case 1912215274:
        case -1973172295:
        case 456714581:
        case -1683328900:
        case 1922257928:
        case -34623805:
        case 353883353:
            return true;
        default:
            return false;
    }
}
function IsCuffed() {
    DisableControls(isCuffedControls);
    if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) {
        if (CriminalisPoliceVehicle(mp.players.local.vehicle)) {
            DisableControls(inVehControlls);
        }
    }
}
mp.events.add('render', () => {
    try {
        if (mp.players.local.hascharachter) {
            if (isCuffed) {
                IsCuffed();
            }
        }
    }
    catch (e) {
        mp.gui.chat.push(e);
    }
});
mp.events.add('tsLogin', (username, password) => {
    if (username && password)
        mp.events.callRemote('remoteLogin', username, password, false);
});
mp.keys.bind(bindKeys.KEY_E, false, function () {
    if (mp.players.local.vehicle)
        return;
    try {
        const types = [
            'prop_vend_soda_02',
            'prop_vend_soda_01',
            'prop_vend_fags_01',
            'prop_watercooler',
            'prop_watercooler_dark',
            'prop_vend_coffe_01',
            'prop_vend_snak_01_tu',
            'prop_vend_snak_01',
        ];
        const typesS = {
            'prop_vend_soda_02': 'sprunk',
            'prop_vend_soda_01': 'cola',
            'prop_vend_fags_01': 'cigarette',
            'prop_watercooler': 'watterboiler',
            'prop_watercooler_dark': 'watterboiler',
            'prop_vend_coffe_01': 'coffee',
            'prop_vend_snak_01_tu': 'snack',
            'prop_vend_snak_01': 'snack',
        };
        const raycastResult = pointingAt(1.75);
        let model = mp.game.invoke(Native.GET_ENTITY_MODEL, raycastResult.entity);
        let handlem;
        if (model === 0 && raycastResult !== null) {
            handlem = raycastResult.entity.handle;
            model = mp.game.invoke(Native.GET_ENTITY_MODEL, handlem);
        }
        let type = mp.game.invoke(Native.GET_ENTITY_TYPE, handlem);
        if (typeof raycastResult.entity === 'number' && raycastResult.entity !== 0) {
            type = mp.game.invoke(Native.GET_ENTITY_TYPE, raycastResult.entity);
        }
        switch (type) {
            case 3:
                for (const modelType of types) {
                    if (mp.game.joaat(modelType) === model) {
                        mp.events.call('closeMenu');
                        setTimeout(() => {
                            mp.events.callRemote('openMachineMenu', typesS[modelType]);
                        }, 150);
                    }
                    else if (mp.game.joaat(modelType) === IntToUint(model)) {
                        mp.events.call('closeMenu');
                        setTimeout(() => {
                            mp.events.callRemote('openMachineMenu', typesS[modelType]);
                        }, 150);
                    }
                }
                break;
        }
    }
    catch (_a) { }
});
function UintToInt(value) {
    if (value > 2147483647) {
        value -= 4294967296;
    }
    return value;
}
function IntToUint(value) {
    if (value < 2147483647) {
        value += 4294967296;
    }
    return value;
}
mp.events.add('menuBack', (cb, trigger) => {
    mp.events.callRemote(cb, trigger);
});
let menu = new MainMenu("", false, "");
let menuPool = [];
menuPool.push(menu);
let build = false;
function openNativeMenu(menuTitle, data, append, headertype) {
    if (!build) {
        menu = new MainMenu(menuTitle, append, headertype);
        build = append;
    }
    for (let i = 0; i < data.length; i++) {
        const MenuObj = data[i];
        let MenuItem = null;
        if (MenuObj['Checkbox']) {
            MenuItem = new CheckboxMenuItem(MenuObj['Title'], Boolean(MenuObj['CheckboxData']), MenuObj['Description']);
            MenuItem.addOnClickEvent({
                trigger: data => {
                    mp.events.callRemote(MenuObj['CallBack'], MenuObj['Trigger'], data);
                }
            });
        }
        else if (MenuObj['List']) {
            const list = [];
            const listData = MenuObj['ListData'];
            for (let ii = 0; ii < listData.length; ii++) {
                list.push({ DisplayText: listData[ii]['Title'], idx: listData[ii]['BackData'] });
            }
            MenuItem = new ListMenuItem(MenuObj['Title'], list, parseInt(listData[0]['Select'], 10), MenuObj['Description']);
            MenuItem.addOnChangeEvent({
                trigger: data => {
                    mp.events.callRemote(MenuObj['CallBack'], data.idx);
                }
            });
            MenuItem.addOnClickEvent({
                trigger: data => {
                    if (MenuObj['IsQuestion']) {
                        mp.gui.cursor.show(true, true);
                        callHUD(BGWorker, ['Promt', MenuObj['CallBack'], MenuObj['Trigger'], MenuObj['QuestionTitel'], MenuObj['Question'], parseInt(MenuObj['Count']), MenuObj['PromtType'], MenuObj['Value']]);
                    }
                    else {
                        mp.events.callRemote(MenuObj['CallBack'], MenuObj['Trigger'] + data.idx);
                    }
                }
            });
        }
        else if (MenuObj['TriggerOnChange']) {
            let b = MenuObj['Badge'];
            if (b === -1)
                b = NaN;
            if (typeof MenuObj['Right'] !== "undefined" && MenuObj['Right'] !== null) {
                MenuItem = new TextMenuItem(MenuObj['Title'], MenuObj['OnChangeData'], MenuObj['Description'], parseInt(b), MenuObj['Right']);
            }
            else {
                MenuItem = new TextMenuItem(MenuObj['Title'], MenuObj['OnChangeData'], MenuObj['Description'], parseInt(b));
            }
            MenuItem.addOnSelectEvent({
                trigger: data => {
                    if (typeof MenuObj['OnChangeCB'] !== 'undefined' && typeof MenuObj['OnChangeCB'] !== null && MenuObj['OnChangeCB'] !== '')
                        mp.events.callRemote(MenuObj['OnChangeCB'], data);
                    else
                        mp.events.callRemote(MenuObj['CallBack'], data);
                }
            });
            MenuItem.addOnClickEvent({
                trigger: data => {
                    if (MenuObj['IsQuestion']) {
                        mp.gui.cursor.show(true, true);
                        callHUD(BGWorker, ['Promt', MenuObj['CallBack'], MenuObj['Trigger'], MenuObj['QuestionTitel'], MenuObj['Question'], parseInt(MenuObj['Count']), MenuObj['PromtType'], MenuObj['Value']]);
                    }
                    else {
                        mp.events.callRemote(MenuObj['CallBack'], MenuObj['Trigger']);
                    }
                }
            });
        }
        else if (MenuObj['Slider'] === true) {
            let b = MenuObj['Badge'];
            if (b === -1)
                b = NaN;
            MenuItem = new SliderMenuItem(MenuObj['Title'], MenuObj['MinStep'], MenuObj['MaxStep'], MenuObj['SliderStep'], MenuObj['SelectStep'], MenuObj['Description'], parseInt(b));
            MenuItem.addOnChangeEvent({
                trigger: data => {
                    mp.events.callRemote(MenuObj['CallBack'], MenuObj['Trigger'] + "_" + data);
                }
            });
        }
        else {
            let b = MenuObj['Badge'];
            if (b === -1)
                b = NaN;
            if (typeof MenuObj['Right'] !== "undefined" && MenuObj['Right'] !== null) {
                MenuItem = new TextMenuItem(MenuObj['Title'], MenuObj['Trigger'], MenuObj['Description'], parseInt(b), MenuObj['Right']);
            }
            else {
                MenuItem = new TextMenuItem(MenuObj['Title'], MenuObj['Trigger'], MenuObj['Description'], parseInt(b));
            }
            MenuItem.addOnClickEvent({
                trigger: data => {
                    if (MenuObj['IsQuestion']) {
                        mp.gui.cursor.show(true, true);
                        callHUD(BGWorker, ['Promt', MenuObj['CallBack'], data, MenuObj['QuestionTitel'], MenuObj['Question'], parseInt(MenuObj['Count']), MenuObj['PromtType'], MenuObj['Value']]);
                    }
                    else {
                        mp.events.callRemote(MenuObj['CallBack'], data);
                    }
                }
            });
        }
        menu.add(MenuItem);
    }
    if (!append) {
        build = false;
        if (!menu.isVisible) {
            menu.open();
        }
        mp.players.local.menuOpen = menu.isVisible;
    }
    menuPool.push(menu);
}
mp.events.add('closeMenu', () => {
    callHUD(HUD, ['closePage']);
    mp.events.callRemote("delColshape");
    mp.players.local.menuOpen = false;
    mp.players.local.openPage = false;
    if (menuPool[menuPool.length - 1].isVisible) {
        menu.close();
        build = false;
    }
    menuPool = [];
    menuPool.push(new MainMenu("", false));
    menuPool.push(new MainMenu("", false));
    menu.close();
});
mp.events.add('openNativUi', (menuTitle, data, append, headertype = "") => {
    let input = '';
    switch (typeof data) {
        case 'string': {
            input = `${data}`;
            break;
        }
        case 'number':
        case 'boolean': {
            input = `${data} `;
            break;
        }
        case 'object': {
            input = `${JSON.stringify(data)} `;
            break;
        }
        default:
            return;
    }
    openNativeMenu(menuTitle, JSON.parse(input), append, headertype);
});
mp.events.add('render', () => {
    try {
        const lastMenu = menuPool[menuPool.length - 1];
        lastMenu.render(0.90, 0.25);
    }
    catch (_a) {
        return;
    }
});
const ClothesTrash = [
    'prop_recyclebin_04_a',
    'prop_recyclebin_04_b'
];
mp.events.add('checkIsOldClothes', () => {
    const playerPos = mp.players.local.position;
    ClothesTrash.forEach(model => {
        const foundObject = mp.game.object.getClosestObjectOfType(playerPos.x, playerPos.y, playerPos.z, 1, mp.game.joaat(model), false, true, true);
        if (foundObject) {
            mp.events.callRemote("oldClothesOpen");
        }
    });
});
mp.players.local.inputBlocked = true;
mp.players.local.showPhone = false;
mp.players.local.cursor = false;
mp.players.local.phonephase = false;
let phonepasetimer = null;
let sPhone = null;
let phoneS = false;
mp.events.add('showPhone', (withphone = true) => {
    if (!mp.players.local.hascharachter)
        return;
    if (mp.players.local.Prisoner)
        return;
    if (mp.players.local.phonephase)
        return;
    if (!phoneS) {
        mp.events.callRemote("PhoneShowing", true);
        phoneS = true;
        callHUD(sPhone, ['SetPhoneOpen', 'open']);
        if (withphone) {
            mp.players.local.cursor = true;
            mp.gui.cursor.show(true, true);
            mp.players.local.inputBlocked = true;
            mp.events.callRemote("AnimationPlay", "inAnim");
            setTimeout(function () {
                player.clearTasks();
                mp.events.callRemote("AnimationPlay", "phoneOpen");
            }, 500);
        }
        else {
            mp.players.local.inputBlocked = false;
        }
        mp.players.local.showPhone = true;
        mp.players.local.phonephase = true;
        setTimeout(function () {
            mp.players.local.phonephase = false;
        }, 450);
    }
    else {
        callHUD(sPhone, ['SetPhoneOpen', 'close']);
        phoneS = false;
        mp.events.callRemote("AnimationPlay", "outAnim");
        mp.events.callRemote("PhoneShowing", false);
        if (!tabopp) {
            mp.players.local.cursor = false;
            mp.gui.cursor.show(false, false);
        }
        mp.players.local.showPhone = false;
        mp.players.local.inputBlocked = true;
        mp.events.call('stopSound');
        if (phonepasetimer === null) {
            phonepasetimer = setTimeout(function () {
                mp.events.callRemote("destroyObj");
                player.clearTasks();
                clearTimeout(phonepasetimer);
                phonepasetimer = null;
            }, 500);
        }
    }
});
mp.events.add('iAmTheCaller', () => {
    setTimeout(function () {
        callHUD(sPhone, ['iAmTheCaller']);
    }, 250);
});
mp.events.add('mousetoggle', () => {
    if (!mp.players.local.cursor) {
        mp.gui.cursor.show(true, true);
        mp.players.local.cursor = true;
    }
    else {
        mp.gui.cursor.show(false, false);
        mp.players.local.cursor = false;
    }
});
mp.events.add('hidePhone', () => {
    if (phoneS) {
        callHUD(sPhone, ['SetPhoneOpen', 'close']);
        phoneS = false;
        if (mp.players.local.cursor) {
            mp.events.callRemote("AnimationPlay", "outAnim");
        }
        mp.players.local.cursor = false;
        mp.players.local.showPhone = false;
        mp.gui.cursor.show(false, false);
        mp.events.callRemote("PhoneShowing", false);
        if (phonepasetimer === null) {
            phonepasetimer = setTimeout(function () {
                mp.events.callRemote("destroyObj");
                mp.events.callRemote("AnimationPlay", "stop");
                player.clearTasks();
                clearTimeout(phonepasetimer);
                phonepasetimer = null;
            }, 500);
        }
    }
});
mp.events.add('callPhone', (data) => {
    if (mp.players.local.isDeath)
        return;
    const obj = JSON.parse(data);
    if (!obj.calling) {
        player.clearTasks();
        mp.events.call('stopSound');
    }
    else {
        mp.events.call('stopSound');
    }
});
mp.events.add('stopCalling', (app) => {
    if (mp.players.local.isDeath)
        return;
    player.clearTasks();
    if (mp.players.local.showPhone) {
        mp.events.callRemote("AnimationPlay", "phoneOpen");
    }
});
mp.events.add('accept', () => {
    callHUD(sPhone, ['SetCallingState', 'none']);
    mp.players.local.showPhone = true;
    mp.players.local.inputBlocked = true;
    if (!mp.players.local.vehicle) {
        mp.events.callRemote("AnimationPlay", "calling");
    }
    else {
        mp.events.callRemote("AnimationPlay", "callingB");
    }
});
mp.events.add('finish', () => {
    if (mp.players.local.showPhone) {
        mp.players.local.inputBlocked = true;
        mp.events.callRemote("AnimationPlay", "phoneOpen");
    }
});
mp.events.add('note', (message) => {
    mp.events.callRemote('note', message);
});
mp.events.add('data', (info) => {
    callHUD(HUD, ['info', info]);
});
mp.events.add('picture', (message) => {
    mp.events.call('pictureNotify', "Information", "LC Smart Provider", "CHAR_CHAT_CALL", message, false, 1);
});
mp.events.add('sendtophone', (...args) => {
    switch (args.length) {
        case 1:
            callHUD(sPhone, [args[0]]);
            break;
        case 2:
            if (args[0] === "SendPhoneCall") {
                callHUD(sPhone, [args[0], args[1]]);
            }
            else if (args[0] === "SetNewMessage") {
                callHUD(sPhone, [args[0], args[1]]);
            }
            break;
        default:
            callHUD(sPhone, [args.join(',')]);
            break;
    }
});
mp.events.add('setNumber', (nummer) => {
    callHUD(sPhone, ['SetPhoneNumber', nummer]);
});
mp.events.add('phoneBookset', (data) => {
    callHUD(sPhone, ['setPhoneBook', data]);
});
mp.events.add('UpdateData', (datas) => {
    callHUD(sPhone, ['updateData', datas]);
});
mp.events.add('setSettings', (number, flight, secure, vol) => {
    callHUD(sPhone, ['setSettings', number, flight, secure, vol]);
});
mp.events.add('addContact', (data) => {
    const obj = JSON.parse(data);
    mp.events.callRemote("addContact", obj.name, obj.phone_number);
});
mp.events.add('updateContact', (data) => {
    const obj = JSON.parse(data);
    mp.events.callRemote("UpdateContact", obj.old_number, obj.oldname, obj.phone_number, obj.name);
});
mp.events.add('callServer', (data) => {
    try {
        JSON.parse(data);
    }
    catch (e) {
        mp.gui.chat.push(e);
        return;
    }
    const obj = JSON.parse(data);
    switch (obj[0]) {
        case 0:
            mp.events.callRemote(obj[1]);
            break;
        case 1:
            mp.events.callRemote(obj[1], obj[2]);
            break;
        case 2:
            mp.events.callRemote(obj[1], obj[2], obj[3]);
            break;
        case 3:
            mp.events.callRemote(obj[1], obj[2], obj[3], obj[4]);
            break;
        case 4:
            mp.events.callRemote(obj[1], obj[2], obj[3], obj[4], obj[5]);
            break;
        case 5:
            mp.events.callRemote(obj[1], obj[2], obj[3], obj[4], obj[5], obj[6]);
            break;
    }
});
mp.events.add('callServer2', (data) => {
    try {
        JSON.parse(data);
    }
    catch (e) {
        mp.gui.chat.push(e);
        return;
    }
    const obj = JSON.parse(data);
    switch (obj[0]) {
        case 0:
            mp.events.callRemote(obj[1]);
            break;
        case 1:
            mp.events.callRemote(obj[1], obj[2]);
            break;
        case 2:
            mp.events.callRemote(obj[1], obj[2] + "_" + obj[3]);
            break;
        case 3:
            mp.events.callRemote(obj[1], obj[2] + "_" + obj[3] + "_" + obj[4]);
            break;
    }
});
mp.events.add('render', () => {
    if (mp.players.local.openPage || mp.players.local.menuOpen)
        return;
    const controls = mp.game.controls;
    if (mp.players.local.showPhone) {
        controls.disableControlAction(0, 25, true);
        controls.disableControlAction(0, 172, true);
    }
    if (!mp.players.local.inputBlocked && !atwork) {
        controls.disableControlAction(0, 25, true);
        controls.disableControlAction(0, 24, true);
        if (controls.isControlJustPressed(0, 172)) {
            if (mp.players.local.getVariable('calling'))
                return;
            mp.events.callRemote('acceptCall');
            callHUD(sPhone, ['SetCallingState']);
            mp.players.local.inputBlocked = true;
        }
        else if (controls.isControlJustPressed(0, 173)) {
            if (mp.players.local.getVariable('calling'))
                return;
            mp.events.callRemote('abortCall');
            mp.players.local.inputBlocked = true;
        }
        if (controls.isDisabledControlJustPressed(0, 172)) {
            if (mp.players.local.getVariable('calling'))
                return;
            mp.events.callRemote('acceptCall');
            callHUD(sPhone, ['SetCallingState']);
            mp.players.local.inputBlocked = true;
        }
    }
    if (!mp.players.local.cursor && mp.players.local.showPhone) {
        controls.disableControlAction(0, 25, true);
        controls.disableControlAction(0, 173, true);
        if (controls.isDisabledControlJustPressed(0, 173) && mp.players.local.showPhone) {
            if (typeof mp.players.local.getVariable('calling') !== 'undefined') {
                if (mp.players.local.getVariable('calling') === 'null' || mp.players.local.getVariable('calling') === null) {
                    mp.events.callRemote('ShowPhone');
                }
                else {
                    mp.events.callRemote('abortCall');
                    mp.players.local.inputBlocked = true;
                }
            }
            else if (mp.players.local.getVariable('calling') === 'null') {
                mp.events.callRemote('ShowPhone');
                mp.players.local.inputBlocked = true;
            }
            else {
                mp.events.callRemote('ShowPhone');
            }
        }
    }
});
let taximeter = null;
mp.events.add('ShowTaximeter', (miles = 0, mouse = false) => {
    if (taximeter === null) {
        if (mouse) {
            mp.players.local.cursor = true;
            mp.gui.cursor.show(true, true);
        }
        taximeter = mp.browsers.new(`${useurl}/HUD/pages/taximeter/taximeter.html`);
        callHUD(taximeter, ['setMiles', miles]);
    }
});
mp.events.add('TaximeterOff', () => {
    if (taximeter !== null) {
        taximeter.destroy();
        taximeter = null;
        mp.players.local.cursor = false;
        mp.gui.cursor.show(false, false);
    }
});
mp.events.add('SetLastDriveStats', (meter) => {
    callHUD(taximeter, ['setMiles', meter]);
});
mp.events.add('TaximeterOn', (state) => {
    callHUD(taximeter, ['TaxiActive', state]);
});
mp.events.add('TaximeterToggle', () => {
    callHUD(taximeter, ['startTaxi']);
});
let TaxiMeter = 0, TaxiVerbrauch = 0, letztesUpdate2 = 0;
mp.events.add('render', () => {
    const Taxi = mp.players.local.vehicle;
    if (Taxi) {
        if (Taxi.getVariable("TaxiMeterOn") === 'null' || Taxi.getVariable("TaxiMeterOn") === null || Taxi.getVariable("TaxiMeterOn") === 'undefined')
            return;
        const kmh2 = (Taxi.getSpeed() * 3.6).toFixed(0);
        const AktuelleZeit2 = new Date().getTime();
        const updateDelta2 = AktuelleZeit2 - letztesUpdate2;
        const MeterProSekunde2 = (parseInt(kmh2) * 1000 / 3600);
        if (typeof Taxi.getVariable("TaxiMeterOn") !== 'undefined' && Taxi.getVariable("TaxiMeterOn") !== null) {
            if (Taxi.getVariable("TaxiMeterOn") === 'null' || Taxi.getVariable("TaxiMeterOn") === null)
                return;
            TaxiMeter = Taxi.getVariable("TaxiMeter");
            TaxiVerbrauch = MeterProSekunde2;
            if (updateDelta2 >= 1000) {
                letztesUpdate2 = AktuelleZeit2;
                TaxiMeter = TaxiMeter + TaxiVerbrauch;
                callHUD(taximeter, ['setMiles', TaxiMeter]);
                mp.events.callRemote("SetTaxiMeter", TaxiMeter);
            }
        }
    }
});
function pointingAt(distance, flag = 16) {
    if (mp.players.local.vehicle)
        return null;
    try {
        const camera = mp.cameras.new("gameplay");
        const position = mp.players.local.getBoneCoords(0, 0, 0, 0);
        const direction = camera.getDirection();
        const positioninfront = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
        const result = mp.raycasting.testPointToPoint(position, positioninfront, mp.players.local, flag);
        return result;
    }
    catch (_a) {
        return null;
    }
}
mp.events.add('help', (text, loop = false, beep = true, duration = 2000) => {
    mp.game.ui.setTextComponentFormat('STRING');
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.displayHelpTextFromStringLabel(0, loop, beep, duration);
});
mp.players.local.buckle = false;
let buckle = false;
function buckleuprender() {
    if (mp.players.local.buckle && mp.players.local.vehicle) {
        mp.game.controls.disableControlAction(0, 23, true);
        mp.game.controls.disableControlAction(0, 75, true);
    }
}
mp.events.add('render', buckleuprender);
mp.keys.bind(bindKeys.KEY_P, false, function () {
    if (!mp.players.local.vehicle)
        return;
    if (mp.players.local.showPhone)
        return;
    if (mp.players.local.isDeath || !mp.players.local.hascharachter || mp.chatIsOpen || mp.players.local.openPage ||
        mp.players.local.modalMenu || modal || mp.players.local.menuOpen || tabopp)
        return;
    if (!mp.players.local.buckle) {
        mp.events.call('blinkNoty', "~g~angeschnallt");
        mp.players.local.buckle = true;
        buckle = true;
    }
    else {
        mp.events.call('blinkNoty', "~r~abgeschnallt");
        buckle = false;
        mp.players.local.buckle = false;
    }
});
mp.events.add('engine', (state) => {
    const vehicle = mp.players.local.vehicle;
    if (!vehicle)
        return;
    if (state) {
        vehicle.setEngineOn(true, false, false);
    }
    else {
        vehicle.setEngineOn(false, false, true);
    }
});
mp.events.add('ChangeDoorState', (veh, door, state) => {
    try {
        const vehicle = mp.vehicles.atHandle(veh.handle);
        if (vehicle) {
            switch (state) {
                case true:
                    vehicle.setDoorOpen(door, false, false);
                    break;
                case false:
                    vehicle.setDoorShut(door, state);
                    break;
            }
        }
    }
    catch (_a) { }
});
mp.events.add('park', () => {
    const vehicle = mp.players.local.vehicle;
    if (vehicle) {
        player.taskVehicleDriveToCoord(vehicle.handle, 62.46808, 124.4743, 79.19239, 15, 1, vehicle.model, 3, 10, 1);
    }
});
mp.events.add('pressfkey', () => {
    const localPlayer = mp.players.local;
    if (!localPlayer.vehicle) {
        try {
            const raycastResult = pointingAt(3.25, 2);
            let model = mp.game.invoke(Native.GET_ENTITY_MODEL, raycastResult.entity);
            let handlem;
            if (model === 0 && raycastResult !== null) {
                handlem = raycastResult.entity.handle;
                model = mp.game.invoke(Native.GET_ENTITY_MODEL, handlem);
                const v = mp.vehicles.atHandle(raycastResult.entity.handle);
                if (v) {
                    if (!v.getVariable('locked')) {
                        mp.events.callRemote("enterVeh", 10000);
                        localPlayer.taskEnterVehicle(v.handle, 5000, -1, 1.0, 1, 0);
                    }
                    else
                        mp.game.graphics.notify("~r~Abgeschlossen");
                }
            }
            else {
                let found = false;
                mp.vehicles.forEachInStreamRange((vehicle) => {
                    const dist = distanceTo(localPlayer.position, vehicle.position);
                    if (!found && (localPlayer.isOnSpecificVehicle(vehicle.handle) || dist < 3.2)) {
                        found = true;
                        if (!vehicle.getVariable('locked')) {
                            mp.events.callRemote("enterVeh", 10000);
                            localPlayer.taskEnterVehicle(vehicle.handle, 5000, -1, 1.0, 1, 0);
                        }
                        else
                            mp.game.graphics.notify("~r~Abgeschlossen");
                    }
                });
            }
        }
        catch (_a) { }
    }
    else {
        if (!isCuffed && localPlayer.vehicle)
            localPlayer.taskLeaveVehicle(localPlayer.vehicle.handle, 64);
    }
});
mp.events.add('pressgkey', () => {
    const localPlayer = mp.players.local;
    if (!localPlayer.vehicle) {
        let seats = 0;
        let remoteId = 0;
        let isVehicleFound = false;
        try {
            const raycastResult = pointingAt(2.25, 2);
            let model = mp.game.invoke(Native.GET_ENTITY_MODEL, raycastResult.entity);
            let handlem;
            if (model === 0 && raycastResult !== null) {
                handlem = raycastResult.entity.handle;
                model = mp.game.invoke(Native.GET_ENTITY_MODEL, handlem);
                const vehicle = mp.vehicles.atHandle(raycastResult.entity.handle);
                if (vehicle) {
                    seats = vehicle.getMaxNumberOfPassengers();
                    remoteId = vehicle.remoteId;
                    if (seats < 1 || seats === 1) {
                        isVehicleFound = false;
                        if (!vehicle.getVariable('locked')) {
                            mp.events.callRemote("enterVeh", 10000);
                            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, 0, 2.0, 1, 0);
                        }
                        else
                            mp.game.graphics.notify("~r~Abgeschlossen");
                    }
                    else {
                        const seatsFree = [];
                        for (let i = 0; i < seats; i++) {
                            if (vehicle.isSeatFree(i)) {
                                seatsFree.push(i);
                            }
                        }
                        if (!vehicle.getVariable('locked')) {
                            mp.events.callRemote('OpeanSeats', JSON.stringify(seatsFree), remoteId);
                        }
                        else
                            mp.game.graphics.notify("~r~Abgeschlossen");
                    }
                }
            }
        }
        catch (_a) { }
    }
});
mp.events.add('takeSeat', (seatNum, remoteId) => {
    const vehicle = mp.vehicles.atRemoteId(remoteId);
    switch (seatNum) {
        case 0:
            mp.events.callRemote("enterVeh", 10000);
            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, seatNum, 2.0, 1, 0);
            break;
        case 1:
            mp.events.callRemote("enterVeh", 10000);
            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, seatNum, 2.0, 1, 0);
            break;
        case 2:
            mp.events.callRemote("enterVeh", 10000);
            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, seatNum, 2.0, 1, 0);
            break;
        default:
            mp.events.callRemote("enterVeh", 5000);
            mp.players.local.taskWarpIntoVehicle(vehicle.handle, seatNum);
            break;
    }
});
mp.events.add('closevehdoors', (veh) => {
    if (!veh)
        return;
    veh.setDoorsShut(true);
    mp.events.callRemote('server.vehicles.get.sync.doors', veh);
});
let prevVeh = null;
mp.events.add('vehcileShopCam', (prevPos, prevRot, prevVehPos) => {
    mp.players.local.cam = mp.cameras.new('default', prevPos, prevRot, 45);
    mp.players.local.cam.setCoord(prevPos.x, prevPos.y, prevPos.z);
    mp.players.local.cam.pointAtCoord(prevPos.x, prevPos.y, prevPos.z);
    mp.players.local.cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    callHUD(HUD, ['hudVis']);
    mp.game.ui.displayRadar(false);
    hudVis = false;
    mp.players.local.openPage = true;
});
mp.events.add('previewVehicle', (model, pos, rot) => {
    if (prevVeh != null) {
        prevVeh.destroy();
        prevVeh = null;
    }
    prevVeh = mp.vehicles.new(Number(mp.game.joaat(model)), new mp.Vector3(pos.x, pos.y, pos.z), {
        heading: rot,
        locked: true,
        engine: false,
        numberPlate: "Prev"
    });
    rotator.startent(prevVeh);
});
mp.events.add('closeVehicleShop', () => {
    if (prevVeh != null) {
        prevVeh.destroy();
        prevVeh = null;
    }
    rotator.stop();
    mp.game.cam.destroyAllCams(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.openPage = false;
    mp.players.local.openPage = false;
    callHUD(HUD, ['hudVis', true]);
    mp.game.ui.displayRadar(true);
    hudVis = true;
});
let deathCam = null;
let localplayer = mp.players.local;
let camera = mp.cameras.new('gameplay');
let campos = null;
mp.events.add('wasted', (p, life, status) => {
    const handle = mp.players.local.handle;
    const player = mp.players.atHandle(handle);
    const pos = player.position;
    const rot = player.heading;
    if (p === 'life') {
        if (!life) {
            mp.events.callRemote('wasted', 25, 2);
        }
        else {
            mp.events.callRemote('wasted', life, status);
        }
        mp.events.callRemote("AnimationPlay", "stop");
        mp.players.local.clearTasks();
        mp.game.cam.renderScriptCams(false, true, 0, true, false);
        if (deathCam != null) {
            deathCam.destroy(true);
            deathCam = null;
        }
        mp.game.ui.displayRadar(true);
        player.freezePosition(false);
        player.setInvincible(false);
        mp.players.local.isDeath = false;
        mp.players.local.menuOpen = false;
        mp.players.local.openPage = false;
        callHUD(HUD, ['hudVis', true]);
        callHUD(HUD, ['closePage']);
    }
    else if (p === 'revive') {
        mp.game.invoke('0xC0AA53F866B3134D', player);
        mp.game.invoke('0x2D03E13C460760D6', player);
        mp.game.invoke('0x21FFB63D8C615361', true);
        mp.game.invoke('0x2C2B3493FBF51C71', true);
        mp.game.invoke('0xDA66D2796BA33F12', true);
        mp.game.invoke('0x4A18E01DF2C87B86', false);
        mp.game.invoke('0xB69317BF5E782347', player);
        mp.game.invoke('0xEA23C49EAA83ACFB', pos.x, pos.y, pos.z, rot, false, false);
        mp.game.invoke('0x71BC8E838B9C6035', player);
        player.setInvincible(false);
        player.freezePosition(false);
        mp.players.local.isDeath = false;
        mp.players.local.menuOpen = false;
        mp.players.local.openPage = false;
        mp.game.cam.renderScriptCams(false, true, 1000, true, false);
        if (deathCam != null) {
            deathCam.destroy(true);
            deathCam = null;
        }
        mp.game.ui.displayRadar(true);
        setTimeout(() => {
            mp.events.callRemote('wasted', 100, 0);
            callHUD(HUD, ['hudVis', true]);
            callHUD(HUD, ['closePage']);
            mp.events.callRemote("AnimationPlay", "stop");
        }, 500);
    }
    else {
        if (parseInt(status, 10) !== 3) {
            mp.players.local.menuOpen = false;
            mp.players.local.openPage = false;
            mp.game.invoke('0xC0AA53F866B3134D', player);
            mp.game.invoke('0x2D03E13C460760D6', player);
            mp.game.invoke('0x21FFB63D8C615361', true);
            mp.game.invoke('0x2C2B3493FBF51C71', true);
            mp.game.invoke('0xDA66D2796BA33F12', true);
            mp.game.invoke('0x4A18E01DF2C87B86', false);
            mp.game.invoke('0xB69317BF5E782347', player);
            mp.game.invoke('0xEA23C49EAA83ACFB', pos.x, pos.y, pos.z, rot, false, false);
            mp.game.invoke('0x71BC8E838B9C6035', player);
            player.setInvincible(true);
            player.freezePosition(true);
            mp.events.callRemote('wasted', 25, 1);
            mp.players.local.isDeath = true;
            camera = mp.cameras.new('gameplay');
            campos = camera.getCoord();
            deathCam = mp.cameras.new('default', campos, mp.game.cam.getGameplayCamRot(2), 80);
            deathCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            deathCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
            mp.game.ui.displayRadar(false);
            callHUD(HUD, ['hudVis', false]);
            setTimeout(() => {
                mp.events.call('OpenPage', 'death');
                mp.events.callRemote("AnimationPlay", "isDeath");
            }, 500);
        }
        else if (parseInt(status, 10) === 3) {
            player.setInvincible(true);
            player.freezePosition(true);
            camera = mp.cameras.new('gameplay');
            campos = camera.getCoord();
            deathCam = mp.cameras.new('default', campos, mp.game.cam.getGameplayCamRot(2), 80);
            deathCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            deathCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
            mp.game.ui.displayRadar(false);
            setTimeout(() => {
                mp.events.callRemote("AnimationPlay", "isDeath");
            }, 500);
            mp.players.local.isDeath = true;
            callHUD(HUD, ['hudVis', false]);
        }
        else {
            mp.players.local.menuOpen = false;
            mp.players.local.openPage = false;
            mp.game.invoke('0xC0AA53F866B3134D', player);
            mp.game.invoke('0x2D03E13C460760D6', player);
            mp.game.invoke('0x21FFB63D8C615361', true);
            mp.game.invoke('0x2C2B3493FBF51C71', true);
            mp.game.invoke('0xDA66D2796BA33F12', true);
            mp.game.invoke('0x4A18E01DF2C87B86', false);
            mp.game.invoke('0xB69317BF5E782347', player);
            mp.game.invoke('0xEA23C49EAA83ACFB', pos.x, pos.y, pos.z, rot, false, false);
            mp.game.invoke('0x71BC8E838B9C6035', player);
            player.setInvincible(true);
            player.freezePosition(true);
            mp.events.callRemote('wasted', 25, 1);
            mp.players.local.isDeath = true;
            camera = mp.cameras.new('gameplay');
            campos = camera.getCoord();
            deathCam = mp.cameras.new('default', campos, mp.game.cam.getGameplayCamRot(2), 80);
            deathCam.pointAtCoord(player.position.x, player.position.y, player.position.z);
            deathCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
            mp.game.ui.displayRadar(false);
            callHUD(HUD, ['hudVis', false]);
            setTimeout(() => {
                mp.events.call('OpenPage', 'death');
                mp.events.callRemote("AnimationPlay", "isDeath");
            }, 500);
        }
    }
});
let delaycellphone = false;
mp.keys.bind(bindKeys.KEY_E, false, function () {
    if (!mp.players.local.hascharachter)
        return;
    if (mp.players.local.cursor)
        return;
    if (mp.players.local.vehicle)
        return;
    if (delaycellphone)
        return;
    try {
        if (!delaycellphone) {
            const atms = [
                'prop_atm_01', 'prop_atm_02', 'prop_atm_03', 'prop_fleeca_atm', 'gb_cashmachine02', 'gb_cashmachine01'
            ];
            const telcells = [
                'cj_ny_phone_1', 'cj_ny_phone_2', 'cj_ny_phone_3', 'cj_ny_phone_4', 'prop_phonebox_01a', 'prop_phonebox_01c',
                'prop_phonebox_01b', 'p_phonebox_02_s', 'prop_phonebox_03', 'prop_phonebox_04', 'prop_phonebox_02', 'prop_phonebox_01a'
            ];
            const raycastResult = pointingAt(2.25);
            let model = mp.game.invoke(Native.GET_ENTITY_MODEL, raycastResult.entity);
            let handlem;
            if (model === 0 && raycastResult !== null) {
                handlem = raycastResult.entity.handle;
                model = mp.game.invoke(Native.GET_ENTITY_MODEL, handlem);
            }
            let type = mp.game.invoke(Native.GET_ENTITY_TYPE, handlem);
            if (typeof raycastResult.entity === 'number' && raycastResult.entity !== 0) {
                type = mp.game.invoke(Native.GET_ENTITY_TYPE, raycastResult.entity);
            }
            let foundshitatmorcell = false;
            delaycellphone = true;
            switch (type) {
                case 0:
                case 3:
                    for (const modelType of atms) {
                        if (mp.game.joaat(modelType) === model) {
                            foundshitatmorcell = true;
                            setTimeout(() => {
                                mp.events.callRemote("OpenATM");
                            }, 150);
                        }
                        else if (mp.game.joaat(modelType) === IntToUint(model)) {
                            foundshitatmorcell = true;
                            setTimeout(() => {
                                mp.events.callRemote("OpenATM");
                            }, 150);
                        }
                    }
                    for (const modelType of telcells) {
                        if (mp.game.joaat(modelType) === model) {
                            foundshitatmorcell = true;
                            setTimeout(() => {
                                mp.events.callRemote('OpenCell', false);
                            }, 150);
                        }
                        else if (mp.game.joaat(modelType) === IntToUint(model)) {
                            foundshitatmorcell = true;
                            setTimeout(() => {
                                mp.events.callRemote('OpenCell', false);
                            }, 150);
                        }
                    }
                    break;
            }
            if (foundshitatmorcell) {
                setTimeout(() => {
                    delaycellphone = false;
                }, 500);
            }
            else {
                delaycellphone = false;
            }
        }
    }
    catch (_a) { }
});
let elevatora = null;
mp.events.add('openElevatorA', (id, og, arr) => {
    mp.players.local.openPage = true;
    if (elevatora === null) {
        mp.players.local.cursor = true;
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 150);
        elevatora = mp.browsers.new(`${useurl}/HUD/pages/elevator/index2.html`);
        if (elevatora !== null) {
            const etgages = JSON.stringify(arr);
            elevatora.execute(`init(${id},${og},${etgages})`);
        }
        mp.players.local.openPage = true;
    }
    else {
        elevatora.active = false;
        elevatora.destroy();
        elevatora = null;
        mp.players.local.cursor = false;
        setTimeout(() => {
            mp.gui.cursor.show(false, false);
        }, 150);
    }
});
mp.events.add('ElevatorStart', (id, og) => {
    setTimeout(() => {
        mp.game.ui.displayRadar(false);
    }, 320);
    mp.events.callRemote("ElevatorRun", parseInt(id), parseInt(og));
});
mp.events.add('closeElevator', () => {
    setTimeout(() => {
        mp.game.ui.displayRadar(true);
    }, 320);
    mp.events.callRemote("ElevatorStop");
    mp.players.local.openPage = false;
    if (elevatora !== null) {
        elevatora.active = false;
        elevatora.destroy();
        elevatora = null;
        mp.players.local.cursor = false;
        setTimeout(() => {
            mp.gui.cursor.show(false, false);
        }, 150);
    }
});

}