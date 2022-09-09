{
global.Deposit = mp.browsers.new('package://browser/modules/Deposit/deposit.html');
mp.events.add("OpenDeposit", (name) => {
	if (menuCheck()) return;
	menuOpen();
	Deposit.execute('Deposit.active=1');
});
mp.events.add('CloseDeposit', () => {	
	menuClose();
    mp.gui.cursor.visible = false;
    Deposit.execute('Deposit.active=0');
});
mp.events.add("StartDepClient", (money, fullmoney, payday, hours) => {
	mp.events.callRemote("StartDepServ", money, fullmoney, payday, hours);
});
}