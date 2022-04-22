{
let teamData = undefined;
let lastTeamHandler = undefined;

const relationshipNames = {
    Player: "PLAYER",
    Default: "RG_PLAYER_NEUTRAL",
    SameTeam: "RG_PLAYER_TEAMMATE"
};

const relationshipTypes = {
    Companion: 0,
    Respect: 1,
    Like: 2,
    Neutral: 3,
    Dislike: 4,
    Hate: 5,
    Pedestrians: 255
};

const defaultTeamHash = mp.game.joaat(relationshipNames.Default);
const sameTeamHash = mp.game.joaat(relationshipNames.SameTeam);

// just in case
mp.players.local.setRelationshipGroupHash(mp.game.joaat(relationshipNames.Player));

// create relationship groups
mp.game.ped.addRelationshipGroup(relationshipNames.Default, 0);
mp.game.ped.addRelationshipGroup(relationshipNames.SameTeam, 0);

// set relationships
mp.game.ped.setRelationshipBetweenGroups(relationshipTypes.Companion, mp.game.joaat(relationshipNames.Player), mp.game.joaat(relationshipNames.SameTeam));
mp.game.ped.setRelationshipBetweenGroups(relationshipTypes.Hate, mp.game.joaat(relationshipNames.Player), mp.game.joaat(relationshipNames.Default));

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        let entityTeam = entity.getVariable("currentTeam");
        entity.setRelationshipGroupHash((entityTeam != null && entityTeam === mp.players.local.getVariable("currentTeam")) ? sameTeamHash : defaultTeamHash);
    }
});

mp.events.addDataHandler("currentTeam", (entity, value) => {
    if (entity.type !== "player" || !entity.handle) return;

    if (entity.handle === mp.players.local.handle) {
        if (value != null) {
            mp.players.forEachInStreamRange((player) => {
                if (player.handle !== mp.players.local.handle) {
                    let playerTeam = player.getVariable("currentTeam");
                    player.setRelationshipGroupHash((playerTeam != null && playerTeam === value) ? sameTeamHash : defaultTeamHash);
                }
            });
        } else {
            mp.players.forEachInStreamRange((player) => {
                if (player.handle !== mp.players.local.handle) player.setRelationshipGroupHash(defaultTeamHash);
            });
        }
    } else {
        entity.setRelationshipGroupHash((value != null && mp.players.local.getVariable("currentTeam") === value) ? sameTeamHash : defaultTeamHash);
    }
});

mp.events.add("loadOutfits", (n) => {
    if(n == 1) {
	    mp.events.call("toggleOutfitBrowser:Saints", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 2) {
	    mp.events.call("toggleOutfitBrowser:Narcos", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 3) {
	    mp.events.call("toggleOutfitBrowser:Marabunta", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 4) {
	    mp.events.call("toggleOutfitBrowser:Aztecas", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 5) {
	    mp.events.call("toggleOutfitBrowser:Taliban", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 6) {
	    mp.events.call("toggleOutfitBrowser:losreyes", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 7) {
	    mp.events.call("toggleOutfitBrowser:Bloods", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
    if(n == 8) {
	    mp.events.call("toggleOutfitBrowser:Crips", true);
        mp.events.call("setOutfitBrowserVar", true);
    }
});

mp.events.add("receiveTeamData", (jsonData) => {
    teamData = JSON.parse(jsonData);
});

mp.events.add("setTeamVar", (teamIdx) => {
    if (teamIdx == 1) {
        sharedVariables.teamName = `~HUD_COLOUR_PINK~Saints`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_SAINTS";
        }, 500);
    }
    if (teamIdx == 2) {
        sharedVariables.teamName = `~HUD_COLOUR_RED~Narcos`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_NARCOS";
        }, 500);
    }
    if (teamIdx == 3) {
        sharedVariables.teamName = `~HUD_COLOUR_BLUELIGHT~Marabunta`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_MARABUNTA";
        }, 500);
    }
    if (teamIdx == 4) {
        sharedVariables.teamName = `~HUD_COLOUR_YELLOW~Aztecas`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_AZTECAS";
        }, 500);
    }
    if (teamIdx == 5) {
        sharedVariables.teamName = `~HUD_COLOUR_NET_PLAYER11~Taliban`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_TALIBAN";
        }, 500);
    }
    if (teamIdx == 6) {
        sharedVariables.teamName = `~HUD_COLOUR_GREEN~Los Reyes`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_LOSREYES";
        }, 500);
    }
    if (teamIdx == 7) {
        sharedVariables.teamName = `~HUD_COLOUR_RADAR_DAMAGE~Bloods`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_BLOODS";
        }, 500);
    }
    if (teamIdx == 8) {
        sharedVariables.teamName = `~HUD_COLOUR_NET_PLAYER24~Crips`;
        setTimeout(() => {
            lastTeamHandler = "TEAM_CRIPS";
        }, 500);
    }
    mp.game.graphics.notify(`You have joined ${sharedVariables.teamName}`);
});

mp.keys.bind(0x72, true, function() {
    mp.events.call("togglemenu", true);
});

mp.events.add("detectTeamChange", () => {
    if (lastTeamHandler != undefined) {
        mp.events.callRemote("updateTeamCount", `${lastTeamHandler}`, 1);
        lastTeamHandler = undefined;
    }
});
}