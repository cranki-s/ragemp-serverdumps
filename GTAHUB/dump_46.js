{
/** Chat input controller */
require("ui.js");

mp.gui.chat.show(false);

// trick to bulk-push many messages to the chat
// at once, to prevent the UI from hanging.
let messagesToPush = [];
let pushInChunkInterval = null;

mp.rpc("chat:push", (text) => {
    messagesToPush.push(text);
    if (messagesToPush.length > 100) {
        messagesToPush.splice(0, messagesToPush.length - 100)
    }

    if (pushInChunkInterval == null) {
        pushInChunkInterval = setTimeout(() => {
            browserCall("chatVM", "addMessages", messagesToPush);
            pushInChunkInterval = null;
            messagesToPush.splice(0, messagesToPush.length);
        }, 50);
    }
});

mp.rpc("chat:suggestions", (suggestionsJSON) => {
    browserCall("chatVM", "setSuggestions", JSON.parse(suggestionsJSON));
});

mp.rpc("chat:show", (toggle) => {
    browserCall("chatVM", "toggleShow", toggle);
});

mp.keys.bind(0x54, true, () => { // T down
    if (!isAnyUIEnabled()) {
        // enable this UI.
        enableUI("chat", false, false, true);
        browserCall("chatVM", "toggleInput", true);
    }
});

mp.events.add("chat:on_submit", (text) => {
    // event? should be probably like any other event.
});

mp.events.add("chat:on_cancel", () => {
    disableUI("chat");
});

mp.events.add("chat:on_input_change", (input) => mp.events.callRemote("chat:on_input_change", input));

// those are unsupported
mp.events.add("chat:clear", () => {});
mp.events.add("chat:activate", (toggle) => {});


}