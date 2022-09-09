{
const bigmap = [];

bigmap.status = 0;
bigmap.timer = null;

mp.game.ui.setRadarZoom(1.0);
mp.game.ui.setRadarBigmapEnabled(false, false);

function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}

mp.events.add('render', () => {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || localplayer.getVariable('PLAYER_IN_CASINO') == true || localplayer.getVariable('PLAYER_IN_BUNKER') == true) return;

    mp.game.controls.disableControlAction(0, 48, true);
    if (mp.game.controls.isDisabledControlJustPressed(0, 48)) {

        var minimap = getMinimapAnchor();
        if (bigmap.status === 0) {
            mp.game.ui.setRadarZoom(0.0);
            bigmap.status = 1;

            bigmap.timer = setTimeout(() => {
                mp.game.ui.setRadarBigmapEnabled(false, true);
                mp.game.ui.setRadarZoom(1.0);

                bigmap.status = 0;
                bigmap.timer = null;
            }, 10000);
        } else if (bigmap.status === 1) {
            if (bigmap.timer != null) {
                clearTimeout(bigmap.timer);
                bigmap.timer = null;
            }

            mp.game.ui.setRadarBigmapEnabled(true, false);
            mp.game.ui.setRadarZoom(0.0);
            bigmap.status = 2;

            // bigmap
            mp.gui.execute(`HUD.minimapFix=${(minimap.rightX * 100) * 1.56}`);

            bigmap.timer = setTimeout(() => {
                mp.game.ui.setRadarBigmapEnabled(false, true);
                mp.game.ui.setRadarZoom(1.0);

                bigmap.status = 0;
                bigmap.timer = null;

                // default
                mp.gui.execute(`HUD.minimapFix=${minimap.rightX * 100}`);
            }, 10000);
        } else {
            if (bigmap.timer != null) {
                clearTimeout(bigmap.timer);
                bigmap.timer = null;
            }

            mp.game.ui.setRadarBigmapEnabled(false, false);
            mp.game.ui.setRadarZoom(1.0);
            bigmap.status = 0;

            // default
            mp.gui.execute(`HUD.minimapFix=${minimap.rightX * 100}`);
        }
    }
});
}