{
/**
 * Toggle record with F6
 */

mp.keys.bind(0x75, false, () => {
    if (!mp.game.recorder.isRecording()) {
        mp.game.recorder.start(1);
    } else {
        mp.game.recorder.stop();
    }
});
}