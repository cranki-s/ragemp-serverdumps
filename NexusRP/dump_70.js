{
let electrical;
mp.events.add('Electric.StartGame', () => {
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/electrician` })})`);
	global.menuOpen();
});
mp.events.add('Electrician.GameResult', (status)=>{	
	global.menuClose();
	Nexus.callRemote('Electric.EndGame', status);
	globalThis.browser.close();
});
mp.events.add('Electrician.GameResult.September', (time)=>{	
	global.menuClose();
	Nexus.callRemote('September.StartElectricGame.Finish', time);
	globalThis.browser.close();
});

mp.events.add('Drawer.GameResult', (time)=>{	
	global.menuClose();
	Nexus.callRemote('September.Paint.Finish', time);
	globalThis.browser.close();
});

mp.events.add('September.Paint.StartGame',()=>{
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/school` })})`);
	global.menuOpen();
});


mp.events.add('September.StartElectricGame',()=>{
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/electrician2` })})`);
});
global.loadAnim("stungun@standing");


mp.events.add('Electric.Sound', ()=>{	
	mp.gui.execute(`sound.sound='package://sound/shot.mp3'`);	
});

mp.events.add('Electric.Shot', (time)=>{
	try{
	mp.players.local.setToRagdoll(parseInt(time), parseInt(time), 0, true, true, true);
	}catch{}
});












let ElectricBlip = null;
let ElectricShape = null;
let ElectricMarker = null;

mp.events.add('ElectricUprage.NewPoint', (position)=>{
    mp.events.call('ElectricUprage.DeletePoint');
    ElectricBlip = mp.blips.new(0, position,
        {
            name: global.GetText("Заказ"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });

	mp.events.call('createWaypoint', position.x, position.y);

	ElectricShape = mp.colshapes.newSphere(position.x, position.y, position.z, 1); 
    ElectricShape.elecrticUpgrade = true; 

	ElectricMarker = mp.markers.new(44, position, 0.6,
        {
            visible: true,
            dimension: 0,
            color: [255, 255, 0, 180]
        });
});

/*let arr = [];

mp.events.add('ElectricUprage.TestDelete', (pos)=>{
	arr.forEach(function(item, index, object){
		if(item!=null){
			let vector1 = new mp.Vector3(pos.x, pos.y, pos.z);
			let vector2 = new mp.Vector3(item.location.x, item.location.y, item.location.z);
			if(vector1.subtract(vector2).length()<=10){
				object.splice(index, 1);
				if(item.obj!=null) item.obj.destroy();
				item.obj = null;
			}
		}
	});
})

mp.events.add('ElectricUprage.AddTest', (position)=>{
	arr.push(
		{
			location : position,
			obj: mp.markers.new(44, position, 0.6,
        {
            visible: true,
            dimension: 0,
            color: [255, 255, 0, 180]
        })
	 	} );
})*/

mp.events.add('ElectricUprage.DeletePoint', ()=>{
    if(ElectricMarker!=null){
        ElectricMarker.destroy();
        ElectricMarker = null;
    }
	if(ElectricShape!=null){
        ElectricShape.destroy();
        ElectricShape = null;
    }
	if(ElectricBlip!=null){
        ElectricBlip.destroy();
        ElectricBlip = null;
    }
});


mp.events.add('playerEnterColshape', (shape)=>{
    if(shape.elecrticUpgrade!=null){
		
		Nexus.callRemote('ElectricUpgrade.Game');
		
    }
});
}