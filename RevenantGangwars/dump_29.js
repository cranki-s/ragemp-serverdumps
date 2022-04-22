{
let Browser = null;

mp.events.add("stats:Open", () => {
    Browser = mp.browsers.new("package://cef/statsUI/index.html");
    mp.events.callRemote('createStatsInfo');
});

mp.events.add("stats:update", (kills, deaths, KD, ID) => {
    Browser.execute(`updateInfo(${kills}, ${deaths}, ${KD}, ${ID})`);
});

mp.events.add("stats:Close", () => {
    Browser.destroy();
});
}