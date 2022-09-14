{
var dict = undefined;
var anim = undefined;
var timer = undefined;

mp.events.add('applyFacialAnim', () => {
    ApplyExpressionToEntity(mp.players.local);
});

// The reason I keep re-apply the facial expressions every 3 seconds is because they seem to get reset by GTA automatically after 3 seconds for some reason.
mp.events.add('FacialUpdateTimerStart', () => {
    timer = setInterval(facialUpdate, 3000);
});

mp.events.add('FacialUpdateTimerStop', () => {
    clearInterval(timer);
});

mp.events.add('entityStreamIn', (entity) => {
    try{
        if (entity == null) return 
        if (typeof entity === "undefined") return 
        
        if(entity.type !== 'player')
        {
            return;
        }
        if(DebugValues)
                mp.gui.chat.push("[DEBUG] Main FacialExpressions.js");
        ApplyExpressionToEntity(entity);
        if(DebugValues)
                mp.gui.chat.push("[DEBUG] Main FacialExpressions.js - END");
    } catch(e){

    }
});

function ApplyExpressionToEntity(entity)
{
    let dictionary = entity.getVariable("FacialExpression::ExpressionDictionary");
    let name = entity.getVariable("FacialExpression::ExpressionName");

    if (dictionary !== null && name !== null && typeof dictionary === "string" && typeof name === "string")
    {
        if(dictionary.length == 0 || name.length == 0)
        {
            return;
        }

        entity.playFacialAnim(name, dictionary);
    }
}

function facialUpdate() {
    mp.players.forEachInStreamRange(
		(player, id) => {
            ApplyExpressionToEntity(player);
		}
	);
}
}