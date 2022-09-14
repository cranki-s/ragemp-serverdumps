class Core{
	constructor(){

		this.m_Reception = new Reception(this) 

		this.m_Sound = new Sounds(this)

		this.m_Sections = {
				top : 		new Section(this, $("#Top")),
				bottom: 	new Section(this, $("#Bottom")),
				left :	 	new Section(this, $("#Left")),
				right : 	new Section(this, $("#Right")),
				center : 	new Section(this, $("#Center"))
		}


		this.getSection("center").weapons.push({weapon: "0xA2719263"})
		this.getSection("center").current = 0
		this.getSection("center").set()

		if (typeof mp === "undefined")
			this.show()
	}


	select(section){
		this.getSection("top").setSelected(false)
		this.getSection("bottom").setSelected(false)
		this.getSection("left").setSelected(false)
		this.getSection("right").setSelected(false)
		this.getSection("center").setSelected(false)
		
		this.getSection(section).setSelected(true)
	}


	setHovered(section, force){
		if(this.m_IgnoreNextHover){
			this.m_IgnoreNextHover = false
			return
		}
		if (!this.isActive()) return

		let hoveredSection = this.getSection(section)
		if (typeof hoveredSection === "undefined") return

		$("#hoverIndicator div").css("display", "none" )
		if (force){
			this.m_SelectOnHide = hoveredSection
			$("#" + section).css("display", "block" )
		} else {
			this.m_SelectOnHide = false
		}
		
	}

	default(){
		this.select("center") 
	}

	show(current){ 
		$("#hoverIndicator div").css("display", "none" )

		this.m_SelectOnHide = false
		this.m_IgnoreNextHover = true

		$("body").css({visibility: "visible", opacity : "1"}) 
		this.getSection("top").Event_OnShow()
		this.getSection("bottom").Event_OnShow()
		this.getSection("left").Event_OnShow()
		this.getSection("right").Event_OnShow()
		this.getSection("center").Event_OnShow()

		if(!WEAPON_DATA[current]) return 
		if(!WEAPON_DATA[current].group) return 
		let section = getSection(WEAPON_DATA[current].group)
		if (typeof section !== "undefined") 
			this.select(current !== "0xA2719263" ? section : "center")
	}

	hide(){ 
		$("#hoverIndicator div").css("display", "none" )

		if (this.m_SelectOnHide)
			this.m_SelectOnHide.Event_OnClick()
		$("body").css({visibility: "hidden", opacity : "0"}) 
		this.getSection("top").Event_OnHide()
		this.getSection("bottom").Event_OnHide()
		this.getSection("left").Event_OnHide()
		this.getSection("right").Event_OnHide()
		this.getSection("center").Event_OnHide()

		
	}
	isActive(){ return $("body").css("visibility") == "visible"}

	getSection(type){ return this.m_Sections[type] }
	getReception(){ return this.m_Reception}
}

Singleton = new Core()






function mouseoverWeapon(element){

}

function onmouseoutWeapon(){
}
