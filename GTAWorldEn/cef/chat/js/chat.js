let chat = {
    size: 0,
    container: null,
    counter: null,
    placeHold: null,
    input: null,
    enabled: false,
    active: true,
    timer: null,
    messages: [],
    stamps: [],
    draft: "",
    draftEnabled: false,
    previous: [],
    typedBeforePrevious: "",
    previousIndex: -1,
    canSendMessage: true,
    timestamps: false,
    cooldown: 0.5,
    hide_chat: 1500000, // in milliseconds
    openChatEvent: 84,
    fadeOutDuration: 250,

    maxChatMessages: 100,
    maxPreviousMessages: 10,
    maxCharactersPerMessage: 250,
	maxCommandHints: 5,

    currentFont: 0,
    fontSheets: [   '<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">', // Raleway Regular 400
                    '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">', // Roboto Light 300
                    '<link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">', // Ubuntu Regular 400
                    '<link href="https://fonts.googleapis.com/css2?family=Mukta&display=swap" rel="stylesheet">', // Mukta Regular 400
                    '<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">', // Open Sans Regular 400
                    '<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap" rel="stylesheet">', // Nunito Sans Regular 400
                    '<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">' // Inter Regular 400
                ],
    fonts: [    'Arial, Helvetica, sans-serif',
                'Georgia, serif',
                '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                '"Times New Roman", Times, serif',
                '"Arial Black", Gadget, sans-serif',
                '"Comic Sans MS", cursive, sans-serif',
                'Impact, Charcoal, sans-serif',
                '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
                'Tahoma, Geneva, sans-serif',
                '"Trebuchet MS", Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif',
                '"Courier New", Courier, monospace',
                '"Lucida Console", Monaco, monospace',
                'Calibri, sans-serif',
                '"Raleway", sans-serif',
                '"Roboto", sans-serif',
                '"Ubuntu", sans-serif',
                '"Mukta", sans-serif',
                '"Open Sans", sans-serif',
                '"Nunito Sans", sans-serif',
                '"Inter", sans-serif'
            ]
};

function enableChatInput(enable) {
    if (chat.active == false && enable == true) {
        return;
    }

    if (enable != (chat.input != null)) {
        chat.previousIndex = -1;
        mp.invoke("focus", enable);

        if (enable) {
            $("#chat").css("opacity", 1);
            chat.counter = $("#chat").append(`<div><ul id="counter">0/${chat.maxCharactersPerMessage}</ul></div>`).children(":last");

            chat.input = $("#chat").append(`<div><input type="text" id="chat_msg" spellcheck="true" maxlength="${chat.maxCharactersPerMessage + 1}"</input></div>`).children(":last");
            chat.placeHold = $("#chat").append(`<div><p id="chat_msg"></p></div>`).children(":last");
	    chat.input.children("input").on('input', UpdateCharacterCounter);
            chat.input.children("input").focus();

            if(chat.draft != "" && chat.draftEnabled)
            {
                chat.input.children("input").val(chat.draft);
                UpdateCharacterCounter();
            }
            mp.trigger("changeChatState", true);
        }
        else {
            chat.counter.fadeOut(chat.fadeOutDuration, function () {

                chat.counter.remove();
                chat.counter = null;
            });

	chat.placeHold.fadeOut(chat.fadeOutDuration, function () {
                chat.placeHold.remove();
                chat.placeHold = null;
            });

            chat.input.fadeOut(chat.fadeOutDuration, function () {

                chat.input.children("input").off('input');
                chat.input.remove();
                chat.input = null;
                mp.trigger("changeChatState", false);
            });
        }
    }
}

let isStaff = false;
let autoGrammar = false;

function setIsStaff(value){
    isStaff = value
}

function setAutoGrammar(value){
    autoGrammar = value
}


var chatAPI = {
    push: (text) => {
        let rawText = text.replace(/<[^>]*>/g, '');
        if (rawText.toLowerCase().startsWith("chat ")) {
            ToggleExtra(rawText.substr(5));
            return;
        }
        rawText = HookIntoInteractionMenu(rawText);
        if(rawText.length == 0) return;

        if (++chat.size >= chat.maxChatMessages) {
            chat.messages.shift();
            chat.stamps.shift();
            chat.container.children(":first").remove();
        }

        let timestamp = GetCurrentTimestamp();
        chat.messages.push(text);
        chat.stamps.push(timestamp);

        let newText = "";
        if (chat.timestamps) {
            newText = AddTimestamp(text, timestamp);
        }
 
        let scrollPerc = GetScrollPercentage();  
        chat.container.append("<li>" + (chat.timestamps ? newText : text) + "</li>");

        if (chat.input == null || (chat.input != null && (isNaN(scrollPerc) || scrollPerc > 95 ))) {
            ScrollToEnd();
        }

        PushToChatLog(text.replace(/<[^>]*>/g, ""));
    },

    clear: () => {
        chat.container.html("");
    },

    activate: (toggle) => {

        if (toggle == false && (chat.input != null)) {
            enableChatInput(false);
        }

        chat.active = toggle;
    },

    show: (toggle) => {

        if (toggle) {
            $("#chat").show();
        } else {
            $("#chat").hide();
        }

        chat.active = toggle;
    }
};

let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 

for(let fn in api)
{
    mp.events.add(fn, api[fn]);
}

function hide() {
    return;

    chat.timer = setTimeout(function () {

        $("#chat").css("opacity", 0.5);
        $("#chat_messages").css("overflow", 'hidden');
    }, chat.hide_chat);
}

function show() {

    clearTimeout(chat.timer);
    $("#chat").css("opacity", 1);
    $("#chat_messages").css("overflow", 'overlay');
}

function HookIntoInteractionMenu(rawText) {
    let text = rawText.toLowerCase();

    if (text.startsWith('press') && text.includes('to enter')) {
        mp.trigger('InteractionMenuClient::PropertyReady');
    } else if (text.startsWith('fleeca bank: use') && text.includes('to manage your money')) {
        mp.trigger('InteractionMenuClient::BankReady');
    } else if (text.startsWith('this') && text.includes('to start working here')) {
        mp.trigger('InteractionMenuClient::BizJoinReady');
    }else if (text.startsWith('interactionmenu::')) {
        if(text.includes('saferange'))
            mp.trigger('InteractionMenuClient::SafeReady');
        if(text.includes('containerrange'))
            mp.trigger('InteractionMenuClient::ContainerReady');

        text = "";
    }

    return text;
}

function ToggleExtra(rawText) {
    let text = rawText.toLowerCase();

    let isStartingUp = false
    if (text.startsWith("startup ")) {
        isStartingUp = true;
        text = text.substr(8);
    }

    if (text.startsWith("toggle: ")) {
        if (text.includes("timestamp")) {

            if (text.includes("on")) {
                chat.timestamps = true;
            } else {
                chat.timestamps = false;
            }

            if (chat.messages.length > 0) {
                chat.container.html("");
                
				for (let i = 0; i < chat.messages.length; i++) {
					chat.container.append("<li>" + (chat.timestamps ? AddTimestamp(chat.messages[i], chat.stamps[i]) : chat.messages[i]) + "</li>");
                }

                ScrollToEnd();
			}
        }else if (text.includes("draft")) {

            if (text.includes("true")) {
                if (!isStartingUp) enableDraft();
                else enableDraftEx();
            } else {
                if (!isStartingUp) disableDraft();
                else disableDraftEx();
            }
        } else if (text.includes("font")) {
            let fontFound = false;
            let fontChoice = text.substr(13).replace(/&quot;/g, '"');

            if (fontChoice == "0" || fontChoice == "default") {
                fontFound = true;
                chat.currentFont = 0;
            }
            else {
                for (let i = 0; i < chat.fonts.length; i++) {
                    if (chat.fonts[i].toLowerCase().includes(fontChoice) || fontChoice == chat.fonts[i]) {
                        fontFound = true;
                        chat.currentFont = i;
                        break;
                    }
                }
            }

            if (fontFound) {
                $("#chat_messages").css('font-family', chat.fonts[chat.currentFont]);
                if (!isStartingUp) {
                    mp.trigger('customChatFeedback', `!{DodgerBlue}INFO: !{White}Chat font changed to !{LimeGreen}${chat.fonts[chat.currentFont]}`);
                }
            } else {
                if (!isStartingUp) {
                    mp.trigger('customChatFeedback', "!{Red}ERROR: !{White}Invalid font.");
                }
                // mp.trigger('changeChatFont', 0);
            }
        } else if (text.includes("height")) {

            let chatHeight = parseInt(text.substr(15), 10);
            if (!isStartingUp) {
                mp.trigger('customChatFeedback', `!{DodgerBlue}INFO: !{White}Chat height changed to !{LimeGreen}${chatHeight + 70}%`);
            }

            $("#chat_messages").css("height", (chatHeight - 2.25) + "%");
            ScrollToEnd();
        } else if (text.includes("size")) {

            let textSize = parseInt(text.substr(13), 10);
            let floatSize = textSize / 100 + 0.2;
            
            if (!isStartingUp) {
                mp.trigger('customChatFeedback', `!{DodgerBlue}INFO: !{White}Chat font size changed to !{LimeGreen}${textSize}%`);
            }

            $("#chat").css("line-height", floatSize + "em");
            $("#chat_messages").css("font-size", textSize + "%");
            ScrollToEnd();
        } else if (text.includes("vim")) {
            let chatOpacity = parseInt(text.substr(12), 10);
            if (!isStartingUp) {
              mp.trigger('customChatFeedback', `!{DodgerBlue}INFO: !{White}Chat opacity changed to !{LimeGreen}${chatOpacity}%`);
            }

            $("#chat_messages").css('background', `rgb(0 0 0 / ${chatOpacity}%)`);
        }
        
    } else if (text.startsWith("log: ")) {
        PushToChatLog(rawText.substr(5));
    }
}

function PushToChatLog(text) {
    mp.trigger('pushMessageToChatLog', text, GetCurrentTimestampEx(), GetCurrentDate());
}

function ScrollToEnd() {
    chat.container.scrollTop(9999);
}

function GetScrollPercentage() {
    let scroller = document.getElementById('chat_messages');

    let height = scroller.clientHeight;
    let scrollHeight = scroller.scrollHeight - height;
    let scrollTop = scroller.scrollTop;
    let percent = Math.floor(scrollTop / scrollHeight * 100);

    return percent;
}

function DoMessageCooldown() {
    chat.canSendMessage = false;

    setTimeout(function () {
        chat.canSendMessage = true;
    }, chat.cooldown * 1000);
}

function UpdateCharacterCounter() {
    if (chat.input == null ||  chat.counter == null) {
        return;
    }
	var thisMessage = chat.input.children("input").val();
    if (thisMessage.length >= chat.maxCharactersPerMessage) {
        chat.input.children("input").val(thisMessage.substr(0, chat.maxCharactersPerMessage));
        mp.trigger('chatErrorSound');
    }

    let currentCharacterCount = thisMessage.length;
    let color = "White";
    // if (currentCharacterCount < chat.maxCharactersPerMessage - 50)
        // color = "White";
    if (currentCharacterCount >= chat.maxCharactersPerMessage - 50 && currentCharacterCount < chat.maxCharactersPerMessage - 25) {
        color = "Gold";
    } else if (currentCharacterCount >= chat.maxCharactersPerMessage - 25 && currentCharacterCount < chat.maxCharactersPerMessage) {
        color = "DarkOrange";
    } else if (currentCharacterCount >= chat.maxCharactersPerMessage) {
        color = "Red";
    }

    chat.counter.css('color', color);

    let charCount = currentCharacterCount + "/" + chat.maxCharactersPerMessage;
    chat.counter.children("ul").html(charCount);


    // Input command hints start
    if (thisMessage === "" || thisMessage === "/"){
        chat.placeHold.children("p").html("");
        return;
    }

    var commandHints = "";
    var hintCounter = 0;
    for (let i = 0; i < hintCommands.length; i++) {
        if(thisMessage === hintCommands[i].commandName.substr(0, thisMessage.length)) {
            if(hintCounter >= chat.maxCommandHints) break;
            if(hintCommands[i].staff && !isStaff) continue;

            if(hintCommands[i].staff) commandHints += `<font color="#a6aba8">${hintCommands[i].commandName} </font> <br/>`;
            else commandHints += `${hintCommands[i].commandName} <br/>`;
            hintCounter ++;
        }
    }
	chat.placeHold.children("p").html(commandHints);
}

function AddToPrevious(message) {
    if (chat.previous.length > 0 && message == chat.previous[0]) {
        return;
    }

    if (chat.previous.length >= chat.maxPreviousMessages) {
        chat.previous.pop();
    }

    chat.previous.unshift(message);
}

function ChangePreviousIndex(value) {
    if (chat.input == null) {
        return;
    }

    let inputField = document.getElementById('chat_msg');

    if (chat.previousIndex == -1) {
        chat.typedBeforePrevious = chat.input.children("input").val();
    }

    if (chat.previousIndex + value > chat.previous.length - 1 || chat.previousIndex + value < 0) {

        if (chat.previousIndex + value < 0) {

            chat.previousIndex = -1;
            chat.input.children("input").val(chat.typedBeforePrevious);

            inputField.focus();
            inputField.scrollLeft = inputField.scrollWidth;

            chat.input.children("input").trigger('input');
        }

        return;
    }

    chat.previousIndex += value;
    chat.input.children("input").val(chat.previous[chat.previousIndex]);

    inputField.focus();
    inputField.scrollLeft = inputField.scrollWidth;

    chat.input.children("input").trigger('input');
}

function StripColors(text) {
    return text.replace(/~[A-Za-z]~/g, "").replace(/!{.+}/g, "");
}

let date;
function GetCurrentTimestamp() {
    date = moment().utc();

    let hours = (date.hours() < 10 ? "0" : "") + (date.hours());
    let minutes = (date.minutes() < 10 ? "0" : "") + date.minutes();
    let seconds = (date.seconds() < 10 ? "0" : "") + date.seconds();

    let finalTimestamp = "[" + hours + ":" + minutes + ":" + seconds + "] ";

    return finalTimestamp;
}

function GetCurrentTimestampEx() {
    date = moment().utc();

    let hours = (date.hours() < 10 ? "0" : "") + (date.hours());
    let minutes = (date.minutes() < 10 ? "0" : "") + date.minutes();
    let seconds = (date.seconds() < 10 ? "0" : "") + date.seconds();

    let finalTimestamp = hours + ":" + minutes + ":" + seconds;

    return finalTimestamp;
}

function GetCurrentDate() {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    date = moment().utc();

    let day = (date.date() < 10 ? "0" : "") + date.date();
    let month = months[date.month()];
    let year = date.year();

    let finalDate = day + "/" + month + "/" + year;

    return finalDate;
}

function AddTimestamp(text, timestamp) {

    if (text.toLowerCase().startsWith('<span')) {

        let spanEndIndex = text.indexOf(">") + 1;
        text = text.substr(0, spanEndIndex) + timestamp + text.substr(spanEndIndex, text.length);
    }
    else {
        text = timestamp + text;
    }

    return text;
}

function EncodeArray(arr) {
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        tempArr.push(encodeURIComponent(arr[i]));
    }

    return tempArr;
}

function enableDraft()
{
    chat.draftEnabled = true;
    mp.trigger('customChatFeedback', `!{White}You have set the chat draft status to !{Green}ON!{White}.`);
}

function disableDraft()
{
    chat.draftEnabled = false;
    mp.trigger('customChatFeedback', `!{White}You have set the chat draft status to !{Red}OFF!{White}.`);
}

function enableDraftEx()
{
    chat.draftEnabled = true;
    //mp.trigger('customChatFeedback', `!{White}You have set the chat draft status to !{Green}ON!{White}.`);
}

function disableDraftEx()
{
    chat.draftEnabled = false;
    //mp.trigger('customChatFeedback', `!{White}You have set the chat draft status to !{Red}OFF!{White}.`);
}

$(document).ready(function () {
    mp.trigger('setFontList', JSON.stringify(EncodeArray(chat.fontSheets)), JSON.stringify(EncodeArray(chat.fonts)));
    for (let i = 0; i < chat.fontSheets.length; i++) {
        $("head").append(chat.fontSheets[i]);
    }

    chat.container = $("#chat ul#chat_messages");
    mp.trigger('toggleEnabledExtraChatFeatures');
    mp.trigger('customChatFeedback', `!{White}Welcome to !{Yellow}GTA World!{White}.`);

    $("body").keydown(function (event) {

        if (chat.input == null && event.which != chat.openChatEvent) {
            event.preventDefault();
        } else if (event.which == chat.openChatEvent && chat.input == null && chat.active == true) {
            enableChatInput(true);
            event.preventDefault();
            show();
        }
        else if (event.which == 13 && chat.input != null) {

            if (chat.canSendMessage) {

                let value = chat.input.children("input").val();
                value = StripColors(value);

                if (value.length > 0) {
                    chat.canSendMessage = false;
                    AddToPrevious(value);

                    // Replace -.. with — (em dash)
					value = value.replace(/(-+\.{2,})|(\.{2,}-+)/g, "—");

                    if (value[0] == "/") {
                        value = value.substr(1);

                        if (value.length > 0 && value.length + 1 <= chat.maxCharactersPerMessage) {
                            mp.invoke("command", value);
                        } else if (value.length > 0 && value.length + 1 > chat.maxCharactersPerMessage) {
                            mp.trigger('customChatFeedback', `!{Red}ERROR: !{White}Command too long. You can only type !{Red}${chat.maxCharactersPerMessage} !{White}characters per command.`);
                        } else {
                            // mp.trigger('customChatFeedback', '!{White}ERROR: Command not found.');
                        }

                        DoMessageCooldown();
                    }
                    else {
                        
                        if (autoGrammar){
                            // Capitalize First Letter
                            value = value.charAt(0).toUpperCase() + value.slice(1);

                            // Add . to the end of the sentence when there is no other mark
                            if (value){
                                value = value.trimRight() 
                                if (value && value.length > 0){
                                    let grammar = value.slice(-1);
                                    if (grammar && grammar != '.' && grammar != '!' && grammar != ',' && grammar != '-' && grammar != '—' && grammar != ';' && grammar != '?'){
                                        value += ".";
                                    }
                                }
                            }
                        }

                        if (value.length <= chat.maxCharactersPerMessage) {
                            mp.invoke("chatMessage", value);
                        } else {
                            mp.trigger('customChatFeedback', `!{Red}ERROR: !{White}Message too long. You can only type !{Red}${chat.maxCharactersPerMessage} !{White}characters per message.`);
                        }

                        DoMessageCooldown();
                    }

                    ScrollToEnd();
                }
            }
            else {
                mp.trigger('customChatFeedback', `!{Red}ERROR: !{White}You can't send messages that fast.`);
            }
            chat.draft = "";
            enableChatInput(false);
            hide();
        }
        else if (event.which == 27 && chat.input != null) { // Escape
            let value = chat.input.children("input").val();
            value = StripColors(value);
            chat.draft = value;
            enableChatInput(false);
            hide();
        }
        else if (event.which == 38 && chat.input != null) { // Arrow Up

            event.preventDefault();
            ChangePreviousIndex(1);
        }
        else if (event.which == 40 && chat.input != null) { // Arrow Down

            event.preventDefault();
            ChangePreviousIndex(-1);
        }
		else if (event.which == 9 && chat.input != null) { // Tab
            var thisMessages = chat.input.children("input").val();
            var placeHoldValue = chat.placeHold.children("p").html();

            if (thisMessages === "" || thisMessages === "/" || placeHoldValue === "" || placeHoldValue === "/")
                return;
            
            var replaced = placeHoldValue.replace(`<font color="#a6aba8">`, ``);
            chat.input.children("input").val(replaced.split(" ")[0] + " ");
            event.preventDefault();
        }
    });
});
