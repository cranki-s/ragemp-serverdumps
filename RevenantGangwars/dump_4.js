{
const util = require("util");
const maxStringLength = 99;

mp.events.add("showNotification", (message) => {
    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.drawNotification(false, true);
});

mp.events.add("showPictureNotification", (title, sender, message, picName) => {
    util.loadTextureDict(picName);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.setNotificationMessage(picName, picName, false, 0, title, sender);
    mp.game.ui.drawNotification(false, true);
});
}