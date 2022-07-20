{
    const mp = global.mp,
        localPlayer = mp.players.local,
        actionColshapeList = new Set;
    class ActionColshape {
        constructor(a, b, c, d, e) {
            this.position = a, this.dimension = b, this.range = c, this.text = d, this.onPlayerUse = e, this.forVehicle = !1, this.active = !0, this.colshape = mp.colshapes.newCircle(this.position.x, this.position.y, this.range, this.dimension), this.colshape.actionColshape = this, this.onceMode = !1, this.isPlayerCanUse = () => !0, this.getText = () => this.text
        }
        destroy() {
            mp.colshapes.exists(this.colshape) && (this.colshape.destroy(), actionColshapeList.has(this) && (actionColshapeList.delete(this), update()))
        }
        static clearAll() {
            actionColshapeList.clear(), update()
        }
    }
    class ActionColshapeSphere {
        constructor(a, b, c, d, e) {
            this.position = a, this.dimension = b, this.range = c, this.text = d, this.onPlayerUse = e, this.forVehicle = !1, this.active = !0, this.colshape = mp.colshapes.newSphere(this.position.x, this.position.y, this.position.z, this.range, this.dimension), this.colshape.actionColshape = this, this.onceMode = !1, this.isPlayerCanUse = () => !0, this.getText = () => this.text
        }
        destroy() {
            mp.colshapes.exists(this.colshape) && (this.colshape.destroy(), actionColshapeList.has(this) && (actionColshapeList.delete(this), update()))
        }
        static clearAll() {
            actionColshapeList.clear(), update()
        }
    }
    class TriggerColshape {
        constructor(a, b, c, d, e) {
            this.position = a, this.dimension = b, this.range = c, this.onEnter = d, this.onLeave = e, this.active = !0, this.colshape = mp.colshapes.newCircle(this.position.x, this.position.y, this.range, this.dimension), this.colshape.triggerColshape = this
        }
        destroy() {
            mp.colshapes.exists(this.colshape) && this.colshape.destroy()
        }
    }
    mp.events.add("playerEnterColshape", function (a) {
        if (a.actionColshape !== void 0) {
            if (!!localPlayer.vehicle !== a.actionColshape.forVehicle) return;
            if (Math.abs(a.actionColshape.position.z - localPlayer.position.z) > (a.actionColshape.forVehicle ? 5 : 2)) return;
            if (!a.actionColshape.active || !a.actionColshape.isPlayerCanUse()) return;
            actionColshapeList.add(a.actionColshape), update()
        } else void 0 !== a.triggerColshape && a.triggerColshape.onEnter()
    }), mp.events.add("playerExitColshape", function (a) {
        a.actionColshape === void 0 ? a.triggerColshape !== void 0 && a.triggerColshape.onLeave() : (actionColshapeList.delete(a.actionColshape), update())
    }), mp.keys.bind(69, !0, function () {
        if (!(mp.gui.cursor.visible || global.isChatOpen || global.disableKeys)) {
            const a = actionColshapeList.size;
            if (0 !== a) {
                const b = Array.from(actionColshapeList)[a - 1];
                b.onPlayerUse(), b.onceMode && (actionColshapeList.clear(), update())
            }
        }
    });
    let lastNotifyKeyText = "";

    function update() {
        if (0 == actionColshapeList.size) return void global.notifyKeyHelpHide("E", lastNotifyKeyText);
        const a = Array.from(actionColshapeList)[actionColshapeList.size - 1].getText();
        lastNotifyKeyText = a, 0 < a.length ? global.notifyKeyHelpShow("E", a) : global.notifyKeyHelpHide()
    }
    global.ActionColshape = ActionColshape, global.ActionColshapeSphere = ActionColshapeSphere, global.TriggerColshape = TriggerColshape;
}