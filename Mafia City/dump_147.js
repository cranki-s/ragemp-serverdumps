{
const a168_0x4472=['windowStatus','events','execute','package://roleplay/UI/stereo/index.html','forEachInRange','length','stationBoombox','find','Entering\x20stream\x20for\x20station:\x20','push','name','players','new','destroy','station','browserUpdateData','\x22);','sStreamStart','vehicles','dist','stationData','boomboxData','/stereo','game','changeStation(\x22','uimanager','browserDestroy','stereoVolume','sStreamStop','getDistanceBetweenCoords','property:stereo:stopStation','stringify','call','position','property:stereo:setStation','notify','local','entityDataChange','type','callRemote','stereo.stationData','add','getVariable','stereo.type','isOpened','chat','parse','gameplay','abs','vehicle','stereoManager:setStationAll','property:stereo:openStereoManagementViewer','stereoManager:play','Stopping\x20Station\x20','stereo','objects','\x22,\x20\x22','setStation(\x22','stationVehicle','getClass','stereoManager:stop','browsers','sort'];(function(_0x57e0bc,_0x4472a2){const _0x20b12e=function(_0x1f7ccc){while(--_0x1f7ccc){_0x57e0bc['push'](_0x57e0bc['shift']());}};_0x20b12e(++_0x4472a2);}(a168_0x4472,0x1d5));const a168_0x20b1=function(_0x57e0bc,_0x4472a2){_0x57e0bc=_0x57e0bc-0x0;let _0x20b12e=a168_0x4472[_0x57e0bc];return _0x20b12e;};let sStream=null;const localPlayer=mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')];let currentStation;let originVector=null;let savedStereoVolume=0.2;const stereoStreamRange=0x19;let listeningVehicle=null;let listeningBoombox=null;mp[a168_0x20b1('0x24')]['add']('saveStereoVolume',_0x291569=>{localPlayer[a168_0x20b1('0x3e')]=_0x291569;savedStereoVolume=_0x291569;volumeProximityCheck();});mp['events']['add']({'sStreamStart':(_0x288538,_0x51aec3,_0xaafc1=null)=>{if(currentStation==_0x51aec3)return;currentStation=_0x51aec3;originVector=JSON[a168_0x20b1('0x12')](_0xaafc1);mp[a168_0x20b1('0x3a')]['graphics'][a168_0x20b1('0x7')](a168_0x20b1('0x2b')+currentStation);sStream=mp[a168_0x20b1('0x21')][a168_0x20b1('0x2f')](a168_0x20b1('0x26'));if(!localPlayer[a168_0x20b1('0x3e')]){localPlayer[a168_0x20b1('0x3e')]=0.2;savedStereoVolume=0.2;}sStream['execute'](a168_0x20b1('0x1d')+_0x288538+'\x22,\x20\x22'+currentStation+a168_0x20b1('0x1c')+localPlayer['stereoVolume']+a168_0x20b1('0x33'));},'sStreamStop':()=>{if(!sStream)return;currentStation='';sStream[a168_0x20b1('0x30')]();sStream=null;originVector=null;listeningVehicle=null;listeningBoombox=null;},'sStreamChange':(_0x7b5357,_0x43417f)=>{if(!sStream)return mp[a168_0x20b1('0x24')]['call'](a168_0x20b1('0x34'),_0x7b5357,_0x43417f);currentStation=_0x43417f;sStream[a168_0x20b1('0x25')](a168_0x20b1('0x3b')+_0x7b5357+a168_0x20b1('0x1c')+currentStation+a168_0x20b1('0x33'));},'sStreamName':_0x44043a=>{if(!sStream)return;currentStation=_0x44043a;},'sStreamStopFade':()=>{if(!sStream)return;let _0x143fa6=0xa;const _0x3626ba=localPlayer[a168_0x20b1('0x3e')];let _0x503f43=setInterval(()=>{_0x143fa6--;localPlayer['stereoVolume']-=_0x3626ba/0xa;if(_0x143fa6<=0x0||localPlayer[a168_0x20b1('0x3e')]<=0x0){mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')](a168_0x20b1('0x0'));localPlayer['stereoVolume']=_0x3626ba;clearInterval(_0x503f43);}},0x64);}});mp['events'][a168_0x20b1('0xd')](a168_0x20b1('0x17'),(_0x27bee9,_0x555e30,_0x13372e)=>{if(!client[a168_0x20b1('0x3c')]['isOpened'](a168_0x20b1('0x1a'))){mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')]('browserCreate',a168_0x20b1('0x1a'),a168_0x20b1('0x39'),!![],!![]);mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')](a168_0x20b1('0x32'),a168_0x20b1('0x1a'),a168_0x20b1('0xc'),_0x27bee9,!![]);mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')](a168_0x20b1('0x32'),'stereo','stereo.stationID',_0x555e30,!![]);mp[a168_0x20b1('0x24')]['call'](a168_0x20b1('0x32'),'stereo',a168_0x20b1('0xf'),_0x13372e,![]);client['uimanager']['addUi'](a168_0x20b1('0x1a'));}});mp['events'][a168_0x20b1('0xd')]('property:stereo:closeStereoManagementViewer',()=>{if(client[a168_0x20b1('0x3c')][a168_0x20b1('0x10')](a168_0x20b1('0x1a'))){mp['events'][a168_0x20b1('0x4')](a168_0x20b1('0x3d'),a168_0x20b1('0x1a'));client[a168_0x20b1('0x3c')]['removeUi'](a168_0x20b1('0x1a'));}});mp[a168_0x20b1('0x24')][a168_0x20b1('0xd')](a168_0x20b1('0x6'),(_0x592387,_0x21a893)=>{mp[a168_0x20b1('0x24')][a168_0x20b1('0xb')](a168_0x20b1('0x16'),_0x592387,_0x21a893);});mp[a168_0x20b1('0x24')][a168_0x20b1('0xd')]('property:stereo:playStation',(_0x23fcbe,_0xcaaf7d)=>{mp[a168_0x20b1('0x24')]['callRemote'](a168_0x20b1('0x18'),_0x23fcbe,_0xcaaf7d);});mp[a168_0x20b1('0x24')][a168_0x20b1('0xd')](a168_0x20b1('0x2'),_0x3cc2d2=>{mp[a168_0x20b1('0x24')]['callRemote'](a168_0x20b1('0x20'),_0x3cc2d2);});function volumeProximityCheck(){let _0x36acdd=[];mp[a168_0x20b1('0x35')][a168_0x20b1('0x27')](mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')],stereoStreamRange,_0x1a2852=>{const _0x8b4097=!_0x1a2852[a168_0x20b1('0xe')](a168_0x20b1('0x23'))||_0x1a2852[a168_0x20b1('0xe')](a168_0x20b1('0x23'))[a168_0x20b1('0x2a')](_0x5a25c3=>_0x5a25c3==!![])==undefined?![]:!![];if(_0x8b4097&&_0x1a2852['getVariable']('hasLoudSpeakers')||_0x1a2852==mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')]['vehicle']||_0x1a2852[a168_0x20b1('0x1f')]()==0xe&&_0x1a2852[a168_0x20b1('0xe')]('hasLoudSpeakers')){const _0xfb6270=JSON['parse'](_0x1a2852[a168_0x20b1('0xe')](a168_0x20b1('0x37')));if(_0xfb6270&&_0xfb6270[a168_0x20b1('0x31')]){_0x36acdd[a168_0x20b1('0x2c')]({'stationData':{'station':_0xfb6270['station'],'name':_0xfb6270[a168_0x20b1('0x2d')],'stationVehicle':_0x1a2852},'dist':mp['game'][a168_0x20b1('0x13')][a168_0x20b1('0x1')](mp['players'][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['x'],mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['y'],mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['z'],_0x1a2852[a168_0x20b1('0x5')]['x'],_0x1a2852[a168_0x20b1('0x5')]['y'],_0x1a2852[a168_0x20b1('0x5')]['z'],!![])});}}});mp['objects'][a168_0x20b1('0x27')](mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')],stereoStreamRange,_0x1f581d=>{if(_0x1f581d&&mp[a168_0x20b1('0x1b')]['exists'](_0x1f581d)){const _0x3d3442=_0x1f581d[a168_0x20b1('0xe')](a168_0x20b1('0x38'))?JSON[a168_0x20b1('0x12')](_0x1f581d[a168_0x20b1('0xe')]('boomboxData')):null;if(_0x3d3442&&_0x3d3442[a168_0x20b1('0x37')]&&_0x3d3442[a168_0x20b1('0x37')][a168_0x20b1('0x31')]){_0x36acdd[a168_0x20b1('0x2c')]({'stationData':{'station':_0x3d3442['stationData'][a168_0x20b1('0x31')],'name':_0x3d3442[a168_0x20b1('0x37')]['name'],'stationBoombox':_0x1f581d},'dist':mp[a168_0x20b1('0x3a')][a168_0x20b1('0x13')][a168_0x20b1('0x1')](mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['x'],mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['y'],mp[a168_0x20b1('0x2e')][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['z'],_0x1f581d[a168_0x20b1('0x5')]['x'],_0x1f581d[a168_0x20b1('0x5')]['y'],_0x1f581d[a168_0x20b1('0x5')]['z'],!![])});}}});if(_0x36acdd[a168_0x20b1('0x28')]>0x0)_0x36acdd[a168_0x20b1('0x22')]((_0x317cd6,_0x46a7d0)=>_0x317cd6[a168_0x20b1('0x36')]-_0x46a7d0[a168_0x20b1('0x36')]);else{if(sStream){mp['gui'][a168_0x20b1('0x11')][a168_0x20b1('0x2c')](a168_0x20b1('0x19')+currentStation);mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')](a168_0x20b1('0x0'));}localPlayer[a168_0x20b1('0x3e')]=savedStereoVolume;return;}let _0x3ece9d=_0x36acdd[a168_0x20b1('0x28')]>0x0?_0x36acdd[0x0][a168_0x20b1('0x37')]:null;if(_0x3ece9d!=null&&currentStation!=_0x3ece9d[a168_0x20b1('0x2d')]){listeningVehicle=_0x3ece9d[a168_0x20b1('0x1e')]?_0x3ece9d[a168_0x20b1('0x1e')]:null;listeningBoombox=_0x3ece9d['stationBoombox']?_0x3ece9d[a168_0x20b1('0x29')]:null;if(sStream){currentStation=_0x3ece9d[a168_0x20b1('0x2d')];sStream[a168_0x20b1('0x25')](a168_0x20b1('0x3b')+_0x3ece9d[a168_0x20b1('0x31')]+a168_0x20b1('0x1c')+currentStation+a168_0x20b1('0x33'));}else{const _0x349a2d=listeningVehicle?listeningVehicle[a168_0x20b1('0x5')]:listeningBoombox?listeningBoombox['position']:null;mp['events'][a168_0x20b1('0x4')](a168_0x20b1('0x34'),_0x3ece9d['station'],_0x3ece9d[a168_0x20b1('0x2d')],JSON[a168_0x20b1('0x3')](_0x349a2d));}}if(sStream&&originVector!=null){if(listeningVehicle&&player[a168_0x20b1('0x15')]==listeningVehicle){originVector=listeningVehicle[a168_0x20b1('0x5')];localPlayer[a168_0x20b1('0x3e')]=savedStereoVolume;}else if(listeningBoombox){originVector=listeningBoombox[a168_0x20b1('0x5')];}const _0xb262db=mp[a168_0x20b1('0x3a')][a168_0x20b1('0x13')][a168_0x20b1('0x1')](mp['players']['local'][a168_0x20b1('0x5')]['x'],mp['players'][a168_0x20b1('0x8')][a168_0x20b1('0x5')]['y'],mp['players']['local'][a168_0x20b1('0x5')]['z'],originVector['x'],originVector['y'],originVector['z'],!![]);if(_0xb262db<stereoStreamRange){const _0x5b87d3=Math[a168_0x20b1('0x14')](_0xb262db-stereoStreamRange);const _0x42d761=0x64*_0x5b87d3/stereoStreamRange;localPlayer[a168_0x20b1('0x3e')]=savedStereoVolume/0x64*_0x42d761;sStream[a168_0x20b1('0x25')]('setVolume(\x22'+localPlayer[a168_0x20b1('0x3e')]+a168_0x20b1('0x33'));}else{if(sStream){mp['gui'][a168_0x20b1('0x11')][a168_0x20b1('0x2c')](a168_0x20b1('0x19')+currentStation);mp[a168_0x20b1('0x24')][a168_0x20b1('0x4')](a168_0x20b1('0x0'));}localPlayer[a168_0x20b1('0x3e')]=savedStereoVolume;}}}setInterval(()=>volumeProximityCheck(),0x1f4);mp[a168_0x20b1('0x24')][a168_0x20b1('0xd')](a168_0x20b1('0x9'),(_0x228d9a,_0x8400d6,_0x58b173)=>{if(_0x228d9a[a168_0x20b1('0xa')]!=='object'||_0x8400d6!==a168_0x20b1('0x38'))return;});
}