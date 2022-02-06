{
﻿require('./gtalife/VehicleSeats/Constants.js')

function GetDistance(v1, v2){
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2))
}

function GetClosestSeat(vehicle){
    let seats = GetSeatData(vehicle.model)
    if (!seats) return
    let occupied = GetSeatVariable(vehicle)
    if (!occupied) return 
    let minimum = [Infinity, null]
    let position = mp.players.local.position
    seats.forEach((seat) =>{
        let spos = vehicle.getOffsetFromInWorldCoords(seat.position.x, seat.position.y, seat.position.z)
        let distance = GetDistance(position, spos)
        if (distance > minimum[0]) return 
        if (IsOccupied(occupied, seat.index)) return
        minimum = [distance, seat] 
    })
    return minimum[1]
}

function GetSeatVariable(vehicle){
    try{
        if (!vehicle) return false
        if (!vehicle.getVariable("Seats::Occupied")) return []
        let seats = vehicle.getVariable("Seats::Occupied").split(SEPARATOR())
        return seats.map(Number)
    } catch{

    }
}

function IsOccupied(occupieds, index){
    let result = false
    occupieds.forEach( occupied =>{
        if (occupied == index) result = true
    })
    return result
}

function GetNearByVehicles(range){
    let closest = null
    let distance = range + 1
    let position = mp.players.local.position
    mp.vehicles.forEachInRange(position, range, (vehicle) => {
        let vpos = vehicle.position
        let dist = GetDistance(position, vpos)
        if (dist > distance) return
        closest = vehicle
        distance = distToPlayer
    })
    return closest
}

function NormalizeCircle(value){
    value = value % 359;

    if (value < 0)
        value += 360;

    return value
}

mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();
		
	if (commandName === "ana") {
		mp.game.streaming.requestAnimDict(args[0]);//preload the animation
        mp.players.local.taskPlayAnim(args[0], args[1], 8.0, 1.0, -1, 1, 1.0, false, false, false);
	}
});


}