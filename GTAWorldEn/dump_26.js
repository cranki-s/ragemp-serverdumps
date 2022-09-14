{
﻿class Scalefrom {
    constructor(scaleformStr) {
        this._handle = mp.game.graphics.requestScaleformMovie(scaleformStr);
        this.queueCallFunction = new Map();
    }

    get isLoaded﻿() {
        return !!mp.game.graphics.hasScaleformMovieLoaded(this._handle);
    }

    get isValid() {
        return this._handle !== 0;
    }

    get handle() {
        return this._handle;
    }

    callFunction(strFunction, ...args) {
        if (this.isLoaded && this.isValid) {
            const graphics = mp.game.graphics;
            graphics.pushScaleformMovieFunction﻿(this._handle, strFunction);
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
                        } else {
                            graphics.pushScaleformMovieFunctionParameterInt(arg);
                        }
                    }
                }
            });
            graphics﻿.popScaleformMovieFunctionVoid();
        } else {
            this.queueCallFunction﻿.set(strFunction﻿, args);
        }
    }

    onUpdate() {
        if (this.isLoaded && this.isValid) {
            this.queueCallFunction.forEach((args, strFunction) => {
                this.callFunction(strFunction, ...args);
                this.queueCallFunction.delete(strFunction);
            });
        }
    }

    render2D(x, y, width, height) {
        this.onUpdate();
        if (this.isLoaded && this.isValid) {
            const graphics = mp.game.graphics;
            if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
                const activeResolution = graphics.getScreenActiveResolution(0, 0);

                graphics.drawScaleformMovie(this._handle, x, y, width, height, 255, 255, 255, 255, 0);
            } else {
                graphics.drawScaleformMovieFullscreen﻿(this._handle, 255, 255, 255, 255, false);
            }
        }
    }

    render3D(position, rotation, scale) {
        this.onUpdate();
        if (this.isLoaded && this.isValid) {
            mp.game.graphics.drawScaleformMovie3dNonAdditive(this._handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2);
        }
    }

    render3DAdditive(position, rotation, scale) {
        this.onUpdate();
        if (this.isLoaded && this.isValid) {
            mp.game.graphics.drawScaleformMovie3d(this._handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2);
        }
    }
}

exports = Scalefrom;﻿
}