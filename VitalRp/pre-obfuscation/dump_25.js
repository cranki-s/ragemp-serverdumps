{
const localPlayer = mp.players.local;
const maxSpeed = 10.0;
const minHeight = 15.0;
const maxHeight = 45.0;
const maxAngle = 15.0;

mp.events.add("testrapel", () => {

        const vehicle = localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
            mp.gui.chat.push("You cannot rappel from this vehicle.");
            return;
        }

        if (vehicle.getSpeed() > maxSpeed) {
            mp.gui.chat.push("The vehicle is too fast for rappelling.");
            return;
        }

        if (vehicle.getPedInSeat(-1) === localPlayer.handle || vehicle.getPedInSeat(0) === localPlayer.handle) {
            mp.gui.chat.push("You cannot rappel from your seat.");
            return;
        }

        const taskStatus = localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            mp.gui.chat.push("You are already rappelling.");
            return;
        }

        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < minHeight || curHeight > maxHeight) {
            mp.gui.chat.push("The vehicle is too low/too high for rappelling.");
            return;
        }

        if (!vehicle.isUpright(maxAngle) || vehicle.isUpsidedown()) {
            mp.gui.chat.push("The vehicle needs to be stable for rappelling.");
            return;
        }

        localPlayer.clearTasks();
        localPlayer.taskRappelFromHeli(10.0);
    
});
}