{
global.walkieTalkie = null;

mp.events.add('walkie.open', (fractionfrequency) => {
    if(localplayer.getVariable('LISTENER_RADIO')){
        global.walkieTalkie = mp.browsers["new"]('http://package/browser/modules/walkieTalkie/index.html');
		global.walkieTalkie.active = true;
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
});
mp.events.add('walkie.close', () => {
    if (global.walkieTalkie != null)
	{
		global.walkieTalkie.execute(`walkieTalkie.active=false`);
		global.walkieTalkie.active = false;
		global.walkieTalkie = null;
	}
});
mp.keys.bind(Keys.VK_N, true, function () {
    if(!global.walkieTalkie.active || chatActive || !loggedin || chatActive || editing || localplayer.getVariable('IS_DYING') || localplayer.isFalling()) return;
    mp.events.callRemote("talkingInWalkie")
    global.walkieTalkie.execute(`walkieTalkie.voice=true`);
});

mp.keys.bind(Keys.VK_N, false, function () {
    if(!global.walkieTalkie.active || chatActive || !loggedin || chatActive || editing || localplayer.getVariable('IS_DYING') || localplayer.isFalling()) return;
    mp.events.callRemote("DisableTalkingWalkie")
    global.walkieTalkie.execute(`walkieTalkie.voice=false`);
});

mp.events.add('walkie.playSound', () => {
    global.walkieTalkie.execute(`playSound("notalking");`);
});

mp.events.add('walkie.frequencyChange', (frequency) => {
    mp.events.callRemote("ChangeFrequency", parseInt(frequency))
});
}