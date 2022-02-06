{
let betBlackjack = [
    [],
    [],
    [],
    []
];

let betRoulette = [
    [],
    []
];

let canDoBets = false;
let betObject = null;

var CasinoPedss = [
    {Hash: 0xBC92BED5, Pos: new mp.Vector3(1149.391, 269.1934, -51.8409), Angle: 47.5},
    {Hash: 0xBC92BED5, Pos: new mp.Vector3(1151.28,267.33,-51.840), Angle: 222.2},
    {Hash: 0xBC92BED5, Pos: new mp.Vector3(1128.853, 261.8036, -51.041), Angle: 314.2},
    {Hash: 0xBC92BED5, Pos: new mp.Vector3(1143.875, 246.781, -51.041), Angle: 317.2},
    //{Hash: 0x1422D45B, Pos: new mp.Vector3(1145.337, 267.7967, -51.8409), Angle: 47.5},
    //{Hash: 0x1422D45B, Pos: new mp.Vector3(1149.791, 263.1628, -51.8409), Angle: 222.2},
    // ИДИ НАХУЙ ХУЕСОС
];

var CasinoPedssID = [];

var cardNum = 0;
var CardObjects = [

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
    new mp.Vector3(1148.837, 269.747, -52.8409),
    new mp.Vector3(1151.84, 266.747, -52.8409),
    new mp.Vector3(1129.406, 262.3578, -52.041),
    new mp.Vector3(1144.429, 247.3352, -52.041),
];


mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@blackjack@dealer");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@blackjack@player");



setTimeout(function () {
    

    let n = 0;

    for(let tb = 0; tb < 4; tb++){
        BlackJackTables[tb] = mp.objects.new(s_propName, new mp.Vector3( BlackJackTablesPos[tb].x, BlackJackTablesPos[tb].y, BlackJackTablesPos[tb].z), {
            rotation: new mp.Vector3(0, 0, BlackJackTablesHeading[tb]),
            alpha: 255,
            dimension: 0
        });  
    }

    CasinoPedss.forEach(ped => {
        CasinoPedssID[n] = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        CasinoPedssID[n].setComponentVariation(0, 2, 1, 0);
        CasinoPedssID[n].setComponentVariation(1, 1, 0, 0);
        CasinoPedssID[n].setComponentVariation(2, 2, 0, 0);
        CasinoPedssID[n].setComponentVariation(3, 0, n + 2, 0);
        CasinoPedssID[n].setComponentVariation(4, 0, 0, 0);
        CasinoPedssID[n].setComponentVariation(6, 1, 0, 0);
        CasinoPedssID[n].setComponentVariation(7, 2, 0, 0);
        CasinoPedssID[n].setComponentVariation(8, 1, 0, 0);
        CasinoPedssID[n].setComponentVariation(10, 1, 0, 0);
        CasinoPedssID[n].setComponentVariation(11, 1, 0, 0);
        CasinoPedssID[n].setConfigFlag(185, true);
        CasinoPedssID[n].setConfigFlag(108, true);
        CasinoPedssID[n].setConfigFlag(208, true);
        CasinoPedssID[n].taskPlayAnim("anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
        n = n + 1;
        //CasinoPedssID[0].playFacialAnim("idle_facial", "anim_casino_b@amb@casino@games@shared@dealer@");
        //mp.game.invoke("0xEA47FE3719165B94", CasinoPedssID[0].handle, "anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
    })
    
}, 10000);

const BlackJackTableCardsRotation = [
    [ 69.12, 67.8, 66.6, 70.44, 70.84, 67.88, 69.56],
    [ 22.11, 22.32, 20.8, 19.8, 19.44, 26.28, 22.68],
    [ -21.43, -20.16, -16.92, -23.4, -21.24, -23.76, -19.44],
    [-67.03, -69.12, -64.44, -67.68, -63.72, -68.4, -64.44],
    [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

const BlakcJackBetsOffset = [
    new mp.Vector3(0.712625, 0.170625, 0.95),
    new mp.Vector3(0.278125, -0.2571, 0.95),
    new mp.Vector3(-0.30305, -0.2464, 0.95),
    new mp.Vector3(-0.72855, 0.17345, 0.95)
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
        new mp.Vector3( -0.0436, 0.21205, 0.948875),
        new mp.Vector3( 0.0356, 0.2105, 0.94885),
        new mp.Vector3( -0.0806, 0.2137, 0.950225),
        new mp.Vector3(-0.1006, 0.21125, 0.950875),
        new mp.Vector3( 0.3962,0.253,0.950025),
        new mp.Vector3( 0.5185,0.253,0.950025),
        
    ]
];
const BlackJackTablesHeading = [
    -134.69,
    45.31,
    135.31,
    135.31,
];

const BlackJackTablesSeatsHeading = [
    [290.5,245.5,200.5,150.5],
    [110.5,65.5,20.5, 330.5],
    [200.5,155.5,110.5, 415.5],
    [216.5,161.5,116.5, 66.5],
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



mp.events.add('client_bj_give_card', function( table, play, num, card){
    mp.game.streaming.requestModel(mp.game.joaat(`${CasinoCards[card]}`));

    let animName = `deal_card_player_0${play + 1}`;
    let cardOff = new mp.Vector3(0.526, 0.571, 0.963);
    let tableCords = BlackJackTablesPos[table];

    CardObjects[table][play][num] = mp.objects.new(mp.game.joaat(`${CasinoCards[card]}`), new mp.Vector3(tableCords.x, tableCords.y, tableCords.z),
    {
        rotation: new mp.Vector3(0,0,0),
        alpha: 255,
        dimension: 0,
    });

    setTimeout(() => {

        let cardPos = mp.game.object.getObjectOffsetFromCoords(tableCords.x, tableCords.y, tableCords.z, BlackJackTablesHeading[table], cardOff.x, cardOff.y, cardOff.z);

        
        CardObjects[table][play][num].setVisible(false, false);
        CardObjects[table][play][num].position = cardPos;
        CardObjects[table][play][num].setCoordsNoOffset(cardPos.x, cardPos.y, cardPos.z, false, false ,true);
        let rotat = new mp.Vector3(BlackJackTablesHeading[table], 164.52, 11.5);
        CardObjects[table][play][num].setRotation(rotat.x, rotat.y, rotat.z, 2, true);
        mp.game.invoke("0xE532F5D78798DAAB", mp.game.joaat(`${CasinoCards[card]}`));
        CardObjects[table][play][num].attachTo(CasinoPedssID[table].handle, CasinoPedssID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
        
        if(play == 4){
            if(num == 0){
                animName = "deal_card_self_second_card";
            }
            else if(num == 1){
                animName = "deal_card_self";
            }
            else{
                animName = "deal_card_self_card_06";
            }
        }

        CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", animName, 3.0, 1.0, -1, 2, 0, false, false, false);
    }, 150);

    
    //mp.game.invoke("0x6B9BBD38AB0796DF", CardObjects[cardNum].handle, CasinoPedssID[0].handle, CasinoPedssID[0].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);

  

    setTimeout(() => { CardObjects[table][play][num].setVisible(true, false);
    }, 300);
    setTimeout(() => {
        CardObjects[table][play][num].detach(false, true);
       

        let newCardOff = BlackJackTableCardsOffset[play][num];
        let newCardPos = mp.game.object.getObjectOffsetFromCoords(tableCords.x, tableCords.y, tableCords.z, BlackJackTablesHeading[table], newCardOff.x, newCardOff.y, newCardOff.z);
        mp.game.invoke("0x239A3351AC1DA385", CardObjects[table][play][num].handle, newCardPos.x, newCardPos.y, newCardPos.z, false, false, true);
        //CardObjects[cardNum].position = newCardPos;
        let rotatet = (play == 4 && num == 1) ? new mp.Vector3(0,180, BlackJackTablesHeading[table]) : new mp.Vector3(0, 0, BlackJackTablesHeading[table] + BlackJackTableCardsRotation[play][num]);

        CardObjects[table][play][num].setRotation(rotatet.x, rotatet.y, rotatet.z, 2, true);

        //mp.events.callRemote("end_give", table + 1, play);
    }, 1400);

});



mp.events.add('flip_card', function( table){
    CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "check_and_turn_card", 3.0, 1.0, -1, 2, 0, false, false, false);

    setTimeout(() => {
    if(CardObjects[table][4][1] != undefined)
        CardObjects[table][4][1].attachTo(CasinoPedssID[table].handle, CasinoPedssID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
}, 500);
    setTimeout(() => {
        if(CardObjects[table][4][1] != undefined){
        let pos = BlackJackTableCardsOffset[4][1];
        let tablePos  = BlackJackTablesPos[table];
        let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, BlackJackTablesHeading[table], pos.x, pos.y, pos.z);
        CardObjects[table][4][1].detach(false, true);
        CardObjects[table][4][1].setCoordsNoOffset(newCardPos.x, newCardPos.y, newCardPos.z, false, false ,true);
        let rot = new mp.Vector3(0, 0, BlackJackTablesHeading[table] + BlackJackTableCardsRotation[4][1]);
        CardObjects[table][4][1].setRotation(rot.x, rot.y, rot.z, 2, true);
        }
    }, 1650);

});

mp.events.add('clean_cards', function( table, play){
    if(play == 4)
        CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer","retrieve_own_cards_and_remove", 3.0, 1.0, -1, 2, 0, false, false, false);
    else
        CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer",`retrieve_cards_player_0${play + 1}`, 3.0, 1.0, -1, 2, 0, false, false, false);

   
    setTimeout(() => {
    if(CardObjects[table][play][0] != undefined || CardObjects[table][play][0] != null)
        CardObjects[table][play][0].attachTo(CasinoPedssID[table].handle, CasinoPedssID[table].getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
    for(let i = 1; i < CardObjects[table][play].length; i++){
        if( CardObjects[table][play][i] != null ||  CardObjects[table][play][i] != undefined){
            CardObjects[table][play][i].destroy();
            CardObjects[table][play][i] = null;
        }
    }

    for(let i = 0; i < betBlackjack[table].length; i++)
    {
        if(betBlackjack[table][i] != null)
            betBlackjack[table][i].destroy();
    }

    betBlackjack[table] = [];

    }, 500);

    setTimeout(() => {
        if(CardObjects[table][play][0] != undefined){
        CardObjects[table][play][0].destroy();
        CardObjects[table][play][0] = null;
        }
    }, 1600);

});




mp.events.add('stand_or_hit', function(table, seat){
    CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer",`dealer_focus_player_0${seat + 1}_idle`, 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('lose_blackjack', function(table){
    CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_bad", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('push_blackjack', function(table){
    CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_impartial", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('request_card', function(player){
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "request_card", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('decline_card', function(player){
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "decline_card_001", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('exit_table', function(player){
    canDoBets = false;
    player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2, 0, false, false, false);
});

mp.events.add('win_blackjack', function(table){
    CasinoPedssID[table].taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_good", 3.0, 1.0, -1, 2, 0, false, false, false);
});

mp.events.add('bet_blackjack', function(table, seat, player){
    player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "place_bet_small", 3.0, 1.0, -1, 2, 0, false, false, false);
    let tablePos = BlackJackTablesPos[table];
    let betOffset = BlakcJackBetsOffset[seat]; 
    let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, BlackJackTablesHeading[table], betOffset.x, betOffset.y, betOffset.z);
    setTimeout(() => {
        betBlackjack[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_100dollar_x1`), new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z),
        {
            rotation: new mp.Vector3(0,0,0),
            alpha: 255,
            dimension: 0,
        }));

      
    }, 500);
});

mp.events.add('seat_to_blackjack_table', function(table, seat, player){
    try{
    canDoBets = true;
    //mp.events.call('notify', 4, 9, `${tempObj}`, 10000);
    var boneIndex = BlackJackTables[table].getBoneIndexByName(BlackJackSeats[seat]);

    const bonePos = BlackJackTables[table].getWorldPositionOfBone(boneIndex);
    let boneRot = mp.game.invoke("0xCE6294A232D03786", BlackJackTables[table].handle, boneIndex);
    
    var animPos = mp.game.ped.getAnimInitialOffsetPosition("anim_casino_b@amb@casino@games@shared@player@", getAnimSeat(seat), bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);
    var animRot = mp.game.ped.getAnimInitialOffsetRotation("anim_casino_b@amb@casino@games@shared@player@", getAnimSeat(seat), bonePos.x, bonePos.y, bonePos.z, boneRot.x, boneRot.y, boneRot.z, 0.01, 2);
    

    //mp.events.call('notify', 4, 9, `Bonepos: ${bonePos}  Boneindex: ${boneRot} Animpos: ${animPos.x}`, 10000);
    player.taskGoStraightToCoord(animPos.x, animPos.y, animPos.z, 1.0, 5000, animRot.z, 0.01);
    /*var currentPed = mp.game.invoke("0xD80958FC74E988A6");
    var scene = mp.game.invoke("0x7CD6BC4C2BBDD526", animPos.x, animPos.y, animPos.z, 0, 0, BlackJackTablesSeatsHeading[seat], 2, true, false, 1065353216, 0, 1065353216);
    mp.game.invoke("0x742A637471BCECD9", currentPed.handle, scene, "anim_casino_b@amb@casino@games@shared@player@", "sit_enter_left", 2.0, -2.0, 13, 16, 2.0, 0);
    mp.game.invoke("0x9A1B3FCDB36C8697", scene);
    //mp.events.call('notify', 4, 9, `Bonepos: ${scene}`, 10000);
    mp.game.invoke("0x79C0E43EB9B944E2", -2124244681);*/

        /*var scenes = mp.game.invoke("0x7CD6BC4C2BBDD526",  bonePos.x, bonePos.y, bonePos.z, 0, 0, BlackJackTablesSeatsHeading[seat], 2, true, true, 1065353216, 0, 1065353216);
        mp.game.invoke("0x742A637471BCECD9", currentPed, scenes, "anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 2.0, -2.0, 13, 16, 1148846080, 0);
        mp.game.invoke("0x9A1B3FCDB36C8697", scenes);*/
        //mp.events.call('notify', 4, 9, `Bonepos: ${scenes}`, 10000);
    player.position = new mp.Vector3( bonePos.x, bonePos.y, bonePos.z);
    player.setRotation(0, 0, BlackJackTablesSeatsHeading[table][seat], 1 ,false);
    player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
    }catch{}

});

function getAnimSeat(seatid){
    if(seatid == 0)
        return "sit_enter_left";
    else if(seatid == 1)
        return "sit_enter_left_side";
    else if(seatid == 2)
        return "sit_enter_right_side";
    else if(seatid == 3)
        return "sit_enter_right";
}

mp.peds.newLegacy = (hash, position, heading, dimension) => {
    let ped = mp.peds.new(hash, position, heading, dimension);
    ped.streamInHandler = true;
    ped.streamOutHandler = true;
    return ped;
};

mp.events.add('GET_OBJECT_OFFSET_FROM_CORD', function (x, y, z, heading, ox, oy, oz) {
    //let num1, num2, num3;
    var retval = mp.game.object.getObjectOffsetFromCoords(x, y, z, heading, ox, oy, oz);
    mp.events.call('notify', 4, 9, `${retval}`, 10000);
    mp.events.callRemote("otvet", retval.x, retval.y, retval.z);
});



mp.keys.bind(Keys.VK_RIGHT, false, function () { // стрелка вправа
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 400) return;
    if(canDoBets){
        mp.events.callRemote('blackJackBetUp');
    }
});
mp.keys.bind(Keys.VK_LEFT, false, function () { // стрелка влево
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 400) return;
    if(canDoBets){
        mp.events.callRemote('blackJackBetDown');
    }
});

mp.keys.bind(Keys.VK_RETURN, false, function () { // стрелка вверх
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 400) return;
    if(canDoBets){
        mp.events.callRemote('blackJackSetBet');
    }
});

mp.keys.bind(Keys.VK_SPACE, false, function () { // стрелка вверх
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 400) return;
    if(canDoBets){
        mp.events.callRemote('blackJackHit');
    }
});

}藉ǜ