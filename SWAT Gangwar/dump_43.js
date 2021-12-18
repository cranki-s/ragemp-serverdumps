{
let autoHeal = 99,
autoArmor = 99;
AnticheatStateBool = mp.players.local.getVariable("AntiCheat"),
prevPos = null,
valueTeleport = 0,
staticGodmod = false;

mp.events.add("Client:Anticheat:Start", () => {
    //setInterval(function() { 
      //      secTimer(); 
  // }, 1000);
    setInterval(function(){ 
        healTimer();
    }, 1);
    setInterval(function(){
        Discord();
    }, 30000);
});

function secTimer() {
    if (mp.players.local.getVariable("AntiCheat") || !mp.players.local.getVariable("Spawnschutz") || !staticGodmod) {
        if (mp.players.local.getHealth() >= 500 || mp.players.local.getArmour() >= 200) {
            WarnAnticheatServer("AC-Godmod","HealGodmod");
        }
        if (mp.game.player.getInvincible() && !staticGodmod) {
            WarnAnticheatServer("AC-Godmod","GetInvincible = true");
            mp.players.local.setInvincible(false);
            mp.game.player.setInvincible(false);
        }        
    }

/*
    let newPos = mp.players.local.position;
    let dist = mp.players.local.vehicle ? methods.getCurrentSpeed() + 100 : 80;
    let distNew = methods.distanceToPos(prevPos, newPos);
    if (mp.players.local.getVariable("AntiCheat") && distNew > dist && !mp.players.local.isFalling() && !mp.players.local.isRagdoll() && !methods.isBlockKeys() && mp.players.local.getParachuteState() === -1) {
        valueTeleport++;
        //player.warnAntiCheat(`Teleport (${distNew.toFixed(2)}m)`);
        if (valueTeleport >= 5){
            WarnAnticheatServer("AC-Teleport","OldPos: " + prevPos + " NewPos: " + newPos);
            valueTeleport = 0;
        }
    }
    prevPos = newPos;*/
};

function healTimer() {
    if (mp.players.local.getVariable("AntiCheat") && !mp.players.local.getVariable("Spawnschutz")) {
        if (mp.players.local.getHealth() > autoHeal && mp.players.local.getHealth() != 99 && mp.players.local.getHealth() >= 0 && autoHeal >= 0) {
            if (mp.players.local.getVariable("AntiCheat"))
                WarnAnticheatServer("AC-Health","OldHealth: " + autoHeal + " NewHealth: " + mp.players.local.getHealth());
        }
        if (mp.players.local.getArmour() > autoArmor && mp.players.local.getArmour() != 99 && mp.players.local.getArmour() >= 0 && autoArmor >= 0) {
            if (mp.players.local.getVariable("AntiCheat"))
                WarnAnticheatServer("AC-Armour","OldArmour: " + autoArmor + " NewArmour: " + mp.players.local.getArmour());
    
        }
    }
    autoHeal = mp.players.local.getHealth();
    autoArmor = mp.players.local.getArmour();
};


function WarnAnticheatServer(type,reason) {
        mp.events.callRemote("Server:Anticheat:Warn", type,reason);
    //mp.gui.chat.push("Anticheat: " + type + " Reason: " + reason);
}


function Discord() {
    let label = 'SWAT Gangwars';
    try {
        label = "SWAT Gangwars"
    }
    catch (e) {
    }
    mp.discord.update(label, 'discord.gg/swat-gw');

}

mp.events.add("Client:Player:Invincible", (state) => {
    mp.game1.player.setInvincible(state);
});

}