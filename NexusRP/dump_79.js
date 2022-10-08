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
    global.NexusEvent.callRemote('Global.GetTime');
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
//             NexusEvent.callRemote("timer.error");
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

}9.4537, 60.64), Angle: 121, cameraRotate: 145, label: "Учитель рисования" }, 
   // { Name: 'SepGeo', Hash: 0x0B34D6F5, Pos: new mp.Vector3(-1627.58, 205.81, 60.71), Angle: 107, cameraRotate: 145, label: "Учитель геологии" },
   // { Name: 'SepChemistry', Hash: 0x8CCE790F, Pos: new mp.Vector3(-1625.79, 201.78, 60.63), Angle: 110, cameraRotate: 145, label: "Учитель химии" },


    { Name: 'Diving1', Hash: 0xAB0A7155, Pos: new mp.Vector3(1696.005, 42.93885, 161.76727), Angle: 95, cameraRotate: 135.0, label: "" }, 
    { Name: 'Diving2', Hash: 0xAB0A7155, Pos: new mp.Vector3(1299.1622, 4215.9937, 33.90), Angle: -7, cameraRotate: 135.0, label: "" }, 


    { Name: 'Demorgan', Hash: 0xD768B228, Pos: new mp.Vector3(1723.8099, 2505.4304, 45.564896), Angle: 55, cameraRotate: -45, label: "Надзиратель" }, 
    
];

var Peds = [];

//setTimeout(function () {
    pedlist.forEach(ped => {
        Peds[ped.Name] = {
            uid : ped.Name,
            entity : mp.peds.new(ped.Hash, ped.Pos, ped.Angle, -1),
            extra_rotate : ped.cameraRotate,
            labelText : global.GetText(ped.label),
            position : ped.Pos,
            labelObject : createLabel(global.GetText(ped.label), ped.Pos),
            colShape : null,            
            createShape() { 
                this.removeShape();
                this.colShape = mp.colshapes.newSphere(this.position.x, this.position.y, this.position.z, 1); 
                this.colShape.interact = ped.Name; 
                this.colShape.in = false;
            },
            removeShape() { 
                if(this.colShape!=null){
                    if(this.colShape.in){
                        mp.events.call("PressE", false);
                        mp.players.local.npcInteract = null;
                    }
                    this.colShape.destroy(); 
                }
                this.colShape = null;
            },
            setClothes(componentNumber, drawable, texture) {
                this.entity.setComponentVariation(componentNumber, drawable, texture, 0);
            }
        }
    });
   // }, 5000);



mp.events.add('entityStreamIn', function (entity) {
    if(entity.santa){
        entity.setComponentVariation(1, 8, 0, 0);
        entity.setComponentVariation(8, 15, 0, 0);
        entity.setComponentVariation(11, 51, 0, 0);
        entity.setComponentVariation(4, 58, 6, 0);
        entity.setComponentVariation(6, 87, 0, 0);
    }
});

function createLabel(label, position){
    return label=="" ? null : mp.labels.new(label, position.add(new mp.Vector3(0, 0, 0.9)),
    {
        los: false,
        font: 0,
        //color: [57,179,172,255],
        drawDistance: 5,
    })
}

mp.events.add('playerEnterColshape', (shape)=>{
        if(shape.interact!=null){
            shape.in = true;
            mp.events.call("PressE", true);
            mp.players.local.npcInteract = shape.interact;
        }
});

mp.events.add('playerExitColshape', (shape)=>{
    if(shape.interact!=null){
        shape.in = false;
        mp.events.call("PressE", false);
        mp.players.local.npcInteract = null;
    }
});



let hiding;
let handCamera;
let hidedPlayers = [];
let hidedLabels =[];
let oldpos;
function toRadian(x){
    return Math.PI*x/180;
}

mp.events.add('NPC.ColShape.Local', (npcName, flag)=>{
    if(Peds[npcName]!=null){
        if(flag) Peds[npcName].createShape();
            else Peds[npcName].removeShape();

    }
});

mp.events.add('NPC.cameraOn', (pedName, transitionTime = 0) => {
    handCamera = mp.cameras.new('default', new mp.Vector3(0,  0,  0), new mp.Vector3(0,0,0), 40);
    handCamera.setActive(true);
    handCamera.pointAtPedBone(Peds[pedName].entity.handle, 31086, 0, 0, 0, true);
    handCamera.setCoord(Peds[pedName].entity.getCoords(true).x + (Math.sin(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).y+(Math.cos(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).z+0.5);
    mp.game.cam.renderScriptCams(true, transitionTime>0, transitionTime, true, false);
    if(Peds[pedName].labelObject!=null){
        Peds[pedName].labelObject.destroy();
        Peds[pedName].labelObject=null;
        hidedLabels.push(pedName);
    }
    hiding = startHide(Peds[pedName].entity.getCoords(true));
    ///////////////////
    oldpos = mp.players.local.position;
    mp.players.local.position = new mp.Vector3(Peds[pedName].entity.getCoords(true).x + (Math.sin(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).y+(Math.cos(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).z+0.5);
});

mp.events.add('NPC.cameraOff', (transitionTime = 0)=>{
    if(hiding!=null){
    clearInterval(hiding);
    hiding = null;
    }
    if(handCamera!=null){
        mp.game.cam.renderScriptCams(false, transitionTime>0, transitionTime, true, true);
        handCamera.destroy();
        handCamera = null;
    }
    
    if(oldpos!=null){
        mp.players.local.position = oldpos;
        oldpos = null;
    }
    
    setTimeout(()=>{
        while(hidedLabels.length>0){
            var pedName = hidedLabels.pop();
            Peds[pedName].labelObject = createLabel(Peds[pedName].labelText, Peds[pedName].position);
        }

        while(hidedPlayers.length>0)hidedPlayers.pop().setAlpha(255); 
    }, transitionTime/2);
});


function startHide(pos){
    mp.players.local.setAlpha(0);
    hidedPlayers.push(mp.players.local);
    return setInterval(function (vector){
        mp.players.forEachInStreamRange(player => {
            if(vector.subtract(player.position).length()<10){
                if(player.getAlpha()>0)
                {
                player.setAlpha(0);
                hidedPlayers.push(player);
                }
            }else if(hidedPlayers.includes(player)){
                hidedPlayers.splice(hidedPlayers.indexOf(player), 1);
            }
        });
    }, 1000, pos);
}







}