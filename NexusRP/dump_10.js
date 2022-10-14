{
global.afkSecondsCount = 0;
global.inAfk = false;
let LastPosition = new mp.Vector3(0, 0, 0);
let Timer = 0;
let Step = 0;
setInterval(function () {
    if(!loggedin) return;
    Timer++;
    const g = mp.game.system.vdist(localplayer.position.x, localplayer.position.y, localplayer.position.z, LastPosition.x, LastPosition.y, LastPosition.z);
    if (Timer == 300 && g < 1) {
        if (Step < 3) {
            Step += 1;
            NewEvent.callRemote('console', 123)
        }                
    }
    else if (g > 1) 
    {
        Step = 0;
    }
    if(Timer > 300)
    {
        Timer = 0;
    }
    if (Step == 3 && !global.inAfk) {
        if (localplayer.getVariable('IS_ADMIN') == true) {
            //return;
        }
       // else {
            mp.gui.chat.push(global.GetText('Вы вошли в сон (AFK более 15 минут)'));
            NewEvent.callRemote('AfkSystem:StartAFK');
            global.inAfk = true;
        //}
    }
    else if(global.inAfk && Step == 0)
    {
        NewEvent.callRemote('AfkSystem:StopAFK');
        global.inAfk = false;
    }    
    if(Timer == 20){
        LastPosition = localplayer.position;
    }
    // afkSecondsCount++;
    // if (afkSecondsCount == 900 && loggedin) {
    //     if (localplayer.getVariable('IS_ADMIN') == true) afkSecondsCount = 0;
    //     else {
    //         mp.gui.chat.push('Вы вошли в сон (AFK более 15 минут)');
    //         NewEvent.callRemote('AfkSystem:StartAFK');
    //         global.inAfk = true;
    //     }
    // }
    // if (global.inAfk && afkSecondsCount < 900) {
    //     NewEvent.callRemote('AfkSystem:StopAFK');
    //     global.inAfk = false;
    // }
}, 1000);



}