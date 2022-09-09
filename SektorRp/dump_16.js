{
const { cbHelper } = require("./CircuitBreaker/CbHelper");

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
}