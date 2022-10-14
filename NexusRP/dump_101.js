{
let Blip = null;
let Shape = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

mp.events.add('createDrugPoint', function (position) {
    mp.events.call('deleteDrugPoint');
    Blip = mp.game.ui.addBlipForRadius(position.x + getRandomInt(80)-40, position.y+ getRandomInt(80)-40, position.z, 90);
    
    mp.game.invoke(getNative("SET_BLIP_SPRITE"), Blip, 9);
    mp.game.invoke(getNative("SET_BLIP_ALPHA"), Blip, 218);
    mp.game.invoke(getNative("SET_BLIP_COLOUR"), Blip, 1);

    
    Shape = mp.colshapes.newSphere(position.x, position.y, position.z, 1); 
    Shape.drug = true; 
    Shape.in = false;
});

mp.events.add('deleteDrugPoint', ()=>{
    if (Blip != null) mp.game.ui.removeBlip(Blip);
    Blip = null;
    if(Shape != null){
        Shape.destroy();
        Shape = null;
    }
})




mp.events.add('playerEnterColshape', (shape)=>{
    if(shape.drug!=null){
        shape.in = true;
        mp.events.call("PressE", true);
        mp.players.local.drugPoint = true;
    }
});

mp.events.add('playerExitColshape', (shape)=>{
if(shape.drug!=null){
    shape.in = false;
    mp.events.call("PressE", false);
    mp.players.local.drugPoint = undefined;
}
});



}