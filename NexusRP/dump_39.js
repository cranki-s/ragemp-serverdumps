{
﻿let nn = global.ConstrolsBrowser;
let content =
{
	employeesTop: [
		// {
		// 	id: 1,
		// 	name: 'Mrs_Hadson',
		// 	announcementCount: 1,
		// },
		// {
		// 	id: 2,
		// 	name: 'EDMUNDAS_JANCAUSKASWENZJAD',
		// 	announcementCount: 21231,
		// },
		// {
		// 	id: 3,
		// 	name: '3',
		// 	announcementCount: 3,
		// },
		// {
		// 	id: 4,
		// 	name: '4',
		// 	announcementCount: 4,
		// },
		// {
		// 	id: 4,
		// 	name: '4',
		// 	announcementCount: 4,
		// },
		// {
		// 	id: 4,
		// 	name: '4',
		// 	announcementCount: 4,
		// },
		// {
		// 	id: 4,
		// 	name: '4',
		// 	announcementCount: 4,
		// },
		// {
		// 	id: 4,
		// 	name: '4',
		// 	announcementCount: 4,
		// },
	],
	weekEdited: 0,
	allEdited: 0,
	announcementPrice: 1000,
	employeesOnline: 0,
	employersEditors: 0,
}
let rawAnnouncements = [];//обьявления в списке
let redactionAnnouncements = [];// обьвление в меню редакции
let options= { 
	darkTheme:false, 
	notificationEnabled:false, 
	redactionOpened:false, 
}

mp.keys.bind(Keys.VK_F4, false, function () { // E key	
	Nexus.callRemote('Weazel:OpenAdvertPad')
});
mp.events.add('Weazel:CloseApp',(announcement)=>{
	if (nn != null) {
		if(announcement)Nexus.callRemote('Weazel:GetBack',announcement);
		mp.gui.cursor.visible = false;
		global.menuOpened = false;
		nn.execute(`closeInterface()`);

	}
});
mp.events.add('Weazel:ClearAll',()=>{
	rawAnnouncements = [];
	redactionAnnouncements = [];
})
mp.events.add('Weazel:OpenAdvertPad',(fraconline)=> { // E key	
		if (!global.loggedin || global.chatActive || editing || global.menuCheck() || mp.game.ui.isPauseMenuActive() || cuffed || global.localplayer.getVariable('InDeath') == true || localplayer.getVariable('INVISIBLE') == true) return;
		content.employeesOnline = fraconline;		
		nn.execute(`window.locale ='${global.Language}'`)
		nn.execute(`openInterface('weazel')`);
		nn.execute(`controls.setContent(${JSON.stringify(content)})`);
		nn.execute(`controls.setOptions(${JSON.stringify(options)})`);
		mp.gui.cursor.visible = true;
    	global.menuOpened = true;
});
mp.events.add('Weazel:AddAdvert', (newadvert) => {//добавление обьявления в планшет
	if(options.notificationEnabled) mp.events.call('notify', 2, 9, global.GetText("Поступило новое объявление в редакцию"), 6000);
})
mp.events.add('Weazel:UpdatePad', (redactions, adverts) => {
	if (nn != null) {
		nn.execute(`controls.setRedactionAnnouncements(${redactions})`);
		nn.execute(`controls.setRawAnnouncements(${adverts})`);
	}
})



mp.events.add('Weazel:EditAnnouncement', (announcementID) => {//кнопка редактирования обьявления
	Nexus.callRemote('Weazel:EditAnnouncement',announcementID);
})
mp.events.add('Weazel:EditAnnouncementCallBack',(announcement)=>{// возврат с сервера
	if (nn != null)nn.execute(`controls.editAnnouncementCallback(${announcement})`);
});
mp.events.add('Weazel:RejectAnnouncement', (announcement) => {// отклонение обьявления
	announcement = JSON.parse(announcement);
	Nexus.callRemote('Weazel:RejectAnnouncement',+announcement.id)
});
mp.events.add('Weazel:RemoveAnnouncemet', (announcementID) => {// Врзварт обьявления в список из списка редакции
	Nexus.callRemote('Weazel:RemoveAnnouncemet',announcementID);
})

mp.events.add('Weazel:GetBack', (announcement) => {// возврат обьявления в общий список
	Nexus.callRemote('Weazel:GetBack',announcement);
});
mp.events.add('Weazel:SendAnnouncement', (announcement, category, content) => { //отправка обьявления в чат
	announcement = JSON.parse(announcement);
	Nexus.callRemote('Weazel:SendAnnouncement',announcement.id,content,category);
});
mp.events.add('Weazel:ChangeTheme', (value) => {
	options.darkTheme = value;
});
mp.events.add('Weazel:ChangeNotification', (value) => {
	options.notificationEnabled = value;
});
mp.events.add('Weazel:ChangeRedaction', (value) => {
	Nexus.callRemote('Weazel:ChangeRedaction',value);
});
mp.events.add('Weazel:ChangeRedactionCallBack', (value) => {
	options.redactionOpened = value;
	if (nn != null) nn.execute(`controls.setOptions(${JSON.stringify(options)})`);
});


}