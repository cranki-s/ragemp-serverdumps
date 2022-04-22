{
const weapondmg = {
    rifles: {
        assaultrifle_mk2: { name: "Assault Rifle MK II", hash: 0x394F415C, dmg: 20},
        carbinerifle_mk2: { name: "Carbine Rifle MK II", hash: 0xFAD1F1C9, dmg: 25},
        specialcarbine_mk2: { name: "Special Carbine MK II", hash: 0x969C3D67, dmg: 30}
    },
    smgs: {
        smg_mk2: { name: "SMG MK II", hash: 0x78A97CD0, dmg: 20},
        combatpdw: { name: "Combat PDW", hash: 0x0A3D4D34, dmg: 18},
        gusenberg: { name: "Gusenberg Sweeper", hash: 0x61012683, dmg: 22},
        microsmg: { name: "Micro SMG", hash: 0x13532244, dmg: 16},
        machinepistol: { name: "Machine Pistol", hash: 0xDB1AA450, dmg: 17},
	    smg: { name: "SMG", hash: 0x2BE6766B, dmg: 18}
    },
    pistols: {
        pistol_mk2: { name: "Pistol MK II", hash: 0xBFE256D4, dmg: 18},
        pistol50: { name: "Pistol .50", hash: 0x99AEEB3B, dmg: 25},
        snspistol: { name: "SNS Pistol", hash: 0xBFD21232, dmg: 16},
        snspistol_mk2: { name: "SNS Pistol MK II", hash: 0x88374054, dmg: 18},
        heavypistol: { name: "Heavy Pistol", hash: 0xD205520E, dmg: 20},
        vintagepistol: { name: "Vintage Pistol", hash: 0x83839C4, dmg: 18},
        revolver: { name: "Heavy Revolver", hash: 0xC1B3C3D1, dmg: 101},
        doubleaction: { name: "Double-Action Revolver", hash: 0x97EA20B8, dmg: 35},
        appistol: { name: "AP Pistol", hash: 0x22D8FE39, dmg: 16}
    }
}

function bulletDmg(dmg) {
    let lasthealth = mp.players.local.getHealth() + 100;
    let health = lasthealth - dmg;
    mp.players.local.setHealth(health);
}

var repeat = true;
mp.events.add('incomingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    let lasthealth = mp.players.local.getHealth() + 100;
    let health = lasthealth - 20;
    if (targetEntity.type === 'player' && boneIndex === 20) {
        if (weapon === weapondmg.rifles.assaultrifle_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.rifles.assaultrifle_mk2.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.rifles.assaultrifle_mk2.dmg);
        }
        if (weapon === weapondmg.rifles.carbinerifle_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.rifles.carbinerifle_mk2.name);
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.rifles.carbinerifle_mk2.dmg);
        }
        if (weapon === weapondmg.rifles.specialcarbine_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.rifles.specialcarbine_mk2.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.rifles.specialcarbine_mk2.dmg);
        }
        if (weapon === weapondmg.smgs.smg_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.smg_mk2.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.smg_mk2.dmg);
        }
        if (weapon === weapondmg.smgs.combatpdw.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.combatpdw.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.combatpdw.dmg);
        }
        if (weapon === weapondmg.smgs.gusenberg.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.gusenberg.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.gusenberg.dmg);
        }
        if (weapon === weapondmg.smgs.microsmg.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.microsmg.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.microsmg.dmg);
        }
        if (weapon === weapondmg.smgs.machinepistol.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.machinepistol.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.machinepistol.dmg);
        }
        if (weapon === weapondmg.smgs.smg.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.smgs.smg.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.smgs.smg.dmg);
        }
        if (weapon === weapondmg.pistols.pistol_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.pistol_mk2.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.pistol_mk2.dmg);
        }
        if (weapon === weapondmg.pistols.pistol50.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.pistol50.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.pistol50.dmg);
        }
        if (weapon === weapondmg.pistols.snspistol.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.snspistol.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.snspistol.dmg);
        }
        if (weapon === weapondmg.pistols.snspistol_mk2.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.snspistol_mk2.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.snspistol_mk2.dmg);
        }
        if (weapon === weapondmg.pistols.heavypistol.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.heavypistol.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.heavypistol.dmg);
        }
        if (weapon === weapondmg.pistols.vintagepistol.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.vintagepistol.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.vintagepistol.dmg);
        }
        if (weapon === weapondmg.pistols.revolver.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.revolver.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.revolver.dmg);
        }
        if (weapon === weapondmg.pistols.doubleaction.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.doubleaction.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.doubleaction.dmg);
        }
        if (weapon === weapondmg.pistols.appistol.hash) {
            if(health < 100 && repeat == true) {
                mp.events.callRemote("killed", targetEntity, weapondmg.pistols.appistol.name);
                mp.events.callRemote("killed", );
                repeat = false
                setTimeout(function() {
                repeat = true;
                }, 3500);
            }
            bulletDmg(weapondmg.pistols.appistol.dmg);
        }
        return true;
    }
});
}