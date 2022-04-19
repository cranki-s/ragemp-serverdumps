{
var ATM = null;
mp.events.add('openATM', (data) => {  
    if (global.menuCheck() || ATM != null) return;
    menuOpen();
	ATM = mp.browsers.new('package://cef/System/bank/index.html');
    ATM.execute(`Bankomat.open(${data})`);
});
mp.events.add('ATMTransaction', (type, money, numberAcc) => {
    if (ATM != null) 
        mp.events.callRemote("ATMTransaction:Sever", type, money, numberAcc);
});
mp.events.add('SetMoneyATM', (money) => {
    if (ATM != null) 
        ATM.execute(`Bankomat.setMoney(${money})`);
});
mp.events.add('CloseATM', () => {
    if (ATM != null) {
        ATM.destroy();
        ATM = null;
	    menuClose();
    }
});
}