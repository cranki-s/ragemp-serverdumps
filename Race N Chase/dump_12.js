{
const maxDistance = 25*25;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const defaultcolor = [255,255,255,255];

let timerValue = Date.now();
let timerCount = 0;

let showHPStatus = 0;

mp.nametags.enabled = false;

function isPlayerInLOS(target) {
    if(target === undefined) return false;

    const camera = mp.cameras.new("gameplay");

    if(camera === undefined)
    {
        camera = mp.cameras.new("default");
        if(camera === undefined)
        {
            return false;
        }
    }

    let position = camera.getCoord();

    let targetPos = target.getBoneCoords(12844, 0.0, 0, 0.25);

    let result = mp.raycasting.testPointToPoint(position, targetPos, [1, 16]); // now test point to point
    
    if(result === undefined)
    {
        return true;
    }
    else if(result !== undefined)
    {
        if(result.entity !== undefined) // Entity is not undefined and might be ped or veh.
        {
            if(typeof result.entity.isAPed === 'function' && result.entity.isAPed())
            {
                return true;
            }
            if(typeof result.entity.isAVehicle === 'function' && result.entity.isAVehicle())
            {
                return true;
            }
        }
        else if(result.entity === undefined) // There's no entity, can be a object or building anything.
        {
            return false;
        }
    }
    return false;
}

mp.events.add('playerNametagSet', (target, r, g, b, a, armour) => {
    if(!(target != null && target !== undefined)) return;

    target.col = true;
    target.col_r = r;
    target.col_g = g;
    target.col_b = b;
    target.col_a = a;

    if(armour)
    {
        target.setArmour(armour);
    }
});

// HPBarStatus (0) := Never show HP & AR bars. (Lobby)
// HPBarStatus (1) := Always show HP & AR bars. (Copchase)
// HPBarStatus (2) := Show only on aim. (DM/Freeroam)
// HPBarStatus (3) := Show busted progress var. (Busted)

mp.events.add('showHPBars', (status) => {
    showHPStatus = status;
});

mp.events.add('render', (nametags) => {
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);

    if(Date.now() - timerValue >= 1000)
    {
        timerValue = Date.now();
        timerCount++;
        if(timerCount >= 3) timerCount = 0;
    }

    if((mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true) == false)
    {
        return;
    }
    
    nametags.forEach(nametag => {
        let [player, x, y, distance] = nametag;
    
        if((specState || isNoClip) || (isPlayerInLOS(player) == true && player.getAlpha() > 32) || mp.players.local.getVariable("NametagHack") == true) {	   
            
            let distWithAdjust = 0 + distance;
            let maxDistWithAdjust = 0 + maxDistance;
            
            if(specState) {
                distWithAdjust -= 20;
                maxDistWithAdjust += 20*20;
            } 
            if(isNoClip) {
                distWithAdjust -= 35;
                maxDistWithAdjust = 35*35;
            }

            if(mp.players.local.getVariable("NametagHack") == true)
            {
                maxDistWithAdjust += 999999.9;
            }
            
            if((distWithAdjust <= (maxDistWithAdjust)) || (specState || isNoClip) || mp.players.local.getVariable("NametagHack") == true)
            {
                let scale = (distWithAdjust / (maxDistWithAdjust));
                if(scale < 0.6) scale = 0.6;

                var health = player.getHealth() / 100;
            
                var armour = player.getArmour() / 100;
                
                y -= scale * (0.005 * (screenRes.y / 1080));

                if(renderNametags == true) {
                    if(player.getVariable("Team") !== undefined && player.getVariable("Team") == 0 && player.getVariable("HasShot") == true && !BankRobberyOn)
                    {
                        mp.game.graphics.drawText("(( THIS PLAYER HAS SHOT ))", [x, y - 0.045],
                        {
                            font: 0,
                            color: [237, 212, 52, 255],
                            scale: [0.3, 0.3],
                            outline: true
                        });
                    }

                    if(AFKStage > 0){
                        var typingStr = `(( IDLE [${SecondsSinceLastKeyPress}s/1500s] ))`;
                        if(timerCount == 0) typingStr = `(( IDLE [${SecondsSinceLastKeyPress}s/1500s] ))`;
                        else if(timerCount == 1) typingStr = `( IDLE [${SecondsSinceLastKeyPress}s/1500s] )`;
                        else if(timerCount == 2) timerCount = 0;
                
                        mp.game.graphics.drawText(typingStr, [x, y - 0.0250],
                        {
                            font: 0,
                            color: [92, 255, 206, 228],
                            scale: [0.285, 0.285],
                            outline: true
                        });                        
                    }
                    else if(player.getVariable("Team") == 0 && player.getVariable("TaseProtection") == true)
                    {
                        var typingStr = "(( TASE PROTECTION ))";
                        if(timerCount == 0) typingStr = "(( TASE PROTECTION ))";
                        else if(timerCount == 1) typingStr = "( TASE PROTECTION )";
                        else if(timerCount == 2) timerCount = 0;
                
                        mp.game.graphics.drawText(typingStr, [x, y - 0.0250],
                        {
                            font: 0,
                            color: [20, 103, 219, 228],
                            scale: [0.285, 0.285],
                            outline: true
                        });
                    }
                    else if(player.getVariable("ClimbProtection") == true)
                    {
                        var typingStr = "(( LADDER PROTECTION ))";
                        if(timerCount == 0) typingStr = "(( LADDER PROTECTION ))";
                        else if(timerCount == 1) typingStr = "( LADDER PROTECTION )";
                        else if(timerCount == 2) timerCount = 0;
                
                        mp.game.graphics.drawText(typingStr, [x, y - 0.0250],
                        {
                            font: 0,
                            color: [20, 103, 219, 228],
                            scale: [0.285, 0.285],
                            outline: true
                        });
                    }                   
                    else if(player.getVariable("Wounded") == 1 || player.getVariable("Wounded") == 2)
                    {
                        var typingStr = `(( This player is wounded; hold [H] near them begin reviving them. ))`;
                        mp.game.graphics.drawText(typingStr, [x, y - 0.0250],
                            {
                                font: 0,
                                color: [255, 99, 71, 228],
                                scale: [0.285, 0.285],
                                outline: true
                            });
                    }
                    else if(player.getVariable("IsTabbed") !== undefined && player.getVariable("IsTabbed") == true)
                    {
                        var typingStr = "(( TABBED ))";
                        if(timerCount == 0) typingStr = "(( TABBED ))";
                        else if(timerCount == 1) typingStr = "( TABBED )";
                        else if(timerCount == 2) timerCount = 0;
                
                        mp.game.graphics.drawText(typingStr, [x, y - 0.0250],
                        {
                            font: 0,
                            color: [255, 99, 71, 228],
                            scale: [0.285, 0.285],
                            outline: true
                        });
                    }
                    else if(player.isTypingInTextChat || player.isVoiceActive == true)
                    {
                        var typingStr = "( ... )";
                        if(timerCount == 0) typingStr = "( . )";
                        else if(timerCount == 1) typingStr = "( .. )";
                        else if(timerCount == 2) typingStr = "( ... )";

                        mp.game.graphics.drawText(typingStr, [x, y - 0.055],
                        {
                            font: 0,
                            color: [228, 240, 48, 228],
                            scale: [0.335, 0.335],
                            outline: true
                        });
                    }
                        
                    if(player.col)
                    {
                        mp.game.graphics.drawText(player.name.replace('_', ' '), [x, y],
                        {
                        font: 4,
                        color: [player.col_r, player.col_g, player.col_b, player.col_a],
                        scale: [0.4, 0.4],
                        outline: true
                        });
                    }
                    else
                    {
                        mp.game.graphics.drawText(player.name.replace('_', ' '), [x, y],
                        {
                        font: 4,
                        color: defaultcolor,
                        scale: [0.4, 0.4],
                        outline: true
                        });
                    }

                    if(showHPStatus == 1 || (mp.game.player.isFreeAimingAtEntity(player.handle) && showHPStatus == 2))
                    {
                        let y2 = y + 0.056;
                        
                        graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                        graphics.drawRect(x, y2, width, height, 176, 12, 12, 255);
                        graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, 245, 73, 73, 200);
                        
                        if(armour > 0) 
                        {
                            y2 -= 0.012;
                            graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                            graphics.drawRect(x, y2, width, height, 143, 143, 143, 255);
                            graphics.drawRect(x - width / 2 * (1 - armour), y2, width * armour, height, 255, 255, 255, 200);
                        }
                    }
                    if(showHPStatus == 3)
                    {
                        if(player.getVariable("BustedProgress") !== undefined && player.getVariable("Team") != undefined && player.getVariable("Team") == 0 && 
                            player.getVariable("BustedProgress") >= 0.0 && chaseRunning) // -1.0 is used if busted.
                        {
                            health = player.getVariable("BustedProgress") / 100;
                            let y2 = y + 0.056;
                            
                            graphics.drawRect(x, y2, (0.02 + width) + border * 2, (0.003 + height) + border * 2, 0, 0, 0, 200);
                            graphics.drawRect(x, y2, (0.02 + width), (0.003 + height), 0, 13, 128, 255);
                            graphics.drawRect(x - (width + 0.02) / 2 * (1 - health), y2, (0.02 + width) * health, (0.003 + height), 92, 95, 242, 200);
                        }
                    }
                }

                if(mp.game.player.isFreeAimingAtEntity(player.handle) && mp.players.local.weaponAmmo > 1 && 
                    mp.players.local.weapon != 2725352035 && mp.players.local.weapon != 0xA2719263) // 2725352035/hex = fist 
                {
                    if(mp.players.local.getVariable("HasShot") == false && mp.players.local.getVariable("Team") == 0 && player.getVariable("Team") == 1 && chaseRunning)
                    {
                        mp.events.callRemote("GivePlayerShotTag");
                    }
                }
            }
            else
            {
                if(player.getVariable("Team") == 0 && player.getVariable("HasShot") == true && renderNametags == true && chaseRunning && !BankRobberyOn)
                {
                    // They out of distance but still try?
                    mp.game.graphics.drawText("(( THIS PLAYER HAS SHOT ))", [x, y],
                    {
                        font: 0,
                        color: [237, 212, 52, 255],
                        scale: [0.3, 0.3],
                        outline: true
                    });
                }
            }
        }
    })
})
}