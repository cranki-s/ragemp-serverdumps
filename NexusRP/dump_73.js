{
let lumberjack;
mp.events.add('LumberJack:StartGame', () => {
	if(lumberjack == null){ lumberjack = mp.browsers.new('http://package/systems/jobs/lumberjack/FRONT/index.html');
	lumberjack.name = 'nexusbrowser';
}
	lumberjack.execute(`lumberjsck.locale='${global.Language}'`)
	global.menuOpen();
});


mp.events.add('LumberJack:statusGame',(status)=>{
	global.menuClose();
	NexusEvent.callRemote('LumberJack:statusGame', status);
	lumberjack.destroy();
	lumberjack = null;	
});

mp.events.add('LumberJack.CutTree', ()=>{
	global.editing = true;
	setTimeout(()=>{global.editing = false;}, 7500);
})
}