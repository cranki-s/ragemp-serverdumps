{
let dummyGameActive = false;
let win = false;

function dummyGameHandler(player, start) {
    dummyGameActive = start
}

mp.keys.bind(0x25, true, function() { //ARROW_LEFT
    if (dummyGameActive) {
        win = true;
        mp.events.callRemote("game:on_finish", JSON.stringify({}), win)
    }
});

mp.keys.bind(0x27, true, function() { //ARROW_RIGHT
    if (dummyGameActive) {
        win = false;
        mp.events.callRemote("game:on_finish", JSON.stringify({}), win)
    }
});
}