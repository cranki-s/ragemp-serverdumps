{
﻿var esptoggle = 0;
var myalvl = 0;

mp.keys.bind(Keys.VK_F12, false, function () {
	if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true) return;
	myalvl = localplayer.getVariable('ALVL');
	if(esptoggle == 3) esptoggle = 0;
	else esptoggle++;
	if(esptoggle == 0) mp.game.graphics.notify('ESP: ~r~Disabled');
	else if(esptoggle == 1) mp.game.graphics.notify('ESP: ~g~ID Players');
	else if(esptoggle == 2) mp.game.graphics.notify('ESP: ~g~ID Vehicles');
	else if(esptoggle == 3) mp.game.graphics.notify('ESP: ~g~Players & Vehicles');
});

mp.events.add('render', () => {
	if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true) return;
    if(esptoggle >= 1) {
		try {
			let position;
			if(esptoggle == 1 || esptoggle == 3) {
				mp.players.forEachInStreamRange(player => {
					if (player.handle !== 0 && player !== mp.players.local) {
						if(myalvl >= player.getVariable('ALVL')) {
							position = player.position;
							let sped = player.vehicle ? player.vehicle.getSpeed() : 0;
							if(player.getVariable('IS_ADMIN')) {
								mp.game.graphics.drawText(`#${player.getVariable('PERSON_ID')}, ID: ${player.remoteId} - ${player.name}, HP: ${player.getHealth()}/100, AR: ${player.getArmour()}/100, SPED: ${sped}, FRAC: ${player.getVariable('FRAC_ID')}, VOICE:${player.isVoiceActive}`, [position.x, position.y, position.z+ 1.5], {
									scale: [0.3, 0.3],
									outline: true,
									color: [255, 0, 0, 255],
									font: 4
								});
							} else {
								mp.game.graphics.drawText(`#${player.getVariable('PERSON_ID')}, ID: ${player.remoteId} - ${player.name}, HP: ${player.getHealth()}/100, AR: ${player.getArmour()}/100, SPED: ${sped}, FRAC: ${player.getVariable('FRAC_ID')}, VOICE:${player.isVoiceActive}`, [position.x, position.y, position.z+ 1.5], {
									scale: [0.3, 0.3],
									outline: true,
									color: [255, 255, 255, 255],
									font: 4
								});
							}
						}
					}
				});
			}
			if(esptoggle == 2 || esptoggle == 3) {
				mp.vehicles.forEachInStreamRange(vehicle => {
					if (vehicle.handle !== 0 && vehicle !== mp.players.local) {
						position = vehicle.position;
						var hp = mp.game.invoke("0xEEF059FAD016D209", vehicle.handle);
						mp.game.graphics.drawText(`ID: ${vehicle.remoteId}, LOCK: ${vehicle.getVariable('LOCKED')}, MODEL: ${mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)}, NUMBER: ${mp.game.invokeString("0x7CE1CCB9B293020E", vehicle.handle)} HP: ${hp}/1000 \n X:${position.x} Y:${position.y} Z:${position.z}`, [position.x, position.y, position.z-0.5], {
							scale: [0.3, 0.3],
							outline: true,
							color: [255, 255, 255, 255],
							font: 4
						});
					}
				});
			}
		} catch { }
	}
});
}