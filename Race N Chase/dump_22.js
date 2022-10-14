{
mp.events.add("MDC:AddBlip", (id, type) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`AddBlip(${id}, '${type}');`); 
});
mp.events.add("MDC:AddSpikeBlip", (id, stage) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`AddSpikeBlip(${id}, ${stage});`);
});
mp.events.add("MDC:UpdateSpike", (id, stage) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`UpdateSpikeStage(${id}, ${stage});`);
});
mp.events.add("MDC:RemoveBlip", (id, type) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`RemoveBlip(${id}, '${type}');`);
});
mp.events.add("MDC:RemoveBlipsOfType", (type) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`RemoveBlipsOfType('${type}');`);
});
mp.events.add("MDC:RemoveAllBlips", () => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`RemoveAllBlips();`);
});
mp.events.add("MDC:UpdateBlip", (id, type, x, y) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`UpdateBlip(${id}, '${type}', ${x}, ${y});`);
});
mp.events.add("MDC:UpdateMiniscreen", (key, value) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`UpdateMiniscreenStatus('${key}', '${value}');`);
});

mp.events.add("MDC:StingerFail", (message) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`SetStingerError('${message}');`); 
});
mp.events.add("MDC:StingerSuccess", (id, message) => {
    if(MDC_DOM == null) return;
    MDC_DOM.execute(`SetStingerSuccess(${id}, '${message}');`); 
});


/* EVENTS FOR THE BROWSER */
mp.events.add("mdcRequestDeployStinger", (stingerID) => {
    mp.events.callRemote("RequestDeployStinger", stingerID);
});

/* RAGE:MP STUFF */
function InitializeMDC(){
    MDC_DOM = mp.browsers.new("package://mdc_screen/index.html");

    mp.events.callLocal("MDC:AddBlip", mp.players.local.remoteId, "police");

    MDCActive = false;
    MDC_DOM.active = false;
}

mp.events.add("OneSecondEvent", () => {
    if(mp.players.local.getVariable("Team") != 1) return;

    mp.events.callLocal("MDC:AddBlip", mp.players.local.remoteId, "police");
    mp.events.callLocal("MDC:UpdateBlip", mp.players.local.remoteId, "police", mp.players.local.position.x, mp.players.local.position.y);
    /* Adding streamed in police officers to the MDC */
    mp.players.forEachInStreamRange((cplayer, id) => {
        if(cplayer.getVariable("Team") == 1){
            mp.events.callLocal("MDC:AddBlip", cplayer.remoteId, "police");
            mp.events.callLocal("MDC:UpdateBlip", cplayer.remoteId, "police", cplayer.position.x, cplayer.position.y);
        }
    });
});
}