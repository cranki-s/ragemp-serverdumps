{
//CEF//
var dispatchCEF = null;

mp.events.add('showDispatch', (callsign, status, location, supervisor, faction, name) => {
	if (!mp.browsers.exists(dispatchCEF))
	{
		dispatchCEF = mp.browsers.new("package://gtalife/DutyRoster/index.html");
		dispatchCEF.execute(`Initialize("${callsign}", "${status}", "${location}", ${supervisor}, ${faction}, "${name}");`);
		mp.events.callRemote('LoadDispatchData');
		mp.gui.cursor.show(true, true);
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the dispatch.");
	}
});

mp.events.add('hideDispatch', () => {
	CloseDispatcher();
});

function CloseDispatcher(){
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		dispatchCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
}

mp.keys.bind(0x73, false, function () { // F4 Key
	CloseDispatcher();
});
mp.keys.bind(0x1B, false, function () { // ESC Key
	CloseDispatcher();
});

mp.events.add('addUnits', (UnitArray, piece, maxpiece, newUnit) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		dispatchCEF.execute(`LoadArrayUnitsPieces(${UnitArray}, ${piece}, ${maxpiece}, ${newUnit});`);
	}
});

mp.events.add('add911', (NineOneOne, piece, maxpiece, newcall) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		dispatchCEF.execute(`LoadArray911Pieces(${NineOneOne}, ${piece} , ${maxpiece}, ${newcall});`);
	}
});

mp.events.add('updateMyUnitDetails', (callsign, status, location, type) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		if(status.toLowerCase() == "code 6" || status.toLowerCase() == "code6" || status.toLowerCase().includes("signal")){
			const position = mp.players.local.position;
			let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
			zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
			streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
			if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
			location = zoneName + ', '+ streetName;
		}
		mp.events.callRemote('UpdateMyUnitDetails', callsign, status, location, type);
	}
});

mp.events.add('getCurrentLocationName', () => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		const position = mp.players.local.position;
		let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
		zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
		streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
		if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
		var loc = zoneName + ', '+ streetName;
		dispatchCEF.execute(`SetUnitLocation("${loc}");`);
	}
});

mp.events.add('getCurrentLocationNameServer', () => {
	const position = mp.players.local.position;
	let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
	zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
	streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
	if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
	var loc = zoneName + ', '+ streetName;
	mp.events.callRemote('GetCurrentLocationNameServer', loc); 
});

mp.events.add('setDutyStatus', (callsign, status) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		mp.events.callRemote('SetDutyStatus', callsign, status); 
	}
});

mp.events.add('respondTo911', (id) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		mp.events.callRemote('RespondTo911', id); 
	}
});

mp.events.add('leaveMyUnit', (callsign) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		mp.events.callRemote('LeaveMyUnit', callsign); 
	}
});

mp.events.add('clearUnit', (callsign) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		mp.events.callRemote('ClearUnit', callsign); 
	}
});

mp.events.add('Update911', (id, responding) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		dispatchCEF.execute(`Update911(${id}, ${responding});`);
	}
});

mp.events.add('UpdateUnit', (callsign, callsign_new, status, location, occupants, x, y, type, remove) => {
	if (dispatchCEF != null && mp.browsers.exists(dispatchCEF))
	{
		//mp.gui.chat.push(`UpdateUnit("${callsign}", "${callsign_new}", "${status}", "${location}", ${occupants}, ${x}, ${y}, ${remove});`);
		dispatchCEF.execute(`UpdateUnit("${callsign}", "${callsign_new}", "${status}", "${location}", ${occupants}, ${x}, ${y}, ${type}, ${remove});`);
	}
});

mp.events.add('CADDebug', (msg) => {
	mp.gui.chat.push(`[DEBUG] ${msg}`);
});

mp.events.add('markNinerOnMap', (x, y) => {
	mp.events.call('markonmap', x, y);
});

mp.events.add('triggerChatBlock', () => {
	mp.gui.chat.activate(false);
	mp.events.call('setCefActive', true);
	mp.gui.cursor.show(true, true);
	DispatchMoveDisabled = true;
});

mp.events.add('revokeChatBlock', () => {
	mp.gui.chat.activate(true);
	mp.events.call('setCefActive', false);
	DispatchMoveDisabled = false;
});

var DispatchMoveDisabled = false;
mp.events.add('render', () => { 

    if(DispatchMoveDisabled === undefined || DispatchMoveDisabled == null) return;

    if(DispatchMoveDisabled) {
		mp.game.controls.disableAllControlActions(0);
		mp.gui.cursor.show(true, true);
    }
});
}