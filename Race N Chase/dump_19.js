{
const NativeUI = require("nativeui");
const Data = require("charcreator/data");

const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;

let isGenderChangeBlocked = false;

const creatorCoords = {
    camera: new mp.Vector3(402.8664, -997.5515, -98.5),
    cameraLookAt: new mp.Vector3(402.8664, -996.4108, -98.5)
};
const localPlayer = mp.players.local;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colorForOverlayIdx(index) {
    let color;

    switch (index) {
        case 1:
            color = beardColorItem.Index;
        break;

        case 2:
            color = eyebrowColorItem.Index;
        break;

        case 5:
            color = blushColorItem.Index;
        break;

        case 8:
            color = lipstickColorItem.Index;
        break;

        case 10:
            color = chestHairColorItem.Index;
        break;

        default:
            color = 0;
    }

    return color;
}

function updateParents() {
    localPlayer.setHeadBlendData(
        // shape
        Data.mothers[motherItem.Index],
        Data.fathers[fatherItem.Index],
        0,

        // skin
        Data.mothers[motherItem.Index],
        Data.fathers[fatherItem.Index],
        0,

        // mixes
        similarityItem.Index * 0.01,
        skinSimilarityItem.Index * 0.01,
        0.0,

        false
    );
}

function updateFaceFeature(index, value) {
    localPlayer.setFaceFeature(index, parseFloat(value));
}

function updateAppearance(index) {
    let overlayID = (appearanceItems[index].Index == 0) ? 255 : appearanceItems[index].Index - 1;
    localPlayer.setHeadOverlay(index, overlayID, appearanceOpacityItems[index].Index * 0.1, colorForOverlayIdx(index), 0);
}

function updateHairAndColors() {
    localPlayer.setComponentVariation(2, Data.hairList[currentGender][hairItem.Index].ID, 0, 2);
    localPlayer.setHairColor(hairColorItem.Index, hairHighlightItem.Index);
    localPlayer.setEyeColor(eyeColorItem.Index);
    localPlayer.setHeadOverlayColor(1, 1, beardColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(2, 1, eyebrowColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(5, 2, blushColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(8, 2, lipstickColorItem.Index, 0);
    localPlayer.setHeadOverlayColor(10, 1, chestHairColorItem.Index, 0);
}

function applyCreatorOutfit() {
    /*if (currentGender == 0) {
        localPlayer.setDefaultComponentVariation();
        localPlayer.setComponentVariation(3, 15, 0, 2);
        localPlayer.setComponentVariation(4, 21, 0, 2);
        localPlayer.setComponentVariation(6, 34, 0, 2);
        localPlayer.setComponentVariation(8, 15, 0, 2);
        localPlayer.setComponentVariation(11, 15, 0, 2);
    } else {
        localPlayer.setDefaultComponentVariation();
        localPlayer.setComponentVariation(3, 15, 0, 2);
        localPlayer.setComponentVariation(4, 10, 0, 2);
        localPlayer.setComponentVariation(6, 35, 0, 2);
        localPlayer.setComponentVariation(8, 15, 0, 2);
        localPlayer.setComponentVariation(11, 15, 0, 2);
    }*/

    localPlayer.setComponentVariation(8, 15, 0, 0);
    localPlayer.setComponentVariation(11, 15, 0, 0);
    localPlayer.setComponentVariation(3, 15, 0, 0);
    localPlayer.setComponentVariation(4, 14, 0, 0);
    mp.events.callRemote('RequestSetClothes', 8, 15, 0);
    mp.events.callRemote('RequestSetClothes', 11, 15, 0);
    mp.events.callRemote('RequestSetClothes', 3, 15, 0);
    mp.events.callRemote('RequestSetClothes', 4, 14, 0);
}

function fillHairMenu() {
    hairItem = new UIMenuListItem("Hair", "Your character's hair.", new ItemsCollection(Data.hairList[currentGender].map(h => h.ID.toString())));
    creatorHairMenu.AddItem(hairItem);

    hairColorItem = new UIMenuListItem("Hair Color", "Your character's hair color.", new ItemsCollection(hairColors));
    creatorHairMenu.AddItem(hairColorItem);

    hairHighlightItem = new UIMenuListItem("Hair Highlight Color", "Your character's hair highlight color.", new ItemsCollection(hairColors));
    creatorHairMenu.AddItem(hairHighlightItem);

    eyebrowColorItem = new UIMenuListItem("Eyebrow Color", "Your character's eyebrow color.", new ItemsCollection(hairColors));
    creatorHairMenu.AddItem(eyebrowColorItem);

    beardColorItem = new UIMenuListItem("Facial Hair Color", "Your character's facial hair color.", new ItemsCollection(hairColors));
    creatorHairMenu.AddItem(beardColorItem);

    eyeColorItem = new UIMenuListItem("Eye Color", "Your character's eye color.", new ItemsCollection(Data.eyeColors));
    creatorHairMenu.AddItem(eyeColorItem);

    blushColorItem = new UIMenuListItem("Blush Color", "Your character's blush color.", new ItemsCollection(blushColors));
    creatorHairMenu.AddItem(blushColorItem);

    lipstickColorItem = new UIMenuListItem("Lipstick Color", "Your character's lipstick color.", new ItemsCollection(lipstickColors));
    creatorHairMenu.AddItem(lipstickColorItem);

    chestHairColorItem = new UIMenuListItem("Chest Hair Color", "Your character's chest hair color.", new ItemsCollection(hairColors));
    creatorHairMenu.AddItem(chestHairColorItem);

    var item = new UIMenuItem("Randomize", "~r~Randomizes your hair & colors.");
    item.HighlightedForeColor = new Color(153, 0, 0);
    item.ForeColor = new Color(196, 14, 14);
    creatorHairMenu.AddItem(item);

    item = new UIMenuItem("Reset", "~r~Resets your hair & colors.");
    item.HighlightedForeColor = new Color(153, 0, 0);
    item.ForeColor = new Color(196, 14, 14);
    creatorHairMenu.AddItem(item);
}

function resetParentsMenu(refresh = false) {
    fatherItem.Index = 0;
    motherItem.Index = 0;
    similarityItem.Index = (currentGender == 0) ? 100 : 0;
    skinSimilarityItem.Index = (currentGender == 0) ? 100 : 0;

    updateParents();
    if (refresh) creatorParentsMenu.RefreshIndex();
}

function resetFeaturesMenu(refresh = false) {
    for (let i = 0; i < Data.featureNames.length; i++) {
        featureItems[i].Index = 20;
        updateFaceFeature(i, features[featureItems[i].Index]);
    }

    if (refresh) creatorFeaturesMenu.RefreshIndex();
}

function resetAppearanceMenu(refresh = false) {
    for (let i = 0; i < Data.appearanceNames.length; i++) {
        appearanceItems[i].Index = 0;
        appearanceOpacityItems[i].Index = 100;
        updateAppearance(i);
    }

    if (refresh) creatorAppearanceMenu.RefreshIndex();
}

function resetHairAndColorsMenu(refresh = false) {
    hairItem.Index = 0;
    hairColorItem.Index = 0;
    hairHighlightItem.Index = 0;
    eyebrowColorItem.Index = 0;
    beardColorItem.Index = 0;
    eyeColorItem.Index = 0;
    blushColorItem.Index = 0;
    lipstickColorItem.Index = 0;
    chestHairColorItem.Index = 0;
    updateHairAndColors();

    if (refresh) creatorHairMenu.RefreshIndex();
}

let currentGender = 0;
let creatorMenus = [];
let creatorCamera;

// color arrays
let hairColors = [];
for (let i = 0; i < Data.maxHairColor; i++) hairColors.push(i.toString());

let blushColors = [];
for (let i = 0; i < Data.maxBlushColor; i++) blushColors.push(i.toString());

let lipstickColors = [];
for (let i = 0; i < Data.maxLipstickColor; i++) lipstickColors.push(i.toString());

// CREATOR MAIN
let creatorMainMenu = new Menu("Customization", "", new Point(50, 50));
creatorMainMenuExit = null;
let genderItem = new UIMenuListItem("Gender", "~r~Changing this will reset your customization.", new ItemsCollection(["Male", "Female"]));
creatorMainMenu.AddItem(genderItem);
creatorMainMenu.AddItem(new UIMenuItem("Parents", "Your character's parents."));
creatorMainMenu.AddItem(new UIMenuItem("Features", "Your character's facial features."));
creatorMainMenu.AddItem(new UIMenuItem("Appearance", "Your character's appearance."));
creatorMainMenu.AddItem(new UIMenuItem("Hair & Colors", "Your character's hair and hair colors."));

let angles = [];
for (let i = -180.0; i <= 180.0; i += 15.0) angles.push(i.toFixed(1));

let angleItem = new UIMenuSliderItem("Angle", angles, 0, "", false);
angleItem.Index = 0;
creatorMainMenu.AddItem(angleItem);

let randomizeItem = new UIMenuItem("Random", "Randomizes all of your character's features.");
randomizeItem.ForeColor = new Color(245, 202, 47);
creatorMainMenu.AddItem(randomizeItem);

let saveItem = new UIMenuItem("Save", "Save all changes.");
saveItem.ForeColor = new Color(118, 207, 39);
creatorMainMenu.AddItem(saveItem);

if(mp.players.local.getVariable("CharCreator_ShowClothingAfter") != true){
    let cancelItem = new UIMenuItem("Cancel", "Discard all changes.");
    cancelItem.ForeColor = new Color(213, 0, 0);
    cancelItem.HighlightedForeColor = new Color(229, 57, 53);
    creatorMainMenu.AddItem(cancelItem);
}

mp.events.add("char_Reset", () => {
    localPlayer.setDefaultComponentVariation();
    localPlayer.model = 0x705E61F2;

    localPlayer.setComponentVariation(8, 15, 0, 0);
    localPlayer.setComponentVariation(11, 15, 0, 0);
    localPlayer.setComponentVariation(3, 15, 0, 0);
    localPlayer.setComponentVariation(4, 14, 0, 0);

    mp.events.callRemote("char_ResetEcho");
});

creatorMainMenu.ListChange.on((item, listIndex) => {
    if (item == genderItem) {
        if(isGenderChangeBlocked == true) {
            mp.events.callLocal("HUDError", "You cannot change your gender here! Use <strong>/char reset</strong>!", "fa-crosshairs");
        }
        else{
            currentGender = listIndex;
            mp.events.callRemote("creator_GenderChange", currentGender);
    
            localPlayer.clearTasksImmediately();
            applyCreatorOutfit();
            angleItem.Index = 0;
            resetParentsMenu(true);
            resetFeaturesMenu(true);
            resetAppearanceMenu(true);
            localPlayer.setAlpha(255);
    
            creatorHairMenu.Clear();
            fillHairMenu();
            creatorHairMenu.RefreshIndex();
        }
    }
});

creatorMainMenu.SliderChange.on((item, listIndex, value) => {
    if (item == angleItem) {
        localPlayer.setHeading(parseFloat(value));
        localPlayer.clearTasksImmediately();
    }
});

function generateRandomChar(){
    // parents random
    fatherItem.Index = getRandomInt(0, Data.fathers.length - 1);
    motherItem.Index = getRandomInt(0, Data.mothers.length - 1);

    //similarityItem.Index = getRandomInt(0, 100);
    if(currentGender == 0) similarityItem.Index = 100; // makes males similarity more similar to fathers
    else similarityItem.Index = 0; // and female similarity more similar to mothers

    skinSimilarityItem.Index = getRandomInt(0, 100);
    updateParents();

    // features random
    for (let i = 0; i < Data.featureNames.length; i++) {
        featureItems[i].Index = getRandomInt(0, features.length);
        updateFaceFeature(i, features[featureItems[i].Index]);
    }

    // appearance random
    for (let i = 0; i < Data.appearanceNames.length; i++) {
        if(i == 1 || i == 2 || i == 3 || i == 9)
        {
            appearanceItems[i].Index = getRandomInt(0, mp.game.ped.getNumHeadOverlayValues(i) - 1);
            appearanceOpacityItems[i].Index = getRandomInt(0, 100);

            if(i == 1 && currentGender == 1){
                appearanceItems[i].Index = 0;
                appearanceOpacityItems[i].Index = 0;
            }
        }
        else
        {
            appearanceItems[i].Index = 0;
            appearanceOpacityItems[i].Index = 0;
        } 
        updateAppearance(i);
    }  
    
    // hair & colors random
    hairItem.Index = getRandomInt(0, Data.hairList[currentGender].length - 1);
	let hairColorGen = getRandomInt(0, 14); // 0-14 is enough they can choose higher color if they want
    hairColorItem.Index = hairColorGen;
    hairHighlightItem.Index = hairColorGen;
    eyebrowColorItem.Index = hairColorGen;
    beardColorItem.Index = hairColorGen;
    eyeColorItem.Index = getRandomInt(0, 8); // 0-8 are normal eyes, above that are weird alien-style ones
    blushColorItem.Index = 0;
    lipstickColorItem.Index = 0;
    chestHairColorItem.Index = hairColorGen;
    updateHairAndColors();    
}

creatorMainMenu.ItemSelect.on((item, index) => {
    switch (index) {
        case 1:
            creatorMainMenu.Visible = false;
            creatorParentsMenu.Visible = true;

            if(creatorParentsMenuExit == null)
            {
                creatorParentsMenuExit = new UIMenuItem("Back", "Go back to last menu.");
                creatorParentsMenuExit.ForeColor = new Color(127, 237, 28);
                creatorParentsMenu.AddItem(creatorParentsMenuExit);
            }
        break;

        case 2:
            creatorMainMenu.Visible = false;
            creatorFeaturesMenu.Visible = true;

            if(creatorFeaturesMenuExit == null)
            {
                creatorFeaturesMenuExit = new UIMenuItem("Back", "Go back to last menu.");
                creatorFeaturesMenuExit.ForeColor = new Color(127, 237, 28);
                creatorFeaturesMenu.AddItem(creatorFeaturesMenuExit);
            }
        break;

        case 3:
            creatorMainMenu.Visible = false;
            creatorAppearanceMenu.Visible = true;

            if(creatorAppearanceMenuExit == null)
            {
                creatorAppearanceMenuExit = new UIMenuItem("Back", "Go back to last menu.");
                creatorAppearanceMenuExit.ForeColor = new Color(127, 237, 28);
                creatorAppearanceMenu.AddItem(creatorAppearanceMenuExit);
            }
        break;

        case 4:
            creatorMainMenu.Visible = false;
            creatorHairMenu.Visible = true;

            if(creatorHairMenuExit == null)
            {
                creatorHairMenuExit = new UIMenuItem("Back", "Go back to last menu.");
                creatorHairMenuExit.ForeColor = new Color(127, 237, 28);
                creatorHairMenu.AddItem(creatorHairMenuExit);
            }
        break;

        case 6: // full character randomization
            generateRandomChar();
        break;

        case 7:
            let parentData = {
                Father: Data.fathers[fatherItem.Index],
                Mother: Data.mothers[motherItem.Index],
                Similarity: similarityItem.Index * 0.01,
                SkinSimilarity: skinSimilarityItem.Index * 0.01
            };

            let featureData = [];
            for (let i = 0; i < featureItems.length; i++) featureData.push(parseFloat(features[featureItems[i].Index]));

            let appearanceData = [];
            for (let i = 0; i < appearanceItems.length; i++) appearanceData.push({Value: ((appearanceItems[i].Index == 0) ? 255 : appearanceItems[i].Index - 1), Opacity: appearanceOpacityItems[i].Index * 0.1});

            let hairAndColors = [
                Data.hairList[currentGender][hairItem.Index].ID,
                hairColorItem.Index,
                hairHighlightItem.Index,
                eyebrowColorItem.Index,
                beardColorItem.Index,
                eyeColorItem.Index,
                blushColorItem.Index,
                lipstickColorItem.Index,
                chestHairColorItem.Index
            ];

            mp.events.callRemote("creator_Save", currentGender, JSON.stringify(parentData), JSON.stringify(featureData), JSON.stringify(appearanceData), JSON.stringify(hairAndColors));
        break;

        case 8:
            mp.events.callRemote("creator_Leave");
        break;
    }
});

creatorMainMenu.MenuClose.on(() => {
    mp.events.callRemote("creator_Leave");
});

creatorMainMenu.Visible = false;
creatorMenus.push(creatorMainMenu);
// CREATOR MAIN END

// CREATOR PARENTS
let similarities = [];
for (let i = 0; i <= 100; i += 2) similarities.push(i);

let creatorParentsMenu = new Menu("Parents", "", new Point(50, 50));
creatorParentsMenuExit = null;
let fatherItem = new UIMenuListItem("Father", "Your character's father.", new ItemsCollection(Data.fatherNames));
let motherItem = new UIMenuListItem("Mother", "Your character's mother.", new ItemsCollection(Data.motherNames));
let similarityItem = new UIMenuSliderItem("Resemblance", "Similarity to parents.\n(left = feminine, right = masculine)", similarities);
let skinSimilarityItem = new UIMenuSliderItem("Skin Tone", "Skin color similarity to parents.\n(left = mother's, right = father's)", similarities);
creatorParentsMenu.AddItem(fatherItem);
creatorParentsMenu.AddItem(motherItem);
creatorParentsMenu.AddItem(similarityItem);
creatorParentsMenu.AddItem(skinSimilarityItem);
var ritem = new UIMenuItem("Randomize", "~r~Randomizes your parents.");
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);
creatorParentsMenu.AddItem(ritem);

ritem = new UIMenuItem("Reset", "~r~Resets your parents.");
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);
creatorParentsMenu.AddItem(ritem);

creatorParentsMenu.ItemSelect.on((item, index) => {
    switch (item.Text) {
        case "Randomize":
            fatherItem.Index = getRandomInt(0, Data.fathers.length - 1);
            motherItem.Index = getRandomInt(0, Data.mothers.length - 1);
            similarityItem.Index = getRandomInt(0, 100);
            skinSimilarityItem.Index = getRandomInt(0, 100);
            updateParents();
        break;

        case "Reset":
            resetParentsMenu();
        break;

        case "Back":
            creatorParentsMenu.RemoveItem(creatorParentsMenuExit);
            creatorParentsMenuExit = null;

            creatorParentsMenu.Visible = false;
            creatorMainMenu.Visible = true;
        break;
    }
});

creatorParentsMenu.ListChange.on((item, listIndex) => {
    updateParents();
});

creatorParentsMenu.SliderChange.on((item, listIndex, value) => {
    updateParents();
});

creatorParentsMenu.ParentMenu = creatorMainMenu;
creatorParentsMenu.Visible = false;
creatorMenus.push(creatorParentsMenu);
// CREATOR PARENTS END

// CREATOR FEATURES
let featureItems = [];
let features = [];
for (let i = -1.0; i <= 1.01; i += 0.05) features.push(i.toFixed(2));

let creatorFeaturesMenu = new Menu("Features", "", new Point(50, 50));
creatorFeaturesMenuExit = null;

for (let i = 0; i < Data.featureNames.length; i++) {
    let tempFeatureItem = new UIMenuSliderItem(Data.featureNames[i], features, 20, "", false);
    tempFeatureItem.Index = 20;
    featureItems.push(tempFeatureItem);
    creatorFeaturesMenu.AddItem(tempFeatureItem);
}

var ritem = new UIMenuItem("Randomize", "~r~Randomizes your features.")
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);

creatorFeaturesMenu.AddItem(ritem);
ritem = new UIMenuItem("Reset", "~r~Resets your features.");
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);
creatorFeaturesMenu.AddItem(ritem);

creatorFeaturesMenu.ItemSelect.on((item, index) => {
    switch (item.Text) {
        case "Randomize":
            for (let i = 0; i < Data.featureNames.length; i++) {
                featureItems[i].Index = getRandomInt(0, features.length);
                updateFaceFeature(i, features[featureItems[i].Index]);
            }
        break;

        case "Reset":
            resetFeaturesMenu();
        break;

        case "Back":
            creatorFeaturesMenu.RemoveItem(creatorFeaturesMenuExit);
            creatorFeaturesMenuExit = null;

            creatorFeaturesMenu.Visible = false;
            creatorMainMenu.Visible = true;
        break;
    }
});

creatorFeaturesMenu.SliderChange.on((item, listIndex, value) => {
    updateFaceFeature(featureItems.indexOf(item), parseFloat(value));
});

creatorFeaturesMenu.ParentMenu = creatorMainMenu;
creatorFeaturesMenu.Visible = false;
creatorMenus.push(creatorFeaturesMenu);
// CREATOR FEATURES END

// CREATOR APPEARANCE
let appearanceItems = [];
let appearanceOpacityItems = [];
let opacities = [];
for (let i = 0; i <= 100; i += 5) opacities.push(i + "%");

let creatorAppearanceMenu = new Menu("Appearance", "", new Point(50, 50));
creatorAppearanceMenuExit = null;

for (let i = 0; i < Data.appearanceNames.length; i++) {
    let items = [];
    for (let j = 0, max = mp.game.ped.getNumHeadOverlayValues(i); j <= max; j++) items.push((Data.appearanceItemNames[i][j] === undefined) ? j.toString() : Data.appearanceItemNames[i][j]);

    let tempAppearanceItem = new UIMenuListItem(Data.appearanceNames[i], "", new ItemsCollection(items));
    appearanceItems.push(tempAppearanceItem);
    creatorAppearanceMenu.AddItem(tempAppearanceItem);

    let tempAppearanceOpacityItem = new UIMenuListItem(Data.appearanceNames[i] + " Opacity", "", new ItemsCollection(opacities));
    tempAppearanceOpacityItem.Index = 100;
    appearanceOpacityItems.push(tempAppearanceOpacityItem);
    creatorAppearanceMenu.AddItem(tempAppearanceOpacityItem);
}

var ritem = new UIMenuItem("Randomize", "~r~Randomizes your appearance.");
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);

creatorAppearanceMenu.AddItem(ritem);

ritem = new UIMenuItem("Reset", "~r~Resets your appearance.");
ritem.HighlightedForeColor = new Color(153, 0, 0);
ritem.ForeColor = new Color(196, 14, 14);
creatorAppearanceMenu.AddItem(ritem);

creatorAppearanceMenu.ItemSelect.on((item, index) => {
    switch (item.Text) {
        case "Randomize":
            for (let i = 0; i < Data.appearanceNames.length; i++) {
                appearanceItems[i].Index = getRandomInt(0, mp.game.ped.getNumHeadOverlayValues(i) - 1);
                appearanceOpacityItems[i].Index = getRandomInt(0, 100);
                updateAppearance(i);
            }
        break;

        case "Reset":
            resetAppearanceMenu();
        break;

        case "Back":
            creatorAppearanceMenu.RemoveItem(creatorAppearanceMenuExit);
            creatorAppearanceMenuExit = null;

            creatorAppearanceMenu.Visible = false;
            creatorMainMenu.Visible = true;
        break;
    }
});

creatorAppearanceMenu.ListChange.on((item, listIndex) => {
    let idx = (creatorAppearanceMenu.CurrentSelection % 2 == 0) ? (creatorAppearanceMenu.CurrentSelection / 2) : Math.floor(creatorAppearanceMenu.CurrentSelection / 2);
    updateAppearance(idx);
});

creatorAppearanceMenu.ParentMenu = creatorMainMenu;
creatorAppearanceMenu.Visible = false;
creatorMenus.push(creatorAppearanceMenu);
// CREATOR APPEARANCE END

// CREATOR HAIR & COLORS
let hairItem;
let hairColorItem;
let hairHighlightItem;
let eyebrowColorItem;
let beardColorItem;
let eyeColorItem;
let blushColorItem;
let lipstickColorItem;
let chestHairColorItem;

creatorHairMenu = new Menu("Hair & Colors", "", new Point(50, 50));
creatorHairMenuExit = null;
fillHairMenu();

creatorHairMenu.ItemSelect.on((item, index) => {
    switch (item.Text) {
        case "Randomize":
            hairItem.Index = getRandomInt(0, Data.hairList[currentGender].length - 1);
            hairColorItem.Index = getRandomInt(0, Data.maxHairColor);
            hairHighlightItem.Index = getRandomInt(0, Data.maxHairColor);
            eyebrowColorItem.Index = getRandomInt(0, Data.maxHairColor);
            beardColorItem.Index = getRandomInt(0, Data.maxHairColor);
            eyeColorItem.Index = getRandomInt(0, Data.maxEyeColor);
            blushColorItem.Index = getRandomInt(0, Data.maxBlushColor);
            lipstickColorItem.Index = getRandomInt(0, Data.maxLipstickColor);
            chestHairColorItem.Index = getRandomInt(0, Data.maxHairColor);
            updateHairAndColors();
        break;

        case "Reset":
            resetHairAndColorsMenu();
        break;

        case "Back":
            creatorHairMenu.RemoveItem(creatorHairMenuExit);
            creatorHairMenuExit = null;

            creatorHairMenu.Visible = false;
            creatorMainMenu.Visible = true;
        break;
    }
});

creatorHairMenu.ListChange.on((item, listIndex) => {
    if (item == hairItem) {
        let hairStyle = Data.hairList[currentGender][listIndex];
        localPlayer.setComponentVariation(2, hairStyle.ID, 0, 2);
    } else {
        switch (creatorHairMenu.CurrentSelection) {
            case 1: // hair color
                localPlayer.setHairColor(listIndex, hairHighlightItem.Index);
            break;

            case 2: // hair highlight color
                localPlayer.setHairColor(hairColorItem.Index, listIndex);
            break;

            case 3: // eyebrow color
                localPlayer.setHeadOverlayColor(2, 1, listIndex, 0);
            break;

            case 4: // facial hair color
                localPlayer.setHeadOverlayColor(1, 1, listIndex, 0);
            break;

            case 5: // eye color
                localPlayer.setEyeColor(listIndex);
            break;

            case 6: // blush color
                localPlayer.setHeadOverlayColor(5, 2, listIndex, 0);
            break;

            case 7: // lipstick color
                localPlayer.setHeadOverlayColor(8, 2, listIndex, 0);
            break;

            case 8: // chest hair color
                localPlayer.setHeadOverlayColor(10, 1, listIndex, 0);
            break;
        }
    }
});

creatorHairMenu.ParentMenu = creatorMainMenu;
creatorHairMenu.Visible = false;
creatorMenus.push(creatorHairMenu);
// CREATOR HAIR & COLORS END

// EVENTS
mp.events.add("creator_SetClothingPhase", () => {
    for (let i = 0; i < creatorMenus.length; i++) creatorMenus[i].Visible = false;

    if(creatorCamera != undefined){
        creatorCamera.destroy();
        creatorCamera = undefined;
    }
    creatorCamera = mp.cameras.new("creatorCamera", creatorCoords.camera, new mp.Vector3(0, 0, 0), 85);
    creatorCamera.pointAtCoord(creatorCoords.cameraLookAt.x, creatorCoords.cameraLookAt.y, creatorCoords.cameraLookAt.z);
    creatorCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});
mp.events.add("toggleCreator", (active, charData, blockGenderChange) => {
    isGenderChangeBlocked = blockGenderChange;

    if (active) {
        if (creatorCamera === undefined) {
            creatorCamera = mp.cameras.new("creatorCamera", creatorCoords.camera, new mp.Vector3(0, 0, 0), 45);
            creatorCamera.pointAtCoord(creatorCoords.cameraLookAt.x, creatorCoords.cameraLookAt.y, creatorCoords.cameraLookAt.z);
            creatorCamera.setActive(true);
        }

        creatorMainMenu.Visible = true;
        activateChat(false);
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        localPlayer.clearTasksImmediately();
        localPlayer.freezePosition(true);

        mp.game.cam.renderScriptCams(true, false, 0, true, false);

        localPlayer.model = 0x705E61F2;
        localPlayer.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
        localPlayer.heading = -185.0;
        localPlayer.setAlpha(255);

        // update menus with current character data
        if (charData) {
            charData = JSON.parse(charData);

            // gender
            currentGender = charData.Gender;
            genderItem.Index = charData.Gender;

            creatorHairMenu.Clear();
            fillHairMenu();
            applyCreatorOutfit();

            // parents
            fatherItem.Index = Data.fathers.indexOf(charData.Parents.Father);
            motherItem.Index = Data.mothers.indexOf(charData.Parents.Mother);
            similarityItem.Index = parseInt(charData.Parents.Similarity * 100);
            skinSimilarityItem.Index = parseInt(charData.Parents.SkinSimilarity * 100);
            updateParents();
            
            let difference = function (a, b) { return Math.abs(a - b); }
            // features
            for (let i = 0; i < 20; i++) {

                let lastDist = 9999.9;
                let lastItem = 0;
                for(let b = 0; b < features.length; b++)
                {
                    if(difference(charData.Features[i], features[b]) < lastDist)
                    {
                        lastDist = difference(charData.Features[i], features[b]);
                        lastItem = b;
                    }
                }
                featureItems[i].Index = lastItem;
                updateFaceFeature(i, features[lastItem]);
            }

            // hair and colors
            let hair = Data.hairList[currentGender].find(h => h.ID == charData.Hair.Hair);
            hairItem.Index = Data.hairList[currentGender].indexOf(hair);

            hairColorItem.Index = charData.Hair.Color;
            hairHighlightItem.Index = charData.Hair.HighlightColor;
            eyebrowColorItem.Index = charData.EyebrowColor;
            beardColorItem.Index = charData.BeardColor;
            eyeColorItem.Index = charData.EyeColor;
            blushColorItem.Index = charData.BlushColor;
            lipstickColorItem.Index = charData.LipstickColor;
            chestHairColorItem.Index = charData.ChestHairColor;
            updateHairAndColors();

            // appearance
            for (let i = 0; i < 10; i++) {
                appearanceItems[i].Index = (charData.Appearance[i].Value == 255) ? 0 : charData.Appearance[i].Value + 1;
                appearanceOpacityItems[i].Index = charData.Appearance[i].Opacity * 100;
                updateAppearance(i);
            }

            creatorHairMenu.RefreshIndex();
            creatorParentsMenu.RefreshIndex();
            creatorFeaturesMenu.RefreshIndex();
            creatorAppearanceMenu.RefreshIndex();
        }
        applyCreatorOutfit();
    } else {
        for (let i = 0; i < creatorMenus.length; i++) creatorMenus[i].Visible = false;
        activateChat(true);
        mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        localPlayer.freezePosition(false);
        localPlayer.setDefaultComponentVariation();
        localPlayer.setComponentVariation(2, Data.hairList[currentGender][hairItem.Index].ID, 0, 2);

        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
});
}