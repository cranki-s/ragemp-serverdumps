{
let actionInterval = null;
let actionTime = 0;
let actionType = "none";

let maxActionTime = 0;


mp.events.add("StartPlayerAction", (action, time) => {
    if(mp.players.local.getVariable("Wounded") > 0){
        return;
    }
    actionTime = time;
    actionType = action;
    maxActionTime = time;
    switch(action){
        case "medkit":
            MedkitAction();
            break;
        case "painkiller":
            PainkillerAction();
            break;
        default: return;
    }
});

mp.events.add("StopPlayerActions", () => {
    switch(actionType){
        case "medkit":
            mp.events.callRemote("clear_anim");
            clearInterval(actionInterval);
            break;
        case "painkiller":
            clearInterval(actionInterval);
            break;
        default: return;
    }
    actionType = "none";
    actionTime = 0;
    maxActionTime = 0;
    actionInterval = null;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);
})

function PainkillerAction(){
    if(mp.players.local == null || mp.players.local.handle == 0) return;

    if(mp.players.local.getVariable("Wounded") > 0) return;

    if(!mp.players.local.isInAnyVehicle(true))
        mp.events.callRemote("play_anim", "mini@sprunk", "plyr_buy_drink_pt2", 0, 8.0, 0.0, -1, 0.0, false, false, false);

    actionInterval = setInterval(() => {

        if(mp.players.local == null || mp.players.local.handle == 0){
            clearInterval(actionInterval);
            return;
        }
        if(mp.players.local.getVariable("Wounded") > 0){
            clearInterval(actionInterval);
            return;
        }

        try{
            mp.events.callRemote("OnPlayerActionTick");
            if(actionTime <= 0){
                mp.events.callRemote("FinishPlayerAction", actionType);
                ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);
                clearInterval(actionInterval);
            }
            else{
                actionTime--;

                if(!mp.players.local.isInAnyVehicle(true))
                {
                    if(actionTime == 39){
                        mp.events.callRemote("play_anim", "mini@sprunk", "plyr_buy_drink_pt3", 0, 8.0, 0.0, -1, 0.0, false, false, false);
                    }
                    if(actionTime == 38){            
                        mp.events.callRemote("clear_anim");
                    }
                }
            }
        } finally { }
    }, 1000);   
}

function initiateActionTimer(startTime){
    maxActionTime = startTime;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.maxtime = ${startTime}`);
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = 0`);
    //ServerUI.execute(`gm.$refs.actionbar.fugitive = ${(mp.players.local.getVariable("Team") == 0 ? true : false)}`);
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = true;`);
}

function MedkitAction(){
    if(mp.players.local == null || mp.players.local.handle == null) return;
    mp.events.callRemote("play_anim", "amb@medic@standing@kneel@enter", "enter", 0, 8.0, 0.0, -1, 0.0, false, false, false);

    initiateActionTimer(actionTime);
    if(mp.players.local.getVariable("Wounded") > 0){
        return;
    }

    actionInterval = setInterval(() => {

        if(mp.players.local == null || mp.players.local.handle == null) return;
        if(mp.players.local.getVariable("Wounded") > 0){
            clearInterval(actionInterval);
            return;
        }
        try{
            mp.events.callRemote("OnPlayerActionTick");
            if(actionTime <= 0){
                mp.events.callRemote("clear_anim");
                mp.events.callRemote("FinishPlayerAction", actionType);
                ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);
                ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = 0;`);
                clearInterval(actionInterval);
            }
            else{
                actionTime--;           
                ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = ${((maxActionTime - actionTime) == 0 ? 0 : (maxActionTime - actionTime))}`);
                if(actionTime == 1){
                    mp.events.callRemote("play_anim", "amb@medic@standing@kneel@exit", "exit", 0, 8.0, 0.0, -1, 0.0, false, false, false);
                }
            }
        } finally { }
    }, 1000);
}

// ------ H KEY ------ //
let reviveTarget = null;
let reviveTime = 7;
let reviveTimer = null;
mp.keys.bind(0x48, true, onHoldHkey);
function onHoldHkey()
{
    if(mp.players.local.getVariable("Wounded") > 0){
        return;
    }

    if(canRevive())
    {
        mp.players.forEach(pl => {
            if(pl.getVariable("Team") == mp.players.local.getVariable("Team"))
            {
                if(pl.getVariable("Wounded") == 2)
                {
                    if(pl.remoteId != mp.players.local.remoteId)
                    {
                        if(pl.getVariable("BeingRevived") == false)
                        {
                            let distance = calcDist(mp.players.local.position, pl.position);
                            if(distance < 5)
                            {
                                reviveTarget = pl;
                                reviveTime = 7;
                                mp.events.callRemote("AssignReviveTarget", pl.remoteId);
                                return;
                            }
                        }
                    }
                }
            }
        });
    }

    // if no revive target is found, request cuff
    requestCuffTarget();
}

// ------ REVIVAL SYSTEM ------ //
let isReviving = false;

function canRevive(){
    if(mp.players.local.getVariable("Team") == -1 || mp.players.local.getVariable("Wounded") > 0 || chatStatus || menuToggled || scoreboardToggled || Date.now() - lastChatToggle <= 500) return false; 
    return true;
}
mp.events.add("BeginReviving", () => {
    if(mp.players.local == null || !mp.players.exists(mp.players.local)) return;
    if(reviveTarget == null || !mp.players.exists(reviveTarget)) return;
    if(mp.players.local.getVariable("Wounded") > 0){
        return;
    }

    reviveTime = 7;
    isReviving = true;
    initiateActionTimer(reviveTime);
    clearInterval(reviveTimer);
    reviveTimer = setInterval(() => {
        if(mp.players.local == null || !mp.players.exists(mp.players.local)){ stopCuffing(69); return; }
        if(reviveTarget == null || !mp.players.exists(reviveTarget)){ stopCuffing(69); return; }

        if(mp.players.local.getVariable("Team") == -1 || mp.players.local.isDead()){
            stopReviving(1);
            return;
        }       

        if(reviveTarget.getVariable("Team") == -1 || (mp.players.local.getVariable("Team") != reviveTarget.getVariable("Team")) || reviveTarget.isDead()){
            stopReviving(2);
        }

        if(!mp.keys.isDown(72)){ 
            stopReviving(4);
            return;
        }

        reviveTime--;
        if(reviveTime <= 0)
        {
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = 0;`);
            finishCuffing();
            mp.events.callRemote("FinishRevive", reviveTarget);
            clearInterval(reviveTimer);
            return;
        }
        else{
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = ${((maxActionTime - reviveTime) == 0 ? 0 : (maxActionTime - reviveTime))}`);
        }
    }, 1000);
});

mp.events.add("StopReviving", (reason) => stopReviving(reason));
function stopReviving(reason){

    isReviving = false;
    clearInterval(reviveTimer);
    reviveTarget = null;

    mp.events.callRemote("StopReviving");
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);

    switch(reason){
        case 1:{
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Reviving failed - you are no longer in copchase.");
            break;
        }        
        case 2:{
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Reviving failed - target is no longer on the same team as you or is dead.");
            break;
        }
        case 3:{
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Reviving failed - You are severely injured.");
            break;           
        }
    }
}


// ------ CUFFING SYSTEM ------ //
let isCuffing = false;
let cuffTimeLeft = 5;
cuffTarget = null;
cuffInterval = null;

function requestCuffTarget(){
    if(mp.players.local.getVariable("Team") != 1 || chatStatus || menuToggled || scoreboardToggled || Date.now() - lastChatToggle <= 500) return;

    mp.events.callRemote("RequestCuffTarget");
}

mp.events.add("StopCuffing", (reason) => { stopCuffing(reason); });

mp.events.add("BeginCuffing", (target) => {

    if(target == null || !mp.players.exists(target)) return;
    if(target.getVariable("Team") != 0 || mp.players.local.getVariable("Team") != 1) return;
    if(mp.players.local.getVariable("Wounded") > 0){
        return;
    }

    isCuffing = true;
    cuffTarget = target;
    cuffTimeLeft = 5;
    disableSprint = true;

    initiateActionTimer(cuffTimeLeft);
    
    if(cuffInterval != null) clearInterval(cuffInterval);

    cuffInterval = setInterval(() => {

        if(cuffTarget == null || !mp.players.exists(cuffTarget) || !mp.players.exists(mp.players.local)) {
            stopCuffing(0);
            return;
        }
        if(cuffTarget.getVariable("Team") != 0 || cuffTarget.isDead()){ 
            stopCuffing(1);
            return;
        }
        if(mp.players.local.getVariable("Team") != 1 || mp.players.local.isDead()){
            stopCuffing(3);
            return;
        }
        if(!mp.keys.isDown(72)){ 
            stopCuffing(5);
            return;
        }

        let distance = calcDist(mp.players.local.position, cuffTarget.position);
        if(distance > 4.0){
            stopCuffing(2);
            return;
        }

        cuffTimeLeft--;
        if(cuffTimeLeft <= 0){
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = 0;`);
            finishCuffing();
        }
        else{
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.time = ${((maxActionTime - cuffTimeLeft) == 0 ? 0 : (maxActionTime - cuffTimeLeft))}`);
        }
    }, 1000);
});
function stopCuffing(reason){ // if unsuccessful / force stopped

    disableSprint = false;
    clearInterval(cuffInterval);
    isCuffing = false;
    cuffTimeLeft = 5;
    cuffInterval = null;
    cuffTarget = null;

    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionBar.enabled = false;`);

    mp.events.callRemote("StopCuffing");

    switch(reason){
        case 1:
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Cuffing failed - the target is no longer a fugitive or deceased.");
            break;       
        case 2:
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Cuffing failed as you moved too far from the fugitive.");
            break;
        case 12: // putting 12 cuz idk the ids anymore fuck this shit im braindead at this point
            mp.gui.chat.push("!{#FF6347}[!] !{#FFFFFF}Cuffing failed - you are severely injured.");
            break;
    }
}
function finishCuffing(){ // if successful
    clearInterval(cuffInterval);

    disableSprint = false;
    isCuffing = false;
    cuffTimeLeft = 5;
    cuffInterval = null;

    if(!mp.players.exists(cuffTarget) || !mp.players.exists(mp.players.local)) { cuffTarget = null; return;} // better safe than sorry :)
    mp.events.callRemote("FinishCuffing", cuffTarget);
    cuffTarget = null;
}


/* LOCKPICKING */
mp.events.add("startLockpicking", (donorLevel) => {
    isLockpicking = true;
    let rangeSize = 15;
    rangeSize += (donorLevel*8);
    let rangePos = 0;
    do{
        rangePos = getRandomInt(0, 180);
    }
    while(rangePos+rangeSize >= 180);

    ServerUI.execute(`
        gm.$refs.hud.$refs.base.$refs.quickAction.rangeLocation = ${rangePos};
        gm.$refs.hud.$refs.base.$refs.quickAction.range = ${rangeSize};
        
        gm.$refs.hud.$refs.base.$refs.quickAction.enabled = true;
    `);
});

// true = success ; false = fail
mp.events.add("stopLockpicking", () => {
    isLockpicking = false;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.quickAction.enabled = false;`);   
});
mp.events.add("sendLockpickResult", (result) => {
    isLockpicking = false;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.quickAction.enabled = false;`);   
    mp.events.callRemote("onLockpickAttempt", result); 
});
mp.events.add("lockpick_vehicleAlarm", (veh, isLockpickPlayer, isSuccess) => {
    mp.game.invoke('0xCDE5E70C1DDB954C', veh.handle, true);
    setTimeout(() => {
        mp.game.invoke('0xB8FF7AB45305C345', veh.handle);
    }, 100);

    if(isLockpickPlayer && isSuccess){
        mp.players.local.taskEnterVehicle(veh.handle, 200, -1, 2.0, 1, 0);
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}