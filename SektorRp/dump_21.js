{
    function keyhandling() { IsControlJustPressed(0, 38) && place == 0 && checkFunction(); disabledControl === 1 ? (DisableControlAction(2, 71, !0), DisableControlAction(2, 72, !0), DisableControlAction(2, 63, !0), DisableControlAction(2, 64, !0), DisableControlAction(2, 75, !0), DisableControlAction(2, 32, !0), DisableControlAction(2, 33, !0), DisableControlAction(2, 34, !0), DisableControlAction(2, 35, !0), DisableControlAction(2, 37, !0), DisableControlAction(2, 23, !0), DisableControlAction(2, 246, !0)) : disabledControl === 2 && (DisableControlAction(2, 71, !0), DisableControlAction(2, 72, !0), DisableControlAction(2, 63, !0), DisableControlAction(2, 64, !0), DisableControlAction(2, 75, !0), DisableControlAction(2, 73, !0), DisableControlAction(2, 32, !0), DisableControlAction(2, 33, !0), DisableControlAction(2, 34, !0), DisableControlAction(2, 35, !0), DisableControlAction(2, 37, !0), DisableControlAction(2, 23, !0), DisableControlAction(2, 38, !0), DisableControlAction(2, 246, !0)) } async function timerstart() { mp.players.local.modalMenu = !0; let n = new Date; for (PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", !1); ;) { mp.game.wait(0); const t = (new Date).getTime() - n.getTime(); if (Draw2DText(.5, .4, "~s~3", 3), t >= 1e3) { PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", !1); break } } for (n = new Date; ;) { mp.game.wait(0); const t = (new Date).getTime() - n.getTime(); if (Draw2DText(.5, .4, "~s~2", 3), t >= 1e3) { PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", !1); break } } for (n = new Date; ;) { mp.game.wait(0); const t = (new Date).getTime() - n.getTime(); if (Draw2DText(.5, .4, "~s~1", 3), t >= 1e3) { PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", !1); break } } for (n = new Date; ;) { mp.game.wait(0); const t = (new Date).getTime() - n.getTime(); if (Draw2DText(.4, .4, "~s~GO ~w~!", 3), t >= 1e3) { PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", !1); break } } } function checkFunction() { const n = player.position, t = GetClosestObjectOfType(n, 1.5, GetHashKey(model), 0, 0, 0); t && (mp.players.local.modalMenu = !0, TriggerServerEvent("evy_arm:check_sv", n)) } function updategrade_cl(n) { grade = n } var player = mp.players.local; const DisableControlAction = function (n, t, i) { return mp.game.controls.disableControlAction(n, t, i) }, IsControlJustPressed = function (n, t) { return mp.game.controls.isControlJustPressed(n, t) }, IsControlPressed = function (n, t) { return mp.game.controls.isControlPressed(n, t) }, SetEntityAnimCurrentTime = function (n, t, i) { var r = parseFloat(i).toFixed(3); mp.game.invoke(`0x4487C259F0F70977`, player.handle, n, t, i) }, GetEntityAnimCurrentTime = function (n, t) { return player.getAnimTotalTime(n, t) === 0 ? -99 : player.getAnimCurrentTime(n, t) }, SetEntityAnimSpeed = function (n, t, i) { return mp.game.invoke(`0x28D1A16553C51776`, player.handle, n, t, i) }, PlayFacialAnim = function (n, t) { player.playFacialAnim(t, n) }, PlaySoundFrontend = function (n, t, i, r) { mp.game.audio.playSoundFrontend(n, t, i, r) }, GetClosestObjectOfType = function (n, t, i, r, u, f) { return mp.game.object.getClosestObjectOfType(n.x, n.y, n.z, t, i >> 0, Boolean(r), Boolean(u), Boolean(f)) }, TriggerServerEvent = function (n, t) { mp.events.callRemote(n, t) }, GetHashKey = function (n) { return mp.game.joaat(n) >> 0 }, IsPedRagdoll = () => Boolean(mp.game.invoke(`0x47E4E977581C5B55`, player.handle)), PlayAnim = function (n, t, i) { while (!mp.game.streaming.hasAnimDictLoaded(n)) mp.game.streaming.requestAnimDict(n), mp.game.wait(0); player.taskPlayAnim(n, t, 1.5, 1.5, -1, i, 0, !1, !1, !1) }, alertcl = function (n) { mp.game.ui.setTextComponentFormat("STRING"); mp.game.ui.addTextComponentSubstringPlayerName(n); mp.game.ui.displayHelpTextFromStringLabel(0, !1, !0, -1) }; mp.events.add("showhelp", (n, t = false, i = true, r = 5e3) => { mp.game.ui.setTextComponentFormat("STRING"), mp.game.ui.addTextComponentSubstringPlayerName(n), mp.game.ui.displayHelpTextFromStringLabel(0, t, i, r) }); const notify = function (n) { mp.game.graphics.notify(n) }, DrawAdvancedNativeText = function (n, t, i, r, u, f, e, o, s, h, c, l) { mp.game.ui.setTextFont(c); mp.game.ui.setTextScale(u, u); mp.game.ui.setTextJustification(l); mp.game.ui.setTextColour(254, 254, 254, 255); mp.game.invoke("0x2513DFB0FB8400FE"); mp.game.ui.setTextEntry("STRING"); mp.game.ui.addTextComponentSubstringPlayerName(f); mp.game.ui.drawText(n - .1 + i, t - .02 + r) }, Draw2DText = function (n, t, i, r) { mp.game.ui.setTextFont(4); mp.game.ui.setTextProportional(!0); mp.game.ui.setTextScale(r, r); mp.game.ui.setTextColour(198, 25, 66, 255); mp.game.ui.setTextDropshadow(1, 0, 0, 0, 255); mp.game.ui.setTextEdge(4, 0, 0, 0, 255); mp.game.invoke("0x2513DFB0FB8400FE"); mp.game.ui.setTextEntry("STRING"); mp.game.ui.addTextComponentSubstringPlayerName(i); mp.game.ui.drawText(n, t) }; let place = 0, started = !1, grade = .5, disabledControl = 0; const model = "prop_arm_wrestle_01"; mp.events.add("sreset", () => { mp.players.local.modalMenu = !1 }); mp.events.add("evy_arm:updategrade_cl", keyhandling); mp.events.add("render", keyhandling); mp.events.add({ "evy_arm:updategrade_cl": n => { grade = n }, "evy_arm:start_cl": async () => { if (started = !0, mp.players.local.modalMenu = !0, place === 1) { for (disabledControl = 2, await timerstart(), PlayAnim("mini@arm_wrestling", "sweep_a", 1), SetEntityAnimSpeed("mini@arm_wrestling", "sweep_a", 0), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade), PlayFacialAnim("electrocuted_1", "facials@gen_male@base"), disabledControl = 1; grade >= .1 && grade <= .9;)if (await mp.game.waitAsync(0), PlayFacialAnim("electrocuted_1", "facials@gen_male@base"), alertcl("Um zu gewinnen, dr�cke schnell .. ~INPUT_PICKUP~"), SetEntityAnimSpeed("mini@arm_wrestling", "sweep_a", 0), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade), IsControlJustPressed(0, 38)) for (TriggerServerEvent("evy_arm:updategrade_sv", .015), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade); IsControlJustPressed(0, 38);)await mp.game.waitAsync(0), alertcl("Um zu gewinnen, dr�cke schnell .. ~INPUT_PICKUP~"), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade); grade >= .9 ? (PlayAnim("mini@arm_wrestling", "win_a_ped_a", 2), notify("~g~Du hast gewonnen")) : grade <= .1 && (PlayAnim("mini@arm_wrestling", "win_a_ped_b", 2), notify("~r~Du hast verloren")); mp.game.wait(4e3); TriggerServerEvent("evy_arm:disband_sv", player.position); return } if (place === 2) { for (disabledControl = 2, await timerstart(), PlayAnim("mini@arm_wrestling", "sweep_b", 1), SetEntityAnimSpeed("mini@arm_wrestling", "sweep_b", 0), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_b", grade), PlayFacialAnim("electrocuted_1", "facials@gen_male@base"), disabledControl = 1; grade >= .1 && grade <= .9;)if (await mp.game.waitAsync(0), PlayFacialAnim("electrocuted_1", "facials@gen_male@base"), alertcl("Um zu gewinnen, dr�cke schnell .. ~INPUT_PICKUP~"), SetEntityAnimSpeed("mini@arm_wrestling", "sweep_b", 0), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_b", grade), IsControlJustPressed(0, 38)) for (TriggerServerEvent("evy_arm:updategrade_sv", -.015), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade); IsControlJustPressed(0, 38);)await mp.game.waitAsync(0), alertcl("Um zu gewinnen, dr�cke schnell .. ~INPUT_PICKUP~"), SetEntityAnimCurrentTime("mini@arm_wrestling", "sweep_a", grade); grade <= .1 ? (PlayAnim("mini@arm_wrestling", "win_a_ped_a", 2), notify("~g~Du hast gewonnen")) : grade >= .9 && (PlayAnim("mini@arm_wrestling", "win_a_ped_b", 2), notify("~r~Du hast verloren")); mp.game.wait(4e3); TriggerServerEvent("evy_arm:disband_sv", player.position); return } }, "evy_arm:check_cl": async n => { const i = player.position; let t = 0; if (mp.events.callRemote("destroyObj"), mp.events.callRemote("AnimationPlay", "stop"), player.clearTasks(), n === "place1") { if (place = 1, t = GetClosestObjectOfType(i, 1.5, GetHashKey(model), 0, 0, 0), t = mp.objects.atHandle(t), t) { disabledControl = 2; player.setHeading(t.rotation.z); mp.game.wait(100); let n = mp.game.invokeVector3(`0x1899F328B0E12848`, t.handle, -.2, 0, 0).x, i = mp.game.invokeVector3(`0x1899F328B0E12848`, t.handle, 0, -.65, 0).y, r = player.position.z; for (player.position = new mp.Vector3(n, i, r), player.freezePosition(!0), PlayAnim("mini@arm_wrestling", "aw_ig_intro_alt1_a", 2); GetEntityAnimCurrentTime("mini@arm_wrestling", "aw_ig_intro_alt1_a") < .95;)mp.game.wait(0); for (PlayAnim("mini@arm_wrestling", "nuetral_idle_a", 1), disabledControl = 1; !started;)if (await mp.game.waitAsync(0), alertcl("Warten auf einen Gegner"), IsControlPressed(2, 73) || IsPedRagdoll() || IsControlPressed(2, 200) || IsControlPressed(2, 214) || IsControlPressed(0, 47)) { TriggerServerEvent("evy_arm:disband_sv", player.position); return } } } else if (n === "place2") { if (place = 2, t = GetClosestObjectOfType(i, 1.5, GetHashKey(model), 0, 0, 0), t = mp.objects.atHandle(t), t) { disabledControl = 2; player.setHeading(t.rotation.z - 180); mp.game.wait(100); let n = t.getOffsetFromInWorldCoords(0, 0, 0).x, i = t.getOffsetFromInWorldCoords(0, .5, 0).y, r = player.position.z; for (player.position = new mp.Vector3(n, i, r), player.freezePosition(!0), PlayAnim("mini@arm_wrestling", "aw_ig_intro_alt1_b", 2); GetEntityAnimCurrentTime("mini@arm_wrestling", "aw_ig_intro_alt1_b") < .95;)mp.game.wait(0); for (PlayAnim("mini@arm_wrestling", "nuetral_idle_b", 1), disabledControl = 1, TriggerServerEvent("evy_arm:check_sv", player.position); !started;)if (await mp.game.waitAsync(0), alertcl("Warten auf einen Gegner"), IsControlPressed(2, 73) || IsPedRagdoll() || IsControlPressed(2, 200) || IsControlPressed(2, 214)) { TriggerServerEvent("evy_arm:disband_sv", player.position); return } } } else n === "noplace" && notify("~r~Ein Match ist bereits im Gange") }, "evy_arm:reset_cl": () => { table = GetClosestObjectOfType(player.position, 1.5, GetHashKey(model), 0, 0, 0), table = mp.objects.atHandle(table), table, mp.players.local.modalMenu = !1, player.clearTasks(), place = 0, started = !1, grade = .5, disabledControl = 0, player.freezePosition(!1) } });
}