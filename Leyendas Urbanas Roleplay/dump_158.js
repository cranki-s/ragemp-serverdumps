{
var arrastrando = false;
var arrastrado = false;
let uvedoblepulsada = false;
// EL QUE LO TIRA
mp.events.add('arrastrar_objetivo', async (arrastradoE) => {
    // if (arrastradoE != undefined && mp.players.exists(arrastradoE)) {
        crearTimeout(async () => {
            mp.game.streaming.requestAnimDict("combat@drag_ped@");
            for(let i = 0; mp.game.streaming.hasAnimDictLoaded("combat@drag_ped@") == false && i < 15; i++){
                mp.game.streaming.requestAnimDict("combat@drag_ped@");
                await mp.game.waitAsync(100);
            }
            arrastrando = true;
            mp.events.add("playerDeath", arrastrandoDeathHandle);
            waitFor(arrastradoE).then(player => {
                if (player) {
                    player.attachTo(player_local.handle, 11816, 0.0, 0.48, 0.0, 0.0, 0.0, 0.0, true, true, false, false, 0, true);
                    player.taskPlayAnim("combat@drag_ped@", "injured_drag_ped", 8.0, -8.0, 5000, 3, 0.0, false, false, false);
                }
            });

            player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_plyr", 1.0, 1.0, -1, 49, 0.0, false, false, false);
            mp.events.add('render', controlesArrastrar); // Crea el render
            mp.events.add('render', loopAnimacionArrastrado); // Crea el render
        }, 500)
    // }
});

// EL QUE LO RECIBE
mp.events.add('arrastrar_objetivo_recep', async (arrastraE) => { // No se ha llegado a probar
    // if (arrastraE != undefined && mp.players.exists(arrastraE)) {
        arrastrado = true;
        mp.game.streaming.requestAnimDict("combat@drag_ped@");
        for(let i = 0; mp.game.streaming.hasAnimDictLoaded("combat@drag_ped@") == false && i < 15; i++){
            mp.game.streaming.requestAnimDict("combat@drag_ped@");
            await mp.game.waitAsync(100);
        }
        mp.events.add("playerDeath", arrastradoDeathHandle);
        waitFor(arrastraE).then(player => {
            if (player) {
                player_local.attachTo(player.handle, 11816, 0.0, 0.48, 0.0, 0.0, 0.0, 0.0, true, true, false, false, 0, true);
                player.taskPlayAnim("combat@drag_ped@", "injured_drag_plyr", 1.0, 1.0, -1, 49, 0.0, false, false, false);   
            }
        });
        player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_ped", 8.0, 2.0, 5000, 3, 0.0, true, true, true);
        mp.events.add('render', loopAnimacionArrastrado);
    // }
});

mp.events.add('acabar_arrastrar', (arrastraE) => { 
    if (arrastrando) {
        arrastrando = false;
        player_local.detach(true, false);
        player_local.clearTasksImmediately();
        mp.events.remove("playerDeath", arrastrandoDeathHandle);
        mp.events.remove('render', controlesArrastrar);
        mp.events.remove('render', loopAnimacionArrastrado);
    }
    if(arrastraE != undefined && mp.players.exists(arrastraE))
    {
        arrastraE.detach(true, false);
        arrastraE.clearTasksImmediately();
    }
});

mp.events.add('acabar_arrastrar_recep', (arrastradoE) => { 
    if (arrastrado) {
        arrastrado = false;
        player_local.detach(true, false);
        player_local.clearTasksImmediately();
        mp.events.add("playerDeath", arrastradoDeathHandle);
        mp.events.remove('render', controlesArrastrar);
        mp.events.remove('render', loopAnimacionArrastrado);
    }
    if(arrastradoE != undefined && mp.players.exists(arrastradoE)){
        arrastradoE.clearTasksImmediately();
        arrastradoE.detach(true, false);
    }
});

mp.events.add("arrastrado:entrar_salir_interior", (tipo, pos, rot, propSQLID, jugadorArrastra) => {
    player_local.detach(true, false);
    mp.events.callRemote("arrastrado:tp_interior", tipo, pos, rot, propSQLID, jugadorArrastra);
})

function controlesArrastrar() {
    if (mp.game.controls.isDisabledControlPressed(0, 32) && !uvedoblepulsada) {
        uvedoblepulsada = true;
        player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_plyr", 8.0, 1.0, -1, 1, 0.0, false, false, false);
    }

    if (!mp.game.controls.isDisabledControlPressed(0, 32) && uvedoblepulsada) {
        mp.players.local.clearTasks();
        uvedoblepulsada = false;
        player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_plyr", 8.0, 1.0, -1, 49, 1.0, false, false, false);
    }
    if (mp.game.controls.isDisabledControlPressed(0, 34)) {
        mp.players.local.setHeading(mp.players.local.getHeading() + 0.3);
    }
    if (mp.game.controls.isDisabledControlPressed(0, 35)) {
        mp.players.local.setHeading(mp.players.local.getHeading() - 0.3);
    }
    mp.game.controls.disableControlAction(32, 24, true);
    mp.game.controls.disableControlAction(32, 25, true);
    mp.game.controls.disableControlAction(32, 30, true);
    mp.game.controls.disableControlAction(32, 31, true);
    mp.game.controls.disableControlAction(32, 33, true);
    mp.game.controls.disableControlAction(32, 34, true);
    mp.game.controls.disableControlAction(32, 35, true);
    mp.game.controls.disableControlAction(32, 75, true);

};

function loopAnimacionArrastrado() {
    let tiempoAnim = player_local.getAnimCurrentTime("combat@drag_ped@", "injured_drag_ped");
    mp.game.controls.disableControlAction(32, 24, true);
    mp.game.controls.disableControlAction(32, 25, true);
    mp.game.controls.disableControlAction(32, 30, true);
    mp.game.controls.disableControlAction(32, 31, true);
    mp.game.controls.disableControlAction(32, 33, true);
    mp.game.controls.disableControlAction(32, 34, true);
    mp.game.controls.disableControlAction(32, 35, true);
    mp.game.controls.disableControlAction(32, 75, true);


    if (arrastrando && uvedoblepulsada) {
        let tiempoAnim2 = player_local.getAnimCurrentTime("combat@drag_ped@", "injured_drag_plyr");
        if (tiempoAnim2 > 0.1) {
            player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_plyr", 8.0, 1.0, -1, 1, 0.0, false, false, false);
        }
    }
    if (tiempoAnim > 0.08) {
        player_local.taskPlayAnim("combat@drag_ped@", "injured_drag_ped", 1.0, 2.0, 5000, 3, 0.0, true, true, true);
    }

};


function arrastrandoDeathHandle() {
	if (!logueado) return;
	if (arrastrando == true)
        mp.events.callRemote("arrastrar:muerte");
}

function arrastradoDeathHandle() {
	if (!logueado) return;
	if (arrastrado == true)
		mp.events.callRemote("arrastrar:muerte");
}
}