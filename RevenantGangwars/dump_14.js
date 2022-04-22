{
let cursorToggle = true;

//toggles f2 cursor//
mp.keys.bind(0x71, true, function() {
    if (cursorToggle) {
        mp.gui.cursor.visible = false;
        cursorToggle = false;
    } else {
        mp.gui.cursor.visible = true;
        cursorToggle = true;
    }
});

//toggles f3 mainmenu//
mp.keys.bind(0x72, true, function() {
    if (!sharedVariables.isInOutfitEditor) {
        mp.events.call("toggleMainMenu", 4);
        mp.events.call("togglecustomoutfitmenu", 2);
        mp.events.call("togglecustomoutfitmenu1", 2);
        mp.events.call("toggleOutfitBrowser:Saints", false);
        mp.events.call("toggleOutfitBrowser:Narcos", false);
        mp.events.call("toggleOutfitBrowser:Marabunta", false);
        mp.events.call("toggleOutfitBrowser:Aztecas", false);
        mp.events.call("toggleOutfitBrowser:Taliban", false);
        mp.events.call("toggleOutfitBrowser:losreyes", false);
        mp.events.call("toggleOutfitBrowser:Bloods", false);
        mp.events.call("toggleOutfitBrowser:Crips", false);
    }
});

//Health and Armour Keys//
mp.keys.bind(0xBE, true, function() {
    if (!sharedVariables.isInOutfitEditor && !mp.players.local.isTypingInTextChat) {
        mp.events.callRemote('armourKey');
    }
});
  
mp.keys.bind(0xBC, true, function() {
    if (!sharedVariables.isInOutfitEditor && !mp.players.local.isTypingInTextChat) {
        mp.events.callRemote('healthKey');
    }
});

//Anti-Cheat Binds//
mp.keys.bind(0x2D, true, () => {
    mp.events.callRemote("anticheat:detection", "INSERT key");
})
    
mp.keys.bind(0x23, true, () => {
    mp.events.callRemote("anticheat:detection", "END key");
})

mp.keys.bind(0x6F, true, () => {
    mp.events.callRemote("anticheat:detection", "Slash key");
})

}