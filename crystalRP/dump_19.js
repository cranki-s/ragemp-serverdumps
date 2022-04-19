{
mp.nametags.enabled = false;
var showGamertags = true;
var gameplayCamPos;
var width = 0.025; 
var height = 0.004;
var border = 0.001;
mp.events.add('showPLAYERS', () => {
    showGamertags = !showGamertags;
});
mp.events.add('render', (nametags) => {
    if (!global.loggedin) return;
    if (global.localplayer.getVariable('IS_ADMIN') == true) {
        mp.players.forEach((player, id) => {
            if (mp.game.player.isFreeAimingAtEntity(player.handle) ||  mp.game.player.isTargettingEntity(player.handle))
                mp.game.graphics.drawText(player.name + ` [${player.getVariable('REMOTE_ID')}]`, [0.5, 0.8], { font: 4, color: [255, 255, 255, 235], scale: [0.5, 0.5], outline: true });
        });
    }
    if (showGamertags) {
        preDraw();
        nametags.forEach(nametag => {
            let [player, x, y, distance] = nametag;
            if (player.getVariable('INVISIBLE') != true && player.getVariable('HideNick') != true) {
                var split = player.name.split("_");
                var _playerName = split[0] + " " + split[1];
                var passportText = '';
                if (global.passports[player.name] !== undefined) passportText = ' | ' + global.passports[player.name];
                var text = '';
                var tag = player.getVariable('REMOTE_ID');
                if (tag == undefined) 
                    tag = player.id;
                var localFraction = global.localplayer.getVariable('fraction');
                var playerFraction = player.getVariable('fraction');
				text = text + "\n " + ( player.getVariable('IS_MASK') ? ( global.localplayer.getVariable('IS_ADMIN') || localFraction != null && playerFraction != null && localFraction === playerFraction || global.localplayer.getVariable('familycid') != null && player.getVariable('familycid') != null && global.localplayer.getVariable('familycid') == player.getVariable('familycid') ? _playerName + ' [' + tag + ']' + '\n в маске' : 'Гражданин [' + tag + '] \n в маске') : (global.localplayer.getVariable('IS_ADMIN') || localFraction != null && playerFraction != null && localFraction === playerFraction || mp.storage.data.friends[player.name] ? _playerName + ' [' + tag + ']' : 'Гражданин [' + tag + ']' ));
				text = text + ( localFraction != null && playerFraction != null && localFraction === playerFraction ? '\n' +  player.getVariable('fractionRankName') + '\n#' + player.getVariable('UID') : '\n#' + player.getVariable('UID'));
				text = text + '\n' + ( global.localplayer.getVariable('familycid') != null && player.getVariable('familycid') != null && global.localplayer.getVariable('familycid') == player.getVariable('familycid') ? '~s~' + player.getVariable('familyrankname') : '');
                drawPlayerTag(player, x, y, text, [255, 255, 255, 255]);
                if (distanceVector(gameplayCamPos, player.position) < 10.0) {
                        drawPlayerVoiceIcon(player, x, y - 0.03);
                    if (player.getVariable('IS_ADMIN') === true && player.getVariable('CROWN') == true)
                        drawPlayercrown(player.getVariable("ALVL"), x, y - 0.01);
                    if (player.getVariable('InDeath'))
					    drawPlayerdeath(x, y - 0.03);
                }
            }           
        })
    }
});

function drawPlayerdeath(x, y) {
    drawVoiceSprite("commonmenutu", 'deathmatch', [0.7, 0.7], 0, [255, 0, 0, 255], x, y);
}
function drawPlayercrown(alvl, x, y) { 
    if (alvl <= 3 && alvl >= 1)
        drawVoiceSprite("commonmenu", 'mp_hostcrown', [0.7, 0.7], 0, [255, 255, 255, 255], x, y);
    else if (alvl <= 5 && alvl >= 4)
        drawVoiceSprite("commonmenu", 'mp_hostcrown', [0.7, 0.7], 0, [255, 255, 0, 255], x, y); 
    else if (alvl <= 8 && alvl >= 6) 
        drawVoiceSprite("commonmenu", 'mp_hostcrown', [0.7, 0.7], 0, [255, 0, 0, 255], x, y);
    else if (alvl <= 10 && alvl >= 9)
        drawVoiceSprite("commonmenu", 'mp_hostcrown', [0.7, 0.7], 0, [0, 255, 0, 255], x, y);
}
function distanceVector(v1, v2) {
    var dx = (v1.x - v2.x), dy = (v1.y - v2.y), dz = (v1.z - v2.z);
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}
function preDraw(){
    gameplayCamPos = mp.players.local.position;
}
function drawPlayerTag(player, x, y, displayname, color){
    var position = player.position;
    if (distanceVector(gameplayCamPos, position) < 10.0) {
        mp.game.graphics.drawText(displayname, [x, y], { font: 4, color: color, scale: [0.35, 0.35], outline: true });
        if (
            mp.game.player.isFreeAimingAtEntity(player.handle) || 
            mp.game.player.isTargettingEntity(player.handle) ||
            spectating
        )
        {
            y += 0.04;
            let health = player.getHealth();
            health = (health <= 100) ? (health / 100) : ((health - 100) / 100);
            let armour = player.getArmour() / 100;
            if (armour > 0) {
                mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
                mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
                mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);
                y -= 0.007;
                mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
                mp.game.graphics.drawRect(x, y, width, height, 41, 66, 78, 255);
                mp.game.graphics.drawRect(x - width / 2 * (1 - armour), y, width * armour, height, 48, 108, 135, 200);
            }
            else {
                mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
                mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
                mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);
            }
        }
    }
}
function drawPlayerVoiceIcon(player, x, y) {
	if (player.isVoiceActive) 
        drawVoiceSprite("mpleaderboard", 'leaderboard_audio_3', [0.7, 0.7], 0, [255, 255, 255, 255], x, y - 0.02 * 0.7); 
    else if (player.getVariable('voice.muted') == true) 
        drawVoiceSprite("mpleaderboard", 'leaderboard_audio_mute', [0.7, 0.7], 0, [255, 0, 0, 255], x, y - 0.02 * 0.7);
}
function drawSprite(dist, name, scale, heading, colour, x, y, layer) {
    const 
        resolution = mp.game.graphics.getScreenActiveResolution(0, 0),
        textureResolution = mp.game.graphics.getTextureResolution(dist, name),
        SCALE = [(scale[0] * textureResolution.x) / resolution.x, (scale[1] * textureResolution.y) / resolution.y]
    if (mp.game.graphics.hasStreamedTextureDictLoaded(dist) === 1) {
        if (typeof layer === 'number') {
            mp.game.graphics.set2dLayer(layer);
        }
        mp.game.graphics.drawSprite(dist, name, x, y, SCALE[0], SCALE[1], heading, colour[0], colour[1], colour[2], colour[3]);
    } else {
        mp.game.graphics.requestStreamedTextureDict(dist, true);
    }
}
function drawVoiceSprite(dist, name, scale, heading, colour, x, y, layer) {
    var resolution = mp.game.graphics.getScreenActiveResolution(0, 0),
        textureResolution = mp.game.graphics.getTextureResolution(dist, name),
        textureScale = [scale[0] * textureResolution.x / resolution.x, scale[1] * textureResolution.y / resolution.y];
    if (mp.game.graphics.hasStreamedTextureDictLoaded(dist)) {
        if (typeof layer === 'number') mp.game.graphics.set2dLayer(layer);
        mp.game.graphics.drawSprite(dist, name, x, y, textureScale[0], textureScale[1], heading, colour[0], colour[1], colour[2], colour[3]);
    } else mp.game.graphics.requestStreamedTextureDict(dist, true);
}
mp.events.add('render', () => {
    let player = mp.players.local;
    mp.vehicles.forEachInStreamRange(vehicle => {
        if (vehicle != undefined && distanceVector(player.position, vehicle.position) < 7.0) {
            mp.players.forEachInStreamRange(pl => {
                if (pl != undefined && vehicle.getClass() != 14 && distanceVector(pl.position, vehicle.position) < 7.0) 
                    pl.setNoCollision(vehicle.handle, false);
            });
        }
    });
});

}Ϣ