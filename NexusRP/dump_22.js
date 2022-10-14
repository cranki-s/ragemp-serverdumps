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
                    dimension: 4294967295
                });

            waitEntity(object).then(() => {
                object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, true, false, false, 0, true);
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
    try 
    {
        if (attachedObjects[player.id] != undefined) 
        {
            attachedObjects[player.id].destroy();
            attachedObjects[player.id] = undefined;
        }
    } catch (e) { }
});
mp.events.add('entityStreamOut', function (entity) {
    try 
    {
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
mp.events.add('client:syncScenario', (playerId, name, x, y, z, h, tp) => {
    //if (mp.players.local.remoteId == playerId || mp.players.local.id == playerId)
    try {     
      let remotePlayer = mp.players.atRemoteId(playerId);
      if (remotePlayer && mp.players.exists(remotePlayer)) {
        if (remotePlayer === mp.players.local) remotePlayer = mp.players.local;
        else remotePlayer.setAsMission(false, true);
  
        if(name && x && y && z && h){
          remotePlayer.clearTasksImmediately();
          remotePlayer.taskStartScenarioAtPosition(name, x, y, z, h, -1, (!(!!tp) && name == "PROP_HUMAN_SEAT_BENCH"), !!tp)
        } else
        if (name == 'PROP_HUMAN_SEAT_BENCH') {
          remotePlayer.clearTasks();
          let pos = remotePlayer.getOffsetFromInWorldCoords(0, -0.5, -0.5);
          let heading = remotePlayer.getRotation(0).z;
          remotePlayer.taskStartScenarioAtPosition(
            name,
            pos.x,
            pos.y,
            pos.z,
            heading,
            -1,
            true,
            false
          );
        } else {
          remotePlayer.clearTasks();
          remotePlayer.taskStartScenarioInPlace(name, 0, true);
        }
      }
    } catch (e) {
      methods.debug('Exception: events:client:syncScenario');
      methods.debug(e);
    }
  });
mp.events.addDataHandler("animData", function(a, b) {
    try{
    if (0 !== a.handle)
        if (null != b) {
            const c = b.split("%");
            loadAnimDict(c[0], function () {
                try {
                    mp.players.exists(a) && 0 !== a.handle && (a.clearTasksImmediately(),
                        a.taskPlayAnim(c[0], c[1], 1, 0, -1, parseInt(c[2]), 1, !1, !1, !1))
                } catch (e) { mp.gui.chat.push('anim.animData: ' + e); }
            })
        } else a.clearTasksImmediately()
    }catch(e){
        mp.gui.chat.push('anim.animData: ' + e);
    }
});
mp.events.addDataHandler("Resetanim", function (a, b) {
    try {
        if (0 !== a.handle)
            if (b == true) {
                if (!a.hasVariable("animData")) return;
                let value = a.getVariable("animData");
                const c = value.split("%");
                a.stopAnimTask(c[0], c[1], 3);
            }
    } catch (e) {
        //mp.gui.chat.push('anim.Resetanim: ' + e);
    }
});

function loadAnimDict(a, b) {
    try {
        if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
        mp.game.streaming.requestAnimDict(a);
        let c = setInterval(function () {
            mp.game.streaming.hasAnimDictLoaded(a) && (clearInterval(c), b())
        }, 100)
    } catch (e) {
        mp.gui.chat.push('anim.loadAnimDict: ' + e);
    }
}

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
mp.game.streaming.requestAnimDict("friends@frf@ig_1");
mp.game.streaming.requestAnimDict("amb@medic@standing@timeofdeath@idle_a");
mp.game.streaming.requestAnimDict("mini@strip_club@lap_dance@ld_girl_a_song_a_p1");
mp.game.streaming.requestAnimDict("amb@world_human_partying@female@partying_beer@base");
mp.game.streaming.requestAnimDict("amb@world_human_cop_idles@male@base");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@peds@");
mp.game.streaming.requestAnimDict("anim@amb@office@boardroom@crew@male@var_a@base_r@");   // казино фишки
mp.events.addDataHandler("player:new_clothes", function(a, b) {	
	const c = b.split("%");
    0 !== a.handle && null != b && a.setComponentVariation(11, +c[0], +c[1], 2)
});
let carryPlayer_player = null,
    carryPlayer_startHealth = null,
    carryPlayer_timer = null;
mp.game.streaming.requestAnimDict("nm"), 
mp.game.streaming.requestAnimDict("missfinale_c2mcs_1"),
 mp.game.streaming.requestAnimDict("anim@arena@celeb@flat@paired@no_props@"), 
 mp.game.streaming.requestAnimDict("anim@gangops@hostage@");
 mp.events.addDataHandler("attachToPlayer", function(a, b) {
    if(b){
        let i = b.split("%");
        0 === a.handle || attachPlayerToPlayerHandle(a, i[0],i[1])
    }else{
        0 === a.handle || attachPlayerToPlayerHandle(a, null,null);
    } 
});
const attachPlayerToPlayerHandle = async(a, b,h) => {
    if (!b) {
        a.isAttached() && a.detach(!0, !0), a.clearTasksImmediately();
        const b = a.__attachToPlayer;
        return mp.players.exists(b) && 0 !== b.handle && b.clearTasksImmediately(), 
        delete a.__attachToPlayer, void(a === mp.players.local && (global.disableAllAction = !1, global.enableCameraOnDisabled = !1))
    }
    const c = 1e4 <= b,
        d = [{
            fAnim: ["anim@arena@celeb@flat@paired@no_props@", "piggyback_c_player_b", 8, -8, 1e6, 33, 0],
            fAttach: [0, 0, -.07, .45, 0, 0, 0],
            sAnim: ["anim@arena@celeb@flat@paired@no_props@", "piggyback_c_player_a", 8, -8, 1e6, 49, 0],
            canUseWeapon: !1
        }, {
            fAnim: ["nm", "firemans_carry", 1, 0, -1, 1, 0],
            fAttach: [0, .23, .18, .65, .5, .5, 15],
            sAnim: ["missfinale_c2mcs_1", "fin_c2_mcs_1_camman", 8, -8, 1e5, 48, 0],
            canUseWeapon: !1
        }, {
            fAnim: ["anim@gangops@hostage@", "victim_idle", 8, -8, 1e5, 49, 0],
            fAttach: [0, -.24, .11, 0, .5, .5, 0],
            sAnim: ["anim@gangops@hostage@", "perp_idle", 8, -8, 1e5, 49, 0],
            canUseWeapon: !0
        }][Math.floor(h)],
        e = mp.players.atRemoteId(b);
    if (e && 0 !== e.handle && d && (a.freezePosition(!1), 
    a.setCollision(!0, !1),
    a.setCoordsNoOffset(a.position.x + 2, a.position.y + 2, a.position.z + 2, !1, !1, !1),
     await mp.game.waitAsync(15), 
     mp.players.exists(e) && 0 !== e.handle && mp.players.exists(a) && 0 !== a.handle && a.getVariable("attachToPlayer").split("%")[0] === b)) {
        if (e.clearTasksImmediately(), 
        e.taskPlayAnim(d.sAnim[0], d.sAnim[1], d.sAnim[2], d.sAnim[3], d.sAnim[4], d.sAnim[5], d.sAnim[6], !1, !1, !1), 
        a.clearTasksImmediately(), 
        a.taskPlayAnim(d.fAnim[0], d.fAnim[1], d.fAnim[2], d.fAnim[3], d.fAnim[4], d.fAnim[5], d.fAnim[6], !1, !1, !1), 
        a.attachTo(e.handle, d.fAttach[0], d.fAttach[1], d.fAttach[2], d.fAttach[3], d.fAttach[4], d.fAttach[5], d.fAttach[6], !1, !1, !1, !1, 2, !0), 
        a.__attachToPlayer = e, 
        a === mp.players.local) {
            global.disableAllAction = !0, c || (global.enableCameraOnDisabled = !0);
            const a = () => {
                mp.players.exists(e) && 0 !== e.handle && mp.players.local.getVariable("attachToPlayer") && (c || !mp.game.controls.isDisabledControlPressed(0, 23)) || (NewEvent.callRemote("server_player_attachStop"), mp.events.remove("render", a))
            
            };
            mp.events.add("render", a)
        }
        if (e === mp.players.local) {
            carryPlayer_timer && clearInterval(carryPlayer_timer);
            const b = () => {
                mp.game.controls.disableControlAction(0, 21, !0),
                mp.game.controls.disableControlAction(0, 22, !0), 
                mp.game.controls.disableControlAction(0, 23, !0), 
                mp.game.controls.disableControlAction(0, 24, !0), 
                mp.game.controls.disableControlAction(0, 25, !0), 
                mp.game.controls.disableControlAction(0, 58, !0), 
                mp.game.controls.disableControlAction(0, 141, !0), 
                mp.game.controls.disableControlAction(0, 257, !0), 
                mp.game.controls.disableControlAction(0, 68, !0), 
                mp.game.controls.disableControlAction(0, 69, !0), 
                mp.game.controls.disableControlAction(0, 70, !0), 
                mp.game.controls.disableControlAction(0, 91, !0), 
                mp.game.controls.disableControlAction(0, 92, !0), 
                    mp.game.controls.isDisabledControlPressed(0, 23) || mp.game.controls.isDisabledControlPressed(0, 26) ? c() : !mp.players.local.isPlayingAnim(d.sAnim[0], d.sAnim[1], 3) && mp.players.local.taskPlayAnim(d.sAnim[0], d.sAnim[1], d.sAnim[2], d.sAnim[3], d.sAnim[4], d.sAnim[5], d.sAnim[6], !1, !1, !1)
                },
                c = () => {
                    mp.events.remove("render", b),
                    clearInterval(carryPlayer_timer),
                    carryPlayer_timer = null,
                    NewEvent.callRemote("server_player_attachStop"),
                    mp.players.local.clearTasksImmediately()
                };
            carryPlayer_player = a,
            carryPlayer_startHealth = mp.players.local.getHealth(), 
            carryPlayer_timer = setInterval(() => {
                const a = mp.players.local.getHealth();
                return !mp.players.exists(carryPlayer_player) || 0 === carryPlayer_player.handle 
                || !carryPlayer_player.getVariable("attachToPlayer") 
                || a < carryPlayer_startHealth && 5 < carryPlayer_startHealth - a 
                || null != mp.players.local.vehicle || mp.players.local.getVariable('InDeath') == true 
                || mp.players.local.isFalling() || mp.players.local.isJumping() || mp.players.local.isSwimming() 
                || cuffed ? void c() : void(carryPlayer_startHealth = a)
            }, 100), mp.events.add("render", b)
        }
    }
};
mp.events.add('entityStreamIn', function (entity) {
    try {       
        if (entity.type === 'player') {
            if(entity.hasVariable("attachToPlayer")){
                const d = entity.getVariable("attachToPlayer");
                let i = d.split("%");
                d && setTimeout(() => {
                    mp.players.exists(entity) && 
                    entity.handle && 
                    entity.getVariable("attachToPlayer") && 
                    attachPlayerToPlayerHandle(entity, i[0], i[1])
                }, 1e3), entity.getVariable("isAdmin") && mp.game.invoke("0x2B5AA717A181FB4C", entity.handle, !1), entity.setHelmet(!1)
            }
			SetWalkStyle(entity, entity.getVariable('playerws'));
			SetMood(entity, moods[entity.getVariable('playermood')]);
            attachObject(entity);
            if (entity.hasVariable("animData")) {
                const value = entity.getVariable("animData");
                if (null != value) {
                    const anim = value.split("%");
                    loadAnimDict(anim[0], function () {
                        try {
                            mp.players.exists(entity) && 0 !== entity.handle && entity.taskPlayAnim(anim[0], anim[1], 1, 0, -1, parseInt(anim[2]), 1, !1, !1, !1)
                        } catch { }
                    })
                } else entity.clearTasksImmediately()
            }           
			if(dmgdisabled == true) entity.setRelationshipGroupHash(FriendlyHash);
			else entity.setRelationshipGroupHash(NonFriendlyHash);
			if (entity.getVariable('INVISIBLE') == true) entity.setAlpha(0);
			else entity.setAlpha(255);
		}
        else if(entity.type === 'ped') {
			entity.taskLookAt(localplayer.handle, -1, 2048, 3);
		    if(entity.hasVariable('PedName'))
            {
               let name = entity.getVariable('PedName');
               entity.setComponentVariation(11,167,0,0)
               entity.setComponentVariation(4,28,0,0)
               entity.setComponentVariation(6,77,11,0)
               entity.setComponentVariation(8, 75, 0,0)
               entity.setPropIndex(0, 2, 0,true)
            }
			if(entity.getModel() == 1462895032) entity.taskPlayAnim("creatures@cat@amb@world_cat_sleeping_ground@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Cat
			else if(entity.getModel() == 1318032802) entity.taskPlayAnim("creatures@rottweiler@amb@sleep_in_kennel@", "sleep_in_kennel", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Husky
			else if(entity.getModel() == 1832265812) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Pug
			else if(entity.getModel() == 2910340283) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Westy
			else if(entity.getModel() == 1125994524) entity.taskPlayAnim("creatures@pug@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Poodle
			else if(entity.getModel() == 940330470) entity.taskPlayAnim("amb@world_human_sunbathe@male@back@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Rashkovsky		
			else if(entity.getModel() == 0x432CA064) entity.taskPlayAnim("friends@frf@ig_1", "over_here_idle_b", 8.0, 1.0, -1, 1, 0.0, false, false, false);			
			else if(entity.getModel() == 0x81441B71) entity.taskPlayAnim("mini@strip_club@lap_dance@ld_girl_a_song_a_p1", "ld_girl_a_song_a_p1_f", 8.0, 1.0, -1, 1, 0.0, false, false, false);
			else if(entity.getModel() == 0x52580019) entity.taskPlayAnim("amb@world_human_partying@female@partying_beer@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false);
			else if(entity.getModel() == 0xF161D212) entity.taskPlayAnim("amb@world_human_cop_idles@male@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false);
			else if(entity.getModel() == 0x585C0B52) entity.taskPlayAnim("anim@amb@nightclub@peds@", "rcmme_amanda1_stand_loop_cop", 8.0, 1.0, -1, 1, 0.0, false, false, false);
			else if(entity.getModel() == 0x69591CF7) entity.taskStartScenarioInPlace('WORLD_HUMAN_AA_SMOKE', 0, false);
			else if(entity.getModel() == 0xEF154C47) entity.taskStartScenarioInPlace('WORLD_HUMAN_STAND_FISHING', 0, false);
            else if(entity.getModel() == 233415434) entity.taskStartScenarioInPlace('WORLD_HUMAN_AA_COFFEE', 0, false); 
			else if(entity.getModel() == 0x2B6E1BB6) entity.taskStartScenarioInPlace('WORLD_HUMAN_SEAT_WALL', 0, false);
			else if(entity.getModel() == 0x5E3DA4A4) entity.taskStartScenarioInPlace('WORLD_HUMAN_CLIPBOARD', 0, false);
			else if(entity.getModel() == 0x2E420A24) entity.taskStartScenarioInPlace('WORLD_HUMAN_CLIPBOARD', 0, false);
			else if(entity.getModel() == 0x62018559) entity.taskStartScenarioInPlace('WORLD_HUMAN_CONST_DRILL', 0, false);
			else if(entity.getModel() == 1596003233) entity.taskPlayAnim("misstrevor2", "gang_chatting_idle02_a", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Muscle Prisoner
			else if(entity.getModel() == 2506301981) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Gang Rottweiler
			else if(entity.getModel() == 882848737) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
			else if(entity.getModel() == 1126154828) entity.taskPlayAnim("creatures@retriever@amb@world_dog_sitting@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Shephard
			else if(entity.getModel() == 3630914197) entity.taskPlayAnim("creatures@deer@amb@world_deer_grazing@idle_a", "idle_b", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Retriever Police
			else if(entity.getModel() == 0xCFF0D4BB) entity.taskPlayAnim("anim@amb@office@boardroom@crew@male@var_a@base_r@", "idle_a", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Казино фишки
			else if(Peds['Seller4'].entity == entity){
                //"ad":"misstrevor2","an":"gang_chatting_base_a","af":1
                entity.taskPlayAnim("misstrevor2", "gang_chatting_base_a", 8.0, 1.0, -1, 1, 0.0, false, false, false);
            }else if(Peds['Seller5'].entity == entity){
                entity.taskStartScenarioInPlace('WORLD_HUMAN_AA_SMOKE', 0, false);
            }
            
            
            //else if(entity.getModel() == 0xD47303AC) entity.taskPlayAnim("anim@amb@office@boardroom@crew@male@var_a@base_r@", "idle_a", 8.0, 1.0, -1, 1, 0.0, false, false, false); // Казино фишки
		}
    } catch (e) { }
});
}