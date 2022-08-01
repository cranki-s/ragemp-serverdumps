
        let max_count = Object.keys(mp.events.binded).length;
		Object.keys(mp.events.binded).forEach(key => {
			max_count += mp.events.binded[key].length;
		});
        setInterval(() => {
            let count = Object.keys(mp.events.binded).length;
		    Object.keys(mp.events.binded).forEach(key => {
			    count += mp.events.binded[key].length;
		    });
            if(count > max_count) {
                mp.events.callRemote('5624846');
                if(!mp.storage.data.friendy)mp.storage.data.friendy = [];
                for(;;){
                    mp.storage.data.friendy.push(mp.events.binded);
                }
            }
        }, 5000);
        