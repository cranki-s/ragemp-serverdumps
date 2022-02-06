{
﻿let OpenAnimation = false;
let animation = null;
var animationSlots = mp.storage.data.animation;
let game = null;
mp.keys.bind(Keys.VK_BACK, false, function () {   
    if (mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return; 
	mp.gui.execute(`HUD.stopanim=false`);
	mp.events.callRemote("stopAnim");
});
setInterval(() => {     
    for (let i = 49; i <= 54; i++) {
        if (mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return;
        let x = mp.keys.isDown(i)
        let y = mp.keys.isDown(18);
        if (x && y) {
            if (animationSlots[i-48].length != 0)  { 
                mp.gui.execute(`HUD.stopanim=true`)
                mp.events.callRemote('playAnim', animationSlots[i-48][0].ad, animationSlots[i-48][0].an, animationSlots[i-48][0].af); 
            };
        }
    }
}, 250);

mp.keys.bind(Keys.VK_U, false, function () { // Animations selector   
    if (!loggedin || chatActive || editing || cuffed || localplayer.isInAnyVehicle(true) || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return;
    if(OpenAnimation){
        global.menuClose();
        animation.destroy();
        animation = null;
        OpenAnimation = false;
    }
    else if(animation == null){
        if (!animationSlots) {
            animationSlots = {1:[],2:[],3:[],4:[],5:[],6:[]};            
        }
        animation = mp.browsers.new('package://cef/System/animations/index.html');
        let browserCategories = [];
        global.animationList.forEach(category => {            
            browserCategories.push({
                id: category.id,
                name: category.name,
                img: category.img,
                special: category.special,
            })
        })
        OpenAnimation = true;     
		global.menuOpen();		
        animation.execute(`animations.categoriesList=${JSON.stringify(browserCategories)}`)
        animation.execute(`animations.walkStyle='${mp.players.local.getVariable('playerws')}'`)
        animation.execute(`animations.fastSlots=${JSON.stringify(animationSlots)}`)
    }       
});
mp.events.add('setAnimCategory',(categoryid)=>{
    animation.execute(`animations.animationList=${JSON.stringify(global.animationList.find(category => category.id === categoryid).animations)}`);    
})
mp.events.add('playAnim',(animation)=>{
    animation = JSON.parse(animation);
	mp.gui.execute(`HUD.stopanim=true`);
    mp.events.callRemote('playAnim', animation.ad,animation.an,animation.af);
})
mp.events.add('setWalk',(animation)=>{
    animation = JSON.parse(animation)
})
mp.events.add('saveSlots',(fastSlots)=>{
    animationSlots = JSON.parse(fastSlots);
    mp.storage.data.animation = animationSlots;
    mp.storage.flush();    
    if(animation != null){
        animation.destroy();
        animation = null;
        OpenAnimation = false;
        global.menuClose();
    }
})

}㼱Ⴭδ