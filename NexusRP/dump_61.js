{
﻿let OpenAnimation = false;
let animation = null;
var animationSlots = mp.storage.data.animation;
let game = null;
global.isPlayerUseAnim = false;
global.AltButtonPressed = false;
mp.keys.bind(Keys.VK_C, false, function () { // Animations selector   
    if(mp.players.local.vehicle) return;
    if (mp.players.local.hasVariable("animData")) 
    { 
        mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['C']));     
        Nexus.callRemote("stopTaskAnim");
        global.isPlayerUseAnim = false;
    }

});

// let alt = false;
// mp.events.add("render", () => {
//    alt = mp.keys.isDown(49)
// });

// mp.keys.bind(Keys.VK_ALT, true, function () {
//     if (alt) {
//         if(animationSlots) Nexus.callRemote('playAnim', animationSlots["1"][0].ad,animationSlots["1"][0].an,animationSlots["1"][0].af); 
//     }
// });


mp.keys.bind(Keys.VK_ALT, true, ()=>{
    global.AltButtonPressed = true;
});

mp.keys.bind(Keys.VK_ALT, false, ()=>{
    global.AltButtonPressed = false;
});


mp.keys.bind(Keys.VK_1, false, ()=>{
    if(!global.AltButtonPressed)return;
    mp.events.call('Animations.FastSlot.Use', 1);
});

mp.keys.bind(Keys.VK_2, false, ()=>{
    if(!global.AltButtonPressed) return;
    mp.events.call('Animations.FastSlot.Use', 2);
});

mp.keys.bind(Keys.VK_3, false, ()=>{
    if(!global.AltButtonPressed)return;
    mp.events.call('Animations.FastSlot.Use', 3);
});

mp.keys.bind(Keys.VK_4, false, ()=>{
    if(!global.AltButtonPressed)return;
    mp.events.call('Animations.FastSlot.Use', 4);
});


mp.keys.bind(Keys.VK_5, false, ()=>{
    if(!global.AltButtonPressed)return;
    mp.events.call('Animations.FastSlot.Use', 5);
});

mp.keys.bind(Keys.VK_6, false, ()=>{
    if(!global.AltButtonPressed)return;
    mp.events.call('Animations.FastSlot.Use', 6);
});

mp.events.add('Animations.FastSlot.Use', (slotId)=>{
    if(mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return;
    if (animationSlots[slotId].length != 0)
    { 
        mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['C']), 'Остановить анимацию');
        Nexus.callRemote('playAnim', animationSlots[slotId][0].ad, animationSlots[slotId][0].an, animationSlots[slotId][0].af);
    }
})


setInterval(()=>{
    if(global.AltButtonPressed && !mp.keys.isDown(18))global.AltButtonPressed = false;
}, 3000)

/*setInterval(() => {     
    try{
        for(let i = 49; i<=54;i++)
        {
            if(mp.players.local.vehicle || !loggedin || chatActive || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return;
            let x = mp.keys.isDown(i)
            let y = mp.keys.isDown(18);
            if (x&&y) {
                if (animationSlots[i-48].length != 0)
                { 
                    mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['C']), 'Остановить анимацию');
                    Nexus.callRemote('playAnim', animationSlots[i-48][0].ad, animationSlots[i-48][0].an, animationSlots[i-48][0].af);
                }
            }
        }
    }catch{}
},500);*/

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
        animation = mp.browsers.new('http://package/systems/player/animations/FRONT/index.html');
        animation.name = 'nexusbrowser';
        animation.execute(`animations.locale='${global.Language}'`)
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
        animation.execute(`animations.categoriesList = ${JSON.stringify(browserCategories)}`)
        animation.execute(`animations.walkStyle = '${mp.players.local.getVariable('playerws')}'`)
        animation.execute(`animations.fastSlots = ${JSON.stringify(animationSlots)}`)
        
        global.menuOpen();
    }       
});

mp.events.add('setAnimCategory',(categoryid)=>{
    //animation.execute(`alert(${JSON.stringify(animationSlots)})`)
    animation.execute(`animations.animationList = ${JSON.stringify(global.animationList.find(category=>category.id===categoryid).animations)}`);    
})

mp.events.add('playAnim',(animation)=>{    
    animation = JSON.parse(animation);    
    mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['C']),'Остановить анимацию');
    mp.players.local.taskPlayAnim(animation.ad, animation.an, 8, 1, -1, animation.af, 0, !1, !1, !1),
    Nexus.callRemote('playAnim', animation.ad,animation.an,animation.af);
    global.isPlayerUseAnim = true;
})
mp.events.add('setWalk',(animation)=>{
    animation = JSON.parse(animation)
    Nexus.callRemote('aSelected', 12, animation.style);
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