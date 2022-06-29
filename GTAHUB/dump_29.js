{
/** Toggle FPS counter with F8 */

function getFrameCount() {
    return mp.game.invoke('0xFC8202EFC642E6F2');
}

function getLastFps() {
    return fps;
}

let lastFrameCount = getFrameCount();
let counterEnabled = false;
let firstCall = false;
let fps = 0;

mp.setInterval(() => {
    fps = getFrameCount() - lastFrameCount;
    lastFrameCount = getFrameCount();
}, 1000);

mp.keys.bind(0x77/*F8*/, true, () => {
    counterEnabled = !counterEnabled;
    if (counterEnabled && mp.players.local.duty) {
        mp.profiler.setEnabled(true);
    } else {
        mp.profiler.setEnabled(false);
    }

    if (!firstCall) {
        firstCall = true;
        mp.events.add("render", () => {
            if (counterEnabled) {
                mp.game.graphics.drawText(""+fps, [0.01, 0.005], {
                    font: 5,
                    color: [255, 255, 255, 185],
                    scale: [.3,.3],
                    outline: true
                });
            }
        });
    }
});
}