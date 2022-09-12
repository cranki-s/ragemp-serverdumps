{
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

let walkingStyles = null;
let currentItem = 0;

async function setWalkingStyle(player, style) {
    if (!style) {
        player.resetMovementClipset(0.0);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            while(!mp.game.streaming.hasClipSetLoaded(style)) await mp.game.waitAsync(0);
        }

        player.setMovementClipset(style, 0.0);
    }
}

// create menu
let stylesMenu = new Menu("Walking Styles", "", new Point(950, 300));
stylesMenu.Visible = false;

stylesMenu.ItemSelect.on((item, index) => {
    mp.events.callRemote("setWalkingStyle", index);

    stylesMenu.MenuItems[currentItem].SetRightLabel("");
    item.SetRightLabel("Current");

    currentItem = index;
});

// f5 key - toggle visibility of the menu
mp.keys.bind(0x74, false, () => {
    if (walkingStyles) {
        stylesMenu.Visible = !stylesMenu.Visible;
    } else {
        mp.events.callRemote("requestWalkingStyles");
    }
});

// events
mp.events.add("receiveWalkingStyles", (namesJSON) => {
    walkingStyles = JSON.parse(namesJSON);
    for (let i = 0; i < walkingStyles.length; i++) stylesMenu.AddItem(new UIMenuItem(walkingStyles[i], ""));

    stylesMenu.MenuItems[0].SetRightLabel("Current");
    stylesMenu.Visible = true;
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type !== "player") return;
    setWalkingStyle(entity, entity.getVariable("walkingStyle"));
});

mp.events.addDataHandler("walkingStyle", (entity, value) => {
    if (entity.type === "player") setWalkingStyle(entity, value);
});
}