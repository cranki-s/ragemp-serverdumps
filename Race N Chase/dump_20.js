{
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

let player = mp.players.local;

let outfitsMainMenu = undefined;
let outfitTeam = 0;
let outfitMenuExit = undefined;
let outfitSlotItems = [];

let menuMode = 0; // 0 - SELECT | 1 - SAVE

outfitsMainMenu = new Menu("Outfits", "", new Point(50, 50));

mp.events.add("ShowOutfitsMenu", (team, isDonator, mode) => { // 0 - fug ; 1 - cop
    if(outfitsMainMenu.Visible){ outfitsMainMenu.Close(); }

    if(outfitsMainMenu == undefined)
        outfitsMainMenu = new Menu("Outfits", "", new Point(50, 50));

    outfitTeam = team;
    menuMode = mode;

    outfitsMainMenu.AddItem(outfitMenuExit = new UIMenuItem(`~r~Exit`, "Exits the outfits menu without changing your outfit."));

    for(let i = 0 ; i < 5 ; i++){
        outfitsMainMenu.AddItem(outfitSlotItems[i] = new UIMenuItem(`${menuMode == 1 ? (i >= 2 ? "~y~Donator " : "~g~") : (i >= 2 ? "~y~Donator " : "~w~")}Slot ${i+1}`, ""));
        outfitSlotItems[i].Enabled = true;
    }
    if(!isDonator){
        for(let i = 2 ; i < 5 ; i++){
            outfitsMainMenu.RemoveItem(outfitSlotItems[i]);
        }
    }

    activateChat(false);
    mp.gui.cursor.visible = false;
    outfitsMainMenu.Open();
});

outfitsMainMenu.ItemSelect.on((item, index) => {

    if(menuMode == 0){ // OUTFIT SELECTION
        switch(index){
            case 0:{
                mp.events.callRemote("RequestSetOutfit", index-1, outfitTeam, true);
                outfitsMainMenu.Close();
            }
            default:{
                mp.events.callRemote("RequestSetOutfit", index-1, outfitTeam, true);
                outfitsMainMenu.Close();
            }
        }
    }
    else if(menuMode == 1){ // OUTFIT SAVING
        switch(index){
            case 0:{
                mp.events.callRemote("RequestSetOutfit", index-1, outfitTeam, false);
                outfitsMainMenu.Close();
            }
            default:{
                mp.events.callRemote("RequestSaveOutfit", index-1);
                outfitsMainMenu.Close();
            }
        }       
    }

})

outfitsMainMenu.MenuClose.on(() => {
    for(let i = 4 ; i >= 0 ; i--){
        if(outfitSlotItems[i] != undefined){
            outfitsMainMenu.RemoveItem(outfitSlotItems[i]);
        }
    }
    outfitsMainMenu.RemoveItem(outfitMenuExit);
    activateChat(true);
    mp.gui.cursor.visible = false;

    mp.events.callRemote("RequestSetOutfit", -1, outfitTeam, false);
});

outfitsMainMenu.IndexChange.on((index) => {
    mp.events.callRemote("RequestSetOutfit", index-1, outfitTeam, false);
});

}