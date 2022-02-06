{
﻿//Unused for now! 17/06/2021 - Strobe

function setWeapon(ped, weaponHash){
    return mp.game.invoke("0xADF692B254977C0C", ped.handle, parseInt(weaponHash) >> 0, 1)
}

function hasWeapon(ped, weaponHash){
	return mp.game.invoke("0x8DECB02F88F428BC", ped.handle, parseInt(weaponHash) >> 0, 0)
}

function setWeaponForceTest(ped, weaponHash){
	return mp.game.invoke("0xBF0FD6E56C964FCB", ped.handle, parseInt(weaponHash) >> 0, 0, 0, 1)
}


let TICK_RATE = 1000
class WeaponSync{
    constructor(){
        //this.m_PulseTimer = setInterval(this.Event_OnPulse.bind(this), TICK_RATE)
    }

    Event_OnPulse(){
        try{
            mp.players.forEachInStreamRange( player => {
                if (player.handle == 0) return 
                if (player == mp.players.local) return
                let data = player.getVariable("Weapon::CurrentWeapon")
                if (typeof data == "undefined") return 
                if (data.length == 0) return 
                mp.gui.chat.push(weapon)
                setWeapon(player.handle, weapon)
            })
        } catch{

        }
    }

}

new WeaponSync()

}憘溹Į