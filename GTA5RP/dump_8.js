{
  (global.enable3dSound = !0), (global.maxVolume3dSound = 100);
  let soundObjectList = [],
    soundObjectCounter = 0;
  const addObject = (a, b) => {
    var c = Math.round;
    b = b.split("_");
    const d = soundObjectList.find((b) => b.object == a);
    if (d)
      return (
        d.isActive &&
          (global.mainBrowser.execute(
            `sound3dManager.stop(${d.soundObjectId});`
          ),
          (d.isActive = !1)),
        (d.soundId = b[0]),
        (d.range = b[1]),
        (d.startPlayTime = c(new Date().getTime() / 1e3)),
        void (d.soundObjectId = soundObjectCounter++)
      );
    let e = () => !1,
      f = () => new mp.Vector3(0, 0, 0);
    mp.objects.exists(a)
      ? ((e = () => mp.objects.exists(a)), (f = () => a.position))
      : mp.vehicles.exists(a) &&
        ((e = () => mp.vehicles.exists(a)), (f = () => a.getCoords(!0))),
      soundObjectList.push({
        object: a,
        x: a.position.x,
        y: a.position.y,
        z: a.position.z,
        soundId: b[0],
        range: b[1],
        soundObjectId: soundObjectCounter++,
        isActive: !1,
        startPlayTime: c(new Date().getTime() / 1e3),
        isExists: e,
        getCoords: f,
      });
  };
  function removeObject(a) {
    const b = soundObjectList.findIndex((b) => b.object == a);
    if (-1 !== b) {
      const a = soundObjectList[b];
      a.isActive &&
        (global.mainBrowser.execute(`sound3dManager.stop(${a.soundObjectId});`),
        (a.isActive = !1)),
        soundObjectList.splice(b, 1);
    }
  }
  mp.events.add("entityStreamIn", function (a) {
    a.__objectSound != null && addObject(a, a.getVariable("3ds"));
  }),
    mp.events.add("entityStreamOut", function (a) {
      a.__objectSound != null && removeObject(a);
    }),
    global.rpc.on("__client_event_globalStorage_load", (a) => {
      global.maxVolume3dSound = a.settings.maxVolume3dSound;
    }),
    setTimeout(() => {
      mp.objects.forEach((a) => {
        const b = a.getVariable("3ds");
        b && loadObject(a, b);
      }),
        mp.events.addDataHandler("3ds", (a, b) => {
          loadObject(a, b);
        });
    }, 6000);
  function loadObject(a, b) {
    return "" === b
      ? void (a.__objectSound && (removeObject(a), delete a.__objectSound))
      : void ((a.__objectSound = !0),
        (a.notifyStreaming = !0),
        0 !== a.handle && addObject(a, b));
  }
  setInterval(() => {
    const { x: a, y: b, z: c } = mp.players.local.position;
    let d = [];
    for (const e of soundObjectList) {
      if (!e.isExists() || 0 === e.object.handle) {
        e.isActive &&
          (global.mainBrowser.execute(
            `sound3dManager.stop(${e.soundObjectId});`
          ),
          (e.isActive = !1)),
          d.push(e);
        continue;
      }
      const f = e.getCoords(),
        g = mp.game.system.vdist(f.x, f.y, f.z, a, b, c);
      if (g > e.range)
        e.isActive &&
          (global.mainBrowser.execute(
            `sound3dManager.stop(${e.soundObjectId});`
          ),
          (e.isActive = !1));
      else if (e.isActive)
        global.mainBrowser.execute(
          `sound3dManager.setVolume(${e.soundObjectId}, ${
            ((1 - g / e.range) * global.maxVolume3dSound) / 100
          });`
        );
      else {
        if (!global.enable3dSound) continue;
        global.mainBrowser.execute(
          `sound3dManager.start(${e.soundObjectId}, ${e.soundId}, ${Math.max(
            0,
            Math.round(new Date().getTime() / 1e3) - e.startPlayTime - 1
          )}, ${((1 - g / e.range) * global.maxVolume3dSound) / 100});`
        ),
          (e.isActive = !0);
      }
    }
    soundObjectList = soundObjectList.filter((a) => -1 === d.indexOf(a));
  }, 1e3);
}
