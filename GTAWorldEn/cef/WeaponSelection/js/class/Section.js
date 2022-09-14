class Section{
	constructor(core, element){

		this.core = core
		this.element = element 
		this.weapons = []
		this.current = null
		this.m_Timing = {scroll : {last : null, distance : 0, direction : null}}

		element.mouseenter(this.Event_OnHover.bind(this))
		element.click(this.Event_OnClick.bind(this))
		element.bind("mousewheel", this.Event_OnScroll.bind(this))

		this.clear()
	}


	next(){
		if (!this.current) this.current = 0
		
		this.current += 1

		if (this.current > this.weapons.length-1) this.current = 0 

		this.set()
	}

	previous(){
		if (!this.current) this.current = 0

		this.current -= 1

		if (this.current < 0) this.current = this.weapons.length-1

		this.set()
	}

	add(data){
		let index = this.weapons.findIndex(e => e.weapon == data.weapon)
		if (index > -1){
			this.weapons[index].ammo = data.ammo 
			this.weapons[index].component = data.component 
		}
		else{
			this.weapons.push({weapon: data.weapon, ammo : data.ammo, component : data.component})
			this.current = this.weapons.length - 1
		}
		this.set()
		this.core.select(this.getId())


		if (this.weapons.length < 2)
			this.get().find(".scrollIcon").css({visibility : "hidden"})
		else{
			if (this.core.isActive())
				this.get().find(".scrollIcon").css({visibility : "visible"})
		}
	}

	set(){
		this.clear()

		let entry = this.weapons[this.current]
		if (typeof entry === "undefined" && this.weapons.length == 0) return
		else
			if (typeof entry === "undefined" && this.weapons.length > 0)
				entry = this.weapons[0]

		let ammo = entry.ammo 
		let component = entry.component 
		let weapon = entry.weapon 

		if (typeof ammo !== "undefined"){
			let clipLabel = this.get().find(".AmmoInClipLabel").first()
			let totalLabel = this.get().find(".TotalAmmoLabel").first()
			if(clipLabel)
				clipLabel.html((ammo.clip ? ammo.clip : "") + " ")	

			if(totalLabel)
				totalLabel.html(ammo.total ? ammo.total : "")
		}

		if (typeof weapon !== "undefined")
			this.get().find(".weaponImage").attr("xlink:href", ICON_PATH + weapon + ".png")


		if (typeof component !== "undefined"){
			let components = this.get().find(".componentIcon")
			component.forEach(element => {
				let componentHash = "0x" + (element).toString(16).toUpperCase()
				if (isSilencer(componentHash))
					$(components[0]).attr("xlink:href", COMPONENT_ICON[0])

				if (isFlashLight(componentHash))
					$(components[1]).attr("xlink:href", COMPONENT_ICON[1])

				if (isClip(componentHash))
					$(components[2]).attr("xlink:href", COMPONENT_ICON[2])
			});
					
		}

		if (this.weapons.length < 2)
			this.get().find(".scrollIcon").css({visibility : "hidden"})
		else{
			if (this.core.isActive())
				this.get().find(".scrollIcon").css({visibility : "visible"})
		}

	}

	remove(hash){
		let index = this.weapons.findIndex(e => e.weapon == hash)
		if (index > -1)
			this.weapons.splice(index, 1)

		this.clear()
		this.current  = 0
		this.set()
		this.core.default()
	}

	clear(){
		let clipLabel = this.get().find(".AmmoInClipLabel").first()
		let totalLabel = this.get().find(".TotalAmmoLabel").first()

		if(clipLabel)
			clipLabel.html("")

		if(totalLabel)
			totalLabel.html("")

		this.get().find(".componentIcon").attr("xlink:href", "")
		this.get().find(".weaponImage").attr("xlink:href", "")

		if (this.weapons.length < 2)
			this.get().find(".scrollIcon").css({visibility : "hidden"})
		else {
			if (this.core.isActive())
				this.get().find(".scrollIcon").css({visibility : "visible"})

		}
	}

	purge(){
		this.weapons = []
		this.current = null
		this.clear()
	}

	Event_OnShow(){
		if (this.weapons.length < 2)
			this.get().find(".scrollIcon").css({visibility : "hidden"})
		else {
			if (this.core.isActive())
				this.get().find(".scrollIcon").css({visibility : "visible"})
		}
	}

	
	Event_OnHide(){
		if (this.weapons.length < 2)
			this.get().find(".scrollIcon").css({visibility : "hidden"})
		else {
			if (this.core.isActive())
				this.get().find(".scrollIcon").css({visibility : "visible"})
		}
	}

	Event_OnHover(){
		if (!this.core.isActive()) return
		this.core.m_Sound.play("Hover")
		this.core.setHovered(this.getId())
	}

	
	Event_OnClick(){
		if (!this.core.isActive()) return
		if (this.weapons.length == 0) return

		if (this.getId() !== "center")
			this.core.m_Sound.play("Click")

		this.get().addClass("clicked")
		this.get().find(".outerSelection").addClass("clickedSelection")
		setTimeout(() => {
			this.get().removeClass("clicked")
			this.get().find(".outerSelection").removeClass("clickedSelection")
		}, 500)

		this.core.select(this.getId())

		let element = this.weapons[this.current]
		if (typeof element === "undefined") return 


		if (typeof mp === "undefined") return
		

		mp.trigger("WeaponSelection::SelectWeapon", element.weapon)
		
	}

	Event_OnScroll(e){
		if (!this.core.isActive()) return
		if (this.getId() == "center") return
		if (this.weapons.length < 2) return

		let now = Date.now()
		let isDown = e.originalEvent.wheelDelta < 0
		if (typeof this.m_Timing.scroll.last === "undefined")
			this.m_Timing.scroll.last = now 
	
		if (now - this.m_Timing.scroll.last > 1000 || this.m_Timing.scroll.direction != isDown){
			this.m_Timing.scroll.last = now
			this.m_Timing.scroll.direction = isDown
			this.m_Timing.scroll.distance = 1
			return
		}

		if (this.m_Timing.scroll.distance < 2){
			this.m_Timing.scroll.distance++
			return
		}


		if(isDown) 
			this.previous()
		else 
			this.next()

		this.core.m_Sound.play("Scroll")

		this.m_Timing.scroll.distance = 0
		return false;
	}

	setSelected(bool){
		if (bool) {
			this.get().find(".outerSelection").addClass("selectedSelection")
			this.get().find(".Pattern").addClass("selected")
		}
		else{ 
			this.get().find(".outerSelection").removeClass("selectedSelection")
			this.get().find(".Pattern").removeClass("selected")
		}
	}


	get(){
		return this.element
	}

	getId(){
		return this.get().attr("id").toLowerCase()
	}
}