{
let NewYearJob = null;
mp.events.add('openNewYearJob', () => {  
    if (global.menuCheck() || NewYearJob != null) return;
    menuOpen();
	NewYearJob = mp.browsers.new('package://cef/System/JobNewYear/index.html');
    NewYearJob.execute(`CHRISTMAS.active=true`);
});
mp.events.add('StartWorkYearJob', () => {
    if (NewYearJob != null) {
        mp.events.callRemote("StartWorkYearJob:Server");
		mp.events.call("CloseNewYearJob");
    }
});
mp.events.add('CloseNewYearJob', () => {
    if (NewYearJob != null) {
        NewYearJob.destroy();
        NewYearJob = null;
	    menuClose();
    }
});
}