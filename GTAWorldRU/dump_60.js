{
﻿class Lock{
	constructor(core){
		this.core = core
		this.m_Pulse = setInterval(this.Event_OnPulse.bind(this), 1000 / 30)
	}

	Event_OnPulse(){
		try{
			if (mp.game.controls.isDisabledControlPressed(0, 25))
				return this.getControl().unlock(true)

			if (!mp.game.controls.isDisabledControlPressed(0, 24)) return 

			let vehicle = this.cast()
			
			if (vehicle && vehicle.entity){
				if (typeof vehicle.entity.getType == "function" && (vehicle.entity.getType() == 2 || vehicle.entity.getType() == 4 || vehicle.entity.getType() == 1) && vehicle.entity !== mp.players.local.vehicle){
					
					this.getControl().lockOn(vehicle.entity)
				}
			}
		} catch{
			mp.console.logError("Exception@HelicopterCamera@Lock : Event_OnPulse", false, true)
		}
	}


	cast() {
		try{
			if (!mp.players.local.vehicle) return
			let distance = 1000
			let camera = this.getCamera().element

			if (typeof camera === "undefined" || camera == null) return 

			let position = camera.getCoord()
			if (typeof position === "undefined" || position == null) return 

			let direction = camera.getDirection()
			if (typeof direction === "undefined" || direction == null) return 
	
			let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z))
			if (typeof farAway === "undefined" || farAway == null) return 
			
			//let result = mp.raycasting.testPointToPoint(position, farAway, mp.players.local.vehicle.handle)
			
			let result = null
			let lowest = [9999, null]
			mp.vehicles.forEachInStreamRange(vehicle => {
				if (vehicle == mp.players.local.vehicle) return
				if (result) return
				if (!this.core.ray.Ray(position, direction, vehicle)) return
				let screen =  mp.game.graphics.world3dToScreen2d(vehicle.position)
				if (!screen) return 
				let dist = Math.abs(0.5 - screen.x) + Math.abs(0.5 - screen.y) 
				if (lowest[0] > dist) lowest = [dist, vehicle]
			})

			
			return {entity: lowest[1]}
		} catch {
			//EXCEPTION
		}
	}

	getCamera(){
		return this.core.camera
	}

	getControl(){
		return this.core.controls
	}

	getGraphics(){
		return this.core.graphics
	}

	destructor(){
		clearInterval(this.m_Pulse)
	}
}


function __Lock(core){
	return new Lock(core)
}
}