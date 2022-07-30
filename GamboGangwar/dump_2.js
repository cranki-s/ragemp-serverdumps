mp.gui.chat.show(false);
const chatbox = mp.browsers.new('package://chat/chat-ui/index.html');
chatbox.markAsChat();
require('./client.js');
require('./cef/login/login.js');
require('./cef/mainmenu/mainmenu.js');
require('./cef/hud/hud.js');
require('./cef/garage/garage.js');
require('./weapon.js');
require('./weapondamage.js');
require('./hotkeys.js');
require('./anticheat.js');