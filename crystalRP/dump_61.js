{
global.walkieTalkie = null;
global.walkieActive = false;
let volna = null;
mp.events.add('walkie.open', (fractionfrequency) => {
    if(localplayer.getVariable('LISTENER_RADIO')){
        global.walkieTalkie = mp.browsers["new"]('package://cef/System/walkieTalkie/index.html');
		global.walkieActive = true;
        global.walkieTalkie.execute(`walkieTalkie.input='${fractionfrequency}'`);
        global.walkieTalkie.execute(`walkieTalkie.active=true`);
        global.walkieTalkie.execute(`walkieTalkie.btnuses=false`);
    }
});

mp.events.add('walkie.talking', (player) => {
    if(player.getVariable('LISTENER_RADIO')){
        global.walkieTalkie.execute(`playSound("talking");`);
        player.voiceVolume = 1.0;
        player.voice3d = true;
        localplayer.isListening = false;
    }
});

mp.events.add('walkie.disableTalking', (player) => {
    if(player.getVariable('LISTENER_RADIO')){
        player.voiceVolume = 0.0;
        player.voice3d = false;
        localplayer.isListening = true;
    }
});

mp.events.add('walkie.close.menu', () => {
	mp.events.callRemote("closeWalkie");
    mp.gui.cursor.visible = false;
});
mp.events.add('walkie.close', () => {
    if (global.walkieTalkie != null)
	{
		global.walkieTalkie.execute(`walkieTalkie.active=false`);
		global.walkieActive = false;
		global.walkieTalkie = null;
	}
});
mp.keys.bind(0x58, true, function () {
    if(!global.walkieActive || chatActive || !loggedin || chatActive || editing || localplayer.getVariable('IS_DYING')) return;
    if (volna == null) {
        mp.events.call('notify', 4, 9, 'Вы не выбрали частоту рации', 3000);
        return;
    }
    mp.events.callRemote("talkingInWalkie")
    global.walkieTalkie.execute(`walkieTalkie.voice=true`);
});

mp.keys.bind(0x58, false, function () {
    if(!global.walkieActive || volna == null || chatActive || !loggedin || chatActive || editing || localplayer.getVariable('IS_DYING')) return;
    mp.events.callRemote("DisableTalkingWalkie")
    global.walkieTalkie.execute(`walkieTalkie.voice=false`);
});

mp.events.add('walkie.playSound', () => {
    global.walkieTalkie.execute(`playSound("notalking");`);
});

mp.events.add('walkie.frequencyChange', (frequency) => {
    if (frequency == undefined || frequency.length <= 5) {
        mp.events.call('notify', 4, 9, 'Вы не выбрали частоту рации', 3000);
        return;
    }
    volna = frequency;
    mp.events.callRemote("ChangeFrequency", parseInt(frequency))
});
}矫渂˰