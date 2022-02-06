{
﻿
let cinemaWindow = null;
let cinemaCamera = null;
let cinemaOpen = false;
const cinema_enter = [-1423.4061279296875, -215.29371643066406, 46.500423431396484];
const cinema_exit_here = [-1424.0640869140625, -210.75747680664062, 46.500423431396484, 3.9045610427856445];
const cinema_camera_pos = [-1426.763427734375, -230.83377075195312, 26.399110794067383];
const cinema_camera_lookat = [-1426.56396484375, -258.2504577636719, 21.399110794067383];

setInterval(() => {
    if (mp.players.local === null || mp.players.local === undefined || logged === 0) return;

    let player = mp.players.local;
	if(cinemaWindow != null)
	{
		if(mp.gui.cursor.visible == false)
		{
			if(mp.game.ui.isPauseMenuActive() == false)
			{
				mp.gui.cursor.show(true, true);
			}
		}
	}
}, 200);



mp.events.add("Cinema_Open", (toggle) => {
	mp.events.callRemote("Server:Cinema_Open", toggle);
});

mp.events.add("enterCinema", () => {
	mp.game.cam.doScreenFadeOut(500);
	printnametags = false;
	if(cinemaWindow == null) 
	{
		mp.game.cam.doScreenFadeOut(500);
		mp.players.local.setVelocity(0.0, 0.0, 0.0);

		setTimeout(function() {
			mp.players.local.freezePosition(true);
			mp.events.callRemote("requestCinemaScreen");
		}, 700);
	}
});


mp.events.add("showCinemaScreen", (autor, time, url, isadm) => {
	if(cinemaWindow == null) 
	{
		cinemaWindow = mp.browsers.new("package://gtalife/cinema/cinema-screen.html");

		mp.gui.cursor.show(true, true);

		cinemaCamera = mp.cameras.new("default", new mp.Vector3(cinema_camera_pos[0], cinema_camera_pos[1], cinema_camera_pos[2]), new mp.Vector3(0,0,0), 40);
		cinemaCamera.pointAtCoord(cinema_camera_lookat[0], cinema_camera_lookat[1], cinema_camera_lookat[2]); 
		cinemaCamera.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);

		setTimeout(function() {
			mp.game.cam.doScreenFadeIn(1000);
		}, 500);
	}
	
	if(isadm === true)
	{
		cinemaWindow.execute("DisplayMenu(true)");
	}
	
	if(url == "null")
	{
		cinemaWindow.execute('clearCinema()');
	}
	else
	{
		cinemaWindow.execute('setCinema("'+autor+'", '+time+', "'+url+'")');
	}
});


mp.events.add("exitCinema", () => {
	mp.game.cam.doScreenFadeOut(500);
	printnametags = true;
	mp.events.callRemote("exitCinema");
	
	setTimeout(function() {	

		if(cinemaWindow != null) 
		{
			cinemaWindow.destroy();
			cinemaWindow = null;
			mp.gui.cursor.show(false, false);
		}
	
		if(cinemaCamera != null)
		{
			cinemaCamera.setActive(false);
			cinemaCamera.destroy();
			cinemaCamera = null;
			mp.game.cam.renderScriptCams(false, false, 0, true, false);
		}
		
		mp.players.local.freezePosition(false);

		mp.game.cam.doScreenFadeIn(1000);

	}, 500);
});


mp.events.add("addCinemaVideo", (url) => {
	mp.events.callRemote("addCinemaVideo", url);
	
});

}