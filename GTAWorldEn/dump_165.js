{
var luckyGamesCEF = null;

mp.events.add({
    'LuckyGames::showLuckyGames': (pokerGame, bjGame) => {
        if(luckyGamesCEF != null && mp.browsers.exists(luckyGamesCEF)) return;
        luckyGamesCEF = mp.browsers.new("package://gtalife/LuckyGames/index.html");
        mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the interface.");	
        mp.gui.cursor.show(true, true);
        mp.events.call('LuckyGames::refreshLuckyGames', pokerGame, bjGame);
    },
    'LuckyGames::hideLuckyGames': CloseLuckyGames,
    'LuckyGames::refreshLuckyGames': Refresh,
    'LuckyGames::createPokerTable': (numberOfPlayers, creatingTable, numberOfBlinds, numberOfBetSteps) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::createPokerTable', numberOfPlayers, creatingTable, numberOfBlinds, numberOfBetSteps);
    },
    'LuckyGames::createBlackjackTable': (numberOfPlayers, minimumBet, maximumBet) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::createBlackjackTable', numberOfPlayers, minimumBet, maximumBet);
    },
    'LuckyGames::skipPokerTurn': (playerID) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::skipPokerTurn', playerID);
    },
    'LuckyGames::kickFromTable': (type, playerID) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::kickFromTable', type, playerID);
    },
    'LuckyGames::savePokerTable': (numberOfBlinds, numberOfBetSteps) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::savePokerTable', numberOfBlinds, numberOfBetSteps);
    },
    'LuckyGames::removeTable': (type) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::removeTable', type);
    },
    'LuckyGames::startTable': (type) => {
        if (luckyGamesCEF == null && !mp.browsers.exists(luckyGamesCEF)) return;
        mp.events.callRemote('LuckyGames::startTable', type);
    },
});

mp.keys.bind(0x73, false, function () { CloseLuckyGames(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseLuckyGames(); }); // ESC

function Refresh(pokerGame, bjGame)
{
    if(luckyGamesCEF != null && mp.browsers.exists(luckyGamesCEF)) {
        luckyGamesCEF.execute(`Initialize(${pokerGame}, ${bjGame});`);
    }
}

function CloseLuckyGames()
{
    if(luckyGamesCEF != null && mp.browsers.exists(luckyGamesCEF)) {
        luckyGamesCEF.destroy();
        mp.gui.cursor.show(false, false);
        luckyGamesCEF = null;
    }
}
}