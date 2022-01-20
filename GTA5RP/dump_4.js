{
  const i18n = () => {
    let a = [];
    return {
      init: (b) => {
        a = b;
      },
      __: (b, c) => {
        const d = b.split("."),
          e = d[0],
          f = d[1];
        if (!a[e]) return b;
        let g = a[e][f] || "";
        if (!g) return b;
        if (void 0 !== c)
          for (const [a, b] of Object.entries(c))
            g = g.replace(new RegExp(`{${a}}`, "gi"), b);
        return g;
      },
    };
  };
  exports = i18n();
}
