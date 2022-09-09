{


let fishing = false;
let browser = null;

mp.events.add('client::fishstart', () => {
	
    fishing = true;
	browser = mp.browsers.new('http://package/browser/modules/Jobs/Fish/fish.html');
	
});

mp.events.add('client::fishtoserver', () => {
	
	mp.events.callRemote('server::givefish');
	mp.events.call('client::stopfish');
	
});

mp.events.add('client::stopfish', () => {
	
	if (browser)
	{
		browser.destroy();
		browser = null;
	}
	
    fishing = false;

});


}