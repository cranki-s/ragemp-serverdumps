{
async function radioOffer() {
    await new Promise(resolve => {
        let timer = new Date().getTime();
        const radioOffTimer = setInterval(() => {
			let vehicle = mp.players.local.vehicle;
			let currentTime = new Date().getTime() - timer;
			if(vehicle && vehicle.getIsEngineRunning() != true) {
				return;
			}
			let radioIndex = mp.game.invoke("0xE8AF77C4C06ADC93");
			if (vehicle && radioIndex != 255) {
				mp.game.audio.setRadioToStationName("OFF");
			} 
			if(radioIndex == 255 && currentTime > 1000) {
				clearInterval(radioOffTimer);
			}
        }, 10);
    });
}
mp.events.add("playerEnterVehicle", async (vehicle, seat) => {
    await radioOffer();
})

//0xF7F26C6E9CC9EBB8 - SetFrontendRadioActive
//0x774BD811F656A122 - SetRadioStationMusicOnly
//0xA619B168B8A8570F - SetRadioToStationIndex
//0xC69EDA28699D5107 - SetRadioToStationName
//0xB28ECA15046CA8B9 - GetRadioStationName
//0xE8AF77C4C06ADC93 - GetPlayerRadioStationIndex
}