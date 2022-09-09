{
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const { cbGenericPorts } = require('./CircuitBreaker/CbGenericPorts');
const { cbHelper } = require('./CircuitBreaker/CbHelper');
const { cbMapBoundaries } = require('./CircuitBreaker/CbMapBoundaries');
const { cbPoint } = require('./CircuitBreaker/CbPoint');
const { Scaleform } = require('./CircuitBreaker/Scaleform');

class CircuitBreaker {
  constructor(lives, difficulty, levels, onDestroy) {
    this.lives = lives;
    this.difficulty = difficulty;
    this.levels = levels;
    this.onDestroy = onDestroy;
    // NONE, ERROR, FAILURE_OUTOFBOUNDS, FAILURE_COLLISIONWITHPORT, FAILURE_TRAILCOLLISION, QUIT, STARTING, INPROGRESS, DEATH, DISCONNECTED, SUCCESS
    this.status = 'NONE';
    this.soundId = -1;
    this.blockedAreas = [];
    this.gameBounds = [
      { x: 0.159, y: 0.153 },
      { x: 0.159, y: 0.848 },
      { x: 0.841, y: 0.848 },
      { x: 0.841, y: 0.153 } //  Top Right
    ];
    this.textureDictionaries = ['MPCircuitHack', 'MPCircuitHack2', 'MPCircuitHack3'];
    this.currentPointSpeed = 0.00085;
    this.scaleform = null;
    this.startTime = 0;
    this.endTime = 0;
    this.availableLevels = [1, 2, 3, 4, 5, 6];
    this.levelsToComplete = [];
    this.level = 1;
    this.livesLeft = 1;
    this.disconnected = false;
    this.disconnectChance = 0;
    this.disconnectCheckRateMs = 0;
    this.nextTimeCheckDisconnect = 0;
    this.reconnectIn = 0;
    this.status = 'STARTING';
    // Ensure levels aren't out of bounds
    if (this.levels > 6)
      this.levels = 6;
    if (this.levels < 1)
      this.levels = 1;
    this.fillLevels(this.levels);
    this.level = this.getLevel();
    this.livesLeft = this.lives;
    // Ensure lives aren't out of bounds
    if (this.livesLeft > 10)
      this.livesLeft = 10;
    if (this.livesLeft < 1)
      this.livesLeft = 1;
    // Ensure difficulty isn't out of bounds
    if (this.difficulty > 4)
      this.difficulty = 4;
    if (this.difficulty < 0)
      this.difficulty = 0;
    this.currentPointSpeed = this.getPointSpeedFromDifficulty(this.difficulty);
    this.disconnectChance = this.getDisconnectChanceFromDifficulty(this.difficulty);
    this.disconnectCheckRateMs = this.getDisconnectCheckRateMsFromDifficulty(this.difficulty);
    this.init();
  }
  getLevel() {
    var _a;
    if (this.levelsToComplete.length === 0)
      return 1;
    return (_a = this.levelsToComplete.shift()) !== null && _a !== void 0 ? _a : 1;
  }
  fillLevels(count) {
    if (count < 1)
      return;
    this.levelsToComplete = new Array(count).fill(1).map(() => this.getRandomLevel());
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomLevel() {
    if (this.availableLevels.length === 0)
      return 1;
    const randomIndex = this.getRandom(0, this.availableLevels.length - 1);
    return this.availableLevels[randomIndex];
  }
  gameDraw() {
    if (this.scaleform === null)
      return false;
    this.drawMapSprite(this.level);
    const collisionHit = this.drawPointAndPortSprites();
    this.scaleform.render2D();
    return collisionHit;
  }
  checkDisconnect() {
    if (Date.now() >= this.nextTimeCheckDisconnect) {
      this.disconnected = this.getRandom(0, 100) <= this.disconnectChance;
      return this.disconnected;
    }
    return false;
  }
  inProcessLogic(collisionHit) {
    if (this.exitButtonPressed()) {
      this.endGame(true);
      return;
    }
    if (Date.now() < this.startTime)
      return;
    if (this.disconnectChance > 0 && this.checkDisconnect()) {
      this.status = 'DISCONNECTED';
      return;
    }
    if (cbGenericPorts.isPointInGameWinningPosition(cbPoint.position)) {
      this.status = 'SUCCESS';
      return;
    }
    if (this.isPointOutOfBounds(this.blockedAreas, this.gameBounds)) {
      this.status = 'FAILURE_OUTOFBOUNDS';
      return;
    }
    if (cbGenericPorts.isCollidingWithPort(cbPoint.position)) {
      this.status = 'FAILURE_COLLISIONWITHPORT';
      return;
    }
    if (collisionHit) {
      this.status = 'FAILURE_TRAILCOLLISION';
      return;
    }
    if (cbPoint.isAlive) {
      cbPoint.getPointInputFromPlayer();
      cbPoint.movePoint(this.currentPointSpeed);
    }
  }
  successLogic() {
    const now = Date.now();
    if (this.endTime === 0) {
      this.showSuccessScreenAndPlaySound();
      this.endTime = now + 3000;
      return;
    }
    if (now < this.endTime)
      return;
    if (this.checkLevelsToPlay()) {
      this.continueGame();
      return;
    }
    this.status = 'QUIT';
    mp.events.call('CircuitBreakerWIN');
  }
  restartSameLevel() {
    this.status = 'DEATH';
    this.showDeathScreenAndPlaySound();
    cbPoint.initialize();
    this.startTime = Date.now() + 3000;
    this.nextTimeCheckDisconnect = this.startTime + this.disconnectCheckRateMs;
  }
  failureLogic() {
    this.livesLeft--;
    if (this.livesLeft > 0) {
      this.restartSameLevel();
      return;
    }
    if (cbPoint.isAlive) {
      cbPoint.startPointDeathAnimation();
    }
    if (!cbPoint.isVisible) {
      const now = Date.now();
      if (this.endTime === 0) {
        this.showFailureScreenAndPlaySound();
        this.endTime = Date.now() + 3000;
        return;
      }
      if (now >= this.endTime) {
        this.status = 'QUIT';
        mp.events.call('CircuitBreakerLOSE');
      }
    }
  }
  deathLogic() {
    const now = Date.now();
    if (now >= this.startTime) {
      this.playStartSound();
      this.resetDisplayScaleform();
      this.status = 'INPROGRESS';
      return;
    }
  }
  disconnectLogic() {
    if (this.reconnectIn === 0) {
      mp.game.audio.playSoundFrontend(-1, 'Power_Down', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
      this.showDisplayScaleform('CONNECTION LOST', 'Reconnecting...', cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, false);
      this.reconnectIn = Date.now() + this.getRandom(500, 5000);
      return;
    }
    const now = Date.now();
    if (now >= this.reconnectIn) {
      this.playStartSound();
      this.resetDisplayScaleform();
      this.status = 'INPROGRESS';
      this.reconnectIn = 0;
      this.nextTimeCheckDisconnect = now + this.disconnectCheckRateMs;
      return;
    }
  }
  tick() {
    if (this.status === 'NONE')
      return;
    this.disableControls();
    const collisionHit = this.gameDraw();
    switch (this.status) {
      case 'INPROGRESS':
        this.inProcessLogic(collisionHit);
        break;
      case 'SUCCESS':
        this.successLogic();
        break;
      case 'FAILURE_OUTOFBOUNDS':
      case 'FAILURE_COLLISIONWITHPORT':
      case 'FAILURE_TRAILCOLLISION':
        this.failureLogic();
        break;
      case 'DEATH':
        this.deathLogic();
        break;
      case 'DISCONNECTED':
        this.disconnectLogic();
        break;
      case 'QUIT':
        this.endGame(false);
        break;
      default:
        break;
    }
  }
  endGame(exit) {
    if (exit)
      mp.events.call('CircuitBreakerLOSE');
    this.status = 'NONE';
    this.destroy();
  }
  checkLevelsToPlay() {
    return this.levelsToComplete.length !== 0;
  }
  continueGame() {
    this.resetDisplayScaleform();
    this.level = this.getLevel();
    this.blockedAreas = cbMapBoundaries.getBoxBounds(this.level);
    cbGenericPorts.initialize(this.level);
    cbPoint.initialize();
    this.startTime = Date.now() + 3000;
    this.nextTimeCheckDisconnect = this.startTime + this.disconnectCheckRateMs;
    this.endTime = 0;
    this.playStartSound();
    this.status = 'INPROGRESS';
  }
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.status !== 'STARTING')
        return;
      yield this.loadResources();
      //this.soundId = mp.game.invokeFloat('0x430386FE9BF80B45'); // GET_SOUND_ID
      //mp.game.audio.playSoundFrontend(this.soundId, 'Background', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
      this.blockedAreas = cbMapBoundaries.getBoxBounds(this.level);
      cbGenericPorts.initialize(this.level);
      cbPoint.initialize();
      this.startTime = Date.now() + 3000;
      this.nextTimeCheckDisconnect = this.startTime + this.disconnectCheckRateMs;
      this.playStartSound();
      this.status = 'INPROGRESS';
    });
  }
  loadResources() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.loadTextures();
      yield this.loadScaleform();
    });
  }
  loadTextures() {
    return __awaiter(this, void 0, void 0, function* () {
      for (const dict of this.textureDictionaries) {
        mp.game.graphics.requestStreamedTextureDict(dict, false);
        while (!mp.game.graphics.hasStreamedTextureDictLoaded(dict)) {
          yield new Promise(res => setTimeout(res, 5));
        }
      }
    });
  }
  resetTextureDictionaries() {
    for (const dict of this.textureDictionaries) {
      mp.game.graphics.setStreamedTextureDictAsNoLongerNeeded(dict);
    }
  }
  resetSounds() {
    if (this.soundId === -1)
      return;
    mp.game.audio.stopSound(this.soundId);
    mp.game.audio.releaseSoundId(this.soundId);
    this.soundId = -1;
  }
  playStartSound() {
    mp.game.audio.playSoundFrontend(-1, 'Start', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
  }
  resetDisplayScaleform() {
    if (this.scaleform === null)
      return;
    this.scaleform.callFunction('SET_DISPLAY', -1);
  }
  showDisplayScaleform(title, msg, r, g, b, stagePassed) {
    if (this.scaleform === null)
      return;
    this.scaleform.callFunction('SET_DISPLAY', 0, title, msg, r, g, b, stagePassed);
  }
  showSuccessScreenAndPlaySound() {
    mp.game.audio.playSoundFrontend(-1, 'Success', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT COMPLETE', 'Decryption Execution x86 Tunneling', cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b, true);
  }
  showFailureScreenAndPlaySound() {
    mp.game.audio.playSoundFrontend(-1, 'Crash', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT FAILED', 'Security Tunnel Detected', cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, false);
  }
  showDeathScreenAndPlaySound() {
    mp.game.audio.playSoundFrontend(-1, 'Crash', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT FAILED', `${this.livesLeft} Attempts Left`, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, false);
  }
  resetScaleform() {
    if (this.scaleform === null)
      return;
    this.scaleform.dispose();
    this.scaleform = null;
  }
  loadScaleform() {
    return __awaiter(this, void 0, void 0, function* () {
      this.resetScaleform();
      yield new Promise(res => setTimeout(res, 50));
      this.scaleform = new Scaleform('HACKING_MESSAGE');
      let loadAttempt = 0;
      while (this.scaleform === null || !this.scaleform.isLoaded()) {
        yield new Promise(res => setTimeout(res, 50));
        loadAttempt++;
        if (loadAttempt > 50)
          break;
      }
    });
  }
  drawMapSprite(currentMap) {
    mp.game.graphics.drawSprite(currentMap > 3 ? 'MPCircuitHack3' : 'MPCircuitHack2', `cblevel${this.level}`, 0.5, 0.5, 1, 1, 0, 255, 255, 255, 255);
  }
  drawPointAndPortSprites() {
    cbPoint.drawPoint(this.status);
    const collisionHit = cbPoint.drawTailHistoryAndCheckCollisions(this.status);
    cbGenericPorts.drawPorts();
    return collisionHit;
  }
  getPointSpeedFromDifficulty(difficulty) {
    if (difficulty === 0)
      return 0.00085;
    if (difficulty === 1)
      return 0.001;
    if (difficulty === 2)
      return 0.002;
    if (difficulty === 3)
      return 0.003;
    if (difficulty === 4)
      return 0.01;
    return 0.00085;
  }
  getDisconnectChanceFromDifficulty(difficulty) {
    if (difficulty === 0)
      return 0;
    if (difficulty === 1)
      return 0.15;
    if (difficulty === 2)
      return 0.3;
    if (difficulty === 3)
      return 0.45;
    if (difficulty === 4)
      return 0.6;
    return 0;
  }
  getDisconnectCheckRateMsFromDifficulty(difficulty) {
    if (difficulty === 0)
      return 15000;
    if (difficulty === 1)
      return 10000;
    if (difficulty === 2)
      return 5000;
    if (difficulty === 3)
      return 4000;
    if (difficulty === 4)
      return 2000;
    return 10000;
  }
  exitButtonPressed() {
    return mp.game.controls.isDisabledControlJustPressed(0, 44);
  }
  disableControls() {
    mp.game.controls.disableControlAction(0, 32, true); // W, Up
    mp.game.controls.disableControlAction(0, 33, true); // S, Down
    mp.game.controls.disableControlAction(0, 34, true); // A, Left
    mp.game.controls.disableControlAction(0, 35, true); // D, Right
    mp.game.controls.disableControlAction(0, 44, true); // Q, Cover
  }
  isPointOutOfBounds(polybounds, mapBounds) {
    const headPts = this.getPointMaxPoints(cbPoint.position, cbPoint.pointHeadSize + -0.375 * cbPoint.pointHeadSize);
    for (const pt of headPts) {
      for (const bounds of polybounds) {
        if (cbHelper.isInPoly(bounds, pt)) {
          return true;
        }
      }
      if (!cbHelper.isInPoly(mapBounds, pt)) {
        return true;
      }
    }
    return false;
  }
  getPointMaxPoints(pointCoord, pointHeadSize) {
    const headHeight = pointHeadSize;
    const headWidth = pointHeadSize;
    const headPts = [
      { x: pointCoord.x - headWidth / 2, y: pointCoord.y },
      { x: pointCoord.x + headWidth / 2, y: pointCoord.y },
      { x: pointCoord.x, y: pointCoord.y - headHeight / 2 },
      { x: pointCoord.x, y: pointCoord.y + headHeight / 2 }
    ];
    return [...headPts, pointCoord];
  }
  destroy() {
    this.resetScaleform();
    this.resetSounds();
    this.resetTextureDictionaries();
    this.onDestroy();
    mp.players.local.buckle = false;
    mp.players.local.minigame = false;
  }
}

exports.CircuitBreaker = CircuitBreaker;
}