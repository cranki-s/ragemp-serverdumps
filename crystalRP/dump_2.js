global.chatActive = false;਍最氀漀戀愀氀⸀氀漀最最攀搀椀渀 㴀 昀愀氀猀攀㬀ഀ
global.localplayer = mp.players.local;਍ഀ
਍洀瀀⸀最甀椀⸀攀砀攀挀甀琀攀⠀∀眀椀渀搀漀眀⸀氀漀挀愀琀椀漀渀 㴀 ✀瀀愀挀欀愀最攀㨀⼀⼀挀攀昀⼀栀甀搀⸀栀琀洀氀✀∀⤀㬀ഀ
if (mp.storage.data.chatcfg == undefined) {਍    洀瀀⸀猀琀漀爀愀最攀⸀搀愀琀愀⸀挀栀愀琀挀昀最 㴀 笀ഀ
		timestamp: 0,਍ऀऀ挀栀愀琀猀椀稀攀㨀 　Ⰰഀ
		fontstep: 0,਍ऀऀ愀氀瀀栀愀㨀 ㄀ഀ
	};਍    洀瀀⸀猀琀漀爀愀最攀⸀昀氀甀猀栀⠀⤀㬀ഀ
}਍猀攀琀䤀渀琀攀爀瘀愀氀⠀昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
    var name = (localplayer.getVariable('REMOTE_ID') == undefined) ? `Не авторизован` : `Проводит время`; ਍ऀ洀瀀⸀搀椀猀挀漀爀搀⸀甀瀀搀愀琀攀⠀✀㴀〄 䌀爀礀猀琀愀氀 刀漀氀攀 倀氀愀礀✀Ⰰ 渀愀洀攀⤀㬀ഀ
}, 10000);਍ഀ
var pedsaying = null;਍瘀愀爀 瀀攀搀琀攀砀琀 㴀 ∀∀㬀ഀ
var pedtext2 = null;਍瘀愀爀 瀀攀搀琀椀洀攀爀 㴀 昀愀氀猀攀㬀ഀ
਍瘀愀爀 瀀爀攀猀猀攀搀爀愀眀 㴀 昀愀氀猀攀㬀ഀ
var pentloaded = false;਍瘀愀爀 攀洀猀氀漀愀搀攀搀 㴀 昀愀氀猀攀㬀ഀ
਍挀漀渀猀琀 眀愀氀欀猀琀礀氀攀猀 㴀 嬀渀甀氀氀Ⰰ∀洀漀瘀攀开洀䀀戀爀愀瘀攀∀Ⰰ∀洀漀瘀攀开洀䀀挀漀渀昀椀搀攀渀琀∀Ⰰ∀洀漀瘀攀开洀䀀搀爀甀渀欀䀀瘀攀爀礀搀爀甀渀欀∀Ⰰ∀洀漀瘀攀开洀䀀昀愀琀䀀愀∀Ⰰ∀洀漀瘀攀开洀䀀猀栀愀搀礀瀀攀搀䀀愀∀Ⰰ∀洀漀瘀攀开洀䀀栀甀爀爀礀䀀愀∀Ⰰ∀洀漀瘀攀开洀䀀椀渀樀甀爀攀搀∀Ⰰ∀洀漀瘀攀开洀䀀椀渀琀椀洀椀搀愀琀椀漀渀䀀㄀栀∀Ⰰ∀洀漀瘀攀开洀䀀焀甀椀挀欀∀Ⰰ∀洀漀瘀攀开洀䀀猀愀搀䀀愀∀Ⰰ∀洀漀瘀攀开洀䀀琀漀漀氀开戀攀氀琀䀀愀∀崀㬀ഀ
const moods = [null,"mood_aiming_1", "mood_angry_1", "mood_drunk_1", "mood_happy_1", "mood_injured_1", "mood_stressed_1", "mood_sulk_1"];਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀戀爀愀瘀攀∀⤀㬀ഀ
mp.game.streaming.requestClipSet("move_m@confident");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀搀爀甀渀欀䀀瘀攀爀礀搀爀甀渀欀∀⤀㬀ഀ
mp.game.streaming.requestClipSet("move_m@fat@a");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀猀栀愀搀礀瀀攀搀䀀愀∀⤀㬀ഀ
mp.game.streaming.requestClipSet("move_m@hurry@a");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀椀渀樀甀爀攀搀∀⤀㬀ഀ
mp.game.streaming.requestClipSet("move_m@intimidation@1h");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀焀甀椀挀欀∀⤀㬀ഀ
mp.game.streaming.requestClipSet("move_m@sad@a");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䌀氀椀瀀匀攀琀⠀∀洀漀瘀攀开洀䀀琀漀漀氀开戀攀氀琀䀀愀∀⤀㬀ഀ
var admingm = false;਍ഀ
mp.game.object.doorControl(mp.game.joaat('gabz_mrpd_cells_door'), 484.1764, -1007.734, 26.4800520, true, 0.0, 50.0, 0); //door close਍洀瀀⸀最愀洀攀⸀愀甀搀椀漀⸀猀攀琀䄀甀搀椀漀䘀氀愀最⠀∀䐀椀猀愀戀氀攀䘀氀椀最栀琀䴀甀猀椀挀∀Ⰰ 琀爀甀攀⤀㬀ഀ
਍最氀漀戀愀氀⸀一愀琀椀瘀攀唀䤀 㴀 爀攀焀甀椀爀攀⠀∀⸀⼀渀愀琀椀瘀攀甀椀⸀樀猀∀⤀㬀ഀ
global.Menu = NativeUI.Menu;਍最氀漀戀愀氀⸀唀䤀䴀攀渀甀䤀琀攀洀 㴀 一愀琀椀瘀攀唀䤀⸀唀䤀䴀攀渀甀䤀琀攀洀㬀ഀ
global.UIMenuListItem = NativeUI.UIMenuListItem;਍最氀漀戀愀氀⸀唀䤀䴀攀渀甀䌀栀攀挀欀戀漀砀䤀琀攀洀 㴀 一愀琀椀瘀攀唀䤀⸀唀䤀䴀攀渀甀䌀栀攀挀欀戀漀砀䤀琀攀洀㬀ഀ
global.UIMenuSliderItem = NativeUI.UIMenuSliderItem;਍最氀漀戀愀氀⸀䈀愀搀最攀匀琀礀氀攀 㴀 一愀琀椀瘀攀唀䤀⸀䈀愀搀最攀匀琀礀氀攀㬀ഀ
global.Point = NativeUI.Point;਍最氀漀戀愀氀⸀䤀琀攀洀猀䌀漀氀氀攀挀琀椀漀渀 㴀 一愀琀椀瘀攀唀䤀⸀䤀琀攀洀猀䌀漀氀氀攀挀琀椀漀渀㬀ഀ
global.Color = NativeUI.Color;਍最氀漀戀愀氀⸀䰀椀猀琀䤀琀攀洀 㴀 一愀琀椀瘀攀唀䤀⸀䰀椀猀琀䤀琀攀洀㬀ഀ
਍ഀ
//scream਍洀瀀⸀欀攀礀猀⸀戀椀渀搀⠀　砀㔀䘀Ⰰ琀爀甀攀Ⰰ 昀甀渀挀琀椀漀渀 ⠀⤀ 笀 ഀ
    let weaponHash = mp.game.invoke(0x0A6DB4965674D243, mp.players.local.handle); //GET_SELECTED_PED_WEAPON਍    氀攀琀 搀愀洀愀最攀吀礀瀀攀 㴀 洀瀀⸀最愀洀攀⸀眀攀愀瀀漀渀⸀最攀琀圀攀愀瀀漀渀䐀愀洀愀最攀吀礀瀀攀⠀眀攀愀瀀漀渀䠀愀猀栀⤀㬀ഀ
    if (damageType == 3)਍笀ഀ
    player.setWeaponDamageModifier(0.3);਍紀ഀ
else਍笀紀ഀ
})਍ഀ
function SetWalkStyle(entity, walkstyle) {਍ഀ
		if (walkstyle == null) entity.resetMovementClipset(0.0);਍ऀऀ攀氀猀攀 攀渀琀椀琀礀⸀猀攀琀䴀漀瘀攀洀攀渀琀䌀氀椀瀀猀攀琀⠀眀愀氀欀猀琀礀氀攀Ⰰ 　⸀　⤀㬀ഀ
਍紀ഀ
਍昀甀渀挀琀椀漀渀 匀攀琀䴀漀漀搀⠀攀渀琀椀琀礀Ⰰ 洀漀漀搀⤀ 笀ഀ
਍ऀ椀昀 ⠀洀漀漀搀 㴀㴀 渀甀氀氀⤀ 攀渀琀椀琀礀⸀挀氀攀愀爀䘀愀挀椀愀氀䤀搀氀攀䄀渀椀洀伀瘀攀爀爀椀搀攀⠀⤀㬀ഀ
		else mp.game.invoke('0xFFC24B988B938B38', entity.handle, mood, 0);਍ഀ
}਍ഀ
mp.events.add('chatconfig', function (a, b) {਍ऀ椀昀⠀愀 㴀㴀 　⤀ 洀瀀⸀猀琀漀爀愀最攀⸀搀愀琀愀⸀挀栀愀琀挀昀最⸀琀椀洀攀猀琀愀洀瀀 㴀 戀㬀ഀ
    else if(a == 1) mp.storage.data.chatcfg.chatsize = b;਍ऀ攀氀猀攀 椀昀⠀愀 㴀㴀 ㈀⤀ 洀瀀⸀猀琀漀爀愀最攀⸀搀愀琀愀⸀挀栀愀琀挀昀最⸀昀漀渀琀猀琀攀瀀 㴀 戀㬀ഀ
	else mp.storage.data.chatcfg.alpha = b;਍ऀ洀瀀⸀猀琀漀爀愀最攀⸀昀氀甀猀栀⠀⤀㬀ഀ
});਍ഀ
mp.events.add('setFriendList', function (friendlist) {਍ऀ昀爀椀攀渀搀猀 㴀 笀紀㬀ഀ
	friendlist.forEach(friend => {਍ऀऀ昀爀椀攀渀搀猀嬀昀爀椀攀渀搀崀 㴀 琀爀甀攀㬀ഀ
    });਍紀⤀㬀ഀ
਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀猀攀琀䌀氀椀攀渀琀刀漀琀愀琀椀漀渀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀瀀氀愀礀攀爀Ⰰ 爀漀琀猀⤀ 笀ഀ
	if (player !== undefined && player != null && localplayer != player) player.setRotation(0, 0, rots, 2, true);਍紀⤀㬀ഀ
਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀猀攀琀圀漀爀氀搀䰀椀最栀琀猀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀琀漀最最氀攀⤀ 笀ഀ
਍ऀऀ洀瀀⸀最愀洀攀⸀最爀愀瀀栀椀挀猀⸀爀攀猀攀琀䰀椀最栀琀猀匀琀愀琀攀⠀⤀㬀ഀ
		for (let i = 0; i <= 16; i++) {਍ऀऀऀ椀昀⠀椀 ℀㴀 㘀 ☀☀ 椀 ℀㴀 㜀⤀ 洀瀀⸀最愀洀攀⸀最爀愀瀀栀椀挀猀⸀猀攀琀䰀椀最栀琀猀匀琀愀琀攀⠀椀Ⰰ 琀漀最最氀攀⤀㬀ഀ
		}਍ഀ
});਍ഀ
mp.events.add('setDoorLocked', function (model, x, y, z, locked, angle) {਍    洀瀀⸀最愀洀攀⸀漀戀樀攀挀琀⸀搀漀漀爀䌀漀渀琀爀漀氀⠀洀漀搀攀氀Ⰰ 砀Ⰰ 礀Ⰰ 稀Ⰰ 氀漀挀欀攀搀Ⰰ 　Ⰰ 　Ⰰ 愀渀最氀攀⤀㬀ഀ
});਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀挀栀愀渀最攀䌀栀愀琀匀琀愀琀攀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀猀琀愀琀攀⤀ 笀ഀ
    chatActive = state;਍ऀ洀瀀⸀最甀椀⸀攀砀攀挀甀琀攀⠀怀䠀唀䐀⸀愀挀琀椀瘀攀㴀␀笀猀琀愀琀攀紀怀⤀㬀ഀ
});਍ഀ
mp.events.add('PressE', function (toggle) {਍    瀀爀攀猀猀攀搀爀愀眀 㴀 琀漀最最氀攀㬀ഀ
});਍ഀ
var JobMenusBlip = [];਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀䨀漀戀䴀攀渀甀猀䈀氀椀瀀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀甀椀搀Ⰰ 琀礀瀀攀Ⰰ 瀀漀猀椀琀椀漀渀Ⰰ 渀愀洀攀猀Ⰰ 搀椀爀⤀ 笀ഀ
    if (typeof JobMenusBlip[uid] != "undefined") {਍        䨀漀戀䴀攀渀甀猀䈀氀椀瀀嬀甀椀搀崀⸀搀攀猀琀爀漀礀⠀⤀㬀ഀ
        JobMenusBlip[uid] = undefined;਍    紀ഀ
    if (dir != undefined) {਍        䨀漀戀䴀攀渀甀猀䈀氀椀瀀嬀甀椀搀崀 㴀 洀瀀⸀戀氀椀瀀猀⸀渀攀眀⠀琀礀瀀攀Ⰰ 瀀漀猀椀琀椀漀渀Ⰰഀ
            {਍                渀愀洀攀㨀 渀愀洀攀猀Ⰰഀ
                scale: 1,਍                挀漀氀漀爀㨀 㐀Ⰰഀ
                alpha: 255,਍                搀爀愀眀䐀椀猀琀愀渀挀攀㨀 ㄀　　Ⰰഀ
                shortRange: false,਍                爀漀琀愀琀椀漀渀㨀 　Ⰰഀ
                dimension: 0਍            紀⤀㬀ഀ
    }਍ഀ
});਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀搀攀氀攀琀攀䨀漀戀䴀攀渀甀猀䈀氀椀瀀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀甀椀搀⤀ 笀ഀ
    if (typeof JobMenusBlip[uid] == "undefined") return;਍    䨀漀戀䴀攀渀甀猀䈀氀椀瀀嬀甀椀搀崀⸀搀攀猀琀爀漀礀⠀⤀㬀ഀ
    JobMenusBlip[uid] = undefined;਍紀⤀㬀ഀ
਍瘀愀爀 瀀氀愀礀攀爀 㴀 洀瀀⸀瀀氀愀礀攀爀猀⸀氀漀挀愀氀㬀ഀ
mp.events.add("startdiving", () => {਍    瀀氀愀礀攀爀⸀猀攀琀䴀愀砀吀椀洀攀唀渀搀攀爀眀愀琀攀爀⠀㄀　　　⤀㬀ഀ
});਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀∀猀琀漀瀀搀椀瘀椀渀最∀Ⰰ ⠀⤀ 㴀㸀 笀ഀ
    player.setMaxTimeUnderwater(10);਍紀⤀㬀ഀ
਍ഀ
mp.peds.new(0xA0FDA755, new mp.Vector3(145.4551, -374.02405, 43.23697), 35.74032);਍洀瀀⸀瀀攀搀猀⸀渀攀眀⠀　砀䔀䄀䌀㈀䌀㜀䔀䔀Ⰰ 渀攀眀 洀瀀⸀嘀攀挀琀漀爀㌀⠀㄀㘀㤀㔀⸀㠀　㘀Ⰰ 㐀㌀⸀　㔀㐀㐀㘀Ⰰ ㄀㘀㄀⸀㜀㐀㜀㌀⤀Ⰰ 㤀㤀⸀㘀　⤀㬀ഀ
mp.peds.new(0xA0FDA755, new mp.Vector3(2946.686, 2746.836, 43.40), 288.2411);਍ഀ
mp.events.add("blackday", (check) => {਍ऀ昀漀爀 ⠀氀攀琀 椀 㴀 　㬀 椀 㰀㴀 ㄀㘀㬀 椀⬀⬀⤀ഀ
	{਍ऀऀ洀瀀⸀最愀洀攀⸀最爀愀瀀栀椀挀猀⸀猀攀琀䰀椀最栀琀猀匀琀愀琀攀⠀椀Ⰰ 挀栀攀挀欀⤀㬀ഀ
	}਍紀⤀㬀ഀ
਍爀攀焀甀椀爀攀⠀✀⸀⼀甀琀椀氀猀⼀欀攀礀猀⸀樀猀✀⤀㬀ഀ
਍氀攀琀 爀匀琀爀攀愀洀 㴀 渀甀氀氀㬀ഀ
਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀猀琀愀爀琀爀愀搀椀漀✀Ⰰ ⠀⤀ 㴀㸀 笀ഀ
	if (rStream == null)਍ऀ笀ഀ
		rStream = mp.browsers.new('package://cef/radio.html');਍ऀ紀ഀ
});਍洀瀀⸀攀瘀攀渀琀猀⸀愀搀搀⠀✀猀琀漀瀀爀愀搀椀漀✀Ⰰ ⠀⤀ 㴀㸀 笀ഀ
	if (rStream != null)਍ऀ笀ഀ
		rStream.destroy();਍ऀऀ爀匀琀爀攀愀洀 㴀 渀甀氀氀㬀ഀ
	}਍紀⤀㬀ഀ
਍昀甀渀挀琀椀漀渀 昀漀爀洀愀琀䤀渀琀娀攀爀漀⠀渀甀洀Ⰰ 氀攀渀最琀栀⤀ 笀 ഀ
    ਍    爀攀琀甀爀渀 ⠀∀　∀ ⬀ 渀甀洀⤀⸀猀氀椀挀攀⠀氀攀渀最琀栀⤀㬀 ഀ
} ਍ഀ
global.rotator = require("./utils/VehicleRotator.js");਍ഀ
mp.game.gxt.set("PM_PAUSE_HDR", "Role Play");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀戀栀㄀开㐀㜀开樀漀猀栀栀猀攀开甀渀戀甀爀渀琀∀⤀㬀ഀ
mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt_lod");਍ഀ
mp.game.streaming.requestIpl("CanyonRvrShallow");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀挀栀㄀开　㈀开漀瀀攀渀∀⤀㬀ഀ
mp.game.streaming.requestIpl("Carwash_with_spinners");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀猀瀀㄀开㄀　开爀攀愀氀开椀渀琀攀爀椀漀爀∀⤀㬀ഀ
mp.game.streaming.requestIpl("sp1_10_real_interior_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀昀攀爀爀椀猀开昀椀渀愀氀攀开䄀渀椀洀∀⤀㬀ഀ
mp.game.streaming.requestIpl("fiblobby");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀昀椀戀氀漀戀戀礀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("apa_ss1_11_interior_v_rockclub_milo_");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀攀椀开猀洀开㄀㘀开椀渀琀攀爀椀漀爀开瘀开戀愀栀愀洀愀开洀椀氀漀开∀⤀㬀ഀ
mp.game.streaming.requestIpl("hei_hw1_blimp_interior_v_comedy_milo_");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀最爀开挀愀猀攀㘀开戀甀渀欀攀爀挀氀漀猀攀搀∀⤀㬀ഀ
਍⼀⼀Ḁ℄∄ Ḅሄഄ
mp.game.streaming.requestIpl("h4_mph4_terrain_01_grass_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㄀开最爀愀猀猀开㄀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_02_grass_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㈀开最爀愀猀猀开㄀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_02_grass_2");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㈀开最爀愀猀猀开㌀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_04_grass_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㐀开最爀愀猀猀开㄀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_05_grass_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㘀开最爀愀猀猀开　 ∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_01");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㄀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_01_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㈀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_02_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㈀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_03");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㌀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_04");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㐀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_04_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㔀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_05_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㔀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_06");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开　㘀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_06_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开愀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_a_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开戀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_b_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开挀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_c_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_d_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开搀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_e");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开攀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_e_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开昀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_05_f_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㔀开昀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_06_a");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㘀开愀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_06_a_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㘀开戀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_06_b_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㘀开戀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_06_c");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开琀攀爀爀愀椀渀开瀀爀漀瀀猀开　㘀开挀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_terrain_props_06_c_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㄀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_01_long_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㈀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_03");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㐀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_05");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开　㘀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_06_strm_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_occ_01");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开漀挀挀开　㈀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_occ_03");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开漀挀挀开　㐀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_occ_05");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开漀挀挀开　㘀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_occ_07");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开琀攀爀爀愀椀渀开漀挀挀开　㠀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_terrain_occ_09");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_disc_strandedshark");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开搀椀猀挀开猀琀爀愀渀搀攀搀猀栀愀爀欀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_disc_strandedwhale");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开搀椀猀挀开猀琀爀愀渀搀攀搀眀栀愀氀攀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_props");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开瀀爀漀瀀猀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_sea_mines");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开椀猀氀愀渀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_island_long_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开椀猀氀愀渀搀开猀琀爀洀开　∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_aa_guns_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开愀愀开最甀渀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_beach");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开戀攀愀挀栀开戀愀爀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_beach_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开戀攀愀挀栀开瀀愀爀琀礀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_beach_party_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开戀攀愀挀栀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_beach_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开戀攀愀挀栀开瀀爀漀瀀猀开瀀愀爀琀礀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_beach_props_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开戀攀愀挀栀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开搀漀漀爀猀挀氀漀猀攀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_doorsclosed_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开栀愀渀最愀爀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_hangar_props");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开栀愀渀最愀爀开瀀爀漀瀀猀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_hangar_props_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_props");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开瀀爀漀瀀猀戀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_propsb_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开瀀爀漀瀀猀戀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀愀椀爀猀琀爀椀瀀开瀀爀漀瀀猀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandairstrip_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀挀愀渀愀氀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxcanal_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀挀愀渀愀氀开瀀爀漀瀀猀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxdock");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀搀漀挀欀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxdock_props");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀搀漀挀欀开瀀爀漀瀀猀开㈀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxdock_props_2_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀搀漀挀欀开瀀爀漀瀀猀开㈀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxdock_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀搀漀挀欀开瀀爀漀瀀猀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxdock_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀搀漀挀欀开眀愀琀攀爀开栀愀琀挀栀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxtower");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀琀漀眀攀爀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxtower_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀琀漀眀攀爀开瘀攀最∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandxtower_veg_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀琀漀眀攀爀开瘀攀最开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_barrack_hatch");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开戀愀爀爀愀挀欀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_barrack_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开戀愀爀爀愀挀欀开瀀爀漀瀀猀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_checkpoint");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开挀栀攀挀欀瀀漀椀渀琀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_checkpoint_props");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开挀栀攀挀欀瀀漀椀渀琀开瀀爀漀瀀猀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_checkpoint_props_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀椀渀搀漀挀欀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_maindock_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀椀渀搀漀挀欀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_maindock_props_2");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀椀渀搀漀挀欀开瀀爀漀瀀猀开㈀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_maindock_props_2_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀椀渀搀漀挀欀开瀀爀漀瀀猀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_maindock_props_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀椀渀搀漀挀欀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开戀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_b_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开戀开猀椀搀攀开昀攀渀挀攀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_b_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开攀渀琀爀愀渀挀攀开昀攀渀挀攀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_guardfence");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开氀椀最栀琀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_lockup_01");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开氀漀挀欀甀瀀开　㄀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_lockup_02");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开氀漀挀欀甀瀀开　㈀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_lockup_03");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开氀漀挀欀甀瀀开　㌀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开漀昀昀椀挀攀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_office_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_props_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开瀀爀漀瀀猀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀砀开洀愀渀猀椀漀渀开瘀愀甀氀琀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_islandx_mansion_vault_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开椀猀氀愀渀搀开瀀愀搀氀漀挀欀开瀀爀漀瀀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_airstrip_hanger");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀愀渀猀椀漀渀开爀攀洀愀椀渀猀开挀愀最攀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_airstrip");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开愀椀爀猀琀爀椀瀀开椀渀琀攀爀椀漀爀开　开愀椀爀猀琀爀椀瀀开栀愀渀最攀爀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_beach");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开搀漀挀欀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_island_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开椀猀氀愀渀搀开渀攀开瀀氀愀挀攀洀攀渀琀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_island_nw_placement");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开椀猀氀愀渀搀开猀攀开瀀氀愀挀攀洀攀渀琀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_island_sw_placement");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开洀愀渀猀椀漀渀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_mansion_b");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开洀愀渀猀椀漀渀开戀开猀琀爀洀开　∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_mph4_mansion_strm_0");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开洀瀀栀㐀开眀琀漀眀攀爀猀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_00");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　　开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_00_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㄀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_01_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㄀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_02");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㈀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_02_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㌀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_03_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㌀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_04");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㐀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_04_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㔀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_05_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㔀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_06");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㘀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_06_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㜀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_07_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㜀开猀氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_08");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㠀开氀漀搀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_08_slod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㤀∀⤀㬀ഀ
mp.game.streaming.requestIpl("h4_ne_ipl_09_lod");਍洀瀀⸀最愀洀攀⸀猀琀爀攀愀洀椀渀最⸀爀攀焀甀攀猀琀䤀瀀氀⠀∀栀㐀开渀攀开椀瀀氀开　㤀开猀氀漀搀∀⤀㬀ഀ
mp.g