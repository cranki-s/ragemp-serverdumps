{
  var clientBlipMap = new Map();
  mp.events.add("client_clientBlip_show", function (a, b, c, d, e, f, g) {
    const h = clientBlipMap.get(a);
    null != h && (h.destroy(), clientBlipMap.delete(a));
    const i = mp.blips.new(c, e, {
      name: b,
      color: d,
      shortRange: 1 != c && !g,
      scale: 1,
      dimension: f,
    });
    clientBlipMap.set(a, i);
  }),
    mp.events.add("client_clientBlip_showl", function (a) {
      (a = JSON.parse(a)),
        a.forEach((a) => mp.events.call("client_clientBlip_show", ...a));
    }),
    mp.events.add("client_clientBlip_setColor", function (a, b) {
      const c = clientBlipMap.get(a);
      null != c && c.setColour(b);
    }),
    mp.events.add("client_clientBlip_hide", function (a) {
      const b = clientBlipMap.get(a);
      null != b && (b.destroy(), clientBlipMap.delete(a));
    }),
    mp.events.add("client_clientBlip_hidel", function (a) {
      (a = JSON.parse(a)),
        a.forEach((a) => mp.events.call("client_clientBlip_hide", a));
    });
}
