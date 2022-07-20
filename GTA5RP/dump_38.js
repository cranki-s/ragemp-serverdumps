{
    const mp = global.mp,
        localPlayer = mp.players.local;
    let currentAction = !0,
        afkCounter = 0;
    setInterval(() => {
        global.isAuth && (currentAction ? afkCounter = 0 : (afkCounter++, 3 <= afkCounter && mp.events.callRemote("server_player_antiAFK_add")), currentAction = !1)
    }, 60000), setInterval(() => {
        (mp.game.controls.isControlPressed(0, 32) || mp.game.controls.isControlPressed(0, 33) || mp.game.controls.isControlPressed(0, 34) || mp.game.controls.isControlPressed(0, 35) || mp.game.controls.isControlPressed(0, 71) || mp.game.controls.isControlPressed(0, 72)) && (currentAction = !0)
    }, 1e3), global.antiAFK_sendAction = () => {
        currentAction = !0
    };
}