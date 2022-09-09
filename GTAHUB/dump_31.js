{
let Keys = {
	Up: 0x26,
	Down: 0x28,
	Left: 0x25,
	Right: 0x27,
	Space: 0x20,
	Alt: 0x12,
	Shift: 16,
	G: 0x47, // reset rotation
	Enter: 0x0D,
	Backspace: 0x08
};

let skyObj = null;
let skyCam = null;
let itemIndex = 0;
let lastFrameMs = 0;
let currentZoom = 0;
let objOffset = new mp.Vector3(0, 0, 0);
let skyPosition = new mp.Vector3(0, 0, 500);

function changeZoom(difference) {
    currentZoom = currentZoom - difference;
    skyObj.position = new mp.Vector3(skyPosition.x + objOffset.x, skyPosition.y + currentZoom, skyPosition.z + objOffset.z);
}

mp.rpc("skycam:set", (index, model, initialZoom, initialRotationJson, initialOffsetJson) => {
    if (skyObj) skyObj.destroy();
    if (skyCam) skyCam.destroy();

    skyObj = mp.objects.new(model, skyPosition, { dimension: -1 });
    if (!skyObj) {
        mp.game.graphics.notify('invalid model ' + model + ".");
        return;
    }

    mp.game.ui.displayRadar(false);

    skyCam = mp.cameras.new('default', new mp.Vector3(skyPosition.x, skyPosition.y - 1, skyPosition.z), new mp.Vector3(0,0,0), 40);
    skyCam.pointAtCoord(skyPosition.x, skyPosition.y, skyPosition.z);
    skyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    
    currentZoom = initialZoom;
    skyObj.rotation = JSON.parse(initialRotationJson);
    itemIndex = index;
    lastFrameMs = 0;
    objOffset = JSON.parse(initialOffsetJson);
    changeZoom(0);
});

//mp.events.call("skycam:set", 0, mp.game.joaat("prop_laptop_01a"), 1, JSON.stringify(new mp.Vector3(0, 0, 0)));

function cancel() {
    if (!skyObj) return;

    skyObj.destroy();
    skyCam.setActive(false);
    skyCam.destroy();

    skyObj = null;
    skyCam = null;

    mp.game.ui.displayRadar(true);
    mp.game.cam.renderScriptCams(false, true, 1000.0, true, false);
}


function threeDigits(num) {
    if (num <= 9) return "00" + num;
    if (num <= 99) return "0" + num;
    return "" + num;
}

mp.keys.bind(Keys.Enter, true, () => {
    if (!skyObj) return;
    if (itemIndex != -1) {
        mp.gui.takeScreenshot(threeDigits(itemIndex) + ".png", 1, 100, 0);
    }
    
    mp.events.callRemote("skycam:save", currentZoom, JSON.stringify(skyObj.rotation), JSON.stringify(objOffset));
    cancel();
});

mp.keys.bind(Keys.Backspace, true, () => {
    if (!skyObj) return;
    
    mp.events.callRemote("skycam:cancel");
    cancel();
});

mp.keys.bind(Keys.G, true, () => {
    if (!skyObj) return;
    
    skyObj.rotation = new mp.Vector3(0, 0, 0);
    objOffset = new mp.Vector3(0, 0, 0);
    currentZoom = 1.0;
    changeZoom(0);
});


// change zoom
mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (!skyObj) return;

    if (upOrDown == "down") {
        if (leftOrRight === 'left') {
            changeZoom(0.03);
        } else {
            changeZoom(-0.03);
        }
    }
});

// change rotation
mp.events.add("render", () => {
    if (!skyObj) return;

    let time = new Date().getTime();
	if (lastFrameMs === 0)
		lastFrameMs = time;

	let delta = (time - lastFrameMs) / 1000.0; // delta in seconds.
	lastFrameMs = time;

	let up = mp.keys.isDown(Keys.Up);
	let down = mp.keys.isDown(Keys.Down);
	let left = mp.keys.isDown(Keys.Left);
	let right = mp.keys.isDown(Keys.Right);
	let shift = mp.keys.isDown(Keys.Shift);
	let space = mp.keys.isDown(Keys.Space);

    let objToEdit = skyObj.rotation;
	let m = 30*delta;

    // Space (edit offset)
    if (space) {
        m = .12*delta;
        if (right) {
            objOffset.x = objOffset.x + m;
        } else if (left) {
            objOffset.x = objOffset.x - m;
        }

        if (up) {
            objOffset.z = objOffset.z + m;
        } else if (down) {
            objOffset.z = objOffset.z - m;
        }

        changeZoom(0); // update offset
    }

	// Shift (up/down)
	if (up && !shift) {
		objToEdit.x = objToEdit.x - m;
	} else if (down && !shift) {
		objToEdit.x = objToEdit.x + m;
	}

	// Regular xy movement
	if (up && shift) {
		objToEdit.y = objToEdit.y + m;
	} else if (down && shift) {
		objToEdit.y = objToEdit.y - m;
	}
	if (left) {
		objToEdit.z = objToEdit.z - m;
	} else if (right) {
		objToEdit.z = objToEdit.z + m;
	}

    skyObj.rotation = objToEdit;
});
}