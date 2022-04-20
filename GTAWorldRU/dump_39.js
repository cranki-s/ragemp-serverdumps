{
﻿// CAMERA //
function createCam(x, y, z, rx, ry, rz, viewangle) {
	camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
	camera.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 0, false, false);
}
exports.createCam = createCam;

function destroyCam() {
	if (!camera) return;
	camera.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	camera.destroy();
	camera = null;
}
exports.destroyCam = destroyCam;

mp.events.add('setCharSelectorCam', () => {
	createCam(711.68, 1200, 349, -12, 0, 165, 60);
	mp.players.local.freezePosition(true);
	//mp.gui.chat.push("Cam set");
});

mp.events.add('resetCharSelectorCam', () => {
	destroyCam();
	mp.players.local.freezePosition(false);
	//mp.gui.chat.push("Cam reset");
});

// CAMERA //

mp.events.add('debugChatMessage', (variable) => {
	mp.gui.chat.push(""+variable+"");
});

//CEF//
var selectorWindow ﻿= null;
mp.events.add('showCharSelector', () => {
	if (!mp.browsers.exists(selectorWindow))
	{
		selectorWindow ﻿= mp.browsers.new﻿("package://gtalife/CharSelector/CharSelector.html");
		selectorWindow.execute(`$(".Characters" ).empty();`);
		mp.events.callRemote('LoadCharacters');
		mp.gui.cursor.show(true, true);
		mp.gui.chat.show(true);
	}
});

mp.events.add('hideCharSelector', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('addCharToSelector', (id,charid,fname,lname,wealth,faction,business,donator, jailChar) => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		var selected = "";
		if(id == 0) selected = " Selected";
		selectorWindow.execute(`$(".Characters").append('<div class="CharacterBox${selected}" id="${id}"><div class="ribbon donator-${donator}"><i class="fas fa-crown"></i></div><div class="charSelector Name" id="${fname}" name="${lname}">${fname} ${lname}</div><div class="charSelector Info"><div class="charSelector ID" id="${charid}">ID: ${charid}</div><div class="charSelector Wealth">$${wealth}</div><div class="charSelector Faction">Фракция: ${faction}</div><div class="charSelector JailOnlyLabel" hidden>ТЮРЕМНЫЙ</div></div></div>');`);
		if (jailChar) {
			selectorWindow.execute(`$("#${id} > div.charSelector.Info > div.charSelector.JailOnlyLabel").show();`);
			selectorWindow.execute(`$("#${id}").attr("character-type", "jail");`);
		} else {
			selectorWindow.execute(`$("#${id} > div.charSelector.Info > div.charSelector.JailOnlyLabel").hide();`);
		}
	}
});

mp.events.add('returnSelectedList', (listid, charid, fname, lname) => {
    mp.events.callRemote('ReturnSelectedList', listid, charid, fname, lname);
});

mp.events.add('spawnButtonPressed', () => {
    mp.events.callRemote('SpawnButtonPressed');
});

mp.events.add('newCharButtonPressed', (jailChar) => {
    mp.events.callRemote('NewCharButtonPressed', jailChar);
});

mp.events.add('showCharSelectorNewChar', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.execute(`$("#NewCharButtonBox").show();`);
	}
});

mp.events.add('showJailCharSelectorNewChar', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.execute(`$("#NewJailCharButtonBox").show(); $(".JailOnlyLabel").show();`);
	}
});

mp.events.add('setFirstCharSelector', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.execute(`$(".CharacterBox").eq(0).addClass("Selected"); $("#SpawnButton").text("Играть"); $(".centerbox").hide();`);
	}
});

mp.events.add('hideCharSelectorNewChar', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.execute(`$("#NewCharButtonBox").hide();`);
	}
});

mp.events.add('hideJailCharSelectorNewChar', () => {
	if (selectorWindow != null && mp.browsers.exists(selectorWindow))
	{
		selectorWindow.execute(`$("#NewJailCharButtonBox").hide(); $(".JailOnlyLabel").show();`);
	}
});

//CEF//

let Ped = null;
mp.events.add('createCharPed', (player,model,HeadBlendData, SurgeryData, SurgeryData2, SurgeryData3, SurgeryData4, SurgeryData5, SurgeryData6, SurgeryData7, BarberData, BarberData2, BarberData3, TattooData, TattooData2, TattooData3,FaceData,OutfitData,ExtrasData,PropsData) => {
	if(Ped != null && mp.peds.exists(Ped))
	{
		Ped.destroy();
	}
		
	Ped = mp.peds.new(model, new mp.Vector3(711.3, 1197.982, 348.5268), 340.0, player.dimension);
	if(model == -1667301416 || model == 1885233650){
		Ped.setHeadBlendData(HeadBlendData[0], HeadBlendData[1],HeadBlendData[2],HeadBlendData[3],HeadBlendData[4],HeadBlendData[5],HeadBlendData[6],HeadBlendData[7],HeadBlendData[8],true);
		Ped.setHeadOverlay(0,SurgeryData[0], SurgeryData[1]);
		Ped.setHeadOverlay(1,BarberData[0],BarberData[1]);
		Ped.setHeadOverlayColor(1, BarberData2[0], BarberData[1], BarberData2[2]);
		Ped.setHeadOverlay(2,BarberData2[0],BarberData2[1]);
		Ped.setHeadOverlayColor(2, BarberData2[0], BarberData[1], BarberData2[2]);
		//mp.gui.chat.push("Eyebrows: "+ BarberData2[0] +" "+ BarberData2[1] +" "+ BarberData2[2] +"");
		Ped.setHeadOverlay(3,SurgeryData2[0],SurgeryData2[1]);
		Ped.setHeadOverlay(6,SurgeryData3[0],SurgeryData3[1]);
		Ped.setHeadOverlay(7,SurgeryData4[0],SurgeryData4[1]);
		Ped.setHeadOverlay(9,SurgeryData5[0],SurgeryData5[1]);
		Ped.setHeadOverlay(11,SurgeryData6[0],SurgeryData6[1]);
		Ped.setHeadOverlay(12,SurgeryData7[0],SurgeryData7[1]);
		Ped.setHeadOverlay(10,BarberData3[0],BarberData3[1]); 
		Ped.setHeadOverlay(4,TattooData[0],TattooData[1]);
		Ped.setHeadOverlay(5,TattooData2[0],TattooData2[1]);
		Ped.setHeadOverlay(8,TattooData3[0],TattooData3[1]);
		
		/*	Ped.setHeadOverlay(0,SurgeryData[0],SurgeryData[1]);
		if (BarberData.length > 3)
		Ped.setHeadOverlay(1,BarberData[0],BarberData[1],BarberData[2],);
		if (BarberData2.length > 3)
		Ped.setHeadOverlay(2,BarberData2[0],BarberData2[1],BarberData2[2],BarberData2[2]);
			Ped.setHeadOverlay(10,BarberData3[0],BarberData3[1],BarberData3[2]);
		Ped.setHeadOverlay(4,TattooData[0],TattooData[1],TattooData[2]);
		Ped.setHeadOverlay(5,TattooData2[0],TattooData2[1],TattooData2[2]);
		Ped.setHeadOverlay(8,TattooData3[0],TattooData3[1],TattooData3[2]);*/
		
		for (var i = 0; i < 19; i++)
			Ped.setFaceFeature(i, FaceData[i]);
		
		for (var i = 0; i < 12; i++)
		{
			if(i == 2)
				Ped.setComponentVariation(i, OutfitData[i], 0, OutfitData[i+1]);
			else
				Ped.setComponentVariation(i, OutfitData[i], OutfitData[i+12], 0);
		}
		Ped.setHairColor(ExtrasData[0], ExtrasData[1]);
		Ped.setEyeColor(ExtrasData[2]);
		
		Ped.setPropIndex(0,PropsData[0],PropsData[1], false);
		Ped.setPropIndex(1,PropsData[2],PropsData[3], false);
		Ped.setPropIndex(2,PropsData[4],PropsData[5], false);
		Ped.setPropIndex(6,PropsData[6],PropsData[7], false);
		Ped.setPropIndex(7,PropsData[8],PropsData[9], false);
		
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
	
});

mp.events.add('destroyCharPed', () => {
	if(Ped != null && mp.peds.exists(Ped))
	{
		Ped.destroy();
	}
});

mp.events.add('oldSystemPressed', () => {
    mp.events.callRemote('OldSystemPressed');
});

}⫄Ø矫ɴ