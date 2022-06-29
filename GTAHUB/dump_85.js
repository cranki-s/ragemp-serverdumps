{
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

    // load in 4 parts to avoid some crashes (normally in first spawn on mlo)
    setTimeout(loadVesp2, 250)
    setTimeout(loadVesp3, 500)
    setTimeout(loadVesp4, 750)
}

function loadVesp2() {
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
}

function loadVesp3() {
    mp.game.streaming.requestIpl("int_vesp_1_1_milo_")
    mp.game.streaming.requestIpl("int_vesp_1_2_milo_")
    mp.game.streaming.requestIpl("int_vesp_big_lift_milo_")
    mp.game.streaming.requestIpl("int_vesp_big_stair_milo_")
    mp.game.streaming.requestIpl("int_vesp_slift_milo_")
    mp.game.streaming.requestIpl("int_vesp_smole_stair_milo_")
}

function loadVesp4() {
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
    let dist = mp.game.system.vdist(vespPos.x, vespPos.y, vespPos.z, playerPos.x, playerPos.y, playerPos.z);
    if (dist > 200 && vespLoaded) {
        unloadVesp();
        vespLoaded = false;
    }
    else if (dist < 200 && !vespLoaded) {
        loadVesp();
        vespLoaded = true;
    }
}

mp.setInterval( () => {
    vespController();
}, 1000)
}