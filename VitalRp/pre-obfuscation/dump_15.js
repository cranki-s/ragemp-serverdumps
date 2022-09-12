{

//let justice = mp.game.interior.getInteriorAtCoords(-551.01380000, -193.85260000, 45.22603000);
//mp.game.interior.enableInteriorProp(justice, "closed");



mp.game.streaming.requestIpl('ch1_02_closed');
mp.events.add('ClientLoadIpl', (ipl) => {

})

mp.events.add("ClientLoadIpl", (ipl) => {

    mp.game.streaming.requestIpl(ipl);
});


let vespLoaded = false;
function loadVesp() {
    mp.game.streaming.requestIpl('int_vesp_01_1_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_01_1");
    mp.game.streaming.removeIpl("vesp_lod_01_1");

    mp.game.streaming.requestIpl('int_vesp_01_2_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_01_2");


    mp.game.streaming.requestIpl('int_vesp_02_1_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_02_1");

    mp.game.streaming.requestIpl('int_vesp_02_2_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_02_2");

    mp.game.streaming.requestIpl('int_vesp_03_1_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_03_1");
    mp.game.streaming.removeIpl("vesp_lod_03_1");

    mp.game.streaming.requestIpl('int_vesp_2_1_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_2_1");
    mp.game.streaming.removeIpl("vesp_lod_2_1");


    mp.game.streaming.requestIpl('int_vesp_3_1_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_3_1");
    mp.game.streaming.removeIpl("vesp_lod_3_1");

    mp.game.streaming.requestIpl('int_vesp_3_2_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_3_2");
    mp.game.streaming.removeIpl("vesp_lod_3_2");

    mp.game.streaming.requestIpl('int_vesp_4_2_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_4_2");
    mp.game.streaming.removeIpl("vesp_lod_4_2");

    mp.game.streaming.requestIpl('int_vesp_5_2_milo_');
    mp.game.streaming.removeIpl("vesp_ipl_5_2");
    mp.game.streaming.removeIpl("vesp_lod_5_2");




    mp.game.streaming.requestIpl("int_vesp_1_1_milo_")
    mp.game.streaming.requestIpl("int_vesp_1_2_milo_")
    mp.game.streaming.requestIpl("int_vesp_big_lift_milo_")
    mp.game.streaming.requestIpl("int_vesp_big_stair_milo_")
    mp.game.streaming.requestIpl("int_vesp_slift_milo_")
    mp.game.streaming.requestIpl("int_vesp_smole_stair_milo_")





    let vesp2_1ipl = mp.game.interior.getInteriorAtCoordsWithType(-1096.445, -831.962, 23.033, "int_vesp_1_2")
    let vesp3_1ipl = mp.game.interior.getInteriorAtCoordsWithType(-1091.963, -831.206, 26.827, "int_vesp_3_2")
    let vesp02_2ipl = mp.game.interior.getInteriorAtCoordsWithType(-1095.002, -838.586, 10.276, "int_vesp_02_1")
    let vesp02_1ipl = mp.game.interior.getInteriorAtCoordsWithType(-1095.002, -838.586, 10.276, "int_vesp_02_2")
    let vesp01_2ipl = mp.game.interior.getInteriorAtCoordsWithType(-1088.377, -832.352, 5.479, "int_vesp_01_1")
    let vesp01_1ipl = mp.game.interior.getInteriorAtCoordsWithType(-1097.205, -839.141, 4.878, "int_vesp_01_2")

    mp.game.interior.disableInteriorProp(vesp2_1ipl, "vesp1_2");
    mp.game.interior.disableInteriorProp(vesp3_1ipl, "vesp3_2");
    mp.game.interior.disableInteriorProp(vesp02_2ipl, "vesp02_1");
    mp.game.interior.disableInteriorProp(vesp02_1ipl, "vesp02_2");
    mp.game.interior.disableInteriorProp(vesp01_2ipl, "vesp01_1");
    mp.game.interior.disableInteriorProp(vesp01_1ipl, "vesp01_2");


    mp.game.interior.refreshInterior(vesp2_1ipl);
    mp.game.interior.refreshInterior(vesp3_1ipl);
    mp.game.interior.refreshInterior(vesp02_2ipl);
    mp.game.interior.refreshInterior(vesp02_1ipl);
    mp.game.interior.refreshInterior(vesp01_2ipl);
    mp.game.interior.refreshInterior(vesp01_1ipl);
}

function unloadVesp() {
    mp.game.streaming.removeIpl('int_vesp_01_1_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_01_1");
    mp.game.streaming.requestIpl("vesp_lod_01_1");

    mp.game.streaming.removeIpl('int_vesp_01_2_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_01_2");


    mp.game.streaming.removeIpl('int_vesp_02_1_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_02_1");

    mp.game.streaming.removeIpl('int_vesp_02_2_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_02_2");

    mp.game.streaming.removeIpl('int_vesp_03_1_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_03_1");
    mp.game.streaming.requestIpl("vesp_lod_03_1");

    mp.game.streaming.removeIpl('int_vesp_2_1_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_2_1");
    mp.game.streaming.requestIpl("vesp_lod_2_1");


    mp.game.streaming.removeIpl('int_vesp_3_1_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_3_1");
    mp.game.streaming.requestIpl("vesp_lod_3_1");

    mp.game.streaming.removeIpl('int_vesp_3_2_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_3_2");
    mp.game.streaming.requestIpl("vesp_lod_3_2");


    mp.game.streaming.removeIpl('int_vesp_4_2_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_4_2");
    mp.game.streaming.requestIpl("vesp_lod_4_2");

    mp.game.streaming.removeIpl('int_vesp_5_2_milo_');
    mp.game.streaming.requestIpl("vesp_ipl_5_2");
    mp.game.streaming.requestIpl("vesp_lod_5_2");


    mp.game.streaming.removeIpl("int_vesp_1_1_milo_")
    mp.game.streaming.removeIpl("int_vesp_1_2_milo_")
    mp.game.streaming.removeIpl("int_vesp_big_lift_milo_")
    mp.game.streaming.removeIpl("int_vesp_big_stair_milo_")
    mp.game.streaming.removeIpl("int_vesp_slift_milo_")
    mp.game.streaming.requestIpl("int_vesp_smole_stair_milo_")

}

function vespController() {
    let vespPos = new mp.Vector3(-1096.445, -831.962, 23.033);
    let playerPos = mp.players.local.position
    let dist = calcDist(vespPos, playerPos);
    if (dist > 120 && vespLoaded === true) {
        unloadVesp();
        vespLoaded = false;
    }
    else if (dist < 120 && vespLoaded === false) {
        loadVesp();
        vespLoaded = true;
    }
}



let zonahLoaded = false;
function zonahController() {
    let zonahPos = new mp.Vector3(-451.56070000, -317.66880000, 35.79000000);
    let playerPos = mp.players.local.position;
    let dist = calcDist(zonahPos, playerPos);
    if (dist > 120 && zonahLoaded === true) {
        unloadZonah();
        zonahLoaded = false;
    }
    else if (dist < 120 && zonahLoaded === false) {
        loadZonah();
        zonahLoaded = true;
    }
}




let paletogarage = mp.game.interior.getInteriorAtCoords(79.208, 6525.550, 30.227)

if (mp.game.interior.isValidInterior(paletogarage)) {
    mp.game.interior.enableInteriorProp(paletogarage, "walls_02");
    mp.game.interior.enableInteriorProp(paletogarage, "Furnishings_02");
    mp.game.interior.enableInteriorProp(paletogarage, "decorative_02");
    mp.game.interior.enableInteriorProp(paletogarage, "mural_03");
    mp.game.interior.enableInteriorProp(paletogarage, "lower_walls_default");
    mp.game.interior.enableInteriorProp(paletogarage, "mod_booth");
    mp.game.interior.enableInteriorProp(paletogarage, "gun_locker");
    mp.game.interior.enableInteriorProp(paletogarage, "cash_small");
    mp.game.interior.enableInteriorProp(paletogarage, "id_small");
    mp.game.interior.enableInteriorProp(paletogarage, "weed_small");


    mp.game.invoke("0xC1F1920BAF281317", paletogarage, "walls_02", 8);
    mp.game.invoke("0xC1F1920BAF281317", paletogarage, "Furnishings_02", 8);
    mp.game.invoke("0xC1F1920BAF281317", paletogarage, "lower_walls_default", 8);

    mp.game.interior.refreshInterior(paletogarage);
}


function drawTestText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}




let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
let phPropList = [
    "Set_Pent_Tint_Shell",
    "Set_Pent_Pattern_01",
    "Set_Pent_Spa_Bar_Open",
    "Set_Pent_Media_Bar_Open",
    "Set_Pent_Dealer",
    "Set_Pent_Arcade_Retro",
    "Set_Pent_Bar_Clutter",
    "Set_Pent_Clutter_01",
    "set_pent_bar_light_01",
    "set_pent_bar_party_0"
];

for (const propName of phPropList) {
    mp.game.interior.enableInteriorProp(phIntID, propName);
}

mp.game.interior.refreshInterior(phIntID);


mp.events.add('render', () => {
    let room = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle)
    let interior = mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle)
   
    mp.players.forEachInRange(mp.players.local.position, 30,
        (entity) => {
            if (entity != mp.players.local) {
                
                if (interior != 0 || room != 0 || mp.game.invoke("0x47C2A06D4F5F424B", entity.handle) !== room || mp.game.invoke("0x2107BA504071A6BB", entity.handle) !== interior) {
                    mp.game.invoke("0x52923C4710DD9907", entity.handle, interior, room); // force room + interior
                }


            }
        });
})




}