{
exports = class Scaleform {
    // Constructor
    constructor(handle) {
        this.handle = handle;
    }

    // Properties
    get isLoaded() {
        return mp.game.graphics.hasScaleformMovieLoaded(this.handle);
    }

    // Functions
    callFunction(functionName, ...args) {
        mp.game.graphics.pushScaleformMovieFunction(this.handle, functionName);

        args.forEach(arg => {
            switch (typeof arg) {
                case "string": {
                    mp.game.graphics.pushScaleformMovieFunctionParameterString(arg);
                    break;
                }

                case "boolean": {
                    mp.game.graphics.pushScaleformMovieFunctionParameterBool(arg);
                    break;
                }

                case "number": {
                    if(Number(arg) === arg && arg % 1 !== 0) {
                        mp.game.graphics.pushScaleformMovieFunctionParameterFloat(arg);
                    } else {
                        mp.game.graphics.pushScaleformMovieFunctionParameterInt(arg);
                    }
                }
            }
        });

        mp.game.graphics.popScaleformMovieFunctionVoid();
    }

    render(x, y, width, height) {
        mp.game.graphics.drawScaleformMovie(this.handle, x, y, width, height, 255, 255, 255, 255, 0);
    }

    dispose() {
        mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this.handle);
    }

    // Static functions
    static async request(scaleformName) {
        const inst = new Scaleform(mp.game.graphics.requestScaleformMovie(scaleformName));

        while (!inst.isLoaded) {
            await mp.game.waitAsync(0);
        }

        return inst;
    }
};
}