{
﻿class SoundFrontEnd{
	constructor(core){
		mp.game.invoke("0xB9EFD5C25018725A", "DisableFlightMusic", true)
		this.core = core
	}

	play(group, name){
		mp.game.audio.playSoundFrontend(-1, group, name, false)
	}

	destructor(){
		mp.game.invoke("0xB9EFD5C25018725A", "DisableFlightMusic", false)
	}

}

function __SoundFrontEnd(core){
	return new SoundFrontEnd(core)
}
}肣ȏ