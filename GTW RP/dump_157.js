{
//CEF//
var ticketCEF = null;
var ticketStaffCEF = null;
var isTicketAdmin = false;
mp.events.add('Ticketsystem::ShowTicketSystem', (type) => {
	if (ticketCEF == null && !mp.browsers.exists(ticketCEF))
	{
		ticketCEF = mp.browsers.new("package://gtalife/Ticketsystem/index.html");
		ticketCEF.execute(`openTicketType('${type}');`);
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the interface.");	
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('Ticketsystem::ShowTicketSystemStaffInitialize', (admin) => {
	if (ticketStaffCEF == null && !mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF = mp.browsers.new("package://gtalife/Ticketsystem/indexStaff.html");
		isTicketAdmin = admin;
		if(typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.staffTickets !== 'undefined' && mp.storage.data.staffTickets !== null)
			ticketStaffCEF.execute(`useTicketInterface(${mp.storage.data.staffTickets}, ${isTicketAdmin});`);
	}
});

mp.events.add('Ticketsystem::ShowTicketSystemStaff', (type) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`ShowTicketSystemStaff(${isTicketAdmin}, '${type}');`);
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the interface.");
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('hideTickets', () => {
	CloseTicketsystem();
});

mp.events.add('sendTicket', (type, text) => {
	mp.events.callRemote('Ticketsystem::NewTicket', type, text);
	CloseTicketsystem();
});

mp.events.add('Ticketsystem::Setting', (status) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`useTicketInterface(${status}, ${isTicketAdmin});`);
	}
});

/* Admin */
mp.events.add('loadTickets', () => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		mp.events.callRemote('Ticketsystem::LoadTickets');
	}
});

mp.events.add('Ticketsystem::addTickets', (TicketArray, piece, maxpiece) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`LoadArrayTicketPieces(${TicketArray}, ${piece} , ${maxpiece});`);
	}
});

mp.events.add('Ticketsystem::addNewTicket', (Array, toggleAdmin, toggleTester) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`AddNewTicket(${Array}, ${toggleAdmin}, ${toggleTester});`);
	}
});

mp.events.add('Ticketsystem::removeTicket', (id, action, name, toggleAdmin, toggleTester) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`RemoveTicket(${id}, ${action}, '${name}', ${toggleAdmin}, ${toggleTester});`);
	}
});

mp.events.add('Ticketsystem::removeTicketPlayer', (id) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`RemoveTicketPlayer(${id});`);
	}
});

mp.events.add('Ticketsystem::removeTicketPlayerType', (id, type) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`RemoveTicketPlayerType(${id}, ${type});`);
	}
});

mp.events.add('Ticketsystem::updateTicketPlayer', (id, name) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`UpdateTicketPlayer(${id}, '${name}');`);
	}
});

mp.events.add('Ticketsystem::updateTicket', (id, action, name, toggleAdmin, toggleTester) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`UpdateTicket(${id}, ${action}, '${name}', ${toggleAdmin}, ${toggleTester});`);
	}
});

mp.events.add('Ticketsystem::removeAllReports', (name, toggleAdmin) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`RemoveAllReports('${name}', ${toggleAdmin});`);
	}
});

mp.events.add('sendTicketToReport', (id) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
		mp.events.callRemote('Ticketsystem::SendTicketToReport', id);
}); // DONE

mp.events.add('sendReportToTicket', (id) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
		mp.events.callRemote('Ticketsystem::SendReportToTicket', id);
}); //DONE

mp.events.add('sendTicketReply', (id, reply) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
		mp.events.callRemote('Ticketsystem::SendTicketReply', id, reply);
}); //DONE

mp.events.add('trashReport', (id, reply) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
		mp.events.callRemote('Ticketsystem::TrashReport', id, reply);
}); //Done

mp.events.add('acceptReport', (id) => {
	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
		mp.events.callRemote('Ticketsystem::AcceptReport', id);
}); //Done
/* End Admin */

function CloseTicketsystem(){
	if (ticketCEF != null && mp.browsers.exists(ticketCEF))
	{
		ticketCEF.destroy();
		ticketCEF = null;
		mp.gui.cursor.show(false, false);
		TicketsMoveDisabled = false;
	}

	if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`HideStaffTickets();`);
		mp.gui.cursor.show(false, false);
		TicketsMoveDisabled = false;
	}
}

mp.keys.bind(0x73, false, function () { // F4 Key
	CloseTicketsystem();
});
mp.keys.bind(0x1B, false, function () { // ESC Key
	CloseTicketsystem();
});

mp.events.add('triggerChatBlock_Tickets', () => {
	mp.gui.chat.activate(false);
	mp.events.call('setCefActive', true);
	mp.gui.cursor.show(true, true);
	TicketsMoveDisabled = true;
});

mp.events.add('revokeChatBlock_Tickets', () => {
	mp.gui.chat.activate(true);
	mp.events.call('setCefActive', false);
	TicketsMoveDisabled = false;
});

var TicketsMoveDisabled = false;
mp.events.add('render', () => { 

    if(TicketsMoveDisabled === undefined || TicketsMoveDisabled == null) return;

    if(TicketsMoveDisabled) {
		mp.game.controls.disableAllControlActions(0);
		mp.gui.cursor.show(true, true);
    }
});

mp.events.add("setDarkMode", (value) => {
    if (ticketStaffCEF != null && mp.browsers.exists(ticketStaffCEF))
	{
		ticketStaffCEF.execute(`SetDarkMode(${value});`);
	}
});
}