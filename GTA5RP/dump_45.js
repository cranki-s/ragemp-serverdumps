{
  const localPlayer = mp.players.local,
    browserBrowser = global.mainBrowser;
  (global.isGameBrowserOpen = !1),
    global.rpc.on("client_rpBrowser_open", function () {
      global.isGameBrowserOpen ||
        global.rpc.triggerBrowser(
          browserBrowser,
          "client_browser_rpBrowser_open"
        );
    }),
    global.rpc.on("client_rpBrowser_close", function () {
      global.isGameBrowserOpen &&
        global.rpc.triggerBrowser(
          browserBrowser,
          "client_browser_rpBrowser_close"
        );
    }),
    global.rpc.register("client_rpBrowser_getPlayerData", function () {
      return {
        playerFaction: global.getEntityVariable(localPlayer, "factionId", ""),
        playerFactionType: global.getEntityVariable(
          localPlayer,
          "factionType",
          -1
        ),
      };
    });
  let casinoRouletteData = null;
  global.rpc.register("__client_casinoRoulette_data", async () => {
    try {
      if (null === casinoRouletteData) {
        const [a, b, c, d] = await rpc.callServer("server_gRoulette_getData");
        return (
          (casinoRouletteData = a.map((a) => ({
            id: a[0],
            name: a[1],
            desc: a[2],
            image: a[3],
            donatePrice: a[4],
            bpPrice: a[5],
            donateCount: a[6],
            moneyCount: a[7],
            prizeList: a[8].map((a) => ({
              name: a[0],
              image: a[1],
              imageClass: a[2],
            })),
            specialName: a[9],
            specialPrice: a[10],
          }))),
          { roulette: casinoRouletteData, donate: b, bp: c, special: d }
        );
      }
      const [a, b, c] = await rpc.callServer("server_gRoulette_getMoney");
      return { roulette: casinoRouletteData, donate: a, bp: b, special: c };
    } catch (a) {}
  }),
    mp.events.add("__client_menu_browserOpenSite", (a) => {
      browserBrowser.execute(`window.mainBrowser.openSite('${a}')`);
    });
  let fiveVitoFavoriteList = [];
  global.rpc.register("__client_5vito_fList_get", () => fiveVitoFavoriteList),
    global.rpc.register("__client_5vito_fList_add", (a) => {
      fiveVitoFavoriteList.push(a);
    }),
    global.rpc.register("__client_5vito_fList_delete", (a) => {
      fiveVitoFavoriteList = fiveVitoFavoriteList.filter(
        (b) => b.uId !== a.uId
      );
    }),
    global.rpc.on("__client_5vito_startTestDrive", async (a) => {
      const b = mp.vehicles.new(
        mp.game.joaat(a.model),
        mp.players.local.position,
        { dimension: mp.players.local.remoteId + 1 }
      );
      for (let c = 0; 0 === b.handle && 1e4 > c; ++c)
        await mp.game.waitAsync(0);
      const c = setInterval(() => {
        mp.vehicles.exists(b) &&
          global.mainBrowser.execute(
            `mainHud.vehicleData.speed = ${Math.round(3.6 * b.getSpeed())};`
          );
      }, 250);
      global.mainBrowser.execute(`
        mainHud.vehicleData.enable = true;
        mainHud.vehicleData.speed = 0;
        mainHud.vehicleData.fuel = 100;
        mainHud.vehicleData.engine = true;
        mainHud.vehicleData.lock = false;
        mainHud.vehicleData.indicatorLeft = false;
        mainHud.vehicleData.indicatorRight = false;
    `);
      let d = 0,
        e = -1,
        f = 1;
      const g = () =>
        !mp.vehicles.exists(b) || (2e3 < ++d && mp.players.local.vehicle != b)
          ? (mp.events.remove("render", g),
            clearInterval(c),
            mp.vehicles.exists(b) && b.destroy(),
            global.mainBrowser.execute(`mainHud.vehicleData.enable = false;`),
            void mp.events.callRemote("server_5vito_endVehTestDrive"))
          : void (-1 !== e && b.setMaxSpeed(e));
      setTimeout(() => {
        if (0 !== b.handle) {
          (e = -1),
            (f = 1),
            b.setCustomPrimaryColour(
              a.color[0][0],
              a.color[0][1],
              a.color[0][2]
            ),
            b.setCustomSecondaryColour(
              a.color[1][0],
              a.color[1][1],
              a.color[1][2]
            ),
            b.setModColor1(a.colorType[0], 0, 0),
            b.setModColor2(a.colorType[1], 0),
            b.setExtraColours(a.pColor, a.wColor),
            -1 !== a.neon[0] &&
              (b.setNeonLightsColour(a.neon[0], a.neon[1], a.neon[2]),
              b.setNeonLightEnabled(0, !0),
              b.setNeonLightEnabled(1, !0),
              b.setNeonLightEnabled(2, !0),
              b.setNeonLightEnabled(3, !0)),
            a.mods.forEach((a) => {
              if (55 == a[0]) b.setWindowTint(a[1] + 1);
              else if (22 == a[0])
                b.setLights(2),
                  0 > a[1]
                    ? (b.toggleMod(22, !1),
                      mp.game.invoke("0xE41033B25D003A07", b.handle, 255))
                    : (b.toggleMod(22, !0),
                      mp.game.invoke("0xE41033B25D003A07", b.handle, a[1]));
              else if (11 === a[0])
                switch (a[1]) {
                  case 0:
                    f = 2;
                    break;
                  case 1:
                    f = 5;
                    break;
                  case 2:
                    f = 10;
                    break;
                  case 3:
                    f = 15;
                    break;
                  default:
                }
              b.setMod(a[0], a[1]);
            }),
            mp.players.local.taskEnterVehicle(b.handle, 1e3, -1, 2, 16, 0);
          const c = global.getVehicleSpeedDataByModel(b.getModel());
          c.maxSpeed && (e = c.maxSpeed + f - 1),
            c.enginePowerMultiplier && (f += c.enginePowerMultiplier),
            b.setEnginePowerMultiplier(f),
            b.setEngineOn(!0, !0, !1),
            mp.events.add("render", g);
        }
      }, 100);
    }),
    global.rpc.register("__client_5vito_getStreetName", (a) => {
      const b = [
          "AIRP",
          "ALAMO",
          "ALTA",
          "ARMYB",
          "BANHAMC",
          "BANNING",
          "BEACH",
          "BHAMCA",
          "BRADP",
          "BRADT",
          "BURTON",
          "CALAFB",
          "CANNY",
          "CCREAK",
          "CHAMH",
          "CHIL",
          "CHU",
          "CMSW",
          "CYPRE",
          "DAVIS",
          "DELBE",
          "DELPE",
          "DELSOL",
          "DESRT",
          "DOWNT",
          "DTVINE",
          "EAST_V",
          "EBURO",
          "ELGORL",
          "ELYSIAN",
          "GALFISH",
          "GOLF",
          "GRAPES",
          "GREATC",
          "HARMO",
          "HAWICK",
          "HORS",
          "HUMLAB",
          "JAIL",
          "KOREAT",
          "LACT",
          "LAGO",
          "LDAM",
          "LEGSQU",
          "LMESA",
          "LOSPUER",
          "MIRR",
          "MORN",
          "MOVIE",
          "MTCHIL",
          "MTGORDO",
          "MTJOSE",
          "MURRI",
          "NCHU",
          "NOOSE",
          "OCEANA",
          "PALCOV",
          "PALETO",
          "PALFOR",
          "PALHIGH",
          "PALMPOW",
          "PBLUFF",
          "PBOX",
          "PROCOB",
          "RANCHO",
          "RGLEN",
          "RICHM",
          "ROCKF",
          "RTRAK",
          "SANAND",
          "SANCHIA",
          "SANDY",
          "SKID",
          "SLAB",
          "STAD",
          "STRAW",
          "TATAMO",
          "TERMINA",
          "TEXTI",
          "TONGVAH",
          "TONGVAV",
          "VCANA",
          "VESP",
          "VINE",
          "WINDF",
          "WVINE",
          "ZANCUDO",
          "ZP_ORT",
          "ZQ_UAR",
        ],
        c = mp.game.zone.getNameOfZone(a[0], a[1], a[2]),
        d = b.includes(c)
          ? [
              "Los Santos International Airport",
              "Alamo Sea",
              "Alta",
              "Fort Zancudo",
              "Banham Canyon Dr",
              "Banning",
              "Vespucci Beach",
              "Banham Canyon",
              "Braddock Pass",
              "Braddock Tunnel",
              "Burton",
              "Calafia Bridge",
              "Raton Canyon",
              "Cassidy Creek",
              "Chamberlain Hills",
              "Vinewood Hills",
              "Chumash",
              "Chiliad Mountain State Wilderness",
              "Cypress Flats",
              "Davis",
              "Del Perro Beach",
              "Del Perro",
              "La Puerta",
              "Grand Senora Desert",
              "Downtown",
              "Downtown Vinewood",
              "East Vinewood",
              "El Burro Heights",
              "El Gordo Lighthouse",
              "Elysian Island",
              "Galilee",
              "GWC and Golfing Society",
              "Grapeseed",
              "Great Chaparral",
              "Harmony",
              "Hawick",
              "Vinewood Racetrack",
              "Humane Labs and Research",
              "Bolingbroke Penitentiary",
              "Little Seoul",
              "Land Act Reservoir",
              "Lago Zancudo",
              "Land Act Dam",
              "Legion Square",
              "La Mesa",
              "La Puerta",
              "Mirror Park",
              "Morningwood",
              "Richards Majestic",
              "Mount Chiliad",
              "Mount Gordo",
              "Mount Josiah",
              "Murrieta Heights",
              "North Chumash",
              "N.O.O.S.E",
              "Pacific Ocean",
              "Paleto Cove",
              "Paleto Bay",
              "Paleto Forest",
              "Palomino Highlands",
              "Palmer-Taylor Power Station",
              "Pacific Bluffs",
              "Pillbox Hill",
              "Procopio Beach",
              "Rancho",
              "Richman Glen",
              "Richman",
              "Rockford Hills",
              "Redwood Lights Track",
              "San Andreas",
              "San Chianski Mountain Range",
              "Sandy Shores",
              "Mission Row",
              "Stab City",
              "Maze Bank Arena",
              "Strawberry",
              "Tataviam Mountains",
              "Terminal",
              "Textile City",
              "Tongva Hills",
              "Tongva Valley",
              "Vespucci Canals",
              "Vespucci",
              "Vinewood",
              "Ron Alternates Wind Farm",
              "West Vinewood",
              "Zancudo River",
              "Port of South Los Santos",
              "Davis Quartz",
            ][b.indexOf(c)]
          : "",
        e = mp.game.pathfind.getStreetNameAtCoord(a[0], a[1], a[2], 0, 0),
        f = mp.game.ui.getStreetNameFromHashKey(e.streetName);
      return `${d}, ${f}`;
    });
}
