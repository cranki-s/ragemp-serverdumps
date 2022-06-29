{
let countdownTimer = false;
let intervalCountEvent;
let startCount;

mp.events.add("render", () => {
    // draw countdown timer
    if (countdownTimer) {
        mp.game.graphics.drawText(startCount, [0.5, 0.05], {
            font: 7,
            color: [52, 125, 245, 230],
            scale: [2.5, 2.5],
            outline: true
        });

        if (startCount === 0) {
            clearInterval(intervalCountEvent)
            intervalCountEvent = null;
            countdownTimer = false;
            mp.game.graphics.startScreenEffect("MP_SmugglerCheckpoint", 1000, false);
        }
    }
})

/** Timer with sound and screen text for [time] seconds, return true when finish */
function startTimer(time) {
    if (time === 0) return;
    if (countdownTimer) return;

    countdownTimer = true;
    startCount = time;
    if (startCount === 5) mp.game.audio.playSoundFrontend(-1, "5s", "MP_MISSION_COUNTDOWN_SOUNDSET", true); // if time is 5 seconds, start the sound effect
    if (intervalCountEvent) clearInterval(intervalCountEvent)
    intervalCountEvent = setInterval( () => {
        startCount--;

        // if the time was more than 5 seconds, it will start the sound when it reaches 5.
        if (startCount === 5) mp.game.audio.playSoundFrontend(-1, "5s", "MP_MISSION_COUNTDOWN_SOUNDSET", true);
    }, 1000)
}
}