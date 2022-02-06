{
﻿require('./gtalife/HelicopterCamera/Camera.js')
require('./gtalife/HelicopterCamera/Controls.js')
require('./gtalife/HelicopterCamera/Graphics.js')
require('./gtalife/HelicopterCamera/Lock.js')
require('./gtalife/HelicopterCamera/SoundFrontEnd.js')
require('./gtalife/HelicopterCamera/RayEngine/Ray.js')

class Core{

	enable(){ 
		this.sound.play("SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET")
		this.active = true 
		mp.players.local.m_ThermalActive = true
	}

	disable(){ 
		this.active = false 
		mp.players.local.m_ThermalActive = false
	}

	constructor(time, agency, plate, vin){

		this.camera = __Camera(this)
		this.controls = __Controls(this)
		this.ray = __RayManager(this)
		this.graphics = __Graphics(this, time, agency, plate, vin)
		this.lock = __Lock(this)
		this.sound = __SoundFrontEnd(this)

		this.enable()
	}

	destructor(){ 
		this.camera.destructor()
		this.controls.destructor()
		this.graphics.destructor()
		this.lock.destructor()
		mp.players.local.m_ThermalActive = false	
		this.sound.play("SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET")

		this.sound.destructor()
	}

}


function __Core(time, agency, plate, vin){
	return new Core(time, agency, plate, vin)
}
}륮`