{
let armyClothesMenu = global.ConstrolsBrowser;
var armyClothesMenuWindow = null;
var armyClothesMenuOpened = false;
let ClothesMenuType;
let bodyCam;
const playerheading = require("/lib/back/js/rotatorplayer.js");
mp.events.add('openArmyClothesMenu', (data,type) => {   
    armyClothesMenu.execute(`window.locale ='${global.Language}'`)
    armyClothesMenu.execute(`openInterface('form')`);
    armyClothesMenu.execute(`controls.openForm(${data})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    ClothesMenuType = type;
    playerheading.startveh(mp.players.local);
    let bodyCamStart = mp.players.local.position;
    var camValues = { Angle: mp.players.local.getRotation(2).z + 90, Dist: 2.3, Height: -0.1 };
    var pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
});
mp.events.add('Form:SetActive',armyClothID=>{ 
    if (ClothesMenuType == 0) {
        Nexus.callRemote('selectArmyClothID', +armyClothID);
    } else if (ClothesMenuType == 1) {
        Nexus.callRemote('selectFibClothID', +armyClothID);
    }
    else if (ClothesMenuType == 2) {
        Nexus.callRemote('SelectPoliceClothes', +armyClothID);
    }
    else if (ClothesMenuType == 3) {
        Nexus.callRemote('SelectGovClothes', +armyClothID);
    }
    else if (ClothesMenuType == 4) {
        Nexus.callRemote('selectEmsClothID', +armyClothID);
    }
});

mp.events.add('Form:DestroyBrowser', () => {
    Nexus.callRemote('DestroyDimension') 
    armyClothesMenu.execute(`closeInterface()`);
    playerheading.stop()
    global.menuOpened = false;
    mp.gui.cursor.visible = false; 
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
});
}