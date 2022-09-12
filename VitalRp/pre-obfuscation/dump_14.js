{

let modShopWindow = null;

mp.events.add("Display_ModMenu", (cartlist, owner) => {
    let interior = mp.game.interior.getInteriorAtCoords(-331.20215, -122.48373, 39.013885);
    if (interior !== mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle)) {
        return;
    }
    if (modShopWindow === null) {
        modShopWindow = mp.browsers.new("package://cef/Interfaces/Factions/LSC/index.html");
    }
    modShopWindow.execute(`app.loadCartfromServer('${cartlist}', ${owner});`)
    mp.events.call("freeze", true);
    mp.events.call("freezeEx", true);
    mp.gui.cursor.visible = true;
});


mp.events.add("saveCart", (list) => {
    mp.events.callRemote("SaveCart", vehicle.getVariable("vehicle_sql_id"),list);
});

mp.events.add("applyVehMod", (id, item) => {
    mp.events.callRemote("ApplyMechanicMod", id, item)
})

mp.events.add("CloseModShopMenu", () => {
    if (modShopWindow != null) {
        modShopWindow.destroy();
        modShopWindow = null;
        mp.gui.cursor.visible = false;
    }
});

mp.events.add("finishMechWork", (vehId) => {
    mp.events.callRemote("FinishMechanicWork", vehId)
    if (modShopWindow != null) {
        modShopWindow.destroy();
        modShopWindow = null;
        mp.gui.cursor.visible = false;
    }
});

mp.events.add("displaymechanicCart", (id, cartlist) => {
    let interior = mp.game.interior.getInteriorAtCoords(-331.20215, -122.48373, 39.013885);
    if (interior !== mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle)) {
        return;
    }
    if (modShopWindow === null) {
        modShopWindow = mp.browsers.new("package://cef/Interfaces/Factions/LSCMech/index.html");
    }
    modShopWindow.execute(`app.loadCartfromServer('${cartlist}', ${id});`)
    mp.gui.cursor.visible = true;
})

mp.events.add("CloseModShop", () => {
    mp.events.callRemote("LeaveMenu");
});


mp.events.add("showDraft", (changedMods, initialMods, totalCost) => {
    const chMod = (({ index, active }) => ({ index, active }))(changedMods);

    //let { index, active, ...chMod } = changedMods;
    //let { index, active, ...inMod } = initialMods;
    mp.events.call("consoleLog", JSON.stringify(changedMods));
    //mp.events.call("consoleLog", JSON.stringify(inMod));
    mp.events.call("consoleLog", totalCost);
});
mp.events.add("setVehicleColor", (colorType, colorId) => {
    if (mp.players.local.vehicle != null) {
        mp.events.callRemote("ApplyVehicleModification", colorType, colorId)
    }
});
//Sammy
mp.events.add("setVehicleColorTest", (colorType, colorId) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        vehicle.setColours(1, 1);
       // mp.gui.chat.push("ColorType: " + colorType + " ColorID: " + colorId);
    }
});
//------------------------
mp.events.add("setPrimaryCustom", (r, g, b) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        let extraColors = vehicle.getExtraColours(0, 0)
        vehicle.setCustomPrimaryColour(Math.abs(r), Math.abs(g), Math.abs(b));
        vehicle.setExtraColours(extraColors.pearlescentColor, extraColors.wheelColor);
    }
});

mp.events.add("setNeonRGB", (r, g, b) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        for (i = 0; i < 4; i++) {
            vehicle.setNeonLightEnabled(i, true);
        }
        vehicle.setNeonLightsColour(Math.abs(r), Math.abs(g), Math.abs(b));
    }
});


mp.events.add("setSmokeRGB", (r, g, b) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        vehicle.toggleMod(20, true);
        vehicle.setTyreSmokeColor(Math.abs(r), Math.abs(g), Math.abs(b));
    }
});

mp.events.add("setSecondaryCustom", (r, g, b) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        let extraColors = vehicle.getExtraColours(0, 0)
        vehicle.setCustomSecondaryColour(Math.abs(r), Math.abs(g), Math.abs(b));
        vehicle.setExtraColours(extraColors.pearlescentColor, extraColors.wheelColor);
    }
});


mp.events.add("removePrimaryRGB", (type, id) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        vehicle.clearCustomPrimaryColour();
        let extraColors = vehicle.getExtraColours(0, 0)
        vehicle.setModColor1(type, id, 0);
        vehicle.setExtraColours(extraColors.pearlescentColor, extraColors.wheelColor);

        const primaryRGB = {
            index: "primaryRGB",
            max: 1,
            slotName: "Primary RGB",
            active: 0,
            options: vehicle.getCustomPrimaryColour(0, 0, 0),
            prices: ["1000"],
            category: "Primary"
        };

        modShopWindow.execute(`app.reloadPrimaryRGB(${JSON.stringify(primaryRGB)});`)

    }
});


mp.events.add("removeSecondaryRGB", (type, id) => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle != null) {
        vehicle.clearCustomSecondaryColour();
        let extraColors = vehicle.getExtraColours(0, 0)
        vehicle.setModColor2(type, id);
        vehicle.setExtraColours(extraColors.pearlescentColor, extraColors.wheelColor);

        const secondaryRGB = {
            index: "secondaryRGB",
            max: 1,
            slotName: "Secondary RGB",
            active: 0,
            options: vehicle.getCustomSecondaryColour(0, 0, 0),
            prices: ["1000"],
            category: "Secondary"
        };
        modShopWindow.execute(`app.reloadSecondaryRGB(${JSON.stringify(secondaryRGB)});`)

    }
});




mp.events.add("setVehicleMod", (modIndex, modValue) => {
    let vehicle = mp.players.local.vehicle;
    //mp.gui.chat.push(`${modIndex} : ${modValue}`)
    if (vehicle != null) {
        if (modIndex === "wheelType") {
           // mp.gui.chat.push('test');
            vehicle.setMod(23, -1);
            vehicle.setWheelType(modValue);
            const wheelTypeMod = {
                index: 23,
                max: getVehicleMaxModOptions(vehicle, 23),
                slotName: vehicleMods[23].name,
                active: -1,
                options: getVehicleModOptionNames(vehicle, 23, getVehicleMaxModOptions(vehicle, 23)),
                category: "Body"
            };
            if (modShopWindow === undefined) {
                return;
            }
            mp.events.call("consoleLog", JSON.stringify(wheelTypeMod));
            modShopWindow.execute(`app.reloadWheels(${JSON.stringify(wheelTypeMod)});`)
        } else if (modIndex === "primaryColorType") {

            mp.events.call("removePrimaryRGB", modValue, 0);

            let vehCategory = getVehicleColor(modValue);



            const primaryColor = {
                index: "primaryColor",
                max: vehCategory.length,
                slotName: "Primary Color",
                active: 0,
                options: vehCategory,
                prices: [1000],
                category: "Primary"
            };

            modShopWindow.execute(`app.reloadPrimary(${JSON.stringify(primaryColor)});`)
        } else if (modIndex === "primaryColor") {
            let vehColor = vehicle.getModColor1(0, 0, 0)
            mp.events.call("removePrimaryRGB", vehColor.paintType, modValue);
        } else if (modIndex === "secondaryColorType") {
            mp.events.call("removeSecondaryRGB", modValue, 0);

            let vehCategory = getVehicleColor(modValue);



            const primaryColor = {
                index: "secondaryColor",
                max: vehCategory.length,
                slotName: "Secondary Color",
                active: 0,
                options: vehCategory,
                prices: [1000],
                category: "Secondary"
            };


            modShopWindow.execute(`app.reloadSecondary(${JSON.stringify(primaryColor)});`)
        } else if (modIndex === "secondaryColor") {
            let vehColor = vehicle.getModColor2(0, 0)
            mp.events.call("removeSecondaryRGB", vehColor.paintType, modValue);
        } else if (modIndex === "pearlescent") {
            let extraColors = vehicle.getExtraColours(0, 0)
            vehicle.setExtraColours(modValue, extraColors.wheelColor);
        } else if (modIndex === "wheelsColor") {
            let extraColors = vehicle.getExtraColours(0, 0)
            vehicle.setExtraColours(extraColors.pearlescentColor, modValue);
        } else if (modIndex === "dashboardColor") {
            mp.game.invoke("0x63140C89AD7622EF", vehicle.handle, modValue)
        } else if (modIndex === "interiorColor") {
            mp.game.invoke("0xCE01344F3CABBA9D", vehicle.handle, modValue)
        } else if (modIndex === "headlightColor") {
            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, headlightColors[modValue].id)
        } else if (modIndex === 46) {
            vehicle.setWindowTint(modValue);
        } else {
            vehicle.setMod(modIndex, modValue);
            //mp.events.call("consoleLog", JSON.stringify(modIndex));
           // mp.gui.chat.push(`${modIndex} : ${modValue}`)
        }



    }
});
mp.events.add("setVehicleExtra", (extraId, toggle) => {
    const vehicle = mp.players.local.vehicle;
    let extraToggleAsNumber = toggle ? 0 : 1;
    vehicle.setExtra(extraId, extraToggleAsNumber);
});

let test = 0;

let start = false;

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));



/*var playGames = setInterval(() => {
    if (mp.players.local.vehicle) {
        const vehicle = mp.players.local.vehicle;
        if (!start && vehicle.isNeonLightEnabled(0)) {
            start = true;
        }
        if (start) {

            vehicle.setNeonLightEnabled(i, false);
            vehicle.setNeonLightEnabled(i, true);
            if (test === 0) {
                vehicle.setNeonLightEnabled(0, true);
                vehicle.setNeonLightEnabled(1, true);
                vehicle.setNeonLightEnabled(2, false);
                vehicle.setNeonLightEnabled(3, false);
                vehicle.setNeonLightsColour(randomBetween(0, 255), randomBetween(0, 255), randomBetween(0, 255));

            }
            if (test === 1) {
                vehicle.setNeonLightEnabled(0, false);
                vehicle.setNeonLightEnabled(1, true);
                vehicle.setNeonLightEnabled(2, true);
                vehicle.setNeonLightEnabled(3, false);
                vehicle.setNeonLightsColour(randomBetween(0, 255), randomBetween(0, 255), randomBetween(0, 255));

            }
            if (test === 2) {
                vehicle.setNeonLightEnabled(0, false);
                vehicle.setNeonLightEnabled(1, false);
                vehicle.setNeonLightEnabled(2, true);
                vehicle.setNeonLightEnabled(3, true);
                vehicle.setNeonLightsColour(randomBetween(0, 255), randomBetween(0, 255), randomBetween(0, 255));

            }
            if (test === 3) {
                vehicle.setNeonLightEnabled(0, true);
                vehicle.setNeonLightEnabled(1, false);
                vehicle.setNeonLightEnabled(2, false);
                vehicle.setNeonLightEnabled(3, true);
                vehicle.setNeonLightsColour(randomBetween(0, 255), randomBetween(0, 255), randomBetween(0, 255));

            }
            if (test === 3) {
                test = 0;
            }
            else test++;
            
        }
    }
}, 200)*/




mp.events.add('getVehicleMods', () => {
    const vehicle = mp.players.local.vehicle;
    const mods = [];
    for (let i = 0; i <= 48; i++) {
        if (i === 17 || i === 19 || i === 21) {
            continue;
        }

        const mod = {
            index: i,
            max: 0,
            slotName: vehicle.getModSlotName(i),
            active: vehicle.getMod(i),
            pastActive: vehicle.getMod(i),
            pastRGB: null
        };

        mod.slotName = (vehicle.getModSlotName(i) !== undefined && vehicle.getModSlotName(i).indexOf("_") === -1) ? vehicle.getModSlotName(i) : mp.game.ui.getLabelText(String(vehicle.getModSlotName(i)));
        mod.slotName = mod.slotName === "NULL" ? vehicleMods[i].name : mod.slotName;
        mod.slotName = mod.slotName === "" ? vehicleMods[i].name : mod.slotName;
        mp.events.call("consoleLog", mod.slotName);
        mod.max = getVehicleMaxModOptions(vehicle, i);
        mod.options = getVehicleModOptionNames(vehicle, i, mod.max);
        mod.category = getVehicleModCategory(i);
        mod.prices = getVehicleModPrices(vehicle, i, mod.max);
        if (!Array.isArray(mod.options) || !mod.options.length) {
            continue;
        }
        mods.push(mod);
    }
    const wheelTypeMod = {
        index: "wheelType",
        max: 12,
        slotName: "Wheel Type",
        active: vehicle.getWheelType(),
        options: wheelTypes,
        prices: [],
        category: "Body",
        pastActive: vehicle.getWheelType(),
        pastRGB: null
    };

    let vehColor = vehicle.getModColor1(0, 0, 0)
    let vehCategory = getVehicleColor(vehColor.paintType);
    const primaryColorType = {
        index: "primaryColorType",
        max: 6,
        slotName: "Primary Color Type",
        active: vehColor.paintType > 5 ? 0 : vehColor.paintType,
        options: colorCategories,
        prices: colorPrice,
        category: "Primary",
        pastActive: vehColor.paintType > 5 ? 0 : vehColor.paintType,
        pastRGB: null
    };

    const primaryColor = {
        index: "primaryColor",
        max: vehCategory.length,
        slotName: "Primary Color",
        active: vehColor.color > 500 ? 0 : vehColor.color,
        options: vehCategory,
        prices: ["1000"],
        category: "Primary",
        pastActive: vehColor.color > 500 ? 0 : vehColor.color,
        pastRGB: null
    };

    const primaryRGB = {
        index: "primaryRGB",
        max: 1,
        slotName: "Primary RGB",
        active: 0,
        options: vehicle.getCustomPrimaryColour(0, 0, 0),
        prices: ["1000"],
        category: "Primary",
        pastActive: 0,
        pastRGB: vehicle.getCustomPrimaryColour(0, 0, 0)
    };



    let vehSecColor = vehicle.getModColor2(0, 0)
    let vehSecCategory = getVehicleColor(vehColor.paintType);



    const secondaryColorType = {
        index: "secondaryColorType",
        max: 6,
        slotName: "Secondary Color Type",
        active: vehSecColor.paintType > 5 ? 0 : vehSecColor.paintType,
        options: colorCategories,
        prices: colorPriceSecondary,
        category: "Secondary",
        pastActive: vehSecColor.paintType > 5 ? 0 : vehSecColor.paintType,
        pastRGB: null
    };

    const secondaryColor = {
        index: "secondaryColor",
        max: vehSecCategory.length,
        slotName: "Secondary Color",
        active: vehSecColor.color > 500 ? 0 : vehSecColor.color,
        options: vehSecCategory,
        prices: ["500"],
        category: "Secondary",
        pastActive: vehSecColor.color > 500 ? 0 : vehSecColor.color,
        pastRGB: null
    };

    const secondaryRGB = {
        index: "secondaryRGB",
        max: 1,
        slotName: "Secondary RGB",
        active: 0,
        options: vehicle.getCustomSecondaryColour(0, 0, 0),
        prices: ["500"],
        category: "Secondary",
        pastActive: 0,
        pastRGB: vehicle.getCustomSecondaryColour(0, 0, 0),
    };
    let extraColors = vehicle.getExtraColours(0, 0);


    const neonRGB = {
        index: "neonRGB",
        max: 1,
        slotName: "Neon Lights",
        active: 0,
        options: vehicle.getNeonLightsColour(0, 0, 0),
        prices: [1500],
        category: "NeonLight",
        pastActive: 0,
        pastRGB: vehicle.getNeonLightsColour(0, 0, 0),
    }


    const tyreRGB = {
        index: "smokeRGB",
        max: 1,
        slotName: "Tyre Smoke",
        active: 0,
        options: vehicle.getTyreSmokeColor(0, 0, 0),
        prices: [1000],
        category: "TyreRGB",
        pastActive: 0,
        pastRGB: vehicle.getTyreSmokeColor(0, 0, 0),
    }




    const pearlescent = {
        index: "pearlescent",
        max: vehicleColors.length,
        slotName: "Pearlescent",
        active: extraColors.pearlescentColor,
        options: [],
        prices: [2500],
        category: "Pearlescent",
        pastActive: extraColors.pearlescentColor,
        pastRGB: null
    }



    let interiorColoration = mp.game.invoke("0x1E4D0D5DE3802BC2", vehicle);
  //  mp.gui.chat.push(`${JSON.stringify(interiorColoration)}`)

    let dashboard = mp.game.invoke("0x04CE0BF11E7D9DE4", vehicle);
  //  mp.gui.chat.push(`${JSON.stringify(dashboard)}`)


    let headlighgColor = mp.game.invoke("0x3DFF319A831E0CDB", vehicle.handle);
    if (headlighgColor > 12) headlighgColor = 0;
    const headXenonColors = {
        index: "headlightColor",
        max: headlightColors.length,
        slotName: "Xenon Colors",
        active: headlighgColor + 1,
        options: headlightColors,
        prices: [500],
        category: "Design3",
        pastActive: headlighgColor + 1,
        pastRGB: null
    }


    const wheelColors = {
        index: "wheelsColor",
        max: vehicleColors.length,
        slotName: "Wheel Colors",
        active: extraColors.wheelColor,
        options: [],
        prices: [1000],
        category: "Design2",
        pastActive: extraColors.wheelColor,
        pastRGB: null
    }

    const dashboardColor = {
        index: "dashboardColor",
        max: vehicleColors.length,
        slotName: "Dashboard/Extra Color",
        active: 0,
        options: [],
        prices: [750],
        category: "Design2",
        pastActive: 0,
        pastRGB: null
    }

    const interiorColor = {
        index: "interiorColor",
        max: vehicleColors.length,
        slotName: "Interior/Extra Color",
        active: 0,
        options: [],
        prices: [750],
        category: "Design2",
        pastActive: 0,
        pastRGB: null
    }

    mods.push(wheelTypeMod);
    mods.push(headXenonColors);



    mods.push(primaryColorType);
    mods.push(primaryColor);
    mods.push(primaryRGB);

    mods.push(secondaryColorType);
    mods.push(secondaryColor);
    mods.push(secondaryRGB);
    mods.push(pearlescent);

    mods.push(wheelColors);
    mods.push(dashboardColor);
    mods.push(interiorColor);

    mods.push(tyreRGB);
    mods.push(neonRGB);

    let filteredMods = mods.filter(mod => !mod.slotName.includes("Weapons") && !mod.slotName.includes("Mine") && !mod.slotName.includes("Plating"));
    //mp.events.call("consoleLog", JSON.stringify(filteredMods));
    modShopWindow.execute(`app.loadMods(${JSON.stringify(filteredMods)});`);
});
mp.events.add('getVehicleColors', () => {
    modShopWindow.execute(`app.loadColors(${JSON.stringify(vehicleColors)});`);
});
mp.events.add('getVehicleExtras', () => {
    let extras = getVehicleExtras();
    modShopWindow.execute(`app.loadExtras(${JSON.stringify(extras)});`)
});

function getVehicleModPrices(vehicle, index, maxOptionValue) {
    const modPricingInfo = vehicleMods[index];
    const vehicleClass = vehicle.getClass();
    let prices = [];
    for (let i = -1; i < maxOptionValue; i++) {
            if (i === -1) {
                prices.push(Math.round(modPricingInfo.startPrice / 2));

            } else if (i === 0) {
                prices.push(Math.round(modPricingInfo.startPrice * vehicleClassMultipliers[vehicleClass].Multiplier));
            }
            else {
                prices.push(Math.round(prices[prices.length - 1] * modPricingInfo.multiplier));
            }

        
    }
    let active = vehicle.getMod(index)
    if (modPricingInfo.flatFee && active > -1) {
        let calculatedPrice = [];
        for (let i = -1; i < maxOptionValue; i++) {
            if (i <= active) {
                calculatedPrice.push(Math.round(modPricingInfo.startPrice / 2));
            }
            else {
                calculatedPrice.push(Math.round(prices[i] - prices[active]))
            }
        }
        return calculatedPrice;
    }
    else return prices;
}
mp.events.add("consoleLog", (text) => {
    mp.console.logInfo(`Log: ${text}`);
});
function getVehicleMaxModOptions(vehicle, modIndex) {
    let max = 0;
    switch (modIndex) {
        case 14: // Horns
            max = 35;
            break;
        case 18: // Turbo
        case 22: // Xenon
            max = 1;
            break;
        case 46: // Window Tints
            max = 4;
            break;
        default:
            max = vehicle.getNumMods(modIndex);
            break;
    }
    return max;
}

function getVehicleModCategory(modIndex) {
    let cat = "";
    switch (modIndex) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 23:
        case 24:
        case 25:
            cat = "Body";
            break;
        case 11:
        case 12:
        case 13:
        case 15:
        case 18:
            cat = "Performance";
            break;
        case 22:
            cat = "Design4";
            break;
        case 46:
        case 48:
            cat = "Design";
            break;
        case 14:
            cat = "Horns";
            break;
        default:
            cat = "Bennys";
            break;
    }
    return cat;
}

function getVehicleModOptionNames(vehicle, modIndex, maxOptionValue) {
    let options = []
    switch (modIndex) {
        case 11: // Engine
            options.push('EMS Upgrade, Level 1', 'EMS Upgrade, Level 2', 'EMS Upgrade, Level 3', 'EMS Upgrade, Level 4');
            break;
        case 12: // Brakes
            options.push('Street Brakes', 'Sport Brakes', 'Race Brakes');
            break;
        case 13: // Transmission
            options.push('Street Transmission', 'Sport Transmission', 'Race Transmission', 'Super Transmission');
            break;
        case 14: // Horns
            options.push('Truck Horn', 'Police Horn', 'Clown Horn', 'Musical Horn 1', 'Musical Horn 2', 'Musical Horn 3', 'Musical Horn 4', 'Musical Horn 5', 'Sadtrombone Horn', 'Classical Horn 1', 'Classical Horn 2', 'Classical Horn 3', 'Classical Horn 4', 'Classical Horn 5', 'Classical Horn 6', 'Classical Horn 7', 'Scaledo Horn', 'Scalere Horn', 'Scalemi Horn', 'Scalefa Horn', 'Scalesol Horn', 'Scalela Horn', 'Scaleti Horn', 'Scaledo Horn High', 'Jazz Horn 1', 'Jazz Horn 2', 'Jazz Horn 3', 'Jazzloop Horn', 'Starspangban Horn', 'Starspangban Horn', 'Starspangban Horn', 'Starspangban Horn', 'Classicalloop Horn', 'Classical Horn 8', 'Classicalloop Horn');
            break;
        case 15: // Suspensions
            options.push('Lowered Suspension', 'Street Suspension', 'Sport Suspension', 'Competition Suspension', 'Race Suspension');
            break;
        case 16: // Armour
            //options.push('Armour Upgrade 20%', 'Armour Upgrade 40%', 'Armour Upgrade 60%', 'Armour Upgrade 80%', 'Armour Upgrade 100%');
            break;
        case 18: // Turbo
            options.push('Turbo Tuning');
            break;
        case 22: // Lights
            options.push('Xenon Headlights');
            break;
        case 46: // Window Tint
            options.push('None', 'Pure Black', 'Dark Smoke', 'Light Smoke');
            break;
        default:
            for (let j = 0; j < maxOptionValue; j++) {
                options.push(mp.game.ui.getLabelText(String(vehicle.getModTextLabel(modIndex, j))));
            }
            break;
    }
    return options;
}

function getVehicleExtras() {
    const vehicle = mp.players.local.vehicle;
    const extras = [];
    for (let i = 0; i <= 14; i++) {
        if (vehicle.doesExtraExist(i)) {
            let extra = {
                id: i,
                toggle: vehicle.isExtraTurnedOn(i)
            }
            extras.push(extra);
        }
    }
    return extras;
}

function getWheelTypeName(wheelType) {
    return wheelTypes[wheelType];
}


function getVehicleColor(type) {
    if (type < 3) {
        return mainColors
    }
    else if (type === 3) {
        return matteColors;
    }
    else if (type === 4) {
        return metals;
    }
    else if (type === 5) {
        return chrome;
    }
    else return mainColors
}



const colorCategories = ["Normal", "Metallic", "Pearl", "Matte", "Metal", "Chrome"]
const colorPrice = [1000, 2000, 2000, 3000, 5000, 10000]
const colorPriceSecondary = [500, 1000, 1000, 1500, 2500, 5000]


const mainColors = ["Black", "Carbon Black", "Graphite", "Anthracite Black", "Black Steel", "Dark Steel", "Silver", "Bluish Silver", "Rolled Steel", "Shadow SIlver", "Stone Silver", "Midnight Silver", "Cast Iron Silver", "Red", "Torino Red", "Formula Red", "Lava Red", "Blaze Red", "Grace Red", "Garnet Red", "Sunset Red", "Cabernet Red", "Wine Red", "Candy Red", "Hot Pink", "Pfister Pink", "Salmon Pink", "Sunrise Orange", "Orange", "Bright Orange", "Gold", "Bronze", "Yellow", "Race Yellow", "Dew Yellow", "Dark Green", "Racing Green", "Sea Green", "Olive Green", "Bright Green", "Gasoline Green", "Lime Green", "Midnight Blue", "Galaxy Blue", "Dark Blue", "Saxon Blue", "Blue", "Mariner Blue", "Harbor Blue", "Diamond Blue", "Surf Blue", "Nautical Blue", "Racing Blue", "Ultra Blue", "Light Blue", "Chocolate Brown", "Bison Brown", "Creek Brown", "Feltzer Brown", "Maple Brown", "Beechwood Brown", "Sienna Brown", "Saddle Brown", "Moss Brown", "Woodbeech Brown", "Straw Brown", "Sandy Brown", "Bleached Brown", "Schafter Purple", "Spinnaker Purple", "Midnight Purple", "Bright Purple", "Cream", "Ice White", "Frost White"]
const matteColors = ["Black", "Gray", "Light Gray", "Ice White", "Blue", "Dark Blue", "Midnight Blue", "Midnight Purple", "Schafter Purple", "Red", "Dark Red", "Orange", "Yellow", "Lime Green", "Green", "Forest Green", "Foliage Green", "Olive Drab", "Dark Earth", "Desert Tan"]
const metals = ["Brushed Steel", "Brushed Black Steel", "Brushed Aluminium", "Pure Gold", "Brushed Gold"];
const chrome = ["Chrome"];



const vehicleColors = [
    { id: 0, name: "Metallic Black", colorHex: "#0d1116", colorRgb: [13, 17, 22] },
    { id: 1, name: "Metallic Graphite Black", colorHex: "#1c1d21", colorRgb: [28, 29, 33] },
    { id: 2, name: "Metallic Black Steal", colorHex: "#32383d", colorRgb: [50, 56, 61] },
    { id: 3, name: "Metallic Dark Silver", colorHex: "#454b4f", colorRgb: [69, 75, 79] },
    { id: 4, name: "Metallic Silver", colorHex: "#999da0", colorRgb: [153, 157, 160] },
    { id: 5, name: "Metallic Blue Silver", colorHex: "#c2c4c6", colorRgb: [194, 196, 198] },
    { id: 6, name: "Metallic Steel Gray", colorHex: "#979a97", colorRgb: [151, 154, 151] },
    { id: 7, name: "Metallic Shadow Silver", colorHex: "#637380", colorRgb: [99, 115, 128] },
    { id: 8, name: "Metallic Stone Silver", colorHex: "#63625c", colorRgb: [99, 98, 92] },
    { id: 9, name: "Metallic Midnight Silver", colorHex: "#3c3f47", colorRgb: [60, 63, 71] },
    { id: 10, name: "Metallic Gun Metal", colorHex: "#444e54", colorRgb: [68, 78, 84] },
    { id: 11, name: "Metallic Anthracite Grey", colorHex: "#1d2129", colorRgb: [29, 33, 41] },
    { id: 12, name: "Matte Black", colorHex: "#13181f", colorRgb: [19, 24, 31] },
    { id: 13, name: "Matte Gray", colorHex: "#26282a", colorRgb: [38, 40, 42] },
    { id: 14, name: "Matte Light Grey", colorHex: "#515554", colorRgb: [81, 85, 84] },
    { id: 15, name: "Util Black", colorHex: "#151921", colorRgb: [21, 25, 33] },
    { id: 16, name: "Util Black Poly", colorHex: "#1e2429", colorRgb: [30, 36, 41] },
    { id: 17, name: "Util Dark silver", colorHex: "#333a3c", colorRgb: [51, 58, 60] },
    { id: 18, name: "Util Silver", colorHex: "#8c9095", colorRgb: [140, 144, 149] },
    { id: 19, name: "Util Gun Metal", colorHex: "#39434d", colorRgb: [57, 67, 77] },
    { id: 20, name: "Util Shadow Silver", colorHex: "#506272", colorRgb: [80, 98, 114] },
    { id: 21, name: "Worn Black", colorHex: "#1e232f", colorRgb: [30, 35, 47] },
    { id: 22, name: "Worn Graphite", colorHex: "#363a3f", colorRgb: [54, 58, 63] },
    { id: 23, name: "Worn Silver Grey", colorHex: "#a0a199", colorRgb: [160, 161, 153] },
    { id: 24, name: "Worn Silver", colorHex: "#d3d3d3", colorRgb: [211, 211, 211] },
    { id: 25, name: "Worn Blue Silver", colorHex: "#b7bfca", colorRgb: [183, 191, 202] },
    { id: 26, name: "Worn Shadow Silver", colorHex: "#778794", colorRgb: [119, 135, 148] },
    { id: 27, name: "Metallic Red", colorHex: "#c00e1a", colorRgb: [192, 14, 26] },
    { id: 28, name: "Metallic Torino Red", colorHex: "#da1918", colorRgb: [218, 25, 24] },
    { id: 29, name: "Metallic Formula Red", colorHex: "#b6111b", colorRgb: [182, 17, 27] },
    { id: 30, name: "Metallic Blaze Red", colorHex: "#a51e23", colorRgb: [165, 30, 35] },
    { id: 31, name: "Metallic Graceful Red", colorHex: "#7b1a22", colorRgb: [123, 26, 34] },
    { id: 32, name: "Metallic Garnet Red", colorHex: "#8e1b1f", colorRgb: [142, 27, 31] },
    { id: 33, name: "Metallic Desert Red", colorHex: "#6f1818", colorRgb: [111, 24, 24] },
    { id: 34, name: "Metallic Cabernet Red", colorHex: "#49111d", colorRgb: [73, 17, 29] },
    { id: 35, name: "Metallic Candy Red", colorHex: "#b60f25", colorRgb: [182, 15, 37] },
    { id: 36, name: "Metallic Sunrise Orange", colorHex: "#d44a17", colorRgb: [212, 74, 23] },
    { id: 37, name: "Metallic Classic Gold", colorHex: "#c2944f", colorRgb: [194, 148, 79] },
    { id: 38, name: "Metallic Orange", colorHex: "#f78616", colorRgb: [247, 134, 22] },
    { id: 39, name: "Matte Red", colorHex: "#cf1f21", colorRgb: [207, 31, 33] },
    { id: 40, name: "Matte Dark Red", colorHex: "#732021", colorRgb: [115, 32, 33] },
    { id: 41, name: "Matte Orange", colorHex: "#f27d20", colorRgb: [242, 125, 32] },
    { id: 42, name: "Matte Yellow", colorHex: "#ffc91f", colorRgb: [255, 201, 31] },
    { id: 43, name: "Util Red", colorHex: "#9c1016", colorRgb: [156, 16, 22] },
    { id: 44, name: "Util Bright Red", colorHex: "#de0f18", colorRgb: [222, 15, 24] },
    { id: 45, name: "Util Garnet Red", colorHex: "#8f1e17", colorRgb: [143, 30, 23] },
    { id: 46, name: "Worn Red", colorHex: "#a94744", colorRgb: [169, 71, 68] },
    { id: 47, name: "Worn Golden Red", colorHex: "#b16c51", colorRgb: [177, 108, 81] },
    { id: 48, name: "Worn Dark Red", colorHex: "#371c25", colorRgb: [55, 28, 37] },
    { id: 49, name: "Metallic Dark Green", colorHex: "#132428", colorRgb: [19, 36, 40] },
    { id: 50, name: "Metallic Racing Green", colorHex: "#122e2b", colorRgb: [18, 46, 43] },
    { id: 51, name: "Metallic Sea Green", colorHex: "#12383c", colorRgb: [18, 56, 60] },
    { id: 52, name: "Metallic Olive Green", colorHex: "#31423f", colorRgb: [49, 66, 63] },
    { id: 53, name: "Metallic Green", colorHex: "#155c2d", colorRgb: [21, 92, 45] },
    { id: 54, name: "Metallic Gasoline Blue Green", colorHex: "#1b6770", colorRgb: [27, 103, 112] },
    { id: 55, name: "Matte Lime Green", colorHex: "#66b81f", colorRgb: [102, 184, 31] },
    { id: 56, name: "Util Dark Green", colorHex: "#22383e", colorRgb: [34, 56, 62] },
    { id: 57, name: "Util Green", colorHex: "#1d5a3f", colorRgb: [29, 90, 63] },
    { id: 58, name: "Worn Dark Green", colorHex: "#2d423f", colorRgb: [45, 66, 63] },
    { id: 59, name: "Worn Green", colorHex: "#45594b", colorRgb: [69, 89, 75] },
    { id: 60, name: "Worn Sea Wash", colorHex: "#65867f", colorRgb: [101, 134, 127] },
    { id: 61, name: "Metallic Midnight Blue", colorHex: "#222e46", colorRgb: [34, 46, 70] },
    { id: 62, name: "Metallic Dark Blue", colorHex: "#233155", colorRgb: [35, 49, 85] },
    { id: 63, name: "Metallic Saxony Blue", colorHex: "#304c7e", colorRgb: [48, 76, 126] },
    { id: 64, name: "Metallic Blue", colorHex: "#47578f", colorRgb: [71, 87, 143] },
    { id: 65, name: "Metallic Mariner Blue", colorHex: "#637ba7", colorRgb: [99, 123, 167] },
    { id: 66, name: "Metallic Harbor Blue", colorHex: "#394762", colorRgb: [57, 71, 98] },
    { id: 67, name: "Metallic Diamond Blue", colorHex: "#d6e7f1", colorRgb: [214, 231, 241] },
    { id: 68, name: "Metallic Surf Blue", colorHex: "#76afbe", colorRgb: [118, 175, 190] },
    { id: 69, name: "Metallic Nautical Blue", colorHex: "#345e72", colorRgb: [52, 94, 114] },
    { id: 70, name: "Metallic Bright Blue", colorHex: "#0b9cf1", colorRgb: [11, 156, 241] },
    { id: 71, name: "Metallic Purple Blue", colorHex: "#2f2d52", colorRgb: [47, 45, 82] },
    { id: 72, name: "Metallic Spinnaker Blue", colorHex: "#282c4d", colorRgb: [40, 44, 77] },
    { id: 73, name: "Metallic Ultra Blue", colorHex: "#2354a1", colorRgb: [35, 84, 161] },
    { id: 74, name: "Metallic Bright Blue", colorHex: "#6ea3c6", colorRgb: [110, 163, 198] },
    { id: 75, name: "Util Dark Blue", colorHex: "#112552", colorRgb: [17, 37, 82] },
    { id: 76, name: "Util Midnight Blue", colorHex: "#1b203e", colorRgb: [27, 32, 62] },
    { id: 77, name: "Util Blue", colorHex: "#275190", colorRgb: [39, 81, 144] },
    { id: 78, name: "Util Sea Foam Blue", colorHex: "#608592", colorRgb: [96, 133, 146] },
    { id: 79, name: "Util Lightning blue", colorHex: "#2446a8", colorRgb: [36, 70, 168] },
    { id: 80, name: "Util Maui Blue Poly", colorHex: "#4271e1", colorRgb: [66, 113, 225] },
    { id: 81, name: "Util Bright Blue", colorHex: "#3b39e0", colorRgb: [59, 57, 224] },
    { id: 82, name: "Matte Dark Blue", colorHex: "#1f2852", colorRgb: [31, 40, 82] },
    { id: 83, name: "Matte Blue", colorHex: "#253aa7", colorRgb: [37, 58, 167] },
    { id: 84, name: "Matte Midnight Blue", colorHex: "#1c3551", colorRgb: [28, 53, 81] },
    { id: 85, name: "Worn Dark blue", colorHex: "#4c5f81", colorRgb: [76, 95, 129] },
    { id: 86, name: "Worn Blue", colorHex: "#58688e", colorRgb: [88, 104, 142] },
    { id: 87, name: "Worn Light blue", colorHex: "#74b5d8", colorRgb: [116, 181, 216] },
    { id: 88, name: "Metallic Taxi Yellow", colorHex: "#ffcf20", colorRgb: [255, 207, 32] },
    { id: 89, name: "Metallic Race Yellow", colorHex: "#fbe212", colorRgb: [251, 226, 18] },
    { id: 90, name: "Metallic Bronze", colorHex: "#916532", colorRgb: [145, 101, 50] },
    { id: 91, name: "Metallic Yellow Bird", colorHex: "#e0e13d", colorRgb: [224, 225, 61] },
    { id: 92, name: "Metallic Lime", colorHex: "#98d223", colorRgb: [152, 210, 35] },
    { id: 93, name: "Metallic Champagne", colorHex: "#9b8c78", colorRgb: [155, 140, 120] },
    { id: 94, name: "Metallic Pueblo Beige", colorHex: "#503218", colorRgb: [80, 50, 24] },
    { id: 95, name: "Metallic Dark Ivory", colorHex: "#473f2b", colorRgb: [71, 63, 43] },
    { id: 96, name: "Metallic Choco Brown", colorHex: "#221b19", colorRgb: [34, 27, 25] },
    { id: 97, name: "Metallic Golden Brown", colorHex: "#653f23", colorRgb: [101, 63, 35] },
    { id: 98, name: "Metallic Light Brown", colorHex: "#775c3e", colorRgb: [119, 92, 62] },
    { id: 99, name: "Metallic Straw Beige", colorHex: "#ac9975", colorRgb: [172, 153, 117] },
    { id: 100, name: "Metallic Moss Brown", colorHex: "#6c6b4b", colorRgb: [108, 107, 75] },
    { id: 101, name: "Metallic Biston Brown", colorHex: "#402e2b", colorRgb: [64, 46, 43] },
    { id: 102, name: "Metallic Beechwood", colorHex: "#a4965f", colorRgb: [164, 150, 95] },
    { id: 103, name: "Metallic Dark Beechwood", colorHex: "#46231a", colorRgb: [70, 35, 26] },
    { id: 104, name: "Metallic Choco Orange", colorHex: "#752b19", colorRgb: [117, 43, 25] },
    { id: 105, name: "Metallic Beach Sand", colorHex: "#bfae7b", colorRgb: [191, 174, 123] },
    { id: 106, name: "Metallic Sun Bleeched Sand", colorHex: "#dfd5b2", colorRgb: [223, 213, 178] },
    { id: 107, name: "Metallic Cream", colorHex: "#f7edd5", colorRgb: [247, 237, 213] },
    { id: 108, name: "Util Brown", colorHex: "#3a2a1b", colorRgb: [58, 42, 27] },
    { id: 109, name: "Util Medium Brown", colorHex: "#785f33", colorRgb: [120, 95, 51] },
    { id: 110, name: "Util Light Brown", colorHex: "#b5a079", colorRgb: [181, 160, 121] },
    { id: 111, name: "Metallic White", colorHex: "#fffff6", colorRgb: [255, 255, 246] },
    { id: 112, name: "Metallic Frost White", colorHex: "#eaeaea", colorRgb: [234, 234, 234] },
    { id: 113, name: "Worn Honey Beige", colorHex: "#b0ab94", colorRgb: [176, 171, 148] },
    { id: 114, name: "Worn Brown", colorHex: "#453831", colorRgb: [69, 56, 49] },
    { id: 115, name: "Worn Dark Brown", colorHex: "#2a282b", colorRgb: [42, 40, 43] },
    { id: 116, name: "Worn straw beige", colorHex: "#726c57", colorRgb: [114, 108, 87] },
    { id: 117, name: "Brushed Steel", colorHex: "#6a747c", colorRgb: [106, 116, 124] },
    { id: 118, name: "Brushed Black steel", colorHex: "#354158", colorRgb: [53, 65, 88] },
    { id: 119, name: "Brushed Aluminium", colorHex: "#9ba0a8", colorRgb: [155, 160, 168] },
    { id: 120, name: "Chrome", colorHex: "#5870a1", colorRgb: [88, 112, 161] },
    { id: 121, name: "Worn Off White", colorHex: "#eae6de", colorRgb: [234, 230, 222] },
    { id: 122, name: "Util Off White", colorHex: "#dfddd0", colorRgb: [223, 221, 208] },
    { id: 123, name: "Worn Orange", colorHex: "#f2ad2e", colorRgb: [242, 173, 46] },
    { id: 124, name: "Worn Light Orange", colorHex: "#f9a458", colorRgb: [249, 164, 88] },
    { id: 125, name: "Metallic Securicor Green", colorHex: "#83c566", colorRgb: [131, 197, 102] },
    { id: 126, name: "Worn Taxi Yellow", colorHex: "#f1cc40", colorRgb: [241, 204, 64] },
    { id: 127, name: "police car blue", colorHex: "#4cc3da", colorRgb: [76, 195, 218] },
    { id: 128, name: "Matte Green", colorHex: "#4e6443", colorRgb: [78, 100, 67] },
    { id: 129, name: "Matte Brown", colorHex: "#bcac8f", colorRgb: [188, 172, 143] },
    { id: 130, name: "Worn Orange", colorHex: "#f8b658", colorRgb: [248, 182, 88] },
    { id: 131, name: "Matte White", colorHex: "#fcf9f1", colorRgb: [252, 249, 241] },
    { id: 132, name: "Worn White", colorHex: "#fffffb", colorRgb: [255, 255, 251] },
    { id: 133, name: "Worn Olive Army Green", colorHex: "#81844c", colorRgb: [129, 132, 76] },
    { id: 134, name: "Pure White", colorHex: "#ffffff", colorRgb: [255, 255, 255] },
    { id: 135, name: "Hot Pink", colorHex: "#f21f99", colorRgb: [242, 31, 153] },
    { id: 136, name: "Salmon pink", colorHex: "#fdd6cd", colorRgb: [253, 214, 205] },
    { id: 137, name: "Metallic Vermillion Pink", colorHex: "#df5891", colorRgb: [223, 88, 145] },
    { id: 138, name: "Orange", colorHex: "#f6ae20", colorRgb: [246, 174, 32] },
    { id: 139, name: "Green", colorHex: "#b0ee6e", colorRgb: [176, 238, 110] },
    { id: 140, name: "Blue", colorHex: "#08e9fa", colorRgb: [8, 233, 250] },
    { id: 141, name: "Mettalic Black Blue", colorHex: "#0a0c17", colorRgb: [10, 12, 23] },
    { id: 142, name: "Metallic Black Purple", colorHex: "#0c0d18", colorRgb: [12, 13, 24] },
    { id: 143, name: "Metallic Black Red", colorHex: "#0e0d14", colorRgb: [14, 13, 20] },
    { id: 144, name: "hunter green", colorHex: "#9f9e8a", colorRgb: [159, 158, 138] },
    { id: 145, name: "Metallic Purple", colorHex: "#621276", colorRgb: [98, 18, 118] },
    { id: 146, name: "Metaillic V Dark Blue", colorHex: "#0b1421", colorRgb: [11, 20, 33] },
    { id: 147, name: "MODSHOP BLACK1", colorHex: "#11141a", colorRgb: [17, 20, 26] },
    { id: 148, name: "Matte Purple", colorHex: "#6b1f7b", colorRgb: [107, 31, 123] },
    { id: 149, name: "Matte Dark Purple", colorHex: "#1e1d22", colorRgb: [30, 29, 34] },
    { id: 150, name: "Metallic Lava Red", colorHex: "#bc1917", colorRgb: [188, 25, 23] },
    { id: 151, name: "Matte Forest Green", colorHex: "#2d362a", colorRgb: [45, 54, 42] },
    { id: 152, name: "Matte Olive Drab", colorHex: "#696748", colorRgb: [105, 103, 72] },
    { id: 153, name: "Matte Desert Brown", colorHex: "#7a6c55", colorRgb: [122, 108, 85] },
    { id: 154, name: "Matte Desert Tan", colorHex: "#c3b492", colorRgb: [195, 180, 146] },
    { id: 155, name: "Matte Foilage Green", colorHex: "#5a6352", colorRgb: [90, 99, 82] },
    { id: 156, name: "DEFAULT ALLOY COLOR", colorHex: "#81827f", colorRgb: [129, 130, 127] },
    { id: 157, name: "Epsilon Blue", colorHex: "#afd6e4", colorRgb: [175, 214, 228] },
    { id: 158, name: "Pure Gold", colorHex: "#7a6440", colorRgb: [122, 100, 64] },
    { id: 159, name: "Brushed Gold", colorHex: "#7f6a48", colorRgb: [127, 106, 7] }
]

const wheelTypes = [
    "Sport",
    "Muscle",
    "Lowrider",
    "SUV",
    "Offroad",
    "Tuner",
    "Bike Wheels",
    "High End",
    "Benny's Original",
    "Benny's Bespoke",
    "Sliks",
    "Street"
];

const vehicleMods = [
    { id: 0, name: 'Spoiler', startPrice: 6500, multiplier: 1, flatFee: false, },
    { id: 1, name: 'Frontbumper', startPrice: 3000, multiplier: 1, flatFee: false, },
    { id: 2, name: 'Rearbumper', startPrice: 3000, multiplier: 1, flatFee: false, },
    { id: 3, name: 'Sideskirt', startPrice: 2500, multiplier: 1, flatFee: false, },
    { id: 4, name: 'Exhaust', startPrice: 4000, multiplier: 1, flatFee: false, },
    { id: 5, name: 'Chassis', startPrice: 2500, multiplier: 1, flatFee: false, },
    { id: 6, name: 'Grille', startPrice: 2250, multiplier: 1, flatFee: false, },
    { id: 7, name: 'Hood', startPrice: 3500, multiplier: 1, flatFee: false, },
    { id: 8, name: 'Fender', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 9, name: 'Rightfender', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 10, name: 'Roof', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 11, name: 'Engine', startPrice: 12500, multiplier: 1.5, flatFee: true, },
    { id: 12, name: 'Brakes', startPrice: 3500, multiplier: 1.3, flatFee: false, },
    { id: 13, name: 'Transmission', startPrice: 12500, multiplier: 1.5, flatFee: true, },
    { id: 14, name: 'Horns', startPrice: 500, multiplier: 1, flatFee: false, },
    { id: 15, name: 'Suspension', startPrice: 4500, multiplier: 1, flatFee: false, },
    { id: 16, name: 'Armor', startPrice: 500, multiplier: 2, flatFee: false, },
    { id: 17, name: 'Unk17', startPrice: 500, multiplier: 2, flatFee: false, },
    { id: 18, name: 'Turbo', startPrice: 27500, multiplier: 1, flatFee: false, },
    { id: 19, name: 'Unk19', startPrice: 500, multiplier: 2, flatFee: false, },
    { id: 20, name: 'Tiresmoke', startPrice: 1000, multiplier: 1, flatFee: false, },
    { id: 21, name: 'Unk21', startPrice: 500, multiplier: 2, flatFee: false, },
    { id: 22, name: 'Xenonlights', startPrice: 1250, multiplier: 1, flatFee: false, },
    { id: 23, name: 'Wheels', startPrice: 3500, multiplier: 1, flatFee: false, },
    { id: 24, name: 'Backwheels', startPrice: 1500, multiplier: 1, flatFee: false, },
    { id: 25, name: 'Plateholder', startPrice: 250, multiplier: 1, flatFee: false, },
    { id: 26, name: 'Vanityplates', startPrice: 250, multiplier: 1, flatFee: false, },
    { id: 27, name: 'Trim', startPrice: 2250, multiplier: 1, flatFee: false, },
    { id: 28, name: 'Ornaments', startPrice: 250, multiplier: 1, flatFee: false, },
    { id: 29, name: 'Dashboard', startPrice: 1250, multiplier: 1, flatFee: false, },
    { id: 30, name: 'Dial', startPrice: 750, multiplier: 1, flatFee: false, },
    { id: 31, name: 'Doorspeaker', startPrice: 750, multiplier: 1, flatFee: false, },
    { id: 32, name: 'Seats', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 33, name: 'Steeringwheel', startPrice: 2250, multiplier: 1, flatFee: false, },
    { id: 34, name: 'Shifterleavers', startPrice: 500, multiplier: 1, flatFee: false, },
    { id: 35, name: 'Plaques', startPrice: 750, multiplier: 1, flatFee: false, },
    { id: 36, name: 'Speakers', startPrice: 2500, multiplier: 1, flatFee: false, },
    { id: 37, name: 'Trunk', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 38, name: 'Hydrulics', startPrice: 7000, multiplier: 1, flatFee: false, },
    { id: 39, name: 'Engineblock', startPrice: 2000, multiplier: 1, flatFee: false, },
    { id: 40, name: 'Airfilter', startPrice: 750, multiplier: 1, flatFee: false, },
    { id: 41, name: 'Struts', startPrice: 750, multiplier: 1, flatFee: false, },
    { id: 42, name: 'Archcover', startPrice: 1250, multiplier: 1, flatFee: false, },
    { id: 43, name: 'Aerials', startPrice: 250, multiplier: 1, flatFee: false, },
    { id: 44, name: 'Trim', startPrice: 1250, multiplier: 1, flatFee: false, },
    { id: 45, name: 'Tank', startPrice: 1000, multiplier: 1, flatFee: false, },
    { id: 46, name: 'Windows', startPrice: 1000, multiplier: 1, flatFee: false, },
    { id: 47, name: 'Unk47', startPrice: 500, multiplier: 1, flatFee: false, },
    { id: 48, name: 'Livery', startPrice: 1750, multiplier: 1, flatFee: false, }
];

const vehicleClassMultipliers = [
    { id: 0, Category: 'Compacts', Multiplier: 1 },
    { id: 1, Category: 'Sedans', Multiplier: 1 },
    { id: 2, Category: 'SUVs', Multiplier: 1.3 },
    { id: 3, Category: 'Coupes', Multiplier: 1 },
    { id: 4, Category: 'Muscle', Multiplier: 1.2 },
    { id: 5, Category: 'Sports Classics', Multiplier: 1.6 },
    { id: 6, Category: 'Sports', Multiplier: 1.5 },
    { id: 7, Category: 'Super', Multiplier: 2 },
    { id: 8, Category: 'Motorcycles', Multiplier: 1.3 },
    { id: 9, Category: 'Off-road', Multiplier: 1.2 },
    { id: 10, Category: 'Industrial', Multiplier: 1 },
    { id: 11, Category: 'Utility', Multiplier: 1 },
    { id: 12, Category: 'Vans', Multiplier: 1 },
    { id: 13, Category: 'Cycles', Multiplier: 0.5 },
    { id: 14, Category: 'Boats', Multiplier: 2.5 },
    { id: 15, Category: 'Helicopters', Multiplier: 3.5 },
    { id: 16, Category: 'Planes', Multiplier: 4 },
    { id: 17, Category: 'Service', Multiplier: 1.5 },
    { id: 18, Category: 'Emergency', Multiplier: 1 },
    { id: 19, Category: 'Military', Multiplier: 1 },
    { id: 20, Category: 'Commercial', Multiplier: 1.6 },
    { id: 21, Category: 'Trains', Multiplier: 1 }
];

const Natives = {
    SET_VEHICLE_EXTRA_COLOURS: "0x2036F561ADD12E33",
};

const ModTypes = {
    WheelsColor: 100,
    TrimColor: 101,
    Extra: 102
};
//sammys dogshit 

function setHeadlightsColor(vehicle, color) {
    if (typeof color !== "number" || isNaN(color) || color < 0 || color === 255) {
        // Disable
        vehicle.toggleMod(22, false);
        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
    } else {
        // Enable
        vehicle.toggleMod(22, true);
        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, color);
    }
}

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "vehicle") {
        entity.setProofs(false, false, true, false, false, false, false, false);
        setHeadlightsColor(entity, parseInt(entity.getVariable("headlightColor")));
    }
});

mp.events.addDataHandler("headlightColor", (entity, value) => {
    if (entity.type === "vehicle") setHeadlightsColor(entity, value);
});

mp.events.add('getVehicleHeadlights', () => {
    modShopWindow.execute(`app.loadColors(${JSON.stringify(headlightColors)});`);
});


mp.events.add("testcolor", (paintType, color, pearlescentColor) => {
    mp.players.local.vehicle.setModColor1(paintType, color, pearlescentColor);
});

mp.events.add("testcolor2", (pearlescentColor, wheelColor) => {
    mp.players.local.vehicle.setExtraColours(pearlescentColor, wheelColor);
});

mp.events.add("testcolor3", (color) => {
    mp.game.invoke("0x63140C89AD7622EF", mp.players.local.vehicle.handle, color)
});

mp.events.add("testcolor4", (color) => {
    mp.game.invoke("0xCE01344F3CABBA9D", mp.players.local.vehicle.handle, color)
});

mp.events.add("testcolor5", (colorPrimary, colorSecondary) => {
    mp.players.local.vehicle.setColours(colorPrimary, colorSecondary);

});


const headlightColors = [
    { id: 255, name: "Default", price: 0 },
    { id: 0, name: "White", price: 10000 },
    { id: 1, name: "Blue", price: 10000 },
    { id: 2, name: "Light Blue", price: 10000 },
    { id: 3, name: "Green", price: 10000 },
    { id: 4, name: "Light Green", price: 10000 },
    { id: 5, name: "Light Yellow", price: 10000 },
    { id: 6, name: "Yellow", price: 10000 },
    { id: 7, name: "Orange", price: 10000 },
    { id: 8, name: "Red", price: 10000 },
    { id: 9, name: "Light Pink", price: 10000 },
    { id: 10, name: "Pink", price: 10000 },
    { id: 11, name: "Purple", price: 10000 },
    { id: 12, name: "Light Purple", price: 10000 },
]
}