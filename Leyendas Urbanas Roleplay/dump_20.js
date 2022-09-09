{
mp.events.add({
    "chat:cargarNuevo": () => {
        chatbox.execute("window.location = 'package://LURP/cef/chat2/index.html'");
    },

    "chat:mostrar": (state) => {
        if (nivelAdmin < 6) return;
        if (state) chatbox.execute("window.location = 'package://LURP/cef/chat2/index.html'");
        else chatbox.execute("window.location = 'package://LURP/cef/chat/chat.html'");
    },
    "chat:setPosition": (left, top) => {
        chatbox.execute("setPosition(" + left + ", " +top + ")"); 
    },
    "chat:setSize": (width, height) => {
        chatbox.execute("setSize(" + width + ", " + height + ")"); 
    },
    "chat:savePos": (left, top) => {
        if(mp.storage.data.chat)
        {
            mp.storage.data.chat.position = { left, top }; 
        }
        else
        {
            mp.storage.data.chat = {};
            mp.storage.data.chat.position = { left, top }; 
        }
        mp.storage.flush(); 
    },
    "chat:saveSize": (width, height) => {
        if(mp.storage.data.chat)
        {
            mp.storage.data.chat.size = { width, height }; 
        }
        else 
        {
            mp.storage.data.chat = {};
            mp.storage.data.chat.size = { width, height }; 
        }
        mp.storage.flush(); 
    },
    "chat:debug": (message) => {
        chatbox.execute("createTab(6, 'Debug', '#f20a5f', false, cmds = [])");
        let msg = '[6, "#f20a5f", true, -1, -1, "' + message + '"]';
        mp.gui.chat.push(msg); 
    },
    
});
}