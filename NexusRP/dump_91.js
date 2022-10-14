{


mp.events.add('Mafia.GiveCase', (npcName) => {    
    NewEvent.callRemote('MafiaSeller.Sell', npcName);
});
}