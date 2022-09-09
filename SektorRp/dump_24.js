{
let slotsBrowser = null;
let slotsRange = 1;
let slotsMinBet = 10;
let slotsMaxBet = 1000;
let slotMachines = [
    "vw_prop_casino_slot_01a",
    "vw_prop_casino_slot_02a",
    "vw_prop_casino_slot_03a",
    "vw_prop_casino_slot_04a",
    "vw_prop_casino_slot_05a",
    "vw_prop_casino_slot_06a",
    "vw_prop_casino_slot_07a",
    "vw_prop_casino_slot_08a",
];

function openSlots(minBet, maxBet){
	slotsBrowser = mp.browsers.new("package://RageServer/Casino/slots/cef/slotmachine/slots.html");
	mp.gui.cursor.show(true, true);
	
	slotsBrowser.execute(`limits.maximumBet = ${maxBet};`);
	slotsBrowser.execute(`limits.minimumBet = ${minBet};`);
	slotsBrowser.execute(`limits.currentBet = ${minBet};`);
	slotsBrowser.execute(`limits.interval   = ${minBet};`);
	slotsBrowser.execute(`document.getElementById("vStatus").innerHTML = "${minBet}";`);
}

let canSpin = true;
mp.events.add("client__slots_play", async function(bet){
    if(!canSpin) {
        mp.game.graphics.notify("~r~Warte bis der Spin beendet ist!");
        return;		
    }
    
    mp.events.callRemote("server__slots_requestSpin", bet);
    
    canSpin = false;
    await mp.game.waitAsync(5000);
    canSpin = true;
});

mp.events.add("client__slots_spin", function(num1, num2, num3, winnings){
    slotsBrowser.execute(`result('${JSON.stringify([num1, num2, num3, winnings])}')`);
});

mp.events.add("client__slots_notEnoughMoneyNotification", function(){
    mp.game.graphics.notify("~r~Du hast nicht genug Geld dabei!");
});

mp.events.add("client__slots_exit", exitCasino);
function exitCasino(fromKeybind = false) {
	if (slotsBrowser != null) {
		slotsBrowser.destroy();
		slotsBrowser = null;
		mp.gui.cursor.show(false, false);
        mp.events.callRemote("server__slots_exit");
        mp.players.local.casino = false;
        //@BitDEVil2K16: Please re-enable cell phone + animation controls here
        
        if (!fromKeybind)
            seatToNearestSlotMachine();
	}
}

nextToSlotMachine = function(player) {
    let lowestDist = 99.9;
    let lowestHandle = null;
    let lowestHash = null;
    
    for (let i = 0; i < slotMachines.length; i++) {
        const machineHash = slotMachines[i];
        let curHandle = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, slotsRange, mp.game.joaat(machineHash), false, true, true);

        if (curHandle) {
            let mpos = mp.game.invokeVector3("0x3FEF770D40960D5A", curHandle, true) // GET_ENTITY_COORDS
            let curDist = mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, mpos.x, mpos.y, mpos.z, true);
            
            if (curDist < lowestDist){
                lowestHandle = curHandle;
                lowestDist = curDist;
                lowestHash = machineHash;
            }  
        }
    };

    return (lowestHandle !== null ? {"handle": lowestHandle, "modelHash": lowestHash} : false);
}

let seatDecision = 0;
mp.events.add("client__slots_seatDecision", function(decision){
    seatDecision = decision;
    if (seatDecision == 2)
        mp.game.graphics.notify("~r~Du kannst Dich an diese Maschine nicht setzen!");
});


let sitting = false;
let doingAnim = false;
async function seatToNearestSlotMachine(){
    const player = mp.players.local;
   
    if (sitting){
        player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2048, 0, false, false, false);
        player.freezePosition(false);
        sitting = false;
        doingAnim = false;

        exitCasino(true);
    }else if(!doingAnim){
        let machine = nextToSlotMachine(player);

        if (machine){
            doingAnim = true;
            let mpos = mp.game.invokeVector3("0x3FEF770D40960D5A", machine.handle, true) // GET_ENTITY_COORDS
            let mrot = mp.game.invokeVector3("0xAFBD61CC738D9EB9", machine.handle, 2); // GET_ENTITY_ROTATION
            
            let machineObject = mp.objects.new(mp.game.joaat(machine.modelHash), mpos, {
                rotation: mrot,
                alpha: 0,
                dimension: 0
            });  
            
            while(machineObject.getBoneIndexByName("Chair_Base_01") == -1)
                await mp.game.waitAsync(0);
            
            let boneIndex = machineObject.getBoneIndexByName("Chair_Base_01");
            const bonePos = machineObject.getWorldPositionOfBone(boneIndex);
            let boneRot = mp.game.invokeVector3("0xCE6294A232D03786", machineObject.handle, boneIndex);
            let animPos = mp.game.ped.getAnimInitialOffsetPosition("anim_casino_b@amb@casino@games@shared@player@", "sit_enter_left", bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);
            let animRot = mp.game.ped.getAnimInitialOffsetRotation("anim_casino_b@amb@casino@games@shared@player@", "sit_enter_left", bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);

            seatDecision = 0;
            mp.events.callRemote("server__slots_tryPlayerSeat", mpos);
            
            while (seatDecision == 0)
                await mp.game.waitAsync(0);
            
            if (seatDecision == 1){
                player.taskGoStraightToCoord(animPos.x, animPos.y, animPos.z, 1.0, 5000, animRot.z, 0.01);
             
                while (!(player.getScriptTaskStatus(2106541073) == 7 || player.isAtCoord(animPos.x, animPos.y, animPos.z, 0.1, 0.0, 0.0, false, true, 0)))
                    await mp.game.waitAsync(0);

                player.position = new mp.Vector3( animPos.x, animPos.y, animPos.z);
                player.setRotation(0, 0, mrot.z, 2,false);
                player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_enter_left", 3.0, 1.0, -1, 2050, 0, false, false, false);
                player.freezePosition(true);
                
                machineObject.destroy();
                machineObject = null;
                
                await mp.game.waitAsync(2000);

                openSlots(slotsMinBet, slotsMaxBet);
                sitting = true
                mp.players.local.casino = true;
                //@BitDEVil2K16: Please disable cell phone + cancel animation controls here
            }
            
            doingAnim = false;
        }
    }
    
    
}
mp.keys.bind(0x45, false, seatToNearestSlotMachine); // E
}