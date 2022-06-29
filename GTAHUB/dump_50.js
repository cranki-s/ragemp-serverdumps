{
/** UI that lets you accept/reject a request. */
require("ui.js");

let currentId = -1;

mp.rpc("confirmation:show", (id, message, seconds) => {
    if (currentId != -1) {
        mp.events.call("confirmation:hide");
        currentId = -1;
    }

    currentId = id;
    enableUI("confirmation", false, false, false);
    browserExecute("confirmationVM.time=" + JSON.stringify(seconds));
    browserExecute("confirmationVM.maxTime=" + JSON.stringify(seconds));
    browserExecute("confirmationVM.message=" + JSON.stringify(message));
    browserExecute("confirmationVM.show=true;");
});

mp.rpc("confirmation:hide", () => {
    browserExecute("confirmationVM.show=false;");
    disableUI("confirmation");
    currentId = -1;
});

mp.keys.bind(0x59/*Y*/, true, () => {
    if (isUIEnabled("confirmation") && currentId !== -1 && !mp.gui.cursor.visible) {
        mp.events.callRemote("confirmation:on_respond", currentId, true);
    }
});

mp.keys.bind(0x4E/*N*/, true, () => {
    if (isUIEnabled("confirmation") && currentId !== -1 && !mp.gui.cursor.visible) {
        mp.events.callRemote("confirmation:on_respond", currentId, false);
    }
});

}