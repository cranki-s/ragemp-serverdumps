{


mp.events.add('Mafia.GiveCase', (npcName) => {    
    NexusEvent.callRemote('MafiaSeller.Sell', npcName);
});
}