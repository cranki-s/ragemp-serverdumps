{
﻿var rtimer = null;
var nowplaying;

function vehradio(entity) {
    if (entity && mp.vehicles.exists(entity)) {
        if (localplayer.vehicle == entity) {
            let vehrad = entity.getVariable('vehradio');
            nowplaying = mp.game.invoke(global.getNative("GET_PLAYER_RADIO_STATION_INDEX"));
            if (entity.getPedInSeat(-1) == localplayer.handle) {
                if (vehrad != nowplaying) NewEvent.callRemote('VehStream_RadioChange', entity, nowplaying);
            } else {
                if (vehrad == 255) mp.game.audio.setRadioToStationName("OFF");
                else {
                    if (vehrad != nowplaying) {
                        mp.game.invoke(global.getNative("SET_FRONTEND_RADIO_ACTIVE"), true);
                        mp.game.invoke(global.getNative("SET_RADIO_TO_STATION_INDEX"), vehrad);
                    }

                }
            }
        }
    } else {
        if (rtimer != null) {
            clearInterval(rtimer);
            rtimer = null;
        }
    }
};

mp.events.add("playerEnterVehicle", (entity, seat) => {
    if (entity != null) {
        if (rtimer != null) clearInterval(rtimer);
        rtimer = setInterval(function () { vehradio(entity); }, 1000);
    }
});

mp.events.add("playerLeaveVehicle", (entity) => {
    if (rtimer != null) {
        clearInterval(rtimer);
        rtimer = null;
    }
});
}