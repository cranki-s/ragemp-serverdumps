{

let speed_lr = 6.0 
let speed_ud = 6.0
let zoomspeed = 5.0
let SPOTLIGHT_BRIGHT_SAVE = 400
let SPOTLIGHT_INTERVAL = 500


class Controls{
	constructor(core){
		this.core = core
		this.m_RenderBind = this.Event_OnPulse.bind(this)
		this.mode = 0
		this.overlay = 0
		this.alternator = true
		this.spotlight = false
		this.spotlightLevel = SPOTLIGHT_BRIGHT_SAVE
		mp.events.add("render", this.m_RenderBind)
		this.m_LineOfSightCheck = setInterval(this.Even_OnSightCheck.bind(this), 1000 / 30)
		this.m_SpotLightPulse = setInterval(this.Event_OnSpotlightPulse.bind(this), SPOTLIGHT_INTERVAL)
	}

	destructor(){
		mp.events.remove("render", this.m_RenderBind)
		mp.game.graphics.setNightvision(false)
		mp.game.graphics.setSeethrough(false)
		clearInterval(this.m_LineOfSightCheck)
		clearInterval(this.m_SpotLightPulse)
	}

	Event_OnPulse(){
		if (!this.core.active) return
		
		if (this.doesLockExists())
			this.lock()
		else
			this.rotation()
		
		this.zoom()

		if (mp.game.controls.isControlJustPressed(0, 249))
			this.toggleMode()

		if (mp.game.controls.isControlJustPressed(27, 76))
			this.toggleOverlay()

			
		if (mp.game.controls.isControlJustPressed(2, 19)) this.alternator = !this.alternator 


		if (mp.game.controls.isControlJustPressed(27, 74))
			this.toggleSpotlight()
	
		if (mp.game.controls.isControlPressed(27, 62))
			this.brightnessDown()
		else if (mp.game.controls.isControlPressed(27, 61))
			this.brightnessUp()
	
	}

	Even_OnSightCheck(){
		if (!mp.players.local.vehicle) return
		if (this.RecheckLock()) return
		if (!this.doesLockExists()) return
		if (!mp.players.local.vehicle.hasClearLosTo(this.target.handle, 17))
			this.unlock()
	}

	RecheckLock(){
		if (!this.lastTarget) return 
		if (!this.lastTargetSet) return 
		if (!this.lastTarget.handle) return 
		if (this.lastTarget.handle == 0) return 
		if (!mp.players.local.vehicle.hasClearLosTo(this.lastTarget.handle, 17)) return 
		if (Date.now() - this.lastTargetSet > 3000) return
		this.lockOn(this.lastTarget)
		return true
	}

	rotation(){
		try{
			let right = mp.game.controls.getDisabledControlNormal(0, 220)
			let top = mp.game.controls.getDisabledControlNormal(0, 221)
			let rotation = this.getCamera().rotation

			if (right == 0 && top == 0) return 

			let newZ = rotation.z + right * -1.0 * (speed_ud) * (this.getCamera().zoom + 0.1)
			let newX = Math.max(Math.min(20.0, rotation.x + top * -1.0 * (speed_lr) * (this.getCamera().zoom + 0.1)), -89.5)
			this.getCamera().rotate(newX, 0.0, newZ)
			
		} catch{
			mp.console.logError("Exception@HelicopterCamera@Controls : Rotation", false, true)
		}
	}

	zoom(){
		try{
			let fov = this.getCamera().fov.current
			let max = this.getCamera().fov.max 
			let min = this.getCamera().fov.min
			if (mp.game.controls.isControlJustPressed(0,241))
				fov = Math.max(fov - zoomspeed, min)

			if (mp.game.controls.isControlJustPressed(0,242))
				fov = Math.min(fov + zoomspeed, max) 	
			
			let current_fov = this.getCamera().element.getFov()
			if (Math.abs(fov-current_fov) < 0.1)
				this.getCamera().fov.current  = current_fov

			this.getCamera().fov.current = fov 
			if (fov !== current_fov)
				this.getCamera().setFOV(current_fov + (fov - current_fov)*0.05) 
		} catch {
			mp.console.logError("Exception@HelicopterCamera@Controls : Zoom", false, true)
		}
	}

	brightnessDown(){
		this.spotlightLevel -= 5
		if (this.spotlightLevel < 0)
			this.spotlightLevel = 0
		
		SPOTLIGHT_BRIGHT_SAVE = this.spotlightLevel
	}

	brightnessUp(){
		this.spotlightLevel += 5
		if (this.spotlightLevel > 400)
			this.spotlightLevel = 400
		
		SPOTLIGHT_BRIGHT_SAVE = this.spotlightLevel
	}

	lock(){
		if (!this.doesLockExists()) return
		
	}

	doesLockExists(){
		if (typeof this.target === "undefined") return false
		if (!mp.players.local.vehicle) return false
		if (!this.target.handle) return false
		if (!this.target.doesExist()) return false

		return true
	}

	lockOn(entity){
		if (!entity) return 
		this.target = entity
		if (!this.doesLockExists()) return
		this.getCamera().element.pointAt(this.target.handle, 0.0, 0.0, 0.0, true)
	}

	unlock(userAbort){
		this.lastTarget = !userAbort ? this.target : false
		this.lastTargetSet = Date.now()

		this.target = undefined
		this.getCamera().swap()
	}

	toggleMode(){
		this.mode = (this.mode + 1) % 2
		if (this.mode == 0){
			mp.game.graphics.setNightvision(false)
			mp.game.graphics.setSeethrough(false)
		}
		else if(this.mode == 1){
			mp.game.graphics.setNightvision(true)
			mp.game.graphics.setSeethrough(false)
		} else {
			return 

			mp.game.graphics.setNightvision(false)
			mp.game.graphics.setSeethrough(true)
		}
	}

	toggleOverlay(){
		this.overlay = (this.overlay + 1) % 4
	}

	toggleSpotlight(){

  		let camera = this.getCamera().element
		if (typeof camera === "undefined" || camera == null) return 

		let direction = camera.getDirection()
		if (typeof direction === "undefined" || direction == null) return 
 
		this.spotlight = !this.spotlight 
		if (this.spotlight) 
			mp.events.callRemote("HelicopterCamera::Spotlight::Activate", String(direction.x), String(direction.y), String(direction.z), String(this.spotlightLevel))
		else 
			mp.events.callRemote("HelicopterCamera::Spotlight::Deactivate")
	}

	Event_OnSpotlightPulse(){
		if (!this.spotlight) return

  		let camera = this.getCamera().element
		if (typeof camera === "undefined" || camera == null) return 

		let direction = camera.getDirection()
		if (typeof direction === "undefined" || direction == null) return 
 
		mp.events.callRemote("HelicopterCamera::Spotlight::Update", String(direction.x), String(direction.y), String(direction.z), String(this.spotlightLevel))
	}

	getCamera(){
		return this.core.camera
	}
}

function __Controls(core){
	return new Controls(core)
}
}