{

mp.events.add("setComponentVariation", (componentId, drawable, texture) => {
	mp.players.local.setComponentVariation(componentId, drawable, texture, 2);
});

mp.events.add("entityStreamIn", syncEntityComponents);
mp.events.addDataHandler("__componentSync", syncEntityComponents);

function syncEntityComponents(entity) {
	if (entity.type === "player" && entity.handle !== 0) {
		if (
			entity.getVariable("__componentSync") == null ||
			entity.getVariable("__componentSync") == undefined ||
			entity.getVariable("__componentSync") == "null" ||
			entity.getVariable("__componentSync") == "undefined" ||
			entity.getVariable("__componentSync") === false ||
			entity.getVariable("__componentSync").charAt(0) == 'u' ||
			entity.getVariable("__componentSync").charAt(0) == 'U' ||
			!JSON.parse(entity.getVariable("__componentSync"))
		)
			return;
			
		let clothes = JSON.parse(entity.getVariable("__componentSync"));
		for (let componentId in clothes) {
			if (clothes.hasOwnProperty(componentId)) {
				entity.setComponentVariation(parseInt(componentId), clothes[componentId].drawable, clothes[componentId].texture, 2);
			}
		}
	}
}

}