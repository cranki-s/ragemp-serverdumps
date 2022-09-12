{
mp.events.add({
    "ClientOnRangeChangeBarber": (cat, style, color1, color2) => {
        mp.events.callRemote("ClientOnRangeChangeBarber", cat, style, color1, color2)
    },
    "Barber_Menu_Destroy": () => {
        mp.events.callRemote("Barber_Menu_Destroy")
    },
    "BuyBarber": (cat, style, color1, color2) => {
        mp.events.callRemote("BuyBarber", cat, style, color1, color2)
    },
    "Barber_Update_Character": (cat) => {
        mp.events.callRemote("Barber_Update_Character")
    },
    "CloseBarber": () => {
        mp.events.call('Destroy_Character_Menu');
        mp.events.callRemote("CloseBarber");
    },
    "barberEnterSit": async (x, y, z, h) => {
        mp.game.streaming.requestAnimDict("misshair_shop@barbers");
        while (!mp.game.streaming.hasAnimDictLoaded("misshair_shop@barbers")) mp.game.wait(0);

        mp.players.local.taskPlayAnimAdvanced("misshair_shop@barbers", "player_enterchair", x, y, z, 0, 0, h, 1e3, -1e3, -1, 5642, 0, 2, 1)


        while (!mp.players.local.hasAnimFinished("misshair_shop@barbers", "player_enterchair", 3)) mp.game.wait(0);
        if (global.uiGlobal_Browsers === undefined) {
            global.uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/BarberUI/index.html");
        }
        if (mp.players.local.getVariable("CHARACTER_ONLINE_GENRE") === 1) {
            global.uiGlobal_Browsers.execute("app.setFemale();");
        }
        mp.gui.cursor.visible = !0
        mp.events.callLocal("ps_BodyCamera");
        mp.events.callLocal("ps_SetCamera", 1);
    },
    "barberExitSit": async (x, y, z, h) => {
        mp.game.streaming.requestAnimDict("misshair_shop@barbers");
        while (!mp.game.streaming.hasAnimDictLoaded("misshair_shop@barbers")) mp.game.wait(0);
        mp.players.local.taskPlayAnimAdvanced("misshair_shop@barbers", "player_exitchair", x, y, z, 0, 0, h, 1e3, -1e3, -1, 5642, 0, 2, 1)
        while (!mp.players.local.hasAnimFinished("misshair_shop@barbers", "player_exitchair", 3)) mp.game.wait(0);
            mp.players.local.stopAnimTask("misshair_shop@barbers", "player_exitchair", 3),
                mp.players.local.clearTasksImmediately()

        

    }
})





}