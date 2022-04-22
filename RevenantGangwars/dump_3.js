{
sharedDrawingVariables.resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
sharedDrawingVariables.aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
sharedDrawingVariables.safeZoneSize = mp.game.graphics.getSafeZoneSize();

setInterval(() => {
    // screen resolution
    let curResolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    if (curResolution.x !== sharedDrawingVariables.resolution.x || curResolution.y !== sharedDrawingVariables.resolution.y) {
        sharedDrawingVariables.resolution = curResolution;
    }

    // aspect ratio
    let curAspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    if (curAspectRatio !== sharedDrawingVariables.aspectRatio) {
        sharedDrawingVariables.aspectRatio = curAspectRatio;
    }

    // safezone size
    let curSafeZone = mp.game.graphics.getSafeZoneSize();
    if (curSafeZone !== sharedDrawingVariables.safeZoneSize) {
        sharedDrawingVariables.safeZoneSize = curSafeZone;
    }
}, 1000);
}