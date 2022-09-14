class Reception{
	constructor(core){
		this.core = core
	}

	Event_OnShow(weapon){
		if (this.m_HideTimeout) 
			clearTimeout(this.m_HideTimeout)
		this.getCore().show(weapon)
	}

	Event_OnGravityHover(section){
		this.getCore().setHovered(section, true)
	}

	Event_OnHide(){
		this.getCore().hide()
	}

	Event_OnUpdate(data){
		data = JSON.parse(data)
		data.forEach(entry => {
			if(!WEAPON_DATA[entry.weapon]) return  
			if(!WEAPON_DATA[entry.weapon].group) return 
			let direction = getSection(WEAPON_DATA[entry.weapon].group)
			if (typeof direction !== "undefined" && entry.weapon !== "0xA2719263"){
				this.getCore().getSection(direction).add({weapon: entry.weapon, ammo : entry.ammo, component : entry.component})
				this.getCore().getSection(direction).set()
			}
		})
	}

	Event_AddWeapon(data){
		data = JSON.parse(data)
		if(!WEAPON_DATA[data.weapon]) return 
		if(!WEAPON_DATA[data.weapon].group) return 
		let direction = getSection(WEAPON_DATA[data.weapon].group)
		
		if (typeof direction !== "undefined" && data.weapon !== "0xA2719263"){
			this.getCore().getSection(direction).add({weapon: data.weapon, ammo : data.ammo, component : data.component})
			this.getCore().getSection(direction).current = this.getCore().getSection(direction).weapons.length - 1
			this.getCore().getSection(direction).set()
		}
		
	}

	Event_RemoveWeapon(hash){
		if(!WEAPON_DATA[hash]) return 
		if(!WEAPON_DATA[hash].group) return 
		let direction = getSection(WEAPON_DATA[hash].group)
		if (typeof direction !== "undefined" && hash !== "0xA2719263")
			this.getCore().getSection(direction).remove(hash)
		
	}

	Event_ClearAll(){
		this.getCore().getSection("left").purge()
		this.getCore().getSection("right").purge()
		this.getCore().getSection("top").purge()
		this.getCore().getSection("bottom").purge()
	}

	Event_KeyBind(slot){
			

		let section = this.getCore().getSection(slot)
		if (section){
			let now = Date.now()	
			if (!this.m_LastKeyPress || typeof this.m_LastKeyPress === "undefined")
					this.m_LastKeyPress = now


			let fadeOutTime = 500
			if (now - this.m_LastKeyPress < 1000 && ((!this.m_LastKey || typeof this.m_LastKey !== "undefined") && this.m_LastKey == slot) && section.weapons.length > 1){
				section.next()
				fadeOutTime = 1000
			}

			if (!Singleton.isActive()){
				Singleton.show()
				this.m_HideTimeout = setTimeout(function() { 
						Singleton.hide() 
						this.m_HideTimeout = null
				}.bind(this), fadeOutTime)
			}

			this.m_LastKey = slot
			this.m_LastKeyPress = now

			section.get().find(".Pattern").addClass("forceHover")
			setTimeout(function() {section.get().find(".Pattern").removeClass("forceHover") }, 1000)
			section.Event_OnClick()
		}

	}

	getCore(){ return this.core }

}