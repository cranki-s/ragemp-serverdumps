{
let deathMenu = null;
let respawn = false;

mp.events.add("DeathEvents::LoadWindow", () => {
    if (deathMenu != null || mp.browsers.exists(deathMenu))
        return;

    deathMenu = mp.browsers.new("package://gtalife/DeathUI/index.html");
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
    deathMenu.execute(`countdown('${2}', '${0}');`);
});

mp.events.add("DeathEvents::UpdateWindow", () => {
    if (deathMenu == null && !mp.browsers.exists(deathMenu))
        return;

    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
});

mp.events.add("DeathEvents::acceptDeath", () => {
    if (deathMenu == null && !mp.browsers.exists(deathMenu))
        return;

    if (respawn) {
        respawn = false;
        deathMenu.destroy();
        deathMenu = null;
        mp.gui.cursor.show(false, false);
        mp.events.call('setCefActive', false);
    }
    else
    {
        deathMenu.execute(`countdown(${2}, ${0});`);
        deathMenu.execute(`updateButton();`);
        respawn = true;
    }

    mp.events.callRemote("DeathEvents::AcceptDeath");
});

mp.events.add("DeathEvents::setDescription", (desc) => {
    if (deathMenu == null && !mp.browsers.exists(deathMenu))
        return;

    mp.events.callRemote("DeathEvents::SetDescription", desc);

});

mp.events.add("DeathEvents::CloseWindow", () => {
    if (deathMenu == null && !mp.browsers.exists(deathMenu))
        return;

    deathMenu.destroy();
    deathMenu = null;
    mp.gui.cursor.show(false, false);
    mp.events.call('setCefActive', false);
});


}