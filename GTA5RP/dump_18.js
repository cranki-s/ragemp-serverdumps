{
    const mp = global.mp,
        checkpointMap = new Map;
    class ServerCheckpoint {
        constructor(a, b, c, d, e, f, g, h, i) {
            this.id = a, this.position = c, this.radius = e, this.enter = !1, this.checkpoint = mp.checkpoints.new(b, c, e, {
                dimension: g,
                direction: d,
                visible: !0,
                color: f
            }), this.map = h ? mp.blips.new(1, c, {
                color: i,
                name: "",
                shortRange: 1 != i,
                scale: 1,
                dimension: g
            }) : null, checkpointMap.set(this.id, this)
        }
        destroy() {
            this.checkpoint.destroy(), this.map && this.map.destroy(), checkpointMap.delete(this.id)
        }
    }
    setInterval(() => {
        const {
            x: a,
            y: b,
            z: c
        } = mp.players.local.position;
        for (const [d, e] of checkpointMap.entries()) mp.game.system.vdist(e.position.x, e.position.y, e.position.z, a, b, c) <= 1.1 * e.radius ? e.enter || (e.enter = !0, mp.events.callRemote("server_checkpoint_enter", d)) : e.enter && (e.enter = !1)
    }, 350), mp.events.add("client_checkpoint_show", function (a, b, c, d, e, f, g, h, i) {
        checkpointMap.has(a) || (c = JSON.parse(c), d = JSON.parse(d), f = JSON.parse(f), new ServerCheckpoint(parseInt(a), b, new mp.Vector3(parseFloat(c.x), parseFloat(c.y), parseFloat(c.z)), new mp.Vector3(parseFloat(d.x), parseFloat(d.y), parseFloat(d.z)), parseInt(e), f, g, h, i))
    }), mp.events.add("client_checkpoint_hide", function (a) {
        const b = checkpointMap.get(a);
        b && b.destroy()
    });
}