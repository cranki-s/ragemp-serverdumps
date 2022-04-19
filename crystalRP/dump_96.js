{
let usingMachine = false;
let vendingObject = null;
let vendingType = null;
let machineModel = null; 
let usingVendingPlayers = [];
let usingVendings = {};
let sprunkObject = false;
let openedInfo = false;
const NATIVES = {
    SET_PED_CURRENT_WEAPON_VISIBLE : "0x0725A4CCFDED9A70",
    SET_PED_STEALTH_MOVEMENT : "0x88CBB5CEB96B7BD2",
    TASK_LOOK_AT_ENTITY : "0x69F4BE8C8CC4796C",
    GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS : "0x1899F328B0E12848",
    SET_PED_FAST_ANIMATIONS : "0x2208438012482A1A",
    RELEASE_AMBIENT_AUDIO_BANK : "0x65475A218FFAA93D",
}
const ANIM_DICT = "MINI@SPRUNK@FIRST_PERSON";
const ANIM_EAT_DICT = "amb@code_human_wander_eating_donut@female@base static";
const VENDING_MACHINES = [
    "prop_vend_soda_01",
    "prop_vend_soda_02"
]
const VENDING_EAT_MACHINES = [
    "prop_vend_snak_01",
    "prop_vend_snak_01_tu"
]
class VendingMachine {
    static getNearestVendingHandle(player){
        vendingObject = null;
        vendingType = null;
        VENDING_MACHINES.forEach(machine => {
            var handle = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 0.6, mp.game.joaat(machine), false, false, false);
            if(handle != 0){
                vendingObject = mp.objects.newWeak(handle);
                vendingType = "water";
            }
        });
        if (vendingObject == null) {
            VENDING_EAT_MACHINES.forEach(machine => {
                var handle = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 0.6, mp.game.joaat(machine), false, false, false);
                if(handle != 0){
                    vendingObject = mp.objects.newWeak(handle);;
                    vendingType = "eat";
                }
            });
        }
    }
    static checkInUse() {
        for (var key in usingVendings) {
            if (usingVendings.hasOwnProperty(key)) {           
                if(vendingObject.handle == usingVendings[key])
                    return false;
            }
        }
        return true;
    }
    static tryBuySprunk(){
        if(usingMachine)
            return;
        this.getNearestVendingHandle(mp.players.local);
        if(vendingObject == null || vendingType == null)
            return;
        if(!this.checkInUse())
            return;
        mp.events.callRemote("buyVendingSprunk", vendingType);

    }
    static activateVendingMachine(player) {
        if(vendingObject == null || vendingType == null)
            return;
        let offset = vendingObject.getOffsetFromInWorldCoords(0.0, -0.97, 0.05);
        if(player == mp.players.local){
            usingMachine = true;
        }
        mp.game.streaming.requestAnimDict(ANIM_DICT);
        mp.game.audio.requestAmbientAudioBank("VENDING_MACHINE", false);
        mp.game.invoke(NATIVES.SET_PED_CURRENT_WEAPON_VISIBLE, player.handle, false, true, true, false);
        mp.game.invoke(NATIVES.SET_PED_STEALTH_MOVEMENT, player.handle, false, "DEFAULT_ACTION");
        mp.game.invoke(NATIVES.TASK_LOOK_AT_ENTITY, player.handle, vendingObject.handle, 2000, 2048, 2);
        player.setResetFlag(322, true);
        player.taskGoStraightToCoord(offset.x, offset.y, offset.z, 1, 2000, vendingObject.getHeading(), 0.1);
        usingVendingPlayers.push(player);
        usingVendings[player] = vendingObject.handle;
        setTimeout(() => {
            player.taskPlayAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT1", 2, -4, -1, 1048576, 0, false, false, false);
        }, 2000);            
    }
}

mp.keys.bind(Keys.VK_E, false, function () {
    VendingMachine.tryBuySprunk();
});

mp.events.add({
    'activateVendingMachine' : (player)=>{
        VendingMachine.getNearestVendingHandle(player);
        VendingMachine.activateVendingMachine(player);
    },
});

setInterval(() => {
    usingVendingPlayers.forEach((player) => {
        checkAnim(player);
    });
}, 10);

function checkAnim(player){
    if(player.isPlayingAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT1", 1)){
        if(player.getAnimCurrentTime(ANIM_DICT, "PLYR_BUY_DRINK_PT1") > 0.1) {
            if(player == mp.players.local && !sprunkObject && vendingType != null){
                mp.events.callRemote("attachVendingSprunk", vendingType);
                sprunkObject = true;
            }
        }
        if(player.getAnimCurrentTime(ANIM_DICT, "PLYR_BUY_DRINK_PT1") > 0.98) {
            player.taskPlayAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT2", 4, -1000, -1, 1048576, 0, false, false, false);
            mp.game.invoke(NATIVES.SET_PED_FAST_ANIMATIONS, player.handle, false, false);
        }
    }
    if (player.isPlayingAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT2", 1)) {
        if (player.getAnimCurrentTime(ANIM_DICT, "PLYR_BUY_DRINK_PT2") > 0.98) {
            player.taskPlayAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT3", 1000, -4, -1, 1048576, 0, false, false, false);
            mp.game.invoke(NATIVES.SET_PED_FAST_ANIMATIONS, player.handle, false, false);
        }
    }
    if(player.isPlayingAnim(ANIM_DICT, "PLYR_BUY_DRINK_PT3", 1)) {
        if(player.getAnimCurrentTime(ANIM_DICT, "PLYR_BUY_DRINK_PT3") > 0.306) {
            if(player == mp.players.local && sprunkObject){
                mp.events.callRemote("deattachVendingSprunk");
                sprunkObject = false;
            }
        }
        if(player.getAnimCurrentTime(ANIM_DICT, "PLYR_BUY_DRINK_PT3") > 0.9) {
            if(player == mp.players.local){
                usingMachine = false;
                if(sprunkObject){
                    mp.events.callRemote("deattachVendingSprunk");
                    sprunkObject = false;
                }
            }
            mp.game.invoke(NATIVES.SET_PED_FAST_ANIMATIONS, player.handle, false, false);
            if (vendingType != null && vendingType == "water")
                mp.game.invoke(NATIVES.RELEASE_AMBIENT_AUDIO_BANK);
            let index = usingVendingPlayers.indexOf(player);
            usingVendingPlayers.splice(index, 1);
            if(usingVendings.hasOwnProperty(player)){
                delete usingVendings[player];
            }
        }
    }
}
}