{
let priceMod;
let modelPriceMod;
let lsc;
let carCategories = [];
let sendCart = [];
var vehicleComponents = {};
let lastactivecategory = null;
let lastsubcategoryid = null;
const cameraRotator = require("/lib/back/js/vie");

mp.events.add('openTun', (businessMarkup, carClassMarkup, carComponents, businessType,playerCash,playerBank) => {
    if (lsc == null){ lsc = mp.browsers.new('http://package/systems/tuning/FRONT/tuning.html');
    lsc.name = 'nexusbrowser';
}
    NexusEvent.callRemote('EnterTuningMenu');
    vehicleComponents = JSON.parse(carComponents);
    priceMod = businessMarkup / 100;
    priceMod = 1.0+priceMod;
    modelPriceMod = carClassMarkup;
    global.menuOpen();
    let browserCategories = [];
    carCategories = JSON.parse(JSON.stringify(global.carComponents[businessType]));
    carCategories.forEach(category => {
        if (category.id == 20 || category.id == 41 || category.id == 42|| category.id == 43|| category.id == 30 || category.id == 31 || category.id == 32 || category.id == 18 || localplayer.vehicle.getNumMods(category.id) != 0) {
            let newcat = {};
            newcat.id = category.id;
            newcat.name = category.name;
            newcat.type = category.type;
            newcat.img = category.img;
            if(category.items){
                category.items.forEach(item => {
                    if (item.price>0) {
                        item.price = item.price * priceMod * modelPriceMod;
                    }else{
                        item.price = Math.abs(item.price) * priceMod;
                    }
                })
            }
            if (category.subcategories) {               
                let subcategories = [];
                for(let subcategory of category.subcategories){
                    if (subcategory.id == 48 && localplayer.vehicle.getNumMods(subcategory.id) == 0) continue;
                    let newsub = {};
                    newsub.id = subcategory.id;
                    newsub.name = subcategory.name;
                    newsub.type = subcategory.type;
                    newsub.img = subcategory.img;
                    if (subcategory.items) {
                        for (let item of subcategory.items) {
                            if (item.price) {
                                if (subcategory.id == 48 && localplayer.vehicle.getNumMods(subcategory.id) < item.id) {
                                    subcategory.items = subcategory.items.slice(0,localplayer.vehicle.getNumMods(subcategory.id))
                                    break;
                                }
                                if (item.price>0) {
                                    item.price = item.price * priceMod * modelPriceMod;
                                }else{
                                    item.price = Math.abs(item.price) * priceMod;
                                }
                            }
                        }
                    }
                    if (subcategory.price) {
                        if (subcategory.price>0) {
                            newsub.price = subcategory.price * priceMod * modelPriceMod;
                        }else{
                            newsub.price = Math.abs(subcategory.price) * priceMod;
                        }
                    }
                    subcategories.push(newsub);
                }
                newcat.subcategories = subcategories;
            }
            if (category.colors) newcat.colors = category.colors;        
            browserCategories.push(newcat);
        }
    });
    let activeitems = GetActiveItem();   
    lsc.execute(`tuning.locale='${global.Language}'`)
    lsc.execute(`tuning.navigationCategories=${JSON.stringify(browserCategories)}`)
    lsc.execute(`tuning.playerCash=${playerCash}`)
    lsc.execute(`tuning.playerBank=${playerBank}`)
    lsc.execute(`tuning.onCarItems = ${JSON.stringify(activeitems)}`)
    mp.events.call('tupd', 1);   
});
mp.events.add('Tuning:UpdateMoney',(playerCash,playerBank)=>{
    if(lsc != null){
        lsc.execute(`tuning.playerCash=${playerCash}`)
        lsc.execute(`tuning.playerBank=${playerBank}`)
    }
})
mp.events.add('Tuning:setItem', (categoryid, subcategory, itemid) => {    
    const i = localplayer.vehicle.getExtraColours(1, 1);
    if (categoryid == 18) {
        if (itemid == 0)
            localplayer.vehicle.toggleMod(18, true);
        else localplayer.vehicle.toggleMod(18, false);
    }
    else if (categoryid == 20) {
        if (subcategory != null) localplayer.vehicle.setWheelType(parseInt(subcategory))
        localplayer.vehicle.setMod(23, parseInt(itemid));
    } else if (categoryid == 31) {
        localplayer.vehicle.setLights(2);
        if (itemid != 0) {            
            localplayer.vehicle.toggleMod(22, true); //todo lights
            mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, itemid);
            localplayer.vehicle.setMod(22, itemid);
        }
        else {            
            localplayer.vehicle.toggleMod(22, !1);
            mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, 255);
        }
    }else if (categoryid == 30 && subcategory == 4) {
        localplayer.vehicle.setExtraColours(i.pearlescentColor, itemid)
    }
    else if (categoryid == 30 && subcategory == 3) {
        localplayer.vehicle.setExtraColours(itemid, i.wheelColor)
    }
    else if (categoryid == 30 && subcategory == 48) {
        localplayer.vehicle.setMod(subcategory, itemid);
    }else if(categoryid == 41){
        localplayer.vehicle.setNumberPlateTextIndex(itemid);
    }
    else if(categoryid == 42){        
        localplayer.vehicle.setMod(14, itemid);
        localplayer.vehicle.startHorn(5000,mp.game.joaat("HELDDOWN"),false)        
    }else if(categoryid == 43){
        localplayer.vehicle.setWindowTint(itemid);
    }
    else localplayer.vehicle.setMod(categoryid, itemid);
    // mp.events.call('tupd',1); 30:{1:{colortype:4,color:{r:0,g:0,b:0}}}

});
mp.events.addDataHandler("colorType",function(e,a)
{    
    const i=e.getExtraColours(1,1),
    n=a.split("_");
    e.setModColor1(parseInt(n[0]),0,0),
    e.setModColor2(parseInt(n[1]),0),
    e.setExtraColours(i.pearlescentColor,i.wheelColor)
})
mp.events.add('Tuning:setColor', (category_id, subcategory_id, item_id, color) => {
    color = JSON.parse(color);
    const i = localplayer.vehicle.getExtraColours(1, 1);
    if (category_id == 30 && subcategory_id == 1) {
        localplayer.vehicle.setCustomPrimaryColour(color.r, color.g, color.b),//Основной цвет
            localplayer.vehicle.setModColor1(item_id, 0, 0),//Основной цвет
            localplayer.vehicle.setExtraColours(i.pearlescentColor, i.wheelColor)
    } else if (category_id == 30 && subcategory_id == 2) {
        localplayer.vehicle.setCustomSecondaryColour(color.r, color.g, color.b)// Дополнительный цвет           
        localplayer.vehicle.setModColor2(item_id, 0)// Дополнительный цвет
    }  else if (category_id == 32) {
        localplayer.vehicle.setNeonLightsColour(color.r, color.g, color.b)
        localplayer.vehicle.setNeonLightEnabled(0, true);
        localplayer.vehicle.setNeonLightEnabled(1, true);
        localplayer.vehicle.setNeonLightEnabled(2, true);
        localplayer.vehicle.setNeonLightEnabled(3, true);
    }
});
mp.events.add('Tuning:buyItems', function (type,components) {
    components = JSON.parse(components);
    let types = true;
    if(!Array.isArray(components)){
        components = [components];
        types = false
    }   
    NexusEvent.callRemote('Tuning:BuyItems', type, JSON.stringify(components),types);

});
mp.events.add('Tuning:ClearCart',()=>{
    if(lsc != null){
        lsc.execute(`tuning.cartItems = ${JSON.stringify([])}`)
    }
})
mp.events.add('Tuning:setCategory', (categoryid, subcategoryid) => {
    var availableItems = [];
    if (categoryid == undefined && subcategoryid == undefined) {
        if (categoryid == 20) {
            mp.events.call('CheckCarTuning', lastactivecategory)
        }
        lastactivecategory = null;
        lastsubcategoryid = null
        return;
    }
    lastactivecategory = categoryid;
    lastsubcategoryid = subcategoryid
    if (categoryid == 31) {
        mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, 0);
        localplayer.vehicle.setLights(2);
        localplayer.vehicle.toggleMod(22, false);
    }
    let counter = 0;
    if (!subcategoryid && subcategoryid != 0) {
        var categoryItems = [];
            carCategories.find(category => category.id === +categoryid).items.forEach(item => {
                if (counter <= localplayer.vehicle.getNumMods(categoryid) || categoryid == 31 || categoryid == 18 || categoryid == 41 || categoryid == 42|| categoryid == 43) {
                    categoryItems.push({
                        id: item.id,
                        name: item.name,
                        price: item.price
                    })
                }
                counter++
            });
        availableItems = categoryItems;
    }
    else {
        availableItems = carCategories.find(category => category.id === +categoryid).subcategories.find(subcategory => subcategory.id === +subcategoryid).items;
    }
    lsc.execute(`tuning.availableItems=${JSON.stringify(availableItems)}`)
})
mp.events.add('tupd', (id) => {
    lscSpeed = (mp.game.vehicle.getVehicleModelMaxSpeed(localplayer.vehicle.model) / 1.2).toFixed();
    lscBrakes = localplayer.vehicle.getMaxBraking() * 100;
    lscBoost = localplayer.vehicle.getAcceleration() * 100;
    lscСlutch = localplayer.vehicle.getMaxTraction() * 10;
    let currentCharacteristics = { maxSpeed: +lscSpeed, acceleration: +lscBoost, brakingDistances: +lscBrakes, clutch: +lscСlutch };
    let maxCharacteristics = { maxSpeed: 100, acceleration: 100, brakingDistances: 100, clutch: 100 };
    lsc.execute(`tuning.newCharacteristics = ${JSON.stringify(currentCharacteristics)}`);
    lsc.execute(`tuning.maxCharacteristics = ${JSON.stringify(maxCharacteristics)}`);
});
mp.events.add('tuningSeatsCheck', function (type) {
    for (var i = 0; i < 7; i++)
        if (localplayer.vehicle.getPedInSeat(i) !== 0) {
            mp.events.call('notify', 4, 9, 'Попросите выйти всех пассажиров', 3000);
            return;
        }

    NexusEvent.callRemote('tuningSeatsCheck', type);
});
mp.events.add('freezeveh', function (toggle) {    
    localplayer.vehicle.freezePosition(toggle);    
});
mp.events.add('setOnGroundProperly', function (vehicle) {    
    if(vehicle) vehicle.setOnGroundProperly();    
});

mp.events.add('CreateCam', () => {
    var vehPosition = localplayer.vehicle.position; // спавн авто
    createCam(vehPosition.x, vehPosition.y, vehPosition.z, 0, 0, 1.701622, 50); // координаты камеры и ротация 
    localplayer.vehicle.setOnGroundProperly();
});
mp.events.add('tuningUpd', function (components) {
    vehicleComponents = JSON.parse(components);
    let activeitems = GetActiveItem();
    if (lsc != null) {
        lsc.execute(`tuning.onCarItems = ${JSON.stringify(activeitems)}`)
    }    
    mp.events.call('tupd', 2);
});


mp.events.add("Tuning:activeRotation",()=>{
    cameraRotator.pause(false);
})
mp.events.add("Tuning:disableRotation",()=>{
    cameraRotator.pause(true);
})
function createCam(x, y, z, rx, ry, rz, viewangle) {
    // camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
    camera = mp.cameras.new("default");
    camera.setCoord(x, y, z);
    camera.setRot(rx, ry, rz, 2);
    camera.setFov(viewangle);
    camera.setActive(true);

    var vehPosition = localplayer.vehicle.position; // спавн авто
    cameraRotator.start(camera, vehPosition, vehPosition, new mp.Vector3(-2.7, 3.0, 0.5), 180);
    cameraRotator.setZBound(-0.8, 1.8);
    cameraRotator.setZUpMultipler(5);
    cameraRotator.pause(true);

    mp.game.cam.renderScriptCams(true, true, 3000, true, false);
}
mp.events.add('Tuning:closeApp', function () {
    // mp.game.ui.setPauseMenuActive(false);     
    cameraRotator.stop();
    mp.game.cam.renderScriptCams(false, true, 3000, true, true);
    // activeCategory = null;
    // activeItem = null;
    carCategories = [];
    if (lsc != null) {
        NexusEvent.callRemote('exitTuning');
        lsc.destroy();
        lsc = null;
    }
    global.menuClose();
    // mp.game.ui.setPauseMenuActive(false);    
});


var ComponentsReplace = {
    0: "Spoiler",
    1: "FrontBumper",
    2: "RearBumper",
    3: "SideSkirt",
    4: "Muffler",
    5: "Body",
    6: "Lattice",
    7: "Hood",
    8: "Wings",
    9: "RearBumper",
    10: "Roof",
    11: "Engine",
    12: "Brakes",
    13: "Transmission",
    14: "",
    15: "Suspension",
    18: "Turbo",
    20: "Wheels",
    31: "Headlights",
    32: "NeonColor",
    41: "NumberPlate",
    42: "Horn",
    43: "WindowTint",
    48: "Vinyls",
    getKey(value) {
        for (x in ComponentsReplace) {
            if (ComponentsReplace[x] === value) return x
        }
    },
    getValue(key) {
        return ComponentsReplace[x]
    }
}
function GetActiveItem(){
    let activeitems = {};
    for (let index in vehicleComponents) {
        if (index != "PrimColor"
            && index != "SecColor"
            && index != "NeonColor"
            && index != "PrimModColor"
            && index != "SecModColor"
            && index != "PearlescentColor"
            && index != "Wheels"
            && index != "WheelsType"
            && index != "Vinyls"
            && index != "WheelColor") {
            activeitems[ComponentsReplace.getKey(index)] = vehicleComponents[index];
        }else if(index == "PrimColor"){
            if(index == "PrimColor") activeitems[30] = {
                1:{
                    id:vehicleComponents["PrimModColor"],
                    color:{
                        r:vehicleComponents["PrimColor"].Red,
                        g:vehicleComponents["PrimColor"].Green,
                        b:vehicleComponents["PrimColor"].Blue
                    }
                },
                2:{
                    id:vehicleComponents["SecModColor"],
                    color:{
                        r:vehicleComponents["SecColor"].Red,
                        g:vehicleComponents["SecColor"].Green,
                        b:vehicleComponents["SecColor"].Blue
                    }
                },
                3: vehicleComponents["PearlescentColor"],                    
                4: vehicleComponents["WheelColor"],
                48: vehicleComponents["Vinyls"],                
            }            
        }else if(index == "NeonColor") activeitems[32] = {
            id:1,
            color:{
                r:vehicleComponents["NeonColor"].Red,
                g:vehicleComponents["NeonColor"].Green,
                b:vehicleComponents["NeonColor"].Blue
            }
        }
        else if (index == "WheelsType") {
                activeitems[20] = {
                    [vehicleComponents["WheelsType"]]: vehicleComponents["Wheels"]
                }
        }
    }
    return activeitems;
}

}줵ͻ