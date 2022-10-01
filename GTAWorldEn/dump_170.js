{
var destinationBlip = null;
var destinationMarker = null;
var destinationCircle = null;


mp.events.add('ClientEvent_ActivateDestinationMapInfo', (location) => {
    destinationBlip = mp.blips.new(584, location,
    {
        name: "PILOT | Destination",
        scale: 1,
        color: 30,
        shortRange: false,
    });

    mp.game.ui.setNewWaypoint(location.x, location.y);
	
	destinationMarker = mp.markers.new(6, location, 20,
	{
	    direction: new mp.Vector3(0, 0, 0),
		rotation: new mp.Vector3(0, 0, 0),
		color: [68, 196, 255, 255],
		visible: true,
		dimension: 0
	});
});

mp.events.add('ClientEvent_DeleteDestinationMapInfo', () => {
    if(mp.blips.exists(destinationBlip)) destinationBlip.destroy();
	if(mp.markers.exists(destinationMarker)) destinationMarker.destroy();
});

mp.events.add('ClientEvent_DeleteNextWaypointCircle', () => {
    if(mp.colshapes.exists(destinationCircle)) destinationCircle.destroy();
});
}