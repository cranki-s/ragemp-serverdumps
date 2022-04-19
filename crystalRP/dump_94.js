{
mp.attachmentMngr =
{
	attachments: {},
	addFor: function(entity, id) {
		if(this.attachments.hasOwnProperty(id)) {
			if(!entity.__attachmentObjects ||!entity.__attachmentObjects.hasOwnProperty(id)) {
				let attInfo = this.attachments[id];
				let object = mp.objects.new(attInfo.model, entity.position);
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
	removeFor: function(entity, id) {
		if (!entity.hasOwnProperty('__attachmentObjects'))
			entity.__attachmentObjects = {};
		if(entity.__attachmentObjects.hasOwnProperty(id)) {
			let obj = entity.__attachmentObjects[id];
			delete entity.__attachmentObjects[id];
			if(mp.objects.exists(obj))
				obj.destroy();
		}
	},
	initFor: function(entity){
		for(let attachment of entity.__attachments)
			mp.attachmentMngr.addFor(entity, attachment);
	},
	shutdownFor: function(entity) {
		for(let attachment in entity.__attachmentObjects)
			mp.attachmentMngr.removeFor(entity, attachment);
	},
	register: function(id, model, boneName, offset, rotation) {
		if(typeof(id) === 'string')
			id = mp.game.joaat(id);
		if(typeof(model) === 'string')
			model = mp.game.joaat(model);
		if(!this.attachments.hasOwnProperty(id)) {
			if(mp.game.streaming.isModelInCdimage(model)) {
				this.attachments[id] = {
					id: id,
					model: model,
					offset: offset,
					rotation: rotation,
					boneName: boneName
				};
			}
			else
				mp.game.graphics.notify(`Static Attachments Error: ~r~Invalid Model (0x${model.toString(16)})`);
		}
		else
			mp.game.graphics.notify("Static Attachments Error: ~r~Duplicate Entry");
	},
	unregister: function(id) {
		if(typeof(id) === 'string')
			id = mp.game.joaat(id);
		if(this.attachments.hasOwnProperty(id))
			this.attachments[id] = undefined;
	},
	addLocal: function(attachmentName) {
		if(typeof(attachmentName) === 'string')
			attachmentName = mp.game.joaat(attachmentName);
		let entity = mp.players.local;
		if(!entity.__attachments || entity.__attachments.indexOf(attachmentName) === -1)
			mp.events.callRemote("staticAttachments.Add", attachmentName.toString(36));
	},
	removeLocal: function(attachmentName) {
		if(typeof(attachmentName) === 'string')
			attachmentName = mp.game.joaat(attachmentName);
		let entity = mp.players.local;
		if(entity.__attachments && entity.__attachments.indexOf(attachmentName) !== -1)
			mp.events.callRemote("staticAttachments.Remove", attachmentName.toString(36));	
	},

	getAttachments: function() {
		return Object.assign({}, this.attachments);
	}
};



mp.events.add({
    "addLocal": (attachmentId) => {
       	mp.attachmentMngr.addLocal(attachmentId);
    },
	"removeLocal": (attachmentId) => {
      	mp.attachmentMngr.removeLocal(attachmentId);
    }
});

mp.events.add("entityStreamIn", (entity) => {
	if(entity.__attMgrData) {
		const { targetEntity, bone, offset, rotation } = entity.__attMgrData;
		entity.attachTo(
			targetEntity, bone,
			offset.x, offset.y, offset.z,
			rotation.x, rotation.y, rotation.z,
			false, false, false, false, 2, true
		);
	}
	if(entity.__attachments)
		mp.attachmentMngr.initFor(entity);
});

mp.events.add("entityStreamOut", (entity) => {
	if(entity.__attachmentObjects)
		mp.attachmentMngr.shutdownFor(entity);
});

mp.events.addDataHandler("attachmentsData", (entity, data) => {
	let newAttachments = (data.length > 0) ? data.split('|').map(att => parseInt(att, 36)) : [];
	if(entity.handle !== 0) {
		let oldAttachments = entity.__attachments;
		if(!oldAttachments) {
			oldAttachments = [];
			entity.__attachmentObjects = {};
		}
		for(let attachment of oldAttachments)
			if(newAttachments.indexOf(attachment) === -1)
				mp.attachmentMngr.removeFor(entity, attachment);
		for(let attachment of newAttachments)
			if(oldAttachments.indexOf(attachment) === -1)
				mp.attachmentMngr.addFor(entity, attachment);
	}
	entity.__attachments = newAttachments;
});
mp.attachmentMngr.register("Pistol50","w_pi_pistol50",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("Pistol","w_pi_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("CombatPistol","w_pi_combatpistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("APPistol","w_pi_appistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("StunGun","w_pi_stungun",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("SNSPistol","w_pi_sns_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("HeavyPistol","w_pi_heavypistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("VintagePistol","w_pi_vintage_pistol",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("Revolver","w_pi_revolver",51826, new mp.Vector3(0.02,0.06,0.1), new mp.Vector3(-100,0,0));
mp.attachmentMngr.register("MicroSMG","w_sb_microsmg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("SMG","w_sb_smg",24818, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("AssaultSMG","w_sb_assaultsmg",24818, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("CombatPDW","w_sb_pdw",24818, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("MachinePistol","w_sb_compactsmg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("MiniSMG","w_sb_minismg",58271, new mp.Vector3(0.08,0.03,-0.1), new mp.Vector3(-80.77,0,0));
mp.attachmentMngr.register("PumpShotgun","w_sg_pumpshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("PumpShotgunMk2","w_sg_pumpshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("AssaultShotgun","w_sg_assaultshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("BullpupShotgun","w_sg_bullpupshotgun",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("HeavyShotgun","w_sg_heavyshotgun",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("AdvancedRifle","w_ar_advancedrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("CombatMG","w_mg_combatmg",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("CombatMGMk2","w_mg_combatmg",24818, new mp.Vector3(-0.1,-0.15,0.11), new mp.Vector3(-180,0,0));
mp.attachmentMngr.register("MG","w_mg_mg",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("AssaultRifle","w_ar_assaultrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("AssaultRifleMk2","w_ar_assaultrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("CarbineRifle","w_ar_carbinerifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("CarbineRifleMk2","w_ar_carbinerifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("SpecialCarbine","w_ar_specialcarbine",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("SpecialCarbineMk2","w_ar_specialcarbine",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("MarksmanRifle","w_sr_marksmanrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("MarksmanRifleMk2","w_sr_marksmanrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("SniperRifle","w_sr_sniperrifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("HeavySniper","w_sr_heavysniper",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("HeavySniperMk2","w_sr_heavysniper",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("Gusenberg","w_sb_gusenberg",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("BullpupRifle","w_ar_bullpuprifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("BullpupRifleMk2","w_ar_bullpuprifle",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));
mp.attachmentMngr.register("Musket","w_ar_musket",24818, new mp.Vector3(-0.1,-0.15,-0.13), new mp.Vector3(0,0,3.5));

function InitAttachmentsOnJoin() {
	mp.players.forEach(_player => {
		let data = _player.getVariable("attachmentsData");
		if(data && data.length > 0) {
			let atts = data.split('|').map(att => parseInt(att, 36));
			_player.__attachments = atts;
			_player.__attachmentObjects = {};
		}
	});
}
InitAttachmentsOnJoin();

}