{
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

mp.nametags.enabled = false;

var showGamertags = true;
var reupdateTagLabel = [];
var tagLabelPool = [];

var playerPos = void 0;
var playerTarget = void 0;
var playerAimAt = void 0;
var width = 0.025;
var height = 0.004;
var border = 0.000;

function calculateDistance(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

mp.events.add('render', function (nametags) {

    if (!global.loggedin) return;

    // Pre draw
    playerPos = mp.players.local.position;
    playerAimAt = mp.game.player.getEntityIsFreeAimingAt();
    playerTarget = mp.players.local;

    // Get variables
    var isAdmin = global.localplayer.getVariable('IS_ADMIN');

    // Admin get target info
    if (isAdmin == true) {
        var player = playerTarget;
        if (player === undefined || player.handle === undefined || !player.handle) player = playerAimAt;
        if (player === undefined || player.handle === undefined || !player.handle) {} else {
            if (player.getType() === 4 && player != global.localplayer) {
                mp.game.graphics.drawText(player.name + ' (' + player.remoteId + ')', [0.25, 0.25], { font: 0, color: [220,220,220,250], scale: [1, 0.50], outline: false });
            }
        }
    }

    // Player gamertags
    if (showGamertags) {

        nametags.forEach(function (nametag) {
            try {
                var _nametag = _slicedToArray(nametag, 4),
                    _player = _nametag[0],
                    x = _nametag[1],
                    y = _nametag[2],
                    distance = _nametag[3];

                    var split = _player.name.split("_");
                    var _playerName = split[0] + " " + split[1];

                if (calculateDistance(playerPos, _player.position) < 15.0) {
                    if (_player.getVariable('INVISIBLE') != true && _player.getVariable('HideNick') != true) {
                        var passportText = '';
                        if (global.passports[_player.name] !== undefined) passportText = ' | ' + global.passports[_player.name];
                        if (tagLabelPool[_player.remoteId] === undefined || reupdateTagLabel[_player.remoteId] === undefined || new Date().getTime() - reupdateTagLabel[_player.remoteId] > 500) {

                            reupdateTagLabel[_player.remoteId] = new Date().getTime();

                            var text = void 0;
                            if (_player.getVariable('IS_MASK') == true) {
                                if (isAdmin === true) text = '\u0418\u0433\u0440\u043E\u043A \u0432 \u043C\u0430\u0441\u043A\u0435: ' + _playerName + ' [' + _player.remoteId + passportText + ']';else text = '[' + _player.remoteId + ']';
                            } else {
                                if (isAdmin === true || mp.storage.data.friends[_player.name] !== undefined || global.passports[_player.name] !== undefined) text = _playerName + ' [' + _player.remoteId + passportText + ']';else text = '[' + _player.remoteId + ']';;
                            }
                            var localFraction = global.localplayer.getVariable('fraction');
                            var playerFraction = _player.getVariable('fraction');
                            if (localFraction != null && playerFraction != null && localFraction === playerFraction && localFraction != 0 && playerFraction != 0)
								//text = _playerName + ' (' + _player.remoteId + passportText + ')';
							text = `[${_player.getVariable('fractionRankName')}] ${_playerName} [${_player.getVariable('REMOTE_ID')}${passportText}] `;

                            var color = _player.getVariable('REDNAME') === true ? [220,220,220,250] : [220,220,220,250];
                            tagLabelPool[_player.remoteId] = { text: text, color: color };
                        }
                        if (_player.vehicle) y += 0.065;
                        var label = tagLabelPool[_player.remoteId];
                        if (label !== undefined) {
                            drawPlayerTag(_player, x, y, label.text, label.color);
							drawPlayerTag(_player, x, y, '\n #' + _player.getVariable('PERSON_ID'), [220,220,220,250]);
                            drawPlayerVoiceIcon(_player, x, y);
							if (_player.getVariable('IS_DYING'))
							{
								drawPlayerdeath(_player, x, y );
                            }
                            if (_player.getVariable('IS_ADMIN') === true && _player.getVariable('REDNAME') === true)
							{
								drawPlayercrown(_player, x, y );
							}
							// if (_player.getVariable('PLAYERINAFK') === true)
							// {
								// drawPlayerTag(_player, x, y - 0.03, "AFK", [255,0,0,255]);
							// }
                        }
                    }
                }
            } catch (e) {}
        });
    }
});

function drawPlayerTag(player, x, y, displayname, color) {
    //var position = player.getBoneCoords(12844, 0.6, 0, 0); //player.position;
    //position.z += 1.5;
    //var frameTime = lastFrameTime;
    //const frameRate = 1.0 / (mp.game.invoke("0x15C40837039FFAF7") / );

    // draw user name
    mp.game.graphics.drawText(displayname, [x, y], { font: 0, color: color, scale: [0.25, 0.25], outline: false });

    // draw health & ammo bar
    if (playerTarget != undefined && player.handle == playerTarget.handle || playerAimAt != undefined && player.handle == playerAimAt.handle || global.spectating) {
        y += 0.04;
        var health = player.getHealth();
        health = health <= 100 ? health / 100 : (health - 100) / 100;

        var armour = player.getArmour() / 100;
        if (armour > 0) {

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);

            y -= 0.007;

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 41, 66, 78, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - armour), y, width * armour, height, 48, 108, 135, 200);
        } else {

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);
        }
    }
}

function drawPlayerVoiceIcon(player, x, y) {
	if (player.isVoiceActive) drawVoiceSprite("mpleaderboard", 'leaderboard_audio_3', [0.7, 0.7], 0, [255, 255, 255, 255], x, y - 0.02 * 0.7);else if (player.getVariable('voice.muted') == true) drawVoiceSprite("mpleaderboard", 'leaderboard_audio_mute', [0.7, 0.7], 0, [255, 0, 0, 255], x, y - 0.02 * 0.7);
}
function drawPlayercrown(player, x, y) {
    drawVoiceSprite("commonmenu", 'mp_hostcrown', [0.7, 0.7], 0, [255, 255, 255, 255], x, y - 0.01);
}
function drawPlayerdeath(player, x, y) {
    drawVoiceSprite("commonmenutu", 'deathmatch', [0.7, 0.7], 0, [255, 0, 0, 255], x, y - 0.01);
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
}