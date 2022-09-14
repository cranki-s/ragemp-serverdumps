{
let posMenu = null;

mp.events.add("PositionEvents::LoadWindow", (position) => {
    if (posMenu != null || mp.browsers.exists(posMenu))
        return;

    posMenu = mp.browsers.new("package://gtalife/DeveloperTools/position.html");
    posMenu.execute(`setPosition('${position}');`);
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
});

mp.events.add("PositionEvents::CloseCEF", () => {
    if (posMenu == null && !mp.browsers.exists(posMenu))
        return;

    posMenu.destroy();
    posMenu = null;

    mp.gui.cursor.show(false, false);
    mp.events.call('setCefActive', false);
});

}