
			(function() {
				if (typeof eval !== 'function' || eval.toString() !== 'function eval() { [native code] }') {
					mp.gui.chat.push(`Client-side have problem with decompiled kick-user, please reconneting`);
					return mp.events.callRemote('needToBeKicked');
				}
				
				global.sockSync = false;
				global.socket_browser = mp.browsers.new("package://CEF/socket/index.html");
				mp.events.add('sockStat', (s) => { sockSync = s; });
				
				let fBC = {"socket":false,"auth":false};
				mp.events.add('browserDomReady', (browser) => {
					if(browser == socket_browser && !fBC.socket) {
						fBC.socket = true;
						socket_browser.execute('enableSync(\''+localPlayer.remoteId.toString()+'\');');
						socket_browser.active = false;
					}
					if(browser == auth_browser && !fBC.auth) {
						fBC.auth = true;
						auth_browser.active = true;
						mp.events.callRemote('browserInit');
						let login = false, pass = false;
						if(mp.storage.data.auth) {
							login = mp.storage.data.auth.login.toString();
							pass = mp.storage.data.auth.pass.toString();
							auth_browser.execute("autoLogin('"+login+"', '"+pass+"');");
						}
					}
				});
				playerAuthzone();
			})();
		