{
let NewYearMenu = null;
mp.events.add('openNewYearMenu', (data) => {  
    if (global.menuCheck() || NewYearMenu != null) return;
    menuOpen();
	NewYearMenu = mp.browsers.new('package://cef/System/NewYear/index.html');
    NewYearMenu.execute(`NEWYEAR.open(${data})`);
});
mp.events.add('TransferSweetsOnItem', (nameItem) => {
    if (NewYearMenu != null) {
        mp.events.callRemote("TransferSweetsOnItem:Server", nameItem)
    }
});
mp.events.add('CloseNewYearMenu', () => {
    if (NewYearMenu != null) {
        NewYearMenu.destroy();
        NewYearMenu = null;
	    menuClose();
    }
});
}