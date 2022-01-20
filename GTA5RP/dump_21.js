{
  let apartmentsEntrancePickupList = [],
    floorBlockObject = null;
  class ApartmentsPickup {
    constructor({ position: e, text: t, infoText: o, onUse: s }) {
      (this.actionShape = new global.ActionColshape(e, -1, 1, o, s)),
        (this.textLabel = t
          ? mp.labels.new(t, new mp.Vector3(e.x, e.y, e.z + 1), {
              color: [255, 255, 255, 255],
              dimension: -1,
              drawDistance: 10,
              font: 4,
              los: !0,
            })
          : null);
    }
    destroy() {
      this.actionShape.destroy(),
        mp.labels.exists(this.textLabel) && this.textLabel.destroy();
    }
  }
  class ApartmentsEntrance {
    constructor({
      colshape: e,
      exitPosition: t,
      garagePosition: o,
      elevatorPositions: s,
      getElevatorPosition: i,
      defaultFloorCount: a,
      needFloorCheck: c,
      getFloorBlockPosition: n,
      apartmentsList: r,
    }) {
      (this.floorCount = a == null ? 0 : a),
        (this.customInt = new global.CustomInterior(
          e,
          async () => {
            if (
              (await mp.game.waitAsync(0),
              apartmentsEntrancePickupList.forEach((e) => e.destroy()),
              (apartmentsEntrancePickupList = []),
              s && i)
            )
              for (const e of s)
                apartmentsEntrancePickupList.push(
                  new ApartmentsPickup({
                    position: e,
                    infoText:
                      "\u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043B\u0438\u0444\u0442\u043E\u043C",
                    text: "\u041B\u0438\u0444\u0442",
                    onUse: () => {
                      mp.events.call(
                        "client_apartmentsElevator_menu",
                        this.floorCount
                      ),
                        createTempEvent(
                          "__client_apartmentsElevator_floor",
                          (e) => {
                            if (-1 === e)
                              return mp.events.callRemote(
                                "server_apartmentsEntrance_exit"
                              );
                            if (-2 === e)
                              return mp.events.callRemote(
                                "server_apartments_garage_enter"
                              );
                            if (0 < e && e <= this.floorCount) {
                              const t = i(e);
                              (global.disableAllAction = !0),
                                mp.game.cam.doScreenFadeOut(900),
                                setTimeout(() => {
                                  (global.disableAllAction = !1),
                                    mp.players.local.setCoordsNoOffset(
                                      t.x,
                                      t.y,
                                      t.z,
                                      !1,
                                      !1,
                                      !1
                                    ),
                                    mp.game.cam.doScreenFadeIn(1e3);
                                }, 950);
                            }
                          }
                        );
                    },
                  })
                );
            t &&
              apartmentsEntrancePickupList.push(
                new ApartmentsPickup({
                  position: t,
                  text: "\u0412\u044B\u0445\u043E\u0434",
                  infoText: "\u0432\u044B\u0439\u0442\u0438",
                  onUse: () => {
                    mp.events.callRemote("server_apartmentsEntrance_exit");
                  },
                })
              ),
              o &&
                apartmentsEntrancePickupList.push(
                  new ApartmentsPickup({
                    position: o,
                    text: "\u041F\u0430\u0440\u043A\u043E\u0432\u043A\u0430",
                    infoText: "\u0432\u043E\u0439\u0442\u0438",
                    onUse: () => {
                      mp.events.callRemote("server_apartments_garage_enter");
                    },
                  })
                ),
              mp.objects.exists(floorBlockObject) && floorBlockObject.destroy(),
              c &&
                (mp.events.callRemote("server_apartments_getFloorCount"),
                createTempEvent("client_apartments_setFloorCount", (e) => {
                  this.floorCount = e;
                  const [t, o] = n(e);
                  floorBlockObject = mp.objects.new(
                    mp.game.joaat("cls_floorstop1"),
                    t,
                    {
                      rotation: new mp.Vector3(0, 0, o),
                      dimension: mp.players.local.dimension,
                    }
                  );
                })),
              r.forEach((e, t) => {
                apartmentsEntrancePickupList.push(
                  new ApartmentsPickup({
                    position: e,
                    text: `Квартира ${t + 1}`,
                    infoText: "\u0432\u043E\u0439\u0442\u0438",
                    onUse: () => {
                      mp.events.callRemote("server_apartments_enter", t);
                    },
                  })
                );
              }),
              global.discordUpdate(
                "\u0421\u0442\u043E\u0438\u0442 \u0432 \u043F\u043E\u0434\u044A\u0435\u0437\u0434\u0435"
              );
          },
          () => {
            apartmentsEntrancePickupList.forEach((e) => e.destroy()),
              (apartmentsEntrancePickupList = []),
              global.discordUpdate();
          }
        ));
    }
  }
  setTimeout(() => {
    new ApartmentsEntrance({
      colshape: mp.colshapes.newCircle(697.87, 1299.85, 50, -1),
      exitPosition: new mp.Vector3(702.35, 1297.6, -191.27),
      garagePosition: new mp.Vector3(702.35, 1297.6, -191.27 - 3.7),
      needFloorCheck: !0,
      getFloorBlockPosition: (e) => [
        new mp.Vector3(706.2961, 1298.7881, -185.5799 + 3.7 * e - 3.7),
        0,
      ],
      apartmentsList: createFloorPosList(
        [
          new mp.Vector3(693.589, 1270.646, -187.57),
          new mp.Vector3(694.776, 1276.139, -187.57),
          new mp.Vector3(692.452, 1281.967, -187.57),
          new mp.Vector3(694.805, 1287.548, -187.57),
          new mp.Vector3(692.602, 1293.257, -187.57),
          new mp.Vector3(692.545, 1304.636, -187.57),
          new mp.Vector3(694.742, 1310.376, -187.57),
          new mp.Vector3(692.499, 1316.062, -187.57),
          new mp.Vector3(694.727, 1321.778, -187.57),
          new mp.Vector3(693.613, 1327.176, -187.57),
        ],
        10,
        3.7
      ),
      elevatorPositions: createFloorPosList(
        [
          new mp.Vector3(697.27, 1303.4, -187.57),
          new mp.Vector3(700.56, 1300.06, -187.57),
        ],
        10,
        3.7
      ),
      getElevatorPosition: (e) =>
        new mp.Vector3(697.39, 1299.92, -186.57 + 3.7 * (e - 1)),
    }),
      new ApartmentsEntrance({
        colshape: mp.colshapes.newCircle(503.01, 1296.32, 60, -1),
        exitPosition: new mp.Vector3(505.81, 1294.65, -191.33),
        needFloorCheck: !0,
        getFloorBlockPosition: (e) => [
          new mp.Vector3(509.8916, 1295.8491, -189.3412 + 3.7 * e),
          180,
        ],
        apartmentsList: createFloorPosList(
          [
            new mp.Vector3(499.376, 1267.614, -187.63),
            new mp.Vector3(500.551, 1273.166, -187.63),
            new mp.Vector3(498.239, 1278.879, -187.63),
            new mp.Vector3(500.504, 1284.56, -187.63),
            new mp.Vector3(498.271, 1290.287, -187.63),
            new mp.Vector3(498.257, 1301.685, -187.63),
            new mp.Vector3(500.513, 1307.389, -187.63),
            new mp.Vector3(498.279, 1313.118, -187.63),
            new mp.Vector3(500.558, 1318.797, -187.63),
            new mp.Vector3(499.395, 1324.335, -187.63),
          ],
          10,
          3.7
        ),
        elevatorPositions: createFloorPosList(
          [new mp.Vector3(502.95, 1298.3, -187.63)],
          10,
          3.7
        ),
        getElevatorPosition: (e) =>
          new mp.Vector3(503.01, 1296.32, -187.63 + 3.7 * (e - 1)),
      }),
      new ApartmentsEntrance({
        colshape: mp.colshapes.newCircle(-196.92, -120.22, 6.5, -1),
        exitPosition: new mp.Vector3(-202.77, -119.37, -100),
        garagePosition: new mp.Vector3(-202.81, -120.79, -100),
        needFloorCheck: !1,
        apartmentsList: [
          new mp.Vector3(-195.497, -118.134, -98.03),
          new mp.Vector3(-194.113, -119.061, -98.03),
          new mp.Vector3(-194.06, -121.158, -98.03),
          new mp.Vector3(-195.508, -121.958, -98.03),
          new mp.Vector3(-195.497, -118.134, -94.33),
          new mp.Vector3(-194.113, -119.061, -94.33),
          new mp.Vector3(-194.06, -121.158, -94.33),
          new mp.Vector3(-195.508, -121.958, -94.33),
          new mp.Vector3(-195.497, -118.134, -90.63),
          new mp.Vector3(-194.113, -119.061, -90.63),
          new mp.Vector3(-194.06, -121.158, -90.63),
          new mp.Vector3(-195.508, -121.958, -90.63),
        ],
      }),
      new ApartmentsEntrance({
        colshape: mp.colshapes.newCircle(-196.92, -110.22, 6.5, -1),
        exitPosition: new mp.Vector3(-203.01, -109.47, -100),
        garagePosition: new mp.Vector3(-202.97, -110.72, -100),
        needFloorCheck: !1,
        apartmentsList: [
          new mp.Vector3(-195.495, -108.191, -98.03),
          new mp.Vector3(-194.048, -109.059, -98.03),
          new mp.Vector3(-194.04, -111.15, -98.03),
          new mp.Vector3(-195.509, -111.986, -98.03),
          new mp.Vector3(-195.495, -108.191, -94.33),
          new mp.Vector3(-194.048, -109.059, -94.33),
          new mp.Vector3(-194.04, -111.15, -94.33),
          new mp.Vector3(-195.509, -111.986, -94.33),
        ],
      }),
      new ApartmentsEntrance({
        colshape: mp.colshapes.newCircle(-196.92, -130.22, 6.5, -1),
        exitPosition: new mp.Vector3(-202.77, -129.37, -100),
        garagePosition: new mp.Vector3(-202.81, -130.79, -100),
        needFloorCheck: !1,
        apartmentsList: [
          new mp.Vector3(-195.498, -128.15, -98.03),
          new mp.Vector3(-194.072, -129.062, -98.03),
          new mp.Vector3(-194.057, -131.157, -98.03),
          new mp.Vector3(-195.514, -131.908, -98.03),
          new mp.Vector3(-195.498, -128.15, -94.33),
          new mp.Vector3(-194.072, -129.062, -94.33),
          new mp.Vector3(-194.057, -131.157, -94.33),
          new mp.Vector3(-195.514, -131.908, -94.33),
          new mp.Vector3(-195.498, -128.15, -90.63),
          new mp.Vector3(-194.072, -129.062, -90.63),
          new mp.Vector3(-194.057, -131.157, -90.63),
          new mp.Vector3(-195.514, -131.908, -90.63),
          new mp.Vector3(-195.498, -128.15, -86.93),
          new mp.Vector3(-194.072, -129.062, -86.93),
          new mp.Vector3(-194.057, -131.157, -86.93),
          new mp.Vector3(-195.514, -131.908, -86.93),
        ],
      });
  }, 15e3);
  const apartmentsCache = new Map(),
    APARTMENT_TYPES = { HOUSE: 0, APARTMENT: 1, FHOUSE: 2 };
  let apartmentInteriorType = -1,
    apartmentsIntPickupList = [];
  global.apartmentTestMode = !1;
  class ApartmentsInterior {
    constructor({ type: e, colshape: t, exitPosition: o }) {
      (this.type = e),
        (this.exitPickup = null),
        (this.customInt = new global.CustomInterior(
          t,
          () => {
            if (
              ((apartmentInteriorType = this.type),
              apartmentsIntPickupList.forEach((e) => e.destroy()),
              (apartmentsIntPickupList = []),
              this.exitPickup ||
                (this.exitPickup = new ApartmentsPickup({
                  position: o,
                  text: "\u0412\u044B\u0445\u043E\u0434",
                  infoText: "\u0432\u044B\u0439\u0442\u0438",
                  onUse: () => {
                    if (this.type === APARTMENT_TYPES.HOUSE) {
                      if (global.apartmentTestMode)
                        return (
                          (global.apartmentTestMode = !1),
                          void mp.events.call(
                            "__client_menu_house_endCheckInterior"
                          )
                        );
                      mp.events.callRemote("server_house_exit");
                    } else
                      this.type === APARTMENT_TYPES.APARTMENT
                        ? mp.events.callRemote("server_apartments_exit")
                        : this.type === APARTMENT_TYPES.FHOUSE &&
                          mp.events.callRemote("server_fHouse_exit");
                  },
                })),
              !(
                mp.players.local.dimension <= mp.players.local.remoteId + 1 ||
                global.apartmentTestMode
              ))
            ) {
              if (this.type === APARTMENT_TYPES.HOUSE)
                mp.events.callRemote("server_house_tryLoadObject");
              else if (this.type === APARTMENT_TYPES.APARTMENT)
                mp.events.callRemote("server_apartments_tryLoadObject"),
                  global.mainMenuItems.set(
                    "\u041C\u0435\u043D\u044E \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B",
                    () => {
                      mp.events.callRemote("server_apartments_openMenu");
                    }
                  );
              else if (this.type === APARTMENT_TYPES.FHOUSE) {
                const e = apartmentsCache.get(mp.players.local.dimension);
                mp.events.callRemote(
                  "server_fHouse_tryLoadObject",
                  e ? e.id : -1
                );
              }
              global.discordUpdate(
                "\u041E\u0442\u0434\u044B\u0445\u0430\u0435\u0442 \u0434\u043E\u043C\u0430"
              );
            }
          },
          () => {
            apartmentsIntPickupList.forEach((e) => e.destroy()),
              (apartmentsIntPickupList = []),
              this.type === APARTMENT_TYPES.HOUSE ||
                (this.type === APARTMENT_TYPES.APARTMENT &&
                  global.mainMenuItems.delete(
                    "\u041C\u0435\u043D\u044E \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B"
                  )),
              global.discordUpdate();
          }
        ));
    }
  }
  let apartmentsGarageIntPickupList = [];
  class ApartmentsGarageInterior {
    constructor({ colshape: e, exitPosition: t }) {
      this.customInt = new global.CustomInterior(
        e,
        () => {
          apartmentsGarageIntPickupList.forEach((e) => e.destroy()),
            (apartmentsGarageIntPickupList = []),
            apartmentsGarageIntPickupList.push(
              new ApartmentsPickup({
                position: t,
                text: "\u0412\u044B\u0445\u043E\u0434",
                infoText: "\u0432\u044B\u0439\u0442\u0438",
                onUse: () => {
                  mp.events.callRemote("server_apartments_garage_exit");
                },
              })
            );
        },
        () => {
          apartmentsGarageIntPickupList.forEach((e) => e.destroy()),
            (apartmentsGarageIntPickupList = []);
        }
      );
    }
  }
  let apartmentObjectList = [];
  const apartmentObjectUseMap = new Map();
  class ApartmentObject {
    constructor(e, t, o, s, i) {
      if (
        ((this.clientId = -1),
        (this.objectHash = e),
        (this.object = mp.objects.new(
          this.objectHash,
          new mp.Vector3(t, o, s),
          { dimension: -1, rotation: new mp.Vector3(0, 0, i), alpha: 255 }
        )),
        null != this.object)
      ) {
        (this.object.__apartmentObject = this),
          (this.canBeUsed = !1),
          (this._onUse = () => {}),
          (this.useText = ""),
          (this.useOnce = !1);
        const e = apartmentObjectUseMap.get(this.objectHash);
        e &&
          ((this.canBeUsed = !0),
          (this._onUse = e.use),
          (this.useText = e.useText),
          e.once && (this.useOnce = e.once));
      }
    }
    onUse() {
      this._onUse({ object: this });
    }
    destroy() {
      mp.objects.exists(this.object) && this.object.destroy();
    }
    static resetClientId() {
      apartmentObjectList.forEach((e, t) => {
        e.clientId = t;
      });
    }
  }
  let isHandlerLoaded = !1;
  mp.events.add("client_apartments_object", (e, t) => {
    if (t) {
      e = "" === e ? "" : mp.api.server.strDecompress(e);
      const o = apartmentsCache.get(mp.players.local.dimension);
      "" === e
        ? (e = o ? o.data : "[]")
        : apartmentsCache.set(mp.players.local.dimension, { id: t, data: e });
    }
    apartmentObjectList.forEach((e) => e.destroy()), (apartmentObjectList = []);
    const o = JSON.parse(e);
    for (const s of o) {
      const e = new ApartmentObject(s[0], s[1], s[2], s[3], s[4]);
      e.object && apartmentObjectList.push(e);
    }
    ApartmentObject.resetClientId(),
      isHandlerLoaded ||
        ((objectActionTimer = setInterval(objectActionTimerHandler, 250)),
        mp.keys.bind(69, !0, objectActionKeyHandler),
        (enableObjectSearchHandler = !0),
        (isHandlerLoaded = !0));
  }),
    mp.events.add("client_apartment_setObject", (e, t, o, s, i, a, c) => {
      const n = apartmentObjectList[e];
      n && !c
        ? (n.destroy(),
          (apartmentObjectList[e] = new ApartmentObject(
            parseInt(t),
            parseFloat(o),
            parseFloat(s),
            parseFloat(i),
            parseFloat(a)
          )))
        : apartmentObjectList.splice(
            e,
            0,
            new ApartmentObject(
              parseInt(t),
              parseFloat(o),
              parseFloat(s),
              parseFloat(i),
              parseFloat(a)
            )
          ),
        ApartmentObject.resetClientId();
    }),
    mp.events.add("client_apartment_removeObject", (e) => {
      const t = apartmentObjectList[e];
      t &&
        (t.destroy(),
        apartmentObjectList.splice(e, 1),
        ApartmentObject.resetClientId());
    }),
    mp.events.add("client_apartment_clearAllObject", () => {
      for (const e of apartmentObjectList) e.destroy();
      (apartmentObjectList = []), ApartmentObject.resetClientId();
    });
  let isFindObjectActive = !1,
    findObjectPosition = new mp.Vector3(0, 0, 0),
    findObject = null,
    findObjectTimeout = null;
  const findObjectRenderEvent = () => {
    const e = mp.game.graphics.world3dToScreen2d(
      findObjectPosition.x,
      findObjectPosition.y,
      findObjectPosition.z
    );
    if (e) {
      const t = mp.game.graphics.getScreenResolution(0, 0),
        o = mp.game.graphics.getTextureResolution(
          "helicopterhud",
          "targetlost"
        );
      mp.game.graphics.drawSprite(
        "helicopterhud",
        "targetlost",
        e.x,
        e.y,
        0.5 * (o.x / t.x),
        0.5 * (o.y / t.y),
        0,
        255,
        255,
        255,
        255
      );
    }
  };
  mp.events.add("client_apartment_findObject", (e) => {
    isFindObjectActive && mp.events.remove("render", findObjectRenderEvent);
    const t = apartmentObjectList[e];
    if (!t || !mp.objects.exists(t.object)) return (isFindObjectActive = !1);
    if (!mp.game.graphics.hasStreamedTextureDictLoaded("helicopterhud"))
      for (
        mp.game.graphics.requestStreamedTextureDict("helicopterhud", !0);
        !mp.game.graphics.hasStreamedTextureDictLoaded("helicopterhud");

      )
        mp.game.wait(0);
    (findObjectPosition = t.object.position),
      (findObject = t.object),
      mp.events.add("render", findObjectRenderEvent),
      findObjectTimeout && clearTimeout(findObjectTimeout),
      (findObjectTimeout = setTimeout(() => {
        mp.events.call("client_apartment_findObject", -1),
          (findObjectTimeout = null);
      }, 1e4)),
      (isFindObjectActive = !0);
  }),
    setTimeout(() => {
      new ApartmentsInterior({
        type: APARTMENT_TYPES.HOUSE,
        colshape: mp.colshapes.newCircle(250, 0, 15, -1),
        exitPosition: new mp.Vector3(250.32, 2.89, -51.5),
      }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 0, 15, -1),
          exitPosition: new mp.Vector3(285.39, 3.14, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 0, 15, -1),
          exitPosition: new mp.Vector3(320.27, 3.1, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 0, 15, -1),
          exitPosition: new mp.Vector3(355.38, 3.14, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 0, 15, -1),
          exitPosition: new mp.Vector3(380.32, 2.86, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 35, 15, -1),
          exitPosition: new mp.Vector3(252.9, 38.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 35, 15, -1),
          exitPosition: new mp.Vector3(287.93, 38.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 35, 15, -1),
          exitPosition: new mp.Vector3(322.9, 38.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 35, 15, -1),
          exitPosition: new mp.Vector3(357.92, 38.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 35, 15, -1),
          exitPosition: new mp.Vector3(382.87, 38.69, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 70, 15, -1),
          exitPosition: new mp.Vector3(254.33, 73.73, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 70, 15, -1),
          exitPosition: new mp.Vector3(289.33, 73.7, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 70, 15, -1),
          exitPosition: new mp.Vector3(324.33, 73.8, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 70, 15, -1),
          exitPosition: new mp.Vector3(359.33, 73.71, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 70, 15, -1),
          exitPosition: new mp.Vector3(384.38, 73.69, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 105, 15, -1),
          exitPosition: new mp.Vector3(246.64, 105.21, -53.11),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 105, 15, -1),
          exitPosition: new mp.Vector3(281.64, 105.25, -53.11),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 105, 15, -1),
          exitPosition: new mp.Vector3(316.64, 105.28, -53.11),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 105, 15, -1),
          exitPosition: new mp.Vector3(351.64, 105.24, -53.11),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 105, 15, -1),
          exitPosition: new mp.Vector3(376.63, 105.12, -53.11),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 140, 15, -1),
          exitPosition: new mp.Vector3(253.91, 139.02, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 140, 15, -1),
          exitPosition: new mp.Vector3(288.91, 139.1, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 140, 15, -1),
          exitPosition: new mp.Vector3(323.91, 139.02, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 140, 15, -1),
          exitPosition: new mp.Vector3(358.91, 139.05, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 140, 15, -1),
          exitPosition: new mp.Vector3(383.81, 139.15, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 175, 15, -1),
          exitPosition: new mp.Vector3(252.49, 175.76, -51.53),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 175, 15, -1),
          exitPosition: new mp.Vector3(287.55, 175.69, -51.53),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 175, 15, -1),
          exitPosition: new mp.Vector3(322.47, 175.78, -51.53),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 175, 15, -1),
          exitPosition: new mp.Vector3(357.52, 175.73, -51.53),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 175, 15, -1),
          exitPosition: new mp.Vector3(382.57, 175.8, -51.53),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 210, 15, -1),
          exitPosition: new mp.Vector3(253.98, 214.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 210, 15, -1),
          exitPosition: new mp.Vector3(289.05, 214.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 210, 15, -1),
          exitPosition: new mp.Vector3(324.01, 214.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 210, 15, -1),
          exitPosition: new mp.Vector3(358.94, 214.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 210, 15, -1),
          exitPosition: new mp.Vector3(383.94, 214.69, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 245, 15, -1),
          exitPosition: new mp.Vector3(251.51, 238.2, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 245, 15, -1),
          exitPosition: new mp.Vector3(286.47, 238.2, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 245, 15, -1),
          exitPosition: new mp.Vector3(321.52, 238.2, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 245, 15, -1),
          exitPosition: new mp.Vector3(356.55, 238.2, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 245, 15, -1),
          exitPosition: new mp.Vector3(381.56, 238.2, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 280, 15, -1),
          exitPosition: new mp.Vector3(254.06, 278.72, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 280, 15, -1),
          exitPosition: new mp.Vector3(289.06, 278.68, -51.77),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 280, 15, -1),
          exitPosition: new mp.Vector3(324.06, 278.69, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 280, 15, -1),
          exitPosition: new mp.Vector3(359.06, 278.67, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 280, 15, -1),
          exitPosition: new mp.Vector3(384.05, 278.77, -51.77),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 315, 15, -1),
          exitPosition: new mp.Vector3(255.05, 313.78, -51.8),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 315, 15, -1),
          exitPosition: new mp.Vector3(290.05, 313.83, -51.8),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 315, 15, -1),
          exitPosition: new mp.Vector3(325.05, 313.76, -51.8),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 315, 15, -1),
          exitPosition: new mp.Vector3(360.05, 313.77, -51.8),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 315, 15, -1),
          exitPosition: new mp.Vector3(385.09, 313.81, -51.8),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 350, 15, -1),
          exitPosition: new mp.Vector3(255.62, 349.61, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 350, 15, -1),
          exitPosition: new mp.Vector3(290.62, 349.73, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 350, 15, -1),
          exitPosition: new mp.Vector3(325.62, 349.61, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 350, 15, -1),
          exitPosition: new mp.Vector3(360.62, 349.66, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 350, 15, -1),
          exitPosition: new mp.Vector3(385.56, 349.77, -51.78),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 385, 15, -1),
          exitPosition: new mp.Vector3(243.56, 385.03, -53.47),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 385, 15, -1),
          exitPosition: new mp.Vector3(278.57, 385.05, -53.47),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 385, 15, -1),
          exitPosition: new mp.Vector3(313.57, 384.99, -53.47),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 385, 15, -1),
          exitPosition: new mp.Vector3(348.57, 385.06, -53.47),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 385, 15, -1),
          exitPosition: new mp.Vector3(373.7, 384.99, -53.47),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 420, 15, -1),
          exitPosition: new mp.Vector3(257.34, 421.55, -51.72),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 420, 15, -1),
          exitPosition: new mp.Vector3(292.34, 421.54, -51.72),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 420, 15, -1),
          exitPosition: new mp.Vector3(327.34, 421.52, -51.72),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 420, 15, -1),
          exitPosition: new mp.Vector3(362.34, 421.53, -51.72),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 420, 15, -1),
          exitPosition: new mp.Vector3(387.25, 421.63, -51.72),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 455, 15, -1),
          exitPosition: new mp.Vector3(245.11, 454.83, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 455, 15, -1),
          exitPosition: new mp.Vector3(280.1, 454.91, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 455, 15, -1),
          exitPosition: new mp.Vector3(315.1, 454.94, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 455, 15, -1),
          exitPosition: new mp.Vector3(350.1, 454.87, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 455, 15, -1),
          exitPosition: new mp.Vector3(375.13, 454.86, -53.2),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 490, 15, -1),
          exitPosition: new mp.Vector3(245.75, 492.46, -53.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 490, 15, -1),
          exitPosition: new mp.Vector3(280.72, 492.5, -53.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 490, 15, -1),
          exitPosition: new mp.Vector3(315.75, 492.43, -53.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 490, 15, -1),
          exitPosition: new mp.Vector3(350.75, 492.49, -53.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 490, 15, -1),
          exitPosition: new mp.Vector3(375.73, 492.51, -53.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(250, 525, 15, -1),
          exitPosition: new mp.Vector3(242.3, 524.74, -52.54),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(285, 525, 15, -1),
          exitPosition: new mp.Vector3(277.3, 524.76, -52.54),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(320, 525, 15, -1),
          exitPosition: new mp.Vector3(312.31, 524.71, -52.54),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(355, 525, 15, -1),
          exitPosition: new mp.Vector3(347.3, 524.74, -52.54),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.HOUSE,
          colshape: mp.colshapes.newCircle(380, 525, 15, -1),
          exitPosition: new mp.Vector3(372.26, 524.78, -52.54),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 0, 15, -1),
          exitPosition: new mp.Vector3(-103.89, 2.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 0, 15, -1),
          exitPosition: new mp.Vector3(-68.85, 2.64, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 0, 15, -1),
          exitPosition: new mp.Vector3(-33.82, 2.64, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 0, 15, -1),
          exitPosition: new mp.Vector3(1.02, 2.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 0, 15, -1),
          exitPosition: new mp.Vector3(35.97, 2.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 35, 15, -1),
          exitPosition: new mp.Vector3(-103.84, 36.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 35, 15, -1),
          exitPosition: new mp.Vector3(-69.08, 36.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 35, 15, -1),
          exitPosition: new mp.Vector3(-34.05, 36.61, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 35, 15, -1),
          exitPosition: new mp.Vector3(0.96, 36.62, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 35, 15, -1),
          exitPosition: new mp.Vector3(35.97, 36.62, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 70, 15, -1),
          exitPosition: new mp.Vector3(-104.06, 64.77, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 70, 15, -1),
          exitPosition: new mp.Vector3(-69.02, 64.76, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 70, 15, -1),
          exitPosition: new mp.Vector3(-33.91, 64.79, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 70, 15, -1),
          exitPosition: new mp.Vector3(0.99, 64.77, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 70, 15, -1),
          exitPosition: new mp.Vector3(36.01, 64.78, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 105, 15, -1),
          exitPosition: new mp.Vector3(-106.19, 103.7, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 105, 15, -1),
          exitPosition: new mp.Vector3(-71.15, 103.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 105, 15, -1),
          exitPosition: new mp.Vector3(-36.16, 103.7, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 105, 15, -1),
          exitPosition: new mp.Vector3(-1.13, 103.65, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 105, 15, -1),
          exitPosition: new mp.Vector3(33.9, 103.68, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 140, 15, -1),
          exitPosition: new mp.Vector3(-105.91, 144.11, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 140, 15, -1),
          exitPosition: new mp.Vector3(-71, 144.14, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 140, 15, -1),
          exitPosition: new mp.Vector3(-35.8, 144.16, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 140, 15, -1),
          exitPosition: new mp.Vector3(-1.03, 144.16, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 140, 15, -1),
          exitPosition: new mp.Vector3(33.99, 144.18, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 175, 15, -1),
          exitPosition: new mp.Vector3(-106.05, 177.08, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 175, 15, -1),
          exitPosition: new mp.Vector3(-71.06, 177.04, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 175, 15, -1),
          exitPosition: new mp.Vector3(-36.11, 177.05, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 175, 15, -1),
          exitPosition: new mp.Vector3(-1.1, 177.11, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 175, 15, -1),
          exitPosition: new mp.Vector3(33.87, 177.11, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 210, 15, -1),
          exitPosition: new mp.Vector3(-106, 209.88, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 210, 15, -1),
          exitPosition: new mp.Vector3(-70.95, 209.92, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 210, 15, -1),
          exitPosition: new mp.Vector3(-35.97, 209.93, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 210, 15, -1),
          exitPosition: new mp.Vector3(-0.97, 209.93, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 210, 15, -1),
          exitPosition: new mp.Vector3(34.05, 209.99, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 245, 15, -1),
          exitPosition: new mp.Vector3(-106.07, 244.46, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 245, 15, -1),
          exitPosition: new mp.Vector3(-70.94, 244.5, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 245, 15, -1),
          exitPosition: new mp.Vector3(-35.89, 244.48, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 245, 15, -1),
          exitPosition: new mp.Vector3(-0.95, 244.49, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 245, 15, -1),
          exitPosition: new mp.Vector3(34.06, 244.45, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-100, 280, 15, -1),
          exitPosition: new mp.Vector3(-105.86, 276.59, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-65, 280, 15, -1),
          exitPosition: new mp.Vector3(-70.88, 276.54, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(-30, 280, 15, -1),
          exitPosition: new mp.Vector3(-35.86, 276.57, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(5, 280, 15, -1),
          exitPosition: new mp.Vector3(-0.9, 276.5, -51.5),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.APARTMENT,
          colshape: mp.colshapes.newCircle(40, 280, 15, -1),
          exitPosition: new mp.Vector3(33.7, 276.94, -51.5),
        }),
        new ApartmentsGarageInterior({
          colshape: mp.colshapes.newCircle(500, 0, 15, -1),
          exitPosition: new mp.Vector3(505.98, -2.11, -100),
        }),
        new ApartmentsGarageInterior({
          colshape: mp.colshapes.newCircle(600, 0, 15, -1),
          exitPosition: new mp.Vector3(606.99, 0.53, -100),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.FHOUSE,
          colshape: mp.colshapes.newCircle(550.7, 7, 25.9, -1),
          exitPosition: new mp.Vector3(550.6, -13.2, -50),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.FHOUSE,
          colshape: mp.colshapes.newCircle(550.7, 56, 25.9, -1),
          exitPosition: new mp.Vector3(550.6, 36.8, -50),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.FHOUSE,
          colshape: mp.colshapes.newCircle(550.7, 106, 25.9, -1),
          exitPosition: new mp.Vector3(550.6, 86.8, -50),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.FHOUSE,
          colshape: mp.colshapes.newCircle(550.7, 156, 25.9, -1),
          exitPosition: new mp.Vector3(550.6, 136.8, -50),
        }),
        new ApartmentsInterior({
          type: APARTMENT_TYPES.FHOUSE,
          colshape: mp.colshapes.newCircle(550.7, 206, 25.9, -1),
          exitPosition: new mp.Vector3(550.6, 186.8, -50),
        });
    }, 500);
  let objectActionTimer = null,
    currentApartmentObjectSelect = null,
    enableObjectSearchHandler = !0;
  const objectActionTimerHandler = () => {
      const e = mp.players.local;
      if (0 === e.dimension)
        return void (
          isHandlerLoaded &&
          (null !== objectActionTimer &&
            (clearInterval(objectActionTimer), (objectActionTimer = null)),
          mp.keys.unbind(69, !0, objectActionKeyHandler),
          (isHandlerLoaded = !1))
        );
      if (!enableObjectSearchHandler) return;
      let t = null,
        o = 4;
      const s = global.gameplayCamera.getCoord(),
        i = global.gameplayCamera.getDirection(),
        a = new mp.Vector3(100 * i.x + s.x, 100 * i.y + s.y, 100 * i.z + s.z),
        c = mp.raycasting.testPointToPoint(s, a, e, 17);
      if (
        c &&
        (null != c.entity &&
          c.entity.__apartmentObject &&
          c.entity.__apartmentObject.canBeUsed &&
          (t = c.entity.__apartmentObject),
        !t && null != c.position)
      )
        for (const e of apartmentObjectList) {
          if (!e.canBeUsed || !mp.objects.exists(e.object)) continue;
          const s = mp.game.system.vdist(
            e.object.position.x,
            e.object.position.y,
            e.object.position.z,
            c.position.x,
            c.position.y,
            c.position.z
          );
          s < o && ((t = e), (o = s));
        }
      if (
        (t &&
          (!mp.objects.exists(t.object) ||
            mp.game.system.vdist(
              t.object.position.x,
              t.object.position.y,
              t.object.position.z,
              e.position.x,
              e.position.y,
              e.position.z
            ) > o) &&
          (t = null),
        null === currentApartmentObjectSelect)
      )
        null !== t &&
          ((currentApartmentObjectSelect = t),
          global.notifyKeyHelpShow("E", currentApartmentObjectSelect.useText));
      else if (null !== t) {
        if (t === currentApartmentObjectSelect) return;
        (currentApartmentObjectSelect = t),
          global.notifyKeyHelpShow("E", currentApartmentObjectSelect.useText);
      } else
        global.notifyKeyHelpHide("E", currentApartmentObjectSelect.useText),
          (currentApartmentObjectSelect = null);
    },
    objectActionKeyHandler = () => {
      null === currentApartmentObjectSelect ||
        !mp.objects.exists(currentApartmentObjectSelect.object) ||
        mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        global.isPlayerDeath ||
        !global.actionAntiFlood("usedObject", 500) ||
        (currentApartmentObjectSelect.useOnce
          ? (global.notifyKeyHelpHide(
              "E",
              currentApartmentObjectSelect.useText
            ),
            currentApartmentObjectSelect.onUse(),
            (currentApartmentObjectSelect = null))
          : currentApartmentObjectSelect.onUse());
    },
    registerUsedObject = (e, t) => {
      apartmentObjectUseMap.set(e, t);
    };
  (() => {
    const e = [
        mp.game.joaat("apa_mp_h_bed_chestdrawer_02"),
        mp.game.joaat("hei_heist_bed_chestdrawer_04"),
        mp.game.joaat("apa_mp_h_str_shelffloorm_02"),
        mp.game.joaat("ap_m_shelf_4"),
        mp.game.joaat("ap_m_shelf_5"),
        mp.game.joaat("ap_m_shelf_1"),
        mp.game.joaat("ap_m_shelf_6"),
        mp.game.joaat("ap_m_shelf_7"),
        mp.game.joaat("prop_rub_cabinet01"),
        mp.game.joaat("v_res_tre_storageunit"),
        mp.game.joaat("v_res_mconsolemod"),
        mp.game.joaat("v_res_tre_wardrobe"),
        mp.game.joaat("v_res_cabinet"),
      ],
      t = [
        mp.game.joaat("ap_m_shelf_4"),
        mp.game.joaat("ap_m_shelf_5"),
        mp.game.joaat("ap_m_shelf_1"),
        mp.game.joaat("ap_m_shelf_6"),
        mp.game.joaat("ap_m_shelf_7"),
        mp.game.joaat("v_res_cabinet"),
      ];
    e.forEach((e) => {
      registerUsedObject(e, {
        useText:
          "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0448\u043A\u0430\u0444",
        use: ({ object: o }) => {
          if (-1 !== t.indexOf(e)) {
            const e = mp.game.graphics.world3dToScreen2d(
              o.object.position.x,
              o.object.position.y,
              o.object.position.z
            );
            return void global.createMenuList({
              toPlayer:
                null == e
                  ? [0.5, 0.5]
                  : [e.x, Math.max(Math.min(e.y, 0.8), 0.4)],
              items: [
                [
                  "\u0428\u043A\u0430\u0444",
                  function () {
                    global.hideMenuList(),
                      apartmentInteriorType === APARTMENT_TYPES.HOUSE
                        ? mp.events.callRemote("server_house_warehouse")
                        : apartmentInteriorType === APARTMENT_TYPES.APARTMENT &&
                          mp.events.callRemote("server_apartments_warehouse");
                  },
                ],
                [
                  "\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431",
                  function () {
                    global.hideMenuList(),
                      apartmentInteriorType === APARTMENT_TYPES.HOUSE
                        ? mp.events.callRemote("server_house_warehouseClothes")
                        : apartmentInteriorType === APARTMENT_TYPES.APARTMENT &&
                          mp.events.callRemote(
                            "server_apartments_warehouseClothes"
                          );
                  },
                ],
                [
                  "\u041E\u0442\u043C\u0435\u043D\u0430",
                  function () {
                    global.hideMenuList();
                  },
                ],
              ],
            });
          }
          apartmentInteriorType === APARTMENT_TYPES.HOUSE
            ? mp.events.callRemote("server_house_warehouse")
            : apartmentInteriorType === APARTMENT_TYPES.APARTMENT &&
              mp.events.callRemote("server_apartments_warehouse");
        },
      });
    });
    const o = [
        mp.game.joaat("ap_m_cooking_1"),
        mp.game.joaat("ap_m_cooking_12"),
        mp.game.joaat("ap_m_cooking_19"),
        mp.game.joaat("ap_m_cooking_14"),
      ],
      s = [
        mp.game.joaat("prop_bar_fridge_01"),
        mp.game.joaat("prop_bar_fridge_02"),
        mp.game.joaat("prop_bar_fridge_03"),
        mp.game.joaat("prop_bar_fridge_04"),
        mp.game.joaat("ap_m_cooking_4"),
        mp.game.joaat("ap_m_cooking_1"),
        mp.game.joaat("ap_m_cooking_12"),
        mp.game.joaat("ap_m_cooking_19"),
        mp.game.joaat("ap_m_cooking_14"),
      ];
    s.forEach((e) => {
      const t = -1 !== o.indexOf(e);
      registerUsedObject(e, {
        useText: t
          ? "\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C"
          : "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0445\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u0438\u043A",
        use: ({ object: e }) =>
          t
            ? void global.createMenuList({
                toPlayer: [0.5, 0.5],
                items: [
                  [
                    "\u0413\u043E\u0442\u043E\u0432\u0438\u0442\u044C",
                    function () {
                      global.hideMenuList(),
                        mp.events.callRemote("server_cooking_start", "h");
                    },
                  ],
                  [
                    "\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u0438\u043A",
                    function () {
                      global.hideMenuList(),
                        apartmentInteriorType === APARTMENT_TYPES.HOUSE
                          ? mp.events.callRemote("server_house_warehouseFood")
                          : apartmentInteriorType ===
                              APARTMENT_TYPES.APARTMENT &&
                            mp.events.callRemote(
                              "server_apartments_warehouseFood"
                            );
                    },
                  ],
                  [
                    "\u041E\u0442\u043C\u0435\u043D\u0430",
                    function () {
                      global.hideMenuList();
                    },
                  ],
                ],
              })
            : void (apartmentInteriorType === APARTMENT_TYPES.HOUSE
                ? mp.events.callRemote("server_house_warehouseFood")
                : apartmentInteriorType === APARTMENT_TYPES.APARTMENT &&
                  mp.events.callRemote("server_apartments_warehouseFood")),
      });
    });
    const i = [
      mp.game.joaat("ap_m_cooking_20"),
      mp.game.joaat("ap_m_cooking_13"),
      mp.game.joaat("ap_m_cooking_7"),
      mp.game.joaat("prop_cooker_03"),
    ];
    i.forEach((e) => {
      registerUsedObject(e, {
        useText: "\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C",
        use: ({ object: e }) => {
          mp.events.callRemote("server_cooking_start", "h");
        },
      });
    });
  })(),
    (() => {
      const e = new Map(),
        t = new Map(),
        o = [
          {
            objectHash: mp.game.joaat("cls_casino_poker"),
            useText:
              "\u0441\u0435\u0441\u0442\u044C \u0437\u0430 \u0441\u0442\u043E\u043B",
            cancelText: "\u0432\u0441\u0442\u0430\u0442\u044C",
            seatPos: [
              {
                anim: [
                  "amb@code_human_in_bus_passenger_idles@male@sit@base",
                  "base",
                  1,
                ],
                heading: 90,
                position: new mp.Vector3(1.17, 0, 0.1),
              },
              {
                anim: [
                  "amb@code_human_in_bus_passenger_idles@male@sit@base",
                  "base",
                  1,
                ],
                heading: 135,
                position: new mp.Vector3(0.85, 1.55, 0.1),
              },
              {
                anim: [
                  "amb@code_human_in_bus_passenger_idles@male@sit@base",
                  "base",
                  1,
                ],
                heading: 225,
                position: new mp.Vector3(-0.85, 1.55, 0.1),
              },
              {
                anim: [
                  "amb@code_human_in_bus_passenger_idles@male@sit@base",
                  "base",
                  1,
                ],
                heading: 315,
                position: new mp.Vector3(-0.85, -1.55, 0.1),
              },
              {
                anim: [
                  "amb@code_human_in_bus_passenger_idles@male@sit@base",
                  "base",
                  1,
                ],
                heading: 45,
                position: new mp.Vector3(0.85, -1.55, 0.1),
              },
            ],
          },
        ];
      let s = null;
      o.forEach((o) => {
        registerUsedObject(o.objectHash, {
          useText: o.useText,
          once: !0,
          use: ({ object: e }) => {
            if (null !== s) return;
            const a = e.clientId;
            let c = -1;
            for (let t, s = 0; s < o.seatPos.length; s++)
              if (
                ((t = !1),
                mp.players.forEachInStreamRange((e) => {
                  e.__aptSeatSyncObjectId === a &&
                    e.__aptSeatSyncSeatId === s &&
                    (t = !0);
                }),
                !t)
              ) {
                c = s;
                break;
              }
            if (-1 === c) return;
            const n = `inSyncAptObject${a}_seatIndex`;
            i(mp.players.local.remoteId, a, c);
            let r = 0,
              l = 0,
              p = !1;
            const h = () => {
                if (p || a !== e.clientId) {
                  mp.players.local.freezePosition(!1),
                    mp.players.local.setCollision(!0, !1),
                    mp.players.local.stopAnimTask(
                      o.seatPos[c].anim[0],
                      o.seatPos[c].anim[1],
                      3
                    ),
                    global.notifyKeyHelpHide("C", o.cancelText),
                    clearInterval(s),
                    (s = null),
                    mp.keys.unbind(67, !0, d),
                    mp.players.forEach((e) => {
                      e === mp.players.local ||
                        void 0 === e[n] ||
                        (clearInterval(e[n]), delete e[n]);
                    }),
                    0 < l &&
                      mp.events.callRemote(
                        "server_apartmentObject_sync_seat_stop"
                      );
                  const i = t.get(o.objectHash);
                  return (
                    i && i.onExit && i.onExit(e),
                    void (enableObjectSearchHandler = !0)
                  );
                }
                if (0 == ++r % 10) {
                  let t = [];
                  mp.players.forEachInStreamRange((e) => {
                    e === mp.players.local ||
                      void 0 !== e[n] ||
                      50 < t.length ||
                      ((e[n] = setInterval(
                        () =>
                          mp.players.exists(e)
                            ? 0 === e.handle
                              ? (l--, clearInterval(e[n]), void delete e[n])
                              : void 0
                            : (l--, void clearInterval(e[n])),
                        500
                      )),
                      t.push(e.remoteId),
                      l++);
                  }),
                    0 < t.length &&
                      mp.events.callRemote(
                        "server_apartmentObject_sync_seat",
                        e.clientId,
                        c,
                        t.join("_")
                      );
                }
              },
              d = () => {
                mp.gui.cursor.visible || (p = !0);
              };
            mp.keys.bind(67, !0, d),
              clearInterval(s),
              (s = setInterval(h, 0)),
              global.notifyKeyHelpShow("C", o.cancelText);
            const m = t.get(o.objectHash);
            m && m.onEnter && m.onEnter(e), (enableObjectSearchHandler = !1);
          },
        }),
          e.set(o.objectHash, o);
      }),
        mp.events.add("client_apartmentObject_sync_seat", (e, t, o) => {
          const s = mp.players.atRemoteId(e);
          s &&
            0 !== s.handle &&
            ((s.__aptSeatSyncObjectId = t),
            (s.__aptSeatSyncSeatId = o),
            (s.__aptSeatSyncTimer = setInterval(
              () =>
                mp.players.exists(s)
                  ? void (
                      0 === s.handle &&
                      (clearInterval(s.__aptSeatSyncTimer),
                      delete s.__aptSeatSyncTimer,
                      delete s.__aptSeatSyncSeatId,
                      delete s.__aptSeatSyncObjectId)
                    )
                  : void clearInterval(s.__aptSeatSyncTimer),
              1e3
            )),
            i(e, t, o));
        }),
        mp.events.add("client_apartmentObject_sync_seat_stop", (e) => {
          const t = mp.players.atRemoteId(e);
          t &&
            0 !== t.handle &&
            (clearInterval(t.__aptSeatSyncTimer),
            delete t.__aptSeatSyncTimer,
            delete t.__aptSeatSyncSeatId,
            delete t.__aptSeatSyncObjectId,
            t.freezePosition(!1),
            t.setCollision(!0, !1),
            t.clearTasksImmediately());
        });
      const i = async (t, o, s) => {
        const i = mp.players.atRemoteId(t);
        if (i && 0 !== i.handle) {
          const t = apartmentObjectList[o];
          if (t && mp.objects.exists(t.object) && 0 !== t.object.handle) {
            const o = e.get(t.object.getModel());
            if (o && o.seatPos[s]) {
              const e = o.seatPos[s];
              if (!mp.game.streaming.hasAnimDictLoaded(e.anim[0]))
                for (
                  mp.game.streaming.requestAnimDict(e.anim[0]);
                  !mp.game.streaming.hasAnimDictLoaded(e.anim[0]);

                )
                  await mp.game.waitAsync(0);
              if (
                0 !== i.handle &&
                mp.objects.exists(t.object) &&
                0 !== t.object.handle
              ) {
                i.freezePosition(!0), i.setCollision(!1, !0);
                const o = t.object.getRotation(2).z;
                i.setHeading(e.heading + o);
                const s = mp.game.object.getObjectOffsetFromCoords(
                  t.object.position.x,
                  t.object.position.y,
                  t.object.position.z,
                  o,
                  e.position.x,
                  e.position.y,
                  e.position.z
                );
                i.setCoordsNoOffset(s.x, s.y, s.z, !1, !1, !1),
                  i.taskPlayAnim(
                    e.anim[0],
                    e.anim[1],
                    1,
                    0,
                    -1,
                    e.anim[2],
                    1,
                    !0,
                    !0,
                    !0
                  );
              }
            }
          }
        }
      };
      (function (e, o) {
        t.set(e, o);
      })(mp.game.joaat("cls_casino_poker"), {
        onEnter: (e) => {
          global.mainMenuItems.set(
            "\u0418\u0433\u0440\u0430\u0442\u044C \u0432 \u043F\u043E\u043A\u0435\u0440",
            () => {
              global.notifyKeyHelpShow(),
                mp.objects.exists(e.object) &&
                  global.setCameraRot(
                    new mp.Vector3(
                      e.object.position.x,
                      e.object.position.y,
                      e.object.position.z + 1.8
                    ),
                    new mp.Vector3(270, -90, e.object.getRotation(2).z),
                    80,
                    900
                  ),
                mp.events.callRemote(
                  "server_apartment_poker_start",
                  e.clientId
                );
            }
          ),
            global.mainMenuItems.set(
              "\u0412\u0437\u044F\u0442\u044C \u0444\u0438\u0448\u043A\u0438",
              () => {
                mp.events.callRemote("server_apartment_poker_chip");
              }
            );
        },
        onExit: () => {
          global.mainMenuItems.delete(
            "\u0418\u0433\u0440\u0430\u0442\u044C \u0432 \u043F\u043E\u043A\u0435\u0440"
          ),
            global.mainMenuItems.delete(
              "\u0412\u0437\u044F\u0442\u044C \u0444\u0438\u0448\u043A\u0438"
            ),
            global.resetCamera();
        },
      });
    })(),
    (() => {
      registerUsedObject(mp.game.joaat("xm_prop_crates_rifles_01a"), {
        useText:
          "\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043A\u043B\u0430\u0434",
        use: ({ object: e }) => {
          mp.events.callRemote("server_fHouse_warehouse");
        },
      }),
        registerUsedObject(mp.game.joaat("gr_prop_gr_bench_01a"), {
          useText:
            "\u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435",
          use: ({ object: e }) => {
            mp.events.callRemote("server_fHouse_craft");
          },
        }),
        registerUsedObject(mp.game.joaat("prop_laptop_01a"), {
          useText:
            "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440",
          use: ({ object: e }) => {
            mp.events.callRemote("server_fHouse_computer");
          },
        });
    })(),
    (() => {
      var e = Math.max,
        t = Math.min;
      registerUsedObject(mp.game.joaat("prop_dart_bd_cab_01"), {
        useText:
          "\u043A\u0438\u043D\u0443\u0442\u044C \u0434\u0440\u043E\u0442\u0438\u043A\u0438",
        once: !0,
        use: ({ object: o }) => {
          const s = mp.players.local,
            i = o.object,
            a = s.dimension;
          mp.game.graphics.hasStreamedTextureDictLoaded("darts") ||
            mp.game.graphics.requestStreamedTextureDict("darts", !0),
            mp.game.streaming.hasAnimDictLoaded("mini@darts") ||
              mp.game.streaming.requestAnimDict("mini@darts"),
            mp.game.audio.registerScriptWithAudio(0),
            mp.game.audio.requestScriptAudioBank("SCRIPT\\DARTS", !1);
          const c = i.getOffsetFromInWorldCoords(0, -3.3, 0),
            n = mp.game.gameplay.getGroundZFor3dCoord(c.x, c.y, c.z, 0, !1);
          global.hideUI(!0),
            s.setHeading(i.getHeading()),
            s.clearTasksImmediately(),
            s.taskPlayAnimAdvanced(
              "mini@darts",
              "throw_idle_a",
              c.x,
              c.y,
              n,
              0,
              0,
              i.getHeading(),
              1,
              1,
              -1,
              0,
              0,
              0,
              0
            );
          const r = mp.cameras.new(
            "default",
            i.getOffsetFromInWorldCoords(0, -1.5, 0),
            new mp.Vector3(0, 0, 274),
            39
          );
          r.setActive(!0),
            mp.game.cam.renderScriptCams(!0, !0, 500, !1, !1),
            r.pointAtCoord(i.position.x, i.position.y, i.position.z),
            r.shake("HAND_SHAKE", 0.1);
          let l = 0,
            p = 0,
            h = 0,
            d = 0,
            m = !1;
          const _ = new mp.Event("render", () => {
              var o = Math.floor;
              if (!mp.objects.exists(i) || 0 === i.handle || a !== s.dimension)
                return (
                  mp.cameras.exists(r) && r.destroy(),
                  mp.game.cam.renderScriptCams(!1, !0, 500, !1, !1),
                  s.clearTasksImmediately(),
                  global.hideUI(!1),
                  void _.destroy()
                );
              const c = mp.game.controls.getControlNormal(0, 1) / 2,
                n = -mp.game.controls.getControlNormal(0, 2) / 2,
                x = o(10 * Math.random() - 5) / 1e3,
                P = o(10 * Math.random() - 5) / 1e3;
              (l = e(t(l + x + c, 0.25), -0.25)),
                (p = e(t(p + P + n, 0.25), -0.25));
              const V = i.getOffsetFromInWorldCoords(l, -0.25, p);
              if (
                (mp.game.graphics.setDrawOrigin(V.x, V.y, V.z, 0),
                mp.game.graphics.drawSprite(
                  "darts",
                  "dart_reticules",
                  0,
                  0,
                  0.03,
                  0.05,
                  0,
                  255,
                  255,
                  255,
                  255
                ),
                mp.game.invoke("0xFF0B610F6BE0D7AF"),
                mp.game.controls.isControlJustReleased(0, 24) && !m)
              ) {
                m = !0;
                const e = i.getOffsetFromInWorldCoords(l, -0.05, p);
                s.clearTasksImmediately(),
                  s.taskPlayAnim(
                    "mini@darts",
                    "throw_underlay",
                    1,
                    1,
                    -1,
                    0,
                    0,
                    !1,
                    !1,
                    !1
                  );
                const t = new mp.Event("render", () => {
                  if (
                    0.15 < s.getAnimCurrentTime("mini@darts", "throw_underlay")
                  ) {
                    const o = s.getWorldPositionOfBone(
                        s.getBoneIndexByName("IK_R_Hand")
                      ),
                      i = y(e.x, e.y, e.z);
                    (d += i),
                      mp.events.callRemote(
                        "s:apartments:darts:hit",
                        h,
                        i,
                        d,
                        o.x,
                        o.y,
                        o.z,
                        e.x,
                        e.y,
                        e.z
                      ),
                      t.destroy(),
                      (m = !1),
                      h++,
                      3 <= h &&
                        (mp.cameras.exists(r) && r.destroy(),
                        mp.game.cam.renderScriptCams(!1, !0, 500, !1, !1),
                        s.clearTasks(),
                        global.hideUI(!1),
                        _.destroy());
                  }
                });
              }
              m ||
                s.isPlayingAnim("mini@darts", "throw_idle_a", 3) ||
                s.taskPlayAnim(
                  "mini@darts",
                  "throw_idle_a",
                  8,
                  1,
                  -1,
                  1,
                  0,
                  !1,
                  !1,
                  !1
                );
            }),
            y = (e, t, o) => {
              let s = 0,
                a = new mp.Vector3(e, t, o);
              (a = i.getOffsetFromGivenWorldCoords(a.x, a.y, a.z)),
                (a = new mp.Vector3(a.x, a.y, a.z)),
                (a.x += 0.0041),
                (a.z += 2e-4);
              let c = mp.game.gameplay.getAngleBetween2dVectors(0, 1, a.x, a.z);
              const n = Math.sqrt(a.x * a.x + a.z * a.z);
              if (0.009 > n)
                mp.game.audio.playSoundFromCoord(
                  -1,
                  "DARTS_HIT_BULLSEYE_MASTER",
                  e,
                  t,
                  o,
                  null,
                  !1,
                  0,
                  !1
                ),
                  (s = 50);
              else if (0.021 > n)
                mp.game.audio.playSoundFromCoord(
                  -1,
                  "DARTS_HIT_BOARD_MASTER",
                  e,
                  t,
                  o,
                  null,
                  !1,
                  0,
                  !1
                ),
                  (s = 25);
              else if (0.226 <= n)
                mp.game.audio.playSoundFromCoord(
                  -1,
                  "DARTS_HIT_WALL_MASTER",
                  e,
                  t,
                  o,
                  null,
                  !1,
                  0,
                  !1
                ),
                  (s = 0);
              else {
                let i = 0,
                  r = 1,
                  l = [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0,
                  ];
                (l[0] = 20),
                  (l[10] = 3),
                  (l[1] = 1),
                  (l[11] = 19),
                  (l[2] = 18),
                  (l[12] = 7),
                  (l[3] = 4),
                  (l[13] = 16),
                  (l[4] = 13),
                  (l[14] = 8),
                  (l[5] = 6),
                  (l[15] = 11),
                  (l[6] = 10),
                  (l[16] = 14),
                  (l[7] = 15),
                  (l[17] = 9),
                  (l[8] = 2),
                  (l[18] = 12),
                  (l[9] = 17),
                  (l[19] = 5),
                  (l[20] = 20),
                  0.1285 < n && 0.1405 > n
                    ? (mp.game.audio.playSoundFromCoord(
                        -1,
                        "DARTS_SCORE_TRIPLE_MASTER",
                        e,
                        t,
                        o,
                        null,
                        !1,
                        0,
                        !1
                      ),
                      (r = 3))
                    : 0.2132 < n && 0.226 > n
                    ? (mp.game.audio.playSoundFromCoord(
                        -1,
                        "DARTS_SCORE_DOUBLE_MASTER",
                        e,
                        t,
                        o,
                        null,
                        !1,
                        0,
                        !1
                      ),
                      (r = 2))
                    : (mp.game.audio.playSoundFromCoord(
                        -1,
                        "DARTS_HIT_BOARD_MASTER",
                        e,
                        t,
                        o,
                        null,
                        !1,
                        0,
                        !1
                      ),
                      (r = 1)),
                  0 > a.x + a.y + a.z && (c = 360 - c);
                for (let a = 0; 21 > a; a++)
                  c >= i - 9 &&
                    c < i + 9 &&
                    (((c <= i - 8.1 && c >= i - 9.9) ||
                      (c >= i + 8.1 && c <= i + 9.9)) &&
                      mp.game.audio.playSoundFromCoord(
                        -1,
                        "DARTS_HIT_WIRE_MASTER",
                        e,
                        t,
                        o,
                        null,
                        !1,
                        0,
                        !1
                      ),
                    (s = l[a] * r)),
                    (i += 18);
              }
              return s;
            };
        },
      }),
        mp.events.add(
          "c:apartments:darts:hit",
          async (e, t, o, s, i, a, c, n, r, l, p) => {
            const h = mp.players.atRemoteId(e);
            if (!h || 0 === h.handle) return;
            const d = mp.objects.new(
              mp.game.joaat("prop_dart_1"),
              new mp.Vector3(a, c, n),
              { dimension: h.dimension }
            );
            if (!d) return;
            for (; 0 === d.handle; ) await mp.game.waitAsync(0);
            d.setRotation(
              90,
              Math.round(90 * Math.random()),
              mp.game.gameplay.getHeadingFromVector2d(a - r, c - l) - 180,
              0,
              !0
            );
            const m = new mp.Event("render", () =>
              mp.objects.exists(d) && 0 !== d.handle
                ? void (
                    d.slide(r, l, p, 0.15, 0.15, 0.15, !1) &&
                    (mp.game.audio.playSoundFromCoord(
                      -1,
                      "DARTS_HIT_DART_MASTER",
                      r,
                      l,
                      p,
                      null,
                      !1,
                      0,
                      !1
                    ),
                    m.destroy(),
                    setTimeout(() => {
                      d.destroy();
                    }, 1e4),
                    mp.gui.chat.push(
                      `!{C2A2DA}${t}[${e}] получает ${s} очков за бросок`
                    ),
                    2 <= o &&
                      mp.gui.chat.push(
                        `!{C2A2DA}За подход заработано ${i} очков. (${t}[${e}])`
                      ))
                  )
                : void m.destroy()
            );
          }
        );
    })();
  function createFloorPosList(e, t, o) {
    let s = [...e];
    for (let a = 0; a < t - 1; a++)
      for (let t = 0; t < e.length; t++)
        s.push(new mp.Vector3(e[t].x, e[t].y, e[t].z + o * (a + 1)));
    return s;
  }
  const tempEventMap = new Map();
  function createTempEvent(e, t) {
    const o = tempEventMap.get(e);
    o && mp.events.remove(e, o), mp.events.add(e, t), tempEventMap.set(e, t);
  }
}
