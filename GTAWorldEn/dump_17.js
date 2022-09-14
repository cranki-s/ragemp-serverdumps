{
require('./gtalife/WeaponSelection/WeaponSync.js')
require('./gtalife/WeaponSelection/WeaponAnimation.js')

function hasWeapon(weaponHash){
	return mp.game.invoke("0x8DECB02F88F428BC", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
}

function getAmmoCount(weaponHash){
	if (hasWeapon(weaponHash)){
		let ammoCount = mp.game.invoke("0x015A522136D7F951", mp.players.local.handle, parseInt(weaponHash) >> 0)
		if (ammoCount > 999) ammoCount = null
		return ammoCount
	}
	return 0
}

function getAmmoInClip(weaponHash){
	if (hasWeapon(weaponHash)){
		let clipCount = mp.game.invoke("0xA38DCFFCEA8962FA", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
		if (clipCount > 360) clipCount = null 
		return clipCount
	}
	return 0
}

function getWeaponString(){
	let weapon = mp.players.local.weapon 
	if (typeof weapon !== "undefined")
		return "0x" + mp.players.local.weapon.toString(16).toUpperCase()
	else 
		return "0xA2719263"
}

function getComponents(weaponHash){
    if (!mp.players.local.hasOwnProperty("__weaponComponentData")) return []
    if (!mp.players.local.__weaponComponentData.hasOwnProperty(weaponHash)) return []
	return Array.from(mp.players.local.__weaponComponentData[weaponHash])
}

function setWeapon(weaponHash){
	if (typeof weaponHash === "undefined") return
	if (hasWeapon(weaponHash)){
		if (mp.players.vehicle)
			return mp.game.invoke("0x72C1056D678BB7D8", parseInt(weaponHash) >> 0)
		else{
			mp.game.invoke("0x72C1056D678BB7D8", parseInt(weaponHash) >> 0)
			return mp.game.invoke("0xADF692B254977C0C", mp.players.local.handle, parseInt(weaponHash) >> 0, 1)
		}
	}
}

function setWeaponForceTest(weaponHash){
	if (typeof weaponHash === "undefined") return
	if (hasWeapon(weaponHash))
		return mp.game.invoke("0xBF0FD6E56C964FCB", mp.players.local.handle, parseInt(weaponHash) >> 0, 0, 0, 1)
}

mp.events.add(
{
	"force_fist" : () => {
		setWeaponForceTest(0xA2719263);
	},
})
	
class WeaponSelection{
	constructor(){

		this.m_WeaponAnimation = __WeaponAnimation(this)

		this.m_AntiSpam = { m_Warns : 0, m_Last : Date.now()}
		this.m_Active = true
		this.m_SelectionMode = false
		this.m_LastWeapon = false
		this.m_Blocked = false
		this.m_WeaponMenuPress = false
		this.m_BlockForFrame = null
		this.m_BlockGravityHover = null
		this.m_Blockkeys = false
		this.m_Weapons = new Set()
		this.m_AxisX = 0
		this.m_AxisY = 0
		this.m_CEF = mp.browsers.new("package://gtalife/WeaponSelection/CEF/index.html")
		this.Setup()

		mp.events.add("WeaponSelection::AddWeapon", this.Event_OnRemoteWeaponAdd.bind(this))
		mp.events.add("WeaponSelection::RemoveWeapon", this.Event_OnRemoteWeaponRemove.bind(this))
		mp.events.add("WeaponSelection::RemoveAllWeapons", this.Event_OnRemoteWeaponRemoveAll.bind(this))
		mp.events.add("WeaponSelection::ToggleWeaponWheel", this.Event_OnRemoteToggleActive.bind(this))
		mp.events.add("WeaponSelection::ToggleSelectionMode", this.Event_OnRemoteToggleMode.bind(this))
		mp.events.add("WeaponSelection::SelectWeapon", this.Event_OnWeaponSelect.bind(this))
		mp.events.add("WeaponSelection::NotifyEquip", this.Event_OnEquip.bind(this))
		mp.events.add("playerEnterVehicle", this.Event_OnVehicleEnter.bind(this))
		mp.events.add("playerLeaveVehicle", this.Event_OnVehicleExit.bind(this))
		
		mp.events.add("render", this.Event_OnRender.bind(this))

		mp.events.add('CharacterSelector::showCharacterSelector', function() {
			this.m_Blocked = true
		}.bind(this))

		mp.events.add('CharacterSelector::hideCharacterSelector', function() {
			this.m_Blocked = false
		}.bind(this))

		mp.events.add('WeaponSelection::EmergencyVehicle', (bool) => {
			this.m_Blockkeys = bool;
		})

	}

	Setup(){
		try{
			if (!this.m_Active){
				mp.game.controls.disableControlAction(24, 157, false)
				mp.game.controls.disableControlAction(24, 37, false)
			}
		} catch(exception){
			this.Error(exception, "Setup")
		}
	}


	Ensure(){
		try{
			if (!this.m_LastWeapon) return 
			if (!mp.players.local.weapon) return 
			if (!mp.players.local.weapon.toString(16)) return
			let weapon = "0x" + mp.players.local.weapon.toString(16).toUpperCase() 
			if (weapon == this.m_LastWeapon) return 
			if (this.m_WeaponAnimation.m_InAnimation) return 
			setWeapon(this.m_LastWeapon)

		} catch(exception){
			this.Error(exception, "Ensure")
		}
	}


	Event_OnRender(){	
		try{
			
			if (!this.m_Active) return

			this.Ensure()

			mp.game.ui.hideHudComponentThisFrame(19)
			mp.game.ui.hideHudComponentThisFrame(20)

			for (var i = 157; i < 164; i++)
				mp.game.controls.disableControlAction(24, i, true)
			

			if (mp.players.local.vehicle){
				if (typeof mp.players.local.isInFlyingVehicle == "function"){
					if (mp.players.local.isInFlyingVehicle()){
						if (this.m_WeaponMenuPress)
							return this.Event_OnEndWeaponSelect.call(this)
						return
					}
				}
			}

		
			if (mp.game.controls.isDisabledControlPressed(24, 37)){
				if (!this.m_Blocked && !mp.gui.cursor.visible) {
					if (!this.m_WeaponMenuPress)
						this.Event_OnStartWeaponSelect.call(this)
					this.m_WeaponMenuPress = true
				}
			}
			else{
				if (this.m_WeaponMenuPress)
					this.Event_OnEndWeaponSelect.call(this)
				this.m_WeaponMenuPress = false 
			}

			if (!mp.system.isFocused){
				if (this.m_WeaponMenuPress)
					this.Event_OnEndWeaponSelect.call(this)
				this.m_WeaponMenuPress = false 
			}
		
			if (!this.m_SelectionMode && this.m_WeaponMenuPress && this.m_BlockGravityHover == null)
				this.Event_OnMouse()

			if (mp.game.controls.isDisabledControlJustPressed(24, 157)){
				this.Event_OnQuickKey.left.call(this)
			}
			else if (mp.game.controls.isDisabledControlJustPressed(24, 158)){
				this.Event_OnQuickKey.top.call(this)
			}
			else if (mp.game.controls.isDisabledControlJustPressed(24, 160)){
				this.Event_OnQuickKey.bottom.call(this)
			}
			else if (mp.game.controls.isDisabledControlJustPressed(24, 164)){
				this.Event_OnQuickKey.right.call(this)
			}
			else if (mp.game.controls.isDisabledControlJustPressed(24, 165)){
				this.Event_OnQuickKey.center.call(this)
			}

			if (this.m_WeaponMenuPress){
				mp.game.player.disableFiring(true)
				mp.game.controls.disableControlAction(1, 1, true)
				mp.game.controls.disableControlAction(1, 2, true)
				mp.game.controls.disableControlAction(0, 24, true); 
				mp.game.controls.disableControlAction(0, 25, true); 
				mp.game.controls.disableControlAction(0, 140, true)
				mp.game.controls.disableControlAction(0, 141, true)
				mp.game.controls.disableControlAction(0, 142, true)
				mp.game.controls.disableControlAction(0, 24, true)
			}


			if (this.m_BlockGravityHover != null && (Date.now() - this.m_BlockGravityHover > 1400)) this.m_BlockGravityHover = null

			if (this.m_BlockForFrame != null && (Date.now() - this.m_BlockForFrame < 1400)){
				mp.players.local.blockWheelFrame = true
				mp.game.player.disableFiring(true)
				mp.game.controls.disableControlAction(0, 24, true); 
				mp.game.controls.disableControlAction(0, 25, true); 
				mp.game.controls.disableControlAction(0, 140, true)
				mp.game.controls.disableControlAction(0, 141, true)
				mp.game.controls.disableControlAction(0, 142, true)
			
			} else {
				if (this.m_BlockForFrame != null && (Date.now() - this.m_BlockForFrame > 1400)){
					this.m_BlockForFrame = null
					mp.players.local.blockWheelFrame = false	
				}
			}

			mp.game.controls.disableControlAction(27, 99, true)
			mp.game.controls.disableControlAction(27, 100, true)

			let current = Date.now()
			if (current - this.m_AntiSpam.m_Last > 1000){
				this.m_AntiSpam.m_Warns = this.m_AntiSpam.m_Warns - 1 
				this.m_AntiSpam.m_Last = Date.now()
				this.m_AntiSpam.m_Warns = this.m_AntiSpam.m_Warns < 0 ? 0 : this.m_AntiSpam.m_Warns
			}
		} catch(exception){
			this.Error(exception, "Event_onRender")
		}
	}

	Event_OnMouse(){
		try{
			let x = mp.game.controls.getDisabledControlNormal(7, 1)
			let y = mp.game.controls.getDisabledControlNormal(7, 2)

			this.m_AxisX = this.m_AxisX + x 
			this.m_AxisY = this.m_AxisY + y

			let horizontal = Math.abs(this.m_AxisX) > Math.abs(this.m_AxisY)

			mp.game.graphics.setDrawOrigin(0, 0, 0, 0);
			if (horizontal){
				if (this.m_AxisX > 1.5){
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('right')`)
				}
				else if (this.m_AxisX < -1.5){
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('left')`)
				}
				else {
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('center')`)
				}
			} else {
				if (this.m_AxisY > 1.5){
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('bottom')`)
				}
				else if (this.m_AxisY < -1.5){
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('top')`)
				}
				else {
					this.m_CEF.execute(`Singleton.getReception().Event_OnGravityHover('center')`)
				}
			}
			mp.game.invoke('0xFF0B610F6BE0D7AF')
		} catch(exception){
			this.Error(exception, "Event_OnMouse")
		}
	}

	Event_OnStartWeaponSelect(){
		try{
			if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible) return
			this.m_AxisX = 0 
			this.m_AxisY = 0
			this.Update()
			if (mp.browsers.exists(this.m_CEF)){
				this.m_BlockForFrame = Date.now()
				mp.players.local.isWheelActive = true
				this.m_WeaponMenuPress = true
				mp.game.invoke("0xFC695459D4D0E219", 0.5, 0.5)
				mp.gui.cursor.show(false, true)
				this.m_CEF.execute(`Singleton.getReception().Event_OnShow('${getWeaponString()}')`)
			}
		} catch(exception){
			this.Error(exception, "Event_OnStartWeaponSelect")
		}
	}

	Event_OnEndWeaponSelect(){
		try{
			this.m_AxisX = 0 
			this.m_AxisY = 0

			if (!this.m_WeaponMenuPress) return
			if (mp.browsers.exists(this.m_CEF)){
				this.m_BlockForFrame = Date.now()
				mp.players.local.isWheelActive = false
				this.m_WeaponMenuPress = false
				mp.gui.cursor.show(false, false)
				this.m_CEF.execute("Singleton.getReception().Event_OnHide()")
			}
		} catch(exception){
			this.Error(exception, "Event_OnEndWeaponSelect")
		}
	}

	Event_OnWeaponSelect(hash){
		try{
			if (typeof hash === "undefined") return
			if (!this.m_Active) return
			if (!mp.browsers.exists(this.m_CEF)) return 


			if (this.m_LastWeapon != hash){
				this.m_AntiSpam.m_Warns++ 
				if (this.m_AntiSpam.m_Warns > 20) return mp.gui.chat.push("!{#FF0000}[ERROR] !{#FFFFFF}You are sending too many actions!")

				let isMelee = hash == "0xA2719263"

				if (typeof mp.players.local.hitByRubberBullet != "undefined" &&  (Date.now() - mp.players.local.hitByRubberBullet) < 5000) return; 

				if (mp.players.local.vehicle){
					setWeapon(hash)
					mp.events.callRemote("Weapon::Vehicle::SwitchWeapon", parseInt(hash).toString())
				}
				else
					mp.events.callRemote("Weapon::OnWeaponWheelSwitch", this.m_LastWeapon.toString(36), hash.toString(36), parseInt(hash).toString(), parseInt(this.m_LastWeapon, 16).toString(), isMelee)
			}

			this.m_LastWeapon = hash
		} catch(exception){
			this.Error(exception, "Event_OnWeaponSelect")
		}
	}

	Event_OnEquip(weapon){
		try{
			weapon = "0x" + parseInt(weapon, 36).toString(16).toUpperCase()
			if (mp.players.local.vehicle)
				setWeapon(weapon)
			else
				mp.events.callRemote("Weapon::OnWeaponWheelSwitch", ("0xA2719263").toString(36), weapon.toString(36), parseInt(weapon).toString(), parseInt("0xA2719263", 16).toString(), false)
		} catch(exception){
			this.Error(exception, "Event_OnEquip")
		}
	}

	Event_OnVehicleEnter(){
		try{
			setTimeout(function(){setWeapon(this.m_LastWeapon ? this.m_LastWeapon : "0xA2719263")}.bind(this), 1000)
			setTimeout(function(){setWeapon(this.m_LastWeapon ? this.m_LastWeapon : "0xA2719263")}.bind(this), 2000)
		} catch(exception){
			this.Error(exception, "Event_OnVehicleEnter")
		}
	}

	Event_OnVehicleExit(){
		try{
			setWeapon(this.m_LastWeapon ? this.m_LastWeapon : "0xA2719263")
		} catch(exception){
			this.Error(exception, "Event_OnVehicleExit")
		}
	}


	Event_OnQuickKey = {
		top : function(){
			if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible || this.m_Blockkeys) return
			if (mp.browsers.exists(this.m_CEF)){
					this.m_BlockForFrame = Date.now()
					this.m_BlockGravityHover = Date.now()
					this.m_CEF.execute(`Singleton.getReception().Event_KeyBind('top')`)
				}	
			},
		left : function(){
				if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible || this.m_Blockkeys) return
				if (mp.browsers.exists(this.m_CEF)){
					this.m_BlockForFrame = Date.now()
					this.m_BlockGravityHover = Date.now()
					this.m_CEF.execute(`Singleton.getReception().Event_KeyBind('left')`)
				}
			},

		right : function(){
			if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible || this.m_Blockkeys) return
			if (mp.browsers.exists(this.m_CEF)){
				this.m_BlockForFrame = Date.now()
				this.m_BlockGravityHover = Date.now()
				this.m_CEF.execute(`Singleton.getReception().Event_KeyBind('right')`)
			}
		},
		bottom: function(){
			if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible || this.m_Blockkeys) return
			if (mp.browsers.exists(this.m_CEF)){
				this.m_BlockForFrame = Date.now()
				this.m_BlockGravityHover = Date.now()
				this.m_CEF.execute(`Singleton.getReception().Event_KeyBind('bottom')`)
			}
		},
		center: function(){
			if (!this.m_Active || this.m_Blocked || mp.gui.cursor.visible || this.m_Blockkeys) return
			if (mp.browsers.exists(this.m_CEF)){
				this.m_BlockForFrame = Date.now()
				this.m_BlockGravityHover = Date.now()
				this.m_CEF.execute(`Singleton.getReception().Event_KeyBind('center')`)
			}
		},
	}

	Event_OnRemoteToggleActive(disable){
		try{
			this.m_Active = !disable 
			this.Setup()
		} catch(exception){
			this.Error(exception, "Event_OnRemoteToggleActive")
		}
	}

	Event_OnRemoteToggleMode(enable){
		try{
			this.m_SelectionMode = enable
		} catch(exception){
			this.Error(exception, "Event_OnRemoteToggleMode")
		}
	}

	Event_OnRemoteWeaponAdd(weaponHash){
		try{	
			if (!weaponHash) return
		
			let weapon = "0x" + parseInt(weaponHash, 36).toString(16).toUpperCase()
			
			if (!weapon) return 
			mp.events.call("onClientWeaponGive", weapon)

			this.m_Weapons.add(weapon)

			let data = {
				weapon : weapon,
				ammo : {clip : getAmmoInClip(weapon), total : getAmmoCount(weapon)},
				component : getComponents(parseInt(weaponHash, 36)),
			}

			if (mp.browsers.exists(this.m_CEF))
				this.m_CEF.execute(`Singleton.getReception().Event_AddWeapon('${JSON.stringify(data)}')`)

			this.m_LastWeapon = weapon
			setWeapon(this.m_LastWeapon)
		} catch(exception){
			this.Error(exception, "Event_OnRemoteWeaponAdd")
		}
	}

	Event_OnRemoteWeaponRemove(weaponHash){
		try{
			if (!weaponHash) return

			let weapon = "0x" + parseInt(weaponHash, 36).toString(16).toUpperCase()
			
			if (!weapon) return 

			mp.events.call("onClientWeaponTake", weapon)

			this.m_Weapons.delete(weapon)

			if (mp.browsers.exists(this.m_CEF))
				this.m_CEF.execute(`Singleton.getReception().Event_RemoveWeapon('${weapon}')`)
				
			this.m_LastWeapon = "0xA2719263"
			setWeapon(this.m_LastWeapon)
		} catch(exception){
			this.Error(exception, "Event_OnRemoteWeaponRemove")
		}
	}

	Event_OnRemoteWeaponRemoveAll(){
		try{
			mp.events.call("onClientWeaponTakeAll")
			this.m_Weapons = new Set()
			if (mp.browsers.exists(this.m_CEF))
				this.m_CEF.execute("Singleton.getReception().Event_ClearAll()")

			this.m_LastWeapon = "0xA2719263"
			setWeapon(this.m_LastWeapon)

		} catch(exception){
			this.Error(exception, "Event_OnRemoteWeaponRemoveAll")
		}
	}

	Update(hash){
		try{
			let data = []
			if (!hash){
				this.m_Weapons.forEach(weapon =>{
					data.push({
						weapon : weapon,
						ammo : {clip : getAmmoInClip(weapon), total : getAmmoCount(weapon)},
						component : getComponents(parseInt(weapon)),
					})
				})
			}
			else{
				if (this.m_Weapons[hash]){
					data.push({
						weapon : hash,
						ammo : {clip : getAmmoInClip(hash), total : getAmmoCount(hash)},
						component : getComponents(parseInt(hash)),
					})
				}
			}

			if (mp.browsers.exists(this.m_CEF))
				this.m_CEF.execute(`Singleton.getReception().Event_OnUpdate('${JSON.stringify(data)}')`)
		} catch(exception){
			this.Error(exception, "Update")
		}
	}

	Error(exception, where="General") {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("WeaponSelection@Exception: Print-Error", false, true)
        }
    }


}

__WeaponSelection = new WeaponSelection() // Initialise all


//**** Export Functions for Other Scripts  **/
function getLocalPlayerWeapons(){
	if (typeof __WeaponSelection === "undefined") return
	return __WeaponSelection.m_Weapons
}

function getSelection(){
	return __WeaponSelection
}
}