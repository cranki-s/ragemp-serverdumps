{
/** All animation-related natives for the player */
require("pools.js");

// all animation flags
const Flags = {
    Normal: 1,
    Loop: 2,
    Unk1: 4,
    Unk2: 8,
    UpperBody: 16,
    EnablePlayerControl: 32,
    Unk3: 64,
    Cancellable: 128,
    AdditiveAnimation: 256,
    DisableCollision: 512,
    DisableCollisionAndOffset: 1024,
    DisableCollisionAndPosition: 2048,
};

mp.game.streaming.requestClipSet = (name) => mp.game.invoke("0x3ACA4F727AC4606E", name);
const dictsUsed = ["anim@heists@box_carry@", "mp_bank_heist_1", "mp_arresting", "dead", "cellphone@", "random@arrests"];
for (dict of dictsUsed) {
    mp.game.streaming.requestAnimDict(dict);
}

// which things you can do while having a special action
const animationControls = {
    "CALL_PHONE": {sprint: true, hit: false, useVehicles: true, jump: false},
    "USE_PHONE": {sprint: false, hit: false, useVehicles: true, jump: false},
    "CARRY": {sprint: true, hit: false, useVehicles: false, jump: false},
    "USE_RADIO": {sprint: true, hit: false, useVehicles: true, jump: false},
    "CUFFED": {sprint: false, hit: false, useVehicles: false, jump: false}
}

// An extension of playAnimation that stops the animation
// gracefully after the given millis.
mp.rpc("animation:play", (playerId, dict, name, speed, flags, time) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p || p.handle === 0) return;
    let bitFlags = flags >>> 0;

    dict = dict.toLowerCase();
    name = name.toLowerCase();

    // ensure dictionary exists
    if (dict != "special" && !mp.game.streaming.doesAnimDictExist(dict)) return;
    if (dict != "special" && !mp.game.streaming.hasAnimDictLoaded(dict)) {
        mp.game.streaming.requestAnimDict(dict);
        setTimeout(() => {
            mp.events.call("animation:play", playerId, dict, name, speed, flags, time);
        }, 200);
        return;
    }

    if (time <= 0) time = -1; // taskPlayAnim assumes time -1 as infinite

    // if playing an anim while using a ladder, clear tasks so
    // the player falls.
    if (p.getIsTaskActive(1)) {
        p.clearTasksImmediately();
    }

    // special case: reload
    if (dict === "special") {
        if (name === "reload") {
            p.taskReloadWeapon(true);
        }
    } else {
        let rot = p.getRotation(2);
        if (!checkAnimationFlag(bitFlags, Flags.EnablePlayerControl)) {
            p.taskPlayAnimAdvanced(dict, name, p.position.x, p.position.y, p.position.z, rot.x, rot.y, rot.z, speed, speed, time, flags, 0, 0, 0);
        } else {
            p.taskPlayAnim(dict, name, speed, speed, time, flags, 0.0, true, true, true);
        }
    }

    // ensure anim: If the player isn't playing the anim 30ms before applying
    // it, clear the current task and re-apply.
    if (p.ensureAnimTimeout) {
        clearInterval(p.ensureAnimTimeout);
        p.ensureAnimTimeout = null;
    }
    if (!p.vehicle && (time <= 0 || time > 100) && dict !== "special") {
        p.ensureAnimTimeout = setTimeout(() => {
            p.ensureAnimTimeout = null;
            let p2 = mp.players.atRemoteId(playerId);
            if (!p2 || p2.vehicle) return;
            if (!p2.isPlayingAnim(dict, name, 3)) {
                // replay anim but this time forcefully
                p2.clearTasksImmediately();
                let rot = p2.getRotation(2);
                if (!checkAnimationFlag(bitFlags, Flags.EnablePlayerControl)) {
                    p2.taskPlayAnimAdvanced(dict, name, p2.position.x, p2.position.y, p2.position.z, rot.x, rot.y, rot.z, speed/2, speed/2, time, flags, 0, 0, 0);
                } else {
                    p2.taskPlayAnim(dict, name, speed/2, speed/2, time, flags, 0.0, true, true, true);
                }
            }
        }, 50);
    }
});

mp.rpc("animation:chatter", (type, id, time) => {
    let p = getEntityForKindAndId(type, id);
    if (!p || p.handle === 0) return;
    p.playFacialAnim("mic_chatter", "mp_facial");
    if (time !== 0) {
        setTimeout(() => {
            mp.events.call("animation:stop_chattering", type, id);
        }, time);
    }
});

mp.rpc("animation:stop_chattering", (type, id) => {
    let p = getEntityForKindAndId(type, id);
    if (!p || p.handle === 0) return;
    p.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});

// Like rage animation stop, but also supports non-immediate stop
mp.rpc("animation:stop", (playerId, immediate) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p || p.handle === 0) return;

    if (immediate) {
        p.clearTasksImmediately();
    } else {
        p.clearTasks();
    }
    if (p.ensureAnimTimeout) {
        clearInterval(p.ensureAnimTimeout);
        p.ensureAnimTimeout = null;
    }
});

function setWalkingStyle(player, style, tryNumber) {
    if (tryNumber > 20) return;
    if (!mp.players.exists(player) || player.handle === 0) {
        mp.console.logWarning(`cant set walkstyle for expired player object`)
        return
    }

    if (!style) {
        player.resetMovementClipset(0.7);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            setTimeout(() => {
                setWalkingStyle(player, style, tryNumber + 1);
            }, 100);
        }

        player.setMovementClipset(style, 0.7);
    }
}

mp.rpc("player:set_walk_style", (playerId, walkStyle) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p) return;

    if (p.handle) {
        setWalkingStyle(p, walkStyle == "" ? null : walkStyle, 0);
    }
    p.walkStyle = walkStyle
});

// implement special actions, aka "body animations", which can be combined with other animations.
// may use an extra "playerId" parameter to sync special actions among players.
mp.rpc("animation:set_special_action", (playerId, action) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p) return;
    if (action === "NONE" && p.specialAction !== "NONE" && p.handle) {
        // clear hands
        p.taskPlayAnim('amb@world_human_aa_smoke@male@idle_a', 'idle_a', 3, 3, 10, 48, 0.5, false, false, false)
    }

    p.specialAction = action;
});

mp.events.add("entityStreamOut", (entity) => {
    if (entity.type === 'player' && entity.specialAction !== undefined) {
        delete entity.specialAction;
    }
});

mp.setInterval(() => {
    mp.players.forEachInStreamRange(p => {
        if (mp.players.exists(p) && p.handle) {
            if (p.specialAction !== undefined && p.specialAction !== "NONE") {
                // don't allow to use ladders while using hands
                if (p.getIsTaskActive(1)) {
                    p.clearTasksImmediately();
                }

                let action = p.specialAction;
                if (action === "CALL_PHONE") {
                    if (!p.isPlayingAnim("cellphone@", "cellphone_text_to_call", 3)) {
                        p.taskPlayAnim("cellphone@", "cellphone_text_to_call", 3.0, -3, -1, 50, false, false, false, false);
                    }
                } else if (action === "USE_PHONE") {
                    if (!p.isPlayingAnim("cellphone@", "cellphone_text_in", 3)) {
                        p.taskPlayAnim("cellphone@", "cellphone_text_in", 3.0, -3, -1, 50, false, false, false, false);
                    }
                } else if (action === "USE_RADIO") {
                    if (!p.isPlayingAnim("random@arrests", "generic_radio_chatter", 3)) {
                        p.taskPlayAnim("random@arrests", "generic_radio_chatter", 3.0, -3, -1, 49, false, false, false, false);
                    }
                } else if (action === "CARRY") {
                    if (!p.isPlayingAnim("anim@heists@box_carry@", "idle", 3)) {
                        p.taskPlayAnim("anim@heists@box_carry@", "idle", 8.0, -8, -1, 49, false, false, false, false);
                    }
                } else if (action === "CUFFED") {
                    let libToPlay = "";
                    let animToPlay = "";
                    if (p.isPlayingAnim("mp_bank_heist_1", "prone_r_loop", 3)) {
                        libToPlay = "dead";
                        animToPlay = "dead_f";
                    } else {
                        libToPlay = "mp_arresting";
                        animToPlay = "idle";
                    }
                    if (!p.isPlayingAnim(libToPlay, animToPlay, 3)) {
                        p.taskPlayAnim(libToPlay, animToPlay, 8.0, -8, -1, 49, false, false, false, false);
                    }
                }
            }
        }
    });
}, 50);

mp.events.add("render", () => {
    let p = mp.players.local;

    // disable click-only fire always
    mp.game.controls.disableControlAction(0, 257, true);
    // disable cinematic camera while in vehicle
    mp.game.controls.disableControlAction(0, 80, true);
    // disable silent mode (duck)
    mp.game.controls.disableControlAction(0, 36, true);
    // disable X while on vehicles
    mp.game.controls.disableControlAction(0, 73, true);

    // disable jump, hit, enter vehicle and some more while playing a hand action.
    if (p.specialAction !== undefined && p.specialAction !== "NONE") {
        mp.game.controls.disableControlAction(0, 44, true); // cover
        mp.game.controls.disableControlAction(0, 45, true); // reload
        mp.game.controls.disableControlAction(0, 36, true); // duck

        let controls = animationControls[p.specialAction];
        if (controls) {
            if (!controls.sprint) {
                mp.game.controls.disableControlAction(0, 21, true); // space
            }
            if (!controls.hit) {
                mp.game.controls.disableControlAction(0, 24, true); // fire
                mp.game.controls.disableControlAction(0, 25, true); // aim
                mp.game.controls.disableControlAction(0, 50, true); // aim zoom
                mp.game.controls.disableControlAction(0, 140, true); // melee light
                mp.game.controls.disableControlAction(0, 141, true); // melee heavy
            }

            if (!controls.jump) {
                mp.game.controls.disableControlAction(0, 22, true);
            }

            if (!controls.useVehicles) {
                mp.game.controls.disableControlAction(0, 23, true);
            }
        }
    }
});

function checkAnimationFlag(flags, value) {
    return (flags & value) ? true : false;
}

// Animations system (with arrows change the current animation)

const PLAYER_LOCAL = mp.players.local;
const ANIMATIONS = {
    "anim@amb@nightclub@lazlow@hi_podium@" : {
        "dictname" : "anim@amb@nightclub@lazlow@hi_podium@",
        "variations" : ["danceidle_hi_13_crotchgrab_laz", "danceidle_li_11_bigbase_laz", "danceidle_hi_17_spiderman_laz"]
    },
    "anim@amb@nightclub@dancers@crowddance_groups@" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_groups@",
        "variations" : ["li_dance_crowd_13_v2_male^1", "li_dance_crowd_13_v2_male", "li_dance_crowd_15_v2_female^6"]
    },
    "timetable@tracy@ig_5@idle_a" : {
        "dictname" : "timetable@tracy@ig_5@idle_a",
        "variations" : ["idle_c", "idle_b", "idle_a"]
    },
    "timetable@tracy@ig_5@idle_b" : {
        "dictname" : "timetable@tracy@ig_5@idle_b",
        "variations" : ["idle_c", "idle_e", "idle_c"]
    },
    "anim@amb@casino@mini@dance@dance_solo@female@var_b@" : {
        "dictname" : "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
        "variations" : ["high_center", "high_center_down", "high_center_up"]
    },
    "anim@amb@nightclub@lazlow@ig1_vip@" : {
        "dictname" : "anim@amb@nightclub@lazlow@ig1_vip@",
        "variations" : ["clubvip_base_laz", "ambclub_to_clubvip_laz", "clubvip_to_ambclub_laz"]
    },
    "anim@amb@nightclub@mini@dance@dance_solo@male@var_a@" : {
        "dictname" : "anim@amb@nightclub@mini@dance@dance_solo@male@var_a@",
        "variations" : ["high_center", "high_center_down", "high_center_up"]
    },
    "anim@mp_player_intcelebrationfemale@air_synt" : {
        "dictname" : "anim@mp_player_intcelebrationfemale@air_synt",
        "variations" : ["air_synth", "air_synth_facial", "air_synth"]
    },
    "anim@amb@nightclub@dancers@crowddance_groups@" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_groups@",
        "variations" : ["hi_dance_crowd_09_v1_female^1", "hi_dance_crowd_09_v1_male^6", "hi_dance_crowd_13_v2_male^2"]
    },
    "anim@amb@nightclub@dancers@crowddance_groups@" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_groups@",
        "variations" : ["hi_dance_crowd_09_v1_female^1", "hi_dance_crowd_09_v1_male^6", "hi_dance_crowd_13_v2_male^2"]
    },
    "missfbi3_sniping" : {
        "dictname" : "missfbi3_sniping",
        "variations" : ["male_unarmed_a", "male_unarmed_b", "male_unarmed_a"]
    },
    "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
        "variations" : ["hi_dance_crowd_09_v1_female^1", "hi_dance_crowd_15_v2_male^3", "hi_dance_crowd_09_v1_male^1"]
    },
    "anim@amb@nightclub@dancers@crowddance_groups@low_intensity" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_groups@low_intensity",
        "variations" : ["li_dance_crowd_09_v1_female^1", "li_dance_crowd_09_v1_male^2", "li_dance_crowd_09_v1_male^6"]
    },
    "anim@amb@nightclub@dancers@crowddance_facedj@" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_facedj@",
        "variations" : ["hi_dance_facedj_09_v1_male^1", "hi_dance_facedj_09_v1_female^4", "hi_dance_facedj_09_v2_male^1"]
    },
    "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
        "variations" : ["hi_dance_facedj_09_v1_male^1", "hi_dance_facedj_09_v1_female^2", "hi_dance_facedj_09_v2_female^2"]
    },
    "move_clown@p_m_zero_idles@" : {
        "dictname" : "move_clown@p_m_zero_idles@",
        "variations" : ["fidget_look_at_oufit_a", "fidget_look_at_oufit_b", "fidget_short_dance"]
    },
    "anim@amb@casino@mini@dance@dance_solo@female@var_a@" : {
        "dictname" : "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
        "variations" : ["high_center", "high_center_down", "high_left"]
    },
    "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_hi_intensity" : {
        "dictname" : "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_hi_intensity",
        "variations" : ["trans_dance_facedj_hi_to_li_07_v1_female^3", "trans_dance_facedj_hi_to_li_07_v1_male^6", "trans_dance_facedj_hi_to_li_09_v1_female^6"]
    },
    "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@" : {
        "dictname" : "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
        "variations" : ["high_center", "high_center_down", "high_center_up"]
    },
    "anim@amb@nightclub@dancers@black_madonna_entourage@": {
        "dictname": "anim@amb@nightclub@dancers@black_madonna_entourage@",
        "variations": ["li_dance_facedj_11_v1_male^1", "hi_dance_facedj_09_v2_male^5", "li_dance_facedj_15_v2_male^2"]
    },
    "special_ped@mountain_dancer@monologue_2@monologue_2a": {
        "dictname": "special_ped@mountain_dancer@monologue_2@monologue_2a",
        "variations": ["mnt_dnc_buttwag", "mnt_dnc_buttwag", "mnt_dnc_angel"]
    },
}

let doingDict = "";
let doingVariation = "";
let currentSpeed = 1;

function isPlayingAnim() {
    let boolean = false;
    for (let index = 0; index < Object.values(ANIMATIONS).length; index++) {
        const element = Object.values(ANIMATIONS)[index];
        const dict = element.dictname;
        element.variations.forEach(variation => {
            if (PLAYER_LOCAL.isPlayingAnim(dict, variation, 3)) {
                doingDict = dict;
                doingVariation = variation;
                boolean = true;
            }
        });
    }
    return boolean
}

function applyAnim(dict, anim) {
    PLAYER_LOCAL.clearTasks();
    mp.game.streaming.requestAnimDict(dict);
    PLAYER_LOCAL.taskPlayAnim(dict, anim, 1.0, 1.0, -1, 1, 0.0, false, false, false);
    PLAYER_LOCAL.setAnimSpeed(doingDict, doingVariation, currentSpeed);
}

function speedAdd() {
    let newSpeed = (currentSpeed + 0.05);
    if (newSpeed <= 1.4) {
        currentSpeed = newSpeed
        PLAYER_LOCAL.setAnimSpeed(doingDict, doingVariation, currentSpeed);
    }
}

function speedRemove() {
    let newSpeed = (currentSpeed - 0.05);
    if (newSpeed >= 0.85) {
        currentSpeed = newSpeed
        PLAYER_LOCAL.setAnimSpeed(doingDict, doingVariation, currentSpeed);
    }
}

mp.keys.bind(0x6B, true, function() { //+ KEY
    if (isPlayingAnim()) {
        speedAdd();
    }
});

mp.keys.bind(0x6D, true, function() { //- KEY
    if (isPlayingAnim()) {
        speedRemove();
    }
});

mp.keys.bind(0x28, true, function() { //ARROW_DOWN
    if (isPlayingAnim()) {
        changeVariation(0)
    }
});

mp.keys.bind(0x25, true, function() { //ARROW_LEFT
    if (isPlayingAnim()) {
        changeVariation(1)
    }
});

mp.keys.bind(0x27, true, function() { //ARROW_RIGHT
    if (isPlayingAnim()) {
        changeVariation(2)
    }
});

function changeVariation(number) {
    let animLib = ANIMATIONS[doingDict];
    let variation = animLib.variations[number];
    if (variation !== doingVariation) {
        applyAnim(doingDict, variation);
        doingVariation = variation;
    }
}
}