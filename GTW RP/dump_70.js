{
class CustomRay{
    constructor(core){
        this.m_Core = core
        this.m_ModelData = new Map()
        
    }

    ShootRay(owner, target, start, end){

        let invalid = {hit: false, position: null, distance: null, speed: null, size: null}

        let position = new mp.Vector3(target.position.x, target.position.y, target.position.z)


        if (!target.doesExist()) return invalid
        if (owner == target) return invalid 
        let distance = mp.game.gameplay.getDistanceBetweenCoords(
            target.position.x,
            target.position.y,
            target.position.z,
            start.x,
            start.y,
            start.z, true)
        if (distance > MAX_LENGTH) return invalid

        let speed = target.getSpeed()
        let visible = owner.hasClearLosTo(target.handle, 15)
        let pitch = owner.getPitch()
       
        if ( (speed > 0.1 || true) && ( pitch > -35 && pitch < 35 ) && visible ){
        
            let dynamic = this.GetEntityRadius(target)
            let check = this.GetLineHitsSphereAndDir(position, dynamic.radius, start, end )
            if ( check.hit && this.IsVehicleInTraffic( owner, target, check.position ) )
				return {hit: true, position: check.position, distance: distance, speed: speed, size : dynamic.size}
			
        }
        return invalid
    }

    GetLineHitsSphereAndDir(center3D, radius, start3D, end3D){
        let start =  new Vector(start3D.x, start3D.y)
        let end =  new Vector(end3D.x, end3D.y)
        let center = new Vector(center3D.x, center3D.y)
        let normalized = Vector.subtract(end, start).normalize()
        let toCenter = Vector.subtract(center, start)
        let projection = Vector.dot(toCenter, normalized)
        let opposite = Vector.dot(toCenter, toCenter) - (projection * projection)
        let distance = Vector.subtract(end, start).length()
        let distanceToCenter = Vector.subtract(start, center).length() - (radius * 2)

        //mp.game.graphics.drawLine(start.x, start.y, start3D.z, end.x, end.y, start3D.z, 200, 0, 0, 255)

        //let backEnd = Vector.add(start, Vector.subtract(end, start).negative())
        //mp.game.graphics.drawLine(start.x, start.y, start3D.z, backEnd.x, backEnd.y, start3D.z, 0, 0, 200, 255)

        if ( opposite < (radius * radius) && !( distanceToCenter > distance ) )
            return {hit : true, position : this.GetIntersectedVehIsFrontOrRear(projection)}

        return {hit : false, position:  null}
    }

    IsVehicleInTraffic(owner, target, relative ){
	    let tgtHdg = target.getHeading()
	    let plyHdg = owner.getHeading()
	    let hdgDiff = Math.abs( ( plyHdg - tgtHdg + 180 ) % 360 - 180 )
	    if ( relative == 1 && hdgDiff > 45 && hdgDiff < 135 )
		    return false
	    else if ( relative == -1 && hdgDiff > 45 && ( hdgDiff < 135 || hdgDiff > 215 ) )
		    return false
	    return true
    }

    GetEntityRadius(entity){
        let model = entity.model 
        let key = model.toString()
        if (this.m_ModelData.has(key)) return this.m_ModelData.get(key)
        let dimension = mp.game.gameplay.getModelDimensions( model )
        let max = new mp.Vector3(dimension.max.x, dimension.max.y, dimension.max.z)
        let min = new mp.Vector3(dimension.min.x, dimension.min.y, dimension.min.z)
        let size = {x : max.x - min.x, y: max.y - min.y, z: max.z - min.z}
        let numericSize = size.x + size.y + size.z
        let radius = this.Clamp( ( numericSize * numericSize ) / 12, 5.0, 11.0 )
        this.m_ModelData[key] = {radius : radius, size : numericSize}
        return {radius : radius, size : numericSize}
    }

    GetIntersectedVehIsFrontOrRear(projection){
        if ( projection > 8.0 )
            return 1
        else if ( projection < -8.0 )
            return -1
        return 0
    }


    GetNormalizedVector = function(vector) {
        let mag = Math.sqrt(
          vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
        );
        vector.x = vector.x / mag;
        vector.y = vector.y / mag;
        vector.z = vector.z / mag;
        return vector;
      }


    Clamp( val, min, max ){
        if ( val < min )
            return min
        else if ( val > max )
            return max
	    return val
    }
}

function RayManager(core){
    return new CustomRay(core)
}
}