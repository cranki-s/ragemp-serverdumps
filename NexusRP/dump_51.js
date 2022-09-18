{
﻿global.circleEntity = null;
global.circleOpen = false;
function OpenCircle(title) {
    if (menuCheck() || circleOpen) return;
	if(localplayer.getVariable('seats') === true) return;
    mp.gui.execute(`rhombusMenu.render('${title}')`);
    circleOpen = true;
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
}
function CloseCircle() { 
    global.menuOpened = false;
    mp.gui.cursor.visible = false;    
}
global.ListMenuOpen = false;
mp.keys.bind(Keys.VK_M, false, function () { // G key
	if (ListMenuOpen) {
        global.menuOpened = false;
        return;
    }
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true && !localplayer.isInAnyVehicle(false) || localplayer.getVariable('seats') == true) return;   
    if (!loggedin || chatActive || new Date().getTime() - lastCheck < 3000) return;
    ListMenuOpen = true;
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    mp.gui.execute(`listMenu.render('main')`);
});
mp.events.add('PlayerSelectedMenu',(index)=>{    
        Nexus.callRemote('PlayerSelectedMenu', index);  
        ListMenuOpen = false;  
        global.menuOpened = false; 
})
mp.events.add('ListMenu:CloseMenu',()=>{
    ListMenuOpen = false;  
    global.menuOpened = false;  
    mp.gui.cursor.visible = false;
})

mp.keys.bind(Keys.VK_X, false, function () { // X key
    if (!loggedin || chatActive || editing || mp.game.ui.isPauseMenuActive() || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    if (entity && mp.players.exists(entity) && entity.type == "player") 
    {
        Nexus.callRemote('playerPressCuffBut', entity);
    }
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_G, false, function () { // G key   
	if (circleOpen) {
        mp.gui.execute("rhombusMenu.menuHandler(false)");
        CloseCircle();
        circleOpen = false;	
        return;
    }
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true && !localplayer.isInAnyVehicle(false) || localplayer.getVariable('seats') == true || global.cuffed) return;
    circleEntity = null;
    if (!loggedin || chatActive || entity == null || new Date().getTime() - lastCheck < 3000) return;
    circleEntity = entity;
    switch (entity.type) {
        case "object":
            if (entity && mp.objects.exists(entity)) {
                Nexus.callRemote('oSelected', entity);
            }
            entity = null;
            return;
        case "player":             
            Nexus.callRemote("circlecallv","player");                  
            return;
        case "vehicle":
            Nexus.callRemote("circlecallv","car");            
            return;
    }    
    lastCheck = new Date().getTime();
});
mp.events.add("sendinfos",(i,type, circlePermision)=>{    
    mp.gui.execute(`rhombusMenu.playerGroup = '${i}'`);
    mp.gui.execute(`rhombusMenu.permission = '${circlePermision}'`);
    mp.gui.execute(`listMenu.playerGroup = '${i}'`);    
    if(type =="player"){
        if(circleEntity == null) return;
        let genderType = circleEntity.hasVariable("GENDER") ? (circleEntity.getVariable("GENDER")) ? "ець" : "ка" : "ець";
        let name = mp.storage.data.friends[circleEntity.name] !== undefined || passports[circleEntity.name] !== undefined ? circleEntity.name : "Незнайом"+genderType+`(${circleEntity.remoteId})`
        mp.gui.execute(`rhombusMenu.player = '${name}'`);
        OpenCircle('main');  
    }
    else if(type == "car")
    {
        OpenCircle('car');
    }
});

mp.events.add("closerhombus",()=>{
    CloseCircle();
});
mp.events.add('CarCallBack',(index)=>{
    if (circleEntity == null) return;    
    //Nexus.callRemote('console',JSON.stringify(circleEntity)+'client')
    Nexus.callRemote('vehicleSelected', entity, index);
    circleOpen = false;	
})
mp.events.add('PlayerCallBack',(index)=>{
if(localplayer.getVariable('seats') === true) return;    
    if (circleEntity == null) return;   
	Nexus.callRemote('pSelected', circleEntity, index);
    circleOpen = false;	
})
mp.events.add('fractioncallback',(index)=>{
    if (circleEntity == null) return;
    if(localplayer.getVariable('seats') === true) return;
    Nexus.callRemote('fractioncallback', circleEntity, index);
    circleOpen = false;	
})
mp.events.add('familycallback', (e) => {
    if (circleEntity == null) return;
    if (localplayer.getVariable('seats') === true) return;
    Nexus.callRemote(e, circleEntity);
    circleOpen = false;	
})
}