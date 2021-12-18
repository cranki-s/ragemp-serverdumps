{
var charCef = null;
var camera;

mp.events.add('Client:Charcreator:openCreator', () => {
    if (charCef == null) {
        camera = mp.cameras.new('default', new mp.Vector3(-1575.0711, -34.0608, 58.0140), new mp.Vector3(0, 0.0, 0.0), 20);
        camera.pointAtCoord(-1580.912, -34.1247, 58.0610);
        camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        charCef = mp.browsers.new('package://cef/creator/index.html');
        let languageValue = mp.storage.data.language,
            language = "en";
        if (languageValue == undefined)
            language = "en";
        else language = languageValue;
        mp.gui.cursor.visible = true;
        mp.players.local.freezePosition(true);
        setTimeout(() => {
            charCef.execute(`setLanguage('${language}');`);
        }, 50);
    }
});

mp.events.add('Client:Charcreator:destroy', () => {
    if (charCef != null) {
        charCef.destroy();
        charCef = null;
        mp.gui.cursor.visible = false;
        mp.players.local.freezePosition(false);
        if (camera != null) {
            camera.setActive(false);
        }
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
});

mp.events.add('Client:Charcreator:FinishCreator', () => {
    mp.events.callRemote("Server:Charcreator:FinishCreator");
});

mp.events.add('Client:Charcreator:CancelCreator', () => {
    mp.events.callRemote("Server:Charcreator:CancelCreator");
});


mp.events.add('Client:Charcreator:changeHair', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeHair", indexname, parseInt(id));
});

mp.events.add('Client:Charcreator:changeBeard', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeBeard", indexname, id);
});
mp.events.add('Client:Charcreator:changeEyeBrows', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeEyeBrows", indexname, id);
});
mp.events.add('Client:Charcreator:changeChest', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeChest", indexname, id);
});

mp.events.add('Client:Charcreator:ChangeGender', (GenderID) => {
    mp.events.callRemote("Server:Charcreator:ChangeGender", parseInt(GenderID));
});
mp.events.add('Client:Charcreator:changeHead', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeHead", indexname, id);
});
mp.events.add('Client:Charcreator:changeBlush', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeBlush", indexname, id);
});
mp.events.add('Client:Charcreator:changeMakeUp', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeMakeUp", indexname, id);
});
mp.events.add('Client:Charcreator:changeLipstick', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeLipstick", indexname, id);
});
mp.events.add('Client:Charcreator:changeBlemishes', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeBlemishes", indexname, id);
});
mp.events.add('Client:Charcreator:changeAgeing', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeAgeing", indexname, id);
});
mp.events.add('Client:Charcreator:changeComplexion', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeComplexion", indexname, id);
});
mp.events.add('Client:Charcreator:changeSunDamage', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeSunDamage", indexname, id);
});
mp.events.add('Client:Charcreator:changeMoles', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeMoles", indexname, id);
});
mp.events.add('Client:Charcreator:changeFace', (indexname, valueid) => {
    mp.events.callRemote("Server:Charcreator:changeFace", indexname, valueid);
});
mp.events.add('Client:Charcreator:changeEyeColor', (indexname, id) => {
    mp.events.callRemote("Server:Charcreator:changeEyeColor", indexname, id);
});
}