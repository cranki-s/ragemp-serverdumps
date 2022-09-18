{
let localplayer = mp.players.local;

mp.events.add('QuestShop:Clothes:Open',(type,money)=>{
    global.ClothesShopType = 'donate';
    global.StoreType = type;
    global.genderType = (localplayer.getVariable("GENDER")) ? 1 : 0;
    global.markUP = 1.0;
    let camValues;
    switch (type) {
        case "backpacks":
            camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 1.5, Height: 0.2 };
            global.StoreLoadItems = JSON.parse(JSON.stringify(global.septemberbags[global.genderType]));
            localplayer.clearProp(0);
            localplayer.clearProp(1);
            break;
        case "clothes":
            global.clearClothes();
            camValues = { Angle: mp.players.local.getRotation(2).z + 90, Dist: 1.3, Height: 0.3 };
            global.ClothesCategory = [];
            global.accessibleClothes = global.allClothes['september'][global.genderType].sort((previousCategory, nextCategory) => previousCategory.id - nextCategory.id);
            global.accessibleClothes.forEach(category => {
                if (category.items.length > 0)
                global.ClothesCategory.push(
                        {
                            id: category.id,
                            name: category.name,
                            type: 'c' + category.type
                        }
                    )
            });
            break;
    }
    global.bodyCamStart = mp.players.local.position;
    var pos = global.getCameraOffset(new mp.Vector3(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    global.bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    global.bodyCam.pointAtCoord(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height);
    global.bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
    mp.players.local.setHeading(49);
    global.playerheading.startveh(mp.players.local);
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/clShop/${type}`,query: { specialWallet: 'true' } })})`);
    mp.events.call("QuestShop:Clothes:UpdateMoney", money);
    global.QuestShop = true;
    global.menuOpen();
})
mp.events.add('QuestShop:buyClothes', (ShopType, ColorID, activeItem) => {

    try {
        let args = [];       
        switch (ShopType) {
            case "backpacks":
                let item = global.StoreLoadItems.find(x => x.id === activeItem.id)
                args.push("backpacks", Number(item.Variation), Number(item.color));
                break;
            case "clothes":
                let categoryTypes = global.accessibleClothes.find(category => category.id == global.categoryType).type;                
                args.push("clothes", categoryTypes, Number(activeItem.id), Number(ColorID), activeItem.name);
                break;
        }
        Nexus.callRemote('QuestShop:Buy', ...args);
    } catch { }
})
mp.events.add('QuestShop:Clothes:UpdateMoney',(cash)=>{
    globalThis.browser.execute(`window.AppData.commit('character/setSpecialMoney',${cash})`);
})

mp.events.add('QuestShop:Clothes:CloseShop',()=>{
    global.QuestShop = false;
    global.menuClose();
    global.bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
    global.playerheading.stop()
});


mp.events.add('QuestManager:OpenShopClothes',()=>{
    mp.events.call('NPCDialogue.End');
    Nexus.callRemote('QuestShop:OpenShop','clothes');
});
mp.events.add('QuestManager:OpenShopBackPack',()=>{
    mp.events.call('NPCDialogue.End');
    Nexus.callRemote('QuestShop:OpenShop','backpacks');
});

mp.events.add('QuestManager:OpenShopCar',()=>{
    mp.events.call('NPCDialogue.End');
    Nexus.callRemote('QuestShop:OpenShop','car');
});

global.septemberbags = JSON.parse(`
{
    "0":
    [
        {"name":"Рюкзак школьный №1","Variation":108,"color":0,"price":13000,"id":0,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":1,"price":13000,"id":1,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":2,"price":13000,"id":2,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":3,"price":13000,"id":3,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":4,"price":13000,"id":4,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":5,"price":13000,"id":5,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":6,"price":13000,"id":6,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":7,"price":13000,"id":7,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":8,"price":13000,"id":8,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":9,"price":13000,"id":9,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":0,"price":22000,"id":10,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":1,"price":22000,"id":11,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":2,"price":22000,"id":12,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":3,"price":22000,"id":13,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":4,"price":22000,"id":14,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":5,"price":22000,"id":15,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":0,"price":25000,"id":16,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":1,"price":25000,"id":17,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":2,"price":25000,"id":18,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":3,"price":25000,"id":19,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":4,"price":25000,"id":20,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":5,"price":25000,"id":21,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":0,"price":20000,"id":22,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":1,"price":17000,"id":23,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":2,"price":17000,"id":24,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":3,"price":23000,"id":25,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":4,"price":17000,"id":26,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":5,"price":17000,"id":27,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":6,"price":17000,"id":28,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":7,"price":35000,"id":29,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":0,"price":15000,"id":30,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":1,"price":15000,"id":31,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":2,"price":15000,"id":32,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":3,"price":15000,"id":33,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":4,"price":15000,"id":34,"modifications":{"id":0,"slots":12,"weight":14}},        
        {"name":"Рюкзак школьный №4","Variation":113,"color":0,"price":10000,"id":35,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":1,"price":10000,"id":36,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":2,"price":10000,"id":37,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":3,"price":10000,"id":38,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":4,"price":10000,"id":39,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":5,"price":10000,"id":40,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":6,"price":10000,"id":41,"modifications":{"id":0,"slots":12,"weight":14}},        
        {"name":"Рюкзак школьный №5","Variation":119,"color":0,"price":22000,"id":42,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":1,"price":22000,"id":43,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":2,"price":22000,"id":44,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":3,"price":22000,"id":45,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":4,"price":22000,"id":46,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":5,"price":22000,"id":47,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":6,"price":22000,"id":48,"modifications":{"id":0,"slots":12,"weight":14}},

        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":0,"price":23000,"id":49,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":1,"price":23000,"id":50,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":2,"price":23000,"id":51,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":3,"price":23000,"id":52,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":4,"price":23000,"id":53,"modifications":{"id":0,"slots":12,"weight":14}},
        
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":0,"price":23000,"id":54,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":1,"price":23000,"id":55,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":2,"price":23000,"id":56,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":3,"price":23000,"id":57,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":4,"price":23000,"id":58,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":5,"price":23000,"id":59,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":6,"price":23000,"id":60,"modifications":{"id":0,"slots":12,"weight":14}},

        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":0,"price":27000,"id":61,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":1,"price":27000,"id":62,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":2,"price":27000,"id":63,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":3,"price":27000,"id":64,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":4,"price":27000,"id":65,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":5,"price":27000,"id":66,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":6,"price":27000,"id":67,"modifications":{"id":0,"slots":12,"weight":14}}
    ],
    "1":
    [
        {"name":"Рюкзак школьный №1","Variation":108,"color":0,"price":13000,"id":0,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":1,"price":13000,"id":1,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":2,"price":13000,"id":2,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":3,"price":13000,"id":3,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":4,"price":13000,"id":4,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":5,"price":13000,"id":5,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":6,"price":13000,"id":6,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":7,"price":13000,"id":7,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":8,"price":13000,"id":8,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №1","Variation":108,"color":9,"price":13000,"id":9,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":0,"price":22000,"id":10,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":1,"price":22000,"id":11,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":2,"price":22000,"id":12,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":3,"price":22000,"id":13,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":4,"price":22000,"id":14,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №2","Variation":109,"color":5,"price":22000,"id":15,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":0,"price":25000,"id":16,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":1,"price":25000,"id":17,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":2,"price":25000,"id":18,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":3,"price":25000,"id":19,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":4,"price":25000,"id":20,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Светящийся №1","Variation":110,"color":5,"price":25000,"id":21,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":0,"price":20000,"id":22,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":1,"price":17000,"id":23,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":2,"price":17000,"id":24,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":3,"price":23000,"id":25,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":4,"price":17000,"id":26,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":5,"price":17000,"id":27,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":6,"price":17000,"id":28,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный с скейтом №1","Variation":111,"color":7,"price":35000,"id":29,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":0,"price":15000,"id":30,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":1,"price":15000,"id":31,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":2,"price":15000,"id":32,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":3,"price":15000,"id":33,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №3","Variation":112,"color":4,"price":15000,"id":34,"modifications":{"id":0,"slots":12,"weight":14}},        
        {"name":"Рюкзак школьный №4","Variation":113,"color":0,"price":10000,"id":35,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":1,"price":10000,"id":36,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":2,"price":10000,"id":37,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":3,"price":10000,"id":38,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":4,"price":10000,"id":39,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":5,"price":10000,"id":40,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №4","Variation":113,"color":6,"price":10000,"id":41,"modifications":{"id":0,"slots":12,"weight":14}},         
        {"name":"Рюкзак школьный №5","Variation":119,"color":0,"price":22000,"id":42,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":1,"price":22000,"id":43,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":2,"price":22000,"id":44,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":3,"price":22000,"id":45,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":4,"price":22000,"id":46,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":5,"price":22000,"id":47,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный №5","Variation":119,"color":6,"price":22000,"id":48,"modifications":{"id":0,"slots":12,"weight":14}},

        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":0,"price":23000,"id":49,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":1,"price":23000,"id":50,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":2,"price":23000,"id":51,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":3,"price":23000,"id":52,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Дракончик","Variation":115,"color":4,"price":23000,"id":53,"modifications":{"id":0,"slots":12,"weight":14}},
        
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":0,"price":23000,"id":54,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":1,"price":23000,"id":55,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":2,"price":23000,"id":56,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":3,"price":23000,"id":57,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":4,"price":23000,"id":58,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":5,"price":23000,"id":59,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty","Variation":116,"color":6,"price":23000,"id":60,"modifications":{"id":0,"slots":12,"weight":14}},

        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":0,"price":27000,"id":61,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":1,"price":27000,"id":62,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":2,"price":27000,"id":63,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":3,"price":27000,"id":64,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":4,"price":27000,"id":65,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":5,"price":27000,"id":66,"modifications":{"id":0,"slots":12,"weight":14}},
        {"name":"Рюкзак школьный Hello Kitty светящийся","Variation":117,"color":6,"price":27000,"id":67,"modifications":{"id":0,"slots":12,"weight":14}}
    ]    
}
`);
}