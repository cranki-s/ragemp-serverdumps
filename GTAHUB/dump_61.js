{
mp.rpc("padlock:toggle", (toggle) => {
    browserCall("padlockVM", "toggleLock", toggle);
    if (toggle) {
        enableUI("padlock", true, true, true);
    } else {
        disableUI("padlock")
    }
});

mp.rpc("padlock:on_response", (input) => {
    if (input !== -1) mp.events.callRemote("padlock:on_response", input)
    else mp.events.callRemote("padlock:on_close")
});

mp.rpc("padlock:shake", (locked) => {
    browserCall("padlockVM", "shake", locked);
});
}