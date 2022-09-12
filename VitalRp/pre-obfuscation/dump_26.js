{
let raycast = null;
let raycastMenuOn = false;
let raycastMenuItems = [];
let raycastMenuIndex = 0;

let canInterract = false;

let raycastv2 = null;

let raycastv3 = null;

const getLocalTargetPlayer = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;

    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, (2 | 4 | 8 | 16));

    if (target && target.entity.type === 'player' && mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {
        if (target.entity.hasVariable("Injured") && target.entity.getVariable("Injured") > 0) {
            return target;
        }
    }

    return null;
}

const getPDTargetPlayer = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;

    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, (2 | 4 | 8 | 16));

    if (target && target.entity.type === 'player' && mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {
        if (target.entity.hasVariable("cuffed") && target.entity.getVariable("cuffed")) {
            return target;
        }
    }

    return null;
}


const getLocalMedTargetPlayer = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;

    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, (2 | 4 | 8 | 16));

    if (target && target.entity.type === 'player' && mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) {
        if (target.entity.hasVariable("UnderMedicalThreatment") && target.entity.getVariable("UnderMedicalThreatment")) {
            return target;
        }
    }

    return null;
}



const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.005, scaleY = 0.01) => {
    const position = mp.game.graphics.world3dToScreen2d(pos);
    if (!position) return;
    mp.game.graphics.drawSprite(textureDict, textureName, position.x, position.y, scaleX, scaleY, 0, 0, 0, 0, 200);
}

mp.events.add({
    'render': () => {
        if (!mp.players.local.vehicle && !mp.gui.cursor.visible) {

            raycast = getLocalTargetPlayer();
            if (raycast != null) {
                target = raycast.entity;
                if (mp.players.local.getVariable("character_group") === 9) {
                    if (raycast && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 7.5) {
                        if (target.getVariable("InjuredTime") < 120) {
                            status = "Crtical"
                        }
                        else if (target.getVariable("InjuredTime") > 120 && target.getVariable("InjuredTime") < 240) {
                            status = "Serious"
                        }
                        else status = "Fair";

                        mp.game.graphics.drawText(`Reason: ${target.getVariable("DeathReason")} \n Injured Area: ${target.getVariable("BoneInjured")} \n Status: ${status}`, [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z], {
                            font: 0,
                            color: [255, 255, 255, 255],
                            scale: [0.2, 0.2],
                            centre: true
                        });
                    }


                }
                
            }
        }


        raycastv2 = getLocalMedTargetPlayer();
        raycastv3 = getPDTargetPlayer();
        if (raycast != null && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
           
            raycastMenuItems = [];
            let text = "Open Inventory";
            let text2 = "Carry Body";

            addRaycastMenuOption(text);
            addRaycastMenuOption(text2);
            if (mp.players.local.getVariable("character_group") === 9) {
                let text3 = "Stablize";
                addRaycastMenuOption(text3);
            }

            mp.game.graphics.drawText(displayRaycastMenu(), [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z + 0.3], {
                font: 0,
                color: [255, 255, 255, 255],
                scale: [0.2, 0.2],
                centre: true
            });
            raycastMenuOn = true;
            canInterract = true;
        }
        else if (raycastv2 != null && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycastv2.entity.position.x, raycastv2.entity.position.y, raycastv2.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
    
            raycastMenuItems = [];
            let text = "Medical Clear";
            let text2 = "Carry Body";

            addRaycastMenuOption(text);
            addRaycastMenuOption(text2);
            mp.game.graphics.drawText(displayRaycastMenu(), [raycastv2.entity.position.x, raycastv2.entity.position.y, raycastv2.entity.position.z + 0.3], {
                font: 0,
                color: [255, 255, 255, 255],
                scale: [0.2, 0.2],
                centre: true
            });
            raycastMenuOn = true;
            canInterract = true;
        }
        else if (raycastv3 != null && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycastv3.entity.position.x, raycastv3.entity.position.y, raycastv3.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {

            raycastMenuItems = [];
            let text = "Open Inventory";
            addRaycastMenuOption(text);
            if (mp.players.local.getVariable("character_group") === 10 || mp.players.local.getVariable("character_group") === 13) {
                let text2 = "Drag";
                addRaycastMenuOption(text2);
                let text3 = "Check for Id";
                addRaycastMenuOption(text3);
            }


            mp.game.graphics.drawText(displayRaycastMenu(), [raycastv3.entity.position.x, raycastv3.entity.position.y, raycastv3.entity.position.z + 0.3], {
                font: 0,
                color: [255, 255, 255, 255],
                scale: [0.2, 0.2],
                centre: true
            });
            raycastMenuOn = true;
            canInterract = true;
        }
        else {
            canInterract = false;
        }

        




      


        

        if (raycastMenuIndex > raycastMenuItems.length) raycastMenuIndex = 0;



        if (raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 241)) {

            let max = raycastMenuItems.length;
            raycastMenuIndex--;
            if (raycastMenuIndex < 0) raycastMenuIndex = max - 1;
        }

        if (raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 242)) {

            let max = raycastMenuItems.length;
            raycastMenuIndex++;
            if (raycastMenuIndex >= max) raycastMenuIndex = 0;
        }





    }

});

const addRaycastMenuOption = (text) => {
    raycastMenuItems.push(text);
}


const displayRaycastMenu = () => {
    var menuOption = "";
    raycastMenuItems.forEach((text, index) => {
        if (raycastMenuIndex === index) {
            menuOption += (`~n~ ~w~ ${text} [E]`)
        }
        else menuOption += `~n~ ~c~ ${text}`

    })
    return menuOption;
}


const resetRayCastMenu = () => {
    if (raycastMenuOn) return;
    raycastMenuIndex = 0;
    raycastMenuItems = [];

}


mp.keys.bind(69, true, () => {

    if (global.phone === true || mp.gui.cursor.visible === true || global.chatopened) return;
    if (raycast && canInterract) {
        switch (raycastMenuIndex) {
            case 0:
                mp.events.callRemote('friskinjured', raycast.entity.getVariable("remoteID"));
                break;
            case 1:
                mp.events.callRemote('carryinjured', raycast.entity.getVariable("remoteID"));
                break
            case 2:
                mp.events.callRemote('stabilizevent', raycast.entity.getVariable("remoteID"));
                break;
            default:
                return;

        }
    }

    if (raycastv2 && canInterract) {
        switch (raycastMenuIndex) {
            case 0:
                mp.events.callRemote('ClearMedicalEvent', raycastv2.entity.getVariable("remoteID"));
                break;
            case 1:
                mp.events.callRemote('carryinjured', raycastv2.entity.getVariable("remoteID"));
                break
            default:
                return;

        }
    }

    if (raycastv3 && canInterract) {
        switch (raycastMenuIndex) {
            case 0:
                mp.events.callRemote('friskcuffed', raycastv3.entity.getVariable("remoteID"));
                break;
            case 1:
                mp.events.callRemote('dragcuffed', raycastv3.entity.getVariable("remoteID"));
                break
            case 2:
                mp.events.callRemote('checkforid', raycastv3.entity.getVariable("remoteID"));
                break
            default:
                return;

        }
    }


});

mp.events.add("playerDeath", (player, reason, killer) => {
    mp.console.logInfo(`${causeofdeath[reason]}`);
    bone = mp.players.local.getLastDamageBone(0);
    mp.console.logInfo(`${playerbone[bone]}`);
    mp.events.callRemote("CauseOfDeath", playerbone[bone], causeofdeath[reason]);

});


var causeofdeath = {
    "2460120199": "Antique Cavalry Dagger",
    "2508868239": "Baseball Bat",
    "4192643659": "Bottle",
    "2227010557": "Crowbar",
    "2725352035": "Fist",
    "2343591895": "Flashlight",
    "1141786504": "Golf Club",
    "1317494643": "Hammer",
    "4191993645": "Hatchet",
    "3638508604": "Knuckle",
    "2578778090": "Knife",
    "3713923289": "Machete",
    "3756226112": "Switchblade",
    "1737195953": "Nightstick",
    "419712736": "Pipe Wrench",
    "3441901897": "Battle Axe",
    "2484171525": "Pool Cue",
    "940833800": "Stone Hatchet",
    "453432689": "Pistol",
    "3219281620": "Pistol MK2",
    "1593441988": "Combat Pistol",
    "584646201": "AP Pistol",
    "911657153": "Stun Gun",
    "2578377531": "Pistol .50",
    "3218215474": "SNS Pistol",
    "2285322324": "SNS Pistol MK2",
    "3523564046": "Heavy Pistol",
    "137902532": "Vintage Pistol",
    "1198879012": "Flare Gun",
    "3696079510": "Marksman Pistol",
    "3249783761": "Heavy Revolver",
    "3415619887": "Heavy Revolver MK2",
    "2548703416": "Double Action",
    "2939590305": "Up-n-Atomizer",
    "324215364": "Micro SMG",
    "736523883": "SMG",
    "2024373456": "SMG MK2",
    "4024951519": "Assault SMG",
    "171789620": "Combat PDW",
    "3675956304": "Machine Pistol",
    "3173288789": "Mini SMG",
    "1198256469": "Unholy Hellbringer",
    "487013001": "Pump Shotgun",
    "1432025498": "Pump Shotgun MK2",
    "2017895192": "Sawed-Off Shotgun",
    "3800352039": "Assault Shotgun",
    "2640438543": "Bullpup Shotgun",
    "2828843422": "Musket",
    "984333226": "Heavy Shotgun",
    "4019527611": "Double Barrel Shotgun",
    "317205821": "Sweeper Shotgun",
    "3220176749": "Assault Rifle",
    "961495388": "Assault Rifle MK2",
    "2210333304": "Carbine Rifle",
    "4208062921": "Carbine Rifle MK2",
    "2937143193": "Advanced Rifle",
    "3231910285": "Special Carbine",
    "2526821735": "Special Carbine MK2",
    "2132975508": "Bullpup Rifle",
    "2228681469": "Bullpup Rifle MK2",
    "1649403952": "Compact Rifle",
    "2634544996": "MG",
    "2144741730": "Combat MG",
    "3686625920": "Combat MG MK2",
    "1627465347": "Gusenberg Sweeper",
    "100416529": "Sniper Rifle",
    "205991906": "Heavy Sniper",
    "177293209": "Heavy Sniper MK2",
    "3342088282": "Marksman Rifle",
    "1785463520": "Marksman Rifle MK2",
    "2982836145": "RPG",
    "2726580491": "Grenade Launcher",
    "1305664598": "Smoke Grenade Launcher",
    "1119849093": "Minigun",
    "2138347493": "Firework Launcher",
    "1834241177": "Railgun",
    "1672152130": "Homing Launcher",
    "125959754": "Compact Grenade Launcher",
    "3056410471": "Ray Minigun",
    "2481070269": "Grenade",
    "2694266206": "BZ Gas",
    "4256991824": "Smoke Grenade",
    "1233104067": "Flare",
    "615608432": "Molotov",
    "741814745": "Sticky Bomb",
    "2874559379": "Proximity Mine",
    "126349499": "Snowball",
    "3125143736": "Pipe Bomb",
    "600439132": "Baseball",
    "883325847": "Jerry Can",
    "101631238": "Fire Extinguisher",
    "4222310262": "Parachute",
    "2461879995": "Electric Fence",
    "3425972830": "Hit by Water Cannon",
    "133987706": "Rammed by Car",
    "2741846334": "Run Over by Car",
    "3452007600": "Fall",
    "4194021054": "Animal",
    "324506233": "Airstrike Rocket",
    "2339582971": "Bleeding",
    "2294779575": "Briefcase",
    "28811031": "Briefcase 02",
    "148160082": "Cougar",
    "1223143800": "Barbed Wire",
    "4284007675": "Drowning",
    "1936677264": "Drowning In Vehicle",
    "539292904": "Explosion",
    "910830060": "Exhaustion",
    "3750660587": "Fire",
    "341774354": "Heli Crash",
    "3204302209": "Vehicle Rocket",
    "2282558706": "Vehicle Akula Barrage",
    "431576697": "Vehicle Akula Minigun",
    "2092838988": "Vehicle Akula Missile",
    "476907586": "Vehicle Akula Turret Dual",
    "3048454573": "Vehicle Akula Turret Single",
    "328167896": "Vehicle APC Cannon",
    "190244068": "Vehicle APC MG",
    "1151689097": "Vehicle APC Missile",
    "3293463361": "Vehicle Ardent MG",
    "2556895291": "Vehicle Avenger Cannon",
    "2756453005": "Vehicle Barrage Rear GL",
    "1200179045": "Vehicle Barrage Rear MG",
    "525623141": "Vehicle Barrage Rear Minigun",
    "4148791700": "Vehicle Barrage Top MG",
    "1000258817": "Vehicle Barrage Top Minigun",
    "3628350041": "Vehicle Bombushka Cannon",
    "741027160": "Vehicle Bombushka Dual MG",
    "3959029566": "Vehicle Cannon Blazer",
    "1817275304": "Vehicle Caracara MG",
    "1338760315": "Vehicle Caracara Minigun",
    "2722615358": "Vehicle Cherno Missile",
    "3936892403": "Vehicle Comet MG",
    "2600428406": "Vehicle Deluxo MG",
    "3036244276": "Vehicle Deluxo Missile",
    "1595421922": "Vehicle Dogfighter MG",
    "3393648765": "Vehicle Dogfighter Missile",
    "2700898573": "Vehicle Dune Grenade Launcher",
    "3507816399": "Vehicle Dune MG",
    "1416047217": "Vehicle Dune Minigun",
    "1566990507": "Vehicle Enemy Laser",
    "1987049393": "Vehicle Hacker Missile",
    "2011877270": "Vehicle Hacker Missile Homing",
    "1331922171": "Vehicle Halftrack Dual MG",
    "1226518132": "Vehicle Halftrack Quad MG",
    "855547631": "Vehicle Havok Minigun",
    "785467445": "Vehicle Hunter Barrage",
    "704686874": "Vehicle Hunter Cannon",
    "1119518887": "Vehicle Hunter MG",
    "153396725": "Vehicle Hunter Missile",
    "2861067768": "Vehicle Insurgent Minigun",
    "507170720": "Vehicle Khanjali Cannon",
    "2206953837": "Vehicle Khanjali Cannon Heavy",
    "394659298": "Vehicle Khanjali GL",
    "711953949": "Vehicle Khanjali MG",
    "3754621092": "Vehicle Menacer MG",
    "3303022956": "Vehicle Microlight MG",
    "3846072740": "Vehicle Mobileops Cannon",
    "3857952303": "Vehicle Mogul Dual Nose",
    "3123149825": "Vehicle Mogul Dual Turret",
    "4128808778": "Vehicle Mogul Nose",
    "3808236382": "Vehicle Mogul Turret",
    "2220197671": "Vehicle Mule4 MG",
    "1198717003": "Vehicle Mule4 Missile",
    "3708963429": "Vehicle Mule4 Turret GL",
    "2786772340": "Vehicle Nightshark MG",
    "1097917585": "Vehicle Nose Turret Valkyrie",
    "3643944669": "Vehicle Oppressor MG",
    "2344076862": "Vehicle Oppressor Missile",
    "3595383913": "Vehicle Oppressor2 Cannon",
    "3796180438": "Vehicle Oppressor2 MG",
    "1966766321": "Vehicle Oppressor2 Missile",
    "3473446624": "Vehicle Plane Rocket",
    "1186503822": "Vehicle Player Buzzard",
    "3800181289": "Vehicle Player Lazer",
    "1638077257": "Vehicle Player Savage",
    "2456521956": "Vehicle Pounder2 Barrage",
    "2467888918": "Vehicle Pounder2 GL",
    "2263283790": "Vehicle Pounder2 Mini",
    "162065050": "Vehicle Pounder2 Missile",
    "3530961278": "Vehicle Radar",
    "3177079402": "Vehicle Revolter MG",
    "3878337474": "Vehicle Rogue Cannon",
    "158495693": "Vehicle Rogue MG",
    "1820910717": "Vehicle Rogue Missile",
    "50118905": "Vehicle Ruiner Bullet",
    "84788907": "Vehicle Ruiner Rocket",
    "3946965070": "Vehicle Savestra MG",
    "231629074": "Vehicle Scramjet MG",
    "3169388763": "Vehicle Scramjet Missile",
    "1371067624": "Vehicle Seabreeze MG",
    "3450622333": "Vehicle Searchlight",
    "4171469727": "Vehicle Space Rocket",
    "3355244860": "Vehicle Speedo4 MG",
    "3595964737": "Vehicle Speedo4 Turret MG",
    "2667462330": "Vehicle Speedo4 Turret Mini",
    "968648323": "Vehicle Strikeforce Barrage",
    "955522731": "Vehicle Strikeforce Cannon",
    "519052682": "Vehicle Strikeforce Missile",
    "1176362416": "Vehicle Subcar MG",
    "3565779982": "Vehicle Subcar Missile",
    "3884172218": "Vehicle Subcar Torpedo",
    "1744687076": "Vehicle Tampa Dual Minigun",
    "3670375085": "Vehicle Tampa Fixed Minigun",
    "2656583842": "Vehicle Tampa Missile",
    "1015268368": "Vehicle Tampa Mortar",
    "1945616459": "Vehicle Tank",
    "3683206664": "Vehicle Technical Minigun",
    "1697521053": "Vehicle Thruster MG",
    "1177935125": "Vehicle Thruster Missile",
    "2156678476": "Vehicle Trailer Dualaa",
    "341154295": "Vehicle Trailer Missile",
    "1192341548": "Vehicle Trailer Quad MG",
    "2966510603": "Vehicle Tula Dual MG",
    "1217122433": "Vehicle Tula MG",
    "376489128": "Vehicle Tula Minigun",
    "1100844565": "Vehicle Tula Nose MG",
    "3041872152": "Vehicle Turret Boxville",
    "1155224728": "Vehicle Turret Insurgent",
    "729375873": "Vehicle Turret Limo",
    "2144528907": "Vehicle Turret Technical",
    "2756787765": "Vehicle Turret Valkyrie",
    "4094131943": "Vehicle Vigilante MG",
    "1347266149": "Vehicle Vigilante Missile",
    "2275421702": "Vehicle Viseris MG",
    "1150790720": "Vehicle Volatol Dual MG",
    "1741783703": "Vehicle Water Cannon"
}

var playerbone = {
    '0': 'Body',
    '1356': 'Brow',
    '2108': 'Toe',
    '2992': 'Elbow',
    '4089': 'Finger',
    '4090': 'Finger',
    '4137': 'Finger',
    '4138': 'Finger',
    '4153': 'Finger',
    '4154': 'Finger',
    '4169': 'Finger',
    '4170': 'Finger',
    '4185': 'Finger',
    '4186': 'Finger',
    '5232': 'Arm',
    '6286': 'Hand',
    '6442': 'Thigh',
    '10706': 'Clavicle',
    '11174': 'Lip',
    '11816': 'Pelvis',
    '12844': 'Head',
    '14201': 'Foot',
    '16335': 'Knee',
    '17188': 'Lower Lip',
    '17719': 'Upper Lip',
    '18905': 'Hand',
    '19336': 'Cheekbone',
    '20178': 'Upper Lip',
    '20279': 'Upper Lip',
    '20623': 'Lower Lip',
    '20781': 'Toe',
    '21550': 'Cheekbone',
    '22711': 'Elbow',
    '23553': 'Spine',
    '23639': 'Thigh',
    '24806': 'Foot',
    '24816': 'Spine',
    '24817': 'Spine',
    '24818': 'Spine',
    '25260': 'Eye',
    '26610': 'Finger',
    '26611': 'Finger',
    '26612': 'Finger',
    '26613': 'Finger',
    '26614': 'Finger',
    '27474': 'Eye',
    '28252': 'Forearm',
    '28422': 'Hand',
    '29868': 'Lip',
    '31086': 'Head',
    '35502': 'Foot',
    '35731': 'Neck',
    '36029': 'Hand',
    '36864': 'Calf',
    '37119': 'Arm',
    '37193': 'Brow',
    '39317': 'Neck',
    '40269': 'Upper Arm',
    '43536': 'Eye',
    '43810': 'Forearm',
    '45509': 'Upper Arm',
    '45750': 'Eye',
    '46078': 'Knee',
    '46240': 'Jaw',
    '47419': 'Lip',
    '47495': 'Tongue',
    '49979': 'Lip',
    '51826': 'Thigh',
    '52301': 'Foot',
    '56604': 'Unknown',
    '57005': 'Hand',
    '57597': 'Spine',
    '57717': 'Foot',
    '58271': 'Thigh',
    '58331': 'Eye',
    '58866': 'Finger',
    '58867': 'Finger',
    '58868': 'Finger',
    '58869': 'Finger',
    '58870': 'Finger',
    '60309': 'Hand',
    '61007': 'Forearm',
    '61163': 'Forearm',
    '61839': 'Lip',
    '63931': 'Calf',
    '64016': 'Finger',
    '64017': 'Finger',
    '64064': 'Finger',
    '64065': 'Finger',
    '64080': 'Finger',
    '64081': 'Finger',
    '64096': 'Finger',
    '64097': 'Finger',
    '64112': 'Finger',
    '64113': 'Finger',
    '64729': 'Clavicle',
    '65068': 'Face',
    '65245': 'Foot',
}
}