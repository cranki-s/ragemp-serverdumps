{

let arrest = null;
mp.events.add('OpenArestMenu',()=>{
    if (!loggedin || chatActive || circleEntity == null || global.menuOpened ||new Date().getTime() - lastCheck < 3000) return;
    if(arrest == null) {arrest = mp.browsers.new('http://package/systems/fractions/Goverment/arrestSystem/FRONT/wanted.html');
    arrest.name = 'nexusbrowser';
}
    arrest.execute(`wanted.locale='${global.Language}'`);
    arrest.execute(`wanted.offender='${circleEntity.name}'`);
    global.menuOpen();
})
mp.events.add('wantedMenu',(object)=>{
    NexusEvent.callRemote("ArrestTimers",object)
});
mp.events.add('wantedClose',()=>{
    arrest.destroy();
    arrest = null;
    global.menuClose();
})
}