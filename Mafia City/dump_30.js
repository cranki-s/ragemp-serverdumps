{
const a112_0x3107=['browsers','0x1CDD6BADC297830D','truckingLockDoors','RequestTruckingStart','fAntiRollBarBiasFront','parse','dropoff','CollisionDamageMult','fRollCentreHeightRear','fInitialDriveMaxFlatVel','freezePosition','fSuspensionRaise','fInitialDriveForce','truckingCreateDropoff','fDeformationDamageMult','truckingUnlockDoors','fPetrolTankVolume','fHandBrakeForce','fBrakeBiasFront','fTractionCurveMin','interactionPressed','fTractionLossMult','fInitialDragCoeff','fWeaponDamageMult','CloseTruckerUI','cursor','nInitialDriveGears','atHandle','add','controls','fRollCentreHeightFront','fOilVolume','playerExitColshape','callRemote','Press\x20\x27Y\x27\x20to\x20start\x20loading\x20your\x20truck.','truckingStartDropoff','vehicle','fDriveInertia','fDriveBiasFront','newSphere','setDoorsLocked','fClutchChangeRateScaleDownShift','graphics','OpenTruckerUI','getVariable','DetachTrailer','detachFromTrailer','gui','truckingStartLoading','fTractionSpringDeltaMax','Press\x20\x27Y\x27\x20to\x20start\x20dropping\x20off\x20your\x20load.','loading','colshapes','visible','fBrakeForce','FreezePosition','new','local','game','destroy','notify','fLowSpeedTractionLossMult','setHandling','events','getTruckersLicense(','You\x20must\x20be\x20in\x20the\x20vehicle\x20to\x20load\x20it!','trailerAttached','handle','players','oldTrailer','disableControlAction','execute','truckingCreateLoading'];(function(_0x11accd,_0x31071d){const _0x1c0761=function(_0x50ea20){while(--_0x50ea20){_0x11accd['push'](_0x11accd['shift']());}};_0x1c0761(++_0x31071d);}(a112_0x3107,0xae));const a112_0x1c07=function(_0x11accd,_0x31071d){_0x11accd=_0x11accd-0x0;let _0x1c0761=a112_0x3107[_0x11accd];return _0x1c0761;};let FreezePosition=()=>{mp['players'][a112_0x1c07('0x1d')][a112_0x1c07('0x37')](!![]);if(mp[a112_0x1c07('0x28')]['local'][a112_0x1c07('0x8')]){mp[a112_0x1c07('0x28')]['local'][a112_0x1c07('0x8')][a112_0x1c07('0x37')](!![]);mp[a112_0x1c07('0x1e')]['controls'][a112_0x1c07('0x2a')](0xd,0x4b,!![]);}};mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x1b'),FreezePosition);let UnfreezePosition=()=>{mp[a112_0x1c07('0x28')]['local'][a112_0x1c07('0x37')](![]);if(mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')]){mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')][a112_0x1c07('0x37')](![]);mp[a112_0x1c07('0x1e')][a112_0x1c07('0x1')]['disableControlAction'](0xd,0x4b,![]);}};mp['events'][a112_0x1c07('0x0')]('UnfreezePosition',UnfreezePosition);let DetachTrailer=()=>{mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')][a112_0x1c07('0x12')]();};mp['events']['add'](a112_0x1c07('0x11'),DetachTrailer);mp['events'][a112_0x1c07('0x0')]('cefEndTrucking',()=>{mp[a112_0x1c07('0x23')][a112_0x1c07('0x5')]('endTrucking');TeardownTruckerBrowser();});let currentColshape=null;let inLoading=![];let inDropoff=![];let truckerBrowser;let OpenTruckerUI=_0x3974d9=>{if(!truckerBrowser){truckerBrowser=mp[a112_0x1c07('0x2d')][a112_0x1c07('0x1c')]('package://roleplay/UI/trucker/index.html');truckerBrowser[a112_0x1c07('0x2b')](a112_0x1c07('0x24')+_0x3974d9+')');mp[a112_0x1c07('0x13')][a112_0x1c07('0x46')][a112_0x1c07('0x19')]=!![];}else{TeardownTruckerBrowser();}};mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0xf'),OpenTruckerUI);function TeardownTruckerBrowser(){if(truckerBrowser){truckerBrowser[a112_0x1c07('0x1f')]();truckerBrowser=null;mp[a112_0x1c07('0x13')][a112_0x1c07('0x46')]['visible']=![];}}mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x45'),TeardownTruckerBrowser);let RequestTruckingStart=(_0x49588e,_0x3fa918)=>{TeardownTruckerBrowser();mp[a112_0x1c07('0x23')]['callRemote'](a112_0x1c07('0x30'),_0x49588e,_0x3fa918);};mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x30'),RequestTruckingStart);mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x2f'),_0xa33a41=>{_0xa33a41[a112_0x1c07('0x37')](!![]);_0xa33a41[a112_0x1c07('0xc')](0x4);});mp['events'][a112_0x1c07('0x0')](a112_0x1c07('0x3c'),_0xa72ed7=>{_0xa72ed7[a112_0x1c07('0x37')](![]);if(_0xa72ed7['locked']){_0xa72ed7[a112_0x1c07('0xc')](0x2);}else{_0xa72ed7['setDoorsLocked'](0x1);}});mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x3a'),_0x27d28a=>{const _0x3ba61c=JSON[a112_0x1c07('0x32')](_0x27d28a);currentColshape=mp[a112_0x1c07('0x18')]['newSphere'](_0x3ba61c['x'],_0x3ba61c['y'],_0x3ba61c['z'],0x5);currentColshape[a112_0x1c07('0x33')]=!![];});mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')](a112_0x1c07('0x2c'),_0xa514a4=>{const _0x28dff5=JSON[a112_0x1c07('0x32')](_0xa514a4);currentColshape=mp[a112_0x1c07('0x18')][a112_0x1c07('0xb')](_0x28dff5['x'],_0x28dff5['y'],_0x28dff5['z'],0x5);currentColshape[a112_0x1c07('0x17')]=!![];});mp['events'][a112_0x1c07('0x0')]('playerEnterColshape',_0x3e0aa8=>{if(_0x3e0aa8['loading']){mp[a112_0x1c07('0x1e')][a112_0x1c07('0xe')]['notify'](a112_0x1c07('0x6'));inLoading=!![];}if(_0x3e0aa8[a112_0x1c07('0x33')]){mp[a112_0x1c07('0x1e')][a112_0x1c07('0xe')][a112_0x1c07('0x20')](a112_0x1c07('0x16'));inDropoff=!![];}});mp['events'][a112_0x1c07('0x0')](a112_0x1c07('0x4'),_0x17941d=>{if(_0x17941d[a112_0x1c07('0x17')]){inLoading=![];}if(_0x17941d['dropoff']){inDropoff=![];}});mp[a112_0x1c07('0x23')]['add']('truckingResetData',()=>{inDropoff=![];inLoading=![];if(currentColshape!=null){currentColshape['destroy']();currentColshape=null;}});mp[a112_0x1c07('0x23')]['add'](a112_0x1c07('0x41'),()=>{if(inLoading){if(!mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')]){return mp[a112_0x1c07('0x1e')][a112_0x1c07('0xe')][a112_0x1c07('0x20')](a112_0x1c07('0x25'));}mp[a112_0x1c07('0x23')][a112_0x1c07('0x5')](a112_0x1c07('0x14'));}else if(inDropoff){if(!mp[a112_0x1c07('0x28')]['local'][a112_0x1c07('0x8')]){return mp['game'][a112_0x1c07('0xe')][a112_0x1c07('0x20')]('You\x20must\x20be\x20in\x20the\x20vehicle\x20to\x20unload\x20it!');}mp[a112_0x1c07('0x23')][a112_0x1c07('0x5')](a112_0x1c07('0x7'));}});setInterval(()=>{if(mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')]){if(mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')]['isAttachedToTrailer']()){let _0x3e02da=[0x0];mp[a112_0x1c07('0x1e')]['invoke'](a112_0x1c07('0x2e'),mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')][a112_0x1c07('0x27')],_0x3e02da);_0x3e02da=mp['vehicles'][a112_0x1c07('0x48')](_0x3e02da[0x0]);if(mp['players']['local'][a112_0x1c07('0x8')][a112_0x1c07('0x10')](a112_0x1c07('0x29'))!=_0x3e02da['remoteId']){mp[a112_0x1c07('0x23')]['callRemote'](a112_0x1c07('0x26'),mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')],_0x3e02da);}}else{if(mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')][a112_0x1c07('0x10')](a112_0x1c07('0x29'))){mp[a112_0x1c07('0x23')][a112_0x1c07('0x5')](a112_0x1c07('0x26'),mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')],null);}}}},0x3e8);let setTruckHandling=()=>{if(mp[a112_0x1c07('0x28')]['local'][a112_0x1c07('0x8')]){let _0x5560bc=mp[a112_0x1c07('0x28')][a112_0x1c07('0x1d')][a112_0x1c07('0x8')];_0x5560bc['setHandling']('fMass',0x4650);_0x5560bc['setHandling'](a112_0x1c07('0x43'),0xc);_0x5560bc[a112_0x1c07('0x22')]('fPercentSubmerged',0xc8);_0x5560bc['setHandling'](a112_0x1c07('0xa'),0x0);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x47'),0x5);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x39'),0.3);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x9'),0x1);_0x5560bc[a112_0x1c07('0x22')]('fClutchChangeRateScaleUpShift',3.3);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0xd'),3.3);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x36'),0x82);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x1a'),0.85);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x3f'),0.45);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x3e'),0.15);_0x5560bc[a112_0x1c07('0x22')]('fSteeringLock',0.75);_0x5560bc[a112_0x1c07('0x22')]('fTractionCurveMax',2.05);_0x5560bc['setHandling'](a112_0x1c07('0x40'),1.95);_0x5560bc['setHandling']('fTractionCurveLateral',0x14);_0x5560bc['setHandling'](a112_0x1c07('0x15'),0.15);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x21'),0x0);_0x5560bc[a112_0x1c07('0x22')]('fCamberStiffnesss',0x0);_0x5560bc['setHandling'](a112_0x1c07('0x42'),0x1);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x38'),0x0);_0x5560bc['setHandling']('fSuspensionBiasFront',0.5);_0x5560bc['setHandling']('fAntiRollBarForce',0x0);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x31'),0x0);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x2'),0.58);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x35'),0.58);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x34'),0.2);_0x5560bc['setHandling'](a112_0x1c07('0x44'),0.4);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x3b'),0.2);_0x5560bc['setHandling']('fEngineDamageMult',0.3);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x3d'),0x41);_0x5560bc[a112_0x1c07('0x22')](a112_0x1c07('0x3'),0x5);}};mp[a112_0x1c07('0x23')][a112_0x1c07('0x0')]('setTruckHandling',setTruckHandling);
}