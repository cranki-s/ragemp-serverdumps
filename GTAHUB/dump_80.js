{
/** Race variables */
let raceGameActive = false;

function raceGameHandler(player, start = true) {
    if (start) {
        startTimer(5);
        setTimeout( () => {
            raceGameActive = true;
        }, 5000)
    } else {
        raceGameActive = false;
    }
}
}