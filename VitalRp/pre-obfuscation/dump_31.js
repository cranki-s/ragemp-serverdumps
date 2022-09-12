{
mp.gui.chat.show(false);
let chat = mp.browsers.new('package://files/chat/index.html');
chat.markAsChat();
mp.gui.execute("window.location = 'package://files/chat/index.html'");
// keypress t
mp.keys.bind(0x54, !0, () => {
    if (global.logged === 0 || global.chatopened || global.uiGlobal_Browsers != undefined || global.uiGeneralStart_Browsers != undefined || global.phone_menu === !0 || global.menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    toggleChat(!0);
    chatopened = !0
    mp.events.callRemote("Chatting", 1);
});

// keypress up arrow
mp.keys.bind(0x26, !0, (player) => {
    if (global.chatopened === !0) {
        mp.events.call('getPreviousMessage')
    } else {
        mp.events.call('KEY_ARROW_UP')
    }
});
// keypress down arrow
mp.keys.bind(0x28, !0, (player) => {
    if (global.chatopened == !1) return;
    mp.events.call('getNextMessage')
});


mp.events.add({
    "Send_ToServer": (message) => {
        mp.events.callRemote('ServerChat', message)
    },
    "Send_ToChat": (time, name, text) => {
        let args = [time, name + "<span style='opacity:0; margin-left:-2px;'>a</span>", text];
        mp.gui.chat.push(args.join('(/\)'))
    },
    "Send_Player_Chat": (id, sqlId, type, msg) => {
  
            let name = getPlayerAlias(id, sqlId)
        
        let text = `${name} <font color='#999999'>${type} ${msg}`
        mp.gui.chat.push(text);
    },
    "SendRPAction": (id, sqlId, action) => {
        let name = getPlayerAlias(id, sqlId)
        let text = `<font color ='#C2A2DA'>* ${name} ${action}`
        mp.gui.chat.push(text);
    },
    "SendRPScenario": (id, sqlId, action) => {
        let name = getPlayerAlias(id, sqlId)
        let text = `<font color ='#C2A2DA'>* ${action} ((${name}))`
        mp.gui.chat.push(text);
    },
    "SendRPPossesion": (id, sqlId, action) => {
        let name = getPlayerAlias(id, sqlId)
        let text = `<font color ='#C2A2DA'>* ${name}'s ${action}`
        mp.gui.chat.push(text);
    },
    "openChat": () => {
        if (global.chatopened) return !1;
        toggleChat(!0);
        global.chatopened = !0
        mp.events.callRemote("Chatting", 1);
    },
    "closeChat": () => {
        if (!global.chatopened) return !1;
        chat.execute("sendMsg();");
        toggleChat(!1);
        global.chatopened = !1
        mp.events.callRemote("Chatting", 0);
    },
    "forceCloseChat": () => {
        if (!global.chatopened) return !1;
        toggleChat(!1);
        global.chatopened = !1
        mp.events.callRemote("Chatting", 0);
    },
    "getPreviousMessage": () => {
        if (!global.chatopened) return !1;
        chat.execute("previous();")
    },
    "getNextMessage": () => {
        if (!global.chatopened) return !1;
        chat.execute("next();")
    }
})


function getPlayerAlias(id, sql) {
    
    let name = `Stranger (${id})`;
    if (sql !== -1 && typeof global.aliases[sql] !== "undefined") {
        name = global.aliases[sql];
    }
    return name;
}

function toggleChat(toggle) {
    global.chatopened = toggle;
    global.isChat = toggle;
    chat.execute("enableChatInput('" + toggle + "');");
    mp.gui.cursor.visible = toggle
}


}