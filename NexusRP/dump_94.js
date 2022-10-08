{
mp.attachmentMngr =
{
	attachments: {},

	addFor: function(entity, id)
	{
		if(this.attachments.hasOwnProperty(id))
		{
			if(!entity.__attachmentObjects ||!entity.__attachmentObjects.hasOwnProperty(id))
			{
				let attInfo = this.attachments[id];

				let object = mp.objects.new(attInfo.model, entity.position,{dimension: -1});
				object.__attMgrData = {
					targetEntity: entity.handle,
					bone: (typeof(attInfo.boneName) === 'string') ? entity.getBoneIndexByName(attInfo.boneName) : entity.getBoneIndex(attInfo.boneName),
					offset: attInfo.offset,
					rotation: attInfo.rotation
				};
				try
				{
					object.notifyStreaming = true;
					entity.__attachmentObjects[id] = object;
				}
				catch(err)
				{
					object.destroy();
				}
				
			}
		}
	},

	removeFor: function(entity, id)
	{
		if (!entity.hasOwnProperty('__attachmentObjects')) {
			entity.__attachmentObjects = {};
		}
		if(entity.__attachmentObjects.hasOwnProperty(id))
		{
			let obj = entity.__attachmentObjects[id];
			delete entity.__attachmentObjects[id];

			if(mp.objects.exists(obj))
			{
				obj.destroy();
			}
		}
	},

	initFor: function(entity)
	{
		for(let attachment of entity.__attachments)
		{
			mp.attachmentMngr.addFor(entity, attachment);
		}
	},

	shutdownFor: function(entity)
	{
		for(let attachment in entity.__attachmentObjects)
		{
			mp.attachmentMngr.removeFor(entity, attachment);
		}
	},

	register: function(id, model, boneName, offset, rotation)
	{
		if(typeof(id) === 'string')
		{
			id = mp.game.joaat(id);
		}

		if(typeof(model) === 'string')
		{
			model = mp.game.joaat(model);
		}

		if(!this.attachments.hasOwnProperty(id))
		{
			if(mp.game.streaming.isModelInCdimage(model))
			{
				this.attachments[id] =
				{
					id: id,
					model: model,
					offset: offset,
					rotation: rotation,
					boneName: boneName
				};
			}
			else
			{
				mp.game.graphics.notify(`Static Attachments Error: ~r~Invalid Model (0x${model.toString(16)})`);
			}
		}
		else
		{
			mp.game.graphics.notify("Static Attachments Error: ~r~Duplicate Entry");
		}
	},
	changerot (name, rot){
		let id = mp.game.joaat(name);
		this.attachments[id].rotation = rot;
		this.removeLocal(name);
		this.addLocal(name);
	},
	unregister: function(id)
	{
		if(typeof(id) === 'string')
		{
			id = mp.game.joaat(id);
		}

		if(this.attachments.hasOwnProperty(id))
		{
			this.attachments[id] = undefined;
		}
	},

	addLocal: function(attachmentName)
	{
		if(typeof(attachmentName) === 'string')
		{
			attachmentName = mp.game.joaat(attachmentName);
		}
		if(!this.attachments.hasOwnProperty(attachmentName)) return;

		let entity = mp.players.local;

		if(!entity.__attachments || entity.__attachments.indexOf(attachmentName) === -1)
		{
			NexusEvent.callRemote("staticAttachments.Add", attachmentName.toString(36));
		}
	},

	removeLocal: function(attachmentName)
	{
		if(typeof(attachmentName) === 'string')
		{
			attachmentName = mp.game.joaat(attachmentName);
		}

		let entity = mp.players.local;

		if(entity.__attachments && entity.__attachments.indexOf(attachmentName) !== -1)
		{
			NexusEvent.callRemote("staticAttachments.Remove", attachmentName.toString(36));
		}
	},

	getAttachments: function()
	{
		return Object.assign({}, this.attachments);
	}
};
mp.events.add({
    "addLocal": (attachmentId) => {
       mp.attachmentMngr.addLocal(attachmentId);
    },
	"removeLocal": (attachmentId) => {
       mp.attachmentMngr.removeLocal(attachmentId);
    },
	"unregister": (name) => {
		mp.attachmentMngr.unregister(name);
	},
	"register": (name, pos,rot) => {
		mp.attachmentMngr.register(name,name,18905,pos,rot)
	},
	"changerot": (name,rot) => {
		mp.attachmentMngr.changerot(name,rot)
	}
});

mp.events.add("entityStreamIn", (entity) =>
{
	if(entity.__attMgrData)
	{
		const { targetEntity, bone, offset, rotation } = entity.__attMgrData;

		entity.attachTo(
			targetEntity, bone,
			offset.x, offset.y, offset.z,
			rotation.x, rotation.y, rotation.z,
			false, false, false, false, 2, true
		);
	}

	if(entity.__attachments)
	{
		mp.attachmentMngr.initFor(entity);
	}
});

mp.events.add("entityStreamOut", (entity) =>
{
	if(entity.__attachmentObjects)
	{
		mp.attachmentMngr.shutdownFor(entity);
	}
});

mp.events.addDataHandler("attachmentsData", (entity, data) => {
	try {
		let newAttachments = (data.length > 0) ? data.split('|').map(att => parseInt(att, 36)) : [];

		if (entity.handle !== 0) {
			let oldAttachments = entity.__attachments;

			if (!oldAttachments) {
				oldAttachments = [];
				entity.__attachmentObjects = {};
			}

			// process outdated first
			for (let attachment of oldAttachments) {
				if (newAttachments.indexOf(attachment) === -1) {
					mp.attachmentMngr.removeFor(entity, attachment);
				}
			}

			// then new attachments
			for (let attachment of newAttachments) {
				if (oldAttachments.indexOf(attachment) === -1) {
					mp.attachmentMngr.addFor(entity, attachment);
				}
			}
		}

		entity.__attachments = newAttachments;
	} catch { }
});

function InitAttachmentsOnJoin() {
	try {
		mp.players.forEach(_player => {
			let data = _player.getVariable("attachmentsData");

			if (data && data.length > 0) {
				let atts = data.split('|').map(att => parseInt(att, 36));
				_player.__attachments = atts;
				_player.__attachmentObjects = {};
			}
		});
	} catch { }
}

InitAttachmentsOnJoin();
mp.attachmentMngr.register("metaldetectorItem", "w_am_metaldetector", 18905, new mp.Vector3(.15, .1, 0), new mp.Vector3(270, 90, 80)), 
mp.attachmentMngr.register("scenNewsPhotoItem","prop_pap_camera_01",28422,new mp.Vector3(.15,.01,-.04),new mp.Vector3(10,50,0)),
mp.attachmentMngr.register("scenNewsMicroItem","p_ing_microphonel_01",4154,new mp.Vector3(0,-.02,.11),new mp.Vector3(0,0,60)),
mp.attachmentMngr.register("scenNewsCameraItem","prop_v_cam_01",28422,new mp.Vector3(-.01,-.25,.01),new mp.Vector3(0,0,101))

mp.attachmentMngr.register("useItemBeer", "prop_sh_beer_pissh_01", 28422, new mp.Vector3(.012, .028, -.1), new mp.Vector3(5, 0, 0)),
mp.attachmentMngr.register("useItemAlco", "prop_tequila_bottle", 28422, new mp.Vector3(.013, .01, -.16), new mp.Vector3(5, 0, 0)), 
mp.attachmentMngr.register("useItemTequila", "prop_tequila_bottle", 28422, new mp.Vector3(.013, .01, -.16), new mp.Vector3(5, 0, 0)),
mp.attachmentMngr.register("useItemRum", "prop_rum_bottle", 28422, new mp.Vector3(.013, .01, -.16), new mp.Vector3(5, 0, 0)),
mp.attachmentMngr.register("useItemVodka", "prop_vodka_bottle", 28422, new mp.Vector3(.013, .01, -.16), new mp.Vector3(5, 0, 0)),
mp.attachmentMngr.register("useItemMartini", "prop_cherenkov_03", 28422, new mp.Vector3(.013, .01, -.25), new mp.Vector3(0, 0, 70)),

mp.attachmentMngr.register("Pistol","w_pi_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("CombatPistol","w_pi_combatpistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("APPistol","w_pi_appistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("StunGun","w_pi_stungun",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("SNSPistol","w_pi_sns_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("HeavyPistol","w_pi_heavypistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("VintagePistol","w_pi_vintage_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("Revolver","w_pi_revolver",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));

mp.attachmentMngr.register("MicroSMG","w_sb_microsmg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("SMG","w_sb_smg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("AssaultSMG","w_sb_assaultsmg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("CombatPDW","w_sb_pdw",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("MachinePistol","w_sb_compactsmg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("MiniSMG","w_sb_minismg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));

mp.attachmentMngr.register("PumpShotgun","w_sg_pumpshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("AssaultShotgun","w_sg_assaultshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("BullpupShotgun","w_sg_bullpupshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("HeavyShotgun","w_sg_heavyshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));

mp.attachmentMngr.register("AssaultRifle","w_ar_assaultrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("CarbineRifle","w_ar_carbinerifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("SpecialCarbine","w_ar_specialcarbine",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("MarksmanRifle","w_sr_marksmanrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));

mp.attachmentMngr.register("sprayPaint", "prop_spraygun_01", 28422, new mp.Vector3(.01, -.11, -.08), new mp.Vector3(-35, 0, 2)),
mp.attachmentMngr.register("WaterIngcan", "prop_wateringcan", 28422, new mp.Vector3(0.26, -0.1, -0.12), new mp.Vector3(-50, 0, 2)),
mp.attachmentMngr.register("Rod", "prop_fishing_rod_01", 60309, new mp.Vector3(0.03, 0, 0.02), new mp.Vector3(0, 0, 50)),
mp.attachmentMngr.register("Burger", "prop_cs_burger_01", 28422, new mp.Vector3(-.01, -.01, -0), new mp.Vector3(20, 0, 0)),
mp.attachmentMngr.register("Cola", "prop_food_juice01", 28422, new mp.Vector3(-.02, 0, -.03), new mp.Vector3(15, 0, 0)),
mp.attachmentMngr.register("HotDog", "prop_cs_hotdog_01", 28422, new mp.Vector3(-.04, .02, -.04), new mp.Vector3(15, 20, 10)),
mp.attachmentMngr.register("Pizza", "v_res_tt_pizzaplate", 28422, new mp.Vector3(-.01, -.01, -0), new mp.Vector3(20, 0, 0)),
mp.attachmentMngr.register("Sandwich", "prop_sandwich_01", 28422, new mp.Vector3(-.01, -.01, -0), new mp.Vector3(20, 0, 0)),
mp.attachmentMngr.register("Chips", "prop_food_bs_chips", 28422, new mp.Vector3(-.04, .02, -.04), new mp.Vector3(15, 20, 10)),
mp.attachmentMngr.register("Balloon", "prop_cs_spray_can", 28422, new mp.Vector3(0.06, 0.01, -0.02), new mp.Vector3(80, -10, 110)),
mp.attachmentMngr.register("Axe", "w_me_battleaxe", 18905, new mp.Vector3(0.1, 0.05, 0), new mp.Vector3(80.0, -180.0, -180.0)),
mp.attachmentMngr.register("Log", "prop_fnclog_02b", 6286, new mp.Vector3(0.36, -0.22, -1.1), new mp.Vector3(-10, 17, 100)),
mp.attachmentMngr.register("Trash", "p_rub_binbag_test", 6286, new mp.Vector3(-0.10, 0.24, -0.20), new mp.Vector3(310, 80, 50)),
mp.attachmentMngr.register("Cuff", "p_cs_cuffs_02_s", 6286, new mp.Vector3(-0.02, 0.063, 0.0), new mp.Vector3(75.0, 0.0, 76.0)),
mp.attachmentMngr.register("Phone", "prop_amb_phone", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 30)),

mp.attachmentMngr.register("Rob:Toiler","prop_toilet_01",18905,new mp.Vector3(0.24, -0.3, 0.14),new mp.Vector3(-80, 20,30)),
mp.attachmentMngr.register("Rob:TV","prop_tv_01",18905,new mp.Vector3(0.1, 0.15, 0.28),new mp.Vector3(0, -70, -50)),
mp.attachmentMngr.register("Rob:Chair","prop_chair_04a",18905,new mp.Vector3(0.5, -0.3, 0.11),new mp.Vector3(290, 20, 50)),
mp.attachmentMngr.register("Collector","prop_money_bag_01",18905,new mp.Vector3(0.55, 0.02, 0),new mp.Vector3(0, -90, 0)),
//0.06 0.02 -0.01 170 70 40
mp.attachmentMngr.register("Scoop", "prop_cs_trowel", 28422, new mp.Vector3(0.06, 0.02, -0.01), new mp.Vector3(170, 70, 40)),
mp.attachmentMngr.register("flowers1", "cls_flower_buket_calla", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), 
mp.attachmentMngr.register("flowers2", "cls_flower_buket_florist", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)),
 mp.attachmentMngr.register("flowers3", "cls_flower_buket_lilac", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)),
  mp.attachmentMngr.register("flowers4", "cls_flower_buket_red", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), 
  mp.attachmentMngr.register("flowers5", "cls_flower_buket_white", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), 
  mp.attachmentMngr.register("pumpkin_hat", "cls_hw_gourd_small_hand", 12844, new mp.Vector3(.04, 0, 0), new mp.Vector3(180, 90, 0));

















mp.events.add('Quest:September:MetalDetector:Enable', () => {
    mp.events.add('render', MetalDetectorRender);
});
mp.events.add('Quest:September:MetalDetector:Disable', () => {
    mp.events.remove('render', MetalDetectorRender);
});
mp.events.add('September.Geo.Enter',(x,y,z)=>{
	CenterPosition = new mp.Vector3(x,y,z);
});


mp.events.add('Setpember.Geo.DeletePoint',()=>{	
	CenterPosition = null;
	mp.events.call('PressE', false);	
});

let Counter = 0;
let DefaultEnable = false;
let CenterPosition = null;
let CounterAdd = 0;
let MultiCounter = 1.25;
let ParamR = 0;
const DateTime2 = () => new Date().getTime()
function MetalDetectorRender() {
    if(CenterPosition == null) return;
	mp.game.controls.disableControlAction(0, 21, !0), 
	mp.game.controls.disableControlAction(0, 22, !0), 
	mp.game.controls.disableControlAction(0, 23, !0), 
	mp.game.controls.disableControlAction(0, 24, !0), 
	mp.game.controls.disableControlAction(0, 25, !0)
    const DateTime = DateTime2();
    const {
        x: PlayerPositionX,
        y: PlayerPositionY,
        z: PlayerPositionZ
    } = mp.players.local.position,
    MainDistance = mp.dist(PlayerPositionX, PlayerPositionY, 0, CenterPosition.x, CenterPosition.y, 0);    
	let ColorRed = 255;
	let ColorGreen = 100;
	let ColorBlue = 100;
    if (MainDistance < 0.5 && DefaultEnable) {
        DefaultEnable = false;
        Counter = 0;
        CounterAdd = 0;
		mp.events.call('PressE', true);
    } else if (MainDistance < 4) {
        CounterAdd = 4.5;
    } else if (MainDistance < 5) {
        CounterAdd = 3.75;
    } else if (MainDistance < 6.5) {
        CounterAdd = 3;
    } else if (MainDistance < 7.5) {
        CounterAdd = 2.5;
    } else if (MainDistance < 10) {
        CounterAdd = 1.75;
    } else if (MainDistance < 12.5) {
        CounterAdd = 1.25;
    } else if (MainDistance < 15) {
        CounterAdd = 1;
    } else if (MainDistance < 20) {
        CounterAdd = 0.875;
    } else if (MainDistance < 25) {
        CounterAdd = 0.75;
    } else if (MainDistance < 30) {
        CounterAdd = 0.5;
    } else {
        Counter = 0;
        CounterAdd = 0;
		CenterPosition = null;
    }
	if(MainDistance > 0.5 && !DefaultEnable){
		DefaultEnable = true;
		mp.events.call('PressE', false);
	}
	
    const newPosition = new mp.Vector3(PlayerPositionX + .75 * mp.players.local.getForwardX(), PlayerPositionY + .75 * mp.players.local.getForwardY(), PlayerPositionZ - .75);

    Counter += CounterAdd;	
    if(DefaultEnable)
    {
		if(MainDistance < 7){
			ColorRed = 250;
			ColorGreen = 150;
			ColorBlue = 150;
		}
		if(MainDistance < 5){			
			ColorRed = 255;
			ColorGreen = 255;
			ColorBlue = 100;
		}
        if (100 < Counter) 
        {
            Counter -= 100;
            mp.game.audio.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", !1)
        }
        const a = Counter % 100 / 100 * MultiCounter;
        let nAplpha = Math.floor(255 - 155 * (Counter % 100 / 100));
        mp.game1.graphics.drawMarker(1,
            newPosition.x,
            newPosition.y,
            newPosition.z,
            0, 0, 0,
            0, 0, 0,
            a, a, .2,
            ColorRed, ColorGreen, ColorBlue, nAplpha,
            false, false, 2,
            false, "", "", false);
        mp.game1.graphics.drawMarker(6,
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0,
            270, 0, 0,
            a, .1, a,
            ColorRed, ColorGreen, ColorBlue, nAplpha,
            false, false, 2,
            false, "", "", false);
    }
    else
    {
        let alpha = 0;        
		ColorRed = 150;
        ColorGreen = 255;
        ColorBlue = 150;
        if (ParamR + 125 < DateTime) {
            ParamR = DateTime;
            mp.game.audio.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", !1),
            mp.game.audio.playSoundFrontend(-1, "BOATS_PLANES_HELIS_BOOM", "MP_LOBBY_SOUNDS", !1)
        }
        alpha = 150;
        let a = 1.2 * MultiCounter;
        mp.game1.graphics.drawMarker(1, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            0, 0, 0, 
            a, a, .2, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false);
        mp.game1.graphics.drawMarker(6, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            270, 0, 0, 
            a, .1, a, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false);
            alpha = 200, 
        a = .7 * MultiCounter, 
        mp.game1.graphics.drawMarker(1, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            0, 0, 0, 
            a, a, .2, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false); 
            mp.game1.graphics.drawMarker(6, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            270, 0, 0, 
            a, .1, a, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false);
        alpha = 255, 
        a = .2 * MultiCounter, 
        mp.game1.graphics.drawMarker(1, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            0, 0, 0, 
            a, a, .2, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false);
            mp.game1.graphics.drawMarker(6, 
            newPosition.x, newPosition.y, newPosition.z,
            0, 0, 0, 
            270, 0, 0, 
            a, .1, a, 
            ColorRed, ColorGreen, ColorBlue, alpha, 
            false, false, 2,
            false, "", "", false);
    }
}
}