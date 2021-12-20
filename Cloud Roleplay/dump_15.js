{
mp.events.add("client:police:getvehiclespeed", (radarallowedspeed) => {
    if(mp.players.local.vehicle){
        let currentspeed = mp.players.local.vehicle.getSpeed() * 3.6
        if(currentspeed > radarallowedspeed){
            mp.game.graphics.startScreenEffect("DrugsTrevorClownsFight", 50, false);
            mp.events.callRemote("server:police:radarcamspeed", currentspeed)
        }
    }
})

// var PoliceBlip = []

// mp.events.add("render", () => {
//     mp.vehicles.forEachInDimension(0,
//         (vehicle) =>{
//             if(PoliceBlip.find(x => x.Vehicle == vehicle) == null){
//                 PoliceBlip.push({
//                     name: 'TestCar',
//                     Vehicle: vehicle,
//                     Blip: mp.blips.new(56, vehicle.position, 
//                         {
//                             name: 'LSPD',
//                             scale: 0.8,
//                             color: 38,
//                             shortRange: false,
//                             rotation: 0,
//                             drawDistance: 5000,
//                         })
//                 })
//             } else {
//                 let vehicleBlip = PoliceBlip.find(x => x.Vehicle == vehicle)
//                 if(vehicle != null && vehicleBlip.Blip != null){
//                     vehicleBlip.Blip.setCoords(vehicle.position)
//                 }
//             }
//         })
//         PoliceBlip.forEach((Blip) =>{
//             if(Blip.Vehicle == null){
//                 Blip.Blip.destroy()
//                 let index = PoliceBlip.indexOf(Blip);
//                 PoliceBlip.splice(index, 1)
//             }
//         })

// })

// mp.events.add("render", () => {
//     let vehiclearray = mp.vehicles.toArray();
//     for (let i = 0; i < vehiclearray.length; i++) {
//         let vehicle = vehiclearray[i];
//         if(vehicle == null) return
//         if(PoliceBlip.find(x => x.Vehicle == vehicle) == null){
//             PoliceBlip.push({
//                 name: 'TestCar',
//                 Vehicle: vehicle,
//                 Blip: mp.blips.new(56, vehicle.position, 
//                     {
//                         name: 'LSPD',
//                         scale: 0.8,
//                         color: 38,
//                         shortRange: false,
//                         rotation: 0
//                     })
//             })
//         } else {
//             let vehicleBlip = PoliceBlip.find(x => x.Vehicle == vehicle)
//             if(vehicle != null && vehicleBlip.Blip != null){
//                 vehicleBlip.Blip.setCoords(vehicle.position)
//             }
//         }
//     }
//     PoliceBlip.forEach((Blip) =>{
//         if(Blip.Vehicle == null){
//             Blip.Blip.destroy()
//             let index = PoliceBlip.indexOf(Blip);
//             PoliceBlip.splice(index, 1)
//         }
//     })
// })
}