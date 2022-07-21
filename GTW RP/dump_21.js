{
var object_spawn = "";

DirectionEnum = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    FRONT: 5,
    BACK: 6,
    TOGGLEFREEZE: 7,
}

var textList = {};


mp.events.add('AddText', (text, xPos, yPos, size, r, g, b, alpha, font, justify, shadow, outline, wordWrap, captionName) => {
	textList[captionName] = {};
        textList[captionName].textName = text;
        textList[captionName].xPos = xPos;
        textList[captionName].yPos = yPos;
        textList[captionName].scale = size;
        textList[captionName].r = r;
        textList[captionName].g = g;
        textList[captionName].b = b;
        textList[captionName].alpha = alpha;
        textList[captionName].font = font;
        textList[captionName].justify = justify;
        textList[captionName].shadow = shadow;
        textList[captionName].outline = outline;
        textList[captionName].wordWrap = wordWrap;
});

mp.events.add('RemoveText', (args) => {
    if(textList[args[0]] !== undefined)
	    delete textList[args[0]];
});

mp.events.add('UpdateText', (name, text, x, y) => {
    if(textList[name] !== undefined)
	    textList[name].textName = text;
    else mp.events.call('AddText', text, x, y, 0.3, 245, 191 ,45 ,225, 0, 0, true, true, 0, name);
});

mp.events.add('RemoveAllText', () => {
	textList = {};
});

mp.events.add('start_object', () => {
	object_spawn = "move_object";
});

mp.events.add('stop_object', () => {
	object_spawn = "";
});

mp.events.add('render', () => {
    for (var keytmp in textList) {
        var key = textList[keytmp];
		    mp.game.graphics.drawText(key.textName, [key.xPos /res_X + 0.1, key.yPos / res_Y],{
            font: 4,
            color: [key.r, key.g, key.b, key.alpha],
            scale: [key.scale + 0.1, key.scale + 0.1],
            outline: key.outline,
            centre: false
        });
    }
});

var step = 50;

var DoubleCount = 0;

mp.keys.bind(0x26, true, (player) => { //UP
    if (object_spawn !== "" && object_spawn != null){
        if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.FRONT, step);
        DoubleCount = 1;
		var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x26) === true) {
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                } 
                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.FRONT, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
		
});

mp.keys.bind(0x28, true, (player) => {  //DOWN
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.BACK, step);
        DoubleCount = 1;
		var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x28) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }
                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.BACK, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }	
});

mp.keys.bind(0x25, true, (player) => { //LEFT
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.LEFT, step);
        DoubleCount = 1;
		var refreshIntervalId = setInterval(() => {
	        if (mp.keys.isDown(0x25) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }
                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.LEFT, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
});

mp.keys.bind(0x27, true, (player) => { //RIGHT
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.RIGHT, step);
        DoubleCount = 1;
        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x27) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }
                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.RIGHT, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
});

mp.keys.bind(0x5A, true, (player) => { //Z
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.UP, step);
        DoubleCount = 1;
        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x5A) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }

                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.UP, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
});

mp.keys.bind(0x57, true, (player) => { //W
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.UP, step);
        DoubleCount = 1;
        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x57) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }

                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.UP, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
});

mp.keys.bind(0x53, true, (player) => {	//S
    if (object_spawn !== "" && object_spawn != null){
if (isNoClip && !noclip_frozen)
            return;
        mp.events.callRemote(object_spawn, DirectionEnum.DOWN, step);
        DoubleCount = 1;
        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x53) === true) { 
                if(DoubleCount >= 1) {
                    DoubleCount = 0; 
                    return;
                }
                if (object_spawn !== "" && object_spawn != null) {
                    mp.events.callRemote(object_spawn, DirectionEnum.DOWN, step);
                    DoubleCount = 0;
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, step);
    }
});

mp.keys.bind(0x46, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		mp.events.callRemote("togglefreeze_object", DirectionEnum.TOGGLEFREEZE, step);
	}
});

mp.keys.bind(0x52, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		    if (object_spawn === "rot_object")
            {
                textList["objectstatus1"].textName = "Moving";
                object_spawn = "move_object";
            }
            else if (object_spawn === "move_object")
            {
                textList["objectstatus1"].textName = "Rotating";
                object_spawn = "rot_object";
            }
	}
});

mp.keys.bind(0xDB, true, (player) => { // Z Key
    if (object_spawn !== "" && object_spawn != null) {
		step = 1000;
        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
	}
});

mp.keys.bind(0xDD, true, (player) => { // X Key
    if (object_spawn !== "" && object_spawn != null) {
		step = 5;
        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
	}
});

mp.keys.bind(0x21, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		if (step >= 500 )
            step -= 50;
        else if (step > 5)
            step -= 5;

        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
	}
});

mp.keys.bind(0x22, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		if (step < 500)
            step += 5;
        else if (step >= 500 && step < 1000)
            step += 50;
            
        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
	}
});

mp.keys.bind(0x24, true, (player) => {	//HOME
    if (object_spawn !== "" && object_spawn != null){
        if (step >= 500)
            step -= 50;
        else if (step > 5)
            step -= 5;
        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);

        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x24) === true) {
                if (object_spawn !== "" && object_spawn != null) {
                    if (step >= 500)
                        step -= 50;
                    else if (step > 5)
                        step -= 5;

                    textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, 200);
    }
});

mp.keys.bind(0x23, true, (player) => {	//END
    if (object_spawn !== "" && object_spawn != null){
        if (step < 500)
            step += 5;
        else if (step >= 500 && step < 1000)
            step += 50;

        textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);

        var refreshIntervalId = setInterval(() => {
            if (mp.keys.isDown(0x23) === true) {
                if (object_spawn !== "" && object_spawn != null) {
                    if (step < 500)
                        step += 5;
                    else if (step >= 500 && step < 1000)
                        step += 50;

                    textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, 200);
    }
});

mp.keys.bind(0xD, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		object_spawn = null;
        mp.events.callRemote("stop_object");
	}
});

mp.keys.bind(0x2E, true, (player) => {
	if (object_spawn !== "" && object_spawn != null) {
		object_spawn = null;
        mp.events.callRemote("cancel_object");
	}
});

mp.keys.bind(8, false, (player) => { // BACKSPACE
    if(!mp.players.local.hasVariable("MANAGE_FURNITURE_CLICK_MODE") || mp.players.local.getVariable("MANAGE_FURNITURE_CLICK_MODE") == false) return;
    mp.events.callRemote("exit_click_mode");
});

mp.keys.bind(13, false, (player) => { // ENTER key
    if(mp.players.local.hasVariable("MANAGE_FURNITURE_CLICK_MODE") && mp.players.local.getVariable("MANAGE_FURNITURE_CLICK_MODE") == true && mp.gui.cursor.visible) {
        mp.gui.cursor.visible = false;
    }
});

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {

    if(leftOrRight == "right" || upOrDown == "up" || !is_defined(worldPosition)) return;
    if(!mp.players.local.hasVariable("MANAGE_FURNITURE_CLICK_MODE") || mp.players.local.getVariable("MANAGE_FURNITURE_CLICK_MODE") == false) return;

    let object_entity = screen_coords_to_entity(x, y, 16, mp.players.local.handle);

    if(!is_defined(object_entity)) {
        return;
    }
 
    mp.events.callRemote("client_click", object_entity.remoteId);
});


/*
var drawx = 0.5;
var drawy = 0.5;
var width = 0.01;
var height = 0.01;

mp.keys.bind(0x61, true, (player) => { // Numpad1
	drawx += 0.01;
});

mp.keys.bind(0x62, true, (player) => { // Numpad2
	drawx -= 0.01;
});

mp.keys.bind(0x64, true, (player) => { // Numpad4
	drawy += 0.01;
});

mp.keys.bind(0x65, true, (player) => { // Numpad5
	drawy -= 0.01;
});

mp.keys.bind(0x67, true, (player) => { // Numpad7
	width += 0.01;
});

mp.keys.bind(0x68, true, (player) => { // Numpad8
	width -= 0.01;
});

mp.keys.bind(0x66, true, (player) => { // Numpad6
	height += 0.01;
});

mp.keys.bind(0x69, true, (player) => { // Numpad9
	height -= 0.01;
});
*/

mp.events.add("render", () => {
    
    if(mp.players.local.hasVariable("MANAGE_FURNITURE_CLICK_MODE") && mp.players.local.getVariable("MANAGE_FURNITURE_CLICK_MODE") == true) 
    {
        if(mp.players.local.dimension == 0) {
            mp.events.callRemote("exit_click_mode");
            return;
        }

        /*mp.game.graphics.drawText(`${drawx} ${drawy} ${width} ${height}`, [0.5, 0.5], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.85, 0.85],
            outline: true,
            centre: true
        });*/

        mp.game.graphics.drawRect(0.5, 0.04, 0.21, 0.1, 0, 0, 0, 195);

        mp.game.graphics.drawText(`Furniture Click & Edit Mode`, [0.5, 0.005], {
            font: 4,
            color: [255, 255, 255, 200],
            scale: [0.85, 0.85],
            outline: true,
            centre: true
        });
        mp.game.graphics.drawText(`Press BACKSPACE to exit | F3 for Cursor ${debug ? `| ~r~DEBUG MODE` : ``}`, [0.5, 0.05], {
            font: 4,
            color: [255, 125, 0, 200],
            scale: [0.4, 0.4],
            outline: true,
            centre: true
        });
    }
});

function is_defined(obj) {
	return obj !== undefined && obj != null;
}

/*
mp.keys.bind(222, false, () => {
    mp.browsers.forEach(browser => {
        mp.gui.chat.push(`${browser.url}`);
    });
    mp.gui.chat.push(`---[Active Browsers count = ${mp.browsers.length}]---`);
});
*/

/*
API.onKeyDown.connect(function (sender, args) {
    if (object_spawn !== "" && object_spawn != null) {
        if (args.KeyCode == Keys.Up) {
            API.triggerServerEvent(object_spawn, DirectionEnum.FRONT, step);
        }
        else if (args.KeyCode == Keys.Down) {
            API.triggerServerEvent(object_spawn, DirectionEnum.BACK, step);
        }
        else if (args.KeyCode == Keys.Left) {
            API.triggerServerEvent(object_spawn, DirectionEnum.LEFT, step);
        }
        else if (args.KeyCode == Keys.Right) {
            API.triggerServerEvent(object_spawn, DirectionEnum.RIGHT, step);
        }
        else if (args.KeyCode == Keys.Z || args.KeyCode == Keys.W) {
            API.triggerServerEvent(object_spawn, DirectionEnum.UP, step);
        }
        else if (args.KeyCode == Keys.S) {
            API.triggerServerEvent(object_spawn, DirectionEnum.DOWN, step);
        }
        else if (args.KeyCode == Keys.F) {
            API.triggerServerEvent("togglefreeze_object", DirectionEnum.TOGGLEFREEZE);
        }
        else if (args.KeyCode == Keys.R) {
            if (object_spawn === "rot_object")
            {
                textList["objectstatus2"].textName = "Moving";
                object_spawn = "move_object";
            }
            else if (object_spawn === "move_object")
            {
                textList["objectstatus2"].textName = "Rotating";
                object_spawn = "rot_object";
            }
        }
        else if (args.KeyCode == Keys.PageUp) {
            if (step > 5)
                step -= 5;
            textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
            //API.sendChatMessage("Step : " + (1 / step));
        }
        else if (args.KeyCode == Keys.PageDown) {
            if (step < 500)
                step += 5;
            textList["objectspeed2"].textName = "" + (Math.round((1 / step) * 10000) / 100);
            //API.sendChatMessage("Step : " + (1 / step));
        }
        else if (args.KeyCode == Keys.Enter) {
            object_spawn = null;
            API.triggerServerEvent("stop_object");
        }
        else if (args.KeyCode == Keys.Delete) {
            object_spawn = null;
            API.triggerServerEvent("cancel_object");
        }
    }
});*/
}