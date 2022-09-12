{
let jobColshape;

let jobColshapes = [];

mp.events.add({
    "CreateJobColshape": (x, y, z, r) => {
        jobColshape = mp.colshapes.newSphere(x, y, z, r);
    },
    "DeleteJobColshape": () => {
        if (jobColshape && jobColshape != null) {
            jobColshape.destroy();
            jobColshape = null;
        }
    },
    "AddJobColshapeToArray": (x, y, z, r) => {
        let jColshape = mp.colshapes.newSphere(x, y, z, r);
        jobColshapes.push(jColshape);
    },
    "EmptyJobColshapesArray": () => {
        jobColshapes.forEach((jshape, index) => {
            jshape.destroy();
        });
        jobColshapes = [];
    }
});



mp.events.add('playerEnterColshape', (shape) => {
    if (shape === jobColshape) {
        jobColshape.destroy();
        jobColshape = null;
        mp.events.callRemote("PlayerEnterJobShape")
    }
    jobColshapes.some((jshape, index) => {
        if (shape === jshape) {
            jshape.destroy();
            jobColshapes.splice(index, 1);
            mp.events.callRemote("PlayerEnterJobShape")
        }
    });
});
}