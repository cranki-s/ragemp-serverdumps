{
let calls = []
let battuelist = [];
let contolsBrowser;
let TabletType;
mp.events.add('Tablet:OpenCallTab', (tablettype) => {
    calls.forEach(x => {
        let dist = mp.game.system.vdist(x.position.x, x.position.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
        let i = dist.toFixed(0);
        x.distance = +i;
    });
    TabletType = tablettype
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/tablet/PoliceFBI/${tablettype}/calls` })})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
}),
mp.events.add('Tablet:PlayerLoad', (Calls) => {
    if(loggedin) globalThis.browser.execute(`AppData.commit('stateTablet/setCalls',${Calls})`);
}),
mp.events.add('Tablet:PlayerUnLoad', () => {
    globalThis.browser.execute(`AppData.commit('stateTablet/clearCalls')`);
}),
mp.events.add('Tablet:AddNewCall', (call) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/addCall',${call})`);
}),
mp.events.add('Tablet:UpdateCall', (call) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/updateCall',${call})`);
}),
mp.events.add('Tablet:DeleteCall', (callID) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/removeCall',${callID})`);
});

mp.events.add('Tablet:SearchHuman', (name) => {
    NexusEvent.callRemote('Tablet:SearchHuman', name)
});
mp.events.add('Tablet:SearchHumanCallBack', (status,human) => {
    if(status)globalThis.browser.execute(`RPC.resolve('Tablet:SearchHuman',${human})`);
    else globalThis.browser.execute(`RPC.reject('Tablet:SearchHuman')`);
});

mp.events.add('Tablet:SearchVehicle', (number) => {
    NexusEvent.callRemote('Tablet:SearchVehicle', number);
});
mp.events.add('Tablet:SearchVehicleCallBack', (vehicle) => {
    globalThis.browser.execute(`RPC.resolve('Tablet:SearchVehicle',${vehicle})`);
});

mp.events.add('Tablet:SetClassifyHuman', (name) => {
    NexusEvent.callRemote('Tablet:SetClassifyHuman', name);
});
mp.events.add('Tablet:SetClassifyHumanCallback', (status) => {
    globalThis.browser.execute(`RPC.resolve('Tablet:SetClassifyHuman',${status})`);
});

mp.events.add('Tablet:CloseBrowser', () => {
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
});

mp.events.add('Tablet:OpenCode', () => {
    NexusEvent.callRemote('Tablet:OpenCode');
});
mp.events.add('Tablet:OpenCodeCallBack', (status) => {
    let a = status ? `window.RPC.resolve('Tablet:OpenCode')` : `window.RPC.reject('Tablet:OpenCode')`;
    globalThis.browser.execute(`${a}`);
});

mp.events.add('Tablet:SendCode', (type) => {
    NexusEvent.callRemote('Tablet:SendCode', type);
});
mp.events.add('Tablet:SendCodeCallBack', (status) => {
    let a = status ? `window.RPC.resolve('Tablet:SendCode')` : `window.RPC.reject('Tablet:SendCode')`;
    globalThis.browser.execute(`${a}`);
});

mp.events.add('Tablet:OpenStars', () => {
    NexusEvent.callRemote('Tablet:OpenStars');
});
mp.events.add('Tablet:OpenStarsCallBack', (status) => {
    let a = status ? `window.RPC.resolve('Tablet:OpenStars')` : `window.RPC.reject('Tablet:OpenStars')`;
    globalThis.browser.execute(`${a}`);
});
mp.events.add('Tablet:SetStars',(name, newstars, articles)=>{
    NexusEvent.callRemote('Tablet:SetStars',name, newstars, articles);
})
mp.events.add('Tablet:SetStarsCallBack',(status)=>{
    let a = status ? `window.RPC.resolve('Tablet:SetStars')` : `window.RPC.reject('Tablet:SetStars')`;
    globalThis.browser.execute(`${a}`);
});

mp.events.add('Tablet:AcceptCall', callID => {
    NexusEvent.callRemote('Tablet:SetCall', callID);
});
mp.events.add('Tablet:AcceptCallCallBack',(status)=>{
    let a = status ? `window.RPC.resolve('Tablet:AcceptCall')` : `window.RPC.reject('Tablet:AcceptCall')`;
    globalThis.browser.execute(`${a}`);
});

mp.events.add('Tablet:AcceptWanted',(wantedName)=>{
    NexusEvent.callRemote('Tablet:WatchHuman', wantedName);
});
mp.events.add('Tablet:AcceptWantedCallBack',(status)=>{
    let a = status ? `window.RPC.resolve('Tablet:AcceptWanted')` : `window.RPC.reject('Tablet:AcceptWanted')`;
    globalThis.browser.execute(`${a}`);
});

mp.events.add('Tablet:WantedLoad', (Calls) => {
    if(loggedin)globalThis.browser.execute(`AppData.commit('stateTablet/setWanted',${Calls})`);
}),
mp.events.add('Tablet:WantedUnLoad', () => {
    globalThis.browser.execute(`AppData.commit('stateTablet/clearWanted')`);
}),


mp.events.add('Tablet:AddBattue', (playerobj) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/addWanted',${playerobj})`);
});
mp.events.add('Tablet:UpdateBattue', (playerobj) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/updateWanted',${playerobj})`);
});
mp.events.add('Tablet:RemoveWanted', (wantedName) => {
    globalThis.browser.execute(`AppData.commit('stateTablet/removeWanted','${wantedName}')`);
});

var WantedPlayerBlip = null;
mp.events.add('createWantedPlayerBlip', function (position) {
    if (WantedPlayerBlip != null)
        mp.game.ui.removeBlip(WantedPlayerBlip)
    WantedPlayerBlip = mp.game.ui.addBlipForRadius(position.x, position.y, position.z, 90);
    mp.game.invoke(getNative("SET_BLIP_SPRITE"), WantedPlayerBlip, 9);
    mp.game.invoke(getNative("SET_BLIP_ALPHA"), WantedPlayerBlip, 200);
    mp.game.invoke(getNative("SET_BLIP_COLOUR"), WantedPlayerBlip, 26);
});

mp.events.add('deleteWantedPlayerBlip', function () {
    if (WantedPlayerBlip != null)
        mp.game.ui.removeBlip(WantedPlayerBlip)
    WantedPlayerBlip = null;
});

}