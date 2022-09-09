{
/**
 * Implements player labels.
 */
require('ui.js')

let playerLabels = {}; // id -> { label data }

mp.labels = {
    selectedLabel: null, // if on no-clip, the selected label
    atJoebillId: function (id) {
        return playerLabels[id];
    }
}

// Parameters to configure how to draw labels
let labelDefaultProps = {
    font: 0,
    color: [255, 255, 255, 223],
    scale: [0.33, 0.33],
    outline: true,
    centre: true,
};
let baseScale = 0.1;
let distDivisor = 1;
let distMultiplier = 0.9;

/** This event draws all the created labels */
mp.events.add("render", () => {
    if (!isHudToggled()) return;

    let camera = mp.playerCamera.getActiveCamera();
    if (!camera) return;

    let localPos = camera.getCoord();
    let now = Date.now();


    // clear selected label
    mp.labels.selectedLabel = null;

    for (let label of Object.values(playerLabels)) {

        // if label is attached to a player, update its position.
        let player = label.attachedPlayer;
        if (player) {
            if (!mp.players.exists(player) || !player.handle) continue; // player not streamed, or disconnected. Ignore.

            label.position = player.getBoneCoords(12844, label.attachedOffset.x, label.attachedOffset.y, label.attachedOffset.z);
        }

        // if label is attached to a ped, update its position
        let ped = label.attachedPed;
        if (ped) {
            if (!mp.peds.exists(ped) || ped.handle === 0) continue; // ped not streamed, or disconnected. Ignore.

            // hardcoded 12844 for a backend bug
            label.position = ped.getBoneCoords(12844, label.attachedOffset.x, label.attachedOffset.y, label.attachedOffset.z);
        }

        // range check
        let distSquared = mp.game.system.vdist2(label.position.x, label.position.y, label.position.z, localPos.x, localPos.y, localPos.z);
        if (distSquared > (label.drawDistance * label.drawDistance)) continue;

        // line-of-sigh check
        if (label.los) {
            if (now - label.lastLosCheck > 100) {
                label.visible = mp.raycasting.testPointToPoint(localPos, label.position, null, 17) === undefined;
                label.lastLosCheck = now;
            }
        }

        // draw the label
        if (!label.los || label.visible) {
            let dist = mp.game.system.sqrt(distSquared);

            let selected = false;
            if (mp.noClip.enabled && !mp.gui.cursor.visible) {
                let screenPos = mp.game.graphics.world3dToScreen2d(label.position.x, label.position.y, label.position.z);
                if (screenPos &&
                    (screenPos.x >= 0.45 && screenPos.x <= 0.55) &&
                    (screenPos.y >= 0.45 && screenPos.y <= 0.5)) {

                    // only select if it's the only label
                    if (!mp.labels.selectedLabel) {
                        selected = true;
                        mp.labels.selectedLabel = label;
                    }
                }
            }
            drawLabel(label, dist, selected);
        }
    }
});

function drawLabel(l, dist, selected) {
    // calculate label scale depending on distance to camera
    let scale = baseScale + (distDivisor / (dist * distMultiplier));
    labelDefaultProps.scale[0] = scale;
    labelDefaultProps.scale[1] = scale;

    // calculate label alpha depending on distance (nearest: lighter alpha)
    if (dist < 3) {
        labelDefaultProps.color[3] = Math.round((dist/3.0) * 223);
    } else {
        labelDefaultProps.color[3] = 223;
    }

    if (!selected) {
        mp.game.graphics.drawText(l.text, [l.position.x, l.position.y, l.position.z], labelDefaultProps);
    } else {
        labelDefaultProps.scale[0] = scale * 1.3;
        labelDefaultProps.scale[1] = scale * 1.3;

        mp.game.graphics.drawText(l.text, [l.position.x, l.position.y, l.position.z], labelDefaultProps);
    }
}

// RPCs

mp.rpc("pl:create", (id, text, posJson, los, drawDistance, attachedData) => {
    let position = JSON.parse(posJson);
    let label = {
        type: "label",
        joebillId: id,
        position: position,
        text: text,
        los: los,
        drawDistance: drawDistance,
        visible: false,
        lastLosCheck: 0,
    };
    playerLabels[id] = label;

    // set the "attached variables". Only supports attached.type 0
    if (attachedData !== "{}") {
        let attached = JSON.parse(attachedData);
        if (attached.type !== 0) {
            mp.console.logWarning(`Can't attach label data: ${attachedData}. Labels only supports type 0.`);
            return;
        }

        let attachedPlayer = mp.players.atRemoteId(attached.id);
        if (!attachedPlayer) {
            mp.console.logWarning(`Can't attach label ${id} to player ID ${attached.id}: player doesn't exists.`);
            // put the label at the offset coordinates with the message of why it failed.
            label.text = `(can't attach to player id ${attached.id} because doesn't exists) ${label.text}`;
            return;
        }

        label.attachedPlayer = attachedPlayer;
        label.attachedBone = attached.bone;
        label.attachedOffset = position;
    }
});

mp.rpc("pl:destroy", (id) => {
    if (playerLabels[id]) {
        delete playerLabels[id];
    }
});

mp.rpc("pl:set_pos", (id, posJson) => {
    let position = JSON.parse(posJson);
    if (playerLabels[id]) {
        if (playerLabels[id].attachedPlayer) {
            playerLabels[id].attachedOffset = position;
        } else {
            playerLabels[id].position = position;
        }
    }
});

mp.rpc("pl:set_text", (id, text) => {
    if (playerLabels[id]) {
        playerLabels[id].text = text;
    }
});

// local command to change label scale, and measure performance
mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];

    args.shift();

    if (commandName === "clientlabelscale") {
        baseScale = parseFloat(args[0]);
        distDivisor = parseFloat(args[1]);
        distMultiplier = parseFloat(args[2]);
    } else if (commandName === "botswithnames") {
        let pos = mp.players.local.position;
        let botCount = parseInt(args[0]);
        let distance = parseInt(args[1]);
        if (!botCount || !distance) {
            mp.game.graphics.notify("/botswithnames count distance")
        } else {
            for (let i = 0; i < botCount; i++) {
                /*
                let botPos = {
                    x: pos.x + (Math.random() - 0.5) * distance,
                    y: pos.y + (Math.random() - 0.5) * distance,
                    z: pos.z,
                };
                let ped = mp.peds.new(mp.game.joaat("u_m_y_abner"), botPos, Math.random() * 360, -1);
                let pedName = "Bot_Name_Number_#" + i;
                // attach manually
                mp.events.call('pl:create', i, pedName, JSON.stringify(new mp.Vector3(0,0,0.3)), true, 30, "{}")
                playerLabels[i].attachedPed = ped;
                playerLabels[i].attachedOffset = new mp.Vector3(0.4, 0, 0);
                playerLabels[i].attachedBone = 12844;
                 */
            }
        }
    }
});

// Testing commands:
// /cevalb mp.objects.new(mp.game.joaat('prop_laptop_01a'), mp.players.local.position).idp
// /ceval mp.events.call('pl:create', 5, 'asd', JSON.stringify(new mp.Vector3(0,0,1)), true, 30, JSON.stringify({id:2, type:2, bone:0}))
// /ceval mp.events.call('pl:attach', 5, 2, 2, 0, JSON.stringify(new mp.Vector3(0,0,1)), JSON.stringify(new mp.Vector3(0,0,0)))
// /ceval mp.events.call('pl:attach', 5, 0, 0, 62, JSON.stringify(new mp.Vector3(0,0,0.1)), JSON.stringify(new mp.Vector3(0,0,0)))
}