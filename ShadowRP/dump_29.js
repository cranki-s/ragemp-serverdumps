{
let rot = 0;
let carcasin;
let carbunk;
const podiumHash = 2733879850;
const pedHash = 0xDBB17082;

mp.game.entity.createModelHideExcludingScriptObjects(1100.077,219.9723,-50.04865, 10.0, podiumHash, true);
let podium = mp.objects.new(podiumHash, new mp.Vector3(1100.077,219.9723,-50.084865));

// let ped = mp.peds.new(
    // pedHash, 
    // new mp.Vector3(1104.9641, 220.13695, -48.995),
    // 270.0,
    // 0
// );

async function rotate()
{
    rot+=0.05;
    if(rot >= 360) rot = 0;
	await podium.setRotation(0, 0, rot, 2, true);
    await carcasin.setHeading(rot);
}

mp.events.add("CAR_LOTTERY::PODIUM_LOAD_CAR_MODEL", (vModel) => {
	if(carcasin) {
		carcasin.destroy();
		carcasin = null;
	}
	carcasin = mp.vehicles.new(mp.game.joaat(vModel), new mp.Vector3(1100.077,219.9723,-50.07865),
	{
		color: [[189, 0, 132],[189,0,132]],
		locked: true
	});
	carcasin.doNotChangeAlpha = true;
	carcasin.setAllowNoPassengersLockon(true);    //no passangers
    carcasin.setCanBeVisiblyDamaged(false);       //no damages
    carcasin.setCanBreak(false);                  //can break
    carcasin.setDeformationFixed();               //fixed deformation
	carcasin.setDirtLevel(0);                     //clear
	carcasin.setDisablePetrolTankDamage(true);    //disable fueltank damage
	carcasin.setDisablePetrolTankFires(true);     //disable fire fuel
	carcasin.setDoorsLockedForAllPlayers(true);   //locked door
	carcasin.freezePosition(true);                //freeze
	carcasin.setInvincible(true);                 //godmode
	carcasin.setDoorsLocked(2);			
	mp.events.add("render", rotate);
});

mp.events.add("CAR_BUNKER_LOAD", () => {
	if(carbunk) {
		carbunk.destroy();
		carbunk = null;
	}
	// carbunk = mp.vehicles.new(mp.game.joaat("trailerlarge"), new mp.Vector3(838.2632, -3236.3223, -98.12322),
	// {
		// color: [[0, 0, 0],[0,0,0]],
		// locked: true
	// });
	// carbunk.doNotChangeAlpha = true;
	// carbunk.setAllowNoPassengersLockon(true);    //no passangers
    // carbunk.setCanBeVisiblyDamaged(false);       //no damages
    // carbunk.setCanBreak(false);                  //can break
    // carbunk.setDeformationFixed();               //fixed deformation
	// carbunk.setDirtLevel(0);                     //clear
	// carbunk.setDisablePetrolTankDamage(true);    //disable fueltank damage
	// carbunk.setDisablePetrolTankFires(true);     //disable fire fuel
	// carbunk.setDoorsLockedForAllPlayers(true);   //locked door
	// carbunk.freezePosition(true);                //freeze
	// carbunk.setInvincible(true);                 //godmode
	// carbunk.setDoorsLocked(2);			
	// carbunk.setHeading(-191);		
});

mp.events.add('cameracasinoenter', () =>  {
	mp.events.call('showHUD', false);
	mp.players.local.taskGoToCoordAnyMeans(930.6178, 42.741196, 81.095746, 1, 0, false, 12, 1000);
	casinoCamera2 = mp.cameras.new('default', new mp.Vector3(918.7273, 61.51398, 82.96249), new mp.Vector3(0,0,0), 45);
	casinoCamera2.setRot(-15, 0.0, 200.0, 2);
	casinoCamera2.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 0, true, true);
	setTimeout( function() {
		casinoCamera2.destroy(true);
		casinoCamera2 = null;
		mp.game.cam.renderScriptCams(true, true, 0, true, true);
		casinoCamera = mp.cameras.new('default', new mp.Vector3(810.8696, 37.823143, 94.42292), new mp.Vector3(0,0,0), 45);
		casinoCamera.setRot(0, 0.0, 270.0, 2);
		casinoCamera.setActive(true);
	}, 3500);
  });
mp.events.add('cameracasinoexit', () =>  {
	casinoCamera.destroy(true);
	mp.events.call('showHUD', true);
	casinoCamera = null;
	mp.game.cam.renderScriptCams(false, true, 0, true, false);
  });
}