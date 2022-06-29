{
/** Dance variables */
const KEYS_HEADING = [
    0, // RIGHT ARROW
    90, // DOWN ARROW
    180, // LEFT ARROW
]
let keysSprites = [];
let danceGameActive = false;
let lastFrame = 0;
let lastColor = 0;
let lightColor = {
    r: 0,
    g: 0,
    b: 0
};
let startPlaying = 0;
let points = 0;
let totalNotes = 0;
let pressedNotes = 0;
let showPoints = [];

const ARROW_SPRITE = "mp_arrowlarge"
const DANCE_PLAYTIME = 1000 * 60
const COLOR_POINTS = [
    [0, 104, 255, 200],
    [236, 255, 0, 200],
    [223, 234, 83, 200],
    [186, 189, 157, 200]
]

mp.game.graphics.requestStreamedTextureDict("mparrow", true)
mp.game.graphics.requestStreamedTextureDict("visualflow", true)
mp.game.graphics.requestStreamedTextureDict("timerbars", true)

function danceGameHandler(player, start = true) {
    if (start) {
        startTimer(5)
        setTimeout( () => {
            points = 0;
            startPlaying = Date.now()
            danceGameActive = true;
            player.freezePosition(true)
        }, 5000)
    } else {
        danceGameActive = false
        mp.players.local.freezePosition(false)

        let finishObj = {
            score: [points, totalNotes, pressedNotes]
        }
        mp.events.callRemote("game:on_finish", JSON.stringify(finishObj), false)
        points = 0;
        totalNotes = 0;
        pressedNotes = 0;
    }
}

mp.setInterval( () => {
    if (danceGameActive) {
        if (Date.now()-startPlaying >= DANCE_PLAYTIME) {
            danceGameHandler(mp.players.local, false)
        } else {
            keyGenerator()
        }

        if (showPoints.length !== 0) {
            showPoints.splice(0, 1) // delete the first element every 1.750s
        }
    }
}, 1750)


mp.events.add("render", () => {
    if (danceGameActive) {
        moveKeys(lastFrame)

        // create hud with game information
        let alpha = isArrowPressed() ? 255 : 55
        mp.game.graphics.drawSprite("visualflow", "crosshair", 0.5, 0.8, 0.04, 0.05, 0, 255, 255, 255, alpha)
        mp.game.graphics.drawSprite("timerbars", "all_black_bg", 0.95, 0.97, 0.12, 0.04, 0, 0, 0, 0, 255)
        mp.game.graphics.drawText("Puntaje: "+points, [0.96, 0.95], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.5, 0.5],
            outline: true
        });

        // points when press key
        showPoints.forEach((point, index) => {
            let color;
            if (point === 300) color = COLOR_POINTS[0]
            else if (point === 200) color = COLOR_POINTS[1]
            else if(point === 100) color = COLOR_POINTS[2]
            else color = COLOR_POINTS[3]
            mp.game.graphics.drawText("+"+point, [0.5 + index/100, 0.83 + index/100], {
                font: 4,
                color: color,
                scale: [0.35, 0.35],
                outline: true
            });
        })

        // light at head of the player, change every 10 seconds
        if (Date.now() - lastColor > 1000) {
            lastColor = Date.now()
            lightColor = getRandomColor(false)
        }
        let pos = mp.players.local.position;
        mp.game.graphics.drawSpotLight(pos.x, pos.y, pos.z+10, 0, 0, -1, lightColor.r, lightColor.g, lightColor.b, 20, 70, 5, 10, 1);

        // set last frame time
        lastFrame = Date.now();
    }
})

mp.keys.bind(0x28, true, function() { //ARROW_DOWN
    if (danceGameActive) checkArrow(1);
});

mp.keys.bind(0x25, true, function() { //ARROW_LEFT
    if (danceGameActive) checkArrow(2);
});

mp.keys.bind(0x27, true, function() { //ARROW_RIGHT
    if (danceGameActive) checkArrow(0);
});

function checkArrow(arrowInt) {
    keysSprites.forEach((key) => {
        if (key[0] < 0.6 && key[0] >= 0.5 && key[5] === 255) {
            if (arrowInt === key[6]) {
                key[5] = 55
                let accuracy = key[0]-0.5
                if (accuracy <= 0.01) updateScore(300) // excellent
                else if(accuracy <= 0.025) updateScore(200) // very good
                else if(accuracy <= 0.035) updateScore(100) // good
                else if(accuracy <= 0.05) updateScore(50) // bad
                pressedNotes++;
            }
        }
    })
}

function updateScore(score) {
    points += score
    showPoints.push(score)
    if (score === 300) mp.game.audio.playSoundFrontend(-1, "TENNIS_MATCH_POINT", "HUD_AWARDS", true);
    else mp.game.audio.playSoundFrontend(-1, "GOLF_BIRDIE", "HUD_AWARDS", true);
    let pointsObj = {
        score: [points]
    }
    mp.events.callRemote("game:on_update", JSON.stringify(pointsObj));
}

function moveKeys(lastFrame) {
    if (danceGameActive) {
        keysSprites.forEach((key, index) => {
            if (Date.now()-lastFrame < 150) {
                let playingTime = Date.now() - startPlaying
                if (playingTime < 15000) key[0] -= 0.001
                else if (playingTime >= 15000 && playingTime < 30000) key[0] -= 0.0015
                else if (playingTime >= 30000) key[0] -= 0.0025
            }
            if (key[0] < 0.5 && key[5] !== 55) key[5] = 55
            if (key[0] < 0) keysSprites.splice(index, 1)
            mp.game.graphics.drawSprite("mparrow", ARROW_SPRITE, key[0], 0.8, 0.03, 0.045, key[1], parseInt(key[2]), parseInt(key[3]), parseInt(key[4]), parseInt(key[5]))
        })
    }
}

function keyGenerator() {
    if (danceGameActive) {
        totalNotes++;
        let getRandomKey = randomKey()
        let color = getRandomColor()
        let key = [0.9, KEYS_HEADING[getRandomKey], color.r, color.g, color.b, color.a, getRandomKey]
        keysSprites.push(key)
    }
}

function getRandomColor(moreGreen = true) {
    if (moreGreen) {
        return {
            r: getRandomInt(0, 256/2),
            g: getRandomInt(100, 256),
            b: getRandomInt(0, 256/2),
            a: 255,
        }
    } else {
        return {
            r: getRandomInt(0, 256),
            g: getRandomInt(0, 256),
            b: getRandomInt(0, 256),
            a: 255,
        }
    }
}

function randomKey() {
    return getRandomInt(0, 3)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isArrowPressed() {
    if (mp.game.controls.isControlPressed(3, 173) || mp.game.controls.isControlPressed(3, 174) || mp.game.controls.isControlPressed(3, 175)) return true
    else return false
}
}