{
let lift = global.ConstrolsBrowser; 
let ListType;
mp.events.add('Lift:OpenLift', (buttons, type) => {
    lift.execute(`window.locale ='${global.Language}'`)
    lift.execute(`openInterface('lift')`);
    lift.execute(`controls.openLift(${buttons})`);
    global.menuOpened = true;
    mp.gui.cursor.visible = true;
    ListType = type;
})
mp.events.add('Lift:SetActive',buttonID=>{ 
    switch(ListType){
        case 0:{
            NewEvent.callRemote('fbilift',buttonID)
        }
        break;
    }
    lift.execute(`controls.setActiveCallback(${buttonID})`); 
});
mp.events.add('Lift:DestroyBrowser',()=>{
    if (lift != null) {
        mp.gui.cursor.visible = false;
        lift.execute(`closeInterface()`);
        global.menuOpened = false;
    }
})

}