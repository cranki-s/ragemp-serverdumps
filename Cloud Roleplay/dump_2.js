{
let loginBrowser = null
let loginCamera = null

mp.events.add("client:createLoginBrowser", () => {
    if (loginBrowser !== null) return
    if (loginCamera !== null) return

    loginBrowser = mp.browsers.new("package://cef/Login/index.html")
    loginCamera = mp.cameras.new("login", new mp.Vector3(-1593.105, 2099.647, 67.51107), new mp.Vector3(0, 0, 97.1), 50)

    loginCamera.pointAtCoord(-1593.105, 2099.647, 67.51107)
    loginCamera.setRot(0, 0, 97.1, 2)
    loginCamera.setActive(true)

    mp.players.local.freezePosition(true)
    mp.players.local.setAlpha(0)

    mp.game.cam.renderScriptCams(true, false, 0, true, false)
    mp.game.graphics.transitionToBlurred(0)

    mp.gui.cursor.show(true, true)
    mp.gui.chat.show(false)
})

mp.events.add("client:deleteLoginBrowser", () => {
    if (loginBrowser === null) return
    if (loginCamera === null) return

    loginCamera.setActive(false)
    loginCamera.destroy()
    loginCamera = null

    loginBrowser.destroy()
    loginBrowser = null

    mp.game.cam.renderScriptCams(false, false, 0, true, false)
    mp.game.graphics.transitionFromBlurred(1000)

    mp.players.local.freezePosition(false)
    mp.players.local.setAlpha(255)

    mp.gui.cursor.show(false, false)
    mp.gui.chat.show(true)
})

mp.events.add("client:sendLoginCredentials", (username, password) => {
    if (loginBrowser === null) return

    mp.events.callRemote("Server:Login:TryLogin", username, password)
})
}