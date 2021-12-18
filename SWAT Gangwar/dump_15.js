{
var messageScaleform = require("cef/messages/Scaleform.js");
require("cef/messages/Message.js");

mp.game.ui.messages = {
    showShard: (title, message,SoundName, SoundSetName, titleColor, bgColor, time = 5000) => mp.events.call("ShowShardMessage", title, message,SoundName, SoundSetName, titleColor, bgColor, time),
    showWeaponPurchased: (title, weaponName, weaponHash, SoundName, SoundSetName, time = 5000) => mp.events.call("ShowWeaponPurchasedMessage", title, weaponName, weaponHash, SoundName, SoundSetName, time),
    showPlane: (title, planeName, planeHash, SoundName, SoundSetName, time = 5000) => mp.events.call("ShowPlaneMessage", title, planeName, planeHash, SoundName, SoundSetName, time),
    showMidsized: (title, message, SoundName, SoundSetName, time = 5000) => mp.events.call("ShowMidsizedMessage", title, message, SoundName, SoundSetName, time),
    showMidsizedShard: (title, message, SoundName, SoundSetName, bgColor, useDarkerShard, condensed, time = 5000) => mp.events.call("ShowMidsizedShardMessage", title, message, SoundName, SoundSetName, bgColor, useDarkerShard, condensed, time)
};
}