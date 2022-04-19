{
let ChangeMenu = null;
mp.events.add('openChangeMenu', (data) => {  
    if (global.menuCheck() || ChangeMenu != null) return;
    menuOpen();
	ChangeMenu = mp.browsers.new('package://cef/System/ChangeMenu/index.html');
    ChangeMenu.execute(`ChangeMenu.open(${data})`);
});
mp.events.add('TransferMenuItem', (index) => {
    if (ChangeMenu != null) {
        mp.events.callRemote("TransferMenuItem:Server", index)
    }
});
mp.events.add('CloseChangeMenu', () => {
    if (ChangeMenu != null) {
        ChangeMenu.destroy();
        ChangeMenu = null;
	    menuClose();
    }
});
}