{
const colour = { r: 127, g: 3, b: 252 }; // set this to the colour you want
const serverName = 'Purge Gang War'; // set this to the pause menu title you want

mp.events.add('playerReady', () => {
  mp.game.invoke('0xF314CF4F0211894E', 127, colour.r, colour.g, colour.b, 252); // Replace Michael colour
  mp.game.invoke('0xF314CF4F0211894E', 127, colour.r, colour.g, colour.b, 252); // Replace freemode colour
  mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});

}