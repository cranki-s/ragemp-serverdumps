{
var blacklist_items = true;
var enable_home_sync = true;
var resolution = mp.game.graphics.getScreenResolution(0, 0);
var posX = 1920 * 0.7;
var posY = 1080 * 0.3;
/* NativeUI */
const NativeUI = require("gtalife/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;


mp.events.add('entityStreamIn', (entity) => {
    try {
        if (entity == null) return 
        if (typeof entity === "undefined") return 
        if (entity.type !== 'player')
            return;
        if (enable_home_sync) {

            if(DebugValues)
                mp.gui.chat.push("[DEBUG] CharacterCustomizer.js");
            
                if (entity.getVariable("Mood")) //if(mp.game.app.appHasSyncedData("Mood"))
            {
                var mood = entity.getVariable("Mood");
                entity.setFacialIdleAnimOverride(mood, "Mood"); // needs tweaked.
            }
            if (entity.getVariable("WalkingStyle")) {
                entity.setMovementClipset(entity.getVariable("WalkingStyle"), 0.1);
            }

            if(DebugValues)
                mp.gui.chat.push("[DEBUG] CharacterCustomizer.js - END");
        }
    } catch (e) {}
});

/*
PED_VARIATION_FACE = 0,
PED_VARIATION_HEAD = 1,
PED_VARIATION_HAIR = 2,
PED_VARIATION_TORSO = 3,
PED_VARIATION_LEGS = 4,
PED_VARIATION_HANDS = 5,
PED_VARIATION_FEET = 6,
PED_VARIATION_EYES = 7,
PED_VARIATION_ACCESSORIES = 8,
PED_VARIATION_TASKS = 9,
PED_VARIATION_TEXTURES = 10,
PED_VARIATION_TORSO2 = 11
};
*/

let currentDisplay = -1;
let playerHairTattoo = [];
var hairDecalsList = [
    [ // male
        { name : "Close Shave",         collection :  "mpbeach_overlays",       overlay :  "FM_Hair_Fuzz"},
        { name : "Buzzcut",             collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_001"},
        { name : "Faux Hawk",           collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_002"},
        { name : "Hipster",             collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_003"},
        { name : "Side Parting",        collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_004"},
        { name : "Shorter Cut",         collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_005"},
        { name : "Biker",               collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_006"},
        { name : "Ponytail",            collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_007"},
        { name : "Cornrows",            collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_008"},
        { name : "Slicked",             collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_009"},
        { name : "Short Brushed",       collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_013"},
        { name : "Spikey",              collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_002"},
        { name : "Caesar",              collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_011"},
        { name : "Chopped",             collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_012"},
        { name : "Dreads",              collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_014"},
        { name : "Long Hair",           collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_015"},
        { name : "Shaggy Curls",        collection :  "multiplayer_overlays",   overlay :  "NGBea_M_Hair_000"},
        { name : "Surfer Dude",         collection :  "multiplayer_overlays",   overlay :  "NGBea_M_Hair_001"},
        { name : "Short Side Part",     collection :  "multiplayer_overlays",   overlay :  "NGBus_M_Hair_000"},
        { name : "High Slicked Sides",  collection :  "multiplayer_overlays",   overlay :  "NGBus_M_Hair_001"},
        { name : "Long Slicked",        collection :  "multiplayer_overlays",   overlay :  "NGHip_M_Hair_000"},
        { name : "Hipster Youth",       collection :  "multiplayer_overlays",   overlay :  "NGHip_M_Hair_001"},
        { name : "Mullet",              collection :  "multiplayer_overlays",   overlay :  "NGInd_M_Hair_000"},
        { name : "Classic Cornrows",    collection :  "mplowrider_overlays",    overlay :  "LR_M_Hair_000"},
        { name : "Palm Cornrows",       collection :  "mplowrider_overlays",    overlay :  "LR_M_Hair_001"},
        { name : "Lightning Cornrows",  collection :  "mplowrider_overlays",    overlay :  "LR_M_Hair_002"},
        { name : "Whipped Cornrows",    collection :  "mplowrider_overlays",    overlay :  "LR_M_Hair_003"},
        { name : "Zig Zag Cornrows",    collection :  "mplowrider2_overlays",   overlay :  "LR_M_Hair_004"},
        { name : "Snail Cornrows",      collection :  "mplowrider2_overlays",   overlay :  "LR_M_Hair_005"},
        { name : "Hightop",             collection :  "mplowrider2_overlays",   overlay :  "LR_M_Hair_006"},
        { name : "Loose Swept Back",    collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_000_M"},
        { name : "Undercut Swept Back", collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_001_M"},
        { name : "Undercut Swept Side", collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_002_M"},
        { name : "Spiked Mohawk",       collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_003_M"},
        { name : "Mod",                 collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_004_M"},
        { name : "Layered Mod",         collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_005_M"},
        { name : "Flattop",             collection :  "mpgunrunning_overlays",  overlay :  "MP_Gunrunning_Hair_M_000_M"},
        { name : "Military Buzzcut",    collection :  "mpgunrunning_overlays",  overlay :  "MP_Gunrunning_Hair_M_001_M"}
    ],
    [ // female
        { name : "Close Shave",         collection :  "mpbeach_overlays",       overlay :  "FM_Hair_Fuzz"},
        { name : "Short",               collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_001"},
        { name : "Layered Bob",         collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_002"},
        { name : "Pigtails",            collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_003"},
        { name : "Ponytail",            collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_004"},
        { name : "Braided Mohawk",      collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_005"},
        { name : "Braids",              collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_006"},
        { name : "Bob",                 collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_007"},
        { name : "Faux Hawk",           collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_008"},
        { name : "French Twist",        collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_009"},
        { name : "Long Bob",            collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_010"},
        { name : "Loose Tied",          collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_011"},
        { name : "Pixie",               collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_012"},
        { name : "Shaved Bangs",        collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_013"},
        { name : "Top Knot",            collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_014"},
        { name : "Wavy Bob",            collection :  "multiplayer_overlays",   overlay :  "NG_M_Hair_015"},
        { name : "Messy Bun",           collection :  "multiplayer_overlays",   overlay :  "NGBea_F_Hair_000"},
        { name : "Pin Up Girl",         collection :  "multiplayer_overlays",   overlay :  "NGBea_F_Hair_001"},
        { name : "Tight Bun",           collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_007"},
        { name : "Twisted Bob",         collection :  "multiplayer_overlays",   overlay :  "NGBus_F_Hair_000"},
        { name : "Flapper Bob",         collection :  "multiplayer_overlays",   overlay :  "NGBus_F_Hair_001"},
        { name : "Big Bangs",           collection :  "multiplayer_overlays",   overlay :  "NGBea_F_Hair_001"},
        { name : "Braided Top Knot",    collection :  "multiplayer_overlays",   overlay :  "NGHip_F_Hair_000"},
        { name : "Mullet",              collection :  "multiplayer_overlays",   overlay :  "NGInd_F_Hair_000"},
        { name : "Pinched Cornrows",    collection :  "mplowrider_overlays",    overlay :  "LR_F_Hair_000"},
        { name : "Leaf Cornrows",       collection :  "mplowrider_overlays",    overlay :  "LR_F_Hair_001"},
        { name : "Zig Zag Cornrows",    collection :  "mplowrider_overlays",    overlay :  "LR_F_Hair_002"},
        { name : "Pigtail Bangs",       collection :  "mplowrider2_overlays",   overlay :  "LR_F_Hair_003"},
        { name : "Wave Braids",         collection :  "mplowrider2_overlays",   overlay :  "LR_F_Hair_003"},
        { name : "Coil Braids",         collection :  "mplowrider2_overlays",   overlay :  "LR_F_Hair_004"},
        { name : "Rolled Quiff",        collection :  "mplowrider2_overlays",   overlay :  "LR_F_Hair_006"},
        { name : "Loose Swept Back",    collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_000_F"},
        { name : "Undercut Swept Back", collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_001_F"},
        { name : "Undercut Swept Side", collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_002_F"},
        { name : "Spiked Mohawk",       collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_003_F"},
        { name : "Bandana and Braid",   collection :  "multiplayer_overlays",   overlay :  "NG_F_Hair_003"},
        { name : "Layered Mod",         collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_006_F"},
        { name : "Skinbyrd",            collection :  "mpbiker_overlays",       overlay :  "MP_Biker_Hair_004_F"},
        { name : "Neat Bun",            collection :  "mpgunrunning_overlays",  overlay :  "MP_Gunrunning_Hair_F_000_F"},
        { name : "Short Bob",           collection :  "mpgunrunning_overlays",  overlay :  "MP_Gunrunning_Hair_F_001_F"}
    ]
];

let maleItems = new UIMenuListItem("Hair Tattoos (Male)", "Go right/left to preview, select add to include to wanted list.", new ItemsCollection(getMaleHairTattooNames()));
let femaleItems = new UIMenuListItem("Hair Tattoos (Female)", "Go right/left to preview, select add to include to wanted list.", new ItemsCollection(getFemaleHairTattooNames()));

function getMaleHairTattooNames() {
    let tattooNames = [];
    hairDecalsList[0].forEach(index => tattooNames.push(index.name));
    return tattooNames;
}

function getFemaleHairTattooNames() {
    let tattooNames = [];
    hairDecalsList[1].forEach(index => tattooNames.push(index.name));
    return tattooNames;
}

function isMale() {
    if(mp.players.local === undefined || mp.players.local == null) return null;
    return mp.players.local.getModel() == 1885233650 ? true : false;
}

// mp.events.add('DisplayHairTattoos', (haircolor, highlight) => DisplayHairTattoos(false, haircolor, highlight));

function DisplayHairTattoos(forceDisplay = true, hairColor = null, hairHighlightColor = null) { // Force display controls whether or not to show the display hair tattoo during previewing (going left <-> right)
    //mp.gui.chat.push("Data:" + playerHairTattoo + " | Curr: " + currentDisplay);

    if(hairColor == null) hairColor = tracker_hair_color;
    if(hairHighlightColor == null) hairHighlightColor = tracker_highlight;

    if(Number.isInteger(hairColor) && Number.isInteger(hairColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);

    mp.players.local.clearFacialDecorations();

    playerHairTattoo.forEach(index => {
        // Display all within playerHairTattoo
        if(isMale()) mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[0][index].collection), mp.game.gameplay.getHashKey(hairDecalsList[0][index].overlay));
        else mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[1][index].collection), mp.game.gameplay.getHashKey(hairDecalsList[1][index].overlay));
    });

    if(!forceDisplay) {

        if(Number.isInteger(hairColor) && Number.isInteger(hairColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);
        return;
    }

    if(currentDisplay > 0) {

        // if currentDisplay is part of playerHairTattoo do nothing
        if(playerHairTattoo.includes(currentDisplay)) return;

        // Else display that one as well.
        if(isMale()) mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[0][currentDisplay].collection), mp.game.gameplay.getHashKey(hairDecalsList[0][currentDisplay].overlay));
        else mp.players.local.setFacialDecoration(mp.game.gameplay.getHashKey(hairDecalsList[1][currentDisplay].collection), mp.game.gameplay.getHashKey(hairDecalsList[1][currentDisplay].overlay));
    }

    if(Number.isInteger(hairColor) && Number.isInteger(hairColor)) mp.players.local.setHairColor(hairColor, hairHighlightColor);
}

function convertValueToList(value) {
    var list = [];
    if (value <= 0)
        list.push("0");
    for (var i = 0; i < value; i++) {
        list.push(i.toString());
    }
    return list;
}

function convertValueToNegativeList(value) {
    var list = [];
    if (value <= 0)
        list.push("0");
    for (var i = -value + 1; i < value; i++) {
        list.push(i.toString());
    }
    return list;
}
/*
function isVariantBlacklistedFemale(component, drawable, texture) {
    if (blacklist_items === false)
        return false;

    if (texture === -1)
        return true;

    var found = false;
    for (var i = 0; i < blacklisted_female_comp.length; i++) {
        if (blacklisted_female_comp[i][0] === component) {
            if (blacklisted_female_comp[i][1] === drawable) {
                if (blacklisted_female_comp[i][2] === -1) {
                    found = true;
                    break;
                } else if (blacklisted_female_comp[i][2] === -2) {
                    var found_again = false;
                    for (var j = 0; j < blacklisted_female_comp[i][3].length; j++) {
                        if (blacklisted_female_comp[i][3][j] === texture) {
                            found_again = true;
                        }
                    }
                    if (found_again)
                        found = false;
                    else
                        found = true;
                    break;
                } else if (blacklisted_female_comp[i][2] === -3) {
                    var found_again = true;
                    for (var j = 0; j < blacklisted_female_comp[i][3].length; j++) {
                        if (blacklisted_female_comp[i][3][j] === texture) {
                            found_again = false;
                        }
                    }
                    if (found_again)
                        found = false;
                    else
                        found = true;
                    break;
                }
            } else if (blacklisted_female_comp[i][1] === -2) {
                var found_again = false;
                for (var j = 0; j < blacklisted_female_comp[i][2].length; j++) {
                    if (blacklisted_female_comp[i][2][j] === drawable) {
                        found_again = true;
                    }
                }

                if (found_again)
                    found = false;
                else
                    found = true;
                break;
            }
            else if (blacklisted_female_comp[i][1] === -1) {
                found = true;
                break;
            }
        }
    }
    return found;
}*/

function isInList(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (val === arr[i])
            return true;
    }
    return false;
}
/*
function findNearestLegibleTextureFemale(component, drawable) {
    for (var i = 0; i < blacklisted_female_comp.length; i++) {
        if (blacklisted_female_comp[i][0] === component) {
            if (blacklisted_female_comp[i][1] === drawable) {
                if (blacklisted_female_comp[i][2] === -1) {
                    return -1;
                } else if (blacklisted_female_comp[i][2] === -2) {
                    return blacklisted_female_comp[i][3][0];
                } else if (blacklisted_female_comp[i][2] === -3) {
                    var init = 0;
                    var found = false;
                    for (var j = 0; j < 50; j++) {
                        if (isInList(blacklisted_female_comp[i][3], j)) {
                        }
                        else {
                            init = j;
                            found = true;
                            break;
                        }
                    }

                    if (found)
                        return init;
                    else
                        return -1;
                }
            } else if (blacklisted_female_comp[i][1] === -2) {
                return -1;
            }
            else if (blacklisted_female_comp[i][1] === -1) {
                return -1;
            }
        }
    }
    return 0;
}

function findNearestLegibleTextureMale(component, drawable) {
    for (var i = 0; i < blacklisted_male_comp.length; i++) {
        if (blacklisted_male_comp[i][0] === component) {
            if (blacklisted_male_comp[i][1] === drawable) {
                if (blacklisted_male_comp[i][2] === -1) {
                    return -1;
                } else if (blacklisted_male_comp[i][2] === -2) {
                    return blacklisted_male_comp[i][3][0];
                } else if (blacklisted_male_comp[i][2] === -3) {
                    var init = 0;
                    var found = false;
                    for (var j = 0; j < 50; j++) {
                        if (isInList(blacklisted_male_comp[i][3], j)) {
                        }
                        else {
                            init = j;
                            found = true;
                            break;
                        }
                    }

                    if (found)
                        return init;
                    else
                        return -1;
                }
            } else if (blacklisted_male_comp[i][1] === -2) {
                return -1;
            }
            else if (blacklisted_male_comp[i][1] === -1) {
                return -1;
            }
        }
    }
    return 0;
}*/
/*
function isVariantBlacklistedMale(component, drawable, texture) {
    if (blacklist_items === false)
        return false;

    if (texture === -1)
        return true;

    var found = false;
    for (var i = 0; i < blacklisted_male_comp.length; i++) {
        if (blacklisted_male_comp[i][0] === component) {
            if (blacklisted_male_comp[i][1] === drawable) {
                if (blacklisted_male_comp[i][2] === -1) {
                    found = true;
                    break;
                } else if (blacklisted_male_comp[i][2] === -2) {
                    var found_again = false;
                    for (var j = 0; j < blacklisted_male_comp[i][3].length; j++) {
                        if (blacklisted_male_comp[i][3][j] === texture) {
                            found_again = true;
                        }
                    }
                    if (found_again)
                        found = false;
                    else
                        found = true;
                    break;
                } else if (blacklisted_male_comp[i][2] === -3) {
                    var found_again = true;
                    for (var j = 0; j < blacklisted_male_comp[i][3].length; j++) {
                        if (blacklisted_male_comp[i][3][j] === texture) {
                            found_again = false;
                        }
                    }
                    if (found_again)
                        found = false;
                    else
                        found = true;
                    break;
                }
            } else if (blacklisted_male_comp[i][1] === -2) {
                var found_again = false;
                for (var j = 0; j < blacklisted_male_comp[i][2].length; j++) {
                    if (blacklisted_male_comp[i][2][j] === drawable) {
                        found_again = true;
                    }
                }

                if (found_again)
                    found = false;
                else
                    found = true;
                break;
            }
            else if (blacklisted_male_comp[i][1] === -1) {
                found = true;
                break;
            }
        }
    }
    return found;
}
*/
var tracker_component = 0;
var tracker_drawable = 0;
var tracker_hair = 0;
var tracker_hair_texture = 0;
var tracker_hair_color = 0;
var tracker_highlight = 0;
var tracker_texture = 0;
var tracker_blend_1 = 0;
var tracker_blend_2 = 0;
var tracker_blend_3 = 0;
var tracker_skin_1 = 0;
var tracker_skin_2 = 0;
var tracker_skin_3 = 0;
var tracker_blend_mix = 0;
var tracker_skin_mix = 0;
var tracker_skinblend_mix = 0;
var tracker_eye_color = 0;
var tracker_opacity = 100;
var tracker_facial_feat = 0;
var tracker_blemishes = 0;
var tracker_blemishes_opacity = 0;
var tracker_blemishes_color = 0;
var tracker_facial_hair = 0;
var tracker_facial_hair_opacity = 0;
var tracker_facial_hair_color = 0;
var tracker_eyebrows = 0;
var tracker_eyebrows_opacity = 0;
var tracker_eyebrows_color = 0;
var tracker_ageing = 0;
var tracker_ageing_opacity = 0;
var tracker_ageing_color = 0;
var tracker_makeup = 0;
var tracker_makeup_opacity = 0;
var tracker_makeup_color = 0;
var tracker_makeup_color_2 = 0;
var tracker_blush = 0;
var tracker_blush_opacity = 0;
var tracker_blush_color = 0;
var tracker_blush_color_2 = 0;
var tracker_complexion = 0;
var tracker_complexion_opacity = 0;
var tracker_complexion_color = 0;
var tracker_sun_damage = 0;
var tracker_sun_damage_opacity = 0;
var tracker_sun_damage_color = 0;
var tracker_lipstick = 0;
var tracker_lipstick_opacity = 0;
var tracker_lipstick_color = 0;
var tracker_lipstick_color_2 = 0;
var tracker_moles = 0;
var tracker_moles_opacity = 0;
var tracker_moles_color = 0;
var tracker_chest_hair = 0;
var tracker_chest_hair_opacity = 0;
var tracker_chest_hair_color = 0;
var tracker_body_blemishes = 0;
var tracker_body_blemishes_opacity = 0;
var tracker_body_blemishes_color = 0;
var tracker_add_body_blemish = 0;
var tracker_add_body_blemish_opacity = 0;
var tracker_add_body_blemish_color = 0;
var tracker_color = 0;
var tracker_color_2 = 0;
var tracker_save_slot = 0;
var tracker_uniform_slot = 0;
var tracker_nose_width = 0;
var tracker_nose_vertical = 0;
var tracker_nose_horizontal = 0;
var tracker_nose_curve = 0;
var tracker_nose_point = 0;
var tracker_nose_bend = 0;
var tracker_eyebrow_vertical = 0;
var tracker_eyebrow_horizontal = 0;
var tracker_malar_vertical = 0;
var tracker_malar_horizontal = 0;
var tracker_cheekbone_depth = 0;
var tracker_squint = 0;
var tracker_lip_size = 0;
var tracker_jawline_vertical = 0;
var tracker_jawline_horizontal = 0;
var tracker_chin_size = 0;
var tracker_chin_length = 0;
var tracker_chin_width = 0;
var tracker_chin_indent = 0;
var tracker_neck_width = 0;
var tracker_hat = -1;
var tracker_glasses = -1;
var tracker_ear = -1;
var tracker_hat_texture = -1;
var tracker_glasses_texture = -1;
var tracker_ear_texture = -1;

var tracker_watch = -1;
var tracker_watch_texture = -1;
var tracker_bracelet = -1;
var tracker_bracelet_texture = -1;

var tracker_appearances = { 'appearances': [], 'appearancesColor1': [], 'appearancesColor2': [], 'appearancesOpacity': [] };

var listNoseWidth = convertValueToNegativeList(101);
var listNoseVertical = convertValueToNegativeList(101);
var listNoseHorizontal = convertValueToNegativeList(101);
var listNoseCurve = convertValueToNegativeList(101);
var listNosePoint = convertValueToNegativeList(101);
var listNoseBend = convertValueToNegativeList(101);
var listEyebrowVertical = convertValueToNegativeList(101);
var listEyebrowHorizontal = convertValueToNegativeList(101);
var listMalarVertical = convertValueToNegativeList(101);
var listMalarHorizontal = convertValueToNegativeList(101);
var listCheekboneDepth = convertValueToNegativeList(101);
var listSquint = convertValueToNegativeList(101);
var listLipSize = convertValueToNegativeList(101);
var listJawlineVertical = convertValueToNegativeList(101);
var listJawlineHorizontal = convertValueToNegativeList(101);
var listChinSize = convertValueToNegativeList(101);
var listChinLength = convertValueToNegativeList(101);
var listChinWidth = convertValueToNegativeList(101);
var listChinIndent = convertValueToNegativeList(101);

var in_progress = 0;
var initiated = 0;

var char_barber_menu;
var char_barber_menu_secondary;
var char_clothes_menu;
var char_clothes_menu_secondary;
var char_surgery_menu;
var char_surgery_menu_secondary ;
var char_tattoo_menu;
var char_surgery_menu_secondary;;
var char_tattoo_menu;
var char_tattoo_menu_secondary;
var char_cop_menu;
var char_cop_menu_secondary;
var char_wardrobe_menu;
var char_uniform_menu;
var char_skin_menu;
var char_skin_menu;
var creation_skin_menu;
var creation_clothes_menu;
var creation_clothes_menu_secondary;
var creation_surgery_menu;
var creation_surgery_menu_secondary;
var creation_barber_menu;
var creation_barber_menu_secondary;
var char_mask_menu ;


var wardrobe_max_slots = 20;
var wardrobe_names = ["outfit"];
var uniform_names = ["outfit"];


function closeAllMenus() {
    char_barber_menu.Visible = false;
    char_barber_menu_secondary.Visible = false;
    char_clothes_menu.Visible = false;
    char_clothes_menu_secondary.Visible = false;
    char_surgery_menu.Close();
    char_surgery_menu_secondary.Visible = false;
    char_tattoo_menu.Visible = false;
    char_tattoo_menu_secondary.Visible = false;
    char_cop_menu.Visible = false;
    char_clothes_menu_secondary.Visible = false;
    char_wardrobe_menu.Visible = false;
    char_uniform_menu.Visible = false;
    char_skin_menu.Visible = false;
    char_cop_menu_secondary.Visible = false;
    creation_skin_menu.Visible = false;
    creation_clothes_menu.Visible = false;
    creation_clothes_menu_secondary.Visible = false;
    creation_surgery_menu.Visible = false;
    creation_surgery_menu_secondary.Visible = false;
    creation_barber_menu.Visible = false;
    creation_barber_menu_secondary.Visible = false;
    char_mask_menu.Visible = false;
}

function initiateMenus()
{
    initiated = 1;
    char_barber_menu = new Menu("", "", new Point(posX, posY));
    char_barber_menu_secondary = new Menu("", "", new Point(posX, posY));
    char_barber_menu_secondary.AddItem(new UIMenuItem("Shirts1", ""));

    char_clothes_menu = new Menu("", "", new Point(posX, posY)); //
    char_clothes_menu_secondary = new Menu("", "", new Point(posX, posY));
    char_clothes_menu_secondary.AddItem(new UIMenuItem("Shirts2", ""));

    char_surgery_menu = new Menu("", "", new Point(posX, posY)); //
    char_surgery_menu_secondary = new Menu("", "", new Point(posX, posY));
    char_surgery_menu_secondary.AddItem(new UIMenuItem("Shirts3", ""));

    char_tattoo_menu = new Menu("", "", new Point(posX, posY));
    char_tattoo_menu_secondary = new Menu("", "", new Point(posX, posY));
    char_tattoo_menu_secondary.AddItem(new UIMenuItem("Shirts4", ""));

    char_cop_menu = new Menu("", "", new Point(posX, posY)); //
    char_cop_menu_secondary = new Menu("", "", new Point(posX, posY));
    char_cop_menu_secondary.AddItem(new UIMenuItem("Shirts5", ""));

    char_wardrobe_menu = new Menu("", "", new Point(posX, posY));
    char_uniform_menu = new Menu("", "", new Point(posX, posY));

    char_skin_menu = new Menu("", "", new Point(posX, posY));
    char_skin_menu.AddItem(new UIMenuItem("Shirts6", ""));

    creation_skin_menu = new Menu("", "", new Point(posX, posY));
    creation_skin_menu.AddItem(new UIMenuItem("Shirts7", ""));
    creation_clothes_menu = new Menu("", "", new Point(posX, posY)); //
    creation_clothes_menu_secondary = new Menu("", "", new Point(posX, posY));
    creation_clothes_menu_secondary.AddItem(new UIMenuItem("Shirts8", ""));
    creation_surgery_menu = new Menu("", "", new Point(posX, posY));
    creation_surgery_menu_secondary = new Menu("", "", new Point(posX, posY));
    creation_surgery_menu_secondary.AddItem(new UIMenuItem("Shirts9", ""));
    creation_barber_menu = new Menu("", "", new Point(posX, posY));
    creation_barber_menu_secondary = new Menu("", "", new Point(posX, posY));
    creation_barber_menu_secondary.AddItem(new UIMenuItem("Shirts10", ""));
    char_mask_menu = new Menu("", "", new Point(posX, posY));
    char_mask_menu.AddItem(new UIMenuItem("Shirts11", ""));
    /*
    API.setMenuBannerSprite(char_barber_menu, "shopui_title_barber3", "shopui_title_barber3");
    API.setMenuBannerSprite(char_barber_menu_secondary, "shopui_title_barber3", "shopui_title_barber3");
    API.setMenuBannerSprite(char_clothes_menu, "shopui_title_lowendfashion2", "shopui_title_lowendfashion2");
    API.setMenuBannerSprite(char_clothes_menu_secondary, "shopui_title_lowendfashion2", "shopui_title_lowendfashion2");
    API.setMenuBannerSprite(char_surgery_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_surgery_menu_secondary, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_tattoo_menu, "shopui_title_tattoos4", "shopui_title_tattoos4");
    API.setMenuBannerSprite(char_tattoo_menu_secondary, "shopui_title_tattoos4", "shopui_title_tattoos4");
    API.setMenuBannerSprite(char_cop_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_cop_menu_secondary, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_wardrobe_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_skin_menu, "shopui_title_lowendfashion2", "shopui_title_lowendfashion2");
    API.setMenuBannerSprite(creation_skin_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_clothes_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_clothes_menu_secondary, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_surgery_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_surgery_menu_secondary, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_barber_menu, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(creation_barber_menu_secondary, "commonmenu", "interaction_bgd");
    API.setMenuBannerSprite(char_mask_menu, "commonmenu", "interaction_bgd");
    API.setMenuTitle(creation_barber_menu, "Character creation");
    API.setMenuTitle(creation_barber_menu_secondary, "Character creation");
    API.setMenuTitle(creation_clothes_menu, "Character creation");
    API.setMenuTitle(creation_clothes_menu_secondary, "Character creation");
    API.setMenuTitle(creation_surgery_menu, "Character creation");
    API.setMenuTitle(creation_surgery_menu_secondary, "Character creation");
    API.setMenuTitle(creation_skin_menu, "Character creation");
    API.setMenuTitle(char_mask_menu, "Buy a mask");*/

//char_clothes_menu.AddItem(new UIMenuItem("Mask", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Shirts", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Undershirt", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Pants", ""));
//char_clothes_menu.AddItem(new UIMenuItem("Hands", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Shoes", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Torso", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Hats", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Glasses", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Ears", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Accessories", ""));
//char_clothes_menu.AddItem(new UIMenuItem("Accessories 2", ""));
    char_clothes_menu.AddItem(new UIMenuItem("Decals", ""));
    char_clothes_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names, 0)));
    char_clothes_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, 0)));
    char_clothes_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_clothes_menu.RefreshIndex();

    creation_clothes_menu.AddItem(new UIMenuItem("Torso", ""));
    creation_clothes_menu.AddItem(new UIMenuItem("Undershirt", ""));
    creation_clothes_menu.AddItem(new UIMenuItem("Shirts", ""));
    creation_clothes_menu.AddItem(new UIMenuItem("Pants", ""));
    creation_clothes_menu.AddItem(new UIMenuItem("Shoes", ""));
    creation_clothes_menu.AddItem(new UIMenuItem("~g~Confirm", ""));
    creation_clothes_menu.RefreshIndex();

    char_cop_menu.AddItem(new UIMenuItem("~y~Default Male Cop Outfit", "GTAO Only"));
    char_cop_menu.AddItem(new UIMenuItem("~y~Default Female Cop Outfit", "GTAO Only"));
    char_cop_menu.AddItem(new UIMenuItem("~y~Default Male Sheriff Outfit", "GTAO Only"));
    char_cop_menu.AddItem(new UIMenuItem("~y~Default Female Sheriff Outfit", "GTAO Only"));
//char_cop_menu.AddItem(new UIMenuItem("Mask", ""));
    char_cop_menu.AddItem(new UIMenuItem("Shirts", ""));
    char_cop_menu.AddItem(new UIMenuItem("Undershirt", ""));
    char_cop_menu.AddItem(new UIMenuItem("Pants", ""));
//char_clothes_menu.AddItem(new UIMenuItem("Hands", ""));
    char_cop_menu.AddItem(new UIMenuItem("Shoes", ""));
    char_cop_menu.AddItem(new UIMenuItem("Torso", ""));
    char_cop_menu.AddItem(new UIMenuItem("Hats", ""));
    char_cop_menu.AddItem(new UIMenuItem("Glasses", ""));
    char_cop_menu.AddItem(new UIMenuItem("Ears", ""));
    char_cop_menu.AddItem(new UIMenuItem("Accessories", ""));
//char_cop_menu.AddItem(new UIMenuItem("Accessories 2", ""));
    char_cop_menu.AddItem(new UIMenuItem("Decals", ""));
    char_cop_menu.AddItem(new UIMenuListItem("~g~Save Uniform", "Save Slots", new ItemsCollection(uniform_names, 0)));
    char_cop_menu.AddItem(new UIMenuListItem("~g~Select Uniform", "Selection Slots", new ItemsCollection(uniform_names, 0)));
    char_cop_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_cop_menu.RefreshIndex();

//char_surgery_menu.AddItem(new UIMenuItem("Head", "Non-GTAO"));
    char_surgery_menu.AddItem(new UIMenuListItem("Parent Face 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Parent Face 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Ancestry Face", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Ancestry Skin", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("1 <-Blend Mix-> 2", "GTAO Only Blend Ratio", new ItemsCollection(convertValueToList(101), 100)));
    char_surgery_menu.AddItem(new UIMenuListItem("1 <-Skin Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
    char_surgery_menu.AddItem(new UIMenuListItem("1 <-Override Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
    char_surgery_menu.AddItem(new UIMenuListItem("Eye Color", "GTAO Only", new ItemsCollection(convertValueToList(32), 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Width", "GTAO Only", new ItemsCollection(listNoseWidth, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Vertical", "GTAO Only", new ItemsCollection(listNoseVertical, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Horizontal", "GTAO Only", new ItemsCollection(listNoseHorizontal, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Curve", "GTAO Only", new ItemsCollection(listNoseCurve, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Point", "GTAO Only", new ItemsCollection(listNosePoint, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Nose Bend", "GTAO Only", new ItemsCollection(listNoseBend, 100)));
    char_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Vertical", "GTAO Only", new ItemsCollection(listEyebrowVertical, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Horizontal", "GTAO Only", new ItemsCollection(listEyebrowHorizontal, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Malar Vertical", "GTAO Only", new ItemsCollection(listMalarVertical, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Malar Horizontal", "GTAO Only", new ItemsCollection(listMalarHorizontal, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Cheekbone Depth", "GTAO Only", new ItemsCollection(listCheekboneDepth, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Squint", "GTAO Only", new ItemsCollection(listSquint, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Lip Size", "GTAO Only", new ItemsCollection(listLipSize, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Jawline Vertical", "GTAO Only", new ItemsCollection(listJawlineVertical, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Jawline Horizontal", "GTAO Only", new ItemsCollection(listJawlineHorizontal, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Chin Size", "GTAO Only", new ItemsCollection(listChinSize, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Chin Length", "GTAO Only", new ItemsCollection(listChinLength, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Chin Width", "GTAO Only", new ItemsCollection(listChinWidth, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("Chin Indent", "GTAO Only", new ItemsCollection(listChinIndent, 0)));
    char_surgery_menu.AddItem(new UIMenuItem("Blemishes", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Ageing", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Complexion", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Sun Damage", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Moles/Freckles", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Body Blemishes", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("Add Body Blemishes", "GTAO Only"));
    char_surgery_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $300"));
    char_surgery_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $300", new ItemsCollection(wardrobe_names, 0)));
    char_surgery_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, 0)));
    char_surgery_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_surgery_menu.RefreshIndex();

//creation_surgery_menu.AddItem(new UIMenuItem("Head", "Non-GTAO"));
//creation_surgery_menu.AddItem(new UIMenuItem("Beard", "")); Mask, no idea why
    creation_surgery_menu.AddItem(new UIMenuListItem("Parent Face 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Parent Face 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Ancestry Face", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Ancestry Skin", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("1 <-Blend Mix-> 2", "GTAO Only Blend Ratio", new ItemsCollection(convertValueToList(101), 100)));
    creation_surgery_menu.AddItem(new UIMenuListItem("1 <-Skin Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
    creation_surgery_menu.AddItem(new UIMenuListItem("1 <-Override Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Eye Color", "GTAO Only", new ItemsCollection(convertValueToList(32), 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Width", "GTAO Only", new ItemsCollection(listNoseWidth, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Vertical", "GTAO Only", new ItemsCollection(listNoseVertical, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Horizontal", "GTAO Only", new ItemsCollection(listNoseHorizontal, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Curve", "GTAO Only", new ItemsCollection(listNoseCurve, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Point", "GTAO Only", new ItemsCollection(listNosePoint, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Nose Bend", "GTAO Only", new ItemsCollection(listNoseBend, 100)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Vertical", "GTAO Only", new ItemsCollection(listEyebrowVertical, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Horizontal", "GTAO Only", new ItemsCollection(listEyebrowHorizontal, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Malar Vertical", "GTAO Only", new ItemsCollection(listMalarVertical, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Malar Horizontal", "GTAO Only", new ItemsCollection(listMalarHorizontal, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Cheekbone Depth", "GTAO Only", new ItemsCollection(listCheekboneDepth, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Squint", "GTAO Only", new ItemsCollection(listSquint, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Lip Size", "GTAO Only", new ItemsCollection(listLipSize, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Jawline Vertical", "GTAO Only", new ItemsCollection(listJawlineVertical, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Jawline Horizontal", "GTAO Only", new ItemsCollection(listJawlineHorizontal, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Chin Size", "GTAO Only", new ItemsCollection(listChinSize, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Chin Length", "GTAO Only", new ItemsCollection(listChinLength, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Chin Width", "GTAO Only", new ItemsCollection(listChinWidth, 0)));
    creation_surgery_menu.AddItem(new UIMenuListItem("Chin Indent", "GTAO Only", new ItemsCollection(listChinIndent, 0)));
    creation_surgery_menu.AddItem(new UIMenuItem("Blemishes", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Ageing", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Complexion", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Sun Damage", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Moles/Freckles", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Body Blemishes", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("Add Body Blemishes", "GTAO Only"));
    creation_surgery_menu.AddItem(new UIMenuItem("~g~Confirm", ""));
    creation_surgery_menu.RefreshIndex();

    char_tattoo_menu.AddItem(new UIMenuItem("Makeup", "GTAO Char. Only"));
    char_tattoo_menu.AddItem(new UIMenuItem("Blush", "GTAO Char. Only"));
    char_tattoo_menu.AddItem(new UIMenuItem("Lipstick", "GTAO Char. Only"));
    char_tattoo_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $100"));
    char_tattoo_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names, 0)));
    char_tattoo_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, 0)));
    char_tattoo_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_tattoo_menu.RefreshIndex();

    char_wardrobe_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, 0)));
    char_wardrobe_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_wardrobe_menu.RefreshIndex();

    char_uniform_menu.AddItem(new UIMenuListItem("~g~Select Uniform", "Selection Slots", new ItemsCollection(uniform_names, 0)));
    char_uniform_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_uniform_menu.RefreshIndex();

    char_barber_menu.AddItem(new UIMenuItem("Hair", "Hair style."));
    char_barber_menu.AddItem(new UIMenuItem("Facial Hair", "GTAO Only"));
    char_barber_menu.AddItem(new UIMenuItem("Chest Hair", "GTAO Only"));
    char_barber_menu.AddItem(new UIMenuItem("Eyebrows", "GTAO Only"));
    char_barber_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $100"));
    char_barber_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names, 0)));
    char_barber_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, 0)));
    char_barber_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
    char_barber_menu.RefreshIndex();

    creation_barber_menu.AddItem(new UIMenuItem("Hair", "Hair style."));
    creation_barber_menu.AddItem(new UIMenuItem("Facial Hair", "GTAO Only"));
    creation_barber_menu.AddItem(new UIMenuItem("Chest Hair", "GTAO Only"));
    creation_barber_menu.AddItem(new UIMenuItem("Eyebrows", "GTAO Only"));
    creation_barber_menu.AddItem(new UIMenuItem("~g~Confirm", ""));
    creation_barber_menu.RefreshIndex();

    char_barber_menu.ListChange.on(listChangeEventBarberMain);
    char_barber_menu_secondary.ListChange.on(listChangeEventBarberSecondary);
    char_clothes_menu.ListChange.on(listChangeEventClothesMain);
    char_mask_menu.ListChange.on(listChangeEventClothesSecondary);
    char_clothes_menu_secondary.ListChange.on(listChangeEventClothesSecondary);
    char_surgery_menu.ListChange.on(listChangeEventSurgeryMain);
    char_surgery_menu_secondary.ListChange.on(listChangeEventSurgerySecondary);
    char_tattoo_menu.ListChange.on(listChangeEventTattooMain);
    char_tattoo_menu_secondary.ListChange.on(listChangeEventTattooSecondary);
    char_cop_menu.ListChange.on(listChangeEventCopMain);
    char_cop_menu_secondary.ListChange.on(listChangeEventCopSecondary);
    char_wardrobe_menu.ListChange.on(listChangeEventWardrobeMain);
    char_uniform_menu.ListChange.on(listChangeEventWardrobeMain);
    char_skin_menu.ListChange.on(listChangeEventSkinMain);
    creation_skin_menu.ListChange.on(listChangeEventSkinCreationMain);
    creation_clothes_menu.ListChange.on(listChangeEventClothesMain); //not needed?
    creation_clothes_menu_secondary.ListChange.on(listChangeEventCreationClothesSecondary);
    creation_surgery_menu.ListChange.on(listChangeEventSurgeryCreationMain);
    creation_surgery_menu_secondary.ListChange.on(listChangeEventSurgeryCreationSecondary);
    creation_barber_menu.ListChange.on(listChangeEventCreationBarberMain);
    creation_barber_menu_secondary.ListChange.on(listChangeEventCreationBarberSecondary);

    char_surgery_menu.ItemSelect.on(onItemSelectSurgeryMain);
    char_surgery_menu_secondary.ItemSelect.on(onItemSelectSurgerySecondary);
    char_clothes_menu.ItemSelect.on(onItemSelectClothesMain);
    char_mask_menu.ItemSelect.on(onItemSelectClothesSecondary);
    char_clothes_menu_secondary.ItemSelect.on(onItemSelectClothesSecondary);
    char_barber_menu.ItemSelect.on(onItemSelectBarberMain);
    char_barber_menu_secondary.ItemSelect.on(onItemSelectBarberSecondary);
    char_tattoo_menu.ItemSelect.on(onItemSelectTattooMain);
    char_tattoo_menu_secondary.ItemSelect.on(onItemSelectTattooSecondary);
    char_cop_menu.ItemSelect.on(onItemSelectCopMain);
    char_cop_menu_secondary.ItemSelect.on(onItemSelectCopSecondary);
    char_wardrobe_menu.ItemSelect.on(onItemSelectWardrobeMain);
    char_uniform_menu.ItemSelect.on(onItemSelectWardrobeMain);
    char_skin_menu.ItemSelect.on(onItemSelectSkinMain);
    creation_skin_menu.ItemSelect.on(onItemSelectCreationSkin);
    creation_clothes_menu.ItemSelect.on(onItemSelectionCreationClothes);
    creation_clothes_menu_secondary.ItemSelect.on(onItemSelectionCreationClothesSecondary);
    creation_surgery_menu.ItemSelect.on(onItemSelectSurgeryCreationMain);
    creation_surgery_menu_secondary.ItemSelect.on(onItemSelectSurgeryCreationSecondary);
    creation_barber_menu.ItemSelect.on(onItemSelectCreationBarberMain);
    creation_barber_menu_secondary.ItemSelect.on(onItemSelectCreationBarberSecondary);


    closeAllMenus();


    char_surgery_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_surgery_menu_secondary.MenuClose.on(function (player) {
        char_surgery_menu.Visible = true;
    });

    char_clothes_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_mask_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_clothes_menu_secondary.MenuClose.on(function (player) {
        char_clothes_menu.Visible = true;
    });

    char_barber_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_barber_menu_secondary.MenuClose.on(function (player) {
        char_barber_menu.Visible = true;
    });

    char_tattoo_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_tattoo_menu_secondary.MenuClose.on(function (player) {
        char_tattoo_menu.Visible = true;
    });

    char_cop_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char_cop");
    });

    char_cop_menu_secondary.MenuClose.on(function (player) {
        char_cop_menu.Visible = true;
    });

    char_wardrobe_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_uniform_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    });

    char_skin_menu.MenuClose.on(function (player) {
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_skin");
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    });
}


//main_menu.Add(char_barber_menu);
/*menuPoolforModding.Add(char_barber_menu_secondary);
menuPoolforModding.Add(char_clothes_menu);
menuPoolforModding.Add(char_clothes_menu_secondary);
menuPoolforModding.Add(char_surgery_menu);
menuPoolforModding.Add(char_surgery_menu_secondary);
menuPoolforModding.Add(char_tattoo_menu);
menuPoolforModding.Add(char_tattoo_menu_secondary);
menuPoolforModding.Add(char_cop_menu);
menuPoolforModding.Add(char_cop_menu_secondary);
menuPoolforModding.Add(char_wardrobe_menu);
menuPoolforModding.Add(char_skin_menu);
menuPoolforModding.Add(creation_skin_menu);
menuPoolforModding.Add(creation_clothes_menu);
menuPoolforModding.Add(creation_clothes_menu_secondary);
menuPoolforModding.Add(creation_surgery_menu);
menuPoolforModding.Add(creation_surgery_menu_secondary);
menuPoolforModding.Add(creation_barber_menu);
menuPoolforModding.Add(creation_barber_menu_secondary);
menuPoolforModding.Add(char_mask_menu);*/
/*
char_cop_menu.AddItem(new UIMenuItem("Glasses", ""));
char_cop_menu.AddItem(new UIMenuItem("Gloves", ""));
char_cop_menu.AddItem(new UIMenuItem("Hats", ""));
char_cop_menu.AddItem(new UIMenuItem("~g~Save Uniform", ""));
char_cop_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));*/
//main_menu.Visible = true;

function onItemSelectCopSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        char_cop_menu.Visible = true;
        char_cop_menu_secondary.Visible = false;
    }
    else if (item.Text === "Remove") {
        if (tracker_component === 12) {
            tracker_hat = -1;
            mp.events.callRemote("remove_hat_data");
        }
        else if (tracker_component === 13) {
            tracker_glasses = -1;
            mp.events.callRemote("remove_glasses_data");
        }
        else if (tracker_component === 14) {
            tracker_ear = -1;
            tracker_ear_texture = -1;
            mp.events.callRemote("remove_ear_data");
        }
    }
}

function onItemSelectCreationSkin(item, index) {
    if (item.Text === "~g~Regular Skin") {
        mp.events.callRemote("creation_skin", item.Index);
        creation_skin_menu.Close();
        mp.events.callRemote("creation_end");
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        in_progress = 0;
        creation_clothes_menu.Visible = false;
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.events.callRemote("unfreeze_clothes_player");
    }
    else if (item.Text == "~y~Male") {
        mp.events.callRemote("creation_male_skin");
        creation_skin_menu.Close();
        creation_surgery_menu.Open();
        mp.players.local.model = 1885233650;
        mp.events.callRemote("play_anim", "friskstance");
        var vec2 = new mp.Vector3(402.9837, -997.0, -98.2404);
        cam = mp.cameras.new('default', vec2, mp.players.local.rotation, 60);
        cam.pointAtPedBone(mp.players.local, 12844, 0, 0, 0, true);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else if (item.Text == "~y~Female") {
        mp.events.callRemote("creation_female_skin");
        creation_skin_menu.Close();
        creation_surgery_menu.Open();
        mp.players.local.model = -1667301416;
        mp.events.callRemote("play_anim", "friskstance");
        var vec2 = new mp.Vector3(402.9837, -997.3, -98.2404);
        cam = mp.cameras.new('default', vec2, mp.players.local.rotation, 60);
        cam.pointAtPedBone(mp.players.local, 12844, 0, 0, 0, true);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
}

function onItemSelectSkinMain(item, index) {
    if (item.Text === "~r~Exit") {
        char_skin_menu.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_skin");
        //closeAllMenus();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
    else if (item.Text === "~g~Purchase Skin") {
        mp.events.callRemote("purchase_skin", item.Index);
        char_skin_menu.Close();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.events.callRemote("unfreeze_clothes_player");
    }
    else if (item.Text == "~y~Male Advanced skin") {
        mp.events.callRemote("purchase_male_skin");
        char_skin_menu.Close();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.events.callRemote("unfreeze_clothes_player");
    }
    else if (item.Text == "~y~Female Advanced skin") {
        mp.events.callRemote("purchase_female_skin");
        char_skin_menu.Close();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.events.callRemote("unfreeze_clothes_player");
    }
}

function onItemSelectWardrobeMain(item, index) {
    if (item.Text === "~r~Exit") {
        char_wardrobe_menu.Visible = false;
        char_uniform_menu.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
        //char_wardrobe_menu.Close();
    }
    else if (item.Text === "~g~Select Outfit") {
        mp.events.callRemote("load_outfit_player", tracker_save_slot);
    }
    else if (item.Text === "~g~Select Uniform") {
        mp.events.callRemote("load_outfit_player_cop", tracker_save_slot);
    }
}

function onItemSelectCopMain(item, index) {
    if (item.Text === "~g~Save Uniform") {
        var data_props = [];
        data_props.push(tracker_hat);
        data_props.push(tracker_hat_texture);
        data_props.push(tracker_glasses);
        data_props.push(tracker_glasses_texture);
        data_props.push(tracker_ear);
        data_props.push(tracker_ear_texture);
        data_props.push(tracker_watch);
        data_props.push(tracker_watch_texture);
        data_props.push(tracker_bracelet);
        data_props.push(tracker_bracelet_texture);
        var jsonobj = JSON.stringify(data_props);

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
        var compDrawEleven = mp.players.local.getDrawableVariation(11); //GET_PED_DRAWABLE_VARIATION

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
        var compTextEleven = mp.players.local.getTextureVariation(11); //GET_PED_TEXTURE_VARIATION

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

        var jsonCloth = JSON.stringify(objList);

        mp.events.callRemote("save_player_uniform", tracker_uniform_slot, jsonobj, jsonCloth);
    }
    else if (item.Text === "~y~Default Male Cop Outfit") {
        mp.events.callRemote("give_me_police_male_outfit");
    }
    else if (item.Text === "~y~Default Female Cop Outfit") {
        mp.events.callRemote("give_me_police_female_outfit");
    }
    else if (item.Text === "~y~Default Male Sheriff Outfit") {
        mp.events.callRemote("give_me_sheriff_male_outfit");
    }
    else if (item.Text === "~y~Default Female Sheriff Outfit") {
        mp.events.callRemote("give_me_sheriff_female_outfit");
    }
    else if (item.Text === "~g~Select Uniform") {
        mp.events.callRemote("load_outfit_player_cop", tracker_uniform_slot);
    }
    else if (item.Text === "~r~Exit") {
        char_cop_menu.Visible = false;
        char_cop_menu_secondary.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char_cop");
        //char_cop_menu.Close();
    }
    else if (item.Text === "Shirts") {
        var local_plr = mp.players.local;
        tracker_component = 11;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 11); //GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS
        mp.events.callRemote("fetch_auxiliary_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Mask") {
        tracker_component = 1;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 1);
        mp.events.callRemote("fetch_beard_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Torso") {
        tracker_component = 3;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 3);
        mp.events.callRemote("fetch_torso_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Pants") {
        tracker_component = 4;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 4);
        mp.events.callRemote("fetch_legs_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Hands") {
        tracker_component = 5;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 5);
        mp.events.callRemote("fetch_hands_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Shoes") {
        tracker_component = 6;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 6);
        mp.events.callRemote("fetch_foot_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Hats") {
        tracker_component = 12;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 0);
        mp.events.callRemote("fetch_hat_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Glasses") {
        tracker_component = 13;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 1);
        mp.events.callRemote("fetch_glasses_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Ears") {
        tracker_component = 14;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 2);
        mp.events.callRemote("fetch_ear_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Accessories") {
        tracker_component = 7;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 7);
        mp.events.callRemote("fetch_accessories1_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Undershirt") {
        tracker_component = 8;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 8);
        mp.events.callRemote("fetch_accessories2_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Accessories 2") {
        tracker_component = 9;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 9);
        mp.events.callRemote("fetch_accessories3_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
    else if (item.Text === "Decals") {
        tracker_component = 10;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 10);
        mp.events.callRemote("fetch_decals_data_cop", drawVariantCount);
        char_cop_menu.Visible = false;
    }
}

function listChangeEventCopMain(item, index) {
    if (item.Text === "~g~Save Uniform") {
        tracker_uniform_slot = item.Index;
    }
    else if (item.Text === "~g~Select Uniform") {
        tracker_uniform_slot = item.Index;
    }
}

function listChangeEventSkinCreationMain(item, index) {
    if (item.Text === "~g~Regular Skin") {
        mp.events.callRemote("select_my_skin", index);
    }
}

function listChangeEventSkinMain(item, index) {
    if (item.Text === "~g~Purchase Skin") {
        mp.events.callRemote("select_my_skin", index);
    }
}

function listChangeEventWardrobeMain(item, index) {
    if (item.Text === "~g~Select Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "~g~Select Uniform") {
        tracker_save_slot = item.Index;
    }
}

function listChangeEventCopSecondary(item, index) {
    if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = 0;
        if (local_plr.getModel() == 1885233650) {
            value = 0;



        }// FreemodeMale
        else {
            value =  0;



        }

        if (value === -1) {
            apply = false;
        }

        var menu_one = item;

        if (tracker_component === 0 && apply) {
            mp.events.callRemote("apply_head_drawable", item.Index, value);
        }
        else if (tracker_component === 1 && apply) {
            mp.events.callRemote("apply_beard_drawable", item.Index, value);
        }
        else if (tracker_component === 3 && apply) {
            mp.events.callRemote("apply_torso_drawable", item.Index, value);
        }
        else if (tracker_component === 4 && apply) {
            mp.events.callRemote("apply_legs_drawable", item.Index, value);
        }
        else if (tracker_component === 5 && apply) {
            mp.events.callRemote("apply_hands_drawable", item.Index, value);
        }
        else if (tracker_component === 6 && apply) {
            mp.events.callRemote("apply_foot_drawable", item.Index, value);
        }
        else if (tracker_component === 7 && apply) {
            mp.events.callRemote("apply_accessories1_drawable", item.Index, value);
        }
        else if (tracker_component === 8 && apply) {
            mp.events.callRemote("apply_accessories2_drawable", item.Index, value);
        }
        else if (tracker_component === 9 && apply) {
            mp.events.callRemote("apply_accessories3_drawable", item.Index, value);
        }
        else if (tracker_component === 10 && apply) {
            mp.events.callRemote("apply_decals_drawable", item.Index, value);
        }
        else if (tracker_component === 11 && apply) {
            mp.events.callRemote("apply_auxiliary_drawable", item.Index, value);
        }
        else if (tracker_component === 12 && apply) {
            tracker_hat = item.Index;
            tracker_hat_texture = value;
            mp.events.callRemote("apply_hat_drawable_cop", item.Index, value);
        }
        else if (tracker_component === 13 && apply) {
            tracker_glasses = item.Index;
            tracker_glasses_texture = value;
            mp.events.callRemote("apply_glasses_drawable", item.Index, value);
        }
        else if (tracker_component === 14 && apply) {
            tracker_ear = item.Index;
            tracker_ear_texture = value;
            mp.events.callRemote("apply_ear_drawable", item.Index, value);
        }

        char_cop_menu_secondary.Clear();
        char_cop_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;
        if (tracker_component === 12) { //GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(0, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 13) {
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(1, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 14) {
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(2, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));

        char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_cop_menu_secondary.RefreshIndex();

        if (tracker_component === 12 && apply) {
            tracker_hat = item.Index;
            tracker_hat_texture = value;
            mp.events.callRemote("apply_hat_drawable", item.Index, value);
        }
        else if (tracker_component === 13 && apply) {
            tracker_glasses = item.Index;
            tracker_glasses_texture = value;
            mp.events.callRemote("apply_glasses_drawable", item.Index, value);
        }
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel() == 1885233650) {
        }// FreemodeMale
        else {
        }

        tracker_texture = item.Index;

        //var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        //if (is_valid === false)
        //   apply = false;

        if (tracker_component === 0 && apply) {
            var d = mp.players.local.getDrawableVariation(0);
            mp.events.callRemote("apply_head_texture", item.Index, d);
        }
        else if (tracker_component === 1 && apply) {
            var d = mp.players.local.getDrawableVariation(1);
            mp.events.callRemote("apply_beard_texture", item.Index, d);
        }
        else if (tracker_component === 3 && apply) {
            var d = mp.players.local.getDrawableVariation(3);
            mp.events.callRemote("apply_torso_texture", item.Index, d);
        }
        else if (tracker_component === 4 && apply) {
            var d = mp.players.local.getDrawableVariation(4);
            mp.events.callRemote("apply_legs_texture", item.Index, d);
        }
        else if (tracker_component === 5 && apply) {
            var d = mp.players.local.getDrawableVariation(5);
            mp.events.callRemote("apply_hands_texture", item.Index, d);
        }
        else if (tracker_component === 6 && apply) {
            var d = mp.players.local.getDrawableVariation(6);
            mp.events.callRemote("apply_foot_texture", item.Index, d);
        }
        else if (tracker_component === 7 && apply) {
            var d = mp.players.local.getDrawableVariation(7);
            mp.events.callRemote("apply_accessories1_texture", item.Index, d);
        }
        else if (tracker_component === 8 && apply) {
            var d = mp.players.local.getDrawableVariation(8);
            mp.events.callRemote("apply_accessories2_texture", item.Index, d);
        }
        else if (tracker_component === 9 && apply) {
            var d = mp.players.local.getDrawableVariation(9);
            mp.events.callRemote("apply_accessories3_texture", item.Index, d);
        }
        else if (tracker_component === 10 && apply) {
            var d = mp.players.local.getDrawableVariation(10);
            mp.events.callRemote("apply_decals_texture", item.Index, d);
        }
        else if (tracker_component === 11 && apply) {
            var d = mp.players.local.getDrawableVariation(11);
            mp.events.callRemote("apply_auxiliary_texture", item.Index, d);
        }
        else if (tracker_component === 12 && apply) {
            tracker_hat_texture = item.Index;
            var d = mp.players.local.getPropIndex(0);
            mp.events.callRemote("apply_hat_texture", tracker_hat, item.Index, d);
        }
        else if (tracker_component === 13 && apply) {
            tracker_glasses_texture = item.Index;
            var d = mp.players.local.getPropIndex(1);
            mp.events.callRemote("apply_glasses_texture", tracker_glasses, item.Index, d);
        }
        else if (tracker_component === 14 && apply) {
            tracker_ear_texture = item.Index;
            var d = mp.players.local.getPropIndex(2);
            mp.events.callRemote("apply_ear_texture", tracker_ear, item.Index, d);
        }
    }
}

function listChangeEventCreationBarberMain(item, index) {
    if (item.Text === "~g~Confirm") {
        tracker_save_slot = item.Index;
    }
}

function listChangeEventBarberMain(item, index) {
    if (item.Text === "~g~Purchase Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "~g~Select Outfit") {
        tracker_save_slot = item.Index;
    }
}

function listChangeEventTattooMain(item, index) {
    if (item.Text === "~g~Purchase Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "~g~Select Outfit") {
        tracker_save_slot = item.Index;
    }
}

function onItemSelectTattooMain(item, index) {
    if (item.Text === "Makeup") {
        tracker_makeup_opacity = 100;
        char_tattoo_menu.Visible = false;
        char_tattoo_menu_secondary.Clear();
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Makeup", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(4)), 0))); //_GET_NUM_HEAD_OVERLAY_VALUES
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100), startIndex = 100));
        //char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(4)), 0))); //_GET_NUM_MAKEUP_COLORS
        //char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color2", "Color codes", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(4)), 0)));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove makeup."));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_tattoo_menu_secondary.RefreshIndex();
        char_tattoo_menu_secondary.Visible = true;
    }
    else if (item.Text === "Blush") {
        tracker_blush_opacity = 100;
        char_tattoo_menu.Visible = false;
        char_tattoo_menu_secondary.Clear();
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Blush", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(5)), 0)));
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100), startIndex = 100));
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        //char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color2", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove blush."));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_tattoo_menu_secondary.RefreshIndex();
        char_tattoo_menu_secondary.Visible = true;
    }
    else if (item.Text === "Lipstick") {
        tracker_lipstick_opacity = 100;
        char_tattoo_menu.Visible = false;
        char_tattoo_menu_secondary.Clear();
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Lipstick", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(8)), 0)));
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100), startIndex = 100));
        char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        //char_tattoo_menu_secondary.AddItem(new UIMenuListItem("Color2", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove lipstick."));
        char_tattoo_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_tattoo_menu_secondary.RefreshIndex();
        char_tattoo_menu_secondary.Visible = true;
    }
    else if (item.Text === "~g~Purchase Outfit") {
        //save here clothes
        var data = [];
        data.push(tracker_makeup);
        data.push(tracker_makeup_color);
        data.push(tracker_makeup_opacity);
        data.push(tracker_blush);
        data.push(tracker_blush_color);
        data.push(tracker_blush_opacity);
        data.push(tracker_lipstick);
        data.push(tracker_lipstick_color);
        data.push(tracker_lipstick_opacity);
        data.push(tracker_makeup_color_2);
        data.push(tracker_blush_color_2);
        data.push(tracker_lipstick_color_2);
        var jsonobj = JSON.stringify(data);
        //API.sendChatMessage("Saving to outfit...");
        mp.events.callRemote("save_player_tattoo", tracker_save_slot, jsonobj);
    }
    else if (item.Text === "~g~Purchase All Outfits") {
        //save here clothes
        var data = [];
        data.push(tracker_makeup);
        data.push(tracker_makeup_color);
        data.push(tracker_makeup_opacity);
        data.push(tracker_blush);
        data.push(tracker_blush_color);
        data.push(tracker_blush_opacity);
        data.push(tracker_lipstick);
        data.push(tracker_lipstick_color);
        data.push(tracker_lipstick_opacity);
        data.push(tracker_makeup_color_2);
        data.push(tracker_blush_color_2);
        data.push(tracker_lipstick_color_2);
        var jsonobj = JSON.stringify(data);
        //API.sendChatMessage("Saving to outfit...");
        mp.events.callRemote("save_player_tattoo_all", tracker_save_slot, jsonobj);
    }
    else if (item.Text === "~g~Select Outfit") {
        //API.sendChatMessage("Loading outfit...");
        mp.events.callRemote("load_outfit_player", tracker_save_slot);
    }
    else if (item.Text === "~r~Exit") {
        char_tattoo_menu.Visible = false;
        char_tattoo_menu_secondary.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
        //closeAllMenus();
    }
}

function listChangeEventTattooSecondary(item, index) {
    if (item.Text === "Makeup") {
        tracker_facial_feat = 4;
        //tracker_makeup_opacity = 100;
        tracker_opacity = tracker_makeup_opacity;
        tracker_makeup = item.Index;
        mp.events.callRemote("apply_makeup", item.Index, tracker_makeup, tracker_color, tracker_makeup_opacity)
    }
    else if (item.Text === "Blush") {
        tracker_facial_feat = 5;
        //tracker_blush_opacity = 100;
        tracker_opacity = tracker_blush_opacity;
        tracker_blush = item.Index;
        mp.events.callRemote("apply_blush", item.Index, tracker_blush, tracker_color, tracker_blush_opacity)
    }
    else if (item.Text === "Lipstick") {
        tracker_facial_feat = 8;
        //tracker_lipstick_opacity = 100;
        tracker_opacity = tracker_lipstick_opacity;
        tracker_lipstick = item.Index;
        mp.events.callRemote("apply_lipstick", item.Index, tracker_lipstick, tracker_color, tracker_lipstick_opacity)
    }
    else if (item.Text === "Color") {
        tracker_color = item.Index;
        if (tracker_facial_feat === 4) {
            tracker_makeup_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2, tracker_makeup, tracker_makeup_opacity);
        } else if (tracker_facial_feat === 5) {
            tracker_blush_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2, tracker_blush, tracker_blush_opacity);
        } else if (tracker_facial_feat === 8) {
            tracker_lipstick_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2, tracker_lipstick, tracker_lipstick_opacity);
        }
    }
    else if (item.Text === "Color2") {
        tracker_color_2 = item.Index;
        if (tracker_facial_feat === 4) {
            tracker_makeup_color_2 = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2);
        } else if (tracker_facial_feat === 5) {
            tracker_blush_color_2 = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2);
        } else if (tracker_facial_feat === 8) {
            tracker_lipstick_color_2 = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color_2);
        }
    }
    else if (item.Text === "Opacity") {
        tracker_opacity = item.Index;
        if (tracker_facial_feat === 4) { //makeup
            tracker_makeup_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_makeup,tracker_opacity, tracker_color);
        } else if (tracker_facial_feat === 5) { //blush
            tracker_blush_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blush,tracker_opacity, tracker_color);
        } else if (tracker_facial_feat === 8) { //lipstick
            tracker_lipstick_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_lipstick,tracker_opacity, tracker_color);
        }
    }
}

function onItemSelectTattooSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        char_tattoo_menu_secondary.Visible = false;
        char_tattoo_menu.Visible = true;
    }
    else if (item.Text === "Remove") {
        if (tracker_facial_feat === 4) {
            tracker_makeup_opacity = 0;
            tracker_opacity = 0;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_makeup, tracker_opacity);
        }
        else if (tracker_facial_feat === 5) {
            tracker_blush_opacity = 0;
            tracker_opacity = 0;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blush, tracker_opacity);
        }
        else if (tracker_facial_feat === 8) {
            tracker_lipstick_opacity = 0;
            tracker_opacity = 0;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_lipstick, tracker_opacity);
        }
    }
}

mp.events.add( 'do_barber_creation_end', () => {
    mp.events.call( 'OUTFITSHOP::SHOW', false, 0, true );
    //creation_clothes_menu.Visible = true;
let creationCamera = mp.cameras.new('default', new mp.Vector3(402.8837, -999.0696, -99), new mp.Vector3(0,0,0), 60);
in_progress = 0;
    let playerPosition = mp.players.local.position;

    creationCamera.pointAtCoord(playerPosition.x, playerPosition.y, playerPosition.z - 0.25); // Changes the rotation of the camera to point towards a location
    creationCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);    
    /*in_progress = 1;
    var vec = new mp.Vector3(402.8837, -999.0696, -99);
    cam = mp.cameras.new('default', vec, mp.players.local.rotation, 60);
    cam.pointAtCoord( mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z - 0.25 );
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    mp.gui.cursor.show(true, true);*/
} );

function onItemSelectCreationBarberMain(item, index) {
    if (item.Text === "~g~Confirm") {
        var data = [];
        data.push(tracker_hair);
        data.push(tracker_hair_texture);
        data.push(tracker_hair_color);
        data.push(tracker_highlight);
        data.push(tracker_facial_hair);
        data.push(tracker_facial_hair_color);
        data.push(tracker_facial_hair_opacity);
        data.push(tracker_eyebrows);
        data.push(tracker_eyebrows_color);
        data.push(tracker_eyebrows_opacity);
        data.push(tracker_chest_hair);
        data.push(tracker_chest_hair_color);
        data.push(tracker_chest_hair_opacity);
        var jsonobj = JSON.stringify(data);
        mp.events.callRemote("save_player_barber_creation", tracker_save_slot, jsonobj);
        creation_barber_menu.Visible = false;
        //creation_clothes_menu.Visible = true;
        var vec = new mp.Vector3(402.8837, -999.0696, -99);
        cam = mp.cameras.new('default', vec, mp.players.local.rotation, 60);
        cam.pointAt(mp.players.local, mp.players.local.position, true);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else if (item.Text === "Hair") {
        tracker_component = 2;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 2);
        mp.events.callRemote("fetch_hair_data_creation", drawVariantCount);
    }
    else if (item.Text === "Facial Hair") {
        creation_barber_menu.Visible = false;
        creation_barber_menu_secondary.Clear();
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Facial Hair", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(1)), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_barber_menu_secondary.RefreshIndex();
        creation_barber_menu_secondary.Visible = true;
    }
    else if (item.Text === "Eyebrows") {
        creation_barber_menu.Visible = false;
        creation_barber_menu_secondary.Clear();
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Eyebrows", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(2)), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_barber_menu_secondary.RefreshIndex();
        creation_barber_menu_secondary.Visible = true;
    }
    else if (item.Text === "Chest Hair") {
        creation_barber_menu.Visible = false;
        creation_barber_menu_secondary.Clear();
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Chest Hair", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(10)), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(32), 0)));
        creation_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_barber_menu_secondary.RefreshIndex();
        creation_barber_menu_secondary.Visible = true;
    }
}

function onItemSelectBarberMain(item, index) {
    if (item.Text === "~g~Purchase Outfit") {
        //save here clothes
        //API.sendChatMessage("Saving to outfit...");
        var data = [];
        data.push(tracker_hair);
        data.push(tracker_hair_texture);
        data.push(tracker_hair_color);
        data.push(tracker_highlight);
        data.push(tracker_facial_hair);
        data.push(tracker_facial_hair_color);
        data.push(tracker_facial_hair_opacity);
        data.push(tracker_eyebrows);
        data.push(tracker_eyebrows_color);
        data.push(tracker_eyebrows_opacity);
        data.push(tracker_chest_hair);
        data.push(tracker_chest_hair_color);
        data.push(tracker_chest_hair_opacity);
        var jsonobj = JSON.stringify(data);
        var jsonHairTattooData = JSON.stringify(playerHairTattoo);
        mp.events.callRemote("save_player_barber", tracker_save_slot, jsonobj, jsonHairTattooData);
    }
    else if (item.Text === "~g~Purchase All Outfits") {
        //API.sendChatMessage("Saving to all outfits...");
        var data = [];
        data.push(tracker_hair);
        data.push(tracker_hair_texture);
        data.push(tracker_hair_color);
        data.push(tracker_highlight);
        data.push(tracker_facial_hair);
        data.push(tracker_facial_hair_color);
        data.push(tracker_facial_hair_opacity);
        data.push(tracker_eyebrows);
        data.push(tracker_eyebrows_color);
        data.push(tracker_eyebrows_opacity);
        data.push(tracker_chest_hair);
        data.push(tracker_chest_hair_color);
        data.push(tracker_chest_hair_opacity);
        var jsonobj = JSON.stringify(data);
        var jsonHairTattooData = JSON.stringify(playerHairTattoo);
        mp.events.callRemote("save_player_barber_all", tracker_save_slot, jsonobj, jsonHairTattooData);
    }
    else if (item.Text === "~g~Select Outfit") {
        //API.sendChatMessage("Loading outfit...");
        mp.events.callRemote("load_outfit_player", tracker_save_slot);
    }
    else if (item.Text === "~r~Exit") {
        char_barber_menu.Visible = false;
        char_barber_menu_secondary.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        //closeAllMenus();
        mp.events.callRemote("reload_my_char");
    }
    else if (item.Text === "Hair") {
        tracker_component = 2;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 2);
        mp.events.callRemote("fetch_hair_data", drawVariantCount);
        char_barber_menu.Visible = false;
    }
    else if (item.Text === "Hair Tattoos") {
        char_barber_menu.Visible = false;
        char_barber_menu_secondary.Clear();
        if(isMale())    char_barber_menu_secondary.AddItem(maleItems);
        else            char_barber_menu_secondary.AddItem(femaleItems);
        char_barber_menu_secondary.AddItem(new UIMenuItem("Add", "Adds the currently displaying hair tattoo to your wanted list."));
        char_barber_menu_secondary.AddItem(new UIMenuItem("Remove", "Removes the currently displaying hair tattoo from your wanted list."));
        char_barber_menu_secondary.AddItem(new UIMenuItem("Clear", "Resets the wanted list."));
        char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Finalize hair tattoo modifications"));
        char_barber_menu_secondary.RefreshIndex();
        mp.events.callRemote("RequestHairTattooData");
    }
    else if (item.Text === "Facial Hair") {
        char_barber_menu.Visible = false;
        char_barber_menu_secondary.Clear();
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Facial Hair", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(1)), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_barber_menu_secondary.RefreshIndex();
        char_barber_menu_secondary.Visible = true;
    }
    else if (item.Text === "Eyebrows") {
        char_barber_menu.Visible = false;
        char_barber_menu_secondary.Clear();
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Eyebrows", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(2)), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(63), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_barber_menu_secondary.RefreshIndex();
        char_barber_menu_secondary.Visible = true;
    }
    else if (item.Text === "Chest Hair") {
        char_barber_menu.Visible = false;
        char_barber_menu_secondary.Clear();
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Chest Hair", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(10)), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Visibility from 0 to 100.", new ItemsCollection(convertValueToList(101), 100)));
        char_barber_menu_secondary.AddItem(new UIMenuListItem("Color", "Color codes", new ItemsCollection(convertValueToList(32), 0)));
        char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_barber_menu_secondary.RefreshIndex();
        char_barber_menu_secondary.Visible = true;
    }
}

mp.events.add('UpdateHairTattooClientArray', (data) => {
    playerHairTattoo = JSON.parse(JSON.stringify(data));
});

mp.events.add('change_my_skin', (pedhash) => {
    mp.players.local.model = pedhash;
});

mp.events.add('RequestHairTattooData_Response', (data) => {
    playerHairTattoo = JSON.parse(JSON.stringify(data));
    char_barber_menu_secondary.Visible = true;
});

function onItemSelectCreationBarberSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        creation_barber_menu_secondary.Visible = false;
        creation_barber_menu.Visible = true;
    }
}

function onItemSelectBarberSecondary(item, index) {

    switch(item.Text) {
        case "Add":
            if(isMale())    index = maleItems.Index;
            else            index = femaleItems.Index;

            if(playerHairTattoo.includes(index)) return;
            playerHairTattoo.push(index);
            DisplayHairTattoos();
            break;
        case "Remove":
            if(isMale())    index = maleItems.Index;
            else            index = femaleItems.Index;

            if(!playerHairTattoo.includes(index)) return;

            for( let i = 0; i < playerHairTattoo.length; i++)
                if ( playerHairTattoo[i] == index)
                    playerHairTattoo.splice(i, 1);

            currentDisplay = -1;
            DisplayHairTattoos();
            break;
        case "Clear":
            playerHairTattoo = [];
            currentDisplay = -1;
            DisplayHairTattoos();
            break;
        case "~r~Exit":
            char_barber_menu_secondary.Visible = false;
            char_barber_menu.Visible = true;
            DisplayHairTattoos(false);
            break;
    }
}

function listChangeEventCreationBarberSecondary(item, index) {
    if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = item.Index;
        /*if (local_plr.getModel() == 1885233650) {
            value = findNearestLegibleTextureMale(tracker_component, item.Index);
            if (isVariantBlacklistedMale(tracker_component, item.Index, value)) {
                apply = false;
            }
            else {
                value = findNearestLegibleTextureMale(tracker_component, item.Index);
            }
        }// FreemodeMale
        else {
            value = findNearestLegibleTextureFemale(tracker_component, item.Index);
            if (isVariantBlacklistedFemale(tracker_component, item.Index, value)) {
                apply = false;
            }
        }*/

        if (value === -1)
            apply = false;

        var menu_one = item;

        if (tracker_component === 2 && apply) {
            mp.events.callRemote("apply_hair_drawable", item.Index, value);
            tracker_hair = item.Index;
        }

        creation_barber_menu_secondary.Clear();
        creation_barber_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;

        creation_barber_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0))); //

        if (tracker_component === 2)
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Color", "GTAO", new ItemsCollection(convertValueToList(63), 0)));

        if (tracker_component === 2)
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Highlights", "GTAO", new ItemsCollection(convertValueToList(63), 0))); //_GET_NUM_HAIR_COLORS

        creation_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_barber_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Facial Hair") {
        tracker_facial_feat = 1;
        tracker_facial_hair = item.Index;
        tracker_facial_hair_opacity = 100;
        mp.events.callRemote("apply_facial_hair", item.Index, tracker_opacity)
    }
    else if (item.Text === "Eyebrows") {
        tracker_facial_feat = 2;
        tracker_eyebrows = item.Index;
        tracker_eyebrows_opacity = 100;
        mp.events.callRemote("apply_eyebrows", item.Index, tracker_opacity)
    }
    else if (item.Text === "Chest Hair") {
        tracker_facial_feat = 10;
        tracker_chest_hair_opacity = 100;
        tracker_chest_hair = item.Index;
        mp.events.callRemote("apply_chest_hair", item.Index, tracker_opacity)
    }
    else if (item.Text === "Color") {
        tracker_color = item.Index;
        if (tracker_facial_feat === 0) {
            tracker_blemishes_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 0, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 1) {
            tracker_facial_hair_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 2) {
            tracker_eyebrows_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 3) {
            tracker_ageing_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 0, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 4) {
            tracker_makeup_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 5) {
            tracker_blush_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 8) {
            tracker_lipstick_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_opacity);
        } else if (tracker_facial_feat === 10) {
            tracker_chest_hair_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_opacity);
        }
    }
    else if (item.Text === "Opacity") {
        tracker_opacity = item.Index;
        if (tracker_facial_feat === 0) { //blemishes
            tracker_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 1) { //facial hair
            tracker_facial_hair_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_facial_hair, tracker_opacity);
        } else if (tracker_facial_feat === 2) { //eyebrows
            tracker_eyebrows_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_eyebrows, tracker_opacity);
        } else if (tracker_facial_feat === 3) { //ageing
            tracker_ageing_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_ageing, tracker_opacity);
        } else if (tracker_facial_feat === 4) { //makeup
            tracker_makeup_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_makeup, tracker_opacity);
        } else if (tracker_facial_feat === 5) { //blush
            tracker_blush_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blush, tracker_opacity);
        } else if (tracker_facial_feat === 6) { //complexion
            tracker_complexion_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_complexion, tracker_opacity);
        } else if (tracker_facial_feat === 7) { //sun damage
            tracker_sun_damage_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_sun_damage, tracker_opacity);
        } else if (tracker_facial_feat === 8) { //lipstick
            tracker_lipstick_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_lipstick, tracker_opacity);
        } else if (tracker_facial_feat === 9) { //moles
            tracker_moles_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_moles, tracker_opacity);
        } else if (tracker_facial_feat === 10) { //chest hair
            tracker_chest_hair_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_chest_hair, tracker_opacity);
        } else if (tracker_facial_feat === 11) { //body blemishes
            tracker_body_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_body_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 12) { //added blemishes
            tracker_add_body_blemish_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_add_body_blemish, tracker_opacity);
        }
    }
    else if (item.Text === "Hair Color") {
        tracker_hair_color = item.Index;
        //mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix);
        mp.events.callRemote("apply_hair_color", item.Index, tracker_highlight);
    }
    else if (item.Text === "Hair Highlights") {
        tracker_highlight = item.Index;
        //mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix);
        mp.events.callRemote("apply_hair_highlight", tracker_hair_color, item.Index);
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }// FreemodeMale
        else {
            if (isVariantBlacklistedFemale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }

        tracker_texture = item.Index;

        //var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        //if (is_valid === false)
        //    apply = false;

        if (tracker_component === 2 && apply) {
            var d = mp.players.local.getDrawableVariation(2);
            mp.events.callRemote("apply_hair_texture", item.Index, d);
            tracker_hair_texture = item.Index;
        }
    }
}

function listChangeEventBarberSecondary(item, index) {
    if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = item.Index;
        /*if (local_plr.getModel() == 1885233650) {
            value = findNearestLegibleTextureMale(tracker_component, item.Index);
            if (isVariantBlacklistedMale(tracker_component, item.Index, value)) {
                apply = false;
            }
            else {
                value = findNearestLegibleTextureMale(tracker_component, item.Index);
            }
        }// FreemodeMale
        else {
            value = findNearestLegibleTextureFemale(tracker_component, item.Index);
            if (isVariantBlacklistedFemale(tracker_component, item.Index, value)) {
                apply = false;
            }
        }*/

        if (value === -1)
            apply = false;

        var menu_one = item;

        if (tracker_component === 2 && apply) {
            mp.events.callRemote("apply_hair_drawable", item.Index, value);
            tracker_hair = item.Index;
        }

        char_barber_menu_secondary.Clear();
        char_barber_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;

        char_barber_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));

        if (tracker_component === 2)
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Color", "GTAO", new ItemsCollection(convertValueToList(63), 0)));

        if (tracker_component === 2)
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Highlights", "GTAO", new ItemsCollection(convertValueToList(63), 0)));

        char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_barber_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Facial Hair") {
        tracker_facial_feat = 1;
        tracker_facial_hair = item.Index;
        tracker_facial_hair_opacity = 100;
        mp.events.callRemote("apply_facial_hair", item.Index, tracker_opacity)
    }
    else if (item.Text === "Eyebrows") {
        tracker_facial_feat = 2;
        tracker_eyebrows = item.Index;
        tracker_eyebrows_opacity = 100;
        mp.events.callRemote("apply_eyebrows", item.Index, tracker_opacity)
    }
    else if (item.Text === "Chest Hair") {
        tracker_facial_feat = 10;
        tracker_chest_hair = item.Index;
        tracker_chest_hair_opacity = 100;
        mp.events.callRemote("apply_chest_hair", item.Index, tracker_opacity)
    }
    else if (item.Text === "Color") {
        tracker_color = item.Index;
        if (tracker_facial_feat === 0) {
            tracker_blemishes_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 0, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 1) {
            tracker_facial_hair_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 2) {
            tracker_eyebrows_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 3) {
            tracker_ageing_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 0, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 4) {
            tracker_makeup_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 5) {
            tracker_blush_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 8) {
            tracker_lipstick_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 2, tracker_color, tracker_color);
        } else if (tracker_facial_feat === 10) {
            tracker_chest_hair_color = item.Index;
            mp.events.callRemote("apply_color", tracker_facial_feat, 1, tracker_color, tracker_color);
        }
    }
    else if (item.Text === "Opacity") {
        tracker_opacity = item.Index;
        if (tracker_facial_feat === 0) { //blemishes
            tracker_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 1) { //facial hair
            tracker_facial_hair_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_facial_hair, tracker_opacity);
        } else if (tracker_facial_feat === 2) { //eyebrows
            tracker_eyebrows_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_eyebrows, tracker_opacity);
        } else if (tracker_facial_feat === 3) { //ageing
            tracker_ageing_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_ageing, tracker_opacity);
        } else if (tracker_facial_feat === 4) { //makeup
            tracker_makeup_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_makeup, tracker_opacity);
        } else if (tracker_facial_feat === 5) { //blush
            tracker_blush_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blush, tracker_opacity);
        } else if (tracker_facial_feat === 6) { //complexion
            tracker_complexion_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_complexion, tracker_opacity);
        } else if (tracker_facial_feat === 7) { //sun damage
            tracker_sun_damage_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_sun_damage, tracker_opacity);
        } else if (tracker_facial_feat === 8) { //lipstick
            tracker_lipstick_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_lipstick, tracker_opacity);
        } else if (tracker_facial_feat === 9) { //moles
            tracker_moles_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_moles, tracker_opacity);
        } else if (tracker_facial_feat === 10) { //chest hair
            tracker_chest_hair_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_chest_hair, tracker_opacity);
        } else if (tracker_facial_feat === 11) { //body blemishes
            tracker_body_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_body_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 12) { //added blemishes
            tracker_add_body_blemish_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_add_body_blemish, tracker_opacity);
        }
    }
    else if (item.Text === "Hair Color") {
        tracker_hair_color = item.Index;
        //mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix);
        mp.events.callRemote("apply_hair_color", item.Index, tracker_highlight);
    }
    else if (item.Text === "Hair Highlights") {
        tracker_highlight = item.Index;
        //mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix);
        mp.events.callRemote("apply_hair_highlight", tracker_hair_color, item.Index);
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }// FreemodeMale
        else {
            if (isVariantBlacklistedFemale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }

        tracker_texture = item.Index;

        //var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        //if (is_valid === false)
        //    apply = false;

        if (tracker_component === 2 && apply) {
            var d = mp.players.local.getDrawableVariation(2);
            mp.events.callRemote("apply_hair_texture", item.Index, d);
            tracker_hair_texture = item.Index;
        }

    }
    else if (item.Text === "Hair Tattoos (Male)" || item.Text === "Hair Tattoos (Female)") {
        currentDisplay = item.Index;
        DisplayHairTattoos();
    }
}

function listChangeEventSurgeryCreationMain(item, index) {
    if (item.Text === "Parent Face 1") {
        tracker_blend_1 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Ancestry Face") {
        tracker_blend_3 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "~g~Confirm") {
        tracker_save_slot = item.Index;
        //creation_clothes_menu.Visible = true;
        creation_surgery_menu.Close();
        mp.events.callRemote("play_anim", "friskstance");
    }
    else if (item.Text === "Parent Face 2") {
        tracker_blend_2 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Parent Skin 1") {
        tracker_skin_1 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Parent Skin 2") {
        tracker_skin_2 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Ancestry Skin") {
        tracker_skin_3 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Blend Mix-> 2") {
        tracker_blend_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Skin Mix-> 2") {
        tracker_skin_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Override Mix-> 2") {
        tracker_skinblend_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Eye Color") {
        tracker_eye_color = item.Index;
        mp.events.callRemote("apply_eye_color", item.Index);
    }
    else if (item.Text === "Nose Width") {
        tracker_nose_width = parseInt(listNoseWidth[index]);
        // //API.sendChatMessage("VAR: " + parseInt(listNoseWidth[index]));
        mp.events.callRemote("apply_nose_length", parseInt(listNoseWidth[index]));
    }
    else if (item.Text === "Nose Vertical") {
        tracker_nose_vertical = parseInt(listNoseVertical[index]);
        mp.events.callRemote("apply_chin_shape", parseInt(listNoseVertical[index]));
    }
    else if (item.Text === "Nose Horizontal") {
        tracker_nose_horizontal = parseInt(listNoseHorizontal[index]);
        mp.events.callRemote("apply_test_1", parseInt(listNoseHorizontal[index]));
    }
    else if (item.Text === "Nose Curve") {
        tracker_nose_curve = parseInt(listNoseCurve[index]);
        mp.events.callRemote("apply_test_2", parseInt(listNoseCurve[index]));
    }
    else if (item.Text === "Nose Point") {
        tracker_nose_point = parseInt(listNosePoint[index]);
        mp.events.callRemote("apply_test_3", parseInt(listNosePoint[index]));
    }
    else if (item.Text === "Nose Bend") {
        tracker_nose_bend = parseInt(listNoseBend[index]);
        mp.events.callRemote("apply_test_4", parseInt(listNoseBend[index]));
    }
    else if (item.Text === "Eyebrow Vertical") {
        tracker_eyebrow_vertical = parseInt(listEyebrowVertical[index]);
        mp.events.callRemote("apply_test_5", parseInt(listEyebrowVertical[index]));
    }
    else if (item.Text === "Eyebrow Horizontal") {
        tracker_eyebrow_horizontal = parseInt(listEyebrowHorizontal[index]);
        mp.events.callRemote("apply_test_6", parseInt(listEyebrowHorizontal[index]));
    }
    else if (item.Text === "Malar Vertical") {
        tracker_malar_vertical = parseInt(listMalarVertical[index]);
        mp.events.callRemote("apply_test_7", parseInt(listMalarVertical[index]));
    }
    else if (item.Text === "Malar Horizontal") {
        tracker_malar_horizontal = parseInt(listMalarHorizontal[index]);
        mp.events.callRemote("apply_test_8", parseInt(listMalarHorizontal[index]));
    }
    else if (item.Text === "Cheekbone Depth") {
        tracker_cheekbone_depth = parseInt(listCheekboneDepth[index]);
        mp.events.callRemote("apply_test_9", parseInt(listCheekboneDepth[index]));
    }
    else if (item.Text === "Squint") {
        tracker_squint = parseInt(listSquint[index]);
        mp.events.callRemote("apply_test_10", parseInt(listSquint[index]));
    }
    else if (item.Text === "Lip Size") {
        tracker_lip_size = parseInt(listLipSize[index]);
        mp.events.callRemote("apply_test_11", parseInt(listLipSize[index]));
    }
    else if (item.Text === "Jawline Vertical") {
        tracker_jawline_vertical = parseInt(listJawlineVertical[index]);
        mp.events.callRemote("apply_test_12", parseInt(listJawlineVertical[index]));
    }
    else if (item.Text === "Jawline Horizontal") {
        tracker_jawline_horizontal = parseInt(listJawlineHorizontal[index]);
        mp.events.callRemote("apply_test_13", parseInt(listJawlineHorizontal[index]));
    }
    else if (item.Text === "Chin Size") {
        tracker_chin_size = parseInt(listChinSize[index]);
        mp.events.callRemote("apply_test_14", parseInt(listChinSize[index]));
    }
    else if (item.Text === "Chin Length") {
        tracker_chin_length = parseInt(listChinLength[index]);
        mp.events.callRemote("apply_test_15", parseInt(listChinLength[index]));
    }
    else if (item.Text === "Chin Width") {
        tracker_chin_width = parseInt(listChinWidth[index]);
        mp.events.callRemote("apply_test_16", parseInt(listChinWidth[index]));
    }
    else if (item.Text === "Chin Indent") {
        tracker_chin_indent = parseInt(listChinIndent[index]);
        mp.events.callRemote("apply_test_17", parseInt(listChinIndent[index]));
    }
}

function listChangeEventSurgeryMain(item, index) {
    if (item.Text === "Parent Face 1") {
        tracker_blend_1 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Ancestry Face") {
        tracker_blend_3 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "~g~Purchase Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "~g~Select Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "Parent Face 2") {
        tracker_blend_2 = item.Index;
        mp.events.callRemote("apply_head_blend",tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix);
    }
    else if (item.Text === "Parent Skin 1") {
        tracker_skin_1 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Parent Skin 2") {
        tracker_skin_2 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Ancestry Skin") {
        tracker_skin_3 = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Blend Mix-> 2") {
        tracker_blend_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Skin Mix-> 2") {
        tracker_skin_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "1 <-Override Mix-> 2") {
        tracker_skinblend_mix = item.Index;
        mp.events.callRemote("apply_head_blend", tracker_blend_1, tracker_blend_2, tracker_blend_mix, tracker_skin_mix, tracker_blend_3, tracker_skinblend_mix, tracker_skin_1, tracker_skin_2, tracker_skin_3);
    }
    else if (item.Text === "Eye Color") {
        tracker_eye_color = item.Index;
        mp.events.callRemote("apply_eye_color", item.Index);
    }
    else if (item.Text === "Nose Width") {
        tracker_nose_width = parseInt(listNoseWidth[index]);
        // //API.sendChatMessage("VAR: " + parseInt(listNoseWidth[index]));
        mp.events.callRemote("apply_nose_length", parseInt(listNoseWidth[index]));
    }
    else if (item.Text === "Nose Vertical") {
        tracker_nose_vertical = parseInt(listNoseVertical[index]);
        mp.events.callRemote("apply_chin_shape", parseInt(listNoseVertical[index]));
    }
    else if (item.Text === "Nose Horizontal") {
        tracker_nose_horizontal = parseInt(listNoseHorizontal[index]);
        mp.events.callRemote("apply_test_1", parseInt(listNoseHorizontal[index]));
    }
    else if (item.Text === "Nose Curve") {
        tracker_nose_curve = parseInt(listNoseCurve[index]);
        mp.events.callRemote("apply_test_2", parseInt(listNoseCurve[index]));
    }
    else if (item.Text === "Nose Point") {
        tracker_nose_point = parseInt(listNosePoint[index]);
        mp.events.callRemote("apply_test_3", parseInt(listNosePoint[index]));
    }
    else if (item.Text === "Nose Bend") {
        tracker_nose_bend = parseInt(listNoseBend[index]);
        mp.events.callRemote("apply_test_4", parseInt(listNoseBend[index]));
    }
    else if (item.Text === "Eyebrow Vertical") {
        tracker_eyebrow_vertical = parseInt(listEyebrowVertical[index]);
        mp.events.callRemote("apply_test_5", parseInt(listEyebrowVertical[index]));
    }
    else if (item.Text === "Eyebrow Horizontal") {
        tracker_eyebrow_horizontal = parseInt(listEyebrowHorizontal[index]);
        mp.events.callRemote("apply_test_6", parseInt(listEyebrowHorizontal[index]));
    }
    else if (item.Text === "Malar Vertical") {
        tracker_malar_vertical = parseInt(listMalarVertical[index]);
        mp.events.callRemote("apply_test_7", parseInt(listMalarVertical[index]));
    }
    else if (item.Text === "Malar Horizontal") {
        tracker_malar_horizontal = parseInt(listMalarHorizontal[index]);
        mp.events.callRemote("apply_test_8", parseInt(listMalarHorizontal[index]));
    }
    else if (item.Text === "Cheekbone Depth") {
        tracker_cheekbone_depth = parseInt(listCheekboneDepth[index]);
        mp.events.callRemote("apply_test_9", parseInt(listCheekboneDepth[index]));
    }
    else if (item.Text === "Squint") {
        tracker_squint = parseInt(listSquint[index]);
        mp.events.callRemote("apply_test_10", parseInt(listSquint[index]));
    }
    else if (item.Text === "Lip Size") {
        tracker_lip_size = parseInt(listLipSize[index]);
        mp.events.callRemote("apply_test_11", parseInt(listLipSize[index]));
    }
    else if (item.Text === "Jawline Vertical") {
        tracker_jawline_vertical = parseInt(listJawlineVertical[index]);
        mp.events.callRemote("apply_test_12", parseInt(listJawlineVertical[index]));
    }
    else if (item.Text === "Jawline Horizontal") {
        tracker_jawline_horizontal = parseInt(listJawlineHorizontal[index]);
        mp.events.callRemote("apply_test_13", parseInt(listJawlineHorizontal[index]));
    }
    else if (item.Text === "Chin Size") {
        tracker_chin_size = parseInt(listChinSize[index]);
        mp.events.callRemote("apply_test_14", parseInt(listChinSize[index]));
    }
    else if (item.Text === "Chin Length") {
        tracker_chin_length = parseInt(listChinLength[index]);
        mp.events.callRemote("apply_test_15", parseInt(listChinLength[index]));
    }
    else if (item.Text === "Chin Width") {
        tracker_chin_width = parseInt(listChinWidth[index]);
        mp.events.callRemote("apply_test_16", parseInt(listChinWidth[index]));
    }
    else if (item.Text === "Chin Indent") {
        tracker_chin_indent = parseInt(listChinIndent[index]);
        mp.events.callRemote("apply_test_17", parseInt(listChinIndent[index]));
    }
}

function listChangeEventClothesMain(item, index) {
    if (item.Text === "~g~Purchase Outfit") {
        tracker_save_slot = item.Index;
    }
    else if (item.Text === "~g~Select Outfit") {
        tracker_save_slot = item.Index;
    }
}

function listChangeEventCreationClothesSecondary(item, index) {
    if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = item.Index;
        /*if (local_plr.getModel() == 1885233650) {
            value = findNearestLegibleTextureMale(tracker_component, item.Index);
            if (isVariantBlacklistedMale(tracker_component, item.Index, value)) {
                apply = false;
            }
            else {
                value = findNearestLegibleTextureMale(tracker_component, item.Index);
            }
        }// FreemodeMale
        else {
            value = findNearestLegibleTextureFemale(tracker_component, item.Index);
            if (isVariantBlacklistedFemale(tracker_component, item.Index, value)) {
                apply = false;
            }
        }*/

        if (value === -1) {
            apply = false;
        }

        var menu_one = item;
        if (tracker_component === 0 && apply) {
            mp.events.callRemote("apply_head_drawable", item.Index, value);
        }
        else if (tracker_component === 1 && apply) {
            mp.events.callRemote("apply_beard_drawable", item.Index, value);
        }
        else if (tracker_component === 3 && apply) {
            mp.events.callRemote("apply_torso_drawable", item.Index, value);
        }
        else if (tracker_component === 4 && apply) {
            mp.events.callRemote("apply_legs_drawable", item.Index, value);
        }
        else if (tracker_component === 5 && apply) {
            mp.events.callRemote("apply_hands_drawable", item.Index, value);
        }
        else if (tracker_component === 6 && apply) {
            mp.events.callRemote("apply_foot_drawable", item.Index, value);
        }
        else if (tracker_component === 7 && apply) {
            mp.events.callRemote("apply_accessories1_drawable", item.Index, value);
        }
        else if (tracker_component === 8 && apply) {
            mp.events.callRemote("apply_accessories2_drawable", item.Index, value);
        }
        else if (tracker_component === 9 && apply) {
            mp.events.callRemote("apply_accessories3_drawable", item.Index, value);
        }
        else if (tracker_component === 10 && apply) {
            mp.events.callRemote("apply_decals_drawable", item.Index, value);
        }
        else if (tracker_component === 11 && apply) {
            mp.events.callRemote("apply_auxiliary_drawable", item.Index, value);
        }
        else if (tracker_component === 12 && apply) {
            tracker_hat = item.Index;
            tracker_hat_texture = value;
            mp.events.callRemote("apply_hat_drawable", item.Index, value);
        }
        else if (tracker_component === 13 && apply) {
            tracker_glasses = item.Index;
            tracker_glasses_texture = value;
            mp.events.callRemote("apply_glasses_drawable", item.Index, value);
        }
        else if (tracker_component === 14 && apply) {
            tracker_ear = item.Index;
            tracker_ear_texture = value;
            mp.events.callRemote("apply_ear_drawable", item.Index, value);
        }

        creation_clothes_menu_secondary.Clear();
        creation_clothes_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;
        if (tracker_component === 12) {
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(0, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 13) {
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(1, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 14) {
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(2, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));

        creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_clothes_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }// FreemodeMale
        else {
            if (isVariantBlacklistedFemale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }

        tracker_texture = item.Index;

        //var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        //if (is_valid === false)
        //   apply = false;

        if (tracker_component === 0 && apply) {
            mp.events.callRemote("apply_head_texture", item.Index);
        }
        else if (tracker_component === 1 && apply) {
            var d = mp.players.local.getDrawableVariation(1);
            mp.events.callRemote("apply_beard_texture", item.Index, d);
        }
        else if (tracker_component === 3 && apply) {
            var d = mp.players.local.getDrawableVariation(3);
            mp.events.callRemote("apply_torso_texture", item.Index, d);
        }
        else if (tracker_component === 4 && apply) {
            var d = mp.players.local.getDrawableVariation(4);
            mp.events.callRemote("apply_legs_texture", item.Index, d);
        }
        else if (tracker_component === 5 && apply) {
            var d = mp.players.local.getDrawableVariation(5);
            mp.events.callRemote("apply_hands_texture", item.Index, d);
        }
        else if (tracker_component === 6 && apply) {
            var d = mp.players.local.getDrawableVariation(6);
            mp.events.callRemote("apply_foot_texture", item.Index, d);
        }
        else if (tracker_component === 7 && apply) {
            var d = mp.players.local.getDrawableVariation(7);
            mp.events.callRemote("apply_accessories1_texture", item.Index, d);
        }
        else if (tracker_component === 8 && apply) {
            var d = mp.players.local.getDrawableVariation(8);
            mp.events.callRemote("apply_accessories2_texture", item.Index, d);
        }
        else if (tracker_component === 9 && apply) {
            var d = mp.players.local.getDrawableVariation(9);
            mp.events.callRemote("apply_accessories3_texture", item.Index, d);
        }
        else if (tracker_component === 10 && apply) {
            var d = mp.players.local.getDrawableVariation(10);
            mp.events.callRemote("apply_decals_texture", item.Index, d);
        }
        else if (tracker_component === 11 && apply) {
            var d = mp.players.local.getDrawableVariation(11);
            mp.events.callRemote("apply_auxiliary_texture", item.Index, d);
        }
        else if (tracker_component === 12 && apply) {
            tracker_hat_texture = item.Index;
            var d = mp.players.local.getPropIndex(0);
            mp.events.callRemote("apply_hat_texture", tracker_hat, item.Index, d);
        }
        else if (tracker_component === 13 && apply) {
            tracker_glasses_texture = item.Index;
            var d = mp.players.local.getPropIndex(1);
            mp.events.callRemote("apply_glasses_texture", tracker_glasses, item.Index, d);
        }
        else if (tracker_component === 14 && apply) {
            tracker_ear_texture = item.Index;
            var d = mp.players.local.getPropIndex(2);
            mp.events.callRemote("apply_ear_texture", tracker_ear, item.Index, d);
        }
    }
}

function listChangeEventClothesSecondary(item, index) {
    if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var RageComponentID = tracker_component;
        var Props = false;
        if(RageComponentID == 12){
            RageComponentID = 0;
            Props = true;
        }else if(RageComponentID == 13){
            RageComponentID = 1;
            Props = true;
        }else if(RageComponentID == 14){
            RageComponentID = 2;
            Props = true;
        }
        var drawable = 0;
        if(!Props)
            drawable = mp.players.local.getDrawableVariation(RageComponentID);
        else
            drawable = mp.players.local.getPropIndex(RageComponentID);

        var value = 0;
        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(RageComponentID, item.Index)) {
                apply = false;
            }
        }else {
            if (isVariantBlacklistedFemale(RageComponentID, item.Index)) {
                apply = false;
            }
        }

        var menu_one = item;
        if (RageComponentID === 0 && apply) {
            tracker_hat = item.Index;
            tracker_hat_texture = value;
            mp.events.call('changePropsPiece', 0, item.Index);
        }
        else if (RageComponentID === 1 && apply) {
            tracker_glasses = item.Index;
            tracker_glasses_texture = value;
            mp.events.call('changePropsPiece', 1, item.Index);
        }
        else if (RageComponentID === 2 && apply) {
            tracker_ear = item.Index;
            tracker_ear_texture = value;
            mp.events.call('changePropsPiece', 2, item.Index);
        }else{
            if(apply)
                mp.events.call('changeClothingPiece', RageComponentID,  item.Index);
        }

        char_clothes_menu_secondary.Clear();
        char_clothes_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;
        if (tracker_component === 12) {
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(0, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 13) {
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(1, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else if (tracker_component === 14) {
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(2, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
        }
        else
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( RageComponentID, tracker_drawable)), 0)));

        char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_clothes_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        /*var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable)) {
                apply = false;
            }
        }// FreemodeMale
        else  {
            if (isVariantBlacklistedFemale(tracker_component, drawable)) {
                apply = false;
            }
        }*/

        tracker_texture = item.Index;

        //var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        //if (is_valid === false)
        //   apply = false;

        var RageComponentID = tracker_component;
        var Props = false;
        if(RageComponentID == 12){
            RageComponentID = 0;
            Props = true;
        }else if(RageComponentID == 13){
            RageComponentID = 1;
            Props = true;
        }else if(RageComponentID == 14){
            RageComponentID = 2;
            Props = true;
        }

        if (RageComponentID === 0 && apply) {
            mp.events.call('changePropsTexture', 0, item.Index);
        }
        else if (RageComponentID === 1 && apply) {
            mp.events.call('changePropsTexture', 1, item.Index);
        }
        else if (RageComponentID === 2 && apply) {
            mp.events.call('changePropsTexture', 2, item.Index);
        }else{
            if(apply)
                mp.events.call('changeClothingTexture', RageComponentID,  item.Index);
        }
    }
}

function onItemSelectionCreationClothesSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        creation_clothes_menu_secondary.Visible = false;
        //creation_clothes_menu.Visible = true;
    }
    else if (item.Text === "Remove") {
        if (tracker_component === 12) {
            tracker_hat = -1;
            tracker_hat_texture = -1;
            mp.events.callRemote("remove_hat_data");
        }
        else if (tracker_component === 13) {
            tracker_glasses = -1;
            tracker_glasses_texture = -1;
            mp.events.callRemote("remove_glasses_data");
        }
        else if (tracker_component === 14) {
            tracker_ear = -1;
            tracker_ear_texture = -1;
            mp.events.callRemote("remove_ear_data");
        }
    }
}

function onItemSelectClothesSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        char_clothes_menu_secondary.Visible = false;
        char_clothes_menu.Visible = true;
    }
    else if (item.Text === "Remove") {
        if (tracker_component === 12) {
            tracker_hat = -1;
            tracker_hat_texture = -1;
            mp.events.callRemote("remove_hat_data");
        }
        else if (tracker_component === 13) {
            tracker_glasses = -1;
            tracker_glasses_texture = -1;
            mp.events.callRemote("remove_glasses_data");
        }
        else if (tracker_component === 14) {
            tracker_ear = -1;
            tracker_ear_texture = -1;
            mp.events.callRemote("remove_ear_data");
        }
    }
}

function onItemSelectionCreationClothes(item, index) {
    if (item.Text === "~g~Confirm") {
        var data = [];
        data.push(tracker_hat);
        data.push(tracker_hat_texture);
        data.push(tracker_glasses);
        data.push(tracker_glasses_texture);
        data.push(tracker_ear);
        data.push(tracker_ear_texture);
        data.push(tracker_watch);
        data.push(tracker_watch_texture);
        data.push(tracker_bracelet);
        data.push(tracker_bracelet_texture);
        var propdata = JSON.stringify(data);
        //mp.events.callRemote("save_player_props", tracker_save_slot, jsonobj);
        //mp.events.callRemote("save_player_clothes", tracker_save_slot, jsonobj);
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
        mp.events.callRemote("save_player_clothes_creation", tracker_save_slot, propdata, jsonObj);
        mp.events.callRemote("creation_end");
        in_progress = 0;
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
        creation_clothes_menu.Visible = false;
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.call('toggleHUDForPlayer', true);
    }
    else if (item.Text === "Hair") {
        tracker_component = 2;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 2);
        mp.events.callRemote("fetch_hair_data_creation", drawVariantCount);
        creation_clothes_menu.Visible = false;
    }
    else if (item.Text === "Shirts") {
        var local_plr = mp.players.local;
        tracker_component = 11;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 11);
        mp.events.callRemote("fetch_auxiliary_data_creation", drawVariantCount);
    }
    else if (item.Text === "Torso") {
        tracker_component = 3;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 3);
        mp.events.callRemote("fetch_torso_data_creation", drawVariantCount);
    }
    else if (item.Text === "Pants") {
        tracker_component = 4;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 4);
        mp.events.callRemote("fetch_legs_data_creation", drawVariantCount);
    }
    else if (item.Text === "Hands") {
        tracker_component = 5;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 5);
        mp.events.callRemote("fetch_hands_data_creation", drawVariantCount);
        creation_clothes_menu.Visible = false;
    }
    else if (item.Text === "Shoes") {
        tracker_component = 6;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 6);
        mp.events.callRemote("fetch_foot_data_creation", drawVariantCount);
    }
    else if (item.Text === "Undershirt") {
        tracker_component = 8;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 8);
        mp.events.callRemote("fetch_accessories2_data_creation", drawVariantCount);
    }
}

mp.events.add("ClothesPrepareBuyDecision", function(){
    char_clothes_menu.Visible = false;
    char_clothes_menu_secondary.Visible = false;
    mp.events.callRemote("unfreeze_clothes_player");
})
function onItemSelectClothesMain(item, index) {
    if (item.Text === "~r~Exit") {
        char_clothes_menu.Visible = false;
        char_clothes_menu_secondary.Visible = false;
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    }
    else if (item.Text === "~g~Purchase Outfit") {
        //save here clothes
        //API.sendChatMessage("Saving to outfit...");

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
        //mp.events.callRemote("save_player_props", tracker_save_slot, jsonobj);
        //mp.events.callRemote("save_player_clothes", tracker_save_slot, jsonobj);
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
        mp.events.callRemote("save_player_clothes", tracker_save_slot, propdata, jsonObj);
    }
    else if (item.Text === "~g~Select Outfit") {
        //API.sendChatMessage("Loading outfit...");
        mp.events.callRemote("load_outfit_player", tracker_save_slot);
    }
    else if (item.Text === "Shirts") {
        var local_plr = mp.players.local;
        tracker_component = 11;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 11);
        mp.events.callRemote("fetch_auxiliary_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Mask") {
        tracker_component = 1;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 1);
        mp.events.callRemote("fetch_beard_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Torso") {
        tracker_component = 3;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 3);
        mp.events.callRemote("fetch_torso_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Pants") {
        tracker_component = 4;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 4);
        mp.events.callRemote("fetch_legs_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Hands") {
        tracker_component = 5;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 5);
        mp.events.callRemote("fetch_hands_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Shoes") {
        tracker_component = 6;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 6);
        mp.events.callRemote("fetch_foot_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Hats") {
        tracker_component = 12;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 0);
        mp.events.callRemote("fetch_hat_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Glasses") {
        tracker_component = 13;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 1);
        mp.events.callRemote("fetch_glasses_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Ears") {
        tracker_component = 14;
        var drawVariantCount = mp.players.local.getNumberOfPropDrawableVariations( 2);
        mp.events.callRemote("fetch_ear_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Accessories") {
        tracker_component = 7;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 7);
        mp.events.callRemote("fetch_accessories1_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Undershirt") {
        tracker_component = 8;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 8);
        mp.events.callRemote("fetch_accessories2_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Accessories 2") {
        tracker_component = 9;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 9);
        mp.events.callRemote("fetch_accessories3_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
    else if (item.Text === "Decals") {
        tracker_component = 10;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 10);
        mp.events.callRemote("fetch_decals_data", drawVariantCount);
        char_clothes_menu.Visible = false;
    }
}

function listChangeEventSurgeryCreationSecondary(item, index) {
    if (item.Text === "Blemishes") {
        tracker_blemishes = item.Index;
        tracker_facial_feat = 0;
        tracker_blemishes_opacity = 100;
        mp.events.callRemote("apply_blemishes", item.Index, tracker_opacity)
    }
    else if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = item.Index;
        /*if (local_plr.getModel() == 1885233650) {
            value = findNearestLegibleTextureMale(tracker_component, item.Index);
            if (isVariantBlacklistedMale(tracker_component, item.Index, value)) {
                apply = false;
            }
            else {
                value = findNearestLegibleTextureMale(tracker_component, item.Index);
            }
        }// FreemodeMale
        else {
            value = findNearestLegibleTextureFemale(tracker_component, item.Index);
            if (isVariantBlacklistedFemale(tracker_component, item.Index, value)) {
                apply = false;
            }
        }*/

        if (value === -1)
            apply = false;

        var menu_one = item;
        if (tracker_component === 0 && apply)
            mp.events.callRemote("apply_head_drawable", item.Index, value);

        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);

        if (local_plr.getModel()== 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }// FreemodeMale
        else {
            if (isVariantBlacklistedFemale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }

        tracker_texture = item.Index;

        var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        if (is_valid === false)
            apply = false;

        if (tracker_component === 0 && apply) {
            var drawable = mp.players.local.getDrawableVariation(tracker_component);
            var d = mp.players.local.getDrawableVariation(0);
            mp.events.callRemote("apply_head_texture", item.Index, d);
        }
    }
    else if (item.Text === "Opacity") {
        tracker_opacity = item.Index;
        if (tracker_facial_feat === 0) { //blemishes
            tracker_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 3) { //ageing
            tracker_ageing_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_ageing, tracker_opacity);
        } else if (tracker_facial_feat === 6) { //complexion
            tracker_complexion_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_complexion, tracker_opacity);
        } else if (tracker_facial_feat === 7) { //sun damage
            tracker_sun_damage_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_sun_damage, tracker_opacity);
        } else if (tracker_facial_feat === 9) { //moles
            tracker_moles_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_moles, tracker_opacity);
        } else if (tracker_facial_feat === 11) { //body blemishes
            tracker_body_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_body_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 12) { //added blemishes
            tracker_add_body_blemish_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_add_body_blemish, tracker_opacity);
        }
    }
    else if (item.Text === "Ageing") {
        tracker_facial_feat = 3;
        tracker_ageing = item.Index;
        tracker_ageing_opacity = 100;
        mp.events.callRemote("apply_ageing", item.Index, tracker_opacity);
    }
    else if (item.Text === "Complexion") {
        tracker_facial_feat = 6;
        tracker_complexion = item.Index;
        tracker_complexion_opacity = 100;
        mp.events.callRemote("apply_complexion", item.Index, tracker_opacity);
    }
    else if (item.Text === "Sun Damage") {
        tracker_facial_feat = 7;
        tracker_sun_damage = item.Index;
        tracker_sun_damage_opacity = 100;
        mp.events.callRemote("apply_sun_damage", item.Index, tracker_opacity);
    }
    else if (item.Text === "Moles/Freckles") {
        tracker_facial_feat = 9;
        tracker_moles = item.Index;
        tracker_moles_opacity = 100;
        mp.events.callRemote("apply_moles", item.Index, tracker_opacity);
    }
    else if (item.Text === "Body Blemishes") {
        tracker_facial_feat = 11;
        tracker_body_blemishes = item.Index;
        tracker_body_blemishes_opacity = 100;
        mp.events.callRemote("apply_body_blemishes", item.Index, tracker_opacity);
    }
    else if (item.Text === "Add Body Blemishes") {
        tracker_facial_feat = 12;
        tracker_add_body_blemish = item.Index;
        tracker_add_body_blemish_opacity = 100;
        mp.events.callRemote("apply_add_body_blemishes", item.Index, tracker_opacity);
    }
}

function onItemSelectSurgeryCreationSecondary(item, index) {
    if (item.Text === "~r~Exit") {
        creation_surgery_menu_secondary.Visible = false;
        creation_surgery_menu.Open();
    }
}

function onItemSelectSurgeryCreationMain(item, index) {
    if (item.Text === "Head") {
        tracker_component = 0;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 0);
        mp.events.callRemote("fetch_head_data_creation", drawVariantCount);
        creation_surgery_menu.Close();
    }
    else if (item.Text === "Beard") {
        tracker_component = 1;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations( 1);
        mp.events.callRemote("fetch_beard_data_creation", drawVariantCount);
        creation_surgery_menu.Close();
    }
    else if (item.Text === "Blemishes") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(0)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Ageing") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Ageing", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(3)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Complexion") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Complexion", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(6)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Sun Damage") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Sun Damage", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(7)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Moles/Freckles") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Moles/Freckles", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(9)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Body Blemishes") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Body Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(11)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Add Body Blemishes") {
        creation_surgery_menu.Close();
        creation_surgery_menu_secondary.Clear();
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Add Body Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(12)), 0)));
        creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        creation_surgery_menu_secondary.RefreshIndex();
        creation_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "~g~Confirm") {

        mp.events.callRemote("play_anim", "friskstance");
        //char_surgery_menu.Visible = false;
        //char_surgery_menu_secondary.Visible = false;

        //var data = [];
        //data.push(tracker_blend_1); //0
        //data.push(tracker_blend_2); //1
        //data.push(tracker_blend_mix);
        //data.push(tracker_skin_mix); //3
        //data.push(tracker_eye_color);
        //data.push(tracker_blemishes); //5
        //data.push(tracker_blemishes_opacity);
        //data.push(tracker_ageing); //7
        //data.push(tracker_ageing_opacity);
        //data.push(tracker_complexion); //9
        //data.push(tracker_complexion_opacity);
        //data.push(tracker_sun_damage);
        //data.push(tracker_sun_damage_opacity);
        //data.push(tracker_moles);
        //data.push(tracker_moles_opacity);
        //data.push(tracker_body_blemishes);
        //data.push(tracker_body_blemishes_opacity);
        //data.push(tracker_add_body_blemish);
        //data.push(tracker_add_body_blemish_opacity);
        //data.push(tracker_nose_width);
        //data.push(tracker_nose_vertical);
        //data.push(tracker_nose_horizontal);
        //data.push(tracker_nose_curve);
        //data.push(tracker_nose_point);
        //data.push(tracker_nose_bend);
        //data.push(tracker_eyebrow_vertical);
        //data.push(tracker_eyebrow_horizontal);
        //data.push(tracker_malar_vertical);
        //data.push(tracker_malar_horizontal);
        //data.push(tracker_cheekbone_depth);
        //data.push(tracker_squint);
        //data.push(tracker_lip_size);
        //data.push(tracker_jawline_vertical);
        //data.push(tracker_jawline_horizontal);
        //data.push(tracker_chin_size);
        //data.push(tracker_chin_length);
        //data.push(tracker_chin_width);
        //data.push(tracker_chin_indent);

        //var compDrawOne = mp.players.local.getDrawableVariation(0);
        //var compTextOne = mp.players.local.getTextureVariation(0);

        //var jsonobj = JSON.stringify(data);
        creation_surgery_menu.Visible = false;
        creation_barber_menu.Visible = true;
        //mp.events.callRemote("save_player_surgery_creation", tracker_save_slot, jsonobj, compDrawOne, compTextOne);
        in_progress = 1;

        mp.events.callRemote("play_anim", "friskstance");
    }
}

function listChangeEventSurgerySecondary(item, index) {
    if (item.Text === "Blemishes") {
        tracker_blemishes = item.Index;
        tracker_facial_feat = 0;
        mp.events.callRemote("apply_blemishes", item.Index, tracker_opacity)
    }
    else if (item.Text === "Drawable Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        var value = item.Index;
        /*if (local_plr.getModel() == 1885233650) {
            value = findNearestLegibleTextureMale(tracker_component, item.Index);
            if (isVariantBlacklistedMale(tracker_component, item.Index, value)) {
                apply = false;
            }
            else {
                value = findNearestLegibleTextureMale(tracker_component, item.Index);
            }
        }// FreemodeMale
        else {
            value = findNearestLegibleTextureFemale(tracker_component, item.Index);
            if (isVariantBlacklistedFemale(tracker_component, item.Index, value)) {
                apply = false;
            }
        }*/

        if (value === -1)
            apply = false;

        var menu_one = item;
        if (tracker_component === 0 && apply)
            mp.events.callRemote("apply_head_drawable", item.Index, value);

        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(menu_one);
        tracker_drawable = item.Index;
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
    }
    else if (item.Text === "Texture Var") {
        var apply = true;
        var local_plr = mp.players.local;
        var drawable = mp.players.local.getDrawableVariation(tracker_component);
        if (local_plr.getModel() == 1885233650) {
            if (isVariantBlacklistedMale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }// FreemodeMale
        else {
            if (isVariantBlacklistedFemale(tracker_component, drawable, item.Index)) {
                apply = false;
            }
        }

        tracker_texture = item.Index;

        var is_valid = mp.players.local.isComponentVariationValid(tracker_component, drawable, tracker_texture);

        if (is_valid === false)
            apply = false;

        if (tracker_component === 0 && apply) {
            var d = mp.players.local.getDrawableVariation(0);
            mp.events.callRemote("apply_head_texture", item.Index, d);
        }
    }
    else if (item.Text === "Opacity") {
        tracker_opacity = item.Index;
        if (tracker_facial_feat === 0) { //blemishes
            tracker_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 3) { //ageing
            tracker_ageing_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_ageing, tracker_opacity);
        } else if (tracker_facial_feat === 6) { //complexion
            tracker_complexion_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_complexion, tracker_opacity);
        } else if (tracker_facial_feat === 7) { //sun damage
            tracker_sun_damage_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_sun_damage, tracker_opacity);
        } else if (tracker_facial_feat === 9) { //moles
            tracker_moles_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_moles, tracker_opacity);
        } else if (tracker_facial_feat === 11) { //body blemishes
            tracker_body_blemishes_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_body_blemishes, tracker_opacity);
        } else if (tracker_facial_feat === 12) { //added blemishes
            tracker_add_body_blemish_opacity = item.Index;
            mp.events.callRemote("apply_opacity", tracker_facial_feat, tracker_add_body_blemish, tracker_opacity);
        }
    }
    else if (item.Text === "Ageing") {
        tracker_facial_feat = 3;
        tracker_ageing = item.Index;
        tracker_ageing_opacity = 100;
        mp.events.callRemote("apply_ageing", item.Index, tracker_opacity);
    }
    else if (item.Text === "Complexion") {
        tracker_facial_feat = 6;
        tracker_complexion = item.Index;
        tracker_complexion_opacity = 100;
        mp.events.callRemote("apply_complexion", item.Index, tracker_opacity);
    }
    else if (item.Text === "Sun Damage") {
        tracker_facial_feat = 7;
        tracker_sun_damage = item.Index;
        tracker_sun_damage_opacity = 100;
        mp.events.callRemote("apply_sun_damage", item.Index, tracker_opacity);
    }
    else if (item.Text === "Moles/Freckles") {
        tracker_facial_feat = 9;
        tracker_moles = item.Index;
        tracker_moles_opacity = 100;
        mp.events.callRemote("apply_moles", item.Index, tracker_opacity);
    }
    else if (item.Text === "Body Blemishes") {
        tracker_facial_feat = 11;
        tracker_body_blemishes = item.Index;
        tracker_body_blemishes_opacity = 100;
        mp.events.callRemote("apply_body_blemishes", item.Index, tracker_opacity);
    }
    else if (item.Text === "Add Body Blemishes") {
        tracker_facial_feat = 12;
        tracker_add_body_blemish = item.Index;
        tracker_add_body_blemish_opacity = 100;
        mp.events.callRemote("apply_add_body_blemishes", item.Index, tracker_opacity);
    }
}

function onItemSelectSurgerySecondary(item, index) {
    if (item.Text === "~r~Exit") {
        char_surgery_menu_secondary.Visible = false;
        char_surgery_menu.Visible = true;
    }
}

function onItemSelectSurgeryMain(item, index) {
    if (item.Text === "Head") {
        tracker_component = 0;
        var drawVariantCount = mp.players.local.getNumberOfDrawableVariations(0);
        mp.events.callRemote("fetch_head_data", drawVariantCount);
        char_surgery_menu.Visible = false;
    }
    else if (item.Text === "Blemishes") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(0)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Ageing") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Ageing", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(3)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Complexion") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Complexion", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(6)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Sun Damage") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Sun Damage", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(7)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Moles/Freckles") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Moles/Freckles", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(9)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Body Blemishes") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Body Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(11)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "Add Body Blemishes") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Clear();
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Add Body Blemishes", "Index Values", new ItemsCollection(convertValueToList(mp.game.ped.getNumHeadOverlayValues(12)), 0)));
        char_surgery_menu_secondary.AddItem(new UIMenuListItem("Opacity", "Index Values", new ItemsCollection(convertValueToList(101), 100)));
        char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
        char_surgery_menu_secondary.RefreshIndex();
        char_surgery_menu_secondary.Visible = true;
    }
    else if (item.Text === "~g~Purchase Outfit") {
        //char_surgery_menu.Visible = false;
        //char_surgery_menu_secondary.Visible = false;
        //API.sendChatMessage("Saving to outfit...");
        var data = [];
        data.push(tracker_blend_1); //0
        data.push(tracker_blend_2); //1
        data.push(tracker_blend_mix);
        data.push(tracker_skin_mix); //3
        data.push(tracker_eye_color);
        data.push(tracker_blemishes); //5
        data.push(tracker_blemishes_opacity);
        data.push(tracker_ageing); //7
        data.push(tracker_ageing_opacity);
        data.push(tracker_complexion); //9
        data.push(tracker_complexion_opacity);
        data.push(tracker_sun_damage);
        data.push(tracker_sun_damage_opacity);
        data.push(tracker_moles);
        data.push(tracker_moles_opacity);
        data.push(tracker_body_blemishes);
        data.push(tracker_body_blemishes_opacity);
        data.push(tracker_add_body_blemish);
        data.push(tracker_add_body_blemish_opacity);
        data.push(tracker_nose_width);
        data.push(tracker_nose_vertical);
        data.push(tracker_nose_horizontal);
        data.push(tracker_nose_curve);
        data.push(tracker_nose_point);
        data.push(tracker_nose_bend);
        data.push(tracker_eyebrow_vertical);
        data.push(tracker_eyebrow_horizontal);
        data.push(tracker_malar_vertical);
        data.push(tracker_malar_horizontal);
        data.push(tracker_cheekbone_depth);
        data.push(tracker_squint);
        data.push(tracker_lip_size);
        data.push(tracker_jawline_vertical);
        data.push(tracker_jawline_horizontal);
        data.push(tracker_chin_size);
        data.push(tracker_chin_length);
        data.push(tracker_chin_width);
        data.push(tracker_chin_indent);
        data.push(tracker_blend_3);
        data.push(tracker_skinblend_mix);
        data.push(tracker_skin_1);
        data.push(tracker_skin_2);
        data.push(tracker_skin_3);

        var compDrawOne = mp.players.local.getDrawableVariation(0);
        var compTextOne = mp.players.local.getTextureVariation(0);

        var jsonobj = JSON.stringify(data);
        ////API.sendChatMessage("Saving to outfit...");
        mp.events.callRemote("save_player_surgery", tracker_save_slot, jsonobj, compDrawOne, compTextOne);
    }
    else if (item.Text === "~g~Purchase All Outfits") {
        //API.sendChatMessage("Saving to all outfits...");
        var data = [];
        data.push(tracker_blend_1); //0
        data.push(tracker_blend_2); //1
        data.push(tracker_blend_mix);
        data.push(tracker_skin_mix); //3
        data.push(tracker_eye_color);
        data.push(tracker_blemishes); //5
        data.push(tracker_blemishes_opacity);
        data.push(tracker_ageing); //7
        data.push(tracker_ageing_opacity);
        data.push(tracker_complexion); //9
        data.push(tracker_complexion_opacity);
        data.push(tracker_sun_damage);
        data.push(tracker_sun_damage_opacity);
        data.push(tracker_moles);
        data.push(tracker_moles_opacity);
        data.push(tracker_body_blemishes);
        data.push(tracker_body_blemishes_opacity);
        data.push(tracker_add_body_blemish);
        data.push(tracker_add_body_blemish_opacity);
        data.push(tracker_nose_width);
        data.push(tracker_nose_vertical);
        data.push(tracker_nose_horizontal);
        data.push(tracker_nose_curve);
        data.push(tracker_nose_point);
        data.push(tracker_nose_bend);
        data.push(tracker_eyebrow_vertical);
        data.push(tracker_eyebrow_horizontal);
        data.push(tracker_malar_vertical);
        data.push(tracker_malar_horizontal);
        data.push(tracker_cheekbone_depth);
        data.push(tracker_squint);
        data.push(tracker_lip_size);
        data.push(tracker_jawline_vertical);
        data.push(tracker_jawline_horizontal);
        data.push(tracker_chin_size);
        data.push(tracker_chin_length);
        data.push(tracker_chin_width);
        data.push(tracker_chin_indent);
        data.push(tracker_blend_3);
        data.push(tracker_skinblend_mix);
        data.push(tracker_skin_1);
        data.push(tracker_skin_2);
        data.push(tracker_skin_3);

        var compDrawOne = mp.players.local.getDrawableVariation(0);
        var compTextOne = mp.players.local.getTextureVariation(0);

        var jsonobj = JSON.stringify(data);
        ////API.sendChatMessage("Saving to outfit...");
        mp.events.callRemote("save_player_surgery_all", tracker_save_slot, jsonobj, compDrawOne, compTextOne);
    }
    else if (item.Text === "~g~Select Outfit") {
        //API.sendChatMessage("Loading outfit...");
        mp.events.callRemote("load_outfit_player", tracker_save_slot);
    }
    else if (item.Text === "~r~Exit") {
        char_surgery_menu.Visible = false;
        char_surgery_menu_secondary.Visible = false;
        //char_surgery_menu.Close();
        //closeAllMenus();
        mp.events.callRemote("unfreeze_clothes_player");
        mp.events.callRemote("reload_my_char");
    }
}

mp.events.add(
    {
        "exit_wardrobe_men" : () => {
            char_wardrobe_menu.Visible = false;
            mp.events.callRemote("unfreeze_clothes_player");
        },
        "load_this_skin" : (skin) => {
            mp.players.local.model = skin;
        },
        "show_skin_menu" : (index) => {
            let player = mp.players.local;
            char_clothes_menu.Visible = false;
            char_clothes_menu_secondary.Visible = false;
            var index_size = index;
            char_skin_menu.Clear();
            char_skin_menu.AddItem(new UIMenuListItem("~g~Purchase Skin", "Limited customization", new ItemsCollection(convertValueToList(index_size), 0)));
            char_skin_menu.AddItem(new UIMenuItem("~y~Male Advanced skin", "Fully customizable skin"));
            char_skin_menu.AddItem(new UIMenuItem("~y~Female Advanced skin", "Fully customizable skin"));
            char_skin_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_skin_menu.RefreshIndex();
            char_skin_menu.Open();
        },
        "creation_skin": (index) => {

            // OLD:

            //in_progress = 1;
            //creation_clothes_menu.Visible = false;
            //creation_clothes_menu_secondary.Visible = false;
            //var index_size = index;
            //creation_skin_menu.Clear();
            ////creation_skin_menu.AddItem(new UIMenuListItem("~g~Regular Skin", "Limited customization", new ItemsCollection(convertValueToList(index_size), 0)));
            //creation_skin_menu.AddItem(new UIMenuItem("~y~Male", "Fully customizable skin"));
            //creation_skin_menu.AddItem(new UIMenuItem("~y~Female", "Fully customizable skin"));
            //creation_skin_menu.RefreshIndex();
            //creation_skin_menu.Open();
            //var vec = new mp.Vector3(402.8837, -999.0696, -98.00404);
            //cam = mp.cameras.new('default', vec, mp.players.local.rotation, 60);
            //cam.pointAt(mp.players.local, mp.players.local.position, true);
            //cam.setActive(true);
            //mp.game.cam.renderScriptCams(true, false, 0, true, false);
            //mp.events.callRemote("play_anim", "friskstance");
            //mp.gui.chat.activate(false);
            mp.gui.chat.show(false);

            // NEW:
            mp.events.call('beginCharacterCreation');
        },
        "push_char_data_for_me_surg" : (ent, surgs) => {
            var entity = ent;
            if (entity === null)
                return;
            if (entity.IsNull)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var surgerys = JSON.parse(surgs);
            for (var i = 0; i < surgerys.length; i++) {
                surgerys[i] = parseInt(surgerys[i]);
            }
            if (surgerys.length === 0)
                return;

            mp.game.invoke('0x9414E18B9434C2FE', entity, surgerys[0], surgerys[1], 0, surgerys[0], surgerys[1], 0, surgerys[2] / 100.0, surgerys[3] / 100.0, 0.0, 0); //SET_PED_HEAD_BLEND_DATA
            mp.game.invoke('0x48F44967FA05CC1E', entity, 0, surgerys[5], surgerys[6] / 100.0); //SET_PED_HEAD_OVERLAY
            mp.game.invoke('0x50B56988B170AFDF', entity, surgerys[4]); //_SET_PED_EYE_COLOR
            mp.game.invoke('0x48F44967FA05CC1E', entity, 3, surgerys[7], surgerys[8] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 6, surgerys[9], surgerys[10] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 7, surgerys[11], surgerys[12] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 9, surgerys[13], surgerys[14] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 11, surgerys[15], surgerys[16] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 12, surgerys[17], surgerys[18] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 0, surgerys[19] / 100.0); //_SET_PED_FACE_FEATURE
            mp.game.invoke('0x71A5C1DBA060049E', entity, 1, surgerys[20] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 2, surgerys[21] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 3, surgerys[22] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 4, surgerys[23] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 5, surgerys[24] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 6, surgerys[25] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 7, surgerys[26] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 8, surgerys[27] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 9, surgerys[28] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 10, surgerys[29] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 11, surgerys[30] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 12, surgerys[31] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 13, surgerys[32] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 14, surgerys[33] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 15, surgerys[34] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 16, surgerys[35] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 17, surgerys[36] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 18, surgerys[37] / 100.0);
            if( typeof surgerys[38] !== 'undefined' ) mp.game.invoke('0x71A5C1DBA060049E', entity, 19, surgerys[38] / 100.0);
        },
        "push_char_data_for_me_barb" : (ent, barbs) => {
            var entity = ent;
            if (entity === null)
                return;
            if (entity.IsNull)
                return;
            if (!entity.isAPed() ||  !entity.doesExist()) { return; }
            var barbers = JSON.parse(bars);
            for (var i = 0; i < barbers.length; i++) {
                barbers[i] = parseInt(barbers[i]);
            }
            if (barbers.length === 0)
                return;

            mp.game.invoke('0x48F44967FA05CC1E', entity, 1, barbers[4], barbers[6] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 1, 1, barbers[5], barbers[5]); //_SET_PED_HEAD_OVERLAY_COLOR
            mp.game.invoke('0x48F44967FA05CC1E', entity, 2, barbers[7], barbers[9] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 2, 1, barbers[8], barbers[8]);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 10, barbers[10], barbers[12] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 10, 1, barbers[11], barbers[11]);
            mp.game.invoke('0x4CFFC65454C93A49', entity, barbers[2], barbers[3]); //_SET_PED_HAIR_COLOR
        },
        "push_char_data_for_me_tatt" : (ent, tats) => {
            var entity = ent;
            if (entity === null)
                return;
            if (entity.IsNull)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var tattoos = JSON.parse(tats);
            for (var i = 0; i < tattoos.length; i++) {
                tattoos[i] = parseInt(tattoos[i]);
            }
            if (tattoos.length === 0)
                return;

            mp.game.invoke('0x48F44967FA05CC1E', entity, 4, tattoos[0], tattoos[2] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 4, 2, tattoos[1], tattoos[9]);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 5, tattoos[3], tattoos[5] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 5, 2, tattoos[4], tattoos[10]);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 8, tattoos[6], tattoos[8] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 8, 2, tattoos[7], tattoos[11]);
        },
        "push_char_data_for_me_prop" : (ent, properties) => {
            var entity = ent;
            if (entity === null)
                return;
            if (entity.IsNull)
                return;
            if (!ent.isAPed() ||  !ent.doesExist()) { return; }
            var props = JSON.parse(properties);
            for (var i = 0; i < props.length; i++) {
                props[i] = parseInt(props[i]);
            }
            if (props.length === 0)
                return;

            if (props[0] === -1 || props[1] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 0); //CLEAR_PED_PROP
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 0, props[0], props[1], true); //SET_PED_PROP_INDEX
                mp.game.invoke('0x26D83693ED99291C', entity, props[0], 1); //SET_PED_HELMET_PROP_INDEX
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[1]); //SET_PED_HELMET_TEXTURE_INDEX
            }

            if (props[2] === -1 || props[3] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 1);
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 1, props[2], props[3], true);
                mp.game.invoke('0x26D83693ED99291C', entity, props[2], 1);
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[3]);
            }

            if (props[4] === -1 || props[5] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 2);
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 2, props[4], props[5], true);
                mp.game.invoke('0x26D83693ED99291C', entity, props[4], 1);
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[5]);
            }
        },
        "clear_tattoos" : (ent) => {
            var entity = ent;
            if (entity === null)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            mp.game.invoke('0x0E5173C163976E38', entity); //CLEAR_PED_DECORATIONS
        },
        "remove_tattoo" : (ent) => {
            var entity = ent;
            if (entity === null)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var tattooCollection = args[1];
            if (tattooCollection == null || tattooCollection.length == 0)
                return;
            var tattooHash = args[2];
            if (tattooHash == null || tattooHash.length == 0)
                return;
            mp.game.invoke('0x0E5173C163976E38', entity);
            mp.game.invoke('0x5F5D1665E352A839', entity, tattooCollection, tattooHash); //_SET_PED_DECORATION
        },
        "preview_tattoo" : (ent, tatCol, tatH) => {
            var entity = ent;
            if (entity === null)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var tattooCollection = tatCol;
            if (tattooCollection == null || tattooCollection.length == 0)
                return;
            var tattooHash = tatH;
            if (tattooHash == null || tattooHash.length == 0)
                return;
            mp.game.invoke('0x5F5D1665E352A839', entity, tattooCollection, tattooHash);
        },
        "sync_tattoo" : (ent, tatCol, tatH, len) => {
            var entity = ent;
            if (entity === null)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var tattooCollection = tatCol;
            if (tattooCollection == null || tattooCollection.length == 0)
                return;
            var tattooHash = tatH;
            if (tattooHash == null || tattooHash.length == 0)
                return;
            var length = len;
            mp.game.invoke('0x0E5173C163976E38', entity);
            for (var i = 0; i < length; ++i) {
                mp.game.invoke('0x5F5D1665E352A839', entity, mp.game.gameplay.getHashKey(tattooCollection[i]), tattooHash[i]);
            }
        },
        "push_char_data_for_me" : (ent, barbs, surgs, properties, tats) => {
            var entity = ent;
            if (entity === null)
                return;
            if (!entity.isAPed() || !entity.doesExist()) { return; }
            var barbers = barbs;
            var surgerys = surgs;
            var props = properties;
            var tattoos = tats;
            if (tattoos.length === 0)
                return;
            if (barbers.length === 0)
                return;
            if (surgerys.length === 0)
                return;
            if (props.length === 0)
                return;

            if (surgerys[2] == 100)
                surgerys[2] = 99.0;
            if (surgerys[3] == 100)
                surgerys[3] = 99.0;
            mp.game.invoke('0x9414E18B9434C2FE', entity, surgerys[0], surgerys[1], 0, surgerys[0], surgerys[1], 0, surgerys[2] / 100.0, surgerys[3] / 100.0, 0.0, 0);
            if (surgerys[6] == 100)
                surgerys[6] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 0, surgerys[5], surgerys[6] / 100.0);
            mp.game.invoke('0x50B56988B170AFDF', entity, surgerys[4]);
            if (barbers[6] == 100)
                barbers[6] = 99.0;
            ////API.sendChatMessage("Barber is " + barbers[4] + " with opacity " + barbers[6]);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 1, barbers[4], barbers[6] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 1, 1, barbers[5], barbers[5]);
            if (barbers[9] == 100)
                barbers[9] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 2, barbers[7], barbers[9] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 2, 1, barbers[8], barbers[8]);
            if (surgerys[8] == 100)
                surgerys[8] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 3, surgerys[7], surgerys[8] / 100.0);
            if (tattoos[2] == 100)
                tattoos[2] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 4, tattoos[0], tattoos[2] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 4, 2, tattoos[1], tattoos[9]);

            mp.game.invoke('0x497BF74A7B9CB952', entity, 4, 2, tattoos[1], tattoos[9]);
            if (tattoos[5] == 100)
                tattoos[5] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 5, tattoos[3], tattoos[5] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 5, 2, tattoos[4], tattoos[10]);

            if (surgerys[10] == 100)
                surgerys[10] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 6, surgerys[9], surgerys[10] / 100.0);
            if (surgerys[12] == 100)
                surgerys[12] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 7, surgerys[11], surgerys[12] / 100.0);

            if (tattoos[8] == 100)
                tattoos[8] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 8, tattoos[6], tattoos[8] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 8, 2, tattoos[7], tattoos[11]);
            if (surgerys[14] == 100)
                surgerys[14] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 9, surgerys[13], surgerys[14] / 100.0);
            if (barbers[12] == 100)
                barbers[12] = 99.0;
            mp.game.invoke('0x48F44967FA05CC1E', entity, 10, barbers[10], barbers[12] / 100.0);
            mp.game.invoke('0x497BF74A7B9CB952', entity, 10, 1, barbers[11], barbers[11]);
            for (var i = 16; i <= 38; i++)
            {
                if( typeof surgery[i] === 'undefined' ) surgery[i] = 0;
                if (surgerys[i] == 100)
                    surgerys[i] = 99.0;
            }
            mp.game.invoke('0x48F44967FA05CC1E', entity, 11, surgerys[15], surgerys[16] / 100.0);
            mp.game.invoke('0x48F44967FA05CC1E', entity, 12, surgerys[17], surgerys[18] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 0, surgerys[19] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 1, surgerys[20] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 2, surgerys[21] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 3, surgerys[22] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 4, surgerys[23] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 5, surgerys[24] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 6, surgerys[25] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 7, surgerys[26] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 8, surgerys[27] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 9, surgerys[28] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 10, surgerys[29] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 11, surgerys[30] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 12, surgerys[31] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 13, surgerys[32] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 14, surgerys[33] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 15, surgerys[34] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 16, surgerys[35] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 17, surgerys[36] / 100.0);
            mp.game.invoke('0x71A5C1DBA060049E', entity, 18, surgerys[37] / 100.0);
            if( typeof surgerys[38] !== 'undefined' ) mp.game.invoke('0x71A5C1DBA060049E', entity, 19, surgerys[38] / 100.0);
            /*mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 0, clothes[0], clothes[12], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 1, clothes[1], clothes[13], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 2, barbers[0], clothes[1], 0);*/
            mp.game.invoke('0x4CFFC65454C93A49', entity, barbers[2], barbers[3]);
            /*mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 3, clothes[3], clothes[15], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 4, clothes[4], clothes[16], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 5, clothes[5], clothes[17], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 6, clothes[6], clothes[18], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 7, clothes[7], clothes[19], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 8, clothes[8], clothes[20], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 9, clothes[9], clothes[21], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 10, clothes[10], clothes[22], 0);
            mp.game.invoke("SET_PED_COMPONENT_VARIATION", entity, 11, clothes[11], clothes[23], 0);*/

            if (props[0] === -1 || props[1] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 0);
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 0, props[0], props[1], true);
                mp.game.invoke('0x26D83693ED99291C', entity, props[0], 1);
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[1]);
            }

            if (props[2] === -1 || props[3] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 1);
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 1, props[2], props[3], true);
                mp.game.invoke('0x26D83693ED99291C', entity, props[2], 1);
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[3]);
            }

            if (props[4] === -1 || props[5] === -1) {
                mp.game.invoke('0x0943E5B8E078E76E', entity, 2);
            } else {
                mp.game.invoke('0x93376B65A266EB5F', entity, 2, props[4], props[5], true);
                mp.game.invoke('0x26D83693ED99291C', entity, props[4], 1);
                mp.game.invoke('0xF1550C4BD22582E2', entity, props[5]);
            }
        },
        "load_my_variables" : (tracker, onduty, properties, barbers, tattoos, surgeries) => {
            if (onduty === true) {
                if (initiated == 0)
                    initiateMenus();
                tracker_uniform_slot = tracker;
            } else {
                if (initiated == 0)
                    initiateMenus();
                char_clothes_menu.Clear();
                //char_clothes_menu.AddItem(new UIMenuItem("Mask", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Shirts", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Undershirt", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Pants", ""));
                //char_clothes_menu.AddItem(new UIMenuItem("Hands", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Shoes", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Torso", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Hats", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Glasses", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Ears", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Accessories", ""));
                //char_clothes_menu.AddItem(new UIMenuItem("Accessories 2", ""));
                char_clothes_menu.AddItem(new UIMenuItem("Decals", ""));
                char_clothes_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names, tracker)));
                char_clothes_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names, tracker)));
                char_clothes_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_clothes_menu.RefreshIndex();

                char_surgery_menu.Clear();
                char_surgery_menu.AddItem(new UIMenuItem("Head", "Non-GTAO"));
                char_surgery_menu.AddItem(new UIMenuListItem("Parent Face 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Parent Face 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Ancestry Face", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 1", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Parent Skin 2", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Ancestry Skin", "GTAO Only Head Model", new ItemsCollection(convertValueToList(46), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("1 <-Blend Mix-> 2", "GTAO Only Blend Ratio", new ItemsCollection(convertValueToList(101), 100)));
                char_surgery_menu.AddItem(new UIMenuListItem("1 <-Skin Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
                char_surgery_menu.AddItem(new UIMenuListItem("1 <-Override Mix-> 2", "GTAO Only Skin Ratio", new ItemsCollection(convertValueToList(101), 100)));
                char_surgery_menu.AddItem(new UIMenuListItem("Eye Color", "GTAO Only", new ItemsCollection(convertValueToList(32), 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Width", "GTAO Only", new ItemsCollection(listNoseWidth, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Vertical", "GTAO Only", new ItemsCollection(listNoseVertical, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Horizontal", "GTAO Only", new ItemsCollection(listNoseHorizontal, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Curve", "GTAO Only", new ItemsCollection(listNoseCurve, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Point", "GTAO Only", new ItemsCollection(listNosePoint, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Nose Bend", "GTAO Only", new ItemsCollection(listNoseBend, 100)));
                char_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Vertical", "GTAO Only", new ItemsCollection(listEyebrowVertical, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Eyebrow Horizontal", "GTAO Only", new ItemsCollection(listEyebrowHorizontal, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Malar Vertical", "GTAO Only", new ItemsCollection(listMalarVertical, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Malar Horizontal", "GTAO Only", new ItemsCollection(listMalarHorizontal, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Cheekbone Depth", "GTAO Only", new ItemsCollection(listCheekboneDepth, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Squint", "GTAO Only", new ItemsCollection(listSquint, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Lip Size", "GTAO Only", new ItemsCollection(listLipSize, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Jawline Vertical", "GTAO Only", new ItemsCollection(listJawlineVertical, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Jawline Horizontal", "GTAO Only", new ItemsCollection(listJawlineHorizontal, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Chin Size", "GTAO Only", new ItemsCollection(listChinSize, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Chin Length", "GTAO Only", new ItemsCollection(listChinLength, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Chin Width", "GTAO Only", new ItemsCollection(listChinWidth, 0)));
                char_surgery_menu.AddItem(new UIMenuListItem("Chin Indent", "GTAO Only", new ItemsCollection(listChinIndent, 0)));
                char_surgery_menu.AddItem(new UIMenuItem("Blemishes", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Ageing", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Complexion", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Sun Damage", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Moles/Freckles", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Body Blemishes", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("Add Body Blemishes", "GTAO Only"));
                char_surgery_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $300"));
                char_surgery_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $300", new ItemsCollection(wardrobe_names), tracker));
                char_surgery_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names), tracker));
                char_surgery_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_surgery_menu.RefreshIndex();

                char_tattoo_menu.Clear();
                char_tattoo_menu.AddItem(new UIMenuItem("Makeup", "GTAO Char. Only"));
                char_tattoo_menu.AddItem(new UIMenuItem("Blush", "GTAO Char. Only"));
                char_tattoo_menu.AddItem(new UIMenuItem("Lipstick", "GTAO Char. Only"));
                char_tattoo_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $100"));
                char_tattoo_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names), tracker));
                char_tattoo_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names), tracker));
                char_tattoo_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_tattoo_menu.RefreshIndex();

                char_wardrobe_menu.Clear();
                char_wardrobe_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names), tracker));
                char_wardrobe_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_wardrobe_menu.RefreshIndex();

                char_uniform_menu.Clear();
                char_uniform_menu.AddItem(new UIMenuListItem("~g~Select Uniform", "Selection Slots", new ItemsCollection(uniform_names), tracker));
                char_uniform_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_uniform_menu.RefreshIndex();

                char_barber_menu.Clear();
                char_barber_menu.AddItem(new UIMenuItem("Hair", "Hair style."));
                char_barber_menu.AddItem(new UIMenuItem("Hair Tattoos", ""));
                char_barber_menu.AddItem(new UIMenuItem("Facial Hair", "GTAO Only"));
                char_barber_menu.AddItem(new UIMenuItem("Chest Hair", "GTAO Only"));
                char_barber_menu.AddItem(new UIMenuItem("Eyebrows", "GTAO Only"));
                char_barber_menu.AddItem(new UIMenuItem("~g~Purchase All Outfits", "Purchase Price: $100"));
                char_barber_menu.AddItem(new UIMenuListItem("~g~Purchase Outfit", "Purchase Price: $100", new ItemsCollection(wardrobe_names), tracker));
                char_barber_menu.AddItem(new UIMenuListItem("~g~Select Outfit", "Selection Slots", new ItemsCollection(wardrobe_names), tracker));
                char_barber_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
                char_barber_menu.RefreshIndex();

                tracker_save_slot = tracker;
            }

            var props = JSON.parse(properties);
            tracker_hat = parseInt(props[0]);
            tracker_hat_texture = parseInt(props[1]);
            tracker_glasses = parseInt(props[2]);
            tracker_glasses_texture = parseInt(props[3]);
            tracker_ear = parseInt(props[4]);
            tracker_ear_texture = parseInt(props[5]);
            tracker_watch = parseInt(props[6]);
            tracker_watch_texture = parseInt(props[7]);
            tracker_bracelet = parseInt(props[8]);
            tracker_bracelet_texture = parseInt(props[9]);

            var barber = JSON.parse(barbers);
            tracker_hair = parseInt(barber[0]);
            tracker_hair_texture = parseInt(barber[1]);
            tracker_hair_color = parseInt(barber[2]);
            tracker_highlight = parseInt(barber[3]);
            tracker_facial_hair = parseInt(barber[4]);
            tracker_facial_hair_color = parseInt(barber[5]);
            tracker_facial_hair_opacity = parseInt(barber[6]);
            tracker_eyebrows = parseInt(barber[7]);
            tracker_eyebrows_color = parseInt(barber[8]);
            tracker_eyebrows_opacity = parseInt(barber[9]);
            tracker_chest_hair = parseInt(barber[10]);
            tracker_chest_hair_color = parseInt(barber[11]);
            tracker_chest_hair_opacity = parseInt(barber[12]);

            var tattoo = JSON.parse(tattoos);
            tracker_makeup = parseInt(tattoo[0]);
            tracker_makeup_color = parseInt(tattoo[1]);
            tracker_makeup_opacity = parseInt(tattoo[2]);
            tracker_blush = parseInt(tattoo[3]);
            tracker_blush_color = parseInt(tattoo[4]);
            tracker_blush_opacity = parseInt(tattoo[5]);
            tracker_lipstick = parseInt(tattoo[6]);
            tracker_lipstick_color = parseInt(tattoo[7]);
            tracker_lipstick_opacity = parseInt(tattoo[8]);
            tracker_makeup_color_2 = parseInt(tattoo[9]);
            tracker_blush_color_2 = parseInt(tattoo[10]);
            tracker_lipstick_color_2 = parseInt(tattoo[11]);

            var surgery = JSON.parse(surgeries);
            if(typeof surgery[39] === 'undefined' )
                surgery[39] = 0;
            if(typeof surgery[40] === 'undefined' )
                surgery[40] = 0;

            if(typeof surgery[41] === 'undefined' )
                surgery[41] = surgery[0];
            
            if(typeof surgery[42] === 'undefined' )
                surgery[42] = surgery[1];
            
            if(typeof surgery[43] === 'undefined' )
                surgery[43] = surgery[39];

            if(parseInt(surgery[41]) == -1)
                surgery[41] = surgery[0];
            
            if(parseInt(surgery[42]) == -1)
                surgery[42] = surgery[1];
            
            if(parseInt(surgery[43]) == -1)
                surgery[43] = surgery[39];

            tracker_blend_1 = parseInt(surgery[0]);
            tracker_blend_2 = parseInt(surgery[1]);
            tracker_blend_3 = parseInt(surgery[39]);
            tracker_blend_mix = parseInt(surgery[2]);
            tracker_skin_mix = parseInt(surgery[3]);
            tracker_skinblend_mix = parseInt(surgery[40]);
            tracker_eye_color = parseInt(surgery[4]);
            tracker_blemishes = parseInt(surgery[5]);
            tracker_blemishes_opacity = parseInt(surgery[6]);
            tracker_ageing = parseInt(surgery[7]);
            tracker_ageing_opacity = parseInt(surgery[8]);
            tracker_complexion = parseInt(surgery[9]);
            tracker_complexion_opacity = parseInt(surgery[10]);
            tracker_sun_damage = parseInt(surgery[11]);
            tracker_sun_damage_opacity = parseInt(surgery[12]);
            tracker_moles = parseInt(surgery[13]);
            tracker_moles_opacity = parseInt(surgery[14]);
            tracker_body_blemishes = parseInt(surgery[15]);
            tracker_body_blemishes_opacity = parseInt(surgery[16]);
            tracker_add_body_blemish = parseInt(surgery[17]);
            tracker_add_body_blemish_opacity = parseInt(surgery[18]);
            tracker_nose_width = parseInt(surgery[19]);
            tracker_nose_vertical = parseInt(surgery[20]);
            tracker_nose_horizontal = parseInt(surgery[21]);
            tracker_nose_curve = parseInt(surgery[22]);
            tracker_nose_point = parseInt(surgery[23]);
            tracker_nose_bend = parseInt(surgery[24]);
            tracker_eyebrow_vertical = parseInt(surgery[25]);
            tracker_eyebrow_horizontal = parseInt(surgery[26]);
            tracker_malar_vertical = parseInt(surgery[27]);
            tracker_malar_horizontal = parseInt(surgery[28]);
            tracker_cheekbone_depth = parseInt(surgery[29]);
            tracker_squint = parseInt(surgery[30]);
            tracker_lip_size = parseInt(surgery[31]);
            tracker_jawline_vertical = parseInt(surgery[32]);
            tracker_jawline_horizontal = parseInt(surgery[33]);
            tracker_chin_size = parseInt(surgery[34]);
            tracker_chin_length = parseInt(surgery[35]);
            tracker_chin_width = parseInt(surgery[36]);
            tracker_chin_indent = parseInt(surgery[37]);
            tracker_skin_1 = parseInt(surgery[41]);
            tracker_skin_2 = parseInt(surgery[42]);
            tracker_skin_3 = parseInt(surgery[43]);
            if( typeof surgery[38] === 'undefined' )
            {
                surgery[38] = 0;
                tracker_neck_width = 0;
            }
            else
            {
                tracker_neck_width = parseInt(surgery[38]);
            }
            surgeries = JSON.stringify(surgery);
            mp.events.call('updateNewCCTrackers', tracker, surgeries);
        },
        "push_head_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_surgery_menu_secondary.Clear();
            char_surgery_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_surgery_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_surgery_menu_secondary.RefreshIndex();
            char_surgery_menu_secondary.Visible = true;
        },
        "push_head_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_surgery_menu.Clear();
            creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_surgery_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_surgery_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_surgery_menu_secondary.RefreshIndex();
            creation_surgery_menu_secondary.Visible = true;
        },
        "push_hair_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_barber_menu_secondary.Clear();
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Color", "GTAO Char. Only", new ItemsCollection(convertValueToList(63), 0)));
            char_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Highlights", "GTAO Char. Only", new ItemsCollection(convertValueToList(63), 0)));
            char_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_barber_menu_secondary.RefreshIndex();
            char_barber_menu_secondary.Visible = true;
        },
        "push_hair_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_barber_menu_secondary.Clear();
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Color", "GTAO Char. Only", new ItemsCollection(convertValueToList(63), 0)));
            creation_barber_menu_secondary.AddItem(new UIMenuListItem("Hair Highlights", "GTAO Char. Only", new ItemsCollection(convertValueToList(63), 0)));
            creation_barber_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_barber_menu_secondary.RefreshIndex();
            creation_barber_menu.Visible = false;
            creation_barber_menu_secondary.Visible = true;
        },
        "push_torso_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_torso_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_torso_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_legs_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_legs_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_legs_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_hands_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_hands_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_hands_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_foot_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_foot_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_foot_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_accessories1_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_accessories1_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_accessories2_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_accessories2_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_accessories2_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_accessories3_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_accessories3_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_decals_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_decals_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_auxiliary_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_auxiliary_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu.Visible = false;
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_auxiliary_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_hat_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(0, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_hat_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(0, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_glasses_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(1, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_glasses_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(1, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_ear_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(3, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_ear_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfPropTextureVariations(3, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("Remove", "Remove current prop."));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "push_beard_data" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_clothes_menu_secondary.Clear();
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_clothes_menu_secondary.RefreshIndex();
            char_clothes_menu_secondary.Visible = true;
        },
        "push_beard_data_creation" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            creation_clothes_menu_secondary.Clear();
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            creation_clothes_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            creation_clothes_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            creation_clothes_menu_secondary.RefreshIndex();
            creation_clothes_menu_secondary.Visible = true;
        },
        "push_beard_data_cop" : (draw) => {
            var draw_count = draw;
            var draw_array = [];
            if (draw_count <= 0) {
                draw_array.push("0");
            }
            for (var i = 0; i < draw_count; i++) {
                draw_array.push(i.toString());
            }
            char_cop_menu_secondary.Clear();
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Drawable Var", "Model Object (" + draw_count + ")", new ItemsCollection(draw_array), 0));
            char_cop_menu_secondary.AddItem(new UIMenuListItem("Texture Var", "Model Texture", new ItemsCollection(convertValueToList(mp.players.local.getNumberOfTextureVariations( tracker_component, tracker_drawable)), 0)));
            char_cop_menu_secondary.AddItem(new UIMenuItem("~r~Exit", "Close menu."));
            char_cop_menu_secondary.RefreshIndex();
            char_cop_menu_secondary.Visible = true;
        },
        "open_the_menu_surgery": (old, slots) => {

            // OLD:
            if (old == 1)
            {
                if (initiated == 0)
                    initiateMenus();

                char_surgery_menu.Open();
                char_surgery_menu.Visible = true;
            }
            else
                mp.events.call('beginCharacterPlasticSurgery', slots);
        },
        "open_the_menu_barber" : ( hairData, hairTattoos, slots ) => {

            let initialData = {
                'appearances' : [],
                'appearancesColor1': [],
                'appearancesColor2': [],
                'appearancesOpacity': []
            };

            try {
                var barber = JSON.parse( hairData );
                initialData['hair'] = parseInt(barber[0]);
                initialData['hairVariation'] = parseInt(barber[1]);
                initialData['hairColor1'] = parseInt(barber[2]);
                initialData['hairColor2'] = parseInt(barber[3]);

                if( mp.players.local.model != mp.game.joaat( 'mp_f_freemode_01' ) )
                {
                    if( parseInt(barber[4]) < 255 )
                    {
                        barber[4] = parseInt(barber[4]) + 1;
                    }
                    else
                    {
                        barber[4] = 0;
                    }

                    initialData['appearances'][1] = parseInt(barber[4]);
                    initialData['appearancesColor1'][1] = parseInt(barber[5]);
                    initialData['appearancesOpacity'][1] = parseInt(barber[6]);
                }

                if( parseInt(barber[7]) < 255 )
                {
                    barber[7] = parseInt(barber[7]) + 1;
                }
                else
                {
                    barber[7] = 0;
                }

                initialData['appearances'][2] = parseInt(barber[7]);
                initialData['appearancesColor1'][2] = parseInt(barber[8]);
                initialData['appearancesOpacity'][2] = parseInt(barber[9]);

                if( parseInt(barber[10]) < 255 )
                {
                    barber[10] = parseInt(barber[10]) + 1;
                }
                else
                {
                    barber[10] = 0;
                }

                initialData['appearances'][10] = parseInt(barber[10]);
                initialData['appearancesColor1'][10] = parseInt(barber[11]);
                initialData['appearancesOpacity'][10] = parseInt(barber[12]);

            }
            catch( e )
            {
                initialData = {
                    'appearances' : [],
                    'appearancesColor1': [],
                    'appearancesColor2': [],
                    'appearancesOpacity': []
                };
            }

            let maximumValues = {};
            try {
                maximumValues = {
                    'hair': mp.players.local.getNumberOfDrawableVariations(2),
                    'facialhair': mp.game.ped.getNumHeadOverlayValues(1),
                    'eyebrows': mp.game.ped.getNumHeadOverlayValues(2),
                    'chesthair': mp.game.ped.getNumHeadOverlayValues(10)
                };
            }
            catch( e )
            {
                maximumValues = {};
            }

            let tats;
            try
            {
                tats = JSON.parse( hairTattoos );
            }
            catch(e)
            {
                tats = [];
            }

            mp.events.call( 'beginBarberCreation', false, ( mp.players.local.model === mp.game.joaat( 'mp_f_freemode_01' ) ), maximumValues, initialData, tats, slots-1 );

            // if (initiated == 0)
            // initiateMenus();
            // char_barber_menu.Visible = true;
        },
        "char_creation_done_new" : () => {
            mp.events.callRemote("creation_end");
            in_progress = 0;
            mp.gui.chat.activate(true);
            mp.gui.chat.show(true);
            mp.events.callRemote("unfreeze_clothes_player");
        },
        "open_the_menu_clothes" : () => {
            if (initiated == 0)
                initiateMenus();
            char_clothes_menu.Visible = true;
            char_clothes_menu_secondary.Visible = false;
            char_skin_menu.Close();
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
        },
        "open_the_menu_tattoo" : () => {
            if (initiated == 0)
                initiateMenus();
            char_tattoo_menu.Visible = true;
        },
        "open_the_menu_cop" : () => {
            if (initiated == 0)
                initiateMenus();
            char_cop_menu.Visible = true;
        },
        "open_the_menu_wardrobe" : () => {
            if (initiated == 0)
                initiateMenus();
            char_wardrobe_menu.Visible = true;
        },
        "open_the_menu_uniform" : () => {
            if (initiated == 0)
                initiateMenus();
            char_uniform_menu.Visible = true;
        },
        "set_wardrobe_limit" : (limit) => {
            wardrobe_max_slots = limit;
            initiateMenus();
        },
        "set_wardrobe_names" : (json) => {
	        wardrobe_names = json;
            initiateMenus();
        },
        "set_uniform_names" : (json) => {
	        uniform_names = json;
            initiateMenus();
        },
        "real_frozen" : () => {
            mp.events.callRemote("play_anim", "friskstance");
        },

        "update_menu_position" : (x, y) => {
            posX = resolution.x * x;
            posY = resolution.y * y;
            initiateMenus();
        }
    });

var res = false;
mp.events.add("render", () => {
    if (initiated == 1 && in_progress === 1 && (creation_skin_menu.Visible != true && creation_clothes_menu.Visible != true && creation_barber_menu.Visible != true && creation_barber_menu_secondary.Visible != true && creation_clothes_menu_secondary.Visible != true && creation_surgery_menu.Visible != true && creation_surgery_menu_secondary.Visible != true)) {
        let newCamPos = new mp.Vector3(402.8837, -999.0696, -99);
        cam = mp.cameras.new('default', newCamPos, mp.players.local.rotation, 60);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else if (initiated == 0)
        initiateMenus();
    if (!res)
    {
        resolution = mp.game.graphics.getScreenResolution(0,0);
        if (resolution.x < 1920)
        {
            posX = resolution.x * 0.75;
            posY = resolution.y * 0.3;
        }
        res = true;
    }
});

mp.events.add('openHairMenuAfterNewCC', ( pickedFem = false ) => {

    let maximumValues = {};
    try {
        maximumValues = {
            'hair': mp.players.local.getNumberOfDrawableVariations(2),
            'facialhair': mp.game.ped.getNumHeadOverlayValues(1),
            'eyebrows': mp.game.ped.getNumHeadOverlayValues(2),
            'chesthair': mp.game.ped.getNumHeadOverlayValues(10)
        };
    }
    catch( e )
    {
        maximumValues = {};
    }

    mp.events.call( 'beginBarberCreation', true, pickedFem, maximumValues, [], [], true );

    /*
    var vec2 = new mp.Vector3(402.9837, -997.0, -98.2404);
    cam = mp.cameras.new('default', vec2, mp.players.local.rotation, 60);
    //cam.pointAtPedBone(mp.players.local, 12844, 0, 0, 0, true);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    onItemSelectSurgeryCreationMain(new UIMenuItem("~g~Confirm", ""), 0);
     */
});

mp.events.add('closeAllCustomizationMenu', () =>{
    closeAllMenus()
})


mp.events.add('updateNewCCTrackers', (slot, surgeries, appearances = false) => {

    var surgery = JSON.parse(surgeries);

    for( let i = 5; i <= 17; i = i + 2)
    {
        if( typeof surgery[i] === 'undefined' || surgery[i] == null ) continue;
        surgery[i] = parseInt( surgery[i] ) + 1;
        if( surgery[i] >= 255 ) surgery[i] = 0;
    }
    if(typeof surgery[39] === 'undefined' )
        surgery[39] = 0;
    if(typeof surgery[40] === 'undefined' )
        surgery[40] = 0;

    if(typeof surgery[41] === 'undefined' )
            surgery[41] = surgery[0];
        
    if(typeof surgery[42] === 'undefined' )
        surgery[42] = surgery[1];
    
    if(typeof surgery[43] === 'undefined' )
        surgery[43] = surgery[39];

    if(parseInt(surgery[41]) == -1)
        surgery[41] = surgery[0];
    
    if(parseInt(surgery[42]) == -1)
        surgery[42] = surgery[1];
    
    if(parseInt(surgery[43]) == -1)
        surgery[43] = surgery[39];

    tracker_blend_1 = parseInt(surgery[0]);
    tracker_blend_2 = parseInt(surgery[1]);
    tracker_blend_3 = parseInt(surgery[39]);
    tracker_blend_mix = parseInt(surgery[2]);
    tracker_skin_mix = parseInt(surgery[3]);
    tracker_skinblend_mix = parseInt(surgery[40]);
    tracker_eye_color = parseInt(surgery[4]);
    tracker_blemishes = parseInt(surgery[5]);
    tracker_blemishes_opacity = parseInt(surgery[6]);
    tracker_ageing = parseInt(surgery[7]);
    tracker_ageing_opacity = parseInt(surgery[8]);
    tracker_complexion = parseInt(surgery[9]);
    tracker_complexion_opacity = parseInt(surgery[10]);
    tracker_sun_damage = parseInt(surgery[11]);
    tracker_sun_damage_opacity = parseInt(surgery[12]);
    tracker_moles = parseInt(surgery[13]);
    tracker_moles_opacity = parseInt(surgery[14]);
    tracker_body_blemishes = parseInt(surgery[15]);
    tracker_body_blemishes_opacity = parseInt(surgery[16]);
    tracker_add_body_blemish = parseInt(surgery[17]);
    tracker_add_body_blemish_opacity = parseInt(surgery[18]);
    tracker_nose_width = parseInt(surgery[19]);
    tracker_nose_vertical = parseInt(surgery[20]);
    tracker_nose_horizontal = parseInt(surgery[21]);
    tracker_nose_curve = parseInt(surgery[22]);
    tracker_nose_point = parseInt(surgery[23]);
    tracker_nose_bend = parseInt(surgery[24]);
    tracker_eyebrow_vertical = parseInt(surgery[25]);
    tracker_eyebrow_horizontal = parseInt(surgery[26]);
    tracker_malar_vertical = parseInt(surgery[27]);
    tracker_malar_horizontal = parseInt(surgery[28]);
    tracker_cheekbone_depth = parseInt(surgery[29]);
    tracker_squint = parseInt(surgery[30]);
    tracker_lip_size = parseInt(surgery[31]);
    tracker_jawline_vertical = parseInt(surgery[32]);
    tracker_jawline_horizontal = parseInt(surgery[33]);
    tracker_chin_size = parseInt(surgery[34]);
    tracker_chin_length = parseInt(surgery[35]);
    tracker_chin_width = parseInt(surgery[36]);
    tracker_chin_indent = parseInt(surgery[37]);
    tracker_skin_1 = parseInt(surgery[41]);
    tracker_skin_2 = parseInt(surgery[42]);
    tracker_skin_3 = parseInt(surgery[43]);

    if( typeof surgery[38] === 'undefined' )
    {
        tracker_neck_width = 0;
    }
    else
    {
        tracker_neck_width = parseInt(surgery[38]);
    }

    tracker_save_slot = slot;

    mp.events.call('initializeTrackersWithExistingData', null, surgery, slot);
});

}