{
﻿class Camera{
	constructor(core){

		this.core = core

		this.element = mp.cameras.new('GTA_WORLD_HELICOPTER_CAMERA', mp.players.local.vehicle.position, new mp.Vector3(0, 0, 0), 45)
		this.disableDOF()
		this.attach(mp.players.local.vehicle)
		this.rotate(0, 0, mp.players.local.vehicle.getHeading())
		
		this.fov = {max: 85, min: 1, current : 45}
		this.setFOV(45)

		this.activate()
	}

	attach(toElement){
		mp.game.invoke("0xFEDB7D269E8C60E3", this.element.handle, toElement.handle,  0.0, 0.0, -1.5, true)
	}

	rotate(x, y, z){
		if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" ) return
		this.element.setRot(x, y, z, 2);
		this.rotation = {x : x, y : y, z : z}
	}

	setFOV(value){
		this.element.setFov(parseFloat(value.toFixed(1)))
		this.zoom = (1.0 / (this.fov.max - this.fov.min))*(this.fov.current - this.fov.min)
	}

	activate(){
		this.element.setActive(true)
		mp.game.cam.renderScriptCams(true, false, 0, true, false)
	}

	disable(){
		this.element.setActive(false)
		this.element.destroy()
		mp.game.cam.renderScriptCams(false, false, 0, true, false)
	}

	getFov(){
		return this.fov.current
	}

	swap(){
		if (!mp.cameras.exists(this.element)) return 

		let old = this.element 
		let rotation = this.element.getRot(2) 
		let fov = this.element.getFov()
		
		old.setActive(false) 
		old.destroy() 
	
		this.element = mp.cameras.new('GTA_WORLD_HELICOPTER_CAMERA', mp.players.local.vehicle.position, new mp.Vector3(rotation.x, rotation.y, rotation.z), fov)
		this.disableDOF()

		this.attach(mp.players.local.vehicle)
		this.rotate(rotation.x, rotation.y, rotation.z)
		
		this.activate()
	}

	disableDOF(){
		this.element.setUseShallowDofMode(false)
		this.element.setDofFocusDistanceBias(9999)
		this.element.setDofFnumberOfLens(0)
		this.element.setDofStrength(0)
		this.element.setFarDof(0)
	}
	destructor(){
		this.disable()
	}

}

function __Camera(core){
	return new Camera(core)
}
}汹륮`