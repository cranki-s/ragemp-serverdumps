{
var config = {
    distance: 15,    // Какая дистанция радара вперёд и назад
    kilometers: true, // Использовать в виде скорости КМ/ч, а не Миль/ч ?
    vehicles: { // Список машин, в которых можно использовать радар
        "police": true
    },
}

var radar = {
    active: false,
    browser: mp.browsers.new("package://cef/System/radar/index.html"),

    data: {
        buttons: { radar: false, front: false, rear: false, beep: false},
        up: { number: "", front: 0, fast: 0, patrol: 0 },
        down: { number: "", rear: 0, fast: 0, limit: 0 },
    },

    default: {
        buttons: { radar: false, front: false, rear: false, beep: false},
        up: { number: "", front: 0, fast: 0, patrol: 0 },
        down: { number: "", rear: 0, fast: 0, limit: 0 },
    },

    execute: function(str) {
        radar.browser.execute(str);
    },
}

mp.events.add("client::changeradarstate", (state) => {
	radar.data.buttons.radar = state
	radar.default.buttons.radar = state
});

mp.events.add("client::changeradarfrontstate", (state) => {
	radar.data.buttons.front = state
	radar.default.buttons.front = state
});

mp.events.add("client::changeradarrearstate", (state) => {
	radar.data.buttons.rear = state
	radar.default.buttons.rear = state
});

mp.events.add("client::changeradarbeepstate", (state) => {
	radar.data.buttons.beep = state
	radar.default.buttons.beep = state
});

mp.events.add("client::changeradarlimitstate", (count) => {
	radar.data.down.limit = count;
	radar.default.down.limit = count;
});

radar.toDefault = function() {
    for(let sub in radar.data)
        for(let key in radar.data[sub] )
            radar.data[sub][key] = radar.default[sub][key];
}


radar.Open = function() {
    if (radar.active || global.menuOpened || chatActive || localplayer.vehicle == null) return;
    radar.toDefault();
    radar.execute(`radar.open()`);
	 mp.gui.execute(`HUD.inVeh=0`);
    radar.active = true;
    mp.events.add("render", radar.Render);
	
	radar.data.buttons.radar = false
	radar.default.buttons.radar = false
	radar.data.buttons.front = false
	radar.default.buttons.front = false
	radar.data.buttons.rear = false
	radar.default.buttons.rear = false
	radar.data.buttons.beep = false
	radar.default.buttons.beep = false
	radar.data.down.limit = 0
	radar.default.down.limit = 0
}

radar.Close = function() {
    radar.execute(`radar.close()`);
	mp.gui.execute(`HUD.inVeh=1`);
    radar.active = false;
    mp.events.remove("render", radar.Render);
}

radar.CloseExitveh = function() {
    radar.execute(`radar.close()`);
    radar.active = false;
    mp.events.remove("render", radar.Render);
}

let directions = raycasting.directions;
let kilo = config.kilometers ? 3.7 : 1;
let keys = [ "up", "down" ]


radar.Render = function() {
    if (!radar.active || localplayer.vehicle == null || !radar.data.buttons.radar) return;

    for(let keyu in keys) {

        let key = keys[keyu];
        let kyf = key == "up" ? "front" : "rear";

        if (radar.data.buttons[kyf])
        {
            let entity = raycasting.getEntity(directions[kyf], config.distance);
            

            if (entity != null && entity.type == "vehicle")
            {
                let speed = (entity.getSpeed() * kilo).toFixed();
                radar.data[key][kyf] = speed;
                radar.execute(`radar.info.${key}.${kyf}=${radar.data[key][kyf]}`);
                
				if (speed > radar.data.down.limit)
                {
                    mp.game.audio.playSoundFrontend(-1, "TIMER_STOP", "HUD_MINI_GAME_SOUNDSET", true);
                }
				
                let numberPlate = entity.getNumberPlateText().toString();
                if (radar.data[key].number != numberPlate)
                {
                    radar.data[key].number = numberPlate;
                    radar.execute(`radar.info.${key}.number='${radar.data[key].number}'`);
                }

                if (radar.data[key].fast < speed)
                {
                    radar.data[key].fast = speed;
                    radar.execute(`radar.info.${key}.fast=${speed}`);
                }

            }
        }
    }
    
    let speed = (localplayer.vehicle.getSpeed() * kilo).toFixed();

    if (radar.data.up.patrol != speed && speed < 999)
    {
        radar.data.up.patrol = speed;
        radar.execute(`radar.info.up.patrol=${radar.data.up.patrol}`)
    }
}

radar.Toggle = function() {
    if(!radar.active)
        radar.Open();
    else
        radar.Close();
}

mp.events.add("client::openRadarCop", function() {
	radar.Toggle();
});

mp.keys.bind(Keys.VK_O, false, function () { // U key
    if (!loggedin || chatActive || editing || global.menuOpened || new Date().getTime() - lastCheck < 1000) return;
    mp.events.callRemote('openRadarCop');
    lastCheck = new Date().getTime();
});

mp.events.add("playerLeaveVehicle", function (vehicle, seat) {
    if (radar.active)
        radar.CloseExitveh();
})
}@