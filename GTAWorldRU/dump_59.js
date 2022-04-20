{
﻿let MONTH_SHORT = ["ЯНВ", "ФЕВ", "МАРТ", "АПР", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГ", "СЕНТ", "ОКТ", "НОЯ", "ДЕК"]

class StaticBrowser{
	static Browser = false 
	static IsReady = false
	static EventHook = false
	static Initialized = false
	static Queue = []
	static Create(){
		this.Initialized = true
		if (this.Browser) return 
		this.Browser = mp.browsers.new('package://gtalife/HelicopterCamera/CEF/index.html')
		this.EventHook = this.Event_OnDomReady.bind(this)
		mp.events.add("browserDomReady", this.EventHook)
	}

	static Destroy(){
		mp.events.remove("browserDomReady", this.EventHook)
		this.IsReady = false 
		this.Browser = false 
		this.EventHook = false
	}
	
	static Operation(operation){
		this.Create()
		if (!this.IsReady)
			this.Queue.push(operation)
		else 
			this.Browser.execute(operation)
	}

	static Event_OnDomReady(browser){
		if (this.Browser != browser) return 
		this.IsReady = true

		this.Queue.forEach(operation => this.Browser.execute(operation))
	}

	static Execute(name, ...args){
        let argumentsString = '';
        for (let arg of args) {
            switch (typeof arg) {
                case 'string': {
                    argumentsString += `'${arg}',`;
                    break;
                }
                case "number":
                case "boolean": {
                    argumentsString += `${arg},`;
                    break;
                }
                case "object": {
                    argumentsString += `${JSON.stringify(arg)},`;
                    break;
                }
            }
        }
		this.Operation(`typeof __Core.${name} !== "undefined" && __Core.${name}(${argumentsString})`)
    }
}

class Graphics{
	constructor(core, time, agency, plate, vin){

		this.core = core
		this.time = new Date(time)
		this.agency = agency
		this.plate = plate 
		this.vin = vin
		mp.game.graphics.setTimecycleModifier("heliGunCam")
		mp.game.graphics.setTimecycleModifierStrength(.2)

		this.m_RenderBind = this.Event_Render.bind(this)
		this.m_CastPulse = setInterval(this.Event_OnCastInfo.bind(this), 250)
		this.m_TimePulse = setInterval(this.Event_OnTimePulse.bind(this), 1000)

		StaticBrowser.Execute("Activate", StaticBrowser.Initialized)

		this.m_Data = {}
		this.m_Data["LABEL"] = {}
		this.m_Data["RANGE"] = {}
		this.m_Data["IMAGE"] = {}
		this.m_Data["CLOCK"] = {}

		mp.events.add("render", this.m_RenderBind)
		mp.events.call("toggle_display_gtaw", false)
	}


	Event_Render(){
		
		if (!mp.players.local.vehicle) return
		
		StaticBrowser.Execute("Event_OnViewData",  this.getView())

		mp.game.invoke("0x719FF505F097FD20")
		
		let origin = mp.players.local.vehicle.position
		this.laserDistance = 0.0
		if (typeof this.cast !== "undefined" && this.cast !== null)
			this.laserDistance = mp.game.gameplay.getDistanceBetweenCoords(origin.x, origin.y, origin.z, this.cast.x, this.cast.y, this.cast.z, true)

		if (this.laserDistance)
			this.laserDistance = this.pad(Math.trunc(this.laserDistance * 3.28), 4)

		this.m_Data["LABEL"]["TARGET_DISTANCE"] = {text : `${this.laserDistance} LD FT`, visible: true}

		
		let spotlight = this.pad(Math.floor(this.clamp(typeof this.getControls().spotlightLevel !== "undefined" ? this.getControls().spotlightLevel : 0, 400, 0) * 100), 3)
		this.m_Data["LABEL"]["LIGHT_VALUE"] = {text : `${spotlight}%`, visible: true}
		this.m_Data["RANGE"]["LIGHT"] = {value : spotlight}

		let zoom = this.pad(100 - Math.floor((typeof this.getCamera().zoom !== "undefined" ? this.getCamera().zoom : 0) * 100), 3)
		this.m_Data["LABEL"]["ZOOM_VALUE"] = {text : `${zoom}%`, visible: true}
		this.m_Data["RANGE"]["ZOOM"] = {value : zoom}

		let heading = this.pad(360-Math.floor(mp.players.local.vehicle.getHeading()), 4)
		this.m_Data["LABEL"]["HDG"] = {text : `${heading}`, visible: true}
		
		let position = mp.players.local.vehicle.position
		let altitude = this.pad(Math.round(position.z * 3.28), 4)
		this.m_Data["LABEL"]["ALT"] = {text : `${altitude}`, visible: true}
		
		let speed =   this.pad(Math.trunc((mp.players.local.vehicle.getSpeed()   * 2.236936) * 0.539957), 4)
		this.m_Data["LABEL"]["SPEED"] = {text : `${speed}`, visible: true}
		


		let geo = this.getControls().overlay == 1 ? "GR-PNT" : this.getControls().overlay == 3 ? "GRID" : this.getControls().overlay == 2 ? "PNT" : "OFF"

		this.m_Data["LABEL"]["GEO_STATE"] = {text : `${geo}`, visible: geo != "OFF"}
		this.m_Data["LABEL"]["GEO_LABEL"] = {text : `GEO`, visible: geo != "OFF"}

		let altgeo = this.getControls().alternator ? "ZONE" : "PATH"
		this.m_Data["LABEL"]["GEO_ALT"] = {text : `${altgeo}`, visible: geo != "OFF" && geo != "GRID"}
		this.m_Data["LABEL"]["GEO_ALT_LABEL"] = {text : `GEO+`, visible: geo != "OFF" && geo != "GRID"}

		let moment = this.time
		let agencyLabel = (typeof this.agency !== "undefined" && this.agency !== null ? this.agency : "UNKNOWN AGENCY")
		let dateLabel = this.pad(moment.getDate(), 2) + "-" + MONTH_SHORT[moment.getMonth()] + "-" + moment.getFullYear()
		let timeLabel = this.pad(moment.getHours(), 2) + ":"  + this.pad(moment.getMinutes(), 2) + ":" + this.pad(moment.getSeconds(), 2)
		this.m_Data["LABEL"]["DEPARTMENT"] = {text : `${agencyLabel} &#128279; <br> ${dateLabel} ${timeLabel} <br> ${typeof this.plate !== "undefined" ? this.plate : "UNKNOWN"}`, visible: true}
	
		this.heading =  Math.floor(this.normalizeCircle(this.getCamera().element.getRot(2).z))
		this.craftHeading =  Math.floor(this.normalizeCircle(this.heading - mp.players.local.vehicle.getHeading()))
		this.m_Data["IMAGE"]["CROSSHAIR_DIRECTION"] = {rotation : this.heading, visible: true}
		this.m_Data["IMAGE"]["CROSSHAIR_CRAFT_DIRECTION"] = {rotation : this.craftHeading, visible: true}


		this.m_Data["IMAGE"]["CROSSHAIR_TARGET"] = {rotation : 0, visible: this.getControls().doesLockExists()}


		let street = " ", crossing = " "

		if (typeof this.cast !== "undefined" && this.cast !== null){
			let result = mp.game.pathfind.getStreetNameAtCoord(this.cast.x, this.cast.y, this.cast.z, 0, 0)
			street = mp.game.ui.getStreetNameFromHashKey(result.streetName)
			if (result.crossingRoad && result.crossingRoad != result.streetName) 
				crossing = mp.game.ui.getStreetNameFromHashKey(result.crossingRoad)
		}

		this.m_Data["LABEL"]["STREET"] = {text : `${street.replace("\'", "").toUpperCase()}`, visible: true}
		this.m_Data["LABEL"]["CROSS_STREET"] = {text : `${crossing.replace("\'", "").toUpperCase()}`, visible: true}


		this.m_Data["LABEL"]["SPOTLIGHT"] = {text : `LIGHT `, visible: this.getControls().spotlight}
		this.m_Data["LABEL"]["NIGHTVISION"] = {text : `NV `, visible: this.getControls().mode == 1}
		this.m_Data["LABEL"]["INFRARED"] = {text : `IR `, visible: this.getControls().mode == 2}

		let lockSpeed = 0
		if (this.getControls().doesLockExists()){
			let speed = this.getControls().target.getSpeed()
			if (typeof speed === "number")
				lockSpeed =  Math.trunc(speed * 2.236936)
		}
		this.m_Data["LABEL"]["TARGET_SPEED"] = {text : `${this.pad(lockSpeed, 4)} MPH`, visible: this.getControls().doesLockExists()}

		this.m_Data["CLOCK"]["CLOCK_HEADING"] = {value: 360 - this.heading}

		let pitch =  Math.floor(this.getCamera().element.getRot(2).x)
		this.m_Data["CLOCK"]["CLOCK_PITCH"] = {value: -pitch}

		StaticBrowser.Execute("Event_OnOverlayData", this.getControls().mode, this.getControls().alternator, this.getControls().overlay)
		StaticBrowser.Execute("Event_OnLabel", this.m_Data["LABEL"])
		StaticBrowser.Execute("Event_OnRange", this.m_Data["RANGE"])
		StaticBrowser.Execute("Event_OnImage", this.m_Data["IMAGE"])
		StaticBrowser.Execute("Event_OnClock", this.m_Data["CLOCK"])

	}

	getDistance(x, y, z, x2, y2, z2){
		return parseFloat(Math.trunc(Math.sqrt((x2^2)+(y2^2)+(z2^2)) - Math.sqrt((x^2)+(y^2)+(z^2))))
	}

	Event_OnCastInfo(){
		try{
			if (!mp.players.local.vehicle) return
			let distance = 4000
			let camera = this.getCamera().element
			if (typeof camera === "undefined" || camera === null) return 

			let position = camera.getCoord()
			if (typeof position === "undefined" || position === null) return 

			let direction = camera.getDirection()
			if (typeof direction === "undefined" || direction === null) return 

			let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z))
			if (typeof farAway === "undefined" || farAway === null) return 
		
			let result = mp.raycasting.testPointToPoint(position, farAway, mp.players.local.vehicle.handle, 7)
			if (typeof result === "undefined") return 
			if (typeof result.position === "undefined") return 
	
			this.cast = result.position
		} catch {
			mp.console.logError("Exception@HelicopterCamera@Graphics : Event_OnCastInfo", false, true)
		}
	}

	Event_OnTimePulse(){
		if (!mp.players.local.vehicle) return
		if (typeof this.time === "undefined") return 
		if (typeof this.time.getTime() !== "number") return 
		this.time = new Date(this.time.getTime() + 1000)
	}


	destructor(){
		clearInterval(this.m_CastPulse)
		clearInterval(this.m_TimePulse)
		mp.events.remove("render", this.m_RenderBind)
		mp.game.invoke("0x0F07E7745A236711")
		StaticBrowser.Execute("Deactivate", "")
		mp.events.call("toggle_display_gtaw", true)
	}

	normalizeCircle(value){
		value = value % 359;

		if (value < 0)
    		value += 360;

		return value
	}

	getCamera(){
		return this.core.camera
	}

	getControls(){
		return this.core.controls
	}

	pad(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}

	clamp(val, max, min) { return (val - min) / (max - min); }

	getView(){
		let resolution = mp.game.graphics.getScreenActiveResolution(0, 0)

        return  {    
			screen : {x: resolution.x, y: resolution.y, aspect: mp.game.graphics.getScreenAspectRatio(true)},
			plane : {near: this.getCamera().element.getNearClip(), far: this.getCamera().element.getFarClip(), fov: this.getCamera().element.getFov()}, 
			matrix: this.getMatrix(),
			cast: this.cast,
			zoom: this.getCamera().zoom
        }
	}

	getMatrix(){
        let rot = this.getCamera().element.getRot(2)
        let rx =  rot.x *  (Math.PI/180), ry = rot.y  * (Math.PI/180), rz = rot.z *  (Math.PI/180)
        let position = this.getCamera().element.getCoord()
        return {
            rotation: [rx, ry, rz],
            position: [position.x, position.y, position.z],
            forward: [
				-Math.cos(rx)*Math.sin(rz),   
				Math.cos(rz)*Math.cos(rx), 
				Math.sin(rx)
            ],
            up: [ 
				Math.cos(rz)*Math.sin(ry) + Math.cos(ry)*Math.sin(rz)*Math.sin(rx), 
				Math.sin(rz)*Math.sin(ry) - Math.cos(rz)*Math.cos(ry)*Math.sin(rx), 
				Math.cos(rx)*Math.cos(ry)
            ],
			left: [
				Math.cos(rz)*Math.cos(ry) - Math.sin(rz)*Math.sin(rx)*Math.sin(ry), 
				Math.cos(ry)*Math.sin(rz) + Math.cos(rz)*Math.sin(rx)*Math.sin(ry),
				-Math.cos(rx)*Math.sin(ry)
			]
        }
    }

}


function __Graphics(core, time, agency, plate, vin){
	return new Graphics(core, time, agency, plate, vin)
}

}