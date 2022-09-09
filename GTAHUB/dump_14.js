{
function lerpVector(from, to, t) {
    let tMinus = 1-t;
    return new mp.Vector3(
        from.x*tMinus + to.x*t,
        from.y*tMinus + to.y*t,
        from.z*tMinus + to.z*t
    )
}

function lerpEuler(from, to, t) {
    return new mp.Vector3(
        angleLerp(from.x, to.x, t),
        angleLerp(from.y, to.y, t),
        angleLerp(from.z, to.z, t)
    )
}

function shortAngleDist(a0,a1) {
    var max = 360;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}

function angleLerp(a0,a1,t) {
    return a0 + shortAngleDist(a0,a1)*t;
}
}