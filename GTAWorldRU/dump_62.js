{
﻿class CustomRay{
    constructor(core){
        this.m_Core = core
        this.m_ModelData = new Map()
    }

    Ray(origin, ray, target){
        try{
            let radius = this.GetEntityRadius(target).radius
            let sphere = target.position
            let offset = this.Subtract(origin, sphere)
            let b = this.Dot(offset, ray)
            let c = this.Dot(offset, offset) - (radius * radius)
            if (c > 0 && b > 0) return false
            let discr = b * b - c
            if (discr < 0) return false
            let t = -b - Math.sqrt(discr)
            t = t < 0 ? 0 : t
            if (!mp.players.local.vehicle.hasClearLosTo(target.handle, 17)) return false
            return t
        } catch(e){
            mp.console.logError(e)
        }
    }

    GetEntityRadius(entity){
        try{
            let model = entity.model 
            let key = model.toString()
            if (this.m_ModelData.has(key)) return this.m_ModelData.get(key)
            let dimension = mp.game.gameplay.getModelDimensions( model )
            let max = new mp.Vector3(dimension.max.x, dimension.max.y, dimension.max.z)
            let min = new mp.Vector3(dimension.min.x, dimension.min.y, dimension.min.z)
            let size = {x : max.x - min.x, y: max.y - min.y, z: max.z - min.z}
            let numericSize = size.x + size.y + size.z
            let radius = this.Clamp( ( numericSize * numericSize ) / 12, 2.0, 3.0 )
            this.m_ModelData[key] = {radius : radius, size : numericSize}
            return {radius : radius, size : numericSize}
        } catch(e){
            mp.console.logError(e)
        }
    }


    Clamp( val, min, max ){
        if ( val < min )
            return min
        else if ( val > max )
            return max
	    return val
    }

    Subtract(a, b){
        return {x : a.x - b.x, y : a.y - b.y, z: a.z - b.z}
    }

    Dot(a, b){
        return a.x * b.x + a.y * b.y + a.z * b.z
    }


}

function __RayManager(core){
    return new CustomRay(core)
}
}