{
// rotating variables
let rotatingEntity;
let rotatePosition;
let rotateHeading;
let prevCursorPos;
let rotateSensitivity = 800;
let clickPressed = false;
let res = mp.game.graphics.getScreenActiveResolution(0, 0);

mp.events.add("click", (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (rotatingEntity && leftOrRight === "left") {
        clickPressed = upOrDown === "down";
        prevCursorPos = [x,y];
    }
});

mp.rpc("entityrotation:set_entity", (kind, id) => {
    rotatingEntity = getEntityForKindAndId(kind, id);
    if (rotatingEntity) {
        rotatePosition = rotatingEntity.position;
    }
})

// change fov of active camera (if any) when scrolling
mp.events.add("entityrotation:on_scroll", (isUp) => {
    if (rotatingEntity) {
        let cam = mp.players.local.activeCamera;
        if (cam) {
            let add = isUp ? -5.0 : 5.0;
            let min = 25;
            let max = 70;
            let fov = cam.getFov() + add;
            if (fov < min) fov = min;
            if (fov > max) fov = max;
            cam.setFov(fov);
        }
    }
});

mp.events.add("render", () => {
    // rotating entity
    if (rotatingEntity) {
        try {
            rotatingEntity.type;
        } catch (e) {
            // expired multiplayer object has been used
            rotatingEntity = null;
        }

        if (rotatingEntity && !isMouseOverUi()) {
            if (rotatingEntity.type === "vehicle" && rotatingEntity.getDirtLevel() > 0.1) {
                rotatingEntity.setDirtLevel(0);
            }

            if (clickPressed) {
                if (rotateHeading == null) {
                    rotateHeading = rotatingEntity.getHeading();
                }

                let currCursorPos = mp.gui.cursor.position;
                if (prevCursorPos == null) {
                    prevCursorPos = currCursorPos;
                }

                let delta = {x: currCursorPos[0]-prevCursorPos[0], y: currCursorPos[1]-prevCursorPos[1]};
                delta.x /= res.x;
                delta.y /= res.y;
                prevCursorPos = currCursorPos;
                if (Math.abs(delta.x) > 0.0 || Math.abs(delta.y) > 0.0) {
                    rotateHeading = rotateHeading + (delta.x * rotateSensitivity);
                }
            }

            if (rotateHeading != null) {
                try {
                    rotatingEntity.setHeading(rotateHeading);
                    rotatingEntity.setVelocity(0, 0, 0);
                    if (rotatingEntity.type == "vehicle") {
                        let isBike = mp.game.vehicle.isThisModelABike(rotatingEntity.model) ||
                            mp.game.vehicle.isThisModelABicycle(rotatingEntity.model);
                        if (isBike) {
                            rotatingEntity.position = rotatePosition;
                        }
                        rotatingEntity.setDirtLevel(0); // force clean as is used in dealerships
                    }
                } catch (e) {
                    // inside try-catch because the rotating entity may be destroyed at any time and this will crash
                }
            }
        }
    }
})
}