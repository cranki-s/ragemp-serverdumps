{
﻿var morgueWindow = null;
var cam = null;
let Ped = null;
var bodies = [];
var currentOutterIndex = 0;
var currentInnerIndex = 0;
let TOTAL_BODIES = 0;
let CURRENT_BODY = 0;

const camPos = new mp.Vector3(263.5, -1341, 26.5);
const camTarg = new mp.Vector3(262.5042, -1340.151, 24.55442);
const bodyPos = new mp.Vector3(262.75, -1340.45, 25.55);

mp.events.add('sendMorgueData', async (_bodies, index, lastElement) => {
    bodies[index] = JSON.parse(_bodies);

    if (lastElement === true) {
        if (!mp.browsers.exists(morgueWindow)) {
            bodies.forEach(element => TOTAL_BODIES += element.length);

            CURRENT_BODY = 1;
            morgueWindow = mp.browsers.new("package://gtalife/morgue/mainNew.html");

            currentOutterIndex = 0;
            currentInnerIndex = 0;
            NextBody();

            // Wait for the browser to be ready
            // Alternatively use the event 'browserDomReady' below..
            for (let i = 0;  !mp.browsers.exists(morgueWindow) && i < 1500; i++) await mp.game.waitAsync(0);

            SetUpCamera();

            mp.players.local.freezePosition(true);
            mp.gui.chat.activate(false);
            mp.gui.cursor.show(true, true);
        }
    }
});

mp.events.add('get_location_for_morgue', () => {
    let getStreet = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
    let zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z));
    var streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
    var location = zoneName + " - " + streetName;

    mp.events.callRemote("send_location_for_morgue", location);
});

function SetUpCamera() {
    cam = mp.cameras.new('default', camPos, new mp.Vector3(), 60);
    cam.pointAtCoord(camTarg.x, camTarg.y, camTarg.z);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
}

//mp.events.add('browserDomReady', (browser) => {
//    if (mp.browsers.exists(morgueWindow)) {
//        if (browser === morgueWindow) {
//            mp.gui.chat.push("Was morgue window!");
//        }
//    }
//});

mp.events.add('identifySubmitted', (first, last) => {
    var body = bodies[currentOutterIndex][currentInnerIndex];
    if (body !== null && body !== undefined) {
        body.IsIdentified = 1;
        body.Name = first + " " + last;
        body.Signature = mp.players.local.name;
        UpdatePanelText(body);
        mp.events.callRemote('identify_body', body.Id, body.Name, body.Signature);
        // Trigger server event to store new information
    }
});

mp.events.add('morgueBackButton', () => {
    if (morgueWindow !== null && mp.browsers.exists(morgueWindow)) {
        if (currentInnerIndex > 0) {
            CURRENT_BODY--;
            currentInnerIndex--;
            NextBody();
        } else {
            if (currentOutterIndex > 0) {
                CURRENT_BODY--;
                currentOutterIndex--;
                currentInnerIndex = bodies[currentOutterIndex].length - 1;
                NextBody();
            }else{
                CURRENT_BODY = TOTAL_BODIES;
                currentOutterIndex = (bodies.length - 1);
                currentInnerIndex = bodies[currentOutterIndex].length - 1;
                NextBody();
            }
        }
    }
});

mp.events.add('morgueForwardButton', () => {
    if (morgueWindow !== null && mp.browsers.exists(morgueWindow)) {
        if (currentInnerIndex < (bodies[currentOutterIndex].length - 1)) {
            CURRENT_BODY++;
            currentInnerIndex++;
            NextBody();
        } else {
            if (currentOutterIndex < (bodies.length - 1)) {
                CURRENT_BODY++;
                currentOutterIndex++;
                currentInnerIndex = 0;
                NextBody();
            }else{
                CURRENT_BODY = 1;
                currentOutterIndex = 0;
                currentInnerIndex = 0;
                NextBody();
            }
        }
    }
});

mp.events.add('collectButton', () => {
    if (bodies !== null && bodies !== undefined) {
        var body = bodies[currentOutterIndex][currentInnerIndex];
        if (body !== null && body !== undefined) {
            // Trigger server event for collection of evidence bag
            mp.events.callRemote('corpse_collect_evidence', body.Id);
            Quit();
        }
    }
});

mp.events.add('morgueQuitButton', () => {
    Quit();
});

function Quit() {
    if (morgueWindow !== null && mp.browsers.exists(morgueWindow) && cam !== null) {
        morgueWindow.destroy();
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.players.local.freezePosition(false);
        cam.destroy();
        cam = null;
        bodies = [];
        TOTAL_BODIES = 0;
        if (Ped !== null && mp.peds.exists(Ped)) {
            Ped.destroy();
        }
    }
}

function NextBody() {
    if (bodies === null ||
        bodies[currentOutterIndex][currentInnerIndex] === null ||
        bodies[currentOutterIndex][currentInnerIndex] === undefined)
        return;

    var bodyInfo = bodies[currentOutterIndex][currentInnerIndex];  
    CreatePed(bodyInfo);
    UpdatePanelText(bodyInfo);
}

function CreatePed(bodyInfo) {
    if (Ped !== null && mp.peds.exists(Ped)) {
        Ped.destroy();
    }

    Ped = mp.peds.new(bodyInfo.Model, bodyPos, 230, mp.players.local.dimension);
    Ped.setVisible(false, false);
    Ped.freezePosition(true);
    Ped.clearTasksImmediately();

    mp.game.streaming.requestAnimDict("misssolomon_5@end");
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded("misssolomon_5@end") && i < 1500; i++) mp.game.waitAsync(0);

    Ped.taskPlayAnim("misssolomon_5@end", "dead_black_ops", 8.0, 0, -1, 1, 0.0, false, false, false);

    setTimeout(function () {
        Ped.setVisible(true, false);
    }, 400);

    if (bodyInfo.Model === 2627665880 || bodyInfo.Model === 1885233650) {
        Ped.setHeadBlendData(bodyInfo.HeadBlend[0], bodyInfo.HeadBlend[1], bodyInfo.HeadBlend[2], bodyInfo.HeadBlend[3], bodyInfo.HeadBlend[4], bodyInfo.HeadBlend[5], bodyInfo.HeadBlend[6], bodyInfo.HeadBlend[7], bodyInfo.HeadBlend[8], true);

        // Traits such as hair, blemishes, makeup etc.
        Ped.setHeadOverlay(0, bodyInfo.Surgery[0], bodyInfo.Surgery[1]);
        Ped.setHeadOverlay(1, bodyInfo.Barber[0], bodyInfo.Barber[1]);
      //  Ped.setHeadOverlay(2, bodyInfo.Barber2[0], bodyInfo.Barber2[1], bodyInfo.Barber2[2], bodyInfo.Barber2[2]);
	    Ped.setHeadOverlay(2, bodyInfo.Barber2[0], bodyInfo.Barber2[1]);
        Ped.setHeadOverlay(3, bodyInfo.Surgery2[0], bodyInfo.Surgery2[1]);
        Ped.setHeadOverlay(6, bodyInfo.Surgery3[0], bodyInfo.Surgery3[1]);
        Ped.setHeadOverlay(7, bodyInfo.Surgery4[0], bodyInfo.Surgery4[1]);
        Ped.setHeadOverlay(9, bodyInfo.Surgery5[0], bodyInfo.Surgery5[1]);
        Ped.setHeadOverlay(11, bodyInfo.Surgery6[0], bodyInfo.Surgery6[1]);
        Ped.setHeadOverlay(12, bodyInfo.Surgery7[0], bodyInfo.Surgery7[1]);
       /* Ped.setHeadOverlay(10, bodyInfo.Barber3[0], bodyInfo.Barber3[1], bodyInfo.Barber[2]);
        Ped.setHeadOverlay(4, bodyInfo.Tattoo[0], bodyInfo.Tattoo[1], bodyInfo.Tattoo[2], 0);
        Ped.setHeadOverlay(5, bodyInfo.Tattoo2[0], bodyInfo.Tattoo2[1], bodyInfo.Tattoo2[2], 0);
        Ped.setHeadOverlay(8, bodyInfo.Tattoo3[0], bodyInfo.Tattoo3[1], bodyInfo.Tattoo3[2], 0);
*/
        // Unique facial structure
        for (var i = 0; i < 19; i++)
            Ped.setFaceFeature(i, bodyInfo.FaceData[i]);

        // Clothes
        for (var i = 0; i < 12; i++) {
            if (i === 2)
                Ped.setComponentVariation(i, bodyInfo.OutfitData[i], 0, bodyInfo.OutfitData[i + 1]);
            else
                Ped.setComponentVariation(i, bodyInfo.OutfitData[i], bodyInfo.OutfitData[i + 12], 0);
        }

        // Shirt
        if (bodyInfo.Model === 1885233650) {
            Ped.setComponentVariation(3, 15, 0, 0);
            Ped.setComponentVariation(8, 57, 0, 0);
            Ped.setComponentVariation(11, 252, 0, 0);
        }
        else {
            Ped.setComponentVariation(3, 15, 0, 0);
            Ped.setComponentVariation(8, 10, 0, 0);
            Ped.setComponentVariation(11, 82, 0, 0);
        }

        // Pants(legs)
        if (bodyInfo.Model === 1885233650)
            Ped.setComponentVariation(4, 61, 0, 0);
        else
            Ped.setComponentVariation(4, 15, 0, 0);

        // Shoes
        if (bodyInfo.Model === 1885233650)
            Ped.setComponentVariation(6, 34, 0, 0);
        else
            Ped.setComponentVariation(6, 35, 0, 0);

        Ped.setHairColor(bodyInfo.ExtraData[0], bodyInfo.ExtraData[1]);
        Ped.setEyeColor(bodyInfo.ExtraData[2]);

        // Hats, glasses & ears
        Ped.setPropIndex(0, bodyInfo.PropsData[0], bodyInfo.PropsData[1], false);
        Ped.setPropIndex(1, bodyInfo.PropsData[2], bodyInfo.PropsData[3], false);
        Ped.setPropIndex(2, bodyInfo.PropsData[4], bodyInfo.PropsData[5], false);

        //mp.gui.chat.push("LENGTH: "+ RealTattooData.length +"");
		/*if(RealTattooData != null){
			for (var i = 0; i < RealTattooData.length; ++i)
			{
				Ped.setDecoration(RealTattooData[i], RealTattooData[i+1]);
				//mp.gui.chat.push("Test: "+ i +" "+ RealTattooData[i] +", "+ RealTattooData[i+1] +"");
				i += 1;
			}
		}*/
    }
}

function UpdatePanelText(bodyInfo) {
    if (bodyInfo === null || bodyInfo === undefined)
        return;
    if (morgueWindow === null || morgueWindow === undefined)
        return;

    var identified = bodyInfo.IsIdentified > 0 ? "Yes" : "No";
    var caseTitle = GetCaseTitle(bodyInfo);
    var sex = bodyInfo.Model === 2627665880 ? "Female" : "Male";

    morgueWindow.execute(`$('#casetitle').text('${caseTitle}');`);
    morgueWindow.execute(`$('#name').text('${bodyInfo.Name}');`);
    morgueWindow.execute(`$('#sex').text('${sex}');`);
    morgueWindow.execute(`$('#identified').text('${identified}');`);
    morgueWindow.execute(`$('#location').text('${bodyInfo.Location}');`);
    morgueWindow.execute(`$('#timeofdeath').text('${bodyInfo.TimeOfDeath}');`);
    morgueWindow.execute(`$('#causeofdeath').text('${bodyInfo.CauseOfDeath}');`);
    morgueWindow.execute(`$('#signature').text('${bodyInfo.Signature}');`);

    //morgueWindow.execute(`$('#details').text('${bodyInfo.Signature}');`);
    morgueWindow.execute(`$(".detailsList").empty();`);
    for (i = 0; i < bodyInfo.Details.length; i++) {
        morgueWindow.execute(`$(".detailsList").append('<li class="list-group-item d-flex justify-content-between align-items-center">${bodyInfo.Details[i].DetailText}<span class="badge badge-primary badge-pill">${bodyInfo.Details[i].DetailRightText}</span></li>');`);
    }
}

function GetCaseTitle(bodyInfo) {
    title = "Case #";
    var zeroDigits = 4;
    var missingDigits = 4 - bodyInfo.Id.toString().length;
    for (i = 0; i < missingDigits; i++) {
        title = title.concat("0");
    }

    return (title.concat(bodyInfo.Id + " - " + CURRENT_BODY + " of " + TOTAL_BODIES));
}
}