{
  const marketCounterList = new Set(),
    marketCounterMap = new Map();
  class MarketCounter {
    constructor(a, b) {
      (this.id = a),
        (this.mainObject = b),
        (this.controlPickup = new global.ActionColshape(
          mp.game.object.getObjectOffsetFromCoords(
            this.mainObject.position.x,
            this.mainObject.position.y,
            this.mainObject.position.z,
            this.mainObject.rotation.z,
            0,
            1,
            0
          ),
          0,
          1,
          "\u0442\u043E\u0440\u0433\u043E\u0432\u0430\u0442\u044C",
          () => {
            mp.events.callRemote("server_market_contol", this.id);
          }
        )),
        (this.buyPickup = new global.ActionColshape(
          mp.game.object.getObjectOffsetFromCoords(
            this.mainObject.position.x,
            this.mainObject.position.y,
            this.mainObject.position.z,
            this.mainObject.rotation.z,
            0,
            -1.5,
            0
          ),
          0,
          1,
          "\u043A\u0443\u043F\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B",
          () => {
            mp.events.callRemote("server_market_startBuy", this.id);
          }
        )),
        (this.buyPickup.getText = () => {
          if (mp.objects.exists(this.mainObject)) {
            const a = this.mainObject.getVariable("owner");
            if ("" != a) return `купить предметы у Гражданина[${a}]`;
          }
          return "";
        }),
        (this.buyPickup.isPlayerCanUse = () => {
          if (mp.objects.exists(this.mainObject)) {
            const a = this.mainObject.getVariable("owner");
            if ("" != a) return !0;
          }
          return !1;
        }),
        (this.buyPickup.onceMode = !0),
        (this.isDeleted = !1),
        marketCounterList.add(this),
        marketCounterMap.set(this.id, this);
    }
    destroy() {
      this.isDeleted ||
        ((this.isDeleted = !0),
        this.controlPickup.destroy(),
        this.buyPickup.destroy(),
        marketCounterList.delete(this),
        marketCounterMap.delete(this.id));
    }
  }
  let loadDataFirst = !1;
  setTimeout(() => {
    mp.objects.forEach((a) => {
      const b = a.getVariable("_market");
      b != null && new MarketCounter(b, a);
    }),
      (loadDataFirst = !0);
  }, 5e3),
    mp.events.addDataHandler("_market", (a, b) => {
      loadDataFirst && new MarketCounter(b, a);
    }),
    mp.events.add("client_market_destroy", (a) => {
      const b = marketCounterMap.get(a);
      b && b.destroy();
    }),
    mp.events.add("client_market_setClothes", (a, b, c) => {
      const d = marketCounterMap.get(a);
      if (d && 0 !== d.mainObject.handle) {
        const a = mp.players.local;
        try {
          a.setHeading(d.mainObject.rotation.z + 180), (b = JSON.parse(b));
          for (let c = 0; c < b[3].length; c++)
            0 >= b[3][c][0]
              ? a.setPropIndex(-1 * b[3][c][0], b[3][c][1], b[3][c][2], !0)
              : a.setComponentVariation(b[3][c][0], b[3][c][1], b[3][c][2], 2);
          0 >= b[0]
            ? a.setPropIndex(-1 * b[0], b[1], b[2][c], !0)
            : 8 == b[0]
            ? (a.setComponentVariation(
                8,
                a.getDrawableVariation(8),
                b[2][c],
                2
              ),
              a.setComponentVariation(11, b[5], b[2][c], 2))
            : a.setComponentVariation(b[0], b[1], b[2][c], 2),
            setTimeout(() => {
              switch (b[0]) {
                case 6: {
                  global.setCameraToPlayer(
                    0.5,
                    new mp.Vector3(0, 0, -0.7),
                    new mp.Vector3(0, 0, -1),
                    0,
                    500
                  );
                  break;
                }
                case 5: {
                  global.setCameraToPlayer(
                    1,
                    new mp.Vector3(0, 0, 0.1),
                    new mp.Vector3(0, 0, 0),
                    180,
                    500
                  );
                  break;
                }
                case 4: {
                  global.setCameraToPlayer(
                    1,
                    new mp.Vector3(0, 0, -0.7),
                    new mp.Vector3(0, 0, -0.6),
                    0,
                    500
                  );
                  break;
                }
                case 3: {
                  global.setCameraToPlayer(
                    0.65,
                    new mp.Vector3(0, 0, 0.1),
                    new mp.Vector3(0, 0, 0),
                    35,
                    500
                  );
                  break;
                }
                case -0: {
                  global.setCameraToPlayer(
                    1,
                    new mp.Vector3(0, 0, 0.9),
                    new mp.Vector3(0, 0, 1),
                    0,
                    500
                  );
                  break;
                }
                case -1: {
                  global.setCameraToPlayer(
                    0.65,
                    new mp.Vector3(0, 0, 0.7),
                    new mp.Vector3(0, 0, 0.85),
                    0,
                    500
                  );
                  break;
                }
                case -2: {
                  global.setCameraToPlayer(
                    0.5,
                    new mp.Vector3(0, 0, 0.7),
                    new mp.Vector3(0, 0, 0.7),
                    0,
                    500
                  );
                  break;
                }
                case -6: {
                  global.setCameraToPlayer(
                    0.65,
                    new mp.Vector3(0, 0, 0.1),
                    new mp.Vector3(0, 0, 0),
                    35,
                    500
                  );
                  break;
                }
                case -7: {
                  global.setCameraToPlayer(
                    0.65,
                    new mp.Vector3(0, 0, 0.1),
                    new mp.Vector3(0, 0, 0),
                    260,
                    500
                  );
                  break;
                }
                case 11:
                case 8:
                default: {
                  global.setCameraToPlayer(
                    1,
                    new mp.Vector3(0, 0, 0.1),
                    new mp.Vector3(0, 0, 0),
                    0,
                    500
                  );
                  break;
                }
              }
            }, 200),
            global.hideUI(!0);
        } catch (a) {}
      }
    }),
    mp.events.add("client_market_disableCamera", () => {
      global.hideUI(!1), global.resetCamera();
    });
}
