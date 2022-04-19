{
let CRAFT = null;
mp.events.add("craft.open", (data) => {
    if (menuCheck() || CRAFT != null) return;
    menuOpen();
    CRAFT = mp.browsers.new('package://cef/System/craft/index.html');
    CRAFT.execute(`CRAFT.open(${data})`)
});
mp.events.add("craft.create", (index) => {
    mp.events.callRemote("craft.server.create", index);
});
mp.events.add("craft.close", () => {
    if (CRAFT != null) {
        menuClose();
        CRAFT.destroy();
        CRAFT = null
    }
});
}