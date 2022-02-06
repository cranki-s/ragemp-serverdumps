{
﻿let CEF = null
let LAST_OP_CODE = ""

mp.events.add("Lockpick", (level) =>{
	if (mp.browsers.exists(CEF)) 
		CEF.destroy() 

	LAST_OP_CODE = `Singleton.setLevel(${level})`
	mp.gui.cursor.show(true, true)
	CEF = mp.browsers.new("package://gtalife/LockPicking/CEF/index.html")
})


mp.events.add("StopLockpick", () =>{
	if (mp.browsers.exists(CEF)) 
		setTimeout(function() {
			CEF.destroy() 
			mp.gui.cursor.show(false)
		}, 1500)
})

mp.events.add("ForceStopLockpick", () =>{
	if (mp.browsers.exists(CEF)) 
		CEF.destroy() 
})


mp.events.add("Hotwire", (level) =>{
	if (mp.browsers.exists(CEF)) 
		CEF.destroy() 

	LAST_OP_CODE = `Singleton.setHotwireMode(true);Singleton.setLevel(${level})`
	mp.gui.cursor.show(true, true)
	CEF = mp.browsers.new("package://gtalife/LockPicking/CEF/index.html")
})


mp.events.add("StopHotwire", () =>{
	if (mp.browsers.exists(CEF)) 
		setTimeout(function() {
			if (mp.browsers.exists(CEF)){
				CEF.destroy() 
				mp.gui.cursor.show(false)
			}
		}, 1500)
})



mp.events.add("Lockpick::CEF:Broken", (isHotwire) =>{
	if (mp.browsers.exists(CEF)) 
		setTimeout(function() {
			if (mp.browsers.exists(CEF)){
				CEF.destroy() 
				mp.gui.cursor.show(false)
			}
		}, 1500)
	
	if (!isHotwire)
		mp.events.callRemote("Lockpick::Broken", getStreetName())
	else 
		mp.events.callRemote("Hotwire::Broken", getStreetName())
})

mp.events.add("Lockpick::CEF:Open", (isHotwire) => {
	if (mp.browsers.exists(CEF))
		setTimeout(function(){
			if (mp.browsers.exists(CEF)){
				CEF.destroy() 
				mp.gui.cursor.show(false)
			}
		}, 1500)

	if (!isHotwire)
		mp.events.callRemote("Lockpick::Success", getStreetName())
	else 
		mp.events.callRemote("Hotwire::Success", getStreetName())
})

mp.events.add("Lockpick::CEF:Abort", (isHotwire) =>{
	if (mp.browsers.exists(CEF))
		CEF.destroy() 

	if (!isHotwire)
		mp.events.callRemote("Lockpick::Abort", getStreetName())
	else 
		mp.events.callRemote("Hotwire::Abort", getStreetName())
})

mp.events.add('browserDomReady', (browser) => {
	if (!mp.browsers.exists(CEF)) return 
    if (browser === CEF)
		CEF.execute(LAST_OP_CODE)
})

function getStreetName(){
	let streetObj = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0)
	return mp.game.ui.getStreetNameFromHashKey(streetObj.streetName)
}

}