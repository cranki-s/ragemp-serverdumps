{
let xmrWindow = null;
mp.events.add('XMR::show', (url, name, category, volume, show, id) => {
    if (!mp.browsers.exists(xmrWindow))
    {
        xmrWindow = mp.browsers.new("package://gtalife/XMRadio/index.html");
    }
    xmrWindow.execute('SetStation("'+url+'");');
    xmrWindow.execute('SetVolume('+volume+');');
    xmrWindow.execute('$("#control").slider( "value", '+volume+');');
    xmrWindow.execute('SetStationData("'+name+'", "'+category+'");');
    xmrWindow.execute(`SetCurrentStation(${id})`)

    mp.events.callRemote("XMR::GetStations");

    if(show)
        xmrWindow.execute(`Show();`);
});

mp.events.add('XMR::close', () => {
    if(xmrWindow != null && mp.browsers.exists(xmrWindow))
    {
        xmrWindow.destroy();
        xmrWindow = null;
    }
});

mp.events.add('XMR::visual', (status) => {
    if(xmrWindow != null && mp.browsers.exists(xmrWindow))
    {
        if(status)
            xmrWindow.execute(`Show();`);
        else
            xmrWindow.execute(`Hide();`);
    }
});

mp.events.add('XMR::updateVolume', (value) => {
    mp.events.callRemote('XMR::UpdateVolume', parseInt(value));
});

mp.events.add('XMR::LoadStations', (id, category, name) => {
   if(xmrWindow != null && mp.browsers.exists(xmrWindow)) {
       xmrWindow.execute(`AddStation(${id}, ${category}, ${name})`);
   }
});


mp.events.add('XMR::addXMR', (xmrArray, piece, maxpiece) => {
	if (xmrWindow != null && mp.browsers.exists(xmrWindow))
	{
		xmrWindow.execute(`LoadArrayXMR(${xmrArray}, ${piece} , ${maxpiece});`);
	}
});

mp.events.add('XMR::ChangeStation', (id) => {
    if(xmrWindow != null && mp.browsers.exists(xmrWindow)) {
        mp.events.callRemote('XMR::ChangeStation', id);
    }
});

mp.events.add('XMR::triggerChatBlock', () => {
    mp.gui.chat.activate(false);
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
});

mp.events.add('XMR::revokeChatBlock', () => {
    mp.gui.chat.activate(true);
    mp.events.call('setCefActive', false);
});

}