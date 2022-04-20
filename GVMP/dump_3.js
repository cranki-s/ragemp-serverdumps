{
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./modules/modules');

},{"./modules/modules":200}],2:[function(require,module,exports){
"use strict";

const { cbHelper } = require("../CircuitBreaker/CbHelper");
const { CbPortLights } = require("../CircuitBreaker/CbPortLights");

class CbGenericPorts {
  constructor() {
    this.startPortPos = { x: 0, y: 0 };
    this.finishPortPos = { x: 0, y: 0 };
    this.startPortHeading = -1;
    this.finishPortHeading = -1;
    this.startPortLights = null;
    this.finishPortLights = null;
    this.startPortBounds = [];
    this.finishPortBounds = [];
    this.winBounds = [];
  }
  isVectorZero(vector) {
    return vector.x === 0 && vector.y === 0;
  }
  initialize(level) {
    this.startPortPos = this.getStartPortPosition(level);
    this.finishPortPos = this.getFinishPortPosition(level, this.startPortPos);
    this.startPortHeading = this.getPortHeading(this.startPortPos);
    this.finishPortHeading = this.getPortHeading(this.finishPortPos);
    this.startPortLights = new CbPortLights(this.startPortPos, this.startPortHeading, 'START');
    this.finishPortLights = new CbPortLights(this.finishPortPos, this.finishPortHeading, 'FINISH');
    this.startPortBounds = this.getPortCollisionBounds(this.startPortPos, this.startPortHeading, true);
    this.finishPortBounds = this.getPortCollisionBounds(this.finishPortPos, this.finishPortHeading, false);
    this.winBounds = this.getWinBounds();
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  drawPorts() {
    if (this.isVectorZero(this.startPortPos) || this.isVectorZero(this.finishPortPos) || this.startPortHeading === -1 || this.finishPortHeading === -1) {
      return;
    }
    this.drawPortSprite(this.startPortPos, this.startPortHeading);
    this.drawPortSprite(this.finishPortPos, this.finishPortHeading);
    if (this.startPortLights) this.startPortLights.drawLights();
    if (this.finishPortLights) this.finishPortLights.drawLights();
  }
  isCollidingWithPort(pointPosition) {
    return (cbHelper.isInPoly(this.startPortBounds, pointPosition) || cbHelper.isInPoly(this.finishPortBounds, pointPosition)) && !this.isPointInGameWinningPosition(pointPosition);
  }
  isPointInGameWinningPosition(pointPosition) {
    return cbHelper.isInPoly(this.winBounds, pointPosition);
  }
  drawPortSprite(position, heading) {
    const portHeight = heading === 0 || heading === 180 ? 0.055 : 0.0325;
    const portWidth = heading === 0 || heading === 180 ? 0.02 : 0.0325;
    mp.game1.graphics.drawSprite('MPCircuitHack', 'genericport', position.x, position.y, portWidth, portHeight, heading, 255, 255, 255, 255);
  }
  getMagnitude(heading, isStartPort) {
    if (heading === 0 || heading === 180) {
      return isStartPort ? 0.0279 : 0.0266;
    }
    return isStartPort ? 0.0211 : 0.0173;
  }
  getAngles(heading, isStartPort) {
    if (heading === 0 || heading === 180) {
      return isStartPort ? [289.75, 250.75, 109.75, 70] : [277.75, 259.25, 100.75, 82.5];
    }
    return isStartPort ? [313.25, 227.75, 132.25, 48.5] : [111, 66.5, 293.25, 249.25];
  }
  getPortCollisionBounds(position, heading, isStartPort) {
    const magnitude = this.getMagnitude(heading, isStartPort);
    const mult = heading === 0 || heading === 180 ? 1 : -1;
    const angles = this.getAngles(heading, isStartPort);
    const portBounds = [];
    for (const angle of angles) {
      portBounds.push(cbHelper.getOffsetPosition(position, magnitude, (heading + angle) % 360, mult));
    }
    return portBounds;
  }
  getMagnitudeAngleOffsetPairs(heading) {
    return heading === 0 || heading === 180 ? [[0.0278, 70.25], [0.02807, 289.5], [0.02708, 282], [0.02665, 77.75]] : [[0.02088, 228.5], [0.01827, 238.75], [0.01806, 121.75], [0.02061, 131.75]];
  }
  getWinBounds() {
    const mult = this.finishPortHeading === 0 || this.finishPortHeading === 180 ? 1 : -1;
    const magnitudeAngleOffsetPairs = this.getMagnitudeAngleOffsetPairs(this.finishPortHeading);
    const portBounds = [];
    for (const pair of magnitudeAngleOffsetPairs) {
      portBounds.push(cbHelper.getOffsetPosition(this.finishPortPos, pair[0], (this.finishPortHeading + pair[1]) % 360, mult));
    }
    return portBounds;
  }
  getStartPortPosition(level) {
    const potentialPortBounds = this.getPortPositionBounds(level);
    if (potentialPortBounds.some(e => this.isVectorZero(e[0]) || this.isVectorZero(e[1]))) {
      return { x: 0, y: 0 };
    }
    const startPortBounds = potentialPortBounds[this.getRandom(0, potentialPortBounds.length - 1)];
    let startPos = { x: 0, y: 0 };
    let attempts = 20;
    while (this.isVectorZero(startPos) && attempts > 0) {
      startPos = this.getRandomPortPosition(startPortBounds);
      attempts--;
    }
    return startPos;
  }
  getFinishPortPosition(level, startPortPosition) {
    const potentialPortBounds = this.getPortPositionBounds(level);
    let maxDist = 0;
    let endPos = { x: 0, y: 0 };
    for (const bounds of potentialPortBounds) {
      let potentialPos = { x: 0, y: 0 };
      while (this.isVectorZero(potentialPos)) {
        potentialPos = this.getRandomPortPosition(bounds);
      }
      const startEndDist = cbHelper.getDistance(startPortPosition, potentialPos);
      if (startEndDist > maxDist) {
        maxDist = startEndDist;
        endPos = potentialPos;
      }
    }
    return endPos;
  }
  getPortHeading(portPosition) {
    const minX = 0.159;
    const maxX = 0.841;
    const minY = 0.153;
    const maxY = 0.848;
    const xBounds = [minX, maxX];
    const yBounds = [minY, maxY];
    const closestX = xBounds.sort((a, b) => Math.abs(a - portPosition.x) - Math.abs(b - portPosition.x))[0];
    const closestY = yBounds.sort((a, b) => Math.abs(a - portPosition.y) - Math.abs(b - portPosition.y))[0];
    if (Math.abs(portPosition.x - closestX) < Math.abs(portPosition.y - closestY)) {
      if (Math.abs(closestX - minX) < Math.abs(closestX - maxX)) {
        return 0;
      }
      return 180;
    }
    if (Math.abs(closestY - minY) < Math.abs(closestY - maxY)) {
      return 90;
    }
    return 270;
  }
  getRandomPortPosition(portBounds) {
    if (portBounds.length < 2) return { x: 0, y: 0 };
    const portX = this.getRandom(portBounds[0].x * 1000, portBounds[1].x * 1000) / 1000;
    const portY = this.getRandom(portBounds[0].y * 1000, portBounds[1].y * 1000) / 1000;
    return { x: portX, y: portY };
  }
  getPortPositionBounds(level) {
    switch (level) {
      case 1:
        return [[{ x: 0.169, y: 0.613 }, { x: 0.169, y: 0.816 }], [{ x: 0.179, y: 0.837 }, { x: 0.284, y: 0.837 }], [{ x: 0.833, y: 0.181 }, { x: 0.833, y: 0.277 }], [{ x: 0.751, y: 0.163 }, { x: 0.823, y: 0.163 }]];
      case 2:
        return [[{ x: 0.169, y: 0.673 }, { x: 0.169, y: 0.818 }], [{ x: 0.18, y: 0.838 }, { x: 0.297, y: 0.838 }], [{ x: 0.832, y: 0.181 }, { x: 0.832, y: 0.324 }], [{ x: 0.778, y: 0.16 }, { x: 0.821, y: 0.16 }]];
      case 3:
        return [[{ x: 0.166, y: 0.182 }, { x: 0.166, y: 0.263 }], [{ x: 0.166, y: 0.745 }, { x: 0.166, y: 0.816 }], [{ x: 0.18, y: 0.837 }, { x: 0.31, y: 0.837 }], [{ x: 0.184, y: 0.164 }, { x: 0.277, y: 0.164 }]];
      case 4:
        return [[{ x: 0.169, y: 0.628 }, { x: 0.169, y: 0.817 }], [{ x: 0.183, y: 0.838 }, { x: 0.259, y: 0.838 }], [{ x: 0.833, y: 0.186 }, { x: 0.833, y: 0.359 }], [{ x: 0.797, y: 0.161 }, { x: 0.819, y: 0.161 }]];
      case 5:
        return [[{ x: 0.832, y: 0.742 }, { x: 0.832, y: 0.811 }], [{ x: 0.761, y: 0.839 }, { x: 0.821, y: 0.839 }], [{ x: 0.169, y: 0.184 }, { x: 0.169, y: 0.383 }], [{ x: 0.184, y: 0.162 }, { x: 0.234, y: 0.162 }]];
      case 6:
        return [[{ x: 0.167, y: 0.183 }, { x: 0.167, y: 0.3 }], [{ x: 0.18, y: 0.162 }, { x: 0.214, y: 0.162 }], [{ x: 0.833, y: 0.186 }, { x: 0.833, y: 0.282 }], [{ x: 0.768, y: 0.161 }, { x: 0.82, y: 0.161 }]];
      default:
        return []; // Not possible
    }
  }
}

exports.cbGenericPorts = new CbGenericPorts();

},{"../CircuitBreaker/CbHelper":3,"../CircuitBreaker/CbPortLights":6}],3:[function(require,module,exports){
"use strict";

class CbHelper {
  constructor() {
    this.RED_COLOUR = { r: 188, g: 49, b: 43 };
    this.GREEN_COLOUR = { r: 45, g: 203, b: 134 };
  }
  getMinimum(numbers) {
    return Math.min(...numbers);
  }
  getMaximum(numbers) {
    return Math.max(...numbers);
  }
  getDistance(startPos, endPos) {
    return Math.sqrt(Math.pow(startPos.x - endPos.x, 2) + Math.pow(startPos.y - endPos.y, 2));
  }
  isInPoly(poly, point) {
    const minX = this.getMinimum(poly.map(p => p.x));
    const minY = this.getMinimum(poly.map(p => p.y));
    const maxX = this.getMaximum(poly.map(p => p.x));
    const maxY = this.getMaximum(poly.map(p => p.y));
    if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY) return false;
    let i = 0;
    let j = poly.length - 1;
    let isMatch = false;
    for (; i < poly.length; j = i++) {
      if (poly[i].x === point.x && poly[i].y === point.y) return true;
      if (poly[j].x === point.x && poly[j].y === point.y) return true;
      if (poly[i].x == poly[j].x && point.x == poly[i].x && point.y >= Math.min(poly[i].y, poly[j].y) && point.y <= Math.max(poly[i].y, poly[j].y)) return true;
      if (poly[i].y == poly[j].y && point.y == poly[i].y && point.x >= Math.min(poly[i].x, poly[j].x) && point.x <= Math.max(poly[i].x, poly[j].x)) return true;
      if (poly[i].y > point.y != poly[j].y > point.y && point.x < (poly[j].x - poly[i].x) * (point.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) isMatch = !isMatch;
    }
    return isMatch;
  }
  getOffsetPosition(startPosition, magnitude, heading, multiplier) {
    const cosx = multiplier * Math.cos(heading * (Math.PI / 180));
    const siny = multiplier * Math.sin(heading * (Math.PI / 180));
    return {
      x: startPosition.x + cosx * magnitude,
      y: startPosition.y + siny * magnitude
    };
  }
}
exports.cbHelper = new CbHelper();

},{}],4:[function(require,module,exports){
"use strict";

class CbMapBoundaries {
  getBoxBounds(mapNumber) {
    switch (mapNumber) {
      case 1:
        return [[{ x: 0.18, y: 0.155 }, { x: 0.18, y: 0.583 }, { x: 0.307, y: 0.583 }, { x: 0.307, y: 0.154 }], [{ x: 0.321, y: 0.154 }, { x: 0.321, y: 0.477 }, { x: 0.382, y: 0.477 }, { x: 0.382, y: 0.154 }], [{ x: 0.396, y: 0.154 }, { x: 0.396, y: 0.379 }, { x: 0.429, y: 0.379 }, { x: 0.429, y: 0.155 }], [{ x: 0.443, y: 0.155 }, { x: 0.443, y: 0.378 }, { x: 0.477, y: 0.378 }, { x: 0.477, y: 0.154 }], [{ x: 0.491, y: 0.154 }, { x: 0.491, y: 0.379 }, { x: 0.525, y: 0.379 }, { x: 0.525, y: 0.155 }], [{ x: 0.538, y: 0.155 }, { x: 0.538, y: 0.308 }, { x: 0.585, y: 0.308 }, { x: 0.585, y: 0.155 }], [{ x: 0.597, y: 0.155 }, { x: 0.597, y: 0.308 }, { x: 0.645, y: 0.308 }, { x: 0.645, y: 0.155 }], [{ x: 0.66, y: 0.155 }, { x: 0.66, y: 0.255 }, { x: 0.73, y: 0.255 }, { x: 0.73, y: 0.154 }], [{ x: 0.692, y: 0.311 }, { x: 0.692, y: 0.373 }, { x: 0.584, y: 0.376 }, { x: 0.584, y: 0.452 }, { x: 0.838, y: 0.452 }, { x: 0.838, y: 0.31 }], [{ x: 0.343, y: 0.544 }, { x: 0.343, y: 0.639 }, { x: 0.398, y: 0.639 }, { x: 0.398, y: 0.544 }], [{ x: 0.302, y: 0.7 }, { x: 0.302, y: 0.846 }, { x: 0.434, y: 0.846 }, { x: 0.434, y: 0.7 }], [{ x: 0.451, y: 0.435 }, { x: 0.451, y: 0.847 }, { x: 0.569, y: 0.847 }, { x: 0.569, y: 0.436 }], [{ x: 0.587, y: 0.477 }, { x: 0.587, y: 0.846 }, { x: 0.705, y: 0.846 }, { x: 0.705, y: 0.477 }], [{ x: 0.721, y: 0.477 }, { x: 0.721, y: 0.846 }, { x: 0.838, y: 0.846 }, { x: 0.838, y: 0.475 }]];
      case 2:
        return [[{ x: 0.162, y: 0.152 }, { x: 0.163, y: 0.645 }, { x: 0.249, y: 0.643 }, { x: 0.252, y: 0.275 }, { x: 0.375, y: 0.275 }, { x: 0.375, y: 0.35 }, { x: 0.416, y: 0.35 }, { x: 0.416, y: 0.157 }], [{ x: 0.313, y: 0.36 }, { x: 0.313, y: 0.844 }, { x: 0.442, y: 0.844 }, { x: 0.442, y: 0.419 }, { x: 0.349, y: 0.415 }, { x: 0.348, y: 0.36 }], [{ x: 0.458, y: 0.238 }, { x: 0.458, y: 0.844 }, { x: 0.515, y: 0.844 }, { x: 0.515, y: 0.238 }], [{ x: 0.555, y: 0.156 }, { x: 0.555, y: 0.454 }, { x: 0.541, y: 0.458 }, { x: 0.538, y: 0.551 }, { x: 0.685, y: 0.551 }, { x: 0.688, y: 0.46 }, { x: 0.725, y: 0.456 }, { x: 0.728, y: 0.309 }, { x: 0.757, y: 0.303 }, { x: 0.759, y: 0.157 }], [{ x: 0.552, y: 0.635 }, { x: 0.552, y: 0.786 }, { x: 0.695, y: 0.787 }, { x: 0.695, y: 0.633 }], [{ x: 0.776, y: 0.36 }, { x: 0.776, y: 0.455 }, { x: 0.839, y: 0.455 }, { x: 0.839, y: 0.358 }], [{ x: 0.739, y: 0.517 }, { x: 0.739, y: 0.679 }, { x: 0.801, y: 0.681 }, { x: 0.801, y: 0.514 }], [{ x: 0.739, y: 0.749 }, { x: 0.739, y: 0.846 }, { x: 0.839, y: 0.846 }, { x: 0.838, y: 0.747 }]];
      case 3:
        return [[{ x: 0.299, y: 0.153 }, { x: 0.299, y: 0.245 }, { x: 0.372, y: 0.249 }, { x: 0.375, y: 0.343 }, { x: 0.465, y: 0.344 }, { x: 0.465, y: 0.247 }, { x: 0.448, y: 0.242 }, { x: 0.446, y: 0.154 }], [{ x: 0.163, y: 0.298 }, { x: 0.163, y: 0.715 }, { x: 0.328, y: 0.715 }, { x: 0.331, y: 0.578 }, { x: 0.499, y: 0.578 }, { x: 0.502, y: 0.771 }, { x: 0.567, y: 0.771 }, { x: 0.568, y: 0.564 }, { x: 0.649, y: 0.564 }, { x: 0.649, y: 0.473 }, { x: 0.574, y: 0.468 }, { x: 0.572, y: 0.247 }, { x: 0.501, y: 0.247 }, { x: 0.501, y: 0.403 }, { x: 0.329, y: 0.403 }, { x: 0.328, y: 0.299 }], [{ x: 0.365, y: 0.674 }, { x: 0.365, y: 0.846 }, { x: 0.436, y: 0.846 }, { x: 0.436, y: 0.674 }], [{ x: 0.615, y: 0.154 }, { x: 0.615, y: 0.383 }, { x: 0.839, y: 0.383 }, { x: 0.839, y: 0.155 }], [{ x: 0.698, y: 0.429 }, { x: 0.698, y: 0.561 }, { x: 0.839, y: 0.561 }, { x: 0.839, y: 0.43 }], [{ x: 0.613, y: 0.649 }, { x: 0.613, y: 0.845 }, { x: 0.839, y: 0.845 }, { x: 0.839, y: 0.649 }]];
      case 4:
        return [[{ x: 0.162, y: 0.154 }, { x: 0.162, y: 0.593 }, { x: 0.305, y: 0.595 }, { x: 0.307, y: 0.654 }, { x: 0.419, y: 0.658 }, { x: 0.421, y: 0.78 }, { x: 0.54, y: 0.78 }, { x: 0.542, y: 0.658 }, { x: 0.69, y: 0.653 }, { x: 0.69, y: 0.559 }, { x: 0.542, y: 0.552 }, { x: 0.54, y: 0.489 }, { x: 0.324, y: 0.484 }, { x: 0.322, y: 0.154 }], [{ x: 0.276, y: 0.728 }, { x: 0.276, y: 0.846 }, { x: 0.381, y: 0.846 }, { x: 0.381, y: 0.73 }], [{ x: 0.352, y: 0.22 }, { x: 0.352, y: 0.298 }, { x: 0.368, y: 0.302 }, { x: 0.369, y: 0.434 }, { x: 0.421, y: 0.434 }, { x: 0.422, y: 0.41 }, { x: 0.576, y: 0.41 }, { x: 0.576, y: 0.478 }, { x: 0.735, y: 0.48 }, { x: 0.736, y: 0.715 }, { x: 0.578, y: 0.718 }, { x: 0.578, y: 0.847 }, { x: 0.837, y: 0.847 }, { x: 0.837, y: 0.397 }, { x: 0.78, y: 0.397 }, { x: 0.779, y: 0.427 }, { x: 0.763, y: 0.427 }, { x: 0.761, y: 0.374 }, { x: 0.687, y: 0.369 }, { x: 0.687, y: 0.23 }, { x: 0.643, y: 0.23 }, { x: 0.643, y: 0.371 }, { x: 0.624, y: 0.371 }, { x: 0.623, y: 0.315 }, { x: 0.422, y: 0.313 }, { x: 0.421, y: 0.22 }], [{ x: 0.46, y: 0.154 }, { x: 0.46, y: 0.263 }, { x: 0.596, y: 0.261 }, { x: 0.597, y: 0.154 }], [{ x: 0.723, y: 0.154 }, { x: 0.723, y: 0.262 }, { x: 0.778, y: 0.262 }, { x: 0.778, y: 0.155 }]];
      case 5:
        return [[{ x: 0.254, y: 0.156 }, { x: 0.253, y: 0.436 }, { x: 0.195, y: 0.439 }, { x: 0.195, y: 0.514 }, { x: 0.253, y: 0.515 }, { x: 0.255, y: 0.701 }, { x: 0.337, y: 0.704 }, { x: 0.339, y: 0.788 }, { x: 0.372, y: 0.787 }, { x: 0.372, y: 0.636 }, { x: 0.401, y: 0.636 }, { x: 0.401, y: 0.673 }, { x: 0.471, y: 0.672 }, { x: 0.471, y: 0.637 }, { x: 0.606, y: 0.637 }, { x: 0.606, y: 0.682 }, { x: 0.652, y: 0.682 }, { x: 0.652, y: 0.483 }, { x: 0.497, y: 0.483 }, { x: 0.496, y: 0.53 }, { x: 0.328, y: 0.53 }, { x: 0.328, y: 0.261 }, { x: 0.409, y: 0.261 }, { x: 0.41, y: 0.359 }, { x: 0.441, y: 0.359 }, { x: 0.441, y: 0.244 }, { x: 0.531, y: 0.244 }, { x: 0.532, y: 0.305 }, { x: 0.577, y: 0.305 }, { x: 0.577, y: 0.255 }, { x: 0.605, y: 0.253 }, { x: 0.605, y: 0.154 }], [{ x: 0.163, y: 0.58 }, { x: 0.163, y: 0.635 }, { x: 0.219, y: 0.635 }, { x: 0.219, y: 0.581 }], [{ x: 0.232, y: 0.761 }, { x: 0.232, y: 0.844 }, { x: 0.305, y: 0.846 }, { x: 0.305, y: 0.761 }], [{ x: 0.383, y: 0.413 }, { x: 0.383, y: 0.493 }, { x: 0.461, y: 0.493 }, { x: 0.461, y: 0.414 }], [{ x: 0.417, y: 0.744 }, { x: 0.417, y: 0.846 }, { x: 0.654, y: 0.846 }, { x: 0.654, y: 0.744 }, { x: 0.552, y: 0.743 }, { x: 0.55, y: 0.704 }, { x: 0.497, y: 0.704 }, { x: 0.495, y: 0.742 }, { x: 0.417, y: 0.745 }], [{ x: 0.482, y: 0.301 }, { x: 0.482, y: 0.431 }, { x: 0.561, y: 0.431 }, { x: 0.561, y: 0.368 }, { x: 0.511, y: 0.364 }, { x: 0.509, y: 0.302 }], [{ x: 0.658, y: 0.199 }, { x: 0.657, y: 0.366 }, { x: 0.578, y: 0.368 }, { x: 0.578, y: 0.432 }, { x: 0.75, y: 0.434 }, { x: 0.75, y: 0.495 }, { x: 0.694, y: 0.496 }, { x: 0.694, y: 0.845 }, { x: 0.742, y: 0.845 }, { x: 0.743, y: 0.646 }, { x: 0.763, y: 0.644 }, { x: 0.764, y: 0.555 }, { x: 0.805, y: 0.554 }, { x: 0.805, y: 0.435 }, { x: 0.788, y: 0.432 }, { x: 0.787, y: 0.368 }, { x: 0.707, y: 0.367 }, { x: 0.706, y: 0.199 }], [{ x: 0.754, y: 0.155 }, { x: 0.753, y: 0.22 }, { x: 0.775, y: 0.22 }, { x: 0.775, y: 0.155 }], [{ x: 0.818, y: 0.259 }, { x: 0.818, y: 0.327 }, { x: 0.838, y: 0.325 }, { x: 0.838, y: 0.258 }], [{ x: 0.808, y: 0.616 }, { x: 0.809, y: 0.707 }, { x: 0.838, y: 0.706 }, { x: 0.838, y: 0.616 }]];
      case 6:
        return [[{ x: 0.232, y: 0.155 }, { x: 0.232, y: 0.218 }, { x: 0.254, y: 0.218 }, { x: 0.254, y: 0.154 }], [{ x: 0.225, y: 0.281 }, { x: 0.224, y: 0.328 }, { x: 0.162, y: 0.331 }, { x: 0.162, y: 0.515 }, { x: 0.214, y: 0.515 }, { x: 0.214, y: 0.425 }, { x: 0.247, y: 0.422 }, { x: 0.247, y: 0.281 }], [{ x: 0.163, y: 0.572 }, { x: 0.163, y: 0.847 }, { x: 0.273, y: 0.847 }, { x: 0.273, y: 0.758 }, { x: 0.205, y: 0.757 }, { x: 0.205, y: 0.622 }, { x: 0.216, y: 0.621 }, { x: 0.216, y: 0.572 }], [{ x: 0.24, y: 0.648 }, { x: 0.24, y: 0.715 }, { x: 0.261, y: 0.715 }, { x: 0.261, y: 0.649 }], [{ x: 0.301, y: 0.154 }, { x: 0.3, y: 0.249 }, { x: 0.284, y: 0.251 }, { x: 0.284, y: 0.327 }, { x: 0.3, y: 0.331 }, { x: 0.3, y: 0.47 }, { x: 0.251, y: 0.472 }, { x: 0.251, y: 0.563 }, { x: 0.299, y: 0.563 }, { x: 0.3, y: 0.537 }, { x: 0.324, y: 0.539 }, { x: 0.324, y: 0.603 }, { x: 0.298, y: 0.605 }, { x: 0.298, y: 0.697 }, { x: 0.324, y: 0.7 }, { x: 0.325, y: 0.806 }, { x: 0.499, y: 0.806 }, { x: 0.499, y: 0.758 }, { x: 0.377, y: 0.755 }, { x: 0.377, y: 0.598 }, { x: 0.425, y: 0.596 }, { x: 0.425, y: 0.543 }, { x: 0.377, y: 0.541 }, { x: 0.375, y: 0.458 }, { x: 0.354, y: 0.455 }, { x: 0.354, y: 0.253 }, { x: 0.392, y: 0.25 }, { x: 0.392, y: 0.155 }], [{ x: 0.375, y: 0.339 }, { x: 0.375, y: 0.407 }, { x: 0.396, y: 0.407 }, { x: 0.396, y: 0.339 }], [{ x: 0.453, y: 0.154 }, { x: 0.453, y: 0.225 }, { x: 0.474, y: 0.223 }, { x: 0.474, y: 0.155 }], [{ x: 0.454, y: 0.282 }, { x: 0.452, y: 0.341 }, { x: 0.425, y: 0.344 }, { x: 0.425, y: 0.423 }, { x: 0.599, y: 0.426 }, { x: 0.599, y: 0.511 }, { x: 0.525, y: 0.514 }, { x: 0.524, y: 0.65 }, { x: 0.422, y: 0.653 }, { x: 0.422, y: 0.71 }, { x: 0.536, y: 0.713 }, { x: 0.537, y: 0.846 }, { x: 0.838, y: 0.846 }, { x: 0.838, y: 0.747 }, { x: 0.755, y: 0.746 }, { x: 0.754, y: 0.696 }, { x: 0.647, y: 0.695 }, { x: 0.646, y: 0.745 }, { x: 0.591, y: 0.745 }, { x: 0.59, y: 0.653 }, { x: 0.57, y: 0.65 }, { x: 0.57, y: 0.598 }, { x: 0.651, y: 0.596 }, { x: 0.653, y: 0.342 }, { x: 0.666, y: 0.34 }, { x: 0.665, y: 0.216 }, { x: 0.629, y: 0.216 }, { x: 0.628, y: 0.342 }, { x: 0.478, y: 0.342 }, { x: 0.477, y: 0.282 }], [{ x: 0.464, y: 0.477 }, { x: 0.464, y: 0.616 }, { x: 0.485, y: 0.615 }, { x: 0.485, y: 0.477 }], [{ x: 0.51, y: 0.164 }, { x: 0.51, y: 0.286 }, { x: 0.589, y: 0.286 }, { x: 0.589, y: 0.165 }], [{ x: 0.698, y: 0.155 }, { x: 0.697, y: 0.577 }, { x: 0.681, y: 0.58 }, { x: 0.681, y: 0.629 }, { x: 0.747, y: 0.627 }, { x: 0.749, y: 0.559 }, { x: 0.796, y: 0.556 }, { x: 0.797, y: 0.458 }, { x: 0.749, y: 0.456 }, { x: 0.749, y: 0.154 }], [{ x: 0.779, y: 0.319 }, { x: 0.779, y: 0.402 }, { x: 0.838, y: 0.401 }, { x: 0.838, y: 0.319 }], [{ x: 0.784, y: 0.615 }, { x: 0.784, y: 0.696 }, { x: 0.837, y: 0.695 }, { x: 0.837, y: 0.615 }]];
      default:
        return [];
    }
  }
}
exports.cbMapBoundaries = new CbMapBoundaries();

},{}],5:[function(require,module,exports){
"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const { cbGenericPorts } = require("../CircuitBreaker/CbGenericPorts");
const { cbHelper } = require("../CircuitBreaker/CbHelper");

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
      if (roundedX <= toNDp(center.x - distance2, 3)) return false;
      if (roundedX >= toNDp(center.x + distance2, 3)) return false;
      if (Math.abs(this.position.y - center.y) > 0.003) return false;
      return true;
    }
    const roundedY = toNDp(this.position.y, 3);
    if (roundedY <= toNDp(center.y - distance2, 3)) return false;
    if (roundedY >= toNDp(center.y + distance2, 3)) return false;
    if (Math.abs(this.position.x - center.x) > 0.003) return false;
    return true;
  }
  drawTailHistoryAndCheckCollisions(status) {
    if (this.history.length === 0) return false;
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
      if (i + 1 === historyClone.length) historyNextPoint = { x: this.position.x, y: this.position.y };else historyNextPoint = historyClone[i + 1];
      distance = cbHelper.getDistance(historyNextPoint, historyPoint);
      xDelta = historyNextPoint.x - historyPoint.x;
      yDelta = historyNextPoint.y - historyPoint.y;
      xDeltaOverYDelta = Math.abs(xDelta) > Math.abs(yDelta);
      centerPoint = this.getCenterPoint(historyNextPoint, xDeltaOverYDelta, xDelta, yDelta, distance);
      if (this.checkForCollision(xDeltaOverYDelta, centerPoint, distance)) return true;
      this.drawTail(status, centerPoint, xDeltaOverYDelta, distance);
    }
    return false;
  }
  drawTail(status, center, xDeltaOverYDelta, distance) {
    if (xDeltaOverYDelta) {
      this.drawTailSpriteWidth(status, center, distance);
    } else {
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
    if (mp.game1.controls.isDisabledControlPressed(0, 34)) return 'LEFT';
    if (mp.game1.controls.isDisabledControlPressed(0, 35)) return 'RIGHT';
    if (mp.game1.controls.isDisabledControlPressed(0, 32)) return 'UP';
    if (mp.game1.controls.isDisabledControlPressed(0, 33)) return 'DOWN';
    return this.lastDirection;
  }
  isOppositeOfCurrentDirection(direction) {
    return this.lastDirection === 'LEFT' && direction === 'RIGHT' || this.lastDirection === 'RIGHT' && direction === 'LEFT' || this.lastDirection === 'UP' && direction === 'DOWN' || this.lastDirection === 'DOWN' && direction === 'UP';
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
      if (!this.isAlive) return;
      this.isAlive = false;
      while (this.alpha > 0) {
        this.updateAlpha();
        yield mp.game1.waitAsync(0);
      }
    });
  }
  updateAlpha() {
    if (this.isAlive) return;
    let newAlpha = this.alpha - 5;
    if (newAlpha < 0) newAlpha = 0;
    if (newAlpha > 255) newAlpha = 255;
    this.alpha = newAlpha;
    if (this.alpha <= 0) this.isVisible = false;
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
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > 1) this.position.x = 1;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > 1) this.position.y = 1;
  }
}

exports.cbPoint = new CbPoint();

},{"../CircuitBreaker/CbGenericPorts":2,"../CircuitBreaker/CbHelper":3}],6:[function(require,module,exports){
'use strict';

const { cbHelper } = require("../CircuitBreaker/CbHelper");

class CbPortLights {
  constructor(position, heading, portType) {
    this.position = position;
    this.heading = heading;
    this.portType = portType;
    this.alpha = 255;
    this.lastBlink = 0;
    this.lightZeroPosition = this.getLightPosition(this.position, this.heading, 0);
    this.lightOnePosition = this.getLightPosition(this.position, this.heading, 1);
  }
  drawLights() {
    if (this.portType === 'START') {
      this.drawLightSprite(this.lightZeroPosition, cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b);
      this.drawLightSprite(this.lightOnePosition, cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b);
      return;
    }
    if (this.lastBlink + 500 >= Date.now()) {
      this.alpha = this.alpha === 255 ? 0 : 255;
      this.lastBlink = Date.now();
    }
    this.drawLightSprite(this.lightZeroPosition, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, this.alpha);
    this.drawLightSprite(this.lightOnePosition, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, this.alpha);
  }
  drawLightSprite(position, red, green, blue, alpha = 255) {
    mp.game1.graphics.drawSprite('MPCircuitHack', 'light', position.x, position.y, 0.00775, 0.00775, 0, red, green, blue, alpha);
  }
  getAngleOffset(heading, lightNum) {
    if (heading === 90 || heading === 270) {
      return lightNum > 0 ? 128.75 : 232;
    }
    return lightNum > 0 ? 73 : 287.25;
  }
  getLightPosition(portPos, portHeading, lightNum) {
    const magnitude = portHeading === 90 || portHeading === 270 ? 0.0164 : 0.0228;
    const angleOffset = this.getAngleOffset(portHeading, lightNum);
    const multiplier = portHeading === 90 || portHeading === 270 ? -1 : 1;
    return cbHelper.getOffsetPosition(portPos, magnitude, (angleOffset + portHeading) % 360, multiplier);
  }
}

exports.CbPortLights = CbPortLights;

},{"../CircuitBreaker/CbHelper":3}],7:[function(require,module,exports){
'use strict';

const { clientCircuitBreakerManager } = require('../CircuitBreaker/CircuitBreaker.manager');

mp.events.add({
  CircuitBreakerStart: clientCircuitBreakerManager.start.bind(clientCircuitBreakerManager),
  render: clientCircuitBreakerManager.handleRender.bind(clientCircuitBreakerManager)
});

},{"../CircuitBreaker/CircuitBreaker.manager":9}],8:[function(require,module,exports){
"use strict";

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const { cbGenericPorts } = require('../CircuitBreaker/CbGenericPorts');
const { cbHelper } = require('../CircuitBreaker/CbHelper');
const { cbMapBoundaries } = require('../CircuitBreaker/CbMapBoundaries');
const { cbPoint } = require('../CircuitBreaker/CbPoint');
const { Scaleform } = require('../CircuitBreaker/Scaleform');

class CircuitBreaker {
  constructor(lives, difficulty, levels, callbackEvent, onDestroy) {
    this.callbackEvent = callbackEvent;
    this.lives = lives;
    this.difficulty = difficulty;
    this.levels = levels;
    this.onDestroy = onDestroy;
    // NONE, ERROR, FAILURE_OUTOFBOUNDS, FAILURE_COLLISIONWITHPORT, FAILURE_TRAILCOLLISION, QUIT, STARTING, INPROGRESS, DEATH, DISCONNECTED, SUCCESS
    this.status = 'NONE';
    this.soundId = -1;
    this.blockedAreas = [];
    this.gameBounds = [{ x: 0.159, y: 0.153 }, { x: 0.159, y: 0.848 }, { x: 0.841, y: 0.848 }, { x: 0.841, y: 0.153 //  Top Right
    }];
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
    if (this.levels > 6) this.levels = 6;
    if (this.levels < 1) this.levels = 1;
    this.fillLevels(this.levels);
    this.level = this.getLevel();
    this.livesLeft = this.lives;
    // Ensure lives aren't out of bounds
    if (this.livesLeft > 10) this.livesLeft = 10;
    if (this.livesLeft < 1) this.livesLeft = 1;
    // Ensure difficulty isn't out of bounds
    if (this.difficulty > 4) this.difficulty = 4;
    if (this.difficulty < 0) this.difficulty = 0;
    this.currentPointSpeed = this.getPointSpeedFromDifficulty(this.difficulty);
    this.disconnectChance = this.getDisconnectChanceFromDifficulty(this.difficulty);
    this.disconnectCheckRateMs = this.getDisconnectCheckRateMsFromDifficulty(this.difficulty);
    this.init();
  }
  getLevel() {
    var _a;
    if (this.levelsToComplete.length === 0) return 1;
    return (_a = this.levelsToComplete.shift()) !== null && _a !== void 0 ? _a : 1;
  }
  fillLevels(count) {
    if (count < 1) return;
    this.levelsToComplete = new Array(count).fill(1).map(() => this.getRandomLevel());
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomLevel() {
    if (this.availableLevels.length === 0) return 1;
    const randomIndex = this.getRandom(0, this.availableLevels.length - 1);
    return this.availableLevels[randomIndex];
  }
  gameDraw() {
    if (this.scaleform === null) return false;
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
    if (Date.now() < this.startTime) return;
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
    if (now < this.endTime) return;
    if (this.checkLevelsToPlay()) {
      this.continueGame();
      return;
    }
    this.status = 'QUIT';
    mp.events.callRemote(this.callbackEvent, true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
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
        mp.events.callRemote(this.callbackEvent, false, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
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
      mp.game1.audio.playSoundFrontend(-1, 'Power_Down', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
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
    if (this.status === 'NONE') return;
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
    if (exit) mp.events.callRemote(this.callbackEvent, false, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
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
      if (this.status !== 'STARTING') return;
      yield this.loadResources();
      this.soundId = mp.game1.invokeFloat('0x430386FE9BF80B45'); // GET_SOUND_ID
      mp.game1.audio.playSoundFrontend(this.soundId, 'Background', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
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
        mp.game1.graphics.requestStreamedTextureDict(dict, false);
        while (!mp.game1.graphics.hasStreamedTextureDictLoaded(dict)) {
          yield new Promise(res => setTimeout(res, 5));
        }
      }
    });
  }
  resetTextureDictionaries() {
    for (const dict of this.textureDictionaries) {
      mp.game1.graphics.setStreamedTextureDictAsNoLongerNeeded(dict);
    }
  }
  resetSounds() {
    if (this.soundId === -1) return;
    mp.game1.audio.stopSound(this.soundId);
    mp.game1.audio.releaseSoundId(this.soundId);
    this.soundId = -1;
  }
  playStartSound() {
    mp.game1.audio.playSoundFrontend(-1, 'Start', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
  }
  resetDisplayScaleform() {
    if (this.scaleform === null) return;
    this.scaleform.callFunction('SET_DISPLAY', -1);
  }
  showDisplayScaleform(title, msg, r, g, b, stagePassed) {
    if (this.scaleform === null) return;
    this.scaleform.callFunction('SET_DISPLAY', 0, title, msg, r, g, b, stagePassed);
  }
  showSuccessScreenAndPlaySound() {
    mp.game1.audio.playSoundFrontend(-1, 'Success', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT COMPLETE', 'Decryption Execution x86 Tunneling', cbHelper.GREEN_COLOUR.r, cbHelper.GREEN_COLOUR.g, cbHelper.GREEN_COLOUR.b, true);
  }
  showFailureScreenAndPlaySound() {
    mp.game1.audio.playSoundFrontend(-1, 'Crash', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT FAILED', 'Security Tunnel Detected', cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, false);
  }
  showDeathScreenAndPlaySound() {
    mp.game1.audio.playSoundFrontend(-1, 'Crash', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true);
    this.showDisplayScaleform('CIRCUIT FAILED', `${this.livesLeft} Attempts Left`, cbHelper.RED_COLOUR.r, cbHelper.RED_COLOUR.g, cbHelper.RED_COLOUR.b, false);
  }
  resetScaleform() {
    if (this.scaleform === null) return;
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
        if (loadAttempt > 50) break;
      }
    });
  }
  drawMapSprite(currentMap) {
    mp.game1.graphics.drawSprite(currentMap > 3 ? 'MPCircuitHack3' : 'MPCircuitHack2', `cblevel${this.level}`, 0.5, 0.5, 1, 1, 0, 255, 255, 255, 255);
  }
  drawPointAndPortSprites() {
    cbPoint.drawPoint(this.status);
    const collisionHit = cbPoint.drawTailHistoryAndCheckCollisions(this.status);
    cbGenericPorts.drawPorts();
    return collisionHit;
  }
  getPointSpeedFromDifficulty(difficulty) {
    if (difficulty === 0) return 0.00085;
    if (difficulty === 1) return 0.001;
    if (difficulty === 2) return 0.002;
    if (difficulty === 3) return 0.003;
    if (difficulty === 4) return 0.01;
    return 0.00085;
  }
  getDisconnectChanceFromDifficulty(difficulty) {
    if (difficulty === 0) return 0;
    if (difficulty === 1) return 0.15;
    if (difficulty === 2) return 0.3;
    if (difficulty === 3) return 0.45;
    if (difficulty === 4) return 0.6;
    return 0;
  }
  getDisconnectCheckRateMsFromDifficulty(difficulty) {
    if (difficulty === 0) return 15000;
    if (difficulty === 1) return 10000;
    if (difficulty === 2) return 5000;
    if (difficulty === 3) return 4000;
    if (difficulty === 4) return 2000;
    return 10000;
  }
  exitButtonPressed() {
    return mp.game1.controls.isDisabledControlJustPressed(0, 44);
  }
  disableControls() {
    mp.game1.controls.disableControlAction(0, 32, true); // W, Up
    mp.game1.controls.disableControlAction(0, 33, true); // S, Down
    mp.game1.controls.disableControlAction(0, 34, true); // A, Left
    mp.game1.controls.disableControlAction(0, 35, true); // D, Right
    mp.game1.controls.disableControlAction(0, 44, true); // Q, Cover
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
    const headPts = [{ x: pointCoord.x - headWidth / 2, y: pointCoord.y }, { x: pointCoord.x + headWidth / 2, y: pointCoord.y }, { x: pointCoord.x, y: pointCoord.y - headHeight / 2 }, { x: pointCoord.x, y: pointCoord.y + headHeight / 2 }];
    return [...headPts, pointCoord];
  }
  destroy() {
    this.resetScaleform();
    this.resetSounds();
    this.resetTextureDictionaries();
    this.onDestroy();
  }
}

exports.CircuitBreaker = CircuitBreaker;

},{"../CircuitBreaker/CbGenericPorts":2,"../CircuitBreaker/CbHelper":3,"../CircuitBreaker/CbMapBoundaries":4,"../CircuitBreaker/CbPoint":5,"../CircuitBreaker/Scaleform":10,"../player/player":208}],9:[function(require,module,exports){
"use strict";

const { CircuitBreaker } = require("../CircuitBreaker/CircuitBreaker");

class CircuitBreakerManager {
  constructor() {
    this.game = null;
  }
  start(lives, difficulty, levels, callbackEvent) {
    if (this.game !== null) return; // Cannot start twice
    this.game = new CircuitBreaker(lives, difficulty, levels, callbackEvent, () => {
      this.game = null;
    });
  }
  handleRender() {
    if (this.game === null) return;
    this.game.tick();
  }
}
exports.clientCircuitBreakerManager = new CircuitBreakerManager();

},{"../CircuitBreaker/CircuitBreaker":8}],10:[function(require,module,exports){
'use strict';

class Scaleform {
  constructor(scaleformStr) {
    this.handle = mp.game1.graphics.requestScaleformMovie(scaleformStr);
    this.queueCallFunction = new Map();
  }
  isLoaded() {
    return !!mp.game1.graphics.hasScaleformMovieLoaded(this.handle);
  }
  isValid() {
    return this.handle !== 0;
  }
  callFunction(strFunction, ...args) {
    if (this.isLoaded() && this.isValid()) {
      const graphics = mp.game.graphics;
      graphics.pushScaleformMovieFunction(this.handle, strFunction);
      args.forEach(arg => {
        switch (typeof arg) {
          case 'string':
            {
              graphics.pushScaleformMovieFunctionParameterString(arg);
              break;
            }
          case 'boolean':
            {
              graphics.pushScaleformMovieFunctionParameterBool(arg);
              break;
            }
          case 'number':
            {
              if (Number(arg) === arg && arg % 1 !== 0) {
                graphics.pushScaleformMovieFunctionParameterFloat(arg);
              } else {
                graphics.pushScaleformMovieFunctionParameterInt(arg);
              }
            }
        }
      });
      graphics.popScaleformMovieFunctionVoid();
    } else {
      this.queueCallFunction.set(strFunction, args);
    }
  }
  onUpdate() {
    if (this.isLoaded() && this.isValid()) {
      this.queueCallFunction.forEach((args, strFunction) => {
        this.callFunction(strFunction, ...args);
        this.queueCallFunction.delete(strFunction);
      });
    }
  }
  render2D(x, y, width, height) {
    this.onUpdate();
    if (this.isLoaded() && this.isValid()) {
      const graphics = mp.game.graphics;
      if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
        graphics.drawScaleformMovie(this.handle, x, y, width, height, 255, 255, 255, 255, 0);
      } else {
        graphics.drawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, false);
      }
    }
  }
  render3D(position, rotation, scale) {
    this.onUpdate();
    if (this.isLoaded() && this.isValid()) {
      mp.game.graphics.drawScaleformMovie3dNonAdditive(this.handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2);
    }
  }
  render3DAdditive(position, rotation, scale) {
    this.onUpdate();
    if (this.isLoaded() && this.isValid()) {
      mp.game.graphics.drawScaleformMovie3d(this.handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2);
    }
  }
  dispose() {
    mp.game1.graphics.setScaleformMovieAsNoLongerNeeded(this.handle);
    this.handle = 0;
  }
}
exports.Scaleform = Scaleform;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apps = require("./apps");

var _apps2 = _interopRequireDefault(_apps);

var _component = require("../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _component2.default {
    constructor(name, ...events) {
        super(name, ...events);
        _apps2.default.apps.set(name, this);
    }
}

exports.default = App;

},{"../components/component":106,"./apps":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let showCursor = () => mp.game.invoke("0xAAE7CE1D63167423")

class Apps {
    constructor() {
        this.apps = new Map();
        this.componentVisibleApp = new Map();
        this.SmartphoneApp = "";

        mp.events.add("openApp", (component, name, args) => {
            if (!this.apps.has(name)) return;
            let app = this.apps.get(name);
            app.args = args;
            this.show(component, name, args);
        });

        mp.events.add("openComputer", () => {
            this.show("Computer", "ComputerMainScreen");
        });

        mp.events.add("closeComputer", () => {
            this.show("Computer", null);
        });

        mp.events.add("openIpad", () => {
            this.show("Ipad", "IpadMainScreen");
        });

        mp.events.add("closeIpad", () => {
            this.show("Ipad", null);
        });

        mp.events.add("hatNudeln", state => {
            if (state) {
                this.show("Smartphone", "PhoneMainScreen");
            } else {
                this.show("Smartphone", null);
            }
        });
    }

    show(component = "Smartphone", name, args) {
        if (name == null) {
            this.componentVisibleApp[component] = name;
            if (component == "Smartphone") {
                _browser2.default.execute(component, `invisible()`);

                // Make sure messenger app context menu is closed!
                _browser2.default.execute('MessengerOverviewApp', `hideActionSheet()`);
            } else {
                _browser2.default.execute(component, `show(null)`);
            }
            // mp.events.remove("render", showCursor)
            mp.gui.cursor.visible = false;
        } else if (name == "CallManageApp") {
            this.SmartphoneApp = "PhoneScreen";
            mp.gui.cursor.visible = false;
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                _browser2.default.execute(component, `show("${name}", '${args}')`);
            } else {
                _browser2.default.execute(component, `show("${name}")`);
            }

            // Make sure messenger app context menu is closed!
            _browser2.default.execute('MessengerOverviewApp', `hideActionSheet()`);
        } else {
            this.componentVisibleApp[component] = name;
            if (component == "Smartphone") {
                if (this.SmartphoneApp == "") {
                    this.SmartphoneApp = "MainScreen";
                    mp.gui.cursor.visible = true;
                } else if (this.SmartphoneApp == "MainScreen") {
                    mp.gui.cursor.visible = true;
                } else if (this.SmartphoneApp == "PhoneScreen") {
                    mp.gui.cursor.visible = false;
                }
            } else {
                mp.gui.cursor.visible = true;
            }
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                _browser2.default.execute(component, `show("${name}", '${args}')`);
            } else {
                _browser2.default.execute(component, `show("${name}")`);
            }
        }
    }
}

exports.default = new Apps();

},{"../browser/browser":104}],13:[function(require,module,exports){
"use strict";

require("./gps/gpsApp");

require("./contacts/contactsList");

require("./contacts/contactsEdit");

require("./contacts/contactsAdd");

require("./contacts/contactsOverview");

require("./banking/bankingAppOverview");

require("./banking/bankingAppTransfer");

require("./news/newsApp");

require("./news/newsListApp");

require("./news/newsAddApp");

require("./taxi/taxiApp");

require("./taxi/TaxiListApp");

require("./taxi/TaxiServiceListApp");

require("./taxi/TaxiContact");

require("./team/team-edit");

require("./team/team-list");

require("./business/businessApp");

require("./business/businessEdit");

require("./business/businessList");

require("./business/businessInvite");

require("./callManage");

require("./telefon/telefon");

require("./telefon/telefonInput");

require("./telefon/telefonSettings");

require("./telefon/telefonCalls");

require("./home");

require("./police/PoliceAktenSearchApp");

require("./police/PoliceEditPersonApp");

require("./police/PoliceEditWantedsApp");

require("./police/PoliceListAktenApp");

require("./police/PoliceListProgressApp");

require("./servicelist/ServiceAcceptedApp");

require("./servicelist/serviceListApp");

require("./servicelist/serviceOwnApp");

require("./servicelist/serviceEvaluationApp");

require("./messenger/messengerApp");

require("./messenger/messengerListApp");

require("./messenger/messengerMessageApp");

require("./messenger/messengerOverviewApp");

require("./settings/settingsApp");

require("./settings/settingsEditWallpaperApp");

require("./settings/settingsEditRingtonesApp");

require("./settings/settingsEditBlipsApp");

require("./hitman/hitmanApp");

require("./hitman/hitmanContractsApp");

require("./hitman/hitmanContractListApp");

require("./hitman/hitmanLocateApp");

require("./hitman/hitmanLocatePersonApp");

require("./darknet/DarknetApp");

require("./darknet/DarknetAgencySupportApp");

require("./darknet/DarknetBountyApp");

require("./darknet/DarknetClearWantedsApp");

require("./profile");

require("./lifeinvader");

require("./desktop");

require("./funk");

require("./ipadDesktop");

require("./ipadMainScreen");

require("./laptopDesktop");

require("./laptopMainScreen");

require("./marketplace/marketplaceApp");

require("./service/serviceRequestApp");

require("./service/serviceSendRequestApp");

require("./vehicleoverview/vehicleOverviewApp");

require("./plate/plateOverviewApp");

require("./claw/clawOverviewApp");

require("./vehicletax/vehicleTaxApp");

require("./vehicleimpound/vehicleImpoundApp");

require("./support/ticket/ServiceOverviewApp");

require("./support/ticket/SupportAcceptedTickets");

require("./support/ticket/SupportOpenTickets");

require("./support/ticket/SupportTicketOverview");

require("./support/ticket/SupportKonversation");

require("./support/vehicles/SupportVehicleApp");

require("./support/vehicles/SupportVehicleList");

require("./support/vehicles/SupportVehicleProfile");

require("./kfzrent/KFZRentApp");

require("./fraktion/FraktionListApp");

require("./fraktion/FraktionEditApp");

require("./fraktion/FraktionRightsOverviewApp");

require("./house/HouseList");

require("./house/HouseEdit");

require("./house/HouseVehicleList");

require("./email/EmailApp");

require("./export/ExportApp");

require("./streifen/StreifenApp");

require("./businessdetail/BusinessDetail");

require("./service/LawyerOverview");

},{"./banking/bankingAppOverview":14,"./banking/bankingAppTransfer":15,"./business/businessApp":16,"./business/businessEdit":17,"./business/businessInvite":18,"./business/businessList":19,"./businessdetail/BusinessDetail":20,"./callManage":21,"./claw/clawOverviewApp":22,"./contacts/contactsAdd":23,"./contacts/contactsEdit":24,"./contacts/contactsList":25,"./contacts/contactsOverview":26,"./darknet/DarknetAgencySupportApp":27,"./darknet/DarknetApp":28,"./darknet/DarknetBountyApp":29,"./darknet/DarknetClearWantedsApp":30,"./desktop":31,"./email/EmailApp":32,"./export/ExportApp":33,"./fraktion/FraktionEditApp":34,"./fraktion/FraktionListApp":35,"./fraktion/FraktionRightsOverviewApp":36,"./funk":37,"./gps/gpsApp":38,"./hitman/hitmanApp":39,"./hitman/hitmanContractListApp":40,"./hitman/hitmanContractsApp":41,"./hitman/hitmanLocateApp":42,"./hitman/hitmanLocatePersonApp":43,"./home":44,"./house/HouseEdit":45,"./house/HouseList":46,"./house/HouseVehicleList":47,"./ipadDesktop":48,"./ipadMainScreen":49,"./kfzrent/KFZRentApp":50,"./laptopDesktop":51,"./laptopMainScreen":52,"./lifeinvader":53,"./marketplace/marketplaceApp":54,"./messenger/messengerApp":55,"./messenger/messengerListApp":56,"./messenger/messengerMessageApp":57,"./messenger/messengerOverviewApp":58,"./news/newsAddApp":59,"./news/newsApp":60,"./news/newsListApp":61,"./plate/plateOverviewApp":63,"./police/PoliceAktenSearchApp":64,"./police/PoliceEditPersonApp":65,"./police/PoliceEditWantedsApp":66,"./police/PoliceListAktenApp":67,"./police/PoliceListProgressApp":68,"./profile":69,"./service/LawyerOverview":70,"./service/serviceRequestApp":71,"./service/serviceSendRequestApp":72,"./servicelist/ServiceAcceptedApp":73,"./servicelist/serviceEvaluationApp":74,"./servicelist/serviceListApp":75,"./servicelist/serviceOwnApp":76,"./settings/settingsApp":77,"./settings/settingsEditBlipsApp":78,"./settings/settingsEditRingtonesApp":79,"./settings/settingsEditWallpaperApp":80,"./streifen/StreifenApp":81,"./support/ticket/ServiceOverviewApp":82,"./support/ticket/SupportAcceptedTickets":83,"./support/ticket/SupportKonversation":84,"./support/ticket/SupportOpenTickets":85,"./support/ticket/SupportTicketOverview":86,"./support/vehicles/SupportVehicleApp":87,"./support/vehicles/SupportVehicleList":88,"./support/vehicles/SupportVehicleProfile":89,"./taxi/TaxiContact":90,"./taxi/TaxiListApp":91,"./taxi/TaxiServiceListApp":92,"./taxi/taxiApp":93,"./team/team-edit":94,"./team/team-list":95,"./telefon/telefon":96,"./telefon/telefonCalls":97,"./telefon/telefonInput":98,"./telefon/telefonSettings":99,"./vehicleimpound/vehicleImpoundApp":100,"./vehicleoverview/vehicleOverviewApp":101,"./vehicletax/vehicleTaxApp":102}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankingAppOverview extends _app2.default {
    constructor() {
        super("BankingAppOverview");

        this.forwardableEvents.add("responseBankingAppOverview");
    }
}

exports.default = new BankingAppOverview();

},{"../../app/app":11}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankingAppTransfer extends _app2.default {
    constructor() {
        super("BankingAppTransfer");

        this.forwardableEvents.add("responseBankingCap");
    }
}

exports.default = new BankingAppTransfer();

},{"../../app/app":11}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessApp extends _app2.default {
    constructor() {
        super("BusinessApp");

        this.forwardableEvents.add("responseBusinessMembers");
        this.forwardableEvents.add("responseBusinessMOTD");
    }
}

exports.default = new BusinessApp();

},{"../../app/app":11}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessEdit extends _app2.default {
    constructor() {
        super("BusinessEditApp");
    }
}

exports.default = new BusinessEdit();

},{"../../app/app":11}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessInviteApp extends _app2.default {
    constructor() {
        super("BusinessInviteApp");
    }
}

exports.default = new BusinessInviteApp();

},{"../../app/app":11}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessList extends _app2.default {
    constructor() {
        super("BusinessListApp");
    }
}

exports.default = new BusinessList();

},{"../../app/app":11}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessDetail extends _app2.default {
    constructor() {
        super("BusinessDetailApp");
        this.forwardableEvents.add("responseBusinessDetailLinks");
        this.forwardableEvents.add("responseBusinessDetail");
    }

    onEvent(name, ...args) {
        if (name == "businessNotify") {
            mp.game.graphics.notify("Bitte warten Sie kurz.");
        }
    }
}

exports.default = new BusinessDetail();

},{"../../app/app":11}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

var _home = require("./home");

var _home2 = _interopRequireDefault(_home);

var _telefon = require("./telefon/telefon");

var _telefon2 = _interopRequireDefault(_telefon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CallManageApp extends _app2.default {
    constructor() {
        super("CallManageApp");
        this.forwardableEvents.add("acceptCall");

        mp.events.add("cancelCall", () => {
            this.callOnBrowser(`cancelCall("[]")`);
            _home2.default.declineCall();
            _browser2.default.execute("Smartphone", `change()`);
            _apps2.default.SmartphoneApp = "MainScreen";
        });
    }

    declineCall() {
        this.callOnBrowser(`declineCallSmartphone()`);
    }

    micmute() {
        this.callOnBrowser(`changeMicMute()`);
    }

    acceptedCall() {
        this.callOnBrowser(`acceptCallSmartphone()`);
    }

    setPhoneCallData(data) {
        this.callOnBrowser(`setCallData('${data}', '${_player2.default.activeRingtone}', '${_player2.default.phonelautlos}')`);
        if (_windows2.default.visibleWindow != null) mp.gui.cursor.visible = true;
    }

    onEvent(name, ...args) {
        if (name == "addCallToHistory") {
            _player2.default.historys.addCallToHistory(args[0].contact, args[0].number, args[0].time, args[0].accepted, args[0].method);
            _telefon2.default.declineCall();
        }
    }
}

exports.default = new CallManageApp();

},{"../app/app":11,"../app/apps":12,"../browser/browser":104,"../player/player":208,"../windows/windows":235,"./home":44,"./telefon/telefon":96}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleClawUebersichtApp extends _app2.default {
    constructor() {
        super("VehicleClawUebersichtApp");
        this.forwardableEvents.add("responseVehicleClawOverview");
    }
}

exports.default = new VehicleClawUebersichtApp();

},{"../../app/app":11}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsAdd extends _app2.default {
    constructor() {
        super("ContactsAdd");
    }

    onEvent(name, ...args) {
        if (name == "addContact") {
            _player2.default.contacts.addContact(args[0].number, args[0].name);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsAdd();

},{"../../app/app":11,"../../player/player":208,"./contactsList":25}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsEdit extends _app2.default {
    constructor() {
        super("ContactsEdit");
    }

    onEvent(name, ...args) {
        if (name == "updateContact" && args[0]) {
            _player2.default.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName);
            _contactsList2.default.updateList();
        } else if (name == "removeContact" && args[0]) {
            _player2.default.contacts.removeContact(args[0].number);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsEdit();

},{"../../app/app":11,"../../player/player":208,"./contactsList":25}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsApp extends _app2.default {
    constructor() {
        super("ContactsApp");
    }

    onReady() {
        if (_player2.default.contacts.contacts == null) {
            _player2.default.contacts.request(() => {
                this.updateList();
            });
        } else {
            this.updateList();
        }
    }

    updateList() {
        this.callOnBrowser(`setContactListData('${_player2.default.contacts.toJson()}')`);
    }
}

exports.default = new ContactsApp();

},{"../../app/app":11,"../../player/player":208}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsOverview extends _app2.default {
    constructor() {
        super("ContactsOverview");
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        } else if (name == "updateContact" && args[0]) {
            _player2.default.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName);
            _contactsList2.default.updateList();
        } else if (name == "removeContact" && args[0]) {
            _player2.default.contacts.removeContact(args[0].number);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsOverview();

},{"../../app/app":11,"../../player/player":208,"./contactsList":25}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetAgencySupportApp extends _app2.default {
    constructor() {
        super("DarknetAgencySupportApp");
    }
}
exports.default = new DarknetAgencySupportApp();

},{"../../app/app":11}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetApp extends _app2.default {
    constructor() {
        super("DarknetApp");
    }
}

exports.default = new DarknetApp();

},{"../../app/app":11}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetBountyApp extends _app2.default {
    constructor() {
        super("DarknetBountyApp");
    }
}
exports.default = new DarknetBountyApp();

},{"../../app/app":11}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetClearWantedsApp extends _app2.default {
    constructor() {
        super("DarknetClearWantedsApp");
    }
}
exports.default = new DarknetClearWantedsApp();

},{"../../app/app":11}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DesktopApp extends _app2.default {
    constructor() {
        super("DesktopApp");
        this.forwardableEvents.add("responseComputerApps");
    }
}

exports.default = new DesktopApp();

},{"../app/app":11}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EmailApp extends _app2.default {
    constructor() {
        super("EmailApp");
        this.forwardableEvents.add("responseEmails");
    }
}

exports.default = new EmailApp();

},{"../../app/app":11}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExportApp extends _app2.default {
    constructor() {
        super("ExportApp");
        this.forwardableEvents.add("responseExports");
    }
}

exports.default = new ExportApp();

},{"../../app/app":11}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionEditApp extends _app2.default {
    constructor() {
        super("FraktionEditApp");
    }
}

exports.default = new FraktionEditApp();

},{"../../app/app":11}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionListApp extends _app2.default {
    constructor() {
        super("FraktionListApp");
        this.forwardableEvents.add("responseMembers");
    }
}

exports.default = new FraktionListApp();

},{"../../app/app":11}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionRightsOverviewApp extends _app2.default {
    constructor() {
        super("FraktionRightsOverviewApp");
    }
}

exports.default = new FraktionRightsOverviewApp();

},{"../../app/app":11}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('../app/app');

var _app2 = _interopRequireDefault(_app);

var _playerPanel = require('../interfaces/hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FunkApp extends _app2.default {
    constructor() {
        super('FunkApp');

        this.forwardableEvents.add('responseVoiceSettings');

        mp.events.add('setVoiceRadioActive', voiceRadio => {
            _playerPanel2.default.setVoiceRadioActive(voiceRadio);
        });

        mp.events.add('voiceRadioActive', voiceRadioActive => {
            _playerPanel2.default.setVoiceRadioActiveType(voiceRadioActive);
        });
    }

    onEvent(name, ...args) {
        if (name === 'setVoiceRadioActive') {
            _playerPanel2.default.setVoiceRadioActive(args[0]);
        } else if (name === 'setVoiceRadioActiveType') {
            _playerPanel2.default.setVoiceRadioActiveType(args[0]);
        }
    }
}

exports.default = new FunkApp();

},{"../app/app":11,"../interfaces/hud/player-panel":155}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GpsApp extends _app2.default {
    constructor() {
        super("GpsApp");
        this.forwardableEvents.add("gpsLocationsResponse");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new GpsApp();

},{"../../app/app":11}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanApp extends _app2.default {
    constructor() {
        super("HitmanApp");
    }
}

exports.default = new HitmanApp();

},{"../../app/app":11}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanContractListApp extends _app2.default {
    constructor() {
        super("HitmanContractListApp");
        this.forwardableEvents.add("responseHitmanContracts");
    }
}

exports.default = new HitmanContractListApp();

},{"../../app/app":11}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanContractsApp extends _app2.default {
    constructor() {
        super("HitmanContractsApp");
    }
}

exports.default = new HitmanContractsApp();

},{"../../app/app":11}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanLocateApp extends _app2.default {
    constructor() {
        super("HitmanLocateApp");
        this.forwardableEvents.add("responseHitmanLocatedPpl");
    }
}

exports.default = new HitmanLocateApp();

},{"../../app/app":11}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanLocatePersonApp extends _app2.default {
    constructor() {
        super("HitmanLocatePersonApp");
    }
    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new HitmanLocatePersonApp();

},{"../../app/app":11}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _smartphone = require("../interfaces/hud/smartphone");

var _smartphone2 = _interopRequireDefault(_smartphone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomeApp extends _app2.default {
    constructor() {
        super("HomeApp");
        this.forwardableEvents.add("responseApps");
        this.forwardableEvents.add("responsePhoneWallpaper");
    }

    declineCall() {
        this.callOnBrowser(`declineCall()`);
    }

    mutemode() {
        this.callOnBrowser(`changemute()`);
    }

    flymode() {
        this.callOnBrowser(`changefly()`);
    }

    anrufablehnen() {
        this.callOnBrowser(`changeanrufablehnen()`);
    }

    getHomeScreenCall() {
        this.callOnBrowser(`getHomeScreenCall()`);
    }

    onEvent(name, ...args) {
        if (name == "showCallScreen") {
            _smartphone2.default.showCallScreen();
        }
    }
}

exports.default = new HomeApp();

},{"../app/app":11,"../interfaces/hud/smartphone":162}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseEdit extends _app2.default {
    constructor() {
        super("HouseEdit");
        this.forwardableEvents.add("responseHouseData");
    }
}

exports.default = new HouseEdit();

},{"../../app/app":11}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseList extends _app2.default {
    constructor() {
        super("HouseList");
        this.forwardableEvents.add("responseTenants");
    }
}

exports.default = new HouseList();

},{"../../app/app":11}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseVehicleList extends _app2.default {
    constructor() {
        super("HouseVehicleList");
        this.forwardableEvents.add("responseHouseVehicles");
    }
}

exports.default = new HouseVehicleList();

},{"../../app/app":11}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ipadDesktop extends _app2.default {
    constructor() {
        super("IpadDesktopApp");
        this.forwardableEvents.add("responseIpadApps");
    }
}

exports.default = new ipadDesktop();

},{"../app/app":11}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IpadMainScreen extends _app2.default {
    constructor() {
        super("IpadMainScreen");
    }
}

exports.default = new IpadMainScreen();

},{"../app/app":11}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KFZRentApp extends _app2.default {
    constructor() {
        super("KFZRentApp");
        this.forwardableEvents.add("responsekfzrent");
    }
}

exports.default = new KFZRentApp();

},{"../../app/app":11}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class laptopDesktop extends _app2.default {
    constructor() {
        super("LaptopDesktopApp");
        this.forwardableEvents.add("responseLaptopApps");
    }
}

exports.default = new laptopDesktop();

},{"../app/app":11}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LaptopMainScreen extends _app2.default {
    constructor() {
        super("LaptopMainScreen");
    }
}

exports.default = new LaptopMainScreen();

},{"../app/app":11}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LifeInvaderApp extends _app2.default {
    constructor() {
        super("LifeInvaderApp");
        this.forwardableEvents.add("updateLifeInvaderAds");
    }
}

exports.default = new LifeInvaderApp();

},{"../app/app":11}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _browser = require("../../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MarketplaceApp extends _app2.default {
    constructor() {
        super("MarketplaceApp");
        this.forwardableEvents.add("responseMarketPlaceCategories");
        this.forwardableEvents.add("responseMyOffers");
        this.forwardableEvents.add("responseMarketPlaceOffers");
    }
}
exports.default = new MarketplaceApp();

},{"../../app/app":11,"../../browser/browser":104}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerApp extends _app2.default {
    constructor() {
        super("MessengerApp");
    }
}

exports.default = new MessengerApp();

},{"../../app/app":11}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _phone = require("../phone");

var _phone2 = _interopRequireDefault(_phone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerListApp extends _app2.default {
    constructor() {
        super("MessengerListApp");
        this.forwardableEvents.add("responseKonversations");
    }

    onEvent(name, ...args) {
        if (name == "getHomeScreen") {
            _phone2.default.getHomeScreen();
        }
    }
}
exports.default = new MessengerListApp();

},{"../../app/app":11,"../phone":62}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerApp extends _app2.default {
    constructor() {
        super("MessengerMessageApp");
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        }
    }
}

exports.default = new MessengerApp();

},{"../../app/app":11}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('../../app/app');

var _app2 = _interopRequireDefault(_app);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerOverviewApp extends _app2.default {
    constructor() {
        super('MessengerOverviewApp');

        this.forwardableEvents.add('updateChat');
    }

    onReady() {
        this.callOnBrowser(`setOwnNumber('${_player2.default.phone}')`);
    }

    onEvent(name, ...args) {
        if (name === 'setGpsCoordinates') {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        } else if (name === 'getLocation') {
            const playerPos = mp.players.local.position;

            let x = Math.round(playerPos.x),
                y = Math.round(playerPos.y);

            this.callOnBrowser(`setGpsData('${x}','${y}')`);
        }
    }
}

exports.default = new MessengerOverviewApp();

},{"../../app/app":11,"../../player/player":208}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsAddApp extends _app2.default {
    constructor() {
        super("NewsAddApp");
    }

    onReady() {
        this.callOnBrowser(`onReady('${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.phone}', '${_player2.default.teamRank}')`);
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        }
    }
}

exports.default = new NewsAddApp();

},{"../../app/app":11,"../../player/player":208}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsApp extends _app2.default {
    constructor() {
        super("NewsApp");
    }

    onReady() {
        this.setPlayerTeam();
    }

    setPlayerTeam() {
        this.callOnBrowser(`playerTeam=${_player2.default.team}`);
    }
}

exports.default = new NewsApp();

},{"../../app/app":11,"../../player/player":208}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsListApp extends _app2.default {
    constructor() {
        super("NewsListApp");
        this.forwardableEvents.add("updateNews");
    }
    onReady() {
        this.callOnBrowser(`onReady('${_player2.default.team}','${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.teamRank}')`);
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new NewsListApp();

},{"../../app/app":11,"../../player/player":208}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PhoneMainScreen extends _app2.default {
    constructor() {
        super("PhoneMainScreen");
    }

    getHomeScreen() {
        this.callOnBrowser(`getHomeScreen()`);
    }

    getHomeScreenCall() {
        this.callOnBrowser(`getHomeScreenCall()`);
    }
}

exports.default = new PhoneMainScreen();

},{"../app/app":11}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlateOverviewApp extends _app2.default {
    constructor() {
        super("KennzeichenUebersichtApp");
        this.forwardableEvents.add("responsePlateOverview");
    }
}

exports.default = new PlateOverviewApp();

},{"../../app/app":11}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceAktenSearchApp extends _app2.default {
    constructor() {
        super("PoliceAktenSearchApp");
        this.forwardableEvents.add("responsePlayerResults");
    }
}

exports.default = new PoliceAktenSearchApp();

},{"../../app/app":11}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceEditPersonApp extends _app2.default {
    constructor() {
        super("PoliceEditPersonApp");
        this.forwardableEvents.add("responsePersonData");
        this.forwardableEvents.add("responseOpenCrimes");
        this.forwardableEvents.add("responseJailTime");
        this.forwardableEvents.add("responseJailCosts");
        this.forwardableEvents.add("responseAkte");
        this.forwardableEvents.add("responseAktenList");
        this.forwardableEvents.add("responseLicenses");
    }
}

exports.default = new PoliceEditPersonApp();

},{"../../app/app":11}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceEditWantedsApp extends _app2.default {
    constructor() {
        super("PoliceEditWantedsApp");
        this.forwardableEvents.add("responseCategories");
        this.forwardableEvents.add("responseOpenCrimes");
        this.forwardableEvents.add("responseCategoryReasons");
    }
}

exports.default = new PoliceEditWantedsApp();

},{"../../app/app":11}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceListAktenApp extends _app2.default {
    constructor() {
        super("PoliceListAktenApp");
        this.forwardableEvents.add("responseAktenList");
    }
}

exports.default = new PoliceListAktenApp();

},{"../../app/app":11}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceListProgressApp extends _app2.default {
    constructor() {
        super("PoliceListProgressApp");
        this.forwardableEvents.add("responseCrimeProgress");
    }
}

exports.default = new PoliceListProgressApp();

},{"../../app/app":11}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileApp extends _app2.default {
    constructor() {
        super("ProfileApp");
        this.forwardableEvents.add("responseSpecialProfilData");
    }

    onReady() {
        this.updateProfile();
    }

    updateProfile() {
        this.callOnBrowser(`setProfileData('${JSON.stringify({ Vorname: _player2.default.firstName, Nachname: _player2.default.lastName, Level: _player2.default.level, ID: _player2.default.playerId, Business: _player2.default.business, GwdNote: this.getGwd(), ZivildienstNote: this.getZWD(), Haus: this.getHouse(), Team: this.getTeam(), Handy: _player2.default.phone, Beruf: this.getJob(), Skill: _player2.default.jobsSkill, Krankenversicherung: _player2.default.insurance })}')`);
    }

    getHouse() {
        let house = _player2.default.house;

        if (house == 0) {
            return "Kein Haus";
        } else {
            return house;
        }
    }

    getGwd() {
        let gwd = _player2.default.gwdNote;

        if (gwd == 0) {
            return "Nicht vorhanden";
        } else {
            return gwd;
        }
    }

    getZWD() {
        let zwd = _player2.default.zwdNote;

        if (zwd == 0) {
            return "Nicht vorhanden";
        } else {
            return zwd;
        }
    }

    getJob() {
        let job = _player2.default.job;

        switch (job) {
            case 1:
                return "Waffendealer";
                break;
            case 2:
                return "Fälscher";
                break;
            case 3:
                return "Kredithai";
                break;
            case 4:
                return "Pilot";
                break;
            case 5:
                return "Farmer";
                break;
            case 6:
                return "Fischer";
                break;
            case 7:
                return "Lifeguard";
                break;
            case 8:
                return "Mechaniker";
                break;
            case 9:
                return "Busfahrer";
                break;
            case 10:
                return "Stripper";
                break;
            case 11:
                return "Makler";
                break;
            case 12:
                return "Trucker";
                break;
            case 13:
                return "Gärtner";
                break;
            case 14:
                return "Anwalt";
                break;
        }
    }

    getTeam() {
        let team = _player2.default.team;

        switch (team) {
            case 0:
                return "Zivilisten";
                break;
            case 1:
                return "Los Santos Police Department";
                break;
            case 2:
                return "Front Yard Ballas";
                break;
            case 3:
                return "Department of Motor Vehicles";
                break;
            case 4:
                return "Weazel News";
                break;
            case 5:
                return "Federal Investigation Bureau";
                break;
            case 6:
                return "The Lost";
                break;
            case 7:
                return "Los Santos Medic Center";
                break;
            case 8:
                return "Irish Mob";
                break;
            case 9:
                return "La Cosa Nostra";
                break;
            case 10:
                return "Yakuza";
                break;
            case 11:
                return "High Rollin Hustlers";
                break;
            case 12:
                return "Grove Familie";
                break;
            case 13:
                return "U.S. Army";
                break;
            case 14:
                return "Regierung";
                break;
            case 15:
                return "Angels of Death MC";
                break;
            case 16:
                return "Department of Public Order and Safety";
                break;
            case 17:
                return "Triaden";
                break;
            case 18:
                return "Los Santos Vagos";
                break;
            case 19:
                return "The Marabunta Grande";
                break;
            case 20:
                return "North Nation Miliz"; // Rofl
                break;
            case 21:
                return "SWAT";
                break;
            case 22:
                return "Bratwa";
                break;
            case 23:
                return "Los Santos Sheriff Department";
                break;
            case 24:
                return "Hounds of Hell MC";
                break;
            case 25:
                return "Grapeseed Rednecks";
                break;
            case 26:
                return "Los Santos Customs";
                break;
            case 27:
                return "International Contract Agency";
                break;
            case 28:
                return "Los Santos Metal Corporation";
                break;
            case 29:
                return "East LS Mining Corporation";
                break;
            case 30:
                return "Vanilla Unicorn";
                break;
            case 42:
                return "Outlaws MC";
                break;
            case 43:
                return "Bruderschaft";
                break;
            case 44:
                return "Madrazo Cartel";
                break;
            case 45:
                return "Bosozoku-Kai";
                break;
            case 47:
                return "Aztecas";
                break;
            case 48:
                return "Midnight Club";
                break;
        }
    }
}

exports.default = new ProfileApp();

},{"../app/app":11,"../player/player":208}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LawyerOverview extends _app2.default {
    constructor() {
        super("LawyerOverview");
        this.forwardableEvents.add("responseLawyers");
    }
}

exports.default = new LawyerOverview();

},{"../../app/app":11}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceRequestApp extends _app2.default {
    constructor() {
        super("ServiceRequestApp");
    }
}

exports.default = new ServiceRequestApp();

},{"../../app/app":11}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceSendRequestApp extends _app2.default {
    constructor() {
        super("ServiceSendRequestApp");
    }
}

exports.default = new ServiceSendRequestApp();

},{"../../app/app":11}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceAcceptedApp extends _app2.default {
    constructor() {
        super("ServiceAcceptedApp");
        this.forwardableEvents.add("responseTeamServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceAcceptedApp();

},{"../../app/app":11}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceEvaluationApp extends _app2.default {
    constructor() {
        super("ServiceEvaluationApp");
        this.forwardableEvents.add("responseEvaluationService");
    }
}

exports.default = new ServiceEvaluationApp();

},{"../../app/app":11}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceListApp extends _app2.default {
    constructor() {
        super("ServiceListApp");
        this.forwardableEvents.add("responseOpenServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceListApp();

},{"../../app/app":11}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceOwnApp extends _app2.default {
    constructor() {
        super("ServiceOwnApp");
        this.forwardableEvents.add("responseOwnServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceOwnApp();

},{"../../app/app":11}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _home = require("../home");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsApp extends _app2.default {
    constructor() {
        super("SettingsApp");
        this.forwardableEvents.add("responsePhoneSettings");
    }

    onEvent(name, ...args) {
        if (name == "lautlosStatus") {
            _player2.default.phonelautlos = args[0].status;
            _home2.default.mutemode();
        } else if (name == "flyStatus") {
            _home2.default.flymode();
        } else if (name == "anrufAblehnen") {
            _home2.default.anrufablehnen();
        }
    }
}

exports.default = new SettingsApp();

},{"../../app/app":11,"../../player/player":208,"../home":44}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsEditBlipsApp extends _app2.default {
    constructor() {
        super("SettingsEditBlipsApp");

        mp.events.add("playerReady", player => {
            if (typeof mp.storage.data.removedblips !== 'undefined') {
                mp.blips.forEach(blip => {
                    if (mp.storage.data.removedblips.includes(blip.getSprite())) blip.setDisplay(0);
                });
            } else {
                mp.storage.data.removedblips = [];
                mp.storage.flush();
            }
        });
    }

    onEvent(name, ...args) {
        if (name == "requestBlips") {
            let blips = [{ id: 141, name: "HuntingSpots" }, { id: 543, name: "Gangwar" }, { id: 357, name: "Garagen" }, { id: 73, name: "Kleidungsladen" }, { id: 361, name: "Tankstellen" }, { id: 207, name: "Banken" }, { id: 93, name: "Bars" }, { id: 578, name: "Flughafen" }, { id: 225, name: "Fahrzeughandel" }, { id: 110, name: "Ammunation" }, { id: 71, name: "Friseur" }, { id: 75, name: "Tattooladen" }, { id: 67, name: "Job Trucker" }, { id: 315, name: "Rennarena" }, { id: 478, name: "Warenhandel" }];

            this.callOnBrowser(`responseOwnBlips('${JSON.stringify(blips)}','${JSON.stringify(mp.storage.data.removedblips)}')`);
        } else if (name == "updateBlip") {
            if (args[0].visible) {
                if (!mp.storage.data.removedblips.includes(args[0].id)) {
                    mp.storage.data.removedblips.push(args[0].id);
                }
                mp.blips.forEach(blip => {
                    if (blip.getSprite() == args[0].id) {
                        blip.setDisplay(0);
                    }
                });
            } else {
                if (mp.storage.data.removedblips.includes(args[0].id)) {
                    mp.storage.data.removedblips = mp.storage.data.removedblips.filter(item => item !== args[0].id);
                }

                mp.blips.forEach(blip => {
                    if (blip.getSprite() == args[0].id) blip.setDisplay(6);
                });
            }

            mp.storage.flush();
        }
    }
}
exports.default = new SettingsEditBlipsApp();

},{"../../app/app":11}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsEditRingtonesApp extends _app2.default {
    constructor() {
        super("SettingsEditRingtonesApp");
        this.forwardableEvents.add("responseRingtoneList");
    }
}
exports.default = new SettingsEditRingtonesApp();

},{"../../app/app":11}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _smartphone = require("../../interfaces/hud/smartphone");

var _smartphone2 = _interopRequireDefault(_smartphone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsEditWallpaperApp extends _app2.default {
    constructor() {
        super("SettingsEditWallpaperApp");
        this.forwardableEvents.add("responseWallpaperList");
    }

    onEvent(name, ...args) {
        if (name == "saveWallpaper") {
            _smartphone2.default.refreshSmartphone();
        }
    }
}
exports.default = new SettingsEditWallpaperApp();

},{"../../app/app":11,"../../interfaces/hud/smartphone":162}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StreifenApp extends _app2.default {
    constructor() {
        super("StreifenApp");
        this.forwardableEvents.add("responseStreifenData");
        this.forwardableEvents.add("responseStreifenInfo");
    }
}

exports.default = new StreifenApp();

},{"../../app/app":11}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportOverviewApp extends _app2.default {
    constructor() {
        super("SupportOverviewApp");
    }
}

exports.default = new SupportOverviewApp();

},{"../../../app/app":11}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportAcceptedTickets extends _app2.default {
    constructor() {
        super("SupportAcceptedTickets");
        this.forwardableEvents.add("responseAcceptedTicketList");
    }
}

exports.default = new SupportAcceptedTickets();

},{"../../../app/app":11}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportKonversation extends _app2.default {
    constructor() {
        super("SupportKonversation");
        this.forwardableEvents.add("responseSupportKonversation");
        this.forwardableEvents.add("updateSupportKonversation");
    }
}

exports.default = new SupportKonversation();

},{"../../../app/app":11}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportOpenTickets extends _app2.default {
    constructor() {
        super("SupportOpenTickets");
        this.forwardableEvents.add("responseOpenTicketList");
    }
}

exports.default = new SupportOpenTickets();

},{"../../../app/app":11}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportTicketOverview extends _app2.default {
    constructor() {
        super("SupportTicketOverview");
    }
}

exports.default = new SupportTicketOverview();

},{"../../../app/app":11}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleApp extends _app2.default {
    constructor() {
        super("SupportVehicleApp");
    }
}

exports.default = new SupportVehicleApp();

},{"../../../app/app":11}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleList extends _app2.default {
    constructor() {
        super("SupportVehicleList");
        this.forwardableEvents.add("responseVehicleList");
    }
}

exports.default = new SupportVehicleList();

},{"../../../app/app":11}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleProfile extends _app2.default {
    constructor() {
        super("SupportVehicleProfile");
        this.forwardableEvents.add("responseVehicleData");
    }
}

exports.default = new SupportVehicleProfile();

},{"../../../app/app":11}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiContact extends _app2.default {
    constructor() {
        super("TaxiContact");
    }
}

exports.default = new TaxiContact();

},{"../../app/app":11}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiListApp extends _app2.default {
    constructor() {
        super("TaxiListApp");
        this.forwardableEvents.add("responseTaxiList");
    }
}

exports.default = new TaxiListApp();

},{"../../app/app":11}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiServiceListApp extends _app2.default {
        constructor() {
                super("TaxiServiceListApp");
                this.forwardableEvents.add("responseServiceList");
        }
}

exports.default = new TaxiServiceListApp();

},{"../../app/app":11}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiApp extends _app2.default {
    constructor() {
        super("TaxiApp");
    }
}

exports.default = new TaxiApp();

},{"../../app/app":11}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TeamEdit extends _app2.default {
    constructor() {
        super("TeamEditApp");
    }
}

exports.default = new TeamEdit();

},{"../../app/app":11}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TeamList extends _app2.default {
    constructor() {
        super("TeamListApp");
        this.forwardableEvents.add("responseTeamMembers");
    }

    onReady() {
        mp.events.callRemote("requestTeamMembers", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
}

exports.default = new TeamList();

},{"../../app/app":11,"../../player/player":208}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Telefon extends _app2.default {
    constructor() {
        super("Telefon");
    }

    declineCall() {
        if (_player2.default.historys.historys != null) {
            this.callOnBrowser(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
        }
    }

    onReady() {
        if (_player2.default.historys.historys != null) {
            this.callOnBrowser(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
        }
    }
}

exports.default = new Telefon();

},{"../../app/app":11,"../../player/player":208}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonCalls extends _app2.default {
    constructor() {
        super("TelefonCalls");
    }
}

exports.default = new TelefonCalls();

},{"../../app/app":11,"../../player/player":208}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonInput extends _app2.default {
    constructor() {
        super("TelefonInput");
    }
}

exports.default = new TelefonInput();

},{"../../app/app":11}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonSettings extends _app2.default {
    constructor() {
        super("TelefonSettings");
        this.forwardableEvents.add("responsePhoneData");
    }
}

exports.default = new TelefonSettings();

},{"../../app/app":11}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleImpoundApp extends _app2.default {
    constructor() {
        super("VehicleImpoundApp");
        this.forwardableEvents.add("responseVehicleImpound");
    }
}

exports.default = new VehicleImpoundApp();

},{"../../app/app":11}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleOverviewApp extends _app2.default {
    constructor() {
        super("FahrzeugUebersichtApp");
        this.forwardableEvents.add("responseVehicleOverview");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new VehicleOverviewApp();

},{"../../app/app":11}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleTaxApp extends _app2.default {
    constructor() {
        super("VehicleTaxApp");
        this.forwardableEvents.add("responseVehicleTax");
    }
}

exports.default = new VehicleTaxApp();

},{"../../app/app":11}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player2 = require("../player/player");

var _player3 = _interopRequireDefault(_player2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attachments {
    constructor() {

        this.attachmentsSyncEntities = [];
        this.steamAttachmentsRange = 30;

        this.wasRagdoll = {};
        this.collided = {};
        this.isOpeningDoor = false;
        this.isInWater = false;
        this.controlsToDisable = [12, 13, 14, 15, 16, 17, 24, 25, 37, 45, 47, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331];
        this.controlsLength = this.controlsToDisable.length;

        var attachmentHandler = this;

        // custom attachmentssyncrange
        setInterval(function () {
            if (_player3.default != null && _player3.default.attachmentsync) {
                if (attachmentHandler.attachmentsSyncEntities != null) {
                    mp.players.forEachInStreamRange((streamedPlayer, id) => {
                        let streamedEntityPos = streamedPlayer.position;
                        let distance = _player3.default.getDistance(streamedEntityPos);
                        if (distance < attachmentHandler.steamAttachmentsRange) {
                            if (!attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {

                                attachmentHandler.attachmentsSyncEntities.push(streamedPlayer.handle);
                                mp.events.callRemote("requestAttachmentsPlayer", streamedPlayer.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                            }
                        } else if (attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {
                            let index = attachmentHandler.attachmentsSyncEntities.indexOf(streamedPlayer.handle);

                            if (index > -1) {
                                attachmentHandler.removeAllAttachments(streamedPlayer);
                                attachmentHandler.attachmentsSyncEntities.splice(index, 1);
                            }
                        }
                    });
                }
            }
        }, 1500);

        mp.events.add('entityStreamOut', entity => {
            if (entity.__attachmentObjects) {
                this.removeAllAttachments(entity);
            }

            // Remove from customSync 
            if (entity) {
                let index = this.attachmentsSyncEntities.indexOf(entity);

                if (index > -1) {
                    this.attachmentsSyncEntities.splice(index, 1);
                }
            }
        });

        const render = async () => {
            while (true) {
                if (_player3.default == null) {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (_player3.default.isCarrying) for (let i = 0; i < this.controlsLength; i++) mp.game.controls.disableControlAction(2, this.controlsToDisable[i], true);

                mp.players.forEachInStreamRange(async (player, id) => {
                    if (this.attachmentsSyncEntities.indexOf(player.handle) > -1) {
                        if (player.hasCollidedWithAnything()) {
                            this.collided[player.remoteId] = true;
                        } else {
                            if (this.collided[player.remoteId]) {
                                await this.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                this.collided[player.remoteId] = false;
                            }
                        }

                        if (player.isRagdoll()) {
                            this.wasRagdoll[player.remoteId] = true;
                        } else {
                            if (this.wasRagdoll[player.remoteId]) {
                                let that = this;
                                setTimeout(async function () {
                                    await that.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                }, 2000);
                                this.wasRagdoll[player.remoteId] = false;
                            }
                        }
                    }
                });

                await mp.game.waitAsync(150);
            }
        };

        render();

        mp.events.add('setAttachments', async (entity, data) => {
            if (entity !== undefined && entity != null && entity.handle != null && data !== undefined && (this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local)) {
                await this.setAttachments(entity, data);
            }
        });

        mp.events.add('removeAllAttachments', entity => {
            if (entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                this.removeAllAttachments(entity);
            }
        });

        mp.events.add('resyncAttachments', async entity => {
            if (entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                await this.resyncAttachments(entity);
            }
        });
    }

    async setAttachments(entity, data) {
        if (data !== undefined) {
            let newAttachments = data.length > 0 ? JSON.parse(data) : [];

            if (entity.handle !== 0) {
                let oldAttachments = entity.__attachments;

                if (!oldAttachments) {
                    oldAttachments = [];
                    entity.__attachmentObjects = {};
                }
                if (oldAttachments != [] && newAttachments != []) {
                    for (let oldattachment of oldAttachments) {
                        // in den alten attachments ist was, was in den neuen nicht ist -> remove
                        if (newAttachments.findIndex(a => a.Id === oldattachment.Id) === -1) {
                            this.removeAttachment(entity, oldattachment);
                        }
                    }
                }

                if (newAttachments != [] && oldAttachments != []) {
                    for (let newattachment of newAttachments) {
                        // in den neuen attachments ist was, was in den alten nicht ist -> add
                        if (oldAttachments.findIndex(a => a.Id === newattachment.Id) === -1) {
                            await this.addAttachment(entity, newattachment);
                        }
                    }
                }

                entity.__attachments = newAttachments;
            }
        }
    }

    async resyncAttachments(entity) {

        if (entity.handle !== 0 && entity.__attachments.length > 0) {

            // remove all
            for (let oldattachment of entity.__attachments) {
                this.removeAttachment(entity, oldattachment);
            }
            // add again
            for (let newattachment of entity.__attachments) {
                await this.addAttachment(entity, newattachment);
            }
        }
    }

    removeAllAttachments(entity) {
        if (entity.handle !== 0 && entity.__attachments.length > 0) {
            // remove all
            for (let oldattachment of entity.__attachments) {
                this.removeAttachment(entity, oldattachment);
            }
        }
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData === undefined || entity.__animationData == null) {
                return;
            }

            if (entity.__animationData.Active == true && !entity.vehicle) {
                mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict);
                while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                    await mp.game.waitAsync(5);
                }

                entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false);
            }

            if (entity.__attachmentObjects !== undefined && entity.__attachmentObjects != null) {
                Object.keys(entity.__attachmentObjects).forEach(attachment => {

                    if (attachment.needsAnimation) {
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', entity.handle, attachment.animationDict, attachment.animationName, 1)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', mp.players.local.handle, attachment.animationDict, attachment.animationName, 3)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                    }
                });
            }
        } catch (e) {
            // mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!")
        }
    }

    async addAttachment(entity, attachment) {

        if (!entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

            let object = mp.objects.new(attachment.model, entity.position, {
                dimension: entity.dimension
            });

            let count = 0;

            while ((object == null || object.handle === 0) && count < 30) {
                await mp.game.waitAsync(100);
                count++;
            }

            if (object == null || object.handle === 0) return;

            object.attachTo(entity.handle, entity.getBoneIndex(attachment.bone), attachment.offset.x, attachment.offset.y, attachment.offset.z, attachment.rotation.x, attachment.rotation.y, attachment.rotation.z, false, false, false, false, 2, true);

            entity.__attachmentObjects[attachment.id] = object;

            if (attachment.needsAnimation) {
                mp.game.streaming.requestAnimDict(attachment.animationDict);

                while (!mp.game.streaming.hasAnimDictLoaded(attachment.animationDict)) {
                    await mp.game.waitAsync(5);
                }

                entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
            }

            if (attachment.isCarrying) {
                if (mp.players.local.id === entity.id) {
                    _player3.default.isCarrying = true;
                    mp.players.local.weapon = mp.game.joaat('weapon_unarmed');
                }
            }
        }
    }

    removeAttachment(entity, attachment) {
        if (entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

            let obj = entity.__attachmentObjects[attachment.id];
            delete entity.__attachmentObjects[attachment.id];

            if (mp.objects.exists(obj)) {
                obj.destroy();

                if (attachment.needsAnimation) {
                    entity.stopAnimTask(attachment.animationDict, attachment.animationName, 3);
                }

                if (_player3.default.isCarrying && attachment.isCarrying) {
                    if (mp.players.local.id === entity.id) {
                        _player3.default.isCarrying = false;

                        Object.keys(entity.__attachmentObjects).forEach(attachment => {
                            if (attachment.isCarrying) _player3.default.isCarrying = true;
                        });
                    }
                }
            }
        }
    }

    async initAttachments(entity) {
        for (let attachment of entity.__attachments) {
            await this.addAttachment(entity, attachment);
        }
    }

    removeAllAttachments(entity) {
        if (entity.__attachments !== undefined) {
            if (entity.__attachments && entity.__attachments != []) {
                for (let attachment of entity.__attachments) {
                    if (entity.__attachments.findIndex(a => a.Id === attachment.id) === -1) {
                        this.removeAttachment(entity, attachment);
                    }
                }
                entity.__attachments = [];
                entity.__attachmentObjects = {};
            }
        }
    }
}

exports.default = new Attachments();

},{"../player/player":208}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Browser {
    constructor() {
        let _this = this;

        this.ui = null;
        this.voice = null;

        mp.events.add('guiReady', function () {
            _this.createBrowsers.call(_this);
        });
    }

    /**
     * Create browser for ui and voice if not existing.
     */
    createBrowsers() {
        if (!this.ui) {
            this.ui = mp.browsers.new('package://gvmp/index.html');
        }

        if (!this.voice) {
            this.voice = mp.browsers.new('');
            this.voice.execute(`document.body.style.display = "none";`);
        }
    }

    /**
     * Calls JavaScript code inside the browser.
     *
     * Call is made as `components.COMPONENT.EXECUTE`
     *
     * @param component Component to call.
     * @param execute JavaScript code to call.
     */
    execute(component, execute) {
        if (!this.ui) return;

        this.ui.execute(`components.${component}.${execute}`);
    }
}

exports.default = new Browser();

},{}],105:[function(require,module,exports){
"use strict";

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let objectplaceRot = 0.0;
let boneIdx = 338;
let rotationSpeed = 2.0;
let positionSpeed = 0.05;
let currHash = undefined;
let returnEvent = "";
let useUpDown = false;
let xIndex = 0;
let yIndex = 1.5;
let zIndex = -1.0;

mp.events.add('initPlacement', (return_event, hash, use_up_down) => {

    // restore defaults
    xIndex = 0;
    yIndex = 1.5;
    zIndex = -1.0;
    objectplaceRot = 0.0;

    useUpDown = use_up_down;
    currHash = hash;
    returnEvent = return_event;

    if (_player2.default.placementObject != null && mp.objects.exists(_player2.default.placementObject)) {
        _player2.default.placementObject.destroy();
    }

    _player2.default.placementObject = mp.objects.new(hash, mp.players.local.position, {
        rotation: mp.players.local.rotation,
        alpha: 200,
        dimension: mp.players.local.dimension
    });

    let count = 0;

    while ((_player2.default.placementObject == null || _player2.default.placementObject.handle === 0) && count < 30) {
        mp.game.wait(100);
        count++;
    }

    resyncObject();
});

// 4
mp.keys.bind(0x64, true, () => {
    if (_player2.default.placementObject !== undefined) {
        xIndex -= positionSpeed;
        resyncObject();
    }
});

// 1
mp.keys.bind(0x61, true, () => {
    if (_player2.default.placementObject !== undefined) {
        zIndex -= positionSpeed;
        resyncObject();
    }
});

// 3
mp.keys.bind(0x63, true, () => {
    if (_player2.default.placementObject !== undefined) {
        zIndex += positionSpeed;
        resyncObject();
    }
});

// 6
mp.keys.bind(0x66, true, () => {
    if (_player2.default.placementObject !== undefined) {
        xIndex += positionSpeed;
        resyncObject();
    }
});

// 8
mp.keys.bind(0x68, true, () => {
    if (_player2.default.placementObject !== undefined && useUpDown) {
        yIndex += positionSpeed;
        resyncObject();
    }
});

// 2
mp.keys.bind(0x62, true, () => {
    if (_player2.default.placementObject !== undefined && useUpDown) {
        yIndex -= positionSpeed;
        resyncObject();
    }
});

// 7 (DREHEN+)
mp.keys.bind(0x67, true, () => {
    if (_player2.default.placementObject !== undefined) {
        objectplaceRot += rotationSpeed;
        resyncObject();
    }
});

// 9 (DREHEN-)
mp.keys.bind(0x69, true, () => {
    if (_player2.default.placementObject !== undefined) {
        objectplaceRot -= rotationSpeed;
        resyncObject();
    }
});

function resyncObject() {
    if (_player2.default.placementObject !== undefined) {
        _player2.default.placementObject.attachTo(mp.players.local.handle, boneIdx, xIndex, yIndex, zIndex, 0.0, 0.0, objectplaceRot, false, false, true, false, 0, true);
    }
}

// 0 Bestätigen
mp.keys.bind(0x60, true, () => {
    if (_player2.default.placementObject !== undefined) {

        let position = _player2.default.placementObject.getCoords(false);
        let rotation = _player2.default.placementObject.getRotation(2);

        let tmpobj = mp.objects.new(currHash, position, {
            rotation: rotation,
            alpha: 0,
            dimension: mp.players.local.dimension
        });

        let count = 0;

        while ((tmpobj == null || tmpobj.handle === 0) && count < 30) {
            mp.game.wait(100);
            count++;
        }

        if (!useUpDown) {
            mp.game.invoke("0x58A850EAEE20FAA3", tmpobj.handle);
        }

        mp.game.wait(500);
        rotation = tmpobj.getRotation(2);
        position = tmpobj.getCoords(false);

        mp.events.callRemote(returnEvent, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");

        tmpobj.destroy();
        _player2.default.placementObject.destroy();
        _player2.default.placementObject = undefined;
    }
});

},{"../player/player":208}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _browser = require('../browser/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_STRING_SIZE = 10024;
const timer = ms => new Promise(res => setTimeout(res, ms));

class Component {
    constructor(name) {
        this.name = name;
        this.forwardableEvents = new Set();
        this.isReady = false;

        _components2.default.components.set(name, this);
    }

    /**
     * Component events listener.
     *
     * @param name
     * @param args
     */
    onEvent(name, ...args) {}
    //


    /**
     * Component is ready listener.
     */
    onReady() {
        this.isReady = true;
    }

    /**
     * Handle incoming event calls made by the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingBrowserEventCall(name, args = null) {
        this.onEvent(name, args);
    }

    /**
     * Handle incoming event calls made by the server.
     *
     * If the event is registered as forwardable event,
     * the call will be forwarded to the ui browser.
     *
     * Fowardable events with big data will automatically be split and sent
     * as chunks to the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingServerEventCall(name, ...args) {
        // If the event is not forwardable, we call the onEvent listener on this component.
        if (!this.forwardableEvents.has(name)) {
            this.onEvent(name, args);

            return;
        }

        // For forwardable events the JavaScript code to execute will be prepared and sent to the ui browser.
        let eventArgsString = args.map(a => {
            return a.length === 0 ? `' '` : `'${a}'`;
        }).join(',');

        if (eventArgsString.length <= MAX_STRING_SIZE) {
            this.callOnBrowser(`${name}(${eventArgsString})`);

            return;
        }

        // String is too big to send it directly to the browser. This is why we split the string in chunks.
        let id = this.makeId(32),
            chunkBucket = this.chunkString(JSON.stringify(args), MAX_STRING_SIZE),
            _this = this;

        chunkBucket.forEach(async (chunkData, chunkIndex) => {
            /*
                It is absolutely necessary to replace single backslashes with double backslashes.
                Otherwise they will be stripped off by browser.execute()!
                  In case a string ends with backslash, we add $$_$$_ at the end of the chunk.
                This will be striped off again on browser side.
                  Receiver is located at: gvmp/browser/src/components/BaseComponent.vue
            */
            chunkData = chunkData.replace(/\\/g, '\\\\');

            _this.callOnBrowser(`responseBigData('${id}', '${name}', '${chunkData}$$_$$_', ${chunkIndex}, ${chunkBucket.length})`);

            // Give the browser some time to breath...
            await timer(250);
        });
    }

    /**
     * Calls JavaScript code inside the ui browser.
     *
     * Component name will be added.
     * Call is made as `components.COMPONENT_NAME.EXECUTE`
     *
     * @param {string} execute
     */
    callOnBrowser(execute) {
        _browser2.default.execute(this.name, execute);
    }

    /**
     * Create a length long alphanumeric string.
     *
     * @param {number} length
     *
     * @return {string}
     */
    makeId(length) {
        let result = '',
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    /**
     * Chunk a string by length.
     *
     * @param {string} str
     * @param {number} size
     *
     * @return {string[]}
     */
    chunkString(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);

        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size);
        }

        return chunks;
    }
}

exports.default = Component;

},{"../browser/browser":104,"./components":107}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Components {
    constructor() {
        let _this = this;

        this.components = new Map();

        mp.events.add('componentReady', function (componentName) {
            _this.onReady.call(_this, componentName);
        });

        mp.events.add('componentServerEvent', function (componentName, eventName, ...eventArgs) {
            _this.onIncomingServerEventCall.call(_this, componentName, eventName, ...eventArgs);
        });

        mp.events.add('componentEvent', function (componentName, eventName, eventArgsJson) {
            _this.onIncomingBrowserEventCall.call(_this, componentName, eventName, eventArgsJson);
        });

        mp.events.add('componentTriggerServerEvent', function (eventName, ...eventArgs) {
            _this.triggerServerEvent.call(_this, eventName, ...eventArgs);
        });

        mp.events.add('componentLog', function (...args) {
            mp.console.logInfo(JSON.stringify(args));
        });

        mp.events.add('componentLogSingle', function (arg) {
            mp.console.logInfo(arg);
        });
    }

    /**
     *
     *
     * @param componentName
     * @param eventName
     * @param eventArgs
     */
    onIncomingServerEventCall(componentName, eventName, ...eventArgs) {
        if (!this.components.has(componentName)) return;

        this.components.get(componentName).handleIncomingServerEventCall(eventName, ...eventArgs);
    }

    /**
     *
     *
     * @param componentName
     */
    onReady(componentName) {
        if (!this.components.has(componentName)) return;

        this.components.get(componentName).onReady();
    }

    /**
     * Call eventName on componentName.
     *
     * @param componentName
     * @param eventName
     * @param eventArgsJson Just one JSON string. // Don't ask, I dont know...
     */
    onIncomingBrowserEventCall(componentName, eventName, eventArgsJson) {
        if (!this.components.has(componentName)) return;

        if (typeof eventArgsJson === 'undefined' || eventArgsJson === null) {
            this.components.get(componentName).handleIncomingBrowserEventCall(eventName);

            return;
        }

        this.components.get(componentName).handleIncomingBrowserEventCall(eventName, JSON.parse(eventArgsJson));
    }

    /**
     * Call eventName on server.
     *
     * @param eventName
     * @param eventArgs
     */
    triggerServerEvent(eventName, ...eventArgs) {
        if (typeof eventArgs === 'undefined') {
            eventArgs = [];
        }

        eventArgs.push("0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");

        mp.events.callRemote(eventName, ...eventArgs);
    }
}

exports.default = new Components();

},{"../player/player":208}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Doors {
    constructor() {
        mp.events.add('setStateOfClosestDoorOfType', (type, x, y, z, locked, heading, p6) => {
            mp.game.object.setStateOfClosestDoorOfType(type, x, y, z, locked, heading, p6);
        });
    }
}

exports.default = new Doors();

},{}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminWindow extends _window2.default {
    constructor() {
        super('AdminMenu');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseAdminMenu');
        this.forwardableEvents.add('responseCloseAdminMenu');
    }
}

exports.default = new AdminWindow();

},{"../../windows/window":234}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _nMenu = require('../hud/n-menu');

var _nMenu2 = _interopRequireDefault(_nMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimationWheelFavoritesList extends _window2.default {
    constructor() {
        super('AnimationWheelFavoritesList');

        this.setCurserVisible(true);

        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        if (name === 'getAnimationShortcuts') {
            this.callOnBrowser(`setDataItemsAnimation('${JSON.stringify(_nMenu2.default.getItems())}')`);
        }
    }
}

exports.default = new AnimationWheelFavoritesList();

},{"../../windows/window":234,"../hud/n-menu":152}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankWindow extends _window2.default {
    constructor() {
        super("Bank");
        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add("responseFinishPayment");
    }
}

exports.default = new BankWindow();

},{"../../windows/window":234}],112:[function(require,module,exports){
"use strict";

require("./bank-window");

},{"./bank-window":111}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BannWindow extends _window2.default {
    constructor() {
        super("Bann");
    }
}

exports.default = new BannWindow();

},{"../../windows/window":234}],114:[function(require,module,exports){
"use strict";

require("./bann-window");

},{"./bann-window":113}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BarberWindow extends _window2.default {
    constructor() {
        super('Barber');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'setHairVariant':
                mp.players.local.setComponentVariation(2, args[0], 0, 0);
                return;
            case 'setHairColor':
                mp.players.local.setHairColor(args[0].color1, args[0].color2);
                return;
            case 'setBeard':
                mp.players.local.setHeadOverlay(1, args[0].variation, args[0].opacity, args[0].color, 0);
                return;
            case 'setChestHair':
                mp.players.local.setHeadOverlay(10, args[0].variation, args[0].opacity, args[0].color, 0);
                return;
            case 'moveCam':
                this.moveCam(args[0].offset);
                break;
        }
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam(heading) {
        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 2, 1, 0.5);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 2, 1, 0.5);
    }
}

exports.default = new BarberWindow();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusLinienWindow extends _window2.default {
    constructor() {
        super("BusLinienWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new BusLinienWindow();

},{"../../windows/window":234}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CannabisLaborWindow extends _window2.default {
    constructor() {
        super("CannabisLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new CannabisLaborWindow();

},{"../../windows/window":234}],118:[function(require,module,exports){
"use strict";

require("./cannabislab-window");

},{"./cannabislab-window":117}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarshopWindow extends _window2.default {
    constructor() {
        super("Carshop");
        this.forwardableEvents.add("responseVehicleList");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new CarshopWindow();

},{"../../windows/window":234}],120:[function(require,module,exports){
"use strict";

require("./carshop-window");

},{"./carshop-window":119}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SlotMachine extends _window2.default {
    constructor() {
        super("SlotMachine");
        this.forwardableEvents.add("rollSlot");
        this.forwardableEvents.add("responseSlotInfo");
        this.forwardableEvents.add("responseRisiko");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new SlotMachine();

},{"../../windows/window":234}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharacterCreator extends _window2.default {
    constructor() {
        super('CharacterCreator');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'changeCharacterPart':
                let part = args[0],
                    arg = [];

                if (part.method !== 'setFaceFeature') {
                    part.settings.forEach(setting => {
                        if (String(setting.value) === 'true') {
                            arg.push(true);

                            return;
                        }

                        if (String(setting.value) === 'false') {
                            arg.push(false);

                            return;
                        }

                        arg.push(parseFloat(setting.value));
                    });

                    mp.players.local[part.method](...arg);

                    return;
                }

                // Only float values for setFaceFeature
                for (let i = 0; i < 20; i++) {
                    mp.players.local[part.method](i, parseFloat(part.settings[i].value));
                }

                break;
            case 'changeGender':
                mp.players.local.model = args[0];

                break;
            case 'moveCam':
                this.moveCam(args[0].offset);

                break;
        }
    }

    onReady() {
        this.toInitialZoom(true);
    }

    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam(heading) {
        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 3, 0);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 3, 0);
    }
}

exports.default = new CharacterCreator();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChatWindow extends _window2.default {
    constructor() {
        super("Chat");
        this.setCurserVisible(true);
        this.lastCommands = [];
    }

    onEvent(name, ...args) {
        if (name == "setChatFlag") {
            _player2.default.setPlayerChatFlag(args[0]);
        } else if (name === "pushCommand") {
            this.lastCommands.unshift(args[0].message);
        }
    }

    onReady() {
        this.callOnBrowser(`responseLastCommands("${this.lastCommands}")`);
    }
}

exports.default = new ChatWindow();

},{"../../player/player":208,"../../windows/window":234}],124:[function(require,module,exports){
"use strict";

require("./chat-window");

},{"./chat-window":123}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClothingShop extends _window2.default {
    constructor() {
        super('ClothingShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseClothingShopCategories');
        this.forwardableEvents.add('responseClothingShopClothes');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'moveCam':
                this.moveCam(args[0].offset, args[0].slot, args[0].isX, args[0].isY);

                break;
            case 'zoomToSlot':
                this.zoomToSlot(args[0].slot, args[0].isY);

                break;
            case 'zoomOut':
                this.toInitialZoom();

                break;
        }
    }

    /**
     * Calculates important movement data for given params.
     *
     * @param slot Which slot should be in focus?
     * @param isY  If true, right side will be in focus
     *
     * @returns {{distance: number, heading: number, camPos: {z: *}, pointPos: {z: *}}}
     */
    getMovementData(slot, isY) {
        let player = mp.players.local,
            data = {
            heading: player.getHeading(),
            distance: 1,
            camPos: {
                z: player.position.z
            },
            pointPos: {
                z: player.position.z
            }
        };

        switch (slot) {
            case '1':
                // Mask
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case '3':
                // Body
                data.distance = 3;

                break;
            case '4':
                // Legs
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.6;

                break;
            case '5':
                // Backpack
                data.heading += 180;
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case '6':
                // Shoes
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.8;

                break;
            case '7': // Accessories
            case '8': // Undershirts
            case '11':
                // Tops
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case 'p-0':
                // Hat
                data.heading += 180;
                data.distance = 2;

                data.camPos.z += 1;
                data.pointPos.z += 0.5;

                break;
            case 'p-1':
                // Glasses
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-2':
                // Ears
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-6': // Watch
            case 'p-7':
                // Wrist
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.3;
                data.pointPos.z -= 0.1;

                break;
        }

        return data;
    }

    /**
     * Moves the Camera to a given slot.
     *
     * @param slot Which slot should be in focus?
     * @param isY If true, right side will be used.
     */
    zoomToSlot(slot, isY) {
        let player = mp.players.local,
            data = this.getMovementData(slot, isY),
            offset = this.offsetPosition(player.position.x, player.position.y, data.heading, data.distance),
            targetPositionFly = new mp.Vector3(offset.x, offset.y, data.camPos.z),
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z);

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     * @param slot Slot in focus
     * @param isX Is slot in focus?
     * @param isY Is slots right side in focus?
     */
    moveCam(heading, slot, isX, isY) {
        let player = mp.players.local,
            data,
            offset,
            targetPositionFly,
            targetPositionPoint;

        if ((isX || isY) && slot !== null) {
            data = this.getMovementData(slot, isY);
            offset = this.offsetPosition(player.position.x, player.position.y, data.heading + heading, data.distance);

            targetPositionFly = new mp.Vector3(offset.x, offset.y, data.camPos.z);
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z);

            _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
            _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);

            return;
        }

        offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + heading, 3);

        targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
        targetPositionPoint = player.position;

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3),
            targetPositionFly,
            targetPositionPoint;

        if (create) {
            _bodyCamera2.default.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z));
            _bodyCamera2.default.pointBodyCameraAt(player.position);
        }

        targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
        targetPositionPoint = player.position;

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Get offset with rotation.
     *
     * @param x
     * @param y
     * @param rot
     * @param distance
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rot, distance) {
        return {
            x: x + Math.sin(-rot * Math.PI / 180) * distance,
            y: y + Math.cos(-rot * Math.PI / 180) * distance
        };
    }
}

exports.default = new ClothingShop();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],126:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConfirmWindow extends _window2.default {
    constructor() {
        super("Confirmation");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new ConfirmWindow();

},{"../../windows/window":234}],127:[function(require,module,exports){
"use strict";

require("./confirm-window");

},{"./confirm-window":126}],128:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeathWindow extends _window2.default {
    constructor() {
        super("Death");
        this.setCurserVisible(false);
        this.forwardableEvents.add("closeDeathScreen");
    }
}

exports.default = new DeathWindow();

},{"../../windows/window":234}],129:[function(require,module,exports){
"use strict";

require("./death-window");

},{"./death-window":128}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EjectWindow extends _window2.default {
    constructor() {
        super("EjectWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new EjectWindow();

},{"../../windows/window":234}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FlyerWindow extends _window2.default {
    constructor() {
        super("Flyer");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new FlyerWindow();

},{"../../windows/window":234}],132:[function(require,module,exports){
"use strict";

require("./flyer-window");

},{"./flyer-window":131}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FriskWindow extends _window2.default {
    constructor() {
        super("Frisk");
        this.forwardableEvents.add("closeFriskWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new FriskWindow();

},{"../../windows/window":234}],134:[function(require,module,exports){
"use strict";

require("./frisk-window");

},{"./frisk-window":133}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GarageWindow extends _window2.default {
    constructor() {
        super("Garage");
        this.forwardableEvents.add("responseVehicleList");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new GarageWindow();

},{"../../windows/window":234}],136:[function(require,module,exports){
"use strict";

require("./garage-window");

},{"./garage-window":135}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GiveMoneyWindow extends _window2.default {
    constructor() {
        super("GiveMoney");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new GiveMoneyWindow();

},{"../../windows/window":234}],138:[function(require,module,exports){
"use strict";

require("./giveMoney-window");

},{"./giveMoney-window":137}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HeistOverview extends _window2.default {
    constructor() {
        super('HeistOverview');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

}

exports.default = new HeistOverview();

},{"../../windows/window":234}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HeroinLaborWindow extends _window2.default {
    constructor() {
        super("HeroinLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new HeroinLaborWindow();

},{"../../windows/window":234}],141:[function(require,module,exports){
"use strict";

require("./heroinlab-window");

},{"./heroinlab-window":140}],142:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AntiAFK extends _component2.default {
    constructor() {
        super("AntiAFK");
        this.power = false;
        this.timeLeft = 60;
    }

    setVisible() {
        this.callOnBrowser(`power=${true}`);
        this.callOnBrowser(`timeLeft=${60}`);
        mp.gui.cursor.visible = true;
        mp.game.graphics.transitionToBlurred(250);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onEvent(name, ...args) {
        if (name == "disableAntiAFK") {
            mp.gui.cursor.visible = false;
            mp.game.graphics.transitionFromBlurred(250);
            mp.game.ui.displayHud(true);
            mp.game.ui.displayRadar(true);
        }
    }
}

exports.default = new AntiAFK();

},{"../../components/component":106}],143:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BuildMenu extends _component2.default {
    constructor() {
        super("BuildMenu");

        mp.events.add('showBuildMenu', state => {
            this.callOnBrowser(`showBuildMenu(${state})`);
        });
    }
}

exports.default = new BuildMenu();

},{"../../components/component":106}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bus extends _component2.default {
    constructor() {
        super("Bus");

        mp.events.add("showBusHud", (linie, verbleibendehaltestellen, nexthaltestelle, doorcountdown, busstopped) => {
            this.callOnBrowser(`showBusHud('${linie}', '${verbleibendehaltestellen}', '${nexthaltestelle}','${doorcountdown}','${busstopped}')`);
        });

        mp.events.add("closeBusHud", () => {
            this.callOnBrowser(`closeBusHud()`);
        });
    }
}

exports.default = new Bus();

},{"../../components/component":106}],145:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Fishing extends _component2.default {
    constructor() {
        super("Fishing");

        mp.events.add('showfishing', fishingstate => {
            this.callOnBrowser(`showfishing(${fishingstate})`);
        });
        mp.events.add('setAngelState', angelstate => {
            this.callOnBrowser(`setAngelState(${angelstate})`);
        });
        mp.events.add('setFishState', fishstate => {
            this.callOnBrowser(`setFishState(${fishstate})`);
        });
    }
}

exports.default = new Fishing();

},{"../../components/component":106}],146:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Gangwar extends _component2.default {
    constructor() {
        super("Gangwar");

        mp.events.add("initializeGangwar", (attackerTeam, defenderTeam, attackerId, defenderId, gangwarTime) => {
            this.callOnBrowser(`initializeGangwar('${attackerTeam}', '${defenderTeam}', '${attackerId}', '${defenderId}', '${gangwarTime}')`);
        });

        mp.events.add("updateGangwarScore", (attackerScore, defenderScore) => {
            this.callOnBrowser(`updateScore('${attackerScore}','${defenderScore}')`);
        });

        mp.events.add("finishGangwar", () => {
            this.callOnBrowser(`finishGangwar()`);
        });
    }
}

exports.default = new Gangwar();

},{"../../components/component":106}],147:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GlobalNotification extends _component2.default {
    constructor() {
        super("GlobalNotification");

        mp.events.add("sendGlobalNotification", (message, duration, color, icon) => {
            this.callOnBrowser(`setGlobalNotification('${message}', '${duration}', '${color}', '${icon}')`);
        });
    }
}

exports.default = new GlobalNotification();

},{"../../components/component":106}],148:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HelpPanel extends _component2.default {
    constructor() {
        super("HelpPanel");
    }

    onReady() {
        if (_player2.default.level <= 3) {
            this.callOnBrowser(`showHelpPanel=true`);
        } else {
            this.callOnBrowser(`showHelpPanel=false`);
        }
    }
}

exports.default = new HelpPanel();

},{"../../components/component":106,"../../player/player":208}],149:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Hud extends _component2.default {
    constructor() {
        super("Hud");
        this.windows = [];
        mp.nametags.enabled = false;
    }

    setVisible(visible) {
        this.callOnBrowser(`visible=${visible ? "true" : "false"}`);
    }

    addWindow(window, data) {
        this.windows.push({ name: window, data: data });
        this.callOnBrowser(`addWindow("${window}", '${data}')`);
    }

    removeWindow(window, dataFunction = null) {
        mp.gui.chat.push(JSON.stringify(this.windows));

        if (dataFunction == null) {
            this.callOnBrowser(`removeWindow("${window}")`);
        } else {
            this.callOnBrowser(`removeWindow("${window}", ${dataFunction.toString()})`);
        }

        for (var i = this.windows.length - 1; i >= 0; i--) {
            if (this.windows[i].name == window) {
                if (dataFunction != null && !dataFunction(this.windows[i].data)) {
                    continue;
                }
                this.windows.splice(i, 1);
                return;
            }
        }
    }
}

exports.default = new Hud();

},{"../../components/component":106}],150:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Infocard extends _component2.default {
    constructor() {
        super("Infocard");

        mp.events.add("sendInfocard", (content, color, imgSrc, duration, data) => {
            this.callOnBrowser(`pushInfocard('${content}', '${color}', '${imgSrc}', '${duration}', '${data}')`);
        });
    }
}

exports.default = new Infocard();

},{"../../components/component":106}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _playerPanel = require('../hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @Deprecated
class Menu extends _component2.default {
    constructor() {
        super('NativeMenu');

        this.forwardableEvents.add('createMenu');
        this.forwardableEvents.add('addItem');
        this.forwardableEvents.add('show');
        this.forwardableEvents.add('hide');
        this.forwardableEvents.add('showNativeMenu');

        this.visible = false;
    }

    onEvent(name, ...args) {
        if (name === 'show') {
            this.visible = true;

            _playerPanel2.default.executeDisplay(true);
        } else if (name === 'hide') {
            this.visible = false;

            _playerPanel2.default.executeDisplay(false);
        } else if (name === 'activateCursor') {
            mp.gui.cursor.visible = true;
        } else if (name === 'deactivateCursor') {
            mp.gui.cursor.visible = false;
        }
    }
}

exports.default = new Menu();

},{"../../components/component":106,"../hud/player-panel":155}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NMenu extends _component2.default {
    constructor() {
        super('NMenu');
        this.visible = false;
    }

    setItems(items) {
        if (items == null) {
            return;
        }

        this.visible = items.length > 0;
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`);

        mp.gui.cursor.visible = this.visible;
    }

    getItems() {
        if (_player2.default.isInAnyVehicle(true)) {
            return;
        }

        return _player2.default.animations;
    }

    onEvent(name, ...args) {
        if (name === 'select') {
            if (_player2.default.isInAnyVehicle(true)) {
                return;
            }

            mp.events.callRemote('REQUEST_ANIMATION_USE', args[0], "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        }
    }
}

exports.default = new NMenu();

},{"../../components/component":106,"../../player/player":208}],153:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Nutrition extends _component2.default {
    constructor() {
        super("Nutrition");
        mp.events.add("responseNutrition", data => {
            this.callOnBrowser(`responseNutrition('${data}')`);
        });
    }
}

exports.default = new Nutrition();

},{"../../components/component":106}],154:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Paintball extends _component2.default {
    constructor() {
        super("Paintball");
        mp.events.add("initializePaintball", () => {
            this.callOnBrowser(`initializePaintball()`);
        });

        mp.events.add("updatePaintballScore", (kills, deaths, ks) => {
            this.callOnBrowser(`updatePaintballScore('${kills}', '${deaths}', '${ks}')`);
        });

        mp.events.add("finishPaintball", () => {
            this.callOnBrowser(`finishPaintball()`);
        });

        mp.events.add("spawnProtection", (ms, alpha = 180, notify = true) => {
            if (ms > 0) {
                mp.players.local.setInvincible(true);
                _player2.default.invincible = true;
                mp.players.local.setAlpha(alpha);
                notify ? mp.game.graphics.notify('SpawnProtection: ~g~' + ms / 1000 + " Sekunden") : "";
                var spawnprotect = setInterval(function () {
                    mp.players.local.setInvincible(false);
                    _player2.default.invincible = false;
                    notify ? mp.game.graphics.notify('SpawnProtection: ~r~aus') : "";
                    mp.players.local.setAlpha(255);
                    clearInterval(spawnprotect);
                }, ms);
            }
        });
    }
}

exports.default = new Paintball();

},{"../../components/component":106,"../../player/player":208}],155:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerPanel extends _component2.default {
    constructor() {
        super("PlayerPanel");

        this.displayState = false;
        this.forwardableEvents.add("responsePlaySMSSound");
        this.mkr_range = 3 * 2.5;
        this.mkr_active = false;
        this.mkr_time = 50;
        mp.events.add('setVoiceType', voiceRange => {
            this.callOnBrowser(`voiceRange=${voiceRange}`);
            var range = 3;
            switch (voiceRange) {
                case 1:
                    range = 8 * 2.5;break;
                case 2:
                    range = 20 * 2.5;break;
                case 3:
                    range = 3 * 2.5;break;
                case 4:
                    range = 50 * 2.5;break;
            }
            this.mkr_range = range * 0.8;
            this.mkr_active = true;
            this.mkr_time = 50;
        });

        mp.events.add('render', () => {
            if (this.mkr_active) {
                let pos = mp.players.local.position;
                mp.game.graphics.drawMarker(1, pos.x, pos.y, pos.z - 2.0, 0, 0, 0, 0, 0, 0, this.mkr_range, this.mkr_range, this.mkr_range, 245, 127, 39, 100, false, false, 0, false, null, null, false);
                this.mkr_time--;
                if (this.mkr_time <= 0) {
                    this.mkr_active = false;
                }
            }
        });
    }

    onReady() {
        this.callOnBrowser(`money=${_player2.default.money}`);
        this.callOnBrowser(`wanteds=${_player2.default.wanteds}`);
    }

    setMoney(money) {
        this.callOnBrowser(`money=${money}`);
    }

    displayChange() {
        this.displayState = !this.displayState;
        this.callOnBrowser(`state=${this.displayState}`);
    }

    setAirRadio(type) {
        this.callOnBrowser(`airRadioActiveType=${type}`);
    }

    setAirRadioState(state) {
        this.callOnBrowser(`airRadioActive=${state}`);
    }

    setBlackmoney(money) {
        this.callOnBrowser(`blackmoney=${money}`);
    }

    setWanteds(wanteds) {
        this.callOnBrowser(`wanteds=${wanteds}`);
    }

    setVoiceRadio(voiceRadio) {
        this.callOnBrowser(`voiceRadio=${voiceRadio}`);
    }

    setVoiceRadioActive(voiceRadioActive) {
        this.callOnBrowser(`voiceRadioActive=${voiceRadioActive}`);
    }

    playPPTSound() {
        this.callOnBrowser(`playPushToTalkSound()`);
    }

    setVoiceRadioActiveType(type) {
        this.callOnBrowser(`voiceRadioActiveType=${type}`);
    }

    setAduty(aduty) {
        this.callOnBrowser(`aduty=${aduty}`);
    }

    setEinreiseDuty(einreiseamtduty) {
        this.callOnBrowser(`einreiseamtduty=${einreiseamtduty}`);
    }

    executeDisplay(state) {
        this.callOnBrowser(`state=${state}`);
    }

    setTalking(state) {
        this.callOnBrowser(`talking=${state}`);
    }

    setNutritionEating(state) {
        this.callOnBrowser(`nutritionEating=${state}`);
    }

    setNutritionDrinking(state) {
        this.callOnBrowser(`nutritionDrinking=${state}`);
    }
}

exports.default = new PlayerPanel();

},{"../../components/component":106,"../../player/player":208}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerInfo extends _component2.default {
    constructor() {
        super('PlayerInfo');
    }

    onReady() {
        this.callOnBrowser(`setPlayerId(${_player2.default.playerId})`);
        this.callOnBrowser(`setVoiceHash("${_player2.default.voiceHash}")`);
    }

    setPlayerId(playerId) {
        this.callOnBrowser(`setPlayerId(${playerId})`);
    }

    setVoiceHash(voiceHash) {
        this.callOnBrowser(`setvoiceHash(${voiceHash})`);
    }
}

exports.default = new PlayerInfo();

},{"../../components/component":106,"../../player/player":208}],157:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerNotification extends _component2.default {
    constructor() {
        super("PlayerNotification");

        mp.events.add("sendPlayerNotification", (message, duration, color, title, bgcolor) => {
            if (_player2.default.phonelautlos == false) {
                mp.game.audio.playSoundFrontend(1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
            }
            this.callOnBrowser(`pushPlayerNotification('${message}', '${duration}', '${_player2.default.phonelautlos}', '${color}', '${title}', '${bgcolor}')`);
        });
    }
}

exports.default = new PlayerNotification();

},{"../../components/component":106,"../../player/player":208}],158:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Progressbar extends _component2.default {
    constructor() {
        super("Progressbar");

        mp.events.add("sendProgressbar", duration => {
            this.callOnBrowser(`setProgressbar('${duration}')`);
            _player2.default.progressbar = true;
        });
    }

    onEvent(name, ...args) {
        if (name == "StopProgressbar") {
            _player2.default.progressbar = false;
        }
    }
}

exports.default = new Progressbar();

},{"../../components/component":106,"../../player/player":208}],159:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RacingHud extends _component2.default {
    constructor() {
        super("RacingHud");

        mp.events.add("setRacingRounds", aktuelleRunde => {
            this.callOnBrowser(`setRacingRounds('${aktuelleRunde}')`);
        });

        mp.events.add("setRacingCheckpoint", aktuelleCP => {
            this.callOnBrowser(`setRacingCheckpoint('${aktuelleCP}')`);
        });

        mp.events.add("setRacingPosition", currentPos => {
            this.callOnBrowser(`setRacingPosition('${currentPos}')`);
        });

        mp.events.add("closeRacingHud", () => {
            this.callOnBrowser(`closeRacingHud()`);
        });

        mp.events.add("responseGetRacingHudData", (currentCheckpoint, maxCheckpoint, currentRunde, maxRunde, currentPlace) => {
            this.callOnBrowser(`responseGetRacingHudData('${currentCheckpoint}', '${maxCheckpoint}', '${currentRunde}','${maxRunde}','${currentPlace}')`);
        });
    }
}

exports.default = new RacingHud();

},{"../../components/component":106}],160:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ZoneWarning extends _component2.default {
    constructor() {
        super("ZoneWarning");

        mp.events.add("callZoneWarning", (title, text, duration) => {
            this.callOnBrowser(`showZoneWindow('${title}','${text}','${duration}')`);
        });
    }
}

exports.default = new ZoneWarning();

},{"../../components/component":106}],161:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ScreenHide extends _component2.default {
    constructor() {
        super("ScreenHide");

        mp.events.add('setHideState', state => {
            this.callOnBrowser(`setHideState(${state})`);
        });
    }
}

exports.default = new ScreenHide();

},{"../../components/component":106}],162:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _apps = require("../../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _callManage = require("../../apps/callManage");

var _callManage2 = _interopRequireDefault(_callManage);

var _home = require("../../apps/home");

var _home2 = _interopRequireDefault(_home);

var _phone = require("../../apps/phone");

var _phone2 = _interopRequireDefault(_phone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Smartphone extends _component2.default {
    constructor() {
        super("Smartphone");
    }

    showCallScreen() {
        this.callOnBrowser(`showCallScreen()`);
        _apps2.default.SmartphoneApp = "PhoneScreen";
        mp.gui.cursor.visible = false;
    }

    refreshSmartphone() {
        this.callOnBrowser(`refreshSmartphone()`);
    }

    onEvent(name, ...args) {
        if (name == "activateCursor") {
            mp.gui.cursor.visible = true;
        } else if (name == "cleanSmartphone") {
            _apps2.default.componentVisibleApp["Smartphone"] = null;
        } else if (name == "callDeclined") {
            _callManage2.default.declineCall();
            _home2.default.declineCall();
        } else if (name == "callAccepted") {
            _callManage2.default.acceptedCall();
        } else if (name == "micmute") {
            _callManage2.default.micmute();
        } else if (name == "getHomeScreen") {
            _phone2.default.getHomeScreen();
        } else if (name == "getHomeScreenCall") {
            _apps2.default.SmartphoneApp = "MainScreen";
            _home2.default.getHomeScreenCall();
            _phone2.default.getHomeScreenCall();
            mp.gui.cursor.visible = true;
        }
    }
}

exports.default = new Smartphone();

},{"../../app/apps":12,"../../apps/callManage":21,"../../apps/home":44,"../../apps/phone":62,"../../components/component":106}],163:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaskHint extends _component2.default {
    constructor() {
        super("TaskHint");

        mp.events.add('showTasksHint', (title, description) => {
            this.callOnBrowser(`showTasksHintMethod('${title}','${description}')`);
        });

        mp.events.add('hideTaskHint', () => {
            this.callOnBrowser(`hideTaskHint()`);
        });
    }
}

exports.default = new TaskHint();

},{"../../components/component":106}],164:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehiclePanel extends _component2.default {
    constructor() {
        super("VehiclePanel");

        this.count = 0;
        this.currentDistance = 0.0;
        this.currentFuelDistance = 0.0;
        this.currentInterval = null;
        this.speed = 0;
        this.engine = false;
        this.lock = false;
        this.tachoActive = false;
        this.isDriver = false;
        this.driverInterval = null;
        this.svehicle = null;

        mp.events.add("updateVehicleData", (newFuel, newDistance, newHealth, locked, engine) => {
            this.callOnBrowser(`fuel=${newFuel}`);
            this.callOnBrowser(`mileage=${newDistance}`);
            this.callOnBrowser(`health=${newHealth}`);
            this.callOnBrowser(`lock=${locked}`);
            this.callOnBrowser(`engine=${engine}`);
        });

        mp.events.add("initialVehicleData", (fuel, maxFuel, health, maxHealth, maxSpeed, locked, mileage, engine) => {
            this.callOnBrowser(`fuel=${fuel}`);
            this.callOnBrowser(`maxfuel=${maxFuel}`);
            this.callOnBrowser(`health=${health}`);
            this.callOnBrowser(`maxhealth=${maxHealth}`);
            this.callOnBrowser(`maxspeed=${maxSpeed}`);
            this.callOnBrowser(`lock=${locked}`);
            this.callOnBrowser(`mileage=${mileage}`);
            this.callOnBrowser(`engine=${engine}`);
        });

        mp.events.add("setNormalSpeed", (vehicle, speed) => {

            if (vehicle == null) return;
            this.callOnBrowser(`maxspeed=${speed * 1.2}`);
            speed = speed / 3.6;
            if (speed > 0) {
                vehicle.setMaxSpeed(speed);
            } else {
                vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model) * 1.609);
            }
            this.showTempomat(false);
            this.svehicle = null;
        });

        mp.events.add("playerEnterVehicle", (vehicle, seat) => {
            this.playerEnteredVehicle();
        });

        mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
            this.showTacho(false);

            if (this.currentInterval != null) {
                clearInterval(this.currentInterval);
                this.currentInterval = null;
            }
            if (this.driverInterval != null) {
                clearInterval(this.driverInterval);
                this.isDriver = false;
                this.driverInterval = null;
            }
        });
    }

    playerEnteredVehicle() {
        this.count = 0;
        this.currentDistance = 0.0;
        this.currentFuelDistance = 0.0;

        if (this.currentInterval != null) {
            clearInterval(this.currentInterval);
        }

        if (mp.players.local.__animationData !== undefined && mp.players.local.__animationData != null) {
            if (mp.players.local.__animationData.Active == true) {
                mp.players.local.__animationData.Active = false;
                mp.players.local.stopAnim(mp.players.local.__animationData.AnimationName, mp.players.local.__animationData.AnimationDict, mp.players.local.__animationData.AnimationSpeed);
            }
        }

        this.driverInterval = setInterval(() => {
            let Player = mp.players.local;
            let Vehicle = mp.players.local.vehicle;
            if (_player2.default.isInAnyVehicle(false) && Vehicle !== null && Vehicle.getPedInSeat(-1) == Player.handle) {
                this.isDriver = true;
            } else {
                this.isDriver = false;
            }
        }, 400);

        this.currentInterval = setInterval(() => {
            let vehicle = mp.players.local.vehicle;
            if (vehicle != null) {

                let engineStatus = vehicle.getVariable("engineStatus");
                let lockedStatus = vehicle.getVariable("lockedStatus");

                if (!this.tachoActive) {
                    this.showTacho(true);
                }
                let speed = vehicle.getSpeed();
                speed = speed * 3.6;

                if (this.speed != speed) {
                    var noDistance = false;

                    if (speed == 0) {
                        speed = 0;
                        noDistance = true;
                    }

                    let currentSpeed = speed;
                    currentSpeed /= 60.0;
                    currentSpeed /= 60.0;
                    currentSpeed /= 4.0;

                    this.currentFuelDistance += currentSpeed * (speed / 50.0);

                    let newSpeed = vehicle.getSpeed();

                    if (!noDistance) {
                        this.currentDistance += newSpeed;
                    }
                    this.setSpeed(Math.round(speed));
                    this.count++;
                }

                this.setEngine(engineStatus);
                this.setLocked(lockedStatus);

                if (this.count >= 100) {
                    this.currentDistance = this.currentDistance / 1000;
                    this.currentDistance = this.currentDistance / 100 * 2;
                    this.sendAndReset(vehicle);
                    this.count = 0;
                }
            } else {
                if (this.tachoActive) {
                    this.showTacho(false);
                }
            }
        }, 33);
    }

    sendAndReset(veh) {
        if (this.currentDistance > 0.001 && veh != null) {
            mp.events.callRemote("updateVehicleDistance", veh.remoteId, Number(this.currentDistance.toFixed(3)), Number(this.currentFuelDistance.toFixed(3)), "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");

            this.currentDistance = 0;
            this.currentFuelDistance = 0;
        }
    }

    showTacho(activeTacho) {
        this.tachoActive = activeTacho;
        this.callOnBrowser(`activeTacho=${activeTacho ? "true" : "false"}`);
    }

    setEngine(engine) {
        this.engine = engine;
        this.callOnBrowser(`engine=${engine}`);
    }
    setLocked(lock) {
        this.lock = lock;
        this.callOnBrowser(`lock=${lock}`);
    }

    showTempomat(tempo) {
        this.callOnBrowser(`tempomat=${tempo ? "true" : "false"}`);
    }

    requestNormalSpeed(vehicle) {
        mp.events.callRemote("requestNormalSpeed", vehicle.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    tempomat() {
        var lvehicle = mp.players.local.vehicle;
        if (lvehicle == null) return;
        if (mp.players.local.handle == lvehicle.getPedInSeat(-1)) {
            if (this.svehicle == lvehicle) {
                this.requestNormalSpeed(lvehicle);
            } else {
                if (lvehicle.getSpeed() > 5) {
                    this.svehicle = lvehicle;
                    lvehicle.setMaxSpeed(lvehicle.getSpeed());
                    this.callOnBrowser(`maxspeed=${lvehicle.getSpeed()}`);
                    this.showTempomat(true);
                }
            }
        }
    }

    setSpeed(speed) {
        this.speed = speed;
        this.callOnBrowser(`speed=${Math.round(speed * 1.20)}`);
        //this.execute(`maxspeed=300`)
        //this.execute(`responseVehicleSpeed(${speed})`)
    }
}

exports.default = new VehiclePanel();

},{"../../components/component":106,"../../player/player":208}],165:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _vehicleModule = require("../../vehicle/vehicle-module");

var _vehicleModule2 = _interopRequireDefault(_vehicleModule);

var _flatbed = require("../../vehicle/flatbed");

var _flatbed2 = _interopRequireDefault(_flatbed);

var _peds = require("../../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _raycast = require("../../raycast/raycast");

var _raycast2 = _interopRequireDefault(_raycast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class XMenu extends _component2.default {
    constructor() {
        super("XMenu");
        this.visible = false;
    }

    setItems(items) {
        if (items == null) {
            return;
        }

        this.visible = items.length > 0;
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`);
        if (this.visible) {
            mp.gui.cursor.visible = true;
        } else {
            mp.gui.cursor.visible = false;
        }
    }

    // Get menu items
    getItems() {
        if (_player2.default.isInAnyVehicle(false)) {
            return _vehicleModule2.default.getVehicleItems();
        } else {
            let obj = _raycast2.default.createRaycast();

            if (obj != null) {
                let distance = _player2.default.getDistance(obj.position);

                if (obj.entity.isAVehicle()) {
                    if (!distance || distance < 0 || distance > 3) {
                        return;
                    }

                    return _vehicleModule2.default.getVehicleItems();
                } else if (obj.entity.isAPed()) {

                    if (!distance || distance < 0 || distance > 2) {
                        return;
                    }

                    //Zinken on Cayo
                    if (_player2.default.onCayoIsland) {
                        return _peds2.default.getPlayerMenuItems();
                    } else {
                        return _peds2.default.getPlayerMenuItems().filter(x => x.id != 'REQUEST_PEDS_PLAYER_ZINKEN');
                    }
                }
            }

            return null;
        }
    }

    switchDpos;

    // Call server function
    onEvent(name, ...args) {
        if (name == "select") {
            // In vehicle
            if (_player2.default.isInAnyVehicle(false)) {
                if (args[0].id == "donothing") {
                    return;
                } else if (args[0].arg == "dposclient") {
                    _flatbed2.default.xmenuswitch(args[0].itemId);
                    return;
                } else if (args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                    mp.events.callRemote(args[0].itemId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    return;
                } else if (args[0].itemId == "LOCAL_ACTION") {
                    if (args[0].arg == "RadioOff") mp.game.audio.setRadioToStationName("OFF");
                    return;
                } else mp.events.callRemote(args[0].itemId, args[0].arg, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
            // Not in vehicle
            else {
                    let obj = _raycast2.default.createRaycast();
                    if (obj == null) return;

                    if (args[0].id == "donothing") {
                        return;
                    } else if (args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                        mp.events.callRemote(args[0].itemId, obj.entity.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    } else mp.events.callRemote(args[0].itemId, obj.entity.remoteId, args[0].arg, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                }
        }
    }
}

exports.default = new XMenu();

},{"../../components/component":106,"../../peds/peds":202,"../../player/player":208,"../../raycast/raycast":224,"../../vehicle/flatbed":229,"../../vehicle/vehicle-module":231}],166:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IdCard extends _component2.default {
    constructor() {
        super("IdCard");

        mp.events.add("showPerso", (firstname, lastname, birthday, address, level, id, casino, govLevel) => {
            if (_player2.default.cduty && casino >= 1) {
                if (casino == 1) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '1', '')`);
                } else if (casino == 2) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '2', '')`);
                } else if (casino == 3) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '3', '')`);
                } else if (casino == 4) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '4', '')`);
                }
            } else {
                this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '0', '${govLevel}')`);
            }
        });
        mp.events.add("showDienstausweis", (behoerde, dienstnummer, casino, fistname, lastname, cduty, govLevel) => {
            if (_player2.default.cduty && casino >= 1) {
                if (casino == 1) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 2) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 3) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 4) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '0', '')`);
                    }
                }
            } else {
                if (cduty == 1) {
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '1', '${govLevel}')`);
                } else {
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '0', '${govLevel}')`);
                }
            }
        });
    }
}

exports.default = new IdCard();

},{"../../components/component":106,"../../player/player":208}],167:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InputWindow extends _window2.default {
    constructor() {
        super("TextInputBox");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        if (name == "setblur") {
            mp.game.graphics.transitionToBlurred(250);
        }
    }

    onReady() {
        this.callOnBrowser(`setProfile('${_player2.default.phone}','${_player2.default.money}')`);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new InputWindow();

},{"../../player/player":208,"../../windows/window":234}],168:[function(require,module,exports){
"use strict";

require("./input-window");

},{"./input-window":167}],169:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InsuranceWindow extends _window2.default {
    constructor() {
        super("Insurance");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new InsuranceWindow();

},{"../../windows/window":234}],170:[function(require,module,exports){
'use strict';

require('./login/login');

require('./register/register');

require('./bann/bann');

require('./kick/kick');

require('./hud/hud');

require('./hud/menu');

require('./hud/x-menu');

require('./hud/n-menu');

require('./hud/vehicle-panel');

require('./hud/help-panel');

require('./hud/player-panel');

require('./hud/globalnotification');

require('./hud/playernotification');

require('./hud/progressbar');

require('./inventory/inventory');

require('./workstation/workstation');

require('./vehiclerent/vehiclerent');

require('./buslinien/buslinien');

require('./petbuy/petbuy');

require('./ejectwindow/ejectwindow');

require('./shopikea/ShopIkeaWindow');

require('./bank/bank');

require('./methlab/methlab');

require('./heroinlab/heroinlab');

require('./cannabislab/cannabislab');

require('./flyer/flyer');

require('./garage/garage');

require('./id-card/id-card');

require('./licenses/licenses');

require('./shop/shop');

require('./insurance/insurance');

require('./chat/chat');

require('./giveMoney/giveMoney');

require('./confirm/confirm');

require('./input/input');

require('./character-creator/character-creator');

require('./keys/keys');

require('./death/death');

require('./frisk/frisk');

require('./tattoo/tattoo');

require('./carshop/carshop');

require('./hud/gangwar');

require('./hud/fishing');

require('./hud/buildMenu');

require('./hud/screenHide');

require('./hud/paintball');

require('./hud/infocard');

require('./hud/smartphone');

require('./barber/barber');

require('./casino/slotmachine');

require('./hud/nutrition');

require('./clothing-shop/clothing-shop');

require('./tattoo-license/tattoo-license');

require('./wardrobe/wardrobe');

require('./animation/animation-wheel-favorites-list-window');

require('./rims/rims');

require('./tuning/tuning');

require('./adminmenu/adminmenu');

require('./hud/bus');

require('./jobs/jobs');

require('./paymentMethods/paymentMethods-window');

require('./racing/racing');

require('./racing/racingloading');

require('./hud/racinghud');

require('./paintball/paintballwindow');

require('./heists/heists');

require('./hud/restrictedZone');

require('./hud/taskHint');

},{"./adminmenu/adminmenu":109,"./animation/animation-wheel-favorites-list-window":110,"./bank/bank":112,"./bann/bann":114,"./barber/barber":115,"./buslinien/buslinien":116,"./cannabislab/cannabislab":118,"./carshop/carshop":120,"./casino/slotmachine":121,"./character-creator/character-creator":122,"./chat/chat":124,"./clothing-shop/clothing-shop":125,"./confirm/confirm":127,"./death/death":129,"./ejectwindow/ejectwindow":130,"./flyer/flyer":132,"./frisk/frisk":134,"./garage/garage":136,"./giveMoney/giveMoney":138,"./heists/heists":139,"./heroinlab/heroinlab":141,"./hud/buildMenu":143,"./hud/bus":144,"./hud/fishing":145,"./hud/gangwar":146,"./hud/globalnotification":147,"./hud/help-panel":148,"./hud/hud":149,"./hud/infocard":150,"./hud/menu":151,"./hud/n-menu":152,"./hud/nutrition":153,"./hud/paintball":154,"./hud/player-panel":155,"./hud/playernotification":157,"./hud/progressbar":158,"./hud/racinghud":159,"./hud/restrictedZone":160,"./hud/screenHide":161,"./hud/smartphone":162,"./hud/taskHint":163,"./hud/vehicle-panel":164,"./hud/x-menu":165,"./id-card/id-card":166,"./input/input":168,"./insurance/insurance":169,"./inventory/inventory":172,"./jobs/jobs":173,"./keys/keys":174,"./kick/kick":176,"./licenses/licenses":177,"./login/login":179,"./methlab/methlab":181,"./paintball/paintballwindow":182,"./paymentMethods/paymentMethods-window":183,"./petbuy/petbuy":184,"./racing/racing":185,"./racing/racingloading":186,"./register/register":188,"./rims/rims":189,"./shop/shop":190,"./shopikea/ShopIkeaWindow":191,"./tattoo-license/tattoo-license":192,"./tattoo/tattoo":194,"./tuning/tuning":195,"./vehiclerent/vehiclerent":196,"./wardrobe/wardrobe":197,"./workstation/workstation":198}],171:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InventoryWindow extends _window2.default {
    constructor() {
        super("Inventory");
        /*this.forwardableEvents.add("setInventoryItems")*/
        this.setCurserVisible(true);

        this.forwardableEvents.add('responseInventoryClothes');
    }
}

exports.default = new InventoryWindow();

},{"../../windows/window":234}],172:[function(require,module,exports){
"use strict";

require("./inventory-window");

},{"./inventory-window":171}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Jobs extends _window2.default {
    constructor() {
        super('JobWindow');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new Jobs();

},{"../../windows/window":234}],174:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Keys extends _window2.default {
    constructor() {
        super("Keys");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new Keys();

},{"../../windows/window":234}],175:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KickWindow extends _window2.default {
    constructor() {
        super("Kick");
    }
}

exports.default = new KickWindow();

},{"../../windows/window":234}],176:[function(require,module,exports){
"use strict";

require("./kick-window");

},{"./kick-window":175}],177:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Licenses extends _component2.default {
    constructor() {
        super("Licenses");

        mp.events.add("showLicense", (name, firstaid, gunlicense, driverlicense, trucklicense, motorcyclelicense, boatlicense, flyinglicensea, flyinglicenseb, taxilicense, passengertransportlicense, lawyerlicense, registryofficelicense, gwd, zwd) => {
            this.callOnBrowser(`showLic('${name}', '${firstaid}', '${gunlicense}', '${driverlicense}', '${trucklicense}', '${motorcyclelicense}', '${boatlicense}', '${flyinglicensea}', '${flyinglicenseb}', '${taxilicense}', '${passengertransportlicense}', '${lawyerlicense}', '${registryofficelicense}', '${gwd}', '${zwd}')`);
        });
    }
}

exports.default = new Licenses();

},{"../../components/component":106}],178:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoginWindow extends _window2.default {
    constructor() {
        super("Login");
        this.forwardableEvents.add("status");
        this.setCurserVisible(true);
        this.setHudVisible(false);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case "rank":
                _player2.default.rank = args[0];
                return;
        }
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
    }
}

exports.default = new LoginWindow();

},{"../../player/player":208,"../../windows/window":234}],179:[function(require,module,exports){
"use strict";

require("./login-window");

},{"./login-window":178}],180:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MethLaborWindow extends _window2.default {
    constructor() {
        super("MethLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new MethLaborWindow();

},{"../../windows/window":234}],181:[function(require,module,exports){
"use strict";

require("./methlab-window");

},{"./methlab-window":180}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaintballWindow extends _window2.default {
    constructor() {
        super('PaintballWindow');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new PaintballWindow();

},{"../../windows/window":234}],183:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentMethodsWindow extends _window2.default {
    constructor() {
        super('PaymentMethods');

        this.setCurserVisible(true);
    }
}

exports.default = new PaymentMethodsWindow();

},{"../../windows/window":234}],184:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PetBuyWindow extends _window2.default {
    constructor() {
        super("PetBuy");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new PetBuyWindow();

},{"../../windows/window":234}],185:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Racing extends _window2.default {
    constructor() {
        super('Racing');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseGetRacingData');
    }

}

exports.default = new Racing();

},{"../../windows/window":234}],186:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RacingLoadingScreen extends _window2.default {
    constructor() {
        super('RacingLoadingScreen');

        this.setCurserVisible(false);
        this.setChatVisible(false);
    }

}

exports.default = new RacingLoadingScreen();

},{"../../windows/window":234}],187:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegisterWindow extends _window2.default {
    constructor() {
        super("Register");
    }
}

exports.default = new RegisterWindow();

},{"../../windows/window":234}],188:[function(require,module,exports){
"use strict";

require("./register-window");

},{"./register-window":187}],189:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RimsWindow extends _window2.default {
    constructor() {
        super('Rims');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseTuningRims');
        this.forwardableEvents.add('responseTuningCategoryRims');
    }
}

exports.default = new RimsWindow();

},{"../../windows/window":234}],190:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopWindow extends _window2.default {
    constructor() {
        super("Shop");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new ShopWindow();

},{"../../windows/window":234}],191:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopIkeaWindow extends _window2.default {

    constructor() {
        super('ShopIkea');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.currentVisibleItem = null;
        this.currentInterval = null;

        this.camPos = new mp.Vector3(61.7627, -1764.77, -57.5665);
    }

    onEvent(name, ...args) {
        if (name == "ikeaPreview") {

            if (this.currentVisibleItem !== undefined && mp.objects.exists(this.currentVisibleItem)) this.currentVisibleItem.destroy();

            this.currentVisibleItem = mp.objects.new(args[0], new mp.Vector3(62.096, -1758.38, -58.5665), {
                rotation: new mp.Vector3(0, 0, 177.898),
                alpha: 255,
                dimension: mp.players.local.dimension
            });
        }
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.createCam();
        if (this.currentVisibleItem !== undefined && mp.objects.exists(this.currentVisibleItem)) this.currentVisibleItem.destroy();

        this.currentInterval = setInterval(() => {
            if (this.currentVisibleItem !== undefined && mp.objects.exists(this.currentVisibleItem)) {
                let currentRotation = this.currentVisibleItem.getRotation(2);
                let zcoord = currentRotation.z;

                zcoord = zcoord + 1.0;

                this.currentVisibleItem.setRotation(0, 0, zcoord, 2, true);
            }
        }, 10);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        clearInterval(this.currentInterval);
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    createCam() {
        _bodyCamera2.default.createBodyCamera2(this.camPos, new mp.Vector3(0, 0, -5.55727));
    }
}

exports.default = new ShopIkeaWindow();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],192:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TattooLicenseShopWindow extends _window2.default {
    constructor() {
        super('TattooLicenseShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseLicenseShopZoneLicenses');
    }
}

exports.default = new TattooLicenseShopWindow();

},{"../../windows/window":234}],193:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TattooWindow extends _window2.default {
    constructor() {
        super('TattooShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseTattooShopCategory');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'resetTattoos':
                this.resetTattoos();

                break;
            case 'rotate':
                this.setHeading(args[0]);

                break;
            case 'zoneSelected':
                this.zoneSelected(args[0]);

                break;
        }
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3);

        _bodyCamera2.default.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z));
        _bodyCamera2.default.pointBodyCameraAt(player.position);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Move the camera to a specific region according to zoneId.
     *
     * @param zoneId
     */
    zoneSelected(zoneId) {
        let player = mp.players.local,
            targetPositionFly,
            targetPositionPoint,
            offset;

        switch (zoneId) {
            case 0:
                // TORSO
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.2);

                break;
            case 1:
                // HEAD
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.5);

                break;
            case 2:
                // LEFT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = player.position;

                break;
            case 3:
                // RIGHT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() - 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = player.position;

                break;
            case 4:
                // LEFT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z - 0.6);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.6);

                break;
            case 5:
                // RIGHT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() - 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z - 0.6);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.6);

                break;
            // case 6: Not used.
            // case 7: Not used.
            case 8:
                // BACK
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 180, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.2);

                break;
            case 9:
                // HAIR
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.5);

                break;
            default:
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
                targetPositionPoint = player.position;
                break;
        }

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Reset player tattoos.
     */
    resetTattoos() {
        mp.players.local.clearDecorations();
    }

    /**
     * Set player heading.
     *
     * @param heading
     */
    setHeading(heading) {
        mp.players.local.setHeading(parseInt(heading));
    }

    /**
     * Get offset with rotation.
     *
     * @param x
     * @param y
     * @param rot
     * @param distance
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rot, distance) {
        return {
            x: x + Math.sin(-rot * Math.PI / 180) * distance,
            y: y + Math.cos(-rot * Math.PI / 180) * distance
        };
    }
}

exports.default = new TattooWindow();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],194:[function(require,module,exports){
"use strict";

require("./tattoo-window");

},{"./tattoo-window":193}],195:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _peds = require('../../peds/peds');

var _peds2 = _interopRequireDefault(_peds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TuningWindow extends _window2.default {
    constructor() {
        super('Tuning');

        this.setCurserVisible(true);
        this.setChatVisible(false);
        this.forwardableEvents.add('responseTuningModlist');
    }

    onEvent(name, ...args) {
        if (name === 'cursor') {
            this.setCurserVisible(args[0][0]);
        }
        if (name === 'getMaxIndex') {

            _peds2.default.disableAllControls(false);
            _peds2.default.disabledAll = false;

            var pushi = JSON.parse(args[0][0]);
            var veh = mp.vehicles.atRemoteId(args[0][1]);
            pushi.forEach(x => {
                x.oldval = x.index;
                x.maxindex = veh != null ? veh.getNumMods(x.id) : 100;
            });
            this.callOnBrowser(`responseListMods('${JSON.stringify(pushi)}')`);
        }
    }
}

exports.default = new TuningWindow();

},{"../../peds/peds":202,"../../windows/window":234}],196:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleRentWindow extends _window2.default {
    constructor() {
        super("VehicleRent");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new VehicleRentWindow();

},{"../../windows/window":234}],197:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WardrobeWindow extends _window2.default {
    constructor() {
        super('Wardrobe');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseWardrobeClothesCategories');
        this.forwardableEvents.add('responseWardrobeClothes');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'moveCam':
                this.moveCam(args[0].offset, args[0].slot, args[0].isX, args[0].isY);

                break;
            case 'zoomToSlot':
                this.zoomToSlot(args[0].slot, args[0].isY);

                break;
            case 'zoomOut':
                this.toInitialZoom();

                break;
        }
    }

    /**
     * Calculates important movement data for given params.
     *
     * @param slot Which slot should be in focus?
     * @param isY  If true, right side will be in focus
     *
     * @returns {{distance: number, heading: number, camPos: {z: *}, pointPos: {z: *}}}
     */
    getMovementData(slot, isY) {
        let player = mp.players.local,
            data = {
            heading: player.getHeading(),
            distance: 1,
            camPos: {
                z: player.position.z
            },
            pointPos: {
                z: player.position.z
            }
        };

        switch (slot) {
            case '1':
                // Mask
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case '3':
                // Body
                data.distance = 3;

                break;
            case '4':
                // Legs
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.6;

                break;
            case '5':
                // Backpack
                data.heading += 180;
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case '6':
                // Shoes
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.8;

                break;
            case '7': // Accessories
            case '8': // Undershirts
            case '11':
                // Tops
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case 'p-0':
                // Hat
                data.heading += 180;
                data.distance = 2;

                data.camPos.z += 1;
                data.pointPos.z += 0.5;

                break;
            case 'p-1':
                // Glasses
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-2':
                // Ears
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-6': // Watch
            case 'p-7':
                // Wrist
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.3;
                data.pointPos.z -= 0.1;

                break;
        }

        return data;
    }

    /**
     * Moves the Camera to a given slot.
     *
     * @param slot Which slot should be in focus?
     * @param isY If true, right side will be used.
     */
    zoomToSlot(slot, isY) {
        let data = this.getMovementData(slot, isY);

        _bodyCamera2.default.flyBodyCameraWithFixedParams(data.heading, data.distance, data.camPos.z, data.pointPos.z);
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     * @param slot Slot in focus
     * @param isX Is slot in focus?
     * @param isY Is slots right side in focus?
     */
    moveCam(heading, slot, isX, isY) {
        if ((isX || isY) && slot !== null) {
            let data = this.getMovementData(slot, isY);

            _bodyCamera2.default.rotateBodyCameraWithFixedParams(heading, data.distance, data.camPos.z, data.pointPos.z);

            return;
        }

        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 3, 0);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 3, 0);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }
}

exports.default = new WardrobeWindow();

},{"../../utils/bodyCamera":225,"../../windows/window":234}],198:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkstationWindow extends _window2.default {
    constructor() {
        super("Workstation");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new WorkstationWindow();

},{"../../windows/window":234}],199:[function(require,module,exports){
"use strict";

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

var _xMenu = require("../interfaces/hud/x-menu");

var _xMenu2 = _interopRequireDefault(_xMenu);

var _VehicleEnter = require("../vehicle/VehicleEnter");

var _VehicleEnter2 = _interopRequireDefault(_VehicleEnter);

var _playerPanel = require("../interfaces/hud/player-panel");

var _playerPanel2 = _interopRequireDefault(_playerPanel);

var _nMenu = require("../interfaces/hud/n-menu");

var _nMenu2 = _interopRequireDefault(_nMenu);

var _antiafk = require("../interfaces/hud/antiafk");

var _antiafk2 = _interopRequireDefault(_antiafk);

var _menu = require("../interfaces/hud/menu");

var _menu2 = _interopRequireDefault(_menu);

var _vehiclePanel = require("../interfaces/hud/vehicle-panel");

var _vehiclePanel2 = _interopRequireDefault(_vehiclePanel);

var _raycast = require("../raycast/raycast");

var _raycast2 = _interopRequireDefault(_raycast);

var _rappel = require("../vehicle/rappel");

var _rappel2 = _interopRequireDefault(_rappel);

var _objects = require("../rage11/objects");

var _objects2 = _interopRequireDefault(_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

mp.events.add("VisibleWindowBug", () => {
    _windows2.default.visibleWindow = null;
    if (_player2.default.chatFlag) _player2.default.setPlayerChatFlag(false);
}); //Keycodes: https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731

let airArrowDown = false;

// Push to talk
let arrowDown = false;

let switchSeatTimer = 0;

// Key Events
mp.keys.bind(0x45, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured) return;
    //if (new Date(player.lastInteractE.getTime() + 2500) > new Date()) return

    const vehicleEnter = new _VehicleEnter2.default();

    let garbagevehicle = vehicleEnter.getClosestGarbageVehicleInRange(10);

    if (garbagevehicle !== null) {
        if (vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_dside_r1'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_pside_r1'))) < 2) {
            mp.events.callRemote("Pressed_E_Garbage_Vehicle", garbagevehicle.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        }
    }
    let forPressVehicle = vehicleEnter.getClosestSingleVehicleInRange(10);

    if (forPressVehicle !== null) {
        if (vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('door_dside_r'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('door_pside_r'))) < 2) {
            mp.events.callRemote("Pressed_E_Vehicle_Trunk", forPressVehicle.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        } else if (vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('exhaust'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('exhaust_2'))) < 2) {
            mp.events.callRemote("Pressed_E_Vehicle_Trunk", forPressVehicle.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        }
    }

    // getobjects.getBin()
    mp.events.callRemoteUnreliable("Pressed_E", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    mp.gui.chat.push("Pressed_E");
    checkInterval();
});

// Pressed L
mp.keys.bind(0x4c, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;

    // ALT + L
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemoteUnreliable("Pressed_ALT_L", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        mp.gui.chat.push("Pressed_ALT_L");
    } else {
        mp.events.callRemoteUnreliable("Pressed_L", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        mp.gui.chat.push("Pressed_L");
    }
    checkInterval();
});

// F2 handy
mp.keys.bind(0x71, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || !_player2.default.allowHandy || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    //Bug beim Einsteigen und Handy zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }

    if (_apps2.default.componentVisibleApp["Smartphone"] != null) {
        mp.events.callRemoteUnreliable("Keks", false, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    } else {
        mp.events.callRemoteUnreliable("Keks", true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    checkInterval();
});

// F3 Computer
mp.keys.bind(0x72, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    //Bug beim Einsteigen und Laptop zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }

    if (_apps2.default.componentVisibleApp["Computer"] === "ComputerMainScreen") {
        mp.events.callRemoteUnreliable("closeComputer", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    } else {
        mp.events.callRemoteUnreliable("computerCheck", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    checkInterval();
});

// F5 Animations Menü
mp.keys.bind(0x74, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    mp.events.callRemoteUnreliable("openAnimationMenu", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
});
// F6
mp.keys.bind(0x75, false, () => {
    mp.events.callRemote("showNutrition", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    _playerPanel2.default.displayChange();
});

// F9 Ipad
mp.keys.bind(0x78, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || !_player2.default.allowHandy) return;

    if (_apps2.default.componentVisibleApp["Ipad"] === "IpadMainScreen") {
        mp.events.callRemote("closeComputer", 2, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    } else {
        mp.events.callRemote("computerCheck", 2, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    checkInterval();
});

// F12 0x7B
mp.keys.bind(0x7B, false, () => {
    if (_player2.default.chatFlag) return;

    if (_windows2.default.visibleWindow == "AdminMenu") {
        mp.events.callRemoteUnreliable("closeAdminMenu", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    } else {
        mp.events.callRemoteUnreliable("openAdminMenu", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    checkInterval();
});

// F7 Screenshot
mp.keys.bind(0x76, false, () => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hours = today.getHours();
    var currentDay = 'gvmp-' + day + '-' + month + '-' + year + '-' + hours + '-' + minutes + '-' + seconds;
    mp.gui.takeScreenshot(currentDay + '.png', 1, 100, 0);
    mp.game.graphics.notify("Screenshot erstellt.");
    checkInterval();
});

// I Inventory show
mp.keys.bind(0x49, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemoteUnreliable("requestInventory", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
});

// Y Key
mp.keys.bind(0x59, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("changeVoiceRange", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// T Key
mp.keys.bind(0x54, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    _windows2.default.show('Chat');
    mp.gui.cursor.visible = true;
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
});

// X-Menu
let xDown = false;

mp.keys.bind(0x58, true, () => {
    if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null) return;
    if (!xDown) {
        xDown = true;
        let xMenuItems = _xMenu2.default.getItems();
        _xMenu2.default.setItems(xMenuItems);
    }
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        clearAFK();
    }
});

mp.keys.bind(0x58, false, () => {
    if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null) return;
    _xMenu2.default.setItems([]);
    xDown = false;
    clearAFK();
});

// Pfeil Rechts/Links
mp.keys.bind(0x27, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("nextInteractionAnim", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
});
mp.keys.bind(0x25, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("prevInteractionAnim", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
});

// Push to Talk
mp.keys.bind(0x28, true, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.state !== 1) return;
    if (!arrowDown) {
        arrowDown = true;
        setTimeout(function () {
            _playerPanel2.default.playPPTSound();
        }, 1000);
        _playerPanel2.default.setVoiceRadioActive(true);
        _playerPanel2.default.setVoiceRadioActiveType(2);
        mp.events.callRemote("changeSettings", 2, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
    checkInterval();
});

mp.keys.bind(0x28, false, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || !arrowDown) return;
    arrowDown = false;
    _playerPanel2.default.setVoiceRadioActiveType(1);
    mp.events.callRemote("changeSettings", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    clearAFK();
});

// Push to Talk AIR
mp.keys.bind(0x26, true, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"]) return;
    if (!airArrowDown) {
        airArrowDown = true;
        mp.events.callRemote("changeAirFunk", 2, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
    checkInterval();
});

mp.keys.bind(0x26, false, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || !airArrowDown) return;
    airArrowDown = false;
    mp.events.callRemote("changeAirFunk", 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    clearAFK();
});

// Object editor

// 6 (RIGHT)
mp.keys.bind(0x66, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.x += _player2.default.buildingspeed;
        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 4 (LINKS)
mp.keys.bind(0x64, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.x -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 8 (VOR)
mp.keys.bind(0x68, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.y += _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 2 (ZURÜCK)
mp.keys.bind(0x62, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.y -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 7 (DREHEN+)
mp.keys.bind(0x67, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.rot.z += _player2.default.buildingspeed * 5;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 9 (DREHEN-)
mp.keys.bind(0x69, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.rot.z -= _player2.default.buildingspeed * 5;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 1 (hoch)
mp.keys.bind(0x61, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.z += _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 3 (runter)
mp.keys.bind(0x63, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.z -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 0 Bestätigen
mp.keys.bind(0x60, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        mp.events.callRemote("objed_saveobject", _player2.default.buildingobject.hash, _player2.default.buildingobject.pos.x, _player2.default.buildingobject.pos.y, _player2.default.buildingobject.pos.z, _player2.default.buildingobject.rot.x, _player2.default.buildingobject.rot.y, _player2.default.buildingobject.rot.z, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
});

// 0 close
mp.keys.bind(0x2E, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        mp.events.callRemote("objed_close", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }
});

// - speed 
mp.keys.bind(0x6D, true, () => {
    if (_player2.default.buildingmode === true) {
        _player2.default.buildingspeed -= 0.1;
        mp.game.graphics.notify("Building Speed verringert. (Aktuell " + _player2.default.buildingspeed + ")");
    }
});

// + speed 
mp.keys.bind(0x6B, true, () => {
    if (_player2.default.buildingmode === true) {
        _player2.default.buildingspeed += 0.1;
        mp.game.graphics.notify("Building Speed erhöht. (Aktuell " + _player2.default.buildingspeed + ")");
    }
});

// Pressed K
mp.keys.bind(0x4b, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemote("Pressed_K", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    mp.gui.chat.push("Pressed_K");
    checkInterval();
});

// U
mp.keys.bind(0x55, false, () => {
    if (mp.players.local.vehicle == null || _windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    _vehiclePanel2.default.tempomat();
});

//G key
mp.keys.bind(0x47, true, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _windows2.default.visibleWindow != null) return;

    const vehicleEnter = new _VehicleEnter2.default();

    if (mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle) {
        //For further USE SWITCH SEATS need to push Seat to server
        /*
        if (switchSeatTimer == 0 || (Date.now() - switchSeatTimer) >= 3000)
        for (let seat = -1; seat < 10; seat++) {
            if (mp.players.local.vehicle.getPedInSeat(seat) === mp.players.local.handle) {
                if (seat % 2 == 0) {
                    if (mp.players.local.vehicle.isSeatFree(seat - 1)) {
                        mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                        switchSeatTimer = Date.now();
                    }
                } else {
                    mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                    switchSeatTimer = Date.now();
                }
                break;
            }
        }
        */

    } else {

        const vehicleList = vehicleEnter.getClosestVehiclesInRange(10);

        if (vehicleList.length <= 0) {
            return;
        }

        let lowestDistanceToSeat = 100;
        let closest = null;
        let closestSeat = -1;

        for (var i = 0; i < vehicleList.length; i++) {
            const seatData = vehicleEnter.getClosestVehicleSeat(vehicleList[i]);

            if (seatData["distance"] == null) {
                continue;
            }
            if (seatData["seat"] == null || seatData["seat"] === -1) {
                continue;
            }

            if (seatData["distance"] < lowestDistanceToSeat) {
                closest = vehicleList[i];
                closestSeat = seatData["seat"];
                lowestDistanceToSeat = seatData['distance'];
            }
        }

        if (closest == null || closestSeat == -1 || lowestDistanceToSeat > 4) return;

        vehicleEnter.enter(closest, closestSeat);
    }
    checkInterval();
});

//F
mp.keys.bind(0x46, true, () => {
    checkInterval();
});

// H handsup
mp.keys.bind(0x48, false, () => {
    if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    mp.events.callRemoteUnreliable("Pressed_H", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// J salute
mp.keys.bind(0x4A, false, () => {
    if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    if (mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle.isSirenOn()) {
        mp.events.callRemoteUnreliable("Silent_Sirene", mp.players.local.vehicle.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    } else {
        mp.events.callRemoteUnreliable("Pressed_J", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    checkInterval();
});

//B key
mp.keys.bind(0x42, true, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;

    if (!_player2.default.isInAnyVehicle() && mp.players.local.weapon !== mp.game.joaat('weapon_unarmed')) {
        let obj = _raycast2.default.createRaycast();
        if (obj != null) {
            if (obj != null && obj.entity.isAPed()) {
                mp.events.callRemoteUnreliable("Pessed_B_Aiming", obj.entity.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        }
    }

    checkInterval();
});

mp.keys.bind(0x42, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;
    clearAFK();
});

// F6 - Voice Settings
mp.keys.bind(0x75, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null) return;
    _player2.default.openVoiceSettings = true;
    mp.events.callRemote("openVoiceSettings", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
});

mp.keys.bind(0x2D, false, () => {
    if (!checkShortCut(2000)) return;
    mp.events.callRemoteUnreliable("aains", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    _player2.default.shortCutBeingUsed = Date.now();
});

// Num 0
mp.keys.bind(0x60, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_0", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 1
mp.keys.bind(0x61, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_1", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 2
mp.keys.bind(0x62, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_2", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 3
mp.keys.bind(0x63, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_3", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 4
mp.keys.bind(0x64, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_4", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 6
mp.keys.bind(0x66, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_6", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 7
mp.keys.bind(0x67, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_7", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 8
mp.keys.bind(0x68, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_8", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

// Num 9
mp.keys.bind(0x69, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_9", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    checkInterval();
});

//M key
mp.keys.bind(0x4D, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_M", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    mp.gui.chat.push("Pressed_M");
    checkInterval();
});

let nDown = false;

// N Menu
mp.keys.bind(0x4E, true, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    if (!nDown) {
        nDown = true;
        const nMenuItems = _nMenu2.default.getItems();
        _nMenu2.default.setItems(nMenuItems);
        checkInterval();
    }
});

mp.keys.bind(0x4E, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    _nMenu2.default.setItems([]);
    nDown = false;
    clearAFK();
});

// F8
let cursorVisible = false;

mp.keys.bind(0x77, false, () => {
    cursorVisible = !cursorVisible;
    mp.gui.cursor.visible = cursorVisible;
    clearAFK();
});

// W
mp.keys.bind(0x57, true, () => {
    checkInterval();
});

mp.keys.bind(0x57, false, () => {
    clearAFK();
});

// A
mp.keys.bind(0x41, true, () => {
    checkInterval();
});

mp.keys.bind(0x41, false, () => {
    clearAFK();
});

// S
mp.keys.bind(0x53, true, () => {
    checkInterval();
});

mp.keys.bind(0x53, false, () => {
    clearAFK();
});

// D
mp.keys.bind(0x44, true, () => {
    checkInterval();
});

mp.keys.bind(0x44, false, () => {
    clearAFK();
});

// LeftMouse
mp.keys.bind(0x01, true, () => {
    checkInterval();
});

mp.keys.bind(0x01, false, () => {
    clearAFK();
});

// SpaceBar
mp.keys.bind(0x20, true, () => {
    checkInterval();
});

mp.keys.bind(0x20, false, () => {
    clearAFK();
});

// Shift
mp.keys.bind(0x10, true, () => {
    checkInterval();
});

mp.keys.bind(0x10, false, () => {
    clearAFK();
});

mp.keys.bind(0x46, false, () => {
    clearAFK();
});

// Feature AFK-Tool
var timer;
var checkholdTimer;
var intervalTimer;
let holdtime;
let interval;
let oldinterval;

let x;
let y;
let z;

let min = 120000; //600000
let max = 180000; //1200000
let holdmax = 30000; //1800000

function clearAFK() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            clearInterval(timer);
            const playerPos = mp.players.local.position;
            x = Math.round(playerPos.x);
            y = Math.round(playerPos.y);
            z = Math.round(playerPos.z);
            let random = min + Math.floor(Math.random() * (max - min + 1));
            clearInterval(timer);
            timer = setInterval(checkAFK, random);
            clearInterval(checkholdTimer);
            holdtime = 0;
            checkholdTimer = setInterval(checkHold, 1000);
        }
}

function checkHold() {
    holdtime++;
}

function checkAFK() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            if (_player2.default.injured || _player2.default.cuffed) return;
            const playerPos = mp.players.local.position;
            if (Math.round(playerPos.x) != x && holdtime < holdmax || Math.round(playerPos.y) != y && holdtime < holdmax || Math.round(playerPos.z) != z && holdtime < holdmax) {
                x = Math.round(playerPos.x);
                y = Math.round(playerPos.y);
                z = Math.round(playerPos.z);
            } else {
                let random = min + Math.floor(Math.random() * (max - min + 1));
                clearInterval(timer);
                timer = setInterval(checkAFK, random);
                _antiafk2.default.setVisible();
            }
        }
}

function checkInterval() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            clearInterval(intervalTimer);
            if (oldinterval == 0 || interval == 0) {
                clearAFK();
            } else {
                if (oldinterval != interval) {
                    oldinterval = interval;
                    interval = 0;
                    clearAFK();
                }
            }
            intervalTimer = setInterval(addInterval, 500);
        }
}

function addInterval() {
    interval++;
}

//KOMMA key
mp.keys.bind(0xBC, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_KOMMA", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    _player2.default.shortCutBeingUsed = Date.now();
});

//PUNKT key
mp.keys.bind(0xBE, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_PUNKT", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    _player2.default.shortCutBeingUsed = Date.now();
});

//Q (for heli Rappel) key
mp.keys.bind(0x51, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    if (!checkShortCut()) return;

    _rappel2.default.startRappel();
});

function checkShortCut(time = 4000) {
    if (_player2.default.shortCutBeingUsed && _player2.default.shortCutBeingUsed + time > Date.now()) {
        return false;
    }
    return true;
}

},{"../app/apps":12,"../interfaces/hud/antiafk":142,"../interfaces/hud/menu":151,"../interfaces/hud/n-menu":152,"../interfaces/hud/player-panel":155,"../interfaces/hud/vehicle-panel":164,"../interfaces/hud/x-menu":165,"../player/player":208,"../rage11/objects":221,"../raycast/raycast":224,"../vehicle/VehicleEnter":227,"../vehicle/rappel":230,"../windows/windows":235}],200:[function(require,module,exports){
'use strict';

require('./key-events/key-events');

require('./interfaces/interfaces');

require('./player/player');

require('./player/weaponcomponent');

require('./player/crouching');

require('./vehicle/vehicle');

require('./apps/apps');

require('./voice/voice');

require('./doors/doors');

require('./peds/vehiclesync');

require('./peds/animalapi');

require('./utils/bodyCamera');

require('./rage11/rage11');

require('./rage11/noclip');

require('./vehicle/rappel');

require('./player/welcomescene');

require('./player/bigDataReceiver');

require('./player/spectate.js');

require('./rage11/firework');

require('./building/building');

require('./rage11/finger');

require('./rage11/casino');

require('./rage11/drone');

require('./rage11/sperrzonen');

require('./rage11/fxeffects');

require('./rage11/einreiseamt');

// Include all static modules here (modules that doesnt require an import to be useful)
require('./CircuitBreaker/CircuitBreaker.events.js');

},{"./CircuitBreaker/CircuitBreaker.events.js":7,"./apps/apps":13,"./building/building":105,"./doors/doors":108,"./interfaces/interfaces":170,"./key-events/key-events":199,"./peds/animalapi":201,"./peds/vehiclesync":203,"./player/bigDataReceiver":204,"./player/crouching":207,"./player/player":208,"./player/spectate.js":209,"./player/weaponcomponent":212,"./player/welcomescene":213,"./rage11/casino":214,"./rage11/drone":215,"./rage11/einreiseamt":216,"./rage11/finger":217,"./rage11/firework":218,"./rage11/fxeffects":219,"./rage11/noclip":220,"./rage11/rage11":222,"./rage11/sperrzonen":223,"./utils/bodyCamera":225,"./vehicle/rappel":230,"./vehicle/vehicle":232,"./voice/voice":233}],201:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimalApi {
    constructor() {
        /*mp.events.add('entityStreamIn', (entity) => {
            if(entity != null && entity.type == 'ped') {
                if (!mp.peds.exists(entity))
                    return;
                  mp.events.callRemote("requestPedSync", entity, player.remoteHashKey);
            }
        })*/

        mp.events.add('pedStreamInSync', (entity, arg) => {
            if (entity == null) return;
            if (entity.type == 'ped' && mp.peds.exists(entity)) {
                entity.setComponentVariation(0, 0, arg, 0);
            }
        });

        //Function to find ball
        function findBall(pet) {
            if (pet) {
                if (!mp.peds.exists(pet)) return;

                let findballPos = pet.getCoords(false);
                let findBallRange = 100;

                let ball = mp.game.object.getClosestObjectOfType(findballPos.x, findballPos.y, findballPos.z, findBallRange, mp.game.joaat('w_am_baseball'), false, true, true);

                let x = mp.players.local.position.x + 1.0;
                let y = mp.players.local.position.y + 1.0;
                if (ball) {

                    // 100, 50, 25, 12.5, 6, 3
                    let newRange = findBallRange;
                    let newX = findballPos.x;
                    let newY = findballPos.y;
                    let found = false;
                    for (let i = 0; i < 6; i++) {
                        newRange = newRange / 2;
                        let tmpBall1 = mp.game.object.getClosestObjectOfType(newX + newRange, newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall2 = mp.game.object.getClosestObjectOfType(newX - newRange, newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall3 = mp.game.object.getClosestObjectOfType(newX, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall4 = mp.game.object.getClosestObjectOfType(newX, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);

                        let tmpBall5 = mp.game.object.getClosestObjectOfType(newX + newRange, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall6 = mp.game.object.getClosestObjectOfType(newX + newRange, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall7 = mp.game.object.getClosestObjectOfType(newX - newRange, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall8 = mp.game.object.getClosestObjectOfType(newX - newRange, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);

                        if (tmpBall1) {
                            newX = newX + newRange;
                            found = true;
                        } else if (tmpBall2) {
                            newX = newX - newRange;
                            found = true;
                        } else if (tmpBall3) {
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall4) {
                            newY = newY - newRange;
                            found = true;
                        } else if (tmpBall5) {
                            newX = newX + newRange;
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall6) {
                            newX = newX + newRange;
                            newY = newY - newRange;
                            found = true;
                        } else if (tmpBall7) {
                            newX = newX - newRange;
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall8) {
                            newX = newX - newRange;
                            newY = newY - newRange;
                            found = true;
                        } else break;
                    }

                    if (found === false) return;

                    // trigger to server...                
                    pet.taskGoToCoordAndAimAtHatedEntitiesNearCoord(newX, newY, findballPos.z + 0.4, newX, newY, findballPos.z + 0.4, 3, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
                    let dist = mp.game.gameplay.getDistanceBetweenCoords(newX, newY, findballPos.z, x, y, mp.players.local.position.z, true);
                    let time = dist / 29 * 10000 - 3000;
                    setTimeout(() => {
                        if (pet == null || !mp.peds.exists(pet)) return;
                        if (ball != null && ball !== undefined) {
                            mp.game.entity.createModelHide(newX, newY, findballPos.z, 3, mp.game.joaat('w_am_baseball'), true); // unsichtbar machen...
                            mp.game.entity.setObjectAsNoLongerNeeded(ball);
                        }
                        // maybe attach here
                        pet.taskGoToCoordAnyMeans(x, y, mp.players.local.position.z, 2.5, 0, false, 786603, 1.0);
                        //pet.setHeading(mp.players.local.heading);
                    }, time);
                }
            }
        }

        function rewritePedData(testPed) {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = false;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(false);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(false);
            testPed.setProofs(false, false, false, false, false, false, false, false);
            testPed.setFleeAttributes(0, false);
            testPed.setCombatAttributes(46, true);
        }

        mp.events.add("animal_giveweapon", (testPed, weaponHash, ammo, equipnow) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);
            testPed.giveWeapon(weaponHash, ammo, equipnow);
        });

        mp.events.add("animal_attack", async (testPed, target) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskCombat(target.handle, 0, 0);
        });

        mp.events.add("animal_playanim", (testPed, a1, a2, dur, flag) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);

            mp.game.streaming.requestAnimDict(a1); //preload the animation
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskPlayAnim(a1, a2, 8.0, 1.0, dur, flag, 1.0, false, false, false);
        });

        mp.events.add("animal_cleartasks", testPed => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);
            testPed.clearTasks();
        });

        mp.events.add("animal_setarmour", (testPed, armor) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setArmour(armor);
        });

        mp.events.add("animal_sethealth", (testPed, hp) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setHealth(hp);
        });

        mp.events.add("animal_gotoCoord", async (testPed, pos_x, pos_y, pos_z, speed) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskGoToCoordAndAimAtHatedEntitiesNearCoord(pos_x, pos_y, pos_z, pos_x, pos_y, pos_z, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
        });

        mp.events.add("animal_setFollow", (testPed, speed) => {
            rewritePedData(testPed);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            _player2.default.isPetFollowing = testPed;
        });

        mp.events.add("animal_cloth", (testPed, arg1, arg2, arg3) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setComponentVariation(arg1, arg2, arg3, 0);
        });

        mp.events.add("animal_checkDeath", (testPed, returnEvent) => {
            if (testPed != null && mp.peds.exists(testPed)) {
                mp.events.callRemote(returnEvent, testPed.isDeadOrDying(true), testPed.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        });

        const render = async () => {
            while (true) {
                if (_player2.default.isPetFollowing !== undefined && _player2.default.isPetFollowing != null && _player2.default.isPetFollowing !== undefined && mp.peds.exists(_player2.default.isPetFollowing) && !_player2.default.isPetFollowing.isDead()) {
                    if (_player2.default.isPetFollowing == null || !mp.peds.exists(_player2.default.isPetFollowing)) {
                        await mp.game.waitAsync(50);
                        continue;
                    }

                    let pedPos = new mp.Vector3(_player2.default.isPetFollowing.getCoords(false).x, _player2.default.isPetFollowing.getCoords(false).y, _player2.default.isPetFollowing.getCoords(false).z);
                    if (!isInRangeOfPoint(mp.players.local.position, pedPos, 1.5)) {
                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        const pGround = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                        //We calculate dog's spped depending on the distance between the player
                        let speed;
                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        if (!isInRangeOfPoint(mp.players.local.position, pedPos, 4)) speed = 3;else speed = 1;

                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        _player2.default.isPetFollowing.taskGoToCoordAndAimAtHatedEntitiesNearCoord(mp.players.local.position.x, mp.players.local.position.y, pGround + 0.4, mp.players.local.position.x, mp.players.local.position.y, pGround + 0.4, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
                    }
                }

                await mp.game.waitAsync(50);
            }
        };

        render();

        mp.events.add("animal_stopFollow", () => {
            if (_player2.default.isPetFollowing == null || !mp.peds.exists(_player2.default.isPetFollowing)) return;
            _player2.default.isPetFollowing = undefined;
        });

        mp.events.add("animal_findball", testPed => {
            rewritePedData(testPed);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            findBall(testPed);
        });

        mp.events.add("testcop", (testPed, Veh, pos_x, pos_y, pos_z) => {

            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = true;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(true);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(true);

            testPed.setProofs(false, false, false, false, false, false, false, false);

            setTimeout(function () {
                if (testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskEnterVehicle(Veh.handle, 10000, -1, 1, 1, 0);
            }, 1500);

            //player.taskVehicleDriveToCoord(vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);

            setTimeout(function () {
                if (testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskVehicleDriveToCoord(Veh.handle, 0.52, 0.38, 72.1, 40, 1, 2046537925, 2, 3, true);
            }, 10500);
        });

        function isInRangeOfPoint(pos1, pos2, range) {
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2)) <= range;
        }
    }
}

exports.default = new AnimalApi();

},{"../player/player":208}],202:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Peds {
    constructor() {
        this.freezed = false;
        this.disabled = false;
        this.disabledAll = false;

        this.menuItemsPedsCduty = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }, { label: 'Casino Einlass', description: 'Dieser Person Einlass gewähren / entziehen.', icon: 'img/icons/player/diamond.png', id: 'REQUEST_PEDS_PLAYER_CASINO', arg: "" }];
        this.menuItemsPedsPlayer = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Fesseln', description: 'Dieser Person fesseln.', icon: 'img/icons/player/rope.png', id: 'REQUEST_PEDS_PLAYER_TIE', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }, { label: 'Zinken', description: 'Gefesselte Person Zinken', icon: 'img/icons/player/zinken.png', id: 'REQUEST_PEDS_PLAYER_ZINKEN', arg: "" }];
        this.menuItemsPedsMedic = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Behandeln', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/medicate.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
        this.menuItemsPedsCop = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
        this.menuItemsPedsPlayerInjured = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];
        this.menuItemsTiedOrCuffed = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];

        this.l_Mods = [{ id: 0, name: "spoiler" }, { id: 1, name: "front_bumper" }, { id: 2, name: "rear_bumper" }, { id: 3, name: "side_skirt" }, { id: 4, name: "exhaust" }, { id: 5, name: "frame" }, { id: 6, name: "grille" }, { id: 7, name: "hood" }, { id: 8, name: "fender" }, { id: 9, name: "right_fender" }, { id: 10, name: "roof" }, { id: 11, name: "engine" }, { id: 12, name: "brakes" }, { id: 13, name: "transmission" }, { id: 14, name: "horns" }, { id: 15, name: "suspension" }, { id: 16, name: "armor" }, { id: 18, name: "turbo" }, { id: 22, name: "xenon" }, { id: 23, name: "front_wheels" }, { id: 20, name: "util_shadow_silver" }, { id: 24, name: "back_wheels" }, { id: 25, name: "plate_holders" }, { id: 27, name: "trim_design" }, { id: 28, name: "ornaments" }, { id: 30, name: "dial_design" }, { id: 33, name: "steering_wheel" }, { id: 34, name: "shift_lever" }, { id: 35, name: "plaques" }, { id: 38, name: "hydraulics" }, { id: 40, name: "boost" }, { id: 46, name: "window_tint" }, { id: 48, name: "livery" }, { id: 62, name: "plate" }];

        mp.events.add("freezePlayer", state => {

            if (state === undefined || typeof state !== "boolean") return;

            _player2.default.cuffed = state;
            mp.players.local.freezePosition(state);
            mp.players.local.setCanSwitchWeapon(!state);

            this.disabled = state;
        });

        mp.events.add("disableAllControls", state => {
            this.disabledAll = state;
        });

        mp.events.add("disableAllPlayerActions", state => {
            this.disabled = state;
        });

        mp.events.add("toggleShooting", state => {
            this.freezed = state;
        });

        mp.events.add("render", () => {

            if (this.freezed) {
                this.disableControls();
            } else if (this.disabled) {
                this.disableControls();
                mp.game.controls.disableControlAction(0, 30, true); //Move LR
                mp.game.controls.disableControlAction(0, 31, true); //Move UD
            }

            if (_player2.default.superjump) {
                mp.game.invoke("0x57FFF03E423A4C0B", mp.players.local);
            }

            if (this.disabledAll) {
                mp.game.controls.disableAllControlActions(0);
            }
        });

        mp.events.add("playerDeath", () => {
            //Wieso? Disabled 4 Paintball
            //setTimeout(() => this.disabled = true, 5000)
        });

        mp.events.add("playerEnterVehicle", (pl, vehicle, seat) => {
            if (_player2.default.injured || _player2.default.tied || _player2.default.cuffed) {
                mp.players.local.clearTasks();
            }
        });

        mp.events.add("loadNpc", (ped, x, y, z, heading, dimension) => {
            /*mp.peds.new(ped, new mp.Vector3(x, y, z), heading, (streamPed) => {
                streamPed.setAlpha(0);
                streamPed.setRotation(0, 0, heading, 2, true);
                streamPed.freezePosition(true);
            }, dimension);
            */
            mp.peds.new(ped, new mp.Vector3(x, y, z), heading, dimension);
        });

        mp.events.add("loadNpcs", data => {
            let npcsdata = JSON.parse(data);

            if (npcsdata !== undefined && npcsdata.length > 0) {
                npcsdata.forEach(npcdata => {

                    mp.peds.new(npcdata.PedHash, new mp.Vector3(npcdata.Position.x, npcdata.Position.y, npcdata.Position.z), npcdata.Heading, npcdata.Dimension);
                });
            }
        });
    }

    disableAllControls(state) {
        this.disabledAll = state;
    }

    // Get menu items for the player
    getPlayerMenuItems() {
        if (_player2.default.injured) {
            return this.menuItemsPedsPlayerInjured;
        }
        // Check if the player is tied or cuffed
        else if (_player2.default.tied || _player2.default.cuffed) {
                return this.menuItemsTiedOrCuffed;
            } else {
                // Check if the player is on duty
                if (_player2.default.duty) {
                    // Check if the player is a cop, fib, army, gov, swat
                    if (_player2.default.cduty == true) {
                        return this.menuItemsPedsCduty;
                    } else if (_player2.default.team == 1 || _player2.default.team == 5 || _player2.default.team == 13 || _player2.default.team == 14 || _player2.default.team == 20 || _player2.default.team == 21 || _player2.default.team == 23) {
                        return this.menuItemsPedsCop;
                    }
                    // Check if the player is a medic
                    else if (_player2.default.team == 7) {
                            return this.menuItemsPedsMedic;
                        } else {
                            return this.menuItemsPedsPlayer;
                        }
                } else {
                    if (_player2.default.cduty == true) {
                        return this.menuItemsPedsCduty;
                    } else {
                        return this.menuItemsPedsPlayer;
                    }
                }
            }
    }

    disableControls() {
        mp.game.player.disableFiring(true);
        mp.game.controls.disableControlAction(0, 22, true); //Space
        mp.game.controls.disableControlAction(0, 23, true); //Veh Enter
        mp.game.controls.disableControlAction(0, 25, true); //Right Mouse
        mp.game.controls.disableControlAction(0, 44, true); //Q
        mp.game.controls.disableControlAction(2, 75, true); //Exit Vehicle
        mp.game.controls.disableControlAction(2, 140, true); //R
        mp.game.controls.disableControlAction(2, 141, true); //Left Mouse
    }
}

exports.default = new Peds();

},{"../player/player":208}],203:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleSync {
    constructor() {
        /*
        this.closestStreamingVehicles = []
          mp.events.add('entityStreamOut', (entity) => {
            if (entity.type == "vehicle") {
                let index = this.closestStreamingVehicles.indexOf(entity)
                  if(index > -1) {
                    this.closestStreamingVehicles.splice(index, 1)
                }
            }
        })
          var pedsHandler = this
          setInterval(function() {
            if(pedsHandler != null && player.vehicleSync) {
                // Vehicle CloseStreaming
                if(pedsHandler.closestStreamingVehicles != null) {
                    mp.vehicles.forEachInStreamRange(
                        (vehicle) => {
                            if(vehicle.type == "vehicle") {
                                let streamedPlayerPos = vehicle.position
                                let distance = player.getDistance(streamedPlayerPos)
                                if(distance < 80)
                                {ok,
                                    if(!pedsHandler.closestStreamingVehicles.includes(vehicle)) {
                                        mp.events.callRemote("requestVehicleSyncData", vehicle, player.remoteHashKey);
                                        pedsHandler.closestStreamingVehicles.push(vehicle);
                                    }
                                }
                            }
                        }
                    );
                }
            }
        }, 1500)
        */
    }
}

exports.default = new VehicleSync();

},{"../player/player":208}],204:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BigDataReceiver {
    constructor() {
        mp.events.add('cDataReceiver-init', (id, eventName, size) => {
            // If bucket already created, abort
            if (_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            _player2.default.bigDataChunkBucket[id] = {
                isComponent: false,
                eventName: eventName,
                chunkSize: size,
                bucket: []
            };

            mp.events.callRemote('sDataSender-initSuccess', id, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        });

        mp.events.add('cDataReceiverComponent-init', (id, eventName, componentName, size) => {
            // If bucket already created, abort
            if (_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            _player2.default.bigDataChunkBucket[id] = {
                isComponent: true,
                componentName: componentName,
                eventName: eventName,
                chunkSize: size,
                bucket: []
            };

            mp.events.callRemote('sDataSender-initSuccess', id, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        });

        mp.events.add('cDataReceiver-receive', (id, data, end, idx) => {
            // If bucket not existing, abort
            if (!_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            let bigBucket = _player2.default.bigDataChunkBucket[id];

            bigBucket.bucket.push({
                index: idx,
                data: data
            });

            // Nothing to do if not last chunk
            if (bigBucket.bucket.length !== bigBucket.chunkSize) return;

            this.createDataStructure(bigBucket.bucket).then(stringData => {
                mp.events.callRemote('sDataSender-end', id, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");

                if (bigBucket.isComponent) {
                    mp.events.call('componentServerEvent', ...[bigBucket.componentName, bigBucket.eventName, ...stringData]);

                    return;
                }

                mp.events.call(bigBucket.eventName, ...stringData);
            }).catch(() => {
                mp.events.callRemote('sDataSender-failed', id, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            });
        });
    }

    createDataStructure(chunkBucket) {
        return new Promise(async (resolve, reject) => {
            let FinalDataString = '';

            try {
                let BucketClone = chunkBucket;

                if (chunkBucket.length > 1) {
                    BucketClone = await this.sort(chunkBucket);
                }

                for (const chunk of BucketClone) {
                    FinalDataString += chunk.data;
                }

                // Last chance to fail...
                let returnData = JSON.parse(FinalDataString);

                resolve(returnData);
            } catch (e) {
                reject(-1);
            }
        });
    }

    sort(chunkBucket) {
        return new Promise((resolve, reject) => {
            try {
                let sortedArray = [],
                    lastIndex = -1;

                let BucketClone = chunkBucket;

                BucketClone.sort((a, b) => {
                    return parseInt(a.index) - parseInt(b.index);
                });

                // Check if everything is received
                for (const arrayObject of BucketClone) {
                    if (arrayObject.index - 1 === lastIndex) {
                        sortedArray.push(arrayObject);
                        lastIndex = BucketClone.indexOf(arrayObject);
                    } else {
                        reject(-1);

                        return;
                    }
                }

                resolve(sortedArray);
            } catch (e) {
                reject(e);
            }
        });
    }
}

exports.default = new BigDataReceiver();

},{"./player":208}],205:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Contact {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
}

exports.default = Contact;

},{}],206:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Contacts {
    constructor() {
        this.contacts = null;
        this.callback = null;

        mp.events.add('responsePhoneContacts', contactsString => {
            this.parseContacts(contactsString);

            if (mp.console) {
                // mp.console.logInfo(
                //     'Received contacts: ' + contactsString,
                // )
            }

            if (this.callback != null) {
                this.callback();
                this.callback = null;
            }
        });
    }

    request(callback) {
        this.callback = callback;

        mp.events.callRemote('requestPhoneContacts', "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    parseContacts(serverResponse) {
        this.contacts = new Map();
        let serverContacts = JSON.parse(serverResponse);

        for (let data of serverContacts) {
            let number = Number(data['number']);
            this.contacts.set(number, new _contact2.default(data['name'], number));
        }
    }

    updateContact(oldNumber, newNumber, name) {
        if (oldNumber !== newNumber) {
            this.contacts.delete(oldNumber);
            this.contacts.set(newNumber, new _contact2.default(name, newNumber));
        } else {
            /*
            let contact = this.contacts.get(oldNumber)
            contact.name = name
            */
            this.contacts.delete(oldNumber);
            this.contacts.set(oldNumber, new _contact2.default(name, oldNumber));
        }

        mp.events.callRemote('updatePhoneContact', oldNumber, newNumber, name, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        mp.events.callRemote('requestPhoneContacts', "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    addContact(number, name) {
        if (number == null) return;
        // if (this.contacts == null) this.contacts = new Map()

        if (this.contacts.has(number)) return;
        this.contacts.set(number, new _contact2.default(name, number));

        mp.events.callRemote('addPhoneContact', name, number, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        mp.events.callRemote('requestPhoneContacts', "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    removeContact(number) {
        this.contacts.delete(number);

        mp.events.callRemote('delPhoneContact', number, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        mp.events.callRemote('requestPhoneContacts', "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
    }

    getContact(number) {
        if (!this.contacts.has(number)) return null;

        return this.contacts.get(number);
    }

    toJson() {
        var contacts = [];
        for (let value of this.contacts.values()) {
            contacts.push(value);
        }

        return JSON.stringify(contacts);
    }
}

exports.default = Contacts;

},{"../../player/player":208,"./contact":205}],207:[function(require,module,exports){
"use strict";

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async clipSetName => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) await mp.game.waitAsync(5);
};

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.add("changeCrouchingState", (entity, value) => {
    if (entity != null && entity.type === "player" && movementClipSet && clipSetSwitchTime && strafeClipSet) {
        if (value) {
            entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            entity.setStrafeClipset(strafeClipSet);
        } else {
            entity.resetMovementClipset(clipSetSwitchTime);
            entity.resetStrafeClipset();
        }
    }
});

mp.events.add("loadCrouchClipsets", async () => {
    // load clip sets
    await loadClipSet(movementClipSet);
    await loadClipSet(strafeClipSet);
});

// CTRL key to toggle crouching
mp.keys.bind(0x11, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured) return;
    mp.events.callRemote("toggleCrouch", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
});

},{"../app/apps":12,"../player/player":208,"../windows/windows":235}],208:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contacts = require('./contacts/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _historys = require('./telefonHistory/historys');

var _historys2 = _interopRequireDefault(_historys);

var _hud = require('../interfaces/hud/hud');

var _hud2 = _interopRequireDefault(_hud);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _playerPanel = require('../interfaces/hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

var _playerinfo = require('../interfaces/hud/playerinfo');

var _playerinfo2 = _interopRequireDefault(_playerinfo);

var _playernotification = require('../interfaces/hud/playernotification');

var _playernotification2 = _interopRequireDefault(_playernotification);

var _attachments = require('../attachments/attachments');

var _attachments2 = _interopRequireDefault(_attachments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player {
    constructor() {
        this.firstName = undefined;
        this.lastName = undefined;
        this.superjump = undefined;
        this.playerId = undefined;
        this.academicPoints = undefined;
        this.business = undefined;
        this.gwdNote = undefined;
        this.zwdNote = undefined;
        this.money = undefined;
        this.blackmoney = undefined;
        this.wanteds = undefined;
        this.house = undefined;
        this.team = undefined;
        this.teamRank = undefined;
        this.gvmpTeamRank = undefined;
        this.level = undefined;
        this.injured = undefined;
        this.duty = undefined;
        this.cuffed = undefined;
        this.tied = undefined;
        this.aduty = undefined;
        this.einreiseduty = undefined;
        this.inventory = undefined;
        this.lastMusicEvent = undefined;
        this.weaponDmg = 0;
        this.meleeDmg = 0;
        this.dmglg = 0;
        this.invincible = false;
        this.chatFlag = false;
        this.voiceHash = '';
        this.state = 0;
        this.rank = 0;
        this.phone = undefined;
        this.phonelautlos = false;
        this.contacts = new _contacts2.default();
        this.historys = new _historys2.default();
        this.weaponAmmo = [];
        this.cduty = false;
        this.currentWeapon = undefined;
        this.job = undefined;
        this.jobsSkill = undefined;
        this.isPetFollowing = undefined;
        this.Krankenversicherung = undefined;
        this.activeRingtone = 0;
        this.gui;
        this.natives = {
            SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
            SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
            IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
        };
        this.animations = [];
        this.marker = null;
        this.markers = [];
        //this.lastInteractE = new Date()
        this.playerSync = true;
        this.vehicleSync = true;
        this.shortCutBeingUsed = false;
        this.isCarrying = false;
        this.allowHandy = true;
        this.spawnedDrugPed = null;
        this.progressbar = false;
        this.health = 100;
        this.ready = false;
        this.wasRagdoll = {};
        this.collided = {};
        this.HasCollided = false;
        this.HasRagdall = false;
        this.hasDamageFX = '';
        this.isOpeningDoor = false;
        this.isInWater = false;
        this.onCayoIsland = false;
        this.acMark1 = undefined;
        this.acMark2 = undefined;
        this.custommarkers = [];
        this.customObjects = [];
        this.customBlipsForRadius = [];
        this.weaponSwitchAmmo = [];
        this.weaponSwitchAmmoEmpty = [];
        this.weaponSwitchActualWeapon = undefined;
        this.currentCheckpoint = null;
        this.buildingmode = false;
        this.buildingspeed = 0.1;
        this.buildingobject = undefined;
        this.attachmentsync = false;
        this.openVoiceSettings = false;
        this.remoteHashKey = "";
        const props = ['Set_Pent_Tint_Shell', 'Set_Pent_Pattern_01', 'Set_Pent_Spa_Bar_Open', 'Set_Pent_Media_Bar_Open', 'Set_Pent_Dealer', 'Set_Pent_Arcade_Modern', 'Set_Pent_Bar_Clutter', 'Set_Pent_Clutter_01', 'set_pent_bar_light_01', 'set_pent_bar_party_0', 'hei_dlc_windows_casino', 'vw_dlc_casino_door', 'hei_dlc_casino_door'];
        this.bigDataChunkBucket = {};

        let autopilotActive = false;
        var autopilotPoint = null;
        var autopilotInterval = null;
        var autoPilotSpeed = 50;

        this.placementObject = undefined;

        setInterval(function () {
            if (mp.game.gameplay.getProfileSetting(0) == 0) {
                mp.game.cam.shakeGameplayCam('MEDIUM_EXPLOSION_SHAKE', 0.4);
            }
        }, 150);
        // disable automatic cam lookup
        setInterval(() => {
            mp.game.invoke('0x9E4CFFF989258472');
            mp.game.invoke('0xF4F2C0D4EE209E20');
        }, 25000);

        setInterval(() => {
            if ("0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7" == "") return;
            let res = mp.game.graphics.getScreenAspectRatio(true);

            if (res < 1.5) {
                mp.events.callRemote('wrongScreenScale', res, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        }, 20000);

        const methlaboratory = {
            interiorName: 'bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo',
            interiorID: 247041,
            props: {
                table: ['meth_lab_empty', 'meth_lab_setup'],
                boiler: ['', 'meth_lab_basic', 'meth_lab_upgrade'],
                security: ['', 'meth_lab_security_high']
            }
        };

        const planningroom = {
            arcade: {
                interiorName: 'ch_DLC_Arcade',
                Id: 278273,
                props: {
                    grundraum: [['entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up'], ['entity_set_arcade_set_derelict'], ['entity_set_arcade_set_ceiling_flat', 'entity_set_ret_light_no_neon'], ['entity_set_arcade_set_ceiling_beams', 'entity_set_hip_light_no_neon']],
                    spiegel: [[''], ['entity_set_arcade_set_ceiling_mirror']],
                    einrichtungsstyle: [[''], ['entity_set_floor_option_01', 'entity_set_mural_neon_option_01', 'entity_set_mural_option_01'], ['entity_set_floor_option_02', 'entity_set_mural_neon_option_02', 'entity_set_mural_option_02'], ['entity_set_floor_option_03', 'entity_set_mural_neon_option_03', 'entity_set_mural_option_03'], ['entity_set_floor_option_04', 'entity_set_mural_neon_option_04', 'entity_set_mural_option_04'], ['entity_set_floor_option_05', 'entity_set_mural_neon_option_05', 'entity_set_mural_option_05'], ['entity_set_floor_option_06', 'entity_set_mural_neon_option_06', 'entity_set_mural_option_06'], ['entity_set_floor_option_07', 'entity_set_mural_neon_option_07', 'entity_set_mural_option_07'], ['entity_set_floor_option_08', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_08']],
                    inneneinrichtung: [[''], ['entity_set_big_screen', 'entity_set_screens', 'entity_set_constant_geometry']],
                    spielautomaten: [[''], ['entity_set_arcade_set_streetx4']],
                    rewards: ['', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller']
                },
                allprops: ['entity_set_arcade_set_ceiling_beams', 'entity_set_arcade_set_ceiling_flat', 'entity_set_arcade_set_ceiling_mirror', 'entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up', 'entity_set_arcade_set_streetx4', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller', 'entity_set_big_screen', 'entity_set_constant_geometry', 'entity_set_floor_option_01', 'entity_set_floor_option_02', 'entity_set_floor_option_03', 'entity_set_floor_option_04', 'entity_set_floor_option_05', 'entity_set_floor_option_06', 'entity_set_floor_option_07', 'entity_set_floor_option_08', 'entity_set_hip_light_no_neon', 'entity_set_mural_neon_option_01', 'entity_set_mural_neon_option_02', 'entity_set_mural_neon_option_03', 'entity_set_mural_neon_option_04', 'entity_set_mural_neon_option_05', 'entity_set_mural_neon_option_06', 'entity_set_mural_neon_option_07', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_01', 'entity_set_mural_option_02', 'entity_set_mural_option_03', 'entity_set_mural_option_04', 'entity_set_mural_option_05', 'entity_set_mural_option_06', 'entity_set_mural_option_07', 'entity_set_mural_option_08', 'entity_set_ret_light_no_neon', 'entity_set_screens']
            },
            plan: {
                interiorName: 'ch_DLC_Plan',
                Id: 278529,
                props: {
                    kellerraum: [['set_plan_pre_setup', 'set_plan_wall'], ['set_plan_wall'], ['set_plan_garage', 'set_plan_setup', 'set_plan_computer']],
                    Mechanic: [[''], ['set_plan_mechanic']],
                    Hacker: [[''], ['set_plan_hacker']],
                    Weapons: [[''], ['set_plan_weapons']],
                    Wardrobe: [[''], ['set_plan_bed']],
                    CasinoPlan: [[''], ['set_plan_casino']],
                    CasinoDoor: [[''], ['set_plan_vault']]
                },
                allprops: ['set_plan_pre_setup', 'set_plan_wall', 'set_plan_setup', 'set_plan_computer', 'set_plan_mechanic', 'set_plan_hacker', 'set_plan_weapons', 'set_plan_bed', 'set_plan_garage', 'set_plan_casino', 'set_plan_vault']
            }
        };

        const nightclub = {
            interiorName: 'ba_int_placement_ba_interior_0_dlc_int_01_ba_milo_',
            interiorID: 271617,
            props: {
                interrior: [[''], ['Int01_ba_Style01'], ['Int01_ba_Style02'], ['Int01_ba_Style03']],
                drinks: [[''], [''], ['Int01_ba_booze_01'], ['Int01_ba_booze_02'], ['Int01_ba_booze_03']],
                lights: [[''], [''], ['dj_01_lights_01'], ['dj_01_lights_02'], ['dj_01_lights_03'], ['dj_02_lights_01'], ['dj_02_lights_02'], ['dj_02_lights_03'], ['dj_03_lights_01'], ['dj_03_lights_02'], ['dj_03_lights_03'], ['dj_04_lights_01'], ['dj_04_lights_02'], ['dj_04_lights_03']],
                effects: [[''], [''], ['dj_01_lights_04'], ['dj_02_lights_04'], ['dj_03_lights_04'], ['dj_04_lights_04']],
                clubname: [[''], [''], ['Int01_ba_clubname_01'], ['Int01_ba_clubname_02'], ['Int01_ba_clubname_03'], ['Int01_ba_clubname_04'], ['Int01_ba_clubname_05'], ['Int01_ba_clubname_06'], ['Int01_ba_clubname_07'], ['Int01_ba_clubname_08'], ['Int01_ba_clubname_09']],
                entrylights: [[''], [''], ['Int01_ba_trad_lights']],
                security: [[''], [''], ['Int01_ba_security_upgrade']]
            },
            allprops: ['Int01_ba_Style01', 'Int01_ba_Style02', 'Int01_ba_Style03', 'Int01_ba_booze_01', 'Int01_ba_booze_02', 'Int01_ba_booze_03', 'dj_01_lights_01', 'dj_01_lights_02', 'dj_01_lights_03', 'dj_02_lights_01', 'dj_02_lights_02', 'dj_02_lights_03', 'dj_03_lights_01', 'dj_03_lights_02', 'dj_03_lights_03', 'dj_04_lights_01', 'dj_04_lights_02', 'dj_04_lights_03', 'dj_01_lights_04', 'dj_02_lights_04', 'dj_03_lights_04', 'dj_04_lights_04', 'Int01_ba_clubname_01', 'Int01_ba_clubname_02', 'Int01_ba_clubname_03', 'Int01_ba_clubname_04', 'Int01_ba_clubname_05', 'Int01_ba_clubname_06', 'Int01_ba_clubname_07', 'Int01_ba_clubname_08', 'Int01_ba_clubname_09', 'Int01_ba_trad_lights', 'Int01_ba_security_upgrade']
        };

        const doomsday = {
            interiorID: 269313,

            ipls: ['sm_smugdlc_interior_placement', 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_', 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_', 'xm_x17dlc_int_placement', 'xm_x17dlc_int_placement_interior_0_x17dlc_int_base_ent_milo_', 'xm_x17dlc_int_placement_interior_10_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_11_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_12_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_13_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_14_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_15_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_16_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_17_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_18_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_19_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_1_x17dlc_int_base_loop_milo_', 'xm_x17dlc_int_placement_interior_20_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_21_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_22_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_23_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_24_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_25_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_26_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_27_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_28_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_29_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_2_x17dlc_int_bse_tun_milo_', 'xm_x17dlc_int_placement_interior_30_v_apart_midspaz_milo_', 'xm_x17dlc_int_placement_interior_31_v_studio_lo_milo_', 'xm_x17dlc_int_placement_interior_32_v_garagem_milo_', 'xm_x17dlc_int_placement_interior_33_x17dlc_int_02_milo_', 'xm_x17dlc_int_placement_interior_34_x17dlc_int_lab_milo_', 'xm_x17dlc_int_placement_interior_35_x17dlc_int_tun_entry_milo_', 'xm_x17dlc_int_placement_interior_3_x17dlc_int_base_milo_', 'xm_x17dlc_int_placement_interior_4_x17dlc_int_facility_milo_', 'xm_x17dlc_int_placement_interior_5_x17dlc_int_facility2_milo_', 'xm_x17dlc_int_placement_interior_6_x17dlc_int_silo_01_milo_', 'xm_x17dlc_int_placement_interior_7_x17dlc_int_silo_02_milo_', 'xm_x17dlc_int_placement_interior_8_x17dlc_int_sub_milo_', 'xm_x17dlc_int_placement_interior_9_x17dlc_int_01_milo_', 'xm_x17dlc_int_placement_strm_0', 'xm_prop_x17_tem_control_01', 'xm_prop_x17_l_door_glass_01', 'xm_prop_x17_l_door_frame_01', 'xm_prop_x17_l_glass_01', 'xm_prop_x17_l_glass_02', 'xm_prop_x17_l_glass_03', 'xm_prop_x17_l_frame_01', 'xm_prop_x17_l_frame_02', 'xm_prop_x17_l_frame_03', 'xm_bunkerentrance_door', 'xm_hatch_01_cutscene', 'xm_hatch_02_cutscene', 'xm_hatch_03_cutscene', 'xm_hatch_04_cutscene', 'xm_hatch_06_cutscene', 'xm_hatch_07_cutscene', 'xm_hatch_08_cutscene', 'xm_hatch_09_cutscene', 'xm_hatch_10_cutscene', 'xm_hatch_closed', 'xm_hatches_terrain', 'xm_hatches_terrain_lod', 'xm_mpchristmasadditions', 'xm_siloentranceclosed_x17'],

            // Commented are switchable props.
            props: ['set_int_02_shell', 'set_int_02_lounge1',
            // 'set_int_02_lounge2',
            // 'set_int_02_lounge3',
            // 'set_int_02_no_sleep',
            'set_int_02_sleep',
            // 'set_int_02_sleep2',
            // 'set_int_02_sleep3',
            // 'set_int_02_no_security',
            'set_int_02_security',
            // 'set_int_02_no_cannon',
            'set_int_02_cannon', 'set_int_02_decal_01',
            // 'set_int_02_decal_02',
            // 'set_int_02_decal_03',
            // 'set_int_02_decal_04',
            // 'set_int_02_decal_05',
            // 'set_int_02_decal_06',
            // 'set_int_02_decal_07',
            // 'set_int_02_decal_08',
            // 'set_int_02_decal_09',
            'set_int_02_trophy1',
            // 'set_int_02_trophy_iaa',
            // 'set_int_02_trophy_sub',
            'Set_Int_02_Parts_Panther1',
            // 'Set_Int_02_Parts_Panther2',
            // 'Set_Int_02_Parts_Panther3',
            'Set_Int_02_Parts_Riot1',
            // 'Set_Int_02_Parts_Riot2',
            // 'Set_Int_02_Parts_Riot3',
            'Set_Int_02_Parts_Cheno1',
            // 'Set_Int_02_Parts_Cheno2',
            // 'Set_Int_02_Parts_Cheno3',
            'Set_Int_02_Parts_Thruster1',
            // 'Set_Int_02_Parts_Thruster2',
            // 'Set_Int_02_Parts_Thruster3',
            'Set_Int_02_Parts_Avenger1',
            // 'Set_Int_02_Parts_Avenger2',
            // 'Set_Int_02_Parts_Avenger3',
            'set_int_02_clutter1', 'set_int_02_clutter2', 'set_int_02_clutter3', 'set_int_02_clutter4', 'set_int_02_clutter5', 'set_int_02_crewemblem', 'set_int_02_paramedic_complete', 'set_int_02_forcedentry_complete', 'set_int_02_aqualungs_complete', 'set_int_02_daylightrob_complete', 'set_int_02_burglary_complete', 'set_int_02_flightrecord_complete', 'Set_Int_02_outfit_serverfarm']
        };
        mp.events.add("setRemoteHashKey", key => {
            this.remoteHashKey = key;
        });
        mp.events.add('loadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.enableInteriorProp(doomsday.interiorID, p);
                mp.game.invoke('0xC1F1920BAF281317', doomsday.interiorID, p, 1);
            });

            doomsday.ipls.forEach(ipl => {
                mp.game.streaming.requestIpl(ipl);
            });

            mp.game.interior.refreshInterior(doomsday.interiorID);
        });

        mp.events.add('unloadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.disableInteriorProp(doomsday.interiorID, p);
            });
        });

        mp.events.add('unloadNightclubInterrior', () => {
            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
            });

            mp.game.interior.refreshInterior(nightclub.interiorID);
        });

        mp.events.add('loadNightclubInterrior', (style, drinks, lights, effects, clubName, entryLight, security) => {
            mp.game.streaming.requestIpl(nightclub.interiorName);

            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
            });

            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.interrior[parseInt(style)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.drinks[parseInt(drinks)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.lights[parseInt(lights)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.effects[parseInt(effects)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.clubname[parseInt(clubName)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.entrylights[parseInt(entryLight)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.security[parseInt(security)][0]);

            mp.game.interior.refreshInterior(nightclub.interiorID);
        });

        const blackmoneyCleanInterior = {
            interiorName: 'bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo',
            interiorID: 247809,
            props: ['counterfeit_setup', 'counterfeit_upgrade_equip', 'counterfeit_security', 'money_cutter', 'counterfeit_cashpile100a', 'counterfeit_cashpile100b', 'counterfeit_cashpile100c', 'counterfeit_cashpile100d']
        };

        const guenther = {
            interiorName: 'imp_sm_13_cargarage_a',
            interiorID: 255489,
            props: {
                room: ['garage_decor_04', 'numbering_style03_n1', 'lighting_option08']
            }
        };

        const lsc_hangar = {
            interiorName: 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_',
            interiorID: 260353,
            props: ['set_tint_shell', 'set_floor_1', 'set_floor_decal_3', 'set_modarea', 'set_office_modern', 'set_bedroom_modern', 'set_bedroom_tint', 'set_lightning_hangar_c', 'set_lightning_wall_tint01']

            //IPLs hei_dlc_casino_door, hei_dlc_windows_casino

        };mp.game.streaming.requestIpl('hei_dlc_casino_door');
        mp.game.streaming.requestIpl('hei_dlc_windows_casino');

        const intId = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
        props.forEach(p => {
            mp.game.interior.enableInteriorProp(intId, p);
            mp.game.invoke('0xC1F1920BAF281317', intId, p, 1);
        });
        mp.game.interior.refreshInterior(intId);

        mp.game.streaming.requestIpl(guenther.interiorName);
        mp.game.interior.refreshInterior(guenther.interiorID);

        mp.events.add('OnPlayerReady', player => {
            mp.gui.chat.show(false);
            mp.gui.chat.activate(false);
        });

        mp.events.add('updateAduty', aduty => {
            this.aduty = aduty;
            this.invincible = aduty;
            _playerPanel2.default.setAduty(aduty);
        });

        mp.events.add('updateEinreiseDuty', einreiseduty => {
            this.einreiseduty = einreiseduty;
            _playerPanel2.default.setEinreiseDuty(einreiseduty);
        });

        mp.events.add('setActiveRingtone', id => {
            this.activeRingtone = id;
        });

        mp.events.add('nagelband', () => {
            if (this.isInAnyVehicle(true)) {
                let vehicle = mp.players.local.vehicle;

                if (vehicle != null) {
                    vehicle.setTyreBurst(0, false, 1000);
                    vehicle.setTyreBurst(1, false, 1000);
                    vehicle.setTyreBurst(4, false, 1000);
                    vehicle.setTyreBurst(5, false, 1000);
                }
            }
        });

        mp.events.add('createObject', object => {

            this.buildingmode = true;

            this.buildingobject = [];
            this.buildingobject.hash = object;
            this.buildingobject.pos = mp.players.local.position;
            this.buildingobject.rot = new mp.Vector3(0, 0, mp.players.local.heading);
            this.buildingobject.obj = mp.objects.new(object, this.buildingobject.pos, {
                rotation: this.buildingobject.rot,
                alpha: 255,
                dimension: mp.players.local.dimension
            });
            //mp.game.graphics.notify("object created.");
        });

        mp.events.add('closeObjectEditor', object => {
            this.buildingmode = false;

            this.buildingobject = [];
        });

        mp.events.add('responsePushToTalkSound', bool => {
            _playerPanel2.default.responsePPTSound(bool);
        });

        mp.events.add('driveToWayPoint', () => {
            if (mp.players.local == null || mp.players.local.vehicle == null || mp.players.local.vehicle.handle == null) return;

            const waypoint = mp.game.ui.getFirstBlipInfoId(8);
            if (!mp.game.ui.doesBlipExist(waypoint)) return;

            const waypointPos = mp.game.ui.getBlipInfoIdCoord(waypoint);
            if (!waypointPos) return;

            let zCoord = mp.game.gameplay.getGroundZFor3DCoord(waypointPos.x, waypointPos.y, waypointPos.z, false, false);
            if (!zCoord) {
                for (let i = 1000; i >= 0; i -= 25) {
                    mp.game.streaming.requestCollisionAtCoord(waypointPos.x, waypointPos.y, i);
                    mp.game.wait(0);
                }
                zCoord = mp.game.gameplay.getGroundZFor3DCoord(waypointPos.x, waypointPos.y, 1000, false, false);
                if (!zCoord) return;
            }
            mp.players.local.taskVehicleDriveToCoord(mp.players.local.vehicle.handle, waypointPos.x, waypointPos.y, waypointPos.z, 100, 1, 2046537925, 8388614, 30, true);
        });

        mp.events.add('isPlayerSwimming', () => {
            if (mp.players.local.isSwimmingUnderWater() || mp.players.local.isSwimming()) {
                mp.events.callRemote('swimmingOrDivingResponse', true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            } else {
                mp.events.callRemote('swimmingOrDivingResponse', false, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        });

        mp.events.add('updateWanteds', wanteds => {
            this.wanteds = wanteds;
            _playerPanel2.default.setWanteds(wanteds);
        });

        mp.events.add('updateMoney', money => {
            this.money = money;
            _playerPanel2.default.setMoney(money);
        });

        mp.events.add("playerEnterVehicle", (vehicle, seat) => {
            mp.players.local.setConfigFlag(35, false); // helm anziehen beim aufsteigen von motorrad
        });

        mp.events.add('screenFadeAnim', duration => {
            setTimeout(() => {
                mp.game.cam.doScreenFadeOut(100);
            }, 100);

            setTimeout(() => {
                mp.game.cam.doScreenFadeIn(100);
            }, duration);
        });

        mp.events.add('screenFadeOut', () => {
            mp.game.cam.doScreenFadeOut(100);
        });

        mp.events.add('screenFadeIn', () => {
            mp.game.cam.doScreenFadeIn(100);
        });

        mp.keys.bind(0x27, true, function () {
            // Pfeiltaste rechts (Speed hoch)
            if (!mp.players.local.vehicle || mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle || !autopilotActive || autopilotPoint == null || autoPilotSpeed >= 300) return;
            autoPilotSpeed = autoPilotSpeed + 5;
            mp.players.local.taskVehicleDriveToCoord(mp.players.local.vehicle.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 8388614, 30, 1);
            mp.game.graphics.notify("new Speed: " + autoPilotSpeed);
        });

        mp.keys.bind(0x25, true, function () {
            // Pfeiltaste links (Speed runter)
            if (!mp.players.local.vehicle || mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle || !autopilotActive || autopilotPoint == null || autoPilotSpeed <= 10) return;
            autoPilotSpeed = autoPilotSpeed - 5;
            mp.players.local.taskVehicleDriveToCoord(mp.players.local.vehicle.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 8388614, 30, 1);
            mp.game.graphics.notify("new Speed: " + autoPilotSpeed);
        });

        mp.events.add("stopdrive", () => {
            if (mp.players.local == null || !autopilotActive) return;
            mp.players.local.clearTasks();
            autopilotPoint = null;
            autopilotActive = false;
            if (autopilotInterval) clearInterval(autopilotInterval);
            autopilotInterval = null;

            if (mp.players.local.vehicle) {
                mp.players.local.taskVehicleTempAction(mp.players.local.vehicle.handle, 27, 1e4);
            }
        });

        mp.events.add("driveToWayPoint", () => {
            if (!mp.players.local.vehicle || mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;

            let waypoint = mp.game.invoke("0x1BEDE233E6CD2A1F", 8);

            if (mp.game.invoke("0xA6DB27D19ECBB7DA", waypoint)) {
                autopilotPoint = mp.game.ui.getBlipInfoIdCoord(waypoint);
            }

            if (autopilotPoint == null) return;

            autoPilotSpeed = 100;
            mp.players.local.taskVehicleDriveToCoord(mp.players.local.vehicle.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 8388614, 30, 1);
            autopilotActive = true;
            if (autopilotInterval != null) {
                clearInterval(autopilotInterval);
                autopilotInterval = null;
            }

            autopilotInterval = setInterval(function () {
                if (mp.game.system.vdist(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z) < 15) {
                    mp.players.local.clearTasks();
                    mp.players.local.taskVehicleTempAction(mp.players.local.vehicle.handle, 27, 1e4);
                    autopilotPoint = null;
                    autopilotActive = false;
                    clearInterval(autopilotInterval);
                    autopilotInterval = null;
                }
            }, 300);
        });
        mp.events.add('updateAirRadio', state => {
            _playerPanel2.default.setAirRadio(state);
        });

        mp.events.add('setAirRadio', state => {
            _playerPanel2.default.setAirRadioState(state);
        });

        mp.events.add('setNutrition', (eating, drinking) => {
            _playerPanel2.default.setNutritionEating(eating);
            _playerPanel2.default.setNutritionDrinking(drinking);
        });

        mp.events.add('setNutritionEating', state => {
            _playerPanel2.default.setNutritionEating(state);
        });

        mp.events.add('setNutritionDrinking', state => {
            _playerPanel2.default.setNutritionDrinking(state);
        });

        mp.events.add('updateBlackMoney', money => {
            this.blackmoney = money;
            _playerPanel2.default.setBlackmoney(money);
        });

        mp.events.add('updateTeamId', teamId => {
            this.team = teamId;
        });

        mp.events.add('updateTeamRank', teamRank => {
            this.teamRank = teamRank;
        });

        mp.events.add('loadisland', status => {
            mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", status);
            mp.game.invoke("0x5E1460624D194A38", status);
            this.onCayoIsland = status;
        });

        mp.events.add('updateGvmpTeamRank', gvmpTeamRank => {
            this.gvmpTeamRank = gvmpTeamRank;
        });

        mp.events.add('updateInjured', injured => {
            this.injured = injured;
        });

        mp.events.add('updateDuty', duty => {
            this.duty = duty;
        });

        mp.events.add('setcustommarks', (key, shtrange, data, dimension = 0) => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
            }

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.custommarkers[key] = JSON.parse(data);

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark = mp.blips.new(customMarker.id, customMarker.pos, {
                        name: customMarker.name,
                        color: customMarker.color,
                        shortRange: shtrange,
                        dimension: dimension
                    });
                });
            }
        });

        mp.events.add('clearcustommarks', key => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
                return;
            }
            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.custommarkers[key] = [];
        });

        mp.events.add('setmarker', (key, data) => {

            if (this.markers[key] == null) {
                this.markers[key] = [];
            }

            if (this.markers[key].length > 0) {
                this.markers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.markers[key] = JSON.parse(data);

            if (this.markers[key].length > 0) {
                this.markers[key].forEach(customMarker => {
                    customMarker.mark = mp.markers.new(customMarker.type, customMarker.position, customMarker.scale, {
                        direction: customMarker.direction,
                        rotation: customMarker.rotation,
                        color: customMarker.color,
                        visible: customMarker.visible,
                        dimension: customMarker.dimension
                    });
                });
            }
        });

        mp.events.add('clearmarker', key => {

            if (this.markers[key] == null) {
                this.markers[key] = [];
                return;
            }
            if (this.markers[key].length > 0) {
                this.markers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.markers[key] = [];
        });

        mp.events.add('setCheckpoint', (x, y, z) => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
            }

            this.currentCheckpoint = mp.markers.new(1, new mp.Vector3(x, y, z - 1.0), 1.2, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: 0
            });
        });

        mp.events.add('clearCheckpoint', () => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
                return;
            }
        });

        mp.events.add('createCustomObjects', (key, data, dimension = 0) => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
            }

            if (this.customObjects[key] != undefined && this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    if (customObj !== undefined && mp.objects.exists(customObj)) customObj.destroy();
                });
            }
            let objectsData = JSON.parse(data);
            let objects = [];

            if (objectsData !== undefined && objectsData.length > 0) {
                objectsData.forEach(objData => {
                    objects.push(mp.objects.new(objData.objectid, objData.pos, {
                        rotation: objData.rot,
                        alpha: 255,
                        dimension: dimension
                    }));
                });

                this.customObjects[key] = objects;
            }
        });

        mp.events.add('removeCustomObjects', key => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
                return;
            }
            if (this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    if (customObj !== undefined && mp.objects.exists(customObj)) customObj.destroy();
                });
            }
            this.customObjects[key] = [];
        });

        mp.events.add('removeAcMark', () => {
            if (this.acMark1 !== undefined) {
                this.acMark1.destroy();
                this.acMark1 = undefined;
            }
            if (this.acMark2 !== undefined) {
                this.acMark2.destroy();
                this.acMark2 = undefined;
            }
        });

        mp.events.add('setAcMark', (pos1, pos2) => {
            this.acMark1 = mp.blips.new(682, pos1, {
                name: "AC1",
                color: 2,
                shortRange: false
            });
            this.acMark2 = mp.blips.new(682, pos2, {
                name: "AC2",
                color: 1,
                shortRange: false
            });
        });

        mp.events.add('updateCuffed', cuffed => {
            this.cuffed = cuffed;
        });

        mp.events.add('updateTied', tied => {
            this.tied = tied;
        });

        mp.events.add('updateVoiceState', state => {
            this.state = state;
        });

        mp.events.add('setCurrentWeapon', id => {
            this.currentWeapon = id;
        });

        mp.events.add('emptyWeaponAmmo', id => {
            this.currentWeapon = 0;
            this.weaponAmmo = [];
            for (var x in this.weaponAmmo) {
                let ammo = this.weaponAmmo[x].ammo;
            }
        });

        mp.events.add('setPlayerGpsMarker', (x, y) => {
            mp.game.ui.setNewWaypoint(x, y);
        });

        mp.events.add('getWeaponAmmo', () => {
            mp.events.callRemote('getWeaponAmmoAnswer', JSON.stringify(this.weaponAmmo), "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        });

        mp.events.add('fillWeaponAmmo', (id, ammo) => {
            this.weaponAmmo.push({
                id: id,
                ammo: ammo
            });
        });

        mp.events.add('updateWeaponAmmo', (id, ammo) => {
            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != id) {
                    continue;
                }

                this.weaponAmmo[x].ammo = ammo;
            }
        });

        mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {

            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != this.currentWeapon) {
                    continue;
                }
                this.weaponAmmo[x].ammo = this.weaponAmmo[x].ammo - 1;
            }
        });

        mp.events.add('onPlayerLoaded', (firstName, lastName, playerId, academicPoints, business, gwdNote, money, wanteds, house, team, teamRank, level, injured, duty, tied, cuffed, voiceHash, state, phone, job, jobsSkill, animations, gvmpTeamRank, weaponDmg, playerSync, vehicleSync, blackmoney, ringtone, insurance1, zwdNote, meleeDmg, dmglg) => {
            this.firstName = firstName;
            this.lastName = lastName;
            this.playerId = playerId;
            this.academicPoints = academicPoints;
            this.business = business;
            this.gwdNote = gwdNote;
            this.zwdNote = zwdNote;
            this.money = money;
            this.wanteds = wanteds;
            this.superjump = false;
            this.house = house;
            this.team = team;
            this.teamRank = teamRank;
            this.level = level;
            this.injured = injured;
            this.duty = duty;
            this.tied = tied;
            this.cuffed = cuffed;
            this.voiceHash = voiceHash;
            this.state = state;
            this.phone = phone;
            this.job = job;
            this.jobsSkill = jobsSkill;
            this.insurance = insurance1;
            this.animations = JSON.parse(animations);
            this.gvmpTeamRank = gvmpTeamRank;
            this.playerSync = playerSync;
            this.vehicleSync = vehicleSync;
            this.blackmoney = blackmoney;
            this.attachmentsync = true;
            this.activeRingtone = ringtone;
            this.weaponDmg = weaponDmg;
            this.meleeDmg = meleeDmg;
            this.dmglg = dmglg;

            _hud2.default.setVisible(true);
            _playerPanel2.default.setMoney(money);
            _playerPanel2.default.setBlackmoney(blackmoney);
            _playerPanel2.default.setWanteds(wanteds);
            _playerinfo2.default.setPlayerId(playerId);
            _playerinfo2.default.setVoiceHash(voiceHash);

            mp.game.controls.useDefaultVehicleEntering = false;

            mp.game.player.setWeaponDamageModifier(this.weaponDmg);
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);

            this.ready = true;
            render();
            weaponSwitch();
        });

        mp.events.add('loadClientIpl', ipl => {
            mp.game.streaming.requestIpl(ipl);
        });

        mp.events.add('setVoiceHash', voiceHash => {
            this.voiceHash = voiceHash;
        });

        mp.events.add('unloadClientIpl', ipl => {
            mp.game.streaming.removeIpl(ipl);
        });

        mp.events.add('updateWeather', weatherString => {
            mp.game.gameplay.setWeatherTypeNowPersist(weatherString);
        });

        mp.events.add('setWeatherTransition', (weatherString, transitionTime) => {
            mp.game.gameplay.setWeatherTypeOverTime(weatherString, transitionTime);
        });

        mp.events.add("setVehicleSlipStream", state => {
            mp.game.invoke("0xE6C0C80B8C867537", state);
        });

        mp.events.add("switchToWeapon", weapon => {
            mp.players.local.setCanSwitchWeapon(true);
            mp.players.local.weapon = weapon;
        });

        const weaponSwitch = async () => {
            while (true) {

                mp.players.local.setCanSwitchWeapon(true);

                // set current weapon
                if (!this.weaponSwitchActualWeapon || this.weaponSwitchActualWeapon == undefined) {
                    this.weaponSwitchActualWeapon = mp.players.local.weapon;
                } else {
                    var newGun = mp.players.local.weapon;
                    if (this.weaponSwitchActualWeapon != newGun) {
                        this.weaponSwitchActualWeapon = newGun;

                        // nur außerhalb des Fahrzeugs
                        if (!this.getPlayer().isInAnyVehicle(true)) {
                            mp.players.local.setCanSwitchWeapon(false);
                            await mp.game.waitAsync(1000);
                        }
                    }
                }
                await mp.game.waitAsync(50);
            }
        };
        const render = async () => {
            while (true) {
                if (this.ready === false) {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (mp.game.invoke('0x26AF0E8E30BD2A2C', mp.players.local.handle, true)) {
                    this.isOpeningDoor = true;
                } else {
                    if (this.isOpeningDoor) {
                        this.isOpeningDoor = false;
                        await this.checkAnimations(mp.players.local);
                    }
                }

                if (mp.players.local.isInWater() && this.isInWater === false) {
                    this.isInWater = true;
                    mp.events.callRemote('UpdatePlayerWaterState', true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                } else {
                    if (mp.players.local.isInWater() === false && this.isInWater === true) {
                        this.isInWater = false;
                        mp.events.callRemote('UpdatePlayerWaterState', true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    }
                }

                if (mp.players.local.hasCollidedWithAnything()) {
                    this.HasCollided = true;
                } else {
                    if (this.HasCollided === true) {
                        this.HasCollided = false;
                        await this.checkAnimations(mp.players.local);
                    }
                }

                if (mp.players.local.isRagdoll()) {
                    this.HasRagdall = true;
                } else {
                    if (this.HasRagdall === true) {
                        this.HasRagdall = false;
                        let that = this;
                        setTimeout(async function () {
                            await that.checkAnimations(mp.players.local);
                        }, 2000);
                    }
                }
                if (!this.injured) {

                    if (this.hasDamageFX == "" && mp.players.local.getHealth() <= 10) {
                        mp.events.call('startScreenEffect', 'DeathFailNeutralIn', 0, true);
                        this.hasDamageFX = "DeathFailNeutralIn";
                    } else if (this.hasDamageFX == "DeathFailNeutralIn" && mp.players.local.getHealth() > 10) {
                        mp.events.call('stopScreenEffect', this.hasDamageFX);
                        this.hasDamageFX = '';
                    }
                }

                // resync weapondmg
                if (mp.players.local.weapon == mp.game.joaat("weapon_heavysniper")) {
                    mp.game.player.setWeaponDamageModifier(0.445);
                } else {
                    mp.game.player.setWeaponDamageModifier(this.weaponDmg);
                }

                mp.gui.chat.show(false);

                await mp.game.waitAsync(50);
            }
        };

        mp.events.add('setPlayerDamageMultiplier', weaponDmg => {
            this.weaponDmg = weaponDmg;
            mp.game.player.setWeaponDamageModifier(weaponDmg);
        });

        mp.events.add('requestWaypointPosition', returnEvent => {

            const waypoint = mp.game.ui.getFirstBlipInfoId(8);
            if (!mp.game.ui.doesBlipExist(waypoint)) return;

            const waypointPos = mp.game.ui.getBlipInfoIdCoord(waypoint);
            if (!waypointPos) return;

            let zCoord = mp.game.gameplay.getGroundZFor3DCoord(waypointPos.x, waypointPos.y, waypointPos.z, false, false);
            if (!zCoord) {
                for (let i = 1000; i >= 0; i -= 25) {
                    mp.game.streaming.requestCollisionAtCoord(waypointPos.x, waypointPos.y, i);
                    mp.game.wait(0);
                }
                zCoord = mp.game.gameplay.getGroundZFor3DCoord(waypointPos.x, waypointPos.y, 1000, false, false);
                if (!zCoord) return;
            }

            mp.events.callRemote(returnEvent, waypointPos.x, waypointPos.y, waypointPos.z, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        });

        mp.events.add('setPlayerMeleeDamageMultiplier', weaponDmg => {
            this.meleeDmg = weaponDmg;
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);
        });

        mp.events.add('setDmgLg', state => {
            this.dmglg = state;
        });

        mp.events.add('setNMenuItems', data => {
            this.animations = JSON.parse(data);
        });

        mp.events.add('onPlayerContactsLoaded', contacts => {
            this.contacts.parseContacts(contacts);
        });

        mp.events.add('setPlayerAduty', state => {
            mp.players.local.setInvincible(state);
            mp.nametags.enabled = state;
            _playerPanel2.default.setAduty(state);
            this.invincible = state;
        });

        mp.events.add('loadMethInterior', (table, boiler, security) => {
            mp.game.streaming.requestIpl(methlaboratory.interiorName);
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.table[table]);
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.boiler[boiler]);
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.security[security]);
            mp.game.interior.refreshInterior(methlaboratory.interiorID);
        });

        mp.events.add('carmod', (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return;
            }
            vehicle.setMod(parseInt(slot), parseInt(tuning));
        });

        mp.events.add('livery', (vehicle, liveryindex) => {
            mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
        });

        mp.events.add('unloadMethInterior', () => {
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            mp.game.streaming.requestIpl(methlaboratory.interiorName);
            mp.game.interior.refreshInterior(methlaboratory.interiorID);
        });

        mp.events.add('loadblackmoneyInterior', () => {
            mp.game.streaming.requestIpl(blackmoneyCleanInterior.interiorName);
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(blackmoneyCleanInterior.interiorID, prop);
            });
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID);
        });

        mp.events.add('unloadblackmoneyInterior', () => {
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(blackmoneyCleanInterior.interiorID, prop);
            });
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID);
        });

        mp.events.add('loadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName);
            guenther.props.room.forEach(prop => {
                mp.game.interior.enableInteriorProp(guenther.interiorID, prop);
            });
            mp.game.interior.refreshInterior(guenther.interiorID);
        });

        mp.events.add('unloadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName);
            guenther.props.room.forEach(prop => {
                mp.game.interior.disableInteriorProp(guenther.interiorID, prop);
            });
            mp.game.interior.refreshInterior(guenther.interiorID);
        });

        mp.events.add('loadlschangar', () => {
            mp.game.streaming.requestIpl(lsc_hangar.interiorName);
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(lsc_hangar.interiorID, prop);
                mp.game.invoke('0xC1F1920BAF281317', lsc_hangar.interiorID, prop, 2);
            });
            mp.game.interior.refreshInterior(lsc_hangar.interiorID);
        });

        mp.events.add('unloadlschangar', () => {
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(lsc_hangar.interiorID, prop);
            });
            mp.game.streaming.requestIpl(lsc_hangar.interiorName);
            mp.game.interior.refreshInterior(lsc_hangar.interiorID);
        });

        mp.events.add("updatesuperjump", sj => {
            this.superjump = sj;
        });

        mp.events.add("setScuba", active => {
            if (active) {
                //mp.game.invoke("0xF99F62004024D506", mp.players.local.handle, true);
                mp.players.local.setMaxTimeUnderwater(1500.0);
            } else {
                //mp.game.invoke("0xF99F62004024D506", mp.players.local.handle, false);
                mp.players.local.setMaxTimeUnderwater(100.0);
            }
        });

        mp.events.add('loadplanningroom', (grundraum, spiegel, einrichtungsstyle, inneneinrichtung, spielautomaten, rewards, keller, mechanic, hacker, weapons, wardrobe, casinoplan, casinodoor) => {
            // Request both ipls
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName);
            mp.game.streaming.requestIpl(planningroom.plan.interiorName);

            // Dissable all props
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.plan.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.plan.Id, prop);
            });

            // Load propertys arcade
            planningroom.arcade.props.grundraum[parseInt(grundraum)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.spiegel[parseInt(spiegel)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.einrichtungsstyle[parseInt(einrichtungsstyle)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.inneneinrichtung[parseInt(inneneinrichtung)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.spielautomaten[parseInt(spielautomaten)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            var rewardIds = JSON.parse(rewards);
            rewardIds.forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, planningroom.arcade.props.rewards[parseInt(prop)]);
            });

            // Load propertys plan
            planningroom.plan.props.kellerraum[parseInt(keller)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Mechanic[parseInt(mechanic)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Hacker[parseInt(hacker)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Weapons[parseInt(weapons)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Wardrobe[parseInt(wardrobe)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.CasinoPlan[parseInt(casinoplan)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.CasinoDoor[parseInt(casinodoor)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            // Reload
            mp.game.interior.refreshInterior(planningroom.arcade.Id);
            mp.game.interior.refreshInterior(planningroom.plan.Id);
        });

        mp.events.add('attachmeto', target => {
            mp.players.local.attachTo(target.handle, target.getBoneIndex(28422), 0, 0, 0, 0, 0, 0, false, false, false, false, 2, true);
        });

        mp.events.add('unloadplanningroom', () => {
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop);
            });
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName);
            mp.game.interior.refreshInterior(planningroom.arcade.Id);
        });

        mp.events.add('destroydrugped', () => {
            if (this.spawnedDrugPed != null) {
                this.spawnedDrugPed.destroy();
                this.spawnedDrugPed = null;
            }
        });

        mp.events.add('loadprop', (propname, color, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z));
            mp.game.interior.enableInteriorProp(parseInt(myInteriorId), String(propname));
            mp.game.invoke('0xC1F1920BAF281317', parseInt(myInteriorId), String(propname), parseInt(color));
            mp.game.interior.refreshInterior(parseInt(myInteriorId));
        });

        mp.events.add('removeprop', (propname, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z));
            mp.game.interior.disableInteriorProp(parseInt(myInteriorId), String(propname));
            mp.game.interior.refreshInterior(parseInt(myInteriorId));
        });

        var checkpoints = [];

        mp.events.add('loadcheckpoint', () => {
            for (let i = 0; i < 10; i++) {
                let checkpoint = mp.checkpoints.new(1, new mp.Vector3(20 * i, 20 * i, 100), 10, {
                    direction: new mp.Vector3(0, 0, 75),
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: 0
                });
                checkpoint.destination = new mp.Vector3(20 * (i + 1), 20 * (i + 1), 100);
                checkpoints.push(checkpoint);
            }
        });

        mp.events.add('unloadcheckpoint', () => {
            checkpoints.forEach(element => {
                element.destroy();
            });
        });

        var raceMarker;

        mp.events.add('startRace', (x, y, z, dim) => {
            mp.game.ui.setNewWaypoint(x, y);
            raceMarker = mp.markers.new(4, new mp.Vector3(x, y, z), 5.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [0, 255, 0, 255],
                visible: true,
                dimension: dim
            });
        });

        mp.events.add('endRace', () => {
            if (raceMarker != null) raceMarker.destroy();
        });

        var setMarkMarker;

        mp.events.add('setmark', (x, y, z, dim) => {
            if (setMarkMarker != null) {
                setMarkMarker.destroy();
                setMarkMarker = null;
            }
            setMarkMarker = mp.markers.new(0, new mp.Vector3(x, y, z), 1.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: dim
            });
        });

        //Explosion
        mp.events.add('boom', (x, y, z, exploType) => {
            mp.game.invoke('0xE3AD2BDBAEE269AC', x, y, z, parseInt(exploType), 1, 1, 0, 1065353216, 0);
        });

        //Vehicle Explosion
        mp.events.add('boom2', () => {
            if (!mp.players.local.vehicle) return;
            mp.game.invoke('0xBA71116ADF5B514C', mp.players.local.vehicle.handle, true, true);
        });

        mp.events.add('setPlayerCduty', state => {
            this.cduty = state;
        });

        mp.events.add('setPlayerNametags', state => {
            mp.nametags.enabled = state;
        });

        mp.events.add('setPlayerVehicleMultiplier', value => {
            if (!mp.players.local.vehicle) return;
            mp.players.local.vehicle.setEnginePowerMultiplier(value);
            mp.players.local.vehicle.setInvincible(false);
        });

        mp.events.add('createPlayerMarker', destroyLocation => {
            this.marker = mp.markers.new(22, destroyLocation, 2, {
                color: [255, 255, 255, 100],
                visible: true
            });
        });

        mp.events.add('destroyPlayerMarker', () => {
            this.marker.destroy();
            this.marker = null;
        });

        mp.events.add('setSpawnProtection', state => {
            mp.players.local.setInvincible(state);
            this.invincible = state;
        });

        mp.events.add('setInvincible', state => {
            mp.players.local.setInvincible(state);
            this.invincible = state;
        });

        mp.events.add('setBlackout', state => {
            for (let i = 0; i <= 16; i++) {
                mp.game.graphics.setLightsState(i, state);
            }
        });

        mp.events.add('enableInteriorProp', (id, name) => {
            mp.game.interior.enableInteriorProp(id, name);
        });

        mp.events.add('startsoundplay', (soundName, soundSetName) => {
            mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, true);
        });

        mp.events.add('startmusicevent', async soundName => {
            mp.events.call("stopmusicevent");
            mp.game.audio.prepareMusicEvent(soundName);
            await mp.game.waitAsync(1000);
            mp.game.audio.triggerMusicEvent(soundName);
            this.lastMusicEvent = soundName;
        });

        mp.events.add('stopmusicevent', () => {
            if (this.lastMusicEvent !== undefined) {
                mp.game.audio.cancelMusicEvent(this.lastMusicEvent);
                this.lastMusicEvent = undefined;
            }
        });

        mp.events.add('startScreenEffect', (effectName, duration, looped) => {
            mp.game.graphics.startScreenEffect(effectName, duration, looped);
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionToBlurred(250);
            }
        });

        mp.events.add('stopScreenEffect', effectName => {
            mp.game.graphics.stopScreenEffect(effectName);
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionFromBlurred(250);
            }
        });

        mp.events.add('refreshinterior', id => {
            mp.game.interior.refreshInterior(id);
        });

        mp.events.add('setTM', state => {
            mp.game.graphics.setSeethrough(state);
        });

        mp.events.add('setNS', state => {
            mp.game.graphics.setNightvision(state);
        });

        mp.events.add('getInteriorId', () => {
            _playernotification2.default.callOnBrowser(`pushPlayerNotification('${mp.game.interior.getInteriorAtCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)}', '5000')`);
        });

        mp.events.add('disableInteriorProp', (id, name) => {
            mp.game.interior.disableInteriorProp(id, name);
        });

        mp.events.add('entityStreamIn', entity => {
            if (entity != null && entity.type == "player") {
                if (!mp.players.exists(entity)) return;
                mp.events.callRemote("requestPlayerSyncData", entity.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        });

        mp.events.add('responsePlayerSyncData', async (player, isDrunk, animationData, crouchState, props, clothes, isSpectacting) => {
            try {
                props = JSON.parse(props);
                if (props !== null) {
                    for (const i in props) {
                        player.setPropIndex(parseInt(i), parseInt(props[i][0]), parseInt(props[i][1]), false);
                    }
                }

                await this.setPlayerDrunk(player, isDrunk);

                clothes = JSON.parse(clothes);
                if (clothes !== null) {
                    for (const i in clothes) {
                        player.setComponentVariation(parseInt(i), parseInt(clothes[i][0]), parseInt(clothes[i][1]), 0);
                    }
                }

                animationData = JSON.parse(animationData);
                player.__animationData = animationData;
                if (player.__animationData.Active == true) {
                    await this.checkAnimations(player);
                    player.setHeading(player.__animationData.Heading);
                }

                if (crouchState) {
                    player.setMovementClipset("move_ped_crouched", 0.25);
                    player.setStrafeClipset("move_ped_crouched_strafing");
                }

                if (isSpectacting) {
                    player.freezePosition(isSpectacting);
                    player.setCollision(!isSpectacting, !isSpectacting);
                    mp.players.local.setNoCollision(player.handle, true);
                    player.setCanBeTargetted(false);
                }
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('SetOwnAnimData', animationData => {
            try {
                animationData = JSON.parse(animationData);
                mp.players.local.__animationData = animationData;
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('SetAnimDataNear', (player, animationData) => {
            try {
                animationData = JSON.parse(animationData);
                player.__animationData = animationData;
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('setPlayerDrunk', async (player, state) => {
            await this.setPlayerDrunk(player, state);
        });

        mp.events.add('setCloth', (player, slot, drawable, texture) => {
            if (player == null) return;
            player.setComponentVariation(slot, drawable, texture, 0);
        });

        mp.events.add('moveSkyCamera', (player, moveTo, switchType, showGui) => {
            switch (moveTo) {
                case 'up':
                    if (showGui == false) {
                        mp.gui.chat.show(showGui);
                        this.gui = 'false';
                    }

                    mp.game.invoke(this.natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));

                    break;
                case 'down':
                    if (this.gui == 'false') {
                        this.checkCamInAir();
                    }

                    mp.game.invoke(this.natives.SWITCH_IN_PLAYER, player.handle);
                    break;
                default:
                    break;
            }
        });

        mp.events.add('setSyncDataState', (playerSync, vehicleSync) => {
            this.playerSync = playerSync;
            this.vehicleSync = vehicleSync;
        });

        mp.discord.update('German V Roleplay', 'GVMP.de');
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData != undefined && entity.__animationData != null) {
                if (entity.__animationData.Active == true && !entity.vehicle) {
                    mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict);
                    while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                        await mp.game.waitAsync(5);
                    }

                    entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false);
                } else {}
            } else {}
        } catch (e) {
            mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!");
        }
    }

    checkCamInAir() {
        if (mp.game.invoke(this.natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
            setTimeout(() => {
                this.checkCamInAir();
            }, 400);
        }
    }

    async setPlayerDrunk(player, state) {
        if (state) {
            mp.game.streaming.requestAnimSet('move_m@drunk@verydrunk');

            while (!mp.game.streaming.hasAnimSetLoaded('move_m@drunk@verydrunk')) {
                await mp.game.waitAsync(5);
            }

            player.setMovementClipset('move_m@drunk@verydrunk', 1);
        } else {
            player.resetMovementClipset(0);
        }
    }

    setPlayerChatFlag(flag) {
        this.chatFlag = flag;
    }

    getPlayer() {
        return mp.players.local;
    }

    calculateVectorDistance(position) {
        return _utils2.default.calculateVectorDistance(this.getPlayer().position, position);
    }

    getDistance(position) {
        return _utils2.default.getDistance(this.getPlayer().position, position, true);
    }

    isInAnyVehicle() {
        return this.getPlayer().isInAnyVehicle(true);
    }

    isInAir() {
        return this.getPlayer().isInAir();
    }

    /*
    async setAmmoInClip(weapon, ammo) {
          var ammoFull = mp.players.local.getWeaponAmmo(weapon);
        await mp.game.waitAsync(100);
        mp.game.graphics.notify("fullammo:" + ammoFull);
        if(ammoFull == undefined) return;
          if(ammo <= 0 && ammoFull > 0)  {
            ammoFull = ammoFull-1;
            ammo = 1;
        }
        else if(ammo <= 0 && ammoFull <= 0) return;
        
        mp.game.graphics.notify("weapon " + weapon);
        mp.game.graphics.notify("Setclip:" + ammo);
        mp.players.local.setWeaponAmmo(weapon, ammo);
        await mp.game.waitAsync(300)
        mp.game.graphics.notify("setfull:" + ammoFull);
        mp.players.local.setWeaponAmmo(weapon, ammoFull);
        
        this.weaponSwitchAmmo[weapon] = -1;
    }*/

}

exports.default = new Player();

},{"../attachments/attachments":103,"../interfaces/hud/hud":149,"../interfaces/hud/player-panel":155,"../interfaces/hud/playerinfo":156,"../interfaces/hud/playernotification":157,"../utils/utils":226,"./contacts/contacts":206,"./telefonHistory/historys":211}],209:[function(require,module,exports){
"use strict";

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let spectatePlayer = null;

mp.events.add("changeSpectatingState", (entity, value) => {
    if (entity != null && entity.type === "player") {
        if (value) {
            entity.freezePosition(value);
            entity.setCollision(!value, !value);
            mp.players.local.setNoCollision(entity.handle, true);
            entity.setCanBeTargetted(false);
        } else {
            entity.freezePosition(false);
            entity.setCollision(true, true);
            mp.players.local.setNoCollision(entity.handle, false);
            entity.setCanBeTargetted(true);
        }
    }
});

mp.events.add("startSpectate", specplayer => {
    if (specplayer == null) return;
    spectatePlayer = specplayer;
    setTimeout(() => {
        let interval = setInterval(() => {
            if (spectatePlayer != null && mp.players.exists(spectatePlayer.id) && spectatePlayer.position.x != 0 && spectatePlayer.position.y != 0 && spectatePlayer.position.z != 0) {
                var pos = spectatePlayer.position;
                pos.z += 1;
                mp.players.local.position = pos;
            } else {
                clearInterval(interval);
                if (spectatePlayer != null) mp.events.callRemote("stopSpectate", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");else spectatePlayer = null;
            }
        }, 5);
    }, 1500);
});

mp.events.add("stopSpectate", () => {
    spectatePlayer = null;
});

},{"../player/player":208}],210:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class History {
    constructor(contact, number, time, accepted, method) {
        this.contact = contact;
        this.number = number;
        this.time = time;
        this.accepted = accepted;
        this.method = method;
    }
}

exports.default = History;

},{}],211:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _history = require("./history");

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Historys {
    constructor() {
        this.historys = new Map();
    }

    addCallToHistory(contact, number, time, accepted, method) {
        this.historys.set(time, new _history2.default(contact, number, time, accepted, method));
    }

    toJson() {
        var historys = [];
        for (let value of this.historys.values()) {
            historys.push(value);
        }
        return JSON.stringify(historys);
    }
}

exports.default = Historys;

},{"./history":210}],212:[function(require,module,exports){
"use strict";

const Natives = {
    GIVE_WEAPON_COMPONENT_TO_PED: "0xD966D51AA5B28BB9",
    REMOVE_WEAPON_COMPONENT_FROM_PED: "0x1E8BE90C74FB4C09",
    SET_CURRENT_PED_WEAPON: "0xADF692B254977C0C",
    GIVE_WEAPON_TO_PED: "0xBF0FD6E56C964FCB"
};

function addComponentToPlayer(player, weaponHash, componentHash) {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].add(componentHash);
    mp.game.invoke(Natives.GIVE_WEAPON_COMPONENT_TO_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

function removeComponentFromPlayer(player, weaponHash, componentHash) {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].delete(componentHash);
    mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

mp.events.add("updatePlayerWeaponComponent", (player, weaponHash, componentHash, removeComponent) => {
    if (removeComponent) {
        removeComponentFromPlayer(player, weaponHash, componentHash);
    } else {
        addComponentToPlayer(player, weaponHash, componentHash);
    }
});

mp.events.add("resetPlayerWeaponComponents", (player, weaponHash) => {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) return;
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) return;

    for (let component of player.__weaponComponentData[weaponHash]) {
        if (!component) continue;
        mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, component >> 0);
    }
    player.__weaponComponentData[weaponHash].clear();
});

mp.events.add("nukePlayerWeaponComponents", player => {
    if (!player || !player.hasOwnProperty("__weaponComponentData")) return;

    for (let weapon in player.__weaponComponentData) {
        for (let component of player.__weaponComponentData[weapon]) {
            if (!component) continue;
            mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weapon >> 0, component >> 0);
        }
    }

    player.__weaponComponentData = {};
});

mp.events.add("entityStreamIn", entity => {
    if (entity != null && entity.type === "player") {
        if (!mp.players.exists(entity)) return;

        let data = entity.getVariable("currentWeaponComponents");

        if (data) {
            let [weaponHash, components] = data.split(".");
            let componentsArray = components && components.length > 0 ? components.split('|') : [];

            // don't touch this or you will have a bad time
            mp.game.invoke(Natives.GIVE_WEAPON_TO_PED, entity.handle, weaponHash >> 0, -1, false, true);
            for (let component of componentsArray) addComponentToPlayer(entity, weaponHash, component);
            mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
        }
    }
});

mp.events.add("entityStreamOut", entity => {
    if (entity.type === "player" && entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};
});

mp.events.addDataHandler("currentWeaponComponents", (entity, value) => {
    if (entity.type === "player" && entity.handle !== 0) {
        if (!entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};

        let [weaponHash, components] = value.split(".");

        if (!entity.__weaponComponentData.hasOwnProperty(weaponHash)) entity.__weaponComponentData[weaponHash] = new Set();

        let currentComponents = entity.__weaponComponentData[weaponHash];
        let newComponents = components && components.length > 0 ? components.split('|') : [];

        for (let component of currentComponents) {
            if (!component) continue;
            if (!newComponents.includes(component)) removeComponentFromPlayer(entity, weaponHash, component);
        }

        for (let component of newComponents) addComponentToPlayer(entity, weaponHash, component);
        mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);

        entity.__weaponComponentData[weaponHash] = new Set(newComponents);
    }
});

},{}],213:[function(require,module,exports){
"use strict";

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const player = mp.players.local;
let jet = false;
let pedplayer = false;
let cutsceneEnded = false;
let CharacterName = false;
let CharacterGender = 0;

mp.events.add("doneCutscene", () => {
    mp.game.audio.triggerMusicEvent("FM_INTRO_DRIVE_END");
    mp.game.invoke("0xD220BDD222AC4A1E");
    mp.gui.cursor.show(false, false);
    player.setAlpha(255);

    // NOTICE
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, false, false);
    // Hide Ped (Deleting Ped crashes Game)

    setTimeout(() => {
        mp.game.cam.doScreenFadeOut(100);
    }, 100);

    setTimeout(() => {
        mp.game.cam.doScreenFadeIn(100);
    }, 2000);

    player.setInvincible(false);
    mp.events.callRemote("cutsceneEnded", "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
});

mp.events.add("startWelcomeCutscene", async (gender = 0, name = null) => {
    if (name !== null) {
        CharacterName = name;
    }
    if (gender !== 0) {
        CharacterGender = gender;
    }

    player.setInvincible(true);

    mp.game.cam.doScreenFadeOut(0);
    //create hud ready for them to spawn
    mp.gui.cursor.show(false, false);
    mp.game.audio.setAudioFlag("DisableFlightMusic", true);
    player.clearTasksImmediately();
    player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
    player.setInvincible(true);

    mp.game.audio.prepareMusicEvent("FM_INTRO_START");
    //Clone Current Ped
    const pedplayer = mp.game.invoke("0xEF29A16337FACADB", player.handle, 0, false, false);

    //Make Player Invisible
    player.setAlpha(0);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);

    mp.game.cutscene.requestCutscene("mp_intro_concat", 1);

    while (!mp.game.cutscene.hasThisCutsceneLoaded("mp_intro_concat")) {
        await mp.game.waitAsync(5);
    }

    //Render Jet
    const hash = mp.game.joaat("p_cs_mp_jet_01_s");
    jet = mp.game.object.createObject(hash, -1200, -1490, 142.385, false, true, false);

    mp.game.invoke("0x3910051CCECDB00C", jet, false);
    mp.game.invoke("0xEA1C610A04DB6BBB", jet, true, false);

    // Attach Jet to Cutscene
    mp.game.cutscene.registerEntityForCutscene(jet, "MP_Plane", 0, 0, 0);

    if (CharacterGender == 0) {
        // Remove Female NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Female_Character", 3, mp.game.joaat("mp_f_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Male_Character", 0, 0, 0);
    } else {
        // Remove Male NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Male_Character", 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Female_Character", 0, 0, 0);
    }
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, true, false);

    for (let i = 1; i < 8; i++) {
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Plane_Passenger_" + i, 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.invoke("0x4C61C75BEE8184C2", "MP_Plane_Passenger_" + i, 0, 0);
    }

    mp.game.invoke("0xE532F5D78798DAAB", hash);
    setTimeout(() => {
        mp.game.cutscene.startCutscene(4);
        mp.game.invoke("0xBEB2D9A1D9A8F55A", 9, 9, 9, 9);
        mp.game.cam.doScreenFadeIn(500);
        mp.game.audio.triggerMusicEvent("FM_INTRO_START");
    }, 500);
});

mp.events.add("render", () => {
    const time = mp.game.invoke("0xE625BEABBAFFDAB9");
    if (time !== 0 && cutsceneEnded == false) {
        if (time > 26000) {
            cutsceneEnded = true;
            mp.events.call("doneCutscene");
        }
    }
});

},{"../player/player":208}],214:[function(require,module,exports){
'use strict';

const casinoUnloadVaultData = {
    interiorID: 276993,
    props: ['Set_Vault_Door_Broken', 'Set_Vault_Door_Closed', 'Set_Vault_Door', 'Set_vault_dressing', 'Set_vault_cash_02', 'Set_vault_gold_01', 'Set_vault_gold_02', 'Set_vault_art_01', 'set_vault_diamonds_02', 'set_spawn_group1', 'set_spawn_group2']
};

mp.events.add('loadCasinoVaultProps', props => {
    props = JSON.parse(props);
    props.forEach(prop => {
        mp.game.interior.enableInteriorProp(casinoUnloadVaultData.interiorID, prop);
        mp.game.invoke('0xC1F1920BAF281317', casinoUnloadVaultData.interiorID, prop, 2);
    });
    mp.game.interior.refreshInterior(casinoUnloadVaultData.interiorID);
});

mp.events.add('unloadCasinoVaultProps', () => {
    casinoUnloadVaultData.props.forEach(prop => {
        mp.game.interior.disableInteriorProp(casinoUnloadVaultData.interiorID, prop);
    });
    mp.game.interior.refreshInterior(casinoUnloadVaultData.interiorID);
});

mp.events.add("jewellerySmashCase", (pos, oldModel, newModel) => {
    mp.game.audio.playSoundFromCoord(-1, "Glass_Smash", pos.x, pos.y, pos.z, "", false, 0, false);
    mp.game.entity.createModelSwap(pos.x, pos.y, pos.z, 0.1, mp.game.joaat(oldModel), mp.game.joaat(newModel), false);
});

mp.events.add("jewellerySetCasesState", caseJson => {
    caseJson = JSON.parse(caseJson);

    setTimeout(() => {
        caseJson.forEach(caseObj => {
            mp.game.entity.removeModelSwap(caseObj.pos.x, caseObj.pos.y, caseObj.pos.z, 0.1, mp.game.joaat(caseObj.prop2), mp.game.joaat(caseObj.prop), false);

            if (caseObj.isBroken == true) {
                mp.game.entity.createModelSwap(caseObj.pos.x, caseObj.pos.y, caseObj.pos.z, 0.1, mp.game.joaat(caseObj.prop2), mp.game.joaat(caseObj.prop), false);
            }
        });
    }, 1000);
});

},{}],215:[function(require,module,exports){
"use strict";

var currentVision = 0,
    isInDrone = false;

mp.events.add("updateDroneState", isInsideDrone => {
    isInDrone = isInsideDrone;

    if (isInDrone) return;
    mp.game.graphics.setNightvision(false);
    mp.game.graphics.setSeethrough(false);
    currentVision = 0;
});

/*
mp.keys.bind(0x4E, true, function () {
    if (!isInDrone) return;

    if (currentVision == 0) {
        mp.game.graphics.setNightvision(true);
        currentVision = 1;
    }
    else if (currentVision == 1) {
        mp.game.graphics.setNightvision(false);
        mp.game.graphics.setSeethrough(true);
        currentVision = 2;
    }
    else {
        mp.game.graphics.setNightvision(false);
        mp.game.graphics.setSeethrough(false);
        currentVision = 0;
    }

    mp.game.audio.playSoundFrontEnd(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
});*/

},{}],216:[function(require,module,exports){
'use strict';

let einreisetor = null;

mp.events.add('floatObject', (object, toX, toY, toZ, speedX, speedY, speedZ, collision) => {
    if (object == null) return;

    let interval = setInterval(() => {
        if (!object.slide(toX, toY, toZ, speedX, speedY, speedZ, collision)) {
            object.slide(toX, toY, toZ, speedX, speedY, speedZ, collision);
        } else {
            if (object != null) {
                object.destroy();
                object = null;
            }
            clearInterval(interval);
        }
    }, 1);
});

mp.events.add('createEinreiseDoor', () => {
    einreisetor = mp.objects.new("hei_prop_ss1_mpint_garage2", new mp.Vector3(-1082.378, -2827.082, 28.76645), {
        rotation: new mp.Vector3(0, 0, -30),
        alpha: 255,
        dimension: 0
    });
});

mp.events.add('openEinreiseamtDoor', () => {
    mp.events.call('floatObject', einreisetor, -1082.378, -2827.082, 33.76645, 0, 0, 0.0006, true);
});

},{}],217:[function(require,module,exports){
"use strict";

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pointing = {
    active: false,
    interval: null,
    lastSent: 0,

    start: async function () {
        if (!this.active) {
            this.active = true;

            await pointing.awaitDict("anim@mp_point");

            mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1);
            mp.players.local.setConfigFlag(36, true);
            mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
            mp.game.streaming.removeAnimDict("anim@mp_point");

            this.interval = setInterval(this.process.bind(this), 0);
        }
    },

    stop: function () {
        if (this.active) {
            clearInterval(this.interval);
            this.interval = null;
            this.active = false;

            mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop");
            if (!mp.players.local.isInjured()) {
                mp.players.local.clearTasks();
            }

            if (!mp.players.local.isInAnyVehicle(true)) {
                mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1);
            }

            mp.players.local.setConfigFlag(36, false);
            mp.players.local.clearTasks();
        }
    },

    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,

    getRelativePitch: function () {
        const camRot = this.gameplayCam.getRot(2);

        return camRot.x - mp.players.local.getPitch();
    },

    awaitDict: async function (animation) {
        mp.game.streaming.requestAnimDict(animation);

        while (!mp.game.streaming.hasAnimDictLoaded(animation)) {
            await mp.game.waitAsync(0);
        }
    },

    process: function () {
        if (this.active) {
            mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);

            let camPitch = this.getRelativePitch();
            if (camPitch < -70.0) {
                camPitch = -70.0;
            } else if (camPitch > 42.0) {
                camPitch = 42.0;
            }

            camPitch = (camPitch + 70.0) / 112.0;

            let camHeading = mp.game.cam.getGameplayCamRelativeHeading();
            let cosCamHeading = mp.game.system.cos(camHeading);
            let sinCamHeading = mp.game.system.sin(camHeading);

            if (camHeading < -180.0) {
                camHeading = -180.0;
            } else if (camHeading > 180.0) {
                camHeading = 180.0;
            }

            camHeading = (camHeading + 180.0) / 360.0;

            let coords = mp.players.local.getOffsetFromGivenWorldCoords(cosCamHeading * -0.2 - sinCamHeading * (0.4 * camHeading + 0.3), sinCamHeading * -0.2 + cosCamHeading * (0.4 * camHeading + 0.3), 0.6);
            let blocked = typeof mp.raycasting.testPointToPoint(new mp.Vector3(coords.x, coords.y, coords.z - 0.2), new mp.Vector3(coords.x, coords.y, coords.z + 0.2), mp.players.local.handle, 7) !== 'undefined';

            mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Pitch", camPitch);
            mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0);
            mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isBlocked", blocked);
            mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) == 4);

            if (Date.now() - this.lastSent > 60) {
                this.lastSent = Date.now();
                mp.events.callRemoteUnreliable("fpsync.update", camPitch, camHeading);
            }
        }
    }
};

mp.events.add("fpsync.update", (playerH, camPitch, camHeading) => {
    const netPlayer = getPlayerByHandle(parseInt(playerH.handle));
    if (netPlayer != null) {
        if (netPlayer != mp.players.local) {
            netPlayer.lastReceivedPointing = Date.now();

            if (!netPlayer.pointingInterval) {
                netPlayer.pointingInterval = setInterval(function () {
                    if (Date.now() - netPlayer.lastReceivedPointing > 1000) {
                        clearInterval(netPlayer.pointingInterval);

                        netPlayer.lastReceivedPointing = undefined;
                        netPlayer.pointingInterval = undefined;

                        mp.game.invoke("0xd01015c7316ae176", netPlayer.handle, "Stop");

                        if (!netPlayer.isInAnyVehicle(true)) {
                            mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 1, 1, 1, 1);
                        }
                        netPlayer.setConfigFlag(36, false);
                    }
                }.bind(netPlayer), 500);

                pointing.awaitDict("anim@mp_point");

                mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 0, 1, 1, 1);
                netPlayer.setConfigFlag(36, true);
                netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                mp.game.streaming.removeAnimDict("anim@mp_point");
            }
            mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Pitch", camPitch);
            mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Heading", camHeading * -1.0 + 1.0);
            mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isBlocked", 0);
            mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isFirstPerson", 0);
        }
    }
});

mp.keys.bind(0x42, true, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;

    //pointing.start();
});

mp.keys.bind(0x42, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;

    //pointing.stop();
});

function getPlayerByHandle(handle) {
    let pla = mp.players.atHandle(handle);
    if (pla == undefined || pla == null) {
        return null;
    }
    return pla;
}

},{"../app/apps":12,"../player/player":208,"../windows/windows":235}],218:[function(require,module,exports){
"use strict";

mp.events.add("startFirework", fireworkJson => {
    startFirework(fireworkJson);
});

async function startFirework(fireworkJson) {
    fireworkJson = JSON.parse(fireworkJson);
    mp.game.streaming.requestNamedPtfxAsset("scr_indep_fireworks");

    while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_indep_fireworks")) await mp.game.waitAsync(100);

    for (var fireworkEntry in fireworkJson) {
        let offset = new mp.Vector3(fireworkJson[fireworkEntry].prop.Position.x, fireworkJson[fireworkEntry].prop.Position.y + 0.05, fireworkJson[fireworkEntry].prop.Position.z - 1.02);

        switch (fireworkJson[fireworkEntry].type) {
            case "rocket":
                startRocket(offset);
                break;
            case "box":
                startBox(offset);
                break;
            case "cone":
                startCone(offset);
                break;
            case "cylinder":
                startCylinder(offset);
                break;
        }
    }
}

async function startCylinder(offset) {
    for (var i = 1; i <= 5; i++) {
        await mp.game.waitAsync(1500);
        mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
        mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
        mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_shotburst", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 0.5 + 0.8, false, false, false);
    }

    for (var i = 1; i <= 3; i++) {
        await mp.game.waitAsync(2500);
        mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
        mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
        mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_shotburst", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 1.5 + 1.8, false, false, false);
    }
}

async function startCone(offset) {
    for (var i = 1; i <= 5; i++) {
        await mp.game.waitAsync(1500);
        mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
        mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
        mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_fountain", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 0.5 + 0.8, false, false, false);
    }

    await mp.game.waitAsync(2500);
    mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
    mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
    mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_fountain", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 1.5 + 1.8, false, false, false);
}

async function startRocket(offset) {
    await mp.game.waitAsync(1500);
    mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
    mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
    mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_starburst", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, 2.5, false, false, false);
}

async function startBox(offset) {
    for (var i = 1; i <= 8; i++) {
        await mp.game.waitAsync(1500);
        mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
        mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
        mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 1.2 + 1.5, false, false, false);
    }

    await mp.game.waitAsync(4000);
    mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
    mp.game.graphics.setParticleFxNonLoopedColour(Math.random() * 1, Math.random() * 1, Math.random() * 1);
    mp.game.graphics.startParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst", offset.x, offset.y, offset.z, 0.0, 0.0, 0.0, Math.random() * 1.2 + 1.8, false, false, false);
}

},{}],219:[function(require,module,exports){
"use strict";

mp.events.add("spawnFX", async (effectCat, effectName, pos, rot, duration = null) => {
    if (pos == null) return;

    mp.game.streaming.requestNamedPtfxAsset(effectCat);
    while (!mp.game.streaming.hasNamedPtfxAssetLoaded(effectCat)) {
        await mp.game.waitAsync(100);
    }

    if (duration != null) {
        for (var i = 1; i <= duration / 1000; i++) {
            await mp.game.waitAsync(1000);
            mp.game.graphics.setPtfxAssetNextCall(effectCat);
            mp.game.graphics.startParticleFxNonLoopedAtCoord(effectName, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, 2, false, false, false);
        }
    } else {
        mp.game.graphics.setPtfxAssetNextCall(effectCat);
        mp.game.graphics.startParticleFxNonLoopedAtCoord(effectName, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, 2, false, false, false);
    }
});

},{}],220:[function(require,module,exports){
'use strict';

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNormalizedVector = function (vector) {
    var mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};
var getCrossProduct = function (v1, v2) {
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};

var bindASCIIKeys = {
    Q: 69,
    E: 81,
    LCtrl: 17,
    Shift: 16
};

var isNoClip = false;
var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var localPlayer = mp.players.local;

mp.events.add('toggleNoClip', state => {
    isNoClip = state;
    mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
        startNoClip();
    } else {
        stopNoClip();
    }
});

mp.events.add('gotocam', pos => {
    if (noClipCamera) {
        pos = JSON.parse(pos);
        noClipCamera.setCoord(pos.x, pos.y, pos.z);
    }
});

function startNoClip() {
    var camPos = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z);
    var camRot = mp.game.cam.getGameplayCamRot(2);
    noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
    noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    localPlayer.setInvincible(true);
    localPlayer.setVisible(false, false);
    localPlayer.setCollision(false, false);
    mp.nametags.enabled = true;
}
function stopNoClip() {
    if (noClipCamera) {
        localPlayer.position = noClipCamera.getCoord();
        localPlayer.setHeading(noClipCamera.getRot(2).z);
        noClipCamera.destroy(true);
        noClipCamera = null;
    }

    var groundz = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
    localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, groundz);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localPlayer.freezePosition(false);
    localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
    mp.nametags.enabled = false;
}

mp.events.add('render', () => {
    if (!noClipCamera || mp.gui.cursor.visible) {
        return;
    }
    controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
    shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
    var rot = noClipCamera.getRot(2);
    var fastMult = 1;
    var slowMult = 1;
    if (shiftModifier) {
        fastMult = 3;
    } else if (controlModifier) {
        slowMult = 0.5;
    }
    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    var pos = noClipCamera.getCoord();
    var rr = noClipCamera.getDirection();
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;
    var upVector = new mp.Vector3(0, 0, 1);
    var rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;
    var upMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.Q)) {
        upMovement = 0.5;
    }
    var downMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.E)) {
        downMovement = 0.5;
    }
    mp.players.local.position = new mp.Vector3(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z + 1);
    mp.players.local.heading = rr.z;
    noClipCamera.setCoord(pos.x - vector.x + rightVector.x, pos.y - vector.y + rightVector.y, pos.z - vector.z + rightVector.z + upMovement - downMovement);
    noClipCamera.setRot(rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);
});

},{"../player/player":208}],221:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let bins = mp.game.joaat(["prop_snow_bin_01", "prop_snow_dumpster_01", "prop_snow_bin_02", "prop_dumpster_4a", "prop_bin_05a", "prop_bin_01a", "prop_dumpster_02b", "prop_bin_12a", "prop_bin_08a", "prop_bin_06a", "prop_bin_02a", "prop_dumpster_01a", "prop_dumpster_02a", "prop_cs_bin_02", "prop_bin_07b", "prop_bin_07c", "prop_bin_07a", "prop_bin_03a", "prop_bin_08open", "prop_bin_delpiero_b", "prop_bin_delpiero", "prop_bin_04a", "prop_bin_09a", "prop_dumpster_3a", "prop_dumpster_4b", "sc1_07_clinical_bin", "prop_gas_binunit01", "prop_bin_14a", "prop_cs_dumpster_01a", "v_serv_waste_bin1", "prop_bin_11b", "prop_bin_10a", "prop_bin_beach_01a", "prop_bin_11a", "prop_bin_13a", "prop_bin_beach_01d", "prop_bin_10b", "prop_bin_14b", "prop_cs_bin_01", "prop_cs_bin_03", "v_ret_gc_bin", "v_ret_csr_bin", "v_med_bin", "mp_b_kit_bin_01", "hei_heist_kit_bin_01", "ch_prop_casino_bin_01a", "vw_prop_vw_casino_bin_01a", "prop_recyclebin_01a", "prop_recyclebin_04_a", "prop_recyclebin_04_b", "prop_recyclebin_05_a", "prop_recyclebin_02b", "prop_recyclebin_02a", "prop_recyclebin_02_d", "prop_recyclebin_02_c"]);

class GetObjects {
    constructor() {}

    getBin() {
        for (let i = 0; i < bins.length; i++) {
            var check = mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, bins[i], false, true, true);
            if (check) {
                return "bin";
            }
        }

        return "";
    }

    test() {
        return "TEST";
    }

}

exports.default = new GetObjects();

},{}],222:[function(require,module,exports){
"use strict";

var _peds = require("../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let soundInterval = null;
//FadeOutDeath cuz of new Handling
mp.game.gameplay.setFadeOutAfterDeath(false);

//Prevent
/*mp.events.add('projectile', () => {
    return true;
});

mp.events.add('explosion', () => {
    return true;
});*/

//Explosion-Types: https://wiki.rage.mp/index.php?title=Explosions
mp.events.add("addExplosion", (pos, explosionType, damageScale, isAudible, isInvisible, cameraShake) => {
    mp.game.fire.addExplosion(pos.x, pos.y, pos.z, explosionType, damageScale, isAudible, isInvisible, cameraShake);
});

//Explosion-Types: https://wiki.rage.mp/index.php?title=Explosions
mp.events.add("addExplosionOnGround", (pos, explosionType, damageScale, isAudible, isInvisible, cameraShake) => {

    pos.z = mp.game.gameplay.getGroundZFor3DCoord(pos.x, pos.y, pos.z + 200, false, false);

    mp.game.fire.addExplosion(pos.x, pos.y, pos.z, explosionType, damageScale, isAudible, isInvisible, cameraShake);
});

mp.events.add("playerSpawn", client => {
    mp.game.gameplay.setFadeOutAfterDeath(false);

    //Helmet DMG reduce does not work..
    //mp.players.local.setConfigFlag(149,false);
    //mp.players.local.setConfigFlag(438, false);

    mp.game.player.setWeaponDamageModifier(_player2.default.weaponDmg);
    mp.game.player.setMeleeWeaponDamageModifier(_player2.default.meleeDmg);
});

mp.players.local.setSuffersCriticalHits(true);
//Disable sneaking
mp.players.local.setStealthMovement(false, '0');

mp.events.add('toggleHeadshot', state => {
    mp.players.local.setSuffersCriticalHits(state);
});

mp.events.add('triggerRagdoll', time => {
    _player2.default.injured = true;
    mp.players.local.setToRagdoll(time, time, 0, true, true, true);

    setTimeout(function () {
        _player2.default.injured = false;
    }, time);
});

mp.events.add('render', () => {
    mp.game.vehicle.setExperimentalAttachmentSyncEnabled(true);

    //HIDE STREET NAME BOTTOM RIGHT
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(7);

    //DISABLE STEALTH KILL
    if (mp.players.local.isPerformingStealthKill()) {
        mp.players.local.clearTasksImmediately();
    }

    // meele combat
    if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6)) {
        // Is Ped Armed
        mp.game.controls.disableControlAction(0, 140, true); // INPUT_MELEE_ATTACK_LIGHT
        mp.game.controls.disableControlAction(0, 141, true); // INPUT_MELEE_ATTACK_HEAVY
        mp.game.controls.disableControlAction(0, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE
    }

    // generell disablings
    //mp.game.controls.disableControlAction(0, 44, true); // Cover

    // Combat running
    /*
    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "DEFAULT_ACTION");
    }
    */

    // Hide Ammo
    mp.game.ui.displayAmmoThisFrame(false);

    // Slowmo Camera Abuses
    mp.game.controls.disableControlAction(0, 7, true); // INPUT_CINEMATIC_SLOWMO
    mp.game.controls.disableControlAction(0, 334, true); // INPUT_VEH_SLOWMO_UD
    mp.game.controls.disableControlAction(0, 335, true); // INPUT_VEH_SLOWMO_UP_ONLY
    mp.game.controls.disableControlAction(0, 336, true); // INPUT_VEH_SLOWMO_DOWN_ONLY

    // disable while freezed
    if (_player2.default.cuffed || _peds2.default.freezed) {
        // disabling veh attacks
        mp.game.controls.disableControlAction(0, 69, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 24, true); //
        mp.game.controls.disableControlAction(0, 92, true); //
        mp.game.controls.disableControlAction(0, 106, true); //
        mp.game.controls.disableControlAction(0, 257, true); //
        mp.game.controls.disableControlAction(0, 346, true); //
        mp.game.controls.disableControlAction(0, 25, true); //
        mp.game.controls.disableControlAction(0, 68, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 91, true); //
    }
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {

    if (targetEntity.type === 'player' && sourceEntity.type === 'player' && _player2.default.dmglg) {
        mp.events.callRemoteUnreliable("aads", targetEntity.remoteId, Math.floor(sourceEntity.position.subtract(targetEntity.position).length()), boneIndex === 20 ? Math.floor(damage / 18) : damage, boneIndex, weapon.toString());
    }
});

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {

    if (targetEntity.type === 'player' && boneIndex === 20 && !_player2.default.invincible) {
        if (damage <= 5) {
            damage = 306;
        }
        mp.players.local.applyDamageTo(Math.floor(damage / 18), true);
        return true;
    }
});

mp.events.add("playSoundFromCoordLooped", (soundId, audioName, audioRef, pos, timeout) => {
    if (soundInterval != null) clearInterval(soundInterval);
    soundInterval = null;

    soundInterval = setInterval(() => {
        mp.game.audio.playSoundFromCoord(soundId, audioName, pos.x, pos.y, pos.z, audioRef, false, 0, false);
    }, timeout);
});

mp.events.add("stopSoundFromCoordLooped", () => {
    if (soundInterval == null) return;
    clearInterval(soundInterval);
    soundInterval = null;
});

},{"../peds/peds":202,"../player/player":208}],223:[function(require,module,exports){
'use strict';

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------GetWaypointVector3---------------//
mp.events.addProc('13371337', () => {
    if (mp.players.local == null) return new mp.Vector3(0, 0, 0);
    const waypoint = mp.game.ui.getFirstBlipInfoId(8);
    if (!mp.game.ui.doesBlipExist(waypoint)) return new mp.Vector3(0, 0, 0);

    const waypointPos = mp.game.ui.getBlipInfoIdCoord(waypoint);
    if (!waypointPos) return new mp.Vector3(0, 0, 0);

    return waypointPos;
});

mp.events.add('addBlipsForRadius', data => {

    let BlipsData = JSON.parse(data);

    if (BlipsData !== undefined && BlipsData.length > 0) {
        BlipsData.forEach(blpData => {
            var doesBlipExist = _player2.default.customBlipsForRadius.find(x => x.Id == blpData.Id);
            if (!doesBlipExist) {
                let turfBlip = mp.game.ui.addBlipForRadius(blpData.Position.x, blpData.Position.y, 1, blpData.Radius);
                mp.game.invoke("0xDF735600A4696DAF", turfBlip, blpData.Sprite); // SET_BLIP_SPRITE
                mp.game.invoke("0x45FF974EEE1C8734", turfBlip, blpData.Alpha); // SET_BLIP_ALPHA
                mp.game.invoke("0x03D7FB09E75D6B7E", turfBlip, blpData.Color); // SET_BLIP_COLOUR
                mp.game.invoke("0xF87683CDF73C3F6E", turfBlip, blpData.Rotation); // SET_BLIP_ROTATION
                mp.game.invoke("0xB14552383D39CE3E", turfBlip, blpData.Flashing); // SET_BLIP_FLASHES
                _player2.default.customBlipsForRadius.push({ 'id': blpData.Id, 'blip': turfBlip });
            }
        });
    }
});

mp.events.add('removeBlipForRadius', id => {
    _player2.default.customBlipsForRadius.forEach(item => {
        if (item.id == id) {
            if (mp.game.invoke("0xA6DB27D19ECBB7DA", item.blip)) {
                mp.game.ui.removeBlip(item.blip);
            }
            _player2.default.customBlipsForRadius.splice(_player2.default.customBlipsForRadius.indexOf(item), 1);
        }
    });
});

},{"../player/player":208}],224:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Raycast {
    constructor() {
        this.camera = mp.cameras.new("gameplay");
    }

    getCameraHitCoord() {
        let position = this.camera.getCoord();
        let direction = this.camera.getDirection();
        let farAway = new mp.Vector3(direction.x * 12 + position.x, direction.y * 12 + position.y, direction.z * 12 + position.z);
        let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);

        if (hitData != undefined) {
            return hitData;
        }
        return null;
    }

    createRaycast() {
        let obj = this.getCameraHitCoord();
        if (obj == null) {
            mp.gui.chat.push("no obj found");
        } else {
            if (obj.entity == null || obj.entity == undefined) return null;
            if (obj.entity.handle == null || obj.entity.handle == undefined) return null;

            let entityCheck = mp.game.entity.isAnEntity(obj.entity.handle);
            if (entityCheck) {
                return obj;
            }

            return null;
        }
        return null;
    }
}

exports.default = new Raycast();

},{}],225:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class BodyCameraSingleton {
    constructor() {}
    //


    /**
     * Create a new camera at given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    createBodyCamera(position) {
        if (this.camera) return;

        this.camera = mp.cameras.new('default', position, new mp.Vector3(0, 0, 0), 40); // name, position, rotation, fov (field of view)
        this.camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 500, true, false);
    }

    /**
     * Create a new camera at given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    createBodyCamera2(position, rotation) {
        if (this.camera) return;

        this.camera = mp.cameras.new('default', position, rotation, 40); // name, position, rotation, fov (field of view)
        this.camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 500, true, false);
    }

    /**
     * Set the camera to a given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    setBodyCameraPosition(position) {
        if (!this.camera) return;

        this.camera.setCoord(position.x, position.y, position.z);
    }

    /**
     * Make the camera fly to a specific position.
     *
     * @param position
     */
    flyBodyCameraTo(position) {
        if (!this.camera) return;

        // Set "default" camera to not active this will enable the in game camera.
        this.camera.setActive(false);
        this.resetRenderScriptCams();

        // Create new camera at "default" camera position.
        let interpCamera = mp.cameras.new('inter', this.camera.getCoord(), this.camera.getRot(2), this.camera.getFov()); // name, position, rotation, fov (field of view)

        // Set "default" camera to new position.
        this.camera.setCoord(position.x, position.y, position.z);
        this.camera.stopPointing();

        // Translate between newly created camera and "default" camera.
        this.camera.setActiveWithInterp(interpCamera.handle, 500, 0, 0);
        mp.game.cam.renderScriptCams(true, false, 500, true, false);

        // CleanUp
        interpCamera.destroy();
        interpCamera = null;
    }

    flyBodyCameraWithFixedParams(heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance);

        this.flyBodyCameraTo(new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ));
    }

    flyBodyCameraWithParams(rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, playerRotation + rotation, distance);

        this.flyBodyCameraTo(new mp.Vector3(newPosition.x, newPosition.y, playerPosition.z + heightCamera));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, playerPosition.z + (heightPointAt || heightCamera)));
    }

    rotateBodyCameraWithParams(rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, playerRotation + rotation, distance);

        this.setBodyCameraPosition(new mp.Vector3(newPosition.x, newPosition.y, playerPosition.z + heightCamera));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, playerPosition.z + (heightPointAt || heightCamera)));
    }

    rotateBodyCameraWithFixedParams(heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance);

        this.setBodyCameraPosition(new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ));
    }

    /**
     * Make the camera point to a specific coordinate.
     *
     * @param position
     */
    pointBodyCameraAt(position) {
        if (this.camera == null) return;
        this.camera.pointAtCoord(position.x, position.y, position.z);
    }

    /**
     * Destroy the camera and reset everything to normal.
     *
     */
    resetBodyCamera() {
        if (!this.camera) return;

        this.camera.setActive(false);
        this.camera.destroy();
        this.resetRenderScriptCams();

        this.camera = null;
    }

    resetRenderScriptCams() {
        mp.game.cam.renderScriptCams(false, false, 3000, true, true);
    }

    /**
     * Calculates from a given position and a given "rotation" the position that is "distance" away.
     *
     * @param x
     * @param y
     * @param rotation
     * @param distance
     *
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rotation, distance) {
        return {
            x: x + Math.sin(-rotation * Math.PI / 180) * distance,
            y: y + Math.cos(-rotation * Math.PI / 180) * distance
        };
    }
}

exports.default = new BodyCameraSingleton();

},{}],226:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Utils {
    getDistance(pos1, pos2, useZ) {
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    calculateVectorDistance(pos1, pos2) {
        let x = pos1.x - pos2.x;
        let y = pos1.y - pos2.y;
        let z = pos1.z - pos2.z;
        return new mp.Vector3(x < 0 ? x * -1 : x, y < 0 ? y * -1 : y, z < 0 ? z * -1 : z);
    }

    pointCameraAtFace() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 1, 0.7), 0, 40);
        const head = mp.players.local.getBoneCoords(31086, 0, 0, 0);
        camera.pointAtCoord(head.x, head.y, head.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    pointCameraAtBody() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 3, 1), 0, 40);
        const pos = mp.players.local.position;
        if (camera == null) return;
        camera.pointAtCoord(pos.x, pos.y, pos.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    disableCamera() {
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
    calcDist(v1, v2) {
        v1.x, v1.y, v1.z, v2.x, v2.y, v2.z;
    }

    async loadAnimation(animation) {
        mp.game.streaming.requestAnimDict(animation);

        while (!mp.game.streaming.hasAnimDictLoaded(animation)) {
            await mp.game.waitAsync(5);
        }
    }
}

exports.default = new Utils();

},{}],227:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//pside = rechts
//dside = links
/*
door_pside_f,   //Door right, front  
door_dside_r,   //Door left, back  
door_pside_r,   //Door right, back  */

class VehicleEnter {

    calcDist(v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
    }

    getClosestVehicleSeat(vehicle) {

        let enableBoneDebugging = false;

        let returnData = [];

        const driverSeatId = -1; // CHANGE THIS AS THE DRIVER INDEX CHANGES
        const playerPos = mp.players.local.position;

        if (mp.game.vehicle.isThisModelABike(vehicle.model)) {
            if (vehicle.isSeatFree(0)) {
                this.teleport = false;
                returnData['seat'] = 0;
                returnData['distance'] = this.calcDist(playerPos, vehicle.position);
                return returnData;
            } else {
                returnData['seat'] = -1;
                returnData['distance'] = 100;
                return returnData;
            }
        }

        // Seat Bones (connected to the... leg bone)
        // const seatFrontDriver = vehicle.getBoneIndexByName('seat_dside_f');
        const seatRear = vehicle.getBoneIndexByName('seat_r');
        const seatFrontPassenger = vehicle.getBoneIndexByName('seat_pside_f');
        const seatRearDriver = vehicle.getBoneIndexByName('seat_dside_r');
        const seatRearDriver1 = vehicle.getBoneIndexByName('seat_dside_r1');
        const seatRearDriver2 = vehicle.getBoneIndexByName('seat_dside_r2');
        const seatRearDriver3 = vehicle.getBoneIndexByName('seat_dside_r3');
        const seatRearDriver4 = vehicle.getBoneIndexByName('seat_dside_r4');
        const seatRearDriver5 = vehicle.getBoneIndexByName('seat_dside_r5');
        const seatRearDriver6 = vehicle.getBoneIndexByName('seat_dside_r6');
        const seatRearDriver7 = vehicle.getBoneIndexByName('seat_dside_r7');
        const seatRearPassenger = vehicle.getBoneIndexByName('seat_pside_r');
        const seatRearPassenger1 = vehicle.getBoneIndexByName('seat_pside_r1');
        const seatRearPassenger2 = vehicle.getBoneIndexByName('seat_pside_r2');
        const seatRearPassenger3 = vehicle.getBoneIndexByName('seat_pside_r3');
        const seatRearPassenger4 = vehicle.getBoneIndexByName('seat_pside_r4');
        const seatRearPassenger5 = vehicle.getBoneIndexByName('seat_pside_r5');
        const seatRearPassenger6 = vehicle.getBoneIndexByName('seat_pside_r6');
        const seatRearPassenger7 = vehicle.getBoneIndexByName('seat_pside_r7');

        // Positions in world
        // const seatFrontDriverPosition = seatFrontDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontDriver);
        const seatRearPosition = seatRear === -1 ? null : vehicle.getWorldPositionOfBone(seatRear);
        const seatFrontPassengerPosition = seatFrontPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontPassenger);
        const seatRearDriverPosition = seatRearDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver);
        const seatRearDriver1Position = seatRearDriver1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver1);
        const seatRearDriver2Position = seatRearDriver2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver2);
        const seatRearDriver3Position = seatRearDriver3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver3);
        const seatRearDriver4Position = seatRearDriver4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver4);
        const seatRearDriver5Position = seatRearDriver5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver5);
        const seatRearDriver6Position = seatRearDriver6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver6);
        const seatRearDriver7Position = seatRearDriver7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver7);
        const seatRearPassengerPosition = seatRearPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger);
        const seatRearPassenger1Position = seatRearPassenger1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger1);
        const seatRearPassenger2Position = seatRearPassenger2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger2);
        const seatRearPassenger3Position = seatRearPassenger3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger3);
        const seatRearPassenger4Position = seatRearPassenger4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger4);
        const seatRearPassenger5Position = seatRearPassenger5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger5);
        const seatRearPassenger6Position = seatRearPassenger6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger6);
        const seatRearPassenger7Position = seatRearPassenger7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger7);

        // Get closest seat
        let closestFreeSeatNumber = -1;
        let seatIndex = driverSeatId;
        let closestSeatDistance = Number.MAX_SAFE_INTEGER;
        let calculatedDistance = null;

        // Inline Rear
        calculatedDistance = seatRearPosition === null ? null : this.calcDist(playerPos, seatRearPosition);
        seatIndex = seatRear === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_r");
            }
        }

        // Side by Side vehicles
        calculatedDistance = seatFrontPassengerPosition === null ? null : this.calcDist(playerPos, seatFrontPassengerPosition);
        seatIndex = seatFrontPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_f");
            }
        }

        calculatedDistance = seatRearDriverPosition === null ? null : this.calcDist(playerPos, seatRearDriverPosition);
        seatIndex = seatRearDriver === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r");
            }
        }

        calculatedDistance = seatRearPassengerPosition === null ? null : this.calcDist(playerPos, seatRearPassengerPosition);
        seatIndex = seatRearPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r");
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver1Position === null ? null : this.calcDist(playerPos, seatRearDriver1Position);
        seatIndex = seatRearDriver1 === -1 ? seatIndex : seatIndex + 1; // 3
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger1Position === null ? null : this.calcDist(playerPos, seatRearPassenger1Position);
        seatIndex = seatRearPassenger1 === -1 ? seatIndex : seatIndex + 1; // 4
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver2Position === null ? null : this.calcDist(playerPos, seatRearDriver2Position);
        seatIndex = seatRearDriver2 === -1 ? seatIndex : seatIndex + 1; // 5
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r2");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger2Position === null ? null : this.calcDist(playerPos, seatRearPassenger2Position);
        seatIndex = seatRearPassenger2 === -1 ? seatIndex : seatIndex + 1; // 6
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r2");
                }
            }
        }

        calculatedDistance = seatRearDriver3Position === null ? null : this.calcDist(playerPos, seatRearDriver3Position);
        seatIndex = seatRearDriver3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r3");
            }
        }

        calculatedDistance = seatRearPassenger3Position === null ? null : this.calcDist(playerPos, seatRearPassenger3Position);
        seatIndex = seatRearPassenger3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r3");
            }
        }

        calculatedDistance = seatRearDriver4Position === null ? null : this.calcDist(playerPos, seatRearDriver4Position);
        seatIndex = seatRearDriver4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r4");
            }
        }

        calculatedDistance = seatRearPassenger4Position === null ? null : this.calcDist(playerPos, seatRearPassenger4Position);
        seatIndex = seatRearPassenger4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r4");
            }
        }

        calculatedDistance = seatRearDriver5Position === null ? null : this.calcDist(playerPos, seatRearDriver5Position);
        seatIndex = seatRearDriver5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r5");
            }
        }

        calculatedDistance = seatRearPassenger5Position === null ? null : this.calcDist(playerPos, seatRearPassenger5Position);
        seatIndex = seatRearPassenger5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r5");
            }
        }

        calculatedDistance = seatRearDriver6Position === null ? null : this.calcDist(playerPos, seatRearDriver6Position);
        seatIndex = seatRearDriver6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r6");
            }
        }

        calculatedDistance = seatRearPassenger6Position === null ? null : this.calcDist(playerPos, seatRearPassenger6Position);
        seatIndex = seatRearPassenger6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r6");
            }
        }

        calculatedDistance = seatRearDriver7Position === null ? null : this.calcDist(playerPos, seatRearDriver7Position);
        seatIndex = seatRearDriver7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r7");
            }
        }

        calculatedDistance = seatRearPassenger7Position === null ? null : this.calcDist(playerPos, seatRearPassenger7Position);
        seatIndex = seatRearPassenger7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r7");
            }
        }

        if (closestFreeSeatNumber === -1) {
            returnData['seat'] = -1;
            returnData['distance'] = 100;
            return returnData;
        }

        const lastAnimatableSeatOverrides = {
            [mp.game.joaat('journey')]: driverSeatId + 1,
            [mp.game.joaat('journey2')]: driverSeatId + 1
        };

        let lastAnimatableSeatIndex = driverSeatId + 3;
        if (lastAnimatableSeatOverrides[vehicle.model] !== undefined) {
            lastAnimatableSeatIndex = lastAnimatableSeatOverrides[vehicle.model];
        }

        if (closestFreeSeatNumber <= lastAnimatableSeatIndex) {
            // Normal Enter
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        } else {
            // Warp Enter
            this.teleport = true;
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        }
    }

    getClosestVehicle() {
        let closest = null;
        let closestDistance = 5;

        mp.vehicles.forEachInStreamRange(vehicle => {

            this.model = vehicle.getModel();

            this.distance = 5;

            const dist = this.getDistanceToEntity(vehicle, false);

            if (dist > this.distance) {
                return;
            }

            if (closest == null) {
                closest = vehicle;
            }

            if (dist < this.getDistanceToEntity(closest, false)) {
                closest = vehicle;
            }
        });

        return closest;
    }

    getClosestVehiclesInRange(range) {
        let closestVehicles = [];

        mp.vehicles.forEachInStreamRange(vehicle => {
            if (this.getDistanceToEntity(vehicle, false) < range) {
                closestVehicles.push(vehicle);
            }
        });

        return closestVehicles;
    }

    getClosestGarbageVehicleInRange(range) {

        let closestVehicle = null;

        mp.vehicles.forEachInStreamRange(vehicle => {

            if (this.getDistanceToEntity(vehicle, false) < range) {
                if (closestVehicle == null) {
                    closestVehicle = vehicle;
                }
                if ((vehicle.model == 0x72435A19 || vehicle.model == 0xB527915C) && this.getDistanceToEntity(vehicle, false) < this.getDistanceToEntity(closestVehicle, false)) {
                    closestVehicle = vehicle;
                }
            }
        });

        return closestVehicle;
    }

    getClosestSingleVehicleInRange(range) {

        let closestVehicle = null;

        mp.vehicles.forEachInStreamRange(vehicle => {

            if (this.getDistanceToEntity(vehicle, false) < range) {
                if (closestVehicle == null) {
                    closestVehicle = vehicle;
                }
                if (this.getDistanceToEntity(vehicle, false) < this.getDistanceToEntity(closestVehicle, false)) {
                    closestVehicle = vehicle;
                }
            }
        });

        return closestVehicle;
    }

    enter(vehicle, seat) {
        if (this.teleport) {
            if (vehicle.getVariable('lockedStatus')) return;
            mp.players.local.setIntoVehicle(vehicle.handle, seat);
            return;
        }
        mp.players.local.taskEnterVehicle(vehicle.handle, -1, seat, 2, 0, 0);
    }

    getVehicleTeleportLimitSeat() {
        // mp.game.graphics.notify('model 2: ' +  this.model);

        switch (this.model) {
            // Einsteigen ab 3 Sitz (Fahrer, Beifahrer, TP...)
            case 0x3412ae2d: // ka
            case 0xfcfcb68b: //Cargobob
            case 0x60a7ea10: //Cargobob
            case 0x53174eef: //Cargobob
            case 0x78bc1a3c: //Cargobob
            case 0x250b0c5e: // Luxor
            case 0xb79c1bf5: // Shamal
            case 0x9c429b6a: // Velum
            case 0x9d80f93: // Miljet
            case 0xb2cf7250: // Nimbus
            case 0x761e2ad3: // Titan
            case 0xf8d48e7a:
                // journey
                return 1;
            // Einsteigen ab 2 Sitz (Fahrer, TP..)
            case 0xc1ce1183: // Marquis
            case 0xd577c962: // Bus
            case 0x4c80eb0e: // Airbus
            case 0x84718d34: // Coach
            case 0x885f3671: // Pbus
            case 0x73b1c3cb: // Tourbus
            case 0xbe819c63: // Rental
            case 0x56590fe9: // Tropic2
            case 0x1149422f: // Tropic
            case 0x362cac6d: // Toro2
            case 0x3fd5aa2f: // Toro
            case 0xef2295c9: // Suntrap
            case 0xb527915c:
            case 0x72435a19:
                // Trash
                return 0;
            // Einsteigen ab 5 Sitz (Fahrer, Beifarher, hL, hR, TP...)
            case 0x8b13f083: // Stretch
            case 0xe6e967f8:
                // Patriot 2
                return 3;
            default:
                return 99;
        }
    }

    getDistanceToEntity(entity, useZ) {
        const pos1 = mp.players.local.position;
        const pos2 = entity.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    getDistance(pos2) {
        const pos1 = mp.players.local.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, false);
    }
}

exports.default = VehicleEnter;

},{}],228:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class BoatModule {
    constructor() {
        setInterval(function () {
            mp.vehicles.forEachInStreamRange(vehicle => {
                if (mp.game.vehicle.isThisModelABoat(vehicle.model) || mp.game.vehicle.isThisModelAnEmergencyBoat(vehicle.model)) {
                    if (vehicle.isInWater()) {
                        vehicle.position.z = mp.game.water.getWaterHeight(vehicle.position.x, vehicle.position.z, vehicle.position.y, vehicle.position.z);
                    }
                }
            });
        }, 100);
    }
}

exports.default = new BoatModule();

},{}],229:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let player = mp.players.local;

class Flatbed {
    constructor() {}

    xmenuswitch(cmd) {

        let flatbed = player.vehicle;

        if (cmd == "REQUEST_VEHICLE_FlATBED_LOAD_TOGGLE") {
            if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.rope == null) {
                if (flatbed.bed.state == 0) {
                    mp.events.callRemote('fbSetState', flatbed, 1, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    extendBed(flatbed);
                } else if (flatbed.bed.state == 1) {
                    mp.events.callRemote('fbSetState', flatbed, 0, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    retractBed(flatbed);
                }
            }
        }

        if (cmd == "REQUEST_VEHICLE_FlATBED_ROPE_TOGGLE") {

            if (isDrivingTowTruck()) {
                let pos = flatbed.getWorldPositionOfBone(flatbed.getBoneIndexByName('bumper_r'));
                let targetVeh = mp.game.vehicle.getClosestVehicle(pos.x, pos.y, pos.z, 7, 0, 70);
                targetVeh = mp.vehicles.atHandle(targetVeh);
                if (targetVeh != undefined) {
                    if (flatbed.isAttachedToTowTruck(targetVeh.handle)) {
                        flatbed.detachFromTowTruck(targetVeh.handle);
                    } else {
                        if (targetVeh.isSeatFree(-1)) {
                            player.setAlpha(0);
                            player.setIntoVehicle(targetVeh.handle, -1);
                            setTimeout(function () {
                                player.setAlpha(255);
                                player.setIntoVehicle(flatbed.handle, -1);
                            }, 100);
                            targetVeh.setEngineOn(false, false, false);
                            flatbed.attachToTowTruck(targetVeh.handle, false, 0, 0, 0);
                        }
                    }
                }

                return;
            }

            if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.state == 1 && flatbed.bed.rope == null && !flatbed.attachedVehicle) {
                let targetVeh = getTargetVehicle(flatbed);
                if (targetVeh) {
                    /* ROPE
                    //if (targetVeh.getNumberOfPassengers() > 0 || targetVeh.isSeatFree(-1)) return; // Keine Insassen
                      mp.events.callRemote('fbAttachRope', flatbed, targetVeh, true, pl.remoteHashKey)
                    attachRope(flatbed, targetVeh)
                    setTimeout(async () => {
                        mp.events.callRemote('fbWindRope', flatbed, pl.remoteHashKey)
                        let windingSuccess = await windRope(flatbed)
                        if (windingSuccess) {
                            if (attachToBed(flatbed, targetVeh)) {
                                mp.events.callRemote('fbAttachVehicle', flatbed, targetVeh, true, pl.remoteHashKey)
                                startSyncIntervalForVeh(targetVeh)
                            }
                          }
                        mp.events.callRemote('fbAttachRope', flatbed, targetVeh, false, pl.remoteHashKey)
                    }, 1000);
                    */

                    if (attachToBed(flatbed, targetVeh)) {
                        mp.players.forEachInStreamRange((toplayer, id) => {
                            if (toplayer.handle != player.handle) {
                                mp.events.callRemote('fbAttachVehicle', toplayer, flatbed, targetVeh, true, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                            }
                        });
                        startSyncIntervalForVeh(targetVeh);
                    }

                    // mp.events.callRemote('fbAttachRope', flatbed, targetVeh, false, pl.remoteHashKey)
                }
            } else if (isDrivingFlatbed() && flatbed.attachedVehicle && !flatbed.bed.moving && flatbed.bed.state == 1) {

                mp.players.forEachInStreamRange((toplayer, id) => {
                    if (toplayer.handle != player.handle) {
                        mp.events.callRemote('fbAttachVehicle', toplayer, flatbed, flatbed, false, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                    }
                });

                attachToBed(flatbed, false);

                clearInterval(syncInterval);
                syncInterval = null;
            }
        }
    }
}

function createBed(veh) {
    return new Promise((resolve, reject) => {
        let bedRot = veh.getRotation(2);
        let tempPos = veh.position;
        tempPos.z += 15;
        veh.bed = mp.objects.new(mp.game.joaat('imp_prop_flatbed_ramp'), tempPos, { rotation: { x: 14 - bedRot.x, y: bedRot.y, z: bedRot.z + 180 }, dimension: player.dimension });
        veh.bed.streamingRange = 500;
        veh.bed.state = 0;
        setTimeout(() => {
            veh.bed.attachTo(veh.handle, veh.getBoneIndexByName('chassis_dummy'), 0, -3, -0.48, 14, 0, 180, true, false, false, false, 0, true);
            resolve();
        }, 100);
    });
}

let syncInterval;
function startSyncIntervalForVeh(veh) {
    if (syncInterval != null) return;

    syncInterval = setInterval(() => {
        if (isDrivingFlatbed() && player.vehicle.getVariable('fbAttachVehicle') == veh.remoteId) {
            mp.events.callRemote('fbSyncPosition', veh, JSON.stringify(veh.position), JSON.stringify(veh.getRotation(2)), "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
        } else {
            clearInterval(syncInterval);
            syncInterval = null;
        }
    }, 1000);
}

function extendBed(flatbed) {
    let y = -3,
        z = -0.48,
        rotX = 14;
    let toY = -8.6,
        toZ = -1.24,
        toRotX = 0;
    flatbed.bed.moving = true;

    // audio
    let sound = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(sound, "OPENING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

    let render = new mp.Event('render', () => {
        if (!flatbed.bed) {
            return render.destroy();
        }

        if (y > toY) {
            y = parseFloat((y - 0.05).toFixed(2));

            // after y finish transition
        }
        if (y <= toY) {
            if (z > toZ) {
                z = parseFloat((z - 0.04).toFixed(2));
            }

            if (rotX > toRotX) {
                rotX = parseFloat((rotX - 0.8).toFixed(2));
            }
        }
        flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0, y, z, rotX, 0, 180, true, false, true, false, 0, true);
        if (y <= toY && z <= toZ && rotX <= toRotX) {
            flatbed.bed.moving = false;
            flatbed.bed.state = 1;
            render.destroy();
            mp.game.audio.stopSound(sound);
        }
    });
}

function retractBed(flatbed) {
    let y = -8.6,
        z = -1.24,
        rotX = 0;
    let toY = -3,
        toZ = -0.48,
        toRotX = 14;
    flatbed.bed.moving = true;

    // audio
    let sound = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(sound, "CLOSING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

    let render = new mp.Event('render', () => {
        if (!flatbed.bed) {
            return render.destroy();
        }

        if (z < toZ) {
            z = parseFloat((z + 0.04).toFixed(2));
        }

        if (rotX < toRotX) {
            rotX = parseFloat((rotX + 0.8).toFixed(2));
        }

        // after z and rotX finish transition
        if (z >= toZ && rotX >= toRotX) {
            if (y < toY) {
                y = parseFloat((y + 0.05).toFixed(2));
            }
        }

        flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0, y, z, rotX, 0, 180, true, false, true, false, 0, true);
        if (y >= toY && z >= toZ && rotX >= toRotX) {
            flatbed.bed.moving = false;
            flatbed.bed.state = 0;
            render.destroy();
            mp.game.audio.stopSound(sound);
        }
    });
}

mp.events.add({
    async entityStreamIn(e) {
        if (e != null && e.type == 'vehicle' && mp.vehicles.exists(e) && e.model == mp.game.joaat('flatbed')) {
            await createBed(e);
            if (e.getVariable('fbState') === 1) extendBed(e);

            /*
            if (typeof e.getVariable('fbAttachRope') == 'number') {
                let vehID = e.getVariable('fbAttachRope')
                let veh = mp.vehicles.atRemoteId(vehID)
                if (veh)
                    attachRope(e, veh)
            }*/

            if (typeof e.getVariable('fbAttachVehicle') == 'number') {
                let veh = mp.vehicles.atRemoteId(e.getVariable('fbAttachVehicle'));
                if (veh) setTimeout(() => {
                    attachToBed(e, veh);
                }, 1000);
            }
        }
    },

    entityStreamOut(e) {
        if (e != null && e.type == 'vehicle' && mp.vehicles.exists(e) && e.model == mp.game.joaat('flatbed')) {
            if (e.bed) {
                if (e.bed.sound != null) mp.game.audio.stopSound(e.bed.sound);

                if (e.bed.rope != null) {
                    mp.game.rope.deleteRope(e.bed.rope);
                    mp.game.rope.deleteChildRope(e.bed.rope);
                }
                e.bed.destroy();
                delete e.bed;

                if (e.attachedVehicle) delete e.attachedVehicle;
            }
        }
    },

    playerEnterVehicle(v, seat) {
        if (v == null || !mp.vehicles.exists(v) || v.model != mp.game.joaat('flatbed')) return;

        if (seat === -1 && typeof v.getVariable('fbAttachVehicle') == 'number') startSyncIntervalForVeh(mp.vehicles.atRemoteId(v.getVariable('fbAttachVehicle')));
    },

    playerLeaveVehicle(v) {
        if (!v || v == null || !mp.vehicles.exists(v)) return; // vehicle destroyed
        if (v.model != mp.game.joaat('flatbed')) return;
    },

    sAttachRope(fb, veh) {
        if (fb == null || !mp.vehicles.exists(fb)) return;
        if (veh == null || !mp.vehicles.exists(veh)) return;
        attachRope(fb, veh);
    },
    sAttachToBed(fb, veh) {
        if (fb == null || !mp.vehicles.exists(fb)) return;
        if (veh != false && !mp.vehicles.exists(veh)) return;
        attachToBed(fb, veh);
    }
});

// sync code
mp.events.addDataHandler('fbState', (fb, state) => {
    if (fb == null || !mp.vehicles.exists(fb) || fb.handle == 0 || fb == player.vehicle && player.seat == -1) return;

    if (state == 1) extendBed(fb);else retractBed(fb);
});

function getTargetVehicle(flatbed) {
    let from = flatbed.bed.getOffsetFromInWorldCoords(0, 2, 1);
    let to = flatbed.bed.getOffsetFromInWorldCoords(0, 4, 0.7);
    let raycast = mp.raycasting.testPointToPoint(from, to, null, 2);
    let targetVeh = raycast && raycast.entity && raycast.entity.type == 'vehicle' ? raycast.entity : null;
    return targetVeh;
}

function isDrivingTowTruck() {
    return player.vehicle && (player.vehicle.model == mp.game.joaat('towtruck') || player.vehicle.model == mp.game.joaat('towtruck2')) && player.vehicle.getPedInSeat(-1) == player.handle;
}

function isDrivingFlatbed() {
    return player.vehicle && player.vehicle.model == mp.game.joaat('flatbed') && player.vehicle.getPedInSeat(-1) == player.handle;
}

function isVehicleFacingFlatbed(veh, fb) {
    let direction = veh.getForwardVector();
    direction = new mp.Vector3(direction.x, direction.y, direction.z);
    let fbPos = new mp.Vector3(fb.position.x, fb.position.y, fb.position.z);
    let vehPos = new mp.Vector3(veh.position.x, veh.position.y, veh.position.z);

    function angle(from, to) {
        let dot = from.unit().dot(to.unit());
        return Math.acos(dot) * (180 / Math.PI);
    }

    return angle(direction, fbPos.subtract(vehPos)) < 90;
}

function getVehicleHook(veh, forward) {
    if (forward) {
        if (veh.getBoneIndexByName('neon_f') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_f'));
        } else if (veh.getBoneIndexByName('bumper_f') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_f'));
        } else if (veh.getBoneIndexByName('engine') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('engine'));
        } else {
            let pos = veh.position;
            let forwardVec = veh.getForwardVector();
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z);
        }
    } else {
        if (veh.getBoneIndexByName('neon_b') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_b'));
        } else if (veh.getBoneIndexByName('bumper_r') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_r'));
        } else if (veh.getBoneIndexByName('trunk') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('trunk'));
        } else {
            let pos = veh.position;
            let forwardVec = veh.getForwardVector();
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z);
        }
    }
}

function playSound(flatbed, sound) {
    let id = -1;
    if (sound != 'OPENED') id = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(id, sound, flatbed.bed.handle, "DOOR_GARAGE", false, 0);
    if (id > -1) flatbed.bed.sound = id;
    return id;
}

function attachRope(flatbed, targetVeh) {
    if (!flatbed.handle || !mp.vehicles.exists(flatbed)) return;

    if (targetVeh === false) {
        if (flatbed.bed.rope == null) return;
        mp.game.rope.detachRopeFromEntity(flatbed.bed.rope, flatbed.attachedVehicle.handle);
        mp.game.rope.deleteRope(flatbed.bed.rope);
        mp.game.rope.deleteChildRope(flatbed.bed.rope);
        delete flatbed.bed.rope;

        return;
    }

    if (!mp.vehicles.exists(targetVeh) || !targetVeh.handle) return;
    let anchorPos = flatbed.getOffsetFromInWorldCoords(0, -5.9, 0.6);
    anchorPos = new mp.Vector3(anchorPos.x, anchorPos.y, anchorPos.z);

    let isForward = isVehicleFacingFlatbed(targetVeh, flatbed);
    let hookPos = getVehicleHook(targetVeh, isForward);
    hookPos = new mp.Vector3(hookPos.x, hookPos.y, hookPos.z);
    let dist = anchorPos.subtract(hookPos).length();

    mp.game.invoke('0x9B9039DBF2D258C1'); // loadRopeTextures
    let rope = mp.game.invoke('0xE832D760399EB220', anchorPos.x, anchorPos.y, anchorPos.z, 0, 0, 0, dist, 6, dist, 0.1, 0.5, false, false, true, 1.0, false, 0); // addRope
    flatbed.bed.rope = rope;
    mp.game.rope.attachEntitiesToRope(rope, flatbed.handle, targetVeh.handle, anchorPos.x, anchorPos.y, anchorPos.z, hookPos.x, hookPos.y, hookPos.z, dist, false, false, 0, 0);
    mp.game.invoke('0x710311ADF0E20730', rope); // activatePhysics
    return rope;
}

function windRope(flatbed) {
    return new Promise((resolve, reject) => {
        if (!flatbed.handle || !mp.vehicles.exists(flatbed)) return;

        let rope = flatbed.bed.rope;
        mp.game.rope.startRopeWinding(rope);
        let sound = playSound(flatbed, 'CLOSING');

        let startTime = Date.now();
        let interval = setInterval(() => {
            if (!flatbed.handle) return clearInterval(interval);

            // if rope winding takes more than 15 seconds, its stuck
            if (Date.now() - startTime >= 15000) {
                clearInterval(interval);
                mp.game.rope.stopRopeWinding(rope);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;
                attachRope(flatbed, false); // delete rope
                return resolve(false);
            }

            if (flatbed.bed.rope == null) {
                clearInterval(interval);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;
                return;
            }

            if (mp.game.rope.getRopeLength(flatbed.bed.rope) <= 1) {
                clearInterval(interval);
                mp.game.rope.stopRopeWinding(rope);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;

                setTimeout(() => {
                    attachRope(flatbed, false);
                }, 800);

                resolve(true);
            }
        }, 500);
    });
}

function attachToBed(flatbed, targetVeh) {
    if (!flatbed.handle || targetVeh !== false && !targetVeh.handle) return;

    if (targetVeh === false && flatbed.attachedVehicle != null && mp.vehicles.exists(flatbed.attachedVehicle)) {

        flatbed.attachedVehicle.setInvincible(false);
        flatbed.attachedVehicle.detach(true, false);
        flatbed.attachedVehicle.setNoCollision(flatbed.handle, true);

        delete flatbed.attachedVehicle;
    } else {
        if (!mp.vehicles.exists(targetVeh)) return;
        flatbed.freezePosition(true);
        let pos = targetVeh.position;
        let height = targetVeh.getHeight(pos.x, pos.y, pos.z, true, false);
        if (height <= 0.924 || targetVeh.model == mp.game.joaat('taxi')) height += 1;else height += 0.4;
        let rotX = 14,
            rotZ = 180;

        if (!isVehicleFacingFlatbed(targetVeh, flatbed)) {
            rotX *= -1;
            rotZ = 0;
        }

        targetVeh.attachTo(flatbed.bed.handle, 0, 0, 0, height, rotX, 0, rotZ, true, false, false, false, 0, true);
        var attached = Boolean(targetVeh.isAttached());
        if (attached) {
            flatbed.attachedVehicle = targetVeh;
            flatbed.attachedVehicle.setInvincible(true);
        }
        setTimeout(() => {
            flatbed.freezePosition(false);
        }, 1000);
    }
    playSound(flatbed, 'OPENED');
    if (attached) return attached;
}

function waitFor(e) {
    return new Promise((resolve, reject) => {
        let time = Date.now();
        let interval = setInterval(() => {
            if (e.handle) {
                clearInterval(interval);
                resolve(e);
            }

            if (Date.now() - time >= 5000) {
                clearInterval(interval);
                resolve(null);
            }
        }, 100);
    });
}

exports.default = new Flatbed();

},{"../player/player":208}],230:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Rappel {
    constructor() {

        this.localPlayer = mp.players.local;
        this.maxSpeed = 15.0;
        this.minHeight = 15.0;
        this.maxHeight = 45.0;
        this.maxAngle = 15.0;
    }
    startRappel() {
        const vehicle = this.localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
            // hat kein Seil
            return;
        }

        if (vehicle.getSpeed() > this.maxSpeed) {
            // zu schnell
            return;
        }

        if (vehicle.getPedInSeat(-1) === this.localPlayer.handle || vehicle.getPedInSeat(0) === this.localPlayer.handle) {
            return;
        }

        const taskStatus = this.localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            return;
        }

        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < this.minHeight || curHeight > this.maxHeight) {
            return;
        }

        if (!vehicle.isUpright(this.maxAngle) || vehicle.isUpsidedown()) {
            return;
        }

        this.localPlayer.clearTasks();
        this.localPlayer.taskRappelFromHeli(10.0);
    }
}

exports.default = new Rappel();

},{}],231:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleModule {
    constructor() {
        this.lastSireneStateCheck = null;

        this.doorstate = false;

        // Menu items for basic players outside the car
        this.menuItemsOutOfCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        this.menuItemsOutOfCarCops = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Durchsuchen', description: 'Fahrzeug Durchsuchen', icon: 'img/icons/player/search.png', id: 'REQUEST_VEHICLE_FRISK', arg: "" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        // Menu items for dpos outside of the car
        this.menuItemsOutOfCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        // Menu items for basic players inside a car
        this.menuItemsInCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Grab', description: 'Person ins Fahrzeug ziehen', icon: 'img/icons/vehicle/grab.png', id: 'REQUEST_VEHICLE_GRAB', arg: "" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }];
        this.menuItemsInCarCops = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Grab', description: 'Person ins Fahrzeug ziehen', icon: 'img/icons/vehicle/grab.png', id: 'REQUEST_VEHICLE_GRAB', arg: "" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }];
        // Menu items for dpos inside a car
        this.menuItemsInCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }];
        // FLATBED MENU
        this.menuItemsInCarDposFlatbed = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Hoch/Runter', description: 'Rampe hoch/runter', icon: 'img/icons/vehicle/UpAndDown.png', id: 'REQUEST_VEHICLE_FlATBED_LOAD_TOGGLE', arg: "dposclient" }, { label: 'An/Ab', description: 'Seil an/ab', icon: 'img/icons/vehicle/rope.png', id: 'REQUEST_VEHICLE_FlATBED_ROPE_TOGGLE', arg: "dposclient" }];
        let smokeR = -1;
        let smokeG = -1;
        let smokeB = -1;

        /*
        mp.events.add("syncTuning", (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return;
            }
            let obj = vehicle.getExtraColours(1, 1);
              if (parseInt(slot) == 23) {
                if (mp.game.invoke("0x772960298DA26FDB", vehicle.handle, 23) == tuning) {
                    return;
                }
            }
              if (parseInt(slot) == 14 || parseInt(slot) == 16 || parseInt(slot) == 18) {
                vehicle.setMod(parseInt(slot), tuning);
            }
            else if (parseInt(slot) == 22) {
                if (tuning == -1) {
                    vehicle.toggleMod(22, false);
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                }
                else {
                    vehicle.toggleMod(22, true);
                }
            }
            else if (parseInt(slot) == 46) {
                mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, tuning)
            }
            else if (parseInt(slot) == 80) {
                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, tuning);
            }
            else if (parseInt(slot) == 81) {
                vehicle.setNumberPlateTextIndex(parseInt(tuning));
            }
            else if (parseInt(slot) == 95) {
                smokeR = tuning
            }
            else if (parseInt(slot) == 96) {
                smokeG = tuning
            }
            else if (parseInt(slot) == 97) {
                smokeB = tuning
            }
            else if (parseInt(slot) == 98) {
                vehicle.setExtraColours(tuning, obj.wheelColor);
            }
            else if (parseInt(slot) == 99) {
                vehicle.setExtraColours(obj.pearlescentColor, tuning);
            }
            else if (parseInt(slot) == 1337) {
                    vehicle.setWheelType(tuning);
            }
            else {
                //vehicle.setMod(slot, tuning);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(slot), tuning, false)
            }
            if (smokeR != -1 && smokeG != -1 && smokeB != -1) {
                vehicle.toggleMod(20, true)
                if (smokeR == 1 && smokeG == 1 && smokeB == 1) {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(smokeR, smokeG, smokeB)
                smokeR = -1
                smokeG = -1
                smokeB = -1
            }
        });
        */

        mp.events.add("syncVehicleDoor", (vehicle, door, state) => {
            if (vehicle == null) {
                return;
            }

            if (state == true) {
                vehicle.setDoorOpen(door, false, false);
            } else {
                vehicle.setDoorShut(door, false);
            }
        });

        mp.events.add("syncVehicleDoors", (vehicle, doors, state) => {
            if (vehicle == null) {
                return;
            }

            if (state == true) {
                doors.forEach(door => {
                    vehicle.setDoorOpen(door, false, false);
                });
            } else {
                doors.forEach(door => {
                    vehicle.setDoorShut(door, false);
                });
            }
        });

        mp.events.add('shuffleseat', (shuffleplayer, seatindex) => {
            if (shuffleplayer.isInAnyVehicle(false)) {
                if (shuffleplayer == null || shuffleplayer.vehicle == null || !shuffleplayer.vehicle.isSeatFree(seatindex)) return;
                shuffleplayer.taskShuffleToNextVehicleSeat(shuffleplayer.vehicle.handle);
            }
        });

        setInterval(() => {
            if (mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && (mp.players.local.vehicle.isSirenOn() != this.lastSireneStateCheck || this.lastSireneStateCheck == null)) {
                this.lastSireneStateCheck = mp.players.local.vehicle.isSirenOn();
                mp.events.callRemote("syncSireneStatus", mp.players.local.vehicle.remoteId, mp.players.local.vehicle.isSirenOn(), mp.players.local.vehicle.isSirenSoundOn(), "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
            }
        }, 500);

        mp.events.add('setHeadlightColor', (vehicle, headlightcolor = -1) => {
            if (vehicle == null) return;
            if (headlightcolor != null) {
                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, headlightcolor);
            }
        });

        mp.events.add('refreshSireneState', async (vehicle, state, sound) => {
            if (vehicle == null || !mp.vehicles.exists(vehicle)) return;
            await mp.game.waitAsync(100);
            if (vehicle == null || !mp.vehicles.exists(vehicle)) return;
            vehicle.setSiren(state);
            vehicle.setSirenSound(sound);
        });

        mp.events.add('syncvehlivery', async (vehicle, liveryindex = 0) => {
            if (vehicle == null || !mp.vehicles.exists(vehicle) || liveryindex == null) return;
            await mp.game.waitAsync(100);
            if (vehicle == null || !mp.vehicles.exists(vehicle) || liveryindex == null) return;

            if (liveryindex > 0 || liveryindex == null) {
                mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
            }
        });

        mp.events.add('syncvehheadlight', async (vehicle, headlightcolor = 0) => {
            if (vehicle == null || !mp.vehicles.exists(vehicle) || headlightcolor == null) return;
            await mp.game.waitAsync(100);
            if (vehicle == null || !mp.vehicles.exists(vehicle) || headlightcolor == null) return;

            if (headlightcolor != null) {
                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, headlightcolor);
            }
        });

        mp.events.add('entityStreamIn', async entity => {
            if (entity != null && entity.type == "vehicle") {
                if (!mp.vehicles.exists(entity)) return;

                entity.setInvincible(false);
                await mp.game.waitAsync(100);
                if (entity != null && mp.vehicles.exists(entity) && entity.type == "vehicle") {
                    mp.events.callRemote("requestVehicleLongRangeData", entity.remoteId, "0d02fb89052145a2994374a9de024de69ca2434713be69de5ebf13e2453fccb7");
                }
            }
        });

        /*
        mp.events.add("responseVehicleSyncData", (vehicle, tuning, doorStates, liveryindex) => {
            if (vehicle == null) return
            
            let obj = vehicle.getExtraColours(1,1);
            let pearlColor = obj.pearlescentColor;
            let wheelColor = obj.wheelColor;
            let tireSmokeR = -1;
            let tireSmokeG = -1;
            let tireSmokeB = -1;
            const mods = JSON.parse(tuning);
            for (const mod in mods) {
                  if(parseInt(mod) == 14 || parseInt(mod) == 16 || parseInt(mod) == 18)
                {
                    vehicle.setMod(parseInt(mod), mods[mod]);
                }
                else if(parseInt(mod) == 22)
                {
                    if(mods[mod] == -1)
                    {
                        vehicle.toggleMod(22, false);
                        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                    }
                    else
                    {
                        vehicle.toggleMod(22, true);
                    }
                }
                else if(parseInt(mod) == 46)
                {
                    mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, mods[mod])
                }
                else if(parseInt(mod) == 80)
                {
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, mods[mod]);
                }
                else if(parseInt(mod) == 81)
                {
                    vehicle.setNumberPlateTextIndex(mods[mod]);
                }
                else if(parseInt(mod) == 95)
                {
                    tireSmokeR = mods[mod];
                }
                else if(parseInt(mod) == 96)
                {
                    tireSmokeG = mods[mod];
                }
                else if(parseInt(mod) == 97)
                {
                    tireSmokeB = mods[mod];
                }
                else if(parseInt(mod) == 98)
                {
                    pearlColor = mods[mod];
                }
                else if(parseInt(mod) == 99)
                {
                    wheelColor = mods[mod];
                }
                else if (parseInt(mod) == 1337) {
                        vehicle.setWheelType(mods[mod]);
                }
                else
                {
                //vehicle.setMod(parseInt(mod), mods[mod]);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(mod), mods[mod], false)
                }
            }
            vehicle.setExtraColours(pearlColor, wheelColor);
            if(tireSmokeR != -1 || tireSmokeG != -1 || tireSmokeB != -1)
            {
                vehicle.toggleMod(20, true)
                if(smokeR == 1 && smokeG == 1 && smokeB == 1)
                {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(tireSmokeR, tireSmokeG, tireSmokeB)
            }
            
            const doors = JSON.parse(doorStates);
            for (const door in doors) {
                
                if (doors[door] == true) {
                    vehicle.setDoorOpen(parseInt(door), false, false);
                }
            }
              if(liveryindex > 0) {
                mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
            }
          });*/
    }

    getVehicleItems() {
        if (_player2.default.isInAnyVehicle(false)) {
            if (_player2.default.team == 16 && _player2.default.duty) {
                return this.menuItemsInCarDposFlatbed;
            } else if (_player2.default.team == 1 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else if (_player2.default.team == 13 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else if (_player2.default.team == 5 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else {
                return this.menuItemsInCar;
            }
        } else {
            if (_player2.default.team == 16 && _player2.default.duty) {
                return this.menuItemsOutOfCarDpos;
            } else if (_player2.default.team == 1 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else if (_player2.default.team == 13 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else if (_player2.default.team == 5 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else {
                return this.menuItemsOutOfCar;
            }
        }
    }
}

exports.default = new VehicleModule();

},{"../player/player":208}],232:[function(require,module,exports){
'use strict';

require('./vehicle-module');

require('./flatbed');

require('./boat-module');

},{"./boat-module":228,"./flatbed":229,"./vehicle-module":231}],233:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _callManage = require("../apps/callManage");

var _callManage2 = _interopRequireDefault(_callManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Voice {
    constructor() {
        this.radioChatPlayers = '';
        this.radioAirFunkPlayers = '';
        this.serverId = 1;
        this.voiceChannel = '';
        this.voicePassword = '';
        this.streamingRangePlayer = [];
        this.phonePartner = '';

        mp.events.add('setPhoneCallData', data => {
            if (_browser2.default.voice == null) return;
            _apps2.default.show("Smartphone", "CallManageApp");
            _callManage2.default.setPhoneCallData(data);
        });

        mp.events.add('ConnectTeamspeak', () => {
            if (_browser2.default.voice == null) return;
            _browser2.default.voice.reload(false);
        });

        mp.events.add('setVoiceData', (serverId, voiceChannel, voicePassword) => {
            this.serverId = serverId;
            this.voiceChannel = voiceChannel;
            this.voicePassword = voicePassword;
        });

        mp.events.add('setRadioChatPlayers', radioChatPlayers => {
            this.radioChatPlayers = radioChatPlayers;
        });

        mp.events.add('setAirFunkPlayers', funkPlayers => {
            this.radioAirFunkPlayers = funkPlayers;
        });

        mp.events.add('setCallingPlayer', phonePartner => {
            this.phonePartner = phonePartner;
        });

        mp.events.add('entityStreamIn', entity => {
            if (entity != null && entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                this.streamingRangePlayer.push(entity);
            }
        });

        mp.events.add('entityStreamOut', entity => {
            if (entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                let index = this.streamingRangePlayer.indexOf(entity);

                if (index > -1) {
                    this.streamingRangePlayer.splice(index, 1);
                }
            }
        });

        var voice = this;

        setInterval(function () {
            let hash = _player2.default.voiceHash;
            if (hash !== "" && _browser2.default) {
                let user = _player2.default.getPlayer();
                let playerRotation = mp.game.cam.getGameplayCamRot(0);
                let rotation = Math.PI / 180 * (playerRotation.z * -1);
                let voicePlayers = [];

                if (voice.phonePartner && voice.phonePartner !== "") {
                    voicePlayers.push(voice.phonePartner + "~3~0~0~2");
                }

                if (voice.streamingRangePlayer != null) {
                    for (var i = 0; i < voice.streamingRangePlayer.length; i++) {

                        let streamedPlayer = voice.streamingRangePlayer[i];
                        if (streamedPlayer == null || !mp.players.exists(streamedPlayer) || streamedPlayer.type !== "player" || !streamedPlayer.getVariable("voiceHash")) continue;

                        if (streamedPlayer.getVariable("isDead")) continue;
                        if (!streamedPlayer.getVariable("voiceRange")) continue;

                        let streamedPlayerPos = streamedPlayer.position;
                        let distance = _player2.default.getDistance(streamedPlayerPos);

                        let voiceRange = streamedPlayer.getVariable("voiceRange");
                        let streamedPlayerHash = streamedPlayer.getVariable("voiceHash");

                        let volumeModifier = 4;

                        if (voiceRange && voiceRange > 0 && distance < voiceRange) {
                            let subPos = _player2.default.calculateVectorDistance(streamedPlayerPos);

                            let x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation);
                            let y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation);

                            x = x * 10 / voiceRange;
                            y = y * 10 / voiceRange;

                            let percent = voiceRange / 100 * distance;
                            volumeModifier = volumeModifier - percent;

                            if (voiceRange === 15) {
                                volumeModifier = volumeModifier * 1.3;
                            } else if (voiceRange === 5) {
                                volumeModifier = volumeModifier * 0.9;
                            } else if (voiceRange === 40) {
                                volumeModifier = volumeModifier * 1.8;
                            }

                            let str = `${streamedPlayerHash}~${Math.round(x * 1000) / 1000}~${Math.round(y * 1000) / 1000}~0~${user.isInAnyVehicle(false) ? Math.round(volumeModifier * 1000) / 1000 / 1.5 : Math.round(volumeModifier * 1000) / 1000}`;

                            voicePlayers.push(str);
                        }
                    }
                }

                let voiceAirFunk = "";
                if (voice.radioAirFunkPlayers.length > 0) {
                    voiceAirFunk = `${voice.radioAirFunkPlayers};`;
                }

                if (_player2.default.state == 0) {
                    _browser2.default.voice.url = `http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voiceAirFunk}${voicePlayers.join(";")}/`;
                } else {

                    _browser2.default.voice.url = `http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voice.radioChatPlayers};${voiceAirFunk}${voicePlayers.join(";")}/`;
                }
                _browser2.default.voice.execute(`document.body.style.display = "none";`);
            }
        }, 1575);
    }
}

exports.default = new Voice();

},{"../app/apps":12,"../apps/callManage":21,"../browser/browser":104,"../player/player":208}],234:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _windows = require("./windows");

var _windows2 = _interopRequireDefault(_windows);

var _component = require("../components/component");

var _component2 = _interopRequireDefault(_component);

var _peds = require("../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Window lifecycle
    onCreate()
        ↓
    onShow()
        ↓
    onDismiss()
        ↓
    onDestroy()
*/
class Window extends _component2.default {
    constructor(name, ...events) {
        super(name, ...events);
        // Register window in windows
        _windows2.default.windows.set(name, this);

        // Default values
        this.cursorVisible = false;
        this.hudVisible = true;
        //this.chatVisible = true
    }

    setCurserVisible(visible) {
        this.cursorVisible = visible;
    }

    setHudVisible(visible) {
        this.hudVisible = visible;
    }

    setChatVisible(visible) {
        this.chatVisible = visible;
    }

    show(args) {
        console.log(`window opening; ${this.name} with ${args} args.`);
        this.args = args;
        mp.gui.cursor.visible = this.cursorVisible;
        mp.game.ui.displayHud(this.hudVisible);
        //mp.gui.chat.show(this.chatVisible)
        _peds2.default.disableAllControls(true);
        this.onShow();

        _windows2.default.show(this.name, args);
    }

    isVisible() {
        return _windows2.default.visibleWindow === this.name;
    }

    onShow() {}

    close(clientClose = false) {
        if (!clientClose) {
            _browser2.default.execute("Windows", `show("")`);
        }
        if (this.cursorVisible) {
            mp.gui.cursor.visible = false;
        }
        if (!this.hudVisible) {
            mp.game.ui.displayHud(true);
        }
        /*
        if (!this.chatVisible) {
            mp.gui.chat.show(true)
        }
        */
        _peds2.default.disableAllControls(false);
        this.onClose();

        _windows2.default.close(this.name);
    }

    onClose() {}
}

exports.default = Window;

},{"../browser/browser":104,"../components/component":106,"../peds/peds":202,"./windows":235}],235:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Windows {
    constructor() {
        this.windows = new Map();
        this.visibleWindow = null;
        mp.events.add("openWindow", (name, args) => {
            console.log(`window opening; ${name} with ${args} args.`);
            // Check if an window with this name is registered
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.show(args);
            //this.show(name, args)
        });
        mp.events.add("onWindowClosed", name => {
            console.log(`window closed from client; ${name}`);
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.close(true);
        });
        mp.events.add("closeWindow", name => {
            console.log(`window closed from server; ${name}`);
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.close();
        });
    }

    show(name, args) {
        this.visibleWindow = name;
        if (args && args.length > 0) {
            _browser2.default.execute("Windows", `show("${name}", '${args}')`);
        } else {
            _browser2.default.execute("Windows", `show("${name}")`);
        }
    }

    close(name) {
        if (this.visibleWindow === name) {
            this.visibleWindow = null;
        }
    }
}

exports.default = new Windows();

},{"../browser/browser":104}]},{},[1]);

}