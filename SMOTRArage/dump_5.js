{

let stateName = ['Position', 'Rotation'];

let editObject = null;
let editState = 0;
let objInfo = { object: '', body: 0, x: 0.0, y: 0.0, z: 0.0, rx: 0.0, ry: 0.0, rz: 0.0 };

function attacher(object, bodyPart) {
    if(editObject != null) {
        mp.gui.chat.push("You are already editting an object!");
        return;
    }

    editObject = mp.objects.new(object, localPlayer.position, {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: localPlayer.dimension
    });

    editState = 0;

    objInfo.object = object;
    objInfo.x = 0.0;
    objInfo.y = 0.0;
    objInfo.z = 0.0;
    objInfo.rx = 0.0;
    objInfo.ry = 0.0;
    objInfo.rz = 0.0;

    setTimeout(function() {

        objInfo.body = localPlayer.getBoneIndex(bodyPart);
        editObject.attachTo(localPlayer.handle, objInfo.body, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, false, false, false, 2, true);
    
    }, 200);
};

mp.events.add('render', () => {
    if(editObject == null) return;

    let msg = 'Editting: ~y~' +stateName[editState];

    mp.game.graphics.drawText(msg, [0.8, 0.40],
    {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.7, 0.7],
        outline: true
    });

    //

    msg = 'UP: ~g~+X~w~ | DOWN: ~g~-X~w~\nRIGHT: ~g~+Y~w~ | LEFT: ~g~-Y~w~\nPAGE UP: ~g~+Z~w~ | PAGE DOWN: ~g~-Z~w~';

    mp.game.graphics.drawText(msg, [0.8, 0.5],
    {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.7, 0.7],
        outline: true
    });

    //

    let change = (editState == 0) ? ('rot') : ('pos');
    msg = 'Change to ' +change+ ': ~g~ALT~w~\nFinish: ~r~SPACE BAR';

    mp.game.graphics.drawText(msg, [0.8, 0.65],
    {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.7, 0.7],
        outline: true
    });
});

// KEYS

var keyState = false;
var keyPressed = null;
var keyIterval = null;

mp.keys.bind(0x68, true, function() { // UP

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 0; }
    else { keyPressed = 6; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x68, false, function() { // UP
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0x62, true, function() { // DOWN

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 1; }
    else { keyPressed = 7; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x62, false, function() { // DOWN
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0x66, true, function() { // RIGHT

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 2; }
    else { keyPressed = 8; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x66, false, function() { // RIGHT
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0x64, true, function() { // LEFT

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 3; }
    else { keyPressed = 9; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x64, false, function() { // LEFT
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0x21, true, function() { // PAGE UP

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 4; }
    else { keyPressed = 10; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x21, false, function() { // PAGE UP
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0x22, true, function() { // PAGE DOWN

    if(editObject == null || keyState == true || mp.gui.cursor.visible) return;

    keyState = true;
    
    if(editState == 0) { keyPressed = 5; }
    else { keyPressed = 11; }

    editAttachObject();
    keyIterval = setInterval(editAttachObject, 100);
});

mp.keys.bind(0x22, false, function() { // PAGE DOWN
    if(editObject == null) return;

    keyState = false;
    clearInterval(keyIterval);
});

mp.keys.bind(0X12, !1, function() { // ALT

    if(editObject == null || mp.gui.cursor.visible) return;

    editState = (editState == 0) ? (1) : (0);
});

mp.keys.bind(0x20, !1, function() { // SPACE

    if(editObject == null || mp.gui.cursor.visible) return;

	chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * "+JSON.stringify(objInfo)+"</span>");

    editObject.destroy();
    editObject = null;
});

//

function editAttachObject() {

    // POSITION

    if(keyPressed == 0) { objInfo.x += 0.01; }
    else if(keyPressed == 1) { objInfo.x -= 0.01; }
    else if(keyPressed == 2) { objInfo.y += 0.01; }
    else if(keyPressed == 3) { objInfo.y -= 0.01; }
    else if(keyPressed == 4) { objInfo.z += 0.01; }
    else if(keyPressed == 5) { objInfo.z -= 0.01; }

    // ROTATION

    else if(keyPressed == 6) { objInfo.rx += 1.0; }
    else if(keyPressed == 7) { objInfo.rx -= 1.0; }
    else if(keyPressed == 8) { objInfo.ry += 1.0; }
    else if(keyPressed == 9) { objInfo.ry -= 1.0; }
    else if(keyPressed == 10) { objInfo.rz += 1.0; }
    else if(keyPressed == 11) { objInfo.rz -= 1.0; }

    editObject.attachTo(
        localPlayer.handle,
        objInfo.body,
        objInfo.x,
        objInfo.y,
        objInfo.z,
        objInfo.rx,
        objInfo.ry,
        objInfo.rz,
        true,
        false,
        false,
        false,
        2,
        true
    );
}
}