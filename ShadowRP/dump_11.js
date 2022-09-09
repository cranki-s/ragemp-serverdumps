{
mp.events.addDataHandler("ITEM",function(a){
    a.collision=!0,
    0!==a.handle&&(a.setCollision(!1,!0))
});

mp.events.add("entityStreamIn",function(a){
    a.collision!=null&&(a.setCollision(!1,!0))
});
}