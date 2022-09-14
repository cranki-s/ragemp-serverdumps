{
var outfitCEF = null;
var uniformStore = false;
var wardrobe_names = ["outfit"];
var uniform_names = ["outfit"];
var creationStore = false;
var PreviewServerSide = false;

mp.keys.bind( 0x73, true, (player) => { // F4
	if (mp.browsers.exists(outfitCEF))
    {
        outfitCEF.execute(`ToggleLeftMenu()`);
    }
});

mp.events.add(
{
    "OUTFITSHOP::SHOW" : (bool, slot, creation = false) => {
        if (!mp.browsers.exists(outfitCEF))
        {
            outfitCEF = mp.browsers.new("package://gtalife/OutfitShop/index.html");
            uniformStore = bool;
            creationStore = creation;
            var SkinInt = mp.players.local.getModel();
            InitializeData();
            var data = JSON.stringify(outfitsData);
            outfitCEF.execute(`Initialize('${data}', ${uniformStore}, '${wardrobe_names}', '${uniform_names}', ${slot}, ${creationStore}, ${SkinInt});`);
            mp.gui.cursor.show(true, true);
            mp.events.call('toggleHUDForPlayer', false);
            if(creation){
                setTimeout(() => {
                    mp.gui.cursor.show(true, true);
                }, 1000);
            }
        }
    },
    "OUTFITSHOP::CLOSE" : () => {
        if (mp.browsers.exists(outfitCEF))
        {
            outfitCEF.destroy();
            mp.gui.cursor.show(false, false);
            mp.events.call('toggleHUDForPlayer', true);
            mp.events.callRemote('OUTFITSHOP::closed', true);
        }
    },
    "OUTFITSHOP::GetTextures" : (name, index, value, type) => {
        if (mp.browsers.exists(outfitCEF))
        {
            var Drawables = null;
            var Textures = null;
            if(type == 0){
                Textures = mp.players.local.getNumberOfTextureVariations(index, value);
            }
            if(type == 1){
                Textures = mp.players.local.getNumberOfPropTextureVariations(index, value);
            }
            
            outfitCEF.execute(`ModifyOutfitMenu("${name}", ${Textures}, ${value}, ${index}, ${type});`);
        }
    },
    "OUTFITSHOP::SwitchOutfit" : (slot) => {
        if (mp.browsers.exists(outfitCEF))
        {
            mp.events.callRemote("OUTFITSHOP::switchOutfit", slot);
        }
    },
    "OUTFITSHOP::updateData" : (slot) => {
        if (mp.browsers.exists(outfitCEF))
        {
            InitializeData();
            var data = JSON.stringify(outfitsData);
            outfitCEF.execute(`ReInitialize('${data}', ${slot});`);
        }
    },
    "OUTFITSHOP::Purchase" : (slot,name) => {
        if (mp.browsers.exists(outfitCEF))
        {
            PurchaseOutfit(slot,name);
            outfitCEF.destroy();
            mp.gui.cursor.show(false, false);
            mp.events.call('toggleHUDForPlayer', true);
        }
    },
    "OUTFITSHOP::DefaultOutfit" : (outfit) => {
        if (mp.browsers.exists(outfitCEF))
        {
            mp.events.callRemote(outfit);
        }
    },
    "OUTFITSHOP::PlayAnimation" : () => {
        if (mp.browsers.exists(outfitCEF))
        {
            mp.events.callRemote("OUTFITSHOP::playAnimation");
        }
    },
    "OUTFITSHOP::StopAnimation" : () => {
        if (mp.browsers.exists(outfitCEF))
        {
            mp.events.callRemote("OUTFITSHOP::stopAnimation");
        }
    },
    "changeClothingPiece" : (id, int) => {
		if(!PreviewServerSide)
			mp.players.local.setComponentVariation(id, int, 0, 0);
		else
			mp.events.callRemote('OUTFITSHOP::changeClothingPiece', id, int);
    },
    "changeClothingTexture": (id, int) => {
        var drawable = mp.players.local.getDrawableVariation(id);
		
		if(!PreviewServerSide)
			mp.players.local.setComponentVariation(id, drawable, int, 0);
        else
			mp.events.callRemote('OUTFITSHOP::changeClothingTexture', id, drawable, int);
    },
    "changePropsPiece" : (id, int) => {
		if(!PreviewServerSide){
            if(int == -1) mp.players.local.clearProp(id);
            else mp.players.local.setPropIndex(id, int, 0, false);
        }
		else
			mp.events.callRemote('OUTFITSHOP::changePropsPiece', id, int);
    },
    "changePropsTexture" : (id, int) => {
        var drawable = mp.players.local.getPropIndex(id);
		if(!PreviewServerSide)
			mp.players.local.setPropIndex(id, drawable, int, false);
        else
			mp.events.callRemote('OUTFITSHOP::changePropsTexture', id, drawable, int);
    },
    "set_wardrobe_names" : (json) => {
        wardrobe_names = json;
    },
    "set_uniform_names" : (json) => {
        uniform_names = json;
    },
    "save_current_outfit" : () => {
        PurchaseOutfit(-1,"", true);
    },
});

let outfitsData = [];
function InitializeData(){
    outfitsData = [];

    addOutfitData("shirts", mp.players.local.getNumberOfDrawableVariations(11), mp.players.local.getNumberOfTextureVariations(11, mp.players.local.getDrawableVariation(11)), mp.players.local.getDrawableVariation(11), mp.players.local.getTextureVariation(11), 11, 0);
    addOutfitData("torsos", mp.players.local.getNumberOfDrawableVariations(3), mp.players.local.getNumberOfTextureVariations(3, mp.players.local.getDrawableVariation(3)), mp.players.local.getDrawableVariation(3), mp.players.local.getTextureVariation(3), 3, 0);
    addOutfitData("pants", mp.players.local.getNumberOfDrawableVariations(4), mp.players.local.getNumberOfTextureVariations(4, mp.players.local.getDrawableVariation(4)), mp.players.local.getDrawableVariation(4), mp.players.local.getTextureVariation(4), 4, 0);
    addOutfitData("shoes", mp.players.local.getNumberOfDrawableVariations(6), mp.players.local.getNumberOfTextureVariations(6, mp.players.local.getDrawableVariation(6)), mp.players.local.getDrawableVariation(6), mp.players.local.getTextureVariation(6), 6, 0);
    addOutfitData("undershirts", mp.players.local.getNumberOfDrawableVariations(8), mp.players.local.getNumberOfTextureVariations(8, mp.players.local.getDrawableVariation(8)), mp.players.local.getDrawableVariation(8), mp.players.local.getTextureVariation(8), 8, 0);
    addOutfitData("accessories", mp.players.local.getNumberOfDrawableVariations(7), mp.players.local.getNumberOfTextureVariations(7, mp.players.local.getDrawableVariation(7)), mp.players.local.getDrawableVariation(7), mp.players.local.getTextureVariation(7), 7, 0);
    addOutfitData("decals", mp.players.local.getNumberOfDrawableVariations(10), mp.players.local.getNumberOfTextureVariations(10, mp.players.local.getDrawableVariation(10)), mp.players.local.getDrawableVariation(10), mp.players.local.getTextureVariation(10), 10, 0);
    addOutfitData("hats", mp.players.local.getNumberOfPropDrawableVariations(0), mp.players.local.getNumberOfPropTextureVariations(0, mp.players.local.getPropIndex(0)), mp.players.local.getPropIndex(0), mp.players.local.getPropTextureIndex(0), 0, 1);
    addOutfitData("glasses", mp.players.local.getNumberOfPropDrawableVariations(1), mp.players.local.getNumberOfPropTextureVariations(1, mp.players.local.getPropIndex(1)), mp.players.local.getPropIndex(1), mp.players.local.getPropTextureIndex(1), 1, 1);
    addOutfitData("ears", mp.players.local.getNumberOfPropDrawableVariations(2), mp.players.local.getNumberOfPropTextureVariations(2, mp.players.local.getPropIndex(2)), mp.players.local.getPropIndex(2), mp.players.local.getPropTextureIndex(2), 2, 1);
    addOutfitData("hands", mp.players.local.getNumberOfDrawableVariations(5), mp.players.local.getNumberOfTextureVariations(5, mp.players.local.getDrawableVariation(5)), mp.players.local.getDrawableVariation(5), mp.players.local.getTextureVariation(5), 5, 0);
    addOutfitData("armour", mp.players.local.getNumberOfDrawableVariations(9), mp.players.local.getNumberOfTextureVariations(9, mp.players.local.getDrawableVariation(9)), mp.players.local.getDrawableVariation(9), mp.players.local.getTextureVariation(9), 9, 0);
}


function addOutfitData(name, total, totaltextures, current, currenttexture, index, type = 0){
    var newData = {"part":""+name+"", "drawables":total,"textures": totaltextures, "current": current, "currenttexture": currenttexture, "index": index, "type": type};
    outfitsData.push(newData);
}

function PurchaseOutfit(slot,name,server=false){
    var propDraw0 = mp.players.local.getPropIndex(0);
    var propDraw1 = mp.players.local.getPropIndex(1);
    var propDraw2 = mp.players.local.getPropIndex(2);
    var propDraw6 = mp.players.local.getPropIndex(6);
    var propDraw7 = mp.players.local.getPropIndex(7);
    var propText0 = mp.players.local.getPropTextureIndex(0);
    var propText1 = mp.players.local.getPropTextureIndex(1);
    var propText2 = mp.players.local.getPropTextureIndex(2);
    var propText6 = mp.players.local.getPropTextureIndex(6);
    var propText7 = mp.players.local.getPropTextureIndex(7);
    var data = [];
    data.push(propDraw0); 
    data.push(propText0);
    data.push(propDraw1); 
    data.push(propText1);
    data.push(propDraw2);
    data.push(propText2);
    data.push(propDraw6);
    data.push(propText6);
    data.push(propDraw7);
    data.push(propText7);
    var propdata = JSON.stringify(data);

    var compDrawZero = mp.players.local.getDrawableVariation(0);
    var compDrawOne = mp.players.local.getDrawableVariation(1);
    var compDrawTwo = mp.players.local.getDrawableVariation(2);
    var compDrawThree = mp.players.local.getDrawableVariation(3);
    var compDrawFour = mp.players.local.getDrawableVariation(4);
    var compDrawFive = mp.players.local.getDrawableVariation(5);
    var compDrawSix = mp.players.local.getDrawableVariation(6);
    var compDrawSeven = mp.players.local.getDrawableVariation(7);
    var compDrawEight = mp.players.local.getDrawableVariation(8);
    var compDrawNine = mp.players.local.getDrawableVariation(9);
    var compDrawTen = mp.players.local.getDrawableVariation(10);
    var compDrawEleven = mp.players.local.getDrawableVariation(11);
    var compTextZero = mp.players.local.getTextureVariation(0);
    var compTextOne = mp.players.local.getTextureVariation(1);
    var compTextTwo = mp.players.local.getTextureVariation(2);
    var compTextThree = mp.players.local.getTextureVariation(3);
    var compTextFour = mp.players.local.getTextureVariation(4);
    var compTextFive = mp.players.local.getTextureVariation(5);
    var compTextSix = mp.players.local.getTextureVariation(6);
    var compTextSeven = mp.players.local.getTextureVariation(7);
    var compTextEight = mp.players.local.getTextureVariation(8);
    var compTextNine = mp.players.local.getTextureVariation(9);
    var compTextTen = mp.players.local.getTextureVariation(10);
    var compTextEleven = mp.players.local.getTextureVariation(11);

    var objList = [];
    objList.push(compDrawZero);
    objList.push(compDrawOne);
    objList.push(compDrawTwo);
    objList.push(compDrawThree);
    objList.push(compDrawFour);
    objList.push(compDrawFive);
    objList.push(compDrawSix);
    objList.push(compDrawSeven);
    objList.push(compDrawEight);
    objList.push(compDrawNine);
    objList.push(compDrawTen);
    objList.push(compDrawEleven);

    objList.push(compTextZero);
    objList.push(compTextOne);
    objList.push(compTextTwo);
    objList.push(compTextThree);
    objList.push(compTextFour);
    objList.push(compTextFive);
    objList.push(compTextSix);
    objList.push(compTextSeven);
    objList.push(compTextEight);
    objList.push(compTextNine);
    objList.push(compTextTen);
    objList.push(compTextEleven);

    var jsonObj = JSON.stringify(objList);
    if(!server){
        mp.events.callRemote("OUTFITSHOP::saveOutfit", slot, propdata, jsonObj, creationStore, uniformStore, name);
        mp.events.callRemote('OUTFITSHOP::closed', false);
    
        if(creationStore){
            mp.events.call( 'char_creation_done_new' );
        }
    }else{
        mp.events.callRemote("OUTFITSHOP::saveOutfitServer", slot, propdata, jsonObj, creationStore, uniformStore);
    }
    
}

}