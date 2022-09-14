{
let HOLSTER_ATTACHMENT = {
    "handgun":  [{name: "Body Holster", hash : "534382381"}, {name : "Single Holster", hash : "3125389411"}], 
    "submachine gun":  [{name: "Body Holster (White)", hash : "1674224970"}, {name: "Body Holster (Leather)", hash : "1359588858"}],
    "shotgun":  [{name: "Body Holster (White)", hash : "1674224970"}, {name: "Body Holster (Leather)", hash : "1359588858"}],
    "assault rifle":  [{name: "Body Holster (White)", hash : "1674224970"}, {name: "Body Holster (Leather)", hash : "1359588858"}],
    "sniper rifle":  [{name: "Body Holster (White)", hash : "1674224970"}, {name: "Body Holster (Leather)", hash : "1359588858"}],
    "heavy weapon":  [{name: "Body Holster (White)", hash : "1674224970"}, {name: "Body Holster (Leather)", hash : "1359588858"}],
}

let HandgunBodyHolster = {offset : new mp.Vector3(-0.0640, -0.0240, 0.0160), rotation : new mp.Vector3(182.0, 92.0, 11.0)}
let LongGunBodyHolsterO = {offset : new mp.Vector3(-0.0120, -0.0260, 0.0040), rotation : new mp.Vector3(179.5, 93.0, 11.0)}
let LongGunBodyHolsterW = {offset : new mp.Vector3(-0.0600, -0.0360, 0.0240), rotation : new mp.Vector3(182.0, 92.0, 11.0)}
let SingleHolster = {offset : new mp.Vector3(0.1540, 0.09, -0.0880), rotation : new mp.Vector3(242.0, 92.0, 181.5)}

let DEFAULT_HOLSTER = {
    1674224970: { bone: getBone("SKEL_Spine3"), offset: LongGunBodyHolsterW.offset, rotation: LongGunBodyHolsterW.rotation, visible: false},
    1359588858: { bone: getBone("SKEL_Spine3"), offset: LongGunBodyHolsterO.offset, rotation: LongGunBodyHolsterO.rotation, visible: false},
    3125389411: { bone: getBone("SKEL_L_Thigh"), offset: SingleHolster.offset, rotation: SingleHolster.rotation, visible: false},
    534382381: { bone: getBone("SKEL_Spine3"), offset: HandgunBodyHolster.offset, rotation: HandgunBodyHolster.rotation, visible: false},
}

function getHolster(group){
    if (typeof group !== "string") return 
    return HOLSTER_ATTACHMENT[group]
}

function getDefaultHolster(hash){
    if (typeof hash === "undefined") return 
    return DEFAULT_HOLSTER[parseInt(hash)]
}
}