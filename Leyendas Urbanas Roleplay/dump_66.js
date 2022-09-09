{
// Obtener jugadores cercanos
const getNearbyPlayers = (radius) => {
    let nearbyPlayers = [];
    
    mp.players.forEachInStreamRange((player) => {
        if (calcDist(player.position, mp.players.local.position) <= radius)
            nearbyPlayers.push(player.remoteId);
    });

    return nearbyPlayers;
}

// const commandMe = (msg) => {
//     let players = getNearbyPlayers(30);
//     mp.events.callRemote('chat:commandMe', JSON.stringify(players), msg);
// }

// const commandDo = (msg) => {
//     let players = getNearbyPlayers(30);
//     mp.events.callRemote('chat:commandDo', JSON.stringify(players), msg);
// }

// const commandLocal = (msg) => {
//     let players = getNearbyPlayers(12.5);
//     mp.events.callRemote('chat:commandLocal', JSON.stringify(players), msg);
// }

// const commandGritar = (msg) => {
//     let players = getNearbyPlayers(60);
//     mp.events.callRemote('chat:commandGritar', JSON.stringify(players), msg);
// }

// const commandRadio = (msg) => {
//     let factionPlayers, nearbyPlayers = [];

//     mp.players.forEach((player) => {
//         if (mp.controladorJugadores._jugadores[player.id].faccion === mp.controladorJugadores._jugadores[mp.players.local.id].faccion) {
//             factionPlayers.push(player.remoteId);
//             return;   
//         }

//         if (calcDist(player.position, mp.players.local.position) <= 10)
//             nearbyPlayers.push(player.remoteId);
//     });

//     for (let i = 0; i < factionPlayers.length; i++) {
//         mp.players.forEachInStreamRange
//     }

//     console.log(`factionPlayers: ${factionPlayers.length}`);
//     console.log(`nearbyPlayers: ${nearbyPlayers.length}`);

//     mp.events.callRemote("chat:commandRadio", JSON.stringify(factionPlayers), JSON.stringify(nearbyPlayers), args.join(" "));

//     return;
// }

mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
	const commandName = args[0].toLowerCase();

	args.shift();

    let radius, event;

    switch (commandName) {
        case "me":
            radius = 30;
            event = "Me";
            break;

        case "do":
            radius = 30;
            event = "Do";
            break;

        case "local":
        case "l":
            radius = 12.5;
            event = "Local";    
            break;

        case "gritar":
        case "gr":
            radius = 60;
            event = "Gritar";
            break;

        default:
            return;
    }

    let players = getNearbyPlayers(radius);
    mp.events.callRemote(`chat:command${event}`, JSON.stringify(players), args.join(" "));

    return;
});
}