{


mp.events.add('Mafia.GiveCase', (npcName) => {    
    Nexus.callRemote('MafiaSeller.Sell', npcName);
});
}