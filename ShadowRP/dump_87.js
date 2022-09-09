{
﻿var updateGameTime = true;
var setTimeCMDused = false;

var nowTime = { Hour: 0, Minute: 0 };
var nowDate = { Day: 7, Month: 4, Year: 2018 };
var nowWeather = "EXTRASUNNY";

mp.events.add('Enviroment_Time', (data) => {
    if (data == undefined) return;
    if (updateGameTime)
        mp.game.time.setClockTime(data[0], data[1], 0);

    //var newTime = { Hour: data[0], Minute: data[1] };
    nowTime.Hour = data[0];
    nowTime.Minute = data[1];

    let time = `${formatIntZero(nowTime.Hour, -2)}:${formatIntZero(nowTime.Minute, -2)}`;
    mp.gui.execute(`HUD.time='${time}'; chat.stime = '${time}'`);
})

mp.events.add('Enviroment_Date', (data) => {
    if (data == undefined) return;
    //var newTime = { Hour: data[0], Minute: data[1] };
    nowDate.Day = data[0];
    nowDate.Month = data[1];
    nowDate.Year = data[2];

    let date = `${formatIntZero(nowDate.Day, -2)}.${formatIntZero(nowDate.Month, -2)}.${nowDate.Year}`;
    mp.gui.execute(`HUD.date='${date}'`);
})

mp.events.add('Enviroment_Weather', (weather) => {
    if (updateGameTime) mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey(nowWeather), mp.game.gameplay.getHashKey(weather), 0.5);
	else if(setTimeCMDused) mp.game.gameplay.setWeatherTypeNow(weather);
    nowWeather = weather;
})

mp.events.add('Enviroment_Start', (timeData, dateData, weather) => {
    mp.game.time.setClockTime(timeData[0], timeData[1], 0);
    
    nowTime.Hour = timeData[0];
    nowTime.Minute = timeData[1];

    let time = `${formatIntZero(nowTime.Hour, -2)}:${formatIntZero(nowTime.Minute, -2)}`;
    mp.gui.execute(`HUD.time='${time}'`);

    nowDate.Day = dateData[0];
    nowDate.Month = dateData[1];
    nowDate.Year = dateData[2];

    let date = `${formatIntZero(nowDate.Day, -2)}.${formatIntZero(nowDate.Month, -2)}.${nowDate.Year}`;
    mp.gui.execute(`HUD.date='${date}'`);

    mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey(nowWeather), mp.game.gameplay.getHashKey(weather), 0.5);
    nowWeather = weather;

    mp.events.call('authready');
})
/*const Natives = {
    NETWORK_CREATE_SYNCHRONISED_SCENE: '0x7CD6BC4C2BBDD526',
    NETWORK_ADD_PED_TO_SYNCHRONISED_SCENE: '0x742A637471BCECD9',
    NETWORK_START_SYNCHRONISED_SCENE: '0x9A1B3FCDB36C8697',
    NETWORK_GET_LOCAL_SCENE_FROM_NETWORK_ID: '0x02C40BF885C567B6',
    GET_SYNCHRONIZED_SCENE_PHASE: '0xE4A310B1D7FA73CC',
};
mp.game.streaming.requestAnimDict("anim@mp_ferris_wheel");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function Deg2rad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
function Rad2deg(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
var FerrisWheel = mp.objects.new(mp.game.joaat("prop_ld_ferris_wheel"), new mp.Vector3(-1663.97, -1126.7, 30.7),
{
    rotation: new mp.Vector3(360, 0, 0),
    alpha: 0,
    dimension: 0,
});
var FerrisWheelFake = mp.objects.new(mp.game.joaat("prop_ld_ferris_wheel"), new mp.Vector3(-1663.97, -1126.7, 30.7),
{
    rotation: new mp.Vector3(360, 0, 0),
    alpha: 255,
    dimension: 0,
});
var Cabine = [];
let wheelGradient = 0;
var playerEntered = false;
var selectcab = 1;
var WheelState = true;
setTimeout(() => {
	for (let i = 0; i < 16; i++) {
		Cabine[i] = mp.objects.new(mp.game.joaat("prop_ferris_car_01"), fun_147(i),
		{
			rotation: new mp.Vector3(0, 0, 0),
			alpha: 255,
			dimension: 0,
		});
	}
}, 20000);
function func_145(i) {
	var offset = fun_147(i);
	// mp.gui.chat.push(JSON.stringify(offset));
	Cabine[i].setCoordsNoOffset(offset.x, offset.y, offset.z, true, false, false);
}
function fun_147(iParam0) {
	let fVar0 = 6.28319 / 16 * iParam0;
	return FerrisWheel.getOffsetFromInWorldCoords(0, Deg2rad(15.3) * Rad2deg(Math.sin(fVar0)), Deg2rad(-15.3) * Rad2deg(Math.cos(fVar0)));
}
mp.events.add('client::enterFerrisWheel', () => {
	// WheelRotateFerris();
	WheelState = false;
	mp.game.cam.doScreenFadeOut(1000);
	selectcab = wheelGradient;
	setTimeout(() => {
		playerEntered = true;
		mp.game.cam.doScreenFadeIn(1000);
	}, 1000);
	setTimeout(() => {
		WheelState = true;
		enterFerrisWheel()
	}, 2000);
});

async function enterFerrisWheel() {
	// var coord = Cabine[selectcab-1].getOffsetFromGivenWorldCoords(0, 0, 0);
	// var uLocal_376 = mp.game.invoke(Natives.NETWORK_CREATE_SYNCHRONISED_SCENE, coord.x, coord.y, coord.z, 0, 0, 0, 2, true, false, 1065353216, 0, 1065353216);
	// mp.game.invoke(Natives.NETWORK_ADD_PED_TO_SYNCHRONISED_SCENE, localplayer.handle, uLocal_376, "anim@mp_ferris_wheel", "enter_player_one", 8, -8, 131072, 0, 1148846080, 0);
	// mp.game.invoke(Natives.NETWORK_START_SYNCHRONISED_SCENE, uLocal_376);
	// var iVar2 = mp.game.invoke(Natives.NETWORK_GET_LOCAL_SCENE_FROM_NETWORK_ID);
	// if (mp.game.invoke(Natives.GET_SYNCHRONIZED_SCENE_PHASE, iVar2) > 0.99) {
		// uLocal_376 = mp.game.invoke(Natives.NETWORK_CREATE_SYNCHRONISED_SCENE, coord.x, coord.y, coord.z, 0, 0, 0, 2, true, false, 1065353216, 0, 1065353216);
		// mp.game.invoke(Natives.NETWORK_ADD_PED_TO_SYNCHRONISED_SCENE, localplayer.handle, uLocal_376, "anim@mp_ferris_wheel", "enter_player_one", 8, -8, 131072, 0, 1148846080, 0);
		// mp.game.invoke(Natives.NETWORK_START_SYNCHRONISED_SCENE, uLocal_376);
	// }
	// await sleep(100);
	// localplayer.position = Cabine[selectcab-1].position;
	// localplayer.freezePosition(true)
	var attCoords = Cabine[selectcab-1].getOffsetFromInWorldCoords(localplayer.position.x,localplayer.position.y, localplayer.position.z);
	localplayer.attachTo(Cabine[selectcab-1].handle, 20, attCoords.x, attCoords.y, attCoords.z, 0, 0, 2, false, false, false, false, 2, true);
	localplayer.position = Cabine[selectcab-1].position;
	localplayer.freezePosition(true)
	localplayer.taskPlayAnim("anim@mp_ferris_wheel", "idle_a_player_one", 1, 1, -1, 1, 0, false, false, false);
}

var speed = 0.1;
async function WheelRotateFerris() {
	if (Cabine[0] != null && WheelState && FerrisWheel != null) {
		// await sleep(100)
		var rot = FerrisWheel.getRotation(1);
		FerrisWheel.rotation = new mp.Vector3(rot.x += speed, rot.y, rot.z);
		if (rot.x >= 360)
			FerrisWheel.rotation = new mp.Vector3(rot.x -= 360, rot.y, rot.z);
		
		var rotfake = FerrisWheelFake.getRotation(1);
		FerrisWheelFake.rotation = new mp.Vector3(rotfake.x += speed, rotfake.y, rotfake.z);
		if (rotfake.x >= 360)
			FerrisWheelFake.rotation = new mp.Vector3(rotfake.x -= 360, rotfake.y, rotfake.z);
		
		for (let il = 0; il < 16; il++) {
			var rot = FerrisWheelFake.getRotation(1);
			if (Math.abs(rot.x - (360/16) * il) < 0.05)
			{
				if (wheelGradient >= 16) {
					wheelGradient = 0;
				}
				wheelGradient += il + 1 > 15 ? 0 : il + 1;
				mp.gui.chat.push(JSON.stringify(wheelGradient));
			}
		}
		
		var rot2 = FerrisWheelFake.getRotation(1);
		FerrisWheelFake.rotation = new mp.Vector3(rot2.x - 22.5, 0, 0)
		
		for (let i = 0; i < 16; i++) {
			func_145(i)
		}
	}
}
mp.events.add('client::setspeedwheel', (speedco) => {
	speed = speedco;
});
mp.events.add('render', () => {
	WheelRotateFerris();
	// if (playerEntered) {
		// enterFerrisWheel();
	// }
});*/
setInterval(() => {
    if (updateGameTime) {
        mp.game.gameplay.setWeatherTypeNow(nowWeather);
    }
}, 1000);
mp.events.add('setTimeCmd', (hour, minute, second) => {
	if(hour == -1 && minute == -1 && second == -1) {
		setTimeCMDused = false;
		updateGameTime = true;
		mp.game.gameplay.setWeatherTypeNow(nowWeather);
		mp.game.time.setClockTime(nowTime.Hour, nowTime.Minute, 0);
	} else {
		setTimeCMDused = true;
		updateGameTime = false;
		mp.game.time.setClockTime(hour, minute, second);
	}
})
mp.events.add('stopTime', () => {
    updateGameTime = false;

    mp.game.gameplay.setWeatherTypeNow('EXTRASUNNY');
    mp.game.time.setClockTime(0, 0, 0);
})
mp.events.add('resumeTime', () => {
    updateGameTime = true;

    mp.game.gameplay.setWeatherTypeNow(nowWeather);
    mp.game.time.setClockTime(nowTime.Hour, nowTime.Minute, 0);
})
}