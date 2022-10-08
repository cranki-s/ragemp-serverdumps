{
let waypoint;

let lastWaypointCoords;

let wtpToggle = false;


//==================================================
function findZ(mp, maxAttempts, delay, wpos, oldpos) {
    mp.players.local.position = new mp.Vector3(wpos.x, wpos.y, 0); //tp to get game load map sector.
    
    attempts = 1;

    timeout = setTimeout(function getZ() {
        wpos.z = mp.game.gameplay.getGroundZFor3dCoord(wpos.x, wpos.y, 1000, 0, false);
        if (!wpos.z && attempts < 10){ //if z not defined - continue searching z.
            attempts++;
            mp.players.local.position = new mp.Vector3(wpos.x, wpos.y, attempts*50);
            timeout = setTimeout(getZ, delay) 
        } else if(!wpos.z && attempts == maxAttempts) { //if z not defined after all attemts - stop searching and tp player to old position.
            mp.players.local.position = oldpos;
//            mp.game.graphics.notify(`Ошибка: ~n~~h~~r~Не удалось получить координату Z.`);
            mp.events.call('notify', 2, 9, global.GetText(`Ошибка: Не удалось получить координату Z.`), 6000);
            
            clearTimeout(timeout);
        } else { //if z found - tp to wpos        
            mp.players.local.position = new mp.Vector3(wpos.x, wpos.y, wpos.z+2);           
            //NexusEvent.callRemote('notifyCoords', 'Телепорт пo координатам:', wpos.x, wpos.y, wpos.z+1);
            mp.events.call('notify', 2, 9, global.GetText('Телепорт пo координатам:') +wpos.x.toFixed(2)+" "+wpos.y.toFixed(2)+" "+(wpos.z+1).toFixed(2), 6000);
            clearTimeout(timeout);
        }
    }, delay)//end of timeout
}

function findWP(mp){
    let wpos = Object.assign({}, lastWaypointCoords);
    let oldpos = mp.players.local.position;

    if (wpos.z != 20) { //if z already identificated         
        mp.players.local.position = new mp.Vector3(wpos.x, wpos.y, wpos.z+2);        
        //NexusEvent.callRemote('notifyCoords', 'Телепорт по координатам:', wpos.x, wpos.y, wpos.z+1);
        mp.events.call('notify', 2, 9, global.GetText('Телепорт пo координатам:') +wpos.x.toFixed(2)+" "+wpos.y.toFixed(2)+" "+(wpos.z+1).toFixed(2), 6000);
		lastWaypointCoords = null;
        return;
    }
    //else
    findZ(mp, 10, 150, wpos, oldpos);
}
//==================================================



//wtpToggle
mp.events.add('wtpToggle', () => {
    wtpToggle = !wtpToggle;
    let status;
    if (wtpToggle) status=global.GetText(`Включен.`); else status=global.GetText(`Выключен.`);
    //mp.game.graphics.notify(`WayPonitTeleport: ~n~${status}`);
    mp.events.call('notify', 2, 9, global.GetText('WayPonitTeleport: ') +status, 6000);
});

//tp to point
mp.events.add('tpToWaypoint', () => {
    findWP(mp);
});



mp.events.add('render', () => {
    //is waypoint active check.
    if(waypoint !== mp.game.invoke('0x1DD1F58F493F1DA5')){
        waypoint = mp.game.invoke('0x1DD1F58F493F1DA5'); //0x1DD1F58F493F1DA5 - isWaypointActive
        if (waypoint) {
            let blip = mp.game.invoke('0x1BEDE233E6CD2A1F', 8); //0x1BEDE233E6CD2A1F - getFirstblipInfoID, 8 - Blip Sprite Id (waypoint sprite id - 8)
            let coords = mp.game.ui.getBlipInfoIdCoord(blip);
            lastWaypointCoords = coords;
            if (wtpToggle) mp.events.call('tpToWaypoint');
        }  
    }
});




mp.keys.bind(0x59, true, function() {
if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || localplayer.getVariable('seats') == true) return;
if(!global.AltButtonPressed) return;
    if (!global.localplayer.getVariable('IS_ADMIN')) return;
    if(!lastWaypointCoords){
        //mp.game.graphics.notify(`Ошибка: ~n~~h~~r~Нет записи последнего waypoint'a.`); 
        mp.events.call('notify', 2, 9, global.GetText(`Ошибка: Нет записи последнего waypoint'a.`), 6000);
        return;
    }
    mp.events.call('tpToWaypoint');
});

/*mp.keys.bind(0x71, true, function() {
if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || localplayer.getVariable('seats') == true) return;
    if (!global.localplayer.getVariable('IS_ADMIN')) return;
    mp.events.call('wtpToggle');
});*/

}