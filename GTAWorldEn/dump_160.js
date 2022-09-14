{
let fireworkScenario = {
  step: 0,
  count: 0,
  x: 0,
  y: 0,
  z: 0,
  firework: undefined,
};

let fireEffect = [  
  "scr_indep_firework_sparkle_spawn",
  "scr_indep_firework_starburst",
  "scr_indep_firework_shotburst",
  "scr_indep_firework_trailburst",
  "scr_indep_firework_trailburst_spawn",
  "scr_indep_firework_burst_spawn",
  "scr_indep_firework_trail_spawn",
  "scr_indep_firework_fountain"
]

let fireEffect2 = [
  "scr_firework_indep_burst_rwb",
  "scr_firework_indep_spiral_burst_rwb",
  "scr_xmas_firework_sparkle_spawn",
  "scr_firework_indep_ring_burst_rwb",
  "scr_xmas_firework_burst_fizzle",
  "scr_firework_indep_repeat_burst_rwb"
]

mp.events.add("Firework::stop", function(firework) {
  fireworkScenario.step = 0;
  fireworkScenario.count = 0;
});

mp.events.add("Firework::launch", function (firework) {

  fireworkScenario.step = 1;
  fireworkScenario.count = 0;

  fireworkScenario.firework = firework;

  fireworkScenario.x = firework.posX;
  fireworkScenario.y = firework.posY;
  fireworkScenario.z = firework.posZ;
});

function incrementCount() {
  fireworkScenario.count++;
  if (fireworkScenario.step === 1) {
    if (fireworkScenario.count >= 60) {
      fireworkScenario.step = 2;
      fireworkScenario.count = 0;
    }
  }
  if (fireworkScenario.step === 2) {
    if (fireworkScenario.count >= 55) {
      fireworkScenario.step = 3;
      fireworkScenario.count = 0;
    }
  }
  if (fireworkScenario.step === 3) {
    if (fireworkScenario.count >= 65) {
      fireworkScenario.step = 4;
      fireworkScenario.count = 0;
    }
  }
  if (fireworkScenario.step === 4) {
    if (fireworkScenario.count >= 80) {
      fireworkScenario.step = 5;
      fireworkScenario.count = 0;
    }
  }
  if (fireworkScenario.step === 5) {
    if (fireworkScenario.count >= 100) {
      fireworkScenario.step = 0;
      fireworkScenario.count = 0;
      mp.gui.chat.push(`End.`);
      mp.events.callRemote("Firework::end", fireworkScenario.firework);
    }
  }
}

function launchFirework() {

  let direction = Math.random() < 0.5;

  let fireX;
  let fireY;
  if(direction)
  {
    fireX = fireworkScenario.x + Math.random() * 30 - Math.random() * 10;
    fireY = fireworkScenario.y + Math.random() * 30 - Math.random() * 10;
  }
  else
  {
    fireX = fireworkScenario.x - Math.random() * 30 + Math.random() * 10;
    fireY = fireworkScenario.y - Math.random() * 30 + Math.random() * 10;
  }

  let fireZ = fireworkScenario.z + 30 + Math.random() *15;

  let rotX = Math.random() * 100 - Math.random() * 100;
  let rotY = Math.random() * 100 - Math.random() * 100;
  let rotZ = Math.random() * 100 - Math.random() * 100;

  if (rotX > 45) rotX = 45;

  if (rotY > 45) rotY = 45;

  if (rotZ > 45) rotZ = 45;

  if (rotX < -45) rotX = -45;

  if (rotY < -45) rotY = -45;

  if (rotZ < -45) rotZ = -45;
  
  let style = Math.random() < 0.5;

  if(style)
  {
    if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_indep_fireworks")) {
          mp.game.streaming.requestNamedPtfxAsset("scr_indep_fireworks");
    }
    
    let randomEffect = fireEffect[Math.floor(Math.random() * fireEffect.length)];

    mp.game.graphics.setPtfxAssetNextCall("scr_indep_fireworks");
    let fxID = mp.game.graphics.startParticleFxNonLoopedAtCoord(
      randomEffect,
      fireX,
      fireY,
      fireZ,
      rotX,
      rotY,
      rotZ,
      1,
      false,
      false,
      false);

  }
  else
  {
    if (!mp.game.streaming.hasNamedPtfxAssetLoaded("proj_indep_firework_v2")) {
      mp.game.streaming.requestNamedPtfxAsset("proj_indep_firework_v2");
    }

    let randomEffect = fireEffect2[Math.floor(Math.random() * fireEffect2.length)];

    mp.game.graphics.setPtfxAssetNextCall("proj_indep_firework_v2");
    let fxID = mp.game.graphics.startParticleFxNonLoopedAtCoord(
      randomEffect,
      fireX,
      fireY,
      fireZ,
      rotX,
      rotY,
      rotZ,
      1,
      false,
      false,
      false);
  }

  incrementCount();
}

setInterval(() => {
  let step = fireworkScenario.step;

  if (step === 3) {
    if (fireworkScenario.count >= 25 && fireworkScenario.count <= 45) {
      launchFirework();
    }
  }
  if (step === 5) {
    if (fireworkScenario.count > 20 && fireworkScenario.count <= 95) {
      launchFirework();
    }
  }
}, 200);

setInterval(() => {
  let step = fireworkScenario.step;

  if (step === 2) {
    if (fireworkScenario.count > 15 && fireworkScenario.count < 35) {
      launchFirework();
    }
  }

  if (step === 3) {
    if (fireworkScenario.count < 25) {
      launchFirework();
    }
  }
  if (step === 4) {
    if (fireworkScenario.count > 15 && fireworkScenario.count < 35) {
      launchFirework();
    }
  }
  if (step === 5) {
    if (fireworkScenario.count < 15) {
      launchFirework();
    }
  }
}, 400);

setInterval(() => {
  let step = fireworkScenario.step;

  if (step === 1) {
    if (fireworkScenario.count >= 25 && fireworkScenario.count <= 50) {
      launchFirework();
    }
  }
  if (step === 4) {
    if (fireworkScenario.count <= 15 || fireworkScenario.count >= 45) {
      launchFirework();
    }
  }
  if(step === 2)
  {
    if(fireworkScenario.count > 40){
      launchFirework();
    }
  }
}, 500);

setInterval(() => {
  let step = fireworkScenario.step;

  if (step === 2) {
    if (fireworkScenario.count <= 15) {
      launchFirework();
    }
  }
  if (step === 3) {
    if (fireworkScenario.count > 45) {
      launchFirework();
    }
  }
}, 1000);

setInterval(() => {
  let step = fireworkScenario.step;

  if (step === 1) {
    if (fireworkScenario.count < 25 || fireworkScenario.count > 50) {
      launchFirework();
    }
  }
  if (step === 4) {
    if (fireworkScenario.count >= 35 && fireworkScenario.count < 45) {
      launchFirework();
    }
  }

  if (step === 2) {
    if (fireworkScenario.count >= 35 && fireworkScenario.count <= 40) {
      launchFirework();
    }
  }

  if (step === 5) {
    if (fireworkScenario.count >= 15 && fireworkScenario.count <= 20) {
      launchFirework();
    }
  }

  if (step === 5) {
    if (fireworkScenario.count > 95) {
      launchFirework();
    }
  }
}, 2000);

}