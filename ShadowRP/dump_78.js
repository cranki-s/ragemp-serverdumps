{
var autopilotStart = !1,
    autopilotPoint = null,
    autopilotInterval = null;
const autoPilotSpeed = 25;

mp.keys.bind(0x58, false, function () { // X key
    if (!loggedin || chatActive || editing || global.menuOpened || localplayer.getVariable('IS_DYING') || cuffed) return;
    const a = localplayer.vehicle;
    if(train == null && localplayer.vehicle.getPedInSeat(-1) !== localplayer.handle) return; //Проверка, водителю доступно другим нет
    if (autopilotStart)
    {
        const a = localplayer.vehicle;
        return a && (localplayer.clearTasks(), localplayer.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotPoint = null, autopilotStart = !1, void clearInterval(autopilotInterval)
    }
    if (null == a) return;

    if (!localplayer.getVariable("isAutouPilot")) return; //Проверка на разрешение автопилота для данной марки

    var engine = a.getIsEngineRunning();
    if (engine == false) return mp.game.graphics.notify('Двигатель не заведен.');  //проверка двигателя

    let b = mp.game.invoke("0x1DD1F58F493F1DA5"),
        c = mp.game.invoke("0x186E5D252FA50E7D"),
        d = mp.game.invoke("0x1BEDE233E6CD2A1F", c),
        e = mp.game.invoke("0x14F96AA50D6FBEA7", c);

    for (let a = d; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", a); a = e)
        if (4 == mp.game.invoke("0xBE9B0959FFD0779B", a) && !!b)
        {
            autopilotPoint = mp.game.ui.getBlipInfoIdCoord(a);
            break
        }
        return null == autopilotPoint ? void mp.game.graphics.notify("Автопилот: Сперва укажите место назначения.") : void(!autopilotStart && (mp.game.graphics.notify( "Автопилот: Маршрут построен, начинаем движение."), localplayer.taskVehicleDriveToCoord(a.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 2883621, 30, 1), autopilotStart = !0, clearInterval(autopilotInterval), autopilotInterval = setInterval(() => {
        if (!autopilotStart) return void clearInterval(autopilotInterval);
        const a = localplayer.vehicle;
        return a ? 15 > mp.game.system.vdist(localplayer.position.x, localplayer.position.y, localplayer.position.z, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z) ? (localplayer.clearTasks(), a && localplayer.taskVehicleTempAction(a.handle, 27, 1e4), autopilotPoint = null, autopilotStart = !1, clearInterval(autopilotInterval), void mp.game.graphics.notify("Автопилот: Вы достигли места назначения!")) : void 0 : (a && (localplayer.clearTasks(), localplayer.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotStart = !1, void clearInterval(autopilotInterval))
    }, 300)))
});
}