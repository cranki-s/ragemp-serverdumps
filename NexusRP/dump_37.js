{
﻿let report;
var reportactive = false;
mp.events.add('addreport', (id_, author_, quest_) => {
	if(report == null){ report = mp.browsers.new('http://package/systems/reportSystem/FRONT/ticket.html')
    report.name = 'nexusbrowser';
}
    report.execute(`addReport(${id_},'${author_}','${quest_}', false, '')`);
})
mp.events.add('setreport', (id, name) => {
	if(report == null){ report = mp.browsers.new('http://package/systems/reportSystem/FRONT/ticket.html')
    report.name = 'nexusbrowser';
}
    report.execute(`setStatus(${id}, '${name}')`);
})
mp.events.add('delreport', (id) => {
    if(report != null) report.execute(`deleteReport(${id})`);
})
mp.events.add('takereport', (id, r) => {
    NexusEvent.callRemote('takereport', id, r);
})
mp.events.add('sendreport', (id, a) => {
    NexusEvent.callRemote('sendreport', id, a);	
})
mp.events.add('exitreport', () => {
	global.menuClose();
	reportactive = false;
    mp.gui.cursor.visible = false;
	report.destroy();
	report = null
})


mp.keys.bind(0x75, false, function () { // F6 key report menu
    if (!loggedin || chatActive || editing || advertsactive || new Date().getTime() - global.lastCheck < 1000) return;
    if (localplayer.getVariable('IS_ADMIN') != true) return;
	if(report ==null){ report = mp.browsers.new('http://package/systems/reportSystem/FRONT/ticket.html')
    report.name = 'nexusbrowser';
}
    global.lastCheck = new Date().getTime();
    if (!global.menuOpened) {
        global.menuOpen();
        mp.gui.cursor.visible = true;
        if (!reportactive) report.execute(`app.playerName='${localplayer.name}'`);
        reportactive = true;
        report.execute('app.active=true;');
    } else {
        report.execute('app.active=false;');
        global.menuClose();
        reportactive = false;
        mp.gui.cursor.visible = false
    }
});
}