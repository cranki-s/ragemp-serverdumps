{
require('base64.js');
require('pbf.js');
require('pako.min.js');

var self = mp; // proto below uses "self" because its for browser (ie "window")
require('net_message.proto.js');

// message encoding. Overwrite original callRemote
// with a wrapper.
var originalCallRemote = mp.events.callRemote;

let pktQueue = [];

let sniffCallRemotes = null;
let anyMessageSentOnThisTick = false;

mp.events.callRemote = (event, ...args) => {
    if (sniffCallRemotes) {
        if (event.includes(sniffCallRemotes)) {
            mp.console.logInfo(`[${event}] ${JSON.stringify(args)}`)
        }
    }

    pktQueue.push([joaatSigned(event), args]);
    if (!anyMessageSentOnThisTick) {
        pushPktsInQueue(); // to reduce latency, the first message is pushed immediately
        anyMessageSentOnThisTick = true;
    }
};

mp.events.originalCallRemote = originalCallRemote;

setInterval(() => {
    if (pktQueue.length !== 0) {
        mp.console.logInfo(`send all on queue ${pktQueue.length}`)
        pushPktsInQueue();
    }
    anyMessageSentOnThisTick = false;
}, 15);

function pushPktsInQueue() {
    let asJSON = JSON.stringify(pktQueue);
    originalCallRemote("onJoebillRemote", asJSON);
    pktQueue = [];
}

// message decoding. Create a new mp.rpc to declare RPCs

let eventHandlers = {}; // maps eventHash -> eventHandler for declared RPCs
let eventNames = {};
let rpcFilter = null;

mp.rpc = function(event, handler) {
    eventHandlers[joaatSigned(event)] = handler;
    eventNames[joaatSigned(event)] = event;
    mp.events.add(event, handler);
};

let messagesInBuffer = []; // messages that came out of order and are waiting to be dispatched.
let expectedSequenceNumber = 0;
let lastSyncedPacket = new Date().getTime();

// protobuf message decoding. may be "onJoebillRemote".
mp.events.add("on_net_message", (len, messageB64) => {
    // ensure the message len is the same the backend says. Rage
    // trim long messages sometimes.
    if (len != messageB64.length) {
        mp.game.graphics.notify("~r~error: ~w~expected message len: " + len + " but got " + messageB64.length);
        return;
    }

    // convert to byte array from base64, as I don't know how
    // to send raw byte arrays in rage. Such thing may save 
    // 33% of bandwith usage! Should try buffers.
    let decodedBytesCompressed = base64ToBytes(messageB64);
    let decodedBytes = null;
    try {
        decodedBytes = pako.inflate(decodedBytesCompressed);
    } catch (e) {
        mp.game.graphics.notify("~r~gzip inflate error: ~w~" + e);
        return;
    }
    let pbf = new Pbf(decodedBytes);
    let netMessage = NetMessage.read(pbf);

    receiveNetMessage(netMessage);
});

function receiveNetMessage(netMessage) {
    if (netMessage.sequence_number < expectedSequenceNumber) {
        mp.console.logError(
                    "~r~error: ~w~old packet received. We're expecting index " + expectedSequenceNumber + 
                    " but received: " + netMessage.sequence_number);
        mp.events.call("warning:show", "lag", 7500);
        return;
    }

    if (netMessage.sequence_number > expectedSequenceNumber) {
        // we received a message that belongs to the future, so
        // we buffer it and wait for the correct message to come.
        messagesInBuffer.push(netMessage);
        //mp.game.graphics.notify("~y~out of order: ~w~expecting " + expectedSequenceNumber
        //         + " but got " + netMessage.sequence_number + " (" + messagesInBuffer.length + " buffered)");

        if (messagesInBuffer.length > 32 || (new Date().getTime() - lastSyncedPacket) > 20000) {
            // advance expectedSequenceNumber to the oldest buffered packet,
            // assume the expecting packet is dropped.
            let oldestMessage = null;
            let oldestMessageIdx = -1;
            for (let i = 0; i < messagesInBuffer.length; i++) {
                let msg = messagesInBuffer[i];
                if (oldestMessage == null || msg.sequence_number < oldestMessage.sequence_number) {
                    oldestMessage = msg;
                    oldestMessageIdx = i;
                }
            }

            if (oldestMessage != null) {
                messagesInBuffer.splice(oldestMessageIdx, 1);
                expectedSequenceNumber = oldestMessage.sequence_number;
                //mp.game.graphics.notify("~y~buffer capacity/timeout exceeded: ~w~advance expectedSequenceNumber to " + expectedSequenceNumber);
                receiveNetMessage(oldestMessage);
            }
        }
    } else {
        processNetMessage(netMessage);
        expectedSequenceNumber++;
        lastSyncedPacket = new Date().getTime();

        // check if we have any buffered future messages waiting to be parsed.
        while (messagesInBuffer.length > 0) {
            // find if we have the next message in the sequence
            let parsedMessageIdx = -1;
            for (let i = 0; i < messagesInBuffer.length; i++) {
                if (messagesInBuffer[i].sequence_number == expectedSequenceNumber) {
                    //mp.game.graphics.notify("~g~synced buffered message: ~w~At " + expectedSequenceNumber +
                    //        " (" + (messagesInBuffer.length - 1) + " remaining)");
                    processNetMessage(messagesInBuffer[i]);
                    expectedSequenceNumber++;
                    parsedMessageIdx = i;
                    break;
                }
            }

            if (parsedMessageIdx == -1) { // we don't have the next message yet.
                break;
            }

            messagesInBuffer.splice(parsedMessageIdx, 1);
        }
    }
}

function processNetMessage(message) {
    let ints = 0;
    let floats = 0;
    let vectors = 0;
    let strings = 0;
    let booleans = 0;
    for (let i = 0; i < message.messages.length; i++) {
        let msgJoaat = message.messages[i];
        let msgFormat = message.formats[i];
        let repeatCount = message.messageRepeatCount[i];
        let handler = eventHandlers[msgJoaat];

        for (let msgRepeatIdx = 0; msgRepeatIdx < repeatCount; msgRepeatIdx++) {
            let args = [];
            for (let j = 0; j < msgFormat.length; j++) {
                if (msgFormat[j] == 'i') args.push(message.ints[ints++]);
                else if (msgFormat[j] == 'f') args.push(message.floats[floats++]);
                // if 'o' may deserialize right here. knowing its a json. Let as is for compat
                else if (msgFormat[j] == 's' || msgFormat[j] == 'o') args.push(message.strings[strings++]);
                else if (msgFormat[j] == 'b') args.push(message.booleans[booleans++]);
                else if (msgFormat[j] == 'v') args.push(message.vectors[vectors++]);
                else {
                    mp.game.graphics.notify("illegal format: " + msgFormat[j] + " at " + j + " format: " + msgFormat);
                }
            }

            if (handler) {
                try {
                    let name = eventNames[msgJoaat];
                    if (rpcFilter !== null && name.indexOf(rpcFilter) !== -1) {
                        mp.console.logInfo("[rpc " + name + "](" + args.map(it => JSON.stringify(it)).join(",") + ")", true, true);
                    }
                    mp.events.call(name, ...args);
                    //handler(...args);
                } catch (e) {
                    let eventName = eventNames[msgJoaat] || msgJoaat;
                    let title = "error processing " + eventName + " with args " + JSON.stringify(args).slice(0, 256);
                    mp.events.call("chat:push", "~n~~r~" + title);
                    mp.events.call("chat:push", "~y~" + e.stack.toString().replace(/\n/g, "~n~"));
                    mp.events.call("chat:show", true);
                }
            }
        }
    }
}

// test msg
let someGlobal = 0;
mp.rpc("myMsg", (text) => {
    mp.events.call("chat:push", "receive call-push with " + text + " and " + someGlobal++);
});

function joaatSigned(str) { // returns joaat as a signed int32
    return (new Int32Array([mp.game.joaat(str)]))[0];
}

mp.events.add("playerCommand", (command) => {
    if (command.startsWith("sniff")) {
        let argument = command.substr("sniff".length + 1)
        if (argument.length > 0) {
            sniffCallRemotes = argument;
            mp.console.logInfo(`sniff call remotes with '${argument}'`)
        } else {
            mp.console.logInfo(`dont sniff call remote.`)
            sniffCallRemotes = null;
        }
    }
    if (command.startsWith("rpcfilter")) {
        rpcFilter = command.substr("rpcfilter".length + 1);
        mp.console.logInfo("rpc filter: '" + rpcFilter + "'");
    }
    else if (command.startsWith("rpcdontfilter")) {
        rpcFilter = null;
        mp.console.logInfo("disable rpc filter");
    }
});

mp.rpc("rpcfilter_enable", (filter) => {
    rpcFilter = filter;
});

mp.rpc("rpcfilter_disable", () => {
    rpcFilter = null;
});
}