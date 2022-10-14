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

const modTypes = {0: "Spoilers", 
    1: "Front Bumper", 
    2: "Rear Bumper", 
    3: "Side Skirt", 
    4: "Exhaust", 
    5: "Frame", 
    6: "Grille", 
    7: "Hood", 
    8: "Fender", 
    9: "Right Fender", 
    10: "Roof", 
    11: "Engine", 
    12: "Brakes", 
    13: "Transmission", 
    14: "Horns", // 0 to 57
    15: "Suspension", 
    16: "Armor", 
    18: "Turbo", 
    22: "Xenon", 
    23: "Wheels", 
    24: "Back Wheels", // Only for motorcycles
    25: "Plate holders", 
    27: "Trim Design", 
    28: "Ornaments", 
    30: "Dial Design", 
    33: "Steering Wheel", 
    34: "Shift Lever", 
    35: "Plaques", 
    38: "Hydraulics", 
    40: "Boost", 
    55: "Window Tint",
    48: "Livery", 
    53: "Plate", 
    66: "Primary Colour", // 0-159
    67: "Secondary Colour",  // 0-159
    68: "Pearlescent Colour", // 0-159
    56: "Wheel Type", // -1 to 11
    69: "Wheel Colour", // 0-159
};

var vTuner_Items = [];
var vTuner_Main = new Menu('Tune Vehicle', 'Start modding', new Point(50, 50));
var vTuner_Buy = null;
var vTuner_Exit = null;
var vTuner_VehicleID = -1;
var vTuner_OtherMods = {}; // FOR MODS THAT CAN'T BE .GETMOD() LIKE PLATE AND WINDOW TINT

traceLastFunc("vTuner::Config()");

mp.events.add('entityStreamIn', (entity) => {
    if (vTuner_VehicleID != -1 && entity.type === 'vehicle' && entity.remoteId == vTuner_VehicleID) 
    {
        if(mp.players.local.isInAnyVehicle(false) == false)
        {
            mp.events.callRemote("TunerRequestDrive", entity);
        }
    }
});

mp.events.add('SetOtherMods', (modID, value) => vTuner_OtherMods[modID] = value);
mp.events.add('ModRequestComplete', () => {
    if(vTuner_VehicleID != -1 && vTuner_Main.Visible && mp.players.local.isInAnyVehicle(false))
    {
        let modItems = {};
        let vehicle = mp.players.local.vehicle;
        for(let slots in modTypes)
        {
            let mod = vehicle.getMod(Number(slots));
            if(mod != -1) modItems[slots] = mod;
        }
        for(let slots in vTuner_OtherMods)
        {
            if(vTuner_OtherMods[slots] != -1) modItems[slots] = vTuner_OtherMods[slots]; // FOR PLATES, AND TINTS THAT CAN'T BE .GETMOD
        }

        mp.events.callRemoteUnreliable("RequestVehicleModPrice", JSON.stringify(modItems));
    }
});

function getModPartNameHook(slot, item)
{
    let name = item.toString();

    if(slot == 56) // Wheels
    {
        switch(item)
        {
            case -1:
                name = "Stock";
                break;
            case 0:
                name = "Sports";
                break;
            case 1:
                name = "Muscle";
                break;
            case 2:
                name = "Lowrider";
                break;
            case 3:
                name = "SUV";
                break;
            case 4:
                name = "Offroad";
                break;
            case 5:
                name = "Tuner";
                break;
            case 6:
                name = "Bike Wheels";
                break;
            case 7:
                name = "High End";
                break;
            case 8:
                name = "Benny's Original";
                break;
            case 9:
                name = "Benny's Bespoke";
            case 10:
                name = "Open Wheel";
                break;
            case 11:
                name = "Street";
                break;
        }
    }
    return name;
}

mp.events.add('OpenTuner', (vid) => {

    vTuner_VehicleID = vid;

    if(!mp.players.local.isInAnyVehicle(false)) return;
    if(vid != -1 && (mp.players.local.vehicle.remoteId != vid || vTuner_Main.Visible))
    {
        return;
    }

    traceLastFunc("vTuner::Open()");
    for(let i = 0; i < vTuner_Items.length; i++)
    {
        vTuner_Main.RemoveItem(vTuner_Items[i]);
        delete vTuner_Items[i].Trigger;
        delete vTuner_Items[i].ItemNames;
        delete vTuner_Items[i].SlotID;
        vTuner_Items[i] = null;
    }
    delete vTuner_Items;
    vTuner_Items = [];

    let vehicle = mp.players.local.vehicle;
    for(let slots in modTypes)
    {
        let num = vehicle.getNumMods(Number(slots));
        if(Number(slots) >= 66) num = 160;

        if(Number(slots) == 56) num = 12; // Wheels -1 to 11
        if(Number(slots) == 53) num = 5; // Plates 0 to 5 + none even tho its same as 0
        if(Number(slots) == 18 || Number(slots) == 22) num = 1; // Since getNumMods doesn't work in this and ALL cars get Xenon & Turbo

        if(vTuner_VehicleID != -1 && (Number(slots) == 11 || Number(slots) == 12 || Number(slots) == 13 || Number(slots) == 16 || 
        Number(slots) == 18)) num = -1; // NO WIN PARTS IN TUNING FOR COPCHASE ITEMS

        if(num > 0)
        {
            let catItems = [];
            for(let i = -1; i < num; i++)
            {
                let name = "None";
                if(i != -1)
                {
                    if(vehicle.getModTextLabel(Number(slots), i) != undefined)
                    {
                        name = mp.game.ui.getLabelText(vehicle.getModTextLabel(Number(slots), i));
                    }
                    else name = i.toString();
                }
                else if(Number(slots) >= 66) continue; // Don't want -1 aka "None" in any colours since it does nothing.

                if(Number(slots) == 56)
                {
                    name = getModPartNameHook(Number(slots), i);
                }
                if(Number(slots) == 22)
                {
                    if(i == 0){
                        name = "Yes";
                    }
                    else name = "No";
                }

                catItems.push(name);
            }

            let cursor = vehicle.getMod(Number(slots))+1;
            if(vTuner_OtherMods[Number(slots)] != undefined) cursor = vTuner_OtherMods[Number(slots)]+1;

            if (Number(slots) == 66) cursor = vehicle.getColours(1, 1).colorPrimary;
            else if (Number(slots) == 67) cursor = vehicle.getColours(1, 1).colorSecondary;
            else if (Number(slots) == 68) cursor = vehicle.getExtraColours(1, 1).pearlescentColor;
            else if (Number(slots) == 69) cursor = vehicle.getExtraColours(1, 1).wheelColor;
            //else if (Number(slots) == 56) cursor = vehicle.getWheelType();
            
            let vTuner_Category = new UIMenuListItem(modTypes[slots], "", new ItemsCollection(catItems), cursor);
            
            vTuner_Category.ItemNames = JSON.parse(JSON.stringify(catItems));

            vTuner_Category.SlotID = JSON.parse(JSON.stringify(Number(slots)));
            
            vTuner_Category.Trigger = (function () {
                if(vTuner_VehicleID != -1) 
                {
                    vTuner_Buy.Text = vTuner_Buy.Text + '..';
                    //vTuner_Buy.ForeColor = new Color(189, 28, 17);
                }
                let selection = -1;
                for(let i = 0; i < vTuner_Category.ItemNames.length; i++)
                {
                    if(vTuner_Category.ItemNames[i] == vTuner_Category.SelectedValue)
                    {
                        selection = i-1;
                        break;
                    }
                }
                if(vTuner_Category.SlotID >= 66) selection += 1;
                if(vTuner_Category.SlotID == 53 || vTuner_Category.SlotID == 55 || vTuner_Category.SlotID == 56) vTuner_OtherMods[vTuner_Category.SlotID] = selection;

                mp.events.callRemote('RequestVehicleMod', vTuner_Category.SlotID, selection);
            });

            vTuner_Main.AddItem(vTuner_Category);
            vTuner_Items.push(vTuner_Category);
        }
    }

    if(vid != -1)
    {
        vTuner_Buy = new UIMenuItem("Buy: N/A", "No components upgraded.");
        vTuner_Buy.ForeColor = new Color(220, 10, 10);
        vTuner_Main.AddItem(vTuner_Buy);
        vTuner_Items.push(vTuner_Buy);
    }

    vTuner_Exit = new UIMenuItem("Exit", "Leave the editor.");
    vTuner_Exit.ForeColor = new Color(127, 237, 28);
    vTuner_Main.AddItem(vTuner_Exit);
    vTuner_Items.push(vTuner_Exit);

    activateChat(false);

    vTuner_Main.Open();
    mp.events.callLocal("AddTooltip", "M1", "Switch camera", 0);
});

mp.events.add('UpdateTunerPrice', (pricestr, descstr, r = 220, g = 10, b = 10) => {
    if(vTuner_Main.Visible && vTuner_VehicleID != -1 && vTuner_Buy != null)
    {
        vTuner_Buy.Text = pricestr;
        vTuner_Buy.Description = descstr;
        vTuner_Buy.ForeColor = new Color(r, g, b);
    }
});

vTuner_Main.ListChange.on((item, listIndex) => {
    item.Trigger(); // Cuz we can, OOP magick
});

vTuner_Main.ItemSelect.on((item, index) => {
    
    if(item.Text.startsWith("Exit")) vTuner_Main.Close();
    else if(item.Text.startsWith("Buy: ") && vTuner_VehicleID != -1)
    {
        let modItems = {};
        let vehicle = mp.players.local.vehicle;
        for(let slots in modTypes)
        {
            let mod = vehicle.getMod(Number(slots));
            if(mod != -1) modItems[slots] = mod;
        }
        for(let slots in vTuner_OtherMods)
        {
            if(vTuner_OtherMods[slots] != -1) modItems[slots] = vTuner_OtherMods[slots]; // FOR PLATES, AND TINTS THAT CAN'T BE .GETMOD
        }

        mp.events.callRemote("RequestSaveVehicleMod", JSON.stringify(modItems), vehicle.getColours(1, 1).colorPrimary, 
            vehicle.getColours(1, 1).colorSecondary, vehicle.getExtraColours(1, 1).pearlescentColor, 
            vehicle.getExtraColours(1, 1).wheelColor);
    }
});

mp.events.add("CloseTuner", () => {
    if(vTuner_Main.Visible) vTuner_Main.Close();
});

mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    if(vTuner_Main.Visible) 
    {
        vTuner_Main.Close();
    }
});

mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    if(vTuner_VehicleID != -1 && vehicle.remoteId == vTuner_VehicleID && !vTuner_Main.Visible) 
    {
        mp.events.callLocal("OpenTuner", vTuner_VehicleID);
    }
});

vTuner_Main.MenuOpen.on(() => {
    
});

vTuner_Main.MenuClose.on(() => {
    for(let i = 0; i < vTuner_Items.length; i++)
    {
        vTuner_Main.RemoveItem(vTuner_Items[i]);
        delete vTuner_Items[i].Trigger;
        delete vTuner_Items[i].ItemNames;
        delete vTuner_Items[i].SlotID;
        vTuner_Items[i] = null;
    }
    delete vTuner_Items;
    vTuner_Items = [];
    vTuner_OtherMods = {};
    vTuner_VehicleID = -1;
    vTuner_Buy = null;
    vTuner_Exit = null;
    activateChat(true);

    mp.events.callRemote("OnTunerClose");
    mp.events.callLocal("RemoveTooltip", "M1");
});
traceLastFunc("vTuner::Init()");

}