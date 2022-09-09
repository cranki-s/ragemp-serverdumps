{
let lastStreamedPlayers = [];
let lastStreamedVehicles = [];

function intArrayEquals(array1, array2) {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

mp.setInterval(() => {
    let streamedVehicles = mp.vehicles.streamed.map(e => e.remoteId);
    if (!intArrayEquals(streamedVehicles, lastStreamedVehicles)) {
        mp.events.originalCallRemote("notifyStreamedVehicles", JSON.stringify(streamedVehicles));
        lastStreamedVehicles = streamedVehicles;
    }

    let streamedPlayers = mp.players.streamed.map(e => e.remoteId);
    if (!intArrayEquals(streamedPlayers, lastStreamedPlayers)) {
        mp.events.originalCallRemote("notifyStreamedPlayers", JSON.stringify(streamedPlayers));
        lastStreamedPlayers = streamedPlayers;
    }
}, 30);
}