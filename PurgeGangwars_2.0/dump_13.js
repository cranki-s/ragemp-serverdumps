{
mp.gui.chat.colors = true;
function capitalizeFirstLetter(string) {
  if(string)
  return string.charAt(0).toUpperCase() + string.slice(1);
};
mp.events.add('Send_ToChat', (player, message, playerID, gangName, gangColor, adminLevel) =>{
  if(message.toUpperCase() == ('nigger').toUpperCase()){
    message = "";
  }
  if(adminLevel > 4) {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#f0d473}Owner !{#f0d473}${player.name}[${playerID}]!{#white}: ${message}`);
  }
  else if(adminLevel > 3) {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#9001F3}Developer !{#9001F3}${player.name}[${playerID}]!{#BCBCBC}: ${message}`);
  }
  else if(adminLevel > 2) {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#9001F3}GM !{#9001F3}${player.name}[${playerID}]!{#BCBCBC}: ${message}`);
  }
  else if(adminLevel > 1) {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#9001F3}Administrator !{#9001F3}${player.name}[${playerID}]!{#BCBCBC}: ${message}`);
  }
  else if(adminLevel > 0) {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#9001F3}Moderator !{#9001F3}${player.name}[${playerID}]!{#BCBCBC}: ${message}`);
  }
  else {
    mp.gui.chat.push(`!{#4B4B4B}[${gangColor}${capitalizeFirstLetter(gangName)}!{#4B4B4B}] !{#6A6A6A}${player.name}[${playerID}]!{#BCBCBC}: ${message}`);
  }
});
}