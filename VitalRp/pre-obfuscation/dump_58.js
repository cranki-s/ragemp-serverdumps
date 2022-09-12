{
setInterval(() => {
  const { position, dimension } = mp.players.local;
  
  mp.polygons.pool.map((polygon) => {

    if (polygon.colliding) {
      if (!mp.polygons.isPositionWithinPolygon(position, polygon, dimension)) {
        polygon.colliding = false;
        mp.events.call('playerLeavePolygon', polygon);
      }
    }
    else {
      if (mp.polygons.isPositionWithinPolygon(position, polygon, dimension)) {
        polygon.colliding = true;
        mp.events.call('playerEnterPolygon', polygon);
      }
    }
  });

}, 100);
}