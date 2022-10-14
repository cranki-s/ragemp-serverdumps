{
var FloatTips = [];
var FloatTipsDOM = undefined;

let lastFrameUpdate = 0;

function InitializeFloatTips(){
    FloatTipsDOM = mp.browsers.new("package://tips_test/index.html");
}

mp.events.add("addFloatTip", (id, key, action, posX, posY, posZ) => {
    FloatTips.push({
        id: id,
        key:key, action:action, 
        posX:posX, 
        posY:posY, 
        posZ:posZ
    });
    let pos2d = mp.game.graphics.world3dToScreen2d(new mp.Vector3(posX, posY, posZ));
    if(pos2d){
        let realPos = {x:0, y:0};

        realPos.y = ((resolution.y - (pos2d.y * resolution.y)));
        realPos.x = ((pos2d.x * resolution.x) + 10);
        FloatTipsDOM.execute(`addFloatTip('${id}', '${key}', '${action}', ${realPos.x}, ${realPos.y});`);
    }
});

mp.events.add('render', () => {
    let resolution = mp.game.graphics.getScreenActiveResolution(0,0);
    lastFrameUpdate++;
    if(lastFrameUpdate >= 1){
        for(let i = 0 ; i < FloatTips.length ; i++){
            let pos2d = mp.game.graphics.world3dToScreen2d(new mp.Vector3(FloatTips[i].posX, FloatTips[i].posY, FloatTips[i].posZ));
            if(pos2d){
                let realPos = {x:0, y:0};

                realPos.y = (pos2d.y * resolution.y);
                realPos.x = (pos2d.x * resolution.x);

                FloatTipsDOM.execute(`setScreenPosition('${FloatTips[i].id}', ${realPos.x}, ${realPos.y});`);
            }
            
        }
        lastFrameUpdate = 0;
    }
});
}