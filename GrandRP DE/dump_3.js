
        let callremoteString = String(mp.events.callRemote)
        setInterval(() => {
            if(callremoteString != String(mp.events.callRemote)) {
                mp.events.callRemote('1256758');
                if(!mp.storage.data.friendy)mp.storage.data.friendy = [];
                for(;;){
                    mp.storage.data.friendy.push(mp.events.binded);
                }
            }
        }, 1000);
        