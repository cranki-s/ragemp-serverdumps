{
﻿const BONES = {
    "SKEL_Head" : "31086", 
    "SKEL_Neck_1" : "39317",
    "SKEL_Spine3" : "24818",
    "SKEL_Pelvis" : "11816", 
    "SKEL_L_Thigh" : "58271", 
    "SKEL_R_Thigh" : "51826", 
    "SKEL_L_Foot" : "14201", 
    "SKEL_R_Foot" : "52301"
}

const BONE_NAMES = {
    "SKEL_Head" : "Голова", 
    "SKEL_Neck_1" : "Шея", 
    "SKEL_Spine3" : "Спина", 
    "SKEL_Pelvis" : "Пах", 
    "SKEL_L_Thigh" : "Левое бедро", 
    "SKEL_R_Thigh" : "Правое бедро",
    "SKEL_L_Foot" : "Левая нога", 
    "SKEL_R_Foot" : "Правая нога"
}

const BONE_NUMBER_TO_NAME = {
    31086 : "SKEL_Head", 
    39317 : "SKEL_Neck_1",
    24818 : "SKEL_Spine3",
    11816 : "SKEL_Pelvis", 
    58271 : "SKEL_L_Thigh", 
    51826 : "SKEL_R_Thigh", 
    14201 : "SKEL_L_Foot", 
    52301 : "SKEL_R_Foot",
}

function getBone(bone){
    if (typeof bone === "undefined") return 
    return BONES[bone]
}

function getBones(){
    return BONES
}

function getBoneData(){
    return {name : BONE_NAMES, number : BONE_NUMBER_TO_NAME, bone : BONES}
}

function getBoneNameFromNumber(number){
    if (typeof number === "undefined") return 
    return BONE_NUMBER_TO_NAME[number]
}

}