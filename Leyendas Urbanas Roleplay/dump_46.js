{
/*
    taxista.js

    Autor: Kenshin

    Descripción: Controlador del taximetro y otras funciones del trabajo de taxista
*/

var taximetro = undefined;

var intervalo_taximetro = null;

mp.events.add({
    "taxista:mostrar": (tarifa, importe) => {
        if (taximetro !== undefined) {
            // Desactivamos el cursor
            mp.gui.cursor.visible = false;
            // Destruimos el navegador
            if (mp.browsers.exists(taximetro))
                taximetro.destroy();
            taximetro = undefined;
        }

        taximetro = mp.browsers.new("package://LURP/cef/taxista/taxista.html");
        taximetro.execute(`actualizar("${tarifa}","${importe}")`);
    },
    "taxista:iniciar": (tarifa) => {
        if (player_local.vehicle) {
            if (player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
                if (tarifa > 0 && tarifa < 5) {
                    mp.events.callRemote("taxista:iniciar", tarifa);
                    taximetro.execute(`actualizar("0", "0")`);
                }
            }
        }
    },
    "taxista:actualizar": (tarifa, importe) => {
        if (taximetro !== undefined) {
            taximetro.execute(`actualizar("${tarifa}","${importe}")`);
        }
    },
    "taxista:libre": () => {
        if (player_local.vehicle) {
            if (player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
                mp.events.callRemote("taxista:libre");
                mp.events.call("taxista:luz");
        
                taximetro.execute(`actualizar("0", "0")`);
            }
        }
    },
    "taxista:luz": () => {
        if (taximetro !== undefined) {
            if (player_local.vehicle) {
                player_local.vehicle.setTaxiLights(true);
            }
        }
    },
    "taxista:cerrar": () => {
        if (taximetro !== undefined) {
            // Desactivamos el cursor
            mp.gui.cursor.visible = false;
            // Destruimos el navegador
            if (mp.browsers.exists(taximetro))
                taximetro.destroy();
            taximetro = undefined;
        }
    },
    "taxista:pagar": () => {
        if (taximetro !== undefined) {
            if (player_local.vehicle) {
                if (player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
                    mp.events.callRemote("taxista:pagar");
                    taximetro.execute(`resetTarifa()`);
                }
            }
        }
    }

});


/*mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();
		
	if (commandName === "taxini") {
        //mp.gui.chat.push("[DEBUG] Finalizas la sesión de pesca del cliente.");
        mp.gui.chat.push("[DEBUG] Inicias el contador del taxímetro.");
		mp.events.call("taxista:iniciar", 4);
	}
});*/

mp.events.add("playerLeaveVehicle", () => {
    if (taximetro !== undefined) {
        mp.events.call("taxista:cerrar");
    }
})

function playerDeathHandler(player, reason, killer) {
    if(player == player_local)
    {
        if (taximetro !== undefined) {
            mp.events.call("taxista:cerrar");
        }
    }
}
mp.events.add("playerDeath", playerDeathHandler);

function playerSpawn(player) {
    if(player == player_local)
    {
        if (taximetro !== undefined) {
            mp.events.call("taxista:cerrar");
        }
    }
}
mp.events.add("playerSpawn", playerSpawn);
}