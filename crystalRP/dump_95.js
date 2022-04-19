{
let Dialog = null;
mp.events.add("openDialogMenu", (data) => {
	if (!loggedin || chatActive || editing || cuffed) return;
    if (Dialog == null) {
        Dialog = mp.browsers.new('package://cef/System/Dialog/index.html');
        Dialog.execute(`Dialog.open(${data})`);
        menuOpen();
    }
    else
        mp.events.call("exitDialog");
})
mp.events.add("acceptDialog", (data) => {
    if (Dialog != null) {
        mp.events.call("exitDialog");
        mp.events.callRemote("acceptDialog", data);
    }
})
mp.events.add("exitDialog", () => {
    if (Dialog != null) {
        Dialog.destroy()
        Dialog = null;
        menuClose()
    }
})
}