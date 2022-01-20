{
  const localPlayer = mp.players.local;
  let flyStatus = !1;
  const gameplayCam = global.gameplayCamera;
  let flyData = { f: 2, l: 2, w: 2, h: 2 };
  mp.events.add("client_player_toggleFly", () => {
    if (
      ((flyStatus = !flyStatus),
      (global.flyStatus = !global.flyStatus),
      localPlayer.setInvincible(flyStatus),
      localPlayer.freezePosition(flyStatus),
      !flyStatus)
    ) {
      mp.events.remove("render", renderFunction);
      const a = localPlayer.position;
      (a.z = mp.game.gameplay.getGroundZFor3dCoord(a.x, a.y, a.z, 0, !1)),
        localPlayer.setCoordsNoOffset(a.x, a.y, a.z, !1, !1, !1);
    } else mp.events.add("render", renderFunction);
  }),
    mp.events.add("client_player_toggleFly_media", () => {
      if (
        ((flyStatus = !flyStatus),
        (global.flyStatus = !global.flyStatus),
        (global.flyEnableNametags = 0),
        localPlayer.setInvincible(flyStatus),
        localPlayer.freezePosition(flyStatus),
        !flyStatus)
      ) {
        mp.events.remove("render", renderFunction);
        const a = localPlayer.position;
        (a.z = mp.game.gameplay.getGroundZFor3dCoord(a.x, a.y, a.z, 0, !1)),
          localPlayer.setCoordsNoOffset(a.x, a.y, a.z, !1, !1, !1);
      } else mp.events.add("render", renderFunction);
    });
  const controlsIds = {
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    SHIFT: 21,
    Space: 321,
    LCtrl: 326,
  };
  (global.flyStatus = !1),
    (global.flyFirstSpeed = 1.005),
    (global.flyFirstMaxSpeed = 1.2),
    (global.flyFirstMaxSubSpeed = 0.8),
    (global.flySecondSpeed = 1.035),
    (global.flySecondMaxSpeed = 10),
    (global.flySecondMaxSubSpeed = 2),
    (global.flyCameraRotInterval = 1e3 / 60),
    (global.flyCameraRotSpeed = 1),
    (global.flyEnableNametags = 1),
    (global.flyEnableFaction = 1),
    (global.flyEnableFamily = 1);
  const renderFunction = () => {
    var a = Math.min;
    const b = mp.game.controls,
      c = gameplayCam.getDirection();
    let d = !1;
    const e = localPlayer.position,
      f = b.isControlPressed(0, controlsIds.SHIFT)
        ? global.flySecondSpeed
        : global.flyFirstSpeed,
      g = b.isControlPressed(0, controlsIds.SHIFT)
        ? global.flySecondMaxSpeed
        : global.flyFirstMaxSpeed,
      h = b.isControlPressed(0, controlsIds.SHIFT)
        ? global.flySecondMaxSubSpeed
        : global.flyFirstMaxSubSpeed;
    b.isControlPressed(0, controlsIds.W)
      ? ((flyData.f = a(g, flyData.f * f)),
        (e.x += c.x * flyData.f),
        (e.y += c.y * flyData.f),
        (e.z += c.z * flyData.f),
        (d = !0))
      : b.isControlPressed(0, controlsIds.S)
      ? ((flyData.f = a(g, flyData.f * f)),
        (e.x -= c.x * flyData.f),
        (e.y -= c.y * flyData.f),
        (e.z -= c.z * flyData.f),
        (d = !0))
      : (flyData.f = h),
      b.isControlPressed(0, controlsIds.A)
        ? ((flyData.l = a(g, flyData.l * f)),
          (e.x += -c.y * flyData.l),
          (e.y += c.x * flyData.l),
          (d = !0))
        : b.isControlPressed(0, controlsIds.D)
        ? ((flyData.l = a(g, flyData.l * f)),
          (e.x -= -c.y * flyData.l),
          (e.y -= c.x * flyData.l),
          (d = !0))
        : (flyData.l = h),
      b.isControlPressed(0, controlsIds.Space)
        ? ((flyData.h = a(g, flyData.h * f)), (e.z += flyData.h), (d = !0))
        : b.isControlPressed(0, controlsIds.LCtrl)
        ? ((flyData.h = a(g, flyData.h * f)), (e.z -= flyData.h), (d = !0))
        : (flyData.h = h),
      b.disableControlAction(0, 124, !0),
      b.disableControlAction(0, 125, !0),
      b.isDisabledControlPressed(0, 124)
        ? mp.game.cam.setGameplayCamRelativeHeading(
            mp.game.cam.getGameplayCamRelativeHeading() -
              global.flyCameraRotSpeed
          )
        : b.isDisabledControlPressed(0, 125) &&
          mp.game.cam.setGameplayCamRelativeHeading(
            mp.game.cam.getGameplayCamRelativeHeading() +
              global.flyCameraRotSpeed
          ),
      d && localPlayer.setCoordsNoOffset(e.x, e.y, e.z, !1, !1, !1);
    global.flyEnableNametags &&
      (mp.players.forEachInStreamRange((a) => {
        const { x: b, y: c, z: d } = a.position;
        140 > mp.dist(e.x, e.y, e.z, b, c, d) &&
          mp.game.graphics.drawText(
            `${global.getEntityVariable(
              a,
              "characterName",
              "G\u0440\u0430\u0436\u0434\u0430\u043D\u0438\u043D"
            )} (${a.remoteId})\nHP: ${a.getHealth().toFixed(0)} | ${a
              .getArmour()
              .toFixed(0)}` +
              (global.flyEnableFaction
                ? `\n${global.getEntityVariable(a, "factionId", "null")}`
                : "") +
              (global.flyEnableFamily
                ? `\n${global.getEntityVariable(a, "familyId", "null")}`
                : "") +
              (a.getVariable("mediaPerson") ? `\nMEDIA` : ""),
            [b, c, d],
            {
              font: 4,
              color: [255, 255, 255, 255],
              scale: [0.33, 0.33],
              outline: !0,
            }
          );
      }),
      mp.vehicles.forEachInStreamRange((a) => {
        20 > mp.dist(e.x, e.y, e.z, a.position.x, a.position.y, a.position.z) &&
          mp.game.graphics.drawText(
            `ID: ${a.remoteId}\nSpeed: ${(3.6 * a.getSpeed()).toFixed(0)}`,
            [a.position.x, a.position.y, a.position.z],
            {
              font: 4,
              color: [255, 255, 255, 255],
              scale: [0.35, 0.35],
              outline: !0,
            }
          );
      }),
      mp.peds.forEachInStreamRange((a) => {
        if (a.isDynamic && a.serverPed) {
          const { x: b, y: c, z: d } = a.getCoords(!0);
          100 > mp.dist(e.x, e.y, e.z, b, c, d) &&
            mp.game.graphics.drawText(`ID: ${a.serverPed.id}`, [b, c, d], {
              font: 4,
              color: [255, 255, 255, 255],
              scale: [0.33, 0.33],
              outline: !0,
            });
        }
      }),
      mp.objects.forEachInStreamRange((a) => {
        a.hasVariable("_uo") &&
          50 >
            mp.dist(e.x, e.y, e.z, a.position.x, a.position.y, a.position.z) &&
          mp.game.graphics.drawText(
            `ID: ${a.getVariable("_uo").split("_")[0]}`,
            [a.position.x, a.position.y, a.position.z],
            {
              font: 4,
              color: [255, 255, 255, 255],
              scale: [0.33, 0.33],
              outline: !0,
            }
          );
      }));
  };
}
