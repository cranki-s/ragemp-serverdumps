{
const localPlayer = mp.players.local;
var lastHealth = 0;
var lastArmor = 0;

var injuredHP=66;
var injuredAnim="move_m@drunk@moderatedrunk";

var criticalHP=33;
var criticalAnim="move_m@drunk@verydrunk";

var damagedFXOn = false;

var fallenHP=10;
var fallenState=false;
var fallenStateWAnimG = "move_injured_ground";
var fallenStateWAnimC = "front_loop";
var fallenStateSAnimG = "move_injured_ground";
var fallenStateSAnimC = "front_loop";

walkingWounds(localPlayer, null);

var estadoOK=true;
var crawling=false;

var flagDisableRegeneration=true;
var flagInfoText=false;
var flagRagdollOnHighDamage=false;

var rotationSpeed=0.5;
var animationSpeed=5;
var fallenInterval;
var fallenIntervalSpeed=10;
var crackingInterval;
var vendasInterval = null;
var pastisInterval = null;
var vendasTimeout = null;
var pastisTimeout = null;

var beatIn=false;
var d = new Date();
var n = d.getTime();

var myBones = [];
//COLUMNA
myBones.push({nombre: "SKEL_ROOT",          ID: 0,      acumulado:0, zona: "Torso",             detalle: "Torso (Root)"});//*
myBones.push({nombre: "SKEL_Head",          ID: 31086,  acumulado:0, zona: "Cabeza",            detalle: "Cabeza"});
myBones.push({nombre: "SKEL_Neck_1",        ID: 39317,  acumulado:0, zona: "Cabeza",            detalle: "Cuello"});
myBones.push({nombre: "SKEL_Spine_Root",    ID: 57597,  acumulado:0, zona: "Torso",             detalle: "Columna vertebral (Root)"});//*
myBones.push({nombre: "SKEL_Spine0",        ID: 23553,  acumulado:0, zona: "Torso",             detalle: "Columna vertebral"});
myBones.push({nombre: "SKEL_Spine1",        ID: 24816,  acumulado:0, zona: "Torso",             detalle: "Columna vertebral"});
myBones.push({nombre: "SKEL_Spine2",        ID: 24817,  acumulado:0, zona: "Torso",             detalle: "Columna vertebral"});
myBones.push({nombre: "SKEL_Spine3",        ID: 24818,  acumulado:0, zona: "Torso",             detalle: "Columna vertebral"});
myBones.push({nombre: "SKEL_Pelvis",        ID: 11816,  acumulado:0, zona: "Torso",             detalle: "Pelvis"});
//LADO IZQUIERDO
myBones.push({nombre: "SKEL_L_Clavicle",    ID: 64729,  acumulado:0, zona: "Torso",             detalle: "Clavicula izquierda"});
myBones.push({nombre: "SKEL_L_UpperArm",    ID: 45509,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Brazo"});
myBones.push({nombre: "SKEL_L_Forearm",     ID: 61163,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Antebrazo"});
myBones.push({nombre: "SKEL_L_Hand",        ID: 18905,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Mano"});
myBones.push({nombre: "SKEL_L_Thigh",       ID: 58271,  acumulado:0, zona: "Pierna izquierda",  detalle: "Muslo"});
myBones.push({nombre: "SKEL_L_Calf",        ID: 63931,  acumulado:0, zona: "Pierna izquierda",  detalle: "Pierna"});
myBones.push({nombre: "SKEL_L_Foot",        ID: 14201,  acumulado:0, zona: "Pierna izquierda",  detalle: "Pie"});
myBones.push({nombre: "SKEL_L_Toe0",        ID: 2108,   acumulado:0, zona: "Pierna izquierda",  detalle: "Dedo gordo"});
myBones.push({nombre: "SKEL_L_Finger00",    ID: 26610,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 00"});//*
myBones.push({nombre: "SKEL_L_Finger01",    ID: 4089,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 01"});//*
myBones.push({nombre: "SKEL_L_Finger02",    ID: 4090,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 02"});//*
myBones.push({nombre: "SKEL_L_Finger10",    ID: 26611,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 10"});//*
myBones.push({nombre: "SKEL_L_Finger11",    ID: 4169,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 11"});//*
myBones.push({nombre: "SKEL_L_Finger12",    ID: 4170,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 12"});//*
myBones.push({nombre: "SKEL_L_Finger20",    ID: 26612,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 20"});//*
myBones.push({nombre: "SKEL_L_Finger21",    ID: 4185,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 21"});//*
myBones.push({nombre: "SKEL_L_Finger22",    ID: 4186,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 22"});//*
myBones.push({nombre: "SKEL_L_Finger30",    ID: 26613,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 30"});//*
myBones.push({nombre: "SKEL_L_Finger31",    ID: 4137,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 31"});//*
myBones.push({nombre: "SKEL_L_Finger32",    ID: 4138,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 32"});//*
myBones.push({nombre: "SKEL_L_Finger40",    ID: 26614,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 40"});//*
myBones.push({nombre: "SKEL_L_Finger41",    ID: 4153,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 41"});//*
myBones.push({nombre: "SKEL_L_Finger42",    ID: 4154,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Dedo 42"});//*
//LADO DERECHO
myBones.push({nombre: "SKEL_R_Clavicle",    ID: 10706,  acumulado:0, zona: "Torso",             detalle: "Clavicula izquierda"});
myBones.push({nombre: "SKEL_R_UpperArm",    ID: 40269,  acumulado:0, zona: "Brazo derecho",     detalle: "Brazo"});
myBones.push({nombre: "SKEL_R_Forearm",     ID: 28252,  acumulado:0, zona: "Brazo derecho",     detalle: "Antebrazo"});
myBones.push({nombre: "SKEL_R_Hand",        ID: 57005,  acumulado:0, zona: "Brazo derecho",     detalle: "Mano"});
myBones.push({nombre: "SKEL_R_Thigh",       ID: 51826,  acumulado:0, zona: "Pierna derecha",    detalle: "Muslo"});
myBones.push({nombre: "SKEL_R_Calf",        ID: 36864,  acumulado:0, zona: "Pierna derecha",    detalle: "Pierna"});
myBones.push({nombre: "SKEL_R_Foot",        ID: 52301,  acumulado:0, zona: "Pierna derecha",    detalle: "Pie"});
myBones.push({nombre: "SKEL_R_Toe0",        ID: 20781,  acumulado:0, zona: "Pierna derecha",    detalle: "Dedo gordo"});
myBones.push({nombre: "SKEL_R_Finger00",    ID: 58866,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 00"});//*
myBones.push({nombre: "SKEL_R_Finger01",    ID: 64016,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 01"});//*
myBones.push({nombre: "SKEL_R_Finger02",    ID: 64017,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 02"});//*
myBones.push({nombre: "SKEL_R_Finger10",    ID: 58867,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 10"});//*
myBones.push({nombre: "SKEL_R_Finger11",    ID: 64096,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 11"});//*
myBones.push({nombre: "SKEL_R_Finger12",    ID: 64097,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 12"});//*
myBones.push({nombre: "SKEL_R_Finger20",    ID: 58868,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 20"});//*
myBones.push({nombre: "SKEL_R_Finger21",    ID: 64112,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 21"});//*
myBones.push({nombre: "SKEL_R_Finger22",    ID: 64113,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 22"});//*
myBones.push({nombre: "SKEL_R_Finger30",    ID: 58869,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 30"});//*
myBones.push({nombre: "SKEL_R_Finger31",    ID: 64064,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 31"});//*
myBones.push({nombre: "SKEL_R_Finger32",    ID: 64065,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 32"});//*
myBones.push({nombre: "SKEL_R_Finger40",    ID: 58870,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 40"});//*
myBones.push({nombre: "SKEL_R_Finger41",    ID: 64080,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 41"});//*
myBones.push({nombre: "SKEL_R_Finger42",    ID: 64081,  acumulado:0, zona: "Brazo derecho",     detalle: "Dedo 42"});//*
//FACIAL+FB
myBones.push({nombre: "FACIAL_facialRoot",  ID: 65068,  acumulado:0, zona: "Cabeza",            detalle: "Cara (Root)"});//*
myBones.push({nombre: "FB_R_Brow_Out_000",  ID: 1356,   acumulado:0, zona: "Cabeza",            detalle: "Frente, lado derecho"});
myBones.push({nombre: "FB_L_Brow_Out_000",  ID: 58331,  acumulado:0, zona: "Cabeza",            detalle: "Frente, lado izquierdo"});
myBones.push({nombre: "FB_Brow_Centre_000", ID: 37193,  acumulado:0, zona: "Cabeza",            detalle: "Frente"});
myBones.push({nombre: "FB_R_Lip_Corner_000",ID: 11174,  acumulado:0, zona: "Cabeza",            detalle: "Labio, comisura derecha"});
myBones.push({nombre: "FB_L_Lip_Corner_000",ID: 29868,  acumulado:0, zona: "Cabeza",            detalle: "Labio, comisura izquierda"});
myBones.push({nombre: "FB_LowerLipRoot_000",ID: 17188,  acumulado:0, zona: "Cabeza",            detalle: "Labio inferior"});
myBones.push({nombre: "FB_LowerLip_000",    ID: 20623,  acumulado:0, zona: "Cabeza",            detalle: "Labio inferior"});
myBones.push({nombre: "FB_R_Lip_Top_000",   ID: 17719,  acumulado:0, zona: "Cabeza",            detalle: "Labio superior derecho"});
myBones.push({nombre: "FB_L_Lip_Top_000",   ID: 20279,  acumulado:0, zona: "Cabeza",            detalle: "Labio superior izquierdo"});
myBones.push({nombre: "FB_R_Lip_Bot_000",   ID: 49979,  acumulado:0, zona: "Cabeza",            detalle: "Labio inferior derecho"});
myBones.push({nombre: "FB_L_Lip_Bot_000",   ID: 47419,  acumulado:0, zona: "Cabeza",            detalle: "Labio inferior izquierdo"});
myBones.push({nombre: "FB_UpperLip_000",    ID: 61839,  acumulado:0, zona: "Cabeza",            detalle: "Labio superior"});
myBones.push({nombre: "FB_UpperLipRoot_000",ID: 20178,  acumulado:0, zona: "Cabeza",            detalle: "Labio superior"});
myBones.push({nombre: "FB_R_CheekBone_000", ID: 19336,  acumulado:0, zona: "Cabeza",            detalle: "Pomulo derecho"});
myBones.push({nombre: "FB_L_CheekBone_000", ID: 21550,  acumulado:0, zona: "Cabeza",            detalle: "Pomulo izquierdo"});
myBones.push({nombre: "FB_R_Lid_Upper_000", ID: 43536,  acumulado:0, zona: "Cabeza",            detalle: "Parpado derecho"});
myBones.push({nombre: "FB_L_Lid_Upper_000", ID: 45750,  acumulado:0, zona: "Cabeza",            detalle: "Parpado izquierdo"});
myBones.push({nombre: "FB_R_Eye_000",       ID: 27474,  acumulado:0, zona: "Cabeza",            detalle: "Ojo derecho"});
myBones.push({nombre: "FB_L_Eye_000",       ID: 25260,  acumulado:0, zona: "Cabeza",            detalle: "Ojo izquierdo"});
myBones.push({nombre: "FB_Jaw_000",         ID: 46240,  acumulado:0, zona: "Cabeza",            detalle: "Mandibula"});
myBones.push({nombre: "FB_Tongue_000",      ID: 47495,  acumulado:0, zona: "Cabeza",            detalle: "Lengua"});
//MH+IK+PH+RB
myBones.push({nombre: "MH_R_Knee",          ID: 16335,  acumulado:0, zona: "Pierna derecha",    detalle: "Rodilla"});
myBones.push({nombre: "MH_R_Elbow",         ID: 2992,   acumulado:0, zona: "Brazo derecho",     detalle: "Codo"});
myBones.push({nombre: "MH_L_Knee",          ID: 46078,  acumulado:0, zona: "Pierna izquierda",  detalle: "Rodilla"});
myBones.push({nombre: "MH_L_Elbow",         ID: 22711,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Codo"});
myBones.push({nombre: "IK_Head",            ID: 12844,  acumulado:0, zona: "Cabeza",            detalle: "Cabeza"});
myBones.push({nombre: "IK_Root",            ID: 56604,  acumulado:0, zona: "Torso",             detalle: "Torso (Root)"});//*
myBones.push({nombre: "IK_R_Hand",          ID: 6286,   acumulado:0, zona: "Brazo derecho",     detalle: "Mano"});
myBones.push({nombre: "IK_R_Foot",          ID: 35502,  acumulado:0, zona: "Pierna derecha",    detalle: "Pie"});
myBones.push({nombre: "IK_L_Hand",          ID: 36029,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Mano"});
myBones.push({nombre: "IK_L_Foot",          ID: 65245,  acumulado:0, zona: "Pierna izquierda",  detalle: "Pie"});
myBones.push({nombre: "PH_R_Hand",          ID: 28422,  acumulado:0, zona: "Brazo derecho",     detalle: "Mano"});
myBones.push({nombre: "PH_R_Foot",          ID: 24806,  acumulado:0, zona: "Pierna derecha",    detalle: "Pie"});
myBones.push({nombre: "PH_L_Hand",          ID: 60309,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Mano"});
myBones.push({nombre: "PH_L_Foot",          ID: 57717,  acumulado:0, zona: "Pierna izquierda",  detalle: "Pie"});
myBones.push({nombre: "RB_Neck_1",          ID: 35731,  acumulado:0, zona: "Cabeza",            detalle: "Cuello"});
myBones.push({nombre: "RB_L_ArmRoll",       ID: 5232,   acumulado:0, zona: "Brazo izquierdo",   detalle: "Brazo"});
myBones.push({nombre: "RB_L_ForeArmRoll",   ID: 61007,  acumulado:0, zona: "Brazo izquierdo",   detalle: "Antebrazo"});
myBones.push({nombre: "RB_L_ThighRoll",     ID: 23639,  acumulado:0, zona: "Pierna izquierda",  detalle: "Muslo"});
myBones.push({nombre: "RB_R_ArmRoll",       ID: 37119,  acumulado:0, zona: "Brazo derecho",     detalle: "Brazo"});
myBones.push({nombre: "RB_R_ForeArmRoll",   ID: 43810,  acumulado:0, zona: "Brazo derecho",     detalle: "Antebrazo"});
myBones.push({nombre: "RB_R_ThighRoll",     ID: 6442,   acumulado:0, zona: "Pierna derecha",    detalle: "Muslo"});

var animsSkins = [];
animsSkins.push({nombre: "a_c_boar"});
animsSkins.push({nombre: "a_c_cat_01"});
animsSkins.push({nombre: "a_c_chickenhawk"});
// animsSkins.push({nombre: "a_c_chimp"});//
animsSkins.push({nombre: "a_c_chop"});
animsSkins.push({nombre: "a_c_cormorant"});
animsSkins.push({nombre: "a_c_cow"});
animsSkins.push({nombre: "a_c_coyote"});
animsSkins.push({nombre: "a_c_crow"});
animsSkins.push({nombre: "a_c_deer"});
animsSkins.push({nombre: "a_c_dolphin"});
animsSkins.push({nombre: "a_c_fish"});
animsSkins.push({nombre: "a_c_sharkhammer"});
animsSkins.push({nombre: "a_c_hen"});
animsSkins.push({nombre: "a_c_humpback"});
animsSkins.push({nombre: "a_c_husky"});
animsSkins.push({nombre: "a_c_killerwhale"});
animsSkins.push({nombre: "a_c_mtlion"});
// animsSkins.push({nombre: "ig_orleans"});//
// animsSkins.push({nombre: "cs_orleans"});//
animsSkins.push({nombre: "a_c_pig"});
animsSkins.push({nombre: "a_c_pigeon"});
animsSkins.push({nombre: "a_c_poodle"});
animsSkins.push({nombre: "a_c_pug"});
animsSkins.push({nombre: "a_c_rabbit_01"});
animsSkins.push({nombre: "a_c_rat"});
animsSkins.push({nombre: "a_c_retriever"});
// animsSkins.push({nombre: "a_c_rhesus"});//
animsSkins.push({nombre: "a_c_rottweiler"});
animsSkins.push({nombre: "a_c_seagull"});
animsSkins.push({nombre: "a_c_shepherd"});
animsSkins.push({nombre: "a_c_stingray"});
animsSkins.push({nombre: "a_c_sharktiger"});
animsSkins.push({nombre: "a_c_westy"});

mp.events.add("render", () => {
    if (!logueado) return;

    if(flagDisableRegeneration)
        mp.game.player.setHealthRechargeMultiplier(0.0);

    var healthLoss = 0;
    var armorLoss = 0;
    var currentHP = localPlayer.getHealth();
    var currentAR = localPlayer.getArmour();
    var currentModel = localPlayer.model;
    var currentModelOK = ValidModel(currentModel);


    if(lastArmor >= currentAR) {
        armorLoss = lastArmor - currentAR;
    }
    if(lastHealth >= currentHP) {
        healthLoss = lastHealth - currentHP;
    }

    if(healthLoss>1)
    {

        let infoHit="Has recibido ("+healthLoss+") daño";

        if(!fallenState && ((healthLoss+armorLoss)>=(currentHP+currentAR)) && flagRagdollOnHighDamage)
        {
            if (!(arrastrado || arrastrando || enmaletero || estaMuerto)) {
                mp.gui.chat.push("No aguantas y pierdes el equilibrio.");
                localPlayer.setToRagdoll(5000, 5000, 0, false,false,false);
            }
        }

        var currentBone = localPlayer.getLastDamageBone(-1);

        for( var i = 0; i < myBones.length; i++)
        {
            if (myBones[i].ID === currentBone) 
            {
                infoHit = infoHit + " en: "+myBones[i].ID+" ("+myBones[i].nombre+")";
                myBones[i].acumulado=myBones[i].acumulado+healthLoss;
            }
        }

        infoHit = infoHit+".";
        if(flagInfoText)
            mp.gui.chat.push(infoHit);
    }

    if(currentHP<=0)//PLAYER MUERTO
    {
        if(fallenState)
        {
            if (!(arrastrado || arrastrando || enmaletero || estaMuerto)) {
                localPlayer.stopAnimPlayback(0, false);
                //mp.events.callRemote("parar_animacion");
            }
            ResetFallenState();
        }
        estadoOK=false;
    }
    if(currentHP>0 && currentHP<=fallenHP)//PLAYER CAIDO
    {
        if(!fallenState && currentModelOK)
        {
            if (!(arrastrado || arrastrando || enmaletero || estaMuerto)) {
                localPlayer.stopAnimPlayback(0, false);
                mp.events.callRemote("parar_animacion");
                StartCrawling();
            }
            fallenState=true;
            Cracking();
            if(!localPlayer.vehicle && !(arrastrado || arrastrando || enmaletero || estaMuerto))
            {
                loadAnim(fallenStateWAnimG).then(_ => {
                    localPlayer.taskPlayAnim(fallenStateWAnimG, fallenStateWAnimC, animationSpeed, animationSpeed, -1, 2, 1.0, false, false, false)
                });
            }
        }
        estadoOK=false;
    }
    else if(currentHP>fallenHP && currentHP<=criticalHP)//PLAYER EN ESTADO CRITICO
    {
        if(fallenState) ResetFallenState();
        walkingWounds(localPlayer,criticalAnim);
        estadoOK=false;
    }
    else if(currentHP>criticalHP && currentHP<=injuredHP)//PLAYER EN ESTADO HERIDO
    {
        if(fallenState) ResetFallenState();
        if (!(arrastrado || arrastrando || enmaletero || estaMuerto)) {
            walkingWounds(localPlayer,injuredAnim);
        }
        estadoOK=false;
    }
    else if (currentHP>injuredHP && !estadoOK)//PLAYER EN ESTADO OK
    {
        if(fallenState) ResetFallenState();
        //walkingWounds(localPlayer);
        //resetWounds(true);
        estadoOK=true;
    }
    if(!estadoOK)
    {
        mp.game.graphics.setTimecycleModifier("REDMIST_blend");
        let force = (100-currentHP)/100;
        mp.game.graphics.setTimecycleModifierStrength(force);
        if(!damagedFXOn)
            damagedFXOn=true;
    }
    else if(damagedFXOn)
    {
        mp.game.graphics.setTimecycleModifierStrength(0)
        damagedFXOn=false;
    }

    lastHealth = currentHP;
    lastArmor  = currentAR;
    localPlayer.clearLastDamageBone();
});

function Cracking()
{
    crackingInterval = setInterval(function(){
        var newHP = localPlayer.getHealth() - 1;
        mp.gui.chat.push("!{#7C1717}Te encuentras más debil..."); 
        mp.events.callRemote("cracking_nuevoHP",newHP);
    }, 60000);
}

function ResetFallenState()
{
    fallenState = false;
    if (!(arrastrado || arrastrando || enmaletero || estaMuerto)) {
        localPlayer.stopAnimPlayback(0, false);
    }
    clearInterval(fallenInterval);
    clearInterval(crackingInterval);
}

function ValidModel(currentSkin)
{
    for( var i = 0; i < animsSkins.length; i++)
    {
        if ( currentSkin == mp.game.joaat(animsSkins[i].nombre)) 
        {
            return false;
        }
    }
    return true;
}

function MostrarHeridas(mostrar=true)
{
    let infoheridas = "No existen heridas reseñables.";
    let infoHeridasReturn = "No existen heridas reseñables.";

    var dmgHead=0;
    var dmglArm=0;
    var dmgrArm=0;
    var dmglLeg=0;
    var dmgrLeg=0;
    var dmgAux=0;

    for( var i = 0; i < myBones.length; i++)
    {
        if (myBones[i].acumulado > 0) 
        {
            switch (myBones[i].zona)
            {
                case "Cabeza":           dmgHead = dmgHead+myBones[i].acumulado; break;
                case "Brazo izquierdo":  dmglArm = dmglArm+myBones[i].acumulado; break;
                case "Brazo derecho":    dmgrArm = dmgrArm+myBones[i].acumulado; break;
                case "Pierna izquierda": dmglLeg = dmglLeg+myBones[i].acumulado; break;
                case "Pierna derecha":   dmgrLeg = dmgrLeg+myBones[i].acumulado; break;
                default:                 dmgAux  = dmgAux +myBones[i].acumulado; break;
            }
        }
    }

    if(dmgHead==0 && dmglArm==0 && dmgrArm==0 && dmglLeg==0 && dmgrLeg==0 && dmgAux==0){
        if(mostrar)mp.gui.chat.push(infoheridas);
        return infoHeridasReturn;
    }
    else
    {
        if(mostrar)mp.gui.chat.push("Estos son los daños:");
        infoHeridasReturn="Estos son los daños:";
        if(dmgHead>0){
            infoheridas=calcGravedad(dmgHead);
            if(mostrar)mp.gui.chat.push(infoheridas+"la cabeza.");     
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"la cabeza."
        }
        if(dmglArm>0){
            infoheridas=calcGravedad(dmglArm);
            if(mostrar)mp.gui.chat.push(infoheridas+"el brazo izquierdo.");        
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"el brazo izquierdo."
        }
        if(dmgrArm>0){
            infoheridas=calcGravedad(dmgrArm);
            if(mostrar)mp.gui.chat.push(infoheridas+"el brazo derecho.");  
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"el brazo derecho."
        }
        if(dmglLeg>0){
            infoheridas=calcGravedad(dmglLeg);
            if(mostrar)mp.gui.chat.push(infoheridas+"la pierna izquierda.");
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"la pierna izquierda."
        }
        if(dmgrLeg>0){
            infoheridas=calcGravedad(dmgrLeg);
            if(mostrar)mp.gui.chat.push(infoheridas+"la pierna derecha.");
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"la pierna derecha."
        }
        if(dmgAux>0){
            infoheridas=calcGravedad(dmgAux);
            if(mostrar)mp.gui.chat.push(infoheridas+"el torso.");  
            infoHeridasReturn=infoHeridasReturn+"\n"+infoheridas+"el torso."
        }
        return infoHeridasReturn;
    }
}

function FXActivo(fxName)
{
    return mp.game.graphics.getScreenEffectIsActive(fxName);
}

function sleep(ms) {
  return new Promise(resolve => crearTimeout(resolve, ms));
}

function calcGravedad(value)
{
    var gravedad = "Daños";
    if(value<10) gravedad=gravedad+" !{Green}leves";
    else if(value<25) gravedad=gravedad+" !{Yellow}notables";
    else if(value<50) gravedad=gravedad+" !{Orange}graves";
    else gravedad=gravedad+" !{Red}criticos";
    return gravedad+" !{White}en ";
}

function resetWounds(resetValues)
{

    mp.game.graphics.setTimecycleModifierStrength(0)
    damagedFXOn=false;
    walkingWounds(localPlayer);
    if(resetValues)
    {
        for( var i = 0; i < myBones.length; i++)
        {
            if (myBones[i].acumulado > 0) 
            {
                myBones[i].acumulado = 0;
            }
        }
    }
}

async function walkingWounds(player, style) {
    if (!style) {
        player.resetMovementClipset(0.0);
    } 
    else {

        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            while (!mp.game.streaming.hasClipSetLoaded(style)) await mp.game.waitAsync(0);
        }
        player.setMovementClipset(style, 0.0);
    }
}

const loadAnim = (anim) => {
    return new Promise(resolve => {
        mp.game.streaming.requestAnimDict(anim)
        const timer = setInterval(() => {
            if (mp.game.streaming.hasAnimDictLoaded(anim)) {
                clearInterval(timer);
                resolve();
            }
        }, 100)
    })
}

function StartCrawling()
{
    fallenInterval = setInterval(() => {
        d = new Date();
        if(d.getTime()>n+1000)
        {
            if(!beatIn)
            {
                mp.game.audio.playSound(-1, "Short_Transition_In", "PLAYER_SWITCH_CUSTOM_SOUNDSET", true, 0, true);
            }
            else
            {
                mp.game.audio.playSound(-1, "Short_Transition_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET", true, 0, true);
            }
            beatIn=!beatIn;
            n = d.getTime();
        }
        if(fallenState && !localPlayer.vehicle)
        {
            //W
            if (mp.keys.isDown(87) === true && !crawling) {
                crawling=true;
                loadAnim(fallenStateWAnimG).then(_ => {
                    localPlayer.taskPlayAnim(fallenStateWAnimG, fallenStateWAnimC, animationSpeed, animationSpeed, -1, 1, 1, false, false, false)
                });
            } else if(mp.keys.isUp(87) && crawling){
                crawling=false;
                loadAnim(fallenStateSAnimG).then(_ => {
                    localPlayer.taskPlayAnim(fallenStateSAnimG, fallenStateSAnimC, animationSpeed, animationSpeed, -1, 2, 1, false, false, false)
                });
            }
            //D
            else if (mp.keys.isDown(68) === true && !crawling){
                localPlayer.setHeading(localPlayer.getHeading()-rotationSpeed);
                loadAnim(fallenStateSAnimG).then(_ => {
                    localPlayer.taskPlayAnim(fallenStateSAnimG, fallenStateSAnimC, animationSpeed, animationSpeed, -1, 2, 1, false, false, false)
                });
            }
            //A
            else if (mp.keys.isDown(65) === true && !crawling){
                localPlayer.setHeading(localPlayer.getHeading()+rotationSpeed);
                loadAnim(fallenStateSAnimG).then(_ => {
                    localPlayer.taskPlayAnim(fallenStateSAnimG, fallenStateSAnimC, animationSpeed, animationSpeed, -1, 2, 1, false, false, false)
                });
            }
            else
            {
                if(!localPlayer.isPlayingAnim(fallenStateWAnimG, fallenStateWAnimC, 3))
                {
                    loadAnim(fallenStateWAnimG).then(_ => {
                        localPlayer.taskPlayAnim(fallenStateWAnimG, fallenStateWAnimC, animationSpeed, animationSpeed, -1, 2, 1.0, false, false, false)
                    });
                }
            }
        }
    }, fallenIntervalSpeed);
}

mp.events.add({
    resetLocalWounds: (id) => {
        //CHECKEAR ID?
        resetWounds(true);
    },
    resetsistemaheridas: () => { //SE EJECUTA CUANDO TIRAS /nomuerte 
        if(fallenState) ResetFallenState();
	    resetWounds(true);
	    //mp.gui.chat.push("!{Yellow}((Tu registro de heridas se ha reseteado))");//Descomentar cuando sea necesario un debug.
	},
	mostrarHeridas: () => {
	    MostrarHeridas();
	},
	mostrarHeridasA: (destinatario) => {
		let misHeridas = MostrarHeridas(false);
        mp.events.callRemote("enviar_info_heridas",destinatario,misHeridas);

	},
	mostrarHeridasDe: (infoheridas) => {
        let infoarray = infoheridas.split("\n");
        for( var i = 0; i < infoarray.length; i++)
        {
            mp.gui.chat.push(infoarray[i]);
        }
	},
    resetAnimJeringa: () =>{
        sleep(1000).then(() => { mp.events.callRemote("parar_animacion"); });
    },
    resetAnimTimed: (resettime) =>{
        sleep(resettime).then(() => { mp.events.callRemote("parar_animacion"); });
    },

    healedByJeringa: () =>{
        sleep(1000).then(() => { mp.events.callRemote("jeringa_nuevoHP"); });
    },
    heridasVendas: () => {
        intervaloVendas();
    },
    heridasPastillas: () => {
        intervaloPastillas();
    },
    resetIntervals: () => {
        if(pastisInterval != null){
            clearInterval(pastisInterval);
        }
        if(vendasInterval != null){
            clearInterval(vendasInterval);
        }
        if(pastisTimeout != null){
            clearTimeout(pastisTimeout);
        }
        if(vendasTimeout != null){
            clearTimeout(vendasTimeout);
        }
    }
})

function getDistance(pos1,pos2)
{
    let distance = mp.game.gameplay.getDistanceBetweenCoords(pos1.x,pos1.y,pos1.z, pos2.x,pos2.y,pos2.z, true);
    return distance;
}

function intervaloVendas() {
    if (vendasInterval == null) {
        vendasInterval = setInterval(() => {
            mp.events.callRemote("heridas_setHPadd", 3);
        }, 3000)
        vendasTimeout = crearTimeout(() => {
            clearInterval(vendasInterval);
            vendasInterval = null;
            vendasTimeout = null;
        }, 30500)
    } else {
        clearInterval(vendasInterval);
        clearTimeout(vendasTimeout);
        vendasInterval = null;
        vendasTimeout = null;
        intervaloVendas();
    }
}

function intervaloPastillas() {
    if (pastisInterval == null) {
        pastisInterval = setInterval(() => {
            mp.events.callRemote("heridas_setHPadd", 1);
        }, 3000)
        pastisTimeout = crearTimeout(() => {
            clearInterval(pastisInterval);
            pastisInterval = null;
            pastisTimeout = null;
        }, 30500)
    } else {
        clearInterval(pastisInterval);
        clearTimeout(pastisTimeout);
        pastisInterval = null;
        pastisTimeout = null;
        intervaloPastillas();
    }
}
}