{
/*****************************************************************************************
* Name:        Flashlight Fix for RAGE:MP                                                *
* Author:      schotobi <gnu-gpl3@schoto.bi>                                             *
* Version:     1.0                                                                       *
* Description: Fixes the flashlight sync issue in RAGE:MP using draw spotlight functions *
*                                                                                        *
******************************************************************************************
* License:     This program is free software: you can redistribute it and/or modify      *
*              it under the terms of the GNU General Public License as published by      *
*              the Free Software Foundation, either version 3 of the License, or         *
*              (at your option) any later version.                                       *
*                                                                                        *
*              This program is distributed in the hope that it will be useful,           *
*              but WITHOUT ANY WARRANTY; without even the implied warranty of            *
*              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the              *
*              GNU General Public License for more details.                              *
*                                                                                        *
*              You should have received a copy of the GNU General Public License         *
*              along with this program.  If not, see <https://www.gnu.org/licenses/>.    *
*****************************************************************************************/

let flashlights = [];
let lastFlashlightEventSentDate = new Date();
const FLASHLIGHT_EVENT_RATE_THROTTLEING = 10; // Change to a higher value if server starts lagging. Shouldn't happen. Just in case. E.g. change value to 100 in order to update the flashlight every 100ms

mp.events.add("clientReceiveFlashlightCoords", (playerId, o, d) => {
    if (flashlights[playerId] !== undefined)
        clearTimeout(flashlights[playerId].removeTimer);
    
    flashlights[playerId] = {
        "origin": o,
        "destination": d,
        "removeTimer": setTimeout(() => {
            delete flashlights[playerId];
        }, (FLASHLIGHT_EVENT_RATE_THROTTLEING < 200 ? 200 : FLASHLIGHT_EVENT_RATE_THROTTLEING * 1.5))
    };
});

mp.events.add("render", () => {
    flashlights.forEach((flashlight) => {
        mp.game.graphics.drawSpotLightWithShadow(flashlight.origin.x, flashlight.origin.y, flashlight.origin.z, flashlight.destination.x, flashlight.destination.y, flashlight.destination.z, 255, 255, 255, 25, 5, 1, 20, 1, 50);
        mp.game.graphics.drawLightWithRangeAndShadow(flashlight.origin.x, flashlight.origin.y, flashlight.origin.z, 255, 255, 255, 0.4, 20, 20);
    });
    
    if (mp.players.local.weapon == mp.game.joaat("weapon_flashlight") && mp.game.player.isFreeAiming()){
        let camRot = mp.game.cam.getGameplayCamRot(0);
        let bonePos = mp.players.local.getBoneCoords(6286, 0, 0, 0);
        let forward = mp.players.local.getForwardVector();
        bonePos = new mp.Vector3(bonePos.x + forward.x * 0.5, bonePos.y + forward.y * 0.5, bonePos.z + forward.z * 0.5);
        
        let adjustedRotation = { 
            "x": (Math.PI / 180) * camRot.x, 
            "y": (Math.PI / 180) * camRot.y, 
            "z": (Math.PI / 180) * camRot.z 
        };
        
	    let direction = {
            "x": -Math.sin(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)), 
            "y": Math.cos(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)), 
            "z": Math.sin(adjustedRotation.x)
        };
        
        let curDate = new Date();
        if (curDate - lastFlashlightEventSentDate > FLASHLIGHT_EVENT_RATE_THROTTLEING){ 
            mp.events.callRemote("serverReceiveFlashlightCoords", bonePos, direction);
            lastFlashlightEventSentDate = curDate;
        } 
    }
});
}