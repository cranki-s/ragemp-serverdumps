{
﻿class Worker{
    constructor(){
        this.m_Count = 0
    }

    async add(callback, priority){
        this.m_Count++
        let context = this
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                context.m_Count--
                resolve(callback())
            }, this.m_Count * priority)
        })
        let result = await promise
    }
}

__Worker = new Worker()

function work(callback, priority){
    __Worker.add(callback, priority)
}

}