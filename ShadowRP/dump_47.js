{
//player
let localplayer = mp.players.local;
//browser
global.truckJobMenu = null;
// Флаги
let drawTruckerFinishMarkers = false;
let isStartedWork = false;
let isLoadingProducts = false;
// Блип, Маркер, Колшейп для погрузки/выгрузки товара
let loadPointBlip = null;
let loadPointMarker = null;
let loadPointShape = null;
// Интервал проверки расстояния машины от маркера
let finishInterval = null;
let intervalSeconds = 5;
// Данные маркера, для завершения работы
let exitWorkMarker = {};
// Точки загрузки товаров для каждого типа заказа
const loadPoints = {
    0: {
        "sprite": 478,
        "color": 1,
        "scale": 1,
        "position": new mp.Vector3(2691.9353, 3452.1074, 55.789597)
    },
    1: {
        "sprite": 478,
        "color": 2,
        "scale": 1,
        "position": new mp.Vector3(2673.6367, 3513.9988, 52.7)
    },
    2: {
        "sprite": 478,
        "color": 3,
        "scale": 1,
        "position": new mp.Vector3(186.08548, 6395.724, 31.38264)
    },
    6: {
        "sprite": 478,
        "color": 4,
        "scale": 1,
        "position": new mp.Vector3(2673.6367, 3513.9988, 52.7)
    },
    7: {
        "sprite": 478,
        "color": 5,
        "scale": 1,
        "position": new mp.Vector3(2673.6367, 3513.9988, 52.7)
    },
    8: {
        "sprite": 478,
        "color": 6,
        "scale": 1,
        "position": new mp.Vector3(2673.6367, 3513.9988, 52.7)
    },
    9: {
        "sprite": 478,
        "color": 7,
        "scale": 1,
        "position": new mp.Vector3(2673.6367, 3513.9988, 52.7)
    },
    12: {
        "sprite": 478,
        "color": 8,
        "scale": 1,
        "position": new mp.Vector3(2682.64, 3456.864, 55.75795)
    }
}
// События
mp.events.add({
	"JOBS::TRUCKER_OPEN_MENU": (json) => {
		if (!loggedin || chatActive || editing || cuffed) return;
		global.truckJobMenu = mp.browsers.new('http://package/browser/modules/Jobs/Truckers/index.html');
		global.truckJobMenu.active = true;
		global.menuOpen();
		global.truckJobMenu.execute(`truckJobMenu.setInfo(${json})`);
	},
	"JOBS::TRUCKER_CLOSE_MENU": () => {
		if(global.truckJobMenu)
		{
			global.menuClose();
			global.truckJobMenu.active = false;
            global.truckJobMenu.destroy();
            global.truckJobMenu = null;
		}
	},
	"JOBS::TRUCKER_START_WORK": (state, exitposition, exitrotation) => {
        isStartedWork = state;
		if(exitposition != null && exitrotation != null) {
			exitWorkMarker.position = exitposition;
			exitWorkMarker.rotation = exitrotation;
		}
        if(!state) {
            finishMarkers = [];
			exitWorkMarker = {};
            mp.events.call("JOBS::TRUCKER_REMOVE_LOADPOINT_BLIP", false);
        }
    },
	"JOBS::TRUCKER_TAKE_ORDER": (order, truck) => {
        mp.events.callRemote("SERVER::JOBS::TRUCKER_TAKE_ORDER", order, truck);
	}, 
    "JOBS::TRUCKER_CREATE_LOADPOINT_BLIP": (type, name, position) => {
        let dataBlip = loadPoints[type];
        let pos = null;
        if(dataBlip == null) pos = position;
        else pos = dataBlip.position;
        if(loadPointBlip){
            mp.events.call("JOBS::TRUCKER_REMOVE_LOADPOINT_BLIP", false);
        }
        if(type == -1){
            loadPointBlip = mp.blips.new(1, pos,
            {
                name: name,
                scale: 1,
                color: 5,
                dimension: 0,
            });
        }
        else {
            loadPointBlip = mp.blips.new(dataBlip.sprite, pos,
            {
                name: name,
                scale: dataBlip.scale,
                color: dataBlip.color,
                dimension: 0,
            });
        }
        loadPointMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 2.5), 6,
        {
            color: [255, 0, 00, 150],
            visible: true,
            dimension: 0
        });
        loadPointBlip.setRoute(true);
        if(dataBlip != null)
            mp.events.call("JOBS::TRUCKER_CREATE_COLSHAPE", dataBlip.position.x, dataBlip.position.y, dataBlip.position.z, 2, 5)
    },
    "JOBS::TRUCKER_REMOVE_LOADPOINT_BLIP": (canExitWork) => {
        if(loadPointBlip) {
            loadPointBlip.setRoute(false);
            loadPointBlip.destroy();
            loadPointBlip = null;
        }
        if(loadPointMarker) {
            loadPointMarker.destroy();
            loadPointMarker = null;
        }
        if(loadPointShape) {
            loadPointShape.destroy();
            loadPointShape = null;
        }
        drawTruckerFinishMarkers = canExitWork;
    },
    "JOBS::TRUCKER_CREATE_COLSHAPE": (x, y, z, range, height) => {
        loadPointShape = mp.colshapes.newTube(x, y, z, range, height);
    },
    "JOBS::TRUCKER_START_FINISHING_PROCESS": (position, rotation, state) => {
		if(state) {
			finishInterval = setInterval(() => {
				let truck = mp.players.local.vehicle;
				if(truck == null) {
					clearInterval(finishInterval);
					return;
				}
				let dist = mp.game.gameplay.getDistanceBetweenCoords(truck.position.x, truck.position.y, truck.position.z, position.x, position.y, position.z, true);
				if(dist < 5) {
					let heading = truck.getHeading();
					if(Math.abs(rotation.z - heading) - 360 < 1 || Math.abs(rotation.z - heading) - 180 < 1) {
						mp.events.callRemote("SERVER::JOBS::TRUCKER_STOP_FINISHING_PROCESS");
						mp.events.call("JOBS::TRUCKER_START_WORK", false);
						clearInterval(finishInterval);
					}
				}
			}, intervalSeconds * 1000);
		} else {
			if(finishInterval != null) {
				clearInterval(finishInterval);
			}
		}
    },
	"JOBS::TRUCKER_FREEZE": (vehicle, state) => {
        if(vehicle){
			isLoadingProducts = state;
            vehicle.freezePosition(state);
        }
    },
	"JOBS::TRUCKER_BLIP_SHORT_RANGE": (blip, state) => {
		if(blip) {
			blip.setAsShortRange(!state);
		}
	}
});

function playerEnterColshapeHandler(shape) {
  if(shape === loadPointShape) {
    if(mp.players.local.vehicle) {
        mp.events.callRemote("SERVER::JOBS::TRUCKER_ENTER_LOADSHAPE");
    }
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

let rotX = -10;
let rotY = 90;
let rotZ = 170;
mp.events.add('render', () => {
    if(drawTruckerFinishMarkers && isStartedWork) {
        if(Object.keys(exitWorkMarker).length != 0) {
			let dist = mp.game.gameplay.getDistanceBetweenCoords(localplayer.position.x, localplayer.position.y, localplayer.position.z, exitWorkMarker.position.x, exitWorkMarker.position.y, exitWorkMarker.position.z, true);
			if(dist < 150) {
				mp.game.graphics.drawMarker(43,
					exitWorkMarker.position.x, exitWorkMarker.position.y, exitWorkMarker.position.z - 2,
					0.0, 0.0, 0.0,
					exitWorkMarker.rotation.x, exitWorkMarker.rotation.y, exitWorkMarker.rotation.z,
					3.0, 10.0, 1.5,
					255, 15, 15, 255,
					false, false, 5, 
					false, "", "", false
				);
				mp.game.graphics.drawMarker(21,
					exitWorkMarker.position.x, exitWorkMarker.position.y, exitWorkMarker.position.z - 1.5,
					0.0, 0.0, 0.0,
					exitWorkMarker.rotation.x + rotX, exitWorkMarker.rotation.y + rotY, exitWorkMarker.rotation.z + rotZ,
					2.0, 2.0, 2.0,
					255, 0, 0, 120,
					false, false, 2, 
					false, "", "", false
				);
			}
		}
    }
	if(isLoadingProducts) {
		// отключить клавиши выхода из машины
	}
})
}