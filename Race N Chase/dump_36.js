{
var MaxVoiceRange = 50;
mp.voiceChat.muted = true;
var lastVoiceBind = 0x4E;
var curVoiceBind = 0x4E;


function DisableVoice()
{
    traceLastFunc(`[Players] Disable Voice`);

    mp.events.callRemote("OnScriptedKeyPress", 0x4E, false);
    mp.voiceChat.muted = true;
}

function EnableVoice()
{
    if(!chatStatus && 
		!(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false)) 
	{
        traceLastFunc(`[Players] Enable Voice`);

		mp.voiceChat.muted = false;
		mp.events.callRemote("OnScriptedKeyPress", 0x4E, true);
	}
}

function TogVCMode()
{
    if(!chatStatus && mp.voiceChat.muted == false && 
		!(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false)) 
	{
		mp.events.callRemote("OnScriptedKeyPress", 0x09, true);
	}
}

if(mp.storage.data.voicebind !== undefined)
{
    curVoiceBind = mp.storage.data.voicebind;
    lastVoiceBind = mp.storage.data.voicebind;
}

mp.keys.bind(lastVoiceBind, false, DisableVoice);
mp.keys.bind(lastVoiceBind, true, EnableVoice);
mp.keys.bind(0x09, true, TogVCMode);

mp.events.addCommand("voicebind", function (bind) {
    bind = Number(bind);

    if (!Number.isInteger(bind)) {
        mp.gui.chat.push("USAGE: voicebind (keycode) --Input a virtual keycode e.g. 0x4E is 'N' (default)");
        mp.gui.chat.push("https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes");
        return;
    }

    mp.storage.data.voicebind = bind;

    mp.storage.flush();

    lastVoiceBind = curVoiceBind;
    curVoiceBind = bind;

    mp.keys.unbind(lastVoiceBind, false, DisableVoice);
    mp.keys.unbind(lastVoiceBind, true, DisableVoice);

    DisableVoice();
    mp.keys.bind(curVoiceBind, false, DisableVoice);
    mp.keys.bind(curVoiceBind, true, EnableVoice);

    mp.events.callLocal("HUDNotify", `Push to talk is now binded to <strong>${String.fromCharCode(curVoiceBind)}</strong>.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");
        
    mp.events.callLocal("RemoveTooltip", String.fromCharCode(lastVoiceBind));
    mp.events.callLocal("AddTooltip", String.fromCharCode(curVoiceBind), "Voice Chat", -1);
});
}