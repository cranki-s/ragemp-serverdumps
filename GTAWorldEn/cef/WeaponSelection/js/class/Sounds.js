class Sounds{
	constructor(core){
		this.core = core
		this.path = "files/sounds/"
		this.sounds = [
			{id : "Hover", src:"hover_weapon.mp3"},
			{id : "Click" , src:"select_weapon.mp3"}, 
			{id : "Scroll" , src:"scroll_weapon.mp3"}
		]

    	this.Setup()
	}

	Setup(){
		this.sounds.forEach((entry, index) => {
			entry.element = document.createElement("audio");
			entry.element .src = this.path + entry.src
			entry.element .setAttribute("preload", "auto");
			entry.element .setAttribute("controls", "none");
 			entry.element .style.display = "none";
  			document.body.appendChild(entry.element);
		})
	}

	play(id){
		let sound = this.sounds.find(e => (e.id == id))
		if(sound){
			sound.element.currentTime = 0
			sound.element.play()
		}
	}
}