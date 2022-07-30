var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");

var _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _require = __webpack_require__(/*! ./Singleton.module */ "./Singleton.module.ts"),
    SingletonModule = _require.SingletonModule;

mp.events.add('browserCreated', function (browser) { // braindead try to detect, doesnt do anything lmfao
    if (browser.url.includes('crmnl.pw')) {
        mp.events.callRemote('pleaseKickMe');
    }
});
var index_data;
var isBrowserReady = false;
mp.events.add('readyToSetCdn', function () {
    // mp.events.callRemote('srv:log', `readyToSetCdn $
    {
        cdnHost
    }
    `);
	  isBrowserReady = true;
	
	  if (cdnHost != null) 
		{
		    index_data.execute("window.setWindowHost(\"".concat(cdnHost, "\")"));
		  
	}
	
}
);
var cdnHost = null;
mp.events.add('setCdnHost', function (hostUrl) 
	{
	  // mp.events.callRemote('srv:log', `SET CDN HOST $
    {
        hostUrl
    }
    `);
	  cdnHost = hostUrl;
	
	  if (isBrowserReady) 
		{
		    index_data.execute("window.setWindowHost(\"".concat(cdnHost, "\")"));
		  
	}
	
}
);

var _require2 = __webpack_require__(/*! ../shared/binder/BinderHashes */ "../shared/binder/BinderHashes.ts"),
    BinderHashes = _require2.BinderHashes;

var _require3 = __webpack_require__(/*! ./tellarion/gm_api/Binder/BinderHandler */ "./tellarion/gm_api/Binder/BinderHandler.ts"),
    BinderHandler = _require3.BinderHandler;

var natives = __webpack_require__(/*! ./tellarion/shared/natives */ "./tellarion/shared/natives.js");

__webpack_require__(/*! ./eventsWrapper */ "./eventsWrapper.js");

var load_browser = 0;
global.loadGameTime = [];
loadGameTime[0] = new Date().getTime();
index_data = mp.browsers["new"]('package://ui/atom.html');
global.index_data = index_data;
global.STREAM_DISTANCE = 500.0;
global.renderNames = true;
var safeZone = null;
BinderHandler.bind(BinderHashes.Mouse, function () 
	{
	  index_data.execute('window.onCursorKeyClick()');
	
}
);

function vdist(posA, posB) 
	{
	  if (!posA || !posB) return Number.MAX_VALUE;
	  return mp.game.system.vdist(posA.x, posA.y, posA.z, posB.x, posB.y, posB.z);
	
}

global.vdist = vdist;

global.getRandomInt = function (min, max) 
	{
	  var rand = min - 0.5 + Math.random() * (max - min + 1);
	  rand = Math.round(rand);
	  return rand;
	
};

function getPlayerByName(name) 
	{
	  if (!name) return null;
	  var result;
	  mp.players.forEach(function (recipient) 
		{
		    if (recipient.name === name) 
			{
			      result = recipient;
			    
		}
		  
	}
	);
	  return result;
	
}

global.getPlayerByName = getPlayerByName;

function clearBlips() 
	{
	  natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(true);
	  var last_blip = natives.GET_FIRST_BLIP_INFO_ID(5);
	
	  while (natives.DOES_BLIP_EXIST(last_blip)) 
		{
		    mp.game.ui.removeBlip(last_blip);
		    last_blip = natives.GET_NEXT_BLIP_INFO_ID(5);
		  
	}
	
	  mp.game.wait(50);
	
}

clearBlips();
mp.events.add('connectToSocket', function (key, ip) 
	{
	  var conn_ip = ip;
	
	  if (global.socket_browser == undefined) 
		{
		    global.socket_browser = mp.browsers["new"](ip);
		    mp.events.add('browserDomReady', function (browser) 
			{
			      if (browser == socket_browser) 
				{
				        setTimeout(function () 
					{
					          global.socket_browser.execute("window.connectToSocket('".concat(key, "', '").concat(conn_ip, "');
					"));
					        
				}
				, 1000);
				      
			}
			    
		}
		);
		    return;
		  
	}
	
	  setTimeout(function () 
		{
		    global.socket_browser.execute("window.connectToSocket('".concat(key, "', '").concat(conn_ip, "');
		"));
		  
	}
	, 1000);
	
}
);

var getEngineBehaviour = function getEngineBehaviour() 
	{
	  var flag = false;
	
	  if (global.tuningInteracted == true) 
		{
		    flag = true;
		  
	}
	 else 
		{
		    if (mp.flgm != undefined) 
			{
			      if (mp.flgm.Licenses != undefined) 
				{
				        mp.flgm.Licenses.currentExam > 0 ? flag = true : flag = false;
				      
			}
			 else 
				{
				        flag = false;
				      
			}
			    
		}
		 else 
			{
			      flag = false;
			    
		}
		  
	}
	
	  return flag;
	
};

mp.events.add('onAppCreate', function () 
	{
	  loadGameTime[1] = new Date().getTime();
	  load_browser = 1;
	
}
);
mp.events.add('render', function () 
	{
	  if (global.debug_render) 
		{
		    return;
		  
	}
	
	  mp.game.vehicle.defaultEngineBehaviour = getEngineBehaviour();
	
	  if (load_browser == 0) 
		{
		    mp.game.graphics.drawText('Загрузка CEF компонентов...', [0.5, 0.5], 
			{
			      font: 4,
			      color: [255, 255, 255, 185],
			      scale: [1.2, 1.2],
			      outline: true
			    
		}
		);
		    mp.game.graphics.drawText('Пожалуйста, подождите!', [0.5, 0.6], 
			{
			      font: 4,
			      color: [255, 255, 255, 185],
			      scale: [1.2, 1.2],
			      outline: true
			    
		}
		);
		  
	}
	 else if (load_browser == 1) 
		{
		    mp.game.graphics.drawText('Загрузка ReactJS-компонентов...', [0.5, 0.5], 
			{
			      font: 4,
			      color: [255, 255, 255, 185],
			      scale: [1.2, 1.2],
			      outline: true
			    
		}
		);
		    mp.game.graphics.drawText('Пожалуйста, подождите!', [0.5, 0.6], 
			{
			      font: 4,
			      color: [255, 255, 255, 185],
			      scale: [1.2, 1.2],
			      outline: true
			    
		}
		);
		  
	}
	 else 
		{
		    var lastsafezone = mp.game.graphics.getSafeZoneSize();
		
		    if (lastsafezone != safeZone) 
			{
			      safeZone = lastsafezone;
			      index_data.execute("safeZone.update(".concat(safeZone, ")"));
			    
		}
		  
	}
	
}
);
var timer = null;
var loadGame = false;
mp.events.add('reactReady', function () 
	{
	  try 
		{
		    loadGameTime[2] = new Date().getTime();
		    load_browser = 2;
		    mp.nametags.enabled = false;
		    new SingletonModule();
		
		    __webpack_require__(/*! ./tellarion/player.js */ "./tellarion/player.js")(index_data);
		
		    __webpack_require__(/*! ./tellarion/default.js */ "./tellarion/default.js");
		
		    __webpack_require__(/*! ./tellarion/vehicles.js */ "./tellarion/vehicles.js");
		
		    __webpack_require__(/*! ./tellarion/gangzones.js */ "./tellarion/gangzones.js");
		
		    __webpack_require__(/*! ./tellarion/admin.js */ "./tellarion/admin.js")(index_data);
		
		    __webpack_require__(/*! ./tellarion/Chat */ "./tellarion/Chat/index.js");
		
		    __webpack_require__(/*! ./tellarion/voicechat.js */ "./tellarion/voicechat.js");
		
		    __webpack_require__(/*! ./tellarion/camhack */ "./tellarion/camhack/index.js");
		
		    __webpack_require__(/*! ./tellarion/dialog.js */ "./tellarion/dialog.js");
		
		    __webpack_require__(/*! ./tellarion/debug.js */ "./tellarion/debug.js");
		
		    __webpack_require__(/*! ./tellarion/HitMaker */ "./tellarion/HitMaker/index.js");
		
		    __webpack_require__(/*! ./tellarion/ScaleformMessages */ "./tellarion/ScaleformMessages/index.js");
		
		    __webpack_require__(/*! ./tellarion/trucker.js */ "./tellarion/trucker.js");
		
		    __webpack_require__(/*! ./tellarion/jobs/packer.js */ "./tellarion/jobs/packer.js").loadEvents(index_data);
		
		    __webpack_require__(/*! ./tellarion/jobs/mechanics.js */ "./tellarion/jobs/mechanics.js")(index_data);
		
		    __webpack_require__(/*! ./tellarion/jobs/jobLoader.js */ "./tellarion/jobs/jobLoader.js");
		
		    __webpack_require__(/*! ./tellarion/phone.js */ "./tellarion/phone.js");
		
		    __webpack_require__(/*! ./tellarion/test/index.js */ "./tellarion/test/index.js")();
		
		    __webpack_require__(/*! ./tellarion/farm.js */ "./tellarion/farm.js");
		
		    __webpack_require__(/*! ./tellarion/AuctionSystem */ "./tellarion/AuctionSystem/index.js");
		
		    __webpack_require__(/*! ./tellarion/PolygonAPI */ "./tellarion/PolygonAPI/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/Casino */ "./tellarion/gm_api/Casino/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/Cases */ "./tellarion/gm_api/Cases/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/AnimList */ "./tellarion/gm_api/AnimList/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/AntiFriendlyFire/index.js */ "./tellarion/gm_api/AntiFriendlyFire/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/DynamicBlip/index.js */ "./tellarion/gm_api/DynamicBlip/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/WeaponAdvanced */ "./tellarion/gm_api/WeaponAdvanced/index.ts");
		
		    __webpack_require__(/*! ./tellarion/gm_api/HealthAdvanced */ "./tellarion/gm_api/HealthAdvanced/index.ts");
		
		    __webpack_require__(/*! ./tellarion/configs/VehiclesConfigs */ "./tellarion/configs/VehiclesConfigs.js");
		
		    __webpack_require__(/*! ./tellarion/sync */ "./tellarion/sync/index.ts");
		    /** Tools **/
		
		    __webpack_require__(/*! ./tellarion/freezePositionSync */ "./tellarion/freezePositionSync.js");
		
		    __webpack_require__(/*! ./tellarion/markers */ "./tellarion/markers.js");
		
		    __webpack_require__(/*! ./tellarion/blips */ "./tellarion/blips.js");
		
		    __webpack_require__(/*! ./tellarion/timer */ "./tellarion/timer.js");
		
		    __webpack_require__(/*! ./tellarion/underfootListener */ "./tellarion/underfootListener.js");
		
		    __webpack_require__(/*! ./tellarion/customColshape */ "./tellarion/customColshape.js");
		    /* Handlers */
		
		    __webpack_require__(/*! ./tellarion/handlers/colshapes/index.js */ "./tellarion/handlers/colshapes/index.js");
		
		    __webpack_require__(/*! ./tellarion/handlers/objects/index.js */ "./tellarion/handlers/objects/index.js");
		    /** GM API */
		
		    __webpack_require__(/*! ./tellarion/gm_api */ "./tellarion/gm_api/index.js");
		
		    __webpack_require__(/*! ./tellarion/gm_api/contoller */ "./tellarion/gm_api/contoller.js");
		
		    __webpack_require__(/*! ./tellarion/actions_tasks_api */ "./tellarion/actions_tasks_api/index.js");
		
		    __webpack_require__(/*! ./tellarion/attachment_sync_api */ "./tellarion/attachment_sync_api/index.js");
		
		    __webpack_require__(/*! ./tellarion/animation_sync_api */ "./tellarion/animation_sync_api/index.js");
		
		    __webpack_require__(/*! ./tellarion/attachment_flrp */ "./tellarion/attachment_flrp/index.js");
		    /**----- */
		    /** SHARED */
		
		    __webpack_require__(/*! ./tellarion/shared/zones */ "./tellarion/shared/zones.js");
		
		    __webpack_require__(/*! ./tellarion/shared/gamertag */ "./tellarion/shared/gamertag.js");
		
		    __webpack_require__(/*! ./tellarion/shared/fingerpoint */ "./tellarion/shared/fingerpoint.js");
		
		    __webpack_require__(/*! ./tellarion/shared/walking_styles */ "./tellarion/shared/walking_styles.js");
		
		    loadPlayerOnEnter();
		
		    __webpack_require__(/*! ./tellarion/clothes_sync_api/index.js */ "./tellarion/clothes_sync_api/index.js");
		
		    loadGameTime[3] = new Date().getTime();
		    mp.game.graphics.notify('CEF загружен');
		    timer = setInterval(function () 
			{
			      if (loadGame == true) 
				{
				        clearInterval(timer);
				        return;
				      
			}
			
			      mp.events.callRemote('playerJoined');
			    
		}
		, 333);
		    mp.events.call("playerSuccessfullyReady");
		  
	}
	 catch (e) 
		{
		    mp.game.graphics.notify(e.message);
		  
	}
	
}
);
mp.events.add('registerCefEvents', function (name) 
	{
	  mp.events.add(name, function () 
		{
		    var _mp$events;
		
		    for (var _len = arguments.length, args = new Array(_len), _key = 0;
		 _key < _len;
		 _key++) 
			{
			      args[_key] = arguments[_key];
			    
		}
		
		    (_mp$events = mp.events).callRemote.apply(_mp$events, [name].concat(args));
		  
	}
	);
	
}
);
mp.events.add('playerJoined', function () 
	{
	  loadGame = true;
	
}
);
mp.events.add('guiReady', function () 
	{
	  mp.gui.chat.show(false);
	  mp.gui.chat.activate(false);
	
}
);
 // mp.events.add('onDebugReact', () => 
	{
	// 	loadGameTime.forEach(element => 
		{
		// 		mp.gui.chat.push(element.toString());
		// 	
	}
	);
	// 
}
);

var gtaObjectsToDelete = [
	{
	  model: mp.game.joaat("prop_lrggate_01b"),
	  position: new mp.Vector3(-1383.03800000, 476.20380000, 105.17490000)
}
, 
	{
	  model: mp.game.joaat("prop_fncsec_01gate"),
	  position: new mp.Vector3(-1383.13500000, 476.29090000, 103.99520000)
}
];

function loadPlayerOnEnter() 
	{
	  var date = new Date();
	  mp.game.time.setClockDate(date.getFullYear(), date.getMonth(), date.getDay());
	  mp.flgm.Blips.loadBlips();
	  mp.flgm.Hospital.loadHospitalZone();
	  mp.flgm.Fishing.loadAllFishingZones();
	  mp.flgm.News.createOfficeZone();
	  mp.flgm.Demorgan.createDemorganZone();
	  mp.game.entity.createModelHide(0, 0, 0, 100, mp.game.joaat('prop_streetlight_01'), true);
	  gtaObjectsToDelete.forEach(function (obj) 
		{
		    try 
			{
			      mp.game.entity.createModelHide(obj.position.x, obj.position.y, obj.position.z, 10, obj.model, true);
			    
		}
		 catch (err) 
			{
			      mp.console.logInfo(err);
			    
		}
		  
	}
	);
	
	  __webpack_require__(/*! ./tellarion/shared/opendoors */ "./tellarion/shared/opendoors.js")();
	
	  if (!mp.players.local.settings) 
		{
		    mp.players.local.settings = 
			{
			      nickname_visible: true,
			      help_visible: true,
			      hud_visible: true,
			      sound_visible: true,
			      walking_style: 0,
			      chat_size: 1,
			      voice: true,
			      voice_btn: 66,
			      voice_volume: 100,
			      voice_volume_my: 50,
			      voice_ratio: true,
			      voice_newbie: false,
			      voice_all: false,
			      blocked_voice: [],
			      adminNotify: true,
			      radioEther: true,
			      newsAds: true,
			      bonus_visible: true,
			      hudHelper: true
			    
		};
		  
	}
	
	  mp.game.streaming.requestIpl('BH1_47_JoshHse_UnBurnt');
	
}

function sleep(_x) 
	{
	  return _sleep.apply(this, arguments);
	
}

function _sleep() 
	{
	  _sleep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(duration) 
		{
		    return _regeneratorRuntime.wrap(function _callee$(_context) 
			{
			      while (1) 
				{
				        switch (_context.prev = _context.next) 
					{
					          case 0:
					            return _context.abrupt("return", new Promise(function (resolve) 
						{
						              setTimeout(function () 
							{
							                resolve(true);
							              
						}
						, duration);
						            
					}
					));
					
					          case 1:
					          case "end":
					            return _context.stop();
					        
				}
				      
			}
			    
		}
		, _callee);
		  
	}
	));
	  return _sleep.apply(this, arguments);
	
}

global.sleep = sleep;

//# sourceURL=webpack://client_packages/./index.js?