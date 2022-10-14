{
let cef = null;
const player = mp.players.local;

function openCef(url) {
    if (cef) cef.destroy();
    cef = mp.browsers.new(url);
    mp.gui.cursor.show(true, true);
}
exports.openCef = openCef;


function destroyCef() {
    if (cef) cef.destroy();
    cef = null;
    mp.gui.cursor.show(false, false);
}
exports.destroyCef = destroyCef;

function injectCef(execute) {
    if (!cef) return;
    cef.execute(execute);
}
exports.injectCef = injectCef;

function reloadCef(ignore_cache) {
    if (!cef) return;
    cef.reload(ignore_cache);
}
exports.injectCef = injectCef;

mp.events.add({
    "destroyBrowser": () => destroyCef(),
    "showBrowser": (url) => openCef(url),
    "execBrowser": (code) => injectCef(code),
    "showCursor": (tog_a, tog_b) => mp.gui.cursor.show(tog_a, tog_b),
    "reloadBrowser": (ignore_cache) => reloadCef(ignore_cache)
});
}