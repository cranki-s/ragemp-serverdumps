{
const player = mp.players.local;

let jet = false;
let pedplayer = false;
let renderEvent = null;
let cinematicName = "";
let cinematicEndInterval = null;

require("ui.js");

// call to finish the cutscene
mp.events.add("doneCutscene", () => {
    if (cinematicEndInterval) {
        clearInterval(cinematicEndInterval);
        cinematicEndInterval = null;
    }

    mp.game.audio.triggerMusicEvent("FM_INTRO_DRIVE_END");
    mp.game.invoke("0xD220BDD222AC4A1E"); // STOP_CUTSCENE_IMMEDIATELY
    player.setAlpha(255);
    player.setInvincible(false);
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, false, false); // SET_ENTITY_VISIBLE
    // Hide Ped (Deleting Ped crashes Game)

    setTimeout(() => mp.game.cam.doScreenFadeIn(1000), 9000);

    // destroy render event
    if(renderEvent) {
        renderEvent.destroy();
        renderEvent = null;
    }

    toggleHud(true);
});

mp.rpc("player:run_welcome_cinematic", (name, millis) => {
    cinematicName = name;

    // hide hud
    toggleHud(false);

    if (millis < 15000) millis = 15000;

    // fire a timer that:
    // - 10 secs before, fade out the string
    // - 500ms after that, ends the cutscene
    if (cinematicEndInterval) clearInterval(cinematicEndInterval);
    cinematicEndInterval = setTimeout(() => {
        mp.game.cam.doScreenFadeOut(500);
        setTimeout(() => mp.events.call("doneCutscene"), 500);
    }, millis - 9500);

    // run the cinematic
    mp.events.call("run_welcome_cinematic");
});

mp.events.add("run_welcome_cinematic", async () => {
    mp.game.cam.doScreenFadeOut(0);

    //create hud ready for them to spawn
    mp.game.time.advanceClockTimeTo(19, 30, 0);
    mp.game.audio.setAudioFlag("DisableFlightMusic", true);
    player.clearTasksImmediately();
    player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
    player.setInvincible(true);

    mp.game.audio.prepareMusicEvent("FM_INTRO_START");

    //Clone Current Ped
    const pedplayer = mp.game.invoke("0xEF29A16337FACADB", player.handle, 0, false, false);

    //Make Player Invisible
    player.setAlpha(0);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);

    mp.game.cutscene.requestCutscene("mp_intro_concat", 1);

    while (!mp.game.cutscene.hasThisCutsceneLoaded("mp_intro_concat"))  {
        await mp.game.waitAsync(0);
    }

    //Render Jet
    const hash = mp.game.joaat("p_cs_mp_jet_01_s")
    jet = mp.game.object.createObject(hash, -1200, -1490, 142.385, false, true, false);

    mp.game.invoke("0x3910051CCECDB00C", jet, false); // _SET_ENTITY_CLEANUP_BY_ENGINE
    mp.game.invoke("0xEA1C610A04DB6BBB", jet, true, false); // SET_ENTITY_VISIBLE

    // Attach Jet to Cutscene
    mp.game.cutscene.registerEntityForCutscene(jet, "MP_Plane", 0, 0, 0);

    if (player.model === 1885233650) {
        // Remove Female NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Female_Character", 3, mp.game.joaat("mp_f_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Male_Character", 0, 0, 0);
    } else {
        // Remove Male NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Male_Character", 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Female_Character", 0, 0, 0);
    }
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, true, false); // SET_ENTITY_VISIBLE

    for (let i = 1; i < 8; i++) {
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Plane_Passenger_" + i, 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.invoke("0x4C61C75BEE8184C2", "MP_Plane_Passenger_" + i, 0, 0); // SET_CUTSCENE_ENTITY_STREAMING_FLAGS
    }

    mp.game.invoke("0xE532F5D78798DAAB", hash); // SET_MODEL_AS_NO_LONGER_NEEDED

    setTimeout(() => {
        mp.game.cutscene.startCutscene(4);
        mp.game.invoke("0xBEB2D9A1D9A8F55A", 9, 9, 9, 9); //Idk what is it (namespace STREAMING)
        mp.game.cam.doScreenFadeIn(500);
        mp.game.audio.triggerMusicEvent("FM_INTRO_START");
    }, 500);

    /** Welcome text in screen */
    if (renderEvent) renderEvent.destroy();
    renderEvent = mp.events.add("render", () => {
        const time = mp.game.invoke("0xE625BEABBAFFDAB9"); // GET_CUTSCENE_TIME
        if (time !== 0) {
            if (time > 12000 && time < 22000) {
                mp.game.graphics.drawText("Tu historia empieza aquí, ~b~" + cinematicName.replace("_", " "), [0.19895833730697632, 0.1657407432794571], {
                    font: 4,
                    color: [255, 255, 255, 255],
                    scale: [0.8, 0.8],
                    outline: true
                });
                mp.game.graphics.drawText("Bienvenido a ~p~GTAHUB", [0.20208333432674408, 0.09351851791143417], {
                    font: 4,
                    color: [255, 255, 255, 255],
                    scale: [0.8, 0.8],
                    outline: true
                });
            }
        }
    });
});
}