{
let browser = null;
let gamePlayers = {};
let currentPot = 0;
let ourMoney = 0;
let maxBet = 0;
let ourBet = 0;
let currentTurn = null;
let lobbyId = 0;
let SelfAllIn = false;
let IsBlindTurn = false;

let BetIncreaseStep = 50;

var posX = 1920 * 0.7;
var posY = 1080 * 0.3;
/* NativeUI */
const NativeUI = require("./gtalife/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;

var poker_menu;

function onItemSelectPoker(item, index) {
    if (ShowRaise == false){
        index++;
    }
    switch (index) {
        case 0:
            // Raise
            var selItem = item.SelectedItem.DisplayText.toString();
            selItem = selItem.replace("$", "");
            if(ourMoney == parseInt(selItem))
                SelfAllIn = true;

            mp.events.callRemote('TURN_RESPONSE', lobbyId, 0, parseInt(selItem));
            
            poker_menu.Visible = false;
            //poker_menu.Close();
            break;
        case 1:
            // Call/check
            mp.events.callRemote('TURN_RESPONSE', lobbyId, 1);
            poker_menu.Visible = false;
            //poker_menu.Close();
            break;
        case 2:
            // Fold
            mp.events.callRemote('TURN_RESPONSE', lobbyId, 2);
            poker_menu.Visible = false;
            //poker_menu.Close();
            break;
    }
}

function listChangeEventPoker(item, index) {

}


function CreateMenu() {
    poker_menu = new Menu("Your Turn", "", new Point(posX, posY)); //

    poker_menu.RefreshIndex();
    poker_menu.Visible = false;

    poker_menu.ListChange.on(listChangeEventPoker);
    poker_menu.ItemSelect.on(onItemSelectPoker);

    poker_menu.MenuClose.on(function (player) {
        poker_menu.Visible = true;
    });
}

var ShowRaise = false;

function RebuildMenu() {
    poker_menu.Clear();
    ShowRaise = false;
    let tempmaxBet = maxBet;
    if (ourMoney > maxBet){
        ShowRaise = true;
        var Amounts = [];
        for (var i = 0; i < 29; i++) {
            if(tempmaxBet + BetIncreaseStep < ourMoney){
                 Amounts[i] = "$"+Math.ceil(tempmaxBet + BetIncreaseStep).toString();
                tempmaxBet += BetIncreaseStep;
            }
            else continue;
        }
        Amounts.push("$"+ourMoney.toString());
        poker_menu.AddItem(new UIMenuListItem("Raise", "", new ItemsCollection(Amounts)));
    }
    if (maxBet > ourBet && ourMoney > 0) {
        poker_menu.AddItem(new UIMenuItem("Call", ""));
    }else{
        poker_menu.AddItem(new UIMenuItem("Check", ""));
    }
    if(SelfAllIn == false && IsBlindTurn == false)
        poker_menu.AddItem(new UIMenuItem("Fold", ""));
}

mp.events.add(
{
    "CREATE_CEF":() => {
        if (mp.browsers.exists(browser)) return;
        
        browser = mp.browsers.new("package://gtalife/Poker/cef/ui.html");
    },

    "ENTER_GAME":(id, betstep) => {
        lobbyId = id;
        currentPot = 0;
        maxBet = 0;
        ourBet = 0;
        SelfAllIn = false;
        BetIncreaseStep = betstep;
        enterGame();
        mp.events.call("toggleHUDExForPlayer", false);
    },
    "EDIT_BETSTEP":(betstep) => {
        BetIncreaseStep = betstep;
    },
    "LEAVE_GAME":() => {
        removeLoadingMessage();
        endGame();
        mp.events.call("toggleHUDExForPlayer", true);
    },
    "ADD_PLAYER":(player, name)  => {
        gamePlayers[player] = {};
        gamePlayers[player].name = name;
        updateTimerbars();
    },
    "SET_PLAYERS":(jsonData) => {
        data = JSON.parse(jsonData);
        let count = data[0];
        for (let i = 1; i <= count;) {
            gamePlayers[data[i]] = {};
            gamePlayers[data[i]].name = data[i+1];
            i = i+2;
        }
        updateTimerbars();
    },
    "PLAYER_LEAVE_GAME": (player) => {
        if(gamePlayers[player] != null && gamePlayers[player] != undefined){
            delete gamePlayers[player];
        }
        updateTimerbars();
    },
    "SET_POT": (pot) => {
        currentPot = pot;
        updateTimerbars();
    },
    "UPDATE_LAST_PLAYER_ACTION": (player, name, action) => {
        if(gamePlayers[player] == null || gamePlayers[player] == undefined){
            CreatePlayerEx(player, name);
        }
        gamePlayers[player].lastAction = action;
        gamePlayers[player].hasCards = false;
        updateTimerbars();
    },
    "SET_EVERYONE_FOLDED": (player, name) => {
        if(gamePlayers[player] == null || gamePlayers[player] == undefined){
            CreatePlayerEx(player, name);
        }
        gamePlayers[player].lastAction = "folded";
        gamePlayers[player].hasCards = false;
    },
    "SET_HAND_CARDS": (card1, card2) => {
        if (!mp.browsers.exists(browser)) return;
        browser.execute(`setHandCards("${card1}","${card2}")`);
    },
    "SET_TABLE_CARDS": (jsonData) => {
        if (!mp.browsers.exists(browser)) return;
        data = JSON.parse(jsonData);
        browser.execute(`clearTableCards();`);
        let count = data[0];
        for (let j = 0; j < count; j++) {
            browser.execute(`addTableCard("${data[j + 1]}");`);
        }
    },
    "YOUR_TURN": (allin, blindturn) => {
        IsBlindTurn = blindturn;
        RebuildMenu();
        currentTurn = null;
        poker_menu.Visible = true;
        removeLoadingMessage();
        updateTimerbars();
    },
    "SOMEONES_TURN": (player, name) => {
        if(gamePlayers[player] == null || gamePlayers[player] == undefined){
            CreatePlayerEx(player, name);
        }
        currentTurn = player;
        removeLoadingMessage();
        startLoadingMessage ('STRING',"Waiting for " + gamePlayers[player].name);
        updateTimerbars();
    },
    "SET_MAX_BET": (bet) => {
        maxBet = bet;
    },
    "END_ROUND": () => {
        removeLoadingMessage();
        startLoadingMessage ('STRING',"Waiting for new game to start");
    },
    "SKIP_TURN": () => {
        mp.events.callRemote('TURN_RESPONSE', lobbyId, 3, 0);
        poker_menu.Visible = false;
    },
    "NEW_ROUND": () => {
        if (!mp.browsers.exists(browser)) return;
        for (let player in gamePlayers) {
            gamePlayers[player].hasCards = false;
            gamePlayers[player].lastAction = null;
        }
        ourBet = 0;
        currentPot = 0;
        currentTurn = null;
        SelfAllIn = false;
        browser.execute(`clearTableCards();`);
        updateTimerbars();
        removeLoadingMessage();
    },
    "UPDATE_MONEY": (money, bet, maxbet) => {
        ourMoney = money;
        ourBet = bet;
        maxBet = maxbet;
        updateTimerbars();
    },
    "SET_PLAYER_CARDS": (player, name, card1, card2) => {
        if(gamePlayers[player] == null || gamePlayers[player] == undefined){
            CreatePlayerEx(player, name);
        }
        gamePlayers[player].hasCards = true;
        gamePlayers[player].cardOne = card1;
        gamePlayers[player].cardTwo = card2;
        updateTimerbars();
    },
    "SHARD_CUSTOM": (text, timer) => {
        if(text == "winner")
            mp.events.call("ShowShardMessage", text, "", 25, 0);
        else
            mp.events.call("ShowShardMessage", text, "", 8, 0);
    },
    "WAITING_PLAYERS": () => {
        if (!mp.browsers.exists(browser)) return;
        removeLoadingMessage();
        startLoadingMessage ('CELEB_WPLYRS',"");
        browser.execute(`clearTableCards();`);
        updateTimerbars();
        browser.execute(`setHandCards("a:joker", "a:joker big");`);
    },
});

function CreatePlayerEx(player, name){
    gamePlayers[player] = {};
    gamePlayers[player].name = name;
}

function enterGame() {
    mp.events.call('CREATE_CEF');
    gamePlayers = {};
    removeLoadingMessage();
    CreateMenu();
    startLoadingMessage ('CELEB_WPLYRS',"");
}

function endGame() {
    if (!mp.browsers.exists(browser)) return;

    browser.destroy();
    browser = null;
    removeLoadingMessage();
    poker_menu.Visible = false;
}

function updateTimerbars() {
    if (!mp.browsers.exists(browser)) return;

    browser.execute(`clearTimers();`);
    for (let player in gamePlayers) {
        if (gamePlayers[player].hasCards) {
            if (gamePlayers[player].lastAction != "folded") {
                browser.execute(`addTimerCards("${gamePlayers[player].name}", "${gamePlayers[player].cardOne}", "${gamePlayers[player].cardTwo}");`);
            }else{
                browser.execute(`addTimerCards("${gamePlayers[player].name}", "a:joker", "a:joker big", true);`);
            }
        }
        else {
            if (gamePlayers[player].lastAction)
                browser.execute(`addTimerText("${gamePlayers[player].name}", "${gamePlayers[player].lastAction}", ${player == currentTurn});`);
            else
                browser.execute(`addTimerText("${gamePlayers[player].name}", "READY", ${player == currentTurn});`);
        }
    }
    browser.execute(`addTimerText("CASH", "$${ourMoney}");`);
    browser.execute(`addTimerText("BET", "$${maxBet}");`);
    browser.execute(`addTimerText("POT", "$${currentPot}");`);
}

function startLoadingMessage (string, text) {
    mp.game.ui.setLoadingPromptTextEntry(string);
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.showLoadingPrompt(4);
}

function removeLoadingMessage(){
    mp.game.invoke('0x10D373323E5B9C0D');
}
}