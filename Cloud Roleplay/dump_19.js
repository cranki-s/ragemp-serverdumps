{
mp.gui.chat.show(false)
mp.nametags.enabled = false
mp.players.local.setSuffersCriticalHits(false)
mp.discord.update("Cloud Roleplay", "discord.gg/cloudroleplay")

mp.events.add('playerReady', () => {
    mp.game.invoke('0xF314CF4F0211894E', 143, 2, 121, 185, 180); // SET_HUD_COLOUR
    //mp.game.invoke('0xEBD76F2359F190AC', mp.players.local.handle, false);
    mp.game.gxt.set('PM_PAUSE_HDR', "Cloud Roleplay");
})

let controlsToDisable = [12, 13, 14, 15, 16, 17, 24, 25, 37, 45, 47, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331]
let controlsLength = controlsToDisable.length
let disableControlsState = false

mp.events.add("client:disableAllControls", (state) => {
    disableControlsState = state;
})

mp.events.add('render', () => {
    mp.game.player.setHealthRechargeMultiplier(0);
    mp.game.controls.disableControlAction(2, 44, true);

    let isArmedExceptMelee = mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6); // IS_PED_ARMED
    if (isArmedExceptMelee) {
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 142, true);
    }

    mp.game.player.restoreStamina(100);

    mp.game.ui.hideHudComponentThisFrame(6)
    mp.game.ui.hideHudComponentThisFrame(7)
    mp.game.ui.hideHudComponentThisFrame(8)
    mp.game.ui.hideHudComponentThisFrame(9)

    if (disableControlsState == true) {
        for (let i = 0; i < controlsLength; i++) {
            mp.game.controls.disableControlAction(2, controlsToDisable[i], disableControlsState);
        }
    }

    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "-1");
    }
});

setInterval(() => {
    mp.game.invoke('0x9E4CFFF989258472');
    mp.game.invoke('0xF4F2C0D4EE209E20');
}, 20000);

mp.events.add("client:gui:addWayPoint", (x, y) => {
    mp.game.ui.setNewWaypoint(x, y);
})

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};

let gui;

mp.events.add('client:moveSkyCamera', (moveTo, switchType, showGui) => {
    switch (moveTo) {
        case 'up':
            if (showGui == false) {
                mp.gui.chat.show(showGui);
                gui = 'false';
            };
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, mp.players.local.handle, 0, parseInt(switchType));
            break;
        case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, mp.players.local.handle);
            break;

        default:
            break;
    }
});

function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.gui.chat.show(true);
        gui = 'true';
    }
}

mp.events.add("client:toggleGodmode", state => {
    mp.game.player.setInvincible(state)
})

mp.events.add("client:freezePlayer", state => {
    mp.players.local.freezePosition(state)
})
}