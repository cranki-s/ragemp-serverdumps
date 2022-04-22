{
var tsBrowser = null;
var refresh = 0;
var browserLoad = false;
var canBeRefreshed = true;
var currentUrl = '';
let LocalPlayer = mp.players.local;

mp.events.add('ConnectTeamspeak', () => {
    tsBrowser = mp.browsers.new('');
    setTimeout(function () {
        refresh = 1;
        mp.game.audio.playSoundFrontend(-1, "Hack_Success", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", true);
    }, 500);
});

function distanceCalc(vector1, vector2) {
    return mp.game.system.vdist2(vector1.x, vector1.y, vector1.z, vector2.x, vector2.y, vector2.z);
}

function subtract(vector1, vector2) {
    vector1.x = vector1.x - vector2.x;
    vector1.y = vector1.y - vector2.y;
    vector1.z = vector1.z - vector2.z;
    return vector1;
}

mp.events.add('render', () => {
    if (tsBrowser != null && canBeRefreshed) {
        if (refresh == 1) {
            canBeRefreshed = false;
            var player = mp.players.local;
            var playerPos = player.position;
            var playerRot = player.getHeading();
            var rotation = Math.PI / 180 * (playerRot * -1);
            var playerNames = new Array();

            if (!player.name) return;

            /* var callingPlayerName = player.getVariable("CALLING_PLAYER_NAME");
            if (callingPlayerName && player.getVariable("CALL_IS_STARTED")) {
                if (callingPlayerName != "") {
                    playerNames.push(callingPlayerName + "~10~0~0~3");
                }
            } */

			mp.players.forEach(
				(target, id) => {
                    if(target.getVariable('FUNK_CHANNEL') == player.getVariable('FUNK_CHANNEL')) {
                        if(target.getVariable('FUNK_TALKING') == true) {
                            playerNames.push(target.name + "~10~0~0~3");
                        }
                    }
				}
			);

            mp.players.forEach(
				(target, id) => {
                    if(target.getVariable('IN_CALL') == player.name) {
                        if(player.getVariable('IN_CALL') == target.name) {
                            playerNames.push(target.name + "~10~0~0~3");
                        }
                    }
				}
			);

            mp.players.forEachInStreamRange(
                (playerStreamed, id) => {
					if (playerStreamed !== mp.players.local) {
                        //var playerDead = JSON.parse(playerStreamed.getVariable('DEATH_DATA'));
						var streamedPlayerPos = playerStreamed.position;
						var distance = distanceCalc(playerPos, streamedPlayerPos);
						var voiceRange = playerStreamed.getVariable("CLIENT_RANGE");
						var volumeModifier = 0;
						var range = 20;
                        if (voiceRange == 3) {
							range = 60;
						}
						if (voiceRange == 2) {
							range = 20;
						}
						if (voiceRange == 1) {
							range = 5;
						}
						if (distance > 55) {
							volumeModifier = (distance * -5 / 10);
						}
						if (volumeModifier > 0) {
							volumeModifier = 0;
						}

						if (distance < range/* ! playerDead*/) {
				
							var subPos = subtract(streamedPlayerPos, playerPos);
							var x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation);
							var y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation);
							x = x * 7 / range;
							y = y * 7 / range;
                            //if (playerDead.IsDead == false) {
							playerNames.push(playerStreamed.name + "~" + (Math.round(x * 1000) / 1000) + "~" + (Math.round(y * 1000) / 1000) + "~0~" + (Math.round(volumeModifier * 1000) / 1000));
							//}
						}
					}
                }
            );
			

			
				
            var newUrl = "http://localhost:15555/players/" + player.name + "/" + playerNames.join(";") + "/";
            if (currentUrl != newUrl) {
                tsBrowser.url = newUrl;
                currentUrl = newUrl;
            }
            tsBrowser.execute(`document.body.style.display = "none";`);
            setTimeout(function () {
                canBeRefreshed = true;
            }, 500);
        }
    }
});
}