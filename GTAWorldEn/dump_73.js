{
﻿var corpseList = [];
var isDragging = false;
const dictionaries = { Combat: "combat@drag_ped@", MissSolomon: "misssolomon_5@end", MaleDead: "facials@gen_male@base", FemaleDead: "facials@gen_female@base" };
const anims = { Drag: "injured_drag_plyr", GetDragged: "injured_drag_ped", LayDead: "dead_black_ops", Face: "dead_1" };

mp.events.add('create_corpse', async (_corpse) => {
    if (_corpse === null || _corpse === undefined)
        return;

    readyAnimDictionaries();

    var corpse = JSON.parse(_corpse);
    var corpseUnit = new CorpseUnit(corpse);
    corpseList.push(corpseUnit);

    // No reason to check for distance if the ped is inside a trunk.
    // We don't want to show it at that point. Also check the dimension of the corpse.
    if (corpseUnit.corpse.State !== 2 && corpseUnit.corpse.Dimension === mp.players.local.dimension) {
        var dist = corpseUnit.getDistance(corpse.Position);
        // Check if the player is within range, and create the ped accordingly
        if (dist <= 350) {
            await corpseUnit.createPed();
        }
    }
});

mp.events.add('delete_corpse', (id) => {
    if (id === null || id === undefined)
        return;

    const unit = corpseList.find(x => x.corpse.Id === id);
    if (unit !== null && unit !== undefined) {
        unit.cleanUp();
        var index = corpseList.indexOf(unit);
        if (index > -1) {
            corpseList.splice(index, 1);
        }
    }

    if (corpseList.length <= 0) {
        // Set the dictionaries as no longer needed.
        if (mp.game.streaming.hasAnimDictLoaded(dictionaries.Combat))
            mp.game.streaming.removeAnimDict(dictionaries.Combat);
        if (mp.game.streaming.hasAnimDictLoaded(dictionaries.MissSolomon))
            mp.game.streaming.removeAnimDict(dictionaries.MissSolomon);
    }
});

// This will only delete the visible ped that represent a corpse, 
// but the player still keeps track of the corpse in his or her internal list.
mp.events.add('delete_corpse_ped', (id) => {
    if (id === null || id === undefined)
        return;

    const unit = corpseList.find(x => x.corpse.Id === id);
    if (unit !== null && unit !== undefined) {
        unit.deletePed();
    }
});

mp.events.add('update_corpse_state', (id, state, handler) => {
    // Dont check for handler equal null here
    if (id === null || id === undefined)
        return;

    var corp = corpseList.find(x => x.corpse.Id === id);
    if (corp !== null && corp !== undefined) {
        corp.setState(state, handler);
    }
});

mp.events.add('send_updated_corpse_position', async (id, x, y, z, dim) => {
    const corpseUnit = corpseList.find(x => x.corpse.Id === id);

    if (corpseUnit !== null && corpseUnit !== undefined) {
        // Save pos to variable
        corpseUnit.corpse.Position = new mp.Vector3(x, y, z);
        corpseUnit.corpse.Dimension = dim;

        // Check if new position is within our streaming range
        if (corpseUnit.corpse.Position !== null && corpseUnit.corpse.Position !== undefined) {
            var dist = corpseUnit.getDistance(corpseUnit.corpse.Position);

            if (dist <= 350) {
                if (!corpseUnit.doesPedExist()) {
                    if (corpseUnit.corpse.Dimension === mp.players.local.dimension)
                        await corpseUnit.createPed();
                }
                else {
                    // In case the ped does exist and is within range, BUT the dimension is wrong. Delete the ped.
                    if (corpseUnit.corpse.Dimension !== mp.players.local.dimension) {
                        corpseUnit.deletePed();
                    }
                }
            }
            // Else if distance is greater than 350, we should delete the entity just before reaching the 500 mark,
            // or we'll lose control of it. Delete to avoid desync!
            else {
                if (corpseUnit.doesPedExist()) {
                    corpseUnit.deletePed();
                }
            }
        }
    }
});

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (leftOrRight === "right" && upOrDown === "down") {
        if (isDragging) {
            // The player pressed right click down, is dragging a corpse
            // Find the corpse
            if (corpseList === null || corpseList === undefined)
                return;

            const corp = corpseList.find(x => x.corpse.Handler === mp.players.local);
            if (corp !== null && corp !== undefined) {
                mp.events.callRemote('stop_drag_corpse', corp.corpse.Id);
            }
        }
    }
});

async function readyAnimDictionaries() {
    mp.game.streaming.requestAnimDict(dictionaries.Combat);
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(dictionaries.Combat) && i < 1500; i++) await mp.game.waitAsync(0);

    mp.game.streaming.requestAnimDict(dictionaries.MissSolomon);
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(dictionaries.MissSolomon) && i < 1500; i++) await mp.game.waitAsync(0);


    mp.game.streaming.requestAnimDict(dictionaries.MaleDead);
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(dictionaries.MaleDead) && i < 1500; i++) await mp.game.waitAsync(0);

    mp.game.streaming.requestAnimDict(dictionaries.FemaleDead);
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(dictionaries.FemaleDead) && i < 1500; i++) await mp.game.waitAsync(0);
}

class CorpseUnit {
    constructor(corpse) {
        // Corpse being the serialized class from the server containing vital information
        this.corpse = corpse;
        // Ped being the handle of the created ped
        this.ped = null;
        this.previousState = this.corpse.State;

        this.posTimer = null;
        this.distTimer = null;

        this.initDistTimer();

        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler());
    }

    onUpdateHandler() {
        // [Dragging] Sync the peds position to be infront of the handler
        if (this.doesPedExist() && this.doesHandlerExist() && this.corpse.State === 1) {
            var playerPos = this.corpse.Handler.position;
            var forward = this.corpse.Handler.getForwardVector();
            var multiplied = new mp.Vector3(forward.x * 0.5, forward.y * 0.5, forward.z * 0.5);
            var newPos = new mp.Vector3(playerPos.x + multiplied.x, playerPos.y + multiplied.y, playerPos.z + multiplied.z);
            this.ped.setCoords(newPos.x, newPos.y, newPos.z - 1, false, false, false, true);
            this.ped.setHeading(this.corpse.Handler.getHeading());
        }
    }

    async createPed() {
        this.ped = mp.peds.new(this.corpse.Model, this.corpse.Position, 270.0, this.corpse.Dimension);
        for (let i = 0; this.ped.handle == 0 && i < 1500; i++) await mp.game.waitAsync(50);
        this.setCustomization();

        // Unfrozen and setCanRagdoll are both required before the ped can be set to ragdoll mode
        this.ped.freezePosition(true);
        this.ped.setNoCollision(mp.players.local.handle, true);
        this.ped.setCanBeDamaged(false);
        this.ped.setInvincible(true);
        this.ped.setCanRagdoll(false);
        this.ped.setCanRagdollFromPlayerImpact(false);
        this.ped.setRagdollOnCollision(false);

        if (this.corpse.VehicleID != -1) {
            var vehicle = mp.vehicles.atRemoteId(this.corpse.VehicleID)
            this.ped.taskEnterVehicle(vehicle.handle, 5000, this.corpse.VehicleSeatID - 1, 2.0, 16, 0);
        }

        this.updateAction();
    }

    setOverlayColor(ped, index, type, color, secondary) {
        mp.game.invoke("0x497BF74A7B9CB952", ped.handle, index, type, color, secondary)
    }

    setCustomization() {
        if (this.corpse.Model === 2627665880 || this.corpse.Model === 1885233650) {
            this.ped.setHeadBlendData(this.corpse.BodyInfo.HeadBlend[0], this.corpse.BodyInfo.HeadBlend[1], 0, this.corpse.BodyInfo.HeadBlend[3], this.corpse.BodyInfo.HeadBlend[4], this.corpse.BodyInfo.HeadBlend[5], this.corpse.BodyInfo.HeadBlend[6], this.corpse.BodyInfo.HeadBlend[7], 0, false);

            this.ped.setHeadOverlay(0, this.corpse.BodyInfo.Surgery[0], this.corpse.BodyInfo.Surgery[1]);
            this.ped.setHeadOverlay(1, this.corpse.BodyInfo.Barber[0], this.corpse.BodyInfo.Barber[1]);
            this.setOverlayColor(this.ped, 1, 1, this.corpse.BodyInfo.Barber[0], this.corpse.BodyInfo.Barber[1])
            this.ped.setHeadOverlay(2, this.corpse.BodyInfo.Barber2[0], this.corpse.BodyInfo.Barber2[2], this.corpse.BodyInfo.Barber2[1], this.corpse.BodyInfo.Barber2[1], this.corpse.BodyInfo.Barber2[1]);
            this.setOverlayColor(this.ped, 2, 1, this.corpse.BodyInfo.Barber2[2], this.corpse.BodyInfo.Barber2[2])
            // this.ped.setHeadOverlay(2, this.corpse.BodyInfo.Barber2[0], this.corpse.BodyInfo.Barber2[1], this.corpse.BodyInfo.Barber2[2], this.corpse.BodyInfo.Barber2[2]);
            this.ped.setHeadOverlay(3, this.corpse.BodyInfo.Surgery2[0], this.corpse.BodyInfo.Surgery2[1]);
            this.ped.setHeadOverlay(6, this.corpse.BodyInfo.Surgery3[0], this.corpse.BodyInfo.Surgery3[1]);
            this.ped.setHeadOverlay(7, this.corpse.BodyInfo.Surgery4[0], this.corpse.BodyInfo.Surgery4[1]);
            this.ped.setHeadOverlay(9, this.corpse.BodyInfo.Surgery5[0], this.corpse.BodyInfo.Surgery5[1]);
            this.ped.setHeadOverlay(11, this.corpse.BodyInfo.Surgery6[0], this.corpse.BodyInfo.Surgery6[1]);
            this.ped.setHeadOverlay(12, this.corpse.BodyInfo.Surgery7[0], this.corpse.BodyInfo.Surgery7[1]);
            this.ped.setHeadOverlay(10, this.corpse.BodyInfo.Barber3[0], this.corpse.BodyInfo.Barber3[1]);
            this.ped.setHeadOverlay(4, this.corpse.BodyInfo.Tattoo[0], this.corpse.BodyInfo.Tattoo[1]);
            this.ped.setHeadOverlay(5, this.corpse.BodyInfo.Tattoo2[0], this.corpse.BodyInfo.Tattoo2[1]);
            this.ped.setHeadOverlay(8, this.corpse.BodyInfo.Tattoo3[0], this.corpse.BodyInfo.Tattoo3[1]);
            /*
                        this.ped.setHeadOverlay(10, this.corpse.BodyInfo.Barber3[0], this.corpse.BodyInfo.Barber3[1], this.corpse.BodyInfo.Barber[2]);
                        this.ped.setHeadOverlay(4, this.corpse.BodyInfo.Tattoo[0], this.corpse.BodyInfo.Tattoo[1], this.corpse.BodyInfo.Tattoo[2]);
                        this.ped.setHeadOverlay(5, this.corpse.BodyInfo.Tattoo2[0], this.corpse.BodyInfo.Tattoo2[1], this.corpse.BodyInfo.Tattoo2[2]);
                        this.ped.setHeadOverlay(8, this.corpse.BodyInfo.Tattoo3[0], this.corpse.BodyInfo.Tattoo3[1], this.corpse.BodyInfo.Tattoo3[2]);
            */
            for (var i = 0; i < 19; i++)
                this.ped.setFaceFeature(i, this.corpse.BodyInfo.FaceData[i]);

            for (var i = 0; i < 12; i++) {
                if (i === 2)
                    this.ped.setComponentVariation(i, this.corpse.BodyInfo.OutfitData[i], 0, this.corpse.BodyInfo.OutfitData[i + 1]);
                else
                    this.ped.setComponentVariation(i, this.corpse.BodyInfo.OutfitData[i], this.corpse.BodyInfo.OutfitData[i + 12], 0);
            }

            this.ped.setHairColor(this.corpse.BodyInfo.ExtraData[0], this.corpse.BodyInfo.ExtraData[1]);
            this.ped.setEyeColor(this.corpse.BodyInfo.ExtraData[2]);

            this.ped.setPropIndex(0, this.corpse.BodyInfo.PropsData[0], this.corpse.BodyInfo.PropsData[1], false);
            this.ped.setPropIndex(1, this.corpse.BodyInfo.PropsData[2], this.corpse.BodyInfo.PropsData[3], false);
            this.ped.setPropIndex(2, this.corpse.BodyInfo.PropsData[4], this.corpse.BodyInfo.PropsData[5], false);

            //mp.gui.chat.push("LENGTH: "+ RealTattooData.length +"");
            /*if(RealTattooData != null){
                for (var i = 0; i < RealTattooData.length; ++i)
                {
                    Ped.setDecoration(RealTattooData[i], RealTattooData[i+1]);
                    //mp.gui.chat.push("Test: "+ i +" "+ RealTattooData[i] +", "+ RealTattooData[i+1] +"");
                    i += 1;
                }
            }*/
        }
    }

    deletePed() {
        try {
            this.clearFace()
            if (this.doesPedExist()) {
                this.ped.destroy();
                this.ped = null;
            }
        } catch { }
    }

    clearFace() {
        try {
            if (this.ped.__resetFace) clearInterval(this.ped.__resetFace)
        } catch { }
    }

    cleanUp() {
        this.deletePed();

        if (this.posTimer !== null && this.posTimer !== undefined)
            clearInterval(this.posTimer);

        if (this.distTimer !== null && this.distTimer !== undefined)
            clearInterval(this.distTimer);
    }

    doesPedExist() {
        return (this.ped !== null && this.ped !== undefined && this.ped.doesExist());
    }

    doesHandlerExist() {
        return (this.corpse.Handler !== null && this.corpse.Handler !== undefined && mp.players.exists(this.corpse.Handler));
    }

    initDistTimer() {
        this.distTimer = setInterval(() => {
            this.checkDistanceLoop();
        }, 2000);
    }

    sendPositionLoop() {
        if (this.doesPedExist()) {
            var coord = this.ped.getCoords(true);
            this.corpse.Position = coord;
            if (coord !== null)
                mp.events.callRemote('update_corpse_position', this.corpse.Id, coord.x, coord.y, coord.z);
        }
    }

    getDistance(coords) {
        return mp.game.gameplay.getDistanceBetweenCoords(
            mp.players.local.position.x,
            mp.players.local.position.y,
            mp.players.local.position.z,
            coords.x,
            coords.y,
            coords.z, true);
    }

    async checkDistanceLoop() {
        try {
            if (this.doesPedExist()) {
                // Check if distance is more than our own defined streaming range. (350)
                var dist = this.getDistance(this.ped.getCoords(true));

                // If the distance of the ped is exceeding 350 we must delete it before,
                // the ped reaches the 500 mark and we lose control of it. Doesn't matter which dimension the ped is in.
                if (dist >= 350) {
                    this.deletePed();
                }
            }
            // Only do a check on the distance if the corpse is not in a trunk.
            // We don't want corpses in trunks spawned anyway so we don't care about the distance.
            else if (this.corpse.State !== 2 && this.corpse.Dimension === mp.players.local.dimension) {
                // The ped doesn't exist for the player, but he's within streaming range,
                // so we create the ped.
                var dist = this.getDistance(this.corpse.Position);
                if (dist <= 350) {
                    await this.createPed();
                }
                // If we get here the ped doesn't exist, but he's far away anyway, 
                // so we don't care about it yet.
            }
        } catch (e) { }
    }

    setState(state, handler) {
        if (this.corpse !== null && this.corpse !== undefined) {
            this.previousState = this.corpse.State;
            if (this.previousState !== null && this.previousState !== undefined) {
                if (this.previousState === 1) {
                    // The body was previously being dragged which means a player needs resetting
                    if (this.doesPedExist() && this.doesHandlerExist() && this.corpse.Handler != null) {
                        this.ped.setNoCollision(this.corpse.Handler.handle, true);
                        this.corpse.Handler.clearTasksImmediately();
                        // Run the 'send position' method one last time before,
                        // terminating the distance timer
                        this.sendPositionLoop();
                        if (this.posTimer !== null && this.posTimer !== undefined)
                            clearInterval(this.posTimer);

                        // Check if the player dropped the corpse in the water.
                        // isInWater() doesn't work on the ped, so just do it on the handler instead. Same same.
                        if (this.corpse.Handler.isInWater()) {
                            // Trigger remote for deletion of the ped
                            mp.events.callRemote('dropped_corpse_in_water', this.corpse.Id);
                        }
                    }
                }
            }
            this.corpse.State = state;
            this.corpse.Handler = handler;
            this.updateAction();
        }
    }

    updateAction() {
        switch (this.corpse.State) {
            case 0: // Idle
                if (this.doesPedExist()) {

                    if (this.corpse.VehicleID == -1) {
                        this.ped.taskPlayAnim(dictionaries.MissSolomon, anims.LayDead, 8.0, -8.0, -1, 1, 0.0, false, false, false)
                    }

                    this.clearFace()
                    this.ped.__resetFace = setInterval(function () {
                        try {
                            mp.game.invoke("0xE1E65CA8AC9C00ED", this.ped.handle, "mood_sleeping_1", this.corpse.Model == 1885233650 ? "facials@gen_male@base" : "facials@gen_female@base")
                        } catch { }
                    }.bind(this), 2000)

                }
                break;
            case 1: // Being dragged
                if (this.doesPedExist() && this.doesHandlerExist() && this.corpse.Handler != null) {
                    if (this.corpse.VehicleID != -1) {
                        var vehicle = mp.vehicles.atRemoteId(this.corpse.VehicleID);
                        this.ped.taskLeaveVehicle(vehicle.handle, 16.0);

                        this.corpse.VehicleId = -1;
                    }

                    setTimeout(() => {
                        if (this.doesPedExist() && this.doesHandlerExist() && this.corpse.Handler != null) {

                            // Play the animations and disable collision between the handler and ped
                            this.ped.setNoCollision(this.corpse.Handler.handle, false);

                            this.ped.taskPlayAnim(dictionaries.Combat, anims.GetDragged, 8.0, -0.8, -1, 3, 0, false, false, false);
                            this.clearFace()

                            this.ped.__resetFace = setInterval(function () {
                                try {
                                    mp.game.invoke("0xE1E65CA8AC9C00ED", this.ped.handle, "mood_sleeping_1", this.corpse.Model == 1885233650 ? "facials@gen_male@base" : "facials@gen_female@base")
                                } catch { }
                            }.bind(this), 2000)

                            this.corpse.Handler.taskPlayAnim(dictionaries.Combat, anims.Drag, 8.0, -0.8, -1, 33, 0, false, false, false);

                            this.ped.setHealth(0)
                            // If this client is the handler, tell the client to keep updating the server about the position of,
                            // the corpse so players outside the streaming range knows where it is.
                            if (mp.players.local === this.corpse.Handler) {
                                mp.game.graphics.notify("Use ~b~'Right mouse click'~w~ to stop dragging the corpse.");
                                isDragging = true;
                                this.posTimer = setInterval(() => {
                                    this.sendPositionLoop();
                                }, 1000);
                            }
                        }
                    }, 1000);
                }
                break;
            case 2: // In trunk
                this.deletePed();
                break;
            default:
                break;
        }
    }
}

}