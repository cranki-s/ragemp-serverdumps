{
/** Implements character customization UI */
require("ui.js");

// saves initial customization to re-apply after the view gets destroyed,
// the nearest we have to "reset" to the original customization state.
// that's because we don't want our player to get dirty due to the
// local modifications to customizations made locally.
let initialCustomization = {};
let initialCategories = [];

// should respond charactercustomization:on_save(customization)
mp.rpc("charactercustomization:show", (categoriesJSON, customizationJson) => {
    enableUI("charactercustomization", true, true, true);
    initialCustomization = JSON.parse(customizationJson);
    initialCategories = JSON.parse(categoriesJSON);
    if (initialCategories.length === 0) {
        initialCategories = ["info", "adn", "hair", "face", "face-features", "clothes"];
    }

    browserSet("charactercustomizationVM", "categories", initialCategories);
    browserSet("charactercustomizationVM", "customization", initialCustomization);
    browserCall("charactercustomizationVM", "toggle", true);
});

mp.rpc("charactercustomization:hide", () => { // opcion: resetear customizacion cuando se toca la X. problema: ui.
    // reset to original customization
    // disabled: may override server-side set customization.
    //mp.events.call("charactercustomization:on_customization_change", JSON.stringify(initialCustomization));

    disableUI("charactercustomization");
    browserCall("charactercustomizationVM", "toggle", false);
});


// called from CEF when customization category change, to set the appropiate camera
mp.events.add("charactercustomization:on_change_category", (newCategory) => {
    mp.events.callRemote("charactercustomization:on_change_category", newCategory);
});

// called from CEF when customization data change, to apply to the character visually
mp.events.add("charactercustomization:on_customization_change", (customizationJson) => {
    let customization = JSON.parse(customizationJson);
    let p = mp.players.local;
    
    p.model = customization.gender ? mp.game.joaat('mp_m_freemode_01') : mp.game.joaat('mp_f_freemode_01');
    let featureIndex = 0;
    for (feature of customization.faceFeatures) {
        p.setFaceFeature(featureIndex, feature);
        featureIndex++;
    }

    p.setEyeColor(customization.eyeColor);
    let b = customization.headBlend;
    p.setHeadBlendData(b.shape1, b.shape2, 0, b.shape1, b.shape2, 0, b.shapeMix, b.skinMix, 0, false);

    if (initialCategories.indexOf("clothes") !== -1) {
        for (let i = 0; i <= 12; i++) {
            let clothes = customization.clothes[i];
            if (clothes) {
                p.setComponentVariation(i, clothes.drawable, clothes.texture, clothes.palette);
            } else {
                p.setComponentVariation(i, 0, 0, 0);
            }
        }
    }

    p.setHairColor(customization.hairColor, customization.hairHighlightColor);

    for (let overlayIndex = 0; overlayIndex <= 12; overlayIndex++) {
        let overlay = customization.headOverlays[overlayIndex];
        if (overlay) {
            p.setHeadOverlay(parseInt(overlayIndex), overlay.index, overlay.opacity, overlay.colorId, overlay.secondaryColorId);
        } else {
            p.setHeadOverlay(parseInt(overlayIndex), 255, 1, 0, 0); // disable overlay
        }
    }
});

// called from CEF when submitting the data

mp.events.add("charactercustomization:on_save", (customizationJson) => {
    mp.events.callRemote("charactercustomization:on_save", customizationJson);
});

mp.events.add("charactercustomization:on_cancel", () => {
    mp.events.callRemote("charactercustomization:on_cancel");
});

/** Customization struct: 
customization: {
    hair: 0,
    hairColor: 0,
    hairHighlightColor: 0,
    headOverlays: {
        0: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        1: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        2: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        3: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        4: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        5: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        6: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        7: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        8: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        9: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        10: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        11: {index:0, opacity:1, colorId:0, secondaryColorId:0},
        12: {index:0, opacity:1, colorId:0, secondaryColorId:0}
    },
    faceFeatures: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    eyeColor: 0,
    headBlend: {
        shape1: 0, shape2: 0, skin1: 0, skin2: 0,
        shapeMix: 0.5, skinMix: 0.5
    }
}*/
}