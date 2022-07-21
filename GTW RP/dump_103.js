{
function assertVectorF(input){
    return !isNaN(parseFloat(input.x)) && !isNaN(parseFloat(input.y)) && !isNaN(parseFloat(input.z))
}

function assertNumber(input){
    return !isNaN(parseInt(input))
}

function parseVectorF(input){
    return {x : parseFloat(input.x), y : parseFloat(input.y), z : parseFloat(input.z)}
}

function assertString(input){
    return typeof input === "string"
}

function getLightVector(x, y, z){
    return {x : x, y : y, z : z}
}

function elementEquals(a, b){
    let offset = (a.offsetX == b.offsetX) && (a.offsetY == b.offsetY) && (a.offsetZ == b.offsetZ)
    let rotation = (a.rotationX == b.rotationX) && (a.rotationY == b.rotationY) && (a.rotationZ == b.rotationZ)
    let model = a.model == a.model 
    let bone = a.bone == b.bone 
    return (offset && rotation && model && bone)
}

function normalizeHex(input){
    if (typeof input === "undefined") return 
    if (isNaN(parseInt(input))) return 
    return "0x" + parseInt(input).toString(16).toUpperCase()
}

function getWeaponGroup(weapon){
    if (typeof weapon === "undefined") return false
    let hash = mp.game.weapon.getWeapontypeGroup(!isNaN(parseInt(weapon)) ? parseInt(weapon) : mp.game.joaat(weapon))
    if (hash == 2685387236) return "melee" 
    if (hash == 416676503) return "handgun"
    if (hash == 3337201093) return "submachine gun"
    if (hash == 860033945) return "shotgun"
    if (hash == 970310034) return "assault rifle"
    if (hash == 1159398588) return "light machine gun"
    if (hash == 3082541095) return "sniper rifle"
    if (hash == 2725924767) return "heavy weapon"
    if (hash == 1548507267) return "throwable"
    if (hash == 4257178988) return "misc"
    return "unknown"
}

function getWeaponModel(weapon){
    if (typeof weapon === "undefined") return false
    return mp.game.weapon.getWeapontypeModel(!isNaN(parseInt(weapon)) ? parseInt(weapon) : mp.game.joaat(weapon))
}

function getClipModel(clip){
    if (typeof clip === "undefined") return false
    return mp.game.weapon.getWeaponComponentTypeModel(!isNaN(parseInt(clip)) ? parseInt(clip) : mp.game.joaat(clip))
}
}