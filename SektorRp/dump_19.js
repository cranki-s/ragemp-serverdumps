{
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
          case 'string': {
            graphics.pushScaleformMovieFunctionParameterString(arg);
            break;
          }
          case 'boolean': {
            graphics.pushScaleformMovieFunctionParameterBool(arg);
            break;
          }
          case 'number': {
            if (Number(arg) === arg && arg % 1 !== 0) {
              graphics.pushScaleformMovieFunctionParameterFloat(arg);
            }
            else {
              graphics.pushScaleformMovieFunctionParameterInt(arg);
            }
          }
        }
      });
      graphics.popScaleformMovieFunctionVoid();
    }
    else {
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
      if (typeof x !== 'undefined' &&
        typeof y !== 'undefined' &&
        typeof width !== 'undefined' &&
        typeof height !== 'undefined') {
        graphics.drawScaleformMovie(this.handle, x, y, width, height, 255, 255, 255, 255, 0);
      }
      else {
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
}