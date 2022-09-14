{
var settingsCEF = null;
var Settings = {
    "timestamps":false,
    "fontsize":100, 
    "chatsize":100, 
    "vim": 0, 
    "inv":true, 
    "staffTickets":false, 
    "inv_indexes":false, 
    "deathUI": true, 
    "desktop": true, 
    "darkmode":false,
    "ping":false,
};

var isAdmin = false;
var HotkeySettings = {
    "actionKey":89, //Y
    "lockKey":76, //L
    "garageKey":75, //K
    "inventoryKey":73, //I
    "sirenKey":69, //E
    "sirenELSUpKey":69, //E
    "sirenELSDownKey":81, //Q
    "leftIndicatorKey":37, //Left Arrow
    "rightIndicatorKey":39, //Right Arrow
    "headlightsKey":72, //H
    "playerlistKey":79, //O
};

/*
let keycode = String.fromCharCode(90)
let customKey = "Y"
let char = customKey.toUpperCase().charCodeAt(0);

// Log to console
console.log(keycode);
console.log(char)

*/

LoadSettings(true);

mp.events.add('showSettings', (admin, imageLink, firstname, lastname) => {
    if (settingsCEF == null && !mp.browsers.exists(settingsCEF)){
        settingsCEF = mp.browsers.new("package://gtalife/SettingsMenu/index.html");
        isAdmin = admin;
        LoadSettings();
        settingsCEF.execute(`Initialize(${JSON.stringify(Settings)}, ${JSON.stringify(HotkeySettings)}, ${admin}, "${imageLink}", "${firstname}", "${lastname}");`);
        mp.events.call('toggleHUDForPlayer', false);
        mp.gui.cursor.show(true, true);
        mp.events.call('setCefActive', true);
    }
});

mp.events.add('Settings::hideSettings', () => {
	CloseSettingsMenu();
});

mp.events.add('Settings::saveSettings', (saveSettings, imageLink) => {
	if (settingsCEF != null && mp.browsers.exists(settingsCEF))
	{
        LoadSettings();
        var strSave = JSON.stringify(saveSettings);
	    var save = JSON.parse(JSON.parse(strSave));

        mp.events.callRemote('Settings::setTemporaryImage', imageLink);

        //mp.gui.chat.push("Save: "+saveSettings);
        if(Settings.timestamps != save.timestamps){ //Timestamp has been changed
            mp.gui.chat.push(`CHAT TOGGLE: Timestamps ${save.timestamps ? 'ON' : 'OFF'}`);

            mp.storage.data.timestamps = save.timestamps;
            mp.storage.flush();
        }
        if(Settings.fontsize != save.fontsize){ //fontsize has been changed
            mp.gui.chat.push("CHAT TOGGLE: Size " + save.fontsize);

            mp.storage.data['text_size'] = save.fontsize;
            mp.storage.flush();
        }
        //mp.gui.chat.push(`Chatsize: ${Settings.chatsize} - ${save.chatsize}`);
        if(Settings.chatsize != save.chatsize){ //chatsize has been changed
            var value = save.chatsize-70;
            mp.gui.chat.push("CHAT TOGGLE: Height " + value);

            mp.storage.data['chat_height'] = value;
            mp.storage.flush();
        }
        if(Settings.vim != save.vim){ //vim has been changed
            mp.gui.chat.push(`CHAT TOGGLE: VIM ${save.vim}`);

            mp.storage.data.vim = save.vim;
            mp.storage.flush();
        }
        if(Settings.inv != save.inv){ //inventory has been changed
            mp.storage.data.inv = save.inv;
            mp.storage.flush();
            mp.events.callRemote('Settings::setInventoryUsage', save.inv, false);
        }
        if(Settings.inv_indexes != save.inv_indexes){ //inventory has been changed
            mp.storage.data.inv_indexes = save.inv_indexes;
            mp.storage.flush();
            mp.events.callRemote('Settings::setInventoryIndexUsage', save.inv_indexes, false);
        }
        if(Settings.staffTickets != save.staffTickets){ //inventory has been changed
            mp.storage.data.staffTickets = save.staffTickets;
            mp.storage.flush();
            mp.events.callRemote('Settings::setTicketSystem', save.staffTickets, false);
            mp.events.call('Ticketsystem::Setting', save.staffTickets);
        }
        if(Settings.deathUI != save.deathUI){ //death UI has been changed
            mp.storage.data.deathUI = save.deathUI;
            mp.storage.flush();
            mp.events.callRemote('Settings::setDeathUI', save.deathUI, false);
        }
        if(Settings.desktop != save.desktop){ 
            mp.storage.data.desktop = save.desktop;
            mp.storage.flush();
            mp.events.callRemote('Settings::setNotifications', save.desktop, false);
        }
        if(Settings.darkmode != save.darkmode){
            mp.storage.data.darkmode = save.darkmode;
            mp.storage.flush();
            if(isAdmin)
                mp.events.call('setDarkMode', save.darkmode);
        }
        if(Settings.ping != save.ping){
            mp.storage.data.ping = save.ping;
            mp.storage.flush();
            mp.events.callRemote('Settings::setPingUsage', save.ping, false);
        }
        Settings = JSON.parse(JSON.parse(strSave));
		CloseSettingsMenu();
	}
});

function CloseSettingsMenu(){
    if (settingsCEF != null && mp.browsers.exists(settingsCEF))
	{
		settingsCEF.destroy();
		mp.gui.cursor.show(false, false);
        mp.events.call('toggleHUDForPlayer', true);
        mp.events.call('setCefActive', false);
        settingsCEF = null;
	}
}

function LoadSettings(onConnect = false){
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.timestamps !== 'undefined')
    {
        Settings.timestamps = mp.storage.data.timestamps;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.text_size !== 'undefined')
    {
        Settings.fontsize = mp.storage.data.text_size;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.chat_height !== 'undefined')
    {
        Settings.chatsize = mp.storage.data.chat_height+70;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.vim !== 'undefined')
    {
        Settings.vim = mp.storage.data.vim;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.inv !== 'undefined')
    {
        Settings.inv = mp.storage.data.inv;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.inv_indexes !== 'undefined')
    {
        Settings.inv_indexes = mp.storage.data.inv_indexes;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.staffTickets !== 'undefined')
    {
        Settings.staffTickets = mp.storage.data.staffTickets;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.deathUI !== 'undefined')
    {
        Settings.deathUI = mp.storage.data.deathUI;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.desktop !== 'undefined')
    {
        Settings.desktop = mp.storage.data.desktop;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.darkmode !== 'undefined')
    {
        Settings.darkmode = mp.storage.data.darkmode;
    }
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.ping !== 'undefined')
    {
        Settings.ping = mp.storage.data.ping;
    }

    if(onConnect) {
        mp.events.callRemote('Settings::setInventoryUsage', Settings.inv, onConnect);
        mp.events.callRemote('Settings::setInventoryIndexUsage', Settings.inv_indexes, onConnect);
        mp.events.callRemote('Settings::setTicketSystem', Settings.staffTickets, onConnect);
        mp.events.callRemote('Settings::setDeathUI', Settings.deathUI, onConnect);
        mp.events.callRemote('Settings::setNotifications', Settings.desktop, onConnect);
        mp.events.callRemote('Settings::setPingUsage', Settings.ping, onConnect);

        if(isAdmin)
            mp.events.call('setDarkMode', Settings.darkmode);
    }
            

    //mp.gui.chat.push(`TEST LOAD DATA: ${JSON.stringify(Settings)}`);
    //mp.gui.chat.push("Load: "+ JSON.stringify(Settings));
}
}