{
  class CustomInterior {
    constructor(a, b, c) {
      (this.colshape = a),
        (this.onEnter = b),
        (this.onExit = c),
        (this.isPlayerEnter = !1),
        (this.colshape.customInterior = this);
    }
    static globalRectangleShape(a, b, c, d) {
      var e = Math.abs;
      const f = e(c - a),
        g = e(d - b);
      return mp.colshapes.newRectangle((a + c) / 2, (b + d) / 2, f, g, -1);
    }
  }
  mp.events.add("playerEnterColshape", function (a) {
    a.customInterior == null ||
      a.customInterior.isPlayerEnter ||
      ((a.customInterior.isPlayerEnter = !0), a.customInterior.onEnter());
  }),
    mp.events.add("playerExitColshape", function (a) {
      a.customInterior != null &&
        a.customInterior.isPlayerEnter &&
        ((a.customInterior.isPlayerEnter = !1), a.customInterior.onExit());
    }),
    (global.CustomInterior = CustomInterior);
}
