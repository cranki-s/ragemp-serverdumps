{
const a115_0x287a=['split','keys','indexOf','values','filter','./roleplay/Modules/keybindings/Keys.js','handlers','logError','downHandler','shift','handler','onUp','addModifier','The\x20keyup-event\x20doesn\x27t\x20support\x20modifiers!','_startKeyListener','_stopKeyListener','ERROR:\x20','modifiers','pressedKeys','unbind','ctrl','key','length','upHandler','push','\x20is\x20not\x20a\x20valid\x20modifier!','alt','bind','includes','_handleKeyDown','keyListeners','splice','binds','pop','Keys','hasOwnProperty','forEach','ignorePresses','\x20is\x20not\x20a\x20valid\x20key!','console','toLowerCase','stringify'];(function(_0x30a373,_0x287a2c){const _0x1e99e5=function(_0x78dc81){while(--_0x78dc81){_0x30a373['push'](_0x30a373['shift']());}};_0x1e99e5(++_0x287a2c);}(a115_0x287a,0x130));const a115_0x1e99=function(_0x30a373,_0x287a2c){_0x30a373=_0x30a373-0x0;let _0x1e99e5=a115_0x287a[_0x30a373];return _0x1e99e5;};const {Keys}=require(a115_0x1e99('0x25'));class BetterBinding{constructor(){this[a115_0x1e99('0x8')]={};this['binds']={};this[a115_0x1e99('0x14')]={};this['modifiers']=[Keys[a115_0x1e99('0xa')],Keys[a115_0x1e99('0x10')],Keys[a115_0x1e99('0x29')]];this[a115_0x1e99('0x1b')]=![];}['_handleKeyDown'](_0x13829c){if(this[a115_0x1e99('0x1b')])return;this['pressedKeys'][_0x13829c]=!![];Object['values'](this[a115_0x1e99('0x16')])[a115_0x1e99('0x24')](_0x52fb92=>_0x52fb92[a115_0x1e99('0x7')][a115_0x1e99('0x12')](_0x13829c)||_0x52fb92[a115_0x1e99('0xb')]===_0x13829c)[a115_0x1e99('0x1a')](_0x250d4a=>{if(_0x250d4a[a115_0x1e99('0x7')][a115_0x1e99('0xc')]>0x0&&_0x250d4a['modifiers'][a115_0x1e99('0x24')](_0x1438b6=>!this[a115_0x1e99('0x8')][_0x1438b6])[a115_0x1e99('0xc')]===0x0&&this[a115_0x1e99('0x8')][_0x250d4a['key']]||_0x250d4a['modifiers'][a115_0x1e99('0xc')]===0x0){let _0x2ff7e5=_0x250d4a[a115_0x1e99('0x26')][a115_0x1e99('0x24')](_0x36f8e9=>!_0x36f8e9['onUp']);for(let _0x1908d8=0x0;_0x1908d8<_0x2ff7e5['length'];_0x1908d8++){try{_0x2ff7e5[_0x1908d8][a115_0x1e99('0x0')]();}catch(_0x5f1366){mp[a115_0x1e99('0x1d')][a115_0x1e99('0x27')](a115_0x1e99('0x6')+JSON[a115_0x1e99('0x1f')](_0x5f1366),!![]);}}}});}['_handleKeyUp'](_0x571822){if(this['ignorePresses'])return;delete this[a115_0x1e99('0x8')][_0x571822];Object[a115_0x1e99('0x23')](this['binds'])['filter'](_0x233754=>_0x233754[a115_0x1e99('0xb')]===_0x571822)['forEach'](_0xa0dad7=>{let _0x29cab9=_0xa0dad7[a115_0x1e99('0x26')][a115_0x1e99('0x24')](_0x540000=>_0x540000[a115_0x1e99('0x1')]);for(let _0x473e46=0x0;_0x473e46<_0x29cab9[a115_0x1e99('0xc')];_0x473e46++){try{_0x29cab9[_0x473e46][a115_0x1e99('0x0')]();}catch(_0x157ed4){mp['console'][a115_0x1e99('0x27')](a115_0x1e99('0x6')+JSON[a115_0x1e99('0x1f')](_0x157ed4),!![]);}}});}[a115_0x1e99('0x11')](_0x51206f,_0x2ac6e1,_0x5ef4af){_0x51206f=_0x51206f[a115_0x1e99('0x1e')]();_0x5ef4af=_0x5ef4af||![];let _0x445d73=_0x51206f[a115_0x1e99('0x20')](/\+/);let _0x5537df=_0x445d73[a115_0x1e99('0x17')]();if(Keys[_0x5537df]){_0x5537df=Keys[_0x5537df];}else{throw new Error(_0x5537df+a115_0x1e99('0x1c'));}for(let _0x5529dc=0x0;_0x5529dc<_0x445d73[a115_0x1e99('0xc')];_0x5529dc++){if(Keys[_0x445d73[_0x5529dc]]&&this['modifiers'][a115_0x1e99('0x12')](Keys[_0x445d73[_0x5529dc]])){_0x445d73[_0x5529dc]=Keys[_0x445d73[_0x5529dc]];}else{throw new Error(_0x445d73[_0x5529dc]+a115_0x1e99('0xf'));}}if(_0x5ef4af&&_0x445d73[a115_0x1e99('0xc')]>0x0){throw new Error(a115_0x1e99('0x3'));}if(this[a115_0x1e99('0x16')][_0x51206f]){this[a115_0x1e99('0x16')][_0x51206f][a115_0x1e99('0x26')]['push']({'handler':_0x2ac6e1,'onUp':_0x5ef4af});}else{[..._0x445d73,_0x5537df]['filter'](_0x3fbc55=>!this[a115_0x1e99('0x14')][a115_0x1e99('0x19')](_0x3fbc55))['forEach'](_0x1c06e0=>this[a115_0x1e99('0x4')](_0x1c06e0));this[a115_0x1e99('0x16')][_0x51206f]={'modifiers':_0x445d73,'key':_0x5537df,'handlers':[{'handler':_0x2ac6e1,'onUp':_0x5ef4af}]};}return()=>{this[a115_0x1e99('0x9')](_0x51206f,_0x2ac6e1);};}[a115_0x1e99('0x9')](_0x54edc3,_0x5e51e4){_0x54edc3=_0x54edc3[a115_0x1e99('0x1e')]();let _0x24c113=this['binds'][_0x54edc3];if(_0x24c113){let _0x17aff5=_0x24c113[a115_0x1e99('0x26')][a115_0x1e99('0x22')](_0x5e51e4);if(_0x17aff5!==-0x1){_0x24c113[a115_0x1e99('0x26')]['splice'](_0x17aff5,0x1);if(_0x24c113[a115_0x1e99('0x26')][a115_0x1e99('0xc')]===0x0){delete this[a115_0x1e99('0x16')][_0x54edc3];this['_cleanKeyListeners']([..._0x24c113['modifiers'],_0x24c113['key']]);}}}}[a115_0x1e99('0x4')](_0x3307d9){this[a115_0x1e99('0x14')][_0x3307d9]={'downHandler':()=>{this[a115_0x1e99('0x13')](_0x3307d9);},'upHandler':()=>{this['_handleKeyUp'](_0x3307d9);}};mp[a115_0x1e99('0x21')][a115_0x1e99('0x11')](_0x3307d9,!![],this[a115_0x1e99('0x14')][_0x3307d9][a115_0x1e99('0x28')]);mp[a115_0x1e99('0x21')][a115_0x1e99('0x11')](_0x3307d9,![],this[a115_0x1e99('0x14')][_0x3307d9][a115_0x1e99('0xd')]);}[a115_0x1e99('0x5')](_0xb18a48){if(this[a115_0x1e99('0x14')][_0xb18a48]){mp['keys']['unbind'](_0xb18a48,!![],this[a115_0x1e99('0x14')][_0xb18a48][a115_0x1e99('0x28')]);mp['keys']['unbind'](_0xb18a48,![],this[a115_0x1e99('0x14')][_0xb18a48][a115_0x1e99('0xd')]);delete this[a115_0x1e99('0x14')][_0xb18a48];}}['_cleanKeyListeners'](_0x16ca10){_0x16ca10[a115_0x1e99('0x24')](_0x38798f=>Object[a115_0x1e99('0x23')](this[a115_0x1e99('0x16')])[a115_0x1e99('0x24')](_0x291e63=>_0x291e63[a115_0x1e99('0x7')][a115_0x1e99('0x12')](_0x38798f)||_0x291e63[a115_0x1e99('0xb')]===_0x38798f)['length']===0x0)[a115_0x1e99('0x1a')](_0x196378=>{this[a115_0x1e99('0x5')](_0x196378);});}[a115_0x1e99('0x2')](_0x2020ff){if(Keys[_0x2020ff]){_0x2020ff=Keys[_0x2020ff];}else{throw new Error(_0x2020ff+'\x20is\x20not\x20a\x20valid\x20key!');}if(!this[a115_0x1e99('0x7')][a115_0x1e99('0x12')](_0x2020ff)){this['modifiers'][a115_0x1e99('0xe')](_0x2020ff);}}['delModifier'](_0x1d1c06){if(Keys[_0x1d1c06]){_0x1d1c06=Keys[_0x1d1c06];}else{throw new Error(_0x1d1c06+a115_0x1e99('0x1c'));}if(!this[a115_0x1e99('0x7')][a115_0x1e99('0x22')](_0x1d1c06)!==-0x1){this['modifiers'][a115_0x1e99('0x15')](this['modifiers']['indexOf'](_0x1d1c06),0x1);}}}const betterBinding=new BetterBinding();exports['BetterBindings']=betterBinding;exports[a115_0x1e99('0x18')]=Keys;
}