
global.chatopened = false;
global.isChat = false;
global.logged = 0;

require('files/index.js');
require('files/iplLoader')
require('files/furniture.js');
require('files/fly.js');
require('files/vehicleSync/vehicleSync.js');
require('files/vehicleSync/vehicleDeformation.js');
require('crouch');
require('files/3dsounds/index.js');
require('indicators/index.js');
require('files/fishingZones.js');
require('files/vehicles/index.js');
require('files/rappel/index.js');
require('files/medic.js');
require('files/flatbed.js');
require('files/radar.js');
require('files/parking.js');
require('files/aliases.js');
require('files/chat/events.js');
require('files/vehicles/doors.js');
require('files/ObjectEditor.js')
require('files/helperEntities.js');
require('files/blackjack.js')
require('cef/index.js')
require('files/sitting/sit.js')
require('files/deadBodies.js')
require('files/dmv.js')
require('files/vehicles/electric.js');
require('files/houses/WallsEditor.js');
require('files/smoking.js');
require('files/doors.js');
require('files/policetape.js');
require('files/polygons/index.js');
require('files/prison.js');
require('files/storeRobbery.js');
// require('pushvehicle');


setInterval(function () {
    mp.game.ped.setAiWeaponDamageModifier(1.5);
}, 10000);
// Better notification

