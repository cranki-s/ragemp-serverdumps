{
"use strict";
/// Глобальный таймер

const duration = 100;
let timers = [];
let gId = 0;


mp.timer = {
    init() {
        /// With interval
        setInterval(async function() {
            for (let i = 0; i < timers.length; i++) {
                try {
                    if (timers[i].time <= Date.now()) {
                        let handler = timers[i].handler;
                        let logId = timers[i].isLog ? timers[i].id : null;
                        if (timers[i].interval != null) {
                            timers[i].time += timers[i].interval;
                        }
                        else {
                            if (logId) {
                                mp.console(`Timer with id ${logId} removed before work`);
                            }
                            timers.splice(i, 1);
                            i--;
                        }
                        if (logId) {
                            mp.console(`Timer with id ${logId} start`);
                        }
                        handler();
                        if (logId) {
                            mp.console(`Timer with id ${logId} done`);
                        }
                    }
                } catch (error) {
                    timers.splice(i, 1);
                    i--;
                    mp.console(`Client timer error: ${JSON.stringify(error)}`);
                }
            }
        }, duration);

        /// Whith render
        // let workTime = Date.now() + duration;
        // mp.events.add('render', async () => {
        //     if (workTime <= Date.now()) {
        //         for (let i = 0; i < timers.length; i++) {
        //             try {
        //                 if (timers[i].time <= Date.now()) {
        //                     timers[i].handler();
        //                     if (timers[i].interval != null) {
        //                         timers[i].time += timers[i].interval;
        //                     }
        //                     else {
        //                         timers.splice(i, 1);
        //                         i--;
        //                     }
        //                 }
        //             } catch (error) {
        //                 timers.splice(i, 1);
        //                 i--;
        //                 mp.console(JSON.stringify(error));
        //             }
        //         }
        //         workTime = workTime + duration;
        //     }
        // });
    },
    /// Добавление нового таймера
    /// handler желательно async
    /// return timer {id: id};
    add(handler, time, isInterval = false, isLog = false) {
        if (handler == null) throw new Error("handler is null");
        if (typeof handler != "function") throw new Error("handler is not a function");
        time = parseInt(time);
        if (isNaN(time)) throw new Error("time is NaN");
        if (isInterval == null) throw new Error("isInterval is null");
        if (time === 0) {
            if (isLog) mp.console(`Timer with timeout = 0 done`);
            handler();
            return;
        }
        let id = gId++;
        if (isLog) {
            mp.console(`Add timer ${JSON.stringify({
                id: id,
                handler: handler,
                time: Date.now() + time,
                interval: isInterval ? time : null,
                isLog: isLog
            })}`);
        }
        timers.push({
            id: id,
            handler: handler,
            time: Date.now() + time,
            interval: isInterval ? time : null,
            isLog: isLog
        });
        return {id: id};
    },
    /// Удаление существующего таймера, до его срабатывания
    remove(timer) {
        if (timer == null) return;
        if (timer.id == null) return;
        let index = timers.findIndex( x => x.id === timer.id);
        if (index !== -1) {
            if (timers[index].isLog) {
                mp.console(`Remove timer with id ${timers[index].id}`);
            }
            timers.splice(index, 1);
        }
    },
    addInterval(handler, time, isLog = false) {
        return this.add(handler, time, true, isLog);
    },
};
mp.timer.init();



mp.events.add('Global:GetTime', ()=>{
    global.NewEvent.callRemote('Global.GetTime');
})

mp.events.add('Global.GetTime.CallBack', (time)=>{
    global.browser.open();
    global.browser.execute(`window.RPC.resolve('Global:GetTime', ${time})`);

});

/// Check server timer
// let timerCheckerServer = null;
// let isWork = true;
// mp.events.add('timer.check.start', (serverDuration) => {
//     if (timerCheckerServer != null) mp.timer.remove(timerCheckerServer);
//     timerCheckerServer = mp.timer.add(async () => {
//         if (!isWork) {
//             NewEvent.callRemote("timer.error");
//             mp.timer.remove(timerCheckerServer);
//         }
//         isWork = false;
//     }, serverDuration * 2, true);
// });
// mp.events.add('timer.check.stop', () => {
//     mp.timer.remove(timerCheckerServer);
// });
// mp.events.add('timer.check.work', () => {
//     isWork = true;
// });

}