{
  const serverWorldObjectUsedMap = new Map();
  class ServerWorldObjectUsed {
    constructor(a, b) {
      (this.id = parseInt(b[0])),
        (this.actionColshape = new global.ActionColshape(
          a.position,
          a.dimension,
          parseInt(b[1]),
          b[2],
          () => {
            global.actionAntiFlood("server_serverWorldObjectUsed_use", 1500) &&
              mp.events.callRemote("server_serverWorldObjectUsed_use", this.id);
          }
        )),
        serverWorldObjectUsedMap.set(this.id, this);
    }
    destroy() {
      this.actionColshape.destroy(), serverWorldObjectUsedMap.delete(this.id);
    }
  }
  let loadDataFirst = !1;
  setTimeout(() => {
    mp.objects.forEach((a) => {
      const b = a.getVariable("_swo");
      b != null && new ServerWorldObjectUsed(a, b.split("%"));
    }),
      (loadDataFirst = !0);
  }, 9e3),
    mp.events.addDataHandler("_swo", (a, b) => {
      loadDataFirst && new ServerWorldObjectUsed(a, b.split("%"));
    }),
    mp.events.add("client_swo_destroy", (a) => {
      const b = serverWorldObjectUsedMap.get(a);
      b && b.destroy();
    });
}
