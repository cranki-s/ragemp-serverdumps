{
let localPlayer = mp.players.local;

function switchGender(state) {
    if (state) {
        localPlayer.model = mp.game.joaat('mp_m_freemode_01')
    } else {
        localPlayer.model = mp.game.joaat('mp_f_freemode_01')
    }
}

function updateCharacter(json) {
    let character = JSON.parse(json);

    updateHairFeature(character);
    updateFaceFeature(character);
    updateHeadBlendData(character);
    updateFaceData(character);
}

function updateHairFeature(character) {
    localPlayer.setComponentVariation(2, parseInt(character.hairstyle), 0, 2);
    localPlayer.setHairColor(parseInt(character.hairstyle_color), parseInt(character.hairstyle_color_highlight));
}

function updateFaceFeature(character) {
    //Blemishes
    setHeadOverlay(0, character.blemishes, character.blemishes_visibility, 0, 0);
    //Facial Hair	
    setHeadOverlay(1, character.beard, character.beard_visibility, character.beard_color, character.beard_color_sec);
    //Eyebrows
    setHeadOverlay(2, character.eyebrow, character.eyebrow_width, character.eyebrow_color, character.eyebrow_color_sec);
    //Ageing
    setHeadOverlay(3, character.ageing, character.ageing_visibility, 0, 0);
    //Makeup
    setHeadOverlay(4, character.makeup, character.makeup_visibility, character.makeup_color, 0);
    //Blush
    setHeadOverlay(5, character.blush, character.blush_strength, 0, 0);
    //SunDamage
    setHeadOverlay(7, character.sundamage, character.sundamage_strength, 0, 0);
    //Lipstick
    setHeadOverlay(8, character.lipstick, character.lipstick_visibility, character.lipstick_color, character.lipstick_color_sec);
    //Moles/Freckles	
    setHeadOverlay(9, character.moles, character.moles_strength, 0, 0);
    //ChestHair	
    setHeadOverlay(10, character.chesthair, character.chesthair_strength, character.chesthair_color, character.chesthair_color_sec);
    //BodyBlemishes	
    setHeadOverlay(11, character.bodyblemishes, character.bodyblemishes_strenght, 0, 0);

    //EyeColor
    setEyeColor(character.eye_color);
}

function updateFaceData(character) {
    //nose width
    setFaceFeture(0, character.nose_width);
    //nose height
    setFaceFeture(1, character.nose_height);
    //nose length
    setFaceFeture(2, character.nose_length);
    //nose bridge
    setFaceFeture(3, character.nose_bridge);
    //nose tip
    setFaceFeture(4, character.nose_tip);
    //nose bridge shift
    setFaceFeture(5, character.nose_bridge_shift);
    //brow height
    setFaceFeture(6, character.brow_height);
    //brow width
    setFaceFeture(7, character.brow_width);
    //Cheekbone height	
    setFaceFeture(8, character.cheekbone_height);
    //Cheekbone width	
    setFaceFeture(9, character.cheekbone_width);
    //Cheeks width	
    setFaceFeture(10, character.cheeks_width);
    //Eyes
    setFaceFeture(11, character.eyes);
    //Lips
    setFaceFeture(12, character.lips);
    //Jaw width	
    setFaceFeture(13, character.jaw_width);
    //Jav height
    setFaceFeture(14, character.jaw_height);
    //Chin length	
    setFaceFeture(15, character.chin_length);
    //Chin position	
    setFaceFeture(16, character.chin_position);
    //Chin width	
    setFaceFeture(17, character.chin_width);
    //Chin shape	
    setFaceFeture(18, character.chin_shape);
    //Neck width	
    setFaceFeture(19, character.neck_width);
}

function setHeadOverlay(overlayID, index, opacity, firstColor, secondColor) {
    localPlayer.setHeadOverlay(parseInt(overlayID), parseInt(index), parseInt(opacity) * 0.1, parseInt(firstColor), parseInt(secondColor));
}

function setFaceFeture(index, scale) {
    localPlayer.setFaceFeature(index, parseFloat(scale))
}

function setEyeColor(index) {
    localPlayer.setEyeColor(parseInt(index));
}

function updateHeadBlendData(character) {

    localPlayer.setHeadBlendData(
        // shape
        parseInt(character.mother),
        parseInt(character.father),
        0,

        // skin
        parseInt(character.mother),
        parseInt(character.father),
        0,

        // mixes
        parseFloat(character.similarity),
        parseFloat(character.skin_color),
        0,

        // isParent
        false
    );
}

let charCreatorHUD = null;

mp.events.add("Client:CharCreator:OpenWindow", (json) => {
    if (charCreatorHUD == null) {
        charCreatorHUD = mp.browsers.new("package://cef/Charcreator/index.html");
        mp.gui.cursor.show(true, true);
        mp.players.local.freezePosition(true);
        mp.game.ui.displayRadar(false);
        charCreatorHUD.execute(`setPlayerSliderRotation(${mp.players.local.getHeading()})`);
        charCreatorHUD.execute(`loadData('${json}')`);
        setTimeout(() => {
            mp.events.call('client:setcam', true);
            mp.events.call('client:setcamflag', 2);
        }, 50);
    }
});

mp.events.add("Client:CharCreator:UpdateData", (json) => {
    if (charCreatorHUD != null) {
        updateCharacter(json);
    }
});

mp.events.add("Client:CharCreator:SwitchGender", (state) => {
    if (charCreatorHUD != null) {
        switchGender(state);
    }
});


mp.events.add("Client:CharCreator:Leave", (code, json) => {
    if (charCreatorHUD != null) {
        mp.events.callRemote("Server:CharCreator:Leave", code, json);
    }
});

mp.events.add("Client:CharCreator:DestroyWindow", () => {
    if (charCreatorHUD != null) {
        mp.gui.cursor.show(false, false);
        mp.players.local.freezePosition(false);
        mp.game.ui.displayRadar(true);
        charCreatorHUD.destroy();
        charCreatorHUD = null;
        mp.events.call('client:setcam', false);
    }
});

mp.events.add("Client:CharCreator:Debug", (val) => {
    mp.game.graphics.notify(`${val}`);
});
}