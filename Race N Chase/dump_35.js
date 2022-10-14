{
let lastBustProgressTime = Date.now();
let bustProgressCEF = null;

mp.events.add("InitChaseTimer", () => {
    if(bustProgressCEF == null) {
        bustProgressCEF = mp.browsers.new("package://Player/busted_bar.html");
    }
});

mp.events.add('browserDomReady', (ebrowser) => {
    if(bustProgressCEF != null && bustProgressCEF === ebrowser)
    {
        if(mp.players.local.getVariable("BustedProgress") !== undefined && mp.players.local.getVariable("BustedProgress") > 0 && 
            chaseMode == 1 && mp.players.local.getVariable("Team") !== undefined && mp.players.local.getVariable("Team") == 0)
        {
            bustProgressCEF.active = true;
            bustProgressCEF.execute(`setProgress(${mp.players.local.getVariable("BustedProgress")});`);
        }
        else {
            bustProgressCEF.execute(`setProgress(0);`);
            bustProgressCEF.active = false;
        }
    }
});

mp.events.addDataHandler('BustedProgress', function (entity, value, oldValue) 
{
    if(entity == mp.players.local && bustProgressCEF != null) {

        if(mp.players.local.getVariable("BustedProgress") !== undefined && mp.players.local.getVariable("BustedProgress") > 0 && 
            chaseMode == 1 && mp.players.local.getVariable("Team") !== undefined && mp.players.local.getVariable("Team") == 0)
        {
            if(!bustProgressCEF.active) bustProgressCEF.active = true;
            bustProgressCEF.execute(`setProgress(${value});`);
        }
        else {
            bustProgressCEF.execute(`setProgress(0);`);
            if(bustProgressCEF.active) bustProgressCEF.active = false;
        }

        if(value == 0 && bustProgressCEF.active) bustProgressCEF.active = false;
    }
});

mp.events.add('render', () => {
    if(chaseMode == 1 && mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true &&
        mp.players.local.getVariable("Team") !== undefined)
    {
        if(Date.now() - lastBustProgressTime >= 100 && collisionTime <= 0) // 100ms passed & unlocked
        {
            lastBustProgressTime = Date.now();
            
            if(mp.players.local.getVariable("Team") == 1) {
                let progressed = false;
                mp.players.forEach(target => {
                    if(mp.players.exists(target) && target.dimension == mp.players.local.dimension && target.getVariable("Team") !== undefined && 
                        target.getVariable("Team") == 0 && target.getVariable("BustedProgress") < 100 && target.getVariable("BustedProgress") != -1.0 && !progressed)
                    {
                        let bustDist = 3.5;
                        if(target.isInAnyVehicle(false)) bustDist = 7.5;

                        if(calcDist(target.position, mp.players.local.position) <= bustDist) {
                            mp.events.callRemoteUnreliable("BustProgress", target, calcDist(target.position, mp.players.local.position));
                            progressed = true;
                        }
                    }
                });
            }
            else if(mp.players.local.getVariable("Team") == 0 && mp.players.local.getVariable("BustedProgress") > 0) {
                let canProceed = true;
                let closestDist = 9999.0;
                
                mp.players.forEach(target => {
                    if(canProceed && mp.players.exists(target) && target.dimension == mp.players.local.dimension && target.getVariable("Team") !== undefined && target.getVariable("Team") == 1)
                    {
                        let bustDist = 5.0;
                        if(mp.players.local.isInAnyVehicle(false)) bustDist = 10.0;

                        if(calcDist(target.position, mp.players.local.position) <= bustDist) {
                            canProceed = false;
                        }

                        if(calcDist(target.position, mp.players.local.position) < closestDist)
                        {
                            closestDist = calcDist(target.position, mp.players.local.position);
                        }
                    }
                });

                if(canProceed) {
                    mp.events.callRemoteUnreliable("BustRegress", closestDist);
                }
            }
        }
    }
});

mp.events.add('TwoSecondEvent', () => {

    if(bustProgressCEF != null) {

        if(bustProgressCEF.active == true && 
            mp.players.local.getVariable("BustedProgress") !== undefined && mp.players.local.getVariable("BustedProgress") > 0 && 
            chaseMode == 1 && mp.players.local.getVariable("Team") !== undefined && mp.players.local.getVariable("Team") == 0)
        {
            bustProgressCEF.execute(`setProgress(${value});`);
        }
        else {
            bustProgressCEF.execute(`setProgress(0);`);
            if(bustProgressCEF.active) bustProgressCEF.active = false;
        }

        if(value == 0 && bustProgressCEF.active) bustProgressCEF.active = false;
    }
});
}