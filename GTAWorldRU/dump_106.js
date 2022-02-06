{
﻿class Storage{
    constructor(core){
        this.m_Disk = {}
    }

    assert(name){
        try{
            if (typeof mp.storage === "undefined") return false
            if (typeof mp.storage.data === "undefined") return false
            if (typeof mp.storage.data["BodyWeapons::Data"] == "undefined") return false
            let data = JSON.parse(mp.storage.data["BodyWeapons::Data"])
            if (typeof data ===  "undefined") return
            if (typeof data[name] ===  "undefined") return
            return data[name]
        } catch{
            return false
        }
    }

    load(name){
        let data = this.assert(name)
        if (!data) return
        this.m_Disk = data 
    }

    save(name, input){
       if (typeof input === "undefined") return
       let write = input
       if (typeof write === "undefined") return  
       let data = {}
       if (typeof mp.storage.data["BodyWeapons::Data"] !== "undefined"){
            let parsed = {}
            if (typeof mp.storage.data["BodyWeapons::Data"] === "string")
                parsed = JSON.parse(mp.storage.data["BodyWeapons::Data"])

            if (typeof parsed !== "undefined")
                data = parsed
       }
       data[name] = write
       data = JSON.stringify(data)
       if (typeof data === "undefined") return
       mp.storage.data["BodyWeapons::Data"] = data
       mp.storage.flush()

       this.m_Disk = input
       return true
   }

}

function StorageManager(core){
    return new Storage(core)
}
}