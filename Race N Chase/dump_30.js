{
const localPlayer = mp.players.local;
const maxSpeed = 90.0;
const minHeight = 10.0;
const maxHeight = 260.0;
const maxAngle = 60.0;

function rappelPlayer(warningLevel)
{
    if(warningLevel === undefined) warningLevel = 1;

    const vehicle = localPlayer.vehicle;
    if (!vehicle) {
        return;
    }

    if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
        if(warningLevel == 1) mp.gui.chat.push("You cannot rappel from this vehicle.");
        return;
    }

    if (vehicle.getSpeed() > maxSpeed) {
        if(warningLevel >= 1) mp.gui.chat.push("The vehicle is too fast for rappelling.");
        return;
    }

    if (vehicle.getPedInSeat(-1) === localPlayer.handle || vehicle.getPedInSeat(0) === localPlayer.handle) {
        if(warningLevel >= 1) mp.gui.chat.push("You cannot rappel from your seat.");
        return;
    }

    const taskStatus = localPlayer.getScriptTaskStatus(-275944640);
    if (taskStatus === 0 || taskStatus === 1) {
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
}

mp.events.add('OneSecondEvent', () => {
    if(mp.storage.data.menu.tooltips == true && ServerUI != null)
    {
        if(mp.players.local.vehicle)
        {
            const taskStatus = mp.players.local.getScriptTaskStatus(-275944640);
            const curHeight = mp.players.local.vehicle.getHeightAboveGround();

            if( (!mp.game.invoke("0x4E417C547182C84D", mp.players.local.vehicle.handle) || (mp.players.local.vehicle.getSpeed() > maxSpeed) || 
                mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle || mp.players.local.vehicle.getPedInSeat(0) === mp.players.local.handle || 
                taskStatus === 0 || taskStatus === 1 || curHeight < minHeight || curHeight > maxHeight 
                || !mp.players.local.vehicle.isUpright(maxAngle) || mp.players.local.vehicle.isUpsidedown()) == false)
            {
                mp.events.callLocal("AddTooltip", "X", "Rappel", -1);
            }
            else mp.events.callLocal("RemoveTooltip", "X");
        }
        else mp.events.callLocal("RemoveTooltip", "X");
    }
});

mp.keys.bind(0x58, false, function() {
    if(mp.players.local.LoggedIn === undefined || mp.players.local.LoggedIn == false) return;
    if(Date.now() - lastChatToggle <= 500) return;
    if(menuToggled !== undefined && menuToggled) return;
    if(chatStatus && !scoreboardToggled) return;
    if(menuToggled) return;

    rappelPlayer(2);
});

mp.events.add("playerCommand", (command) => {
    if (command.toLowerCase() === "rappel" || command.toLowerCase() === "rapple") {
        rappelPlayer(1);
    }
});
}