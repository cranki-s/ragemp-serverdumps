{
//VARS
state = true;
//FUCTIONS

mp.keys.bind(0x21, true, function() {         //Page up Will show up the Position
    mp.events.add('render', (player) => {
     const playerPos = mp.players.local.position
      mp.game.graphics.drawText("POS x: "+ Math.round(playerPos.x * 100) / 100 + " y: " + Math.round(playerPos.y * 100) / 100 + " z: " + Math.round(playerPos.z * 100) / 100, [0.5, 0.005], 
      {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [1.0, 1.0],
        outline: true
      });
     });
     
    return;
});

mp.keys.bind(0x22, true, function() {         //Page down will remove the position
    mp.game.graphics.removeText();
    
    return;
});

}