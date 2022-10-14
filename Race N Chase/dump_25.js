{
let editorTeam = -1;

mp.events.add("ClothingEditor:exit", (save) => {
    ServerUI.execute(`gm.$refs.hud.enabled = ${mp.storage.data.menu.HUD.toString()};`);
    mp.gui.cursor.show(false, false);
    ClothingEditorDOM.active = false;
    ClothingEditorActive = false;

    mp.events.callRemote("ClothingEditor:onExit", save, editorTeam);
});
mp.events.add("ClothingEditor:show", (team, gender, clothingData, forceSet) => {
    let cData = JSON.parse(clothingData);
    let toSend = {
        "Shirt":[cData.Clothes[11].Drawable, cData.Clothes[11].Texture],
        "Undershirt":[cData.Clothes[8].Drawable, cData.Clothes[8].Texture],
        "Pants":[cData.Clothes[4].Drawable, cData.Clothes[4].Texture],
        "Shoes":[cData.Clothes[6].Drawable, cData.Clothes[6].Texture],
        "Accessory 1":[cData.Clothes[5].Drawable, cData.Clothes[5].Texture],
        "Accessory 2":[cData.Clothes[7].Drawable, cData.Clothes[7].Texture],
        "Armor":[cData.Clothes[9].Drawable, cData.Clothes[9].Texture],
        "Handwear":[cData.TorsoDrawableTexture.Key, cData.TorsoDrawableTexture.Value],
        "Hats":[cData.Hat, cData.HatTxt],
        "Glasses":[cData.Glasses, cData.GlassesTxt],
    }
    let toSendStr = JSON.stringify(toSend);

    editorTeam = team;
    ServerUI.execute(`gm.$refs.hud.enabled = false;`);
    mp.gui.cursor.show(true, true);
    mp.game.invoke("0xFC695459D4D0E219", 0.5, 0.5); // SET CURSOR POSITION TO CENTER [x,y = 0.5,0.5]

    ClothingEditorDOM.execute(`ShowClothingEditor(${team}, '${gender}', ${toSendStr}, ${forceSet.toString()});`);
    ClothingEditorDOM.active = true;
    ClothingEditorActive = true;
});
mp.events.add("ClothingEditor:updateClothingManual", (componentIndex, drawable, texture) => {
    let isProp = (componentIndex < 3);
    if(!isProp){
        mp.events.callRemote('RequestSetClothes', componentIndex, drawable, texture);
        mp.players.local.setComponentVariation(componentIndex, drawable, texture, 0);
    }
    else{
        if(componentIndex == 1){
    		mp.events.callRemote('RequestSetGlasses', drawable, texture);
        }
        else{
    		mp.events.callRemote('RequestSetHat', drawable, texture);
        }
    }
});
mp.events.add("ClothingEditor:updateClothing", (clothingName, drawable, texture) => {
    let isProp = false, componentIndex = 0;
    switch(clothingName){
        case "Shirt": componentIndex = 11; break;
        case "Undershirt": componentIndex = 8; break;
        case "Pants": componentIndex = 4; break;
        case "Shoes": componentIndex = 6; break;
        case "Accessory 1": componentIndex = 5; break;
        case "Accessory 2": componentIndex = 7; break;
        case "Armor": componentIndex = 9; break;
        case "Handwear": componentIndex = 3; break;
        case "Hats": componentIndex = 0; isProp = true; break;
        case "Glasses": componentIndex = 1; isProp = true; break;
    }
    if(!isProp){
        mp.events.callRemote('RequestSetClothes', componentIndex, drawable, texture);
        mp.players.local.setComponentVariation(componentIndex, drawable, texture, 0);
    }
    else{
        if(componentIndex == 1){
    		mp.events.callRemote('RequestSetGlasses', drawable, texture);
        }
        else{
    		mp.events.callRemote('RequestSetHat', drawable, texture);
        }
    }
});
function InitializeClothingEditorDOM(){
    ClothingEditorDOM = mp.browsers.new("package://clothing_editor/index.html");
    ClothingEditorDOM.active = false;
    ClothingEditorActive = false;
}

mp.keys.bind(0x20, true, function() {clothingEditor_CameraMovement(true); });
mp.keys.bind(0x20, false, function() {clothingEditor_CameraMovement(false); });

function clothingEditor_CameraMovement(toggle){
    if(!ClothingEditorActive) return;

    if(toggle)
        mp.gui.cursor.show(false, false);
    else{
        mp.game.invoke("0xFC695459D4D0E219", 0.5, 0.5); // SET CURSOR POSITION TO CENTER [x,y = 0.5,0.5]
        mp.gui.cursor.show(true, true);
    }

}
}