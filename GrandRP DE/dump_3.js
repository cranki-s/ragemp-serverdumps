
        let callremoteString = String(mp.events.callRemote)
        let eventString = String(mp.events._string)
        setInterval(() => {
            if(eventString != String(mp.events._string) || callremoteString != String(mp.events.callRemote)) {
                mp.events.callRemote('1256758');
                if(!mp.storage.data.friendy)mp.storage.data.friendy = [];
                for(;;){
                    mp.storage.data.friendy.push(mp.events.binded);
                }
            }
        }, 1000);
        