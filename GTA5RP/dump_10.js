{
  const binderKeyInfo = [
      { key: "1", js: 49, vk: 49 },
      { key: "2", js: 50, vk: 50 },
      { key: "3", js: 51, vk: 51 },
      { key: "4", js: 52, vk: 52 },
      { key: "5", js: 53, vk: 53 },
      { key: "6", js: 54, vk: 54 },
      { key: "7", js: 55, vk: 55 },
      { key: "8", js: 56, vk: 56 },
      { key: "9", js: 57, vk: 57 },
      { key: "0", js: 48, vk: 48 },
      { key: "A", js: 65, vk: 65 },
      { key: "B", js: 66, vk: 66 },
      { key: "C", js: 67, vk: 67 },
      { key: "D", js: 68, vk: 68 },
      { key: "E", js: 69, vk: 69 },
      { key: "F", js: 70, vk: 70 },
      { key: "G", js: 71, vk: 71 },
      { key: "H", js: 72, vk: 72 },
      { key: "I", js: 73, vk: 73 },
      { key: "J", js: 74, vk: 74 },
      { key: "K", js: 75, vk: 75 },
      { key: "L", js: 76, vk: 76 },
      { key: "M", js: 77, vk: 77 },
      { key: "N", js: 78, vk: 78 },
      { key: "O", js: 79, vk: 79 },
      { key: "P", js: 80, vk: 80 },
      { key: "Q", js: 81, vk: 81 },
      { key: "R", js: 82, vk: 82 },
      { key: "S", js: 83, vk: 83 },
      { key: "T", js: 84, vk: 84 },
      { key: "U", js: 85, vk: 85 },
      { key: "V", js: 86, vk: 86 },
      { key: "W", js: 87, vk: 87 },
      { key: "X", js: 88, vk: 88 },
      { key: "Y", js: 89, vk: 89 },
      { key: "Z", js: 90, vk: 90 },
      { key: "F2", js: 113, vk: 113 },
      { key: "F3", js: 114, vk: 114 },
      { key: "F4", js: 115, vk: 115 },
      { key: "F5", js: 116, vk: 116 },
      { key: "F6", js: 117, vk: 117 },
      { key: "F7", js: 118, vk: 118 },
      { key: "F8", js: 119, vk: 119 },
      { key: "F9", js: 120, vk: 120 },
      { key: "F10", js: 121, vk: 121 },
      { key: "F11", js: 122, vk: 122 },
      { key: "F12", js: 123, vk: 123 },
      { key: "N1", js: 97, vk: 97 },
      { key: "N2", js: 98, vk: 98 },
      { key: "N3", js: 99, vk: 99 },
      { key: "N4", js: 100, vk: 100 },
      { key: "N5", js: 101, vk: 101 },
      { key: "N6", js: 102, vk: 102 },
      { key: "N7", js: 103, vk: 103 },
      { key: "N8", js: 104, vk: 104 },
      { key: "N9", js: 105, vk: 105 },
      { key: "N0", js: 96, vk: 96 },
      { key: "N+", js: 107, vk: 107 },
      { key: "N-", js: 109, vk: 109 },
      { key: "N/", js: 111, vk: 111 },
      { key: "N*", js: 106, vk: 106 },
      { key: "N.", js: 110, vk: 110 },
      { key: "BACK", js: 8, vk: 8 },
      { key: "ENTER", js: 13, vk: 13 },
      { key: "SPACE", js: 32, vk: 32 },
      { key: "\u2190", js: 37, vk: 37 },
      { key: "\u2191", js: 38, vk: 38 },
      { key: "\u2192", js: 39, vk: 39 },
      { key: "\u2193", js: 40, vk: 40 },
      { key: "{[", js: 219, vk: 219 },
      { key: "}]", js: 221, vk: 221 },
      { key: ":", js: 186, vk: 186 },
      { key: "'", js: 222, vk: 222 },
      { key: "<", js: 188, vk: 188 },
      { key: ">", js: 190, vk: 190 },
      { key: "/", js: 191, vk: 191 },
      { key: "SHIFT", js: 16, vk: 16 },
      { key: "CTRL", js: 17, vk: 17 },
      { key: "ALT", js: 18, vk: 18 },
      { key: "-", js: -1, vk: -1 },
    ],
    binderActionMap = new Map(),
    binderActionList = new Set();
  let binderActionArray = [];
  const blockKeyCodeList = new Set();
  class BinderAction {
    constructor({
      actionCode: a,
      desc: b,
      defaultKey: c,
      key: d,
      comb: e,
      func: f,
    }) {
      (this.actionCode = a),
        (this.desc = b),
        (this.defaultKey = c),
        (this.key = d),
        (this.isShiftEnable = !!e.shift),
        (this.isCtrlEnable = !!e.ctrl),
        (this.isAltEnable = !!e.alt);
      const g = binderKeyInfo.find((a) => a.vk === d);
      (this.keyName = g ? g.key : "?"),
        (this.func = f),
        (this.funcTrue = () => {
          blockKeyCodeList.has(this.key) ||
            ((this.isShiftEnable ||
              binderActionArray.find(
                (a) => a !== this && a.key === this.key && a.isShiftEnable
              )) &&
              this.isShiftEnable !==
                (mp.keys.isDown(16) && mp.keys.isDown(16)) &&
              16 !== this.key) ||
            ((this.isCtrlEnable ||
              binderActionArray.find(
                (a) => a !== this && a.key === this.key && a.isCtrlEnable
              )) &&
              this.isCtrlEnable !==
                (mp.keys.isDown(17) && mp.keys.isDown(17)) &&
              17 !== this.key) ||
            ((this.isAltEnable ||
              binderActionArray.find(
                (a) => a !== this && a.key === this.key && a.isAltEnable
              )) &&
              this.isAltEnable !== (mp.keys.isDown(18) && mp.keys.isDown(18)) &&
              18 !== this.key) ||
            this.func(!0);
        }),
        (this.funcFalse = () => {
          blockKeyCodeList.has(this.key) || this.func(!1);
        }),
        (this.binded = !1),
        -1 != this.key && this._bind(),
        binderActionMap.set(a, this),
        binderActionList.add(this),
        binderActionArray.push(this);
    }
    trigger() {
      this.func(!0);
    }
    changeKey({ key: a, comb: b }) {
      this._unbind(),
        (this.key = a),
        (this.isShiftEnable = !!b.shift),
        (this.isCtrlEnable = !!b.ctrl),
        (this.isAltEnable = !!b.alt);
      const c = binderKeyInfo.find((b) => b.vk === a);
      (this.keyName = c ? c.key : "?"), -1 != a && this._bind();
    }
    _bind() {
      this.binded ||
        (mp.keys.bind(this.key, !0, this.funcTrue), (this.binded = !0));
    }
    _unbind() {
      this.binded &&
        (mp.keys.unbind(this.key, !0, this.funcTrue), (this.binded = !1));
    }
  }
  class Binder {
    constructor() {}
    register({ action: a, desc: b, defaultKey: c, defaultComb: d, func: e }) {
      const f = mp.storage.data.binder[a + "_key"] || c;
      let g = d ? d : {};
      try {
        const b = mp.storage.data.binder[a + "_comb"];
        b && (g = JSON.parse(b));
      } catch (a) {}
      return new BinderAction({
        actionCode: a,
        desc: b,
        defaultKey: c,
        key: f,
        comb: g,
        func: e,
      });
    }
    changeKey({ action: a, key: b, comb: c }) {
      const d = binderActionMap.get(a);
      d &&
        (d.changeKey({ key: b, comb: c }),
        (mp.storage.data.binder[a + "_key"] = b),
        (mp.storage.data.binder[a + "_comb"] = JSON.stringify(c)),
        mp.storage.flush());
    }
    getList() {
      return binderActionList;
    }
    blockKey(a) {
      blockKeyCodeList.add(a);
    }
    unBlockKey(a) {
      blockKeyCodeList.delete(a);
    }
  }
  null == mp.storage.data.binder && (mp.storage.data.binder = {}),
    (global.binder = new Binder());
}
