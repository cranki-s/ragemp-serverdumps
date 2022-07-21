{
require('./gtalife/BodyWeaponAttachment/Constants/BoneData.js');
require('./gtalife/BodyWeaponAttachment/Constants/DefaultAttachment.js');
require('./gtalife/BodyWeaponAttachment/Constants/ClipAttachment.js');
require('./gtalife/BodyWeaponAttachment/Constants/HolsterAttachment.js');
require('./gtalife/BodyWeaponAttachment/Classes/Utility.js');
require('./gtalife/BodyWeaponAttachment/Classes/UI.js');
require('./gtalife/BodyWeaponAttachment/Classes/Storage.js');

class BodyWeapons{
    
    constructor(){
        this.m_Storage = StorageManager(this)
        this.m_Attachments = this.m_Storage.m_Disk
        this.m_Pool = new Set()
        this.m_Config = "Unknown"

        mp.events.add("onClientWeaponGive", this.Event_OnAddWeapon.bind(this))
        mp.events.add("onClientWeaponTake", this.Event_OnRemoveWeapon.bind(this))
        mp.events.add("onClientWeaponTakeAll", this.Event_OnRemoveAllWeapon.bind(this))
        mp.events.add("BodyWeapons::LoadConfig", this.Event_OnLoadConfig.bind(this))
        mp.events.add("BodyWeapons::OnRequestAgain", this.Event_OnRequestAgain.bind(this))
        mp.events.add("BodyWeapons::OnRequestAllAgain", this.Event_OnRequestAllAgain.bind(this))
        mp.events.add("BodyWeapons::GUI::Open", this.Event_OnRequestGUI.bind(this))
    }

    parse(input){
        if (typeof input !== "string") return 
        if (input.length === 0) return 

        let attachments = JSON.parse(input)
        
        let cursor = 0
        for (const weapon in attachments){
            cursor++
            if (!this.weapon(weapon)) return (`Parsing ${String(weapon)} failed at Position ${cursor} in attachment.json!`)
        }
        return true
    }

    parse(input){
        if (typeof input === "undefined") return false 
        if (typeof input.weapon === "undefined") return false
        if (typeof input.offset === "undefined") return false 
        if (typeof input.rotation === "undefined") return false 
        if (typeof input.bone === "undefined") return false
        if (typeof input.visible === "undefined") return false
        if (!assertString(input.weapon)) return false
        if (!assertVectorF(input.offset)) return false
        if (!assertVectorF(input.rotation)) return false
        if (!assertNumber(input.bone)) return false 
        let weapon = input.weapon
        let offset = parseVectorF(input.offset) 
        let rotation = parseVectorF(input.rotation)
        let bone = parseInt(input.bone)
        return {bone : bone, offset : offset, rotation : rotation, visible : input.visible, weapon : weapon}
    }

    weapon(input){
        let data = this.parse(input)
        if (!data) return false
        this.m_Attachments[data.weapon] = data
        this.m_Storage.save(this.m_Config, this.m_Attachments)
        return true
    }

    get(weapon){
        if (typeof weapon === "undefined") return 
        if (typeof weapon === "string" && weapon.includes("CLIP_")) return this.getClip(weapon) // Get Clip
        if (typeof weapon === "string" && weapon.includes("HOLSTER_")) return this.getHolster(weapon) // Get Clip
        if (typeof this.m_Attachments[weapon] === "undefined")  return this.default(weapon) ? this.default(weapon) : false
        return this.parse(this.m_Attachments[weapon]) ? this.m_Attachments[weapon] : (this.default(weapon) ? this.default(weapon) : false)
    }

    getClip(clip){
        let weapon = clip.replace("CLIP_", "")
        if (typeof this.m_Attachments[clip] === "undefined")  return this.defaultClip(weapon) ? this.defaultClip(weapon) : false
        return this.parse(this.m_Attachments[clip]) ? this.m_Attachments[clip] : (this.defaultClip(weapon) ? this.defaultClip(weapon) : false)
    }

    getHolster(holster){
        let input = holster.replace("HOLSTER_", "")
        if (typeof this.m_Attachments[holster] === "undefined")  return this.defaultHolster(input) ? this.defaultHolster(input) : false
        return this.parse(this.m_Attachments[holster]) ? this.m_Attachments[holster] : (this.defaultHolster(input) ? this.defaultHolster(input) : false)
    }


    default(weapon){
        if (typeof weapon === "undefined") return false
        if (!getWeaponGroup(weapon)) return false 
        if (typeof getDefault(getWeaponGroup(weapon)) === "undefined") return false 
        return getDefault(getWeaponGroup(weapon))
    }

    defaultClip(weapon){
        if (typeof weapon === "undefined") return false
        if (!getWeaponGroup(weapon)) return false 
        if (typeof getDefault(getWeaponGroup(weapon)) === "undefined") return false 
        let data = Object.assign({}, getDefault(getWeaponGroup(weapon)))
        data.visible = false
        return data
    }

    defaultHolster(input){
        if (typeof input === "undefined") return false
        if (!input.includes("*")) return false
        let [weapon, holster] = input.split("*")
        if (!getWeaponGroup(weapon)) return false 
        return getDefaultHolster(parseInt(holster))
    }

    closeUI(){
        if (typeof this.m_UI === "undefined") return 
        this.m_UI.destructor()
        this.m_UI = undefined
        
        this.Event_OnRequestAllAgain()
    }

    LoadClip(weapon){
        if (typeof weapon === "undefined") return false
        if (typeof WEAPON_DATA[weapon] === "undefined") return false 

        let attachment = this.get("CLIP_" + weapon)
        if (!attachment) return false
    
        let hash = getClipHash(WEAPON_DATA[weapon].name) 
        if (!hash) return false

        let clip = getClipModel(hash)
        if (!clip) return false
        if (clip == 0) return false

        return {weapon : "CLIP_" + weapon, model : clip.toString(), bone : attachment.bone,
                offsetX : attachment.offset.x, offsetY : attachment.offset.y, offsetZ : attachment.offset.z, 
                rotationX: attachment.rotation.x, rotationY : attachment.rotation.y, rotationZ: attachment.rotation.z, 
                visible : attachment.visible}
    }

    LoadHolster(weapon, hash){
        if (typeof weapon === "undefined") return 
        if (typeof hash === "undefined") return
        if (typeof WEAPON_DATA[weapon] === "undefined") return 
        let key = "HOLSTER_" + weapon + "*" + "0x" + parseInt(hash).toString(16).toUpperCase()
        
        let attachment = this.get(key)
        if (!attachment) return

        return {weapon : key, model : hash.toString(), bone : attachment.bone,
                offsetX : attachment.offset.x, offsetY : attachment.offset.y, offsetZ : attachment.offset.z, 
                rotationX: attachment.rotation.x, rotationY : attachment.rotation.y, rotationZ: attachment.rotation.z, 
                visible : attachment.visible}
    }


    Event_OnLoadConfig(name){
        this.m_Config = name
        this.m_Storage.load(name)
        this.m_Attachments = this.m_Storage.m_Disk
    }

    Event_OnRequestAgain(weapon){
        if (typeof weapon === "undefined") return
        weapon = normalizeHex(weapon)
        let attachment = this.get(weapon)
        if (!attachment) return
        
        let model = getWeaponModel(weapon)
        if (!model) return

        let payload = []
        
        payload.push({
            weapon : weapon,
            model: model,
            bone: attachment.bone,
            offsetX: attachment.offset.x, offsetY: attachment.offset.y, offsetZ: attachment.offset.z, 
            rotationX: attachment.rotation.x, rotationY: attachment.rotation.y, rotationZ: attachment.rotation.z, 
            visible: attachment.visible
        })

        let clip = this.LoadClip(weapon)
        if (clip) payload.push(clip)
 
        let holsters = getHolster(getWeaponGroup(weapon))
        if (holsters){
            holsters.forEach(data => {
                let holster = this.LoadHolster(weapon, data.hash)
                if (holster) payload.push(holster)
            })
        }

        mp.events.callRemote("BodyWeapon::Reapply", JSON.stringify(payload))
    }

    Event_OnRequestAllAgain(){
        let payload = []
        let context = this
        getLocalPlayerWeapons().forEach( weapon => {
            weapon = normalizeHex(weapon)
            let attachment = context.get(weapon)
            if (!attachment) return
            
            let model = getWeaponModel(weapon)
            if (!model) return

            payload.push({
                weapon : weapon,
                model: model,
                bone: attachment.bone,
                offsetX: attachment.offset.x, offsetY: attachment.offset.y, offsetZ: attachment.offset.z, 
                rotationX: attachment.rotation.x, rotationY: attachment.rotation.y, rotationZ: attachment.rotation.z, 
                visible: attachment.visible
            })

            
            let clip = this.LoadClip(weapon)
            if (clip) payload.push(clip)

            let holsters = getHolster(getWeaponGroup(weapon))
            if (holsters){
                holsters.forEach(data => {
                    let holster = this.LoadHolster(weapon, data.hash)
                    if (holster) payload.push(holster)
                })
            }
        })

        mp.events.callRemote("BodyWeapon::Reapply", JSON.stringify(payload))
    }

    Event_OnAddWeapon(weapon){
        if (typeof weapon === "undefined") return 
        weapon = normalizeHex(weapon)
        let attachment = this.get(weapon)
        if (!attachment) return

        let model = getWeaponModel(weapon)
        if (!model) return

        mp.events.callRemote("BodyWeapon::Add", 
            weapon, model.toString(), attachment.bone,
            attachment.offset.x, attachment.offset.y, attachment.offset.z, 
            attachment.rotation.x, attachment.rotation.y, attachment.rotation.z, 
            attachment.visible)

        let clip = this.LoadClip(weapon)
        if (clip)
            mp.events.callRemote("BodyWeapon::Add", clip.weapon, clip.model, clip.bone, 
                clip.offsetX, clip.offsetY, clip.offsetZ, 
                clip.rotationX, clip.rotationY, clip.rotationZ, attachment.visible) 


        let holsters = getHolster(getWeaponGroup(weapon))
        if (holsters){
            holsters.forEach(data => {
                let holster = this.LoadHolster(weapon, data.hash)
                if (typeof holster !== "undefined") 
                    mp.events.callRemote("BodyWeapon::Add", holster.weapon, holster.model, holster.bone, 
                        holster.offsetX, holster.offsetY, holster.offsetZ, 
                        holster.rotationX, holster.rotationY, holster.rotationZ, holster.visible) 
            })
        }                               

    }

    Event_OnRemoveWeapon(weapon){
        mp.events.callRemote("BodyWeapon::Remove", weapon)
    }

    Event_OnRemoveAllWeapon(){
        mp.events.callRemote("BodyWeapon::RemoveAll")
    }

    Event_OnRequestGUI(){
        if (typeof this.m_UI !== "undefined") {
            this.m_UI.destructor()
            this.m_UI = undefined
        }

        this.m_UI = UserInterface(this, getBoneData(), getLocalPlayerWeapons())
    }
}

new BodyWeapons()
}