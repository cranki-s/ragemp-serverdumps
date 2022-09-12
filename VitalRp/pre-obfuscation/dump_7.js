{
const CamerasManagerInfo = {
    gameplayCamera: null,
    activeCamera: null,
    interpCamera: null,
    interpActive: !1,
    _events: new Map(),
    cameras: new Map([
        ['testCamera', mp.cameras.new('default', new mp.Vector3(), new mp.Vector3(), 50.0)],
    ])
};
mp.events.add('render', () => {
    if (CamerasManagerInfo.interpCamera && CamerasManager.doesExist(CamerasManagerInfo.interpCamera) && !CamerasManagerInfo.activeCamera.isInterpolating()) {
        CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.activeCamera);
        CamerasManagerInfo.interpCamera.setActive(!1);
        CamerasManagerInfo.interpCamera.destroy();
        CamerasManagerInfo.interpCamera = null
    }
});
const cameraSerialize = (camera) => {
    camera.setActiveCamera = (toggle) => {
        CamerasManager.setActiveCamera(camera, toggle)
    };
    camera.setActiveCameraWithInterp = (position, rotation, duration, easeLocation, easeRotation) => {
        CamerasManager.setActiveCameraWithInterp(camera, position, rotation, duration, easeLocation, easeRotation)
    }
};
class CamerasManager {
    static on(eventName, eventFunction) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);
            if (!event.has(eventFunction)) {
                event.add(eventFunction)
            }
        } else {
            CamerasManagerInfo._events.set(eventName, new Set([eventFunction]))
        }
    }
    static fireEvent(eventName, ...args) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);
            event.forEach(eventFunction => {
                eventFunction(...args)
            })
        }
    }
    static getCamera(name) {
        const camera = CamerasManagerInfo.cameras.get(name);
        if (typeof camera.setActiveCamera !== 'function') {
            cameraSerialize(camera)
        }
        return camera
    }
    static setCamera(name, camera) {
        CamerasManagerInfo.cameras.set(name, camera)
    }
    static hasCamera(name) {
        return CamerasManagerInfo.cameras.has(name)
    }
    static destroyCamera(camera) {
        if (this.doesExist(camera)) {
            if (camera === this.activeCamera) {
                this.activeCamera.setActive(!1)
            }
            camera.destroy()
        }
    }
    static createCamera(name, type, position, rotation, fov) {
        const cam = mp.cameras.new(type, position, rotation, fov);
        cameraSerialize(cam);
        CamerasManagerInfo.cameras.set(name, cam);
        return cam
    }
    static setActiveCamera(activeCamera, toggle) {
        if (!toggle) {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera = null;
                activeCamera.setActive(!1);
                mp.game.cam.renderScriptCams(!1, !1, 0, !1, !1)
            }
            if (this.doesExist(CamerasManagerInfo.interpCamera)) {
                CamerasManagerInfo.interpCamera.setActive(!1);
                CamerasManagerInfo.interpCamera.destroy();
                CamerasManagerInfo.interpCamera = null
            }
        } else {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera.setActive(!1)
            }
            CamerasManagerInfo.activeCamera = activeCamera;
            activeCamera.setActive(!0);
            mp.game.cam.renderScriptCams(!0, !1, 0, !1, !1)
        }
    }
    static setActiveCameraWithInterp(activeCamera, position, rotation, duration, easeLocation, easeRotation) {
        if (this.doesExist(CamerasManagerInfo.activeCamera)) {
            CamerasManagerInfo.activeCamera.setActive(!1)
        }
        if (this.doesExist(CamerasManagerInfo.interpCamera)) {
            CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.interpCamera);
            CamerasManagerInfo.interpCamera.setActive(!1);
            CamerasManagerInfo.interpCamera.destroy();
            CamerasManagerInfo.interpCamera = null
        }
        const interpCamera = mp.cameras.new('default', activeCamera.getCoord(), activeCamera.getRot(2), activeCamera.getFov());
        activeCamera.setCoord(position.x, position.y, position.z);
        activeCamera.setRot(rotation.x, rotation.y, rotation.z, 2);
        activeCamera.stopPointing();
        CamerasManagerInfo.activeCamera = activeCamera;
        CamerasManagerInfo.interpCamera = interpCamera;
        activeCamera.setActiveWithInterp(interpCamera.handle, duration, easeLocation, easeRotation);
        mp.game.cam.renderScriptCams(!0, !1, 0, !1, !1);
        CamerasManager.fireEvent('startInterp', CamerasManagerInfo.interpCamera)
    }
    static doesExist(camera) {
        return mp.cameras.exists(camera) && camera.doesExist()
    }
    static get activeCamera() {
        return CamerasManagerInfo.activeCamera
    }
    static get gameplayCam() {
        if (!CamerasManagerInfo.gameplayCamera) {
            CamerasManagerInfo.gameplayCamera = mp.cameras.new("gameplay")
        }
        return CamerasManagerInfo.gameplayCamera
    }
}
const proxyHandler = {
    get: (target, name, receiver) => typeof CamerasManager[name] !== 'undefined' ? CamerasManager[name] : CamerasManagerInfo.cameras.get(name)
};
exports = new Proxy({}, proxyHandler)






}