{
/** This file hooks events and intervals to measure how long each takes. Must be included first. */

// To test in browser
if (!mp) {
    var mp = {
        events: {
            listeners: [],
            add: function(name, func) {
                console.log("[debug] mp.events.add(" + name + ")");
                let listenerList = this.listeners[name];
                if (!listenerList) {
                    listenerList = [];
                    this.listeners[name] = listenerList;
                }
                listenerList.push(func);
            },
            call: function(name, ...args) {
                for (let func of (this.listeners[name] || [])) {
                    func(...args);
                }
            }
        },
        console: {
            logInfo: console.log,
            logError: console.error,
            logWarning: console.warn,
        }
    };
}

require("ui.js"); // for browserSet

mp.profiler = {
    identifier: "",
    usedIdentifiers: {},
    enabled: false,
    tableData: "",
    setIdentifier(identifier) {
        this.identifier = identifier;
    },
    clearIdentifier() {
        this.identifier = "";
    },
    isEnabled() {
        return this.enabled;
    },
    setEnabled(enabled) {
        browserSet("profilerVM", "enabled", enabled);
        this.enabled = enabled;
    },
    setTableData(data) {
        this.tableData = data;
        browserSet("profilerVM", "data", data);
    },
    getTableData() {
        return this.tableData;
    },
};

let realListeners = {}; // map<eventName, [{func, identifier}]>
let timeAccumulators = {}; // map<eventName, timeTaken>
let callsAccumulators = {}; // map<eventName, timeTaken>

/** Hook setInterval */
let originalSetInterval = this.setInterval;
mp.setInterval = function(callback, time) {
    let eventIdentifier = generateEventIdentifier("setInterval(" + time + ")");
    let hookedCallback = () => {
        if (!mp.profiler.enabled) { // fastpath
            try {
                callback();
            } catch (e) {
                mp.console.logWarning(`${eventIdentifier}: ${e.stack.toString()}`)
            }
            return;
        }

        let begin = Date.now();
        try {
            callback();
        } catch (e) {
            mp.console.logWarning(`${eventIdentifier}: ${e.stack.toString()}`)
        }
        let elapsed = Date.now() - begin;
        timeAccumulators[eventIdentifier] = (timeAccumulators[eventIdentifier] || 0) + elapsed;
        callsAccumulators[eventIdentifier] = (callsAccumulators[eventIdentifier] || 0) + 1;
    };
    return originalSetInterval(hookedCallback, time);
}

/** Hook mp.events.add */
mp.events.originalAdd = mp.events.add;
mp.events.add = function(...params) {
    // pair key + string
    if (params.length === 2) {
        if (typeof(params[0]) !== "string" || typeof(params[1]) !== "function") {
            mp.console.logError("mp.events.add: invalid type for parameter (len 2): " + typeof(params[0]) + " " + typeof(params[1]) + ". Expects string,function.");
            return;
        }

        let eventName = params[0];
        let eventFunc = params[1];

        // find a free event identifier
        let eventIdentifier = generateEventIdentifier(eventName);

        // create the master event handler for eventName if doesn't exists.
        let eventListeners = realListeners[eventName];
        if (!eventListeners) {
            eventListeners = [];
            //mp.console.logInfo("Create master listener for: " + eventName);
            realListeners[eventName] = eventListeners;
            addProfiledEvent(eventName, eventListeners);
        }

        // add the listener to the array
        eventListeners.push({
            identifier: eventIdentifier,
            func: eventFunc,
        });
    } else if (params.length === 1) { // an object
        if (typeof(params[0]) !== "object") {
            mp.console.logError("mp.events.add: invalid type for parameter (len 1): " + typeof(params[0]));
            return;
        }

        // add events recursively
        for (k in params[0]) {
            if (params[0].hasOwnProperty(k)) {
                mp.events.add(k, params[0][k]);
            }
        }
    } else {
        mp.console.logError("Illegal param count: " + params.length);
    }
}

/** Adds a real event listener with profiling capabilities */
function addProfiledEvent(name, listeners) {
    mp.events.originalAdd(name, (...args) => {
        if (!mp.profiler.enabled) { // fastpath
            for (let listener of listeners) {
                try {
                    listener.func(...args);
                } catch (e) {
                    mp.console.logWarning(`${listener.identifier}: ${e.stack.toString()}`)
                }
            }
        } else {
            for (let listener of listeners) {
                let begin = Date.now();
                try {
                    listener.func(...args);
                } catch (e) {
                    mp.console.logWarning(`${listener.identifier}: ${e.stack.toString()}`)
                }
                let elapsed = Date.now() - begin;
                timeAccumulators[listener.identifier] = (timeAccumulators[listener.identifier] || 0) + elapsed;
                callsAccumulators[listener.identifier] = (callsAccumulators[listener.identifier] || 0) + 1;
            }
        }
    });
}

function generateEventIdentifier(eventName) {
    let eventIdentifier = "";
    let counter = 0;
    do {
        eventIdentifier = mp.profiler.identifier + "/" + eventName + "#" + counter;
        counter++;
    } while (mp.profiler.usedIdentifiers[eventIdentifier] && counter < 100);

    mp.profiler.usedIdentifiers[eventIdentifier] = true;
    return eventIdentifier;
}

/** Prints the accumulated time for events. Top 15 events every 5 seconds. */
setInterval(() => {
    if (!mp.profiler.enabled) return;

    let scores = Object.entries(timeAccumulators);
    // sort with higher values first.
    scores.sort((e1, e2) => e2[1] - e1[1])

    // get top callers
    let tableData = "";
    let counter = 1;
    let topCount = 10;
    for (let i = 0; i < topCount; i++) {
        let entry = scores[i];
        if (!entry) {
            tableData += `#${counter} -~n~`;
        } else {
            let eventName = entry[0];
            let eventTime = entry[1];
            let calls = callsAccumulators[eventName] || 0;
            tableData += `#${counter} ${eventTime}ms ${eventName} (${calls})~n~`;
        }

        counter++;
    }
    mp.profiler.setTableData(tableData);

    // reset accumulator
    timeAccumulators = {};
    callsAccumulators = {};
}, 3000);
}