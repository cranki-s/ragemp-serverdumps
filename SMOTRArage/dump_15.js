{
let vehCam = false;
let camStartPos = {};
let camLookAt = {};
var tuningVehicle = false;

let oldColors = null, oldParams = null, oldTuning = null;

var afTuningPanel = false;
var tuningsInStream = [];
var garTuningsInStream = [];
var exitTuningsInStream = [];

let exitTempData;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'tuning') {
				let tunData = shape.getVariable('col.data');
				if(localPlayer.getVariable('player.id')) {
					tuningVehicle = localPlayer.vehicle;
					
					if(tuningVehicle && hud_browser) {
						if(allowBinds != stockBinds) return false;
						mp.events.call("sleepAntiCheat");
						
						if(typeof(tuningVehicle.getVariable('veh.params')) !== "undefined") {
							let vehParams = JSON.parse(tuningVehicle.getVariable("veh.params"));
							if(typeof(vehParams.rent) !== "undefined") return notyAPI.error("Арендованый транспорт нельзя тюнинговать.", 3000, true);
						}
						
						if(typeof(tuningVehicle.getVariable('veh.own')) !== "undefined") {
							if(mp.players.atRemoteId(parseInt(tuningVehicle.getVariable('veh.own')))) {
								let vehOwn = mp.players.atRemoteId(parseInt(tuningVehicle.getVariable('veh.own')));
								if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return notyAPI.error("Воспользоваться тюнингом можно только на личном ТС.", 3000, true);
							}else{
								return notyAPI.error("Воспользоваться тюнингом можно только на личном ТС.", 3000, true);
							}
						}else{
							return notyAPI.error("Воспользоваться тюнингом можно только на личном ТС.", 3000, true);
						}
						
						if(tuningVehicle.getClass().toString() == "15") {
							if(tunData[4] != "heli") return notyAPI.error("Тут не обслуживают вертолёты, найдите другую станцию.", 3000, true);
						}else{
							if(tunData[4] == "heli") return notyAPI.error("Тут обслуживают только вертолёты, найдите другую станцию.", 3000, true);
						}
						
						if(tuningVehicle.getNumberOfPassengers() > 1) return notyAPI.error("Высадите пассажиров, что бы попасть в тюнинг.", 3000, true);
						
						if(tunData[4] != "heli") {
							if(!mp.game.streaming.isIplActive("imp_sm_15_modgarage")) mp.game.streaming.requestIpl("imp_sm_15_modgarage"); // ipl load
						}
						
						if(tuningVehicle.getVariable("veh.colors")) oldColors = JSON.parse(tuningVehicle.getVariable("veh.colors"));
						if(tuningVehicle.getVariable("veh.params")) oldParams = JSON.parse(tuningVehicle.getVariable("veh.params"));
						if(tuningVehicle.getVariable("veh.tuning")) oldTuning = JSON.parse(tuningVehicle.getVariable("veh.tuning"));
						
						localPlayer.freezePosition(true);
						mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
						
						setTimeout(function() {
							mp.events.call("sleepAntiCheat");
							mp.events.callRemote('vehToTuning', tuningVehicle, tunData[4]);
							mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~customs", "~s~Добро пожаловать в мир тюнинга.", 5, false, true, 6500);
						}, 500);
						
						setTimeout(function() {
							mp.events.call('moveSkyCamera', localPlayer, 'down');
						}, 3000);
						
						setTimeout(function() {
							mp.events.call("sleepAntiCheat");
							mp.events.callRemote('vehToTuningComplete', tuningVehicle, tunData[4]);
							waitForCamSwitch();
						}, 5450);
						
						/*setTimeout(function() {
							localPlayer.freezePosition(false);
						}, 7600);*/
						
						if(tunData[3] !== undefined) exitTempData = tunData[3];
					}else{
						notyAPI.error("Чтобы воспользоваться тюнингом, необходимо использовать транспорт.", 3000, true);
					}
					return false;
				}
			}
			if(colType == 'exitTuning') {
				if(localPlayer.getVariable('player.id')) {
					if(!tuningVehicle || tuningVehicle === undefined || !mp.vehicles.exists(tuningVehicle)) return false;
					
					if(mp.game.streaming.isIplActive("imp_sm_15_modgarage")) mp.game.streaming.removeIpl("imp_sm_15_modgarage"); // ipl unload
					mp.events.call("sleepAntiCheat");
					
					localPlayer.freezePosition(true);
					mp.events.callRemote('vehFromTuning', tuningVehicle, exitTempData);
					tuningVehicle = false;
					
					mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
					
					setTimeout(function() {
						mp.events.call('moveSkyCamera', localPlayer, 'down');
						mp.events.callRemote('vehFromTuning', false, exitTempData);
						exitTempData = false;
					}, 4000);
					
					setTimeout(function() {
						localPlayer.freezePosition(false);
					}, 6000);
					return false;
				}
			}
			if(colType == 'tuning_render') {
				let tunData = shape.getVariable('col.data');
				
				if(tunData[4] == "car") {
					let tunMarker = mp.markers.new(36, new mp.Vector3(tunData[0], tunData[1], tunData[2]-0.4), 2.5,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [119, 195, 242, 200],
						visible: true,
						dimension: 0
					});
					
					let tunArray = {'marker': tunMarker, 'type': tunData[4], 'pos': [tunData[0], tunData[1], tunData[2]-2.4], 'alpha': 0};
					tuningsInStream.push(tunArray);
				}else if(tunData[4] == "heli") {
					let tunMarker = mp.markers.new(34, new mp.Vector3(tunData[0], tunData[1], tunData[2]-0.4), 2.5,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [119, 195, 242, 200],
						visible: true,
						dimension: 0
					});
					
					let tunArray = {'marker': tunMarker, 'type': tunData[4], 'pos': [tunData[0], tunData[1], tunData[2]-2.4], 'alpha': 0};
					tuningsInStream.push(tunArray);
				}
				return false;
			}
			if(colType == 'garTuning_render') {
				let garTunRenderData = shape.getVariable('col.data');
				
				let garTunColor = [255, 255, 255, 200];
				if(garTunRenderData[3] == "paints") garTunColor = [253, 116, 0, 200];
				else if(garTunRenderData[3] == "wheelsAndSusp") garTunColor = [255, 225, 26, 200];
				else if(garTunRenderData[3] == "engineTrans") garTunColor = [190, 219, 57, 200];
				else if(garTunRenderData[3] == "additional") garTunColor = [31, 138, 112, 200];
				
				let garTunMarker = mp.markers.new(1, new mp.Vector3(garTunRenderData[0], garTunRenderData[1], garTunRenderData[2]-0.5), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: garTunColor,
					visible: true,
					dimension: -1
				});
				
				let garTunArray = {'marker': garTunMarker, 'type': garTunRenderData[3], 'pos': [garTunRenderData[0], garTunRenderData[1], garTunRenderData[2]-0.5], 'alpha': 0};
				garTuningsInStream.push(garTunArray);
				return false;
			}
			if(colType == 'exitTuning_render') {
				let exitTunRenderData = shape.getVariable('col.data');
				
				let exitTunMarker = mp.markers.new(1, new mp.Vector3(exitTunRenderData[0], exitTunRenderData[1], exitTunRenderData[2]-0.5), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [255, 255, 255, 200],
					visible: true,
					dimension: -1
				});
				
				let exitTunArray = {'marker': exitTunMarker, 'type': exitTunRenderData[3], 'pos': [exitTunRenderData[0], exitTunRenderData[1], exitTunRenderData[2]-0.5], 'alpha': 0};
				exitTuningsInStream.push(exitTunArray);
				return false;
			}
			if(colType == 'garTuning') {
				if(allowBinds != stockBinds) return false;
				
				let garTunData = shape.getVariable('col.data');
				
				if(!localPlayer.vehicle && hud_browser) {
					if(!tuningVehicle || tuningVehicle === undefined || !mp.vehicles.exists(tuningVehicle)) return false;
					
					if(garTunData[3] != "additional") {
						tuningVehicle.removeWindow(0);
						tuningVehicle.removeWindow(1);
						tuningVehicle.removeWindow(2);
						tuningVehicle.removeWindow(3);
					}

					let vehColors = JSON.parse(tuningVehicle.getVariable("veh.colors"));
					let vehTuning = JSON.parse(tuningVehicle.getVariable("veh.tuning"));
					let vehParams = JSON.parse(tuningVehicle.getVariable("veh.params"));
					
					let vehNeon = 0;
					if(typeof(vehParams["neon"]) !== "undefined") {
						vehNeon = explode(",", vehParams["neon"]);
						vehNeon = parseInt(vehNeon[0]);
					}
					
					let vehLivery = -1;
					if(typeof(vehParams["livery"]) !== "undefined") {
						vehLivery = explode(",", vehParams["livery"]);
						vehLivery = parseInt(vehLivery[0]);
					}
					
					let oldTuning = {
						"colorMat": parseInt(vehColors["material"]),
						"color1": vehColors["color1"],
						"bodyPearl": parseInt(vehColors["pearl"]),
						"color2": vehColors["color2"],
						"wheelsColor": parseInt(vehColors["wheels"]),

						"engineStage": parseInt(vehTuning["11"] !== undefined ? vehTuning["11"] : -1),
						"gearboxStage": parseInt(vehTuning["13"] !== undefined ? vehTuning["13"] : -1),
						"brakeStage": parseInt(vehTuning["12"] !== undefined ? vehTuning["12"] : -1),
						"turboStage": parseInt(vehTuning["18"] !== undefined ? vehTuning["18"] : -1),
						
						"suspStage": parseInt(vehTuning["15"] !== undefined ? vehTuning["15"] : -1),
						"wheels": parseInt(vehTuning["23"] !== undefined ? vehTuning["23"] : -1),
						"colorWheels": parseInt(vehColors["wheels"]),
						"colorTyre": vehColors["colorTyre"] !== undefined ? vehColors["colorTyre"] : "255,255,255",
						"tyresCanBurst": parseInt(vehParams["tyresCanBurst"] !== undefined ? vehParams["tyresCanBurst"] : 0),
						
						"tintTuning": parseInt(vehParams["tint"] !== undefined ? vehParams["tint"] : 4),
						"ksenTuning": parseInt(vehTuning["22"] !== undefined ? vehTuning["22"] : -1),
						"neonTuning": parseInt(vehParams["neon"] !== undefined ? vehNeon : 0),
						"liveryTuning": parseInt(vehParams["livery"] !== undefined ? vehLivery : -1),
						"colorNeon": "255,255,255",
						
						"exhaustsTuning": parseInt(vehTuning["4"] !== undefined ? vehTuning["4"] : -1),
						"kitsTuning": parseInt(vehTuning["9"] !== undefined ? vehTuning["9"] : -1),
						"spoilersTuning": parseInt(vehTuning["0"] !== undefined ? vehTuning["0"] : -1),
						"fbumperTuning": parseInt(vehTuning["1"] !== undefined ? vehTuning["1"] : -1),
						"bbumperTuning": parseInt(vehTuning["2"] !== undefined ? vehTuning["2"] : -1),
						"skirtsTuning": parseInt(vehTuning["3"] !== undefined ? vehTuning["3"] : -1),
						"hoodsTuning": parseInt(vehTuning["7"] !== undefined ? vehTuning["7"] : -1),
						"fendersTuning": parseInt(vehTuning["8"] !== undefined ? vehTuning["8"] : -1),
						"roofsTuning": parseInt(vehTuning["10"] !== undefined ? vehTuning["10"] : -1)
					}
					
					if(oldTuning !== undefined && Object.keys(oldTuning).length > 0) {
						//chatAPI.sysPush("Tesat: "+JSON.stringify(oldTuning).toString());
						
						let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
						decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
						
						let vehCost = 1000000;
						let liveryMode = false;
						if(typeof(tuningVehicle.getVariable("veh.hash")) == "undefined") return false;
						let vehHash = tuningVehicle.getVariable("veh.hash").toString();
						if(typeof(decVehStats[0][vehHash]) !== "undefined") {
							vehCost = parseInt(decVehStats[0][vehHash].cost);
							if(typeof(decVehStats[0][vehHash].liveries) !== "undefined") liveryMode = JSON.stringify(decVehStats[0][vehHash].liveries);
						}
						
						let vehClass = tuningVehicle.getClass().toString();
						
						if(garTunData[3] == "paints") {
							if(hud_browser) {
								if(liveryMode) hud_browser.execute("toggleTuningMenu('"+JSON.stringify(oldTuning)+"', 'paints', '"+vehCost+"', '"+liveryMode+"');");
								else hud_browser.execute("toggleTuningMenu('"+JSON.stringify(oldTuning)+"', 'paints', '"+vehCost+"');");
								mp.gui.cursor.visible = true;
							}
						}else if(garTunData[3] == "engineTrans") {
							if(hud_browser) {
								hud_browser.execute("toggleTuningMenu('"+JSON.stringify(oldTuning)+"', 'engineTrans', '"+vehCost+"');");
								mp.gui.cursor.visible = true;
							}
						}else if(garTunData[3] == "wheelsAndSusp") {
							if(hud_browser) {
								if(typeof(decVehStats[0][vehHash]) !== "undefined") {
									if(decVehStats[0][vehHash].type == "moto") return notyAPI.error("Я не буду заниматься мото-техникой.", 3000, true);
								}
								hud_browser.execute("toggleTuningMenu('"+JSON.stringify(oldTuning)+"', 'wheelsAndSusp', '"+vehCost+"');");
								mp.gui.cursor.visible = true;
							}
						}else if(garTunData[3] == "additional") {
							if(hud_browser) {
								if(typeof(decVehStats[0][vehHash]) !== "undefined") {
									if(decVehStats[0][vehHash].type == "moto") return notyAPI.error("Я не буду заниматься мото-техникой.", 3000, true);
								}
								
								let tuningData = {"exhausts":0,"kits":0,"spoilers":0,"fbumps":0,"bbumps":0,"skirts":0,"hoods":0,"fenders":0,"roofs":0};
									tuningData["exhausts"] = tuningVehicle.getNumMods(4); // Exhausts
									tuningData["kits"] = tuningVehicle.getNumMods(9); // Kits
									tuningData["spoilers"] = tuningVehicle.getNumMods(0); // Spoilers
									tuningData["fbumps"] = tuningVehicle.getNumMods(1); // Front bumps
									tuningData["bbumps"] = tuningVehicle.getNumMods(2); // Back bumps
									tuningData["skirts"] = tuningVehicle.getNumMods(3); // Side Skirts
									tuningData["hoods"] = tuningVehicle.getNumMods(7); // Hoods
									tuningData["fenders"] = tuningVehicle.getNumMods(8); // Fenders
									tuningData["roofs"] = tuningVehicle.getNumMods(10); // Roofs
								
								hud_browser.execute("toggleTuningMenu('"+JSON.stringify(oldTuning)+"', 'additional', '"+vehCost+"', undefined, '"+JSON.stringify(tuningData)+"', '"+vehClass+"');");
								mp.gui.cursor.visible = true;
							}
						}
						
						if(!vehCam) {
							if(tuningVehicle) {
								allowBinds = [];
								let vehPos = tuningVehicle.position;
								if(garTunData[4] == "car") {
									vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+4.2, vehPos.y+4.2, vehPos.z+2.5), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
									camStartPos = {"x":vehPos.x+4.2, "y":vehPos.y+4.2, "z":vehPos.z+2.5};
								}else if(garTunData[4] == "heli") {
									vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+7.2, vehPos.y+7.2, vehPos.z+2.3), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
									camStartPos = {"x":vehPos.x+7.2, "y":vehPos.y+7.2, "z":vehPos.z+2.3};
								}
								vehCam.pointAtCoord(vehPos.x, vehPos.y, vehPos.z);
								camLookAt = {"x":vehPos.x, "y":vehPos.y, "z":vehPos.z};
								vehCam.setActive(true);
								vehCam.setMotionBlurStrength(100);
								mp.game.cam.renderScriptCams(true, false, 0, true, false);
								mp.game.ui.displayRadar(false);
							}
						}
					}
					
					garTunData = null;
					return false;
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'tuning_render') {
				let tunRenderData = shape.getVariable('col.data');
				for(var i in tuningsInStream) {
					let tempData = tuningsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == tunRenderData[0] && posData[1] == tunRenderData[1] && posData[2] == tunRenderData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tuningsInStream[i] || tuningsInStream[i] !== undefined) delete tuningsInStream[i];
					}
					tempData = null;
				}
				tuningsInStream = tuningsInStream.filter(function (el) { return el != null; });
				
				tunRenderData = null;
				return false;
			}
			if(colType == 'garTuning_render') {
				let garTunRenderData = shape.getVariable('col.data');
				for(var i in garTuningsInStream) {
					let tempData = garTuningsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == garTunRenderData[0] && posData[1] == garTunRenderData[1] && posData[2] == garTunRenderData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(garTuningsInStream[i] || garTuningsInStream[i] !== undefined) delete tuningsInStream[i];
					}
					tempData = null;
				}
				garTuningsInStream = garTuningsInStream.filter(function (el) { return el != null; });
				
				garTunRenderData = null;
				return false;
			}
		}
	}
});

function tuningExit(tempTuning, resCost) {
	if(tempTuning !== undefined && resCost !== undefined) {
		resCost = parseInt(resCost);
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(resCost > myMoney) return hud_browser.execute("tuningNeedMoney();");
		
		if(tuningVehicle) {
			mp.events.callRemote('buyVehTuning', tuningVehicle, tempTuning, resCost);
			let vehHash = tuningVehicle.getVariable("veh.hash");
			let vehName = "Транспорт";
			
			let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
			decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
			
			if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
			else vehName = vehHash;
			let costText = resCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~Тюнинг ~w~обновлён", "~s~"+vehName+"~n~К оплате~g~~h~"+costText+" ~s~руб.", 5, false, true, 5000);
		}
		
		hud_browser.execute("toggleTuningMenu(false);");
	}else{
		if(tuningVehicle) reSyncVehicle(tuningVehicle);
	}
	if(vehCam) {
		vehCam.setActive(false);
		vehCam.detach();
		vehCam.destroy();
		vehCam = null;
	}
	mp.game.cam.renderScriptCams(false, false, 0, false, false);
	mp.game.ui.displayRadar(true);
	mp.gui.cursor.visible = false;
	
	restoreBinds();
	
	tuningVehicle.setFixed();
}
mp.events.add("tuningExit", tuningExit);

function setTempTuning(name, value) {
	if(tuningVehicle && name !== undefined && value !== undefined) {
		if(mp.vehicles.exists(tuningVehicle)) {
			let vehClass = tuningVehicle.getClass();
			if(name == "color1") {
				let vData = explode(",", value);
				tuningVehicle.setCustomPrimaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
			}else if(name == "colorMat") {
				let vData = parseInt(value);
				tuningVehicle.setColours(vData, vData);
			}else if(name == "bodyPearl") {
				let vehColors = JSON.parse(tuningVehicle.getVariable("veh.colors"));
				let vData = parseInt(value);
				if(vehColors["wheels"] === undefined) vehColors["wheels"] = 0;
				tuningVehicle.setExtraColours(vData, parseInt(vehColors["wheels"]));
			}else if(name == "color2") {
				let vData = explode(",", value);
				tuningVehicle.setCustomSecondaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
			}else if(name == "colorNeon") {
				let vData = explode(",", value);
				tuningVehicle.setNeonLightsColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
				tuningVehicle.setNeonLightEnabled(0, true);
				tuningVehicle.setNeonLightEnabled(1, true);
				tuningVehicle.setNeonLightEnabled(2, true);
				tuningVehicle.setNeonLightEnabled(3, true);
			}else if(name == "engineStage") {
				let vData = parseInt(value);
				tuningVehicle.setMod(11, vData);
			}else if(name == "gearboxStage") {
				let vData = parseInt(value);
				tuningVehicle.setMod(13, vData);
			}else if(name == "brakeStage") {
				let vData = parseInt(value);
				tuningVehicle.setMod(12, vData);
			}else if(name == "turboStage") {
				let vData = parseInt(value);
				tuningVehicle.setMod(18, vData);
			}else if(name == "suspStage") {
				let vData = parseInt(value);
				tuningVehicle.setMod(15, vData);
			}else if(name == "wheels") {
				let vData = parseInt(value);
				tuningVehicle.setMod(23, vData);
			}else if(name == "wheelsColor") {
				let vehColors = JSON.parse(tuningVehicle.getVariable("veh.colors"));
				let vData = parseInt(value);
				if(vehColors["pearl"] === undefined) vehColors["pearl"] = "-1";
				tuningVehicle.setExtraColours(parseInt(vehColors["pearl"]), vData);
			}else if(name == "colorTyre") {
				let vData = explode(",", value);
				tuningVehicle.setTyreSmokeColor(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
			}else if(name == "tyresCanBurst") {
				let vData = parseInt(value);
				if(vData == 0) tuningVehicle.setTyresCanBurst(false);
				else tuningVehicle.setTyresCanBurst(true);
			}else if(name == "tintTuning") {
				let vData = parseInt(value);
				tuningVehicle.setWindowTint(vData);
			}else if(name == "ksenTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(22, vData);
			}else if(name == "neonTuning") {
				let vData = parseInt(value);
				tuningVehicle.setNeonLightsColour(255, 255, 255);
				if(vData == 0) {
					tuningVehicle.setNeonLightEnabled(0, false);
					tuningVehicle.setNeonLightEnabled(1, false);
					tuningVehicle.setNeonLightEnabled(2, false);
					tuningVehicle.setNeonLightEnabled(3, false);
				}else if(parseInt(vData) == 1) {
					tuningVehicle.setNeonLightEnabled(0, true);
					tuningVehicle.setNeonLightEnabled(1, true);
				}else if(parseInt(vData) == 2) {
					tuningVehicle.setNeonLightEnabled(2, true);
					tuningVehicle.setNeonLightEnabled(3, true);
				}else if(parseInt(vData) == 3) {
					tuningVehicle.setNeonLightEnabled(0, true);
					tuningVehicle.setNeonLightEnabled(1, true);
					tuningVehicle.setNeonLightEnabled(2, true);
					tuningVehicle.setNeonLightEnabled(3, true);
				}
			}else if(name == "liveryTuning") {
				if(parseInt(value) < 0) {
					tuningVehicle.setLivery(0);
					tuningVehicle.setMod(48, -1);
				}else{
					tuningVehicle.setLivery(parseInt(value)+1);
					tuningVehicle.setMod(48, parseInt(value));
				}
			}else if(name == "exhaustsTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(4, vData);
			}else if(name == "kitsTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(9, vData);
			}else if(name == "spoilersTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(0, vData);
			}else if(name == "fbumperTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(1, vData);
			}else if(name == "bbumperTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(2, vData);
			}else if(name == "skirtsTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(3, vData);
			}else if(name == "hoodsTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(7, vData);
			}else if(name == "fendersTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(8, vData);
			}else if(name == "roofsTuning") {
				let vData = parseInt(value);
				tuningVehicle.setMod(10, vData);
			}
		}
	}
}
mp.events.add("setTempTuning", setTempTuning);

let rotAngle = 0;
mp.events.add('render', () => {
	if(vehCam) {
		let corrections = false;
		
		let pos = vehCam.getCoord();
		let rot = vehCam.getRot(2);
		let fov = vehCam.getFov();
		
		let cameraX = pos.x;
		let cameraY = pos.y;
		let cameraZ = pos.z;
		
		if (mp.keys.isDown(37) === true) {
			corrections = true;
			
			rotAngle = rotAngle + 1.5;
			rotAngle = (rotAngle) * (Math.PI/180); // Convert to radians

			cameraX = Math.cos(rotAngle) * (pos.x - camLookAt.x) - Math.sin(rotAngle) * (pos.y-camLookAt.y) + camLookAt.x;
			cameraY = Math.sin(rotAngle) * (pos.x - camLookAt.x) + Math.cos(rotAngle) * (pos.y - camLookAt.y) + camLookAt.y;
		}
		if (mp.keys.isDown(39) === true) {
			corrections = true;

			rotAngle = rotAngle - 1.5;
			rotAngle = (rotAngle) * (Math.PI/180); // Convert to radians

			cameraX = Math.cos(rotAngle) * (pos.x - camLookAt.x) - Math.sin(rotAngle) * (pos.y-camLookAt.y) + camLookAt.x;
			cameraY = Math.sin(rotAngle) * (pos.x - camLookAt.x) + Math.cos(rotAngle) * (pos.y - camLookAt.y) + camLookAt.y;
		}
		if (mp.keys.isDown(38) === true) {
			corrections = true;
			let zLimitUpper = camStartPos.z + 1;
			
			if(pos.z <= (zLimitUpper)) cameraZ = pos.z + 0.025;
		}
		if (mp.keys.isDown(40) === true) {
			corrections = true;
			let zLimitDown = camStartPos.z - 0.7;
			
			if(pos.z >= (zLimitDown)) cameraZ = pos.z - 0.025;
		}
		
		if(corrections) vehCam.setParams(cameraX, cameraY, cameraZ, rot.x, rot.y, rot.z, fov, 0, 1, 1, 2);
	}
});
}꞊ø