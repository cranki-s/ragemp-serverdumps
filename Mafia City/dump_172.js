{
const a29_0x3dff=['show','resetAllBrowsers','players','document.body.style.marginTop\x20=\x20\x22','cam','medialibDelegate.run(\x27setVolume\x27,\x20{vol:\x20','UpdateCinema','Vector3','document.styleSheets[0].rules[0].style.backgroundColor\x20=\x20\x22transparent\x22;','renderScriptCams','medialibDelegate.run(\x27play\x27);','new','call','SetCinemaVolume','game','PlayCinema','add','url','});','destroy','document.body.style.height\x20=\x20\x2237%\x22;','medialibDelegate.run(\x27seek\x27,\x20{time:','events',',\x20allowInaccurate:true},\x200);','cameras','setChatTop','Cinema','blips','document.body.style.width\x20=\x20\x2249%\x22;','render','pointAtCoord','freezePosition','StopCinema','document.getElementById(\x22playerdiv\x22).style.pointerEvents\x20=\x20\x27none\x27;','vw\x22;','local','Cinema\x20Volume\x20Set:\x20~b~','setActive','execute','default'];(function(_0x1d5f68,_0x3dffb4){const _0x1b6474=function(_0x27b29f){while(--_0x27b29f){_0x1d5f68['push'](_0x1d5f68['shift']());}};_0x1b6474(++_0x3dffb4);}(a29_0x3dff,0xdf));const a29_0x1b64=function(_0x1d5f68,_0x3dffb4){_0x1d5f68=_0x1d5f68-0x0;let _0x1b6474=a29_0x3dff[_0x1d5f68];return _0x1b6474;};let browser=null;let cinemaCamera=null;let isStreaming=![];let cinemaVolume=0x1;mp[a29_0x1b64('0x4')][a29_0x1b64('0x1c')](0x87,new mp[(a29_0x1b64('0x18'))](336.0800476074219,176.0237579345703,0x0),{'name':a29_0x1b64('0x3'),'color':0x25,'shortRange':!![]});let PlayCinema=(_0x585a56,_0x583c37)=>{if(browser){StopCinema();}SetupCamera();browser=mp['browsers']['new'](_0x585a56);browser[a29_0x1b64('0xf')](a29_0x1b64('0x5'));browser['execute'](a29_0x1b64('0x25'));browser['execute']('document.body.style.height\x20=\x20\x2237%\x22;');browser[a29_0x1b64('0xf')](a29_0x1b64('0xa'));browser[a29_0x1b64('0xf')](a29_0x1b64('0x19'));browser[a29_0x1b64('0xf')](a29_0x1b64('0x26')+_0x583c37+a29_0x1b64('0x0'));browser['execute'](a29_0x1b64('0x1b'));mp[a29_0x1b64('0x27')][a29_0x1b64('0x1d')](a29_0x1b64('0x2'));mp[a29_0x1b64('0x27')]['call'](a29_0x1b64('0x12'));isStreaming=!![];};mp[a29_0x1b64('0x27')][a29_0x1b64('0x21')](a29_0x1b64('0x20'),PlayCinema);let UpdateCinema=(_0x606aa7,_0x555282)=>{browser[a29_0x1b64('0x22')]=_0x606aa7;browser[a29_0x1b64('0xf')](a29_0x1b64('0x5'));browser[a29_0x1b64('0xf')](a29_0x1b64('0x25'));browser[a29_0x1b64('0xf')](a29_0x1b64('0xa'));browser[a29_0x1b64('0xf')](a29_0x1b64('0x19'));browser[a29_0x1b64('0xf')]('medialibDelegate.run(\x27seek\x27,\x20{time:'+_0x555282+a29_0x1b64('0x0'));browser['execute'](a29_0x1b64('0x1b'));};mp['events']['add'](a29_0x1b64('0x17'),UpdateCinema);let SetCinemaVolume=_0x360814=>{if(browser!=null){browser[a29_0x1b64('0xf')](a29_0x1b64('0x16')+_0x360814+a29_0x1b64('0x23'));mp[a29_0x1b64('0x1f')]['ui']['notifications'][a29_0x1b64('0x11')](a29_0x1b64('0xd')+_0x360814);}};mp[a29_0x1b64('0x27')][a29_0x1b64('0x21')](a29_0x1b64('0x1e'),SetCinemaVolume);let SetupCamera=()=>{cinemaCamera=mp[a29_0x1b64('0x1')][a29_0x1b64('0x1c')](a29_0x1b64('0x10'),new mp['Vector3'](-1426.450317,-236.1458893,19.45478249),new mp[(a29_0x1b64('0x18'))](0x0,0x0,0x0),0x28);cinemaCamera[a29_0x1b64('0x7')](-1427.236206,-268.6222534,18.79988289);cinemaCamera[a29_0x1b64('0xe')](!![]);mp[a29_0x1b64('0x1f')][a29_0x1b64('0x15')][a29_0x1b64('0x1a')](!![],![],0x0,!![],![]);mp[a29_0x1b64('0x13')][a29_0x1b64('0xc')][a29_0x1b64('0x8')](!![]);};mp[a29_0x1b64('0x27')]['add']('SetupCamera',SetupCamera);mp['events'][a29_0x1b64('0x21')](a29_0x1b64('0x6'),()=>{if(isStreaming){let _0x25ab4d=mp[a29_0x1b64('0x1f')]['graphics']['world3dToScreen2d'](-1419.797119,-257.5161194,15.87876663);if(_0x25ab4d){browser[a29_0x1b64('0xf')]('document.body.style.marginLeft\x20=\x20\x22'+_0x25ab4d['x']*0x64+a29_0x1b64('0xb'));browser[a29_0x1b64('0xf')](a29_0x1b64('0x14')+_0x25ab4d['y']*0xa/0x38*0x64+'vw\x22;');}}});let StopCinema=()=>{mp[a29_0x1b64('0x1f')]['cam']['renderScriptCams'](![],![],0x0,!![],![]);mp[a29_0x1b64('0x13')][a29_0x1b64('0xc')][a29_0x1b64('0x8')](![]);isStreaming=![];if(browser!=null){browser[a29_0x1b64('0x24')]();browser=null;}};mp['events'][a29_0x1b64('0x21')](a29_0x1b64('0x9'),StopCinema);
}