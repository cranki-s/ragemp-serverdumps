{
require('./gtalife/BoneAttachment/Worker.js')
let DEBUG = true
let EXCEPTIONPRINT = false
/* 
    Local Elements (so elements that are only visible to the local client have a negative index)
    __attachmentData[1] -> Remote-Element 
    __attachmentData[-1] -> Local-Element
*/

class BoneAttachment {

    constructor() {
        this.m_CallStack = ""
        this.m_FreeLocals = []
        this.m_Locals = new Map()
        this.m_LastHandle = 0
        this.m_PendingAttachments = new Set()
        this.m_FastDictionary = new Map()
        this.m_FallbackSet = new Set()
        this.m_Dimension = mp.players.local.dimension

        mp.events.add("BoneAttachment::onChangeCharacter", this.Event_OnCharacterChange.bind(this))

        mp.events.add("BoneAttachment::addAttachment", this.Event_OnAddSpecific.bind(this))
        mp.events.add("BoneAttachment::removeAttachment", this.Event_OnRemoveSpecific.bind(this))
        mp.events.add("BoneAttachment::clearAttachment", this.Event_OnClear.bind(this))
        
        mp.events.add("BoneAttachment::onChangeCharacter", this.Event_OnCharacterChange.bind(this))
        mp.events.add("entityStreamIn", this.Event_OnStreamIn.bind(this))
        mp.events.add("entityStreamOut", this.Event_OnStreamOut.bind(this))
        mp.events.add("BoneAttachment::quitEvent", this.Event_OnQuit.bind(this))

        mp.events.add("render", this.Event_OnPulse.bind(this))

        mp.keys.bind(0x71, false, this.printAttachments.bind(this))

        this.m_DeRefPurgePulse = setInterval(this.checkUnreferenced.bind(this), 5000)

        this.Event_OnStartUp()
    }

    fastAdd(entity, object){
        if (entity == null) return
        if (!this.m_FastDictionary.has(entity.remoteId))
            this.m_FastDictionary.set(entity.remoteId, new Set())
        
        this.m_FastDictionary.get(entity.remoteId).add(object)
    }

    fastRemove(entity, object){
        if (entity == null) return
        if (!this.m_FastDictionary.has(entity.remoteId))
        this.m_FastDictionary.get(entity.remoteId).delete(object)
    }

    fastClear(entity){
        if (entity == null) return
        if (!this.m_FastDictionary.has(entity.remoteId)) return
        let set = this.m_FastDictionary.get(entity.remoteId)
        for (let object of set){
            object.detach(true, true) 
            mp.game.object.deleteObject(object.handle)
        }
    }

    normalizeIndex(input){
        if (typeof input === "undefined") return false
        if (isNaN(parseInt(input))) return false 
        return parseInt(input)
    }

    getFreeHandle(entity){
        if (typeof entity === "undefined") return
        if (!this.setup(entity)) return
        if (this.m_FreeLocals.length > 0) return this.m_FreeLocals.shift()
        this.m_LastHandle = this.m_LastHandle - 1
        return this.m_LastHandle
    }

    getAllRemote(entity){
        if (typeof entity === "undefined") return
        if (typeof entity.__attachmentData === "undefined") return
        let result = []
        for (let index in entity.__attachmentData) {
            if (!entity.__attachmentData.hasOwnProperty(index)) continue
            if (this.isLocal(index)) continue
            result.push(this.get(entity, index))
        }
        return result
    }

    getAllLocal(entity){
        if (typeof entity === "undefined") return
        if (typeof entity.__attachmentData === "undefined") return
        let result = []
        for (let index in entity.__attachmentData) {
            if (!entity.__attachmentData.hasOwnProperty(index)) continue
            if (!this.isLocal(index)) continue
            result.push(this.get(entity, index))
        }
        return result
    }

    get(entity, index){
        if (typeof entity === "undefined") return false
        if (typeof entity.__attachmentData === "undefined") return false
        if (typeof entity.__attachmentData[index] === "undefined") return false
        index = this.normalizeIndex(index)
        if (!index) return false
        return entity.__attachmentData[index]
    }


    debug(exception, where) {
        try{
            if (!EXCEPTIONPRINT) return
            if (!exception) return
            if (!exception.stack) return 
            let caller_line = exception.stack.split("\n")[4];
            let index = caller_line.indexOf("at ");
            let clean = caller_line.slice(index + 2, caller_line.length)
            mp.console.logError("Crash-Prevention: Error@" + where + "->" + caller_line + " ("  + this.m_CallStack + ")", false, true)
            mp.console.logError("@ ->" + index +  " -> " + clean, false, true)
        } catch {
            
        }
    }

    assert(entity, element) {
        if (typeof entity === "undefined") return (DEBUG ? mp.game.graphics.notify(`Attachment-Error@Assert: ~r~Invalid Entity for (0x${element.model.toString(16)})`) : false)
        if (!this.setup(entity)) return (DEBUG ? mp.game.graphics.notify(`Attachment-Error@Assert: ~r~Invalid Entity for (0x${element.model.toString(16)})`) : false)
        if (!this.integrity(element)) return false // (DEBUG ? mp.game.graphics.notify(`Attachment-Error@Assert: ~r~Invalid Model or Bone (0x${element.model.toString(16)})`) : false)
        return true
    }

    integrity(element) {
        let model = mp.game.streaming.isModelInCdimage(isNaN(parseInt(element.model)) ? mp.game.gameplay.getHashKey(element.model) : parseInt(element.model))
        let bone = isNaN(parseInt(element.bone)) ? mp.players.local.getBoneIndexByName(element.bone) : mp.players.local.getBoneIndex(parseInt(element.bone))
        return bone != -1 && model
    }

    isLocal(index){
        index = this.normalizeIndex(index)
        if (!index) return false
        return index < 0
    }

    setup(entity, assertOnly) {
        if (typeof entity === "undefined") return false
        if (typeof entity.__attachmentData === "undefined") 
        if (!assertOnly) 
            entity.__attachmentData = {} 
        else 
            return false
        return true
    }

    createElement(model, bone, offset, rotation, visible=false){
        if (typeof model === "undefined") return false
        if (typeof bone === "undefined") return false
        if (typeof offset === "undefined") return false
        if (typeof rotation === "undefined") return false 
        if (typeof visible === "undefined") return false 

        return {
            model : model, bone : bone, visible : visible,
            offsetX : offset.x, offsetY : offset.y, offsetZ: offset.z, rotationX : rotation.x, rotationY : rotation.y, rotationZ : rotation.z,
        }
    }

    createObject(entity, model, position, dimension, alpha){
        if (typeof entity === "undefined") return
        if (typeof model === "undefined") return 
        if (typeof position === "undefined") return
        model = isNaN(parseInt(model)) ? model : parseInt(model)
        position = new mp.Vector3(position.x, position.y, position.z - 10)
        dimension = (typeof dimension === "undefined") ? 0 : dimension
        if (dimension != entity.dimension) return 
        alpha = (typeof alpha === "undefined") ? 255 : parseInt(alpha)
        let object = mp.objects.new(
            model, position, 
            {
                dimension: dimension,
                alpha : alpha,
            }) 
        object.setCollision(false, false) 
        object.setNoCollision(mp.players.local.handle, false)
        if (mp.players.local.vehicle)
            object.setNoCollision(mp.players.local.vehicle.handle, false)
        
        object.notifyStreaming = true 
        object.__isAttachment = true
    
        this.fastAdd(entity, object)
        this.m_FallbackSet.add(object)
        return object 
    }

    create(entity, index){
        index = this.normalizeIndex(index)
        if (!index) return
        if (entity.handle === 0) return this.clear(entity, index)
        let element = this.get(entity, index)
        if (typeof element === "undefined") return this.clear(entity, index)
        this.dispose(entity, index)
        let object = this.createObject(entity, element.model, entity.position, entity.dimension, element.alpha)
        if (!object) return this.clear(entity, index)
        entity.__attachmentData[index].object = object
        object.__attachmentReference = entity.__attachmentData
        object.__pendingAttachment = this.get(entity, index)
        this.m_PendingAttachments.add(object)
    }

    createAll(entity) {
        try{
            if (!this.setup(entity)) return
            for (let index in entity.__attachmentData){
                if (!entity.__attachmentData.hasOwnProperty(index)) continue
                this.create(entity, index)
            }
        } catch(e){
            this.debug(e, "Create")
        }
    }

    createLocal(entity) {
        if (!this.setup(entity)) return
        for (let index in entity.__attachmentData) {
            if (!entity.__attachmentData.hasOwnProperty(index)) continue
            if (!this.isLocal(index)) continue
            this.create(entity, index)
        }
    }

    createRemote(entity) {
        try{
            if (!this.setup(entity)) return
            for (let index in entity.__attachmentData) {
                if (!entity.__attachmentData.hasOwnProperty(index)) continue
                if (this.isLocal(index)) continue
                this.create(entity, index)
            }
        } catch(e){
            this.debug(e, "CreateRemote")
        }
    }

    update(entity, element){
        if (!this.get(entity, element.index)) return
        entity.__attachmentData[element.index] = element
        if (!entity.__attachmentData[element.index].object || !mp.objects.exists( entity.__attachmentData[element.index].object)) return
        entity.__attachmentData[element.index].object.__pendingAttachment = element
        entity.__attachmentData[element.index].object.__updatePending = true
        this.attach(entity.__attachmentData[element.index].object)
    }

    dispose(entity, index) {
        try{
            let element = this.get(entity, index)
            this.fastRemove(entity, element.object)
            this.purgeObject(element.object)
            entity.__attachmentData[index].object = undefined
        } catch(e){
            this.debug(e, "Dispose")
        }
    }

    destroyAll(entity, local) {
        try{
            if (!this.setup(entity)) return
            for (let index in entity.__attachmentData) {
                if (!entity.__attachmentData.hasOwnProperty(index)) continue
                if (local && !this.isLocal(index)) continue
                this.dispose(entity, index)
            }
        } catch(e){
            this.debug(e, "DestroyAll")
        }
    }

    purgeObject(object){
        try{
            if (!object) return
            if (typeof object === "undefined") return
            if (object.handle === 0) return 
            object.detach(true, true)
            object.destroy()
            return true
        } catch(e){
            this.debug(e, "Purge")
        }
    }

    addLocal(entity, element){
        if (!this.assert(entity, element)) return false
        element.index = this.getFreeHandle(entity)
        return this.add(entity, element)
    }

    add(entity, element) {
        if (typeof element.index === "undefined") return false 
        let index = this.normalizeIndex(element.index)
        if (!index) return false
        element.index = index
        if (!this.assert(entity, element)) return false
        if (this.get(entity, element.index)) this.clear(entity, element.index)
        entity.__attachmentData[element.index] = element
        entity.__attachmentData[element.index].entity = entity
        if (entity.doesExist() && entity.handle != 0) { 
            this.create(entity, element.index)  
        }
        return this.get(entity, element.index)
    }

    printAttachments(){
        try{
            mp.console.logInfo("=== Attachment Data ===")
            for (let index in mp.players.local.__attachmentData){
                mp.console.logInfo(`${index} - ${mp.players.local.__attachmentData[index].model}`)
            }
            mp.console.logInfo("=======================")            
        } catch(e){
            this.debug(e, "Print Attachment")
        }
    }

    checkUnreferenced(){
        try{
            let count = 0
            for (let object of this.m_FallbackSet){
                let toPurge = true
                if (object.__attachmentReference){
                    for (let index in object.__attachmentReference){
                        if (!object.__attachmentReference[index]) continue 
                        if (!object.__attachmentReference[index].object) continue 
                        if (object == object.__attachmentReference[index].object) toPurge = false
                    }
                }
                if (!toPurge) continue
                this.m_FallbackSet.delete(object)
                if (this.purgeObject(object)) count++
            }
            let toPurge  = []
            for (let object of this.m_FallbackSet){
                if (!object) continue
                if (!object.handle || object.handle == 0) continue
                if (object.__pendingAttachment) continue 
                if (object.isAttached()) continue 
                object.destroy()
                toPurge.push(object)
            }
            toPurge.forEach(object => this.purgeObject(object))
        } catch(e){
            this.debug(e, "Purge-Unreferenced")
        }
    }

    clearLocal(entity) {
        this.clearAll(entity, true)
    }

    clearAll(entity, local) {
        if (!this.setup(entity, true)) return
        for (let index in entity.__attachmentData) {
            if (!entity.__attachmentData.hasOwnProperty(index)) continue
            if (local && !this.isLocal(index)) continue
            this.clear(entity, index)
            if (local) this.m_FreeLocals.push(index)
        }
    }

    clear(entity, index) {
        if (!this.get(entity, index)) return
        this.dispose(entity, index)
        delete entity.__attachmentData[index]
    }

    attach(object) {
        try{
            if (typeof object !== "undefined" && object.handle != 0) {
                if (typeof object.__pendingAttachment === "undefined") {
                    return this.purgeObject(object)
                }
                let data = object.__pendingAttachment

                if (typeof data.entity === "undefined") return this.purgeObject(object)
                
                if (data.entity.handle === 0) return this.purgeObject(object)

                if (!data.entity.doesExist()) return this.purgeObject(object)
        
                if (object.dimension != data.entity.dimension) return this.purgeObject(object)

                if (object.__updatePending) {
                    object.detach(true, true)
                    object.__updatePending = undefined
                }
                
                object.attachTo(data.entity.handle,
                    isNaN(parseInt(data.bone)) ? data.entity.getBoneIndexByName(data.bone) : data.entity.getBoneIndex(parseInt(data.bone)),
                    data.offsetX, data.offsetY, data.offsetZ,
                    data.rotationX, data.rotationY, data.rotationZ,
                    false, false, false, false, 2, true)
                
                object.__pendingAttachment = undefined

            }
        } catch(e){
            this.debug(e, "OnPulse")
        }
    }

    dissect(entity, data) {
        try {
            this.clearAll(entity)
            if (typeof data === "undefined") return
            if (data.length == 0) return
            if (!this.setup(entity)) return
            let collections = data.split('|')

            collections.forEach(json => {
                if (json.length > 0)
                this.add(entity, JSON.parse(json)) 
            })
        } catch (e) {
            this.debug(e, "OnDataChange")
        }
    }

    Event_OnPulse(){
        try{
            let dimension = mp.players.local.dimension
            if (dimension != this.m_Dimension) {
                this.m_Dimension = mp.players.local.dimension
                this.createAll(mp.players.local)
            }
        } catch(e){
            this.debug(e, "OnRender")
        }
    }

    Event_OnAddSpecific(entity, data){
        try{
            if (typeof entity === "undefined") return 
            if (typeof data !== "string") return 
            if (data.length == 0) return
            let attachment = JSON.parse(data) 
            if (typeof attachment === "undefined") return 
            if (!this.setup(entity)) return
            this.add(entity, attachment)     
        } catch(e){
            this.debug(e, "OnAddSpecific")
        }
    }

    Event_OnRemoveSpecific(entity, data){
        try{
            if (typeof entity === "undefined") return 
            if (typeof data !== "string") return 
            if (data.length == 0) return
            let attachment = JSON.parse(data) 
            if (typeof attachment === "undefined") return 
            if (!this.setup(entity, true)) return
            this.clear(entity, attachment.index)            
        } catch(e){
            this.debug(e, "OnRemoveSpecific")
        }
    }

    Event_OnClear(entity){
        try{
            if (typeof entity === "undefined") return 
            if (!this.setup(entity, true)) return
            this.clearAll(entity)
        } catch(e){
            this.debug(e, "OnClear")
        }
    }

    Event_OnStartUp(){
        mp.players.forEach(player =>{
            this.dissect(player, player.getVariable("BoneAttachment::CurrentAttachments"))
        })
    }

    Event_OnStreamIn(entity) {
        try {
            if (entity.__isAttachment)  return this.attach(entity)
            this.dissect(entity, entity.getVariable("BoneAttachment::CurrentAttachments"))
        } catch (e) {
            this.debug(e, "OnStreamIn")
        }
    }

    Event_OnStreamOut(entity) {
        try {
            if (entity.__isAttachment) return this.purgeObject(entity)
            if (typeof entity.__attachmentData !== "undefined") this.clearAll(entity)
        } catch (e) {
            this.debug(e, "OnStreamOut")
        }
    }

    Event_OnQuit(player) {
        try{
            this.fastClear(player)
        } catch(e){
            this.debug(e, "OnQuit")
        }
    }

    Event_OnCharacterChange() {
        try{
            this.clearAll(mp.players.local)
            mp.events.callRemote("Character::OnChangeCharApproved")
        } catch(e){
            this.debug(e, "OnCharacterChange")
        }
    }

}

__BoneAttachment = new BoneAttachment()

function getAttachmentSystem(){
    return __BoneAttachment
}
}