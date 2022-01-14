{
mp.game.streaming.requestIpl('vw_casino_main');
mp.game.streaming.requestIpl('casino_manager_default');
mp.game.streaming.requestIpl('casino_manager_workout');

let casinoWheelNatives = {
  GET_SOUND_ID: '0x430386FE9BF80B45',
  SET_VARIABLE_ON_SOUND: '0xAD6B3148A78AE9B6',
  GET_ANIM_INITIAL_OFFSET_POSITION: '0xBE22B26DD764C040'
};

let initialStartRollPosition = new mp.Vector3(1110.13, 228.9352, -49.3908);

let casinoWheelObject = mp.objects.new(mp.game.joaat('vw_prop_vw_luckywheel_02a'), new mp.Vector3(1111.05, 229.81, -49.13),
{
	rotation: new mp.Vector3(0, 0, 0),
	alpha: 255,
	dimension: localPlayer.dimension
});

let casinoWheelColshape = mp.colshapes.newCircle(
	initialStartRollPosition.x,
	initialStartRollPosition.y,
	1.3,
	localPlayer.dimension
);

let casinoWheelAnimDict = localPlayer.isMale()
  ? 'anim_casino_a@amb@casino@games@lucky7wheel@male'
  : 'anim_casino_a@amb@casino@games@lucky7wheel@female';

mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@lucky7wheel@male");
mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@lucky7wheel@female");

// dynamic
let isImInCasinoWheelColshape = false;
let playerStepsOnCasinoWheel = 0;
let isPlayerRollingWheel = false;

function quadInOut(t) {
    t /= 0.5
    if (t < 1) return 0.5*t*t
    t--
    return -0.5 * (t*(t-2) - 1)
}

class NumberAnimation {
  _startAnimationTime = 0;
  _previousValue = 0;
  _currentDisplayValue = 0;
  _timeout = 0;

  constructor(targetValue, speed = 500) {
    this._targetValue = targetValue;
    this._speed = speed;
    this._ease = quadInOut;
  }

  updateNumber() {
    const value = parseInt(this._targetValue.toString(), 10);

    const updateInterval = setInterval(() => {
      if (this._currentDisplayValue >= value) {
        clearInterval(updateInterval);

        return;
      }

      const now = new Date().getTime();
      const elapsedTime = now - this._startAnimationTime;
      const progress = this._ease(elapsedTime / this._speed);

      const currentDisplayValue = Math.round(
        (value - this._previousValue) * progress + this._previousValue
      );

      this._currentDisplayValue = currentDisplayValue;

      if (elapsedTime > this._speed) {
        this._previousValue = value;
      }
    }, 0);
  }

  run() {
    this._startAnimationTime = new Date().getTime();

    this.updateNumber();
  }

  get value() {
    return this._currentDisplayValue;
  }
};

mp.events.add('casinoRolledWheelResult', (wonOrNot, wonTitle) => {
	if(typeof(wonOrNot) !== "undefined" && typeof(wonTitle) !== "undefined") {
		localPlayer.freezePosition(false);
		restoreBinds();
		if(inCasino) {
			inCasino.gameType = false;
			inCasino.gameName = false;
		}
		if(wonOrNot) {
			if(hud_browser) hud_browser.execute('playSound("casSlotsWin", 0.2);');
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~The diamond casino", "~s~Вы выйграли "+wonTitle.toString()+"~n~Играя в колесо фортуны", 5, false, true, 6500);
			chatAPI.notifyPush(" * Вы выйграли <b><span style=\"color:#FEBC00\">"+wonTitle.toString()+"</span></b> в <b><span style=\"color:#FEBC00\">колесе фортуны</span></b>!");
			
			mp.game.invoke('0xF7B38B8305F1FE8B', 0, "CASINO_WIN_PL", 1);
			setTimeout(function() { 
				canSpin = true; 
				mp.game.invoke('0xF7B38B8305F1FE8B', 0, "CASINO_DIA_PL", 1);
			}, 5000);
		}else{
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~The diamond casino", "~s~Вы не выйграли "+wonTitle.toString()+"~n~Играя в колесо фортуны", 5, false, true, 6500);
			chatAPI.notifyPush(" * Вы не выйграли <b><span style=\"color:#FEBC00\">"+wonTitle.toString()+"</span></b>, жаль.. В следующий раз <b><span style=\"color:#FEBC00\">обязательно получится</span></b>!");
		}
	}
});

// Runs Lucky Wheel Rotation
mp.events.add('casinoRollWheel', (thePlayer, winResult) => {
	winResult = parseInt(winResult);
	if(thePlayer == localPlayer) isPlayerRollingWheel = true;

	let wheelPos = casinoWheelObject.position;
	casinoWheelObject.setRotation(0.0, 0.0, 0.0, 1, true);
	let lastSoundID = -1;

	let wheelValue = (360 + winResult) * 12;
	let Animation = new NumberAnimation(wheelValue, 10 * 1000);
	Animation.run();

	var interval = setInterval(() => {
		let y = Animation.value;

		if (y >= wheelValue) {
			if(thePlayer == localPlayer) {
				mp.events.callRemote("casinoRolledWheel", true);
				localPlayer.taskPlayAnim(casinoWheelAnimDict, 'win', 8.0, 1.0, -1, 128, 0.0, false, false, false);

				let winSoundID = mp.game.invoke(casinoWheelNatives.GET_SOUND_ID);
				mp.game.audio.playSoundFromCoord(winSoundID, 'Win',
				wheelPos.x, wheelPos.y, wheelPos.z, 'dlc_vw_casino_lucky_wheel_sounds', false, 0, false);
				
				isPlayerRollingWheel = false;
			}

			clearInterval(interval);

			return;
		}

		casinoWheelObject.setRotation(0.0, (y * -1), 0.0, 1, true);

		let parsedInt = parseInt(Math.round((y * -1) % 18).toFixed(0));
		if (parsedInt < 0) {
			parsedInt *= -1;
		}
		// По идеи, звуки должны срабатывать в пределах: 8, 26, 44, 62, 80, 98, 116, 134, 152, 170, 188, 206
		// Т.е. n % 18 = 8 (выше parsedInt)
		// но из-за того, что при вращение круга есть ошибки, я ловлю их используя between
		// хардкоденный способ, но другое решение я не придумал
		if(thePlayer == localPlayer) {
			if (parsedInt === 8 || parsedInt === 7 || parsedInt === 9) {
				if (lastSoundID === -1 && mp.game.audio.hasSoundFinished(lastSoundID)) {
					lastSoundID = mp.game.invoke(casinoWheelNatives.GET_SOUND_ID);

					mp.game.audio.playSoundFromCoord(lastSoundID, 'Spin_Single_Ticks',
					wheelPos.x, wheelPos.y, wheelPos.z, 'dlc_vw_casino_lucky_wheel_sounds', false, 0, false);
					mp.game.invoke(casinoWheelNatives.SET_VARIABLE_ON_SOUND, lastSoundID, 'spinSpeed', false);

					mp.game.audio.stopSound(lastSoundID);
					mp.game.audio.releaseSoundId(lastSoundID);

					lastSoundID = -1;
				} else {
					mp.game.audio.stopSound(lastSoundID);
					mp.game.audio.releaseSoundId(lastSoundID);

					lastSoundID = -1;
				}
			}
		}
	}, 0);
});

// Is used to change consecutive animations
function casinoWheelStages(value) {
  switch (value) {
    case 0: {
      localPlayer.taskGoStraightToCoord(
        initialStartRollPosition.x, initialStartRollPosition.y, initialStartRollPosition.z,
        1.0, -1, 352, 0.0
      );

      const interval = setInterval(() => {
        const distance = mp.game.gameplay.getDistanceBetweenCoords(
          localPlayer.position.x, localPlayer.position.y, localPlayer.position.z,
          initialStartRollPosition.x, initialStartRollPosition.y, initialStartRollPosition.z, false
        );

        if (distance <= 0.015) {
          // Is used to put player in "right" position.
          // If you remove it, ped can start animation at wrong time / position.
          if (localPlayer.getHeading() !== 352) {
            localPlayer.setHeading(352);
          }
          if (localPlayer.position !== initialStartRollPosition) {
            localPlayer.position = initialStartRollPosition;
          }

          playerStepsOnCasinoWheel = 1;
          casinoWheelStages(playerStepsOnCasinoWheel);

          clearInterval(interval);
        }
      }, 50);

      break;
    }

    case 1: {
      localPlayer.taskPlayAnim(casinoWheelAnimDict, 'Enter_to_ArmRaisedIDLE',
        8.0, 0.0, -1, 2, 0.0, false, false, false);
		
	    mp.game.graphics.notify(`~s~Нажми ~g~[ N ]~n~~s~Что бы покинуть колесо фортуны`);
      break;
    }
    case 2: {
      const animInterval = setInterval(() => {
        const animCurrentTime = localPlayer.getAnimCurrentTime(casinoWheelAnimDict, 'Enter_to_ArmRaisedIDLE');

        if(animCurrentTime >= 0.95) {
			mp.events.callRemote("casinoRollWheel");
          localPlayer.taskPlayAnim(casinoWheelAnimDict, 'ArmRaisedIDLE_to_SpinningIDLE_High',
            8.0, 1.0, -1, 2, 0.0, false, false, false);

          playerStepsOnCasinoWheel = 3;
          casinoWheelStages(playerStepsOnCasinoWheel);

          clearInterval(animInterval);
        }
      }, 50);
      break;
    }

    case 3: {
      const animInterval = setInterval(() => {
        const animCurrentTime = localPlayer.getAnimCurrentTime(casinoWheelAnimDict, 'ArmRaisedIDLE_to_SpinningIDLE_High');

        //mp.gui.chat.push('anim: ' + animCurrentTime);

        if (animCurrentTime >= 0.95) {
			localPlayer.freezePosition(true);
          localPlayer.taskPlayAnim(casinoWheelAnimDict, 'SpinningIDLE_High',
            8.0, 1.0, -1, 1, 0.0, false, false, false);

          clearInterval(animInterval);
        }
      }, 50);

      break;
    }

    default: break;
  }
};

// Start Rolling Wheel Process
function startRollingWheel() {
	if(isPlayerRollingWheel) return false;
	playerStepsOnCasinoWheel = 0;
	casinoWheelStages(playerStepsOnCasinoWheel);
};

// DEBUG KEYS

mp.events.add('casinoWheelOccupied', (isError) => {
	if(typeof(isError) !== "undefined") {
		if(inCasino) {
			inCasino.gameType = false;
			inCasino.gameName = false;
		}
		playerStepsOnCasinoWheel = 0;
		restoreBinds();
		return chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+isError.toString()+"</span>");
	}
	if(inCasino) {
		inCasino.gameType = "wheel";
		inCasino.gameName = "колесо фортуны";
	}
	allowBinds = [0x45,0x4E];
	mp.game.graphics.notify(`~s~Нажми ~g~[ E ]~n~~s~Что бы крутануть~n~Стоимость ~b~50 000~s~ фишек`);
	startRollingWheel();
});

// E
mp.keys.bind(0x45, true, () => {
	if(isImInCasinoWheelColshape && !casinoAntiFlood) {
		if(!allowBinds || !Array.isArray(allowBinds)) return false;
		if(!allowBinds.includes(0x45)) return false;
		if(localPlayer.isDead() || mp.gui.cursor.visible || !inCasino || casinoAntiFlood) return false;
		
		casinoAntiFlood = true;
		setTimeout(function() { casinoAntiFlood = false }, 1500);
		
		if(playerStepsOnCasinoWheel == 0) {
			allowBinds = [];
			return mp.events.callRemote("occupyCasinoWheel");
		}else if (playerStepsOnCasinoWheel == 1) {
			allowBinds = [];
			playerStepsOnCasinoWheel = 2;
			return casinoWheelStages(playerStepsOnCasinoWheel);
		}
	}
});

// N
mp.keys.bind(0x4E, true, () => {
	if(isImInCasinoWheelColshape && playerStepsOnCasinoWheel != 0 && inCasino) {
		if(!allowBinds || !Array.isArray(allowBinds)) return false;
		if(!allowBinds.includes(0x4E)) return false;
		restoreBinds();
		if(inCasino) {
			inCasino.gameType = false;
			inCasino.gameName = false;
		}
		playerStepsOnCasinoWheel = 0;
		localPlayer.taskPlayAnim(casinoWheelAnimDict, 'Exit_to_Standing', 8.0, 1.0, -1, 128, 0.0, false, false, false);
		return mp.events.callRemote("leaveCasinoWheel");
	}
});

mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(inCasino) inCasino = false;
		if(isImInCasinoWheelColshape && playerStepsOnCasinoWheel != 0) {
			playerStepsOnCasinoWheel = 0;
			mp.events.callRemote("leaveCasinoWheel");
		}
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if (shape === casinoWheelColshape) {
		mp.game.graphics.notify(`~s~Нажми ~g~[ E ]~n~~s~Что бы подойти к~n~~b~Колесу фортуны`);
		isImInCasinoWheelColshape = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape === casinoWheelColshape) {
		isImInCasinoWheelColshape = false;
		if(playerStepsOnCasinoWheel != 0) playerStepsOnCasinoWheel = 0;
		if(inCasino) {
			if(typeof(inCasino.gameType) !== "undefined") {
				if(inCasino.gameType == "wheel") {
					inCasino.gameType = false;
					inCasino.gameName = false;
					mp.events.callRemote("leaveCasinoWheel");
				}
			}
		}
	}
});
} 眓̦