{
const { cbHelper } = require("./CircuitBreaker/CbHelper");
const { CbPortLights } = require("./CircuitBreaker/CbPortLights");

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
    if (this.isVectorZero(this.startPortPos) ||
      this.isVectorZero(this.finishPortPos) ||
      this.startPortHeading === -1 ||
      this.finishPortHeading === -1) {
      return;
    }
    this.drawPortSprite(this.startPortPos, this.startPortHeading);
    this.drawPortSprite(this.finishPortPos, this.finishPortHeading);
    if (this.startPortLights)
      this.startPortLights.drawLights();
    if (this.finishPortLights)
      this.finishPortLights.drawLights();
  }
  isCollidingWithPort(pointPosition) {
    return ((cbHelper.isInPoly(this.startPortBounds, pointPosition) ||
      cbHelper.isInPoly(this.finishPortBounds, pointPosition)) &&
      !this.isPointInGameWinningPosition(pointPosition));
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
    return heading === 0 || heading === 180
      ? [
        [0.0278, 70.25],
        [0.02807, 289.5],
        [0.02708, 282],
        [0.02665, 77.75]
      ]
      : [
        [0.02088, 228.5],
        [0.01827, 238.75],
        [0.01806, 121.75],
        [0.02061, 131.75]
      ];
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
    if (portBounds.length < 2)
      return { x: 0, y: 0 };
    const portX = this.getRandom(portBounds[0].x * 1000, portBounds[1].x * 1000) / 1000;
    const portY = this.getRandom(portBounds[0].y * 1000, portBounds[1].y * 1000) / 1000;
    return { x: portX, y: portY };
  }
  getPortPositionBounds(level) {
    switch (level) {
      case 1:
        return [
          [
            { x: 0.169, y: 0.613 },
            { x: 0.169, y: 0.816 }
          ],
          [
            { x: 0.179, y: 0.837 },
            { x: 0.284, y: 0.837 }
          ],
          [
            { x: 0.833, y: 0.181 },
            { x: 0.833, y: 0.277 }
          ],
          [
            { x: 0.751, y: 0.163 },
            { x: 0.823, y: 0.163 }
          ]
        ];
      case 2:
        return [
          [
            { x: 0.169, y: 0.673 },
            { x: 0.169, y: 0.818 }
          ],
          [
            { x: 0.18, y: 0.838 },
            { x: 0.297, y: 0.838 }
          ],
          [
            { x: 0.832, y: 0.181 },
            { x: 0.832, y: 0.324 }
          ],
          [
            { x: 0.778, y: 0.16 },
            { x: 0.821, y: 0.16 }
          ]
        ];
      case 3:
        return [
          [
            { x: 0.166, y: 0.182 },
            { x: 0.166, y: 0.263 }
          ],
          [
            { x: 0.166, y: 0.745 },
            { x: 0.166, y: 0.816 }
          ],
          [
            { x: 0.18, y: 0.837 },
            { x: 0.31, y: 0.837 }
          ],
          [
            { x: 0.184, y: 0.164 },
            { x: 0.277, y: 0.164 }
          ]
        ];
      case 4:
        return [
          [
            { x: 0.169, y: 0.628 },
            { x: 0.169, y: 0.817 }
          ],
          [
            { x: 0.183, y: 0.838 },
            { x: 0.259, y: 0.838 }
          ],
          [
            { x: 0.833, y: 0.186 },
            { x: 0.833, y: 0.359 }
          ],
          [
            { x: 0.797, y: 0.161 },
            { x: 0.819, y: 0.161 }
          ]
        ];
      case 5:
        return [
          [
            { x: 0.832, y: 0.742 },
            { x: 0.832, y: 0.811 }
          ],
          [
            { x: 0.761, y: 0.839 },
            { x: 0.821, y: 0.839 }
          ],
          [
            { x: 0.169, y: 0.184 },
            { x: 0.169, y: 0.383 }
          ],
          [
            { x: 0.184, y: 0.162 },
            { x: 0.234, y: 0.162 }
          ]
        ];
      case 6:
        return [
          [
            { x: 0.167, y: 0.183 },
            { x: 0.167, y: 0.3 }
          ],
          [
            { x: 0.18, y: 0.162 },
            { x: 0.214, y: 0.162 }
          ],
          [
            { x: 0.833, y: 0.186 },
            { x: 0.833, y: 0.282 }
          ],
          [
            { x: 0.768, y: 0.161 },
            { x: 0.82, y: 0.161 }
          ]
        ];
      default:
        return []; // Not possible
    }
  }
}

exports.cbGenericPorts = new CbGenericPorts();
}