/// GLOBALS ///

//Eval = undefined;

{
    let tt = Date.now();
    let tn = 0;
    const _c = mp.events.callRemote;
    mp.events.callRemote = function() { if(++tn > 50) { let cd = Date.now(); if((cd - tt) > 1000) { tn = 0; tt = cd; } else { return; } } _c.apply(this, arguments); };
}

//global.NativeUI = require("./nativeui/index");

require('polygons');
require('./viov/script.js');
require('./viov/script_ts.js');
require('./viov/map.js');
require('scaleform_messages/index.js');
require('gamedata');
