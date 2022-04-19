{
let targets = [
	[896.21, -3151.3677, -97.243645,1.4801919460297],
	[899.4281, -3151.8484, -97.243645,1.4801919460297],
	[904.4256, -3141.9043, -97.24357,1.4801919460297],
    [899.57556, -3141.3496, -97.24357,1.4801919460297],
    [902.202, -3135.721, -97.24358,1.4801919460297],
    [903.79736, -3135.9688, -97.24358,1.9731273651123],
    [899.1493, -3134.788, -97.24358,1.9731273651123],
	[902.2029, -3126.368, -97.24358,1.9731273651123],
	[905.4262, -3126.5806, -97.24358,1.9731273651123],
];



let target;
let cCoords;

let targetleft = 45;
let intervaltime = 3000;

let isStarted = false;
let points = 0;

let poligonpointsmenu = null;
let poligonpedmenu = null;

mp.events.add("StartPoligon", () => {
    isStarted = true;
    targetleft = 45;
    points = 0;
	poligonpointsmenu = mp.browsers.new("package://cef/System/Poligon/index.html");
	poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
	poligonpointsmenu.execute(`poligonpointsmenu.targetleft=${targetleft}`);
    loop();
});

mp.events.add("StopPoligon", () => {
    if (target != null && poligonpointsmenu != null) {
        target.destroy();
	    target = null;
	    cCoords = null;
        poligonpointsmenu.destroy();
        poligonpointsmenu = null;
	    isStarted = false;
    }
});

mp.keys.bind(Keys.VK_H, false, function () {
    if (poligonpointsmenu != null && target != null) {
        mp.events.call("StopPoligon");
	    mp.events.callRemote("StopMissionPoligon", points);
        return;
    }
});


function loop() {
    if(isStarted){
        if(targetleft > 0){
            let random = Math.floor(Math.random() * 8); 
            cCoords = targets[random];
        
            if(target){
                target.destroy();
            }

            let model = mp.game.joaat("prop_range_target_01");
        
            target = mp.objects.new(model, new mp.Vector3(cCoords[0],cCoords[1],cCoords[2]+1),
            {
                rotation: new mp.Vector3(0,0,165),
                alpha: 255,
                dimension: mp.players.local.dimension
            });
            targetleft--;
			poligonpointsmenu.execute(`poligonpointsmenu.targetleft=${targetleft}`);
            if(targetleft > 20) intervaltime = 3000;
            if(targetleft > 10 && targetleft < 20) intervaltime = 2500;
            if(targetleft > 0 && targetleft < 10) intervaltime = 2000;
            setTimeout(loop, intervaltime);
        }
        if(targetleft == 0){
            target.destroy();
            target = null;
            cCoords = null;
            mp.events.callRemote("FinishedPoligon", points);
            isStarted = false;
        }
    }
}


mp.events.add("render", () =>{
    if(target){
        if(target.hasBeenDamagedBy(mp.players.local.handle, true)){
            if(mp.game.gameplay.hasBulletImpactedInBox(cCoords[0]+0.06, cCoords[1]+0.12, cCoords[2]+0.46, cCoords[0]-0.06, cCoords[1], cCoords[2]+0.6, true, true)){
                points = points + 5;
				poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
            }
            else if(mp.game.gameplay.hasBulletImpactedInBox(cCoords[0]+0.11, cCoords[1]+0.12, cCoords[2]+0.41, cCoords[0]-0.11, cCoords[1], cCoords[2]+0.69, true, true)){
                points = points + 4;
				poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
            }
            else if(mp.game.gameplay.hasBulletImpactedInBox(cCoords[0]+0.16, cCoords[1]+0.12, cCoords[2]+0.33, cCoords[0]-0.16, cCoords[1], cCoords[2]+0.76, true, true)){
                points = points + 3;
				poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
            } else if(mp.game.gameplay.hasBulletImpactedInBox(cCoords[0]+0.21, cCoords[1]+0.12, cCoords[2]+0.25, cCoords[0]-0.21, cCoords[1], cCoords[2]+0.85, true, true)){
                points = points + 2;
				poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
            } else {
                points = points + 1;
				poligonpointsmenu.execute(`poligonpointsmenu.points=${points}`);
            }
            target.destroy();
            target = null;
            cCoords = null;
        }
    }
});

mp.events.add('selectthisweapon_poligon', function(id) {
	mp.events.callRemote("SelectWeaponAndStart", id);
	poligonpedmenu.active = false;
	global.menuClose();
});

mp.events.add('OpenPedPoligon', function(lvl) {
	poligonpedmenu = mp.browsers.new("package://cef/System/Poligon/PedMenu/index.html");
	poligonpedmenu.execute(`poligonpedmenu.lvl=${lvl}`);
	global.menuOpen();
});

mp.events.add('ClosePedPoligon', function() {
	poligonpedmenu.active = false;
	global.menuClose();
});


mp.events.add('client::setweapon', function (weaponHash) {
	weaponHash = parseInt(weaponHash);
	givenWeapon = weaponHash;
	mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
	mp.game.invoke(getNative("SET_PED_AMMO"), mp.players.local.handle, weaponHash, 9000);
	mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), mp.players.local.handle, weaponHash, 1500, false, true);
	mp.game.invoke(getNative("MAKE_PED_RELOAD"), mp.players.local.handle);
});

// on player remove weapon
mp.events.add('client::removeweapon', function (weaponHash) {
	weaponHash = parseInt(weaponHash);
	givenWeapon = -1569615261;
	mp.game.invoke(getNative("SET_PED_AMMO"), mp.players.local.handle, weaponHash, 0);
	mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), mp.players.local.handle, weaponHash);
});

}