{
const ROBBERY_TIME = 40;

let robTimeLeft = ROBBERY_TIME;
let robTimer = null;

let FugiCarBlips = [];
let FinishMarker = null;
let FinishColshape = null; // cuz adding OnEnterMarker is so hard... thanks ragemp devs very cool

/*
mp.events.add("BankDoorLocked", (toggle) => {
    // main doors
    mp.game.object.doorControl(110411286, 232.6054, 214.1584, 106.4049, toggle,  0.0, 50.0, 0);
    mp.game.object.doorControl(110411286, 231.5123, 216.5177, 106.4049, toggle,  0.0, 50.0, 0);
    // side doors
    mp.game.object.doorControl(110411286, 260.6432, 203.2052, 106.4049, toggle,  0.0, 50.0, 0);
    mp.game.object.doorControl(110411286, 258.2022, 204.1005, 106.4049, toggle,  0.0, 50.0, 0);
})
*/

mp.events.add("StartBankRobberyTimer", () => {
    if(mp.players.local == undefined){
        clearInterval(robTimer);
        return;
    }
    if(!mp.players.exists(mp.players.local)){
        clearInterval(robTimer);
        return;
    }
    if(mp.players.local.getVariable("HeistLeader") == false){
        clearInterval(robTimer);
        return;
    }

    robTimeLeft = ROBBERY_TIME;
    mp.events.callLocal("BankRob_ClearFugiCarBlips");
    robTimer = setInterval(() => {

        if(mp.players.local == undefined){
            clearInterval(robTimer);
            return;
        }
        if(!mp.players.exists(mp.players.local)){
            clearInterval(robTimer);
            return;
        }
        if(mp.players.local.getVariable("Team") != 0){
            clearInterval(robTimer);
            return;
        }
        if(mp.players.local.getVariable("HeistLeader") == false){
            clearInterval(robTimer);
            return;
        }

        robTimeLeft--;
        if(robTimeLeft <= 0){
            mp.events.callRemote("BankRob_ContinueState", 1);
            clearInterval(robTimer);
        }
        else if(robTimeLeft == 30){
            mp.events.callRemote("BankRob_SendMessage", 0, 0);
        }
        else if(robTimeLeft == 20){
            mp.events.callRemote("BankRob_SendMessage", 0, 1);
            mp.events.callRemote("BankRob_SendMessage", 1, 0);

        }
        else if(robTimeLeft == 10){
            mp.events.callRemote("BankRob_SendMessage", 0, 2);
        }
    }, 1000);
});

const BR_MUSIC_INTRO = "SOL5_START";
const BR_MUSIC_FIGHT = "SOL5_FIGHT_BAD_RT";

mp.events.add("BankRob_SetMusic", (musicID) => {
    if(mp.players.local == null || !mp.players.exists(mp.players.local)) return;

    if(musicID == 0 || musicID == 1) BankRobberyOn = true;
    else BankRobberyOn = false;

    if(mp.players.local.EventMusic == false) return;

    switch(musicID){
        case 0: // beginning
            mp.game.audio.prepareMusicEvent(BR_MUSIC_INTRO);
            setTimeout(() => {
                mp.game.audio.triggerMusicEvent(BR_MUSIC_INTRO);
            }, 500);
            break;
        case 1: // beginning
            mp.game.audio.prepareMusicEvent(BR_MUSIC_FIGHT);
            setTimeout(() => {
                mp.game.audio.triggerMusicEvent(BR_MUSIC_FIGHT);
            }, 500);
            break;   
        default: {
            mp.game.audio.triggerMusicEvent("GLOBAL_KILL_MUSIC");   
        }
    }
});

function bankRobEnterColshape(player, shape) {
    if(shape == FinishColshape) 
    {
        if(player.getVariable("HeistLeader") == true){
            mp.events.callRemote("BankRob_ContinueState", 3);
        }
        else{
            pushMessageToChat("[>] Sorry, the heist leader must enter the marker by themselves in order to win!");
        }
    }
}
  
mp.events.add("playerEnterColshape", (shape) => {
    bankRobEnterColshape(mp.players.local, shape);
});

mp.events.add("BankRob_CreateFinishMarker", (x, y, z) => {

    let position = new mp.Vector3(x, y, z);
    FinishMarker = mp.markers.new(1, position, 8.0,
        {
            color: [255, 78, 51, 255],
            visible: true,
            dimension: mp.players.local.dimension
        });
    FinishColshape = mp.colshapes.newSphere(position.x, position.y, position.z, 9.0, mp.players.local.dimension);

    let hideoutBlip = mp.blips.new(40, position,
        {
            name: "Hideout",
            scale: 1.2,
            color: 2,
            alpha: 255,
            drawDistance: 1000.0,
            dimension: mp.players.local.dimension
        });
    FugiCarBlips.push(hideoutBlip);
    
});
mp.events.add("BankRob_ClearFinishMarker", () => {
    if(FinishMarker != null && FinishMarker != undefined)
    {
        FinishMarker.destroy();
        FinishMarker = null;
    }
    if(FinishColshape != null && FinishColshape != undefined)
    {
        FinishColshape.destroy();
        FinishColshape = null;
    }
});

mp.events.add("BankRob_ClearFugiCarBlips", () => {
    if(FugiCarBlips.length <= 0) return;

    for(let i = 0 ; i < FugiCarBlips.length ; i++){
        FugiCarBlips[i].destroy();
    }
    FugiCarBlips = [];
})

mp.events.add("BankRob_SetFugiCarBlip", (id, x, y, z) => {
    let position = new mp.Vector3(x, y, z);
    switch(id){
        case 0:{
            let _b = mp.blips.new(616, position,
                {
                    name: "Getaway #1",
                    scale: 1.0,
                    color: 79,
                    alpha: 200,
                    drawDistance: 1000.0,
                    dimension: mp.players.local.dimension
                });
            FugiCarBlips.push(_b);
        }
        break;
        case 1:{
            let _b = mp.blips.new(530, position,
                {
                    name: "Getaway #2",
                    scale: 1.0,
                    color: 79,
                    alpha: 200,
                    drawDistance: 1000.0,
                    dimension: mp.players.local.dimension
                });
            FugiCarBlips.push(_b);
        }
        break;
        case 2:{
            let _b = mp.blips.new(663, position,
                {
                    name: "Getaway #3",
                    scale: 1.0,
                    color: 79,
                    alpha: 200,
                    drawDistance: 1000.0,
                    dimension: mp.players.local.dimension
                });
            FugiCarBlips.push(_b);
        }
        break;
    }
})
}