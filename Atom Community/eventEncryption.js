
let arr_en = null;
let shuffleArr = null;

const cryptEvent = (eventName) => {
    let result = ''
    for (let i = 0; i < eventName.length; i++) {
        let index = arr_en.findIndex(x => x == eventName[i])
        result += shuffleArr[index]
    }

    return result
}

mp.events.add('changeArrs', (_arrEn, _shuffleArr) => {
    arr_en = _arrEn;
    shuffleArr = _shuffleArr;
});

const callRemote = mp.events.callRemote;

mp.events.callRemote = (eventName, ...args) => {
    if (shuffleArr == null) {
        callRemote(eventName, ...args);
        return;
    }

    const hash = cryptEvent(eventName);
    callRemote('FYOUWL0V3', hash, ...args);
}
