{
var IMAGE_PATH = "files/image/"
var COMPONENT_ICON = [
	IMAGE_PATH + "no-sound.svg", 
	IMAGE_PATH + "taclight.svg", 
	IMAGE_PATH + "mag.svg",
]

var ICON_PATH = IMAGE_PATH + "Weapons/"

var VERTICAL_WEAPON_IMAGE_SIZE = {x: 257.76285, y: 65.81707}
var HORIZONTAL_WEAPON_IMAGE_SIZE = {x: 94.149452, y: 99.890274}

var WEAPON_SLOT_SIZE = {

	"Left" : {x: 128, y : 80}, 
	"Right" : {x: 152, y : 49},
	"Top" : {x: 164, y: 57}, 
	"Bottom" : {x : 164, y: 57},
}

var WEAPON_IMAGE_SIZES = {
	"0x92A27487" : 		{ x : 164, y : 53},
	"0x958A4A8F" : 		{ x : 164, y : 19},
	"0xF9E6AA4B" : 		{ x : 152, y : 49},
	"0x84BD7BFD" : 		{ x : 164, y : 43},
	"0xA2719263" : 		{ x : 84, y : 84},
	"0x8BB05FD7" : 		{ x : 164, y : 31},
	"0x440E4788" : 		{ x : 164, y : 24},
	"0x4E875F73" : 		{ x : 164, y : 65},
	"0xF9DCBF2D" : 		{ x : 164, y : 59},
	"0xD8DF3C3C" : 		{ x : 126, y : 84},
	"0x99B507EA" : 		{ x : 164, y : 38},
	"0xDD5DF8D9" : 		{ x : 164, y : 30},
	"0xDFE37640" : 		{ x : 164, y : 35},
	"0x678B81B1" : 		{ x : 164, y : 46},
	"0x19044EE0" : 		{ x : 164, y : 35},
	"0xCD274149" : 		{ x : 164, y : 75},
	"0x94117305" : 		{ x : 164, y : 13},
	"0x3813FC08" : 		{ x : 164, y : 74},
	"0x1B06D571" : 		{ x : 128, y : 80},
	"0xBFE256D4" : 		{ x : 142, y : 98},
	"0x5EF9FEC4" : 		{ x : 112, y : 80},
	"0x22D8FE39" : 		{ x : 158, y : 78},
	"0x3656C8C1" : 		{ x : 115, y : 74},
	"0x99AEEB3B" : 		{ x : 136, y : 93},
	"0xBFD21232" : 		{ x : 92, y : 77},
	"0x88374054" : 		{ x : 93, y : 76},
	"0xD205520E" : 		{ x : 130, y : 96},
	"0x83839C4"  : 		{ x : 153, y : 82},
	"0x47757124" : 		{ x : 140, y : 85},
	"0xDC4DB296" : 		{ x : 164, y : 69},
	"0xC1B3C3D1" : 		{ x : 164, y : 79},
	"0xCB96392F" : 		{ x : 164, y : 81},
	"0x97EA20B8" : 		{ x : 164, y : 71},
	"0xAF3696A1" : 		{ x : 164, y : 84},
	"0x2B5EF5EC" : 		{ x : 134, y : 97},
	"0x917F6C8C" : 		{ x : 164, y : 58},
	"0x13532244" : 		{ x : 164, y : 66},
	"0x2BE6766B" : 		{ x : 164, y : 56},
	"0x78A97CD0" : 		{ x : 164, y : 98},
	"0xEFE7E2DF" : 		{ x : 164, y : 60},
	"0xA3D4D34" : 		{ x : 164, y : 57},
	"0xDB1AA450" : 		{ x : 164, y : 87},
	"0xBD248B55" : 		{ x : 164, y : 95},
	"0x476BF155" : 		{ x : 164, y : 63},
	"0x1D073A89" : 		{ x : 164, y : 35},
	"0x5A96BA4" : 		{ x : 164, y : 35},
	"0x555AF99A" : 		{ x : 164, y : 35},
	"0x7846A318" : 		{ x : 164, y : 59},
	"0xE284C527" : 		{ x : 164, y : 48},
	"0x9D61E50F" : 		{ x : 164, y : 53},
	"0xA89CB99E" : 		{ x : 164, y : 30},
	"0x3AABBBAA" : 		{ x : 164, y : 41},
	"0xEF951FBB" : 		{ x : 164, y : 59},
	"0x12E82D3D" : 		{ x : 164, y : 83},
	"0xBFEFFF6D" : 		{ x : 164, y : 51},
	"0x394F415C" : 		{ x : 164, y : 50},
	"0x83BF0278" : 		{ x : 164, y : 57},
	"0xFAD1F1C9" : 		{ x : 164, y : 57},
	"0xAF113F99" : 		{ x : 164, y : 63},
	"0xC0A3098D" : 		{ x : 164, y : 61},
	"0x969C3D67" : 		{ x : 164, y : 59},
	"0x7F229F94" : 		{ x : 164, y : 63},
	"0x84D6FAFD" : 		{ x : 164, y : 71},
	"0x624FE830" : 		{ x : 164, y : 93},
	"0x9D07F764" : 		{ x : 164, y : 42},
	"0x7FD62962" : 		{ x : 164, y : 48},
	"0xDBBD7280" : 		{ x : 164, y : 49},
	"0x61012683" : 		{ x : 164, y : 44},
	"0x5FC3C11" : 		{ x : 164, y : 35},
	"0xC472FE2" : 		{ x : 164, y : 40},
	"0xA914799"  : 		{ x : 164, y : 44},
	"0xC734385A" : 		{ x : 164, y : 45},
	"0x6A6C02E0" : 		{ x : 164, y : 47},
	"0xB1CA77B1" : 		{ x : 164, y : 29},
	"0xA284510B" : 		{ x : 164, y : 52},
	"0x4DD2DC56" : 		{ x : 164, y : 52},
	"0x42BF8A85" : 		{ x : 164, y : 53},
	"0x7F7497E5" : 		{ x : 164, y : 29},
	"0x6D544C99" : 		{ x : 164, y : 41},
	"0x63AB0442" : 		{ x : 164, y : 36},
	"0x781FE4A" : 		{ x : 164, y : 95},
	"0xB62D1F67" : 		{ x : 164, y : 51},
	"0x93E220BD" : 		{ x : 64, y : 93},
	"0xA0973D5E" : 		{ x : 56, y : 120},
	"0x24B17070" : 		{ x : 120, y : 120},
	"0x2C3731D9" : 		{ x : 152, y : 64},
	"0xAB564B93" : 		{ x : 141, y : 60},
	"0x787F0BB"  : 		{ x : 76, y : 77},
	"0xBA45E8B8" : 		{ x : 164, y : 54},
	"0x23C9F95C" : 		{ x : 72, y : 69},
	"0xFDBC8A50" : 		{ x : 56, y : 120},
	"0x497FACC3" : 		{ x : 153, y : 33},
	"0x34A67B97" : 		{ x : 94, y : 120},
	"0xFBAB5776" : 		{ x : 93, y : 120},
	"0x60EC506" : 		{ x : 51, y : 120},
	"0xBA536372" : 		{ x : 94, y : 120},
	"0x22C0EF84" : 		{ x : 250, y : 55},
	"0xF8D636B5" : 		{ x : 208, y : 148},
	"0x65E0F9C0" : 		{ x : 162, y : 127},
	"0x6CB2F097" : 		{ x : 217, y : 163},
	"0xD3507284" : 		{ x : 259, y : 195},
	"0x4C91E93F" :		{ x : 300, y : 65},
	"0x79E80472" : 		{ x : 300, y : 65},
	"0xC49312CA" : 		{ x : 300, y : 91},
	"0x49542FA0" : 		{ x : 300, y : 129},
	"0x69FE49C4" : 		{ x : 300, y : 129},
	"0x1406F53D" : 		{ x : 327, y : 170},
	"0x28CBCDFB" : 		{ x : 250, y : 170},
	
}

var WEAPON_DATA = {
	"0x92A27487" : 		{ name : " Antique Cavalry Dagger", group : "melee"},
	"0x958A4A8F" : 		{ name : " Baseball Bat", group : "melee"},
	"0xF9E6AA4B" : 		{ name : " Broken Bottle", group : "melee"},
	"0x84BD7BFD" : 		{ name : " Crowbar", group : "melee"},
	"0xA2719263" : 		{ name : " Fist", group : "melee"},
	"0x8BB05FD7" : 		{ name : " Flashlight", group : "melee"},
	"0x440E4788" : 		{ name : " Golf Club", group : "melee"},
	"0x4E875F73" : 		{ name : " Hammer", group : "melee"},
	"0xF9DCBF2D" : 		{ name : " Hatchet", group : "melee"},
	"0xD8DF3C3C" : 		{ name : " Brass Knuckles", group : "melee"},
	"0x99B507EA" : 		{ name : " Knife", group : "melee"},
	"0xDD5DF8D9" : 		{ name : " Machete", group : "melee"},
	"0xDFE37640" : 		{ name : " Switchblade", group : "melee"},
	"0x678B81B1" : 		{ name : " Nightstick", group : "melee"},
	"0x19044EE0" : 		{ name : " Pipe Wrench", group : "melee"},
	"0xCD274149" : 		{ name : " Battle Axe", group : "melee"},
	"0x94117305" : 		{ name : " Pool Cue", group : "melee"},
	"0x3813FC08" : 		{ name : " Stone Hatchet", group : "melee"},
	"0x1B06D571" : 		{ name : " Pistol", group : "handguns"},
	"0xBFE256D4" : 		{ name : " Pistol Mk II", group : "handguns"},
	"0x5EF9FEC4" : 		{ name : " Combat Pistol", group : "handguns"},
	"0x22D8FE39" : 		{ name : " AP Pistol", group : "handguns"},
	"0x3656C8C1" : 		{ name : " Stun Gun", group : "less_lethal"},
	"0x99AEEB3B" : 		{ name : " Pistol .50", group : "handguns"},
	"0xBFD21232" : 		{ name : " SNS Pistol", group : "handguns"},
	"0x88374054" : 		{ name : " SNS Pistol Mk II", group : "handguns"},
	"0xD205520E" : 		{ name : " Heavy Pistol", group : "handguns"},
	"0x83839C4"  : 		{ name : " Vintage Pistol", group : "handguns"},
	"0x47757124" : 		{ name : " Flare Gun", group : "handguns"},
	"0xDC4DB296" : 		{ name : " Marksman Pistol", group : "handguns"},
	"0xC1B3C3D1" : 		{ name : " Heavy Revolver", group : "handguns"},
	"0xCB96392F" : 		{ name : " Heavy Revolver Mk II", group : "handguns"},
	"0x97EA20B8" : 		{ name : " Double Action Revolver", group : "handguns"},
	"0xAF3696A1" : 		{ name : " Up-n-Atomizer", group : "handguns"},
	"0x2B5EF5EC" : 		{ name : " Ceramic Pistol", group : "handguns"},
	"0x917F6C8C" : 		{ name : " Navy Revolver", group : "handguns"},
	"0x13532244" : 		{ name : " Micro SMG", group : "handguns"},
	"0x2BE6766B" : 		{ name : " SMG", group : "smg"},
	"0x78A97CD0" : 		{ name : " SMG Mk II", group : "handguns"},
	"0xEFE7E2DF" : 		{ name : " Assault SMG", group : "smg"},
	"0xA3D4D34"  : 		{ name : " Combat PDW", group : "sniper_rifles"},
	"0xDB1AA450" : 		{ name : " Machine Pistol", group : "handguns"},
	"0xBD248B55" : 		{ name : " Mini SMG", group : "handguns"},
	"0x476BF155" : 		{ name : " Unholy Hellbringer", group : "smg"},
	"0x1D073A89" : 		{ name : " Pump Shotgun", group : "shotguns"},
	"0x555AF99A" : 		{ name : " Pump Shotgun Mk II", group : "shotguns"},
	"0x7846A318" : 		{ name : " Sawed-Off Shotgun", group : "shotguns"},
	"0xE284C527" : 		{ name : " Assault Shotgun", group : "shotguns"},
	"0x9D61E50F" : 		{ name : " Bullpup Shotgun", group : "shotguns"},
	"0xA89CB99E" : 		{ name : " Musket", group : "shotguns"},
	"0x3AABBBAA" : 		{ name : " Heavy Shotgun", group : "shotguns"},
	"0xEF951FBB" : 		{ name : " Double Barrel Shotgun", group : "shotguns"},
	"0x12E82D3D" : 		{ name : " Sweeper Shotgun", group : "shotguns"},
	"0x5A96BA4" : 		{ name : " Combat Shotgun", group : "shotguns"},
	"0xBFEFFF6D" : 		{ name : " Assault Rifle", group : "assault_rifles"},
	"0x394F415C" : 		{ name : " Assault Rifle Mk II", group : "assault_rifles"},
	"0x83BF0278" : 		{ name : " Carbine Rifle", group : "assault_rifles"},
	"0xFAD1F1C9" : 		{ name : " Carbine Rifle Mk II", group : "assault_rifles"},
	"0xAF113F99" : 		{ name : " Advanced Rifle", group : "assault_rifles"},
	"0xC0A3098D" : 		{ name : " Special Carbine", group : "assault_rifles"},
	"0x969C3D67" : 		{ name : " Special Carbine Mk II", group : "assault_rifles"},
	"0x7F229F94" : 		{ name : " Bullpup Rifle", group : "assault_rifles"},
	"0x84D6FAFD" : 		{ name : " Bullpup Rifle Mk II", group : "assault_rifles"},
	"0x624FE830" : 		{ name : " Compact Rifle", group : "assault_rifles"},
	"0x9D07F764" : 		{ name : " MG", group : "machine_guns"},
	"0x7FD62962" : 		{ name : " Combat MG", group : "machine_guns"},
	"0xDBBD7280" : 		{ name : " Combat MG Mk II", group : "machine_guns"},
	"0x61012683" : 		{ name : " Gusenberg Sweeper", group : "machine_guns"},
	"0x5FC3C11"  : 		{ name : " Sniper Rifle", group : "sniper_rifles"},
	"0xC472FE2"  : 		{ name : " Heavy Sniper", group : "sniper_rifles"},
	"0xA914799"  : 		{ name : " Heavy Sniper Mk II", group : "sniper_rifles"},
	"0xC734385A" : 		{ name : " Marksman Rifle", group : "sniper_rifles"},
	"0x6A6C02E0" : 		{ name : " Marksman Rifle Mk II", group : "sniper_rifles"},
	"0xB1CA77B1" : 		{ name : " RPG", group : "heavy_weapons"},
	"0xA284510B" : 		{ name : " Grenade Launcher", group : "heavy_weapons"},
	"0x4DD2DC56" : 		{ name : " Grenade Launcher Smoke", group : "heavy_weapons"},
	"0x42BF8A85" : 		{ name : " Minigun", group : "heavy_weapons"},
	"0x7F7497E5" : 		{ name : " Firework Launcher", group : "heavy_weapons"},
	"0x6D544C99" : 		{ name : " Railgun", group : "heavy_weapons"},
	"0x63AB0442" : 		{ name : " Homing Launcher", group : "heavy_weapons"},
	"0x781FE4A"  : 		{ name : " Compact Grenade Launcher", group : "sniper_rifles"},
	"0xB62D1F67" : 		{ name : " Widowmaker", group : "heavy_weapons"},
	"0x93E220BD" : 		{ name : " Grenade", group : "throwables"},
	"0xA0973D5E" : 		{ name : " BZ Gas", group : "throwables"},
	"0x24B17070" : 		{ name : " Molotov Cocktail", group : "throwables"},
	"0x2C3731D9" : 		{ name : " Sticky Bomb", group : "throwables"},
	"0xAB564B93" : 		{ name : " Proximity Mines", group : "throwables"},
	"0x787F0BB"  : 		{ name : " Snowballs", group : "throwables"},
	"0xBA45E8B8" : 		{ name : " Pipe Bombs", group : "throwables"},
	"0x23C9F95C" : 		{ name : " Baseball", group : "throwables"},
	"0xFDBC8A50" : 		{ name : " Tear Gas", group : "throwables"},
	"0x497FACC3" : 		{ name : " Flare", group : "throwables"},
	"0x34A67B97" : 		{ name : " Jerry Can", group : "misc"},
	"0xFBAB5776" : 		{ name : " Parachute", group : "misc"},
	"0x60EC506"  : 		{ name : " Fire Extinguisher", group : "misc"},
	"0xBA536372" : 		{ name : " Hazardous Jerry Can", group : "misc"},
	"0x22C0EF84" : 		{ name : " Hunting Rifle", group : "sniper_rifles"},
	"0xF8D636B5" : 		{ name : " Glock", group : "handguns"},
	"0x6CB2F097" : 		{ name : " SIG", group : "handguns"},
	"0x65E0F9C0" : 		{ name : " Makarov", group : "handguns"},
	"0xD3507284" : 		{ name : " M&P9", group : "handguns"},
	"0x4C91E93F" : 		{ name : " Remington", group : "shotguns"},
	"0x79E80472" :		{ name : " Less Lethal Shotgun", group : "shotguns"},
	"0xC49312CA" :		{ name : " Stamped Rifle", group: "assault_rifles"},
	"0x49542FA0" :		{ name : " Carbine Rifle", group: "assault_rifles"},
	"0x69FE49C4" :		{ name : " Combat Rifle", group: "assault_rifles"},
	"0x1406F53D" :		{ name : " Model 15", group: "handguns"},
	"0x28CBCDFB" :		{ name : " Snub 15", group: "handguns"}
}

var GROUP_DATA = {
	"melee" : 
	[
		"0x92A27487",
		"0x958A4A8F",
		"0xF9E6AA4B",
		"0x84BD7BFD",
		"0x8BB05FD7",
		"0x440E4788",
		"0x4E875F73",
		"0xF9DCBF2D",
		"0xD8DF3C3C",
		"0x99B507EA",
		"0xDD5DF8D9",
		"0xDFE37640",
		"0x678B81B1",
		"0x19044EE0",
		"0xCD274149",
		"0x94117305",
		"0x3813FC08",

	],
	"handguns" : 
	[
		"0x1B06D571",
		"0xBFE256D4",
		"0x5EF9FEC4",
		"0x22D8FE39",
		"0x99AEEB3B",
		"0xBFD21232",
		"0x88374054",
		"0xD205520E",
		"0x83839C4",
		"0x47757124",
		"0xDC4DB296",
		"0xC1B3C3D1",
		"0xCB96392F",
		"0x97EA20B8",
		"0xAF3696A1",
		"0x2B5EF5EC",
		"0x917F6C8C",
		"0xF8D636B5",
		"0x6CB2F097",
		"0x65E0F9C0",
		"0xD3507284",
		"0x1406F53D",
		"0x28CBCDFB",
	],
	"smg" : 
	[
		"0x13532244",
		"0x2BE6766B",
		"0x78A97CD0",
		"0xEFE7E2DF",
		"0xA3D4D34",
		"0xDB1AA450",
		"0xBD248B55",
		"0x476BF155",

	],
	"shotguns" : 
	[
		"0x1D073A89",
		"0x555AF99A",
		"0x7846A318",
		"0xE284C527",
		"0x9D61E50F",
		"0xA89CB99E",
		"0x3AABBBAA",
		"0xEF951FBB",
		"0x12E82D3D",
		"0x5A96BA4",
		"0x4C91E93F",
		"0x79E80472",
	],
	"assault_rifles" : 
	[
		"0xBFEFFF6D",
		"0x394F415C",
		"0x83BF0278",
		"0xFAD1F1C9",
		"0xAF113F99",
		"0xC0A3098D",
		"0x969C3D67",
		"0x7F229F94",
		"0x84D6FAFD",
		"0x624FE830",
		"0xC49312CA",
		"0x49542FA0",
		"0x69FE49C4",
	],
	"machine_guns" : 
	[
		"0x9D07F764",
		"0x7FD62962",
		"0xDBBD7280",
		"0x61012683",

	],
	"sniper_rifles" : 
	[
		"0xA3D4D34",
		"0x5FC3C11",
		"0xC472FE2",
		"0xA914799",
		"0xC734385A",
		"0x6A6C02E0",
		"0x781FE4A",
		"0x22C0EF84",

	],
	"heavy_weapons" : 
	[
		"0xB1CA77B1",
		"0xA284510B",
		"0x4DD2DC56",
		"0x42BF8A85",
		"0x7F7497E5",
		"0x6D544C99",
		"0x63AB0442",
		"0x781FE4A",
		"0xB62D1F67",

	],
	"throwables" : 
	[
		"0x93E220BD",
		"0xA0973D5E",
		"0xFDBC8A50",
		"0x497FACC3",
		"0x24B17070",
		"0x2C3731D9",
		"0xAB564B93",
		"0x787F0BB",
		"0xBA45E8B8",
		"0x23C9F95C",

	],
	"misc" : 
	[
		"0x34A67B97",
		"0x60EC506",
		"0xFBAB5776",
		"0xBA536372",
		"0x60EC506"
	],
	"less_lethal" : [
		"0x3656C8C1",
	],
}


let COMPONENT_LIST = {
	"Silencer":{
		"0x65EA7EBB":true,
		"0x837445AA":true,
		"0x9307D6FA":true,
		"0xA73D4664":true,
		"0xAC42DF71":true,
		"0xC304849A":true,
		"0xE608B35E":true,
		"0xF8D636B5":true,
		"0x6CB2F097":true,
		"0x65E0F9C0":true,
		"0xD3507284":true,
	},
	"Clip":{
		"0x1466CE6":true,
		"0x18929DA":true,
		"0x721B079":true,
		"0xD4A969A":true,
		"0x10E6BA2B":true,
		"0x11AE5C97":true,
		"0x16C69281":true,
		"0x17DF42E9":true,
		"0x1CE5A6A5":true,
		"0x2297BE19":true,
		"0x249A17D5":true,
		"0x26574997":true,
		"0x2CD8FF9D":true,
		"0x31C4B22A":true,
		"0x324F2D5F":true,
		"0x334A5203":true,
		"0x33BA12E8":true,
		"0x350966FB":true,
		"0x4317F19E":true,
		"0x45A3B6BB":true,
		"0x476E85FF":true,
		"0x476F52F4":true,
		"0x492B257C":true,
		"0x4C24806E":true,
		"0x4C7A391E":true,
		"0x513F0A63":true,
		"0x54D41361":true,
		"0x59FF9BF8":true,
		"0x5DD5DBD5":true,
		"0x5ED6C128":true,
		"0x64F9C62B":true,
		"0x7B0033B3":true,
		"0x7C8BD10E":true,
		"0x81786CA9":true,
		"0x82158B47":true,
		"0x84C8B2D3":true,
		"0x8610343F":true,
		"0x86BD7F72":true,
		"0x8D1307B0":true,
		"0x8EC1C979":true,
		"0x91109691":true,
		"0x937ED0B7":true,
		"0x94E12DCE":true,
		"0x94E81BC7":true,
		"0x94F42D62":true,
		"0x971CF6FD":true,
		"0x9BC64089":true,
		"0x9FBE33EC":true,
		"0xB1214F9B":true,
		"0xB3688B0F":true,
		"0xB92C6979":true,
		"0xB9835B2E":true,
		"0xBB46E417":true,
		"0xBE5EEA16":true,
		"0xC5A12F80":true,
		"0xC6C7E581":true,
		"0xCB48AEF0":true,
		"0xCCFD2AC5":true,
		"0xCE8C0772":true,
		"0xD12ACA6F":true,
		"0xD67B4F2D":true,
		"0xD6C59CD6":true,
		"0xD83B4141":true,
		"0xD9D3AC92":true,
		"0xDE1FA12C":true,
		"0xE1FFB34A":true,
		"0xE6CFD1AA":true,
		"0xE9867CE3":true,
		"0xEAC8C270":true,
		"0xED265A1C":true,
		"0xEFB00628":true,
		"0xF434EF84":true,
		"0xF8802ED9":true,
		"0xFA1E1A28":true,
		"0xFA8FA10F":true,
		"0xFED0FD71":true,
		"0xF8D636B5":true,
		"0x6CB2F097":true,
		"0x65E0F9C0":true,
		"0xD3507284":true,
		"0x180E759D":true,
		"0xD0E96754":true,
		"0x3016679C":true,
		"0xE7E05731":true,
		"0x886D8CE4":true,
		"0x5B96C538":true,
		"0xA31AD463":true,
		"0x886D8CE4":true,
	},
	"Flashlight":{
		"0x359B7AAE":true,
		"0x43FD595B":true,
		"0x4A4965F3":true,
		"0x7BC4CDDC":true
	}
}

function isSilencer(component){
	return COMPONENT_LIST["Silencer"][component]
}

function isClip(component){
	return COMPONENT_LIST["Clip"][component]
}

function isFlashLight(component){
	return COMPONENT_LIST["Flashlight"][component]
}

function getSection(group){
	if (group == "heavy_weapons" || group == "sniper_rifles" || group == "machine_guns" || group == "assault_rifles" || group == "smg" || group == "shotguns" )
		return "top" 

	if (group == "less_lethal")
		return "bottom" 

	if (group == "misc" || group == "melee" || group == "throwables" )
		return "right"

	if (group == "handguns" )
		return "left"
}



}