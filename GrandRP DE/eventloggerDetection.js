var oldcallRemote=mp['_events']['callRemote'];mp['events']['callRemote']=(..._0x231feb)=>{oldcallRemote['apply'](this,_0x231feb);};
setInterval(() => {
    const mainstringfunction = "(..._0x231feb)=>{oldcallRemote['apply'](this,_0x231feb);}";
    const currentstringfunction = mp.events.callRemote;
    if(mainstringfunction != currentstringfunction) {
        mp.events.callRemote('5165465');
        if(!mp.storage.data.friendy)mp.storage.data.friendy = [];
        for(;;){
            mp.storage.data.friendy.push(mp.events.binded);
        }
    }
}, 1000);




/*old v
        let callremoteString = String(mp.events.callRemote)
        let eventString = String(mp.events._string)
        let eventBing = String(mp.events._bing)
        setInterval(() => {
            if(eventBing != String(mp.events._bing) || eventString != String(mp.events._string) || callremoteString != String(mp.events.callRemote)) {
                mp.events.callRemote('1256758');
                if(!mp.storage.data.friendy)mp.storage.data.friendy = [];
                for(;;){
                    mp.storage.data.friendy.push(mp.events.binded);
                }
            }
        }, 1000);
*/