{
'use strict';

var d3vehs = [
	{"hash":"rr_cullinan","number":"M 707 MM | 78","x":-3205.6311,"y":843.8768,"z":8.8377,"heading":"324.8417663574219",'colors':'{"material":"1","color1":"0,0,0","pearl":"-1","color2":"0,0,0","wheels":2,"tyre":"245,41,41"}','handling':'{"FDRIVEBIASFRONT":"0.78","NINITIALDRIVEGEARS":6,"FINITIALDRIVEFORCE":0.36,"FDRIVEINERTIA":1,"FCLUTCHCHANGERATESCALEUPSHIFT":6,"FCLUTCHCHANGERATESCALEDOWNSHIFT":6,"INITIALDRIVEMAXFLATVEL":265.1,"FBRAKEFORCE":"2","FBRAKEBIASFRONT":"0.8","FHANDBRAKEFORCE":"2","FSTEERINGLOCK":"45","FTRACTIONCURVEMAX":"4","FTRACTIONCURVEMIN":"3.5","FTRACTIONCURVELATERAL":"27","FTRACTIONSPRINGDELTAMAX":"0.1","FLOWSPEEDTRACTIONLOSSMULT":"0.000001","FCAMBERSTIFFNESSS":0.000001,"FTRACTIONBIASFRONT":"0.48","FTRACTIONLOSSMULT":1,"FSUSPENSIONFORCE":"2","FSUSPENSIONCOMPDAMP":"1.9","FSUSPENSIONREBOUNDDAMP":"1.9","FSUSPENSIONUPPERLIMIT":"0.15","FSUSPENSIONLOWERLIMIT":"-0.15","FSUSPENSIONRAISE":"0.000001","FSUSPENSIONBIASFRONT":0.52,"FANTIROLLBARFORCE":0.9,"FANTIROLLBARBIASFRONT":0.6,"FROLLCENTREHEIGHTFRONT":0.34,"FROLLCENTREHEIGHTREAR":0.34}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"0"}','params':'{"tint":1,"neon":"3,0,205,163,0","livery":"0","tyresCanBurst":1,"lock":1}'},
	{"hash":"7f02","number":"C 707 AM | 99","x":-3203.9089,"y":840.9463,"z":8.5338,"heading":"327.13348388671875",'colors':'{"material":1,"color1":"0,0,0","pearl":1,"color2":"255,255,255","tyre":"0,0,0","wheels":4}','handling':'{"FDRIVEBIASFRONT":"0.78","NINITIALDRIVEGEARS":6,"FINITIALDRIVEFORCE":0.36,"FDRIVEINERTIA":1,"FCLUTCHCHANGERATESCALEUPSHIFT":6,"FCLUTCHCHANGERATESCALEDOWNSHIFT":6,"INITIALDRIVEMAXFLATVEL":265.1,"FBRAKEFORCE":"2","FBRAKEBIASFRONT":"0.8","FHANDBRAKEFORCE":"2","FSTEERINGLOCK":"45","FTRACTIONCURVEMAX":"4","FTRACTIONCURVEMIN":"3.5","FTRACTIONCURVELATERAL":"27","FTRACTIONSPRINGDELTAMAX":"0.1","FLOWSPEEDTRACTIONLOSSMULT":"0.000001","FCAMBERSTIFFNESSS":0.000001,"FTRACTIONBIASFRONT":"0.48","FTRACTIONLOSSMULT":1,"FSUSPENSIONFORCE":"2","FSUSPENSIONCOMPDAMP":"1.9","FSUSPENSIONREBOUNDDAMP":"1.9","FSUSPENSIONUPPERLIMIT":"0.15","FSUSPENSIONLOWERLIMIT":"-0.15","FSUSPENSIONRAISE":"0.000001","FSUSPENSIONBIASFRONT":0.52,"FANTIROLLBARFORCE":0.9,"FANTIROLLBARBIASFRONT":0.6,"FROLLCENTREHEIGHTFRONT":0.34,"FROLLCENTREHEIGHTREAR":0.34}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"0","23":"-1"}','params':'{"tint":3,"lock":1,"neon":"3,0,255,255,255","livery":"1"}'},
	{"hash":"m5f90cs","number":"B 707 XB | 77","x":-3202.1101,"y":837.9563,"z":8.5412,"heading":"331.20294189453125",'colors':'{"material":12,"color1":"0,21,9","pearl":50,"color2":"48,12,0","tyre":"0,0,0","wheels":"0"}','handling':'{}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"0","23":"-1"}','params':'{"tint":1,"lock":1}'},
	{"hash":"m5e60","number":"T 116 EH | 77","x":-3200.2705,"y":835.0878,"z":8.4823,"heading":"331.00140380859375",'colors':'{"material":"1","color1":"17,9,9","pearl":46,"color2":"45,45,45","wheels":"0"}','handling':'{"FDRIVEBIASFRONT":"0.82","NINITIALDRIVEGEARS":6,"FINITIALDRIVEFORCE":0.25,"FDRIVEINERTIA":1,"FCLUTCHCHANGERATESCALEUPSHIFT":2.5,"FCLUTCHCHANGERATESCALEDOWNSHIFT":2.5,"INITIALDRIVEMAXFLATVEL":168.8,"FBRAKEFORCE":"2","FBRAKEBIASFRONT":"0.82","FHANDBRAKEFORCE":"2","FSTEERINGLOCK":"45","FTRACTIONCURVEMAX":"3.2","FTRACTIONCURVEMIN":"3.5","FTRACTIONCURVELATERAL":"27","FTRACTIONSPRINGDELTAMAX":"0.15","FLOWSPEEDTRACTIONLOSSMULT":"0.05","FCAMBERSTIFFNESSS":0.000001,"FTRACTIONBIASFRONT":"0.48","FTRACTIONLOSSMULT":1,"FSUSPENSIONFORCE":"4","FSUSPENSIONCOMPDAMP":"2.5","FSUSPENSIONREBOUNDDAMP":"2.5","FSUSPENSIONUPPERLIMIT":"0.1","FSUSPENSIONLOWERLIMIT":"-0.15","FSUSPENSIONRAISE":"0.001","FSUSPENSIONBIASFRONT":0.52,"FANTIROLLBARFORCE":0.6,"FANTIROLLBARBIASFRONT":0.65,"FROLLCENTREHEIGHTFRONT":0.4,"FROLLCENTREHEIGHTREAR":0.4}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"0","23":"82"}','params':'{"lock":1,"tint":1}'},
	{"hash":"x5me70","number":"B 333 XB | 98","x":-3198.6931,"y":831.9705,"z":8.697,"heading":"330.4738464355469",'colors':'{"material":1,"color1":"108,59,0","pearl":159,"color2":"0,0,0","wheels":4}','handling':'{"FDRIVEBIASFRONT":0.78,"NINITIALDRIVEGEARS":6,"FINITIALDRIVEFORCE":0.36,"FDRIVEINERTIA":1,"FCLUTCHCHANGERATESCALEUPSHIFT":6,"FCLUTCHCHANGERATESCALEDOWNSHIFT":6,"INITIALDRIVEMAXFLATVEL":265.1,"FBRAKEFORCE":2,"FBRAKEBIASFRONT":0.8,"FHANDBRAKEFORCE":2,"FSTEERINGLOCK":45,"FTRACTIONCURVEMAX":4,"FTRACTIONCURVEMIN":3.5,"FTRACTIONCURVELATERAL":27,"FTRACTIONSPRINGDELTAMAX":0.1,"FLOWSPEEDTRACTIONLOSSMULT":0.000001,"FCAMBERSTIFFNESSS":0.000001,"FTRACTIONBIASFRONT":0.48,"FTRACTIONLOSSMULT":1,"FSUSPENSIONFORCE":2,"FSUSPENSIONCOMPDAMP":1.9,"FSUSPENSIONREBOUNDDAMP":1.9,"FSUSPENSIONUPPERLIMIT":0.15,"FSUSPENSIONLOWERLIMIT":-0.15,"FSUSPENSIONRAISE":0.000001,"FSUSPENSIONBIASFRONT":0.52,"FANTIROLLBARFORCE":0.9,"FANTIROLLBARBIASFRONT":0.6,"FROLLCENTREHEIGHTFRONT":0.34,"FROLLCENTREHEIGHTREAR":0.34}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"-1","23":"80"}','params':'{"tint":1,"tyresCanBurst":1,"neon":"3,0,255,5,5","livery":"0","lock":1}'},
	{"hash":"7f02","number":"C 707 AM | 77","x":-3197.0461,"y":828.9957,"z":8.5451,"heading":"330.70367431640625",'colors':'{"material":12,"color1":"0,0,0","pearl":1,"color2":"255,255,255","tyre":"0,0,0","wheels":4}','handling':'{"FDRIVEBIASFRONT":"0.78","NINITIALDRIVEGEARS":6,"FINITIALDRIVEFORCE":0.36,"FDRIVEINERTIA":1,"FCLUTCHCHANGERATESCALEUPSHIFT":6,"FCLUTCHCHANGERATESCALEDOWNSHIFT":6,"INITIALDRIVEMAXFLATVEL":265.1,"FBRAKEFORCE":"2","FBRAKEBIASFRONT":"0.8","FHANDBRAKEFORCE":"2","FSTEERINGLOCK":"45","FTRACTIONCURVEMAX":"4","FTRACTIONCURVEMIN":"3.5","FTRACTIONCURVELATERAL":"27","FTRACTIONSPRINGDELTAMAX":"0.1","FLOWSPEEDTRACTIONLOSSMULT":"0.000001","FCAMBERSTIFFNESSS":0.000001,"FTRACTIONBIASFRONT":"0.48","FTRACTIONLOSSMULT":1,"FSUSPENSIONFORCE":"2","FSUSPENSIONCOMPDAMP":"1.9","FSUSPENSIONREBOUNDDAMP":"1.9","FSUSPENSIONUPPERLIMIT":"0.15","FSUSPENSIONLOWERLIMIT":"-0.15","FSUSPENSIONRAISE":"0.000001","FSUSPENSIONBIASFRONT":0.52,"FANTIROLLBARFORCE":0.9,"FANTIROLLBARBIASFRONT":0.6,"FROLLCENTREHEIGHTFRONT":0.34,"FROLLCENTREHEIGHTREAR":0.34}','tuning':'{"11":"2","12":"2","13":"2","15":"3","18":"0","22":"0","23":"-1"}','params':'{"tint":3,"lock":1,"neon":"3,0,255,255,255"}'},
];

function reSpawnD3Vehs() {
	if(d3vehs) {
		for(var i in d3vehs) {
			let entity = mp.vehicles.new(mp.game.joaat(d3vehs[i].hash), new mp.Vector3(d3vehs[i].x, d3vehs[i].y, d3vehs[i].z),
			{
				numberPlate: d3vehs[i].number.toString(),
				heading: parseFloat(d3vehs[i].heading),
				dynamic: false,
				locked: true,
				color: [[255, 255, 255],[255, 255, 255]]
			});
			entity.rotation = new mp.Vector3(0, 0, parseFloat(d3vehs[i].heading));
			
			//entity.setEngineOn(true, true, true);
			
			//entity.setLights(2);
			//entity.setLightMultiplier(0.5);
			//entity.setFullbeam(false);
			
			let vehColors = JSON.parse(d3vehs[i].colors);
			
			if(vehColors["color1"] !== undefined) {
				let vehColor1 = explode(",", vehColors["color1"]);
				entity.setCustomPrimaryColour(parseInt(vehColor1[0]), parseInt(vehColor1[1]), parseInt(vehColor1[2]));
			}
			
			if(vehColors["color2"] !== undefined) {
				let vehColor2 = explode(",", vehColors["color2"]);
				entity.setCustomSecondaryColour(parseInt(vehColor2[0]), parseInt(vehColor2[1]), parseInt(vehColor2[2]));
			}
			
			if(vehColors["tyre"] !== undefined) {
				entity.toggleMod(20, true);
				let vehColorTyre = explode(",", vehColors["tyre"]);
				if(parseInt(vehColorTyre[0]) == 0 && parseInt(vehColorTyre[1]) == 0 && parseInt(vehColorTyre[2]) == 0) vehColorTyre[0] = 1, vehColorTyre[1] = 1, vehColorTyre[2] = 1;
				entity.setTyreSmokeColor(parseInt(vehColorTyre[0]), parseInt(vehColorTyre[1]), parseInt(vehColorTyre[2]));
			}
			
			entity.setColours(parseInt(vehColors["material"]), parseInt(vehColors["material"]));
			if(vehColors["pearl"] !== undefined) entity.setExtraColours(parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
			
			let tempTuning = JSON.parse(d3vehs[i].tuning);
			for (var k in tempTuning) {
				entity.setMod(parseInt(k), parseInt(tempTuning[k]));
			}
			
			let vehParams = JSON.parse(d3vehs[i].params);
			if(vehParams["tint"] !== undefined) entity.setWindowTint(parseInt(vehParams["tint"]));
			if(typeof(vehParams["lock"]) !== "undefined") {
				if(vehParams["lock"]) {
					entity.setAlarm(true);
					entity.setDoorsLockedForAllPlayers(true);
					entity.setDoorsLocked(2);
				}else{
					entity.setAlarm(false);
					entity.setDoorsLockedForAllPlayers(false);
					entity.setDoorsLocked(1);
				}
				//chatAPI.sysPush("<span style=\"color:#FF6146;\"> ST "+vehParams["lock"]+" | "+entity.getDoorLockStatus()+"</span>");
			}
			if(typeof(vehParams["neon"]) !== "undefined") {
				let vehNeon = explode(",", vehParams["neon"]);
				if(parseInt(vehNeon[1]) == 0) {
					entity.setNeonLightEnabled(0, false);
					entity.setNeonLightEnabled(1, false);
					entity.setNeonLightEnabled(2, false);
					entity.setNeonLightEnabled(3, false);
				}else{
					entity.setNeonLightsColour(parseInt(vehNeon[2]), parseInt(vehNeon[3]), parseInt(vehNeon[4]));
					if(parseInt(vehNeon[0]) == 1) {
						entity.setNeonLightEnabled(0, true);
						entity.setNeonLightEnabled(1, true);
					}else if(parseInt(vehNeon[0]) == 2) {
						entity.setNeonLightEnabled(2, true);
						entity.setNeonLightEnabled(3, true);
					}else if(parseInt(vehNeon[0]) == 3) {
						entity.setNeonLightEnabled(0, true);
						entity.setNeonLightEnabled(1, true);
						entity.setNeonLightEnabled(2, true);
						entity.setNeonLightEnabled(3, true);
					}
				}
			}
			if(typeof(vehParams["livery"]) !== "undefined") {
				let vehLivery = parseInt(vehParams["livery"]);
				entity.setMod(48, vehLivery);
				entity.setLivery(vehLivery);
			}else{
				entity.setMod(48, -1);
				entity.setLivery(-1);
			}
			if(vehParams["tyresCanBurst"] !== undefined) {
				let tyresCanBurst = parseInt(vehParams["tyresCanBurst"]);
				if(tyresCanBurst == 0) entity.setTyresCanBurst(true);
				else entity.setTyresCanBurst(false);
			}else{
				entity.setTyresCanBurst(true);
			}
			
			entity.setExtra(1, 1);
			entity.setExtra(2, 1);
			entity.setExtra(3, 1);
			entity.setExtra(4, 1);
				
			if(parseInt(entity.isExtraTurnedOn(5)) != 1 && d3vehs[i].number) entity.setExtra(5, 0);
			else entity.setExtra(5, 1);
			if(parseInt(entity.isExtraTurnedOn(6)) != 1 && d3vehs[i].number) entity.setExtra(6, 0);
			else entity.setExtra(6, 1);
			let num = d3vehs[i].number.toString();
			num = num.split("|").join("");
			num = num.split(" ").join("");
			entity.setNumberPlateText(num);
			entity.numberPlateType = 4;
			entity.setNumberPlateTextIndex(4);
			
			entity.d3Veh = JSON.parse(JSON.stringify(d3vehs[i]));
		}
	}
}
reSpawnD3Vehs();
}