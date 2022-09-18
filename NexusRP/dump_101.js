{
let ShapeArray = [];


mp.events.add('CustomShape.NewShape', (obj)=>{
    if(typeof obj==='string') obj = JSON.parse(obj);
    mp.events.call('CustomShape.Delete', obj.uid);
    let shape = null;
    switch (obj.type){
        case 0:
            shape = mp.colshapes.newSphere(obj.pos.x, obj.pos.y, obj.pos.z, obj.range, obj.dimension);
            break;
        case 1:
            shape = mp.colshapes.newCircle(obj.pos.x, obj.pos.y, obj.range, obj.dimension);
            break;   
    }
    if(shape == null){
        Nexus.callRemote('CustomShape.ReportError', obj.pos.x, obj.pos.y, obj.pos.z);
        return;
    }
    shape.CustomUID = obj.uid;
    ShapeArray[obj.uid] = shape;
});


mp.events.add('CustomShape.Delete', (uid)=>{
    try{
        if(ShapeArray[uid]!=null) {
            ShapeArray[uid].destroy();
            ShapeArray[uid] = null;
        }
    }catch{}
});

mp.events.add('CustomShape.OnJoin', (data)=>{
    data = JSON.parse(data);
    data.forEach((item)=>{
        mp.events.call('CustomShape.NewShape', item);
    });
});


mp.events.add('playerEnterColshape', (shape)=>{
    if(shape.CustomUID!=null){
        Nexus.callRemote('CustomShape.OnEnter', shape.CustomUID);
    }
});

mp.events.add('playerExitColshape', (shape)=>{
    if(shape.CustomUID!=null){
        Nexus.callRemote('CustomShape.OnExit', shape.CustomUID);
    }
});


}