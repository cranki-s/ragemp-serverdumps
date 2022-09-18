{
let builder;

mp.events.add('builderStartGame', () => {
	if(builder == null){ builder = mp.browsers.new('http://package/systems/jobs/builder/FRONT/index.html');
	builder.name = 'nexusbrowser';
}
	global.menuOpen();
    builder.execute(`builder.locale ='${global.Language}'`);
    builder.execute(`builder.active = true`);
});

mp.events.add('Builder:statusGame', (status)=>{	
	global.menuClose();
	Nexus.callRemote('Builder:StatusGame', status);
	builder.destroy();
	builder = null;	
});
}