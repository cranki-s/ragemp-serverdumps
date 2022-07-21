{
let slotsWindow = null;
let Cooldown = null;

mp.events.add("SLOTS:INIT", (money) =>
{
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.destroy();
        slotsWindow = null;
        mp.events.callRemote("SLOTS:MACHINE:RESET");
	    return;
    }
    slotsWindow = mp.browsers.new("package://gtalife/slots/index.html");
    slotsWindow.execute(`setBalanceData(${money})`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("SLOTS:COOLDOWN", (time) =>
{
    mp.gui.chat.push(`Please wait ~r~${time}~w~ seconds.`);
});

mp.keys.bind( 0x73, true, (player) => { // F4
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.destroy();
        slotsWindow = null;
        mp.events.callRemote("SLOTS:MACHINE:RESET");
    }
});
mp.keys.bind( 0x25, true, () => { // Left Arrow
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.execute(`setBetAmount(-50)`);
    }
});


mp.keys.bind( 0x27, true, () => { // Right Arrow
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.execute(`setBetAmount(+50)`);
    }
});

mp.keys.bind( 0x20, true, () => { // Space
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.execute(`spin()`);
    }
});

mp.events.add("SLOTS:SPIN", (betAmount) =>
{
    slotsWindow.execute(`init()`);
    mp.events.callRemote("SLOTS:SERVER:SPIN", betAmount);
});

mp.events.add("SLOTS:RESULT", (result) =>
{
    mp.events.callRemote("SLOTS:SERVER:PAY");
});


mp.events.add("SLOTS:SPIN:CALLBACK", (r1, r2, r3, balance, winnings, time) =>
{
    slotsWindow.execute(`spinSlots(${r1},${r2}, ${r3}, ${balance}, ${winnings})`);
    slotsWindow.execute(`cooldown = Date.parse(${time});`);
});

mp.events.add("SLOTS:SPIN:ERROR", (errorMsg) =>
{
    slotsWindow.execute(`setErrorMessage("${errorMsg}")`);
});

mp.events.add("SLOTS:DESTROY", () =>
{
    if(mp.browsers.exists(slotsWindow))
    {
        slotsWindow.destroy();
        slotsWindow = null;
        mp.gui.cursor.show(false, false);
    }
});

}