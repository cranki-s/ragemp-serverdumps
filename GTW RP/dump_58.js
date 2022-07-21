{
require('./gtalife/HelicopterCamera/Core.js')
require('./gtalife/HelicopterCamera/Spotlight.js')
let INSTANCE = null
let VEHICLE = null
__Spotlight() 

let LAST_TRIGGER = new Date() 

mp.events.add("render", () =>{

	if (!mp.game.controls.isControlJustPressed(28, 244)) return
	if ((new Date()) - LAST_TRIGGER < 250) return
	if (mp.gui.cursor.visible) return
	
	LAST_TRIGGER = new Date()
	if (INSTANCE)
		mp.events.callRemote("HelicopterCamera::Leave")
	else{
		if (!mp.players.local.vehicle || (mp.players.local.vehicle.getClass() != 15 && mp.players.local.vehicle.getClass() != 16)) return	
		mp.events.callRemote("HelicopterCamera::Request")
	}

})
	

mp.events.add("HelicopterCamera::Enable", (time, agency, plate, id, vehicle) =>{
	if (!mp.players.local.vehicle || (mp.players.local.vehicle.getClass() != 15 && mp.players.local.vehicle.getClass() != 16)) return	
	if (mp.players.local.vehicle != vehicle) return 
	if (mp.players.local.isDead()) return 
	if (INSTANCE) INSTANCE.destructor()
	VEHICLE = vehicle 
	INSTANCE = __Core(time, agency, plate, id)
})

mp.events.add("HelicopterCamera::Disable", () =>{
	if (INSTANCE){
		INSTANCE.destructor()
	}

	INSTANCE = null 
	VEHICLE = null
})

mp.events.add("playerDeath", (player) => {
	if (player != mp.players.local) return
    if (INSTANCE)
		mp.events.callRemote("HelicopterCamera::Leave")
})

mp.events.add("playerLeaveVehicle", () => {
	if (VEHICLE == null) return
	
	if (INSTANCE)
    	mp.events.callRemote("HelicopterCamera::Leave")
})

}