{
const localPlayer = mp.players.local;

let CCBrowsers = {

    genderPicker: null,
    characterDetails: null,
    characterCreator: null,
    characterNotes: null
};

let cameraValues = {

    maleHeight: 0.6875,
    femaleHeight: 0.775,
    offset: 0,
    depth: 0.4,
    height: 0,

    'camerarotation': 0,
    'cameradepth': 0,
    'cameraoffset': 0,
    'cameraheight': 0
};

let tracker = {

};
let checkBoxEvents = {};

let ccCamera = null;
let initialCameraPosition = null;
let previousHeading;

mp.events.add("showVehicleDetails", (description) => {
    mp.events.call("toggleHUDForPlayer", false);

    CCBrowsers.vehicleDetails = mp.browsers.new("package://gtalife/CustomizationMenu/vehicledescription.html");
    CCBrowsers.vehicleDetails.execute(`Initialize(${description});`);

    mp.gui.cursor.show(true, true);
    mp.events.call("setCefActive", true);
});

mp.events.add("showContainerDetails", (description) => {
    mp.events.call("toggleHUDForPlayer", false);

    CCBrowsers.containerDetails = mp.browsers.new("package://gtalife/CustomizationMenu/containerdescription.html");
    CCBrowsers.containerDetails.execute(`Initialize(${description});`);

    mp.gui.cursor.show(true, true);
    mp.events.call("setCefActive", true);
});

mp.events.add("confirmContainerDescription", (description) => {
    CCBrowsers.containerDetails.destroy();
    CCBrowsers.containerDetails = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);

    mp.gui.cursor.show(false, false);
    mp.events.callRemote("save_container_details", description);
});

mp.events.add("CHARACTER:NOTES:SHOW", (characterName, characterNotes) => {
    mp.events.call("toggleHUDForPlayer", false);

    CCBrowsers.characterNotes = mp.browsers.new("package://gtalife/CustomizationMenu/characternotes.html");
    CCBrowsers.characterNotes.execute(`Initialize(${characterName}, ${characterNotes});`);

    mp.gui.cursor.show(true, true);
    mp.events.call("setCefActive", true);
});

mp.events.add("CHARACTER:NOTE:SAVE", (characterNoteData) => {
    CCBrowsers.characterNotes.destroy();
    CCBrowsers.characterNotes = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);

    mp.gui.cursor.show(false, false);
    mp.events.callRemote("CHARACTER:NOTE:CALLBACK", characterNoteData);
});

mp.events.add("CHARACTER:NOTE:CLOSE", () => {
    CCBrowsers.characterNotes.destroy();
    CCBrowsers.characterNotes = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);

    mp.gui.cursor.show(false, false);
});


mp.events.add("confirmVehicleDescription", (description) => {
    CCBrowsers.vehicleDetails.destroy();
    CCBrowsers.vehicleDetails = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);

    mp.gui.cursor.show(false, false);
    mp.events.callRemote("save_vehicle_details", description);
});

mp.events.add('showCharacterDetails', (age, attributes) => {

    mp.events.call('toggleHUDForPlayer', false);

    CCBrowsers.characterDetails = mp.browsers.new("package://gtalife/CustomizationMenu/description.html");
    CCBrowsers.characterDetails.execute(`Initialize(${age}, ${attributes});`);
    mp.gui.cursor.show(true, true);
    mp.events.call('setCefActive', true);
});

mp.events.add('confirmDescription', (age, attributes) => {

    CCBrowsers.characterDetails.destroy();
    CCBrowsers.characterDetails = null;

    mp.events.call('toggleHUDForPlayer', true);
    mp.events.call('setCefActive', false);
    mp.gui.cursor.show(false, false);
    mp.events.callRemote("save_player_character_details", age, attributes);
});

mp.events.add('beginCharacterCreation', () => {

    mp.events.call('toggleHUDForPlayer', false);

    let pos = localPlayer.getOffsetFromInWorldCoords(cameraValues.offset, cameraValues.depth, (tracker.pickedFemale == true ? cameraValues.femaleHeight : cameraValues.maleHeight));
    ccCamera = mp.cameras.new('default', pos, new mp.Vector3(0, 0, (localPlayer.getHeading() + 180) % 360), 60);
    ccCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    initialCameraPosition = pos;
    previousHeading = localPlayer.getHeading();

    CCBrowsers.genderPicker = mp.browsers.new("package://gtalife/CustomizationMenu/gender.html");
    mp.gui.cursor.show(true, true);
});

mp.events.add('confirmedGender', (pickedFemale, randomize) => {

    mp.events.callRemote("play_anim", "friskstance");
    mp.events.callRemote('creation_' + (pickedFemale ? 'fe' : '') + 'male_skin');
    localPlayer.model = pickedFemale ? -1667301416 : 1885233650;

    if (pickedFemale == true && ccCamera != null) {

        let pos = localPlayer.getOffsetFromInWorldCoords(cameraValues.offset, cameraValues.depth, cameraValues.femaleHeight);
        ccCamera.setCoord(pos.x, pos.y, pos.z);
    }

    CCBrowsers.genderPicker.destroy();
    CCBrowsers.genderPicker = null;

    mp.events.call('initializeTrackersWithExistingData', pickedFemale, null, 0);

    CCBrowsers.characterCreator = mp.browsers.new("package://gtalife/CustomizationMenu/charactercreator.html");
    CCBrowsers.characterCreator.execute(`Initialize(${randomize}, ${false})`);

    mp.events.callRemote("play_anim", "friskstance");
});

mp.events.add('finishedCreatingCharacter', () => {

    CCBrowsers.characterCreator.destroy();
    CCBrowsers.characterCreator = null;

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;

    mp.gui.cursor.show(false, false);

    let data = CollectCCData();

    mp.events.callRemote("save_player_surgery_creation", 0, JSON.stringify(data), localPlayer.getDrawableVariation(0), localPlayer.getTextureVariation(0));

    mp.events.call('openHairMenuAfterNewCC', tracker.pickedFemale);

    mp.events.callRemote("play_anim", "friskstance");
});


mp.events.add('beginCharacterPlasticSurgery', (slots) => {

    if (CCBrowsers.characterCreator != null)
        return;

    mp.events.call('toggleHUDForPlayer', false);
    mp.events.callRemote("play_anim", "friskstance");

    let maximumValues = {
        'hair': mp.players.local.getNumberOfDrawableVariations(2),
        'facialhair': mp.game.ped.getNumHeadOverlayValues(1),
        'eyebrows': mp.game.ped.getNumHeadOverlayValues(2),
        'chesthair': mp.game.ped.getNumHeadOverlayValues(10)
    };

    let pos = localPlayer.getOffsetFromInWorldCoords(cameraValues.offset, cameraValues.depth, (tracker.isFemale == true ? cameraValues.femaleHeight : cameraValues.maleHeight));
    ccCamera = mp.cameras.new('default', pos, new mp.Vector3(0, 0, (localPlayer.getHeading() + 180) % 360), 60);
    ccCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    previousHeading = localPlayer.getHeading();
    initialCameraPosition = pos;

    CCBrowsers.characterCreator = mp.browsers.new("package://gtalife/CustomizationMenu/charactercreator.html");
    CCBrowsers.characterCreator.execute(`Initialize(${false}, ${true}, ` + JSON.stringify(tracker) + `, ${slots-1})`);
    mp.gui.cursor.show(true, true);

    mp.events.callRemote("play_anim", "friskstance");
});

mp.events.add('finishedCharacterPlasticSurgery', () => {

    if (CCBrowsers.characterCreator == null)
        return;

    CCBrowsers.characterCreator.destroy();
    CCBrowsers.characterCreator = null;

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;

    mp.gui.cursor.show(false, false);

    mp.events.callRemote("unfreeze_clothes_player");
    mp.events.callRemote("reload_my_char");
    mp.events.call('toggleHUDForPlayer', true);
});

mp.events.add('forceClosePlasticSurgery', () => {
    if (CCBrowsers.characterCreator == null)
        return;

    CCBrowsers.characterCreator.destroy();
    CCBrowsers.characterCreator = null;

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;

    mp.gui.cursor.show(false, false);

    mp.events.call('toggleHUDForPlayer', true);
});

mp.events.add('loadFromOutfitSlotCC', () => {

    mp.events.callRemote("load_outfit_player", tracker['outfitslot']);
});

mp.events.add('saveToOutfitSlotCC', () => {

    let data = CollectCCData();
    mp.events.callRemote("save_player_surgery", tracker['outfitslot'], JSON.stringify(data), localPlayer.getDrawableVariation(0), localPlayer.getTextureVariation(0));
});

mp.events.add('saveToAllOutfitSlotsCC', () => {

    let data = CollectCCData();
    mp.events.callRemote("save_player_surgery_all", tracker['outfitslot'], JSON.stringify(data), localPlayer.getDrawableVariation(0), localPlayer.getTextureVariation(0));
});

mp.events.add('clientSideSliderInput', (menuItem, value) => {
    switch (menuItem) {

        case 'characterrotation':
            localPlayer.setHeading(previousHeading + value);
            break;
        case 'camerarotation':
        case 'cameradepth':
        case 'cameraoffset':
        case 'cameraheight':
            cameraValues[menuItem] = value;
            if (ccCamera != null) {

                if (initialCameraPosition) ccCamera.setCoord(initialCameraPosition.x + cameraValues['cameraoffset'], initialCameraPosition.y + cameraValues['cameradepth'], initialCameraPosition.z + cameraValues['cameraheight']);

                // let pos = localPlayer.getOffsetFromInWorldCoords(cameraValues.offset  + cameraValues.cameraoffset,
                //     cameraValues.depth + cameraValues.cameradepth,
                //     (tracker.isFemale == true ? cameraValues.femaleHeight : cameraValues.maleHeight) - cameraValues.cameraheight);
                //
                // ccCamera.setParams(pos.x, pos.y, pos.z,
                //     0, 0, (localPlayer.getHeading() % 360) + cameraValues.camerarotation,
                //     60, 100, 1, 1, 2);
            }
            break;
        case 'outfitslot':
            tracker[menuItem] = value;
            break;
        case 'faceone':
        case 'facetwo':
        case 'facethree':
        case 'faceblend':
        case 'skintoneblend':
        case 'skintonemix':
        case 'faceone2':
        case 'facetwo2':
        case 'facethree2':
            tracker[menuItem].value = value;

            if (typeof tracker.faceone == 'undefined') {
                tracker.faceone = 0;
            }

            if (typeof tracker.facetwo == 'undefined') {
                tracker.facetwo = 0;
            }
            if (typeof tracker.facethree == 'undefined') {
                tracker.facethree = 0;
                tracker.skintonemix = 0;
            }

            if (typeof tracker.faceone2 == 'undefined') {
                tracker.faceone2 = tracker.faceone;
            }

            if (typeof tracker.facetwo2 == 'undefined') {
                tracker.facetwo2 = tracker.facetwo;
            }
            if (typeof tracker.facethree2 == 'undefined') {
                tracker.facethree2 = tracker.facethree;
            }

            mp.events.callRemote(tracker[menuItem].eventName, tracker['faceone'].value, tracker['facetwo'].value, tracker['faceblend'].value, tracker['skintoneblend'].value, tracker['facethree'].value,tracker['skintonemix'].value, tracker['faceone2'].value, tracker['facetwo2'].value,tracker['facethree2'].value);
            break;
            // case 'facialblemishes':
            // case 'aging':
            //     tracker[menuItem].value = value;
            //     mp.events.callRemote(tracker[menuItem].eventName, (value == 0 ? 0 : value - 1), (value == 0 ? 0 : 100));
            //     break;
        default:
            //mitem: appearance-7Color1 | val: 6
            if (menuItem.includes('appearance-')) {
                if (typeof tracker['appearances'] !== 'object') tracker['appearances'] = [];
                if (typeof tracker['appearancesColor1'] !== 'object') tracker['appearancesColor1'] = [];
                if (typeof tracker['appearancesColor2'] !== 'object') tracker['appearancesColor2'] = [];
                if (typeof tracker['appearancesOpacity'] !== 'object') tracker['appearancesOpacity'] = [];

                if (menuItem.includes('Opacity')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Opacity', ''));
                    tracker['appearancesOpacity'][menuItem] = value;
                } else if (menuItem.includes('Color1')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Color1', ''));
                    tracker['appearancesColor1'][menuItem] = value;
                } else if (menuItem.includes('Color2')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Color2', ''));
                    tracker['appearancesColor2'][menuItem] = value;
                } else {
                    menuItem = parseInt(menuItem.replace('appearance-', ''));
                    value = parseInt(value);
                    if (value == 0) value = 256;
                    value--;
                    tracker['appearances'][menuItem] = value;
                }

                // menuItem is now the componentId for the HeadOverlay
                let variation = 0;
                if (typeof tracker['appearances'][menuItem] !== 'undefined') variation = tracker['appearances'][menuItem];
                let opacity = 100; // opacity default should be 100
                if (typeof tracker['appearancesOpacity'][menuItem] !== 'undefined') opacity = tracker['appearancesOpacity'][menuItem];
                let col1 = 0;
                if (typeof tracker['appearancesColor1'][menuItem] !== 'undefined') col1 = tracker['appearancesColor1'][menuItem];
                let col2 = 0;
                if (typeof tracker['appearancesColor2'][menuItem] !== 'undefined') col2 = tracker['appearancesColor2'][menuItem];
                mp.events.callRemote('apply_appearance', menuItem, variation, opacity, col1, col2);
            } else {
                if (typeof tracker[menuItem] === 'object') {
                    tracker[menuItem].value = value;
                    mp.events.callRemote(tracker[menuItem].eventName, value);
                }
            }
            break;
    }
});

mp.events.add('clientSideCheckBoxStateChange', (checkBox, state) => {

    checkBoxEvents[checkBox].enabled = state;
    mp.events.callRemote(checkBoxEvents[checkBox].eventName, 1, (state == true ? 100 : 0));
    mp.events.callRemote("apply_opacity", checkBoxEvents[checkBox].componentID, 1, (state == true ? 100 : 0));
});

mp.events.add('render', () => {

    if (ccCamera != null) {

        mp.game.controls.disableAllControlActions(2);
    }
});

mp.events.add('initializeTrackersWithExistingData', (pickedFemale, surgery, slot) => {

    tracker.isFemale = pickedFemale;
    tracker['outfitslot'] = ((isNaN(slot) || slot < 0 || slot > 19) ? 0 : slot);
    tracker['faceone'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[0])) };
    tracker['facetwo'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[1])) };
    tracker['facethree'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[39])) };
    tracker['faceone2'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[41])) };
    tracker['facetwo2'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[42])) };
    tracker['facethree2'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? (pickedFemale == true ? 31 : 0) : parseInt(surgery[43])) };
    tracker['faceblend'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? 50 : parseInt(surgery[2])) };
    tracker['skintoneblend'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? 50 : parseInt(surgery[3])) };
    tracker['skintonemix'] = { eventName: 'apply_head_blend', value: (pickedFemale != null ? 50 : parseInt(surgery[40])) };
    tracker['eyecolor'] = { eventName: 'apply_eye_color', value: (pickedFemale != null ? 0 : parseInt(surgery[4])) };
    tracker['nosewidth'] = { eventName: 'apply_nose_length', value: (pickedFemale != null ? 0 : parseInt(surgery[19])) };
    tracker['nosevertical'] = { eventName: 'apply_chin_shape', value: (pickedFemale != null ? 0 : parseInt(surgery[20])) };
    tracker['nosehorizontal'] = { eventName: 'apply_test_1', value: (pickedFemale != null ? 0 : parseInt(surgery[21])) };
    tracker['nosecurve'] = { eventName: 'apply_test_2', value: (pickedFemale != null ? 0 : parseInt(surgery[22])) };
    tracker['nosepoint'] = { eventName: 'apply_test_3', value: (pickedFemale != null ? 0 : parseInt(surgery[23])) };
    tracker['nosebend'] = { eventName: 'apply_test_4', value: (pickedFemale != null ? 0 : parseInt(surgery[24])) };
    tracker['eyebrowvertical'] = { eventName: 'apply_test_5', value: (pickedFemale != null ? 0 : parseInt(surgery[25])) };
    tracker['eyebrowhorizontal'] = { eventName: 'apply_test_6', value: (pickedFemale != null ? 0 : parseInt(surgery[26])) };
    tracker['malarvertical'] = { eventName: 'apply_test_7', value: (pickedFemale != null ? 0 : parseInt(surgery[27])) };
    tracker['malarhorizontal'] = { eventName: 'apply_test_8', value: (pickedFemale != null ? 0 : parseInt(surgery[28])) };
    tracker['cheekbonedepth'] = { eventName: 'apply_test_9', value: (pickedFemale != null ? 0 : parseInt(surgery[29])) };
    tracker['squint'] = { eventName: 'apply_test_10', value: (pickedFemale != null ? 0 : parseInt(surgery[30])) };
    tracker['lipsize'] = { eventName: 'apply_test_11', value: (pickedFemale != null ? 0 : parseInt(surgery[31])) };
    tracker['jawlinevertical'] = { eventName: 'apply_test_12', value: (pickedFemale != null ? 0 : parseInt(surgery[32])) };
    tracker['jawlinehorizontal'] = { eventName: 'apply_test_13', value: (pickedFemale != null ? 0 : parseInt(surgery[33])) };
    tracker['chinsize'] = { eventName: 'apply_test_14', value: (pickedFemale != null ? 0 : parseInt(surgery[34])) };
    tracker['chinlength'] = { eventName: 'apply_test_15', value: (pickedFemale != null ? 0 : parseInt(surgery[35])) };
    tracker['chinwidth'] = { eventName: 'apply_test_16', value: (pickedFemale != null ? 0 : parseInt(surgery[36])) };
    tracker['chinindent'] = { eventName: 'apply_test_17', value: (pickedFemale != null ? 0 : parseInt(surgery[37])) };
    tracker['neckwidth'] = { eventName: 'apply_test_18', value: (pickedFemale != null ? 0 : parseInt(surgery[38])) }; // this was missing

    if (typeof tracker['neckwidth'] === 'undefined' || tracker['neckwidth'] == null) {
        tracker['neckwidth'] = 0;
    }

    if (surgery != null && typeof surgery !== 'undefined') {
        tracker['appearances'] = [parseInt(surgery[5]), null, null, parseInt(surgery[7]), null, null, parseInt(surgery[9]), parseInt(surgery[11]), null, parseInt(surgery[13])];
        tracker['appearancesOpacity'] = [parseInt(surgery[6]), null, null, parseInt(surgery[8]), null, null, parseInt(surgery[10]), parseInt(surgery[12]), null, parseInt(surgery[14])];
    } else {
        tracker['appearances'] = [];
        tracker['appearancesOpacity'] = [];
    }

    tracker['appearancesColor1'] = [];
    tracker['appearancesColor2'] = [];



    /* OLD DATA

    tracker['facialblemishes']      = { eventName: 'apply_blemishes'     , value: (pickedFemale != null ? 0  : (parseInt(surgery[5]) + 1))  };
    tracker['aging']                = { eventName: 'apply_ageing'        , value: (pickedFemale != null ? 0  : (parseInt(surgery[7]) + 1))  };



    checkBoxEvents['complexion']    = { eventName: 'apply_complexion'    , componentID: 6 , enabled: (pickedFemale != null ? false : (parseInt(surgery[10]) > 0)) };
    checkBoxEvents['sundamage']     = { eventName: 'apply_sun_damage'    , componentID: 7 , enabled: (pickedFemale != null ? false : (parseInt(surgery[12]) > 0)) };
    checkBoxEvents['moles']         = { eventName: 'apply_moles'         , componentID: 9 , enabled: (pickedFemale != null ? false : (parseInt(surgery[14]) > 0)) };
    checkBoxEvents['bodyblemishes'] = { eventName: 'apply_body_blemishes', componentID: 11, enabled: (pickedFemale != null ? false : (parseInt(surgery[16]) > 0)) };*/
});

function CollectCCData() {

    let data = [];

    data.push(tracker['faceone'].value);
    data.push(tracker['facetwo'].value);
    data.push(tracker['faceblend'].value);
    data.push(tracker['skintoneblend'].value);
    data.push(tracker['eyecolor'].value);
    data.push((tracker['appearances'][0] == null) ? 0 : tracker['appearances'][0]); //blemishes
    data.push((tracker['appearancesOpacity'][0] == null) ? 0 : tracker['appearancesOpacity'][0]);
    data.push((tracker['appearances'][3] == null) ? 0 : tracker['appearances'][3]); //ageing
    data.push((tracker['appearancesOpacity'][3] == null) ? 100 : tracker['appearancesOpacity'][3]);
    data.push((tracker['appearances'][6] == null) ? 0 : tracker['appearances'][6]); //complexion
    data.push((tracker['appearancesOpacity'][6] == null) ? 100 : tracker['appearancesOpacity'][6]);
    data.push((tracker['appearances'][7] == null) ? 0 : tracker['appearances'][7]); //sun damage
    data.push((tracker['appearancesOpacity'][7] == null) ? 100 : tracker['appearancesOpacity'][7]);
    data.push((tracker['appearances'][9] == null) ? 0 : tracker['appearances'][9]); //moles
    data.push((tracker['appearancesOpacity'][9] == null) ? 100 : tracker['appearancesOpacity'][9]);
    data.push(0); //data.push((tracker['appearances'][11] == null) ? 0 : tracker['appearances'][11]);//body blemishes
    data.push(0); //data.push((tracker['appearancesOpacity'][11] == null) ? 100 : tracker['appearancesOpacity'][11]);
    data.push(0);
    data.push(0);
    data.push(tracker['nosewidth'].value);
    data.push(tracker['nosevertical'].value);
    data.push(tracker['nosehorizontal'].value);
    data.push(tracker['nosecurve'].value);
    data.push(tracker['nosepoint'].value);
    data.push(tracker['nosebend'].value);
    data.push(tracker['eyebrowvertical'].value);
    data.push(tracker['eyebrowhorizontal'].value);
    data.push(tracker['malarvertical'].value);
    data.push(tracker['malarhorizontal'].value);
    data.push(tracker['cheekbonedepth'].value);
    data.push(tracker['squint'].value);
    data.push(tracker['lipsize'].value);
    data.push(tracker['jawlinevertical'].value);
    data.push(tracker['jawlinehorizontal'].value);
    data.push(tracker['chinsize'].value);
    data.push(tracker['chinlength'].value);
    data.push(tracker['chinwidth'].value);
    data.push(tracker['chinindent'].value);
    data.push(tracker['neckwidth'].value); // This was missing
    data.push(tracker['facethree'].value);
    data.push(tracker['skintonemix'].value);
    data.push(tracker['faceone2'].value);
    data.push(tracker['facetwo2'].value);
    data.push(tracker['facethree2'].value);

    //const gtawAdaptor = ["nosewidth", "nosevertical", "nosehorizontal", "nosecurve", "nosepoint", "nosebend", "eyebrowvertical", "eyebrowhorizontal", "malarvertical", "malarhorizontal", "cheekbonedepth", "squint", "lipsize", "jawlinevertical", "jawlinehorizontal", "chinsize", "chinlength", "chinwidth", "chinindent", "neckwidth"];

    return data;
}

var inCreation = false;

mp.events.add('beginBarberCreation', (initialCreation = false, pickedFemale = false, maximumValues = {}, savedData = [], tattoos = [], maxOutfitsCount = 19) => {

    try {
        if (initialCreation) {
            mp.events.call('toggleHudForPlayer', false);
        }

        mp.gui.cursor.show(true, true);
        inCreation = initialCreation;

        let pos = localPlayer.getOffsetFromInWorldCoords(cameraValues.offset, cameraValues.depth, (tracker.pickedFemale == true ? cameraValues.femaleHeight : cameraValues.maleHeight));

        ccCamera = mp.cameras.new('default', pos, new mp.Vector3(0, 0, (localPlayer.getHeading() + 180) % 360), 60);

        ccCamera.setActive(true);

        mp.game.cam.renderScriptCams(true, false, 0, true, false);

        initialCameraPosition = pos;

        previousHeading = localPlayer.getHeading();


        CCBrowsers.barbershop = mp.browsers.new("package://gtalife/CustomizationMenu/barbershop.html");

        let pF = 'false';
        if (mp.players.local.model == mp.game.joaat('mp_f_freemode_01')) pF = 'true';


        let iC = 'false';
        if (initialCreation) {
            iC = 'true';
        }

        CCBrowsers.barbershop.execute('Initialize( ' + pF + ', ' + JSON.stringify(maximumValues) + ', ' + JSON.stringify(savedData) + ', ' + JSON.stringify(tattoos) + ', ' + iC + ', ' + maxOutfitsCount + ' );');

        if (initialCreation) {
            CCBrowsers.barbershop.execute('jQuery( "#close" ).addClass("uk-hidden");');
        }

        mp.events.callRemote("play_anim", "friskstance");
    } catch (e) {
        mp.gui.chat.show(true);
        mp.gui.chat.push('[ERROR] beginBarberCreation: ' + e.message);

        if (initialCreation) {
            mp.events.call('openHairMenuAfterNewCC', mp.players.local.model == mp.game.joaat('mp_f_freemode_01'));
            mp.gui.chat.push('Retrying...');
        } else {
            mp.gui.chat.push('Please try again.');
        }
    }
});

mp.events.add('clientSideSliderInput_Barber', (menuItem, value) => {

    switch (menuItem) {

        case 'characterrotation':
            localPlayer.setHeading(previousHeading + value);
            break;
        case 'camerarotation':
        case 'cameradepth':
        case 'cameraoffset':
        case 'cameraheight':
            cameraValues[menuItem] = value;
            if (ccCamera != null) {

                if (initialCameraPosition) ccCamera.setCoord(initialCameraPosition.x + cameraValues['cameraoffset'], initialCameraPosition.y + cameraValues['cameradepth'], initialCameraPosition.z + cameraValues['cameraheight']);
            }
            break;
        case 'outfitslot':
            tracker[menuItem] = value;
            break;
        case 'hair':
            tracker[menuItem] = value;
            mp.events.callRemote("apply_hair_drawable", value, tracker.hairVariation || 0);
            break;
        case 'hairColor1':
            tracker[menuItem] = value;
            mp.events.callRemote("apply_hair_color", value, tracker.hairColor2 || 0);
            break;
        case 'hairColor2':
            tracker[menuItem] = value;
            mp.events.callRemote("apply_hair_highlight", tracker.hairColor1 || 0, value);
            break;
        case 'hairVariation':
            tracker[menuItem] = value;
            mp.events.callRemote("apply_hair_texture", value, tracker.hair || 0);
            break;
        default:
            //mitem: appearance-7Color1 | val: 6
            if (menuItem.includes('appearance-')) {
                if (typeof tracker['appearances'] !== 'object') tracker['appearances'] = [];
                if (typeof tracker['appearancesColor1'] !== 'object') tracker['appearancesColor1'] = [];
                if (typeof tracker['appearancesColor2'] !== 'object') tracker['appearancesColor2'] = [];
                if (typeof tracker['appearancesOpacity'] !== 'object') tracker['appearancesOpacity'] = [];
                if (typeof tracker['appearancesVariation'] !== 'object') tracker['appearancesVariation'] = [];

                if (menuItem.includes('Opacity')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Opacity', ''));
                    tracker['appearancesOpacity'][menuItem] = value;
                } else if (menuItem.includes('Color1')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Color1', ''));
                    tracker['appearancesColor1'][menuItem] = value;
                } else if (menuItem.includes('Color2')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Color2', ''));
                    tracker['appearancesColor2'][menuItem] = value;
                } else if (menuItem.includes('Variation')) {
                    menuItem = parseInt(menuItem.replace('appearance-', '').replace('Variation', ''));
                    tracker['appearancesVariation'][menuItem] = value;
                } else {
                    menuItem = parseInt(menuItem.replace('appearance-', ''));
                    value = parseInt(value);
                    if (value == 0) value = 256;
                    value--;
                    tracker['appearances'][menuItem] = value;
                }

                // menuItem is now the componentId for the HeadOverlay
                let variation = 0;
                if (typeof tracker['appearances'][menuItem] !== 'undefined') variation = tracker['appearances'][menuItem];
                let opacity = 100; // opacity default should be 100
                if (typeof tracker['appearancesOpacity'][menuItem] !== 'undefined') opacity = tracker['appearancesOpacity'][menuItem];
                let col1 = 0;
                if (typeof tracker['appearancesColor1'][menuItem] !== 'undefined') col1 = tracker['appearancesColor1'][menuItem];
                let col2 = 0;
                if (typeof tracker['appearancesColor2'][menuItem] !== 'undefined') col2 = tracker['appearancesColor2'][menuItem];
                mp.events.callRemote('apply_appearance', menuItem, variation, opacity, col1, col2);
            } else {
                // tracker[menuItem] = value;
                // mp.events.callRemote( 'apply_hair' );
            }
            break;
    }
});

mp.events.add('barbershop_update_hair_variations', (hairid) => {
    let variations = mp.players.local.getNumberOfTextureVariations(2, parseInt(hairid));
    if (CCBrowsers && CCBrowsers.barbershop) {
        CCBrowsers.barbershop.execute('jQuery( "#hairVariation" ).slider( "value", 0 );');
        CCBrowsers.barbershop.execute('jQuery( "#hairVariation" ).slider( "option", "max", ' + variations + ' );');
    }
});

mp.events.add('cancelBarbershop', () => {
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;

    mp.gui.cursor.show(false, false);

    mp.events.callRemote("unfreeze_clothes_player");
    mp.events.callRemote("reload_my_char");
    mp.events.call('toggleHUDForPlayer', true);
    try {
        if (typeof CCBrowsers === 'undefined' || typeof CCBrowsers.barbershop === 'undefined' || typeof CCBrowsers.barbershop == null) return;
        CCBrowsers.barbershop.destroy();
        CCBrowsers.barbershop = null;
    } catch (e) {}
});

mp.events.add('closeBarberShop', () => {
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;

    mp.gui.cursor.show(false, false);

    mp.events.call('toggleHUDForPlayer', true);
    try {
        if (typeof CCBrowsers === 'undefined' || typeof CCBrowsers.barbershop === 'undefined' || typeof CCBrowsers.barbershop == null) return;
        CCBrowsers.barbershop.destroy();
        CCBrowsers.barbershop = null;
    } catch (e) {}
});

mp.events.add('barbershop_save_all_outfits', () => {
    for (let i = 0; i < 11; i++) {
        if (!tracker.appearances[i]) tracker.appearances[i] = 0;
        if (!tracker.appearancesColor1[i]) tracker.appearancesColor1[i] = 0;
        if (!tracker.appearancesColor2[i]) tracker.appearancesColor2[i] = 0;
        if (typeof tracker.appearancesOpacity[i] === 'undefined' || tracker.appearancesOpacity[i] == null) tracker.appearancesOpacity[i] = 100;
    }

    tracker.hair = tracker.hair || 0;
    tracker.hairVariation = tracker.hairVariation || 0;
    tracker.hairColor1 = tracker.hairColor1 || 0;
    tracker.hairColor2 = tracker.hairColor2 || 0;

    var data = [];
    data.push(tracker.hair);
    data.push(tracker.hairVariation);
    data.push(tracker.hairColor1);
    data.push(tracker.hairColor2);
    data.push(tracker.appearances[1]);
    data.push(tracker.appearancesColor1[1]);
    data.push(tracker.appearancesOpacity[1]);
    data.push(tracker.appearances[2]);
    data.push(tracker.appearancesColor1[2]);
    data.push(tracker.appearancesOpacity[2]);
    data.push(tracker.appearances[10]);
    data.push(tracker.appearancesColor1[10]);
    data.push(tracker.appearancesOpacity[10]);
    var jsonobj = JSON.stringify(data);
    mp.events.callRemote('save_player_barber_all', tracker.outfitslot, jsonobj, JSON.stringify(tattoos));
});

mp.events.add('barbershop_save_to_outfit', () => {
    for (let i = 0; i < 11; i++) {
        if (!tracker.appearances[i]) tracker.appearances[i] = 0;
        if (!tracker.appearancesColor1[i]) tracker.appearancesColor1[i] = 0;
        if (!tracker.appearancesColor2[i]) tracker.appearancesColor2[i] = 0;
        if (typeof tracker.appearancesOpacity[i] === 'undefined' || tracker.appearancesOpacity[i] == null) tracker.appearancesOpacity[i] = 100;
    }

    tracker.hair = tracker.hair || 0;
    tracker.hairVariation = tracker.hairVariation || 0;
    tracker.hairColor1 = tracker.hairColor1 || 0;
    tracker.hairColor2 = tracker.hairColor2 || 0;

    var data = [];
    data.push(tracker.hair);
    data.push(tracker.hairVariation);
    data.push(tracker.hairColor1);
    data.push(tracker.hairColor2);
    data.push(tracker.appearances[1]);
    data.push(tracker.appearancesColor1[1]);
    data.push(tracker.appearancesOpacity[1]);
    data.push(tracker.appearances[2]);
    data.push(tracker.appearancesColor1[2]);
    data.push(tracker.appearancesOpacity[2]);
    data.push(tracker.appearances[10]);
    data.push(tracker.appearancesColor1[10]);
    data.push(tracker.appearancesOpacity[10]);
    var jsonobj = JSON.stringify(data);
    mp.events.callRemote('save_player_barber', tracker.outfitslot, jsonobj, JSON.stringify(tattoos));
});

mp.events.add('barbershop_load_outfit', () => {
    mp.events.callRemote('load_outfit_player', tracker.outfitslot);
});

mp.events.add('finishBarberCreation', (tats = [], toOutfit = -1) => {
    tattoos = JSON.parse(tats);
    for (let i = 0; i < 11; i++) {
        if (!tracker.appearances[i]) tracker.appearances[i] = 0;
        if (!tracker.appearancesColor1[i]) tracker.appearancesColor1[i] = 0;
        if (!tracker.appearancesColor2[i]) tracker.appearancesColor2[i] = 0;
        if (typeof tracker.appearancesOpacity[i] === 'undefined' || tracker.appearancesOpacity[i] == null) tracker.appearancesOpacity[i] = 100;
    }

    tracker.hair = tracker.hair || 0;
    tracker.hairVariation = tracker.hairVariation || 0;
    tracker.hairColor1 = tracker.hairColor1 || 0;
    tracker.hairColor2 = tracker.hairColor2 || 0;

    var data = [];
    data.push(tracker.hair);
    data.push(tracker.hairVariation);
    data.push(tracker.hairColor1);
    data.push(tracker.hairColor2);
    data.push(tracker.appearances[1]);
    data.push(tracker.appearancesColor1[1]);
    data.push(tracker.appearancesOpacity[1]);
    data.push(tracker.appearances[2]);
    data.push(tracker.appearancesColor1[2]);
    data.push(tracker.appearancesOpacity[2]);
    data.push(tracker.appearances[10]);
    data.push(tracker.appearancesColor1[10]);
    data.push(tracker.appearancesOpacity[10]);
    var jsonobj = JSON.stringify(data);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    ccCamera = null;
    if (inCreation) {
        mp.events.callRemote('save_player_barber_creation', 0, jsonobj, tats);
        mp.events.call('do_barber_creation_end');

        if (CCBrowsers.barbershop) CCBrowsers.barbershop.destroy();
        CCBrowsers.barbershop = null;
        mp.gui.cursor.show(false, false);
    } else {
        if (toOutfit === -1) {
            mp.events.callRemote('save_player_barber_all', 0, jsonobj, tats);
        } else {
            mp.events.callRemote('save_player_barber', toOutfit, jsonobj, tats);
        }
    }
});

var tattoos = [];
mp.events.add('updateHeadTattoos', (tats) => {
    tattoos = JSON.parse(tats);
    mp.events.call('DisplayHairTattoos', tracker.hairColor1 || 0, tracker.hairColor2 || 0);
});

var hairDecalsList = [
    [ // male
        { name: "Close Shave", collection: "mpbeach_overlays", overlay: "FM_Hair_Fuzz" },
        { name: "Buzzcut", collection: "multiplayer_overlays", overlay: "NG_M_Hair_001" },
        { name: "Faux Hawk", collection: "multiplayer_overlays", overlay: "NG_M_Hair_002" },
        { name: "Hipster", collection: "multiplayer_overlays", overlay: "NG_M_Hair_003" },
        { name: "Side Parting", collection: "multiplayer_overlays", overlay: "NG_M_Hair_004" },
        { name: "Shorter Cut", collection: "multiplayer_overlays", overlay: "NG_M_Hair_005" },
        { name: "Biker", collection: "multiplayer_overlays", overlay: "NG_M_Hair_006" },
        { name: "Ponytail", collection: "multiplayer_overlays", overlay: "NG_M_Hair_007" },
        { name: "Cornrows", collection: "multiplayer_overlays", overlay: "NG_M_Hair_008" },
        { name: "Slicked", collection: "multiplayer_overlays", overlay: "NG_M_Hair_009" },
        { name: "Short Brushed", collection: "multiplayer_overlays", overlay: "NG_M_Hair_013" },
        { name: "Spikey", collection: "multiplayer_overlays", overlay: "NG_M_Hair_002" },
        { name: "Caesar", collection: "multiplayer_overlays", overlay: "NG_M_Hair_011" },
        { name: "Chopped", collection: "multiplayer_overlays", overlay: "NG_M_Hair_012" },
        { name: "Dreads", collection: "multiplayer_overlays", overlay: "NG_M_Hair_014" },
        { name: "Long Hair", collection: "multiplayer_overlays", overlay: "NG_M_Hair_015" },
        { name: "Shaggy Curls", collection: "multiplayer_overlays", overlay: "NGBea_M_Hair_000" },
        { name: "Surfer Dude", collection: "multiplayer_overlays", overlay: "NGBea_M_Hair_001" },
        { name: "Short Side Part", collection: "multiplayer_overlays", overlay: "NGBus_M_Hair_000" },
        { name: "High Slicked Sides", collection: "multiplayer_overlays", overlay: "NGBus_M_Hair_001" },
        { name: "Long Slicked", collection: "multiplayer_overlays", overlay: "NGHip_M_Hair_000" },
        { name: "Hipster Youth", collection: "multiplayer_overlays", overlay: "NGHip_M_Hair_001" },
        { name: "Mullet", collection: "multiplayer_overlays", overlay: "NGInd_M_Hair_000" },
        { name: "Classic Cornrows", collection: "mplowrider_overlays", overlay: "LR_M_Hair_000" },
        { name: "Palm Cornrows", collection: "mplowrider_overlays", overlay: "LR_M_Hair_001" },
        { name: "Lightning Cornrows", collection: "mplowrider_overlays", overlay: "LR_M_Hair_002" },
        { name: "Whipped Cornrows", collection: "mplowrider_overlays", overlay: "LR_M_Hair_003" },
        { name: "Zig Zag Cornrows", collection: "mplowrider2_overlays", overlay: "LR_M_Hair_004" },
        { name: "Snail Cornrows", collection: "mplowrider2_overlays", overlay: "LR_M_Hair_005" },
        { name: "Hightop", collection: "mplowrider2_overlays", overlay: "LR_M_Hair_006" },
        { name: "Loose Swept Back", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_000_M" },
        { name: "Undercut Swept Back", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_001_M" },
        { name: "Undercut Swept Side", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_002_M" },
        { name: "Spiked Mohawk", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_003_M" },
        { name: "Mod", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_004_M" },
        { name: "Layered Mod", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_005_M" },
        { name: "Flattop", collection: "mpgunrunning_overlays", overlay: "MP_Gunrunning_Hair_M_000_M" },
        { name: "Military Buzzcut", collection: "mpgunrunning_overlays", overlay: "MP_Gunrunning_Hair_M_001_M" }
    ],
    [ // female
        { name: "Close Shave", collection: "mpbeach_overlays", overlay: "FM_Hair_Fuzz" },
        { name: "Short", collection: "multiplayer_overlays", overlay: "NG_F_Hair_001" },
        { name: "Layered Bob", collection: "multiplayer_overlays", overlay: "NG_F_Hair_002" },
        { name: "Pigtails", collection: "multiplayer_overlays", overlay: "NG_F_Hair_003" },
        { name: "Ponytail", collection: "multiplayer_overlays", overlay: "NG_F_Hair_004" },
        { name: "Braided Mohawk", collection: "multiplayer_overlays", overlay: "NG_F_Hair_005" },
        { name: "Braids", collection: "multiplayer_overlays", overlay: "NG_F_Hair_006" },
        { name: "Bob", collection: "multiplayer_overlays", overlay: "NG_F_Hair_007" },
        { name: "Faux Hawk", collection: "multiplayer_overlays", overlay: "NG_F_Hair_008" },
        { name: "French Twist", collection: "multiplayer_overlays", overlay: "NG_F_Hair_009" },
        { name: "Long Bob", collection: "multiplayer_overlays", overlay: "NG_F_Hair_010" },
        { name: "Loose Tied", collection: "multiplayer_overlays", overlay: "NG_F_Hair_011" },
        { name: "Pixie", collection: "multiplayer_overlays", overlay: "NG_F_Hair_012" },
        { name: "Shaved Bangs", collection: "multiplayer_overlays", overlay: "NG_F_Hair_013" },
        { name: "Top Knot", collection: "multiplayer_overlays", overlay: "NG_M_Hair_014" },
        { name: "Wavy Bob", collection: "multiplayer_overlays", overlay: "NG_M_Hair_015" },
        { name: "Messy Bun", collection: "multiplayer_overlays", overlay: "NGBea_F_Hair_000" },
        { name: "Pin Up Girl", collection: "multiplayer_overlays", overlay: "NGBea_F_Hair_001" },
        { name: "Tight Bun", collection: "multiplayer_overlays", overlay: "NG_F_Hair_007" },
        { name: "Twisted Bob", collection: "multiplayer_overlays", overlay: "NGBus_F_Hair_000" },
        { name: "Flapper Bob", collection: "multiplayer_overlays", overlay: "NGBus_F_Hair_001" },
        { name: "Big Bangs", collection: "multiplayer_overlays", overlay: "NGBea_F_Hair_001" },
        { name: "Braided Top Knot", collection: "multiplayer_overlays", overlay: "NGHip_F_Hair_000" },
        { name: "Mullet", collection: "multiplayer_overlays", overlay: "NGInd_F_Hair_000" },
        { name: "Pinched Cornrows", collection: "mplowrider_overlays", overlay: "LR_F_Hair_000" },
        { name: "Leaf Cornrows", collection: "mplowrider_overlays", overlay: "LR_F_Hair_001" },
        { name: "Zig Zag Cornrows", collection: "mplowrider_overlays", overlay: "LR_F_Hair_002" },
        { name: "Pigtail Bangs", collection: "mplowrider2_overlays", overlay: "LR_F_Hair_003" },
        { name: "Wave Braids", collection: "mplowrider2_overlays", overlay: "LR_F_Hair_003" },
        { name: "Coil Braids", collection: "mplowrider2_overlays", overlay: "LR_F_Hair_004" },
        { name: "Rolled Quiff", collection: "mplowrider2_overlays", overlay: "LR_F_Hair_006" },
        { name: "Loose Swept Back", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_000_F" },
        { name: "Undercut Swept Back", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_001_F" },
        { name: "Undercut Swept Side", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_002_F" },
        { name: "Spiked Mohawk", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_003_F" },
        { name: "Bandana and Braid", collection: "multiplayer_overlays", overlay: "NG_F_Hair_003" },
        { name: "Layered Mod", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_006_F" },
        { name: "Skinbyrd", collection: "mpbiker_overlays", overlay: "MP_Biker_Hair_004_F" },
        { name: "Neat Bun", collection: "mpgunrunning_overlays", overlay: "MP_Gunrunning_Hair_F_000_F" },
        { name: "Short Bob", collection: "mpgunrunning_overlays", overlay: "MP_Gunrunning_Hair_F_001_F" }
    ]
];

function DisplayHairTattoos(hairColor, hairHighlightColor) {

    if (Number.isInteger(hairColor) && Number.isInteger(hairHighlightColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);

    mp.players.local.clearFacialDecorations();

    // THIS FUNCTION NEEDS TO KNOW WHAT HAIR TATS PLAYER HAS
    tattoos.forEach(index => {
        // Display all within tattoos

        let gen = (mp.players.local.model == mp.game.joaat('mp_f_freemode_01') ? 1 : 0);

        if (typeof hairDecalsList[gen][index] !== 'object') {
            mp.game.chat.push('debug: hairDecalsList[' + gen + '][' + index + '] is not an object');
            return;
        }

        mp.players.local.setFacialDecoration(mp.game.joaat(hairDecalsList[gen][index].collection), mp.game.joaat(hairDecalsList[gen][index].overlay));

        // if(isMale()) mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[0][index].collection), mp.game.gameplay.getHashKey(hairDecalsList[0][index].overlay));
        // else mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[1][index].collection), mp.game.gameplay.getHashKey(hairDecalsList[1][index].overlay));
    });

    // if(!forceDisplay) {
    //
    //     if(Number.isInteger(hairColor) && Number.isInteger(hairColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);
    //     return;
    // }

    /*if(currentDisplay > 0) {

        // if currentDisplay is part of tattoos do nothing
        if(tattoos.includes(currentDisplay)) return;

        // Else display that one as well.
        if(isMale()) mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[0][currentDisplay].collection), mp.game.gameplay.getHashKey(hairDecalsList[0][currentDisplay].overlay));
        else mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[1][currentDisplay].collection), mp.game.gameplay.getHashKey(hairDecalsList[1][currentDisplay].overlay));
    }*/

    if (Number.isInteger(hairColor) && Number.isInteger(hairColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);
}

mp.events.add('DisplayHairTattoos', (hairColor, hairHighlightColor) => {
    DisplayHairTattoos(hairColor, hairHighlightColor);
});
}