{
hookKey = 354; // Left Shift

let player = mp.players.local

mp.events.add("playerReady", (player) => {
    mp.game.vehicle.setExperimentalAttachmentSyncEnabled(true);
});

let keypressCheck;
function checkForKeypress(toggle) {
    if (!toggle) {
        clearInterval(keypressCheck)
        keypressCheck = null
        return
    }
    if (keypressCheck == null) {
        keypressCheck = setInterval(() => {
            let flatbed = player.vehicle
            let from = flatbed.getOffsetFromInWorldCoords(0, -10, 0)
            let to = flatbed.getOffsetFromInWorldCoords(0, -14, -1)
           // mp.game.graphics.drawLine(from.x, from.y, from.z, to.x, to.y, to.z, 255, 255, 255, 255);
            if (mp.game.controls.isControlJustPressed(0, hookKey)) {
                if (isDrivingFlatbed() && flatbed.rope == null && !flatbed.attachedVehicle) {

                    let bone = flatbed.getBoneIndexByName('misc_a');
                    let bonePos = flatbed.getWorldPositionOfBone(bone);

                    let dist = vehicle.getOffsetFromGivenWorldCoords(bonePos.x, bonePos.y, bonePos.z);

                    if (dist.y > -8) return;

                    let targetVeh = getTargetVehicle(flatbed)
                    if (targetVeh) {
                        mp.events.callRemote('fbAttachRope', flatbed, targetVeh)
                        attachRope(flatbed, targetVeh)
                        setTimeout(async () => {
                            mp.events.callRemote('fbWindRope', flatbed)
                            let windingSuccess = await windRope(flatbed)
                            if (windingSuccess) {
                                mp.events.callRemote('fbAttachVehicle', flatbed.remoteId, targetVeh.remoteId)
                                attachToBed(flatbed, targetVeh);
                                startSyncIntervalForVeh(targetVeh)
                            }
                            mp.events.callRemote('fbAttachRope', flatbed, false)
                        }, 1000);
                    }

                } else if (isDrivingFlatbed() && flatbed.attachedVehicle) {
                    mp.events.callRemote('fbAttachVehicle', flatbed.remoteId, false)
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
        if (isDrivingFlatbed() && player.vehicle.getVariable('fbAttachVehicle') == veh.remoteId) {
            mp.events.callRemote('fbSyncPosition', veh.remoteId, JSON.stringify(veh.position), JSON.stringify(veh.getRotation(2)))
        } else {
            clearInterval(syncInterval)
            syncInterval = null
        }
    }, 1000)
}




mp.events.add({
    async entityStreamIn(e) {
        if (e.hasVariable("attachedToFlatbed") && e.getVariable("attachedToFlatbed")) {
            e.setCollision(false, true);


        }
        if (e.type == 'vehicle' && e.model == mp.game.joaat('flatbed3')) {


            if (typeof e.getVariable('fbAttachRope') == 'number') {
                let vehID = e.getVariable('fbAttachRope')
                let veh = mp.vehicles.atRemoteId(vehID)
                if (veh)
                    attachRope(e, veh)
            }

            if (typeof e.getVariable('fbAttachVehicle') == 'number') {
                let veh = await waitFor(mp.vehicles.atRemoteId(e.getVariable('fbAttachVehicle')))
                veh.setCollision(false, true)
                if (e.hasVariable("SyncPosition")) {
                    if (e.getNumberOfPassengers() === 0) {
                        e.position = e.getVariable("SyncPosition");
                    }
                }
                if (veh)
                    loadTargetAttached(e, veh, function () {
                        attachToBedv2(e, veh, e.getVariable("attachedFlatBedPosition"))

                    })

            }
        }
    },

    entityStreamOut(e) {
        if (e.type == 'vehicle' && e.model == mp.game.joaat('flatbed3')) {


            let veh = null
            if (typeof e.getVariable('fbAttachVehicle') == 'number') {
                veh = mp.vehicles.atRemoteId(e.getVariable('fbAttachVehicle'));

            }

            if (e.rope != null && veh != null) {
                mp.game.rope.detachRopeFromEntity(e.result, veh.handle)
                mp.game.rope.deleteRope(e.rope)


            }

            if (e.attachedVehicle)
                delete e.attachedVehicle
        }

    },




    playerEnterVehicle(v, seat) {
        if (v.model != mp.game.joaat('flatbed3')) return
        checkForKeypress(true)

        if (seat === -1 && typeof v.getVariable('fbAttachVehicle') == 'number')
            startSyncIntervalForVeh(mp.vehicles.atRemoteId(v.getVariable('fbAttachVehicle')))
    },

    playerLeaveVehicle(v) {
        if (!v) return // vehicle destroyed
        if (v.model != mp.game.joaat('flatbed3')) return
        checkForKeypress(false)
    }
})

function loadTargetAttached(a, b, c) {
    if (b.getAttachedTo() === a.handle && b.handle !== 0) return void c();
    let d = setInterval(function () {

        if (b.getAttachedTo() !== a.handle && b.handle !== 0) {
            c();

        }
        else {

            clearInterval(d);
            b.setCollision(true, true);
        }

    }, 500)
}


function loadTargetDeAttached(a, b, c) {
    if (b.getAttachedTo() !== a.handle && b.handle !== 0) return void c();
    let d = setInterval(function () {

        if (b.getAttachedTo() === a.handle && b.handle != 0) {
            c();
            clearInterval(d);
            delete a.attachedVehicle

        }

    }, 100)
}



function getTargetVehicle(flatbed) {


    let from = flatbed.getOffsetFromInWorldCoords(0, -10, 0)
    let to = flatbed.getOffsetFromInWorldCoords(0, -14, -1)
    let raycast = mp.raycasting.testPointToPoint(from, to, null, 2)

    let targetVeh = raycast && raycast.entity && raycast.entity.type == 'vehicle' ? raycast.entity : null
    return targetVeh
}

function isDrivingFlatbed() {
    return player.vehicle && player.vehicle.model == mp.game.joaat('flatbed3')
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
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z)
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
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z)
        }
    }
}



function attachRope(flatbed, targetVeh) {
    if (!flatbed.handle) return

    if (targetVeh === false) {
        if (flatbed.rope == null) return
        mp.game.rope.detachRopeFromEntity(flatbed.rope.result, flatbed.handle)
        mp.game.rope.deleteRope(flatbed.rope)
        delete flatbed.rope

        return
    }

    if (!targetVeh.handle) return



    let anchor = flatbed.getBoneIndexByName('misc_b');
    let anchorPos = flatbed.getWorldPositionOfBone(anchor);
    anchorPos = new mp.Vector3(anchorPos.x, anchorPos.y, anchorPos.z)

    let isForward = isVehicleFacingFlatbed(targetVeh, flatbed)
    let hookPos = getVehicleHook(targetVeh, isForward)
    hookPos = new mp.Vector3(hookPos.x, hookPos.y, hookPos.z)
    let dist = anchorPos.subtract(hookPos).length()

    // loadRopeTextures
    mp.game.invoke('0x44395B87A17466E1')
    let rope = mp.game.rope.addRope(anchorPos.x, anchorPos.y, anchorPos.z, 0, 0, 0, dist, 6, dist, 0.1, 0.5, false, false, true, 1.0, false, 0) // addRope

    flatbed.rope = rope
    mp.game.rope.attachEntitiesToRope(rope.result, flatbed.handle, targetVeh.handle, anchorPos.x, anchorPos.y, anchorPos.z, hookPos.x, hookPos.y, hookPos.z, dist, false, false, 0, 0)
    mp.game.invoke('0xAA8C46C452582702', rope.result)  // activatePhysics
    return rope
}

function windRope(flatbed) {
    return new Promise((resolve, reject) => {
        if (!flatbed.handle) return

        let rope = flatbed.rope
        mp.game.rope.startRopeWinding(rope.result)


        let startTime = Date.now()
        let interval = setInterval(() => {
            if (!flatbed.handle) return clearInterval(interval)

            // if rope winding takes more than 15 seconds, its stuck
            if (Date.now() - startTime >= 20000) {
                clearInterval(interval)
                mp.game.rope.stopRopeWinding(rope.result)
                attachRope(flatbed, false) // delete rope
                return resolve(false)
            }

            if (flatbed.rope == null) {
                clearInterval(interval)
                return
            }

            if (mp.game.rope.getRopeLength(flatbed.rope.result) <= 1) {
                clearInterval(interval)
                mp.game.rope.stopRopeWinding(rope.result)

                setTimeout(() => {
                    attachRope(flatbed, false)
                }, 800);

                resolve(true)
            }
        }, 500)
    })
}

function attachToBed(flatbed, targetVeh) {

    if (!flatbed.handle || (targetVeh !== false && !targetVeh.handle)) return

    flatbed.freezePosition(true)

    rotZ = 0

    if (!isVehicleFacingFlatbed(targetVeh, flatbed)) {
        rotZ = 180
    }
    else rotZ = 0

    let bonePosition = flatbed.getWorldPositionOfBone(flatbed.getBoneIndexByName('misc_a'));

    let posToAttached = targetVeh.getOffsetFromGivenWorldCoords(bonePosition.x, bonePosition.y, bonePosition.z)

    mp.events.callRemote('attachedFlatBedPosition', flatbed.remoteId, `${-posToAttached.z}|${rotZ}|${targetVeh.remoteId}`)
}


mp.events.addDataHandler("fbAttachVehicle", async (entity, value, oldvalue) => {
    if (value === false) {
        if (entity.handle !== 0 && entity.attachedVehicle.handle !== 0) {
            loadTargetDeAttached(entity, entity.attachedVehicle, function () {

                entity.attachedVehicle.detach(true, false)

            });
        }

    }
});




mp.events.addDataHandler("attachedFlatBedPosition", async (entity, value) => {
    if (entity.type === "vehicle") {
        posRot = value.split('|');
        let veh = await waitFor(mp.vehicles.atRemoteId(Number(posRot[2])))

        attachToBedv2(entity, veh, value);
    }
});

async function attachToBedv2(flatbed, vehicle, positionZ) {
    if (flatbed.handle > 0 && vehicle.handle > 0) {
        posRot = positionZ.split('|');
        loadTargetAttached(flatbed, vehicle, function () {
            vehicle.attachTo(flatbed.handle, flatbed.getBoneIndexByName('misc_a'), 0, 1, Number(posRot[0]), 0, 0, Number(posRot[1]), true, false, true, false, 0, true)

        })

        flatbed.attachedVehicle = vehicle;

            setTimeout(() => {
                flatbed.freezePosition(false)
            }, 1000);
 
    }
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