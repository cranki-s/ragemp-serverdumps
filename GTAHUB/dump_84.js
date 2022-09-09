{
let garajeLoaded = false;

mp.setInterval( () => {
    let pos = mp.players.local.position;
    let interiorId = mp.game.interior.getInteriorAtCoords(pos.x, pos.y, pos.z);
    if (interiorId === 285697 && !garajeLoaded) {
        garajeLoaded = true;
        mp.game.streaming.requestIpl("tr_int_placement_tr_interior_1_tuner_car_meetmilo");
        mp.game.interior.enableInteriorProp(285697, "entity_set_meet_lights_cheap");
        mp.game.interior.enableInteriorProp(285697, "entity_set_meet_lights");
        mp.game.interior.enableInteriorProp(285697, "entity_set_meet_crew");
        mp.game.interior.enableInteriorProp(285697, "entity_set_test_crew");
        mp.game.interior.enableInteriorProp(285697, "entity_set_test_lights");
        mp.game.interior.enableInteriorProp(285697, "entity_set_test_lights_cheap");
        mp.game.interior.refreshInterior(285697);
    }
}, 1000);
}