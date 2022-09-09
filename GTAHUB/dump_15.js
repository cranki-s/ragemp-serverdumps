{
const kindFunctions = [
    function(id) { return mp.players.atRemoteId(id) }, // 0 - players
    function(id) { return mp.vehicles.atRemoteId(id) }, // 1 - vehicles
    function(id) { return mp.objects.atJoebillId(id) }, // 2 - objects
    function(id) { return mp.markers.atJoebillId(id) }, // 3 - pickups
    function(id) { return mp.peds.atJoebillId(id) }, // 4 - actors
    function(id) { return mp.blips.atJoebillId(id) }, // 5 - blips
    function(id) { return mp.labels.atJoebillId(id) }, // 6 - labels
    // Ids above 5 are not implemented as game entities directly,
    // thus cannot be get from a pool. And don't need to, there's
    // no practical use for attaching entities to those types.
]

/** Returns the entity for the given kind and id. */
function getEntityForKindAndId(kind, id) {
    if (kind < kindFunctions.length && kind >= 0) {
        return kindFunctions[kind](id);
    }
    return undefined;
}

/** Returns the entity kinds type */
function getEntityKind(type) {
    switch(type) {
        case "player": return 0;
        case "vehicle": return 1;
        case "object": return 2;
        case "marker": return 3;
        case "ped": return 4;
        case "blip": return 5;
        case "label": return 6;
        default: return undefined;
    }
}

/** Returns the entity remote id */
function getEntityRemoteId(entity) {
    switch(entity.kind) {
        case 2: return mp.objects.atHandle(entity.handle).remoteID
        case 4: return mp.peds.atHandle(entity.handle).joebillId
        case 6: return entity.joebillId; // label
        default: return entity.remoteId;
    }
}
}