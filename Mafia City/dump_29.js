{
const a103_0x272e=['rod','add','notify','call','reeling','fishing:reeling:fail','cursor','gui','browserDestroy','vehicle','register','game','position','isInAnyVehicle','local','gameplay','succeed','graphics','isInWater','callRemote','fail','browserCreate','fishing:reeling:succeed','getGroundZFor3dCoord','show','events','fishing:reeling:result','players','isStill','abs','startGame(','player:netfishing:castNet','fishing:reeling:start','Vector3'];(function(_0x52d907,_0x272e53){const _0x4bf8a8=function(_0x4955f4){while(--_0x4955f4){_0x52d907['push'](_0x52d907['shift']());}};_0x4bf8a8(++_0x272e53);}(a103_0x272e,0x1c0));const a103_0x4bf8=function(_0x52d907,_0x272e53){_0x52d907=_0x52d907-0x0;let _0x4bf8a8=a103_0x272e[_0x52d907];return _0x4bf8a8;};mp['attachmentMngr'][a103_0x4bf8('0x4')](a103_0x4bf8('0x1c'),0x4fcb0029,0xff9,new mp['Vector3'](0.1,0x0,-0.06),new mp[(a103_0x4bf8('0x1b'))](0xe4,0x140+0x3c,0x145));let isFishing=![];let gotRes=!![];mp['events'][a103_0x4bf8('0x1d')](a103_0x4bf8('0x1a'),(_0x129816,_0x466202)=>{gotRes=![];mp[a103_0x4bf8('0x13')][a103_0x4bf8('0x1f')](a103_0x4bf8('0xf'),'reeling','/reeling',![],![]);mp[a103_0x4bf8('0x1')][a103_0x4bf8('0x0')]['show'](!![],!![]);setTimeout(()=>{mp[a103_0x4bf8('0x13')][a103_0x4bf8('0x1f')]('newBrowserExecute',a103_0x4bf8('0x20'),a103_0x4bf8('0x18')+_0x129816+',\x20'+_0x466202+');');},0x64);});mp[a103_0x4bf8('0x13')]['add'](a103_0x4bf8('0x21'),()=>{if(gotRes)return;gotRes=!![];mp[a103_0x4bf8('0x13')]['call'](a103_0x4bf8('0x2'),a103_0x4bf8('0x20'));mp[a103_0x4bf8('0x1')][a103_0x4bf8('0x0')][a103_0x4bf8('0x12')](![],![]);mp[a103_0x4bf8('0x13')]['callRemote']('fishing:reeling:result',a103_0x4bf8('0xe'));});mp[a103_0x4bf8('0x13')][a103_0x4bf8('0x1d')](a103_0x4bf8('0x10'),()=>{if(gotRes)return;gotRes=!![];mp[a103_0x4bf8('0x13')][a103_0x4bf8('0x1f')]('browserDestroy','reeling');mp[a103_0x4bf8('0x1')][a103_0x4bf8('0x0')][a103_0x4bf8('0x12')](![],![]);mp['events']['callRemote'](a103_0x4bf8('0x14'),a103_0x4bf8('0xa'));});mp[a103_0x4bf8('0x13')][a103_0x4bf8('0x1d')](a103_0x4bf8('0x19'),()=>{if(mp[a103_0x4bf8('0x15')][a103_0x4bf8('0x8')][a103_0x4bf8('0x7')](![])&&mp['players'][a103_0x4bf8('0x8')][a103_0x4bf8('0x3')][a103_0x4bf8('0xc')]()){let _0x53cc74=Math[a103_0x4bf8('0x17')](mp[a103_0x4bf8('0x15')][a103_0x4bf8('0x8')][a103_0x4bf8('0x6')]['z']-mp[a103_0x4bf8('0x5')][a103_0x4bf8('0x9')][a103_0x4bf8('0x11')](mp[a103_0x4bf8('0x15')][a103_0x4bf8('0x8')]['position']['x'],mp['players'][a103_0x4bf8('0x8')][a103_0x4bf8('0x6')]['y'],mp[a103_0x4bf8('0x15')]['local'][a103_0x4bf8('0x6')]['z'],0x0,![]));if(_0x53cc74>0x12c||mp[a103_0x4bf8('0x5')][a103_0x4bf8('0x9')][a103_0x4bf8('0x11')](mp[a103_0x4bf8('0x15')][a103_0x4bf8('0x8')][a103_0x4bf8('0x6')]['x'],mp[a103_0x4bf8('0x15')][a103_0x4bf8('0x8')][a103_0x4bf8('0x6')]['y'],mp[a103_0x4bf8('0x15')]['local']['position']['z'],0x0,![])==0x0)mp[a103_0x4bf8('0x13')][a103_0x4bf8('0xd')](a103_0x4bf8('0x19'));else mp['game'][a103_0x4bf8('0xb')]['notify']('~r~The\x20waters\x20are\x20too\x20shallow\x20to\x20fish\x20here.');}else{mp[a103_0x4bf8('0x5')][a103_0x4bf8('0xb')][a103_0x4bf8('0x1e')]('You\x20cannot\x20fish\x20on\x20land\x20you\x20dumbass.');}});mp[a103_0x4bf8('0x13')]['addProc']('isPlayerStill',()=>{return mp['players']['local'][a103_0x4bf8('0x16')]();});
}