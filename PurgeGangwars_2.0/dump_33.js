{
// Native UI
const NativeUI = require('/nativeui/index.js');
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

// Tuning

mp.keys.bind(0x77, true, () => {
    const ui = new Menu("Tuning", "Tuning Parts", new Point(1480, 250));
    ui.AddItem(new UIMenuListItem(
        "Spoiler",
        "Change the spoiler of the vehicle!",
        new ItemsCollection(["Spoiler -1", "Spoiler 0", "Spoiler 1", "Spoiler 2", "Spoiler 3", "Spoiler 4", "Spoiler 5", "Spoiler 6", "Spoiler 7", "Spoiler 8"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Front Bumper",
        "Change the front bumper of the vehicle!",
        new ItemsCollection(["Front Bumper -1", "Front Bumper 0", "Front Bumper 1", "Front Bumper 2", "Front Bumper 3", "Front Bumper 4", "Front Bumper 5", "Front Bumper 6", "Front Bumper 7", "Front Bumper 8", "Front Bumper 9", "Front Bumper 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Rear Bumper",
        "Change the rear bumper of the vehicle!",
        new ItemsCollection(["Rear Bumper -1", "Rear Bumper 0", "Rear Bumper 1", "Rear Bumper 2", "Rear Bumper 3", "Rear Bumper 4", "Rear Bumper 5", "Rear Bumper 6", "Rear Bumper 7", "Rear Bumper 8", "Rear Bumper 9", "Rear Bumper 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Side Skirt",
        "Change the side skirt of the vehicle!",
        new ItemsCollection(["Side Skirt -1", "Side Skirt 0", "Side Skirt 1", "Side Skirt 2", "Side Skirt 3", "Side Skirt 4", "Side Skirt 5", "Side Skirt 6", "Side Skirt 7", "Side Skirt 8", "Side Skirt 9", "Side Skirt 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Exhaust",
        "Change the exhaust of the vehicle!",
        new ItemsCollection(["Exhaust -1", "Exhaust 0", "Exhaust 1", "Exhaust 2", "Exhaust 3", "Exhaust 4", "Exhaust 5", "Exhaust 6", "Exhaust 7", "Exhaust 8", "Exhaust 9", "Exhaust 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Frame",
        "Change the frame of the vehicle!",
        new ItemsCollection(["Frame -1", "Frame 0", "Frame 1", "Frame 2", "Frame 3", "Frame 4", "Frame 5", "Frame 6", "Frame 7", "Frame 8", "Frame 9", "Frame 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Grille",
        "Change the grille of the vehicle!",
        new ItemsCollection(["Grille -1", "Grille 0", "Grille 1", "Grille 2", "Grille 3", "Grille 4", "Grille 5", "Grille 6", "Grille 7", "Grille 8", "Grille 9", "Grille 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Hood",
        "Change the hood of the vehicle!",
        new ItemsCollection(["Hood -1", "Hood 0", "Hood 1", "Hood 2", "Hood 3", "Hood 4", "Hood 5", "Hood 6", "Hood 7", "Hood 8", "Hood 9", "Hood 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Left Fender",
        "Change the left fender of the vehicle!",
        new ItemsCollection(["Left Fender -1", "Left Fender 0", "Left Fender 1", "Left Fender 2", "Left Fender 3", "Left Fender 4", "Left Fender 5", "Left Fender 6", "Left Fender 7", "Left Fender 8", "Left Fender 9", "Left Fender 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Right Fender",
        "Change the right fender of the vehicle!",
        new ItemsCollection(["Right Fender -1", "Right Fender 0", "Right Fender 1", "Right Fender 2", "Right Fender 3", "Right Fender 4", "Right Fender 5", "Right Fender 6", "Right Fender 7", "Right Fender 8", "Right Fender 9", "Right Fender 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Roof",
        "Change the roof of the vehicle!",
        new ItemsCollection(["Roof -1", "Roof 0", "Roof 1", "Roof 2", "Roof 3", "Roof 4", "Roof 5", "Roof 6", "Roof 7", "Roof 8", "Roof 9", "Roof 10"])
    ));
    // ui.AddItem(new UIMenuListItem(
    //     "Motor",
    //     "Den Motor des Fahrzeuges ändern",
    //     new ItemsCollection(["EG -1", "EG 0", "EG 1", "EG 2", "EG 3"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Bemsen",
    //     "Die Bemsen des Fahrzeuges ändern",
    //     new ItemsCollection(["BS -1", "BS 0", "BS 1", "BS 2"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Getriebe",
    //     "Das Getriebe des Fahrzeuges ändern",
    //     new ItemsCollection(["GH -1", "GH 0", "GH 1", "GH 2"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Hupe",
    //     "Die Hupe des Fahrzeuges ändern",
    //     new ItemsCollection(["Hupe -1", "Hupe 0", "Hupe 1", "Hupe 2", "Hupe 3", "Hupe 4", "Hupe 5", "Hupe 6", "Hupe 7", "Hupe 8", "Hupe 9", "Hupe 10", "Hupe 11", "Hupe 12", "Hupe 13", "Hupe 14", "Hupe 15", "Hupe 16", "Hupe 17", "Hupe 18", "Hupe 19", "Hupe 20", "Hupe 21", "Hupe 21", "Hupe 22", "Hupe 23", "Hupe 24", "Hupe 25", "Hupe 26", "Hupe 27", "Hupe 28", "Hupe 29", "Hupe 30", "Hupe 31", "Hupe 32", "Hupe 33", "Hupe 34", "Hupe 35", "Hupe 36", "Hupe 37", "Hupe 38", "Hupe 39", "Hupe 40", "Hupe 41", "Hupe 42", "Hupe 43", "Hupe 44", "Hupe 45", "Hupe 46", "Hupe 47", "Hupe 48", "Hupe 49", "Hupe 50", "Hupe 51"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Federung",
    //     "Die Federung des Fahrzeuges ändern",
    //     new ItemsCollection(["FDR -1", "FDR 0", "FDR 1", "FDR 2", "FDR 3",])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Panzerung",
    //     "Die Panzerung des Fahrzeuges ändern",
    //     new ItemsCollection(["PZ -1", "PZ 0", "PZ 1", "PZ 2", "PZ 3", "PZ 4",])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Turbo",
    //     "Der Turbo des Fahrzeuges ändern",
    //     new ItemsCollection(["TB -1", "TB 0"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Xeon",
    //     "Die Xeon Scheinwärfer des Fahrzeuges ändern",
    //     new ItemsCollection(["X -1", "X 0"])
    // ));
    // ui.AddItem(new UIMenuListItem(
    //     "Vorder Räder",
    //     "Die Vorder Räder des Fahrzeuges ändern",
    //     new ItemsCollection(["FRad -1", "FRad 0", "FRad 1", "FRad 2", "FRad 3", "FRad 4", "FRad 5", "FRad 6", "FRad 7", "FRad 8", "FRad 9", "FRad 10", "FRad 11", "FRad 12", "FRad 13", "FRad 14", "FRad 15", "FRad 16", "FRad 17", "FRad 18", "FRad 19", "FRad 20", "FRad 21", "FRad 21", "FRad 22", "FRad 23", "FRad 24", "FRad 25", "FRad 26", "FRad 27", "FRad 28", "FRad 29", "FRad 30", "FRad 31", "FRad 32", "FRad 33", "FRad 34", "FRad 35", "FRad 36", "FRad 37", "FRad 38", "FRad 39", "FRad 40", "FRad 41", "FRad 42", "FRad 43", "FRad 44", "FRad 45", "FRad 46", "FRad 47", "FRad 48", "FRad 49", "FRad 50"])
    // ));
    ui.ItemSelect.on(item => {
        // Spoiler
        if (item.SelectedItem.DisplayText == 'Spoiler -1') {
       mp.events.callRemote("mod", 0, -1);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 0') {
        mp.events.callRemote("mod", 0, 0);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 1') {
        mp.events.callRemote("mod", 0, 1);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 2') {
        mp.events.callRemote("mod", 0, 2);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 3') {
        mp.events.callRemote("mod", 0, 3);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 4') {
        mp.events.callRemote("mod", 0, 4);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 5') {
        mp.events.callRemote("mod", 0, 5);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 6') {
        mp.events.callRemote("mod", 0, 6);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 7') {
        mp.events.callRemote("mod", 0, 7);
    }   else if (item.SelectedItem.DisplayText == 'Spoiler 8') {
        mp.events.callRemote("mod", 0, 8);
        // Front Bumper
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper -1') {
        mp.events.callRemote("mod", 1, -1);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 0') {
        mp.events.callRemote("mod", 1, 0);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 1') {
        mp.events.callRemote("mod", 1, 1);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 2') {
        mp.events.callRemote("mod", 1, 2);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 3') {
        mp.events.callRemote("mod", 1, 3);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 4') {
        mp.events.callRemote("mod", 1, 4);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 5') {
		mp.events.callRemote("mod", 1, 5);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 6') {
        mp.events.callRemote("mod", 1, 6);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 7') {
        mp.events.callRemote("mod", 1, 7);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 8') {
        mp.events.callRemote("mod", 1, 8);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 9') {
        mp.events.callRemote("mod", 1, 9);
    }   else if (item.SelectedItem.DisplayText == 'Front Bumper 10') {
        mp.events.callRemote("mod", 1, 10);
        // Rear Bumper
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper -1') {
        mp.events.callRemote("mod", 2, -1);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 0') {
		mp.events.callRemote("mod", 2, 0);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 1') {
        mp.events.callRemote("mod", 2, 1);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 2') {
        mp.events.callRemote("mod", 2, 2);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 3') {
        mp.events.callRemote("mod", 2, 3);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 4') {
        mp.events.callRemote("mod", 2, 4);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 5') {
		mp.events.callRemote("mod", 2, 5);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 6') {
        mp.events.callRemote("mod", 2, 6);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 7') {
        mp.events.callRemote("mod", 2, 7);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 8') {
        mp.events.callRemote("mod", 2, 8);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 9') {
        mp.events.callRemote("mod", 2, 9);
    }   else if (item.SelectedItem.DisplayText == 'Rear Bumper 10') {
        mp.events.callRemote("mod", 2, 10);
        // Side Bumper
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt -1') {
        mp.events.callRemote("mod", 3, -1);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 0') {
        mp.events.callRemote("mod", 3, 0);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 1') {
        mp.events.callRemote("mod", 3, 1);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 2') {
        mp.events.callRemote("mod", 3, 2);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 3') {
        mp.events.callRemote("mod", 3, 3);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 4') {
        mp.events.callRemote("mod", 3, 4);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 5') {
		mp.events.callRemote("mod", 3, 5);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 6') {
        mp.events.callRemote("mod", 3, 6);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 7') {
        mp.events.callRemote("mod", 3, 7);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 8') {
        mp.events.callRemote("mod", 3, 8);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 9') {
        mp.events.callRemote("mod", 3, 9);
    }   else if (item.SelectedItem.DisplayText == 'Side Skirt 10') {
        mp.events.callRemote("mod", 3, 10);
        // Exhaust
    }   else if (item.SelectedItem.DisplayText == 'Exhaust -1') {
        mp.events.callRemote("mod", 4, -1);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 0') {
        mp.events.callRemote("mod", 4, 0);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 1') {
        mp.events.callRemote("mod", 4, 1);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 2') {
        mp.events.callRemote("mod", 4, 2);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 3') {
        mp.events.callRemote("mod", 4, 3);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 4') {
        mp.events.callRemote("mod", 4, 4);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 5') {
		mp.events.callRemote("mod", 4, 5);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 6') {
        mp.events.callRemote("mod", 4, 6);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 7') {
        mp.events.callRemote("mod", 4, 7);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 8') {
        mp.events.callRemote("mod", 4, 8);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 9') {
        mp.events.callRemote("mod", 4, 9);
    }   else if (item.SelectedItem.DisplayText == 'Exhaust 10') {
        mp.events.callRemote("mod", 4, 10);
        // Frame
    }   else if (item.SelectedItem.DisplayText == 'Frame -1') {
        mp.events.callRemote("mod", 5, -1);
    }   else if (item.SelectedItem.DisplayText == 'Frame 0') {
        mp.events.callRemote("mod", 5, 0);
    }   else if (item.SelectedItem.DisplayText == 'Frame 1') {
        mp.events.callRemote("mod", 5, 1);
    }   else if (item.SelectedItem.DisplayText == 'Frame 2') {
        mp.events.callRemote("mod", 5, 2);
    }   else if (item.SelectedItem.DisplayText == 'Frame 3') {
        mp.events.callRemote("mod", 5, 3);
    }   else if (item.SelectedItem.DisplayText == 'Frame 4') {
        mp.events.callRemote("mod", 5, 4);
    }   else if (item.SelectedItem.DisplayText == 'Frame 5') {
		mp.events.callRemote("mod", 5, 5);
    }   else if (item.SelectedItem.DisplayText == 'Frame 6') {
        mp.events.callRemote("mod", 5, 6);
    }   else if (item.SelectedItem.DisplayText == 'Frame 7') {
        mp.events.callRemote("mod", 5, 7);
    }   else if (item.SelectedItem.DisplayText == 'Frame 8') {
        mp.events.callRemote("mod", 5, 8);
    }   else if (item.SelectedItem.DisplayText == 'Frame 9') {
        mp.events.callRemote("mod", 5, 9);
    }   else if (item.SelectedItem.DisplayText == 'Frame 10') {
        mp.events.callRemote("mod", 5, 10);
        // Grille
    }   else if (item.SelectedItem.DisplayText == 'Grille -1') {
        mp.events.callRemote("mod", 6, -1);
    }   else if (item.SelectedItem.DisplayText == 'Grille 0') {
        mp.events.callRemote("mod", 6, 0);
    }   else if (item.SelectedItem.DisplayText == 'Grille 1') {
        mp.events.callRemote("mod", 6, 1);
    }   else if (item.SelectedItem.DisplayText == 'Grille 2') {
        mp.events.callRemote("mod", 6, 2);
    }   else if (item.SelectedItem.DisplayText == 'Grille 3') {
        mp.events.callRemote("mod", 6, 3);
    }   else if (item.SelectedItem.DisplayText == 'Grille 4') {
        mp.events.callRemote("mod", 6, 4);
    }   else if (item.SelectedItem.DisplayText == 'Grille 5') {
		mp.events.callRemote("mod", 6, 5);
    }   else if (item.SelectedItem.DisplayText == 'Grille 6') {
        mp.events.callRemote("mod", 6, 6);
    }   else if (item.SelectedItem.DisplayText == 'Grille 7') {
        mp.events.callRemote("mod", 6, 7);
    }   else if (item.SelectedItem.DisplayText == 'Grille 8') {
        mp.events.callRemote("mod", 6, 8);
    }   else if (item.SelectedItem.DisplayText == 'Grille 9') {
        mp.events.callRemote("mod", 6, 9);
    }   else if (item.SelectedItem.DisplayText == 'Grille 10') {
        mp.events.callRemote("mod", 6, 10);
        // Hood
    }   else if (item.SelectedItem.DisplayText == 'Hood -1') {
        mp.events.callRemote("mod", 7, -1);
    }   else if (item.SelectedItem.DisplayText == 'Hood 0') {
        mp.events.callRemote("mod", 7, 0);
    }   else if (item.SelectedItem.DisplayText == 'Hood 1') {
        mp.events.callRemote("mod", 7, 1);
    }   else if (item.SelectedItem.DisplayText == 'Hood 2') {
        mp.events.callRemote("mod", 7, 2);
    }   else if (item.SelectedItem.DisplayText == 'Hood 3') {
        mp.events.callRemote("mod", 7, 3);
    }   else if (item.SelectedItem.DisplayText == 'Hood 4') {
        mp.events.callRemote("mod", 7, 4);
    }   else if (item.SelectedItem.DisplayText == 'Hood 5') {
		mp.events.callRemote("mod", 7, 5);
    }   else if (item.SelectedItem.DisplayText == 'Hood 6') {
        mp.events.callRemote("mod", 7, 6);
    }   else if (item.SelectedItem.DisplayText == 'Hood 7') {
        mp.events.callRemote("mod", 7, 7);
    }   else if (item.SelectedItem.DisplayText == 'Hood 8') {
        mp.events.callRemote("mod", 7, 8);
    }   else if (item.SelectedItem.DisplayText == 'Hood 9') {
        mp.events.callRemote("mod", 7, 9);
    }   else if (item.SelectedItem.DisplayText == 'Hood 10') {
        mp.events.callRemote("mod", 7, 10);
        // Left Fender
    }   else if (item.SelectedItem.DisplayText == 'Left Fender -1') {
        mp.events.callRemote("mod", 8, -1);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 0') {
        mp.events.callRemote("mod", 8, 0);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 1') {
        mp.events.callRemote("mod", 8, 1);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 2') {
        mp.events.callRemote("mod", 8, 2);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 3') {
        mp.events.callRemote("mod", 8, 3);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 4') {
        mp.events.callRemote("mod", 8, 4);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 5') {
		mp.events.callRemote("mod", 8, 5);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 6') {
        mp.events.callRemote("mod", 8, 6);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 7') {
        mp.events.callRemote("mod", 8, 7);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 8') {
        mp.events.callRemote("mod", 8, 8);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 9') {
        mp.events.callRemote("mod", 8, 9);
    }   else if (item.SelectedItem.DisplayText == 'Left Fender 10') {
        mp.events.callRemote("mod", 8, 10);
        // Right Fender
    }   else if (item.SelectedItem.DisplayText == 'Right Fender -1') {
        mp.events.callRemote("mod", 9, -1);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 0') {
        mp.events.callRemote("mod", 9, 0);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 1') {
        mp.events.callRemote("mod", 9, 1);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 2') {
        mp.events.callRemote("mod", 9, 2);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 3') {
        mp.events.callRemote("mod", 9, 3);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 4') {
        mp.events.callRemote("mod", 9, 4);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 5') {
		mp.events.callRemote("mod", 9, 5);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 6') {
        mp.events.callRemote("mod", 9, 6);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 7') {
        mp.events.callRemote("mod", 9, 7);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 8') {
        mp.events.callRemote("mod", 9, 8);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 9') {
        mp.events.callRemote("mod", 9, 9);
    }   else if (item.SelectedItem.DisplayText == 'Right Fender 10') {
        mp.events.callRemote("mod", 9, 10);
        // Roof
    }   else if (item.SelectedItem.DisplayText == 'Roof -1') {
        mp.events.callRemote("mod", 10, -1);
    }   else if (item.SelectedItem.DisplayText == 'Roof 0') {
        mp.events.callRemote("mod", 10, 0);
    }   else if (item.SelectedItem.DisplayText == 'Roof 1') {
        mp.events.callRemote("mod", 10, 1);
    }   else if (item.SelectedItem.DisplayText == 'Roof 2') {
        mp.events.callRemote("mod", 10, 2);
    }   else if (item.SelectedItem.DisplayText == 'Roof 3') {
        mp.events.callRemote("mod", 10, 3);
    }   else if (item.SelectedItem.DisplayText == 'Roof 4') {
        mp.events.callRemote("mod", 10, 4);
    }   else if (item.SelectedItem.DisplayText == 'Roof 5') {
		mp.events.callRemote("mod", 10, 5);
    }   else if (item.SelectedItem.DisplayText == 'Roof 6') {
        mp.events.callRemote("mod", 10, 6);
    }   else if (item.SelectedItem.DisplayText == 'Roof 7') {
        mp.events.callRemote("mod", 10, 7);
    }   else if (item.SelectedItem.DisplayText == 'Roof 8') {
        mp.events.callRemote("mod", 10, 8);
    }   else if (item.SelectedItem.DisplayText == 'Roof 9') {
        mp.events.callRemote("mod", 10, 9);
    }   else if (item.SelectedItem.DisplayText == 'Roof 10') {
        mp.events.callRemote("mod", 10, 10);
    }
    //     // Engine
    //  else if (item.SelectedItem.DisplayText == 'EG -1') {
    //     mp.events.callRemote("mod", 11, -1);
    // }   else if (item.SelectedItem.DisplayText == 'EG 0') {
    //     mp.events.callRemote("mod", 11, 0);
    // }   else if (item.SelectedItem.DisplayText == 'EG 1') {
    //     mp.events.callRemote("mod", 11, 1);
    // }   else if (item.SelectedItem.DisplayText == 'EG 2') {
    //     mp.events.callRemote("mod", 11, 2);
    // }   else if (item.SelectedItem.DisplayText == 'EG 3') {
    //     mp.events.callRemote("mod", 11, 3);
    // }   else if (item.SelectedItem.DisplayText == 'EG 4') {
    //     mp.events.callRemote("mod", 11, 4);
    //     //Brakes
    // }   else if (item.SelectedItem.DisplayText == 'BS -1') {
    //     mp.events.callRemote("mod", 12, -1);
    // }   else if (item.SelectedItem.DisplayText == 'BS 0') {
    //     mp.events.callRemote("mod", 12, 0);
    // }   else if (item.SelectedItem.DisplayText == 'BS 1') {
    //     mp.events.callRemote("mod", 12, 1);
    // }   else if (item.SelectedItem.DisplayText == 'BS 2') {
    //     mp.events.callRemote("mod", 12, 2);
    // }   else if (item.SelectedItem.DisplayText == 'BS 3') {
    //     // Transmission
    // }   else if (item.SelectedItem.DisplayText == 'GH -1') {
    //     mp.events.callRemote("mod", 13, -1);
    // }   else if (item.SelectedItem.DisplayText == 'GH 0') {
	// 	mp.events.callRemote("mod", 13, 0);
    // }   else if (item.SelectedItem.DisplayText == 'GH 1') {
    //     mp.events.callRemote("mod", 13, 1);
    // }   else if (item.SelectedItem.DisplayText == 'GH 2') {
    //     mp.events.callRemote("mod", 13, 2);
    // }   else if (item.SelectedItem.DisplayText == 'GH 3') {
    //     // Horn
    // }   else if (item.SelectedItem.DisplayText == 'Hupe -1') {
    //     mp.events.callRemote("mod", 14, -1);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 0') {
	// 	mp.events.callRemote("mod", 14, 0);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 1') {
    //     mp.events.callRemote("mod", 14, 1);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 2') {
    //     mp.events.callRemote("mod", 14, 2);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 3') {
    //     mp.events.callRemote("mod", 14, 3);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 4') {
    //     mp.events.callRemote("mod", 14, 4);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 5') {
	// 	mp.events.callRemote("mod", 14, 5);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 6') {
    //     mp.events.callRemote("mod", 14, 6);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 7') {
    //     mp.events.callRemote("mod", 14, 7);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 8') {
    //     mp.events.callRemote("mod", 14, 8);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 9') {
    //     mp.events.callRemote("mod", 14, 9);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 10') {
    //     mp.events.callRemote("mod", 14, 10);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 11') {
	// 	mp.events.callRemote("mod", 14, 11);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 12') {
    //     mp.events.callRemote("mod", 14, 12);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 13') {
    //     mp.events.callRemote("mod", 14, 13);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 14') {
    //     mp.events.callRemote("mod", 14, 14);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 15') {
    //     mp.events.callRemote("mod", 14, 15);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 16') {
	// 	mp.events.callRemote("mod", 14, 16);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 17') {
    //     mp.events.callRemote("mod", 14, 17);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 18') {
    //     mp.events.callRemote("mod", 14, 18);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 19') {
    //     mp.events.callRemote("mod", 14, 19);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 22') {
    //     mp.events.callRemote("mod", 14, 20);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 21') {
    //     mp.events.callRemote("mod", 14, 21);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 22') {
	// 	mp.events.callRemote("mod", 14, 22);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 23') {
    //     mp.events.callRemote("mod", 14, 23);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 24') {
    //     mp.events.callRemote("mod", 14, 24);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 25') {
    //     mp.events.callRemote("mod", 14, 25);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 26') {
    //     mp.events.callRemote("mod", 14, 26);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 28') {
	// 	mp.events.callRemote("mod", 14, 27);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 29') {
    //     mp.events.callRemote("mod", 14, 28);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 30') {
    //     mp.events.callRemote("mod", 14, 29);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 31') {
    //     mp.events.callRemote("mod", 14, 30);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 32') {
    //     mp.events.callRemote("mod", 14, 31);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 33') {
    //     mp.events.callRemote("mod", 14, 32);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 34') {
	// 	mp.events.callRemote("mod", 14, 33);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 35') {
    //     mp.events.callRemote("mod", 14, 34);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 36') {
    //     mp.events.callRemote("mod", 14, 35);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 37') {
    //     mp.events.callRemote("mod", 14, 36);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 38') {
    //     mp.events.callRemote("mod", 14, 37);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 39') {
	// 	mp.events.callRemote("mod", 14, 38);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 40') {
    //     mp.events.callRemote("mod", 14, 39);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 41') {
    //     mp.events.callRemote("mod", 14, 40);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 42') {
    //     mp.events.callRemote("mod", 14, 41);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 43') {
    //     mp.events.callRemote("mod", 14, 42);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 44') {
    //     mp.events.callRemote("mod", 14, 43);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 45') {
	// 	mp.events.callRemote("mod", 14, 44);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 46') {
    //     mp.events.callRemote("mod", 14, 45);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 47') {
    //     mp.events.callRemote("mod", 14, 46);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 48') {
    //     mp.events.callRemote("mod", 14, 47);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 49') {
    //     mp.events.callRemote("mod", 14, 48);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 50') {
	// 	mp.events.callRemote("mod", 14, 49);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 51') {
    //     mp.events.callRemote("mod", 14, 50);
    // }   else if (item.SelectedItem.DisplayText == 'Hupe 52') {
    //     mp.events.callRemote("mod", 14, 51);
        // Suspension
    // }   else if (item.SelectedItem.DisplayText == 'FDR -1') {
	// 	mp.events.callRemote("mod", 15, -1);
    // }   else if (item.SelectedItem.DisplayText == 'FDR 0') {
    //     mp.events.callRemote("mod", 15, 0);
    // }   else if (item.SelectedItem.DisplayText == 'FDR 1') {
    //     mp.events.callRemote("mod", 15, 1);
    // }   else if (item.SelectedItem.DisplayText == 'FDR 2') {
    //     mp.events.callRemote("mod", 15, 2);
    // }   else if (item.SelectedItem.DisplayText == 'FDR 3') {
    //     mp.events.callRemote("mod", 15, 3);
    //     // Armor
    // }   else if (item.SelectedItem.DisplayText == 'PZ -1') {
	// 	mp.events.callRemote("mod", 16, -1);
    // }   else if (item.SelectedItem.DisplayText == 'PZ 0') {
    //     mp.events.callRemote("mod", 16, 0);
    // }   else if (item.SelectedItem.DisplayText == 'PZ 3') {
    //     mp.events.callRemote("mod", 16, 1);
    // }   else if (item.SelectedItem.DisplayText == 'PZ 4') {
    //     mp.events.callRemote("mod", 16, 2);
    // }   else if (item.SelectedItem.DisplayText == 'PZ 5') {
    //     mp.events.callRemote("mod", 16, 3);
    // }   else if (item.SelectedItem.DisplayText == 'PZ 6') {
    //     mp.events.callRemote("mod", 16, 4);
    //     // Turbo
    // }   else if (item.SelectedItem.DisplayText == 'TB -1') {
	// 	mp.events.callRemote("mod", 18, -1);
    // }   else if (item.SelectedItem.DisplayText == 'TB 0') {
    //     mp.events.callRemote("mod", 18, 0);
        // Xeon
    // }   else if (item.SelectedItem.DisplayText == 'X -1') {
	// 	mp.events.callRemote("mod", 22, -1);
    // }   else if (item.SelectedItem.DisplayText == 'X 0') {
    //     mp.events.callRemote("mod", 22, 0);
        // Front Wheels
    // }   else if (item.SelectedItem.DisplayText == 'FRad -1') {
    //     mp.events.callRemote("mod", 23, -1);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 0') {
	// 	mp.events.callRemote("mod", 23, 0);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 1') {
    //     mp.events.callRemote("mod", 23, 1);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 2') {
    //     mp.events.callRemote("mod", 23, 2);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 3') {
    //     mp.events.callRemote("mod", 23, 3);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 4') {
    //     mp.events.callRemote("mod", 23, 4);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 5') {
	// 	mp.events.callRemote("mod", 23, 5);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 6') {
    //     mp.events.callRemote("mod", 23, 6);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 7') {
    //     mp.events.callRemote("mod", 23, 7);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 8') {
    //     mp.events.callRemote("mod", 23, 8);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 9') {
    //     mp.events.callRemote("mod", 23, 9);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 10') {
    //     mp.events.callRemote("mod", 23, 10);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 11') {
	// 	mp.events.callRemote("mod", 23, 11);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 12') {
    //     mp.events.callRemote("mod", 23, 12);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 13') {
    //     mp.events.callRemote("mod", 23, 13);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 14') {
    //     mp.events.callRemote("mod", 23, 14);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 15') {
    //     mp.events.callRemote("mod", 23, 15);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 16') {
	// 	mp.events.callRemote("mod", 23, 16);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 17') {
    //     mp.events.callRemote("mod", 23, 17);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 18') {
    //     mp.events.callRemote("mod", 23, 18);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 19') {
    //     mp.events.callRemote("mod", 23, 19);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 22') {
    //     mp.events.callRemote("mod", 23, 20);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 21') {
    //     mp.events.callRemote("mod", 23, 21);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 22') {
	// 	mp.events.callRemote("mod", 23, 22);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 23') {
    //     mp.events.callRemote("mod", 23, 23);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 24') {
    //     mp.events.callRemote("mod", 23, 24);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 25') {
    //     mp.events.callRemote("mod", 23, 25);
    // }   else if (item.SelectedItem.DisplayText == 'FRad -1') {
    //     mp.events.callRemote("mod", 23, -1);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 0') {
	// 	mp.events.callRemote("mod", 23, 0);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 1') {
    //     mp.events.callRemote("mod", 23, 1);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 2') {
    //     mp.events.callRemote("mod", 23, 2);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 3') {
    //     mp.events.callRemote("mod", 23, 3);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 4') {
    //     mp.events.callRemote("mod", 23, 4);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 5') {
	// 	mp.events.callRemote("mod", 23, 5);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 6') {
    //     mp.events.callRemote("mod", 23, 6);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 7') {
    //     mp.events.callRemote("mod", 23, 7);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 8') {
    //     mp.events.callRemote("mod", 23, 8);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 9') {
    //     mp.events.callRemote("mod", 23, 9);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 10') {
    //     mp.events.callRemote("mod", 23, 10);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 11') {
	// 	mp.events.callRemote("mod", 23, 11);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 12') {
    //     mp.events.callRemote("mod", 23, 12);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 13') {
    //     mp.events.callRemote("mod", 23, 13);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 14') {
    //     mp.events.callRemote("mod", 23, 14);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 15') {
    //     mp.events.callRemote("mod", 23, 15);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 16') {
	// 	mp.events.callRemote("mod", 23, 16);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 17') {
    //     mp.events.callRemote("mod", 23, 17);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 18') {
    //     mp.events.callRemote("mod", 23, 18);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 19') {
    //     mp.events.callRemote("mod", 23, 19);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 22') {
    //     mp.events.callRemote("mod", 23, 20);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 21') {
    //     mp.events.callRemote("mod", 23, 21);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 22') {
	// 	mp.events.callRemote("mod", 23, 22);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 23') {
    //     mp.events.callRemote("mod", 23, 23);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 24') {
    //     mp.events.callRemote("mod", 23, 24);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 25') {
    //     mp.events.callRemote("mod", 23, 25);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 26') {
    //     mp.events.callRemote("mod", 23, 26);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 28') {
	// 	mp.events.callRemote("mod", 23, 27);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 29') {
    //     mp.events.callRemote("mod", 23, 28);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 30') {
    //     mp.events.callRemote("mod", 23, 29);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 31') {
    //     mp.events.callRemote("mod", 23, 30);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 32') {
    //     mp.events.callRemote("mod", 23, 31);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 33') {
    //     mp.events.callRemote("mod", 23, 32);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 34') {
	// 	mp.events.callRemote("mod", 23, 33);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 35') {
    //     mp.events.callRemote("mod", 23, 34);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 36') {
    //     mp.events.callRemote("mod", 23, 35);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 37') {
    //     mp.events.callRemote("mod", 23, 36);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 38') {
    //     mp.events.callRemote("mod", 23, 37);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 39') {
	// 	mp.events.callRemote("mod", 23, 38);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 40') {
    //     mp.events.callRemote("mod", 23, 39);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 41') {
    //     mp.events.callRemote("mod", 23, 40);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 42') {
    //     mp.events.callRemote("mod", 23, 41);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 43') {
    //     mp.events.callRemote("mod", 23, 42);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 44') {
    //     mp.events.callRemote("mod", 23, 43);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 45') {
	// 	mp.events.callRemote("mod", 23, 44);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 46') {
    //     mp.events.callRemote("mod", 23, 45);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 47') {
    //     mp.events.callRemote("mod", 23, 46);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 48') {
    //     mp.events.callRemote("mod", 23, 47);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 49') {
    //     mp.events.callRemote("mod", 23, 48);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 50') {
	// 	mp.events.callRemote("mod", 23, 49);
    // }   else if (item.SelectedItem.DisplayText == 'FRad 51') {
    //     mp.events.callRemote("mod", 23, 50);
    // }
    });
    if (!ui.Visible) {
		ui.Open();
    }
});
}