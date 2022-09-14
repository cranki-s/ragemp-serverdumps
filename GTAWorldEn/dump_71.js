{
class Display{
    constructor(core){
        this.m_Core = core

        this.m_PowerState = 0 // 0 Off, 1 Powering Up, 2 Powered Up
        this.m_Power = false
        this.m_PoweringUp = false 

        this.m_Antennas = {
            front : {
                xmit : false,			// Whether the antenna is transmitting or in hold
                mode : 0,				// Current antenna mode, 0 = none, 1 = same, 2 = opp, 3 = same and opp
                speed : 0,				// Speed of the vehicle caught by the front antenna
                dir : null, 			// Direction the caught vehicle is going, 0 = towards, 1 = away
                fastSpeed : 0, 			// Speed of the fastest vehicle caught by the front antenna
                fastDir : null, 		// Direction the fastest vehicle is going
                locked : []
            },
    
            rear : {
                xmit : false,			// Whether the antenna is transmitting or in hold
                mode : 0,				// Current antenna mode, 0 = none, 1 = same, 2 = opp, 3 = same and opp
                speed : 0,				// Speed of the vehicle caught by the front antenna
                dir : null, 			// Direction the caught vehicle is going, 0 = towards, 1 = away
                fastSpeed : 0, 			// Speed of the fastest vehicle caught by the front antenna
                fastDir : null, 		// Direction the fastest vehicle is going
                locked : []
            },
        }


        this.m_PatrolSpeed = null
        this.m_Fast = true
    
        this.m_Limit = false

        this.m_hkClick = this.Event_OnClick.bind(this)
        mp.events.add("PoliceRadar::CEF::OnClick", this.m_hkClick)

        this.m_hkScroll = this.Event_OnScroll.bind(this)
        mp.events.add("PoliceRadar::CEF::OnScroll", this.m_hkScroll)

        this.m_hkPosition = this.Event_OnPosition.bind(this)
        mp.events.add("PoliceRadar::CEF::OnPosition", this.m_hkPosition)
    }

    ConvertSpeed(speed, convert=true){
        if (convert) speed =  (speed * 2.236936).toFixed(0)
        if ( speed < 0 || speed > 999 ) 
            return "Err"

        let text = String( speed )
        let pipes = ""

        for (var i = 0; i < (3 - text.length ); i++)
            pipes = pipes + "0"

        return pipes + text
    }

    Update(antennas){
        this.TriggerEvent("PoliceRadar::CEF::Event", "update", this.m_PatrolSpeed, antennas)
    }

    Visible(bool){
        this.TriggerEvent("PoliceRadar::CEF::Event", "setRadarDisplayState", bool)
    }

    CheckLock(){
        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaLock", "front", this.IsAnyTypeSpeedLocked("front"))
        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaLock", "rear", this.IsAnyTypeSpeedLocked("rear"))
    }
    Event_OnClick(element){
        if (element == "pwrBtn")
            this.m_Core.Request("power", this.m_Power ? "off" : "on")
        
        if (!this.m_Power) return 

        if (element == "frontXmit")
            this.m_Core.Request("front", "xmit", !this.m_Antennas["front"].xmit)
        
        if (element == "frontSame")
            this.m_Core.Request("front", "same", this.m_Antennas["front"].mode != 1 && this.m_Antennas["front"].mode != 3)
  
        if (element == "frontOpp")
            this.m_Core.Request("front", "opp", this.m_Antennas["front"].mode != 2 && this.m_Antennas["front"].mode != 3)

        if (element == "rearXmit")
            this.m_Core.Request("rear", "xmit", !this.m_Antennas["rear"].xmit)
        
        if (element == "rearSame")
            this.m_Core.Request("rear", "same", this.m_Antennas["rear"].mode != 1 && this.m_Antennas["rear"].mode != 3)
  
        if (element == "rearOpp")
            this.m_Core.Request("rear", "opp", this.m_Antennas["rear"].mode != 2 && this.m_Antennas["rear"].mode != 3)
    }


    Event_OnScroll(delta){
        let scale = mp.storage.data.radarScale ? mp.storage.data.radarScale : 1
        this.m_Core.Event_SetScale(scale + (delta * .01))
    }

    Event_OnPosition(x, y){
        mp.storage.data.radarPositionX = x
        mp.storage.data.radarPositionY = y
        mp.storage.flush()
    }

    TriggerEvent(name, ...args){
        
        let argumentsString = '';

        for (let arg of args) {
            switch (typeof arg) {
                case 'string': {
                    argumentsString += `'${arg}', `;
                    break;
                }
                case 'number':
                case 'boolean': {
                    argumentsString += `${arg}, `;
                    break;
                }
                case 'object': {
                    argumentsString += `${JSON.stringify(arg)}, `;
                    break;
                }
            }
        }

        if (!this.m_Core.m_BrowserStarting)
            this.m_Core.GetBrowser().execute(`typeof events['${name}'] !== 'undefined' && events['${name}'](${argumentsString})`);
        else 
            this.m_Core.m_DomQueue.push(`typeof events['${name}'] !== 'undefined' && events['${name}'](${argumentsString})`) 
    }

    ToggleXmit(antenna){
        if (!this.m_Power) return
        this.SetXmit(antenna, !this.m_Antennas[antenna].xmit)
    }

    SetPower(mode, force){
        if (!this.m_PoweringUp && mode != this.m_Power){
            this.m_Power = mode 
            this.TriggerEvent("PoliceRadar::CEF::Event", "radarPower", mode, force, mode)
            
            if (this.m_Power){
                if (!force){
                    this.m_PoweringUp = true
                    let context = this
                    setTimeout(function(){
                        context.m_PoweringUp = false
                        context.TriggerEvent("PoliceRadar::CEF::Event", "poweredUp", mode)
                    }, 2000)
                }
            }
        }
    }

    SetState(state){
        if (state == 0)
            this.TriggerEvent("PoliceRadar::CEF::Event", "setRadarDisplayState", bool)
    }

    SetMode(antenna, mode){
        if (!this.m_Power) return
        this.m_Antennas[antenna].mode = mode 
        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaMode", antenna, mode)
    }

    SetFastData(antenna, speed, dir){
        if (!this.m_Power) return
        this.m_Antennas[antenna].fastSpeed = speed 
        this.m_Antennas[antenna].fastDir = dir
    }

    SetData(antenna, speed, dir){
        this.m_Antennas[antenna].speed = speed 
        this.m_Antennas[antenna].dir = dir
    }

    SetSpeedLock(antenna, speed, dir, type){
        this.m_Antennas[antenna].locked[type] = {locked: true, speed : speed, dir: dir}

        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaLock", antenna, true)
    }

    SetLimit(value){
        if (value <= 0 || value > 999) value = false
        this.m_Limit = value
    }

    ResetSpeedLock(antenna, type){
        this.m_Antennas[antenna].locked[type] = null 
        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaLock", antenna, false)
    }

    SetPatrolSpeed(speed){
        if (!this.m_Power) return
        this.m_PatrolSpeed = speed
    }

    SetXmit(antenna, state){
        if (!this.m_Power) return

       
        this.m_Antennas[antenna].xmit = state 
        
        this.TriggerEvent("PoliceRadar::CEF::Event", "antennaXmit", antenna,  state)
    }

    SetScale(value){
        this.TriggerEvent("PoliceRadar::CEF::Event", "radarScale", value)
    }

    SetPosition(x, y){
        this.TriggerEvent("PoliceRadar::CEF::Event", "radarPosition", x, y)
    }

    GetLimit(){
        return this.m_Limit
    }

    GetState(){
        return this.m_PowerState
    }

    GetRelativeDirection(from, to){
        let difference = Math.abs( ( from - to + 180 ) % 360 - 180 )
        if ( difference < 45 )
            return 1
        else if ( difference > 135 )
            return 2
        return 0
    }

    
    IsSpeedLocked(antenna, type){
        return this.m_Antennas[antenna].locked[type]
    }

    IsAnyTypeSpeedLocked(antenna){
        return this.m_Antennas[antenna].locked[1] ||  this.m_Antennas[antenna].locked[2] 
    }

    IsAntennaTransmitting(antenna){
        return this.m_Antennas[antenna].xmit
    }

    IsFastEnabled(){
        return this.m_Fast
    }

    IsVehicleForAntenna(antenna, rayType){
        let mode = this.m_Antennas[antenna].mode
        if ( ( mode == 3 ) || ( mode == 1 && rayType == "same" ) || ( mode == 2 && rayType == "opp" ) ) 
            return true
        return false
    }

    PlaySound(name, volume=1){
        this.TriggerEvent("PoliceRadar::CEF::Event", "audio", name, volume)
    }

    destructor(){
        mp.events.remove("PoliceRadar::CEF::OnClick", this.m_hkClick)
        mp.events.remove("PoliceRadar::CEF::OnScroll", this.m_hkScroll)
    }
}

function DisplayManager(core){
    return new Display(core)
}
}