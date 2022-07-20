{
const commandStorage = new Map();
const consoleCommandStorage = new Map();

/* API - Commands */
/**
 * Adds a clientside command.
 * @param {string} name      Name of the command.
 * @param {function} handlerFn Function that will run when the command is used.
 * @throws {TypeError} name argument must be a string.
 * @throws {TypeError} handlerFn argument must be a function.
 * @throws {Error} Command with the given name already exists.
 */
mp.events.addCommand = function(name, handlerFn) {
    if (typeof name !== "string") {
        throw new TypeError("name isn't a string.");
    } else if (typeof handlerFn !== "function") {
        throw new TypeError("handlerFn isn't a function.");
    } else if (commandStorage.has(name)) {
        throw new Error(`A command named "${name}" already exists.`);
    }

    commandStorage.set(name, handlerFn);
};

/**
 * Returns clientside command names.
 * @return {string[]}
 */
mp.events.getCommandNames = function() {
    return Array.from(commandStorage.keys());
};

/**
 * Removes a clientside command.
 * @param  {string} name Name of the command to remove.
 * @return {boolean}
 */
mp.events.removeCommand = function(name) {
    return commandStorage.delete(name);
};

/**
 * Removes all clientside commands.
 */
mp.events.removeAllCommands = function() {
    commandStorage.clear();
};

/* API - Console Commands */
if (mp.console) {
    /**
     * Adds a console command.
     * @param {string} name      Name of the console command.
     * @param {function} handlerFn Function that will run when the console command is used.
     * @throws {TypeError} name argument must be a string.
     * @throws {TypeError} handlerFn argument must be a function.
     * @throws {Error} Console command with the given name already exists.
     */
    mp.console.addCommand = function(name, handlerFn) {
        if (typeof name !== "string") {
            throw new TypeError("name isn't a string.");
        } else if (typeof handlerFn !== "function") {
            throw new TypeError("handlerFn isn't a function.");
        } else if (consoleCommandStorage.has(name)) {
            throw new Error(`A console command named "${name}" already exists.`);
        }

        consoleCommandStorage.set(name, handlerFn);
    };

    /**
     * Returns console command names.
     * @return {string[]}
     */
    mp.console.getCommandNames = function() {
        return Array.from(consoleCommandStorage.keys());
    };

    /**
     * Removes a console command.
     * @param  {string} name Name of the console command to remove.
     * @return {boolean}
     */
    mp.console.removeCommand = function(name) {
        return consoleCommandStorage.delete(name);
    };

    /**
     * Removes all console commands.
     */
    mp.console.removeAllCommands = function() {
        consoleCommandStorage.clear();
    };
}

/* Events */
function callCommandFn(command, isConsole) {
    const args = command.split(/ +/);
    const commandFn = (isConsole ? consoleCommandStorage : commandStorage).get(args.shift());

    if (commandFn) {
        commandFn(...args);
    }
}

mp.events.add({
    "playerCommand": (command) => {
        callCommandFn(command);
    },

    "consoleCommand": (command) => {
        callCommandFn(command, true);
    }
});
}