{
mp.events.add('render', () => {
  
  mp.polygons.pool?.forEach(polygon => {
    if (!polygon.visible) return;

    const { vertices, height} = polygon;

    vertices.forEach((vertex, index) => {
      
      const nextVertex = index  === (vertices.length - 1) ?  vertices[0] : vertices[index + 1];

      // Deepness lower line
        mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z, nextVertex.x, nextVertex.y, nextVertex.z, 255, 255, 255, 255);
      
      // Current vertex height line
        mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z, vertex.x, vertex.y, vertex.z + height, 255, 255, 255, 255);
      
      // Next vertex height line
        mp.game.graphics.drawLine(nextVertex.x, nextVertex.y, nextVertex.z, nextVertex.x, nextVertex.y, nextVertex.z + height, 255, 255, 255, 255);
      
      // Deepness higher line
        mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z + height, nextVertex.x, nextVertex.y, nextVertex.z + height, 255, 255, 255, 255);
    });
        
  });

});
}