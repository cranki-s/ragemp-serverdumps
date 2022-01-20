{
  const localPlayer = mp.players.local;
  let localPlayerFarmingSkillLevel = 0,
    tempBlips = [];
  mp.events.add("client_farm_job_start", (o) => {
    (localPlayerFarmingSkillLevel = o),
      tempBlips.forEach((o) => mp.blips.exists(o) && o.destroy()),
      (tempBlips = []),
      tempBlips.push(
        mp.blips.new(582, new mp.Vector3(2134.05, 4780.66, 41.32), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(386, new mp.Vector3(2234.61, 5066.47, 60), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(400, new mp.Vector3(2146.215, 5181.02, 60), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(385, new mp.Vector3(2232.57, 4903.47, 40.07), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(387, new mp.Vector3(2355.71, 4944.28, 41.59), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(387, new mp.Vector3(2136.07, 4834.98, 40.33), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      ),
      tempBlips.push(
        mp.blips.new(632, new mp.Vector3(2202.25, 4982.87, 42.12), {
          color: 0,
          dimension: 0,
          shortRange: !1,
          scale: 1,
        })
      );
  }),
    mp.events.add("client_farm_job_end", () => {
      tempBlips.forEach((o) => mp.blips.exists(o) && o.destroy()),
        (tempBlips = []);
    }),
    mp.events.add("client_character_skills_farming", (o) => {
      localPlayerFarmingSkillLevel = o;
    }),
    (() => {
      var o = Math.sqrt,
        t = Math.pow,
        e = Math.PI,
        r = Math.atan2;
      const i = new Map(),
        n = [],
        a = { NONE: 0, GROW: 2, NEED_TAKE: 4 };
      class s {
        constructor({
          uId: o,
          name: t,
          nodes: e,
          getGrowAward: r,
          getTakeAward: s,
          getClearAward: c,
        }) {
          (this.uId = o),
            (this.name = t),
            (this.nodes = e.map((o, t) => ({
              index: t,
              position: o.position,
              rotation: o.rotation,
              status: a.NONE,
              isClear: !1,
              localEnableBoost: 0 == t % 2,
              localIsBoost: !1,
              lastUpdate: -1,
              lastPingByPlayer: -1,
            }))),
            (this.getGrowAward = r),
            (this.getTakeAward = s),
            (this.getClearAward = c),
            (this.isAnyNodeNeedTake = !1),
            (this.nodeForBoostCount = 0),
            (this.localBoostSend = !1),
            (this.localIsTryBoost = !1),
            (this.isPlayerInZone = !1),
            (this.loaded = !1),
            i.set(this.uId, this),
            n.push(this);
        }
        pingNode(o) {
          this.nodes[o].lastPingByPlayer = getTime();
        }
        isNodeFree(o, t = 1e4) {
          return this.nodes[o].lastPingByPlayer + t < getTime();
        }
        requestPingNode(o) {
          mp.events.callRemote("server_farm_field_pingNode", this.uId, o);
        }
        requestNodeSubAction(o, t) {
          mp.events.callRemote(
            "server_farm_field_nodeSubAction",
            this.uId,
            o,
            t
          );
        }
        onChangeStatus(o, t, e, r) {}
        onPlayerStartNodeSubAction(o, t, e) {}
        onLoad() {}
        onUnload() {}
        static getStatusFromServer(o) {
          return 0 === o
            ? a.NONE
            : 1 === o
            ? a.NONE
            : 2 === o
            ? a.GROW
            : 3 === o
            ? a.GROW
            : 4 === o
            ? a.NEED_TAKE
            : 5 === o
            ? a.NEED_TAKE
            : 0;
        }
        static getClearStatusFromServer(o) {
          return (
            0 !== o &&
            (!(1 !== o) || (2 !== o && (!(3 !== o) || (4 !== o && !(5 !== o)))))
          );
        }
      }
      mp.events.add("client_farm_filed_sync", (o, t, e) => {
        const r = i.get(o);
        if (!r) return;
        r.nodeForBoostCount = t;
        const n = getTime(),
          a = e.split("").map((o) => parseInt(o));
        for (let c = 0; c < a.length; c++)
          (r.nodes[c].status = s.getStatusFromServer(a[c])),
            (r.nodes[c].isClear = s.getClearStatusFromServer(a[c])),
            (r.nodes[c].lastUpdate = n);
        r.loaded || ((r.loaded = !0), r.onLoad());
      }),
        mp.events.add("client_farm_filed_node", (o, t, e, r, n) => {
          const a = i.get(o);
          if (a) {
            a.nodeForBoostCount = n;
            const o = a.nodes[e];
            a.onChangeStatus(t, e, o.status, s.getStatusFromServer(r)),
              (o.status = s.getStatusFromServer(r)),
              (o.isClear = s.getClearStatusFromServer(r)),
              (o.lastUpdate = getTime());
          }
        }),
        mp.events.add("client_farm_filed_nodes", (o, t, e) => {
          const r = i.get(o);
          if (r) {
            r.nodeForBoostCount = e;
            const o = getTime();
            for (const e of t.split("%")) {
              const t = parseInt(e.slice(0, e.length - 1)),
                i = s.getStatusFromServer(parseInt(e.slice(-1))),
                n = r.nodes[t];
              r.onChangeStatus(-1, t, n.status, i),
                (n.status = i),
                (n.isClear = s.getClearStatusFromServer(parseInt(e.slice(-1)))),
                (n.lastUpdate = o);
            }
          }
        }),
        mp.events.add("client_farm_filed_node_ping", (o, t) => {
          const e = i.get(o);
          e && e.pingNode(t);
        }),
        mp.events.add("client_farm_filed_node_subAction", (o, t, e, r) => {
          const n = i.get(o);
          n && n.onPlayerStartNodeSubAction(t, e, r);
        }),
        mp.events.add("client_farm_job_end", () => {
          for (const o of n) o.loaded && ((o.loaded = !1), o.onUnload());
        });
      const c = [
          {
            position: new mp.Vector3(2225.29, 5024.35, 43.29),
            rotation: new mp.Vector3(1, -3, 45),
          },
          {
            position: new mp.Vector3(2220.52, 5029.43, 43.55),
            rotation: new mp.Vector3(2, -3, 43),
          },
          {
            position: new mp.Vector3(2215.59, 5034.62, 43.8),
            rotation: new mp.Vector3(3, -3, 43),
          },
          {
            position: new mp.Vector3(2210.64, 5039.59, 44.18),
            rotation: new mp.Vector3(3, -4, 45),
          },
          {
            position: new mp.Vector3(2205.72, 5044.66, 44.55),
            rotation: new mp.Vector3(3, -4, 45),
          },
          {
            position: new mp.Vector3(2200.75, 5049.62, 44.73),
            rotation: new mp.Vector3(0, -5, 45),
          },
          {
            position: new mp.Vector3(2195.81, 5054.61, 44.68),
            rotation: new mp.Vector3(-1, -7, 45),
          },
          {
            position: new mp.Vector3(2190.86, 5059.69, 44.49),
            rotation: new mp.Vector3(-2, -7, 45),
          },
          {
            position: new mp.Vector3(2193.63, 5067.17, 45.22),
            rotation: new mp.Vector3(-3, -9, 45),
          },
          {
            position: new mp.Vector3(2198.61, 5062.23, 45.48),
            rotation: new mp.Vector3(-1, -7, 45),
          },
          {
            position: new mp.Vector3(2203.48, 5057.29, 45.52),
            rotation: new mp.Vector3(1, -6, 45),
          },
          {
            position: new mp.Vector3(2208.62, 5052.03, 45.33),
            rotation: new mp.Vector3(2.5, -5, 45),
          },
          {
            position: new mp.Vector3(2213.4, 5047, 44.94),
            rotation: new mp.Vector3(3, -4, 45),
          },
          {
            position: new mp.Vector3(2218.08, 5042.32, 44.47),
            rotation: new mp.Vector3(4, -3, 45),
          },
          {
            position: new mp.Vector3(2222.57, 5037.83, 44.05),
            rotation: new mp.Vector3(3, -2, 45),
          },
          {
            position: new mp.Vector3(2227, 5033.37, 43.75),
            rotation: new mp.Vector3(3, -2, 45),
          },
          {
            position: new mp.Vector3(2231.24, 5028.95, 43.48),
            rotation: new mp.Vector3(2.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2236.13, 5033.87, 43.58),
            rotation: new mp.Vector3(4, -1.5, 45),
          },
          {
            position: new mp.Vector3(2231.28, 5038.75, 43.99),
            rotation: new mp.Vector3(4, -3.5, 45),
          },
          {
            position: new mp.Vector3(2226.47, 5043.78, 44.47),
            rotation: new mp.Vector3(5, -5.5, 45),
          },
          {
            position: new mp.Vector3(2221.69, 5048.58, 45.05),
            rotation: new mp.Vector3(5, -3.5, 45),
          },
          {
            position: new mp.Vector3(2216.92, 5053.46, 45.55),
            rotation: new mp.Vector3(3, -5.5, 45),
          },
          {
            position: new mp.Vector3(2211.82, 5058.8, 45.99),
            rotation: new mp.Vector3(2, -6, 45),
          },
          {
            position: new mp.Vector3(2206.83, 5063.82, 46.26),
            rotation: new mp.Vector3(1, -6, 45),
          },
          {
            position: new mp.Vector3(2201.9, 5068.87, 46.26),
            rotation: new mp.Vector3(-1, -7, 45),
          },
          {
            position: new mp.Vector3(2196.81, 5074.01, 46.05),
            rotation: new mp.Vector3(-4, -7, 45),
          },
          {
            position: new mp.Vector3(2192.06, 5078.85, 45.6),
            rotation: new mp.Vector3(-5, -9, 45),
          },
          {
            position: new mp.Vector3(2186.87, 5084.19, 45.28),
            rotation: new mp.Vector3(1, -9.5, 45),
          },
          {
            position: new mp.Vector3(2182.02, 5088.91, 45.26),
            rotation: new mp.Vector3(1, -10, 45),
          },
          {
            position: new mp.Vector3(2177.22, 5093.8, 45.28),
            rotation: new mp.Vector3(0.5, -7, 45),
          },
          {
            position: new mp.Vector3(2181.81, 5098.92, 46.06),
            rotation: new mp.Vector3(-2, -7, 45),
          },
          {
            position: new mp.Vector3(2186.67, 5094.1, 46.35),
            rotation: new mp.Vector3(-2.5, -9, 45),
          },
          {
            position: new mp.Vector3(2191.34, 5089.3, 46.45),
            rotation: new mp.Vector3(3, -5, 45),
          },
          {
            position: new mp.Vector3(2196.16, 5084.39, 46.54),
            rotation: new mp.Vector3(-3, -8, 45),
          },
          {
            position: new mp.Vector3(2200.95, 5079.52, 46.88),
            rotation: new mp.Vector3(-3, -6, 45),
          },
          {
            position: new mp.Vector3(2205.79, 5074.67, 47.07),
            rotation: new mp.Vector3(1, -5, 45),
          },
          {
            position: new mp.Vector3(2210.57, 5069.73, 46.86),
            rotation: new mp.Vector3(1, -3.5, 45),
          },
          {
            position: new mp.Vector3(2215.4, 5064.79, 46.6),
            rotation: new mp.Vector3(2, -3, 45),
          },
          {
            position: new mp.Vector3(2220.31, 5059.94, 46.18),
            rotation: new mp.Vector3(5, -3, 45),
          },
          {
            position: new mp.Vector3(2224.82, 5055.21, 45.61),
            rotation: new mp.Vector3(5, -2, 45),
          },
          {
            position: new mp.Vector3(2229.52, 5050.4, 45.03),
            rotation: new mp.Vector3(5, -2, 45),
          },
          {
            position: new mp.Vector3(2234.2, 5045.78, 44.49),
            rotation: new mp.Vector3(5, -1, 45),
          },
          {
            position: new mp.Vector3(2239.34, 5040.46, 43.85),
            rotation: new mp.Vector3(5, 0, 45),
          },
          {
            position: new mp.Vector3(2260.62, 5028.68, 42.74),
            rotation: new mp.Vector3(2, 0, 45),
          },
          {
            position: new mp.Vector3(2255.6, 5033.77, 42.91),
            rotation: new mp.Vector3(2, 1, 45),
          },
          {
            position: new mp.Vector3(2250.54, 5039, 43.14),
            rotation: new mp.Vector3(4, 1, 45),
          },
          {
            position: new mp.Vector3(2245.72, 5043.93, 43.73),
            rotation: new mp.Vector3(6, 0.5, 45),
          },
          {
            position: new mp.Vector3(2240.86, 5048.76, 44.26),
            rotation: new mp.Vector3(4, 1, 45),
          },
          {
            position: new mp.Vector3(2236.1, 5053.71, 44.84),
            rotation: new mp.Vector3(5, 0.5, 45),
          },
          {
            position: new mp.Vector3(2231.08, 5058.81, 45.55),
            rotation: new mp.Vector3(5, 0.5, 45),
          },
          {
            position: new mp.Vector3(2226.24, 5063.7, 46.12),
            rotation: new mp.Vector3(5, 0.5, 45),
          },
          {
            position: new mp.Vector3(2221.37, 5068.72, 46.7),
            rotation: new mp.Vector3(3.5, -1, 45),
          },
          {
            position: new mp.Vector3(2216.65, 5073.54, 47.16),
            rotation: new mp.Vector3(3, -1.5, 45),
          },
          {
            position: new mp.Vector3(2211.84, 5078.33, 47.48),
            rotation: new mp.Vector3(1.5, -2, 45),
          },
          {
            position: new mp.Vector3(2206.9, 5083.39, 47.63),
            rotation: new mp.Vector3(0, -4, 45),
          },
          {
            position: new mp.Vector3(2202.28, 5088.18, 47.55),
            rotation: new mp.Vector3(-1, -6, 45),
          },
          {
            position: new mp.Vector3(2197.21, 5093.26, 47.46),
            rotation: new mp.Vector3(0, -7, 45),
          },
          {
            position: new mp.Vector3(2192.34, 5098.09, 47.35),
            rotation: new mp.Vector3(-1, -6, 45),
          },
          {
            position: new mp.Vector3(2187.67, 5102.82, 47.02),
            rotation: new mp.Vector3(-3, -7, 45),
          },
          {
            position: new mp.Vector3(2191.59, 5108.79, 48),
            rotation: new mp.Vector3(-2, -9, 45),
          },
          {
            position: new mp.Vector3(2196.42, 5103.68, 48.32),
            rotation: new mp.Vector3(-2, -9, 45),
          },
          {
            position: new mp.Vector3(2201.3, 5098.91, 48.3),
            rotation: new mp.Vector3(-1, -8, 45),
          },
          {
            position: new mp.Vector3(2206.37, 5093.72, 48.3),
            rotation: new mp.Vector3(-1, -6, 45),
          },
          {
            position: new mp.Vector3(2211.22, 5088.76, 48.25),
            rotation: new mp.Vector3(2, -6, 45),
          },
          {
            position: new mp.Vector3(2216.15, 5083.73, 47.95),
            rotation: new mp.Vector3(3, -4.5, 45),
          },
          {
            position: new mp.Vector3(2220.63, 5079.22, 47.55),
            rotation: new mp.Vector3(4, -3.5, 45),
          },
          {
            position: new mp.Vector3(2225.42, 5074.32, 47),
            rotation: new mp.Vector3(5, -3.5, 45),
          },
          {
            position: new mp.Vector3(2230.52, 5069.16, 46.36),
            rotation: new mp.Vector3(5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2235.1, 5064.44, 45.72),
            rotation: new mp.Vector3(5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2239.78, 5059.7, 45.05),
            rotation: new mp.Vector3(6, -2.5, 45),
          },
          {
            position: new mp.Vector3(2244.51, 5054.82, 44.46),
            rotation: new mp.Vector3(4.5, -1, 45),
          },
          {
            position: new mp.Vector3(2249.45, 5049.84, 43.87),
            rotation: new mp.Vector3(4.5, -1, 45),
          },
          {
            position: new mp.Vector3(2254.55, 5044.65, 43.3),
            rotation: new mp.Vector3(4, -1.5, 45),
          },
          {
            position: new mp.Vector3(2259.62, 5039.65, 42.98),
            rotation: new mp.Vector3(1.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2264.36, 5034.88, 42.7),
            rotation: new mp.Vector3(1.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2270.56, 5038.4, 43),
            rotation: new mp.Vector3(1.5, -2, 45),
          },
          {
            position: new mp.Vector3(2265.47, 5043.49, 43.21),
            rotation: new mp.Vector3(1.5, -2, 45),
          },
          {
            position: new mp.Vector3(2260.45, 5048.63, 43.45),
            rotation: new mp.Vector3(2.5, -2, 45),
          },
          {
            position: new mp.Vector3(2255.48, 5053.64, 43.82),
            rotation: new mp.Vector3(4.5, -2, 45),
          },
          {
            position: new mp.Vector3(2250.53, 5058.75, 44.44),
            rotation: new mp.Vector3(4.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2245.36, 5063.94, 44.99),
            rotation: new mp.Vector3(5.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2240.38, 5069.09, 45.76),
            rotation: new mp.Vector3(6.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2235.3, 5074.24, 46.53),
            rotation: new mp.Vector3(7.5, 0.5, 45),
          },
          {
            position: new mp.Vector3(2230.37, 5079.17, 47.2),
            rotation: new mp.Vector3(4.5, -0.5, 45),
          },
          {
            position: new mp.Vector3(2225.09, 5084.64, 47.94),
            rotation: new mp.Vector3(4.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2220.04, 5089.72, 48.54),
            rotation: new mp.Vector3(3.5, -3.5, 45),
          },
          {
            position: new mp.Vector3(2214.85, 5095.09, 48.92),
            rotation: new mp.Vector3(2.5, -4.5, 45),
          },
          {
            position: new mp.Vector3(2209.9, 5100.01, 49.25),
            rotation: new mp.Vector3(2.5, -7.5, 45),
          },
          {
            position: new mp.Vector3(2205.24, 5104.81, 49.36),
            rotation: new mp.Vector3(1.5, -7.5, 45),
          },
          {
            position: new mp.Vector3(2200.6, 5109.64, 49.29),
            rotation: new mp.Vector3(-4.5, -7.5, 45),
          },
          {
            position: new mp.Vector3(2196.2, 5113.83, 49.03),
            rotation: new mp.Vector3(-2.5, -11.5, 45),
          },
          {
            position: new mp.Vector3(2201.66, 5118.17, 50.18),
            rotation: new mp.Vector3(-0.5, -10, 45),
          },
          {
            position: new mp.Vector3(2206.68, 5113.22, 50.33),
            rotation: new mp.Vector3(-0.5, -8, 45),
          },
          {
            position: new mp.Vector3(2211.71, 5108.1, 50.22),
            rotation: new mp.Vector3(1.5, -7, 45),
          },
          {
            position: new mp.Vector3(2216.49, 5103.21, 49.9),
            rotation: new mp.Vector3(3.5, -6, 45),
          },
          {
            position: new mp.Vector3(2221.08, 5098.49, 49.4),
            rotation: new mp.Vector3(5, -4, 45),
          },
          {
            position: new mp.Vector3(2225.73, 5093.81, 48.74),
            rotation: new mp.Vector3(6, -4, 45),
          },
          {
            position: new mp.Vector3(2230.23, 5089.22, 48.05),
            rotation: new mp.Vector3(6, -2, 45),
          },
          {
            position: new mp.Vector3(2234.85, 5084.37, 47.34),
            rotation: new mp.Vector3(7, -1.5, 45),
          },
          {
            position: new mp.Vector3(2239.67, 5079.5, 46.56),
            rotation: new mp.Vector3(7, -0.5, 45),
          },
          {
            position: new mp.Vector3(2244.32, 5074.86, 45.83),
            rotation: new mp.Vector3(6, 0.5, 45),
          },
          {
            position: new mp.Vector3(2249.16, 5069.84, 45.17),
            rotation: new mp.Vector3(6, 0.5, 45),
          },
          {
            position: new mp.Vector3(2253.72, 5065.23, 44.59),
            rotation: new mp.Vector3(4, 0.5, 45),
          },
          {
            position: new mp.Vector3(2258.3, 5060.61, 44.22),
            rotation: new mp.Vector3(3.5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2263.12, 5055.81, 43.77),
            rotation: new mp.Vector3(4, -1.5, 45),
          },
          {
            position: new mp.Vector3(2267.79, 5051.03, 43.38),
            rotation: new mp.Vector3(2, -1.5, 45),
          },
          {
            position: new mp.Vector3(2272.93, 5045.69, 43.28),
            rotation: new mp.Vector3(2, -1.5, 45),
          },
          {
            position: new mp.Vector3(2279.87, 5048.61, 43.51),
            rotation: new mp.Vector3(2, -5.5, 45),
          },
          {
            position: new mp.Vector3(2275.07, 5053.62, 43.75),
            rotation: new mp.Vector3(2, -4.5, 45),
          },
          {
            position: new mp.Vector3(2270.22, 5058.47, 43.98),
            rotation: new mp.Vector3(2, -2.5, 45),
          },
          {
            position: new mp.Vector3(2265.2, 5063.57, 44.31),
            rotation: new mp.Vector3(3, -2.5, 45),
          },
          {
            position: new mp.Vector3(2260.32, 5068.55, 44.71),
            rotation: new mp.Vector3(3, -2.5, 45),
          },
          {
            position: new mp.Vector3(2255.04, 5073.83, 45.23),
            rotation: new mp.Vector3(5, -1.5, 45),
          },
          {
            position: new mp.Vector3(2250.06, 5078.89, 45.82),
            rotation: new mp.Vector3(6, -1.5, 45),
          },
          {
            position: new mp.Vector3(2244.94, 5084.17, 46.73),
            rotation: new mp.Vector3(7, -1.5, 45),
          },
          {
            position: new mp.Vector3(2239.99, 5089.2, 47.55),
            rotation: new mp.Vector3(7, -1.5, 45),
          },
          {
            position: new mp.Vector3(2234.76, 5094.5, 48.47),
            rotation: new mp.Vector3(8, -3, 45),
          },
          {
            position: new mp.Vector3(2229.77, 5099.53, 49.45),
            rotation: new mp.Vector3(7, -4, 45),
          },
          {
            position: new mp.Vector3(2224.58, 5104.82, 50.25),
            rotation: new mp.Vector3(6, -6, 45),
          },
          {
            position: new mp.Vector3(2219.75, 5109.7, 50.85),
            rotation: new mp.Vector3(6, -9, 45),
          },
          {
            position: new mp.Vector3(2214.92, 5114.59, 51.27),
            rotation: new mp.Vector3(3, -9, 45),
          },
          {
            position: new mp.Vector3(2210.38, 5119.33, 51.45),
            rotation: new mp.Vector3(-2, -9, 45),
          },
          {
            position: new mp.Vector3(2206.32, 5123.72, 51.35),
            rotation: new mp.Vector3(1, -8, 45),
          },
          {
            position: new mp.Vector3(2211.45, 5128.42, 52.55),
            rotation: new mp.Vector3(1, -8, 42),
          },
          {
            position: new mp.Vector3(2216.22, 5123.12, 52.49),
            rotation: new mp.Vector3(1, -8, 45),
          },
          {
            position: new mp.Vector3(2220.97, 5118.33, 52.27),
            rotation: new mp.Vector3(2, -8, 45),
          },
          {
            position: new mp.Vector3(2225.29, 5113.84, 51.76),
            rotation: new mp.Vector3(7, -8, 45),
          },
          {
            position: new mp.Vector3(2230.05, 5109, 50.86),
            rotation: new mp.Vector3(7, -6, 45),
          },
          {
            position: new mp.Vector3(2234.7, 5104.14, 49.92),
            rotation: new mp.Vector3(9, -4, 45),
          },
          {
            position: new mp.Vector3(2239.41, 5099.31, 48.85),
            rotation: new mp.Vector3(8, -3, 45),
          },
          {
            position: new mp.Vector3(2243.81, 5095.12, 47.98),
            rotation: new mp.Vector3(7, -1.5, 45),
          },
          {
            position: new mp.Vector3(2248.37, 5090.52, 47.12),
            rotation: new mp.Vector3(7.5, -1, 45),
          },
          {
            position: new mp.Vector3(2252.98, 5085.74, 46.28),
            rotation: new mp.Vector3(7.5, -1, 45),
          },
          {
            position: new mp.Vector3(2257.85, 5080.92, 45.64),
            rotation: new mp.Vector3(4, -1, 45),
          },
          {
            position: new mp.Vector3(2262.63, 5076, 45.15),
            rotation: new mp.Vector3(4, -1, 45),
          },
          {
            position: new mp.Vector3(2267.18, 5071.35, 44.85),
            rotation: new mp.Vector3(2, -2, 45),
          },
          {
            position: new mp.Vector3(2271.78, 5066.69, 44.6),
            rotation: new mp.Vector3(3, -4, 45),
          },
          {
            position: new mp.Vector3(2276.76, 5061.54, 44.32),
            rotation: new mp.Vector3(1, -2, 45),
          },
          {
            position: new mp.Vector3(2281.37, 5056.9, 44.24),
            rotation: new mp.Vector3(1, -4, 45),
          },
          {
            position: new mp.Vector3(2285.54, 5052.75, 44.12),
            rotation: new mp.Vector3(1, -5, 45),
          },
          {
            position: new mp.Vector3(2289.95, 5058.18, 44.69),
            rotation: new mp.Vector3(2, -5, 45),
          },
          {
            position: new mp.Vector3(2285.15, 5063.05, 44.86),
            rotation: new mp.Vector3(1, -6, 45),
          },
          {
            position: new mp.Vector3(2280.31, 5067.87, 45.02),
            rotation: new mp.Vector3(1, -8, 45),
          },
          {
            position: new mp.Vector3(2275.41, 5072.82, 45.26),
            rotation: new mp.Vector3(2, -6, 45),
          },
          {
            position: new mp.Vector3(2270.65, 5077.71, 45.38),
            rotation: new mp.Vector3(2, -6, 45),
          },
          {
            position: new mp.Vector3(2265.97, 5082.5, 45.59),
            rotation: new mp.Vector3(3, -6, 45),
          },
          {
            position: new mp.Vector3(2261.24, 5087.37, 46.03),
            rotation: new mp.Vector3(5, -3, 45),
          },
          {
            position: new mp.Vector3(2256.07, 5092.51, 46.87),
            rotation: new mp.Vector3(7, -4, 45),
          },
          {
            position: new mp.Vector3(2251.14, 5097.49, 47.81),
            rotation: new mp.Vector3(8, -5, 45),
          },
          {
            position: new mp.Vector3(2246.26, 5102.53, 48.84),
            rotation: new mp.Vector3(9, -5, 45),
          },
          {
            position: new mp.Vector3(2241.49, 5107.3, 50.05),
            rotation: new mp.Vector3(10, -6, 45),
          },
          {
            position: new mp.Vector3(2236.63, 5112.21, 51.33),
            rotation: new mp.Vector3(9, -8, 45),
          },
          {
            position: new mp.Vector3(2231.98, 5117.01, 52.34),
            rotation: new mp.Vector3(9, -8, 45),
          },
          {
            position: new mp.Vector3(2227.25, 5121.88, 53.14),
            rotation: new mp.Vector3(4, -9, 45),
          },
          {
            position: new mp.Vector3(2222.48, 5126.75, 53.54),
            rotation: new mp.Vector3(2.5, -10, 45),
          },
          {
            position: new mp.Vector3(2217.82, 5131.36, 53.68),
            rotation: new mp.Vector3(2, -11, 45),
          },
          {
            position: new mp.Vector3(2221.86, 5137.56, 54.65),
            rotation: new mp.Vector3(3, -5, 45),
          },
          {
            position: new mp.Vector3(2226.27, 5132.74, 54.36),
            rotation: new mp.Vector3(3.5, 0, 45),
          },
          {
            position: new mp.Vector3(2231.03, 5127.89, 53.92),
            rotation: new mp.Vector3(4.5, 0, 45),
          },
          {
            position: new mp.Vector3(2235.78, 5123.11, 53.23),
            rotation: new mp.Vector3(7, 0, 45),
          },
          {
            position: new mp.Vector3(2240.23, 5118.57, 52.43),
            rotation: new mp.Vector3(8, -2, 45),
          },
          {
            position: new mp.Vector3(2244.77, 5113.94, 51.32),
            rotation: new mp.Vector3(11, -5, 45),
          },
          {
            position: new mp.Vector3(2249.37, 5109.28, 50),
            rotation: new mp.Vector3(11, -7, 45),
          },
          {
            position: new mp.Vector3(2254.12, 5104.46, 48.83),
            rotation: new mp.Vector3(9, -7, 45),
          },
          {
            position: new mp.Vector3(2258.46, 5100.1, 47.95),
            rotation: new mp.Vector3(6, -6.5, 45),
          },
          {
            position: new mp.Vector3(2263, 5095.46, 47.2),
            rotation: new mp.Vector3(7, -9, 45),
          },
          {
            position: new mp.Vector3(2267.75, 5090.6, 46.5),
            rotation: new mp.Vector3(4, -9, 45),
          },
          {
            position: new mp.Vector3(2272.71, 5085.69, 46.05),
            rotation: new mp.Vector3(2, -9, 45),
          },
          {
            position: new mp.Vector3(2277.43, 5080.78, 45.94),
            rotation: new mp.Vector3(0, -5, 45),
          },
          {
            position: new mp.Vector3(2282.16, 5076, 45.78),
            rotation: new mp.Vector3(2, -5, 45),
          },
          {
            position: new mp.Vector3(2286.82, 5071.24, 45.51),
            rotation: new mp.Vector3(2, -5, 45),
          },
          {
            position: new mp.Vector3(2291.19, 5066.81, 45.23),
            rotation: new mp.Vector3(3, -4, 45),
          },
          {
            position: new mp.Vector3(2295.45, 5062.53, 45),
            rotation: new mp.Vector3(3, -2, 45),
          },
        ],
        d = new (class extends s {
          constructor({
            uId: o,
            name: t,
            nodes: e,
            getGrowAward: r,
            getTakeAward: i,
            getClearAward: n,
          }) {
            super({
              uId: o,
              name: t,
              nodes: e,
              getGrowAward: r,
              getTakeAward: i,
              getClearAward: n,
            }),
              (this.nodePickupInterval = null),
              (this.nodePickupLoad = !1),
              (this.isStartGrow = !1),
              (this.isStartTake = !1),
              (this.currentNode = null),
              (this.takeReturnItemMarker = null),
              (this.takeReturnItemPickup = null),
              (this.tempMarkers = []),
              (this.tempObjects = []),
              (this.tempPickups = []),
              (this.tempInterval = null);
            for (const a of this.nodes) a.pickup = null;
            mp.objects.new(
              mp.game.joaat("prop_rub_boxpile_04"),
              new mp.Vector3(2259.87, 5023.41, 42.62),
              { dimension: 0, alpha: 255, rotation: new mp.Vector3(0, 0, 0) }
            ),
              (this.bucketInterval = null),
              (this.bucketEndBlip = null),
              (this.bucketEndMarker = null),
              (this.bucketEndPickup = null),
              global.handItemEventOnSet("farmCabbageBucket", () => {
                null != this.bucketInterval &&
                  clearInterval(this.bucketInterval),
                  (this.bucketInterval = setInterval(() => {
                    mp.game.controls.disableControlAction(0, 22, !0),
                      mp.game.controls.disableControlAction(0, 23, !0),
                      mp.game.controls.disableControlAction(0, 24, !0),
                      mp.game.controls.disableControlAction(0, 25, !0),
                      (global.disableAnimList = !0);
                  }, 0)),
                  localPlayer.resetMovementClipset(0.25),
                  localPlayer.resetStrafeClipset();
              }),
              global.handItemEventOnRemove("farmCabbageBucket", () => {
                null != this.bucketInterval &&
                  clearInterval(this.bucketInterval),
                  (this.bucketInterval = null),
                  (global.disableAnimList = !1),
                  mp.blips.exists(this.bucketEndBlip) &&
                    this.bucketEndBlip.destroy(),
                  mp.markers.exists(this.bucketEndMarker) &&
                    this.bucketEndMarker.destroy(),
                  this.bucketEndPickup &&
                    (this.bucketEndPickup.destroy(),
                    (this.bucketEndPickup = null));
              }),
              new global.CustomScenarioAnimWithItem(
                "farmCabbageBucket",
                "farmCabbageBucketItem",
                "anim@heists@box_carry@",
                "idle",
                49
              ),
              mp.attachmentMngr.register(
                "farmCabbageBucketItem",
                "prop_cardbordbox_01a",
                28422,
                new mp.Vector3(0, -0.02, -0.07),
                new mp.Vector3(0, 320, 90)
              );
          }
          async onChangeStatus(o, t, e, r) {
            if (localPlayer.remoteId !== o) return;
            const i = this.nodes[t].isClear;
            setTimeout(() => {
              !i &&
                this.nodes[t].isClear &&
                mp.api.notify.info(
                  `+${this.getClearAward()}$ к зарплате во время PayDay`
                );
            }, 1);
          }
          async onPlayerStartNodeSubAction(o, t, i) {
            const n = mp.players.atRemoteId(o);
            if (n && 0 !== n.handle)
              if ((this.pingNode(t), i.startsWith("grow"))) {
                if (n === localPlayer) {
                  global.disableChatAndKeys(!0),
                    (global.enableCameraOnDisabled = !0);
                  const o = parseInt(i.slice(-1)),
                    t = this.tempMarkers[o];
                  mp.markers.exists(t) &&
                    (localPlayer.setHeading(
                      (180 *
                        r(
                          t.position.y - localPlayer.position.y,
                          t.position.x - localPlayer.position.x
                        )) /
                        e +
                        270
                    ),
                    t.destroy());
                  const n = this.tempPickups[o];
                  n && n.destroy();
                }
                if (
                  !mp.game.streaming.hasAnimDictLoaded(
                    "amb@world_human_gardener_plant@male@enter"
                  ) ||
                  !mp.game.streaming.hasAnimDictLoaded(
                    "amb@world_human_gardener_plant@male@exit"
                  )
                ) {
                  mp.game.streaming.requestAnimDict(
                    "amb@world_human_gardener_plant@male@enter"
                  ),
                    mp.game.streaming.requestAnimDict(
                      "amb@world_human_gardener_plant@male@exit"
                    );
                  do await mp.game.waitAsync(50);
                  while (
                    !mp.game.streaming.hasAnimDictLoaded(
                      "amb@world_human_gardener_plant@male@exit"
                    )
                  );
                }
                if (!mp.players.exists(n) || 0 === n.handle) return;
                if (
                  ("farmCabbageBucket" === n.getVariable("cSen") &&
                    (n.clearTasksImmediately(),
                    mp.attachmentMngr.removeFor(
                      n,
                      mp.game.joaat("farmCabbageBucketItem")
                    )),
                  n.taskPlayAnim(
                    "amb@world_human_gardener_plant@male@enter",
                    "enter",
                    8,
                    0,
                    -1,
                    0,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  await mp.game.waitAsync(4e3),
                  !mp.players.exists(n) || 0 === n.handle)
                )
                  return;
                if (
                  (n.taskPlayAnim(
                    "amb@world_human_gardener_plant@male@exit",
                    "exit",
                    8,
                    0,
                    -1,
                    0,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  await mp.game.waitAsync(5e3),
                  !mp.players.exists(n) || 0 === n.handle)
                )
                  return;
                n.clearTasksImmediately(),
                  "farmCabbageBucket" === n.getVariable("cSen") &&
                    (mp.attachmentMngr.addClient(
                      n,
                      mp.game.joaat("farmCabbageBucketItem")
                    ),
                    n.taskPlayAnim(
                      "anim@heists@box_carry@",
                      "idle",
                      8,
                      0,
                      -1,
                      49,
                      0,
                      !1,
                      !1,
                      !1
                    )),
                  n === localPlayer &&
                    (global.disableChatAndKeys(!1),
                    (global.enableCameraOnDisabled = !1),
                    0 ===
                      this.tempMarkers.filter((o) => mp.markers.exists(o))
                        .length &&
                      (mp.events.callRemote(
                        "server_farm_field_grow",
                        this.uId,
                        t
                      ),
                      (this.isStartGrow = !1),
                      this.destroyTempObjects(),
                      mp.api.notify.info(
                        `+${this.getGrowAward()}$ к зарплате во время PayDay`
                      )));
              } else if (i.startsWith("take")) {
                if (n === localPlayer) {
                  global.disableChatAndKeys(!0),
                    (global.enableCameraOnDisabled = !0);
                  const o = parseInt(i.slice(-1)),
                    t = this.tempMarkers[o];
                  mp.markers.exists(t) && t.destroy();
                  const n = this.tempPickups[o];
                  n && n.destroy();
                  const a = this.tempObjects[o];
                  mp.objects.exists(a) &&
                    localPlayer.setHeading(
                      (180 *
                        r(
                          a.position.y - localPlayer.position.y,
                          a.position.x - localPlayer.position.x
                        )) /
                        e +
                        270
                    );
                }
                if (
                  !mp.game.streaming.hasAnimDictLoaded(
                    "amb@world_human_gardener_plant@male@enter"
                  ) ||
                  !mp.game.streaming.hasAnimDictLoaded(
                    "amb@world_human_gardener_plant@male@exit"
                  )
                ) {
                  mp.game.streaming.requestAnimDict(
                    "amb@world_human_gardener_plant@male@enter"
                  ),
                    mp.game.streaming.requestAnimDict(
                      "amb@world_human_gardener_plant@male@exit"
                    );
                  do await mp.game.waitAsync(50);
                  while (
                    !mp.game.streaming.hasAnimDictLoaded(
                      "amb@world_human_gardener_plant@male@exit"
                    )
                  );
                }
                if (!mp.players.exists(n) || 0 === n.handle) return;
                n.clearTasksImmediately(),
                  mp.attachmentMngr.removeFor(
                    n,
                    mp.game.joaat("farmCabbageBucketItem")
                  );
                const o = mp.game.object.getObjectOffsetFromCoords(
                  n.position.x,
                  n.position.y,
                  n.position.z,
                  n.getHeading(),
                  0.55,
                  0,
                  -1
                );
                o.z = mp.game.gameplay.getGroundZFor3dCoord(
                  o.x,
                  o.y,
                  o.z + 1,
                  0,
                  !1
                );
                const a = mp.objects.new(
                  mp.game.joaat("prop_cardbordbox_01a"),
                  o,
                  {
                    alpha: 255,
                    dimension: 0,
                    rotation: new mp.Vector3(0, 0, n.getHeading()),
                  }
                );
                if (
                  (n.taskPlayAnim(
                    "amb@world_human_gardener_plant@male@enter",
                    "enter",
                    8,
                    0,
                    -1,
                    0,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  await mp.game.waitAsync(4e3),
                  !mp.players.exists(n) || 0 === n.handle)
                )
                  return a.destroy();
                if (n === localPlayer) {
                  const o = parseInt(i.slice(-1)),
                    t = this.tempObjects[o];
                  mp.objects.exists(t) && t.destroy();
                }
                if (
                  (n.taskPlayAnim(
                    "amb@world_human_gardener_plant@male@exit",
                    "exit",
                    8,
                    0,
                    -1,
                    0,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  await mp.game.waitAsync(5e3),
                  a.destroy(),
                  !mp.players.exists(n) || 0 === n.handle)
                )
                  return;
                n.clearTasksImmediately(),
                  mp.attachmentMngr.addClient(
                    n,
                    mp.game.joaat("farmCabbageBucketItem")
                  ),
                  n.taskPlayAnim(
                    "anim@heists@box_carry@",
                    "idle",
                    8,
                    0,
                    -1,
                    49,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  n === localPlayer &&
                    (global.disableChatAndKeys(!1),
                    (global.enableCameraOnDisabled = !1),
                    0 ===
                      this.tempMarkers.filter((o) => mp.markers.exists(o))
                        .length &&
                      (mp.events.callRemote(
                        "server_farm_field_take_del",
                        this.uId,
                        t
                      ),
                      mp.blips.exists(this.bucketEndBlip) &&
                        this.bucketEndBlip.destroy(),
                      mp.markers.exists(this.bucketEndMarker) &&
                        this.bucketEndMarker.destroy(),
                      this.bucketEndPickup &&
                        (this.bucketEndPickup.destroy(),
                        (this.bucketEndPickup = null)),
                      (this.bucketEndBlip = mp.blips.new(
                        0,
                        new mp.Vector3(2249.4, 5018.91, 42.28),
                        { color: 0, shortRange: !1 }
                      )),
                      (this.bucketEndMarker = mp.markers.new(
                        42,
                        new mp.Vector3(2249.4, 5018.91, 42.98),
                        1,
                        {
                          color: [255, 255, 255, 255],
                          dimension: 0,
                          visible: !0,
                        }
                      )),
                      (this.bucketEndPickup = new global.ActionColshape(
                        new mp.Vector3(2249.4, 5018.91, 42.28),
                        0,
                        0.7,
                        "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u043A\u0430\u043F\u0443\u0441\u0442\u0443",
                        () => {
                          (this.isStartTake = !1),
                            this.destroyTempObjects(),
                            mp.events.callRemote(
                              "server_farm_field_take_end",
                              this.uId,
                              t
                            ),
                            mp.api.notify.info(
                              `+${this.getTakeAward()}$ к зарплате во время PayDay`
                            ),
                            mp.blips.exists(this.bucketEndBlip) &&
                              this.bucketEndBlip.destroy(),
                            mp.markers.exists(this.bucketEndMarker) &&
                              this.bucketEndMarker.destroy(),
                            this.bucketEndPickup &&
                              (this.bucketEndPickup.destroy(),
                              (this.bucketEndPickup = null));
                        }
                      ))));
              }
          }
          onLoad() {
            this.onUnload(),
              (this.nodePickupInterval = setInterval(() => {
                const { x: o, y: t } = localPlayer.position;
                if (
                  isPointInPolygon(
                    [o, t],
                    [
                      [
                        [2243.75, 4999.71],
                        [2309.42, 5063.62],
                        [2219.89, 5150.75],
                        [2152.42, 5087.46],
                        [2243.75, 4999.71],
                      ],
                    ]
                  )
                ) {
                  if (!this.nodePickupLoad) {
                    for (const o of this.nodes)
                      (o.pickup = new global.ActionColshape(
                        o.position,
                        0,
                        3.1,
                        "",
                        () => {
                          if (isLocalPlayerFree())
                            if (o.status === a.NONE) {
                              if (!this.isNodeFree(o.index, 1e4))
                                return mp.api.notify.error(
                                  "\u041A\u0442\u043E-\u0442\u043E \u0443\u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0447\u0430\u0441\u0442\u043A\u0435 \u043F\u043E\u043B\u044F"
                                );
                              if (
                                this.nodes.find((o) => o.status === a.NEED_TAKE)
                              )
                                return mp.api.notify.error(
                                  "\u041F\u0435\u0440\u0435\u0434 \u0437\u0430\u0441\u0435\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0443\u0440\u043E\u0436\u0430\u0439"
                                );
                              this.startGrowNode(o);
                            } else if (o.status === a.NEED_TAKE) {
                              if (!this.isNodeFree(o.index, 1e4))
                                return mp.api.notify.error(
                                  "\u041A\u0442\u043E-\u0442\u043E \u0443\u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0447\u0430\u0441\u0442\u043A\u0435 \u043F\u043E\u043B\u044F"
                                );
                              if (!global.handItemIsInHand("farmCabbageBucket"))
                                return mp.api.notify.error(
                                  "\u0414\u043B\u044F \u0441\u0431\u043E\u0440\u0430 \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u0430 \u043A\u043E\u0440\u043E\u0431\u043A\u0430"
                                );
                              this.startTakeNode(o);
                            }
                        }
                      )),
                        (o.pickup.onceMode = !0),
                        (o.pickup.isPlayerCanUse = () =>
                          !this.isStartGrow &&
                          !this.isStartTake &&
                          !!this.getInfoTextByStatus(o.status)),
                        (o.pickup.getText = () =>
                          this.getInfoTextByStatus(o.status));
                    (this.nodePickupLoad = !0), (this.isPlayerInZone = !0);
                  }
                } else if (this.nodePickupLoad) {
                  for (const o of this.nodes)
                    o.pickup && (o.pickup.destroy(), (o.pickup = null));
                  (this.nodePickupLoad = !1), (this.isPlayerInZone = !1);
                }
              }, 450)),
              (this.takeReturnItemMarker = mp.markers.new(
                32,
                new mp.Vector3(2258.54, 5023.34, 42.89),
                1,
                { color: [255, 255, 255, 255], visible: !0, dimension: 0 }
              )),
              (this.takeReturnItemPickup = new global.ActionColshape(
                new mp.Vector3(2258.54, 5023.34, 42.89),
                0,
                0.5,
                "",
                () => {
                  global.actionAntiFlood(
                    "server_farm_cabbage_toggleBucket",
                    5e3
                  ) && mp.events.callRemote("server_farm_cabbage_toggleBucket");
                }
              )),
              (this.takeReturnItemPickup.onceMode = !0),
              (this.takeReturnItemPickup.isPlayerCanUse = () =>
                null == global.itemInHand ||
                global.handItemIsInHand("farmCabbageBucket")),
              (this.takeReturnItemPickup.getText = () =>
                global.handItemIsInHand("farmCabbageBucket")
                  ? "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u043A\u043E\u0440\u043E\u0431\u043A\u0443"
                  : "\u0432\u0437\u044F\u0442\u044C \u043A\u043E\u0440\u043E\u0431\u043A\u0443");
          }
          onUnload() {
            (this.isPlayerInZone = !1),
              null != this.nodePickupInterval &&
                clearInterval(this.nodePickupInterval),
              (this.nodePickupInterval = null),
              (this.nodePickupLoad = !1),
              (this.isStartGrow = !1),
              (this.isStartTake = !1),
              mp.markers.exists(this.takeReturnItemMarker) &&
                this.takeReturnItemMarker.destroy(),
              (this.takeReturnItemMarker = null),
              this.takeReturnItemPickup &&
                (this.takeReturnItemPickup.destroy(),
                (this.takeReturnItemPickup = null)),
              this.destroyTempObjects();
            for (const o of this.nodes)
              o.pickup && (o.pickup.destroy(), (o.pickup = null));
          }
          startGrowNode(o) {
            this.requestPingNode(o.index),
              this.pingNode(o.index),
              (this.isStartGrow = !0),
              (this.currentNode = o),
              this.destroyTempObjects();
            const t = this.getNodeSubCoords(o);
            for (let e = 0; e < t.length; e++) {
              const r = t[e],
                i = mp.markers.new(
                  25,
                  new mp.Vector3(r.x, r.y, r.z + 0.2),
                  0.75,
                  {
                    color: [255, 255, 255, 255],
                    dimension: 0,
                    direction: new mp.Vector3(0, 0, 0),
                    rotation: new mp.Vector3(0, 0, 0),
                    visible: !0,
                    bobUpAndDown: !1,
                  }
                ),
                n = new global.ActionColshape(
                  r,
                  0,
                  0.45,
                  "\u0441\u0435\u044F\u0442\u044C",
                  () => {
                    isLocalPlayerFree() &&
                      this.requestNodeSubAction(o.index, "grow" + e);
                  }
                );
              (n.onceMode = !0),
                this.tempMarkers.push(i),
                this.tempPickups.push(n);
            }
            null !== this.tempInterval && clearInterval(this.tempInterval),
              (this.tempInterval = setInterval(
                () =>
                  this.isStartGrow
                    ? 25 < dist2(localPlayer.position, o.position)
                      ? ((this.isStartGrow = !1),
                        this.destroyTempObjects(),
                        clearInterval(this.tempInterval),
                        void (this.tempInterval = null))
                      : void 0
                    : (clearInterval(this.tempInterval),
                      void (this.tempInterval = null)),
                1e3
              ));
          }
          startTakeNode(e) {
            mp.events.callRemote(
              "server_farm_field_take_start",
              this.uId,
              e.index
            ),
              (this.isStartTake = !0),
              (this.currentNode = e),
              this.destroyTempObjects();
            const { x: r, y: i } = e.position,
              n = mp.game.joaat("gta5rp_cabbage");
            mp.objects.forEach((e) => {
              0 === e.handle ||
                e.model !== n ||
                65535 === e.remoteId ||
                (1 > o(t(r - e.position.x, 2) + t(i - e.position.y, 2)) &&
                  (e.position = new mp.Vector3(
                    e.position.x,
                    e.position.y,
                    e.position.z - 10
                  )));
            });
            const a = this.getNodeSubCoords(e);
            for (let o = 0; o < a.length; o++) {
              const t = a[o],
                r = mp.objects.new(mp.game.joaat("gta5rp_cabbage_one"), t, {
                  dimension: 0,
                  rotation: e.rotation,
                  alpha: 255,
                }),
                i = mp.markers.new(
                  25,
                  new mp.Vector3(t.x, t.y, t.z + 0.2),
                  0.75,
                  {
                    color: [255, 255, 255, 255],
                    dimension: 0,
                    direction: new mp.Vector3(0, 0, 0),
                    rotation: new mp.Vector3(0, 0, 0),
                    visible: !0,
                    bobUpAndDown: !1,
                  }
                ),
                n = new global.ActionColshape(
                  t,
                  0,
                  0.65,
                  "\u0441\u043E\u0431\u0440\u0430\u0442\u044C",
                  () =>
                    isLocalPlayerFree()
                      ? global.handItemIsInHand("farmCabbageBucket")
                        ? void this.requestNodeSubAction(e.index, "take" + o)
                        : mp.api.notify.error(
                            "\u0414\u043B\u044F \u0441\u0431\u043E\u0440\u0430 \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u0430 \u043A\u043E\u0440\u043E\u0431\u043A\u0430"
                          )
                      : void 0
                );
              (n.onceMode = !0),
                this.tempMarkers.push(i),
                this.tempObjects.push(r),
                this.tempPickups.push(n);
            }
            null !== this.tempInterval && clearInterval(this.tempInterval),
              (this.tempInterval = setInterval(
                () =>
                  this.isStartTake
                    ? 25 < dist2(localPlayer.position, e.position)
                      ? ((this.isStartTake = !1),
                        this.destroyTempObjects(),
                        clearInterval(this.tempInterval),
                        void (this.tempInterval = null))
                      : void 0
                    : (clearInterval(this.tempInterval),
                      void (this.tempInterval = null)),
                1e3
              ));
          }
          destroyTempObjects() {
            this.tempMarkers.forEach(
              (o) => mp.markers.exists(o) && o.destroy()
            ),
              (this.tempMarkers = []),
              this.tempObjects.forEach(
                (o) => mp.objects.exists(o) && o.destroy()
              ),
              (this.tempObjects = []),
              this.tempPickups.forEach((o) => o.destroy()),
              (this.tempPickups = []);
          }
          getNodeSubCoords(o) {
            const { x: t, y: e, z: r } = o.position,
              i = 1.55,
              n = 1.4142135623730951,
              a = [
                o.position,
                mp.game.object.getObjectOffsetFromCoords(t, e, r, 0, i, i, 0),
                mp.game.object.getObjectOffsetFromCoords(
                  t,
                  e,
                  r,
                  45,
                  i * n,
                  i * n,
                  0
                ),
                mp.game.object.getObjectOffsetFromCoords(t, e, r, 90, i, i, 0),
                mp.game.object.getObjectOffsetFromCoords(
                  t,
                  e,
                  r,
                  135,
                  i * n,
                  i * n,
                  0
                ),
                mp.game.object.getObjectOffsetFromCoords(t, e, r, 180, i, i, 0),
                mp.game.object.getObjectOffsetFromCoords(
                  t,
                  e,
                  r,
                  225,
                  i * n,
                  i * n,
                  0
                ),
                mp.game.object.getObjectOffsetFromCoords(t, e, r, 270, i, i, 0),
                mp.game.object.getObjectOffsetFromCoords(
                  t,
                  e,
                  r,
                  315,
                  i * n,
                  i * n,
                  0
                ),
              ];
            for (let t = 1; t < a.length; t++)
              a[t].z =
                mp.game.gameplay.getGroundZFor3dCoord(
                  a[t].x,
                  a[t].y,
                  a[t].z + 1,
                  0,
                  !1
                ) + 0.05;
            return a;
          }
          getInfoTextByStatus(o) {
            return o === a.NONE
              ? "\u043F\u043E\u0441\u0430\u0434\u0438\u0442\u044C \u043A\u0430\u043F\u0443\u0441\u0442\u0443"
              : o === a.GROW
              ? ""
              : o === a.NEED_TAKE
              ? "\u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043A\u0430\u043F\u0443\u0441\u0442\u0443"
              : "";
          }
        })({
          uId: "CABBAGE",
          name: "\u041F\u043E\u043B\u0435 \u043A\u0430\u043F\u0443\u0441\u0442\u044B",
          nodes: c,
          getGrowAward: () =>
            0 === localPlayerFarmingSkillLevel
              ? 135
              : 1 === localPlayerFarmingSkillLevel
              ? 168
              : 2 === localPlayerFarmingSkillLevel
              ? 202
              : 3 === localPlayerFarmingSkillLevel
              ? 270
              : 4 === localPlayerFarmingSkillLevel
              ? 337
              : 5 === localPlayerFarmingSkillLevel
              ? 405
              : 135,
          getTakeAward: () =>
            0 === localPlayerFarmingSkillLevel
              ? 150
              : 1 === localPlayerFarmingSkillLevel
              ? 187
              : 2 === localPlayerFarmingSkillLevel
              ? 225
              : 3 === localPlayerFarmingSkillLevel
              ? 300
              : 4 === localPlayerFarmingSkillLevel
              ? 375
              : 5 === localPlayerFarmingSkillLevel
              ? 450
              : 150,
          getClearAward: () =>
            1 === localPlayerFarmingSkillLevel
              ? 0
              : 2 === localPlayerFarmingSkillLevel
              ? 9
              : 3 === localPlayerFarmingSkillLevel
              ? 12
              : 4 === localPlayerFarmingSkillLevel
              ? 15
              : 5 === localPlayerFarmingSkillLevel
              ? 18
              : 0,
        });
      const p = [
          {
            position: new mp.Vector3(2143.97827, 5117.58984, 46.0924759),
            rotation: new mp.Vector3(-3.99998999, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2138.29053, 5124.18896, 46.6192474),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2132.44702, 5131.00391, 47.5583916),
            rotation: new mp.Vector3(-5.99999237, -3.99999881, 134.495544),
          },
          {
            position: new mp.Vector3(2126.39429, 5137.64404, 48.4482765),
            rotation: new mp.Vector3(-3.99998999, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2120.40991, 5144.12891, 49.247982),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2114.09277, 5150.6665, 49.9742966),
            rotation: new mp.Vector3(-4.99998951, -9.00000191, 134.545776),
          },
          {
            position: new mp.Vector3(2108.06543, 5157.04199, 50.4969902),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2101.78882, 5163.64453, 51.1472549),
            rotation: new mp.Vector3(-3.99999046, -9.99999619, 135.466064),
          },
          {
            position: new mp.Vector3(2096.10742, 5169.69287, 51.7409706),
            rotation: new mp.Vector3(-3.99999118, -9.99999905, 132.44458),
          },
          {
            position: new mp.Vector3(2090.10107, 5176.1792, 52.4601822),
            rotation: new mp.Vector3(-3.99999046, -10.9999933, 133.672714),
          },
          {
            position: new mp.Vector3(2083.97974, 5182.7749, 53.1786461),
            rotation: new mp.Vector3(-3.99999976, -10.9999981, 135.463333),
          },
          {
            position: new mp.Vector3(2150.38452, 5125.29736, 47.412468),
            rotation: new mp.Vector3(-3.99998999, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2144.69678, 5131.89648, 48.0692177),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2138.85327, 5138.71143, 48.9983635),
            rotation: new mp.Vector3(-4.99999237, -4.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2132.80054, 5145.35156, 49.7982635),
            rotation: new mp.Vector3(-3.99998999, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2126.81616, 5151.83643, 50.5279808),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2120.49902, 5158.37402, 51.304287),
            rotation: new mp.Vector3(-4.99998951, -9.00000191, 134.545776),
          },
          {
            position: new mp.Vector3(2114.47168, 5164.74951, 51.8869705),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2108.19507, 5171.35205, 52.7671967),
            rotation: new mp.Vector3(-4.99998617, -6.99999809, 135.456024),
          },
          {
            position: new mp.Vector3(2102.51367, 5177.40039, 53.3609123),
            rotation: new mp.Vector3(-3.99999213, -7.99999857, 132.44458),
          },
          {
            position: new mp.Vector3(2096.50732, 5183.88672, 53.9501457),
            rotation: new mp.Vector3(-3.99998999, -8.99999332, 133.672714),
          },
          {
            position: new mp.Vector3(2090.38599, 5190.48242, 54.2686768),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2147.68188, 5122.29443, 46.8525009),
            rotation: new mp.Vector3(-3.99998951, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2141.99414, 5128.89355, 47.5092506),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2136.15063, 5135.7085, 48.4383965),
            rotation: new mp.Vector3(-4.99999237, -4.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2130.0979, 5142.34863, 49.2382965),
            rotation: new mp.Vector3(-3.99998951, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2124.11353, 5148.8335, 49.9680138),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2117.79639, 5155.37109, 50.8243065),
            rotation: new mp.Vector3(-4.99998951, -9.00000286, 134.545776),
          },
          {
            position: new mp.Vector3(2111.76904, 5161.74658, 51.4969749),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2105.49243, 5168.34912, 52.3971977),
            rotation: new mp.Vector3(-4.99998617, -6.99999809, 135.456024),
          },
          {
            position: new mp.Vector3(2099.81104, 5174.39746, 52.9509201),
            rotation: new mp.Vector3(-3.99999213, -7.99999857, 132.44458),
          },
          {
            position: new mp.Vector3(2093.80469, 5180.88379, 53.5001602),
            rotation: new mp.Vector3(-3.99998999, -8.99999332, 133.672714),
          },
          {
            position: new mp.Vector3(2087.68335, 5187.47949, 54.1186409),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2185.5188, 5153.32471, 53.9124908),
            rotation: new mp.Vector3(-3.99998999, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2179.83105, 5159.85059, 54.2692909),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2173.98755, 5166.53857, 55.0184669),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2167.93481, 5173.17871, 55.7783737),
            rotation: new mp.Vector3(-3.99998999, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2161.95044, 5179.66357, 56.4580994),
            rotation: new mp.Vector3(-3.99998569, -6, 135.825546),
          },
          {
            position: new mp.Vector3(2155.6333, 5186.20117, 56.9744492),
            rotation: new mp.Vector3(-2.99998522, -5.99999809, 134.545776),
          },
          {
            position: new mp.Vector3(2149.60596, 5192.57666, 57.2971764),
            rotation: new mp.Vector3(-1.99998581, -5.99999666, 134.596268),
          },
          {
            position: new mp.Vector3(2143.32935, 5199.1792, 57.5275116),
            rotation: new mp.Vector3(-0.999979973, -2.99999714, 135.456024),
          },
          {
            position: new mp.Vector3(2137.64795, 5205.22754, 57.5013313),
            rotation: new mp.Vector3(-2.99998784, -4.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2206.87964, 5173.83008, 57.6524887),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2200.94165, 5179.97998, 57.9492989),
            rotation: new mp.Vector3(-4.99999714, -6.78000212, 134.700974),
          },
          {
            position: new mp.Vector3(2195.09814, 5186.79492, 58.6484833),
            rotation: new mp.Vector3(-4.99999189, -6.79999924, 134.495544),
          },
          {
            position: new mp.Vector3(2189.04541, 5193.43506, 59.0284538),
            rotation: new mp.Vector3(-3.99998641, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2183.06104, 5199.91992, 59.5782013),
            rotation: new mp.Vector3(-3.99998522, -7.79999638, 135.825546),
          },
          {
            position: new mp.Vector3(2180.66357, 5200.96338, 59.4638329),
            rotation: new mp.Vector3(-2.99995327, -6.79996109, 129.630829),
          },
          {
            position: new mp.Vector3(2157.39136, 5131.70361, 48.4925156),
            rotation: new mp.Vector3(-3.99998951, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2151.70361, 5138.42969, 49.1792603),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2145.86011, 5145.11768, 50.0784111),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2139.80737, 5151.75781, 51.0482826),
            rotation: new mp.Vector3(-3.99998951, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2133.823, 5158.24268, 51.688015),
            rotation: new mp.Vector3(-4.99998903, -8.00000191, 135.825546),
          },
          {
            position: new mp.Vector3(2127.50586, 5164.78027, 52.3243446),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.545776),
          },
          {
            position: new mp.Vector3(2121.47852, 5171.15576, 52.9970131),
            rotation: new mp.Vector3(-3.99998689, -6.99999475, 134.596268),
          },
          {
            position: new mp.Vector3(2115.2019, 5177.7583, 53.5472946),
            rotation: new mp.Vector3(-4.9999814, -3.99999714, 135.456024),
          },
          {
            position: new mp.Vector3(2109.52051, 5183.80664, 54.2209969),
            rotation: new mp.Vector3(-3.99998784, -5.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2103.51416, 5190.29297, 54.8402252),
            rotation: new mp.Vector3(-3.99997616, -4.99999285, 133.672714),
          },
          {
            position: new mp.Vector3(2154.68872, 5128.70068, 48.1225166),
            rotation: new mp.Vector3(-3.99998856, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2149.00098, 5135.2998, 48.7792664),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2143.15747, 5142.11475, 49.5284424),
            rotation: new mp.Vector3(-4.99999237, -4.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2137.10474, 5148.75488, 50.5083122),
            rotation: new mp.Vector3(-3.99998856, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2131.12036, 5155.23975, 51.2380295),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2124.80322, 5161.77734, 52.0943222),
            rotation: new mp.Vector3(-4.99998951, -9.00000286, 134.545776),
          },
          {
            position: new mp.Vector3(2118.77588, 5168.15283, 52.7669907),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2112.49927, 5174.75537, 53.3372688),
            rotation: new mp.Vector3(-4.99998617, -6.99999809, 135.456024),
          },
          {
            position: new mp.Vector3(2106.81787, 5180.80371, 54.070961),
            rotation: new mp.Vector3(-3.99999213, -7.99999857, 132.44458),
          },
          {
            position: new mp.Vector3(2100.81152, 5187.29004, 54.5602112),
            rotation: new mp.Vector3(-3.99998999, -8.99999332, 133.672714),
          },
          {
            position: new mp.Vector3(2094.69019, 5193.88574, 54.8287506),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2098.3938, 5194.78662, 54.8687592),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2113.90894, 5203.13867, 56.2289124),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2107.90308, 5199.29102, 55.748764),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2104.09937, 5197.48926, 55.2588158),
            rotation: new mp.Vector3(-0.99999696, -3.99999452, 135.463333),
          },
          {
            position: new mp.Vector3(2106.71729, 5194.79736, 55.5103264),
            rotation: new mp.Vector3(-3.99998999, -8.99999332, 133.672714),
          },
          {
            position: new mp.Vector3(2113.12402, 5187.91064, 54.8411064),
            rotation: new mp.Vector3(-3.99999213, -7.99999857, 132.44458),
          },
          {
            position: new mp.Vector3(2119.00562, 5181.66211, 54.1674042),
            rotation: new mp.Vector3(-4.99998617, -6.99999809, 135.456024),
          },
          {
            position: new mp.Vector3(2125.28223, 5175.05957, 53.5871277),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2131.30957, 5168.68408, 53.0544357),
            rotation: new mp.Vector3(-4.99998951, -9.00000286, 134.545776),
          },
          {
            position: new mp.Vector3(2137.62671, 5162.14648, 52.4081078),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2143.61108, 5155.66162, 51.6483955),
            rotation: new mp.Vector3(-3.99998856, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2149.66382, 5149.02148, 50.8284988),
            rotation: new mp.Vector3(-4.99999142, -6.99999857, 134.495544),
          },
          {
            position: new mp.Vector3(2155.50732, 5142.20654, 49.8593597),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2161.44531, 5136.05664, 49.2625999),
            rotation: new mp.Vector3(-3.99998856, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2110.02051, 5197.19971, 55.7103539),
            rotation: new mp.Vector3(-0.999975622, -4.99998999, 133.672714),
          },
          {
            position: new mp.Vector3(2116.02686, 5190.71338, 55.4110718),
            rotation: new mp.Vector3(-3.99998784, -5.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2121.70825, 5184.66504, 54.907341),
            rotation: new mp.Vector3(-4.9999814, -3.99999714, 135.456024),
          },
          {
            position: new mp.Vector3(2127.98486, 5178.0625, 54.3570595),
            rotation: new mp.Vector3(-3.99998689, -6.99999475, 134.596268),
          },
          {
            position: new mp.Vector3(2134.01221, 5171.68701, 53.8143692),
            rotation: new mp.Vector3(-3.99998569, -6.99999714, 134.545776),
          },
          {
            position: new mp.Vector3(2140.32935, 5165.14941, 53.2580261),
            rotation: new mp.Vector3(-4.99998903, -8.00000191, 135.825546),
          },
          {
            position: new mp.Vector3(2146.31372, 5158.66455, 52.4583206),
            rotation: new mp.Vector3(-3.99998951, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2152.36646, 5152.02441, 51.6384239),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2158.20996, 5145.33643, 50.8392563),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2163.89771, 5138.81055, 50.0625267),
            rotation: new mp.Vector3(-3.99998951, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2172.6062, 5144.41602, 51.5924988),
            rotation: new mp.Vector3(-3.99998951, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2166.91846, 5150.94189, 52.3692284),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2161.07495, 5157.62988, 53.168396),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2155.02222, 5164.27002, 53.9882927),
            rotation: new mp.Vector3(-3.99998951, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2149.03784, 5170.75488, 54.6280251),
            rotation: new mp.Vector3(-4.99998903, -8.00000191, 135.825546),
          },
          {
            position: new mp.Vector3(2142.7207, 5177.29248, 55.2043648),
            rotation: new mp.Vector3(-3.99998569, -6.99999714, 134.545776),
          },
          {
            position: new mp.Vector3(2136.69336, 5183.66797, 55.6170769),
            rotation: new mp.Vector3(-3.99998689, -6.99999475, 134.596268),
          },
          {
            position: new mp.Vector3(2130.41675, 5190.27051, 56.0473785),
            rotation: new mp.Vector3(-4.9999814, -3.99999714, 135.456024),
          },
          {
            position: new mp.Vector3(2124.73535, 5196.31885, 56.4511261),
            rotation: new mp.Vector3(-3.99998784, -5.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2118.729, 5202.80518, 56.4804535),
            rotation: new mp.Vector3(-0.999975622, -4.99998999, 133.672714),
          },
          {
            position: new mp.Vector3(2170.15381, 5141.66211, 50.792572),
            rotation: new mp.Vector3(-3.99998856, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2164.21582, 5147.81201, 51.3893318),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2158.37231, 5154.62695, 52.3584709),
            rotation: new mp.Vector3(-4.99999142, -6.99999857, 134.495544),
          },
          {
            position: new mp.Vector3(2152.31958, 5161.26709, 53.1783676),
            rotation: new mp.Vector3(-3.99998856, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2146.33521, 5167.75195, 53.9380798),
            rotation: new mp.Vector3(-4.99998999, -10, 135.825546),
          },
          {
            position: new mp.Vector3(2140.01807, 5174.28955, 54.5844078),
            rotation: new mp.Vector3(-4.99998951, -9.00000286, 134.545776),
          },
          {
            position: new mp.Vector3(2133.99072, 5180.66504, 55.1170998),
            rotation: new mp.Vector3(-3.99998856, -8.99999332, 134.596268),
          },
          {
            position: new mp.Vector3(2127.71411, 5187.26758, 55.5673981),
            rotation: new mp.Vector3(-4.99998617, -6.99999809, 135.456024),
          },
          {
            position: new mp.Vector3(2121.83252, 5193.51611, 56.0111389),
            rotation: new mp.Vector3(-3.99999213, -7.99999857, 132.44458),
          },
          {
            position: new mp.Vector3(2115.42578, 5200.40283, 56.3004227),
            rotation: new mp.Vector3(-3.99998999, -8.99999332, 133.672714),
          },
          {
            position: new mp.Vector3(2135.5459, 5207.52979, 57.4713364),
            rotation: new mp.Vector3(-2.99998784, -4.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2192.44873, 5193.9502, 59.4084511),
            rotation: new mp.Vector3(-3.99998641, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2197.80078, 5189.79785, 59.0684738),
            rotation: new mp.Vector3(-4.99999094, -6.79999971, 134.495544),
          },
          {
            position: new mp.Vector3(2203.64429, 5183.10986, 58.419281),
            rotation: new mp.Vector3(-4.99999714, -6.79999971, 134.700974),
          },
          {
            position: new mp.Vector3(2209.33203, 5176.58398, 58.0124893),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2179.61304, 5151.72314, 53.2924576),
            rotation: new mp.Vector3(-3.99998856, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2173.92529, 5158.24902, 53.8892174),
            rotation: new mp.Vector3(-4.99999809, -7, 134.700974),
          },
          {
            position: new mp.Vector3(2168.08179, 5164.93701, 54.6783867),
            rotation: new mp.Vector3(-4.99999094, -6.99999905, 134.495544),
          },
          {
            position: new mp.Vector3(2162.02905, 5171.57715, 55.2583237),
            rotation: new mp.Vector3(-3.99998856, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2156.04468, 5178.06201, 55.9380493),
            rotation: new mp.Vector3(-3.99998474, -5.99999952, 135.825546),
          },
          {
            position: new mp.Vector3(2149.72754, 5184.59961, 56.4543991),
            rotation: new mp.Vector3(-2.99998474, -5.99999666, 134.545776),
          },
          {
            position: new mp.Vector3(2143.7002, 5190.9751, 56.7771263),
            rotation: new mp.Vector3(-1.99998605, -5.99999571, 134.596268),
          },
          {
            position: new mp.Vector3(2137.42358, 5197.57764, 57.0074615),
            rotation: new mp.Vector3(-0.999979317, -2.99999714, 135.456024),
          },
          {
            position: new mp.Vector3(2131.74219, 5203.62598, 56.9812813),
            rotation: new mp.Vector3(-2.99998784, -4.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2129.64014, 5205.92822, 56.9812813),
            rotation: new mp.Vector3(-2.99998784, -4.00000095, 132.44458),
          },
          {
            position: new mp.Vector3(2124.93506, 5204.80713, 56.9705544),
            rotation: new mp.Vector3(-1.99998283, -2.99999046, 133.672714),
          },
          {
            position: new mp.Vector3(2128.83936, 5200.82324, 56.7612572),
            rotation: new mp.Vector3(-3.99998569, -3.99999976, 132.44458),
          },
          {
            position: new mp.Vector3(2134.71094, 5194.57471, 56.6774559),
            rotation: new mp.Vector3(-1.89997816, -3.69999385, 135.456024),
          },
          {
            position: new mp.Vector3(2140.99756, 5187.97217, 56.3671341),
            rotation: new mp.Vector3(-3.9999702, -4.69999075, 134.596237),
          },
          {
            position: new mp.Vector3(2147.0249, 5181.59668, 56.0744019),
            rotation: new mp.Vector3(-3.99998522, -6.99999905, 134.545776),
          },
          {
            position: new mp.Vector3(2153.34204, 5175.05908, 55.6280403),
            rotation: new mp.Vector3(-3.99998784, -7.99999714, 135.825546),
          },
          {
            position: new mp.Vector3(2159.32642, 5168.57422, 54.958313),
            rotation: new mp.Vector3(-3.99998856, -7.99999714, 136.747131),
          },
          {
            position: new mp.Vector3(2165.37915, 5161.93408, 54.0584297),
            rotation: new mp.Vector3(-4.99999142, -6.99999857, 134.495544),
          },
          {
            position: new mp.Vector3(2171.22266, 5155.11914, 53.2792587),
            rotation: new mp.Vector3(-4.99999762, -6.9800005, 134.700974),
          },
          {
            position: new mp.Vector3(2177.16064, 5148.96924, 52.5325241),
            rotation: new mp.Vector3(-3.99998856, -7, 133.165726),
          },
          {
            position: new mp.Vector3(2195.87891, 5162.68262, 55.9624672),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2189.94092, 5168.83252, 56.3892555),
            rotation: new mp.Vector3(-4.99999714, -6.78000212, 134.700974),
          },
          {
            position: new mp.Vector3(2184.09741, 5175.64746, 56.9584618),
            rotation: new mp.Vector3(-4.99999189, -6.79999924, 134.495544),
          },
          {
            position: new mp.Vector3(2178.04468, 5182.2876, 57.7083702),
            rotation: new mp.Vector3(-3.99998617, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2172.0603, 5188.77246, 58.1981277),
            rotation: new mp.Vector3(-3.99998426, -7.79999638, 135.825546),
          },
          {
            position: new mp.Vector3(2165.74316, 5195.31006, 58.4545212),
            rotation: new mp.Vector3(-2.99998116, -6.80000067, 134.545776),
          },
          {
            position: new mp.Vector3(2159.71582, 5201.68555, 58.8472366),
            rotation: new mp.Vector3(-3.99997377, -4.49998903, 134.596237),
          },
          {
            position: new mp.Vector3(2153.4292, 5208.28809, 58.8476105),
            rotation: new mp.Vector3(-1.89997864, -3.49999571, 135.456024),
          },
          {
            position: new mp.Vector3(2162.41846, 5204.68848, 59.0872574),
            rotation: new mp.Vector3(-1.9999851, -5.7999959, 134.596268),
          },
          {
            position: new mp.Vector3(2168.4458, 5198.31299, 58.7045403),
            rotation: new mp.Vector3(-2.99998307, -5.79999638, 134.545776),
          },
          {
            position: new mp.Vector3(2174.76294, 5191.77539, 58.5981216),
            rotation: new mp.Vector3(-3.99998236, -5.80000019, 135.825546),
          },
          {
            position: new mp.Vector3(2180.74731, 5185.29053, 57.9583893),
            rotation: new mp.Vector3(-3.99998617, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2186.80005, 5178.65039, 57.4384422),
            rotation: new mp.Vector3(-4.99999094, -6.79999971, 134.495544),
          },
          {
            position: new mp.Vector3(2192.64355, 5171.9624, 56.9092293),
            rotation: new mp.Vector3(-4.99999714, -6.79999971, 134.700974),
          },
          {
            position: new mp.Vector3(2198.3313, 5165.43652, 56.3124695),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2160.21631, 5207.19092, 59.2872543),
            rotation: new mp.Vector3(-1.9999851, -5.7999959, 134.596268),
          },
          {
            position: new mp.Vector3(2204.02686, 5171.17871, 57.3324509),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2198.33911, 5177.70459, 57.6092644),
            rotation: new mp.Vector3(-4.99999714, -6.79999971, 134.700974),
          },
          {
            position: new mp.Vector3(2192.49561, 5184.39258, 58.1384773),
            rotation: new mp.Vector3(-4.99999094, -6.79999971, 134.495544),
          },
          {
            position: new mp.Vector3(2186.44287, 5191.03271, 58.678421),
            rotation: new mp.Vector3(-3.99998617, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2180.4585, 5197.51758, 59.0182037),
            rotation: new mp.Vector3(-3.99998236, -5.80000019, 135.825546),
          },
          {
            position: new mp.Vector3(2174.14136, 5204.05518, 59.4045753),
            rotation: new mp.Vector3(-2.99998307, -5.79999638, 134.545776),
          },
          {
            position: new mp.Vector3(2165.41138, 5207.42773, 59.3273087),
            rotation: new mp.Vector3(-3.99997377, -4.49998903, 134.596237),
          },
          {
            position: new mp.Vector3(2171.43872, 5201.05225, 59.1545563),
            rotation: new mp.Vector3(-2.99998116, -6.80000067, 134.545776),
          },
          {
            position: new mp.Vector3(2177.75586, 5194.51465, 58.748188),
            rotation: new mp.Vector3(-3.99998426, -7.79999638, 135.825546),
          },
          {
            position: new mp.Vector3(2183.74023, 5188.02979, 58.2484322),
            rotation: new mp.Vector3(-3.99998617, -7.79999638, 136.747131),
          },
          {
            position: new mp.Vector3(2189.79297, 5181.38965, 57.8784599),
            rotation: new mp.Vector3(-4.99999189, -6.79999924, 134.495544),
          },
          {
            position: new mp.Vector3(2195.63647, 5174.57471, 57.0892906),
            rotation: new mp.Vector3(-4.99999714, -6.78000212, 134.700974),
          },
          {
            position: new mp.Vector3(2201.57446, 5168.4248, 56.9424553),
            rotation: new mp.Vector3(-3.99998832, -6.80000162, 133.165726),
          },
          {
            position: new mp.Vector3(2173.11646, 5205.4502, 59.596508),
            rotation: new mp.Vector3(-2.99984384, -6.79995871, 133.262085),
          },
          {
            position: new mp.Vector3(2179.46313, 5147.06055, 52.4105263),
            rotation: new mp.Vector3(-2.99999952, -5.99999619, 133.247467),
          },
          {
            position: new mp.Vector3(2182.76611, 5149.98926, 53.2035828),
            rotation: new mp.Vector3(-2.99999881, -9.99999905, 133.554199),
          },
          {
            position: new mp.Vector3(2174.48438, 5142.98145, 51.2231789),
            rotation: new mp.Vector3(-3.00000167, -10.9999933, 133.626968),
          },
          {
            position: new mp.Vector3(2170.95996, 5140.71094, 50.6453209),
            rotation: new mp.Vector3(5, 8.99999619, -48.4668846),
          },
          {
            position: new mp.Vector3(2166.47998, 5136.37061, 49.507),
            rotation: new mp.Vector3(4.99999285, 8.99998569, -48.0566978),
          },
          {
            position: new mp.Vector3(2163.44971, 5134.16895, 48.6979103),
            rotation: new mp.Vector3(2.99999809, 4.00000048, -48.1073608),
          },
          {
            position: new mp.Vector3(2158.58496, 5130.16943, 47.9598236),
            rotation: new mp.Vector3(2.99999952, 0, -47.3901329),
          },
          {
            position: new mp.Vector3(2156.5083, 5127.7373, 47.564167),
            rotation: new mp.Vector3(3.99999809, 0, -47.5430984),
          },
        ],
        V = new (class extends s {
          constructor({
            uId: o,
            name: t,
            nodes: e,
            getGrowAward: r,
            getTakeAward: i,
            getClearAward: n,
          }) {
            super({
              uId: o,
              name: t,
              nodes: e,
              getGrowAward: r,
              getTakeAward: i,
              getClearAward: n,
            }),
              (this.needFarmingLevel = 3),
              (this.isStartGrow = !1),
              (this.nodePickupInterval = null),
              (this.nodePickupLoad = !1),
              (this.tempMarkers = []),
              (this.tempObjects = []),
              (this.tempPickups = []);
            for (const a of this.nodes) a.pickup = null;
          }
          async onChangeStatus(o, t, e, r) {
            if (localPlayer.remoteId !== o) return;
            if (r !== e && r === a.GROW)
              return void mp.api.notify.info(
                `+${this.getGrowAward()}$ к зарплате во время PayDay`
              );
            if (r !== e && r === a.NONE)
              return void mp.api.notify.info(
                `+${this.getTakeAward()}$ к зарплате во время PayDay`
              );
            const i = this.nodes[t].isClear;
            setTimeout(() => {
              !i &&
                this.nodes[t].isClear &&
                mp.api.notify.info(
                  `+${this.getClearAward()}$ к зарплате во время PayDay`
                );
            }, 1);
          }
          async onPlayerStartNodeSubAction(o, t, e) {
            if ("startGrow" === e) {
              const e = mp.players.atRemoteId(o);
              if (!e || 0 === e.handle) return;
              if ((this.pingNode(t), this.playGrowAnim(e), e === localPlayer))
                this.startGrowNode(t);
              else {
                if (
                  (await mp.game.waitAsync(15e3),
                  !mp.players.exists(e) || 0 === e.handle)
                )
                  return;
                e.clearTasksImmediately();
              }
            }
          }
          async startGrowNode(o) {
            const t = this.nodes[o];
            this.isStartGrow = !0;
            let e = [],
              r = 0;
            const i = () => {
                mp.game.graphics.drawMarker(
                  25,
                  t.position.x,
                  t.position.y,
                  t.position.z + 0.5,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  7.5,
                  7.5,
                  7.5,
                  255,
                  255,
                  255,
                  255,
                  !1,
                  !1,
                  2,
                  !1,
                  "",
                  "",
                  !1
                );
              },
              n = setInterval(() => {
                if (
                  global.isPlayerDeath ||
                  10 < dist2(localPlayer.position, t.position)
                )
                  return (
                    global.isPlayerDeath || localPlayer.clearTasksImmediately(),
                    global.mainBrowser.execute(`mainHud.progressStop();`),
                    (this.isStartGrow = !1),
                    mp.events.remove("render", i),
                    void clearInterval(n)
                  );
                for (const o of e)
                  if (0.5 > dist2(localPlayer.position, o)) return;
                return (
                  (r += 5),
                  100 <= r
                    ? (mp.events.callRemote(
                        "server_farm_field_grow",
                        this.uId,
                        o
                      ),
                      localPlayer.clearTasksImmediately(),
                      global.mainBrowser.execute(`mainHud.progressStop();`),
                      (this.isStartGrow = !1),
                      mp.events.remove("render", i),
                      void clearInterval(n))
                    : void (e.push(localPlayer.position),
                      3 < e.length && e.shift(),
                      global.mainBrowser.execute(
                        `mainHud.progressValue(${r});`
                      ))
                );
              }, 750);
            mp.events.add("render", i),
              global.mainBrowser.execute(
                `mainHud.progressStart('Засеивание', 0, 700);`
              );
          }
          async playGrowAnim(o) {
            if (
              !mp.game.streaming.hasAnimDictLoaded("gestures@f@standing@casual")
            ) {
              mp.game.streaming.requestAnimDict("gestures@f@standing@casual");
              do await mp.game.waitAsync(10);
              while (
                !mp.game.streaming.hasAnimDictLoaded(
                  "gestures@f@standing@casual"
                )
              );
            }
            mp.players.exists(o) &&
              0 !== o.handle &&
              o.taskPlayAnim(
                "gestures@f@standing@casual",
                "gesture_hand_right",
                8,
                0,
                -1,
                49,
                0,
                !1,
                !1,
                !1
              );
          }
          onLoad() {
            this.onUnload(),
              (this.nodePickupInterval = setInterval(() => {
                const { x: o, y: t } = localPlayer.position;
                if (
                  isPointInPolygon(
                    [o, t],
                    [
                      [
                        [2147.71, 5103.98],
                        [2223.55, 5175.96],
                        [2196.63, 5203.23],
                        [2169.56, 5215.33],
                        [2118.87, 5215.84],
                        [2064.73, 5189.16],
                        [2147.71, 5103.98],
                      ],
                    ]
                  )
                ) {
                  if (!this.nodePickupLoad) {
                    for (const o of this.nodes)
                      (o.pickup = new global.ActionColshape(
                        o.position,
                        0,
                        3.1,
                        "\u0441\u0435\u044F\u0442\u044C \u043F\u0448\u0435\u043D\u0438\u0446\u0443",
                        () => {
                          if (isLocalPlayerFree() && o.status === a.NONE) {
                            if (
                              this.nodes.find((o) => o.status === a.NEED_TAKE)
                            )
                              return mp.api.notify.error(
                                "\u041F\u0435\u0440\u0435\u0434 \u0437\u0430\u0441\u0435\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0443\u0440\u043E\u0436\u0430\u0439"
                              );
                            if (
                              localPlayerFarmingSkillLevel <
                              this.needFarmingLevel
                            )
                              return mp.api.notify.error(
                                "\u0412\u0430\u0448 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0444\u0435\u0440\u043C\u0435\u0440\u0441\u0442\u0432\u0430 \u043D\u0438\u0436\u0435, \u0447\u0435\u043C \u043D\u0443\u0436\u0435\u043D \u0434\u043B\u044F \u044D\u0442\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B"
                              );
                            if (!this.isNodeFree(o.index, 6e4))
                              return mp.api.notify.error(
                                "\u041A\u0442\u043E-\u0442\u043E \u0443\u0436\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0447\u0430\u0441\u0442\u043A\u0435 \u043F\u043E\u043B\u044F"
                              );
                            this.requestNodeSubAction(o.index, "startGrow");
                          }
                        }
                      )),
                        (o.pickup.onceMode = !0),
                        (o.pickup.isPlayerCanUse = () =>
                          !this.isStartGrow && o.status === a.NONE);
                    (this.nodePickupLoad = !0), (this.isPlayerInZone = !0);
                  }
                } else if (this.nodePickupLoad) {
                  for (const o of this.nodes)
                    o.pickup && (o.pickup.destroy(), (o.pickup = null));
                  (this.nodePickupLoad = !1), (this.isPlayerInZone = !1);
                }
              }, 450));
          }
          onUnload() {
            (this.isPlayerInZone = !1),
              (this.isStartGrow = !1),
              null != this.nodePickupInterval &&
                clearInterval(this.nodePickupInterval),
              (this.nodePickupInterval = null),
              this.destroyTempObjects();
            for (const o of this.nodes)
              o.pickup && (o.pickup.destroy(), (o.pickup = null));
          }
          destroyTempObjects() {
            this.tempMarkers.forEach(
              (o) => mp.markers.exists(o) && o.destroy()
            ),
              (this.tempMarkers = []),
              this.tempObjects.forEach(
                (o) => mp.objects.exists(o) && o.destroy()
              ),
              (this.tempObjects = []),
              this.tempPickups.forEach((o) => o.destroy()),
              (this.tempPickups = []);
          }
        })({
          uId: "CORN",
          name: "\u041F\u043E\u043B\u0435 \u043F\u0448\u0435\u043D\u0438\u0446\u044B",
          nodes: p,
          getGrowAward: () =>
            1 === localPlayerFarmingSkillLevel
              ? 0
              : 2 === localPlayerFarmingSkillLevel
              ? 0
              : 3 === localPlayerFarmingSkillLevel
              ? 48
              : 4 === localPlayerFarmingSkillLevel
              ? 60
              : 5 === localPlayerFarmingSkillLevel
              ? 72
              : 0,
          getTakeAward: () =>
            1 === localPlayerFarmingSkillLevel
              ? 0
              : 2 === localPlayerFarmingSkillLevel
              ? 0
              : 3 === localPlayerFarmingSkillLevel
              ? 12
              : 4 === localPlayerFarmingSkillLevel
              ? 15
              : 5 === localPlayerFarmingSkillLevel
              ? 18
              : 0,
          getClearAward: () =>
            1 === localPlayerFarmingSkillLevel
              ? 0
              : 2 === localPlayerFarmingSkillLevel
              ? 3
              : 3 === localPlayerFarmingSkillLevel
              ? 12
              : 4 === localPlayerFarmingSkillLevel
              ? 15
              : 5 === localPlayerFarmingSkillLevel
              ? 18
              : 0,
        });
      let m = null;
      const l = new mp.Vector3(100, 60, 60);
      let g = 0,
        u = null;
      const b = mp.game.joaat("tractor2");
      let f = -1;
      const _ = mp.game.joaat("combine");
      let k = -1;
      const h = mp.game.joaat("duster");
      let I = !1;
      const y = () => {
        var i = Math.round;
        const { x: s, y: c, z: p } = localPlayer.position,
          y = n.find((o) => o.isPlayerInZone);
        if (10 == ++g) {
          if (y) {
            const o = y.nodes.length;
            let t = 0,
              e = 0,
              r = 0,
              n = o - y.nodeForBoostCount;
            for (const o of y.nodes) {
              if (o.status === a.NEED_TAKE) {
                t++;
                break;
              } else o.status === a.GROW && e++;
              o.isClear && r++;
            }
            0 < t
              ? ((y.isAnyNodeNeedTake = !0),
                m.callFunction(
                  "SHOW_MIDSIZED_MESSAGE",
                  y.name,
                  `Идет сбор урожая`
                ))
              : ((y.isAnyNodeNeedTake = !1),
                m.callFunction(
                  "SHOW_MIDSIZED_MESSAGE",
                  y.name,
                  `Посажено - ${i(100 * (e / o))}%\nПрополото - ${i(
                    100 * (r / o)
                  )}%\nОбработано - ${i(100 * (n / o))}%`
                )),
              (u =
                y === d
                  ? new mp.Vector3(2234.61, 5066.47, 60)
                  : new mp.Vector3(2146.215, 5181.02, 60));
          } else u = null;
          g = 0;
        }
        u &&
          m.render3D(
            u,
            new mp.Vector3(0, 0, (-180 * r(c - u.y, s - u.x)) / e + 270),
            l
          );
        const x = null != localPlayer.vehicle;
        if (!x) {
          if (y) {
            const o = getTime(),
              t = y.isAnyNodeNeedTake ? a.NEED_TAKE : a.NONE;
            if (t === a.NEED_TAKE && y === V) return;
            let e = [];
            for (const r of y.nodes)
              r.status === t &&
                r.lastPingByPlayer + 35e3 < o &&
                e.push([r, dist2(r.position, localPlayer.position)]);
            e.sort((o, t) => o[1] - t[1]).forEach((o, t) => {
              if (!(30 <= t)) {
                const t = o[0];
                mp.game.graphics.drawMarker(
                  25,
                  t.position.x,
                  t.position.y,
                  t.position.z + 0.35,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  5.5,
                  5.5,
                  5.5,
                  255,
                  255,
                  255,
                  255,
                  !1,
                  !1,
                  2,
                  !1,
                  "",
                  "",
                  !1
                );
              }
            });
          }
          return;
        }
        const v = localPlayer.vehicle.model;
        if (y && v === b) {
          let e = [];
          for (const o of y.nodes)
            o.isClear ||
              o.status === a.NEED_TAKE ||
              e.push([o, dist2(o.position, localPlayer.position)]);
          e.sort((o, t) => o[1] - t[1]).forEach((e, r) => {
            if (!(30 <= r)) {
              const r = e[0];
              mp.game.graphics.drawMarker(
                1,
                r.position.x,
                r.position.y,
                r.position.z - 0.3,
                0,
                0,
                0,
                0,
                0,
                0,
                5.5,
                5.5,
                1.5,
                255,
                255,
                255,
                255,
                !1,
                !1,
                2,
                !1,
                "",
                "",
                !1
              ),
                f !== r.index &&
                  2 > o(t(r.position.x - s, 2) + t(r.position.y - c, 2)) &&
                  (mp.events.callRemote(
                    "server_farm_field_clear",
                    y.uId,
                    r.index
                  ),
                  (f = r.index));
            }
          });
        } else if (y === V && v === _) {
          let e = [];
          for (const o of y.nodes)
            o.status === a.NEED_TAKE &&
              e.push([o, dist2(o.position, localPlayer.position)]);
          e.sort((o, t) => o[1] - t[1]).forEach((e, r) => {
            if (!(30 <= r)) {
              const r = e[0];
              mp.game.graphics.drawMarker(
                1,
                r.position.x,
                r.position.y,
                r.position.z - 0.3,
                0,
                0,
                0,
                0,
                0,
                0,
                5.5,
                5.5,
                1.5,
                255,
                255,
                255,
                255,
                !1,
                !1,
                2,
                !1,
                "",
                "",
                !1
              ),
                k !== r.index &&
                  2 > o(t(r.position.x - s, 2) + t(r.position.y - c, 2)) &&
                  (mp.events.callRemote(
                    "server_farm_field_take_inst",
                    y.uId,
                    r.index
                  ),
                  (k = r.index));
            }
          });
        }
        if (!I && v === h) {
          for (const o of n)
            if (0 !== o.nodeForBoostCount) {
              for (const t of o.nodes)
                t.localEnableBoost && (t.localIsBoost = !1);
              (o.localBoostSend = !1), (o.localIsTryBoost = !1), (I = !0);
            }
        } else if (I) {
          const i = o(t(2174.42 - s, 2) + t(4998.63 - c, 2));
          if (650 < i)
            return void (800 < i
              ? localPlayer.vehicle.setEngineOn(!1, !0, !0)
              : (mp.game.graphics.drawText(
                  "\u0412\u044B \u0443\u043B\u0435\u0442\u0430\u0435\u0442\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u0430\u043B\u0435\u043A\u043E \u043E\u0442 \u0444\u0435\u0440\u043C\u044B, \u0432\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C",
                  [0.5, 0.855],
                  { font: 4, centre: !0, color: [255, 0, 0, 255], outline: !0 }
                ),
                mp.game.graphics.drawText(
                  "\u0438\u043B\u0438 \u0441\u0430\u043C\u043E\u043B\u0435\u0442 \u0431\u0443\u0434\u0435\u0442 \u0443\u043D\u0438\u0447\u0442\u043E\u0436\u0435\u043D",
                  [0.5, 0.9],
                  { font: 4, centre: !0, color: [255, 0, 0, 255], outline: !0 }
                )));
          if (x && localPlayer.vehicle.model === h) {
            let i = [];
            for (const o of n) {
              if (o.localBoostSend) continue;
              let t = 0;
              for (const e of o.nodes)
                e.localEnableBoost &&
                  !e.localIsBoost &&
                  (t++, i.push([e, dist2(e.position, localPlayer.position)]));
              0 == t &&
                (mp.events.callRemote("server_farm_field_boost", o.uId),
                (o.localBoostSend = !0));
            }
            let a = 0;
            for (const n of i.sort((o, t) => o[1] - t[1])) {
              if (30 == ++a) break;
              const i = n[0];
              if (
                (mp.game.graphics.drawMarker(
                  6,
                  i.position.x,
                  i.position.y,
                  i.position.z + 100,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (180 * r(c - i.position.y, s - i.position.x)) / e + 90,
                  5,
                  5,
                  5,
                  255,
                  255,
                  255,
                  255,
                  !1,
                  !1,
                  2,
                  !1,
                  "",
                  "",
                  !1
                ),
                7 >
                  o(
                    t(i.position.x - s, 2) +
                      t(i.position.y - c, 2) +
                      t(i.position.z + 100 - p, 2)
                  ))
              )
                if (
                  ((i.localIsBoost = !0),
                  localPlayer.vehicle.__timeToDeleteEffect ||
                    localPlayer.vehicle.__timeToDeleteEffectTimer)
                )
                  localPlayer.vehicle.__timeToDeleteEffect = 15;
                else {
                  const o = localPlayer.vehicle;
                  let t = [];
                  (o.__timeToDeleteEffect = 15),
                    (o.__timeToDeleteEffectTimer = setInterval(() => {
                      (mp.vehicles.exists(o) && 0 !== o.handle) ||
                        (o.__timeToDeleteEffect = 0),
                        0 >= --o.__timeToDeleteEffect &&
                          (t.forEach((o) =>
                            mp.game.graphics.removeParticleFx(o, !1)
                          ),
                          clearInterval(o.__timeToDeleteEffectTimer),
                          delete o.__timeToDeleteEffectTimer,
                          delete o.__timeToDeleteEffect);
                    }, 1e3)),
                    (async () => {
                      const e = "core",
                        r = "water_cannon_jet";
                      if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core"))
                        for (
                          mp.game.streaming.requestNamedPtfxAsset(e);
                          !mp.game.streaming.hasNamedPtfxAssetLoaded(e);

                        )
                          await mp.game.waitAsync(0);
                      return mp.vehicles.exists(o) && 0 !== o.handle
                        ? void (mp.game.graphics.setPtfxAssetNextCall("core"),
                          t.push(
                            mp.game.graphics.startParticleFxLoopedOnEntity(
                              r,
                              o.handle,
                              -4.293,
                              -0.72,
                              -0.88,
                              -10,
                              190,
                              180,
                              0.5,
                              !1,
                              !1,
                              !1
                            )
                          ),
                          mp.game.graphics.setPtfxAssetNextCall("core"),
                          t.push(
                            mp.game.graphics.startParticleFxLoopedOnEntity(
                              r,
                              o.handle,
                              -4.1,
                              -0.7,
                              -0.885,
                              -10,
                              190,
                              180,
                              0.5,
                              !1,
                              !1,
                              !1
                            )
                          ),
                          mp.game.graphics.setPtfxAssetNextCall("core"),
                          t.push(
                            mp.game.graphics.startParticleFxLoopedOnEntity(
                              r,
                              o.handle,
                              4.293,
                              -0.72,
                              -0.88,
                              -10,
                              190,
                              180,
                              0.5,
                              !1,
                              !1,
                              !1
                            )
                          ),
                          mp.game.graphics.setPtfxAssetNextCall("core"),
                          t.push(
                            mp.game.graphics.startParticleFxLoopedOnEntity(
                              r,
                              o.handle,
                              4.1,
                              -0.7,
                              -0.885,
                              -10,
                              190,
                              180,
                              0.5,
                              !1,
                              !1,
                              !1
                            )
                          ),
                          mp.game.streaming.removeNamedPtfxAsset("core"))
                        : void mp.game.streaming.removeNamedPtfxAsset("core");
                    })();
                }
            }
          } else I = !1;
        }
      };
      mp.events.add("client_farm_job_start", () => {
        m || (m = new global.Scaleform("MIDSIZED_MESSAGE")),
          (g = 9),
          (u = null),
          (f = -1),
          (k = -1),
          (I = !1),
          mp.events.add("render", y);
      }),
        mp.events.add("client_farm_job_end", () => {
          mp.events.remove("render", y);
        });
    })(),
    (() => {
      mp.objects.new(
        mp.game.joaat("prop_storagetank_01"),
        new mp.Vector3(2208.58, 4931.57, 39.75),
        { dimension: 0, rotation: new mp.Vector3(0, 0, 46) }
      ),
        mp.objects.new(
          mp.game.joaat("prop_storagetank_01"),
          new mp.Vector3(2260.01, 4878.1, 39.78),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 226) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_buckets_02"),
          new mp.Vector3(2232.28, 4903.13, 40.07),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 157) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_buckets_02"),
          new mp.Vector3(2232.57, 4903.47, 40.07),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_buckets_02"),
          new mp.Vector3(2232.83, 4903.85, 40.07),
          { dimension: 0, rotation: new mp.Vector3(0, 0, -147) }
        );
      const o = mp.api.server.getDollarsFromRubles(0.35),
        t = () =>
          0 === localPlayerFarmingSkillLevel
            ? 1
            : 1 === localPlayerFarmingSkillLevel
            ? 1.25
            : 2 === localPlayerFarmingSkillLevel
            ? 1.5
            : 3 === localPlayerFarmingSkillLevel
            ? 2
            : 4 === localPlayerFarmingSkillLevel
            ? 2.5
            : 5 === localPlayerFarmingSkillLevel
            ? 3
            : 1;
      let e = null,
        r = null;
      const i = [
        new mp.Vector3(2256.56, 4875.83, 39.88),
        new mp.Vector3(2212.38, 4934.21, 39.89),
      ];
      let n = [],
        a = [],
        s = [],
        c = null,
        d = !1,
        p = [];
      const V = [
          { pedPos: new mp.Vector3(2247.87, 4871.79, 40.89), rot: 310.88 },
          { pedPos: new mp.Vector3(2245.65, 4874.52, 40.87), rot: 318.64 },
          { pedPos: new mp.Vector3(2242.11, 4870.17, 40.79), rot: 126.39 },
          { pedPos: new mp.Vector3(2232.51, 4889.99, 40.61), rot: 198.8 },
          { pedPos: new mp.Vector3(2227.58, 4884.5, 40.64), rot: 149.35 },
          { pedPos: new mp.Vector3(2224.77, 4887.28, 40.74), rot: 72.62 },
          { pedPos: new mp.Vector3(2228.21, 4895.23, 40.59), rot: 308.06 },
          { pedPos: new mp.Vector3(2220.03, 4902.43, 40.69), rot: 351 },
          { pedPos: new mp.Vector3(2215.04, 4898.09, 40.92), rot: 136.56 },
          { pedPos: new mp.Vector3(2207.94, 4906.76, 40.7), rot: 104.18 },
          { pedPos: new mp.Vector3(2216.28, 4906.66, 40.74), rot: 288.7 },
          { pedPos: new mp.Vector3(2203.08, 4918.76, 40.66), rot: 135.39 },
          { pedPos: new mp.Vector3(2200, 4913.71, 40.63), rot: 110.55 },
          { pedPos: new mp.Vector3(2219.73, 4934.89, 40.89), rot: 40.36 },
          { pedPos: new mp.Vector3(2224.05, 4937.4, 40.95), rot: 52.7 },
          { pedPos: new mp.Vector3(2229.43, 4934.61, 40.87), rot: 223.07 },
          { pedPos: new mp.Vector3(2225.47, 4930.74, 40.8), rot: 226.35 },
          { pedPos: new mp.Vector3(2235.83, 4928.62, 40.87), rot: 132.52 },
          { pedPos: new mp.Vector3(2233.03, 4921.98, 40.79), rot: 132.7 },
          { pedPos: new mp.Vector3(2231.06, 4924.27, 40.8), rot: 22.04 },
          { pedPos: new mp.Vector3(2236.57, 4915.74, 40.67), rot: 235.77 },
          { pedPos: new mp.Vector3(2236.66, 4919.33, 40.73), rot: 45.18 },
          { pedPos: new mp.Vector3(2241.42, 4924.01, 40.78), rot: 347.27 },
          { pedPos: new mp.Vector3(2245.38, 4919.58, 40.75), rot: 216.77 },
          { pedPos: new mp.Vector3(2248.72, 4905.1, 40.72), rot: 191.67 },
          { pedPos: new mp.Vector3(2251.51, 4906.41, 40.78), rot: 281.01 },
          { pedPos: new mp.Vector3(2252.8, 4911.77, 40.75), rot: 332.51 },
          { pedPos: new mp.Vector3(2252.84, 4902.72, 40.75), rot: 45.55 },
          { pedPos: new mp.Vector3(2257.82, 4908.22, 40.8), rot: 25.42 },
          { pedPos: new mp.Vector3(2260.45, 4895.13, 40.87), rot: 44.52 },
          { pedPos: new mp.Vector3(2264.13, 4898.61, 40.87), rot: 38.15 },
          { pedPos: new mp.Vector3(2266.94, 4893.75, 40.91), rot: 223.45 },
        ],
        m = V.map((o, t) => {
          const e = {
            index: t,
            position: o.pedPos,
            heading: o.rot,
            ped: mp.peds.new(mp.game.joaat("a_c_cow"), o.pedPos, o.rot, 0),
            pickup: null,
            isAngry: !1,
            lastPlayer: !1,
            blip: null,
            object: null,
            pickupPosition: mp.game.object.getObjectOffsetFromCoords(
              o.pedPos.x,
              o.pedPos.y,
              o.pedPos.z,
              o.rot,
              -0.8,
              -0.34,
              -0.01
            ),
            objectPosition: mp.game.object.getObjectOffsetFromCoords(
              o.pedPos.x,
              o.pedPos.y,
              o.pedPos.z,
              o.rot,
              0,
              -0.42,
              -1.01
            ),
            playerPosition: mp.game.object.getObjectOffsetFromCoords(
              o.pedPos.x,
              o.pedPos.y,
              o.pedPos.z,
              o.rot,
              -0.8,
              -0.34,
              -0.01
            ),
            playerHeading: o.rot + 266.74,
          };
          return (
            (e.ped.serverPed = {
              onStreamIn: async () => {
                if (
                  (e.ped.setComponentVariation(0, 0, t % 4, 2),
                  e.ped.setComponentVariation(3, 1, 0, 2),
                  !mp.game.streaming.hasAnimDictLoaded(
                    "creatures@cow@amb@world_cow_grazing@base"
                  ))
                ) {
                  mp.game.streaming.requestAnimDict(
                    "creatures@cow@amb@world_cow_grazing@base"
                  );
                  do await mp.game.waitAsync(10);
                  while (
                    !mp.game.streaming.hasAnimDictLoaded(
                      "creatures@cow@amb@world_cow_grazing@base"
                    )
                  );
                  if (!mp.peds.exists(e.ped) || 0 === e.ped.handle) return;
                }
                e.ped.taskPlayAnim(
                  "creatures@cow@amb@world_cow_grazing@base",
                  "base",
                  8,
                  1,
                  -1,
                  1,
                  0,
                  !1,
                  !1,
                  !1
                );
              },
              onStreamOut: () => {},
            }),
            e
          );
        }),
        l = () => {
          u(),
            (e = mp.markers.new(
              32,
              new mp.Vector3(2233.64, 4902.68, 40.67),
              1,
              { color: [255, 255, 255, 255], dimension: 0, visible: !0 }
            )),
            (r = new global.ActionColshape(
              new mp.Vector3(2233.64, 4902.68, 39.67),
              0,
              0.5,
              "",
              () => {
                global.actionAntiFlood("server_farm_milk_toggleBucket", 5e3) &&
                  mp.events.callRemote("server_farm_milk_toggleBucket");
              }
            )),
            (r.onceMode = !0),
            (r.isPlayerCanUse = () =>
              null == global.itemInHand ||
              global.handItemIsInHand("farmMilBucket")),
            (r.getText = () =>
              global.handItemIsInHand("farmMilBucket")
                ? "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u0435\u0434\u0440\u043E"
                : "\u0432\u0437\u044F\u0442\u044C \u0432\u0435\u0434\u0440\u043E");
        },
        g = (o) => {
          if (o)
            for (const o of m)
              mp.blips.exists(o.blip) && o.blip.destroy(),
                (o.blip = mp.blips.new(0, o.position, {
                  color: 0,
                  shortRange: !1,
                }));
          else for (const o of m) mp.blips.exists(o.blip) && o.blip.destroy();
        };
      global.handItemEventOnSet("farmMilBucket", () => {
        d = !1;
        for (const o of m)
          o.pickup && o.pickup.destroy(),
            (o.pickup = new global.ActionColshape(
              o.pickupPosition,
              0,
              0.7,
              "\u0434\u043E\u0438\u0442\u044C \u043A\u043E\u0440\u043E\u0432\u0443",
              () => {
                if (isLocalPlayerFree()) {
                  if (d)
                    return mp.api.notify.error(
                      "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043C\u043E\u043B\u043E\u043A\u043E \u0432 \u0432\u0435\u0434\u0440\u0435"
                    );
                  if (o.isAngry)
                    return mp.api.notify.error(
                      "\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 \u043F\u043E\u043A\u0430 \u043A\u043E\u0440\u043E\u0432\u0430 \u0443\u0441\u043F\u043E\u043A\u043E\u0438\u0442\u0441\u044F"
                    );
                  if (-1 !== p.indexOf(o))
                    return mp.api.notify.error(
                      "\u042D\u0442\u0430 \u043A\u043E\u0440\u043E\u0432\u0430 \u0443\u0441\u0442\u0430\u043B\u0430, \u043F\u043E\u0434\u043E\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u0443\u044E"
                    );
                  if (
                    mp.players.exists(o.lastPlayer) &&
                    0 !== o.lastPlayer.handle
                  ) {
                    const { x: t, y: e, z: r } = o.lastPlayer.position;
                    if (
                      5 >
                      mp.game.system.vdist(
                        t,
                        e,
                        r,
                        o.position.x,
                        o.position.y,
                        o.position.z
                      )
                    )
                      return mp.api.notify.error(
                        "\u041A\u0442\u043E-\u0442\u043E \u0443\u0436\u0435 \u0434\u043E\u0438\u0442 \u044D\u0442\u0443 \u043A\u043E\u0440\u043E\u0432\u0443"
                      );
                  }
                  global.actionAntiFlood("server_farm_milk_start", 5e3) &&
                    mp.events.callRemote("server_farm_milk_start", o.index);
                }
              }
            )),
            (o.pickup.onceMode = !0);
        g(!0),
          null != c && clearInterval(c),
          (c = setInterval(() => {
            mp.game.controls.disableControlAction(0, 23, !0),
              mp.game.controls.disableControlAction(0, 24, !0),
              mp.game.controls.disableControlAction(0, 25, !0),
              (global.disableAnimList = !0);
          }, 0)),
          localPlayer.resetMovementClipset(0.25),
          localPlayer.resetStrafeClipset();
      }),
        mp.events.add("client_farm_anim_milk_start", async (o, t) => {
          const e = mp.players.atRemoteId(o);
          if (e && 0 !== e.handle) {
            const o = m[t];
            if (o) {
              if (
                (e === localPlayer &&
                  (global.disableChatAndKeys(!0),
                  (global.enableCameraOnDisabled = !0),
                  global.notifyKeyHelpHide(),
                  global.menuBrowser.execute("startFarmMilkGame();")),
                !mp.game.streaming.hasAnimDictLoaded(
                  "amb@prop_human_parking_meter@female@base"
                ))
              ) {
                mp.game.streaming.requestAnimDict(
                  "amb@prop_human_parking_meter@female@base"
                );
                do await mp.game.waitAsync(10);
                while (
                  !mp.game.streaming.hasAnimDictLoaded(
                    "amb@prop_human_parking_meter@female@base"
                  )
                );
              }
              mp.players.exists(e) &&
                0 !== e.handle &&
                "farmMilBucket" === e.getVariable("cSen") &&
                (mp.attachmentMngr.removeFor(
                  e,
                  mp.game.joaat("farmMilBucketItem")
                ),
                mp.objects.exists(o.object) && o.object.destroy(),
                (o.object = mp.objects.new(
                  mp.game.joaat("prop_bucket_02a"),
                  o.objectPosition,
                  { dimension: 0 }
                )),
                e.setCoordsNoOffset(
                  o.playerPosition.x,
                  o.playerPosition.y,
                  o.playerPosition.z,
                  !1,
                  !1,
                  !1
                ),
                e.setHeading(o.playerHeading),
                e.taskPlayAnim(
                  "amb@prop_human_parking_meter@female@base",
                  "base_female",
                  8,
                  0,
                  -1,
                  49,
                  0,
                  !1,
                  !1,
                  !1
                ),
                e.setMovementClipset("move_ped_crouched", 0.25),
                e.setStrafeClipset("move_ped_crouched_strafing"),
                (o.lastPlayer = e));
            }
          }
        }),
        mp.events.add("__client_farm_milk_game", (o) => {
          mp.events.callRemote("server_farm_milk_take", o);
        }),
        mp.events.add("client_farm_anim_milk_end", (e, r, c) => {
          const V = mp.players.atRemoteId(e);
          if (!V || 0 === V.handle) return;
          const l = m[r];
          if (
            l &&
            ((l.lastPlayer = null),
            mp.objects.exists(l.object) && l.object.destroy(),
            "farmMilBucket" === V.getVariable("cSen") &&
              (mp.attachmentMngr.removeFor(
                V,
                mp.game.joaat("farmMilBucketItem")
              ),
              c
                ? mp.attachmentMngr.addClientByFakeId(
                    V,
                    mp.game.joaat("farmMilBucketMilkItem"),
                    mp.game.joaat("farmMilBucketItem")
                  )
                : mp.attachmentMngr.addClient(
                    V,
                    mp.game.joaat("farmMilBucketItem")
                  ),
              V.taskPlayAnim(
                "move_bucket",
                "idle",
                8,
                0,
                -1,
                49,
                0,
                !1,
                !1,
                !1
              )),
            V.resetMovementClipset(0.25),
            V.resetStrafeClipset(),
            c ||
              (async () => {
                if (
                  ((l.isAngry = !0),
                  !mp.game.streaming.hasAnimDictLoaded("creatures@cow@move"))
                ) {
                  mp.game.streaming.requestAnimDict("creatures@cow@move");
                  do await mp.game.waitAsync(10);
                  while (
                    !mp.game.streaming.hasAnimDictLoaded("creatures@cow@move")
                  );
                }
                return mp.peds.exists(l.ped) && 0 !== l.ped.handle
                  ? (l.ped.taskPlayAnim(
                      "creatures@cow@move",
                      "idle_sit_ent",
                      8,
                      0,
                      -1,
                      0,
                      0,
                      !1,
                      !1,
                      !1
                    ),
                    await mp.game.waitAsync(3e3),
                    !mp.peds.exists(l.ped) || 0 === l.ped.handle)
                    ? (l.isAngry = !1)
                    : (l.ped.taskPlayAnim(
                        "creatures@cow@move",
                        "idle_sit",
                        8,
                        0,
                        -1,
                        0,
                        0,
                        !1,
                        !1,
                        !1
                      ),
                      await mp.game.waitAsync(1e4),
                      !mp.peds.exists(l.ped) || 0 === l.ped.handle)
                    ? (l.isAngry = !1)
                    : (l.ped.taskPlayAnim(
                        "creatures@cow@move",
                        "idle_sit_ext",
                        8,
                        0,
                        -1,
                        0,
                        0,
                        !1,
                        !1,
                        !1
                      ),
                      await mp.game.waitAsync(3e3),
                      mp.peds.exists(l.ped) && 0 !== l.ped.handle
                        ? void (l.ped.taskPlayAnim(
                            "creatures@cow@amb@world_cow_grazing@base",
                            "base",
                            8,
                            1,
                            -1,
                            1,
                            0,
                            !1,
                            !1,
                            !1
                          ),
                          (l.isAngry = !1))
                        : (l.isAngry = !1))
                  : (l.isAngry = !1);
              })(),
            V === localPlayer)
          ) {
            if (
              (global.disableChatAndKeys(!1),
              (global.enableCameraOnDisabled = !1),
              !c || "farmMilBucket" !== V.getVariable("cSen"))
            )
              return;
            (d = !0),
              g(!1),
              n.forEach((o) => mp.blips.exists(o) && o.destroy()),
              (n = i.map((o) =>
                mp.blips.new(0, o, { color: 0, shortRange: !1 })
              )),
              a.forEach((o) => mp.markers.exists(o) && o.destroy()),
              (a = i.map((o) =>
                mp.markers.new(42, new mp.Vector3(o.x, o.y, o.z + 1), 1, {
                  color: [255, 255, 255, 255],
                  dimension: 0,
                  visible: !0,
                })
              )),
              s.forEach((o) => o.destroy()),
              (s = i.map(
                (e) =>
                  new global.ActionColshape(
                    e,
                    0,
                    0.7,
                    "\u0441\u043B\u0438\u0442\u044C \u043C\u043E\u043B\u043E\u043A\u043E",
                    () => {
                      mp.events.callRemote("server_farm_milk_end"),
                        mp.api.notify.info(
                          `+${Math.floor(o * t())}$ к зарплате во время PayDay`
                        ),
                        (d = !1),
                        g(!0),
                        n.forEach((o) => mp.blips.exists(o) && o.destroy()),
                        (n = []),
                        a.forEach((o) => mp.markers.exists(o) && o.destroy()),
                        (a = []),
                        s.forEach((o) => o.destroy()),
                        (s = []),
                        mp.attachmentMngr.removeFor(
                          V,
                          mp.game.joaat("farmMilBucketItem")
                        ),
                        mp.attachmentMngr.addClient(
                          V,
                          mp.game.joaat("farmMilBucketItem")
                        );
                    }
                  )
              )),
              0.9 < Math.random() && (3 < p.length && (p = []), p.push(l));
          }
        }),
        global.handItemEventOnRemove("farmMilBucket", () => {
          for (const o of m)
            o.pickup && (o.pickup.destroy(), (o.pickup = null));
          g(!1),
            n.forEach((o) => mp.blips.exists(o) && o.destroy()),
            (n = []),
            a.forEach((o) => mp.markers.exists(o) && o.destroy()),
            (a = []),
            s.forEach((o) => o.destroy()),
            (s = []),
            null != c && clearInterval(c),
            (c = null),
            (global.disableAnimList = !1);
        });
      const u = () => {
        mp.markers.exists(e) && e.destroy(), r && (r.destroy(), (r = null));
        for (const o of m) o.pickup && (o.pickup.destroy(), (o.pickup = null));
      };
      new global.CustomScenarioAnimWithItem(
        "farmMilBucket",
        "farmMilBucketItem",
        "move_bucket",
        "idle",
        49
      ),
        mp.attachmentMngr.register(
          "farmMilBucketItem",
          "gta5rp_bucket_1",
          28422,
          new mp.Vector3(0.05, 0, -0.05),
          new mp.Vector3(0, 0, 0)
        ),
        mp.attachmentMngr.register(
          "farmMilBucketMilkItem",
          "gta5rp_bucket_milk",
          28422,
          new mp.Vector3(0.05, 0, -0.05),
          new mp.Vector3(0, 0, 0)
        ),
        mp.events.add("client_farm_job_start", () => {
          l();
        }),
        mp.events.add("client_farm_job_end", () => {
          u();
        });
    })(),
    (() => {
      var o = Math.floor;
      mp.objects.new(
        mp.game.joaat("prop_rub_boxpile_04b"),
        new mp.Vector3(2356.21, 4942.78, 41.68),
        { dimension: 0, rotation: new mp.Vector3(0, 0, -87.25) }
      ),
        mp.objects.new(
          mp.game.joaat("prop_rub_boxpile_04b"),
          new mp.Vector3(2357.05, 4943.08, 41.68),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_rub_boxpile_04b"),
          new mp.Vector3(2356.09, 4943.56, 41.14),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 93.25) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_rub_boxpile_04b"),
          new mp.Vector3(2137.13, 4834.52, 40.45),
          { dimension: 0, rotation: new mp.Vector3(0, 0, -37) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_rub_boxpile_04b"),
          new mp.Vector3(2135.91, 4833.92, 40.46),
          { dimension: 0, rotation: new mp.Vector3(0, 0, -103) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_feeder1"),
          new mp.Vector3(2349.35, 4940.37, 41.31),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
        ),
        mp.objects.new(
          mp.game.joaat("prop_feeder1"),
          new mp.Vector3(2132.72, 4833.4, 40.36),
          { dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
        );
      const t = mp.api.server.getDollarsFromRubles(1.35),
        e = () =>
          0 === localPlayerFarmingSkillLevel
            ? 1
            : 1 === localPlayerFarmingSkillLevel
            ? 1.25
            : 2 === localPlayerFarmingSkillLevel
            ? 1.5
            : 3 === localPlayerFarmingSkillLevel
            ? 2
            : 4 === localPlayerFarmingSkillLevel
            ? 2.5
            : 5 === localPlayerFarmingSkillLevel
            ? 3
            : 1,
        r = [
          {
            position: new mp.Vector3(2389.987, 4992.423, 44.16648),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2389.664, 5004.566, 44.70713),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2376.499, 5016.814, 44.36322),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2377.54, 5003.986, 43.55063),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2369.237, 5010.948, 43.14606),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2357.204, 5020.553, 42.76117),
            rotation: new mp.Vector3(0, 0, -30),
          },
          {
            position: new mp.Vector3(2341.844, 5035.004, 43.32811),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2329.365, 5037.109, 43.45482),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2343.679, 5022.614, 42.48338),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2360.886, 5002.238, 42.43134),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2374.113, 4989.015, 42.99766),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2330.34, 5021.844, 41.85641),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2344.507, 5007.939, 41.68259),
            rotation: new mp.Vector3(0, 0, -30),
          },
          {
            position: new mp.Vector3(2361.507, 4988.791, 42.19693),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2316.514, 5023.643, 42.29422),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2330.975, 5007.745, 41.34045),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2349.473, 4989.562, 41.97867),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2361.688, 4976.412, 42.23586),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2316.879, 5008.929, 41.49816),
            rotation: new mp.Vector3(0, 0, -30),
          },
          {
            position: new mp.Vector3(2331.62, 4996.562, 41.06039),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2349.16, 4975.843, 41.69807),
            rotation: new mp.Vector3(0, 0, -30),
          },
          {
            position: new mp.Vector3(2317.108, 4994.208, 40.98644),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2336.246, 4976.026, 41.55532),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2304.847, 4997.079, 41.3071),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2317.741, 4984.365, 40.73837),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2148.559, 4868.396, 39.43554),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2122.971, 4883.903, 39.78011),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2122.08, 4861.78, 40.02671),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2102.03, 4877.732, 39.98615),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2117.429, 4842.077, 40.49171),
            rotation: new mp.Vector3(0, 0, 150),
          },
          {
            position: new mp.Vector3(2098.362, 4841.382, 40.63255),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2083.302, 4853.354, 40.82642),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2086.233, 4825.683, 40.42909),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(2060.294, 4842.658, 40.7404),
            rotation: new mp.Vector3(0, 0, 90),
          },
          {
            position: new mp.Vector3(2064.053, 4819.512, 40.77041),
            rotation: new mp.Vector3(0, 0, 150),
          },
          {
            position: new mp.Vector3(2031.14, 4802.009, 40.62146),
            rotation: new mp.Vector3(0, 0, 150),
          },
          {
            position: new mp.Vector3(2015.966, 4800.509, 40.89126),
            rotation: new mp.Vector3(0, 0, 30),
          },
          {
            position: new mp.Vector3(2003.66, 4786.886, 40.72567),
            rotation: new mp.Vector3(0, 0, -180),
          },
          {
            position: new mp.Vector3(1981.833, 4771.882, 40.53275),
            rotation: new mp.Vector3(0, 0, 90),
          },
        ];
      let i = [],
        n = [],
        a = null,
        s = [],
        c = [],
        d = [],
        p = !1;
      const V = () => {
          m(),
            (n[0] = mp.markers.new(
              32,
              new mp.Vector3(2355.71, 4944.28, 42.69),
              1,
              { color: [255, 255, 255, 255], dimension: 0, visible: !0 }
            )),
            (i[0] = new global.ActionColshape(
              new mp.Vector3(2355.71, 4944.28, 41.59),
              0,
              0.5,
              "",
              () => {
                global.actionAntiFlood("server_farm_tree_toggleBox", 5e3) &&
                  mp.events.callRemote("server_farm_tree_toggleBox");
              }
            )),
            (i[0].onceMode = !0),
            (i[0].isPlayerCanUse = () =>
              null == global.itemInHand ||
              global.handItemIsInHand("farmTreeBox")),
            (i[0].getText = () =>
              global.handItemIsInHand("farmTreeBox")
                ? "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u044F\u0449\u0438\u043A"
                : "\u0432\u0437\u044F\u0442\u044C \u044F\u0449\u0438\u043A"),
            (n[1] = mp.markers.new(
              32,
              new mp.Vector3(2136.07, 4834.98, 41.43),
              1,
              { color: [255, 255, 255, 255], dimension: 0, visible: !0 }
            )),
            (i[1] = new global.ActionColshape(
              new mp.Vector3(2136.07, 4834.98, 40.33),
              0,
              0.5,
              "",
              () => {
                global.actionAntiFlood("server_farm_tree_toggleBox", 5e3) &&
                  mp.events.callRemote("server_farm_tree_toggleBox");
              }
            )),
            (i[1].onceMode = !0),
            (i[1].isPlayerCanUse = () =>
              null == global.itemInHand ||
              global.handItemIsInHand("farmTreeBox")),
            (i[1].getText = () =>
              global.handItemIsInHand("farmTreeBox")
                ? "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u044F\u0449\u0438\u043A"
                : "\u0432\u0437\u044F\u0442\u044C \u044F\u0449\u0438\u043A");
        },
        m = () => {
          i.forEach((o) => o.destroy()),
            (i = []),
            n.forEach((o) => mp.markers.exists(o) && o.destroy()),
            (n = []),
            c.forEach((o) => o.destroy()),
            (c = []),
            s.forEach((o) => mp.markers.exists(o) && o.destroy()),
            (s = []),
            (p = !1),
            (_ = !1);
        },
        l = (o) => {
          d.forEach((o) => mp.blips.exists(o) && o.destroy()),
            "tree" === o
              ? (d = r.map((o) => mp.blips.new(0, o.position, { color: 0 })))
              : "end" == o &&
                (d.push(
                  mp.blips.new(0, new mp.Vector3(2347.66, 4942.29, 41.33), {
                    color: 0,
                  })
                ),
                d.push(
                  mp.blips.new(0, new mp.Vector3(2132.72, 4833.4, 40.36), {
                    color: 0,
                  })
                ));
        };
      global.handItemEventOnSet("farmTreeBox", () => {
        null != a && clearInterval(a),
          (a = setInterval(() => {
            mp.game.controls.disableControlAction(0, 22, !0),
              mp.game.controls.disableControlAction(0, 23, !0),
              mp.game.controls.disableControlAction(0, 24, !0),
              mp.game.controls.disableControlAction(0, 25, !0),
              (global.disableAnimList = !0);
          }, 0)),
          localPlayer.resetMovementClipset(0.25),
          localPlayer.resetStrafeClipset(),
          r.forEach((o, t) => {
            o.pickup && o.pickup.destroy(),
              (o.pickup = new global.ActionColshape(
                o.position,
                0,
                2.5,
                "\u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0430\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u044B",
                () => {
                  if (p) return;
                  const o = mp.game.joaat("prop_veg_crop_orange");
                  let e = null,
                    r = 2.5;
                  return (
                    mp.objects.forEach((t) => {
                      if (!(e || t.model !== o)) {
                        const o = dist2(localPlayer.position, t.position);
                        o < r && ((r = o), (e = t));
                      }
                    }),
                    e
                      ? void (
                          !global.actionAntiFlood(
                            "server_farm_tree_start",
                            5e3
                          ) || mp.events.callRemote("server_farm_tree_start", t)
                        )
                      : mp.api.notify.error(
                          "\u0414\u0435\u0440\u0435\u0432\u043E \u0435\u0449\u0435 \u043D\u0435 \u0441\u043E\u0437\u0440\u0435\u043B\u043E"
                        )
                  );
                }
              )),
              (o.pickup.onceMode = !0),
              (o.pickup.isPlayerCanUse = () => !p);
          }),
          l("tree");
      }),
        global.handItemEventOnRemove("farmTreeBox", () => {
          null != a && clearInterval(a),
            (a = null),
            (global.disableAnimList = !1),
            l(),
            r.forEach((o) => {
              o.pickup && o.pickup.destroy(), (o.pickup = null);
            });
        });
      let g = [],
        u = null,
        b = new mp.Vector3(0, 0, 0),
        f = -1,
        _ = !1;
      mp.events.add("client_farm_tree_start", (i, n, a) => {
        const d = r[i];
        if (!d) return;
        (p = !0), (f = i);
        const V = mp.objects.atRemoteId(n);
        V &&
          (V.position = new mp.Vector3(
            d.position.x,
            d.position.y,
            d.position.z - 20
          ));
        const m = mp.objects.new(
          mp.game.joaat("gta5rp_prop_veg_crop_orange"),
          d.position,
          { rotation: d.rotation, dimension: 0 }
        );
        let h = null,
          I = 0;
        const v = 20;
        g.forEach((o) => mp.objects.exists(o) && o.destroy()), (g = []);
        for (let t = 0; t < v; t++)
          g.push(
            mp.objects.new(
              mp.game.joaat("gta5rp_orange_fruit"),
              new mp.Vector3(
                d.position.x +
                  (0.5 < Math.random() ? 1 : -1) * (1 + Math.random()),
                d.position.y +
                  (0.5 < Math.random() ? 1 : -1) * (1 + Math.random()),
                d.position.z + 3.5
              ),
              {
                dimension: 0,
                rotation: new mp.Vector3(0, 0, o(180 * Math.random())),
              }
            )
          );
        const A = () => {
          if (!_)
            mp.game.graphics.drawText(
              `Апельсинов собрано: ${I} / ${v}`,
              [0.5, 0.855],
              { font: 4, centre: d, color: [255, 255, 255, 255], outline: !0 }
            ),
              mp.game.graphics.drawText(
                "M - \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0443",
                [0.5, 0.9],
                { font: 4, centre: d, color: [255, 255, 255, 255], outline: !0 }
              );
          else if (
            (mp.game.controls.disableControlAction(0, 23, !0),
            mp.game.graphics.drawText(
              "F - \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0443",
              [0.5, 0.9],
              { font: 4, centre: d, color: [255, 255, 255, 255], outline: !0 }
            ),
            mp.game.controls.isDisabledControlPressed(0, 23))
          ) {
            _ = !1;
            const o = mp.attachmentMngr.getObject(
              localPlayer,
              mp.game.joaat("farmTreeLadderItem")
            );
            if (o) {
              const { x: t, y: e, z: r } = o.getCoords(!0),
                { x: i, y: n, z: a } = o.getRotation(2);
              mp.events.callRemote(
                "server_farm_tree_ladder",
                f,
                t,
                e,
                r,
                0,
                0,
                a
              );
            } else u.position = b;
            mp.attachmentMngr.removeFor(
              localPlayer,
              mp.game.joaat("farmTreeLadderItem")
            ),
              isLocalPlayerFree() &&
                (k.isActive(localPlayer)
                  ? k.onStart(localPlayer)
                  : localPlayer.clearTasksImmediately()),
              localPlayer.setConfigFlag(146, !1);
          }
        };
        let w = !1,
          P = 0;
        const C = setInterval(() => {
          if (
            global.isPlayerDeath ||
            !global.handItemIsInHand("farmTreeBox") ||
            25 < dist2(localPlayer.position, d.position)
          )
            return (
              V && (V.position = d.position),
              mp.objects.exists(m) && m.destroy(),
              mp.objects.exists(h) && h.destroy(),
              g.forEach((o) => mp.objects.exists(o) && o.destroy()),
              (p = !1),
              global.mainMenuItems.delete(
                "\u041F\u0435\u0440\u0435\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0443"
              ),
              mp.attachmentMngr.removeFor(
                localPlayer,
                mp.game.joaat("farmTreeLadderItem")
              ),
              (global.fingerPointingEnableOutSync = !0),
              mp.events.remove("render", A),
              void clearInterval(C)
            );
          const r = localPlayer.isClimbing();
          if (r && !w) {
            mp.objects.exists(m) && 0 !== m.handle && m.setCollision(!1, !0),
              g.forEach((o) => mp.objects.exists(o) && o.setCollision(!1, !0)),
              mp.objects.exists(h) && h.destroy();
            const o = mp.objects.atRemoteId(a);
            if (o) {
              const t = mp.game.object.getObjectOffsetFromCoords(
                o.position.x,
                o.position.y,
                o.position.z,
                o.getRotation(2).z,
                1,
                0,
                0
              );
              (t.z = mp.game.gameplay.getGroundZFor3dCoord(
                t.x,
                t.y,
                t.z + 1,
                0,
                !1
              )),
                (h = mp.objects.new(mp.game.joaat("ng_proc_box_02b"), t, {
                  rotation: new mp.Vector3(0, 0, o.getRotation(2).z + 180),
                }));
            }
            mp.attachmentMngr.removeFor(
              localPlayer,
              mp.game.joaat("farmTreeBoxItem")
            ),
              localPlayer.stopAnimTask("anim@heists@box_carry@", "idle", 3),
              (w = !0);
          } else
            !r &&
              w &&
              (mp.objects.exists(m) && 0 !== m.handle && m.setCollision(!0, !1),
              g.forEach((o) => mp.objects.exists(o) && o.setCollision(!0, !1)),
              mp.objects.exists(h) && h.destroy(),
              mp.attachmentMngr.addClient(
                localPlayer,
                mp.game.joaat("farmTreeBoxItem")
              ),
              localPlayer.taskPlayAnim(
                "anim@heists@box_carry@",
                "idle",
                8,
                0,
                -1,
                49,
                0,
                !1,
                !1,
                !1
              ),
              (w = !1));
          const {
            x: n,
            y: u,
            z: b,
          } = localPlayer.getBoneCoords(4170, 0.03, 0, 0);
          let f = null,
            _ = 0.4 + Math.min(1, 0.002 * P);
          if (global.fingerPointingActive)
            for (const o of g) {
              if (!mp.objects.exists(o)) continue;
              const t = mp.game.system.vdist(
                n,
                u,
                b,
                o.position.x,
                o.position.y,
                o.position.z
              );
              t < _ && ((f = o), (_ = t));
            }
          if (
            f &&
            (global.mainBrowser.execute(
              `client_playMusic('https://files.gta5rp.com/sound/pick_off_small_hedge.mp3', 0.5);`
            ),
            f.destroy(),
            ++I >= v)
          ) {
            mp.events.callRemote("server_farm_tree_end", i),
              V && (V.position = d.position),
              mp.objects.exists(m) && m.destroy(),
              mp.objects.exists(h) && h.destroy(),
              mp.attachmentMngr.addClient(
                localPlayer,
                mp.game.joaat("farmTreeBoxItem")
              ),
              l("end"),
              c.forEach((o) => o.destroy()),
              (c = []),
              s.forEach((o) => mp.markers.exists(o) && o.destroy()),
              (s = []);
            const r = () => {
              mp.events.callRemote("server_farm_tree_put"),
                mp.api.notify.info(
                  `+${o(t * e())}$ к зарплате во время PayDay`
                ),
                (p = !1),
                l("tree"),
                c.forEach((o) => o.destroy()),
                (c = []),
                s.forEach((o) => mp.markers.exists(o) && o.destroy()),
                (s = []);
            };
            return (
              (s[0] = mp.markers.new(
                42,
                new mp.Vector3(2347.66, 4942.29, 42.33),
                1,
                { color: [255, 255, 255, 255], dimension: 0, visible: !0 }
              )),
              (c[0] = new global.ActionColshape(
                new mp.Vector3(2347.66, 4942.29, 41.33),
                0,
                1,
                "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u0430\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u044B",
                r
              )),
              (s[1] = mp.markers.new(
                42,
                new mp.Vector3(2132.81, 4835.23, 41.43),
                1,
                { color: [255, 255, 255, 255], dimension: 0, visible: !0 }
              )),
              (c[1] = new global.ActionColshape(
                new mp.Vector3(2132.81, 4835.23, 40.33),
                0,
                1,
                "\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u0430\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u044B",
                r
              )),
              g.forEach((o) => mp.objects.exists(o) && o.destroy()),
              global.mainMenuItems.delete(
                "\u041F\u0435\u0440\u0435\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0443"
              ),
              mp.attachmentMngr.removeFor(
                localPlayer,
                mp.game.joaat("farmTreeLadderItem")
              ),
              (global.fingerPointingEnableOutSync = !0),
              mp.events.remove("render", A),
              void clearInterval(C)
            );
          }
          P++;
        }, 500);
        mp.events.add("render", A),
          global.mainMenuItems.set(
            "\u041F\u0435\u0440\u0435\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0443",
            async () => {
              if (!(_ || !isLocalPlayerFree() || localPlayer.isClimbing())) {
                _ = !0;
                const o = mp.objects.atRemoteId(a);
                if (
                  (o &&
                    ((u = o),
                    (b = new mp.Vector3(
                      o.position.x,
                      o.position.y,
                      o.position.z
                    )),
                    (o.position = new mp.Vector3(
                      o.position.x,
                      o.position.y,
                      -15
                    ))),
                  mp.attachmentMngr.addClient(
                    localPlayer,
                    mp.game.joaat("farmTreeLadderItem")
                  ),
                  !mp.game.streaming.hasAnimDictLoaded("laddersbase"))
                ) {
                  mp.game.streaming.requestAnimDict("laddersbase");
                  do await mp.game.waitAsync(10);
                  while (!mp.game.streaming.hasAnimDictLoaded("laddersbase"));
                }
                localPlayer.taskPlayAnim(
                  "laddersbase",
                  "slide_climb_down",
                  1,
                  0,
                  -1,
                  48,
                  0,
                  !1,
                  !1,
                  !1
                ),
                  localPlayer.setConfigFlag(146, !0);
              }
            }
          ),
          (global.fingerPointingEnableOutSync = !1),
          l();
      });
      const k = new global.CustomScenarioAnimWithItem(
        "farmTreeBox",
        "farmTreeBoxItem",
        "anim@heists@box_carry@",
        "idle",
        49
      );
      mp.attachmentMngr.register(
        "farmTreeBoxItem",
        "ng_proc_box_02b",
        28422,
        new mp.Vector3(0, -0.02, -0.07),
        new mp.Vector3(0, 320, 90)
      ),
        mp.attachmentMngr.register(
          "farmTreeLadderItem",
          "gta5rp_prop_byard_ladder01",
          23553,
          new mp.Vector3(0.9, 0.4, 0),
          new mp.Vector3(0, 90, 0)
        ),
        mp.events.add("client_farm_job_start", () => {
          V();
        }),
        mp.events.add("client_farm_job_end", () => {
          m();
        });
    })();
  const isLocalPlayerFree = () =>
      !localPlayer.vehicle && !global.isPlayerDeath && !global.disableAllAction,
    getTime = () => new Date().getTime(),
    dist2 = (o, t) =>
      Math.sqrt(Math.pow(o.x - t.x, 2) + Math.pow(o.y - t.y, 2)),
    isPointInPolygon = (o, t) => {
      let e = 0,
        r = 0,
        n = 0,
        a = 0,
        s = 0,
        c = 0,
        d = 0,
        p = 0,
        V = null,
        m = null;
      const l = o[0],
        g = o[1],
        u = t.length;
      for (e; e < u; e++) {
        r = 0;
        const i = t[e].length - 1,
          u = t[e];
        for (V = u[0], s = V[0] - l, c = V[1] - g, r; r < i; r++) {
          if (
            ((m = u[r + 1]),
            (p = m[1] - g),
            (0 > c && 0 > p) || (0 < c && 0 < p))
          ) {
            (V = m), (c = p), (s = V[0] - l);
            continue;
          }
          if (((d = m[0] - o[0]), 0 < p && 0 >= c)) {
            if (((a = s * p - d * c), 0 < a)) ++n;
            else if (0 === a) return 0;
          } else if (0 < c && 0 >= p) {
            if (((a = s * p - d * c), 0 > a)) ++n;
            else if (0 === a) return 0;
          } else if (0 === p && 0 > c) {
            if (((a = s * p - d * c), 0 === a)) return 0;
          } else if (0 === c && 0 > p) {
            if (((a = s * p - d * c), 0 === a)) return 0;
          } else if (0 === c && 0 === p) {
            if (0 >= d && 0 <= s) return 0;
            if (0 >= s && 0 <= d) return 0;
          }
          (V = m), (c = p), (s = d);
        }
      }
      return 0 != n % 2;
    };
}
