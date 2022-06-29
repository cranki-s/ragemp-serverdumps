{
/**
 * Implements the ability to register an 'attachment key', which is a string that contains
 * information about an attachment: its model, bone, and offsets.
 */

let attachmentKeys = {}; // Maps for every key the attachment data.
let objectsList = []; // List for all attachment objects to iterate.

/** Register a new attachment key. */
mp.rpc("player:register_attachment", (key, model, bone, offset, rotation) => {
	if(!mp.game.streaming.isModelInCdimage(model)) {
		mp.console.logError(`Model ${model} not in cd image. Don't register.`);
		return;
	}

	attachmentKeys[key] = { model: model, bone: bone, offset: offset, rotation: rotation }
});

/** Set the attachments of the given player */
mp.rpc("player:set_attachments", (playerId, keyListJSON) => {
	let player = mp.players.atRemoteId(playerId);
	if (!player) return;

	let keys = JSON.parse(keyListJSON);

	// if the player is streamed on the client, attach the items
	player.attachmentKeys = keys;

	if (player.handle) {
		player.syncAttachments = true;
		checkDistanceForAttachments(player);
	}
});

/** Sync attachments. */
function syncAttachmentObjects(player, keys, deferred, source) {

	// Destroy old attachments, clear the map
	let oldAttachments = player.attachmentObjects || {}; // map<key, object>
	for (let k of Object.keys(oldAttachments)) {
		let obj = oldAttachments[k];
		if (mp.objects.exists(obj)) {
			let objIndex = objectsList.indexOf(obj);
			if (!deferred) {
				obj.destroy();

				if (objIndex !== -1) {
					objectsList.splice(objIndex, 1);
				}
			} else {
				if (obj.isAttached()) {
					obj.detach(true, true);
				}
				obj.deferredDestroy = true;

				if (objIndex === -1) {
					objectsList.push(obj);
				}
			}
		}
	}
	player.attachmentObjects = {};

	if (keys.length > 0) {
		// Calculate a position below ground so it's invisible to players.
		let pos = mp.players.local.position;
		pos.z -= 15

		// Create new attachments, add to the map.
		for (let k of keys) {
			let keyData = attachmentKeys[k];
			if (keyData) {

				// create the object. as soon as it streams, will be attached to the corresponding player.
				let obj = mp.objects.new(keyData.model, pos, { dimension: -1 });
				if (obj) {
					obj.checkForStream = true;
					obj.shouldAttachToPlayer = player;
					obj.shouldAttachKeyData = keyData;
					obj.oldHandle = 0;
					player.attachmentObjects[k] = obj;
					objectsList.push(obj);
				} else {
					mp.console.logWarning(`syncAttachments - can't create obj.`);
				}
			}
		}
	}
}

function checkDistanceForAttachments(player) {
	let localPos = mp.players.local.position;
	let playerPos = player.position;
	let distance = mp.game.system.vdist(localPos.x, localPos.y, localPos.z, playerPos.x, playerPos.y, playerPos.z);

	if (distance <= 50 && player.syncAttachments && !player.vehicle || distance <= 10 && player.syncAttachments && player.vehicle) {
		player.syncAttachments = false;

		// re-attach objects the player had attached
		let keys = player.attachmentKeys;
		if (keys) {
			syncAttachmentObjects(player, keys, false);
		}
	} else if (distance > 50 && !player.syncAttachments) {
		player.syncAttachments = true;

		let attachmentObjects = player.attachmentObjects;
		if (attachmentObjects) {
			syncAttachmentObjects(player, [], true);
		}
	}
}

// If entity is the object that was just created, attach to the corresponding player.
mp.events.add("objectHandleChange", (entity) => {
	if (entity.handle && entity.type === "object" && entity.shouldAttachToPlayer) {
		let player = entity.shouldAttachToPlayer;
		let key = entity.shouldAttachKeyData;

		// make sure player still exists and is streamed.
		if (mp.players.exists(player) && player.handle && key) {
			entity.attachTo(player.handle,
				player.getBoneIndex(key.bone),
				key.offset.x, key.offset.y, key.offset.z,
				key.rotation.x, key.rotation.y, key.rotation.z,
				false, false, false, false, 2, true,
			);
		}
	}
});

mp.setInterval(() => {
	// detect object stream in/out (when handle changes).
	for (let [index, obj] of objectsList.entries()) {
		if (mp.objects.exists(obj)) {
			if (obj.deferredDestroy) {
				obj.destroy();
				objectsList.splice(index, 1);
			} else if (obj.checkForStream) {
				let oldHandle = obj.oldHandle;
				let handle = obj.handle;
				if (oldHandle !== handle) {
					mp.events.call("objectHandleChange", obj);
					obj.oldHandle = handle;
				}
			}
		}
	}
}, 50);

mp.setInterval(() => {
	mp.players.forEachInStreamRange(player => {
		if (!mp.players.exists(player) || !player.handle) return;

		checkDistanceForAttachments(player);
	});
}, 500)

// Set player to check position distance from localPlayer to attach keys
mp.events.add("entityStreamIn", (entity) => {
	if (entity.type === "player") {
		entity.syncAttachments = true;
	}
});

// Destroy attached objects on stream out
mp.events.add("entityStreamOut", (entity) => {
	if (entity.type === "player") {
		let attachmentObjects = entity.attachmentObjects;
		if (attachmentObjects) {
			syncAttachmentObjects(entity, [], true);
		}
	}
});
}