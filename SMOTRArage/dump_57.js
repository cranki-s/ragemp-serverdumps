{
let consts =
{
	MinAngle: 12.0,
	MaxAngle: 80.0,
	MinSpeed: 7.0,
	
	DriftEndReason:
	{
		LowSpeed: 0,
		LowAngle: 1,
		DamageDetected: 2,
		OutOfVehicle: 3
	},
	
	SpeedMultiply: 1.0,
	AngleMultiply: 1.0,
	
	TimeMultiply: 1.0,
	TimeBonusStart: 0,
	
	FinishResults:
	{
		High: 1000000,
		Mid: 500000,
		Low: 50000
	}
};

// utils
function fromDegree(angle) { return angle / (180.0 / Math.PI); }
function toDegree(angle) { return angle * (180.0 / Math.PI); }

function normalize2d(x, y)
{
	let t = mp.game.system.sqrt(x*x + y*y);

	if (t > 0.000001)
	{
		let fRcpt = 1 / t;

		x *= fRcpt;
		y *= fRcpt;
	}
	
	return [x, y];
}

let driftMngr =
{	
	isDrifting: false,
	
	startSnapshot:
	{
		health: 1000.0
	},
	
	badAngleSince: 0,
	
	slippery: false,
	slippedyIdx: 0,
	
	api:
	[
		[],	// start
		[],	// end
		[]	// process
	],
	
	onDriftStarted: function(vehicle, health)
	{
		this.startSnapshot.health = health;
		this.startSnapshot.startTime = Date.now();
		this.isDrifting = true;
		
		if(this.api[0].length > 0)
		{
			for(let cb of this.api[0])
			{
				cb();
			}
		}
	},
	
	onDriftEnded: function(reason)
	{
		this.isDrifting = false;
		
		if(this.api[1].length > 0)
		{
			for(let cb of this.api[1])
			{
				cb(reason);
			}
		}
	},
	
	onDriftProcessed: function(angle, speed, active, stopProgress)
	{
		if(this.api[2].length > 0)
		{
			for(let cb of this.api[2])
			{
				cb(angle, speed, active, stopProgress);
			}
		}
	},
	
	pulse: function()
	{
		let vehicle = localPlayer.vehicle;
		
		if(vehicle && vehicle.getClass() != 8 && vehicle.getClass() != 13 && vehicle.getClass() != 14 && vehicle.getClass() != 15 && vehicle.getClass() != 16 && vehicle.getClass() != 21)
		{
			this.slippedyIdx++;
			
			if(this.slippedyIdx === 3)
			{
				this.slippedyIdx = 0;
				vehicle.setReduceGrip(true);
			}
			else
			{
				vehicle.setReduceGrip(false);
			}
			
			let velocity = vehicle.getVelocity();
			let speed = vehicle.getSpeed();
			
			let health = vehicle.getBodyHealth();
			
			///
			let fv = vehicle.getForwardVector();
			let fvn = normalize2d(fv.x, fv.y);
			let fvvn = normalize2d(velocity.x, velocity.y);
			
			driftAngle = mp.game.gameplay.getAngleBetween2dVectors(fvn[0], fvn[1], fvvn[0], fvvn[1]);
			
			let angleOk = (driftAngle >= consts.MinAngle && driftAngle <= consts.MaxAngle);
			let speedOk = (speed >= consts.MinSpeed);
			let damageOk = this.isDrifting ? (health >= this.startSnapshot.health) : true;
			let posOk = (vehicle.position.z >= 0);
			
			let isDriftingNow = (angleOk && speedOk && damageOk && posOk);
			
			if(this.isDrifting)
            { 
				if(isDriftingNow)
				{
					this.badAngleSince = 0;
					this.onDriftProcessed(driftAngle, speed, true);
				}
				else
				{
					let end = true;
					
					if(!angleOk && speedOk && damageOk)
					{
						if(this.badAngleSince === 0)
						{
							this.badAngleSince = Date.now();
							end = false;
						}
						else if((Date.now() - this.badAngleSince) < 2000)
						{
							end = false;
						}
					}
					
					if(end)
					{
						this.onDriftEnded(!angleOk ? consts.DriftEndReason.LowAngle : (!speedOk ? consts.DriftEndReason.LowSpeed : consts.DriftEndReason.DamageDetected));						
						vehicle.setReduceGrip(false);
					}
					else
					{
						this.onDriftProcessed(driftAngle, speed, false, ((Date.now() - this.badAngleSince) / 2000));

					}
				}
			}
			else if(isDriftingNow)
			{
				this.onDriftStarted(vehicle, health);
			}
		}
		else if(this.isDrifting)
		{
			this.onDriftEnded(consts.DriftEndReason.OutOfVehicle);
		}
	},
	
	addCallback: function(cb, type)
	{
		if(typeof(type) === 'number' && type >= 0 && type <= 2)
		{
			let api = this.api[type];
			
			if(api.indexOf(cb) === -1)
			{
				api.push(cb);
			}
		}
	}
};

mp.events.add("render", () =>
{
	driftMngr.pulse();
});

let counter =
{
	currentScore: 0,
	startTimestamp: 0,
	
	allScore: 0,
	
	init: function()
	{
		driftMngr.addCallback(this.start.bind(this), 0);
		driftMngr.addCallback(this.end.bind(this), 1);
		driftMngr.addCallback(this.process.bind(this), 2);
	},
	
	start: function()
	{
		if(vehSeat == -1) {
			this.currentScore = 0;
			this.startTimestamp = Date.now();
			
			if(hud_browser) hud_browser.execute('toggleDriftPanel(\'true\');');
		}
	},
	
	end: function(reason)
	{
		if(hud_browser) hud_browser.execute('toggleDriftPanel();');
		if(vehSeat == -1) {
			if(reason === consts.DriftEndReason.LowSpeed || reason === consts.DriftEndReason.LowAngle)
			{
				let isSound = true;
				if(this.currentScore > 1000 && this.currentScore > this.allScore) {
					mp.events.callRemote('updateDriftScore', roundNumber(this.currentScore,0));
					notyAPI.success("Новый дрифт рекорд сессии зафиксирован<b>"+roundNumber(this.currentScore,0).toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1')+"</b> очк.", 3000, true);
					isSound = false;
				}
				this.allScore += this.currentScore;					
				
				if(this.currentScore >= consts.FinishResults.Low) {
					if(this.currentScore >= consts.FinishResults.High) {
						// show a message?
						notyAPI.success("Вот это я понимаю — дрифт! Крутой результат!", 3000, isSound);
					}
					else if(this.currentScore >= consts.FinishResults.Mid) {
						notyAPI.success("Неплохой дрифт. Поднажми, у тебя в следующий раз всё получится!", 3000, isSound);
					}
				}
			}else{
				//
			}
		}
	},
	
	process: function(angle, speed, active, stopProgress)
	{
		if(vehSeat == -1) {
			if(active)
			{
				let score = (((angle - consts.MinAngle) * consts.AngleMultiply)
					+ ((speed - consts.MinSpeed) * consts.SpeedMultiply));
					
				let timePassed = Date.now() - this.startTimestamp;
				
				if(timePassed > consts.TimeBonusStart)
				{
					score *= ((timePassed - consts.TimeBonusStart) * consts.TimeMultiply);
				}
				
				score *= 0.00002;
				
				this.currentScore += score;
			}
			
			let d = new Date(Date.now() - this.startTimestamp);
			
			let m = d.getMinutes().toString();
			let s = d.getSeconds().toString();
			
			if(m.length === 1) m = "0" + m;
			if(s.length === 1) s = "0" + s;
			
			let newTime = `${m}:${s}`;
			
			if(hud_browser) hud_browser.execute('updateDriftPanel(\''+this.currentScore.toFixed(0)+'\',\''+newTime+'\');');
		}
	}
};
counter.init();
}