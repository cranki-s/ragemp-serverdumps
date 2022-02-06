{
﻿

require('./gtalife/WeaponSelection/CEF/js/Constants.js');
require('./gtalife/BodyWeaponAttachment/Classes/Visualizer.js');
require('./gtalife/BodyWeaponAttachment/Classes/Keyboard.js');

class UI{
    constructor(core, bones, weapons){
        this.m_Core = core
        this.m_Bones = bones 
        this.m_Weapons = weapons

        if (!this.Assert()) return mp.gui.chat.push("Error@BoneAttachmentUI: Assertion failed!")

        this.m_Browser = mp.browsers.new("package://gtalife/BodyWeaponAttachment/CEF/index.html")
        mp.gui.cursor.show(true, true)
        this.m_DomQueue = []
        this.m_BrowserStarting = true
       
        this.m_Visualizer = VisualizerManager(this, mp.storage.data["BodyWeapons::Settings"])
        this.m_Keyboard = KeyboardManager(this)
        this.m_ReadyHook = this.Event_OnReady.bind(this)
        mp.events.add("browserDomReady", this.m_ReadyHook)
        
        this.m_RenderHook = this.Event_OnPulse.bind(this)
        mp.events.add("render", this.m_RenderHook)

        this.m_CEFWeaponSelectHook = this.Event_OnWeaponSelect.bind(this)
        mp.events.add("BodyWeapons::CEF::OnSelectWeapon", this.m_CEFWeaponSelectHook)

        this.m_CEFCloseHook = this.Event_OnClose.bind(this)
        mp.events.add("BodyWeapons::CEF::OnClose", this.m_CEFCloseHook)

        this.m_CEFChangeHook = this.Event_OnChange.bind(this)
        mp.events.add("BodyWeapons::CEF::OnChange", this.m_CEFChangeHook)

        this.m_CEFFocusChangeHook = this.Event_OnFocusChange.bind(this)
        mp.events.add("BodyWeapons::CEF::OnFocusSetting", this.m_CEFFocusChangeHook)

        this.m_CEFSaveSettingHook = this.Event_OnSaveSetting.bind(this)
        mp.events.add("BodyWeapons::CEF::OnSaveSettings", this.m_CEFSaveSettingHook)

        this.m_CEFSave = this.Event_OnSave.bind(this)
        mp.events.add("BodyWeapons::CEF::OnSave", this.m_CEFSave)

        this.m_CEFCopy = this.Event_OnCopy.bind(this)
        mp.events.add("BodyWeapons::CEF::OnCopy", this.m_CEFCopy)

        this.m_CEFPaste = this.Event_OnPaste.bind(this)
        mp.events.add("BodyWeapons::CEF::OnPaste", this.m_CEFPaste)

        this.m_CEFReset = this.Event_OnReset.bind(this)
        mp.events.add("BodyWeapons::CEF::OnReset", this.m_CEFReset)


        this.TriggerCEFEvent("OnStartup", this.m_Bones, this.m_Weapons, mp.storage.data["BodyWeapons::Settings"])

    }

    destructor(){
        if (mp.browsers.exists(this.m_Browser)) this.m_Browser.destroy()
        mp.events.remove("browserDomReady", this.m_ReadyHook)
        mp.events.remove("render", this.m_RenderHook)
        mp.events.remove("BodyWeapons::CEF::OnSelectWeapon", this.m_CEFWeaponSelectHook)
        mp.events.remove("BodyWeapons::CEF::OnClose", this.m_CEFCloseHook)
        mp.events.remove("BodyWeapons::CEF::OnChange", this.m_CEFChangeHook)
        mp.events.remove("BodyWeapons::CEF::OnFocusSetting", this.m_CEFFocusChangeHook)
        mp.events.remove("BoneWeapons::CEF::OnSaveSettings", this.m_CEFSaveSettingHook)
        mp.events.remove("BodyWeapons::CEF::OnSave", this.m_CEFSave)
        mp.events.remove("BodyWeapons::CEF::OnCopy", this.m_CEFCopy)
        mp.events.remove("BodyWeapons::CEF::OnPaste", this.m_CEFPaste)
        mp.events.remove("BodyWeapons::CEF::OnReset", this.m_CEFReset)

        mp.gui.chat.show(true)
        mp.gui.cursor.show(false, false)
        mp.events.call("setCefActive", false)
        this.m_Visualizer.destructor()
        this.m_Keyboard.destructor()
    }
    
    info(message){
        this.TriggerCEFEvent("OnMessage", message)
    }

    error(message){
        this.TriggerCEFEvent("OnError", message)
    }


    Assert(){
        if (typeof this.m_Weapons === "undefined") return false
        if (typeof WEAPON_DATA === "undefined") return false 
        if (typeof this.m_Bones !== "object") return false
        let weaponData = {}

        this.m_Weapons.forEach(weapon => {
            if (typeof weapon === "undefined") return 
            if (typeof WEAPON_DATA[weapon] === "undefined") return 
            if (typeof WEAPON_DATA[weapon].name === "undefined") return 
            weaponData[weapon] = WEAPON_DATA[weapon].name
            if (getClipHash(WEAPON_DATA[weapon].name)){
                weaponData["CLIP_" + weapon] = "&nbsp;&nbsp;&nbsp;&nbsp;&#8594; Магазин (" + WEAPON_DATA[weapon].name + ")"
            }
 
            let group = getWeaponGroup(weapon)
            let holsters = getHolster(group)
            if (holsters){
                holsters.forEach(holster => {
                    weaponData["HOLSTER_" + weapon + "*" + "0x" + parseInt(holster.hash).toString(16).toUpperCase()] = "&nbsp;&nbsp;&nbsp;&nbsp;&#8594; Кобура (" + holster.name + ")"
                })
            }
        })

        this.m_Weapons = JSON.stringify(weaponData)

        this.m_Bones = JSON.stringify(this.m_Bones)
        return true

    }

    Event_OnReady(browser){
        if (browser !== this.m_Browser) return 
        mp.gui.cursor.visible = true
        this.m_BrowserStarting = false
        this.m_DomQueue.forEach(query =>{
            browser.execute(query)
        })
        this.m_DomQueue = []
    }

    Event_OnPulse(){
        mp.gui.chat.show(false)
    }

    Event_OnWeaponSelect(hash){
        if (typeof hash === "undefined") return 
        let payload = this.m_Core.get(hash)
        if (typeof payload === "undefined") return this.TriggerCEFEvent("OnError", "Could not load data for selected weapon!")
        payload = JSON.stringify(payload)

        if (typeof payload === "undefined") return this.TriggerCEFEvent("OnError", "Could not load data for selected weapon!")
        this.TriggerCEFEvent("OnLoadWeapon", payload)

        this.m_Visualizer.Event_OnSelect(hash)
    }

    Event_OnClose(){
        this.m_Core.closeUI()
    }

    Event_OnChange(weapon, data){
        if (typeof data === "undefined") return 
        data = JSON.parse(data)
        if (data === "undefined") return 

        data = this.m_Core.parse(data)
        if (!data) return 

        this.m_Visualizer.update(weapon, data)
    }

    Event_OnFocusChange(value){
        this.m_Visualizer.m_FocusEnabled = value
    }

    Event_OnSaveSetting(data){
        if (typeof data === "undefined") return 
        mp.storage.data["BodyWeapons::Settings"] = data
        mp.storage.flush()
    }

    Event_OnSave(weapon){
        this.m_Visualizer.save(weapon)
    }

    Event_OnCopy(all, weapon){
        if (all){
            let data = JSON.stringify(this.m_Core.m_Attachments) 
            if (typeof data === "undefined") return
            this.TriggerCEFEvent("OnRequestCopy", data)
        }
    }

    Event_OnPaste(input){
        if (typeof input !== "string") return 
        let data = JSON.parse(input)
        if (typeof data !== "object") return
        this.m_Core.m_Attachments = data
        this.m_Core.m_Storage.save(this.m_Core.m_Config, this.m_Core.m_Attachments)
        this.m_Visualizer.refresh()
        this.info(`Import complete!`)
    }

    Event_OnReset(all, weapon){
        if (all){
            this.m_Core.m_Attachments = {}
            this.m_Core.m_Storage.save(this.m_Core.m_Attachments)
            this.m_Visualizer.refresh()
            this.info(`Reset-All completed!`)
        } else {
            if (typeof this.m_Core.m_Attachments[weapon] === "undefined") return
            this.m_Core.m_Attachments[weapon] = undefined
            this.m_Core.m_Storage.save(this.m_Core.m_Attachments)
            this.m_Visualizer.refresh()
            this.info(`Reset-Weapon completed!`)
        }
    }

    TriggerCEFEvent(name, ...args){
        let argumentsString = '';
        for (let arg of args) {
            switch (typeof arg) {
                case 'string': {
                    argumentsString += `'${arg}',`;
                    break;
                }
                case "number":
                case "boolean": {
                    argumentsString += `${arg},`;
                    break;
                }
                case "object": {
                    argumentsString += `${JSON.stringify(arg)},`;
                    break;
                }
            }
        }

        if (!this.m_BrowserStarting)
            this.m_Browser.execute(`typeof __Core.Event.onEvent !== "undefined" && __Core.Event.onEvent("${name}", ${argumentsString})`)
        else 
            this.m_DomQueue.push(`typeof __Core.Event.onEvent !== "undefined" && __Core.Event.onEvent("${name}", ${argumentsString})`) 
    }

}

function UserInterface(core, bones, weapons){
    return new UI(core, bones, weapons)
}

}