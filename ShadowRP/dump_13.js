{
﻿var attachedObjects = [];

mp.events.add('attachObject', attachObject);
mp.events.add('detachObject', function (player) {
    try {
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();
            attachedObjects[player.id] = undefined;
        }
    } catch (e) { } 
});

function attachObject(player) {
    try {
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();

            if (player.getVariable('attachedObject') == null) return;
            let data = JSON.parse(player.getVariable('attachedObject'));
            let boneID = player.getBoneIndex(data.Bone);
            var object = mp.objects.new(data.Model, player.position,
                {
                    rotation: new mp.Vector3(0, 0, 0),
                    alpha: 255,
                    dimension: player.dimension
                });

            waitEntity(object).then(() => {
                object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, true, false, false, 0, true);
                attachedObjects[player.id] = object;
            });
        }
    } catch (e) { } 
}
function waitEntity(entity){
            return new Promise(resolve => {
                let wait = setInterval(() => {
                    if(mp.game.entity.isAnEntity(entity.handle)){
                        clearInterval(wait);
                        resolve();
                    }
                }, 1);
            });
        }

mp.events.add('toggleInvisible', function (player, toggle) {
    try {
        if (mp.players.exists(player)) {
            if (toggle) player.setAlpha(0);
            else player.setAlpha(255);
        }
    } catch (e) { }
});

mp._events.add("playerQuit", (player) => {
    try {
        if (attachedObjects[player.id] != undefined) {
            attachedObjects[player.id].destroy();
            attachedObjects[player.id] = undefined;
        }
    } catch (e) { }
});
mp.events.add('entityStreamOut', function (entity) {
    try {
        if (entity.type != 'player') return;
        if (attachedObjects[entity.id] != undefined) {
            attachedObjects[entity.id].destroy();
            attachedObjects[entity.id] = undefined;
        }
    } catch (e) { } 
});
const PlayerHash = mp.game.joaat("PLAYER");
const NonFriendlyHash = mp.game.joaat("FRIENDLY_PLAYER");
const FriendlyHash = mp.game.joaat("NON_FRIENDLY_PLAYER");

localplayer.setRelationshipGroupHash(PlayerHash);

mp.game.ped.addRelationshipGroup("FRIENDLY_PLAYER", 0);
mp.game.ped.addRelationshipGroup("NON_FRIENDLY_PLAYER", 0);

mp.game.ped.setRelationshipBetweenGroups(0, PlayerHash, FriendlyHash);

mp.game.ped.setRelationshipBetweenGroups(5, PlayerHash, NonFriendlyHash);
mp.game.ped.setRelationshipBetweenGroups(5, NonFriendlyHash, PlayerHash);

var dmgdisabled = false;
mp.events.add('disabledmg', (toggle) => {
	if(toggle) {
		dmgdisabled = true;
		mp.players.forEachInStreamRange(
			(entity) => {
				if(entity != localplayer) entity.setRelationshipGroupHash(FriendlyHash);
			}
		);
	} else {
		dmgdisabled = false;
		mp.players.forEachInStreamRange(
			(entity) => {
				if(entity != localplayer) entity.setRelationshipGroupHash(NonFriendlyHash);
			}
		);
	}
});

mp._events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if(dmgdisabled == true) return true;
});

mp.game.streaming.requestAnimDict("creatures@cat@amb@world_cat_sleeping_ground@base");
mp.game.streaming.requestAnimDict("creatures@rottweiler@amb@sleep_in_kennel@");
mp.game.streaming.requestAnimDict("creatures@pug@amb@world_dog_sitting@base");
mp.game.streaming.requestAnimDict("amb@world_human_sunbathe@male@back@base");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@peds@");
mp.game.streaming.requestAnimDict("missheistdocks2aleadinoutlsdh_2a_int");
mp.game.streaming.requestAnimDict("missstrip_club_lean");
mp.game.streaming.requestAnimDict("misstrevor2");
mp.game.streaming.requestAnimDict("creatures@retriever@amb@world_dog_sitting@base");
mp.game.streaming.requestAnimDict("creatures@deer@amb@world_deer_grazing@idle_a");

mp.game.streaming.requestAnimDict("rcmpaparazzo_2");
mp.game.streaming.requestAnimDict("misscarsteal4@actor");
mp.game.streaming.requestAnimDict("anim@mp_player_intcelebrationfemale@face_palm");
mp.game.streaming.requestAnimDict("amb@world_human_muscle_flex@arms_in_front@base");
mp.game.streaming.requestAnimDict("anim@mp_player_intupperslow_clap");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@lazlow@lo_alone@");
mp.game.streaming.requestAnimDict("anim@amb@casino@hangout@ped_male@stand@02b@base");
mp.game.streaming.requestAnimDict("rcmbarry");
mp.game.streaming.requestAnimDict("mp_safehouse");
mp.game.streaming.requestAnimDict("random@robbery");
mp.game.streaming.requestAnimDict("creatures@cow@player_action@");
mp.game.streaming.requestAnimDict("mini@strip_club@pole_dance@pole_dance1");
mp.game.streaming.requestAnimDict("mini@strip_Club@private_dance@part3");


mp.events.add('entityStreamIn', function (entity) {
    try {
        if (entity.type === 'player') {
			SetWalkStyle(entity, walkstyles[entity.getVariable('playerws')]);
			SetMood(entity, moods[entity.getVariable('playermood')]);
			attachObject(entity);
			if(dmgdisabled == true) entity.setRelationshipGroupHash(FriendlyHash);
			else entity.setRelationshipGroupHash(NonFriendlyHash);
			if (entity.getVariable('INVISIBLE') == true) entity.setAlpha(0);
			else entity.setAlpha(255);
		} else if(entity.type === 'ped') {
			entity.taskLookAt(localplayer.handle, -1, 2048, 3);
			if(entity.getModel() == 1462895032) entity.taskPlayAnim("creatures@cat@amb@world_cat_sleeping_ground@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Cat
			
			else if(entity.getModel() == 0x14C3E407) entity.taskPlayAnim("anim@mp_player_intcelebrationfemale@face_palm", "face_palm", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market
			else if(entity.getModel() == 0x1BCC157B) entity.taskPlayAnim("misscarsteal4@actor", "actor_berating_loop", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market2
			else if(entity.getModel() == 0x81441B71) entity.taskPlayAnim("rcmpaparazzo_2", "shag_loop_poppy", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market3
			else if(entity.getModel() == 0x80E59F2E) entity.taskPlayAnim("rcmpaparazzo_2", "shag_loop_a", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market4
			
			else if(entity.getModel() == 0x7B0E452F) entity.taskPlayAnim("misstrevor2", "gang_chatting_base_a", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market5
			
			else if(entity.getModel() == 0x5C14EDFA) entity.taskPlayAnim("mini@strip_Club@private_dance@part3", "priv_dance_p3", 8.0, 1.0, -1, 1, 0.0, false, false, false); // strip
            else if(entity.getModel() == 0x52580019) entity.taskPlayAnim("mini@strip_Club@private_dance@part3", "priv_dance_p3", 8.0, 1.0, -1, 1, 0.0, false, false, false); // strip
			
			else if(entity.getModel() == 0xE7A963D9) entity.taskPlayAnim("amb@world_human_muscle_flex@arms_in_front@base", "base", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market6
			else if(entity.getModel() == 0x0B4A6862) entity.taskPlayAnim("anim@mp_player_intupperslow_clap", "idle_a", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market6
			
			else if(entity.getModel() == 0xF0AC2626) entity.taskPlayAnim("anim@amb@nightclub@lazlow@lo_alone@", "lowalone_dlg_longrant_laz", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market7
			else if(entity.getModel() == 0x46E39E63) entity.taskPlayAnim("anim@amb@casino@hangout@ped_male@stand@02b@base", "base", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market8
			else if(entity.getModel() == 0x3521A8D2) entity.taskPlayAnim("rcmbarry", "base", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market9
			
			else if(entity.getModel() == 0x9B22DBAF) entity.taskPlayAnim("random@robbery", "sit_down_idle_01", 8.0, 1.0, -1, 1, 0.0, true, true, true); // Market9
		}
    } catch (e) { }
});
}