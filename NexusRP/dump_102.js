{
let  MarkerArray = [];

mp.events.add('CustomMarker.New', (obj)=>{
    if(typeof obj==='string') obj = JSON.parse(obj);

    mp.events.call('CustomMarker.Delete', obj.uid);

    let parameters = {};

    parameters.dimension = obj.dimension;
    parameters.visible = true;

    if(obj.dir!=null) parameters.direction = new mp.Vector3(obj.dir.x, obj.dir.y, obj.dir.z);
    if(obj.rot!=null) parameters.rotation = new mp.Vector3(obj.rot.x, obj.rot.y, obj.rot.z);
    if(obj.color!=null) parameters.color = [obj.color.r, obj.color.g, obj.color.b, obj.color.a];

    MarkerArray[obj.uid] = mp.markers.new(obj.type, new mp.Vector3(obj.pos.x, obj.pos.y, obj.pos.z), obj.scale, parameters);
});

mp.events.add('CustomMarker.Delete', (uid)=>{
    try{
        if(MarkerArray[uid]!=null) {
            MarkerArray[uid].destroy();
            MarkerArray[uid] = null;
        }
    }catch{}
});


mp.events.add('CustomMarker.OnJoin', (data)=>{
    data = JSON.parse(data);
    data.forEach((item)=>{
        mp.events.call('CustomMarker.New', item);
    });
})

}