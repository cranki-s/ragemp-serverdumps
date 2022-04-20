{
mp.events.add('render', () => {
  
  mp.polygons.pool?.forEach(polygon => {
    if (!polygon.visible) return;

    const { vertices, height, lineColorRGBA } = polygon;

    vertices.forEach((vertex, index) => {
      
      const nextVertex = index  === (vertices.length - 1) ?  vertices[0] : vertices[index + 1];

      // Deepness lower line
      mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z, nextVertex.x, nextVertex.y, nextVertex.z, ...lineColorRGBA);
      
      // Current vertex height line
      mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z, vertex.x, vertex.y, vertex.z + height, ...lineColorRGBA);
      
      // Next vertex height line
      mp.game.graphics.drawLine(nextVertex.x, nextVertex.y, nextVertex.z, nextVertex.x, nextVertex.y, nextVertex.z + height, ...lineColorRGBA);  
      
      // Deepness higher line
      mp.game.graphics.drawLine(vertex.x, vertex.y, vertex.z + height, nextVertex.x, nextVertex.y, nextVertex.z + height, ...lineColorRGBA);
    });
        
  });

});
}