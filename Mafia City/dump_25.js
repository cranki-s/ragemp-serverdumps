{
const a70_0x39e0=['atRemoteId','push','startScreenEffect','startHeartBeat','DeathFailMPIn','vehicles','smashWindow','PLAYER_SWITCH_CUSTOM_SOUNDSET','startHorn','graphics','Short_Transition_Out','shift','call','cam','events','setCamEffect','length','blurScreen','audio','game','playSoundFrontend','shake','transitionFromBlurred'];(function(_0x2642a1,_0x39e0d3){const _0x2b2285=function(_0x58b89b){while(--_0x58b89b){_0x2642a1['push'](_0x2642a1['shift']());}};_0x2b2285(++_0x39e0d3);}(a70_0x39e0,0x104));const a70_0x2b22=function(_0x2642a1,_0x39e0d3){_0x2642a1=_0x2642a1-0x0;let _0x2b2285=a70_0x39e0[_0x2642a1];return _0x2b2285;};let blurInProgress=![];let blurList=[];timeout=_0x2c7908=>{return new Promise(_0x22f393=>setTimeout(_0x22f393,_0x2c7908));};triggerBlur=async(_0xeb8202,_0x17c1ff,_0xccc5ba,_0xf200ff)=>{mp['game']['graphics']['transitionToBlurred'](_0xeb8202);await timeout(_0xeb8202+_0xccc5ba);mp[a70_0x2b22('0xc')][a70_0x2b22('0x2')][a70_0x2b22('0xf')](_0x17c1ff);await timeout(_0x17c1ff);if(_0xf200ff){blurList[a70_0x2b22('0x4')]();}mp[a70_0x2b22('0xc')][a70_0x2b22('0x2')]['transitionFromBlurred'](0x0);};mp[a70_0x2b22('0x7')]['add']({'blurScreen':async(_0xb48ee8,_0x25d60c,_0x20f24f)=>{if(!blurInProgress){blurInProgress=!blurInProgress;await triggerBlur(_0xb48ee8,_0x25d60c,_0x20f24f,![]);while(blurList[a70_0x2b22('0x9')]>=0x1){await triggerBlur(blurList[0x0][0x0],blurList[0x0][0x1],blurList[0x0][0x2],!![]);}mp[a70_0x2b22('0xc')][a70_0x2b22('0x2')]['transitionFromBlurred'](0x0);blurInProgress=!blurInProgress;}else{if(blurList[a70_0x2b22('0x9')]<=0x2){blurList[a70_0x2b22('0x11')]([_0xb48ee8,_0x25d60c,_0x20f24f]);}}},'triggerMajorCarCrash':()=>{mp[a70_0x2b22('0x7')]['call']('startScreenEffect',a70_0x2b22('0x14'),0x1770,![]);mp[a70_0x2b22('0x7')][a70_0x2b22('0x5')]('setCamEffect',0x2);mp[a70_0x2b22('0x7')][a70_0x2b22('0x5')](a70_0x2b22('0x13'),0x5);setTimeout(()=>{mp[a70_0x2b22('0x7')]['call'](a70_0x2b22('0x12'),'DeathFailMichaelIn',0x7d0,![]);mp['events']['call'](a70_0x2b22('0xa'),0x0,0x3e8,0xbb8);setTimeout(()=>{mp[a70_0x2b22('0x7')][a70_0x2b22('0x5')]('setCamEffect',0x0);},0x7d0);},0x1770);},'startScreenEffect':(_0x36dbdd,_0x5c6f26,_0x494e31)=>{mp[a70_0x2b22('0xc')][a70_0x2b22('0x2')][a70_0x2b22('0x12')](_0x36dbdd,_0x5c6f26,_0x494e31);},'cameraShake':(_0x29462b,_0x4d460d)=>{mp[a70_0x2b22('0xc')][a70_0x2b22('0x6')][a70_0x2b22('0xe')](_0x29462b,_0x4d460d);},'setCamEffect':_0x147f12=>{mp[a70_0x2b22('0xc')][a70_0x2b22('0x6')][a70_0x2b22('0x8')](_0x147f12);},'triggerHorn':(_0x3cadc2,_0x1df59d,_0x457ff6,_0x5eec08)=>{let _0x20d378=mp['vehicles'][a70_0x2b22('0x10')](_0x3cadc2);_0x20d378[a70_0x2b22('0x1')](_0x1df59d,_0x457ff6,_0x5eec08);},'smashWindow':(_0x1396f3,_0x46b409)=>{let _0x55860e=mp[a70_0x2b22('0x15')][a70_0x2b22('0x10')](_0x1396f3);_0x55860e[a70_0x2b22('0x16')](_0x46b409);},'startHeartBeat':async _0x2dfd8d=>{for(let _0x5e70ec=0x0;_0x5e70ec<_0x2dfd8d;_0x5e70ec++){mp[a70_0x2b22('0xc')]['audio'][a70_0x2b22('0xd')](-0x1,'Short_Transition_In',a70_0x2b22('0x0'),!![]);await timeout(0x3e8);mp['game'][a70_0x2b22('0xb')][a70_0x2b22('0xd')](-0x1,a70_0x2b22('0x3'),a70_0x2b22('0x0'),!![]);await timeout(0x3e8);}}});
}