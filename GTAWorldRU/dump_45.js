{
﻿var BMWindow = null;
mp.events.add('showBM', () => {
	if (!mp.browsers.exists(BMWindow))
	{
		BMWindow = mp.browsers.new("package://gtalife/BusinessManager/BusinessManager.html");
		mp.events.callRemote('LoadBMData');
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('closeBM', () => {
    mp.events.callRemote('CloseBM');
});

mp.events.add('hideBM', () => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('addBizData', (BizArray) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`LoadArrayBizData(${BizArray});`);
	}
});

//#region Hire Employee
mp.events.add('hireEmployee', (fname, lname) => {
	mp.events.callRemote('HireEmployee', fname, lname);
});

mp.events.add('hireEmployeeResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`HireEmployeeResult(${success});`);
	}
});

mp.events.add('hireEmployeeAccepted', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`HireEmployeeAccepted(${success});`);
	}
});
//#endregion 

//#region Promote Employee
mp.events.add('promoteEmployee', (fname, lname) => {
	mp.events.callRemote('PromoteEmployee', fname, lname);
});

mp.events.add('promoteEmployeeResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`PromoteEmployeeResult(${success});`);
	}
});
//#endregion

//#region Demote Employee
mp.events.add('demoteEmployee', (fname, lname) => {
	mp.events.callRemote('DemoteEmployee', fname, lname);
});

mp.events.add('demoteEmployeeResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`DemoteEmployeeResult(${success});`);
	}
});
//#endregion

//#region Fire Employee
mp.events.add('fireEmployee', (fname, lname) => {
	mp.events.callRemote('FireEmployee', fname, lname);
});

mp.events.add('fireEmployeeResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`FireEmployeeResult(${success});`);
	}
});
//#endregion

//#region Remove Vehicle
mp.events.add('removeVehicle', (vehid) => {
	mp.events.callRemote('RemoveVehicle', vehid);
});

mp.events.add('removeVehicleResult', (success, type) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`RemoveVehicleResult(${success}, ${type});`);
	}
});
//#endregion

//#region Save Components price
mp.events.add('saveComponentPrice', (price) => {
	mp.events.callRemote('SaveComponentPrice', price);
});

mp.events.add('saveComponentPriceResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SaveComponentPriceResult(${success});`);
	}
});

mp.events.add('saveComponentPriceOff', () => {
	mp.events.callRemote('SaveComponentPriceOff');
});

mp.events.add('saveComponentPriceOffResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SaveComponentPriceOffResult(${success});`);
	}
});
//#endregion 

//#region Save Percent Share
mp.events.add('savePercentShare', (percent) => {
	mp.events.callRemote('SavePercentShare', percent);
});

mp.events.add('savePercentShareResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SavePercentShareResult(${success});`);
	}
});
//#endregion 

//#region Save Max Components
mp.events.add('saveMaxComponents', (maxinput) => {
	mp.events.callRemote('SaveMaxComponents', maxinput);
});

mp.events.add('saveMaxComponentsResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SaveMaxComponentsResult(${success});`);
	}
});
//#endregion 

//#region Save Withdraw Money
mp.events.add('saveWithdrawMoney', (money) => {
	mp.events.callRemote('SaveWithdrawMoney', money);
});

mp.events.add('saveWithdrawMoneyResult', (success) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SaveWithdrawMoneyResult(${success});`);
	}
});
//#endregion 

//#region Save Deposit Money
mp.events.add('saveDepositMoney', (money) => {
	mp.events.callRemote('SaveDepositMoney', money);
});

mp.events.add('saveDepositMoneyResult', (success, type) => {
	if (BMWindow != null && mp.browsers.exists(BMWindow))
	{
		BMWindow.execute(`SaveDepositMoneyResult(${success}, ${type});`);
	}
});
//#endregion 

}ȶ