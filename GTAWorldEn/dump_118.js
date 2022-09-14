{
exports = {

    firingModes : {
        Auto: 0,
        Burst: 1,
        Single: 2,
        Safe: 3
    },

    firingModeColor : {
        0: [240, 240, 240, 255],
        1: [176, 87, 4, 255],
        2: [240, 240, 240, 255],
        3: [175, 247, 250],
    },

    firingModeNames : ["AUTO", "BURST", "SEMI", "SAFE"],

    ignoredWeaponGroups : [
        mp.game.joaat("GROUP_UNARMED"), mp.game.joaat("GROUP_MELEE"), mp.game.joaat("GROUP_FIREEXTINGUISHER"), mp.game.joaat("GROUP_PARACHUTE"), mp.game.joaat("GROUP_STUNGUN"),
        mp.game.joaat("GROUP_THROWN"), mp.game.joaat("GROUP_PETROLCAN"), mp.game.joaat("GROUP_DIGISCANNER"), mp.game.joaat("GROUP_HEAVY")
    ],

    burstFireAllowedWeapons : [ ],
    burstFireAllowedGroups : [ ],


    singleFireBlacklist : [ 
        mp.game.joaat("WEAPON_STUNGUN"), mp.game.joaat("WEAPON_FLAREGUN"), mp.game.joaat("WEAPON_MARKSMANPISTOL"), mp.game.joaat("WEAPON_REVOLVER_MK2"),
        mp.game.joaat("WEAPON_DOUBLEACTION"), mp.game.joaat("WEAPON_PUMPSHOTGUN"), mp.game.joaat("WEAPON_PUMPSHOTGUN_MK2"), mp.game.joaat("WEAPON_SAWNOFFSHOTGUN"), mp.game.joaat("WEAPON_BULLPUPSHOTGUN"),
        mp.game.joaat("WEAPON_MUSKET"), mp.game.joaat("WEAPON_DBSHOTGUN"), mp.game.joaat("WEAPON_SNIPERRIFLE"), mp.game.joaat("WEAPON_HEAVYSNIPER"), mp.game.joaat("WEAPON_HEAVYSNIPER_MK2")
    ],

    singleFireForce : [
        mp.game.joaat("GROUP_PISTOL"), mp.game.joaat("GROUP_SNIPER"),
    ],

    isWeaponIgnored : function(weaponHash) {
        return this.ignoredWeaponGroups.indexOf(mp.game.weapon.getWeapontypeGroup(weaponHash)) > -1;
    },

    isBoltAction : function(weaponHash){
        return (mp.game.weapon.getWeapontypeGroup(weaponHash) == mp.game.joaat("GROUP_SNIPER"));
    },

    isPumpAction : function(weaponHash){
       return (mp.game.weapon.getWeapontypeGroup(weaponHash) == mp.game.joaat("GROUP_SHOTGUN") ? true : weaponHash == 0x4C91E93F);
    },

    canWeaponUseBurstFire : function(weaponHash) {
        return this.burstFireAllowedGroups.indexOf(mp.game.weapon.getWeapontypeGroup(weaponHash)) > -1 ? true : (this.burstFireAllowedWeapons.indexOf(weaponHash) > -1);
    },

    canWeaponUseSingleFire : function(weaponHash) {
        return this.singleFireBlacklist.indexOf(weaponHash) == -1;
    },

    isWeaponSingleFireOnly : function(weaponHash) {
        return mp.game.joaat("WEAPON_APPISTOL") !== weaponHash && this.singleFireForce.indexOf(mp.game.weapon.getWeapontypeGroup(weaponHash)) > -1 ? true : (this.singleFireForce.indexOf(weaponHash) > -1);
    },

    drawTextAligned : function(text, drawX, drawY, font, color, scale) {
try {        mp.game.ui.setTextEntry("STRING");
        mp.game.ui.addTextComponentSubstringPlayerName(text);
        mp.game.ui.setTextFont(font);
        mp.game.ui.setTextScale(scale, scale);
        mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
        mp.game.ui.setTextRightJustify(true);
        mp.game.ui.setTextWrap(0, drawX);
        mp.game.invoke("0x2513DFB0FB8400FE"); 
        mp.game.ui.drawText(drawX, drawY);
} catch (e) {}
    },

}
}