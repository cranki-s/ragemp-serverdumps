{
﻿BoneData = require('./gtalife/BodyWeaponAttachment/Constants/BoneData.js');

let Pistol = {offset : new mp.Vector3(0.02, 0.06, 0.1), rotation : new mp.Vector3(-100.0, 0.0, 0.0)}
let Melee = {offset : new mp.Vector3(0.08, 0.03, -0.1), rotation : new mp.Vector3(-80.77, 0.0, 0.0)}
let Unknown = {offset : new mp.Vector3(0.08, 0.03, -0.1), rotation : new mp.Vector3(-80.77, 0.0, 0.0)}
let Throwable = {offset : new mp.Vector3(0.08, 0.03, -0.1), rotation : new mp.Vector3(-80.77, 0.0, 0.0)}
let Submachine = {offset : new mp.Vector3(0.08, 0.03, -0.1), rotation : new mp.Vector3(-80.77, 0.0, 0.0)}
let Shotgun = {offset : new mp.Vector3(-0.1, -0.15, 0.11), rotation : new mp.Vector3(-180.0, 0.0, 0.0)}
let Rifle = {offset : new mp.Vector3(-0.1, -0.15, -0.13), rotation : new mp.Vector3(0.0, 0.0, 3.5)}
let Sniper = {offset : new mp.Vector3(-0.1, -0.15, -0.13), rotation : new mp.Vector3(0.0, 0.0, 3.5)}
let Heavy = {offset : new mp.Vector3(-0.1, -0.15, -0.13), rotation : new mp.Vector3(0.0, 0.0, 3.5)}


let DEFAULT_ATTACHMENT = {
    "melee": { bone: getBone("SKEL_L_Thigh"), offset: Melee.offset, rotation: Melee.rotation, visible: false},
    "unknown": { bone: getBone("SKEL_L_Thigh"), offset: Unknown.offset, rotation: Unknown.rotation, visible: false },
    "throwable": { bone: getBone("SKEL_L_Thigh"), offset: Throwable.offset, rotation: Throwable.rotation, visible: false },
    "handgun": { bone: getBone("SKEL_R_Thigh"), offset: Pistol.offset, rotation: Pistol.rotation , visible: false},
    "submachine gun": { bone: getBone("SKEL_L_Thigh"), offset: Submachine.offset, rotation: Submachine.rotation, visible: false },
    "shotgun": { bone: getBone("SKEL_Spine3"),  offset: Shotgun.offset, rotation: Shotgun.rotation, visible: true},
    "assault rifle": { bone : getBone("SKEL_Spine3"), offset: Rifle.offset, rotation :  Rifle.rotation, visible: true },
    "sniper rifle": { bone : getBone("SKEL_Spine3"), offset: Sniper.offset, rotation :  Sniper.rotation, visible: true },
    "heavy weapon": { bone : getBone("SKEL_Spine3"), offset: Heavy.offset, rotation :  Heavy.rotation, visible: true },
}

function getDefault(category){
    if (typeof category === "undefined") return 
    return DEFAULT_ATTACHMENT[category]
}
}