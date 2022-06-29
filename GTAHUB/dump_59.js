{
let warningType = {
    lag: "fa fa-exclamation-triangle"
}

mp.rpc("warning:show", (type, time) => {
    let icon = warningType[type]
    if (icon) {
        browserCall("warningsVM", "toggleWarning", true, icon);
    }
    setTimeout( () => {
        browserCall("warningsVM", "toggleWarning", false, icon);
    }, time)
});
}