{
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
let ListItemss = "";
const ui = "";

mp.events.add("Client:Animation:Create", (json) => {
ListItemss = json;
mp.events.callRemote("Server:Utilities:setCefState", true);
    setTimeout(() => {
    addmenu();
    mp.gui.chat.show(false);
            
    }, 100);

});


function addmenu()  {
    const ui = new Menu("Animationen", "Wähle aus!", new Point(100, 50));
    ui.AddItem(new UIMenuListItem(
        "Slot 2",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 3",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 4",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 5",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 6",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 7",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    ui.AddItem(new UIMenuListItem(
        "Slot 8",
        "Bestätige mit ENTER!",
        new ItemsCollection(ListItemss)
    ));
    let cancelItem = new UIMenuItem("Schließen", "Menü schließen.");
    cancelItem.BackColor = new Color(229,57,53);
    cancelItem.HighlightedBackColor = new Color(229, 57, 53);
    ui.AddItem(cancelItem);


  ui.ItemSelect.on((item, listIndex) => {
    if (ui == "") return;
    if (item instanceof UIMenuListItem) {
        //console.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
        //mp.gui.chat.push([listIndex + 2] + " Test1: " + item.SelectedItem.DisplayText, item.SelectedItem.Data);
        mp.events.callRemote("Server:Animation:SelectSave",listIndex ,item.SelectedItem.DisplayText);
        mp.events.callRemote("Server:Utilities:setCefState", false);

    } else if (item instanceof UIMenuSliderItem) {
        //console.log(item.Text, item.Index, item.IndexToItem(item.Index));
        //mp.gui.chat.push("Test2: " + item.Text, item.Index, item.IndexToItem(item.Index));
        mp.events.callRemote("Server:Utilities:setCefState", false);
    } else {
        mp.events.callRemote("Server:Utilities:setCefState", false);
        if (item.Text == "Schließen") 
        {
            mp.events.callRemote("Server:Utilities:setCefState", false);
            ui.Close();
            mp.gui.chat.show(true);
        }
        //console.log(item.Text);
    }
});


    /*ui.AddItem(new UIMenuSliderItem(
        "Slider Item",
        ["Fugiat", "pariatur", "consectetur", "ex", "duis", "magna", "nostrud", "et", "dolor", "laboris"],
        5,
        "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
        true
    ));
    ui.AddItem(new UIMenuCheckboxItem(
        "Checkbox Item",
        false,
        "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint."
    ));*/
    }

// ui.SliderChange.on((item, index, value) => {
// 	console.log(item.Text, index, value);
// });



}