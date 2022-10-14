{
const NativeUI = require("./nativeui");
const UIMenu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const Point = NativeUI.Point;

function UpdateLightsMenu() {
    for (let i = 0; i <= 16; i++) LightsMenu.MenuItems[i].Checked = mp.game.graphics.getLightsState(i);
}

// Create the menu
const LightsMenu = new UIMenu("Light Control", "", new Point(50, 50));
for (let i = 0; i <= 16; i++) LightsMenu.AddItem(new UIMenuCheckboxItem(`Disable Light ${i}`, mp.game.graphics.getLightsState(i), `Will disable light ID ${i} when ticked and enable it back when unticked.`));
LightsMenu.AddItem(new UIMenuItem("Reset Lights", "Reset all changes to the lights."));
LightsMenu.Visible = false;

// Menu events
LightsMenu.CheckboxChange.on((item, checked) => {
    let lightIdx = LightsMenu.MenuItems.indexOf(item);
    mp.game.graphics.setLightsState(lightIdx, checked);
});

LightsMenu.ItemSelect.on((item, index) => {
    mp.game.graphics.resetLightsState();
    UpdateLightsMenu();
});

mp.events.addCommand("lcmenu", function () {
    UpdateLightsMenu();
    LightsMenu.Visible = !LightsMenu.Visible;
});
}