{
const a3_0x1f61=['destroy','There\x20was\x20no\x20object\x20found\x20in\x20front\x20of\x20you.','Model','Pos','add','uimanager','visible','execute','joaat','events','show','players','game','callRemote','package://roleplay/UI/DoorEditor/DoorEditor.html','bind','chat','prop_gate_docks_ld','browsers','Rot','match','0x3FEF770D40960D5A','getDirection','isBlockingButtons','AttemptLockDoor','v_ilev_mm_doorm_r','v_ilev_bl_shutter2','split','gameplay','cameras','Vector3','saveEditedDoor','hotkeyManager','local','loadData(\x27','toFixed','Toggle_Door_Lock','new','atRemoteId','0x9F47B058362C84B5','getKey','invokeVector3','v_ilev_mm_door','addDoorToSystem','coord','keybinding','gui','updateDoorStatus','stringify','addDoorSelect','rotation','model','\x27,\x20\x27','openEditDoorMenu','ObjectId','cursor','browserDomReady','\x27,\x20','prop_ld_garaged_01','position','freezePosition','object','objects','testPointToPoint','testprop_abat_slide','doorControl','entity','forEach','prop_bh1_48_backdoor_l','prop_bh1_48_backdoor_r'];(function(_0x2f05cd,_0x1f6136){const _0x392dcc=function(_0x325748){while(--_0x325748){_0x2f05cd['push'](_0x2f05cd['shift']());}};_0x392dcc(++_0x1f6136);}(a3_0x1f61,0x129));const a3_0x392d=function(_0x2f05cd,_0x1f6136){_0x2f05cd=_0x2f05cd-0x0;let _0x392dcc=a3_0x1f61[_0x2f05cd];return _0x392dcc;};let editingDoor=null;let menu=null;let doorsToUnlock=[{'coord':[962.908,-2105.914,32.52716],'model':a3_0x392d('0x2f')},{'coord':[109.0922,6617.629,32.67305],'model':'v_ilev_carmod3door'},{'coord':[3627.927,3747.022,27.69009],'model':a3_0x392d('0x9')},{'coord':[-187.3406,-2515.309,5.047173],'model':a3_0x392d('0x0')},{'coord':[-202.6151,-2515.309,5.047173],'model':a3_0x392d('0x0')},{'coord':[19.40451,-2529.702,5.047173],'model':'prop_gate_docks_ld'},{'coord':[10.64414,-2542.213,5.047173],'model':a3_0x392d('0x0')}];doorsToUnlock[a3_0x392d('0x32')](_0x4fb77e=>{mp['game']['object'][a3_0x392d('0x30')](mp[a3_0x392d('0x41')][a3_0x392d('0x3d')](_0x4fb77e['model']),_0x4fb77e[a3_0x392d('0x1b')][0x0],_0x4fb77e[a3_0x392d('0x1b')][0x1],_0x4fb77e['coord'][0x2],![],0x0,0x0,0x0);});let doorsToLock=[{'coord':[-816.716,179.098,72.82738],'model':'v_ilev_mm_doorm_l'},{'coord':[-816.1068,177.5109,72.82738],'model':a3_0x392d('0x8')},{'coord':[-815.2816,185.975,72.99993],'model':a3_0x392d('0x29')},{'coord':[-806.2817,186.0246,72.62405],'model':a3_0x392d('0x19')},{'coord':[-796.5657,177.2214,73.04045],'model':a3_0x392d('0x33')},{'coord':[-794.5051,178.0124,73.04045],'model':a3_0x392d('0x34')},{'coord':[-793.3943,180.5075,73.04045],'model':a3_0x392d('0x33')},{'coord':[-794.1853,182.568,73.04045],'model':a3_0x392d('0x34')}];doorsToLock[a3_0x392d('0x32')](_0x4d71ab=>{mp['game'][a3_0x392d('0x2c')][a3_0x392d('0x30')](mp[a3_0x392d('0x41')][a3_0x392d('0x3d')](_0x4d71ab[a3_0x392d('0x22')]),_0x4d71ab[a3_0x392d('0x1b')][0x0],_0x4d71ab[a3_0x392d('0x1b')][0x1],_0x4d71ab[a3_0x392d('0x1b')][0x2],!![],0x0,0x0,0x0);});client[a3_0x392d('0x1c')][a3_0x392d('0x44')](client[a3_0x392d('0xf')][a3_0x392d('0x17')](a3_0x392d('0x13')),()=>{if(mp[a3_0x392d('0x1d')][a3_0x392d('0x26')][a3_0x392d('0x3b')]){return;}if(!client[a3_0x392d('0x3a')][a3_0x392d('0x6')]()){mp['events']['callRemote'](a3_0x392d('0x7'));}});mp[a3_0x392d('0x3e')][a3_0x392d('0x39')](a3_0x392d('0x1e'),_0x1d2b5b=>{if(_0x1d2b5b['Locked']==0x1){mp[a3_0x392d('0x41')][a3_0x392d('0x2c')][a3_0x392d('0x30')](_0x1d2b5b[a3_0x392d('0x37')],_0x1d2b5b[a3_0x392d('0x38')]['x'],_0x1d2b5b[a3_0x392d('0x38')]['y'],_0x1d2b5b['Pos']['z'],!![],0x0,0x0,0x0);}else{mp[a3_0x392d('0x41')][a3_0x392d('0x2c')][a3_0x392d('0x30')](_0x1d2b5b['Model'],_0x1d2b5b['Pos']['x'],_0x1d2b5b[a3_0x392d('0x38')]['y'],_0x1d2b5b[a3_0x392d('0x38')]['z'],![],0x0,0x0,0x0);}});mp['events'][a3_0x392d('0x39')](a3_0x392d('0x24'),_0x2c55eb=>{editingDoor=_0x2c55eb;menu=mp[a3_0x392d('0x1')][a3_0x392d('0x14')](a3_0x392d('0x43'));mp['events'][a3_0x392d('0x39')](a3_0x392d('0x27'),_0x1bbf2d=>{if(_0x1bbf2d==menu){_0x1bbf2d[a3_0x392d('0x3c')](a3_0x392d('0x11')+_0x2c55eb['Id']+a3_0x392d('0x23')+_0x2c55eb[a3_0x392d('0x37')]+'\x27,\x20\x27'+_0x2c55eb[a3_0x392d('0x38')]['x'][a3_0x392d('0x12')](0x2)+a3_0x392d('0x23')+_0x2c55eb[a3_0x392d('0x38')]['y'][a3_0x392d('0x12')](0x2)+a3_0x392d('0x23')+_0x2c55eb['Pos']['z'][a3_0x392d('0x12')](0x2)+'\x27,\x20\x27'+_0x2c55eb[a3_0x392d('0x2')]['x'][a3_0x392d('0x12')](0x2)+a3_0x392d('0x23')+_0x2c55eb[a3_0x392d('0x2')]['y']['toFixed'](0x2)+a3_0x392d('0x23')+_0x2c55eb[a3_0x392d('0x2')]['z'][a3_0x392d('0x12')](0x2)+a3_0x392d('0x23')+_0x2c55eb['Owner']+a3_0x392d('0x28')+_0x2c55eb['Exists']+');');}});mp['players'][a3_0x392d('0x10')][a3_0x392d('0x2b')](!![]);mp[a3_0x392d('0x1d')][a3_0x392d('0x26')][a3_0x392d('0x3f')](!![],!![]);mp[a3_0x392d('0x1d')][a3_0x392d('0x45')][a3_0x392d('0x3f')](![]);});mp[a3_0x392d('0x3e')][a3_0x392d('0x39')]('editDoorResult',(_0x1d70df,_0x426835,_0x39a03d,_0xc6e0e4)=>{mp[a3_0x392d('0x3e')]['callRemote'](a3_0x392d('0xe'),editingDoor['Id'],_0x1d70df,_0x426835,_0x39a03d,_0xc6e0e4);menu[a3_0x392d('0x35')]();menu=null;editingDoor=null;mp[a3_0x392d('0x40')][a3_0x392d('0x10')][a3_0x392d('0x2b')](![]);mp[a3_0x392d('0x1d')][a3_0x392d('0x26')][a3_0x392d('0x3f')](![],![]);mp['gui'][a3_0x392d('0x45')]['show'](!![]);});mp[a3_0x392d('0x3e')]['add']('quickDoorPosition',(_0x16602f,_0x1c937c)=>{let _0x4f2556=/^-?[0-9.]+\s+-?[0-9.]+\s+-?[0-9.]+$/g;if(_0x16602f['match'](_0x4f2556)!=null&&_0x1c937c[a3_0x392d('0x3')](_0x4f2556)!=null){var _0x57a865=_0x16602f[a3_0x392d('0xa')]('\x20');var _0x12cac7=_0x1c937c[a3_0x392d('0xa')]('\x20');mp['objects'][a3_0x392d('0x15')](editingDoor['ObjectId'])[a3_0x392d('0x2a')]=new mp[(a3_0x392d('0xd'))](parseFloat(_0x57a865[0x0]),parseFloat(_0x57a865[0x1]),parseFloat(_0x57a865[0x2]));mp[a3_0x392d('0x2d')][a3_0x392d('0x15')](editingDoor[a3_0x392d('0x25')])[a3_0x392d('0x21')]=new mp[(a3_0x392d('0xd'))](parseFloat(_0x12cac7[0x0]),parseFloat(_0x12cac7[0x1]),parseFloat(_0x12cac7[0x2]));}});mp['events']['add'](a3_0x392d('0x20'),()=>{let _0x244612=pointingAt(0x5);if(_0x244612!=undefined){let _0x482572=mp['game']['invoke'](a3_0x392d('0x16'),_0x244612[a3_0x392d('0x31')]);mp[a3_0x392d('0x3e')][a3_0x392d('0x42')](a3_0x392d('0x1a'),_0x482572,JSON[a3_0x392d('0x1f')](_0x244612[a3_0x392d('0x2a')]));}else{mp[a3_0x392d('0x1d')]['chat']['push'](a3_0x392d('0x36'));}});mp[a3_0x392d('0x3e')][a3_0x392d('0x39')]('interact:addDoorToSystem',_0x185ac8=>{let _0x4fc2f1=mp[a3_0x392d('0x41')]['invoke'](a3_0x392d('0x16'),_0x185ac8);let _0xedbc6b=mp['game'][a3_0x392d('0x18')](a3_0x392d('0x4'),_0x185ac8,![]);mp[a3_0x392d('0x3e')][a3_0x392d('0x42')](a3_0x392d('0x1a'),_0x4fc2f1,JSON[a3_0x392d('0x1f')](_0xedbc6b));});function pointingAt(_0x4e9e8a){const _0x2cf0ca=mp[a3_0x392d('0xc')][a3_0x392d('0x14')](a3_0x392d('0xb'));let _0x1f2293=_0x2cf0ca['getCoord']();let _0x76bab4=_0x2cf0ca[a3_0x392d('0x5')]();let _0x269e16=new mp[(a3_0x392d('0xd'))](_0x76bab4['x']*_0x4e9e8a+_0x1f2293['x'],_0x76bab4['y']*_0x4e9e8a+_0x1f2293['y'],_0x76bab4['z']*_0x4e9e8a+_0x1f2293['z']);let _0x12d410=mp['raycasting'][a3_0x392d('0x2e')](_0x1f2293,_0x269e16,[0x1,0x10]);return _0x12d410;}
}