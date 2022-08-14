{
require('./files/polygons/render');
require('./files/polygons/events');


let lastInside = new mp.Vector3(0, 0, 0);
let lastSaved = new Date().getTime();

mp.polygons = {
  pool: [],
  add: (vertices, height, options = { visible: false , dimension: 0 }) => {
    
    const polygon = {
      id: generateUniquePolygonId(),
      vertices,
      height,
      ...options,
      colliding: false
    }

    mp.polygons.pool.push(polygon);
    return polygon.id;
  },
  remove: (id) => {
    const index = mp.polygons.pool.findIndex(p => p.id === id);

    if (index !== -1)
      mp.polygons.pool.splice(index, 1);
  },
  exists: (polygon) => {
    return mp.polygons.pool.some(p => p.id === polygon.id)
  },
  isPositionWithinPolygon: (position, polygon, dimension) => {
    if (polygon.dimension !== dimension)
      return false;

    const { vertices } = polygon;

    const polygonPoints2D = [];

    for (let i in vertices) {
        if (position.z >= vertices[i].z && position.z <= (vertices[i].z + polygon.height) ) {
            polygonPoints2D.push([vertices[i].x, vertices[i].y]);
            
        }
      else
        return false;  
    }
      let inside = isPointInArea2D([position.x, position.y], polygonPoints2D);
      if (inside === true && polygon.id === global.prisonpolId); {
          if ((new Date().getTime() - lastSaved) > 2 * 1000) {
              let newPosition = mp.players.local.getCoords(!0);
              if (isPointInArea2D([newPosition.x, newPosition.y], polygonPoints2D)) {
                  lastInside = newPosition;
                  lastSaved = new Date().getTime();
              }
          }
      }
    return inside
  }
}

const isPointInArea2D = (point, area) => {
    let x = point[0], y = point[1];

    let inside = false;

    for (let i = 0, j = area.length - 1; i < area.length; j = i++) {
        let xi = area[i][0], yi = area[i][1];
        let xj = area[j][0], yj = area[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect)
            inside = !inside;
    }

    return inside;
};

const TWOPI = 6.283185307179586476925287;
const EPSILON = 0.0000001;

const modulus = (p) => Math.sqrt((p.x * p.x) + (p.y * p.y) + (p.z * p.z));

const getAngleSumBetweenPositionAndVertices = (position, vertices, height) => {
    let i;
    let m1, m2;
    let anglesum = 0, costheta;

    for (i = 0; i < vertices.length; i++) {

        const p1 = new mp.Vector3(vertices[i].x - position.x, vertices[i].y - position.y, vertices[i].z + (height/2) - position.z);
        const p2 = new mp.Vector3(vertices[(i + 1) % vertices.length].x - position.x, vertices[(i + 1) % vertices.length].y - position.y, vertices[(i + 1) % vertices.length].z + (height/2)  - position.z);

        m1 = modulus(p1);
        m2 = modulus(p2);

        if (m1 * m2 <= EPSILON)
            return (TWOPI);
        else
            costheta = (p1.x * p2.x + p1.y * p2.y + p1.z * p2.z) / (m1 * m2);

        anglesum += Math.acos(costheta);
    }
    return (anglesum);
}

const generateUniquePolygonId = () => {
    const timestamp = Date.now();
    return mp.polygons.pool.some(p => p.id === timestamp) ? generateUniquePolygonId() : timestamp;
};


mp.events.add('playerEnterPolygon', (polygon) => {
    if (polygon.id === global.prisonpolId) {
       // mp.gui.chat.push('inside');
    }
    return
});

// Event called when the local player leaves a polygon (clientside)

mp.events.add('playerLeavePolygon', (polygon) => {
    /*if (polygon.id === global.prisonpolId && lastInside.x !== 0) {
        mp.gui.chat.push('outside');
        mp.players.local.position = lastInside;
        mp.players.local.freezePosition(true);
        setTimeout(() => { mp.players.local.freezePosition(false);} , 500)
    }*/
    
    return
});
}