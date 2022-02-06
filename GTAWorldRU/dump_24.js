{
﻿const months = ["ЯНВ", "ФЕВ", "МАРТ", "АПР", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГ", "СЕНТ", "ОКТ", "НОЯ", "ДЕК"];
const lineSeparator = "\n";
let firstPush = true;
let draftStatus = false;

let chatFonts = {
    browser: null,

    fontSheets: [],
    fonts: []
};

// START CHAT LOG
mp.events.add('initializeStorage', (version) => {
    SetVersion(version);
});

function SetVersion(version) {
    // The tag is used by the parser to only parse chat logs from GTA World in case other
    // servers copy the script and try using the original parser without updating the code
    mp.storage.data['server_version'] = `GTA World${version == "" ? "" : " " + version}`;
    mp.storage.flush();
}

mp.events.add('pushMessageToChatLog', (text, time, date) => {
    if (firstPush) {
        firstPush = false;

        // Fallback in case the first chat message is pushed
        // before the server version is initialized
        if (!mp.storage.data['server_version'])
            SetVersion("");

        mp.storage.data['chat_log'] = "[ДАТА: " + date + " | ВРЕМЯ: " + time + "]" + lineSeparator;
        mp.storage.flush();
    }

	//text = text.replace(/[^\x20-\x7E]/g, "-");
    text = "[" + time + "] " + text + lineSeparator;

    mp.storage.data['chat_log'] += text;
    mp.storage.flush();
    mp.console.logInfo(text, true, true)
});
// END CHAT LOG

// START CHAT OTHER
mp.events.add('customChatFeedback', (text) => {
    mp.gui.chat.push(text);
});

mp.events.add('chatErrorSound', () => {
    mp.game.audio.playSoundFrontend(-1, "CONFIRM_BEEP", "HUD_MINI_GAME_SOUNDSET", true);
});

mp.events.add('toggleEnabledExtraChatFeatures', () => {
    let timeStampsOn = mp.storage.data.timestamps;
    let chatFont = mp.storage.data['chat_font'];
    let chatHeight = mp.storage.data['chat_height'];
    let textSize = mp.storage.data['text_size'];

    if (timeStampsOn)
        mp.gui.chat.push("CHAT STARTUP TOGGLE: Timestamps ON");

    if (chatFont)
        mp.gui.chat.push("CHAT STARTUP TOGGLE: Font " + chatFont);

    if (chatHeight)
        mp.gui.chat.push("CHAT STARTUP TOGGLE: Height " + chatHeight);
    
    if (textSize)
        mp.gui.chat.push("CHAT STARTUP TOGGLE: Size " + textSize);

    //Initialize Draft
    if( typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.draftstatus !== 'undefined' && mp.storage.data.draftstatus )
    {
        draftStatus = mp.storage.data.draftstatus;
        if(draftStatus) mp.gui.chat.push("CHAT STARTUP TOGGLE: Draft true");
        else mp.gui.chat.push("CHAT STARTUP TOGGLE: Draft false");
    }
});
// END CHAT OTHER

// START CHAT FONT
mp.events.add('showFontPicker', () => {
    mp.events.call('toggleHUDForPlayer', false);

    chatFonts.browser = mp.browsers.new("package://gtalife/FontPicker/index.html");
    chatFonts.browser.execute(`Initialize(${JSON.stringify(chatFonts.fontSheets)}, ${JSON.stringify(chatFonts.fonts)})`)

    mp.gui.cursor.show(true, true);
    mp.events.call('setCefActive', true);
});

mp.events.add('hideFontPicker', (selected, fontName) => {
    if (selected) SetChatFont(fontName);

    chatFonts.browser.destroy();
    chatFonts.browser = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);
    mp.gui.cursor.show(false, false);
});

function SetChatFont(fontName) {
    mp.gui.chat.push("CHAT TOGGLE: Font " + fontName);

    mp.storage.data['chat_font'] = fontName;
    mp.storage.flush();
}

mp.events.add('changeChatFont', (fontName) => {
    SetChatFont(fontName)
});

function DecodeArray(arr) {
    let tempArr = [];
    for (let i = 0; i < arr.length; i++)
        tempArr.push(decodeURIComponent(arr[i]));

    return tempArr;
}

mp.events.add('setFontList', (fontSheets, fonts) => {
    chatFonts.fontSheets = DecodeArray(JSON.parse(fontSheets));
    chatFonts.fonts = DecodeArray(JSON.parse(fonts));
});
// END CHAT FONT

// START CHAT SETTINGS
mp.events.add('toggleTimestamps', () => {
    let currentStatus = mp.storage.data.timestamps;
    mp.gui.chat.push(`CHAT TOGGLE: Timestamps ${currentStatus ? 'OFF' : 'ON'}`);

    mp.storage.data.timestamps = !currentStatus;
    mp.storage.flush();
});

mp.events.add('setChatSize', (chatHeight) => {
    mp.gui.chat.push("CHAT TOGGLE: Height " + chatHeight);

    mp.storage.data['chat_height'] = chatHeight;
    mp.storage.flush();
});

mp.events.add('setTextSize', (textSize) => {
    mp.gui.chat.push("CHAT TOGGLE: Size " + textSize);

    mp.storage.data['text_size'] = textSize;
    mp.storage.flush();
});
// END CHAT SETTINGS

// START CHAT STATE
let chatEnabled = false;
mp.events.add('changeChatState', (state) => {
    if (state === undefined || state == null)
        chatEnabled = false;

    chatEnabled = state;
    mp.events.callRemote("TriggerIsTypingProcess", state); 
});

mp.events.add('render', () => {
    if (chatEnabled === undefined || chatEnabled == null)
        return;

    if (chatEnabled)
        mp.game.controls.disableAllControlActions(0);
});

mp.events.add('setChatDraftEnableStatus', () => {
    if(!draftStatus) mp.gui.chat.push("CHAT TOGGLE: Draft true");
    else mp.gui.chat.push("CHAT TOGGLE: Draft false");

    
    mp.storage.data.draftstatus = !draftStatus;
    mp.storage.flush();
    draftStatus = mp.storage.data.draftstatus ;
})
// END CHAT STATE

}