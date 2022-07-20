{
    const mp = global.mp,
        localPlayer = mp.players.local;
    var actionPickupMap = new Map;
    class ActionPickup {
        constructor(a, b, c, d) {
            this.id = a, this.entityMarker = b, this.position = new mp.Vector3(this.entityMarker.position.x, this.entityMarker.position.y, this.entityMarker.position.z + .15), this.dimension = this.entityMarker.dimension, this.text = c, this.infoText = d, this.visible = this.entityMarker.visible, this.actionColshape = new global.ActionColshape(this.position, this.dimension, .5, this.infoText, () => {
                mp.events.callRemote("server_actionPickup_up", this.id)
            }), this.actionColshape.active = this.visible, this.label = this.visible ? mp.labels.new(this.text, new mp.Vector3(this.position.x, this.position.y, this.position.z + 1), {
                dimension: this.dimension,
                los: !0,
                font: 0,
                drawDistance: 10
            }) : null, actionPickupMap.set(this.id, this)
        }
        show() {
            this.visible = !0, this.actionColshape.active = this.visible, mp.labels.exists(this.label) && this.label.destroy(), this.label = mp.labels.new(this.text, new mp.Vector3(this.position.x, this.position.y, this.position.z + 1), {
                dimension: this.dimension,
                los: !0,
                font: 0,
                drawDistance: 10
            })
        }
        hide() {
            this.visible = !1, this.actionColshape.active = this.visible, mp.labels.exists(this.label) && this.label.destroy()
        }
        setText(a, b) {
            this.text = a, this.infoText = b, mp.labels.exists(this.label) && (this.label.text = a, this.actionColshape.text = b)
        }
        destroy() {
            this.actionColshape.destroy(), mp.labels.exists(this.label) && this.label.destroy(), actionPickupMap.delete(this.id)
        }
    }
    let loadDataFirst = !1;
    setTimeout(() => {
        mp.markers.forEach(a => {
            const b = a.getVariable("_cap");
            b && createOrUpdatePickup(a, JSON.parse(b))
        }), loadDataFirst = !0
    }, 1e4), mp.events.add("client_cap_destroy", a => {
        const b = actionPickupMap.get(a);
        b && b.destroy()
    }), mp.events.addDataHandler("_cap", (a, b) => {
        loadDataFirst && createOrUpdatePickup(a, JSON.parse(b))
    });
    const createOrUpdatePickup = (a, b) => {
        const c = b[0],
            d = actionPickupMap.get(c);
        d ? (b[1] !== d.text && d.setText(b[1], b[2]), a.visible != d.visible && (a.visible ? d.show() : d.hide())) : new ActionPickup(c, a, b[1], b[2])
    };
}