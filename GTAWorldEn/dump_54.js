{
var browser = null;
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

var ourBet = 0;
var ourBet2 = 0;
var tableID = -1;

mp.events.add(
{
    "turn_response_bj":(args, args1 = null, args2 = null) =>{
        mp.events.callRemote('TURN_RESPONSE_BJ', tableID, args,args1,args2);
    },
    "BJ_CREATE_CEF":() => {
        if(!mp.browsers.exists(browser)) {
            browser = mp.browsers.new("package://gtalife/Blackjack/cef/ui.html");
            browser.execute(`setTextLabel("Waiting for players");`);
        }
    },

    "BJ_ENTER_GAME":(id) => {
        mp.events.call('BJ_CREATE_CEF');
        tableID = id;
        ourBet = 0;
        ourBet2 = 0;
        mp.events.call("toggleHUDExForPlayer", false);
    },
    
    "BJ_LEAVE_GAME":() => {
        if(mp.browsers.exists(browser)) {
            browser.destroy();
            browser = null;
            mp.gui.cursor.show(false, false);
            mp.events.call("toggleHUDExForPlayer", true);
        }
    },
    "BJ_SHOW_READY":() => {
        if(mp.browsers.exists(browser)) {
            mp.gui.cursor.show(true, true);
            browser.execute(`showReady();`);
        }
    },
    "BJ_SHOW_START":() => {
        if(mp.browsers.exists(browser)) {
            mp.gui.cursor.show(true, true);
            browser.execute(`showStart();`);
            browser.execute(`setTextLabel("");`);
        }
    },
    "BJ_WAITING_DEALER":() => {
        if(mp.browsers.exists(browser))
            browser.execute(`setTextLabel("Waiting on dealer to start game");`);
    },
    "BJ_WAITING_ON_PLAYERS":() => {
        if(mp.browsers.exists(browser))
            browser.execute(`setTextLabel("Waiting on players to ready up");`);
    },
    "BJ_REMOVE_START":() => {
        if(mp.browsers.exists(browser))
            browser.execute(`$("#dealer").hide();`);
    },
    "BJ_ADD_PLAYER":(jsonData)  => {
        if(mp.browsers.exists(browser)) {
            data = JSON.parse(jsonData);
            browser.execute(`addPlayer(${data[0]}, "${data[1]}","${data[2]}", ${data[0]});`);
            browser.execute(`setTextLabel("Waiting on players to ready up");`);
        }
    },
    "BJ_SET_PLAYERS":(jsonData) => {
        if(mp.browsers.exists(browser)) {
            data = JSON.parse(jsonData);
            let count = data[0];
            for (let i = 1; i <= count; i++) {
                //data2 = JSON.parse(data[i]);
                browser.execute(`addPlayer(${data[i][0]}, "${data[i][1]}","${data[i][2]}", ${data[i][0]});`);
            }
        }
    },
    "BJ_PLAYER_LEAVE_GAME": (slot) => {
        if(mp.browsers.exists(browser))
            browser.execute(`removePlayer(${slot});`);
    },
    "BJ_SET_HAND_CARDS": (player, card1, card2, value) => {
        if(mp.browsers.exists(browser))
            browser.execute(`addPlayerStartCards(${player}, "${card1}","${card2}", ${value})`);
    },
    "BJ_SET_SPLIT_HAND_CARDS": (player, card1, card2, value, hand) => {
        if(mp.browsers.exists(browser))
            browser.execute(`addPlayerStartSplitCards(${player}, "${card1}","${card2}", ${value}, ${hand})`);
    },
    "BJ_SET_TABLE_CARDS": (jsonData) => {
        if(mp.browsers.exists(browser)) {
            data = JSON.parse(jsonData);
            browser.execute(`clearDealerCards();`);
            let count = data[0];
            for (let j = 0; j < count; j++) {
                //data2 = JSON.parse(data[j]);
                browser.execute(`addDealerCard("${data[j+1][0]}", ${data[j+1][1]}, ${data[j+1][2]}, ${data[j+1][3]});`);
            }
        }
    },
    "BJ_ADD_TABLE_CARD": (card, total, secondcard = false, show = true, move = false) => {
        if(mp.browsers.exists(browser))
            browser.execute(`addDealerCard("${card}", ${total},${secondcard},${show}, ${move});`);
    },
    "BJ_DEALER_TURN": () => {
        if(mp.browsers.exists(browser)) {
            browser.execute(`hideControls();`);
            browser.execute(`setCurrentTurn(1, 0, true);`);
            browser.execute(`setTextLabel("Waiting on dealer");`);
        }
    },
    "BJ_YOUR_TURN": (slot, split, double, hand = 0) => {
        if(mp.browsers.exists(browser)) {
            browser.execute(`showControls(${split}, ${double});`);
            browser.execute(`setTextLabel("");`);
            browser.execute(`setCurrentTurn(${slot}, ${hand});`);
            mp.gui.cursor.show(true, true);
        }
    },
    "BJ_SOMEONES_TURN": (slot, player, hand = 0) => {
        if(mp.browsers.exists(browser)) {
            browser.execute(`setTextLabel("Waiting for ${player}");`);
            browser.execute(`setCurrentTurn(${slot}, ${hand});`);
            browser.execute(`hideControls();`);
        }
    },
    "BJ_SET_BETS": (min, max) => {
        if(mp.browsers.exists(browser)) 
            browser.execute(`setBettingData(${min}, ${max});`);
    },
    "BJ_START_BETTING_DEALER": () => {
        if(mp.browsers.exists(browser)) 
            browser.execute(`setTextLabel("Placing bets");`);
    },
    "BJ_START_BETTING": () => {
        if(mp.browsers.exists(browser)) {
            browser.execute(`showBetting();`);
            browser.execute(`setTextLabel("Placing bets");`);
        }
    },
    "BJ_RETURN_BET": (bet) => {
        mp.events.callRemote('TURN_RESPONSE_BJ', tableID, "RETURN_BET", bet);
    },
    "BJ_END_ROUND": () => {
        if(mp.browsers.exists(browser)) 
            browser.execute(`setTextLabel("Waiting for new game to start");`);
    },
    "BJ_NEW_ROUND": () => {
        if(mp.browsers.exists(browser))
            browser.execute(`clearEverything();`);
    },
    "BJ_ALTER_LABEL": (player, text) => {
        if(mp.browsers.exists(browser))
            browser.execute(`alterPlayerLabel(${player}, "${text}");`);
    },
    "BJ_SET_HAND_RESULT": (player, result, hand = '') => {
        if(mp.browsers.exists(browser)) 
            browser.execute(`setPlayerHandResult(${player}, "${result}", "${hand}");`);
    },
    "BJ_SET_PLAYER_RESULT": (player, result) => {
        if(mp.browsers.exists(browser)) 
            browser.execute(`setPlayerResult(${player}, "${result}");`);
    },
    "BJ_SPLIT": (player, total) => {
        if(mp.browsers.exists(browser))
            browser.execute(`splitPlayerCards(${player}, ${total});`);
    },
    "BJ_ADD_CARD":(player, card, total, secondhand) =>
    {
        if(mp.browsers.exists(browser))
            browser.execute(`addPlayerCard(${player}, "${card}", ${total}, ${secondhand});`);
    },
    "BJ_WAITING_PLAYERS": () => {
        if(mp.browsers.exists(browser)) {
            browser.execute(`setTextLabel("Waiting for players to join");`);
            browser.execute(`clearDealerCards();`);
            browser.execute(`clearPlayers();`);
        }
    },
    "BJ_SHARD_CUSTOM": (text) => {
        if(text == "blackjack")
            mp.events.call("ShowShardMessage", text, "", 26, 0);
        else if(text == "win"){
            mp.events.call("ShowShardMessage", "winner", "", 25, 0);
        }
        else if(text == "push")
            mp.events.call("ShowShardMessage", text, "", 145, 0);
        else
            mp.events.call("ShowShardMessage", text, "", 8, 0);
    },
});

}