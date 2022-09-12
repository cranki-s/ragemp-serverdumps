{
let phone = undefined;
let incomingCaller = null;
let ringtone = null;
mp.events.add({
    "initPhone": () => {
        if (phone === undefined) {
            phone = mp.browsers.new("package://files/telefon/index.html");
        }
    },
    "destroyPhone": () => {
        if (phone != undefined) {
            phone.destroy();
            phone = undefined
        }
    },
    "findScooter": () => {
        mp.events.callRemote("findScooter");
    },
    "StartScooterRide": () => {
        mp.events.callRemote("StartScooterRide");
    },
    "ScooterRideStarted": () => {
        if (phone) phone.execute(`app.scooterRideStarted();`)
    },
    "ScooterRideEnded": () => {
        if (phone) phone.execute(`app.endScooterRide();`)
    },

    "updateScooterFare": () => {
        if (phone) phone.execute(`app.updateScooterFare();`)
    },
    
    "setPhoneNumber": (number) => {
        phoneNumber = number;
        if (phone) phone.execute(`app.setPhoneNumber('${phoneNumber}');`)
    },
    "setPlayerPhoneBankInfo": (bankId, bankMoney) => {
        if (phone) phone.execute(`app.setBankInfo(${bankId}, '${bankMoney}');`)
    },
    "Update_Contacts": (contact) => {
        phone.execute("app.loadContacts(" + contact + ")");
    },
    "Get_PlayerContacts": () => {
        mp.events.callRemote('onClientRequestContactList')
    },
    "startCall": (number) => {
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
        let streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        streetName = streetName.replaceAll("'", "&apos;");
        mp.events.callRemote('dialingNumber', number, streetName)
    },
    "Send_location": (number, name) => {
        mp.events.callRemote("Send_Location_Server", number, name)
    },
    "request_sms": (number) => {
        mp.events.callRemote('Update_SMS', number)
    },
    "request_more_sms": (number, id) => {
        mp.events.callRemote('REQUEST_MORE_SMS', number, id)
    },
    "request_sms_list": () => {
        mp.events.callRemote('Show_SMS')
    },
    "Send_SMS": (number, texto, name) => {
        mp.events.callRemote('Send_SMS_SERVER', number, texto, name)
    },
    "Remove_Contact": (number) => {
        mp.events.callRemote('onClientRequestRemovePlayerContact', number)
    },
    "Update_SMS_Web": (sms, contactname) => {
        phone.execute(`app.Load_SMS('${sms}','${contactname}');`)
    },
    "Request_SMS_Web": (sms, contactname) => {
        phone.execute(`app.Load_More_SMS('${sms}','${contactname}');`)
    },
    "Update_SMS_List": (sms) => {
        phone.execute(`app.Load_SMSList('${sms}');`)
    },
    "addContact": (number, name) => {
        mp.events.callRemote('Add_Contact', number, name)
    },
    "incomingCall": (caller, number, contact) => {
        incomingCaller = caller;
        phone.execute(`app.callIncoming('${number}', '${contact}')`);
        lastposition = mp.players.local.position;
        ringtone = mp.game.audio.playSound3D(mp.players.local.getVariable('remoteID'), 'https://dl.prokerala.com/downloads/ringtones/files/mp3/7120-download-iphone-6-original-ringtone-42676.mp3', lastposition, 7);
        let ringToneCounter = 0;
        let phoneringTone = setInterval(function () {
            ringToneCounter++;
            mp.game.audio.setSoundPosition(mp.players.local.getVariable('remoteID'), mp.players.local.position);
            if (ringToneCounter > 120) {

                clearTimeout(phoneringTone)
                ringtone.destroy();

            }
        }, 250)

    },
    "showPhoneNoti": (type, msg, name) => {
        phone.execute(`app.activeNoti('${type}', '${msg}', '${name}')`);
    },
    "updateCallingName": (number, contact) => {
        phone.execute(`app.SetContactName('${number}', '${contact}')`)
    },
    "startApp": (name) => {
        phone.execute(`startApp('${name}')`)
    },
    "cancelCall": () => {
        if (incomingCaller != null) {
            incomingCaller.isInCallWith = null;
            incomingCaller = null
        }
        if (ringtone != null) ringtone.destroy();;
        mp.events.callRemote('cancelCallingNumber')
    },
    "denyCall": () => {
        phone.execute(`app.cancelCall()`);
        if (ringtone != null) ringtone.destroy();;
    },
    "acceptIncomingCall": (number) => {
        incomingCaller.isInCallWith = mp.players.local;
        mp.events.callRemote('acceptCall', number);
        if (ringtone != null) ringtone.destroy();

    },
    "callAcceptFor": (playerID) => {
        let player = mp.players.atRemoteId(playerID);
        if (ringtone != null) ringtone.destroy();;
    },
    "callDeniedFor": (playerID) => {
        let player = mp.players.atRemoteId(playerID);
        if (ringtone != null) ringtone.destroy();;
        if (player == mp.players.local) phone.execute(`app.cancelCall()`)
    },
    "callAccepted": (caller, number) => {
        phone.execute(`app.startCallTimer()`);
    },
    "callEnded": () => {
        phone.execute(`app.cancelCall()`);
        if (ringtone != null) ringtone.destroy();
        
    },
    "closeApp": () => {
        if (phone && phone != !1) {
            phone_app = !1;
            phone_app_loaded = !1;
            phone.execute(`closeApp();`);
            if (dialInterval != null) {
                clearInterval(dialInterval);
                dialInterval = null
            }
        }
    },
    "removeNumber": () => {
        phone.execute(`removeNumber();`)
    },
    "callNumber": (number) => {
        mp.events.callRemote('dialNumber', number)
    },
    "service_accept": (number) => {
        phone.execute(`app.startCallTimer()`);
    },
    "service_cancel": () => {
        if (incomingCaller != null) {
            incomingCaller.isInCallWith = null;
            incomingCaller = null
        }
        phone.execute(`app.cancelCall()`);
    },
    "UpdatePhoneBattery": (level) => {
        phone.execute(`app.updateBattery(${level})`);
    },
    "TimeOfDay": (time_text) => {
        DAYNIGHT_TEXT = time_text;
        if (phone != undefined) {
            phone.execute("app.updateTime('" + time_text + "');")
        }
    },
    "checkIfPhoneCanBeUsed": () => {
        if (global.cuffMe === true) return;
        
        let currentWeapon = mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), mp.players.local.handle);
        
        if (currentWeapon !== -1569615261) return;
        
        if (mp.players.local.getVariable("PerformingAction") !== "none") return;
        let bool = true;
        if (global.phone === true) {
            bool = false;
            phone.execute("app.showPhone(" + bool + ");")
        }
        if (phone != undefined) {
            
            phone.execute("app.showPhone("+ bool +");")
        }
    },
    "AnimationMobilePhone": (gesture) => {
        if (gesture == 'lookatmobile') {
            global.phone = true;
            mp.attachmentMngr.addLocal("Phone");
            if (mp.players.local.isInAnyVehicle(true) && mp.players.local.vehicle) {
                if (mp.players.local.vehicle.getClass() !== 8) {
                    mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'anim@cellphone@in_car@ds', 'cellphone_text_read_base')
                }
                else mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_text_read_base')
            }
            else if (mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_text_read_base')
        }
        if (gesture == 'putmobileaway') {
            global.phone = false;
            if (!mp.players.local.isInAnyVehicle(true) && mp.players.local.vehicle) {
                if (mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_text_out');
            }
            else if (mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'anim@cellphone@in_car@ps', 'cellphone_text_out');

            mp.attachmentMngr.removeLocal("Phone");
            setTimeout(() => { if (!global.phone && mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("StopPhoneAnimationFromClient") }, 2000)
        }
        if (gesture == 'putmobiletoear') {
            mp.attachmentMngr.addLocal("Phone");
            if (mp.players.local.isInAnyVehicle(true) && mp.players.local.vehicle) {
                if (mp.players.local.vehicle.getClass() === 8) {
                    mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_call_listen_base')
                }
                else mp.events.callRemote("PlayPhoneAnimationFromClient", 50, 'anim@cellphone@in_car@ps', 'cellphone_text_to_call')
            }
            else if (mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("PlayPhoneAnimationFromClient", 50, 'cellphone@', 'cellphone_text_to_call')
        }
        if (gesture == 'putmobilebacktohand') {
            mp.attachmentMngr.addLocal("Phone");
            if (mp.players.local.isInAnyVehicle(true) && mp.players.local.vehicle) {
                if (mp.players.local.vehicle.getClass() === 8) {
                    mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_call_to_text')
                }
                else mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'anim@cellphone@in_car@ps', 'cellphone_call_to_text')
            }
            else if (mp.players.local.getVariable("Injured") === 0) mp.events.callRemote("PlayPhoneAnimationFromClient", 50, 'cellphone@', 'cellphone_call_to_text')
        }
    },
    "orderTaxi": (taxi) => {
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
        let streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        streetName = streetName.replaceAll("'", "&apos;");
        mp.events.callRemote("orderTaxi", taxi, streetName)
    },
    "cancelTaxiOrider": () => {
        mp.events.callRemote("CancelTaxiOrider")
    },
    "orderAccepted": (driver, name) => {
        if (phone != undefined) {
            phone.execute("app.orderAccepted('" + driver + "', '" + name + "');")
        }
    },
    "orderStarted": (sql) => {
        if (phone != undefined) {
            phone.execute("app.orderStarted("+ sql +");")
        }
    },
    "updateFare": (fare) => {
        if (phone != undefined) {
            phone.execute("app.updateFare("+ fare +");")
        }
    },
    "orderEnded": (fare, id) => {
        if (phone != undefined) {
            phone.execute("app.orderEnded(" + fare + ", "+ id +");")
        }
    },
    "clientStopRide": (sql) => {
        mp.events.callRemote("ClientStopTaxiOrider", sql)
    },
    "submitTip": (sql, rating, tipamount) => {
        mp.events.callRemote("SubmitTip", sql, rating, tipamount)
    }

})
}