{
﻿require('./gtalife/BodyWeaponAttachment/Classes/Matrix.js');

class Drawing{
    constructor(visualizer){
        this.m_Visualizer = visualizer 
        this.m_RenderHook = this.Event_OnRender.bind(this)
        mp.events.add("render", this.m_RenderHook)
    }

    destructor(){
        mp.events.remove("render", this.m_RenderHook)
    }

    Event_OnRender(){
        
    }

    bounding(element){
        if (typeof element === "undefined") return 
        if (!element.doesExist()) return
        if (element.handle == 0) return  

        let dimension = mp.game.gameplay.getModelDimensions(element.model)
        let min = dimension.min 
        let max = dimension.max
        if (typeof min === "undefined") return 
        if (typeof max === "undefined") return

        let vector = new mp.Vector3(0, 0, 0)
        let nativeMatrix = element.getMatrix(vector, vector, vector, vector)
        if(typeof nativeMatrix === "undefined") return 

        let matrix = CreateMatrix(4, 4)
        matrix.setRow(1, [-nativeMatrix.rightVector.x, -nativeMatrix.rightVector.y, -nativeMatrix.rightVector.z, 1] )
        matrix.setRow(2, [nativeMatrix.forwardVector.x, nativeMatrix.forwardVector.y, nativeMatrix.forwardVector.z, 1])
        matrix.setRow(3, [nativeMatrix.upVector.x, nativeMatrix.upVector.y, nativeMatrix.upVector.z, 1])
        matrix.setRow(4, [nativeMatrix.position.x, nativeMatrix.position.y, nativeMatrix.position.z, 1])

        let face1 = CreateMatrix(4, 4)
        face1.setRow(1, [min.x,max.y,min.z,1])
        face1.setRow(2, [min.x,max.y,max.z,1])
        face1.setRow(3, [max.x,max.y,max.z,1])
        face1.setRow(4, [max.x,max.y,min.z,1])

        face1.multiply(matrix)

        let face2 = CreateMatrix(4, 4)
        face2.setRow(1, [min.x,min.y,min.z,1])
        face2.setRow(2, [min.x,min.y,max.z,1])
        face2.setRow(3, [max.x,min.y,max.z,1])
        face2.setRow(4, [max.x,min.y,min.z,1])

        face2.multiply(matrix)

        let faces = [face1, face2]
        let draws = []

        faces.forEach((face, index) => {
            for (let i = 0; i < 4; i++){
                let coord = face.getRow(i+1)
                let nextCoord = face.getRow((i+2 < 5) ? i+2 : 1)

                draws.push([coord, nextCoord])
            }
        })

        for(let i = 0; i < 4; i++)
            draws.push(faces[0].getRow(i+1) , faces[1].getRow(i+1))
        
        draws.forEach(draw =>{
            mp.game.graphics.drawLine(draw[0][0], draw[0][1], draw[0][2], draw[1][0], draw[1][1], draw[1][2], 200, 0, 0, 255)
        })     
    }
}


function DrawingManager(visualizer){
    return new Drawing(visualizer)
}

}