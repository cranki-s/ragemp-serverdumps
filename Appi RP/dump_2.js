try {
    require('./main.js');
}catch (e) {
    mp.game.graphics.notify(`${e.toString()}`);
}