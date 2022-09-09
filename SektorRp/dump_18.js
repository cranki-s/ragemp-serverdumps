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

const { cbGenericPorts } = require("./CircuitBreaker/CbGenericPorts");
const { cbHelper } = require("./CircuitBreaker/CbHelper");

class CbPoint {
  constructor() {
    this.pointHeadSize = 0.0125;
    this.history = [];
    this.alpha = 255;
    this.isAlive = true;
    this.isVisible = true;
    this.lastDirection = 'NONE';
    this.position = { x: 0, y: 0 };
  }
  resetData() {
    this.alpha = 255;
    this.isAlive = true;
    this.isVisible = true;
  }
  initialize() {
    this.resetData();
    this.history = [];
    this.setPointStartPosition();
    this.history.push(cbGenericPorts.startPortPos);
    this.setStartDirection(cbGenericPorts.startPortHeading);
  }
  drawPoint(status) {
    if (!this.isAlive) {
      mp.game1.graphics.drawSprite('MPCircuitHack', 'spark', this.position.x, this.position.y, 0.0125, 0.0125, 0, 255, 255, 255, this.alpha);
    }
    switch (status) {
      case 'STARTING':
      case 'INPROGRESS':
      case 'SUCCESS':
        mp.game1.graphics.drawSprite('MPCircuitHack', 'head', this.position.x, this.position.y, this.pointHeadSize, this.pointHeadSize, 0, cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b, this.alpha);
        return;
      default:
        mp.game1.graphics.drawSprite('MPCircuitHack', 'head', this.position.x, this.position.y, this.pointHeadSize, this.pointHeadSize, 0, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, this.alpha);
        return;
    }
  }
  getCenterPoint(pos, xDeltaOverYDelta, xDelta, yDelta, distance) {
    if (xDeltaOverYDelta) {
      return xDelta < 0 ? { x: pos.x + distance / 2, y: pos.y } : { x: pos.x - distance / 2, y: pos.y };
    }
    return yDelta < 0 ? { x: pos.x, y: pos.y + distance / 2 } : { x: pos.x, y: pos.y - distance / 2 };
  }
  drawTailSpriteWidth(status, center, distance) {
    switch (status) {
      case 'STARTING':
      case 'INPROGRESS':
      case 'SUCCESS':
        mp.game1.graphics.drawSprite('MPCircuitHack', 'tail', center.x, center.y, distance + 0.0018, 0.003, 0, cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b, this.alpha);
        return;
      default:
        mp.game1.graphics.drawSprite('MPCircuitHack', 'tail', center.x, center.y, distance + 0.0018, 0.003, 0, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, this.alpha);
        return;
    }
  }
  drawTailSpriteHeight(status, center, distance) {
    switch (status) {
      case 'STARTING':
      case 'INPROGRESS':
      case 'SUCCESS':
        mp.game1.graphics.drawSprite('MPCircuitHack', 'tail', center.x, center.y, 0.0018, distance + 0.003, 0, cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b, this.alpha);
        return;
      default:
        mp.game1.graphics.drawSprite('MPCircuitHack', 'tail', center.x, center.y, 0.0018, distance + 0.003, 0, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, this.alpha);
        return;
    }
  }
  checkForCollision(xDeltaOverYDelta, center, distance) {
    function toNDp(input, dp) {
      return parseFloat(input.toFixed(dp));
    }
    const distance2 = distance / 2;
    if (xDeltaOverYDelta) {
      const roundedX = toNDp(this.position.x, 3);
      if (roundedX <= toNDp(center.x - distance2, 3))
        return false;
      if (roundedX >= toNDp(center.x + distance2, 3))
        return false;
      if (Math.abs(this.position.y - center.y) > 0.003)
        return false;
      return true;
    }
    const roundedY = toNDp(this.position.y, 3);
    if (roundedY <= toNDp(center.y - distance2, 3))
      return false;
    if (roundedY >= toNDp(center.y + distance2, 3))
      return false;
    if (Math.abs(this.position.x - center.x) > 0.003)
      return false;
    return true;
  }
  drawTailHistoryAndCheckCollisions(status) {
    if (this.history.length === 0)
      return false;
    let distance;
    let xDelta;
    let yDelta;
    let centerPoint;
    let historyPoint;
    let historyNextPoint;
    let xDeltaOverYDelta;
    const historyClone = [...this.history];
    for (let i = 0; i < historyClone.length; i++) {
      historyPoint = historyClone[i];
      if (i + 1 === historyClone.length)
        historyNextPoint = { x: this.position.x, y: this.position.y };
      else
        historyNextPoint = historyClone[i + 1];
      distance = cbHelper.getDistance(historyNextPoint, historyPoint);
      xDelta = historyNextPoint.x - historyPoint.x;
      yDelta = historyNextPoint.y - historyPoint.y;
      xDeltaOverYDelta = Math.abs(xDelta) > Math.abs(yDelta);
      centerPoint = this.getCenterPoint(historyNextPoint, xDeltaOverYDelta, xDelta, yDelta, distance);
      if (this.checkForCollision(xDeltaOverYDelta, centerPoint, distance))
        return true;
      this.drawTail(status, centerPoint, xDeltaOverYDelta, distance);
    }
    return false;
  }
  drawTail(status, center, xDeltaOverYDelta, distance) {
    if (xDeltaOverYDelta) {
      this.drawTailSpriteWidth(status, center, distance);
    }
    else {
      this.drawTailSpriteHeight(status, center, distance);
    }
  }
  movePoint(speed) {
    this.setPosition(this.lastDirection, speed);
  }
  addToTailHistory(directionChangePoint) {
    if (!this.history.some(e => e.x === directionChangePoint.x && e.y === directionChangePoint.y)) {
      this.history.push(directionChangePoint);
    }
  }
  setStartDirection(heading) {
    switch (heading) {
      case 0:
        this.lastDirection = 'RIGHT';
        break;
      case 90:
        this.lastDirection = 'DOWN';
        break;
      case 180:
        this.lastDirection = 'LEFT';
        break;
      default:
        this.lastDirection = 'UP';
        break;
    }
  }
  getDirectionFromInput() {
    if (mp.game1.controls.isDisabledControlPressed(0, 34))
      return 'LEFT';
    if (mp.game1.controls.isDisabledControlPressed(0, 35))
      return 'RIGHT';
    if (mp.game1.controls.isDisabledControlPressed(0, 32))
      return 'UP';
    if (mp.game1.controls.isDisabledControlPressed(0, 33))
      return 'DOWN';
    return this.lastDirection;
  }
  isOppositeOfCurrentDirection(direction) {
    return ((this.lastDirection === 'LEFT' && direction === 'RIGHT') ||
      (this.lastDirection === 'RIGHT' && direction === 'LEFT') ||
      (this.lastDirection === 'UP' && direction === 'DOWN') ||
      (this.lastDirection === 'DOWN' && direction === 'UP'));
  }
  getPointInputFromPlayer() {
    const newDirection = this.getDirectionFromInput();
    const lastPos = { x: this.position.x, y: this.position.y };
    if (newDirection === this.lastDirection || this.isOppositeOfCurrentDirection(newDirection)) {
      return;
    }
    this.lastDirection = newDirection;
    this.addToTailHistory(lastPos);
    mp.game1.audio.playSoundFrontend(-1, 'Click', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
  }
  startPointDeathAnimation() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isAlive)
        return;
      this.isAlive = false;
      while (this.alpha > 0) {
        this.updateAlpha();
        yield mp.game1.waitAsync(0);
      }
    });
  }
  updateAlpha() {
    if (this.isAlive)
      return;
    let newAlpha = this.alpha - 5;
    if (newAlpha < 0)
      newAlpha = 0;
    if (newAlpha > 255)
      newAlpha = 255;
    this.alpha = newAlpha;
    if (this.alpha <= 0)
      this.isVisible = false;
  }
  setPointStartPosition() {
    const magnitude = cbGenericPorts.startPortHeading === 0 || cbGenericPorts.startPortHeading === 180 ? 0.0144 : 0.021;
    this.position = cbHelper.getOffsetPosition(cbGenericPorts.startPortPos, magnitude, cbGenericPorts.startPortHeading, 1);
  }
  setPosition(direction, speed) {
    switch (direction) {
      case 'UP':
        this.position.y -= speed;
        break;
      case 'DOWN':
        this.position.y += speed;
        break;
      case 'LEFT':
        this.position.x -= speed;
        break;
      case 'RIGHT':
        this.position.x += speed;
        break;
      default:
        break;
    }
    if (this.position.x < 0)
      this.position.x = 0;
    if (this.position.x > 1)
      this.position.x = 1;
    if (this.position.y < 0)
      this.position.y = 0;
    if (this.position.y > 1)
      this.position.y = 1;
  }
}

exports.cbPoint = new CbPoint();
}