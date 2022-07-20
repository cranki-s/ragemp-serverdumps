{
    const mp = global.mp;
    mp.attachmentMngr = {
        attachments: {},
        addFor: async function (a, b) {
            if (this.attachments.hasOwnProperty(b) && null != a.__attachmentObjects && !a.__attachmentObjects.hasOwnProperty(b)) {
                const c = this.attachments[b];
                if (c.weaponHash) {
                    const d = global.playerWeaponGetModsData(a, c.weaponHash),
                        e = WEAPON_ATTACH_REPLACE_DATA.find(a => d.find(b => b.mod.mod === a[0])),
                        {
                            x: f,
                            y: g,
                            z: h
                        } = a.position,
                        j = e ? mp.objects.new(e[1], new mp.Vector3(f, g, h - 10), {
                            dimension: -1
                        }) : mp.objects.newWeaponObject(c.weaponHash, new mp.Vector3(f, g, h - 10), {
                            ammo: 1,
                            scale: 1,
                            showWorldObject: !0,
                            rotaiton: new mp.Vector3(0, 0, 0),
                            dimension: -1
                        });
                    if (!j) return;
                    for (let a = 0; 0 === j.handle && 2e3 > a; ++a) await mp.game.waitAsync(0);
                    if (!mp.objects.exists(j) || !mp.players.exists(a) || 0 === j.handle || 0 === a.handle) return void(mp.objects.exists(j) && j.destroy());
                    if (j.attachTo(a.handle, "string" == typeof c.boneName ? a.getBoneIndexByName(c.boneName) : a.getBoneIndex(c.boneName), c.offset.x, c.offset.y, c.offset.z, c.rotation.x, c.rotation.y, c.rotation.z, !1, !1, !1, !1, 2, !0), !e)
                        for (const a of d) a.mod.setToObject(j.handle, a.param);
                    return void(a.__attachmentObjects[b] = j)
                }
                const d = mp.objects.new(c.model, a.position, {
                    dimension: -1
                });
                if (!d) return;
                for (let a = 0; 0 === d.handle && 2e3 > a; ++a) await mp.game.waitAsync(0);
                if (!mp.objects.exists(d) || !mp.players.exists(a) || 0 === d.handle || 0 === a.handle) return void(mp.objects.exists(d) && d.destroy());
                d.attachTo(a.handle, "string" == typeof c.boneName ? a.getBoneIndexByName(c.boneName) : a.getBoneIndex(c.boneName), c.offset.x, c.offset.y, c.offset.z, c.rotation.x, c.rotation.y, c.rotation.z, !1, !1, !1, !1, 2, !0), a.__attachmentObjects[b] = d
            }
        },
        removeFor: function (a, b) {
            if (a.__attachmentObjects != null && a.__attachmentObjects.hasOwnProperty(b)) {
                let c = a.__attachmentObjects[b];
                delete a.__attachmentObjects[b], mp.objects.exists(c) && c.destroy()
            }
        },
        initFor: function (a) {
            for (let b of a.__attachments) mp.attachmentMngr.addFor(a, b)
        },
        shutdownFor: function (a) {
            for (let b in a.__attachmentObjects) mp.attachmentMngr.removeFor(a, b)
        },
        register: function (a, b, c, d, e) {
            "string" == typeof a && (a = mp.game.joaat(a)), "string" == typeof b && (b = mp.game.joaat(b)), mp.game.streaming.isModelInCdimage(b) && (mp.game.streaming.requestModel(b), this.attachments[a] = {
                id: a,
                model: b,
                offset: d,
                rotation: e,
                boneName: c
            })
        },
        registerWeapon: function (a, b, c, d, e) {
            "string" == typeof a && (a = mp.game.joaat(a)), this.attachments[a] = {
                id: a,
                weaponHash: b,
                offset: d,
                rotation: e,
                boneName: c
            }
        },
        unregister: function (a) {
            "string" == typeof a && (a = mp.game.joaat(a)), this.attachments.hasOwnProperty(a) && (this.attachments[a] = void 0)
        },
        getAttachments: function () {
            return Object.assign({}, this.attachments)
        },
        addClient: function (a, b) {
            a.__attachmentObjects == null && (a.__attachmentObjects = {}), this.addFor(a, b)
        },
        addClientByFakeId: async function (a, b, c) {
            a.__attachmentObjects == null && (a.__attachmentObjects = {}), await this.addFor(a, b), a.__attachmentObjects[b] && (a.__attachmentObjects[c] = a.__attachmentObjects[b], delete a.__attachmentObjects[b])
        },
        addToPed: async function (a, b) {
            if (this.attachments.hasOwnProperty(b) && (null == a.__attachmentObjects && (a.__attachmentObjects = {}), !a.__attachmentObjects.hasOwnProperty(b))) {
                const c = this.attachments[b],
                    d = mp.objects.new(c.model, new mp.Vector3(a.position.x, a.position.y, a.position.z - 5), {
                        dimension: -1
                    });
                if (!d) return;
                for (let a = 0; 0 === d.handle && 1e4 > a; ++a) await mp.game.waitAsync(0);
                if (!mp.objects.exists(d) || !mp.peds.exists(a) || 0 === d.handle || 0 === a.handle) return void(mp.objects.exists(d) && d.destroy());
                d.attachTo(a.handle, "string" == typeof c.boneName ? a.getBoneIndexByName(c.boneName) : a.getBoneIndex(c.boneName), c.offset.x, c.offset.y, c.offset.z, c.rotation.x, c.rotation.y, c.rotation.z, !1, !1, !1, !0, 2, !0), a.__attachmentObjects[b] = d
            }
        },
        getObject: function (a, b) {
            if (a.__attachmentObjects != null && a.__attachmentObjects.hasOwnProperty(b)) {
                const c = a.__attachmentObjects[b];
                if (mp.objects.exists(c)) return c
            }
        }
    };
    const WEAPON_ATTACH_REPLACE_DATA = [
        ["PST_V_1", "W_PI_Pistol_Luxe"],
        ["PSTCOMB_V_1", "w_pi_combatpistol_luxe"],
        ["PSTHEAVY_V_1", "W_PI_HeavyPistol_Luxe"],
        ["REV_V_1", "w_pi_revolver_g"],
        ["REV_V_2", "w_pi_revolver_b"],
        ["SMG_V_1", "W_SB_SMG_Luxe"],
        ["MICROSMG_V_1", "W_SB_MicroSMG_Luxe"],
        ["ASSMG_V_1", "w_sb_assaultsmg_luxe"],
        ["SGPUMP_V_1", "w_sg_pumpshotgun_luxe"],
        ["SAWNOFF_V_1", "w_sg_sawnoff_luxe"],
        ["AR_V_1", "W_AR_AssaultRifle_Luxe"],
        ["ARCARB_V_1", "W_AR_CarbineRifle_Luxe"],
        ["ARSPEC_V_1", "w_ar_specialcarbine_luxe"],
        ["MG_V_1", "w_mg_mg_luxe"],
        ["ARADV_V_1", "W_AR_AdvancedRifle_Luxe"],
        ["SR_V_1", "W_SR_SniperRifle_Luxe"],
        ["PST50_V_1", "W_PI_Pistol50_Luxe"],
        ["PSTSNS_V_1", "w_pi_sns_pistol_luxe"],
        ["ARBP_V_1", "w_ar_bullpuprifle_luxe"],
        ["MGC_V_1", "w_mg_combatmg_luxe"],
        ["SB_V_1", "w_me_switchblade_g"],
        ["SB_V_2", "w_me_switchblade_b"],
        ["KNUCKLE_V_1", "W_ME_Knuckle_02"],
        ["KNUCKLE_V_2", "W_ME_Knuckle_BG"],
        ["KNUCKLE_V_3", "W_ME_Knuckle_DLR"],
        ["KNUCKLE_V_4", "W_ME_Knuckle_DMD"],
        ["KNUCKLE_V_5", "W_ME_Knuckle_HT"],
        ["KNUCKLE_V_6", "W_ME_Knuckle_LV"],
        ["KNUCKLE_V_7", "W_ME_Knuckle_PC"],
        ["KNUCKLE_V_8", "W_ME_Knuckle_SLG"],
        ["KNUCKLE_V_9", "W_ME_Knuckle_VG"]
    ].map(a => [a[0], mp.game.joaat(a[1])]);
    mp.objects.newWeaponObject || (mp.objects.newWeaponObject = () => null), mp.events.add("entityStreamIn", function (a) {
        a.__attachments && mp.attachmentMngr.initFor(a)
    }), mp.events.add("entityStreamOut", function (a) {
        a.__attachmentObjects && mp.attachmentMngr.shutdownFor(a)
    }), mp.events.addDataHandler("attachmentsData", function (a, b) {
        if (0 !== a.handle) {
            let c = 0 < b.length ? b.split("|").map(a => parseInt(a, 36)) : [];
            if (0 !== a.handle) {
                let b = a.__attachments;
                b || (b = [], a.__attachmentObjects = {});
                for (let d of b) - 1 === c.indexOf(d) && mp.attachmentMngr.removeFor(a, d);
                for (let d of c) - 1 === b.indexOf(d) && mp.attachmentMngr.addFor(a, d)
            }
            a.__attachments = c
        }
    }), setTimeout(() => {
        mp.players.forEach(function (a) {
            const b = a.getVariable("attachmentsData");
            if (b && 0 < b.length) {
                const c = b.split("|").map(a => parseInt(a, 36));
                a.__attachments = c, a.__attachmentObjects = {}
            }
        })
    }, 500), mp.attachmentMngr.register("sprayPaint", "prop_spraygun_01", 28422, new mp.Vector3(.01, -.11, -.08), new mp.Vector3(-35, 0, 2)), mp.attachmentMngr.register("WaterIngcan", "prop_wateringcan", 28422, new mp.Vector3(.26, -.1, -.12), new mp.Vector3(-50, 0, 2)), mp.attachmentMngr.register("flowers1", "cls_flower_buket_calla", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), mp.attachmentMngr.register("flowers2", "cls_flower_buket_florist", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), mp.attachmentMngr.register("flowers3", "cls_flower_buket_lilac", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), mp.attachmentMngr.register("flowers4", "cls_flower_buket_red", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), mp.attachmentMngr.register("flowers5", "cls_flower_buket_white", 60309, new mp.Vector3(.05, .03, .03), new mp.Vector3(50, 190, 0)), mp.attachmentMngr.register("pumpkin_hat", "cls_hw_gourd_small_hand", 12844, new mp.Vector3(.04, 0, 0), new mp.Vector3(180, 90, 0));
}