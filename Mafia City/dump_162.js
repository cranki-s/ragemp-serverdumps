{
const a142_0x1558=['type','camera','round','getHeightAboveGround','raycasting','Model:\x20','isAVehicle','spotlight','Vector3','testPointToPoint','handle','polmav','getLabelText','entity','drawText','vehicle','model','crossingRoad','\x20and\x20','getStreetNameFromHashKey','pathfind','\x20mph','getCoord','getSpeed','getNumberPlateText','streetName','stopPointing','joaat','\x0a\x20Plate:\x20','graphics','buzzard2','game','getStreetNameAtCoord','getDirection','position'];(function(_0x3fdc14,_0x155864){const _0x1fcc34=function(_0x2cd9de){while(--_0x2cd9de){_0x3fdc14['push'](_0x3fdc14['shift']());}};_0x1fcc34(++_0x155864);}(a142_0x1558,0x170));const a142_0x1fcc=function(_0x3fdc14,_0x155864){_0x3fdc14=_0x3fdc14-0x0;let _0x1fcc34=a142_0x1558[_0x3fdc14];return _0x1fcc34;};function isHeliHighEnough(_0x5f218a){return _0x5f218a[a142_0x1fcc('0x14')]()>1.5?!![]:![];}function isHeliPolmav(_0x288a27){return _0x288a27['model']===mp[a142_0x1fcc('0xd')][a142_0x1fcc('0x9')](a142_0x1fcc('0x1c'))||_0x288a27[a142_0x1fcc('0x21')]===mp[a142_0x1fcc('0xd')][a142_0x1fcc('0x9')](a142_0x1fcc('0xc'))?!![]:![];}function RenderVehicleInfo(_0x2be2f3){let _0x5c83e1=mp['game']['ui'][a142_0x1fcc('0x1d')](mp[a142_0x1fcc('0xd')][a142_0x1fcc('0x20')]['getDisplayNameFromVehicleModel'](_0x2be2f3['model']));let _0xa7eedc=_0x2be2f3[a142_0x1fcc('0x6')]();let _0x581eb2=_0x2be2f3[a142_0x1fcc('0x5')]();let _0x44e6c7=mp[a142_0x1fcc('0xd')][a142_0x1fcc('0x2')][a142_0x1fcc('0xe')](_0x2be2f3[a142_0x1fcc('0x10')]['x'],_0x2be2f3[a142_0x1fcc('0x10')]['y'],_0x2be2f3[a142_0x1fcc('0x10')]['z'],0x0,0x0);const _0x8a1b5b={'font':0x0,'color':[0xff,0xff,0xff,0xb9],'scale':[0x0,0.55],'outline':!![]};mp[a142_0x1fcc('0xd')]['graphics']['drawText'](a142_0x1fcc('0x16')+_0x5c83e1+a142_0x1fcc('0xa')+_0xa7eedc,[0.5,0.9],_0x8a1b5b);mp[a142_0x1fcc('0xd')][a142_0x1fcc('0xb')][a142_0x1fcc('0x1f')](_0x581eb2==0x0?'0\x20mph':Math[a142_0x1fcc('0x13')](_0x581eb2*2.236936)+a142_0x1fcc('0x3'),[0.5,0.76],_0x8a1b5b);mp[a142_0x1fcc('0xd')][a142_0x1fcc('0xb')]['drawText'](mp[a142_0x1fcc('0xd')]['ui'][a142_0x1fcc('0x1')](_0x44e6c7[a142_0x1fcc('0x7')])+(_0x44e6c7[a142_0x1fcc('0x22')]!=null?a142_0x1fcc('0x0')+mp[a142_0x1fcc('0xd')]['ui'][a142_0x1fcc('0x1')](_0x44e6c7[a142_0x1fcc('0x22')]):''),[0.5,0.81],_0x8a1b5b);}function pointingAt(_0x106aa5,_0x206b70=null){let _0x57c3e0=0x3e8;let _0x51d96b=_0x106aa5[a142_0x1fcc('0x4')]();let _0x259064=_0x106aa5[a142_0x1fcc('0xf')]();let _0x4f67eb=new mp[(a142_0x1fcc('0x19'))](_0x259064['x']*_0x57c3e0+_0x51d96b['x'],_0x259064['y']*_0x57c3e0+_0x51d96b['y'],_0x259064['z']*_0x57c3e0+_0x51d96b['z']);let _0x4ecf38=mp[a142_0x1fcc('0x15')][a142_0x1fcc('0x1a')](_0x51d96b,_0x4f67eb,-0x1);if(_0x4ecf38){if(_0x4ecf38[a142_0x1fcc('0x1e')][a142_0x1fcc('0x1b')]===localPlayer[a142_0x1fcc('0x1b')])return null;if(_0x206b70===a142_0x1fcc('0x18'))return _0x4ecf38;if(_0x206b70==='vehicle'&&_0x4ecf38['entity'][a142_0x1fcc('0x11')]===a142_0x1fcc('0x20'))return _0x4ecf38[a142_0x1fcc('0x1e')];if(_0x206b70==='any')return _0x4ecf38['entity'];return null;}return null;}let isTimerStarted=![];let timer;function CheckVisibility(_0x3f243f,_0x4b9113){if(_0x3f243f!=null){if(!_0x3f243f[a142_0x1fcc('0x17')]&&!isTimerStarted)StartTimer(_0x4b9113);if(_0x3f243f['isAVehicle']&&!isTimerStarted)return;if(_0x3f243f[a142_0x1fcc('0x17')]&&isTimerStarted){clearInterval(timer);isTimerStarted=![];}}}function StartTimer(_0x1d55fa){isTimerStarted=!![];let _0xe932a0=0x2;timer=setInterval(()=>{_0xe932a0--;if(_0xe932a0<0x0){clearInterval(timer);isTimerStarted=![];_0x1d55fa['tracked_vehicle']=null;if(_0x1d55fa[a142_0x1fcc('0x12')]!=null)_0x1d55fa[a142_0x1fcc('0x12')][a142_0x1fcc('0x8')]();}},0x3e8);}exports={'CheckVisibility':CheckVisibility,'isHeliHighEnough':isHeliHighEnough,'isHeliPolmav':isHeliPolmav,'RenderVehicleInfo':RenderVehicleInfo,'pointingAt':pointingAt};
}