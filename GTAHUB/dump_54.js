{
/** UI for input, list and confirmation dialogs. */

require('ui.js');

let currentDialogId = 0;

mp.rpc("dialog:show", (id, content) => {
    currentDialogId = id;
    browserCall("dialogVM", "show", id, JSON.parse(content));
    enableUI("dialog", false, true, true);
    if (isUIEnabled("menu")) browserSet("dialogVM", "blackscreen", true);
});

mp.rpc("player:allow_dangerous_input", (allow) => {
    browserSet("dialogVM", "allowDangerousInput", allow);
});

mp.rpc("dialog:hide", (id) => {
    if (currentDialogId == id) {
        browserCall("dialogVM", "hide", id);
        setTimeout(() => {
            if (!isUIEnabled("dialog")) browserSet("dialogVM", "blackscreen", false);
        }, 50);
        disableUI("dialog");
        currentDialogId = 0;
    }
});

mp.events.add("dialog:on_response", (id, response, list_selected, input) => {
    //browserCall("dialogVM", "hide", id);
    //disableUI("dialog");
    mp.events.callRemote("dialog:on_response", id, response, list_selected, input);
    //currentDialogId = 0;
});

mp.events.add("render", () => {
    if (currentDialogId != 0) { // disable esc while on dialogs because ESC is cancel
        mp.game.controls.disableControlAction(13, 200, true);
    }
});
}