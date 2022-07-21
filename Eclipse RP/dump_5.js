{
global.g_Natives = {};

// Arg:player is [Player*]	
g_Natives.GET_PLAYER_PED = (player) => 
{
	return mp.game.invoke("0x43A66C31C68491C0", player);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_PED_SCRIPT_INDEX = (player) => 
{
	return mp.game.invoke("0x50FAC3A3E030A6E1", player);
}


// Arg:player is [Player]	Arg:modelHash is [Hash]	
g_Natives.SET_PLAYER_MODEL = (player, modelHash) => 
{
	return mp.game.invoke("0x00A1CADD00108836", player, modelHash);
}


// Arg:player is [Player]	Arg:ped is [Ped]	Arg:p is [BOOL]	Arg:resetDamage is [BOOL]	
g_Natives.CHANGE_PLAYER_PED = (player, ped, p, resetDamage) => 
{
	return mp.game.invoke("0x048189FAC643DEEE", player, ped, p, resetDamage);
}


g_Natives.COPY_VEHICLE_DAMAGES = (sourceVehicle, targetVehicle) => {

	return mp.game.invoke("0xE44A982368A4AF23", sourceVehicle, targetVehicle);
}

// Arg:player is [Player]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_PLAYER_RGB_COLOUR = (player, r, g, b) => 
{
	return mp.game.invoke("0xE902EF951DCE178F", player, r, g, b);
}

g_Natives.GET_NUMBER_OF_PLAYERS = () => 
{
	return mp.game.invoke("0x407C7F91DDB46C16");
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_TEAM = (player) => 
{
	return mp.game.invoke("0x37039302F4E0A008", player);
}


// Arg:player is [Player]	Arg:team is [int]	
g_Natives.SET_PLAYER_TEAM = (player, team) => 
{
	return mp.game.invoke("0x0299FA38396A4940", player, team);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_NAME = (player) => 
{
	return mp.game.invoke("0x6D0DE6A7B5DA71F8", player);
}


// Arg:player is [Player]	
g_Natives.GET_WANTED_LEVEL_RADIUS = (player) => 
{
	return mp.game.invoke("0x085DEB493BE80812", player);
}


// Arg:player is [Player*]	
g_Natives.GET_PLAYER_WANTED_CENTRE_POSITION = (player) => 
{
	return mp.game.invoke("0x0C92BA89F1AF26F8", player);
}


// Arg:player is [Player]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_PLAYER_WANTED_CENTRE_POSITION = (player, x, y, z) => 
{
	return mp.game.invoke("0x520E541A97A13354", player, x, y, z);
}


// Arg:wantedLevel is [int]	
g_Natives.GET_WANTED_LEVEL_THRESHOLD = (wantedLevel) => 
{
	return mp.game.invoke("0xFDD179EAF45B556C", wantedLevel);
}


// Arg:player is [Player]	Arg:wantedLevel is [int]	Arg:disableNoMission is [BOOL]	
g_Natives.SET_PLAYER_WANTED_LEVEL = (player, wantedLevel, disableNoMission) => 
{
	return mp.game.invoke("0x39FF19C64EF7DA5B", player, wantedLevel, disableNoMission);
}


// Arg:player is [Player]	Arg:wantedLevel is [int]	Arg:p2 is [BOOL]	
g_Natives.SET_PLAYER_WANTED_LEVEL_NO_DROP = (player, wantedLevel, p2) => 
{
	return mp.game.invoke("0x340E61DE7F471565", player, wantedLevel, p2);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives.SET_PLAYER_WANTED_LEVEL_NOW = (player, p1) => 
{
	return mp.game.invoke("0xE0A7D1E497FFCD6F", player, p1);
}


// Arg:player is [Player]	
g_Natives.ARE_PLAYER_FLASHING_STARS_ABOUT_TO_DROP = (player) => 
{
	return mp.game.invoke("0xAFAF86043E5874E9", player);
}


// Arg:player is [Player]	
g_Natives.ARE_PLAYER_STARS_GREYED_OUT = (player) => 
{
	return mp.game.invoke("0x0A6EB355EE14A2DB", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_DISPATCH_COPS_FOR_PLAYER = (player, toggle) => 
{
	return mp.game.invoke("0xDB172424876553F4", player, toggle);
}


// Arg:player is [Player]	Arg:wantedLevel is [int]	
g_Natives.IS_PLAYER_WANTED_LEVEL_GREATER = (player, wantedLevel) => 
{
	return mp.game.invoke("0x238DB2A2C23EE9EF", player, wantedLevel);
}


// Arg:player is [Player]	
g_Natives.CLEAR_PLAYER_WANTED_LEVEL = (player) => 
{
	return mp.game.invoke("0xB302540597885499", player);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_DEAD = (player) => 
{
	return mp.game.invoke("0x424D4687FA1E5652", player);
}


// Arg:player is [Vehicle]	
g_Natives.IS_PLAYER_PRESSING_HORN = (player) => 
{
	return mp.game.invoke("0xFA1E2BF8B10598F9", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	Arg:flags is [int]	
g_Natives.SET_PLAYER_CONTROL = (player, toggle, flags) => 
{
	return mp.game.invoke("0x8D32347D6D4C40A2", player, toggle, flags);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_WANTED_LEVEL = (player) => 
{
	return mp.game.invoke("0xE28E54788CE8F12D", player);
}


// Arg:maxWantedLevel is [int]	
g_Natives.SET_MAX_WANTED_LEVEL = (maxWantedLevel) => 
{
	return mp.game.invoke("0xAA5F02DB48D704B9", maxWantedLevel);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_POLICE_RADAR_BLIPS = (toggle) => 
{
	return mp.game.invoke("0x43286D561B72B8BF", toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_POLICE_IGNORE_PLAYER = (player, toggle) => 
{
	return mp.game.invoke("0x32C62AA929C2DA6A", player, toggle);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_PLAYING = (player) => 
{
	return mp.game.invoke("0x5E9564D8246B909A", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_EVERYONE_IGNORE_PLAYER = (player, toggle) => 
{
	return mp.game.invoke("0x8EEDA153AD141BA4", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_ALL_RANDOM_PEDS_FLEE = (player, toggle) => 
{
	return mp.game.invoke("0x056E0FE8534C2949", player, toggle);
}


// Arg:player is [Blip]	
g_Natives.SET_ALL_RANDOM_PEDS_FLEE_THIS_FRAME = (player) => 
{
	return mp.game.invoke("0x471D2FF42A94B4F2", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives["0xDE45D1A1EF45EE61"] = (player, toggle) => 
{
	return mp.game.invoke("0xDE45D1A1EF45EE61", player, toggle);
}


// Arg:player is [Player]	
g_Natives["0xC3376F42B1FACCC6"] = (player) => 
{
	return mp.game.invoke("0xC3376F42B1FACCC6", player);
}


// Arg:player is [Player]	Arg:toggle is [Hash*]	
g_Natives.SET_IGNORE_LOW_PRIORITY_SHOCKING_EVENTS = (player, toggle) => 
{
	return mp.game.invoke("0x596976B02B6B5700", player, toggle);
}


// Arg:multiplier is [float]	
g_Natives.SET_WANTED_LEVEL_MULTIPLIER = (multiplier) => 
{
	return mp.game.invoke("0x020E5F00CDA207BA", multiplier);
}


// Arg:player is [Player]	Arg:difficulty is [float]	
g_Natives.SET_WANTED_LEVEL_DIFFICULTY = (player, difficulty) => 
{
	return mp.game.invoke("0x9B0BB33B04405E7A", player, difficulty);
}


// Arg:player is [Player]	
g_Natives.RESET_WANTED_LEVEL_DIFFICULTY = (player) => 
{
	return mp.game.invoke("0xB9D0DD990DC141DD", player);
}


// Arg:duration is [int]	
g_Natives.START_FIRING_AMNESTY = (duration) => 
{
	return mp.game.invoke("0xBF9BD71691857E48", duration);
}


// Arg:player is [Player]	Arg:crimeType is [int]	Arg:wantedLvlThresh is [int]	
g_Natives.REPORT_CRIME = (player, crimeType, wantedLvlThresh) => 
{
	return mp.game.invoke("0xE9B09589827545E7", player, crimeType, wantedLvlThresh);
}


// Arg:player is [Player]	Arg:p1 is [int]	
g_Natives._SWITCH_CRIME_TYPE = (player, p1) => 
{
	return mp.game.invoke("0x9A987297ED8BD838", player, p1);
}


// Arg:player is [Player]	
g_Natives.AI_PHONE_ARGS = (player) => 
{
	return mp.game.invoke("0xBC9490CA15AEA8FB", player);
}


// Arg:player is [Player]	
g_Natives["0x4669B3ED80F24B4E"] = (player) => 
{
	return mp.game.invoke("0x4669B3ED80F24B4E", player);
}


// Arg:player is [Player]	
g_Natives["0xAD73CE5A09E42D12"] = (player) => 
{
	return mp.game.invoke("0xAD73CE5A09E42D12", player);
}


// Arg:player is [Player]	
g_Natives["0x36F1B38855F2A8DF"] = (player) => 
{
	return mp.game.invoke("0x36F1B38855F2A8DF", player);
}


// Arg:player is [Player]	
g_Natives["0xDC64D2C53493ED12"] = (player) => 
{
	return mp.game.invoke("0xDC64D2C53493ED12", player);
}


// Arg:p0 is [float]	
g_Natives["0xB45EFF719D8427A6"] = (p0) => 
{
	return mp.game.invoke("0xB45EFF719D8427A6", p0);
}

g_Natives["0x0032A6DBA562C518"] = () => 
{
	return mp.game.invoke("0x0032A6DBA562C518");
}


// Arg:player is [Player]	
g_Natives.CAN_PLAYER_START_MISSION = (player) => 
{
	return mp.game.invoke("0xDE7465A27D403C06", player);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_READY_FOR_CUTSCENE = (player) => 
{
	return mp.game.invoke("0x908CBECC2CAA3690", player);
}


// Arg:player is [Player]	Arg:entity is [Entity]	
g_Natives.IS_PLAYER_TARGETTING_ENTITY = (player, entity) => 
{
	return mp.game.invoke("0x7912F7FC4F6264B6", player, entity);
}


// Arg:player is [Player]	Arg:entity is [Entity*]	
g_Natives.GET_PLAYER_TARGET_ENTITY = (player, entity) => 
{
	return mp.game.invoke("0x13EDE1A5DBF797C9", player, entity);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_FREE_AIMING = (player) => 
{
	return mp.game.invoke("0x2E397FD2ECD37C87", player);
}


// Arg:player is [Player]	Arg:entity is [Entity]	
g_Natives.IS_PLAYER_FREE_AIMING_AT_ENTITY = (player, entity) => 
{
	return mp.game.invoke("0x3C06B5C839B38F7B", player, entity);
}


// Arg:player is [Player]	Arg:entity is [Entity*]	
g_Natives.GET_ENTITY_PLAYER_IS_FREE_AIMING_AT = (player, entity) => 
{
	return mp.game.invoke("0x2975C866E6713290", player, entity);
}


// Arg:player is [Player]	Arg:range is [float]	
g_Natives.SET_PLAYER_LOCKON_RANGE_OVERRIDE = (player, range) => 
{
	return mp.game.invoke("0x29961D490E5814FD", player, range);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_CAN_DO_DRIVE_BY = (player, toggle) => 
{
	return mp.game.invoke("0x6E8834B52EC20C77", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_CAN_BE_HASSLED_BY_GANGS = (player, toggle) => 
{
	return mp.game.invoke("0xD5E460AD7020A246", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_CAN_USE_COVER = (player, toggle) => 
{
	return mp.game.invoke("0xD465A8599DFF6814", player, toggle);
}

g_Natives.GET_MAX_WANTED_LEVEL = () => 
{
	return mp.game.invoke("0x462E0DB9B137DC5F");
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_TARGETTING_ANYTHING = (player) => 
{
	return mp.game.invoke("0x78CFE51896B6B8A4", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_SPRINT = (player, toggle) => 
{
	return mp.game.invoke("0xA01B8075D8B92DF4", player, toggle);
}


// Arg:player is [Player]	
g_Natives.RESET_PLAYER_STAMINA = (player) => 
{
	return mp.game.invoke("0xA6F312FCCE9C1DFE", player);
}


// Arg:player is [Player]	Arg:p1 is [float]	
g_Natives.RESTORE_PLAYER_STAMINA = (player, p1) => 
{
	return mp.game.invoke("0xA352C1B864CAFD33", player, p1);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_SPRINT_STAMINA_REMAINING = (player) => 
{
	return mp.game.invoke("0x3F9F16F8E65A7ED7", player);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_SPRINT_TIME_REMAINING = (player) => 
{
	return mp.game.invoke("0x1885BC9B108B4C99", player);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_UNDERWATER_TIME_REMAINING = (player) => 
{
	return mp.game.invoke("0xA1FCF8E6AF40B731", player);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_GROUP = (player) => 
{
	return mp.game.invoke("0x0D127585F77030AF", player);
}


// Arg:vector is [Any]	
g_Natives.GET_PLAYER_MAX_ARMOUR = (vector) => 
{
	return mp.game.invoke("0x92659B4CE1863CB3", vector);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_CONTROL_ON = (player) => 
{
	return mp.game.invoke("0x49C32D60007AFA47", player);
}

g_Natives._IS_PLAYER_CAM_CONTROL_DISABLED = () => 
{
	return mp.game.invoke("0x7C814D2FB49F40C0");
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_SCRIPT_CONTROL_ON = (player) => 
{
	return mp.game.invoke("0x8A876A65283DD7D7", player);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_CLIMBING = (player) => 
{
	return mp.game.invoke("0x95E8F73DC65EFB9C", player);
}


// Arg:player is [Player]	Arg:atArresting is [BOOL]	
g_Natives.IS_PLAYER_BEING_ARRESTED = (player, atArresting) => 
{
	return mp.game.invoke("0x388A47C51ABDAC8E", player, atArresting);
}


// Arg:player is [Player]	
g_Natives.RESET_PLAYER_ARREST_STATE = (player) => 
{
	return mp.game.invoke("0x2D03E13C460760D6", player);
}

g_Natives.GET_PLAYERS_LAST_VEHICLE = () => 
{
	return mp.game.invoke("0xB6997A7EB3F5C8C0");
}

g_Natives.GET_PLAYER_INDEX = () => 
{
	return mp.game.invoke("0xA5EDC40EF369B48D");
}


// Arg:value is [int]	
g_Natives.INT_TO_PLAYERINDEX = (value) => 
{
	return mp.game.invoke("0x41BD2A6B006AF756", value);
}


// Arg:value is [int]	
g_Natives.INT_TO_PARTICIPANTINDEX = (value) => 
{
	return mp.game.invoke("0x9EC6603812C24710", value);
}


// Arg:player is [Player]	
g_Natives.GET_TIME_SINCE_PLAYER_HIT_VEHICLE = (player) => 
{
	return mp.game.invoke("0x5D35ECF3A81A0EE0", player);
}


// Arg:player is [Player]	
g_Natives.GET_TIME_SINCE_PLAYER_HIT_PED = (player) => 
{
	return mp.game.invoke("0xE36A25322DC35F42", player);
}


// Arg:player is [Player]	
g_Natives.GET_TIME_SINCE_PLAYER_DROVE_ON_PAVEMENT = (player) => 
{
	return mp.game.invoke("0xD559D2BE9E37853B", player);
}


// Arg:player is [Player]	
g_Natives.GET_TIME_SINCE_PLAYER_DROVE_AGAINST_TRAFFIC = (player) => 
{
	return mp.game.invoke("0xDB89591E290D9182", player);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_FREE_FOR_AMBIENT_TASK = (player) => 
{
	return mp.game.invoke("0xDCCFD3F106C36AB4", player);
}

g_Natives.PLAYER_ID = () => 
{
	return mp.game.invoke("0x4F8644AF03D0E0D6");
}

g_Natives.PLAYER_PED_ID = () => 
{
	return mp.game.invoke("0xD80958FC74E988A6");
}

g_Natives.NETWORK_PLAYER_ID_TO_INT = () => 
{
	return mp.game.invoke("0xEE68096F9F37341E");
}


// Arg:cleanupFlags is [int]	
g_Natives.HAS_FORCE_CLEANUP_OCCURRED = (cleanupFlags) => 
{
	return mp.game.invoke("0xC968670BFACE42D9", cleanupFlags);
}


// Arg:cleanupFlags is [Object*]	
g_Natives.FORCE_CLEANUP = (cleanupFlags) => 
{
	return mp.game.invoke("0xBC8983F38F78ED51", cleanupFlags);
}


// Arg:name is [char*]	Arg:cleanupFlags is [int]	
g_Natives.FORCE_CLEANUP_FOR_ALL_THREADS_WITH_THIS_NAME = (name, cleanupFlags) => 
{
	return mp.game.invoke("0x4C68DDDDF0097317", name, cleanupFlags);
}


// Arg:id is [int]	Arg:cleanupFlags is [int]	
g_Natives.FORCE_CLEANUP_FOR_THREAD_WITH_THIS_ID = (id, cleanupFlags) => 
{
	return mp.game.invoke("0xF745B37630DF176B", id, cleanupFlags);
}

g_Natives.GET_CAUSE_OF_MOST_RECENT_FORCE_CLEANUP = () => 
{
	return mp.game.invoke("0x9A41CF4674A12272");
}


// Arg:player is [Player]	Arg:vehicle is [Vehicle]	
g_Natives.SET_PLAYER_MAY_ONLY_ENTER_THIS_VEHICLE = (player, vehicle) => 
{
	return mp.game.invoke("0x8026FF78F208978A", player, vehicle);
}


// Arg:player is [Player*]	
g_Natives.SET_PLAYER_MAY_NOT_ENTER_ANY_VEHICLE = (player) => 
{
	return mp.game.invoke("0x1DE37BBF9E9CC14A", player);
}


// Arg:achievement is [Hash]	
g_Natives.GIVE_ACHIEVEMENT_TO_PLAYER = (achievement) => 
{
	return mp.game.invoke("0xBEC7076D64130195", achievement);
}


// Arg:achId is [int]	Arg:progression is [int]	
g_Natives._SET_ACHIEVEMENT_PROGRESSION = (achId, progression) => 
{
	return mp.game.invoke("0xC2AFFFDABBDC2C5C", achId, progression);
}


// Arg:achId is [Vehicle]	
g_Natives._GET_ACHIEVEMENT_PROGRESSION = (achId) => 
{
	return mp.game.invoke("0x1C186837D0619335", achId);
}


// Arg:achievement is [Vehicle*]	
g_Natives.HAS_ACHIEVEMENT_BEEN_PASSED = (achievement) => 
{
	return mp.game.invoke("0x867365E111A3B6EB", achievement);
}

g_Natives.IS_PLAYER_ONLINE = () => 
{
	return mp.game.invoke("0xF25D331DC2627BBC");
}

g_Natives.IS_PLAYER_LOGGING_IN_NP = () => 
{
	return mp.game.invoke("0x74556E1420867ECA");
}


// Arg:unk is [Blip*]	
g_Natives.DISPLAY_SYSTEM_SIGNIN_UI = (unk) => 
{
	return mp.game.invoke("0x94DD7888C10A979E", unk);
}

g_Natives.IS_SYSTEM_UI_BEING_DISPLAYED = () => 
{
	return mp.game.invoke("0x5D511E3867C87139");
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_INVINCIBLE = (player, toggle) => 
{
	return mp.game.invoke("0x239528EACDC3E7DE", player, toggle);
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_INVINCIBLE = (player) => 
{
	return mp.game.invoke("0xB721981B2B939E07", player);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives["0xCAC57395B151135F"] = (player, p1) => 
{
	return mp.game.invoke("0xCAC57395B151135F", player, p1);
}


// Arg:player is [Player]	Arg:p2 is [BOOL]	
g_Natives.REMOVE_PLAYER_HELMET = (player, p2) => 
{
	return mp.game.invoke("0xF3AC26D3CC576528", player, p2);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.GIVE_PLAYER_RAGDOLL_CONTROL = (player, toggle) => 
{
	return mp.game.invoke("0x3C49C870E66F0A28", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_LOCKON = (player, toggle) => 
{
	return mp.game.invoke("0x5C8B2F450EE4328E", player, toggle);
}


// Arg:targetMode is [Blip]	
g_Natives.SET_PLAYER_TARGETING_MODE = (targetMode) => 
{
	return mp.game.invoke("0xB1906895227793F3", targetMode);
}


// Arg:p0 is [BOOL*]	
g_Natives["0x5702B917B99DB1CD"] = (p0) => 
{
	return mp.game.invoke("0x5702B917B99DB1CD", p0);
}

g_Natives["0xB9CF1F793A9F1BF1"] = () => 
{
	return mp.game.invoke("0xB9CF1F793A9F1BF1");
}


// Arg:player is [Vehicle*]	
g_Natives.CLEAR_PLAYER_HAS_DAMAGED_AT_LEAST_ONE_PED = (player) => 
{
	return mp.game.invoke("0xF0B67A4DE6AB5F98", player);
}


// Arg:player is [Player]	
g_Natives.HAS_PLAYER_DAMAGED_AT_LEAST_ONE_PED = (player) => 
{
	return mp.game.invoke("0x20CE80B0C2BF4ACC", player);
}


// Arg:player is [Player]	
g_Natives.CLEAR_PLAYER_HAS_DAMAGED_AT_LEAST_ONE_NON_ANIMAL_PED = (player) => 
{
	return mp.game.invoke("0x4AACB96203D11A31", player);
}


// Arg:player is [Player]	
g_Natives.HAS_PLAYER_DAMAGED_AT_LEAST_ONE_NON_ANIMAL_PED = (player) => 
{
	return mp.game.invoke("0xE4B90F367BD81752", player);
}


// Arg:player is [Ped*]	Arg:multiplier is [Vehicle]	
g_Natives.SET_AIR_DRAG_MULTIPLIER_FOR_PLAYERS_VEHICLE = (player, multiplier) => 
{
	return mp.game.invoke("0xCA7DC8329F0A1E9E", player, multiplier);
}


// Arg:player is [Ped]	Arg:multiplier is [float]	
g_Natives.SET_SWIM_MULTIPLIER_FOR_PLAYER = (player, multiplier) => 
{
	return mp.game.invoke("0xA91C6F0FF7D16A13", player, multiplier);
}


// Arg:player is [Player]	Arg:multiplier is [float]	
g_Natives.SET_RUN_SPRINT_MULTIPLIER_FOR_PLAYER = (player, multiplier) => 
{
	return mp.game.invoke("0x6DB47AA77FD94E09", player, multiplier);
}

g_Natives.GET_TIME_SINCE_LAST_ARREST = () => 
{
	return mp.game.invoke("0x5063F92F07C2A316");
}

g_Natives.GET_TIME_SINCE_LAST_DEATH = () => 
{
	return mp.game.invoke("0xC7034807558DDFCA");
}

g_Natives.ASSISTED_MOVEMENT_CLOSE_ROUTE = () => 
{
	return mp.game.invoke("0xAEBF081FFC0A0E5E");
}

g_Natives.ASSISTED_MOVEMENT_FLUSH_ROUTE = () => 
{
	return mp.game.invoke("0x8621390F0CDCFE1F");
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_FORCED_AIM = (player, toggle) => 
{
	return mp.game.invoke("0x0FEE4F80AC44A726", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_FORCED_ZOOM = (player, toggle) => 
{
	return mp.game.invoke("0x75E7D505F2B15902", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_FORCE_SKIP_AIM_INTRO = (player, toggle) => 
{
	return mp.game.invoke("0x7651BC64AE59E128", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_PLAYER_FIRING = (player, toggle) => 
{
	return mp.game.invoke("0x5E6CC07646BBEAB8", player, toggle);
}

g_Natives._DISABLE_PLAYER_SOMETHING = () => 
{
	return mp.game.invoke("0xB885852C39CC265D");
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_DISABLE_AMBIENT_MELEE_MOVE = (player, toggle) => 
{
	return mp.game.invoke("0x2E8AABFA40A84F8C", player, toggle);
}


// Arg:player is [Player]	Arg:value is [int]	
g_Natives.SET_PLAYER_MAX_ARMOUR = (player, value) => 
{
	return mp.game.invoke("0x77DFCCF5948B8C71", player, value);
}


// Arg:player is [Player]	
g_Natives.SPECIAL_ABILITY_DEACTIVATE = (player) => 
{
	return mp.game.invoke("0xD6A953C6D1492057", player);
}


// Arg:player is [Player]	
g_Natives.SPECIAL_ABILITY_DEACTIVATE_FAST = (player) => 
{
	return mp.game.invoke("0x9CB5CE07A3968D5A", player);
}


// Arg:player is [Player]	
g_Natives.SPECIAL_ABILITY_RESET = (player) => 
{
	return mp.game.invoke("0x375F0E738F861A94", player);
}


// Arg:player is [Player]	
g_Natives._SPECIAL_ABILITY_CHARGE_ON_MISSION_FAILED = (player) => 
{
	return mp.game.invoke("0xC9A763D8FE87436A", player);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SPECIAL_ABILITY_CHARGE_SMALL = (player, p1, p2) => 
{
	return mp.game.invoke("0x2E7B9B683481687D", player, p1, p2);
}


// Arg:player is [Player]	Arg:p1 is [Vehicle]	Arg:p2 is [Vehicle]	
g_Natives.SPECIAL_ABILITY_CHARGE_MEDIUM = (player, p1, p2) => 
{
	return mp.game.invoke("0xF113E3AA9BC54613", player, p1, p2);
}


// Arg:player is [Player]	Arg:p1 is [int]	Arg:p2 is [Hash]	
g_Natives.SPECIAL_ABILITY_CHARGE_LARGE = (player, p1, p2) => 
{
	return mp.game.invoke("0xF733F45FA4497D93", player, p1, p2);
}


// Arg:player is [Player]	Arg:p2 is [Ped]	
g_Natives.SPECIAL_ABILITY_CHARGE_CONTINUOUS = (player, p2) => 
{
	return mp.game.invoke("0xED481732DFF7E997", player, p2);
}


// Arg:player is [Player]	Arg:p1 is [int]	Arg:p2 is [BOOL]	
g_Natives.SPECIAL_ABILITY_CHARGE_ABSOLUTE = (player, p1, p2) => 
{
	return mp.game.invoke("0xB7B0870EB531D08D", player, p1, p2);
}


// Arg:player is [Player]	Arg:normalizedValue is [float]	Arg:p2 is [BOOL]	
g_Natives.SPECIAL_ABILITY_CHARGE_NORMALIZED = (player, normalizedValue, p2) => 
{
	return mp.game.invoke("0xA0696A65F009EE18", player, normalizedValue, p2);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives.SPECIAL_ABILITY_FILL_METER = (player, p1) => 
{
	return mp.game.invoke("0x3DACA8DDC6FD4980", player, p1);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives.SPECIAL_ABILITY_DEPLETE_METER = (player, p1) => 
{
	return mp.game.invoke("0x1D506DBBBC51E64B", player, p1);
}


// Arg:playerModel is [Hash]	
g_Natives.SPECIAL_ABILITY_LOCK = (playerModel) => 
{
	return mp.game.invoke("0x6A09D0D590A47D13", playerModel);
}


// Arg:playerModel is [Hash]	
g_Natives.SPECIAL_ABILITY_UNLOCK = (playerModel) => 
{
	return mp.game.invoke("0xF145F3BE2EFA9A3B", playerModel);
}


// Arg:playerModel is [Hash]	
g_Natives.IS_SPECIAL_ABILITY_UNLOCKED = (playerModel) => 
{
	return mp.game.invoke("0xC6017F6A6CDFA694", playerModel);
}


// Arg:player is [Ped]	
g_Natives.IS_SPECIAL_ABILITY_ACTIVE = (player) => 
{
	return mp.game.invoke("0x3E5F7FC85D854E15", player);
}


// Arg:player is [Player]	
g_Natives.IS_SPECIAL_ABILITY_METER_FULL = (player) => 
{
	return mp.game.invoke("0x05A1FE504B7F2587", player);
}


// Arg:player is [Player*]	Arg:toggle is [BOOL]	
g_Natives.ENABLE_SPECIAL_ABILITY = (player, toggle) => 
{
	return mp.game.invoke("0x181EC197DAEFE121", player, toggle);
}


// Arg:player is [Player]	
g_Natives.IS_SPECIAL_ABILITY_ENABLED = (player) => 
{
	return mp.game.invoke("0xB1D200FE26AEF3CB", player);
}


// Arg:multiplier is [float]	
g_Natives.SET_SPECIAL_ABILITY_MULTIPLIER = (multiplier) => 
{
	return mp.game.invoke("0xA49C426ED0CA4AB7", multiplier);
}


// Arg:player is [Player]	
g_Natives["0xFFEE8FA29AB9A18E"] = (player) => 
{
	return mp.game.invoke("0xFFEE8FA29AB9A18E", player);
}


// Arg:player is [Player]	
g_Natives["0x5FC472C501CCADB3"] = (player) => 
{
	return mp.game.invoke("0x5FC472C501CCADB3", player);
}


// Arg:player is [Player]	Arg:p1 is [int]	
g_Natives["0xF10B44FD479D69F3"] = (player, p1) => 
{
	return mp.game.invoke("0xF10B44FD479D69F3", player, p1);
}


// Arg:player is [Player]	Arg:p1 is [float]	
g_Natives._IS_PLAYER_WITHIN_TEST_CAPSULE = (player, p1) => 
{
	return mp.game.invoke("0xDD2620B7B9D16FF1", player, p1);
}


// Arg:player is [Player]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:keepVehicle is [BOOL]	Arg:keepVelocity is [BOOL]	Arg:fadeInOut is [BOOL]	
g_Natives.START_PLAYER_TELEPORT = (player, x, y, z, heading, keepVehicle, keepVelocity, fadeInOut) => 
{
	return mp.game.invoke("0xAD15F075A4DA0FDE", player, x, y, z, heading, keepVehicle, keepVelocity, fadeInOut);
}


// Arg:player is [Player]	
g_Natives._HAS_PLAYER_TELEPORT_FINISHED = (player) => 
{
	return mp.game.invoke("0xE23D5873C2394C61", player);
}

g_Natives.STOP_PLAYER_TELEPORT = () => 
{
	return mp.game.invoke("0xC449EDED9D73009C");
}

g_Natives.IS_PLAYER_TELEPORT_ACTIVE = () => 
{
	return mp.game.invoke("0x02B15662D7F8886F");
}


// Arg:player is [Player]	
g_Natives.GET_PLAYER_CURRENT_STEALTH_NOISE = (player) => 
{
	return mp.game.invoke("0x2F395D61F3A1F877", player);
}


// Arg:player is [Player]	Arg:regenRate is [float]	
g_Natives.SET_PLAYER_HEALTH_RECHARGE_MULTIPLIER = (player, regenRate) => 
{
	return mp.game.invoke("0x5DB660B38DD98A31", player, regenRate);
}


// Arg:player is [Player]	Arg:damageAmount is [Pickup*]	
g_Natives.SET_PLAYER_WEAPON_DAMAGE_MODIFIER = (player, damageAmount) => 
{
	return mp.game.invoke("0xCE07B9F7817AADA3", player, damageAmount);
}


// Arg:player is [Player]	Arg:modifier is [float]	
g_Natives.SET_PLAYER_WEAPON_DEFENSE_MODIFIER = (player, modifier) => 
{
	return mp.game.invoke("0x2D83BC011CA14A3C", player, modifier);
}


// Arg:player is [Player]	Arg:modifier is [float]	
g_Natives.SET_PLAYER_MELEE_WEAPON_DAMAGE_MODIFIER = (player, modifier) => 
{
	return mp.game.invoke("0x4A3DC7ECCC321032", player, modifier);
}


// Arg:player is [Player]	Arg:modifier is [float]	
g_Natives.SET_PLAYER_MELEE_WEAPON_DEFENSE_MODIFIER = (player, modifier) => 
{
	return mp.game.invoke("0xAE540335B4ABC4E2", player, modifier);
}


// Arg:player is [Player]	Arg:damageAmount is [float]	
g_Natives.SET_PLAYER_VEHICLE_DAMAGE_MODIFIER = (player, damageAmount) => 
{
	return mp.game.invoke("0xA50E117CDDF82F0C", player, damageAmount);
}


// Arg:player is [Player]	Arg:modifier is [float]	
g_Natives.SET_PLAYER_VEHICLE_DEFENSE_MODIFIER = (player, modifier) => 
{
	return mp.game.invoke("0x4C60E6EFDAFF2462", player, modifier);
}


// Arg:ped is [Ped]	Arg:vehicleindex is [Vehicle*]	
g_Natives.SET_PLAYER_PARACHUTE_TINT_INDEX = (ped, vehicleindex) => 
{
	return mp.game.invoke("0xA3D0E54541D9A5E5", ped, vehicleindex);
}


// Arg:Player is [Player]	Arg:tintIndex is [int*]	
g_Natives.GET_PLAYER_PARACHUTE_TINT_INDEX = (Player, tintIndex) => 
{
	return mp.game.invoke("0x75D3F7A1B0D9B145", Player, tintIndex);
}


// Arg:player is [Player]	Arg:index is [int]	
g_Natives.SET_PLAYER_RESERVE_PARACHUTE_TINT_INDEX = (player, index) => 
{
	return mp.game.invoke("0xAF04C87F5DC1DF38", player, index);
}


// Arg:player is [Player]	Arg:index is [int*]	
g_Natives.GET_PLAYER_RESERVE_PARACHUTE_TINT_INDEX = (player, index) => 
{
	return mp.game.invoke("0xD5A016BC3C09CF40", player, index);
}


// Arg:player is [Player]	Arg:tintIndex is [int]	
g_Natives.SET_PLAYER_PARACHUTE_PACK_TINT_INDEX = (player, tintIndex) => 
{
	return mp.game.invoke("0x93B0FB27C9A04060", player, tintIndex);
}


// Arg:player is [Player]	Arg:tintIndex is [int*]	
g_Natives.GET_PLAYER_PARACHUTE_PACK_TINT_INDEX = (player, tintIndex) => 
{
	return mp.game.invoke("0x6E9C742F340CE5A2", player, tintIndex);
}


// Arg:player is [Player]	
g_Natives.SET_PLAYER_HAS_RESERVE_PARACHUTE = (player) => 
{
	return mp.game.invoke("0x7DDAB28D31FAC363", player);
}


// Arg:player is [Any]	
g_Natives.GET_PLAYER_HAS_RESERVE_PARACHUTE = (player) => 
{
	return mp.game.invoke("0x5DDFE2FF727F3CA3", player);
}


// Arg:player is [Player]	Arg:enabled is [BOOL]	
g_Natives.SET_PLAYER_CAN_LEAVE_PARACHUTE_SMOKE_TRAIL = (player, enabled) => 
{
	return mp.game.invoke("0xF401B182DBA8AF53", player, enabled);
}


// Arg:player is [Player]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives.SET_PLAYER_PARACHUTE_SMOKE_TRAIL_COLOR = (player, r, g, b) => 
{
	return mp.game.invoke("0x8217FD371A4625CF", player, r, g, b);
}


// Arg:player is [Player]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_PLAYER_PARACHUTE_SMOKE_TRAIL_COLOR = (player, r, g, b) => 
{
	return mp.game.invoke("0xEF56DBABD3CD4887", player, r, g, b);
}


// Arg:player is [Player]	Arg:flags is [int]	
g_Natives.SET_PLAYER_RESET_FLAG_PREFER_REAR_SEATS = (player, flags) => 
{
	return mp.game.invoke("0x11D5F725F0E780E0", player, flags);
}


// Arg:player is [Player]	Arg:multiplier is [float]	
g_Natives.SET_PLAYER_NOISE_MULTIPLIER = (player, multiplier) => 
{
	return mp.game.invoke("0xDB89EF50FF25FCE9", player, multiplier);
}


// Arg:player is [Player]	Arg:multiplier is [float]	
g_Natives.SET_PLAYER_SNEAKING_NOISE_MULTIPLIER = (player, multiplier) => 
{
	return mp.game.invoke("0xB2C1A29588A9F47C", player, multiplier);
}


// Arg:player is [Player]	Arg:ped is [Ped]	
g_Natives.CAN_PED_HEAR_PLAYER = (player, ped) => 
{
	return mp.game.invoke("0xF297383AA91DCA29", player, ped);
}


// Arg:control is [Player]	Arg:amount is [float]	Arg:gaitType is [int]	Arg:speed is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives.SIMULATE_PLAYER_INPUT_GAIT = (control, amount, gaitType, speed, p4, p5) => 
{
	return mp.game.invoke("0x477D5D63E63ECA5D", control, amount, gaitType, speed, p4, p5);
}


// Arg:player is [Pickup]	
g_Natives.RESET_PLAYER_INPUT_GAIT = (player) => 
{
	return mp.game.invoke("0x19531C47A2ABD691", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_AUTO_GIVE_PARACHUTE_WHEN_ENTER_PLANE = (player, toggle) => 
{
	return mp.game.invoke("0x9F343285A00B4BB6", player, toggle);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives["0xD2B315B6689D537D"] = (player, p1) => 
{
	return mp.game.invoke("0xD2B315B6689D537D", player, p1);
}


// Arg:player is [Player]	Arg:value is [float]	
g_Natives.SET_PLAYER_STEALTH_PERCEPTION_MODIFIER = (player, value) => 
{
	return mp.game.invoke("0x4E9021C1FCDD507A", player, value);
}


// Arg:p0 is [Player]	
g_Natives["0x690A61A6D13583F6"] = (p0) => 
{
	return mp.game.invoke("0x690A61A6D13583F6", p0);
}


// Arg:player is [Player]	
g_Natives["0x9EDD76E87D5D51BA"] = (player) => 
{
	return mp.game.invoke("0x9EDD76E87D5D51BA", player);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_SIMULATE_AIMING = (player, toggle) => 
{
	return mp.game.invoke("0xC54C95DA968EC5B5", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_CLOTH_PIN_FRAMES = (player, toggle) => 
{
	return mp.game.invoke("0x749FADDF97DFE930", player, toggle);
}


// Arg:index is [int]	
g_Natives.SET_PLAYER_CLOTH_PACKAGE_INDEX = (index) => 
{
	return mp.game.invoke("0x9F7BBA2EA6372500", index);
}


// Arg:value is [int]	
g_Natives.SET_PLAYER_CLOTH_LOCK_COUNTER = (value) => 
{
	return mp.game.invoke("0x14D913B777DFF5DA", value);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	
g_Natives.PLAYER_ATTACH_VIRTUAL_BOUND = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0xED51733DC73AED51", p0, p1, p2, p3, p4, p5, p6, p7);
}

g_Natives.PLAYER_DETACH_VIRTUAL_BOUND = () => 
{
	return mp.game.invoke("0x1DD5897E2FA6E7C9");
}


// Arg:player is [Ped*]	
g_Natives.HAS_PLAYER_BEEN_SPOTTED_IN_STOLEN_VEHICLE = (player) => 
{
	return mp.game.invoke("0xD705740BB0A1CF4C", player);
}


// Arg:player is [ScrHandle]	
g_Natives["0x38D28DA81E4E9BF9"] = (player) => 
{
	return mp.game.invoke("0x38D28DA81E4E9BF9", player);
}


// Arg:player is [Player]	Arg:p1 is [int]	Arg:p2 is [BOOL]	
g_Natives["0xBC0753C9CA14B506"] = (player, p1, p2) => 
{
	return mp.game.invoke("0xBC0753C9CA14B506", player, p1, p2);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives._EXPAND_WORLD_LIMITS = (x, y, z) => 
{
	return mp.game.invoke("0x5006D96C995A5827", x, y, z);
}


// Arg:player is [Vehicle*]	
g_Natives.IS_PLAYER_RIDING_TRAIN = (player) => 
{
	return mp.game.invoke("0x4EC12697209F2196", player);
}


// Arg:player is [Ped*]	
g_Natives.HAS_PLAYER_LEFT_THE_WORLD = (player) => 
{
	return mp.game.invoke("0xD55DDFB47991A294", player);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives["0xFF300C7649724A0B"] = (player, p1) => 
{
	return mp.game.invoke("0xFF300C7649724A0B", player, p1);
}


// Arg:player is [Player]	Arg:p1 is [int]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [BOOL]	
g_Natives.SET_PLAYER_PARACHUTE_VARIATION_OVERRIDE = (player, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xD9284A8C0D48352C", player, p1, p2, p3, p4);
}


// Arg:player is [Player]	
g_Natives.CLEAR_PLAYER_PARACHUTE_VARIATION_OVERRIDE = (player) => 
{
	return mp.game.invoke("0x0F4CC924CF8C7B21", player);
}


// Arg:player is [Player]	Arg:model is [Hash]	
g_Natives.SET_PLAYER_PARACHUTE_MODEL_OVERRIDE = (player, model) => 
{
	return mp.game.invoke("0x977DB4641F6FC3DB", player, model);
}


// Arg:player is [Player]	
g_Natives.CLEAR_PLAYER_PARACHUTE_MODEL_OVERRIDE = (player) => 
{
	return mp.game.invoke("0x8753997EB5F6EE3F", player);
}


// Arg:player is [Player]	Arg:model is [Hash]	
g_Natives.SET_PLAYER_PARACHUTE_PACK_MODEL_OVERRIDE = (player, model) => 
{
	return mp.game.invoke("0xDC80A4C2F18A2B64", player, model);
}


// Arg:player is [Player]	
g_Natives.CLEAR_PLAYER_PARACHUTE_PACK_MODEL_OVERRIDE = (player) => 
{
	return mp.game.invoke("0x10C54E4389C12B42", player);
}


// Arg:player is [Player]	
g_Natives.DISABLE_PLAYER_VEHICLE_REWARDS = (player) => 
{
	return mp.game.invoke("0xC142BE3BB9CE125F", player);
}


// Arg:p0 is [BOOL]	
g_Natives["0x2F7CEB6520288061"] = (p0) => 
{
	return mp.game.invoke("0x2F7CEB6520288061", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [ScrHandle]	
g_Natives["0x5DC40A8869C22141"] = (p0, p1) => 
{
	return mp.game.invoke("0x5DC40A8869C22141", p0, p1);
}


// Arg:player is [BOOL]	
g_Natives["0x65FAEE425DE637B0"] = (player) => 
{
	return mp.game.invoke("0x65FAEE425DE637B0", player);
}


// Arg:player is [Vehicle*]	
g_Natives._SET_UNK_FRAMEFLAG = (player) => 
{
	return mp.game.invoke("0x5501B7A5CDB79D37", player);
}


// Arg:p7 is [Ped]	
g_Natives["0x56105E599CAB0EFA"] = (p7) => 
{
	return mp.game.invoke("0x56105E599CAB0EFA", p7);
}


// Arg:entity is [Entity]	
g_Natives.DOES_ENTITY_EXIST = (entity) => 
{
	return mp.game.invoke("0x7239B21A38F536BA", entity);
}


// Arg:entity is [Entity]	Arg:p2 is [BOOL]	
g_Natives.DOES_ENTITY_BELONG_TO_THIS_SCRIPT = (entity, p2) => 
{
	return mp.game.invoke("0xDDE6DF5AE89981D2", entity, p2);
}


// Arg:entity is [Entity]	
g_Natives.DOES_ENTITY_HAVE_DRAWABLE = (entity) => 
{
	return mp.game.invoke("0x060D6E96F8B8E48D", entity);
}


// Arg:entity is [Entity]	
g_Natives.DOES_ENTITY_HAVE_PHYSICS = (entity) => 
{
	return mp.game.invoke("0xDA95EA3317CC5064", entity);
}


// Arg:entity is [Entity]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:p3 is [int]	
g_Natives.HAS_ENTITY_ANIM_FINISHED = (entity, animDict, animName, p3) => 
{
	return mp.game.invoke("0x20B711662962B472", entity, animDict, animName, p3);
}


// Arg:entity is [Entity]	
g_Natives.HAS_ENTITY_BEEN_DAMAGED_BY_ANY_OBJECT = (entity) => 
{
	return mp.game.invoke("0x95EB9964FF5C5C65", entity);
}


// Arg:entity is [Entity]	
g_Natives.HAS_ENTITY_BEEN_DAMAGED_BY_ANY_PED = (entity) => 
{
	return mp.game.invoke("0x605F5A140F202491", entity);
}


// Arg:entity is [Entity]	
g_Natives.HAS_ENTITY_BEEN_DAMAGED_BY_ANY_VEHICLE = (entity) => 
{
	return mp.game.invoke("0xDFD5033FDBA0A9C8", entity);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:p2 is [BOOL]	
g_Natives.HAS_ENTITY_BEEN_DAMAGED_BY_ENTITY = (entity1, entity2, p2) => 
{
	return mp.game.invoke("0xC86D67D52A707CF8", entity1, entity2, p2);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:traceType is [int]	
g_Natives.HAS_ENTITY_CLEAR_LOS_TO_ENTITY = (entity1, entity2, traceType) => 
{
	return mp.game.invoke("0xFCDFF7B72D23A1AC", entity1, entity2, traceType);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	
g_Natives.HAS_ENTITY_CLEAR_LOS_TO_ENTITY_IN_FRONT = (entity1, entity2) => 
{
	return mp.game.invoke("0x0267D00AF114F17A", entity1, entity2);
}


// Arg:entity is [Entity]	
g_Natives.HAS_ENTITY_COLLIDED_WITH_ANYTHING = (entity) => 
{
	return mp.game.invoke("0x8BAD02F0368D9E14", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_LAST_MATERIAL_HIT_BY_ENTITY = (entity) => 
{
	return mp.game.invoke("0x5C3D0A935F535C4C", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_COLLISION_NORMAL_OF_LAST_HIT_FOR_ENTITY = (entity) => 
{
	return mp.game.invoke("0xE465D4AB7CA6AE72", entity);
}


// Arg:entity is [Entity]	
g_Natives.FORCE_ENTITY_AI_AND_ANIMATION_UPDATE = (entity) => 
{
	return mp.game.invoke("0x40FDEDB72F8293B2", entity);
}


// Arg:entity is [Entity]	Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives.GET_ENTITY_ANIM_CURRENT_TIME = (entity, animDict, animName) => 
{
	return mp.game.invoke("0x346D81500D088F42", entity, animDict, animName);
}


// Arg:entity is [Entity]	Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives.GET_ENTITY_ANIM_TOTAL_TIME = (entity, animDict, animName) => 
{
	return mp.game.invoke("0x50BD2730B191E360", entity, animDict, animName);
}


// Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives._GET_ANIM_DURATION = (animDict, animName) => 
{
	return mp.game.invoke("0xFEDDF04D62B8D790", animDict, animName);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_ATTACHED_TO = (entity) => 
{
	return mp.game.invoke("0x48C2BED9180FE123", entity);
}


// Arg:entity is [Entity]	Arg:alive is [BOOL]	
g_Natives.GET_ENTITY_COORDS = (entity, alive) => 
{
	return mp.game.invokeVector3("0x3FEF770D40960D5A", entity, alive);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_FORWARD_VECTOR = (entity) => 
{
	return mp.game.invoke("0x0A794A5A57F8DF91", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_FORWARD_X = (entity) => 
{
	return mp.game.invoke("0x8BB4EF4214E0E6D5", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_FORWARD_Y = (entity) => 
{
	return mp.game.invoke("0x866A4A5FAE349510", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_HEADING = (entity) => 
{
	return mp.game.invoke("0xE83D4F9BA2A38914", entity);
}


// Arg:entity is [Entity]	
g_Natives._GET_ENTITY_PHYSICS_HEADING = (entity) => 
{
	return mp.game.invoke("0x846BF6291198A71E", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_HEALTH = (entity) => 
{
	return mp.game.invoke("0xEEF059FAD016D209", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_MAX_HEALTH = (entity) => 
{
	return mp.game.invoke("0x15D757606D170C3C", entity);
}


// Arg:entity is [Entity]	Arg:value is [int]	
g_Natives.SET_ENTITY_MAX_HEALTH = (entity, value) => 
{
	return mp.game.invoke("0x166E7CF68597D8B5", entity, value);
}


// Arg:entity is [Entity]	Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	Arg:atTop is [BOOL]	Arg:inWorldCoords is [BOOL]	
g_Natives.GET_ENTITY_HEIGHT = (entity, X, Y, Z, atTop, inWorldCoords) => 
{
	return mp.game.invoke("0x5A504562485944DD", entity, X, Y, Z, atTop, inWorldCoords);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_HEIGHT_ABOVE_GROUND = (entity) => 
{
	return mp.game.invoke("0x1DD55701034110E5", entity);
}


// Arg:entity is [Entity]	Arg:rightVector is [Vector3*]	Arg:forwardVector is [Vector3*]	Arg:upVector is [Vector3*]	Arg:position is [Vector3*]	
g_Natives.GET_ENTITY_MATRIX = (entity, rightVector, forwardVector, upVector, position) => 
{
	return mp.game.invoke("0xECB2FC7235A7D137", entity, rightVector, forwardVector, upVector, position);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_MODEL = (entity) => 
{
	return mp.game.invoke("0x9F47B058362C84B5", entity);
}


// Arg:entity is [Entity]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.GET_OFFSET_FROM_ENTITY_GIVEN_WORLD_COORDS = (entity, posX, posY, posZ) => 
{
	return mp.game.invoke("0x2274BC1C4885E333", entity, posX, posY, posZ);
}


// Arg:entity is [Entity]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	
g_Natives.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS = (entity, offsetX, offsetY, offsetZ) => 
{
	return mp.game.invoke("0x1899F328B0E12848", entity, offsetX, offsetY, offsetZ);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_PITCH = (entity) => 
{
	return mp.game.invoke("0xD45DC2893621E1FE", entity);
}


// Arg:entity is [Entity]	Arg:x is [float*]	Arg:y is [float*]	Arg:z is [float*]	Arg:w is [float*]	
g_Natives.GET_ENTITY_QUATERNION = (entity, x, y, z, w) => 
{
	return mp.game.invoke("0x7B3703D2D32DFA18", entity, x, y, z, w);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_ROLL = (entity) => 
{
	return mp.game.invoke("0x831E0242595560DF", entity);
}


// Arg:entity is [Entity]	Arg:rotationOrder is [int]	
g_Natives.GET_ENTITY_ROTATION = (entity, rotationOrder) => 
{
	return mp.game.invokeVector3("0xAFBD61CC738D9EB9", entity, rotationOrder);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_ROTATION_VELOCITY = (entity) => 
{
	return mp.game.invoke("0x213B91045D09B983", entity);
}


// Arg:entity is [Entity]	Arg:script is [ScrHandle*]	
g_Natives.GET_ENTITY_SCRIPT = (entity, script) => 
{
	return mp.game.invoke("0xA6E9C38DB51D7748", entity, script);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_SPEED = (entity) => 
{
	return mp.game.invoke("0xD5037BA82E12416F", entity);
}


// Arg:entity is [Entity]	Arg:relative is [BOOL]	
g_Natives.GET_ENTITY_SPEED_VECTOR = (entity, relative) => 
{
	return mp.game.invoke("0x9A8D700A51CB7B0D", entity, relative);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_UPRIGHT_VALUE = (entity) => 
{
	return mp.game.invoke("0x95EED5A694951F9F", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_VELOCITY = (entity) => 
{
	return mp.game.invoke("0x4805D2B1D8CF94A9", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_OBJECT_INDEX_FROM_ENTITY_INDEX = (entity) => 
{
	return mp.game.invoke("0xD7E3B9735C0F89D6", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_PED_INDEX_FROM_ENTITY_INDEX = (entity) => 
{
	return mp.game.invoke("0x04A2A40C73395041", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_VEHICLE_INDEX_FROM_ENTITY_INDEX = (entity) => 
{
	return mp.game.invoke("0x4B53F92932ADFAC0", entity);
}


// Arg:entity is [Entity]	Arg:boneIndex is [int]	
g_Natives.GET_WORLD_POSITION_OF_ENTITY_BONE = (entity, boneIndex) => 
{
	return mp.game.invoke("0x44A8FCB8ED227738", entity, boneIndex);
}


// Arg:entity is [Entity]	
g_Natives.GET_NEAREST_PLAYER_TO_ENTITY = (entity) => 
{
	return mp.game.invoke("0x7196842CB375CDB3", entity);
}


// Arg:entity is [Entity]	Arg:team is [int]	
g_Natives.GET_NEAREST_PLAYER_TO_ENTITY_ON_TEAM = (entity, team) => 
{
	return mp.game.invoke("0x4DC9A62F844D9337", entity, team);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_TYPE = (entity) => 
{
	return mp.game.invoke("0x8ACD366038D14505", entity);
}


// Arg:entity is [Entity]	
g_Natives._GET_ENTITY_POPULATION_TYPE = (entity) => 
{
	return mp.game.invoke("0xF6F5161F4534EDFF", entity);
}


// Arg:handle is [int]	
g_Natives.IS_AN_ENTITY = (handle) => 
{
	return mp.game.invoke("0x731EC8A916BD11A1", handle);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_A_PED = (entity) => 
{
	return mp.game.invoke("0x524AC5ECEA15343E", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_A_MISSION_ENTITY = (entity) => 
{
	return mp.game.invoke("0x0A7B270912999B3C", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_A_VEHICLE = (entity) => 
{
	return mp.game.invoke("0x6AC7003FA6E5575E", entity);
}


// Arg:entity is [Player*]	
g_Natives.IS_ENTITY_AN_OBJECT = (entity) => 
{
	return mp.game.invoke("0x8D68C8FD0FACA94E", entity);
}


// Arg:entity is [Entity]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xSize is [float]	Arg:ySize is [float]	Arg:zSize is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [int]	
g_Natives.IS_ENTITY_AT_COORD = (entity, xPos, yPos, zPos, xSize, ySize, zSize, p7, p8, p9) => 
{
	return mp.game.invoke("0x20B60995556D004F", entity, xPos, yPos, zPos, xSize, ySize, zSize, p7, p8, p9);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:xSize is [float]	Arg:ySize is [float]	Arg:zSize is [float]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [int]	
g_Natives.IS_ENTITY_AT_ENTITY = (entity1, entity2, xSize, ySize, zSize, p5, p6, p7) => 
{
	return mp.game.invoke("0x751B70C3D034E187", entity1, entity2, xSize, ySize, zSize, p5, p6, p7);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ATTACHED = (entity) => 
{
	return mp.game.invoke("0xB346476EF1A64897", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ATTACHED_TO_ANY_OBJECT = (entity) => 
{
	return mp.game.invoke("0xCF511840CEEDE0CC", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ATTACHED_TO_ANY_PED = (entity) => 
{
	return mp.game.invoke("0xB1632E9A5F988D11", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ATTACHED_TO_ANY_VEHICLE = (entity) => 
{
	return mp.game.invoke("0x26AA915AD89BFB4B", entity);
}


// Arg:from is [Entity]	Arg:to is [Entity]	
g_Natives.IS_ENTITY_ATTACHED_TO_ENTITY = (from, to) => 
{
	return mp.game.invoke("0xEFBE71898A993728", from, to);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_DEAD = (entity) => 
{
	return mp.game.invoke("0x5F9532F3B5CC2551", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_IN_AIR = (entity) => 
{
	return mp.game.invoke("0x886E37EC497200B6", entity);
}


// Arg:entity is [Entity]	Arg:originX is [float]	Arg:originY is [float]	Arg:originZ is [float]	Arg:edgeX is [float]	Arg:edgeY is [float]	Arg:edgeZ is [float]	Arg:angle is [float]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	Arg:p10 is [Any]	
g_Natives.IS_ENTITY_IN_ANGLED_AREA = (entity, originX, originY, originZ, edgeX, edgeY, edgeZ, angle, p8, p9, p10) => 
{
	return mp.game.invoke("0x51210CED3DA1C78A", entity, originX, originY, originZ, edgeX, edgeY, edgeZ, angle, p8, p9, p10);
}


// Arg:entity is [Entity]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [Any]	
g_Natives.IS_ENTITY_IN_AREA = (entity, x1, y1, z1, x2, y2, z2, p7, p8, p9) => 
{
	return mp.game.invoke("0x54736AA40E271165", entity, x1, y1, z1, x2, y2, z2, p7, p8, p9);
}


// Arg:entity is [Entity]	Arg:zone is [char*]	
g_Natives.IS_ENTITY_IN_ZONE = (entity, zone) => 
{
	return mp.game.invoke("0xB6463CF6AF527071", entity, zone);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_IN_WATER = (entity) => 
{
	return mp.game.invoke("0xCFB0A0D8EDD145A3", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_SUBMERGED_LEVEL = (entity) => 
{
	return mp.game.invoke("0xE81AFC1BC4CC41CE", entity);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives._SET_USED_BY_PLAYER = (entity, toggle) => 
{
	return mp.game.invoke("0x694E00132F2823ED", entity, toggle);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ON_SCREEN = (entity) => 
{
	return mp.game.invoke("0xE659E47AF827484B", entity);
}


// Arg:entity is [Entity]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:taskFlag is [int]	
g_Natives.IS_ENTITY_PLAYING_ANIM = (entity, animDict, animName, taskFlag) => 
{
	return mp.game.invoke("0x1F0B79228E461EC9", entity, animDict, animName, taskFlag);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_STATIC = (entity) => 
{
	return mp.game.invoke("0x1218E6886D3D8327", entity);
}


// Arg:entity is [Entity]	Arg:targetEntity is [Entity]	
g_Natives.IS_ENTITY_TOUCHING_ENTITY = (entity, targetEntity) => 
{
	return mp.game.invoke("0x17FFC1B2BA35A494", entity, targetEntity);
}


// Arg:entity is [Entity]	Arg:modelHash is [Hash]	
g_Natives.IS_ENTITY_TOUCHING_MODEL = (entity, modelHash) => 
{
	return mp.game.invoke("0x0F42323798A58C8C", entity, modelHash);
}


// Arg:entity is [Entity]	Arg:angle is [float]	
g_Natives.IS_ENTITY_UPRIGHT = (entity, angle) => 
{
	return mp.game.invoke("0x5333F526F6AB19AA", entity, angle);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_UPSIDEDOWN = (entity) => 
{
	return mp.game.invoke("0x1DBD58820FA61D71", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_VISIBLE = (entity) => 
{
	return mp.game.invoke("0x47D6F43D77935C75", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_VISIBLE_TO_SCRIPT = (entity) => 
{
	return mp.game.invoke("0xD796CB5BA8F20E32", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_OCCLUDED = (entity) => 
{
	return mp.game.invoke("0xE31C2C72B8692B64", entity);
}


// Arg:entityModelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p4 is [BOOL]	
g_Natives.WOULD_ENTITY_BE_OCCLUDED = (entityModelHash, x, y, z, p4) => 
{
	return mp.game.invoke("0xEE5D2A122E09EC42", entityModelHash, x, y, z, p4);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_WAITING_FOR_WORLD_COLLISION = (entity) => 
{
	return mp.game.invoke("0xD05BFF0C0A12C68F", entity);
}


// Arg:entity is [Entity]	Arg:forceType is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [BOOL]	Arg:isDirectionRel is [BOOL]	Arg:isForceRel is [BOOL]	Arg:p8 is [BOOL]	
g_Natives.APPLY_FORCE_TO_ENTITY_CENTER_OF_MASS = (entity, forceType, x, y, z, p5, isDirectionRel, isForceRel, p8) => 
{
	return mp.game.invoke("0x18FF00FC7EFF559E", entity, forceType, x, y, z, p5, isDirectionRel, isForceRel, p8);
}


// Arg:entity is [Entity]	Arg:forceFlags is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:offX is [float]	Arg:offY is [float]	Arg:offZ is [float]	Arg:boneIndex is [int]	Arg:isDirectionRel is [BOOL]	Arg:ignoreUpVec is [BOOL]	Arg:isForceRel is [BOOL]	Arg:p12 is [BOOL]	Arg:p13 is [BOOL]	
g_Natives.APPLY_FORCE_TO_ENTITY = (entity, forceFlags, x, y, z, offX, offY, offZ, boneIndex, isDirectionRel, ignoreUpVec, isForceRel, p12, p13) => 
{
	return mp.game.invoke("0xC5F68BE9613E2D18", entity, forceFlags, x, y, z, offX, offY, offZ, boneIndex, isDirectionRel, ignoreUpVec, isForceRel, p12, p13);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:boneIndex is [int]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:p9 is [BOOL]	Arg:useSoftPinning is [BOOL]	Arg:collision is [BOOL]	Arg:isPed is [BOOL]	Arg:vertexIndex is [int]	Arg:fixedRot is [BOOL]	
g_Natives.ATTACH_ENTITY_TO_ENTITY = (entity1, entity2, boneIndex, xPos, yPos, zPos, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot) => 
{
	return mp.game.invoke("0x6B9BBD38AB0796DF", entity1, entity2, boneIndex, xPos, yPos, zPos, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:boneIndex1 is [int]	Arg:boneIndex2 is [int]	Arg:xPos1 is [float]	Arg:yPos1 is [float]	Arg:zPos1 is [float]	Arg:xPos2 is [float]	Arg:yPos2 is [float]	Arg:zPos2 is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:breakForce is [float]	Arg:fixedRot is [BOOL]	Arg:p15 is [BOOL]	Arg:collision is [BOOL]	Arg:teleport is [BOOL]	Arg:p18 is [int]	
g_Natives.ATTACH_ENTITY_TO_ENTITY_PHYSICALLY = (entity1, entity2, boneIndex1, boneIndex2, xPos1, yPos1, zPos1, xPos2, yPos2, zPos2, xRot, yRot, zRot, breakForce, fixedRot, p15, collision, teleport, p18) => 
{
	return mp.game.invoke("0xC3675780C92F90F9", entity1, entity2, boneIndex1, boneIndex2, xPos1, yPos1, zPos1, xPos2, yPos2, zPos2, xRot, yRot, zRot, breakForce, fixedRot, p15, collision, teleport, p18);
}


// Arg:entity is [Entity]	
g_Natives.PROCESS_ENTITY_ATTACHMENTS = (entity) => 
{
	return mp.game.invoke("0xF4080490ADC51C6F", entity);
}


// Arg:entity is [Entity]	Arg:boneName is [char*]	
g_Natives.GET_ENTITY_BONE_INDEX_BY_NAME = (entity, boneName) => 
{
	return mp.game.invoke("0xFB71170B7E76ACBA", entity, boneName);
}


// Arg:entity is [Entity]	
g_Natives.CLEAR_ENTITY_LAST_DAMAGE_ENTITY = (entity) => 
{
	return mp.game.invoke("0xA72CD9CA74A5ECBA", entity);
}


// Arg:entity is [Entity*]	
g_Natives.DELETE_ENTITY = (entity) => 
{
	return mp.game.invoke("0xAE3CBE5BF394C9C9", entity);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	Arg:collision is [BOOL]	
g_Natives.DETACH_ENTITY = (entity, p1, collision) => 
{
	return mp.game.invoke("0x961AC54BF0613F5D", entity, p1, collision);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.FREEZE_ENTITY_POSITION = (entity, toggle) => 
{
	return mp.game.invoke("0x428CA6DBD1094446", entity, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives._SET_ENTITY_NOT_HAVE_ADVANCED_PHYSICS = (entity, toggle) => 
{
	return mp.game.invoke("0x3910051CCECDB00C", entity, toggle);
}


// Arg:entity is [Entity]	Arg:animName is [char*]	Arg:animDict is [char*]	Arg:p3 is [float]	Arg:loop is [BOOL]	Arg:stayInAnim is [BOOL]	Arg:p6 is [BOOL]	Arg:delta is [float]	Arg:bitset is [Any]	
g_Natives.PLAY_ENTITY_ANIM = (entity, animName, animDict, p3, loop, stayInAnim, p6, delta, bitset) => 
{
	return mp.game.invoke("0x7FB218262B810701", entity, animName, animDict, p3, loop, stayInAnim, p6, delta, bitset);
}


// Arg:entity is [Entity]	Arg:SceneID is [int]	Arg:animName is [char*]	Arg:animDict is [char*]	Arg:speed is [float]	Arg:speedMult is [float]	Arg:flag is [int]	Arg:flag2 is [float]	
g_Natives.PLAY_SYNCHRONIZED_ENTITY_ANIM = (entity, SceneID, animName, animDict, speed, speedMult, flag, flag2) => 
{
	return mp.game.invoke("0xC77720A12FE14A86", entity, SceneID, animName, animDict, speed, speedMult, flag, flag2);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:radius is [float]	Arg:prop is [Object]	Arg:sceneID is [int]	Arg:animName is [char*]	Arg:animDict is [char*]	Arg:playbackRate is [float]	Arg:unkFlag is [float]	Arg:unkBool is [BOOL]	Arg:unkFlag2 is [float]	
g_Natives.PLAY_SYNCHRONIZED_MAP_ENTITY_ANIM = (posX, posY, posZ, radius, prop, sceneID, animName, animDict, playbackRate, unkFlag, unkBool, unkFlag2) => 
{
	return mp.game.invoke("0xB9C54555ED30FBC4", posX, posY, posZ, radius, prop, sceneID, animName, animDict, playbackRate, unkFlag, unkBool, unkFlag2);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:radius is [float]	Arg:object is [Object]	Arg:playbackRate is [float]	
g_Natives.STOP_SYNCHRONIZED_MAP_ENTITY_ANIM = (posX, posY, posZ, radius, object, playbackRate) => 
{
	return mp.game.invoke("0x11E79CAB7183B6F5", posX, posY, posZ, radius, object, playbackRate);
}


// Arg:entity is [Entity]	Arg:animation is [char*]	Arg:animGroup is [char*]	Arg:p3 is [float]	
g_Natives.STOP_ENTITY_ANIM = (entity, animation, animGroup, p3) => 
{
	return mp.game.invoke("0x28004F88151E03E0", entity, animation, animGroup, p3);
}


// Arg:entity is [Entity]	Arg:p1 is [float]	Arg:p2 is [BOOL]	
g_Natives.STOP_SYNCHRONIZED_ENTITY_ANIM = (entity, p1, p2) => 
{
	return mp.game.invoke("0x43D3807C077261E3", entity, p1, p2);
}


// Arg:entity is [Entity]	Arg:actionHash is [Hash]	
g_Natives.HAS_ANIM_EVENT_FIRED = (entity, actionHash) => 
{
	return mp.game.invoke("0xEAF4CD9EA3E7E922", entity, actionHash);
}


// Arg:animDictionary is [char*]	Arg:animName is [char*]	Arg:p2 is [char*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives.FIND_ANIM_EVENT_PHASE = (animDictionary, animName, p2, p3, p4) => 
{
	return mp.game.invoke("0x07F1BE2BCCAA27A7", animDictionary, animName, p2, p3, p4);
}


// Arg:entity is [Entity]	Arg:animDictionary is [char*]	Arg:animName is [char*]	Arg:time is [float]	
g_Natives.SET_ENTITY_ANIM_CURRENT_TIME = (entity, animDictionary, animName, time) => 
{
	return mp.game.invoke("0x4487C259F0F70977", entity, animDictionary, animName, time);
}


// Arg:entity is [Entity]	Arg:animDictionary is [char*]	Arg:animName is [char*]	Arg:speedMultiplier is [float]	
g_Natives.SET_ENTITY_ANIM_SPEED = (entity, animDictionary, animName, speedMultiplier) => 
{
	return mp.game.invoke("0x28D1A16553C51776", entity, animDictionary, animName, speedMultiplier);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_ENTITY_AS_MISSION_ENTITY = (entity, p1, p2) => 
{
	return mp.game.invoke("0xAD738C3085FE7E11", entity, p1, p2);
}


// Arg:entity is [Entity*]	
g_Natives.SET_ENTITY_AS_NO_LONGER_NEEDED = (entity) => 
{
	return mp.game.invoke("0xB736A491E64A32CF", entity);
}


// Arg:ped is [Ped*]	
g_Natives.SET_PED_AS_NO_LONGER_NEEDED = (ped) => 
{
	return mp.game.invoke("0x2595DD4236549CE3", ped);
}


// Arg:vehicle is [Vehicle*]	
g_Natives.SET_VEHICLE_AS_NO_LONGER_NEEDED = (vehicle) => 
{
	return mp.game.invoke("0x629BFA74418D6239", vehicle);
}


// Arg:object is [Object*]	
g_Natives.SET_OBJECT_AS_NO_LONGER_NEEDED = (object) => 
{
	return mp.game.invoke("0x3AE22DEB5BA5A3E6", object);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_CAN_BE_DAMAGED = (entity, toggle) => 
{
	return mp.game.invoke("0x1760FFA8AB074D66", entity, toggle);
}


// Arg:entity is [Entity]	Arg:bCanBeDamaged is [BOOL]	Arg:relGroup is [int]	
g_Natives.SET_ENTITY_CAN_BE_DAMAGED_BY_RELATIONSHIP_GROUP = (entity, bCanBeDamaged, relGroup) => 
{
	return mp.game.invoke("0xE22D8FDE858B8119", entity, bCanBeDamaged, relGroup);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_CAN_BE_TARGETED_WITHOUT_LOS = (entity, toggle) => 
{
	return mp.game.invoke("0xD3997889736FD899", entity, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	Arg:keepPhysics is [BOOL]	
g_Natives.SET_ENTITY_COLLISION = (entity, toggle, keepPhysics) => 
{
	return mp.game.invoke("0x1A9205C1B9EE827F", entity, toggle, keepPhysics);
}


// Arg:entity is [Entity]	
g_Natives._GET_ENTITY_COLLISON_DISABLED = (entity) => 
{
	return mp.game.invoke("0xCCF1E97BEFDAE480", entity);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives._SET_ENTITY_COMPLETELY_DISABLE_COLLISION = (entity, p1, p2) => 
{
	return mp.game.invoke("0x9EBC85ED0FFFE51C", entity, p1, p2);
}


// Arg:entity is [Entity]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	Arg:clearArea is [BOOL]	
g_Natives.SET_ENTITY_COORDS = (entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea) => 
{
	return mp.game.invoke("0x06843DA7060A026B", entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea);
}


// Arg:entity is [Entity]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	Arg:clearArea is [BOOL]	
g_Natives._SET_ENTITY_COORDS_2 = (entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea) => 
{
	return mp.game.invoke("0x621873ECE1178967", entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea);
}


// Arg:entity is [Entity]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.SET_ENTITY_COORDS_NO_OFFSET = (entity, xPos, yPos, zPos, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0x239A3351AC1DA385", entity, xPos, yPos, zPos, xAxis, yAxis, zAxis);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_DYNAMIC = (entity, toggle) => 
{
	return mp.game.invoke("0x1718DE8E3F2823CA", entity, toggle);
}


// Arg:entity is [Entity]	Arg:heading is [float]	
g_Natives.SET_ENTITY_HEADING = (entity, heading) => 
{
	return mp.game.invoke("0x8E2530AA8ADA980E", entity, heading);
}


// Arg:entity is [Entity]	Arg:health is [int]	
g_Natives.SET_ENTITY_HEALTH = (entity, health) => 
{
	return mp.game.invoke("0x6B76DC1F3AE6E6A3", entity, health);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_INVINCIBLE = (entity, toggle) => 
{
	return mp.game.invoke("0x3882114BDE571AD4", entity, toggle);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	Arg:p2 is [float]	
g_Natives.SET_ENTITY_IS_TARGET_PRIORITY = (entity, p1, p2) => 
{
	return mp.game.invoke("0xEA02E132F5C68722", entity, p1, p2);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_LIGHTS = (entity, toggle) => 
{
	return mp.game.invoke("0x7CFBA6A80BDF3874", entity, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_LOAD_COLLISION_FLAG = (entity, toggle) => 
{
	return mp.game.invoke("0x0DC7CABAB1E9B67E", entity, toggle);
}


// Arg:entity is [Entity]	
g_Natives.HAS_COLLISION_LOADED_AROUND_ENTITY = (entity) => 
{
	return mp.game.invoke("0xE9676F61BC0B3321", entity);
}


// Arg:entity is [Entity]	Arg:speed is [float]	
g_Natives.SET_ENTITY_MAX_SPEED = (entity, speed) => 
{
	return mp.game.invoke("0x0E46A3FCBDE2A1B1", entity, speed);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_ONLY_DAMAGED_BY_PLAYER = (entity, toggle) => 
{
	return mp.game.invoke("0x79F020FF9EDC0748", entity, toggle);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	Arg:relationshipHash is [Hash]	
g_Natives.SET_ENTITY_ONLY_DAMAGED_BY_RELATIONSHIP_GROUP = (entity, p1, relationshipHash) => 
{
	return mp.game.invoke("0x7022BD828FA0B082", entity, p1, relationshipHash);
}


// Arg:entity is [Entity]	Arg:bulletProof is [BOOL]	Arg:fireProof is [BOOL]	Arg:explosionProof is [BOOL]	Arg:collisionProof is [BOOL]	Arg:meleeProof is [BOOL]	Arg:steamProof is [BOOL]	Arg:smokeProof is [BOOL]	Arg:drownProof is [BOOL]	
g_Natives.SET_ENTITY_PROOFS = (entity, bulletProof, fireProof, explosionProof, collisionProof, meleeProof, steamProof, smokeProof, drownProof) => 
{
	return mp.game.invoke("0xFAEE099C6F890BB8", entity, bulletProof, fireProof, explosionProof, collisionProof, meleeProof, steamProof, smokeProof, drownProof);
}


// Arg:entity is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:w is [float]	
g_Natives.SET_ENTITY_QUATERNION = (entity, x, y, z, w) => 
{
	return mp.game.invoke("0x77B21BE7AC540F07", entity, x, y, z, w);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_RECORDS_COLLISIONS = (entity, toggle) => 
{
	return mp.game.invoke("0x0A50A1EEDAD01E65", entity, toggle);
}


// Arg:entity is [Entity]	Arg:pitch is [float]	Arg:roll is [float]	Arg:yaw is [float]	Arg:rotationOrder is [int]	Arg:p5 is [BOOL]	
g_Natives.SET_ENTITY_ROTATION = (entity, pitch, roll, yaw, rotationOrder, p5) => 
{
	return mp.game.invoke("0x8524A8B0171D5E07", entity, pitch, roll, yaw, rotationOrder, p5);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	Arg:unk is [BOOL]	
g_Natives.SET_ENTITY_VISIBLE = (entity, toggle, unk) => 
{
	return mp.game.invoke("0xEA1C610A04DB6BBB", entity, toggle, unk);
}


// Arg:entity is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_ENTITY_VELOCITY = (entity, x, y, z) => 
{
	return mp.game.invoke("0x1C99BB7B6E96D16F", entity, x, y, z);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_HAS_GRAVITY = (entity, toggle) => 
{
	return mp.game.invoke("0x4A4722448F18EEF5", entity, toggle);
}


// Arg:entity is [Entity]	Arg:value is [int]	
g_Natives.SET_ENTITY_LOD_DIST = (entity, value) => 
{
	return mp.game.invoke("0x5927F96A78577363", entity, value);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_LOD_DIST = (entity) => 
{
	return mp.game.invoke("0x4159C2762B5791D6", entity);
}


// Arg:entity is [Entity]	Arg:alphaLevel is [int]	Arg:unk is [BOOL]	
g_Natives.SET_ENTITY_ALPHA = (entity, alphaLevel, unk) => 
{
	return mp.game.invoke("0x44A0870B7E92D7C0", entity, alphaLevel, unk);
}


// Arg:entity is [Entity]	
g_Natives.GET_ENTITY_ALPHA = (entity) => 
{
	return mp.game.invoke("0x5A47B3B5E63E94C6", entity);
}


// Arg:entity is [Entity]	
g_Natives.RESET_ENTITY_ALPHA = (entity) => 
{
	return mp.game.invoke("0x9B1E824FFBB7027A", entity);
}


// Arg:entity is [Entity]	Arg:p1 is [float]	
g_Natives["0x5C3B791D580E0BC2"] = (entity, p1) => 
{
	return mp.game.invoke("0x5C3B791D580E0BC2", entity, p1);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_ALWAYS_PRERENDER = (entity, toggle) => 
{
	return mp.game.invoke("0xACAD101E1FB66689", entity, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_RENDER_SCORCHED = (entity, toggle) => 
{
	return mp.game.invoke("0x730F5F8D3F0F2050", entity, toggle);
}


// Arg:entity is [Entity]	Arg:state is [int]	
g_Natives.SET_ENTITY_TRAFFICLIGHT_OVERRIDE = (entity, state) => 
{
	return mp.game.invoke("0x57C5DB656185EAC4", entity, state);
}


// Arg:entity is [Entity]	
g_Natives["0x78E8E3A640178255"] = (entity) => 
{
	return mp.game.invoke("0x78E8E3A640178255", entity);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:originalModel is [Hash]	Arg:newModel is [Hash]	Arg:p6 is [BOOL]	
g_Natives.CREATE_MODEL_SWAP = (x, y, z, radius, originalModel, newModel, p6) => 
{
	return mp.game.invoke("0x92C47782FDA8B2A3", x, y, z, radius, originalModel, newModel, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:originalModel is [Hash]	Arg:newModel is [Hash]	Arg:p6 is [BOOL]	
g_Natives.REMOVE_MODEL_SWAP = (x, y, z, radius, originalModel, newModel, p6) => 
{
	return mp.game.invoke("0x033C0F9A64E229AE", x, y, z, radius, originalModel, newModel, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:model is [Hash]	Arg:p5 is [BOOL]	
g_Natives.CREATE_MODEL_HIDE = (x, y, z, radius, model, p5) => 
{
	return mp.game.invoke("0x8A97BCA30A0CE478", x, y, z, radius, model, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:model is [Hash]	Arg:p5 is [BOOL]	
g_Natives.CREATE_MODEL_HIDE_EXCLUDING_SCRIPT_OBJECTS = (x, y, z, radius, model, p5) => 
{
	return mp.game.invoke("0x3A52AE588830BF7F", x, y, z, radius, model, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:model is [Hash]	Arg:p5 is [BOOL]	
g_Natives.REMOVE_MODEL_HIDE = (x, y, z, radius, model, p5) => 
{
	return mp.game.invoke("0xD9E3006FB3CBD765", x, y, z, radius, model, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [Any]	Arg:modelHash is [Hash]	Arg:p5 is [BOOL]	
g_Natives.CREATE_FORCED_OBJECT = (x, y, z, p3, modelHash, p5) => 
{
	return mp.game.invoke("0x150E808B375A385A", x, y, z, p3, modelHash, p5);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:unk is [float]	Arg:modelHash is [Hash]	
g_Natives.REMOVE_FORCED_OBJECT = (posX, posY, posZ, unk, modelHash) => 
{
	return mp.game.invoke("0x61B6775E83C0DB6F", posX, posY, posZ, unk, modelHash);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:unknown is [BOOL]	
g_Natives.SET_ENTITY_NO_COLLISION_ENTITY = (entity1, entity2, unknown) => 
{
	return mp.game.invoke("0xA53ED5520C07654A", entity1, entity2, unknown);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_MOTION_BLUR = (entity, toggle) => 
{
	return mp.game.invoke("0x295D82A8559F9150", entity, toggle);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	
g_Natives["0xE12ABE5E3A389A6C"] = (entity, p1) => 
{
	return mp.game.invoke("0xE12ABE5E3A389A6C", entity, p1);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	
g_Natives["0xA80AE305E0A3044F"] = (entity, p1) => 
{
	return mp.game.invoke("0xA80AE305E0A3044F", entity, p1);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	
g_Natives["0xDC6F8601FAF2E893"] = (entity, p1) => 
{
	return mp.game.invoke("0xDC6F8601FAF2E893", entity, p1);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	
g_Natives["0x2C2E3DC128F44309"] = (entity, p1) => 
{
	return mp.game.invoke("0x2C2E3DC128F44309", entity, p1);
}


// Arg:entity is [Entity]	Arg:p1 is [BOOL]	
g_Natives["0x1A092BB0C3808B96"] = (entity, p1) => 
{
	return mp.game.invoke("0x1A092BB0C3808B96", entity, p1);
}


// Arg:pedType is [int]	Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	
g_Natives.CREATE_PED = (pedType, modelHash, x, y, z, heading, isNetwork, thisScriptCheck) => 
{
	return mp.game.invoke("0xD49F9B0955C367DE", pedType, modelHash, x, y, z, heading, isNetwork, thisScriptCheck);
}


// Arg:ped is [Ped*]	
g_Natives.DELETE_PED = (ped) => 
{
	return mp.game.invoke("0x9614299DCB53E54B", ped);
}


// Arg:ped is [Ped]	Arg:heading is [float]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	
g_Natives.CLONE_PED = (ped, heading, isNetwork, thisScriptCheck) => 
{
	return mp.game.invoke("0xEF29A16337FACADB", ped, heading, isNetwork, thisScriptCheck);
}


// Arg:ped is [Ped]	Arg:targetPed is [Ped]	
g_Natives.CLONE_PED_TO_TARGET = (ped, targetPed) => 
{
	return mp.game.invoke("0xE952D6431689AD9A", ped, targetPed);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:atGetIn is [BOOL]	
g_Natives.IS_PED_IN_VEHICLE = (ped, vehicle, atGetIn) => 
{
	return mp.game.invoke("0xA3EE4A07279BB9DB", ped, vehicle, atGetIn);
}


// Arg:ped is [Ped]	Arg:modelHash is [Hash]	
g_Natives.IS_PED_IN_MODEL = (ped, modelHash) => 
{
	return mp.game.invoke("0x796D90EFB19AA332", ped, modelHash);
}


// Arg:ped is [Ped]	Arg:atGetIn is [BOOL]	
g_Natives.IS_PED_IN_ANY_VEHICLE = (ped, atGetIn) => 
{
	return mp.game.invoke("0x997ABD671D25CA0B", ped, atGetIn);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.IS_COP_PED_IN_AREA_3D = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0x16EC4839969F9F5E", x1, y1, z1, x2, y2, z2);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_INJURED = (ped) => 
{
	return mp.game.invoke("0x84A2DD9AC37C35C1", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_HURT = (ped) => 
{
	return mp.game.invoke("0x5983BB449D7FDB12", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_FATALLY_INJURED = (ped) => 
{
	return mp.game.invoke("0xD839450756ED5A80", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.IS_PED_DEAD_OR_DYING = (ped, p1) => 
{
	return mp.game.invoke("0x3317DEDB88C95038", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.IS_CONVERSATION_PED_DEAD = (ped) => 
{
	return mp.game.invoke("0xE0A0AEC214B1FABA", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_AIMING_FROM_COVER = (ped) => 
{
	return mp.game.invoke("0x3998B1276A3300E5", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RELOADING = (ped) => 
{
	return mp.game.invoke("0x24B100C68C645951", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_A_PLAYER = (ped) => 
{
	return mp.game.invoke("0x12534C348C6CB68B", ped);
}


// Arg:vehicle is [Ped]	Arg:pedType is [int]	Arg:modelHash is [Hash]	Arg:seat is [int]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	
g_Natives.CREATE_PED_INSIDE_VEHICLE = (vehicle, pedType, modelHash, seat, isNetwork, thisScriptCheck) => 
{
	return mp.game.invoke("0x7DD959874C1FD534", vehicle, pedType, modelHash, seat, isNetwork, thisScriptCheck);
}


// Arg:ped is [Ped]	Arg:heading is [float]	
g_Natives.SET_PED_DESIRED_HEADING = (ped, heading) => 
{
	return mp.game.invoke("0xAA5A7ECE2AA8FE70", ped, heading);
}


// Arg:ped is [Ped]	
g_Natives._FREEZE_PED_CAMERA_ROTATION = (ped) => 
{
	return mp.game.invoke("0xFF287323B0E2C69A", ped);
}


// Arg:ped is [Ped]	Arg:otherPed is [Ped]	Arg:angle is [float]	
g_Natives.IS_PED_FACING_PED = (ped, otherPed, angle) => 
{
	return mp.game.invoke("0xD71649DB0A545AA3", ped, otherPed, angle);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_MELEE_COMBAT = (ped) => 
{
	return mp.game.invoke("0x4E209B2C1EAD5159", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_STOPPED = (ped) => 
{
	return mp.game.invoke("0x530944F6F4B8A214", ped);
}


// Arg:ped is [Ped]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	
g_Natives.IS_PED_SHOOTING_IN_AREA = (ped, x1, y1, z1, x2, y2, z2, p7, p8) => 
{
	return mp.game.invoke("0x7E9DFE24AC1E58EF", ped, x1, y1, z1, x2, y2, z2, p7, p8);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.IS_ANY_PED_SHOOTING_IN_AREA = (x1, y1, z1, x2, y2, z2, p6, p7) => 
{
	return mp.game.invoke("0xA0D3D71EA1086C55", x1, y1, z1, x2, y2, z2, p6, p7);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_SHOOTING = (ped) => 
{
	return mp.game.invoke("0x34616828CD07F1A1", ped);
}


// Arg:ped is [Ped]	Arg:accuracy is [int]	
g_Natives.SET_PED_ACCURACY = (ped, accuracy) => 
{
	return mp.game.invoke("0x7AEFB85C1D49DEB6", ped, accuracy);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_ACCURACY = (ped) => 
{
	return mp.game.invoke("0x37F4AD56ECBC0CD6", ped);
}


// Arg:ped is [Ped]	Arg:modelHash is [Hash]	
g_Natives.IS_PED_MODEL = (ped, modelHash) => 
{
	return mp.game.invoke("0xC9D55B1A358A5BF7", ped, modelHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	
g_Natives.EXPLODE_PED_HEAD = (ped, weaponHash) => 
{
	return mp.game.invoke("0x2D05CED3A38D0F3A", ped, weaponHash);
}


// Arg:ped is [Ped*]	
g_Natives.REMOVE_PED_ELEGANTLY = (ped) => 
{
	return mp.game.invoke("0xAC6D445B994DF95E", ped);
}


// Arg:ped is [Ped]	Arg:amount is [int]	
g_Natives.ADD_ARMOUR_TO_PED = (ped, amount) => 
{
	return mp.game.invoke("0x5BA652A0CD14DF2F", ped, amount);
}


// Arg:ped is [Ped]	Arg:amount is [int]	
g_Natives.SET_PED_ARMOUR = (ped, amount) => 
{
	return mp.game.invoke("0xCEA04D83135264CC", ped, amount);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:seatIndex is [int]	
g_Natives.SET_PED_INTO_VEHICLE = (ped, vehicle, seatIndex) => 
{
	return mp.game.invoke("0xF75B0D629E1C063D", ped, vehicle, seatIndex);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_ALLOW_VEHICLES_OVERRIDE = (ped, toggle) => 
{
	return mp.game.invoke("0x3C028C636A414ED9", ped, toggle);
}


// Arg:unk is [BOOL]	
g_Natives.CAN_CREATE_RANDOM_PED = (unk) => 
{
	return mp.game.invoke("0x3E8349C08E4B82E4", unk);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.CREATE_RANDOM_PED = (posX, posY, posZ) => 
{
	return mp.game.invoke("0xB4AC7D0CF06BFE8F", posX, posY, posZ);
}


// Arg:vehicle is [Vehicle]	Arg:returnHandle is [BOOL]	
g_Natives.CREATE_RANDOM_PED_AS_DRIVER = (vehicle, returnHandle) => 
{
	return mp.game.invoke("0x9B62392B474F44A0", vehicle, returnHandle);
}

g_Natives.CAN_CREATE_RANDOM_DRIVER = () => 
{
	return mp.game.invoke("0xB8EB95E5B4E56978");
}

g_Natives.CAN_CREATE_RANDOM_BIKE_RIDER = () => 
{
	return mp.game.invoke("0xEACEEDA81751915C");
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_MOVE_ANIMS_BLEND_OUT = (ped) => 
{
	return mp.game.invoke("0x9E8C908F41584ECD", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_DRAGGED_OUT = (ped, toggle) => 
{
	return mp.game.invoke("0xC1670E958EEE24E5", ped, toggle);
}


// Arg:toggle is [BOOL]	
g_Natives._FAIL_MISSION = (toggle) => 
{
	return mp.game.invoke("0xF2BEBCDFAFDAA19E", toggle);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_MALE = (ped) => 
{
	return mp.game.invoke("0x6D9F5FAA7488BA46", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_HUMAN = (ped) => 
{
	return mp.game.invoke("0xB980061DA992779D", ped);
}


// Arg:ped is [Ped]	Arg:lastVehicle is [BOOL]	
g_Natives.GET_VEHICLE_PED_IS_IN = (ped, lastVehicle) => 
{
	return mp.game.invoke("0x9A9112A0FE9A4713", ped, lastVehicle);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_LAST_VEHICLE = (ped) => 
{
	return mp.game.invoke("0xBB8DE8CF6A8DD8BB", ped);
}


// Arg:multiplier is [float]	
g_Natives.SET_PED_DENSITY_MULTIPLIER_THIS_FRAME = (multiplier) => 
{
	return mp.game.invoke("0x95E3D6257B166CF2", multiplier);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives.SET_SCENARIO_PED_DENSITY_MULTIPLIER_THIS_FRAME = (p0, p1) => 
{
	return mp.game.invoke("0x7A556143A1C03898", p0, p1);
}

g_Natives["0x5A7F62FDA59759BD"] = () => 
{
	return mp.game.invoke("0x5A7F62FDA59759BD");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_SCRIPTED_CONVERSION_COORD_THIS_FRAME = (x, y, z) => 
{
	return mp.game.invoke("0x5086C7843552CF85", x, y, z);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.SET_PED_NON_CREATION_AREA = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xEE01041D559983EA", x1, y1, z1, x2, y2, z2);
}

g_Natives.CLEAR_PED_NON_CREATION_AREA = () => 
{
	return mp.game.invoke("0x2E05208086BA0651");
}

g_Natives["0x4759CC730F947C81"] = () => 
{
	return mp.game.invoke("0x4759CC730F947C81");
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_ON_MOUNT = (ped) => 
{
	return mp.game.invoke("0x460BC76A0E10655E", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_MOUNT = (ped) => 
{
	return mp.game.invoke("0xE7E11B8DCBED1058", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_ON_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x67722AEB798E5FAB", ped);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	
g_Natives.IS_PED_ON_SPECIFIC_VEHICLE = (ped, vehicle) => 
{
	return mp.game.invoke("0xEC5F66E459AF3BB2", ped, vehicle);
}


// Arg:ped is [Ped]	Arg:amount is [int]	
g_Natives.SET_PED_MONEY = (ped, amount) => 
{
	return mp.game.invoke("0xA9C8960E8684C1B5", ped, amount);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_MONEY = (ped) => 
{
	return mp.game.invoke("0x3F69145BBA87BAE7", ped);
}


// Arg:p0 is [float]	Arg:p1 is [Any]	
g_Natives["0xFF4803BC019852D9"] = (p0, p1) => 
{
	return mp.game.invoke("0xFF4803BC019852D9", p0, p1);
}


// Arg:p0 is [BOOL]	
g_Natives["0x6B0E6172C9A4D902"] = (p0) => 
{
	return mp.game.invoke("0x6B0E6172C9A4D902", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x9911F4A24485F653"] = (p0) => 
{
	return mp.game.invoke("0x9911F4A24485F653", p0);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_SUFFERS_CRITICAL_HITS = (ped, toggle) => 
{
	return mp.game.invoke("0xEBD76F2359F190AC", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives["0xAFC976FD0580C7B3"] = (ped, toggle) => 
{
	return mp.game.invoke("0xAFC976FD0580C7B3", ped, toggle);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	
g_Natives.IS_PED_SITTING_IN_VEHICLE = (ped, vehicle) => 
{
	return mp.game.invoke("0xA808AA1D79230FC2", ped, vehicle);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_SITTING_IN_ANY_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x826AA586EDB9FEF8", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_ON_FOOT = (ped) => 
{
	return mp.game.invoke("0x01FEE67DB37F59B2", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_ON_ANY_BIKE = (ped) => 
{
	return mp.game.invoke("0x94495889E22C6479", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_PLANTING_BOMB = (ped) => 
{
	return mp.game.invoke("0xC70B5FAE151982D8", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives.GET_DEAD_PED_PICKUP_COORDS = (ped, p1, p2) => 
{
	return mp.game.invoke("0xCD5003B097200F36", ped, p1, p2);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_BOAT = (ped) => 
{
	return mp.game.invoke("0x2E0E1C2B4F6CB339", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_SUB = (ped) => 
{
	return mp.game.invoke("0xFBFC01CCFB35D99E", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_HELI = (ped) => 
{
	return mp.game.invoke("0x298B91AE825E5705", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_PLANE = (ped) => 
{
	return mp.game.invoke("0x5FFF4CFC74D8FB80", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_FLYING_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x9134873537FA419C", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DIES_IN_WATER = (ped, toggle) => 
{
	return mp.game.invoke("0x56CEF0AC79073BDE", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DIES_IN_SINKING_VEHICLE = (ped, toggle) => 
{
	return mp.game.invoke("0xD718A22995E2B4BC", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_ARMOUR = (ped) => 
{
	return mp.game.invoke("0x9483AF821605B1D8", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_STAY_IN_VEHICLE_WHEN_JACKED = (ped, toggle) => 
{
	return mp.game.invoke("0xEDF4079F9D54C9A1", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_SHOT_IN_VEHICLE = (ped, toggle) => 
{
	return mp.game.invoke("0xC7EF1BA83230BA07", ped, toggle);
}


// Arg:ped is [Ped]	Arg:outBone is [int*]	
g_Natives.GET_PED_LAST_DAMAGE_BONE = (ped, outBone) => 
{
	return mp.game.invoke("0xD75960F6BD9EA49C", ped, outBone);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_LAST_DAMAGE_BONE = (ped) => 
{
	return mp.game.invoke("0x8EF6B7AC68E2F01B", ped);
}


// Arg:value is [float]	
g_Natives.SET_AI_WEAPON_DAMAGE_MODIFIER = (value) => 
{
	return mp.game.invoke("0x1B1E2A40A65B8521", value);
}

g_Natives.RESET_AI_WEAPON_DAMAGE_MODIFIER = () => 
{
	return mp.game.invoke("0xEA16670E7BA4743C");
}


// Arg:modifier is [float]	
g_Natives.SET_AI_MELEE_WEAPON_DAMAGE_MODIFIER = (modifier) => 
{
	return mp.game.invoke("0x66460DEDDD417254", modifier);
}

g_Natives.RESET_AI_MELEE_WEAPON_DAMAGE_MODIFIER = () => 
{
	return mp.game.invoke("0x46E56A7CD1D63C3F");
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x2F3C3D9F50681DE4"] = (p0, p1) => 
{
	return mp.game.invoke("0x2F3C3D9F50681DE4", p0, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_TARGETTED = (ped, toggle) => 
{
	return mp.game.invoke("0x63F58F7C80513AAD", ped, toggle);
}


// Arg:ped is [Ped]	Arg:team is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_TARGETTED_BY_TEAM = (ped, team, toggle) => 
{
	return mp.game.invoke("0xBF1CA77833E58F2C", ped, team, toggle);
}


// Arg:ped is [Ped]	Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_TARGETTED_BY_PLAYER = (ped, player, toggle) => 
{
	return mp.game.invoke("0x66B57B72E0836A76", ped, player, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x061CB768363D6424"] = (p0, p1) => 
{
	return mp.game.invoke("0x061CB768363D6424", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives.SET_TIME_EXCLUSIVE_DISPLAY_TEXTURE = (p0, p1) => 
{
	return mp.game.invoke("0xFD325494792302D7", p0, p1);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_POLICE_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x0BD04E29640C9C12", ped);
}


// Arg:ped is [Ped]	
g_Natives.FORCE_PED_TO_OPEN_PARACHUTE = (ped) => 
{
	return mp.game.invoke("0x16E42E800B472221", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_PARACHUTE_FREE_FALL = (ped) => 
{
	return mp.game.invoke("0x7DCE8BDA0F1C1200", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_FALLING = (ped) => 
{
	return mp.game.invoke("0xFB92A102F1C4DFA3", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_JUMPING = (ped) => 
{
	return mp.game.invoke("0xCEDABC5900A0BF97", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_CLIMBING = (ped) => 
{
	return mp.game.invoke("0x53E8CB4F48BFE623", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_VAULTING = (ped) => 
{
	return mp.game.invoke("0x117C70D1F5730B5E", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_DIVING = (ped) => 
{
	return mp.game.invoke("0x5527B8246FEF9B11", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_JUMPING_OUT_OF_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x433DDFFE2044B636", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x26AF0E8E30BD2A2C"] = (ped) => 
{
	return mp.game.invoke("0x26AF0E8E30BD2A2C", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_PARACHUTE_STATE = (ped) => 
{
	return mp.game.invoke("0x79CFD9827CC979B6", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_PARACHUTE_LANDING_TYPE = (ped) => 
{
	return mp.game.invoke("0x8B9F1FC6AE8166C0", ped);
}


// Arg:ped is [Ped]	Arg:tintIndex is [int]	
g_Natives.SET_PED_PARACHUTE_TINT_INDEX = (ped, tintIndex) => 
{
	return mp.game.invoke("0x333FC8DB079B7186", ped, tintIndex);
}


// Arg:ped is [Ped]	Arg:outTintIndex is [int*]	
g_Natives.GET_PED_PARACHUTE_TINT_INDEX = (ped, outTintIndex) => 
{
	return mp.game.invoke("0xEAF5F7E5AE7C6C9D", ped, outTintIndex);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	
g_Natives.SET_PED_RESERVE_PARACHUTE_TINT_INDEX = (ped, p1) => 
{
	return mp.game.invoke("0xE88DA0751C22A2AD", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x8C4F3BF23B6237DB"] = (ped, p1, p2) => 
{
	return mp.game.invoke("0x8C4F3BF23B6237DB", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DUCKING = (ped, toggle) => 
{
	return mp.game.invoke("0x030983CA930B692D", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_DUCKING = (ped) => 
{
	return mp.game.invoke("0xD125AE748725C6BC", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_TAXI = (ped) => 
{
	return mp.game.invoke("0x6E575D6A898AB852", ped);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_ID_RANGE = (ped, value) => 
{
	return mp.game.invoke("0xF107E836A70DCE05", ped, value);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x52D59AB61DDC05DD"] = (ped, p1) => 
{
	return mp.game.invoke("0x52D59AB61DDC05DD", ped, p1);
}


// Arg:ped is [Ped]	Arg:unk is [float]	
g_Natives._SET_PED_SHOOTING_RATE = (ped, unk) => 
{
	return mp.game.invoke("0xEC4B4B3B9908052A", ped, unk);
}


// Arg:p0 is [Any]	
g_Natives["0x733C87D4CE22BEA2"] = (p0) => 
{
	return mp.game.invoke("0x733C87D4CE22BEA2", p0);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_SEEING_RANGE = (ped, value) => 
{
	return mp.game.invoke("0xF29CF591C4BF6CEE", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_HEARING_RANGE = (ped, value) => 
{
	return mp.game.invoke("0x33A8F7F7D5F7F33C", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_VISUAL_FIELD_MIN_ANGLE = (ped, value) => 
{
	return mp.game.invoke("0x2DB492222FB21E26", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_VISUAL_FIELD_MAX_ANGLE = (ped, value) => 
{
	return mp.game.invoke("0x70793BDCA1E854D4", ped, value);
}


// Arg:ped is [Ped]	Arg:angle is [float]	
g_Natives.SET_PED_VISUAL_FIELD_MIN_ELEVATION_ANGLE = (ped, angle) => 
{
	return mp.game.invoke("0x7A276EB2C224D70F", ped, angle);
}


// Arg:ped is [Ped]	Arg:angle is [float]	
g_Natives.SET_PED_VISUAL_FIELD_MAX_ELEVATION_ANGLE = (ped, angle) => 
{
	return mp.game.invoke("0x78D0B67629D75856", ped, angle);
}


// Arg:ped is [Ped]	Arg:range is [float]	
g_Natives.SET_PED_VISUAL_FIELD_PERIPHERAL_RANGE = (ped, range) => 
{
	return mp.game.invoke("0x9C74B0BC831B753A", ped, range);
}


// Arg:ped is [Ped]	Arg:angle is [float]	
g_Natives.SET_PED_VISUAL_FIELD_CENTER_ANGLE = (ped, angle) => 
{
	return mp.game.invoke("0x3B6405E8AB34A907", ped, angle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:action is [char*]	
g_Natives.SET_PED_STEALTH_MOVEMENT = (ped, p1, action) => 
{
	return mp.game.invoke("0x88CBB5CEB96B7BD2", ped, p1, action);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_STEALTH_MOVEMENT = (ped) => 
{
	return mp.game.invoke("0x7C2AC9CA66575FBF", ped);
}


// Arg:unused is [int]	
g_Natives.CREATE_GROUP = (unused) => 
{
	return mp.game.invoke("0x90370EBE0FEE1A3D", unused);
}


// Arg:ped is [Ped]	Arg:groupId is [int]	
g_Natives.SET_PED_AS_GROUP_LEADER = (ped, groupId) => 
{
	return mp.game.invoke("0x2A7819605465FBCE", ped, groupId);
}


// Arg:ped is [Ped]	Arg:groupId is [int]	
g_Natives.SET_PED_AS_GROUP_MEMBER = (ped, groupId) => 
{
	return mp.game.invoke("0x9F3480FE65DB31B5", ped, groupId);
}


// Arg:pedHandle is [Ped]	Arg:groupHandle is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_TELEPORT_TO_GROUP_LEADER = (pedHandle, groupHandle, toggle) => 
{
	return mp.game.invoke("0x2E2F4240B3F24647", pedHandle, groupHandle, toggle);
}


// Arg:groupId is [int]	
g_Natives.REMOVE_GROUP = (groupId) => 
{
	return mp.game.invoke("0x8EB2F69076AF7053", groupId);
}


// Arg:ped is [Ped]	
g_Natives.REMOVE_PED_FROM_GROUP = (ped) => 
{
	return mp.game.invoke("0xED74007FFB146BC2", ped);
}


// Arg:ped is [Ped]	Arg:groupId is [int]	
g_Natives.IS_PED_GROUP_MEMBER = (ped, groupId) => 
{
	return mp.game.invoke("0x9BB01E3834671191", ped, groupId);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_HANGING_ON_TO_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x1C86D8AEF8254B78", ped);
}


// Arg:groupHandle is [int]	Arg:separationRange is [float]	
g_Natives.SET_GROUP_SEPARATION_RANGE = (groupHandle, separationRange) => 
{
	return mp.game.invoke("0x4102C7858CFEE4E4", groupHandle, separationRange);
}


// Arg:ped is [Ped]	Arg:ms1000000 is [int]	
g_Natives.SET_PED_MIN_GROUND_TIME_FOR_STUNGUN = (ped, ms1000000) => 
{
	return mp.game.invoke("0xFA0675AB151073FA", ped, ms1000000);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_PRONE = (ped) => 
{
	return mp.game.invoke("0xD6A86331A537A7B9", ped);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	
g_Natives.IS_PED_IN_COMBAT = (ped, target) => 
{
	return mp.game.invoke("0x4859F1FC66A6278E", ped, target);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	
g_Natives.CAN_PED_IN_COMBAT_SEE_TARGET = (ped, target) => 
{
	return mp.game.invoke("0xEAD42DE3610D0721", ped, target);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_DOING_DRIVEBY = (ped) => 
{
	return mp.game.invoke("0xB2C086CC1BF8F2BF", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_JACKING = (ped) => 
{
	return mp.game.invoke("0x4AE4FF911DFB61DA", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_BEING_JACKED = (ped) => 
{
	return mp.game.invoke("0x9A497FE2DF198913", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.IS_PED_BEING_STUNNED = (ped, p1) => 
{
	return mp.game.invoke("0x4FBACCE3B4138EE8", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.GET_PEDS_JACKER = (ped) => 
{
	return mp.game.invoke("0x9B128DC36C1E04CF", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_JACK_TARGET = (ped) => 
{
	return mp.game.invoke("0x5486A79D9FBD342D", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_FLEEING = (ped) => 
{
	return mp.game.invoke("0xBBCCE00B381F8482", ped);
}


// Arg:ped is [Ped]	Arg:exceptUseWeapon is [BOOL]	
g_Natives.IS_PED_IN_COVER = (ped, exceptUseWeapon) => 
{
	return mp.game.invoke("0x60DFD0691A170B88", ped, exceptUseWeapon);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_COVER_FACING_LEFT = (ped) => 
{
	return mp.game.invoke("0x845333B3150583AB", ped);
}


// Arg:ped is [Ped]	
g_Natives._IS_PED_STANDING_IN_COVER = (ped) => 
{
	return mp.game.invoke("0x6A03BF943D767C93", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_GOING_INTO_COVER = (ped) => 
{
	return mp.game.invoke("0x9F65DBC537E59AD5", ped);
}


// Arg:player is [Ped]	Arg:pinned is [BOOL]	Arg:p2 is [int]	
g_Natives.SET_PED_PINNED_DOWN = (player, pinned, p2) => 
{
	return mp.game.invoke("0xAAD6D1ACF08F4612", player, pinned, p2);
}


// Arg:ped is [Ped]	
g_Natives.GET_SEAT_PED_IS_TRYING_TO_ENTER = (ped) => 
{
	return mp.game.invoke("0x6F4C85ACD641BCD2", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_VEHICLE_PED_IS_TRYING_TO_ENTER = (ped) => 
{
	return mp.game.invoke("0x814FA8BE5449445D", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_SOURCE_OF_DEATH = (ped) => 
{
	return mp.game.invoke("0x93C8B64DEB84728C", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_CAUSE_OF_DEATH = (ped) => 
{
	return mp.game.invoke("0x16FFE42AB2D2DC59", ped);
}


// Arg:ped is [Ped]	
g_Natives._GET_PED_TIME_OF_DEATH = (ped) => 
{
	return mp.game.invoke("0x1E98817B311AE98A", ped);
}


// Arg:p0 is [Any]	
g_Natives["0x5407B7288D0478B7"] = (p0) => 
{
	return mp.game.invoke("0x5407B7288D0478B7", p0);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	
g_Natives._IS_ENEMY_IN_RANGE = (ped, x, y, z, range) => 
{
	return mp.game.invoke("0x336B3D200AB007CB", ped, x, y, z, range);
}


// Arg:ped is [Ped]	Arg:hash is [Hash]	
g_Natives.SET_PED_RELATIONSHIP_GROUP_DEFAULT_HASH = (ped, hash) => 
{
	return mp.game.invoke("0xADB3F206518799E8", ped, hash);
}


// Arg:ped is [Ped]	Arg:hash is [Hash]	
g_Natives.SET_PED_RELATIONSHIP_GROUP_HASH = (ped, hash) => 
{
	return mp.game.invoke("0xC80A74AC829DDD92", ped, hash);
}


// Arg:relationship is [int]	Arg:group1 is [Hash]	Arg:group2 is [Hash]	
g_Natives.SET_RELATIONSHIP_BETWEEN_GROUPS = (relationship, group1, group2) => 
{
	return mp.game.invoke("0xBF25EB89375A37AD", relationship, group1, group2);
}


// Arg:relationship is [int]	Arg:group1 is [Hash]	Arg:group2 is [Hash]	
g_Natives.CLEAR_RELATIONSHIP_BETWEEN_GROUPS = (relationship, group1, group2) => 
{
	return mp.game.invoke("0x5E29243FB56FC6D4", relationship, group1, group2);
}


// Arg:name is [char*]	Arg:groupHash is [Hash*]	
g_Natives.ADD_RELATIONSHIP_GROUP = (name, groupHash) => 
{
	return mp.game.invoke("0xF372BC22FCB88606", name, groupHash);
}


// Arg:groupHash is [Hash]	
g_Natives.REMOVE_RELATIONSHIP_GROUP = (groupHash) => 
{
	return mp.game.invoke("0xB6BA2444AB393DA2", groupHash);
}


// Arg:ped1 is [Ped]	Arg:ped2 is [Ped]	
g_Natives.GET_RELATIONSHIP_BETWEEN_PEDS = (ped1, ped2) => 
{
	return mp.game.invoke("0xEBA5AD3A0EAF7121", ped1, ped2);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_RELATIONSHIP_GROUP_DEFAULT_HASH = (ped) => 
{
	return mp.game.invoke("0x42FDD0F017B1E38E", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_RELATIONSHIP_GROUP_HASH = (ped) => 
{
	return mp.game.invoke("0x7DBDD04862D95F04", ped);
}


// Arg:group1 is [Hash]	Arg:group2 is [Hash]	
g_Natives.GET_RELATIONSHIP_BETWEEN_GROUPS = (group1, group2) => 
{
	return mp.game.invoke("0x9E6B70061662AE5C", group1, group2);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_TARGETED_WITHOUT_LOS = (ped, toggle) => 
{
	return mp.game.invoke("0x4328652AE5769C71", ped, toggle);
}


// Arg:ped is [Ped]	Arg:radius is [float]	Arg:maxFriends is [int]	
g_Natives.SET_PED_TO_INFORM_RESPECTED_FRIENDS = (ped, radius, maxFriends) => 
{
	return mp.game.invoke("0x112942C6E708F70B", ped, radius, maxFriends);
}


// Arg:ped is [Ped]	Arg:event is [Any]	
g_Natives.IS_PED_RESPONDING_TO_EVENT = (ped, event) => 
{
	return mp.game.invoke("0x625B774D75C87068", ped, event);
}


// Arg:ped is [Ped]	Arg:patternHash is [Hash]	
g_Natives.SET_PED_FIRING_PATTERN = (ped, patternHash) => 
{
	return mp.game.invoke("0x9AC577F5A12AD8A9", ped, patternHash);
}


// Arg:ped is [Ped]	Arg:shootRate is [int]	
g_Natives.SET_PED_SHOOT_RATE = (ped, shootRate) => 
{
	return mp.game.invoke("0x614DA022990752DC", ped, shootRate);
}


// Arg:ped is [Ped]	Arg:combatType is [int]	Arg:p2 is [float]	
g_Natives.SET_COMBAT_FLOAT = (ped, combatType, p2) => 
{
	return mp.game.invoke("0xFF41B4B141ED981C", ped, combatType, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.GET_COMBAT_FLOAT = (ped, p1) => 
{
	return mp.game.invoke("0x52DFF8A10508090A", ped, p1);
}


// Arg:groupID is [int]	Arg:unknown is [Any*]	Arg:sizeInMembers is [int*]	
g_Natives.GET_GROUP_SIZE = (groupID, unknown, sizeInMembers) => 
{
	return mp.game.invoke("0x8DE69FE35CA09A45", groupID, unknown, sizeInMembers);
}


// Arg:groupId is [int]	
g_Natives.DOES_GROUP_EXIST = (groupId) => 
{
	return mp.game.invoke("0x7C6B0C22F9F40BBE", groupId);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_GROUP_INDEX = (ped) => 
{
	return mp.game.invoke("0xF162E133B4E7A675", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_GROUP = (ped) => 
{
	return mp.game.invoke("0x5891CAC5D4ACFF74", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PLAYER_PED_IS_FOLLOWING = (ped) => 
{
	return mp.game.invoke("0x6A3975DEA89F9A17", ped);
}


// Arg:groupId is [int]	Arg:formationType is [int]	
g_Natives.SET_GROUP_FORMATION = (groupId, formationType) => 
{
	return mp.game.invoke("0xCE2F5FC3AF7E8C1E", groupId, formationType);
}


// Arg:groupId is [int]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.SET_GROUP_FORMATION_SPACING = (groupId, p1, p2, p3) => 
{
	return mp.game.invoke("0x1D9D45004C28C916", groupId, p1, p2, p3);
}


// Arg:groupId is [int]	
g_Natives.RESET_GROUP_FORMATION_DEFAULT_SPACING = (groupId) => 
{
	return mp.game.invoke("0x63DAB4CCB3273205", groupId);
}


// Arg:ped is [Ped]	
g_Natives.GET_VEHICLE_PED_IS_USING = (ped) => 
{
	return mp.game.invoke("0x6094AD011A2EA87D", ped);
}


// Arg:ped is [Ped]	
g_Natives.SET_EXCLUSIVE_PHONE_RELATIONSHIPS = (ped) => 
{
	return mp.game.invoke("0xF92691AED837A5FC", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_GRAVITY = (ped, toggle) => 
{
	return mp.game.invoke("0x9FF447B6B6AD960A", ped, toggle);
}


// Arg:ped is [Ped]	Arg:damageAmount is [int]	Arg:armorFirst is [BOOL]	
g_Natives.APPLY_DAMAGE_TO_PED = (ped, damageAmount, armorFirst) => 
{
	return mp.game.invoke("0x697157CED63F18D4", ped, damageAmount, armorFirst);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	
g_Natives["0x36B77BB84687C318"] = (ped, p1) => 
{
	return mp.game.invoke("0x36B77BB84687C318", ped, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_ALLOWED_TO_DUCK = (ped, toggle) => 
{
	return mp.game.invoke("0xDA1F1B7BE1A8766F", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_NEVER_LEAVES_GROUP = (ped, toggle) => 
{
	return mp.game.invoke("0x3DBFC55D5C9BB447", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_TYPE = (ped) => 
{
	return mp.game.invoke("0xFF059E1E4C01E63C", ped);
}


// Arg:Player is [Ped]	Arg:True is [BOOL]	
g_Natives.SET_PED_AS_COP = (Player, True) => 
{
	return mp.game.invoke("0xBB03C38DD3FB7FFD", Player, True);
}


// Arg:ped is [Ped]	Arg:value is [int]	
g_Natives.SET_PED_MAX_HEALTH = (ped, value) => 
{
	return mp.game.invoke("0xF5F6378C4F3419D3", ped, value);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_MAX_HEALTH = (ped) => 
{
	return mp.game.invoke("0x4700A416E8324EF3", ped);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_MAX_TIME_IN_WATER = (ped, value) => 
{
	return mp.game.invoke("0x43C851690662113D", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_MAX_TIME_UNDERWATER = (ped, value) => 
{
	return mp.game.invoke("0x6BA428C528D9E522", ped, value);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives["0x2735233A786B1BEF"] = (ped, p1) => 
{
	return mp.game.invoke("0x2735233A786B1BEF", ped, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x952F06BEECD775CC"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x952F06BEECD775CC", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0xE6CA85E7259CE16B"] = (p0) => 
{
	return mp.game.invoke("0xE6CA85E7259CE16B", p0);
}


// Arg:ped is [Ped]	Arg:state is [int]	
g_Natives.SET_PED_CAN_BE_KNOCKED_OFF_VEHICLE = (ped, state) => 
{
	return mp.game.invoke("0x7A6535691B477C48", ped, state);
}


// Arg:ped is [Ped]	
g_Natives.CAN_KNOCK_PED_OFF_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x51AC07A44D4F5B8A", ped);
}


// Arg:ped is [Ped]	
g_Natives.KNOCK_PED_OFF_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x45BBCBA77C29A841", ped);
}


// Arg:ped is [Ped]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.SET_PED_COORDS_NO_GANG = (ped, posX, posY, posZ) => 
{
	return mp.game.invoke("0x87052FE446E07247", ped, posX, posY, posZ);
}


// Arg:groupID is [int]	Arg:memberNumber is [int]	
g_Natives.GET_PED_AS_GROUP_MEMBER = (groupID, memberNumber) => 
{
	return mp.game.invoke("0x51455483CF23ED97", groupID, memberNumber);
}


// Arg:groupID is [int]	
g_Natives._GET_PED_AS_GROUP_LEADER = (groupID) => 
{
	return mp.game.invoke("0x5CCE68DBD5FE93EC", groupID);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_KEEP_TASK = (ped, toggle) => 
{
	return mp.game.invoke("0x971D38760FBC02EF", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x49E50BDB8BA4DAB2"] = (ped, p1) => 
{
	return mp.game.invoke("0x49E50BDB8BA4DAB2", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_SWIMMING = (ped) => 
{
	return mp.game.invoke("0x9DE327631295B4C2", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_SWIMMING_UNDER_WATER = (ped) => 
{
	return mp.game.invoke("0xC024869A53992F34", ped);
}


// Arg:ped is [Ped]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.SET_PED_COORDS_KEEP_VEHICLE = (ped, posX, posY, posZ) => 
{
	return mp.game.invoke("0x9AFEFF481A85AB2E", ped, posX, posY, posZ);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DIES_IN_VEHICLE = (ped, toggle) => 
{
	return mp.game.invoke("0x2A30922C90C9B42C", ped, toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_CREATE_RANDOM_COPS = (toggle) => 
{
	return mp.game.invoke("0x102E68B2024D536D", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_CREATE_RANDOM_COPS_NOT_ON_SCENARIOS = (toggle) => 
{
	return mp.game.invoke("0x8A4986851C4EF6E7", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_CREATE_RANDOM_COPS_ON_SCENARIOS = (toggle) => 
{
	return mp.game.invoke("0x444CB7D7DBE6973D", toggle);
}

g_Natives.CAN_CREATE_RANDOM_COPS = () => 
{
	return mp.game.invoke("0x5EE2CAFF7F17770D");
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_AS_ENEMY = (ped, toggle) => 
{
	return mp.game.invoke("0x02A0C9720B854BFA", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_PED_CAN_SMASH_GLASS = (ped, p1, p2) => 
{
	return mp.game.invoke("0x1CCE141467FF42A2", ped, p1, p2);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_ANY_TRAIN = (ped) => 
{
	return mp.game.invoke("0x6F972C1AB75A1ED0", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_GETTING_INTO_A_VEHICLE = (ped) => 
{
	return mp.game.invoke("0xBB062B2B5722478E", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_TRYING_TO_ENTER_A_LOCKED_VEHICLE = (ped) => 
{
	return mp.game.invoke("0x44D28D5DDFE5F68C", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_ENABLE_HANDCUFFS = (ped, toggle) => 
{
	return mp.game.invoke("0xDF1AF8B5D56542FA", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_ENABLE_BOUND_ANKLES = (ped, toggle) => 
{
	return mp.game.invoke("0xC52E0F855C58FC2E", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_ENABLE_SCUBA = (ped, toggle) => 
{
	return mp.game.invoke("0xF99F62004024D506", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_CAN_ATTACK_FRIENDLY = (ped, toggle, p2) => 
{
	return mp.game.invoke("0xB3B1CB349FF9C75D", ped, toggle, p2);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_ALERTNESS = (ped) => 
{
	return mp.game.invoke("0xF6AA118530443FD2", ped);
}


// Arg:ped is [Ped]	Arg:value is [int]	
g_Natives.SET_PED_ALERTNESS = (ped, value) => 
{
	return mp.game.invoke("0xDBA71115ED9941A6", ped, value);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_GET_OUT_UPSIDE_DOWN_VEHICLE = (ped, toggle) => 
{
	return mp.game.invoke("0xBC0ED94165A48BC2", ped, toggle);
}


// Arg:player is [BOOL]	Arg:clipSet is [BOOL]	Arg:blendTime is [float]	
g_Natives.SET_PED_MOVEMENT_CLIPSET = (player, clipSet, blendTime) => 
{
	return mp.game.invoke("0xAF8A94EDE7712BEF", player, clipSet, blendTime);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives.RESET_PED_MOVEMENT_CLIPSET = (ped, p1) => 
{
	return mp.game.invoke("0xAA74EC0CB0AAEA2C", ped, p1);
}


// Arg:ped is [Ped]	Arg:clipSet is [char*]	
g_Natives.SET_PED_STRAFE_CLIPSET = (ped, clipSet) => 
{
	return mp.game.invoke("0x29A28F3F8CF6D854", ped, clipSet);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_STRAFE_CLIPSET = (ped) => 
{
	return mp.game.invoke("0x20510814175EA477", ped);
}


// Arg:ped is [Ped]	Arg:clipSet is [char*]	
g_Natives.SET_PED_WEAPON_MOVEMENT_CLIPSET = (ped, clipSet) => 
{
	return mp.game.invoke("0x2622E35B77D3ACA2", ped, clipSet);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_WEAPON_MOVEMENT_CLIPSET = (ped) => 
{
	return mp.game.invoke("0x97B0DB5B4AA74E77", ped);
}


// Arg:ped is [Ped]	Arg:clipset is [char*]	
g_Natives.SET_PED_DRIVE_BY_CLIPSET_OVERRIDE = (ped, clipset) => 
{
	return mp.game.invoke("0xED34AB6C5CB36520", ped, clipset);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_DRIVE_BY_CLIPSET_OVERRIDE = (ped) => 
{
	return mp.game.invoke("0x4AFE3690D7E0B5AC", ped);
}


// Arg:ped is [Ped]	Arg:clipset is [char*]	
g_Natives._SET_PED_COVER_CLIPSET_OVERRIDE = (ped, clipset) => 
{
	return mp.game.invoke("0x9DBA107B4937F809", ped, clipset);
}


// Arg:ped is [Ped]	
g_Natives._CLEAR_PED_COVER_CLIPSET_OVERRIDE = (ped) => 
{
	return mp.game.invoke("0xC79196DCB36F6121", ped);
}


// Arg:p0 is [Any]	
g_Natives["0x80054D7FCC70EEC6"] = (p0) => 
{
	return mp.game.invoke("0x80054D7FCC70EEC6", p0);
}


// Arg:ped is [Ped]	Arg:context is [Hash]	
g_Natives.SET_PED_IN_VEHICLE_CONTEXT = (ped, context) => 
{
	return mp.game.invoke("0x530071295899A8C6", ped, context);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_IN_VEHICLE_CONTEXT = (ped) => 
{
	return mp.game.invoke("0x22EF8FF8778030EB", ped);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:anim is [char*]	
g_Natives.IS_SCRIPTED_SCENARIO_PED_USING_CONDITIONAL_ANIM = (ped, animDict, anim) => 
{
	return mp.game.invoke("0x6EC47A344923E1ED", ped, animDict, anim);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:p3 is [float]	Arg:p4 is [BOOL]	
g_Natives.SET_PED_ALTERNATE_WALK_ANIM = (ped, animDict, animName, p3, p4) => 
{
	return mp.game.invoke("0x6C60394CB4F75E9A", ped, animDict, animName, p3, p4);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives.CLEAR_PED_ALTERNATE_WALK_ANIM = (ped, p1) => 
{
	return mp.game.invoke("0x8844BBFCE30AA9E9", ped, p1);
}


// Arg:ped is [Ped]	Arg:stance is [int]	Arg:animDictionary is [char*]	Arg:animationName is [char*]	Arg:p4 is [float]	Arg:p5 is [BOOL]	
g_Natives.SET_PED_ALTERNATE_MOVEMENT_ANIM = (ped, stance, animDictionary, animationName, p4, p5) => 
{
	return mp.game.invoke("0x90A43CC281FFAB46", ped, stance, animDictionary, animationName, p4, p5);
}


// Arg:ped is [Ped]	Arg:stance is [int]	Arg:p2 is [float]	
g_Natives.CLEAR_PED_ALTERNATE_MOVEMENT_ANIM = (ped, stance, p2) => 
{
	return mp.game.invoke("0xD8D19675ED5FBDCE", ped, stance, p2);
}


// Arg:ped is [Ped]	Arg:animGroupGesture is [char*]	
g_Natives.SET_PED_GESTURE_GROUP = (ped, animGroupGesture) => 
{
	return mp.game.invoke("0xDDF803377F94AAA8", ped, animGroupGesture);
}


// Arg:animDict is [char*]	Arg:animName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:p8 is [float]	Arg:p9 is [int]	
g_Natives.GET_ANIM_INITIAL_OFFSET_POSITION = (animDict, animName, x, y, z, xRot, yRot, zRot, p8, p9) => 
{
	return mp.game.invoke("0xBE22B26DD764C040", animDict, animName, x, y, z, xRot, yRot, zRot, p8, p9);
}


// Arg:animDict is [char*]	Arg:animName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:p8 is [float]	Arg:p9 is [int]	
g_Natives.GET_ANIM_INITIAL_OFFSET_ROTATION = (animDict, animName, x, y, z, xRot, yRot, zRot, p8, p9) => 
{
	return mp.game.invoke("0x4B805E6046EE9E47", animDict, animName, x, y, z, xRot, yRot, zRot, p8, p9);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	
g_Natives.GET_PED_DRAWABLE_VARIATION = (ped, componentId) => 
{
	return mp.game.invoke("0x67F3780DD425D4FC", ped, componentId);
}


// Arg:SC is [Ped]	Arg:sc is [int]	
g_Natives.GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS = (SC, sc) => 
{
	return mp.game.invoke("0x27561561732A7842", SC, sc);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	
g_Natives.GET_PED_TEXTURE_VARIATION = (ped, componentId) => 
{
	return mp.game.invoke("0x04A355E041E004E6", ped, componentId);
}


// Arg:mp_f_freemode_01 is [Ped]	Arg:ComponentID is [int]	Arg:DrawableID is [int]	
g_Natives.GET_NUMBER_OF_PED_TEXTURE_VARIATIONS = (mp_f_freemode_01, ComponentID, DrawableID) => 
{
	return mp.game.invoke("0x8F7156A3142A6BAD", mp_f_freemode_01, ComponentID, DrawableID);
}


// Arg:ped is [Ped]	Arg:propId is [int]	
g_Natives.GET_NUMBER_OF_PED_PROP_DRAWABLE_VARIATIONS = (ped, propId) => 
{
	return mp.game.invoke("0x5FAF9754E789FB47", ped, propId);
}


// Arg:ped is [Ped]	Arg:propId is [int]	Arg:drawableId is [int]	
g_Natives.GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS = (ped, propId, drawableId) => 
{
	return mp.game.invoke("0xA6E7F1CEB523E171", ped, propId, drawableId);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	
g_Natives.GET_PED_PALETTE_VARIATION = (ped, componentId) => 
{
	return mp.game.invoke("0xE3DD5F2A84B42281", ped, componentId);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x9E30E91FB03A2CAF"] = (p0, p1) => 
{
	return mp.game.invoke("0x9E30E91FB03A2CAF", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x1E77FA7A62EE6C4C"] = (p0) => 
{
	return mp.game.invoke("0x1E77FA7A62EE6C4C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF033419D1B81FAE8"] = (p0) => 
{
	return mp.game.invoke("0xF033419D1B81FAE8", p0);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	Arg:drawableId is [int]	Arg:textureId is [int]	
g_Natives.IS_PED_COMPONENT_VARIATION_VALID = (ped, componentId, drawableId, textureId) => 
{
	return mp.game.invoke("0xE825F6B6CEA7671D", ped, componentId, drawableId, textureId);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	Arg:drawableId is [int]	Arg:textureId is [int]	Arg:paletteId is [int]	
g_Natives.SET_PED_COMPONENT_VARIATION = (ped, componentId, drawableId, textureId, paletteId) => 
{
	return mp.game.invoke("0x262B14F48D29DE80", ped, componentId, drawableId, textureId, paletteId);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.SET_PED_RANDOM_COMPONENT_VARIATION = (ped, p1) => 
{
	return mp.game.invoke("0xC8A9481A01E63C28", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_RANDOM_PROPS = (ped) => 
{
	return mp.game.invoke("0xC44AA05345C992C6", ped);
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_DEFAULT_COMPONENT_VARIATION = (ped) => 
{
	return mp.game.invoke("0x45EEE61580806D63", ped);
}


// Arg:ped is [Ped]	Arg:father is [Ped]	Arg:mother is [Ped]	Arg:fathersSide is [float]	Arg:mothersSide is [float]	
g_Natives.SET_PED_BLEND_FROM_PARENTS = (ped, father, mother, fathersSide, mothersSide) => 
{
	return mp.game.invoke("0x137BBD05230DB22D", ped, father, mother, fathersSide, mothersSide);
}


// Arg:ped is [Ped]	Arg:shapeFirstID is [int]	Arg:shapeSecondID is [int]	Arg:shapeThirdID is [int]	Arg:skinFirstID is [int]	Arg:skinSecondID is [int]	Arg:skinThirdID is [int]	Arg:shapeMix is [float]	Arg:skinMix is [float]	Arg:thirdMix is [float]	Arg:isParent is [BOOL]	
g_Natives.SET_PED_HEAD_BLEND_DATA = (ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) => 
{
	return mp.game.invoke("0x9414E18B9434C2FE", ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent);
}


// Arg:ped is [Ped]	Arg:headBlendData is [Any*]	
g_Natives._GET_PED_HEAD_BLEND_DATA = (ped, headBlendData) => 
{
	return mp.game.invoke("0x2746BD9D88C5C5D0", ped, headBlendData);
}


// Arg:ped is [Ped]	Arg:shapeMix is [float]	Arg:skinMix is [float]	Arg:thirdMix is [float]	
g_Natives.UPDATE_PED_HEAD_BLEND_DATA = (ped, shapeMix, skinMix, thirdMix) => 
{
	return mp.game.invoke("0x723538F61C647C5A", ped, shapeMix, skinMix, thirdMix);
}


// Arg:ped is [Ped]	Arg:index is [int]	
g_Natives._SET_PED_EYE_COLOR = (ped, index) => 
{
	return mp.game.invoke("0x50B56988B170AFDF", ped, index);
}


// Arg:ped is [Ped]	Arg:overlayID is [int]	Arg:index is [int]	Arg:opacity is [float]	
g_Natives.SET_PED_HEAD_OVERLAY = (ped, overlayID, index, opacity) => 
{
	return mp.game.invoke("0x48F44967FA05CC1E", ped, overlayID, index, opacity);
}


// Arg:ped is [Ped]	Arg:overlayID is [int]	
g_Natives._GET_PED_HEAD_OVERLAY_VALUE = (ped, overlayID) => 
{
	return mp.game.invoke("0xA60EF3B6461A4D43", ped, overlayID);
}


// Arg:overlayID is [int]	
g_Natives._GET_NUM_HEAD_OVERLAY_VALUES = (overlayID) => 
{
	return mp.game.invoke("0xCF1CE768BB43480E", overlayID);
}


// Arg:ped is [Ped]	Arg:overlayID is [int]	Arg:colorType is [int]	Arg:colorID is [int]	Arg:secondColorID is [int]	
g_Natives._SET_PED_HEAD_OVERLAY_COLOR = (ped, overlayID, colorType, colorID, secondColorID) => 
{
	return mp.game.invoke("0x497BF74A7B9CB952", ped, overlayID, colorType, colorID, secondColorID);
}


// Arg:ped is [Ped]	Arg:colorID is [int]	Arg:highlightColorID is [int]	
g_Natives._SET_PED_HAIR_COLOR = (ped, colorID, highlightColorID) => 
{
	return mp.game.invoke("0x4CFFC65454C93A49", ped, colorID, highlightColorID);
}

g_Natives._GET_NUM_HAIR_COLORS = () => 
{
	return mp.game.invoke("0xE5C0CF872C2AD150");
}

g_Natives._GET_NUM_MAKEUP_COLORS = () => 
{
	return mp.game.invoke("0xD1F7CA1535D22818");
}


// Arg:colorID is [int]	Arg:R is [int*]	Arg:G is [int*]	Arg:B is [int*]	
g_Natives._GET_HAIR_COLOR = (colorID, R, G, B) => 
{
	return mp.game.invoke("0x4852FC386E2E1BB5", colorID, R, G, B);
}


// Arg:colorID is [int]	Arg:R is [int*]	Arg:G is [int*]	Arg:B is [Any*]	
g_Natives._GET_LIPSTICK_COLOR = (colorID, R, G, B) => 
{
	return mp.game.invoke("0x013E5CFC38CD5387", colorID, R, G, B);
}


// Arg:ColorID is [int]	
g_Natives["0xED6D8E27A43B8CDE"] = (ColorID) => 
{
	return mp.game.invoke("0xED6D8E27A43B8CDE", ColorID);
}


// Arg:p0 is [Any]	
g_Natives["0xEA9960D07DADCF10"] = (p0) => 
{
	return mp.game.invoke("0xEA9960D07DADCF10", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x3E802F11FBE27674"] = (p0) => 
{
	return mp.game.invoke("0x3E802F11FBE27674", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF41B5D290C99A3D6"] = (p0) => 
{
	return mp.game.invoke("0xF41B5D290C99A3D6", p0);
}


// Arg:colorID is [int]	
g_Natives._IS_PED_HAIR_COLOR_VALID = (colorID) => 
{
	return mp.game.invoke("0xE0D36E5D9E99CC21", colorID);
}


// Arg:p0 is [Any]	
g_Natives["0xAAA6A3698A69E048"] = (p0) => 
{
	return mp.game.invoke("0xAAA6A3698A69E048", p0);
}


// Arg:colorID is [int]	
g_Natives._IS_PED_LIPSTICK_COLOR_VALID = (colorID) => 
{
	return mp.game.invoke("0x0525A2C2562F3CD4", colorID);
}


// Arg:colorID is [int]	
g_Natives._IS_PED_BLUSH_COLOR_VALID = (colorID) => 
{
	return mp.game.invoke("0x604E810189EE3A59", colorID);
}


// Arg:modelHash is [Hash]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xC56FBF2F228E1DAC"] = (modelHash, p1, p2) => 
{
	return mp.game.invoke("0xC56FBF2F228E1DAC", modelHash, p1, p2);
}


// Arg:ped is [Ped]	Arg:index is [int]	Arg:scale is [float]	
g_Natives._SET_PED_FACE_FEATURE = (ped, index, scale) => 
{
	return mp.game.invoke("0x71A5C1DBA060049E", ped, index, scale);
}


// Arg:ped is [Ped]	
g_Natives.HAS_PED_HEAD_BLEND_FINISHED = (ped) => 
{
	return mp.game.invoke("0x654CD0A825161131", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x4668D80430D6C299"] = (ped) => 
{
	return mp.game.invoke("0x4668D80430D6C299", ped);
}


// Arg:ped is [Ped]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:p4 is [int]	
g_Natives["0xCC9682B8951C5229"] = (ped, r, g, b, p4) => 
{
	return mp.game.invoke("0xCC9682B8951C5229", ped, r, g, b, p4);
}


// Arg:ped is [Ped]	
g_Natives["0xA21C118553BBDF02"] = (ped) => 
{
	return mp.game.invoke("0xA21C118553BBDF02", ped);
}


// Arg:type is [int]	
g_Natives._GET_FIRST_PARENT_ID_FOR_PED_TYPE = (type) => 
{
	return mp.game.invoke("0x68D353AB88B97E0C", type);
}


// Arg:type is [int]	
g_Natives._GET_NUM_PARENT_PEDS_OF_TYPE = (type) => 
{
	return mp.game.invoke("0x5EF37013A6539C9D", type);
}


// Arg:ped is [Ped]	Arg:slot is [int]	Arg:drawableId is [int]	Arg:textureId is [int]	
g_Natives["0x39D55A620FCB6A3A"] = (ped, slot, drawableId, textureId) => 
{
	return mp.game.invoke("0x39D55A620FCB6A3A", ped, slot, drawableId, textureId);
}


// Arg:p0 is [Ped]	
g_Natives._ARE_COMPONENTS_LOADED = (p0) => 
{
	return mp.game.invoke("0x66680A92700F43DF", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x5AAB586FFEC0FD96"] = (p0) => 
{
	return mp.game.invoke("0x5AAB586FFEC0FD96", p0);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	Arg:drawableId is [int]	Arg:TextureId is [int]	
g_Natives._IS_PED_PROP_VALID = (ped, componentId, drawableId, TextureId) => 
{
	return mp.game.invoke("0x2B16A3BFF1FBCE49", ped, componentId, drawableId, TextureId);
}


// Arg:ped is [Ped]	
g_Natives._IS_PED_GETTING_ON_BIKE = (ped) => 
{
	return mp.game.invoke("0x784002A632822099", ped);
}


// Arg:ped is [Ped]	
g_Natives["0xF79F9DEF0AADE61A"] = (ped) => 
{
	return mp.game.invoke("0xF79F9DEF0AADE61A", ped);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	
g_Natives.GET_PED_PROP_INDEX = (ped, componentId) => 
{
	return mp.game.invoke("0x898CC20EA75BACD8", ped, componentId);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	Arg:drawableId is [int]	Arg:TextureId is [int]	Arg:isNetworkGame is [BOOL]	
g_Natives.SET_PED_PROP_INDEX = (ped, componentId, drawableId, TextureId, isNetworkGame) => 
{
	return mp.game.invoke("0x93376B65A266EB5F", ped, componentId, drawableId, TextureId, isNetworkGame);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:knockOff is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.KNOCK_OFF_PED_PROP = (ped, p1, knockOff, p2, p3) => 
{
	return mp.game.invoke("0x6FD7816A36615F48", ped, p1, knockOff, p2, p3);
}


// Arg:ped is [Ped]	Arg:propId is [int]	
g_Natives.CLEAR_PED_PROP = (ped, propId) => 
{
	return mp.game.invoke("0x0943E5B8E078E76E", ped, propId);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_ALL_PED_PROPS = (ped) => 
{
	return mp.game.invoke("0xCD8A7537A9B52F06", ped);
}


// Arg:ped is [Ped]	
g_Natives["0xAFF4710E2A0A6C12"] = (ped) => 
{
	return mp.game.invoke("0xAFF4710E2A0A6C12", ped);
}


// Arg:ped is [Ped]	Arg:componentId is [int]	
g_Natives.GET_PED_PROP_TEXTURE_INDEX = (ped, componentId) => 
{
	return mp.game.invoke("0xE131A28626F81AB2", ped, componentId);
}


// Arg:p0 is [Any]	
g_Natives["0x1280804F7CFD2D6C"] = (p0) => 
{
	return mp.game.invoke("0x1280804F7CFD2D6C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x36C6984C3ED0C911"] = (p0) => 
{
	return mp.game.invoke("0x36C6984C3ED0C911", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xB50EB4CCB29704AC"] = (p0) => 
{
	return mp.game.invoke("0xB50EB4CCB29704AC", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xFEC9A3B1820F3331"] = (p0) => 
{
	return mp.game.invoke("0xFEC9A3B1820F3331", p0);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_BLOCKING_OF_NON_TEMPORARY_EVENTS = (ped, toggle) => 
{
	return mp.game.invoke("0x9F8AA94D6D97DBF4", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.SET_PED_BOUNDS_ORIENTATION = (ped, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x4F5F651ACCC9C4CF", ped, p1, p2, p3, p4, p5);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	
g_Natives.REGISTER_TARGET = (ped, target) => 
{
	return mp.game.invoke("0x2F25D9AEFA34FBA2", ped, target);
}


// Arg:ped is [Ped]	Arg:radius is [float]	
g_Natives.REGISTER_HATED_TARGETS_AROUND_PED = (ped, radius) => 
{
	return mp.game.invoke("0x9222F300BF8354FE", ped, radius);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRadius is [float]	Arg:yRadius is [float]	Arg:zRadius is [float]	Arg:pedType is [int]	
g_Natives.GET_RANDOM_PED_AT_COORD = (x, y, z, xRadius, yRadius, zRadius, pedType) => 
{
	return mp.game.invoke("0x876046A8E3A4B71C", x, y, z, xRadius, yRadius, zRadius, pedType);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:outPed is [Ped*]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:pedType is [int]	
g_Natives.GET_CLOSEST_PED = (x, y, z, radius, p4, p5, outPed, p7, p8, pedType) => 
{
	return mp.game.invoke("0xC33AB876A77F8164", x, y, z, radius, p4, p5, outPed, p7, p8, pedType);
}


// Arg:value is [BOOL]	
g_Natives.SET_SCENARIO_PEDS_TO_BE_RETURNED_BY_NEXT_COMMAND = (value) => 
{
	return mp.game.invoke("0x14F19A8782C8071E", value);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [Any]	
g_Natives["0x03EA03AF85A85CB7"] = (ped, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x03EA03AF85A85CB7", ped, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:driver is [Ped]	Arg:racingModifier is [float]	
g_Natives.SET_DRIVER_RACING_MODIFIER = (driver, racingModifier) => 
{
	return mp.game.invoke("0xDED5AF5A0EA4B297", driver, racingModifier);
}


// Arg:driver is [Ped]	Arg:ability is [float]	
g_Natives.SET_DRIVER_ABILITY = (driver, ability) => 
{
	return mp.game.invoke("0xB195FFA8042FC5C3", driver, ability);
}


// Arg:driver is [Ped]	Arg:aggressiveness is [float]	
g_Natives.SET_DRIVER_AGGRESSIVENESS = (driver, aggressiveness) => 
{
	return mp.game.invoke("0xA731F608CA104E3C", driver, aggressiveness);
}


// Arg:ped is [Ped]	
g_Natives.CAN_PED_RAGDOLL = (ped) => 
{
	return mp.game.invoke("0x128F79EDCECE4FD5", ped);
}


// Arg:ped is [Ped]	Arg:time1 is [int]	Arg:time2 is [int]	Arg:ragdollType is [int]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	
g_Natives.SET_PED_TO_RAGDOLL = (ped, time1, time2, ragdollType, p4, p5, p6) => 
{
	return mp.game.invoke("0xAE99FB955581844A", ped, time1, time2, ragdollType, p4, p5, p6);
}


// Arg:ped is [Ped]	Arg:time is [int]	Arg:p2 is [int]	Arg:ragdollType is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	Arg:p12 is [float]	Arg:p13 is [float]	
g_Natives.SET_PED_TO_RAGDOLL_WITH_FALL = (ped, time, p2, ragdollType, x, y, z, p7, p8, p9, p10, p11, p12, p13) => 
{
	return mp.game.invoke("0xD76632D99E4966C8", ped, time, p2, ragdollType, x, y, z, p7, p8, p9, p10, p11, p12, p13);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_RAGDOLL_ON_COLLISION = (ped, toggle) => 
{
	return mp.game.invoke("0xF0A4F1BBF4FA7497", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RAGDOLL = (ped) => 
{
	return mp.game.invoke("0x47E4E977581C5B55", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RUNNING_RAGDOLL_TASK = (ped) => 
{
	return mp.game.invoke("0xE3B6097CC25AA69E", ped);
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_RAGDOLL_FORCE_FALL = (ped) => 
{
	return mp.game.invoke("0x01F6594B923B9251", ped);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_RAGDOLL_TIMER = (ped) => 
{
	return mp.game.invoke("0x9FA4664CF62E47E8", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_RAGDOLL = (ped, toggle) => 
{
	return mp.game.invoke("0xB128377056A54E2A", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives["0xD1871251F3B5ACD7"] = (ped) => 
{
	return mp.game.invoke("0xD1871251F3B5ACD7", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RUNNING_MOBILE_PHONE_TASK = (ped) => 
{
	return mp.game.invoke("0x2AFE52F782F25775", ped);
}


// Arg:ped is [Ped]	
g_Natives["0xA3F3564A5B3646C0"] = (ped) => 
{
	return mp.game.invoke("0xA3F3564A5B3646C0", ped);
}


// Arg:ped is [Ped]	Arg:flags is [int]	
g_Natives._SET_PED_RAGDOLL_BLOCKING_FLAGS = (ped, flags) => 
{
	return mp.game.invoke("0x26695EC767728D84", ped, flags);
}


// Arg:ped is [Ped]	Arg:flags is [int]	
g_Natives._RESET_PED_RAGDOLL_BLOCKING_FLAGS = (ped, flags) => 
{
	return mp.game.invoke("0xD86D101FCFD00A4B", ped, flags);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	
g_Natives.SET_PED_ANGLED_DEFENSIVE_AREA = (ped, p1, p2, p3, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0xC7F76DF27A5045A1", ped, p1, p2, p3, p4, p5, p6, p7, p8, p9);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	
g_Natives.SET_PED_SPHERE_DEFENSIVE_AREA = (ped, x, y, z, radius, p5, p6) => 
{
	return mp.game.invoke("0x9D3151A373974804", ped, x, y, z, radius, p5, p6);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:radius is [float]	Arg:p6 is [BOOL]	
g_Natives.SET_PED_DEFENSIVE_SPHERE_ATTACHED_TO_PED = (ped, target, xOffset, yOffset, zOffset, radius, p6) => 
{
	return mp.game.invoke("0xF9B8F91AAD3B953E", ped, target, xOffset, yOffset, zOffset, radius, p6);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	
g_Natives["0xE4723DB6E736CCFF"] = (ped, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xE4723DB6E736CCFF", ped, p1, p2, p3, p4, p5, p6);
}


// Arg:ped is [Ped]	Arg:attachPed is [Ped]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [BOOL]	Arg:p10 is [BOOL]	
g_Natives.SET_PED_DEFENSIVE_AREA_ATTACHED_TO_PED = (ped, attachPed, p2, p3, p4, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0x4EF47FE21698A8B6", ped, attachPed, p2, p3, p4, p5, p6, p7, p8, p9, p10);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	
g_Natives.SET_PED_DEFENSIVE_AREA_DIRECTION = (ped, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x413C6C763A4AFFAD", ped, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.REMOVE_PED_DEFENSIVE_AREA = (ped, toggle) => 
{
	return mp.game.invoke("0x74D4E028107450A9", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.GET_PED_DEFENSIVE_AREA_POSITION = (ped, p1) => 
{
	return mp.game.invoke("0x3C06B8786DD94CD1", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0xBA63D9FE45412247"] = (ped, p1) => 
{
	return mp.game.invoke("0xBA63D9FE45412247", ped, p1);
}


// Arg:ped is [Ped]	Arg:itemSet is [Any]	
g_Natives.SET_PED_PREFERRED_COVER_SET = (ped, itemSet) => 
{
	return mp.game.invoke("0x8421EB4DA7E391B9", ped, itemSet);
}


// Arg:ped is [Ped]	
g_Natives.REMOVE_PED_PREFERRED_COVER_SET = (ped) => 
{
	return mp.game.invoke("0xFDDB234CF74073D9", ped);
}


// Arg:ped is [Ped]	
g_Natives.REVIVE_INJURED_PED = (ped) => 
{
	return mp.game.invoke("0x8D8ACD8388CD99CE", ped);
}


// Arg:ped is [Ped]	
g_Natives.RESURRECT_PED = (ped) => 
{
	return mp.game.invoke("0x71BC8E838B9C6035", ped);
}


// Arg:ped is [Ped]	Arg:name is [char*]	
g_Natives.SET_PED_NAME_DEBUG = (ped, name) => 
{
	return mp.game.invoke("0x98EFA132A4117BE1", ped, name);
}


// Arg:ped is [Ped]	Arg:worldSpace is [BOOL]	
g_Natives.GET_PED_EXTRACTED_DISPLACEMENT = (ped, worldSpace) => 
{
	return mp.game.invoke("0xE0AF41401ADF87E3", ped, worldSpace);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DIES_WHEN_INJURED = (ped, toggle) => 
{
	return mp.game.invoke("0x5BA7919BED300023", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_ENABLE_WEAPON_BLOCKING = (ped, toggle) => 
{
	return mp.game.invoke("0x97A790315D3831FD", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0xF9ACF4A08098EA25"] = (ped, p1) => 
{
	return mp.game.invoke("0xF9ACF4A08098EA25", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_VISIBLE_DAMAGE = (ped) => 
{
	return mp.game.invoke("0x3AC1F7B898F30C05", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [Any]	
g_Natives.APPLY_PED_BLOOD_DAMAGE_BY_ZONE = (ped, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x816F6981C60BF53B", ped, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	Arg:boneIndex is [int]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:woundType is [char*]	
g_Natives.APPLY_PED_BLOOD = (ped, boneIndex, xRot, yRot, zRot, woundType) => 
{
	return mp.game.invoke("0x83F7E01C7B769A26", ped, boneIndex, xRot, yRot, zRot, woundType);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [Any*]	
g_Natives.APPLY_PED_BLOOD_BY_ZONE = (ped, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x3311E47B91EDCBBC", ped, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:scale is [float]	Arg:p6 is [Any]	Arg:p7 is [float]	Arg:bloodType is [char*]	
g_Natives.APPLY_PED_BLOOD_SPECIFIC = (ped, p1, xOffset, yOffset, zOffset, scale, p6, p7, bloodType) => 
{
	return mp.game.invoke("0xEF0D582CBF2D9B0F", ped, p1, xOffset, yOffset, zOffset, scale, p6, p7, bloodType);
}


// Arg:ped is [Ped]	Arg:damageZone is [int]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:scale is [float]	Arg:alpha is [float]	Arg:variation is [int]	Arg:fadeIn is [BOOL]	Arg:decalName is [char*]	
g_Natives.APPLY_PED_DAMAGE_DECAL = (ped, damageZone, xOffset, yOffset, zOffset, scale, alpha, variation, fadeIn, decalName) => 
{
	return mp.game.invoke("0x397C38AA7B4A5F83", ped, damageZone, xOffset, yOffset, zOffset, scale, alpha, variation, fadeIn, decalName);
}


// Arg:ped is [Ped]	Arg:damagePack is [char*]	Arg:damage is [float]	Arg:mult is [float]	
g_Natives.APPLY_PED_DAMAGE_PACK = (ped, damagePack, damage, mult) => 
{
	return mp.game.invoke("0x46DF918788CB093F", ped, damagePack, damage, mult);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_BLOOD_DAMAGE = (ped) => 
{
	return mp.game.invoke("0x8FE22675A5A45817", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.CLEAR_PED_BLOOD_DAMAGE_BY_ZONE = (ped, p1) => 
{
	return mp.game.invoke("0x56E3B78C5408D9F4", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives.HIDE_PED_BLOOD_DAMAGE_BY_ZONE = (ped, p1, p2) => 
{
	return mp.game.invoke("0x62AB793144DE75DC", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	Arg:p2 is [char*]	
g_Natives.CLEAR_PED_DAMAGE_DECAL_BY_ZONE = (ped, p1, p2) => 
{
	return mp.game.invoke("0x523C79AEEFCC4A2A", ped, p1, p2);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_DECORATIONS_STATE = (ped) => 
{
	return mp.game.invoke("0x71EAB450D86954A1", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x2B694AFCF64E6994"] = (ped, p1) => 
{
	return mp.game.invoke("0x2B694AFCF64E6994", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_WETNESS = (ped) => 
{
	return mp.game.invoke("0x9C720776DAA43E7E", ped);
}


// Arg:ped is [Ped]	Arg:height is [float]	
g_Natives.SET_PED_WETNESS_HEIGHT = (ped, height) => 
{
	return mp.game.invoke("0x44CB6447D2571AA0", ped, height);
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_WETNESS_ENABLED_THIS_FRAME = (ped) => 
{
	return mp.game.invoke("0xB5485E4907B53019", ped);
}


// Arg:ped is [Ped]	
g_Natives._CLEAR_PED_SOMETHING = (ped) => 
{
	return mp.game.invoke("0x6585D955A68452A5", ped);
}


// Arg:ped is [Ped]	Arg:sweat is [float]	
g_Natives.SET_PED_SWEAT = (ped, sweat) => 
{
	return mp.game.invoke("0x27B0405F59637D1F", ped, sweat);
}


// Arg:ped is [Ped]	Arg:collection is [Hash]	Arg:overlay is [Hash]	
g_Natives._SET_PED_DECORATION = (ped, collection, overlay) => 
{
	return mp.game.invoke("0x5F5D1665E352A839", ped, collection, overlay);
}


// Arg:ped is [Ped]	Arg:collection is [Hash]	Arg:overlay is [Hash]	
g_Natives._SET_PED_FACIAL_DECORATION = (ped, collection, overlay) => 
{
	return mp.game.invoke("0x5619BFA07CFD7833", ped, collection, overlay);
}


// Arg:collection is [Hash]	Arg:overlay is [Hash]	
g_Natives._GET_TATTOO_ZONE = (collection, overlay) => 
{
	return mp.game.invoke("0x9FD452BFBE7A7A8B", collection, overlay);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_DECORATIONS = (ped) => 
{
	return mp.game.invoke("0x0E5173C163976E38", ped);
}


// Arg:ped is [Ped]	
g_Natives._CLEAR_PED_FACIAL_DECORATIONS = (ped) => 
{
	return mp.game.invoke("0xE3B27E70CEAB9F0C", ped);
}


// Arg:ped is [Ped]	
g_Natives.WAS_PED_SKELETON_UPDATED = (ped) => 
{
	return mp.game.invoke("0x11B499C1E0FF8559", ped);
}


// Arg:ped is [Ped]	Arg:boneId is [int]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	
g_Natives.GET_PED_BONE_COORDS = (ped, boneId, offsetX, offsetY, offsetZ) => 
{
	return mp.game.invoke("0x17C07FC640E86B4E", ped, boneId, offsetX, offsetY, offsetZ);
}


// Arg:startImmediately is [BOOL]	Arg:messageId is [int]	
g_Natives.CREATE_NM_MESSAGE = (startImmediately, messageId) => 
{
	return mp.game.invoke("0x418EF2A1BCE56685", startImmediately, messageId);
}


// Arg:ped is [Ped]	
g_Natives.GIVE_PED_NM_MESSAGE = (ped) => 
{
	return mp.game.invoke("0xB158DFCCC56E5C5B", ped);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	
g_Natives.ADD_SCENARIO_BLOCKING_AREA = (x1, y1, z1, x2, y2, z2, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x1B5C85C612E5256E", x1, y1, z1, x2, y2, z2, p6, p7, p8, p9);
}

g_Natives.REMOVE_SCENARIO_BLOCKING_AREAS = () => 
{
	return mp.game.invoke("0xD37401D78A929A49");
}


// Arg:areaHandle is [int]	Arg:p1 is [BOOL]	
g_Natives.REMOVE_SCENARIO_BLOCKING_AREA = (areaHandle, p1) => 
{
	return mp.game.invoke("0x31D16B74C6E29D66", areaHandle, p1);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	Arg:p4 is [int]	
g_Natives.SET_SCENARIO_PEDS_SPAWN_IN_SPHERE_AREA = (x, y, z, range, p4) => 
{
	return mp.game.invoke("0x28157D43CF600981", x, y, z, range, p4);
}


// Arg:ped is [Ped]	Arg:scenario is [char*]	
g_Natives.IS_PED_USING_SCENARIO = (ped, scenario) => 
{
	return mp.game.invoke("0x1BF094736DD62C2E", ped, scenario);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_USING_ANY_SCENARIO = (ped) => 
{
	return mp.game.invoke("0x57AB4A3080F85143", ped);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xFE07FF6495D52E2A"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xFE07FF6495D52E2A", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x9A77DFD295E29B09"] = (p0, p1) => 
{
	return mp.game.invoke("0x9A77DFD295E29B09", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x25361A96E0F7E419"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x25361A96E0F7E419", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xEC6935EBE0847B90"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xEC6935EBE0847B90", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0xA3A9299C4F2ADB98"] = (p0) => 
{
	return mp.game.invoke("0xA3A9299C4F2ADB98", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF1C03A5352243A30"] = (p0) => 
{
	return mp.game.invoke("0xF1C03A5352243A30", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xEEED8FAFEC331A70"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xEEED8FAFEC331A70", p0, p1, p2, p3);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x425AECF167663F48"] = (ped, p1) => 
{
	return mp.game.invoke("0x425AECF167663F48", ped, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x5B6010B3CBC29095"] = (p0, p1) => 
{
	return mp.game.invoke("0x5B6010B3CBC29095", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xCEDA60A74219D064"] = (p0, p1) => 
{
	return mp.game.invoke("0xCEDA60A74219D064", p0, p1);
}


// Arg:ped is [Ped]	Arg:animName is [char*]	Arg:animDict is [char*]	
g_Natives.PLAY_FACIAL_ANIM = (ped, animName, animDict) => 
{
	return mp.game.invoke("0xE1E65CA8AC9C00ED", ped, animName, animDict);
}


// Arg:ped is [Ped]	Arg:animName is [char*]	Arg:animDict is [char*]	
g_Natives.SET_FACIAL_IDLE_ANIM_OVERRIDE = (ped, animName, animDict) => 
{
	return mp.game.invoke("0xFFC24B988B938B38", ped, animName, animDict);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_FACIAL_IDLE_ANIM_OVERRIDE = (ped) => 
{
	return mp.game.invoke("0x726256CC1EEB182F", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_PLAY_GESTURE_ANIMS = (ped, toggle) => 
{
	return mp.game.invoke("0xBAF20C5432058024", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_PED_CAN_PLAY_VISEME_ANIMS = (ped, toggle, p2) => 
{
	return mp.game.invoke("0xF833DDBA3B104D43", ped, toggle, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives._SET_PED_CAN_PLAY_INJURED_ANIMS = (ped, p1) => 
{
	return mp.game.invoke("0x33A60D8BDD6E508C", ped, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_PLAY_AMBIENT_ANIMS = (ped, toggle) => 
{
	return mp.game.invoke("0x6373D1349925A70E", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_PLAY_AMBIENT_BASE_ANIMS = (ped, toggle) => 
{
	return mp.game.invoke("0x0EB0585D15254740", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives["0xC2EE020F5FB4DB53"] = (ped) => 
{
	return mp.game.invoke("0xC2EE020F5FB4DB53", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_ARM_IK = (ped, toggle) => 
{
	return mp.game.invoke("0x6C3B4D6D13B4C841", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_HEAD_IK = (ped, toggle) => 
{
	return mp.game.invoke("0xC11C18092C5530DC", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_LEG_IK = (ped, toggle) => 
{
	return mp.game.invoke("0x73518ECE2485412B", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_TORSO_IK = (ped, toggle) => 
{
	return mp.game.invoke("0xF2B7106D37947CE0", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0xF5846EDB26A98A24"] = (ped, p1) => 
{
	return mp.game.invoke("0xF5846EDB26A98A24", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x6647C5F6F5792496"] = (ped, p1) => 
{
	return mp.game.invoke("0x6647C5F6F5792496", ped, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_USE_AUTO_CONVERSATION_LOOKAT = (ped, toggle) => 
{
	return mp.game.invoke("0xEC4686EC06434678", ped, toggle);
}


// Arg:ped1 is [Ped]	Arg:ped2 is [Ped]	
g_Natives.IS_PED_HEADTRACKING_PED = (ped1, ped2) => 
{
	return mp.game.invoke("0x5CD3CB88A7F8850D", ped1, ped2);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	
g_Natives.IS_PED_HEADTRACKING_ENTITY = (ped, entity) => 
{
	return mp.game.invoke("0x813A0A7C9D2E831F", ped, entity);
}


// Arg:ped is [Ped]	Arg:lookAt is [Ped]	
g_Natives.SET_PED_PRIMARY_LOOKAT = (ped, lookAt) => 
{
	return mp.game.invoke("0xCD17B554996A8D9E", ped, lookAt);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x78C4E9961DB3EB5B"] = (p0, p1) => 
{
	return mp.game.invoke("0x78C4E9961DB3EB5B", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.SET_PED_CLOTH_PRONE = (p0, p1) => 
{
	return mp.game.invoke("0x82A3D6D9CC2CB8E3", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xA660FAF550EB37E5"] = (p0, p1) => 
{
	return mp.game.invoke("0xA660FAF550EB37E5", p0, p1);
}


// Arg:ped is [Ped]	Arg:flagId is [int]	Arg:value is [BOOL]	
g_Natives.SET_PED_CONFIG_FLAG = (ped, flagId, value) => 
{
	return mp.game.invoke("0x1913FE4CBF41C463", ped, flagId, value);
}


// Arg:ped is [Ped]	Arg:flagId is [int]	Arg:value is [BOOL]	
g_Natives.SET_PED_RESET_FLAG = (ped, flagId, value) => 
{
	return mp.game.invoke("0xC1E8A365BF3B29F2", ped, flagId, value);
}


// Arg:ped is [Ped]	Arg:flagId is [int]	Arg:p2 is [BOOL]	
g_Natives.GET_PED_CONFIG_FLAG = (ped, flagId, p2) => 
{
	return mp.game.invoke("0x7EE53118C892B513", ped, flagId, p2);
}


// Arg:ped is [Ped]	Arg:flagId is [int]	
g_Natives.GET_PED_RESET_FLAG = (ped, flagId) => 
{
	return mp.game.invoke("0xAF9E59B1B1FBF2A0", ped, flagId);
}


// Arg:ped is [Ped]	Arg:index is [int]	
g_Natives.SET_PED_GROUP_MEMBER_PASSENGER_INDEX = (ped, index) => 
{
	return mp.game.invoke("0x0BDDB8D9EC6BCF3C", ped, index);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_EVASIVE_DIVE = (ped, toggle) => 
{
	return mp.game.invoke("0x6B7A646C242A7059", ped, toggle);
}


// Arg:ped is [Ped]	Arg:evadingEntity is [Entity*]	
g_Natives.IS_PED_EVASIVE_DIVING = (ped, evadingEntity) => 
{
	return mp.game.invoke("0x414641C26E105898", ped, evadingEntity);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_SHOOTS_AT_COORD = (ped, x, y, z, toggle) => 
{
	return mp.game.invoke("0x96A05E4FB321B1BA", ped, x, y, z, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_MODEL_IS_SUPPRESSED = (ped, toggle) => 
{
	return mp.game.invoke("0xE163A4BCE4DE6F11", ped, toggle);
}

g_Natives.STOP_ANY_PED_MODEL_BEING_SUPPRESSED = () => 
{
	return mp.game.invoke("0xB47BD05FA66B40CF");
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_BE_TARGETED_WHEN_INJURED = (ped, toggle) => 
{
	return mp.game.invoke("0x638C03B0F9878F57", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_GENERATES_DEAD_BODY_EVENTS = (ped, toggle) => 
{
	return mp.game.invoke("0x7FB17BA2E7DECA5B", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0xE43A13C9E4CCCBCF"] = (ped, p1) => 
{
	return mp.game.invoke("0xE43A13C9E4CCCBCF", ped, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_RAGDOLL_FROM_PLAYER_IMPACT = (ped, toggle) => 
{
	return mp.game.invoke("0xDF993EE5E90ABA25", ped, toggle);
}


// Arg:ped is [Ped]	Arg:cannotRemove is [BOOL]	Arg:helmetFlag is [int]	Arg:textureIndex is [int]	
g_Natives.GIVE_PED_HELMET = (ped, cannotRemove, helmetFlag, textureIndex) => 
{
	return mp.game.invoke("0x54C7C4A94367717E", ped, cannotRemove, helmetFlag, textureIndex);
}


// Arg:ped is [Ped]	Arg:instantly is [BOOL]	
g_Natives.REMOVE_PED_HELMET = (ped, instantly) => 
{
	return mp.game.invoke("0xA7B2458D0AD6DED8", ped, instantly);
}


// Arg:ped is [Ped]	
g_Natives["0x14590DDBEDB1EC85"] = (ped) => 
{
	return mp.game.invoke("0x14590DDBEDB1EC85", ped);
}


// Arg:ped is [Ped]	Arg:canWearHelmet is [BOOL]	
g_Natives.SET_PED_HELMET = (ped, canWearHelmet) => 
{
	return mp.game.invoke("0x560A43136EB58105", ped, canWearHelmet);
}


// Arg:ped is [Ped]	Arg:helmetFlag is [int]	
g_Natives.SET_PED_HELMET_FLAG = (ped, helmetFlag) => 
{
	return mp.game.invoke("0xC0E78D5C2CE3EB25", ped, helmetFlag);
}


// Arg:ped is [Ped]	Arg:propIndex is [int]	
g_Natives.SET_PED_HELMET_PROP_INDEX = (ped, propIndex) => 
{
	return mp.game.invoke("0x26D83693ED99291C", ped, propIndex);
}


// Arg:ped is [Ped]	Arg:textureIndex is [int]	
g_Natives.SET_PED_HELMET_TEXTURE_INDEX = (ped, textureIndex) => 
{
	return mp.game.invoke("0xF1550C4BD22582E2", ped, textureIndex);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_WEARING_HELMET = (ped) => 
{
	return mp.game.invoke("0xF33BDFE19B309B19", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x687C0B594907D2E8"] = (ped) => 
{
	return mp.game.invoke("0x687C0B594907D2E8", ped);
}


// Arg:p0 is [int]	
g_Natives["0x451294E859ECC018"] = (p0) => 
{
	return mp.game.invoke("0x451294E859ECC018", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x9D728C1E12BF5518"] = (p0) => 
{
	return mp.game.invoke("0x9D728C1E12BF5518", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF2385935BFFD4D92"] = (p0) => 
{
	return mp.game.invoke("0xF2385935BFFD4D92", p0);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_TO_LOAD_COVER = (ped, toggle) => 
{
	return mp.game.invoke("0x332B562EEDA62399", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_COWER_IN_COVER = (ped, toggle) => 
{
	return mp.game.invoke("0xCB7553CDCEF4A735", ped, toggle);
}


// Arg:player is [Ped]	Arg:aim is [BOOL]	
g_Natives.SET_PED_CAN_PEEK_IN_COVER = (player, aim) => 
{
	return mp.game.invoke("0xC514825C507E3736", player, aim);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_PLAYS_HEAD_ON_HORN_ANIM_WHEN_DIES_IN_VEHICLE = (ped, toggle) => 
{
	return mp.game.invoke("0x94D94BF1A75AED3D", ped, toggle);
}


// Arg:ped is [Ped]	Arg:mode is [int]	
g_Natives.SET_PED_LEG_IK_MODE = (ped, mode) => 
{
	return mp.game.invoke("0xC396F5B86FF9FEBD", ped, mode);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_MOTION_BLUR = (ped, toggle) => 
{
	return mp.game.invoke("0x0A986918B102B448", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_CAN_SWITCH_WEAPON = (ped, toggle) => 
{
	return mp.game.invoke("0xED7F7EFE9FABF340", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DIES_INSTANTLY_IN_WATER = (ped, toggle) => 
{
	return mp.game.invoke("0xEEB64139BA29A7CF", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives["0x1A330D297AAC6BC1"] = (ped, p1) => 
{
	return mp.game.invoke("0x1A330D297AAC6BC1", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.STOP_PED_WEAPON_FIRING_WHEN_DROPPED = (ped) => 
{
	return mp.game.invoke("0xC158D28142A34608", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives.SET_SCRIPTED_ANIM_SEAT_OFFSET = (ped, p1) => 
{
	return mp.game.invoke("0x5917BBA32D06C230", ped, p1);
}


// Arg:ped is [Ped]	Arg:combatMovement is [int]	
g_Natives.SET_PED_COMBAT_MOVEMENT = (ped, combatMovement) => 
{
	return mp.game.invoke("0x4D9CA1009AFBD057", ped, combatMovement);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_COMBAT_MOVEMENT = (ped) => 
{
	return mp.game.invoke("0xDEA92412FCAEB3F5", ped);
}


// Arg:ped is [Ped]	Arg:ability is [int]	
g_Natives.SET_PED_COMBAT_ABILITY = (ped, ability) => 
{
	return mp.game.invoke("0xC7622C0D36B2FDA8", ped, ability);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.SET_PED_COMBAT_RANGE = (ped, p1) => 
{
	return mp.game.invoke("0x3C606747B23E497B", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_COMBAT_RANGE = (ped) => 
{
	return mp.game.invoke("0xF9D9F7F2DB8E2FA0", ped);
}


// Arg:ped is [Ped]	Arg:attributeIndex is [int]	Arg:enabled is [BOOL]	
g_Natives.SET_PED_COMBAT_ATTRIBUTES = (ped, attributeIndex, enabled) => 
{
	return mp.game.invoke("0x9F7794730795E019", ped, attributeIndex, enabled);
}


// Arg:ped is [Ped]	Arg:responseType is [int]	
g_Natives.SET_PED_TARGET_LOSS_RESPONSE = (ped, responseType) => 
{
	return mp.game.invoke("0x0703B9079823DA4A", ped, responseType);
}


// Arg:ped is [Ped]	
g_Natives["0xDCCA191DF9980FD7"] = (ped) => 
{
	return mp.game.invoke("0xDCCA191DF9980FD7", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_PERFORMING_STEALTH_KILL = (ped) => 
{
	return mp.game.invoke("0xFD4CCDBCC59941B7", ped);
}


// Arg:ped is [Ped]	
g_Natives["0xEBD0EDBA5BE957CF"] = (ped) => 
{
	return mp.game.invoke("0xEBD0EDBA5BE957CF", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_BEING_STEALTH_KILLED = (ped) => 
{
	return mp.game.invoke("0x863B23EFDE9C5DF2", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_MELEE_TARGET_FOR_PED = (ped) => 
{
	return mp.game.invoke("0x18A3E9EE1297FD39", ped);
}


// Arg:ped is [Ped]	
g_Natives.WAS_PED_KILLED_BY_STEALTH = (ped) => 
{
	return mp.game.invoke("0xF9800AA1A771B000", ped);
}


// Arg:ped is [Ped]	
g_Natives.WAS_PED_KILLED_BY_TAKEDOWN = (ped) => 
{
	return mp.game.invoke("0x7F08E26039C7347C", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x61767F73EACEED21"] = (ped) => 
{
	return mp.game.invoke("0x61767F73EACEED21", ped);
}


// Arg:ped is [Ped]	Arg:attributes is [int]	Arg:p2 is [BOOL]	
g_Natives.SET_PED_FLEE_ATTRIBUTES = (ped, attributes, p2) => 
{
	return mp.game.invoke("0x70A2D1137C8ED7C9", ped, attributes, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	
g_Natives.SET_PED_COWER_HASH = (ped, p1) => 
{
	return mp.game.invoke("0xA549131166868ED3", ped, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x2016C603D6B8987C"] = (p0, p1) => 
{
	return mp.game.invoke("0x2016C603D6B8987C", p0, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_STEERS_AROUND_PEDS = (ped, toggle) => 
{
	return mp.game.invoke("0x46F2193B3AD1D891", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_STEERS_AROUND_OBJECTS = (ped, toggle) => 
{
	return mp.game.invoke("0x1509C089ADC208BF", ped, toggle);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_STEERS_AROUND_VEHICLES = (ped, toggle) => 
{
	return mp.game.invoke("0xEB6FB9D48DDE23EC", ped, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xA9B61A329BFDCBEA"] = (p0, p1) => 
{
	return mp.game.invoke("0xA9B61A329BFDCBEA", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x570389D1C3DE3C6B"] = (p0) => 
{
	return mp.game.invoke("0x570389D1C3DE3C6B", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x576594E8D64375E2"] = (p0, p1) => 
{
	return mp.game.invoke("0x576594E8D64375E2", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0xA52D5247A4227E14"] = (p0) => 
{
	return mp.game.invoke("0xA52D5247A4227E14", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.IS_ANY_PED_NEAR_POINT = (x, y, z, radius) => 
{
	return mp.game.invoke("0x083961498679DC9F", x, y, z, radius);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives._SET_PED_FAST_ANIMATIONS = (ped, p1, p2) => 
{
	return mp.game.invoke("0x2208438012482A1A", ped, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	
g_Natives["0xFCF37A457CB96DC0"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xFCF37A457CB96DC0", p0, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	
g_Natives._TRACK_PED_VISIBILITY = (ped) => 
{
	return mp.game.invoke("0x7D7A2E43E74E2EB8", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.GET_PED_FLOOD_INVINCIBILITY = (ped, p1) => 
{
	return mp.game.invoke("0x2BC338A7B21F4608", ped, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xCD018C591F94CB43"] = (p0, p1) => 
{
	return mp.game.invoke("0xCD018C591F94CB43", p0, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x75BA1CB3B7D40CAF"] = (ped, p1) => 
{
	return mp.game.invoke("0x75BA1CB3B7D40CAF", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.IS_TRACKED_PED_VISIBLE = (ped) => 
{
	return mp.game.invoke("0x91C8E617F64188AC", ped);
}


// Arg:p0 is [Any]	
g_Natives["0x511F1A683387C7E2"] = (p0) => 
{
	return mp.game.invoke("0x511F1A683387C7E2", p0);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_TRACKED = (ped) => 
{
	return mp.game.invoke("0x4C5E1F087CD10BB7", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	
g_Natives.HAS_PED_RECEIVED_EVENT = (ped, p1) => 
{
	return mp.game.invoke("0x8507BCB710FA6DC0", ped, p1);
}


// Arg:ped1 is [Ped]	Arg:ped2 is [Ped]	
g_Natives._CAN_PED_SEE_PED = (ped1, ped2) => 
{
	return mp.game.invoke("0x6CD5A433374D4CFB", ped1, ped2);
}


// Arg:p0 is [Ped]	Arg:p1 is [Any*]	
g_Natives["0x9C6A6C19B6C0C496"] = (p0, p1) => 
{
	return mp.game.invoke("0x9C6A6C19B6C0C496", p0, p1);
}


// Arg:ped is [Ped]	Arg:boneId is [int]	
g_Natives.GET_PED_BONE_INDEX = (ped, boneId) => 
{
	return mp.game.invoke("0x3F428D08BE5AAE31", ped, boneId);
}


// Arg:ped is [Ped]	Arg:bone is [int]	
g_Natives.GET_PED_RAGDOLL_BONE_INDEX = (ped, bone) => 
{
	return mp.game.invoke("0x2057EF813397A772", ped, bone);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_ENVEFF_SCALE = (ped, value) => 
{
	return mp.game.invoke("0xBF29516833893561", ped, value);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_ENVEFF_SCALE = (ped) => 
{
	return mp.game.invoke("0x9C14D30395A51A3C", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_ENABLE_PED_ENVEFF_SCALE = (ped, toggle) => 
{
	return mp.game.invoke("0xD2C5AA0C0E8D0F1E", ped, toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives["0x110F526AB784111F"] = (ped, p1) => 
{
	return mp.game.invoke("0x110F526AB784111F", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	
g_Natives["0xD69411AA0CEBF9E9"] = (ped, p1, p2, p3) => 
{
	return mp.game.invoke("0xD69411AA0CEBF9E9", ped, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x1216E0BFA72CC703"] = (p0, p1) => 
{
	return mp.game.invoke("0x1216E0BFA72CC703", p0, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives["0x2B5AA717A181FB4C"] = (ped, p1) => 
{
	return mp.game.invoke("0x2B5AA717A181FB4C", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives["0xB8B52E498014F5B0"] = (ped) => 
{
	return mp.game.invoke("0xB8B52E498014F5B0", ped);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:roll is [float]	Arg:pitch is [float]	Arg:yaw is [float]	Arg:p6 is [int]	
g_Natives.CREATE_SYNCHRONIZED_SCENE = (posX, posY, posZ, roll, pitch, yaw, p6) => 
{
	return mp.game.invoke("0x8C18E0F9080ADD73", posX, posY, posZ, roll, pitch, yaw, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:object is [Hash]	
g_Natives._CREATE_SYNCHRONIZED_SCENE_2 = (x, y, z, radius, object) => 
{
	return mp.game.invoke("0x62EC273D00187DCA", x, y, z, radius, object);
}


// Arg:sceneId is [int]	
g_Natives.IS_SYNCHRONIZED_SCENE_RUNNING = (sceneId) => 
{
	return mp.game.invoke("0x25D39B935A038A26", sceneId);
}


// Arg:sceneID is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:roll is [float]	Arg:pitch is [float]	Arg:yaw is [float]	Arg:unk is [int]	
g_Natives.SET_SYNCHRONIZED_SCENE_ORIGIN = (sceneID, x, y, z, roll, pitch, yaw, unk) => 
{
	return mp.game.invoke("0x6ACF6B7225801CD7", sceneID, x, y, z, roll, pitch, yaw, unk);
}


// Arg:sceneID is [int]	Arg:phase is [float]	
g_Natives.SET_SYNCHRONIZED_SCENE_PHASE = (sceneID, phase) => 
{
	return mp.game.invoke("0x734292F4F0ABF6D0", sceneID, phase);
}


// Arg:sceneID is [int]	
g_Natives.GET_SYNCHRONIZED_SCENE_PHASE = (sceneID) => 
{
	return mp.game.invoke("0xE4A310B1D7FA73CC", sceneID);
}


// Arg:sceneID is [int]	Arg:rate is [float]	
g_Natives.SET_SYNCHRONIZED_SCENE_RATE = (sceneID, rate) => 
{
	return mp.game.invoke("0xB6C49F8A5E295A5D", sceneID, rate);
}


// Arg:sceneID is [int]	
g_Natives.GET_SYNCHRONIZED_SCENE_RATE = (sceneID) => 
{
	return mp.game.invoke("0xD80932D577274D40", sceneID);
}


// Arg:sceneID is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_SYNCHRONIZED_SCENE_LOOPED = (sceneID, toggle) => 
{
	return mp.game.invoke("0xD9A897A4C6C2974F", sceneID, toggle);
}


// Arg:sceneID is [int]	
g_Natives.IS_SYNCHRONIZED_SCENE_LOOPED = (sceneID) => 
{
	return mp.game.invoke("0x62522002E0C391BA", sceneID);
}


// Arg:sceneID is [int]	Arg:p1 is [BOOL]	
g_Natives._SET_SYNCHRONIZED_SCENE_OCCLUSION_PORTAL = (sceneID, p1) => 
{
	return mp.game.invoke("0x394B9CD12435C981", sceneID, p1);
}


// Arg:SceneID is [int]	
g_Natives["0x7F2F4F13AC5257EF"] = (SceneID) => 
{
	return mp.game.invoke("0x7F2F4F13AC5257EF", SceneID);
}


// Arg:sceneID is [int]	Arg:entity is [Entity]	Arg:boneIndex is [int]	
g_Natives.ATTACH_SYNCHRONIZED_SCENE_TO_ENTITY = (sceneID, entity, boneIndex) => 
{
	return mp.game.invoke("0x272E4723B56A3B96", sceneID, entity, boneIndex);
}


// Arg:sceneID is [int]	
g_Natives.DETACH_SYNCHRONIZED_SCENE = (sceneID) => 
{
	return mp.game.invoke("0x6D38F1F04CBB37EA", sceneID);
}


// Arg:scene is [int]	
g_Natives._DISPOSE_SYNCHRONIZED_SCENE = (scene) => 
{
	return mp.game.invoke("0xCD9CC7E200A52A6F", scene);
}


// Arg:ped is [Ped]	Arg:motionStateHash is [Hash]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.FORCE_PED_MOTION_STATE = (ped, motionStateHash, p2, p3, p4) => 
{
	return mp.game.invoke("0xF28965D04F570DCA", ped, motionStateHash, p2, p3, p4);
}


// Arg:ped is [Ped]	Arg:p1 is [Any*]	Arg:p2 is [float*]	
g_Natives["0xF60165E1D2C5370B"] = (ped, p1, p2) => 
{
	return mp.game.invoke("0xF60165E1D2C5370B", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_MAX_MOVE_BLEND_RATIO = (ped, value) => 
{
	return mp.game.invoke("0x433083750C5E064A", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_MIN_MOVE_BLEND_RATIO = (ped, value) => 
{
	return mp.game.invoke("0x01A898D26E2333DD", ped, value);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_MOVE_RATE_OVERRIDE = (ped, value) => 
{
	return mp.game.invoke("0x085BF80FA50A39D1", ped, value);
}


// Arg:ped is [Ped]	Arg:flag is [int]	
g_Natives["0x46B05BCAE43856B0"] = (ped, flag) => 
{
	return mp.game.invoke("0x46B05BCAE43856B0", ped, flag);
}


// Arg:ped is [Ped]	Arg:sizeAndVehs is [int*]	
g_Natives.GET_PED_NEARBY_VEHICLES = (ped, sizeAndVehs) => 
{
	return mp.game.invoke("0xCFF869CBFA210D82", ped, sizeAndVehs);
}


// Arg:ped is [Ped]	Arg:sizeAndPeds is [int*]	Arg:ignore is [int]	
g_Natives.GET_PED_NEARBY_PEDS = (ped, sizeAndPeds, ignore) => 
{
	return mp.game.invoke("0x23F8F5FC7E8C4A6B", ped, sizeAndPeds, ignore);
}


// Arg:ped is [Ped]	
g_Natives["0x7350823473013C02"] = (ped) => 
{
	return mp.game.invoke("0x7350823473013C02", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_USING_ACTION_MODE = (ped) => 
{
	return mp.game.invoke("0x00E73468D085F745", ped);
}


// Arg:ped is [Ped]	Arg:state is [BOOL]	Arg:timeout is [int]	Arg:action is [char*]	
g_Natives.SET_PED_USING_ACTION_MODE = (ped, state, timeout, action) => 
{
	return mp.game.invoke("0xD75ACCF5E0FB5367", ped, state, timeout, action);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	
g_Natives["0x781DE8FA214E87D2"] = (ped, p1) => 
{
	return mp.game.invoke("0x781DE8FA214E87D2", ped, p1);
}


// Arg:ped is [Ped]	Arg:value is [float]	
g_Natives.SET_PED_CAPSULE = (ped, value) => 
{
	return mp.game.invoke("0x364DF566EC833DE2", ped, value);
}


// Arg:ped is [Ped]	
g_Natives.REGISTER_PEDHEADSHOT = (ped) => 
{
	return mp.game.invoke("0x4462658788425076", ped);
}


// Arg:p0 is [Any]	
g_Natives.GET_QUADBIKE_DISPLAY_VARIATIONS = (p0) => 
{
	return mp.game.invoke("0x953563CE563143AF", p0);
}


// Arg:handle is [int]	
g_Natives.UNREGISTER_PEDHEADSHOT = (handle) => 
{
	return mp.game.invoke("0x96B1361D9B24C2FF", handle);
}


// Arg:handle is [int]	
g_Natives.IS_PEDHEADSHOT_VALID = (handle) => 
{
	return mp.game.invoke("0xA0A9668F158129A2", handle);
}


// Arg:handle is [int]	
g_Natives.IS_PEDHEADSHOT_READY = (handle) => 
{
	return mp.game.invoke("0x7085228842B13A67", handle);
}


// Arg:handle is [int]	
g_Natives.GET_PEDHEADSHOT_TXD_STRING = (handle) => 
{
	return mp.game.invoke("0xDB4EACD4AD0A5D6B", handle);
}


// Arg:headshotHandle is [int]	
g_Natives["0xF0DAEF2F545BEE25"] = (headshotHandle) => 
{
	return mp.game.invoke("0xF0DAEF2F545BEE25", headshotHandle);
}


// Arg:p0 is [Any]	
g_Natives["0x5D517B27CF6ECD04"] = (p0) => 
{
	return mp.game.invoke("0x5D517B27CF6ECD04", p0);
}

g_Natives["0xEBB376779A760AA8"] = () => 
{
	return mp.game.invoke("0xEBB376779A760AA8");
}

g_Natives["0x876928DDDFCCC9CD"] = () => 
{
	return mp.game.invoke("0x876928DDDFCCC9CD");
}

g_Natives["0xE8A169E666CBC541"] = () => 
{
	return mp.game.invoke("0xE8A169E666CBC541");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives._SET_PED_HEATSCALE_OVERRIDE = (p0, p1) => 
{
	return mp.game.invoke("0xC1F6EBF9A3D55538", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x600048C60D5C2C51"] = (p0) => 
{
	return mp.game.invoke("0x600048C60D5C2C51", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:interiorFlags is [int]	Arg:scale is [float]	Arg:duration is [int]	
g_Natives["0x2DF9038C90AD5264"] = (p0, p1, p2, p3, p4, interiorFlags, scale, duration) => 
{
	return mp.game.invoke("0x2DF9038C90AD5264", p0, p1, p2, p3, p4, interiorFlags, scale, duration);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:interiorFlags is [int]	Arg:scale is [float]	Arg:duration is [int]	
g_Natives["0xB2AFF10216DEFA2F"] = (x, y, z, p3, p4, p5, p6, interiorFlags, scale, duration) => 
{
	return mp.game.invoke("0xB2AFF10216DEFA2F", x, y, z, p3, p4, p5, p6, interiorFlags, scale, duration);
}

g_Natives["0xFEE4A5459472A9F8"] = () => 
{
	return mp.game.invoke("0xFEE4A5459472A9F8");
}

g_Natives["0x3C67506996001F5E"] = () => 
{
	return mp.game.invoke("0x3C67506996001F5E");
}

g_Natives["0xA586FBEB32A53DBB"] = () => 
{
	return mp.game.invoke("0xA586FBEB32A53DBB");
}

g_Natives["0xF445DE8DA80A1792"] = () => 
{
	return mp.game.invoke("0xF445DE8DA80A1792");
}

g_Natives["0xA635C11B8C44AFC2"] = () => 
{
	return mp.game.invoke("0xA635C11B8C44AFC2");
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x280C7E3AC7F56E90"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x280C7E3AC7F56E90", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0xB782F8238512BAD5"] = (p0, p1) => 
{
	return mp.game.invoke("0xB782F8238512BAD5", p0, p1);
}


// Arg:ped is [Ped]	Arg:ikIndex is [int]	Arg:entityLookAt is [Entity]	Arg:boneLookAt is [int]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:p7 is [Any]	Arg:blendInDuration is [int]	Arg:blendOutDuration is [int]	
g_Natives.SET_IK_TARGET = (ped, ikIndex, entityLookAt, boneLookAt, offsetX, offsetY, offsetZ, p7, blendInDuration, blendOutDuration) => 
{
	return mp.game.invoke("0xC32779C16FCEECD9", ped, ikIndex, entityLookAt, boneLookAt, offsetX, offsetY, offsetZ, p7, blendInDuration, blendOutDuration);
}


// Arg:ped is [Ped]	
g_Natives["0xED3C76ADFA6D07C4"] = (ped) => 
{
	return mp.game.invoke("0xED3C76ADFA6D07C4", ped);
}


// Arg:asset is [char*]	
g_Natives.REQUEST_ACTION_MODE_ASSET = (asset) => 
{
	return mp.game.invoke("0x290E2780BB7AA598", asset);
}


// Arg:asset is [char*]	
g_Natives.HAS_ACTION_MODE_ASSET_LOADED = (asset) => 
{
	return mp.game.invoke("0xE4B5F4BF2CB24E65", asset);
}


// Arg:asset is [char*]	
g_Natives.REMOVE_ACTION_MODE_ASSET = (asset) => 
{
	return mp.game.invoke("0x13E940F88470FA51", asset);
}


// Arg:asset is [char*]	
g_Natives.REQUEST_STEALTH_MODE_ASSET = (asset) => 
{
	return mp.game.invoke("0x2A0A62FCDEE16D4F", asset);
}


// Arg:asset is [char*]	
g_Natives.HAS_STEALTH_MODE_ASSET_LOADED = (asset) => 
{
	return mp.game.invoke("0xE977FC5B08AF3441", asset);
}


// Arg:asset is [char*]	
g_Natives.REMOVE_STEALTH_MODE_ASSET = (asset) => 
{
	return mp.game.invoke("0x9219857D21F0E842", asset);
}


// Arg:ped is [Ped]	Arg:multiplier is [float]	
g_Natives.SET_PED_LOD_MULTIPLIER = (ped, multiplier) => 
{
	return mp.game.invoke("0xDC2C5C242AAC342B", ped, multiplier);
}


// Arg:p0 is [Pickup]	Arg:p1 is [Any]	Arg:p2 is [Blip*]	
g_Natives["0xE861D0B05C7662B8"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE861D0B05C7662B8", p0, p1, p2);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives["0x129466ED55140F8D"] = (ped, toggle) => 
{
	return mp.game.invoke("0x129466ED55140F8D", ped, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xCB968B53FC7F916D"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xCB968B53FC7F916D", p0, p1, p2, p3);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	
g_Natives["0x68772DB2B2526F9F"] = (ped, x, y, z, range) => 
{
	return mp.game.invoke("0x68772DB2B2526F9F", ped, x, y, z, range);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives["0x06087579E7AA85A9"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x06087579E7AA85A9", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0xD8C3BE3EE94CAF2D"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xD8C3BE3EE94CAF2D", p0, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	
g_Natives["0xD33DAA36272177C4"] = (ped) => 
{
	return mp.game.invoke("0xD33DAA36272177C4", ped);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x83A169EABCDB10A2"] = (p0, p1) => 
{
	return mp.game.invoke("0x83A169EABCDB10A2", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x288DF530C92DAD6F"] = (p0, p1) => 
{
	return mp.game.invoke("0x288DF530C92DAD6F", p0, p1);
}


// Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	
g_Natives.CREATE_VEHICLE = (modelHash, x, y, z, heading, isNetwork, thisScriptCheck) => 
{
	return mp.game.invoke("0xAF35D0D2583051B0", modelHash, x, y, z, heading, isNetwork, thisScriptCheck);
}


// Arg:vehicle is [Vehicle*]	
g_Natives.DELETE_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xEA386986E786A54F", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x7D6F9A3EF26136A0"] = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x7D6F9A3EF26136A0", vehicle, p1, p2);
}


// Arg:veh is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_ALLOW_NO_PASSENGERS_LOCKON = (veh, toggle) => 
{
	return mp.game.invoke("0x5D14D4154BFE7B2C", veh, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_VEHICLE_WEAPON_TARGET_LOCK_STATUS = (vehicle) => 
{
	return mp.game.invoke("0xE6B0E8CFC3633BF0", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:model is [Hash]	
g_Natives.IS_VEHICLE_MODEL = (vehicle, model) => 
{
	return mp.game.invoke("0x423E8DE37D934D89", vehicle, model);
}


// Arg:v is [int]	
g_Natives.DOES_SCRIPT_VEHICLE_GENERATOR_EXIST = (v) => 
{
	return mp.game.invoke("0xF6086BC836400876", v);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:modelHash is [Hash]	Arg:p7 is [int]	Arg:p8 is [int]	Arg:p9 is [int]	Arg:p10 is [int]	Arg:p11 is [BOOL]	Arg:p12 is [BOOL]	Arg:p13 is [BOOL]	Arg:p14 is [BOOL]	Arg:p15 is [BOOL]	Arg:p16 is [int]	
g_Natives.CREATE_SCRIPT_VEHICLE_GENERATOR = (x, y, z, heading, p4, p5, modelHash, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16) => 
{
	return mp.game.invoke("0x9DEF883114668116", x, y, z, heading, p4, p5, modelHash, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16);
}


// Arg:vehicleGenerator is [int]	
g_Natives.DELETE_SCRIPT_VEHICLE_GENERATOR = (vehicleGenerator) => 
{
	return mp.game.invoke("0x22102C9ABFCF125D", vehicleGenerator);
}


// Arg:vehicleGenerator is [int]	Arg:enabled is [BOOL]	
g_Natives.SET_SCRIPT_VEHICLE_GENERATOR = (vehicleGenerator, enabled) => 
{
	return mp.game.invoke("0xD9D620E0AC6DC4B0", vehicleGenerator, enabled);
}


// Arg:minX is [float]	Arg:minY is [float]	Arg:minZ is [float]	Arg:maxX is [float]	Arg:maxY is [float]	Arg:maxZ is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.SET_ALL_VEHICLE_GENERATORS_ACTIVE_IN_AREA = (minX, minY, minZ, maxX, maxY, maxZ, p6, p7) => 
{
	return mp.game.invoke("0xC12321827687FE4D", minX, minY, minZ, maxX, maxY, maxZ, p6, p7);
}

g_Natives.SET_ALL_VEHICLE_GENERATORS_ACTIVE = () => 
{
	return mp.game.invoke("0x34AD89078831A4BC");
}


// Arg:active is [BOOL]	
g_Natives.SET_ALL_LOW_PRIORITY_VEHICLE_GENERATORS_ACTIVE = (active) => 
{
	return mp.game.invoke("0x608207E7A8FB787C", active);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x9A75585FB2E54FAD"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x9A75585FB2E54FAD", p0, p1, p2, p3);
}

g_Natives["0x0A436B8643716D14"] = () => 
{
	return mp.game.invoke("0x0A436B8643716D14");
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_VEHICLE_ON_GROUND_PROPERLY = (vehicle) => 
{
	return mp.game.invoke("0x49733E92263139D1", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.SET_ALL_VEHICLES_SPAWN = (vehicle, p1, p2, p3) => 
{
	return mp.game.invoke("0xE023E8AC4EF7C117", vehicle, p1, p2, p3);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_STUCK_ON_ROOF = (vehicle) => 
{
	return mp.game.invoke("0xB497F06B288DCFDF", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.ADD_VEHICLE_UPSIDEDOWN_CHECK = (vehicle) => 
{
	return mp.game.invoke("0xB72E26D81006005B", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.REMOVE_VEHICLE_UPSIDEDOWN_CHECK = (vehicle) => 
{
	return mp.game.invoke("0xC53EB42A499A7E90", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_STOPPED = (vehicle) => 
{
	return mp.game.invoke("0x5721B434AD84D57A", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_NUMBER_OF_PASSENGERS = (vehicle) => 
{
	return mp.game.invoke("0x24CB2137731FFE89", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MAX_NUMBER_OF_PASSENGERS = (vehicle) => 
{
	return mp.game.invoke("0xA7C4F2C6E744A550", vehicle);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_VEHICLE_MODEL_NUMBER_OF_SEATS = (modelHash) => 
{
	return mp.game.invoke("0x2AD93716F184EDA4", modelHash);
}


// Arg:vehicle is [Vehicle]	Arg:flag is [BOOL]	
g_Natives["0xF7F203E31F96F6A1"] = (vehicle, flag) => 
{
	return mp.game.invoke("0xF7F203E31F96F6A1", vehicle, flag);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives["0xE33FFA906CE74880"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE33FFA906CE74880", vehicle, p1);
}


// Arg:multiplier is [float]	
g_Natives.SET_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME = (multiplier) => 
{
	return mp.game.invoke("0x245A6883D966D537", multiplier);
}


// Arg:multiplier is [float]	
g_Natives.SET_RANDOM_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME = (multiplier) => 
{
	return mp.game.invoke("0xB3B3359379FE77D3", multiplier);
}


// Arg:multiplier is [float]	
g_Natives.SET_PARKED_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME = (multiplier) => 
{
	return mp.game.invoke("0xEAE6DCC7EEE3DB1D", multiplier);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_DISABLE_RANDOM_TRAINS_THIS_FRAME = (toggle) => 
{
	return mp.game.invoke("0xD4B8E3D1917BC86B", toggle);
}


// Arg:value is [float]	
g_Natives._SET_SOME_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME = (value) => 
{
	return mp.game.invoke("0x90B6DA738A9A25DA", value);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_FAR_DRAW_VEHICLES = (toggle) => 
{
	return mp.game.invoke("0x26324F33423F3CC3", toggle);
}


// Arg:value is [int]	
g_Natives.SET_NUMBER_OF_PARKED_VEHICLES = (value) => 
{
	return mp.game.invoke("0xCAA15F13EBD417FF", value);
}


// Arg:vehicle is [int*]	Arg:doorLockStatus is [float*]	
g_Natives.SET_VEHICLE_DOORS_LOCKED = (vehicle, doorLockStatus) => 
{
	return mp.game.invoke("0xB664292EAECF7FA6", vehicle, doorLockStatus);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:destroyType is [int]	
g_Natives.SET_PED_TARGETTABLE_VEHICLE_DESTROY = (vehicle, doorIndex, destroyType) => 
{
	return mp.game.invoke("0xBE70724027F85BCD", vehicle, doorIndex, destroyType);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_VEHICLE_IMPACT_EXPLOSION_ACTIVATION = (vehicle, toggle) => 
{
	return mp.game.invoke("0xD8050E0EB60CF274", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_DOORS_LOCKED_FOR_PLAYER = (vehicle, player, toggle) => 
{
	return mp.game.invoke("0x517AAF684BB50CD1", vehicle, player, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:player is [Player]	
g_Natives.GET_VEHICLE_DOORS_LOCKED_FOR_PLAYER = (vehicle, player) => 
{
	return mp.game.invoke("0xF6AF6CB341349015", vehicle, player);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_DOORS_LOCKED_FOR_ALL_PLAYERS = (vehicle, toggle) => 
{
	return mp.game.invoke("0xA2F80B8D040727CC", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_DOORS_LOCKED_FOR_NON_SCRIPT_PLAYERS = (vehicle, toggle) => 
{
	return mp.game.invoke("0x9737A37136F07E75", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:team is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_DOORS_LOCKED_FOR_TEAM = (vehicle, team, toggle) => 
{
	return mp.game.invoke("0xB81F6D4A8F5EEBA8", vehicle, team, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	
g_Natives.EXPLODE_VEHICLE = (vehicle, isAudible, isInvisible) => 
{
	return mp.game.invoke("0xBA71116ADF5B514C", vehicle, isAudible, isInvisible);
}


// Arg:vehicle is [Vehicle]	Arg:killDriver is [BOOL]	Arg:explodeOnImpact is [BOOL]	
g_Natives.SET_VEHICLE_OUT_OF_CONTROL = (vehicle, killDriver, explodeOnImpact) => 
{
	return mp.game.invoke("0xF19D095E42D430CC", vehicle, killDriver, explodeOnImpact);
}


// Arg:vehicle is [Vehicle]	Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_TIMED_EXPLOSION = (vehicle, ped, toggle) => 
{
	return mp.game.invoke("0x2E0A74E1002380B1", vehicle, ped, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.ADD_VEHICLE_PHONE_EXPLOSIVE_DEVICE = (vehicle) => 
{
	return mp.game.invoke("0x99AD4CCCB128CBC9", vehicle);
}

g_Natives.HAS_VEHICLE_PHONE_EXPLOSIVE_DEVICE = () => 
{
	return mp.game.invoke("0x6ADAABD3068C5235");
}

g_Natives.DETONATE_VEHICLE_PHONE_EXPLOSIVE_DEVICE = () => 
{
	return mp.game.invoke("0xEF49CF0270307CBE");
}


// Arg:vehicle is [Vehicle]	
g_Natives["0xAE3FEE8709B39DCB"] = (vehicle) => 
{
	return mp.game.invoke("0xAE3FEE8709B39DCB", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_TAXI_LIGHTS = (vehicle, state) => 
{
	return mp.game.invoke("0x598803E85E8448D9", vehicle, state);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_TAXI_LIGHT_ON = (vehicle) => 
{
	return mp.game.invoke("0x7504C0F113AB50FC", vehicle);
}


// Arg:garageName is [char*]	Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_IN_GARAGE_AREA = (garageName, vehicle) => 
{
	return mp.game.invoke("0xCEE4490CD57BB3C2", garageName, vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:colorPrimary is [int]	Arg:colorSecondary is [int]	
g_Natives.SET_VEHICLE_COLOURS = (vehicle, colorPrimary, colorSecondary) => 
{
	return mp.game.invoke("0x4F1D4BE3A7F24601", vehicle, colorPrimary, colorSecondary);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_FULLBEAM = (vehicle, toggle) => 
{
	return mp.game.invoke("0x8B7FD87F0DDB421E", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.STEER_UNLOCK_BIAS = (vehicle, toggle) => 
{
	return mp.game.invoke("0x07116E24E9D1929D", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives.SET_VEHICLE_CUSTOM_PRIMARY_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0x7141766F91D15BEA", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_VEHICLE_CUSTOM_PRIMARY_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0xB64CF2CCA9D95F52", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	
g_Natives.CLEAR_VEHICLE_CUSTOM_PRIMARY_COLOUR = (vehicle) => 
{
	return mp.game.invoke("0x55E1D2758F34E437", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_IS_VEHICLE_PRIMARY_COLOUR_CUSTOM = (vehicle) => 
{
	return mp.game.invoke("0xF095C0405307B21B", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives.SET_VEHICLE_CUSTOM_SECONDARY_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0x36CED73BFED89754", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_VEHICLE_CUSTOM_SECONDARY_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0x8389CD56CA8072DC", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	
g_Natives.CLEAR_VEHICLE_CUSTOM_SECONDARY_COLOUR = (vehicle) => 
{
	return mp.game.invoke("0x5FFBDEEC3E8E2009", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_IS_VEHICLE_SECONDARY_COLOUR_CUSTOM = (vehicle) => 
{
	return mp.game.invoke("0x910A32E7AAD2656C", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:fade is [float]	
g_Natives.SET_VEHICLE_ENVEFF_SCALE = (vehicle, fade) => 
{
	return mp.game.invoke("0x3AFDC536C3D01674", vehicle, fade);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_ENVEFF_SCALE = (vehicle) => 
{
	return mp.game.invoke("0xA82819CAC9C4C403", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_CAN_RESPRAY_VEHICLE = (vehicle, state) => 
{
	return mp.game.invoke("0x52BBA29D5EC69356", vehicle, state);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x33506883545AC0DF"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x33506883545AC0DF", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:yaw is [float]	Arg:pitch is [float]	Arg:roll is [float]	
g_Natives._JITTER_VEHICLE = (vehicle, p1, yaw, pitch, roll) => 
{
	return mp.game.invoke("0xC59872A5134879C7", vehicle, p1, yaw, pitch, roll);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_BOAT_ANCHOR = (vehicle, toggle) => 
{
	return mp.game.invoke("0x75DBEC174AEEAD10", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_BOAT_ANCHOR = (vehicle) => 
{
	return mp.game.invoke("0x26C10ECBDA5D043B", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xE3EBAAE484798530"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE3EBAAE484798530", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xB28B1FE5BFADD7F5"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xB28B1FE5BFADD7F5", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0xE842A9398079BD82"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE842A9398079BD82", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives["0x8F719973E1445BA2"] = (vehicle, toggle) => 
{
	return mp.game.invoke("0x8F719973E1445BA2", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_SIREN = (vehicle, toggle) => 
{
	return mp.game.invoke("0xF4924635A19EB37D", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_SIREN_ON = (vehicle) => 
{
	return mp.game.invoke("0x4C9BF537BE2634B2", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_VEHICLE_SIREN_SOUND_ON = (vehicle) => 
{
	return mp.game.invoke("0xB5CC40FBCB586380", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_STRONG = (vehicle, toggle) => 
{
	return mp.game.invoke("0x3E8C8727991A8A0B", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.REMOVE_VEHICLE_STUCK_CHECK = (vehicle) => 
{
	return mp.game.invoke("0x8386BFB614D06749", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:colorPrimary is [int*]	Arg:colorSecondary is [int*]	
g_Natives.GET_VEHICLE_COLOURS = (vehicle, colorPrimary, colorSecondary) => 
{
	return mp.game.invoke("0xA19435F193E081AC", vehicle, colorPrimary, colorSecondary);
}


// Arg:vehicle is [Vehicle]	Arg:seatIndex is [int]	
g_Natives.IS_VEHICLE_SEAT_FREE = (vehicle, seatIndex) => 
{
	return mp.game.invoke("0x22AC59A870E6A669", vehicle, seatIndex);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	
g_Natives.GET_PED_IN_VEHICLE_SEAT = (vehicle, index) => 
{
	return mp.game.invoke("0xBB40DD2270B65366", vehicle, index);
}


// Arg:vehicle is [Vehicle]	Arg:seatIndex is [int]	
g_Natives.GET_LAST_PED_IN_VEHICLE_SEAT = (vehicle, seatIndex) => 
{
	return mp.game.invoke("0x83F969AA1EE2A664", vehicle, seatIndex);
}


// Arg:vehicle is [Vehicle]	Arg:lightsOn is [BOOL*]	Arg:highbeamsOn is [BOOL*]	
g_Natives.GET_VEHICLE_LIGHTS_STATE = (vehicle, lightsOn, highbeamsOn) => 
{
	return mp.game.invoke("0xB91B4C20085BD12F", vehicle, lightsOn, highbeamsOn);
}


// Arg:vehicle is [Vehicle]	Arg:wheelID is [int]	Arg:completely is [BOOL]	
g_Natives.IS_VEHICLE_TYRE_BURST = (vehicle, wheelID, completely) => 
{
	return mp.game.invoke("0xBA291848A0815CA9", vehicle, wheelID, completely);
}


// Arg:vehicle is [Vehicle]	Arg:speed is [float]	
g_Natives.SET_VEHICLE_FORWARD_SPEED = (vehicle, speed) => 
{
	return mp.game.invoke("0xAB54A438726D25D5", vehicle, speed);
}


// Arg:vehicle is [Vehicle]	Arg:distance is [float]	Arg:type is [int]	Arg:unknown is [BOOL]	
g_Natives.BRING_VEHICLE_TO_HALT = (vehicle, distance, type, unknown) => 
{
	return mp.game.invoke("0x260BE8F09E326A20", vehicle, distance, type, unknown);
}


// Arg:vehicle is [Vehicle]	Arg:height is [float]	
g_Natives._SET_VEHICLE_FORKLIFT_HEIGHT = (vehicle, height) => 
{
	return mp.game.invoke("0x37EBBF3117BD6A25", vehicle, height);
}


// Arg:vehicle is [Vehicle]	Arg:entity is [Entity]	
g_Natives.SET_PED_ENABLED_BIKE_RINGTONE = (vehicle, entity) => 
{
	return mp.game.invoke("0x57715966069157AD", vehicle, entity);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x62CA17B74C435651"] = (vehicle) => 
{
	return mp.game.invoke("0x62CA17B74C435651", vehicle);
}


// Arg:object is [Vehicle]	
g_Natives._GET_VEHICLE_ATTACHED_TO_ENTITY = (object) => 
{
	return mp.game.invoke("0x375E7FC44F21C8AB", object);
}


// Arg:vehicle is [Vehicle]	Arg:entity is [Entity]	
g_Natives["0x89D630CF5EA96D23"] = (vehicle, entity) => 
{
	return mp.game.invoke("0x89D630CF5EA96D23", vehicle, entity);
}


// Arg:vehicle is [Vehicle]	Arg:entity is [Entity]	
g_Natives["0x6A98C2ECF57FA5D4"] = (vehicle, entity) => 
{
	return mp.game.invoke("0x6A98C2ECF57FA5D4", vehicle, entity);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x7C0043FDFF6436BC"] = (vehicle) => 
{
	return mp.game.invoke("0x7C0043FDFF6436BC", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x8AA9180DE2FEDD45"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x8AA9180DE2FEDD45", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x0A6A279F3AA4FD70"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x0A6A279F3AA4FD70", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x634148744F385576"] = (vehicle) => 
{
	return mp.game.invoke("0x634148744F385576", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0xE6F13851780394DA"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE6F13851780394DA", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	Arg:onRim is [BOOL]	Arg:p3 is [float]	
g_Natives.SET_VEHICLE_TYRE_BURST = (vehicle, index, onRim, p3) => 
{
	return mp.game.invoke("0xEC6A202EE4960385", vehicle, index, onRim, p3);
}


// Arg:vehicle is [Vehicle]	Arg:closeInstantly is [BOOL]	
g_Natives.SET_VEHICLE_DOORS_SHUT = (vehicle, closeInstantly) => 
{
	return mp.game.invoke("0x781B3D62BB013EF5", vehicle, closeInstantly);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_TYRES_CAN_BURST = (vehicle, toggle) => 
{
	return mp.game.invoke("0xEB9DC3C7D8596C46", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_TYRES_CAN_BURST = (vehicle) => 
{
	return mp.game.invoke("0x678B9BB8C3F58FEB", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:enabled is [BOOL]	
g_Natives.SET_VEHICLE_WHEELS_CAN_BREAK = (vehicle, enabled) => 
{
	return mp.game.invoke("0x29B18B4FD460CA8F", vehicle, enabled);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:loose is [BOOL]	Arg:openInstantly is [BOOL]	
g_Natives.SET_VEHICLE_DOOR_OPEN = (vehicle, doorIndex, loose, openInstantly) => 
{
	return mp.game.invoke("0x7C65DAC73C35C862", vehicle, doorIndex, loose, openInstantly);
}


// Arg:vehicle is [Vehicle]	Arg:windowIndex is [int]	
g_Natives.REMOVE_VEHICLE_WINDOW = (vehicle, windowIndex) => 
{
	return mp.game.invoke("0xA711568EEDB43069", vehicle, windowIndex);
}


// Arg:vehicle is [Vehicle]	
g_Natives.ROLL_DOWN_WINDOWS = (vehicle) => 
{
	return mp.game.invoke("0x85796B0549DDE156", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:windowIndex is [int]	
g_Natives.ROLL_DOWN_WINDOW = (vehicle, windowIndex) => 
{
	return mp.game.invoke("0x7AD9E6CE657D69E3", vehicle, windowIndex);
}


// Arg:vehicle is [Vehicle]	Arg:windowIndex is [int]	
g_Natives.ROLL_UP_WINDOW = (vehicle, windowIndex) => 
{
	return mp.game.invoke("0x602E548F46E24D59", vehicle, windowIndex);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	
g_Natives.SMASH_VEHICLE_WINDOW = (vehicle, index) => 
{
	return mp.game.invoke("0x9E5B5E4D2CCD2259", vehicle, index);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	
g_Natives.FIX_VEHICLE_WINDOW = (vehicle, index) => 
{
	return mp.game.invoke("0x772282EBEB95E682", vehicle, index);
}


// Arg:vehicle is [Vehicle]	
g_Natives._DETACH_VEHICLE_WINDSCREEN = (vehicle) => 
{
	return mp.game.invoke("0x6D645D59FB5F5AD3", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives._EJECT_JB700_ROOF = (vehicle, x, y, z) => 
{
	return mp.game.invoke("0xE38CB9D7D39FDBCC", vehicle, x, y, z);
}


// Arg:vehicle is [Vehicle]	Arg:state is [int]	
g_Natives.SET_VEHICLE_LIGHTS = (vehicle, state) => 
{
	return mp.game.invoke("0x34E710FF01247C5A", vehicle, state);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xC45C27EF50F36ADC"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xC45C27EF50F36ADC", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	
g_Natives._SET_VEHICLE_LIGHTS_MODE = (vehicle, p1) => 
{
	return mp.game.invoke("0x1FD09E7390A74D54", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_VEHICLE_ALARM = (vehicle, state) => 
{
	return mp.game.invoke("0xCDE5E70C1DDB954C", vehicle, state);
}


// Arg:vehicle is [Vehicle]	
g_Natives.START_VEHICLE_ALARM = (vehicle) => 
{
	return mp.game.invoke("0xB8FF7AB45305C345", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_ALARM_ACTIVATED = (vehicle) => 
{
	return mp.game.invoke("0x4319E335B71FFF34", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_INTERIORLIGHT = (vehicle, toggle) => 
{
	return mp.game.invoke("0xBC2042F090AF6AD3", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:multiplier is [float]	
g_Natives.SET_VEHICLE_LIGHT_MULTIPLIER = (vehicle, multiplier) => 
{
	return mp.game.invoke("0xB385454F8791F57C", vehicle, multiplier);
}


// Arg:vehicle is [Vehicle]	Arg:trailer is [Vehicle]	Arg:radius is [float]	
g_Natives.ATTACH_VEHICLE_TO_TRAILER = (vehicle, trailer, radius) => 
{
	return mp.game.invoke("0x3C7D42D58F770B54", vehicle, trailer, radius);
}


// Arg:vehicle is [Vehicle]	Arg:trailer is [Vehicle]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	
g_Natives["0x16B5E274BDE402F8"] = (vehicle, trailer, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x16B5E274BDE402F8", vehicle, trailer, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Entity]	Arg:p2 is [float]	
g_Natives["0x374706271354CB18"] = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x374706271354CB18", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DETACH_VEHICLE_FROM_TRAILER = (vehicle) => 
{
	return mp.game.invoke("0x90532EDF0D2BDD86", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_ATTACHED_TO_TRAILER = (vehicle) => 
{
	return mp.game.invoke("0xE7CF3C4F9F489F0C", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0x2A8F319B392E7B3F"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x2A8F319B392E7B3F", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x95CF53B3D687F9FA"] = (vehicle) => 
{
	return mp.game.invoke("0x95CF53B3D687F9FA", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:tyreIndex is [int]	
g_Natives.SET_VEHICLE_TYRE_FIXED = (vehicle, tyreIndex) => 
{
	return mp.game.invoke("0x6E13FC662B882D1D", vehicle, tyreIndex);
}


// Arg:vehicle is [Vehicle]	Arg:plateText is [char*]	
g_Natives.SET_VEHICLE_NUMBER_PLATE_TEXT = (vehicle, plateText) => 
{
	return mp.game.invoke("0x95A88F0B409CDA47", vehicle, plateText);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_NUMBER_PLATE_TEXT = (vehicle) => 
{
	return mp.game.invoke("0x7CE1CCB9B293020E", vehicle);
}

g_Natives.GET_NUMBER_OF_VEHICLE_NUMBER_PLATES = () => 
{
	return mp.game.invoke("0x4C4D6B2644F458CB");
}


// Arg:vehicle is [Vehicle]	Arg:plateIndex is [int]	
g_Natives.SET_VEHICLE_NUMBER_PLATE_TEXT_INDEX = (vehicle, plateIndex) => 
{
	return mp.game.invoke("0x9088EB5A43FFB0A1", vehicle, plateIndex);
}


// Arg:elegy is [Vehicle]	
g_Natives.GET_VEHICLE_NUMBER_PLATE_TEXT_INDEX = (elegy) => 
{
	return mp.game.invoke("0xF11BC2DD9A3E7195", elegy);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_RANDOM_TRAINS = (toggle) => 
{
	return mp.game.invoke("0x80D9F74197EA47D9", toggle);
}


// Arg:variation is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:direction is [BOOL]	
g_Natives.CREATE_MISSION_TRAIN = (variation, x, y, z, direction) => 
{
	return mp.game.invoke("0x63C6CCA8E68AE8C8", variation, x, y, z, direction);
}


// Arg:intersectionId is [int]	Arg:state is [BOOL]	
g_Natives.SWITCH_TRAIN_TRACK = (intersectionId, state) => 
{
	return mp.game.invoke("0xFD813BB7DB977F20", intersectionId, state);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x21973BBF8D17EDFA"] = (p0, p1) => 
{
	return mp.game.invoke("0x21973BBF8D17EDFA", p0, p1);
}

g_Natives.DELETE_ALL_TRAINS = () => 
{
	return mp.game.invoke("0x736A718577F39C7D");
}


// Arg:train is [Vehicle]	Arg:speed is [float]	
g_Natives.SET_TRAIN_SPEED = (train, speed) => 
{
	return mp.game.invoke("0xAA0BC91BE0B796E3", train, speed);
}


// Arg:train is [Vehicle]	Arg:speed is [float]	
g_Natives.SET_TRAIN_CRUISE_SPEED = (train, speed) => 
{
	return mp.game.invoke("0x16469284DB8C62B5", train, speed);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_RANDOM_BOATS = (toggle) => 
{
	return mp.game.invoke("0x84436EC293B1415F", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_GARBAGE_TRUCKS = (toggle) => 
{
	return mp.game.invoke("0x2AFD795EEAC8D30D", toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DOES_VEHICLE_HAVE_STUCK_VEHICLE_CHECK = (vehicle) => 
{
	return mp.game.invoke("0x57E4C39DE5EE8470", vehicle);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	
g_Natives.GET_VEHICLE_RECORDING_ID = (p0, p1) => 
{
	return mp.game.invoke("0x21543C612379DB3C", p0, p1);
}


// Arg:i is [int]	Arg:name is [char*]	
g_Natives.REQUEST_VEHICLE_RECORDING = (i, name) => 
{
	return mp.game.invoke("0xAF514CABE74CBF15", i, name);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.HAS_VEHICLE_RECORDING_BEEN_LOADED = (p0, p1) => 
{
	return mp.game.invoke("0x300D614A4C785FC4", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.REMOVE_VEHICLE_RECORDING = (p0, p1) => 
{
	return mp.game.invoke("0xF1160ACCF98A3FC8", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x92523B76657A517D"] = (p0, p1) => 
{
	return mp.game.invoke("0x92523B76657A517D", p0, p1);
}


// Arg:p0 is [int]	Arg:p1 is [float]	Arg:p2 is [char*]	
g_Natives.GET_POSITION_OF_VEHICLE_RECORDING_AT_TIME = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD242728AA6F0FBA2", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xF0F2103EFAF8CBA7"] = (p0, p1) => 
{
	return mp.game.invoke("0xF0F2103EFAF8CBA7", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [Any*]	
g_Natives.GET_ROTATION_OF_VEHICLE_RECORDING_AT_TIME = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2058206FBE79A8AD", p0, p1, p2);
}


// Arg:recordingID is [int]	
g_Natives.GET_TOTAL_DURATION_OF_VEHICLE_RECORDING_ID = (recordingID) => 
{
	return mp.game.invoke("0x102D125411A7B6E6", recordingID);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.GET_TOTAL_DURATION_OF_VEHICLE_RECORDING = (p0, p1) => 
{
	return mp.game.invoke("0x0E48D1C262390950", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.GET_POSITION_IN_RECORDING = (p0) => 
{
	return mp.game.invoke("0x2DACD605FC681475", p0);
}


// Arg:p0 is [Any]	
g_Natives.GET_TIME_POSITION_IN_RECORDING = (p0) => 
{
	return mp.game.invoke("0x5746F3A7AB7FE544", p0);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	Arg:playback is [char*]	Arg:p3 is [BOOL]	
g_Natives.START_PLAYBACK_RECORDED_VEHICLE = (vehicle, p1, playback, p3) => 
{
	return mp.game.invoke("0x3F878F92B3A7A071", vehicle, p1, playback, p3);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	Arg:playback is [char*]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.START_PLAYBACK_RECORDED_VEHICLE_WITH_FLAGS = (vehicle, p1, playback, p3, p4, p5) => 
{
	return mp.game.invoke("0x7D80FD645D4DA346", vehicle, p1, playback, p3, p4, p5);
}


// Arg:p0 is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x1F2E4E06DEA8992B"] = (p0, p1) => 
{
	return mp.game.invoke("0x1F2E4E06DEA8992B", p0, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.STOP_PLAYBACK_RECORDED_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0x54833611C17ABDEA", vehicle);
}


// Arg:p0 is [Any]	
g_Natives.PAUSE_PLAYBACK_RECORDED_VEHICLE = (p0) => 
{
	return mp.game.invoke("0x632A689BF42301B1", p0);
}


// Arg:p0 is [Any]	
g_Natives.UNPAUSE_PLAYBACK_RECORDED_VEHICLE = (p0) => 
{
	return mp.game.invoke("0x8879EE09268305D5", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_PLAYBACK_GOING_ON_FOR_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0x1C8A4C2C19E68EEC", vehicle);
}


// Arg:p0 is [Any]	
g_Natives.IS_PLAYBACK_USING_AI_GOING_ON_FOR_VEHICLE = (p0) => 
{
	return mp.game.invoke("0xAEA8FD591FAD4106", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_CURRENT_PLAYBACK_FOR_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0x42BC05C27A946054", vehicle);
}


// Arg:p0 is [Any]	
g_Natives.SKIP_TO_END_AND_STOP_PLAYBACK_RECORDED_VEHICLE = (p0) => 
{
	return mp.game.invoke("0xAB8E2EDA0C0A5883", p0);
}


// Arg:vehicle is [Vehicle]	Arg:speed is [float]	
g_Natives.SET_PLAYBACK_SPEED = (vehicle, speed) => 
{
	return mp.game.invoke("0x6683AB880E427778", vehicle, speed);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [float]	Arg:p4 is [Any]	
g_Natives.START_PLAYBACK_RECORDED_VEHICLE_USING_AI = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x29DE5FA52D00428C", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives.SKIP_TIME_IN_PLAYBACK_RECORDED_VEHICLE = (p0, p1) => 
{
	return mp.game.invoke("0x9438F7AD68771A20", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:flag is [int]	
g_Natives.SET_PLAYBACK_TO_USE_AI = (vehicle, flag) => 
{
	return mp.game.invoke("0xA549C3B37EA28131", vehicle, flag);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	
g_Natives.SET_PLAYBACK_TO_USE_AI_TRY_TO_REVERT_BACK_LATER = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6E63860BBB190730", p0, p1, p2, p3);
}


// Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p4 is [Any]	
g_Natives["0x5845066D8A1EA7F7"] = (vehicle, x, y, z, p4) => 
{
	return mp.game.invoke("0x5845066D8A1EA7F7", vehicle, x, y, z, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x796A877E459B99EA"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x796A877E459B99EA", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0xFAF2A78061FD9EF4"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xFAF2A78061FD9EF4", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x063AE2B2CC273588"] = (p0, p1) => 
{
	return mp.game.invoke("0x063AE2B2CC273588", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives.EXPLODE_VEHICLE_IN_CUTSCENE = (vehicle, p1) => 
{
	return mp.game.invoke("0x786A4EB67B01BF0B", vehicle, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [Any]	
g_Natives.ADD_VEHICLE_STUCK_CHECK_WITH_WARP = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x2FA9923062DD396C", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:model is [Hash]	Arg:suppressed is [BOOL]	
g_Natives.SET_VEHICLE_MODEL_IS_SUPPRESSED = (model, suppressed) => 
{
	return mp.game.invoke("0x0FC2D89AC25A5814", model, suppressed);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:modelHash is [Hash]	Arg:flags is [int]	
g_Natives.GET_RANDOM_VEHICLE_IN_SPHERE = (x, y, z, radius, modelHash, flags) => 
{
	return mp.game.invoke("0x386F6CE5BAF6091C", x, y, z, radius, modelHash, flags);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [int]	Arg:p5 is [int]	Arg:p6 is [int]	
g_Natives.GET_RANDOM_VEHICLE_FRONT_BUMPER_IN_SPHERE = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xC5574E0AEB86BA68", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [int]	Arg:p5 is [int]	Arg:p6 is [int]	
g_Natives.GET_RANDOM_VEHICLE_BACK_BUMPER_IN_SPHERE = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xB50807EABE20A8DC", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:modelHash is [Hash]	Arg:flags is [int]	
g_Natives.GET_CLOSEST_VEHICLE = (x, y, z, radius, modelHash, flags) => 
{
	return mp.game.invoke("0xF73EB622C4F1689B", x, y, z, radius, modelHash, flags);
}


// Arg:train is [Vehicle]	Arg:trailerNumber is [int]	
g_Natives.GET_TRAIN_CARRIAGE = (train, trailerNumber) => 
{
	return mp.game.invoke("0x08AAFD0814722BC3", train, trailerNumber);
}


// Arg:train is [Vehicle*]	
g_Natives.DELETE_MISSION_TRAIN = (train) => 
{
	return mp.game.invoke("0x5B76B14AE875C795", train);
}


// Arg:train is [Vehicle*]	Arg:p1 is [BOOL]	
g_Natives.SET_MISSION_TRAIN_AS_NO_LONGER_NEEDED = (train, p1) => 
{
	return mp.game.invoke("0xBBE7648349B49BE8", train, p1);
}


// Arg:train is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_MISSION_TRAIN_COORDS = (train, x, y, z) => 
{
	return mp.game.invoke("0x591CA673AA6AB736", train, x, y, z);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_BOAT = (model) => 
{
	return mp.game.invoke("0x45A9187928F4B9E3", model);
}


// Arg:model is [Hash]	
g_Natives._IS_THIS_MODEL_A_JETSKI = (model) => 
{
	return mp.game.invoke("0x9537097412CF75FE", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_PLANE = (model) => 
{
	return mp.game.invoke("0xA0948AB42D7BA0DE", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_HELI = (model) => 
{
	return mp.game.invoke("0xDCE4334788AF94EA", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_CAR = (model) => 
{
	return mp.game.invoke("0x7F6DB52EEFC96DF8", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_TRAIN = (model) => 
{
	return mp.game.invoke("0xAB935175B22E822B", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_BIKE = (model) => 
{
	return mp.game.invoke("0xB50C0B0CEDC6CE84", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_BICYCLE = (model) => 
{
	return mp.game.invoke("0xBF94DD42F63BDED2", model);
}


// Arg:model is [Hash]	
g_Natives.IS_THIS_MODEL_A_QUADBIKE = (model) => 
{
	return mp.game.invoke("0x39DAC362EE65FA28", model);
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_HELI_BLADES_FULL_SPEED = (vehicle) => 
{
	return mp.game.invoke("0xA178472EBB8AE60D", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:speed is [float]	
g_Natives.SET_HELI_BLADES_SPEED = (vehicle, speed) => 
{
	return mp.game.invoke("0xFD280B4D7F3ABC4D", vehicle, speed);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives["0x99CAD8E7AFDB60FA"] = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x99CAD8E7AFDB60FA", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_VEHICLE_CAN_BE_TARGETTED = (vehicle, state) => 
{
	return mp.game.invoke("0x3750146A28097A82", vehicle, state);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xDBC631F109350B8C"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xDBC631F109350B8C", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_VEHICLE_CAN_BE_VISIBLY_DAMAGED = (vehicle, state) => 
{
	return mp.game.invoke("0x4C7028F78FFD3681", vehicle, state);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x1AA8A837D2169D94"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x1AA8A837D2169D94", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x2311DD7159F00582"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x2311DD7159F00582", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_DIRT_LEVEL = (vehicle) => 
{
	return mp.game.invoke("0x8F17BC8BA08DA62B", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:dirtLevel is [float]	
g_Natives.SET_VEHICLE_DIRT_LEVEL = (vehicle, dirtLevel) => 
{
	return mp.game.invoke("0x79D3B596FE44EE8B", vehicle, dirtLevel);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_VEHICLE_DAMAGED = (vehicle) => 
{
	return mp.game.invoke("0xBCDC5017D3CE1E9E", vehicle);
}


// Arg:v is [Vehicle]	Arg:doorIndex is [int]	
g_Natives.IS_VEHICLE_DOOR_FULLY_OPEN = (v, doorIndex) => 
{
	return mp.game.invoke("0x3E933CFF7B111C22", v, doorIndex);
}


// Arg:vehicle is [Vehicle]	Arg:value is [BOOL]	Arg:instantly is [BOOL]	Arg:noAutoTurnOn is [BOOL]	
g_Natives.SET_VEHICLE_ENGINE_ON = (vehicle, value, instantly, noAutoTurnOn) => 
{
	return mp.game.invoke("0x2497C4717C8B881E", vehicle, value, instantly, noAutoTurnOn);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_UNDRIVEABLE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x8ABA6AF54B942B95", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_PROVIDES_COVER = (vehicle, toggle) => 
{
	return mp.game.invoke("0x5AFEEDD9BB2899D7", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:speed is [int]	Arg:angle is [float]	
g_Natives.SET_VEHICLE_DOOR_CONTROL = (vehicle, doorIndex, speed, angle) => 
{
	return mp.game.invoke("0xF2BFA0430F0A0FCB", vehicle, doorIndex, speed, angle);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:forceClose is [BOOL]	Arg:lock is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.SET_VEHICLE_DOOR_LATCHED = (vehicle, doorIndex, forceClose, lock, p4) => 
{
	return mp.game.invoke("0xA5A9653A8D2CAF48", vehicle, doorIndex, forceClose, lock, p4);
}


// Arg:vehicle is [Vehicle]	Arg:door is [int]	
g_Natives.GET_VEHICLE_DOOR_ANGLE_RATIO = (vehicle, door) => 
{
	return mp.game.invoke("0xFE3F9C29F7B32BD5", vehicle, door);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	
g_Natives._GET_PED_USING_VEHICLE_DOOR = (vehicle, doorIndex) => 
{
	return mp.game.invoke("0x218297BF0CFD853B", vehicle, doorIndex);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:closeInstantly is [BOOL]	
g_Natives.SET_VEHICLE_DOOR_SHUT = (vehicle, doorIndex, closeInstantly) => 
{
	return mp.game.invoke("0x93D9BD300D7789E5", vehicle, doorIndex, closeInstantly);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:deleteDoor is [BOOL]	
g_Natives.SET_VEHICLE_DOOR_BROKEN = (vehicle, doorIndex, deleteDoor) => 
{
	return mp.game.invoke("0xD4D4F6A4AB575A33", vehicle, doorIndex, deleteDoor);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_CAN_BREAK = (vehicle, toggle) => 
{
	return mp.game.invoke("0x59BF8C3D52C92F66", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DOES_VEHICLE_HAVE_ROOF = (vehicle) => 
{
	return mp.game.invoke("0x8AC862B0B32C5B80", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_BIG_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0x9F243D3919F442FE", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_NUMBER_OF_VEHICLE_COLOURS = (vehicle) => 
{
	return mp.game.invoke("0x3B963160CD65D41E", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:colorCombination is [int]	
g_Natives.SET_VEHICLE_COLOUR_COMBINATION = (vehicle, colorCombination) => 
{
	return mp.game.invoke("0x33E8CD3322E2FE31", vehicle, colorCombination);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_COLOUR_COMBINATION = (vehicle) => 
{
	return mp.game.invoke("0x6A842D197F845D56", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_IS_CONSIDERED_BY_PLAYER = (vehicle, toggle) => 
{
	return mp.game.invoke("0x31B927BBC44156CD", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives["0xBE5C1255A1830FF5"] = (vehicle, toggle) => 
{
	return mp.game.invoke("0xBE5C1255A1830FF5", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x9BECD4B9FEF3F8A6"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x9BECD4B9FEF3F8A6", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x88BC673CA9E0AE99"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x88BC673CA9E0AE99", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xE851E480B814D4BA"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE851E480B814D4BA", vehicle, p1);
}


// Arg:p0 is [BOOL]	Arg:modelHash is [int]	Arg:p2 is [int*]	
g_Natives.GET_RANDOM_VEHICLE_MODEL_IN_MEMORY = (p0, modelHash, p2) => 
{
	return mp.game.invoke("0x055BF0AC0C34F4FD", p0, modelHash, p2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_DOOR_LOCK_STATUS = (vehicle) => 
{
	return mp.game.invoke("0x25BC98A59C2EA962", vehicle);
}


// Arg:veh is [Vehicle]	Arg:doorID is [int]	
g_Natives.IS_VEHICLE_DOOR_DAMAGED = (veh, doorID) => 
{
	return mp.game.invoke("0xB8E181E559464527", veh, doorID);
}


// Arg:vehicle is [Vehicle]	Arg:doorIndex is [int]	Arg:isBreakable is [BOOL]	
g_Natives._SET_VEHICLE_DOOR_CAN_BREAK = (vehicle, doorIndex, isBreakable) => 
{
	return mp.game.invoke("0x2FA133A4A9D37ED8", vehicle, doorIndex, isBreakable);
}


// Arg:vehicle is [Vehicle]	Arg:frontBumper is [BOOL]	
g_Natives.IS_VEHICLE_BUMPER_BOUNCING = (vehicle, frontBumper) => 
{
	return mp.game.invoke("0x27B926779DEB502D", vehicle, frontBumper);
}


// Arg:vehicle is [Vehicle]	Arg:front is [BOOL]	
g_Natives.IS_VEHICLE_BUMPER_BROKEN_OFF = (vehicle, front) => 
{
	return mp.game.invoke("0x468056A6BB6F3846", vehicle, front);
}


// Arg:x1 is [float]	Arg:x2 is [float]	Arg:y1 is [float]	Arg:y2 is [float]	Arg:z1 is [float]	Arg:z2 is [float]	
g_Natives.IS_COP_VEHICLE_IN_AREA_3D = (x1, x2, y1, y2, z1, z2) => 
{
	return mp.game.invoke("0x7EEF65D5F153E26A", x1, x2, y1, y2, z1, z2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_ON_ALL_WHEELS = (vehicle) => 
{
	return mp.game.invoke("0xB104CD1BABF302E2", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_LAYOUT_HASH = (vehicle) => 
{
	return mp.game.invoke("0x28D37D4F71AC5C58", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:seat is [int]	
g_Natives._GET_VEHICLE_SEAT_CLIPSET_HASH = (vehicle, seat) => 
{
	return mp.game.invoke("0xA01BC64DD4BFBBAC", vehicle, seat);
}


// Arg:train is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_RENDER_TRAIN_AS_DERAILED = (train, toggle) => 
{
	return mp.game.invoke("0x317B11A312DF5534", train, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:pearlescentColor is [int]	Arg:wheelColor is [int]	
g_Natives.SET_VEHICLE_EXTRA_COLOURS = (vehicle, pearlescentColor, wheelColor) => 
{
	return mp.game.invoke("0x2036F561ADD12E33", vehicle, pearlescentColor, wheelColor);
}


// Arg:vehicle is [Vehicle]	Arg:pearlescentColor is [int*]	Arg:wheelColor is [int*]	
g_Natives.GET_VEHICLE_EXTRA_COLOURS = (vehicle, pearlescentColor, wheelColor) => 
{
	return mp.game.invoke("0x3BC4245933A166F7", vehicle, pearlescentColor, wheelColor);
}

g_Natives.STOP_ALL_GARAGE_ACTIVITY = () => 
{
	return mp.game.invoke("0x0F87E938BDF29D66");
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_VEHICLE_FIXED = (vehicle) => 
{
	return mp.game.invoke("0x115722B1B9C14C1C", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_VEHICLE_DEFORMATION_FIXED = (vehicle) => 
{
	return mp.game.invoke("0x953DA1E1B12C0491", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x206BC5DC9D1AC70A"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x206BC5DC9D1AC70A", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x51BB2D88D31A914B"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x51BB2D88D31A914B", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x192547247864DFDD"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x192547247864DFDD", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_DISABLE_VEHICLE_PETROL_TANK_FIRES = (vehicle, toggle) => 
{
	return mp.game.invoke("0x465BF26AB9684352", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_DISABLE_VEHICLE_PETROL_TANK_DAMAGE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x37C8252A7C92D017", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x91A0BD635321F145"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x91A0BD635321F145", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xC50CE861B55EAB8B"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xC50CE861B55EAB8B", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x6EBFB22D646FFC18"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x6EBFB22D646FFC18", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x25367DE49D64CF16"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x25367DE49D64CF16", vehicle, p1);
}


// Arg:x1 is [Ped]	Arg:y1 is [Ped]	Arg:z1 is [Ped]	Arg:x2 is [Ped]	Arg:y2 is [Ped]	Arg:z2 is [Ped]	Arg:unk is [Vehicle]	
g_Natives.REMOVE_VEHICLES_FROM_GENERATORS_IN_AREA = (x1, y1, z1, x2, y2, z2, unk) => 
{
	return mp.game.invoke("0x46A1E1A299EC4BBA", x1, y1, z1, x2, y2, z2, unk);
}


// Arg:vehicle is [Vehicle]	Arg:value is [float]	
g_Natives.SET_VEHICLE_STEER_BIAS = (vehicle, value) => 
{
	return mp.game.invoke("0x42A8EC77D5150CBE", vehicle, value);
}


// Arg:vehicle is [Vehicle]	Arg:extraId is [int]	
g_Natives.IS_VEHICLE_EXTRA_TURNED_ON = (vehicle, extraId) => 
{
	return mp.game.invoke("0xD2E6822DBFD6C8BD", vehicle, extraId);
}


// Arg:vehicle is [Vehicle]	Arg:extraId is [int]	Arg:disable is [BOOL]	
g_Natives.SET_VEHICLE_EXTRA = (vehicle, extraId, disable) => 
{
	return mp.game.invoke("0x7EE3A3C5E4A40CC9", vehicle, extraId, disable);
}


// Arg:vehicle is [Vehicle]	Arg:extraId is [int]	
g_Natives.DOES_EXTRA_EXIST = (vehicle, extraId) => 
{
	return mp.game.invoke("0x1262D55792428154", vehicle, extraId);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives.SET_CONVERTIBLE_ROOF = (vehicle, p1) => 
{
	return mp.game.invoke("0xF39C4F538B5124C2", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:instantlyLower is [BOOL]	
g_Natives.LOWER_CONVERTIBLE_ROOF = (vehicle, instantlyLower) => 
{
	return mp.game.invoke("0xDED51F703D0FA83D", vehicle, instantlyLower);
}


// Arg:vehicle is [Vehicle]	Arg:instantlyRaise is [BOOL]	
g_Natives.RAISE_CONVERTIBLE_ROOF = (vehicle, instantlyRaise) => 
{
	return mp.game.invoke("0x8F5FB35D7E88FC70", vehicle, instantlyRaise);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_CONVERTIBLE_ROOF_STATE = (vehicle) => 
{
	return mp.game.invoke("0xF8C397922FC03F41", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives.IS_VEHICLE_A_CONVERTIBLE = (vehicle, p1) => 
{
	return mp.game.invoke("0x52F357A30698BCCE", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_STOPPED_AT_TRAFFIC_LIGHTS = (vehicle) => 
{
	return mp.game.invoke("0x2959F696AE390A99", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:damage is [float]	Arg:radius is [float]	Arg:p6 is [BOOL]	
g_Natives.SET_VEHICLE_DAMAGE = (vehicle, xOffset, yOffset, zOffset, damage, radius, p6) => 
{
	return mp.game.invoke("0xA1DD317EA8FD4F29", vehicle, xOffset, yOffset, zOffset, damage, radius, p6);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_ENGINE_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0xC45D23BAF168AAB8", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:health is [float]	
g_Natives.SET_VEHICLE_ENGINE_HEALTH = (vehicle, health) => 
{
	return mp.game.invoke("0x45F6D8EEF34ABEF1", vehicle, health);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_PETROL_TANK_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0x7D5DABE888D2D074", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:health is [float]	
g_Natives.SET_VEHICLE_PETROL_TANK_HEALTH = (vehicle, health) => 
{
	return mp.game.invoke("0x70DB57649FA8D0D8", vehicle, health);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives.IS_VEHICLE_STUCK_TIMER_UP = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x679BE1DAF71DA874", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	Arg:nullAttributes is [int]	
g_Natives.RESET_VEHICLE_STUCK_TIMER = (vehicle, nullAttributes) => 
{
	return mp.game.invoke("0xD7591B0065AFAA7A", vehicle, nullAttributes);
}


// Arg:vehicle is [Vehicle]	Arg:isOnFireCheck is [BOOL]	
g_Natives.IS_VEHICLE_DRIVEABLE = (vehicle, isOnFireCheck) => 
{
	return mp.game.invoke("0x4C241E39B23DF959", vehicle, isOnFireCheck);
}


// Arg:vehicle is [Vehicle]	Arg:owned is [BOOL]	
g_Natives.SET_VEHICLE_HAS_BEEN_OWNED_BY_PLAYER = (vehicle, owned) => 
{
	return mp.game.invoke("0x2B5F9D2AF1F1722D", vehicle, owned);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_NEEDS_TO_BE_HOTWIRED = (vehicle, toggle) => 
{
	return mp.game.invoke("0xFBA550EA44404EE6", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x9F3F689B814F2599"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x9F3F689B814F2599", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x4E74E62E0A97E901"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x4E74E62E0A97E901", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:duration is [int]	Arg:mode is [Hash]	Arg:forever is [BOOL]	
g_Natives.START_VEHICLE_HORN = (vehicle, duration, mode, forever) => 
{
	return mp.game.invoke("0x9C8C6504B5B63D2C", vehicle, duration, mode, forever);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives._SET_VEHICLE_SILENT = (vehicle, toggle) => 
{
	return mp.game.invoke("0x9D44FCCE98450843", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_HAS_STRONG_AXLES = (vehicle, toggle) => 
{
	return mp.game.invoke("0x92F0CF722BC4202F", vehicle, toggle);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_DISPLAY_NAME_FROM_VEHICLE_MODEL = (modelHash) => 
{
	return mp.game.invoke("0xB215AAC32D25D019", modelHash);
}


// Arg:vehicle is [Vehicle]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	
g_Natives.GET_VEHICLE_DEFORMATION_AT_POS = (vehicle, offsetX, offsetY, offsetZ) => 
{
	return mp.game.invoke("0x4EC6CFBC7B2E9536", vehicle, offsetX, offsetY, offsetZ);
}


// Arg:vehicle is [Vehicle]	Arg:liveryIndex is [int]	
g_Natives.SET_VEHICLE_LIVERY = (vehicle, liveryIndex) => 
{
	return mp.game.invoke("0x60BF608F1B8CD1B6", vehicle, liveryIndex);
}


// Arg:trailers2 is [Vehicle]	
g_Natives.GET_VEHICLE_LIVERY = (trailers2) => 
{
	return mp.game.invoke("0x2BB9230590DA5E8A", trailers2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_LIVERY_COUNT = (vehicle) => 
{
	return mp.game.invoke("0x87B63E25A529D526", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:windowIndex is [int]	
g_Natives.IS_VEHICLE_WINDOW_INTACT = (vehicle, windowIndex) => 
{
	return mp.game.invoke("0x46E571A0E20D01F1", vehicle, windowIndex);
}


// Arg:vehicle is [Vehicle]	
g_Natives.ARE_ALL_VEHICLE_WINDOWS_INTACT = (vehicle) => 
{
	return mp.game.invoke("0x11D862A3E977A9EF", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.ARE_ANY_VEHICLE_SEATS_FREE = (vehicle) => 
{
	return mp.game.invoke("0x2D34FC3BC4ADB780", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.RESET_VEHICLE_WHEELS = (vehicle, toggle) => 
{
	return mp.game.invoke("0x21D2E5662C1F6FED", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.IS_HELI_PART_BROKEN = (vehicle, p1, p2, p3) => 
{
	return mp.game.invoke("0xBC74B4BE25EB6C8A", vehicle, p1, p2, p3);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_HELI_MAIN_ROTOR_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0xE4CB7541F413D2C5", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_HELI_TAIL_ROTOR_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0xAE8CE82A4219AC8C", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_HELI_TAIL_BOOM_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0xAC51915D27E4A5F7", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives.WAS_COUNTER_ACTIVATED = (vehicle, p1) => 
{
	return mp.game.invoke("0x3EC8BF18AA453FE9", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:name is [char*]	
g_Natives.SET_VEHICLE_NAME_DEBUG = (vehicle, name) => 
{
	return mp.game.invoke("0xBFDF984E2C22B94F", vehicle, name);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_EXPLODES_ON_HIGH_EXPLOSION_DAMAGE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x71B0892EC081D60A", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x3441CAD2F2231923"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x3441CAD2F2231923", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x2B6747FAA9DB9D6B"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x2B6747FAA9DB9D6B", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:state is [int]	
g_Natives.CONTROL_LANDING_GEAR = (vehicle, state) => 
{
	return mp.game.invoke("0xCFC8BE9A5E1FE575", vehicle, state);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_LANDING_GEAR_STATE = (vehicle) => 
{
	return mp.game.invoke("0x9B0F3DCA3DB0F4CD", vehicle);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.IS_ANY_VEHICLE_NEAR_POINT = (x, y, z, radius) => 
{
	return mp.game.invoke("0x61E1DD6125A3EEE6", x, y, z, radius);
}


// Arg:vehicle is [Vehicle]	
g_Natives.REQUEST_VEHICLE_HIGH_DETAIL_MODEL = (vehicle) => 
{
	return mp.game.invoke("0xA6E9FDCB2C76785E", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.REMOVE_VEHICLE_HIGH_DETAIL_MODEL = (vehicle) => 
{
	return mp.game.invoke("0x00689CDE5F7C6787", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_HIGH_DETAIL = (vehicle) => 
{
	return mp.game.invoke("0x1F25887F3C104278", vehicle);
}


// Arg:vehicleHash is [Hash]	Arg:vehicleAsset is [int]	
g_Natives.REQUEST_VEHICLE_ASSET = (vehicleHash, vehicleAsset) => 
{
	return mp.game.invoke("0x81A15811460FAB3A", vehicleHash, vehicleAsset);
}


// Arg:vehicleAsset is [int]	
g_Natives.HAS_VEHICLE_ASSET_LOADED = (vehicleAsset) => 
{
	return mp.game.invoke("0x1BBE0523B8DB9A21", vehicleAsset);
}


// Arg:vehicleAsset is [int]	
g_Natives.REMOVE_VEHICLE_ASSET = (vehicleAsset) => 
{
	return mp.game.invoke("0xACE699C71AB9DEB5", vehicleAsset);
}


// Arg:towTruck is [Vehicle]	Arg:height is [float]	
g_Natives._SET_TOW_TRUCK_CRANE_HEIGHT = (towTruck, height) => 
{
	return mp.game.invoke("0xFE54B92A344583CA", towTruck, height);
}


// Arg:towTruck is [Vehicle]	Arg:vehicle is [Vehicle]	Arg:index is [int]	Arg:hookOffsetX is [float]	Arg:hookOffsetY is [float]	Arg:hookOffsetZ is [float]	
g_Natives.ATTACH_VEHICLE_TO_TOW_TRUCK = (towTruck, vehicle, index, hookOffsetX, hookOffsetY, hookOffsetZ) => 
{
	return mp.game.invoke("0x29A16F8D621C4508", towTruck, vehicle, index, hookOffsetX, hookOffsetY, hookOffsetZ);
}


// Arg:towTruck is [Vehicle]	Arg:vehicle is [Vehicle]	
g_Natives.DETACH_VEHICLE_FROM_TOW_TRUCK = (towTruck, vehicle) => 
{
	return mp.game.invoke("0xC2DB6B6708350ED8", towTruck, vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DETACH_VEHICLE_FROM_ANY_TOW_TRUCK = (vehicle) => 
{
	return mp.game.invoke("0xD0E9CE05A1E68CD8", vehicle);
}


// Arg:towTruck is [Vehicle]	Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_ATTACHED_TO_TOW_TRUCK = (towTruck, vehicle) => 
{
	return mp.game.invoke("0x146DF9EC4C4B9FD4", towTruck, vehicle);
}


// Arg:towTruck is [Vehicle]	
g_Natives.GET_ENTITY_ATTACHED_TO_TOW_TRUCK = (towTruck) => 
{
	return mp.game.invoke("0xEFEA18DCF10F8F75", towTruck);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	
g_Natives.SET_VEHICLE_AUTOMATICALLY_ATTACHES = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x8BA6F76BC53A1493", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	Arg:position is [float]	Arg:p2 is [BOOL]	
g_Natives.SET_VEHICLE_BULLDOZER_ARM_POSITION = (vehicle, position, p2) => 
{
	return mp.game.invoke("0xF8EBCCC96ADB9FB7", vehicle, position, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [BOOL]	
g_Natives["0x56B94C6D7127DFBA"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x56B94C6D7127DFBA", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x1093408B4B9D1146"] = (p0, p1) => 
{
	return mp.game.invoke("0x1093408B4B9D1146", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:angleRatio is [float]	
g_Natives._SET_DESIRED_VERTICAL_FLIGHT_PHASE = (vehicle, angleRatio) => 
{
	return mp.game.invoke("0x30D779DE7C4F6DD3", vehicle, angleRatio);
}


// Arg:vehicle is [Vehicle]	Arg:angle is [float]	
g_Natives._SET_VERTICAL_FLIGHT_PHASE = (vehicle, angle) => 
{
	return mp.game.invoke("0x9AA47FFF660CB932", vehicle, angle);
}


// Arg:outVec is [Vector3*]	Arg:p1 is [Any]	Arg:outVec1 is [Vector3*]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	Arg:p8 is [Any]	
g_Natives["0xA4822F1CF23F4810"] = (outVec, p1, outVec1, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0xA4822F1CF23F4810", outVec, p1, outVec1, p3, p4, p5, p6, p7, p8);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_BURNOUT = (vehicle, toggle) => 
{
	return mp.game.invoke("0xFB8794444A7D60FB", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_IN_BURNOUT = (vehicle) => 
{
	return mp.game.invoke("0x1297A88E081430EB", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_REDUCE_GRIP = (vehicle, toggle) => 
{
	return mp.game.invoke("0x222FF6A823D122E2", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:turnSignal is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_INDICATOR_LIGHTS = (vehicle, turnSignal, toggle) => 
{
	return mp.game.invoke("0xB5D45264751B7DF0", vehicle, turnSignal, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives.SET_VEHICLE_BRAKE_LIGHTS = (vehicle, p1) => 
{
	return mp.game.invoke("0x92B35082E0B42F66", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_HANDBRAKE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x684785568EF26A22", vehicle, toggle);
}

g_Natives["0x48ADC8A773564670"] = () => 
{
	return mp.game.invoke("0x48ADC8A773564670");
}

g_Natives["0x91D6DD290888CBAB"] = () => 
{
	return mp.game.invoke("0x91D6DD290888CBAB");
}


// Arg:p0 is [BOOL]	
g_Natives["0x51DB102F4A3BA5E0"] = (p0) => 
{
	return mp.game.invoke("0x51DB102F4A3BA5E0", p0);
}


// Arg:vehicle is [Vehicle]	Arg:trailer is [Vehicle*]	
g_Natives.GET_VEHICLE_TRAILER_VEHICLE = (vehicle, trailer) => 
{
	return mp.game.invoke("0x1CDD6BADC297830D", vehicle, trailer);
}


// Arg:vehicle is [char*]	Arg:p1 is [BOOL]	
g_Natives["0xCAC66558B944DA67"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xCAC66558B944DA67", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_RUDDER_BROKEN = (vehicle, toggle) => 
{
	return mp.game.invoke("0x09606148B6C71DEF", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x1A78AD3D8240536F"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x1A78AD3D8240536F", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_VEHICLE_MAX_SPEED = (vehicle) => 
{
	return mp.game.invoke("0x53AF99BAA671CA47", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MAX_BRAKING = (vehicle) => 
{
	return mp.game.invoke("0xAD7E85FC227197C4", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MAX_TRACTION = (vehicle) => 
{
	return mp.game.invoke("0xA132FB5370554DB0", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_ACCELERATION = (vehicle) => 
{
	return mp.game.invoke("0x5DD35C8D074E57AE", vehicle);
}


// Arg:modelHash is [Hash]	
g_Natives._GET_VEHICLE_MODEL_MAX_SPEED = (modelHash) => 
{
	return mp.game.invoke("0xF417C2502FFFED43", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_VEHICLE_MODEL_MAX_BRAKING = (modelHash) => 
{
	return mp.game.invoke("0xDC53FD41B4ED944C", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives._GET_VEHICLE_MODEL_HAND_BRAKE = (modelHash) => 
{
	return mp.game.invoke("0xBFBA3BA79CFF7EBF", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_VEHICLE_MODEL_MAX_TRACTION = (modelHash) => 
{
	return mp.game.invoke("0x539DE94D44FDFD0D", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_VEHICLE_MODEL_ACCELERATION = (modelHash) => 
{
	return mp.game.invoke("0x8C044C5C84505B6A", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives._GET_VEHICLE_MODEL_DOWN_FORCE = (modelHash) => 
{
	return mp.game.invoke("0x53409B5163D5B846", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives._GET_VEHICLE_MODEL_MAX_KNOTS = (modelHash) => 
{
	return mp.game.invoke("0xC6AD107DDC9054CC", modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives._GET_VEHICLE_MODEL_MOVE_RESISTANCE = (modelHash) => 
{
	return mp.game.invoke("0x5AA3F878A178C4FC", modelHash);
}


// Arg:vehicleClass is [int]	
g_Natives._GET_VEHICLE_CLASS_MAX_SPEED = (vehicleClass) => 
{
	return mp.game.invoke("0x00C09F246ABEDD82", vehicleClass);
}


// Arg:vehicleClass is [int]	
g_Natives.GET_VEHICLE_CLASS_MAX_TRACTION = (vehicleClass) => 
{
	return mp.game.invoke("0xDBC86D85C5059461", vehicleClass);
}


// Arg:vehicleClass is [int]	
g_Natives.GET_VEHICLE_CLASS_MAX_AGILITY = (vehicleClass) => 
{
	return mp.game.invoke("0x4F930AD022D6DE3B", vehicleClass);
}


// Arg:vehicleClass is [int]	
g_Natives.GET_VEHICLE_CLASS_MAX_ACCELERATION = (vehicleClass) => 
{
	return mp.game.invoke("0x2F83E7E45D9EA7AE", vehicleClass);
}


// Arg:vehicleClass is [int]	
g_Natives.GET_VEHICLE_CLASS_MAX_BRAKING = (vehicleClass) => 
{
	return mp.game.invoke("0x4BF54C16EC8FEC03", vehicleClass);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:speed is [float]	Arg:p5 is [BOOL]	
g_Natives._ADD_SPEED_ZONE_FOR_COORD = (x, y, z, radius, speed, p5) => 
{
	return mp.game.invoke("0x2CE544C68FB812A0", x, y, z, radius, speed, p5);
}


// Arg:speedzone is [int]	
g_Natives._REMOVE_SPEED_ZONE = (speedzone) => 
{
	return mp.game.invoke("0x1033371FC8E842A7", speedzone);
}


// Arg:vehicle is [Vehicle]	
g_Natives.OPEN_BOMB_BAY_DOORS = (vehicle) => 
{
	return mp.game.invoke("0x87E7F24270732CB1", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.CLOSE_BOMB_BAY_DOORS = (vehicle) => 
{
	return mp.game.invoke("0x3556041742A0DC74", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_SEARCHLIGHT_ON = (vehicle) => 
{
	return mp.game.invoke("0xC0F97FCE55094987", vehicle);
}


// Arg:heli is [Vehicle]	Arg:toggle is [BOOL]	Arg:canBeUsedByAI is [BOOL]	
g_Natives.SET_VEHICLE_SEARCHLIGHT = (heli, toggle, canBeUsedByAI) => 
{
	return mp.game.invoke("0x14E85C5EE7A4D542", heli, toggle, canBeUsedByAI);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives["0x639431E895B9AA57"] = (ped, vehicle, p2, p3, p4) => 
{
	return mp.game.invoke("0x639431E895B9AA57", ped, vehicle, p2, p3, p4);
}


// Arg:vehicle is [Vehicle]	Arg:ped is [Ped]	
g_Natives.CAN_SHUFFLE_SEAT = (vehicle, ped) => 
{
	return mp.game.invoke("0x30785D90C956BF35", vehicle, ped);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_NUM_MOD_KITS = (vehicle) => 
{
	return mp.game.invoke("0x33F2E3FE70EAAE1D", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:modKit is [int]	
g_Natives.SET_VEHICLE_MOD_KIT = (vehicle, modKit) => 
{
	return mp.game.invoke("0x1F2AA07F00B3217A", vehicle, modKit);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MOD_KIT = (vehicle) => 
{
	return mp.game.invoke("0x6325D1A044AE510D", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MOD_KIT_TYPE = (vehicle) => 
{
	return mp.game.invoke("0xFC058F5121E54C32", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_WHEEL_TYPE = (vehicle) => 
{
	return mp.game.invoke("0xB3ED1BFB4BE636DC", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:WheelType is [int]	
g_Natives.SET_VEHICLE_WHEEL_TYPE = (vehicle, WheelType) => 
{
	return mp.game.invoke("0x487EB21CC7295BA1", vehicle, WheelType);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	
g_Natives.GET_NUM_MOD_COLORS = (p0, p1) => 
{
	return mp.game.invoke("0xA551BE18C11A476D", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:paintType is [int]	Arg:color is [int]	Arg:p3 is [int]	
g_Natives.SET_VEHICLE_MOD_COLOR_1 = (vehicle, paintType, color, p3) => 
{
	return mp.game.invoke("0x43FEB945EE7F85B8", vehicle, paintType, color, p3);
}


// Arg:vehicle is [Vehicle]	Arg:paintType is [int]	Arg:color is [int]	
g_Natives.SET_VEHICLE_MOD_COLOR_2 = (vehicle, paintType, color) => 
{
	return mp.game.invoke("0x816562BADFDEC83E", vehicle, paintType, color);
}


// Arg:vehicle is [Vehicle]	Arg:paintType is [int*]	Arg:color is [int*]	Arg:pearlescentColor is [int*]	
g_Natives.GET_VEHICLE_MOD_COLOR_1 = (vehicle, paintType, color, pearlescentColor) => 
{
	return mp.game.invoke("0xE8D65CA700C9A693", vehicle, paintType, color, pearlescentColor);
}


// Arg:vehicle is [Vehicle]	Arg:paintType is [int*]	Arg:color is [int*]	
g_Natives.GET_VEHICLE_MOD_COLOR_2 = (vehicle, paintType, color) => 
{
	return mp.game.invoke("0x81592BE4E3878728", vehicle, paintType, color);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives.GET_VEHICLE_MOD_COLOR_1_NAME = (vehicle, p1) => 
{
	return mp.game.invoke("0xB45085B721EFD38C", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_MOD_COLOR_2_NAME = (vehicle) => 
{
	return mp.game.invoke("0x4967A516ED23A5A1", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_VEHICLE_MOD_LOAD_DONE = (vehicle) => 
{
	return mp.game.invoke("0x9A83F5F9963775EF", vehicle);
}


// Arg:VEHICLE is [Vehicle]	Arg:modType is [int]	Arg:modIndex is [int]	Arg:customTires is [BOOL]	
g_Natives.SET_VEHICLE_MOD = (VEHICLE, modType, modIndex, customTires) => 
{
	return mp.game.invoke("0x6AF0636DDEDCB6DD", VEHICLE, modType, modIndex, customTires);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.GET_VEHICLE_MOD = (vehicle, modType) => 
{
	return mp.game.invoke("0x772960298DA26FDB", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.GET_VEHICLE_MOD_VARIATION = (vehicle, modType) => 
{
	return mp.game.invoke("0xB3924ECD70E095DC", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.GET_NUM_VEHICLE_MODS = (vehicle, modType) => 
{
	return mp.game.invoke("0xE38E9162A2500646", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.REMOVE_VEHICLE_MOD = (vehicle, modType) => 
{
	return mp.game.invoke("0x92D619E420858204", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	Arg:toggle is [BOOL]	
g_Natives.TOGGLE_VEHICLE_MOD = (vehicle, modType, toggle) => 
{
	return mp.game.invoke("0x2A1F4F37F95BAD08", vehicle, modType, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.IS_TOGGLE_MOD_ON = (vehicle, modType) => 
{
	return mp.game.invoke("0x84B233A8C8FC8AE7", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	Arg:modValue is [int]	
g_Natives.GET_MOD_TEXT_LABEL = (vehicle, modType, modValue) => 
{
	return mp.game.invoke("0x8935624F8C5592CC", vehicle, modType, modValue);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	
g_Natives.GET_MOD_SLOT_NAME = (vehicle, modType) => 
{
	return mp.game.invoke("0x51F0FEB9F6AE98C0", vehicle, modType);
}


// Arg:vehicle is [Vehicle]	Arg:liveryIndex is [int]	
g_Natives.GET_LIVERY_NAME = (vehicle, liveryIndex) => 
{
	return mp.game.invoke("0xB4C7A93837C91A1F", vehicle, liveryIndex);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	Arg:modIndex is [int]	
g_Natives.GET_VEHICLE_MOD_MODIFIER_VALUE = (vehicle, modType, modIndex) => 
{
	return mp.game.invoke("0x90A38E9838E0A8C1", vehicle, modType, modIndex);
}


// Arg:vehicle is [Vehicle]	Arg:modType is [int]	Arg:modIndex is [int]	
g_Natives._GET_VEHICLE_MOD_DATA = (vehicle, modType, modIndex) => 
{
	return mp.game.invoke("0x4593CF82AA179706", vehicle, modType, modIndex);
}


// Arg:p0 is [Any]	Arg:modType is [int]	Arg:p2 is [Any]	
g_Natives.PRELOAD_VEHICLE_MOD = (p0, modType, p2) => 
{
	return mp.game.invoke("0x758F49C24925568A", p0, modType, p2);
}


// Arg:p0 is [Any]	
g_Natives.HAS_PRELOAD_MODS_FINISHED = (p0) => 
{
	return mp.game.invoke("0x06F43E5175EB6D96", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives.RELEASE_PRELOAD_MODS = (vehicle) => 
{
	return mp.game.invoke("0x445D79F995508307", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives.SET_VEHICLE_TYRE_SMOKE_COLOR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0xB5BA80F839791C0F", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_VEHICLE_TYRE_SMOKE_COLOR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0xB635392A4938B3C3", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:tint is [int]	
g_Natives.SET_VEHICLE_WINDOW_TINT = (vehicle, tint) => 
{
	return mp.game.invoke("0x57C51E6BAD752696", vehicle, tint);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_WINDOW_TINT = (vehicle) => 
{
	return mp.game.invoke("0x0EE21293DAD47C95", vehicle);
}

g_Natives.GET_NUM_VEHICLE_WINDOW_TINTS = () => 
{
	return mp.game.invoke("0x9D1224004B3A6707");
}


// Arg:vehicle is [Vehicle]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives.GET_VEHICLE_COLOR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0xF3CC740D36221548", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0xEEBFC7A7EFDC35B4"] = (vehicle) => 
{
	return mp.game.invoke("0xEEBFC7A7EFDC35B4", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_CAUSE_OF_DESTRUCTION = (vehicle) => 
{
	return mp.game.invoke("0xE495D1EF4C91FD20", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_IS_LEFT_VEHICLE_HEADLIGHT_DAMAGED = (vehicle) => 
{
	return mp.game.invoke("0x5EF77C9ADD3B11A3", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_IS_RIGHT_VEHICLE_HEADLIGHT_DAMAGED = (vehicle) => 
{
	return mp.game.invoke("0xA7ECB73355EB2F20", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:value is [float]	
g_Natives.MODIFY_VEHICLE_TOP_SPEED = (vehicle, value) => 
{
	return mp.game.invoke("0x93A3996368C94158", vehicle, value);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives._SET_VEHICLE_ST = (vehicle, toggle) => 
{
	return mp.game.invoke("0x1CF38D529D7441D9", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x1F9FB66F3A3842D2"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x1F9FB66F3A3842D2", vehicle, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives["0x54B0F614960F4A5F"] = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x54B0F614960F4A5F", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any]	
g_Natives["0xE30524E1871F481D"] = (p0) => 
{
	return mp.game.invoke("0xE30524E1871F481D", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_ANY_PASSENGER_RAPPELLING = (vehicle) => 
{
	return mp.game.invoke("0x291E373D483E7EE7", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:value is [float]	
g_Natives._SET_VEHICLE_ENGINE_TORQUE_MULTIPLIER = (vehicle, value) => 
{
	return mp.game.invoke("0xB59E4BD37AE292DB", vehicle, value);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x0AD9E8F87FF7C16F"] = (p0, p1) => 
{
	return mp.game.invoke("0x0AD9E8F87FF7C16F", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:state is [BOOL]	
g_Natives.SET_VEHICLE_IS_WANTED = (vehicle, state) => 
{
	return mp.game.invoke("0xF7EC25A3EBEEC726", vehicle, state);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xF488C566413B4232"] = (p0, p1) => 
{
	return mp.game.invoke("0xF488C566413B4232", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives._GET_BOAT_BOOM_POSITION_RATIO = (p0, p1) => 
{
	return mp.game.invoke("0xC1F981A6F74F0C23", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x0F3B4D4E43177236"] = (p0, p1) => 
{
	return mp.game.invoke("0x0F3B4D4E43177236", p0, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x6636C535F6CC2725"] = (vehicle) => 
{
	return mp.game.invoke("0x6636C535F6CC2725", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.DISABLE_PLANE_AILERON = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x23428FC53C60919C", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_IS_VEHICLE_ENGINE_RUNNING = (vehicle) => 
{
	return mp.game.invoke("0xAE31E7DF9B5B132E", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x1D97D1E3A70A649F"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x1D97D1E3A70A649F", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	
g_Natives._SET_BIKE_LEAN_ANGLE = (vehicle, x, y) => 
{
	return mp.game.invoke("0x9CFA4896C3A53CBB", vehicle, x, y);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xAB04325045427AAE"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xAB04325045427AAE", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives._REMOVE_VEHICLE_OWNERSHIP = (vehicle) => 
{
	return mp.game.invoke("0xCFD778E7904C255E", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_LAST_DRIVEN_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xACFB2463CC22BED2", vehicle);
}

g_Natives.GET_LAST_DRIVEN_VEHICLE = () => 
{
	return mp.game.invoke("0xB2D06FAEDE65B577");
}

g_Natives["0xE01903C47C7AC89E"] = () => 
{
	return mp.game.invoke("0xE01903C47C7AC89E");
}


// Arg:p0 is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x02398B627547189C"] = (p0, p1) => 
{
	return mp.game.invoke("0x02398B627547189C", p0, p1);
}


// Arg:plane is [Vehicle]	Arg:height is [int]	
g_Natives._SET_PLANE_MIN_HEIGHT_ABOVE_TERRAIN = (plane, height) => 
{
	return mp.game.invoke("0xB893215D8D4C015B", plane, height);
}


// Arg:vehicle is [Vehicle]	Arg:multiplier is [float]	
g_Natives.SET_VEHICLE_LOD_MULTIPLIER = (vehicle, multiplier) => 
{
	return mp.game.invoke("0x93AE6A61BE015BF1", vehicle, multiplier);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x428BACCDF5E26EAD"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x428BACCDF5E26EAD", vehicle, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x42A4BEB35D372407"] = (p0) => 
{
	return mp.game.invoke("0x42A4BEB35D372407", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x2C8CBFE1EA5FC631"] = (p0) => 
{
	return mp.game.invoke("0x2C8CBFE1EA5FC631", p0);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives["0x4D9D109F63FEE1D4"] = (vehicle, toggle) => 
{
	return mp.game.invoke("0x4D9D109F63FEE1D4", vehicle, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x279D50DE5652D935"] = (p0, p1) => 
{
	return mp.game.invoke("0x279D50DE5652D935", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:vehicle2 is [Vehicle]	
g_Natives["0xE44A982368A4AF23"] = (vehicle, vehicle2) => 
{
	return mp.game.invoke("0xE44A982368A4AF23", vehicle, vehicle2);
}

g_Natives["0xF25E02CB9C5818F8"] = () => 
{
	return mp.game.invoke("0xF25E02CB9C5818F8");
}


// Arg:p0 is [float]	
g_Natives["0xBC3CCA5844452B06"] = (p0) => 
{
	return mp.game.invoke("0xBC3CCA5844452B06", p0);
}


// Arg:driver is [Ped]	Arg:entity is [Entity]	Arg:xTarget is [float]	Arg:yTarget is [float]	Arg:zTarget is [float]	
g_Natives.SET_VEHICLE_SHOOT_AT_TARGET = (driver, entity, xTarget, yTarget, zTarget) => 
{
	return mp.game.invoke("0x74CD9A9327A282EA", driver, entity, xTarget, yTarget, zTarget);
}


// Arg:vehicle is [Vehicle]	Arg:entity is [Entity*]	
g_Natives._GET_VEHICLE_OWNER = (vehicle, entity) => 
{
	return mp.game.invoke("0x8F5EBAB1F260CFCE", vehicle, entity);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_FORCE_HD_VEHICLE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x97CE68CB032583F0", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0x182F266C2D9E2BEB"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x182F266C2D9E2BEB", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_PLATE_TYPE = (vehicle) => 
{
	return mp.game.invoke("0x9CCC9525BF2408E0", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.TRACK_VEHICLE_VISIBILITY = (vehicle) => 
{
	return mp.game.invoke("0x64473AEFDCF47DCA", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_VISIBLE = (vehicle) => 
{
	return mp.game.invoke("0xAA0A52D24FB98293", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_GRAVITY = (vehicle, toggle) => 
{
	return mp.game.invoke("0x89F149B6131E57DA", vehicle, toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0xE6C0C80B8C867537"] = (p0) => 
{
	return mp.game.invoke("0xE6C0C80B8C867537", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x36492C2F0D134C56"] = (p0) => 
{
	return mp.game.invoke("0x36492C2F0D134C56", p0);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x06582AFF74894C75"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x06582AFF74894C75", vehicle, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xDFFCEF48E511DB48"] = (p0, p1) => 
{
	return mp.game.invoke("0xDFFCEF48E511DB48", p0, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_VEHICLE_SHOP_RESPRAY_ALLOWED = (vehicle) => 
{
	return mp.game.invoke("0x8D474C8FAEFF6CDE", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_ENGINE_CAN_DEGRADE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x983765856F2564F9", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives._ADD_VEHICLE_SHADOW = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0xF0E4BA16D1DB546C", vehicle, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0xF87D9F2301F7D206"] = (p0) => 
{
	return mp.game.invoke("0xF87D9F2301F7D206", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives._VEHICLE_HAS_LANDING_GEAR = (vehicle) => 
{
	return mp.game.invoke("0x4198AB0022B15F87", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._ARE_PROPELLERS_UNDAMAGED = (vehicle) => 
{
	return mp.game.invoke("0x755D6D5267CBBD7E", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives["0x0CDDA42F9E360CA6"] = (vehicle, toggle) => 
{
	return mp.game.invoke("0x0CDDA42F9E360CA6", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_VEHICLE_STOLEN = (vehicle) => 
{
	return mp.game.invoke("0x4AF9BD80EEBEB453", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:isStolen is [BOOL]	
g_Natives.SET_VEHICLE_IS_STOLEN = (vehicle, isStolen) => 
{
	return mp.game.invoke("0x67B2C79AA7FF5738", vehicle, isStolen);
}


// Arg:plane is [Vehicle]	Arg:multiplier is [float]	
g_Natives.SET_PLANE_TURBULENCE_MULTIPLIER = (plane, multiplier) => 
{
	return mp.game.invoke("0xAD2D28A1AFDFF131", plane, multiplier);
}


// Arg:vehicle is [Vehicle]	
g_Natives._ARE_VEHICLE_WINGS_INTACT = (vehicle) => 
{
	return mp.game.invoke("0x5991A01434CE9677", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._DEBUG_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xB264C4D2F2B0A78B", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:cargobob is [Vehicle]	
g_Natives.DETACH_VEHICLE_FROM_CARGOBOB = (vehicle, cargobob) => 
{
	return mp.game.invoke("0x0E21D3DF1051399D", vehicle, cargobob);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DETACH_VEHICLE_FROM_ANY_CARGOBOB = (vehicle) => 
{
	return mp.game.invoke("0xADF7BE450512C12F", vehicle);
}


// Arg:cargobob is [Vehicle]	Arg:vehicleAttached is [Vehicle]	
g_Natives.IS_VEHICLE_ATTACHED_TO_CARGOBOB = (cargobob, vehicleAttached) => 
{
	return mp.game.invoke("0xD40148F22E81A1D9", cargobob, vehicleAttached);
}


// Arg:cargobob is [Vehicle]	
g_Natives.GET_VEHICLE_ATTACHED_TO_CARGOBOB = (cargobob) => 
{
	return mp.game.invoke("0x873B82D42AC2B9E5", cargobob);
}


// Arg:vehicle is [Vehicle]	Arg:cargobob is [Vehicle]	Arg:p2 is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.ATTACH_VEHICLE_TO_CARGOBOB = (vehicle, cargobob, p2, x, y, z) => 
{
	return mp.game.invoke("0x4127F1D84E347769", vehicle, cargobob, p2, x, y, z);
}


// Arg:cargobob is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x571FEB383F629926"] = (cargobob, p1) => 
{
	return mp.game.invoke("0x571FEB383F629926", cargobob, p1);
}


// Arg:cargobob is [Vehicle]	
g_Natives._GET_CARGOBOB_HOOK_POSITION = (cargobob) => 
{
	return mp.game.invoke("0xCBDB9B923CACC92D", cargobob);
}


// Arg:cargobob is [Vehicle]	
g_Natives.DOES_CARGOBOB_HAVE_PICK_UP_ROPE = (cargobob) => 
{
	return mp.game.invoke("0x1821D91AD4B56108", cargobob);
}


// Arg:cargobob is [Vehicle]	Arg:state is [int]	
g_Natives.CREATE_PICK_UP_ROPE_FOR_CARGOBOB = (cargobob, state) => 
{
	return mp.game.invoke("0x7BEB0C7A235F6F3B", cargobob, state);
}


// Arg:cargobob is [Vehicle]	
g_Natives.REMOVE_PICK_UP_ROPE_FOR_CARGOBOB = (cargobob) => 
{
	return mp.game.invoke("0x9768CF648F54C804", cargobob);
}


// Arg:cargobob is [Vehicle]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:state is [int]	
g_Natives._SET_CARGOBOB_HOOK_POSITION = (cargobob, xOffset, yOffset, state) => 
{
	return mp.game.invoke("0x877C1EAEAC531023", cargobob, xOffset, yOffset, state);
}


// Arg:p0 is [Any]	Arg:p1 is [Player]	
g_Natives["0xCF1182F682F65307"] = (p0, p1) => 
{
	return mp.game.invoke("0xCF1182F682F65307", p0, p1);
}


// Arg:cargobob is [Vehicle]	
g_Natives._DOES_CARGOBOB_HAVE_PICKUP_MAGNET = (cargobob) => 
{
	return mp.game.invoke("0x6E08BF5B3722BAC9", cargobob);
}


// Arg:cargobob is [Vehicle]	Arg:isActive is [BOOL]	
g_Natives._SET_CARGOBOB_PICKUP_MAGNET_ACTIVE = (cargobob, isActive) => 
{
	return mp.game.invoke("0x9A665550F8DA349B", cargobob, isActive);
}


// Arg:cargobob is [Vehicle]	Arg:strength is [float]	
g_Natives._SET_CARGOBOB_PICKUP_MAGNET_STRENGTH = (cargobob, strength) => 
{
	return mp.game.invoke("0xBCBFCD9D1DAC19E2", cargobob, strength);
}


// Arg:cargobob is [Vehicle]	Arg:p1 is [float]	
g_Natives["0xA17BAD153B51547E"] = (cargobob, p1) => 
{
	return mp.game.invoke("0xA17BAD153B51547E", cargobob, p1);
}


// Arg:cargobob is [Vehicle]	Arg:p1 is [float]	
g_Natives["0x66979ACF5102FD2F"] = (cargobob, p1) => 
{
	return mp.game.invoke("0x66979ACF5102FD2F", cargobob, p1);
}


// Arg:cargobob is [Vehicle]	Arg:p1 is [float]	
g_Natives["0x6D8EAC07506291FB"] = (cargobob, p1) => 
{
	return mp.game.invoke("0x6D8EAC07506291FB", cargobob, p1);
}


// Arg:cargobob is [Vehicle]	Arg:p1 is [float]	
g_Natives["0xED8286F71A819BAA"] = (cargobob, p1) => 
{
	return mp.game.invoke("0xED8286F71A819BAA", cargobob, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0x685D5561680D088B"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x685D5561680D088B", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:cargobob is [Vehicle]	
g_Natives["0xE301BD63E9E13CF0"] = (vehicle, cargobob) => 
{
	return mp.game.invoke("0xE301BD63E9E13CF0", vehicle, cargobob);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x9BDDC73CC6A115D4"] = (vehicle, p1, p2) => 
{
	return mp.game.invoke("0x9BDDC73CC6A115D4", vehicle, p1, p2);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x56EB5E94318D3FB6"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x56EB5E94318D3FB6", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.DOES_VEHICLE_HAVE_WEAPONS = (vehicle) => 
{
	return mp.game.invoke("0x25ECB9F8017D98E0", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x2C4A1590ABF43E8B"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x2C4A1590ABF43E8B", vehicle, p1);
}


// Arg:disabled is [BOOL]	Arg:weaponHash is [Hash]	Arg:vehicle is [Vehicle]	Arg:owner is [Ped]	
g_Natives.DISABLE_VEHICLE_WEAPON = (disabled, weaponHash, vehicle, owner) => 
{
	return mp.game.invoke("0xF4FC6A6F67D8D856", disabled, weaponHash, vehicle, owner);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xE05DD0E9707003A3"] = (p0, p1) => 
{
	return mp.game.invoke("0xE05DD0E9707003A3", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x21115BCD6E44656A"] = (p0, p1) => 
{
	return mp.game.invoke("0x21115BCD6E44656A", p0, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_CLASS = (vehicle) => 
{
	return mp.game.invoke("0x29439776AAA00A62", vehicle);
}


// Arg:modelHash is [Hash]	
g_Natives.GET_VEHICLE_CLASS_FROM_NAME = (modelHash) => 
{
	return mp.game.invoke("0xDEDF1C8BD47C2200", modelHash);
}


// Arg:vehicle is [Vehicle]	
g_Natives.SET_PLAYERS_LAST_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xBCDF8BAF56C87B6A", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_CAN_BE_USED_BY_FLEEING_PEDS = (vehicle, toggle) => 
{
	return mp.game.invoke("0x300504B23BD3B711", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives["0xE5810AC70602F2F5"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE5810AC70602F2F5", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives._SET_VEHICLE_CREATES_MONEY_PICKUPS_WHEN_EXPLODED = (vehicle, toggle) => 
{
	return mp.game.invoke("0x068F64F2470F9656", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives._SET_VEHICLE_JET_ENGINE_ON = (vehicle, toggle) => 
{
	return mp.game.invoke("0xB8FBC8B1330CA9B4", vehicle, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x10655FAB9915623D"] = (p0, p1) => 
{
	return mp.game.invoke("0x10655FAB9915623D", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x79DF7E806202CE01"] = (p0, p1) => 
{
	return mp.game.invoke("0x79DF7E806202CE01", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x9007A2F21DC108D4"] = (p0, p1) => 
{
	return mp.game.invoke("0x9007A2F21DC108D4", p0, p1);
}


// Arg:helicopter is [Vehicle]	Arg:multiplier is [float]	
g_Natives._SET_HELICOPTER_ROLL_PITCH_YAW_MULT_HEALTH = (helicopter, multiplier) => 
{
	return mp.game.invoke("0x6E0859B530A365CC", helicopter, multiplier);
}


// Arg:vehicle is [Vehicle]	Arg:friction is [float]	
g_Natives.SET_VEHICLE_FRICTION_OVERRIDE = (vehicle, friction) => 
{
	return mp.game.invoke("0x1837AF7C627009BA", vehicle, friction);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_WHEELS_CAN_BREAK_OFF_WHEN_BLOW_UP = (vehicle, toggle) => 
{
	return mp.game.invoke("0xA37B9A517B133349", vehicle, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xF78F94D60248C737"] = (p0, p1) => 
{
	return mp.game.invoke("0xF78F94D60248C737", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives.SET_VEHICLE_CEILING_HEIGHT = (vehicle, p1) => 
{
	return mp.game.invoke("0xA46413066687A328", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives["0x5E569EC46EC21CAE"] = (vehicle, toggle) => 
{
	return mp.game.invoke("0x5E569EC46EC21CAE", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._CLEAR_VEHICLE_ROUTE_HISTORY = (vehicle) => 
{
	return mp.game.invoke("0x6D6AF961B72728AE", vehicle);
}


// Arg:decorator is [char*]	
g_Natives.DOES_VEHICLE_EXIST_WITH_DECORATOR = (decorator) => 
{
	return mp.game.invoke("0x956B409B984D9BF7", decorator);
}


// Arg:vehicle is [Vehicle]	Arg:ped is [Ped]	
g_Natives.SET_VEHICLE_EXCLUSIVE_DRIVER = (vehicle, ped) => 
{
	return mp.game.invoke("0x41062318F23ED854", vehicle, ped);
}


// Arg:vehicle is [Vehicle]	Arg:ped is [Ped]	Arg:p2 is [int]	
g_Natives._SET_VEHICLE_EXCLUSIVE_DRIVER_2 = (vehicle, ped, p2) => 
{
	return mp.game.invoke("0xB5C51B5502E85E83", vehicle, ped, p2);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives["0x500873A45724C863"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x500873A45724C863", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xB055A34527CB8FD7"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xB055A34527CB8FD7", vehicle, p1);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_DISTANT_CARS_ENABLED = (toggle) => 
{
	return mp.game.invoke("0xF796359A959DF65D", toggle);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives._SET_VEHICLE_NEON_LIGHTS_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0x8E0A582209A62695", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	
g_Natives._GET_VEHICLE_NEON_LIGHTS_COLOUR = (vehicle, r, g, b) => 
{
	return mp.game.invoke("0x7619EEE8C886757F", vehicle, r, g, b);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	Arg:toggle is [BOOL]	
g_Natives._SET_VEHICLE_NEON_LIGHT_ENABLED = (vehicle, index, toggle) => 
{
	return mp.game.invoke("0x2AA720E4287BF269", vehicle, index, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:index is [int]	
g_Natives._IS_VEHICLE_NEON_LIGHT_ENABLED = (vehicle, index) => 
{
	return mp.game.invoke("0x8C4B92553E4766A5", vehicle, index);
}


// Arg:p0 is [BOOL]	
g_Natives["0x35E0654F4BAD7971"] = (p0) => 
{
	return mp.game.invoke("0x35E0654F4BAD7971", p0);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xB088E9A47AE6EDD5"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xB088E9A47AE6EDD5", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives._REQUEST_VEHICLE_SCALEFORM_MOVIE = (vehicle) => 
{
	return mp.game.invoke("0xDBA3C090E3D74690", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_BODY_HEALTH = (vehicle) => 
{
	return mp.game.invoke("0xF271147EB7B40F12", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:value is [float]	
g_Natives.SET_VEHICLE_BODY_HEALTH = (vehicle, value) => 
{
	return mp.game.invoke("0xB77D05AC8C78AADB", vehicle, value);
}


// Arg:vehicle is [Vehicle]	Arg:out1 is [Vector3*]	Arg:out2 is [Vector3*]	
g_Natives._GET_VEHICLE_SUSPENSION_DIMENSIONS = (vehicle, out1, out2) => 
{
	return mp.game.invoke("0xDF7E3EEB29642C38", vehicle, out1, out2);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_VEHICLE_SUSPENSION_HEIGHT = (vehicle) => 
{
	return mp.game.invoke("0x53952FD2BAA19F17", vehicle);
}


// Arg:multiplier is [float]	
g_Natives._SET_CAR_HIGH_SPEED_BUMP_SEVERITY_MULTIPLIER = (multiplier) => 
{
	return mp.game.invoke("0x84FD40F56075E816", multiplier);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xA7DCDF4DED40A8F4"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xA7DCDF4DED40A8F4", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_VEHICLE_BODY_HEALTH_2 = (vehicle) => 
{
	return mp.game.invoke("0xB8EF61207C2393A9", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0xD4C4642CB7F50B5D"] = (vehicle) => 
{
	return mp.game.invoke("0xD4C4642CB7F50B5D", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xC361AA040D6637A8"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xC361AA040D6637A8", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:active is [BOOL]	
g_Natives._SET_VEHICLE_HUD_SPECIAL_ABILITY_BAR_ACTIVE = (vehicle, active) => 
{
	return mp.game.invoke("0x99C82F8A139F3E4E", vehicle, active);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0xE16142B94664DEFD"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xE16142B94664DEFD", vehicle, p1);
}


// Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	Arg:dynamic is [BOOL]	
g_Natives.CREATE_OBJECT = (modelHash, x, y, z, isNetwork, thisScriptCheck, dynamic) => 
{
	return mp.game.invoke("0x509D5878EB39E842", modelHash, x, y, z, isNetwork, thisScriptCheck, dynamic);
}


// Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:isNetwork is [BOOL]	Arg:thisScriptCheck is [BOOL]	Arg:dynamic is [BOOL]	
g_Natives.CREATE_OBJECT_NO_OFFSET = (modelHash, x, y, z, isNetwork, thisScriptCheck, dynamic) => 
{
	return mp.game.invoke("0x9A294B2138ABB884", modelHash, x, y, z, isNetwork, thisScriptCheck, dynamic);
}


// Arg:object is [Object*]	
g_Natives.DELETE_OBJECT = (object) => 
{
	return mp.game.invoke("0x539E0AE3E6634B9F", object);
}


// Arg:object is [Object]	
g_Natives.PLACE_OBJECT_ON_GROUND_PROPERLY = (object) => 
{
	return mp.game.invoke("0x58A850EAEE20FAA3", object);
}


// Arg:object is [Object]	Arg:toX is [float]	Arg:toY is [float]	Arg:toZ is [float]	Arg:speedX is [float]	Arg:speedY is [float]	Arg:speedZ is [float]	Arg:collision is [BOOL]	
g_Natives.SLIDE_OBJECT = (object, toX, toY, toZ, speedX, speedY, speedZ, collision) => 
{
	return mp.game.invoke("0x2FDFF4107B8C1147", object, toX, toY, toZ, speedX, speedY, speedZ, collision);
}


// Arg:object is [Object]	Arg:targettable is [BOOL]	
g_Natives.SET_OBJECT_TARGETTABLE = (object, targettable) => 
{
	return mp.game.invoke("0x8A7391690F5AFD81", object, targettable);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives._SET_OBJECT_LOD = (object, toggle) => 
{
	return mp.game.invoke("0x77F33F2CCF64B3AA", object, toggle);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:modelHash is [Hash]	Arg:isMission is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.GET_CLOSEST_OBJECT_OF_TYPE = (x, y, z, radius, modelHash, isMission, p6, p7) => 
{
	return mp.game.invoke("0xE143FA2249364369", x, y, z, radius, modelHash, isMission, p6, p7);
}


// Arg:object is [Object]	
g_Natives.HAS_OBJECT_BEEN_BROKEN = (object) => 
{
	return mp.game.invoke("0x8ABFB70C49CC43E2", object);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:modelHash is [Hash]	Arg:p5 is [Any]	
g_Natives.HAS_CLOSEST_OBJECT_OF_TYPE_BEEN_BROKEN = (p0, p1, p2, p3, modelHash, p5) => 
{
	return mp.game.invoke("0x761B0E69AC4D007E", p0, p1, p2, p3, modelHash, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:modelHash is [Hash]	Arg:p5 is [BOOL]	
g_Natives["0x46494A2475701343"] = (p0, p1, p2, p3, modelHash, p5) => 
{
	return mp.game.invoke("0x46494A2475701343", p0, p1, p2, p3, modelHash, p5);
}


// Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:heading is [float]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	
g_Natives._GET_OBJECT_OFFSET_FROM_COORDS = (xPos, yPos, zPos, heading, xOffset, yOffset, zOffset) => 
{
	return mp.game.invoke("0x163E252DE035A133", xPos, yPos, zPos, heading, xOffset, yOffset, zOffset);
}


// Arg:coords is [Any]	Arg:radius is [float]	Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p6 is [Vector3*]	Arg:p7 is [int]	
g_Natives["0x163F8B586BC95F2A"] = (coords, radius, modelHash, x, y, z, p6, p7) => 
{
	return mp.game.invoke("0x163F8B586BC95F2A", coords, radius, modelHash, x, y, z, p6, p7);
}


// Arg:type is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:locked is [BOOL]	Arg:heading is [float]	Arg:p6 is [BOOL]	
g_Natives.SET_STATE_OF_CLOSEST_DOOR_OF_TYPE = (type, x, y, z, locked, heading, p6) => 
{
	return mp.game.invoke("0xF82D8F1926A02C3D", type, x, y, z, locked, heading, p6);
}


// Arg:type is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:locked is [BOOL*]	Arg:heading is [float*]	
g_Natives.GET_STATE_OF_CLOSEST_DOOR_OF_TYPE = (type, x, y, z, locked, heading) => 
{
	return mp.game.invoke("0xEDC1A5B84AEF33FF", type, x, y, z, locked, heading);
}


// Arg:doorHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:locked is [BOOL]	Arg:xRotMult is [float]	Arg:yRotMult is [float]	Arg:zRotMult is [float]	
g_Natives._DOOR_CONTROL = (doorHash, x, y, z, locked, xRotMult, yRotMult, zRotMult) => 
{
	return mp.game.invoke("0x9B12F9A24FABEDB0", doorHash, x, y, z, locked, xRotMult, yRotMult, zRotMult);
}


// Arg:doorHash is [Hash]	Arg:modelHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.ADD_DOOR_TO_SYSTEM = (doorHash, modelHash, x, y, z, p5, p6, p7) => 
{
	return mp.game.invoke("0x6F8838D03D1DC226", doorHash, modelHash, x, y, z, p5, p6, p7);
}


// Arg:doorHash is [Hash]	
g_Natives.REMOVE_DOOR_FROM_SYSTEM = (doorHash) => 
{
	return mp.game.invoke("0x464D8E1427156FE4", doorHash);
}


// Arg:doorHash is [Hash]	Arg:limit is [int]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives._SET_DOOR_ACCELERATION_LIMIT = (doorHash, limit, p2, p3) => 
{
	return mp.game.invoke("0x6BAB9442830C7F53", doorHash, limit, p2, p3);
}


// Arg:doorHash is [Hash]	
g_Natives["0x160AA1B32F6139B8"] = (doorHash) => 
{
	return mp.game.invoke("0x160AA1B32F6139B8", doorHash);
}


// Arg:doorHash is [Hash]	
g_Natives["0x4BC2854478F3A749"] = (doorHash) => 
{
	return mp.game.invoke("0x4BC2854478F3A749", doorHash);
}


// Arg:doorHash is [Hash]	Arg:p1 is [float]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives["0x03C27E13B42A0E82"] = (doorHash, p1, p2, p3) => 
{
	return mp.game.invoke("0x03C27E13B42A0E82", doorHash, p1, p2, p3);
}


// Arg:doorHash is [Hash]	Arg:heading is [float]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives["0x9BA001CB45CBF627"] = (doorHash, heading, p2, p3) => 
{
	return mp.game.invoke("0x9BA001CB45CBF627", doorHash, heading, p2, p3);
}


// Arg:doorHash is [Hash]	Arg:ajar is [float]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives._SET_DOOR_AJAR_ANGLE = (doorHash, ajar, p2, p3) => 
{
	return mp.game.invoke("0xB6E6FBA95C7324AC", doorHash, ajar, p2, p3);
}


// Arg:doorHash is [Hash]	
g_Natives["0x65499865FCA6E5EC"] = (doorHash) => 
{
	return mp.game.invoke("0x65499865FCA6E5EC", doorHash);
}


// Arg:doorHash is [Hash]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives["0xC485E07E4F0B7958"] = (doorHash, p1, p2, p3) => 
{
	return mp.game.invoke("0xC485E07E4F0B7958", doorHash, p1, p2, p3);
}


// Arg:doorHash is [Hash]	Arg:p1 is [BOOL]	
g_Natives["0xD9B71952F78A2640"] = (doorHash, p1) => 
{
	return mp.game.invoke("0xD9B71952F78A2640", doorHash, p1);
}


// Arg:doorHash is [Hash]	Arg:p1 is [BOOL]	
g_Natives["0xA85A21582451E951"] = (doorHash, p1) => 
{
	return mp.game.invoke("0xA85A21582451E951", doorHash, p1);
}


// Arg:doorHash is [Hash]	
g_Natives._DOES_DOOR_EXIST = (doorHash) => 
{
	return mp.game.invoke("0xC153C43EA202C8C1", doorHash);
}


// Arg:door is [Hash]	
g_Natives.IS_DOOR_CLOSED = (door) => 
{
	return mp.game.invoke("0xC531EE8A1145A149", door);
}


// Arg:p0 is [BOOL]	
g_Natives["0xC7F29CA00F46350E"] = (p0) => 
{
	return mp.game.invoke("0xC7F29CA00F46350E", p0);
}

g_Natives["0x701FDA1E82076BA4"] = () => 
{
	return mp.game.invoke("0x701FDA1E82076BA4");
}


// Arg:p0 is [Any]	
g_Natives["0xDF97CDD4FC08FD34"] = (p0) => 
{
	return mp.game.invoke("0xDF97CDD4FC08FD34", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [Any]	Arg:p4 is [Any*]	
g_Natives["0x589F80B325CC82C5"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x589F80B325CC82C5", p0, p1, p2, p3, p4);
}


// Arg:garage is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [int]	
g_Natives.IS_GARAGE_EMPTY = (garage, p1, p2) => 
{
	return mp.game.invoke("0x90E47239EA1980B8", garage, p1, p2);
}


// Arg:p0 is [Any]	Arg:player is [Player]	Arg:p2 is [float]	Arg:p3 is [int]	
g_Natives["0x024A60DEB0EA69F0"] = (p0, player, p2, p3) => 
{
	return mp.game.invoke("0x024A60DEB0EA69F0", p0, player, p2, p3);
}


// Arg:p0 is [Any]	Arg:player is [Player]	Arg:p2 is [int]	
g_Natives["0x1761DC5D8471CBAA"] = (p0, player, p2) => 
{
	return mp.game.invoke("0x1761DC5D8471CBAA", p0, player, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	
g_Natives["0x85B6C850546FDDE2"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x85B6C850546FDDE2", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	
g_Natives["0x673ED815D6E323B7"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x673ED815D6E323B7", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:entity is [Entity]	Arg:p2 is [float]	Arg:p3 is [int]	
g_Natives["0x372EF6699146A1E4"] = (p0, entity, p2, p3) => 
{
	return mp.game.invoke("0x372EF6699146A1E4", p0, entity, p2, p3);
}


// Arg:p0 is [Any]	Arg:entity is [Entity]	Arg:p2 is [int]	
g_Natives["0xF0EED5A6BC7B237A"] = (p0, entity, p2) => 
{
	return mp.game.invoke("0xF0EED5A6BC7B237A", p0, entity, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives["0x190428512B240692"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x190428512B240692", p0, p1, p2, p3, p4);
}


// Arg:hash is [Hash]	Arg:toggle is [BOOL]	
g_Natives["0xF2E1A7133DD356A6"] = (hash, toggle) => 
{
	return mp.game.invoke("0xF2E1A7133DD356A6", hash, toggle);
}

g_Natives["0x66A49D021870FE88"] = () => 
{
	return mp.game.invoke("0x66A49D021870FE88");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:hash is [Hash]	Arg:p5 is [BOOL]	
g_Natives.DOES_OBJECT_OF_TYPE_EXIST_AT_COORDS = (x, y, z, radius, hash, p5) => 
{
	return mp.game.invoke("0xBFA48E2FF417213F", x, y, z, radius, hash, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [BOOL]	Arg:p11 is [BOOL]	
g_Natives.IS_POINT_IN_ANGLED_AREA = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x2A70BAE8883E4C81", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives["0x4D89D607CB3DD1D2"] = (object, toggle) => 
{
	return mp.game.invoke("0x4D89D607CB3DD1D2", object, toggle);
}


// Arg:object is [Object]	Arg:mass is [float]	Arg:gravityFactor is [float]	Arg:dampingLinearC is [float]	Arg:dampingLinearV is [float]	Arg:dampingLinearV2 is [float]	Arg:dampingAngularC is [float]	Arg:dampingAngularV is [float]	Arg:dampingAngularV2 is [float]	Arg:margin is [float]	Arg:default2Pi is [float]	Arg:buoyancyFactor is [float]	
g_Natives.SET_OBJECT_PHYSICS_PARAMS = (object, mass, gravityFactor, dampingLinearC, dampingLinearV, dampingLinearV2, dampingAngularC, dampingAngularV, dampingAngularV2, margin, default2Pi, buoyancyFactor) => 
{
	return mp.game.invoke("0xF6DF6E90DE7DF90F", object, mass, gravityFactor, dampingLinearC, dampingLinearV, dampingLinearV2, dampingAngularC, dampingAngularV, dampingAngularV2, margin, default2Pi, buoyancyFactor);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives.GET_OBJECT_FRAGMENT_DAMAGE_HEALTH = (p0, p1) => 
{
	return mp.game.invoke("0xB6FBFD079B8D0596", p0, p1);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives.SET_ACTIVATE_OBJECT_PHYSICS_AS_SOON_AS_IT_IS_UNFROZEN = (object, toggle) => 
{
	return mp.game.invoke("0x406137F8EF90EAF5", object, toggle);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	Arg:p4 is [BOOL]	
g_Natives.IS_ANY_OBJECT_NEAR_POINT = (x, y, z, range, p4) => 
{
	return mp.game.invoke("0x397DC58FF00298D1", x, y, z, range, p4);
}


// Arg:objectHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	
g_Natives.IS_OBJECT_NEAR_POINT = (objectHash, x, y, z, range) => 
{
	return mp.game.invoke("0x8C90FE4B381BA60A", objectHash, x, y, z, range);
}


// Arg:p0 is [Any]	
g_Natives["0x4A39DB43E47CF3AA"] = (p0) => 
{
	return mp.game.invoke("0x4A39DB43E47CF3AA", p0);
}


// Arg:p0 is [Object]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives["0xE7E4C198B0185900"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE7E4C198B0185900", p0, p1, p2);
}


// Arg:object is [Object]	
g_Natives["0xF9C1681347C8BD15"] = (object) => 
{
	return mp.game.invoke("0xF9C1681347C8BD15", object);
}


// Arg:p0 is [Any]	
g_Natives.TRACK_OBJECT_VISIBILITY = (p0) => 
{
	return mp.game.invoke("0xB252BC036B525623", p0);
}


// Arg:object is [Object]	
g_Natives.IS_OBJECT_VISIBLE = (object) => 
{
	return mp.game.invoke("0x8B32ACE6326A7546", object);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xC6033D32241F6FB5"] = (p0, p1) => 
{
	return mp.game.invoke("0xC6033D32241F6FB5", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xEB6F1A9B5510A5D2"] = (p0, p1) => 
{
	return mp.game.invoke("0xEB6F1A9B5510A5D2", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xBCE595371A5FBAAF"] = (p0, p1) => 
{
	return mp.game.invoke("0xBCE595371A5FBAAF", p0, p1);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:rotation is [float]	Arg:name is [char*]	
g_Natives._GET_DES_OBJECT = (x, y, z, rotation, name) => 
{
	return mp.game.invoke("0xB48FCED898292E52", x, y, z, rotation, name);
}


// Arg:handle is [int]	Arg:state is [int]	
g_Natives._SET_DES_OBJECT_STATE = (handle, state) => 
{
	return mp.game.invoke("0x5C29F698D404C5E1", handle, state);
}


// Arg:handle is [int]	
g_Natives._GET_DES_OBJECT_STATE = (handle) => 
{
	return mp.game.invoke("0x899BA936634A322E", handle);
}


// Arg:handle is [int]	
g_Natives._DOES_DES_OBJECT_EXIST = (handle) => 
{
	return mp.game.invoke("0x52AF537A0C5B8AAD", handle);
}


// Arg:p0 is [Any]	
g_Natives["0x260EE4FDBDF4DB01"] = (p0) => 
{
	return mp.game.invoke("0x260EE4FDBDF4DB01", p0);
}


// Arg:pickupHash is [Hash]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:p4 is [int]	Arg:value is [int]	Arg:p6 is [BOOL]	Arg:modelHash is [Hash]	
g_Natives.CREATE_PICKUP = (pickupHash, posX, posY, posZ, p4, value, p6, modelHash) => 
{
	return mp.game.invoke("0xFBA08C503DD5FA58", pickupHash, posX, posY, posZ, p4, value, p6, modelHash);
}


// Arg:pickupHash is [Hash]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:flag is [int]	Arg:amount is [int]	Arg:p9 is [Any]	Arg:p10 is [BOOL]	Arg:modelHash is [Hash]	
g_Natives.CREATE_PICKUP_ROTATE = (pickupHash, posX, posY, posZ, rotX, rotY, rotZ, flag, amount, p9, p10, modelHash) => 
{
	return mp.game.invoke("0x891804727E0A98B7", pickupHash, posX, posY, posZ, rotX, rotY, rotZ, flag, amount, p9, p10, modelHash);
}


// Arg:pickupHash is [Hash]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:flag is [int]	Arg:value is [int]	Arg:modelHash is [Hash]	Arg:returnHandle is [BOOL]	Arg:p8 is [BOOL]	
g_Natives.CREATE_AMBIENT_PICKUP = (pickupHash, posX, posY, posZ, flag, value, modelHash, returnHandle, p8) => 
{
	return mp.game.invoke("0x673966A0C0FD7171", pickupHash, posX, posY, posZ, flag, value, modelHash, returnHandle, p8);
}


// Arg:pickupHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:placeOnGround is [BOOL]	Arg:modelHash is [Hash]	
g_Natives.CREATE_PORTABLE_PICKUP = (pickupHash, x, y, z, placeOnGround, modelHash) => 
{
	return mp.game.invoke("0x2EAF1FDB2FB55698", pickupHash, x, y, z, placeOnGround, modelHash);
}


// Arg:pickupHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:placeOnGround is [BOOL]	Arg:modelHash is [Hash]	
g_Natives._CREATE_PORTABLE_PICKUP_2 = (pickupHash, x, y, z, placeOnGround, modelHash) => 
{
	return mp.game.invoke("0x125494B98A21AAF7", pickupHash, x, y, z, placeOnGround, modelHash);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	
g_Natives.ATTACH_PORTABLE_PICKUP_TO_PED = (ped, p1) => 
{
	return mp.game.invoke("0x8DC39368BDD57755", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.DETACH_PORTABLE_PICKUP_FROM_PED = (ped) => 
{
	return mp.game.invoke("0xCF463D1E9A0AECB1", ped);
}


// Arg:hash is [Hash]	Arg:p1 is [int]	
g_Natives["0x0BF3B3BD47D79C08"] = (hash, p1) => 
{
	return mp.game.invoke("0x0BF3B3BD47D79C08", hash, p1);
}


// Arg:p0 is [BOOL]	
g_Natives["0x78857FC65CADB909"] = (p0) => 
{
	return mp.game.invoke("0x78857FC65CADB909", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.GET_SAFE_PICKUP_COORDS = (x, y, z, p3, p4) => 
{
	return mp.game.invoke("0x6E16BC2503FF1FF0", x, y, z, p3, p4);
}


// Arg:pickup is [Pickup]	
g_Natives.GET_PICKUP_COORDS = (pickup) => 
{
	return mp.game.invoke("0x225B8B35C88029B3", pickup);
}


// Arg:pickupHash is [Hash]	
g_Natives.REMOVE_ALL_PICKUPS_OF_TYPE = (pickupHash) => 
{
	return mp.game.invoke("0x27F9D613092159CF", pickupHash);
}


// Arg:pickup is [Pickup]	
g_Natives.HAS_PICKUP_BEEN_COLLECTED = (pickup) => 
{
	return mp.game.invoke("0x80EC48E6679313F9", pickup);
}


// Arg:pickup is [Pickup]	
g_Natives.REMOVE_PICKUP = (pickup) => 
{
	return mp.game.invoke("0x3288D8ACAECD2AB2", pickup);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:value is [int]	Arg:amount is [int]	Arg:model is [Hash]	
g_Natives.CREATE_MONEY_PICKUPS = (x, y, z, value, amount, model) => 
{
	return mp.game.invoke("0x0589B5E791CE9B2B", x, y, z, value, amount, model);
}


// Arg:pickup is [Pickup]	
g_Natives.DOES_PICKUP_EXIST = (pickup) => 
{
	return mp.game.invoke("0xAFC1CA75AD4074D1", pickup);
}


// Arg:pickupObject is [Object]	
g_Natives.DOES_PICKUP_OBJECT_EXIST = (pickupObject) => 
{
	return mp.game.invoke("0xD9EFB6DBF7DAAEA3", pickupObject);
}


// Arg:pickup is [Pickup]	
g_Natives.GET_PICKUP_OBJECT = (pickup) => 
{
	return mp.game.invoke("0x5099BC55630B25AE", pickup);
}


// Arg:p0 is [Any]	
g_Natives["0x0378C08504160D0D"] = (p0) => 
{
	return mp.game.invoke("0x0378C08504160D0D", p0);
}


// Arg:pickupHash is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives._IS_PICKUP_WITHIN_RADIUS = (pickupHash, x, y, z, radius) => 
{
	return mp.game.invoke("0xF9C36251F6E48E33", pickupHash, x, y, z, radius);
}


// Arg:pickup is [Pickup]	Arg:duration is [int]	
g_Natives.SET_PICKUP_REGENERATION_TIME = (pickup, duration) => 
{
	return mp.game.invoke("0x78015C9B4B3ECC9D", pickup, duration);
}


// Arg:player is [Player]	Arg:pickupHash is [Hash]	Arg:p2 is [BOOL]	
g_Natives["0x616093EC6B139DD9"] = (player, pickupHash, p2) => 
{
	return mp.game.invoke("0x616093EC6B139DD9", player, pickupHash, p2);
}


// Arg:p0 is [Hash]	Arg:p1 is [BOOL]	
g_Natives["0x88EAEC617CD26926"] = (p0, p1) => 
{
	return mp.game.invoke("0x88EAEC617CD26926", p0, p1);
}


// Arg:object is [Object]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives.SET_TEAM_PICKUP_OBJECT = (object, p1, p2) => 
{
	return mp.game.invoke("0x53E0DF1A2A3CF0CA", object, p1, p2);
}


// Arg:object is [Object]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x92AEFB5F6E294023"] = (object, p1, p2) => 
{
	return mp.game.invoke("0x92AEFB5F6E294023", object, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [BOOL]	
g_Natives["0xA08FE5E49BDC39DD"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xA08FE5E49BDC39DD", p0, p1, p2);
}


// Arg:pickupHash is [Hash]	
g_Natives["0xDB41D07A45A6D4B7"] = (pickupHash) => 
{
	return mp.game.invoke("0xDB41D07A45A6D4B7", pickupHash);
}


// Arg:p0 is [float]	
g_Natives["0x318516E02DE3ECE2"] = (p0) => 
{
	return mp.game.invoke("0x318516E02DE3ECE2", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x31F924B53EADDF65"] = (p0) => 
{
	return mp.game.invoke("0x31F924B53EADDF65", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xF92099527DB8E2A7"] = (p0, p1) => 
{
	return mp.game.invoke("0xF92099527DB8E2A7", p0, p1);
}

g_Natives["0xA2C1F5E92AFE49ED"] = () => 
{
	return mp.game.invoke("0xA2C1F5E92AFE49ED");
}


// Arg:p0 is [Any]	
g_Natives["0x762DB2D380B48D04"] = (p0) => 
{
	return mp.game.invoke("0x762DB2D380B48D04", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:colorIndex is [int]	
g_Natives._HIGHLIGHT_PLACEMENT_COORDS = (x, y, z, colorIndex) => 
{
	return mp.game.invoke("0x3430676B11CDF21D", x, y, z, colorIndex);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives["0xB2D0BDE54F0E8E5A"] = (object, toggle) => 
{
	return mp.game.invoke("0xB2D0BDE54F0E8E5A", object, toggle);
}


// Arg:pickupHash is [Pickup]	
g_Natives._GET_WEAPON_HASH_FROM_PICKUP = (pickupHash) => 
{
	return mp.game.invoke("0x08F96CA6C551AD51", pickupHash);
}


// Arg:object is [Object]	
g_Natives["0x11D1E53A726891FE"] = (object) => 
{
	return mp.game.invoke("0x11D1E53A726891FE", object);
}


// Arg:object is [Object]	Arg:paintIndex is [int]	
g_Natives._SET_OBJECT_TEXTURE_VARIANT = (object, paintIndex) => 
{
	return mp.game.invoke("0x971DA0055324D033", object, paintIndex);
}


// Arg:pickupHash is [Pickup]	
g_Natives._GET_PICKUP_HASH = (pickupHash) => 
{
	return mp.game.invoke("0x5EAAD83F8CFB4575", pickupHash);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.SET_FORCE_OBJECT_THIS_FRAME = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xF538081986E49E9D", p0, p1, p2, p3);
}


// Arg:object is [Object]	
g_Natives._MARK_OBJECT_FOR_DELETION = (object) => 
{
	return mp.game.invoke("0xADBE4809F19F927A", object);
}


// Arg:ped is [Ped]	Arg:time is [int]	
g_Natives.TASK_PAUSE = (ped, time) => 
{
	return mp.game.invoke("0xE73A266DB0CA9042", ped, time);
}


// Arg:ped is [Ped]	Arg:time is [int]	
g_Natives.TASK_STAND_STILL = (ped, time) => 
{
	return mp.game.invoke("0x919BE13EED931959", ped, time);
}


// Arg:ped is [Ped]	Arg:unused is [BOOL]	
g_Natives.TASK_JUMP = (ped, unused) => 
{
	return mp.game.invoke("0x0AE4086104E067B1", ped, unused);
}


// Arg:ped is [Ped]	Arg:duration is [int]	
g_Natives.TASK_COWER = (ped, duration) => 
{
	return mp.game.invoke("0x3EB1FE9E8E908E15", ped, duration);
}


// Arg:ped is [Ped]	Arg:duration is [int]	Arg:facingPed is [Ped]	Arg:p3 is [int]	Arg:p4 is [BOOL]	
g_Natives.TASK_HANDS_UP = (ped, duration, facingPed, p3, p4) => 
{
	return mp.game.invoke("0xF2EAB31979A7F910", ped, duration, facingPed, p3, p4);
}


// Arg:ped is [Ped]	Arg:duration is [int]	
g_Natives.UPDATE_TASK_HANDS_UP_DURATION = (ped, duration) => 
{
	return mp.game.invoke("0xA98FCAFD7893C834", ped, duration);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:timeOut is [int]	Arg:doorIndex is [int]	Arg:speed is [float]	
g_Natives.TASK_OPEN_VEHICLE_DOOR = (ped, vehicle, timeOut, doorIndex, speed) => 
{
	return mp.game.invoke("0x965791A9A488A062", ped, vehicle, timeOut, doorIndex, speed);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:timeout is [int]	Arg:seat is [int]	Arg:speed is [float]	Arg:flag is [int]	Arg:p6 is [Any]	
g_Natives.TASK_ENTER_VEHICLE = (ped, vehicle, timeout, seat, speed, flag, p6) => 
{
	return mp.game.invoke("0xC20E50AA46D09CA8", ped, vehicle, timeout, seat, speed, flag, p6);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:flags is [int]	
g_Natives.TASK_LEAVE_VEHICLE = (ped, vehicle, flags) => 
{
	return mp.game.invoke("0xD3DBCE61A490BE02", ped, vehicle, flags);
}


// Arg:ped is [Ped]	Arg:boat is [Vehicle]	
g_Natives._TASK_GET_OFF_BOAT = (ped, boat) => 
{
	return mp.game.invoke("0x9C00E77AF14B2DFF", ped, boat);
}


// Arg:ped is [Ped]	
g_Natives.TASK_SKY_DIVE = (ped) => 
{
	return mp.game.invoke("0x601736CFE536B0A0", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.TASK_PARACHUTE = (ped, p1) => 
{
	return mp.game.invoke("0xD2F1C53C97EE81AB", ped, p1);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_PARACHUTE_TO_TARGET = (ped, x, y, z) => 
{
	return mp.game.invoke("0xB33E291AFA6BD03A", ped, x, y, z);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_PARACHUTE_TASK_TARGET = (ped, x, y, z) => 
{
	return mp.game.invoke("0xC313379AF0FCEDA7", ped, x, y, z);
}


// Arg:ped is [Ped]	Arg:thrust is [float]	
g_Natives.SET_PARACHUTE_TASK_THRUST = (ped, thrust) => 
{
	return mp.game.invoke("0x0729BAC1B8C64317", ped, thrust);
}


// Arg:ped is [Ped]	Arg:unused is [int]	
g_Natives.TASK_RAPPEL_FROM_HELI = (ped, unused) => 
{
	return mp.game.invoke("0x09693B0312F91649", ped, unused);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:p6 is [Any]	Arg:vehicleModel is [Hash]	Arg:drivingMode is [int]	Arg:stopRange is [float]	Arg:p10 is [float]	
g_Natives.TASK_VEHICLE_DRIVE_TO_COORD = (ped, vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10) => 
{
	return mp.game.invoke("0xE2A2AA2F659D77A7", ped, vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:driveMode is [int]	Arg:stopRange is [float]	
g_Natives.TASK_VEHICLE_DRIVE_TO_COORD_LONGRANGE = (ped, vehicle, x, y, z, speed, driveMode, stopRange) => 
{
	return mp.game.invoke("0x158BB33F920D360C", ped, vehicle, x, y, z, speed, driveMode, stopRange);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:speed is [float]	Arg:drivingStyle is [int]	
g_Natives.TASK_VEHICLE_DRIVE_WANDER = (ped, vehicle, speed, drivingStyle) => 
{
	return mp.game.invoke("0x480142959D337D00", ped, vehicle, speed, drivingStyle);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:movementSpeed is [float]	Arg:timeout is [int]	Arg:stoppingRange is [float]	Arg:persistFollowing is [BOOL]	
g_Natives.TASK_FOLLOW_TO_OFFSET_OF_ENTITY = (ped, entity, offsetX, offsetY, offsetZ, movementSpeed, timeout, stoppingRange, persistFollowing) => 
{
	return mp.game.invoke("0x304AE42E357B8C7E", ped, entity, offsetX, offsetY, offsetZ, movementSpeed, timeout, stoppingRange, persistFollowing);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:timeout is [int]	Arg:targetHeading is [float]	Arg:distanceToSlide is [float]	
g_Natives.TASK_GO_STRAIGHT_TO_COORD = (ped, x, y, z, speed, timeout, targetHeading, distanceToSlide) => 
{
	return mp.game.invoke("0xD76B57B44F1E6F8B", ped, x, y, z, speed, timeout, targetHeading, distanceToSlide);
}


// Arg:entity1 is [Entity]	Arg:entity2 is [Entity]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [Any]	
g_Natives.TASK_GO_STRAIGHT_TO_COORD_RELATIVE_TO_ENTITY = (entity1, entity2, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x61E360B7E040D12E", entity1, entity2, p2, p3, p4, p5, p6);
}


// Arg:ped is [Ped]	Arg:heading is [float]	Arg:timeout is [int]	
g_Natives.TASK_ACHIEVE_HEADING = (ped, heading, timeout) => 
{
	return mp.game.invoke("0x93B93A37987F1F3D", ped, heading, timeout);
}

g_Natives.TASK_FLUSH_ROUTE = () => 
{
	return mp.game.invoke("0x841142A1376E9006");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_EXTEND_ROUTE = (x, y, z) => 
{
	return mp.game.invoke("0x1E7889778264843A", x, y, z);
}


// Arg:ped is [Ped]	Arg:speed is [float]	Arg:unknown is [int]	
g_Natives.TASK_FOLLOW_POINT_ROUTE = (ped, speed, unknown) => 
{
	return mp.game.invoke("0x595583281858626E", ped, speed, unknown);
}


// Arg:entity is [Entity]	Arg:target is [Entity]	Arg:duration is [int]	Arg:distance is [float]	Arg:speed is [float]	Arg:p5 is [float]	Arg:p6 is [int]	
g_Natives.TASK_GO_TO_ENTITY = (entity, target, duration, distance, speed, p5, p6) => 
{
	return mp.game.invoke("0x6A071245EB0D1882", entity, target, duration, distance, speed, p5, p6);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:distance is [float]	Arg:time is [int]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.TASK_SMART_FLEE_COORD = (ped, x, y, z, distance, time, p6, p7) => 
{
	return mp.game.invoke("0x94587F17E9C365D5", ped, x, y, z, distance, time, p6, p7);
}


// Arg:ped is [Ped]	Arg:fleeTarget is [Ped]	Arg:distance is [float]	Arg:fleeTime is [Any]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives.TASK_SMART_FLEE_PED = (ped, fleeTarget, distance, fleeTime, p4, p5) => 
{
	return mp.game.invoke("0x22B0D0E37CCB840D", ped, fleeTarget, distance, fleeTime, p4, p5);
}


// Arg:ped is [Ped]	Arg:fleeTarget is [Ped]	
g_Natives.TASK_REACT_AND_FLEE_PED = (ped, fleeTarget) => 
{
	return mp.game.invoke("0x72C896464915D1B1", ped, fleeTarget);
}


// Arg:ped is [Ped]	Arg:eventHandle is [int]	
g_Natives.TASK_SHOCKING_EVENT_REACT = (ped, eventHandle) => 
{
	return mp.game.invoke("0x452419CBD838065B", ped, eventHandle);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:minimalLength is [float]	Arg:timeBetweenWalks is [float]	
g_Natives.TASK_WANDER_IN_AREA = (ped, x, y, z, radius, minimalLength, timeBetweenWalks) => 
{
	return mp.game.invoke("0xE054346CA3A0F315", ped, x, y, z, radius, minimalLength, timeBetweenWalks);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	Arg:p2 is [int]	
g_Natives.TASK_WANDER_STANDARD = (ped, p1, p2) => 
{
	return mp.game.invoke("0xBB9CE077274F6A1B", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:mode is [int]	Arg:radius is [float]	Arg:keepEngineOn is [BOOL]	
g_Natives.TASK_VEHICLE_PARK = (ped, vehicle, x, y, z, heading, mode, radius, keepEngineOn) => 
{
	return mp.game.invoke("0x0F3E34E968EA374E", ped, vehicle, x, y, z, heading, mode, radius, keepEngineOn);
}


// Arg:killer is [Ped]	Arg:target is [Ped]	Arg:actionType is [Hash]	Arg:p3 is [float]	Arg:p4 is [Any]	
g_Natives.TASK_STEALTH_KILL = (killer, target, actionType, p3, p4) => 
{
	return mp.game.invoke("0xAA5DC05579D60BD9", killer, target, actionType, p3, p4);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	
g_Natives.TASK_PLANT_BOMB = (ped, x, y, z, heading) => 
{
	return mp.game.invoke("0x965FEC691D55E9BF", ped, x, y, z, heading);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:timeout is [int]	Arg:stoppingRange is [float]	Arg:persistFollowing is [BOOL]	Arg:unk is [float]	
g_Natives.TASK_FOLLOW_NAV_MESH_TO_COORD = (ped, x, y, z, speed, timeout, stoppingRange, persistFollowing, unk) => 
{
	return mp.game.invoke("0x15D3A79D4E44B913", ped, x, y, z, speed, timeout, stoppingRange, persistFollowing, unk);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:timeout is [int]	Arg:unkFloat is [float]	Arg:unkInt is [int]	Arg:unkX is [float]	Arg:unkY is [float]	Arg:unkZ is [float]	Arg:unk_40000f is [float]	
g_Natives.TASK_FOLLOW_NAV_MESH_TO_COORD_ADVANCED = (ped, x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk_40000f) => 
{
	return mp.game.invoke("0x17F58B88D085DBAC", ped, x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk_40000f);
}


// Arg:ped is [Ped]	Arg:Toggle is [BOOL]	
g_Natives.SET_PED_PATH_CAN_USE_CLIMBOVERS = (ped, Toggle) => 
{
	return mp.game.invoke("0x8E06A6FE76C9EFF4", ped, Toggle);
}


// Arg:ped is [Ped]	Arg:Toggle is [BOOL]	
g_Natives.SET_PED_PATH_CAN_USE_LADDERS = (ped, Toggle) => 
{
	return mp.game.invoke("0x77A5B103C87F476E", ped, Toggle);
}


// Arg:ped is [Ped]	Arg:Toggle is [BOOL]	
g_Natives.SET_PED_PATH_CAN_DROP_FROM_HEIGHT = (ped, Toggle) => 
{
	return mp.game.invoke("0xE361C5C71C431A4F", ped, Toggle);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives._SET_PED_PATH_SPEED = (ped, p1) => 
{
	return mp.game.invoke("0x88E32DB8C1A4AA4B", ped, p1);
}


// Arg:ped is [Ped]	Arg:mayEnterWater is [BOOL]	
g_Natives.SET_PED_PATHS_WIDTH_PLANT = (ped, mayEnterWater) => 
{
	return mp.game.invoke("0xF35425A4204367EC", ped, mayEnterWater);
}


// Arg:ped is [Ped]	Arg:avoidWater is [BOOL]	
g_Natives.SET_PED_PATH_PREFER_TO_AVOID_WATER = (ped, avoidWater) => 
{
	return mp.game.invoke("0x38FE1EC73743793C", ped, avoidWater);
}


// Arg:ped is [Ped]	Arg:avoidFire is [BOOL]	
g_Natives.SET_PED_PATH_AVOID_FIRE = (ped, avoidFire) => 
{
	return mp.game.invoke("0x4455517B28441E60", ped, avoidFire);
}


// Arg:height is [float]	
g_Natives.SET_GLOBAL_MIN_BIRD_FLIGHT_HEIGHT = (height) => 
{
	return mp.game.invoke("0x6C6B148586F934F7", height);
}


// Arg:ped is [Ped]	Arg:distRemaining is [float*]	Arg:isPathReady is [BOOL*]	
g_Natives.GET_NAVMESH_ROUTE_DISTANCE_REMAINING = (ped, distRemaining, isPathReady) => 
{
	return mp.game.invoke("0xC6F5C0BCDC74D62D", ped, distRemaining, isPathReady);
}


// Arg:ped is [Ped]	
g_Natives.GET_NAVMESH_ROUTE_RESULT = (ped) => 
{
	return mp.game.invoke("0x632E831F382A0FA8", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x3E38E28A1D80DDF6"] = (ped) => 
{
	return mp.game.invoke("0x3E38E28A1D80DDF6", ped);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:p5 is [Any]	Arg:p6 is [BOOL]	Arg:walkingStyle is [int]	Arg:p8 is [float]	
g_Natives.TASK_GO_TO_COORD_ANY_MEANS = (ped, x, y, z, speed, p5, p6, walkingStyle, p8) => 
{
	return mp.game.invoke("0x5BC448CB78FA3E88", ped, x, y, z, speed, p5, p6, walkingStyle, p8);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:p5 is [Any]	Arg:p6 is [BOOL]	Arg:walkingStyle is [int]	Arg:p8 is [float]	Arg:p9 is [Any]	Arg:p10 is [Any]	Arg:p11 is [Any]	
g_Natives.TASK_GO_TO_COORD_ANY_MEANS_EXTRA_PARAMS = (ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x1DD45F9ECFDB1BC9", ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:p5 is [Any]	Arg:p6 is [BOOL]	Arg:walkingStyle is [int]	Arg:p8 is [float]	Arg:p9 is [Any]	Arg:p10 is [Any]	Arg:p11 is [Any]	Arg:p12 is [Any]	
g_Natives.TASK_GO_TO_COORD_ANY_MEANS_EXTRA_PARAMS_WITH_CRUISE_SPEED = (ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0xB8ECD61F531A7B02", ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12);
}


// Arg:ped is [Ped]	Arg:animDictionary is [char*]	Arg:animationName is [char*]	Arg:speed is [float]	Arg:speedMultiplier is [float]	Arg:duration is [int]	Arg:flag is [int]	Arg:playbackRate is [float]	Arg:lockX is [BOOL]	Arg:lockY is [BOOL]	Arg:lockZ is [BOOL]	
g_Natives.TASK_PLAY_ANIM = (ped, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ) => 
{
	return mp.game.invoke("0xEA47FE3719165B94", ped, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:speed is [float]	Arg:speedMultiplier is [float]	Arg:duration is [int]	Arg:flag is [Any]	Arg:animTime is [float]	Arg:p14 is [int]	Arg:p15 is [int]	
g_Natives.TASK_PLAY_ANIM_ADVANCED = (ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, animTime, p14, p15) => 
{
	return mp.game.invoke("0x83CDB10EA29B370B", ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, animTime, p14, p15);
}


// Arg:ped is [Ped]	Arg:animDictionary is [char*]	Arg:animationName is [char*]	Arg:blendoutSpeed is [float]	
g_Natives.STOP_ANIM_TASK = (ped, animDictionary, animationName, blendoutSpeed) => 
{
	return mp.game.invoke("0x97FF36A1D40EA00A", ped, animDictionary, animationName, blendoutSpeed);
}


// Arg:ped is [Ped]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.TASK_SCRIPTED_ANIMATION = (ped, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x126EF75F1E17ABE5", ped, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.PLAY_ENTITY_SCRIPTED_ANIM = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x77A1EEC547E7FCF1", p0, p1, p2, p3, p4, p5);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	Arg:p2 is [BOOL]	
g_Natives.STOP_ANIM_PLAYBACK = (ped, p1, p2) => 
{
	return mp.game.invoke("0xEE08C992D238C5D1", ped, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [BOOL]	
g_Natives.SET_ANIM_WEIGHT = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x207F1A47C0342F48", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	
g_Natives.SET_ANIM_RATE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x032D49C5E359C847", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	
g_Natives.SET_ANIM_LOOPED = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x70033C3CC29A1FF4", p0, p1, p2, p3);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animation is [char*]	Arg:boneMaskType is [char*]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.TASK_PLAY_PHONE_GESTURE_ANIMATION = (ped, animDict, animation, boneMaskType, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x8FBB6758B3B3E9EC", ped, animDict, animation, boneMaskType, p4, p5, p6, p7);
}


// Arg:ped is [Ped]	
g_Natives._TASK_STOP_PHONE_GESTURE_ANIMATION = (ped) => 
{
	return mp.game.invoke("0x3FA00D4F4641BFAE", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PLAYING_PHONE_GESTURE_ANIM = (ped) => 
{
	return mp.game.invoke("0xB8EBB1E9D3588C10", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PHONE_GESTURE_ANIM_CURRENT_TIME = (ped) => 
{
	return mp.game.invoke("0x47619ABE8B268C60", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PHONE_GESTURE_ANIM_TOTAL_TIME = (ped) => 
{
	return mp.game.invoke("0x1EE0F68A7C25DEC6", ped);
}


// Arg:vehicle is [Vehicle]	Arg:animation_set is [char*]	Arg:animation_name is [char*]	
g_Natives.TASK_VEHICLE_PLAY_ANIM = (vehicle, animation_set, animation_name) => 
{
	return mp.game.invoke("0x69F5C3BD0F3EBD89", vehicle, animation_set, animation_name);
}


// Arg:entity is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [float]	Arg:p5 is [Any]	Arg:p6 is [Any]	
g_Natives.TASK_LOOK_AT_COORD = (entity, x, y, z, duration, p5, p6) => 
{
	return mp.game.invoke("0x6FA46612594F7973", entity, x, y, z, duration, p5, p6);
}


// Arg:ped is [Ped]	Arg:lookAt is [Entity]	Arg:duration is [int]	Arg:unknown1 is [int]	Arg:unknown2 is [int]	
g_Natives.TASK_LOOK_AT_ENTITY = (ped, lookAt, duration, unknown1, unknown2) => 
{
	return mp.game.invoke("0x69F4BE8C8CC4796C", ped, lookAt, duration, unknown1, unknown2);
}


// Arg:ped is [Ped]	
g_Natives.TASK_CLEAR_LOOK_AT = (ped) => 
{
	return mp.game.invoke("0x0F804F1DB19B9689", ped);
}


// Arg:taskSequence is [Object*]	
g_Natives.OPEN_SEQUENCE_TASK = (taskSequence) => 
{
	return mp.game.invoke("0xE8854A4326B9E12B", taskSequence);
}


// Arg:taskSequence is [Object]	
g_Natives.CLOSE_SEQUENCE_TASK = (taskSequence) => 
{
	return mp.game.invoke("0x39E72BC99E6360CB", taskSequence);
}


// Arg:ped is [Ped]	Arg:taskSequence is [Object]	
g_Natives.TASK_PERFORM_SEQUENCE = (ped, taskSequence) => 
{
	return mp.game.invoke("0x5ABA3986D90D8A3B", ped, taskSequence);
}


// Arg:taskSequence is [Object*]	
g_Natives.CLEAR_SEQUENCE_TASK = (taskSequence) => 
{
	return mp.game.invoke("0x3841422E9C488D8C", taskSequence);
}


// Arg:taskSequence is [Object]	Arg:repeat is [BOOL]	
g_Natives.SET_SEQUENCE_TO_REPEAT = (taskSequence, repeat) => 
{
	return mp.game.invoke("0x58C70CF3A41E4AE7", taskSequence, repeat);
}


// Arg:ped is [Ped]	
g_Natives.GET_SEQUENCE_PROGRESS = (ped) => 
{
	return mp.game.invoke("0x00A9010CFE1E3533", ped);
}


// Arg:ped is [Ped]	Arg:taskNumber is [int]	
g_Natives.GET_IS_TASK_ACTIVE = (ped, taskNumber) => 
{
	return mp.game.invoke("0xB0760331C7AA4155", ped, taskNumber);
}


// Arg:targetPed is [Ped]	Arg:taskHash is [Hash]	
g_Natives.GET_SCRIPT_TASK_STATUS = (targetPed, taskHash) => 
{
	return mp.game.invoke("0x77F1BEB8863288D5", targetPed, taskHash);
}


// Arg:veh is [Vehicle]	
g_Natives.GET_ACTIVE_VEHICLE_MISSION_TYPE = (veh) => 
{
	return mp.game.invoke("0x534AEBA6E5ED4CAB", veh);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives.TASK_LEAVE_ANY_VEHICLE = (ped, p1, p2) => 
{
	return mp.game.invoke("0x504D54DF3F6F2247", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:scriptTask is [Hash]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.TASK_AIM_GUN_SCRIPTED = (ped, scriptTask, p2, p3) => 
{
	return mp.game.invoke("0x7A192BE16D373D00", ped, scriptTask, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [Any]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.TASK_AIM_GUN_SCRIPTED_WITH_TARGET = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x8605AF0DE8B3A5AC", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:p0 is [Ped]	Arg:p1 is [Ped]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [BOOL]	
g_Natives.UPDATE_TASK_AIM_GUN_SCRIPTED_TARGET = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x9724FB59A3E72AD0", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [int]	
g_Natives.GET_CLIP_SET_FOR_SCRIPTED_GUN_TASK = (p0) => 
{
	return mp.game.invoke("0x3A8CADC7D37AACC5", p0);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	Arg:duration is [int]	Arg:unk is [BOOL]	
g_Natives.TASK_AIM_GUN_AT_ENTITY = (ped, entity, duration, unk) => 
{
	return mp.game.invoke("0x9B53BB6E8943AF53", ped, entity, duration, unk);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	Arg:duration is [int]	
g_Natives.TASK_TURN_PED_TO_FACE_ENTITY = (ped, entity, duration) => 
{
	return mp.game.invoke("0x5AD23D40115353AC", ped, entity, duration);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:time is [int]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	
g_Natives.TASK_AIM_GUN_AT_COORD = (ped, x, y, z, time, p5, p6) => 
{
	return mp.game.invoke("0x6671F3EEC681BDA1", ped, x, y, z, time, p5, p6);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [int]	Arg:firingPattern is [Hash]	
g_Natives.TASK_SHOOT_AT_COORD = (ped, x, y, z, duration, firingPattern) => 
{
	return mp.game.invoke("0x46A6CC01E0826106", ped, x, y, z, duration, firingPattern);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	
g_Natives.TASK_SHUFFLE_TO_NEXT_VEHICLE_SEAT = (ped, vehicle) => 
{
	return mp.game.invoke("0x7AA80209BDA643EB", ped, vehicle);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_TASKS = (ped) => 
{
	return mp.game.invoke("0xE1EF3C1216AFF2CD", ped);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_SECONDARY_TASK = (ped) => 
{
	return mp.game.invoke("0x176CECF6F920D707", ped);
}


// Arg:vehicle is [Vehicle]	
g_Natives.TASK_EVERYONE_LEAVE_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0x7F93691AB4B92272", vehicle);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [int]	
g_Natives.TASK_GOTO_ENTITY_OFFSET = (ped, p1, p2, x, y, z, duration) => 
{
	return mp.game.invoke("0xE39B4FF4FDEBDE27", ped, p1, p2, x, y, z, duration);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	Arg:duration is [int]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:moveBlendRatio is [float]	Arg:useNavmesh is [BOOL]	
g_Natives.TASK_GOTO_ENTITY_OFFSET_XY = (ped, entity, duration, xOffset, yOffset, zOffset, moveBlendRatio, useNavmesh) => 
{
	return mp.game.invoke("0x338E7EF52B6095A9", ped, entity, duration, xOffset, yOffset, zOffset, moveBlendRatio, useNavmesh);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [int]	
g_Natives.TASK_TURN_PED_TO_FACE_COORD = (ped, x, y, z, duration) => 
{
	return mp.game.invoke("0x1DDA930A0AC38571", ped, x, y, z, duration);
}


// Arg:driver is [Ped]	Arg:vehicle is [Vehicle]	Arg:action is [int]	Arg:time is [int]	
g_Natives.TASK_VEHICLE_TEMP_ACTION = (driver, vehicle, action, time) => 
{
	return mp.game.invoke("0xC429DCEEB339E129", driver, vehicle, action, time);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:veh is [Vehicle]	Arg:p3 is [Any]	Arg:p4 is [float]	Arg:p5 is [Any]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [BOOL]	
g_Natives.TASK_VEHICLE_MISSION = (p0, p1, veh, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x659427E0EF36BCDE", p0, p1, veh, p3, p4, p5, p6, p7, p8);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:pedTarget is [Ped]	Arg:mode is [int]	Arg:maxSpeed is [float]	Arg:drivingStyle is [int]	Arg:minDistance is [float]	Arg:p7 is [float]	Arg:p8 is [BOOL]	
g_Natives.TASK_VEHICLE_MISSION_PED_TARGET = (ped, vehicle, pedTarget, mode, maxSpeed, drivingStyle, minDistance, p7, p8) => 
{
	return mp.game.invoke("0x9454528DF15D657A", ped, vehicle, pedTarget, mode, maxSpeed, drivingStyle, minDistance, p7, p8);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [int]	Arg:p6 is [int]	Arg:p7 is [int]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [BOOL]	
g_Natives.TASK_VEHICLE_MISSION_COORS_TARGET = (ped, vehicle, x, y, z, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0xF0AF20AA7731F8C3", ped, vehicle, x, y, z, p5, p6, p7, p8, p9, p10);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:targetVehicle is [Vehicle]	Arg:mode is [int]	Arg:speed is [float]	Arg:drivingStyle is [int]	Arg:minDistance is [float]	Arg:p7 is [int]	Arg:noRoadsDistance is [float]	
g_Natives.TASK_VEHICLE_ESCORT = (ped, vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance) => 
{
	return mp.game.invoke("0x0FA6E4B75F302400", ped, vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance);
}


// Arg:driver is [Ped]	Arg:vehicle is [Vehicle]	Arg:targetEntity is [Entity]	Arg:speed is [float]	Arg:drivingStyle is [int]	Arg:minDistance is [int]	
g_Natives._TASK_VEHICLE_FOLLOW = (driver, vehicle, targetEntity, speed, drivingStyle, minDistance) => 
{
	return mp.game.invoke("0xFC545A9F0626E3B6", driver, vehicle, targetEntity, speed, drivingStyle, minDistance);
}


// Arg:driver is [Ped]	Arg:targetEnt is [Entity]	
g_Natives.TASK_VEHICLE_CHASE = (driver, targetEnt) => 
{
	return mp.game.invoke("0x3C08A8E30363B353", driver, targetEnt);
}


// Arg:pilot is [Ped]	Arg:vehicle is [Vehicle]	Arg:entityToFollow is [Entity]	Arg:targetSpeed is [float]	Arg:p4 is [int]	Arg:radius is [float]	Arg:altitude is [int]	Arg:p7 is [int]	
g_Natives.TASK_VEHICLE_HELI_PROTECT = (pilot, vehicle, entityToFollow, targetSpeed, p4, radius, altitude, p7) => 
{
	return mp.game.invoke("0x1E09C32048FEFD1C", pilot, vehicle, entityToFollow, targetSpeed, p4, radius, altitude, p7);
}


// Arg:ped is [Ped]	Arg:flag is [int]	Arg:set is [BOOL]	
g_Natives.SET_TASK_VEHICLE_CHASE_BEHAVIOR_FLAG = (ped, flag, set) => 
{
	return mp.game.invoke("0xCC665AAC360D31E7", ped, flag, set);
}


// Arg:ped is [Ped]	Arg:distance is [float]	
g_Natives.SET_TASK_VEHICLE_CHASE_IDEAL_PURSUIT_DISTANCE = (ped, distance) => 
{
	return mp.game.invoke("0x639B642FACBE4EDD", ped, distance);
}


// Arg:pilot is [Ped]	Arg:entityToFollow is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_HELI_CHASE = (pilot, entityToFollow, x, y, z) => 
{
	return mp.game.invoke("0xAC83B1DB38D0ADA0", pilot, entityToFollow, x, y, z);
}


// Arg:pilot is [Ped]	Arg:entityToFollow is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_PLANE_CHASE = (pilot, entityToFollow, x, y, z) => 
{
	return mp.game.invoke("0x2D2386F273FF7A25", pilot, entityToFollow, x, y, z);
}


// Arg:pilot is [Ped]	Arg:plane is [Vehicle]	Arg:runwayStartX is [float]	Arg:runwayStartY is [float]	Arg:runwayStartZ is [float]	Arg:runwayEndX is [float]	Arg:runwayEndY is [float]	Arg:runwayEndZ is [float]	
g_Natives.TASK_PLANE_LAND = (pilot, plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ) => 
{
	return mp.game.invoke("0xBF19721FA34D32C0", pilot, plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ);
}


// Arg:pilot is [Ped]	Arg:aircraft is [Vehicle]	Arg:targetVehicle is [Vehicle]	Arg:targetPed is [Ped]	Arg:destinationX is [float]	Arg:destinationY is [float]	Arg:destinationZ is [float]	Arg:missionFlag is [int]	Arg:maxSpeed is [float]	Arg:landingRadius is [float]	Arg:targetHeading is [float]	Arg:unk1 is [int]	Arg:unk2 is [int]	Arg:unk3 is [Hash]	Arg:landingFlags is [int]	
g_Natives.TASK_HELI_MISSION = (pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, maxSpeed, landingRadius, targetHeading, unk1, unk2, unk3, landingFlags) => 
{
	return mp.game.invoke("0xDAD029E187A2BEB4", pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, maxSpeed, landingRadius, targetHeading, unk1, unk2, unk3, landingFlags);
}


// Arg:pilot is [Ped]	Arg:aircraft is [Vehicle]	Arg:targetVehicle is [Vehicle]	Arg:targetPed is [Ped]	Arg:destinationX is [float]	Arg:destinationY is [float]	Arg:destinationZ is [float]	Arg:missionFlag is [int]	Arg:angularDrag is [float]	Arg:unk is [float]	Arg:targetHeading is [float]	Arg:maxZ is [float]	Arg:minZ is [float]	
g_Natives.TASK_PLANE_MISSION = (pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, angularDrag, unk, targetHeading, maxZ, minZ) => 
{
	return mp.game.invoke("0x23703CD154E83B88", pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, angularDrag, unk, targetHeading, maxZ, minZ);
}


// Arg:pedDriver is [Ped]	Arg:boat is [Vehicle]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p7 is [Any]	Arg:maxSpeed is [float]	Arg:drivingStyle is [int]	Arg:p10 is [float]	Arg:p11 is [Any]	
g_Natives.TASK_BOAT_MISSION = (pedDriver, boat, p2, p3, x, y, z, p7, maxSpeed, drivingStyle, p10, p11) => 
{
	return mp.game.invoke("0x15C86013127CE63F", pedDriver, boat, p2, p3, x, y, z, p7, maxSpeed, drivingStyle, p10, p11);
}


// Arg:driverPed is [Ped]	Arg:targetPed is [Ped]	Arg:targetVehicle is [Vehicle]	Arg:targetX is [float]	Arg:targetY is [float]	Arg:targetZ is [float]	Arg:distanceToShoot is [float]	Arg:pedAccuracy is [int]	Arg:p8 is [BOOL]	Arg:firingPattern is [Hash]	
g_Natives.TASK_DRIVE_BY = (driverPed, targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, p8, firingPattern) => 
{
	return mp.game.invoke("0x2F8AF0E82773A171", driverPed, targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, p8, firingPattern);
}


// Arg:shootingPed is [Ped]	Arg:targetPed is [Ped]	Arg:targetVehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_DRIVEBY_TASK_TARGET = (shootingPed, targetPed, targetVehicle, x, y, z) => 
{
	return mp.game.invoke("0xE5B302114D8162EE", shootingPed, targetPed, targetVehicle, x, y, z);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_DRIVEBY_TASK_UNDERNEATH_DRIVING_TASK = (ped) => 
{
	return mp.game.invoke("0xC35B5CDB2824CF69", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_DRIVEBY_TASK_UNDERNEATH_DRIVING_TASK = (ped) => 
{
	return mp.game.invoke("0x8785E6E40C7A8818", ped);
}


// Arg:ped is [Ped]	
g_Natives.CONTROL_MOUNTED_WEAPON = (ped) => 
{
	return mp.game.invoke("0xDCFE42068FE0135A", ped);
}


// Arg:shootingPed is [Ped]	Arg:targetPed is [Ped]	Arg:targetVehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_MOUNTED_WEAPON_TARGET = (shootingPed, targetPed, targetVehicle, x, y, z) => 
{
	return mp.game.invoke("0xCCD892192C6D2BB9", shootingPed, targetPed, targetVehicle, x, y, z);
}


// Arg:ped is [Ped]	
g_Natives.IS_MOUNTED_WEAPON_TASK_UNDERNEATH_DRIVING_TASK = (ped) => 
{
	return mp.game.invoke("0xA320EF046186FA3B", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.TASK_USE_MOBILE_PHONE = (ped, p1) => 
{
	return mp.game.invoke("0xBD2A8EC3AF4DE7DB", ped, p1);
}


// Arg:ped is [Ped]	Arg:duration is [int]	
g_Natives.TASK_USE_MOBILE_PHONE_TIMED = (ped, duration) => 
{
	return mp.game.invoke("0x5EE02954A14C69DB", ped, duration);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:p2 is [int]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	
g_Natives.TASK_CHAT_TO_PED = (ped, target, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x8C338E0263E4FD19", ped, target, p2, p3, p4, p5, p6, p7);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:seat is [int]	
g_Natives.TASK_WARP_PED_INTO_VEHICLE = (ped, vehicle, seat) => 
{
	return mp.game.invoke("0x9A7D091411C5F684", ped, vehicle, seat);
}


// Arg:entity is [Entity]	Arg:target is [Entity]	Arg:duration is [int]	Arg:firingPattern is [Hash]	
g_Natives.TASK_SHOOT_AT_ENTITY = (entity, target, duration, firingPattern) => 
{
	return mp.game.invoke("0x08DA95E8298AE772", entity, target, duration, firingPattern);
}


// Arg:ped is [Ped]	Arg:unused is [BOOL]	
g_Natives.TASK_CLIMB = (ped, unused) => 
{
	return mp.game.invoke("0x89D9FCC2435112F1", ped, unused);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.TASK_CLIMB_LADDER = (ped, p1) => 
{
	return mp.game.invoke("0xB6C987F9285A3814", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_TASKS_IMMEDIATELY = (ped) => 
{
	return mp.game.invoke("0xAAA34F8A7CB32098", ped);
}


// Arg:ped is [Ped]	Arg:taskSequence is [Object]	Arg:currentProgress is [int]	Arg:progressToSetTo is [int]	
g_Natives.TASK_PERFORM_SEQUENCE_FROM_PROGRESS = (ped, taskSequence, currentProgress, progressToSetTo) => 
{
	return mp.game.invoke("0x89221B16730234F0", ped, taskSequence, currentProgress, progressToSetTo);
}


// Arg:p0 is [float]	
g_Natives.SET_NEXT_DESIRED_MOVE_STATE = (p0) => 
{
	return mp.game.invoke("0xF1B9F16E89E2C93A", p0);
}


// Arg:ped is [Ped]	Arg:p1 is [float]	
g_Natives.SET_PED_DESIRED_MOVE_BLEND_RATIO = (ped, p1) => 
{
	return mp.game.invoke("0x1E982AC8716912C5", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_DESIRED_MOVE_BLEND_RATIO = (ped) => 
{
	return mp.game.invoke("0x8517D4A6CA8513ED", ped);
}


// Arg:ped is [Ped]	Arg:target is [Entity]	Arg:distanceToStopAt is [float]	Arg:StartAimingDist is [float]	
g_Natives.TASK_GOTO_ENTITY_AIMING = (ped, target, distanceToStopAt, StartAimingDist) => 
{
	return mp.game.invoke("0xA9DA48FAB8A76C12", ped, target, distanceToStopAt, StartAimingDist);
}


// Arg:p0 is [Ped]	Arg:p1 is [Hash]	
g_Natives.TASK_SET_DECISION_MAKER = (p0, p1) => 
{
	return mp.game.invoke("0xEB8517DDA73720DA", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	
g_Natives.TASK_SET_SPHERE_DEFENSIVE_AREA = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x933C06518B52A9A4", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	
g_Natives.TASK_CLEAR_DEFENSIVE_AREA = (p0) => 
{
	return mp.game.invoke("0x95A6C46A31D1917D", p0);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:duration is [float]	
g_Natives.TASK_PED_SLIDE_TO_COORD = (ped, x, y, z, heading, duration) => 
{
	return mp.game.invoke("0xD04FE6765D990A06", ped, x, y, z, heading, duration);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives.TASK_PED_SLIDE_TO_COORD_HDG_RATE = (ped, x, y, z, heading, p5, p6) => 
{
	return mp.game.invoke("0x5A4A6A6D3DC64F52", ped, x, y, z, heading, p5, p6);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:heading is [float]	Arg:p4 is [BOOL]	Arg:p5 is [int]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.ADD_COVER_POINT = (posX, posY, posZ, heading, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0xD5C12A75C7B9497F", posX, posY, posZ, heading, p4, p5, p6, p7);
}


// Arg:coverpoint is [ScrHandle]	
g_Natives.REMOVE_COVER_POINT = (coverpoint) => 
{
	return mp.game.invoke("0xAE287C923D891715", coverpoint);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.DOES_SCRIPTED_COVER_POINT_EXIST_AT_COORDS = (x, y, z) => 
{
	return mp.game.invoke("0xA98B8E3C088E5A31", x, y, z);
}


// Arg:coverpoint is [ScrHandle]	
g_Natives.GET_SCRIPTED_COVER_POINT_COORDS = (coverpoint) => 
{
	return mp.game.invoke("0x594A1028FC2A3E85", coverpoint);
}


// Arg:ped is [Ped]	Arg:targetPed is [Ped]	Arg:p2 is [int]	Arg:p3 is [int]	
g_Natives.TASK_COMBAT_PED = (ped, targetPed, p2, p3) => 
{
	return mp.game.invoke("0xF166E48407BAC484", ped, targetPed, p2, p3);
}


// Arg:p0 is [Any]	Arg:ped is [Ped]	Arg:duration is [int]	Arg:p3 is [Any]	
g_Natives.TASK_COMBAT_PED_TIMED = (p0, ped, duration, p3) => 
{
	return mp.game.invoke("0x944F30DCB7096BDE", p0, ped, duration, p3);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [int]	Arg:p5 is [BOOL]	
g_Natives.TASK_SEEK_COVER_FROM_POS = (ped, x, y, z, duration, p5) => 
{
	return mp.game.invoke("0x75AC2B60386D89F2", ped, x, y, z, duration, p5);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:duration is [int]	Arg:p3 is [BOOL]	
g_Natives.TASK_SEEK_COVER_FROM_PED = (ped, target, duration, p3) => 
{
	return mp.game.invoke("0x84D32B3BEC531324", ped, target, duration, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [Any]	Arg:p6 is [BOOL]	
g_Natives.TASK_SEEK_COVER_TO_COVER_POINT = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xD43D95C7A869447F", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:ped is [Ped]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p7 is [Any]	Arg:p8 is [BOOL]	
g_Natives.TASK_SEEK_COVER_TO_COORDS = (ped, x1, y1, z1, x2, y2, z2, p7, p8) => 
{
	return mp.game.invoke("0x39246A6958EF072C", ped, x1, y1, z1, x2, y2, z2, p7, p8);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:timeout is [Any]	Arg:p5 is [BOOL]	Arg:p6 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [Any]	Arg:p10 is [BOOL]	
g_Natives.TASK_PUT_PED_DIRECTLY_INTO_COVER = (ped, x, y, z, timeout, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0x4172393E6BE1FECE", ped, x, y, z, timeout, p5, p6, p7, p8, p9, p10);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.TASK_EXIT_COVER = (ped, p1, posX, posY, posZ) => 
{
	return mp.game.invoke("0x79B258E397854D29", ped, p1, posX, posY, posZ);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:flag is [float]	
g_Natives.TASK_PUT_PED_DIRECTLY_INTO_MELEE = (ped, target, p2, p3, p4, flag) => 
{
	return mp.game.invoke("0x1C6CD14A876FFE39", ped, target, p2, p3, p4, flag);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.TASK_TOGGLE_DUCK = (p0, p1) => 
{
	return mp.game.invoke("0xAC96609B9995EDF8", p0, p1);
}


// Arg:p0 is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [BOOL]	
g_Natives.TASK_GUARD_CURRENT_POSITION = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x4A58A47A72E3FCB4", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [Any]	
g_Natives.TASK_GUARD_ASSIGNED_DEFENSIVE_AREA = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xD2A207EEBDF9889B", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Ped]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [Any]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	
g_Natives.TASK_GUARD_SPHERE_DEFENSIVE_AREA = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0xC946FE14BE0EB5E2", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:scenarioName is [char*]	
g_Natives.TASK_STAND_GUARD = (ped, x, y, z, heading, scenarioName) => 
{
	return mp.game.invoke("0xAE032F8BBA959E90", ped, x, y, z, heading, scenarioName);
}


// Arg:driver is [Ped]	Arg:cruiseSpeed is [float]	
g_Natives.SET_DRIVE_TASK_CRUISE_SPEED = (driver, cruiseSpeed) => 
{
	return mp.game.invoke("0x5C9B84BD7D31D908", driver, cruiseSpeed);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives.SET_DRIVE_TASK_MAX_CRUISE_SPEED = (p0, p1) => 
{
	return mp.game.invoke("0x404A5AA9B9F0B746", p0, p1);
}


// Arg:ped is [Ped]	Arg:drivingStyle is [int]	
g_Natives.SET_DRIVE_TASK_DRIVING_STYLE = (ped, drivingStyle) => 
{
	return mp.game.invoke("0xDACE1BE37D88AF67", ped, drivingStyle);
}


// Arg:playerX is [float]	Arg:playerY is [float]	Arg:playerZ is [float]	Arg:radiusX is [float]	Arg:radiusY is [float]	Arg:radiusZ is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	
g_Natives.ADD_COVER_BLOCKING_AREA = (playerX, playerY, playerZ, radiusX, radiusY, radiusZ, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x45C597097DD7CB81", playerX, playerY, playerZ, radiusX, radiusY, radiusZ, p6, p7, p8, p9);
}

g_Natives.REMOVE_ALL_COVER_BLOCKING_AREAS = () => 
{
	return mp.game.invoke("0xDB6708C0B46F56D8");
}


// Arg:ped is [Ped]	Arg:scenarioName is [char*]	Arg:unkDelay is [int]	Arg:playEnterAnim is [BOOL]	
g_Natives.TASK_START_SCENARIO_IN_PLACE = (ped, scenarioName, unkDelay, playEnterAnim) => 
{
	return mp.game.invoke("0x142A02425FF02BD9", ped, scenarioName, unkDelay, playEnterAnim);
}


// Arg:ped is [Ped]	Arg:scenarioName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:duration is [int]	Arg:sittingScenario is [BOOL]	Arg:teleport is [BOOL]	
g_Natives.TASK_START_SCENARIO_AT_POSITION = (ped, scenarioName, x, y, z, heading, duration, sittingScenario, teleport) => 
{
	return mp.game.invoke("0xFA4EFC79F69D4F07", ped, scenarioName, x, y, z, heading, duration, sittingScenario, teleport);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:distance is [float]	Arg:duration is [int]	
g_Natives.TASK_USE_NEAREST_SCENARIO_TO_COORD = (ped, x, y, z, distance, duration) => 
{
	return mp.game.invoke("0x277F471BA9DB000B", ped, x, y, z, distance, duration);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p5 is [Any]	
g_Natives.TASK_USE_NEAREST_SCENARIO_TO_COORD_WARP = (ped, x, y, z, radius, p5) => 
{
	return mp.game.invoke("0x58E2E0F23F6B76C3", ped, x, y, z, radius, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [Any]	
g_Natives.TASK_USE_NEAREST_SCENARIO_CHAIN_TO_COORD = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x9FDA1B3D7E7028B3", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [Any]	
g_Natives.TASK_USE_NEAREST_SCENARIO_CHAIN_TO_COORD_WARP = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x97A28E63F0BA5631", p0, p1, p2, p3, p4, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:b is [BOOL]	
g_Natives.DOES_SCENARIO_EXIST_IN_AREA = (x, y, z, radius, b) => 
{
	return mp.game.invoke("0x5A59271FFADD33C1", x, y, z, radius, b);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:scenarioName is [char*]	Arg:radius is [float]	Arg:p5 is [BOOL]	
g_Natives.DOES_SCENARIO_OF_TYPE_EXIST_IN_AREA = (x, y, z, scenarioName, radius, p5) => 
{
	return mp.game.invoke("0x0A9D0C2A3BBC86C1", x, y, z, scenarioName, radius, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	
g_Natives.IS_SCENARIO_OCCUPIED = (x, y, z, radius, p4) => 
{
	return mp.game.invoke("0x788756D73AC2E07C", x, y, z, radius, p4);
}


// Arg:ped is [Ped]	
g_Natives.PED_HAS_USE_SCENARIO_TASK = (ped) => 
{
	return mp.game.invoke("0x295E3CCEC879CCD7", ped);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives.PLAY_ANIM_ON_RUNNING_SCENARIO = (ped, animDict, animName) => 
{
	return mp.game.invoke("0x748040460F8DF5DC", ped, animDict, animName);
}


// Arg:scenarioGroup is [char*]	
g_Natives.DOES_SCENARIO_GROUP_EXIST = (scenarioGroup) => 
{
	return mp.game.invoke("0xF9034C136C9E00D3", scenarioGroup);
}


// Arg:scenarioGroup is [char*]	
g_Natives.IS_SCENARIO_GROUP_ENABLED = (scenarioGroup) => 
{
	return mp.game.invoke("0x367A09DED4E05B99", scenarioGroup);
}


// Arg:scenarioGroup is [char*]	Arg:p1 is [BOOL]	
g_Natives.SET_SCENARIO_GROUP_ENABLED = (scenarioGroup, p1) => 
{
	return mp.game.invoke("0x02C8E5B49848664E", scenarioGroup, p1);
}

g_Natives.RESET_SCENARIO_GROUPS_ENABLED = () => 
{
	return mp.game.invoke("0xDD902D0349AFAD3A");
}


// Arg:scenarioGroup is [char*]	
g_Natives.SET_EXCLUSIVE_SCENARIO_GROUP = (scenarioGroup) => 
{
	return mp.game.invoke("0x535E97E1F7FC0C6A", scenarioGroup);
}

g_Natives.RESET_EXCLUSIVE_SCENARIO_GROUP = () => 
{
	return mp.game.invoke("0x4202BBCB8684563D");
}


// Arg:scenarioType is [char*]	
g_Natives.IS_SCENARIO_TYPE_ENABLED = (scenarioType) => 
{
	return mp.game.invoke("0x3A815DB3EA088722", scenarioType);
}


// Arg:scenarioType is [char*]	Arg:toggle is [BOOL]	
g_Natives.SET_SCENARIO_TYPE_ENABLED = (scenarioType, toggle) => 
{
	return mp.game.invoke("0xEB47EC4E34FB7EE1", scenarioType, toggle);
}

g_Natives.RESET_SCENARIO_TYPES_ENABLED = () => 
{
	return mp.game.invoke("0x0D40EE2A7F2B2D6D");
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_ACTIVE_IN_SCENARIO = (ped) => 
{
	return mp.game.invoke("0xAA135F9482C82CC3", ped);
}


// Arg:ped is [Ped]	
g_Natives["0x621C6E4729388E41"] = (ped) => 
{
	return mp.game.invoke("0x621C6E4729388E41", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x8FD89A6240813FD0"] = (ped, p1, p2) => 
{
	return mp.game.invoke("0x8FD89A6240813FD0", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p5 is [Any]	
g_Natives.TASK_COMBAT_HATED_TARGETS_IN_AREA = (ped, x, y, z, radius, p5) => 
{
	return mp.game.invoke("0x4CF5F55DAC3280A0", ped, x, y, z, radius, p5);
}


// Arg:ped is [Ped]	Arg:radius is [float]	Arg:p2 is [int]	
g_Natives.TASK_COMBAT_HATED_TARGETS_AROUND_PED = (ped, radius, p2) => 
{
	return mp.game.invoke("0x7BF835BB9E2698C8", ped, radius, p2);
}


// Arg:ped is [Ped]	Arg:radius is [float]	Arg:duration is [int]	Arg:unk is [BOOL]	
g_Natives.TASK_COMBAT_HATED_TARGETS_AROUND_PED_TIMED = (ped, radius, duration, unk) => 
{
	return mp.game.invoke("0x2BBA30B854534A0C", ped, radius, duration, unk);
}


// Arg:ped is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_THROW_PROJECTILE = (ped, x, y, z) => 
{
	return mp.game.invoke("0x7285951DBF6B5A51", ped, x, y, z);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.TASK_SWAP_WEAPON = (ped, p1) => 
{
	return mp.game.invoke("0xA21C51255B205245", ped, p1);
}


// Arg:ped is [Ped]	Arg:unused is [BOOL]	
g_Natives.TASK_RELOAD_WEAPON = (ped, unused) => 
{
	return mp.game.invoke("0x62D2916F56B9CD2D", ped, unused);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_GETTING_UP = (ped) => 
{
	return mp.game.invoke("0x2A74E1D5F2F00EEC", ped);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:time is [int]	Arg:p3 is [int]	
g_Natives.TASK_WRITHE = (ped, target, time, p3) => 
{
	return mp.game.invoke("0xCDDC2B77CE54AC6E", ped, target, time, p3);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_WRITHE = (ped) => 
{
	return mp.game.invoke("0xDEB6D52126E7D640", ped);
}


// Arg:patrolRoute is [char*]	
g_Natives.OPEN_PATROL_ROUTE = (patrolRoute) => 
{
	return mp.game.invoke("0xA36BFB5EE89F3D82", patrolRoute);
}

g_Natives.CLOSE_PATROL_ROUTE = () => 
{
	return mp.game.invoke("0xB043ECA801B8CBC1");
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p8 is [int]	
g_Natives.ADD_PATROL_ROUTE_NODE = (p0, p1, x1, y1, z1, x2, y2, z2, p8) => 
{
	return mp.game.invoke("0x8EDF950167586B7C", p0, p1, x1, y1, z1, x2, y2, z2, p8);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.ADD_PATROL_ROUTE_LINK = (p0, p1) => 
{
	return mp.game.invoke("0x23083260DEC3A551", p0, p1);
}

g_Natives.CREATE_PATROL_ROUTE = () => 
{
	return mp.game.invoke("0xAF8A443CCC8018DC");
}


// Arg:patrolRoute is [char*]	
g_Natives.DELETE_PATROL_ROUTE = (patrolRoute) => 
{
	return mp.game.invoke("0x7767DD9D65E91319", patrolRoute);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.TASK_PATROL = (ped, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xBDA5DF49D080FE4E", ped, p1, p2, p3, p4);
}


// Arg:ped is [Ped]	
g_Natives.TASK_STAY_IN_COVER = (ped) => 
{
	return mp.game.invoke("0xE5DA8615A6180789", ped);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.ADD_VEHICLE_SUBTASK_ATTACK_COORD = (ped, x, y, z) => 
{
	return mp.game.invoke("0x5CF0D8F9BBA0DD75", ped, x, y, z);
}


// Arg:ped is [Ped]	Arg:ped2 is [Ped]	
g_Natives.ADD_VEHICLE_SUBTASK_ATTACK_PED = (ped, ped2) => 
{
	return mp.game.invoke("0x85F462BADC7DA47F", ped, ped2);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	Arg:flag is [float]	
g_Natives.TASK_VEHICLE_SHOOT_AT_PED = (ped, target, flag) => 
{
	return mp.game.invoke("0x10AB107B887214D8", ped, target, flag);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	
g_Natives.TASK_VEHICLE_AIM_AT_PED = (ped, target) => 
{
	return mp.game.invoke("0xE41885592B08B097", ped, target);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p4 is [float]	
g_Natives.TASK_VEHICLE_SHOOT_AT_COORD = (ped, x, y, z, p4) => 
{
	return mp.game.invoke("0x5190796ED39C9B6D", ped, x, y, z, p4);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.TASK_VEHICLE_AIM_AT_COORD = (ped, x, y, z) => 
{
	return mp.game.invoke("0x447C1E9EF844BC0F", ped, x, y, z);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speed is [float]	Arg:behaviorFlag is [int]	Arg:stoppingRange is [float]	
g_Natives.TASK_VEHICLE_GOTO_NAVMESH = (ped, vehicle, x, y, z, speed, behaviorFlag, stoppingRange) => 
{
	return mp.game.invoke("0x195AEEB13CEFE2EE", ped, vehicle, x, y, z, speed, behaviorFlag, stoppingRange);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:aimAtX is [float]	Arg:aimAtY is [float]	Arg:aimAtZ is [float]	Arg:moveSpeed is [float]	Arg:p8 is [BOOL]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [BOOL]	Arg:flags is [Any]	Arg:p13 is [BOOL]	Arg:firingPattern is [Hash]	
g_Natives.TASK_GO_TO_COORD_WHILE_AIMING_AT_COORD = (ped, x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern) => 
{
	return mp.game.invoke("0x11315AB3385B8AC0", ped, x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [Any]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [BOOL]	Arg:p10 is [Any]	Arg:p11 is [BOOL]	Arg:p12 is [Any]	Arg:p13 is [Any]	
g_Natives.TASK_GO_TO_COORD_WHILE_AIMING_AT_ENTITY = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13) => 
{
	return mp.game.invoke("0xB2A16444EAD9AE47", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13);
}


// Arg:pedHandle is [Ped]	Arg:goToLocationX is [float]	Arg:goToLocationY is [float]	Arg:goToLocationZ is [float]	Arg:focusLocationX is [float]	Arg:focusLocationY is [float]	Arg:focusLocationZ is [float]	Arg:speed is [float]	Arg:shootAtEnemies is [BOOL]	Arg:distanceToStopAt is [float]	Arg:noRoadsDistance is [float]	Arg:unkTrue is [BOOL]	Arg:unkFlag is [int]	Arg:aimingFlag is [int]	Arg:firingPattern is [Hash]	
g_Natives.TASK_GO_TO_COORD_AND_AIM_AT_HATED_ENTITIES_NEAR_COORD = (pedHandle, goToLocationX, goToLocationY, goToLocationZ, focusLocationX, focusLocationY, focusLocationZ, speed, shootAtEnemies, distanceToStopAt, noRoadsDistance, unkTrue, unkFlag, aimingFlag, firingPattern) => 
{
	return mp.game.invoke("0xA55547801EB331FC", pedHandle, goToLocationX, goToLocationY, goToLocationZ, focusLocationX, focusLocationY, focusLocationZ, speed, shootAtEnemies, distanceToStopAt, noRoadsDistance, unkTrue, unkFlag, aimingFlag, firingPattern);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [BOOL]	Arg:p10 is [BOOL]	Arg:p11 is [Any]	
g_Natives.TASK_GO_TO_ENTITY_WHILE_AIMING_AT_COORD = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x04701832B739DCE5", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:ped is [Ped]	Arg:entityToWalkTo is [Entity]	Arg:entityToAimAt is [Entity]	Arg:speed is [float]	Arg:shootatEntity is [BOOL]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:firingPattern is [Hash]	
g_Natives.TASK_GO_TO_ENTITY_WHILE_AIMING_AT_ENTITY = (ped, entityToWalkTo, entityToAimAt, speed, shootatEntity, p5, p6, p7, p8, firingPattern) => 
{
	return mp.game.invoke("0x97465886D35210E9", ped, entityToWalkTo, entityToAimAt, speed, shootatEntity, p5, p6, p7, p8, firingPattern);
}


// Arg:ped is [Ped]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.SET_HIGH_FALL_TASK = (ped, p1, p2, p3) => 
{
	return mp.game.invoke("0x8C825BDC7741D37C", ped, p1, p2, p3);
}


// Arg:name is [char*]	
g_Natives.REQUEST_WAYPOINT_RECORDING = (name) => 
{
	return mp.game.invoke("0x9EEFB62EB27B5792", name);
}


// Arg:name is [char*]	
g_Natives.GET_IS_WAYPOINT_RECORDING_LOADED = (name) => 
{
	return mp.game.invoke("0xCB4E8BE8A0063C5D", name);
}


// Arg:name is [char*]	
g_Natives.REMOVE_WAYPOINT_RECORDING = (name) => 
{
	return mp.game.invoke("0xFF1B8B4AA1C25DC8", name);
}


// Arg:name is [char*]	Arg:points is [int*]	
g_Natives.WAYPOINT_RECORDING_GET_NUM_POINTS = (name, points) => 
{
	return mp.game.invoke("0x5343532C01A07234", name, points);
}


// Arg:name is [char*]	Arg:point is [int]	Arg:coord is [Vector3*]	
g_Natives.WAYPOINT_RECORDING_GET_COORD = (name, point, coord) => 
{
	return mp.game.invoke("0x2FB897405C90B361", name, point, coord);
}


// Arg:name is [char*]	Arg:point is [int]	
g_Natives.WAYPOINT_RECORDING_GET_SPEED_AT_POINT = (name, point) => 
{
	return mp.game.invoke("0x005622AEBC33ACA9", name, point);
}


// Arg:name is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:point is [int*]	
g_Natives.WAYPOINT_RECORDING_GET_CLOSEST_WAYPOINT = (name, x, y, z, point) => 
{
	return mp.game.invoke("0xB629A298081F876F", name, x, y, z, point);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.TASK_FOLLOW_WAYPOINT_RECORDING = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x0759591819534F7B", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	
g_Natives.IS_WAYPOINT_PLAYBACK_GOING_ON_FOR_PED = (p0) => 
{
	return mp.game.invoke("0xE03B3F2D3DC59B64", p0);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_WAYPOINT_PROGRESS = (ped) => 
{
	return mp.game.invoke("0x2720AAA75001E094", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_PED_WAYPOINT_DISTANCE = (ped) => 
{
	return mp.game.invoke("0xE6A877C64CAF1BC5", ped);
}


// Arg:ped is [Ped]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	
g_Natives.SET_PED_WAYPOINT_ROUTE_OFFSET = (ped, offsetX, offsetY, offsetZ) => 
{
	return mp.game.invoke("0xED98E10B0AFCE4B4", ped, offsetX, offsetY, offsetZ);
}


// Arg:p0 is [char*]	Arg:p1 is [int]	
g_Natives.GET_WAYPOINT_DISTANCE_ALONG_ROUTE = (p0, p1) => 
{
	return mp.game.invoke("0xA5B769058763E497", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.WAYPOINT_PLAYBACK_GET_IS_PAUSED = (p0) => 
{
	return mp.game.invoke("0x701375A7D43F01CB", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.WAYPOINT_PLAYBACK_PAUSE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x0F342546AA06FED5", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.WAYPOINT_PLAYBACK_RESUME = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x244F70C84C547D2D", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [BOOL]	
g_Natives.WAYPOINT_PLAYBACK_OVERRIDE_SPEED = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7D7D2B47FA788E85", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives.WAYPOINT_PLAYBACK_USE_DEFAULT_SPEED = (p0) => 
{
	return mp.game.invoke("0x6599D834B12D0800", p0);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.USE_WAYPOINT_RECORDING_AS_ASSISTED_MOVEMENT_ROUTE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x5A353B8E6B1095B5", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives.WAYPOINT_PLAYBACK_START_AIMING_AT_PED = (p0, p1, p2) => 
{
	return mp.game.invoke("0x20E330937C399D29", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	
g_Natives.WAYPOINT_PLAYBACK_START_AIMING_AT_COORD = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x8968400D900ED8B3", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	Arg:p3 is [Any]	
g_Natives._WAYPOINT_PLAYBACK_START_SHOOTING_AT_PED = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xE70BA7B90F8390DC", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	
g_Natives.WAYPOINT_PLAYBACK_START_SHOOTING_AT_COORD = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x057A25CFCC9DB671", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	
g_Natives.WAYPOINT_PLAYBACK_STOP_AIMING_OR_SHOOTING = (p0) => 
{
	return mp.game.invoke("0x47EFA040EBB8E2EA", p0);
}


// Arg:route is [char*]	
g_Natives.ASSISTED_MOVEMENT_REQUEST_ROUTE = (route) => 
{
	return mp.game.invoke("0x817268968605947A", route);
}


// Arg:route is [char*]	
g_Natives.ASSISTED_MOVEMENT_REMOVE_ROUTE = (route) => 
{
	return mp.game.invoke("0x3548536485DD792B", route);
}


// Arg:route is [char*]	
g_Natives.ASSISTED_MOVEMENT_IS_ROUTE_LOADED = (route) => 
{
	return mp.game.invoke("0x60F9A4393A21F741", route);
}


// Arg:route is [char*]	Arg:props is [int]	
g_Natives.ASSISTED_MOVEMENT_SET_ROUTE_PROPERTIES = (route, props) => 
{
	return mp.game.invoke("0xD5002D78B7162E1B", route, props);
}


// Arg:dist is [float]	
g_Natives.ASSISTED_MOVEMENT_OVERRIDE_LOAD_DISTANCE_THIS_FRAME = (dist) => 
{
	return mp.game.invoke("0x13945951E16EF912", dist);
}


// Arg:ped is [Ped]	Arg:vehicle is [Vehicle]	Arg:WPRecording is [char*]	Arg:p3 is [int]	Arg:p4 is [int]	Arg:p5 is [int]	Arg:p6 is [int]	Arg:p7 is [float]	Arg:p8 is [BOOL]	Arg:p9 is [float]	
g_Natives.TASK_VEHICLE_FOLLOW_WAYPOINT_RECORDING = (ped, vehicle, WPRecording, p3, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x3123FAA6DB1CF7ED", ped, vehicle, WPRecording, p3, p4, p5, p6, p7, p8, p9);
}


// Arg:p0 is [Any]	
g_Natives.IS_WAYPOINT_PLAYBACK_GOING_ON_FOR_VEHICLE = (p0) => 
{
	return mp.game.invoke("0xF5134943EA29868C", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_WAYPOINT_PROGRESS = (vehicle) => 
{
	return mp.game.invoke("0x9824CFF8FC66E159", vehicle);
}


// Arg:ped is [Ped]	
g_Natives.GET_VEHICLE_WAYPOINT_TARGET_POINT = (ped) => 
{
	return mp.game.invoke("0x416B62AC8B9E5BBD", ped);
}


// Arg:p0 is [Any]	
g_Natives.VEHICLE_WAYPOINT_PLAYBACK_PAUSE = (p0) => 
{
	return mp.game.invoke("0x8A4E6AC373666BC5", p0);
}


// Arg:p0 is [Any]	
g_Natives.VEHICLE_WAYPOINT_PLAYBACK_RESUME = (p0) => 
{
	return mp.game.invoke("0xDC04FCAA7839D492", p0);
}


// Arg:p0 is [Any]	
g_Natives.VEHICLE_WAYPOINT_PLAYBACK_USE_DEFAULT_SPEED = (p0) => 
{
	return mp.game.invoke("0x5CEB25A7D2848963", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives.VEHICLE_WAYPOINT_PLAYBACK_OVERRIDE_SPEED = (p0, p1) => 
{
	return mp.game.invoke("0x121F0593E0A431D7", p0, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.TASK_SET_BLOCKING_OF_NON_TEMPORARY_EVENTS = (ped, toggle) => 
{
	return mp.game.invoke("0x90D2156198831D69", ped, toggle);
}


// Arg:ped is [Ped]	Arg:state is [Hash]	Arg:p2 is [BOOL]	
g_Natives.TASK_FORCE_MOTION_STATE = (ped, state, p2) => 
{
	return mp.game.invoke("0x4F056E1AFFEF17AB", ped, state, p2);
}


// Arg:ped is [Ped]	Arg:task is [char*]	Arg:multiplier is [float]	Arg:p3 is [BOOL]	Arg:animDict is [char*]	Arg:flags is [int]	
g_Natives._TASK_MOVE_NETWORK = (ped, task, multiplier, p3, animDict, flags) => 
{
	return mp.game.invoke("0x2D537BA194896636", ped, task, multiplier, p3, animDict, flags);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [Any]	Arg:p9 is [float]	Arg:p10 is [BOOL]	Arg:animDict is [char*]	Arg:flags is [int]	
g_Natives._TASK_MOVE_NETWORK_ADVANCED = (ped, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags) => 
{
	return mp.game.invoke("0xD5B35BEA41919ACB", ped, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags);
}


// Arg:handle is [Ped]	
g_Natives._IS_TASK_MOVE_SCRIPTED_ACTIVE = (handle) => 
{
	return mp.game.invoke("0x921CE12C489C4C41", handle);
}


// Arg:p0 is [Any]	
g_Natives["0x30ED88D5E0C56A37"] = (p0) => 
{
	return mp.game.invoke("0x30ED88D5E0C56A37", p0);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	
g_Natives._SET_NETWORK_TASK_ACTION = (ped, p1) => 
{
	return mp.game.invoke("0xD01015C7316AE176", ped, p1);
}


// Arg:ped is [Ped]	Arg:unk is [char*]	
g_Natives["0xAB13A5565480B6D9"] = (ped, unk) => 
{
	return mp.game.invoke("0xAB13A5565480B6D9", ped, unk);
}


// Arg:ped is [Ped]	
g_Natives._GET_PED_NETWORK_TASK_PHASE = (ped) => 
{
	return mp.game.invoke("0x717E4D1F2048376D", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	Arg:p2 is [float]	
g_Natives._SET_NETWORK_TASK_PARAM_FLOAT = (ped, p1, p2) => 
{
	return mp.game.invoke("0xD5BB4025AE449A4E", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	Arg:p2 is [BOOL]	
g_Natives._SET_NETWORK_TASK_PARAM_BOOL = (ped, p1, p2) => 
{
	return mp.game.invoke("0xB0A6CFD2C69C1088", ped, p1, p2);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	
g_Natives["0xA7FFBA498E4AAF67"] = (ped, p1) => 
{
	return mp.game.invoke("0xA7FFBA498E4AAF67", ped, p1);
}


// Arg:ped is [Ped]	Arg:p1 is [char*]	
g_Natives["0xB4F47213DF45A64C"] = (ped, p1) => 
{
	return mp.game.invoke("0xB4F47213DF45A64C", ped, p1);
}


// Arg:ped is [Ped]	
g_Natives.IS_MOVE_BLEND_RATIO_STILL = (ped) => 
{
	return mp.game.invoke("0x349CE7B56DAFD95C", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_MOVE_BLEND_RATIO_WALKING = (ped) => 
{
	return mp.game.invoke("0xF133BBBE91E1691F", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_MOVE_BLEND_RATIO_RUNNING = (ped) => 
{
	return mp.game.invoke("0xD4D8636C0199A939", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_MOVE_BLEND_RATIO_SPRINTING = (ped) => 
{
	return mp.game.invoke("0x24A2AD74FA9814E2", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_STILL = (ped) => 
{
	return mp.game.invoke("0xAC29253EEF8F0180", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_WALKING = (ped) => 
{
	return mp.game.invoke("0xDE4C184B2B9B071A", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RUNNING = (ped) => 
{
	return mp.game.invoke("0xC5286FFC176F28A2", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_SPRINTING = (ped) => 
{
	return mp.game.invoke("0x57E457CD2C0FC168", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_STRAFING = (ped) => 
{
	return mp.game.invoke("0xE45B7F222DE47E09", ped);
}


// Arg:ped is [Ped]	Arg:scene is [int]	Arg:animDictionary is [char*]	Arg:animationName is [char*]	Arg:speed is [float]	Arg:speedMultiplier is [float]	Arg:headingFlag is [int]	Arg:flag is [int]	Arg:playbackRate is [float]	Arg:p9 is [Any]	
g_Natives.TASK_SYNCHRONIZED_SCENE = (ped, scene, animDictionary, animationName, speed, speedMultiplier, headingFlag, flag, playbackRate, p9) => 
{
	return mp.game.invoke("0xEEA929141F699854", ped, scene, animDictionary, animationName, speed, speedMultiplier, headingFlag, flag, playbackRate, p9);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animName1 is [char*]	Arg:animName2 is [char*]	Arg:animName3 is [char*]	Arg:duration is [int]	Arg:entity is [Entity]	Arg:p7 is [float]	Arg:p8 is [float]	
g_Natives.TASK_SWEEP_AIM_ENTITY = (ped, animDict, animName1, animName2, animName3, duration, entity, p7, p8) => 
{
	return mp.game.invoke("0x2047C02158D6405A", ped, animDict, animName1, animName2, animName3, duration, entity, p7, p8);
}


// Arg:ped is [Ped]	Arg:entity is [Entity]	
g_Natives.UPDATE_TASK_SWEEP_AIM_ENTITY = (ped, entity) => 
{
	return mp.game.invoke("0xE4973DBDBE6E44B3", ped, entity);
}


// Arg:ped is [Ped]	Arg:animDict is [char*]	Arg:animName1 is [char*]	Arg:animName2 is [char*]	Arg:animName3 is [char*]	Arg:timeout is [int]	Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	Arg:unk is [float]	Arg:flag is [float]	
g_Natives.TASK_SWEEP_AIM_POSITION = (ped, animDict, animName1, animName2, animName3, timeout, X, Y, Z, unk, flag) => 
{
	return mp.game.invoke("0x7AFE8FDC10BC07D2", ped, animDict, animName1, animName2, animName3, timeout, X, Y, Z, unk, flag);
}


// Arg:ped is [Ped]	Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	
g_Natives.UPDATE_TASK_SWEEP_AIM_POSITION = (ped, X, Y, Z) => 
{
	return mp.game.invoke("0xBB106883F5201FC4", ped, X, Y, Z);
}


// Arg:ped is [Ped]	Arg:target is [Ped]	
g_Natives.TASK_ARREST_PED = (ped, target) => 
{
	return mp.game.invoke("0xF3B9A78A178572B1", ped, target);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RUNNING_ARREST_TASK = (ped) => 
{
	return mp.game.invoke("0x3DC52677769B4AE0", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_BEING_ARRESTED = (ped) => 
{
	return mp.game.invoke("0x90A09F3A45FED688", ped);
}


// Arg:ped is [Ped]	
g_Natives.UNCUFF_PED = (ped) => 
{
	return mp.game.invoke("0x67406F2C8F87FC4F", ped);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_CUFFED = (ped) => 
{
	return mp.game.invoke("0x74E559B3BC910685", ped);
}

g_Natives.GET_ALLOCATED_STACK_SIZE = () => 
{
	return mp.game.invoke("0x8B3CA62B1EF19B62");
}


// Arg:threadId is [int]	
g_Natives._GET_FREE_STACK_SLOTS_COUNT = (threadId) => 
{
	return mp.game.invoke("0xFEAD16FC8F9DFC0F", threadId);
}


// Arg:time is [int]	
g_Natives.SET_RANDOM_SEED = (time) => 
{
	return mp.game.invoke("0x444D98F98C11F3EC", time);
}


// Arg:time is [float]	
g_Natives.SET_TIME_SCALE = (time) => 
{
	return mp.game.invoke("0x1D408577D440E81E", time);
}


// Arg:setToTrueOrNot is [BOOL]	
g_Natives.SET_MISSION_FLAG = (setToTrueOrNot) => 
{
	return mp.game.invoke("0xC4301E5121A0ED73", setToTrueOrNot);
}

g_Natives.GET_MISSION_FLAG = () => 
{
	return mp.game.invoke("0xA33CDCCDA663159E");
}


// Arg:setToTrueOrNot is [BOOL]	
g_Natives.SET_RANDOM_EVENT_FLAG = (setToTrueOrNot) => 
{
	return mp.game.invoke("0x971927086CFD2158", setToTrueOrNot);
}

g_Natives.GET_RANDOM_EVENT_FLAG = () => 
{
	return mp.game.invoke("0xD2D57F1D764117B1");
}

g_Natives._GET_GLOBAL_CHAR_BUFFER = () => 
{
	return mp.game.invoke("0x24DA7D7667FD7B09");
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	
g_Natives["0x4DCDF92BF64236CD"] = (p0, p1) => 
{
	return mp.game.invoke("0x4DCDF92BF64236CD", p0, p1);
}


// Arg:p0 is [Any*]	
g_Natives["0x31125FD509D9043F"] = (p0) => 
{
	return mp.game.invoke("0x31125FD509D9043F", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xEBD3205A207939ED"] = (p0) => 
{
	return mp.game.invoke("0xEBD3205A207939ED", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x97E7E2C04245115B"] = (p0) => 
{
	return mp.game.invoke("0x97E7E2C04245115B", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xEB078CA2B5E82ADD"] = (p0, p1) => 
{
	return mp.game.invoke("0xEB078CA2B5E82ADD", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x703CC7F60CBB2B57"] = (p0) => 
{
	return mp.game.invoke("0x703CC7F60CBB2B57", p0);
}

g_Natives["0x8951EB9C6906D3C8"] = () => 
{
	return mp.game.invoke("0x8951EB9C6906D3C8");
}


// Arg:p0 is [Any]	
g_Natives["0xBA4B8D83BDC75551"] = (p0) => 
{
	return mp.game.invoke("0xBA4B8D83BDC75551", p0);
}

g_Natives["0xE8B9C0EC9E183F35"] = () => 
{
	return mp.game.invoke("0xE8B9C0EC9E183F35");
}


// Arg:p0 is [BOOL]	
g_Natives["0x65D2EBB47E1CEC21"] = (p0) => 
{
	return mp.game.invoke("0x65D2EBB47E1CEC21", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x6F2135B6129620C1"] = (p0) => 
{
	return mp.game.invoke("0x6F2135B6129620C1", p0);
}


// Arg:p0 is [char*]	
g_Natives["0x8D74E26F54B4E5C3"] = (p0) => 
{
	return mp.game.invoke("0x8D74E26F54B4E5C3", p0);
}


// Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any]	Arg:p4 is [BOOL]	
g_Natives["0xB335F761606DB47C"] = (p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xB335F761606DB47C", p1, p2, p3, p4);
}

g_Natives.GET_PREV_WEATHER_TYPE_HASH_NAME = () => 
{
	return mp.game.invoke("0x564B884A05EC45A3");
}

g_Natives.GET_NEXT_WEATHER_TYPE_HASH_NAME = () => 
{
	return mp.game.invoke("0x711327CD09C8F162");
}


// Arg:weatherType is [char*]	
g_Natives.IS_PREV_WEATHER_TYPE = (weatherType) => 
{
	return mp.game.invoke("0x44F28F86433B10A9", weatherType);
}


// Arg:weatherType is [char*]	
g_Natives.IS_NEXT_WEATHER_TYPE = (weatherType) => 
{
	return mp.game.invoke("0x2FAA3A30BEC0F25D", weatherType);
}


// Arg:weatherType is [char*]	
g_Natives.SET_WEATHER_TYPE_PERSIST = (weatherType) => 
{
	return mp.game.invoke("0x704983DF373B198F", weatherType);
}


// Arg:weatherType is [char*]	
g_Natives.SET_WEATHER_TYPE_NOW_PERSIST = (weatherType) => 
{
	return mp.game.invoke("0xED712CA327900C8A", weatherType);
}


// Arg:weatherType is [char*]	
g_Natives.SET_WEATHER_TYPE_NOW = (weatherType) => 
{
	return mp.game.invoke("0x29B487C359E19889", weatherType);
}


// Arg:weatherType is [char*]	Arg:time is [float]	
g_Natives._SET_WEATHER_TYPE_OVER_TIME = (weatherType, time) => 
{
	return mp.game.invoke("0xFB5045B7C42B75BF", weatherType, time);
}

g_Natives.SET_RANDOM_WEATHER_TYPE = () => 
{
	return mp.game.invoke("0x8B05F884CF7E8020");
}

g_Natives.CLEAR_WEATHER_TYPE_PERSIST = () => 
{
	return mp.game.invoke("0xCCC39339BEF76CF5");
}


// Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives._GET_WEATHER_TYPE_TRANSITION = (p1, p2, p3) => 
{
	return mp.game.invoke("0xF3BBE884A14BB413", p1, p2, p3);
}


// Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives._SET_WEATHER_TYPE_TRANSITION = (p1, p2, p3) => 
{
	return mp.game.invoke("0x578C752848ECFA0C", p1, p2, p3);
}


// Arg:weatherType is [char*]	
g_Natives.SET_OVERRIDE_WEATHER = (weatherType) => 
{
	return mp.game.invoke("0xA43D5C6FE51ADBEF", weatherType);
}

g_Natives.CLEAR_OVERRIDE_WEATHER = () => 
{
	return mp.game.invoke("0x338D2E3477711050");
}


// Arg:p0 is [float]	
g_Natives["0xB8F87EAD7533B176"] = (p0) => 
{
	return mp.game.invoke("0xB8F87EAD7533B176", p0);
}


// Arg:p0 is [float]	
g_Natives["0xC3EAD29AB273ECE8"] = (p0) => 
{
	return mp.game.invoke("0xC3EAD29AB273ECE8", p0);
}


// Arg:p0 is [float]	
g_Natives["0xA7A1127490312C36"] = (p0) => 
{
	return mp.game.invoke("0xA7A1127490312C36", p0);
}


// Arg:p0 is [float]	
g_Natives["0x31727907B2C43C55"] = (p0) => 
{
	return mp.game.invoke("0x31727907B2C43C55", p0);
}


// Arg:p0 is [float]	
g_Natives["0x405591EC8FD9096D"] = (p0) => 
{
	return mp.game.invoke("0x405591EC8FD9096D", p0);
}


// Arg:p0 is [float]	
g_Natives["0xF751B16FB32ABC1D"] = (p0) => 
{
	return mp.game.invoke("0xF751B16FB32ABC1D", p0);
}


// Arg:p0 is [float]	
g_Natives["0xB3E6360DDE733E82"] = (p0) => 
{
	return mp.game.invoke("0xB3E6360DDE733E82", p0);
}


// Arg:p0 is [float]	
g_Natives["0x7C9C0B1EEB1F9072"] = (p0) => 
{
	return mp.game.invoke("0x7C9C0B1EEB1F9072", p0);
}


// Arg:p0 is [float]	
g_Natives["0x6216B116083A7CB4"] = (p0) => 
{
	return mp.game.invoke("0x6216B116083A7CB4", p0);
}


// Arg:p0 is [float]	
g_Natives["0x9F5E6BB6B34540DA"] = (p0) => 
{
	return mp.game.invoke("0x9F5E6BB6B34540DA", p0);
}


// Arg:p0 is [float]	
g_Natives["0xB9854DFDE0D833D6"] = (p0) => 
{
	return mp.game.invoke("0xB9854DFDE0D833D6", p0);
}


// Arg:p0 is [float]	
g_Natives._SET_NEARBY_WAVE_HEIGHT = (p0) => 
{
	return mp.game.invoke("0xC54A08C85AE4D410", p0);
}


// Arg:p0 is [float]	
g_Natives["0xA8434F1DFF41D6E7"] = (p0) => 
{
	return mp.game.invoke("0xA8434F1DFF41D6E7", p0);
}


// Arg:p0 is [float]	
g_Natives["0xC3C221ADDDE31A11"] = (p0) => 
{
	return mp.game.invoke("0xC3C221ADDDE31A11", p0);
}


// Arg:speed is [float]	
g_Natives.SET_WIND = (speed) => 
{
	return mp.game.invoke("0xAC3A74E8384A9919", speed);
}


// Arg:speed is [float]	
g_Natives.SET_WIND_SPEED = (speed) => 
{
	return mp.game.invoke("0xEE09ECEDBABE47FC", speed);
}

g_Natives.GET_WIND_SPEED = () => 
{
	return mp.game.invoke("0xA8CF1CC0AFCD3F12");
}


// Arg:direction is [float]	
g_Natives.SET_WIND_DIRECTION = (direction) => 
{
	return mp.game.invoke("0xEB0F4468467B4528", direction);
}

g_Natives.GET_WIND_DIRECTION = () => 
{
	return mp.game.invoke("0x1F400FEF721170DA");
}


// Arg:intensity is [float]	
g_Natives._SET_RAIN_FX_INTENSITY = (intensity) => 
{
	return mp.game.invoke("0x643E26EA6E024D92", intensity);
}

g_Natives.GET_RAIN_LEVEL = () => 
{
	return mp.game.invoke("0x96695E368AD855F3");
}

g_Natives.GET_SNOW_LEVEL = () => 
{
	return mp.game.invoke("0xC5868A966E5BE3AE");
}

g_Natives.FORCE_LIGHTNING_FLASH = () => 
{
	return mp.game.invoke("0xF6062E089251C898");
}


// Arg:p0 is [char*]	
g_Natives["0x02DEAAC8F8EA7FE7"] = (p0) => 
{
	return mp.game.invoke("0x02DEAAC8F8EA7FE7", p0);
}


// Arg:name is [char*]	
g_Natives.PRELOAD_CLOUD_HAT = (name) => 
{
	return mp.game.invoke("0x11B56FBBF7224868", name);
}


// Arg:name is [char*]	Arg:transitionTime is [float]	
g_Natives.LOAD_CLOUD_HAT = (name, transitionTime) => 
{
	return mp.game.invoke("0xFC4842A34657BFCB", name, transitionTime);
}


// Arg:name is [char*]	Arg:p1 is [float]	
g_Natives.UNLOAD_CLOUD_HAT = (name, p1) => 
{
	return mp.game.invoke("0xA74802FB8D0B7814", name, p1);
}

g_Natives._CLEAR_CLOUD_HAT = () => 
{
	return mp.game.invoke("0x957E790EA1727B64");
}


// Arg:opacity is [float]	
g_Natives._SET_CLOUD_HAT_OPACITY = (opacity) => 
{
	return mp.game.invoke("0xF36199225D6D8C86", opacity);
}

g_Natives._GET_CLOUD_HAT_OPACITY = () => 
{
	return mp.game.invoke("0x20AC25E781AE4A84");
}

g_Natives.GET_GAME_TIMER = () => 
{
	return mp.game.invoke("0x9CD27B0045628463");
}

g_Natives.GET_FRAME_TIME = () => 
{
	return mp.game.invoke("0x15C40837039FFAF7");
}

g_Natives._GET_BENCHMARK_TIME = () => 
{
	return mp.game.invoke("0xE599A503B3837E1B");
}

g_Natives.GET_FRAME_COUNT = () => 
{
	return mp.game.invoke("0xFC8202EFC642E6F2");
}


// Arg:startRange is [float]	Arg:endRange is [float]	
g_Natives.GET_RANDOM_FLOAT_IN_RANGE = (startRange, endRange) => 
{
	return mp.game.invoke("0x313CE5879CEB6FCD", startRange, endRange);
}


// Arg:startRange is [int]	Arg:endRange is [int]	
g_Natives.GET_RANDOM_INT_IN_RANGE = (startRange, endRange) => 
{
	return mp.game.invoke("0xD53343AA4FB7DD28", startRange, endRange);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:groundZ is [float*]	Arg:ignoreWater is [BOOL]	
g_Natives.GET_GROUND_Z_FOR_3D_COORD = (x, y, z, groundZ, ignoreWater) => 
{
	return mp.game.invoke("0xC906A7DAB05C8D2B", x, y, z, groundZ, ignoreWater);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:groundZ is [float*]	Arg:offsets is [Vector3*]	
g_Natives.GET_GROUND_Z_AND_NORMAL_FOR_3D_COORD = (x, y, z, groundZ, offsets) => 
{
	return mp.game.invoke("0x8BDC7BFC57A81E76", x, y, z, groundZ, offsets);
}


// Arg:p0 is [float]	
g_Natives.ASIN = (p0) => 
{
	return mp.game.invoke("0xC843060B5765DCE7", p0);
}


// Arg:p0 is [float]	
g_Natives.ACOS = (p0) => 
{
	return mp.game.invoke("0x1D08B970013C34B6", p0);
}


// Arg:p0 is [float]	
g_Natives.TAN = (p0) => 
{
	return mp.game.invoke("0x632106CC96E82E91", p0);
}


// Arg:p0 is [float]	
g_Natives.ATAN = (p0) => 
{
	return mp.game.invoke("0xA9D1795CD5043663", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives.ATAN2 = (p0, p1) => 
{
	return mp.game.invoke("0x8927CBF9D22261A4", p0, p1);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:useZ is [BOOL]	
g_Natives.GET_DISTANCE_BETWEEN_COORDS = (x1, y1, z1, x2, y2, z2, useZ) => 
{
	return mp.game.invoke("0xF1B760881820C952", x1, y1, z1, x2, y2, z2, useZ);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	
g_Natives.GET_ANGLE_BETWEEN_2D_VECTORS = (x1, y1, x2, y2) => 
{
	return mp.game.invoke("0x186FC4BE848E1C92", x1, y1, x2, y2);
}


// Arg:dx is [float]	Arg:dy is [float]	
g_Natives.GET_HEADING_FROM_VECTOR_2D = (dx, dy) => 
{
	return mp.game.invoke("0x2FFB6B224F4B2926", dx, dy);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [BOOL]	
g_Natives["0x7F8F6405F4777AF6"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x7F8F6405F4777AF6", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [BOOL]	
g_Natives["0x21C235BC64831E5A"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x21C235BC64831E5A", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	Arg:p12 is [Any*]	
g_Natives["0xF56DFB7B61BE7276"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0xF56DFB7B61BE7276", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}


// Arg:address is [int*]	Arg:offset is [int]	
g_Natives.SET_BIT = (address, offset) => 
{
	return mp.game.invoke("0x933D6A9EEC1BACD0", address, offset);
}


// Arg:address is [int*]	Arg:offset is [int]	
g_Natives.CLEAR_BIT = (address, offset) => 
{
	return mp.game.invoke("0xE80492A9AC099A93", address, offset);
}


// Arg:string is [char*]	
g_Natives.GET_HASH_KEY = (string) => 
{
	return mp.game.invoke("0xD24D37CC275948CC", string);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [Any*]	Arg:p10 is [Any*]	Arg:p11 is [Any*]	Arg:p12 is [Any*]	
g_Natives["0xF2F6A2FA49278625"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0xF2F6A2FA49278625", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	Arg:p10 is [BOOL]	Arg:p11 is [Any]	Arg:p12 is [BOOL]	
g_Natives.IS_AREA_OCCUPIED = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0xA61B4DF533DCB56E", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [Any]	Arg:p10 is [BOOL]	
g_Natives.IS_POSITION_OCCUPIED = (x, y, z, range, p4, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0xADCDE75E1C60F32D", x, y, z, range, p4, p5, p6, p7, p8, p9, p10);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [Any]	
g_Natives.IS_POINT_OBSCURED_BY_A_MISSION_ENTITY = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xE54E209C35FFA18D", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	Arg:ignoreCopCars is [BOOL]	Arg:ignoreObjects is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.CLEAR_AREA = (X, Y, Z, radius, p4, ignoreCopCars, ignoreObjects, p7) => 
{
	return mp.game.invoke("0xA56F01F3765B93A0", X, Y, Z, radius, p4, ignoreCopCars, ignoreObjects, p7);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives._CLEAR_AREA_OF_EVERYTHING = (x, y, z, radius, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x957838AAF91BD12D", x, y, z, radius, p4, p5, p6, p7);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	
g_Natives.CLEAR_AREA_OF_VEHICLES = (x, y, z, radius, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x01C7B9B38428AEB6", x, y, z, radius, p4, p5, p6, p7, p8);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [BOOL]	Arg:p10 is [BOOL]	Arg:p11 is [BOOL]	
g_Natives.CLEAR_ANGLED_AREA_OF_VEHICLES = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x11DB3500F042A8AA", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:flags is [int]	
g_Natives.CLEAR_AREA_OF_OBJECTS = (x, y, z, radius, flags) => 
{
	return mp.game.invoke("0xDD9B9B385AAC7F5B", x, y, z, radius, flags);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:flags is [int]	
g_Natives.CLEAR_AREA_OF_PEDS = (x, y, z, radius, flags) => 
{
	return mp.game.invoke("0xBE31FD6CE464AC59", x, y, z, radius, flags);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:flags is [int]	
g_Natives.CLEAR_AREA_OF_COPS = (x, y, z, radius, flags) => 
{
	return mp.game.invoke("0x04F8FC8FCF58F88D", x, y, z, radius, flags);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:isNetworkGame is [BOOL]	
g_Natives.CLEAR_AREA_OF_PROJECTILES = (x, y, z, radius, isNetworkGame) => 
{
	return mp.game.invoke("0x0A1CB9094635D1A6", x, y, z, radius, isNetworkGame);
}

g_Natives["0x7EC6F9A478A6A512"] = () => 
{
	return mp.game.invoke("0x7EC6F9A478A6A512");
}


// Arg:openSaveMenu is [BOOL]	
g_Natives.SET_SAVE_MENU_ACTIVE = (openSaveMenu) => 
{
	return mp.game.invoke("0xC9BF75D28165FF77", openSaveMenu);
}

g_Natives["0x397BAA01068BAA96"] = () => 
{
	return mp.game.invoke("0x397BAA01068BAA96");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_CREDITS_ACTIVE = (toggle) => 
{
	return mp.game.invoke("0xB938B7E6D3C0620C", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives["0xB51B9AB9EF81868C"] = (toggle) => 
{
	return mp.game.invoke("0xB51B9AB9EF81868C", toggle);
}

g_Natives.HAVE_CREDITS_REACHED_END = () => 
{
	return mp.game.invoke("0x075F1D57402C93BA");
}


// Arg:scriptName is [char*]	
g_Natives.TERMINATE_ALL_SCRIPTS_WITH_THIS_NAME = (scriptName) => 
{
	return mp.game.invoke("0x9DC711BC69C548DF", scriptName);
}

g_Natives.NETWORK_SET_SCRIPT_IS_SAFE_FOR_NETWORK_GAME = () => 
{
	return mp.game.invoke("0x9243BAC96D64C050");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:hospitalId is [int]	
g_Natives.ADD_HOSPITAL_RESTART = (x, y, z, heading, hospitalId) => 
{
	return mp.game.invoke("0x1F464EF988465A81", x, y, z, heading, hospitalId);
}


// Arg:hospitalIndex is [int]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_HOSPITAL_RESTART = (hospitalIndex, toggle) => 
{
	return mp.game.invoke("0xC8535819C450EBA8", hospitalIndex, toggle);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [Any]	
g_Natives.ADD_POLICE_RESTART = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x452736765B31FC4B", p0, p1, p2, p3, p4);
}


// Arg:policeIndex is [int]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_POLICE_RESTART = (policeIndex, toggle) => 
{
	return mp.game.invoke("0x23285DED6EBD7EA3", policeIndex, toggle);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	
g_Natives._SET_CUSTOM_RESPAWN_POSITION = (x, y, z, heading) => 
{
	return mp.game.invoke("0x706B5EDCAA7FA663", x, y, z, heading);
}

g_Natives._SET_NEXT_RESPAWN_TO_CUSTOM = () => 
{
	return mp.game.invoke("0xA2716D40842EAF79");
}


// Arg:disableRespawn is [BOOL]	
g_Natives._DISABLE_AUTOMATIC_RESPAWN = (disableRespawn) => 
{
	return mp.game.invoke("0x2C2B3493FBF51C71", disableRespawn);
}


// Arg:toggle is [BOOL]	
g_Natives.IGNORE_NEXT_RESTART = (toggle) => 
{
	return mp.game.invoke("0x21FFB63D8C615361", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_FADE_OUT_AFTER_DEATH = (toggle) => 
{
	return mp.game.invoke("0x4A18E01DF2C87B86", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_FADE_OUT_AFTER_ARREST = (toggle) => 
{
	return mp.game.invoke("0x1E0B4DC0D990A4E7", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_FADE_IN_AFTER_DEATH_ARREST = (toggle) => 
{
	return mp.game.invoke("0xDA66D2796BA33F12", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_FADE_IN_AFTER_LOAD = (toggle) => 
{
	return mp.game.invoke("0xF3D78F59DFE18D79", toggle);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [Any*]	Arg:p5 is [Any]	Arg:p6 is [Any]	
g_Natives.REGISTER_SAVE_HOUSE = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xC0714D0A7EEECA54", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:index is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_SAVE_HOUSE = (index, p1, p2) => 
{
	return mp.game.invoke("0x4F548CABEAE553BC", index, p1, p2);
}


// Arg:p0 is [BOOL]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [BOOL]	Arg:p6 is [float]	Arg:p7 is [float]	
g_Natives.OVERRIDE_SAVE_HOUSE = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x1162EA8AE9D24EEA", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xA4A0065E39C9F25C"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xA4A0065E39C9F25C", p0, p1, p2, p3);
}

g_Natives.DO_AUTO_SAVE = () => 
{
	return mp.game.invoke("0x50EEAAD86232EE55");
}

g_Natives["0x6E04F06094C87047"] = () => 
{
	return mp.game.invoke("0x6E04F06094C87047");
}

g_Natives.IS_AUTO_SAVE_IN_PROGRESS = () => 
{
	return mp.game.invoke("0x69240733738C19A0");
}

g_Natives["0x2107A3773771186D"] = () => 
{
	return mp.game.invoke("0x2107A3773771186D");
}

g_Natives["0x06462A961E94B67C"] = () => 
{
	return mp.game.invoke("0x06462A961E94B67C");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.BEGIN_REPLAY_STATS = (p0, p1) => 
{
	return mp.game.invoke("0xE0E500246FF73D66", p0, p1);
}


// Arg:value is [Any]	
g_Natives.ADD_REPLAY_STAT_VALUE = (value) => 
{
	return mp.game.invoke("0x69FE6DC87BD2A5E9", value);
}

g_Natives.END_REPLAY_STATS = () => 
{
	return mp.game.invoke("0xA23E821FBDF8A5F2");
}

g_Natives["0xD642319C54AADEB6"] = () => 
{
	return mp.game.invoke("0xD642319C54AADEB6");
}

g_Natives["0x5B1F2E327B6B6FE1"] = () => 
{
	return mp.game.invoke("0x5B1F2E327B6B6FE1");
}

g_Natives["0x2B626A0150E4D449"] = () => 
{
	return mp.game.invoke("0x2B626A0150E4D449");
}

g_Natives["0xDC9274A7EF6B2867"] = () => 
{
	return mp.game.invoke("0xDC9274A7EF6B2867");
}


// Arg:p0 is [Any]	
g_Natives["0x8098C8D6597AAE18"] = (p0) => 
{
	return mp.game.invoke("0x8098C8D6597AAE18", p0);
}

g_Natives.CLEAR_REPLAY_STATS = () => 
{
	return mp.game.invoke("0x1B1AB132A16FDA55");
}

g_Natives["0x72DE52178C291CB5"] = () => 
{
	return mp.game.invoke("0x72DE52178C291CB5");
}

g_Natives["0x44A0BDC559B35F6E"] = () => 
{
	return mp.game.invoke("0x44A0BDC559B35F6E");
}

g_Natives["0xEB2104E905C6F2E9"] = () => 
{
	return mp.game.invoke("0xEB2104E905C6F2E9");
}

g_Natives["0x2B5E102E4A42F2BF"] = () => 
{
	return mp.game.invoke("0x2B5E102E4A42F2BF");
}

g_Natives.IS_MEMORY_CARD_IN_USE = () => 
{
	return mp.game.invoke("0x8A75CE2956274ADD");
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:damage is [int]	Arg:p7 is [BOOL]	Arg:weaponHash is [Hash]	Arg:ownerPed is [Ped]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:speed is [float]	
g_Natives.SHOOT_SINGLE_BULLET_BETWEEN_COORDS = (x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed) => 
{
	return mp.game.invoke("0x867654CBC7606F2C", x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:damage is [int]	Arg:p7 is [BOOL]	Arg:weaponHash is [Hash]	Arg:ownerPed is [Ped]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:speed is [float]	Arg:entity is [Entity]	
g_Natives._SHOOT_SINGLE_BULLET_BETWEEN_COORDS_PRESET_PARAMS = (x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed, entity) => 
{
	return mp.game.invoke("0xE3A7742E0B7A2F8B", x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed, entity);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:damage is [int]	Arg:p7 is [BOOL]	Arg:weaponHash is [Hash]	Arg:ownerPed is [Ped]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:speed is [float]	Arg:entity is [Entity]	Arg:p14 is [BOOL]	Arg:p15 is [BOOL]	Arg:p16 is [BOOL]	Arg:p17 is [BOOL]	
g_Natives._SHOOT_SINGLE_BULLET_BETWEEN_COORDS_IGNORE_ENTITY_NEW = (x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed, entity, p14, p15, p16, p17) => 
{
	return mp.game.invoke("0xBFE5756E7407064A", x1, y1, z1, x2, y2, z2, damage, p7, weaponHash, ownerPed, isAudible, isInvisible, speed, entity, p14, p15, p16, p17);
}


// Arg:modelHash is [Hash]	Arg:minimum is [Vector3*]	Arg:maximum is [Vector3*]	
g_Natives.GET_MODEL_DIMENSIONS = (modelHash, minimum, maximum) => 
{
	return mp.game.invoke("0x03E8D3D5F549087A", modelHash, minimum, maximum);
}


// Arg:fakeWantedLevel is [int]	
g_Natives.SET_FAKE_WANTED_LEVEL = (fakeWantedLevel) => 
{
	return mp.game.invoke("0x1454F2448DE30163", fakeWantedLevel);
}

g_Natives.GET_FAKE_WANTED_LEVEL = () => 
{
	return mp.game.invoke("0x4C9296CBCD1B971E");
}


// Arg:address is [int*]	Arg:offset is [int]	
g_Natives.IS_BIT_SET = (address, offset) => 
{
	return mp.game.invoke("0xA921AA820C25702F", address, offset);
}


// Arg:toggle is [BOOL]	
g_Natives.USING_MISSION_CREATOR = (toggle) => 
{
	return mp.game.invoke("0xF14878FC50BEC6EE", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0xDEA36202FC3382DF"] = (p0) => 
{
	return mp.game.invoke("0xDEA36202FC3382DF", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_MINIGAME_IN_PROGRESS = (toggle) => 
{
	return mp.game.invoke("0x19E00D7322C6F85B", toggle);
}

g_Natives.IS_MINIGAME_IN_PROGRESS = () => 
{
	return mp.game.invoke("0x2B4A15E44DE0F478");
}

g_Natives.IS_THIS_A_MINIGAME_SCRIPT = () => 
{
	return mp.game.invoke("0x7B30F65D7B710098");
}

g_Natives.IS_SNIPER_INVERTED = () => 
{
	return mp.game.invoke("0x61A23B7EDA9BDA24");
}

g_Natives["0xD3D15555431AB793"] = () => 
{
	return mp.game.invoke("0xD3D15555431AB793");
}


// Arg:profileSetting is [int]	
g_Natives.GET_PROFILE_SETTING = (profileSetting) => 
{
	return mp.game.invoke("0xC488FF2356EA7791", profileSetting);
}


// Arg:string1 is [char*]	Arg:string2 is [char*]	
g_Natives.ARE_STRINGS_EQUAL = (string1, string2) => 
{
	return mp.game.invoke("0x0C515FAB3FF9EA92", string1, string2);
}


// Arg:str1 is [char*]	Arg:str2 is [char*]	Arg:matchCase is [BOOL]	Arg:maxLength is [int]	
g_Natives.COMPARE_STRINGS = (str1, str2, matchCase, maxLength) => 
{
	return mp.game.invoke("0x1E34710ECD4AB0EB", str1, str2, matchCase, maxLength);
}


// Arg:value is [int]	
g_Natives.ABSI = (value) => 
{
	return mp.game.invoke("0xF0D31AD191A74F87", value);
}


// Arg:value is [float]	
g_Natives.ABSF = (value) => 
{
	return mp.game.invoke("0x73D57CFFDD12C355", value);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.IS_SNIPER_BULLET_IN_AREA = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xFEFCF11B01287125", x1, y1, z1, x2, y2, z2);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:ownedByPlayer is [BOOL]	
g_Natives.IS_PROJECTILE_IN_AREA = (x1, y1, z1, x2, y2, z2, ownedByPlayer) => 
{
	return mp.game.invoke("0x5270A8FBC098C3F8", x1, y1, z1, x2, y2, z2, ownedByPlayer);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:type is [int]	Arg:p7 is [BOOL]	
g_Natives.IS_PROJECTILE_TYPE_IN_AREA = (x1, y1, z1, x2, y2, z2, type, p7) => 
{
	return mp.game.invoke("0x2E0DC353342C4A6D", x1, y1, z1, x2, y2, z2, type, p7);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [Any]	Arg:p8 is [BOOL]	
g_Natives.IS_PROJECTILE_TYPE_IN_ANGLED_AREA = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0xF0BC12401061DEA0", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:projHash is [Hash]	Arg:radius is [float]	Arg:ownedByPlayer is [BOOL]	
g_Natives.IS_PROJECTILE_TYPE_WITHIN_DISTANCE = (x, y, z, projHash, radius, ownedByPlayer) => 
{
	return mp.game.invoke("0x34318593248C8FB2", x, y, z, projHash, radius, ownedByPlayer);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:projHash is [Hash]	Arg:projPos is [Vector3*]	Arg:ownedByPlayer is [BOOL]	
g_Natives._GET_IS_PROJECTILE_TYPE_IN_AREA = (x1, y1, z1, x2, y2, z2, projHash, projPos, ownedByPlayer) => 
{
	return mp.game.invoke("0x8D7A43EC6A5FEA45", x1, y1, z1, x2, y2, z2, projHash, projPos, ownedByPlayer);
}


// Arg:ped is [Ped]	Arg:projHash is [Hash]	Arg:radius is [float]	Arg:projPos is [Vector3*]	Arg:ownedByPlayer is [BOOL]	
g_Natives._GET_PROJECTILE_NEAR_PED_COORDS = (ped, projHash, radius, projPos, ownedByPlayer) => 
{
	return mp.game.invoke("0xDFB4138EEFED7B81", ped, projHash, radius, projPos, ownedByPlayer);
}


// Arg:ped is [Ped]	Arg:projHash is [Hash]	Arg:radius is [float]	Arg:projPos is [Vector3*]	Arg:projEnt is [Entity*]	Arg:ownedByPlayer is [BOOL]	
g_Natives._GET_PROJECTILE_NEAR_PED = (ped, projHash, radius, projPos, projEnt, ownedByPlayer) => 
{
	return mp.game.invoke("0x82FDE6A57EE4EE44", ped, projHash, radius, projPos, projEnt, ownedByPlayer);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [BOOL]	
g_Natives.IS_BULLET_IN_ANGLED_AREA = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x1A8B5F3C01E2B477", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	
g_Natives.IS_BULLET_IN_AREA = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x3F2023999AD51C1F", p0, p1, p2, p3, p4);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	
g_Natives.IS_BULLET_IN_BOX = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xDE0F6D7450D37351", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives.HAS_BULLET_IMPACTED_IN_AREA = (x, y, z, p3, p4, p5) => 
{
	return mp.game.invoke("0x9870ACFB89A90995", x, y, z, p3, p4, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives.HAS_BULLET_IMPACTED_IN_BOX = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0xDC8C5D7CFEAB8394", p0, p1, p2, p3, p4, p5, p6, p7);
}

g_Natives.IS_ORBIS_VERSION = () => 
{
	return mp.game.invoke("0xA72BC0B675B1519E");
}

g_Natives.IS_DURANGO_VERSION = () => 
{
	return mp.game.invoke("0x4D982ADB1978442D");
}

g_Natives.IS_XBOX360_VERSION = () => 
{
	return mp.game.invoke("0xF6201B4DAF662A9D");
}

g_Natives.IS_PS3_VERSION = () => 
{
	return mp.game.invoke("0xCCA1072C29D096C2");
}

g_Natives.IS_PC_VERSION = () => 
{
	return mp.game.invoke("0x48AF36444B965238");
}

g_Natives.IS_AUSSIE_VERSION = () => 
{
	return mp.game.invoke("0x9F1935CA1F724008");
}


// Arg:string is [char*]	
g_Natives.IS_STRING_NULL = (string) => 
{
	return mp.game.invoke("0xF22B6C47C6EAB066", string);
}


// Arg:string is [char*]	
g_Natives.IS_STRING_NULL_OR_EMPTY = (string) => 
{
	return mp.game.invoke("0xCA042B6957743895", string);
}


// Arg:string is [char*]	Arg:outInteger is [int*]	
g_Natives.STRING_TO_INT = (string, outInteger) => 
{
	return mp.game.invoke("0x5A5F40FE637EB584", string, outInteger);
}


// Arg:vars is [int*]	Arg:rangeStart is [int]	Arg:rangeEnd is [int]	Arg:p3 is [int]	
g_Natives.SET_BITS_IN_RANGE = (vars, rangeStart, rangeEnd, p3) => 
{
	return mp.game.invoke("0x8EF07E15701D61ED", vars, rangeStart, rangeEnd, p3);
}


// Arg:vars is [int]	Arg:rangeStart is [int]	Arg:rangeEnd is [int]	
g_Natives.GET_BITS_IN_RANGE = (vars, rangeStart, rangeEnd) => 
{
	return mp.game.invoke("0x53158863FCC0893A", vars, rangeStart, rangeEnd);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	Arg:p12 is [float]	Arg:p13 is [float]	Arg:p14 is [float]	Arg:p15 is [Any]	Arg:p16 is [Any]	
g_Natives.ADD_STUNT_JUMP = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16) => 
{
	return mp.game.invoke("0x1A992DA297A4630C", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	Arg:p12 is [float]	Arg:p13 is [float]	Arg:p14 is [float]	Arg:p15 is [float]	Arg:p16 is [float]	Arg:p17 is [Any]	Arg:p18 is [Any]	
g_Natives.ADD_STUNT_JUMP_ANGLED = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18) => 
{
	return mp.game.invoke("0xBBE5D803A5360CBF", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18);
}


// Arg:player is [int]	
g_Natives.DELETE_STUNT_JUMP = (player) => 
{
	return mp.game.invoke("0xDC518000E39DAE1F", player);
}


// Arg:p0 is [int]	
g_Natives.ENABLE_STUNT_JUMP_SET = (p0) => 
{
	return mp.game.invoke("0xE369A5783B866016", p0);
}


// Arg:p0 is [int]	
g_Natives.DISABLE_STUNT_JUMP_SET = (p0) => 
{
	return mp.game.invoke("0xA5272EBEDD4747F6", p0);
}


// Arg:p0 is [BOOL]	
g_Natives._ENABLE_ALL_STUNTJUMP_SETS = (p0) => 
{
	return mp.game.invoke("0xD79185689F8FD5DF", p0);
}

g_Natives.IS_STUNT_JUMP_IN_PROGRESS = () => 
{
	return mp.game.invoke("0x7A3F19700A4D0525");
}

g_Natives.IS_STUNT_JUMP_MESSAGE_SHOWING = () => 
{
	return mp.game.invoke("0x2272B0A1343129F4");
}

g_Natives["0x996DD1E1E02F1008"] = () => 
{
	return mp.game.invoke("0x996DD1E1E02F1008");
}

g_Natives["0x6856EC3D35C81EA4"] = () => 
{
	return mp.game.invoke("0x6856EC3D35C81EA4");
}

g_Natives.CANCEL_STUNT_JUMP = () => 
{
	return mp.game.invoke("0xE6B7B0ACD4E4B75E");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_GAME_PAUSED = (toggle) => 
{
	return mp.game.invoke("0x577D1284D6873711", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_THIS_SCRIPT_CAN_BE_PAUSED = (toggle) => 
{
	return mp.game.invoke("0xAA391C728106F7AF", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT = (toggle) => 
{
	return mp.game.invoke("0xB98236CAAECEF897", toggle);
}


// Arg:hash is [Hash]	Arg:amount is [int]	
g_Natives._HAS_BUTTON_COMBINATION_JUST_BEEN_ENTERED = (hash, amount) => 
{
	return mp.game.invoke("0x071E2A839DE82D90", hash, amount);
}


// Arg:hash is [Hash]	
g_Natives._HAS_CHEAT_STRING_JUST_BEEN_ENTERED = (hash) => 
{
	return mp.game.invoke("0x557E43C447E700A8", hash);
}


// Arg:toggle is [BOOL]	
g_Natives._USE_FREEMODE_MAP_BEHAVIOR = (toggle) => 
{
	return mp.game.invoke("0x9BAE5AD2508DF078", toggle);
}


// Arg:flag is [int]	
g_Natives._SET_UNK_MAP_FLAG = (flag) => 
{
	return mp.game.invoke("0xC5F0A8EBD3F361CE", flag);
}

g_Natives.IS_FRONTEND_FADING = () => 
{
	return mp.game.invoke("0x7EA2B6AF97ECA6ED");
}

g_Natives.POPULATE_NOW = () => 
{
	return mp.game.invoke("0x7472BB270D7B4F3E");
}

g_Natives.GET_INDEX_OF_CURRENT_LEVEL = () => 
{
	return mp.game.invoke("0xCBAD6729F7B1F4FC");
}


// Arg:level is [int]	
g_Natives.SET_GRAVITY_LEVEL = (level) => 
{
	return mp.game.invoke("0x740E14FAD5842351", level);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives.START_SAVE_DATA = (p0, p1, p2) => 
{
	return mp.game.invoke("0xA9575F812C6A7997", p0, p1, p2);
}

g_Natives.STOP_SAVE_DATA = () => 
{
	return mp.game.invoke("0x74E20C9145FB66FD");
}


// Arg:p0 is [BOOL]	
g_Natives["0xA09F896CE912481F"] = (p0) => 
{
	return mp.game.invoke("0xA09F896CE912481F", p0);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives.REGISTER_INT_TO_SAVE = (p0, name) => 
{
	return mp.game.invoke("0x34C9EE5986258415", p0, name);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0xA735353C77334EA0"] = (p0, p1) => 
{
	return mp.game.invoke("0xA735353C77334EA0", p0, p1);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives.REGISTER_ENUM_TO_SAVE = (p0, name) => 
{
	return mp.game.invoke("0x10C2FA78D0E128A1", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives.REGISTER_FLOAT_TO_SAVE = (p0, name) => 
{
	return mp.game.invoke("0x7CAEC29ECB5DFEBB", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives.REGISTER_BOOL_TO_SAVE = (p0, name) => 
{
	return mp.game.invoke("0xC8F4131414C835A1", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives.REGISTER_TEXT_LABEL_TO_SAVE = (p0, name) => 
{
	return mp.game.invoke("0xEDB1232C5BEAE62F", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives["0x6F7794F28C6B2535"] = (p0, name) => 
{
	return mp.game.invoke("0x6F7794F28C6B2535", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives["0x48F069265A0E4BEC"] = (p0, name) => 
{
	return mp.game.invoke("0x48F069265A0E4BEC", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives["0x8269816F6CFD40F8"] = (p0, name) => 
{
	return mp.game.invoke("0x8269816F6CFD40F8", p0, name);
}


// Arg:p0 is [Any*]	Arg:name is [char*]	
g_Natives["0xFAA457EF263E8763"] = (p0, name) => 
{
	return mp.game.invoke("0xFAA457EF263E8763", p0, name);
}


// Arg:p0 is [Any*]	Arg:p1 is [int]	Arg:structName is [char*]	
g_Natives._START_SAVE_STRUCT = (p0, p1, structName) => 
{
	return mp.game.invoke("0xBF737600CDDBEADD", p0, p1, structName);
}

g_Natives.STOP_SAVE_STRUCT = () => 
{
	return mp.game.invoke("0xEB1774DF12BB9F12");
}


// Arg:p0 is [Any*]	Arg:p1 is [int]	Arg:arrayName is [char*]	
g_Natives._START_SAVE_ARRAY = (p0, p1, arrayName) => 
{
	return mp.game.invoke("0x60FE567DF1B1AF9D", p0, p1, arrayName);
}

g_Natives.STOP_SAVE_ARRAY = () => 
{
	return mp.game.invoke("0x04456F95153C6BE4");
}


// Arg:dispatchType is [int]	Arg:toggle is [BOOL]	
g_Natives.ENABLE_DISPATCH_SERVICE = (dispatchType, toggle) => 
{
	return mp.game.invoke("0xDC0F817884CDD856", dispatchType, toggle);
}


// Arg:dispatchType is [int]	Arg:toggle is [BOOL]	
g_Natives.BLOCK_DISPATCH_SERVICE_RESOURCE_CREATION = (dispatchType, toggle) => 
{
	return mp.game.invoke("0x9B2BD3773123EA2F", dispatchType, toggle);
}


// Arg:dispatchService is [int]	
g_Natives._GET_NUMBER_OF_DISPATCHED_UNITS_FOR_PLAYER = (dispatchService) => 
{
	return mp.game.invoke("0xEB4A0C2D56441717", dispatchService);
}


// Arg:incidentType is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [int]	Arg:radius is [float]	Arg:outIncidentID is [int*]	
g_Natives.CREATE_INCIDENT = (incidentType, x, y, z, p5, radius, outIncidentID) => 
{
	return mp.game.invoke("0x3F892CAF67444AE7", incidentType, x, y, z, p5, radius, outIncidentID);
}


// Arg:incidentType is [int]	Arg:ped is [Ped]	Arg:amountOfPeople is [int]	Arg:radius is [float]	Arg:outIncidentID is [int*]	
g_Natives.CREATE_INCIDENT_WITH_ENTITY = (incidentType, ped, amountOfPeople, radius, outIncidentID) => 
{
	return mp.game.invoke("0x05983472F0494E60", incidentType, ped, amountOfPeople, radius, outIncidentID);
}


// Arg:incidentId is [int]	
g_Natives.DELETE_INCIDENT = (incidentId) => 
{
	return mp.game.invoke("0x556C1AA270D5A207", incidentId);
}


// Arg:incidentId is [int]	
g_Natives.IS_INCIDENT_VALID = (incidentId) => 
{
	return mp.game.invoke("0xC8BC6461E629BEAA", incidentId);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xB08B85D860E7BA3C"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB08B85D860E7BA3C", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xD261BA3E7E998072"] = (p0, p1) => 
{
	return mp.game.invoke("0xD261BA3E7E998072", p0, p1);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:distance is [float]	Arg:spawnPoint is [Vector3*]	
g_Natives.FIND_SPAWN_POINT_IN_DIRECTION = (x1, y1, z1, x2, y2, z2, distance, spawnPoint) => 
{
	return mp.game.invoke("0x6874E2190B0C1972", x1, y1, z1, x2, y2, z2, distance, spawnPoint);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	Arg:p8 is [Any]	
g_Natives["0x67F6413D3220E18D"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x67F6413D3220E18D", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [Any]	
g_Natives["0x1327E2FE9746BAEE"] = (p0) => 
{
	return mp.game.invoke("0x1327E2FE9746BAEE", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xB129E447A2EDA4BF"] = (p0, p1) => 
{
	return mp.game.invoke("0xB129E447A2EDA4BF", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives["0x32C7A7E8C43A1F80"] = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x32C7A7E8C43A1F80", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xE6869BECDD8F2403"] = (p0, p1) => 
{
	return mp.game.invoke("0xE6869BECDD8F2403", p0, p1);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.ENABLE_TENNIS_MODE = (ped, toggle, p2) => 
{
	return mp.game.invoke("0x28A04B411933F8A6", ped, toggle, p2);
}


// Arg:ped is [Ped]	
g_Natives.IS_TENNIS_MODE = (ped) => 
{
	return mp.game.invoke("0x5D5479D115290C3F", ped);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [BOOL]	
g_Natives["0xE266ED23311F24D4"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xE266ED23311F24D4", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	
g_Natives["0x17DF68D720AA77F8"] = (p0) => 
{
	return mp.game.invoke("0x17DF68D720AA77F8", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x19BFED045C647C49"] = (p0) => 
{
	return mp.game.invoke("0x19BFED045C647C49", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xE95B0C7D5BA3B96B"] = (p0) => 
{
	return mp.game.invoke("0xE95B0C7D5BA3B96B", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [BOOL]	
g_Natives["0x8FA9C42FC5D7C64B"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x8FA9C42FC5D7C64B", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [char*]	Arg:p2 is [float]	
g_Natives["0x54F157E0336A3822"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x54F157E0336A3822", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xD10F442036302D50"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD10F442036302D50", p0, p1, p2);
}

g_Natives.RESET_DISPATCH_IDEAL_SPAWN_DISTANCE = () => 
{
	return mp.game.invoke("0x77A84429DD9F0A15");
}


// Arg:p0 is [float]	
g_Natives.SET_DISPATCH_IDEAL_SPAWN_DISTANCE = (p0) => 
{
	return mp.game.invoke("0x6FE601A64180D423", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives.SET_DISPATCH_TIME_BETWEEN_SPAWN_ATTEMPTS = (p0, p1) => 
{
	return mp.game.invoke("0x44F7CBC1BEB3327D", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives.SET_DISPATCH_TIME_BETWEEN_SPAWN_ATTEMPTS_MULTIPLIER = (p0, p1) => 
{
	return mp.game.invoke("0x48838ED9937A15D1", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives["0x918C7B2D2FF3928B"] = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x918C7B2D2FF3928B", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x2D4259F1FEB81DA9"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x2D4259F1FEB81DA9", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives.REMOVE_DISPATCH_SPAWN_BLOCKING_AREA = (p0) => 
{
	return mp.game.invoke("0x264AC28B01B353A5", p0);
}

g_Natives.RESET_DISPATCH_SPAWN_BLOCKING_AREAS = () => 
{
	return mp.game.invoke("0xAC7BFD5C1D83EA75");
}

g_Natives["0xD9F692D349249528"] = () => 
{
	return mp.game.invoke("0xD9F692D349249528");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xE532EC1A63231B4F"] = (p0, p1) => 
{
	return mp.game.invoke("0xE532EC1A63231B4F", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xB8721407EE9C3FF6"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB8721407EE9C3FF6", p0, p1, p2);
}

g_Natives["0xB3CD58CCA6CDA852"] = () => 
{
	return mp.game.invoke("0xB3CD58CCA6CDA852");
}


// Arg:p0 is [BOOL]	
g_Natives["0x2587A48BC88DFADF"] = (p0) => 
{
	return mp.game.invoke("0x2587A48BC88DFADF", p0);
}


// Arg:p0 is [int]	Arg:windowTitle is [char*]	Arg:p2 is [Any*]	Arg:defaultText is [Player*]	Arg:defaultConcat1 is [char*]	Arg:defaultConcat2 is [char*]	Arg:defaultConcat3 is [char*]	Arg:defaultConcat4 is [char*]	Arg:defaultConcat5 is [char*]	Arg:defaultConcat6 is [char*]	Arg:defaultConcat7 is [char*]	Arg:maxInputLength is [int]	
g_Natives._DISPLAY_ONSCREEN_KEYBOARD_2 = (p0, windowTitle, p2, defaultText, defaultConcat1, defaultConcat2, defaultConcat3, defaultConcat4, defaultConcat5, defaultConcat6, defaultConcat7, maxInputLength) => 
{
	return mp.game.invoke("0xCA78CFA0366592FE", p0, windowTitle, p2, defaultText, defaultConcat1, defaultConcat2, defaultConcat3, defaultConcat4, defaultConcat5, defaultConcat6, defaultConcat7, maxInputLength);
}


// Arg:p0 is [int]	Arg:windowTitle is [char*]	Arg:p2 is [char*]	Arg:defaultText is [char*]	Arg:defaultConcat1 is [char*]	Arg:defaultConcat2 is [char*]	Arg:defaultConcat3 is [char*]	Arg:maxInputLength is [int]	
g_Natives.DISPLAY_ONSCREEN_KEYBOARD = (p0, windowTitle, p2, defaultText, defaultConcat1, defaultConcat2, defaultConcat3, maxInputLength) => 
{
	return mp.game.invoke("0x00DC833F2568DBF6", p0, windowTitle, p2, defaultText, defaultConcat1, defaultConcat2, defaultConcat3, maxInputLength);
}

g_Natives.UPDATE_ONSCREEN_KEYBOARD = () => 
{
	return mp.game.invoke("0x0CF2B696BBF945AE");
}

g_Natives.GET_ONSCREEN_KEYBOARD_RESULT = () => 
{
	return mp.game.invoke("0x8362B09B91893647");
}


// Arg:p0 is [int]	
g_Natives._SAVE_NEXT_KEYBOARD_INPUT = (p0) => 
{
	return mp.game.invoke("0x3ED1438C1F5C6612", p0);
}


// Arg:hash is [Hash]	Arg:p1 is [BOOL]	
g_Natives._REMOVE_STEALTH_KILL = (hash, p1) => 
{
	return mp.game.invoke("0xA6A12939F16D85BE", hash, p1);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	
g_Natives["0x1EAE0A6E978894A2"] = (p0, p1) => 
{
	return mp.game.invoke("0x1EAE0A6E978894A2", p0, p1);
}


// Arg:player is [Player]	
g_Natives.SET_EXPLOSIVE_AMMO_THIS_FRAME = (player) => 
{
	return mp.game.invoke("0xA66C71C98D5F2CFB", player);
}


// Arg:player is [Player]	
g_Natives.SET_FIRE_AMMO_THIS_FRAME = (player) => 
{
	return mp.game.invoke("0x11879CDD803D30F4", player);
}


// Arg:player is [Player]	
g_Natives.SET_EXPLOSIVE_MELEE_THIS_FRAME = (player) => 
{
	return mp.game.invoke("0xFF1BED81BFDC0FE0", player);
}


// Arg:player is [Player]	
g_Natives.SET_SUPER_JUMP_THIS_FRAME = (player) => 
{
	return mp.game.invoke("0x57FFF03E423A4C0B", player);
}

g_Natives["0x6FDDF453C0C756EC"] = () => 
{
	return mp.game.invoke("0x6FDDF453C0C756EC");
}

g_Natives["0xFB00CA71DA386228"] = () => 
{
	return mp.game.invoke("0xFB00CA71DA386228");
}

g_Natives["0x5AA3BEFA29F03AD4"] = () => 
{
	return mp.game.invoke("0x5AA3BEFA29F03AD4");
}

g_Natives["0xE3D969D2785FFB5E"] = () => 
{
	return mp.game.invoke("0xE3D969D2785FFB5E");
}

g_Natives._RESET_LOCALPLAYER_STATE = () => 
{
	return mp.game.invoke("0xC0AA53F866B3134D");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x0A60017F841A54F2"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x0A60017F841A54F2", p0, p1, p2, p3);
}

g_Natives["0x1FF6BF9A63E5757F"] = () => 
{
	return mp.game.invoke("0x1FF6BF9A63E5757F");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x1BB299305C3E8C13"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x1BB299305C3E8C13", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0x8EF5573A1F801A5C"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x8EF5573A1F801A5C", p0, p1, p2);
}

g_Natives._START_BENCHMARK_TEST = () => 
{
	return mp.game.invoke("0x92790862E36C2ADA");
}

g_Natives["0xC7DB36C24634F52B"] = () => 
{
	return mp.game.invoke("0xC7DB36C24634F52B");
}

g_Natives["0x437138B6A830166A"] = () => 
{
	return mp.game.invoke("0x437138B6A830166A");
}

g_Natives["0x37DEB0AA183FB6D8"] = () => 
{
	return mp.game.invoke("0x37DEB0AA183FB6D8");
}

g_Natives["0xEA2F2061875EED90"] = () => 
{
	return mp.game.invoke("0xEA2F2061875EED90");
}

g_Natives["0x3BBBD13E5041A79E"] = () => 
{
	return mp.game.invoke("0x3BBBD13E5041A79E");
}

g_Natives["0xA049A5BE0F04F2F8"] = () => 
{
	return mp.game.invoke("0xA049A5BE0F04F2F8");
}

g_Natives["0x4750FC27570311EC"] = () => 
{
	return mp.game.invoke("0x4750FC27570311EC");
}

g_Natives["0x1B2366C3F2A5C8DF"] = () => 
{
	return mp.game.invoke("0x1B2366C3F2A5C8DF");
}

g_Natives._FORCE_SOCIAL_CLUB_UPDATE = () => 
{
	return mp.game.invoke("0xEB6891F03362FB12");
}

g_Natives._HAS_ALL_CHUNKS_ON_HDD = () => 
{
	return mp.game.invoke("0x14832BF2ABA53FC5");
}

g_Natives._CLEANUP_ASYNC_INSTALL = () => 
{
	return mp.game.invoke("0xC79AE21974B01FB2");
}

g_Natives["0x684A41975F077262"] = () => 
{
	return mp.game.invoke("0x684A41975F077262");
}

g_Natives["0xABB2FA71C83A1B72"] = () => 
{
	return mp.game.invoke("0xABB2FA71C83A1B72");
}


// Arg:toggle is [BOOL]	
g_Natives._SET_SHOW_PED_IN_PAUSE_MENU = (toggle) => 
{
	return mp.game.invoke("0x4EBB7E87AA0DBED4", toggle);
}

g_Natives._GET_SHOW_PED_IN_PAUSE_MENU = () => 
{
	return mp.game.invoke("0x9689123E3F213AA5");
}


// Arg:p0 is [BOOL]	
g_Natives["0x9D8D44ADBBA61EF2"] = (p0) => 
{
	return mp.game.invoke("0x9D8D44ADBBA61EF2", p0);
}

g_Natives["0x23227DF0B2115469"] = () => 
{
	return mp.game.invoke("0x23227DF0B2115469");
}

g_Natives["0xD10282B6E3751BA0"] = () => 
{
	return mp.game.invoke("0xD10282B6E3751BA0");
}


// Arg:ringtoneName is [char*]	Arg:ped is [Ped]	Arg:p2 is [BOOL]	
g_Natives.PLAY_PED_RINGTONE = (ringtoneName, ped, p2) => 
{
	return mp.game.invoke("0xF9E56683CA8E11A5", ringtoneName, ped, p2);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_RINGTONE_PLAYING = (ped) => 
{
	return mp.game.invoke("0x1E8E5E20937E3137", ped);
}


// Arg:ped is [Ped]	
g_Natives.STOP_PED_RINGTONE = (ped) => 
{
	return mp.game.invoke("0x6C5AE23EFA885092", ped);
}

g_Natives.IS_MOBILE_PHONE_CALL_ONGOING = () => 
{
	return mp.game.invoke("0x7497D2CE2C30D24C");
}

g_Natives["0xC8B1B2425604CDD0"] = () => 
{
	return mp.game.invoke("0xC8B1B2425604CDD0");
}

g_Natives.CREATE_NEW_SCRIPTED_CONVERSATION = () => 
{
	return mp.game.invoke("0xD2C91A0B572AAE56");
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:p2 is [char*]	Arg:p3 is [int]	Arg:p4 is [int]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	Arg:p8 is [BOOL]	Arg:p9 is [int]	Arg:p10 is [BOOL]	Arg:p11 is [BOOL]	Arg:p12 is [BOOL]	
g_Natives.ADD_LINE_TO_CONVERSATION = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0xC5EF963405593646", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}


// Arg:pedIndex is [int]	Arg:ped is [Ped]	Arg:name is [char*]	
g_Natives.ADD_PED_TO_CONVERSATION = (pedIndex, ped, name) => 
{
	return mp.game.invoke("0x95D9F4BC443956E7", pedIndex, ped, name);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x33E3C6C6F2F0B506"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x33E3C6C6F2F0B506", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x892B6AB8F33606F5"] = (p0, p1) => 
{
	return mp.game.invoke("0x892B6AB8F33606F5", p0, p1);
}


// Arg:p0 is [BOOL]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:x3 is [float]	Arg:y3 is [float]	Arg:z3 is [float]	
g_Natives.SET_MICROPHONE_POSITION = (p0, x1, y1, z1, x2, y2, z2, x3, y3, z3) => 
{
	return mp.game.invoke("0xB6AE90EDDE95C762", p0, x1, y1, z1, x2, y2, z2, x3, y3, z3);
}


// Arg:p0 is [BOOL]	
g_Natives["0x0B568201DD99F0EB"] = (p0) => 
{
	return mp.game.invoke("0x0B568201DD99F0EB", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x61631F5DF50D1C34"] = (p0) => 
{
	return mp.game.invoke("0x61631F5DF50D1C34", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.START_SCRIPT_PHONE_CONVERSATION = (p0, p1) => 
{
	return mp.game.invoke("0x252E5F915EABB675", p0, p1);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.PRELOAD_SCRIPT_PHONE_CONVERSATION = (p0, p1) => 
{
	return mp.game.invoke("0x6004BCB0E226AAEA", p0, p1);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.START_SCRIPT_CONVERSATION = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6B17C62C9635D2DC", p0, p1, p2, p3);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.PRELOAD_SCRIPT_CONVERSATION = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x3B3CAD6166916D87", p0, p1, p2, p3);
}

g_Natives.START_PRELOADED_CONVERSATION = () => 
{
	return mp.game.invoke("0x23641AFE870AF385");
}

g_Natives["0xE73364DB90778FFA"] = () => 
{
	return mp.game.invoke("0xE73364DB90778FFA");
}

g_Natives.IS_SCRIPTED_CONVERSATION_ONGOING = () => 
{
	return mp.game.invoke("0x16754C556D2EDE3D");
}

g_Natives.IS_SCRIPTED_CONVERSATION_LOADED = () => 
{
	return mp.game.invoke("0xDF0D54BE7A776737");
}

g_Natives.GET_CURRENT_SCRIPTED_CONVERSATION_LINE = () => 
{
	return mp.game.invoke("0x480357EE890C295A");
}


// Arg:finishCurLine is [BOOL]	
g_Natives.PAUSE_SCRIPTED_CONVERSATION = (finishCurLine) => 
{
	return mp.game.invoke("0x8530AD776CD72B12", finishCurLine);
}

g_Natives.RESTART_SCRIPTED_CONVERSATION = () => 
{
	return mp.game.invoke("0x9AEB285D1818C9AC");
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_SCRIPTED_CONVERSATION = (p0) => 
{
	return mp.game.invoke("0xD79DEEFB53455EBA", p0);
}

g_Natives.SKIP_TO_NEXT_SCRIPTED_CONVERSATION_LINE = () => 
{
	return mp.game.invoke("0x9663FE6B7A61EB00");
}


// Arg:targ is [Ped]	Arg:gxtLine is [char*]	Arg:charName is [char*]	
g_Natives.INTERRUPT_CONVERSATION = (targ, gxtLine, charName) => 
{
	return mp.game.invoke("0xA018A12E5C5C2FA6", targ, gxtLine, charName);
}


// Arg:p0 is [Ped]	Arg:p1 is [char*]	Arg:p2 is [char*]	
g_Natives._INTERRUPT_CONVERSATION_AND_PAUSE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x8A694D7A68F8DC38", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives["0xAA19F5572C38B564"] = (p0) => 
{
	return mp.game.invoke("0xAA19F5572C38B564", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xB542DE8C3D1CB210"] = (p0) => 
{
	return mp.game.invoke("0xB542DE8C3D1CB210", p0);
}


// Arg:p0 is [int]	
g_Natives.REGISTER_SCRIPT_WITH_AUDIO = (p0) => 
{
	return mp.game.invoke("0xC6ED9D5092438D91", p0);
}

g_Natives.UNREGISTER_SCRIPT_WITH_AUDIO = () => 
{
	return mp.game.invoke("0xA8638BE228D4751A");
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives.REQUEST_MISSION_AUDIO_BANK = (p0, p1) => 
{
	return mp.game.invoke("0x7345BDD95E62E0F2", p0, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives.REQUEST_AMBIENT_AUDIO_BANK = (p0, p1) => 
{
	return mp.game.invoke("0xFE02FFBED8CA9D99", p0, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives.REQUEST_SCRIPT_AUDIO_BANK = (p0, p1) => 
{
	return mp.game.invoke("0x2F844A8B08D76685", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.HINT_AMBIENT_AUDIO_BANK = (p0, p1) => 
{
	return mp.game.invoke("0x8F8C0E370AE62F5C", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.HINT_SCRIPT_AUDIO_BANK = (p0, p1) => 
{
	return mp.game.invoke("0xFB380A29641EC31A", p0, p1);
}

g_Natives.RELEASE_MISSION_AUDIO_BANK = () => 
{
	return mp.game.invoke("0x0EC92A1BF0857187");
}

g_Natives.RELEASE_AMBIENT_AUDIO_BANK = () => 
{
	return mp.game.invoke("0x65475A218FFAA93D");
}


// Arg:audioBank is [char*]	
g_Natives.RELEASE_NAMED_SCRIPT_AUDIO_BANK = (audioBank) => 
{
	return mp.game.invoke("0x77ED170667F50170", audioBank);
}

g_Natives.RELEASE_SCRIPT_AUDIO_BANK = () => 
{
	return mp.game.invoke("0x7A2D8AD0A9EB9C3F");
}

g_Natives["0x19AF7ED9B9D23058"] = () => 
{
	return mp.game.invoke("0x19AF7ED9B9D23058");
}

g_Natives["0x9AC92EED5E4793AB"] = () => 
{
	return mp.game.invoke("0x9AC92EED5E4793AB");
}

g_Natives.GET_SOUND_ID = () => 
{
	return mp.game.invoke("0x430386FE9BF80B45");
}


// Arg:soundId is [int]	
g_Natives.RELEASE_SOUND_ID = (soundId) => 
{
	return mp.game.invoke("0x353FC880830B88FA", soundId);
}


// Arg:soundId is [Player]	Arg:audioName is [char*]	Arg:audioRef is [char*]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	Arg:p5 is [BOOL]	
g_Natives.PLAY_SOUND = (soundId, audioName, audioRef, p3, p4, p5) => 
{
	return mp.game.invoke("0x7FF4944CC209192D", soundId, audioName, audioRef, p3, p4, p5);
}


// Arg:soundId is [int]	Arg:audioName is [char*]	Arg:audioRef is [char*]	Arg:p3 is [BOOL]	
g_Natives.PLAY_SOUND_FRONTEND = (soundId, audioName, audioRef, p3) => 
{
	return mp.game.invoke("0x67C540AA08E4A6F5", soundId, audioName, audioRef, p3);
}


// Arg:p0 is [char*]	Arg:soundset is [char*]	
g_Natives["0xCADA5A0D0702381E"] = (p0, soundset) => 
{
	return mp.game.invoke("0xCADA5A0D0702381E", p0, soundset);
}


// Arg:soundId is [int]	Arg:audioName is [char*]	Arg:entity is [Entity]	Arg:audioRef is [char*]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	
g_Natives.PLAY_SOUND_FROM_ENTITY = (soundId, audioName, entity, audioRef, p4, p5) => 
{
	return mp.game.invoke("0xE65F427EB70AB1ED", soundId, audioName, entity, audioRef, p4, p5);
}


// Arg:soundId is [int]	Arg:audioName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:audioRef is [char*]	Arg:p6 is [BOOL]	Arg:range is [int]	Arg:p8 is [BOOL]	
g_Natives.PLAY_SOUND_FROM_COORD = (soundId, audioName, x, y, z, audioRef, p6, range, p8) => 
{
	return mp.game.invoke("0x8D8686B622B88120", soundId, audioName, x, y, z, audioRef, p6, range, p8);
}


// Arg:soundId is [int]	
g_Natives.STOP_SOUND = (soundId) => 
{
	return mp.game.invoke("0xA3B0C41BA5CC0BB5", soundId);
}


// Arg:soundId is [int]	
g_Natives.GET_NETWORK_ID_FROM_SOUND_ID = (soundId) => 
{
	return mp.game.invoke("0x2DE3F0A134FFBC0D", soundId);
}


// Arg:netId is [int]	
g_Natives.GET_SOUND_ID_FROM_NETWORK_ID = (netId) => 
{
	return mp.game.invoke("0x75262FD12D0A1C84", netId);
}


// Arg:soundId is [int]	Arg:variableName is [char*]	Arg:value is [float]	
g_Natives.SET_VARIABLE_ON_SOUND = (soundId, variableName, value) => 
{
	return mp.game.invoke("0xAD6B3148A78AE9B6", soundId, variableName, value);
}


// Arg:p0 is [char*]	Arg:p1 is [float]	
g_Natives.SET_VARIABLE_ON_STREAM = (p0, p1) => 
{
	return mp.game.invoke("0x2F9D3834AEB9EF79", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	
g_Natives.OVERRIDE_UNDERWATER_STREAM = (p0, p1) => 
{
	return mp.game.invoke("0xF2A9CDABCEA04BD6", p0, p1);
}


// Arg:name is [char*]	Arg:p1 is [float]	
g_Natives["0x733ADF241531E5C2"] = (name, p1) => 
{
	return mp.game.invoke("0x733ADF241531E5C2", name, p1);
}


// Arg:soundId is [int]	
g_Natives.HAS_SOUND_FINISHED = (soundId) => 
{
	return mp.game.invoke("0xFCBDCE714A7C88E5", soundId);
}


// Arg:ped is [Ped]	Arg:speechName is [char*]	Arg:speechParam is [char*]	
g_Natives._PLAY_AMBIENT_SPEECH1 = (ped, speechName, speechParam) => 
{
	return mp.game.invoke("0x8E04FEDD28D42462", ped, speechName, speechParam);
}


// Arg:ped is [Ped]	Arg:speechName is [char*]	Arg:speechParam is [char*]	
g_Natives._PLAY_AMBIENT_SPEECH2 = (ped, speechName, speechParam) => 
{
	return mp.game.invoke("0xC6941B4A3A8FBBB9", ped, speechName, speechParam);
}


// Arg:p0 is [Ped]	Arg:speechName is [char*]	Arg:voiceName is [char*]	Arg:speechParam is [char*]	Arg:p4 is [BOOL]	
g_Natives._PLAY_AMBIENT_SPEECH_WITH_VOICE = (p0, speechName, voiceName, speechParam, p4) => 
{
	return mp.game.invoke("0x3523634255FC3318", p0, speechName, voiceName, speechParam, p4);
}


// Arg:speechName is [char*]	Arg:voiceName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:speechParam is [char*]	
g_Natives._PLAY_AMBIENT_SPEECH_AT_COORDS = (speechName, voiceName, x, y, z, speechParam) => 
{
	return mp.game.invoke("0xED640017ED337E45", speechName, voiceName, x, y, z, speechParam);
}


// Arg:p0 is [char*]	
g_Natives.OVERRIDE_TREVOR_RAGE = (p0) => 
{
	return mp.game.invoke("0x13AD665062541A7E", p0);
}

g_Natives.RESET_TREVOR_RAGE = () => 
{
	return mp.game.invoke("0xE78503B10C4314E0");
}


// Arg:playerPed is [Ped]	Arg:value is [BOOL]	
g_Natives.SET_PLAYER_ANGRY = (playerPed, value) => 
{
	return mp.game.invoke("0xEA241BB04110F091", playerPed, value);
}


// Arg:ped is [Ped]	Arg:painID is [int]	Arg:p1 is [float]	
g_Natives.PLAY_PAIN = (ped, painID, p1) => 
{
	return mp.game.invoke("0xBC9AE166038A5CEC", ped, painID, p1);
}


// Arg:p0 is [char*]	
g_Natives["0xD01005D2BA2EB778"] = (p0) => 
{
	return mp.game.invoke("0xD01005D2BA2EB778", p0);
}


// Arg:p0 is [char*]	
g_Natives["0xDDC635D5B3262C56"] = (p0) => 
{
	return mp.game.invoke("0xDDC635D5B3262C56", p0);
}


// Arg:ped is [Ped]	Arg:name is [char*]	
g_Natives.SET_AMBIENT_VOICE_NAME = (ped, name) => 
{
	return mp.game.invoke("0x6C8065A3B780185B", ped, name);
}


// Arg:ped is [Ped]	
g_Natives._RESET_AMBIENT_VOICE = (ped) => 
{
	return mp.game.invoke("0x40CF0D12D142A9E8", ped);
}


// Arg:playerPed is [Ped]	Arg:p1 is [Hash]	
g_Natives["0x7CDC8C3B89F661B3"] = (playerPed, p1) => 
{
	return mp.game.invoke("0x7CDC8C3B89F661B3", playerPed, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xA5342D390CDA41D6"] = (p0, p1) => 
{
	return mp.game.invoke("0xA5342D390CDA41D6", p0, p1);
}


// Arg:ped is [Ped]	
g_Natives._SET_PED_MUTE = (ped) => 
{
	return mp.game.invoke("0x7A73D05A607734C7", ped);
}


// Arg:ped is [Ped]	
g_Natives.STOP_CURRENT_PLAYING_AMBIENT_SPEECH = (ped) => 
{
	return mp.game.invoke("0xB8BEC0CA6F0EDB0F", ped);
}


// Arg:p0 is [Ped]	
g_Natives.IS_AMBIENT_SPEECH_PLAYING = (p0) => 
{
	return mp.game.invoke("0x9072C8B49907BFAD", p0);
}


// Arg:p0 is [Any]	
g_Natives.IS_SCRIPTED_SPEECH_PLAYING = (p0) => 
{
	return mp.game.invoke("0xCC9AA18DCC7084F4", p0);
}


// Arg:ped is [Ped]	
g_Natives.IS_ANY_SPEECH_PLAYING = (ped) => 
{
	return mp.game.invoke("0x729072355FA39EC9", ped);
}


// Arg:ped is [Ped]	Arg:speechName is [char*]	Arg:unk is [BOOL]	
g_Natives._CAN_PED_SPEAK = (ped, speechName, unk) => 
{
	return mp.game.invoke("0x49B99BF3FDA89A7A", ped, speechName, unk);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_IN_CURRENT_CONVERSATION = (ped) => 
{
	return mp.game.invoke("0x049E937F18F4020C", ped);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_IS_DRUNK = (ped, toggle) => 
{
	return mp.game.invoke("0x95D2D383D5396B8A", ped, toggle);
}


// Arg:entity is [Entity]	Arg:unk is [int]	Arg:speech is [char*]	
g_Natives._PLAY_ANIMAL_VOCALIZATION = (entity, unk, speech) => 
{
	return mp.game.invoke("0xEE066C7006C49C0A", entity, unk, speech);
}


// Arg:p0 is [Any]	
g_Natives._IS_ANIMAL_VOCALIZATION_PLAYING = (p0) => 
{
	return mp.game.invoke("0xC265DF9FB44A9FBD", p0);
}


// Arg:animal is [Ped]	Arg:mood is [int]	
g_Natives.SET_ANIMAL_MOOD = (animal, mood) => 
{
	return mp.game.invoke("0xCC97B29285B1DC3B", animal, mood);
}

g_Natives.IS_MOBILE_PHONE_RADIO_ACTIVE = () => 
{
	return mp.game.invoke("0xB35CE999E8EF317E");
}


// Arg:state is [BOOL]	
g_Natives.SET_MOBILE_PHONE_RADIO_STATE = (state) => 
{
	return mp.game.invoke("0xBF286C554784F3DF", state);
}

g_Natives.GET_PLAYER_RADIO_STATION_INDEX = () => 
{
	return mp.game.invoke("0xE8AF77C4C06ADC93");
}

g_Natives.GET_PLAYER_RADIO_STATION_NAME = () => 
{
	return mp.game.invoke("0xF6D733C32076AD03");
}


// Arg:radioStation is [int]	
g_Natives.GET_RADIO_STATION_NAME = (radioStation) => 
{
	return mp.game.invoke("0xB28ECA15046CA8B9", radioStation);
}

g_Natives.GET_PLAYER_RADIO_STATION_GENRE = () => 
{
	return mp.game.invoke("0xA571991A7FE6CCEB");
}

g_Natives.IS_RADIO_RETUNING = () => 
{
	return mp.game.invoke("0xA151A7394A214E65");
}

g_Natives["0x0626A247D2405330"] = () => 
{
	return mp.game.invoke("0x0626A247D2405330");
}

g_Natives._TUNE_FORWARD = () => 
{
	return mp.game.invoke("0xFF266D1D0EB1195D");
}

g_Natives._TUNE_BACKWARD = () => 
{
	return mp.game.invoke("0xDD6BCF9E94425DF9");
}


// Arg:stationName is [char*]	
g_Natives.SET_RADIO_TO_STATION_NAME = (stationName) => 
{
	return mp.game.invoke("0xC69EDA28699D5107", stationName);
}


// Arg:vehicle is [Vehicle]	Arg:radioStation is [char*]	
g_Natives.SET_VEH_RADIO_STATION = (vehicle, radioStation) => 
{
	return mp.game.invoke("0x1B9C0099CB942AC6", vehicle, radioStation);
}


// Arg:vehicle is [Vehicle]	
g_Natives._SET_VEHICLE_AS_AMBIENT_EMMITTER = (vehicle) => 
{
	return mp.game.invoke("0xC1805D05E6D4FE10", vehicle);
}


// Arg:emitterName is [char*]	Arg:radioStation is [char*]	
g_Natives.SET_EMITTER_RADIO_STATION = (emitterName, radioStation) => 
{
	return mp.game.invoke("0xACF57305B12AF907", emitterName, radioStation);
}


// Arg:emitterName is [char*]	Arg:toggle is [BOOL]	
g_Natives.SET_STATIC_EMITTER_ENABLED = (emitterName, toggle) => 
{
	return mp.game.invoke("0x399D2D3B33F1B8EB", emitterName, toggle);
}


// Arg:radioStation is [int]	
g_Natives.SET_RADIO_TO_STATION_INDEX = (radioStation) => 
{
	return mp.game.invoke("0xA619B168B8A8570F", radioStation);
}


// Arg:active is [BOOL]	
g_Natives.SET_FRONTEND_RADIO_ACTIVE = (active) => 
{
	return mp.game.invoke("0xF7F26C6E9CC9EBB8", active);
}


// Arg:newsStory is [int]	
g_Natives.UNLOCK_MISSION_NEWS_STORY = (newsStory) => 
{
	return mp.game.invoke("0xB165AB7C248B2DC1", newsStory);
}


// Arg:p0 is [Any]	
g_Natives.GET_NUMBER_OF_PASSENGER_VOICE_VARIATIONS = (p0) => 
{
	return mp.game.invoke("0x66E49BF55B4B1874", p0);
}

g_Natives.GET_AUDIBLE_MUSIC_TRACK_TEXT_ID = () => 
{
	return mp.game.invoke("0x50B196FC9ED6545B");
}


// Arg:play is [BOOL]	
g_Natives.PLAY_END_CREDITS_MUSIC = (play) => 
{
	return mp.game.invoke("0xCD536C4D33DCC900", play);
}

g_Natives.SKIP_RADIO_FORWARD = () => 
{
	return mp.game.invoke("0x6DDBBDD98E2E9C25");
}


// Arg:radioStation is [char*]	
g_Natives.FREEZE_RADIO_STATION = (radioStation) => 
{
	return mp.game.invoke("0x344F393B027E38C3", radioStation);
}


// Arg:radioStation is [char*]	
g_Natives.UNFREEZE_RADIO_STATION = (radioStation) => 
{
	return mp.game.invoke("0xFC00454CF60B91DD", radioStation);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_RADIO_AUTO_UNFREEZE = (toggle) => 
{
	return mp.game.invoke("0xC1AA9F53CE982990", toggle);
}


// Arg:radioStation is [char*]	
g_Natives.SET_INITIAL_PLAYER_STATION = (radioStation) => 
{
	return mp.game.invoke("0x88795F13FACDA88D", radioStation);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_USER_RADIO_CONTROL_ENABLED = (toggle) => 
{
	return mp.game.invoke("0x19F21E63AE6EAE4E", toggle);
}


// Arg:radioStation is [char*]	Arg:effectOrEvent is [char*]	
g_Natives.SET_RADIO_TRACK = (radioStation, effectOrEvent) => 
{
	return mp.game.invoke("0xB39786F201FEE30B", radioStation, effectOrEvent);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_RADIO_LOUD = (vehicle, toggle) => 
{
	return mp.game.invoke("0xBB6F1CAEC68B0BCE", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._IS_VEHICLE_RADIO_LOUD = (vehicle) => 
{
	return mp.game.invoke("0x032A116663A4D5AC", vehicle);
}


// Arg:Toggle is [BOOL]	
g_Natives.SET_MOBILE_RADIO_ENABLED_DURING_GAMEPLAY = (Toggle) => 
{
	return mp.game.invoke("0x1098355A16064BB3", Toggle);
}

g_Natives._DOES_PLAYER_VEH_HAVE_RADIO = () => 
{
	return mp.game.invoke("0x109697E2FFBAC8A1");
}

g_Natives._IS_PLAYER_VEHICLE_RADIO_ENABLED = () => 
{
	return mp.game.invoke("0x5F43D83FD6738741");
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_RADIO_ENABLED = (vehicle, toggle) => 
{
	return mp.game.invoke("0x3B988190C0AA6C0B", vehicle, toggle);
}


// Arg:radioStation is [char*]	Arg:trackList is [char*]	Arg:b is [BOOL]	
g_Natives._SET_CUSTOM_RADIO_TRACK_LIST = (radioStation, trackList, b) => 
{
	return mp.game.invoke("0x4E404A9361F75BB2", radioStation, trackList, b);
}


// Arg:radioStation is [char*]	
g_Natives._CLEAR_CUSTOM_RADIO_TRACK_LIST = (radioStation) => 
{
	return mp.game.invoke("0x1654F24A88A8E3FE", radioStation);
}

g_Natives._MAX_RADIO_STATION_INDEX = () => 
{
	return mp.game.invoke("0xF1620ECB50E01DE7");
}


// Arg:station is [int]	
g_Natives.FIND_RADIO_STATION_INDEX = (station) => 
{
	return mp.game.invoke("0x8D67489793FF428B", station);
}


// Arg:radioStation is [char*]	Arg:p1 is [BOOL]	
g_Natives._SET_RADIO_STATION_MUSIC_ONLY = (radioStation, p1) => 
{
	return mp.game.invoke("0x774BD811F656A122", radioStation, p1);
}


// Arg:p0 is [float]	
g_Natives["0x2C96CDB04FCA358E"] = (p0) => 
{
	return mp.game.invoke("0x2C96CDB04FCA358E", p0);
}


// Arg:radioStation is [char*]	Arg:p1 is [char*]	
g_Natives["0x031ACB6ABA18C729"] = (radioStation, p1) => 
{
	return mp.game.invoke("0x031ACB6ABA18C729", radioStation, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xF3365489E0DD50F9"] = (p0, p1) => 
{
	return mp.game.invoke("0xF3365489E0DD50F9", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_AMBIENT_ZONE_STATE = (p0, p1, p2) => 
{
	return mp.game.invoke("0xBDA07E5950085E46", p0, p1, p2);
}


// Arg:zoneName is [char*]	Arg:p1 is [BOOL]	
g_Natives.CLEAR_AMBIENT_ZONE_STATE = (zoneName, p1) => 
{
	return mp.game.invoke("0x218DD44AAAC964FF", zoneName, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_AMBIENT_ZONE_LIST_STATE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x9748FA4DE50CCE3E", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	
g_Natives.CLEAR_AMBIENT_ZONE_LIST_STATE = (p0, p1) => 
{
	return mp.game.invoke("0x120C48C614909FA4", p0, p1);
}


// Arg:ambientZone is [char*]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_AMBIENT_ZONE_STATE_PERSISTENT = (ambientZone, p1, p2) => 
{
	return mp.game.invoke("0x1D6650420CEC9D3B", ambientZone, p1, p2);
}


// Arg:ambientZone is [char*]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_AMBIENT_ZONE_LIST_STATE_PERSISTENT = (ambientZone, p1, p2) => 
{
	return mp.game.invoke("0xF3638DAE8C4045E1", ambientZone, p1, p2);
}


// Arg:ambientZone is [char*]	
g_Natives.IS_AMBIENT_ZONE_ENABLED = (ambientZone) => 
{
	return mp.game.invoke("0x01E2817A479A7F9B", ambientZone);
}


// Arg:p0 is [char*]	
g_Natives.SET_CUTSCENE_AUDIO_OVERRIDE = (p0) => 
{
	return mp.game.invoke("0x3B4BF5F0859204D9", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [float]	
g_Natives.GET_PLAYER_HEADSET_SOUND_ALTERNATE = (p0, p1) => 
{
	return mp.game.invoke("0xBCC29F935ED07688", p0, p1);
}


// Arg:name is [char*]	Arg:p1 is [float]	
g_Natives.PLAY_POLICE_REPORT = (name, p1) => 
{
	return mp.game.invoke("0xDFEBD56D9BD1EB16", name, p1);
}

g_Natives._DISABLE_POLICE_REPORTS = () => 
{
	return mp.game.invoke("0xB4F90FAF7670B16F");
}


// Arg:vehicle is [Vehicle]	
g_Natives.BLIP_SIREN = (vehicle) => 
{
	return mp.game.invoke("0x1B9025BDA76822B6", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:mute is [BOOL]	Arg:p2 is [int]	
g_Natives.OVERRIDE_VEH_HORN = (vehicle, mute, p2) => 
{
	return mp.game.invoke("0x3CDC1E622CCE0356", vehicle, mute, p2);
}


// Arg:vehicle is [Vehicle]	
g_Natives.IS_HORN_ACTIVE = (vehicle) => 
{
	return mp.game.invoke("0x9D6BFC12B05C6121", vehicle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_AGGRESSIVE_HORNS = (toggle) => 
{
	return mp.game.invoke("0x395BF71085D1B1D9", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x02E93C796ABD3A97"] = (p0) => 
{
	return mp.game.invoke("0x02E93C796ABD3A97", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives["0x58BB377BEC7CD5F4"] = (p0, p1) => 
{
	return mp.game.invoke("0x58BB377BEC7CD5F4", p0, p1);
}

g_Natives.IS_STREAM_PLAYING = () => 
{
	return mp.game.invoke("0xD11FA52EB849D978");
}

g_Natives.GET_STREAM_PLAY_TIME = () => 
{
	return mp.game.invoke("0x4E72BBDBCA58A3DB");
}


// Arg:streamName is [char*]	Arg:soundSet is [char*]	
g_Natives.LOAD_STREAM = (streamName, soundSet) => 
{
	return mp.game.invoke("0x1F1F957154EC51DF", streamName, soundSet);
}


// Arg:streamName is [char*]	Arg:startOffset is [int]	Arg:soundSet is [char*]	
g_Natives.LOAD_STREAM_WITH_START_OFFSET = (streamName, startOffset, soundSet) => 
{
	return mp.game.invoke("0x59C16B79F53B3712", streamName, startOffset, soundSet);
}


// Arg:ped is [Ped]	
g_Natives.PLAY_STREAM_FROM_PED = (ped) => 
{
	return mp.game.invoke("0x89049DD63C08B5D1", ped);
}


// Arg:vehicle is [Vehicle]	
g_Natives.PLAY_STREAM_FROM_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xB70374A758007DFA", vehicle);
}


// Arg:object is [Object]	
g_Natives.PLAY_STREAM_FROM_OBJECT = (object) => 
{
	return mp.game.invoke("0xEBAA9B64D76356FD", object);
}

g_Natives.PLAY_STREAM_FRONTEND = () => 
{
	return mp.game.invoke("0x58FCE43488F9F5F4");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SPECIAL_FRONTEND_EQUAL = (x, y, z) => 
{
	return mp.game.invoke("0x21442F412E8DE56B", x, y, z);
}

g_Natives.STOP_STREAM = () => 
{
	return mp.game.invoke("0xA4718A1419D18151");
}


// Arg:ped is [Ped]	Arg:speaking is [BOOL]	
g_Natives.STOP_PED_SPEAKING = (ped, speaking) => 
{
	return mp.game.invoke("0x9D64D7405520E3D3", ped, speaking);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_PED_PAIN_AUDIO = (ped, toggle) => 
{
	return mp.game.invoke("0xA9A41C1E940FB0E8", ped, toggle);
}


// Arg:ped is [Ped]	
g_Natives.IS_AMBIENT_SPEECH_DISABLED = (ped) => 
{
	return mp.game.invoke("0x932C2D096A2C3FFF", ped);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_SIREN_WITH_NO_DRIVER = (vehicle, toggle) => 
{
	return mp.game.invoke("0x1FEF0683B96EBCF2", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._SOUND_VEHICLE_HORN_THIS_FRAME = (vehicle) => 
{
	return mp.game.invoke("0x9C11908013EA4715", vehicle);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_HORN_ENABLED = (vehicle, toggle) => 
{
	return mp.game.invoke("0x76D683C108594D0E", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives.SET_AUDIO_VEHICLE_PRIORITY = (vehicle, p1) => 
{
	return mp.game.invoke("0xE5564483E407F914", vehicle, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x9D3AF56E94C9AE98"] = (p0, p1) => 
{
	return mp.game.invoke("0x9D3AF56E94C9AE98", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.USE_SIREN_AS_HORN = (vehicle, toggle) => 
{
	return mp.game.invoke("0xFA932DE350266EF8", vehicle, toggle);
}


// Arg:vehicle is [Vehicle]	Arg:audioName is [char*]	
g_Natives._FORCE_VEHICLE_ENGINE_AUDIO = (vehicle, audioName) => 
{
	return mp.game.invoke("0x4F0C413926060B38", vehicle, audioName);
}


// Arg:p0 is [Any]	Arg:p1 is [char*]	Arg:p2 is [char*]	
g_Natives["0xF1F8157B8C3F171C"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xF1F8157B8C3F171C", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0xD2DCCD8E16E20997"] = (p0) => 
{
	return mp.game.invoke("0xD2DCCD8E16E20997", p0);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x5DB8010EE71FDEF2"] = (vehicle) => 
{
	return mp.game.invoke("0x5DB8010EE71FDEF2", vehicle);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x59E7B488451F4D3A"] = (p0, p1) => 
{
	return mp.game.invoke("0x59E7B488451F4D3A", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x01BB4D577D38BD9E"] = (p0, p1) => 
{
	return mp.game.invoke("0x01BB4D577D38BD9E", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x1C073274E065C6D2"] = (p0, p1) => 
{
	return mp.game.invoke("0x1C073274E065C6D2", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x2BE4BC731D039D5A"] = (p0, p1) => 
{
	return mp.game.invoke("0x2BE4BC731D039D5A", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives.SET_VEHICLE_BOOST_ACTIVE = (vehicle, toggle) => 
{
	return mp.game.invoke("0x4A04DE7CAB2739A1", vehicle, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x6FDDAD856E36988A"] = (p0, p1) => 
{
	return mp.game.invoke("0x6FDDAD856E36988A", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x06C0023BED16DD6B"] = (p0, p1) => 
{
	return mp.game.invoke("0x06C0023BED16DD6B", p0, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	
g_Natives.PLAY_VEHICLE_DOOR_OPEN_SOUND = (vehicle, p1) => 
{
	return mp.game.invoke("0x3A539D52857EA82D", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [int]	
g_Natives.PLAY_VEHICLE_DOOR_CLOSE_SOUND = (vehicle, p1) => 
{
	return mp.game.invoke("0x62A456AA4769EF34", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:toggle is [BOOL]	
g_Natives._ENABLE_STALL_WARNING_SOUNDS = (vehicle, toggle) => 
{
	return mp.game.invoke("0xC15907D667F7CFB2", vehicle, toggle);
}

g_Natives.IS_GAME_IN_CONTROL_OF_MUSIC = () => 
{
	return mp.game.invoke("0x6D28DC1671E334FD");
}


// Arg:active is [BOOL]	
g_Natives.SET_GPS_ACTIVE = (active) => 
{
	return mp.game.invoke("0x3BD3F52BA9B1E4E8", active);
}


// Arg:audioName is [char*]	
g_Natives.PLAY_MISSION_COMPLETE_AUDIO = (audioName) => 
{
	return mp.game.invoke("0xB138AAB8A70D3C69", audioName);
}

g_Natives.IS_MISSION_COMPLETE_PLAYING = () => 
{
	return mp.game.invoke("0x19A30C23F5827F8A");
}

g_Natives["0x6F259F82D873B8B8"] = () => 
{
	return mp.game.invoke("0x6F259F82D873B8B8");
}


// Arg:p0 is [BOOL]	
g_Natives["0xF154B8D1775B2DEC"] = (p0) => 
{
	return mp.game.invoke("0xF154B8D1775B2DEC", p0);
}


// Arg:scene is [char*]	
g_Natives.START_AUDIO_SCENE = (scene) => 
{
	return mp.game.invoke("0x013A80FC08F6E4F2", scene);
}


// Arg:scene is [char*]	
g_Natives.STOP_AUDIO_SCENE = (scene) => 
{
	return mp.game.invoke("0xDFE8422B3B94E688", scene);
}

g_Natives.STOP_AUDIO_SCENES = () => 
{
	return mp.game.invoke("0xBAC7FC81A75EC1A1");
}


// Arg:scene is [char*]	
g_Natives.IS_AUDIO_SCENE_ACTIVE = (scene) => 
{
	return mp.game.invoke("0xB65B60556E2A9225", scene);
}


// Arg:scene is [char*]	Arg:variable is [char*]	Arg:value is [float]	
g_Natives.SET_AUDIO_SCENE_VARIABLE = (scene, variable, value) => 
{
	return mp.game.invoke("0xEF21A9EF089A2668", scene, variable, value);
}


// Arg:p0 is [Any]	
g_Natives["0xA5F377B175A699C5"] = (p0) => 
{
	return mp.game.invoke("0xA5F377B175A699C5", p0);
}


// Arg:p0 is [Entity]	Arg:p1 is [char*]	Arg:p2 is [float]	
g_Natives._DYNAMIC_MIXER_RELATED_FN = (p0, p1, p2) => 
{
	return mp.game.invoke("0x153973AB99FE8980", p0, p1, p2);
}


// Arg:p is [Ped]	Arg:p1 is [float]	
g_Natives["0x18EB48CFC41F2EA0"] = (p, p1) => 
{
	return mp.game.invoke("0x18EB48CFC41F2EA0", p, p1);
}

g_Natives.AUDIO_IS_SCRIPTED_MUSIC_PLAYING = () => 
{
	return mp.game.invoke("0x845FFC3A4FEEFA3E");
}


// Arg:eventName is [char*]	
g_Natives.PREPARE_MUSIC_EVENT = (eventName) => 
{
	return mp.game.invoke("0x1E5185B72EF5158A", eventName);
}


// Arg:eventName is [char*]	
g_Natives.CANCEL_MUSIC_EVENT = (eventName) => 
{
	return mp.game.invoke("0x5B17A90291133DA5", eventName);
}


// Arg:eventName is [char*]	
g_Natives.TRIGGER_MUSIC_EVENT = (eventName) => 
{
	return mp.game.invoke("0x706D57B0F50DA710", eventName);
}

g_Natives["0xA097AB275061FB21"] = () => 
{
	return mp.game.invoke("0xA097AB275061FB21");
}

g_Natives.GET_MUSIC_PLAYTIME = () => 
{
	return mp.game.invoke("0xE7A0D23DC414507B");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xFBE20329593DEC9D"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xFBE20329593DEC9D", p0, p1, p2, p3);
}

g_Natives.CLEAR_ALL_BROKEN_GLASS = () => 
{
	return mp.game.invoke("0xB32209EFFDC04913");
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	
g_Natives["0x70B8EC8FC108A634"] = (p0, p1) => 
{
	return mp.game.invoke("0x70B8EC8FC108A634", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives["0x149AEE66F0CB3A99"] = (p0, p1) => 
{
	return mp.game.invoke("0x149AEE66F0CB3A99", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives["0x8BF907833BE275DE"] = (p0, p1) => 
{
	return mp.game.invoke("0x8BF907833BE275DE", p0, p1);
}

g_Natives["0x062D5EAD4DA2FA6A"] = () => 
{
	return mp.game.invoke("0x062D5EAD4DA2FA6A");
}


// Arg:alarmName is [char*]	
g_Natives.PREPARE_ALARM = (alarmName) => 
{
	return mp.game.invoke("0x9D74AE343DB65533", alarmName);
}


// Arg:alarmName is [char*]	Arg:p2 is [BOOL]	
g_Natives.START_ALARM = (alarmName, p2) => 
{
	return mp.game.invoke("0x0355EF116C4C97B2", alarmName, p2);
}


// Arg:alarmName is [char*]	Arg:toggle is [BOOL]	
g_Natives.STOP_ALARM = (alarmName, toggle) => 
{
	return mp.game.invoke("0xA1CADDCD98415A41", alarmName, toggle);
}


// Arg:stop is [BOOL]	
g_Natives.STOP_ALL_ALARMS = (stop) => 
{
	return mp.game.invoke("0x2F794A877ADD4C92", stop);
}


// Arg:alarmName is [char*]	
g_Natives.IS_ALARM_PLAYING = (alarmName) => 
{
	return mp.game.invoke("0x226435CB96CCFC8C", alarmName);
}


// Arg:vehicle is [Vehicle]	
g_Natives.GET_VEHICLE_DEFAULT_HORN = (vehicle) => 
{
	return mp.game.invoke("0x02165D55000219AC", vehicle);
}


// Arg:vehicle is [Vehicle]	
g_Natives._GET_VEHICLE_HORN_HASH = (vehicle) => 
{
	return mp.game.invoke("0xACB5DCCA1EC76840", vehicle);
}


// Arg:ped is [Ped]	
g_Natives.RESET_PED_AUDIO_FLAGS = (ped) => 
{
	return mp.game.invoke("0xF54BB7B61036F335", ped);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xD2CC78CD3D0B50F9"] = (p0, p1) => 
{
	return mp.game.invoke("0xD2CC78CD3D0B50F9", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	
g_Natives["0xBF4DC1784BE94DFA"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xBF4DC1784BE94DFA", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x75773E11BA459E90"] = (p0, p1) => 
{
	return mp.game.invoke("0x75773E11BA459E90", p0, p1);
}

g_Natives["0xD57AAAE0E2214D11"] = () => 
{
	return mp.game.invoke("0xD57AAAE0E2214D11");
}


// Arg:value is [BOOL]	
g_Natives._FORCE_AMBIENT_SIREN = (value) => 
{
	return mp.game.invoke("0x552369F549563AD5", value);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [BOOL]	
g_Natives["0x43FA0DFC5DF87815"] = (vehicle, p1) => 
{
	return mp.game.invoke("0x43FA0DFC5DF87815", vehicle, p1);
}


// Arg:flagName is [char*]	Arg:toggle is [BOOL]	
g_Natives.SET_AUDIO_FLAG = (flagName, toggle) => 
{
	return mp.game.invoke("0xB9EFD5C25018725A", flagName, toggle);
}


// Arg:audioName is [char*]	Arg:unk is [BOOL]	
g_Natives.PREPARE_SYNCHRONIZED_AUDIO_EVENT = (audioName, unk) => 
{
	return mp.game.invoke("0xC7ABCACA4985A766", audioName, unk);
}


// Arg:SceneID is [int]	Arg:audioName is [char*]	
g_Natives.PREPARE_SYNCHRONIZED_AUDIO_EVENT_FOR_SCENE = (SceneID, audioName) => 
{
	return mp.game.invoke("0x029FE7CD1B7E2E75", SceneID, audioName);
}


// Arg:SceneID is [int]	
g_Natives.PLAY_SYNCHRONIZED_AUDIO_EVENT = (SceneID) => 
{
	return mp.game.invoke("0x8B2FD4560E55DD2D", SceneID);
}


// Arg:SceneID is [int]	
g_Natives.STOP_SYNCHRONIZED_AUDIO_EVENT = (SceneID) => 
{
	return mp.game.invoke("0x92D6A88E64A94430", SceneID);
}


// Arg:p0 is [Any*]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0xC8EDE9BDBCCBA6D4"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC8EDE9BDBCCBA6D4", p0, p1, p2, p3);
}


// Arg:p0 is [char*]	Arg:p1 is [Entity]	
g_Natives._SET_SYNCHRONIZED_AUDIO_EVENT_POSITION_THIS_FRAME = (p0, p1) => 
{
	return mp.game.invoke("0x950A154B8DAB6185", p0, p1);
}


// Arg:p0 is [int]	
g_Natives["0x12561FCBB62D5B9C"] = (p0) => 
{
	return mp.game.invoke("0x12561FCBB62D5B9C", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	
g_Natives["0x044DBAD7A7FA2BE5"] = (p0, p1) => 
{
	return mp.game.invoke("0x044DBAD7A7FA2BE5", p0, p1);
}


// Arg:p0 is [char*]	
g_Natives["0xB4BBFD9CD8B3922B"] = (p0) => 
{
	return mp.game.invoke("0xB4BBFD9CD8B3922B", p0);
}

g_Natives["0xE4E6DD5566D28C82"] = () => 
{
	return mp.game.invoke("0xE4E6DD5566D28C82");
}

g_Natives["0x3A48AB4445D499BE"] = () => 
{
	return mp.game.invoke("0x3A48AB4445D499BE");
}


// Arg:ped is [Ped]	
g_Natives._SET_PED_TALK = (ped) => 
{
	return mp.game.invoke("0x4ADA3F19BE4A6047", ped);
}

g_Natives["0x0150B6FF25A9E2E5"] = () => 
{
	return mp.game.invoke("0x0150B6FF25A9E2E5");
}


// Arg:p0 is [BOOL]	
g_Natives["0xBEF34B1D9624D5DD"] = (p0) => 
{
	return mp.game.invoke("0xBEF34B1D9624D5DD", p0);
}

g_Natives["0x806058BBDC136E06"] = () => 
{
	return mp.game.invoke("0x806058BBDC136E06");
}

g_Natives["0x544810ED9DB6BBE6"] = () => 
{
	return mp.game.invoke("0x544810ED9DB6BBE6");
}

g_Natives["0x5B50ABB1FE3746F4"] = () => 
{
	return mp.game.invoke("0x5B50ABB1FE3746F4");
}


// Arg:cutsceneName is [char*]	Arg:id is [int]	
g_Natives.REQUEST_CUTSCENE = (cutsceneName, id) => 
{
	return mp.game.invoke("0x7A86743F475D9E09", cutsceneName, id);
}


// Arg:cutsceneName is [char*]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives._REQUEST_CUTSCENE_EX = (cutsceneName, p1, p2) => 
{
	return mp.game.invoke("0xC23DE0E91C30B58C", cutsceneName, p1, p2);
}

g_Natives.REMOVE_CUTSCENE = () => 
{
	return mp.game.invoke("0x440AF51A3462B86F");
}

g_Natives.HAS_CUTSCENE_LOADED = () => 
{
	return mp.game.invoke("0xC59F528E9AB9F339");
}


// Arg:cutsceneName is [char*]	
g_Natives.HAS_THIS_CUTSCENE_LOADED = (cutsceneName) => 
{
	return mp.game.invoke("0x228D3D94F8A11C3C", cutsceneName);
}


// Arg:p0 is [int]	
g_Natives["0x8D9DF6ECA8768583"] = (p0) => 
{
	return mp.game.invoke("0x8D9DF6ECA8768583", p0);
}

g_Natives["0xB56BBBCC2955D9CB"] = () => 
{
	return mp.game.invoke("0xB56BBBCC2955D9CB");
}


// Arg:p0 is [int]	
g_Natives["0x71B74D2AE19338D0"] = (p0) => 
{
	return mp.game.invoke("0x71B74D2AE19338D0", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x4C61C75BEE8184C2"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x4C61C75BEE8184C2", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives["0x06A3524161C502BA"] = (p0) => 
{
	return mp.game.invoke("0x06A3524161C502BA", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xA1C996C2A744262E"] = (p0) => 
{
	return mp.game.invoke("0xA1C996C2A744262E", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xD00D76A7DFC9D852"] = (p0) => 
{
	return mp.game.invoke("0xD00D76A7DFC9D852", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x0ABC54DE641DC0FC"] = (p0) => 
{
	return mp.game.invoke("0x0ABC54DE641DC0FC", p0);
}


// Arg:id is [int]	
g_Natives.START_CUTSCENE = (id) => 
{
	return mp.game.invoke("0x186D5CB5E7B0FF7B", id);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [int]	
g_Natives.START_CUTSCENE_AT_COORDS = (x, y, z, p3) => 
{
	return mp.game.invoke("0x1C9ADDA3244A1FBF", x, y, z, p3);
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_CUTSCENE = (p0) => 
{
	return mp.game.invoke("0xC7272775B4DC786E", p0);
}

g_Natives.STOP_CUTSCENE_IMMEDIATELY = () => 
{
	return mp.game.invoke("0xD220BDD222AC4A1E");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [float]	Arg:p4 is [int]	
g_Natives.SET_CUTSCENE_ORIGIN = (x, y, z, p3, p4) => 
{
	return mp.game.invoke("0xB812B3FD1C01CF27", x, y, z, p3, p4);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p6 is [int]	
g_Natives["0x011883F41211432A"] = (x1, y1, z1, x2, y2, z2, p6) => 
{
	return mp.game.invoke("0x011883F41211432A", x1, y1, z1, x2, y2, z2, p6);
}

g_Natives.GET_CUTSCENE_TIME = () => 
{
	return mp.game.invoke("0xE625BEABBAFFDAB9");
}

g_Natives.GET_CUTSCENE_TOTAL_DURATION = () => 
{
	return mp.game.invoke("0xEE53B14A19E480D4");
}

g_Natives.WAS_CUTSCENE_SKIPPED = () => 
{
	return mp.game.invoke("0x40C8656EDAEDD569");
}

g_Natives.HAS_CUTSCENE_FINISHED = () => 
{
	return mp.game.invoke("0x7C0A893088881D57");
}

g_Natives.IS_CUTSCENE_ACTIVE = () => 
{
	return mp.game.invoke("0x991251AFC3981F84");
}

g_Natives.IS_CUTSCENE_PLAYING = () => 
{
	return mp.game.invoke("0xD3C2E180A40F031E");
}

g_Natives.GET_CUTSCENE_SECTION_PLAYING = () => 
{
	return mp.game.invoke("0x49010A6A396553D8");
}


// Arg:cutsceneEntName is [char*]	Arg:modelHash is [Hash]	
g_Natives.GET_ENTITY_INDEX_OF_CUTSCENE_ENTITY = (cutsceneEntName, modelHash) => 
{
	return mp.game.invoke("0x0A2E9FDB9A8C62F6", cutsceneEntName, modelHash);
}

g_Natives["0x583DF8E3D4AFBD98"] = () => 
{
	return mp.game.invoke("0x583DF8E3D4AFBD98");
}


// Arg:cutsceneName is [char*]	
g_Natives["0x4CEBC1ED31E8925E"] = (cutsceneName) => 
{
	return mp.game.invoke("0x4CEBC1ED31E8925E", cutsceneName);
}


// Arg:cutscenePed is [Ped]	Arg:cutsceneEntName is [char*]	Arg:p2 is [int]	Arg:modelHash is [Hash]	Arg:p4 is [int]	
g_Natives.REGISTER_ENTITY_FOR_CUTSCENE = (cutscenePed, cutsceneEntName, p2, modelHash, p4) => 
{
	return mp.game.invoke("0xE40C1C56DF95C2E8", cutscenePed, cutsceneEntName, p2, modelHash, p4);
}


// Arg:cutsceneEntName is [char*]	Arg:modelHash is [Hash]	
g_Natives.GET_ENTITY_INDEX_OF_REGISTERED_ENTITY = (cutsceneEntName, modelHash) => 
{
	return mp.game.invoke("0xC0741A26499654CD", cutsceneEntName, modelHash);
}


// Arg:modelHash is [Hash]	
g_Natives["0x7F96F23FA9B73327"] = (modelHash) => 
{
	return mp.game.invoke("0x7F96F23FA9B73327", modelHash);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.SET_CUTSCENE_TRIGGER_AREA = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x9896CE4721BE84BA", p0, p1, p2, p3, p4, p5);
}


// Arg:cutsceneEntName is [char*]	Arg:modelHash is [Hash]	
g_Natives.CAN_SET_ENTER_STATE_FOR_REGISTERED_ENTITY = (cutsceneEntName, modelHash) => 
{
	return mp.game.invoke("0x645D0B458D8E17B5", cutsceneEntName, modelHash);
}


// Arg:cutsceneEntName is [char*]	Arg:modelHash is [Hash]	
g_Natives.CAN_SET_EXIT_STATE_FOR_REGISTERED_ENTITY = (cutsceneEntName, modelHash) => 
{
	return mp.game.invoke("0x4C6A6451C79E4662", cutsceneEntName, modelHash);
}


// Arg:p0 is [BOOL]	
g_Natives.CAN_SET_EXIT_STATE_FOR_CAMERA = (p0) => 
{
	return mp.game.invoke("0xB2CBCD0930DFB420", p0);
}


// Arg:toggle is [BOOL]	
g_Natives["0xC61B86C9F61EB404"] = (toggle) => 
{
	return mp.game.invoke("0xC61B86C9F61EB404", toggle);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.SET_CUTSCENE_FADE_VALUES = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x8093F23ABACCC7D4", p0, p1, p2, p3);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives["0x20746F7B1032A3C7"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x20746F7B1032A3C7", p0, p1, p2, p3);
}


// Arg:p0 is [BOOL]	
g_Natives["0x06EE9048FD080382"] = (p0) => 
{
	return mp.game.invoke("0x06EE9048FD080382", p0);
}

g_Natives["0xA0FE76168A189DDB"] = () => 
{
	return mp.game.invoke("0xA0FE76168A189DDB");
}


// Arg:p0 is [BOOL]	
g_Natives["0x2F137B508DE238F2"] = (p0) => 
{
	return mp.game.invoke("0x2F137B508DE238F2", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xE36A98D8AB3D3C66"] = (p0) => 
{
	return mp.game.invoke("0xE36A98D8AB3D3C66", p0);
}

g_Natives["0x5EDEF0CF8C1DAB3C"] = () => 
{
	return mp.game.invoke("0x5EDEF0CF8C1DAB3C");
}


// Arg:p0 is [BOOL]	
g_Natives["0x41FAA8FB2ECE8720"] = (p0) => 
{
	return mp.game.invoke("0x41FAA8FB2ECE8720", p0);
}

g_Natives.REGISTER_SYNCHRONISED_SCRIPT_SPEECH = () => 
{
	return mp.game.invoke("0x2131046957F31B04");
}


// Arg:cutsceneEntName is [char*]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:modelHash is [Hash]	
g_Natives.SET_CUTSCENE_PED_COMPONENT_VARIATION = (cutsceneEntName, p1, p2, p3, modelHash) => 
{
	return mp.game.invoke("0xBA01E7B6DEEFBBC9", cutsceneEntName, p1, p2, p3, modelHash);
}


// Arg:cutsceneEntName is [char*]	Arg:ped is [Ped]	Arg:modelHash is [Hash]	
g_Natives["0x2A56C06EBEF2B0D9"] = (cutsceneEntName, ped, modelHash) => 
{
	return mp.game.invoke("0x2A56C06EBEF2B0D9", cutsceneEntName, ped, modelHash);
}


// Arg:cutsceneEntName is [char*]	Arg:modelHash is [Hash]	
g_Natives.DOES_CUTSCENE_ENTITY_EXIST = (cutsceneEntName, modelHash) => 
{
	return mp.game.invoke("0x499EF20C5DB25C59", cutsceneEntName, modelHash);
}


// Arg:cutsceneEntName is [char*]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:modelHash is [Hash]	
g_Natives.SET_CUTSCENE_PED_PROP_VARIATION = (cutsceneEntName, p1, p2, p3, modelHash) => 
{
	return mp.game.invoke("0x0546524ADE2E9723", cutsceneEntName, p1, p2, p3, modelHash);
}

g_Natives.HAS_CUTSCENE_CUT_THIS_FRAME = () => 
{
	return mp.game.invoke("0x708BDD8CD795B043");
}


// Arg:interiorID is [int]	
g_Natives.GET_INTERIOR_GROUP_ID = (interiorID) => 
{
	return mp.game.invoke("0xE4A84ABF135EF91A", interiorID);
}


// Arg:interiorID is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_OFFSET_FROM_INTERIOR_IN_WORLD_COORDS = (interiorID, x, y, z) => 
{
	return mp.game.invoke("0x9E3B3E6D66F6E22F", interiorID, x, y, z);
}

g_Natives.IS_INTERIOR_SCENE = () => 
{
	return mp.game.invoke("0xBC72B5D7A1CBD54D");
}


// Arg:interiorID is [int]	
g_Natives.IS_VALID_INTERIOR = (interiorID) => 
{
	return mp.game.invoke("0x26B0E73D7EAAF4D3", interiorID);
}


// Arg:entity is [Entity]	
g_Natives.CLEAR_ROOM_FOR_ENTITY = (entity) => 
{
	return mp.game.invoke("0xB365FC0C4E27FFA7", entity);
}


// Arg:entity is [Entity]	Arg:interiorID is [int]	Arg:roomHashKey is [Hash]	
g_Natives.FORCE_ROOM_FOR_ENTITY = (entity, interiorID, roomHashKey) => 
{
	return mp.game.invoke("0x52923C4710DD9907", entity, interiorID, roomHashKey);
}


// Arg:entity is [Entity]	
g_Natives.GET_ROOM_KEY_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0x47C2A06D4F5F424B", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_KEY_FOR_ENTITY_IN_ROOM = (entity) => 
{
	return mp.game.invoke("0x399685DB942336BC", entity);
}


// Arg:entity is [Entity]	
g_Natives.GET_INTERIOR_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0x2107BA504071A6BB", entity);
}


// Arg:entity is [Entity]	Arg:interiorID is [int]	
g_Natives["0x82EBB79E258FA2B7"] = (entity, interiorID) => 
{
	return mp.game.invoke("0x82EBB79E258FA2B7", entity, interiorID);
}


// Arg:interiorID is [int]	Arg:roomHashKey is [Hash]	
g_Natives["0x920D853F3E17F1DA"] = (interiorID, roomHashKey) => 
{
	return mp.game.invoke("0x920D853F3E17F1DA", interiorID, roomHashKey);
}


// Arg:roomName is [char*]	
g_Natives["0xAF348AFCB575A441"] = (roomName) => 
{
	return mp.game.invoke("0xAF348AFCB575A441", roomName);
}


// Arg:roomHashKey is [Hash]	
g_Natives["0x405DC2AEF6AF95B9"] = (roomHashKey) => 
{
	return mp.game.invoke("0x405DC2AEF6AF95B9", roomHashKey);
}

g_Natives._GET_ROOM_KEY_FROM_GAMEPLAY_CAM = () => 
{
	return mp.game.invoke("0xA6575914D2A0B450");
}

g_Natives["0x23B59D8912F94246"] = () => 
{
	return mp.game.invoke("0x23B59D8912F94246");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_INTERIOR_AT_COORDS = (x, y, z) => 
{
	return mp.game.invoke("0xB0F7F8663821D9C3", x, y, z);
}


// Arg:pickup is [Pickup]	Arg:roomName is [char*]	
g_Natives.ADD_PICKUP_TO_INTERIOR_ROOM_BY_NAME = (pickup, roomName) => 
{
	return mp.game.invoke("0x3F6167F351168730", pickup, roomName);
}


// Arg:interiorID is [int]	
g_Natives._LOAD_INTERIOR = (interiorID) => 
{
	return mp.game.invoke("0x2CA429C029CCF247", interiorID);
}


// Arg:interiorID is [int]	
g_Natives.UNPIN_INTERIOR = (interiorID) => 
{
	return mp.game.invoke("0x261CCE7EED010641", interiorID);
}


// Arg:interiorID is [int]	
g_Natives.IS_INTERIOR_READY = (interiorID) => 
{
	return mp.game.invoke("0x6726BDCCC1932F0E", interiorID);
}


// Arg:interiorID is [int]	
g_Natives["0x4C2330E61D3DEB56"] = (interiorID) => 
{
	return mp.game.invoke("0x4C2330E61D3DEB56", interiorID);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:interiorType is [char*]	
g_Natives.GET_INTERIOR_AT_COORDS_WITH_TYPE = (x, y, z, interiorType) => 
{
	return mp.game.invoke("0x05B7A89BD78797FC", x, y, z, interiorType);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:unk is [int]	
g_Natives._UNK_GET_INTERIOR_AT_COORDS = (x, y, z, unk) => 
{
	return mp.game.invoke("0xF0F77ADB9F67E79D", x, y, z, unk);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives._ARE_COORDS_COLLIDING_WITH_EXTERIOR = (x, y, z) => 
{
	return mp.game.invoke("0xEEA5AC2EDA7C33E8", x, y, z);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_INTERIOR_FROM_COLLISION = (x, y, z) => 
{
	return mp.game.invoke("0xEC4CF9FCB29A4424", x, y, z);
}


// Arg:interiorID is [int]	Arg:propName is [char*]	
g_Natives._ENABLE_INTERIOR_PROP = (interiorID, propName) => 
{
	return mp.game.invoke("0x55E86AF2712B36A1", interiorID, propName);
}


// Arg:interiorID is [int]	Arg:propName is [char*]	
g_Natives._DISABLE_INTERIOR_PROP = (interiorID, propName) => 
{
	return mp.game.invoke("0x420BD37289EEE162", interiorID, propName);
}


// Arg:interiorID is [int]	Arg:propName is [char*]	
g_Natives._IS_INTERIOR_PROP_ENABLED = (interiorID, propName) => 
{
	return mp.game.invoke("0x35F7DD45E8C0A16D", interiorID, propName);
}


// Arg:interiorID is [int]	
g_Natives.REFRESH_INTERIOR = (interiorID) => 
{
	return mp.game.invoke("0x41F37C3427C75AE0", interiorID);
}


// Arg:mapObjectHash is [Hash]	
g_Natives._HIDE_MAP_OBJECT_THIS_FRAME = (mapObjectHash) => 
{
	return mp.game.invoke("0xA97F257D0151A6AB", mapObjectHash);
}


// Arg:interiorID is [int]	Arg:toggle is [BOOL]	
g_Natives.DISABLE_INTERIOR = (interiorID, toggle) => 
{
	return mp.game.invoke("0x6170941419D7D8EC", interiorID, toggle);
}


// Arg:interiorID is [int]	
g_Natives.IS_INTERIOR_DISABLED = (interiorID) => 
{
	return mp.game.invoke("0xBC5115A5A939DD15", interiorID);
}


// Arg:interiorID is [int]	Arg:toggle is [BOOL]	
g_Natives.CAP_INTERIOR = (interiorID, toggle) => 
{
	return mp.game.invoke("0xD9175F941610DB54", interiorID, toggle);
}


// Arg:interiorID is [int]	
g_Natives.IS_INTERIOR_CAPPED = (interiorID) => 
{
	return mp.game.invoke("0x92BAC8ACF88CEC26", interiorID);
}


// Arg:toggle is [BOOL]	
g_Natives["0x9E6542F0CE8E70A3"] = (toggle) => 
{
	return mp.game.invoke("0x9E6542F0CE8E70A3", toggle);
}


// Arg:render is [BOOL]	Arg:ease is [BOOL]	Arg:easeTime is [int]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.RENDER_SCRIPT_CAMS = (render, ease, easeTime, p3, p4) => 
{
	return mp.game.invoke("0x07E5B515DB0636FC", render, ease, easeTime, p3, p4);
}


// Arg:render is [BOOL]	Arg:p1 is [float]	Arg:p2 is [int]	
g_Natives._RENDER_FIRST_PERSON_CAM = (render, p1, p2) => 
{
	return mp.game.invoke("0xC819F3CBB62BF692", render, p1, p2);
}


// Arg:camName is [char*]	Arg:unk is [BOOL]	
g_Natives.CREATE_CAM = (camName, unk) => 
{
	return mp.game.invoke("0xC3981DCE61D9E13F", camName, unk);
}


// Arg:camName is [char*]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:fov is [float]	Arg:p8 is [BOOL]	Arg:p9 is [int]	
g_Natives.CREATE_CAM_WITH_PARAMS = (camName, posX, posY, posZ, rotX, rotY, rotZ, fov, p8, p9) => 
{
	return mp.game.invoke("0xB51194800B257161", camName, posX, posY, posZ, rotX, rotY, rotZ, fov, p8, p9);
}


// Arg:camHash is [Hash]	Arg:p1 is [BOOL]	
g_Natives.CREATE_CAMERA = (camHash, p1) => 
{
	return mp.game.invoke("0x5E3CF89C6BCCA67D", camHash, p1);
}


// Arg:camHash is [Hash]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:fov is [float]	Arg:p8 is [BOOL]	Arg:p9 is [Any]	
g_Natives.CREATE_CAMERA_WITH_PARAMS = (camHash, posX, posY, posZ, rotX, rotY, rotZ, fov, p8, p9) => 
{
	return mp.game.invoke("0x6ABFA3E16460F22D", camHash, posX, posY, posZ, rotX, rotY, rotZ, fov, p8, p9);
}


// Arg:cam is [Cam]	Arg:thisScriptCheck is [BOOL]	
g_Natives.DESTROY_CAM = (cam, thisScriptCheck) => 
{
	return mp.game.invoke("0x865908C81A2C22E9", cam, thisScriptCheck);
}


// Arg:thisScriptCheck is [BOOL]	
g_Natives.DESTROY_ALL_CAMS = (thisScriptCheck) => 
{
	return mp.game.invoke("0x8E5FB15663F79120", thisScriptCheck);
}


// Arg:cam is [Cam]	
g_Natives.DOES_CAM_EXIST = (cam) => 
{
	return mp.game.invoke("0xA7A932170592B50E", cam);
}


// Arg:cam is [Cam]	Arg:active is [BOOL]	
g_Natives.SET_CAM_ACTIVE = (cam, active) => 
{
	return mp.game.invoke("0x026FB97D0A425F84", cam, active);
}


// Arg:cam is [Cam]	
g_Natives.IS_CAM_ACTIVE = (cam) => 
{
	return mp.game.invoke("0xDFB2B516207D3534", cam);
}


// Arg:cam is [Cam]	
g_Natives.IS_CAM_RENDERING = (cam) => 
{
	return mp.game.invoke("0x02EC0AF5C5A49B7A", cam);
}

g_Natives.GET_RENDERING_CAM = () => 
{
	return mp.game.invoke("0x5234F9F10919EABA");
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_COORD = (cam) => 
{
	return mp.game.invoke("0xBAC038F7459AE5AE", cam);
}


// Arg:cam is [Cam]	Arg:rotationOrder is [int]	
g_Natives.GET_CAM_ROT = (cam, rotationOrder) => 
{
	return mp.game.invoke("0x7D304C1C955E3E12", cam, rotationOrder);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_FOV = (cam) => 
{
	return mp.game.invoke("0xC3330A45CCCDB26A", cam);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_NEAR_CLIP = (cam) => 
{
	return mp.game.invoke("0xC520A34DAFBF24B1", cam);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_FAR_CLIP = (cam) => 
{
	return mp.game.invoke("0xB60A9CFEB21CA6AA", cam);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_FAR_DOF = (cam) => 
{
	return mp.game.invoke("0x255F8DAFD540D397", cam);
}


// Arg:cam is [Cam]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:fieldOfView is [float]	Arg:p8 is [Any]	Arg:p9 is [int]	Arg:p10 is [int]	Arg:p11 is [int]	
g_Natives.SET_CAM_PARAMS = (cam, posX, posY, posZ, rotX, rotY, rotZ, fieldOfView, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0xBFD8727AEA3CCEBA", cam, posX, posY, posZ, rotX, rotY, rotZ, fieldOfView, p8, p9, p10, p11);
}


// Arg:cam is [Cam]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.SET_CAM_COORD = (cam, posX, posY, posZ) => 
{
	return mp.game.invoke("0x4D41783FB745E42E", cam, posX, posY, posZ);
}


// Arg:cam is [Cam]	Arg:pitch is [float]	Arg:roll is [float]	Arg:yaw is [float]	Arg:rotationOrder is [int]	
g_Natives.SET_CAM_ROT = (cam, pitch, roll, yaw, rotationOrder) => 
{
	return mp.game.invoke("0x85973643155D0B07", cam, pitch, roll, yaw, rotationOrder);
}


// Arg:cam is [Cam]	Arg:fieldOfView is [float]	
g_Natives.SET_CAM_FOV = (cam, fieldOfView) => 
{
	return mp.game.invoke("0xB13C14F66A00D047", cam, fieldOfView);
}


// Arg:cam is [Cam]	Arg:nearClip is [float]	
g_Natives.SET_CAM_NEAR_CLIP = (cam, nearClip) => 
{
	return mp.game.invoke("0xC7848EFCCC545182", cam, nearClip);
}


// Arg:cam is [Cam]	Arg:farClip is [float]	
g_Natives.SET_CAM_FAR_CLIP = (cam, farClip) => 
{
	return mp.game.invoke("0xAE306F2A904BF86E", cam, farClip);
}


// Arg:cam is [Cam]	Arg:strength is [float]	
g_Natives.SET_CAM_MOTION_BLUR_STRENGTH = (cam, strength) => 
{
	return mp.game.invoke("0x6F0F77FBA9A8F2E6", cam, strength);
}


// Arg:cam is [Cam]	Arg:nearDOF is [float]	
g_Natives.SET_CAM_NEAR_DOF = (cam, nearDOF) => 
{
	return mp.game.invoke("0x3FA4BF0A7AB7DE2C", cam, nearDOF);
}


// Arg:cam is [Cam]	Arg:farDOF is [float]	
g_Natives.SET_CAM_FAR_DOF = (cam, farDOF) => 
{
	return mp.game.invoke("0xEDD91296CD01AEE0", cam, farDOF);
}


// Arg:cam is [Cam]	Arg:dofStrength is [float]	
g_Natives.SET_CAM_DOF_STRENGTH = (cam, dofStrength) => 
{
	return mp.game.invoke("0x5EE29B4D7D5DF897", cam, dofStrength);
}


// Arg:cam is [Cam]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	
g_Natives.SET_CAM_DOF_PLANES = (cam, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x3CF48F6F96E749DC", cam, p1, p2, p3, p4);
}


// Arg:cam is [Cam]	Arg:toggle is [BOOL]	
g_Natives.SET_CAM_USE_SHALLOW_DOF_MODE = (cam, toggle) => 
{
	return mp.game.invoke("0x16A96863A17552BB", cam, toggle);
}

g_Natives.SET_USE_HI_DOF = () => 
{
	return mp.game.invoke("0xA13B0222F3D94A94");
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xF55E4046F6F831DC"] = (p0, p1) => 
{
	return mp.game.invoke("0xF55E4046F6F831DC", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xE111A7C0D200CBC5"] = (p0, p1) => 
{
	return mp.game.invoke("0xE111A7C0D200CBC5", p0, p1);
}


// Arg:camera is [Cam]	Arg:p1 is [float]	
g_Natives._SET_CAM_DOF_FNUMBER_OF_LENS = (camera, p1) => 
{
	return mp.game.invoke("0x7DD234D6F3914C5B", camera, p1);
}


// Arg:camera is [Cam]	Arg:p1 is [float]	
g_Natives._SET_CAM_DOF_FOCUS_DISTANCE_BIAS = (camera, p1) => 
{
	return mp.game.invoke("0xC669EEA5D031B7DE", camera, p1);
}


// Arg:camera is [Cam]	Arg:p1 is [float]	
g_Natives._SET_CAM_DOF_MAX_NEAR_IN_FOCUS_DISTANCE = (camera, p1) => 
{
	return mp.game.invoke("0xC3654A441402562D", camera, p1);
}


// Arg:camera is [Cam]	Arg:p1 is [float]	
g_Natives._SET_CAM_DOF_MAX_NEAR_IN_FOCUS_DISTANCE_BLEND_LEVEL = (camera, p1) => 
{
	return mp.game.invoke("0x2C654B4943BDDF7C", camera, p1);
}


// Arg:cam is [Cam]	Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:isRelative is [BOOL]	
g_Natives.ATTACH_CAM_TO_ENTITY = (cam, entity, xOffset, yOffset, zOffset, isRelative) => 
{
	return mp.game.invoke("0xFEDB7D269E8C60E3", cam, entity, xOffset, yOffset, zOffset, isRelative);
}


// Arg:cam is [Cam]	Arg:ped is [Ped]	Arg:boneIndex is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [BOOL]	
g_Natives.ATTACH_CAM_TO_PED_BONE = (cam, ped, boneIndex, x, y, z, heading) => 
{
	return mp.game.invoke("0x61A3DBA14AB7F411", cam, ped, boneIndex, x, y, z, heading);
}


// Arg:cam is [Cam]	
g_Natives.DETACH_CAM = (cam) => 
{
	return mp.game.invoke("0xA2FABBE87F4BAD82", cam);
}


// Arg:cam is [Cam]	Arg:p1 is [BOOL]	
g_Natives.SET_CAM_INHERIT_ROLL_VEHICLE = (cam, p1) => 
{
	return mp.game.invoke("0x45F1DE9C34B93AE6", cam, p1);
}


// Arg:cam is [Cam]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.POINT_CAM_AT_COORD = (cam, x, y, z) => 
{
	return mp.game.invoke("0xF75497BB865F0803", cam, x, y, z);
}


// Arg:cam is [Cam]	Arg:entity is [Entity]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [BOOL]	
g_Natives.POINT_CAM_AT_ENTITY = (cam, entity, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x5640BFF86B16E8DC", cam, entity, p2, p3, p4, p5);
}


// Arg:cam is [Cam]	Arg:ped is [int]	Arg:boneIndex is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p6 is [BOOL]	
g_Natives.POINT_CAM_AT_PED_BONE = (cam, ped, boneIndex, x, y, z, p6) => 
{
	return mp.game.invoke("0x68B2B5F33BA63C41", cam, ped, boneIndex, x, y, z, p6);
}


// Arg:cam is [Cam]	
g_Natives.STOP_CAM_POINTING = (cam) => 
{
	return mp.game.invoke("0xF33AB75780BA57DE", cam);
}


// Arg:cam is [Cam]	Arg:toggle is [BOOL]	
g_Natives.SET_CAM_AFFECTS_AIMING = (cam, toggle) => 
{
	return mp.game.invoke("0x8C1DC7770C51DC8D", cam, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x661B5C8654ADD825"] = (p0, p1) => 
{
	return mp.game.invoke("0x661B5C8654ADD825", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xA2767257A320FC82"] = (p0, p1) => 
{
	return mp.game.invoke("0xA2767257A320FC82", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x271017B9BA825366"] = (p0, p1) => 
{
	return mp.game.invoke("0x271017B9BA825366", p0, p1);
}


// Arg:camera is [Cam]	Arg:name is [char*]	
g_Natives.SET_CAM_DEBUG_NAME = (camera, name) => 
{
	return mp.game.invoke("0x1B93E0107865DD40", camera, name);
}


// Arg:camera is [Cam]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:length is [int]	Arg:p8 is [int]	Arg:transitionType is [int]	
g_Natives.ADD_CAM_SPLINE_NODE = (camera, x, y, z, xRot, yRot, zRot, length, p8, transitionType) => 
{
	return mp.game.invoke("0x8609C75EC438FB3B", camera, x, y, z, xRot, yRot, zRot, length, p8, transitionType);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x0A9F2A468B328E74"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x0A9F2A468B328E74", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x0FB82563989CF4FB"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x0FB82563989CF4FB", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x609278246A29CA34"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x609278246A29CA34", p0, p1, p2);
}


// Arg:cam is [Cam]	Arg:p1 is [float]	
g_Natives.SET_CAM_SPLINE_PHASE = (cam, p1) => 
{
	return mp.game.invoke("0x242B5874F0A4E052", cam, p1);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_SPLINE_PHASE = (cam) => 
{
	return mp.game.invoke("0xB5349E36C546509A", cam);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_SPLINE_NODE_PHASE = (cam) => 
{
	return mp.game.invoke("0xD9D0E694C8282C96", cam);
}


// Arg:cam is [int]	Arg:timeDuration is [int]	
g_Natives.SET_CAM_SPLINE_DURATION = (cam, timeDuration) => 
{
	return mp.game.invoke("0x1381539FEE034CDA", cam, timeDuration);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xD1B0F412F109EA5D"] = (p0, p1) => 
{
	return mp.game.invoke("0xD1B0F412F109EA5D", p0, p1);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_SPLINE_NODE_INDEX = (cam) => 
{
	return mp.game.invoke("0xB22B17DF858716A6", cam);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [float]	
g_Natives["0x83B8201ED82A9A2D"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x83B8201ED82A9A2D", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	
g_Natives["0xA6385DEB180F319F"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xA6385DEB180F319F", p0, p1, p2);
}


// Arg:cam is [Cam]	Arg:p1 is [int]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.OVERRIDE_CAM_SPLINE_VELOCITY = (cam, p1, p2, p3) => 
{
	return mp.game.invoke("0x40B62FA033EB0346", cam, p1, p2, p3);
}


// Arg:cam is [Cam]	Arg:p1 is [int]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.OVERRIDE_CAM_SPLINE_MOTION_BLUR = (cam, p1, p2, p3) => 
{
	return mp.game.invoke("0x7DCF7C708D292D55", cam, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x7BF1A54AE67AC070"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7BF1A54AE67AC070", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives.IS_CAM_SPLINE_PAUSED = (p0) => 
{
	return mp.game.invoke("0x0290F35C0AD97864", p0);
}


// Arg:camTo is [Cam]	Arg:camFrom is [Cam]	Arg:duration is [int]	Arg:easeLocation is [int]	Arg:easeRotation is [int]	
g_Natives.SET_CAM_ACTIVE_WITH_INTERP = (camTo, camFrom, duration, easeLocation, easeRotation) => 
{
	return mp.game.invoke("0x9FBDA379383A52A4", camTo, camFrom, duration, easeLocation, easeRotation);
}


// Arg:cam is [Cam]	
g_Natives.IS_CAM_INTERPOLATING = (cam) => 
{
	return mp.game.invoke("0x036F97C908C2B52C", cam);
}


// Arg:cam is [Cam]	Arg:type is [char*]	Arg:amplitude is [float]	
g_Natives.SHAKE_CAM = (cam, type, amplitude) => 
{
	return mp.game.invoke("0x6A25241C340D3822", cam, type, amplitude);
}


// Arg:cam is [Cam]	Arg:p1 is [char*]	Arg:p2 is [char*]	Arg:p3 is [char*]	Arg:amplitude is [float]	
g_Natives.ANIMATED_SHAKE_CAM = (cam, p1, p2, p3, amplitude) => 
{
	return mp.game.invoke("0xA2746EEAE3E577CD", cam, p1, p2, p3, amplitude);
}


// Arg:cam is [Cam]	
g_Natives.IS_CAM_SHAKING = (cam) => 
{
	return mp.game.invoke("0x6B24BFE83A2BE47B", cam);
}


// Arg:cam is [Cam]	Arg:amplitude is [float]	
g_Natives.SET_CAM_SHAKE_AMPLITUDE = (cam, amplitude) => 
{
	return mp.game.invoke("0xD93DB43B82BC0D00", cam, amplitude);
}


// Arg:cam is [Cam]	Arg:p1 is [BOOL]	
g_Natives.STOP_CAM_SHAKING = (cam, p1) => 
{
	return mp.game.invoke("0xBDECF64367884AC3", cam, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [float]	
g_Natives["0xF4C8CF9E353AFECA"] = (p0, p1) => 
{
	return mp.game.invoke("0xF4C8CF9E353AFECA", p0, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	Arg:p2 is [char*]	Arg:p3 is [float]	
g_Natives["0xC2EAE3FB8CDBED31"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC2EAE3FB8CDBED31", p0, p1, p2, p3);
}

g_Natives.IS_SCRIPT_GLOBAL_SHAKING = () => 
{
	return mp.game.invoke("0xC912AF078AF19212");
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_SCRIPT_GLOBAL_SHAKING = (p0) => 
{
	return mp.game.invoke("0x1C9D7949FA533490", p0);
}


// Arg:cam is [Cam]	Arg:animName is [char*]	Arg:animDictionary is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:p9 is [BOOL]	Arg:p10 is [int]	
g_Natives.PLAY_CAM_ANIM = (cam, animName, animDictionary, x, y, z, xRot, yRot, zRot, p9, p10) => 
{
	return mp.game.invoke("0x9A2D0FB2E7852392", cam, animName, animDictionary, x, y, z, xRot, yRot, zRot, p9, p10);
}


// Arg:cam is [Cam]	Arg:animName is [char*]	Arg:animDictionary is [char*]	
g_Natives.IS_CAM_PLAYING_ANIM = (cam, animName, animDictionary) => 
{
	return mp.game.invoke("0xC90621D8A0CEECF2", cam, animName, animDictionary);
}


// Arg:cam is [Cam]	Arg:phase is [float]	
g_Natives.SET_CAM_ANIM_CURRENT_PHASE = (cam, phase) => 
{
	return mp.game.invoke("0x4145A4C44FF3B5A6", cam, phase);
}


// Arg:cam is [Cam]	
g_Natives.GET_CAM_ANIM_CURRENT_PHASE = (cam) => 
{
	return mp.game.invoke("0xA10B2DB49E92A6B0", cam);
}


// Arg:camera is [Cam]	Arg:SceneID is [int]	Arg:animName is [char*]	Arg:animDictionary is [char*]	
g_Natives.PLAY_SYNCHRONIZED_CAM_ANIM = (camera, SceneID, animName, animDictionary) => 
{
	return mp.game.invoke("0xE32EFE9AB4A9AA0C", camera, SceneID, animName, animDictionary);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.SET_FLY_CAM_HORIZONTAL_RESPONSE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x503F5920162365B2", p0, p1, p2, p3);
}


// Arg:cam is [Cam]	Arg:range is [float]	
g_Natives.SET_FLY_CAM_MAX_HEIGHT = (cam, range) => 
{
	return mp.game.invoke("0xF9D02130ECDD1D77", cam, range);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.SET_FLY_CAM_COORD_AND_CONSTRAIN = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC91C6C55199308CA", p0, p1, p2, p3);
}


// Arg:p0 is [Cam]	
g_Natives["0xC8B5C4A79CC18B94"] = (p0) => 
{
	return mp.game.invoke("0xC8B5C4A79CC18B94", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x5C48A1D6E3B33179"] = (p0) => 
{
	return mp.game.invoke("0x5C48A1D6E3B33179", p0);
}

g_Natives.IS_SCREEN_FADED_OUT = () => 
{
	return mp.game.invoke("0xB16FCE9DDC7BA182");
}

g_Natives.IS_SCREEN_FADED_IN = () => 
{
	return mp.game.invoke("0x5A859503B0C08678");
}

g_Natives.IS_SCREEN_FADING_OUT = () => 
{
	return mp.game.invoke("0x797AC7CB535BA28F");
}

g_Natives.IS_SCREEN_FADING_IN = () => 
{
	return mp.game.invoke("0x5C544BC6C57AC575");
}


// Arg:duration is [int]	
g_Natives.DO_SCREEN_FADE_IN = (duration) => 
{
	return mp.game.invoke("0xD4E8E24955024033", duration);
}


// Arg:duration is [int]	
g_Natives.DO_SCREEN_FADE_OUT = (duration) => 
{
	return mp.game.invoke("0x891B5B39AC6302AF", duration);
}


// Arg:toggle is [BOOL]	Arg:duration is [int]	
g_Natives.SET_WIDESCREEN_BORDERS = (toggle, duration) => 
{
	return mp.game.invoke("0xDCD4EA924F42D01A", toggle, duration);
}

g_Natives.GET_GAMEPLAY_CAM_COORD = () => 
{
	return mp.game.invoke("0x14D6F5678D8F1B37");
}


// Arg:rotationOrder is [int]	
g_Natives.GET_GAMEPLAY_CAM_ROT = (rotationOrder) => 
{
	return mp.game.invoke("0x837765A25378F0BB", rotationOrder);
}

g_Natives.GET_GAMEPLAY_CAM_FOV = () => 
{
	return mp.game.invoke("0x65019750A0324133");
}


// Arg:p0 is [float]	
g_Natives.CUSTOM_MENU_COORDINATES = (p0) => 
{
	return mp.game.invoke("0x487A82C650EB7799", p0);
}


// Arg:p0 is [float]	
g_Natives["0x0225778816FDC28C"] = (p0) => 
{
	return mp.game.invoke("0x0225778816FDC28C", p0);
}

g_Natives.GET_GAMEPLAY_CAM_RELATIVE_HEADING = () => 
{
	return mp.game.invoke("0x743607648ADD4587");
}


// Arg:heading is [float]	
g_Natives.SET_GAMEPLAY_CAM_RELATIVE_HEADING = (heading) => 
{
	return mp.game.invoke("0xB4EC2312F4E5B1F1", heading);
}

g_Natives.GET_GAMEPLAY_CAM_RELATIVE_PITCH = () => 
{
	return mp.game.invoke("0x3A6867B4845BEDA2");
}


// Arg:x is [float]	Arg:Value2 is [float]	
g_Natives.SET_GAMEPLAY_CAM_RELATIVE_PITCH = (x, Value2) => 
{
	return mp.game.invoke("0x6D0858B8EDFD2B7D", x, Value2);
}


// Arg:yaw is [float]	
g_Natives._SET_GAMEPLAY_CAM_RAW_YAW = (yaw) => 
{
	return mp.game.invoke("0x103991D4A307D472", yaw);
}


// Arg:pitch is [float]	
g_Natives._SET_GAMEPLAY_CAM_RAW_PITCH = (pitch) => 
{
	return mp.game.invoke("0x759E13EBC1C15C5A", pitch);
}


// Arg:p0 is [BOOL]	
g_Natives["0x469F2ECDEC046337"] = (p0) => 
{
	return mp.game.invoke("0x469F2ECDEC046337", p0);
}


// Arg:shakeName is [char*]	Arg:intensity is [float]	
g_Natives.SHAKE_GAMEPLAY_CAM = (shakeName, intensity) => 
{
	return mp.game.invoke("0xFD55E49555E017CF", shakeName, intensity);
}

g_Natives.IS_GAMEPLAY_CAM_SHAKING = () => 
{
	return mp.game.invoke("0x016C090630DF1F89");
}


// Arg:amplitude is [float]	
g_Natives.SET_GAMEPLAY_CAM_SHAKE_AMPLITUDE = (amplitude) => 
{
	return mp.game.invoke("0xA87E00932DB4D85D", amplitude);
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_GAMEPLAY_CAM_SHAKING = (p0) => 
{
	return mp.game.invoke("0x0EF93E9F3D08C178", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x8BBACBF51DA047A8"] = (p0) => 
{
	return mp.game.invoke("0x8BBACBF51DA047A8", p0);
}

g_Natives.IS_GAMEPLAY_CAM_RENDERING = () => 
{
	return mp.game.invoke("0x39B5D1B10383F0C8");
}

g_Natives["0x3044240D2E0FA842"] = () => 
{
	return mp.game.invoke("0x3044240D2E0FA842");
}

g_Natives["0x705A276EBFF3133D"] = () => 
{
	return mp.game.invoke("0x705A276EBFF3133D");
}


// Arg:p0 is [BOOL]	
g_Natives["0xDB90C6CCA48940F1"] = (p0) => 
{
	return mp.game.invoke("0xDB90C6CCA48940F1", p0);
}

g_Natives._ENABLE_CROSSHAIR_THIS_FRAME = () => 
{
	return mp.game.invoke("0xEA7F0AD7E9BA676F");
}

g_Natives.IS_GAMEPLAY_CAM_LOOKING_BEHIND = () => 
{
	return mp.game.invoke("0x70FDA869F3317EA9");
}


// Arg:entity is [Entity]	
g_Natives["0x2AED6301F67007D5"] = (entity) => 
{
	return mp.game.invoke("0x2AED6301F67007D5", entity);
}


// Arg:entity is [Entity]	
g_Natives["0x49482F9FCD825AAA"] = (entity) => 
{
	return mp.game.invoke("0x49482F9FCD825AAA", entity);
}


// Arg:p0 is [Any]	
g_Natives["0xFD3151CD37EA2245"] = (p0) => 
{
	return mp.game.invoke("0xFD3151CD37EA2245", p0);
}

g_Natives["0xDD79DF9F4D26E1C9"] = () => 
{
	return mp.game.invoke("0xDD79DF9F4D26E1C9");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.IS_SPHERE_VISIBLE = (x, y, z, radius) => 
{
	return mp.game.invoke("0xE33D59DA70B58FDF", x, y, z, radius);
}

g_Natives.IS_FOLLOW_PED_CAM_ACTIVE = () => 
{
	return mp.game.invoke("0xC6D3D26810C8E0F9");
}


// Arg:p0 is [char*]	Arg:p1 is [int]	
g_Natives.SET_FOLLOW_PED_CAM_CUTSCENE_CHAT = (p0, p1) => 
{
	return mp.game.invoke("0x44A113DD6FFC48D1", p0, p1);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives["0x271401846BD26E92"] = (p0, p1) => 
{
	return mp.game.invoke("0x271401846BD26E92", p0, p1);
}

g_Natives["0xC8391C309684595A"] = () => 
{
	return mp.game.invoke("0xC8391C309684595A");
}


// Arg:minimum is [float]	Arg:maximum is [float]	
g_Natives._CLAMP_GAMEPLAY_CAM_YAW = (minimum, maximum) => 
{
	return mp.game.invoke("0x8F993D26E0CA5E8E", minimum, maximum);
}


// Arg:minimum is [float]	Arg:maximum is [float]	
g_Natives._CLAMP_GAMEPLAY_CAM_PITCH = (minimum, maximum) => 
{
	return mp.game.invoke("0xA516C198B7DCA1E1", minimum, maximum);
}


// Arg:p0 is [float]	Arg:distance is [float]	
g_Natives._ANIMATE_GAMEPLAY_CAM_ZOOM = (p0, distance) => 
{
	return mp.game.invoke("0xDF2E1F7742402E81", p0, distance);
}


// Arg:p0 is [Vehicle]	Arg:p1 is [int]	
g_Natives["0xE9EA16D6E54CDCA4"] = (p0, p1) => 
{
	return mp.game.invoke("0xE9EA16D6E54CDCA4", p0, p1);
}

g_Natives._DISABLE_FIRST_PERSON_CAM_THIS_FRAME = () => 
{
	return mp.game.invoke("0xDE2EF5DA284CC8DF");
}

g_Natives["0x59424BD75174C9B1"] = () => 
{
	return mp.game.invoke("0x59424BD75174C9B1");
}

g_Natives.GET_FOLLOW_PED_CAM_ZOOM_LEVEL = () => 
{
	return mp.game.invoke("0x33E6C8EFD0CD93E9");
}

g_Natives.GET_FOLLOW_PED_CAM_VIEW_MODE = () => 
{
	return mp.game.invoke("0x8D4D46230B2C353A");
}


// Arg:viewMode is [int]	
g_Natives.SET_FOLLOW_PED_CAM_VIEW_MODE = (viewMode) => 
{
	return mp.game.invoke("0x5A4F9EDF1673F704", viewMode);
}

g_Natives.IS_FOLLOW_VEHICLE_CAM_ACTIVE = () => 
{
	return mp.game.invoke("0xCBBDE6D335D6D496");
}


// Arg:p0 is [BOOL]	
g_Natives["0x91EF6EE6419E5B97"] = (p0) => 
{
	return mp.game.invoke("0x91EF6EE6419E5B97", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.SET_TIME_IDLE_DROP = (p0, p1) => 
{
	return mp.game.invoke("0x9DFE13ECDC1EC196", p0, p1);
}

g_Natives.GET_FOLLOW_VEHICLE_CAM_ZOOM_LEVEL = () => 
{
	return mp.game.invoke("0xEE82280AB767B690");
}


// Arg:zoomLevel is [int]	
g_Natives.SET_FOLLOW_VEHICLE_CAM_ZOOM_LEVEL = (zoomLevel) => 
{
	return mp.game.invoke("0x19464CB6E4078C8A", zoomLevel);
}

g_Natives.GET_FOLLOW_VEHICLE_CAM_VIEW_MODE = () => 
{
	return mp.game.invoke("0xA4FF579AC0E3AAAE");
}


// Arg:viewMode is [int]	
g_Natives.SET_FOLLOW_VEHICLE_CAM_VIEW_MODE = (viewMode) => 
{
	return mp.game.invoke("0xAC253D7842768F48", viewMode);
}


// Arg:viewType is [int]	
g_Natives._GET_CAM_VIEW_MODE = (viewType) => 
{
	return mp.game.invoke("0xEE778F8C7E1142E2", viewType);
}


// Arg:p0 is [Cam]	Arg:perspective is [Any]	
g_Natives._SET_CAM_PERSPECTIVE = (p0, perspective) => 
{
	return mp.game.invoke("0x2A2173E46DAECD12", p0, perspective);
}

g_Natives._GET_CAM_VIEW_TYPE = () => 
{
	return mp.game.invoke("0x19CAFA3C87F7C2FF");
}

g_Natives.IS_AIM_CAM_ACTIVE = () => 
{
	return mp.game.invoke("0x68EDDA28A5976D07");
}

g_Natives["0x74BD83EA840F6BC9"] = () => 
{
	return mp.game.invoke("0x74BD83EA840F6BC9");
}

g_Natives.IS_FIRST_PERSON_AIM_CAM_ACTIVE = () => 
{
	return mp.game.invoke("0x5E346D934122613F");
}

g_Natives.DISABLE_AIM_CAM_THIS_UPDATE = () => 
{
	return mp.game.invoke("0x1A31FE0049E542F6");
}

g_Natives._GET_GAMEPLAY_CAM_ZOOM = () => 
{
	return mp.game.invoke("0x7EC52CC40597D170");
}


// Arg:p0 is [float]	
g_Natives["0x70894BD0915C5BCA"] = (p0) => 
{
	return mp.game.invoke("0x70894BD0915C5BCA", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives["0xCED08CBE8EBB97C7"] = (p0, p1) => 
{
	return mp.game.invoke("0xCED08CBE8EBB97C7", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives["0x2F7F2B26DD3F18EE"] = (p0, p1) => 
{
	return mp.game.invoke("0x2F7F2B26DD3F18EE", p0, p1);
}


// Arg:minAngle is [float]	Arg:maxAngle is [float]	
g_Natives._SET_FIRST_PERSON_CAM_PITCH_RANGE = (minAngle, maxAngle) => 
{
	return mp.game.invoke("0xBCFC632DB7673BF0", minAngle, maxAngle);
}


// Arg:distance is [float]	
g_Natives._SET_FIRST_PERSON_CAM_NEAR_CLIP = (distance) => 
{
	return mp.game.invoke("0x0AF7B437918103B3", distance);
}


// Arg:distance is [float]	
g_Natives._SET_THIRD_PERSON_AIM_CAM_NEAR_CLIP = (distance) => 
{
	return mp.game.invoke("0x42156508606DE65E", distance);
}


// Arg:p0 is [BOOL]	
g_Natives["0x4008EDF7D6E48175"] = (p0) => 
{
	return mp.game.invoke("0x4008EDF7D6E48175", p0);
}

g_Natives._GET_GAMEPLAY_CAM_COORDS = () => 
{
	return mp.game.invoke("0xA200EB1EE790F448");
}


// Arg:rotationOrder is [int]	
g_Natives._GET_GAMEPLAY_CAM_ROT = (rotationOrder) => 
{
	return mp.game.invoke("0x5B4E4C817FCC2DFB", rotationOrder);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x26903D9CD1175F2C"] = (p0, p1) => 
{
	return mp.game.invoke("0x26903D9CD1175F2C", p0, p1);
}

g_Natives._GET_GAMEPLAY_CAM_FOV = () => 
{
	return mp.game.invoke("0x80EC114669DAEFF4");
}


// Arg:p0 is [Any]	
g_Natives["0x5F35F6732C3FBBA0"] = (p0) => 
{
	return mp.game.invoke("0x5F35F6732C3FBBA0", p0);
}

g_Natives["0xD0082607100D7193"] = () => 
{
	return mp.game.invoke("0xD0082607100D7193");
}

g_Natives._GET_GAMEPLAY_CAM_FAR_CLIP = () => 
{
	return mp.game.invoke("0xDFC8CBC606FDB0FC");
}

g_Natives._GET_GAMEPLAY_CAM_NEAR_DOF = () => 
{
	return mp.game.invoke("0xA03502FC581F7D9B");
}

g_Natives._GET_GAMEPLAY_CAM_FAR_DOF = () => 
{
	return mp.game.invoke("0x9780F32BCAF72431");
}

g_Natives["0x162F9D995753DC19"] = () => 
{
	return mp.game.invoke("0x162F9D995753DC19");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [int]	Arg:blendOutDuration is [int]	Arg:blendInDuration is [int]	Arg:unk is [int]	
g_Natives.SET_GAMEPLAY_COORD_HINT = (x, y, z, duration, blendOutDuration, blendInDuration, unk) => 
{
	return mp.game.invoke("0xD51ADCD2D8BC0FB3", x, y, z, duration, blendOutDuration, blendInDuration, unk);
}


// Arg:p0 is [Ped]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	
g_Natives.SET_GAMEPLAY_PED_HINT = (p0, x1, y1, z1, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x2B486269ACD548D3", p0, x1, y1, z1, p4, p5, p6, p7);
}


// Arg:p0 is [Vehicle]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:p4 is [BOOL]	Arg:duration is [int]	Arg:easeInDuration is [int]	Arg:easeOutDuration is [int]	
g_Natives.SET_GAMEPLAY_VEHICLE_HINT = (p0, xOffset, yOffset, zOffset, p4, duration, easeInDuration, easeOutDuration) => 
{
	return mp.game.invoke("0xA2297E18F3E71C2E", p0, xOffset, yOffset, zOffset, p4, duration, easeInDuration, easeOutDuration);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	
g_Natives.SET_GAMEPLAY_OBJECT_HINT = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x83E87508A2CA2AC6", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:p4 is [BOOL]	Arg:duration is [int]	Arg:fadeInTime is [int]	Arg:fadeOutTime is [int]	Arg:flags is [int]	
g_Natives.SET_GAMEPLAY_ENTITY_HINT = (entity, xOffset, yOffset, zOffset, p4, duration, fadeInTime, fadeOutTime, flags) => 
{
	return mp.game.invoke("0x189E955A8313E298", entity, xOffset, yOffset, zOffset, p4, duration, fadeInTime, fadeOutTime, flags);
}

g_Natives.IS_GAMEPLAY_HINT_ACTIVE = () => 
{
	return mp.game.invoke("0xE520FF1AD2785B40");
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_GAMEPLAY_HINT = (p0) => 
{
	return mp.game.invoke("0xF46C581C61718916", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xCCD078C2665D2973"] = (p0) => 
{
	return mp.game.invoke("0xCCD078C2665D2973", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x247ACBC4ABBC9D1C"] = (p0) => 
{
	return mp.game.invoke("0x247ACBC4ABBC9D1C", p0);
}

g_Natives["0xBF72910D0F26F025"] = () => 
{
	return mp.game.invoke("0xBF72910D0F26F025");
}


// Arg:FOV is [float]	
g_Natives.SET_GAMEPLAY_HINT_FOV = (FOV) => 
{
	return mp.game.invoke("0x513403FB9C56211F", FOV);
}


// Arg:p0 is [float]	
g_Natives["0xF8BDBF3D573049A1"] = (p0) => 
{
	return mp.game.invoke("0xF8BDBF3D573049A1", p0);
}


// Arg:p0 is [float]	
g_Natives["0xD1F8363DFAD03848"] = (p0) => 
{
	return mp.game.invoke("0xD1F8363DFAD03848", p0);
}


// Arg:p0 is [float]	
g_Natives["0x5D7B620DAE436138"] = (p0) => 
{
	return mp.game.invoke("0x5D7B620DAE436138", p0);
}


// Arg:p0 is [float]	
g_Natives["0xC92717EF615B6704"] = (p0) => 
{
	return mp.game.invoke("0xC92717EF615B6704", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_IS_MULTIPLAYER_BRIEF = (p0) => 
{
	return mp.game.invoke("0xE3433EADAAF7EE40", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_CINEMATIC_BUTTON_ACTIVE = (p0) => 
{
	return mp.game.invoke("0x51669F7D1FB53D9F", p0);
}

g_Natives.IS_CINEMATIC_CAM_RENDERING = () => 
{
	return mp.game.invoke("0xB15162CB5826E9E8");
}


// Arg:p0 is [char*]	Arg:p1 is [float]	
g_Natives.SHAKE_CINEMATIC_CAM = (p0, p1) => 
{
	return mp.game.invoke("0xDCE214D9ED58F3CF", p0, p1);
}

g_Natives.IS_CINEMATIC_CAM_SHAKING = () => 
{
	return mp.game.invoke("0xBBC08F6B4CB8FF0A");
}


// Arg:p0 is [float]	
g_Natives.SET_CINEMATIC_CAM_SHAKE_AMPLITUDE = (p0) => 
{
	return mp.game.invoke("0xC724C701C30B2FE7", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.STOP_CINEMATIC_CAM_SHAKING = (p0) => 
{
	return mp.game.invoke("0x2238E588E588A6D7", p0);
}

g_Natives._DISABLE_VEHICLE_FIRST_PERSON_CAM_THIS_FRAME = () => 
{
	return mp.game.invoke("0xADFF1B2A555F5FBA");
}

g_Natives["0x62ECFCFDEE7885D6"] = () => 
{
	return mp.game.invoke("0x62ECFCFDEE7885D6");
}

g_Natives["0x9E4CFFF989258472"] = () => 
{
	return mp.game.invoke("0x9E4CFFF989258472");
}

g_Natives._F4F2C0D4EE209E20 = () => 
{
	return mp.game.invoke("0xF4F2C0D4EE209E20");
}

g_Natives["0xCA9D2AA3E326D720"] = () => 
{
	return mp.game.invoke("0xCA9D2AA3E326D720");
}

g_Natives._IS_IN_VEHICLE_CAM_DISABLED = () => 
{
	return mp.game.invoke("0x4F32C0D5A90A9B40");
}


// Arg:p0 is [Any]	Arg:p1 is [int]	Arg:p2 is [Any]	Arg:entity is [Entity]	
g_Natives.CREATE_CINEMATIC_SHOT = (p0, p1, p2, entity) => 
{
	return mp.game.invoke("0x741B0129D4560F31", p0, p1, p2, entity);
}


// Arg:p0 is [Any]	
g_Natives.IS_CINEMATIC_SHOT_ACTIVE = (p0) => 
{
	return mp.game.invoke("0xCC9F3371A7C28BC9", p0);
}


// Arg:p0 is [Any]	
g_Natives.STOP_CINEMATIC_SHOT = (p0) => 
{
	return mp.game.invoke("0x7660C6E75D3A078E", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xA41BCD7213805AAC"] = (p0) => 
{
	return mp.game.invoke("0xA41BCD7213805AAC", p0);
}

g_Natives["0xDC9DA9E8789F5246"] = () => 
{
	return mp.game.invoke("0xDC9DA9E8789F5246");
}


// Arg:p0 is [BOOL]	
g_Natives.SET_CINEMATIC_MODE_ACTIVE = (p0) => 
{
	return mp.game.invoke("0xDCF0754AC3D6FD4E", p0);
}

g_Natives["0x1F2300CB7FA7B7F6"] = () => 
{
	return mp.game.invoke("0x1F2300CB7FA7B7F6");
}

g_Natives["0x17FCA7199A530203"] = () => 
{
	return mp.game.invoke("0x17FCA7199A530203");
}

g_Natives.STOP_CUTSCENE_CAM_SHAKING = () => 
{
	return mp.game.invoke("0xDB629FFD9285FA06");
}


// Arg:p0 is [float]	
g_Natives["0x12DED8CA53D47EA5"] = (p0) => 
{
	return mp.game.invoke("0x12DED8CA53D47EA5", p0);
}


// Arg:p0 is [float]	Arg:p1 is [int]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [int]	Arg:p8 is [int]	
g_Natives["0x89215EC747DF244A"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x89215EC747DF244A", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}

g_Natives["0x5A43C76F7FC7BA5F"] = () => 
{
	return mp.game.invoke("0x5A43C76F7FC7BA5F");
}


// Arg:p0 is [int]	
g_Natives._SET_CAM_EFFECT = (p0) => 
{
	return mp.game.invoke("0x80C8B1846639BB19", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x5C41E6BABC9E2112"] = (p0) => 
{
	return mp.game.invoke("0x5C41E6BABC9E2112", p0);
}


// Arg:vehicleName is [char*]	
g_Natives["0x21E253A7F8DA5DFB"] = (vehicleName) => 
{
	return mp.game.invoke("0x21E253A7F8DA5DFB", vehicleName);
}


// Arg:p0 is [Any]	
g_Natives["0x11FA5D3479C7DD47"] = (p0) => 
{
	return mp.game.invoke("0x11FA5D3479C7DD47", p0);
}

g_Natives["0xEAF0FA793D05C592"] = () => 
{
	return mp.game.invoke("0xEAF0FA793D05C592");
}

g_Natives._GET_REPLAY_FREE_CAM_MAX_RANGE = () => 
{
	return mp.game.invoke("0x8BFCEB5EA1B161B6");
}


// Arg:toggle is [BOOL]	
g_Natives.ENABLE_LASER_SIGHT_RENDERING = (toggle) => 
{
	return mp.game.invoke("0xC8B46D7727D864AA", toggle);
}


// Arg:componentHash is [Hash]	
g_Natives.GET_WEAPON_COMPONENT_TYPE_MODEL = (componentHash) => 
{
	return mp.game.invoke("0x0DB57B41EC1DB083", componentHash);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPONTYPE_MODEL = (weaponHash) => 
{
	return mp.game.invoke("0xF46CDC33180FDA94", weaponHash);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPONTYPE_SLOT = (weaponHash) => 
{
	return mp.game.invoke("0x4215460B9B8B7FA0", weaponHash);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPONTYPE_GROUP = (weaponHash) => 
{
	return mp.game.invoke("0xC3287EE3050FB74C", weaponHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:equipNow is [BOOL]	
g_Natives.SET_CURRENT_PED_WEAPON = (ped, weaponHash, equipNow) => 
{
	return mp.game.invoke("0xADF692B254977C0C", ped, weaponHash, equipNow);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash*]	Arg:unused is [BOOL]	
g_Natives.GET_CURRENT_PED_WEAPON = (ped, weaponHash, unused) => 
{
	return mp.game.invoke("0x3A87E44BB9A01D54", ped, weaponHash, unused);
}


// Arg:ped is [Ped]	
g_Natives.GET_CURRENT_PED_WEAPON_ENTITY_INDEX = (ped) => 
{
	return mp.game.invoke("0x3B390A939AF0B5FC", ped);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.GET_BEST_PED_WEAPON = (ped, p1) => 
{
	return mp.game.invoke("0x8483E98E8B888AE2", ped, p1);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	
g_Natives.SET_CURRENT_PED_VEHICLE_WEAPON = (ped, weaponHash) => 
{
	return mp.game.invoke("0x75C55983C2C39DAA", ped, weaponHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash*]	
g_Natives.GET_CURRENT_PED_VEHICLE_WEAPON = (ped, weaponHash) => 
{
	return mp.game.invoke("0x1017582BCD3832DC", ped, weaponHash);
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.IS_PED_ARMED = (ped, p1) => 
{
	return mp.game.invoke("0x475768A975D5AD17", ped, p1);
}


// Arg:weaponHash is [Hash]	
g_Natives.IS_WEAPON_VALID = (weaponHash) => 
{
	return mp.game.invoke("0x937C71165CF334B3", weaponHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:p2 is [BOOL]	
g_Natives.HAS_PED_GOT_WEAPON = (ped, weaponHash, p2) => 
{
	return mp.game.invoke("0x8DECB02F88F428BC", ped, weaponHash, p2);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_WEAPON_READY_TO_SHOOT = (ped) => 
{
	return mp.game.invoke("0xB80CA294F2F26749", ped);
}


// Arg:ped is [Ped]	Arg:weaponSlot is [Hash]	
g_Natives.GET_PED_WEAPONTYPE_IN_SLOT = (ped, weaponSlot) => 
{
	return mp.game.invoke("0xEFFED78E9011134D", ped, weaponSlot);
}


// Arg:ped is [Ped]	Arg:weaponhash is [Hash]	
g_Natives.GET_AMMO_IN_PED_WEAPON = (ped, weaponhash) => 
{
	return mp.game.invoke("0x015A522136D7F951", ped, weaponhash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammo is [int]	
g_Natives.ADD_AMMO_TO_PED = (ped, weaponHash, ammo) => 
{
	return mp.game.invoke("0x78F0424C34306220", ped, weaponHash, ammo);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammo is [int]	
g_Natives.SET_PED_AMMO = (ped, weaponHash, ammo) => 
{
	return mp.game.invoke("0x14E56BC5B5DB6A19", ped, weaponHash, ammo);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	Arg:weaponHash is [Hash]	
g_Natives.SET_PED_INFINITE_AMMO = (ped, toggle, weaponHash) => 
{
	return mp.game.invoke("0x3EDCB0505123623B", ped, toggle, weaponHash);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_INFINITE_AMMO_CLIP = (ped, toggle) => 
{
	return mp.game.invoke("0x183DADC6AA953186", ped, toggle);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammoCount is [int]	Arg:isHidden is [BOOL]	Arg:equipNow is [BOOL]	
g_Natives.GIVE_WEAPON_TO_PED = (ped, weaponHash, ammoCount, isHidden, equipNow) => 
{
	return mp.game.invoke("0xBF0FD6E56C964FCB", ped, weaponHash, ammoCount, isHidden, equipNow);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammoCount is [int]	Arg:equipNow is [BOOL]	
g_Natives.GIVE_DELAYED_WEAPON_TO_PED = (ped, weaponHash, ammoCount, equipNow) => 
{
	return mp.game.invoke("0xB282DC6EBD803C75", ped, weaponHash, ammoCount, equipNow);
}


// Arg:ped is [Ped]	Arg:unused is [BOOL]	
g_Natives.REMOVE_ALL_PED_WEAPONS = (ped, unused) => 
{
	return mp.game.invoke("0xF25DF915FA38C5F3", ped, unused);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	
g_Natives.REMOVE_WEAPON_FROM_PED = (ped, weaponHash) => 
{
	return mp.game.invoke("0x4899CB088EDF59B8", ped, weaponHash);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.HIDE_PED_WEAPON_FOR_SCRIPTED_CUTSCENE = (ped, toggle) => 
{
	return mp.game.invoke("0x6F6981D2253C208F", ped, toggle);
}


// Arg:ped is [Ped]	Arg:visible is [BOOL]	Arg:deselectWeapon is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.SET_PED_CURRENT_WEAPON_VISIBLE = (ped, visible, deselectWeapon, p3, p4) => 
{
	return mp.game.invoke("0x0725A4CCFDED9A70", ped, visible, deselectWeapon, p3, p4);
}


// Arg:ped is [Ped]	Arg:toggle is [BOOL]	
g_Natives.SET_PED_DROPS_WEAPONS_WHEN_DEAD = (ped, toggle) => 
{
	return mp.game.invoke("0x476AE72C1D19D1A8", ped, toggle);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:weaponType is [int]	
g_Natives.HAS_PED_BEEN_DAMAGED_BY_WEAPON = (ped, weaponHash, weaponType) => 
{
	return mp.game.invoke("0x2D343D2219CD027A", ped, weaponHash, weaponType);
}


// Arg:ped is [Ped]	
g_Natives.CLEAR_PED_LAST_WEAPON_DAMAGE = (ped) => 
{
	return mp.game.invoke("0x0E98F88A24C5F4B8", ped);
}


// Arg:entity is [Entity]	Arg:weaponHash is [Hash]	Arg:weaponType is [int]	
g_Natives.HAS_ENTITY_BEEN_DAMAGED_BY_WEAPON = (entity, weaponHash, weaponType) => 
{
	return mp.game.invoke("0x131D401334815E94", entity, weaponHash, weaponType);
}


// Arg:entity is [Entity]	
g_Natives.CLEAR_ENTITY_LAST_WEAPON_DAMAGE = (entity) => 
{
	return mp.game.invoke("0xAC678E40BE7C74D2", entity);
}


// Arg:ped is [Ped]	
g_Natives.SET_PED_DROPS_WEAPON = (ped) => 
{
	return mp.game.invoke("0x6B7513D9966FBEC0", ped);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:ammoCount is [int]	
g_Natives.SET_PED_DROPS_INVENTORY_WEAPON = (ped, weaponHash, xOffset, yOffset, zOffset, ammoCount) => 
{
	return mp.game.invoke("0x208A1888007FC0E6", ped, weaponHash, xOffset, yOffset, zOffset, ammoCount);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:p2 is [BOOL]	
g_Natives.GET_MAX_AMMO_IN_CLIP = (ped, weaponHash, p2) => 
{
	return mp.game.invoke("0xA38DCFFCEA8962FA", ped, weaponHash, p2);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammo is [int*]	
g_Natives.GET_AMMO_IN_CLIP = (ped, weaponHash, ammo) => 
{
	return mp.game.invoke("0x2E1202248937775C", ped, weaponHash, ammo);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammo is [int]	
g_Natives.SET_AMMO_IN_CLIP = (ped, weaponHash, ammo) => 
{
	return mp.game.invoke("0xDCD2A934D65CB497", ped, weaponHash, ammo);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:ammo is [int*]	
g_Natives.GET_MAX_AMMO = (ped, weaponHash, ammo) => 
{
	return mp.game.invoke("0xDC16122C7A20C933", ped, weaponHash, ammo);
}


// Arg:ped is [Ped]	Arg:ammoType is [Hash]	Arg:ammo is [int]	
g_Natives.SET_PED_AMMO_BY_TYPE = (ped, ammoType, ammo) => 
{
	return mp.game.invoke("0x5FD1E1F011E76D7E", ped, ammoType, ammo);
}


// Arg:ped is [Ped]	Arg:ammoType is [Hash]	
g_Natives.GET_PED_AMMO_BY_TYPE = (ped, ammoType) => 
{
	return mp.game.invoke("0x39D22031557946C1", ped, ammoType);
}


// Arg:ammoType is [Any]	Arg:ammo is [int]	
g_Natives.SET_PED_AMMO_TO_DROP = (ammoType, ammo) => 
{
	return mp.game.invoke("0xA4EFEF9440A5B0EF", ammoType, ammo);
}


// Arg:p0 is [float]	
g_Natives["0xE620FD3512A04F18"] = (p0) => 
{
	return mp.game.invoke("0xE620FD3512A04F18", p0);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	
g_Natives.GET_PED_AMMO_TYPE_FROM_WEAPON = (ped, weaponHash) => 
{
	return mp.game.invoke("0x7FEAD38B326B9F74", ped, weaponHash);
}


// Arg:ped is [Ped]	Arg:coords is [Vector3*]	
g_Natives.GET_PED_LAST_WEAPON_IMPACT_COORD = (ped, coords) => 
{
	return mp.game.invoke("0x6C4D0409BA1A2BC2", ped, coords);
}


// Arg:ped is [Ped]	Arg:gadgetHash is [Hash]	Arg:p2 is [BOOL]	
g_Natives.SET_PED_GADGET = (ped, gadgetHash, p2) => 
{
	return mp.game.invoke("0xD0D7B1E680ED4A1A", ped, gadgetHash, p2);
}


// Arg:ped is [Ped]	Arg:gadgetHash is [Hash]	
g_Natives.GET_IS_PED_GADGET_EQUIPPED = (ped, gadgetHash) => 
{
	return mp.game.invoke("0xF731332072F5156C", ped, gadgetHash);
}


// Arg:ped is [Ped]	
g_Natives.GET_SELECTED_PED_WEAPON = (ped) => 
{
	return mp.game.invoke("0x0A6DB4965674D243", ped);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:p2 is [BOOL]	
g_Natives.EXPLODE_PROJECTILES = (ped, weaponHash, p2) => 
{
	return mp.game.invoke("0xFC4BD125DE7611E4", ped, weaponHash, p2);
}


// Arg:weaponHash is [Hash]	Arg:p1 is [BOOL]	
g_Natives.REMOVE_ALL_PROJECTILES_OF_TYPE = (weaponHash, p1) => 
{
	return mp.game.invoke("0xFC52E0F37E446528", weaponHash, p1);
}


// Arg:ped is [Ped]	
g_Natives.GET_LOCKON_DISTANCE_OF_CURRENT_PED_WEAPON = (ped) => 
{
	return mp.game.invoke("0x840F03E9041E2C9C", ped);
}


// Arg:ped is [Ped]	
g_Natives.GET_MAX_RANGE_OF_CURRENT_PED_WEAPON = (ped) => 
{
	return mp.game.invoke("0x814C9D19DFD69679", ped);
}


// Arg:driver is [Ped]	Arg:vehicle is [Vehicle]	Arg:weaponHash is [Hash]	Arg:p3 is [Any]	
g_Natives.HAS_VEHICLE_GOT_PROJECTILE_ATTACHED = (driver, vehicle, weaponHash, p3) => 
{
	return mp.game.invoke("0x717C8481234E3B88", driver, vehicle, weaponHash, p3);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:componentHash is [Hash]	
g_Natives.GIVE_WEAPON_COMPONENT_TO_PED = (ped, weaponHash, componentHash) => 
{
	return mp.game.invoke("0xD966D51AA5B28BB9", ped, weaponHash, componentHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:componentHash is [Hash]	
g_Natives.REMOVE_WEAPON_COMPONENT_FROM_PED = (ped, weaponHash, componentHash) => 
{
	return mp.game.invoke("0x1E8BE90C74FB4C09", ped, weaponHash, componentHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:componentHash is [Hash]	
g_Natives.HAS_PED_GOT_WEAPON_COMPONENT = (ped, weaponHash, componentHash) => 
{
	return mp.game.invoke("0xC593212475FAE340", ped, weaponHash, componentHash);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:componentHash is [Hash]	
g_Natives.IS_PED_WEAPON_COMPONENT_ACTIVE = (ped, weaponHash, componentHash) => 
{
	return mp.game.invoke("0x0D78DE0572D3969E", ped, weaponHash, componentHash);
}


// Arg:ped is [Ped]	
g_Natives._PED_SKIP_NEXT_RELOADING = (ped) => 
{
	return mp.game.invoke("0x8C0D57EA686FAD87", ped);
}


// Arg:ped is [Ped]	
g_Natives.MAKE_PED_RELOAD = (ped) => 
{
	return mp.game.invoke("0x20AE33F3AC9C0033", ped);
}


// Arg:weaponHash is [Hash]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives.REQUEST_WEAPON_ASSET = (weaponHash, p1, p2) => 
{
	return mp.game.invoke("0x5443438F033E29C3", weaponHash, p1, p2);
}


// Arg:weaponHash is [Hash]	
g_Natives.HAS_WEAPON_ASSET_LOADED = (weaponHash) => 
{
	return mp.game.invoke("0x36E353271F0E90EE", weaponHash);
}


// Arg:weaponHash is [Hash]	
g_Natives.REMOVE_WEAPON_ASSET = (weaponHash) => 
{
	return mp.game.invoke("0xAA08EF13F341C8FC", weaponHash);
}


// Arg:weaponHash is [Hash]	Arg:ammoCount is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:showWorldModel is [BOOL]	Arg:heading is [float]	Arg:p7 is [Any]	
g_Natives.CREATE_WEAPON_OBJECT = (weaponHash, ammoCount, x, y, z, showWorldModel, heading, p7) => 
{
	return mp.game.invoke("0x9541D3CF0D398F36", weaponHash, ammoCount, x, y, z, showWorldModel, heading, p7);
}


// Arg:weaponObject is [Object]	Arg:addonHash is [Hash]	
g_Natives.GIVE_WEAPON_COMPONENT_TO_WEAPON_OBJECT = (weaponObject, addonHash) => 
{
	return mp.game.invoke("0x33E179436C0B31DB", weaponObject, addonHash);
}


// Arg:weaponObject is [Object]	Arg:component is [Hash]	
g_Natives.REMOVE_WEAPON_COMPONENT_FROM_WEAPON_OBJECT = (weaponObject, component) => 
{
	return mp.game.invoke("0xF7D82B0D66777611", weaponObject, component);
}


// Arg:weapon is [Object]	Arg:addonHash is [Hash]	
g_Natives.HAS_WEAPON_GOT_WEAPON_COMPONENT = (weapon, addonHash) => 
{
	return mp.game.invoke("0x76A18844E743BF91", weapon, addonHash);
}


// Arg:weaponObject is [Object]	Arg:ped is [Ped]	
g_Natives.GIVE_WEAPON_OBJECT_TO_PED = (weaponObject, ped) => 
{
	return mp.game.invoke("0xB1FA61371AF7C4B7", weaponObject, ped);
}


// Arg:weaponHash is [Hash]	Arg:componentHash is [Hash]	
g_Natives.DOES_WEAPON_TAKE_WEAPON_COMPONENT = (weaponHash, componentHash) => 
{
	return mp.game.invoke("0x5CEE3DF569CECAB0", weaponHash, componentHash);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.GET_WEAPON_OBJECT_FROM_PED = (ped, p1) => 
{
	return mp.game.invoke("0xCAE1DC9A0E22A16D", ped, p1);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	Arg:tintIndex is [int]	
g_Natives.SET_PED_WEAPON_TINT_INDEX = (ped, weaponHash, tintIndex) => 
{
	return mp.game.invoke("0x50969B9B89ED5738", ped, weaponHash, tintIndex);
}


// Arg:ped is [Ped]	Arg:weaponHash is [Hash]	
g_Natives.GET_PED_WEAPON_TINT_INDEX = (ped, weaponHash) => 
{
	return mp.game.invoke("0x2B9EEDC07BD06B9F", ped, weaponHash);
}


// Arg:weapon is [Object]	Arg:tintIndex is [int]	
g_Natives.SET_WEAPON_OBJECT_TINT_INDEX = (weapon, tintIndex) => 
{
	return mp.game.invoke("0xF827589017D4E4A9", weapon, tintIndex);
}


// Arg:weapon is [Object]	
g_Natives.GET_WEAPON_OBJECT_TINT_INDEX = (weapon) => 
{
	return mp.game.invoke("0xCD183314F7CD2E57", weapon);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPON_TINT_COUNT = (weaponHash) => 
{
	return mp.game.invoke("0x5DCF6C5CAB2E9BF7", weaponHash);
}


// Arg:weaponHash is [Hash]	Arg:outData is [Any*]	
g_Natives.GET_WEAPON_HUD_STATS = (weaponHash, outData) => 
{
	return mp.game.invoke("0xD92C739EE34C9EBA", weaponHash, outData);
}


// Arg:componentHash is [Hash]	Arg:outData is [int*]	
g_Natives.GET_WEAPON_COMPONENT_HUD_STATS = (componentHash, outData) => 
{
	return mp.game.invoke("0xB3CAF387AE12E9F8", componentHash, outData);
}


// Arg:weapon is [Hash]	Arg:p1 is [int]	
g_Natives["0x3133B907D8B32053"] = (weapon, p1) => 
{
	return mp.game.invoke("0x3133B907D8B32053", weapon, p1);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPON_CLIP_SIZE = (weaponHash) => 
{
	return mp.game.invoke("0x583BE370B1EC6EB4", weaponHash);
}


// Arg:ped is [Ped]	Arg:xBias is [float]	Arg:yBias is [float]	
g_Natives.SET_PED_CHANCE_OF_FIRING_BLANKS = (ped, xBias, yBias) => 
{
	return mp.game.invoke("0x8378627201D5497D", ped, xBias, yBias);
}


// Arg:ped is [Ped]	Arg:p1 is [BOOL]	
g_Natives.SET_PED_SHOOT_ORDNANCE_WEAPON = (ped, p1) => 
{
	return mp.game.invoke("0xB4C8D77C80C0421E", ped, p1);
}


// Arg:weaponObject is [Entity]	
g_Natives.REQUEST_WEAPON_HIGH_DETAIL_MODEL = (weaponObject) => 
{
	return mp.game.invoke("0x48164DBB970AC3F0", weaponObject);
}


// Arg:ped is [Ped]	
g_Natives.IS_PED_CURRENT_WEAPON_SILENCED = (ped) => 
{
	return mp.game.invoke("0x65F0C5AE05943EC7", ped);
}


// Arg:ped is [Ped]	
g_Natives.SET_WEAPON_SMOKEGRENADE_ASSIGNED = (ped) => 
{
	return mp.game.invoke("0x4B7620C47217126C", ped);
}


// Arg:distance is [float]	
g_Natives.SET_FLASH_LIGHT_FADE_DISTANCE = (distance) => 
{
	return mp.game.invoke("0xCEA66DAD478CD39B", distance);
}


// Arg:ped is [Ped]	Arg:animStyle is [Hash]	
g_Natives.SET_WEAPON_ANIMATION_OVERRIDE = (ped, animStyle) => 
{
	return mp.game.invoke("0x1055AC3A667F09D9", ped, animStyle);
}


// Arg:weaponHash is [Hash]	
g_Natives.GET_WEAPON_DAMAGE_TYPE = (weaponHash) => 
{
	return mp.game.invoke("0x3BE0BB12D25FB305", weaponHash);
}


// Arg:ped is [Ped]	
g_Natives["0xE4DCEC7FD5B739A5"] = (ped) => 
{
	return mp.game.invoke("0xE4DCEC7FD5B739A5", ped);
}


// Arg:weaponHash is [Hash]	
g_Natives.CAN_USE_WEAPON_ON_PARACHUTE = (weaponHash) => 
{
	return mp.game.invoke("0xBC7BE5ABC0879F74", weaponHash);
}


// Arg:distri is [Vehicle]	
g_Natives.CREATE_ITEMSET = (distri) => 
{
	return mp.game.invoke("0x35AD299F50D91B24", distri);
}


// Arg:p0 is [Any]	
g_Natives.DESTROY_ITEMSET = (p0) => 
{
	return mp.game.invoke("0xDE18220B1C183EDA", p0);
}


// Arg:p0 is [Any]	
g_Natives.IS_ITEMSET_VALID = (p0) => 
{
	return mp.game.invoke("0xB1B1EA596344DFAB", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.ADD_TO_ITEMSET = (p0, p1) => 
{
	return mp.game.invoke("0xE3945201F14637DD", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.REMOVE_FROM_ITEMSET = (p0, p1) => 
{
	return mp.game.invoke("0x25E68244B0177686", p0, p1);
}


// Arg:x is [ScrHandle]	
g_Natives.GET_ITEMSET_SIZE = (x) => 
{
	return mp.game.invoke("0xD9127E83ABF7C631", x);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.GET_INDEXED_ITEM_IN_ITEMSET = (p0, p1) => 
{
	return mp.game.invoke("0x7A197E2521EE2BAB", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.IS_IN_ITEMSET = (p0, p1) => 
{
	return mp.game.invoke("0x2D0FC594D1E9C107", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.CLEAN_ITEMSET = (p0) => 
{
	return mp.game.invoke("0x41BC0D722FC04221", p0);
}

g_Natives.LOAD_ALL_OBJECTS_NOW = () => 
{
	return mp.game.invoke("0xBD6E84632DD4CB3F");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.LOAD_SCENE = (x, y, z) => 
{
	return mp.game.invoke("0x4448EB75B4904BDB", x, y, z);
}

g_Natives.NETWORK_UPDATE_LOAD_SCENE = () => 
{
	return mp.game.invoke("0xC4582015556D1C46");
}

g_Natives.NETWORK_STOP_LOAD_SCENE = () => 
{
	return mp.game.invoke("0x64E630FAF5F60F44");
}

g_Natives.IS_NETWORK_LOADING_SCENE = () => 
{
	return mp.game.invoke("0x41CA5A33160EA4AB");
}


// Arg:interiorID is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_INTERIOR_ACTIVE = (interiorID, toggle) => 
{
	return mp.game.invoke("0xE37B76C387BE28ED", interiorID, toggle);
}


// Arg:model is [Hash]	
g_Natives.REQUEST_MODEL = (model) => 
{
	return mp.game.invoke("0x963D27A58DF860AC", model);
}


// Arg:model is [Player]	
g_Natives.REQUEST_MENU_PED_MODEL = (model) => 
{
	return mp.game.invoke("0xA0261AEF7ACFC51E", model);
}


// Arg:model is [Hash]	
g_Natives.HAS_MODEL_LOADED = (model) => 
{
	return mp.game.invoke("0x98A4EB5D89A0C952", model);
}


// Arg:interiorID is [int]	Arg:roomName is [char*]	
g_Natives._REQUEST_INTERIOR_ROOM_BY_NAME = (interiorID, roomName) => 
{
	return mp.game.invoke("0x8A7A40100EDFEC58", interiorID, roomName);
}


// Arg:model is [Hash]	
g_Natives.SET_MODEL_AS_NO_LONGER_NEEDED = (model) => 
{
	return mp.game.invoke("0xE532F5D78798DAAB", model);
}


// Arg:model is [Hash]	
g_Natives.IS_MODEL_IN_CDIMAGE = (model) => 
{
	return mp.game.invoke("0x35B9E0803292B641", model);
}


// Arg:model is [Hash]	
g_Natives.IS_MODEL_VALID = (model) => 
{
	return mp.game.invoke("0xC0296A2EDF545E92", model);
}


// Arg:model is [Hash]	
g_Natives.IS_MODEL_A_VEHICLE = (model) => 
{
	return mp.game.invoke("0x19AAC8F07BFEC53E", model);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.REQUEST_COLLISION_AT_COORD = (x, y, z) => 
{
	return mp.game.invoke("0x07503F7948F491A7", x, y, z);
}


// Arg:model is [Hash]	
g_Natives.REQUEST_COLLISION_FOR_MODEL = (model) => 
{
	return mp.game.invoke("0x923CB32A3B874FCB", model);
}


// Arg:model is [Hash]	
g_Natives.HAS_COLLISION_FOR_MODEL_LOADED = (model) => 
{
	return mp.game.invoke("0x22CCA434E368F03A", model);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.REQUEST_ADDITIONAL_COLLISION_AT_COORD = (x, y, z) => 
{
	return mp.game.invoke("0xC9156DC11411A9EA", x, y, z);
}


// Arg:animDict is [char*]	
g_Natives.DOES_ANIM_DICT_EXIST = (animDict) => 
{
	return mp.game.invoke("0x2DA49C3B79856961", animDict);
}


// Arg:animDict is [char*]	
g_Natives.REQUEST_ANIM_DICT = (animDict) => 
{
	return mp.game.invoke("0xD3BD40951412FEF6", animDict);
}


// Arg:animDict is [char*]	
g_Natives.HAS_ANIM_DICT_LOADED = (animDict) => 
{
	return mp.game.invoke("0xD031A9162D01088C", animDict);
}


// Arg:animDict is [char*]	
g_Natives.REMOVE_ANIM_DICT = (animDict) => 
{
	return mp.game.invoke("0xF66A602F829E2A06", animDict);
}


// Arg:animSet is [char*]	
g_Natives.REQUEST_ANIM_SET = (animSet) => 
{
	return mp.game.invoke("0x6EA47DAE7FAD0EED", animSet);
}


// Arg:animSet is [char*]	
g_Natives.HAS_ANIM_SET_LOADED = (animSet) => 
{
	return mp.game.invoke("0xC4EA073D86FB29B0", animSet);
}


// Arg:animSet is [char*]	
g_Natives.REMOVE_ANIM_SET = (animSet) => 
{
	return mp.game.invoke("0x16350528F93024B3", animSet);
}


// Arg:clipSet is [char*]	
g_Natives.REQUEST_CLIP_SET = (clipSet) => 
{
	return mp.game.invoke("0xD2A71E1A77418A49", clipSet);
}


// Arg:clipSet is [char*]	
g_Natives.HAS_CLIP_SET_LOADED = (clipSet) => 
{
	return mp.game.invoke("0x318234F4F3738AF3", clipSet);
}


// Arg:clipSet is [char*]	
g_Natives.REMOVE_CLIP_SET = (clipSet) => 
{
	return mp.game.invoke("0x01F73A131C18CD94", clipSet);
}


// Arg:iplName is [char*]	
g_Natives.REQUEST_IPL = (iplName) => 
{
	return mp.game.invoke("0x41B4893843BBDB74", iplName);
}


// Arg:iplName is [char*]	
g_Natives.REMOVE_IPL = (iplName) => 
{
	return mp.game.invoke("0xEE6C5AD3ECE0A82D", iplName);
}


// Arg:iplName is [char*]	
g_Natives.IS_IPL_ACTIVE = (iplName) => 
{
	return mp.game.invoke("0x88A741E44A2B3495", iplName);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_STREAMING = (toggle) => 
{
	return mp.game.invoke("0x6E0C692677008888", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_GAME_PAUSES_FOR_STREAMING = (toggle) => 
{
	return mp.game.invoke("0x717CD6E6FAEBBEDC", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_REDUCE_PED_MODEL_BUDGET = (toggle) => 
{
	return mp.game.invoke("0x77B5F9A36BF96710", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_REDUCE_VEHICLE_MODEL_BUDGET = (toggle) => 
{
	return mp.game.invoke("0x80C527893080CCF3", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_DITCH_POLICE_MODELS = (toggle) => 
{
	return mp.game.invoke("0x42CBE54462D92634", toggle);
}

g_Natives.GET_NUMBER_OF_STREAMING_REQUESTS = () => 
{
	return mp.game.invoke("0x4060057271CEBC89");
}

g_Natives.REQUEST_PTFX_ASSET = () => 
{
	return mp.game.invoke("0x944955FB2A3935C8");
}

g_Natives.HAS_PTFX_ASSET_LOADED = () => 
{
	return mp.game.invoke("0xCA7D9B86ECA7481B");
}

g_Natives.REMOVE_PTFX_ASSET = () => 
{
	return mp.game.invoke("0x88C6814073DD4A73");
}


// Arg:assetName is [char*]	
g_Natives.REQUEST_NAMED_PTFX_ASSET = (assetName) => 
{
	return mp.game.invoke("0xB80D8756B4668AB6", assetName);
}


// Arg:assetName is [char*]	
g_Natives.HAS_NAMED_PTFX_ASSET_LOADED = (assetName) => 
{
	return mp.game.invoke("0x8702416E512EC454", assetName);
}


// Arg:assetName is [char*]	
g_Natives._REMOVE_NAMED_PTFX_ASSET = (assetName) => 
{
	return mp.game.invoke("0x5F61EBBE1A00F96D", assetName);
}


// Arg:budget is [int]	
g_Natives.SET_VEHICLE_POPULATION_BUDGET = (budget) => 
{
	return mp.game.invoke("0xCB9E1EB3BE2AF4E9", budget);
}


// Arg:budget is [int]	
g_Natives.SET_PED_POPULATION_BUDGET = (budget) => 
{
	return mp.game.invoke("0x8C95333CFC3340F3", budget);
}

g_Natives.CLEAR_FOCUS = () => 
{
	return mp.game.invoke("0x31B73D1EA9F01DA2");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	
g_Natives.SET_FOCUS_POS_AND_VEL = (x, y, z, offsetX, offsetY, offsetZ) => 
{
	return mp.game.invoke("0xBB7454BAFF08FE25", x, y, z, offsetX, offsetY, offsetZ);
}


// Arg:entity is [Entity]	
g_Natives.SET_FOCUS_ENTITY = (entity) => 
{
	return mp.game.invoke("0x198F77705FA0931D", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_FOCUS = (entity) => 
{
	return mp.game.invoke("0x2DDFF3FB9075D747", entity);
}


// Arg:p0 is [Entity]	
g_Natives["0x0811381EF5062FEC"] = (p0) => 
{
	return mp.game.invoke("0x0811381EF5062FEC", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives._SET_MAPDATACULLBOX_ENABLED = (p0, p1) => 
{
	return mp.game.invoke("0xAF12610C644A35C9", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x4E52E752C76E7E7A"] = (p0) => 
{
	return mp.game.invoke("0x4E52E752C76E7E7A", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:rad is [float]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.FORMAT_FOCUS_HEADING = (x, y, z, rad, p4, p5) => 
{
	return mp.game.invoke("0x219C7B8D53E429FD", x, y, z, rad, p4, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [Any]	Arg:p8 is [Any]	
g_Natives["0x1F3F018BC3AFA77C"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x1F3F018BC3AFA77C", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [Any]	
g_Natives["0x0AD9710CEE2F590F"] = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x0AD9710CEE2F590F", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any]	
g_Natives["0x1EE7D8DF4425F053"] = (p0) => 
{
	return mp.game.invoke("0x1EE7D8DF4425F053", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x7D41E9D2D17C5B2D"] = (p0) => 
{
	return mp.game.invoke("0x7D41E9D2D17C5B2D", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x07C313F94746702C"] = (p0) => 
{
	return mp.game.invoke("0x07C313F94746702C", p0);
}

g_Natives["0xBC9823AB80A3DCAC"] = () => 
{
	return mp.game.invoke("0xBC9823AB80A3DCAC");
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [Any]	
g_Natives.NEW_LOAD_SCENE_START = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0x212A8D0D2BABFAC2", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [Any]	
g_Natives.NEW_LOAD_SCENE_START_SPHERE = (x, y, z, radius, p4) => 
{
	return mp.game.invoke("0xACCFB4ACF53551B0", x, y, z, radius, p4);
}

g_Natives.NEW_LOAD_SCENE_STOP = () => 
{
	return mp.game.invoke("0xC197616D221FF4A4");
}

g_Natives.IS_NEW_LOAD_SCENE_ACTIVE = () => 
{
	return mp.game.invoke("0xA41A05B6CB741B85");
}

g_Natives.IS_NEW_LOAD_SCENE_LOADED = () => 
{
	return mp.game.invoke("0x01B8247A7A8B9AD1");
}

g_Natives["0x71E7B2E657449AAD"] = () => 
{
	return mp.game.invoke("0x71E7B2E657449AAD");
}


// Arg:from is [Ped]	Arg:to is [Ped]	Arg:flags is [int]	Arg:switchType is [int]	
g_Natives.START_PLAYER_SWITCH = (from, to, flags, switchType) => 
{
	return mp.game.invoke("0xFAA23F2CBA159D67", from, to, flags, switchType);
}

g_Natives.STOP_PLAYER_SWITCH = () => 
{
	return mp.game.invoke("0x95C0A5BBDC189AA1");
}

g_Natives.IS_PLAYER_SWITCH_IN_PROGRESS = () => 
{
	return mp.game.invoke("0xD9D2CFFF49FAB35F");
}

g_Natives.GET_PLAYER_SWITCH_TYPE = () => 
{
	return mp.game.invoke("0xB3C94A90D9FC9E62");
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.GET_IDEAL_PLAYER_SWITCH_TYPE = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xB5D7B26B45720E05", x1, y1, z1, x2, y2, z2);
}

g_Natives.GET_PLAYER_SWITCH_STATE = () => 
{
	return mp.game.invoke("0x470555300D10B2A5");
}

g_Natives.GET_PLAYER_SHORT_SWITCH_STATE = () => 
{
	return mp.game.invoke("0x20F898A5D9782800");
}


// Arg:p0 is [Any*]	
g_Natives["0x5F2013F8BC24EE69"] = (p0) => 
{
	return mp.game.invoke("0x5F2013F8BC24EE69", p0);
}

g_Natives["0x78C0D93253149435"] = () => 
{
	return mp.game.invoke("0x78C0D93253149435");
}


// Arg:camCoordX is [float]	Arg:camCoordY is [float]	Arg:camCoordZ is [float]	Arg:camRotX is [float]	Arg:camRotY is [float]	Arg:camRotZ is [float]	Arg:camFOV is [float]	Arg:camFarClip is [float]	Arg:p8 is [int]	
g_Natives.SET_PLAYER_SWITCH_OUTRO = (camCoordX, camCoordY, camCoordZ, camRotX, camRotY, camRotZ, camFOV, camFarClip, p8) => 
{
	return mp.game.invoke("0xC208B673CE446B61", camCoordX, camCoordY, camCoordZ, camRotX, camRotY, camRotZ, camFOV, camFarClip, p8);
}


// Arg:p0 is [char*]	
g_Natives["0x0FDE9DBFC0A6BC65"] = (p0) => 
{
	return mp.game.invoke("0x0FDE9DBFC0A6BC65", p0);
}

g_Natives["0x43D1680C6D19A8E9"] = () => 
{
	return mp.game.invoke("0x43D1680C6D19A8E9");
}

g_Natives["0x74DE2E8739086740"] = () => 
{
	return mp.game.invoke("0x74DE2E8739086740");
}

g_Natives["0x8E2A065ABDAE6994"] = () => 
{
	return mp.game.invoke("0x8E2A065ABDAE6994");
}

g_Natives["0xAD5FDF34B81BFE79"] = () => 
{
	return mp.game.invoke("0xAD5FDF34B81BFE79");
}

g_Natives["0xDFA80CB25D0A19B3"] = () => 
{
	return mp.game.invoke("0xDFA80CB25D0A19B3");
}

g_Natives["0xD4793DFF3AF2ABCD"] = () => 
{
	return mp.game.invoke("0xD4793DFF3AF2ABCD");
}

g_Natives["0xBD605B8E0E18B3BB"] = () => 
{
	return mp.game.invoke("0xBD605B8E0E18B3BB");
}


// Arg:ped is [Ped]	Arg:flags is [int]	Arg:switchType is [int]	
g_Natives._SWITCH_OUT_PLAYER = (ped, flags, switchType) => 
{
	return mp.game.invoke("0xAAB3200ED59016BC", ped, flags, switchType);
}


// Arg:ped is [Ped]	
g_Natives._SWITCH_IN_PLAYER = (ped) => 
{
	return mp.game.invoke("0xD8295AF639FD9CB8", ped);
}

g_Natives["0x933BBEEB8C61B5F4"] = () => 
{
	return mp.game.invoke("0x933BBEEB8C61B5F4");
}

g_Natives.SET_PLAYER_INVERTED_UP = () => 
{
	return mp.game.invoke("0x08C2D6C52A3104BB");
}

g_Natives["0x5B48A06DD0E792A5"] = () => 
{
	return mp.game.invoke("0x5B48A06DD0E792A5");
}

g_Natives.DESTROY_PLAYER_IN_PAUSE_MENU = () => 
{
	return mp.game.invoke("0x5B74EA8CFD5E3E7E");
}

g_Natives["0x1E9057A74FD73E23"] = () => 
{
	return mp.game.invoke("0x1E9057A74FD73E23");
}

g_Natives["0x0C15B0E443B2349D"] = () => 
{
	return mp.game.invoke("0x0C15B0E443B2349D");
}


// Arg:p0 is [float]	
g_Natives["0xA76359FC80B2438E"] = (p0) => 
{
	return mp.game.invoke("0xA76359FC80B2438E", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0xBED8CA5FF5E04113"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xBED8CA5FF5E04113", p0, p1, p2, p3);
}

g_Natives["0x472397322E92A856"] = () => 
{
	return mp.game.invoke("0x472397322E92A856");
}


// Arg:p0 is [BOOL]	
g_Natives["0x40AEFD1A244741F2"] = (p0) => 
{
	return mp.game.invoke("0x40AEFD1A244741F2", p0);
}

g_Natives["0x03F1A106BDA7DD3E"] = () => 
{
	return mp.game.invoke("0x03F1A106BDA7DD3E");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x95A7DABDDBB78AE7"] = (p0, p1) => 
{
	return mp.game.invoke("0x95A7DABDDBB78AE7", p0, p1);
}

g_Natives["0x63EB2B972A218CAC"] = () => 
{
	return mp.game.invoke("0x63EB2B972A218CAC");
}

g_Natives["0xFB199266061F820A"] = () => 
{
	return mp.game.invoke("0xFB199266061F820A");
}

g_Natives["0xF4A0DADB70F57FA6"] = () => 
{
	return mp.game.invoke("0xF4A0DADB70F57FA6");
}

g_Natives["0x5068F488DDB54DD8"] = () => 
{
	return mp.game.invoke("0x5068F488DDB54DD8");
}


// Arg:srl is [char*]	
g_Natives.PREFETCH_SRL = (srl) => 
{
	return mp.game.invoke("0x3D245789CE12982C", srl);
}

g_Natives.IS_SRL_LOADED = () => 
{
	return mp.game.invoke("0xD0263801A4C5B0BB");
}

g_Natives.BEGIN_SRL = () => 
{
	return mp.game.invoke("0x9BADDC94EF83B823");
}

g_Natives.END_SRL = () => 
{
	return mp.game.invoke("0x0A41540E63C9EE17");
}


// Arg:p0 is [float]	
g_Natives.SET_SRL_TIME = (p0) => 
{
	return mp.game.invoke("0xA74A541C6884E7B8", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives["0xEF39EE20C537E98C"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xEF39EE20C537E98C", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xBEB2D9A1D9A8F55A"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xBEB2D9A1D9A8F55A", p0, p1, p2, p3);
}


// Arg:p0 is [BOOL]	
g_Natives["0x20C6C7E4EB082A7F"] = (p0) => 
{
	return mp.game.invoke("0x20C6C7E4EB082A7F", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF8155A7F03DDFC8E"] = (p0) => 
{
	return mp.game.invoke("0xF8155A7F03DDFC8E", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.SET_HD_AREA = (x, y, z, radius) => 
{
	return mp.game.invoke("0xB85F26619073E775", x, y, z, radius);
}

g_Natives.CLEAR_HD_AREA = () => 
{
	return mp.game.invoke("0xCE58B1CFB9290813");
}

g_Natives._LOAD_MISSION_CREATOR_DATA = () => 
{
	return mp.game.invoke("0xB5A4DB34FE89B88A");
}

g_Natives.SHUTDOWN_CREATOR_BUDGET = () => 
{
	return mp.game.invoke("0xCCE26000E9A6FAD7");
}


// Arg:modelHash is [Hash]	
g_Natives["0x0BC3144DEB678666"] = (modelHash) => 
{
	return mp.game.invoke("0x0BC3144DEB678666", modelHash);
}


// Arg:p0 is [Any]	
g_Natives["0xF086AD9354FAC3A3"] = (p0) => 
{
	return mp.game.invoke("0xF086AD9354FAC3A3", p0);
}

g_Natives["0x3D3D8B3BE5A83D35"] = () => 
{
	return mp.game.invoke("0x3D3D8B3BE5A83D35");
}


// Arg:Playermenu is [Player*]	
g_Natives.REQUEST_SCRIPT = (Playermenu) => 
{
	return mp.game.invoke("0x6EB5F71AA68F2E8E", Playermenu);
}


// Arg:scriptName is [char*]	
g_Natives.SET_SCRIPT_AS_NO_LONGER_NEEDED = (scriptName) => 
{
	return mp.game.invoke("0xC90D2DCACD56184C", scriptName);
}


// Arg:scriptName is [char*]	
g_Natives.HAS_SCRIPT_LOADED = (scriptName) => 
{
	return mp.game.invoke("0xE6CC9F3BA0FB9EF1", scriptName);
}


// Arg:scriptName is [char*]	
g_Natives.DOES_SCRIPT_EXIST = (scriptName) => 
{
	return mp.game.invoke("0xFC04745FBE67C19A", scriptName);
}


// Arg:scriptHash is [Hash]	
g_Natives.REQUEST_SCRIPT_WITH_NAME_HASH = (scriptHash) => 
{
	return mp.game.invoke("0xD62A67D26D9653E6", scriptHash);
}


// Arg:scriptHash is [Hash]	
g_Natives.SET_SCRIPT_WITH_NAME_HASH_AS_NO_LONGER_NEEDED = (scriptHash) => 
{
	return mp.game.invoke("0xC5BC038960E9DB27", scriptHash);
}


// Arg:scriptHash is [Hash]	
g_Natives.HAS_SCRIPT_WITH_NAME_HASH_LOADED = (scriptHash) => 
{
	return mp.game.invoke("0x5F0F0C783EB16C04", scriptHash);
}


// Arg:scriptHash is [Hash]	
g_Natives._DOES_SCRIPT_WITH_NAME_HASH_EXIST = (scriptHash) => 
{
	return mp.game.invoke("0xF86AA3C56BA31381", scriptHash);
}


// Arg:threadId is [int]	
g_Natives.TERMINATE_THREAD = (threadId) => 
{
	return mp.game.invoke("0xC8B189ED9138BCD4", threadId);
}


// Arg:threadId is [int]	
g_Natives.IS_THREAD_ACTIVE = (threadId) => 
{
	return mp.game.invoke("0x46E9AE36D8FA6417", threadId);
}


// Arg:threadId is [int]	
g_Natives._GET_NAME_OF_THREAD = (threadId) => 
{
	return mp.game.invoke("0x05A42BA9FC8DA96B", threadId);
}

g_Natives._BEGIN_ENUMERATING_THREADS = () => 
{
	return mp.game.invoke("0xDADFADA5A20143A8");
}

g_Natives._GET_ID_OF_NEXT_THREAD_IN_ENUMERATION = () => 
{
	return mp.game.invoke("0x30B4FA1C82DD4B9F");
}

g_Natives.GET_ID_OF_THIS_THREAD = () => 
{
	return mp.game.invoke("0xC30338E8088E2E21");
}

g_Natives.TERMINATE_THIS_THREAD = () => 
{
	return mp.game.invoke("0x1090044AD1DA76FA");
}


// Arg:scriptHash is [Hash]	
g_Natives._GET_NUMBER_OF_INSTANCES_OF_SCRIPT_WITH_NAME_HASH = (scriptHash) => 
{
	return mp.game.invoke("0x2C83A9DA6BFFC4F9", scriptHash);
}

g_Natives.GET_THIS_SCRIPT_NAME = () => 
{
	return mp.game.invoke("0x442E0A7EDE4A738A");
}

g_Natives.GET_HASH_OF_THIS_SCRIPT_NAME = () => 
{
	return mp.game.invoke("0x8A1C8B1738FFE87E");
}


// Arg:eventGroup is [int]	
g_Natives.GET_NUMBER_OF_EVENTS = (eventGroup) => 
{
	return mp.game.invoke("0x5F92A689A06620AA", eventGroup);
}


// Arg:eventGroup is [int]	Arg:eventIndex is [int]	
g_Natives.GET_EVENT_EXISTS = (eventGroup, eventIndex) => 
{
	return mp.game.invoke("0x936E6168A9BCEDB5", eventGroup, eventIndex);
}


// Arg:eventGroup is [int]	Arg:eventIndex is [int]	
g_Natives.GET_EVENT_AT_INDEX = (eventGroup, eventIndex) => 
{
	return mp.game.invoke("0xD8F66A3A60C62153", eventGroup, eventIndex);
}


// Arg:eventGroup is [int]	Arg:eventIndex is [int]	Arg:argStruct is [int*]	Arg:argStructSize is [int]	
g_Natives.GET_EVENT_DATA = (eventGroup, eventIndex, argStruct, argStructSize) => 
{
	return mp.game.invoke("0x2902843FCD2B2D79", eventGroup, eventIndex, argStruct, argStructSize);
}


// Arg:eventGroup is [int]	Arg:args is [Any*]	Arg:argCount is [int]	Arg:bit is [int]	
g_Natives.TRIGGER_SCRIPT_EVENT = (eventGroup, args, argCount, bit) => 
{
	return mp.game.invoke("0x5AE99C571D5BBE5D", eventGroup, args, argCount, bit);
}

g_Natives.SHUTDOWN_LOADING_SCREEN = () => 
{
	return mp.game.invoke("0x078EBE9809CCD637");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_NO_LOADING_SCREEN = (toggle) => 
{
	return mp.game.invoke("0x5262CC1995D07E09", toggle);
}

g_Natives._GET_NO_LOADING_SCREEN = () => 
{
	return mp.game.invoke("0x18C1270EA7F199BC");
}

g_Natives["0xB1577667C3708F9B"] = () => 
{
	return mp.game.invoke("0xB1577667C3708F9B");
}


// Arg:string is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_BUSYSPINNER_ON = (string) => 
{
	return mp.game.invoke("0xABA17D7CE615ADBF", string);
}


// Arg:busySpinnerType is [int]	
g_Natives._END_TEXT_COMMAND_BUSY_STRING = (busySpinnerType) => 
{
	return mp.game.invoke("0xBD12F8228410D9B4", busySpinnerType);
}

g_Natives._REMOVE_LOADING_PROMPT = () => 
{
	return mp.game.invoke("0x10D373323E5B9C0D");
}

g_Natives._REMOVE_BUSY_SPINNER = () => 
{
	return mp.game.invoke("0xC65AB383CD91DF98");
}

g_Natives._IS_LOADING_PROMPT_BEING_DISPLAYED = () => 
{
	return mp.game.invoke("0xD422FCC5F239A915");
}

g_Natives["0xB2A592B04648A9CB"] = () => 
{
	return mp.game.invoke("0xB2A592B04648A9CB");
}


// Arg:p0 is [BOOL]	
g_Natives["0x9245E81072704B8A"] = (p0) => 
{
	return mp.game.invoke("0x9245E81072704B8A", p0);
}

g_Natives._SHOW_CURSOR_THIS_FRAME = () => 
{
	return mp.game.invoke("0xAAE7CE1D63167423");
}


// Arg:spriteId is [int]	
g_Natives._SET_CURSOR_SPRITE = (spriteId) => 
{
	return mp.game.invoke("0x8DB8CFFD58B62552", spriteId);
}


// Arg:p0 is [BOOL]	
g_Natives["0x98215325A695E78A"] = (p0) => 
{
	return mp.game.invoke("0x98215325A695E78A", p0);
}

g_Natives["0x3D9ACB1EB139E702"] = () => 
{
	return mp.game.invoke("0x3D9ACB1EB139E702");
}


// Arg:scaleformHandle is [int]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x632B2940C67F4EA9"] = (scaleformHandle, p1, p2, p3) => 
{
	return mp.game.invoke("0x632B2940C67F4EA9", scaleformHandle, p1, p2, p3);
}


// Arg:p0 is [BOOL]	
g_Natives["0x6F1554B0CC2089FA"] = (p0) => 
{
	return mp.game.invoke("0x6F1554B0CC2089FA", p0);
}


// Arg:pos is [float]	
g_Natives._CLEAR_NOTIFICATIONS_POS = (pos) => 
{
	return mp.game.invoke("0x55598D21339CB998", pos);
}

g_Natives["0x25F87B30C382FCA7"] = () => 
{
	return mp.game.invoke("0x25F87B30C382FCA7");
}

g_Natives["0xA8FDB297A8D25FBA"] = () => 
{
	return mp.game.invoke("0xA8FDB297A8D25FBA");
}


// Arg:notificationId is [int]	
g_Natives._REMOVE_NOTIFICATION = (notificationId) => 
{
	return mp.game.invoke("0xBE4390CB40B3E627", notificationId);
}

g_Natives["0xA13C11E1B5C06BFC"] = () => 
{
	return mp.game.invoke("0xA13C11E1B5C06BFC");
}

g_Natives["0x583049884A2EEE3C"] = () => 
{
	return mp.game.invoke("0x583049884A2EEE3C");
}

g_Natives.THEFEED_PAUSE = () => 
{
	return mp.game.invoke("0xFDB423997FA30340");
}

g_Natives.THEFEED_RESUME = () => 
{
	return mp.game.invoke("0xE1CD1E48E025E661");
}

g_Natives.THEFEED_IS_PAUSED = () => 
{
	return mp.game.invoke("0xA9CBFD40B3FA3010");
}

g_Natives["0xD4438C0564490E63"] = () => 
{
	return mp.game.invoke("0xD4438C0564490E63");
}

g_Natives["0xB695E2CD0A2DA9EE"] = () => 
{
	return mp.game.invoke("0xB695E2CD0A2DA9EE");
}

g_Natives._GET_CURRENT_NOTIFICATION = () => 
{
	return mp.game.invoke("0x82352748437638CA");
}

g_Natives["0x56C8B608CFD49854"] = () => 
{
	return mp.game.invoke("0x56C8B608CFD49854");
}

g_Natives._RESET_NOTIFICATION_DATA = () => 
{
	return mp.game.invoke("0xADED7F5748ACAFE6");
}


// Arg:hudIndex is [int]	
g_Natives._SET_NOTIFICATION_BACKGROUND_COLOR = (hudIndex) => 
{
	return mp.game.invoke("0x92F0DA1E27DB96DC", hudIndex);
}


// Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives._SET_NOTIFICATION_FLASH_COLOR = (red, green, blue, alpha) => 
{
	return mp.game.invoke("0x17430B918701C342", red, green, blue, alpha);
}


// Arg:p0 is [Any]	
g_Natives["0x17AD8C9706BDD88A"] = (p0) => 
{
	return mp.game.invoke("0x17AD8C9706BDD88A", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x4A0C7C9BB10ABB36"] = (p0) => 
{
	return mp.game.invoke("0x4A0C7C9BB10ABB36", p0);
}

g_Natives["0xFDD85225B2DEA55E"] = () => 
{
	return mp.game.invoke("0xFDD85225B2DEA55E");
}

g_Natives["0xFDEC055AB549E328"] = () => 
{
	return mp.game.invoke("0xFDEC055AB549E328");
}

g_Natives["0x80FE4F3AB4E1B62A"] = () => 
{
	return mp.game.invoke("0x80FE4F3AB4E1B62A");
}


// Arg:p0 is [BOOL]	
g_Natives["0xBAE4F9B97CD43B30"] = (p0) => 
{
	return mp.game.invoke("0xBAE4F9B97CD43B30", p0);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x317EBA71D7543F52"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x317EBA71D7543F52", p0, p1, p2, p3);
}


// Arg:text is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_THEFEED_POST = (text) => 
{
	return mp.game.invoke("0x202709F4C58A0424", text);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:flash is [BOOL]	Arg:iconType is [int]	Arg:_nonExistent is [BOOL]	Arg:sender is [char*]	Arg:subject is [char*]	
g_Natives._SET_NOTIFICATION_MESSAGE = (picName1, picName2, flash, iconType, _nonExistent, sender, subject) => 
{
	return mp.game.invoke("0x2B7E9A4EAAA93C89", picName1, picName2, flash, iconType, _nonExistent, sender, subject);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:flash is [BOOL]	Arg:iconType is [int]	Arg:sender is [char*]	Arg:subject is [char*]	
g_Natives._SET_NOTIFICATION_MESSAGE_2 = (picName1, picName2, flash, iconType, sender, subject) => 
{
	return mp.game.invoke("0x1CCD9A37359072CF", picName1, picName2, flash, iconType, sender, subject);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:p2 is [BOOL]	Arg:p3 is [Any]	Arg:p4 is [char*]	Arg:p5 is [char*]	
g_Natives._SET_NOTIFICATION_MESSAGE_3 = (picName1, picName2, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xC6F580E4C94926AC", picName1, picName2, p2, p3, p4, p5);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:flash is [BOOL]	Arg:iconType is [int]	Arg:sender is [char*]	Arg:subject is [char*]	Arg:duration is [float]	
g_Natives._SET_NOTIFICATION_MESSAGE_4 = (picName1, picName2, flash, iconType, sender, subject, duration) => 
{
	return mp.game.invoke("0x1E6611149DB3DB6B", picName1, picName2, flash, iconType, sender, subject, duration);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:flash is [BOOL]	Arg:iconType is [int]	Arg:sender is [char*]	Arg:subject is [char*]	Arg:duration is [float]	Arg:clanTag is [char*]	
g_Natives._SET_NOTIFICATION_MESSAGE_CLAN_TAG = (picName1, picName2, flash, iconType, sender, subject, duration, clanTag) => 
{
	return mp.game.invoke("0x5CBF7BADE20DB93E", picName1, picName2, flash, iconType, sender, subject, duration, clanTag);
}


// Arg:picName1 is [char*]	Arg:picName2 is [char*]	Arg:flash is [BOOL]	Arg:iconType1 is [int]	Arg:sender is [char*]	Arg:subject is [char*]	Arg:duration is [float]	Arg:clanTag is [char*]	Arg:iconType2 is [int]	Arg:p9 is [int]	
g_Natives._SET_NOTIFICATION_MESSAGE_CLAN_TAG_2 = (picName1, picName2, flash, iconType1, sender, subject, duration, clanTag, iconType2, p9) => 
{
	return mp.game.invoke("0x531B84E7DA981FB6", picName1, picName2, flash, iconType1, sender, subject, duration, clanTag, iconType2, p9);
}


// Arg:blink is [BOOL]	Arg:showInBrief is [BOOL]	
g_Natives.END_TEXT_COMMAND_THEFEED_POST_TICKER = (blink, showInBrief) => 
{
	return mp.game.invoke("0x2ED7843F8F801023", blink, showInBrief);
}


// Arg:blink is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.END_TEXT_COMMAND_THEFEED_POST_TICKER_FORCED = (blink, p1) => 
{
	return mp.game.invoke("0x44FA03975424A0EE", blink, p1);
}


// Arg:blink is [BOOL]	Arg:p1 is [BOOL]	
g_Natives._DRAW_NOTIFICATION_3 = (blink, p1) => 
{
	return mp.game.invoke("0x378E809BF61EC840", blink, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:p4 is [char*]	
g_Natives._DRAW_NOTIFICATION_AWARD = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xAA295B6F28BD587D", p0, p1, p2, p3, p4);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [int*]	Arg:p3 is [int]	Arg:isLeader is [BOOL]	Arg:unk0 is [BOOL]	Arg:clanDesc is [int]	Arg:R is [int]	Arg:G is [int]	Arg:B is [int]	
g_Natives._DRAW_NOTIFICATION_APARTMENT_INVITE = (p0, p1, p2, p3, isLeader, unk0, clanDesc, R, G, B) => 
{
	return mp.game.invoke("0x97C9E4E7024A8F2C", p0, p1, p2, p3, isLeader, unk0, clanDesc, R, G, B);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [int*]	Arg:p3 is [int]	Arg:isLeader is [BOOL]	Arg:unk0 is [BOOL]	Arg:clanDesc is [int]	Arg:playerName is [char*]	Arg:R is [int]	Arg:G is [int]	Arg:B is [int]	
g_Natives.END_TEXT_COMMAND_THEFEED_POST_CREWTAG_WITH_GAME_NAME = (p0, p1, p2, p3, isLeader, unk0, clanDesc, playerName, R, G, B) => 
{
	return mp.game.invoke("0x137BC35589E34E1E", p0, p1, p2, p3, isLeader, unk0, clanDesc, playerName, R, G, B);
}


// Arg:unlockLabel is [char*]	Arg:iconType is [int]	Arg:unk2 is [char*]	
g_Natives._DRAW_NOTIFICATION_UNLOCK = (unlockLabel, iconType, unk2) => 
{
	return mp.game.invoke("0x33EE12743CCD6343", unlockLabel, iconType, unk2);
}


// Arg:unlockLabel is [char*]	Arg:iconType is [int]	Arg:unk2 is [char*]	Arg:fadeInTime is [int]	
g_Natives._DRAW_NOTIFICATION_UNLOCK_2 = (unlockLabel, iconType, unk2, fadeInTime) => 
{
	return mp.game.invoke("0xC8F3AAF93D0600BF", unlockLabel, iconType, unk2, fadeInTime);
}


// Arg:primaryText is [char*]	Arg:iconType is [int]	Arg:unk2 is [char*]	Arg:fadeInTime is [int]	Arg:primaryStyle is [int]	Arg:ignoreLoc is [BOOL]	
g_Natives.END_TEXT_COMMAND_THEFEED_POST_UNLOCK_TU_WITH_COLOR = (primaryText, iconType, unk2, fadeInTime, primaryStyle, ignoreLoc) => 
{
	return mp.game.invoke("0x7AE0589093A2E088", primaryText, iconType, unk2, fadeInTime, primaryStyle, ignoreLoc);
}


// Arg:blink is [BOOL]	Arg:p1 is [BOOL]	
g_Natives._DRAW_NOTIFICATION_4 = (blink, p1) => 
{
	return mp.game.invoke("0xF020C96915705B3A", blink, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives["0x8EFCCF6EC66D85E4"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x8EFCCF6EC66D85E4", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	Arg:p5 is [Any]	
g_Natives["0xB6871B0555B02996"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xB6871B0555B02996", p0, p1, p2, p3, p4, p5);
}


// Arg:type is [int]	Arg:image is [int]	Arg:text is [char*]	
g_Natives._DRAW_NOTIFICATION_WITH_ICON = (type, image, text) => 
{
	return mp.game.invoke("0xD202B92CBF1D816F", type, image, text);
}


// Arg:type is [int]	Arg:button is [char*]	Arg:text is [char*]	
g_Natives._DRAW_NOTIFICATION_WITH_BUTTON = (type, button, text) => 
{
	return mp.game.invoke("0xDD6CB2CCE7C2735C", type, button, text);
}


// Arg:GxtEntry is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_PRINT = (GxtEntry) => 
{
	return mp.game.invoke("0xB87A37EEB7FAA67D", GxtEntry);
}


// Arg:duration is [int]	Arg:drawImmediately is [BOOL]	
g_Natives.END_TEXT_COMMAND_PRINT = (duration, drawImmediately) => 
{
	return mp.game.invoke("0x9D77056A530643F6", duration, drawImmediately);
}


// Arg:text is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_IS_MESSAGE_DISPLAYED = (text) => 
{
	return mp.game.invoke("0x853648FD1063A213", text);
}

g_Natives.END_TEXT_COMMAND_IS_MESSAGE_DISPLAYED = () => 
{
	return mp.game.invoke("0x8A9BA1AB3E237613");
}


// Arg:text is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_DISPLAY_TEXT = (text) => 
{
	return mp.game.invoke("0x25FBB336DF1804CB", text);
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives.END_TEXT_COMMAND_DISPLAY_TEXT = (x, y) => 
{
	return mp.game.invoke("0xCD015E5BB0D96A57", x, y);
}


// Arg:text is [char*]	
g_Natives._BEGIN_TEXT_COMMAND_WIDTH = (text) => 
{
	return mp.game.invoke("0x54CE8AC98E120CAB", text);
}


// Arg:p0 is [BOOL]	
g_Natives._END_TEXT_COMMAND_GET_WIDTH = (p0) => 
{
	return mp.game.invoke("0x85F061DA64ED2F67", p0);
}


// Arg:entry is [char*]	
g_Natives._BEGIN_TEXT_COMMAND_LINE_COUNT = (entry) => 
{
	return mp.game.invoke("0x521FB041D93DD0E4", entry);
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives._GET_TEXT_SCREEN_LINE_COUNT = (x, y) => 
{
	return mp.game.invoke("0x9040DFB09BE75706", x, y);
}


// Arg:inputType is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_DISPLAY_HELP = (inputType) => 
{
	return mp.game.invoke("0x8509B634FBE7DA11", inputType);
}


// Arg:p0 is [Any]	Arg:loop is [BOOL]	Arg:beep is [BOOL]	Arg:duration is [int]	
g_Natives.END_TEXT_COMMAND_DISPLAY_HELP = (p0, loop, beep, duration) => 
{
	return mp.game.invoke("0x238FFE5C7B0498A6", p0, loop, beep, duration);
}


// Arg:labelName is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_IS_THIS_HELP_MESSAGE_BEING_DISPLAYED = (labelName) => 
{
	return mp.game.invoke("0x0A24DA3A41B718F5", labelName);
}


// Arg:p0 is [int]	
g_Natives.END_TEXT_COMMAND_IS_THIS_HELP_MESSAGE_BEING_DISPLAYED = (p0) => 
{
	return mp.game.invoke("0x10BDDBFC529428DD", p0);
}


// Arg:gxtentry is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_SET_BLIP_NAME = (gxtentry) => 
{
	return mp.game.invoke("0xF9113A30DE5C6670", gxtentry);
}


// Arg:blip is [Blip]	
g_Natives.END_TEXT_COMMAND_SET_BLIP_NAME = (blip) => 
{
	return mp.game.invoke("0xBC38B49BCB83BC9B", blip);
}


// Arg:p0 is [char*]	
g_Natives._BEGIN_TEXT_COMMAND_OBJECTIVE = (p0) => 
{
	return mp.game.invoke("0x23D69E0465570028", p0);
}


// Arg:p0 is [BOOL]	
g_Natives._END_TEXT_COMMAND_OBJECTIVE = (p0) => 
{
	return mp.game.invoke("0xCFDBDF5AE59BA0F4", p0);
}


// Arg:text is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_CLEAR_PRINT = (text) => 
{
	return mp.game.invoke("0xE124FA80A759019C", text);
}

g_Natives.END_TEXT_COMMAND_CLEAR_PRINT = () => 
{
	return mp.game.invoke("0xFCC75460ABA29378");
}


// Arg:p0 is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_OVERRIDE_BUTTON_TEXT = (p0) => 
{
	return mp.game.invoke("0x8F9EE5687F8EECCD", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.END_TEXT_COMMAND_OVERRIDE_BUTTON_TEXT = (p0) => 
{
	return mp.game.invoke("0xA86911979638106F", p0);
}


// Arg:value is [int]	
g_Natives.ADD_TEXT_COMPONENT_INTEGER = (value) => 
{
	return mp.game.invoke("0x03B504CF259931BC", value);
}


// Arg:value is [float]	Arg:decimalPlaces is [int]	
g_Natives.ADD_TEXT_COMPONENT_FLOAT = (value, decimalPlaces) => 
{
	return mp.game.invoke("0xE7DCB5B874BCD96E", value, decimalPlaces);
}


// Arg:labelName is [char*]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_TEXT_LABEL = (labelName) => 
{
	return mp.game.invoke("0xC63CD5D2920ACBE7", labelName);
}


// Arg:gxtEntryHash is [Hash]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_TEXT_LABEL_HASH_KEY = (gxtEntryHash) => 
{
	return mp.game.invoke("0x17299B63C7683A2B", gxtEntryHash);
}


// Arg:blip is [Blip]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_BLIP_NAME = (blip) => 
{
	return mp.game.invoke("0x80EAD8E2E1D5D52E", blip);
}


// Arg:text is [char*]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_PLAYER_NAME = (text) => 
{
	return mp.game.invoke("0x6C188BE134E074AA", text);
}


// Arg:timestamp is [int]	Arg:flags is [int]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_TIME = (timestamp, flags) => 
{
	return mp.game.invoke("0x1115F16B8AB9E8BF", timestamp, flags);
}


// Arg:value is [int]	Arg:commaSeparated is [BOOL]	
g_Natives.ADD_TEXT_COMPONENT_FORMATTED_INTEGER = (value, commaSeparated) => 
{
	return mp.game.invoke("0x0E4C749FF9DE9CC4", value, commaSeparated);
}


// Arg:p0 is [char*]	Arg:p1 is [int]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_PHONE_NUMBER = (p0, p1) => 
{
	return mp.game.invoke("0x761B77454205A61D", p0, p1);
}


// Arg:website is [char*]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_WEBSITE = (website) => 
{
	return mp.game.invoke("0x94CF4AC034C9C986", website);
}


// Arg:p0 is [char*]	
g_Natives.ADD_TEXT_COMPONENT_SUBSTRING_KEYBOARD_DISPLAY = (p0) => 
{
	return mp.game.invoke("0x5F68520888E69014", p0);
}


// Arg:hudIndex is [int]	
g_Natives._SET_NOTIFICATION_COLOR_NEXT = (hudIndex) => 
{
	return mp.game.invoke("0x39BBF623FC803EAC", hudIndex);
}


// Arg:text is [char*]	Arg:position is [int]	Arg:length is [int]	
g_Natives._GET_TEXT_SUBSTRING = (text, position, length) => 
{
	return mp.game.invoke("0x169BD9382084C8C0", text, position, length);
}


// Arg:text is [char*]	Arg:position is [int]	Arg:length is [int]	Arg:maxLength is [int]	
g_Natives._GET_TEXT_SUBSTRING_SAFE = (text, position, length, maxLength) => 
{
	return mp.game.invoke("0xB2798643312205C5", text, position, length, maxLength);
}


// Arg:text is [char*]	Arg:startPosition is [int]	Arg:endPosition is [int]	
g_Natives._GET_TEXT_SUBSTRING_SLICE = (text, startPosition, endPosition) => 
{
	return mp.game.invoke("0xCE94AEBA5D82908A", text, startPosition, endPosition);
}


// Arg:labelName is [char*]	
g_Natives._GET_LABEL_TEXT = (labelName) => 
{
	return mp.game.invoke("0x7B5280EBA9840C72", labelName);
}

g_Natives.CLEAR_PRINTS = () => 
{
	return mp.game.invoke("0xCC33FA791322B9D9");
}

g_Natives.CLEAR_BRIEF = () => 
{
	return mp.game.invoke("0x9D292F73ADBD9313");
}

g_Natives.CLEAR_ALL_HELP_MESSAGES = () => 
{
	return mp.game.invoke("0x6178F68A87A4D3A0");
}


// Arg:p0 is [char*]	
g_Natives.CLEAR_THIS_PRINT = (p0) => 
{
	return mp.game.invoke("0xCF708001E1E536DD", p0);
}

g_Natives.CLEAR_SMALL_PRINTS = () => 
{
	return mp.game.invoke("0x2CEA2839313C09AC");
}


// Arg:gxt is [char*]	
g_Natives.DOES_TEXT_BLOCK_EXIST = (gxt) => 
{
	return mp.game.invoke("0x1C7302E725259789", gxt);
}


// Arg:gxt is [char*]	Arg:slot is [int]	
g_Natives.REQUEST_ADDITIONAL_TEXT = (gxt, slot) => 
{
	return mp.game.invoke("0x71A78003C8E71424", gxt, slot);
}


// Arg:gxt is [char*]	Arg:slot is [int]	
g_Natives._REQUEST_ADDITIONAL_TEXT_2 = (gxt, slot) => 
{
	return mp.game.invoke("0x6009F9F1AE90D8A6", gxt, slot);
}


// Arg:slot is [int]	
g_Natives.HAS_ADDITIONAL_TEXT_LOADED = (slot) => 
{
	return mp.game.invoke("0x02245FE4BED318B8", slot);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	
g_Natives.CLEAR_ADDITIONAL_TEXT = (p0, p1) => 
{
	return mp.game.invoke("0x2A179DF17CCF04CD", p0, p1);
}


// Arg:p0 is [int]	
g_Natives.IS_STREAMING_ADDITIONAL_TEXT = (p0) => 
{
	return mp.game.invoke("0x8B6817B71B85EBF0", p0);
}


// Arg:gxt is [char*]	Arg:slot is [int]	
g_Natives.HAS_THIS_ADDITIONAL_TEXT_LOADED = (gxt, slot) => 
{
	return mp.game.invoke("0xADBF060E2B30C5BC", gxt, slot);
}

g_Natives.IS_MESSAGE_BEING_DISPLAYED = () => 
{
	return mp.game.invoke("0x7984C03AA5CC2F41");
}


// Arg:gxt is [char*]	
g_Natives.DOES_TEXT_LABEL_EXIST = (gxt) => 
{
	return mp.game.invoke("0xAC09CA973C564252", gxt);
}


// Arg:gxt is [char*]	
g_Natives.GET_LENGTH_OF_STRING_WITH_THIS_TEXT_LABEL = (gxt) => 
{
	return mp.game.invoke("0x801BD273D3A23F74", gxt);
}


// Arg:string is [char*]	
g_Natives.GET_LENGTH_OF_LITERAL_STRING = (string) => 
{
	return mp.game.invoke("0xF030907CCBB8A9FD", string);
}


// Arg:STRING is [char*]	
g_Natives._GET_LENGTH_OF_STRING = (STRING) => 
{
	return mp.game.invoke("0x43E4111189E54F0E", STRING);
}


// Arg:hash is [Hash]	
g_Natives.GET_STREET_NAME_FROM_HASH_KEY = (hash) => 
{
	return mp.game.invoke("0xD0EF8A959B8A4CB9", hash);
}

g_Natives.IS_HUD_PREFERENCE_SWITCHED_ON = () => 
{
	return mp.game.invoke("0x1930DFA731813EC4");
}

g_Natives.IS_RADAR_PREFERENCE_SWITCHED_ON = () => 
{
	return mp.game.invoke("0x9EB6522EA68F22FE");
}

g_Natives.IS_SUBTITLE_PREFERENCE_SWITCHED_ON = () => 
{
	return mp.game.invoke("0xAD6DACA4BA53E0A4");
}


// Arg:toggle is [BOOL]	
g_Natives.DISPLAY_HUD = (toggle) => 
{
	return mp.game.invoke("0xA6294919E56FF02A", toggle);
}

g_Natives["0x7669F9E39DC17063"] = () => 
{
	return mp.game.invoke("0x7669F9E39DC17063");
}

g_Natives._DISPLAY_HUD_WHEN_PAUSED_THIS_FRAME = () => 
{
	return mp.game.invoke("0x402F9ED62087E898");
}


// Arg:Toggle is [BOOL]	
g_Natives.DISPLAY_RADAR = (Toggle) => 
{
	return mp.game.invoke("0xA0EBB943C300E693", Toggle);
}

g_Natives.IS_HUD_HIDDEN = () => 
{
	return mp.game.invoke("0xA86478C6958735C5");
}

g_Natives.IS_RADAR_HIDDEN = () => 
{
	return mp.game.invoke("0x157F93B036700462");
}

g_Natives._IS_RADAR_ENABLED = () => 
{
	return mp.game.invoke("0xAF754F20EB5CD51A");
}


// Arg:blip is [Blip]	Arg:enabled is [BOOL]	
g_Natives.SET_BLIP_ROUTE = (blip, enabled) => 
{
	return mp.game.invoke("0x4F7D8A9BFB0B43E9", blip, enabled);
}


// Arg:blip is [Blip]	Arg:colour is [int]	
g_Natives.SET_BLIP_ROUTE_COLOUR = (blip, colour) => 
{
	return mp.game.invoke("0x837155CD2F63DA09", blip, colour);
}


// Arg:p0 is [BOOL]	
g_Natives.ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS = (p0) => 
{
	return mp.game.invoke("0x60296AF4BA14ABC5", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x57D760D55F54E071"] = (p0) => 
{
	return mp.game.invoke("0x57D760D55F54E071", p0);
}


// Arg:p0 is [float]	
g_Natives.RESPONDING_AS_TEMP = (p0) => 
{
	return mp.game.invoke("0xBD12C5EEE184C337", p0);
}


// Arg:zoomLevel is [int]	
g_Natives.SET_RADAR_ZOOM = (zoomLevel) => 
{
	return mp.game.invoke("0x096EF57A0C999BBA", zoomLevel);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xF98E4B3E56AFC7B1"] = (p0, p1) => 
{
	return mp.game.invoke("0xF98E4B3E56AFC7B1", p0, p1);
}


// Arg:zoomLevel is [float]	
g_Natives._SET_RADAR_ZOOM_LEVEL_THIS_FRAME = (zoomLevel) => 
{
	return mp.game.invoke("0xCB7CC0D58405AD41", zoomLevel);
}

g_Natives["0xD2049635DEB9C375"] = () => 
{
	return mp.game.invoke("0xD2049635DEB9C375");
}


// Arg:hudColorIndex is [int]	Arg:r is [int*]	Arg:g is [int*]	Arg:b is [int*]	Arg:a is [int*]	
g_Natives.GET_HUD_COLOUR = (hudColorIndex, r, g, b, a) => 
{
	return mp.game.invoke("0x7C9C91AB74A0360F", hudColorIndex, r, g, b, a);
}


// Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives["0xD68A5FF8A3A89874"] = (r, g, b, a) => 
{
	return mp.game.invoke("0xD68A5FF8A3A89874", r, g, b, a);
}


// Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives["0x16A304E6CB2BFAB9"] = (r, g, b, a) => 
{
	return mp.game.invoke("0x16A304E6CB2BFAB9", r, g, b, a);
}


// Arg:hudColorIndex is [int]	Arg:hudColorIndex2 is [int]	
g_Natives.REPLACE_HUD_COLOUR = (hudColorIndex, hudColorIndex2) => 
{
	return mp.game.invoke("0x1CCC708F0F850613", hudColorIndex, hudColorIndex2);
}


// Arg:hudColorIndex is [int]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives._SET_HUD_COLOUR = (hudColorIndex, r, g, b, a) => 
{
	return mp.game.invoke("0xF314CF4F0211894E", hudColorIndex, r, g, b, a);
}


// Arg:toggle is [BOOL]	
g_Natives.FLASH_ABILITY_BAR = (toggle) => 
{
	return mp.game.invoke("0x02CFBA0C9E9275CE", toggle);
}


// Arg:value is [float]	Arg:maxValue is [float]	
g_Natives.SET_ABILITY_BAR_VALUE = (value, maxValue) => 
{
	return mp.game.invoke("0x9969599CCFF5D85E", value, maxValue);
}


// Arg:p0 is [BOOL]	
g_Natives.FLASH_WANTED_DISPLAY = (p0) => 
{
	return mp.game.invoke("0xA18AFB39081B6A1F", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xBA8D65C1C65702E5"] = (p0) => 
{
	return mp.game.invoke("0xBA8D65C1C65702E5", p0);
}


// Arg:size is [float]	Arg:font is [int]	
g_Natives._GET_TEXT_SCALE_HEIGHT = (size, font) => 
{
	return mp.game.invoke("0xDB88A37483346780", size, font);
}


// Arg:unk is [float]	Arg:scale is [float]	
g_Natives.SET_TEXT_SCALE = (unk, scale) => 
{
	return mp.game.invoke("0x07C837F9A01C34C9", unk, scale);
}


// Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.SET_TEXT_COLOUR = (red, green, blue, alpha) => 
{
	return mp.game.invoke("0xBE6B23FFA53FB442", red, green, blue, alpha);
}


// Arg:align is [BOOL]	
g_Natives.SET_TEXT_CENTRE = (align) => 
{
	return mp.game.invoke("0xC02F4DBFB51D988B", align);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_TEXT_RIGHT_JUSTIFY = (toggle) => 
{
	return mp.game.invoke("0x6B3C4650BC8BEE47", toggle);
}


// Arg:justifyType is [int]	
g_Natives.SET_TEXT_JUSTIFICATION = (justifyType) => 
{
	return mp.game.invoke("0x4E096588B13FFECA", justifyType);
}


// Arg:start is [float]	Arg:end is [float]	
g_Natives.SET_TEXT_WRAP = (start, end) => 
{
	return mp.game.invoke("0x63145D9C883A1A70", start, end);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_TEXT_LEADING = (p0) => 
{
	return mp.game.invoke("0xA50ABC31E3CDFAFF", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_TEXT_PROPORTIONAL = (p0) => 
{
	return mp.game.invoke("0x038C1F517D7FDCF8", p0);
}


// Arg:fontType is [int]	
g_Natives.SET_TEXT_FONT = (fontType) => 
{
	return mp.game.invoke("0x66E0276CC5F6B9DA", fontType);
}

g_Natives.SET_TEXT_DROP_SHADOW = () => 
{
	return mp.game.invoke("0x1CA3E9EAC9D93E5E");
}


// Arg:distance is [int]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives.SET_TEXT_DROPSHADOW = (distance, r, g, b, a) => 
{
	return mp.game.invoke("0x465C84BC39F1C351", distance, r, g, b, a);
}

g_Natives.SET_TEXT_OUTLINE = () => 
{
	return mp.game.invoke("0x2513DFB0FB8400FE");
}


// Arg:p0 is [int]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives.SET_TEXT_EDGE = (p0, r, g, b, a) => 
{
	return mp.game.invoke("0x441603240D202FA6", p0, r, g, b, a);
}


// Arg:renderId is [int]	
g_Natives.SET_TEXT_RENDER_ID = (renderId) => 
{
	return mp.game.invoke("0x5F15302936E07111", renderId);
}

g_Natives.GET_DEFAULT_SCRIPT_RENDERTARGET_RENDER_ID = () => 
{
	return mp.game.invoke("0x52F0982D7FD156B6");
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives.REGISTER_NAMED_RENDERTARGET = (p0, p1) => 
{
	return mp.game.invoke("0x57D9C12635E25CE3", p0, p1);
}


// Arg:p0 is [char*]	
g_Natives.IS_NAMED_RENDERTARGET_REGISTERED = (p0) => 
{
	return mp.game.invoke("0x78DCDC15C9F116B4", p0);
}


// Arg:p0 is [Any*]	
g_Natives.RELEASE_NAMED_RENDERTARGET = (p0) => 
{
	return mp.game.invoke("0xE9F6FFE837354DD4", p0);
}


// Arg:hash is [Hash]	
g_Natives.LINK_NAMED_RENDERTARGET = (hash) => 
{
	return mp.game.invoke("0xF6C09E276AEB3F2D", hash);
}


// Arg:p0 is [char*]	
g_Natives.GET_NAMED_RENDERTARGET_RENDER_ID = (p0) => 
{
	return mp.game.invoke("0x1A6478B61C6BDC3B", p0);
}


// Arg:hash is [Hash]	
g_Natives.IS_NAMED_RENDERTARGET_LINKED = (hash) => 
{
	return mp.game.invoke("0x113750538FA31298", hash);
}


// Arg:toggle is [BOOL]	
g_Natives.CLEAR_HELP = (toggle) => 
{
	return mp.game.invoke("0x8DFCED7A656F8802", toggle);
}

g_Natives.IS_HELP_MESSAGE_ON_SCREEN = () => 
{
	return mp.game.invoke("0xDAD37F45428801AE");
}

g_Natives["0x214CD562A939246A"] = () => 
{
	return mp.game.invoke("0x214CD562A939246A");
}

g_Natives.IS_HELP_MESSAGE_BEING_DISPLAYED = () => 
{
	return mp.game.invoke("0x4D79439A6B55AC67");
}

g_Natives.IS_HELP_MESSAGE_FADING_OUT = () => 
{
	return mp.game.invoke("0x327EDEEEAC55C369");
}

g_Natives["0x4A9923385BDB9DAD"] = () => 
{
	return mp.game.invoke("0x4A9923385BDB9DAD");
}

g_Natives._GET_BLIP_INFO_ID_ITERATOR = () => 
{
	return mp.game.invoke("0x186E5D252FA50E7D");
}

g_Natives.GET_NUMBER_OF_ACTIVE_BLIPS = () => 
{
	return mp.game.invoke("0x9A3FF3DE163034E8");
}


// Arg:blipSprite is [int]	
g_Natives.GET_NEXT_BLIP_INFO_ID = (blipSprite) => 
{
	return mp.game.invoke("0x14F96AA50D6FBEA7", blipSprite);
}


// Arg:blipSprite is [int]	
g_Natives.GET_FIRST_BLIP_INFO_ID = (blipSprite) => 
{
	return mp.game.invoke("0x1BEDE233E6CD2A1F", blipSprite);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_INFO_ID_COORD = (blip) => 
{
	return mp.game.invoke("0xFA7C7F0AADF25D09", blip);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_INFO_ID_DISPLAY = (blip) => 
{
	return mp.game.invoke("0x1E314167F701DC3B", blip);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_INFO_ID_TYPE = (blip) => 
{
	return mp.game.invoke("0xBE9B0959FFD0779B", blip);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_INFO_ID_ENTITY_INDEX = (blip) => 
{
	return mp.game.invoke("0x4BA4E2553AFEDC2C", blip);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_INFO_ID_PICKUP_INDEX = (blip) => 
{
	return mp.game.invoke("0x9B6786E4C03DD382", blip);
}


// Arg:entity is [Entity]	
g_Natives.GET_BLIP_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0xBC8DBDCA2436F7E8", entity);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:radius is [float]	
g_Natives.ADD_BLIP_FOR_RADIUS = (posX, posY, posZ, radius) => 
{
	return mp.game.invoke("0x46818D79B1F7499A", posX, posY, posZ, radius);
}


// Arg:entity is [Entity]	
g_Natives.ADD_BLIP_FOR_ENTITY = (entity) => 
{
	return mp.game.invoke("0x5CDE92C702A8FCE7", entity);
}


// Arg:pickup is [Pickup]	
g_Natives.ADD_BLIP_FOR_PICKUP = (pickup) => 
{
	return mp.game.invoke("0xBE339365C863BD36", pickup);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.ADD_BLIP_FOR_COORD = (x, y, z) => 
{
	return mp.game.invoke("0x5A039BB0BCA604B6", x, y, z);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:radius is [float]	Arg:p4 is [int]	
g_Natives.TRIGGER_SONAR_BLIP = (posX, posY, posZ, radius, p4) => 
{
	return mp.game.invoke("0x72DD432F3CDFC0EE", posX, posY, posZ, radius, p4);
}


// Arg:p0 is [BOOL]	
g_Natives["0x60734CC207C9833C"] = (p0) => 
{
	return mp.game.invoke("0x60734CC207C9833C", p0);
}


// Arg:blip is [Blip]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.SET_BLIP_COORDS = (blip, posX, posY, posZ) => 
{
	return mp.game.invoke("0xAE2AF67E9D9AF65D", blip, posX, posY, posZ);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_COORDS = (blip) => 
{
	return mp.game.invoke("0x586AFE3FF72D996E", blip);
}


// Arg:blip is [Blip]	Arg:spriteId is [int]	
g_Natives.SET_BLIP_SPRITE = (blip, spriteId) => 
{
	return mp.game.invoke("0xDF735600A4696DAF", blip, spriteId);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_SPRITE = (blip) => 
{
	return mp.game.invoke("0x1FC877464A04FC4F", blip);
}


// Arg:blip is [Blip]	Arg:gxtEntry is [char*]	
g_Natives.SET_BLIP_NAME_FROM_TEXT_FILE = (blip, gxtEntry) => 
{
	return mp.game.invoke("0xEAA0FFE120D92784", blip, gxtEntry);
}


// Arg:blip is [Blip]	Arg:player is [Player]	
g_Natives.SET_BLIP_NAME_TO_PLAYER_NAME = (blip, player) => 
{
	return mp.game.invoke("0x127DE7B20C60A6A3", blip, player);
}


// Arg:blip is [Blip]	Arg:alpha is [int]	
g_Natives.SET_BLIP_ALPHA = (blip, alpha) => 
{
	return mp.game.invoke("0x45FF974EEE1C8734", blip, alpha);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_ALPHA = (blip) => 
{
	return mp.game.invoke("0x970F608F0EE6C885", blip);
}


// Arg:blip is [Blip]	Arg:opacity is [int]	Arg:duration is [int]	
g_Natives.SET_BLIP_FADE = (blip, opacity, duration) => 
{
	return mp.game.invoke("0x2AEE8F8390D2298C", blip, opacity, duration);
}


// Arg:blip is [Blip]	Arg:rotation is [int]	
g_Natives.SET_BLIP_ROTATION = (blip, rotation) => 
{
	return mp.game.invoke("0xF87683CDF73C3F6E", blip, rotation);
}


// Arg:blip is [Blip]	Arg:duration is [int]	
g_Natives.SET_BLIP_FLASH_TIMER = (blip, duration) => 
{
	return mp.game.invoke("0xD3CD6FD297AE87CC", blip, duration);
}


// Arg:blip is [Blip]	Arg:p1 is [Any]	
g_Natives.SET_BLIP_FLASH_INTERVAL = (blip, p1) => 
{
	return mp.game.invoke("0xAA51DB313C010A7E", blip, p1);
}


// Arg:blip is [Blip]	Arg:color is [int]	
g_Natives.SET_BLIP_COLOUR = (blip, color) => 
{
	return mp.game.invoke("0x03D7FB09E75D6B7E", blip, color);
}


// Arg:blip is [Blip]	Arg:r is [float]	Arg:g is [float]	Arg:b is [float]	
g_Natives.SET_BLIP_SECONDARY_COLOUR = (blip, r, g, b) => 
{
	return mp.game.invoke("0x14892474891E09EB", blip, r, g, b);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_COLOUR = (blip) => 
{
	return mp.game.invoke("0xDF729E8D20CF7327", blip);
}


// Arg:blip is [Blip]	
g_Natives.GET_BLIP_HUD_COLOUR = (blip) => 
{
	return mp.game.invoke("0x729B5F1EFBC0AAEE", blip);
}


// Arg:blip is [Blip]	
g_Natives.IS_BLIP_SHORT_RANGE = (blip) => 
{
	return mp.game.invoke("0xDA5F8727EB75B926", blip);
}


// Arg:blip is [Blip]	
g_Natives.IS_BLIP_ON_MINIMAP = (blip) => 
{
	return mp.game.invoke("0xE41CA53051197A27", blip);
}


// Arg:p0 is [Any]	
g_Natives["0xDD2238F57B977751"] = (p0) => 
{
	return mp.game.invoke("0xDD2238F57B977751", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x54318C915D27E4CE"] = (p0, p1) => 
{
	return mp.game.invoke("0x54318C915D27E4CE", p0, p1);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_HIGH_DETAIL = (blip, toggle) => 
{
	return mp.game.invoke("0xE2590BC29220CEBB", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_AS_MISSION_CREATOR_BLIP = (blip, toggle) => 
{
	return mp.game.invoke("0x24AC0137444F9FD5", blip, toggle);
}


// Arg:blip is [Blip]	
g_Natives.IS_MISSION_CREATOR_BLIP = (blip) => 
{
	return mp.game.invoke("0x26F49BF3381D933D", blip);
}

g_Natives.DISABLE_BLIP_NAME_FOR_VAR = () => 
{
	return mp.game.invoke("0x5C90988E7C8E1AF4");
}

g_Natives["0x4167EFE0527D706E"] = () => 
{
	return mp.game.invoke("0x4167EFE0527D706E");
}


// Arg:p0 is [BOOL]	
g_Natives["0xF1A6C18B35BCADE6"] = (p0) => 
{
	return mp.game.invoke("0xF1A6C18B35BCADE6", p0);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_FLASHES = (blip, toggle) => 
{
	return mp.game.invoke("0xB14552383D39CE3E", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_FLASHES_ALTERNATE = (blip, toggle) => 
{
	return mp.game.invoke("0x2E8D9498C56DD0D1", blip, toggle);
}


// Arg:blip is [Blip]	
g_Natives.IS_BLIP_FLASHING = (blip) => 
{
	return mp.game.invoke("0xA5E41FD83AD6CEF0", blip);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_AS_SHORT_RANGE = (blip, toggle) => 
{
	return mp.game.invoke("0xBE8BE4FE60E27B72", blip, toggle);
}


// Arg:blip is [Blip]	Arg:scale is [float]	
g_Natives.SET_BLIP_SCALE = (blip, scale) => 
{
	return mp.game.invoke("0xD38744167B2FA257", blip, scale);
}


// Arg:blip is [Blip]	Arg:priority is [int]	
g_Natives.SET_BLIP_PRIORITY = (blip, priority) => 
{
	return mp.game.invoke("0xAE9FC9EF6A9FAC79", blip, priority);
}


// Arg:blip is [Blip]	Arg:displayId is [int]	
g_Natives.SET_BLIP_DISPLAY = (blip, displayId) => 
{
	return mp.game.invoke("0x9029B2F3DA924928", blip, displayId);
}


// Arg:blip is [Blip]	Arg:index is [int]	
g_Natives.SET_BLIP_CATEGORY = (blip, index) => 
{
	return mp.game.invoke("0x234CDD44D996FD9A", blip, index);
}


// Arg:blip is [Blip*]	
g_Natives.REMOVE_BLIP = (blip) => 
{
	return mp.game.invoke("0x86A652570E5F25DD", blip);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_AS_FRIENDLY = (blip, toggle) => 
{
	return mp.game.invoke("0x6F6F290102C02AB4", blip, toggle);
}


// Arg:blip is [Blip]	
g_Natives.PULSE_BLIP = (blip) => 
{
	return mp.game.invoke("0x742D6FD43115AF73", blip);
}


// Arg:blip is [Blip]	Arg:number is [int]	
g_Natives.SHOW_NUMBER_ON_BLIP = (blip, number) => 
{
	return mp.game.invoke("0xA3C0B359DCB848B6", blip, number);
}


// Arg:blip is [Blip]	
g_Natives.HIDE_NUMBER_ON_BLIP = (blip) => 
{
	return mp.game.invoke("0x532CFF637EF80148", blip);
}


// Arg:blip is [Blip]	Arg:p1 is [BOOL]	
g_Natives["0x75A16C3DA34F1245"] = (blip, p1) => 
{
	return mp.game.invoke("0x75A16C3DA34F1245", blip, p1);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SHOW_TICK_ON_BLIP = (blip, toggle) => 
{
	return mp.game.invoke("0x74513EA3E505181E", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SHOW_HEADING_INDICATOR_ON_BLIP = (blip, toggle) => 
{
	return mp.game.invoke("0x5FBCA48327B914DF", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives._SET_BLIP_FRIENDLY = (blip, toggle) => 
{
	return mp.game.invoke("0xB81656BC81FE24D1", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives._SET_BLIP_FRIEND = (blip, toggle) => 
{
	return mp.game.invoke("0x23C3EB807312F01A", blip, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xDCFB5D4DB8BF367E"] = (p0, p1) => 
{
	return mp.game.invoke("0xDCFB5D4DB8BF367E", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xC4278F70131BAA6D"] = (p0, p1) => 
{
	return mp.game.invoke("0xC4278F70131BAA6D", p0, p1);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives._SET_BLIP_SHRINK = (blip, toggle) => 
{
	return mp.game.invoke("0x2B6D467DAB714E8D", blip, toggle);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x25615540D894B814"] = (p0, p1) => 
{
	return mp.game.invoke("0x25615540D894B814", p0, p1);
}


// Arg:blip is [Blip]	
g_Natives.DOES_BLIP_EXIST = (blip) => 
{
	return mp.game.invoke("0xA6DB27D19ECBB7DA", blip);
}

g_Natives.SET_WAYPOINT_OFF = () => 
{
	return mp.game.invoke("0xA7E4E2D361C2627F");
}

g_Natives["0xD8E694757BCEA8E9"] = () => 
{
	return mp.game.invoke("0xD8E694757BCEA8E9");
}

g_Natives.REFRESH_WAYPOINT = () => 
{
	return mp.game.invoke("0x81FA173F170560D1");
}

g_Natives.IS_WAYPOINT_ACTIVE = () => 
{
	return mp.game.invoke("0x1DD1F58F493F1DA5");
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives.SET_NEW_WAYPOINT = (x, y) => 
{
	return mp.game.invoke("0xFE43368D2AA4F2FC", x, y);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_BRIGHT = (blip, toggle) => 
{
	return mp.game.invoke("0xB203913733F27884", blip, toggle);
}


// Arg:blip is [Blip]	Arg:toggle is [BOOL]	
g_Natives.SET_BLIP_SHOW_CONE = (blip, toggle) => 
{
	return mp.game.invoke("0x13127EC3665E8EE1", blip, toggle);
}


// Arg:ped is [Ped]	
g_Natives["0xC594B315EDF2D4AF"] = (ped) => 
{
	return mp.game.invoke("0xC594B315EDF2D4AF", ped);
}


// Arg:component is [int]	Arg:toggle is [BOOL]	Arg:componentColor is [int]	
g_Natives.SET_MINIMAP_COMPONENT = (component, toggle, componentColor) => 
{
	return mp.game.invoke("0x75A9A10948D1DEA6", component, toggle, componentColor);
}

g_Natives["0x60E892BA4F5BDCA4"] = () => 
{
	return mp.game.invoke("0x60E892BA4F5BDCA4");
}

g_Natives.GET_MAIN_PLAYER_BLIP_ID = () => 
{
	return mp.game.invoke("0xDCD4EC3F419D02FA");
}


// Arg:p0 is [BOOL]	
g_Natives["0x41350B4FC28E3941"] = (p0) => 
{
	return mp.game.invoke("0x41350B4FC28E3941", p0);
}

g_Natives.HIDE_LOADING_ON_FADE_THIS_FRAME = () => 
{
	return mp.game.invoke("0x4B0311D3CDC4648F");
}


// Arg:interior is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:heading is [int]	Arg:zoom is [int]	
g_Natives.SET_RADAR_AS_INTERIOR_THIS_FRAME = (interior, x, y, heading, zoom) => 
{
	return mp.game.invoke("0x59E727A1C9D3E31A", interior, x, y, heading, zoom);
}

g_Natives.SET_RADAR_AS_EXTERIOR_THIS_FRAME = () => 
{
	return mp.game.invoke("0xE81B7D2A3DAB2D81");
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives._SET_PLAYER_BLIP_POSITION_THIS_FRAME = (x, y) => 
{
	return mp.game.invoke("0x77E2DD177910E1CF", x, y);
}

g_Natives["0x9049FE339D5F6F6F"] = () => 
{
	return mp.game.invoke("0x9049FE339D5F6F6F");
}

g_Natives._DISABLE_RADAR_THIS_FRAME = () => 
{
	return mp.game.invoke("0x5FBAE526203990C9");
}

g_Natives._HIDE_CURRENT_INTERIOR_ON_MAP = () => 
{
	return mp.game.invoke("0x20FE7FDFEEAD38C0");
}

g_Natives._CENTER_PLAYER_ON_RADAR_THIS_FRAME = () => 
{
	return mp.game.invoke("0x6D14BFDC33B34F55");
}


// Arg:p0 is [Any]	
g_Natives.SET_WIDESCREEN_FORMAT = (p0) => 
{
	return mp.game.invoke("0xC3B07BA00A83B0F1", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.DISPLAY_AREA_NAME = (toggle) => 
{
	return mp.game.invoke("0x276B6CE369C33678", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.DISPLAY_CASH = (toggle) => 
{
	return mp.game.invoke("0x96DEC8D5430208B7", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives._UPDATE_DISPLAY_CASH = (toggle) => 
{
	return mp.game.invoke("0x170F541E1CADD1DE", toggle);
}


// Arg:cash is [int]	Arg:bank is [int]	
g_Natives._SET_PLAYER_CASH_CHANGE = (cash, bank) => 
{
	return mp.game.invoke("0x0772DF77852C2E30", cash, bank);
}


// Arg:display is [BOOL]	
g_Natives.DISPLAY_AMMO_THIS_FRAME = (display) => 
{
	return mp.game.invoke("0xA5E78BA2B1331C55", display);
}

g_Natives.DISPLAY_SNIPER_SCOPE_THIS_FRAME = () => 
{
	return mp.game.invoke("0x73115226F4814E62");
}

g_Natives.HIDE_HUD_AND_RADAR_THIS_FRAME = () => 
{
	return mp.game.invoke("0x719FF505F097FD20");
}


// Arg:p0 is [BOOL]	
g_Natives["0xE67C6DFD386EA5E7"] = (p0) => 
{
	return mp.game.invoke("0xE67C6DFD386EA5E7", p0);
}

g_Natives._SET_DISPLAY_CASH = () => 
{
	return mp.game.invoke("0xC2D15BEF167E27BC");
}

g_Natives._REMOVE_DISPLAY_CASH = () => 
{
	return mp.game.invoke("0x95CF81BD06EE1887");
}

g_Natives.SET_MULTIPLAYER_BANK_CASH = () => 
{
	return mp.game.invoke("0xDD21B55DF695CD0A");
}

g_Natives.REMOVE_MULTIPLAYER_BANK_CASH = () => 
{
	return mp.game.invoke("0xC7C6789AA1CFEDD0");
}


// Arg:p0 is [int]	Arg:p1 is [int]	
g_Natives.SET_MULTIPLAYER_HUD_CASH = (p0, p1) => 
{
	return mp.game.invoke("0xFD1D220394BCB824", p0, p1);
}

g_Natives.REMOVE_MULTIPLAYER_HUD_CASH = () => 
{
	return mp.game.invoke("0x968F270E39141ECA");
}

g_Natives.HIDE_HELP_TEXT_THIS_FRAME = () => 
{
	return mp.game.invoke("0xD46923FC481CA285");
}


// Arg:message is [char*]	Arg:p1 is [BOOL]	
g_Natives.DISPLAY_HELP_TEXT_THIS_FRAME = (message, p1) => 
{
	return mp.game.invoke("0x960C9FF8F616E41C", message, p1);
}


// Arg:forcedShow is [BOOL]	
g_Natives._SHOW_WEAPON_WHEEL = (forcedShow) => 
{
	return mp.game.invoke("0xEB354E5376BC81A7", forcedShow);
}

g_Natives._BLOCK_WEAPON_WHEEL_THIS_FRAME = () => 
{
	return mp.game.invoke("0x0AFC4AF510774B47");
}

g_Natives["0xA48931185F0536FE"] = () => 
{
	return mp.game.invoke("0xA48931185F0536FE");
}


// Arg:weaponHash is [Hash]	
g_Natives._HIDE_WEAPON_HASH = (weaponHash) => 
{
	return mp.game.invoke("0x72C1056D678BB7D8", weaponHash);
}


// Arg:p0 is [Any]	
g_Natives["0xA13E93403F26C812"] = (p0) => 
{
	return mp.game.invoke("0xA13E93403F26C812", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x14C9FDCC41F81F63"] = (p0) => 
{
	return mp.game.invoke("0x14C9FDCC41F81F63", p0);
}


// Arg:p0 is [int]	Arg:p1 is [float]	
g_Natives.SET_GPS_FLAGS = (p0, p1) => 
{
	return mp.game.invoke("0x5B440763A4C8D15B", p0, p1);
}

g_Natives.CLEAR_GPS_FLAGS = () => 
{
	return mp.game.invoke("0x21986729D6A3A830");
}


// Arg:p0 is [BOOL]	
g_Natives["0x1EAC5F91BCBC5073"] = (p0) => 
{
	return mp.game.invoke("0x1EAC5F91BCBC5073", p0);
}

g_Natives.CLEAR_GPS_RACE_TRACK = () => 
{
	return mp.game.invoke("0x7AA5B4CE533C858B");
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0xDB34E8D56FC13B08"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xDB34E8D56FC13B08", p0, p1, p2);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives["0x311438A071DD9B1A"] = (x, y, z) => 
{
	return mp.game.invoke("0x311438A071DD9B1A", x, y, z);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x900086F371220B6F"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x900086F371220B6F", p0, p1, p2);
}

g_Natives["0xE6DE0561D9232A64"] = () => 
{
	return mp.game.invoke("0xE6DE0561D9232A64");
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0x3D3D15AF7BCAAF83"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x3D3D15AF7BCAAF83", p0, p1, p2);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives["0xA905192A6781C41B"] = (x, y, z) => 
{
	return mp.game.invoke("0xA905192A6781C41B", x, y, z);
}


// Arg:p0 is [BOOL]	
g_Natives["0x3DDA37128DD1ACA8"] = (p0) => 
{
	return mp.game.invoke("0x3DDA37128DD1ACA8", p0);
}

g_Natives["0x67EEDEA1B9BAFD94"] = () => 
{
	return mp.game.invoke("0x67EEDEA1B9BAFD94");
}

g_Natives.CLEAR_GPS_PLAYER_WAYPOINT = () => 
{
	return mp.game.invoke("0xFF4FB7C8CDFA3DA7");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_GPS_FLASHES = (toggle) => 
{
	return mp.game.invoke("0x320D0E0D936A0E9B", toggle);
}


// Arg:p0 is [Any]	
g_Natives["0x7B21E0BB01E8224A"] = (p0) => 
{
	return mp.game.invoke("0x7B21E0BB01E8224A", p0);
}

g_Natives.FLASH_MINIMAP_DISPLAY = () => 
{
	return mp.game.invoke("0xF2DD778C22B15BDA");
}


// Arg:p0 is [Any]	
g_Natives["0x6B1DE27EE78E6A19"] = (p0) => 
{
	return mp.game.invoke("0x6B1DE27EE78E6A19", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.TOGGLE_STEALTH_RADAR = (toggle) => 
{
	return mp.game.invoke("0x6AFDFB93754950C7", toggle);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	
g_Natives.KEY_HUD_COLOUR = (p0, p1) => 
{
	return mp.game.invoke("0x1A5CD7752DD28CD3", p0, p1);
}


// Arg:p0 is [BOOL]	Arg:name is [char*]	
g_Natives.SET_MISSION_NAME = (p0, name) => 
{
	return mp.game.invoke("0x5F28ECF5FC84772F", p0, name);
}


// Arg:p0 is [BOOL]	Arg:name is [char*]	
g_Natives._SET_MISSION_NAME_2 = (p0, name) => 
{
	return mp.game.invoke("0xE45087D85F468BC2", p0, name);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	Arg:p5 is [Any*]	Arg:p6 is [Any*]	Arg:p7 is [Any*]	Arg:p8 is [Any*]	
g_Natives["0x817B86108EB94E51"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x817B86108EB94E51", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_MINIMAP_BLOCK_WAYPOINT = (toggle) => 
{
	return mp.game.invoke("0x58FADDED207897DC", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives._SET_NORTH_YANKTON_MAP = (toggle) => 
{
	return mp.game.invoke("0x9133955F1A2DA957", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives._SET_MINIMAP_REVEALED = (toggle) => 
{
	return mp.game.invoke("0xF8DEE0A5600CBB93", toggle);
}

g_Natives["0xE0130B41D3CF4574"] = () => 
{
	return mp.game.invoke("0xE0130B41D3CF4574");
}


// Arg:x is [float]	Arg:y is [float]	Arg:radius is [float]	
g_Natives._IS_MINIMAP_AREA_REVEALED = (x, y, radius) => 
{
	return mp.game.invoke("0x6E31B91145873922", x, y, radius);
}


// Arg:p0 is [BOOL]	
g_Natives["0x62E849B7EB28E770"] = (p0) => 
{
	return mp.game.invoke("0x62E849B7EB28E770", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives["0x0923DBF87DFF735E"] = (x, y, z) => 
{
	return mp.game.invoke("0x0923DBF87DFF735E", x, y, z);
}


// Arg:hole is [int]	
g_Natives.SET_MINIMAP_GOLF_COURSE = (hole) => 
{
	return mp.game.invoke("0x71BDB63DBAF8DA59", hole);
}

g_Natives["0x35EDD5B2E3FF01C0"] = () => 
{
	return mp.game.invoke("0x35EDD5B2E3FF01C0");
}


// Arg:angle is [int]	
g_Natives.LOCK_MINIMAP_ANGLE = (angle) => 
{
	return mp.game.invoke("0x299FAEBB108AE05B", angle);
}

g_Natives.UNLOCK_MINIMAP_ANGLE = () => 
{
	return mp.game.invoke("0x8183455E16C42E3A");
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives.LOCK_MINIMAP_POSITION = (x, y) => 
{
	return mp.game.invoke("0x1279E861A329E73F", x, y);
}

g_Natives.UNLOCK_MINIMAP_POSITION = () => 
{
	return mp.game.invoke("0x3E93E06DB8EF1F30");
}


// Arg:altitude is [float]	Arg:p1 is [BOOL]	
g_Natives._SET_MINIMAP_ATTITUDE_INDICATOR_LEVEL = (altitude, p1) => 
{
	return mp.game.invoke("0xD201F3FF917A506D", altitude, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives["0x3F5CC444DCAAA8F2"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x3F5CC444DCAAA8F2", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0x975D66A0BC17064C"] = (p0) => 
{
	return mp.game.invoke("0x975D66A0BC17064C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x06A320535F5F0248"] = (p0) => 
{
	return mp.game.invoke("0x06A320535F5F0248", p0);
}


// Arg:toggleBigMap is [BOOL]	Arg:showFullMap is [BOOL]	
g_Natives._SET_RADAR_BIGMAP_ENABLED = (toggleBigMap, showFullMap) => 
{
	return mp.game.invoke("0x231C8F89D0539D8F", toggleBigMap, showFullMap);
}


// Arg:id is [int]	
g_Natives.IS_HUD_COMPONENT_ACTIVE = (id) => 
{
	return mp.game.invoke("0xBC4C9EA5391ECC0D", id);
}


// Arg:id is [int]	
g_Natives.IS_SCRIPTED_HUD_COMPONENT_ACTIVE = (id) => 
{
	return mp.game.invoke("0xDD100EB17A94FF65", id);
}


// Arg:id is [int]	
g_Natives.HIDE_SCRIPTED_HUD_COMPONENT_THIS_FRAME = (id) => 
{
	return mp.game.invoke("0xE374C498D8BADC14", id);
}


// Arg:p0 is [Any]	
g_Natives["0x09C0403ED9A751C2"] = (p0) => 
{
	return mp.game.invoke("0x09C0403ED9A751C2", p0);
}


// Arg:id is [int]	
g_Natives.HIDE_HUD_COMPONENT_THIS_FRAME = (id) => 
{
	return mp.game.invoke("0x6806C51AD12B83B8", id);
}


// Arg:id is [int]	
g_Natives.SHOW_HUD_COMPONENT_THIS_FRAME = (id) => 
{
	return mp.game.invoke("0x0B4DF1FA60C0E664", id);
}

g_Natives["0xA4DEDE28B1814289"] = () => 
{
	return mp.game.invoke("0xA4DEDE28B1814289");
}

g_Natives.RESET_RETICULE_VALUES = () => 
{
	return mp.game.invoke("0x12782CE0A636E9F0");
}


// Arg:id is [int]	
g_Natives.RESET_HUD_COMPONENT_VALUES = (id) => 
{
	return mp.game.invoke("0x450930E616475D0D", id);
}


// Arg:id is [int]	Arg:x is [float]	Arg:y is [float]	
g_Natives.SET_HUD_COMPONENT_POSITION = (id, x, y) => 
{
	return mp.game.invoke("0xAABB1F56E2A17CED", id, x, y);
}


// Arg:id is [int]	
g_Natives.GET_HUD_COMPONENT_POSITION = (id) => 
{
	return mp.game.invoke("0x223CA69A8C4417FD", id);
}

g_Natives.CLEAR_REMINDER_MESSAGE = () => 
{
	return mp.game.invoke("0xB57D8DD645CFA2CF");
}


// Arg:worldX is [float]	Arg:worldY is [float]	Arg:worldZ is [float]	Arg:screenX is [float*]	Arg:screenY is [float*]	
g_Natives.GET_HUD_SCREEN_POSITION_FROM_WORLD_POSITION = (worldX, worldY, worldZ, screenX, screenY) => 
{
	return mp.game.invoke("0xF9904D11F1ACBEC3", worldX, worldY, worldZ, screenX, screenY);
}

g_Natives._DISPLAY_JOB_REPORT = () => 
{
	return mp.game.invoke("0x523A590C1A3CC0D3");
}

g_Natives["0xEE4C0E6DBC6F2C6F"] = () => 
{
	return mp.game.invoke("0xEE4C0E6DBC6F2C6F");
}

g_Natives["0x9135584D09A3437E"] = () => 
{
	return mp.game.invoke("0x9135584D09A3437E");
}


// Arg:p0 is [Any]	
g_Natives.IS_FLOATING_HELP_TEXT_ON_SCREEN = (p0) => 
{
	return mp.game.invoke("0x2432784ACA090DA4", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives.SET_FLOATING_HELP_TEXT_SCREEN_POSITION = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7679CC1BCEBE3D4C", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_FLOATING_HELP_TEXT_WORLD_POSITION = (p0, x, y, z) => 
{
	return mp.game.invoke("0x784BA7E0ECEB4178", p0, x, y, z);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.SET_FLOATING_HELP_TEXT_TO_ENTITY = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xB094BC1DB4018240", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.SET_FLOATING_HELP_TEXT_STYLE = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x788E7FD431BD67F1", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives.CLEAR_FLOATING_HELP = (p0, p1) => 
{
	return mp.game.invoke("0x50085246ABD3FEFA", p0, p1);
}


// Arg:headDisplayId is [int]	Arg:username is [char*]	Arg:pointedClanTag is [BOOL]	Arg:isRockstarClan is [BOOL]	Arg:clanTag is [char*]	Arg:p5 is [Any]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	
g_Natives._SET_MP_GAMER_TAG_COLOR = (headDisplayId, username, pointedClanTag, isRockstarClan, clanTag, p5, r, g, b) => 
{
	return mp.game.invoke("0x6DD05E9D83EFA4C9", headDisplayId, username, pointedClanTag, isRockstarClan, clanTag, p5, r, g, b);
}

g_Natives.IS_MP_GAMER_TAG_MOVIE_ACTIVE = () => 
{
	return mp.game.invoke("0x6E0EB3EB47C8D7AA");
}


// Arg:ped is [Ped]	Arg:username is [char*]	Arg:pointedClanTag is [BOOL]	Arg:isRockstarClan is [BOOL]	Arg:clanTag is [char*]	Arg:p5 is [Any]	
g_Natives.CREATE_FAKE_MP_GAMER_TAG = (ped, username, pointedClanTag, isRockstarClan, clanTag, p5) => 
{
	return mp.game.invoke("0xBFEFE3321A3F5015", ped, username, pointedClanTag, isRockstarClan, clanTag, p5);
}


// Arg:gamerTagId is [int]	
g_Natives.REMOVE_MP_GAMER_TAG = (gamerTagId) => 
{
	return mp.game.invoke("0x31698AA80E0223F8", gamerTagId);
}


// Arg:gamerTagId is [int]	
g_Natives.IS_MP_GAMER_TAG_ACTIVE = (gamerTagId) => 
{
	return mp.game.invoke("0x4E929E7A5796FD26", gamerTagId);
}


// Arg:gamerTagId is [int]	
g_Natives.ADD_TREVOR_RANDOM_MODIFIER = (gamerTagId) => 
{
	return mp.game.invoke("0x595B5178E412E199", gamerTagId);
}


// Arg:gamerTagId is [int]	Arg:component is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_MP_GAMER_TAG_VISIBILITY = (gamerTagId, component, toggle) => 
{
	return mp.game.invoke("0x63BB75ABEDC1F6A0", gamerTagId, component, toggle);
}


// Arg:headDisplayId is [int]	Arg:p1 is [BOOL]	
g_Natives._SET_MP_GAMER_TAG_ = (headDisplayId, p1) => 
{
	return mp.game.invoke("0xEE76FF7E6A0166B0", headDisplayId, p1);
}


// Arg:headDisplayId is [int]	Arg:p1 is [BOOL]	
g_Natives._SET_MP_GAMER_TAG_ICONS = (headDisplayId, p1) => 
{
	return mp.game.invoke("0xA67F9C46D612B6F1", headDisplayId, p1);
}


// Arg:gamerTagId is [int]	Arg:flag is [int]	Arg:color is [int]	
g_Natives.SET_MP_GAMER_TAG_COLOUR = (gamerTagId, flag, color) => 
{
	return mp.game.invoke("0x613ED644950626AE", gamerTagId, flag, color);
}


// Arg:headDisplayId is [int]	Arg:color is [int]	
g_Natives.SET_MP_GAMER_TAG_HEALTH_BAR_COLOUR = (headDisplayId, color) => 
{
	return mp.game.invoke("0x3158C77A7E888AB4", headDisplayId, color);
}


// Arg:gamerTagId is [int]	Arg:component is [int]	Arg:alpha is [int]	
g_Natives.SET_MP_GAMER_TAG_ALPHA = (gamerTagId, component, alpha) => 
{
	return mp.game.invoke("0xD48FE545CD46F857", gamerTagId, component, alpha);
}


// Arg:gamerTagId is [int]	Arg:wantedlvl is [int]	
g_Natives.SET_MP_GAMER_TAG_WANTED_LEVEL = (gamerTagId, wantedlvl) => 
{
	return mp.game.invoke("0xCF228E2AA03099C3", gamerTagId, wantedlvl);
}


// Arg:gamerTagId is [int]	Arg:string is [char*]	
g_Natives.SET_MP_GAMER_TAG_NAME = (gamerTagId, string) => 
{
	return mp.game.invoke("0xDEA2B8283BAA3944", gamerTagId, string);
}


// Arg:gamerTagId is [int]	
g_Natives._HAS_MP_GAMER_TAG_2 = (gamerTagId) => 
{
	return mp.game.invoke("0xEB709A36958ABE0D", gamerTagId);
}


// Arg:gamerTagId is [int]	Arg:string is [char*]	
g_Natives._SET_MP_GAMER_TAG_CHATTING = (gamerTagId, string) => 
{
	return mp.game.invoke("0x7B7723747CCB55B6", gamerTagId, string);
}

g_Natives._GET_ACTIVE_WEBSITE_ID = () => 
{
	return mp.game.invoke("0x01A358D9128B7A86");
}

g_Natives.GET_CURRENT_WEBSITE_ID = () => 
{
	return mp.game.invoke("0x97D47996FC48CBAD");
}


// Arg:websiteID is [int]	
g_Natives._GET_CURRENT_WEBSITE_PAGE_ID = (websiteID) => 
{
	return mp.game.invoke("0xE3B05614DCE1D014", websiteID);
}


// Arg:p0 is [BOOL]	
g_Natives["0xB99C4E4D9499DF29"] = (p0) => 
{
	return mp.game.invoke("0xB99C4E4D9499DF29", p0);
}

g_Natives["0xAF42195A42C63BBA"] = () => 
{
	return mp.game.invoke("0xAF42195A42C63BBA");
}


// Arg:entryLine1 is [char*]	Arg:instructionalKey is [int]	Arg:entryLine2 is [char*]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	Arg:p5 is [Any*]	Arg:p6 is [Any*]	Arg:background is [BOOL]	
g_Natives.SET_WARNING_MESSAGE = (entryLine1, instructionalKey, entryLine2, p3, p4, p5, p6, background) => 
{
	return mp.game.invoke("0x7B1776B3B53F8D74", entryLine1, instructionalKey, entryLine2, p3, p4, p5, p6, background);
}


// Arg:entryHeader is [char*]	Arg:entryLine1 is [char*]	Arg:instructionalKey is [int]	Arg:entryLine2 is [char*]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	Arg:p6 is [Any*]	Arg:p7 is [Any*]	Arg:background is [BOOL]	
g_Natives.SET_WARNING_MESSAGE_WITH_HEADER = (entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p7, background) => 
{
	return mp.game.invoke("0xDC38CC1E35B6A5D7", entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p7, background);
}


// Arg:entryHeader is [char*]	Arg:entryLine1 is [char*]	Arg:instructionalKey is [Any]	Arg:entryLine2 is [char*]	Arg:p4 is [BOOL]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any*]	Arg:p8 is [Any*]	Arg:p9 is [BOOL]	
g_Natives._SET_WARNING_MESSAGE_3 = (entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x701919482C74B5AB", entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p7, p8, p9);
}


// Arg:p0 is [Any]	Arg:text is [char*]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives._CREATE_DRAW_LIST = (p0, text, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x0C5A80A9E096D529", p0, text, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	
g_Natives["0xDAF87174BE7454FF"] = (p0) => 
{
	return mp.game.invoke("0xDAF87174BE7454FF", p0);
}

g_Natives["0x6EF54AB721DC6242"] = () => 
{
	return mp.game.invoke("0x6EF54AB721DC6242");
}

g_Natives.IS_WARNING_MESSAGE_ACTIVE = () => 
{
	return mp.game.invoke("0xE18B138FABC53103");
}

g_Natives["0x7792424AA0EAC32E"] = () => 
{
	return mp.game.invoke("0x7792424AA0EAC32E");
}


// Arg:toggle is [BOOL]	
g_Natives._SET_MAP_FULL_SCREEN = (toggle) => 
{
	return mp.game.invoke("0x5354C5BA2EA868A4", toggle);
}


// Arg:p0 is [Any]	
g_Natives["0x1EAE6DD17B7A5EFA"] = (p0) => 
{
	return mp.game.invoke("0x1EAE6DD17B7A5EFA", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives["0x551DF99658DB6EE8"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x551DF99658DB6EE8", p0, p1, p2);
}

g_Natives["0x2708FC083123F9FF"] = () => 
{
	return mp.game.invoke("0x2708FC083123F9FF");
}

g_Natives["0x1121BFA1A1A522A8"] = () => 
{
	return mp.game.invoke("0x1121BFA1A1A522A8");
}


// Arg:p0 is [BOOL]	
g_Natives["0x82CEDC33687E1F50"] = (p0) => 
{
	return mp.game.invoke("0x82CEDC33687E1F50", p0);
}

g_Natives["0x211C4EF450086857"] = () => 
{
	return mp.game.invoke("0x211C4EF450086857");
}

g_Natives["0xBF4F34A85CA2970C"] = () => 
{
	return mp.game.invoke("0xBF4F34A85CA2970C");
}


// Arg:menuhash is [Hash]	Arg:Toggle_Pause is [BOOL]	Arg:component is [int]	
g_Natives.ACTIVATE_FRONTEND_MENU = (menuhash, Toggle_Pause, component) => 
{
	return mp.game.invoke("0xEF01D36B9C9D0C7B", menuhash, Toggle_Pause, component);
}


// Arg:menuHash is [Hash]	Arg:p1 is [int]	
g_Natives.RESTART_FRONTEND_MENU = (menuHash, p1) => 
{
	return mp.game.invoke("0x10706DC6AD2D49C0", menuHash, p1);
}

g_Natives._GET_CURRENT_FRONTEND_MENU = () => 
{
	return mp.game.invoke("0x2309595AD6145265");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_PAUSE_MENU_ACTIVE = (toggle) => 
{
	return mp.game.invoke("0xDF47FC56C71569CF", toggle);
}

g_Natives.DISABLE_FRONTEND_THIS_FRAME = () => 
{
	return mp.game.invoke("0x6D3465A73092F0E6");
}

g_Natives["0xBA751764F0821256"] = () => 
{
	return mp.game.invoke("0xBA751764F0821256");
}

g_Natives["0xCC3FDDED67BCFC63"] = () => 
{
	return mp.game.invoke("0xCC3FDDED67BCFC63");
}


// Arg:active is [BOOL]	
g_Natives.SET_FRONTEND_ACTIVE = (active) => 
{
	return mp.game.invoke("0x745711A75AB09277", active);
}

g_Natives.IS_PAUSE_MENU_ACTIVE = () => 
{
	return mp.game.invoke("0xB0034A223497FFCB");
}

g_Natives["0x2F057596F2BD0061"] = () => 
{
	return mp.game.invoke("0x2F057596F2BD0061");
}

g_Natives.GET_PAUSE_MENU_STATE = () => 
{
	return mp.game.invoke("0x272ACD84970869C5");
}

g_Natives["0x5BFF36D6ED83E0AE"] = () => 
{
	return mp.game.invoke("0x5BFF36D6ED83E0AE");
}

g_Natives.IS_PAUSE_MENU_RESTARTING = () => 
{
	return mp.game.invoke("0x1C491717107431C7");
}


// Arg:p0 is [char*]	
g_Natives._LOG_DEBUG_INFO = (p0) => 
{
	return mp.game.invoke("0x2162C446DFDF38FD", p0);
}


// Arg:p0 is [int]	
g_Natives["0x77F16B447824DA6C"] = (p0) => 
{
	return mp.game.invoke("0x77F16B447824DA6C", p0);
}

g_Natives["0xCDCA26E80FAECB8F"] = () => 
{
	return mp.game.invoke("0xCDCA26E80FAECB8F");
}


// Arg:contextHash is [Hash]	
g_Natives.PAUSE_MENU_ACTIVATE_CONTEXT = (contextHash) => 
{
	return mp.game.invoke("0xDD564BDD0472C936", contextHash);
}


// Arg:contextHash is [Hash]	
g_Natives.OBJECT_DECAL_TOGGLE = (contextHash) => 
{
	return mp.game.invoke("0x444D8CF241EC25C5", contextHash);
}


// Arg:hash is [Hash]	
g_Natives["0x84698AB38D0C6636"] = (hash) => 
{
	return mp.game.invoke("0x84698AB38D0C6636", hash);
}

g_Natives["0x2A25ADC48F87841F"] = () => 
{
	return mp.game.invoke("0x2A25ADC48F87841F");
}

g_Natives["0xDE03620F8703A9DF"] = () => 
{
	return mp.game.invoke("0xDE03620F8703A9DF");
}

g_Natives["0x359AF31A4B52F5ED"] = () => 
{
	return mp.game.invoke("0x359AF31A4B52F5ED");
}

g_Natives["0x13C4B962653A5280"] = () => 
{
	return mp.game.invoke("0x13C4B962653A5280");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0xC8E1071177A23BE5"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xC8E1071177A23BE5", p0, p1, p2);
}


// Arg:p0 is [BOOL]	
g_Natives.ENABLE_DEATHBLOOD_SEETHROUGH = (p0) => 
{
	return mp.game.invoke("0x4895BDEA16E7C080", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xC78E239AC5B2DDB9"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xC78E239AC5B2DDB9", p0, p1, p2);
}


// Arg:p0 is [BOOL]	
g_Natives["0xF06EBB91A81E09E3"] = (p0) => 
{
	return mp.game.invoke("0xF06EBB91A81E09E3", p0);
}

g_Natives["0x3BAB9A4E4F2FF5C7"] = () => 
{
	return mp.game.invoke("0x3BAB9A4E4F2FF5C7");
}

g_Natives["0xEC9264727EEC0F28"] = () => 
{
	return mp.game.invoke("0xEC9264727EEC0F28");
}

g_Natives["0x14621BB1DF14E2B2"] = () => 
{
	return mp.game.invoke("0x14621BB1DF14E2B2");
}

g_Natives["0x66E7CB63C97B7D20"] = () => 
{
	return mp.game.invoke("0x66E7CB63C97B7D20");
}

g_Natives["0x593FEAE1F73392D4"] = () => 
{
	return mp.game.invoke("0x593FEAE1F73392D4");
}

g_Natives["0x4E3CD0EF8A489541"] = () => 
{
	return mp.game.invoke("0x4E3CD0EF8A489541");
}

g_Natives["0xF284AC67940C6812"] = () => 
{
	return mp.game.invoke("0xF284AC67940C6812");
}

g_Natives["0x2E22FEFA0100275E"] = () => 
{
	return mp.game.invoke("0x2E22FEFA0100275E");
}


// Arg:p0 is [Any]	
g_Natives["0x0CF54F20DE43879C"] = (p0) => 
{
	return mp.game.invoke("0x0CF54F20DE43879C", p0);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x36C1451A88A09630"] = (p0, p1) => 
{
	return mp.game.invoke("0x36C1451A88A09630", p0, p1);
}


// Arg:p0 is [int*]	Arg:p1 is [int*]	Arg:p2 is [int*]	
g_Natives["0x7E17BE53E1AAABAF"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7E17BE53E1AAABAF", p0, p1, p2);
}


// Arg:p0 is [int*]	Arg:p1 is [int*]	Arg:p2 is [int*]	
g_Natives["0xA238192F33110615"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xA238192F33110615", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.SET_USERIDS_UIHIDDEN = (p0, p1) => 
{
	return mp.game.invoke("0xEF4CED81CEBEDC6D", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any]	
g_Natives["0xCA6B2F7CE32AB653"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xCA6B2F7CE32AB653", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x90A6526CF0381030"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x90A6526CF0381030", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0x24A49BEAF468DC90"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x24A49BEAF468DC90", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [float*]	
g_Natives["0x5FBD7095FE7AE57F"] = (p0, p1) => 
{
	return mp.game.invoke("0x5FBD7095FE7AE57F", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any]	
g_Natives["0x8F08017F9D7C47BD"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x8F08017F9D7C47BD", p0, p1, p2);
}


// Arg:p0 is [Hash]	Arg:p1 is [Any*]	
g_Natives["0x052991E59076E4E4"] = (p0, p1) => 
{
	return mp.game.invoke("0x052991E59076E4E4", p0, p1);
}

g_Natives.CLEAR_PED_IN_PAUSE_MENU = () => 
{
	return mp.game.invoke("0x5E62BE5DC58E9E06");
}


// Arg:ped is [Ped]	Arg:p1 is [int]	
g_Natives.GIVE_PED_TO_PAUSE_MENU = (ped, p1) => 
{
	return mp.game.invoke("0xAC0BFBDC3BE00E14", ped, p1);
}


// Arg:p0 is [BOOL]	
g_Natives["0x3CA6050692BC61B0"] = (p0) => 
{
	return mp.game.invoke("0x3CA6050692BC61B0", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xECF128344E9FF9F1"] = (p0) => 
{
	return mp.game.invoke("0xECF128344E9FF9F1", p0);
}

g_Natives._SHOW_SOCIAL_CLUB_LEGAL_SCREEN = () => 
{
	return mp.game.invoke("0x805D7CBB36FD6C4C");
}

g_Natives["0xF13FE2A80C05C561"] = () => 
{
	return mp.game.invoke("0xF13FE2A80C05C561");
}

g_Natives["0x6F72CD94F7B5B68C"] = () => 
{
	return mp.game.invoke("0x6F72CD94F7B5B68C");
}

g_Natives["0x75D3691713C3B05A"] = () => 
{
	return mp.game.invoke("0x75D3691713C3B05A");
}

g_Natives["0xD2B32BE3FC1626C6"] = () => 
{
	return mp.game.invoke("0xD2B32BE3FC1626C6");
}


// Arg:p0 is [char*]	
g_Natives["0x9E778248D6685FE0"] = (p0) => 
{
	return mp.game.invoke("0x9E778248D6685FE0", p0);
}

g_Natives.IS_SOCIAL_CLUB_ACTIVE = () => 
{
	return mp.game.invoke("0xC406BE343FC4B9AF");
}


// Arg:p0 is [BOOL]	
g_Natives["0x1185A8087587322C"] = (p0) => 
{
	return mp.game.invoke("0x1185A8087587322C", p0);
}

g_Natives["0x8817605C2BA76200"] = () => 
{
	return mp.game.invoke("0x8817605C2BA76200");
}

g_Natives._IS_TEXT_CHAT_ACTIVE = () => 
{
	return mp.game.invoke("0xB118AF58B5F332A1");
}

g_Natives._ABORT_TEXT_CHAT = () => 
{
	return mp.game.invoke("0x1AC8F4AD40E22127");
}


// Arg:p0 is [BOOL]	
g_Natives._SET_TEXT_CHAT_UNK = (p0) => 
{
	return mp.game.invoke("0x1DB21A44B09E8BA3", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xCEF214315D276FD1"] = (p0) => 
{
	return mp.game.invoke("0xCEF214315D276FD1", p0);
}


// Arg:pedHandle is [int]	Arg:showViewCones is [BOOL]	
g_Natives._SET_PED_AI_BLIP = (pedHandle, showViewCones) => 
{
	return mp.game.invoke("0xD30C50DF888D58B5", pedHandle, showViewCones);
}


// Arg:ped is [Ped]	
g_Natives.DOES_PED_HAVE_AI_BLIP = (ped) => 
{
	return mp.game.invoke("0x15B8ECF844EE67ED", ped);
}


// Arg:ped is [Ped]	Arg:type is [int]	
g_Natives._SET_AI_BLIP_TYPE = (ped, type) => 
{
	return mp.game.invoke("0xE52B8E7F85D39A08", ped, type);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives.HIDE_SPECIAL_ABILITY_LOCKON_OPERATION = (p0, p1) => 
{
	return mp.game.invoke("0x3EED80DFF7325CAA", p0, p1);
}


// Arg:ped is [Ped]	Arg:flag is [BOOL]	
g_Natives._IS_AI_BLIP_ALWAYS_SHOWN = (ped, flag) => 
{
	return mp.game.invoke("0x0C4BBF625CA98C4E", ped, flag);
}


// Arg:ped is [Ped]	Arg:distance is [float]	
g_Natives._SET_AI_BLIP_MAX_DISTANCE = (ped, distance) => 
{
	return mp.game.invoke("0x97C65887D4B37FA9", ped, distance);
}


// Arg:ped is [Ped]	
g_Natives["0x7CD934010E115C2C"] = (ped) => 
{
	return mp.game.invoke("0x7CD934010E115C2C", ped);
}


// Arg:ped is [Ped]	
g_Natives._GET_AI_BLIP = (ped) => 
{
	return mp.game.invoke("0x56176892826A4FE8", ped);
}

g_Natives["0xA277800A9EAE340E"] = () => 
{
	return mp.game.invoke("0xA277800A9EAE340E");
}

g_Natives["0x2632482FD6B9AB87"] = () => 
{
	return mp.game.invoke("0x2632482FD6B9AB87");
}


// Arg:toggle is [BOOL]	
g_Natives._SET_DIRECTOR_MODE = (toggle) => 
{
	return mp.game.invoke("0x808519373FD336A3", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x04655F9D075D0AE5"] = (p0) => 
{
	return mp.game.invoke("0x04655F9D075D0AE5", p0);
}


// Arg:enabled is [BOOL]	
g_Natives.SET_DEBUG_LINES_AND_SPHERES_DRAWING_ACTIVE = (enabled) => 
{
	return mp.game.invoke("0x175B6BFC15CDD0C5", enabled);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_LINE = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x7FDFADE676AA3CB0", x1, y1, z1, x2, y2, z2, red, green, blue, alpha);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:r1 is [int]	Arg:g1 is [int]	Arg:b1 is [int]	Arg:r2 is [int]	Arg:g2 is [int]	Arg:b2 is [int]	Arg:alpha1 is [int]	Arg:alpha2 is [int]	
g_Natives.DRAW_DEBUG_LINE_WITH_TWO_COLOURS = (x1, y1, z1, x2, y2, z2, r1, g1, b1, r2, g2, b2, alpha1, alpha2) => 
{
	return mp.game.invoke("0xD8B9A8AC5608FF94", x1, y1, z1, x2, y2, z2, r1, g1, b1, r2, g2, b2, alpha1, alpha2);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_SPHERE = (x, y, z, radius, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xAAD68E1AB39DA632", x, y, z, radius, red, green, blue, alpha);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_BOX = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x083A2CA4F2E573BD", x1, y1, z1, x2, y2, z2, red, green, blue, alpha);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:size is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_CROSS = (x, y, z, size, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x73B1189623049839", x, y, z, size, red, green, blue, alpha);
}


// Arg:text is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_TEXT = (text, x, y, z, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x3903E216620488E8", text, x, y, z, red, green, blue, alpha);
}


// Arg:text is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_DEBUG_TEXT_2D = (text, x, y, z, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xA3BB2E9555C05A8F", text, x, y, z, red, green, blue, alpha);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_LINE = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x6B7256074AE34680", x1, y1, z1, x2, y2, z2, red, green, blue, alpha);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:x3 is [float]	Arg:y3 is [float]	Arg:z3 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_POLY = (x1, y1, z1, x2, y2, z2, x3, y3, z3, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xAC26716048436851", x1, y1, z1, x2, y2, z2, x3, y3, z3, red, green, blue, alpha);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_BOX = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xD3A9971CADAC7252", x1, y1, z1, x2, y2, z2, red, green, blue, alpha);
}


// Arg:toggle is [BOOL]	
g_Natives["0x23BA6B0C2AD7B0D3"] = (toggle) => 
{
	return mp.game.invoke("0x23BA6B0C2AD7B0D3", toggle);
}

g_Natives["0x1DD2139A9A20DCE8"] = () => 
{
	return mp.game.invoke("0x1DD2139A9A20DCE8");
}

g_Natives["0x90A78ECAA4E78453"] = () => 
{
	return mp.game.invoke("0x90A78ECAA4E78453");
}

g_Natives["0x0A46AF8A78DC5E0A"] = () => 
{
	return mp.game.invoke("0x0A46AF8A78DC5E0A");
}


// Arg:p0 is [char*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [BOOL]	
g_Natives["0x4862437A486F91B0"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x4862437A486F91B0", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0x1670F8D05056F257"] = (p0) => 
{
	return mp.game.invoke("0x1670F8D05056F257", p0);
}

g_Natives["0x7FA5D82B8F58EC06"] = () => 
{
	return mp.game.invoke("0x7FA5D82B8F58EC06");
}

g_Natives["0x5B0316762AFD4A64"] = () => 
{
	return mp.game.invoke("0x5B0316762AFD4A64");
}

g_Natives["0x346EF3ECAAAB149E"] = () => 
{
	return mp.game.invoke("0x346EF3ECAAAB149E");
}

g_Natives["0xA67C35C56EB1BD9D"] = () => 
{
	return mp.game.invoke("0xA67C35C56EB1BD9D");
}

g_Natives["0x0D6CA79EEEBD8CA3"] = () => 
{
	return mp.game.invoke("0x0D6CA79EEEBD8CA3");
}

g_Natives["0xD801CC02177FA3F1"] = () => 
{
	return mp.game.invoke("0xD801CC02177FA3F1");
}


// Arg:p0 is [BOOL]	
g_Natives["0x1BBC135A4D25EDDE"] = (p0) => 
{
	return mp.game.invoke("0x1BBC135A4D25EDDE", p0);
}


// Arg:p0 is [int]	
g_Natives["0x3DEC726C25A11BAC"] = (p0) => 
{
	return mp.game.invoke("0x3DEC726C25A11BAC", p0);
}

g_Natives["0x0C0C4E81E1AC60A0"] = () => 
{
	return mp.game.invoke("0x0C0C4E81E1AC60A0");
}


// Arg:p0 is [int]	
g_Natives["0x759650634F07B6B4"] = (p0) => 
{
	return mp.game.invoke("0x759650634F07B6B4", p0);
}


// Arg:p0 is [int]	
g_Natives["0xCB82A0BF0E3E3265"] = (p0) => 
{
	return mp.game.invoke("0xCB82A0BF0E3E3265", p0);
}

g_Natives["0x6A12D88881435DCA"] = () => 
{
	return mp.game.invoke("0x6A12D88881435DCA");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives["0x1072F115DAB0717E"] = (p0, p1) => 
{
	return mp.game.invoke("0x1072F115DAB0717E", p0, p1);
}

g_Natives.GET_MAXIMUM_NUMBER_OF_PHOTOS = () => 
{
	return mp.game.invoke("0x34D23450F028B0BF");
}

g_Natives._GET_MAXIMUM_NUMBER_OF_PHOTOS_2 = () => 
{
	return mp.game.invoke("0xDC54A7AF8B3A14EF");
}

g_Natives._GET_NUMBER_OF_PHOTOS = () => 
{
	return mp.game.invoke("0x473151EBC762C6DA");
}


// Arg:p0 is [BOOL]	
g_Natives["0x2A893980E96B659A"] = (p0) => 
{
	return mp.game.invoke("0x2A893980E96B659A", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xF5BED327CEA362B1"] = (p0) => 
{
	return mp.game.invoke("0xF5BED327CEA362B1", p0);
}

g_Natives["0x4AF92ACD3141D96C"] = () => 
{
	return mp.game.invoke("0x4AF92ACD3141D96C");
}


// Arg:p0 is [Any]	
g_Natives["0xE791DF1F73ED2C8B"] = (p0) => 
{
	return mp.game.invoke("0xE791DF1F73ED2C8B", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xEC72C258667BE5EA"] = (p0) => 
{
	return mp.game.invoke("0xEC72C258667BE5EA", p0);
}


// Arg:p0 is [Any]	
g_Natives._GET_LIVEAREA_SOMETHING = (p0) => 
{
	return mp.game.invoke("0x40AFB081F8ADD4EE", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:range is [float]	Arg:intensity is [float]	Arg:shadow is [float]	
g_Natives._DRAW_LIGHT_WITH_RANGE_AND_SHADOW = (x, y, z, r, g, b, range, intensity, shadow) => 
{
	return mp.game.invoke("0xF49E9A9716A04595", x, y, z, r, g, b, range, intensity, shadow);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:colorR is [int]	Arg:colorG is [int]	Arg:colorB is [int]	Arg:range is [float]	Arg:intensity is [float]	
g_Natives.DRAW_LIGHT_WITH_RANGE = (posX, posY, posZ, colorR, colorG, colorB, range, intensity) => 
{
	return mp.game.invoke("0xF2A1B2771A01DBD4", posX, posY, posZ, colorR, colorG, colorB, range, intensity);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:dirX is [float]	Arg:dirY is [float]	Arg:dirZ is [float]	Arg:colorR is [int]	Arg:colorG is [int]	Arg:colorB is [int]	Arg:distance is [float]	Arg:brightness is [float]	Arg:hardness is [float]	Arg:radius is [float]	Arg:falloff is [float]	
g_Natives.DRAW_SPOT_LIGHT = (posX, posY, posZ, dirX, dirY, dirZ, colorR, colorG, colorB, distance, brightness, hardness, radius, falloff) => 
{
	return mp.game.invoke("0xD0F64B265C8C8B33", posX, posY, posZ, dirX, dirY, dirZ, colorR, colorG, colorB, distance, brightness, hardness, radius, falloff);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:dirX is [float]	Arg:dirY is [float]	Arg:dirZ is [float]	Arg:colorR is [int]	Arg:colorG is [int]	Arg:colorB is [int]	Arg:distance is [float]	Arg:brightness is [float]	Arg:roundness is [float]	Arg:radius is [float]	Arg:falloff is [float]	Arg:shadowId is [int]	
g_Natives._DRAW_SPOT_LIGHT_WITH_SHADOW = (posX, posY, posZ, dirX, dirY, dirZ, colorR, colorG, colorB, distance, brightness, roundness, radius, falloff, shadowId) => 
{
	return mp.game.invoke("0x5BCA583A583194DB", posX, posY, posZ, dirX, dirY, dirZ, colorR, colorG, colorB, distance, brightness, roundness, radius, falloff, shadowId);
}


// Arg:p0 is [float]	
g_Natives["0xC9B18B4619F48F7B"] = (p0) => 
{
	return mp.game.invoke("0xC9B18B4619F48F7B", p0);
}


// Arg:entity is [Entity]	
g_Natives._ENTITY_DESCRIPTION_TEXT = (entity) => 
{
	return mp.game.invoke("0xDEADC0DEDEADC0DE", entity);
}


// Arg:type is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:dirX is [float]	Arg:dirY is [float]	Arg:dirZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:scaleX is [float]	Arg:scaleY is [float]	Arg:scaleZ is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	Arg:bobUpAndDown is [BOOL]	Arg:faceCamera is [BOOL]	Arg:p19 is [int]	Arg:rotate is [BOOL]	Arg:textureDict is [char*]	Arg:textureName is [char*]	Arg:drawOnEnts is [BOOL]	
g_Natives.DRAW_MARKER = (type, posX, posY, posZ, dirX, dirY, dirZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, red, green, blue, alpha, bobUpAndDown, faceCamera, p19, rotate, textureDict, textureName, drawOnEnts) => 
{
	return mp.game.invoke("0x28477EC23D892089", type, posX, posY, posZ, dirX, dirY, dirZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, red, green, blue, alpha, bobUpAndDown, faceCamera, p19, rotate, textureDict, textureName, drawOnEnts);
}


// Arg:type is [int]	Arg:posX1 is [float]	Arg:posY1 is [float]	Arg:posZ1 is [float]	Arg:posX2 is [float]	Arg:posY2 is [float]	Arg:posZ2 is [float]	Arg:radius is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	Arg:reserved is [int]	
g_Natives.CREATE_CHECKPOINT = (type, posX1, posY1, posZ1, posX2, posY2, posZ2, radius, red, green, blue, alpha, reserved) => 
{
	return mp.game.invoke("0x0134F0835AB6BFCB", type, posX1, posY1, posZ1, posX2, posY2, posZ2, radius, red, green, blue, alpha, reserved);
}


// Arg:checkpoint is [int]	Arg:iconHeight is [float]	
g_Natives._SET_CHECKPOINT_ICON_HEIGHT = (checkpoint, iconHeight) => 
{
	return mp.game.invoke("0x4B5B4DA5D79F1943", checkpoint, iconHeight);
}


// Arg:checkpoint is [int]	Arg:nearHeight is [float]	Arg:farHeight is [float]	Arg:radius is [float]	
g_Natives.SET_CHECKPOINT_CYLINDER_HEIGHT = (checkpoint, nearHeight, farHeight, radius) => 
{
	return mp.game.invoke("0x2707AAE9D9297D89", checkpoint, nearHeight, farHeight, radius);
}


// Arg:checkpoint is [int]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.SET_CHECKPOINT_RGBA = (checkpoint, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x7167371E8AD747F7", checkpoint, red, green, blue, alpha);
}


// Arg:checkpoint is [int]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives._SET_CHECKPOINT_ICON_RGBA = (checkpoint, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xB9EA40907C680580", checkpoint, red, green, blue, alpha);
}


// Arg:checkpoint is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:unkX is [float]	Arg:unkY is [float]	Arg:unkZ is [float]	
g_Natives["0xF51D36185993515D"] = (checkpoint, posX, posY, posZ, unkX, unkY, unkZ) => 
{
	return mp.game.invoke("0xF51D36185993515D", checkpoint, posX, posY, posZ, unkX, unkY, unkZ);
}


// Arg:checkpoint is [int]	
g_Natives["0x615D3925E87A3B26"] = (checkpoint) => 
{
	return mp.game.invoke("0x615D3925E87A3B26", checkpoint);
}


// Arg:checkpoint is [int]	
g_Natives.DELETE_CHECKPOINT = (checkpoint) => 
{
	return mp.game.invoke("0xF5ED37F54CD4D52E", checkpoint);
}


// Arg:p0 is [BOOL]	
g_Natives["0x22A249A53034450A"] = (p0) => 
{
	return mp.game.invoke("0x22A249A53034450A", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xDC459CFA0CCE245B"] = (p0) => 
{
	return mp.game.invoke("0xDC459CFA0CCE245B", p0);
}


// Arg:textureDict is [char*]	Arg:unused is [BOOL]	
g_Natives.REQUEST_STREAMED_TEXTURE_DICT = (textureDict, unused) => 
{
	return mp.game.invoke("0xDFA2EF8E04127DD5", textureDict, unused);
}


// Arg:textureDict is [char*]	
g_Natives.HAS_STREAMED_TEXTURE_DICT_LOADED = (textureDict) => 
{
	return mp.game.invoke("0x0145F696AAAAD2E4", textureDict);
}


// Arg:textureDict is [char*]	
g_Natives.SET_STREAMED_TEXTURE_DICT_AS_NO_LONGER_NEEDED = (textureDict) => 
{
	return mp.game.invoke("0xBE2CACCF5A8AA805", textureDict);
}


// Arg:x is [float]	Arg:y is [float]	Arg:width is [float]	Arg:height is [float]	Arg:r is [int]	Arg:g is [int]	Arg:b is [int]	Arg:a is [int]	
g_Natives.DRAW_RECT = (x, y, width, height, r, g, b, a) => 
{
	return mp.game.invoke("0x3A618A217E5154F0", x, y, width, height, r, g, b, a);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU = (p0) => 
{
	return mp.game.invoke("0xC6372ECD45D73BCD", p0);
}


// Arg:layer is [int]	
g_Natives._SET_UI_LAYER = (layer) => 
{
	return mp.game.invoke("0x61BB1D9B3A95D802", layer);
}


// Arg:x is [int]	Arg:y is [int]	
g_Natives.SET_SCRIPT_GFX_ALIGN = (x, y) => 
{
	return mp.game.invoke("0xB8A850F20A067EB6", x, y);
}

g_Natives.RESET_SCRIPT_GFX_ALIGN = () => 
{
	return mp.game.invoke("0xE3A3DB414A373DAB");
}


// Arg:x is [float]	Arg:y is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives._SCREEN_DRAW_POSITION_RATIO = (x, y, p2, p3) => 
{
	return mp.game.invoke("0xF5A2C681787E579D", x, y, p2, p3);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float*]	Arg:p3 is [float*]	
g_Natives["0x6DD8F5AA635EB4B2"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6DD8F5AA635EB4B2", p0, p1, p2, p3);
}

g_Natives.GET_SAFE_ZONE_SIZE = () => 
{
	return mp.game.invoke("0xBAF107B6BB2C97F0");
}


// Arg:textureDict is [char*]	Arg:textureName is [char*]	Arg:screenX is [float]	Arg:screenY is [float]	Arg:width is [float]	Arg:height is [float]	Arg:heading is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_SPRITE = (textureDict, textureName, screenX, screenY, width, height, heading, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xE7FFAE5EBF23D890", textureDict, textureName, screenX, screenY, width, height, heading, red, green, blue, alpha);
}


// Arg:entity is [Entity]	Arg:icon is [char*]	
g_Natives.ADD_ENTITY_ICON = (entity, icon) => 
{
	return mp.game.invoke("0x9CD43EEE12BF4DD0", entity, icon);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.SET_ENTITY_ICON_VISIBILITY = (entity, toggle) => 
{
	return mp.game.invoke("0xE0E8BEECCA96BA31", entity, toggle);
}


// Arg:entity is [Entity]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.SET_ENTITY_ICON_COLOR = (entity, red, green, blue, alpha) => 
{
	return mp.game.invoke("0x1D5F595CCAE2E238", entity, red, green, blue, alpha);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [Any]	
g_Natives.SET_DRAW_ORIGIN = (x, y, z, p3) => 
{
	return mp.game.invoke("0xAA0008F3BBB8F416", x, y, z, p3);
}

g_Natives.CLEAR_DRAW_ORIGIN = () => 
{
	return mp.game.invoke("0xFF0B610F6BE0D7AF");
}


// Arg:entity is [Entity]	
g_Natives.ATTACH_TV_AUDIO_TO_ENTITY = (entity) => 
{
	return mp.game.invoke("0x845BAD77CC770633", entity);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_TV_AUDIO_FRONTEND = (toggle) => 
{
	return mp.game.invoke("0x113D2C5DC57E1774", toggle);
}


// Arg:movieMeshSetName is [char*]	
g_Natives.LOAD_MOVIE_MESH_SET = (movieMeshSetName) => 
{
	return mp.game.invoke("0xB66064452270E8F1", movieMeshSetName);
}


// Arg:movieMeshSet is [int]	
g_Natives.RELEASE_MOVIE_MESH_SET = (movieMeshSet) => 
{
	return mp.game.invoke("0xEB119AA014E89183", movieMeshSet);
}


// Arg:p0 is [Any]	
g_Natives["0x9B6E70C5CEEF4EEB"] = (p0) => 
{
	return mp.game.invoke("0x9B6E70C5CEEF4EEB", p0);
}


// Arg:x is [int*]	Arg:y is [int*]	
g_Natives.GET_SCREEN_RESOLUTION = (x, y) => 
{
	return mp.game.invoke("0x888D57E407E63624", x, y);
}


// Arg:x is [int*]	Arg:y is [int*]	
g_Natives._GET_ACTIVE_SCREEN_RESOLUTION = (x, y) => 
{
	return mp.game.invoke("0x873C9F3104101DD3", x, y);
}


// Arg:b is [BOOL]	
g_Natives._GET_ASPECT_RATIO = (b) => 
{
	return mp.game.invoke("0xF1307EF624A80D87", b);
}

g_Natives["0xB2EBE8CBC58B90E9"] = () => 
{
	return mp.game.invoke("0xB2EBE8CBC58B90E9");
}

g_Natives.GET_IS_WIDESCREEN = () => 
{
	return mp.game.invoke("0x30CF4BDA4FCB1905");
}

g_Natives.GET_IS_HIDEF = () => 
{
	return mp.game.invoke("0x84ED31191CC5D2C9");
}

g_Natives["0xEFABC7722293DA7C"] = () => 
{
	return mp.game.invoke("0xEFABC7722293DA7C");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_NIGHTVISION = (toggle) => 
{
	return mp.game.invoke("0x18F621F7A5B1F85D", toggle);
}

g_Natives["0x35FB78DC42B7BD21"] = () => 
{
	return mp.game.invoke("0x35FB78DC42B7BD21");
}

g_Natives._IS_NIGHTVISION_ACTIVE = () => 
{
	return mp.game.invoke("0x2202A3F42C8E5F79");
}


// Arg:p0 is [BOOL]	
g_Natives["0xEF398BEEE4EF45F9"] = (p0) => 
{
	return mp.game.invoke("0xEF398BEEE4EF45F9", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_NOISEOVERIDE = (toggle) => 
{
	return mp.game.invoke("0xE787BF1C5CF823C9", toggle);
}


// Arg:value is [float]	
g_Natives.SET_NOISINESSOVERIDE = (value) => 
{
	return mp.game.invoke("0xCB6A7C3BB17A0C67", value);
}


// Arg:worldX is [float]	Arg:worldY is [float]	Arg:worldZ is [float]	Arg:screenX is [float*]	Arg:screenY is [float*]	
g_Natives.GET_SCREEN_COORD_FROM_WORLD_COORD = (worldX, worldY, worldZ, screenX, screenY) => 
{
	return mp.game.invoke("0x34E82F05DF2974F5", worldX, worldY, worldZ, screenX, screenY);
}


// Arg:textureDict is [char*]	Arg:textureName is [char*]	
g_Natives.GET_TEXTURE_RESOLUTION = (textureDict, textureName) => 
{
	return mp.game.invoke("0x35736EE65BD00C11", textureDict, textureName);
}


// Arg:p0 is [float]	
g_Natives["0xE2892E7E55D7073A"] = (p0) => 
{
	return mp.game.invoke("0xE2892E7E55D7073A", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:fadeIn is [float]	Arg:duration is [float]	Arg:fadeOut is [float]	
g_Natives.SET_FLASH = (p0, p1, fadeIn, duration, fadeOut) => 
{
	return mp.game.invoke("0x0AB84296FED9CFC6", p0, p1, fadeIn, duration, fadeOut);
}

g_Natives["0x3669F1B198DCAA4F"] = () => 
{
	return mp.game.invoke("0x3669F1B198DCAA4F");
}


// Arg:state is [BOOL]	
g_Natives.SET_ARTIFICIAL_LIGHTS_STATE = (state) => 
{
	return mp.game.invoke("0x1268615ACE24D504", state);
}

g_Natives["0xC35A6D07C93802B2"] = () => 
{
	return mp.game.invoke("0xC35A6D07C93802B2");
}

g_Natives.CREATE_TRACKED_POINT = () => 
{
	return mp.game.invoke("0xE2C9439ED45DEA60");
}


// Arg:point is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.SET_TRACKED_POINT_INFO = (point, x, y, z, radius) => 
{
	return mp.game.invoke("0x164ECBB3CF750CB0", point, x, y, z, radius);
}


// Arg:point is [int]	
g_Natives.IS_TRACKED_POINT_VISIBLE = (point) => 
{
	return mp.game.invoke("0xC45CCDAAC9221CA8", point);
}


// Arg:point is [int]	
g_Natives.DESTROY_TRACKED_POINT = (point) => 
{
	return mp.game.invoke("0xB25DC90BAD56CA42", point);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xBE197EAA669238F4"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xBE197EAA669238F4", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0x61F95E5BB3E0A8C6"] = (p0) => 
{
	return mp.game.invoke("0x61F95E5BB3E0A8C6", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	
g_Natives["0xAE51BC858F32BA66"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xAE51BC858F32BA66", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	
g_Natives["0x649C97D52332341A"] = (p0) => 
{
	return mp.game.invoke("0x649C97D52332341A", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x2C42340F916C5930"] = (p0) => 
{
	return mp.game.invoke("0x2C42340F916C5930", p0);
}

g_Natives["0x14FC5833464340A8"] = () => 
{
	return mp.game.invoke("0x14FC5833464340A8");
}

g_Natives["0x0218BA067D249DEA"] = () => 
{
	return mp.game.invoke("0x0218BA067D249DEA");
}

g_Natives["0x1612C45F9E3E0D44"] = () => 
{
	return mp.game.invoke("0x1612C45F9E3E0D44");
}

g_Natives["0x5DEBD9C4DC995692"] = () => 
{
	return mp.game.invoke("0x5DEBD9C4DC995692");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives["0x6D955F6A9E0295B1"] = (x, y, z, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x6D955F6A9E0295B1", x, y, z, p3, p4, p5, p6);
}

g_Natives["0x302C91AB2D477F7E"] = () => 
{
	return mp.game.invoke("0x302C91AB2D477F7E");
}

g_Natives["0x03FC694AE06C5A20"] = () => 
{
	return mp.game.invoke("0x03FC694AE06C5A20");
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [float]	Arg:p6 is [BOOL]	Arg:p7 is [BOOL]	
g_Natives["0xD2936CAB8B58FCBD"] = (p0, p1, x, y, z, p5, p6, p7) => 
{
	return mp.game.invoke("0xD2936CAB8B58FCBD", p0, p1, x, y, z, p5, p6, p7);
}


// Arg:p0 is [float]	
g_Natives["0x5F0F3F56635809EF"] = (p0) => 
{
	return mp.game.invoke("0x5F0F3F56635809EF", p0);
}


// Arg:p0 is [float]	
g_Natives["0x5E9DAF5A20F15908"] = (p0) => 
{
	return mp.game.invoke("0x5E9DAF5A20F15908", p0);
}


// Arg:p0 is [float]	
g_Natives["0x36F6626459D91457"] = (p0) => 
{
	return mp.game.invoke("0x36F6626459D91457", p0);
}


// Arg:toggle is [BOOL]	
g_Natives._SET_FAR_SHADOWS_SUPPRESSED = (toggle) => 
{
	return mp.game.invoke("0x80ECBC0C856D3B0B", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x25FC3E33A31AD0C9"] = (p0) => 
{
	return mp.game.invoke("0x25FC3E33A31AD0C9", p0);
}


// Arg:p0 is [char*]	
g_Natives["0xB11D94BC55F41932"] = (p0) => 
{
	return mp.game.invoke("0xB11D94BC55F41932", p0);
}

g_Natives["0x27CB772218215325"] = () => 
{
	return mp.game.invoke("0x27CB772218215325");
}


// Arg:p0 is [BOOL]	
g_Natives["0x6DDBF9DFFC4AC080"] = (p0) => 
{
	return mp.game.invoke("0x6DDBF9DFFC4AC080", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xD39D13C9FEBF0511"] = (p0) => 
{
	return mp.game.invoke("0xD39D13C9FEBF0511", p0);
}


// Arg:p0 is [float]	
g_Natives["0x02AC28F3A01FA04A"] = (p0) => 
{
	return mp.game.invoke("0x02AC28F3A01FA04A", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x0AE73D8DF3A762B2"] = (p0) => 
{
	return mp.game.invoke("0x0AE73D8DF3A762B2", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xA51C4B86B71652AE"] = (p0) => 
{
	return mp.game.invoke("0xA51C4B86B71652AE", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [BOOL]	
g_Natives["0x312342E1A4874F3F"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x312342E1A4874F3F", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives["0x2485D34E50A22E84"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2485D34E50A22E84", p0, p1, p2);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:p4 is [int]	Arg:p5 is [int]	Arg:p6 is [int]	Arg:p7 is [int]	Arg:p8 is [int]	Arg:p9 is [int]	Arg:p10 is [int]	Arg:p11 is [int]	
g_Natives["0x12995F2E53FFA601"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x12995F2E53FFA601", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xDBAA5EC848BA2D46"] = (p0, p1) => 
{
	return mp.game.invoke("0xDBAA5EC848BA2D46", p0, p1);
}


// Arg:p0 is [BOOL]	
g_Natives["0xC0416B061F2B7E5E"] = (p0) => 
{
	return mp.game.invoke("0xC0416B061F2B7E5E", p0);
}


// Arg:type is [int]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:p4 is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives["0xB1BB03742917A5D6"] = (type, xPos, yPos, zPos, p4, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xB1BB03742917A5D6", type, xPos, yPos, zPos, p4, red, green, blue, alpha);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	
g_Natives["0x9CFDD90B2B844BF7"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x9CFDD90B2B844BF7", p0, p1, p2, p3, p4);
}


// Arg:p0 is [BOOL]	
g_Natives["0x06F761EA47C1D3ED"] = (p0) => 
{
	return mp.game.invoke("0x06F761EA47C1D3ED", p0);
}

g_Natives["0xA4819F5E23E2FFAD"] = () => 
{
	return mp.game.invoke("0xA4819F5E23E2FFAD");
}


// Arg:p0 is [Any]	
g_Natives["0xA4664972A9B8F8BA"] = (p0) => 
{
	return mp.game.invoke("0xA4664972A9B8F8BA", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.SET_SEETHROUGH = (toggle) => 
{
	return mp.game.invoke("0x7E08924259E08CE0", toggle);
}

g_Natives._IS_SEETHROUGH_ACTIVE = () => 
{
	return mp.game.invoke("0x44B80ABAB9D80BD3");
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0xD7D0B00177485411"] = (p0, p1) => 
{
	return mp.game.invoke("0xD7D0B00177485411", p0, p1);
}


// Arg:p0 is [float]	
g_Natives["0xB3C641F3630BF6DA"] = (p0) => 
{
	return mp.game.invoke("0xB3C641F3630BF6DA", p0);
}

g_Natives["0xE59343E9E96529E7"] = () => 
{
	return mp.game.invoke("0xE59343E9E96529E7");
}


// Arg:p0 is [BOOL]	
g_Natives["0xE63D7C6EECECB66B"] = (p0) => 
{
	return mp.game.invoke("0xE63D7C6EECECB66B", p0);
}


// Arg:unk is [int]	
g_Natives._SET_UNK_TIMECYCLE_MODIFIER = (unk) => 
{
	return mp.game.invoke("0xE3E2C1B4C59DBC77", unk);
}


// Arg:transitionTime is [float]	
g_Natives._TRANSITION_TO_BLURRED = (transitionTime) => 
{
	return mp.game.invoke("0xA328A24AAA6B7FDC", transitionTime);
}


// Arg:transitionTime is [float]	
g_Natives._TRANSITION_FROM_BLURRED = (transitionTime) => 
{
	return mp.game.invoke("0xEFACC8AEF94430D5", transitionTime);
}

g_Natives["0xDE81239437E8C5A8"] = () => 
{
	return mp.game.invoke("0xDE81239437E8C5A8");
}

g_Natives.IS_PARTICLE_FX_DELAYED_BLINK = () => 
{
	return mp.game.invoke("0x5CCABFFCA31DDE33");
}

g_Natives["0x7B226C785A52A0A9"] = () => 
{
	return mp.game.invoke("0x7B226C785A52A0A9");
}


// Arg:toggle is [BOOL]	
g_Natives._TOGGLE_PAUSE_RENDER_PHASES = (toggle) => 
{
	return mp.game.invoke("0xDFC252D8A3E15AB7", toggle);
}

g_Natives["0xEB3DAC2C86001E5E"] = () => 
{
	return mp.game.invoke("0xEB3DAC2C86001E5E");
}

g_Natives["0xE1C8709406F2C41C"] = () => 
{
	return mp.game.invoke("0xE1C8709406F2C41C");
}

g_Natives["0x851CD923176EBA7C"] = () => 
{
	return mp.game.invoke("0x851CD923176EBA7C");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives["0xBA3D65906822BED5"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xBA3D65906822BED5", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [BOOL]	
g_Natives["0x7AC24EAB6D74118D"] = (p0) => 
{
	return mp.game.invoke("0x7AC24EAB6D74118D", p0);
}

g_Natives["0xBCEDB009461DA156"] = () => 
{
	return mp.game.invoke("0xBCEDB009461DA156");
}


// Arg:textureDict is [char*]	Arg:p1 is [BOOL]	
g_Natives["0x27FEB5254759CDE3"] = (textureDict, p1) => 
{
	return mp.game.invoke("0x27FEB5254759CDE3", textureDict, p1);
}


// Arg:effectName is [char*]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.START_PARTICLE_FX_NON_LOOPED_AT_COORD = (effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0x25129531F77B9ED3", effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:xPos is [float]	Arg:yPos is [float]	Arg:zPos is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.START_NETWORKED_PARTICLE_FX_NON_LOOPED_AT_COORD = (effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0xF56B8137DF10135D", effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:ped is [Ped]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:boneIndex is [int]	Arg:scale is [float]	Arg:axisX is [BOOL]	Arg:axisY is [BOOL]	Arg:axisZ is [BOOL]	
g_Natives.START_PARTICLE_FX_NON_LOOPED_ON_PED_BONE = (effectName, ped, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, boneIndex, scale, axisX, axisY, axisZ) => 
{
	return mp.game.invoke("0x0E7E72961BA18619", effectName, ped, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, boneIndex, scale, axisX, axisY, axisZ);
}


// Arg:effectName is [char*]	Arg:ped is [Ped]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:boneIndex is [int]	Arg:scale is [float]	Arg:axisX is [BOOL]	Arg:axisY is [BOOL]	Arg:axisZ is [BOOL]	
g_Natives.START_NETWORKED_PARTICLE_FX_NON_LOOPED_ON_PED_BONE = (effectName, ped, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, boneIndex, scale, axisX, axisY, axisZ) => 
{
	return mp.game.invoke("0xA41B6A43642AC2CF", effectName, ped, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, boneIndex, scale, axisX, axisY, axisZ);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:scale is [float]	Arg:axisX is [BOOL]	Arg:axisY is [BOOL]	Arg:axisZ is [BOOL]	
g_Natives.START_PARTICLE_FX_NON_LOOPED_ON_ENTITY = (effectName, entity, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, scale, axisX, axisY, axisZ) => 
{
	return mp.game.invoke("0x0D53A3B8DA0809D2", effectName, entity, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, scale, axisX, axisY, axisZ);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:scale is [float]	Arg:axisX is [BOOL]	Arg:axisY is [BOOL]	Arg:axisZ is [BOOL]	
g_Natives._START_NETWORKED_PARTICLE_FX_NON_LOOPED_ON_ENTITY = (effectName, entity, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, scale, axisX, axisY, axisZ) => 
{
	return mp.game.invoke("0xC95EB1DB6E92113D", effectName, entity, offsetX, offsetY, offsetZ, rotX, rotY, rotZ, scale, axisX, axisY, axisZ);
}


// Arg:r is [float]	Arg:g is [float]	Arg:b is [float]	
g_Natives.SET_PARTICLE_FX_NON_LOOPED_COLOUR = (r, g, b) => 
{
	return mp.game.invoke("0x26143A59EF48B262", r, g, b);
}


// Arg:alpha is [float]	
g_Natives.SET_PARTICLE_FX_NON_LOOPED_ALPHA = (alpha) => 
{
	return mp.game.invoke("0x77168D722C58B2FC", alpha);
}


// Arg:p0 is [BOOL]	
g_Natives["0x8CDE909A0370BB3A"] = (p0) => 
{
	return mp.game.invoke("0x8CDE909A0370BB3A", p0);
}


// Arg:effectName is [char*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	Arg:p11 is [BOOL]	
g_Natives.START_PARTICLE_FX_LOOPED_AT_COORD = (effectName, x, y, z, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis, p11) => 
{
	return mp.game.invoke("0xE184F4F0DC5910E7", effectName, x, y, z, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis, p11);
}


// Arg:effectName is [char*]	Arg:ped is [Ped]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:boneIndex is [int]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.START_PARTICLE_FX_LOOPED_ON_PED_BONE = (effectName, ped, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0xF28DA9F38CD1787C", effectName, ped, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.START_PARTICLE_FX_LOOPED_ON_ENTITY = (effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0x1AE42C1660FD6517", effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:boneIndex is [int]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives._START_PARTICLE_FX_LOOPED_ON_ENTITY_BONE = (effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0xC6EB449E33977F0B", effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives.START_NETWORKED_PARTICLE_FX_LOOPED_ON_ENTITY = (effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0x6F60E89A7B64EE1D", effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
}


// Arg:effectName is [char*]	Arg:entity is [Entity]	Arg:xOffset is [float]	Arg:yOffset is [float]	Arg:zOffset is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:boneIndex is [int]	Arg:scale is [float]	Arg:xAxis is [BOOL]	Arg:yAxis is [BOOL]	Arg:zAxis is [BOOL]	
g_Natives._START_NETWORKED_PARTICLE_FX_LOOPED_ON_ENTITY_BONE = (effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis) => 
{
	return mp.game.invoke("0xDDE23F30CC5A0F03", effectName, entity, xOffset, yOffset, zOffset, xRot, yRot, zRot, boneIndex, scale, xAxis, yAxis, zAxis);
}


// Arg:ptfxHandle is [int]	Arg:p1 is [BOOL]	
g_Natives.STOP_PARTICLE_FX_LOOPED = (ptfxHandle, p1) => 
{
	return mp.game.invoke("0x8F75998877616996", ptfxHandle, p1);
}


// Arg:ptfxHandle is [int]	Arg:p1 is [BOOL]	
g_Natives.REMOVE_PARTICLE_FX = (ptfxHandle, p1) => 
{
	return mp.game.invoke("0xC401503DFE8D53CF", ptfxHandle, p1);
}


// Arg:entity is [Entity]	
g_Natives.REMOVE_PARTICLE_FX_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0xB8FEAEEBCC127425", entity);
}


// Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	Arg:radius is [float]	
g_Natives.REMOVE_PARTICLE_FX_IN_RANGE = (X, Y, Z, radius) => 
{
	return mp.game.invoke("0xDD19FA1C6D657305", X, Y, Z, radius);
}


// Arg:ptfxHandle is [int]	
g_Natives.DOES_PARTICLE_FX_LOOPED_EXIST = (ptfxHandle) => 
{
	return mp.game.invoke("0x74AFEF0D2E1E409B", ptfxHandle);
}


// Arg:ptfxHandle is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	
g_Natives.SET_PARTICLE_FX_LOOPED_OFFSETS = (ptfxHandle, x, y, z, rotX, rotY, rotZ) => 
{
	return mp.game.invoke("0xF7DDEBEC43483C43", ptfxHandle, x, y, z, rotX, rotY, rotZ);
}


// Arg:ptfxHandle is [int]	Arg:propertyName is [char*]	Arg:amount is [float]	Arg:Id is [BOOL]	
g_Natives.SET_PARTICLE_FX_LOOPED_EVOLUTION = (ptfxHandle, propertyName, amount, Id) => 
{
	return mp.game.invoke("0x5F0C4B5B1C393BE2", ptfxHandle, propertyName, amount, Id);
}


// Arg:ptfxHandle is [int]	Arg:r is [float]	Arg:g is [float]	Arg:b is [float]	Arg:p4 is [BOOL]	
g_Natives.SET_PARTICLE_FX_LOOPED_COLOUR = (ptfxHandle, r, g, b, p4) => 
{
	return mp.game.invoke("0x7F8F65877F88783B", ptfxHandle, r, g, b, p4);
}


// Arg:ptfxHandle is [int]	Arg:alpha is [float]	
g_Natives.SET_PARTICLE_FX_LOOPED_ALPHA = (ptfxHandle, alpha) => 
{
	return mp.game.invoke("0x726845132380142E", ptfxHandle, alpha);
}


// Arg:ptfxHandle is [int]	Arg:scale is [float]	
g_Natives.SET_PARTICLE_FX_LOOPED_SCALE = (ptfxHandle, scale) => 
{
	return mp.game.invoke("0xB44250AAA456492D", ptfxHandle, scale);
}


// Arg:ptfxHandle is [int]	Arg:dist is [float]	
g_Natives.SET_PARTICLE_FX_LOOPED_FAR_CLIP_DIST = (ptfxHandle, dist) => 
{
	return mp.game.invoke("0xDCB194B85EF7B541", ptfxHandle, dist);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_PARTICLE_FX_CAM_INSIDE_VEHICLE = (p0) => 
{
	return mp.game.invoke("0xEEC4047028426510", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives.SET_PARTICLE_FX_CAM_INSIDE_NONPLAYER_VEHICLE = (p0, p1) => 
{
	return mp.game.invoke("0xACEE6F360FC1F6B6", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.SET_PARTICLE_FX_SHOOTOUT_BOAT = (p0) => 
{
	return mp.game.invoke("0x96EF97DAEB89BEF5", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_PARTICLE_FX_BLOOD_SCALE = (p0) => 
{
	return mp.game.invoke("0x5F6DF3D92271E8A1", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.ENABLE_CLOWN_BLOOD_VFX = (toggle) => 
{
	return mp.game.invoke("0xD821490579791273", toggle);
}


// Arg:Toggle is [BOOL]	
g_Natives.ENABLE_ALIEN_BLOOD_VFX = (Toggle) => 
{
	return mp.game.invoke("0x9DCE1F0F78260875", Toggle);
}


// Arg:p0 is [float]	
g_Natives["0x27E32866E9A5C416"] = (p0) => 
{
	return mp.game.invoke("0x27E32866E9A5C416", p0);
}


// Arg:p0 is [float]	
g_Natives["0xBB90E12CAC1DAB25"] = (p0) => 
{
	return mp.game.invoke("0xBB90E12CAC1DAB25", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xCA4AE345A153D573"] = (p0) => 
{
	return mp.game.invoke("0xCA4AE345A153D573", p0);
}


// Arg:p0 is [float]	
g_Natives["0x54E22EA2C1956A8D"] = (p0) => 
{
	return mp.game.invoke("0x54E22EA2C1956A8D", p0);
}


// Arg:p0 is [float]	
g_Natives["0x949F397A288B28B3"] = (p0) => 
{
	return mp.game.invoke("0x949F397A288B28B3", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x9B079E5221D984D3"] = (p0) => 
{
	return mp.game.invoke("0x9B079E5221D984D3", p0);
}


// Arg:name is [char*]	
g_Natives.USE_PARTICLE_FX_ASSET = (name) => 
{
	return mp.game.invoke("0x6C38AF3693A69A91", name);
}


// Arg:oldAsset is [char*]	Arg:newAsset is [char*]	
g_Natives._SET_PARTICLE_FX_ASSET_OLD_TO_NEW = (oldAsset, newAsset) => 
{
	return mp.game.invoke("0xEA1E2D93F6F75ED9", oldAsset, newAsset);
}


// Arg:name is [char*]	
g_Natives._RESET_PARTICLE_FX_ASSET_OLD_TO_NEW = (name) => 
{
	return mp.game.invoke("0x89C8553DD3274AAE", name);
}


// Arg:p0 is [BOOL]	
g_Natives["0xA46B73FAA3460AE1"] = (p0) => 
{
	return mp.game.invoke("0xA46B73FAA3460AE1", p0);
}


// Arg:p0 is [float]	
g_Natives["0xF78B803082D4386F"] = (p0) => 
{
	return mp.game.invoke("0xF78B803082D4386F", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:intensity is [float]	
g_Natives.WASH_DECALS_IN_RANGE = (x, y, z, radius, intensity) => 
{
	return mp.game.invoke("0x9C30613D50A6ADEF", x, y, z, radius, intensity);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [float]	
g_Natives.WASH_DECALS_FROM_VEHICLE = (vehicle, p1) => 
{
	return mp.game.invoke("0x5B712761429DBC14", vehicle, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.FADE_DECALS_IN_RANGE = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xD77EDADB0420E6E0", p0, p1, p2, p3, p4);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:range is [float]	
g_Natives.REMOVE_DECALS_IN_RANGE = (x, y, z, range) => 
{
	return mp.game.invoke("0x5D6B2D4830A67C62", x, y, z, range);
}


// Arg:obj is [Object]	
g_Natives.REMOVE_DECALS_FROM_OBJECT = (obj) => 
{
	return mp.game.invoke("0xCCF71CBDDF5B6CB9", obj);
}


// Arg:obj is [Object]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.REMOVE_DECALS_FROM_OBJECT_FACING = (obj, x, y, z) => 
{
	return mp.game.invoke("0xA6F6F70FDC6D144C", obj, x, y, z);
}


// Arg:vehicle is [Vehicle]	
g_Natives.REMOVE_DECALS_FROM_VEHICLE = (vehicle) => 
{
	return mp.game.invoke("0xE91F1B65F2B48D57", vehicle);
}


// Arg:decalType is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:width is [float]	Arg:height is [float]	Arg:rCoef is [float]	Arg:gCoef is [float]	Arg:bCoef is [float]	Arg:opacity is [float]	Arg:timeout is [float]	Arg:p17 is [BOOL]	Arg:p18 is [BOOL]	Arg:p19 is [BOOL]	
g_Natives.ADD_DECAL = (decalType, posX, posY, posZ, p4, p5, p6, p7, p8, p9, width, height, rCoef, gCoef, bCoef, opacity, timeout, p17, p18, p19) => 
{
	return mp.game.invoke("0xB302244A1839BDAD", decalType, posX, posY, posZ, p4, p5, p6, p7, p8, p9, width, height, rCoef, gCoef, bCoef, opacity, timeout, p17, p18, p19);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:groundLvl is [float]	Arg:width is [float]	Arg:transparency is [float]	
g_Natives.ADD_PETROL_DECAL = (x, y, z, groundLvl, width, transparency) => 
{
	return mp.game.invoke("0x4F5212C7AD880DF8", x, y, z, groundLvl, width, transparency);
}


// Arg:p0 is [float]	
g_Natives._START_PETROL_TRAIL_DECALS = (p0) => 
{
	return mp.game.invoke("0x99AC7F0D8B9C893D", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x967278682CB6967A"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x967278682CB6967A", p0, p1, p2, p3);
}

g_Natives._END_PETROL_TRAIL_DECALS = () => 
{
	return mp.game.invoke("0x0A123435A26C36CD");
}


// Arg:decal is [Object]	
g_Natives.REMOVE_DECAL = (decal) => 
{
	return mp.game.invoke("0xED3F346429CCD659", decal);
}


// Arg:decal is [Object]	
g_Natives.IS_DECAL_ALIVE = (decal) => 
{
	return mp.game.invoke("0xC694D74949CAFD0C", decal);
}


// Arg:decal is [int]	
g_Natives.GET_DECAL_WASH_LEVEL = (decal) => 
{
	return mp.game.invoke("0x323F647679A09103", decal);
}

g_Natives["0xD9454B5752C857DC"] = () => 
{
	return mp.game.invoke("0xD9454B5752C857DC");
}

g_Natives["0x27CFB1B1E078CB2D"] = () => 
{
	return mp.game.invoke("0x27CFB1B1E078CB2D");
}

g_Natives["0x4B5CFC83122DF602"] = () => 
{
	return mp.game.invoke("0x4B5CFC83122DF602");
}


// Arg:xCoord is [float]	Arg:yCoord is [float]	Arg:zCoord is [float]	Arg:p3 is [float]	
g_Natives["0x2F09F7976C512404"] = (xCoord, yCoord, zCoord, p3) => 
{
	return mp.game.invoke("0x2F09F7976C512404", xCoord, yCoord, zCoord, p3);
}


// Arg:decalType is [int]	Arg:textureDict is [char*]	Arg:textureName is [char*]	
g_Natives._OVERRIDE_DECAL_TEXTURE = (decalType, textureDict, textureName) => 
{
	return mp.game.invoke("0x8A35C742130C6080", decalType, textureDict, textureName);
}


// Arg:decalType is [int]	
g_Natives["0xB7ED70C49521A61D"] = (decalType) => 
{
	return mp.game.invoke("0xB7ED70C49521A61D", decalType);
}


// Arg:vehicle1 is [Vehicle]	Arg:vehicle2 is [Vehicle]	
g_Natives.MOVE_VEHICLE_DECALS = (vehicle1, vehicle2) => 
{
	return mp.game.invoke("0x84C8D7C2D30D3280", vehicle1, vehicle2);
}


// Arg:vehicle is [Vehicle]	Arg:ped is [Ped]	Arg:boneIndex is [int]	Arg:x1 is [float]	Arg:x2 is [float]	Arg:x3 is [float]	Arg:y1 is [float]	Arg:y2 is [float]	Arg:y3 is [float]	Arg:z1 is [float]	Arg:z2 is [float]	Arg:z3 is [float]	Arg:scale is [float]	Arg:decalIndex is [int]	Arg:alpha is [int]	
g_Natives._ADD_CLAN_DECAL_TO_VEHICLE = (vehicle, ped, boneIndex, x1, x2, x3, y1, y2, y3, z1, z2, z3, scale, decalIndex, alpha) => 
{
	return mp.game.invoke("0x428BDCB9DA58DA53", vehicle, ped, boneIndex, x1, x2, x3, y1, y2, y3, z1, z2, z3, scale, decalIndex, alpha);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives["0xD2300034310557E4"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xD2300034310557E4", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:p1 is [Any]	
g_Natives["0xFE26117A5841B2FF"] = (vehicle, p1) => 
{
	return mp.game.invoke("0xFE26117A5841B2FF", vehicle, p1);
}


// Arg:vehicle is [Vehicle]	Arg:decalIndex is [int]	
g_Natives._DOES_VEHICLE_HAVE_DECAL = (vehicle, decalIndex) => 
{
	return mp.game.invoke("0x060D935D3981A275", vehicle, decalIndex);
}


// Arg:p0 is [BOOL]	
g_Natives["0x0E4299C549F0D1F1"] = (p0) => 
{
	return mp.game.invoke("0x0E4299C549F0D1F1", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x02369D5C8A51FDCF"] = (p0) => 
{
	return mp.game.invoke("0x02369D5C8A51FDCF", p0);
}


// Arg:p0 is [float]	
g_Natives["0x46D1A61A21F566FC"] = (p0) => 
{
	return mp.game.invoke("0x46D1A61A21F566FC", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x2A2A52824DB96700"] = (p0) => 
{
	return mp.game.invoke("0x2A2A52824DB96700", p0);
}


// Arg:p0 is [float]	
g_Natives["0x1600FD8CF72EBC12"] = (p0) => 
{
	return mp.game.invoke("0x1600FD8CF72EBC12", p0);
}

g_Natives["0xEFB55E7C25D3B3BE"] = () => 
{
	return mp.game.invoke("0xEFB55E7C25D3B3BE");
}

g_Natives["0xA44FF770DFBC5DAE"] = () => 
{
	return mp.game.invoke("0xA44FF770DFBC5DAE");
}


// Arg:toggle is [BOOL]	
g_Natives.DISABLE_VEHICLE_DISTANTLIGHTS = (toggle) => 
{
	return mp.game.invoke("0xC9F98AC1884E73A2", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x03300B57FCAC6DDB"] = (p0) => 
{
	return mp.game.invoke("0x03300B57FCAC6DDB", p0);
}

g_Natives["0x98EDF76A7271E4F2"] = () => 
{
	return mp.game.invoke("0x98EDF76A7271E4F2");
}


// Arg:toggle is [BOOL]	
g_Natives._SET_FORCE_PED_FOOTSTEPS_TRACKS = (toggle) => 
{
	return mp.game.invoke("0xAEEDAD1420C65CC0", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives._SET_FORCE_VEHICLE_TRAILS = (toggle) => 
{
	return mp.game.invoke("0x4CC7F0FEA5283FE0", toggle);
}


// Arg:tcModifierName is [char*]	
g_Natives._PRESET_INTERIOR_AMBIENT_CACHE = (tcModifierName) => 
{
	return mp.game.invoke("0xD7021272EB0A451E", tcModifierName);
}


// Arg:modifierName is [char*]	
g_Natives.SET_TIMECYCLE_MODIFIER = (modifierName) => 
{
	return mp.game.invoke("0x2C933ABF17A1DF41", modifierName);
}


// Arg:strength is [float]	
g_Natives.SET_TIMECYCLE_MODIFIER_STRENGTH = (strength) => 
{
	return mp.game.invoke("0x82E7FFCD5B2326B3", strength);
}


// Arg:modifierName is [char*]	Arg:transition is [float]	
g_Natives.SET_TRANSITION_TIMECYCLE_MODIFIER = (modifierName, transition) => 
{
	return mp.game.invoke("0x3BCF567485E1971C", modifierName, transition);
}


// Arg:p0 is [float]	
g_Natives["0x1CBA05AE7BD7EE05"] = (p0) => 
{
	return mp.game.invoke("0x1CBA05AE7BD7EE05", p0);
}

g_Natives.CLEAR_TIMECYCLE_MODIFIER = () => 
{
	return mp.game.invoke("0x0F07E7745A236711");
}

g_Natives.GET_TIMECYCLE_MODIFIER_INDEX = () => 
{
	return mp.game.invoke("0xFDF3D97C674AFB66");
}

g_Natives["0x459FD2C8D0AB78BC"] = () => 
{
	return mp.game.invoke("0x459FD2C8D0AB78BC");
}

g_Natives.PUSH_TIMECYCLE_MODIFIER = () => 
{
	return mp.game.invoke("0x58F735290861E6B4");
}

g_Natives.POP_TIMECYCLE_MODIFIER = () => 
{
	return mp.game.invoke("0x3C8938D7D872211E");
}


// Arg:p0 is [char*]	
g_Natives["0xBBF327DED94E4DEB"] = (p0) => 
{
	return mp.game.invoke("0xBBF327DED94E4DEB", p0);
}


// Arg:p0 is [float]	
g_Natives["0xBDEB86F4D5809204"] = (p0) => 
{
	return mp.game.invoke("0xBDEB86F4D5809204", p0);
}


// Arg:p0 is [char*]	
g_Natives["0xBF59707B3E5ED531"] = (p0) => 
{
	return mp.game.invoke("0xBF59707B3E5ED531", p0);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x1A8E2C8B9CF4549C"] = (p0, p1) => 
{
	return mp.game.invoke("0x1A8E2C8B9CF4549C", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x15E33297C3E8DC60"] = (p0) => 
{
	return mp.game.invoke("0x15E33297C3E8DC60", p0);
}


// Arg:p0 is [char*]	
g_Natives._SET_TIMECYCLE_MODIFIER2 = (p0) => 
{
	return mp.game.invoke("0x5096FD9CCB49056D", p0);
}

g_Natives["0x92CCC17A7A2285DA"] = () => 
{
	return mp.game.invoke("0x92CCC17A7A2285DA");
}

g_Natives["0xBB0527EC6341496D"] = () => 
{
	return mp.game.invoke("0xBB0527EC6341496D");
}


// Arg:p0 is [float]	
g_Natives["0x2C328AF17210F009"] = (p0) => 
{
	return mp.game.invoke("0x2C328AF17210F009", p0);
}

g_Natives["0x2BF72AD5B41AA739"] = () => 
{
	return mp.game.invoke("0x2BF72AD5B41AA739");
}


// Arg:scaleformName is [char*]	
g_Natives.REQUEST_SCALEFORM_MOVIE = (scaleformName) => 
{
	return mp.game.invoke("0x11FE353CF9733E6F", scaleformName);
}


// Arg:scaleformName is [char*]	
g_Natives.REQUEST_SCALEFORM_MOVIE_INSTANCE = (scaleformName) => 
{
	return mp.game.invoke("0xC514489CFB8AF806", scaleformName);
}


// Arg:scaleformName is [char*]	
g_Natives._REQUEST_SCALEFORM_MOVIE_INTERACTIVE = (scaleformName) => 
{
	return mp.game.invoke("0xBD06C611BB9048C2", scaleformName);
}


// Arg:scaleformHandle is [int]	
g_Natives.HAS_SCALEFORM_MOVIE_LOADED = (scaleformHandle) => 
{
	return mp.game.invoke("0x85F01B8D5B90570E", scaleformHandle);
}


// Arg:scaleformName is [char*]	
g_Natives._HAS_NAMED_SCALEFORM_MOVIE_LOADED = (scaleformName) => 
{
	return mp.game.invoke("0x0C1C5D756FB5F337", scaleformName);
}


// Arg:scaleformHandle is [int]	
g_Natives.HAS_SCALEFORM_CONTAINER_MOVIE_LOADED_INTO_PARENT = (scaleformHandle) => 
{
	return mp.game.invoke("0x8217150E1217EBFD", scaleformHandle);
}


// Arg:scaleformHandle is [int*]	
g_Natives.SET_SCALEFORM_MOVIE_AS_NO_LONGER_NEEDED = (scaleformHandle) => 
{
	return mp.game.invoke("0x1D132D614DD86811", scaleformHandle);
}


// Arg:scaleform is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_SCALEFORM_MOVIE_TO_USE_SYSTEM_TIME = (scaleform, toggle) => 
{
	return mp.game.invoke("0x6D8EB211944DCE08", scaleform, toggle);
}


// Arg:scaleformHandle is [int]	Arg:x is [float]	Arg:y is [float]	Arg:width is [float]	Arg:height is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	Arg:unk is [int]	
g_Natives.DRAW_SCALEFORM_MOVIE = (scaleformHandle, x, y, width, height, red, green, blue, alpha, unk) => 
{
	return mp.game.invoke("0x54972ADAF0294A93", scaleformHandle, x, y, width, height, red, green, blue, alpha, unk);
}


// Arg:scaleform is [int]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	Arg:unk is [int]	
g_Natives.DRAW_SCALEFORM_MOVIE_FULLSCREEN = (scaleform, red, green, blue, alpha, unk) => 
{
	return mp.game.invoke("0x0DF606929C105BE1", scaleform, red, green, blue, alpha, unk);
}


// Arg:scaleform1 is [int]	Arg:scaleform2 is [int]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_SCALEFORM_MOVIE_FULLSCREEN_MASKED = (scaleform1, scaleform2, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xCF537FDE4FBD4CE5", scaleform1, scaleform2, red, green, blue, alpha);
}


// Arg:scaleform is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:p7 is [float]	Arg:sharpness is [float]	Arg:p9 is [float]	Arg:scaleX is [float]	Arg:scaleY is [float]	Arg:scaleZ is [float]	Arg:p13 is [Any]	
g_Natives.DRAW_SCALEFORM_MOVIE_3D = (scaleform, posX, posY, posZ, rotX, rotY, rotZ, p7, sharpness, p9, scaleX, scaleY, scaleZ, p13) => 
{
	return mp.game.invoke("0x87D51D72255D4E78", scaleform, posX, posY, posZ, rotX, rotY, rotZ, p7, sharpness, p9, scaleX, scaleY, scaleZ, p13);
}


// Arg:scaleform is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:scaleX is [float]	Arg:scaleY is [float]	Arg:scaleZ is [float]	Arg:rotationOrder is [Any]	
g_Natives._DRAW_SCALEFORM_MOVIE_3D_NON_ADDITIVE = (scaleform, posX, posY, posZ, rotX, rotY, rotZ, p7, p8, p9, scaleX, scaleY, scaleZ, rotationOrder) => 
{
	return mp.game.invoke("0x1CE592FDC749D6F5", scaleform, posX, posY, posZ, rotX, rotY, rotZ, p7, p8, p9, scaleX, scaleY, scaleZ, rotationOrder);
}


// Arg:scaleform is [int]	Arg:method is [char*]	
g_Natives.CALL_SCALEFORM_MOVIE_METHOD = (scaleform, method) => 
{
	return mp.game.invoke("0xFBD96D87AC96D533", scaleform, method);
}


// Arg:scaleform is [int]	Arg:functionName is [char*]	Arg:param1 is [float]	Arg:param2 is [float]	Arg:param3 is [float]	Arg:param4 is [float]	Arg:param5 is [float]	
g_Natives._CALL_SCALEFORM_MOVIE_FUNCTION_FLOAT_PARAMS = (scaleform, functionName, param1, param2, param3, param4, param5) => 
{
	return mp.game.invoke("0xD0837058AE2E4BEE", scaleform, functionName, param1, param2, param3, param4, param5);
}


// Arg:scaleform is [int]	Arg:functionName is [char*]	Arg:param1 is [char*]	Arg:param2 is [char*]	Arg:param3 is [char*]	Arg:param4 is [char*]	Arg:param5 is [char*]	
g_Natives._CALL_SCALEFORM_MOVIE_FUNCTION_STRING_PARAMS = (scaleform, functionName, param1, param2, param3, param4, param5) => 
{
	return mp.game.invoke("0x51BC1ED3CC44E8F7", scaleform, functionName, param1, param2, param3, param4, param5);
}


// Arg:scaleform is [int]	Arg:functionName is [char*]	Arg:floatParam1 is [float]	Arg:floatParam2 is [float]	Arg:floatParam3 is [float]	Arg:floatParam4 is [float]	Arg:floatParam5 is [float]	Arg:stringParam1 is [char*]	Arg:stringParam2 is [char*]	Arg:stringParam3 is [char*]	Arg:stringParam4 is [char*]	Arg:stringParam5 is [char*]	
g_Natives._CALL_SCALEFORM_MOVIE_FUNCTION_MIXED_PARAMS = (scaleform, functionName, floatParam1, floatParam2, floatParam3, floatParam4, floatParam5, stringParam1, stringParam2, stringParam3, stringParam4, stringParam5) => 
{
	return mp.game.invoke("0xEF662D8D57E290B1", scaleform, functionName, floatParam1, floatParam2, floatParam3, floatParam4, floatParam5, stringParam1, stringParam2, stringParam3, stringParam4, stringParam5);
}


// Arg:hudComponent is [int]	Arg:functionName is [char*]	
g_Natives._BEGIN_SCALEFORM_MOVIE_METHOD_HUD_COMPONENT = (hudComponent, functionName) => 
{
	return mp.game.invoke("0x98C494FD5BDFBFD5", hudComponent, functionName);
}


// Arg:scaleform is [int]	Arg:functionName is [char*]	
g_Natives.BEGIN_SCALEFORM_MOVIE_METHOD = (scaleform, functionName) => 
{
	return mp.game.invoke("0xF6E48914C7A8694E", scaleform, functionName);
}


// Arg:functionName is [char*]	
g_Natives._BEGIN_SCALEFORM_MOVIE_METHOD_N = (functionName) => 
{
	return mp.game.invoke("0xAB58C27C2E6123C6", functionName);
}


// Arg:functionName is [char*]	
g_Natives._BEGIN_SCALEFORM_MOVIE_METHOD_V = (functionName) => 
{
	return mp.game.invoke("0xB9449845F73F5E9C", functionName);
}

g_Natives.END_SCALEFORM_MOVIE_METHOD = () => 
{
	return mp.game.invoke("0xC6796A8FFA375E53");
}

g_Natives._END_SCALEFORM_MOVIE_METHOD_RETURN = () => 
{
	return mp.game.invoke("0xC50AA39A577AF886");
}


// Arg:method_return is [int]	
g_Natives.IS_SCALEFORM_MOVIE_METHOD_RETURN_VALUE_READY = (method_return) => 
{
	return mp.game.invoke("0x768FF8961BA904D6", method_return);
}


// Arg:method_return is [int]	
g_Natives._GET_SCALEFORM_MOVIE_FUNCTION_RETURN_INT = (method_return) => 
{
	return mp.game.invoke("0x2DE7EFA66B906036", method_return);
}


// Arg:method_return is [int]	
g_Natives.SITTING_TV = (method_return) => 
{
	return mp.game.invoke("0xE1E258829A885245", method_return);
}


// Arg:value is [int]	
g_Natives._ADD_SCALEFORM_MOVIE_METHOD_PARAMETER_INT = (value) => 
{
	return mp.game.invoke("0xC3D0841A0CC546A6", value);
}


// Arg:value is [float]	
g_Natives._ADD_SCALEFORM_MOVIE_METHOD_PARAMETER_FLOAT = (value) => 
{
	return mp.game.invoke("0xD69736AAE04DB51A", value);
}


// Arg:value is [BOOL]	
g_Natives._ADD_SCALEFORM_MOVIE_METHOD_PARAMETER_BOOL = (value) => 
{
	return mp.game.invoke("0xC58424BA936EB458", value);
}


// Arg:componentType is [char*]	
g_Natives.BEGIN_TEXT_COMMAND_SCALEFORM_STRING = (componentType) => 
{
	return mp.game.invoke("0x80338406F3475E55", componentType);
}

g_Natives.END_TEXT_COMMAND_SCALEFORM_STRING = () => 
{
	return mp.game.invoke("0x362E2D3FE93A9959");
}

g_Natives._END_TEXT_COMMAND_SCALEFORM_STRING_2 = () => 
{
	return mp.game.invoke("0xAE4E8157D9ECF087");
}


// Arg:value is [char*]	
g_Natives._ADD_SCALEFORM_MOVIE_METHOD_PARAMETER_STRING = (value) => 
{
	return mp.game.invoke("0xBA7148484BD90365", value);
}


// Arg:button is [char*]	
g_Natives._ADD_SCALEFORM_MOVIE_METHOD_PARAMETER_BUTTON_NAME = (button) => 
{
	return mp.game.invoke("0xE83A3E3557A56640", button);
}


// Arg:p0 is [int]	
g_Natives["0x5E657EF1099EDD65"] = (p0) => 
{
	return mp.game.invoke("0x5E657EF1099EDD65", p0);
}


// Arg:p0 is [int]	
g_Natives["0xEC52C631A1831C03"] = (p0) => 
{
	return mp.game.invoke("0xEC52C631A1831C03", p0);
}


// Arg:hudComponent is [int]	
g_Natives._REQUEST_SCALEFORM_SCRIPT_HUD_MOVIE = (hudComponent) => 
{
	return mp.game.invoke("0x9304881D6F6537EA", hudComponent);
}


// Arg:hudComponent is [int]	
g_Natives._HAS_HUD_SCALEFORM_LOADED = (hudComponent) => 
{
	return mp.game.invoke("0xDF6E5987D2B4D140", hudComponent);
}


// Arg:p0 is [Any]	
g_Natives["0xF44A5456AC3F4F97"] = (p0) => 
{
	return mp.game.invoke("0xF44A5456AC3F4F97", p0);
}


// Arg:scaleformHandle is [int]	
g_Natives["0xD1C7CB175E012964"] = (scaleformHandle) => 
{
	return mp.game.invoke("0xD1C7CB175E012964", scaleformHandle);
}


// Arg:channel is [int]	
g_Natives.SET_TV_CHANNEL = (channel) => 
{
	return mp.game.invoke("0xBAABBB23EB6E484E", channel);
}

g_Natives.GET_TV_CHANNEL = () => 
{
	return mp.game.invoke("0xFC1E275A90D39995");
}


// Arg:volume is [float]	
g_Natives.SET_TV_VOLUME = (volume) => 
{
	return mp.game.invoke("0x2982BF73F66E9DDC", volume);
}

g_Natives.GET_TV_VOLUME = () => 
{
	return mp.game.invoke("0x2170813D3DD8661B");
}


// Arg:xPos is [float]	Arg:yPos is [float]	Arg:xScale is [float]	Arg:yScale is [float]	Arg:rotation is [float]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	Arg:alpha is [int]	
g_Natives.DRAW_TV_CHANNEL = (xPos, yPos, xScale, yScale, rotation, red, green, blue, alpha) => 
{
	return mp.game.invoke("0xFDDC2B4ED3C69DF0", xPos, yPos, xScale, yScale, rotation, red, green, blue, alpha);
}


// Arg:channel is [int]	Arg:playlist is [char*]	Arg:fromBeginning is [BOOL]	
g_Natives.SET_TV_CHANNEL_PLAYLIST = (channel, playlist, fromBeginning) => 
{
	return mp.game.invoke("0xF7B38B8305F1FE8B", channel, playlist, fromBeginning);
}


// Arg:p0 is [Any]	Arg:p1 is [char*]	Arg:p2 is [Any]	
g_Natives["0x2201C576FACAEBE8"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2201C576FACAEBE8", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0xBEB3D46BB7F043C0"] = (p0) => 
{
	return mp.game.invoke("0xBEB3D46BB7F043C0", p0);
}


// Arg:videoClip is [Hash]	
g_Natives._IS_TV_PLAYLIST_ITEM_PLAYING = (videoClip) => 
{
	return mp.game.invoke("0x0AD973CA1E077B60", videoClip);
}


// Arg:p0 is [BOOL]	
g_Natives["0x74C180030FDE4B69"] = (p0) => 
{
	return mp.game.invoke("0x74C180030FDE4B69", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xD1C55B110E4DF534"] = (p0) => 
{
	return mp.game.invoke("0xD1C55B110E4DF534", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.ENABLE_MOVIE_SUBTITLES = (toggle) => 
{
	return mp.game.invoke("0x873FA65C778AD970", toggle);
}

g_Natives["0xD3A10FC7FD8D98CD"] = () => 
{
	return mp.game.invoke("0xD3A10FC7FD8D98CD");
}


// Arg:p0 is [char*]	
g_Natives["0xF1CEA8A4198D8E9A"] = (p0) => 
{
	return mp.game.invoke("0xF1CEA8A4198D8E9A", p0);
}


// Arg:p0 is [char*]	Arg:ped is [Ped]	Arg:p2 is [int]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives._DRAW_SHOWROOM = (p0, ped, p2, posX, posY, posZ) => 
{
	return mp.game.invoke("0x98C4FE6EC34154CA", p0, ped, p2, posX, posY, posZ);
}

g_Natives["0x7A42B2E236E71415"] = () => 
{
	return mp.game.invoke("0x7A42B2E236E71415");
}


// Arg:p0 is [BOOL]	
g_Natives["0x108BE26959A9D9BB"] = (p0) => 
{
	return mp.game.invoke("0x108BE26959A9D9BB", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xA356990E161C9E65"] = (p0) => 
{
	return mp.game.invoke("0xA356990E161C9E65", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:p11 is [float]	Arg:p12 is [float]	
g_Natives["0x1C4FC5752BCD8E48"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => 
{
	return mp.game.invoke("0x1C4FC5752BCD8E48", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:p4 is [int]	Arg:p5 is [int]	Arg:p6 is [int]	Arg:p7 is [int]	Arg:p8 is [int]	Arg:p9 is [int]	Arg:p10 is [int]	Arg:p11 is [int]	
g_Natives["0x5CE62918F8D703C7"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => 
{
	return mp.game.invoke("0x5CE62918F8D703C7", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
}


// Arg:effectName is [char*]	Arg:duration is [int]	Arg:looped is [BOOL]	
g_Natives.ANIMPOSTFX_PLAY = (effectName, duration, looped) => 
{
	return mp.game.invoke("0x2206BF9A37B7F724", effectName, duration, looped);
}


// Arg:effectName is [char*]	
g_Natives.ANIMPOSTFX_STOP = (effectName) => 
{
	return mp.game.invoke("0x068E835A1D0DC0E3", effectName);
}


// Arg:effectName is [char*]	
g_Natives.ANIMPOSTFX_IS_RUNNING = (effectName) => 
{
	return mp.game.invoke("0x36AD3E690DA5ACEB", effectName);
}

g_Natives.ANIMPOSTFX_STOP_ALL = () => 
{
	return mp.game.invoke("0xB4EDDC19532BFB85");
}


// Arg:graphicsName is [char*]	
g_Natives._SWITCH_HUD = (graphicsName) => 
{
	return mp.game.invoke("0xD2209BE128B5418C", graphicsName);
}


// Arg:statSlot is [int]	
g_Natives.STAT_CLEAR_SLOT_FOR_RELOAD = (statSlot) => 
{
	return mp.game.invoke("0xEB0A72181D4AA4AD", statSlot);
}


// Arg:p0 is [int]	
g_Natives.STAT_LOAD = (p0) => 
{
	return mp.game.invoke("0xA651443F437B1CE6", p0);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	Arg:p2 is [int]	
g_Natives.STAT_SAVE = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE07BCA305B82D2FD", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0x5688585E6D563CD8"] = (p0) => 
{
	return mp.game.invoke("0x5688585E6D563CD8", p0);
}


// Arg:p0 is [Any]	
g_Natives.STAT_LOAD_PENDING = (p0) => 
{
	return mp.game.invoke("0xA1750FFAFA181661", p0);
}

g_Natives.STAT_SAVE_PENDING = () => 
{
	return mp.game.invoke("0x7D3A583856F2C5AC");
}

g_Natives.STAT_SAVE_PENDING_OR_REQUESTED = () => 
{
	return mp.game.invoke("0xBBB6AD006F1BBEA3");
}


// Arg:p0 is [Any]	
g_Natives.STAT_DELETE_SLOT = (p0) => 
{
	return mp.game.invoke("0x49A49BED12794D70", p0);
}


// Arg:p0 is [Any]	
g_Natives.STAT_SLOT_IS_LOADED = (p0) => 
{
	return mp.game.invoke("0x0D0A9F0E7BD91E3C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x7F2C4CDF2E82DF4C"] = (p0) => 
{
	return mp.game.invoke("0x7F2C4CDF2E82DF4C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xE496A53BA5F50A56"] = (p0) => 
{
	return mp.game.invoke("0xE496A53BA5F50A56", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xF434A10BA01C37D0"] = (p0) => 
{
	return mp.game.invoke("0xF434A10BA01C37D0", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x7E6946F68A38B74F"] = (p0) => 
{
	return mp.game.invoke("0x7E6946F68A38B74F", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xA8733668D1047B51"] = (p0) => 
{
	return mp.game.invoke("0xA8733668D1047B51", p0);
}

g_Natives["0xECB41AC6AB754401"] = () => 
{
	return mp.game.invoke("0xECB41AC6AB754401");
}

g_Natives["0x9B4BD21D69B1E609"] = () => 
{
	return mp.game.invoke("0x9B4BD21D69B1E609");
}

g_Natives["0xC0E0D686DDFC6EAE"] = () => 
{
	return mp.game.invoke("0xC0E0D686DDFC6EAE");
}


// Arg:statName is [Hash]	Arg:value is [int]	Arg:save is [BOOL]	
g_Natives.STAT_SET_INT = (statName, value, save) => 
{
	return mp.game.invoke("0xB3271D7AB655B441", statName, value, save);
}


// Arg:statName is [Hash]	Arg:value is [float]	Arg:save is [BOOL]	
g_Natives.STAT_SET_FLOAT = (statName, value, save) => 
{
	return mp.game.invoke("0x4851997F37FE9B3C", statName, value, save);
}


// Arg:statName is [Hash]	Arg:value is [BOOL]	Arg:save is [BOOL]	
g_Natives.STAT_SET_BOOL = (statName, value, save) => 
{
	return mp.game.invoke("0x4B33C4243DE0C432", statName, value, save);
}


// Arg:statName is [Hash]	Arg:value is [char*]	Arg:save is [BOOL]	
g_Natives.STAT_SET_GXT_LABEL = (statName, value, save) => 
{
	return mp.game.invoke("0x17695002FD8B2AE0", statName, value, save);
}


// Arg:statName is [Hash]	Arg:value is [Any*]	Arg:numFields is [int]	Arg:save is [BOOL]	
g_Natives.STAT_SET_DATE = (statName, value, numFields, save) => 
{
	return mp.game.invoke("0x2C29BFB64F4FCBE4", statName, value, numFields, save);
}


// Arg:statName is [Hash]	Arg:value is [char*]	Arg:save is [BOOL]	
g_Natives.STAT_SET_STRING = (statName, value, save) => 
{
	return mp.game.invoke("0xA87B2335D12531D7", statName, value, save);
}


// Arg:statName is [Hash]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:save is [BOOL]	
g_Natives.STAT_SET_POS = (statName, x, y, z, save) => 
{
	return mp.game.invoke("0xDB283FDE680FE72E", statName, x, y, z, save);
}


// Arg:statName is [Hash]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [int]	Arg:save is [BOOL]	
g_Natives.STAT_SET_MASKED_INT = (statName, p1, p2, p3, save) => 
{
	return mp.game.invoke("0x7BBB1B54583ED410", statName, p1, p2, p3, save);
}


// Arg:playerName is [Hash]	Arg:value is [char*]	Arg:save is [BOOL]	
g_Natives.STAT_SET_USER_ID = (playerName, value, save) => 
{
	return mp.game.invoke("0x8CDDF1E452BABE11", playerName, value, save);
}


// Arg:statName is [Hash]	Arg:p1 is [BOOL]	
g_Natives.STAT_SET_CURRENT_POSIX_TIME = (statName, p1) => 
{
	return mp.game.invoke("0xC2F84B7F9C4D0C61", statName, p1);
}


// Arg:statHash is [Hash]	Arg:outValue is [int*]	Arg:p2 is [int]	
g_Natives.STAT_GET_INT = (statHash, outValue, p2) => 
{
	return mp.game.invoke("0x767FBC2AC802EF3D", statHash, outValue, p2);
}


// Arg:statHash is [Hash]	Arg:outValue is [float*]	Arg:p2 is [Any]	
g_Natives.STAT_GET_FLOAT = (statHash, outValue, p2) => 
{
	return mp.game.invoke("0xD7AE6C9C9C6AC54C", statHash, outValue, p2);
}


// Arg:statHash is [Hash]	Arg:outValue is [BOOL*]	Arg:p2 is [Any]	
g_Natives.STAT_GET_BOOL = (statHash, outValue, p2) => 
{
	return mp.game.invoke("0x11B5E6D2AE73F48E", statHash, outValue, p2);
}


// Arg:statHash is [Hash]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.STAT_GET_DATE = (statHash, p1, p2, p3) => 
{
	return mp.game.invoke("0x8B0FACEFC36C824B", statHash, p1, p2, p3);
}


// Arg:statHash is [Hash]	Arg:p1 is [int]	
g_Natives.STAT_GET_STRING = (statHash, p1) => 
{
	return mp.game.invoke("0xE50384ACC2C3DB74", statHash, p1);
}


// Arg:statHash is [Hash]	Arg:x is [float*]	Arg:y is [float*]	Arg:z is [float*]	Arg:p4 is [int]	
g_Natives.STAT_GET_POS = (statHash, x, y, z, p4) => 
{
	return mp.game.invoke("0x350F82CCB186AA1B", statHash, x, y, z, p4);
}


// Arg:statHash is [Hash]	Arg:outValue is [int*]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.STAT_GET_MASKED_INT = (statHash, outValue, p2, p3, p4) => 
{
	return mp.game.invoke("0x655185A06D9EEAAB", statHash, outValue, p2, p3, p4);
}


// Arg:playerName is [Any*]	
g_Natives.STAT_GET_USER_ID = (playerName) => 
{
	return mp.game.invoke("0x2365C388E393BBE2", playerName);
}


// Arg:statName is [Hash]	
g_Natives.STAT_GET_LICENSE_PLATE = (statName) => 
{
	return mp.game.invoke("0x5473D4195058B2E4", statName);
}


// Arg:statName is [Hash]	Arg:str is [char*]	
g_Natives.STAT_SET_LICENSE_PLATE = (statName, str) => 
{
	return mp.game.invoke("0x69FF13266D7296DA", statName, str);
}


// Arg:statName is [Hash]	Arg:value is [float]	
g_Natives.STAT_INCREMENT = (statName, value) => 
{
	return mp.game.invoke("0x9B5A68C6489E9909", statName, value);
}

g_Natives["0x5A556B229A169402"] = () => 
{
	return mp.game.invoke("0x5A556B229A169402");
}

g_Natives["0xB1D2BB1E1631F5B1"] = () => 
{
	return mp.game.invoke("0xB1D2BB1E1631F5B1");
}


// Arg:statName is [Hash]	Arg:p1 is [int]	Arg:outValue is [float*]	
g_Natives["0xBED9F5693F34ED17"] = (statName, p1, outValue) => 
{
	return mp.game.invoke("0xBED9F5693F34ED17", statName, p1, outValue);
}


// Arg:characterIndex is [int]	
g_Natives["0x26D7399B9587FE89"] = (characterIndex) => 
{
	return mp.game.invoke("0x26D7399B9587FE89", characterIndex);
}


// Arg:p0 is [int]	
g_Natives["0xA78B8FA58200DA56"] = (p0) => 
{
	return mp.game.invoke("0xA78B8FA58200DA56", p0);
}


// Arg:statName is [Hash]	
g_Natives.STAT_GET_NUMBER_OF_DAYS = (statName) => 
{
	return mp.game.invoke("0xE0E854F5280FB769", statName);
}


// Arg:statName is [Hash]	
g_Natives.STAT_GET_NUMBER_OF_HOURS = (statName) => 
{
	return mp.game.invoke("0xF2D4B2FE415AAFC3", statName);
}


// Arg:statName is [Hash]	
g_Natives.STAT_GET_NUMBER_OF_MINUTES = (statName) => 
{
	return mp.game.invoke("0x7583B4BE4C5A41B5", statName);
}


// Arg:statName is [Hash]	
g_Natives.STAT_GET_NUMBER_OF_SECONDS = (statName) => 
{
	return mp.game.invoke("0x2CE056FF3723F00B", statName);
}


// Arg:profileSetting is [int]	Arg:value is [int]	
g_Natives.STAT_SET_PROFILE_SETTING_VALUE = (profileSetting, value) => 
{
	return mp.game.invoke("0x68F01422BE1D838F", profileSetting, value);
}


// Arg:p0 is [int]	
g_Natives["0xF4D8E7AC2A27758C"] = (p0) => 
{
	return mp.game.invoke("0xF4D8E7AC2A27758C", p0);
}


// Arg:p0 is [int]	
g_Natives["0x94F12ABF9C79E339"] = (p0) => 
{
	return mp.game.invoke("0x94F12ABF9C79E339", p0);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	
g_Natives._GET_PSTAT_BOOL_HASH = (index, spStat, charStat, character) => 
{
	return mp.game.invoke("0x80C75307B1C42837", index, spStat, charStat, character);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	
g_Natives._GET_PSTAT_INT_HASH = (index, spStat, charStat, character) => 
{
	return mp.game.invoke("0x61E111E323419E07", index, spStat, charStat, character);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	
g_Natives._GET_TUPSTAT_BOOL_HASH = (index, spStat, charStat, character) => 
{
	return mp.game.invoke("0xC4BB08EE7907471E", index, spStat, charStat, character);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	
g_Natives._GET_TUPSTAT_INT_HASH = (index, spStat, charStat, character) => 
{
	return mp.game.invoke("0xD16C2AD6B8E32854", index, spStat, charStat, character);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	Arg:section is [char*]	
g_Natives._GET_NGSTAT_BOOL_HASH = (index, spStat, charStat, character, section) => 
{
	return mp.game.invoke("0xBA52FF538ED2BC71", index, spStat, charStat, character, section);
}


// Arg:index is [int]	Arg:spStat is [BOOL]	Arg:charStat is [BOOL]	Arg:character is [int]	Arg:section is [char*]	
g_Natives._GET_NGSTAT_INT_HASH = (index, spStat, charStat, character, section) => 
{
	return mp.game.invoke("0x2B4CDCA6F07FF3DA", index, spStat, charStat, character, section);
}


// Arg:statName is [Hash]	Arg:mask is [int]	Arg:p2 is [int]	
g_Natives.STAT_GET_BOOL_MASKED = (statName, mask, p2) => 
{
	return mp.game.invoke("0x10FE3F1B79F9B071", statName, mask, p2);
}


// Arg:statName is [Hash]	Arg:value is [BOOL]	Arg:mask is [int]	Arg:save is [BOOL]	
g_Natives.STAT_SET_BOOL_MASKED = (statName, value, mask, save) => 
{
	return mp.game.invoke("0x5BC62EC1937B9E5B", statName, value, mask, save);
}


// Arg:p0 is [char*]	Arg:p1 is [Any]	
g_Natives["0x5009DFD741329729"] = (p0, p1) => 
{
	return mp.game.invoke("0x5009DFD741329729", p0, p1);
}


// Arg:p0 is [Any*]	
g_Natives.PLAYSTATS_NPC_INVITE = (p0) => 
{
	return mp.game.invoke("0x93054C88E6AA7C44", p0);
}


// Arg:xp is [int]	Arg:hash1 is [Hash]	Arg:hash2 is [Hash]	
g_Natives.PLAYSTATS_AWARD_XP = (xp, hash1, hash2) => 
{
	return mp.game.invoke("0x46F917F6B4128FE4", xp, hash1, hash2);
}


// Arg:player is [Player]	
g_Natives.PLAYSTATS_RANK_UP = (player) => 
{
	return mp.game.invoke("0xC7F2DE41D102BFB4", player);
}

g_Natives["0x098760C7461724CD"] = () => 
{
	return mp.game.invoke("0x098760C7461724CD");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xA071E0ED98F91286"] = (p0, p1) => 
{
	return mp.game.invoke("0xA071E0ED98F91286", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0xC5BE134EC7BA96A0"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xC5BE134EC7BA96A0", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	
g_Natives.PLAYSTATS_MISSION_STARTED = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC19A2925C34D2231", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives.PLAYSTATS_MISSION_OVER = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x7C4BB33A8CED7324", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.PLAYSTATS_MISSION_CHECKPOINT = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC900596A63978C1D", p0, p1, p2, p3);
}


// Arg:name is [char*]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.PLAYSTATS_RANDOM_MISSION_DONE = (name, p1, p2, p3) => 
{
	return mp.game.invoke("0x71862B1D855F32E1", name, p1, p2, p3);
}


// Arg:amount is [int]	Arg:act is [int]	Arg:player is [Player]	Arg:cm is [float]	
g_Natives.PLAYSTATS_ROS_BET = (amount, act, player, cm) => 
{
	return mp.game.invoke("0x121FB4DDDC2D5291", amount, act, player, cm);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.PLAYSTATS_RACE_CHECKPOINT = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x9C375C315099DDE4", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x6DEE77AFF8C21BD1"] = (p0, p1) => 
{
	return mp.game.invoke("0x6DEE77AFF8C21BD1", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	
g_Natives.PLAYSTATS_MATCH_STARTED = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xBC80E22DED931E3D", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.PLAYSTATS_SHOP_ITEM = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x176852ACAAC173D1", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives["0x1CAE5D2E3F9A07F0"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x1CAE5D2E3F9A07F0", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	
g_Natives._PLAYSTATS_AMBIENT_MISSION_CRATE_CREATED = (p0, p1, p2) => 
{
	return mp.game.invoke("0xAFC7E5E075A96F46", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0xCB00196B31C39EB1"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xCB00196B31C39EB1", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x2B69F5074C894811"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x2B69F5074C894811", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x7EEC2A316C250073"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7EEC2A316C250073", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	Arg:p8 is [Any]	Arg:p9 is [Any]	
g_Natives["0xADDD1C754E2E2914"] = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0xADDD1C754E2E2914", p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
}


// Arg:p0 is [Any]	
g_Natives.PLAYSTATS_ACQUIRED_HIDDEN_PACKAGE = (p0) => 
{
	return mp.game.invoke("0x79AB33F0FBFAC40C", p0);
}


// Arg:scaleformHash is [Hash]	Arg:p1 is [int]	
g_Natives.PLAYSTATS_WEBSITE_VISITED = (scaleformHash, p1) => 
{
	return mp.game.invoke("0xDDF24D535060F811", scaleformHash, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.PLAYSTATS_FRIEND_ACTIVITY = (p0, p1) => 
{
	return mp.game.invoke("0x0F71DE29AB2258F1", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.PLAYSTATS_ODDJOB_DONE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x69DEA3E9DB727B4C", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.PLAYSTATS_PROP_CHANGE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xBA739D6D5A05D6E7", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives.PLAYSTATS_CLOTH_CHANGE = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x34B973047A2268B9", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xE95C8A1875A02CA4"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE95C8A1875A02CA4", p0, p1, p2);
}


// Arg:cheat is [char*]	
g_Natives.PLAYSTATS_CHEAT_APPLIED = (cheat) => 
{
	return mp.game.invoke("0x6058665D72302D3F", cheat);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xF8C54A461C3E11DC"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xF8C54A461C3E11DC", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xF5BB8DAC426A52C0"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xF5BB8DAC426A52C0", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xA736CF7FB7C5BFF4"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xA736CF7FB7C5BFF4", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x14E0B2D1AD1044E0"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x14E0B2D1AD1044E0", p0, p1, p2, p3);
}


// Arg:element is [int]	Arg:item is [char*]	
g_Natives.PLAYSTATS_QUICKFIX_TOOL = (element, item) => 
{
	return mp.game.invoke("0x90D0622866E80445", element, item);
}


// Arg:time is [int]	
g_Natives.PLAYSTATS_IDLE_KICK = (time) => 
{
	return mp.game.invoke("0x5DA3A8DE8CB6226F", time);
}


// Arg:p0 is [BOOL]	
g_Natives["0xD1032E482629049E"] = (p0) => 
{
	return mp.game.invoke("0xD1032E482629049E", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xF4FF020A08BC8863"] = (p0, p1) => 
{
	return mp.game.invoke("0xF4FF020A08BC8863", p0, p1);
}


// Arg:p0 is [Any*]	
g_Natives["0x46326E13DA4E0546"] = (p0) => 
{
	return mp.game.invoke("0x46326E13DA4E0546", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.LEADERBOARDS_GET_NUMBER_OF_COLUMNS = (p0, p1) => 
{
	return mp.game.invoke("0x117B45156D7EFF2E", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS_GET_COLUMN_ID = (p0, p1, p2) => 
{
	return mp.game.invoke("0xC4B5467A1886EA7E", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS_GET_COLUMN_TYPE = (p0, p1, p2) => 
{
	return mp.game.invoke("0xBF4FEF46DB7894D3", p0, p1, p2);
}

g_Natives.LEADERBOARDS_READ_CLEAR_ALL = () => 
{
	return mp.game.invoke("0xA34CB6E6F0DF4A0B");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS_READ_CLEAR = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7CCE5C737A665701", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS_READ_PENDING = (p0, p1, p2) => 
{
	return mp.game.invoke("0xAC392C8483342AC2", p0, p1, p2);
}

g_Natives["0xA31FD15197B192BD"] = () => 
{
	return mp.game.invoke("0xA31FD15197B192BD");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS_READ_SUCCESSFUL = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2FB19228983E832C", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.LEADERBOARDS2_READ_FRIENDS_BY_ROW = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x918B101666F9CB83", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives.LEADERBOARDS2_READ_BY_HANDLE = (p0, p1) => 
{
	return mp.game.invoke("0xC30713A383BFBF0E", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any*]	Arg:p4 is [Any]	Arg:p5 is [Any*]	Arg:p6 is [Any]	
g_Natives.LEADERBOARDS2_READ_BY_ROW = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xA9CDB1E3F0A49883", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS2_READ_BY_RANK = (p0, p1, p2) => 
{
	return mp.game.invoke("0xBA2C7DB0C129449A", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any*]	
g_Natives.LEADERBOARDS2_READ_BY_RADIUS = (p0, p1, p2) => 
{
	return mp.game.invoke("0x5CE587FB5A42C8C4", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS2_READ_BY_SCORE_INT = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7EEC7E4F6984A16A", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [float]	Arg:p2 is [Any]	
g_Natives.LEADERBOARDS2_READ_BY_SCORE_FLOAT = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE662C8B759D08F3C", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0xC38DC1E90D22547C"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xC38DC1E90D22547C", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0xF1AE5DCDBFCA2721"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xF1AE5DCDBFCA2721", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives["0xA0F93D5465B3094D"] = (p0) => 
{
	return mp.game.invoke("0xA0F93D5465B3094D", p0);
}

g_Natives["0x71B008056E5692D6"] = () => 
{
	return mp.game.invoke("0x71B008056E5692D6");
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0x34770B9CE0E03B91"] = (p0, p1) => 
{
	return mp.game.invoke("0x34770B9CE0E03B91", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x88578F6EC36B4A3A"] = (p0, p1) => 
{
	return mp.game.invoke("0x88578F6EC36B4A3A", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x38491439B6BA7F7D"] = (p0, p1) => 
{
	return mp.game.invoke("0x38491439B6BA7F7D", p0, p1);
}


// Arg:p0 is [Any*]	
g_Natives.LEADERBOARDS2_WRITE_DATA = (p0) => 
{
	return mp.game.invoke("0xAE2206545888AE49", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [float]	
g_Natives["0x0BCA1D2C47B0D269"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x0BCA1D2C47B0D269", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x2E65248609523599"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2E65248609523599", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives.LEADERBOARDS_CACHE_DATA_ROW = (p0) => 
{
	return mp.game.invoke("0xB9BB18E2C40142ED", p0);
}

g_Natives.LEADERBOARDS_CLEAR_CACHE_DATA = () => 
{
	return mp.game.invoke("0xD4B02A6B476E1FDC");
}


// Arg:p0 is [Any]	
g_Natives["0x8EC74CEB042E7CFF"] = (p0) => 
{
	return mp.game.invoke("0x8EC74CEB042E7CFF", p0);
}


// Arg:p0 is [Any]	
g_Natives.LEADERBOARDS_GET_CACHE_EXISTS = (p0) => 
{
	return mp.game.invoke("0x9C51349BE6CDFE2C", p0);
}


// Arg:p0 is [Any]	
g_Natives.LEADERBOARDS_GET_CACHE_TIME = (p0) => 
{
	return mp.game.invoke("0xF04C1C27DA35F6C8", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x58A651CD201D89AD"] = (p0) => 
{
	return mp.game.invoke("0x58A651CD201D89AD", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	
g_Natives.LEADERBOARDS_GET_CACHE_DATA_ROW = (p0, p1, p2) => 
{
	return mp.game.invoke("0x9120E8DBA3D69273", p0, p1, p2);
}


// Arg:p0 is [char*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x11FF1C80276097ED"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x11FF1C80276097ED", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [Any]	
g_Natives["0x30A6614C1F7799B8"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x30A6614C1F7799B8", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any*]	
g_Natives["0x6483C25849031C4F"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6483C25849031C4F", p0, p1, p2, p3);
}

g_Natives["0x5EAD2BF6484852E4"] = () => 
{
	return mp.game.invoke("0x5EAD2BF6484852E4");
}

g_Natives["0xC141B8917E0017EC"] = () => 
{
	return mp.game.invoke("0xC141B8917E0017EC");
}

g_Natives["0xB475F27C6A994D65"] = () => 
{
	return mp.game.invoke("0xB475F27C6A994D65");
}


// Arg:value is [int]	
g_Natives._SET_PROFILE_SETTING_933 = (value) => 
{
	return mp.game.invoke("0xF1A1803D3476F215", value);
}


// Arg:value is [int]	
g_Natives._SET_PROFILE_SETTING_934 = (value) => 
{
	return mp.game.invoke("0x38BAAA5DD4C9D19F", value);
}


// Arg:value is [int]	
g_Natives._SET_PROFILE_SETTING_935 = (value) => 
{
	return mp.game.invoke("0x55384438FC55AD8E", value);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x723C1CE13FBFDB67"] = (p0, p1) => 
{
	return mp.game.invoke("0x723C1CE13FBFDB67", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x0D01D20616FC73FB"] = (p0, p1) => 
{
	return mp.game.invoke("0x0D01D20616FC73FB", p0, p1);
}


// Arg:statName is [Hash]	Arg:value is [float]	
g_Natives._LEADERBOARDS_DEATHS = (statName, value) => 
{
	return mp.game.invoke("0x428EAF89E24F6C36", statName, value);
}

g_Natives["0x047CBED6F6F8B63C"] = () => 
{
	return mp.game.invoke("0x047CBED6F6F8B63C");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives._LEADERBOARDS2_WRITE_DATA_EX = (p0, p1) => 
{
	return mp.game.invoke("0xC980E62E33DF1D5C", p0, p1);
}

g_Natives["0x6F361B8889A792A3"] = () => 
{
	return mp.game.invoke("0x6F361B8889A792A3");
}

g_Natives["0xC847B43F369AC0B5"] = () => 
{
	return mp.game.invoke("0xC847B43F369AC0B5");
}


// Arg:p0 is [Any*]	
g_Natives["0xA5C80D8E768A9E66"] = (p0) => 
{
	return mp.game.invoke("0xA5C80D8E768A9E66", p0);
}

g_Natives["0x9A62EC95AE10E011"] = () => 
{
	return mp.game.invoke("0x9A62EC95AE10E011");
}

g_Natives["0x4C89FE2BDEB3F169"] = () => 
{
	return mp.game.invoke("0x4C89FE2BDEB3F169");
}

g_Natives["0xC6E0E2616A7576BB"] = () => 
{
	return mp.game.invoke("0xC6E0E2616A7576BB");
}


// Arg:p0 is [Any]	
g_Natives["0x5BD5F255321C4AAF"] = (p0) => 
{
	return mp.game.invoke("0x5BD5F255321C4AAF", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0xDEAAF77EB3687E97"] = (p0, p1) => 
{
	return mp.game.invoke("0xDEAAF77EB3687E97", p0, p1);
}

g_Natives["0xC70DDCE56D0D3A99"] = () => 
{
	return mp.game.invoke("0xC70DDCE56D0D3A99");
}


// Arg:p0 is [Any*]	
g_Natives["0x886913BBEACA68C1"] = (p0) => 
{
	return mp.game.invoke("0x886913BBEACA68C1", p0);
}

g_Natives["0x4FEF53183C3C6414"] = () => 
{
	return mp.game.invoke("0x4FEF53183C3C6414");
}

g_Natives["0x567384DFA67029E6"] = () => 
{
	return mp.game.invoke("0x567384DFA67029E6");
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0x3270F67EED31FBC1"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x3270F67EED31FBC1", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives["0xCE5AA445ABA8DEE0"] = (p0) => 
{
	return mp.game.invoke("0xCE5AA445ABA8DEE0", p0);
}

g_Natives["0x98E2BC1CA26287C3"] = () => 
{
	return mp.game.invoke("0x98E2BC1CA26287C3");
}

g_Natives["0x629526ABA383BCAA"] = () => 
{
	return mp.game.invoke("0x629526ABA383BCAA");
}

g_Natives["0xB3DA2606774A8E2D"] = () => 
{
	return mp.game.invoke("0xB3DA2606774A8E2D");
}


// Arg:bitset is [Any]	
g_Natives._UNLOCK_EXCLUS_CONTENT = (bitset) => 
{
	return mp.game.invoke("0xDAC073C7901F9E15", bitset);
}


// Arg:p0 is [Any]	
g_Natives._SET_PROFILE_SETTING_501 = (p0) => 
{
	return mp.game.invoke("0xF6792800AC95350D", p0);
}


// Arg:name is [char*]	Arg:model is [Hash]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.ADD_SCRIPT_TO_RANDOM_PED = (name, model, p2, p3) => 
{
	return mp.game.invoke("0x4EE5367468A65CCC", name, model, p2, p3);
}


// Arg:scriptName is [char*]	Arg:objectName is [Hash]	Arg:p2 is [int]	Arg:p3 is [float]	Arg:p4 is [int]	Arg:p5 is [int]	
g_Natives.REGISTER_OBJECT_SCRIPT_BRAIN = (scriptName, objectName, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x0BE84C318BA6EC22", scriptName, objectName, p2, p3, p4, p5);
}


// Arg:object is [Object]	
g_Natives.IS_OBJECT_WITHIN_BRAIN_ACTIVATION_RANGE = (object) => 
{
	return mp.game.invoke("0xCCBA154209823057", object);
}


// Arg:p0 is [Any*]	Arg:p1 is [float]	Arg:p2 is [Any]	
g_Natives.REGISTER_WORLD_POINT_SCRIPT_BRAIN = (p0, p1, p2) => 
{
	return mp.game.invoke("0x3CDC7136613284BD", p0, p1, p2);
}

g_Natives.IS_WORLD_POINT_WITHIN_BRAIN_ACTIVATION_RANGE = () => 
{
	return mp.game.invoke("0xC5042CC6F5E3D450");
}


// Arg:brainSet is [int]	
g_Natives.ENABLE_SCRIPT_BRAIN_SET = (brainSet) => 
{
	return mp.game.invoke("0x67AA4D73F0CFA86B", brainSet);
}


// Arg:brainSet is [int]	
g_Natives.DISABLE_SCRIPT_BRAIN_SET = (brainSet) => 
{
	return mp.game.invoke("0x14D8518E9760F08F", brainSet);
}

g_Natives._STOP_ALL_SCRIPTS = () => 
{
	return mp.game.invoke("0x0B40ED49D7D6FF84");
}

g_Natives._FLUSH_ALL_SCRIPTS = () => 
{
	return mp.game.invoke("0x4D953DF78EBF8158");
}


// Arg:action is [char*]	
g_Natives["0x6D6840CEE8845831"] = (action) => 
{
	return mp.game.invoke("0x6D6840CEE8845831", action);
}


// Arg:action is [char*]	
g_Natives["0x6E91B04E08773030"] = (action) => 
{
	return mp.game.invoke("0x6E91B04E08773030", action);
}


// Arg:p4 is [int]	
g_Natives.CREATE_MOBILE_PHONE = (p4) => 
{
	return mp.game.invoke("0xA4E8E696C532FBC7", p4);
}

g_Natives.DESTROY_MOBILE_PHONE = () => 
{
	return mp.game.invoke("0x3BC861DF703E5097");
}


// Arg:scale is [float]	
g_Natives.SET_MOBILE_PHONE_SCALE = (scale) => 
{
	return mp.game.invoke("0xCBDD322A73D6D932", scale);
}


// Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:p3 is [Any]	
g_Natives.SET_MOBILE_PHONE_ROTATION = (rotX, rotY, rotZ, p3) => 
{
	return mp.game.invoke("0xBB779C0CA917E865", rotX, rotY, rotZ, p3);
}


// Arg:rotation is [Vector3*]	Arg:p1 is [int]	
g_Natives.GET_MOBILE_PHONE_ROTATION = (rotation, p1) => 
{
	return mp.game.invoke("0x1CEFB61F193070AE", rotation, p1);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	
g_Natives.SET_MOBILE_PHONE_POSITION = (posX, posY, posZ) => 
{
	return mp.game.invoke("0x693A5C6D6734085B", posX, posY, posZ);
}


// Arg:position is [Vector3*]	
g_Natives.GET_MOBILE_PHONE_POSITION = (position) => 
{
	return mp.game.invoke("0x584FDFDA48805B86", position);
}


// Arg:toggle is [BOOL]	
g_Natives.SCRIPT_IS_MOVING_MOBILE_PHONE_OFFSCREEN = (toggle) => 
{
	return mp.game.invoke("0xF511F759238A5122", toggle);
}

g_Natives.CAN_PHONE_BE_SEEN_ON_SCREEN = () => 
{
	return mp.game.invoke("0xC4E2813898C97A4B");
}


// Arg:direction is [int]	
g_Natives._MOVE_FINGER = (direction) => 
{
	return mp.game.invoke("0x95C9E72F3D7DEC9B", direction);
}


// Arg:Toggle is [BOOL]	
g_Natives._SET_PHONE_LEAN = (Toggle) => 
{
	return mp.game.invoke("0x44E44169EF70138E", Toggle);
}


// Arg:toggle is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.CELL_CAM_ACTIVATE = (toggle, p1) => 
{
	return mp.game.invoke("0xFDE8F069C542D126", toggle, p1);
}


// Arg:toggle is [BOOL]	
g_Natives._DISABLE_PHONE_THIS_FRAME = (toggle) => 
{
	return mp.game.invoke("0x015C49A93E3E086E", toggle);
}


// Arg:toggle is [int*]	
g_Natives["0xA2CCBE62CD4C91A4"] = (toggle) => 
{
	return mp.game.invoke("0xA2CCBE62CD4C91A4", toggle);
}


// Arg:p0 is [float]	
g_Natives["0x1B0B4AEED5B9B41C"] = (p0) => 
{
	return mp.game.invoke("0x1B0B4AEED5B9B41C", p0);
}


// Arg:p0 is [float]	
g_Natives["0x53F4892D18EC90A4"] = (p0) => 
{
	return mp.game.invoke("0x53F4892D18EC90A4", p0);
}


// Arg:p0 is [float]	
g_Natives["0x3117D84EFA60F77B"] = (p0) => 
{
	return mp.game.invoke("0x3117D84EFA60F77B", p0);
}


// Arg:p0 is [float]	
g_Natives["0x15E69E2802C24B8D"] = (p0) => 
{
	return mp.game.invoke("0x15E69E2802C24B8D", p0);
}


// Arg:p0 is [float]	
g_Natives["0xAC2890471901861C"] = (p0) => 
{
	return mp.game.invoke("0xAC2890471901861C", p0);
}


// Arg:p0 is [float]	
g_Natives["0xD6ADE981781FCA09"] = (p0) => 
{
	return mp.game.invoke("0xD6ADE981781FCA09", p0);
}


// Arg:p0 is [float]	
g_Natives["0xF1E22DC13F5EEBAD"] = (p0) => 
{
	return mp.game.invoke("0xF1E22DC13F5EEBAD", p0);
}


// Arg:p0 is [float]	
g_Natives["0x466DA42C89865553"] = (p0) => 
{
	return mp.game.invoke("0x466DA42C89865553", p0);
}


// Arg:entity is [Entity]	
g_Natives.CELL_CAM_IS_CHAR_VISIBLE_NO_FACE_CHECK = (entity) => 
{
	return mp.game.invoke("0x439E9BC95B7E7FBE", entity);
}


// Arg:renderId is [int*]	
g_Natives.GET_MOBILE_PHONE_RENDER_ID = (renderId) => 
{
	return mp.game.invoke("0xB4A53E05F68B6FA1", renderId);
}


// Arg:name is [char*]	
g_Natives._NETWORK_SHOP_DOES_ITEM_EXIST = (name) => 
{
	return mp.game.invoke("0xBD4D7EAF8A30F637", name);
}


// Arg:hash is [Hash]	
g_Natives._NETWORK_SHOP_DOES_ITEM_EXIST_HASH = (hash) => 
{
	return mp.game.invoke("0x247F0F73A182EA0B", hash);
}

g_Natives.APP_DATA_VALID = () => 
{
	return mp.game.invoke("0x846AA8E7D55EE5B6");
}


// Arg:property is [ScrHandle]	
g_Natives.APP_GET_INT = (property) => 
{
	return mp.game.invoke("0xD3A58A12C77D9D4B", property);
}


// Arg:property is [char*]	
g_Natives.APP_GET_FLOAT = (property) => 
{
	return mp.game.invoke("0x1514FB24C02C2322", property);
}


// Arg:property is [char*]	
g_Natives.APP_GET_STRING = (property) => 
{
	return mp.game.invoke("0x749B023950D2311C", property);
}


// Arg:property is [char*]	Arg:value is [int]	
g_Natives.APP_SET_INT = (property, value) => 
{
	return mp.game.invoke("0x607E8E3D3E4F9611", property, value);
}


// Arg:property is [char*]	Arg:value is [float]	
g_Natives.APP_SET_FLOAT = (property, value) => 
{
	return mp.game.invoke("0x25D7687C68E0DAA4", property, value);
}


// Arg:property is [char*]	Arg:value is [char*]	
g_Natives.APP_SET_STRING = (property, value) => 
{
	return mp.game.invoke("0x3FF2FCEC4B7721B4", property, value);
}


// Arg:appName is [char*]	
g_Natives.APP_SET_APP = (appName) => 
{
	return mp.game.invoke("0xCFD0406ADAF90D2B", appName);
}


// Arg:blockName is [char*]	
g_Natives.APP_SET_BLOCK = (blockName) => 
{
	return mp.game.invoke("0x262AB456A3D21F93", blockName);
}

g_Natives.APP_CLEAR_BLOCK = () => 
{
	return mp.game.invoke("0x5FE1DF3342DB7DBA");
}

g_Natives.APP_CLOSE_APP = () => 
{
	return mp.game.invoke("0xE41C65E07A5F05FC");
}

g_Natives.APP_CLOSE_BLOCK = () => 
{
	return mp.game.invoke("0xE8E3FCF72EAC0EF8");
}

g_Natives.APP_HAS_LINKED_SOCIAL_CLUB_ACCOUNT = () => 
{
	return mp.game.invoke("0x71EEE69745088DA0");
}


// Arg:appName is [char*]	
g_Natives.APP_HAS_SYNCED_DATA = (appName) => 
{
	return mp.game.invoke("0xCA52279A7271517F", appName);
}

g_Natives.APP_SAVE_DATA = () => 
{
	return mp.game.invoke("0x95C5D356CDA6E85F");
}

g_Natives.APP_GET_DELETED_FILE_STATUS = () => 
{
	return mp.game.invoke("0xC9853A2BE3DED1A6");
}


// Arg:appName is [char*]	
g_Natives.APP_DELETE_APP_DATA = (appName) => 
{
	return mp.game.invoke("0x44151AEA95C8A003", appName);
}


// Arg:hour is [int]	Arg:minute is [int]	Arg:second is [int]	
g_Natives.SET_CLOCK_TIME = (hour, minute, second) => 
{
	return mp.game.invoke("0x47C3B5848C3E45D8", hour, minute, second);
}


// Arg:toggle is [BOOL]	
g_Natives.PAUSE_CLOCK = (toggle) => 
{
	return mp.game.invoke("0x4055E40BD2DBEC1D", toggle);
}


// Arg:hour is [int]	Arg:minute is [int]	Arg:second is [int]	
g_Natives.ADVANCE_CLOCK_TIME_TO = (hour, minute, second) => 
{
	return mp.game.invoke("0xC8CA9670B9D83B3B", hour, minute, second);
}


// Arg:hours is [int]	Arg:minutes is [int]	Arg:seconds is [int]	
g_Natives.ADD_TO_CLOCK_TIME = (hours, minutes, seconds) => 
{
	return mp.game.invoke("0xD716F30D8C8980E2", hours, minutes, seconds);
}

g_Natives.GET_CLOCK_HOURS = () => 
{
	return mp.game.invoke("0x25223CA6B4D20B7F");
}

g_Natives.GET_CLOCK_MINUTES = () => 
{
	return mp.game.invoke("0x13D2B8ADD79640F2");
}

g_Natives.GET_CLOCK_SECONDS = () => 
{
	return mp.game.invoke("0x494E97C2EF27C470");
}


// Arg:day is [int]	Arg:month is [int]	Arg:year is [int]	
g_Natives.SET_CLOCK_DATE = (day, month, year) => 
{
	return mp.game.invoke("0xB096419DF0D06CE7", day, month, year);
}

g_Natives.GET_CLOCK_DAY_OF_WEEK = () => 
{
	return mp.game.invoke("0xD972E4BD7AEB235F");
}

g_Natives.GET_CLOCK_DAY_OF_MONTH = () => 
{
	return mp.game.invoke("0x3D10BC92A4DB1D35");
}

g_Natives.GET_CLOCK_MONTH = () => 
{
	return mp.game.invoke("0xBBC72712E80257A1");
}

g_Natives.GET_CLOCK_YEAR = () => 
{
	return mp.game.invoke("0x961777E64BDAF717");
}

g_Natives.GET_MILLISECONDS_PER_GAME_MINUTE = () => 
{
	return mp.game.invoke("0x2F8B4D1C595B11DB");
}


// Arg:year is [int*]	Arg:month is [int*]	Arg:day is [int*]	Arg:hour is [int*]	Arg:minute is [int*]	Arg:second is [int*]	
g_Natives.GET_POSIX_TIME = (year, month, day, hour, minute, second) => 
{
	return mp.game.invoke("0xDA488F299A5B164E", year, month, day, hour, minute, second);
}


// Arg:year is [int*]	Arg:month is [int*]	Arg:day is [int*]	Arg:hour is [int*]	Arg:minute is [int*]	Arg:second is [int*]	
g_Natives._GET_UTC_TIME = (year, month, day, hour, minute, second) => 
{
	return mp.game.invoke("0x8117E09A19EEF4D3", year, month, day, hour, minute, second);
}


// Arg:year is [int*]	Arg:month is [int*]	Arg:day is [int*]	Arg:hour is [int*]	Arg:minute is [int*]	Arg:second is [int*]	
g_Natives.GET_LOCAL_TIME = (year, month, day, hour, minute, second) => 
{
	return mp.game.invoke("0x50C7A99057A69748", year, month, day, hour, minute, second);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:unknown1 is [BOOL]	Arg:unknown2 is [BOOL]	
g_Natives.SET_ROADS_IN_AREA = (x1, y1, z1, x2, y2, z2, unknown1, unknown2) => 
{
	return mp.game.invoke("0xBF1A602B5BA52FEE", x1, y1, z1, x2, y2, z2, unknown1, unknown2);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:angle is [float]	Arg:unknown1 is [BOOL]	Arg:unknown2 is [BOOL]	Arg:unknown3 is [BOOL]	
g_Natives.SET_ROADS_IN_ANGLED_AREA = (x1, y1, z1, x2, y2, z2, angle, unknown1, unknown2, unknown3) => 
{
	return mp.game.invoke("0x1A5AA1208AF5DB59", x1, y1, z1, x2, y2, z2, angle, unknown1, unknown2, unknown3);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:unknown is [BOOL]	
g_Natives.SET_PED_PATHS_IN_AREA = (x1, y1, z1, x2, y2, z2, unknown) => 
{
	return mp.game.invoke("0x34F060F4BF92E018", x1, y1, z1, x2, y2, z2, unknown);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:onGround is [BOOL]	Arg:outPosition is [Vector3*]	Arg:flags is [int]	
g_Natives.GET_SAFE_COORD_FOR_PED = (x, y, z, onGround, outPosition, flags) => 
{
	return mp.game.invoke("0xB61C8E878A4199CA", x, y, z, onGround, outPosition, flags);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:outPosition is [Vector3*]	Arg:nodeType is [int]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives.GET_CLOSEST_VEHICLE_NODE = (x, y, z, outPosition, nodeType, p5, p6) => 
{
	return mp.game.invoke("0x240A18690AE96513", x, y, z, outPosition, nodeType, p5, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:outPosition is [Vector3*]	Arg:p5 is [float]	Arg:p6 is [int]	
g_Natives.GET_CLOSEST_MAJOR_VEHICLE_NODE = (x, y, z, outPosition, p5, p6) => 
{
	return mp.game.invoke("0x2EABE3B06F58C1BE", x, y, z, outPosition, p5, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:outPosition is [Vector3*]	Arg:outHeading is [float*]	Arg:nodeType is [int]	Arg:p6 is [float]	Arg:p7 is [int]	
g_Natives.GET_CLOSEST_VEHICLE_NODE_WITH_HEADING = (x, y, z, outPosition, outHeading, nodeType, p6, p7) => 
{
	return mp.game.invoke("0xFF071FB798B803B0", x, y, z, outPosition, outHeading, nodeType, p6, p7);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:nthClosest is [int]	Arg:outPosition is [Vector3*]	Arg:p6 is [BOOL]	Arg:p7 is [float]	Arg:p8 is [float]	
g_Natives.GET_NTH_CLOSEST_VEHICLE_NODE = (x, y, z, nthClosest, outPosition, p6, p7, p8) => 
{
	return mp.game.invoke("0xE50E52416CCF948B", x, y, z, nthClosest, outPosition, p6, p7, p8);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:nth is [int]	Arg:nodetype is [int]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives.GET_NTH_CLOSEST_VEHICLE_NODE_ID = (x, y, z, nth, nodetype, p5, p6) => 
{
	return mp.game.invoke("0x22D7275A79FE8215", x, y, z, nth, nodetype, p5, p6);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:nthClosest is [int]	Arg:outPosition is [Vector3*]	Arg:outHeading is [float*]	Arg:outInt is [int*]	Arg:p6 is [int]	Arg:p7 is [float]	Arg:p8 is [float]	
g_Natives.GET_NTH_CLOSEST_VEHICLE_NODE_WITH_HEADING = (x, y, z, nthClosest, outPosition, outHeading, outInt, p6, p7, p8) => 
{
	return mp.game.invoke("0x80CA6A8B6C094CC4", x, y, z, nthClosest, outPosition, outHeading, outInt, p6, p7, p8);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:nthClosest is [int]	Arg:outPosition is [Vector3*]	Arg:outHeading is [float*]	Arg:nodeType is [int]	Arg:p7 is [float]	Arg:p8 is [float]	
g_Natives.GET_NTH_CLOSEST_VEHICLE_NODE_ID_WITH_HEADING = (x, y, z, nthClosest, outPosition, outHeading, nodeType, p7, p8) => 
{
	return mp.game.invoke("0x6448050E9C2A7207", x, y, z, nthClosest, outPosition, outHeading, nodeType, p7, p8);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:desiredX is [float]	Arg:desiredY is [float]	Arg:desiredZ is [float]	Arg:nthClosest is [int]	Arg:outPosition is [Vector3*]	Arg:outHeading is [float*]	Arg:nodetype is [int]	Arg:p10 is [Any]	Arg:p11 is [Any]	
g_Natives.GET_NTH_CLOSEST_VEHICLE_NODE_FAVOUR_DIRECTION = (x, y, z, desiredX, desiredY, desiredZ, nthClosest, outPosition, outHeading, nodetype, p10, p11) => 
{
	return mp.game.invoke("0x45905BE8654AE067", x, y, z, desiredX, desiredY, desiredZ, nthClosest, outPosition, outHeading, nodetype, p10, p11);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:density is [int*]	Arg:flags is [int*]	
g_Natives.GET_VEHICLE_NODE_PROPERTIES = (x, y, z, density, flags) => 
{
	return mp.game.invoke("0x0568566ACBB5DEDC", x, y, z, density, flags);
}


// Arg:vehicleNodeId is [int]	
g_Natives.IS_VEHICLE_NODE_ID_VALID = (vehicleNodeId) => 
{
	return mp.game.invoke("0x1EAF30FCFBF5AF74", vehicleNodeId);
}


// Arg:nodeId is [int]	Arg:outPosition is [Vector3*]	
g_Natives.GET_VEHICLE_NODE_POSITION = (nodeId, outPosition) => 
{
	return mp.game.invoke("0x703123E5E7D429C2", nodeId, outPosition);
}


// Arg:nodeID is [int]	
g_Natives._GET_SUPPORTS_GPS_ROUTE_FLAG = (nodeID) => 
{
	return mp.game.invoke("0xA2AE5C478B96E3B6", nodeID);
}


// Arg:nodeID is [int]	
g_Natives._GET_IS_SLOW_ROAD_FLAG = (nodeID) => 
{
	return mp.game.invoke("0x4F5070AA58F69279", nodeID);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:p3 is [float]	Arg:p4 is [int]	Arg:p5 is [Vector3*]	Arg:p6 is [Vector3*]	Arg:p7 is [int*]	Arg:p8 is [int*]	Arg:p9 is [float*]	Arg:p10 is [int]	
g_Natives.GET_CLOSEST_ROAD = (posX, posY, posZ, p3, p4, p5, p6, p7, p8, p9, p10) => 
{
	return mp.game.invoke("0x132F52BBA570FE92", posX, posY, posZ, p3, p4, p5, p6, p7, p8, p9, p10);
}


// Arg:keepInMemory is [BOOL]	
g_Natives.LOAD_ALL_PATH_NODES = (keepInMemory) => 
{
	return mp.game.invoke("0x80E4A6EDDB0BE8D9", keepInMemory);
}


// Arg:keepInMemory is [BOOL]	
g_Natives._UNLOAD_ALL_PATH_NODES = (keepInMemory) => 
{
	return mp.game.invoke("0x228E5C6AD4D74BFD", keepInMemory);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0xF7B79A50B905A30D"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xF7B79A50B905A30D", p0, p1, p2, p3);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x07FB139B592FA687"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x07FB139B592FA687", p0, p1, p2, p3);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.SET_ROADS_BACK_TO_ORIGINAL = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x1EE7063B80FFC77C", p0, p1, p2, p3, p4, p5);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:p6 is [float]	
g_Natives.SET_ROADS_BACK_TO_ORIGINAL_IN_ANGLED_AREA = (x1, y1, z1, x2, y2, z2, p6) => 
{
	return mp.game.invoke("0x0027501B9F3B407E", x1, y1, z1, x2, y2, z2, p6);
}


// Arg:p0 is [float]	
g_Natives["0x0B919E1FB47CC4E0"] = (p0) => 
{
	return mp.game.invoke("0x0B919E1FB47CC4E0", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	
g_Natives["0xAA76052DDA9BFC3E"] = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xAA76052DDA9BFC3E", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.SET_PED_PATHS_BACK_TO_ORIGINAL = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0xE04B48F2CC926253", p0, p1, p2, p3, p4, p5);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	Arg:p6 is [BOOL]	Arg:outPosition is [Vector3*]	Arg:nodeId is [int*]	
g_Natives.GET_RANDOM_VEHICLE_NODE = (x, y, z, radius, p4, p5, p6, outPosition, nodeId) => 
{
	return mp.game.invoke("0x93E0DB8440B73A7D", x, y, z, radius, p4, p5, p6, outPosition, nodeId);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:streetName is [Hash*]	Arg:crossingRoad is [Hash*]	
g_Natives.GET_STREET_NAME_AT_COORD = (x, y, z, streetName, crossingRoad) => 
{
	return mp.game.invoke("0x2EB41072B4C1E4C0", x, y, z, streetName, crossingRoad);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [BOOL]	Arg:direction is [float*]	Arg:vehicle is [float*]	Arg:distToNxJunction is [float*]	
g_Natives.GENERATE_DIRECTIONS_TO_COORD = (x, y, z, p3, direction, vehicle, distToNxJunction) => 
{
	return mp.game.invoke("0xF90125F1F79ECDF8", x, y, z, p3, direction, vehicle, distToNxJunction);
}


// Arg:ignore is [BOOL]	
g_Natives.SET_IGNORE_NO_GPS_FLAG = (ignore) => 
{
	return mp.game.invoke("0x72751156E7678833", ignore);
}


// Arg:p0 is [BOOL]	
g_Natives["0x1FC289A0C3FF470F"] = (p0) => 
{
	return mp.game.invoke("0x1FC289A0C3FF470F", p0);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.SET_GPS_DISABLED_ZONE = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xDC20483CD3DD5201", x1, y1, z1, x2, y2, z2);
}

g_Natives["0xBBB45C3CF5C8AA85"] = () => 
{
	return mp.game.invoke("0xBBB45C3CF5C8AA85");
}

g_Natives["0x869DAACBBE9FA006"] = () => 
{
	return mp.game.invoke("0x869DAACBBE9FA006");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0x16F46FB18C8009E4"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x16F46FB18C8009E4", p0, p1, p2, p3, p4);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:vehicle is [Vehicle]	
g_Natives.IS_POINT_ON_ROAD = (x, y, z, vehicle) => 
{
	return mp.game.invoke("0x125BF4ABFC536B09", x, y, z, vehicle);
}

g_Natives["0xD3A6A0EF48823A8C"] = () => 
{
	return mp.game.invoke("0xD3A6A0EF48823A8C");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	
g_Natives["0xD0BC1C6FB18EE154"] = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0xD0BC1C6FB18EE154", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [Any]	
g_Natives["0x2801D0012266DF07"] = (p0) => 
{
	return mp.game.invoke("0x2801D0012266DF07", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:radius is [float]	
g_Natives.ADD_NAVMESH_REQUIRED_REGION = (x, y, radius) => 
{
	return mp.game.invoke("0x387EAD7EE42F6685", x, y, radius);
}

g_Natives.REMOVE_NAVMESH_REQUIRED_REGIONS = () => 
{
	return mp.game.invoke("0x916F0A3CDEC3445E");
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:disable is [BOOL]	
g_Natives.DISABLE_NAVMESH_IN_AREA = (x1, y1, z1, x2, y2, z2, disable) => 
{
	return mp.game.invoke("0x4C8872D8CDBE1B8B", x1, y1, z1, x2, y2, z2, disable);
}

g_Natives.ARE_ALL_NAVMESH_REGIONS_LOADED = () => 
{
	return mp.game.invoke("0x8415D95B194A3AEA");
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.IS_NAVMESH_LOADED_IN_AREA = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xF813C7E63F9062A5", x1, y1, z1, x2, y2, z2);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives["0x01708E8DD3FF8C65"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x01708E8DD3FF8C65", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [BOOL]	Arg:p8 is [Any]	
g_Natives.ADD_NAVMESH_BLOCKING_OBJECT = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0xFCD5C8E06E502F5A", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [Any]	
g_Natives.UPDATE_NAVMESH_BLOCKING_OBJECT = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x109E99373F290687", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [Any]	
g_Natives.REMOVE_NAVMESH_BLOCKING_OBJECT = (p0) => 
{
	return mp.game.invoke("0x46399A7895957C0E", p0);
}


// Arg:p0 is [Any]	
g_Natives.DOES_NAVMESH_BLOCKING_OBJECT_EXIST = (p0) => 
{
	return mp.game.invoke("0x0EAEB0DB4B132399", p0);
}


// Arg:p0 is [float]	Arg:p1 is [float]	
g_Natives["0x29C24BFBED8AB8FB"] = (p0, p1) => 
{
	return mp.game.invoke("0x29C24BFBED8AB8FB", p0, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x8ABE8608576D9CE3"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x8ABE8608576D9CE3", p0, p1, p2, p3);
}


// Arg:left is [float]	Arg:right is [float]	
g_Natives["0x336511A34F2E5185"] = (left, right) => 
{
	return mp.game.invoke("0x336511A34F2E5185", left, right);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives["0x3599D741C9AC6310"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x3599D741C9AC6310", p0, p1, p2, p3);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.CALCULATE_TRAVEL_DISTANCE_BETWEEN_POINTS = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xADD95C7005C4A197", x1, y1, z1, x2, y2, z2);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_CONTROL_ENABLED = (inputGroup, control) => 
{
	return mp.game.invoke("0x1CEA6BFDF248E5D9", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:contorl is [int]	
g_Natives.IS_CONTROL_PRESSED = (inputGroup, contorl) => 
{
	return mp.game.invoke("0xF3A21BCD95725A4A", inputGroup, contorl);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_CONTROL_RELEASED = (inputGroup, control) => 
{
	return mp.game.invoke("0x648EE3E7F38877DD", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_CONTROL_JUST_PRESSED = (inputGroup, control) => 
{
	return mp.game.invoke("0x580417101DDB492F", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_CONTROL_JUST_RELEASED = (inputGroup, control) => 
{
	return mp.game.invoke("0x50F940259D3841E6", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.GET_CONTROL_VALUE = (inputGroup, control) => 
{
	return mp.game.invoke("0xD95E79E8686D2C27", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.GET_CONTROL_NORMAL = (inputGroup, control) => 
{
	return mp.game.invoke("0xEC3C9B8D5327B563", inputGroup, control);
}


// Arg:p0 is [BOOL]	
g_Natives["0x5B73C77D9EB66E24"] = (p0) => 
{
	return mp.game.invoke("0x5B73C77D9EB66E24", p0);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives["0x5B84D09CEC5209C5"] = (inputGroup, control) => 
{
	return mp.game.invoke("0x5B84D09CEC5209C5", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	Arg:amount is [float]	
g_Natives._SET_CONTROL_NORMAL = (inputGroup, control, amount) => 
{
	return mp.game.invoke("0xE8A25867FBA3B05E", inputGroup, control, amount);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_DISABLED_CONTROL_PRESSED = (inputGroup, control) => 
{
	return mp.game.invoke("0xE2587F8CBBD87B1D", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_DISABLED_CONTROL_JUST_PRESSED = (inputGroup, control) => 
{
	return mp.game.invoke("0x91AEF906BCA88877", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.IS_DISABLED_CONTROL_JUST_RELEASED = (inputGroup, control) => 
{
	return mp.game.invoke("0x305C8DCD79DA8B0F", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.GET_DISABLED_CONTROL_NORMAL = (inputGroup, control) => 
{
	return mp.game.invoke("0x11E65974A982637C", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives["0x4F8A26A890FD62FB"] = (inputGroup, control) => 
{
	return mp.game.invoke("0x4F8A26A890FD62FB", inputGroup, control);
}


// Arg:p0 is [int]	
g_Natives["0xD7D22F5592AED8BA"] = (p0) => 
{
	return mp.game.invoke("0xD7D22F5592AED8BA", p0);
}


// Arg:inputGroup is [int]	
g_Natives._IS_INPUT_DISABLED = (inputGroup) => 
{
	return mp.game.invoke("0xA571D46727E2B718", inputGroup);
}


// Arg:inputGroup is [int]	
g_Natives._IS_INPUT_JUST_DISABLED = (inputGroup) => 
{
	return mp.game.invoke("0x13337B38DB572509", inputGroup);
}


// Arg:x is [float]	Arg:y is [float]	
g_Natives._SET_CURSOR_LOCATION = (x, y) => 
{
	return mp.game.invoke("0xFC695459D4D0E219", x, y);
}


// Arg:p0 is [BOOL]	
g_Natives["0x23F09EADC01449D6"] = (p0) => 
{
	return mp.game.invoke("0x23F09EADC01449D6", p0);
}


// Arg:inputGroup is [int]	
g_Natives["0x6CD79468A1E595C6"] = (inputGroup) => 
{
	return mp.game.invoke("0x6CD79468A1E595C6", inputGroup);
}


// Arg:inputGroup is [int]	Arg:control is [int]	Arg:p2 is [BOOL]	
g_Natives.GET_CONTROL_INSTRUCTIONAL_BUTTON = (inputGroup, control, p2) => 
{
	return mp.game.invoke("0x0499D7B09FC9B407", inputGroup, control, p2);
}


// Arg:inputGroup is [int]	Arg:control is [int]	Arg:p2 is [BOOL]	
g_Natives["0x80C2FD58D720C801"] = (inputGroup, control, p2) => 
{
	return mp.game.invoke("0x80C2FD58D720C801", inputGroup, control, p2);
}


// Arg:p0 is [int]	Arg:red is [int]	Arg:green is [int]	Arg:blue is [int]	
g_Natives["0x8290252FFF36ACB5"] = (p0, red, green, blue) => 
{
	return mp.game.invoke("0x8290252FFF36ACB5", p0, red, green, blue);
}


// Arg:p0 is [Any]	
g_Natives["0xCB0360EFEFB2580D"] = (p0) => 
{
	return mp.game.invoke("0xCB0360EFEFB2580D", p0);
}


// Arg:p0 is [int]	Arg:duration is [int]	Arg:frequency is [int]	
g_Natives.SET_PAD_SHAKE = (p0, duration, frequency) => 
{
	return mp.game.invoke("0x48B3886C1358D0D5", p0, duration, frequency);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0x14D29BB12D47F68C"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x14D29BB12D47F68C", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	
g_Natives.STOP_PAD_SHAKE = (p0) => 
{
	return mp.game.invoke("0x38C16A305E8CDC8D", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xF239400E16C23E08"] = (p0, p1) => 
{
	return mp.game.invoke("0xF239400E16C23E08", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0xA0CEFCEA390AAB9B"] = (p0) => 
{
	return mp.game.invoke("0xA0CEFCEA390AAB9B", p0);
}

g_Natives.IS_LOOK_INVERTED = () => 
{
	return mp.game.invoke("0x77B612531280010D");
}

g_Natives._IS_LOOK_NOT_INVERTED = () => 
{
	return mp.game.invoke("0xE1615EC03B3BB4FD");
}

g_Natives.GET_LOCAL_PLAYER_AIM_STATE = () => 
{
	return mp.game.invoke("0xBB41AFBBBC0A0287");
}

g_Natives["0x59B9A7AF4C95133C"] = () => 
{
	return mp.game.invoke("0x59B9A7AF4C95133C");
}

g_Natives["0x0F70731BACCFBB96"] = () => 
{
	return mp.game.invoke("0x0F70731BACCFBB96");
}

g_Natives["0xFC859E2374407556"] = () => 
{
	return mp.game.invoke("0xFC859E2374407556");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_PLAYERPAD_SHAKES_WHEN_CONTROLLER_DISABLED = (toggle) => 
{
	return mp.game.invoke("0x798FDEB5B1575088", toggle);
}


// Arg:inputGroup is [int]	Arg:control is [int]	
g_Natives.SET_INPUT_EXCLUSIVE = (inputGroup, control) => 
{
	return mp.game.invoke("0xEDE476E5EE29EDB1", inputGroup, control);
}


// Arg:inputGroup is [int]	Arg:control is [int]	Arg:disable is [BOOL]	
g_Natives.DISABLE_CONTROL_ACTION = (inputGroup, control, disable) => 
{
	return mp.game.invoke("0xFE99B66D079CF6BC", inputGroup, control, disable);
}


// Arg:inputGroup is [int]	Arg:control is [int]	Arg:enable is [BOOL]	
g_Natives.ENABLE_CONTROL_ACTION = (inputGroup, control, enable) => 
{
	return mp.game.invoke("0x351220255D64C155", inputGroup, control, enable);
}


// Arg:inputGroup is [int]	
g_Natives.DISABLE_ALL_CONTROL_ACTIONS = (inputGroup) => 
{
	return mp.game.invoke("0x5F4B6931816E599B", inputGroup);
}


// Arg:inputGroup is [int]	
g_Natives.ENABLE_ALL_CONTROL_ACTIONS = (inputGroup) => 
{
	return mp.game.invoke("0xA5FFE9B05F199DE7", inputGroup);
}


// Arg:p0 is [char*]	
g_Natives["0x3D42B92563939375"] = (p0) => 
{
	return mp.game.invoke("0x3D42B92563939375", p0);
}


// Arg:p0 is [char*]	
g_Natives["0x4683149ED1DDE7A1"] = (p0) => 
{
	return mp.game.invoke("0x4683149ED1DDE7A1", p0);
}

g_Natives["0x643ED62D5EA3BEBD"] = () => 
{
	return mp.game.invoke("0x643ED62D5EA3BEBD");
}


// Arg:inputGroup is [int]	
g_Natives._DISABLE_INPUT_GROUP = (inputGroup) => 
{
	return mp.game.invoke("0x7F4724035FDCA1DD", inputGroup);
}


// Arg:x is [Blip]	
g_Natives["0xAD6875BBC0FC899C"] = (x) => 
{
	return mp.game.invoke("0xAD6875BBC0FC899C", x);
}

g_Natives["0x6CC86E78358D5119"] = () => 
{
	return mp.game.invoke("0x6CC86E78358D5119");
}


// Arg:p0 is [Any]	
g_Natives["0xFCCAE5B92A830878"] = (p0) => 
{
	return mp.game.invoke("0xFCCAE5B92A830878", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x15FF52B809DB2353"] = (p0) => 
{
	return mp.game.invoke("0x15FF52B809DB2353", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF8CC1EBE0B62E29F"] = (p0) => 
{
	return mp.game.invoke("0xF8CC1EBE0B62E29F", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x22DA66936E0FFF37"] = (p0) => 
{
	return mp.game.invoke("0x22DA66936E0FFF37", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x8F5EA1C01D65A100"] = (p0) => 
{
	return mp.game.invoke("0x8F5EA1C01D65A100", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	Arg:p2 is [char*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	Arg:type is [char*]	Arg:p6 is [BOOL]	
g_Natives["0xC84527E235FCA219"] = (p0, p1, p2, p3, p4, type, p6) => 
{
	return mp.game.invoke("0xC84527E235FCA219", p0, p1, p2, p3, p4, type, p6);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	Arg:p2 is [char*]	Arg:p3 is [char*]	Arg:p4 is [BOOL]	
g_Natives["0xA5EFC3E847D60507"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xA5EFC3E847D60507", p0, p1, p2, p3, p4);
}


// Arg:p0 is [char*]	Arg:p1 is [Any*]	Arg:p2 is [BOOL]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	Arg:p5 is [Any*]	Arg:type is [char*]	
g_Natives["0x648E7A5434AF7969"] = (p0, p1, p2, p3, p4, p5, type) => 
{
	return mp.game.invoke("0x648E7A5434AF7969", p0, p1, p2, p3, p4, p5, type);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	Arg:p2 is [char*]	Arg:p3 is [char*]	Arg:type is [char*]	
g_Natives["0x4645DE9980999E93"] = (p0, p1, p2, p3, type) => 
{
	return mp.game.invoke("0x4645DE9980999E93", p0, p1, p2, p3, type);
}


// Arg:p0 is [char*]	Arg:p1 is [float]	Arg:type is [char*]	
g_Natives["0x692D808C34A82143"] = (p0, p1, type) => 
{
	return mp.game.invoke("0x692D808C34A82143", p0, p1, type);
}


// Arg:p0 is [int]	
g_Natives._SEND_UGC_DATAFILE = (p0) => 
{
	return mp.game.invoke("0xA69AC4ADE82B57A4", p0);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	
g_Natives["0x9CB0BFA7A9342C3D"] = (p0, p1) => 
{
	return mp.game.invoke("0x9CB0BFA7A9342C3D", p0, p1);
}


// Arg:p0 is [int]	
g_Natives["0x52818819057F2B40"] = (p0) => 
{
	return mp.game.invoke("0x52818819057F2B40", p0);
}


// Arg:p0 is [int]	
g_Natives["0x01095C95CD46B624"] = (p0) => 
{
	return mp.game.invoke("0x01095C95CD46B624", p0);
}


// Arg:filename is [char*]	
g_Natives._LOAD_UGC_FILE = (filename) => 
{
	return mp.game.invoke("0xC5238C011AF405E4", filename);
}

g_Natives.DATAFILE_CREATE = () => 
{
	return mp.game.invoke("0xD27058A1CA2B13EE");
}

g_Natives.DATAFILE_DELETE = () => 
{
	return mp.game.invoke("0x9AB9C1CFC8862DFB");
}

g_Natives["0x2ED61456317B8178"] = () => 
{
	return mp.game.invoke("0x2ED61456317B8178");
}

g_Natives["0xC55854C7D7274882"] = () => 
{
	return mp.game.invoke("0xC55854C7D7274882");
}

g_Natives.DATAFILE_GET_FILE_DICT = () => 
{
	return mp.game.invoke("0x906B778CA1DC72B6");
}


// Arg:filename is [char*]	
g_Natives["0x83BCCE3224735F05"] = (filename) => 
{
	return mp.game.invoke("0x83BCCE3224735F05", filename);
}


// Arg:p0 is [BOOL*]	
g_Natives["0x4DFDD9EB705F8140"] = (p0) => 
{
	return mp.game.invoke("0x4DFDD9EB705F8140", p0);
}

g_Natives.DATAFILE_IS_SAVE_PENDING = () => 
{
	return mp.game.invoke("0xBEDB96A7584AA8CF");
}


// Arg:objectData is [Any*]	Arg:key is [char*]	Arg:value is [BOOL]	
g_Natives._OBJECT_VALUE_ADD_BOOLEAN = (objectData, key, value) => 
{
	return mp.game.invoke("0x35124302A556A325", objectData, key, value);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	Arg:value is [int]	
g_Natives._OBJECT_VALUE_ADD_INTEGER = (objectData, key, value) => 
{
	return mp.game.invoke("0xE7E035450A7948D5", objectData, key, value);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	Arg:value is [float]	
g_Natives._OBJECT_VALUE_ADD_FLOAT = (objectData, key, value) => 
{
	return mp.game.invoke("0xC27E1CC2D795105E", objectData, key, value);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	Arg:value is [char*]	
g_Natives._OBJECT_VALUE_ADD_STRING = (objectData, key, value) => 
{
	return mp.game.invoke("0x8FF3847DADD8E30C", objectData, key, value);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	Arg:valueX is [float]	Arg:valueY is [float]	Arg:valueZ is [float]	
g_Natives._OBJECT_VALUE_ADD_VECTOR3 = (objectData, key, valueX, valueY, valueZ) => 
{
	return mp.game.invoke("0x4CD49B76338C7DEE", objectData, key, valueX, valueY, valueZ);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_ADD_OBJECT = (objectData, key) => 
{
	return mp.game.invoke("0xA358F56F10732EE1", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_ADD_ARRAY = (objectData, key) => 
{
	return mp.game.invoke("0x5B11728527CA6E5F", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_BOOLEAN = (objectData, key) => 
{
	return mp.game.invoke("0x1186940ED72FFEEC", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_INTEGER = (objectData, key) => 
{
	return mp.game.invoke("0x78F06F6B1FB5A80C", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_FLOAT = (objectData, key) => 
{
	return mp.game.invoke("0x06610343E73B9727", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_STRING = (objectData, key) => 
{
	return mp.game.invoke("0x3D2FD9E763B24472", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_VECTOR3 = (objectData, key) => 
{
	return mp.game.invoke("0x46CD3CB66E0825CC", objectData, key);
}


// Arg:sCloudFile is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_OBJECT = (sCloudFile, key) => 
{
	return mp.game.invoke("0xB6B9DDC412FCEEE2", sCloudFile, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_ARRAY = (objectData, key) => 
{
	return mp.game.invoke("0x7A983AA9DA2659ED", objectData, key);
}


// Arg:objectData is [Any*]	Arg:key is [char*]	
g_Natives._OBJECT_VALUE_GET_TYPE = (objectData, key) => 
{
	return mp.game.invoke("0x031C55ED33227371", objectData, key);
}


// Arg:arrayData is [Any*]	Arg:value is [BOOL]	
g_Natives._ARRAY_VALUE_ADD_BOOLEAN = (arrayData, value) => 
{
	return mp.game.invoke("0xF8B0F5A43E928C76", arrayData, value);
}


// Arg:arrayData is [Any*]	Arg:value is [int]	
g_Natives._ARRAY_VALUE_ADD_INTEGER = (arrayData, value) => 
{
	return mp.game.invoke("0xCABDB751D86FE93B", arrayData, value);
}


// Arg:arrayData is [Any*]	Arg:value is [float]	
g_Natives._ARRAY_VALUE_ADD_FLOAT = (arrayData, value) => 
{
	return mp.game.invoke("0x57A995FD75D37F56", arrayData, value);
}


// Arg:arrayData is [Any*]	Arg:value is [char*]	
g_Natives._ARRAY_VALUE_ADD_STRING = (arrayData, value) => 
{
	return mp.game.invoke("0x2F0661C155AEEEAA", arrayData, value);
}


// Arg:arrayData is [Any*]	Arg:valueX is [float]	Arg:valueY is [float]	Arg:valueZ is [float]	
g_Natives._ARRAY_VALUE_ADD_VECTOR3 = (arrayData, valueX, valueY, valueZ) => 
{
	return mp.game.invoke("0x407F8D034F70F0C2", arrayData, valueX, valueY, valueZ);
}


// Arg:arrayData is [Any*]	
g_Natives._ARRAY_VALUE_ADD_OBJECT = (arrayData) => 
{
	return mp.game.invoke("0x6889498B3E19C797", arrayData);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_BOOLEAN = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0x50C1B2874E50C114", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_INTEGER = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0x3E5AE19425CD74BE", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_FLOAT = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0xC0C527B525D7CFB5", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_STRING = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0xD3F2FFEB8D836F52", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_VECTOR3 = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0x8D2064E5B64A628A", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_OBJECT = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0x8B5FADCC4E3A145F", arrayData, arrayIndex);
}


// Arg:arrayData is [Any*]	
g_Natives._ARRAY_VALUE_GET_SIZE = (arrayData) => 
{
	return mp.game.invoke("0x065DB281590CEA2D", arrayData);
}


// Arg:arrayData is [Any*]	Arg:arrayIndex is [int]	
g_Natives._ARRAY_VALUE_GET_TYPE = (arrayData, arrayIndex) => 
{
	return mp.game.invoke("0x3A0014ADB172A3C5", arrayData, arrayIndex);
}


// Arg:X is [float]	Arg:Y is [float]	Arg:Z is [float]	Arg:maxChildren is [int]	Arg:isGasFire is [BOOL]	
g_Natives.START_SCRIPT_FIRE = (X, Y, Z, maxChildren, isGasFire) => 
{
	return mp.game.invoke("0x6B83617E04503888", X, Y, Z, maxChildren, isGasFire);
}


// Arg:fireHandle is [int]	
g_Natives.REMOVE_SCRIPT_FIRE = (fireHandle) => 
{
	return mp.game.invoke("0x7FF548385680673F", fireHandle);
}


// Arg:entity is [Ped]	
g_Natives.START_ENTITY_FIRE = (entity) => 
{
	return mp.game.invoke("0xF6A9D9708F6F23DF", entity);
}


// Arg:entity is [Entity]	
g_Natives.STOP_ENTITY_FIRE = (entity) => 
{
	return mp.game.invoke("0x7F0DD2EBBB651AFF", entity);
}


// Arg:entity is [Entity]	
g_Natives.IS_ENTITY_ON_FIRE = (entity) => 
{
	return mp.game.invoke("0x28D3FED7190D3A0B", entity);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.GET_NUMBER_OF_FIRES_IN_RANGE = (x, y, z, radius) => 
{
	return mp.game.invoke("0x50CAD495A460B305", x, y, z, radius);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.STOP_FIRE_IN_RANGE = (x, y, z, radius) => 
{
	return mp.game.invoke("0x056A8A219B8E829F", x, y, z, radius);
}


// Arg:outPosition is [Vector3*]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_CLOSEST_FIRE_POS = (outPosition, x, y, z) => 
{
	return mp.game.invoke("0x352A9F6BCF90081F", outPosition, x, y, z);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:explosionType is [int]	Arg:damageScale is [float]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:cameraShake is [float]	
g_Natives.ADD_EXPLOSION = (x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake) => 
{
	return mp.game.invoke("0xE3AD2BDBAEE269AC", x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:explosionType is [int]	Arg:damageScale is [float]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:cameraShake is [float]	
g_Natives.ADD_OWNED_EXPLOSION = (ped, x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake) => 
{
	return mp.game.invoke("0x172AA1B624FA1013", ped, x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake);
}


// Arg:x is [Entity]	Arg:y is [Entity]	Arg:z is [Entity]	Arg:explosionType is [int]	Arg:explosionFx is [Hash]	Arg:damageScale is [float]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:cameraShake is [float]	
g_Natives.ADD_EXPLOSION_WITH_USER_VFX = (x, y, z, explosionType, explosionFx, damageScale, isAudible, isInvisible, cameraShake) => 
{
	return mp.game.invoke("0x36DD3FE58B5E5212", x, y, z, explosionType, explosionFx, damageScale, isAudible, isInvisible, cameraShake);
}


// Arg:explosionType is [int]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.IS_EXPLOSION_IN_AREA = (explosionType, x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0x2E2EBA0EE7CED0E0", explosionType, x1, y1, z1, x2, y2, z2);
}


// Arg:explosionType is [int]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives._GET_EXPLOSIONS_IN_AREA = (explosionType, x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0x6070104B699B2EF4", explosionType, x1, y1, z1, x2, y2, z2);
}


// Arg:explosionType is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.IS_EXPLOSION_IN_SPHERE = (explosionType, x, y, z, radius) => 
{
	return mp.game.invoke("0xAB0F816885B0E483", explosionType, x, y, z, radius);
}


// Arg:explosionType is [int]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:angle is [float]	
g_Natives.IS_EXPLOSION_IN_ANGLED_AREA = (explosionType, x1, y1, z1, x2, y2, z2, angle) => 
{
	return mp.game.invoke("0xA079A6C51525DC4B", explosionType, x1, y1, z1, x2, y2, z2, angle);
}


// Arg:explosionType is [int]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:radius is [float]	
g_Natives._GET_PED_INSIDE_EXPLOSION_AREA = (explosionType, x1, y1, z1, x2, y2, z2, radius) => 
{
	return mp.game.invoke("0x14BA4BA137AF6CEC", explosionType, x1, y1, z1, x2, y2, z2, radius);
}


// Arg:ped is [Ped]	Arg:name is [Hash]	
g_Natives.SET_DECISION_MAKER = (ped, name) => 
{
	return mp.game.invoke("0xB604A2942ADED0EE", ped, name);
}


// Arg:name is [Hash]	Arg:type is [int]	
g_Natives.CLEAR_DECISION_MAKER_EVENT_RESPONSE = (name, type) => 
{
	return mp.game.invoke("0x4FC9381A7AEE8968", name, type);
}


// Arg:name is [Hash]	Arg:type is [int]	
g_Natives.BLOCK_DECISION_MAKER_EVENT = (name, type) => 
{
	return mp.game.invoke("0xE42FCDFD0E4196F7", name, type);
}


// Arg:name is [Hash]	Arg:type is [int]	
g_Natives.UNBLOCK_DECISION_MAKER_EVENT = (name, type) => 
{
	return mp.game.invoke("0xD7CD9CF34F2C99E8", name, type);
}


// Arg:type is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:duration is [float]	
g_Natives.ADD_SHOCKING_EVENT_AT_POSITION = (type, x, y, z, duration) => 
{
	return mp.game.invoke("0xD9F8455409B525E9", type, x, y, z, duration);
}


// Arg:type is [int]	Arg:entity is [Entity]	Arg:duration is [float]	
g_Natives.ADD_SHOCKING_EVENT_FOR_ENTITY = (type, entity, duration) => 
{
	return mp.game.invoke("0x7FD8F3BE76F89422", type, entity, duration);
}


// Arg:type is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:radius is [float]	
g_Natives.IS_SHOCKING_EVENT_IN_SPHERE = (type, x, y, z, radius) => 
{
	return mp.game.invoke("0x1374ABB7C15BAB92", type, x, y, z, radius);
}


// Arg:event is [ScrHandle]	
g_Natives.REMOVE_SHOCKING_EVENT = (event) => 
{
	return mp.game.invoke("0x2CDA538C44C6CCE5", event);
}


// Arg:p0 is [BOOL]	
g_Natives.REMOVE_ALL_SHOCKING_EVENTS = (p0) => 
{
	return mp.game.invoke("0xEAABE8FDFA21274C", p0);
}

g_Natives.REMOVE_SHOCKING_EVENT_SPAWN_BLOCKING_AREAS = () => 
{
	return mp.game.invoke("0x340F1415B68AEADE");
}

g_Natives.SUPPRESS_SHOCKING_EVENTS_NEXT_FRAME = () => 
{
	return mp.game.invoke("0x2F9A292AD0A3BD89");
}


// Arg:type is [int]	
g_Natives.SUPPRESS_SHOCKING_EVENT_TYPE_NEXT_FRAME = (type) => 
{
	return mp.game.invoke("0x3FD2EC8BF1F1CF30", type);
}

g_Natives.SUPPRESS_AGITATION_EVENTS_NEXT_FRAME = () => 
{
	return mp.game.invoke("0x5F3B7749C112D552");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_ZONE_AT_COORDS = (x, y, z) => 
{
	return mp.game.invoke("0x27040C25DE6CB2F4", x, y, z);
}


// Arg:zoneName is [char*]	
g_Natives.GET_ZONE_FROM_NAME_ID = (zoneName) => 
{
	return mp.game.invoke("0x98CD1D2934B76CC1", zoneName);
}


// Arg:zoneId is [int]	
g_Natives.GET_ZONE_POPSCHEDULE = (zoneId) => 
{
	return mp.game.invoke("0x4334BC40AA0CB4BB", zoneId);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_NAME_OF_ZONE = (x, y, z) => 
{
	return mp.game.invoke("0xCD90657D4C30E1CA", x, y, z);
}


// Arg:zoneId is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_ZONE_ENABLED = (zoneId, toggle) => 
{
	return mp.game.invoke("0xBA5ECEEA120E5611", zoneId, toggle);
}


// Arg:zoneId is [int]	
g_Natives.GET_ZONE_SCUMMINESS = (zoneId) => 
{
	return mp.game.invoke("0x5F7B268D15BA0739", zoneId);
}


// Arg:scheduleId is [int]	Arg:vehicleHash is [Hash]	
g_Natives.OVERRIDE_POPSCHEDULE_VEHICLE_MODEL = (scheduleId, vehicleHash) => 
{
	return mp.game.invoke("0x5F7D596BAC2E7777", scheduleId, vehicleHash);
}


// Arg:scheduleId is [int]	
g_Natives.CLEAR_POPSCHEDULE_OVERRIDE_VEHICLE_MODEL = (scheduleId) => 
{
	return mp.game.invoke("0x5C0DE367AA0D911C", scheduleId);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.GET_HASH_OF_MAP_AREA_AT_COORDS = (x, y, z) => 
{
	return mp.game.invoke("0x7EE64D51E8498728", x, y, z);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:length is [float]	Arg:ropeType is [int]	Arg:maxLength is [float]	Arg:minLength is [float]	Arg:p10 is [float]	Arg:p11 is [BOOL]	Arg:p12 is [BOOL]	Arg:rigid is [BOOL]	Arg:p14 is [float]	Arg:breakWhenShot is [BOOL]	Arg:unkPtr is [Any*]	
g_Natives.ADD_ROPE = (x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, p10, p11, p12, rigid, p14, breakWhenShot, unkPtr) => 
{
	return mp.game.invoke("0xE832D760399EB220", x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, p10, p11, p12, rigid, p14, breakWhenShot, unkPtr);
}


// Arg:rope is [Object*]	
g_Natives.DELETE_ROPE = (rope) => 
{
	return mp.game.invoke("0x52B4829281364649", rope);
}


// Arg:rope is [Object]	
g_Natives.DELETE_CHILD_ROPE = (rope) => 
{
	return mp.game.invoke("0xAA5D6B1888E4DB20", rope);
}


// Arg:rope is [Object*]	
g_Natives.DOES_ROPE_EXIST = (rope) => 
{
	return mp.game.invoke("0xFD5448BE3111ED96", rope);
}


// Arg:rope is [Object*]	Arg:toggle is [BOOL]	
g_Natives.ROPE_DRAW_SHADOW_ENABLED = (rope, toggle) => 
{
	return mp.game.invoke("0xF159A63806BB5BA8", rope, toggle);
}


// Arg:rope is [Object]	Arg:rope_preset is [char*]	
g_Natives.LOAD_ROPE_DATA = (rope, rope_preset) => 
{
	return mp.game.invoke("0xCBB203C04D1ABD27", rope, rope_preset);
}


// Arg:rope is [Object]	Arg:vertex is [int]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.PIN_ROPE_VERTEX = (rope, vertex, x, y, z) => 
{
	return mp.game.invoke("0x2B320CF14146B69A", rope, vertex, x, y, z);
}


// Arg:rope is [Object]	Arg:vertex is [int]	
g_Natives.UNPIN_ROPE_VERTEX = (rope, vertex) => 
{
	return mp.game.invoke("0x4B5AE2EEE4A8F180", rope, vertex);
}


// Arg:rope is [Object]	
g_Natives.GET_ROPE_VERTEX_COUNT = (rope) => 
{
	return mp.game.invoke("0x3655F544CD30F0B5", rope);
}


// Arg:rope is [Object]	Arg:ent1 is [Entity]	Arg:ent2 is [Entity]	Arg:ent1_x is [float]	Arg:ent1_y is [float]	Arg:ent1_z is [float]	Arg:ent2_x is [float]	Arg:ent2_y is [float]	Arg:ent2_z is [float]	Arg:length is [float]	Arg:p10 is [BOOL]	Arg:p11 is [BOOL]	Arg:boneName1 is [char*]	Arg:boneName2 is [char*]	
g_Natives.ATTACH_ENTITIES_TO_ROPE = (rope, ent1, ent2, ent1_x, ent1_y, ent1_z, ent2_x, ent2_y, ent2_z, length, p10, p11, boneName1, boneName2) => 
{
	return mp.game.invoke("0x3D95EC8B6D940AC3", rope, ent1, ent2, ent1_x, ent1_y, ent1_z, ent2_x, ent2_y, ent2_z, length, p10, p11, boneName1, boneName2);
}


// Arg:rope is [Object]	Arg:entity is [Entity]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p5 is [BOOL]	
g_Natives.ATTACH_ROPE_TO_ENTITY = (rope, entity, x, y, z, p5) => 
{
	return mp.game.invoke("0x4B490A6832559A65", rope, entity, x, y, z, p5);
}


// Arg:rope is [Object]	Arg:entity is [Entity]	
g_Natives.DETACH_ROPE_FROM_ENTITY = (rope, entity) => 
{
	return mp.game.invoke("0xBCF3026912A8647D", rope, entity);
}


// Arg:rope is [Object]	
g_Natives.ROPE_SET_UPDATE_PINVERTS = (rope) => 
{
	return mp.game.invoke("0xC8D667EE52114ABA", rope);
}


// Arg:rope is [Object]	Arg:value is [int]	
g_Natives._HIDE_ROPE = (rope, value) => 
{
	return mp.game.invoke("0xDC57A637A20006ED", rope, value);
}


// Arg:rope is [Object]	Arg:p1 is [BOOL]	
g_Natives["0x36CCB9BE67B970FD"] = (rope, p1) => 
{
	return mp.game.invoke("0x36CCB9BE67B970FD", rope, p1);
}


// Arg:rope is [Object]	
g_Natives["0x84DE3B5FB3E666F0"] = (rope) => 
{
	return mp.game.invoke("0x84DE3B5FB3E666F0", rope);
}


// Arg:rope is [Object]	
g_Natives.GET_ROPE_LAST_VERTEX_COORD = (rope) => 
{
	return mp.game.invoke("0x21BB0FBD3E217C2D", rope);
}


// Arg:rope is [Object]	Arg:vertex is [int]	
g_Natives.GET_ROPE_VERTEX_COORD = (rope, vertex) => 
{
	return mp.game.invoke("0xEA61CA8E80F09E4D", rope, vertex);
}


// Arg:rope is [Object]	
g_Natives.START_ROPE_WINDING = (rope) => 
{
	return mp.game.invoke("0x1461C72C889E343E", rope);
}


// Arg:rope is [Object]	
g_Natives.STOP_ROPE_WINDING = (rope) => 
{
	return mp.game.invoke("0xCB2D4AB84A19AA7C", rope);
}


// Arg:rope is [Object]	
g_Natives.START_ROPE_UNWINDING_FRONT = (rope) => 
{
	return mp.game.invoke("0x538D1179EC1AA9A9", rope);
}


// Arg:rope is [Object]	
g_Natives.STOP_ROPE_UNWINDING_FRONT = (rope) => 
{
	return mp.game.invoke("0xFFF3A50779EFBBB3", rope);
}


// Arg:rope is [Object]	
g_Natives.ROPE_CONVERT_TO_SIMPLE = (rope) => 
{
	return mp.game.invoke("0x5389D48EFA2F079A", rope);
}

g_Natives.ROPE_LOAD_TEXTURES = () => 
{
	return mp.game.invoke("0x9B9039DBF2D258C1");
}

g_Natives.ROPE_ARE_TEXTURES_LOADED = () => 
{
	return mp.game.invoke("0xF2D0E6A75CC05597");
}

g_Natives.ROPE_UNLOAD_TEXTURES = () => 
{
	return mp.game.invoke("0x6CE36C35C1AC8163");
}


// Arg:rope is [Object]	
g_Natives["0x271C9D3ACA5D6409"] = (rope) => 
{
	return mp.game.invoke("0x271C9D3ACA5D6409", rope);
}


// Arg:rope is [Object]	Arg:unk is [int]	Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:x3 is [float]	Arg:y3 is [float]	Arg:z3 is [float]	Arg:x4 is [float]	Arg:y4 is [float]	Arg:z4 is [float]	
g_Natives["0xBC0CE682D4D05650"] = (rope, unk, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) => 
{
	return mp.game.invoke("0xBC0CE682D4D05650", rope, unk, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives["0xB1B6216CA2E7B55E"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB1B6216CA2E7B55E", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xB743F735C03D7810"] = (p0, p1) => 
{
	return mp.game.invoke("0xB743F735C03D7810", p0, p1);
}


// Arg:rope is [Object]	
g_Natives._GET_ROPE_LENGTH = (rope) => 
{
	return mp.game.invoke("0x73040398DFF9A4A6", rope);
}


// Arg:rope is [Object]	Arg:length is [float]	
g_Natives.ROPE_FORCE_LENGTH = (rope, length) => 
{
	return mp.game.invoke("0xD009F759A723DB1B", rope, length);
}


// Arg:rope is [Object]	Arg:length is [float]	
g_Natives.ROPE_RESET_LENGTH = (rope, length) => 
{
	return mp.game.invoke("0xC16DE94D9BEA14A0", rope, length);
}


// Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:vecX is [float]	Arg:vecY is [float]	Arg:vecZ is [float]	Arg:impulse is [float]	
g_Natives.APPLY_IMPULSE_TO_CLOTH = (posX, posY, posZ, vecX, vecY, vecZ, impulse) => 
{
	return mp.game.invoke("0xE37F721824571784", posX, posY, posZ, vecX, vecY, vecZ, impulse);
}


// Arg:ropeorobject is [Object]	Arg:vertex is [int]	Arg:value is [float]	
g_Natives.SET_DAMPING = (ropeorobject, vertex, value) => 
{
	return mp.game.invoke("0xEEA3B200A6FEB65B", ropeorobject, vertex, value);
}


// Arg:entity is [Entity]	
g_Natives.ACTIVATE_PHYSICS = (entity) => 
{
	return mp.game.invoke("0x710311ADF0E20730", entity);
}


// Arg:rope is [Object]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.SET_CGOFFSET = (rope, x, y, z) => 
{
	return mp.game.invoke("0xD8FA3908D7B86904", rope, x, y, z);
}


// Arg:rope is [Object]	
g_Natives.GET_CGOFFSET = (rope) => 
{
	return mp.game.invoke("0x8214A4B5A7A33612", rope);
}


// Arg:rope is [Object]	
g_Natives.SET_CG_AT_BOUNDCENTER = (rope) => 
{
	return mp.game.invoke("0xBE520D9761FF811F", rope);
}


// Arg:object is [Object]	Arg:posX is [float]	Arg:posY is [float]	Arg:posZ is [float]	Arg:p4 is [float]	Arg:offsetX is [float]	Arg:offsetY is [float]	Arg:offsetZ is [float]	Arg:p8 is [float]	Arg:p9 is [int]	Arg:p10 is [BOOL]	
g_Natives.BREAK_ENTITY_GLASS = (object, posX, posY, posZ, p4, offsetX, offsetY, offsetZ, p8, p9, p10) => 
{
	return mp.game.invoke("0x2E648D16F6E308F3", object, posX, posY, posZ, p4, offsetX, offsetY, offsetZ, p8, p9, p10);
}


// Arg:rope is [Object]	Arg:enabled is [BOOL]	
g_Natives.SET_DISABLE_BREAKING = (rope, enabled) => 
{
	return mp.game.invoke("0x5CEC1A84620E7D5B", rope, enabled);
}


// Arg:object is [Object]	
g_Natives["0xCC6E963682533882"] = (object) => 
{
	return mp.game.invoke("0xCC6E963682533882", object);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives.SET_DISABLE_FRAG_DAMAGE = (object, toggle) => 
{
	return mp.game.invoke("0x01BA3AED21C16CFB", object, toggle);
}


// Arg:x is [float]	Arg:y is [float]	Arg:A is [float]	Arg:height is [float*]	
g_Natives.GET_WATER_HEIGHT = (x, y, A, height) => 
{
	return mp.game.invoke("0xF6829842C06AE524", x, y, A, height);
}


// Arg:B is [float]	Arg:y is [float]	Arg:z is [float]	Arg:height is [float*]	
g_Natives.GET_WATER_HEIGHT_NO_WAVES = (B, y, z, height) => 
{
	return mp.game.invoke("0x8EE6B53CE13A9794", B, y, z, height);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:result is [Vector3*]	
g_Natives.TEST_PROBE_AGAINST_WATER = (x1, y1, z1, x2, y2, z2, result) => 
{
	return mp.game.invoke("0xFFA5D878809819DB", x1, y1, z1, x2, y2, z2, result);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:type is [int]	Arg:result is [Vector3*]	
g_Natives.TEST_PROBE_AGAINST_ALL_WATER = (x1, y1, z1, x2, y2, z2, type, result) => 
{
	return mp.game.invoke("0x8974647ED222EA5F", x1, y1, z1, x2, y2, z2, type, result);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p3 is [float]	Arg:height is [float*]	
g_Natives.TEST_VERTICAL_PROBE_AGAINST_ALL_WATER = (x, y, z, p3, height) => 
{
	return mp.game.invoke("0x2B3451FA1E3142E2", x, y, z, p3, height);
}


// Arg:x is [float]	Arg:y is [float]	Arg:radius is [float]	Arg:height is [float]	
g_Natives.MODIFY_WATER = (x, y, radius, height) => 
{
	return mp.game.invoke("0xC443FD757C3BA637", x, y, radius, height);
}


// Arg:xLow is [float]	Arg:yLow is [float]	Arg:xHigh is [float]	Arg:yHigh is [float]	Arg:height is [float]	
g_Natives._ADD_CURRENT_RISE = (xLow, yLow, xHigh, yHigh, height) => 
{
	return mp.game.invoke("0xFDBF4CDBC07E1706", xLow, yLow, xHigh, yHigh, height);
}


// Arg:riseHandle is [int]	
g_Natives._REMOVE_CURRENT_RISE = (riseHandle) => 
{
	return mp.game.invoke("0xB1252E3E59A82AAF", riseHandle);
}


// Arg:intensity is [float]	
g_Natives._SET_CURRENT_INTENSITY = (intensity) => 
{
	return mp.game.invoke("0xB96B00E976BE977F", intensity);
}

g_Natives._GET_CURRENT_INTENSITY = () => 
{
	return mp.game.invoke("0x2B2A2CC86778B619");
}

g_Natives._RESET_CURRENT_INTENSITY = () => 
{
	return mp.game.invoke("0x5E5E99285AE812DB");
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:flags is [int]	Arg:ent is [Entity]	Arg:p8 is [int]	
g_Natives.START_SHAPE_TEST_LOS_PROBE = (x1, y1, z1, x2, y2, z2, flags, ent, p8) => 
{
	return mp.game.invoke("0x7EE9F5D83DD4F90E", x1, y1, z1, x2, y2, z2, flags, ent, p8);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:flags is [int]	Arg:entity is [Entity]	Arg:p8 is [int]	
g_Natives._START_SHAPE_TEST_RAY = (x1, y1, z1, x2, y2, z2, flags, entity, p8) => 
{
	return mp.game.invoke("0x377906D8A31E5586", x1, y1, z1, x2, y2, z2, flags, entity, p8);
}


// Arg:entity is [Entity]	Arg:flags1 is [int]	Arg:flags2 is [int]	
g_Natives.START_SHAPE_TEST_BOUNDING_BOX = (entity, flags1, flags2) => 
{
	return mp.game.invoke("0x052837721A854EC7", entity, flags1, flags2);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:x1 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:rotX is [float]	Arg:rotY is [float]	Arg:rotZ is [float]	Arg:p9 is [Any]	Arg:p10 is [Any]	Arg:entity is [Any]	Arg:p12 is [Any]	
g_Natives.START_SHAPE_TEST_BOX = (x, y, z, x1, y2, z2, rotX, rotY, rotZ, p9, p10, entity, p12) => 
{
	return mp.game.invoke("0xFE466162C4401D18", x, y, z, x1, y2, z2, rotX, rotY, rotZ, p9, p10, entity, p12);
}


// Arg:entity is [Entity]	Arg:flags1 is [int]	Arg:flags2 is [int]	
g_Natives.START_SHAPE_TEST_BOUND = (entity, flags1, flags2) => 
{
	return mp.game.invoke("0x37181417CE7C8900", entity, flags1, flags2);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:radius is [float]	Arg:flags is [int]	Arg:entity is [Entity]	Arg:p9 is [int]	
g_Natives.START_SHAPE_TEST_CAPSULE = (x1, y1, z1, x2, y2, z2, radius, flags, entity, p9) => 
{
	return mp.game.invoke("0x28579D1B8F8AAC80", x1, y1, z1, x2, y2, z2, radius, flags, entity, p9);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	Arg:radius is [float]	Arg:flags is [int]	Arg:entity is [Entity]	Arg:p9 is [Any]	
g_Natives._START_SHAPE_TEST_CAPSULE_2 = (x1, y1, z1, x2, y2, z2, radius, flags, entity, p9) => 
{
	return mp.game.invoke("0xE6AC6C45FBE83004", x1, y1, z1, x2, y2, z2, radius, flags, entity, p9);
}


// Arg:pVec1 is [Vector3*]	Arg:pVec2 is [Vector3*]	Arg:flag is [int]	Arg:entity is [Entity]	Arg:flag2 is [int]	
g_Natives._START_SHAPE_TEST_SURROUNDING_COORDS = (pVec1, pVec2, flag, entity, flag2) => 
{
	return mp.game.invoke("0xFF6BE494C7987F34", pVec1, pVec2, flag, entity, flag2);
}


// Arg:rayHandle is [int]	Arg:hit is [BOOL*]	Arg:endCoords is [Vector3*]	Arg:surfaceNormal is [Vector3*]	Arg:entityHit is [Entity*]	
g_Natives.GET_SHAPE_TEST_RESULT = (rayHandle, hit, endCoords, surfaceNormal, entityHit) => 
{
	return mp.game.invoke("0x3D87450E15D98694", rayHandle, hit, endCoords, surfaceNormal, entityHit);
}


// Arg:rayHandle is [int]	Arg:hit is [BOOL*]	Arg:endCoords is [Vector3*]	Arg:surfaceNormal is [Vector3*]	Arg:materialHash is [Hash*]	Arg:entityHit is [Entity*]	
g_Natives._GET_SHAPE_TEST_RESULT_EX = (rayHandle, hit, endCoords, surfaceNormal, materialHash, entityHit) => 
{
	return mp.game.invoke("0x65287525D951F6BE", rayHandle, hit, endCoords, surfaceNormal, materialHash, entityHit);
}


// Arg:entityHit is [Hash]	
g_Natives._SHAPE_TEST_RESULT_ENTITY = (entityHit) => 
{
	return mp.game.invoke("0x2B3334BCA57CD799", entityHit);
}

g_Natives.NETWORK_IS_SIGNED_IN = () => 
{
	return mp.game.invoke("0x054354A99211EB96");
}

g_Natives.NETWORK_IS_SIGNED_ONLINE = () => 
{
	return mp.game.invoke("0x1077788E268557C2");
}

g_Natives["0xBD545D44CCE70597"] = () => 
{
	return mp.game.invoke("0xBD545D44CCE70597");
}

g_Natives["0xEBCAB9E5048434F4"] = () => 
{
	return mp.game.invoke("0xEBCAB9E5048434F4");
}

g_Natives["0x74FB3E29E6D10FA9"] = () => 
{
	return mp.game.invoke("0x74FB3E29E6D10FA9");
}

g_Natives["0x7808619F31FF22DB"] = () => 
{
	return mp.game.invoke("0x7808619F31FF22DB");
}

g_Natives["0xA0FA4EC6A05DA44E"] = () => 
{
	return mp.game.invoke("0xA0FA4EC6A05DA44E");
}

g_Natives._NETWORK_ARE_ROS_AVAILABLE = () => 
{
	return mp.game.invoke("0x85443FF4C328F53B");
}

g_Natives._NETWORK_IS_NP_AVAILABLE = () => 
{
	return mp.game.invoke("0x8D11E61A4ABF49CC");
}

g_Natives.NETWORK_IS_CLOUD_AVAILABLE = () => 
{
	return mp.game.invoke("0x9A4CF4F48AD77302");
}

g_Natives["0x67A5589628E0CFF6"] = () => 
{
	return mp.game.invoke("0x67A5589628E0CFF6");
}

g_Natives["0xBA9775570DB788CF"] = () => 
{
	return mp.game.invoke("0xBA9775570DB788CF");
}

g_Natives.NETWORK_IS_HOST = () => 
{
	return mp.game.invoke("0x8DB296B814EDDA07");
}

g_Natives["0xA306F470D1660581"] = () => 
{
	return mp.game.invoke("0xA306F470D1660581");
}

g_Natives["0x4237E822315D8BA9"] = () => 
{
	return mp.game.invoke("0x4237E822315D8BA9");
}

g_Natives.NETWORK_HAVE_ONLINE_PRIVILEGES = () => 
{
	return mp.game.invoke("0x25CB5A9F37BFD063");
}

g_Natives._NETWORK_HAS_RESTRICTED_PROFILE = () => 
{
	return mp.game.invoke("0x1353F87E89946207");
}


// Arg:p0 is [Any]	
g_Natives._72D918C99BCACC54 = (p0) => 
{
	return mp.game.invoke("0x72D918C99BCACC54", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xAEEF48CDF5B6CE7C"] = (p0, p1) => 
{
	return mp.game.invoke("0xAEEF48CDF5B6CE7C", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x78321BEA235FD8CD"] = (p0, p1) => 
{
	return mp.game.invoke("0x78321BEA235FD8CD", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives["0x595F028698072DD9"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x595F028698072DD9", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	
g_Natives["0x83F28CE49FBBFFBA"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x83F28CE49FBBFFBA", p0, p1, p2);
}

g_Natives["0x76BF03FADBF154F5"] = () => 
{
	return mp.game.invoke("0x76BF03FADBF154F5");
}

g_Natives["0x9614B71F8ADB982B"] = () => 
{
	return mp.game.invoke("0x9614B71F8ADB982B");
}

g_Natives["0x5EA784D197556507"] = () => 
{
	return mp.game.invoke("0x5EA784D197556507");
}

g_Natives["0xA8ACB6459542A8C8"] = () => 
{
	return mp.game.invoke("0xA8ACB6459542A8C8");
}

g_Natives["0x83FE8D7229593017"] = () => 
{
	return mp.game.invoke("0x83FE8D7229593017");
}

g_Natives.NETWORK_CAN_BAIL = () => 
{
	return mp.game.invoke("0x580CE4438479CC61");
}

g_Natives.NETWORK_BAIL = () => 
{
	return mp.game.invoke("0x95914459A87EBA28");
}

g_Natives["0x283B6062A2C01E9B"] = () => 
{
	return mp.game.invoke("0x283B6062A2C01E9B");
}


// Arg:loadingState is [int*]	
g_Natives.NETWORK_CAN_ACCESS_MULTIPLAYER = (loadingState) => 
{
	return mp.game.invoke("0xAF50DA1A3F8B1BA4", loadingState);
}

g_Natives.NETWORK_IS_MULTIPLAYER_DISABLED = () => 
{
	return mp.game.invoke("0x9747292807126EDA");
}

g_Natives.NETWORK_CAN_ENTER_MULTIPLAYER = () => 
{
	return mp.game.invoke("0x7E782A910C362C25");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:maxPlayers is [int]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.NETWORK_SESSION_ENTER = (p0, p1, p2, maxPlayers, p4, p5) => 
{
	return mp.game.invoke("0x330ED4D05491934F", p0, p1, p2, maxPlayers, p4, p5);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:maxPlayers is [int]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SESSION_FRIEND_MATCHMAKING = (p0, p1, maxPlayers, p3) => 
{
	return mp.game.invoke("0x2CFC76E0D087C994", p0, p1, maxPlayers, p3);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:maxPlayers is [int]	Arg:p4 is [BOOL]	
g_Natives.NETWORK_SESSION_CREW_MATCHMAKING = (p0, p1, p2, maxPlayers, p4) => 
{
	return mp.game.invoke("0x94BC51E9449D917F", p0, p1, p2, maxPlayers, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.NETWORK_SESSION_ACTIVITY_QUICKMATCH = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xBE3E347A87ACEB82", p0, p1, p2, p3);
}


// Arg:p0 is [int]	Arg:maxPlayers is [int]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SESSION_HOST = (p0, maxPlayers, p2) => 
{
	return mp.game.invoke("0x6F3D4ED9BEE4E61D", p0, maxPlayers, p2);
}


// Arg:p0 is [int]	Arg:maxPlayers is [int]	
g_Natives.NETWORK_SESSION_HOST_CLOSED = (p0, maxPlayers) => 
{
	return mp.game.invoke("0xED34C0C02C098BB7", p0, maxPlayers);
}


// Arg:p0 is [int]	Arg:maxPlayers is [int]	
g_Natives.NETWORK_SESSION_HOST_FRIENDS_ONLY = (p0, maxPlayers) => 
{
	return mp.game.invoke("0xB9CFD27A5D578D83", p0, maxPlayers);
}

g_Natives.NETWORK_SESSION_IS_CLOSED_FRIENDS = () => 
{
	return mp.game.invoke("0xFBCFA2EA2E206890");
}

g_Natives.NETWORK_SESSION_IS_CLOSED_CREW = () => 
{
	return mp.game.invoke("0x74732C6CA90DA2B4");
}

g_Natives.NETWORK_SESSION_IS_SOLO = () => 
{
	return mp.game.invoke("0xF3929C2379B60CCE");
}

g_Natives.NETWORK_SESSION_IS_PRIVATE = () => 
{
	return mp.game.invoke("0xCEF70AA5B3F89BA1");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.NETWORK_SESSION_END = (p0, p1) => 
{
	return mp.game.invoke("0xA02E59562D711006", p0, p1);
}


// Arg:player is [Player]	
g_Natives.NETWORK_SESSION_KICK_PLAYER = (player) => 
{
	return mp.game.invoke("0xFA8904DC5F304220", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_SESSION_GET_KICK_VOTE = (player) => 
{
	return mp.game.invoke("0xD6D09A6F32F49EF1", player);
}

g_Natives["0x59DF79317F85A7E0"] = () => 
{
	return mp.game.invoke("0x59DF79317F85A7E0");
}

g_Natives["0xFFE1E5B792D92B34"] = () => 
{
	return mp.game.invoke("0xFFE1E5B792D92B34");
}


// Arg:p0 is [int]	
g_Natives._NETWORK_SCTV_SLOTS = (p0) => 
{
	return mp.game.invoke("0x49EC8030F5015F8B", p0);
}


// Arg:playerType is [int]	Arg:playerCount is [int]	
g_Natives._NETWORK_SESSION_SET_MAX_PLAYERS = (playerType, playerCount) => 
{
	return mp.game.invoke("0x8B6A4DD0AF9CE215", playerType, playerCount);
}


// Arg:p0 is [int]	
g_Natives._NETWORK_SESSION_GET_UNK = (p0) => 
{
	return mp.game.invoke("0x56CE820830EF040B", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xCAE55F48D3D7875C"] = (p0) => 
{
	return mp.game.invoke("0xCAE55F48D3D7875C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF49ABC20D8552257"] = (p0) => 
{
	return mp.game.invoke("0xF49ABC20D8552257", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x4811BBAC21C5FCD5"] = (p0) => 
{
	return mp.game.invoke("0x4811BBAC21C5FCD5", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x5539C3EBF104A53A"] = (p0) => 
{
	return mp.game.invoke("0x5539C3EBF104A53A", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x702BC4D605522539"] = (p0) => 
{
	return mp.game.invoke("0x702BC4D605522539", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x3F52E880AAF6C8CA"] = (p0) => 
{
	return mp.game.invoke("0x3F52E880AAF6C8CA", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF1EEA2DDA9FFA69D"] = (p0) => 
{
	return mp.game.invoke("0xF1EEA2DDA9FFA69D", p0);
}

g_Natives["0x1153FA02A659051C"] = () => 
{
	return mp.game.invoke("0x1153FA02A659051C");
}


// Arg:p0 is [BOOL]	
g_Natives._NETWORK_SESSION_HOSTED = (p0) => 
{
	return mp.game.invoke("0xC19F6C8E7865A6FF", p0);
}


// Arg:p0 is [int*]	Arg:p1 is [int]	
g_Natives.NETWORK_ADD_FOLLOWERS = (p0, p1) => 
{
	return mp.game.invoke("0x236406F60CF216D6", p0, p1);
}

g_Natives.NETWORK_CLEAR_FOLLOWERS = () => 
{
	return mp.game.invoke("0x058F43EC59A8631A");
}


// Arg:hours is [int*]	Arg:minutes is [int*]	Arg:seconds is [int*]	
g_Natives._NETWORK_GET_SERVER_TIME = (hours, minutes, seconds) => 
{
	return mp.game.invoke("0x6D03BFBD643B2A02", hours, minutes, seconds);
}


// Arg:p0 is [Any]	
g_Natives["0x600F8CB31C7AAB6E"] = (p0) => 
{
	return mp.game.invoke("0x600F8CB31C7AAB6E", p0);
}


// Arg:crewId is [int]	
g_Natives.NETWORK_X_AFFECTS_GAMERS = (crewId) => 
{
	return mp.game.invoke("0xE532D6811B3A4D2A", crewId);
}


// Arg:attribute is [int]	Arg:p1 is [float]	Arg:lowerLimit is [float]	Arg:upperLimit is [float]	
g_Natives.NETWORK_FIND_MATCHED_GAMERS = (attribute, p1, lowerLimit, upperLimit) => 
{
	return mp.game.invoke("0xF7B2CFDE5C9F700D", attribute, p1, lowerLimit, upperLimit);
}

g_Natives.NETWORK_IS_FINDING_GAMERS = () => 
{
	return mp.game.invoke("0xDDDF64C91BFCF0AA");
}

g_Natives["0xF9B83B77929D8863"] = () => 
{
	return mp.game.invoke("0xF9B83B77929D8863");
}

g_Natives.NETWORK_GET_NUM_FOUND_GAMERS = () => 
{
	return mp.game.invoke("0xA1B043EE79A916FB");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives.NETWORK_GET_FOUND_GAMER = (p0, p1) => 
{
	return mp.game.invoke("0x9DCFF2AFB68B3476", p0, p1);
}

g_Natives.NETWORK_CLEAR_FOUND_GAMERS = () => 
{
	return mp.game.invoke("0x6D14CCEE1B40381A");
}


// Arg:p0 is [Any*]	
g_Natives["0x85A0EF54A500882C"] = (p0) => 
{
	return mp.game.invoke("0x85A0EF54A500882C", p0);
}

g_Natives["0x2CC848A861D01493"] = () => 
{
	return mp.game.invoke("0x2CC848A861D01493");
}

g_Natives["0x94A8394D150B013A"] = () => 
{
	return mp.game.invoke("0x94A8394D150B013A");
}

g_Natives["0x5AE17C6B0134B7F1"] = () => 
{
	return mp.game.invoke("0x5AE17C6B0134B7F1");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives["0x02A8BEC6FD9AF660"] = (p0, p1) => 
{
	return mp.game.invoke("0x02A8BEC6FD9AF660", p0, p1);
}

g_Natives._CLEAR_NET_FUNC_DATA = () => 
{
	return mp.game.invoke("0x86E0660E4F5C956D");
}

g_Natives.NETWORK_IS_PLAYER_ANIMATION_DRAWING_SYNCHRONIZED = () => 
{
	return mp.game.invoke("0xC6F8AB8A4189CF3A");
}

g_Natives.NETWORK_SESSION_CANCEL_INVITE = () => 
{
	return mp.game.invoke("0x2FBF47B1B36D36F9");
}

g_Natives.NETWORK_SESSION_FORCE_CANCEL_INVITE = () => 
{
	return mp.game.invoke("0xA29177F7703B5644");
}

g_Natives.NETWORK_HAS_PENDING_INVITE = () => 
{
	return mp.game.invoke("0xAC8C7B9B88C4A668");
}

g_Natives["0xC42DD763159F3461"] = () => 
{
	return mp.game.invoke("0xC42DD763159F3461");
}

g_Natives["0x62A0296C1BB1CEB3"] = () => 
{
	return mp.game.invoke("0x62A0296C1BB1CEB3");
}

g_Natives.NETWORK_SESSION_WAS_INVITED = () => 
{
	return mp.game.invoke("0x23DFB504655D0CE4");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_SESSION_GET_INVITER = (networkHandle) => 
{
	return mp.game.invoke("0xE57397B4A3429DD0", networkHandle);
}

g_Natives["0xD313DE83394AF134"] = () => 
{
	return mp.game.invoke("0xD313DE83394AF134");
}

g_Natives["0xBDB6F89C729CF388"] = () => 
{
	return mp.game.invoke("0xBDB6F89C729CF388");
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SUPPRESS_INVITE = (toggle) => 
{
	return mp.game.invoke("0xA0682D67EF1FBA3D", toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_BLOCK_INVITES = (toggle) => 
{
	return mp.game.invoke("0x34F9E9049454A7A0", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0xCFEB8AF24FC1D0BB"] = (p0) => 
{
	return mp.game.invoke("0xCFEB8AF24FC1D0BB", p0);
}

g_Natives._SERVER_HANDLER = () => 
{
	return mp.game.invoke("0xF814FEC6A19FD6E0");
}


// Arg:p0 is [BOOL]	
g_Natives._NETWORK_BLOCK_KICKED_PLAYERS = (p0) => 
{
	return mp.game.invoke("0x6B07B9CE4D390375", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x7AC752103856FB20"] = (p0) => 
{
	return mp.game.invoke("0x7AC752103856FB20", p0);
}

g_Natives._NETWORK_IS_CHAT_RESTRICTED = () => 
{
	return mp.game.invoke("0x74698374C45701D2");
}

g_Natives._NETWORK_SET_CHAT_RESTRICTION_THIS_FRAME = () => 
{
	return mp.game.invoke("0x140E6A44870A11CE");
}


// Arg:p0 is [int]	
g_Natives.NETWORK_SESSION_HOST_SINGLE_PLAYER = (p0) => 
{
	return mp.game.invoke("0xC74C33FCA52856D5", p0);
}

g_Natives.NETWORK_SESSION_LEAVE_SINGLE_PLAYER = () => 
{
	return mp.game.invoke("0x3442775428FD2DAA");
}

g_Natives.NETWORK_IS_GAME_IN_PROGRESS = () => 
{
	return mp.game.invoke("0x10FAB35428CCC9D7");
}

g_Natives.NETWORK_IS_SESSION_ACTIVE = () => 
{
	return mp.game.invoke("0xD83C2B94E7508980");
}

g_Natives.NETWORK_IS_IN_SESSION = () => 
{
	return mp.game.invoke("0xCA97246103B63917");
}

g_Natives.NETWORK_IS_SESSION_STARTED = () => 
{
	return mp.game.invoke("0x9DE624D2FC4B603F");
}

g_Natives.NETWORK_IS_SESSION_BUSY = () => 
{
	return mp.game.invoke("0xF4435D66A8E2905E");
}

g_Natives.NETWORK_CAN_SESSION_END = () => 
{
	return mp.game.invoke("0x4EEBC3694E49C572");
}


// Arg:p0 is [BOOL]	
g_Natives.NETWORK_SESSION_MARK_VISIBLE = (p0) => 
{
	return mp.game.invoke("0x271CC6AB59EBF9A5", p0);
}

g_Natives.NETWORK_SESSION_IS_VISIBLE = () => 
{
	return mp.game.invoke("0xBA416D68C631496A");
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SESSION_BLOCK_JOIN_REQUESTS = (toggle) => 
{
	return mp.game.invoke("0xA73667484D7037C3", toggle);
}


// Arg:p0 is [int]	Arg:p1 is [BOOL]	
g_Natives.NETWORK_SESSION_CHANGE_SLOTS = (p0, p1) => 
{
	return mp.game.invoke("0xB4AB419E0D86ACAE", p0, p1);
}

g_Natives["0x53AFD64C6758F2F9"] = () => 
{
	return mp.game.invoke("0x53AFD64C6758F2F9");
}

g_Natives.NETWORK_SESSION_VOICE_HOST = () => 
{
	return mp.game.invoke("0x9C1556705F864230");
}

g_Natives.NETWORK_SESSION_VOICE_LEAVE = () => 
{
	return mp.game.invoke("0x6793E42BE02B575D");
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_SESSION_VOICE_CONNECT_TO_PLAYER = (p0) => 
{
	return mp.game.invoke("0xABD5E88B8A2D3DB2", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	
g_Natives.NETWORK_SET_KEEP_FOCUSPOINT = (p0, p1) => 
{
	return mp.game.invoke("0x7F8413B7FC2AA6B9", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x5B8ED3DB018927B1"] = (p0) => 
{
	return mp.game.invoke("0x5B8ED3DB018927B1", p0);
}

g_Natives["0x855BC38818F6F684"] = () => 
{
	return mp.game.invoke("0x855BC38818F6F684");
}

g_Natives["0xB5D3453C98456528"] = () => 
{
	return mp.game.invoke("0xB5D3453C98456528");
}

g_Natives["0xEF0912DDF7C4CB4B"] = () => 
{
	return mp.game.invoke("0xEF0912DDF7C4CB4B");
}


// Arg:message is [char*]	Arg:networkHandle is [int*]	
g_Natives.NETWORK_SEND_TEXT_MESSAGE = (message, networkHandle) => 
{
	return mp.game.invoke("0x3A214F2EC889B100", message, networkHandle);
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_ACTIVITY_SPECTATOR = (toggle) => 
{
	return mp.game.invoke("0x75138790B4359A74", toggle);
}

g_Natives.NETWORK_IS_ACTIVITY_SPECTATOR = () => 
{
	return mp.game.invoke("0x12103B9E0C9F92FB");
}


// Arg:maxSpectators is [int]	
g_Natives.NETWORK_SET_ACTIVITY_SPECTATOR_MAX = (maxSpectators) => 
{
	return mp.game.invoke("0x9D277B76D1D12222", maxSpectators);
}


// Arg:p0 is [BOOL]	
g_Natives.NETWORK_GET_ACTIVITY_PLAYER_NUM = (p0) => 
{
	return mp.game.invoke("0x73E2B500410DA5A2", p0);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_ACTIVITY_SPECTATOR_FROM_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0x2763BBAA72A7BCB9", networkHandle);
}


// Arg:p0 is [Any]	Arg:playerCount is [int]	Arg:p2 is [Any]	Arg:jobHash is [Hash]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives.NETWORK_HOST_TRANSITION = (p0, playerCount, p2, jobHash, p4, p5) => 
{
	return mp.game.invoke("0xA60BB5CE242BB254", p0, playerCount, p2, jobHash, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.NETWORK_DO_TRANSITION_QUICKMATCH = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x71FB0EBCD4915D56", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.NETWORK_DO_TRANSITION_QUICKMATCH_ASYNC = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xA091A5E44F0072E5", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any*]	Arg:p5 is [Any]	
g_Natives.NETWORK_DO_TRANSITION_QUICKMATCH_WITH_GROUP = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x9C4AB58491FDC98A", p0, p1, p2, p3, p4, p5);
}

g_Natives.NETWORK_JOIN_GROUP_ACTIVITY = () => 
{
	return mp.game.invoke("0xA06509A691D12BE4");
}

g_Natives["0xB13E88E655E5A3BC"] = () => 
{
	return mp.game.invoke("0xB13E88E655E5A3BC");
}

g_Natives["0x6512765E3BE78C50"] = () => 
{
	return mp.game.invoke("0x6512765E3BE78C50");
}

g_Natives["0x0DBD5D7E3C5BEC3B"] = () => 
{
	return mp.game.invoke("0x0DBD5D7E3C5BEC3B");
}

g_Natives["0x5DC577201723960A"] = () => 
{
	return mp.game.invoke("0x5DC577201723960A");
}

g_Natives["0x5A6AA44FF8E931E6"] = () => 
{
	return mp.game.invoke("0x5A6AA44FF8E931E6");
}


// Arg:p0 is [BOOL]	
g_Natives["0x261E97AD7BCF3D40"] = (p0) => 
{
	return mp.game.invoke("0x261E97AD7BCF3D40", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x39917E1B4CB0F911"] = (p0) => 
{
	return mp.game.invoke("0x39917E1B4CB0F911", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_SET_TRANSITION_CREATOR_HANDLE = (p0) => 
{
	return mp.game.invoke("0xEF26739BCD9907D5", p0);
}

g_Natives.NETWORK_CLEAR_TRANSITION_CREATOR_HANDLE = () => 
{
	return mp.game.invoke("0xFB3272229A82C759");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives.NETWORK_INVITE_GAMERS_TO_TRANSITION = (p0, p1) => 
{
	return mp.game.invoke("0x4A595C32F77DFF76", p0, p1);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_SET_GAMER_INVITED_TO_TRANSITION = (networkHandle) => 
{
	return mp.game.invoke("0xCA2C8073411ECDB6", networkHandle);
}

g_Natives.NETWORK_LEAVE_TRANSITION = () => 
{
	return mp.game.invoke("0xD23A1A815D21DB19");
}

g_Natives.NETWORK_LAUNCH_TRANSITION = () => 
{
	return mp.game.invoke("0x2DCF46CB1A4F0884");
}


// Arg:p0 is [BOOL]	
g_Natives["0xA2E9C1AB8A92E8CD"] = (p0) => 
{
	return mp.game.invoke("0xA2E9C1AB8A92E8CD", p0);
}

g_Natives.NETWORK_BAIL_TRANSITION = () => 
{
	return mp.game.invoke("0xEAA572036990CD1B");
}


// Arg:p0 is [BOOL]	Arg:maxPlayers is [int]	
g_Natives.NETWORK_DO_TRANSITION_TO_GAME = (p0, maxPlayers) => 
{
	return mp.game.invoke("0x3E9BB38102A589B0", p0, maxPlayers);
}


// Arg:p0 is [BOOL]	Arg:maxPlayers is [int]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_DO_TRANSITION_TO_NEW_GAME = (p0, maxPlayers, p2) => 
{
	return mp.game.invoke("0x4665F51EFED00034", p0, maxPlayers, p2);
}


// Arg:netHandle is [Any*]	Arg:netHandleIndex is [Any]	Arg:p2 is [BOOL]	Arg:players is [int]	Arg:p4 is [BOOL]	
g_Natives.NETWORK_DO_TRANSITION_TO_FREEMODE = (netHandle, netHandleIndex, p2, players, p4) => 
{
	return mp.game.invoke("0x3AAD8B2FCA1E289F", netHandle, netHandleIndex, p2, players, p4);
}


// Arg:networkHandle is [int*]	Arg:p1 is [Any*]	Arg:players is [int]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives.NETWORK_DO_TRANSITION_TO_NEW_FREEMODE = (networkHandle, p1, players, p3, p4, p5) => 
{
	return mp.game.invoke("0x9E80A5BA8109F974", networkHandle, p1, players, p3, p4, p5);
}

g_Natives.NETWORK_IS_TRANSITION_TO_GAME = () => 
{
	return mp.game.invoke("0x9D7696D8F4FA6CB7");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives.NETWORK_GET_TRANSITION_MEMBERS = (p0, p1) => 
{
	return mp.game.invoke("0x73B000F7FBC55829", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.NETWORK_APPLY_TRANSITION_PARAMETER = (p0, p1) => 
{
	return mp.game.invoke("0x521638ADA1BA0D18", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [char*]	Arg:p2 is [BOOL]	
g_Natives["0xEBEFC2E77084F599"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xEBEFC2E77084F599", p0, p1, p2);
}


// Arg:networkHandle is [int*]	Arg:p1 is [char*]	Arg:p2 is [int]	Arg:p3 is [int]	Arg:p4 is [BOOL]	
g_Natives.NETWORK_SEND_TRANSITION_GAMER_INSTRUCTION = (networkHandle, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x31D1D2B858D25E6B", networkHandle, p1, p2, p3, p4);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_MARK_TRANSITION_GAMER_AS_FULLY_JOINED = (p0) => 
{
	return mp.game.invoke("0x5728BB6D63E3FF1D", p0);
}

g_Natives.NETWORK_IS_TRANSITION_HOST = () => 
{
	return mp.game.invoke("0x0B824797C9BF2159");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_TRANSITION_HOST_FROM_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0x6B5C83BA3EFE6A10", networkHandle);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_GET_TRANSITION_HOST = (networkHandle) => 
{
	return mp.game.invoke("0x65042B9774C4435E", networkHandle);
}

g_Natives.NETWORK_IS_IN_TRANSITION = () => 
{
	return mp.game.invoke("0x68049AEFF83D8F0A");
}

g_Natives.NETWORK_IS_TRANSITION_STARTED = () => 
{
	return mp.game.invoke("0x53FA83401D9C07FE");
}

g_Natives.NETWORK_IS_TRANSITION_BUSY = () => 
{
	return mp.game.invoke("0x520F3282A53D26B7");
}

g_Natives.NETWORK_IS_TRANSITION_MATCHMAKING = () => 
{
	return mp.game.invoke("0x292564C735375EDF");
}

g_Natives["0xC571D0E77D8BBC29"] = () => 
{
	return mp.game.invoke("0xC571D0E77D8BBC29");
}

g_Natives.NETWORK_OPEN_TRANSITION_MATCHMAKING = () => 
{
	return mp.game.invoke("0x2B3A8F7CA3A38FDE");
}

g_Natives.NETWORK_CLOSE_TRANSITION_MATCHMAKING = () => 
{
	return mp.game.invoke("0x43F4DBA69710E01E");
}

g_Natives["0x37A4494483B9F5C9"] = () => 
{
	return mp.game.invoke("0x37A4494483B9F5C9");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives["0x0C978FDA19692C2C"] = (p0, p1) => 
{
	return mp.game.invoke("0x0C978FDA19692C2C", p0, p1);
}

g_Natives["0xD0A484CB2F829FBE"] = () => 
{
	return mp.game.invoke("0xD0A484CB2F829FBE");
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_SET_TRANSITION_ACTIVITY_ID = (p0) => 
{
	return mp.game.invoke("0x30DE938B516F0AD2", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.NETWORK_CHANGE_TRANSITION_SLOTS = (p0, p1) => 
{
	return mp.game.invoke("0xEEEDA5E6D7080987", p0, p1);
}


// Arg:p0 is [BOOL]	
g_Natives["0x973D76AA760A6CB6"] = (p0) => 
{
	return mp.game.invoke("0x973D76AA760A6CB6", p0);
}


// Arg:player is [Player]	
g_Natives.NETWORK_HAS_PLAYER_STARTED_TRANSITION = (player) => 
{
	return mp.game.invoke("0x9AC9CCBFA8C29795", player);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_ARE_TRANSITION_DETAILS_VALID = (p0) => 
{
	return mp.game.invoke("0x2615AA2A695930C1", p0);
}


// Arg:player is [Player]	
g_Natives.NETWORK_JOIN_TRANSITION = (player) => 
{
	return mp.game.invoke("0x9D060B08CD63321A", player);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_HAS_INVITED_GAMER_TO_TRANSITION = (p0) => 
{
	return mp.game.invoke("0x7284A47B3540E6CF", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x3F9990BF5F22759C"] = (p0) => 
{
	return mp.game.invoke("0x3F9990BF5F22759C", p0);
}

g_Natives.NETWORK_IS_ACTIVITY_SESSION = () => 
{
	return mp.game.invoke("0x05095437424397FA");
}


// Arg:p0 is [BOOL]	
g_Natives._NETWORK_BLOCK_INVITES_2 = (p0) => 
{
	return mp.game.invoke("0x4A9FDE3A5A6D0437", p0);
}


// Arg:networkHandle is [int*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives._NETWORK_SEND_PRESENCE_INVITE = (networkHandle, p1, p2, p3) => 
{
	return mp.game.invoke("0xC3C7A6AFDB244624", networkHandle, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives._NETWORK_SEND_PRESENCE_TRANSITION_INVITE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC116FF9B4D488291", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives["0x1171A97A3D3981B6"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x1171A97A3D3981B6", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0x742B58F723233ED9"] = (p0) => 
{
	return mp.game.invoke("0x742B58F723233ED9", p0);
}

g_Natives.NETWORK_GET_NUM_PRESENCE_INVITES = () => 
{
	return mp.game.invoke("0xCEFA968912D0F78D");
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_ACCEPT_PRESENCE_INVITE = (p0) => 
{
	return mp.game.invoke("0xFA91550DF9318B22", p0);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_REMOVE_PRESENCE_INVITE = (p0) => 
{
	return mp.game.invoke("0xF0210268DB0974B1", p0);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_GET_PRESENCE_INVITE_ID = (p0) => 
{
	return mp.game.invoke("0xDFF09646E12EC386", p0);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_GET_PRESENCE_INVITE_INVITER = (p0) => 
{
	return mp.game.invoke("0x4962CC4AA2F345B7", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.NETWORK_GET_PRESENCE_INVITE_HANDLE = (p0, p1) => 
{
	return mp.game.invoke("0x38D5B0FEBB086F75", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_GET_PRESENCE_INVITE_SESSION_ID = (p0) => 
{
	return mp.game.invoke("0x26E1CD96B0903D60", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x24409FC4C55CB22D"] = (p0) => 
{
	return mp.game.invoke("0x24409FC4C55CB22D", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xD39B3FFF8FFDD5BF"] = (p0) => 
{
	return mp.game.invoke("0xD39B3FFF8FFDD5BF", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x728C4CC7920CD102"] = (p0) => 
{
	return mp.game.invoke("0x728C4CC7920CD102", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x3DBF2DF0AEB7D289"] = (p0) => 
{
	return mp.game.invoke("0x3DBF2DF0AEB7D289", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x8806CEBFABD3CE05"] = (p0) => 
{
	return mp.game.invoke("0x8806CEBFABD3CE05", p0);
}

g_Natives.NETWORK_HAS_FOLLOW_INVITE = () => 
{
	return mp.game.invoke("0x76D9B976C4C09FDE");
}

g_Natives.NETWORK_ACTION_FOLLOW_INVITE = () => 
{
	return mp.game.invoke("0xC88156EBB786F8D5");
}

g_Natives.NETWORK_CLEAR_FOLLOW_INVITE = () => 
{
	return mp.game.invoke("0x439BFDE3CD0610F6");
}

g_Natives["0xEBF8284D8CADEB53"] = () => 
{
	return mp.game.invoke("0xEBF8284D8CADEB53");
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_REMOVE_TRANSITION_INVITE = (p0) => 
{
	return mp.game.invoke("0x7524B431B2E6F7EE", p0);
}

g_Natives.NETWORK_REMOVE_ALL_TRANSITION_INVITE = () => 
{
	return mp.game.invoke("0x726E0375C7A26368");
}

g_Natives["0xF083835B70BA9BFE"] = () => 
{
	return mp.game.invoke("0xF083835B70BA9BFE");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives.NETWORK_INVITE_GAMERS = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x9D80CD1D0E6327DE", p0, p1, p2, p3);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_HAS_INVITED_GAMER = (p0) => 
{
	return mp.game.invoke("0x4D86CD31E8976ECE", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_GET_CURRENTLY_SELECTED_GAMER_HANDLE_FROM_INVITE_MENU = (p0) => 
{
	return mp.game.invoke("0x74881E6BCAE2327C", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_SET_CURRENTLY_SELECTED_GAMER_HANDLE_FROM_INVITE_MENU = (p0) => 
{
	return mp.game.invoke("0x7206F674F2A3B1BB", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x66F010A4B031A331"] = (p0) => 
{
	return mp.game.invoke("0x66F010A4B031A331", p0);
}


// Arg:p0 is [Player]	Arg:p1 is [BOOL*]	
g_Natives["0x44B37CDCAE765AAE"] = (p0, p1) => 
{
	return mp.game.invoke("0x44B37CDCAE765AAE", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x0D77A82DC2D0DA59"] = (p0, p1) => 
{
	return mp.game.invoke("0x0D77A82DC2D0DA59", p0, p1);
}


// Arg:networkHandle is [int*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.FILLOUT_PM_PLAYER_LIST = (networkHandle, p1, p2) => 
{
	return mp.game.invoke("0xCBBD7C4991B64809", networkHandle, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.FILLOUT_PM_PLAYER_LIST_WITH_NAMES = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x716B6DB9D1886106", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives.USING_NETWORK_WEAPONTYPE = (p0) => 
{
	return mp.game.invoke("0xE26CCFF8094D8C74", p0);
}


// Arg:p0 is [Any*]	
g_Natives._NETWORK_CHECK_DATA_MANAGER_FOR_HANDLE = (p0) => 
{
	return mp.game.invoke("0x796A87B3B68D1F3D", p0);
}

g_Natives["0x2FC5650B0271CB57"] = () => 
{
	return mp.game.invoke("0x2FC5650B0271CB57");
}

g_Natives["0x01ABCE5E7CBDA196"] = () => 
{
	return mp.game.invoke("0x01ABCE5E7CBDA196");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives["0x120364DE2845DAF8"] = (p0, p1) => 
{
	return mp.game.invoke("0x120364DE2845DAF8", p0, p1);
}

g_Natives["0xFD8B834A8BA05048"] = () => 
{
	return mp.game.invoke("0xFD8B834A8BA05048");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_CHATTING_IN_PLATFORM_PARTY = (networkHandle) => 
{
	return mp.game.invoke("0x8DE9945BCC9AEC52", networkHandle);
}

g_Natives.NETWORK_IS_IN_PARTY = () => 
{
	return mp.game.invoke("0x966C2BC2A7FE3F30");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_PARTY_MEMBER = (networkHandle) => 
{
	return mp.game.invoke("0x676ED266AADD31E0", networkHandle);
}

g_Natives["0x2BF66D2E7414F686"] = () => 
{
	return mp.game.invoke("0x2BF66D2E7414F686");
}

g_Natives["0x14922ED3E38761F0"] = () => 
{
	return mp.game.invoke("0x14922ED3E38761F0");
}

g_Natives["0xFA2888E3833C8E96"] = () => 
{
	return mp.game.invoke("0xFA2888E3833C8E96");
}

g_Natives._MARK_SESSION_AS_JOINED = () => 
{
	return mp.game.invoke("0x25D990F8E0E3F13C");
}


// Arg:p0 is [Any]	
g_Natives["0x77FADDCBE3499DF7"] = (p0) => 
{
	return mp.game.invoke("0x77FADDCBE3499DF7", p0);
}


// Arg:seed is [int]	
g_Natives._NETWORK_SET_RANDOM_INT_SEED = (seed) => 
{
	return mp.game.invoke("0xF1B84178F8674195", seed);
}

g_Natives.NETWORK_GET_RANDOM_INT = () => 
{
	return mp.game.invoke("0x599E4FA1F87EB5FF");
}


// Arg:rangeStart is [int]	Arg:rangeEnd is [int]	
g_Natives._NETWORK_GET_RANDOM_INT_IN_RANGE = (rangeStart, rangeEnd) => 
{
	return mp.game.invoke("0xE30CF56F1EFA5F43", rangeStart, rangeEnd);
}

g_Natives.NETWORK_PLAYER_IS_CHEATER = () => 
{
	return mp.game.invoke("0x655B91F1495A9090");
}

g_Natives.NETWORK_PLAYER_GET_CHEATER_REASON = () => 
{
	return mp.game.invoke("0x172F75B6EE2233BA");
}

g_Natives.NETWORK_PLAYER_IS_BADSPORT = () => 
{
	return mp.game.invoke("0x19D8DA0E5A68045A");
}


// Arg:player is [Player]	Arg:p1 is [int]	Arg:scriptHash is [Hash]	
g_Natives.GET_PLAYER_STAT_STARS_VISIBILITY = (player, p1, scriptHash) => 
{
	return mp.game.invoke("0x46FB3ED415C7641C", player, p1, scriptHash);
}


// Arg:networkHandle is [int*]	Arg:p1 is [int]	Arg:p2 is [int]	
g_Natives.BAD_SPORT_PLAYER_LEFT_DETECTED = (networkHandle, p1, p2) => 
{
	return mp.game.invoke("0xEC5E3AF5289DCA81", networkHandle, p1, p2);
}


// Arg:p0 is [Entity]	Arg:p1 is [Any]	
g_Natives["0xE66C690248F11150"] = (p0, p1) => 
{
	return mp.game.invoke("0xE66C690248F11150", p0, p1);
}


// Arg:lobbySize is [int]	Arg:p1 is [BOOL]	Arg:instanceId is [int]	
g_Natives.NETWORK_SET_THIS_SCRIPT_IS_NETWORK_SCRIPT = (lobbySize, p1, instanceId) => 
{
	return mp.game.invoke("0x1CA59E306ECB80A5", lobbySize, p1, instanceId);
}


// Arg:numPlayers is [int]	Arg:p1 is [BOOL]	Arg:instanceId is [int]	
g_Natives._NETWORK_SET_THIS_SCRIPT_IS_NETWORK_SCRIPT_2 = (numPlayers, p1, instanceId) => 
{
	return mp.game.invoke("0xD1110739EEADB592", numPlayers, p1, instanceId);
}

g_Natives.NETWORK_GET_THIS_SCRIPT_IS_NETWORK_SCRIPT = () => 
{
	return mp.game.invoke("0x2910669969E9535E");
}

g_Natives._NETWORK_GET_NUM_PARTICIPANTS_HOST = () => 
{
	return mp.game.invoke("0xA6C90FBC38E395EE");
}

g_Natives.NETWORK_GET_NUM_PARTICIPANTS = () => 
{
	return mp.game.invoke("0x18D0456E86604654");
}

g_Natives.NETWORK_GET_SCRIPT_STATUS = () => 
{
	return mp.game.invoke("0x57D158647A6BFABF");
}


// Arg:vars is [int*]	Arg:sizeofVars is [int]	
g_Natives.NETWORK_REGISTER_HOST_BROADCAST_VARIABLES = (vars, sizeofVars) => 
{
	return mp.game.invoke("0x3E9B2F01C50DF595", vars, sizeofVars);
}


// Arg:vars is [char*]	Arg:numVars is [ScrHandle]	
g_Natives.NETWORK_REGISTER_PLAYER_BROADCAST_VARIABLES = (vars, numVars) => 
{
	return mp.game.invoke("0x3364AA97340CA215", vars, numVars);
}

g_Natives["0x64F62AFB081E260D"] = () => 
{
	return mp.game.invoke("0x64F62AFB081E260D");
}

g_Natives["0x5D10B3795F3FC886"] = () => 
{
	return mp.game.invoke("0x5D10B3795F3FC886");
}


// Arg:player is [Player]	
g_Natives.NETWORK_GET_PLAYER_INDEX = (player) => 
{
	return mp.game.invoke("0x24FB80D107371267", player);
}


// Arg:index is [int]	
g_Natives.NETWORK_GET_PARTICIPANT_INDEX = (index) => 
{
	return mp.game.invoke("0x1B84DF6AF2A46938", index);
}


// Arg:ped is [Ped]	
g_Natives.NETWORK_GET_PLAYER_INDEX_FROM_PED = (ped) => 
{
	return mp.game.invoke("0x6C0E2E0125610278", ped);
}

g_Natives.NETWORK_GET_NUM_CONNECTED_PLAYERS = () => 
{
	return mp.game.invoke("0xA4A79DD2D9600654");
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_CONNECTED = (player) => 
{
	return mp.game.invoke("0x93DC1BE4E1ABE9D1", player);
}

g_Natives["0xCF61D4B4702EE9EB"] = () => 
{
	return mp.game.invoke("0xCF61D4B4702EE9EB");
}


// Arg:p0 is [int]	
g_Natives.NETWORK_IS_PARTICIPANT_ACTIVE = (p0) => 
{
	return mp.game.invoke("0x6FF8FF40B6357D45", p0);
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_ACTIVE = (player) => 
{
	return mp.game.invoke("0xB8DFD30D6973E135", player);
}


// Arg:playerId is [Player]	
g_Natives.NETWORK_IS_PLAYER_A_PARTICIPANT = (playerId) => 
{
	return mp.game.invoke("0x3CA58F6CB7CBD784", playerId);
}

g_Natives.NETWORK_IS_HOST_OF_THIS_SCRIPT = () => 
{
	return mp.game.invoke("0x83CD99A1E6061AB5");
}

g_Natives.NETWORK_GET_HOST_OF_THIS_SCRIPT = () => 
{
	return mp.game.invoke("0xC7B4D79B01FA7A5C");
}


// Arg:scriptName is [char*]	Arg:instanceId is [int]	Arg:positionHash is [int]	
g_Natives.NETWORK_GET_HOST_OF_SCRIPT = (scriptName, instanceId, positionHash) => 
{
	return mp.game.invoke("0x1D6A14F1F9A736FC", scriptName, instanceId, positionHash);
}

g_Natives.NETWORK_SET_MISSION_FINISHED = () => 
{
	return mp.game.invoke("0x3B3D11CD9FFCDFC9");
}


// Arg:scriptName is [char*]	Arg:instanceId is [int]	Arg:unk is [BOOL]	Arg:positionHash is [int]	
g_Natives.NETWORK_IS_SCRIPT_ACTIVE = (scriptName, instanceId, unk, positionHash) => 
{
	return mp.game.invoke("0x9D40DF90FAD26098", scriptName, instanceId, unk, positionHash);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives.NETWORK_GET_NUM_SCRIPT_PARTICIPANTS = (p0, p1, p2) => 
{
	return mp.game.invoke("0x3658E8CD94FC121A", p0, p1, p2);
}

g_Natives._NETWORK_GET_PLAYER_PED_FROM_INDEX = () => 
{
	return mp.game.invoke("0x638A3A81733086DB");
}


// Arg:p0 is [Player]	Arg:p1 is [Any*]	Arg:p2 is [Any]	
g_Natives.NETWORK_IS_PLAYER_A_PARTICIPANT_ON_SCRIPT = (p0, p1, p2) => 
{
	return mp.game.invoke("0x1AD5B71586B94820", p0, p1, p2);
}

g_Natives["0x2302C0264EA58D31"] = () => 
{
	return mp.game.invoke("0x2302C0264EA58D31");
}

g_Natives["0x741A3D8380319A81"] = () => 
{
	return mp.game.invoke("0x741A3D8380319A81");
}

g_Natives.PARTICIPANT_ID = () => 
{
	return mp.game.invoke("0x90986E8876CE0A83");
}

g_Natives.PARTICIPANT_ID_TO_INT = () => 
{
	return mp.game.invoke("0x57A3BDDAD8E5AA0A");
}


// Arg:netId is [int]	Arg:weaponHash is [Hash*]	
g_Natives.NETWORK_GET_DESTROYER_OF_NETWORK_ID = (netId, weaponHash) => 
{
	return mp.game.invoke("0x7A1ADEEF01740A24", netId, weaponHash);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:weaponHash is [Hash*]	
g_Natives._NETWORK_GET_DESTROYER_OF_ENTITY = (p0, p1, weaponHash) => 
{
	return mp.game.invoke("0x4CACA84440FA26F6", p0, p1, weaponHash);
}


// Arg:player is [Player]	Arg:weaponHash is [Hash*]	
g_Natives.NETWORK_GET_ENTITY_KILLER_OF_PLAYER = (player, weaponHash) => 
{
	return mp.game.invoke("0x42B2DAA6B596F5F8", player, weaponHash);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:heading is [float]	Arg:unk is [BOOL]	Arg:changetime is [BOOL]	
g_Natives.NETWORK_RESURRECT_LOCAL_PLAYER = (x, y, z, heading, unk, changetime) => 
{
	return mp.game.invoke("0xEA23C49EAA83ACFB", x, y, z, heading, unk, changetime);
}


// Arg:time is [int]	
g_Natives.NETWORK_SET_LOCAL_PLAYER_INVINCIBLE_TIME = (time) => 
{
	return mp.game.invoke("0x2D95C7E2D7E07307", time);
}

g_Natives.NETWORK_IS_LOCAL_PLAYER_INVINCIBLE = () => 
{
	return mp.game.invoke("0x8A8694B48715B000");
}


// Arg:player is [int]	Arg:p1 is [BOOL]	
g_Natives.NETWORK_DISABLE_INVINCIBLE_FLASHING = (player, p1) => 
{
	return mp.game.invoke("0x9DD368BF06983221", player, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x524FF0AEFF9C3973"] = (p0) => 
{
	return mp.game.invoke("0x524FF0AEFF9C3973", p0);
}


// Arg:p0 is [Entity]	
g_Natives["0xB07D3185E11657A5"] = (p0) => 
{
	return mp.game.invoke("0xB07D3185E11657A5", p0);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_GET_NETWORK_ID_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0xA11700682F3AD45C", entity);
}


// Arg:netId is [int]	
g_Natives.NETWORK_GET_ENTITY_FROM_NETWORK_ID = (netId) => 
{
	return mp.game.invoke("0xCE4E5D9B0A4FF560", netId);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_GET_ENTITY_IS_NETWORKED = (entity) => 
{
	return mp.game.invoke("0xC7827959479DCC78", entity);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_GET_ENTITY_IS_LOCAL = (entity) => 
{
	return mp.game.invoke("0x0991549DE4D64762", entity);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_REGISTER_ENTITY_AS_NETWORKED = (entity) => 
{
	return mp.game.invoke("0x06FAACD625D80CAA", entity);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_UNREGISTER_NETWORKED_ENTITY = (entity) => 
{
	return mp.game.invoke("0x7368E683BB9038D6", entity);
}


// Arg:netID is [int]	
g_Natives.NETWORK_DOES_NETWORK_ID_EXIST = (netID) => 
{
	return mp.game.invoke("0x38CE16C96BD11344", netID);
}


// Arg:netId is [int]	
g_Natives.NETWORK_DOES_ENTITY_EXIST_WITH_NETWORK_ID = (netId) => 
{
	return mp.game.invoke("0x18A47D074708FD68", netId);
}


// Arg:netId is [int]	
g_Natives.NETWORK_REQUEST_CONTROL_OF_NETWORK_ID = (netId) => 
{
	return mp.game.invoke("0xA670B3662FAFFBD0", netId);
}


// Arg:netId is [int]	
g_Natives.NETWORK_HAS_CONTROL_OF_NETWORK_ID = (netId) => 
{
	return mp.game.invoke("0x4D36070FE0215186", netId);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_REQUEST_CONTROL_OF_ENTITY = (entity) => 
{
	return mp.game.invoke("0xB69317BF5E782347", entity);
}


// Arg:doorID is [int]	
g_Natives.NETWORK_REQUEST_CONTROL_OF_DOOR = (doorID) => 
{
	return mp.game.invoke("0x870DDFD5A4A796E4", doorID);
}


// Arg:entity is [Entity]	
g_Natives.NETWORK_HAS_CONTROL_OF_ENTITY = (entity) => 
{
	return mp.game.invoke("0x01BF60A500E28887", entity);
}


// Arg:pickup is [Pickup]	
g_Natives.NETWORK_HAS_CONTROL_OF_PICKUP = (pickup) => 
{
	return mp.game.invoke("0x5BC9495F0B3B6FA6", pickup);
}


// Arg:doorHash is [Hash]	
g_Natives.NETWORK_HAS_CONTROL_OF_DOOR = (doorHash) => 
{
	return mp.game.invoke("0xCB3C68ADB06195DF", doorHash);
}


// Arg:doorHash is [Hash]	
g_Natives._NETWORK_IS_DOOR_NETWORKED = (doorHash) => 
{
	return mp.game.invoke("0xC01E93FAC20C3346", doorHash);
}


// Arg:vehicle is [Vehicle]	
g_Natives.VEH_TO_NET = (vehicle) => 
{
	return mp.game.invoke("0xB4C94523F023419C", vehicle);
}


// Arg:ped is [Ped]	
g_Natives.PED_TO_NET = (ped) => 
{
	return mp.game.invoke("0x0EDEC3C276198689", ped);
}


// Arg:object is [Object]	
g_Natives.OBJ_TO_NET = (object) => 
{
	return mp.game.invoke("0x99BFDC94A603E541", object);
}


// Arg:netHandle is [int]	
g_Natives.NET_TO_VEH = (netHandle) => 
{
	return mp.game.invoke("0x367B936610BA360C", netHandle);
}


// Arg:netHandle is [int]	
g_Natives.NET_TO_PED = (netHandle) => 
{
	return mp.game.invoke("0xBDCD95FC216A8B3E", netHandle);
}


// Arg:netHandle is [int]	
g_Natives.NET_TO_OBJ = (netHandle) => 
{
	return mp.game.invoke("0xD8515F5FEA14CB3F", netHandle);
}


// Arg:netHandle is [int]	
g_Natives.NET_TO_ENT = (netHandle) => 
{
	return mp.game.invoke("0xBFFEAB45A9A9094A", netHandle);
}


// Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_GET_LOCAL_HANDLE = (networkHandle, bufferSize) => 
{
	return mp.game.invoke("0xE86051786B66CD8E", networkHandle, bufferSize);
}


// Arg:userId is [char*]	Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_HANDLE_FROM_USER_ID = (userId, networkHandle, bufferSize) => 
{
	return mp.game.invoke("0xDCD51DD8F87AEC5C", userId, networkHandle, bufferSize);
}


// Arg:memberId is [char*]	Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_HANDLE_FROM_MEMBER_ID = (memberId, networkHandle, bufferSize) => 
{
	return mp.game.invoke("0xA0FD21BED61E5C4C", memberId, networkHandle, bufferSize);
}


// Arg:player is [Player]	Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_HANDLE_FROM_PLAYER = (player, networkHandle, bufferSize) => 
{
	return mp.game.invoke("0x388EB2B86C73B6B3", player, networkHandle, bufferSize);
}


// Arg:player is [Player]	
g_Natives._NETWORK_HASH_FROM_PLAYER_HANDLE = (player) => 
{
	return mp.game.invoke("0xBC1D768F2F5D6C05", player);
}


// Arg:networkHandle is [int*]	
g_Natives._NETWORK_HASH_FROM_GAMER_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0x58575AC3CF2CA8EC", networkHandle);
}


// Arg:friendIndex is [Player]	Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_HANDLE_FROM_FRIEND = (friendIndex, networkHandle, bufferSize) => 
{
	return mp.game.invoke("0xD45CB817D7E177D2", friendIndex, networkHandle, bufferSize);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_GAMERTAG_FROM_HANDLE_START = (networkHandle) => 
{
	return mp.game.invoke("0x9F0C0A981D73FA56", networkHandle);
}

g_Natives.NETWORK_GAMERTAG_FROM_HANDLE_PENDING = () => 
{
	return mp.game.invoke("0xB071E27958EF4CF0");
}

g_Natives.NETWORK_GAMERTAG_FROM_HANDLE_SUCCEEDED = () => 
{
	return mp.game.invoke("0xFD00798DBA7523DD");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_GET_GAMERTAG_FROM_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0x426141162EBE5CDB", networkHandle);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives["0xD66C9E72B3CC4982"] = (p0, p1) => 
{
	return mp.game.invoke("0xD66C9E72B3CC4982", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x58CC181719256197"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x58CC181719256197", p0, p1, p2);
}


// Arg:netHandle1 is [int*]	Arg:netHandle2 is [int*]	
g_Natives.NETWORK_ARE_HANDLES_THE_SAME = (netHandle1, netHandle2) => 
{
	return mp.game.invoke("0x57DBA049E110F217", netHandle1, netHandle2);
}


// Arg:networkHandle is [int*]	Arg:bufferSize is [int]	
g_Natives.NETWORK_IS_HANDLE_VALID = (networkHandle, bufferSize) => 
{
	return mp.game.invoke("0x6F79B93B0A8E4133", networkHandle, bufferSize);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_GET_PLAYER_FROM_GAMER_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0xCE5F689CF5A0A49D", networkHandle);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_MEMBER_ID_FROM_GAMER_HANDLE = (networkHandle) => 
{
	return mp.game.invoke("0xC82630132081BB6F", networkHandle);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_GAMER_IN_MY_SESSION = (networkHandle) => 
{
	return mp.game.invoke("0x0F10B05DDF8D16E9", networkHandle);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_SHOW_PROFILE_UI = (networkHandle) => 
{
	return mp.game.invoke("0x859ED1CEA343FCA8", networkHandle);
}


// Arg:player is [Player]	
g_Natives.NETWORK_PLAYER_GET_NAME = (player) => 
{
	return mp.game.invoke("0x7718D2E2060837D2", player);
}


// Arg:player is [Player]	Arg:userID is [char*]	
g_Natives.NETWORK_PLAYER_GET_USERID = (player, userID) => 
{
	return mp.game.invoke("0x4927FC39CD0869A0", player, userID);
}


// Arg:player is [Player]	
g_Natives.NETWORK_PLAYER_IS_ROCKSTAR_DEV = (player) => 
{
	return mp.game.invoke("0x544ABDDA3B409B6D", player);
}


// Arg:player is [Player]	
g_Natives._NETWORK_PLAYER_IS_CHEATER = (player) => 
{
	return mp.game.invoke("0x565E430DB3B05BEC", player);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_IS_INACTIVE_PROFILE = (p0) => 
{
	return mp.game.invoke("0x7E58745504313A2E", p0);
}

g_Natives.NETWORK_GET_MAX_FRIENDS = () => 
{
	return mp.game.invoke("0xAFEBB0D5D8F687D2");
}

g_Natives.NETWORK_GET_FRIEND_COUNT = () => 
{
	return mp.game.invoke("0x203F1CFD823B27A4");
}


// Arg:friendIndex is [int]	
g_Natives.NETWORK_GET_FRIEND_NAME = (friendIndex) => 
{
	return mp.game.invoke("0xE11EBBB2A783FE8B", friendIndex);
}


// Arg:friendIndex is [int]	
g_Natives._NETWORK_GET_FRIEND_NAME_FROM_INDEX = (friendIndex) => 
{
	return mp.game.invoke("0x4164F227D052E293", friendIndex);
}


// Arg:name is [char*]	
g_Natives.NETWORK_IS_FRIEND_ONLINE = (name) => 
{
	return mp.game.invoke("0x425A44533437B64D", name);
}


// Arg:networkHandle is [int*]	
g_Natives._NETWORK_IS_FRIEND_HANDLE_ONLINE = (networkHandle) => 
{
	return mp.game.invoke("0x87EB7A3FFCB314DB", networkHandle);
}


// Arg:friendName is [char*]	
g_Natives.NETWORK_IS_FRIEND_IN_SAME_TITLE = (friendName) => 
{
	return mp.game.invoke("0x2EA9A3BEDF3F17B8", friendName);
}


// Arg:friendName is [char*]	
g_Natives.NETWORK_IS_FRIEND_IN_MULTIPLAYER = (friendName) => 
{
	return mp.game.invoke("0x57005C18827F3A28", friendName);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_IS_FRIEND = (networkHandle) => 
{
	return mp.game.invoke("0x1A24A179F9B31654", networkHandle);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_IS_PENDING_FRIEND = (p0) => 
{
	return mp.game.invoke("0x0BE73DA6984A6E33", p0);
}

g_Natives.NETWORK_IS_ADDING_FRIEND = () => 
{
	return mp.game.invoke("0x6EA101606F6E4D81");
}


// Arg:networkHandle is [int*]	Arg:message is [char*]	
g_Natives.NETWORK_ADD_FRIEND = (networkHandle, message) => 
{
	return mp.game.invoke("0x8E02D73914064223", networkHandle, message);
}


// Arg:friendIndex is [int]	
g_Natives.NETWORK_IS_FRIEND_INDEX_ONLINE = (friendIndex) => 
{
	return mp.game.invoke("0xBAD8F2A42B844821", friendIndex);
}


// Arg:p0 is [BOOL]	
g_Natives._NETWORK_SET_PASSIVE_MODE = (p0) => 
{
	return mp.game.invoke("0x1B857666604B1A74", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x82377B65E943F72D"] = (p0) => 
{
	return mp.game.invoke("0x82377B65E943F72D", p0);
}

g_Natives.NETWORK_CAN_SET_WAYPOINT = () => 
{
	return mp.game.invoke("0xC927EC229934AF60");
}


// Arg:p0 is [Any]	
g_Natives["0xB309EBEA797E001F"] = (p0) => 
{
	return mp.game.invoke("0xB309EBEA797E001F", p0);
}

g_Natives["0x26F07DD83A5F7F98"] = () => 
{
	return mp.game.invoke("0x26F07DD83A5F7F98");
}

g_Natives.NETWORK_HAS_HEADSET = () => 
{
	return mp.game.invoke("0xE870F9F1F7B4F1FA");
}


// Arg:p0 is [BOOL]	
g_Natives["0x7D395EA61622E116"] = (p0) => 
{
	return mp.game.invoke("0x7D395EA61622E116", p0);
}

g_Natives["0xC0D2AF00BCC234CA"] = () => 
{
	return mp.game.invoke("0xC0D2AF00BCC234CA");
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_GAMER_HAS_HEADSET = (p0) => 
{
	return mp.game.invoke("0xF2FD55CB574BCC55", p0);
}


// Arg:p0 is [int*]	
g_Natives.NETWORK_IS_GAMER_TALKING = (p0) => 
{
	return mp.game.invoke("0x71C33B22606CD88A", p0);
}


// Arg:player is [int*]	
g_Natives.NETWORK_CAN_COMMUNICATE_WITH_GAMER = (player) => 
{
	return mp.game.invoke("0xA150A4F065806B1F", player);
}


// Arg:p0 is [int*]	
g_Natives.NETWORK_IS_GAMER_MUTED_BY_ME = (p0) => 
{
	return mp.game.invoke("0xCE60DE011B6C7978", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_AM_I_MUTED_BY_GAMER = (p0) => 
{
	return mp.game.invoke("0xDF02A2C93F1F26DA", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_IS_GAMER_BLOCKED_BY_ME = (p0) => 
{
	return mp.game.invoke("0xE944C4F5AF1B5883", p0);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_AM_I_BLOCKED_BY_GAMER = (p0) => 
{
	return mp.game.invoke("0x15337C7C268A27B2", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xB57A49545BA53CE7"] = (p0) => 
{
	return mp.game.invoke("0xB57A49545BA53CE7", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xCCA4318E1AB03F1F"] = (p0) => 
{
	return mp.game.invoke("0xCCA4318E1AB03F1F", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x07DD29D5E22763F1"] = (p0) => 
{
	return mp.game.invoke("0x07DD29D5E22763F1", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0x135F9B7B7ADD2185"] = (p0) => 
{
	return mp.game.invoke("0x135F9B7B7ADD2185", p0);
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_TALKING = (player) => 
{
	return mp.game.invoke("0x031E11F3D447647E", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_PLAYER_HAS_HEADSET = (player) => 
{
	return mp.game.invoke("0x3FB99A8B08D18FD6", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_MUTED_BY_ME = (player) => 
{
	return mp.game.invoke("0x8C71288AE68EDE39", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_AM_I_MUTED_BY_PLAYER = (player) => 
{
	return mp.game.invoke("0x9D6981DFC91A8604", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_BLOCKED_BY_ME = (player) => 
{
	return mp.game.invoke("0x57AF1F8E27483721", player);
}


// Arg:player is [Player]	
g_Natives.NETWORK_AM_I_BLOCKED_BY_PLAYER = (player) => 
{
	return mp.game.invoke("0x87F395D957D4353D", player);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_GET_PLAYER_LOUDNESS = (p0) => 
{
	return mp.game.invoke("0x21A1684A25C2867F", p0);
}


// Arg:p0 is [float]	
g_Natives.NETWORK_SET_TALKER_PROXIMITY = (p0) => 
{
	return mp.game.invoke("0xCBF12D65F95AD686", p0);
}

g_Natives.NETWORK_GET_TALKER_PROXIMITY = () => 
{
	return mp.game.invoke("0x84F0F13120B4E098");
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_VOICE_ACTIVE = (toggle) => 
{
	return mp.game.invoke("0xBABEC9E69A91C57B", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0xCFEB46DCD7D8D5EB"] = (p0) => 
{
	return mp.game.invoke("0xCFEB46DCD7D8D5EB", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.NETWORK_OVERRIDE_TRANSITION_CHAT = (p0) => 
{
	return mp.game.invoke("0xAF66059A131AA269", p0);
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_TEAM_ONLY_CHAT = (toggle) => 
{
	return mp.game.invoke("0xD5B4883AC32F24C3", toggle);
}


// Arg:team is [int]	Arg:toggle is [BOOL]	
g_Natives["0x6F697A66CE78674E"] = (team, toggle) => 
{
	return mp.game.invoke("0x6F697A66CE78674E", team, toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_OVERRIDE_SPECTATOR_MODE = (toggle) => 
{
	return mp.game.invoke("0x70DA3BF8DACD3210", toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x3C5C1E2C2FF814B1"] = (p0) => 
{
	return mp.game.invoke("0x3C5C1E2C2FF814B1", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x9D7AFCBF21C51712"] = (p0) => 
{
	return mp.game.invoke("0x9D7AFCBF21C51712", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xF46A1E03E8755980"] = (p0) => 
{
	return mp.game.invoke("0xF46A1E03E8755980", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x6A5D89D7769A40D8"] = (p0) => 
{
	return mp.game.invoke("0x6A5D89D7769A40D8", p0);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.NETWORK_OVERRIDE_CHAT_RESTRICTIONS = (player, toggle) => 
{
	return mp.game.invoke("0x3039AE5AD2C9C0C4", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives._NETWORK_OVERRIDE_SEND_RESTRICTIONS = (player, toggle) => 
{
	return mp.game.invoke("0x97DD4C5944CC2E6A", player, toggle);
}


// Arg:p0 is [BOOL]	
g_Natives._NETWORK_CHAT_MUTE = (p0) => 
{
	return mp.game.invoke("0x57B192B4D4AD23D5", p0);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.NETWORK_OVERRIDE_RECEIVE_RESTRICTIONS = (player, toggle) => 
{
	return mp.game.invoke("0xDDF73E2B1FEC5AB4", player, toggle);
}


// Arg:p0 is [BOOL]	
g_Natives["0x0FF2862B61A58AF9"] = (p0) => 
{
	return mp.game.invoke("0x0FF2862B61A58AF9", p0);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_SET_VOICE_CHANNEL = (p0) => 
{
	return mp.game.invoke("0xEF6212C2EFEF1A23", p0);
}

g_Natives.NETWORK_CLEAR_VOICE_CHANNEL = () => 
{
	return mp.game.invoke("0xE036A705F989E049");
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.IS_NETWORK_VEHICLE_BEEN_DAMAGED_BY_ANY_OBJECT = (x, y, z) => 
{
	return mp.game.invoke("0xDBD2056652689917", x, y, z);
}

g_Natives["0xF03755696450470C"] = () => 
{
	return mp.game.invoke("0xF03755696450470C");
}


// Arg:p0 is [Any]	
g_Natives["0x5E3AA4CA2B6FB0EE"] = (p0) => 
{
	return mp.game.invoke("0x5E3AA4CA2B6FB0EE", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xCA575C391FEA25CC"] = (p0) => 
{
	return mp.game.invoke("0xCA575C391FEA25CC", p0);
}


// Arg:p0 is [Player]	Arg:p1 is [float*]	Arg:p2 is [float*]	
g_Natives._GET_PLAYER_WAYPOINT_COORDS = (p0, p1, p2) => 
{
	return mp.game.invoke("0xADB57E5B663CCA8B", p0, p1, p2);
}

g_Natives._NETWORK_IS_TEXT_CHAT_ACTIVE = () => 
{
	return mp.game.invoke("0x5FCF4D7069B09026");
}

g_Natives.SHUTDOWN_AND_LAUNCH_SINGLE_PLAYER_GAME = () => 
{
	return mp.game.invoke("0x593850C16A36B692");
}


// Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_FRIENDLY_FIRE_OPTION = (toggle) => 
{
	return mp.game.invoke("0xF808475FA571D823", toggle);
}


// Arg:p0 is [int]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.NETWORK_SET_RICH_PRESENCE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x1DCCACDCFC569362", p0, p1, p2, p3);
}


// Arg:p0 is [int]	Arg:gxtLabel is [char*]	
g_Natives._NETWORK_SET_RICH_PRESENCE_2 = (p0, gxtLabel) => 
{
	return mp.game.invoke("0x3E200C2BCF4164EB", p0, gxtLabel);
}

g_Natives.NETWORK_GET_TIMEOUT_TIME = () => 
{
	return mp.game.invoke("0x5ED0356A0CE3A34F");
}


// Arg:player is [Player]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p4 is [BOOL]	Arg:p5 is [BOOL]	
g_Natives._NETWORK_RESPAWN_COORDS = (player, x, y, z, p4, p5) => 
{
	return mp.game.invoke("0x9769F811D1785B03", player, x, y, z, p4, p5);
}


// Arg:player is [Player]	Arg:p1 is [BOOL]	
g_Natives._NETWORK_RESPAWN_PLAYER = (player, p1) => 
{
	return mp.game.invoke("0xBF22E0F32968E967", player, p1);
}


// Arg:entity is [Entity]	
g_Natives.REMOVE_ALL_STICKY_BOMBS_FROM_ENTITY = (entity) => 
{
	return mp.game.invoke("0x715135F4B82AC90D", entity);
}

g_Natives._NETWORK_PLAYER_IS_IN_CLAN = () => 
{
	return mp.game.invoke("0x579CCED0265D4896");
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_CLAN_PLAYER_IS_ACTIVE = (networkHandle) => 
{
	return mp.game.invoke("0xB124B57F571D8F18", networkHandle);
}


// Arg:clanDesc is [int*]	Arg:bufferSize is [int]	Arg:networkHandle is [int*]	
g_Natives.NETWORK_CLAN_PLAYER_GET_DESC = (clanDesc, bufferSize, networkHandle) => 
{
	return mp.game.invoke("0xEEE6EACBE8874FBA", clanDesc, bufferSize, networkHandle);
}


// Arg:clanDesc is [int*]	Arg:bufferSize is [int]	
g_Natives["0x7543BB439F63792B"] = (clanDesc, bufferSize) => 
{
	return mp.game.invoke("0x7543BB439F63792B", clanDesc, bufferSize);
}


// Arg:clanDesc is [int*]	Arg:bufferSize is [int]	Arg:networkHandle is [int*]	
g_Natives["0xF45352426FF3A4F0"] = (clanDesc, bufferSize, networkHandle) => 
{
	return mp.game.invoke("0xF45352426FF3A4F0", clanDesc, bufferSize, networkHandle);
}

g_Natives._GET_NUM_MEMBERSHIP_DESC = () => 
{
	return mp.game.invoke("0x1F471B79ACC90BEF");
}


// Arg:memberDesc is [int*]	Arg:p1 is [int]	
g_Natives.NETWORK_CLAN_GET_MEMBERSHIP_DESC = (memberDesc, p1) => 
{
	return mp.game.invoke("0x48DE78AF2C8885B8", memberDesc, p1);
}


// Arg:networkHandle is [int*]	
g_Natives.NETWORK_CLAN_DOWNLOAD_MEMBERSHIP = (networkHandle) => 
{
	return mp.game.invoke("0xA989044E70010ABE", networkHandle);
}


// Arg:p0 is [Any*]	
g_Natives.NETWORK_CLAN_DOWNLOAD_MEMBERSHIP_PENDING = (p0) => 
{
	return mp.game.invoke("0x5B9E023DC6EBEDC0", p0);
}

g_Natives._NETWORK_IS_CLAN_MEMBERSHIP_FINISHED_DOWNLOADING = () => 
{
	return mp.game.invoke("0xB3F64A6A91432477");
}


// Arg:p0 is [int*]	
g_Natives.NETWORK_CLAN_REMOTE_MEMBERSHIPS_ARE_IN_CACHE = (p0) => 
{
	return mp.game.invoke("0xBB6E6FEE99D866B2", p0);
}


// Arg:p0 is [int*]	
g_Natives.NETWORK_CLAN_GET_MEMBERSHIP_COUNT = (p0) => 
{
	return mp.game.invoke("0xAAB11F6C4ADBC2C1", p0);
}


// Arg:p0 is [int*]	Arg:p1 is [Any]	
g_Natives.NETWORK_CLAN_GET_MEMBERSHIP_VALID = (p0, p1) => 
{
	return mp.game.invoke("0x48A59CF88D43DF0E", p0, p1);
}


// Arg:p0 is [int*]	Arg:clanMembership is [int*]	Arg:p2 is [int]	
g_Natives.NETWORK_CLAN_GET_MEMBERSHIP = (p0, clanMembership, p2) => 
{
	return mp.game.invoke("0xC8BC2011F67B3411", p0, clanMembership, p2);
}


// Arg:clanDesc is [int]	
g_Natives.NETWORK_CLAN_JOIN = (clanDesc) => 
{
	return mp.game.invoke("0x9FAAA4F4FC71F87F", clanDesc);
}


// Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives._NETWORK_CLAN_ANIMATION = (animDict, animName) => 
{
	return mp.game.invoke("0x729E3401F0430686", animDict, animName);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	
g_Natives["0x2B51EDBEFC301339"] = (p0, p1) => 
{
	return mp.game.invoke("0x2B51EDBEFC301339", p0, p1);
}

g_Natives["0xC32EA7A2F6CA7557"] = () => 
{
	return mp.game.invoke("0xC32EA7A2F6CA7557");
}


// Arg:player is [Player*]	Arg:p1 is [Any*]	
g_Natives._NETWORK_GET_PLAYER_CREW_EMBLEM_TXD_NAME = (player, p1) => 
{
	return mp.game.invoke("0x5835D9CD92E83184", player, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x13518FF1C6B28938"] = (p0) => 
{
	return mp.game.invoke("0x13518FF1C6B28938", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0xA134777FF7F33331"] = (p0, p1) => 
{
	return mp.game.invoke("0xA134777FF7F33331", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x113E6E3E50E286B0"] = (p0) => 
{
	return mp.game.invoke("0x113E6E3E50E286B0", p0);
}

g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_CLEAR = () => 
{
	return mp.game.invoke("0x9AA46BADAD0E27ED");
}

g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_CANCEL = () => 
{
	return mp.game.invoke("0x042E4B70B93E6054");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_START = (p0, p1) => 
{
	return mp.game.invoke("0xCE86D8191B762107", p0, p1);
}

g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_PENDING = () => 
{
	return mp.game.invoke("0xB5074DB804E28CE7");
}

g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_SUCCESS = () => 
{
	return mp.game.invoke("0x5B4F04F19376A0BA");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives.NETWORK_GET_PRIMARY_CLAN_DATA_NEW = (p0, p1) => 
{
	return mp.game.invoke("0xC080FF658B2E41DA", p0, p1);
}


// Arg:netId is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_NETWORK_ID_CAN_MIGRATE = (netId, toggle) => 
{
	return mp.game.invoke("0x299EEB23175895FC", netId, toggle);
}


// Arg:netId is [int]	Arg:toggle is [BOOL]	
g_Natives.SET_NETWORK_ID_EXISTS_ON_ALL_MACHINES = (netId, toggle) => 
{
	return mp.game.invoke("0xE05E81A888FA63C8", netId, toggle);
}


// Arg:netId is [int]	Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives._SET_NETWORK_ID_SYNC_TO_PLAYER = (netId, player, toggle) => 
{
	return mp.game.invoke("0xA8A024587329F36A", netId, player, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives.NETWORK_SET_ENTITY_CAN_BLEND = (entity, toggle) => 
{
	return mp.game.invoke("0xD830567D88A1E873", entity, toggle);
}


// Arg:entity is [Entity]	Arg:toggle is [BOOL]	
g_Natives._NETWORK_SET_ENTITY_INVISIBLE_TO_NETWORK = (entity, toggle) => 
{
	return mp.game.invoke("0xF1CA12B18AEF5298", entity, toggle);
}


// Arg:netId is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_NETWORK_ID_VISIBLE_IN_CUTSCENE = (netId, p1, p2) => 
{
	return mp.game.invoke("0xA6928482543022B4", netId, p1, p2);
}


// Arg:p0 is [BOOL]	
g_Natives["0xAAA553E7DD28A457"] = (p0) => 
{
	return mp.game.invoke("0xAAA553E7DD28A457", p0);
}


// Arg:netId is [int]	Arg:state is [BOOL]	
g_Natives._NETWORK_SET_NETWORK_ID_CAN_BE_SEEN = (netId, state) => 
{
	return mp.game.invoke("0x3FA36981311FA4FF", netId, state);
}


// Arg:netId is [int]	
g_Natives._NETWORK_CAN_NETWORK_ID_BE_SEEN = (netId) => 
{
	return mp.game.invoke("0xA1607996431332DF", netId);
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.SET_LOCAL_PLAYER_VISIBLE_IN_CUTSCENE = (p0, p1) => 
{
	return mp.game.invoke("0xD1065D68947E7B6E", p0, p1);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_LOCAL_PLAYER_INVISIBLE_LOCALLY = (p0) => 
{
	return mp.game.invoke("0xE5F773C1A1D9D168", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.SET_LOCAL_PLAYER_VISIBLE_LOCALLY = (p0) => 
{
	return mp.game.invoke("0x7619364C82D3BF14", p0);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_INVISIBLE_LOCALLY = (player, toggle) => 
{
	return mp.game.invoke("0x12B37D54667DB0B8", player, toggle);
}


// Arg:player is [Player]	Arg:toggle is [BOOL]	
g_Natives.SET_PLAYER_VISIBLE_LOCALLY = (player, toggle) => 
{
	return mp.game.invoke("0xFAA10F1FAFB11AF2", player, toggle);
}


// Arg:p0 is [BOOL]	
g_Natives.FADE_OUT_LOCAL_PLAYER = (p0) => 
{
	return mp.game.invoke("0x416DBD4CD6ED8DD2", p0);
}


// Arg:entity is [Entity]	Arg:normal is [BOOL]	Arg:slow is [BOOL]	
g_Natives.NETWORK_FADE_OUT_ENTITY = (entity, normal, slow) => 
{
	return mp.game.invoke("0xDE564951F95E09ED", entity, normal, slow);
}


// Arg:entity is [Entity]	Arg:state is [BOOL]	
g_Natives.NETWORK_FADE_IN_ENTITY = (entity, state) => 
{
	return mp.game.invoke("0x1F4ED342ACEFE62D", entity, state);
}


// Arg:index is [Player]	
g_Natives["0x631DC5DFF4B110E3"] = (index) => 
{
	return mp.game.invoke("0x631DC5DFF4B110E3", index);
}


// Arg:vehicle is [Vehicle]	
g_Natives["0x422F32CC7E56ABAD"] = (vehicle) => 
{
	return mp.game.invoke("0x422F32CC7E56ABAD", vehicle);
}


// Arg:player is [Player]	
g_Natives.IS_PLAYER_IN_CUTSCENE = (player) => 
{
	return mp.game.invoke("0xE73092F4157CD126", player);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.SET_ENTITY_VISIBLE_IN_CUTSCENE = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE0031D3C8F36AB82", p0, p1, p2);
}


// Arg:entity is [Entity]	
g_Natives.SET_ENTITY_LOCALLY_INVISIBLE = (entity) => 
{
	return mp.game.invoke("0xE135A9FF3F5D05D8", entity);
}


// Arg:entity is [Entity]	
g_Natives.SET_ENTITY_LOCALLY_VISIBLE = (entity) => 
{
	return mp.game.invoke("0x241E289B5C059EDC", entity);
}


// Arg:netID is [int]	
g_Natives.IS_DAMAGE_TRACKER_ACTIVE_ON_NETWORK_ID = (netID) => 
{
	return mp.game.invoke("0x6E192E33AD436366", netID);
}


// Arg:netID is [int]	Arg:p1 is [BOOL]	
g_Natives.ACTIVATE_DAMAGE_TRACKER_ON_NETWORK_ID = (netID, p1) => 
{
	return mp.game.invoke("0xD45B1FFCCD52FF19", netID, p1);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	
g_Natives.IS_SPHERE_VISIBLE_TO_ANOTHER_MACHINE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xD82CF8E64C8729D8", p0, p1, p2, p3);
}


// Arg:player is [Player]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:scale is [float]	
g_Natives.IS_SPHERE_VISIBLE_TO_PLAYER = (player, x, y, z, scale) => 
{
	return mp.game.invoke("0xDC3A310219E5DA62", player, x, y, z, scale);
}


// Arg:amount is [int]	
g_Natives.RESERVE_NETWORK_MISSION_OBJECTS = (amount) => 
{
	return mp.game.invoke("0x4E5C93BD0C32FBF8", amount);
}


// Arg:amount is [int]	
g_Natives.RESERVE_NETWORK_MISSION_PEDS = (amount) => 
{
	return mp.game.invoke("0xB60FEBA45333D36F", amount);
}


// Arg:amount is [int]	
g_Natives.RESERVE_NETWORK_MISSION_VEHICLES = (amount) => 
{
	return mp.game.invoke("0x76B02E21ED27A469", amount);
}


// Arg:amount is [int]	
g_Natives.CAN_REGISTER_MISSION_OBJECTS = (amount) => 
{
	return mp.game.invoke("0x800DD4721A8B008B", amount);
}


// Arg:amount is [int]	
g_Natives.CAN_REGISTER_MISSION_PEDS = (amount) => 
{
	return mp.game.invoke("0xBCBF4FEF9FA5D781", amount);
}


// Arg:amount is [int]	
g_Natives.CAN_REGISTER_MISSION_VEHICLES = (amount) => 
{
	return mp.game.invoke("0x7277F1F2E085EE74", amount);
}


// Arg:ped_amt is [int]	Arg:vehicle_amt is [int]	Arg:object_amt is [int]	Arg:pickup_amt is [int]	
g_Natives.CAN_REGISTER_MISSION_ENTITIES = (ped_amt, vehicle_amt, object_amt, pickup_amt) => 
{
	return mp.game.invoke("0x69778E7564BADE6D", ped_amt, vehicle_amt, object_amt, pickup_amt);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_RESERVED_MISSION_OBJECTS = (p0) => 
{
	return mp.game.invoke("0xAA81B5F10BC43AC2", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_RESERVED_MISSION_PEDS = (p0) => 
{
	return mp.game.invoke("0x1F13D5AE5CB17E17", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_RESERVED_MISSION_VEHICLES = (p0) => 
{
	return mp.game.invoke("0xCF3A965906452031", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_CREATED_MISSION_OBJECTS = (p0) => 
{
	return mp.game.invoke("0x12B6281B6C6706C0", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_CREATED_MISSION_PEDS = (p0) => 
{
	return mp.game.invoke("0xCB215C4B56A7FAE7", p0);
}


// Arg:p0 is [BOOL]	
g_Natives.GET_NUM_CREATED_MISSION_VEHICLES = (p0) => 
{
	return mp.game.invoke("0x0CD9AB83489430EA", p0);
}

g_Natives.GET_MAX_NUM_NETWORK_OBJECTS = () => 
{
	return mp.game.invoke("0xC7BE335216B5EC7C");
}

g_Natives["0x0C1F7D49C39D2289"] = () => 
{
	return mp.game.invoke("0x0C1F7D49C39D2289");
}

g_Natives["0x0AFCE529F69B21FF"] = () => 
{
	return mp.game.invoke("0x0AFCE529F69B21FF");
}

g_Natives["0xA72835064DD63E4C"] = () => 
{
	return mp.game.invoke("0xA72835064DD63E4C");
}

g_Natives.GET_NETWORK_TIME = () => 
{
	return mp.game.invoke("0x7A5487FE9FAA6B48");
}

g_Natives._GET_NETWORK_TIME2 = () => 
{
	return mp.game.invoke("0x89023FBBF9200E9F");
}

g_Natives.HAS_NETWORK_TIME_STARTED = () => 
{
	return mp.game.invoke("0x46718ACEEDEAFC84");
}


// Arg:timeA is [int]	Arg:timeB is [int]	
g_Natives.GET_TIME_OFFSET = (timeA, timeB) => 
{
	return mp.game.invoke("0x017008CCDAD48503", timeA, timeB);
}


// Arg:timeA is [int]	Arg:timeB is [int]	
g_Natives.IS_TIME_LESS_THAN = (timeA, timeB) => 
{
	return mp.game.invoke("0xCB2CF5148012C8D0", timeA, timeB);
}


// Arg:timeA is [int]	Arg:timeB is [int]	
g_Natives.IS_TIME_MORE_THAN = (timeA, timeB) => 
{
	return mp.game.invoke("0xDE350F8651E4346C", timeA, timeB);
}


// Arg:timeA is [int]	Arg:timeB is [int]	
g_Natives.IS_TIME_EQUAL_TO = (timeA, timeB) => 
{
	return mp.game.invoke("0xF5BC95857BD6D512", timeA, timeB);
}


// Arg:timeA is [int]	Arg:timeB is [int]	
g_Natives.GET_TIME_DIFFERENCE = (timeA, timeB) => 
{
	return mp.game.invoke("0xA2C6FC031D46FFF0", timeA, timeB);
}


// Arg:time is [int]	
g_Natives.GET_TIME_AS_STRING = (time) => 
{
	return mp.game.invoke("0x9E23B1777A927DAD", time);
}

g_Natives._GET_POSIX_TIME = () => 
{
	return mp.game.invoke("0x9A73240B49945C76");
}


// Arg:unixEpoch is [int]	Arg:timeStructure is [Any*]	
g_Natives._GET_DATE_AND_TIME_FROM_UNIX_EPOCH = (unixEpoch, timeStructure) => 
{
	return mp.game.invoke("0xAC97AF97FA68E5D5", unixEpoch, timeStructure);
}


// Arg:toggle is [BOOL]	Arg:playerPed is [Ped]	
g_Natives.NETWORK_SET_IN_SPECTATOR_MODE = (toggle, playerPed) => 
{
	return mp.game.invoke("0x423DE3854BB50894", toggle, playerPed);
}


// Arg:toggle is [BOOL]	Arg:playerPed is [Ped]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SET_IN_SPECTATOR_MODE_EXTENDED = (toggle, playerPed, p2) => 
{
	return mp.game.invoke("0x419594E137637120", toggle, playerPed, p2);
}


// Arg:p0 is [BOOL]	
g_Natives["0xFC18DB55AE19E046"] = (p0) => 
{
	return mp.game.invoke("0xFC18DB55AE19E046", p0);
}


// Arg:p0 is [BOOL]	Arg:p1 is [Any]	
g_Natives["0x5C707A667DF8B9FA"] = (p0, p1) => 
{
	return mp.game.invoke("0x5C707A667DF8B9FA", p0, p1);
}

g_Natives.NETWORK_IS_IN_SPECTATOR_MODE = () => 
{
	return mp.game.invoke("0x048746E388762E11");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives.NETWORK_SET_IN_MP_CUTSCENE = (p0, p1) => 
{
	return mp.game.invoke("0x9CA5DE655269FEC4", p0, p1);
}

g_Natives.NETWORK_IS_IN_MP_CUTSCENE = () => 
{
	return mp.game.invoke("0x6CC27C9FA2040220");
}


// Arg:player is [Player]	
g_Natives.NETWORK_IS_PLAYER_IN_MP_CUTSCENE = (player) => 
{
	return mp.game.invoke("0x63F9EE203C3619F2", player);
}


// Arg:netId is [int]	Arg:time is [int]	
g_Natives.SET_NETWORK_VEHICLE_RESPOT_TIMER = (netId, time) => 
{
	return mp.game.invoke("0xEC51713AB6EC36E8", netId, time);
}


// Arg:object is [Object]	Arg:toggle is [BOOL]	
g_Natives._SET_NETWORK_OBJECT_NON_CONTACT = (object, toggle) => 
{
	return mp.game.invoke("0x6274C4712850841E", object, toggle);
}


// Arg:toggle is [BOOL]	
g_Natives.USE_PLAYER_COLOUR_INSTEAD_OF_TEAM_COLOUR = (toggle) => 
{
	return mp.game.invoke("0x5FFE9B4144F9712F", toggle);
}


// Arg:p0 is [Any]	
g_Natives["0x21D04D7BC538C146"] = (p0) => 
{
	return mp.game.invoke("0x21D04D7BC538C146", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x77758139EC9B66C7"] = (p0) => 
{
	return mp.game.invoke("0x77758139EC9B66C7", p0);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:xRot is [float]	Arg:yRot is [float]	Arg:zRot is [float]	Arg:p6 is [int]	Arg:p7 is [int]	Arg:p8 is [int]	Arg:p9 is [float]	
g_Natives.NETWORK_CREATE_SYNCHRONISED_SCENE = (x, y, z, xRot, yRot, zRot, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0x7CD6BC4C2BBDD526", x, y, z, xRot, yRot, zRot, p6, p7, p8, p9);
}


// Arg:ped is [Ped]	Arg:netScene is [int]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:speed is [float]	Arg:speedMultiplier is [float]	Arg:duration is [int]	Arg:flag is [int]	Arg:playbackRate is [float]	Arg:p9 is [Any]	
g_Natives.NETWORK_ADD_PED_TO_SYNCHRONISED_SCENE = (ped, netScene, animDict, animName, speed, speedMultiplier, duration, flag, playbackRate, p9) => 
{
	return mp.game.invoke("0x742A637471BCECD9", ped, netScene, animDict, animName, speed, speedMultiplier, duration, flag, playbackRate, p9);
}


// Arg:entity is [Entity]	Arg:netScene is [int]	Arg:animDict is [char*]	Arg:animName is [char*]	Arg:speed is [float]	Arg:speedMulitiplier is [float]	Arg:flag is [int]	
g_Natives.NETWORK_ADD_ENTITY_TO_SYNCHRONISED_SCENE = (entity, netScene, animDict, animName, speed, speedMulitiplier, flag) => 
{
	return mp.game.invoke("0xF2404D68CBC855FA", entity, netScene, animDict, animName, speed, speedMulitiplier, flag);
}


// Arg:netScene is [int]	Arg:animDict is [char*]	Arg:animName is [char*]	
g_Natives._NETWORK_FORCE_LOCAL_USE_OF_SYNCED_SCENE_CAMERA = (netScene, animDict, animName) => 
{
	return mp.game.invoke("0xCF8BD3B0BD6D42D7", netScene, animDict, animName);
}


// Arg:netScene is [int]	Arg:entity is [Entity]	Arg:bone is [int]	
g_Natives.NETWORK_ATTACH_SYNCHRONISED_SCENE_TO_ENTITY = (netScene, entity, bone) => 
{
	return mp.game.invoke("0x478DCBD2A98B705A", netScene, entity, bone);
}


// Arg:netScene is [int]	
g_Natives.NETWORK_START_SYNCHRONISED_SCENE = (netScene) => 
{
	return mp.game.invoke("0x9A1B3FCDB36C8697", netScene);
}


// Arg:netScene is [int]	
g_Natives.NETWORK_STOP_SYNCHRONISED_SCENE = (netScene) => 
{
	return mp.game.invoke("0xC254481A4574CB2F", netScene);
}


// Arg:netScene is [int]	
g_Natives._NETWORK_CONVERT_SYNCHRONISED_SCENE_TO_SYNCHRONIZED_SCENE = (netScene) => 
{
	return mp.game.invoke("0x02C40BF885C567B6", netScene);
}


// Arg:p0 is [Any]	
g_Natives["0xC9B43A33D09CADA7"] = (p0) => 
{
	return mp.game.invoke("0xC9B43A33D09CADA7", p0);
}


// Arg:p0 is [int]	Arg:p1 is [Any*]	
g_Natives["0xFB1F9381E80FA13F"] = (p0, p1) => 
{
	return mp.game.invoke("0xFB1F9381E80FA13F", p0, p1);
}


// Arg:player is [Player]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:flags is [int]	
g_Natives.NETWORK_START_RESPAWN_SEARCH_FOR_PLAYER = (player, p1, p2, p3, p4, p5, p6, p7, flags) => 
{
	return mp.game.invoke("0x5A6FFA2433E2F14C", player, p1, p2, p3, p4, p5, p6, p7, flags);
}


// Arg:player is [Player]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	Arg:p7 is [float]	Arg:p8 is [float]	Arg:p9 is [float]	Arg:p10 is [float]	Arg:flags is [int]	
g_Natives.NETWORK_START_RESPAWN_SEARCH_IN_ANGLED_AREA_FOR_PLAYER = (player, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, flags) => 
{
	return mp.game.invoke("0x4BA92A18502BCA61", player, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, flags);
}


// Arg:p0 is [Any*]	
g_Natives["0x3C891A251567DFCE"] = (p0) => 
{
	return mp.game.invoke("0x3C891A251567DFCE", p0);
}

g_Natives.NETWORK_CANCEL_RESPAWN_SEARCH = () => 
{
	return mp.game.invoke("0xFB8F2A6F3DF08CBE");
}


// Arg:randomInt is [int]	Arg:coordinates is [Vector3*]	Arg:heading is [float*]	
g_Natives.NETWORK_GET_RESPAWN_RESULT = (randomInt, coordinates, heading) => 
{
	return mp.game.invoke("0x371EA43692861CF1", randomInt, coordinates, heading);
}


// Arg:p0 is [Any]	
g_Natives["0x6C34F1208B8923FD"] = (p0) => 
{
	return mp.game.invoke("0x6C34F1208B8923FD", p0);
}

g_Natives["0x17E0198B3882C2CB"] = () => 
{
	return mp.game.invoke("0x17E0198B3882C2CB");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xFB680D403909DC70"] = (p0, p1) => 
{
	return mp.game.invoke("0xFB680D403909DC70", p0, p1);
}

g_Natives.NETWORK_END_TUTORIAL_SESSION = () => 
{
	return mp.game.invoke("0xD0AFAFF5A51D72F7");
}

g_Natives.NETWORK_IS_IN_TUTORIAL_SESSION = () => 
{
	return mp.game.invoke("0xADA24309FE08DACF");
}

g_Natives["0xB37E4E6A2388CA7B"] = () => 
{
	return mp.game.invoke("0xB37E4E6A2388CA7B");
}

g_Natives["0x35F0B98A8387274D"] = () => 
{
	return mp.game.invoke("0x35F0B98A8387274D");
}


// Arg:p0 is [Any]	
g_Natives["0x3B39236746714134"] = (p0) => 
{
	return mp.game.invoke("0x3B39236746714134", p0);
}


// Arg:player is [Player]	Arg:index is [int]	
g_Natives._NETWORK_IS_PLAYER_EQUAL_TO_INDEX = (player, index) => 
{
	return mp.game.invoke("0x9DE986FC9A87C474", player, index);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0xBBDF066252829606"] = (p0, p1) => 
{
	return mp.game.invoke("0xBBDF066252829606", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x919B3C98ED8292F9"] = (p0) => 
{
	return mp.game.invoke("0x919B3C98ED8292F9", p0);
}


// Arg:Hours is [int]	Arg:Minutes is [int]	Arg:Seconds is [int]	
g_Natives.NETWORK_OVERRIDE_CLOCK_TIME = (Hours, Minutes, Seconds) => 
{
	return mp.game.invoke("0xE679E3E06E363892", Hours, Minutes, Seconds);
}

g_Natives.NETWORK_CLEAR_CLOCK_TIME_OVERRIDE = () => 
{
	return mp.game.invoke("0xD972DF67326F966E");
}

g_Natives.NETWORK_IS_CLOCK_TIME_OVERRIDDEN = () => 
{
	return mp.game.invoke("0xD7C95D322FF57522");
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives.NETWORK_ADD_ENTITY_AREA = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x494C8FB299290269", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	Arg:p6 is [float]	
g_Natives._NETWORK_ADD_ENTITY_ANGLED_AREA = (p0, p1, p2, p3, p4, p5, p6) => 
{
	return mp.game.invoke("0x376C6375BA60293A", p0, p1, p2, p3, p4, p5, p6);
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [float]	Arg:p3 is [float]	Arg:p4 is [float]	Arg:p5 is [float]	
g_Natives["0x25B99872D588A101"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x25B99872D588A101", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_REMOVE_ENTITY_AREA = (p0) => 
{
	return mp.game.invoke("0x93CF869BAA0C4874", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xE64A3CA08DFA37A9"] = (p0) => 
{
	return mp.game.invoke("0xE64A3CA08DFA37A9", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x4DF7CFFF471A7FB1"] = (p0) => 
{
	return mp.game.invoke("0x4DF7CFFF471A7FB1", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x4A2D4E8BF4265B0F"] = (p0) => 
{
	return mp.game.invoke("0x4A2D4E8BF4265B0F", p0);
}


// Arg:netID is [int]	Arg:toggle is [BOOL]	
g_Natives._NETWORK_SET_NETWORK_ID_HAS_PHYSICALITY = (netID, toggle) => 
{
	return mp.game.invoke("0x2B1813ABA29016C5", netID, toggle);
}

g_Natives._NETWORK_REQUEST_CLOUD_BACKGROUND_SCRIPTS = () => 
{
	return mp.game.invoke("0x924426BFFD82E915");
}

g_Natives._HAS_BG_SCRIPT_BEEN_DOWNLOADED = () => 
{
	return mp.game.invoke("0x8132C0EB8B2B3293");
}

g_Natives.NETWORK_REQUEST_CLOUD_TUNABLES = () => 
{
	return mp.game.invoke("0x42FB3B532D526E6C");
}

g_Natives._NETWORK_HAVE_TUNABLES_BEEN_DOWNLOADED = () => 
{
	return mp.game.invoke("0x0467C11ED88B7D28");
}

g_Natives["0x10BD227A753B0D84"] = () => 
{
	return mp.game.invoke("0x10BD227A753B0D84");
}


// Arg:tunableContext is [char*]	Arg:tunableName is [char*]	
g_Natives.NETWORK_DOES_TUNABLE_EXIST = (tunableContext, tunableName) => 
{
	return mp.game.invoke("0x85E5F8B9B898B20A", tunableContext, tunableName);
}


// Arg:tunableContext is [char*]	Arg:tunableName is [char*]	Arg:value is [int*]	
g_Natives.NETWORK_ACCESS_TUNABLE_INT = (tunableContext, tunableName, value) => 
{
	return mp.game.invoke("0x8BE1146DFD5D4468", tunableContext, tunableName, value);
}


// Arg:tunableContext is [char*]	Arg:tunableName is [char*]	Arg:value is [float*]	
g_Natives.NETWORK_ACCESS_TUNABLE_FLOAT = (tunableContext, tunableName, value) => 
{
	return mp.game.invoke("0xE5608CA7BC163A5F", tunableContext, tunableName, value);
}


// Arg:tunableContext is [char*]	Arg:tunableName is [char*]	
g_Natives.NETWORK_ACCESS_TUNABLE_BOOL = (tunableContext, tunableName) => 
{
	return mp.game.invoke("0xAA6A47A573ABB75A", tunableContext, tunableName);
}


// Arg:tunableContext is [Hash]	Arg:tunableName is [Hash]	
g_Natives._NETWORK_DOES_TUNABLE_EXIST_HASH = (tunableContext, tunableName) => 
{
	return mp.game.invoke("0xE4E53E1419D81127", tunableContext, tunableName);
}


// Arg:tunableContext is [Hash]	Arg:tunableName is [Hash]	Arg:value is [int*]	
g_Natives._NETWORK_ACCESS_TUNABLE_INT_HASH = (tunableContext, tunableName, value) => 
{
	return mp.game.invoke("0x40FCE03E50E8DBE8", tunableContext, tunableName, value);
}


// Arg:tunableContext is [Hash]	Arg:tunableName is [Hash]	Arg:value is [float*]	
g_Natives._NETWORK_ACCESS_TUNABLE_FLOAT_HASH = (tunableContext, tunableName, value) => 
{
	return mp.game.invoke("0x972BC203BBC4C4D5", tunableContext, tunableName, value);
}


// Arg:tunableContext is [Hash]	Arg:tunableName is [Hash]	
g_Natives._NETWORK_ACCESS_TUNABLE_BOOL_HASH = (tunableContext, tunableName) => 
{
	return mp.game.invoke("0xEA16B69D93D71A45", tunableContext, tunableName);
}


// Arg:tunableContext is [Hash]	Arg:tunableName is [Hash]	Arg:defaultValue is [BOOL]	
g_Natives._NETWORK_ACCESS_TUNABLE_BOOL_HASH_FAIL_VAL = (tunableContext, tunableName, defaultValue) => 
{
	return mp.game.invoke("0xC7420099936CE286", tunableContext, tunableName, defaultValue);
}


// Arg:contentHash is [Hash]	
g_Natives._GET_TUNABLES_CONTENT_MODIFIER_ID = (contentHash) => 
{
	return mp.game.invoke("0x187382F8A3E0A6C3", contentHash);
}

g_Natives["0x7DB53B37A2F211A0"] = () => 
{
	return mp.game.invoke("0x7DB53B37A2F211A0");
}

g_Natives.NETWORK_RESET_BODY_TRACKER = () => 
{
	return mp.game.invoke("0x72433699B4E6DD64");
}

g_Natives["0xD38C4A6D047C019D"] = () => 
{
	return mp.game.invoke("0xD38C4A6D047C019D");
}


// Arg:p0 is [Any]	
g_Natives["0x2E0BF682CC778D49"] = (p0) => 
{
	return mp.game.invoke("0x2E0BF682CC778D49", p0);
}


// Arg:ped is [Ped]	Arg:player is [Player]	
g_Natives["0x0EDE326D47CD0F3E"] = (ped, player) => 
{
	return mp.game.invoke("0x0EDE326D47CD0F3E", ped, player);
}


// Arg:vehicle is [Vehicle]	Arg:isAudible is [BOOL]	Arg:isInvisible is [BOOL]	Arg:player is [Player]	
g_Natives.NETWORK_EXPLODE_VEHICLE = (vehicle, isAudible, isInvisible, player) => 
{
	return mp.game.invoke("0x301A42153C9AD707", vehicle, isAudible, isInvisible, player);
}


// Arg:entity is [Entity]	
g_Natives["0xCD71A4ECAB22709E"] = (entity) => 
{
	return mp.game.invoke("0xCD71A4ECAB22709E", entity);
}


// Arg:ped is [Ped]	Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	Arg:p4 is [float]	
g_Natives["0xA7E30DE9272B6D49"] = (ped, x, y, z, p4) => 
{
	return mp.game.invoke("0xA7E30DE9272B6D49", ped, x, y, z, p4);
}


// Arg:netID is [int]	
g_Natives["0x407091CF6037118E"] = (netID) => 
{
	return mp.game.invoke("0x407091CF6037118E", netID);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_SET_PROPERTY_ID = (p0) => 
{
	return mp.game.invoke("0x1775961C2FBBCB5C", p0);
}

g_Natives.NETWORK_CLEAR_PROPERTY_ID = () => 
{
	return mp.game.invoke("0xC2B82527CA77053E");
}


// Arg:p0 is [int]	
g_Natives["0x367EF5E2F439B4C6"] = (p0) => 
{
	return mp.game.invoke("0x367EF5E2F439B4C6", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0x94538037EE44F5CF"] = (p0) => 
{
	return mp.game.invoke("0x94538037EE44F5CF", p0);
}

g_Natives._NETWORK_CACHE_LOCAL_PLAYER_HEAD_BLEND_DATA = () => 
{
	return mp.game.invoke("0xBD0BE0BFC927EAC1");
}


// Arg:p0 is [Any]	
g_Natives["0x237D5336A9A54108"] = (p0) => 
{
	return mp.game.invoke("0x237D5336A9A54108", p0);
}


// Arg:ped is [Ped]	Arg:player is [Player]	
g_Natives._NETWORK_COPY_PED_BLEND_DATA = (ped, player) => 
{
	return mp.game.invoke("0x99B72C7ABDE5C910", ped, player);
}

g_Natives["0xF2EAC213D5EA0623"] = () => 
{
	return mp.game.invoke("0xF2EAC213D5EA0623");
}

g_Natives["0xEA14EEF5B7CD2C30"] = () => 
{
	return mp.game.invoke("0xEA14EEF5B7CD2C30");
}


// Arg:p0 is [Any]	
g_Natives["0xB606E6CC59664972"] = (p0) => 
{
	return mp.game.invoke("0xB606E6CC59664972", p0);
}

g_Natives["0x1D4DC17C38FEAFF0"] = () => 
{
	return mp.game.invoke("0x1D4DC17C38FEAFF0");
}


// Arg:p0 is [Any]	
g_Natives["0x662635855957C411"] = (p0) => 
{
	return mp.game.invoke("0x662635855957C411", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xB4271092CA7EDF48"] = (p0) => 
{
	return mp.game.invoke("0xB4271092CA7EDF48", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xCA94551B50B4932C"] = (p0) => 
{
	return mp.game.invoke("0xCA94551B50B4932C", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x2A7776C709904AB0"] = (p0) => 
{
	return mp.game.invoke("0x2A7776C709904AB0", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x6F44CBF56D79FAC0"] = (p0, p1) => 
{
	return mp.game.invoke("0x6F44CBF56D79FAC0", p0, p1);
}


// Arg:p0 is [char*]	Arg:p1 is [char*]	
g_Natives["0x58C21165F6545892"] = (p0, p1) => 
{
	return mp.game.invoke("0x58C21165F6545892", p0, p1);
}

g_Natives["0x2EAC52B4019E2782"] = () => 
{
	return mp.game.invoke("0x2EAC52B4019E2782");
}


// Arg:toggle is [BOOL]	
g_Natives.SET_STORE_ENABLED = (toggle) => 
{
	return mp.game.invoke("0x9641A9FF718E9C5E", toggle);
}


// Arg:p0 is [Any]	
g_Natives["0xA2F952104FC6DD4B"] = (p0) => 
{
	return mp.game.invoke("0xA2F952104FC6DD4B", p0);
}

g_Natives["0x72D0706CD6CCDB58"] = () => 
{
	return mp.game.invoke("0x72D0706CD6CCDB58");
}


// Arg:p0 is [Any]	
g_Natives["0x722F5D28B61C5EA8"] = (p0) => 
{
	return mp.game.invoke("0x722F5D28B61C5EA8", p0);
}

g_Natives["0x883D79C4071E18B3"] = () => 
{
	return mp.game.invoke("0x883D79C4071E18B3");
}

g_Natives["0x265635150FB0D82E"] = () => 
{
	return mp.game.invoke("0x265635150FB0D82E");
}

g_Natives["0x444C4525ECE0A4B9"] = () => 
{
	return mp.game.invoke("0x444C4525ECE0A4B9");
}

g_Natives["0x59328EB08C5CEB2B"] = () => 
{
	return mp.game.invoke("0x59328EB08C5CEB2B");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0xFAE628F1E9ADB239"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xFAE628F1E9ADB239", p0, p1, p2);
}


// Arg:p0 is [Any*]	
g_Natives["0xC64DED7EF0D2FE37"] = (p0) => 
{
	return mp.game.invoke("0xC64DED7EF0D2FE37", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x4C61B39930D045DA"] = (p0) => 
{
	return mp.game.invoke("0x4C61B39930D045DA", p0);
}


// Arg:p1 is [Hash]	
g_Natives["0x3A3D5568AF297CD5"] = (p1) => 
{
	return mp.game.invoke("0x3A3D5568AF297CD5", p1);
}

g_Natives.CLOUD_CHECK_AVAILABILITY = () => 
{
	return mp.game.invoke("0x4F18196C8D38768D");
}

g_Natives["0xC7ABAC5DE675EE3B"] = () => 
{
	return mp.game.invoke("0xC7ABAC5DE675EE3B");
}

g_Natives.NETWORK_ENABLE_MOTION_DRUGGED = () => 
{
	return mp.game.invoke("0x0B0CC10720653F3B");
}

g_Natives["0x8B0C2964BA471961"] = () => 
{
	return mp.game.invoke("0x8B0C2964BA471961");
}

g_Natives["0x88B588B41FF7868E"] = () => 
{
	return mp.game.invoke("0x88B588B41FF7868E");
}

g_Natives["0x67FC09BC554A75E5"] = () => 
{
	return mp.game.invoke("0x67FC09BC554A75E5");
}

g_Natives["0x966DD84FB6A46017"] = () => 
{
	return mp.game.invoke("0x966DD84FB6A46017");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x152D90E4C1B4738A"] = (p0, p1) => 
{
	return mp.game.invoke("0x152D90E4C1B4738A", p0, p1);
}

g_Natives["0x9FEDF86898F100E9"] = () => 
{
	return mp.game.invoke("0x9FEDF86898F100E9");
}

g_Natives["0x5E24341A7F92A74B"] = () => 
{
	return mp.game.invoke("0x5E24341A7F92A74B");
}

g_Natives["0x24E4E51FC16305F9"] = () => 
{
	return mp.game.invoke("0x24E4E51FC16305F9");
}

g_Natives["0xFBC5E768C7A77A6A"] = () => 
{
	return mp.game.invoke("0xFBC5E768C7A77A6A");
}

g_Natives["0xC55A0B40FFB1ED23"] = () => 
{
	return mp.game.invoke("0xC55A0B40FFB1ED23");
}

g_Natives["0x17440AA15D1D3739"] = () => 
{
	return mp.game.invoke("0x17440AA15D1D3739");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	
g_Natives["0x9BF438815F5D96EA"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x9BF438815F5D96EA", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any*]	Arg:p4 is [Any]	Arg:p5 is [BOOL]	
g_Natives["0x692D58DF40657E8C"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x692D58DF40657E8C", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	Arg:contentType is [char*]	
g_Natives["0x158EC424F35EC469"] = (p0, p1, contentType) => 
{
	return mp.game.invoke("0x158EC424F35EC469", p0, p1, contentType);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	Arg:p3 is [Any*]	
g_Natives["0xC7397A83F7A2A462"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xC7397A83F7A2A462", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [char*]	Arg:p3 is [Any]	
g_Natives["0x6D4CB481FAC835E8"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6D4CB481FAC835E8", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xD5A4B59980401588"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xD5A4B59980401588", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x3195F8DD0D531052"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x3195F8DD0D531052", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xF9E1CCAE8BA4C281"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xF9E1CCAE8BA4C281", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives._GET_CLAN_CONTENT = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x9F6E2821885CAEE2", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives["0x678BB03C1A3BD51E"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x678BB03C1A3BD51E", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives.SET_BALANCE_ADD_MACHINE = (p0, p1) => 
{
	return mp.game.invoke("0x815E5E3073DA1D67", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any*]	
g_Natives.SET_BALANCE_ADD_MACHINES = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB8322EEB38BE7C26", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0xA7862BC5ED1DFD7E"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xA7862BC5ED1DFD7E", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x97A770BEEF227E2B"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x97A770BEEF227E2B", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	
g_Natives["0x5324A0E3E4CE3570"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x5324A0E3E4CE3570", p0, p1, p2, p3);
}

g_Natives["0xE9B99B6853181409"] = () => 
{
	return mp.game.invoke("0xE9B99B6853181409");
}

g_Natives["0xD53ACDBEF24A46E8"] = () => 
{
	return mp.game.invoke("0xD53ACDBEF24A46E8");
}

g_Natives["0x02ADA21EA2F6918F"] = () => 
{
	return mp.game.invoke("0x02ADA21EA2F6918F");
}

g_Natives["0x941E5306BCD7C2C7"] = () => 
{
	return mp.game.invoke("0x941E5306BCD7C2C7");
}

g_Natives["0xC87E740D9F3872CC"] = () => 
{
	return mp.game.invoke("0xC87E740D9F3872CC");
}

g_Natives["0xEDF7F927136C224B"] = () => 
{
	return mp.game.invoke("0xEDF7F927136C224B");
}

g_Natives["0xE0A6138401BCB837"] = () => 
{
	return mp.game.invoke("0xE0A6138401BCB837");
}

g_Natives["0x769951E2455E2EB5"] = () => 
{
	return mp.game.invoke("0x769951E2455E2EB5");
}

g_Natives["0x3A17A27D75C74887"] = () => 
{
	return mp.game.invoke("0x3A17A27D75C74887");
}

g_Natives["0xBA96394A0EECFA65"] = () => 
{
	return mp.game.invoke("0xBA96394A0EECFA65");
}


// Arg:p0 is [int]	
g_Natives.GET_PLAYER_ADVANCED_MODIFIER_PRIVILEGES = (p0) => 
{
	return mp.game.invoke("0xCD67AD041A394C9C", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0x584770794D758C18"] = (p0, p1) => 
{
	return mp.game.invoke("0x584770794D758C18", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x8C8D2739BA44AF0F"] = (p0) => 
{
	return mp.game.invoke("0x8C8D2739BA44AF0F", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x703F12425ECA8BF5"] = (p0) => 
{
	return mp.game.invoke("0x703F12425ECA8BF5", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xAEAB987727C5A8A4"] = (p0) => 
{
	return mp.game.invoke("0xAEAB987727C5A8A4", p0);
}


// Arg:p0 is [int]	
g_Natives._GET_CONTENT_CATEGORY = (p0) => 
{
	return mp.game.invoke("0xA7BAB11E7C9C6C5A", p0);
}


// Arg:p0 is [Any]	
g_Natives._GET_CONTENT_ID = (p0) => 
{
	return mp.game.invoke("0x55AA95F481D694D2", p0);
}


// Arg:p0 is [Any]	
g_Natives._GET_ROOT_CONTENT_ID = (p0) => 
{
	return mp.game.invoke("0xC0173D6BFF4E0348", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xBF09786A7FCAB582"] = (p0) => 
{
	return mp.game.invoke("0xBF09786A7FCAB582", p0);
}


// Arg:p0 is [Any]	
g_Natives._GET_CONTENT_DESCRIPTION_HASH = (p0) => 
{
	return mp.game.invoke("0x7CF0448787B23758", p0);
}


// Arg:p0 is [int]	Arg:p1 is [Any*]	
g_Natives["0xBAF6BABF9E7CCC13"] = (p0, p1) => 
{
	return mp.game.invoke("0xBAF6BABF9E7CCC13", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0xCFD115B373C0DF63"] = (p0, p1) => 
{
	return mp.game.invoke("0xCFD115B373C0DF63", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives._GET_CONTENT_FILE_VERSION = (p0, p1) => 
{
	return mp.game.invoke("0x37025B27D9B658B1", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x1D610EB0FEA716D9"] = (p0) => 
{
	return mp.game.invoke("0x1D610EB0FEA716D9", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x7FCC39C46C3C03BD"] = (p0) => 
{
	return mp.game.invoke("0x7FCC39C46C3C03BD", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x32DD916F3F7C9672"] = (p0) => 
{
	return mp.game.invoke("0x32DD916F3F7C9672", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x3054F114121C21EA"] = (p0) => 
{
	return mp.game.invoke("0x3054F114121C21EA", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xA9240A96C74CCA13"] = (p0) => 
{
	return mp.game.invoke("0xA9240A96C74CCA13", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x1ACCFBA3D8DAB2EE"] = (p0, p1) => 
{
	return mp.game.invoke("0x1ACCFBA3D8DAB2EE", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x759299C5BB31D2A9"] = (p0, p1) => 
{
	return mp.game.invoke("0x759299C5BB31D2A9", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x87E5C46C187FE0AE"] = (p0, p1) => 
{
	return mp.game.invoke("0x87E5C46C187FE0AE", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x4E548C0D7AE39FF9"] = (p0, p1) => 
{
	return mp.game.invoke("0x4E548C0D7AE39FF9", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x70EA8DA57840F9BE"] = (p0) => 
{
	return mp.game.invoke("0x70EA8DA57840F9BE", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x993CBE59D350D225"] = (p0) => 
{
	return mp.game.invoke("0x993CBE59D350D225", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x171DF6A0C07FB3DC"] = (p0, p1) => 
{
	return mp.game.invoke("0x171DF6A0C07FB3DC", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	
g_Natives["0x7FD2990AF016795E"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x7FD2990AF016795E", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	
g_Natives["0x5E0165278F6339EE"] = (p0) => 
{
	return mp.game.invoke("0x5E0165278F6339EE", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x2D5DC831176D0114"] = (p0) => 
{
	return mp.game.invoke("0x2D5DC831176D0114", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xEBFA8D50ADDC54C4"] = (p0) => 
{
	return mp.game.invoke("0xEBFA8D50ADDC54C4", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x162C23CA83ED0A62"] = (p0) => 
{
	return mp.game.invoke("0x162C23CA83ED0A62", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x40F7E66472DF3E5C"] = (p0, p1) => 
{
	return mp.game.invoke("0x40F7E66472DF3E5C", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x5A34CD9C3C5BEC44"] = (p0) => 
{
	return mp.game.invoke("0x5A34CD9C3C5BEC44", p0);
}

g_Natives["0x68103E2247887242"] = () => 
{
	return mp.game.invoke("0x68103E2247887242");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0x1DE0F5F50D723CAA"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x1DE0F5F50D723CAA", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	Arg:p2 is [Any*]	
g_Natives["0x274A1519DFC1094F"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x274A1519DFC1094F", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [BOOL]	Arg:p2 is [Any*]	
g_Natives["0xD05D1A6C74DA3498"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD05D1A6C74DA3498", p0, p1, p2);
}

g_Natives["0x45E816772E93A9DB"] = () => 
{
	return mp.game.invoke("0x45E816772E93A9DB");
}

g_Natives["0x299EF3C576773506"] = () => 
{
	return mp.game.invoke("0x299EF3C576773506");
}

g_Natives["0x793FF272D5B365F4"] = () => 
{
	return mp.game.invoke("0x793FF272D5B365F4");
}

g_Natives["0x5A0A3D1A186A5508"] = () => 
{
	return mp.game.invoke("0x5A0A3D1A186A5508");
}

g_Natives["0xA1E5E0204A6FCC70"] = () => 
{
	return mp.game.invoke("0xA1E5E0204A6FCC70");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0xB746D20B17F2A229"] = (p0, p1) => 
{
	return mp.game.invoke("0xB746D20B17F2A229", p0, p1);
}

g_Natives["0x63B406D7884BFA95"] = () => 
{
	return mp.game.invoke("0x63B406D7884BFA95");
}

g_Natives["0x4D02279C83BE69FE"] = () => 
{
	return mp.game.invoke("0x4D02279C83BE69FE");
}

g_Natives["0x597F8DBA9B206FC7"] = () => 
{
	return mp.game.invoke("0x597F8DBA9B206FC7");
}


// Arg:p0 is [Any]	
g_Natives["0x5CAE833B0EE0C500"] = (p0) => 
{
	return mp.game.invoke("0x5CAE833B0EE0C500", p0);
}

g_Natives["0x61A885D3F7CFEE9A"] = () => 
{
	return mp.game.invoke("0x61A885D3F7CFEE9A");
}


// Arg:p0 is [BOOL]	
g_Natives["0xF98DDE0A8ED09323"] = (p0) => 
{
	return mp.game.invoke("0xF98DDE0A8ED09323", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xFD75DABC0957BF33"] = (p0) => 
{
	return mp.game.invoke("0xFD75DABC0957BF33", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xF53E48461B71EECB"] = (p0) => 
{
	return mp.game.invoke("0xF53E48461B71EECB", p0);
}


// Arg:heistName is [char*]	Arg:cashEarned is [int]	Arg:xpEarned is [int]	
g_Natives._FACEBOOK_SET_HEIST_COMPLETE = (heistName, cashEarned, xpEarned) => 
{
	return mp.game.invoke("0x098AB65B9ED9A9EC", heistName, cashEarned, xpEarned);
}

g_Natives._FACEBOOK_SET_CREATE_CHARACTER_COMPLETE = () => 
{
	return mp.game.invoke("0xDC48473142545431");
}


// Arg:milestoneId is [int]	
g_Natives._FACEBOOK_SET_MILESTONE_COMPLETE = (milestoneId) => 
{
	return mp.game.invoke("0x0AE1F1653B554AB9", milestoneId);
}

g_Natives._FACEBOOK_IS_SENDING_DATA = () => 
{
	return mp.game.invoke("0x62B9FEC9A11F10EF");
}

g_Natives._FACEBOOK_DO_UNK_CHECK = () => 
{
	return mp.game.invoke("0xA75E2B6733DA5142");
}

g_Natives._FACEBOOK_IS_AVAILABLE = () => 
{
	return mp.game.invoke("0x43865688AE10F0D7");
}


// Arg:PlayerHandle is [int*]	Arg:FilePath is [char*]	Arg:Name is [char*]	Arg:p3 is [BOOL]	
g_Natives.TEXTURE_DOWNLOAD_REQUEST = (PlayerHandle, FilePath, Name, p3) => 
{
	return mp.game.invoke("0x16160DA74A8E74A2", PlayerHandle, FilePath, Name, p3);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [BOOL]	
g_Natives["0x0B203B4AFDE53A4F"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x0B203B4AFDE53A4F", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any*]	Arg:p5 is [BOOL]	
g_Natives["0x308F96458B7087CC"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x308F96458B7087CC", p0, p1, p2, p3, p4, p5);
}


// Arg:p0 is [int]	
g_Natives.TEXTURE_DOWNLOAD_RELEASE = (p0) => 
{
	return mp.game.invoke("0x487EB90B98E9FB19", p0);
}


// Arg:p0 is [int]	
g_Natives.TEXTURE_DOWNLOAD_HAS_FAILED = (p0) => 
{
	return mp.game.invoke("0x5776ED562C134687", p0);
}


// Arg:p0 is [int]	
g_Natives.TEXTURE_DOWNLOAD_GET_NAME = (p0) => 
{
	return mp.game.invoke("0x3448505B6E35262D", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x8BD6C6DEA20E82C6"] = (p0) => 
{
	return mp.game.invoke("0x8BD6C6DEA20E82C6", p0);
}

g_Natives["0x60EDD13EB3AC1FF3"] = () => 
{
	return mp.game.invoke("0x60EDD13EB3AC1FF3");
}

g_Natives.NETWORK_IS_CABLE_CONNECTED = () => 
{
	return mp.game.invoke("0xEFFB25453D8600F9");
}

g_Natives["0x66B59CFFD78467AF"] = () => 
{
	return mp.game.invoke("0x66B59CFFD78467AF");
}

g_Natives["0x606E4D3E3CCCF3EB"] = () => 
{
	return mp.game.invoke("0x606E4D3E3CCCF3EB");
}

g_Natives._IS_ROCKSTAR_BANNED = () => 
{
	return mp.game.invoke("0x8020A73847E0CA7D");
}

g_Natives._IS_SOCIALCLUB_BANNED = () => 
{
	return mp.game.invoke("0xA0AD7E2AF5349F61");
}

g_Natives._CAN_PLAY_ONLINE = () => 
{
	return mp.game.invoke("0x5F91D5D0B36AA310");
}

g_Natives["0x422D396F80A96547"] = () => 
{
	return mp.game.invoke("0x422D396F80A96547");
}


// Arg:index is [int]	
g_Natives.NETWORK_HAS_ROS_PRIVILEGE = (index) => 
{
	return mp.game.invoke("0xA699957E60D80214", index);
}


// Arg:p0 is [int]	Arg:p1 is [int*]	Arg:p2 is [Any*]	
g_Natives["0xC22912B1D85F26B1"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xC22912B1D85F26B1", p0, p1, p2);
}

g_Natives["0x593570C289A77688"] = () => 
{
	return mp.game.invoke("0x593570C289A77688");
}

g_Natives["0x91B87C55093DE351"] = () => 
{
	return mp.game.invoke("0x91B87C55093DE351");
}


// Arg:p0 is [Any]	
g_Natives["0x36391F397731595D"] = (p0) => 
{
	return mp.game.invoke("0x36391F397731595D", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xDEB2B99A1AF1A2A6"] = (p0) => 
{
	return mp.game.invoke("0xDEB2B99A1AF1A2A6", p0);
}

g_Natives["0x9465E683B12D3F6B"] = () => 
{
	return mp.game.invoke("0x9465E683B12D3F6B");
}

g_Natives._NETWORK_UPDATE_PLAYER_SCARS = () => 
{
	return mp.game.invoke("0xB7C7F6AD6424304B");
}


// Arg:p0 is [BOOL]	
g_Natives["0xC505036A35AFD01B"] = (p0) => 
{
	return mp.game.invoke("0xC505036A35AFD01B", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	
g_Natives["0x267C78C60E806B9A"] = (p0, p1) => 
{
	return mp.game.invoke("0x267C78C60E806B9A", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x6BFF5F84102DF80A"] = (p0) => 
{
	return mp.game.invoke("0x6BFF5F84102DF80A", p0);
}

g_Natives["0x5C497525F803486B"] = () => 
{
	return mp.game.invoke("0x5C497525F803486B");
}

g_Natives["0x6FB7BB3607D27FA2"] = () => 
{
	return mp.game.invoke("0x6FB7BB3607D27FA2");
}

g_Natives["0x45A83257ED02D9BC"] = () => 
{
	return mp.game.invoke("0x45A83257ED02D9BC");
}


// Arg:p1 is [Player]	Arg:p2 is [int]	
g_Natives.NETWORK_INITIALIZE_CASH = (p1, p2) => 
{
	return mp.game.invoke("0x3DA5ECD1A56CBA6D", p1, p2);
}


// Arg:characterIndex is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_DELETE_CHARACTER = (characterIndex, p1, p2) => 
{
	return mp.game.invoke("0x05A50AF38947EB8D", characterIndex, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_CLEAR_CHARACTER_WALLET = (p0) => 
{
	return mp.game.invoke("0xA921DED15FDF28F5", p0);
}


// Arg:amount is [int]	Arg:networkHandle is [int*]	
g_Natives.NETWORK_GIVE_PLAYER_JOBSHARE_CASH = (amount, networkHandle) => 
{
	return mp.game.invoke("0xFB18DF9CB95E0105", amount, networkHandle);
}


// Arg:value is [int]	Arg:networkHandle is [int*]	
g_Natives.NETWORK_RECEIVE_PLAYER_JOBSHARE_CASH = (value, networkHandle) => 
{
	return mp.game.invoke("0x56A3B51944C50598", value, networkHandle);
}

g_Natives.NETWORK_CAN_SHARE_JOB_CASH = () => 
{
	return mp.game.invoke("0x1C2473301B1C66BA");
}


// Arg:m_Index is [int]	Arg:szType is [char*]	Arg:szReason is [char*]	Arg:bUnk is [BOOL]	
g_Natives.NETWORK_REFUND_CASH = (m_Index, szType, szReason, bUnk) => 
{
	return mp.game.invoke("0xF9C812CD7C46E817", m_Index, szType, szReason, bUnk);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_MONEY_CAN_BET = (p0, p1, p2) => 
{
	return mp.game.invoke("0x81404F3DC124FE5B", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives.NETWORK_CAN_BET = (p0) => 
{
	return mp.game.invoke("0x3A54E33660DED67F", p0);
}


// Arg:amount is [int]	
g_Natives.NETWORK_EARN_FROM_PICKUP = (amount) => 
{
	return mp.game.invoke("0xED1517D3AF17C698", amount);
}


// Arg:amount is [int]	
g_Natives._NETWORK_EARN_FROM_GANG_PICKUP = (amount) => 
{
	return mp.game.invoke("0xA03D4ACE0A3284CE", amount);
}


// Arg:amount is [int]	
g_Natives._NETWORK_EARN_FROM_ARMOUR_TRUCK = (amount) => 
{
	return mp.game.invoke("0xF514621E8EA463D0", amount);
}


// Arg:amount is [int]	
g_Natives.NETWORK_EARN_FROM_CRATE_DROP = (amount) => 
{
	return mp.game.invoke("0xB1CC1B9EC3007A2A", amount);
}


// Arg:amount is [int]	Arg:p1 is [char*]	
g_Natives.NETWORK_EARN_FROM_BETTING = (amount, p1) => 
{
	return mp.game.invoke("0x827A5BA1A44ACA6D", amount, p1);
}


// Arg:amount is [int]	Arg:p1 is [char*]	
g_Natives.NETWORK_EARN_FROM_JOB = (amount, p1) => 
{
	return mp.game.invoke("0xB2CC4836834E8A98", amount, p1);
}


// Arg:amount is [int]	Arg:heistHash is [char*]	
g_Natives._NETWORK_EARN_FROM_BEND_JOB = (amount, heistHash) => 
{
	return mp.game.invoke("0x61326EE6DF15B0CA", amount, heistHash);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_EARN_FROM_CHALLENGE_WIN = (p0, p1, p2) => 
{
	return mp.game.invoke("0x2B171E6B2F64D8DF", p0, p1, p2);
}


// Arg:amount is [int]	Arg:networkHandle is [int*]	Arg:p2 is [Any*]	Arg:p3 is [Any]	
g_Natives.NETWORK_EARN_FROM_BOUNTY = (amount, networkHandle, p2, p3) => 
{
	return mp.game.invoke("0x131BB5DA15453ACF", amount, networkHandle, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.NETWORK_EARN_FROM_IMPORT_EXPORT = (p0, p1) => 
{
	return mp.game.invoke("0xF92A014A634442D6", p0, p1);
}


// Arg:amount is [int]	
g_Natives.NETWORK_EARN_FROM_HOLDUPS = (amount) => 
{
	return mp.game.invoke("0x45B8154E077D9E4D", amount);
}


// Arg:amount is [int]	Arg:propertyName is [Hash]	
g_Natives.NETWORK_EARN_FROM_PROPERTY = (amount, propertyName) => 
{
	return mp.game.invoke("0x849648349D77F5C5", amount, propertyName);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives.NETWORK_EARN_FROM_AI_TARGET_KILL = (p0, p1) => 
{
	return mp.game.invoke("0x515B4A22E4D3C6D7", p0, p1);
}


// Arg:amount is [int]	
g_Natives.NETWORK_EARN_FROM_NOT_BADSPORT = (amount) => 
{
	return mp.game.invoke("0x4337511FA8221D36", amount);
}


// Arg:amount is [int]	
g_Natives.NETWORK_EARN_FROM_ROCKSTAR = (amount) => 
{
	return mp.game.invoke("0x02CE1D6AC0FC73EA", amount);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	
g_Natives.NETWORK_EARN_FROM_VEHICLE = (p0, p1, p2, p3, p4, p5, p6, p7) => 
{
	return mp.game.invoke("0xB539BD8A4C1EECF8", p0, p1, p2, p3, p4, p5, p6, p7);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [Any]	Arg:p5 is [Any]	Arg:p6 is [Any]	Arg:p7 is [Any]	Arg:p8 is [Any]	
g_Natives.NETWORK_EARN_FROM_PERSONAL_VEHICLE = (p0, p1, p2, p3, p4, p5, p6, p7, p8) => 
{
	return mp.game.invoke("0x3F4D00167E41E0AD", p0, p1, p2, p3, p4, p5, p6, p7, p8);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:p2 is [int]	
g_Natives._NETWORK_EARN_FROM_DAILY_OBJECTIVE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x6EA318C91C1A8786", p0, p1, p2);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:p2 is [Any*]	
g_Natives._NETWORK_EARN_FROM_AMBIENT_JOB = (p0, p1, p2) => 
{
	return mp.game.invoke("0xFB6DB092FBAE29E6", p0, p1, p2);
}


// Arg:amont is [Any]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives._NETWORK_EARN_FROM_JOB_BONUS = (amont, p1, p2) => 
{
	return mp.game.invoke("0x6816FB4416760775", amont, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [Any]	
g_Natives.NETWORK_CAN_SPEND_MONEY = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xAB3CAA6B422164DA", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	Arg:p4 is [Any*]	Arg:p5 is [Any]	
g_Natives["0x7303E27CC6532080"] = (p0, p1, p2, p3, p4, p5) => 
{
	return mp.game.invoke("0x7303E27CC6532080", p0, p1, p2, p3, p4, p5);
}


// Arg:player is [Ped]	Arg:item is [Hash]	Arg:p2 is [Any]	Arg:p3 is [Any]	Arg:p4 is [BOOL]	Arg:item_name is [char*]	Arg:p6 is [Any]	Arg:p7 is [Any]	Arg:p8 is [Any]	Arg:p9 is [BOOL]	
g_Natives.NETWORK_BUY_ITEM = (player, item, p2, p3, p4, item_name, p6, p7, p8, p9) => 
{
	return mp.game.invoke("0xF0077C797F66A355", player, item, p2, p3, p4, item_name, p6, p7, p8, p9);
}


// Arg:amount is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_TAXI = (amount, p1, p2) => 
{
	return mp.game.invoke("0x17C3A7D31EAE39F9", amount, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_PAY_EMPLOYEE_WAGE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x5FD5ED82CBBE9989", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_PAY_UTILITY_BILL = (p0, p1, p2) => 
{
	return mp.game.invoke("0xAFE08B35EC0C9EAE", p0, p1, p2);
}


// Arg:value is [int]	Arg:p1 is [int*]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_PAY_MATCH_ENTRY_FEE = (value, p1, p2, p3) => 
{
	return mp.game.invoke("0x9346E14F2AF74D46", value, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.NETWORK_SPENT_BETTING = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0x1C436FD11FFA692F", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SPENT_IN_STRIPCLUB = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xEE99784E4467689C", p0, p1, p2, p3);
}


// Arg:cost is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_BUY_HEALTHCARE = (cost, p1, p2) => 
{
	return mp.game.invoke("0xD9B067E55253E3DD", cost, p1, p2);
}


// Arg:cost is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_BUY_AIRSTRIKE = (cost, p1, p2) => 
{
	return mp.game.invoke("0x763B4BD305338F19", cost, p1, p2);
}


// Arg:cost is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_BUY_HELI_STRIKE = (cost, p1, p2) => 
{
	return mp.game.invoke("0x81AA4610E3FD3A69", cost, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_AMMO_DROP = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB162DC95C0A3317B", p0, p1, p2);
}


// Arg:amount is [int]	Arg:victim is [Player]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_BUY_BOUNTY = (amount, victim, p2, p3) => 
{
	return mp.game.invoke("0x7B718E197453F2D9", amount, victim, p2, p3);
}


// Arg:propertyCost is [float]	Arg:propertyName is [Hash]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_BUY_PROPERTY = (propertyCost, propertyName, p2, p3) => 
{
	return mp.game.invoke("0x650A08A280870AF6", propertyCost, propertyName, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_HELI_PICKUP = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7BF1D73DB2ECA492", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BOAT_PICKUP = (p0, p1, p2) => 
{
	return mp.game.invoke("0x524EE43A37232C00", p0, p1, p2);
}


// Arg:amount is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BULL_SHARK = (amount, p1, p2) => 
{
	return mp.game.invoke("0xA6DD8458CE24012C", amount, p1, p2);
}


// Arg:amount is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_CASH_DROP = (amount, p1, p2) => 
{
	return mp.game.invoke("0x289016EC778D60E0", amount, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_HIRE_MUGGER = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE404BFB981665BF0", p0, p1, p2);
}


// Arg:amount is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_ROBBED_BY_MUGGER = (amount, p1, p2) => 
{
	return mp.game.invoke("0x995A65F15F581359", amount, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_HIRE_MERCENARY = (p0, p1, p2) => 
{
	return mp.game.invoke("0xE7B80E2BF9D80BD6", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SPENT_BUY_WANTEDLEVEL = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xE1B13771A843C4F6", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BUY_OFFTHERADAR = (p0, p1, p2) => 
{
	return mp.game.invoke("0xA628A745E2275C5D", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BUY_REVEAL_PLAYERS = (p0, p1, p2) => 
{
	return mp.game.invoke("0x6E176F1B18BC0637", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [BOOL]	Arg:p4 is [BOOL]	
g_Natives.NETWORK_SPENT_CARWASH = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xEC03C719DB2F4306", p0, p1, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SPENT_CINEMA = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x6B38ECB05A63A685", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_TELESCOPE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x7FE61782AD94CC09", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_HOLDUPS = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD9B86B9872039763", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BUY_PASSIVE_MODE = (p0, p1, p2) => 
{
	return mp.game.invoke("0x6D3A430D1A809179", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_PROSTITUTES = (p0, p1, p2) => 
{
	return mp.game.invoke("0xB21B89501CFAC79E", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_ARREST_BAIL = (p0, p1, p2) => 
{
	return mp.game.invoke("0x812F5488B1B2A299", p0, p1, p2);
}


// Arg:amount is [int]	Arg:vehicleModel is [Hash]	Arg:networkHandle is [int*]	Arg:notBankrupt is [BOOL]	Arg:hasTheMoney is [BOOL]	
g_Natives.NETWORK_SPENT_PAY_VEHICLE_INSURANCE_PREMIUM = (amount, vehicleModel, networkHandle, notBankrupt, hasTheMoney) => 
{
	return mp.game.invoke("0x9FF28D88C766E3E8", amount, vehicleModel, networkHandle, notBankrupt, hasTheMoney);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SPENT_CALL_PLAYER = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0xACDE7185B374177C", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_BOUNTY = (p0, p1, p2) => 
{
	return mp.game.invoke("0x29B260B84947DFCC", p0, p1, p2);
}


// Arg:bank is [int]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_FROM_ROCKSTAR = (bank, p1, p2) => 
{
	return mp.game.invoke("0x6A445B64ED7ABEB5", bank, p1, p2);
}


// Arg:p0 is [int*]	Arg:p1 is [int*]	Arg:p2 is [char*]	
g_Natives.PROCESS_CASH_GIFT = (p0, p1, p2) => 
{
	return mp.game.invoke("0x20194D48EAEC9A41", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_SPENT_PLAYER_HEALTHCARE = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x7C99101F7FCE2EE5", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_NO_COPS = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD5BB406F4E04019F", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives.NETWORK_SPENT_REQUEST_JOB = (p0, p1, p2) => 
{
	return mp.game.invoke("0x8204DA7934DF3155", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [BOOL]	
g_Natives._NETWORK_SPENT_REQUEST_HEIST = (p0, p1, p2) => 
{
	return mp.game.invoke("0x9D26502BB97BFE62", p0, p1, p2);
}


// Arg:amountSpent is [int]	Arg:p1 is [Any]	Arg:p2 is [BOOL]	Arg:p3 is [BOOL]	
g_Natives.NETWORK_BUY_FAIRGROUND_RIDE = (amountSpent, p1, p2, p3) => 
{
	return mp.game.invoke("0x8A7B3952DD64D2B5", amountSpent, p1, p2, p3);
}

g_Natives._IS_CASH_GIFT_AVAILABLE = () => 
{
	return mp.game.invoke("0x7C4FCCD2E4DEB394");
}

g_Natives.NETWORK_GET_VC_BANK_BALANCE = () => 
{
	return mp.game.invoke("0x76EF28DA05EA395A");
}


// Arg:character is [int]	
g_Natives.NETWORK_GET_VC_WALLET_BALANCE = (character) => 
{
	return mp.game.invoke("0xA40F9C2623F6A8B5", character);
}

g_Natives.NETWORK_GET_VC_BALANCE = () => 
{
	return mp.game.invoke("0x5CBAD97E059E1B94");
}

g_Natives._NETWORK_GET_BANK_BALANCE_STRING = () => 
{
	return mp.game.invoke("0xA6FA3979BED01B81");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xDC18531D7019A535"] = (p0, p1) => 
{
	return mp.game.invoke("0xDC18531D7019A535", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	Arg:p3 is [Any]	
g_Natives.NETWORK_CAN_RECEIVE_PLAYER_CASH = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x5D17BE59D2123284", p0, p1, p2, p3);
}


// Arg:p0 is [Any]	
g_Natives["0xF70EFA14FE091429"] = (p0) => 
{
	return mp.game.invoke("0xF70EFA14FE091429", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xE260E0BB9CD995AC"] = (p0) => 
{
	return mp.game.invoke("0xE260E0BB9CD995AC", p0);
}


// Arg:p0 is [Any]	
g_Natives["0xE154B48B68EF72BC"] = (p0) => 
{
	return mp.game.invoke("0xE154B48B68EF72BC", p0);
}


// Arg:p0 is [int]	
g_Natives["0x6FCF8DDEA146C45B"] = (p0) => 
{
	return mp.game.invoke("0x6FCF8DDEA146C45B", p0);
}


// Arg:character is [int]	
g_Natives._GET_NUM_DECORATIONS = (character) => 
{
	return mp.game.invoke("0x278F76C3B0A8F109", character);
}


// Arg:character is [int]	Arg:p1 is [int]	Arg:outComponent is [int*]	
g_Natives["0xFF56381874F82086"] = (character, p1, outComponent) => 
{
	return mp.game.invoke("0xFF56381874F82086", character, p1, outComponent);
}


// Arg:outComponent is [int*]	
g_Natives.INIT_SHOP_PED_COMPONENT = (outComponent) => 
{
	return mp.game.invoke("0x1E8C308FD312C036", outComponent);
}


// Arg:outProp is [int*]	
g_Natives.INIT_SHOP_PED_PROP = (outProp) => 
{
	return mp.game.invoke("0xEB0A2B758F7B850F", outProp);
}


// Arg:p0 is [int]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	
g_Natives["0x50F457823CE6EB5F"] = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x50F457823CE6EB5F", p0, p1, p2, p3);
}


// Arg:character is [int]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [BOOL]	Arg:p4 is [int]	Arg:componentId is [int]	
g_Natives._GET_NUM_PROPS_FROM_OUTFIT = (character, p1, p2, p3, p4, componentId) => 
{
	return mp.game.invoke("0x9BDF59818B1E38C1", character, p1, p2, p3, p4, componentId);
}


// Arg:componentId is [int]	Arg:outComponent is [int*]	
g_Natives.GET_SHOP_PED_QUERY_COMPONENT = (componentId, outComponent) => 
{
	return mp.game.invoke("0x249E310B2D920699", componentId, outComponent);
}


// Arg:p0 is [Hash]	Arg:p1 is [Any*]	
g_Natives.GET_SHOP_PED_COMPONENT = (p0, p1) => 
{
	return mp.game.invoke("0x74C0E2A57EC66760", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.GET_SHOP_PED_QUERY_PROP = (p0, p1) => 
{
	return mp.game.invoke("0xDE44A00999B2837D", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0x5D5CAFF661DDF6FC"] = (p0, p1) => 
{
	return mp.game.invoke("0x5D5CAFF661DDF6FC", p0, p1);
}


// Arg:entity is [Entity]	Arg:componentId is [int]	Arg:drawableVariant is [int]	Arg:textureVariant is [int]	
g_Natives.GET_HASH_NAME_FOR_COMPONENT = (entity, componentId, drawableVariant, textureVariant) => 
{
	return mp.game.invoke("0x0368B3A838070348", entity, componentId, drawableVariant, textureVariant);
}


// Arg:entity is [Entity]	Arg:componentId is [int]	Arg:propIndex is [int]	Arg:propTextureIndex is [int]	
g_Natives.GET_HASH_NAME_FOR_PROP = (entity, componentId, propIndex, propTextureIndex) => 
{
	return mp.game.invoke("0x5D6160275CAEC8DD", entity, componentId, propIndex, propTextureIndex);
}


// Arg:componentHash is [Hash]	
g_Natives._GET_VARIANTS_FOR_COMPONENT_COUNT = (componentHash) => 
{
	return mp.game.invoke("0xC17AD0E5752BECDA", componentHash);
}


// Arg:componentHash is [Hash]	Arg:componentId is [int]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives.GET_VARIANT_COMPONENT = (componentHash, componentId, p2, p3, p4) => 
{
	return mp.game.invoke("0x6E11F282F11863B6", componentHash, componentId, p2, p3, p4);
}


// Arg:componentHash is [Hash]	
g_Natives._GET_NUM_FORCED_COMPONENTS = (componentHash) => 
{
	return mp.game.invoke("0xC6B9DB42C04DD8C3", componentHash);
}


// Arg:p0 is [Any]	
g_Natives._GET_FORCED_COMPONENT = (p0) => 
{
	return mp.game.invoke("0x017568A8182D98A6", p0);
}


// Arg:componentHash is [Hash]	Arg:componentId is [int]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives.GET_FORCED_COMPONENT = (componentHash, componentId, p2, p3, p4) => 
{
	return mp.game.invoke("0x6C93ED8C2F74859B", componentHash, componentId, p2, p3, p4);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any*]	Arg:p3 is [Any*]	Arg:p4 is [Any*]	
g_Natives["0xE1CA84EBF72E691D"] = (p0, p1, p2, p3, p4) => 
{
	return mp.game.invoke("0xE1CA84EBF72E691D", p0, p1, p2, p3, p4);
}


// Arg:componentHash is [Hash]	Arg:restrictionTag is [Hash]	Arg:componentId is [int]	
g_Natives._IS_TAG_RESTRICTED = (componentHash, restrictionTag, componentId) => 
{
	return mp.game.invoke("0x341DE7ED1D2A1BFD", componentHash, restrictionTag, componentId);
}


// Arg:character is [int]	Arg:p1 is [BOOL]	
g_Natives._GET_CHARACTER_OUTFITS_COUNT = (character, p1) => 
{
	return mp.game.invoke("0xF3FBE2D50A6A8C28", character, p1);
}


// Arg:p0 is [Any]	Arg:outfit is [Any*]	
g_Natives.GET_SHOP_PED_QUERY_OUTFIT = (p0, outfit) => 
{
	return mp.game.invoke("0x6D793F03A631FE56", p0, outfit);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.GET_SHOP_PED_OUTFIT = (p0, p1) => 
{
	return mp.game.invoke("0xB7952076E444979D", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives.GET_SHOP_PED_OUTFIT_LOCATE = (p0) => 
{
	return mp.game.invoke("0x073CA26B079F956E", p0);
}


// Arg:outfitStruct is [Any]	Arg:slot is [int]	Arg:propStruct is [Any*]	
g_Natives.GET_SHOP_PED_OUTFIT_PROP_VARIANT = (outfitStruct, slot, propStruct) => 
{
	return mp.game.invoke("0xA9F9C2E0FDE11CBB", outfitStruct, slot, propStruct);
}


// Arg:outfitStruct is [Any]	Arg:slot is [int]	Arg:componentStruct is [Any*]	
g_Natives.GET_SHOP_PED_OUTFIT_COMPONENT_VARIANT = (outfitStruct, slot, componentStruct) => 
{
	return mp.game.invoke("0x19F2A026EDF0013F", outfitStruct, slot, componentStruct);
}

g_Natives.GET_NUM_DLC_VEHICLES = () => 
{
	return mp.game.invoke("0xA7A866D21CD2329B");
}


// Arg:dlcVehicleIndex is [int]	
g_Natives.GET_DLC_VEHICLE_MODEL = (dlcVehicleIndex) => 
{
	return mp.game.invoke("0xECC01B7C5763333C", dlcVehicleIndex);
}


// Arg:dlcVehicleIndex is [int]	Arg:outData is [int*]	
g_Natives.GET_DLC_VEHICLE_DATA = (dlcVehicleIndex, outData) => 
{
	return mp.game.invoke("0x33468EDC08E371F6", dlcVehicleIndex, outData);
}


// Arg:dlcVehicleIndex is [int]	
g_Natives.GET_DLC_VEHICLE_FLAGS = (dlcVehicleIndex) => 
{
	return mp.game.invoke("0x5549EE11FA22FCF2", dlcVehicleIndex);
}

g_Natives.GET_NUM_DLC_WEAPONS = () => 
{
	return mp.game.invoke("0xEE47635F352DA367");
}


// Arg:dlcWeaponIndex is [int]	Arg:outData is [int*]	
g_Natives.GET_DLC_WEAPON_DATA = (dlcWeaponIndex, outData) => 
{
	return mp.game.invoke("0x79923CD21BECE14E", dlcWeaponIndex, outData);
}


// Arg:dlcWeaponIndex is [int]	
g_Natives.GET_NUM_DLC_WEAPON_COMPONENTS = (dlcWeaponIndex) => 
{
	return mp.game.invoke("0x405425358A7D61FE", dlcWeaponIndex);
}


// Arg:dlcWeaponIndex is [int]	Arg:dlcWeapCompIndex is [int]	Arg:ComponentDataPtr is [Any*]	
g_Natives.GET_DLC_WEAPON_COMPONENT_DATA = (dlcWeaponIndex, dlcWeapCompIndex, ComponentDataPtr) => 
{
	return mp.game.invoke("0x6CF598A2957C2BF8", dlcWeaponIndex, dlcWeapCompIndex, ComponentDataPtr);
}


// Arg:dlcData is [Any*]	
g_Natives._IS_DLC_DATA_EMPTY = (dlcData) => 
{
	return mp.game.invoke("0xD4D7B033C3AA243C", dlcData);
}


// Arg:modData is [Any]	
g_Natives.IS_DLC_VEHICLE_MOD = (modData) => 
{
	return mp.game.invoke("0x0564B9FF9631B82C", modData);
}


// Arg:modData is [int]	
g_Natives["0xC098810437312FFF"] = (modData) => 
{
	return mp.game.invoke("0xC098810437312FFF", modData);
}


// Arg:dlcHash is [Hash]	
g_Natives.IS_DLC_PRESENT = (dlcHash) => 
{
	return mp.game.invoke("0x812595A0644CE1DE", dlcHash);
}

g_Natives["0xF2E07819EF1A5289"] = () => 
{
	return mp.game.invoke("0xF2E07819EF1A5289");
}

g_Natives["0x9489659372A81585"] = () => 
{
	return mp.game.invoke("0x9489659372A81585");
}

g_Natives["0xA213B11DFF526300"] = () => 
{
	return mp.game.invoke("0xA213B11DFF526300");
}

g_Natives["0x8D30F648014A92B5"] = () => 
{
	return mp.game.invoke("0x8D30F648014A92B5");
}

g_Natives.GET_IS_LOADING_SCREEN_ACTIVE = () => 
{
	return mp.game.invoke("0x10D0A8F259E93EC9");
}


// Arg:variable is [Any*]	Arg:unused is [Any]	
g_Natives._NULLIFY = (variable, unused) => 
{
	return mp.game.invoke("0x46E2B844905BC5F0", variable, unused);
}

g_Natives._UNLOAD_MP_DLC_MAPS = () => 
{
	return mp.game.invoke("0xD7C10C4A637992C9");
}

g_Natives._LOAD_MP_DLC_MAPS = () => 
{
	return mp.game.invoke("0x0888C3502DBBEEF5");
}


// Arg:ms is [int]	
g_Natives.WAIT = (ms) => 
{
	return mp.game.invoke("0x4EDE34FBADD967A6", ms);
}


// Arg:scriptName is [char*]	Arg:stackSize is [int]	
g_Natives.START_NEW_SCRIPT = (scriptName, stackSize) => 
{
	return mp.game.invoke("0xE81651AD79516E48", scriptName, stackSize);
}


// Arg:scriptName is [char*]	Arg:args is [Any*]	Arg:argCount is [int]	Arg:stackSize is [int]	
g_Natives.START_NEW_SCRIPT_WITH_ARGS = (scriptName, args, argCount, stackSize) => 
{
	return mp.game.invoke("0xB8BA7F44DF1575E1", scriptName, args, argCount, stackSize);
}


// Arg:scriptHash is [Hash]	Arg:stackSize is [int]	
g_Natives.START_NEW_SCRIPT_WITH_NAME_HASH = (scriptHash, stackSize) => 
{
	return mp.game.invoke("0xEB1C67C3A5333A92", scriptHash, stackSize);
}


// Arg:scriptHash is [Hash]	Arg:args is [Any*]	Arg:argCount is [int]	Arg:stackSize is [int]	
g_Natives.START_NEW_SCRIPT_WITH_NAME_HASH_AND_ARGS = (scriptHash, args, argCount, stackSize) => 
{
	return mp.game.invoke("0xC4BB298BD441BE78", scriptHash, args, argCount, stackSize);
}

g_Natives.TIMERA = () => 
{
	return mp.game.invoke("0x83666F9FB8FEBD4B");
}

g_Natives.TIMERB = () => 
{
	return mp.game.invoke("0xC9D9444186B5A374");
}


// Arg:value is [int]	
g_Natives.SETTIMERA = (value) => 
{
	return mp.game.invoke("0xC1B1E9A034A63A62", value);
}


// Arg:value is [int]	
g_Natives.SETTIMERB = (value) => 
{
	return mp.game.invoke("0x5AE11BC36633DE4E", value);
}

g_Natives.TIMESTEP = () => 
{
	return mp.game.invoke("0x0000000050597EE2");
}


// Arg:value is [float]	
g_Natives.SIN = (value) => 
{
	return mp.game.invoke("0x0BADBFA3B172435F", value);
}


// Arg:value is [float]	
g_Natives.COS = (value) => 
{
	return mp.game.invoke("0xD0FFB162F40A139C", value);
}


// Arg:value is [float]	
g_Natives.SQRT = (value) => 
{
	return mp.game.invoke("0x71D93B57D07F9804", value);
}


// Arg:base is [float]	Arg:exponent is [float]	
g_Natives.POW = (base, exponent) => 
{
	return mp.game.invoke("0xE3621CC40F31FE2E", base, exponent);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.VMAG = (x, y, z) => 
{
	return mp.game.invoke("0x652D2EEEF1D3E62C", x, y, z);
}


// Arg:x is [float]	Arg:y is [float]	Arg:z is [float]	
g_Natives.VMAG2 = (x, y, z) => 
{
	return mp.game.invoke("0xA8CEACB4F35AE058", x, y, z);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.VDIST = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0x2A488C176D52CCA5", x1, y1, z1, x2, y2, z2);
}


// Arg:x1 is [float]	Arg:y1 is [float]	Arg:z1 is [float]	Arg:x2 is [float]	Arg:y2 is [float]	Arg:z2 is [float]	
g_Natives.VDIST2 = (x1, y1, z1, x2, y2, z2) => 
{
	return mp.game.invoke("0xB7A628320EFF8E47", x1, y1, z1, x2, y2, z2);
}


// Arg:value is [int]	Arg:bitShift is [int]	
g_Natives.SHIFT_LEFT = (value, bitShift) => 
{
	return mp.game.invoke("0xEDD95A39E5544DE8", value, bitShift);
}


// Arg:value is [int]	Arg:bitShift is [int]	
g_Natives.SHIFT_RIGHT = (value, bitShift) => 
{
	return mp.game.invoke("0x97EF1E5BCE9DC075", value, bitShift);
}


// Arg:value is [float]	
g_Natives.FLOOR = (value) => 
{
	return mp.game.invoke("0xF34EE736CF047844", value);
}


// Arg:value is [float]	
g_Natives.CEIL = (value) => 
{
	return mp.game.invoke("0x11E019C8F43ACC8A", value);
}


// Arg:value is [float]	
g_Natives.ROUND = (value) => 
{
	return mp.game.invoke("0xF2DB717A73826179", value);
}


// Arg:value is [int]	
g_Natives.TO_FLOAT = (value) => 
{
	return mp.game.invoke("0xBBDA792448DB5A89", value);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	Arg:timestamp is [int]	
g_Natives.DECOR_SET_TIME = (entity, propertyName, timestamp) => 
{
	return mp.game.invoke("0x95AED7B8E39ECAA4", entity, propertyName, timestamp);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	Arg:value is [BOOL]	
g_Natives.DECOR_SET_BOOL = (entity, propertyName, value) => 
{
	return mp.game.invoke("0x6B1E8E2ED1335B71", entity, propertyName, value);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	Arg:value is [float]	
g_Natives._DECOR_SET_FLOAT = (entity, propertyName, value) => 
{
	return mp.game.invoke("0x211AB1DD8D0F363A", entity, propertyName, value);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	Arg:value is [int]	
g_Natives.DECOR_SET_INT = (entity, propertyName, value) => 
{
	return mp.game.invoke("0x0CE3AA5E1CA19E10", entity, propertyName, value);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	
g_Natives.DECOR_GET_BOOL = (entity, propertyName) => 
{
	return mp.game.invoke("0xDACE671663F2F5DB", entity, propertyName);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	
g_Natives._DECOR_GET_FLOAT = (entity, propertyName) => 
{
	return mp.game.invoke("0x6524A2F114706F43", entity, propertyName);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	
g_Natives.DECOR_GET_INT = (entity, propertyName) => 
{
	return mp.game.invoke("0xA06C969B02A97298", entity, propertyName);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	
g_Natives.DECOR_EXIST_ON = (entity, propertyName) => 
{
	return mp.game.invoke("0x05661B80A8C9165F", entity, propertyName);
}


// Arg:entity is [Entity]	Arg:propertyName is [char*]	
g_Natives.DECOR_REMOVE = (entity, propertyName) => 
{
	return mp.game.invoke("0x00EE9F297C738720", entity, propertyName);
}


// Arg:propertyName is [char*]	Arg:type is [int]	
g_Natives.DECOR_REGISTER = (propertyName, type) => 
{
	return mp.game.invoke("0x9FD90732F56403CE", propertyName, type);
}


// Arg:propertyName is [char*]	Arg:type is [int]	
g_Natives.DECOR_IS_REGISTERED_AS_TYPE = (propertyName, type) => 
{
	return mp.game.invoke("0x4F14F9F870D6FBC8", propertyName, type);
}

g_Natives.DECOR_REGISTER_LOCK = () => 
{
	return mp.game.invoke("0xA9D14EEA259F9248");
}

g_Natives["0x241FCA5B1AA14F75"] = () => 
{
	return mp.game.invoke("0x241FCA5B1AA14F75");
}

g_Natives._GET_TOTAL_SC_INBOX_IDS = () => 
{
	return mp.game.invoke("0x03A93FF1A2CA0864");
}


// Arg:p0 is [int]	
g_Natives._SC_INBOX_MESSAGE_INIT = (p0) => 
{
	return mp.game.invoke("0xBB8EA16ECBC976C4", p0);
}


// Arg:p0 is [int]	
g_Natives._IS_SC_INBOX_VALID = (p0) => 
{
	return mp.game.invoke("0x93028F1DB42BFD08", p0);
}


// Arg:p0 is [int]	
g_Natives._SC_INBOX_MESSAGE_POP = (p0) => 
{
	return mp.game.invoke("0x2C015348CF19CA1D", p0);
}


// Arg:p0 is [int]	Arg:context is [char*]	Arg:out is [int*]	
g_Natives.SC_INBOX_MESSAGE_GET_DATA_INT = (p0, context, out) => 
{
	return mp.game.invoke("0xA00EFE4082C4056E", p0, context, out);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	
g_Natives._SC_INBOX_MESSAGE_GET_DATA_BOOL = (p0, p1) => 
{
	return mp.game.invoke("0xFFE5C16F402D851D", p0, p1);
}


// Arg:p0 is [int]	Arg:context is [char*]	Arg:out is [char*]	
g_Natives.SC_INBOX_MESSAGE_GET_DATA_STRING = (p0, context, out) => 
{
	return mp.game.invoke("0x7572EF42FC6A9B6D", p0, context, out);
}


// Arg:p0 is [int]	
g_Natives._SC_INBOX_MESSAGE_PUSH = (p0) => 
{
	return mp.game.invoke("0x9A2C8064B6C1E41A", p0);
}


// Arg:p0 is [int]	
g_Natives._SC_INBOX_MESSAGE_GET_STRING = (p0) => 
{
	return mp.game.invoke("0xF3E31D16CBDCB304", p0);
}


// Arg:networkHandle is [int*]	
g_Natives["0xDA024BDBD600F44A"] = (networkHandle) => 
{
	return mp.game.invoke("0xDA024BDBD600F44A", networkHandle);
}


// Arg:p0 is [char*]	
g_Natives._CREATE_PRESENCE_STAT_UPDATE = (p0) => 
{
	return mp.game.invoke("0xA68D3D229F4F3B06", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives.SC_INBOX_MESSAGE_GET_UGCDATA = (p0, p1) => 
{
	return mp.game.invoke("0x69D82604A1A5A254", p0, p1);
}


// Arg:playerName is [char*]	
g_Natives._CREATE_PRESENCE_BOUNTY = (playerName) => 
{
	return mp.game.invoke("0x6AFD2CD753FEEF83", playerName);
}


// Arg:p0 is [Any]	Arg:p1 is [int*]	
g_Natives["0x87E0052F08BD64E6"] = (p0, p1) => 
{
	return mp.game.invoke("0x87E0052F08BD64E6", p0, p1);
}


// Arg:offset is [int]	Arg:limit is [int]	
g_Natives._SC_INBOX_GET_EMAILS = (offset, limit) => 
{
	return mp.game.invoke("0x040ADDCBAFA1018A", offset, limit);
}

g_Natives["0x16DA8172459434AA"] = () => 
{
	return mp.game.invoke("0x16DA8172459434AA");
}


// Arg:p0 is [int]	Arg:p1 is [Any*]	
g_Natives["0x4737980E8A283806"] = (p0, p1) => 
{
	return mp.game.invoke("0x4737980E8A283806", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives["0x44ACA259D67651DB"] = (p0, p1) => 
{
	return mp.game.invoke("0x44ACA259D67651DB", p0, p1);
}


// Arg:player is [Player*]	
g_Natives.SC_EMAIL_MESSAGE_PUSH_GAMER_TO_RECIP_LIST = (player) => 
{
	return mp.game.invoke("0x2330C12A7A605D16", player);
}

g_Natives.SC_EMAIL_MESSAGE_CLEAR_RECIP_LIST = () => 
{
	return mp.game.invoke("0x55DF6DB45179236E");
}


// Arg:p0 is [char*]	
g_Natives["0x116FB94DC4B79F17"] = (p0) => 
{
	return mp.game.invoke("0x116FB94DC4B79F17", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xBFA0A56A817C6C7D"] = (p0) => 
{
	return mp.game.invoke("0xBFA0A56A817C6C7D", p0);
}

g_Natives["0xBC1CC91205EC8D6E"] = () => 
{
	return mp.game.invoke("0xBC1CC91205EC8D6E");
}

g_Natives["0xDF649C4E9AFDD788"] = () => 
{
	return mp.game.invoke("0xDF649C4E9AFDD788");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x1F1E9682483697C7"] = (p0, p1) => 
{
	return mp.game.invoke("0x1F1E9682483697C7", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0x287F1F75D2803595"] = (p0, p1) => 
{
	return mp.game.invoke("0x287F1F75D2803595", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [float]	
g_Natives["0x487912FD248EFDDF"] = (p0, p1) => 
{
	return mp.game.invoke("0x487912FD248EFDDF", p0, p1);
}


// Arg:p0 is [char*]	
g_Natives["0x8416FE4E4629D7D7"] = (p0) => 
{
	return mp.game.invoke("0x8416FE4E4629D7D7", p0);
}


// Arg:string is [char*]	Arg:taskHandle is [int*]	
g_Natives._SC_START_CHECK_STRING_TASK = (string, taskHandle) => 
{
	return mp.game.invoke("0x75632C5ECD7ED843", string, taskHandle);
}


// Arg:taskHandle is [int]	
g_Natives._SC_HAS_CHECK_STRING_TASK_COMPLETED = (taskHandle) => 
{
	return mp.game.invoke("0x1753344C770358AE", taskHandle);
}


// Arg:taskHandle is [int]	
g_Natives._SC_GET_CHECK_STRING_STATUS = (taskHandle) => 
{
	return mp.game.invoke("0x82E4A58BABC15AE7", taskHandle);
}


// Arg:p0 is [Any]	
g_Natives["0x85535ACF97FC0969"] = (p0) => 
{
	return mp.game.invoke("0x85535ACF97FC0969", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x930DE22F07B1CCE3"] = (p0) => 
{
	return mp.game.invoke("0x930DE22F07B1CCE3", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [int*]	
g_Natives["0xF6BAAAF762E1BF40"] = (p0, p1) => 
{
	return mp.game.invoke("0xF6BAAAF762E1BF40", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0xF22CA0FD74B80E7A"] = (p0) => 
{
	return mp.game.invoke("0xF22CA0FD74B80E7A", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x9237E334F6E43156"] = (p0) => 
{
	return mp.game.invoke("0x9237E334F6E43156", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x700569DBA175A77C"] = (p0) => 
{
	return mp.game.invoke("0x700569DBA175A77C", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x1D4446A62D35B0D0"] = (p0, p1) => 
{
	return mp.game.invoke("0x1D4446A62D35B0D0", p0, p1);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0x2E89990DDFF670C3"] = (p0, p1) => 
{
	return mp.game.invoke("0x2E89990DDFF670C3", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0xD0EE05FE193646EA"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0xD0EE05FE193646EA", p0, p1, p2);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	Arg:p2 is [Any*]	
g_Natives["0x1989C6E6F67E76A8"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x1989C6E6F67E76A8", p0, p1, p2);
}


// Arg:p0 is [Any]	
g_Natives["0x07C61676E5BB52CD"] = (p0) => 
{
	return mp.game.invoke("0x07C61676E5BB52CD", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x8147FFF6A718E1AD"] = (p0) => 
{
	return mp.game.invoke("0x8147FFF6A718E1AD", p0);
}


// Arg:p0 is [Any*]	Arg:p1 is [int*]	
g_Natives["0x0F73393BAC7E6730"] = (p0, p1) => 
{
	return mp.game.invoke("0x0F73393BAC7E6730", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0xD302E99EDF0449CF"] = (p0) => 
{
	return mp.game.invoke("0xD302E99EDF0449CF", p0);
}


// Arg:p0 is [Any]	
g_Natives["0x5C4EBFFA98BDB41C"] = (p0) => 
{
	return mp.game.invoke("0x5C4EBFFA98BDB41C", p0);
}

g_Natives["0xFF8F3A92B75ED67A"] = () => 
{
	return mp.game.invoke("0xFF8F3A92B75ED67A");
}


// Arg:p0 is [Any*]	
g_Natives["0x4A7D6E727F941747"] = (p0) => 
{
	return mp.game.invoke("0x4A7D6E727F941747", p0);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:p2 is [Any*]	
g_Natives["0x8CC469AB4D349B7C"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x8CC469AB4D349B7C", p0, p1, p2);
}


// Arg:p0 is [int]	Arg:p1 is [char*]	Arg:p2 is [Any*]	
g_Natives["0x699E4A5C8C893A18"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x699E4A5C8C893A18", p0, p1, p2);
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives["0x19853B5B17D77BCA"] = (p0, p1) => 
{
	return mp.game.invoke("0x19853B5B17D77BCA", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives["0x6BFB12CE158E3DD4"] = (p0) => 
{
	return mp.game.invoke("0x6BFB12CE158E3DD4", p0);
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	
g_Natives["0xFE4C1D0D3B9CC17E"] = (p0, p1) => 
{
	return mp.game.invoke("0xFE4C1D0D3B9CC17E", p0, p1);
}

g_Natives["0xD8122C407663B995"] = () => 
{
	return mp.game.invoke("0xD8122C407663B995");
}

g_Natives["0x3001BEF2FECA3680"] = () => 
{
	return mp.game.invoke("0x3001BEF2FECA3680");
}


// Arg:p0 is [char*]	Arg:p1 is [int*]	
g_Natives["0x92DA6E70EF249BD1"] = (p0, p1) => 
{
	return mp.game.invoke("0x92DA6E70EF249BD1", p0, p1);
}

g_Natives["0x675721C9F644D161"] = () => 
{
	return mp.game.invoke("0x675721C9F644D161");
}

g_Natives._SC_GET_NICKNAME = () => 
{
	return mp.game.invoke("0x198D161F458ECC7F");
}


// Arg:p0 is [int*]	
g_Natives["0x225798743970412B"] = (p0) => 
{
	return mp.game.invoke("0x225798743970412B", p0);
}


// Arg:p0 is [int]	
g_Natives["0x418DC16FAE452C1C"] = (p0) => 
{
	return mp.game.invoke("0x418DC16FAE452C1C", p0);
}

g_Natives._RETURN_ZERO = () => 
{
	return mp.game.invoke("0xF2CA003F167E21D2");
}

g_Natives._RETURN_ZERO2 = () => 
{
	return mp.game.invoke("0xEF7D17BC6C85264C");
}


// Arg:p0 is [BOOL]	
g_Natives["0xB0C56BD3D808D863"] = (p0) => 
{
	return mp.game.invoke("0xB0C56BD3D808D863", p0);
}

g_Natives["0x8AA464D4E0F6ACCD"] = () => 
{
	return mp.game.invoke("0x8AA464D4E0F6ACCD");
}


// Arg:p0 is [BOOL]	
g_Natives._IS_IN_LOADING_SCREEN = (p0) => 
{
	return mp.game.invoke("0xFC309E94546FCDB5", p0);
}

g_Natives._IS_UI_LOADING_MULTIPLAYER = () => 
{
	return mp.game.invoke("0xC6DC823253FBB366");
}


// Arg:p0 is [BOOL]	
g_Natives["0xC7E7181C09F33B69"] = (p0) => 
{
	return mp.game.invoke("0xC7E7181C09F33B69", p0);
}


// Arg:p0 is [BOOL]	
g_Natives["0xFA1E0E893D915215"] = (p0) => 
{
	return mp.game.invoke("0xFA1E0E893D915215", p0);
}

g_Natives._GET_CURRENT_LANGUAGE_ID = () => 
{
	return mp.game.invoke("0x2BDD44CC428A7EAE");
}

g_Natives._GET_USER_LANGUAGE_ID = () => 
{
	return mp.game.invoke("0xA8AE43AEC1A61314");
}


// Arg:p0 is [int]	
g_Natives["0x48621C9FCA3EBD28"] = (p0) => 
{
	return mp.game.invoke("0x48621C9FCA3EBD28", p0);
}

g_Natives["0x81CBAE94390F9F89"] = () => 
{
	return mp.game.invoke("0x81CBAE94390F9F89");
}

g_Natives["0x13B350B8AD0EEE10"] = () => 
{
	return mp.game.invoke("0x13B350B8AD0EEE10");
}


// Arg:p0 is [float]	Arg:p1 is [float]	Arg:p2 is [int]	
g_Natives["0x293220DA1B46CEBC"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x293220DA1B46CEBC", p0, p1, p2);
}


// Arg:missionNameLabel is [char*]	Arg:p1 is [Any]	
g_Natives["0x208784099002BC30"] = (missionNameLabel, p1) => 
{
	return mp.game.invoke("0x208784099002BC30", missionNameLabel, p1);
}

g_Natives["0xEB2D525B57F42B40"] = () => 
{
	return mp.game.invoke("0xEB2D525B57F42B40");
}

g_Natives["0xF854439EFBB3B583"] = () => 
{
	return mp.game.invoke("0xF854439EFBB3B583");
}

g_Natives["0xAF66DCEE6609B148"] = () => 
{
	return mp.game.invoke("0xAF66DCEE6609B148");
}


// Arg:p0 is [Any]	Arg:p1 is [Any]	Arg:p2 is [Any]	
g_Natives["0x66972397E0757E7A"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x66972397E0757E7A", p0, p1, p2);
}


// Arg:mode is [int]	
g_Natives._START_RECORDING = (mode) => 
{
	return mp.game.invoke("0xC3AC2FFF9612AC81", mode);
}

g_Natives._STOP_RECORDING_AND_SAVE_CLIP = () => 
{
	return mp.game.invoke("0x071A5197D6AFC8B3");
}

g_Natives._STOP_RECORDING_AND_DISCARD_CLIP = () => 
{
	return mp.game.invoke("0x88BB3507ED41A240");
}

g_Natives["0x644546EC5287471B"] = () => 
{
	return mp.game.invoke("0x644546EC5287471B");
}

g_Natives._IS_RECORDING = () => 
{
	return mp.game.invoke("0x1897CA71995A90B4");
}

g_Natives["0xDF4B952F7D381B95"] = () => 
{
	return mp.game.invoke("0xDF4B952F7D381B95");
}

g_Natives["0x4282E08174868BE3"] = () => 
{
	return mp.game.invoke("0x4282E08174868BE3");
}


// Arg:p0 is [BOOL*]	
g_Natives["0x33D47E85B476ABCD"] = (p0) => 
{
	return mp.game.invoke("0x33D47E85B476ABCD", p0);
}


// Arg:p0 is [char*]	Arg:p1 is [BOOL]	
g_Natives._TOGGLE_PHONE_FILTER = (p0, p1) => 
{
	return mp.game.invoke("0x7E2BD3EF6C205F09", p0, p1);
}

g_Natives._IS_INTERIOR_RENDERING_DISABLED = () => 
{
	return mp.game.invoke("0x95AB8B5C992C7B58");
}

g_Natives._DISABLE_UNKNOWN_RENDERING = () => 
{
	return mp.game.invoke("0x5AD3932DAEB1E5D3");
}


// Arg:p0 is [BOOL]	
g_Natives["0xE058175F8EAFE79A"] = (p0) => 
{
	return mp.game.invoke("0xE058175F8EAFE79A", p0);
}

g_Natives._RESET_EDITOR_VALUES = () => 
{
	return mp.game.invoke("0x3353D13F09307691");
}

g_Natives._ACTIVATE_ROCKSTAR_EDITOR = () => 
{
	return mp.game.invoke("0x49DA8145672B2725");
}


// Arg:itemHash is [Hash]	Arg:categoryHash is [Hash]	Arg:unused is [int]	
g_Natives._NETWORK_SHOP_GET_PRICE = (itemHash, categoryHash, unused) => 
{
	return mp.game.invoke("0xC27009422FCCA88D", itemHash, categoryHash, unused);
}

g_Natives._NET_GAMESERVER_CATALOG_IS_READY = () => 
{
	return mp.game.invoke("0x3C4487461E9B0DCB");
}

g_Natives["0x2B949A1E6AEC8F6A"] = () => 
{
	return mp.game.invoke("0x2B949A1E6AEC8F6A");
}

g_Natives["0x85F6C9ABA1DE2BCF"] = () => 
{
	return mp.game.invoke("0x85F6C9ABA1DE2BCF");
}

g_Natives["0x357B152EF96C30B6"] = () => 
{
	return mp.game.invoke("0x357B152EF96C30B6");
}


// Arg:p0 is [Any*]	
g_Natives["0xCF38DAFBB49EDE5E"] = (p0) => 
{
	return mp.game.invoke("0xCF38DAFBB49EDE5E", p0);
}

g_Natives["0xE3E5A7C64CA2C6ED"] = () => 
{
	return mp.game.invoke("0xE3E5A7C64CA2C6ED");
}


// Arg:p0 is [Any*]	
g_Natives["0x0395CB47B022E62C"] = (p0) => 
{
	return mp.game.invoke("0x0395CB47B022E62C", p0);
}


// Arg:p0 is [Any]	
g_Natives._NETWORK_SHOP_START_SESSION = (p0) => 
{
	return mp.game.invoke("0xA135AC892A58FC07", p0);
}

g_Natives["0x72EB7BA9B69BF6AB"] = () => 
{
	return mp.game.invoke("0x72EB7BA9B69BF6AB");
}


// Arg:p0 is [Any*]	
g_Natives["0x170910093218C8B9"] = (p0) => 
{
	return mp.game.invoke("0x170910093218C8B9", p0);
}


// Arg:p0 is [Any*]	
g_Natives["0xC13C38E47EA5DF31"] = (p0) => 
{
	return mp.game.invoke("0xC13C38E47EA5DF31", p0);
}


// Arg:mpChar is [int]	
g_Natives._NETWORK_SHOP_GET_TRANSACTIONS_ENABLED_FOR_CHARACTER = (mpChar) => 
{
	return mp.game.invoke("0xB24F0944DA203D9E", mpChar);
}


// Arg:p0 is [int]	
g_Natives["0x74A0FD0688F1EE45"] = (p0) => 
{
	return mp.game.invoke("0x74A0FD0688F1EE45", p0);
}


// Arg:p0 is [Any]	
g_Natives._NETWORK_SHOP_SESSION_APPLY_RECEIVED_DATA = (p0) => 
{
	return mp.game.invoke("0x2F41D51BA3BCD1F1", p0);
}

g_Natives._NETWORK_SHOP_GET_TRANSACTIONS_DISABLED = () => 
{
	return mp.game.invoke("0x810E8431C0614BF9");
}


// Arg:p0 is [BOOL]	Arg:p1 is [BOOL]	
g_Natives["0x35A1B3E1D1315CFA"] = (p0, p1) => 
{
	return mp.game.invoke("0x35A1B3E1D1315CFA", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [Any*]	
g_Natives["0x897433D292B44130"] = (p0, p1) => 
{
	return mp.game.invoke("0x897433D292B44130", p0, p1);
}


// Arg:p0 is [Any*]	Arg:p1 is [int]	Arg:p2 is [int]	Arg:p3 is [int]	
g_Natives._NETWORK_SHOP_BASKET_START = (p0, p1, p2, p3) => 
{
	return mp.game.invoke("0x279F08B1A4B29B7E", p0, p1, p2, p3);
}

g_Natives._NETWORK_SHOP_BASKET_END = () => 
{
	return mp.game.invoke("0xA65568121DF2EA26");
}


// Arg:p0 is [Any*]	Arg:p1 is [Any]	
g_Natives._NETWORK_SHOP_BASKET_ADD_ITEM = (p0, p1) => 
{
	return mp.game.invoke("0xF30980718C8ED876", p0, p1);
}

g_Natives._NETWORK_SHOP_BASKET_IS_FULL = () => 
{
	return mp.game.invoke("0x27F76CC6C55AD30E");
}


// Arg:p0 is [Any]	Arg:p1 is [Any*]	
g_Natives._NETWORK_SHOP_BASKET_APPLY_SERVER_DATA = (p0, p1) => 
{
	return mp.game.invoke("0xE1A0450ED46A7812", p0, p1);
}


// Arg:p0 is [Any]	
g_Natives._NETWORK_SHOP_CHECKOUT_START = (p0) => 
{
	return mp.game.invoke("0x39BE7CEA8D9CC8E6", p0);
}


// Arg:transactionID is [int*]	Arg:p1 is [Hash]	Arg:transactionHash is [Hash]	Arg:transactionType is [Hash]	Arg:ammount is [int]	Arg:mode is [int]	
g_Natives._NETWORK_SHOP_BEGIN_SERVICE = (transactionID, p1, transactionHash, transactionType, ammount, mode) => 
{
	return mp.game.invoke("0x3C5FD37B5499582E", transactionID, p1, transactionHash, transactionType, ammount, mode);
}


// Arg:transactionID is [int]	
g_Natives._NETWORK_SHOP_TERMINATE_SERVICE = (transactionID) => 
{
	return mp.game.invoke("0xE2A99A9B524BEFFF", transactionID);
}


// Arg:p0 is [Any]	Arg:p1 is [BOOL]	Arg:p2 is [Any]	
g_Natives["0x51F1A8E48C3D2F6D"] = (p0, p1, p2) => 
{
	return mp.game.invoke("0x51F1A8E48C3D2F6D", p0, p1, p2);
}

g_Natives["0x0A6D923DFFC9BD89"] = () => 
{
	return mp.game.invoke("0x0A6D923DFFC9BD89");
}

g_Natives._NETWORK_SHOP_DELETE_SET_TELEMETRY_NONCE_SEED = () => 
{
	return mp.game.invoke("0x112CEF1615A1139F");
}


// Arg:charStatInt is [int]	Arg:amount is [int]	
g_Natives._NETWORK_TRANSFER_BANK_TO_WALLET = (charStatInt, amount) => 
{
	return mp.game.invoke("0xD47A2C1BA117471D", charStatInt, amount);
}


// Arg:charStatInt is [int]	Arg:amount is [int]	
g_Natives._NETWORK_TRANSFER_WALLET_TO_BANK = (charStatInt, amount) => 
{
	return mp.game.invoke("0xC2F7FE5309181C7D", charStatInt, amount);
}

g_Natives["0x23789E777D14CE44"] = () => 
{
	return mp.game.invoke("0x23789E777D14CE44");
}

g_Natives["0x350AA5EBC03D3BD2"] = () => 
{
	return mp.game.invoke("0x350AA5EBC03D3BD2");
}

g_Natives._NETWORK_SHOP_CASH_TRANSFER_SET_TELEMETRY_NONCE_SEED = () => 
{
	return mp.game.invoke("0x498C1E05CE5F7877");
}


// Arg:p0 is [Any]	
g_Natives._NETWORK_SHOP_SET_TELEMETRY_NONCE_SEED = (p0) => 
{
	return mp.game.invoke("0x9507D4271988E1AE", p0);
}

g_Natives._GET_ONLINE_VERSION = () => 
{
	return mp.game.invoke("0xFCA9373EF340AC0A");
}


}