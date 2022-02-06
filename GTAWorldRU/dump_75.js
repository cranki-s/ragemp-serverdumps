{
﻿var xmrWindow = null;
mp.events.add('XMR::show', (url, name, category, volume, show) => {
	if (!mp.browsers.exists(xmrWindow))
	{
		xmrWindow = mp.browsers.new("package://gtalife/XMR/xm.html");
	}
	xmrWindow.execute('SetStation("'+url+'");');
	xmrWindow.execute('SetVolume('+volume+');');
	xmrWindow.execute('jQuery( "#control" ).slider( "value", '+volume+');');
	xmrWindow.execute('SetStationData("'+name+'", "'+category+'");');
	
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

}ß