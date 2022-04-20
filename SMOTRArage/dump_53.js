{
let startSound = false;

const CamerasManagerInfo = {
    gameplayCamera: null,
    activeCamera: null,
    interpCamera: null,
    interpActive: false,
    _events: new Map(),
    cameras: new Map([
        ['testCamera', mp.cameras.new('default', new mp.Vector3(), new mp.Vector3(), 50.0)],
    ])
};

mp.events.add('render', () => {
    if (CamerasManagerInfo.interpCamera && CamerasManager.doesExist(CamerasManagerInfo.interpCamera) && !CamerasManagerInfo.activeCamera.isInterpolating()) {

        CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.activeCamera);

        CamerasManagerInfo.interpCamera.setActive(false);
        CamerasManagerInfo.interpCamera.destroy();
        CamerasManagerInfo.interpCamera = null;
    }
});

const cameraSerialize = (camera) => {
    camera.setActiveCamera = (toggle) => {
        CamerasManager.setActiveCamera(camera, toggle);
    };

    camera.setActiveCameraWithInterp = (position, rotation, duration, easeLocation, easeRotation) => {
        CamerasManager.setActiveCameraWithInterp(camera, position, rotation, duration, easeLocation, easeRotation);
    };
};

class CamerasManager {

    static on(eventName, eventFunction) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);

            if (!event.has(eventFunction)) {
                event.add(eventFunction);
            }
        } else {
            CamerasManagerInfo._events.set(eventName, new Set([eventFunction]));
        }
    }

    static fireEvent(eventName, ...args) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);

            event.forEach(eventFunction => {
                eventFunction(...args);
            });
        }
    }

    static getCamera(name) {

        const camera = CamerasManagerInfo.cameras.get(name);

        if (typeof camera.setActiveCamera !== 'function') {
            cameraSerialize(camera);
        }

        return camera;
    }

    static setCamera(name, camera) {
        CamerasManagerInfo.cameras.set(name, camera);
    }

    static hasCamera(name) {
        return CamerasManagerInfo.cameras.has(name);
    }

    static destroyCamera(camera) {
        if (this.doesExist(camera)) {
            if (camera === this.activeCamera) {
                this.activeCamera.setActive(false);
            }
            camera.destroy();
        }
    }

    static createCamera(name, type, position, rotation, fov) {
        const cam = mp.cameras.new(type, position, rotation, fov);
        cameraSerialize(cam);
        CamerasManagerInfo.cameras.set(name, cam);
        return cam;
    }

    static setActiveCamera(activeCamera, toggle) {
        if (!toggle) {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera = null;
                activeCamera.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, false, false);
            }

            if (this.doesExist(CamerasManagerInfo.interpCamera)) {
                CamerasManagerInfo.interpCamera.setActive(false);
                CamerasManagerInfo.interpCamera.destroy();
                CamerasManagerInfo.interpCamera = null;
            }

        } else {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera.setActive(false);
            }
            CamerasManagerInfo.activeCamera = activeCamera;
            activeCamera.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
        }
    }

    static setActiveCameraWithInterp(activeCamera, position, rotation, duration, easeLocation, easeRotation) {

        if (this.doesExist(CamerasManagerInfo.activeCamera)) {
            CamerasManagerInfo.activeCamera.setActive(false);
        }

        if (this.doesExist(CamerasManagerInfo.interpCamera)) {

            CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.interpCamera);

            CamerasManagerInfo.interpCamera.setActive(false);
            CamerasManagerInfo.interpCamera.destroy();
            CamerasManagerInfo.interpCamera = null;
        }
        const interpCamera = mp.cameras.new('default', activeCamera.getCoord(), activeCamera.getRot(2), activeCamera.getFov());
        activeCamera.setCoord(position.x, position.y, position.z);
        activeCamera.setRot(rotation.x, rotation.y, rotation.z, 2);
        activeCamera.stopPointing();

        CamerasManagerInfo.activeCamera = activeCamera;
        CamerasManagerInfo.interpCamera = interpCamera;
        activeCamera.setActiveWithInterp(interpCamera.handle, duration, easeLocation, easeRotation);
        mp.game.cam.renderScriptCams(true, false, 0, false, false);

        CamerasManager.fireEvent('startInterp', CamerasManagerInfo.interpCamera);
    }

    static doesExist(camera) {
        return mp.cameras.exists(camera) && camera.doesExist();
    }

    static get activeCamera() {
        return CamerasManagerInfo.activeCamera;
    }

    static get gameplayCam() {
        if (!CamerasManagerInfo.gameplayCamera) {
            CamerasManagerInfo.gameplayCamera = mp.cameras.new("gameplay");
        }
        return CamerasManagerInfo.gameplayCamera;
    }
}

const proxyHandler = {
    get: (target, name, receiver) => typeof CamerasManager[name] !== 'undefined' ? CamerasManager[name] : CamerasManagerInfo.cameras.get(name)
};

exports = new Proxy({}, proxyHandler);

/*
    OTHER
*/

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;
mp.events.add('moveSkyCamera', moveFromToAir);

function waitForCamSwitch() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (!mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        clearInterval(interval)
		localPlayer.isFreeze = false;
        localPlayer.freezePosition(false);
      }
    }, 400)
  })
}

function moveFromToAir(player, moveTo, switchType, showGui) {   
    /*
        switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped
    */
   switch (moveTo) {
       case 'up':
            if (showGui == false) {
				if(hud_browser) {
					hud_browser.destroy();
					hud_browser = null;
					allowBinds = [];
				}
				hideHud = true;
				mp.game.ui.displayRadar(false);
                gui = 'false';
            };
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}

// Checks whether the camera is in the air. If so, then reset the timer
function checkCamInAir() {
    if(mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    }else{
		if (!hud_browser) {
			hud_browser = mp.browsers.new("package://CEF/hud/index.html");
			hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
			
			/*if(!startSound) {
				setTimeout(() => {
					//if(hud_browser) hud_browser.execute('playSound("betaStart", "0.1");');
					startSound = true;
				}, 2500);
			}*/
			
			restoreBinds();
			
			hideHud = false;
		}
		mp.game.ui.displayRadar(true);
		gui = 'true';
    }
}

mp.events.add('browserCreated', (hud_browser) => {
	updateFastInv();
});

function camFocusOnPlayer() {
	mp.game.invoke(Natives.SWITCH_IN_PLAYER, localPlayer.handle);
	
	var pos = new mp.Vector3(916.4735,-3244.5046,-96.8637);

	var rot = new mp.Vector3();
	rot.z = localPlayer.heading + 180;
	let mycam = mp.cameras.new('customize', pos, rot, 90.0);
	mycam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add("camFocusOnPlayer", camFocusOnPlayer);

function camFocusOnHead() {
	var pos = new mp.Vector3(916.4735,-3244.5046,-96.8637);
	//pos.y -= 0.3;
	pos.z += 0.3;
	var rot = new mp.Vector3();
	rot.z = localPlayer.heading + 180;
	let mycam = mp.cameras.new('customize', pos, rot, 90.0);
	mycam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add("camFocusOnHead", camFocusOnHead);

function camFocusOnHeadDetail() {
	var pos = new mp.Vector3(916.4735,-3244.5046,-96.8637);
	pos.y += 1.0;
	pos.z += 0.6;
	var rot = new mp.Vector3();
	rot.z = localPlayer.heading + 180;
	let mycam = mp.cameras.new('customize', pos, rot, 90.0);
	mycam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add("camFocusOnHeadDetail", camFocusOnHeadDetail);

function camFocusOnBody() {
	var pos = new mp.Vector3(916.4735,-3244.5046,-96.8637);
	pos.y += 0.7;
	pos.z += 0.3;
	var rot = new mp.Vector3();
	rot.z = localPlayer.heading + 180;
	let mycam = mp.cameras.new('customize', pos, rot, 90.0);
	mycam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add("camFocusOnBody", camFocusOnBody);

function camFocusOnBodyDetail() {
	var pos = new mp.Vector3(916.4735,-3244.5046,-96.8637);
	pos.y += 1.0;
	pos.z += 0.35;
	var rot = new mp.Vector3();
	rot.z = localPlayer.heading + 180;
	let mycam = mp.cameras.new('customize', pos, rot, 90.0);
	mycam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add("camFocusOnBodyDetail", camFocusOnBodyDetail);

function setDefaultCam() {
	mp.game.ui.setMinimapVisible(false);
	mp.game.ui.displayRadar(true);

	localPlayer.freezePosition(false); // freezes the client at the current position
	localPlayer.isFreeze = false;

	let mycam = mp.cameras.new('gameplay', new mp.Vector3(0, 0, 300), new mp.Vector3(), 90.0);
	mycam.setActive(false);
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
}
mp.events.add("setDefaultCam", setDefaultCam);
}