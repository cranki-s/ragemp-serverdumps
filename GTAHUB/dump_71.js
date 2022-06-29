{
/** Implements edition of attachment coordinates. */

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
let object = null;
let offset = null;
let rotation = null;
let boneIdx = 0;
let lastFrameMs = 0;

mp.rpc("player:edit_attachment", (hash, bone, initialOffset, initialRotation) => {
	if (object) {
	    object.destroy()
	    object = null;
	    offset = null;
	    rotation = null;
	}

	object = mp.objects.new(hash, mp.players.local.position, { dimension: -1 });
	if (object == null) {
	    mp.game.graphics.notify('~r~Bad model. Cancelled');
	    mp.events.callRemote("player:on_finish_attachment_edition", false, JSON.stringify(new mp.Vector3()), JSON.stringify(new mp.Vector3()));
        return;
	}

	mp.game.graphics.notify('arrows: move (+shift for height)~n~space: pos/rot~n~Enter: save~n~Backspace: Cancel');
    mp.editingAttachments = true;
	offset = JSON.parse(initialOffset);
	rotation = JSON.parse(initialRotation);
	boneIdx = bone;
	lastFrameMs = 0;
});

mp.keys.bind(Keys.Enter, true, function() {
    if (!object || mp.gui.cursor.visible) return;

    object.destroy();
   	object = null;
   	mp.events.callRemote("player:on_finish_attachment_edition", true, JSON.stringify(offset), JSON.stringify(rotation));
   	offset = null;
   	rotation = null;
   	mp.game.graphics.notify('Saved');
    mp.editingAttachments = false;
});

mp.keys.bind(Keys.Backspace, true, function() {
    if (!object || mp.gui.cursor.visible) return;

    object.destroy();
    object = null;
    mp.events.callRemote("player:on_finish_attachment_edition", false, JSON.stringify(new mp.Vector3()), JSON.stringify(new mp.Vector3()));
    offset = null;
    rotation = null;
    mp.game.graphics.notify('Cancelled');
    mp.editingAttachments = false;
});

mp.events.add("render", () => {
	if (!object || mp.gui.cursor.visible) return;

	let time = new Date().getTime();
	if (lastFrameMs === 0)
		lastFrameMs = time;

	let delta = (time - lastFrameMs) / 1000.0; // delta in seconds.
	lastFrameMs = time;

    // weird: on the first frame, all keys are "down".
	let up = mp.keys.isDown(Keys.Up);
	let down = mp.keys.isDown(Keys.Down);
	let left = mp.keys.isDown(Keys.Left);
	let right = mp.keys.isDown(Keys.Right);
	let alt = mp.keys.isDown(Keys.Alt);
	let shift = mp.keys.isDown(Keys.Shift);
	let space = mp.keys.isDown(Keys.Space);

	// Movements:
	// Shift+Up/Down: height
	// left-right, up-down: movement

	// Space (keep to invert rotation/position)
	let objToEdit = null;
	let m = .25*delta;
	if (space) {
		objToEdit = rotation;
		shift = !shift; // dont use rotation in weird axis
		m = 40*delta;
	} else {
		objToEdit = offset;
	}

	// Shift (up/down)
	if (up && shift) {
		objToEdit.x = objToEdit.x - m;
	} else if (down && shift) {
		objToEdit.x = objToEdit.x + m;
	}

	// Regular xy movement
	if (up && !shift) {
		objToEdit.y = objToEdit.y + m;
	} else if (down && !shift) {
		objToEdit.y = objToEdit.y - m;
	}
	if (left) {
		objToEdit.z = objToEdit.z - m;
	} else if (right) {
		objToEdit.z = objToEdit.z + m;
	}

	let posCoords =  offset.x.toFixed(2) + " " + offset.y.toFixed(2) + " " + offset.z.toFixed(2);
	let rotCoords =  rotation.x.toFixed(0) + " " + rotation.y.toFixed(0) + " " + rotation.z.toFixed(0);
	
	if (!space) {
		posCoords = "~r~" + posCoords + "~w~";
	} else {
		rotCoords = "~r~" + rotCoords + "~w~";
	}

	mp.game.graphics.drawText("pos: " + posCoords + "~n~rot: " + rotCoords, [0.5, 0.9], { 
		font: 0, 
		color: [255, 255, 255, 255], 
		scale: [0.5, 0.5], 
		outline: false
	});

	let entity = mp.players.local;
    object.attachTo(entity.handle,
		entity.getBoneIndex(boneIdx),
		offset.x, offset.y, offset.z, 
		rotation.x, rotation.y, rotation.z, 
		false, false, false, false, 2, true);
});

}