{
mp.events.add({
    "LoadAliases": (knownaliases) => {
        global.aliases = [];
        KnownAliases = JSON.parse(knownaliases);
        KnownAliases.forEach(alias => {
            global.aliases[alias.known_id] = alias.alias;
        });

    },
    "UpdateAlias": (id, alias) => {
        global.aliases[id] = alias;
    }
});

const maxDistance = 23 * 23;
const width_x = 0.03;
const height_x = 0.0050;
const border_x = 0.001;
const width = 1.03;
const height = 1.0065;
const border = 0.001;

mp.events.add('render', (nametags) => {
    if (!global.uiPlayer_Browsers) return;
    nametags.forEach(nametag => {
        
        const screenResX = mp.game.graphics.getScreenActiveResolution(100, 100).x
        const screenResY = mp.game.graphics.getScreenActiveResolution(100, 100).Y
        if (global.logged) {
        let [player, x, y, distance] = nametag;
        var isVisible = !0;
        if (player.getVariable('nametag_visible') != null)
            isVisible = player.getVariable('nametag_visible');
        if (isVisible && global.logged) {
            if (mp.players.local.hasClearLosTo(player.handle, 17)) {
                if (distance <= maxDistance) {
                    
                    
                    let scale = 1 - (distance / maxDistance);
                    let diff = Math.abs(scale * 100) / 100;
                    if (scale < 0.4) {
                        scale = 0.4;
                    } else if (scale > 0.7) scale = 0.7;
                    y += 0.02 * scale;
     
                    var health = player.getHealth();
                    health = health < 100 ? 0 : ((health - 100) / 100);
                    var color2 = color;
                    if (player.getVariable('nametag_color') != null) {
                        color2 = player.getVariable('nametag_color');
                        if (color2 == "red")
                            color = [255, 0, 0, 255];
                        else if (color2 == "white")
                            color = [255, 255, 255, 255];
                    }
                    if (screenRes > 1920) {
                        let newPos = mp.game.graphics.world3dToScreen2d(player.position)
                        x = newPos.x;
                        y = newPos.y;
                        
                    }
                    

                    if (!player.hasVariable("admin_shared_name") || player.getVariable('admin_shared_name') === 0) {
                        var skip = 0;
                        color = [255, 255, 255, 255];
                        if (player.hasVariable('remoteID') && player.getVariable('remoteID') !== null && typeof player.getVariable('remoteID') === 'number') {
                            if (!player.hasVariable("isCrouched") || !player.getVariable("isCrouched") || (player.hasVariable('animData') && player.getVariable('animData'))) {
                                if (player.getDrawableVariation(1) !== 0) {
                                    mp.game.graphics.drawText("[" + player.getVariable('remoteID') + "]", [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                                        font: 6,
                                        color: color,
                                        scale: [scale * 0.6, scale * 0.6],
                                        outline: !0,
                                        centre: !1
                                    });
                                } else {
                                    if (player.hasVariable('character_sqlid') && global.aliases.length > 0 && typeof global.aliases[player.getVariable('character_sqlid')] !== "undefined" && global.aliases[player.getVariable('character_sqlid')] && player.hasVariable('remoteID')) {
                                        mp.game.graphics.drawText("[" + player.getVariable('remoteID') + "] " + global.aliases[player.getVariable('character_sqlid')], [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                                            font: 6,
                                            color: color,
                                            scale: [scale * 0.6, scale * 0.6],
                                            outline: !0,
                                            centre: !1
                                        });

                                        skip = 1;

                                    }
                                }
                                if (skip == 0 && player.hasVariable('remoteID')) {
                                    mp.game.graphics.drawText("[" + player.getVariable('remoteID') + "]", [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {

                                        font: 6,
                                        color: color,
                                        scale: [scale * 0.6, scale * 0.6],
                                        outline: !0,
                                        centre: !1
                                    })
                                }
                            }
                        }

                    } else {
                        if (player.getVariable('admin_shared_color') === 2) {
                            color = [252, 66, 203, 255];
                        } else if (player.getVariable('admin_shared_color') === 1) {
                            color = [255, 0, 0, 255];
                        } else color = [54, 104, 255, 255];
                        mp.game.graphics.drawText('[ADMIN]~w~ ' + player.getVariable('admin_shared_name'), [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                            font: 6,
                            color: color,
                            scale: [scale * 0.6, scale * 0.6],
                            outline: !0,
                            centre: !1
                        });
                    }
                    if (player.getVariable('chatOpened') == 1) {
                        mp.game.graphics.drawText("(( Typing... ))", [x + ((0 * 0.5) * 0.25), y - (0.020 * scale)], {
                            font: 6,
                            color: [194, 194, 194, 255],
                            scale: [scale * 0.35, scale * 0.35],
                            outline: !0,
                            centre: !1
                        });
                    } else if (player.getVariable("emoteText") !== "") {
                        mp.game.graphics.drawText(player.getVariable("emoteText"), [x + ((0 * 0.5) * 0.25), y + (0.050 * scale)], {
                            font: 6,
                            color: [223, 128, 255, 255],
                            scale: [scale * 0.5, scale * 0.5],
                            outline: !1,
                            centre: !1
                        });
                    }
                
                }
                }
            }
        }
    })
});


mp.events.addDataHandler('adminInv', (entity, value, oldValue) => {

    if (value === true) {
        if (entity.handle && entity.handle != 0) {
            entity.setProofs(true, true, true, true, true, true, true, true);
        }
    }
    else {
        if (value === false) {
            if (entity.handle && entity.handle != 0) {
                entity.setProofs(false, false, false, false, false, false, false, false);
            }
        }
    }
});



mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'player') {
        if (entity.hasVariable('adminInv') && entity.getVariable('adminInv') === true) {
            entity.setProofs(true, true, true, true, true, true, true, true);

        }
        else {
            entity.setProofs(false, false, true, false, false, false, false, false);
        }

    }
});

mp.events.add("entityStreamOut", (entity) => {
    
});
}