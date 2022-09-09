{
﻿let OpenAnimation = false;
let animation = null;
var animationSlots = mp.storage.data.animation;
let game = null;
mp.keys.bind(Keys.VK_BACK, false, function () { // Animations selector   
    if(mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || mp.players.local.isFalling() || mp.players.local.isShooting() || mp.players.local.isSwimming() || mp.players.local.isSwimmingUnderWater()) return; 
	mp.events.callRemote("stopAnim");
	mp.events.call('clinet::helpkeysonHUD', false, null, null);
});


setInterval(() => {     
    for(let i = 49; i<=54;i++)
    {
        if(mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || mp.players.local.isFalling() || mp.players.local.isShooting() || mp.players.local.isSwimming() || mp.players.local.isSwimmingUnderWater()) return;
        let x = mp.keys.isDown(i)
        let y = mp.keys.isDown(18);
        if (x&&y) {
            if (animationSlots[i-48].length != 0) { mp.events.callRemote('playAnim', animationSlots[i-48][0].ad, animationSlots[i-48][0].an, animationSlots[i-48][0].af)};
        }
    }
   
},500);

mp.keys.bind(Keys.VK_U, false, function () { // Animations selector   
    if (!loggedin || chatActive || editing || cuffed || localplayer.isInAnyVehicle(true) || global.menuOpened || localplayer.getVariable('InDeath') == true || mp.players.local.isFalling() || mp.players.local.isShooting() || mp.players.local.isSwimming() || mp.players.local.isSwimmingUnderWater()) return;
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
        animation = mp.browsers.new('http://package/browser/modules/animations/index.html');
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
        animation.execute(`animations.categoriesList = ${JSON.stringify(browserCategories)}`)
        animation.execute(`animations.walkStyle = '${mp.players.local.getVariable('playerws')}'`)
        animation.execute(`animations.fastSlots = ${JSON.stringify(animationSlots)}`)
    }       
});

mp.events.add('setAnimCategory',(categoryid)=>{
    //animation.execute(`alert(${JSON.stringify(animationSlots)})`)
    animation.execute(`animations.animationList = ${JSON.stringify(global.animationList.find(category=>category.id===categoryid).animations)}`);    
})

mp.events.add('playAnim',(animation)=>{
    animation = JSON.parse(animation);
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

}