{
const { generateUniquePolygonId, getAngleSumBetweenPositionAndVertices, isPointInArea2D } = require('polygons/helpers');
require('polygons/render');
require('polygons/events');

mp.polygons = {
  pool: [],
  add: (vertices, height, options = { visible: false, lineColorRGBA: [255,255,255,255], dimension: 0 }) => {
    
    const polygon = {
      id: generateUniquePolygonId(),
      vertices,
      height,
      ...options,
      colliding: false
    }

    mp.polygons.pool.push(polygon);

    return polygon;
  },
  remove: (polygon) => {
    const index = mp.polygons.pool.findIndex(p => p.id === polygon.id);

    if (index !== -1)
      mp.polygons.pool.splice(index, 1);
  },
  exists: (polygon) => {
    return mp.polygons.pool.some(p => p.id === polygon.id)
  },
  isPositionWithinPolygon: (position, polygon, dimension) => {
    if (dimension && polygon.dimension !== dimension && polygon.dimension !== -1)
      return false;

    const { vertices } = polygon;

    const polygonPoints2D = [];

    for (let i in vertices) {
      if (position.z >= vertices[i].z && position.z <= (vertices[i].z + polygon.height) || getAngleSumBetweenPositionAndVertices(position, vertices) >= 5.8)
        polygonPoints2D.push([vertices[i].x, vertices[i].y]);
      else
        return false;  
    }

    return isPointInArea2D([position.x, position.y], polygonPoints2D);
  }
}


}