{
var a107_0x27f3=['addLocal','setRouteColour','newSphere','miningActualStart','gui','graphics','isInMiningSpot','notify','bind','cursor','~r~Current\x20mining\x20progress\x20has\x20been\x20canceled.\x20You\x20can\x20restart\x20the\x20process\x20by\x20pressing\x20Y\x20again.','callRemote','players','markers','register','~r~You\x20can\x27t\x20mine\x20inside\x20a\x20car.','setRoute','blips','Mining\x20Job\x20Location','isMining','game','miningCancelQuit','miningStart','Press\x20Y\x20to\x20start\x20mining\x20this\x20location','playerEnterColshape','parse','drill','miningReset','events','visible','Vector3','miningWork','attachmentMngr','destroy','miningCancel','new','playerExitColshape','add','Mining_Mine_Ore','local'];(function(_0x470135,_0x27f3d8){var _0x3f990a=function(_0x267271){while(--_0x267271){_0x470135['push'](_0x470135['shift']());}};_0x3f990a(++_0x27f3d8);}(a107_0x27f3,0x18e));var a107_0x3f99=function(_0x470135,_0x27f3d8){_0x470135=_0x470135-0x0;var _0x3f990a=a107_0x27f3[_0x470135];return _0x3f990a;};var player=mp[a107_0x3f99('0xe')][a107_0x3f99('0x1')];player[a107_0x3f99('0x8')]=![];player[a107_0x3f99('0x15')]=![];var currentColshape=null;var currentMarker=null;var currentLocation=null;var currentBlip=null;client['keybinding'][a107_0x3f99('0xa')](client['hotkeyManager']['getKey'](a107_0x3f99('0x0')),()=>{if(mp[a107_0x3f99('0x6')][a107_0x3f99('0xb')][a107_0x3f99('0x1f')]){return;}if(player[a107_0x3f99('0x15')]){player[a107_0x3f99('0x15')]=![];mp[a107_0x3f99('0x1e')][a107_0x3f99('0xd')](a107_0x3f99('0x24'));mp[a107_0x3f99('0x16')]['graphics'][a107_0x3f99('0x9')](a107_0x3f99('0xc'));}else if(currentLocation!=null&player[a107_0x3f99('0x8')]){if(player['vehicle']){mp[a107_0x3f99('0x16')]['graphics']['notify'](a107_0x3f99('0x11'));}else{mp[a107_0x3f99('0x1e')][a107_0x3f99('0xd')]('miningAttemptWork');}}});mp[a107_0x3f99('0x1e')][a107_0x3f99('0x27')](a107_0x3f99('0x5'),()=>{if(currentColshape!=null){currentColshape[a107_0x3f99('0x23')]();currentColshape=null;}if(currentBlip!=null){currentBlip[a107_0x3f99('0x23')]();currentBlip=null;}if(currentMarker!=null){currentMarker[a107_0x3f99('0x23')]();currentMarker=null;}player['isMining']=!![];mp[a107_0x3f99('0x22')][a107_0x3f99('0x2')](a107_0x3f99('0x1c'));mp[a107_0x3f99('0x1e')][a107_0x3f99('0xd')](a107_0x3f99('0x21'));});mp['events'][a107_0x3f99('0x27')](a107_0x3f99('0x18'),(_0x2e62b4,_0x28c8e9)=>{player[a107_0x3f99('0x15')]=![];player[a107_0x3f99('0x8')]=![];const _0x41e87d=JSON[a107_0x3f99('0x1b')](_0x2e62b4);currentColshape=mp['colshapes'][a107_0x3f99('0x4')](_0x41e87d['x'],_0x41e87d['y'],_0x41e87d['z'],0x4,0x0);currentMarker=mp[a107_0x3f99('0xf')][a107_0x3f99('0x25')](0x1,new mp[(a107_0x3f99('0x20'))](_0x41e87d['x'],_0x41e87d['y'],_0x41e87d['z']),0x2);currentBlip=mp[a107_0x3f99('0x13')]['new'](0x1af,new mp[(a107_0x3f99('0x20'))](_0x41e87d['x'],_0x41e87d['y'],_0x41e87d['z']),{'name':a107_0x3f99('0x14')});currentBlip[a107_0x3f99('0x12')](!![]);currentBlip[a107_0x3f99('0x3')](0x1);currentLocation=_0x41e87d;});mp[a107_0x3f99('0x1e')][a107_0x3f99('0x27')](a107_0x3f99('0x1d'),()=>{if(player[a107_0x3f99('0x15')]){player[a107_0x3f99('0x15')]=![];miningQuit();return;}if(currentBlip!=null){currentBlip[a107_0x3f99('0x12')](![]);currentBlip['destroy']();currentBlip=null;}if(currentColshape!=null){currentColshape['destroy']();currentColshape=null;}if(currentMarker!=null){currentMarker[a107_0x3f99('0x23')]();currentMarker=null;}currentLocation=null;});mp[a107_0x3f99('0x1e')][a107_0x3f99('0x27')](a107_0x3f99('0x1a'),_0x5c6da8=>{if(_0x5c6da8===currentColshape){mp['game'][a107_0x3f99('0x7')][a107_0x3f99('0x9')](a107_0x3f99('0x19'));player[a107_0x3f99('0x8')]=!![];}});mp[a107_0x3f99('0x1e')][a107_0x3f99('0x27')](a107_0x3f99('0x26'),_0x21b1f8=>{if(_0x21b1f8===currentColshape){if(player[a107_0x3f99('0x15')]){player['isMining']=![];mp[a107_0x3f99('0x1e')][a107_0x3f99('0xd')](a107_0x3f99('0x24'));mp[a107_0x3f99('0x16')][a107_0x3f99('0x7')]['notify']('~r~Current\x20mining\x20progress\x20has\x20been\x20canceled.\x20You\x20can\x20restart\x20the\x20process\x20by\x20pressing\x20Y\x20again.');}player['isInMiningSpot']=![];}});mp[a107_0x3f99('0x22')][a107_0x3f99('0x10')]('drill',0x51188cb0,0xeb95,new mp[(a107_0x3f99('0x20'))](0x0,0x0,0x0),new mp['Vector3'](0x0,0x0,0x0));function miningQuit(){mp[a107_0x3f99('0x1e')][a107_0x3f99('0xd')](a107_0x3f99('0x17'));}
}