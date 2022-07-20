{
    const mp = global.mp,
        localPlayer = mp.players.local,
        ANGRY_ANIMAL_LIST = [mp.game.joaat("a_c_coyote"), mp.game.joaat("a_c_mtlion"), mp.game.joaat("a_c_panther"), mp.game.joaat("a_c_coyote") << 0, mp.game.joaat("a_c_mtlion") << 0, mp.game.joaat("a_c_panther") << 0],
        CAN_BE_ANGRY_LIST = [mp.game.joaat("a_c_boar"), mp.game.joaat("a_c_deer")];
    global.ServerPed.registerControllerScript("ANIMAL_HUNTING", {
        onStreamIn(a) {},
        onStreamOut(a) {},
        onChangeController(a, b) {
            if (a.__lastPos = null, localPlayer === b) {
                a.entity.setCanBeDamaged(!0), a.entity.setCanRagdoll(!1), a.entity.setCanRagdollFromPlayerImpact(!1), a.entity.setProofs(!1, !0, !0, !0, !1, !0, !0, !0), a.entity.setSuffersCriticalHits(!1);
                const b = a.entity.getCoords(!0),
                    c = mp.game.gameplay.getGroundZFor3dCoord(b.x, b.y, b.z + 25, 0, !1);
                a.entity.setCoordsNoOffset(b.x, b.y, c + 1, !1, !1, !1);
                const d = a.entity.getModel();
                (-1 !== ANGRY_ANIMAL_LIST.indexOf(d) || -1 !== ANGRY_ANIMAL_LIST.indexOf(d << 0) || .5 < Math.random() && -1 !== CAN_BE_ANGRY_LIST.indexOf(d)) && (a.entity.setCombatAbility(2), a.entity.setCombatRange(2), a.entity.setCombatMovement(3), a.entity.setCombatAttributes(46, !0), a.entity.setCombatAttributes(5, !0), a.entity.setFleeAttributes(0, !0), a.entity.setConfigFlag(2, !0), a.entity.setConfigFlag(188, !0), a.__angryAnimal = !0);
                const e = a.entity.getVariable("spawnPosition");
                a.entity.taskWanderInArea(e.x, e.y, c + 1, 25, 2, 5), a.deathNotifyEnable = !0
            }
        },
        onTick(a) {
            const b = a.entity.getCoords(!0);
            if (a.__lastPos || (a.__lastPos = b), 5 < mp.dist(b.x, b.y, b.z, a.__lastPos.x, a.__lastPos.y, a.__lastPos.z)) return void a.entity.setCoordsNoOffset(a.__lastPos.x, a.__lastPos.y, a.__lastPos.z, !1, !1, !1);
            const c = a.entity.getVariable("spawnPosition");
            return 100 < mp.dist(b.x, b.y, b.z, c.x, c.y, c.z) ? (a.entity.setCoordsNoOffset(c.x, c.y, c.z, !1, !1, !1), void a.removeControllerStatus()) : void(a.__lastPos = b)
        }
    }), mp.events.add("client_hunting_anim", async () => {
        if (!mp.game.streaming.hasAnimDictLoaded("amb@medic@standing@kneel@base") || !mp.game.streaming.hasAnimDictLoaded("anim@gangops@facility@servers@bodysearch@")) {
            mp.game.streaming.requestAnimDict("amb@medic@standing@kneel@base"), mp.game.streaming.requestAnimDict("anim@gangops@facility@servers@bodysearch@");
            do await mp.game.waitAsync(10); while (!mp.game.streaming.hasAnimDictLoaded("amb@medic@standing@kneel@base") || !mp.game.streaming.hasAnimDictLoaded("anim@gangops@facility@servers@bodysearch@"))
        }
        localPlayer.taskPlayAnim("amb@medic@standing@kneel@base", "base", 8, -8, -1, 512, 0, !1, !1, !1), localPlayer.taskPlayAnim("anim@gangops@facility@servers@bodysearch@", "player_search", 8, -8, -1, 512, 0, !1, !1, !1), await mp.game.waitAsync(5e3), localPlayer.stopAnimTask("amb@medic@standing@kneel@base", "base", 3), localPlayer.stopAnimTask("anim@gangops@facility@servers@bodysearch@", "player_search", 3)
    });
}