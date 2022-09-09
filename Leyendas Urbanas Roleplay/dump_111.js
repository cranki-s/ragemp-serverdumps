{
const localPlayer = mp.players.local;
var requesting = false;
var accessGranted = false;
var isPrisonGuard = false;
var loadedDoors = false;
var lockdownEvent = false;
var doorModelExterior=320433149;
var doorModelWooden=-1320876379;
var doorModelSecure=749848321;
var doorModelBars=631614199;
var myDoorsExterior = [];
var myDoorsWood = [];
var myDoorsSecured = [];
var myDoorsBars = [];

let luz1 = null;
let luz2 = null;
let luz3 = null;
let luz4 = null;
let luz5 = null;
let luz6 = null;

mp.events.add("federal:lockdown:iniciar", async () => {
    federalLockdown = true;
    lockdownEvent = true;
    mp.game.audio.prepareAlarm("PRISON_ALARMS");
    mp.game.audio.startAlarm("PRISON_ALARMS", true);

    //Nos aseguramos que la puta alarma suene coño
	if(!mp.game.audio.isAlarmPlaying("PRISON_ALARMS"))
	{
		let intervalo;
		intervalo = setInterval( async () => {
			if(mp.game.audio.isAlarmPlaying("PRISON_ALARMS"))
			{
				clearInterval(intervalo);

			}
			mp.game.audio.startAlarm("PRISON_ALARMS", true);	
			await mp.game.waitAsync(100);
		}, 100);
	}

    luz1 = mp.objects.new(mp.game.joaat("prop_wall_light_10a"), new mp.Vector3(1765.677, 2528.958, 47.7038), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
    luz2 = mp.objects.new(mp.game.joaat("prop_wall_light_10b"), new mp.Vector3(1780.71, 2510.574, 47.70433), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
    luz3 = mp.objects.new(mp.game.joaat("prop_wall_light_10b"), new mp.Vector3(1733.636, 2483.24, 47.70423), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
    luz4 = mp.objects.new(mp.game.joaat("prop_wall_light_10a"), new mp.Vector3(1716.275, 2487.162, 47.70369), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
    luz5 = mp.objects.new(mp.game.joaat("prop_wall_light_10b"), new mp.Vector3(1771.761, 2473.129, 47.70428), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
    luz6 = mp.objects.new(mp.game.joaat("prop_wall_light_10b"), new mp.Vector3(1693.629, 2435.771, 47.70418), { rotation: new mp.Vector3(0, 0, 0), alpha: 255, dimension: 0 });
});

mp.events.add("federal:lockdown:parar", () => {
    federalLockdown = false;
    lockdownEvent = false;
    mp.game.audio.stopAlarm("PRISON_ALARMS", true);

    if (mp.objects.exists(luz1))
        luz1.destroy();
    if (mp.objects.exists(luz2))
        luz2.destroy();
    if (mp.objects.exists(luz3))
        luz3.destroy();
    if (mp.objects.exists(luz4))
        luz4.destroy();
    if (mp.objects.exists(luz5))
        luz5.destroy();
    if (mp.objects.exists(luz6))
        luz6.destroy();
});

function setDoorsState(puertas)
{
	for (let i = 0; i < puertas.length; i++) 
	{
		let doorStatus = puertas[i].abierta;
		let x = puertas[i].x;
		let y = puertas[i].y;
		let z = puertas[i].z;
		let doorHash = puertas[i].hash;
		mp.game.object.doorControl(doorHash, x, y, z, !doorStatus, 0.0, 50.0, 0.0);
		//mp.game.object.doorControl(doorHash, x, y, z, !doorStatus, 0.0, 50.0, 0.0);
	}
}

function setDoorState(hash, doorID, abierto)
{
    if (!loadedDoors) return;
	switch (hash) {
	  case doorModelExterior: myDoorsExterior[(doorID-1)].abierta = abierto; break;
	  case doorModelWooden: myDoorsWood[(doorID-1)].abierta = abierto; break;
	  case doorModelSecure: myDoorsSecured[(doorID-1)].abierta = abierto; break;
	  case doorModelBars: myDoorsBars[(doorID-1)].abierta = abierto; break;
	  default: break;
	}
}

function openDoor(puerta)
{
    if (!loadedDoors) return;
	let x = puerta.x;
	let y = puerta.y;
	let z = puerta.z;
	let doorHash = puerta.hash;
	mp.events.callRemote("setDoorStatuscs",doorHash,puerta.doorID,false, x, y, z);
}

function lockDoor(puerta)
{
    if (!loadedDoors) return;
	let x = puerta.x;
	let y = puerta.y;
	let z = puerta.z;
	let doorHash = puerta.hash;
	mp.events.callRemote("setDoorStatuscs",doorHash,puerta.doorID,true, x, y, z);
}

function getDistance(pos1,pos2)
{
    let distance = mp.game.gameplay.getDistanceBetweenCoords(pos1.x,pos1.y,pos1.z, pos2.x,pos2.y,pos2.z, true);
    return distance;
}

const loadAnim = (anim) => {
    return new Promise(resolve => {
        mp.game.streaming.requestAnimDict(anim)
        const timer = setInterval(() => {
            if (mp.game.streaming.hasAnimDictLoaded(anim)) {
                clearInterval(timer);
                resolve();
            }
        }, 100)
    })
}

function CloseToFederalDoors(puertas)
{
	let playerPos = localPlayer.position;
	for (i = 0; i < puertas.length; i++) 
	{
  		let puertaPos = new mp.Vector3(puertas[i].x, puertas[i].y, puertas[i].z);
  		if(getDistance(playerPos,puertaPos)<1.5)
		{
			return puertas[i];
  		}
	}
	return false;
}

function GetCloseDoor()
{
	var closeDoor = false;
	closeDoor = CloseToFederalDoors(myDoorsExterior);
	if(closeDoor==false)
		closeDoor = CloseToFederalDoors(myDoorsWood);
	if(closeDoor==false)
		closeDoor = CloseToFederalDoors(myDoorsSecured);
	if(closeDoor==false)
		closeDoor = CloseToFederalDoors(myDoorsBars);
	return closeDoor;
}

function CheckAccess()
{
	accessGranted = false;
	isPrisonGuard = false;
    let p = mp.controladorJugadores._jugadores[localPlayer.id];
	//mp.gui.chat.push("!{#FF5900}>P? "+p);
	if(p == undefined) return;
    //TODO Tarda algo de tiempo en cargar, ¿Se puede forzar?

	for (tId of p.trabajos) {
		if((tId == 1 || tId == 2 || tId == 3 || tId == 25) && p.deservicio && lockdownEvent) accessGranted=true; //PD SD FD FIB
		if ((tId == 31 && p.deservicio) || adminservicio) { isPrisonGuard = true; accessGranted = true; }//SASPA //adminservicio
	}

}

mp.keys.bind(0x46, false, () => { //Tecla F (Solicitar permiso)
	if (!logueado) return;
    if (estaChatAbierto) return;
	if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (!loadedDoors) return;
	var currentDoor = GetCloseDoor();
	let playerPos = localPlayer.position;

	CheckAccess();
		
	if(!requesting && currentDoor!=false)
	{
		let doorSecurity = currentDoor.segura;
		if(!doorSecurity)
		{
			//puertas estado fijo
			let doorStatus = currentDoor.abierta;
			if(doorStatus){
				//if(accessGranted && isPrisonGuard) Desconozco porque lo teniamos asi pero lo quito para cuando salte la alarma todos puedan
				if(accessGranted)
				{
					//cerrar puerta
					if(!adminservicio)
					{
						mp.gui.chat.push("!{#A589B9}> coge su radio y solicita bloquear la puerta.");
						loadAnim("amb@code_human_police_investigate@idle_a").then(_ => {
							localPlayer.taskPlayAnim("amb@code_human_police_investigate@idle_a", 'idle_b', 8.0, 1.0, -1, 1, 0, false, false, false)
						});
					}
					else
					{
						mp.gui.chat.push("!{#A589B9}> bloqueando puerta...");
					}
					requesting=true;

			       	const timerstandar1 = setInterval(() => {
        				localPlayer.stopAnimPlayback(0, false);
						mostrarAviso("info", 5000, "Puerta bloqueada");
						//mp.game.audio.playSound(-1, "OOB_Cancel", "GTAO_FM_Events_Soundset", true, 0, true);
						lockDoor(currentDoor);
						currentDoor.abierta = false;
						requesting=false;
		                clearInterval(timerstandar1);
			        }, 2000);

				}
				else
				{
					mostrarAviso("danger", 5000, "No puedes bloquear esta puerta");
				}
			}
			else{
				//if(accessGranted && isPrisonGuard) Desconozco porque lo teniamos asi pero lo quito para cuando salte la alarma todos puedan
				if(accessGranted)
				{
					//abrir puerta
					if(!adminservicio)
					{
						mp.gui.chat.push("!{#A589B9}> coge su radio y solicita desbloquear la puerta.");
						loadAnim("amb@code_human_police_investigate@idle_a").then(_ => {
							localPlayer.taskPlayAnim("amb@code_human_police_investigate@idle_a", 'idle_b', 8.0, 1.0, -1, 1, 0, false, false, false)
						});
					}
					else
					{
						mp.gui.chat.push("!{#A589B9}> desbloqueando puerta...");
					}
					requesting=true;

			       	const timerstandar2 = setInterval(() => {
        				localPlayer.stopAnimPlayback(0, false);
						mostrarAviso("success", 5000, "Puerta desbloqueada");
						//mp.game.audio.playSound(-1, "OOB_Start", "GTAO_FM_Events_Soundset", true, 0, true);
						openDoor(currentDoor);
						currentDoor.abierta = true;
						requesting=false;
		                clearInterval(timerstandar2);
			        }, 2000);
				}
				else
				{
					mostrarAviso("danger", 5000, "Está cerrada");
				}
			}
		}
		else{
			//puertas estado temporal
			if(accessGranted)
			{
				if(isPrisonGuard && !adminservicio)
				{
					mp.gui.chat.push("!{#A589B9}> coge su radio y solicita permiso.");
					loadAnim("amb@code_human_police_investigate@idle_a").then(_ => {
						localPlayer.taskPlayAnim("amb@code_human_police_investigate@idle_a", 'idle_b', 8.0, 1.0, -1, 1, 0, false, false, false)
					});
				}

				requesting=true;
				mostrarAviso("success", 5000, "Comprobando permiso para acceder");

				const timersecure1 = setInterval(() => {
            		localPlayer.stopAnimPlayback(0, false);
					mostrarAviso("success", 5000, "Acceso temporal concedido");
					//mp.game.audio.playSound(-1, "OOB_Start", "GTAO_FM_Events_Soundset", true, 0, true);
					openDoor(currentDoor);
					requesting=false;
	                clearInterval(timersecure1);
		        }, 2000);
		       	const timersecure2 = setInterval(() => {
					lockDoor(currentDoor);
					mostrarAviso("info", 5000, "Puerta bloqueada");
	                clearInterval(timersecure2);
		        }, 7000);
			}
			else
			{
				mp.game.audio.playSound(-1, "OOB_Cancel", "GTAO_FM_Events_Soundset", true, 0, true);
				mostrarAviso("danger", 5000, "No tienes permiso para acceder. Acceso denegado");
			}
		}
	}
});

mp.events.add({
    changeDoorStatus: (doorHash, puerta, cerrada, x, y, z) => {
		mp.game.object.doorControl(doorHash, x, y, z, cerrada, 0.0, 50.0, 0.0);
		let playerPos = localPlayer.position;
		let puertaPos = new mp.Vector3(x,y,z);
		let dist = getDistance(playerPos,puertaPos);
		if(cerrada)
		{
			if(dist<=3) mp.game.audio.playSoundFromCoord(1, "OOB_Cancel", x, y, z, "GTAO_FM_Events_Soundset", false, 0, false);
			mp.game.object.setStateOfClosestDoorOfType(doorHash, x, y, z, true, 0, false);
		}
		else
		{
			if(dist<=3) mp.game.audio.playSoundFromCoord(1, "OOB_Start", x, y, z, "GTAO_FM_Events_Soundset", false, 0, false);
		}
		setDoorState(doorHash,puerta,!cerrada);
    },
    loadDoorStatus: (serverDoorsExterior, serverDoorsWood, serverDoorsSecured, serverDoorsBars) => {
		myDoorsExterior=serverDoorsExterior;
		myDoorsWood=serverDoorsWood;
		myDoorsSecured=serverDoorsSecured;
		myDoorsBars=serverDoorsBars;
		setDoorsState(myDoorsExterior);
		setDoorsState(myDoorsWood);
		setDoorsState(myDoorsSecured);
		setDoorsState(myDoorsBars);
		loadedDoors = true;
	},
	closeSecuredDoorCEF: (cefDoor) => {
		const timersecureCEF = setInterval(() => {
			lockDoor(cefDoor);
			clearInterval(timersecureCEF);
		}, 7000);
    }
});

mp.events.add("evento_lockdown", () => {
	if(lockdownEvent) lockdownEvent = false;
	else lockdownEvent = true;
})
}