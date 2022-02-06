{
// TODO: by koltr <3

let localplayer = mp.players.local;

var raycasting = {

    camera: mp.cameras.new("gameplay"),

    directions: {
        front: 0,
        rear: 1
    },

    getEntity: function(directionf, distance = 10)
    {
        let veh = localplayer.vehicle;
        const rotation = veh.getRotation(5);

        const size = mp.game.gameplay.getModelDimensions(veh.model);
        const position = mp.game.object.getObjectOffsetFromCoords(veh.position.x, veh.position.y, veh.position.z, veh.getHeading(), 0, directionf == 0 ? size.max.y + 0.1 : size.min.y - 0.1 , 0);
        const target = mp.game.object.getObjectOffsetFromCoords(veh.position.x, veh.position.y, veh.position.z, veh.getHeading(), 0, 
            directionf == 0 ? size.max.y + 0.1 + distance : size.min.y - 0.1 - distance, 
            rotation.y * 0.25);

        let result = mp.raycasting.testPointToPoint(position, target);
        if (typeof result !== 'undefined') {
            if (typeof result.entity.type === 'undefined') return null;
            if (result.entity != null) {
                return result.entity;
            } 
        }
    }

}
}