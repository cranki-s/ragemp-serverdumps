{
require("./gtalife/WeaponAttachment/AttachmentCustomizer/WeaponPreviewCamera.js")

let PREVIEW_DEPTH_DISTANCE_MAX = 1.4
let PREVIEW_DEPTH_DISTANCE_MIN = .1
let PREVIEW_DEPTH_DISTANCE_DEFAULT = PREVIEW_DEPTH_DISTANCE_MAX
let PREVIEW_SENSITIVITY = 10
let PREVIEW_OFFSET_SENSITIVITY = PREVIEW_SENSITIVITY * .0001
let PREVIEW_OFFSET_CLAMP = .1
let PREVIEW_TURN_SPEED = 1

let RESTORE = {}
let WeaponPreviewModel = class{
    constructor(core){
        try{
            this.m_Core = core
            this.m_ModelQueue = {}
            this.m_WeaponQueue = {}
            this.m_Models = {}
        } catch {

        }
    }
    
    RequestAsset(hash, callback){
        try{
            if (!mp.game.weapon.hasWeaponAssetLoaded(hash)) mp.game.weapon.requestWeaponAsset(hash, 31, 0)
            else return callback.call(this)

            this.m_WeaponQueue[hash] = 
                setInterval(function(){
                    if (!mp.game.weapon.hasWeaponAssetLoaded(hash)) return 
                    clearInterval(this.m_WeaponQueue[hash])
                    delete this.m_WeaponQueue[hash]
                    callback.call(this)
                }.bind(this), 50)

        } catch(exception){
            this.Error(exception, "RequestAsset")
        }
    }

    RequestModel(hash, callback){
        try{
            if (!(mp.game.streaming.hasModelLoaded(hash))) mp.game.streaming.requestModel(hash)
            else return callback.call(this)

            this.m_ModelQueue[hash] = 
                setInterval(function(){
                    if (!mp.game.streaming.hasModelLoaded(hash)) return 
                    clearInterval(this.m_ModelQueue[hash])

                    delete this.m_ModelQueue[hash]
                    this.m_Models[hash] = true
                    callback.call(this)
                }.bind(this), 50)

        } catch(exception){
            this.Error(exception, "RequestModel")
        }
    }


    Create(hash, restore=false){
        try{
            this.Dispose()
            this.Camera()
            this.m_Loaded = false
            this.m_Blocked = false
            this.RequestAsset(hash, function(){

                let position = this.m_Camera.getMatrix().position.add(this.m_Camera.getMatrix().forward.multiply(PREVIEW_DEPTH_DISTANCE_DEFAULT))
                
                restore = true
                this.m_Hash = hash
                this.m_View = (!restore || !RESTORE.m_View) ? {x: 0, z: 0} : RESTORE.m_View 
                this.m_Offset = (!restore || !RESTORE.m_Offset) ? {x: 0, z: 0} : RESTORE.m_Offset 

                this.m_Scale = (!restore || !RESTORE.m_Scale) ? 
                {
                    linear: (x, y, a) => parseFloat((x * (1 - a) + y * a).toFixed(3)), 
                    start: PREVIEW_DEPTH_DISTANCE_DEFAULT, 
                    end: PREVIEW_DEPTH_DISTANCE_DEFAULT, 
                    value: PREVIEW_DEPTH_DISTANCE_DEFAULT
                } : RESTORE.m_Scale

                this.m_Components = new Set()
                this.m_Loaded = true
                let result = mp.game.weapon.createWeaponObject(hash, 0, position.x, position.y, position.z, true, 1, 0)     

                if (typeof result == "number") this.m_Weapon = mp.objects.newWeak(result)
                if (typeof result == "object") this.m_Weapon = result
                
                this.Position()   

                if (this.m_OnLoadCallback) this.m_OnLoadCallback.call(this)
            }.bind(this))
            return this
        } catch (exception){
            this.Error(exception, "Create")
            return this
        }
    }

    Load(callback){
        try{
            this.m_OnLoadCallback = callback
        } catch(exception){
            this.Error(exception, "Load")
        }
    }

    AddComponent(hash){
        try{
            if (!this.m_Camera || !this.m_Weapon) return
            if (!this.m_Weapon.handle) return
            this.RequestModel(mp.game.weapon.getWeaponComponentTypeModel(hash), function(){
                if (!mp.game.weapon.hasWeaponGotWeaponComponent(this.m_Weapon.handle, hash))
                    mp.game.weapon.giveWeaponComponentToWeaponObject(this.m_Weapon.handle, hash)

                this.m_Components.add(hash)
            }.bind(this))
        } catch(exception){
            this.Error(exception, "AddComponent")
        }
    }

    RemoveComponent(hash){
        try{
            if (!this.m_Camera || !this.m_Weapon || !hash) return
            if (mp.game.weapon.hasWeaponGotWeaponComponent(this.m_Weapon.handle, hash))
                mp.game.weapon.removeWeaponComponentFromWeaponObject(this.m_Weapon.handle, hash)

            
            if (mp.game.streaming.hasModelLoaded((mp.game.weapon.getWeaponComponentTypeModel(hash))))
                mp.game.streaming.setModelAsNoLongerNeeded((mp.game.weapon.getWeaponComponentTypeModel(hash)))

            delete this.m_Models[hash]
            
            if (this.m_ModelQueue[hash]) clearInterval(this.m_ModelQueue[hash])
            delete this.m_ModelQueue[hash]

            this.m_Components.delete(hash)
        } catch(exception){
            this.Error(exception, "RemoveComponent")
        }
    }

    Dispose(){
        try{
            if (this.m_Camera && this.m_Camera.getCamera()) this.m_Camera.Dispose()
            this.m_Camera = undefined
            this.m_Click = false

            for(let hash in this.m_ModelQueue) hash && !isNaN(hash) ? clearInterval(this.m_ModelQueue[hash]) : false
            for(let hash in this.m_WeaponQueue) hash && !isNaN(hash) ? clearInterval(this.m_WeaponQueue[hash]) : false
            for(let hash in this.m_Models) hash && !isNaN(hash) ? mp.game.streaming.setModelAsNoLongerNeeded(parseInt(hash)) : false
            this.m_ModelQueue = {}
            this.m_WeaponQueue = {}
            this.m_Models = {}

            if (this.m_Weapon) {
                this.m_Weapon.destroy()
                mp.game.weapon.removeWeaponAsset(parseInt(this.m_Hash));
                this.m_Weapon = undefined
            }

            mp.gui.cursor.show(false, false)

            RESTORE.m_Offset = this.m_Offset
            RESTORE.m_View = this.m_View
            RESTORE.m_Scale = this.m_Scale

        } catch(exception){
            this.Error(exception, "Dispose")
        }
    }

    Camera(){
        try{
            this.m_Camera = __WeaponPreviewCamera(this)
        } catch(exception){
            this.Error(exception, "Camera")
        }
    }

    Position(){
        try{
            if (!this.m_Camera || !this.m_Weapon) return

            this.Scroll()
            

            let [cx, cy] = this.Cursor()

            let lDelta = !this.m_LeftDrag ? {x: 0, z: 0} : {x: cx - this.m_LeftDrag[0], z: cy - this.m_LeftDrag[1]}
            if (this.m_LeftMouse) this.m_View= {x: Math.min(Math.max(this.m_View.x + (lDelta.x * PREVIEW_SENSITIVITY), -360), 360), z: Math.min(Math.max(this.m_View.z + (-lDelta.z * PREVIEW_SENSITIVITY), -360), 360)}

            let rDelta = !this.m_RightDrag ? {x: 0, y: 0} : {x: cx - this.m_RightDrag[0], z: cy - this.m_RightDrag[1]}
            if (this.m_RightMouse) this.m_Offset= {x: Math.min(Math.max(this.m_Offset.x + (rDelta.x * PREVIEW_SENSITIVITY * PREVIEW_OFFSET_SENSITIVITY), -PREVIEW_OFFSET_CLAMP), PREVIEW_OFFSET_CLAMP), z: Math.min(Math.max(this.m_Offset.z + (-rDelta.z * PREVIEW_SENSITIVITY * PREVIEW_OFFSET_SENSITIVITY), -PREVIEW_OFFSET_CLAMP), PREVIEW_OFFSET_CLAMP)}


            let matrix = this.m_Camera.getMatrix()
            let position = matrix.position.add(matrix.forward.multiply(this.m_Scale.value))

            position = position.add(matrix.left.multiply(this.m_Offset.x))
            position = position.add(matrix.up.multiply(this.m_Offset.z))
     

            this.m_Weapon.setCoords(position.x, position.y, position.z, true, false, false, false)
            
            this.m_View.x += (this.m_Showcase ? this.m_Showcase.rotate() : 0) % 360
           
            this.m_Weapon.setRotation(  (matrix.rotation.x  * (180 / Math.PI)) - this.m_View.z, 
                                        matrix.rotation.y * (180 / Math.PI), 
                                        (matrix.rotation.z  * (180 / Math.PI)) + this.m_View.x, 2, true)            
            
            
        } catch(exception){
            this.Error(exception, "Position")
        }
    }

    Render(){
        try{
            if (!this.m_Camera || !this.m_Weapon) return
            mp.gui.cursor.show(true, true)
            this.Position()
        } catch(exception){
            this.Error(exception, "Render")
        }
    }

    Scroll(){
        try{
            if (!this.m_Camera || !this.m_Weapon) return
            let down = this.m_Blocked ? 0 : mp.game.controls.getDisabledControlNormal(0, 14)
            let up = this.m_Blocked ? 0 : mp.game.controls.getDisabledControlNormal(0, 15)

            if (this.m_Scale.clock) {
                let progress = (Date.now() - this.m_Scale.clock) / 200
                if (progress <= 1) this.m_Scale.value = Math.min(Math.max(this.m_Scale.linear(this.m_Scale.start, this.m_Scale.end, (Date.now() - this.m_Scale.clock) / 200), PREVIEW_DEPTH_DISTANCE_MIN), PREVIEW_DEPTH_DISTANCE_MAX)
                else this.m_Scale.clock = false
            }

            if ((down - up) == 0) return

            this.m_Scale.end =  this.m_Scale.value +  (down - up) * .1
            this.m_Scale.start = this.m_Scale.value
            this.m_Scale.clock = Date.now()      
            
        } catch(exception){
            this.Error(exception, "Scroll")
        }
    }

    Cursor(){
        try{
            if (!mp.gui.cursor.visible || this.m_Blocked) return [0, 0]

            let resolution = mp.game.graphics.getScreenActiveResolution(0, 0)
            let cursor = mp.gui.cursor.position
            if (!resolution || !cursor) return [0, 0]
            return [cursor[0] / resolution.x, cursor[1] / resolution.y]
        } catch (exception){
            this.Error(exception, "Cursor")
            return [0, 0]
        }
    }

    Click(x, y, direction, side){
        try{
            if (this.m_Blocked) return 

            if (side == "left"){
                this.m_LeftMouse = direction == "down"
                this.m_LeftDrag = this.Cursor()
            }

            if (side == "right"){
                this.m_RightMouse = direction == "down"
                this.m_RightDrag = this.Cursor()
            }

        } catch (exception){
            this.Error(exception, "Click")
        }
    }

    Event_OnTurn(state){
        try{
            this.m_Showcase = state ? {
                turn: Date.now(),
                rotate: function(){return PREVIEW_TURN_SPEED} 
            } : undefined
        } catch(exception){
            this.Error(exception, "Event_OnStartTurn")
        }
    }

    Event_OnCameraDispose(instance){
        try{
            this.m_Camera = undefined
        } catch(exception){
            this.Error(exception, "Event_OnCameraDispose")
        }
    }

    Error(exception, where="General") {
        try{
            mp.console.logError("Exception@PreviewModel ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponAttachmentPreviewModel@Exception: Print-Error", false, true)
        }
    }
}

function __WeaponPreviewModel(core){
    return new WeaponPreviewModel(core)
}



}