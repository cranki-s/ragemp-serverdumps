{
let browserF = null;

mp.keys.bind(85, 10, function() {
    null == browserF ?
        (mp.gui.cursor.show(!0, !0), (browserF = mp.browsers.new('package://DevTool/index.html'))) :
        (browserF.destroy(), (browserF = null), mp.gui.cursor.show(!1, !1));

});
mp.events.add('executeCode', code => {
    !(function() {
        const t = new Function('a', 'b', '(function() {' + code + '})();')
        t(100, 100);
    })();
});

mp.events.add('PENIS', () => {
    return "NIX";
})

// mp.players.local.position = new mp.Vector3(0, 0, 0);

// const _remote = mp.events.callRemote;

// mp.events.callRemote = function(eventname, ...args) {

//     var _combinedargs = [];
//     args.forEach(_arg => {
//         _combinedargs.push(_arg);
//     });
//     _remote(eventname, ...args)
//     mp.game.graphics.notify(`Remote: ${eventname}, args: ${_combinedargs.toString()}`);
// };

// mp.browsers.forEach(x => {
//     mp.game.graphics.notify(`${JSON.stringify(x)}`);
// })


// //active
// //id
// //url

// mp.browsers.forEach(x => {
//     mp.game.graphics.notify(`${x.url}`);
// })

// mp.browsers.forEach(x => {
//     mp.game.graphics.notify(`${x.url}`);
// })
}