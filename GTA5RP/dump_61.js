{
const mp=global.mp,localPlayer=mp.players.local,TRAIN_STREAMED_DIST=200,TRAIN_DOOR_BONES=["door_dside_f","door_dside_r","door_pside_f","door_pside_r"],clientTrainMap=new Map,clientTrainList=[];class ClientTrain{constructor({entity:a}){this.entity=a,this.vehicleHandle=0,this.scriptId=this.entity.getVariable("scriptId"),this.trainId=this.entity.getVariable("trainId"),this.nodeId=this.entity.getVariable("nodeId"),this.controllerId=this.entity.getVariable("controllerId"),this.variationId=this.entity.getVariable("variationId"),this.position=ClientTrain.parseVector(this.entity.getVariable("position")),this.speed=this.entity.getVariable("speed"),this.cruiseSpeed=this.entity.getVariable("cruiseSpeed"),this.direction=this.entity.getVariable("direction"),this.locked=this.entity.getVariable("locked"),this.clientLocked=!0,this.isHaveStopPoints=!1,this.isInStopPoint=!1,this.lastStopPointTimestamp=0,this.stopPoints=[],this.stopSaveSpeed=this.speed,this.stopSaveCruiseSpeed=this.cruiseSpeed,this.isStreamed=!1,this.created=!1,this.lastSendSync=-1,this.lastStopSync=-1,this.lastStreamOut=-1,this.lastSyncIn=0,this.lagLastDist=0,this.lagLastPoint=[0,0,0],this.lagCounter=0,this.syncCounter=-1,this.syncInCounter=0,this.models=11===this.variationId?["freight","freightcar","freightcont1"].map(a=>mp.game.joaat(a)):25===this.variationId?["metrotrain"].map(a=>mp.game.joaat(a)):[],clientTrainMap.set(this.scriptId,this),clientTrainMap.set(this.trainId,this),clientTrainList.push(this)}async createEntity(){if(!this.created){this.created=!0;for(const a of this.models)if(!mp.game.streaming.hasModelLoaded(a)){mp.game.streaming.requestModel(a);do await mp.game.waitAsync(50);while(!mp.game.streaming.hasModelLoaded(a))}this.vehicleHandle=mp.game.vehicle.createMissionTrain(this.variationId,this.position.x,this.position.y,this.position.z,this.direction);do await mp.game.waitAsync(50);while(!mp.game.entity.doesExist(this.vehicleHandle));for(const a of this.models)mp.game.streaming.setModelAsNoLongerNeeded(a);mp.game.entity.setInvincible(this.vehicleHandle,!0),setTrainCruiseSpeed(this.vehicleHandle,0),setTrainSpeed(this.vehicleHandle,0),setMissionTrainCoords(this.vehicleHandle,this.position),setTrainCruiseSpeed(this.vehicleHandle,this.cruiseSpeed),setTrainSpeed(this.vehicleHandle,this.speed),this.isStreamed=!0,this.created=!1}}destroyEntity(){this.vehicleHandle&&mp.game.entity.doesExist(this.vehicleHandle)&&mp.game.vehicle.deleteMissionTrain(this.vehicleHandle),this.vehicleHandle=0,this.isStreamed=!1}isEntityReady(){return this.isStreamed&&0!==this.vehicleHandle&&mp.game.entity.doesExist(this.vehicleHandle)}syncCheck(a=!1){const{x:b,y:c,z:d}=getEntityCoords(this.vehicleHandle);(mp.dist(b,c,d,this.position.x,this.position.y,this.position.z)>(this.controllerId===localPlayer.remoteId?15:3.5)||a)&&setMissionTrainCoords(this.vehicleHandle,this.position)}updateSpeed(){setTrainSpeed(this.vehicleHandle,this.speed),setTrainCruiseSpeed(this.vehicleHandle,this.cruiseSpeed)}updateLockStatus(){if(25===this.variationId)for(let a=0;2!=a;a++){const b=getTrainCarriageEntity(this.vehicleHandle,a);if("number"==typeof b&&0!==b)for(let a=0;4!=a;a++)this.locked?setVehicleDoorShut(b,a,!1):setVehicleDoorOpen(b,a,!1,!1)}this.clientLocked=this.locked}sendSync(a,b,c){mp.events.callRemoteUnreliable("s:trains:sync",this.trainId,++this.syncInCounter,a,b,c,this.speed,this.cruiseSpeed,this.locked)}getSaveCoords(){return this.isEntityReady()?getEntityCoords(this.vehicleHandle,!0):this.position}getDistanceClosestStopPoint(a,b,c){var d=Math.pow;let e=9999999;for(const f of this.stopPoints){const g=d(a-f.x,2)+d(b-f.y,2)+d(c-f.z,2);g<e&&(e=g)}return Math.sqrt(e)}static parseVector(a){const b=a.split("|");return new mp.Vector3(parseFloat(b[0]),parseFloat(b[1]),parseFloat(b[2]))}}mp.events.addDataHandler("position",(a,b)=>{if(a.trainInstance){const c=a.trainInstance;c.position=ClientTrain.parseVector(b),c.isEntityReady()&&(c.syncCheck(0===c.speed),c.lastSyncIn=getTimeMs())}}),mp.events.add("c:trains:sync",(a,b,c,d,e,f,g,h)=>{const i=clientTrainMap.get(a);if(i.controllerId===localPlayer.remoteId)return;if(i.syncCounter>b)return;i.syncCounter=b;const j=getTimeMs(),k=i.isEntityReady();if(!(j<i.lastStreamOut+1500)){if(j<i.lastStopSync+5e3){const a=k?getEntityCoords(i.vehicleHandle):i.position;if(10>mp.dist(c,d,e,a.x,a.y,a.z))return}"undefined"!=typeof f&&(i.speed=f,k&&setTrainSpeed(i.vehicleHandle,f),0===f&&(i.lastStopSync=j)),"undefined"!=typeof g&&(i.cruiseSpeed=g,k&&setTrainCruiseSpeed(i.vehicleHandle,g)),"undefined"!=typeof h&&(i.locked=h,k&&i.updateLockStatus()),i.position=new mp.Vector3(c,d,e),k&&i.syncCheck("undefined"!=typeof f&&0===f),i.lastSyncIn=j}}),mp.events.addDataHandler("speed",(a,b)=>{if(a.trainInstance){const c=a.trainInstance;c.speed=b,0===c.speed&&(c.lastStopSync=getTimeMs()),c.isEntityReady()&&(setTrainSpeed(c.vehicleHandle,c.speed),0===c.speed&&c.syncCheck(!0))}}),mp.events.addDataHandler("cruiseSpeed",(a,b)=>{if(a.trainInstance){const c=a.trainInstance;c.cruiseSpeed=b,c.isEntityReady()&&setTrainCruiseSpeed(c.vehicleHandle,c.cruiseSpeed)}}),mp.events.addDataHandler("locked",(a,b)=>{if(a.trainInstance){const c=a.trainInstance;c.locked=b,c.isEntityReady()&&c.updateLockStatus()}}),mp.events.addDataHandler("controllerId",(a,b)=>{if(a.trainInstance){const c=a.trainInstance;if(c.controllerId=b,c.syncInCounter=0,c.controllerId===localPlayer.remoteId){const a=c.isEntityReady();if(!a)return void mp.events.callRemote("s:trains:freeController",c.trainId);c.isInStopPoint=!1,c.locked||(c.locked=!0,a&&c.updateLockStatus()),0!==c.speed&&0!==c.cruiseSpeed||c.entity.getVariable("freeze")||(c.speed=8,c.cruiseSpeed=8,a&&c.updateSpeed())}}}),mp.game.invoke("0xC4301E5121A0ED73",!0),mp.game.invoke("0x80D9F74197EA47D9",!1),mp.game.invoke("0x736A718577F39C7D"),mp.events.add("serverWorldDataReady",async()=>{mp.dummies.forEachByType(mp.dummyEntityTypeTrain,a=>{a.trainInstance||(a.trainInstance=new ClientTrain({entity:a}))})});let isLocalPlayerInTrain=!1,isLocalPlayerCanEnter=!1,teleportTrain=null,teleportVehicleHandle=0,teleportPosition=new mp.Vector3,teleportLastOffsetEnter=new mp.Vector3;const teleportKeyHandler=()=>{if(!(mp.gui.cursor.visible||global.isChatOpen)){if(isLocalPlayerInTrain){global.notifyKeyHelpHide(),mp.keys.unbind(69,!0,teleportKeyHandler),isLocalPlayerInTrain=!1;const{x:a,y:b,z:c}=getOffsetFromEntityInWorldCoords(teleportVehicleHandle,teleportLastOffsetEnter.x,teleportLastOffsetEnter.y,teleportLastOffsetEnter.z);return void localPlayer.setCoordsNoOffset(a,b,c,!0,!0,!0)}isLocalPlayerCanEnter=!1,isLocalPlayerInTrain=!0,global.notifyKeyHelpShow("E","\u0432\u044B\u0439\u0442\u0438"),localPlayer.setCoordsNoOffset(teleportPosition.x,teleportPosition.y,teleportPosition.z,!0,!0,!0)}};global.test_t=0,setInterval(async()=>{var a=Math.max;const{x:b,y:c,z:d}=localPlayer.getCoords(!0);for(const e of clientTrainList)if(e.isStreamed){const f=e.isEntityReady(),g=f?getEntityCoords(e.vehicleHandle):e.position,h=mp.dist(b,c,d,g.x,g.y,g.z);if(h>TRAIN_STREAMED_DIST||localPlayer.dimension!==e.entity.dimension){if(f&&localPlayer.dimension===e.entity.dimension&&0===e.lagCounter&&500<h&&h>10*e.lagLastDist){e.lagCounter++,f&&(e.destroyEntity(),await e.createEntity());continue}e.controllerId===localPlayer.remoteId&&mp.events.callRemote("s:trains:freeController",e.trainId),isLocalPlayerInTrain&&teleportTrain===e&&(global.notifyKeyHelpHide(),mp.keys.unbind(69,!0,teleportKeyHandler),isLocalPlayerInTrain=!1,teleportTrain=null),isLocalPlayerCanEnter&&teleportTrain===e&&(global.notifyKeyHelpHide(),mp.keys.unbind(69,!0,teleportKeyHandler),isLocalPlayerCanEnter=!1,teleportTrain=null),e.lastStreamOut=getTimeMs(),e.position=new mp.Vector3(g.x,g.y,g.z),e.destroyEntity();continue}if(e.position=new mp.Vector3(g.x,g.y,g.z),e.lagLastDist=h,e.lagLastPoint=[g.x,g.y,g.z],e.lagCounter=0,e.controllerId===localPlayer.remoteId){const b=getTimeMs();if(e.isHaveStopPoints){let c=!1;!e.isInStopPoint&&b>e.lastStopPointTimestamp+60000&&3.5>=e.getDistanceClosestStopPoint(g.x,g.y,g.z)?(e.lastStopPointTimestamp=b,e.isInStopPoint=!0,e.stopSaveSpeed=a(e.speed,8),e.stopSaveCruiseSpeed=a(e.cruiseSpeed,8),e.speed=0,e.cruiseSpeed=0,e.locked=!1,c=!0):e.isInStopPoint&&b>e.lastStopPointTimestamp+10000&&3.5>=e.getDistanceClosestStopPoint(g.x,g.y,g.z)&&(e.isInStopPoint=!1,e.speed=e.stopSaveSpeed,e.cruiseSpeed=e.stopSaveCruiseSpeed,e.locked=!0,c=!0),c&&f&&(e.updateSpeed(),e.updateLockStatus(),e.lastSendSync=b,e.sendSync(g.x,g.y,g.z))}const c=mp.players.streamed.length,d=0===e.speed?9e3:10>c?200:50>c?500:1e3;e.lastSendSync+d<b&&(e.lastSendSync=b,e.sendSync(g.x,g.y,g.z))}else-1===e.controllerId&&global.actionAntiFlood("s:trains:taskController",5e3)&&mp.events.callRemote("s:trains:taskController",e.trainId);if(!isLocalPlayerInTrain&&(!isLocalPlayerCanEnter||teleportTrain===e)){let a=!1;if(e.isHaveStopPoints&&.1>e.speed&&15>h)for(let f=0;2!=f;f++){const g=getTrainCarriageEntity(e.vehicleHandle,f);if("number"==typeof g&&0!==g)for(const f of TRAIN_DOOR_BONES){const h=getWorldPositionOfEntityBone(g,getEntityBoneIndexByName(g,f));if("object"!=typeof h)continue;if(3<mp.dist(b,c,d,h.x,h.y,h.z))continue;const i=getEntityCoords(g,!0);teleportVehicleHandle=e.vehicleHandle,teleportPosition=new mp.Vector3(i.x,i.y,i.z+1.5),teleportLastOffsetEnter=getOffsetFromEntityGivenWorldCoords(e.vehicleHandle,b,c,d),a=!0;break}}a&&!isLocalPlayerCanEnter?(global.notifyKeyHelpShow("E","\u0432\u043E\u0439\u0442\u0438 \u0432 \u043F\u043E\u0435\u0437\u0434"),mp.keys.bind(69,!0,teleportKeyHandler),isLocalPlayerCanEnter=!0,teleportTrain=e):!a&&isLocalPlayerCanEnter&&(global.notifyKeyHelpHide(),mp.keys.unbind(69,!0,teleportKeyHandler),isLocalPlayerCanEnter=!1,teleportTrain=null)}}else{const a=mp.dist(b,c,d,e.position.x,e.position.y,e.position.z);if(a<TRAIN_STREAMED_DIST&&localPlayer.dimension===e.entity.dimension&&getTimeMs()>e.lastStreamOut+1500){e.lagLastDist=a,e.lagLastPoint=[e.position.x,e.position.y,e.position.z],e.lagCounter=0,e.createEntity();continue}}},125),mp.events.add("playerQuit",a=>{if(0===a.id)for(const a of clientTrainList)a.isStreamed=!0,a.destroyEntity()});{const a=[{trains:["trainMetro_0","trainMetro_1","trainMetro_2"],infoMapPoints:[new mp.Vector3(-1016.1,-2759.72,-.2),new mp.Vector3(-1073.62,-2722.28,-.19),new mp.Vector3(-1097.68,-2730.63,-6.36),new mp.Vector3(-1103.41,-2736.78,-8.41),new mp.Vector3(-1100.9,-2738.96,-8.41),new mp.Vector3(-1091.49,-2731.2,-8.41),new mp.Vector3(-1095.34,-2727.97,-8.41),new mp.Vector3(-1076.69,-2709.41,-8.41),new mp.Vector3(-1079.94,-2706.66,-8.41),new mp.Vector3(-1058.52,-2688.45,-8.41),new mp.Vector3(-916.05,-2356.12,-4.51),new mp.Vector3(-898.03,-2317.68,-4.51),new mp.Vector3(-899.14,-2321.11,-4.51),new mp.Vector3(-871.99,-2292.53,-12.73),new mp.Vector3(-876.51,-2303.88,-12.73),new mp.Vector3(-880.75,-2302.2,-12.73),new mp.Vector3(-883.82,-2328.93,-12.73),new mp.Vector3(-887.64,-2327.59,-12.73),new mp.Vector3(-897.41,-2353.54,-12.73),new mp.Vector3(-547.07,-1296.96,25.9),new mp.Vector3(-544.54,-1291.33,25.9),new mp.Vector3(-536.81,-1274.36,25.9),new mp.Vector3(-534.36,-1268.63,25.9),new mp.Vector3(251.33,-1204.15,28.29),new mp.Vector3(257.58,-1204.21,28.29),new mp.Vector3(262.76,-1204.18,28.29),new mp.Vector3(268.95,-1204.18,28.29),new mp.Vector3(279.67,-1204.32,37.9),new mp.Vector3(-245.4,-319.27,22.12),new mp.Vector3(-249.73,-319.8,22.12),new mp.Vector3(-265.91,-304.79,18.86),new mp.Vector3(-281.01,-315.97,17.29),new mp.Vector3(-280.83,-326.25,17.29),new mp.Vector3(-295.83,-357.3,9.06),new mp.Vector3(-291.51,-345.29,9.06),new mp.Vector3(-296.13,-345.17,9.06),new mp.Vector3(-297.4,-318.92,9.06),new mp.Vector3(-293.12,-318.91,9.06),new mp.Vector3(-293.39,-291.25,9.06),new mp.Vector3(-841.92,-137.22,27.18),new mp.Vector3(-833.59,-124.11,27.18),new mp.Vector3(-826.33,-128.09,27.18),new mp.Vector3(-850.39,-156.52,18.95),new mp.Vector3(-824.4,-146.07,18.95),new mp.Vector3(-826.55,-142.38,18.95),new mp.Vector3(-804.48,-127.83,18.95),new mp.Vector3(-802.29,-131.84,18.95),new mp.Vector3(-791.91,-125.64,18.95),new mp.Vector3(-1358.03,-516.42,22.47),new mp.Vector3(-1343.13,-515.59,22.27),new mp.Vector3(-1361.51,-475.23,22.27),new mp.Vector3(-1363.96,-440.77,14.05),new mp.Vector3(-1361.75,-453.4,14.05),new mp.Vector3(-1357.74,-451.2,14.05),new mp.Vector3(-1347.17,-475.42,14.05),new mp.Vector3(-1343.54,-473.21,14.05),new mp.Vector3(-1333.16,-499.23,14.05),new mp.Vector3(-492.36,-706.49,27.89),new mp.Vector3(-492.36,-714.2,24.23),new mp.Vector3(-487.55,-725.01,22.92),new mp.Vector3(-494.84,-721.55,22.92),new mp.Vector3(-477.4,-737.77,22.9),new mp.Vector3(-477.27,-706.77,19.03),new mp.Vector3(-527.96,-671.8,10.81),new mp.Vector3(-515.82,-671.64,10.81),new mp.Vector3(-515.91,-676.1,10.81),new mp.Vector3(-489.58,-674.42,10.81),new mp.Vector3(-489.66,-670.27,10.81),new mp.Vector3(-461.95,-674.39,10.81),new mp.Vector3(-218.98,-1048.53,29.14),new mp.Vector3(-216.76,-1042.73,29.14),new mp.Vector3(-208.32,-1019.48,29.14),new mp.Vector3(-210.49,-1025.21,29.14),new mp.Vector3(103.63,-1715.93,29.11),new mp.Vector3(108.36,-1719.89,29.11),new mp.Vector3(122.65,-1731.97,29.54),new mp.Vector3(127.39,-1735.85,29.54)],blipPoints:[new mp.Vector3(-1041.27,-2743.46,13.95),new mp.Vector3(-948.68,-2338.35,5.01),new mp.Vector3(-542.51,-1286.69,27.33),new mp.Vector3(274.48,-1204.25,38.9),new mp.Vector3(-245.45,-334.91,29.98),new mp.Vector3(-801.11,-100.13,37.57),new mp.Vector3(-1369.46,-527.74,30.31),new mp.Vector3(-490.11,-697.93,33.24),new mp.Vector3(-212.72,-1031.58,30.21),new mp.Vector3(113.57,-1724.24,30.17)],stopPoints:[{x:-1088.627,y:-2709.362,z:-7.137033},{x:-1081.309,y:-2725.259,z:-7.137033},{x:-889.2755,y:-2311.825,z:-11.45941},{x:-876.7512,y:-2323.808,z:-11.45609},{x:-545.3138,y:-1280.548,z:27.09238},{x:-536.8082,y:-1286.096,z:27.08238},{x:270.2029,y:-1210.818,z:39.25398},{x:265.3616,y:-1198.051,z:39.23406},{x:-286.3837,y:-318.877,z:10.33625},{x:-302.6719,y:-322.995,z:10.33629},{x:-826.3845,y:-134.7151,z:20.22362},{x:-816.7159,y:-147.4567,z:20.2231},{x:-1351.282,y:-481.2916,z:15.318},{x:-1341.085,y:-467.674,z:15.31838},{x:-496.0209,y:-681.0325,z:12.08264},{x:-495.8456,y:-665.4668,z:12.08244},{x:-218.2868,y:-1031.54,z:30.51112},{x:-209.6845,y:-1037.544,z:30.50939},{x:112.3714,y:-1729.233,z:30.24097},{x:120.0308,y:-1723.956,z:30.31433}]}];mp.events.add("serverWorldDataReady",async()=>{for(;0===clientTrainList.length;)await mp.game.waitAsync(100);for(const b of a){for(const a of b.blipPoints)mp.blips.new(445,a,{shortRange:!0,drawDistance:55,scale:.7,name:"\u041C\u0435\u0442\u0440\u043E"});for(const a of b.infoMapPoints){let c=null,d=[];new global.TriggerColshape(a,0,3,()=>{if(!(3<Math.abs(localPlayer.getCoords(!0).z-a.z))&&null===c){for(const a of b.trains){const b=clientTrainMap.get(a);if(!b)continue;const c=mp.blips.new(445,b.getSaveCoords(),{color:1,shortRange:!1,drawDistance:55,scale:1.2,name:"\u041F\u043E\u0435\u0437\u0434"});c.train=b,d.push(c)}c=setInterval(()=>{for(const a of d)a.setCoords(a.train.getSaveCoords())},5),global.actionAntiFlood("metroBlipInfoDesc",7500)&&mp.api.notify.info("\u0412\u044B \u043F\u043E\u0434\u043E\u0448\u043B\u0438 \u043A \u043A\u0430\u0440\u0442\u0435 \u043C\u0435\u0442\u0440\u043E \u0438 \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u0435\u0437\u0434\u043E\u0432 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0412\u0430\u0448\u0435\u0439 \u043A\u0430\u0440\u0442\u0435")}},()=>{null===c||(clearInterval(c),c=null,d.forEach(a=>mp.blips.exists(a)&&a.destroy()),d=[])})}for(const a of b.trains){const c=clientTrainMap.get(a);c&&(c.stopPoints=b.stopPoints,c.isHaveStopPoints=!0)}}})}{const a=["F_GANG_BALLAS","F_GANG_BLOODS","F_GANG_GROVE","F_GANG_MARABUNTA","F_GANG_VAGOS","F_YAKUZA","F_RUSSIANMAFIA","F_MEXICOMAFIA","F_ITALYMAFIA","F_ARMENIAMAFIA"],b=["F_FIB","F_LSPD","F_LSSD","F_LSARMY"];let c=null,d="",e=!1;for(const b of a)global.registerFactionEvent({factionId:b,onEnter:()=>{d=b,mp.api.data.get("crimeTrainTheftStart")===d&&j()},onLeave:()=>{d="",k()}});for(const a of b)global.registerFactionEvent({factionId:a,onEnter:()=>{d=a,e=!0,mp.api.data.get("crimeTrainTheftStart")&&mp.api.data.get("crimeTrainTheftStartNotify")&&s()},onLeave:()=>{d="",e=!1,t()}});let f=!1,g=null,h=[],i=new mp.Vector3(0,0,0);const j=()=>{f||(y(),h.forEach(a=>a.destroy()),h=[],g=setInterval(l,1e3),mp.events.add("playerWeaponShot",m),f=!0)},k=()=>{f&&(z(),h.forEach(a=>a.destroy()),h=[],clearInterval(g),g=null,mp.events.remove("playerWeaponShot",m),f=!1)},l=()=>{if(0!==c.speed||!c.isEntityReady())return h.forEach(a=>a.destroy()),void(h=[]);const a=getEntityCoords(c.vehicleHandle);if((0===h.length||.1<mp.dist(a.x,a.y,a.z,i.x,i.y,i.z))&&mp.api.data.get("crimeTrainTheftHasMaterial")){h.forEach(a=>a.destroy()),h=[];let b=0;for(const a of[1,3,4,5,6,7]){const d=b;b++;const e=getTrainCarriageEntity(c.vehicleHandle,a);if("number"==typeof e&&0!==e)for(const a of["door_dside_f","door_pside_f"]){const b=getWorldPositionOfEntityBone(e,getEntityBoneIndexByName(e,a));if("object"!=typeof b)continue;const c=new global.ActionColshapeSphere(new mp.Vector3(b.x,b.y,b.z+1),0,2,"\u0432\u0437\u044F\u0442\u044C \u044F\u0449\u0438\u043A",()=>{const{x:a,y:b,z:c}=localPlayer.getCoords(!0);for(const d of mp.players.streamed){if(d===localPlayer||0===d.handle)continue;const{x:e,y:f,z:g}=d.getCoords(!0);if(5>mp.dist(a,b,c,e,f,g)&&d.isPlayingAnim("anim@heists@load_box","lift_box",3))return void mp.api.notify.error("\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435, \u043F\u043E\u043A\u0430 \u043A\u0442\u043E-\u0442\u043E \u0434\u0440\u0443\u0433\u043E\u0439 \u0432\u043E\u0437\u044C\u043C\u0451\u0442 \u0433\u0440\u0443\u0437")}return mp.api.data.get("crimeTrainTheftHasMaterial"+d)?void(!global.actionAntiFlood("s:crime:trainTheft:take",3e3)||(mp.events.callRemote("s:crime:trainTheft:take",d),global.ActionColshapeSphere.clearAll())):(mp.api.data.get("crimeTrainTheftHasMaterial")||(h.forEach(a=>a.destroy()),h=[]),void mp.api.notify.error("\u0422\u0443\u0442 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442"))});h.push(c)}}i=a}},m=a=>{if(0===c.speed||!c.isEntityReady()||!a)return;const b=getEntityCoords(c.vehicleHandle),d=getEntityHeading(c.vehicleHandle),e=mp.game.object.getObjectOffsetFromCoords(b.x,b.y,b.z,d,0,0,2.3),f=mp.game.gameplay.getGroundZFor3dCoord(e.x,e.y,e.z+1,0,!1);.1>a.z-f||8.5<mp.dist(e.x,e.y,e.z,a.x,a.y,a.z)||mp.events.callRemoteUnreliable("s:crime:trainTheft:damage")};mp.events.add("c:crime:trainTheft:trainHealth",a=>{q(a)});let n=!1,o=-1,p=null;const q=a=>{n||(n=!0,global.mainBrowser.execute(`mainHud.progressStart('Остановка поезда', ${100-a}, 250);`),o=a),o!==a&&a<o&&(global.mainBrowser.execute(`mainHud.progressValue(${100-a});`),o=a),p&&clearTimeout(p),p=setTimeout(()=>{n=!1,o=-1,global.mainBrowser.execute(`mainHud.progressStop();`),p=null},2e3)};let r=!1;const s=()=>{r||-1===mp.api.data.get("crimeTrainTheftGovFactionList").indexOf(d)||(y(),h.forEach(a=>a.destroy()),h=[],g=setInterval(u,1e3),r=!0)},t=()=>{r&&(h.forEach(a=>a.destroy()),h=[],clearInterval(g),g=null,z(),r=!1)},u=()=>{if(0!==c.speed||!c.isEntityReady())return h.forEach(a=>a.destroy()),void(h=[]);const a=getEntityCoords(c.vehicleHandle);if(0===h.length||.1<mp.dist(a.x,a.y,a.z,i.x,i.y,i.z)){h.forEach(a=>a.destroy()),h=[];const b=getWorldPositionOfEntityBone(c.vehicleHandle,getEntityBoneIndexByName(c.vehicleHandle,"headlight_r"));if("object"!=typeof b)return;const d=new global.ActionColshapeSphere(new mp.Vector3(b.x,b.y,b.z-.5),0,4,"\u043F\u043E\u0447\u0438\u043D\u0438\u0442\u044C \u043F\u043E\u0435\u0437\u0434",()=>{global.actionAntiFlood("s:crime:trainTheft:repair",3e3)&&(mp.events.callRemote("s:crime:trainTheft:repair"),global.ActionColshapeSphere.clearAll())});h.push(d),i=a}};mp.events.add("c:crime:trainTheft:startRepair",()=>{let a=0;const b=120,{x:c,y:d,z:e}=localPlayer.position,f=setInterval(()=>{const{x:g,y:h,z:i}=localPlayer.position;return global.isPlayerDeath||10<mp.dist(c,d,e,g,h,i)||0!==localPlayer.dimension||a>=b?(clearInterval(f),mp.events.callRemote("s:crime:trainTheft:repairEnd",a>=b),global.hideUI(!1),global.disableChatAndKeys(!1),void global.mainBrowser.execute(`mainHud.progressStop();`)):void(a++,global.mainBrowser.execute(`mainHud.progressValue(${100*(a/b)});`))},1e3);global.hideUI(!0),global.disableChatAndKeys(!0),global.mainBrowser.execute(`mainHud.progressStart('Починка поезда', ${100*(a/120)}, 400);`)}),mp.api.data.onChange("crimeTrainTheftStart",a=>""===a?(r&&mp.gui.chat.push(`!{00FF80}Поезд отремонтирован, находящиеся рядом сотрудники получают премию за оперативное реагирование.`),k(),void t()):void(d===a&&(mp.gui.chat.push(`!{FF6347}Информатор сообщил о перевозке оружия и других армейских припасов на грузовом поезде. Заберите грузовик около черного рынка, расстреляйте локомотив поезда, чтобы остановить его, затем погрузите ящики и доставьте грузовик на базу.`),j()))),mp.api.data.onChange("crimeTrainTheftStartNotify",a=>{a&&(e?(mp.gui.chat.push(`!{FF6347}Бандиты напали на поезд с армейскими припасами! Выдвигайтесь на место нападения, остановите преступников, почините поезд и постарайтесь спасти машину с припасами, доставив её на свою базу.`),s()):f&&mp.gui.chat.push(`!{FF6347}Поезд остановлен, силовые структуры уже в пути! Погрузите ящики, скройтесь от преследования и доставьте их на базу.`))}),mp.api.data.onChange("crimeTrainTheftHasMaterial",a=>{!a&&r&&mp.gui.chat.push(`!{FF6347}Бандиты полностью разгрузили поезд! Постарайтесь перехватить грузовик с награбленным и почините поезд.`)});let v=!1,w=null,x=null;const y=()=>{v||(w=mp.blips.new(436,c.getSaveCoords(),{color:1,scale:1.2,name:"?",dimension:0,shortRange:!1}),x=setInterval(()=>{w.setCoords(c.getSaveCoords())},5),v=!0)},z=()=>{v&&(null!==x&&(clearInterval(x),x=null),mp.blips.exists(w)&&w.destroy(),v=!1)};let A=100;global.handItemEventOnSet("HI_TRAIN_THEFT_OBJ",()=>{A=localPlayer.getHealth(),mp.events.add("render",B)}),global.handItemEventOnRemove("HI_TRAIN_THEFT_OBJ",()=>{mp.events.remove("render",B)});const B=()=>{mp.game.controls.disableControlAction(0,21,!0),mp.game.controls.disableControlAction(0,22,!0),mp.game.controls.disableControlAction(0,23,!0),mp.game.controls.disableControlAction(0,24,!0),mp.game.controls.disableControlAction(0,25,!0),(null!=localPlayer.vehicle||global.isPlayerDeath||A>localPlayer.getHealth()+5)&&global.handItemTaskFall()};class C extends global.CustomScenario{constructor(a,b){super(a),this.item=b}async onStart(a){if(!mp.game.streaming.hasAnimDictLoaded("anim@heists@load_box")){mp.game.streaming.requestAnimDict("anim@heists@load_box");do await mp.game.waitAsync(10);while(!mp.game.streaming.hasAnimDictLoaded("anim@heists@load_box"))}if(mp.players.exists(a)&&0!==a.handle&&(a.taskPlayAnim("anim@heists@load_box","lift_box",8,-8,-1,0,0,!1,!1,!1),await mp.game.waitAsync(1900),mp.players.exists(a)&&0!==a.handle&&this.isActive(a))){if(mp.attachmentMngr.addClient(a,mp.game.joaat(this.item)),!mp.game.streaming.hasAnimDictLoaded("anim@heists@box_carry@")){mp.game.streaming.requestAnimDict("anim@heists@box_carry@");do await mp.game.waitAsync(10);while(!mp.game.streaming.hasAnimDictLoaded("anim@heists@box_carry@"))}await mp.game.waitAsync(1250),mp.players.exists(a)&&0!==a.handle&&this.isActive(a)&&a.taskPlayAnim("anim@heists@box_carry@","idle",100,1,-1,49,1,!1,!1,!1)}}async onStartForNew(a){if(!mp.game.streaming.hasAnimDictLoaded("anim@heists@box_carry@")){mp.game.streaming.requestAnimDict("anim@heists@box_carry@");do await mp.game.waitAsync(10);while(!mp.game.streaming.hasAnimDictLoaded("anim@heists@box_carry@"))}mp.players.exists(a)&&0!==a.handle&&(a.taskPlayAnim("anim@heists@box_carry@","idle",8,-8,-1,49,0,!1,!1,!1),mp.attachmentMngr.addClient(a,mp.game.joaat(this.item)))}onEnd(a){mp.attachmentMngr.removeFor(a,mp.game.joaat(this.item)),a.clearTasks()}}new C("trainTheftBox","armyMaterilBoxItem"),mp.events.add("serverWorldDataReady",async()=>{for(;0===clientTrainList.length;)await mp.game.waitAsync(100);c=clientTrainMap.get("trainRob_0")})}const getTimeMs=()=>Date.now(),getEntityCoords=(a,b=!0)=>mp.game.entity.getCoords(a,b),getEntityHeading=a=>mp.game.invoke("0xE83D4F9BA2A38914",a),setMissionTrainCoords=(a,b)=>mp.game.invoke("0x591CA673AA6AB736",a,b.x,b.y,b.z),setTrainCruiseSpeed=(a,b)=>mp.game.vehicle.setTrainCruiseSpeed(a,b+1e-4),setTrainSpeed=(a,b)=>mp.game.vehicle.setTrainSpeed(a,b+1e-4),getTrainCarriageEntity=(a,b)=>mp.game.invoke("0x08AAFD0814722BC3",a,b),getWorldPositionOfEntityBone=(a,b)=>mp.game.invokeVector3("0x44A8FCB8ED227738",a,b),getEntityBoneIndexByName=(a,b)=>mp.game.invoke("0xFB71170B7E76ACBA",a,b),getOffsetFromEntityGivenWorldCoords=(a,b,c,d)=>mp.game.invokeVector3("0x2274BC1C4885E333",a,b,c,d),getOffsetFromEntityInWorldCoords=(a,b,c,d)=>mp.game.invokeVector3("0x1899F328B0E12848",a,b,c,d),setVehicleDoorOpen=(a,b,c,d)=>mp.game.invoke("0x7C65DAC73C35C862",a,b,c,d),setVehicleDoorShut=(a,b,c)=>mp.game.invoke("0x93D9BD300D7789E5",a,b,c);
}ጉ欔̧