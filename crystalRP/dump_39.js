{
const localPlayer = mp.players.local;
const maxSpeed = 10.0;
const minHeight = 15.0;
const maxHeight = 45.0;
const maxAngle = 15.0;

mp.events.add("playerCommand", (command) => {
    if (command.toLowerCase() === "rappel") {
        const vehicle = localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
            mp.gui.chat.push("На вертолёте нет спускового механизма");
            return;
        }

        if (vehicle.getSpeed() > maxSpeed) {
            mp.gui.chat.push("Снизьте скорость для спуска");
            return;
        }

        if (vehicle.getPedInSeat(-1) === localPlayer.handle || vehicle.getPedInSeat(0) === localPlayer.handle) {
            mp.gui.chat.push("Спуск не возможет с этого места");
            return;
        }

        const taskStatus = localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            mp.gui.chat.push("Вы уже начали спускаться");
            return;
        }

        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < minHeight || curHeight > maxHeight) {
            mp.gui.chat.push("Слишком низко/высоко для спуска");
            return;
        }

        if (!vehicle.isUpright(maxAngle) || vehicle.isUpsidedown()) {
            mp.gui.chat.push("Вертолёт не устойчив для спуска");
            return;
        }

        localPlayer.clearTasks();
        localPlayer.taskRappelFromHeli(10.0);
    }
});
}