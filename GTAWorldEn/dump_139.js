{
require('./gtalife/VehicleSeats/Utility.js')
require('./gtalife/VehicleSeats/Constants.js')


let INFO_OUTPUT_COOLDOWN = 1000 * 60 * 5

class Preview{
    constructor(core){
        this.m_Core = core
        this.m_Pulse = setInterval(this.Event_OnPulse.bind(this), 50)
        this.m_TickInfo = false
    }

    Event_OnPulse(){
        try{
            if (mp.players.local.vehicle) return this.DestroyMarker()
            if (this.m_Core.HasData(mp.players.local)) return this.DestroyMarker()
            let vehicle = GetNearByVehicles(6)
            if (!vehicle) return this.DestroyMarker() 
            let seat = GetClosestSeat(vehicle) 
            if (!seat) return this.DestroyMarker()
            this.Display(vehicle, seat)
            this.Information()
        } catch(e){
            this.Error(e)
        }
    }

    CreateMarker(vehicle, seat){
        try{
            let position = vehicle.getOffsetFromInWorldCoords(seat.position.x, seat.position.y, seat.position.z - 0.5)
            this.m_Marker = mp.markers.new(seat.index + 11, position, .2, {
                direction : new mp.Vector3(0, 0, 0),
                rotation : new mp.Vector3(0, 0, 0),
                color: [255, 255, 255, 255],
                visible : true, 
                dimension : mp.players.local.dimension
            })

            let arrow =  mp.markers.new(0, new mp.Vector3(position.x, position.y, position.z-.3), .1, {
                direction : new mp.Vector3(0, 0, 0),
                rotation : new mp.Vector3(0, 0, 0),
                color: [255, 255, 255, 255],
                visible : true, 
                dimension : mp.players.local.dimension
            })

            this.m_Marker.arrow = arrow

            return this.m_Marker
        } catch(e){
            this.Error(e)
        }
    }

    DestroyMarker(){
        try{
            if (!this.m_Marker) return
            this.m_Marker.destroy()
            this.m_Marker.arrow.destroy()
            this.m_Marker = null
        } catch(e){
            this.Error(e)
        }
    }

    Display(vehicle, seat){
        try{
            this.DestroyMarker()
            this.GetMarker(vehicle, seat)
        } catch(e){
            this.Error(e)
        }
    }

    Information(){
        if (this.m_TickInfo && Date.now() - this.m_TickInfo < INFO_OUTPUT_COOLDOWN) return 
        this.m_TickInfo = Date.now()
        mp.gui.chat.push(`!{Orange}[INFO]!{White} To use the additional seats, use !{#39A2FF}Shift + G!{White}`)
        mp.gui.chat.push(`!{Orange}[INFO]!{White} To switch seats inside the vehicle use !{#39A2FF}Arrow Left!{White} or !{#39A2FF}Arrow Right!{White}`)
        mp.gui.chat.push(`!{Orange}[INFO]!{White} To rotate on your seat use !{#39A2FF}A!{White} or !{#39A2FF}D!{White}`)
    }

    
    Error(exception){
        mp.console.logError("Exception occured inside VehicleSeats@Preview.", false, true)
        mp.console.logError(String(exception.message))
    }

    GetMarker(vehicle, seat){
        if (!this.m_Marker) return this.CreateMarker(vehicle, seat)
        return this.m_Marker  
    }
    
}

function __Preview(core){
    return new Preview(core)
}
}