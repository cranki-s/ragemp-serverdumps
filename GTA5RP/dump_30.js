{
    const mp = global.mp;
    let playerBlipList = new Map;
    mp.events.add("entityStreamIn", function (a) {
        if ("player" === a.type && playerBlipList.has(a.remoteId)) {
            const b = playerBlipList.get(a.remoteId);
            0 == a.blip && a.createBlip(1), a.setBlipColor(isNaN(b) ? 0 : b)
        }
    }), mp.events.add("entityStreamOut", function (a) {
        "player" === a.type && playerBlipList.has(a.remoteId) && 0 !== a.blip && a.destroyBlip()
    }), mp.events.add("client_playerBlip_create", function (a, b) {
        playerBlipList.set(a, b);
        const c = mp.players.atRemoteId(a);
        null == c || 0 !== c.handle && (playerBlipList.has(a) && 0 !== c.blip ? c.setBlipColor(isNaN(b) ? 0 : b) : (0 == c.blip && c.createBlip(1), c.setBlipColor(isNaN(b) ? 0 : b)))
    }), mp.events.add("client_playerBlip_destroy", function (a) {
        const b = mp.players.atRemoteId(a);
        return null == b || 0 === b.handle ? playerBlipList.delete(a) : void(playerBlipList.has(a) && 0 != b.blip && b.destroyBlip(), playerBlipList.delete(a))
    }), mp.events.add("client_playerBlip_clear", function () {
        try {
            playerBlipList.forEach(function (a, b) {
                const c = mp.players.atRemoteId(b);
                null != c && c.destroyBlip()
            })
        } catch (a) {}
        playerBlipList.clear()
    }), mp.events.add("playerQuit", function (a) {
        playerBlipList.has(a.remoteId) && playerBlipList.delete(a.remoteId)
    });
}