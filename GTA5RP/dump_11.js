{
    const mp = global.mp;
    class Scaleform {
        constructor(a) {
            this._handle = mp.game.graphics.requestScaleformMovie(a), this.queueCallFunction = []
        }
        get isLoaded() {
            return !!mp.game.graphics.hasScaleformMovieLoaded(this._handle)
        }
        get isValid() {
            return 0 !== this._handle
        }
        get handle() {
            return this._handle
        }
        callFunction(a, ...b) {
            if (this.isLoaded && this.isValid) {
                const c = mp.game.graphics;
                c.pushScaleformMovieFunction(this._handle, a), b.forEach(a => {
                    switch (typeof a) {
                        case "string": {
                            c.pushScaleformMovieFunctionParameterString(a);
                            break
                        }
                        case "boolean": {
                            c.pushScaleformMovieFunctionParameterBool(a);
                            break
                        }
                        case "number":
                            +a === a && 0 != a % 1 ? c.pushScaleformMovieFunctionParameterFloat(a) : c.pushScaleformMovieFunctionParameterInt(a);
                    }
                }), c.popScaleformMovieFunctionVoid()
            } else this.queueCallFunction.push([a, b])
        }
        onUpdate() {
            if (this.isLoaded && this.isValid) {
                for (const [a, b] of this.queueCallFunction) this.callFunction(a, ...b);
                this.queueCallFunction = []
            }
        }
        renderFullscreen() {
            this.onUpdate(), this.isLoaded && this.isValid && mp.game.graphics.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, !1)
        }
        render2D(a, b, c, d) {
            if (this.onUpdate(), this.isLoaded && this.isValid) {
                const e = mp.game.graphics;
                if ("undefined" != typeof a && "undefined" != typeof b && "undefined" != typeof c && "undefined" != typeof d) {
                    e.getScreenActiveResolution(0, 0);
                    e.drawScaleformMovie(this._handle, a, b, c, d, 255, 255, 255, 255, 0)
                } else e.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, !1)
            }
        }
        render3D(a, b, c) {
            this.onUpdate(), this.isLoaded && this.isValid && mp.game.graphics.drawScaleformMovie3dNonAdditive(this._handle, a.x, a.y, a.z, b.x, b.y, b.z, 2, 2, 1, c.x, c.y, c.z, 2)
        }
        render3DAdditive(a, b, c) {
            this.onUpdate(), this.isLoaded && this.isValid && mp.game.graphics.drawScaleformMovie3d(this._handle, a.x, a.y, a.z, b.x, b.y, b.z, 2, 2, 1, c.x, c.y, c.z, 2)
        }
        destroy() {
            mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this._handle)
        }
    }
    global.Scaleform = Scaleform;
}