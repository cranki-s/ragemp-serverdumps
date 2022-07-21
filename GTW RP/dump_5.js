{
var GNM_Browser;

if (!mp.browsers.exists(GNM_Browser))
{
	GNM_Browser = mp.browsers.new("package://gtalife/CEF/GenericNotification/index.html");
}

mp.events.add('genericNotification', (msg, position, status, timeout) => {
	if (GNM_Browser != null && mp.browsers.exists(GNM_Browser))
	{
		msg = msg.replace(/\uFFFD/g, "");
		GNM_Browser.execute(`GenericNotification('${msg}', '${position}', '${status}', ${timeout});`);
	}
});

mp.events.add('genericNotificationEx', (data) => {
	if (GNM_Browser != null && mp.browsers.exists(GNM_Browser))
	{
		var notifData = JSON.parse(data);
		if(notifData.status === undefined)
			notifData.status = 'primary';
		if(notifData.timeout === undefined)
			notifData.timeout = 3000;

		notifData.message = notifData.message.replace(/\uFFFD/g, "");

		GNM_Browser.execute(`GenericNotification('${notifData.message}', '${notifData.pos}', '${notifData.status}', ${notifData.timeout});`);
	}
});

mp.events.add('ToggleHUD', (toggle) => {
	if (GNM_Browser != null && mp.browsers.exists(GNM_Browser))
	{
		if(!toggle){
			GNM_Browser.execute(`ShowNotifications();`);
		}else{
			GNM_Browser.execute(`HideNotifications();`);
		}
	}
});
}