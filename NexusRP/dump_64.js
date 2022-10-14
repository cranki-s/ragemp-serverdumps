{
let license = null;


mp.events.add('OpenLic',(lic)=>{
    if (license == null){ license = mp.browsers.new('http://package/systems/player/documents/FRONT/documents.html');   
    license.name = 'nexusbrowser';
}
    license.execute(`window.locale='${global.Language}'`);
    license.execute(`documents.showLicense(${lic})`)
    global.menuOpen();
})


mp.events.add('Documents:CloseBrowser',()=>{
    if (license != null){
        license.destroy();
        license = null;
    }
    global.menuClose();
})

mp.events.add('OpenDocuments',(documents)=>{
    if (license == null){ license = mp.browsers.new('http://package/systems/player/documents/FRONT/documents.html');  
    license.name = 'nexusbrowser';
}
    license.execute(`window.locale='${global.Language}'`);
    license.execute(`documents.showСertificate(${documents})`)
    global.menuOpen();
})

mp.events.add('OpenUniversalModel',(type,max)=>{
    global.menuOpen();
    mp.gui.execute(`HUD.modalUniversalTrigger('${type}',${max})`)
})

mp.events.add('UniversalModalCallBack',(type,input,input2)=>{ 
    if(type != ""){
      NewEvent.callRemote(type, input, input2);
    }
    global.menuClose();
})

// mp.keys.bind(Keys.VK_L, true, function(){
//     if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || mp.game.ui.isPauseMenuActive() || localplayer.getVariable('seats') == true) return;
//     NewEvent.callRemote('License:ShowMy');
// });
}