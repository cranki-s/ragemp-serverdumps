{
/*
 * Autor: rootcause
 */

require("/LURP/sistemas/scaleform/Scaleform.js"); //
var messageScaleform = require("/LURP/sistemas/scaleform/BasicScaleform.js");
require("/LURP/sistemas/scaleform/BigMessage.js");
require("/LURP/sistemas/scaleform/MidsizedMessage.js");

mp.game.ui.messages = {
    showShard: (title, message, titleColor, bgColor, time = 3000) => mp.events.call("ShowShardMessage", title, message, titleColor, bgColor, time),
    showWeaponPurchased: (title, weaponName, weaponHash, time = 3000) => mp.events.call("ShowWeaponPurchasedMessage", title, weaponName, weaponHash, time),
    showPlane: (title, planeName, planeHash, time = 3000) => mp.events.call("ShowPlaneMessage", title, planeName, planeHash, time),
    showMidsized: (title, message, time = 3000) => mp.events.call("ShowMidsizedMessage", title, message, time),
    showMidsizedShard: (title, message, bgColor, useDarkerShard, condensed, time = 3000, playSound = true) => mp.events.call("ShowMidsizedShardMessage", title, message, bgColor, useDarkerShard, condensed, time, playSound)
};

}