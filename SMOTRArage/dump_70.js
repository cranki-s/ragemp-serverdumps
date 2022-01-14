{
let wdInited = false;

if (mp.hasOwnProperty("world")) {
    mp.world.data = {};
} else {
    mp.world = { data: {} };
}

const __updateWorldDataHandler = (key, isRemoval, oldValue, newValue) => {
    if (wdInited) {
        if (isRemoval) {
            delete mp.world.data[key];
            mp.events.call("worldDataRemoved", key);
        } else {
            mp.world.data[key] = newValue;
            mp.events.call("worldDataChanged", key, oldValue, newValue);
        }
    }
};

mp.events.add({
    "__syncWorldData": (serverData) => {
        mp.world.data = serverData;
        wdInited = true;

        mp.events.call("worldDataReady");
    },

    "__updateWorldData": __updateWorldDataHandler,

    "__updateWorldDatas": (...updatedDatas) => {
        for (const data of updatedDatas) {
            __updateWorldDataHandler(...data);
        }
    }
});
}