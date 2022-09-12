{
let liftWindow = null;


mp.events.add("displayElevatorMenu", (floors) => {

    if (liftWindow != null) {
        if (liftWindow != null) {
            liftWindow.destroy();
            liftWindow = null;
        }
        liftWindow = mp.browsers.new("package://cef/Interfete/Lift/index.html");
        liftWindow.execute("app.updateFloors('" + floors + "');");
    }
    else {
        liftWindow = mp.browsers.new("package://cef/Interfete/Lift/index.html");
        liftWindow.execute("app.updateFloors('" + floors + "');");
    }

});


mp.events.add("destroyElevatorMenu", () => {
    if (liftWindow != null) {
        if (liftWindow != null) {
            liftWindow.destroy();
            liftWindow = null;
        }
    }
});


mp.events.add("changeFloor", (position) => {

    mp.events.callRemote('ChangeFloor', position);
});
}