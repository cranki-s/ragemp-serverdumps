{
let rampKey = 324, // X
    hookKey = 131; // Left Shift

let player = mp.players.local

function createBed(veh) {
	try{
  return new Promise((resolve, reject) => {
    let bedRot = veh.getRotation(2)
    let tempPos = veh.position
    tempPos.z += 15
    veh.bed = mp.objects.new(mp.game.joaat('imp_prop_flatbed_ramp'), tempPos, {rotation: {x: 14-bedRot.x, y: bedRot.y, z: bedRot.z + 180}, dimension: player.dimension})
    veh.bed.streamingRange = 500
    veh.bed.state = 0
    
  });
	}
	catch{}
}

let keypressCheck;

mp.events.add('client::flatbed:setstate', () => {
	let flatbed = player.vehicle
	flatbed.bed.rope == null;
	flatbed.bed.moving = false;
	flatbed.bed.state = 0;
	attachToBed(flatbed, false)
    clearInterval(syncInterval)
    syncInterval = null
	mp.events.callRemote('fbAttachVehicle', flatbed.remoteId, false)
});

function checkForKeypress(toggle) {
  if (!toggle) {
    clearInterval(keypressCheck)
    keypressCheck = null
    return
  }

  if (keypressCheck == null) {
    // same as render event
    keypressCheck = setInterval(() => {
      let flatbed = player.vehicle
      if (mp.game.controls.isControlJustPressed(0, rampKey)) {
        if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.rope == null) {
          if (flatbed.bed.state == 0) {
            mp.events.callRemote('fbSetState', flatbed, 1)
            extendBed(flatbed)
            
          } else if (flatbed.bed.state == 1) {
            mp.events.callRemote('fbSetState', flatbed, 0)
            retractBed(flatbed)
          }
        }
      }

      if (mp.game.controls.isControlJustPressed(0, hookKey)) {
        if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.state == 1
          && flatbed.bed.rope == null && !flatbed.attachedVehicle) {
          let targetVeh = getTargetVehicle(flatbed)
          if (targetVeh) {
            mp.events.callRemote('fbAttachRope', flatbed, targetVeh)
            attachRope(flatbed, targetVeh)
            setTimeout(async () => {
              mp.events.callRemote('fbWindRope', flatbed)
              let windingSuccess = await windRope(flatbed)
              if (windingSuccess) {
                if (attachToBed(flatbed, targetVeh)) {
					
                  mp.events.callRemote('fbAttachVehicle', flatbed.remoteId, targetVeh.remoteId)
                  startSyncIntervalForVeh(targetVeh)
                }
              
              }
              mp.events.callRemote('fbAttachRope', flatbed, false)
            }, 1000);
          }

        } else if (isDrivingFlatbed() && flatbed.attachedVehicle && !flatbed.bed.moving && flatbed.bed.state == 1) {
          mp.events.callRemote('fbAttachVehicle', flatbed.remoteId, false)
          attachToBed(flatbed, false)

          clearInterval(syncInterval)
          syncInterval = null
        }
      }
    }, 0);
  }
}

let syncInterval;
function startSyncIntervalForVeh(veh) {
  if (syncInterval != null) return

  syncInterval = setInterval(() => {
	  try{
     if (isDrivingFlatbed() && player.vehicle.getVariable('fbAttachVehicle') == veh.remoteId) {
      mp.events.callRemote('fbSyncPosition', veh.remoteId, JSON.stringify(veh.position), JSON.stringify(veh.getRotation(2)))

    } else {
      clearInterval(syncInterval)
      syncInterval = null
    }
	  }
	  catch{ }
  }, 1000)
}

function extendBed(flatbed) {
  let y = -3, z = -0.48, rotX = 14;
  let toY = -8.6, toZ = -1.24, toRotX = 0;
  flatbed.bed.moving = true;

  // audio
  let sound = mp.game.invoke('0x430386FE9BF80B45') // getSoundId
  mp.game.audio.playSoundFromEntity(sound, "OPENING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

  let render = new mp.Event('render', ()=> {
    if (!flatbed.bed) {
      return render.destroy()
    }
    
    if (y > toY) {
      y = parseFloat((y - 0.05).toFixed(2))

    // after y finish transition
    }
    if (y <= toY) {
      if (z > toZ) {
        z = parseFloat((z - 0.04).toFixed(2))
      }

      if (rotX > toRotX) {
        rotX = parseFloat((rotX - 0.8).toFixed(2))
      }
      
    }
    flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0,y,z, rotX,0,180, true, false, true, false,0,true)
    if (y <= toY && z <= toZ && rotX <= toRotX) {
      flatbed.bed.moving = false;
      flatbed.bed.state = 1
      render.destroy()
      mp.game.audio.stopSound(sound)
    }
    
  })
}

function retractBed(flatbed) {
  let y = -8.6, z = -1.24, rotX = 0;
  let toY = -3, toZ = -0.48, toRotX = 14;
  flatbed.bed.moving = true;

  // audio
  let sound = mp.game.invoke('0x430386FE9BF80B45') // getSoundId
  mp.game.audio.playSoundFromEntity(sound, "CLOSING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

  let render = new mp.Event('render', ()=> {
    if (!flatbed.bed) {
      return render.destroy()
    }

    if (z < toZ) {
      z = parseFloat((z + 0.04).toFixed(2))
    }

    if (rotX < toRotX) {
      rotX = parseFloat((rotX + 0.8).toFixed(2))
    }
    
    // after z and rotX finish transition
    if (z >= toZ && rotX >= toRotX) {
      if (y < toY) {
        y = parseFloat((y + 0.05).toFixed(2))
      }
    }

    flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0,y,z, rotX,0,180, true, false, true, false,0,true)
    if (y >= toY && z >= toZ && rotX >= toRotX) {
      flatbed.bed.moving = false;
      flatbed.bed.state = 0
      render.destroy()
      mp.game.audio.stopSound(sound)
    }
    
  })
}

mp.events.add({
  async entityStreamIn(e) {
	  try{    if (e.type == 'vehicle' && e.model == mp.game.joaat('flatbed')) {
      await createBed(e)
      if (e.getVariable('fbState') === 1) extendBed(e)

      if (typeof e.getVariable('fbAttachRope') == 'number') {
        let vehID = e.getVariable('fbAttachRope')
        let veh = mp.vehicles.atRemoteId(vehID)
        if (veh)
          attachRope(e, veh)
      }

      if (typeof e.getVariable('fbAttachVehicle') == 'number') {
        let veh = await waitFor(mp.vehicles.atRemoteId(e.getVariable('fbAttachVehicle')))
        veh.setCollision(false, true)
        if (veh)
          attachToBed(e, veh)
      }
    }
	  }
	  catch{}
  },
  
  entityStreamOut(e) {
	  try{
    if (e.type == 'vehicle' && e.model == mp.game.joaat('flatbed')) {
      if (e.bed) {
        if (e.bed.sound != null)
          mp.game.audio.stopSound(e.bed.sound)
        
        if (e.bed.rope != null)
          mp.game.rope.deleteRope(e.bed.rope)
        
        e.bed.destroy()
        delete e.bed
        
        if (e.attachedVehicle)
          delete e.attachedVehicle
      }
    }
	  }
	  catch{}
  },

  playerEnterVehicle(v, seat) {
    if (v.model != mp.game.joaat('flatbed')) return
    checkForKeypress(true)

    if (seat === -1 && typeof v.getVariable('fbAttachVehicle') == 'number')
      startSyncIntervalForVeh(mp.vehicles.atRemoteId(v.getVariable('fbAttachVehicle')))
  },

  playerLeaveVehicle(v) {
    if (!v) return // vehicle destroyed
    if (v.model != mp.game.joaat('flatbed')) return
    checkForKeypress(false)
  }
})

// sync code
mp.events.addDataHandler('fbState', (fb, state)=> {
  if (fb.handle == 0 || (fb == player.vehicle && player.seat == -1)) return
  if (state == 1)
    extendBed(fb)
  else
    retractBed(fb)
})

function getTargetVehicle(flatbed) {
  let from = flatbed.bed.getOffsetFromInWorldCoords(0, 2,1)
  let to = flatbed.bed.getOffsetFromInWorldCoords(0, 4, 0.7)
  let raycast = mp.raycasting.testPointToPoint(from, to, null, 2)
  let targetVeh = raycast && raycast.entity && raycast.entity.type == 'vehicle'? raycast.entity : null
  return targetVeh
}

function isDrivingFlatbed() {
  return player.vehicle && player.vehicle.model == mp.game.joaat('flatbed')
  && player.vehicle.getPedInSeat(-1) == player.handle
}

function isVehicleFacingFlatbed(veh, fb) {
  let direction = veh.getForwardVector()
  direction = new mp.Vector3(direction.x, direction.y, direction.z)
  let fbPos = new mp.Vector3(fb.position.x, fb.position.y, fb.position.z)
  let vehPos = new mp.Vector3(veh.position.x, veh.position.y, veh.position.z)

  function angle(from, to) {
    let dot = from.unit().dot(to.unit())
    return Math.acos(dot) * (180 / Math.PI)
  }

  return angle(direction, fbPos.subtract(vehPos)) < 90
}

function getVehicleHook(veh, forward) {
	try{
  if (forward) {
    if (veh.getBoneIndexByName('neon_f') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_f'))
    
    } else if (veh.getBoneIndexByName('bumper_f') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_f'))
    
    } else if (veh.getBoneIndexByName('engine') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('engine'))
    
    } else {
      let pos = closestVeh.position
      let forwardVec = closestVeh.getForwardVector()
      return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z+forwardVec.z)
    }

  } else {
    if (veh.getBoneIndexByName('neon_b') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_b'))
    
    } else if (veh.getBoneIndexByName('bumper_r') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_r'))
    
    } else if (veh.getBoneIndexByName('trunk') > -1) {
      return veh.getWorldPositionOfBone(veh.getBoneIndexByName('trunk'))
    
    } else {
      let pos = closestVeh.position
      let forwardVec = closestVeh.getForwardVector()
      return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z+forwardVec.z)
    }
  }
	}
	catch{}
}

function playSound(flatbed, sound) {
  let id = -1
  if (sound != 'OPENED')
    id = mp.game.invoke('0x430386FE9BF80B45') // getSoundId
  mp.game.audio.playSoundFromEntity(id, sound, flatbed.bed.handle, "DOOR_GARAGE", false, 0);
  if (id > -1) flatbed.bed.sound = id
  return id
}

function attachRope(flatbed, targetVeh) {
  if (!flatbed.handle) return

  if (targetVeh === false) {
    if (flatbed.bed.rope == null) return
    mp.game.rope.deleteRope(flatbed.bed.rope)
    delete flatbed.bed.rope

    return
  }

  if (!targetVeh.handle) return

  let anchorPos = flatbed.getOffsetFromInWorldCoords(0,-5.9, 0.6)
  anchorPos = new mp.Vector3(anchorPos.x, anchorPos.y, anchorPos.z)

  let isForward = isVehicleFacingFlatbed(targetVeh, flatbed)
  let hookPos = getVehicleHook(targetVeh, isForward)
  hookPos = new mp.Vector3(hookPos.x, hookPos.y, hookPos.z)
  let dist = anchorPos.subtract(hookPos).length()
  
  mp.game.invoke('0x9B9039DBF2D258C1') // loadRopeTextures
  let rope = mp.game.invoke('0xE832D760399EB220', anchorPos.x, anchorPos.y, anchorPos.z, 0,0,0, dist, 6, dist, 0.1, 0.5, false, false, true, 1.0, false, 0) // addRope
  flatbed.bed.rope = rope
  mp.game.rope.attachEntitiesToRope(rope, flatbed.handle, targetVeh.handle, anchorPos.x, anchorPos.y, anchorPos.z, hookPos.x, hookPos.y, hookPos.z, dist,false, false, 0, 0)
  mp.game.invoke('0x710311ADF0E20730', rope)  // activatePhysics
  return rope
}

function windRope(flatbed) {
  return new Promise((resolve, reject) => {
    if (!flatbed.handle) return
    
    let rope = flatbed.bed.rope
    mp.game.rope.startRopeWinding(rope)
    let sound = playSound(flatbed, 'CLOSING')

    let startTime = Date.now()
    let interval = setInterval(() => {
      if (!flatbed.handle) return clearInterval(interval)

      // if rope winding takes more than 15 seconds, its stuck
      if (Date.now() - startTime >= 15000) {
        clearInterval(interval)
        mp.game.rope.stopRopeWinding(rope)
        mp.game.audio.stopSound(sound)
        delete flatbed.bed.sound
        attachRope(flatbed, false) // delete rope
        return resolve(false)
      }

      if (flatbed.bed.rope == null) {
        clearInterval(interval)
        mp.game.audio.stopSound(sound)
        delete flatbed.bed.sound
        return
      }

      if (mp.game.rope.getRopeLength(flatbed.bed.rope) <= 1) {
        clearInterval(interval)
        mp.game.rope.stopRopeWinding(rope)
        mp.game.audio.stopSound(sound)
        delete flatbed.bed.sound
        
        setTimeout(() => {
          attachRope(flatbed, false)
        }, 800);

        resolve(true)
      }
    }, 500)
  })
}

function attachToBed(flatbed, targetVeh) {
	try{
  if (!flatbed.handle || (targetVeh !== false && !targetVeh.handle)) return

  if (targetVeh === false) {
    flatbed.attachedVehicle.detach(true, false)
    delete flatbed.attachedVehicle

  } else {
    flatbed.freezePosition(true)
    let pos = targetVeh.position
    let height = targetVeh.getHeight(pos.x, pos.y, pos.z, true, false)
    if (height <= 0.924 || targetVeh.model == mp.game.joaat('taxi'))
      height += 1
    else
      height += 0.4
    let rotX = 14, rotZ = 180

    if (!isVehicleFacingFlatbed(targetVeh, flatbed)) {
      rotX *= -1
      rotZ = 0
    }
    
    targetVeh.attachTo(flatbed.bed.handle, 0, 0,0,height, rotX,0,rotZ, true, false, true, false,0,true)
    var attached = Boolean(targetVeh.isAttached())
    if (attached)
      flatbed.attachedVehicle = targetVeh
    
    setTimeout(() => {
      flatbed.freezePosition(false)
    }, 1000);
  }
  playSound(flatbed, 'OPENED')
  if (attached) return attached
	}
	catch{}
}

function waitFor(e) {
  return new Promise((resolve, reject) => {
    let time = Date.now()
    let interval = setInterval(() => {
      if (e.handle) {
        clearInterval(interval)
        resolve(e)
      }

      if (Date.now() - time >= 5000) {
        clearInterval(interval)
        resolve(null)
      }
    }, 100)
  })
}
}