{
global.container = mp.browsers.new('package://cef/System/Containers/index.html');
global.container.active = false;

mp.events.add("openContainerMenu", (contID, Type, Name, Price, MinBet, betPlayerName) => {
  if (!loggedin || chatActive || editing || cuffed) return;
  global.container.active = true;
  global.menuOpen();
  global.container.execute(`container.active=true`);
  global.container.execute(`container.addInfoContainer('${contID}','${Type}','${Name}','${Price}','${MinBet}','${betPlayerName}');`);
});

mp.events.add("openPrizMenu", (prizName, SellPrice, contID, Type, Name, Price, MinBet, betPlayerName) => {
  if (!loggedin || chatActive || editing || cuffed) return;
  global.container.active = true;
  global.menuOpen();
  global.container.execute(`container.active=true`);
  global.container.execute(`container.addWin('${prizName}','${SellPrice}');`);
  global.container.execute(`container.addInfoContainer('${contID}','${Type}','${Name}','${Price}','${MinBet}','${betPlayerName}');`);
});

mp.events.add("openMenuContainerOpener", (contID, Type, Name, Price, MinBet, betPlayerName) => {
  if (!loggedin || chatActive || editing || cuffed) return;
  global.container.active = true;
  global.menuOpen();
  global.container.execute(`container.active=true`);
  global.container.execute(`container.addInfoWinner('${contID}','${Type}','${Name}','${Price}','${MinBet}','${betPlayerName}');`);
});

mp.events.add("closeContainer", () => {
  if(global.container) {
    global.menuClose();
    global.container.active = false;
  }
});

mp.events.add("ReadBet", () => {
  mp.events.callRemote('ReadBet');
});

mp.events.add("SellPriz", () => {
  mp.events.callRemote('SellPriz');
});

mp.events.add("GetPriz", () => {
  mp.events.callRemote('GetPriz');
});

mp.events.add("SetMaxBet", (data) => {
  global.container.execute(`container.putInput='${data}'`);
});

mp.events.add("setNewBet", (bet) => {
  mp.events.callRemote('setNewBet', bet);
});

mp.events.add("OpenContainer", () => {
  mp.events.callRemote('OpenContainer');
});
}