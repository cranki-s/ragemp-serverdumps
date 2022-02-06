{
var report = {
    state: false,
    browser: mp.browsers.new('package://cef/System/report/index.html'),
    execute: function( str ) {
        this.browser.execute(str);
    },
};
global.localplayer = mp.players.local;
mp.events.add("report.add", (json) => {
    report.execute(`REPORT.add(${json})`);
});

mp.events.add("report.update", (index, bool) => {
    report.execute(`REPORT.update(${index}, ${bool})`);
});

mp.events.add("report.remove.client", (index) => {
    report.execute(`REPORT.remove(${index})`);
});

mp.events.add("report.spec", () =>{
    mp.events.callRemote("report.server.spec");
});

mp.events.add("report.teleport", () =>{
    mp.events.callRemote("report.server.teleport");
});

mp.events.add("report.load", (json) => {
    report.execute(`REPORT.load(${json})`);
});

mp.events.add("report.send", (text) => {
    mp.events.callRemote("report.server.send", text);
});

mp.events.add("report.take", (index) => {
    mp.events.callRemote("report.server.take", index);
});

mp.events.add("report.remove", () => {
    mp.events.callRemote("report.server.close");
});

mp.events.add("report.chat.push", (json) => {
    report.execute(`REPORT.push(${json})`);
});

mp.events.add("report.close", () => {
    menuClose();
    report.state = false;
    report.execute(`REPORT.exit()`);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function() {
	if (report.state)
        mp.events.call("report.close");
});
mp.keys.bind(Keys.VK_F6, false, function() {
    if (localplayer.getVariable('ALVL') >= 1) {
	  if (report.state)
         mp.events.call("report.close");
      else {
        menuOpen();
        report.state = true;
        report.execute(`REPORT.open()`);
      }
    }
});
}