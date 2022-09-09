{
//Событие отправки кастомных уведомлений игроку
//тип, расположение, сообщение, время
mp.events.add('notify', (type, layout, msg, time) => {
    if (global.loggedin) mp.gui.execute(`notify(${type},${layout},'${msg}',${time})`);
    else mp.events.call('authNotify', type, layout, msg, time)
});

global.INTERACTIONCHECK = false;
mp.events.add('playerInteractionCheck', function (state){
	global.INTERACTIONCHECK = state;
});
mp.events.add('render', () => {
    if (global.INTERACTIONCHECK === true && !global.menuOpened) {
        mp.gui.execute(`HUD.hint=true`);
    } 
    else if (!global.INTERACTIONCHECK === true || global.menuOpened) {
        mp.gui.execute(`HUD.hint=false`);
    }
});
}