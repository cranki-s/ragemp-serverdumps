{
mp.gui.chat.colors = true;
function capitalizeFirstLetter(string) {
  if(string)
  return string.charAt(0).toUpperCase() + string.slice(1);
};
mp.events.add('Send_ToChat', (player, message, playerID, gangName, gangColor, adminLevel) =>{
  if(adminLevel > 1) {
    mp.gui.chat.push(`[ADMIN]${gangColor}[${capitalizeFirstLetter(gangName)}]${player.name}[${playerID}]!{white}: ${message}`);
  }
  else if(adminLevel > 0) {
    mp.gui.chat.push(`[MOD]${gangColor}[${capitalizeFirstLetter(gangName)}]${player.name}[${playerID}]!{white}: ${message}`);
  }
  else {
    mp.gui.chat.push(`${gangColor}[${capitalizeFirstLetter(gangName)}]${player.name}[${playerID}]!{white}: ${message}`);
  }
  if(adminLevel > 4) {
    mp.gui.chat.push(`[OWNER]${gangColor}[${capitalizeFirstLetter(gangName)}]${player.name}[${playerID}]!{white}: ${message}`);
  }
});
}