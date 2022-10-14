{
var WeaponEditorDOM;
var WeaponEditorCamera;

var editor_MoveFromCam;

const editorCoords = {
    camera: new mp.Vector3(460.24365, -981.17096, 31.161589),
    cameraRotation: new mp.Vector3(0, 0, -90),
};
const localPlayer = mp.players.local;

function InitializeWeaponEditor(){
    WeaponEditorDOM = mp.browsers.new("package://weaponeditor/index.html");
    WeaponEditorDOM.active = false;
}

function moveCam(x, y, z, rx, ry, rz, time, newviewangle){
    traceLastFunc(`[Players] Move Cam`);
    if(!WeaponEditorCamera) return;
    if(editor_MoveFromCam != null){
        editor_MoveFromCam.setActive(false);
        editor_MoveFromCam.destroy();
        editor_MoveFromCam = null;
    }
    editor_MoveFromCam = mp.cameras.new("MoveFromCam", WeaponEditorCamera.getCoord(), WeaponEditorCamera.getRot(2), WeaponEditorCamera.getFov());

    setTimeout(() => {
        WeaponEditorCamera.setCoord(x, y, z);
        WeaponEditorCamera.setRot(rx, ry, rz, 2);
        WeaponEditorCamera.setFov(newviewangle);
        WeaponEditorCamera.setActiveWithInterp(editor_MoveFromCam.handle, time, 1, 1);
    }, 100);
    
}

mp.events.add("WeaponEditor:exit", () => {
    WeaponEditorActive = false;
    WeaponEditorDOM.execute(`resetWeaponEditor();`);
    mp.events.callRemote("WeaponEditor:onExit");

    WeaponEditorDOM.active = false;
    ServerUI.execute(`gm.$refs.hud.enabled = ${mp.storage.data.menu.HUD.toString()};`);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.clearTasksImmediately();
    mp.players.local.setAlpha(255);
    mp.players.local.freezePosition(false);
    mp.gui.cursor.show(false, false);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    if(WeaponEditorCamera != null){
      WeaponEditorCamera.setActive(false);
      WeaponEditorCamera.destroy();
      WeaponEditorCamera = null;
    }
    if(editor_MoveFromCam != null){
      editor_MoveFromCam.setActive(false);
      editor_MoveFromCam.destroy();
      editor_MoveFromCam = null;
  }
});

mp.events.add("WeaponEditor:playSound", (type) => {
  switch(type){
    case "back":
    mp.game.audio.playSoundFrontend(-1, 'BACK', 'HUD_FREEMODE_SOUNDSET', true);
    break;
    case "select":
    mp.game.audio.playSoundFrontend(-1, 'Apt_Style_Purchase', 'DLC_APT_Apartment_SoundSet', true);   
    break;
    case "buy":
    mp.game.audio.playSoundFrontend(-1, 'PICKUP_WEAPON_SMOKEGRENADE', 'HUD_FRONTEND_WEAPONS_PICKUPS_SOUNDSET', true);
    break;
    case "sell":
    mp.game.audio.playSoundFrontend(-1, 'PICK_UP_WEAPON', 'HUD_FRONTEND_CUSTOM_SOUNDSET', true);
    break;
    default: break;
  }
});

mp.events.add("WeaponEditor:show", () => {
    mp.events.callRemote("WeaponEditor:onOpen");
    WeaponEditorActive = true;
    ServerUI.execute(`gm.$refs.hud.enabled = false;`);
    mp.players.local.setAlpha(0);
    mp.players.local.freezePosition(true);
    mp.players.local.clearTasksImmediately();
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    if (WeaponEditorCamera === undefined || WeaponEditorCamera === null) {
        WeaponEditorCamera = mp.cameras.new("weaponEditorCamera", editorCoords.camera, editorCoords.cameraRotation, 30);
    }
    WeaponEditorCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    WeaponEditorDOM.active = true;
    mp.gui.cursor.show(true, true);

    mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
});
mp.events.add("WeaponEditor:requestComponentList", (hash, type) => {
    let newviewangle = 30;
    if(type == "Sniper Rifles"){
        newviewangle = 40;
    }
    else if(type == "Machine Guns"){
        newviewangle = 35;
    }
    else if(type == "Handguns"){
        newviewangle = 20;
    }
    else newviewangle = 30;

    moveCam(editorCoords.camera.x, editorCoords.camera.y, editorCoords.camera.z, editorCoords.cameraRotation.x, 
        editorCoords.cameraRotation.y, editorCoords.cameraRotation.z, 1000, newviewangle);

    // SET_CURRENT_PED_WEAPON(Ped ped, Hash weaponHash, BOOL equipNow)
    mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
    mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, hash, true);

    mp.events.callRemote("WeaponEditor:onRequestComponentList", hash);
});
mp.events.add("WeaponEditor:requestAttachmentPreview", (atthash) => {
    mp.events.callRemote("WeaponEditor:onRequestAttachmentPreview", atthash);
});
mp.events.add("WeaponEditor:removePreviewAttachment", (wephash, comphash) => {
    let realHash = wephash;
    mp.game.invoke('0x1E8BE90C74FB4C09', mp.players.local.handle, (realHash)>>0, (comphash)>>0);

    setTimeout(() => {
        mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
        mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (realHash)>>0, true);
        mp.game.invoke('0x1E8BE90C74FB4C09', mp.players.local.handle, (realHash)>>0, (comphash)>>0);
    }, 100);
    setTimeout(() => {
        mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
        mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (realHash)>>0, true);
    }, 500);
});

mp.events.add("WeaponEditor:sendAttachmentPreview", () => {
    // SET_CURRENT_PED_WEAPON(Ped ped, Hash weaponHash, BOOL equipNow)
    let hash = mp.players.local.weapon;
    setTimeout(() => {
      mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
      mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (hash)>>0, true);
    }, 100);
    // just in case setting the weapon again cuz sometimes the shit bugs idk
    setTimeout(() => {
      mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
      mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (hash)>>0, true);
    }, 500);
});
mp.events.add("WeaponEditor:sendComponentList", (data) => {
    let hash = mp.players.local.weapon;
    setTimeout(() => {
      mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
      mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (hash)>>0, true);
    }, 100);
    setTimeout(() => {
      mp.players.local.taskPlayAnim("weapons@pistol@stealth", "aim_med_loop", 10.0, 1.0, -1, 1, 1.0, false, false, false); 
      mp.game.invoke('0xADF692B254977C0C', mp.players.local.handle, (hash)>>0, true);
    }, 500);
    WeaponEditorDOM.execute(`setComponentList(${data})`);
});
mp.events.add("WeaponEditor:requestAttachmentPurchase", (comphash, price) => {
    mp.events.callRemote("WeaponEditor:onRequestPurchaseAttachment", comphash, price);
});
mp.events.add("WeaponEditor:requestAttachmentRemove", (comphash, price) => {
  mp.events.callRemote("WeaponEditor:onRequestRemoveAttachment", comphash, price);
});
mp.events.add("WeaponEditor:sendPurchaseResponse", (comphash) => {
    WeaponEditorDOM.execute(`setAttachmentPurchased('${comphash}', true)`);
});
mp.events.add("WeaponEditor:sendRemoveResponse", (comphash) => {  
  WeaponEditorDOM.execute(`setAttachmentPurchased('${comphash}', false)`);
});



// i cba to fuck with these export/import shits right now just gonna put it here im tired its 3AM
const weaponData = [
  {
    "id": "weapon_dagger",
    "name": "Antique Cavalry Dagger",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Antique-cavalry-dagger-icon.png",
    "hash": "0x92A27487"
  },
  {
    "id": "weapon_bat",
    "name": "Baseball Bat",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Baseball-bat-icon.png",
    "hash": "0x958A4A8F"
  },
  {
    "id": "weapon_bottle",
    "name": "Broken Bottle",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Broken-bottle-icon.png",
    "hash": "0xF9E6AA4B"
  },
  {
    "id": "weapon_crowbar",
    "name": "Crowbar",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Crowbar-icon.png",
    "hash": "0x84BD7BFD"
  },
  {
    "id": "weapon_unarmed",
    "name": "Fist",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Fist-icon.png",
    "hash": "0xA2719263"
  },
  {
    "id": "weapon_flashlight",
    "name": "Flashlight",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Flashlight-icon.png",
    "hash": "0x8BB05FD7"
  },
  {
    "id": "weapon_golfclub",
    "name": "Golf Club",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Golf-club-icon.png",
    "hash": "0x440E4788"
  },
  {
    "id": "weapon_hammer",
    "name": "Hammer",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Hammer-icon.png",
    "hash": "0x4E875F73"
  },
  {
    "id": "weapon_hatchet",
    "name": "Hatchet",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Hatchet-icon.png",
    "hash": "0xF9DCBF2D"
  },
  {
    "id": "weapon_knuckle",
    "name": "Brass Knuckles",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Knuckles-icon.png",
    "hash": "0xD8DF3C3C"
  },
  {
    "id": "weapon_knife",
    "name": "Knife",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Knife-icon.png",
    "hash": "0x99B507EA"
  },
  {
    "id": "weapon_machete",
    "name": "Machete",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Machete-icon.png",
    "hash": "0xDD5DF8D9"
  },
  {
    "id": "weapon_switchblade",
    "name": "Switchblade",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Switch-blade-icon.png",
    "hash": "0xDFE37640"
  },
  {
    "id": "weapon_nightstick",
    "name": "Nightstick",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Nightstick-icon.png",
    "hash": "0x678B81B1"
  },
  {
    "id": "weapon_wrench",
    "name": "Pipe Wrench",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Pipe-wrench-icon.png",
    "hash": "0x19044EE0"
  },
  {
    "id": "weapon_battleaxe",
    "name": "Battle Axe",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Battle-axe-icon.png",
    "hash": "0xCD274149"
  },
  {
    "id": "weapon_poolcue",
    "name": "Pool Cue",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Pool-cue-icon.png",
    "hash": "0x94117305"
  },
  {
    "id": "weapon_stone_hatchet",
    "name": "Stone Hatchet",
    "type": 0,
    "image": "https://assets.gm.miami/gtav/weapons/Stone-hatchet-icon.png",
    "hash": "0x3813FC08"
  },
  {
    "id": "weapon_pistol",
    "name": "Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Pistol-icon.png",
    "hash": "0x1B06D571"
  },
  {
    "id": "weapon_pistol_mk2",
    "name": "Pistol Mk II",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Pistol-mk2-icon.png",
    "hash": "0xBFE256D4"
  },
  {
    "id": "weapon_combatpistol",
    "name": "Combat Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Combat-pistol-icon.png",
    "hash": "0x5EF9FEC4"
  },
  {
    "id": "weapon_appistol",
    "name": "AP Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Appistol-icon.png",
    "hash": "0x22D8FE39"
  },
  {
    "id": "weapon_stungun",
    "name": "Stun Gun",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Stungun-icon.png",
    "hash": "0x3656C8C1"
  },
  {
    "id": "weapon_pistol50",
    "name": "Pistol .50",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Pistol.50-icon.png",
    "hash": "0x99AEEB3B"
  },
  {
    "id": "weapon_snspistol",
    "name": "SNS Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Sns-pistol-icon.png",
    "hash": "0xBFD21232"
  },
  {
    "id": "weapon_snspistol_mk2",
    "name": "SNS Pistol Mk II",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Sns-pistol-mk2-icon.png",
    "hash": "0x88374054"
  },
  {
    "id": "weapon_heavypistol",
    "name": "Heavy Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-pistol-icon.png",
    "hash": "0xD205520E"
  },
  {
    "id": "weapon_vintagepistol",
    "name": "Vintage Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Vintage-pistol-icon.png",
    "hash": "0x83839C4"
  },
  {
    "id": "weapon_flaregun",
    "name": "Flare Gun",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Flaregun-icon.png",
    "hash": "0x47757124"
  },
  {
    "id": "weapon_marksmanpistol",
    "name": "Marksman Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Marksman-pistol-icon.png",
    "hash": "0xDC4DB296"
  },
  {
    "id": "weapon_revolver",
    "name": "Heavy Revolver",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-revolver-icon.png",
    "hash": "0xC1B3C3D1"
  },
  {
    "id": "weapon_revolver_mk2",
    "name": "Heavy Revolver Mk II",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-revolver-mk2-icon.png",
    "hash": "0xCB96392F"
  },
  {
    "id": "weapon_doubleaction",
    "name": "Double Action Revolver",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Double-action-revolver-icon.png",
    "hash": "0x97EA20B8"
  },
  {
    "id": "weapon_raypistol",
    "name": "Up-n-Atomizer",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Up-n-atomizer-icon.png",
    "hash": "0xAF3696A1"
  },
  {
    "id": "weapon_ceramicpistol",
    "name": "Ceramic Pistol",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Ceramic-pistol-icon.png",
    "hash": "0x2B5EF5EC"
  },
  {
    "id": "weapon_navyrevolver",
    "name": "Navy Revolver",
    "type": 1,
    "image": "https://assets.gm.miami/gtav/weapons/Navy-revolver-icon.png",
    "hash": "0x917F6C8C"
  },
  {
    "id": "weapon_gadgetpistol",
    "name": "Perico Pistol",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Perico-pistol-icon.png",
    "hash": "0x57A4368C"
  },
  {
    "id": "weapon_stungun_mp",
    "name": "Stun Gun",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Stungun-icon.png",
    "hash": "0x45CD9CF3"
  },
  {
    "id": "weapon_microsmg",
    "name": "Micro SMG",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Micro-smg-icon.png",
    "hash": "0x13532244"
  },
  {
    "id": "weapon_smg",
    "name": "SMG",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Smg-icon.png",
    "hash": "0x2BE6766B"
  },
  {
    "id": "weapon_smg_mk2",
    "name": "SMG Mk II",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Smg-mk2-icon.png",
    "hash": "0x78A97CD0"
  },
  {
    "id": "weapon_assaultsmg",
    "name": "Assault SMG",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Assault-smg-icon.png",
    "hash": "0xEFE7E2DF"
  },
  {
    "id": "weapon_combatpdw",
    "name": "Combat PDW",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Combat-pdw-icon.png",
    "hash": "0x0A3D4D34"
  },
  {
    "id": "weapon_machinepistol",
    "name": "Machine Pistol",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Machine-pistol-icon.png",
    "hash": "0xDB1AA450"
  },
  {
    "id": "weapon_minismg",
    "name": "Mini SMG",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Mini-smg-icon.png",
    "hash": "0xBD248B55"
  },
  {
    "id": "weapon_raycarbine",
    "name": "Unholy Hellbringer",
    "type": 2,
    "image": "https://assets.gm.miami/gtav/weapons/Unholy-hellbringer-icon.png",
    "hash": "0x476BF155"
  },
  {
    "id": "weapon_pumpshotgun",
    "name": "Pump Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Pump-shotgun-icon.png",
    "hash": "0x1D073A89"
  },
  {
    "id": "weapon_pumpshotgun_mk2",
    "name": "Pump Shotgun Mk II",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Pump-shotgun-mk2-icon.png",
    "hash": "0x555AF99A"
  },
  {
    "id": "weapon_sawnoffshotgun",
    "name": "Sawed-Off Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Sawed-off-shotgun-icon.png",
    "hash": "0x7846A318"
  },
  {
    "id": "weapon_assaultshotgun",
    "name": "Assault Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Assault-shotgun-icon.png",
    "hash": "0xE284C527"
  },
  {
    "id": "weapon_bullpupshotgun",
    "name": "Bullpup Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Bullpup-shotgun-icon.png",
    "hash": "0x9D61E50F"
  },
  {
    "id": "weapon_musket",
    "name": "Musket",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Musket-icon.png",
    "hash": "0xA89CB99E"
  },
  {
    "id": "weapon_heavyshotgun",
    "name": "Heavy Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-shotgun-icon.png",
    "hash": "0x3AABBBAA"
  },
  {
    "id": "weapon_dbshotgun",
    "name": "Double Barrel Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Double-barrel-shotgun-icon.png",
    "hash": "0xEF951FBB"
  },
  {
    "id": "weapon_autoshotgun",
    "name": "Sweeper Shotgun",
    "type": 3,
    "image": "https://assets.gm.miami/gtav/weapons/Sweeper-shotgun-icon.png",
    "hash": "0x12E82D3D"
  },
  {
    "id": "weapon_combatshotgun",
    "name": "Combat Shotgun",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Combat-shotgun-icon.png",
    "hash": "0x5A96BA4"
  },
  {
    "id": "weapon_assaultrifle",
    "name": "Assault Rifle",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Assault-rifle-icon.png",
    "hash": "0xBFEFFF6D"
  },
  {
    "id": "weapon_assaultrifle_mk2",
    "name": "Assault Rifle Mk II",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Assault-rifle-mk2-icon.png",
    "hash": "0x394F415C"
  },
  {
    "id": "weapon_carbinerifle",
    "name": "Carbine Rifle",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Carbine-rifle-icon.png",
    "hash": "0x83BF0278"
  },
  {
    "id": "weapon_carbinerifle_mk2",
    "name": "Carbine Rifle Mk II",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Carbine-rifle-mk2-icon.png",
    "hash": "0xFAD1F1C9"
  },
  {
    "id": "weapon_advancedrifle",
    "name": "Advanced Rifle",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Advanced-rifle-icon.png",
    "hash": "0xAF113F99"
  },
  {
    "id": "weapon_specialcarbine",
    "name": "Special Carbine",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Special-carbine-icon.png",
    "hash": "0xC0A3098D"
  },
  {
    "id": "weapon_specialcarbine_mk2",
    "name": "Special Carbine Mk II",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Special-carbine-mk2-icon.png",
    "hash": "0x969C3D67"
  },
  {
    "id": "weapon_bullpuprifle",
    "name": "Bullpup Rifle",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Bullpup-rifle-icon.png",
    "hash": "0x7F229F94"
  },
  {
    "id": "weapon_bullpuprifle_mk2",
    "name": "Bullpup Rifle Mk II",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Bullpup-rifle-mk2-icon.png",
    "hash": "0x84D6FAFD"
  },
  {
    "id": "weapon_compactrifle",
    "name": "Compact Rifle",
    "type": 4,
    "image": "https://assets.gm.miami/gtav/weapons/Compact-rifle-icon.png",
    "hash": "0x624FE830"
  },
  {
    "id": "weapon_militaryrifle",
    "name": "Military Rifle",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Military-rifle-icon.png",
    "hash": "0x9D1F17E6"
  },
  {
    "id": "weapon_heavyrifle",
    "name": "Heavy Rifle",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-rifle-icon.png",
    "hash": "0xC78D71B4"
  },
  {
    "id": "weapon_tacticalrifle",
    "name": "Tactical Rifle",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Tactical-rifle-icon.png",
    "hash": "0xD1D5F52B"
  },
  {
    "id": "weapon_mg",
    "name": "MG",
    "type": 5,
    "image": "https://assets.gm.miami/gtav/weapons/Mg-icon.png",
    "hash": "0x9D07F764"
  },
  {
    "id": "weapon_combatmg",
    "name": "Combat MG",
    "type": 5,
    "image": "https://assets.gm.miami/gtav/weapons/Combat-mg-icon.png",
    "hash": "0x7FD62962"
  },
  {
    "id": "weapon_combatmg_mk2",
    "name": "Combat MG Mk II",
    "type": 5,
    "image": "https://assets.gm.miami/gtav/weapons/Combat-mg-mk2-icon.png",
    "hash": "0xDBBD7280"
  },
  {
    "id": "weapon_gusenberg",
    "name": "Gusenberg Sweeper",
    "type": 5,
    "image": "https://assets.gm.miami/gtav/weapons/Gusenberg-sweeper-icon.png",
    "hash": "0x61012683"
  },
  {
    "id": "weapon_sniperrifle",
    "name": "Sniper Rifle",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Sniper-rifle-icon.png",
    "hash": "0x05FC3C11"
  },
  {
    "id": "weapon_heavysniper",
    "name": "Heavy Sniper",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-sniper-icon.png",
    "hash": "0x0C472FE2"
  },
  {
    "id": "weapon_heavysniper_mk2",
    "name": "Heavy Sniper Mk II",
    "type": 6,
    "image": "https://assets.gm.miami/gtav/weapons/Heavy-sniper-mk2-icon.png",
    "hash": "0xA914799"
  },
  {
    "id": "weapon_marksmanrifle",
    "name": "Marksman Rifle",
    "type": 6,
    "image": "https://assets.gm.miami/gtav/weapons/Marksman-rifle-icon.png",
    "hash": "0xC734385A"
  },
  {
    "id": "weapon_marksmanrifle_mk2",
    "name": "Marksman Rifle Mk II",
    "type": 6,
    "image": "https://assets.gm.miami/gtav/weapons/Marksman-rifle-mk2-icon.png",
    "hash": "0x6A6C02E0"
  },
  {
    "id": "weapon_precisionrifle",
    "name": "Precision Rifle",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Precision-rifle-icon.png",
    "hash": "0x6E7DDDEC"
  },
  {
    "id": "weapon_rpg",
    "name": "RPG",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Rocket-launcher-icon.png",
    "hash": "0xB1CA77B1"
  },
  {
    "id": "weapon_grenadelauncher",
    "name": "Grenade Launcher",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Grenade-launcher-icon.png",
    "hash": "0xA284510B"
  },
  {
    "id": "weapon_grenadelauncher_smoke",
    "name": "Grenade Launcher Smoke",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Grenade-launcher-icon.png",
    "hash": "0x4DD2DC56"
  },
  {
    "id": "weapon_minigun",
    "name": "Minigun",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Minigun-icon.png",
    "hash": "0x42BF8A85"
  },
  {
    "id": "weapon_firework",
    "name": "Firework Launcher",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Firework-launcher-icon.png",
    "hash": "0x7F7497E5"
  },
  {
    "id": "weapon_railgun",
    "name": "Railgun",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Railgun-icon.png",
    "hash": "0x6D544C99"
  },
  {
    "id": "weapon_hominglauncher",
    "name": "Homing Launcher",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Homing-launcher-icon.png",
    "hash": "0x63AB0442"
  },
  {
    "id": "weapon_compactlauncher",
    "name": "Compact Grenade Launcher",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Grenade-compact-launcher-icon.png",
    "hash": "0x0781FE4A"
  },
  {
    "id": "weapon_rayminigun",
    "name": "Widowmaker",
    "type": 7,
    "image": "https://assets.gm.miami/gtav/weapons/Widowmaker-icon.png",
    "hash": "0xB62D1F67"
  },
  {
    "id": "weapon_emplauncher",
    "name": "Compact EMP Launcher",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/EMP-launcher-icon.png",
    "hash": "0xDB26713A"
  },
  {
    "id": "weapon_grenade",
    "name": "Grenade",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Grenade-icon.png",
    "hash": "0x93E220BD"
  },
  {
    "id": "weapon_bzgas",
    "name": "BZ Gas",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Bz-gas-icon.png",
    "hash": "0xA0973D5E"
  },
  {
    "id": "weapon_molotov",
    "name": "Molotov Cocktail",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Molotov-icon.png",
    "hash": "0x24B17070"
  },
  {
    "id": "weapon_stickybomb",
    "name": "Sticky Bomb",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Sticky-bomb-icon.png",
    "hash": "0x2C3731D9"
  },
  {
    "id": "weapon_proxmine",
    "name": "Proximity Mines",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Proximity-mines-icon.png",
    "hash": "0xAB564B93"
  },
  {
    "id": "weapon_snowball",
    "name": "Snowballs",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Snowball-icon.png",
    "hash": "0x787F0BB"
  },
  {
    "id": "weapon_pipebomb",
    "name": "Pipe Bombs",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Pipe-bomb-icon.png",
    "hash": "0xBA45E8B8"
  },
  {
    "id": "weapon_ball",
    "name": "Baseball",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Ball-icon.png",
    "hash": "0x23C9F95C"
  },
  {
    "id": "weapon_smokegrenade",
    "name": "Tear Gas",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Tear-gas-icon.png",
    "hash": "0xFDBC8A50"
  },
  {
    "id": "weapon_flare",
    "name": "Flare",
    "type": 8,
    "image": "https://assets.gm.miami/gtav/weapons/Flare-icon.png",
    "hash": "0x497FACC3"
  },
  {
    "id": "weapon_petrolcan",
    "name": "Jerry Can",
    "type": 9,
    "image": "https://assets.gm.miami/gtav/weapons/Petrolcan-icon.png",
    "hash": "0x34A67B97"
  },
  {
    "id": "gadget_parachute",
    "name": "Parachute",
    "type": 9,
    "image": "https://assets.gm.miami/gtav/weapons/Parachute-icon.png",
    "hash": "0xFBAB5776"
  },
  {
    "id": "weapon_fireextinguisher",
    "name": "Fire Extinguisher",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Fire2.png",
    "hash": "0x060EC506"
  },
  {
    "id": "weapon_hazardcan",
    "name": "Hazardous Jerry Can",
    "type": 9,
    "image": "https://assets.gm.miami/gtav/weapons/Petrolcan-icon.png",
    "hash": "0xBA536372"
  },
  {
    "id": "weapon_fertilizercan",
    "name": "Fertilizer Can",
    "type": -1,
    "image": "https://assets.gm.miami/gtav/weapons/Petrolcan-icon.png",
    "hash": "0x184140A1"
  }
]

}