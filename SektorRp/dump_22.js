{
let blackjackHud = null;
let inGame = false;

mp.events.add('client__BlackjackHudUpdate', (act, ...data) => {
    switch (act) {
        case 'setUIVisible':
            if (data[0] == true) {
                blackjackHud = mp.browsers.new('package://RageServer/Casino/blackjack/cef/hud/index.html');
                inGame = false;
            }
            else {
                blackjackHud?.destroy();
                blackjackHud = null;
                canDoBets = false;
                mp.players.local.freezePosition(false);
                mp.players.local.casino = false;
                //@BitDEVil2K16: Please re-enable cell phone + animation controls here
            }
            break;
        case 'updateCounter':
            blackjackHud?.execute(`updateCounter(${data[0]})`);
            break;
        case 'updateChoiceCounter':
            blackjackHud?.execute(`updateChoiceCounter(${data[0]})`);
            break;
        case 'updateBet':
            blackjackHud?.execute(`updateBet(${data[0]})`);
            break;
        case 'updateMoney':
            blackjackHud?.execute(`updateMoney(${data[0]})`);
            break;
        case 'addPlayerCard':
            blackjackHud?.execute(`addPlayerCard('${data[0]}')`);
            break;
        case 'addDealerCard':
            blackjackHud?.execute(`addDealerCard('${data[0]}')`);
            break;
        case 'updateDealerCard':
            blackjackHud?.execute(`updateDealerCard(${data[0]}, '${data[1]}')`);
            break;
        case 'clearAllCards':
            blackjackHud?.execute(`clearAllCards()`);
            break;
        case 'setCounterVisible':
            inGame = !data[0];
            blackjackHud?.execute(`setCounterVisible(${data[0]})`);
            break;
        case 'setChoiceCounterVisible':
            blackjackHud?.execute(`setChoiceCounterVisible(${data[0]})`);
            break;
    }
});

let betBlackjack = [
    [],
    [],
];

let canDoBets = false;
let betObject = null;

let CasinoPedsBJ = [
    { Hash: 0xBC92BED5, Pos: new mp.Vector3(-1833.3994140625, -1184.6722412109375, 14.307744026184082), Angle: -58.38 },
    { Hash: 0x1422D45B, Pos: new mp.Vector3(-1838.9989013671875, -1193.5645751953125, 14.307745933532715), Angle: -29.27 },
];

let CasinoPedsBJID = [];

let cardNum = 0;
let CardObjects = [
    [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ],
    [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ],
];

const BlackJackTablesPos = [
    new mp.Vector3(-1832.704, -1184.227, 13.29744),
    new mp.Vector3(-1838.601, -1192.844, 13.29744)
];

mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@player@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@blackjack@dealer");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@blackjack@player");

setTimeout(function () {
    let n = 0;

    for (let tb = 0; tb < BlackJackTablesSeatsHeading.length; tb++) {
        // if (tb == 0){
        // mp.players.local.position = new mp.Vector3( BlackJackTablesPos[tb].x, BlackJackTablesPos[tb].y, BlackJackTablesPos[tb].z+2);
        // }
        BlackJackTables[tb] = mp.objects.new(s_propName, new mp.Vector3(BlackJackTablesPos[tb].x, BlackJackTablesPos[tb].y, BlackJackTablesPos[tb].z), {
            rotation: new mp.Vector3(0, 0, BlackJackTablesHeading[tb]),
            alpha: 0,
            dimension: 0
        });
    }

    CasinoPedsBJ.forEach(ped => {
        CasinoPedsBJID[n] = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        CasinoPedsBJID[n].setComponentVariation(0, 2, 1, 0);
        CasinoPedsBJID[n].setComponentVariation(1, 1, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(2, 2, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(3, 0, n + 2, 0);
        CasinoPedsBJID[n].setComponentVariation(4, 0, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(6, 1, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(7, 2, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(8, 1, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(10, 1, 0, 0);
        CasinoPedsBJID[n].setComponentVariation(11, 1, 0, 0);
        CasinoPedsBJID[n].setConfigFlag(185, true);
        CasinoPedsBJID[n].setConfigFlag(108, true);
        CasinoPedsBJID[n].setConfigFlag(208, true);
        CasinoPedsBJID[n].taskPlayAnim("anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
        n = n + 1;
    })

}, 1000);

const BlackJackTableCardsRotation = [
    [69.12, 67.8, 66.6, 70.44, 70.84, 67.88, 69.56],
    [22.11, 22.32, 20.8, 19.8, 19.44, 26.28, 22.68],
    [-21.43, -20.16, -16.92, -23.4, -21.24, -23.76, -19.44],
    [-67.03, -69.12, -64.44, -67.68, -63.72, -68.4, -64.44],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];

const BlackJackBetsOffset = [
    new mp.Vector3(0.712625, 0.170625, 0.95),
    new mp.Vector3(0.278125, -0.2571, 0.95),
    new mp.Vector3(-0.30305, -0.2464, 0.95),
    new mp.Vector3(-0.72855, 0.17345, 0.95),
    new mp.Vector3(0.0, 0.0, 0.0),
    new mp.Vector3(0.0, 0.0, 0.0)
];

const BlackJackTableCardsOffset = [
    [
        new mp.Vector3(0.5737, 0.2376, 0.948025),
        new mp.Vector3(0.562975, 0.2523, 0.94875),
        new mp.Vector3(0.553875, 0.266325, 0.94955),
        new mp.Vector3(0.5459, 0.282075, 0.9501),
        new mp.Vector3(0.536125, 0.29645, 0.95085),
        new mp.Vector3(0.524975, 0.30975, 0.9516),
        new mp.Vector3(0.515775, 0.325325, 0.95235),
    ],
    [
        new mp.Vector3(0.2325, -0.1082, 0.94805),
        new mp.Vector3(0.23645, -0.0918, 0.949),
        new mp.Vector3(0.2401, -0.074475, 0.950225),
        new mp.Vector3(0.244625, -0.057675, 0.951125),
        new mp.Vector3(0.249675, -0.041475, 0.95205),
        new mp.Vector3(0.257575, -0.0256, 0.9532),
        new mp.Vector3(0.2601, -0.008175, 0.954375),
    ],
    [
        new mp.Vector3(-0.2359, -0.1091, 0.9483),
        new mp.Vector3(-0.221025, -0.100675, 0.949),
        new mp.Vector3(-0.20625, -0.092875, 0.949725),
        new mp.Vector3(-0.193225, -0.07985, 0.950325),
        new mp.Vector3(-0.1776, -0.072, 0.951025),
        new mp.Vector3(-0.165, -0.060025, 0.951825),
        new mp.Vector3(-0.14895, -0.05155, 0.95255),
    ],
    [
        new mp.Vector3(-0.5765, 0.2229, 0.9482),
        new mp.Vector3(-0.558925, 0.2197, 0.949175),
        new mp.Vector3(-0.5425, 0.213025, 0.9499),
        new mp.Vector3(-0.525925, 0.21105, 0.95095),
        new mp.Vector3(-0.509475, 0.20535, 0.9519),
        new mp.Vector3(-0.491775, 0.204075, 0.952825),
        new mp.Vector3(-0.4752, 0.197525, 0.9543),
    ],
    [
        new mp.Vector3(-0.0436, 0.21205, 0.948875),
        new mp.Vector3(0.0356, 0.2105, 0.94885),
        new mp.Vector3(-0.1206, 0.2137, 0.950225),
        new mp.Vector3(-0.206, 0.21125, 0.950875),
        new mp.Vector3(-0.286, 0.21125, 0.950875),
        new mp.Vector3(0.5185, 0.253, 0.950025),
    ]
];

const BlackJackTablesHeading = [
    120.00,
    150.00,
];

const BlackJackTablesSeatsHeading = [
    [-172.85, 146.19, 101.19, 51.19],
    [219.5, 174.3, 129.5, 83.07],
];

const BlackJackSeats = {
    0: "Chair_Base_04",
    1: "Chair_Base_03",
    2: "Chair_Base_02",
    3: "Chair_Base_01"
};

const CasinoCards = [
    "vw_prop_cas_card_club_ace",
    "vw_prop_cas_card_club_02",
    "vw_prop_cas_card_club_03",
    "vw_prop_cas_card_club_04",
    "vw_prop_cas_card_club_05",
    "vw_prop_cas_card_club_06",
    "vw_prop_cas_card_club_07",
    "vw_prop_cas_card_club_08",
    "vw_prop_cas_card_club_09",
    "vw_prop_cas_card_club_10",
    "vw_prop_cas_card_club_jack",
    "vw_prop_cas_card_club_queen",
    "vw_prop_cas_card_club_king",
    "vw_prop_cas_card_dia_ace",
    "vw_prop_cas_card_dia_02",
    "vw_prop_cas_card_dia_03",
    "vw_prop_cas_card_dia_04",
    "vw_prop_cas_card_dia_05",
    "vw_prop_cas_card_dia_06",
    "vw_prop_cas_card_dia_07",
    "vw_prop_cas_card_dia_08",
    "vw_prop_cas_card_dia_09",
    "vw_prop_cas_card_dia_10",
    "vw_prop_cas_card_dia_jack",
    "vw_prop_cas_card_dia_queen",
    "vw_prop_cas_card_dia_king",
    "vw_prop_cas_card_hrt_ace",
    "vw_prop_cas_card_hrt_02",
    "vw_prop_cas_card_hrt_03",
    "vw_prop_cas_card_hrt_04",
    "vw_prop_cas_card_hrt_05",
    "vw_prop_cas_card_hrt_06",
    "vw_prop_cas_card_hrt_07",
    "vw_prop_cas_card_hrt_08",
    "vw_prop_cas_card_hrt_09",
    "vw_prop_cas_card_hrt_10",
    "vw_prop_cas_card_hrt_jack",
    "vw_prop_cas_card_hrt_queen",
    "vw_prop_cas_card_hrt_king",
    "vw_prop_cas_card_spd_ace",
    "vw_prop_cas_card_spd_02",
    "vw_prop_cas_card_spd_03",
    "vw_prop_cas_card_spd_04",
    "vw_prop_cas_card_spd_05",
    "vw_prop_cas_card_spd_06",
    "vw_prop_cas_card_spd_07",
    "vw_prop_cas_card_spd_08",
    "vw_prop_cas_card_spd_09",
    "vw_prop_cas_card_spd_10",
    "vw_prop_cas_card_spd_jack",
    "vw_prop_cas_card_spd_queen",
    "vw_prop_cas_card_spd_king",
];

mp.game.streaming.requestModel(mp.game.joaat('vw_prop_casino_blckjack_01'));

const s_propName = mp.game.joaat('vw_prop_casino_blckjack_01');
let BlackJackTables = [];

mp.events.add('client_bj_give_card', function (table, play, num, card) {
    mp.game.streaming.requestModel(mp.game.joaat(`${CasinoCards[card]}`));

    let animName = `deal_card_player_0${play + 1}`;
    let cardOff = new mp.Vector3(0.526, 0.571, 0.963);
    let tableCords = BlackJackTablesPos[table];

    CardObjects[table][play][num] = mp.objects.new(mp.game.joaat(`${CasinoCards[card]}`), new mp.Vector3(tableCords.x, tableCords.y, tableCords.z),
        {
            rotation: new mp.Vector3(0, 0, 0),
            alpha: 255,
            dimension: 0,
        });

    setTimeout(() => {

        let cardPos = mp.game.object.getObjectOffsetFromCoords(tableCords.x, tableCords.y, tableCords.z - 10, BlackJackTablesHeading[table], cardOff.x, cardOff.y, cardOff.z - 10);


        CardObjects[table][play][num].setVisible(false, false);
        CardObjects[table][play][num].position = cardPos;
        CardObjects[table][play][num].setCoordsNoOffset(cardPos.x, cardPos.y, cardPos.z, false, false, true);
        let rotat = new mp.Vector3(BlackJackTablesHeading[table], 164.52, 11.5);
        CardObjects[table][play][num].setRotation(rotat.x, rotat.y, rotat.z, 2, true);
        mp.game.invoke("0xE532F5D78798DAAB", mp.game.joaat(`${CasinoCards[card]}`));
        CardObjects[table][play][num].attachTo(CasinoPedsBJID[table].handle, CasinoPedsBJID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);

        if (play == 4) {
            if (num == 0) {
                animName = "deal_card_self_second_card";
            }
            else if (num == 1) {
                animName = "deal_card_self";
            }
            else {
                animName = "deal_card_self_card_06";
            }
        }

        CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", animName, 3.0, 1.0, -1, 2, 0, false, false, false);
    }, 150);

    setTimeout(() => {
        CardObjects[table][play][num].setVisible(true, false);
    }, 300);
    setTimeout(() => {
        CardObjects[table][play][num].detach(false, true);


        let newCardOff = BlackJackTableCardsOffset[play][num];
        let newCardPos = mp.game.object.getObjectOffsetFromCoords(tableCords.x, tableCords.y, tableCords.z, BlackJackTablesHeading[table], newCardOff.x, newCardOff.y, newCardOff.z);
        mp.game.invoke("0x239A3351AC1DA385", CardObjects[table][play][num].handle, newCardPos.x, newCardPos.y, newCardPos.z, false, false, true);
        let rotatet = (play == 4 && num == 1) ? new mp.Vector3(0, 180, BlackJackTablesHeading[table]) : new mp.Vector3(0, 0, BlackJackTablesHeading[table] + BlackJackTableCardsRotation[play][num]);

        CardObjects[table][play][num].setRotation(rotatet.x, rotatet.y, rotatet.z, 2, true);
    }, 1400);

});

mp.events.add('client__bj_flip_card', function (table) {
    CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "check_and_turn_card", 3.0, 1.0, -1, 2, 0, false, false, false);

    setTimeout(() => {
        if (CardObjects[table][4][1] != undefined)
            CardObjects[table][4][1].attachTo(CasinoPedsBJID[table].handle, CasinoPedsBJID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
    }, 500);
    setTimeout(() => {
        if (CardObjects[table][4][1] != undefined) {
            let pos = BlackJackTableCardsOffset[4][1];
            let tablePos = BlackJackTablesPos[table];
            let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, BlackJackTablesHeading[table], pos.x, pos.y, pos.z);
            CardObjects[table][4][1].detach(false, true);
            CardObjects[table][4][1].setCoordsNoOffset(newCardPos.x, newCardPos.y, newCardPos.z, false, false, true);
            let rot = new mp.Vector3(0, 0, BlackJackTablesHeading[table] + BlackJackTableCardsRotation[4][1]);
            CardObjects[table][4][1].setRotation(rot.x, rot.y, rot.z, 2, true);
        }
    }, 1650);

});

mp.events.add('client__bj_clean_cards', function (table, play) {
    if (play == 4)
        CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "retrieve_own_cards_and_remove", 3.0, 1.0, -1, 2, 0, false, false, false);
    else
        CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", `retrieve_cards_player_0${play + 1}`, 3.0, 1.0, -1, 2, 0, false, false, false);


    setTimeout(() => {
        if (CardObjects[table][play][0] != undefined || CardObjects[table][play][0] != null)
            CardObjects[table][play][0].attachTo(CasinoPedsBJID[table].handle, CasinoPedsBJID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
        for (let i = 1; i < CardObjects[table][play].length; i++) {
            if (CardObjects[table][play][i] != null || CardObjects[table][play][i] != undefined) {
                CardObjects[table][play][i].destroy();
                CardObjects[table][play][i] = null;
            }
        }

        for (let i = 0; i < betBlackjack[table].length; i++) {
            if (betBlackjack[table][i] != null)
                betBlackjack[table][i].destroy();
        }

        betBlackjack[table] = [];

    }, 500);

    setTimeout(() => {
        if (CardObjects[table][play][0] != undefined) {
            CardObjects[table][play][0].destroy();
            CardObjects[table][play][0] = null;
        }
    }, 1600);

});

mp.events.add('client__bj_stand_or_hit', function (table, seat) {
    CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", `dealer_focus_player_0${seat + 1}_idle`, 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('client__bj_loose_blackjack', function (table) {
    CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_bad", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('client__bj_request_card', function (player) {
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "request_card", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('client__bj_decline_card', function (player) {
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "decline_card_001", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('client__bj_exit_table', function (player) {
    if (player) {
        if (player == mp.players.local)
            canDoBets = false;

        player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2048, 0, false, false, false);
    }
});

mp.events.add('client__bj_win_blackjack', function (table) {
    CasinoPedsBJID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_good", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('client__bj_result_notification', function (player, dealer, playerAce = -1) {
    if (playerAce == -1)
        mp.game.graphics.notify('Du: ' + player + '~n~Dealer: ' + dealer);
    else
        mp.game.graphics.notify('Du: ' + player + " oder " + playerAce + '~n~(Ass kann 1 oder 11 sein)~n~~n~Dealer: ' + dealer);
});

mp.events.add('client__bj_not_enough_money_notification', function (player, dealer) {
    mp.game.graphics.notify('~r~Du hast zu wenig Geld um am Spiel teilzunehmen!');
});

mp.events.add('client__bj_win_notification', function (amount) {
    mp.game.graphics.notify('Du hast ~g~$ ' + amount.toLocaleString('de-DE') + ' ~w~gewonnen!');
});

mp.events.add('client__bj_draw_notification', function (amount) {
    mp.game.graphics.notify('Unentschieden. Du erhälst Deinen Einsatz von ~g~$ ' + amount.toLocaleString('de-DE') + ' ~w~zurück!');
});

mp.events.add('client__bj_loose_notification', function (amount) {
    mp.game.graphics.notify('Du hast ~r~$ ' + amount.toLocaleString('de-DE') + ' ~w~verloren!');
});

mp.events.add('client__bj_bet_blackjack', function (table, seat, player, chips) {
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "place_bet_small", 3.0, 1.0, -1, 2, 0, false, false, false);
    let tablePos = BlackJackTablesPos[table];
    let betOffset = BlackJackBetsOffset[seat];
    let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, BlackJackTablesHeading[table], betOffset.x, betOffset.y, betOffset.z);

    setTimeout(() => {
        let curIteration = 0;
        if (chips < 100) {
            if (chips >= 50) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_50dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));

                chips -= 50;
            }
            for (var i = 0; i < chips; i += 10) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_10dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));
            }
        } else if (chips >= 100) {
            let chips5k = Math.floor(chips / 5000);
            let chips1k = Math.floor(chips / 1000);
            let chips100 = Math.floor(chips / 100);
            let chips50 = chips - (chips100 * 100) - 50;
            let chips10 = chips - (chips100 * 100);

            if (chips1k > 0) {
                chips100 = Math.floor((chips - chips1k * 1000) / 100);
                chips50 = (chips - chips1k * 1000) - (chips100 * 100) - 50;
                chips10 = (chips - chips1k * 1000) - (chips100 * 100);

                if (chips5k > 0) {
                    for (var i = 0; i < chips5k; i++) {
                        betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_5kdollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                            {
                                rotation: new mp.Vector3(0, 0, 0),
                                alpha: 255,
                                dimension: 0,
                            }));
                    }
                }

                for (var i = 0; i < chips1k - (chips5k > 0 ? chips5k * 5 : 0); i++) {
                    betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_1kdollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                        {
                            rotation: new mp.Vector3(0, 0, 0),
                            alpha: 255,
                            dimension: 0,
                        }));
                }

            } else {
                chips100 = Math.floor(chips / 100);
                chips50 = chips - (chips100 * 100) - 50;
                chips10 = chips - (chips100 * 100);
            }

            if ((chips1k > 0 ? chips - chips1k * 1000 : chips) >= 500) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_500dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));

                chips100 -= 5;
            }

            for (var i = 0; i < chips100; i++) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_100dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));
            }

            if (chips50 >= 0) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_50dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));

                chips10 -= 50;
            }

            for (var i = 0; i < chips10; i += 10) {
                betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_10dollar_x1`), new mp.Vector3(newCardPos.x + getRandomFloat(-0.005, 0.005, 4), newCardPos.y + getRandomFloat(-0.005, 0.005, 4), newCardPos.z + (curIteration++ * 0.007)),
                    {
                        rotation: new mp.Vector3(0, 0, 0),
                        alpha: 255,
                        dimension: 0,
                    }));
            }
        }
    }, 500);
});

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

mp.events.add('client__bj_seat_to_blackjack_table', async function (table, seat, player) {
    let boneIndex = BlackJackTables[table].getBoneIndexByName(BlackJackSeats[seat]);
    const bonePos = BlackJackTables[table].getWorldPositionOfBone(boneIndex);
    let boneRot = mp.game.invokeVector3("0xCE6294A232D03786", BlackJackTables[table].handle, boneIndex);
    let animPos = mp.game.ped.getAnimInitialOffsetPosition("anim_casino_b@amb@casino@games@shared@player@", getAnimSeat(seat), bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);
    let animRot = mp.game.ped.getAnimInitialOffsetRotation("anim_casino_b@amb@casino@games@shared@player@", getAnimSeat(seat), bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);

    player.taskGoStraightToCoord(animPos.x, animPos.y, animPos.z, 1.0, 5000, animRot.z, 0.01);

    while (!(player.getScriptTaskStatus(2106541073) == 7 || player.isAtCoord(animPos.x, animPos.y, animPos.z, 0.1, 0.0, 0.0, false, true, 0))) {
        await mp.game.waitAsync(0);
    }
    player.position = new mp.Vector3(animPos.x, animPos.y, animPos.z);
    player.setRotation(0, 0, BlackJackTablesSeatsHeading[table][seat], 1, false);
    player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", getAnimSeat(seat), 3.0, 1.0, -1, 2050, 0, false, false, false);

    if (player === mp.players.local) {
        //@BitDEVil2K16: Please disable cell phone + cancel animation controls here
        canDoBets = true;
        mp.players.local.casino = true;
        mp.players.local.freezePosition(true);
    }
});

function getAnimSeat(seatid) {
    if (seatid == 0)
        return "sit_enter_left";
    else if (seatid == 1)
        return "sit_enter_left_side";
    else if (seatid == 2)
        return "sit_enter_right_side";
    else if (seatid == 3)
        return "sit_enter_right";
}

async function betUp() {
    if (mp.keys.isDown(0x6B)) {
        mp.events.callRemote('server__blackJackBetUp');
        await mp.game.waitAsync(100);
        betUp();
    }
};

async function betDown() {
    if (mp.keys.isDown(0x6D)) {
        mp.events.callRemote('server__blackJackBetDown');
        await mp.game.waitAsync(100);
        betDown();
    }
};

mp.keys.bind(0x6B, true, async function () { // VK_ADD
    if (canDoBets && !inGame) {
        mp.events.callRemote('server__blackJackBetUp');
        await mp.game.waitAsync(300);
        betUp();
    }
});

mp.keys.bind(0x6D, true, async function () { // VK_SUBTRACT
    if (canDoBets && !inGame) {
        mp.events.callRemote('server__blackJackBetDown');
        await mp.game.waitAsync(300);
        betDown();
    }
});

let canSet = true;
mp.keys.bind(0x0D, false, async function () { // ENTER
    if (canDoBets && canSet) {
        mp.events.callRemote('server__blackJackSetBet');
        canSet = false;
        await mp.game.waitAsync(1500);
        canSet = true;
    }
});

let canHit = true;
mp.keys.bind(0x20, false, async function () { // SPACE
    if (canDoBets && canHit) {
        mp.events.callRemote('server__blackJackHit');
        canHit = false;
        await mp.game.waitAsync(1500);
        canHit = true;
    }
});

let canSeat = true;
mp.keys.bind(0x45, false, async function () { // E
    if (canSeat) {
        mp.events.callRemote('server__bj_tryPlayerSeat');
        canSeat = false;
        await mp.game.waitAsync(1500);
        canSeat = true;
    }
});
}