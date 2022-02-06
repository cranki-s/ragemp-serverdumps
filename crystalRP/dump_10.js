{
﻿const vehheading = require("/utils/VehicleRotator.js");
var lsc = mp.browsers.new('package://cef/tuningauto/home.html');
lsc.active = false;
var lscSpeed = 0;
var lscBrakes = 0;
var lscBoost = 0;
var lscСlutch = 0;
var lscPage = 'home';
var lscSettedMod = -1;
var lscSettedWheelType = 0;
var lscSelected = -1;
var lscRGB = { r: 0, g: 0, b: 0 };
var lscPrimary = { r: 0, g: 0, b: 0 };
var lscSecondary = { r: 0, g: 0, b: 0 };
var lscNeon = { r: 0, g: 0, b: 0 };
var lscMyColor = 0;
var opened = false;
var priceMod = 1;
var isBike = false;
var modelPriceMod = 1;
var carName = "";
var mods;
//const vehheading = rotator;
setTimeout(function () { lsc.execute(`show(${false});`);lsc.active = false; }, 1500);

mp.events.add('hideTun', () => {
    lsc.execute(`show(${false});`);
    lsc.active = false;
});
mp.events.add('browserDomReady', (browser) => {
    if (browser === lsc && !opened) {
        lsc.execute(`show(${false});`);
        lsc.active = false;
    }
});
// Switch global page //
mp.events.add('tpage', (id) => {
    if (!opened) return;

    if (id == "exit_menu") {
		mp.events.call("hideColorp");
        lsc.execute(`show(${false});`);
        lsc.active = false;
		
        global.menuClose();
        tunCam.destroy();
		vehheading.stop();
        mp.game.cam.renderScriptCams(false, false, 0, true, true);
        mp.events.callRemote('exitTuning');
        opened = false;
    }
    else {
        lsc.execute(`window.location = 'package://cef/tuningauto/${id}.html'`);
        lsc.execute(`set(${lscSpeed},${lscBrakes},${lscBoost},${lscСlutch})`);
        if (categoryIds[id] <= 18 && categoryIds[id] != undefined && id != "numbers_menu" && id != "glasses_menu") {
			mods = localplayer.vehicle.getNumMods(categoryModsIds[id]);
			}
        if (id == "home") {
            setTimeout(function () { lsc.execute(`disable(${JSON.stringify(toDisable)});`); }, 150);
			
            //localplayer.vehicle.setHeading(148.9986);     
						

            if (lscPage == "numbers_menu") {
                localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
            }
            else if (lscPage == "paint_menu_three") {
              //  localplayer.vehicle.setNeonLightEnabled(0, false);
               // localplayer.vehicle.setNeonLightEnabled(1, false);
               // localplayer.vehicle.setNeonLightEnabled(2, false);
               // localplayer.vehicle.setNeonLightEnabled(3, false);
                mp.events.call("hideColorp");
            }
            else if (lscPage == "glasses_menu") {
                localplayer.vehicle.setWindowTint(lscSettedMod);
            }
            else if (lscPage != "paint_menu") {
                if (lscPage == "turbo_menu")
                    localplayer.vehicle.toggleMod(18, false);
                else if (lscPage == "lights_menu") {
                    mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, 0);
                    localplayer.vehicle.setLights(0);
                } else if (lscPage == "wheels_menu")
                    localplayer.vehicle.setWheelType(lscSettedWheelType);

                if (categoryModsIds[lscPage] == undefined) return;
                localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
            }
        }
        else if (categoryIds[id] != undefined) {

            //localplayer.vehicle.setHeading(categoryPositions[categoryIds[id]].CarHeading);

            if (id == "numbers_menu") {
                lscSettedMod = localplayer.vehicle.getNumberPlateTextIndex();
            }
            else if (id == "glasses_menu") {
                lscSettedMod = localplayer.vehicle.getWindowTint();
            }
            else if (id == "paint_menu") {
                if (lscPage != "home") {
                    mp.events.call("hideColorp");
                    localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
                    localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
                }
                else {
                    lscPrimary = localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
                    lscSecondary = localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
                    lscNeon = localplayer.vehicle.getNeonLightsColour(1, 1, 1);
                }
            }
            else {
                if (lscPage == "home") {
                    if (id == "lights_menu") {
                        localplayer.vehicle.setLights(0);
                        if (id >= 0) mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, lscSettedMod);
                    } else if (id == "wheels_menu")
                        lscSettedWheelType = localplayer.vehicle.getWheelType();
                    lscSettedMod = localplayer.vehicle.getMod(categoryModsIds[id]);
                }
            }

            if (categoryIds[id] <= 18) {
                var prices = [];
                for (let key in global.tuningStandart[categoryIds[id]]) {
                    var price = global.tuningStandart[categoryIds[id]][key] * modelPriceMod *priceMod;;
                    prices.push([`${key}`, price.toFixed()]);
                }
                setTimeout(function () { 
				let temp = prices[prices.length];
                prices.unshift(prices.pop(temp));
				lsc.execute(`price(${JSON.stringify(prices)})`); 
				}, 150);
            }
			else if (categoryIds[id] <= 26) {
                var prices = [];
                for (var key in global.tuningStandart[categoryIds[id]]) {
                    var price = global.tuningStandart[categoryIds[id]][key]* modelPriceMod *priceMod;
                    prices.push([`${key}`, price.toFixed()]);
                }
                setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            }
			
        }
        else if (wheelsTypes[id] != undefined) {
            localplayer.vehicle.setWheelType(wheelsTypes[id]);
            var prices = [];
            for (var key in global.tuningWheels[wheelsTypes[id]]) {
                var price = global.tuningWheels[wheelsTypes[id]][key] *  modelPriceMod * priceMod;
                prices.push([`${key}`, price.toFixed()]);
            }
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
        }
		else if (colorsTypes[id] != undefined) {
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
		}
        else if (id == "paint_menu_one" || id == "paint_menu_two") {
            var price = 5000 * priceMod;
            var prices = ["buy", price.toFixed()];
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            mp.events.call("showColorp");
        }
        else if (id == "paint_menu_three") {
            var price = 250000 * priceMod;
            var prices = ["buy", price.toFixed()];
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            if (!isBike) mp.events.call("showColorp");
		
        }
        else if (id == "paint_menu_five") {
            var price = 250000 * modelPriceMod;
            var prices = ["buy", price.toFixed()];
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            //if (!isBike) mp.events.call("showColorp");
		
        }
        if (toDisable.includes(id)) {
            mp.events.call('tpage', "home");
            mp.events.call('notify', 1, 4, "Этот раздел недоступен для Вашего транспорта.", 3000);
        }

        setTimeout(function () { mp.events.call('tupd',id); }, 150);
        lscPage = id;
    }
})
// Forced update //
mp.events.add('tupd', (id) => {
    if (categoryIds[id] <= 18 && categoryIds[id] != undefined && id != "numbers_menu" && id != "glasses_menu") {
        lsc.execute(`box.tunings='${mods}'`);
    }
    lscSpeed = (mp.game.vehicle.getVehicleModelMaxSpeed(localplayer.vehicle.model) / 1.2).toFixed();
    lscBrakes = localplayer.vehicle.getMaxBraking() * 100;
    lscBoost = localplayer.vehicle.getAcceleration() * 100;
    lscСlutch = localplayer.vehicle.getMaxTraction() * 10;
    lsc.execute(`set(${lscSpeed},${lscBrakes},${lscBoost},${lscСlutch})`);
})
// Click on element //
mp.events.add('tclk', (id) => {
    if (id == undefined) return;

    id = parseInt(id);
    var setted = false;
    switch (lscPage) {
        case "muffler_menu":
            if (vehicleComponents.Muffler == id) setted = true;
            break;
        case "sideskirt_menu":
            if (vehicleComponents.SideSkirt == id) setted = true;
            break;
        case "hood_menu":
            if (vehicleComponents.Hood == id) setted = true;
            break;
        case "spoiler_menu":
            if (vehicleComponents.Spoiler == id) setted = true;
            break;
        case "lattice_menu":
            if (vehicleComponents.Lattice == id) setted = true;
            break;
        case "wings_menu":
            if (vehicleComponents.Wings == id) setted = true;
            break;
        case "roof_menu":
            if (vehicleComponents.Roof == id) setted = true;
            break;
        case "flame_menu":
            if (vehicleComponents.Vinyls == id) setted = true;
            break;
        case "bamper_menu_front":
            if (vehicleComponents.FrontBumper == id) setted = true;
            break;
        case "bamper_menu_back":
            if (vehicleComponents.RearBumper == id) setted = true;
            break;
        case "engine_menu":
            if (vehicleComponents.Engine == id) setted = true;
            break;
        case "turbo_menu":
            if (vehicleComponents.Turbo == id) setted = true;
            break;
        case "horn_menu":
            if (vehicleComponents.Horn == id) setted = true;
            break;
        case "transmission_menu":
            if (vehicleComponents.Transmission == id) setted = true;
            break;
		case "armor_menu":
            if (vehicleComponents.Armor == id) setted = true;
            break;
        case "glasses_menu":
            if (vehicleComponents.WindowTint == id) setted = true;
            break;
        case "suspention_menu":
            if (vehicleComponents.Suspension == id) setted = true;
            break;
        case "brakes_menu":
            if (vehicleComponents.Brakes == id) setted = true;
            break;
        case "lights_menu":
            if (vehicleComponents.Headlights == id) setted = true;
            break;
        case "numbers_menu":
            if (vehicleComponents.NumberPlate == id) setted = true;
            break;
        case "wheels_exclusive":
        case "wheels_lowrider":
        case "wheels_musclecar":
        case "wheels_4x4":
        case "wheels_sport":
        case "wheels_4x4_2":
        case "wheels_tuner":
            if (vehicleComponents.WheelsType == wheelsTypes[lscPage] && vehicleComponents.Wheels == id) setted = true;
            break;
    }

    if (setted)
        mp.events.call('notify', 1, 9, "У Вас уже установлена данная модификация", 3000);
    else {
        lsc.execute(`show(${false});`);
        opened = false;
        lscSelected = id;

        if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three" || lscPage === "paint_menu_four")
            mp.events.call("hideColorp");

        var title = (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three" || lscPage === "paint_menu_five") ? "Покрасить машину?" : "Установить данную модификацию?";
        mp.events.call('openDialog', 'tuningbuy', title);
    }
})
var takedcolor = {
    "#0d1116":0,
    "#1c1d21":1,
    "#32383d":2,
    "#454b4f":3,
    "#999da0":4,
    "#c2c4c6":5,
    "#979a97":6,
    "#637380":7,
    "#63625c":8,
    "#3c3f47":9,
    "#444e54":10,
    "#1d2129":11,
    "#13181f":12,
    "#26282a":13,
    "#515554":14,
    "#151921":15,
    "#1e2429":16,
    "#333a3c":17,
    "#8c9095":18,
    "#39434d":19,
    "#506272":20,
    "#1e232f":21,
    "#363a3f":22,
    "#a0a199":23,
    "#d3d3d3":24,
    "#b7bfca":25,
    "#778794":26,
    "#c00e1a":27,
    "#da1918":28,
    "#b6111b":29,
    "#a51e23":30,
    "#7b1a22":31,
    "#8e1b1f":32,
    "#6f1818":33,
    "#49111d":34,
    "#b60f25":35,
    "#d44a17":36,
    "#c2944f":37,
    "#f78616":38,
    "#cf1f21":39,
    "#732021":40,
    "#f27d20":41,
    "#ffc91f":42,
    "#9c1016":43,
    "#de0f18":44,
    "#8f1e17":45,
    "#a94744":46,
    "#b16c51":47,
    "#371c25":48,
    "#132428":49,
    "#122e2b":50,
    "#12383c":51,
    "#31423f":52,
    "#155c2d":53,
    "#1b6770":54,
    "#66b81f":55,
    "#22383e":56,
    "#1d5a3f":57,
    "#2d423f":58,
    "#45594b":59,
    "#65867f":60,
    "#222e46":61,
    "#233155":62,
    "#304c7e":63,
    "#47578f":64,
    "#637ba7":65,
    "#394762":66,
    "#d6e7f1":67,
    "#76afbe":68,
    "#345e72":69,
    "#0b9cf1":70,
    "#2f2d52":71,
    "#282c4d":72,
    "#2354a1":73,
    "#6ea3c6":74,
    "#112552":75,
    "#1b203e":76,
    "#275190":77,
    "#608592":78,
    "#2446a8":79,
    "#4271e1":80,
    "#3b39e0":81,
    "#1f2852":82,
    "#253aa7":83,
    "#1c3551":84,
    "#4c5f81":85,
    "#58688e":86,
    "#74b5d8":87,
    "#ffcf20":88,
    "#fbe212":89,
    "#916532":90,
    "#e0e13d":91,
    "#98d223":92,
    "#9b8c78":93,
    "#503218":94,
    "#473f2b":95,
    "#221b19":96,
    "#653f23":97,
    "#775c3e":98,
    "#ac9975":99,
    "#6c6b4b":100,
    "#402e2b":101,
    "#a4965f":102,
    "#46231a":103,
    "#752b19":104,
    "#bfae7b":105,
    "#dfd5b2":106,
    "#f7edd5":107,
    "#3a2a1b":108,
    "#785f33":109,
    "#b5a079":110,
    "#fffff6":111,
    "#eaeaea":112,
    "#b0ab94":113,
    "#453831":114,
    "#2a282b":115,
    "#726c57":116,
    "#6a747c":117,
    "#354158":118,
    "#9ba0a8":119,
    "#5870a1":120,
    "#eae6de":121,
    "#dfddd0":122,
    "#f2ad2e":123,
    "#f9a458":124,
    "#83c566":125,
    "#f1cc40":126,
    "#4cc3da":127,
    "#4e6443":128,
    "#bcac8f":129,
    "#f8b658":130,
    "#fcf9f1":131,
    "#fffffb":132,
    "#81844c":133,
    "#ffffff":134,
    "#f21f99":135,
    "#fdd6cd":136,
    "#df5891":137,
    "#f6ae20":138,
    "#b0ee6e":139,
    "#08e9fa":140,
    "#0a0c17":141,
    "#0c0d18":142,
    "#0e0d14":143,
    "#9f9e8a":144,
    "#621276":145,
    "#0b1421":146,
    "#11141a":147,
    "#6b1f7b":148,
    "#1e1d22":149,
    "#bc1917":150,
    "#2d362a":151,
    "#696748":152,
    "#7a6c55":153,
    "#c3b492":154,
    "#5a6352":155,
    "#81827f":156,
    "#afd6e4":157,
    "#7a6440":158,
    "#7f6a48":159,
}
var lastactivecolor = -1;
// Hover on element //
mp.events.add('thov', (id) => {
    if (lscPage === "wheels_menu") return;
	if (lscPage === "paint_menu_four")
	{
        let index;
        switch(parseInt(id)){
            case 0:
                index = 0;
                break;
            case 12:
                index = 3;
                break;
            case 118:
                index = 4;
                break;
            case 120:
                index = 5;
                break;
        }
		localplayer.vehicle.setModColor1(parseInt(index),0,0)
	}
    if (lscPage == "paint_menu_five")
	{
        if(id == "buy") return;   
       // mp.events.callRemote('console', id);
      //  mp.events.callRemote('console',takedcolor[id.toLowerCase()])  ;
        lastactivecolor = takedcolor[id.toLowerCase()];
        localplayer.vehicle.setExtraColours(lastactivecolor, 0);
	}
    if (lscPage == "numbers_menu") {
        localplayer.vehicle.setNumberPlateTextIndex(parseInt(id));
    }
    else if (lscPage == "glasses_menu") {
        localplayer.vehicle.setWindowTint(parseInt(id));
    }
    else if (lscPage == "horn_menu") {
        //localplayer.vehicle.startHorn(1000, hornNames[id], false);
    }
    else if (lscPage == "lights_menu") {
        localplayer.vehicle.setLights(0);
        if (id >= 0) {
            localplayer.vehicle.setMod(22, 0);
            mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, parseInt(id));
        } else localplayer.vehicle.setMod(22, -1);
    }
    else {
        if (categoryModsIds[lscPage] != undefined) {
            if (lscPage == "turbo_menu")
                localplayer.vehicle.toggleMod(18, true);
            localplayer.vehicle.setMod(categoryModsIds[lscPage], parseInt(id));
            mp.events.call('tupd');
        }
        else if (wheelsTypes[lscPage] != undefined) {
            localplayer.vehicle.setMod(23, parseInt(id));
        }
		
    }
})

// Buy element //
mp.events.add('tunbuy', (state) => {
	// lscSelected == id on html
    if (state) {
        if (wheelsTypes[lscPage] != undefined)
            mp.events.callRemote('buyTuning', 19, lscSelected, wheelsTypes[lscPage]);
        else if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three" || lscPage === "paint_menu_four" || lscPage == "paint_menu_five") {
            var paintType;            
            if (lscPage == "paint_menu_five"){
               // mp.events.callRemote('console',parseInt(lastactivecolor));
                 mp.events.callRemote('buyTuning', 22, parseInt(lastactivecolor));            
            }
            else if (lscPage === "paint_menu_one") paintType = 0;
            else if (lscPage === "paint_menu_two") paintType = 1;
            else if (lscPage === "paint_menu_three") paintType = 2;
			else if (lscPage === "paint_menu_four" && lscSelected == -1) paintType = 3;
            if (paintType == 2 && isBike) {
                mp.events.call('notify', 1, 4, "Этот раздел недоступен для мотоциклов.", 3000);
                lsc.execute(`show(${true});`);
                lsc.active = true;
                opened = true;
            }
			else if (lscPage === "paint_menu_four")
			{
				mp.events.callRemote('buyTuning', 21, lscSelected);
				lscMyColor = lscSelected;
            //    localplayer.vehicle.setModColor1(paintType, lscMyColor , pearlescentColor = 45);
			}
            else if(lscPage != "paint_menu_five") mp.events.callRemote('buyTuning', 20, paintType, lscRGB.r, lscRGB.g, lscRGB.b);
        }
        else
            mp.events.callRemote('buyTuning', categoryIds[lscPage], lscSelected, -1);
    }
    else {
        lsc.execute(`show(${true});`);
        lsc.active = true;
        opened = true;
        if (lscPage == "numbers_menu") {
            localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
        }
        else if (lscPage == "glasses_menu") {
            localplayer.vehicle.setWindowTint(lscSettedMod);
        }
        else if (lscPage == "paint_menu_one") {
            localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
        }
        else if (lscPage == "paint_menu_two") {
            localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
        }
        else if (lscPage == "paint_menu_three") {
            localplayer.vehicle.setNeonLightsColour(lscNeon.r, lscNeon.g, lscNeon.b);
        }else if(lscPage == "paint_menu_five") localplayer.vehicle.setExtraColours(-1, 0);
        else {
            if (lscPage == "turbo_menu")
                localplayer.vehicle.toggleMod(18, false);

            if (categoryModsIds[lscPage] == undefined) return;
            localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
        }
    }
})
mp.events.add('tunBuySuccess', (id) => {
    lsc.execute(`show(${true});`);
    lsc.active = true;
    opened = true;
    if (id != -2) {

        lscSettedMod = id;
        if (wheelsTypes[lscPage] != undefined)
            lscSettedWheelType = localplayer.vehicle.getWheelType();
        else if (lscPage == "paint_menu_one") {
            mp.events.call("showColorp");
            lscPrimary = localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_two") {
            mp.events.call("showColorp");
            lscSecondary = localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_three") {
            mp.events.call("showColorp");
            lscNeon = localplayer.vehicle.getNeonLightsColour(1, 1, 1);
        } else if (colorsTypes[lscPage] != undefined) {
			//localplayer.vehicle.setColor(lscMyColor, 0);
		}
		
		
		
    }
})
mp.events.add('tunColor', function (c) {
    if (!opened) return;
    if (lscPage == "paint_menu_one") {
        localplayer.vehicle.setCustomPrimaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
    else if (lscPage == "paint_menu_two") {
        localplayer.vehicle.setCustomSecondaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
    else if (lscPage == "paint_menu_three") {
        localplayer.vehicle.setNeonLightsColour(c.r, c.g, c.b);
        localplayer.vehicle.setNeonLightEnabled(0, true);
        localplayer.vehicle.setNeonLightEnabled(1, true);
        localplayer.vehicle.setNeonLightEnabled(2, true);
        localplayer.vehicle.setNeonLightEnabled(3, true);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
});
var tunCam = null;
var categoryPositions = [
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
    { 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 42.08963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
	{ 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
];
var categoryIds = {
    "muffler_menu": 0,
    "sideskirt_menu": 1,
    "hood_menu": 2,
    "spoiler_menu": 3,
    "lattice_menu": 4,
    "wings_menu": 5,
    "roof_menu": 6,
    "flame_menu": 7,
    "bamper_menu_front": 8,
    "bamper_menu_back": 9,
    "engine_menu": 10,
    "turbo_menu": 11,
    "horn_menu": 12,
    "transmission_menu": 13,
    "glasses_menu": 14,
    "suspention_menu": 15,
    "brakes_menu": 16,
    "lights_menu": 17,
    "numbers_menu": 18,
    "wheels_menu": 19,
    "paint_menu": 20,
	"paint_1": 21,
	"paint_2": 21,
	"paint_3": 21,
	"paint_4": 21,
	"paint_5": 21,
	"armor_menu": 26,
};
var categoryModsIds = {
	"spoiler_menu": 0,
	"bamper_menu_front": 1,
    "bamper_menu_back": 2,
    "sideskirt_menu": 3,
	"muffler_menu": 4,
    "lattice_menu": 6,
    "hood_menu": 7,
    "wings_menu": 8,
    "roof_menu": 10,
	"engine_menu": 11,
	"brakes_menu": 12,
	"transmission_menu": 13,
	"horn_menu": 14,
	"suspention_menu": 15,
	"armor_menu": 16,
	"turbo_menu": 18,
	"lights_menu": 22,
    "wheels_menu": 23,
    "flame_menu": 48,
    
};
var categoryMods = [
    { Name: "muffler_menu", Index: 4 },
    { Name: "sideskirt_menu", Index: 3 },
    { Name: "hood_menu", Index: 7 },
    { Name: "spoiler_menu", Index: 0 },
    { Name: "lattice_menu", Index: 6 },
    { Name: "wings_menu", Index: 8 },
    { Name: "roof_menu", Index: 10 },
    { Name: "flame_menu", Index: 48 },
    { Name: "bamper_menu", Index: 1 },
];
var hornNames = {
    "HORN_STOCK": -1,
    "HORN_TRUCK": 0,
    "HORN_POLICE": 1,
    "HORN_CLOWN": 2,
    "HORN_MUSICAL1": 3,
    "HORN_MUSICAL2": 4,
    "HORN_MUSICAL3": 5,
    "HORN_MUSICAL4": 6,
    "HORN_MUSICAL5": 7,
    "HORN_SADTROMBONE": 8,
    "HORN_CALSSICAL1": 9,
    "HORN_CALSSICAL2": 10,
    "HORN_CALSSICAL3": 11,
    "HORN_CALSSICAL4": 12,
    "HORN_CALSSICAL5": 13,
    "HORN_CALSSICAL6": 14,
    "HORN_CALSSICAL7": 15,
    "HORN_SCALEDO": 16,
    "HORN_SCALERE": 17,
    "HORN_SCALEMI": 18,
    "HORN_SCALEFA": 19,
    "HORN_SCALESOL": 20,
    "HORN_SCALELA": 21,
    "HORN_SCALETI": 22,
    "HORN_SCALEDO_HIGH": 23,
    "HORN_JAZZ1": 24,
    "HORN_JAZZ2": 25,
    "HORN_JAZZ3": 26,
    "HORN_JAZZLOOP": 27,
    "HORN_STARSPANGBAN1": 28,
    "HORN_STARSPANGBAN2": 29,
    "HORN_STARSPANGBAN3": 30,
    "HORN_STARSPANGBAN4": 31,
    "HORN_CLASSICALLOOP1": 32,
    "HORN_CLASSICAL8": 33,
    "HORN_CLASSICALLOOP2": 34,
};
var wheelsTypes = {
    "wheels_exclusive": 7,
    "wheels_lowrider": 2,
    "wheels_musclecar": 1,
    "wheels_4x4": 3,
    "wheels_sport": 0,
    "wheels_4x4_2": 4,
    "wheels_tuner": 5,
};

var colorsTypes = {
    "paint_1": 1,
    "paint_2": 2,
    "paint_3": 3,
    "paint_4": 4,
    "paint_5": 5
};

var toDisable = [];
var vehicleComponents = {};
mp.events.add('tuningUpd', function (components) {
    vehicleComponents = JSON.parse(components);
});
mp.events.add('openTun', (priceModief, carModel, modelPriceModief, components, vehclass) => {
    opened = true;
    global.menuOpen();
    toDisable = ["protection_menu"];
    categoryMods.forEach(element => {
        if (localplayer.vehicle.getNumMods(element.Index) <= 0) toDisable.push(element.Name);
    });
    isBike = false;

    if (vehclass == 8) {
        isBike = true;
        toDisable = ["armor_menu", "protection_menu", "muffler_menu", "sideskirt_menu", "hood_menu", "spoiler_menu", "lattice_menu", "wings_menu", "roof_menu", "flame_menu", "bamper_menu", "turbo_menu", "transmission_menu", "suspention_menu", "horn_menu", "wheels_menu", "glasses_menu", "paint_menu_three"];
    }

    lsc.execute(`disable(${JSON.stringify(toDisable)});`);
    mp.events.call('tupd');
    lsc.execute(`show(${true});`);
    lsc.active = true;

    priceMod = priceModief / 100;
    modelPriceMod = modelPriceModief;
    carName = carModel;

    tunCam = mp.cameras.new('default', new mp.Vector3(-333.7966, -137.409, 40.58963), new mp.Vector3(0, 0, 0), 60);
    tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
    tunCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
	
	
	
	setTimeout(function () { localplayer.vehicle.position = new mp.Vector3(-337.7784, -136.5316, 38.6032); }, 1500);
	
	vehheading.start(localplayer.vehicle);

    vehicleComponents = JSON.parse(components);
});

mp.events.add('tuningSeatsCheck', function () {
    var veh = localplayer.vehicle;
    for (var i = 0; i < 7; i++)
        if (veh.getPedInSeat(i) !== 0) {
            mp.events.call('notify', 4, 9, 'Попросите выйти всех пассажиров', 3000);
            return;
        }
    mp.events.callRemote('tuningSeatsCheck');
});
}⒩죀ϝ