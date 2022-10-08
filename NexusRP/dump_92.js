{
let FurnitureList = [];
let currentRob = null;
let robMarker = null;
let robBlip = null;

mp.events.add('OpenLockPick',()=>{
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/lockpick` })})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
})

mp.events.add('Lockpick:Win',()=>{
    NexusEvent.callRemote('LockPick:Win');
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/` })})`);
    globalThis.browser.close();   
})

mp.events.add('Robbery.CreateBlip', (position)=>{
    mp.events.call('Robbery.DestroyBlip');
    robBlip = mp.blips.new(0, position,
        {
            name: global.GetText("Ограбление"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
});

mp.events.add('Robbery.DestroyBlip', ()=>{
    if(robBlip!=null){
        robBlip.destroy();
        robBlip = null;
    }
});

mp.events.add('Robbery.AddFurniture', (pos, dimension, id)=>{
    
    let m = mp.markers.new(1, pos, 1,
        {
            visible: true,
            dimension: dimension,
            color: [255, 255, 0, 255]
        });
    let colShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z+1, 1, dimension);
    colShape.furniture = id;

    FurnitureList.push({
        marker : m,
        shape : colShape,
        id : id
    });
});

mp.events.add('Robbery.TakeFurniture', (id)=>{
   // mp.gui.execute(`alert('${id}')`);
    let obj = FurnitureList.find(x => x.id == id);
    if(obj){
        obj.marker.destroy();
        obj.shape.destroy();
        FurnitureList.splice(FurnitureList.indexOf(obj), 1);
        currentRob = id;
        //mp.gui.execute(`alert('${currentRob}')`);
        taking = false;
    }
});

mp.events.add('Robbery.Car.CallBack', ()=>{
    currentRob = null;
});

let taking = false;


mp.events.add('playerEnterColshape', (shape)=>{
    if(shape.furniture!=null && currentRob==null && !taking){
        taking = true;
        NexusEvent.callRemote('Robbery.EnterColShape', shape.furniture);
    }

    if(shape.robSell!=null && localplayer.isInAnyVehicle(false) && localplayer.vehicle.getPedInSeat(-1) == localplayer.handle){
        NexusEvent.callRemote('CarItemPoint.onEnterColShape', localplayer.vehicle);
    }
});

mp.events.add('CarItemPoint.CreateShape', (pos)=>{
    FurnitureList = [];
    let colShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1, 0);
    pos.z = pos.z-3.5;
    let m = mp.markers.new(1, pos, 4,
        {
            visible: true,
            dimension: 0,
            color: [5, 165, 176, 255]
        });
    
    colShape.robSell = true;
    robMarker = {
        marker : m,
        shape : colShape
    }
});
mp.events.add('CarItemPoint.RemoveShape', ()=>{
    if(robMarker!=null){
        robMarker.marker.destroy();
        robMarker.shape.destroy();
        robMarker = null;
    }
});

mp.keys.bind(Keys.VK_E, false, function () { // F2 key	    
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true || localplayer.getVariable('seats') == true) return;
    // player    
    if (!loggedin || chatActive || entity == null) return;
    //mp.gui.execute(`alert('${entity}')`);
    //mp.gui.execute(`alert('${entity.type}, ${mp.objects.exists(entity)}')`);
    if (entity.type == 'vehicle' && currentRob!=null) {
        NexusEvent.callRemote('Robbery.TakeFurToCar', entity);
    }
    lastCheck = new Date().getTime();
});

let showE = false;
mp.events.add('render', ()=>{
    if(showE){
        if(currentRob==null || entity==null || entity.type != 'vehicle'){
            mp.events.call('PressE', false);
            showE = false;
            return;
        }
    }else{
        if(currentRob!=null){
            if (entity!=null && entity.type == 'vehicle') {
                let vehpos = new mp.Vector3(entity.position.x, entity.position.y, entity.position.z);
                let playerpos = new mp.Vector3(localplayer.position.x, localplayer.position.y, localplayer.position.z);
                if((vehpos.subtract(playerpos)).length()<3){
                    mp.events.call('PressE', true);
                    showE=true;
                }
            }
        }
    }
});
}