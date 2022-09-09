{
let canDoBets = true;
let betObject = null;
let closestChipSpot = null;
let rouletteTable = null;
let rouletteSeat = null;
let startRoullete = false;
let roulleteCam = false;
var blockControls = false;
var setBet = false;

let RouletteTables = [];

let betRoulette = [
    [],
    []
];


var CasinoPeds = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1145.337, 267.7967, -51.8409), Angle: 47.5},
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1149.791, 263.1628, -51.8409), Angle: 222.2},
];

var PrizePed = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1087.727, 221.20876, -49.220415), Angle: 178},
];


const RouletteTablesSeatsHeading = [
    [45,-45,-135,-135],
    [225,135,45,45],

    [110.5,65.5,20.5, 330.5],
    [216.5,161.5,116.5, 66.5],
];

const RouletteSeats = {
    0: "Chair_Base_04",
    1: "Chair_Base_03",
    2: "Chair_Base_02",
    3: "Chair_Base_01"
};


var CasinoPedsID = [];

var rouletteCamera = null;
var betCoords = null;

const RouletteCameraPos = [

    new mp.Vector3(1143.73, 268.9541, -52.960873 + 3.5),
    new mp.Vector3(1151.4585, 262.04517, -52.96084 + 3.5),
];


const RouletteCameraRot = [
	225,
   45
];


const RouletteCameraRotStop = [
	[-173, -112, -160],
	[13, 68, 17]
];



const RouletteTablesPos = [
    new mp.Vector3(1144.814, 268.2634, -52.8409),
    new mp.Vector3(1150.355, 262.7224, -52.8409),
];


const RouletteTablesHeading = [
    -135,
    45
];


setTimeout(function () {
for(let tbs = 0; tbs < RouletteTablesPos.length; tbs++){
    RouletteTables[tbs] = {};
    RouletteTables[tbs].table = mp.objects.new(mp.game.joaat('vw_prop_casino_roulette_01'), new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z), {
        rotation: new mp.Vector3(0, 0, RouletteTablesHeading[tbs]),
        alpha: 255,
        dimension: 0
    });
    RouletteTables[tbs].ball = mp.objects.new(87196104, new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z));
}
}, 1000);


setTimeout(function () {
    mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
    let n = 0;
    CasinoPeds.forEach(ped => {
        CasinoPedsID[n] = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        CasinoPedsID[n].setComponentVariation(0, 2, 1, 0);
        CasinoPedsID[n].setComponentVariation(1, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(2, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(3, 0, n + 2, 0);
        CasinoPedsID[n].setComponentVariation(4, 0, 0, 0);
        CasinoPedsID[n].setComponentVariation(6, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(7, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(8, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(10, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(11, 1, 0, 0);
        CasinoPedsID[n].setConfigFlag(185, true);
        CasinoPedsID[n].setConfigFlag(108, true);
        CasinoPedsID[n].setConfigFlag(208, true);
        CasinoPedsID[n].taskPlayAnim("anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
        n = n + 1;
        //CasinoPedsID[0].playFacialAnim("idle_facial", "anim_casino_b@amb@casino@games@shared@dealer@");
        //mp.game.invoke("0xEA47FE3719165B94", CasinoPedsID[0].handle, "anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
    });
	n = 0;

	PrizePed.forEach(ped => {
		var ped = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        ped.setComponentVariation(0, 2, 1, 0);
        ped.setComponentVariation(1, 1, 0, 0);
		ped.setComponentVariation(2, 2, 0, 0);
        ped.setComponentVariation(3, 0, n + 2, 0);
        ped.setComponentVariation(4, 0, 0, 0);
        ped.setComponentVariation(6, 1, 0, 0);
        ped.setComponentVariation(7, 2, 0, 0);
        ped.setComponentVariation(8, 1, 0, 0);
        ped.setComponentVariation(10, 1, 0, 0);
        ped.setComponentVariation(11, 1, 0, 0);
        ped.setConfigFlag(185, true);
        ped.setConfigFlag(108, true);
        ped.setConfigFlag(208, true);
	})

}, 10000);

mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@player@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@table");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@dealer");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@ped_male@seat_1@regular@01a@base");
mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@lucky7wheel@male");
mp.game.streaming.requestIpl("vw_casino_main");

mp.events.add('luckyWheel', (entity) => {
	let wheelPos = new mp.Vector3(1110.2651, 228.62857, -50.7558);
	
	mp.game.invoke("0x960C9FF8F616E41C", "Press ~INPUT_PICKUP~ to start shopping", true);
	entity.taskGoStraightToCoord(wheelPos.x, wheelPos.y, wheelPos.z, 1.0,  -1,  312.2,  0.0);

	setTimeout(() => {
		entity.setRotation(0.0, 0.0, 2.464141, 1, true);
		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_right_to_baseidle", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 1000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_to_armraisedidle", 8.0, -8.0, -1, 0, 0, false, false, false);
		if(entity == mp.players.local){

			setTimeout(() => {
				mp.events.callRemote('startRoll');
				entity.freezePosition(true);
				rouletteCamera = mp.cameras.new('default', new mp.Vector3(1111.015, 227.7846, -50.755825 +2.5), new mp.Vector3(0,0,0), 40);
				rouletteCamera.setRot(0.0, 0, 0, 2);
				rouletteCamera.setActive(true);
				//localplayer.freezePosition(true);
				mp.game.cam.renderScriptCams(true, true, 1500, true, false);
			}, 1000);
		}
	}, 2000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "armraisedidle_to_spinningidle_high", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 3000);
});
var count = 0;
mp.events.add('delWheelCam', () => {
    rouletteCamera.destroy(true);
    rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	localplayer.freezePosition(false);
});

mp.events.add('spin_wheel', function(tb, needSpins, endTable, endBall){
    RouletteTables[tb].table.playAnim("intro_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
    RouletteTables[tb].table.forceAiAndAnimationUpdate();
    const ballPos = RouletteTables[tb].table.getWorldPositionOfBone(RouletteTables[tb].table.getBoneIndexByName("Roulette_Wheel"));
    RouletteTables[tb].ball.position = ballPos;

    RouletteTables[tb].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);
    const ballRot = RouletteTables[tb].table.getRotation(2);
    RouletteTables[tb].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1)
	//RouletteTables[tb].ball.rotation = new mp.Vector3(0.0, 0.0, 0);
	
	RouletteTables[tb].ball.playAnim("intro_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, false, 0, 136704); // loop, freezeLastFrame, ?
    RouletteTables[tb].ball.forceAiAndAnimationUpdate();

    RouletteTables[tb].spins = 0;
	RouletteTables[tb].lastSpinTime = 0;
	RouletteTables[tb].needSpins = needSpins;
	RouletteTables[tb].endTable = endTable;
    RouletteTables[tb].endBall = endBall;
    
    CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);

    setTimeout(
		function()
		{
            CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);

		}, 8000
	);
});

mp.events.add('render', () => {
    if( blockControls){
        mp.game.controls.disableControlAction(0, 257, true); // стрельба
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(2, 25, true);
		mp.game.controls.disableControlAction(0, 23, true); // INPUT_ENTER
		
		mp.game.controls.disableControlAction(2, 24, true);
		mp.game.controls.disableControlAction(2, 69, true);
		mp.game.controls.disableControlAction(2, 70, true);
		mp.game.controls.disableControlAction(2, 92, true);

		mp.game.controls.disableControlAction(2, 140, true);
		mp.game.controls.disableControlAction(2, 141, true);
		mp.game.controls.disableControlAction(2, 263, true);
		mp.game.controls.disableControlAction(2, 264, true);

		mp.game.controls.disableControlAction(0, 21, true);
		mp.game.controls.disableControlAction(0, 23, true);
		mp.game.controls.disableControlAction(0, 32, true);
		mp.game.controls.disableControlAction(0, 33, true);
		mp.game.controls.disableControlAction(0, 34, true);
		mp.game.controls.disableControlAction(0, 35, true);
		
    }

    if(setBet && rouletteCamera != null && rouletteTable != null && startRoullete == false && !mp.gui.cursor.visible){
        if(canDoBets && betObject == null)
        {
            betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z + 0.4));
            betObject.setCollision(false, false);
        }
        if(betObject != null && canDoBets)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("server_remove_roulette_bet", closestChipSpot);
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // ЛКМ
			{
				if (closestChipSpot != null && count < 5) {
                    count++;
                    mp.events.callRemote("server_make_roulette_bet", closestChipSpot);
                }
                else
                    mp.events.call('notify', 4, 9, "Вы поставили максимальное количество ставок", 3000);
            }

			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z = RouletteTablesPos[rouletteTable].z;
                //drawObj.position.z = mp.game.gameplay.getGroundZFor3dCoord(drawObj.position.x, drawObj.position.y, drawObj.position.z, parseFloat(0), false);
                getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));

                if(betCoords == null){
                    betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y,RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
                    getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
                }
                else {
                    
                    betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
                    getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
                }
				
				//getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
			}
        }
      
        
        let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
		let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
		
		let leftAxisX = 0;
		let leftAxisY = 0;
		
		let pos = rouletteCamera.getCoord();
		let rr = rouletteCamera.getDirection();
		let vector = new mp.Vector3(0, 0, 0);
		vector.x = rr.x * leftAxisY;
		vector.y = rr.y * leftAxisY;
		vector.z = rr.z * leftAxisY;
		
		let upVector = new mp.Vector3(0, 0, 1);
		let rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
		rightVector.x *= leftAxisX * 0.5;
		rightVector.y *= leftAxisX * 0.5;
		rightVector.z *= leftAxisX * 0.5;
		
		let rot = rouletteCamera.getRot(2);
		
		let rotx = rot.x + rightAxisY * -5.0;
        let rotz = rot.z + rightAxisX * -5.0;

		if(rotx > -57.5) rotx = -57.5;
		if(rotx < -70) rotx = -70;
		
        if(rotz < RouletteCameraRotStop[rouletteTable][0]) rotz = RouletteCameraRotStop[rouletteTable][0];
        if(rotz > RouletteCameraRotStop[rouletteTable][1]) rotz = RouletteCameraRotStop[rouletteTable][1];

        if(rotx < -69 && rotz < RouletteCameraRotStop[rouletteTable][2]) {
            rotz = RouletteCameraRotStop[rouletteTable][2];
            rotx = -69;
        }
        

        rouletteCamera.setRot(rotx, 0.0, rotz, 2);

        let cp = rouletteCamera.getRot(2);
    }    
    if(startRoullete == true && rouletteTable != null && !roulleteCam){
		
        const ballPos = RouletteTables[rouletteTable].table.getWorldPositionOfBone(RouletteTables[rouletteTable].table.getBoneIndexByName("Roulette_Wheel"));
        //rouletteCamera.setActive(false);
        //rouletteCamera.destroy();
        //rouletteCamera = mp.cameras.new('default', new mp.Vector3(ballPos.x, ballPos.y, ballPos.z+1.5), new mp.Vector3(0,0,0), 40);
        rouletteCamera.setCoord(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z+1.5);
        rouletteCamera.pointAtCoord(ballPos.x, ballPos.y, ballPos.z);
        //rouletteCamera.setRot(90.0, 0, 225, 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 2500, true, false);
        roulleteCam = true;
    }
    if(startRoullete == false && rouletteTable != null && roulleteCam){
		
        roulleteCam = false;
        rouletteCamera.destroy();
        rouletteCamera = mp.cameras.new('default', RouletteCameraPos[rouletteTable], new mp.Vector3(0,0,0), 40);
        rouletteCamera.setRot(-63, 0, RouletteCameraRot[rouletteTable], 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 1500, true, false);
    }
	
});

mp.events.add('render', rouletteRender);
function rouletteRender() 
{

    
	for(var i=0; i < RouletteTables.length; i++)
	{
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel", 3))
		{
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel") > 0.9425)
			{
				RouletteTables[i].table.playAnim("loop_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, true, 0, 131072);
			}
		}
		
		if(RouletteTables[i].ball.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_ball", 3))
		{
			if(RouletteTables[i].ball.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_ball") > 0.99)
			{
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				
				RouletteTables[i].ball.playAnim("loop_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, false, 0, 136704);
			}
		}
		
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel", 3))
		{
			
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") >= 0.9 && Date.now()-RouletteTables[i].lastSpinTime > 1000)
			{
				RouletteTables[i].spins++;
				RouletteTables[i].lastSpinTime = Date.now();
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins-1)
			{
				RouletteTables[i].ball.setAnimSpeed("anim_casino_b@amb@casino@games@roulette@table", "loop_ball", 0.70);
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins && RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") > 0.99)
			{
                RouletteTables[i].table.playAnim(RouletteTables[i].endTable, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
				
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				RouletteTables[i].ball.playAnim(RouletteTables[i].endBall, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 136704);
			}
		}
	}
}

mp.events.add('casinoBet', (val) => {
	setBet = true;
	mp.gui.cursor.visible = false;
    mp.events.callRemote('serverSetRouletteBet', val);
});

mp.events.add('ExitMenu_casino', () => {
    mp.events.callRemote('ExitMenu_casino');
});


mp.events.add('clean_chips', function( table){

    CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_intro", 3.0, 1.0, -1, 2, 0, false, false, false);

    for(let i = 0; i < betRoulette[table].length; i++)
    {
        if(betRoulette[table][i] != null)
        betRoulette[table][i].destroy();
    }

    betRoulette[table] = [];

    setTimeout(() => {
        CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_outro", 3.0, 1.0, -1, 2, 0, false, false, false);
    }, 1000);
});


mp.events.add('start_roulette', function(){
    startRoullete = true;
	global.menu.execute(`casino.hide()`);
});

mp.events.add('stop_roulette', function(){
    startRoullete = false;
	global.menu.execute(`casino.rest()`);
	 count = 0;
});

mp.events.add('bet_roulette', function(table, spot){
    //player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "place_bet_small", 3.0, 1.0, -1, 2, 0, false, false, false);
    let tablePos = RouletteTablesPos[table];
    let betOffset = tableChipsOffsets[spot]; 
    let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, RouletteTablesHeading[table], betOffset[0], betOffset[1], betOffset[2]);
        betRoulette[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_100dollar_x1`), new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z),
        {
            rotation: new mp.Vector3(0,0,0),
            alpha: 255,
            dimension: 0,
        }));
});

mp.events.add('bet_roulette_remove', function(){
    for(let i = 0; i < betRoulette[table].length; i++)
    {
        if(betRoulette[table][i] != null)
        betRoulette[table][i].destroy();
    }

    betRoulette[table] = [];
});

mp.events.add('seat_to_roulette_table', function(table){
		localplayer.freezePosition(true);
		rouletteTable = table;
		setBet = false;
		rouletteCamera = mp.cameras.new('default', RouletteCameraPos[table], new mp.Vector3(90,0,0), 40);
		rouletteCamera.setRot(-63, 0, RouletteCameraRot[table], 2);
	// rouletteCamera.pointAtCoord(RouletteTablesPos[table].x, RouletteTablesPos[table].y, RouletteTablesPos[table].z);
		rouletteCamera.setActive(true);
		//localplayer.freezePosition(true);
		mp.game.cam.renderScriptCams(true, true, 1500, true, false);
		blockControls = true;
});

mp.events.add('exit_roulette', function(){
    //entity.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2, 0, false, false, false);
try {
		RouletteTables[rouletteTable].table.setCollision(true, false);
		rouletteCamera.destroy(true);
		rouletteCamera = null;
		rouletteTable = null;
		mp.game.cam.renderScriptCams(false, true, 1000, true, false);
		localplayer.freezePosition(false);
		blockControls = false;
		setBet = false;
		
		clearTableMarkers();
		if(betObject != null || betObject !== undefined){
			betObject.destroy();
			betObject = null;
		}
	}
	catch{
		
	}
});

function getCameraHitCoord()
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 3) + position.x, (direction.y * 3) + position.y, (direction.z * 3) + position.z);
	
    let hitData = mp.raycasting.testPointToPoint(position, farAway);
   // mp.game.graphics.drawLine(position.x, position.y, position.z, farAway.x, farAway.y, farAway.z, 255, 0, 0, 255);
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}

function getNormalizedVector(vector)
{
	let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
}

function getCrossProduct(v1, v2)
{
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
}

let tableMarkers = [];
const tableMarkersOffsets =
{
	"0": [-0.137451171875, -0.146942138671875, 0.9449996948242188],
	"00": [-0.1387939453125, 0.10546875, 0.9449996948242188],
	"1": [-0.0560302734375, -0.1898193359375, 0.9449996948242188],
	"2": [-0.0567626953125, -0.024017333984375, 0.9449996948242188],
	"3": [-0.056884765625, 0.141632080078125, 0.9449996948242188],
	"4": [0.02392578125, -0.187347412109375, 0.9449996948242188],
	"5": [0.0240478515625, -0.02471923828125, 0.9449996948242188],
	"6": [0.02392578125, 0.1422119140625, 0.9449996948242188],
	"7": [0.1038818359375, -0.18902587890625, 0.9449996948242188],
	"8": [0.1044921875, -0.023834228515625, 0.9449996948242188],
	"9": [0.10546875, 0.1419677734375, 0.9449996948242188],
	"10": [0.18701171875, -0.188385009765625, 0.9449996948242188],
	"11": [0.18603515625, -0.0238037109375, 0.9449996948242188],
	"12": [0.1851806640625, 0.143157958984375, 0.9449996948242188],
	"13": [0.2677001953125, -0.18780517578125, 0.9449996948242188],
	"14": [0.26806640625, -0.02301025390625, 0.9449996948242188],
	"15": [0.26611328125, 0.143310546875, 0.9449996948242188],
	"16": [0.3497314453125, -0.18829345703125, 0.9449996948242188],
	"17": [0.349609375, -0.023101806640625, 0.9449996948242188],
	"18": [0.3497314453125, 0.142242431640625, 0.9449996948242188],
	"19": [0.4307861328125, -0.18829345703125, 0.9449996948242188],
	"20": [0.4312744140625, -0.02392578125, 0.9449996948242188],
	"21": [0.431884765625, 0.1416015625, 0.9449996948242188],
	"22": [0.51220703125, -0.188873291015625, 0.9449996948242188],
	"23": [0.5123291015625, -0.023773193359375, 0.9449996948242188],
	"24": [0.511962890625, 0.14215087890625, 0.9449996948242188],
	"25": [0.5931396484375, -0.18890380859375, 0.9449996948242188],
	"26": [0.59375, -0.023651123046875, 0.9449996948242188],
	"27": [0.59375, 0.14080810546875, 0.9449996948242188],
	"28": [0.67529296875, -0.189849853515625, 0.9449996948242188],
	"29": [0.6751708984375, -0.02337646484375, 0.9449996948242188],
	"30": [0.674560546875, 0.141845703125, 0.9449996948242188],
	"31": [0.756591796875, -0.18798828125, 0.9449996948242188],
	"32": [0.7547607421875, -0.0234375, 0.9449996948242188],
	"33": [0.7554931640625, 0.14263916015625, 0.9449996948242188],
	"34": [0.836669921875, -0.188323974609375, 0.9449996948242188],
	"35": [0.8365478515625, -0.0244140625, 0.9449996948242188],
	"36": [0.8359375, 0.14276123046875, 0.9449996948242188]
};

const tableChipsOffsets =
[
	[-0.154541015625, -0.150604248046875, 0.9449996948242188, ["0"]],
	[-0.1561279296875, 0.11505126953125, 0.9449996948242188, ["00"]],
	[-0.059326171875, -0.18701171875, 0.9449996948242188, ["1"]],
	[-0.058349609375, -0.019378662109375, 0.9449996948242188, ["2"]],
	[-0.0587158203125, 0.142059326171875, 0.9449996948242188, ["3"]],
	[0.02294921875, -0.1920166015625, 0.9449996948242188, ["4"]],
	[0.023193359375, -0.01947021484375, 0.9449996948242188, ["5"]],
	[0.024658203125, 0.147369384765625, 0.9449996948242188, ["6"]],
	[0.105224609375, -0.1876220703125, 0.9449996948242188, ["7"]],
	[0.1055908203125, -0.028472900390625, 0.9449996948242188, ["8"]],
	[0.10400390625, 0.147430419921875, 0.9449996948242188, ["9"]],
	[0.187744140625, -0.191802978515625, 0.9449996948242188, ["10"]],
	[0.1866455078125, -0.02667236328125, 0.9449996948242188, ["11"]],
	[0.1842041015625, 0.145965576171875, 0.9449996948242188, ["12"]],
	[0.2696533203125, -0.182464599609375, 0.9449996948242188, ["13"]],
	[0.265869140625, -0.027862548828125, 0.9449996948242188, ["14"]],
	[0.2667236328125, 0.138946533203125, 0.9449996948242188, ["15"]],
	[0.35009765625, -0.186126708984375, 0.9449996948242188, ["16"]],
	[0.348876953125, -0.027740478515625, 0.9449996948242188, ["17"]],
	[0.3497314453125, 0.14715576171875, 0.9449996948242188, ["18"]],
	[0.43212890625, -0.17864990234375, 0.9449996948242188, ["19"]],
	[0.4337158203125, -0.02508544921875, 0.9449996948242188, ["20"]],
	[0.430419921875, 0.138336181640625, 0.9449996948242188, ["21"]],
	[0.51416015625, -0.18603515625, 0.9449996948242188, ["22"]],
	[0.5135498046875, -0.02301025390625, 0.9449996948242188, ["23"]],
	[0.5146484375, 0.14239501953125, 0.9449996948242188, ["24"]],
	[0.59130859375, -0.192413330078125, 0.9449996948242188, ["25"]],
	[0.596923828125, -0.022216796875, 0.9449996948242188, ["26"]],
	[0.5924072265625, 0.14385986328125, 0.9449996948242188, ["27"]],
	[0.6749267578125, -0.187286376953125, 0.9449996948242188, ["28"]],
	[0.67431640625, -0.0262451171875, 0.9449996948242188, ["29"]],
	[0.6756591796875, 0.140594482421875, 0.9449996948242188, ["30"]],
	[0.7542724609375, -0.19415283203125, 0.9449996948242188, ["31"]],
	[0.7542724609375, -0.01898193359375, 0.9449996948242188, ["32"]],
	[0.75439453125, 0.1448974609375, 0.9449996948242188, ["33"]],
	[0.8392333984375, -0.18951416015625, 0.9449996948242188, ["34"]],
	[0.837646484375, -0.023468017578125, 0.9449996948242188, ["35"]],
	[0.8380126953125, 0.14227294921875, 0.9449996948242188, ["36"]],
	[-0.1368408203125, -0.02099609375, 0.9449996948242188, ["0","00"]],
	[-0.055419921875, -0.105804443359375, 0.9449996948242188, ["1","2"]],
	[-0.0567626953125, 0.058624267578125, 0.9449996948242188, ["2","3"]],
	[0.02587890625, -0.10498046875, 0.9449996948242188, ["4","5"]],
	[0.0244140625, 0.058837890625, 0.9449996948242188, ["5","6"]],
	[0.100341796875, -0.10382080078125, 0.9449996948242188, ["7","8"]],
	[0.1064453125, 0.06011962890625, 0.9449996948242188, ["8","9"]],
	[0.19189453125, -0.1060791015625, 0.9449996948242188, ["10","11"]],
	[0.1856689453125, 0.05438232421875, 0.9449996948242188, ["11","12"]],
	[0.27099609375, -0.10870361328125, 0.9449996948242188, ["13","14"]],
	[0.2667236328125, 0.058502197265625, 0.9449996948242188, ["14","15"]],
	[0.3463134765625, -0.107696533203125, 0.9449996948242188, ["16","17"]],
	[0.34814453125, 0.0556640625, 0.9449996948242188, ["17","18"]],
	[0.42822265625, -0.109130859375, 0.9449996948242188, ["19","20"]],
	[0.4302978515625, 0.0550537109375, 0.9449996948242188, ["20","21"]],
	[0.511474609375, -0.107421875, 0.9449996948242188, ["22","23"]],
	[0.512451171875, 0.0614013671875, 0.9449996948242188, ["23","24"]],
	[0.5980224609375, -0.107147216796875, 0.9449996948242188, ["25","26"]],
	[0.596435546875, 0.0574951171875, 0.9449996948242188, ["26","27"]],
	[0.673828125, -0.106903076171875, 0.9449996948242188, ["28","29"]],
	[0.6751708984375, 0.058685302734375, 0.9449996948242188, ["29","30"]],
	[0.7532958984375, -0.1102294921875, 0.9449996948242188, ["31","32"]],
	[0.750244140625, 0.06103515625, 0.9449996948242188, ["32","33"]],
	[0.834716796875, -0.108978271484375, 0.9449996948242188, ["34","35"]],
	[0.836181640625, 0.05828857421875, 0.9449996948242188, ["35","36"]],
	[-0.0167236328125, -0.187042236328125, 0.9449996948242188, ["1","4"]],
	[-0.0167236328125, -0.02154541015625, 0.9449996948242188, ["2","5"]],
	[-0.0164794921875, 0.140350341796875, 0.9449996948242188, ["3","6"]],
	[0.064453125, -0.1865234375, 0.9449996948242188, ["4","7"]],
	[0.06494140625, -0.01727294921875, 0.9449996948242188, ["5","8"]],
	[0.068603515625, 0.13873291015625, 0.9449996948242188, ["6","9"]],
	[0.144287109375, -0.184173583984375, 0.9449996948242188, ["7","10"]],
	[0.14501953125, -0.024139404296875, 0.9449996948242188, ["8","11"]],
	[0.14501953125, 0.136993408203125, 0.9449996948242188, ["9","12"]],
	[0.2291259765625, -0.18670654296875, 0.9449996948242188, ["10","13"]],
	[0.227783203125, -0.0242919921875, 0.9449996948242188, ["11","14"]],
	[0.2286376953125, 0.14398193359375, 0.9449996948242188, ["12","15"]],
	[0.308349609375, -0.18792724609375, 0.9449996948242188, ["13","16"]],
	[0.308837890625, -0.02374267578125, 0.9449996948242188, ["14","17"]],
	[0.3099365234375, 0.14410400390625, 0.9449996948242188, ["15","18"]],
	[0.39111328125, -0.192230224609375, 0.9449996948242188, ["16","19"]],
	[0.390869140625, -0.0189208984375, 0.9449996948242188, ["17","20"]],
	[0.39111328125, 0.146514892578125, 0.9449996948242188, ["18","21"]],
	[0.470947265625, -0.188690185546875, 0.9449996948242188, ["19","22"]],
	[0.4705810546875, -0.0205078125, 0.9449996948242188, ["20","23"]],
	[0.4725341796875, 0.140167236328125, 0.9449996948242188, ["21","24"]],
	[0.5491943359375, -0.189666748046875, 0.9449996948242188, ["22","25"]],
	[0.548095703125, -0.022552490234375, 0.9449996948242188, ["23","26"]],
	[0.553955078125, 0.1446533203125, 0.9449996948242188, ["24","27"]],
	[0.6324462890625, -0.191131591796875, 0.9449996948242188, ["25","28"]],
	[0.635498046875, -0.0224609375, 0.9449996948242188, ["26","29"]],
	[0.6392822265625, 0.139190673828125, 0.9449996948242188, ["27","30"]],
	[0.71533203125, -0.187042236328125, 0.9449996948242188, ["28","31"]],
	[0.7181396484375, -0.02447509765625, 0.9449996948242188, ["29","32"]],
	[0.7152099609375, 0.138153076171875, 0.9449996948242188, ["30","33"]],
	[0.7969970703125, -0.1904296875, 0.9449996948242188, ["31","34"]],
	[0.7955322265625, -0.024871826171875, 0.9449996948242188, ["32","35"]],
	[0.7960205078125, 0.137664794921875, 0.9449996948242188, ["33","36"]],
	[-0.0560302734375, -0.271240234375, 0.9449996948242188, ["1","2","3"]],
	[0.024658203125, -0.271392822265625, 0.9449996948242188, ["4","5","6"]],
	[0.1051025390625, -0.272125244140625, 0.9449996948242188, ["7","8","9"]],
	[0.1898193359375, -0.27001953125, 0.9449996948242188, ["10","11","12"]],
	[0.2696533203125, -0.271697998046875, 0.9449996948242188, ["13","14","15"]],
	[0.351318359375, -0.268096923828125, 0.9449996948242188, ["16","17","18"]],
	[0.4287109375, -0.269561767578125, 0.9449996948242188, ["19","20","21"]],
	[0.5098876953125, -0.2716064453125, 0.9449996948242188, ["22","23","24"]],
	[0.5960693359375, -0.271148681640625, 0.9449996948242188, ["25","26","27"]],
	[0.67724609375, -0.268524169921875, 0.9449996948242188, ["28","29","30"]],
	[0.7523193359375, -0.27227783203125, 0.9449996948242188, ["31","32","33"]],
	[0.8382568359375, -0.272125244140625, 0.9449996948242188, ["34","35","36"]],
	[-0.017333984375, -0.106170654296875, 0.9449996948242188, ["1","2","4","5"]],
	[-0.0162353515625, 0.060882568359375, 0.9449996948242188, ["2","3","5","6"]],
	[0.06591796875, -0.110107421875, 0.9449996948242188, ["4","5","7","8"]],
	[0.0653076171875, 0.060028076171875, 0.9449996948242188, ["5","6","8","9"]],
	[0.146484375, -0.10888671875, 0.9449996948242188, ["7","8","10","11"]],
	[0.1451416015625, 0.057159423828125, 0.9449996948242188, ["8","9","11","12"]],
	[0.22705078125, -0.1092529296875, 0.9449996948242188, ["10","11","13","14"]],
	[0.22802734375, 0.059356689453125, 0.9449996948242188, ["11","12","14","15"]],
	[0.307373046875, -0.1043701171875, 0.9449996948242188, ["13","14","16","17"]],
	[0.309814453125, 0.05584716796875, 0.9449996948242188, ["14","15","17","18"]],
	[0.3919677734375, -0.111083984375, 0.9449996948242188, ["16","17","19","20"]],
	[0.3924560546875, 0.0596923828125, 0.9449996948242188, ["17","18","20","21"]],
	[0.471923828125, -0.1044921875, 0.9449996948242188, ["19","20","22","23"]],
	[0.4698486328125, 0.060028076171875, 0.9449996948242188, ["20","21","23","24"]],
	[0.5531005859375, -0.106170654296875, 0.9449996948242188, ["22","23","25","26"]],
	[0.5546875, 0.059417724609375, 0.9449996948242188, ["23","24","26","27"]],
	[0.633544921875, -0.101531982421875, 0.9449996948242188, ["25","26","28","29"]],
	[0.6337890625, 0.0579833984375, 0.9449996948242188, ["26","27","29","30"]],
	[0.7156982421875, -0.106292724609375, 0.9449996948242188, ["28","29","31","32"]],
	[0.7158203125, 0.0604248046875, 0.9449996948242188, ["29","30","32","33"]],
	[0.7947998046875, -0.108642578125, 0.9449996948242188, ["31","32","34","35"]],
	[0.7952880859375, 0.059051513671875, 0.9449996948242188, ["32","33","35","36"]],
	[-0.099609375, -0.2711181640625, 0.9449996948242188, ["0","00","1","2","3"]],
	[-0.0147705078125, -0.27154541015625, 0.9449996948242188, ["1","2","3","4","5","6"]],
	[0.064697265625, -0.270263671875, 0.9449996948242188, ["4","5","6","7","8","9"]],
	[0.144775390625, -0.271209716796875, 0.9449996948242188, ["7","8","9","10","11","12"]],
	[0.226806640625, -0.27142333984375, 0.9449996948242188, ["10","11","12","13","14","15"]],
	[0.306396484375, -0.27142333984375, 0.9449996948242188, ["13","14","15","16","17","18"]],
	[0.3895263671875, -0.27099609375, 0.9449996948242188, ["16","17","18","19","20","21"]],
	[0.468017578125, -0.275238037109375, 0.9449996948242188, ["19","20","21","22","23","24"]],
	[0.5509033203125, -0.2738037109375, 0.9449996948242188, ["22","23","24","25","26","27"]],
	[0.6336669921875, -0.27386474609375, 0.9449996948242188, ["25","26","27","28","29","30"]],
	[0.7144775390625, -0.272186279296875, 0.9449996948242188, ["28","29","30","31","32","33"]],
	[0.7935791015625, -0.272918701171875, 0.9449996948242188, ["31","32","33","34","35","36"]],
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], 
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]],
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]
];



function clearTableMarkers()
{
	for(var i=0; i < tableMarkers.length; i++)
	{
		tableMarkers[i].destroy();
	}
	tableMarkers = [];
}

function getClosestChipSpot(vector)
{
	var spot = null;
	var prevDistance = 0.025;
	var dist = null;

	for(var i=0; i < tableChipsOffsets.length; i++)
	{
        //dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(RouletteTablesPos[0].x+tableChipsOffsets[i][0], RouletteTablesPos[0].y+tableChipsOffsets[i][1], RouletteTablesPos[0].z+tableChipsOffsets[i][2]));
        let newCordPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[i][0], tableChipsOffsets[i][1], tableChipsOffsets[i][2]);
        dist = mp.game.gameplay.getDistanceBetweenCoords(vector.x, vector.y, vector.z, newCordPos.x, newCordPos.y,newCordPos.z, false);

        if(dist <= prevDistance)
		{
			spot = i;
            prevDistance = dist;
          
		}
	}
	
	if(spot != closestChipSpot)
	{
		closestChipSpot = spot;
		clearTableMarkers();
		
		if(spot != null)
		{
			var key = null;
            var obj = null;
            let newBetPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[spot][0], tableChipsOffsets[spot][1], tableChipsOffsets[spot][2]);
            betCoords = newBetPos;

			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                    obj = mp.objects.new(269022546, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])});
					obj.setCollision(false, false);
					tableMarkers.push(obj);
				}
				else
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                   
                    tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])}));
				}
			}
		}
	}	
}
/*

mp.keys.bind(0x09, false, function () { // change bet
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;

    mp.events.callRemote('serverChangeRouletteBet');
    
    lastCheck = new Date().getTime();
});*/
}