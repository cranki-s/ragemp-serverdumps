{
class CbHelper {
  constructor() {
    this.RED_COLOUR = { r: 188, g: 49, b: 43 };
    this.GREEN_COLOUR = { r: 45, g: 203, b: 134 };
  }
  getMinimum(numbers) {
    return Math.min(...numbers);
  }
  getMaximum(numbers) {
    return Math.max(...numbers);
  }
  getDistance(startPos, endPos) {
    return Math.sqrt(Math.pow(startPos.x - endPos.x, 2) + Math.pow(startPos.y - endPos.y, 2));
  }
  isInPoly(poly, point) {
    const minX = this.getMinimum(poly.map(p => p.x));
    const minY = this.getMinimum(poly.map(p => p.y));
    const maxX = this.getMaximum(poly.map(p => p.x));
    const maxY = this.getMaximum(poly.map(p => p.y));
    if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY)
      return false;
    let i = 0;
    let j = poly.length - 1;
    let isMatch = false;
    for (; i < poly.length; j = i++) {
      if (poly[i].x === point.x && poly[i].y === point.y)
        return true;
      if (poly[j].x === point.x && poly[j].y === point.y)
        return true;
      if (poly[i].x == poly[j].x &&
        point.x == poly[i].x &&
        point.y >= Math.min(poly[i].y, poly[j].y) &&
        point.y <= Math.max(poly[i].y, poly[j].y))
        return true;
      if (poly[i].y == poly[j].y &&
        point.y == poly[i].y &&
        point.x >= Math.min(poly[i].x, poly[j].x) &&
        point.x <= Math.max(poly[i].x, poly[j].x))
        return true;
      if (poly[i].y > point.y != poly[j].y > point.y &&
        point.x < ((poly[j].x - poly[i].x) * (point.y - poly[i].y)) / (poly[j].y - poly[i].y) + poly[i].x)
        isMatch = !isMatch;
    }
    return isMatch;
  }
  getOffsetPosition(startPosition, magnitude, heading, multiplier) {
    const cosx = multiplier * Math.cos(heading * (Math.PI / 180));
    const siny = multiplier * Math.sin(heading * (Math.PI / 180));
    return {
      x: startPosition.x + cosx * magnitude,
      y: startPosition.y + siny * magnitude
    };
  }
}
exports.cbHelper = new CbHelper();
}