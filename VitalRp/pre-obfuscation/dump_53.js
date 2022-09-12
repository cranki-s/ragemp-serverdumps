{
let lighterFX = [];
let smoking = [];
let cigarsmoke = [];


mp.events.addDataHandler('LighterUp',async (entity, value, oldValue) => {
    if (entity.handle) {
        if (value) {
            if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                mp.game.streaming.requestNamedPtfxAsset("core");
                while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) mp.game.waitAsync(10);;
            }
            mp.game.graphics.setPtfxAssetNextCall("core");
            let lighterId = mp.game.joaat("lighter");
            lighter = mp.attachmentMngr.getObject(entity, lighterId)
            while (lighter.handle === 0) mp.game.waitAsync(10);
            lighterFX[entity.id] = mp.game.graphics.startParticleFxLoopedOnEntity("ent_amb_torch_fire", lighter.handle, 0.0, 0.0, 0.050, 0.0, 0.0, 0.0, 0.03, false, false, false);
            setTimeout(() => {
                mp.game.graphics.stopParticleFxLooped(lighterFX[entity.id], false);
                lighter[entity.id] = null;
            }, 1500)
        }
    }
});

mp.events.addDataHandler('CiggaretteSmoke', async (entity, value, oldValue) => {
    if (entity.handle) {
        if (value) {
            if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                mp.game.streaming.requestNamedPtfxAsset("core");
                while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) mp.game.waitAsync(100);
            }

            mp.game.graphics.setPtfxAssetNextCall("core");
            let cigaretteId = mp.game.joaat("cigarette");

            cigarette = mp.attachmentMngr.getObject(entity, cigaretteId)
            while (cigarette.handle === 0) mp.game.waitAsync(10);
            cigarsmoke[entity.id] = mp.game.graphics.startParticleFxLoopedOnEntity("exp_grd_bzgas_smoke", cigarette.handle, -0.050, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03, false, false, false);

        }
    }
});



mp.events.addDataHandler('SmokeOut', (entity, value, oldValue) => {
    if (entity.handle && entity.handle > 0) {
        if (value) {
            setTimeout(async () => {
                if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                    mp.game.streaming.requestNamedPtfxAsset("core");
                    while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) mp.game.waitAsync(10);
                }
                mp.game.graphics.setPtfxAssetNextCall("core");
                if (smoking[entity.id]) {
                    mp.game.graphics.stopParticleFxLooped(smoking[entity.id], false);
                    smoking[entity.id] = null;
                }
                smoking[entity.id] = mp.game.graphics.startParticleFxLoopedOnEntityBone("exp_grd_bzgas_smoke", entity.handle, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, entity.getBoneIndex(20279), 0.06, false, false, false);

            }, 8500)
            setTimeout(() => {
                if (smoking[entity.id]) {
                    mp.game.graphics.stopParticleFxLooped(smoking[entity.id], false);
                    smoking[entity.id] = null;
                }
            }, 10050)
        }
    }
});



mp.events.add({
    'startsmoke': () => {
        setTimeout(() => {
            mp.attachmentMngr.addLocal("cigarettepack");
        }, 960);
        setTimeout(() => {
            mp.events.callRemote("preparefirstsmoke");
        }, 1600);
        setTimeout(() => {
            mp.attachmentMngr.addLocal("cigarettenolightmouth");
        }, 2750);
        setTimeout(() => {
            mp.attachmentMngr.removeLocal("cigarettepack");
            mp.attachmentMngr.addLocal("lighter");
        }, 4200);

        setTimeout(() => {
            mp.events.callRemote("startlighterFX");
        }, 5800);

        setTimeout(() => {
            mp.attachmentMngr.removeLocal("cigarettenolightmouth");
            mp.attachmentMngr.addLocal("cigarettelightmouth");
        }, 6510);
        setTimeout(() => {
            mp.attachmentMngr.removeLocal("lighter");
        }, 8080);
        setTimeout(() => {
            mp.attachmentMngr.removeLocal("cigarettelightmouth");
            mp.attachmentMngr.addLocal("cigarette");
           
        }, 10076);
        setTimeout(() => {
            mp.events.callRemote("startsmokeFX");
        }, 12000)
        setTimeout(() => {
            mp.events.callRemote("changesmokeAnimation");
        }, 13490)
    }
});

}