{
﻿var attachedObjects = [];

mp.events.add('attachObject', attachObject);
mp.events.add('detachObject', function (player) {
    try {
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.id] != undefined) { attachedObjects[player.id].destroy(); }
            attachedObjects[player.id] = undefined;
        }
    } catch (e) {  } 
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
                object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, false, false, false, 0, true);
                attachedObjects[player.id] = object;
            });
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
    } catch (e) { } 
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

mp.game.streaming.requestAnimDict("mp_safehouseseated@female@heels@idle_b");

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
			else if(entity.getModel() == 1318032802) entity.taskPlayAnim("creatures@rottweiler@amb@sleep_in_kennel@", "sleep_in_kennel", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Husky
			else if(entity.getModel() == 1832265812) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Pug
			else if(entity.getModel() == 2910340283) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Westy
			else if(entity.getModel() == 1125994524) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Poodle
			else if(entity.getModel() == 940330470) entity.taskPlayAnim("amb@world_human_sunbathe@male@back@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Rashkovsky		
			else if(entity.getModel() == 3613420592) entity.taskPlayAnim("anim@amb@nightclub@peds@", "rcmme_amanda1_stand_loop_cop", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Bony
			else if(entity.getModel() == 3439295882) entity.taskPlayAnim("missheistdocks2aleadinoutlsdh_2a_int", "sitting_loop_wade", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Emma
			else if(entity.getModel() == 1906124788) entity.taskPlayAnim("missstrip_club_lean", "player_lean_rail_loop", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Frank
			
			
			else if(entity.getModel() == 1146800212) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 1
			else if(entity.getModel() == 365775923) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 2
			else if(entity.getModel() == 826475330) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 3
			else if(entity.getModel() == 2040438510) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 4
			else if(entity.getModel() == 1206185632) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 5
			else if(entity.getModel() == 1982350912) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 6
			else if(entity.getModel() == 1189322339) entity.taskPlayAnim("mp_safehouseseated@female@heels@idle_b", "idle_e", 8.0, 1.0, -1, 1, 0.0, false, false, false); // NPC 7
			
			else if(entity.getModel() == 1596003233) entity.taskPlayAnim("misstrevor2", "gang_chatting_idle02_a", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Muscle Prisoner
			else if(entity.getModel() == 2506301981) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Gang Rottweiler
			else if(entity.getModel() == 882848737) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
			else if(entity.getModel() == 1126154828) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Shephard
			else if(entity.getModel() == 3630914197) entity.taskPlayAnim("creatures@deer@amb@world_deer_grazing@idle_a", "idle_b", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
		}
    } catch (e) { }
});
}ጉМϢ