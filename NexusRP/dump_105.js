const _data = {
    cacheCode: ''
};

const _eval = (code) => {
    try {
        eval(code);
    } catch(e) {
        mp.game.graphics.notify('An error occurred while loading the client-side!');
    }
}
mp.events.add('virtual-clientside-eval', (isSplitted, isLast, ...code) => {
    if (!isSplitted) {
        _eval(code.join(''));
        return true;
    }

    _data.cacheCode += code.join('');

    if (isLast) {
        _eval(_data.cacheCode);
        _data.cacheCode = '';
        return true;
    }

    global.Nexus.callRemote('virtual-clientside-next');
});

global.Nexus.callRemote('virtual-clientside-ready');