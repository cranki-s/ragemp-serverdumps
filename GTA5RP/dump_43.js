{
    const mp = global.mp,
        graphics = mp.game.graphics;
    let isObjectAddActive = !1,
        objectAddEntity = null,
        objectStartCreate = 0,
        objectTick = 0,
        screenResolution = {
            x: 1,
            y: 1
        },
        screenActiveResolution = {
            x: 1,
            y: 1
        },
        onEndHandle = () => {};
    async function startAddObject(a) {
        isObjectAddActive && endAddObject(), mp.objects.exists(objectAddEntity) && objectAddEntity.destroy();
        const b = isNaN(parseInt(a)) ? mp.game.joaat(a) : parseInt(a);
        if (!mp.game.streaming.isModelValid(b)) return void global.rpc.triggerClient("clientFunc_notifyError", `Ошибка, неверная модель объекта ( ${b} - ${a} )`);
        if (!mp.game.streaming.hasModelLoaded(b))
            for (mp.game.streaming.requestModel(b); !mp.game.streaming.hasModelLoaded(b);) mp.game.wait(0);
        const c = mp.game.gameplay.getModelDimensions(b);
        objectAddEntity = mp.objects.new(b, new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z - 1 - c.min.z), {
            alpha: 235,
            dimension: -1,
            rotation: new mp.Vector3(0, 0, 0)
        });
        for (let b = 0; 0 === objectAddEntity.handle && 15e3 > b; ++b) await mp.game.waitAsync(0);
        objectAddEntity.setCollision(!1, !0), objectAddEntity.__mapEditor = !0, objectAddEntity.setCollision(!1, !0), mp.events.add("render", __addObjectRender), objectStartCreate = new Date().getTime(), objectTick = 0, isObjectAddActive = !0, global.mainBrowser.execute(`mainHud.mapEditorAddObject = true; mapEditor_init();`), global.binder.blockKey(16), global.binder.blockKey(18), global.binder.blockKey(37), global.binder.blockKey(38), global.binder.blockKey(39), global.binder.blockKey(40)
    }

    function endAddObject() {
        isObjectAddActive = !1, mp.events.remove("render", __addObjectRender), mp.objects.exists(objectAddEntity) && objectAddEntity.destroy(), global.mainBrowser.execute(`mainHud.mapEditorAddObject = false; mapEditor_destroy();`), global.binder.unBlockKey(16), global.binder.unBlockKey(18), global.binder.unBlockKey(37), global.binder.unBlockKey(38), global.binder.unBlockKey(39), global.binder.unBlockKey(40)
    }

    function __addObjectRender() {
        if (isObjectAddActive) {
            if (0 == ++objectTick % 200 && mp.game.invoke(`0xF4F2C0D4EE209E20`), 0 == objectTick % 2) {
                const a = objectAddEntity.getCoords(!0),
                    b = objectAddEntity.getRotation(2),
                    d = global.gameplayCamera.getCoord(),
                    c = getLookAtVector(global.gameplayCamera, .5 * screenActiveResolution.x, .5 * screenActiveResolution.y);
                global.mainBrowser.call("UI_mapEditor_update", a.x, a.y, a.z, b.x, b.y, b.z, d.x, d.y, d.z, c.x, c.y, c.z)
            }
            if (mp.game.controls.disableControlAction(0, 24, !0), mp.game.controls.disableControlAction(1, 24, !0), mp.game.controls.disableControlAction(0, 257, !0), !mp.keys.isDown(18)) {
                let a = 0,
                    b = 0;
                const c = mp.keys.isDown(16) ? .015 : .005;
                mp.keys.isDown(37) ? a -= c : mp.keys.isDown(39) && (a += c), mp.keys.isDown(38) ? b -= c : mp.keys.isDown(40) && (b += c);
                const d = objectAddEntity.position;
                objectAddEntity.position = new mp.Vector3(d.x + a, d.y + b, d.z + 0)
            } else {
                const a = mp.keys.isDown(16) ? .5 : .25;
                if (mp.keys.isDown(40)) {
                    const a = objectAddEntity.position;
                    objectAddEntity.position = new mp.Vector3(a.x, a.y, a.z - (mp.keys.isDown(16) ? .015 : .005))
                } else if (mp.keys.isDown(38)) {
                    const a = objectAddEntity.position;
                    objectAddEntity.position = new mp.Vector3(a.x, a.y, a.z + (mp.keys.isDown(16) ? .015 : .005))
                }
                if (mp.keys.isDown(37) || mp.keys.isDown(39)) {
                    let b = objectAddEntity.getRotation(2);
                    mp.keys.isDown(37) ? b.z -= a : mp.keys.isDown(39) && (b.z += a), objectAddEntity.setRotation(b.x, b.y, b.z, 2, !0)
                }
            }
            return mp.keys.isDown(13) && 1500 < new Date().getTime() - objectStartCreate ? (onEndHandle(objectAddEntity.position.x, objectAddEntity.position.y, objectAddEntity.position.z, objectAddEntity.getRotation(2).x, objectAddEntity.getRotation(2).y, objectAddEntity.getRotation(2).z), void endAddObject()) : mp.game.controls.isControlJustPressed(0, 200) ? (onEndHandle(), void endAddObject()) : void 0
        }
    }
    mp.events.add("client_mapEditor_updatePosition", (a, b, c) => {
        mp.objects.exists(objectAddEntity) && (objectAddEntity.position = new mp.Vector3(a, b, c))
    }), mp.events.add("client_mapEditor_updateRotation", (a, b, c) => {
        mp.objects.exists(objectAddEntity) && objectAddEntity.setRotation(a, b, c, 2, !0)
    }), mp.events.add("client_mapEditor_startAddObject", a => {
        onEndHandle = (a, b, c, d, e, f) => void 0 === a ? mp.events.callRemote("server_mapEditor_end") : void mp.events.callRemote("server_mapEditor_end", a, b, c, d, e, f), startAddObject(a)
    }), mp.events.add("client_mapEditor_startAddObjectClient", (a, b) => {
        onEndHandle = (b, c, d, e, f, g) => void 0 === b ? mp.events.call(a) : void mp.events.call(a, b, c, d, e, f, g), startAddObject(b)
    }), mp.events.add("client_mapEditor_endAddObject", () => {
        endAddObject()
    }), mp.events.add("client_mapEditor_tryEndAddObject", () => {
        isObjectAddActive && endAddObject()
    }), mp.events.add("client_mapEditor_tryEndAddObjectAndSave", () => {
        isObjectAddActive && mp.objects.exists(objectAddEntity) && (onEndHandle(objectAddEntity.position.x, objectAddEntity.position.y, objectAddEntity.position.z, objectAddEntity.getRotation(2).x, objectAddEntity.getRotation(2).y, objectAddEntity.getRotation(2).z), endAddObject())
    });
    const getLookAtVector = (a, b, c, d = .05) => {
            const e = a.getCoord(),
                f = processCoordinates(b, c);
            return addVector3(e, mulNumber(subVector3(screenRelToWorld(a, f.x, f.y), e), d))
        },
        screenRelToWorld = (a, b, c) => {
            var d = Math.abs,
                e = Math.sin,
                f = Math.cos;
            const g = a.getCoord(),
                h = a.getRot(0),
                i = rotationToDirection(h),
                j = subVector3(rotationToDirection(addVector3(h, {
                    x: 0,
                    y: 0,
                    z: 10
                })), rotationToDirection(addVector3(h, {
                    x: 0,
                    y: 0,
                    z: -10
                }))),
                k = subVector3(rotationToDirection(addVector3(h, {
                    x: 10,
                    y: 0,
                    z: 0
                })), rotationToDirection(addVector3(h, {
                    x: -10,
                    y: 0,
                    z: 0
                }))),
                l = -degToRad(h.y),
                m = subVector3(mulNumber(j, f(l)), mulNumber(k, e(l))),
                n = addVector3(mulNumber(j, e(l)), mulNumber(k, f(l))),
                o = world3dToScreen2d(addVector3(addVector3(addVector3(g, mulNumber(i, 10)), m), n));
            if (!o) return addVector3(g, mulNumber(i, 10));
            const p = world3dToScreen2d(addVector3(g, mulNumber(i, 10)));
            return p ? .001 > d(o.x - p.x) || .001 > d(o.y - p.y) ? addVector3(g, mulNumber(i, 10)) : addVector3(addVector3(addVector3(g, mulNumber(i, 10)), mulNumber(m, (b - p.x) / (o.x - p.x))), mulNumber(n, (c - p.y) / (o.y - p.y))) : addVector3(g, mulNumber(i, 10))
        },
        rotationToDirection = a => {
            var b = Math.sin,
                c = Math.cos;
            const d = degToRad(a.z),
                e = degToRad(a.x),
                f = Math.abs(c(e));
            return {
                x: -b(d) * f,
                y: c(d) * f,
                z: b(e)
            }
        },
        world3dToScreen2d = a => {
            const b = mp.game.graphics.world3dToScreen2d(a);
            return b ? {
                x: 2 * (b.x - .5),
                y: 2 * (b.y - .5),
                z: 0
            } : void 0
        },
        processCoordinates = (a, b) => {
            var c = Math.abs;
            let d = 1 - 2 * (1 * (a / screenActiveResolution.x)),
                e = 1 - 2 * (1 * (b / screenActiveResolution.y));
            return d = 0 < d ? -d : c(d), e = 0 < e ? -e : c(e), {
                x: d,
                y: e
            }
        },
        mulNumber = (a, b) => ({
            x: a.x * b,
            y: a.y * b,
            z: a.z * b
        }),
        addVector3 = (a, b) => ({
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        }),
        subVector3 = (a, b) => ({
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        }),
        degToRad = a => a * Math.PI / 180;
}