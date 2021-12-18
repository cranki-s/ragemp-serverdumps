{
let gangwarHUDBrowser = null;

mp.events.add("Client:Gangwar:createHUD", (attacker, attackerPoints, defender, defenderPoints) => {
    if (gangwarHUDBrowser == null) {
        gangwarHUDBrowser = mp.browsers.new("package://cef/gangwar/hud/index.html");
        gangwarHUDBrowser.execute(`setHud('${attacker}', '${attackerPoints}', '${defender}', '${defenderPoints}');`);
    }
});

mp.events.add("Client:Gangwar:updateHUD", (attacker, attackerPoints, defender, defenderPoints) => {
    if (gangwarHUDBrowser == null) return;
    gangwarHUDBrowser.execute(`updateHud('${attacker}', '${attackerPoints}', '${defender}', '${defenderPoints}')`);
});

mp.events.add("Client:Gangwar:updateFlags", (json) => {
    if (gangwarHUDBrowser == null) return;
    gangwarHUDBrowser.execute(`loadFlagsFromJson('${json}');`);
});

mp.events.add("Client:Gangwar:destroyHud", () => {
    if (gangwarHUDBrowser != null) {
        gangwarHUDBrowser.destroy();
        gangwarHUDBrowser = null;
    }
});
}