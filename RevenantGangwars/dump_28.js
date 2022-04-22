{
// Native UI
const NativeUI = require("general/nativeui");
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
mp.events.add("playerCommand", (command) => {
    if (command.toLowerCase() === "tune") {
    const ui = new Menu("Tuning", "Tuning Parts", new Point(1480, 250));
    ui.AddItem(new UIMenuListItem(
        "Spoiler",
        "Change the spoiler of the vehicle",
        new ItemsCollection(["Spoiler -1", "Spoiler 0", "Spoiler 1", "Spoiler 2", "Spoiler 3", "Spoiler 4", "Spoiler 5", "Spoiler 6", "Spoiler 7", "Spoiler 8"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Front bumper",
        "Change the front bumper of the vehicle",
        new ItemsCollection(["FB -1", "FB 0", "FB 1", "FB 2", "FB 3", "FB 4", "FB 5", "FB 6", "FB 7", "FB 8", "FB 9", "FB 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Rear bumper",
        "Change the rear bumper of the vehicle",
        new ItemsCollection(["RB -1", "RB 0", "RB 1", "RB 2", "RB 3", "RB 4", "RB 5", "RB 6", "RB 7", "RB 8", "RB 9", "RB 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Side panel",
        "Change the side panels of the vehicle",
        new ItemsCollection(["SP -1", "SP 0", "SP 1", "SP 2", "SP 3", "SP 4", "SP 5", "SP 6", "SP 7", "SP 8", "SP 9", "SP 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Exhaust",
        "Change the exhaust of the vehicle",
        new ItemsCollection(["EX -1", "EX 0", "EX 1", "EX 2", "EX 3", "EX 4", "EX 5", "EX 6", "EX 7", "EX 8", "EX 9", "EX 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Frame",
        "Change the frame of the vehicle",
        new ItemsCollection(["FR -1", "FR 0", "FR 1", "FR 2", "FR 3", "FR 4", "FR 5", "FR 6", "FR 7", "FR 8", "FR 9", "FR 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Grille",
        "Change the grille of the vehicle",
        new ItemsCollection(["Grille  -1", "Grille 0", "Grille 1", "Grille 2", "Grille 3", "Grille 4", "Grille 5", "Grille 6", "Grille 7", "Grille 8", "Grille 9", "Grille 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Engine hood",
        "Change the hood of the vehicle",
        new ItemsCollection(["EH -1", "EH 0", "EH 1", "EH 2", "EH 3", "EH 4", "EH 5", "EH 6", "EH 7", "EH 8", "EH 9", "EH 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Left fender",
        "Change the left fender of the vehicle",
        new ItemsCollection(["LF -1", "LF 0", "LF 1", "LF 2", "LF 3", "LF 4", "LF 5", "LF 6", "LF 7", "LF 8", "LF 9", "LF 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Right fender",
        "Change the right fender of the vehicle",
        new ItemsCollection(["RF -1", "RF 0", "RF 1", "RF 2", "RF 3", "RF 4", "RF 5", "RF 6", "RF 7", "RF 8", "RF 9", "RF 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Roof",
        "Change the roof of the vehicle",
        new ItemsCollection(["R -1", "R 0", "R 1", "R 2", "R 3", "R 4", "R 5", "R 6", "R 7", "R 8", "R 9", "R 10"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Engine",
        "Change the engine of the vehicle",
        new ItemsCollection(["EG -1", "EG 0", "EG 1", "EG 2", "EG 3"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Brake",
        "Change the brakes of the vehicle",
        new ItemsCollection(["BR -1", "BR 0", "BR 1", "BR 2"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Transmission",
        "Change the transmission of the vehicle",
        new ItemsCollection(["TR -1", "TR 0", "TR 1", "TR 2"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Horn",
        "Change the horn of the vehicle",
        new ItemsCollection(["Horn -1", "Horn 0", "Horn 1", "Horn 2", "Horn 3", "Horn 4", "Horn 5", "Horn 6", "Horn 7", "Horn 8", "Horn 9", "Horn 10", "Horn 11", "Horn 12", "Horn 13", "Horn 14", "Horn 15", "Horn 16", "Horn 17", "Horn 18", "Horn 19", "Horn 20", "Horn 21", "Horn 21", "Horn 22", "Horn 23", "Horn 24", "Horn 25", "Horn 26", "Horn 27", "Horn 28", "Horn 29", "Horn 30", "Horn 31", "Horn 32", "Horn 33", "Horn 34", "Horn 35", "Horn 36", "Horn 37", "Horn 38", "Horn 39", "Horn 40", "Horn 41", "Horn 42", "Horn 43", "Horn 44", "Horn 45", "Horn 46", "Horn 47", "Horn 48", "Horn 49", "Horn 50", "Horn 51"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Suspension",
        "Change the suspension of the vehicle",
        new ItemsCollection(["SP -1", "SP 0", "SP 1", "SP 2", "SP 3",])
    ));
    ui.AddItem(new UIMenuListItem(
        "Armor",
        "Change the armor of the vehicle",
        new ItemsCollection(["AR -1", "AR 0", "AR 1", "AR 2", "AR 3", "AR 4",])
    ));
    ui.AddItem(new UIMenuListItem(
        "Turbo",
        "Change the turbo of the vehicle",
        new ItemsCollection(["TB -1", "TB 0"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Xeon",
        "Change the xeon headlights of the vehicle",
        new ItemsCollection(["X -1", "X 0"])
    ));
    ui.AddItem(new UIMenuListItem(
        "Wheels",
        "Change the wheels of the vehicle",
        new ItemsCollection(["Wheels-1", "Wheels 0", "Wheels 1", "Wheels 2", "Wheels 3", "Wheels 4", "Wheels 5", "Wheels 6", "Wheels 7", "Wheels 8", "Wheels 9", "Wheels 10", "Wheels 11", "Wheels 12", "Wheels 13", "Wheels 14", "Wheels 15", "Wheels 16", "Wheels 17", "Wheels 18", "Wheels 19", "Wheels 20", "Wheels 21", "Wheels 21", "Wheels 22", "Wheels 23", "Wheels 24", "Wheels 25", "Wheels 26", "Wheels 27", "Wheels 28", "Wheels 29", "Wheels 30", "Wheels 31", "Wheels 32", "Wheels 33", "Wheels 34", "Wheels 35", "Wheels 36", "Wheels 37", "Wheels 38", "Wheels 39", "Wheels 40", "Wheels 41", "Wheels 42", "Wheels 43", "Wheels 44", "Wheels 45", "Wheels 46", "Wheels 47", "Wheels 48", "Wheels 49", "Wheels 50"])
    ));
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
    }   else if (item.SelectedItem.DisplayText == 'FB -1') {
        mp.events.callRemote("mod", 1, -1);
    }   else if (item.SelectedItem.DisplayText == 'FB 0') {
        mp.events.callRemote("mod", 1, 0);
    }   else if (item.SelectedItem.DisplayText == 'FB 1') {
        mp.events.callRemote("mod", 1, 1);
    }   else if (item.SelectedItem.DisplayText == 'FB 2') {
        mp.events.callRemote("mod", 1, 2);
    }   else if (item.SelectedItem.DisplayText == 'FB 3') {
        mp.events.callRemote("mod", 1, 3);
    }   else if (item.SelectedItem.DisplayText == 'FB 4') {
        mp.events.callRemote("mod", 1, 4);
    }   else if (item.SelectedItem.DisplayText == 'FB 5') {
		mp.events.callRemote("mod", 1, 5);
    }   else if (item.SelectedItem.DisplayText == 'FB 6') {
        mp.events.callRemote("mod", 1, 6);
    }   else if (item.SelectedItem.DisplayText == 'FB 7') {
        mp.events.callRemote("mod", 1, 7);
    }   else if (item.SelectedItem.DisplayText == 'FB 8') {
        mp.events.callRemote("mod", 1, 8);
    }   else if (item.SelectedItem.DisplayText == 'FB 9') {
        mp.events.callRemote("mod", 1, 9);
    }   else if (item.SelectedItem.DisplayText == 'FB 10') {
        mp.events.callRemote("mod", 1, 10);
        // Rear Bumper
    }   else if (item.SelectedItem.DisplayText == 'RB -1') {
        mp.events.callRemote("mod", 2, -1);
    }   else if (item.SelectedItem.DisplayText == 'RB 0') {
		mp.events.callRemote("mod", 2, 0);
    }   else if (item.SelectedItem.DisplayText == 'RB 1') {
        mp.events.callRemote("mod", 2, 1);
    }   else if (item.SelectedItem.DisplayText == 'RB 2') {
        mp.events.callRemote("mod", 2, 2);
    }   else if (item.SelectedItem.DisplayText == 'RB 3') {
        mp.events.callRemote("mod", 2, 3);
    }   else if (item.SelectedItem.DisplayText == 'RB 4') {
        mp.events.callRemote("mod", 2, 4);
    }   else if (item.SelectedItem.DisplayText == 'RB 5') {
		mp.events.callRemote("mod", 2, 5);
    }   else if (item.SelectedItem.DisplayText == 'RB 6') {
        mp.events.callRemote("mod", 2, 6);
    }   else if (item.SelectedItem.DisplayText == 'RB 7') {
        mp.events.callRemote("mod", 2, 7);
    }   else if (item.SelectedItem.DisplayText == 'RB 8') {
        mp.events.callRemote("mod", 2, 8);
    }   else if (item.SelectedItem.DisplayText == 'RB 9') {
        mp.events.callRemote("mod", 2, 9);
    }   else if (item.SelectedItem.DisplayText == 'RB 10') {
        mp.events.callRemote("mod", 2, 10);
        // Side Bumper
    }   else if (item.SelectedItem.DisplayText == 'SP -1') {
        mp.events.callRemote("mod", 3, -1);
    }   else if (item.SelectedItem.DisplayText == 'SP 0') {
        mp.events.callRemote("mod", 3, 0);
    }   else if (item.SelectedItem.DisplayText == 'SP 1') {
        mp.events.callRemote("mod", 3, 1);
    }   else if (item.SelectedItem.DisplayText == 'SP 2') {
        mp.events.callRemote("mod", 3, 2);
    }   else if (item.SelectedItem.DisplayText == 'SP 3') {
        mp.events.callRemote("mod", 3, 3);
    }   else if (item.SelectedItem.DisplayText == 'SP 4') {
        mp.events.callRemote("mod", 3, 4);
    }   else if (item.SelectedItem.DisplayText == 'SP 5') {
		mp.events.callRemote("mod", 3, 5);
    }   else if (item.SelectedItem.DisplayText == 'SP 6') {
        mp.events.callRemote("mod", 3, 6);
    }   else if (item.SelectedItem.DisplayText == 'SP 7') {
        mp.events.callRemote("mod", 3, 7);
    }   else if (item.SelectedItem.DisplayText == 'SP 8') {
        mp.events.callRemote("mod", 3, 8);
    }   else if (item.SelectedItem.DisplayText == 'SP 9') {
        mp.events.callRemote("mod", 3, 9);
    }   else if (item.SelectedItem.DisplayText == 'SP 10') {
        mp.events.callRemote("mod", 3, 10);
        // Exhaust
    }   else if (item.SelectedItem.DisplayText == 'AP -1') {
        mp.events.callRemote("mod", 4, -1);
    }   else if (item.SelectedItem.DisplayText == 'EX 0') {
        mp.events.callRemote("mod", 4, 0);
    }   else if (item.SelectedItem.DisplayText == 'EX 1') {
        mp.events.callRemote("mod", 4, 1);
    }   else if (item.SelectedItem.DisplayText == 'EX 2') {
        mp.events.callRemote("mod", 4, 2);
    }   else if (item.SelectedItem.DisplayText == 'EX 3') {
        mp.events.callRemote("mod", 4, 3);
    }   else if (item.SelectedItem.DisplayText == 'EX 4') {
        mp.events.callRemote("mod", 4, 4);
    }   else if (item.SelectedItem.DisplayText == 'EX 5') {
		mp.events.callRemote("mod", 4, 5);
    }   else if (item.SelectedItem.DisplayText == 'EX 6') {
        mp.events.callRemote("mod", 4, 6);
    }   else if (item.SelectedItem.DisplayText == 'EX 7') {
        mp.events.callRemote("mod", 4, 7);
    }   else if (item.SelectedItem.DisplayText == 'EX 8') {
        mp.events.callRemote("mod", 4, 8);
    }   else if (item.SelectedItem.DisplayText == 'EX 9') {
        mp.events.callRemote("mod", 4, 9);
    }   else if (item.SelectedItem.DisplayText == 'EX 10') {
        mp.events.callRemote("mod", 4, 10);
        // Frame
    }   else if (item.SelectedItem.DisplayText == 'FR -1') {
        mp.events.callRemote("mod", 5, -1);
    }   else if (item.SelectedItem.DisplayText == 'FR 0') {
        mp.events.callRemote("mod", 5, 0);
    }   else if (item.SelectedItem.DisplayText == 'FR 1') {
        mp.events.callRemote("mod", 5, 1);
    }   else if (item.SelectedItem.DisplayText == 'FR 2') {
        mp.events.callRemote("mod", 5, 2);
    }   else if (item.SelectedItem.DisplayText == 'FR 3') {
        mp.events.callRemote("mod", 5, 3);
    }   else if (item.SelectedItem.DisplayText == 'FR 4') {
        mp.events.callRemote("mod", 5, 4);
    }   else if (item.SelectedItem.DisplayText == 'FR 5') {
		mp.events.callRemote("mod", 5, 5);
    }   else if (item.SelectedItem.DisplayText == 'FR 6') {
        mp.events.callRemote("mod", 5, 6);
    }   else if (item.SelectedItem.DisplayText == 'FR 7') {
        mp.events.callRemote("mod", 5, 7);
    }   else if (item.SelectedItem.DisplayText == 'FR 8') {
        mp.events.callRemote("mod", 5, 8);
    }   else if (item.SelectedItem.DisplayText == 'FR 9') {
        mp.events.callRemote("mod", 5, 9);
    }   else if (item.SelectedItem.DisplayText == 'FR 10') {
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
    }   else if (item.SelectedItem.DisplayText == 'EH -1') {
        mp.events.callRemote("mod", 7, -1);
    }   else if (item.SelectedItem.DisplayText == 'EH 0') {
        mp.events.callRemote("mod", 7, 0);
    }   else if (item.SelectedItem.DisplayText == 'EH 1') {
        mp.events.callRemote("mod", 7, 1);
    }   else if (item.SelectedItem.DisplayText == 'EH 2') {
        mp.events.callRemote("mod", 7, 2);
    }   else if (item.SelectedItem.DisplayText == 'EH 3') {
        mp.events.callRemote("mod", 7, 3);
    }   else if (item.SelectedItem.DisplayText == 'EH 4') {
        mp.events.callRemote("mod", 7, 4);
    }   else if (item.SelectedItem.DisplayText == 'EH 5') {
		mp.events.callRemote("mod", 7, 5);
    }   else if (item.SelectedItem.DisplayText == 'EH 6') {
        mp.events.callRemote("mod", 7, 6);
    }   else if (item.SelectedItem.DisplayText == 'EH 7') {
        mp.events.callRemote("mod", 7, 7);
    }   else if (item.SelectedItem.DisplayText == 'EH 8') {
        mp.events.callRemote("mod", 7, 8);
    }   else if (item.SelectedItem.DisplayText == 'EH 9') {
        mp.events.callRemote("mod", 7, 9);
    }   else if (item.SelectedItem.DisplayText == 'EH 10') {
        mp.events.callRemote("mod", 7, 10);
        // Fender
    }   else if (item.SelectedItem.DisplayText == 'LF -1') {
        mp.events.callRemote("mod", 8, -1);
    }   else if (item.SelectedItem.DisplayText == 'LF 0') {
        mp.events.callRemote("mod", 8, 0);
    }   else if (item.SelectedItem.DisplayText == 'LF 1') {
        mp.events.callRemote("mod", 8, 1);
    }   else if (item.SelectedItem.DisplayText == 'LF 2') {
        mp.events.callRemote("mod", 8, 2);
    }   else if (item.SelectedItem.DisplayText == 'LF 3') {
        mp.events.callRemote("mod", 8, 3);
    }   else if (item.SelectedItem.DisplayText == 'LF 4') {
        mp.events.callRemote("mod", 8, 4);
    }   else if (item.SelectedItem.DisplayText == 'LF 5') {
		mp.events.callRemote("mod", 8, 5);
    }   else if (item.SelectedItem.DisplayText == 'LF 6') {
        mp.events.callRemote("mod", 8, 6);
    }   else if (item.SelectedItem.DisplayText == 'LF 7') {
        mp.events.callRemote("mod", 8, 7);
    }   else if (item.SelectedItem.DisplayText == 'LF 8') {
        mp.events.callRemote("mod", 8, 8);
    }   else if (item.SelectedItem.DisplayText == 'LF 9') {
        mp.events.callRemote("mod", 8, 9);
    }   else if (item.SelectedItem.DisplayText == 'LF 10') {
        mp.events.callRemote("mod", 8, 10);
        // Right Fender
    }   else if (item.SelectedItem.DisplayText == 'RF -1') {
        mp.events.callRemote("mod", 9, -1);
    }   else if (item.SelectedItem.DisplayText == 'RF 0') {
        mp.events.callRemote("mod", 9, 0);
    }   else if (item.SelectedItem.DisplayText == 'RF 1') {
        mp.events.callRemote("mod", 9, 1);
    }   else if (item.SelectedItem.DisplayText == 'RF 2') {
        mp.events.callRemote("mod", 9, 2);
    }   else if (item.SelectedItem.DisplayText == 'RF 3') {
        mp.events.callRemote("mod", 9, 3);
    }   else if (item.SelectedItem.DisplayText == 'RF 4') {
        mp.events.callRemote("mod", 9, 4);
    }   else if (item.SelectedItem.DisplayText == 'RF 5') {
		mp.events.callRemote("mod", 9, 5);
    }   else if (item.SelectedItem.DisplayText == 'RF 6') {
        mp.events.callRemote("mod", 9, 6);
    }   else if (item.SelectedItem.DisplayText == 'RF 7') {
        mp.events.callRemote("mod", 9, 7);
    }   else if (item.SelectedItem.DisplayText == 'RF 8') {
        mp.events.callRemote("mod", 9, 8);
    }   else if (item.SelectedItem.DisplayText == 'RF 9') {
        mp.events.callRemote("mod", 9, 9);
    }   else if (item.SelectedItem.DisplayText == 'RF 10') {
        mp.events.callRemote("mod", 9, 10);
        // Roof
    }   else if (item.SelectedItem.DisplayText == 'R -1') {
        mp.events.callRemote("mod", 10, -1);
    }   else if (item.SelectedItem.DisplayText == 'R 0') {
        mp.events.callRemote("mod", 10, 0);
    }   else if (item.SelectedItem.DisplayText == 'R 1') {
        mp.events.callRemote("mod", 10, 1);
    }   else if (item.SelectedItem.DisplayText == 'R 2') {
        mp.events.callRemote("mod", 10, 2);
    }   else if (item.SelectedItem.DisplayText == 'R 3') {
        mp.events.callRemote("mod", 10, 3);
    }   else if (item.SelectedItem.DisplayText == 'R 4') {
        mp.events.callRemote("mod", 10, 4);
    }   else if (item.SelectedItem.DisplayText == 'R 5') {
		mp.events.callRemote("mod", 10, 5);
    }   else if (item.SelectedItem.DisplayText == 'R 6') {
        mp.events.callRemote("mod", 10, 6);
    }   else if (item.SelectedItem.DisplayText == 'R 7') {
        mp.events.callRemote("mod", 10, 7);
    }   else if (item.SelectedItem.DisplayText == 'R 8') {
        mp.events.callRemote("mod", 10, 8);
    }   else if (item.SelectedItem.DisplayText == 'R 9') {
        mp.events.callRemote("mod", 10, 9);
    }   else if (item.SelectedItem.DisplayText == 'R 10') {
        mp.events.callRemote("mod", 10, 10);
        // Engine
    }   else if (item.SelectedItem.DisplayText == 'EG -1') {
        mp.events.callRemote("mod", 11, -1);
    }   else if (item.SelectedItem.DisplayText == 'EG 0') {
        mp.events.callRemote("mod", 11, 0);
    }   else if (item.SelectedItem.DisplayText == 'EG 1') {
        mp.events.callRemote("mod", 11, 1);
    }   else if (item.SelectedItem.DisplayText == 'EG 2') {
        mp.events.callRemote("mod", 11, 2);
    }   else if (item.SelectedItem.DisplayText == 'EG 3') {
        mp.events.callRemote("mod", 11, 3);
    }   else if (item.SelectedItem.DisplayText == 'EG 4') {
        mp.events.callRemote("mod", 11, 4);
        //Brakes
    }   else if (item.SelectedItem.DisplayText == 'BR -1') {
        mp.events.callRemote("mod", 12, -1);
    }   else if (item.SelectedItem.DisplayText == 'BR 0') {
        mp.events.callRemote("mod", 12, 0);
    }   else if (item.SelectedItem.DisplayText == 'BR 1') {
        mp.events.callRemote("mod", 12, 1);
    }   else if (item.SelectedItem.DisplayText == 'BR 2') {
        mp.events.callRemote("mod", 12, 2);
    }   else if (item.SelectedItem.DisplayText == 'BR 3') {
        // Transmission
    }   else if (item.SelectedItem.DisplayText == 'TR -1') {
        mp.events.callRemote("mod", 13, -1);
    }   else if (item.SelectedItem.DisplayText == 'TR 0') {
		mp.events.callRemote("mod", 13, 0);
    }   else if (item.SelectedItem.DisplayText == 'TR 1') {
        mp.events.callRemote("mod", 13, 1);
    }   else if (item.SelectedItem.DisplayText == 'TR 2') {
        mp.events.callRemote("mod", 13, 2);
    }   else if (item.SelectedItem.DisplayText == 'TR 3') {
        // Horn
    }   else if (item.SelectedItem.DisplayText == 'Horn -1') {
        mp.events.callRemote("mod", 14, -1);
    }   else if (item.SelectedItem.DisplayText == 'Horn 0') {
		mp.events.callRemote("mod", 14, 0);
    }   else if (item.SelectedItem.DisplayText == 'Horn 1') {
        mp.events.callRemote("mod", 14, 1);
    }   else if (item.SelectedItem.DisplayText == 'Horn 2') {
        mp.events.callRemote("mod", 14, 2);
    }   else if (item.SelectedItem.DisplayText == 'Horn 3') {
        mp.events.callRemote("mod", 14, 3);
    }   else if (item.SelectedItem.DisplayText == 'Horn 4') {
        mp.events.callRemote("mod", 14, 4);
    }   else if (item.SelectedItem.DisplayText == 'Horn 5') {
		mp.events.callRemote("mod", 14, 5);
    }   else if (item.SelectedItem.DisplayText == 'Horn 6') {
        mp.events.callRemote("mod", 14, 6);
    }   else if (item.SelectedItem.DisplayText == 'Horn 7') {
        mp.events.callRemote("mod", 14, 7);
    }   else if (item.SelectedItem.DisplayText == 'Horn 8') {
        mp.events.callRemote("mod", 14, 8);
    }   else if (item.SelectedItem.DisplayText == 'Horn 9') {
        mp.events.callRemote("mod", 14, 9);
    }   else if (item.SelectedItem.DisplayText == 'Horn 10') {
        mp.events.callRemote("mod", 14, 10);
    }   else if (item.SelectedItem.DisplayText == 'Horn 11') {
		mp.events.callRemote("mod", 14, 11);
    }   else if (item.SelectedItem.DisplayText == 'Horn 12') {
        mp.events.callRemote("mod", 14, 12);
    }   else if (item.SelectedItem.DisplayText == 'Horn 13') {
        mp.events.callRemote("mod", 14, 13);
    }   else if (item.SelectedItem.DisplayText == 'Horn 14') {
        mp.events.callRemote("mod", 14, 14);
    }   else if (item.SelectedItem.DisplayText == 'Horn 15') {
        mp.events.callRemote("mod", 14, 15);
    }   else if (item.SelectedItem.DisplayText == 'Horn 16') {
		mp.events.callRemote("mod", 14, 16);
    }   else if (item.SelectedItem.DisplayText == 'Horn 17') {
        mp.events.callRemote("mod", 14, 17);
    }   else if (item.SelectedItem.DisplayText == 'Horn 18') {
        mp.events.callRemote("mod", 14, 18);
    }   else if (item.SelectedItem.DisplayText == 'Horn 19') {
        mp.events.callRemote("mod", 14, 19);
    }   else if (item.SelectedItem.DisplayText == 'Horn 22') {
        mp.events.callRemote("mod", 14, 20);
    }   else if (item.SelectedItem.DisplayText == 'Horn 21') {
        mp.events.callRemote("mod", 14, 21);
    }   else if (item.SelectedItem.DisplayText == 'Horn 22') {
		mp.events.callRemote("mod", 14, 22);
    }   else if (item.SelectedItem.DisplayText == 'Horn 23') {
        mp.events.callRemote("mod", 14, 23);
    }   else if (item.SelectedItem.DisplayText == 'Horn 24') {
        mp.events.callRemote("mod", 14, 24);
    }   else if (item.SelectedItem.DisplayText == 'Horn 25') {
        mp.events.callRemote("mod", 14, 25);
    }   else if (item.SelectedItem.DisplayText == 'Horn 26') {
        mp.events.callRemote("mod", 14, 26);
    }   else if (item.SelectedItem.DisplayText == 'Horn 28') {
		mp.events.callRemote("mod", 14, 27);
    }   else if (item.SelectedItem.DisplayText == 'Horn 29') {
        mp.events.callRemote("mod", 14, 28);
    }   else if (item.SelectedItem.DisplayText == 'Horn 30') {
        mp.events.callRemote("mod", 14, 29);
    }   else if (item.SelectedItem.DisplayText == 'Horn 31') {
        mp.events.callRemote("mod", 14, 30);
    }   else if (item.SelectedItem.DisplayText == 'Horn 32') {
        mp.events.callRemote("mod", 14, 31);
    }   else if (item.SelectedItem.DisplayText == 'Horn 33') {
        mp.events.callRemote("mod", 14, 32);
    }   else if (item.SelectedItem.DisplayText == 'Horn 34') {
		mp.events.callRemote("mod", 14, 33);
    }   else if (item.SelectedItem.DisplayText == 'Horn 35') {
        mp.events.callRemote("mod", 14, 34);
    }   else if (item.SelectedItem.DisplayText == 'Horn 36') {
        mp.events.callRemote("mod", 14, 35);
    }   else if (item.SelectedItem.DisplayText == 'Horn 37') {
        mp.events.callRemote("mod", 14, 36);
    }   else if (item.SelectedItem.DisplayText == 'Horn 38') {
        mp.events.callRemote("mod", 14, 37);
    }   else if (item.SelectedItem.DisplayText == 'Horn 39') {
		mp.events.callRemote("mod", 14, 38);
    }   else if (item.SelectedItem.DisplayText == 'Horn 40') {
        mp.events.callRemote("mod", 14, 39);
    }   else if (item.SelectedItem.DisplayText == 'Horn 41') {
        mp.events.callRemote("mod", 14, 40);
    }   else if (item.SelectedItem.DisplayText == 'Horn 42') {
        mp.events.callRemote("mod", 14, 41);
    }   else if (item.SelectedItem.DisplayText == 'Horn 43') {
        mp.events.callRemote("mod", 14, 42);
    }   else if (item.SelectedItem.DisplayText == 'Horn 44') {
        mp.events.callRemote("mod", 14, 43);
    }   else if (item.SelectedItem.DisplayText == 'Horn 45') {
		mp.events.callRemote("mod", 14, 44);
    }   else if (item.SelectedItem.DisplayText == 'Horn 46') {
        mp.events.callRemote("mod", 14, 45);
    }   else if (item.SelectedItem.DisplayText == 'Horn 47') {
        mp.events.callRemote("mod", 14, 46);
    }   else if (item.SelectedItem.DisplayText == 'Horn 48') {
        mp.events.callRemote("mod", 14, 47);
    }   else if (item.SelectedItem.DisplayText == 'Horn 49') {
        mp.events.callRemote("mod", 14, 48);
    }   else if (item.SelectedItem.DisplayText == 'Horn 50') {
		mp.events.callRemote("mod", 14, 49);
    }   else if (item.SelectedItem.DisplayText == 'Horn 51') {
        mp.events.callRemote("mod", 14, 50);
    }   else if (item.SelectedItem.DisplayText == 'Horn 52') {
        mp.events.callRemote("mod", 14, 51);
        // Suspension
    }   else if (item.SelectedItem.DisplayText == 'SP -1') {
		mp.events.callRemote("mod", 15, -1);
    }   else if (item.SelectedItem.DisplayText == 'SP 0') {
        mp.events.callRemote("mod", 15, 0);
    }   else if (item.SelectedItem.DisplayText == 'SP 1') {
        mp.events.callRemote("mod", 15, 1);
    }   else if (item.SelectedItem.DisplayText == 'SP 2') {
        mp.events.callRemote("mod", 15, 2);
    }   else if (item.SelectedItem.DisplayText == 'SP 3') {
        mp.events.callRemote("mod", 15, 3);
        // Armor
    }   else if (item.SelectedItem.DisplayText == 'AR -1') {
		mp.events.callRemote("mod", 16, -1);
    }   else if (item.SelectedItem.DisplayText == 'AR 0') {
        mp.events.callRemote("mod", 16, 0);
    }   else if (item.SelectedItem.DisplayText == 'AR 3') {
        mp.events.callRemote("mod", 16, 1);
    }   else if (item.SelectedItem.DisplayText == 'AR 4') {
        mp.events.callRemote("mod", 16, 2);
    }   else if (item.SelectedItem.DisplayText == 'AR 5') {
        mp.events.callRemote("mod", 16, 3);
    }   else if (item.SelectedItem.DisplayText == 'AR 6') {
        mp.events.callRemote("mod", 16, 4);
        // Turbo
    }   else if (item.SelectedItem.DisplayText == 'TB -1') {
		mp.events.callRemote("mod", 18, -1);
    }   else if (item.SelectedItem.DisplayText == 'TB 0') {
        mp.events.callRemote("mod", 18, 0);
        // Xeon
    }   else if (item.SelectedItem.DisplayText == 'X -1') {
		mp.events.callRemote("mod", 22, -1);
    }   else if (item.SelectedItem.DisplayText == 'X 0') {
        mp.events.callRemote("mod", 22, 0);
        // Front Wheels
    }   else if (item.SelectedItem.DisplayText == 'Wheels -1') {
        mp.events.callRemote("mod", 23, -1);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 0') {
		mp.events.callRemote("mod", 23, 0);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 1') {
        mp.events.callRemote("mod", 23, 1);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 2') {
        mp.events.callRemote("mod", 23, 2);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 3') {
        mp.events.callRemote("mod", 23, 3);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 4') {
        mp.events.callRemote("mod", 23, 4);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 5') {
		mp.events.callRemote("mod", 23, 5);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 6') {
        mp.events.callRemote("mod", 23, 6);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 7') {
        mp.events.callRemote("mod", 23, 7);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 8') {
        mp.events.callRemote("mod", 23, 8);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 9') {
        mp.events.callRemote("mod", 23, 9);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 10') {
        mp.events.callRemote("mod", 23, 10);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 11') {
		mp.events.callRemote("mod", 23, 11);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 12') {
        mp.events.callRemote("mod", 23, 12);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 13') {
        mp.events.callRemote("mod", 23, 13);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 14') {
        mp.events.callRemote("mod", 23, 14);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 15') {
        mp.events.callRemote("mod", 23, 15);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 16') {
		mp.events.callRemote("mod", 23, 16);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 17') {
        mp.events.callRemote("mod", 23, 17);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 18') {
        mp.events.callRemote("mod", 23, 18);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 19') {
        mp.events.callRemote("mod", 23, 19);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 22') {
        mp.events.callRemote("mod", 23, 20);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 21') {
        mp.events.callRemote("mod", 23, 21);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 22') {
		mp.events.callRemote("mod", 23, 22);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 23') {
        mp.events.callRemote("mod", 23, 23);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 24') {
        mp.events.callRemote("mod", 23, 24);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 25') {
        mp.events.callRemote("mod", 23, 25);
    }   else if (item.SelectedItem.DisplayText == 'Wheels -1') {
        mp.events.callRemote("mod", 23, -1);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 0') {
		mp.events.callRemote("mod", 23, 0);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 1') {
        mp.events.callRemote("mod", 23, 1);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 2') {
        mp.events.callRemote("mod", 23, 2);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 3') {
        mp.events.callRemote("mod", 23, 3);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 4') {
        mp.events.callRemote("mod", 23, 4);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 5') {
		mp.events.callRemote("mod", 23, 5);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 6') {
        mp.events.callRemote("mod", 23, 6);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 7') {
        mp.events.callRemote("mod", 23, 7);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 8') {
        mp.events.callRemote("mod", 23, 8);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 9') {
        mp.events.callRemote("mod", 23, 9);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 10') {
        mp.events.callRemote("mod", 23, 10);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 11') {
		mp.events.callRemote("mod", 23, 11);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 12') {
        mp.events.callRemote("mod", 23, 12);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 13') {
        mp.events.callRemote("mod", 23, 13);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 14') {
        mp.events.callRemote("mod", 23, 14);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 15') {
        mp.events.callRemote("mod", 23, 15);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 16') {
		mp.events.callRemote("mod", 23, 16);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 17') {
        mp.events.callRemote("mod", 23, 17);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 18') {
        mp.events.callRemote("mod", 23, 18);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 19') {
        mp.events.callRemote("mod", 23, 19);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 22') {
        mp.events.callRemote("mod", 23, 20);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 21') {
        mp.events.callRemote("mod", 23, 21);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 22') {
		mp.events.callRemote("mod", 23, 22);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 23') {
        mp.events.callRemote("mod", 23, 23);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 24') {
        mp.events.callRemote("mod", 23, 24);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 25') {
        mp.events.callRemote("mod", 23, 25);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 26') {
        mp.events.callRemote("mod", 23, 26);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 28') {
		mp.events.callRemote("mod", 23, 27);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 29') {
        mp.events.callRemote("mod", 23, 28);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 30') {
        mp.events.callRemote("mod", 23, 29);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 31') {
        mp.events.callRemote("mod", 23, 30);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 32') {
        mp.events.callRemote("mod", 23, 31);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 33') {
        mp.events.callRemote("mod", 23, 32);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 34') {
		mp.events.callRemote("mod", 23, 33);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 35') {
        mp.events.callRemote("mod", 23, 34);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 36') {
        mp.events.callRemote("mod", 23, 35);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 37') {
        mp.events.callRemote("mod", 23, 36);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 38') {
        mp.events.callRemote("mod", 23, 37);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 39') {
		mp.events.callRemote("mod", 23, 38);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 40') {
        mp.events.callRemote("mod", 23, 39);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 41') {
        mp.events.callRemote("mod", 23, 40);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 42') {
        mp.events.callRemote("mod", 23, 41);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 43') {
        mp.events.callRemote("mod", 23, 42);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 44') {
        mp.events.callRemote("mod", 23, 43);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 45') {
		mp.events.callRemote("mod", 23, 44);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 46') {
        mp.events.callRemote("mod", 23, 45);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 47') {
        mp.events.callRemote("mod", 23, 46);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 48') {
        mp.events.callRemote("mod", 23, 47);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 49') {
        mp.events.callRemote("mod", 23, 48);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 50') {
		mp.events.callRemote("mod", 23, 49);
    }   else if (item.SelectedItem.DisplayText == 'Wheels 51') {
        mp.events.callRemote("mod", 23, 50);
    }
    });
}
});
}