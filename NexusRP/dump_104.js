{
let vehicles = [];

mp.events.add('TestDrive.LoadCars', (array)=>{
    array = JSON.parse(array);

    array.forEach((item)=>{
        let position = new mp.Vector3(item.pos.x, item.pos.y, item.pos.z);
        let veh = mp.vehicles.new(item.vehicleHash, position,
            {
                heading: item.pos.rot,
                numberPlate: "NEXUSRP",
                alpha: 255,
                locked: false,
                engine: false,
                dimension: 0
            });
            veh.col1 = item.color1;
            veh.col2 = item.color2;
            veh.setColours(item.color1, item.color2);
            veh.testdrive = true;
            veh.Coordinates = position;
    });
});




mp.events.add("entityStreamIn", (entity) => {
    if(entity.col1!=null && entity.col2!=null){
        entity.testdrive = true;
        setTimeout(()=>{
            entity.setColours(entity.col1, entity.col2);
            entity.setDirtLevel(0);
            entity.setInvincible(true);
            entity.position = entity.Coordinates;
            
        }, 50);
        setTimeout(()=>{
            try{
                entity.position = entity.Coordinates;
            entity.freezePosition(true);
            }catch{}
        }, 2000);
    }
});

}