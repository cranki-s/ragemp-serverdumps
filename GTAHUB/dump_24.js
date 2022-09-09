{
const TOWTRUCKS = [
    mp.game.joaat("towtruck"),
    mp.game.joaat("towtruck2"),
    mp.game.joaat("towtruck4")
]
const TRUCKS = [
    mp.game.joaat("hauler"),
    mp.game.joaat("hauler2"),
    mp.game.joaat("packer"),
    mp.game.joaat("phantom"),
    mp.game.joaat("phantom3"),
]

// Get if model is a towtruck (true or false)
function isTowTruck(model) {
    return TOWTRUCKS.includes(model);
}

// Get if model is a truck (true or false)
function isTruck(model) {
    return TRUCKS.includes(model);
}

function tryFunction(identifier, func) {
    try {
        return func();
    } catch (e) {
        mp.console.logWarning(`${identifier}: ${e.stack.toString()}`)
        return null;
    }
}
}