{
const STREAM_DISTANCE = 500.0;
const TIMER_TICK = 40;
let particles = new Map();

mp.events.add({
    'particleFx:setup' : (data) => {
        data.forEach((entry) => {
            const id = entry.id;
            delete entry.id;
            particles.set(id, { sync: true, ...entry });
        });
    },
    'particleFx:add' : (id, value) => {
        particles.set(id, { sync: true, ...value });
    },
    'particleFx:destroy' : (id) => {
        const particle = particles.get(id);
        if(!particle) return;

        if(particle.fx) {
            mp.game.graphics.stopParticleFxLooped(particle.fx, false);
        }
        
        particles.delete(id);
    }
});

setInterval(() => {
    particles.forEach((entry, id) => {
        const entity = typeof entry.entity !== 'undefined' ? mp[entry.entity.type + 's'].atRemoteId(entry.entity.remoteId) : undefined;

        if(typeof entry.entity != 'undefined' && !entity) {
            mp.events.addRemote('onParticleFxEntityDisconnect', id);
            mp.events.call('client.stop.particle.fx.lopped', id);
            return;
        }

        if(!entry.sync) 
            return;

        const position = entity ? entity.getCoords(true) : entry.position;
        const dimension = entity ? entity.dimension : (entry.dimension || 0);
        const clientPosition = mp.players.local.position;
        const clientDimension = mp.players.local.dimension;
        const dist = mp.game.gameplay.getDistanceBetweenCoords(position.x, position.y, position.z, clientPosition.x, clientPosition.y, clientPosition.z, true);

        if((dist <= STREAM_DISTANCE && dimension == clientDimension) && !entry.stream) {
            entry.stream = true;
            particles.set(id, entry);
            if(!entity) {
                mp.events.call('client.start.particle.fx.lopped.at.coord', id, entry.fxName, entry.effectName, entry.position, entry.rotation, entry.scale, entry.xAxis, entry.yAxis, entry.zAxis);
            } else {
                mp.events.call('client.particle.fx.lopped.on.entity', id, entity.handle, entry.fxName, entry.effectName, entry.offset, entry.rotation, entry.scale, entry.xAxis, entry.yAxis, entry.zAxis);
            }
            Nexus.callRemote('onPlayerParticleFxStreamIn', id);
        } else if((dist >= STREAM_DISTANCE || dimension != clientDimension) && entry.stream) {
            entry.stream = false;
            particles.set(id, entry);
            mp.events.call('client.stop.particle.fx.lopped', id);
            Nexus.callRemote('onPlayerParticleFxStreamOut', id);
        }
    });
}, TIMER_TICK);

mp.events.add({
    'client.start.particle.fx.lopped.at.coord' : (id, fxName, effectName, position, rotation, scale, xAxis, yAxis, zAxis) => {
        if(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
            mp.game.streaming.requestNamedPtfxAsset(fxName);
            while(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) mp.game.wait(0);
        }
        mp.game.graphics.setPtfxAssetNextCall(fxName);
        
        const fx = mp.game.graphics.startParticleFxLoopedAtCoord(effectName, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, scale, xAxis, yAxis, zAxis, false);
        
        if(particles.has(id)) {
            particles.set(id, { fx, ...particles.get(id) });
        } else particles.set(id, { fx });
    },
    'client.particle.fx.lopped.on.entity' : (id, entity, fxName, effectName, offset, rotation, scale, xAxis, yAxis, zAxis) => {
        if(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
            mp.game.streaming.requestNamedPtfxAsset(fxName);
            while(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) mp.game.wait(0);
        }
        mp.game.graphics.setPtfxAssetNextCall(fxName);
        
        const fx = mp.game.graphics.startParticleFxLoopedOnEntity(effectName, entity, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, scale, xAxis, yAxis, zAxis);
        
        if(particles.has(id)) {
            particles.set(id, { fx, ...particles.get(id) });
        } else particles.set(id, { fx });
    },
    'client.stop.particle.fx.lopped' : (id) => {
        if(!particles.has(id)) return;

        const particle = particles.get(id);
        if(!particle || !particle.fx) return;

        mp.game.graphics.stopParticleFxLooped(particle.fx, false);
        // mp.game.streaming.removeNamedPtfxAsset(particle.fxName);
        
        if(particle.sync) {
            delete particle.fx;
            particles.set(id, particle);
        } else particles.delete(id);
    }
});
}