{
const a188_0x53c3=['Space','getVariable','graphics','visible','smode','modifier','notify','gameplayCam','getDirection','isDown','toFixed','Fly\x20speed\x20steady\x20decreased\x20to:\x20','setAlpha','init','add','gui','controls','local','players','events','setCoordsNoOffset','keys','game','isControlJustReleased','position','render','gameplay','getGroundZFor3dCoord','controlsIds','flying','bind','cursor','Fly:\x20~g~Enabled','isControlPressed','Fly\x20speed\x20steady\x20increased\x20to:\x20','setInvincible','setCollision'];(function(_0xe5168,_0x53c3a9){const _0x4306d5=function(_0x120560){while(--_0x120560){_0xe5168['push'](_0xe5168['shift']());}};_0x4306d5(++_0x53c3a9);}(a188_0x53c3,0x67));const a188_0x4306=function(_0xe5168,_0x53c3a9){_0xe5168=_0xe5168-0x0;let _0x4306d5=a188_0x53c3[_0xe5168];return _0x4306d5;};class Fly{constructor(){}[a188_0x4306('0x15')](){this['modifier']={'f':0x1,'w':0x1,'h':0x1};this[a188_0x4306('0x0')]=![];this[a188_0x4306('0x24')]={'F5':0x147,'W':0x20,'S':0x21,'A':0x22,'D':0x23,'Space':0x141,'LCtrl':0x146};let _0x12485f=0.2;mp['keys'][a188_0x4306('0x1')](0x6b,![],()=>{if(mp[a188_0x4306('0x17')][a188_0x4306('0x2')][a188_0x4306('0xb')]){return;}if(mp[a188_0x4306('0x1a')][a188_0x4306('0x19')][a188_0x4306('0x9')](a188_0x4306('0xc'))!==!![])return;_0x12485f+=0.005;mp[a188_0x4306('0x1e')]['graphics']['notify'](a188_0x4306('0x5')+parseFloat(_0x12485f)['toFixed'](0x4));});mp['keys']['bind'](0x6d,![],()=>{if(mp['gui'][a188_0x4306('0x2')][a188_0x4306('0xb')]){return;}if(mp['players'][a188_0x4306('0x19')][a188_0x4306('0x9')]('smode')!==!![])return;_0x12485f-=0.005;if(_0x12485f<0x0){_0x12485f=0x0;return;}mp[a188_0x4306('0x1e')]['graphics'][a188_0x4306('0xe')](a188_0x4306('0x13')+parseFloat(_0x12485f)[a188_0x4306('0x12')](0x4));});mp[a188_0x4306('0x1b')][a188_0x4306('0x16')](a188_0x4306('0x21'),()=>{let _0x16f611=mp['game'][a188_0x4306('0x18')];const _0x33819f=client[a188_0x4306('0xf')][a188_0x4306('0x10')]();if(_0x16f611[a188_0x4306('0x1f')](0x0,this['controlsIds']['F5'])&&mp[a188_0x4306('0x1a')][a188_0x4306('0x19')][a188_0x4306('0x9')](a188_0x4306('0xc'))){this['flying']=!this[a188_0x4306('0x0')];const _0x5ccbdd=mp[a188_0x4306('0x1a')][a188_0x4306('0x19')];_0x5ccbdd[a188_0x4306('0x6')](this[a188_0x4306('0x0')]);_0x5ccbdd['freezePosition'](this['flying']);_0x5ccbdd[a188_0x4306('0x14')](this[a188_0x4306('0x0')]?0x0:0xff);_0x5ccbdd[a188_0x4306('0x7')](!this[a188_0x4306('0x0')],!this[a188_0x4306('0x0')]);if(!this['flying']&&!_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')][a188_0x4306('0x8')])){let _0x44d778=mp[a188_0x4306('0x1a')]['local'][a188_0x4306('0x20')];_0x44d778['z']=mp[a188_0x4306('0x1e')][a188_0x4306('0x22')][a188_0x4306('0x23')](_0x44d778['x'],_0x44d778['y'],_0x44d778['z'],0x0,![]);mp[a188_0x4306('0x1a')][a188_0x4306('0x19')]['setCoordsNoOffset'](_0x44d778['x'],_0x44d778['y'],_0x44d778['z'],![],![],![]);}mp[a188_0x4306('0x1e')][a188_0x4306('0xa')][a188_0x4306('0xe')](this[a188_0x4306('0x0')]?a188_0x4306('0x3'):'Fly:\x20~r~Disabled');}else if(this['flying']&&mp[a188_0x4306('0x1a')][a188_0x4306('0x19')][a188_0x4306('0x9')](a188_0x4306('0xc'))){let _0x1498f7=![];let _0x46d5e4=mp[a188_0x4306('0x1a')][a188_0x4306('0x19')][a188_0x4306('0x20')];let _0x539128=![];if(mp[a188_0x4306('0x1d')][a188_0x4306('0x11')](0x12)){_0x539128=!![];this[a188_0x4306('0xd')]['f']=_0x12485f;this['modifier']['l']=_0x12485f;this[a188_0x4306('0xd')]['h']=_0x12485f;this[a188_0x4306('0xd')]['w']=_0x12485f;}if(_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')]['W'])){if(this['modifier']['f']<0x4&&!_0x539128){this[a188_0x4306('0xd')]['f']*=1.025;}_0x46d5e4['x']+=_0x33819f['x']*this[a188_0x4306('0xd')]['f'];_0x46d5e4['y']+=_0x33819f['y']*this[a188_0x4306('0xd')]['f'];_0x46d5e4['z']+=_0x33819f['z']*this[a188_0x4306('0xd')]['f'];_0x1498f7=!![];}else if(_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')]['S'])){if(this['modifier']['f']<0x4&&!_0x539128){this[a188_0x4306('0xd')]['f']*=1.025;}_0x46d5e4['x']-=_0x33819f['x']*this[a188_0x4306('0xd')]['f'];_0x46d5e4['y']-=_0x33819f['y']*this[a188_0x4306('0xd')]['f'];_0x46d5e4['z']-=_0x33819f['z']*this[a188_0x4306('0xd')]['f'];_0x1498f7=!![];}else{this[a188_0x4306('0xd')]['f']=0x1;}if(_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')]['A'])){if(this[a188_0x4306('0xd')]['l']<0x4&&!_0x539128){this[a188_0x4306('0xd')]['l']*=1.025;}_0x46d5e4['x']+=-_0x33819f['y']*this[a188_0x4306('0xd')]['l'];_0x46d5e4['y']+=_0x33819f['x']*this[a188_0x4306('0xd')]['l'];_0x1498f7=!![];}else if(_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')]['D'])){if(this[a188_0x4306('0xd')]['l']<0x4&&!_0x539128){this[a188_0x4306('0xd')]['l']*=1.05;}_0x46d5e4['x']-=-_0x33819f['y']*this[a188_0x4306('0xd')]['l'];_0x46d5e4['y']-=_0x33819f['x']*this[a188_0x4306('0xd')]['l'];_0x1498f7=!![];}else{this['modifier']['l']=0x1;}if(_0x16f611[a188_0x4306('0x4')](0x0,this[a188_0x4306('0x24')]['Space'])){if(this[a188_0x4306('0xd')]['h']<0x4&&!_0x539128){this[a188_0x4306('0xd')]['h']*=1.025;}_0x46d5e4['z']+=this[a188_0x4306('0xd')]['h'];_0x1498f7=!![];}else if(_0x16f611[a188_0x4306('0x4')](0x0,this['controlsIds']['LCtrl'])){if(this[a188_0x4306('0xd')]['h']<0x4){this['modifier']['h']*=1.05;}_0x46d5e4['z']-=this['modifier']['h'];_0x1498f7=!![];}else{this[a188_0x4306('0xd')]['h']=0x1;}if(_0x1498f7){mp[a188_0x4306('0x1a')]['local'][a188_0x4306('0x1c')](_0x46d5e4['x'],_0x46d5e4['y'],_0x46d5e4['z'],![],![],![]);}}else if(this['flying']&&!mp['players'][a188_0x4306('0x19')][a188_0x4306('0x9')]('smode')){this[a188_0x4306('0x0')]=![];player[a188_0x4306('0x7')](!this[a188_0x4306('0x0')],!this['flying']);}});}}const flyinstance=new Fly();exports=flyinstance;
}