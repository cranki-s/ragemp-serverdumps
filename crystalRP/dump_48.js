{

var screenTarget = null;
var bigScreenScaleform = null;
var bigScreenRender = null;
let isBigScreenLoaded = false;

var scaleform = null;
var startLoading = false;
var registerTarg = false;
var waitTarget = false;

let insideTrackActive = false;

let tick = 0;
let cooldown = 60;
let clicked = -1;
let selectedGame = -1;

var startRace = false;

let screenPos = new mp.Vector3(1092.75, 264.56, -51.24);
let currentHorse = 1;
let currentBet = 100;
let currentGain = 200;
let finishReady = false;

let isBet = false;
let isSeating = false;
let winnerBet = -1;
let winner = -1;
let bet = 0;

let balance = 0;

let singleHorses = [1, 2, 3, 4, 5, 6];

var horses = null;
var videoWallTarget = null;

const NATIVES = {
   REGISTER_NAMED_RENDERTARGET : "0x57D9C12635E25CE3",
   LINK_NAMED_RENDERTARGET : "0xF6C09E276AEB3F2D",
   GET_NAMED_RENDERTARGET_RENDER_ID : "0x1A6478B61C6BDC3B",
   IS_NAMED_RENDERTARGET_REGISTERED : "0x78DCDC15C9F116B4",
   REQUEST_SCALEFORM_MOVIE : "0x11FE353CF9733E6F",
   BEGIN_SCALEFORM_MOVIE_METHOD : "0xF6E48914C7A8694E",
   SCALEFORM_MOVIE_METHOD_ADD_PARAM_INT : "0xC3D0841A0CC546A6",
   END_SCALEFORM_MOVIE_METHOD : "0xC6796A8FFA375E53",
   _SET_SCALEFORM_FIT_RENDERTARGET : "0xE6A9F00D4240B519",
   SET_TEXT_RENDER_ID : "0x5F15302936E07111",
   SET_SCRIPT_GFX_DRAW_ORDER : "0x61BB1D9B3A95D802",
   SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU : "0xC6372ECD45D73BCD",
   DRAW_SCALEFORM_MOVIE_FULLSCREEN : "0x0DF606929C105BE1",
   GET_DEFAULT_SCRIPT_RENDERTARGET_RENDER_ID : "0x52F0982D7FD156B6",
   RELEASE_NAMED_RENDERTARGET : "0xE9F6FFE837354DD4",
   SET_SCALEFORM_MOVIE_AS_NO_LONGER_NEEDED : "0x1D132D614DD86811",
   BEGIN_TEXT_COMMAND_SCALEFORM_STRING : "0x80338406F3475E55",
   END_TEXT_COMMAND_SCALEFORM_STRING : "0x362E2D3FE93A9959",
   SCALEFORM_MOVIE_METHOD_ADD_PARAM_PLAYER_NAME_STRING : "0xE83A3E3557A56640",
   SCALEFORM_MOVIE_METHOD_ADD_PARAM_FLOAT : "0xD69736AAE04DB51A",
   SCALEFORM_MOVIE_METHOD_ADD_PARAM_BOOL : "0xC58424BA936EB458",
   CALL_SCALEFORM_MOVIE_METHOD_WITH_NUMBER : "0xD0837058AE2E4BEE",
   END_SCALEFORM_MOVIE_METHOD_RETURN_VALUE : "0xC50AA39A577AF886",
   GET_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_INT : "0x2DE7EFA66B906036",
   IS_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_READY : "0x768FF8961BA904D6",
   GET_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_BOOL : "0xD80A80346A45D761",
}

const HORSE_STYLES = [
   [15553363,5474797,9858144,4671302],
    [16724530,3684408,14807026,16777215],
    [13560920,15582764,16770746,7500402],
    [16558591,5090807,10446437,7493977],
    [5090807,16558591,3815994,9393493],
    [16269415,16767010,10329501,16777215],
    [2263807,16777215,9086907,3815994],
    [4879871,16715535,3815994,16777215],
    [16777215,2263807,16769737,15197642],
]

function RegisterTarget(name, model){
   try {
      mp.game.audio.stopSound(0);

   registerTarg = false;

   if(!mp.game.ui.isNamedRendertargetRegistered(name)){
      mp.game.ui.registerNamedRendertarget(name, false);
      mp.game.ui.linkNamedRendertarget(mp.game.joaat(model));

   }


   const timer = setInterval(() => {
      if(mp.game.ui.isNamedRendertargetRegistered(name) && mp.game.ui.isNamedRendertargetLinked(mp.game.joaat(model))){
         screenTarget = mp.game.ui.getNamedRendertargetRenderId(name);
         registerTarg = true;
         clearInterval(timer);
      }
   }, 100);

}
catch(e){
   mp.gui.chat.push(`register ${e.toString()}`)
}
  
}

function RegisterTargetNull(name){
   if(!mp.game.ui.isNamedRendertargetRegistered(name)){
      mp.game.ui.registerNamedRendertarget(name, false);
      mp.game.ui.linkNamedRendertarget(903186242);

   }

   return mp.game.ui.getNamedRendertargetRenderId(name);
}


function LoadBigScreen(){
try {

   mp.game.invoke(NATIVES.RELEASE_NAMED_RENDERTARGET, "casinoscreen_02");

   mp.game.invoke(NATIVES.SET_SCALEFORM_MOVIE_AS_NO_LONGER_NEEDED, bigScreenScaleform);

   mp.game.audio.requestScriptAudioBank('DLC_VINEWOOD/CASINO_GENERAL', true);
   mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@insidetrack@ped_male@engaged@01a@base_big_screen");

   startLoading = true;
   bigScreenScaleform = mp.game.graphics.requestScaleformMovie('HORSE_RACING_WALL');

   RegisterTarget("casinoscreen_02", `vw_vwint01_betting_screen`);

   const tm = setInterval(() => {
      if(registerTarg){
         registerTarg = false;
         waitTarget = true;
         clearInterval(tm);
      } 
   }, 100);

      const timer = setInterval(() => {
      

         if(mp.game.graphics.hasScaleformMovieLoaded(bigScreenScaleform) && waitTarget){
            mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'SHOW_SCREEN');
      
            mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
            
            mp.game.graphics.popScaleformMovieFunctionVoid();
            
            mp.game.invoke(NATIVES._SET_SCALEFORM_FIT_RENDERTARGET, bigScreenScaleform, true);
               
            isBigScreenLoaded = true;
            
         startLoading = false;
         waitTarget = false;

         clearInterval(timer);
         }
      }, 100);
}
catch(e){
   mp.gui.chat.push(`load ${e.toString()}`)
}


}

mp.events.add('seatAtComp', (player, x, y, z) => {
   player.position = new mp.Vector3(x, y, z);
   player.taskPlayAnim("anim_casino_a@amb@casino@games@insidetrack@ped_male@engaged@01a@base_big_screen","base_big_screen", 8.0, 1.0, -1, 69, 1.0, false, false, false);

   player.setHeading(45);   

   if(player == mp.players.local){
      isSeating = true;
   }
});

mp.events.add('exitComp', function(player){
   if(player == mp.players.local){
      isSeating = false;
   }
   canDoBets = false;
   player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2, 0, false, false, false);
});

mp.events.add('setMainEvent', (toggle) => {
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_MAIN_EVENT_IN_PROGRESS');
         mp.game.graphics.pushScaleformMovieFunctionParameterBool(parseBool(toggle));
         mp.game.graphics.popScaleformMovieFunctionVoid();
});

mp.events.add('updateBalance', (count) => {
   balance = count;
});

mp.events.add('setHorses', (data) => {
   if(!isBigScreenLoaded){
      const timer = setInterval(() => {
         if(isBigScreenLoaded){
            horses = JSON.parse(data);
            AddHorsesMp(horses, bigScreenScaleform);
            clearInterval(timer);
            return;
         }
      }, 100);
   }

   AddHorsesMp(JSON.parse(data), bigScreenScaleform);
});


mp.events.add('updateCountdown', (count) => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;

      if(insideTrackActive){
         mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_MAIN_EVENT_IN_PROGRESS');
         mp.game.graphics.pushScaleformMovieFunctionParameterBool(false);
         mp.game.graphics.popScaleformMovieFunctionVoid();

         mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_COUNTDOWN');

      }
      else {
         mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'SET_COUNTDOWN');
      }

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(count);
   mp.game.graphics.popScaleformMovieFunctionVoid();
});

mp.events.add('showHorse', (num) => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;

   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'SHOW_SCREEN');

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(1);

   mp.game.graphics.popScaleformMovieFunctionVoid();

   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'SET_DETAIL_HORSE');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(num);

   mp.game.graphics.popScaleformMovieFunctionVoid();
});

mp.events.add('showMain', () => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;

   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'SHOW_SCREEN');

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);

   mp.game.graphics.popScaleformMovieFunctionVoid();

});

mp.events.add('setbet', (toggle) => {

   isBet = toggle;

   if(isBet){
      HideInsideTrack();
   }
 });

mp.events.add('addBet', (name, horse, bet) => {
  AddBet(name, horse, bet);

});

function AddBet(name, horse, bet){
   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'ADD_PLAYER');

   mp.game.graphics.pushScaleformMovieFunctionParameterString(`${name}`);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(horse);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(bet);

   mp.game.graphics.popScaleformMovieFunctionVoid();
}

mp.events.add('startRace', (horses) => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;
   StartRaceMain(horses, 0.0);

   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_MAIN_EVENT_IN_PROGRESS');
   mp.game.graphics.pushScaleformMovieFunctionParameterBool(true);
   mp.game.graphics.popScaleformMovieFunctionVoid();
});

mp.events.add('showRace', (horses, offset) => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;
   StartRaceMain(horses, parseFloat(offset));

   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_MAIN_EVENT_IN_PROGRESS');
   mp.game.graphics.pushScaleformMovieFunctionParameterBool(true);
   mp.game.graphics.popScaleformMovieFunctionVoid();
});

mp.events.add('startSingleRace', () => {
   StartRace(scaleform);
});

mp.events.add('addBetsInside', (bets) => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;

   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'CLEAR_ALL_PLAYERS');
   mp.game.graphics.popScaleformMovieFunctionVoid();

   var arr = JSON.parse(bets);
   arr.forEach(t => {
      AddBet(t.Name, parseInt(t.Horse), parseInt(t.BetSize));
   });
});


mp.events.add('clearPlayers', () => {
   if(startLoading || (!isBigScreenLoaded && !insideTrackActive))
      return;
   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'CLEAR_ALL_PLAYERS');
   mp.game.graphics.popScaleformMovieFunctionVoid();

   mp.game.audio.stopSound(0);
});


mp.events.add('render', () => {


   if(videoWallTarget != null){
      mp.game.ui.setTextRenderId(videoWallTarget);

      mp.game.invoke(NATIVES.SET_SCRIPT_GFX_DRAW_ORDER, 4);

      mp.game.invoke(NATIVES.SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU, true);

      mp.game.graphics.drawSprite('Prop_Screen_Vinewood', 'BG_Wall_Colour_4x4', 0.25, 0.5, 0.5, 1.0, 0.0, 255, 255, 255, 255);

      mp.game.graphics.drawTvChannel(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255);

      mp.game.ui.setTextRenderId(1);
   }

   let playerPos = mp.players.local.position;

   let distance = mp.game.gameplay.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, screenPos.x, screenPos.y, screenPos.z, false);

   if(distance < 30.0 && !insideTrackActive){

      if(!isBigScreenLoaded && !startLoading){
         LoadBigScreen();
      }

      if(!bigScreenRender){
         bigScreenRender = true;
      }

      if(!waitTarget && isBigScreenLoaded){

      mp.game.ui.setTextRenderId(screenTarget);

      mp.game.invoke(NATIVES.SET_SCRIPT_GFX_DRAW_ORDER, 4);

      mp.game.invoke(NATIVES.SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU, true);

     
     // mp.game.graphics.drawScaleformMovieFullscreen(bigScreenScaleform, 255, 255, 255, 255, true);

      mp.game.graphics.drawScaleformMovie(bigScreenScaleform, 0.5, 0.5, 0.999, 0.999, 255, 255, 255, 255, 0);

      let nm = mp.game.invoke(NATIVES.GET_DEFAULT_SCRIPT_RENDERTARGET_RENDER_ID);

      mp.game.ui.setTextRenderId(1);
      }

   }
   else if(bigScreenRender && isBigScreenLoaded){
      bigScreenRender = false;
      isBigScreenLoaded = false;

      mp.game.invoke(NATIVES.RELEASE_NAMED_RENDERTARGET, "casinoscreen_02");

      mp.game.invoke(NATIVES.SET_SCALEFORM_MOVIE_AS_NO_LONGER_NEEDED, bigScreenScaleform);

      mp.game.audio.stopSound(0);
   }

   UIRender();

});

function HideInsideTrack(){
   mp.events.callRemote("hideInsideTrack");

   insideTrackActive = false;

   mp.game.ui.displayHud(true);

   mp.events.call('showHUD', true);

   mp.game.invoke(NATIVES.SET_SCALEFORM_MOVIE_AS_NO_LONGER_NEEDED, scaleform);

}

mp.keys.bind(0x20, false, function () { // backspace key
   if(insideTrackActive && isSeating){
      
         HideInsideTrack();
   }
   else {
      if(isBigScreenLoaded && !insideTrackActive && isSeating){
         OpenInsideTrack();
      }
   }
});

 function UIRender() {
   if(insideTrackActive){
      let x = mp.game.controls.getDisabledControlNormal(2, 239);
      let y = mp.game.controls.getDisabledControlNormal(2, 240);

      mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_MOUSE_INPUT');

      mp.game.graphics.pushScaleformMovieFunctionParameterFloat(x);
      mp.game.graphics.pushScaleformMovieFunctionParameterFloat(y);
   
      mp.game.graphics.popScaleformMovieFunctionVoid();

      mp.game.graphics.drawScaleformMovieFullscreen(scaleform, 255, 255, 255, 255, true);



      if(mp.game.controls.isControlJustPressed(2, 237)){
         GetMouseClickedButton();
      }
     
      if(clicked != -1){
         if(clicked == 15){
            ShowRules();
         }
         else if(clicked == 12){
            ShowMainScreen();
         }
         else if(clicked == 10){
            if(selectedGame == 2){
               winnerBet = currentHorse;
               bet = currentBet;

               mp.events.callRemote("trySingleBet", currentBet);
             
            }
            else {
               mp.events.callRemote("addbet", currentHorse, currentBet);

               //AddBet("mahorazb", currentHorse, 100);
            }
         }
         else if(clicked == 13){
            ShowMainScreen();
         }
         else if(clicked == 14){
            ShowHorseSelectionMp();
            selectedGame = 1;
         }
       
         else if(clicked == 8){
            if(balance < currentBet + 100){
               return;
            }

            if(currentBet + 100 > 10000){
               return;
            }
            currentBet = currentBet + 100;
            currentGain = currentBet * 2;
            UpdateBetValues(currentHorse, currentBet, balance, currentGain);
         }
         else if(clicked == 9){
            if(99 > currentBet - 100){
               return;
            }
            currentBet = currentBet - 100;
            currentGain = currentBet * 2;
            UpdateBetValues(currentHorse, currentBet, balance, currentGain);
         }
         else if(clicked == 1){
            selectedGame = 2;
            ShowHorseSelection();
         }
         else if(clicked != 12 && clicked != -1){
            currentHorse = (clicked - 1);
            if(selectedGame == 2){
               ShowBetScreen();
            }
            else {
               ShowBetScreenMp();
            }
         }
         clicked = -1;
      }

      if(startRace){
         IsRaceFinished();

         if(finishReady){
            finishReady = false;
            startRace = false;

            if(winner == winnerBet){
               mp.events.callRemote("winnerBet", currentBet);
            }

            ShowResults(scaleform);
         }
      }
   }
}

function ShowRules(){
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(9);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function ShowMainScreen(){
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
   mp.game.graphics.popScaleformMovieFunctionVoid();

}

function ShowHorseSelection(){
   
   AddHorses(scaleform);

   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(1);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function ShowHorseSelectionMp(){

   if(horses != null)
      AddHorsesMp(horses, scaleform);

   if(isBet){
      UpdateBetValues(currentHorse, currentBet, balance, currentGain);

      mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_BETTING_ENABLED');
      mp.game.graphics.pushScaleformMovieFunctionParameterBool(false);
      mp.game.graphics.popScaleformMovieFunctionVoid();

      mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(4);
      mp.game.graphics.popScaleformMovieFunctionVoid();

      
    
   }
   else {
      UpdateBetValues(currentHorse, currentBet, balance, currentGain);

      mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(2);
      mp.game.graphics.popScaleformMovieFunctionVoid();

      mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_BETTING_ENABLED');
      mp.game.graphics.pushScaleformMovieFunctionParameterBool(true);
      mp.game.graphics.popScaleformMovieFunctionVoid();

    
   }
}

function ShowResults(sc){
   mp.game.audio.stopSound(0);

   mp.game.graphics.pushScaleformMovieFunction(sc, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(7);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function IsRaceFinished(){
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'GET_RACE_IS_COMPLETE');

   var returnValue = mp.game.invoke(NATIVES.END_SCALEFORM_MOVIE_METHOD_RETURN_VALUE);

   const timer = setInterval(() => {
      if(mp.game.invoke(NATIVES.IS_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_READY, returnValue)){
         if(startRace){
         finishReady = mp.game.invoke(NATIVES.GET_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_BOOL, returnValue);
         }
         else {
            finishReady = false;
         }
         clearInterval(timer);
      }
   }, 200);
}

function UpdateBetValues(horse, bet, balance, gain){
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_BETTING_VALUES');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(horse);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(bet);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(balance);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(gain);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function ShowBetScreen(){
   UpdateBetValues(currentHorse, currentBet, balance, currentGain);


   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(3);
   mp.game.graphics.popScaleformMovieFunctionVoid();

   
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SET_BETTING_ENABLED');
   mp.game.graphics.pushScaleformMovieFunctionParameterBool(true);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}


function ShowBetScreenMp(){
   UpdateBetValues(currentHorse, currentBet, balance, currentGain);
   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'SHOW_SCREEN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(4);
   mp.game.graphics.popScaleformMovieFunctionVoid();

}

function GetMouseClickedButton(){

   mp.game.graphics.callScaleformMovieFunctionFloatParams(scaleform, 'SET_INPUT_EVENT', 237.0, -1082130432, -1082130432, -1082130432, -1082130432);

   mp.game.graphics.pushScaleformMovieFunction(scaleform, 'GET_CURRENT_SELECTION');
   
   var returnValue = mp.game.invoke(NATIVES.END_SCALEFORM_MOVIE_METHOD_RETURN_VALUE);

   const timer = setInterval(() => {
      if(mp.game.invoke(NATIVES.IS_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_READY, returnValue)){
         clicked = mp.game.invoke(NATIVES.GET_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_INT, returnValue);
         clearInterval(timer);
      }
   }, 200);
}

function SetScreenCooldown(sc, count){
   mp.game.graphics.pushScaleformMovieFunction(sc, 'SET_COUNTDOWN');
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(count);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}


function OpenInsideTrack(){
  try {
   mp.events.callRemote("openInsideTrack");

   scaleform = mp.game.graphics.requestScaleformMovie('HORSE_RACING_CONSOLE');

   const timer = setInterval(() => {
      if(mp.game.graphics.hasScaleformMovieLoaded(scaleform)){
         insideTrackActive = true;

         mp.game.ui.displayHud(false);

         mp.events.call('showHUD', false);

         mp.game.invoke(NATIVES.RELEASE_NAMED_RENDERTARGET, "casinoscreen_02");


         ShowMainScreen();

         AddHorsesMp(horses, scaleform);


         clearInterval(timer);
      }
   }, 200);
  }
  catch(e){
     mp.gui.chat.push(e.toString());
  }
}



function StartRace(sc){
   startRace = true;

   mp.game.audio.playSoundFrontend(-1, 'race_loop', 'dlc_vw_casino_inside_track_betting_single_event_sounds', false);

   mp.game.graphics.pushScaleformMovieFunction(sc, 'START_RACE');

   mp.game.graphics.pushScaleformMovieFunctionParameterFloat(15000.0);

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(getRandomInt(255));

   singleHorses = shuffle(singleHorses);

   singleHorses.forEach((t) => {
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(t);
   });

   winner = singleHorses[0];

   mp.game.graphics.pushScaleformMovieFunctionParameterFloat(0.0);
   mp.game.graphics.pushScaleformMovieFunctionParameterBool(false);

   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function StartRaceMain(horses, offset){

   var arr = JSON.parse(horses);

   mp.game.audio.playSoundFrontend(-1, 'race_loop', 'dlc_vw_casino_inside_track_betting_single_event_sounds', false);

   mp.game.graphics.pushScaleformMovieFunction(bigScreenScaleform, 'START_RACE');

   mp.game.graphics.pushScaleformMovieFunctionParameterFloat(45000.0);

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(getRandomInt(255));

   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[0]);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[1]);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[2]);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[3]);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[4]);
   mp.game.graphics.pushScaleformMovieFunctionParameterInt(arr[5]);

   mp.game.graphics.pushScaleformMovieFunctionParameterFloat(offset);
   mp.game.graphics.pushScaleformMovieFunctionParameterBool(true);
   mp.game.graphics.popScaleformMovieFunctionVoid();
}

function AddHorses(sf){
   for(let i = 1; i <= 6; i++){
      let name = GetRandomHorseName();

      mp.game.graphics.pushScaleformMovieFunction(sf, 'SET_HORSE');
   
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(i);

      mp.game.invoke(NATIVES.BEGIN_TEXT_COMMAND_SCALEFORM_STRING, name);
      mp.game.invoke(NATIVES.END_TEXT_COMMAND_SCALEFORM_STRING);

      mp.game.invoke(NATIVES.SCALEFORM_MOVIE_METHOD_ADD_PARAM_PLAYER_NAME_STRING, `1/2`);
         
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][0]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][1]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][2]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][3]);

      mp.game.graphics.popScaleformMovieFunctionVoid();
   }
}

function AddHorsesMp(arr, sc){
   horses = arr;
   for(let i = 1; i <= 6; i++){
      let name = arr[i - 1] < 10 ? `ITH_NAME_00${arr[i - 1]}` : `ITH_NAME_0${arr[i - 1]}`

      mp.game.graphics.pushScaleformMovieFunction(sc, 'SET_HORSE');
   
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(i);

      mp.game.invoke(NATIVES.BEGIN_TEXT_COMMAND_SCALEFORM_STRING, name);
      mp.game.invoke(NATIVES.END_TEXT_COMMAND_SCALEFORM_STRING);

      mp.game.invoke(NATIVES.SCALEFORM_MOVIE_METHOD_ADD_PARAM_PLAYER_NAME_STRING, `1/2`);
         
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][0]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][1]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][2]);
      mp.game.graphics.pushScaleformMovieFunctionParameterInt(HORSE_STYLES[i][3]);

      mp.game.graphics.popScaleformMovieFunctionVoid();
   }
}

function GetRandomHorseName(){
   let rand = getRandomInt(99);

   let randomName = rand < 10 ? `ITH_NAME_00${rand}` : `ITH_NAME_0${rand}`;

   return randomName;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
 }

function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;
 
   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
 
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
 
     // And swap it with the current element.
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 }

 mp.events.add('enterCasinoWall', () => {

      if (!mp.game.graphics.hasStreamedTextureDictLoaded("Prop_Screen_Vinewood")) {
          mp.game.graphics.requestStreamedTextureDict("Prop_Screen_Vinewood", true);
          while (!mp.game.graphics.hasStreamedTextureDictLoaded("Prop_Screen_Vinewood")) mp.game.wait(0);
      }

      if(!mp.game.ui.isNamedRendertargetRegistered("casinoscreen_01")){
         mp.game.ui.registerNamedRendertarget("casinoscreen_01", false);
         mp.game.ui.linkNamedRendertarget(mp.game.joaat(`vw_vwint01_video_overlay`));
   
      }

      while(!mp.game.ui.isNamedRendertargetRegistered("casinoscreen_01") || !mp.game.ui.isNamedRendertargetLinked(mp.game.joaat(`vw_vwint01_video_overlay`))){
         mp.game.wait(0);
      }

      videoWallTarget = mp.game.ui.getNamedRendertargetRenderId("casinoscreen_01");

      SetTvScreen();
  
 });

 
 mp.events.add('exitCasinoWall', () => {

   mp.game.invoke(NATIVES.RELEASE_NAMED_RENDERTARGET, "casinoscreen_01");

   videoWallTarget = null;

});



 function SetTvScreen(){
    mp.game.invoke("0xF7B38B8305F1FE8B", 0, 'CASINO_DIA_PL', true);

    mp.game.graphics.setTvAudioFrontend(true);
    mp.game.graphics.setTvVolume(-100);
    mp.game.graphics.setTvChannel(0);
 }
}