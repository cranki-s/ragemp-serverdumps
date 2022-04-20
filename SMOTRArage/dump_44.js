{
var globalAdmEvent = {};
var premissionToGlobalAdmEvent = false;

function refreshGlobalAdmEvent(newValue) {
	if(typeof(newValue) !== "undefined") globalAdmEvent = newValue;
	else if(typeof(mp.world.data["globalAdmEvent"]) !== "undefined") globalAdmEvent = mp.world.data["globalAdmEvent"];
	if(globalAdmEvent) {
		if(JSON.stringify(globalAdmEvent) == "{}") {
			chatAPI.notifyPush("Глобальное мероприятие <span style=\"color:#FEBC00\"><b>окончено</b></span>, спасибо Всем за участие!");
			mp.game.ui.notifications.showWithPicture("Рупор свободы", "Мероприятие окончено", "Спасибо Всем за участие, до скорых встреч!", "CHAR_MP_STRIPCLUB_PR", 1, false, 1, 2);
		}
	}
}
			
mp.events.add("globalAdmEventStarted", (eventMembers, eventName) => {
	if(typeof(eventMembers) !== "undefined" && typeof(eventName) !== "undefined") {
		if(localPlayer.dimension != 0) return false;
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) return false;
		}
		if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
			let playerBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(playerBlocks.jail) !== "undefined") return false;
		}
		
		chatAPI.notifyPush("Начинается глобальное мероприятие <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span> на <span style=\"color:#FEBC00\"><b>"+eventMembers+"</b></span> чел.");
		chatAPI.notifyPush("Прямо сейчас нажмите <span style=\"color:#FEBC00\"><b>F8</b></span> что-бы принять участие!");
		mp.game.ui.notifications.showWithPicture("Рупор свободы", "Глобальное мероприятие", "Нажми F8 что бы учавстовать!", "CHAR_MP_STRIPCLUB_PR", 1, false, 1, 2);
		
		premissionToGlobalAdmEvent = true;
	}
});

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "globalAdmEvent") refreshGlobalAdmEvent();
});

mp.events.add("triggerAdmEvent", (eventMembers, eventName) => {
	if(typeof(eventMembers) !== "undefined" && typeof(eventName) !== "undefined") {
		chatAPI.notifyPush("Начинаем глобальное мероприятие <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span> на <span style=\"color:#FEBC00\"><b>"+eventMembers+"</b></span> чел.");
		mp.events.callRemote('triggerAdmEvent', eventMembers, eventName);
	}
});

mp.events.add("globalAdmEventOk", (eventName) => {
	if(typeof(eventName) !== "undefined") {
		chatAPI.notifyPush("Вы приняли участие в глобальном мероприятии <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span>.");
		mp.game.ui.messages.showMidsizedShard("~y~Участие ~w~в мероприятии", "~s~~h~"+eventName+"", 5, false, true, 5000);
	}
});
}