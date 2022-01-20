{
  const localPlayer = mp.players.local;
  let currentAction = !0,
    afkCounter = 0;
  setInterval(() => {
    global.isAuth &&
      (currentAction
        ? (afkCounter = 0)
        : (afkCounter++,
          3 <= afkCounter && mp.events.callRemote("server_player_antiAFK_add")),
      (currentAction = !1));
  }, 60000),
    [65, 68, 87, 83, 38, 40, 37, 39].forEach((a) => {
      mp.keys.bind(a, !0, function () {
        global.isAuth && (currentAction = !0);
      });
    }),
    (global.antiAFK_sendAction = () => {
      currentAction = !0;
    });
}
