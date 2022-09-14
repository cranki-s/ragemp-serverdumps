{
let WeaponPreviewCamera = class { // Correct Way to Prevent Scope-Overlap!
    constructor(core){
        try{
            this.m_Core = core
            let initial = this.getMatrix( mp.cameras.new("gameplay") )
            let rotation = new mp.Vector3(initial.rotation.x * (180 / Math.PI), initial.rotation.y *  (180 / Math.PI), initial.rotation.z * (180 / Math.PI))
            this.m_Camera = mp.cameras.new("Weapon", mp.players.local.position.add(initial.forward.multiply(.5)), rotation, 50)
            this.m_Camera.setActive(true)
            this.m_Camera.setNearClip(0)
            mp.game.cam.renderScriptCams(true, false, 0, true, false)
        } catch {

        }
    }

    Dispose(){
        try{
            this.m_Core.Event_OnCameraDispose(this)
            if (!this.m_Camera) return
            this.m_Camera.destroy()
            this.m_Camera.setActive(false)
            mp.game.cam.renderScriptCams(false, false, 0, true, false)
        } catch(exception) {
            this.Error(exception, "Dispose")
        }
    }

    Render(){
        mp.game.cam.renderScriptCams(true, false, 0, true, false)
    }

    getCamera(){
        return this.m_Camera
    }

    getMatrix(element){
        try{
            if (element == null) element = this.getCamera()
            let rot = element.getRot(2)
            let rx =  rot.x *  (Math.PI/180), ry = rot.y  * (Math.PI/180), rz = rot.z *  (Math.PI/180)
            let position = element.getCoord()
            return {
                rotation: new mp.Vector3(rx, ry, rz),
                position: new mp.Vector3(position.x, position.y, position.z),
                forward: new mp.Vector3(
                    -Math.cos(rx)*Math.sin(rz),   
                    Math.cos(rz)*Math.cos(rx), 
                    Math.sin(rx)
                ),
                up: new mp.Vector3( 
                    Math.cos(rz)*Math.sin(ry) + Math.cos(ry)*Math.sin(rz)*Math.sin(rx), 
                    Math.sin(rz)*Math.sin(ry) - Math.cos(rz)*Math.cos(ry)*Math.sin(rx), 
                    Math.cos(rx)*Math.cos(ry)
                ),
                left: new mp.Vector3(
                    Math.cos(rz)*Math.cos(ry) - Math.sin(rz)*Math.sin(rx)*Math.sin(ry), 
                    Math.cos(ry)*Math.sin(rz) + Math.cos(rz)*Math.sin(rx)*Math.sin(ry),
                    -Math.cos(rx)*Math.sin(ry)
                ),
            }
        } catch(exception){
            this.Error(exception, "GetMatrix")
        }
    }

    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("Camera@Exception: Print-Error", false, true)
        }
    }
}

function __WeaponPreviewCamera(core){
    return new WeaponPreviewCamera(core)
}

}