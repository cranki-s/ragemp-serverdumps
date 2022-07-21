{
//CEF//
var dmvCEF = null;
mp.events.add('showDMVRecords', (date, vehid) => {
	if (!mp.browsers.exists(dmvCEF))
	{
		dmvCEF = mp.browsers.new("package://gtalife/DMVRecords/index.html");
		dmvCEF.execute(`Initialize("${date}");`);
		mp.events.callRemote('LoadDMVRecord', date, vehid);
		mp.gui.cursor.show(true, true);
		mp.game.graphics.notify("Use ~b~F4~w~ to close the record.");
	}
});

mp.keys.bind(0x73, false, function () { // F4 Key
	if (dmvCEF != null && mp.browsers.exists(dmvCEF))
	{
		dmvCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('hideDMVRecord', () => {
	if (dmvCEF != null && mp.browsers.exists(dmvCEF))
	{
		dmvCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('addHistory', (HistoryArray, piece, maxpiece) => {
	if (dmvCEF != null && mp.browsers.exists(dmvCEF))
	{
		dmvCEF.execute(`LoadArrayHistoryPieces(${HistoryArray}, ${piece}, ${maxpiece});`);
	}
});
}