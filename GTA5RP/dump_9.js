{
  global.format = {
    currency(a, b, d, e, f) {
      var c = "\\d(?=(\\d{" + (d || 3) + "})+" + (0 < b ? "\\D" : "$") + ")",
        g = a.toFixed(Math.max(0, ~~b));
      return (f ? g.replace(".", f) : g).replace(
        new RegExp(c, "g"),
        "$&" + (e || ",")
      );
    },
  };
}
