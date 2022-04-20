{
﻿let POST_OPS = [
	"$('.close-icon').click(() => {mp.trigger('BrowserWindowed::Close', $('#frame').attr('src'))})",
	"$('.enlarge-icon').css({marginTop : '1px'});$('.close-icon').css({marginTop : '-1px'})",
	"$('#framewrap').css({width : '65%', height : '65%'})",
	"$('body').css({overflow : 'hidden'})",
	"$('.slider').change((e) => {mp.trigger('BrowserWindowed::ReportBack', $('#frame').attr('src'), " + 
						"$('#framewrap').offset().left / $(window).width(), $('#framewrap').offset().top / $(window).height()" + 
							", e.target.value)})",

	"$('#framewrap').mouseup((e) => {mp.trigger('BrowserWindowed::ReportBack', $('#frame').attr('src'), " + 
						"$('#framewrap').offset().left / $(window).width(), $('#framewrap').offset().top / $(window).height()" + 
							", $('.slider').val())})",
]

let WhiteList = [
	"https://forum.gta-world.ru/",
	"https://cad.gta-world.ru/",
	"https://lsmail.gta-world.ru/",
	"https://face.gta-world.ru/",
	"https://facebrowser.gta-world.ru/",
	"https://date.gta-world.ru/",
	"https://banking.gta-world.ru/",
	"https://fleeca.gta-world.ru/",
	"https://mdc.gta-world.ru/",
]

let BlackList = [
	"https://mdc.gta.world/badge.php?badge=",
]

function IsWindowBrowser(url){
	if (url.includes("package://gtalife")) return false
    let found = false
	WhiteList.forEach(target => {
		if (url.includes(target)) {
			let blacklisted = false
			BlackList.forEach(blacklist => {
				if (url.includes(blacklist))
					blacklisted = true
			})
			if (!blacklisted)
				found = true 
			return
        }
	})
	return found
}

let BrowserInstances = {}

mp.events.add("BrowserWindowed::Close", (url) =>{
	if (BrowserInstances[url]){
		mp.events.callRemote('cef_opened', false)
		mp.events.call("destroyBrowser")
	}
	mp.events.call("hidePhone"); // No alternative for now
    mp.events.call("revokeChatBlock");
	BrowserInstances[url] = null
})

mp.events.add("BrowserWindowed::ReportBack", (url, x, y, scale) =>{
	if (BrowserInstances[url])
		BrowserInstances[url].applyStorage(x, y, scale)

})


class BrowserWindowed{

	constructor(url){
		this.url = url
		BrowserInstances[url] = this
		this.__wrap()
		this.__postOp()

		for (let i = 1; i < 4; i++)
			setTimeout(()=>mp.gui.cursor.show(true, true), i * 1000)
	}
	
	__wrap(){
		this.browser =  mp.browsers.new(this.url.includes("package://") ? this.url : "https://forum.gta.world/apps/")
		this.browser.execute("setView('" + this.url + "')")
	}

	__postOp(){
		POST_OPS.forEach(operation => this.browser.execute(operation))

		let storageData = this.getStorage()
		if (storageData === void(0)) return this.browser.execute('$("#framewrap").css({left: "50%", top: "50%", transform: "translate(-50%, -50%)"})')

		this.browser.execute("$('#framewrap').css({width : '" + storageData.scale + "%', height : '" + storageData.scale + "%', left : '" + storageData.x * 100 + "%', top : '" + storageData.y * 100 + "%'})")
		this.browser.execute("$('.slider').val('" + storageData.scale + "')")
	}

	execute(operation){
		this.browser.execute(`document.getElementById('frame').contentWindow.eval('${operation}')`)
	}
	
	destroy(){
		this.browser.destroy()
	}

	applyStorage(x, y, scale){
	 	try{
			if( mp.storage.data === void(0)) return

			if (mp.storage.data.windowedBrowserData === void(0)) mp.storage.data.windowedBrowserData = {}

			mp.storage.data.windowedBrowserData[this.url] = {x : x, y : y, scale : scale}

		mp.storage.flush();
		} catch (e){
			this.error(e, "applyStorage")		
		}
	}

	getStorage(){
	 	try{
			if( mp.storage.data === void(0)) return
			if (mp.storage.data.windowedBrowserData === void(0)) return 
			if (mp.storage.data.windowedBrowserData[this.url] === void(0)) return 

			return mp.storage.data.windowedBrowserData[this.url] 
		} catch (e){
			this.error(e, "getStorage")
		}
	}

		error(exception, where="Browser-Windowed"){
        mp.console.logError("Exception occured inside BrowserWindow@" + where, false, true)
        mp.console.logError(String(exception.message), true, true)
    }

}

exports.BrowserWindowed = BrowserWindowed
}