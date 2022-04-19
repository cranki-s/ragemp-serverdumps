{
let crosshairCont = null;
var crosshair = mp.browsers["new"]('package://cef/System/CustomCrosshair/custom/index.html');
var crosshair__browser = mp.browsers["new"]('package://cef/System/CustomCrosshair/browser/index.html');
let crosshair2 = {
    vert: {
        background: '#000',
        width: "3px",
        height: "40px",
        opacity: 1
    },
    gor: {
        background: '#000',
        width: "3px",
        height: "40px",
        opacity: 1
    }
}
if(mp.storage.data.crosshair != undefined){
    crosshairCont = true;
    crosshair2.vert.background = mp.storage.data.crosshair.vert.background
    crosshair2.vert.width = mp.storage.data.crosshair.vert.width
    crosshair2.vert.height = mp.storage.data.crosshair.vert.height
    crosshair2.vert.opacity = mp.storage.data.crosshair.vert.opacity
    crosshair2.gor.background = mp.storage.data.crosshair.gor.background
    crosshair2.gor.width = mp.storage.data.crosshair.gor.width
    crosshair2.gor.height = mp.storage.data.crosshair.gor.height
    crosshair2.gor.opacity = mp.storage.data.crosshair.gor.opacity
}
else {
    crosshairCont = false;
    mp.storage.data.crosshair = {
        vert: {
            background: '#000',
            width: "3px",
            height: "5px",
            opacity: 1
        },
        gor: {
            background: '#000',
            width: "3px",
            height: "5px",
            opacity: 1
        }
    };
}
mp.keys.bind(0x79, false, function () {
    if (!loggedin || chatActive) return;
    if (global.menuCheck()) {
        mp.events.call("closeCrosshairMenu")
        return;
    }
    if (mp.storage.data.crosshair != undefined) {
        crosshair2.vert.background = mp.storage.data.crosshair.vert.background
        crosshair2.vert.width = mp.storage.data.crosshair.vert.width
        crosshair2.vert.height = mp.storage.data.crosshair.vert.height
        crosshair2.vert.opacity = mp.storage.data.crosshair.vert.opacity
        crosshair2.gor.background = mp.storage.data.crosshair.gor.background
        crosshair2.gor.width = mp.storage.data.crosshair.gor.width
        crosshair2.gor.height = mp.storage.data.crosshair.gor.height
        crosshair2.gor.opacity = mp.storage.data.crosshair.gor.opacity  
    }
    else {
        crosshair2 = {
            vert: {
                background: '#000',
                width: "3px",
                height: "5px",
                opacity: 1
            },
            gor: {
                background: '#000',
                width: "3px",
                height: "5px",
                opacity: 1
            }
        };
    }
    crosshair.execute(`wrapper.open(${crosshair2.vert},${crosshair2.gor})`)
    crosshair__browser.execute(`crosshair_browser.crosshairAdd('${crosshair2.vert.background}','${crosshair2.vert.width}','${crosshair2.vert.height}','${crosshair2.vert.opacity}','${crosshair2.gor.background}','${crosshair2.gor.width}','${crosshair2.gor.height}','${crosshair2.gor.opacity}')`)
    crosshair.execute(`wrapper.active=true`)
    menuOpen()
});
mp.events.add('closeCrosshairMenu', () => {
    crosshair.execute(`wrapper.active=false`)
    menuClose()
});
mp.events.add('resetCrosshair', () => {
    crosshairCont = false;
    mp.storage.data.crosshair = undefined;
    crosshair2 = {
        vert: {
            background: '#000',
            width: "3px",
            height: "40px",
            opacity: 1
        },
        gor: {
            background: '#000',
            width: "3px",
            height: "40px",
            opacity: 1
        }
    }
});
mp.events.add('saveCrosshair', (vertBack, vertWidth, vertHeight, vertOp, gorBack, gorWidth, gorheight, gorOp) => {
    crosshair__browser.execute(`crosshair_browser.crosshairAdd('${vertBack}','${vertWidth}','${vertHeight}','${vertOp}','${gorBack}','${gorWidth}','${gorheight}','${gorOp}')`)
    crosshair2.vert.background = vertBack
    crosshair2.gor.background = gorBack
    crosshair2.vert.width = vertWidth
    crosshair2.gor.width = gorWidth
    crosshair2.gor.height = gorheight
    crosshair2.vert.height = vertHeight
    crosshair2.vert.opacity = vertOp
    crosshair2.gor.opacity = gorOp
    crosshairCont = true;
    mp.storage.data.crosshair = {
        vert: {
            background: vertBack,
            width: vertWidth,
            height: vertHeight,
            opacity: vertOp,
        },
        gor: {
            background: gorBack,
            width: gorWidth,
            height: gorheight,
            opacity: gorOp,
        }
    };
    mp.events.call('notify', 0, 2, "Изменения сохранены.", 3000);
});
mp.events.add('render', () => {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || global.menuCheck()) return;
    if (crosshairCont && mp.game.invoke('0x68EDDA28A5976D07') && mp.players.local.weapon != 2725352035) {
        let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
        let groupHash = mp.game.weapon.getWeapontypeGroup(weaponHash);
        if (groupHash != 3082541095) {
            mp.game.ui.hideHudComponentThisFrame(14);
        }
    }
});
mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || global.menuCheck()) return;   
    if (crosshairCont) 
        if (leftOrRight == "right" || leftOrRight == "left") {
            if (mp.players.local.weapon != 2725352035) {
            let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
            let groupHash = mp.game.weapon.getWeapontypeGroup(weaponHash);
            if (groupHash != 3082541095) {
                if (upOrDown == "up") 
                    crosshair__browser.execute(`crosshair_browser.active=false`)
                else 
                    crosshair__browser.execute(`crosshair_browser.active=true`)
            }
        }
    }
});
crosshair__browser.execute(`crosshair_browser.crosshairAdd('${crosshair2.vert.background}','${crosshair2.vert.width}','${crosshair2.vert.height}','${crosshair2.vert.opacity}','${crosshair2.gor.background}','${crosshair2.gor.width}','${crosshair2.gor.height}','${crosshair2.gor.opacity}')`)
}㠙ፗû