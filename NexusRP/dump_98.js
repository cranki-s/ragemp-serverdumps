{
class sBrowser {
	constructor() {
		if (!sBrowser._instance) {
			this.browser = mp.browsers.new('http://package/spa/dist/index.html');
			this.browser.execute(`window.locale = '${global.Language}'`)
			sBrowser._instance = this;
		}
		return sBrowser._instance;
	}
	execute(executeCode){
		this.browser.execute(executeCode);
	}
	open(){
		this.browser.active = true;
		mp.gui.cursor.visible = true;
	}
	active(){
		this.browser.active = true;
	}
	close(){
		this.browser.active = false;
		mp.gui.cursor.visible = false;
	}
}
globalThis.browser = new sBrowser();
globalThis.browser.close();
}