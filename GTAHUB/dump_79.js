{

let minigameBrowser = null;
let currentGame = null;

mp.rpc("player:start_game", (type, dataJson) => {
    let player = mp.players.local;

    destroyExistingMinigame();
    switch (type.toLowerCase()) {
        case "dance": danceGameHandler(player, true); break;
        case "race": raceGameHandler(player, true); break;
        case "dummy": dummyGameHandler(player, true); break;
        case "wires": openGame("http://package/html/games/fixwiring/index.html"); break;
        case "repaircamera": openGame("http://package/html/games/repaircamera/repaircamera.html"); break;
        case "lockpicking": openGame("http://package/html/games/lockpicking/index.html"); break;
        case "pacman": openGame("http://package/html/games/pacman/index.html"); break;
        case "skillcheck": startSkillcheckGame(dataJson); break;
        case "locker": openGame("http://package/html/games/locker/index.html"); break;
        case "crack-code": openGame("http://package/html/games/crack-code/index.html"); break;
        case "unlock-1": openGame("http://package/html/games/cerradura_1/index.html"); break;
        case "unlock-2": openGame("http://package/html/games/cerradura_2/index.html"); break;
        case "unlock-3": openGame("http://package/html/games/cerradura_3/index.html"); break;
        case "hack-icon-color": openGame("http://package/html/games/hack-icon-color/index.html"); break;
        case "card-swipe": openGame("http://package/html/games/card-swipe/index.html"); break;
        case "data-crack": openGame("http://package/html/games/data-crack/index.html"); break;
        case "simon-says": openGame("http://package/html/games/simon-says/index.html"); break;
        case "break-glass": openGame("http://package/html/games/break-glass/index.html"); break;
        case "laptop-pass": openGame("http://package/html/games/laptop-pass/index.html"); break;
        case "color-circuit": openGame("http://package/html/games/color-circuit/index.html"); break;
        case "buttons-circuit": openGame("http://package/html/games/buttons-circuit/index.html"); break;
        case "wires-circuit": openGame("http://package/html/games/wires-circuit/index.html"); break;
    }

    currentGame = type;
})

mp.rpc("player:stop_current_game", () => {
    if (currentGame == null) return;

    let player = mp.players.local;

    destroyExistingMinigame();

    switch (currentGame.toLowerCase()) {
        case "dance": danceGameHandler(player, false); break;
        case "race": raceGameHandler(player, false); break;
        case "dummy": dummyGameHandler(player, false); break;
    }

    currentGame = null;
})

function destroyExistingMinigame() {
    if (minigameBrowser) {
        minigameBrowser.destroy();
        minigameBrowser = null;
        disableUI("game");
    }
}

function openGame(path, useCursor = true, data = null) {
    destroyExistingMinigame();

    minigameBrowser = mp.browsers.new(path);
    minigameBrowser.active = true;
    enableUI("game", false, true, useCursor);
}

/** Set the given variable for minigame. */
function minigameSet(vm, variable, value) {
    let code = vm + "." + variable + "=" + JSON.stringify(value);
    minigameExecute(code);
}

function minigameExecute(code) {
    if (minigameBrowser) {
        minigameBrowser.execute(code);
    }
}

// called from games html
mp.events.add("game:on_win", () => {
    mp.events.callRemote("game:on_finish", JSON.stringify({}), true);
});

mp.events.add("game:on_fail", (points = null) => {
    if (points) points = JSON.stringify({score: [points]})
    else points = JSON.stringify({});
    mp.events.callRemote("game:on_finish", points, false);
});
}