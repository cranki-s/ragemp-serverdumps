{
const REPLACE_PATTERN = /\u0000/g;

const Natives = {
    // FILES
    _GET_TATTOO_COLLECTION_DATA: "0xFF56381874F82086",
    GET_SHOP_PED_COMPONENT: "0x74C0E2A57EC66760",
    GET_SHOP_PED_PROP: "0x5D5CAFF661DDF6FC",
    GET_DLC_WEAPON_DATA: "0x79923CD21BECE14E",
    GET_DLC_WEAPON_COMPONENT_DATA: "0x6CF598A2957C2BF8",

    // PED
    GET_PED_HEAD_BLEND_DATA: "0x2746BD9D88C5C5D0",

    // WEAPON
    GET_WEAPON_HUD_STATS: "0xD92C739EE34C9EBA",
    GET_WEAPON_COMPONENT_HUD_STATS: "0xB3CAF387AE12E9F8"
};

function getString(buffer, offset, length = 64) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer, offset, length)).replace(REPLACE_PATTERN, "");
}

// Credits to TomGrobbe (https://github.com/TomGrobbe)
function getTattooCollectionData(characterType, decorationIndex) {
    let buffer = [ new ArrayBuffer(120) ];

    if (!mp.game.invoke(Natives._GET_TATTOO_COLLECTION_DATA, characterType, decorationIndex, buffer)) {
        return null;
    }

    const { 0: lockHash, 2: id, 4: collection, 6: preset, 8: cost, 10: eFacing, 12: updateGroup } = new Uint32Array(buffer[0]);

    return {
        lockHash,
        id,
        collection,
        preset,
        cost,
        eFacing,
        updateGroup,
        textLabel: getString(buffer[0], 56)
    };
}

function getShopPedComponent(componentHash) {
    let buffer = [ new ArrayBuffer(136) ];

    if (mp.game.invoke(Natives.GET_SHOP_PED_COMPONENT, componentHash >> 0, buffer) === 0) {
        return null;
    }

    const { 0: lockHash, 2: uniqueNameHash, 4: locate, 6: drawableIndex, 8: textureIndex, 10: unk1, 12: eCompType, 14: unk2, 16: unk3 } = new Uint32Array(buffer[0]);

    return {
        lockHash,
        uniqueNameHash,
        locate,
        drawableIndex,
        textureIndex,
        unk1,
        eCompType,
        unk2,
        unk3,
        textLabel: getString(buffer[0], 72)
    };
}

function getShopPedProp(propHash) {
    let buffer = [ new ArrayBuffer(136) ];

    if (mp.game.invoke(Natives.GET_SHOP_PED_PROP, propHash >> 0, buffer) === 0) {
        return null;
    }

    const { 0: lockHash, 2: uniqueNameHash, 4: locate, 6: propIndex, 8: textureIndex, 10: unk1, 12: eAnchorPoint, 14: unk2, 16: unk3 } = new Uint32Array(buffer[0]);

    return {
        lockHash,
        uniqueNameHash,
        locate,
        propIndex,
        textureIndex,
        unk1,
        eAnchorPoint,
        unk2,
        unk3,
        textLabel: getString(buffer[0], 72)
    };
}

function getPedHeadBlendData(entityOrHandle) {
    let buffer = [ new ArrayBuffer(80) ];

    if (!mp.game.invoke(Natives.GET_PED_HEAD_BLEND_DATA, entityOrHandle.handle !== undefined ? entityOrHandle.handle : entityOrHandle, buffer)) {
        return null;
    }

    const {
        0: shapeFirstId, 2: shapeSecondId, 4: shapeThirdId,
        6: skinFirstId, 8: skinSecondId, 10: skinThirdId,
        18: isParent
    } = new Uint32Array(buffer[0]);

    const { 0: shapeMix, 2: skinMix, 4: thirdMix } = new Float32Array(buffer[0], 48);

    return {
        shapeFirstId, shapeSecondId, shapeThirdId,
        skinFirstId, skinSecondId, skinThirdId,
        shapeMix, skinMix, thirdMix,
        isParent: Boolean(isParent)
    };
}

function getWeaponHudStats(weaponHash) {
    let buffer = [ new ArrayBuffer(40) ];

    if (!mp.game.invoke(Natives.GET_WEAPON_HUD_STATS, weaponHash >> 0, buffer)) {
        return null;
    }

    const { 0: hudDamage, 2: hudSpeed, 4: hudCapacity, 6: hudAccuracy, 8: hudRange } = new Uint32Array(buffer[0]);
    return { hudDamage, hudSpeed, hudCapacity, hudAccuracy, hudRange };
}

function getWeaponComponentHudStats(componentHash) {
    let buffer = [ new ArrayBuffer(40) ];

    if (!mp.game.invoke(Natives.GET_WEAPON_COMPONENT_HUD_STATS, componentHash >> 0, buffer)) {
        return null;
    }

    const { 0: hudDamage, 2: hudSpeed, 4: hudCapacity, 6: hudAccuracy, 8: hudRange } = new Uint32Array(buffer[0]);
    return { hudDamage, hudSpeed, hudCapacity, hudAccuracy, hudRange };
}

function getDlcWeaponData(dlcWeaponIndex) {
    let buffer = [ new ArrayBuffer(312) ];

    if (!mp.game.invoke(Natives.GET_DLC_WEAPON_DATA, dlcWeaponIndex, buffer)) {
        return null;
    }

    const { 0: lockHash, 2: weaponHash, 4: weaponHash2, 6: cost, 8: ammoCost, 10: ammoType, 12: defaultClipSize } = new Uint32Array(buffer[0]);

    return {
        lockHash,
        weaponHash,
        weaponHash2,
        cost,
        ammoCost,
        ammoType,
        defaultClipSize,
        textLabel: getString(buffer[0], 56),
        weaponDesc: getString(buffer[0], 120),
        weaponTT: getString(buffer[0], 184),
        weaponUppercase: getString(buffer[0], 248)
    };
}

function getDlcWeaponComponentData(dlcWeaponIndex, dlcWeaponComponentIndex) {
    let buffer = [ new ArrayBuffer(176) ];

    if (!mp.game.invoke(Natives.GET_DLC_WEAPON_COMPONENT_DATA, dlcWeaponIndex, dlcWeaponComponentIndex, buffer)) {
        return null;
    }

    const { 0: attachBone, 2: isDefault, 4: lockHash, 6: componentHash, 8: unk, 10: cost } = new Uint32Array(buffer[0]);

    return {
        attachBone,
        isDefault,
        lockHash,
        componentHash,
        unk,
        cost,
        textLabel: getString(buffer[0], 48),
        componentDesc: getString(buffer[0], 112)
    };
}

// Define mp.game.data
mp.game.data = {
    getTattooCollectionData,
    getShopPedComponent,
    getShopPedProp,
    getPedHeadBlendData,
    getWeaponHudStats,
    getWeaponComponentHudStats,
    getDlcWeaponData,
    getDlcWeaponComponentData
};
}