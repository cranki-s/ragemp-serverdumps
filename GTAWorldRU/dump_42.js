{
﻿
mp.keys.bind( 0x71, true, enableChatFunction );

function enableChatFunction() {
	if (logged == 0)
		return;

	mp.gui.chat.activate(true);
	mp.events.call('setCefActive', false);
}

mp.keys.bind( 0x72, true, (player) => { // F3
	mp.gui.cursor.visible = !mp.gui.cursor.visible;
	if(mp.gui.cursor.visible) {
		// BOOL _SET_CURSOR_LOCATION(float x, float y);
		mp.game.invoke('0xFC695459D4D0E219', 0.5, 0.5);
	}
});

function enableCursorFunction() {
	if (logged == 0)
		return;
    mp.gui.cursor.show(true, true);
}
//CEF//
var phoneCEF = null;
var IsPhoneUnlocked = false;

mp.events.add('setPhoneLockStatus', (unlocked) => {
	IsPhoneUnlocked = unlocked;
	mp.events.callRemote('SetPhoneLockStatus', unlocked);
});

mp.events.add('callServerCEF', (app) => {
	mp.events.callRemote('openPhoneCEF', app);
});

mp.events.add('showPhone', (on, zoom, selfnumb, weather, temperature, code) => {
	if (!mp.browsers.exists(phoneCEF))
	{
		phoneCEF = mp.browsers.new("package://gtalife/Phone/Phone.html");
		if(on == true){
			mp.events.callRemote('LoadPhoneData');
			phoneCEF.execute(`SetPinCode("${code}");`);
			phoneCEF.execute(`LoadPhone(true, ${zoom}, ${IsPhoneUnlocked});`);
			phoneCEF.execute(`LoadWeather("${weather}", ${temperature});`);
			phoneCEF.execute(`SetSelfNumber("${selfnumb}");`);
			
		}else{
			mp.events.callRemote('LoadPhoneData');
			phoneCEF.execute(`SetPinCode("${code}");`);
			phoneCEF.execute(`LoadPhone(true, ${zoom}, ${IsPhoneUnlocked});`);
			phoneCEF.execute(`LoadWeather("${weather}", ${temperature});`);
			phoneCEF.execute(`SetSelfNumber("${selfnumb}");`);
			
		}
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('showPhoneEx', (name, zoom, selfnumb, weather, temperature, code) => {
	if (!mp.browsers.exists(phoneCEF))
	{
		phoneCEF = mp.browsers.new("package://gtalife/Phone/Phone.html");

		mp.events.callRemote('LoadPhoneData');
		phoneCEF.execute(`SetPinCode("${code}");`);
		phoneCEF.execute(`LoadPhone(true, ${zoom}, ${IsPhoneUnlocked});`);
		phoneCEF.execute(`LoadWeather("${weather}", ${temperature});`);
		phoneCEF.execute(`IncomingCall("${name}");`);
		phoneCEF.execute(`SetSelfNumber("${selfnumb}");`);
		
	}
});

mp.events.add('showPhoneEx2', (number, zoom, selfnumb, weather, temperature, code) => {
	if (!mp.browsers.exists(phoneCEF))
	{
		phoneCEF = mp.browsers.new("package://gtalife/Phone/Phone.html");

		mp.events.callRemote('LoadPhoneData');
		phoneCEF.execute(`SetPinCode("${code}");`);
		phoneCEF.execute(`LoadPhone(true, ${zoom}, ${IsPhoneUnlocked});`);
		phoneCEF.execute(`LoadWeather("${weather}", ${temperature});`);
		phoneCEF.execute(`CallNumber("${number}");`);
		phoneCEF.execute(`SetSelfNumber("${selfnumb}");`);
		
	}
});

mp.events.add('hidePhone', () => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.destroy();
	}
	mp.gui.cursor.show(false, false);
	mp.gui.cursor.visible = false;
	mp.events.call('canUsePhoneCommand', true)
	//mp.events.call("revokeChatBlock")
});

mp.events.add('hidePhoneEx', () => {
	mp.events.callRemote('HidePhoneEx');
});

mp.events.add('setSelfNumber', (number) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`SetSelfNumber("${number}");`);
	}
});

mp.events.add('isPhoneOpen', () => {
	var active = false;
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		active = true;
	}
    mp.events.callRemote('ReturnIsPhoneOpen', active);
});

mp.events.add('triggerPhoneCursor', () => {
	mp.gui.cursor.show(true, true);
});

mp.events.add('loadContacts', () => {
	mp.events.callRemote('LoadContacts');
});

mp.events.add('loadPhoneData', () => {
	mp.events.callRemote('LoadPhoneData');
});

mp.events.add('loadSMSes', () => {
	mp.events.callRemote('LoadSMSes');
});

mp.events.add('setNewPincode', (code) => {
	mp.events.callRemote('SetNewPincode', code);
});

/*mp.events.add('loadSMSMessages', (contact) => {
	mp.events.callRemote('LoadSMSMessages', contact);

});

mp.events.add('addSMSMessages', (Contact,MsgsArray) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadSMSMessagesData("${Contact}",${MsgsArray});`);
	}
});*/

mp.events.add('callTaxi', () => {
	mp.events.callRemote('CallTaxi');
});

mp.events.add('openAdvertisements', () => {
	mp.events.call('hidePhoneEx');
	mp.events.callRemote('OpenAdvertisements');
});

mp.events.add('loadCalls', () => {
	mp.events.callRemote('LoadCalls');
});

mp.events.add('removeChat', (number) => {
	mp.events.callRemote('RemoveChat', number);
});

mp.events.add('addContacts', (contactsArray) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadArrayContacts(${contactsArray});`);
	}
});

mp.events.add('addSMS', (SMSArray, piece, maxpiece) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadArraySMSPieces(${SMSArray}, ${piece} , ${maxpiece});`);
	}
});

mp.events.add('addCalls', (callsArray) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadArrayCalls(${callsArray});`);
	}
});

mp.events.add('addGroup', (GroupArray, piece, maxpiece, load) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadArrayGroupPieces(${GroupArray}, ${piece} , ${maxpiece}, ${load});`);
	}
});

mp.events.add('addGroupMsg', (GroupMsgArray, piece, maxpiece) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`LoadArrayGroupMsgPieces(${GroupMsgArray}, ${piece} , ${maxpiece});`);
	}
});

mp.events.add('sendSMS', (contact, smstext) => {
	mp.events.callRemote('SendSMS', contact, smstext);
});

mp.events.add('setGroupRead', (group) => {
	mp.events.callRemote('SetGroupRead', group);
});

mp.events.add('sendGroupMessage', (group, message, self) => {
	mp.events.callRemote('SendGroupMessage', group, message, self); 
});

mp.events.add('updateGroup', (group, name, deletevar) => {
	mp.events.callRemote('UpdateGroup', group, name, deletevar); 
});

mp.events.add('addGroupMember', (group, nameOrNumber) => {
	mp.events.callRemote('AddGroupMember', group, nameOrNumber);
});

mp.events.add('removeGroupMember', (group, number, left) => {
	mp.events.callRemote('RemoveGroupMember', group, number, left);
});

mp.events.add('updateGroupMember', (group, number, position) => {
	mp.events.callRemote('UpdateGroupMember', group, number, position);
});

mp.events.add('createGroup', (groupname) => {
	mp.events.callRemote('CreateGroup', groupname);
});

mp.events.add('createGroupResult', (success, group) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CreateNewGroupResult(${success}, ${group});`);
	}
});

mp.events.add('callNumber', (number) => {
	mp.events.callRemote('CallNumber', number);
});

mp.events.add('setPhoneStatus', (toggle) => {
	mp.events.callRemote('SetPhoneStatus', toggle);
});

mp.events.add('removeContact', (number) => {
	mp.events.callRemote('RemoveContact', number);
});

mp.events.add('addContact', (contactName, contactNumber) => {
	mp.events.callRemote('AddContact', contactName, contactNumber);
});


mp.events.add('setSMSReadContact', (number) => {
	mp.events.callRemote('SetSMSReadContact', number);
});

mp.events.add('triggerChatBlock', () => {
	mp.gui.chat.activate(false);
	mp.events.call('setCefActive', true);
	mp.gui.cursor.show(true, true);
	PhoneMoveDisabled = true;
});

mp.events.add('revokeChatBlock', () => {
	mp.gui.chat.activate(true);
	mp.events.call('setCefActive', false);
	PhoneMoveDisabled = false;
});

var PhoneMoveDisabled = false;
mp.events.add('render', () => { 
try{
	if(!PhoneMoveDisabled || PhoneMoveDisabled === undefined || PhoneMoveDisabled == null) return;
   	
   	if(PhoneMoveDisabled) {
			mp.game.controls.disableAllControlActions(0);
			mp.gui.cursor.show(true, true);
		}
	} catch{

	}
});

mp.events.add('callConnected', () => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CallConnected();`);
	}
});

mp.events.add('callErrorDisconnect', () => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CallErrorDisconnect();`);
	}
});

mp.events.add('callBusyDisconnect', () => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CallBusyDisconnect();`);
	}
});

mp.events.add('callDisconnect', () => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CallDisconnect();`);
	}
});

mp.events.add('incomingCall', (name) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`IncomingCall("${name}");`);
	}else{
		mp.events.callRemote('ShowPhoneEx', name);
		mp.gui.chat.push("Используйте !{#FFFF00}/phonecursor!{#FFFFFF} (/pc), чтобы активировать курсор для взаимодействия с телефоном." );
	}
});

mp.events.add('outgoingCall', (name) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`CallNumber("${name}");`);
	}
});

mp.events.add('pickupButtonClick', () => {
	mp.events.callRemote('PickupButtonClick');
});

mp.events.add('hangupButtonClick', () => {
	mp.events.callRemote('HangupButtonClick');
});

mp.events.add('canUsePhoneCommand', (toggle) => {
	mp.events.callRemote('CanUsePhoneCommand', toggle);
});

mp.events.add('sendF2F3Message', () => {
	//mp.gui.chat.push("Use !{#FFFF00}F2!{#FFFFFF} to re-enable the chat and use !{#FFFF00}F3!{#FFFFFF} to activate the cursor." );
});

mp.events.add('sendSMSTimeOut', () => {
	mp.gui.chat.push("Вы должны подождать !{#FF0000}5 секунд!{#FFFFFF} прежде чем послать следующее сообщение!" );
});

mp.events.add('sendSMSLength', () => {
	mp.gui.chat.push("Слишком много !{#FF0000}смайликов!{#FFFFFF} в вашем сообщении!" );
});


mp.events.add('updatePhoneSize', (size) => {
	if (phoneCEF != null && mp.browsers.exists(phoneCEF))
	{
		phoneCEF.execute(`AdjustPhoneSize(${size});`);
	}
});

mp.events.add('sendDEBUGPhone', (text) => {
	mp.gui.chat.push("DEBUG: "+ text);
});

}ᯁ唂Ⱦ