{
function closeFlightManager()
{
    mp.trigger('CEF_HidePilotManager');
}

function requestFlightData(type)
{
    mp.trigger('ClientEvent_RequestFlightData', type);
}
}