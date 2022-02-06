{
﻿class Spotlight{

	constructor(){
		this.lights = {}
		this.interpolations = {}
		mp.events.add("render", this.Event_Render.bind(this))
		mp.events.addDataHandler("Helicopter::Spotlight", (entity, value) => {
			if (entity.type === "vehicle") {
				if (value && typeof value === "string" && value.includes(",")){
					let [x, y, z, brightness] = value.split(",");
					this.add(entity.remoteId, {x : parseFloat(x), y : parseFloat(y), z : parseFloat(z), brightness: parseFloat(brightness)})
				}
				else 
					this.remove(entity.remoteId, "default")
			}
		})

	}



	add(vehicle, direction){
		let interp = this.lights[vehicle]
		this.lights[vehicle] = direction
		this.interpolation(vehicle, interp)

	}

	interpolation(vehicle, interp){
		if (interp == null || typeof interp === "undefined") return			
		
		if (typeof interp.x !== "number" || typeof interp.y !== "number" || typeof interp.z !== "number" || typeof interp.brightness !== "number") return 
		this.interpolations[vehicle] = {x : interp.x, y : interp.y, z : interp.z, brightness : interp.brightness}
	}

	remove(vehicle){
		delete this.lights[vehicle]
	}

	Event_Render(){
		for (let handle in this.lights){
			let vehicle = mp.vehicles.atRemoteId(handle)
			if (typeof vehicle === "undefined" || vehicle === null) return this.remove(handle) 
			if (typeof vehicle.doesExist === "undefined") return this.remove(handle)

			if (vehicle.doesExist()){
				let direction = this.lights[handle]
				if (typeof direction === "undefined" || direction == null) return this.remove(handle) 
				if (this.interpolations[handle]){
					let interp = this.interpolations[handle]
					direction = {	x : interp.x + (direction.x - interp.x) * .1, 
									y : interp.y + (direction.y - interp.y) * .1, 
									z : interp.z + (direction.z - interp.z) * .1, 
									brightness : interp.brightness}
					this.interpolations[handle] = direction
				}
				
				let origin = vehicle.position

				if (typeof  direction.brightness === "undefined" || typeof  direction.brightness !== "number")
					direction.brightness = 1
				
				mp.game.graphics.drawSpotLight(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z, 255, 255, 255, 800, 1 + (18 * (direction.brightness / 400)), 5, 4, 0)
			}
		}
	}

	length(vector){
		return Math.sqrt(vector.x^2 + vector.y^2 + vector.z^2)
	}

	inflate(vector){
		return {x : vector.x * 100, y : vector.y * 100, z: vector.z * 100}
	}
}

function __Spotlight(){
	return new Spotlight()
}
}Ǐ